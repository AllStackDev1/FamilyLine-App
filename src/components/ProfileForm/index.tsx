import { useState } from 'react'
import { Box, Flex, Text, Icon, Image, useDisclosure } from '@chakra-ui/react'
import { FiChevronDown, FiChevronRight, FiEdit2, FiPower } from 'react-icons/fi'
import { authStore } from 'stores/auth.store'
import EditProfile from './Modals/EditModal'

const ProfileForm = () => {
  const [openDrop, setOpenDrop] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { family } = authStore(state => state)
  return (
    <Flex
      w="full"
      pos="relative"
      align="center"
      flexDir="column"
      mb={isEditing ? 3 : 0}
    >
      <EditProfile isOpen={isOpen} onClose={onClose} />

      <Box pos="relative" w={48} h={32}>
        <Box w={28} h={28} bg="gray.200" rounded={'full'} mx={'auto'}>
          <Image src={family?.avatar} />
        </Box>
        <Flex
          align={'center'}
          mt={4}
          justifyContent={'space-between'}
          pos="relative"
        >
          <Text textAlign={'center'} fontWeight={'bold'}>
            {family?.family_name}
          </Text>
          <Flex
            w={4}
            h={4}
            align={'center'}
            cursor={'pointer'}
            onClick={() => setOpenDrop(!openDrop)}
          >
            <Icon as={openDrop ? FiChevronRight : FiChevronDown} boxSize={6} />
          </Flex>
          {openDrop && (
            <Box
              shadow="0 4px 50px 0 rgba(0,0,0,0.3)"
              overflow={'hidden'}
              pos={'absolute'}
              rounded={'lg'}
              h={'auto'}
              bg="white"
              right={-4}
              top={8}
              w={44}
              zIndex={4}
            >
              <Flex
                px={2}
                py={3}
                align={'center'}
                cursor={'pointer'}
                onClick={() => {
                  setOpenDrop(false)
                  onOpen()
                }}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon as={FiEdit2} ml={1} />
                <Text fontSize={14} ml={2}>
                  Update profile
                </Text>
              </Flex>
              <Flex
                px={2}
                py={3}
                align={'center'}
                cursor={'pointer'}
                _hover={{ bg: 'gray.100' }}
              >
                <Icon as={FiPower} ml={1} />
                <Text fontSize={14} ml={2}>
                  Logout
                </Text>
              </Flex>
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}

export default ProfileForm
