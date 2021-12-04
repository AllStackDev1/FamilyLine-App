import React from 'react'
import { Flex, Icon, IconButton } from '@chakra-ui/react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

interface IProps {
  handleClick: (item: number) => void
}

const ArrowButtons: React.FC<IProps> = ({ handleClick }) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      pos="absolute"
      top="50%"
      w="100%"
      zIndex={20}
    >
      <IconButton
        rounded="full"
        colorScheme="blue"
        aria-label="Search database"
        icon={<Icon as={BiChevronLeft} />}
        onClick={() => handleClick(-1)}
      />
      <IconButton
        rounded="full"
        colorScheme="blue"
        aria-label="Search database"
        icon={<Icon as={BiChevronRight} />}
        onClick={() => handleClick(+1)}
      />
    </Flex>
  )
}

export default ArrowButtons
