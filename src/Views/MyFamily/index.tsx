import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'Container/Layout'
import AddMemberForm from 'Components/AddMemberForm'

const MyFamily: FC = () => {
  document.title = 'Family Line | My Family'

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        <AddMemberForm isAdd />
      </Box>
    </Wrapper>
  )
}

export default MyFamily
