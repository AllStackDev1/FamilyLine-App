import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'container/Layout'
import Events from 'components/Events'

const Profile: FC = () => {
  document.title = 'Family Line | Profile'

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        <Events />
      </Box>
    </Wrapper>
  )
}

export default Profile
