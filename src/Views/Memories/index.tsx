import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'Container/Layout'
import Memories from 'Components/Memories'

const Profile: FC = () => {
  document.title = 'Family Line | Profile'

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        <Memories />
      </Box>
    </Wrapper>
  )
}

export default Profile