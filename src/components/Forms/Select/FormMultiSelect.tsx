/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Box, FormControl, FormLabel } from '@chakra-ui/react'
import ListBoxButton from './MultiListBox/ListBoxButton'
import ListBoxOptions from './MultiListBox/ListBoxOptions'
import FormErrorHandler from '../FormErrorHandler'

interface FormMultiSelectProps {
  id: string
  value: any[]
  error?: any
  label: string
  options: string[]
  required: boolean
  touched?: boolean
  setFieldValue: any
  placeholder: string
  setFieldTouched: any
}

const FormMultiSelect: FC<FormMultiSelectProps> = ({
  id,
  label,
  error,
  value,
  touched,
  options,
  required,
  placeholder,
  setFieldValue,
  setFieldTouched
}) => {
  const [isTouched, setTouched] = useState(false)

  function isSelected(_value: string) {
    return !!value.find(el => el === _value)
  }

  function handleSelection(item: string[] | any) {
    const selectedResult = value.filter(selected => selected === item)

    if (selectedResult.length) {
      removePerson(item)
    } else {
      setFieldValue(id, [...value, item])
    }
  }

  function removePerson(item: string) {
    const removedSelection = value.filter(selected => selected !== item)
    setFieldValue(id, removedSelection)
  }

  return (
    <FormControl
      isRequired={required}
      onMouseLeave={() => isTouched && setFieldTouched(id, true)}
    >
      <FormLabel color="black" fontWeight={600} fontSize={14}>
        {label}
      </FormLabel>
      <Listbox
        as={Box}
        value={value}
        onChange={handleSelection}
        onClick={() => setTouched(true)}
        shadow="md"
        rounded="lg"
      >
        {({ open }) => (
          <Box pos="relative">
            <Box
              as="span"
              display="inline-block"
              w="full"
              rounded="md"
              shadow="sm"
            >
              <ListBoxButton
                placeholder={placeholder}
                selectedItems={value}
                removePerson={removePerson}
              />
            </Box>

            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
            >
              <ListBoxOptions data={options} isSelected={isSelected} />
            </Transition>
          </Box>
        )}
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

export default FormMultiSelect
