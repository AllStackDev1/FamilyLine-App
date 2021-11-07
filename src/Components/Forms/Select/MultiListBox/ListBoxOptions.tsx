import React from 'react'
import { Box } from '@chakra-ui/react'
import { Listbox } from '@headlessui/react'
import ListBoxOption from './ListBoxOption'

interface MultiListBoxOptionsProps {
  data: string[]
  isSelected: (item: string) => boolean
}

const ListBoxOptions: React.FC<MultiListBoxOptionsProps> = ({
  data,
  isSelected
}) => {
  return (
    <Listbox.Options
      as={Box}
      static
      pos="absolute"
      w="full"
      py={1}
      mt={1}
      overflow="auto"
      fontSize="md"
      bg="white"
      rounded="md"
      shadow="lg"
      maxH={64}
      borderWidth={1}
      zIndex={2}
    >
      {data.map((item: string) => {
        const selected = isSelected(item)
        return <ListBoxOption selected={selected} item={item} />
      })}
    </Listbox.Options>
  )
}

export default ListBoxOptions
