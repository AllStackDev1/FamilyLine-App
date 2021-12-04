import { FC, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Wrapper from 'container/Layout'
import Events from 'components/Events'
import AddEvent from 'components/AddEvent'

export type Views = 'add' | 'view'

const Profile: FC = () => {
  document.title = 'Family Line | Events'
  const [view, setView] = useState<Views>('view')
  const toggle = (e: Views) => setView(e)

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        {view === 'add' && <AddEvent isAdd toggle={toggle} />}
        {view === 'view' && <Events toggle={toggle} />}
      </Box>
    </Wrapper>
  )
}

export default Profile
