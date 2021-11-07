import { FC } from 'react'
import { Text, Box, Button } from '@chakra-ui/react'
import { IoIosRefresh } from 'react-icons/io'

interface IProps {
  refetch(): void
}

const ErrorReloadButton: FC<IProps> = ({ refetch }) => {
  return (
    <Box>
      <Text ml={2}>Something went wrong</Text>
      <Button
        size="md"
        fontSize={20}
        rounded="20px"
        colorScheme="brandGreen"
        onClick={() => refetch()}
        leftIcon={<IoIosRefresh />}
      >
        <Text fontSize="md">Try again</Text>
      </Button>
    </Box>
  )
}

export default ErrorReloadButton
