import { FC } from 'react'
import { NavLink as ReachRouter } from 'react-router-dom'
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

import Logo from 'Assets/Images/logo.png'
import Logo2x from 'Assets/Images/logo@2x.png'

import { INavMenu } from 'Interfaces/mics.interface'
import { FiMenu, FiX } from 'react-icons/fi'

const Layout: FC<{ menus: INavMenu[] }> = ({ menus }) => {
  const { isOpen, onToggle } = useDisclosure()

  const _menus = [
    ...menus,
    {
      title: 'Login'
    },
    {
      link: '/register',
      title: 'Sign Up'
    }
  ]

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
      d={{ base: 'flex', xl: 'none' }}
    >
      <Box as="picture">
        <source srcSet={`${Logo2x}`} />
        <Image src={`${Logo}`} alt="logo" h={12} />
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
                    <Box display={m?.disable === 'hidden' ? 'none' : ''}>
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
