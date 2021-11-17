import { FC, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'Container/Layout'
import AddMemberForm from 'Components/AddMemberForm'
import FamilyChart from 'Components/FamilyChart'

const MyFamily: FC = () => {
  document.title = 'Family Line | My Family'
  type Views = 'add' | 'chart'

  const [view, setView] = useState<Views>('add')

  const toggle = (e: Views) => setView(e)

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        {view === 'add' && <AddMemberForm isAdd />}
        {view === 'chart' && <FamilyChart />}
      </Box>
    </Wrapper>
  )
}

export default MyFamily
