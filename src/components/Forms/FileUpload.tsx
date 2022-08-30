/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { Input, InputProps, FormLabel, Box } from '@chakra-ui/react'

interface IProps {
  id: string
  setFieldValue: (id: string, file: any) => void
}

const FileUpload: FC<IProps & InputProps> = ({
  id,
  children,
  setFieldValue,
  ...rest
}) => {
  const [fileUploaded, setFileUploaded] = useState<any>(null)
  const UploadRenderer: FC = () => (
    <Box
      p={12}
      borderWidth={1}
      borderColor="brandGreen.500"
      display={'inline-block'}
      rounded="md"
    >
      <Box color="gray.500">{fileUploaded?.name}</Box>
    </Box>
  )
  return (
    <FormLabel htmlFor={id} cursor="pointer">
      <Input
        type="file"
        accept="image/jpeg, image/png, video/*"
        onChange={e => {
          setFileUploaded(e.target.files?.[0])
          return setFieldValue(e.target.id, e.target.files?.[0])
        }}
        {...rest}
        id={id}
      />
      {fileUploaded === null ? children : <UploadRenderer />}
    </FormLabel>
  )
}

export default FileUpload
