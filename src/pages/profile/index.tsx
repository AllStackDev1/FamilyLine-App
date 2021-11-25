import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import { profile } from 'Utils/Api/services'

import Wrapper from 'Container/Layout'
import AddMemberForm from 'Components/AddMemberForm'

const Profile: FC = () => {
  document.title = 'Family Line | Profile'

  const { data } = useQuery('profile', () => profile())

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
