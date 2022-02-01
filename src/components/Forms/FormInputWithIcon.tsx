import React from 'react'
import {
  Icon,
  Input,
  FormLabel,
  InputProps,
  InputGroup,
  FormControl,
  InputRightElement
} from '@chakra-ui/react'
import { IFormProps } from 'interfaces/forms.interface'
import { IconType } from 'react-icons/lib'
import FormErrorHandler from 'components/Forms/FormErrorHandler'

interface IProps extends InputProps {
  icon: IconType
  iconAction?: () => void
}

const FormInputWithIcon: React.FC<IFormProps & IProps> = ({
  error,
  touched,
  label,
  icon,
  required,
  iconAction,
  setFieldTouched,
  ...rest
}) => {
  return (
    <FormControl isRequired={required}>
      <FormLabel
        fontWeight={600}
        fontSize={{ base: 12, xl: 14 }}
        color="gray.700"
      >
        {label}
      </FormLabel>
      <InputGroup size="sm">
        <Input
          fontSize={{ base: 12, xl: 14 }}
          h={{ base: 10, lg: 12 }}
          borderRadius="md"
          borderTopWidth={1}
          borderWidth={0}
          bgColor="white"
          color="gray.700"
          shadow="md"
          {...rest}
        />
        <InputRightElement
          w={12}
          h={{ base: 10, lg: 12 }}
          roundedTopRight="md"
          roundedBottomRight="md"
          cursor={iconAction ? 'pointer' : 'default'}
          onClick={e => {
            e.preventDefault()
            if (iconAction) {
              iconAction()
            }
          }}
          children={<Icon as={icon} boxSize={5} mr={5} />}
        />
      </InputGroup>
      <FormErrorHandler
        error={error}
        touched={touched}
        onClear={() => setFieldTouched(rest.id || rest.name || '', false)}
      />
    </FormControl>
  )
}

export default FormInputWithIcon
