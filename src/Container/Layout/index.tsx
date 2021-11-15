import { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

import { INavMenu } from 'Interfaces/mics.interface'
import DesktopNav from './Navbar/Desktop'
import MobileNav from './Navbar/Mobile'
import useAuth from 'Utils/Providers/AuthContextProvider'

const Wrapper: FC<{ children?: ReactNode; active: number }> = ({
  active,
  children
}) => {
  const { token } = useAuth()

  const menus: INavMenu[] = [
    {
      title: 'Home',
      id: 1
    },
    {
      title: 'Account',
      disable: token ? 'block' : 'none',
      id: 2
    },
    {
      title: 'Blog',
      id: 3
    },
    {
      title: 'Privacy',
      id: 4
    },
    {
      title: 'Contact',
      id: 5
    }
  ]

  return (
    <Flex
      as="main"
      minH="100vh"
      align="center"
      color="gray.900"
      flexDir="column"
      bg="brand.bg.200"
    >
      <DesktopNav menus={menus} active={active} />
      <MobileNav menus={menus} />
      <Flex mt={{ md: 16, lg: 24 }} w="full" justify="center">
        {children}
      </Flex>
    </Flex>
  )
}

export default Wrapper
