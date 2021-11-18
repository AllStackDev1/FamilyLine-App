import { FC } from 'react'
import { Flex, Grid, GridItem, Text, Avatar } from '@chakra-ui/react'

import DesktopNav from './Navbar/Desktop'
import MobileNav from './Navbar/Mobile'
import Sidebar from './Sidebar'

const Wrapper: FC<{ isAuth?: boolean }> = ({ children, isAuth }) => {
  const menus = [
    {
      title: 'Home',
      link: 'https://familyline.netlify.app/',
      id: 1
    },
    {
      title: 'Blog',
      link: 'https://familyline.netlify.app/blog',
      id: 2
    },
    {
      title: 'Privacy',
      link: 'https://familyline.netlify.app/privacy',
      id: 3
    },
    {
      title: 'Contact',
      link: 'https://familyline.netlify.app/contact',
      id: 4
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
      <DesktopNav menus={menus} isAuth={isAuth} />
      <MobileNav menus={menus} isAuth={isAuth} />
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
            shadow="0 4px 50px 0 rgba(0,0,0,0.1)"
            roundedRight="xl"
            mt={{ md: 20, lg: 32 }}
            py={{ md: 24, lg: 6 }}
            d={{ base: 'none', md: 'block' }}
            pr={{ md: 4, lg: 3, xl: 4, '2xl': 5 }}
          >
            <Flex direction="column" align="center" mb={12}>
              <Avatar
                name="Dan Abrahmov"
                size="xl"
                src="https://bit.ly/dan-abramov"
              />
              <Text fontWeight="medium" mt={3}>
                Henry Gates
              </Text>
            </Flex>
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
