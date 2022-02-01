/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from 'react'
import { NavLink as ReachRouter } from 'react-router-dom'
import { Box, Text, Flex, Link, Image } from '@chakra-ui/react'

import Logo from 'assets/images/logo.png'
import Logo2x from 'assets/images/logo@2x.png'
import { INavMenu } from 'interfaces/mics.interface'

interface IAuthLink {
  to: string
  text: string
  disable?: any
  id?: number
}

const AuthLink: FC<IAuthLink> = ({ to, text, disable }) => (
  <Link
    display={disable}
    _hover={{ textDecor: 'none' }}
    transition="box-shadow 1s"
    py={{ md: 3 }}
    px={{ md: 6 }}
    rounded="full"
    href={to}
  >
    <Text fontWeight={700}>{text}</Text>
  </Link>
)

const Layout: FC<{ menus: INavMenu[]; isAuth?: boolean }> = ({
  menus,
  isAuth
}) => {
  const [bgColor, setBgColor] = useState(
    'linear-gradient(180deg, rgba(0, 191, 77, 0.08) 0%, rgba(2, 153, 62, 0.08) 100%);'
  )

  // navbar scroll changeBackground function
  const changeBackground = () => {
    if (window.scrollY >= 30) {
      setBgColor('#FCFCFC')
    } else {
      setBgColor(
        'linear-gradient(180deg, rgba(0, 191, 77, 0.08) 0%, rgba(2, 153, 62, 0.08) 100%);'
      )
    }
  }

  useEffect(() => {
    changeBackground()
    window.addEventListener('scroll', changeBackground)
  })

  return (
    <Flex
      top={0}
      as="nav"
      w="full"
      left={0}
      right={0}
      pos="fixed"
      zIndex={100}
      align="center"
      bgColor="brand.green.50"
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
            disable={m.disable || ''}
            text={m.title}
            id={m.id}
            to={m.link ?? `/${m.title.toLowerCase()}`}
          />
        ))}
      </Flex>

      {isAuth ? (
        <Flex align="center">
          <Link
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
            rounded="full"
            to={'/login'}
          >
            <Text fontWeight={700}>Log in</Text>
          </Link>
          <Box mx={2} />
          <Link
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
            rounded="full"
            to={'/register'}
          >
            <Text fontWeight={700}>Sign up</Text>
          </Link>
        </Flex>
      ) : (
        <Box />
      )}
    </Flex>
  )
}

export default Layout
