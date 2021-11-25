import { FC } from 'react'
import { Box, Flex, Text, Icon } from '@chakra-ui/react'
import Wrapper from 'Container/Layout'
import { FcGoogle } from 'react-icons/fc'

const Notification: FC = () => {
  document.title = 'Family Line | Notification'

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        <Flex w="md" justify="space-between" px={4} py={6} shadow="md">
          <Box>
            <Text>
              Link your Gmail to your account for more security and account
              recovery
            </Text>
          </Box>
          <Box>
            <Icon as={FcGoogle} boxSize={10} />
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  )
}

export default Notification
