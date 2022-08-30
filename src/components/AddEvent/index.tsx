import { FC, useState } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  Flex,
  GridItem,
  FormLabel,
  Text,
  Icon,
  Image,
  useToast,
  Input as ChakraInput
} from '@chakra-ui/react'

import { FilledButton } from 'components/Buttons'
import { Input, TextArea, FileUpload } from 'components/Forms'
import { saveEvents } from 'utils/api/services'
import { Views } from 'pages/memories'
import { FiUploadCloud } from 'react-icons/fi'
import { BsX } from 'react-icons/bs'

const AddEvent: FC<{ isAdd?: boolean; toggle?: (e: Views) => void }> = ({
  isAdd,
  toggle
}) => {
  const [isLoading, setLoading] = useState(false)
  const [cover, setCover] = useState<any>()
  const toast = useToast()

  interface IEvent {
    name: string
    location: string
    date?: string
    time?: string
    note: string
    datetime?: string
  }

  const handleCoverDelete = (preview: any) => {
    const newFiles = cover.filter(i => i.preview !== preview)
    setCover(newFiles)
  }

  const formik = useFormik<IEvent>({
    initialValues: {
      name: '',
      location: '',
      date: '',
      time: '',
      note: ''
    },
    onSubmit: async values => {
      try {
        const payload = { ...values }
        setLoading(true)

        if (payload.date && payload.time) {
          payload.datetime = values.date + ' ' + values.time
          delete payload.date
          delete payload.time
        }

        const formData = new FormData()
        Object.keys(payload).forEach(key => formData.append(key, payload[key]))

        cover.map(item => {
          formData.append('file', item)
        })

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
      <Text as="h3" textAlign={'center'} mb={4} fontWeight="bold" fontSize={24}>
        Add Event
      </Text>
      <FormLabel htmlFor="memory_media" cursor={'pointer'} mr={0}>
        <ChakraInput
          type="file"
          id="memory_media"
          display="none"
          accept="image/x-png,image/jpeg"
          onChange={e => {
            const files = e.target.files || []
            const currentFiles = Array.from(files)

            currentFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
            setCover(prev => [...currentFiles])
          }}
        />
        <Flex
          w={110}
          h={48}
          bg="gray.200"
          rounded={'lg'}
          align="center"
          justify={'center'}
          mb={4}
          overflow="hidden"
          mx="auto"
        >
          {!cover ? (
            <Flex align={'center'} direction="column" p={4}>
              <Icon as={FiUploadCloud} boxSize={8} color="gray.400" />
              <Text textAlign={'center'} fontSize={14} mt={2} color="gray.400">
                Upload your cover picture
              </Text>
            </Flex>
          ) : (
            <Box>
              <Image src={cover[0].preview} />
              <Flex
                bg="blackAlpha.400"
                pos="absolute"
                rounded={'full'}
                right={2}
                top={2}
                w={8}
                h={8}
                align="center"
                justify={'center'}
                cursor="pointer"
                onClick={() => handleCoverDelete(cover[0].preview)}
              >
                <Icon as={BsX} color="white" />
              </Flex>
            </Box>
          )}
        </Flex>
      </FormLabel>
      <Grid
        rowGap={10}
        columnGap={10}
        templateColumns={{ base: 'repeat(2,1fr)' }}
      >
        <GridItem
          as={Input}
          required
          type="text"
          id="name"
          placeholder=""
          label="Event Name"
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.errors.name}
          _focus={{ outline: 'none' }}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem>
          <Grid templateColumns={{ base: 'repeat(2,1fr)' }} gap={6}>
            <GridItem
              as={Input}
              required
              type="date"
              id="date"
              label="Event Date"
              onBlur={formik.handleBlur}
              _focus={{ outline: 'none' }}
              value={formik.values.date}
              error={formik.errors.date}
              touched={formik.touched.date}
              onChange={formik.handleChange}
              setFieldTouched={formik.setFieldTouched}
            />
            <GridItem
              as={Input}
              required
              type="time"
              id="time"
              label="Event Time"
              onBlur={formik.handleBlur}
              _focus={{ outline: 'none' }}
              value={formik.values.time}
              error={formik.errors.time}
              touched={formik.touched.time}
              onChange={formik.handleChange}
              setFieldTouched={formik.setFieldTouched}
            />
          </Grid>
        </GridItem>
        <GridItem
          as={Input}
          required
          type="text"
          id="location"
          placeholder=""
          label="Event Location"
          onBlur={formik.handleBlur}
          _focus={{ outline: 'none' }}
          value={formik.values.location}
          error={formik.errors.location}
          touched={formik.touched.location}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />
      </Grid>

      <Box mt={6}>
        <TextArea
          required
          id="note"
          label="Add Note"
          onBlur={formik.handleBlur}
          value={formik.values.note}
          error={formik.errors.note}
          _focus={{ outline: 'none' }}
          touched={formik.touched.note}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />
      </Box>

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
                title="View Events"
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
