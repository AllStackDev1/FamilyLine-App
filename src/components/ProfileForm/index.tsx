import { useState } from 'react'
import { useFormik } from 'formik'
import { isEmpty, omit } from 'lodash'

import { Box, Flex, Stack, Button } from '@chakra-ui/react'

import Thumb from 'components/Thumb'
import { FileUpload, Input } from 'components/Forms'

import { authStore } from 'stores/auth.store'

import Avatar from 'assets/images/avatar.png'

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
            src={isEditing ? `${Avatar}` : values?.avatar || `${Avatar}`}
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
      <Stack spacing={isEditing ? 1 : -4}>
        <Input
          required
          type="text"
          id="family_name"
          isReadOnly={!isEditing}
          placeholder="First Name"
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={errors.family_name}
          touched={touched.family_name}
          fontWeight={isEditing ? 400 : 700}
          setFieldTouched={setFieldTouched}
          textAlign={isEditing ? 'left' : 'center'}
          value={(!isEditing ? 'The ' : '') + values.family_name}
        />
        <Input
          required
          type="text"
          id="phonenumber"
          isReadOnly={!isEditing}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          placeholder="Phone Number"
          value={values.phonenumber}
          error={errors.phonenumber}
          touched={touched.phonenumber}
          setFieldTouched={setFieldTouched}
          fontWeight={isEditing ? 400 : 700}
          textAlign={isEditing ? 'left' : 'center'}
        />

        <Input
          required
          type="text"
          id="phonenumber"
          isReadOnly={true}
          placeholder="Phone Number"
          value={family?.email}
          setFieldTouched={setFieldTouched}
          fontWeight={isEditing ? 400 : 700}
          textAlign={isEditing ? 'left' : 'center'}
        />
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
      </Stack>
    </form>
  )
}

export default ProfileForm
