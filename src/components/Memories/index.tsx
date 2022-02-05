import { FC, useState } from 'react'
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  Icon,
  AspectRatio
} from '@chakra-ui/react'
import { FilledButton, SecondaryButton } from 'components/Buttons'
import { FaPlay } from 'react-icons/fa'
import { useDisclosure } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { Views } from 'pages/memories'
import { getMemories } from 'utils/api/services'

import MemoryModal from 'components/Memories/Modals/MemoryModal'

import { IMemories } from 'interfaces/index.interface'
import { AiFillEye } from 'react-icons/ai'

// const MemoriesData: IMemories[] = [
//   {
//     thumb: String(FamilyDinner),
//     length: 11,
//     type: 'pic'
//   },
//   {
//     thumb: String(Party),
//     length: 1,
//     type: 'vid'
//   },
//   {
//     thumb: String(People),
//     length: 6,
//     type: 'pic'
//   },
//   {
//     thumb: String(Wedding),
//     length: 3,
//     type: 'pic'
//   },
//   {
//     thumb: String(Birthday),
//     length: 1,
//     type: 'vid'
//   },
//   {
//     thumb: String(Dinner),
//     length: 2,
//     type: 'pic'
//   }
// ]
const Memories: FC<{ isAdd?: boolean; toggle: (e: Views) => void }> = ({
  toggle
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<IMemories | undefined>()
  const { data: MemoriesData } = useQuery('family_memories', () =>
    getMemories()
  )

  const imagesExt = ['jpeg', 'png', 'jpg']
  return (
    <Box p={6}>
      <MemoryModal isOpen={isOpen} onClose={onClose} item={selectedItem} />
      <Grid
        templateColumns={{ base: 'repeat(2,1fr)', xl: 'repeat(3, 1fr)' }}
        gap={10}
      >
        {MemoriesData &&
          MemoriesData.map(item => (
            <Box>
              <Box
                h={'auto'}
                rounded={'3xl'}
                w="full"
                pos="relative"
                overflow="hidden"
              >
                {imagesExt.includes(
                  item.memories_upload[0].media.split('.').pop()
                ) ? (
                  <Image src={item.memories_upload[0].media} w="full" />
                ) : (
                  <AspectRatio maxW="full" ratio={1}>
                    <video
                      src={`${item.memories_upload[0].media}#t=10`}
                      autoPlay={false}
                      controls={false}
                    />
                  </AspectRatio>
                )}

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
                  {imagesExt.includes(
                    item.memories_upload[0].media.split('.').pop()
                  ) ? (
                    item.memories_upload.length > 2 ? (
                      <Text
                        color="whiteAlpha.800"
                        cursor="pointer"
                        onClick={() => {
                          setSelectedItem(item)
                          onOpen()
                        }}
                      >
                        {item.memories_upload.length - 1}+
                      </Text>
                    ) : (
                      <Flex
                        color="whiteAlpha.800"
                        cursor="pointer"
                        onClick={() => {
                          setSelectedItem(item)
                          onOpen()
                        }}
                      >
                        <Icon as={AiFillEye} />
                      </Flex>
                    )
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
