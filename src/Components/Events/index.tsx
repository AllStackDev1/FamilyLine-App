import { FC } from 'react'
import { Box, Flex, Grid, Image, Text, Icon } from '@chakra-ui/react'
import { FilledButton, SecondaryButton } from 'Components/Buttons'
import { FaPlay } from 'react-icons/fa'

import FamilyDinner from 'Assets/Images/family-dinner.png'
import Party from 'Assets/Images/party.png'
import Wedding from 'Assets/Images/wedding.png'
import People from 'Assets/Images/people.png'
import Birthday from 'Assets/Images/birthday.png'
import Dinner from 'Assets/Images/dinner.png'

interface IEvents {
  thumb: string
  title: string
}
const EventsData: IEvents[] = [
  {
    thumb: String(FamilyDinner),
    title: 'My Son’s 15th Birthday'
  },
  {
    thumb: String(Party),
    title: "Mom's funeral"
  },
  {
    thumb: String(People),
    title: 'Shereens Baby Shower'
  },
  {
    thumb: String(Wedding),
    title: 'Family Beach Hangout'
  }
]
const Events: FC = () => {
  return (
    <Box>
      <Grid
        templateColumns={{ base: 'repeat(2,1fr)', xl: 'repeat(3, 1fr)' }}
        gap={10}
      >
        {EventsData.map(item => (
          <Box>
            <Box
              h={48}
              rounded={'3xl'}
              w="full"
              bg="gray.200"
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
          <FilledButton title="Share Events" />
        </Box>
      </Flex>
    </Box>
  )
}

export default Events
