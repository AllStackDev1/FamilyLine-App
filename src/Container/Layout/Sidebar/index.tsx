import { FC } from 'react'
import { List } from '@chakra-ui/react'
import SidebarItem from './SidebarItem'
import { ProfileIcon } from 'Utils/Theme/custom-icon'

const Sidebar: FC = (): JSX.Element => {
  const menu = [
    {
      title: 'Profile',
      icon: ProfileIcon
    },
    {
      title: 'My Family',
      icon: ''
    },
    {
      title: 'Memories',
      icon: ''
    },
    {
      title: 'Notifications',
      icon: ''
    },
    {
      title: 'Events',
      icon: ''
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
