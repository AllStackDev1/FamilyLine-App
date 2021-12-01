import { FC } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  Flex,
  GridItem,
  Text,
  Icon,
  Textarea
} from '@chakra-ui/react'
import { FilledButton } from 'Components/Buttons'
import { Input, TextArea, FileUpload } from 'Components/Forms'
import { Views } from 'pages/memories'
import useAuth from 'Utils/Providers/AuthContextProvider'
import { fileDoc } from 'Utils/Theme/custom-icon'

import { authStore } from 'Stores/auth.store'

const AddMemory: FC<{ isAdd?: boolean; toggle?: (e: Views) => void }> = ({
  isAdd,
  toggle
}) => {
  const { isLoading } = useAuth()

  const user = authStore(state => state.user)

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

        <GridItem>
          <Text fontSize={14} fontWeight={'bold'} pb={2}>
            Add File
          </Text>
          <Flex
            w={40}
            h={28}
            shadow="md"
            rounded="lg"
            bg="#fff"
            justify={'center'}
            align={'center'}
          >
            <Icon as={fileDoc} boxSize={16} />
          </Flex>
          <Text color={' rgba(0, 191, 77, 1)'} mt={2} fontSize={14}>
            Supported FIles (PNG, JPG, MP4, PDF, DOC)
          </Text>
        </GridItem>

        <GridItem>
          <Textarea
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
        </GridItem>
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
