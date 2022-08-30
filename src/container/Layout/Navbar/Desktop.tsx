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
    py={2}
    key={text}
    color="#979797"
    rounded={'full'}
    cursor={'pointer'}
    fontWeight={700}
    px={{ md: 5, lg: 8 }}
    fontSize={{ md: 16 }}
    _hover={{ textDecoration: 'none', color: 'family.500' }}
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
      mb={6}
      w="full"
      left={0}
      right={0}
      pos="fixed"
      zIndex={100}
      align="center"
      bgColor={bgColor}
      h={{ md: 16, lg: 28 }}
      justify="space-between"
      pl={{ lg: 10, xl: 28 }}
      display={{ base: 'none', xl: 'flex' }}
    >
      <Box as="picture">
        <source srcSet={`${Logo2x}`} />
        <Image src={`${Logo}`} alt="logo" h={{ base: 8, md: 10, lg: 20 }} />
      </Box>

      <Flex height={'100%'}>
        <Flex align="center">
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
      </Flex>

      {isAuth ? (
        <Flex
          align="center"
          ml={{ md: 3, lg: 6 }}
          bg="rgba(227, 255, 238, 0.56)"
          px={12}
          h="100%"
        >
          <Link
            href={`/login`}
            transition="box-shadow 1s"
            fontWeight={500}
            py={{ md: 2 }}
            px={{ md: 8 }}
            rounded="full"
            color="brandGreen.500"
            borderWidth={1}
            borderColor="brandGreen.500"
            _hover={{ bg: 'brandGreen.500', textDecor: 'none', color: 'white' }}
          >
            Log In
          </Link>
          <Box mx={2} />
          <Link
            _hover={{ bg: 'brandGreen.500', textDecor: 'none', color: 'white' }}
            href={`/register`}
            transition="box-shadow 1s"
            fontWeight={500}
            py={{ md: 2 }}
            px={{ md: 8 }}
            rounded="full"
            color="brandGreen.500"
            borderWidth={1}
            borderColor="brandGreen.500"
          >
            Sign up
          </Link>
        </Flex>
      ) : (
        <Box />
      )}
    </Flex>
  )
}

export default Layout
