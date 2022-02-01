import { FC } from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  StyleProps
} from '@chakra-ui/react'

interface IModal extends ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  headerStyle?: StyleProps
}

const Modal: FC<IModal> = ({ title, headerStyle, children, ...rest }) => {
  return (
    <ChakraModal {...rest}>
      <ModalOverlay />
      <ModalContent rounded="xl" bgColor="white">
        <ModalHeader {...headerStyle}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
