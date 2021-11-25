/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import {
  FormControl,
  FormLabel,
  Textarea,
  TextareaProps
} from '@chakra-ui/react'

import FormErrorHandler from './FormErrorHandler'
import { IFormProps } from 'interfaces/forms.interface'

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
      <FormLabel
        fontWeight={600}
        fontSize={{ base: 12, xl: 14 }}
        color="gray.700"
      >
        {label}
      </FormLabel>
      <Textarea
        size="lg"
        {...rest}
        resize="none"
        fontSize={{ base: 12, xl: 14 }}
        h={{ base: 10, lg: 12 }}
        borderWidth={0}
        bgColor="white"
        shadow="md"
      />
      <FormErrorHandler
        error={error}
        touched={touched}
        onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
      />
    </FormControl>
  )
}

export default FormTextArea
