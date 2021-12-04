import { FC } from 'react'
import { Box, Flex, Grid, Image, Text, Icon } from '@chakra-ui/react'
import { FilledButton, SecondaryButton } from 'Components/Buttons'
import { FaShareAlt } from 'react-icons/fa'
import { Views } from 'pages/memories'
import { useQuery } from 'react-query'
import { getEvents } from 'Utils/Api/services'

import Birthday from 'Assets/Images/Happybirthday.png'
import Funeral from 'Assets/Images/funeral.png'
import Shower from 'Assets/Images/wedding.png'
import Hangout from 'Assets/Images/Hangout.png'

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
const Events: FC<{ isAdd?: boolean; toggle: (e: Views) => void }> = ({
  toggle
}) => {
  const { data } = useQuery('family_memories', () => getEvents())

  console.log(data)
  return (
    <>
      {data ? (
        <Box p={6}>
          <Grid
            templateColumns={{ base: 'repeat(2,1fr)', xl: 'repeat(3, 1fr)' }}
            gap={10}
          >
            {data.map(item => (
              <Box>
                <Box
                  h={'auto'}
                  rounded={'3xl'}
                  w="full"
                  pos="relative"
                  overflow="hidden"
                  bg="gray.300"
                  minH={60}
                >
                  <Image src={item.event_file} w="full" />
                </Box>
                <Text textAlign="center" mt={2} fontWeight="bold">
                  {item.event_name}
                </Text>
              </Box>
            ))}
          </Grid>
          <Flex mt={24} align="center" justify="center">
            <Box>
              <SecondaryButton
                title="Add Event"
                mr={4}
                onClick={() => toggle('add')}
              />
              <FilledButton
                title="Share Events"
                rightIcon={<Icon as={FaShareAlt} color="white" />}
              />
            </Box>
          </Flex>
        </Box>
      ) : (
        <Flex h="100%" w="100%" align="center" justify="center">
          Loading
        </Flex>
      )}
    </>
  )
}

export default Events
