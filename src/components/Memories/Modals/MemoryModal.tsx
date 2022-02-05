import { FC, useState } from 'react'
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  AspectRatio,
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
} from 'utils/theme/custom-icon'
import moment from 'moment'

import { IMemories } from 'interfaces/index.interface'
interface IProps {
  isOpen: boolean
  onClose(): void
  item: IMemories | undefined
}

const ShowImage: FC<{ item: IMemories | undefined }> = ({ item }) => {
  const [currentMedia, setCurrentMedia] = useState(1)

  return (
    <Box p={6} pos="relative">
      <>
        {currentMedia > 1 && (
          <Box
            pos="absolute"
            top={'calc(50% - 62px)'}
            left={-10}
            transform={'rotate(180deg)'}
          >
            <Icon as={arrow} boxSize={14} color={'white`'} />
          </Box>
        )}
        {item && item?.memories_upload.length > currentMedia && (
          <Box pos="absolute" top={'calc(50% - 62px)'} right={-10}>
            <Icon as={arrow} boxSize={14} color={'white`'} />
          </Box>
        )}
      </>
      <Image src={item?.memories_upload[0].media} />
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
        {/* <Box>
          <Icon as={dots} boxSize={8} />
        </Box> */}
      </Flex>
    </Box>
  )
}

const ShowVideo: FC<{ item: IMemories | undefined }> = ({ item }) => (
  <Box p={6} pos="relative">
    <AspectRatio maxW="full" ratio={1}>
      <video
        src={`${item?.memories_upload[0].media}`}
        autoPlay={false}
        controls={true}
      />
    </AspectRatio>
  </Box>
)

const imagesExt = ['jpeg', 'png', 'jpg']
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
            {item?.name}
            {item ? ` ( ${moment(item?.date).format('Do MMMM YYYY')} )` : ''}
          </Box>
          <Box>
            {imagesExt.includes(
              item?.memories_upload?.[0].media.split('.').pop()
            ) ? (
              <ShowImage item={item} />
            ) : (
              <ShowVideo item={item} />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MemoryModal
