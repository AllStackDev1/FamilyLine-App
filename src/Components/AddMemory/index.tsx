import { FC } from 'react'
import { useFormik } from 'formik'
import { Box, Icon, Grid, Flex, GridItem } from '@chakra-ui/react'
import { FilledButton } from 'Components/Buttons'
import { FileUpload, Input, TextArea } from 'Components/Forms'
import { Views } from 'Views/Memories'
import useAuth from 'Utils/Providers/AuthContextProvider'

import { IUser } from 'Interfaces/auth.interface'
import Thumb from 'Components/Thumb'
import { authStore } from 'Stores/auth.store'

import Avatar from 'Assets/Images/avatar.png'
import { FiEdit2 } from 'react-icons/fi'

const AddMemory: FC<{ isAdd?: boolean; toggle?: (e: Views) => void }> = ({
  isAdd,
  toggle
}) => {
  const { isLoading, login } = useAuth()

  const user = authStore(state => state.user)

  interface IUser {
    avatar: any
    email: string
    firstName: string
    lastName: string
    password?: string
    phoneNumber: string
    gender?: string
    address?: string
    occupation?: string
    dob?: string
    race?: string
    country?: string
    tribe?: string
    religion?: string
  }

  interface IMemory {
    name: string
    location: string
    date: string
    member: string
    file: string
    note: ''
  }

  const formik = useFormik<IMemory>({
    initialValues: {
      name: '',
      location: '',
      date: '',
      member: '',
      file: '',
      note: ''
    },
    onSubmit: async values => {
      //   await login(values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid rowGap={10} columnGap={10} templateColumns={{ xl: '50% 50%' }}>
        <GridItem
          as={Input}
          required
          type="text"
          id="name"
          label="Memory Name"
          onBlur={formik.handleBlur}
          placeholder=""
          value={formik.values.name}
          error={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="text"
          id="location"
          label="Location"
          onBlur={formik.handleBlur}
          placeholder=""
          value={formik.values.location}
          error={formik.errors.location}
          touched={formik.touched.location}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="date"
          id="date"
          label="date"
          onBlur={formik.handleBlur}
          value={formik.values.date}
          error={formik.errors.date}
          touched={formik.touched.date}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          id="members"
          type="text"
          label="Members"
          onBlur={formik.handleBlur}
          value={formik.values.member}
          error={formik.errors.member}
          touched={formik.touched.member}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="text"
          id="file"
          label="Add file"
          placeholder="add file"
          onBlur={formik.handleBlur}
          value={formik.values.file}
          error={formik.errors.file}
          touched={formik.touched.file}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={TextArea}
          required
          id="note"
          label="Add Note"
          onBlur={formik.handleBlur}
          value={formik.values.note}
          error={formik.errors.note}
          touched={formik.touched.note}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />
      </Grid>

      <Flex mt={16} w="full" justify="center">
        {isAdd ? (
          <>
            <FilledButton
              w={44}
              type="submit"
              title="Submit"
              isLoading={isLoading}
              isDisabled={isLoading || !(formik.dirty && formik.isValid)}
            />
            <Box mx={2} />
            {toggle && (
              <FilledButton
                w={44}
                title="View Tree"
                onClick={() => toggle('view')}
              />
            )}
          </>
        ) : (
          <FilledButton
            w={44}
            type="submit"
            title="Update"
            isLoading={isLoading}
            isDisabled={isLoading || !(formik.dirty && formik.isValid)}
          />
        )}
      </Flex>
    </form>
  )
}

export default AddMemory
