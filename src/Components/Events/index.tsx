import { FC } from 'react'
import { Box, Flex, Grid, Image, Text, Icon } from '@chakra-ui/react'
import { FilledButton, SecondaryButton } from 'components/Buttons'
import { FaShareAlt } from 'react-icons/fa'

import Birthday from 'assets/images/Happybirthday.png'
import Funeral from 'assets/images/funeral.png'
import Shower from 'assets/images/wedding.png'
import Hangout from 'assets/images/Hangout.png'

interface IEvents {
  thumb: string
  title: string
}
const EventsData: IEvents[] = [
  {
    thumb: String(Birthday),
    title: 'My Son’s 15th Birthday'
  },
  {
    thumb: String(Funeral),
    title: "Mom's funeral"
  },
  {
    thumb: String(Shower),
    title: 'Shereens Baby Shower'
  },
  {
    thumb: String(Hangout),
    title: 'Family Beach Hangout'
  }
]
const Events: FC = () => {
  return (
    <Box p={6}>
      <Grid
        templateColumns={{ base: 'repeat(2,1fr)', xl: 'repeat(3, 1fr)' }}
        gap={10}
      >
        {EventsData.map(item => (
          <Box>
            <Box
              h={'auto'}
              rounded={'3xl'}
              w="full"
              pos="relative"
              overflow="hidden"
            >
              <Image src={item.thumb} w="full" />
            </Box>
            <Text textAlign="center" mt={2} fontWeight="bold">
              {item.title}
            </Text>
          </Box>
        ))}
      </Grid>
      <Flex mt={24} align="center" justify="center">
        <Box>
          <SecondaryButton title="Add Event" mr={4} />
          <FilledButton
            title="Share Events"
            rightIcon={<Icon as={FaShareAlt} color="white" />}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Events
