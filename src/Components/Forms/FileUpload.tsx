/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { Input, InputProps } from '@chakra-ui/react'

interface IProps {
  setFieldValue: (id: string, file: any) => void
}

const FileUpload: FC<IProps & InputProps> = ({ setFieldValue, ...rest }) => {
  return (
    <Input
      type="file"
      accept="image/jpeg, image/png"
      onChange={e => setFieldValue(e.target.id, e.target.files?.[0])}
      {...rest}
    />
  )
}

export default FileUpload
