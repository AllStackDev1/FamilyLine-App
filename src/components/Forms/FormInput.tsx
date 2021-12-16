/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Input, FormLabel, FormControl, InputProps } from '@chakra-ui/react'
import FormErrorHandler from 'components/Forms/FormErrorHandler'
import { IFormProps } from 'interfaces/forms.interface'

const FormInput: React.FC<IFormProps & InputProps> = ({
  label,
  error,
  touched,
  required,
  setFieldTouched,
  ...rest
}) => {
  return (
    <FormControl id={rest.id || rest.name} isRequired={required}>
      {label && (
        <FormLabel
          fontWeight={600}
          fontSize={{ base: 12, xl: 14 }}
          color="gray.700"
        >
          {label}
        </FormLabel>
      )}
      <Input
        fontSize={{ base: 12, xl: 14 }}
        h={{ base: 10, lg: 12 }}
        borderWidth={0}
        bgColor="white"
        shadow="md"
        {...rest}
      />
      <FormErrorHandler
        error={error}
        touched={touched}
        onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
      />
    </FormControl>
  )
}

export default FormInput
