import { FC } from 'react'

import { Text, Flex, Heading } from '@chakra-ui/react'

import Wrapper from 'container/Layout'

const AccountSuccess: FC = () => {
  document.title = 'Family Line | Congratulations 🚀🚀🚀'

  return (
    <Wrapper isAuth>
      <Flex
        flexDir="column"
        h="50vh"
        my={{ xl: 10 }}
        align="center"
        justify="center"
      >
        <Heading>Congratulations 🚀🚀🚀 </Heading>
        <Text>your account has been created successfully</Text>
      </Flex>
    </Wrapper>
  )
}

export default AccountSuccess
