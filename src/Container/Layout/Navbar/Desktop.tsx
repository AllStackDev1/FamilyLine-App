/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { NavLink as ReachRouter } from 'react-router-dom'
import { Box, Text, Flex, Link, Image } from '@chakra-ui/react'

import Logo from 'Assets/Images/logo.png'
import Logo2x from 'Assets/Images/logo@2x.png'
import { INavMenu } from 'Interfaces/mics.interface'

interface IAuthLink {
  to: string
  text: string
  display?: any
}

const AuthLink: FC<IAuthLink> = ({ to, text, display }) => (
  <Link
    visibility={display}
    _activeLink={{
      color: 'white',
      background: 'linear-gradient(to left, #02993E, #00BF4D)',
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
    }}
    _hover={{ textDecor: 'none' }}
    transition="box-shadow 1s"
    as={ReachRouter}
    py={{ md: 3 }}
    px={{ md: 6 }}
    rounded="2xl"
    to={to}
  >
    <Text fontWeight={700}>{text}</Text>
  </Link>
)

const Layout: FC<{ menus: INavMenu[] }> = ({ menus }) => {
  return (
    <Flex
      top={0}
      as="nav"
      w="full"
      left={0}
      right={0}
      pos="fixed"
      shadow="sm"
      zIndex={100}
      bgColor="white"
      align="center"
      h={{ md: 16, lg: 24 }}
      justify="space-between"
      px={{ lg: 10, xl: 28 }}
      d={{ base: 'none', xl: 'flex' }}
    >
      <Box as="picture">
        <source srcSet={`${Logo2x}`} />
        <Image src={`${Logo}`} alt="logo" h={{ base: 8, md: 10, lg: 20 }} />
      </Box>

      <Flex w={110} justify="space-between">
        {menus.map((m, i) => (
          <AuthLink
            key={i}
            display={m.disable || ''}
            text={m.title}
            to={m.link ?? `/${m.title.toLowerCase()}`}
          />
        ))}
      </Flex>

      <Flex align="center">
        <AuthLink to="/login" text="Log in" />
        <Box mx={2} />
        <AuthLink to="/register" text="Sign up" />
      </Flex>
    </Flex>
  )
}

export default Layout
