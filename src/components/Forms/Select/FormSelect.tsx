/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { Box, FormControl, FormLabel } from '@chakra-ui/react'

import { IOption, IOptions } from 'interfaces/forms.interface'
import ListBoxButton from 'components/Forms/Select/ListBox/ListBoxButton'
import ListBoxOptions from 'components/Forms/Select/ListBox/ListBoxOptions'
import FormErrorHandler from 'components/Forms/FormErrorHandler'

interface IFormSelect {
  id: string
  value: any
  error: any
  label: string
  touched?: boolean
  required: boolean
  fontSize?: any
  setFieldValue: any
  placeHolderFont?: any
  setFieldTouched: any
  selected?: IOption
  placeholder: string
}

const FormSelect: FC<IFormSelect & IOptions<any>> = ({
  id,
  label,
  error,
  value,
  touched,
  options,
  required,
  placeholder,
  fontSize,
  setFieldValue,
  setFieldTouched
}) => {
  const [isTouched, setTouched] = useState(false)
  return (
    <FormControl
      isRequired={required}
      onMouseLeave={() => isTouched && setFieldTouched(id, true)}
    >
      <FormLabel fontSize={fontSize} fontWeight={600} color="gray.700">
        {label}
      </FormLabel>
      <Listbox
        as={Box}
        value={value}
        onClick={() => setTouched(true)}
        onChange={e => setFieldValue(id, e)}
      >
        <Box mt={1} pos="relative">
          <ListBoxButton selected={value} placeholder={placeholder} />
          <ListBoxOptions options={options} />
        </Box>
      </Listbox>
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

export default FormSelect
