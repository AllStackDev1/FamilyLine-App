import { FC } from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'
import Wrapper from 'container/Layout'

export type Views = 'add' | 'chart'

const MyFamily: FC = () => {
  document.title = 'Family Line | Tree'

  return (
    <Wrapper>
      <Box my={{ xl: 10 }} width={{ xl: '80%' }}>
        <Box mb={5} textAlign={'center'}>
          <Heading fontWeight={500} fontSize="2xl" mb={2}>
            Your Family Tree
          </Heading>
          <Text mb={6}>
            You can <strong>add</strong>, <strong>edit</strong> and{' '}
            <strong>remove </strong> member from your family tree here
          </Text>
        </Box>
        {/* <FamilyChart /> */}
      </Box>
    </Wrapper>
  )
}

export default MyFamily
