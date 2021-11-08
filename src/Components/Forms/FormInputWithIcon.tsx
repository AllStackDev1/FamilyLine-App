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
import { IFormProps } from 'Interfaces/forms.interface'
import { IconType } from 'react-icons/lib'

interface IProps extends InputProps {
  icon: IconType
  iconAction?: () => void
}

const FormInputWithIcon: React.FC<IFormProps & IProps> = ({
  label,
  icon,
  required,
  iconAction,
  ...rest
}) => {
  return (
    <FormControl isRequired={required}>
      <FormLabel fontSize={{ base: 12, xl: 14 }} color="gray.700">
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
    </FormControl>
  )
}

export default FormInputWithIcon
