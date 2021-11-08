import { FC } from 'react'
import { Flex } from '@chakra-ui/react'

import { INavMenu } from 'Interfaces/mics.interface'
import Desktop from './Navbar/Desktop'
import Mobile from './Navbar/Mobile'
import useAuth from 'Utils/Providers/AuthContextProvider'

const Wrapper: FC = ({ children }) => {
  const { token } = useAuth()

  const menus: INavMenu[] = [
    {
      title: 'Profile',
      disable: token ? '' : 'hidden'
    },
    {
      title: 'Blog'
    },
    {
      title: 'Privacy'
    },
    {
      title: 'Contact'
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
      <Desktop menus={menus} />
      <Mobile menus={menus} />
      <Flex mt={{ md: 16, lg: 24 }} w="full" justify="center">
        {children}
      </Flex>
    </Flex>
  )
}

export default Wrapper
