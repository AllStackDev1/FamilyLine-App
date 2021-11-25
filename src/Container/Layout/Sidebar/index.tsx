import { FC } from 'react'
import { List } from '@chakra-ui/react'
import SidebarItem from './SidebarItem'
import {
  ProfileIcon,
  FamilyIcon,
  EventsIcon,
  MemoryIcon,
  BellIcon
} from 'utils/Theme/custom-icon'

const Sidebar: FC = (): JSX.Element => {
  const menu = [
    {
      title: 'Profile',
      icon: ProfileIcon
    },
    {
      title: 'My Family',
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
