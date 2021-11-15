/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { Box, Flex, Link, Icon, Text, ListItem } from '@chakra-ui/react'

interface ISidebarItem {
  icon: any
  title: string
}

const SidebarItem: React.FC<ISidebarItem> = ({ icon, title }) => {
  const { pathname } = useLocation()

  const to = `/${title.toLowerCase().replace(' ', '-')}`

  return (
    <ListItem my={3} role="group">
      <Link d="flex" as={NavLink} justifyItems="center" to={to}>
        <Box
          _groupHover={{
            borderLeftWidth: 4,
            borderLeftColor: 'brand.green.200',
            boxShadow: '0px 0px 45px 3px #efefef'
          }}
          ml={1}
          borderLeftWidth={pathname === to ? 4 : 0}
          borderLeftColor={pathname === to ? 'brand.green.200' : 'inherit'}
        />

        <Flex
          alignItems="center"
          px={{ md: 6, lg: 4, xl: 10 }}
          py={{ md: 2, lg: 4, xl: 4 }}
        >
          <Icon as={icon} boxSize={7} />
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
