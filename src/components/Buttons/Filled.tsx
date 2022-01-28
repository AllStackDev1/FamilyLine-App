import { FC } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

interface IProps extends ButtonProps {
  title: string
}

const Filled: FC<IProps> = ({ title, ...rest }) => {
  return (
    <Button
      filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
      bgGradient="linear(to-l,  #02993E, #00BF4D)"
      _active={{ outline: 'none' }}
      _focus={{ outline: 'none' }}
      colorScheme="brandGreen"
      fontWeight={700}
      color="white"
      rounded="xl"
      py={6}
      px={6}
      {...rest}
    >
      {title}
    </Button>
  )
}

export default Filled
