import { FC, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'container/Layout'
import Memories from 'components/Memories'
import AddMemories from 'components/AddMemory'

export type Views = 'add' | 'view'

const Profile: FC = () => {
  document.title = 'Family Line | Memories'
  const [view, setView] = useState<Views>('view')
  const toggle = (e: Views) => setView(e)
  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        {view === 'add' && <AddMemories isAdd toggle={toggle} />}
        {view === 'view' && <Memories toggle={toggle} />}
      </Box>
    </Wrapper>
  )
}

export default Profile
