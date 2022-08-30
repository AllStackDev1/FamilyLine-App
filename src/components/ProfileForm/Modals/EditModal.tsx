import { FC, useState } from 'react'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  FormLabel,
  Input,
  Text,
  Image,
  Flex,
  useToast
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { isEmpty, omit } from 'lodash'

import { IFamily } from 'interfaces/auth.interface'
import { objDiff } from 'utils/helper'
import { authStore } from 'stores/auth.store'
import { FilledButton } from 'components/Buttons'

interface IProps {
  isOpen: boolean
  onClose(): void
}

const EditProfile: FC<IProps> = ({ isOpen, onClose }) => {
  const toast = useToast()
  const [fileUploaded, setFileUploaded] = useState<any>(null)
  const { family, updateProfile } = authStore(state => state)

  const formik = useFormik<Partial<IFamily>>({
    enableReinitialize: true,
    initialValues: {
      avatar: family?.avatar,
      family_name: family?.family_name,
      phonenumber: family?.phonenumber
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)
        values.email = family?.email
        const fd = new FormData()
        Object.entries(values).forEach((d: string[]) => {
          fd.append(d[0], d[1])
        })
        await updateProfile(fd)
      } catch (error) {
        toast({
          duration: 8000,
          isClosable: true,
          position: 'top-right',
          status: 'error',
          title: 'An error occurred'
        })
      } finally {
        setSubmitting(false)
      }
    }
  })

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    setFieldTouched
  } = formik

  const handleClick = () => {
    const updatedValue = objDiff(values, omit(family, ['email', 'password']))
    if (!isEmpty(updatedValue)) {
      handleSubmit()
      resetForm()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent
        rounded="2xl"
        m={4}
        bg={'transparent'}
        border={'none'}
        boxShadow="none"
      >
        <ModalBody bg={'white'} rounded={'xl'} pt={6} color="gray.800">
          <Box mb={4} fontSize={20} textAlign="center" fontWeight={'bold'}>
            Edit Your Profile
          </Box>
          <Box w={'lg'} mx="auto">
            <FormLabel htmlFor="avatar" cursor={'pointer'}>
              <Input
                type={'file'}
                id="avatar"
                display={'none'}
                accept="image/jpeg, image/png, video/*"
                onChange={e => {
                  if (e?.target?.files?.length) {
                    const preview = URL.createObjectURL(e.target.files[0])
                    setFileUploaded(preview)
                    return setFieldValue('avatar', e.target.files?.[0])
                  }
                }}
              />
              <Flex align={'center'}>
                <Box
                  w={28}
                  h={28}
                  bg="gray.200"
                  rounded={'xl'}
                  mr={4}
                  overflow={'hidden'}
                >
                  <Image src={fileUploaded} />
                </Box>
                <Box>
                  <Text
                    mb={2}
                    mt={1}
                    fontSize={'lg'}
                    fontWeight={500}
                    color={'gray.600'}
                  >
                    Update Profile Picture
                  </Text>
                  <Text
                    mb={2}
                    mt={1}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={'gray.600'}
                  >
                    Click to update your family's profile pic
                  </Text>
                </Box>
              </Flex>
            </FormLabel>
            <Box my={4} py={4} borderTopWidth={1} borderColor={'gray.100'}>
              <Input
                required
                type="text"
                id="family_name"
                placeholder="Family Name"
                onChange={handleChange}
                onBlur={formik.handleBlur}
                fontWeight={400}
                value={values.family_name}
                outline={'none'}
                mb={4}
                _focus={{ outline: 'none' }}
              />

              <Input
                required
                type="text"
                id="phonenumber"
                onChange={handleChange}
                onBlur={formik.handleBlur}
                placeholder="Phone Number"
                value={values.phonenumber}
                fontWeight={400}
                _focus={{ outline: 'none' }}
              />

              <Flex justify="center" mt={6}>
                <FilledButton
                  title="Save Profile"
                  onClick={() => handleClick()}
                  isLoading={isSubmitting}
                />
              </Flex>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditProfile

{
  /* <Stack spacing={isEditing ? 1 : -4}>

        
      </Stack> */
}
