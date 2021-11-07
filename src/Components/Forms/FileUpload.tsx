/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from 'react'
import { Box, Flex, Text, Icon, FormLabel, FormControl } from '@chakra-ui/react'
import { useDropzone, DropzoneProps } from 'react-dropzone'
import { BsX } from 'react-icons/bs'

import { FilesProps } from 'Interfaces/forms.interface'
// import { Attached } from 'utils/icons'
import FormErrorHandler from './FormErrorHandler'

interface FileUploadProps extends DropzoneProps {
  id: string
  error?: string
  label: string
  touched?: boolean
  required?: boolean
  setFieldValue: any
  setFieldTouched: any
}

const FileUpload: FC<FileUploadProps> = ({
  id,
  error,
  label,
  touched,
  setFieldValue,
  setFieldTouched,
  multiple = false,
  required = false,
  accept = 'image/*, application/pdf',
  ...rest
}) => {
  const [isTouched, setTouched] = useState(false)
  const [files, setFiles] = useState<FilesProps[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple,
    onDrop: acceptedFiles => {
      setFieldValue(id, multiple ? acceptedFiles : acceptedFiles[0])
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    },
    ...rest
  })

  const removeImage = (id: string) => {
    const newImages = files.filter(item => item.name !== id)
    setFiles(newImages)
    setFieldValue(id, undefined)
  }

  const thumbs = files.map(file => (
    <Box
      mr={4}
      w="100%"
      pos="relative"
      d="inline-block"
      boxSizing="border-box"
      key={file.name || ''}
    >
      <Box
        w={6}
        h={6}
        top={2}
        shadow="md"
        right={-10}
        bg="white"
        as="button"
        role="button"
        rounded="100%"
        pos="absolute"
        color="gray.700"
        aria-label="close button"
        onClick={() => removeImage(file.name || '')}
      >
        <Icon as={BsX} />
      </Box>
      <Box
        w={40}
        h={40}
        as="embed"
        src={`${file.preview}#toolbar=0&navpanes=0&statusbar=0`}
      />

      <Text fontSize="sm" mb={2}>
        {file.name}
      </Text>
    </Box>
  ))

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview || ''))
    },
    [files]
  )

  return (
    <FormControl
      isRequired={required}
      onMouseLeave={() => isTouched && setFieldTouched(id, true)}
    >
      <FormLabel color="gray.500">{label}</FormLabel>
      <Flex
        h={56}
        rounded="md"
        align="center"
        pos="relative"
        justify="center"
        cursor="pointer"
        border="1px dashed #31BC2D"
      >
        <Flex
          w="full"
          h="full"
          justify="center"
          {...getRootProps({
            className: 'dropzone',
            onClick: () => setTouched(true)
          })}
        >
          <input {...getInputProps()} />
          {files.length === 0 && (
            <Flex align="center" justify="center" flexDir="column">
              <Flex align="center" color="brand.green.200">
                {/* <Icon as={Attached} /> */}
                <Text fontSize="sm" ml={2}>
                  Upload or drag & drop
                </Text>
              </Flex>
              {rest.maxSize && (
                <Flex align="center" color="gray.400" fontWeight="bold">
                  <Text fontSize="xs" ml={2}>
                    file size should not exceed ({rest?.maxSize / (1024 * 1024)}
                    mb)
                  </Text>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
        <Flex pos="absolute" flexWrap="wrap" justify="space-around">
          {thumbs}
        </Flex>
      </Flex>
      <FormErrorHandler
        error={error}
        touched={touched}
        onClear={() => {
          setTouched(false)
          setFieldTouched(id, false)
        }}
      />
    </FormControl>
  )
}

export default FileUpload
