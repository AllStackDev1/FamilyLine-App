import { FC } from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import DesktopNav from 'container/Layout/Navbar/Desktop'
import MobileNav from 'container/Layout/Navbar/Mobile'
import Sidebar from 'container/Layout/Sidebar'
import { WEBSITE_URL } from 'utils/variables'
import ProfileForm from 'components/ProfileForm'

const Wrapper: FC<{ isAuth?: boolean }> = ({ children, isAuth }) => {
  const menus = [
    {
      title: 'Home',
      link: `${WEBSITE_URL}/`,
      id: 1
    },
    {
      title: 'About Us',
      link: `${WEBSITE_URL}/about-us`,
      id: 2
    },
    {
      title: 'Privacy',
      link: `${WEBSITE_URL}/privacy`,
      id: 3
    },
    {
      title: 'Contact',
      link: `${WEBSITE_URL}/contact-us`,
      id: 4
    }
  ]

  return (
    <Flex
      as="main"
      maxH="100vh"
      align="center"
      color="gray.900"
      flexDir="column"
      bg="brand.bg.200"
      h={'100%'}
      overflow={'hidden'}
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
            h="calc(100vh - 120px)"
            shadow="0 4px 50px 0 rgba(0,0,0,0.1)"
            roundedTopRight="3xl"
            mt={{ md: 20, lg: 32 }}
            py={{ md: 24, lg: 6 }}
            d={{ base: 'none', md: 'block' }}
            pr={{ md: 4, lg: 3, xl: 4, '2xl': 5 }}
            position={'relative'}
          >
            <Flex direction="column" align="center" mb={8}>
              <ProfileForm />
            </Flex>
            <Sidebar />
          </GridItem>
        )}
        <GridItem
          d="flex"
          mt={{ md: 16, lg: 24 }}
          justifyContent="center"
          h="calc(100vh - 120px)"
          overflowY={'scroll'}
        >
          {children}
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default Wrapper
