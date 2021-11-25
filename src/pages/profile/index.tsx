import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { authStore } from 'stores/auth.store'
import { profile } from 'utils/Api/services'

import Wrapper from 'container/Layout'
import AddMemberForm from 'components/AddMemberForm'

const Profile: FC = () => {
  document.title = 'Family Line | Profile'

  const { data, isLoading, error, refetch } = useQuery('profile', () =>
    profile()
  )

  console.log(data)

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
