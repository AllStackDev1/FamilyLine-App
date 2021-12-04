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

import { FilledButton } from 'Components/Buttons'
import { Input, TextArea, FileUpload } from 'Components/Forms'
import { saveEvents } from 'Utils/Api/services'
import { Views } from 'pages/memories'
import { fileDoc } from 'Utils/Theme/custom-icon'

const AddEvent: FC<{ isAdd?: boolean; toggle?: (e: Views) => void }> = ({
  isAdd,
  toggle
}) => {
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()

  interface IMemory {
    event_name: string
    event_location: string
    event_date: string
    event_time: string
    event_description: string
    event_file: string
    event_note: ''
  }

  const formik = useFormik<IMemory>({
    initialValues: {
      event_name: '',
      event_location: '',
      event_date: '',
      event_time: '',
      event_description: '',
      event_file: '',
      event_note: ''
    },
    onSubmit: async values => {
      try {
        const payload = { ...values }
        setLoading(true)

        const formData = new FormData()
        Object.keys(payload).forEach(key => formData.append(key, payload[key]))

        console.log('Hello accra ', payload)

        const res = await saveEvents(formData)
        if (res) {
          setLoading(false)
          toast({
            duration: 8000,
            isClosable: true,
            position: 'top-right',
            status: 'success',
            title: 'Event saved successfully'
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
          id="event_name"
          label="Event Name"
          onBlur={formik.handleBlur}
          placeholder=""
          value={formik.values.event_name}
          error={formik.errors.event_name}
          touched={formik.touched.event_name}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="text"
          id="event_location"
          label="Event Location"
          onBlur={formik.handleBlur}
          placeholder=""
          value={formik.values.event_location}
          error={formik.errors.event_location}
          touched={formik.touched.event_location}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="date"
          id="event_date"
          label="Event Date"
          onBlur={formik.handleBlur}
          value={formik.values.event_date}
          error={formik.errors.event_date}
          touched={formik.touched.event_date}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="time"
          id="event_time"
          label="Event Time"
          onBlur={formik.handleBlur}
          value={formik.values.event_time}
          error={formik.errors.event_time}
          touched={formik.touched.event_time}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem>
          <TextArea
            required
            id="event_description"
            label="Add Event Description"
            onBlur={formik.handleBlur}
            value={formik.values.event_description}
            error={formik.errors.event_description}
            touched={formik.touched.event_description}
            onChange={formik.handleChange}
            setFieldTouched={formik.setFieldTouched}
          />
        </GridItem>

        <GridItem>
          <TextArea
            required
            id="event_note"
            label="Add Note"
            onBlur={formik.handleBlur}
            value={formik.values.event_note}
            error={formik.errors.event_note}
            touched={formik.touched.event_note}
            onChange={formik.handleChange}
            setFieldTouched={formik.setFieldTouched}
          />
        </GridItem>

        <GridItem>
          <Text fontSize={14} fontWeight={'bold'} pb={2}>
            Add File
          </Text>
          <FileUpload id="event_file" setFieldValue={formik.setFieldValue}>
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

export default AddEvent
