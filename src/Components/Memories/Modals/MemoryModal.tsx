import { FC } from 'react'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Flex,
  Icon
} from '@chakra-ui/react'
import {
  arrow,
  downloadIcon,
  shareIcon,
  dots,
  fullScreen
} from 'Utils/Theme/custom-icon'
import { IMemories } from 'Interfaces/Index.interface'
interface IProps {
  isOpen: boolean
  onClose(): void
  item: IMemories | undefined
}

const ShowImage: FC<{ item: IMemories | undefined }> = ({ item }) => (
  <Box p={6} pos="relative">
    <>
      <Box
        pos="absolute"
        top={'calc(50% - 62px)'}
        left={-10}
        transform={'rotate(180deg)'}
      >
        <Icon as={arrow} boxSize={14} color={'white`'} />
      </Box>
      <Box pos="absolute" top={'calc(50% - 62px)'} right={-10}>
        <Icon as={arrow} boxSize={14} color={'white`'} />
      </Box>
    </>
    <Image src={item?.thumb} />
    <Flex justifyContent="space-around" mt={6}>
      <Box>
        <Icon as={downloadIcon} boxSize={8} />
      </Box>
      <Box>
        <Icon as={shareIcon} boxSize={8} />
      </Box>
      <Box>
        <Icon as={fullScreen} boxSize={8} />
      </Box>
      <Box>
        <Icon as={dots} boxSize={8} />
      </Box>
    </Flex>
  </Box>
)

const ShowVideo: FC<{ item: IMemories | undefined }> = ({ item }) => (
  <Box p={6} pos="relative">
    <Image src={item?.thumb} />
  </Box>
)

const MemoryModal: FC<IProps> = ({ isOpen, onClose, item }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent
        rounded="2xl"
        m={4}
        bg={'transparent'}
        border={'none'}
        boxShadow="none"
      >
        <ModalBody bg={'transparent'}>
          <Box color="white" mb={4} textAlign="center">
            Family Dinner on Christmas Eve (24th December 2015)
          </Box>
          <Box>
            {item?.type === 'vid' ? (
              <ShowVideo item={item} />
            ) : (
              <ShowImage item={item} />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MemoryModal
