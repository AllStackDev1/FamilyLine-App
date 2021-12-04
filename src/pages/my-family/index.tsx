import { FC, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'container/Layout'
import FamilyChart from 'components/FamilyChart'

export type Views = 'add' | 'chart'

const MyFamily: FC = () => {
  document.title = 'Family Line | Tree'

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        <FamilyChart />
      </Box>
    </Wrapper>
  )
}

export default MyFamily
