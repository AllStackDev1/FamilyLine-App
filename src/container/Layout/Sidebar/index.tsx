import { FC } from 'react'
import { List } from '@chakra-ui/react'
import SidebarItem from 'container/Layout/Sidebar/SidebarItem'
import { EventsIcon, MemoryIcon, BellIcon } from 'utils/theme/custom-icon'

import { GiFamilyTree } from 'react-icons/gi'

const Sidebar: FC = (): JSX.Element => {
  const menu = [
    {
      title: 'Tree',
      icon: GiFamilyTree
    },
    {
      title: 'Memories',
      icon: MemoryIcon
    },
    {
      title: 'Notifications',
      icon: BellIcon
    },
    {
      title: 'Events',
      icon: EventsIcon
    }
  ]

  return (
    <List>
      {menu?.map((item, idx) => (
        <SidebarItem key={idx + 1} icon={item.icon} title={item.title} />
      ))}
    </List>
  )
}

export default Sidebar
