import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { profile } from 'utils/api/services'

import Wrapper from 'container/Layout'
import AddMemberForm from 'components/AddMemberForm'

const Profile: FC = () => {
  document.title = 'Family Line | Profile'

  const { data } = useQuery('profile', () => profile())

  // useEffect(() => {
  //   authStore.setState({user: data})
  // }, [data])

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        <AddMemberForm />
      </Box>
    </Wrapper>
  )
}

export default Profile
