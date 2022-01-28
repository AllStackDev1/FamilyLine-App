import { FC } from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from '@headlessui/react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { IMember } from 'interfaces/auth.interface'
import { IconType } from 'react-icons'

const MotionBox = motion(Box)

export interface IDropdownAction {
  title: string
  data: IMember
  options: {
    name: string
    icon?: IconType
    action: (p: any) => void
  }[]
}

const DropdownActions: FC<IDropdownAction> = ({ data, title, options }) => {
  return (
    <Menu as={Box} ml={2} userSelect="none" pos="relative">
      {({ open }) => (
        <div>
          <Menu.Button
            h={10}
            as={Flex}
            rounded="md"
            bg="#F2F2F2"
            w="6.25rem"
            align="center"
            cursor="pointer"
            justify="center"
            _focus={{ outline: 'none' }}
          >
            <Text fontWeight={500} fontSize="xs">
              {title}
            </Text>
            <Icon ml={2} as={open ? FiChevronUp : FiChevronDown} boxSize={3} />
          </Menu.Button>
          <AnimatePresence>
            {open && (
              <Menu.Items
                static
                w={44}
                mt={3}
                bg="white"
                rounded="sm"
                pos="absolute"
                as={MotionBox}
                borderWidth={1}
                color="gray.600"
                right={5}
                zIndex={1}
                borderColor="gray.100"
                shadow="lg"
                _focus={{ outline: 'none' }}
                exit={{ opacity: 0, y: 50 }}
                initial={{ opacity: 0, y: -50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <AnimatePresence>
                  {options.map((item, i) => (
                    <Menu.Item
                      key={item.name}
                      as={MotionBox}
                      custom={i}
                      variants={{
                        hidden: i => ({
                          y: -50 * i,
                          opacity: 0
                        }),
                        visible: i => ({
                          y: 0,
                          opacity: 1,
                          transition: {
                            delay: i * 0.025
                          }
                        }),
                        removed: {
                          y: 30 * i
                        }
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="removed"
                    >
                      <Flex
                        py={2}
                        px={6}
                        _hover={{
                          textDecor: 'none',
                          color: 'white',
                          bg: 'brand.green.200'
                        }}
                        align="center"
                        onClick={() => item.action(data)}
                      >
                        {item.icon && (
                          <Icon as={item.icon} boxSize={4} mr={2} />
                        )}{' '}
                        {item.name}
                      </Flex>
                    </Menu.Item>
                  ))}
                </AnimatePresence>
              </Menu.Items>
            )}
          </AnimatePresence>
        </div>
      )}
    </Menu>
  )
}

export default DropdownActions
