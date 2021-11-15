import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'Container/Layout'
import AddMemberForm from 'Components/AddMemberForm'

const Profile: FC = () => {
  document.title = 'Family Line | Profile'

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        <AddMemberForm />
      </Box>
    </Wrapper>
  )
}

export default Profile
