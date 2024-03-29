import { FC, useState, useEffect } from 'react'
import { NavLink as ReachRouter, useLocation } from 'react-router-dom'
import {
  Box,
  Link,
  Text,
  Flex,
  Fade,
  Image,
  useDisclosure,
  IconButton,
  Divider
} from '@chakra-ui/react'

import Logo from 'assets/images/logo.png'
import Logo2x from 'assets/images/logo@2x.png'

import { INavMenu } from 'interfaces/mics.interface'
import { FiMenu, FiX } from 'react-icons/fi'

const Layout: FC<{ menus: INavMenu[]; isAuth?: boolean }> = ({
  menus,
  isAuth
}) => {
  const { isOpen, onToggle } = useDisclosure()
  const [_menus, setMenus] = useState(menus)
  const location = useLocation()
  const path = location.pathname

  useEffect(() => {
    if (isAuth) {
      setMenus(e => [
        ...e,
        {
          title: 'Login',
          id: 6
        },
        {
          link: '/register',
          title: 'Sign Up',
          id: 7
        }
      ])
    } else {
      setMenus(menus)
    }
  }, [isAuth, menus])

  return (
    <Flex
      h={24}
      as="nav"
      w="full"
      shadow="sm"
      align="center"
      pos="relative"
      px={{ base: 2 }}
      justify="space-between"
      display={{ base: 'flex', xl: 'none' }}
    >
      <Box as="picture">
        <source srcSet={`${Logo2x}`} />
        <Image src={`${Logo}`} alt="logo" h={12} />
      </Box>
      <Box textTransform="capitalize" fontSize={20} fontWeight="bold">
        {path.replace('/', '').replace('-', ' ')}
      </Box>

      <Box>
        <IconButton
          aria-label="toggle menu"
          onClick={() => onToggle()}
          color="brand.green.200"
          icon={isOpen ? <FiX size={25} /> : <FiMenu size={25} />}
          bg="transparent"
          role="button"
        />
        <Box pos="relative">
          <Fade in={isOpen}>
            {isOpen && (
              <Box
                w={40}
                right={4}
                shadow="lg"
                zIndex={10}
                rounded="md"
                pos="absolute"
                bgColor="white"
              >
                <Box py={2}>
                  {_menus.map((m, idx) => (
                    <Box display={m?.disable}>
                      <Flex justify="end" pr={5} py={3} key={idx}>
                        <Link
                          as={ReachRouter}
                          to={m.link ?? `/${m.title.toLowerCase()}`}
                        >
                          <Text fontWeight={700}>{m.title}</Text>
                        </Link>
                      </Flex>
                      {_menus.length !== idx + 1 && <Divider />}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Fade>
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout
