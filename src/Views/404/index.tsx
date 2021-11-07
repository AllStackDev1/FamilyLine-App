import { Flex, Text } from '@chakra-ui/react'

const NotFound = (): JSX.Element => {
  return (
    <Flex w="full" h="100vh">
      <Text m="auto" fontFamily="cursive" fontSize="3xl">
        404 | Page Not Found
      </Text>
    </Flex>
  )
}

export default NotFound
