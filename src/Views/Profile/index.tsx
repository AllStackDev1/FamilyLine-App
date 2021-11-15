import { FC } from 'react'
import {
  Box,
  Text,
  Link,
  Grid,
  Flex,
  GridItem,
  Heading,
  Divider
} from '@chakra-ui/react'

import Wrapper from 'Container/Layout'

const Profile: FC = () => {
  document.title = 'Family Line | Profile'

  return <Wrapper active={2}></Wrapper>
}

export default Profile
