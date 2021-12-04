/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, MouseEventHandler } from 'react'
import { FiX } from 'react-icons/fi'
import { Text, Fade, Flex, IconButton } from '@chakra-ui/react'

interface IProps {
  error: any
  touched?: boolean
  onClear: MouseEventHandler<HTMLElement>
}

const FormErrorHandler: FC<IProps> = ({ onClear, error, touched }) => {
  return (
    <Fade in={!!error && touched}>
      <Flex
        borderBottomRadius="md"
        justify="space-between"
        align="center"
        bgColor="white"
        color="red.500"
        pos="absolute"
        zIndex={10}
        shadow="md"
        w="full"
        p={3}
      >
        <Text
          fontSize="xs"
          dangerouslySetInnerHTML={{
            __html: error
          }}
        />
        <IconButton
          boxSize={6}
          icon={<FiX />}
          bg="transparent"
          aria-label="close"
          onClick={onClear}
          _hover={{ bg: 'transparent' }}
          _focus={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
        />
      </Flex>
    </Fade>
  )
}

export default FormErrorHandler
