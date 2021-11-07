/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import {
  FormControl,
  FormLabel,
  Textarea,
  TextareaProps
} from '@chakra-ui/react'

import FormErrorHandler from './FormErrorHandler'
import { IFormProps } from 'Interfaces/forms.interface'

const FormTextArea: FC<IFormProps & TextareaProps> = ({
  label,
  error,
  touched,
  required,
  setFieldTouched,
  ...rest
}) => {
  return (
    <FormControl id={rest.id || rest.name} isRequired={required}>
      <FormLabel color="gray.500">{label}</FormLabel>
      <Textarea size="lg" {...rest} resize="none" />
      <FormErrorHandler
        error={error}
        touched={touched}
        onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
      />
    </FormControl>
  )
}

export default FormTextArea
