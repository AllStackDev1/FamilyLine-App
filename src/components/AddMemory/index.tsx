import { FC, useState } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  Flex,
  GridItem,
  Text,
  Icon,
  useToast
} from '@chakra-ui/react'

import { saveMemory, getFamilyMembers } from 'utils/api/services'
import { FilledButton } from 'components/Buttons'
import { Input, MultiSelect, TextArea, FileUpload } from 'components/Forms'
import { useQuery } from 'react-query'
import { Views } from 'pages/memories'
import { fileDoc } from 'utils/theme/custom-icon'

const AddMemory: FC<{ isAdd?: boolean; toggle?: (e: Views) => void }> = ({
  isAdd,
  toggle
}) => {
  const members = ['Kofi', 'Ama', 'Efua', 'Yaw']
  const { data } = useQuery('family-members', () => getFamilyMembers())
  const toast = useToast()
  const [isLoading, setLoading] = useState(false)

  interface IMemory {
    name: string
    location: string
    memories_date: string
    memories: any[] | any
    file: string
    note: ''
  }

  const formik = useFormik<IMemory>({
    initialValues: {
      name: '',
      location: '',
      memories_date: '',
      memories: [],
      file: '',
      note: ''
    },
    onSubmit: async values => {
      try {
        const payload = { ...values }
        setLoading(true)
        const memories = payload.memories.map(item => {
          return { members: item }
        })

        payload.memories = JSON.stringify(memories)
        const formData = new FormData()
        Object.keys(payload).forEach(key => formData.append(key, payload[key]))

        const res = await saveMemory(formData)
        if (res) {
          setLoading(false)
          toast({
            duration: 8000,
            isClosable: true,
            position: 'top-right',
            status: 'success',
            title: 'Memory recorded successfully'
          })
        }
      } catch (error: any) {
        setLoading(false)
        if (error?.data) {
          error?.data?.memories?.map(item => {
            toast({
              duration: 8000,
              isClosable: true,
              position: 'top-right',
              description: item,
              status: 'error',
              title: 'An error occurred'
            })
          })
        }
      }
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
          id="memories_date"
          label="date"
          onBlur={formik.handleBlur}
          value={formik.values.memories_date}
          error={formik.errors.memories_date}
          touched={formik.touched.memories_date}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem>
          <MultiSelect
            required
            options={members}
            id="memories"
            label="Members"
            placeholder="Select family members present"
            setFieldValue={formik.setFieldValue}
            value={formik.values.memories}
            error={formik.errors.memories}
            setFieldTouched={formik.setFieldTouched}
          />
        </GridItem>

        <GridItem>
          <Text fontSize={14} fontWeight={'bold'} pb={2}>
            Add File
          </Text>
          <FileUpload id="file" setFieldValue={formik.setFieldValue}>
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
          </FileUpload>

          <Text color={' rgba(0, 191, 77, 1)'} mt={2} fontSize={14}>
            Supported FIles (PNG, JPG, MP4, PDF, DOC)
          </Text>
        </GridItem>

        <GridItem>
          <TextArea
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
