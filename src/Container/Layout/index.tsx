import { FC } from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'

import DesktopNav from './Navbar/Desktop'
import MobileNav from './Navbar/Mobile'
import useAuth from 'Utils/Providers/AuthContextProvider'
import Sidebar from './Sidebar'

const Wrapper: FC<{ isAuth?: boolean; active: number }> = ({
  children,
  isAuth,
  active
}) => {
  const { token } = useAuth()

  const menus = [
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
      <Grid
        templateColumns={
          isAuth
            ? {}
            : {
                md: '30% 70%',
                lg: '25% 75%',
                xl: '20% 80%',
                '5xl': '15% 85%'
              }
        }
        w="full"
        pos="relative"
      >
        {!isAuth && (
          <GridItem
            bg="white"
            minH="80vh"
            shadow="lg"
            roundedRight="xl"
            mt={{ md: 20, lg: 32 }}
            py={{ md: 24, lg: 32 }}
            d={{ base: 'none', md: 'block' }}
            pr={{ md: 4, lg: 3, xl: 4, '2xl': 5 }}
          >
            <Sidebar />
          </GridItem>
        )}
        <GridItem d="flex" mt={{ md: 16, lg: 24 }} justifyContent="center">
          {children}
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default Wrapper
