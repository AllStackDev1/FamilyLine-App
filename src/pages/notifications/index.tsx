import { FC } from 'react'
import { Box, Flex, Text, Image, Grid, GridItem } from '@chakra-ui/react'
import Wrapper from 'container/Layout'
import { FcGoogle } from 'react-icons/fc'

import GM from 'assets/images/gmail.png'
import Person from 'assets/images/person.png'
import FB from 'assets/images/fb.png'
import Smile from 'assets/images/smile.png'
import Family1 from 'assets/images/family1.png'

const notifications = [
  {
    description:
      'Link your Gmail to your account for more security and account recovery',
    image: String(GM),
    bg: 'white',
    imagePadding: 2
  },
  {
    description: 'You deleted a member from your family tree',
    image: String(Smile),
    bg: 'linear-gradient(to top, #FF4343  0%, #E40505 100%)',
    color: 'white',
    imagePadding: 0
  },
  {
    description: 'You have successfully linked your account to Facebook',
    image: String(Person),
    bg: 'white'
  },
  {
    description: 'You shared your family video to Facebook',
    image: String(Family1),
    bg: 'linear-gradient(to top, #00BF4D  0%, #02993E 100%)',
    color: 'white'
  },
  {
    description: 'You have successfully linked your account to Facebook',
    image: String(FB),
    bg: 'white'
  }
]
const Alert = ({ notice }) => (
  <Grid
    w="md"
    justify="space-between"
    px={4}
    py={6}
    shadow="md"
    rounded={'lg'}
    mb={12}
    templateColumns="repeat(6,1fr)"
    bg={notice.bg}
  >
    <Box as={GridItem} colSpan={5}>
      <Text color={notice.color}>{notice.description}</Text>
    </Box>
    <Flex
      as={GridItem}
      colsSpan={1}
      w={12}
      h={12}
      shadow="md"
      rounded={'full'}
      align={'center'}
      justify={'center'}
      bg={'white'}
      overflow="hidden"
      p={notice.imagePadding}
    >
      <Image src={notice.image} objectFit="cover" />
    </Flex>
  </Grid>
)
const Notification: FC = () => {
  document.title = 'Family Line | Notification'

  return (
    <Wrapper>
      <Box my={{ xl: 20 }} width={{ xl: '80%' }}>
        <Grid templateColumns="repeat(2,1fr)">
          {notifications.map(item => (
            <GridItem>
              <Alert notice={item} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Wrapper>
  )
}

export default Notification
