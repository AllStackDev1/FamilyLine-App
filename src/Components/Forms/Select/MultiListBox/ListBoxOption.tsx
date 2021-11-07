import React from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { BiCheck } from 'react-icons/bi'
import { Listbox } from '@headlessui/react'

interface MultiListBoxOption {
  selected: boolean
  item: string
}

const ListBoxOption: React.FC<MultiListBoxOption> = ({ selected, item }) => {
  return (
    <Listbox.Option key={item} value={item}>
      {({ active }) => (
        <Flex
          py={2}
          pl={8}
          pr={4}
          w="100%"
          pos="relative"
          align="center"
          cursor="pointer"
          userSelect="none"
          bg={active ? 'brand.green.100' : ''}
          color={active ? 'white' : 'brand.green.200'}
        >
          <Text
            as="span"
            fontWeight={selected ? 'semibold' : 'normal'}
            isTruncated
            d="block"
          >
            {item}
          </Text>
          {selected && (
            <Flex
              pl={1}
              left={0}
              as="span"
              pos="absolute"
              color={active ? 'white' : 'brand.green.200'}
            >
              <Icon as={BiCheck} boxSize={5} />
            </Flex>
          )}
        </Flex>
      )}
    </Listbox.Option>
  )
}

export default ListBoxOption
