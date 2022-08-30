import { FC, useState } from 'react'
import { useFormik } from 'formik'
import {
  Box,
  Grid,
  Flex,
  Icon,
  Text,
  Image,
  Input as ChakraInput,
  useToast,
  GridItem,
  FormLabel,
  AspectRatio
} from '@chakra-ui/react'

import { saveMemory } from 'utils/api/services'
import { FilledButton } from 'components/Buttons'
import { Views } from 'pages/memories'
import { FiUploadCloud } from 'react-icons/fi'
import { Input } from 'components/Forms'
import { BsX } from 'react-icons/bs'

const AddMemory: FC<{ isAdd?: boolean; toggle?: (e: Views) => void }> = ({
  isAdd,
  toggle
}) => {
  interface IMedia {
    preview?: string
  }

  const [media, setMedia] = useState<any[]>([])
  const toast = useToast()
  const [isLoading, setLoading] = useState(false)

  const handleMediaDelete = (preview: any) => {
    const newFiles = media.filter(i => i.preview !== preview)
    setMedia(newFiles)
  }

  interface IMemory {
    name: string
    location: string
    date: string
    memories_upload?: any[]
  }

  const formik = useFormik<IMemory>({
    initialValues: {
      name: '',
      location: '',
      date: ''
    },
    onSubmit: async values => {
      try {
        const payload = { ...values }
        setLoading(true)

        const formData = new FormData()
        Object.keys(payload).forEach(key => formData.append(key, payload[key]))

        media.map(item => {
          formData.append('memories_upload', item)
        })

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
          id="date"
          label="Date"
          onBlur={formik.handleBlur}
          value={formik.values.date}
          error={formik.errors.date}
          touched={formik.touched.date}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />
      </Grid>

      <Box mt={8}>
        <Text fontSize={14} fontWeight={'bold'} pb={2}>
          Add images and videos to memories
        </Text>
        <Grid templateColumns={{ base: 'repeat(6, 1fr)' }} gap={4}>
          <GridItem>
            <Box>
              <FormLabel htmlFor="memory_media" cursor={'pointer'} mr={0}>
                <ChakraInput
                  type="file"
                  id="memory_media"
                  display="none"
                  accept="image/x-png,image/jpeg, video/mp4,video/x-m4v"
                  onChange={e => {
                    const files = e.target.files || []
                    const currentFiles = Array.from(files)

                    currentFiles.map(file =>
                      Object.assign(file, {
                        ext: file.name.split('.').pop(),
                        preview: URL.createObjectURL(file)
                      })
                    )
                    setMedia(prev => [...prev, ...files])
                  }}
                  multiple
                />
                <Flex
                  boxSize={40}
                  bg="gray.100"
                  rounded={'lg'}
                  align="center"
                  justify={'center'}
                >
                  <Flex align={'center'} direction="column" p={4}>
                    <Icon as={FiUploadCloud} boxSize={8} color="gray.400" />
                    <Text
                      textAlign={'center'}
                      fontSize={14}
                      mt={2}
                      color="gray.400"
                    >
                      Upload your media files
                    </Text>
                  </Flex>
                </Flex>
              </FormLabel>
            </Box>
          </GridItem>
          {media.map(item => {
            return (
              <GridItem>
                {item.ext === 'png' ||
                item.ext === 'jpg' ||
                item.ext === 'jpeg' ? (
                  <Box
                    boxSize={40}
                    bg="gray.100"
                    rounded={'lg'}
                    overflow="hidden"
                    pos="relative"
                  >
                    <Image src={item.preview} />
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
                      onClick={() => handleMediaDelete(item.preview)}
                    >
                      <Icon as={BsX} color="white" />
                    </Flex>
                  </Box>
                ) : (
                  <Box
                    boxSize={40}
                    bg="gray.100"
                    rounded={'lg'}
                    overflow="hidden"
                    pos="relative"
                  >
                    <AspectRatio maxW="560px" ratio={1}>
                      <video
                        src={`${item.preview}#t=10`}
                        autoPlay={false}
                        controls={false}
                      />
                    </AspectRatio>
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
                      onClick={() => handleMediaDelete(item.preview)}
                    >
                      <Icon as={BsX} color="white" />
                    </Flex>
                  </Box>
                )}
              </GridItem>
            )
          })}
        </Grid>
        <Text color={' rgba(0, 191, 77, 1)'} mt={2} fontSize={14}>
          Supported FIles (PNG, JPG, MP4, PDF, DOC)
        </Text>
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
                title="Show Memories"
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
