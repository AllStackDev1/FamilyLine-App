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

interface IMemories {
  thumb: string
  length: number
}
const MemoriesData: IMemories[] = [
  {
    thumb: String(FamilyDinner),
    length: 11
  },
  {
    thumb: String(Party),
    length: 1
  },
  {
    thumb: String(People),
    length: 6
  },
  {
    thumb: String(Wedding),
    length: 3
  },
  {
    thumb: String(Birthday),
    length: 1
  },
  {
    thumb: String(Dinner),
    length: 2
  }
]
const Memories: FC = () => {
  return (
    <Box>
      <Grid
        templateColumns={{ base: 'repeat(2,1fr)', xl: 'repeat(3, 1fr)' }}
        gap={10}
      >
        {MemoriesData.map(item => (
          <Box
            h={48}
            rounded={'3xl'}
            w="full"
            bg="gray.200"
            pos="relative"
            overflow="hidden"
          >
            <Image src={item.thumb} w="full" />
            <Flex
              pos="absolute"
              bg={'blackAlpha.400'}
              w="full"
              h="full"
              top={0}
              rounded={'3xl'}
              justify="center"
              align="center"
              fontSize={62}
              fontWeight={600}
            >
              {item.length > 1 ? (
                <Text color="whiteAlpha.800">{item.length - 1}+</Text>
              ) : (
                <Icon as={FaPlay} color="whiteAlpha.800" />
              )}
            </Flex>
          </Box>
        ))}
      </Grid>
      <Flex mt={12} align="center" justify="center">
        <Box>
          <SecondaryButton title="Add Memory" mr={4} />
          <FilledButton title="Share Memories" />
        </Box>
      </Flex>
    </Box>
  )
}

export default Memories
