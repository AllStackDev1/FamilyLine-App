import { FC } from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'
import Wrapper from 'container/Layout'
import FamilyChart from 'components/FamilyChart'

export type Views = 'add' | 'chart'

const MyFamily: FC = () => {
  document.title = 'Family Line | Tree'

  return (
    <Wrapper>
      <Box my={{ xl: 10 }} width={{ xl: '80%' }}>
        <Box mb={5}>
          <Heading fontWeight={500} fontSize="xl">
            Welcome to you family tree:{' '}
            <Text as="span" fontWeight={600} color="green.500">
              add
            </Text>
            ,{' '}
            <Text as="span" fontWeight={600} color="blue.500">
              edit
            </Text>
            , or{' '}
            <Text as="span" fontWeight={600} color="red.500">
              delete
            </Text>{' '}
            members
          </Heading>
        </Box>
        <FamilyChart />
      </Box>
    </Wrapper>
  )
}

export default MyFamily
