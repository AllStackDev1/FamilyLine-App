import { FC, useState } from 'react'
import { Box, Flex, Grid, Image, Text, Icon } from '@chakra-ui/react'
import { FilledButton, SecondaryButton } from 'Components/Buttons'
import { FaPlay } from 'react-icons/fa'
import { useDisclosure } from '@chakra-ui/react'

import { Views } from 'pages/memories'
import FamilyDinner from 'Assets/Images/family-dinner.png'
import Party from 'Assets/Images/party.png'
import Wedding from 'Assets/Images/wedding.png'
import People from 'Assets/Images/people.png'
import Birthday from 'Assets/Images/birthday.png'
import Dinner from 'Assets/Images/dinner.png'
import MemoryModal from './Modals/MemoryModal'
import { IMemories } from 'Interfaces/Index.interface'

const MemoriesData: IMemories[] = [
  {
    thumb: String(FamilyDinner),
    length: 11,
    type: 'pic'
  },
  {
    thumb: String(Party),
    length: 1,
    type: 'vid'
  },
  {
    thumb: String(People),
    length: 6,
    type: 'pic'
  },
  {
    thumb: String(Wedding),
    length: 3,
    type: 'pic'
  },
  {
    thumb: String(Birthday),
    length: 1,
    type: 'vid'
  },
  {
    thumb: String(Dinner),
    length: 2,
    type: 'pic'
  }
]
const Memories: FC<{ isAdd?: boolean; toggle: (e: Views) => void }> = ({
  toggle
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<IMemories | undefined>()
  return (
    <Box p={6}>
      <MemoryModal isOpen={isOpen} onClose={onClose} item={selectedItem} />
      <Grid
        templateColumns={{ base: 'repeat(2,1fr)', xl: 'repeat(3, 1fr)' }}
        gap={10}
      >
        {MemoriesData.map(item => (
          <Box>
            <Box
              h={'auto'}
              rounded={'3xl'}
              w="full"
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
                {item.type === 'pic' ? (
                  <Text
                    color="whiteAlpha.800"
                    cursor="pointer"
                    onClick={() => {
                      setSelectedItem(item)
                      onOpen()
                    }}
                  >
                    {item.length - 1}+
                  </Text>
                ) : (
                  <Icon
                    as={FaPlay}
                    color="whiteAlpha.800"
                    cursor="pointer"
                    onClick={() => {
                      setSelectedItem(item)
                      onOpen()
                    }}
                  />
                )}
              </Flex>
            </Box>
          </Box>
        ))}
      </Grid>
      <Flex mt={12} align="center" justify="center">
        <Box>
          <SecondaryButton
            title="Add Memory"
            mr={4}
            onClick={() => toggle('add')}
          />
          <FilledButton title="Share Memories" />
        </Box>
      </Flex>
    </Box>
  )
}

export default Memories
