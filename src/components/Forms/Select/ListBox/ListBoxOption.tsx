/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Listbox } from '@headlessui/react'
interface IListBoxOption {
  item: any
}

const ListBoxOption: React.FC<IListBoxOption> = ({ item }) => {
  return (
    <Listbox.Option key={item?.id || item} value={item}>
      {({ active, selected }) => (
        <Box
          py={2}
          pos="relative"
          px={{ md: 4 }}
          userSelect="none"
          cursor="pointer"
          bg={active ? 'brand.green.200' : ''}
          color={active ? 'white' : 'gray.700'}
        >
          <Text isTruncated fontWeight={selected ? 'medium' : 'normal'}>
            {item?.name || item}
          </Text>
        </Box>
      )}
    </Listbox.Option>
  )
}

export default ListBoxOption
