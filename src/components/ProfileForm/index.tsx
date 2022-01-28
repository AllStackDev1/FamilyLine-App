import { useState } from 'react'
import { useFormik } from 'formik'
import { isEmpty, omit } from 'lodash'

import { Box, Flex, VStack, Button, Heading } from '@chakra-ui/react'

import Thumb from 'components/Thumb'
import { FileUpload, Input } from 'components/Forms'

import { authStore } from 'stores/auth.store'

import { IFamily } from 'interfaces/auth.interface'
import { objDiff } from 'utils/helper'

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false)

  const { family, updateProfile } = authStore(state => state)

  const formik = useFormik<Partial<IFamily>>({
    enableReinitialize: true,
    initialValues: {
      avatar: family?.avatar,
      family_name: family?.family_name,
      phonenumber: family?.phonenumber
    },
    onSubmit: async values => {
      const fd = new FormData()
      Object.entries(values).forEach((d: string[]) => {
        fd.append(d[0], d[1])
      })
      await updateProfile(fd)
    }
  })

  const {
    errors,
    values,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    setFieldTouched
  } = formik

  const handleClick = () => {
    setIsEditing(e => !e)
    const updatedValue = objDiff(values, omit(family, ['email', 'password']))
    if (!isEmpty(updatedValue)) {
      handleSubmit()
      resetForm()
    }
  }

  return (
    <form>
      <Flex
        w="full"
        pos="relative"
        align="center"
        flexDir="column"
        mb={isEditing ? 3 : 0}
      >
        <Box pos="relative" w={32} h={32}>
          <Thumb
            w={32}
            h={32}
            top={0}
            left={0}
            pos="absolute"
            src={values?.avatar}
            alt={values.family_name}
            imageFile={values.avatar}
          />
          {isEditing && (
            <FileUpload
              w={32}
              h={32}
              top={0}
              left={0}
              id="avatar"
              zIndex={40}
              opacity={0}
              pos="absolute"
              cursor="pointer"
              setFieldValue={setFieldValue}
            />
          )}
        </Box>
      </Flex>
      <VStack mt={4} spacing={2}>
        {isEditing ? (
          <>
            <Input
              required
              type="text"
              id="family_name"
              onChange={handleChange}
              onBlur={formik.handleBlur}
              error={errors.family_name}
              value={values.family_name}
              touched={touched.family_name}
              setFieldTouched={setFieldTouched}
            />

            {isEditing && (
              <Input
                required
                type="text"
                id="phonenumber"
                onChange={handleChange}
                onBlur={formik.handleBlur}
                value={values.phonenumber}
                error={errors.phonenumber}
                touched={touched.phonenumber}
                setFieldTouched={setFieldTouched}
              />
            )}

            <Input
              required
              type="text"
              id="email"
              isReadOnly={true}
              value={family?.email}
              setFieldTouched={setFieldTouched}
            />
          </>
        ) : (
          <>
            <Heading fontSize="md">{values.family_name}'s</Heading>
            <Heading fontSize="md">{family?.email}</Heading>
          </>
        )}

        <Flex justify="center">
          <Button
            p={2}
            h={5}
            variant="ghost"
            fontSize="xx-small"
            onClick={handleClick}
            colorScheme="brandGreen"
            _focus={{ outline: 'none' }}
          >
            {!isEditing ? 'Edit Profile' : 'Save Profile'}
          </Button>
        </Flex>
      </VStack>
    </form>
  )
}

export default ProfileForm
