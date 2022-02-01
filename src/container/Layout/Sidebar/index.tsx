import { FC } from 'react'
import { List } from '@chakra-ui/react'
import SidebarItem from 'container/Layout/Sidebar/SidebarItem'
import {
  EventsIcon,
  MemoryIcon,
  BellIcon,
  FamilyIcon
} from 'utils/theme/custom-icon'
import { BiLogOutCircle } from 'react-icons/bi'

const Sidebar: FC = (): JSX.Element => {
  const menu = [
    {
      title: 'Members',
      icon: FamilyIcon
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
    },
    {
      bottom: 0,
      pos: 'absolute',
      title: 'Logout',
      icon: BiLogOutCircle
    }
  ]

  return (
    <List pos="relative" h="50vh">
      {menu?.map((item, idx) => (
        <SidebarItem key={idx + 1} {...item} />
      ))}
    </List>
  )
}

export default Sidebar
