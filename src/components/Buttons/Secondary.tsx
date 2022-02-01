import { FC } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

interface IProps extends ButtonProps {
  title: string
}

const Secondary: FC<IProps> = ({ title, ...rest }) => {
  return (
    <Button
      filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))"
      _active={{ outline: 'none' }}
      _focus={{ outline: 'none' }}
      colorScheme="brandGreen"
      fontWeight={700}
      color="#02993E"
      rounded="xl"
      bg="white"
      py={6}
      px={6}
      {...rest}
    >
      {title}
    </Button>
  )
}

export default Secondary
