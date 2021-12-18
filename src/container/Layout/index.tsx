import { FC } from 'react'
import { Flex, Grid, GridItem, Box, Icon, Text } from '@chakra-ui/react'
import DesktopNav from 'container/Layout/Navbar/Desktop'
import MobileNav from 'container/Layout/Navbar/Mobile'
import Sidebar from 'container/Layout/Sidebar'
import { WEBSITE_URL } from 'utils/variables'
import ProfileForm from 'components/ProfileForm'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { authStore } from 'stores/auth.store'

const Wrapper: FC<{ isAuth?: boolean }> = ({ children, isAuth }) => {
  const { logout } = authStore(state => state)

  const logoutApp = () => {
    logout()
    window.location.reload()
  }
  const menus = [
    {
      title: 'Home',
      link: `${WEBSITE_URL}/`,
      id: 1
    },
    {
      title: 'Blog',
      link: `${WEBSITE_URL}/blog`,
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
            minH="70vh"
            shadow="0 4px 50px 0 rgba(0,0,0,0.1)"
            roundedRight="xl"
            mt={{ md: 20, lg: 32 }}
            py={{ md: 24, lg: 6 }}
            d={{ base: 'none', md: 'block' }}
            pr={{ md: 4, lg: 3, xl: 4, '2xl': 5 }}
            position={'relative'}
          >
            <Flex direction="column" align="center" mb={12}>
              <ProfileForm />
            </Flex>
            <Sidebar />
            <Flex
              alignItems="center"
              px={{ md: 6, lg: 4, xl: 10 }}
              py={{ md: 2, lg: 4, xl: 4 }}
              pos={'absolute'}
              bottom={3}
              mt={12}
              cursor={'pointer'}
              onClick={() => logoutApp()}
            >
              <Icon
                as={AiOutlinePoweroff}
                color="rgb(0, 175, 70)"
                boxSize={7}
              />
              <Box as="span" ml={6}>
                <Text color="gray.700" fontSize={{ md: 'md' }} fontWeight={600}>
                  Logout
                </Text>
              </Box>
            </Flex>
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
