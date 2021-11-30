import { FC } from 'react'
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps
} from '@chakra-ui/react'

interface IModal extends ModalProps {
  isOpen: boolean
  rounded: string
  onClose: () => void
  title: string
  headerStyle: any
}

const Modal: FC<IModal> = ({
  title,
  headerStyle,
  children,
  rounded,
  ...rest
}) => {
  return (
    <ChakraModal {...rest}>
      <ModalOverlay />
      <ModalContent {...{ rounded }}>
        <ModalHeader {...headerStyle}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
