import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'container/Layout'
import AddMemberForm from 'components/AddMemberForm'
import { useQuery } from 'react-query'

import { familyStore } from 'stores/member.store'
import { getFamilyMembers } from 'utils/api/services'

export type Views = 'add' | 'chart'

const AddMember: FC = () => {
  document.title = 'Family Line | Add Member'

  const { data, error, isLoading, refetch } = useQuery(
    'family-members',
    () => getFamilyMembers(),
    {
      refetchOnWindowFocus: false,
      staleTime: 300000
    }
  )

  return (
    <Wrapper>
      <Box my={{ xl: 10 }} width={{ xl: '80%' }}>
        {data?.length === 0 ? <AddMemberForm isAdd /> : <Box />}
      </Box>
    </Wrapper>
  )
}

export default AddMember
