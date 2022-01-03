import { FC } from 'react'
import { List } from '@chakra-ui/react'
import SidebarItem from 'container/Layout/Sidebar/SidebarItem'
import {
  EventsIcon,
  MemoryIcon,
  BellIcon,
  FamilyIcon
} from 'utils/theme/custom-icon'
import { AiOutlinePoweroff } from 'react-icons/ai'

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
      title: 'Logout',
      icon: AiOutlinePoweroff
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
