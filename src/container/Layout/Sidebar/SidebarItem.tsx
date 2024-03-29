/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { Box, Flex, Link, Icon, Text, ListItem } from '@chakra-ui/react'

interface ISidebarItem {
  icon: any
  title: string
}

const SidebarItem: React.FC<ISidebarItem> = ({ icon, title, ...rest }) => {
  const { pathname } = useLocation()

  const to = `/${title.toLowerCase().replace(' ', '-')}`

  return (
    <ListItem my={3} role="group" {...rest}>
      <Link
        display="flex"
        as={NavLink}
        _focus={{ outline: 'none' }}
        _hover={{ outline: 'none' }}
        justifyItems="center"
        to={to}
      >
        <Box
          _groupHover={{
            borderLeftWidth: 4,
            borderLeftColor: 'brand.green.200',
            boxShadow: '0px 0px 45px 3px #efefef'
          }}
          ml={1}
          borderLeftWidth={pathname.match(new RegExp(to, 'g')) ? 4 : 0}
          borderLeftColor={
            pathname.match(new RegExp(to, 'g')) ? 'brand.green.200' : 'inherit'
          }
        />

        <Flex
          alignItems="center"
          px={{ md: 6, lg: 4, xl: 10 }}
          py={{ md: 2, lg: 4, xl: 4 }}
        >
          <Icon as={icon} color="rgb(0, 175, 70)" boxSize={7} />
          <Box as="span" ml={6}>
            <Text color="gray.700" fontSize={{ md: 'md' }} fontWeight={600}>
              {title}
            </Text>
          </Box>
        </Flex>
      </Link>
    </ListItem>
  )
}

export default SidebarItem
