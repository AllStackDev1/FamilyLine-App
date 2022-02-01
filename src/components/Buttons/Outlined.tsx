import { FC } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

interface IProps extends ButtonProps {
  title: string
}

const Outlined: FC<IProps> = ({ title, ...rest }) => {
  return (
    <Button
      colorScheme="brandGreen"
      _active={{ outline: 'none' }}
      _focus={{ outline: 'none' }}
      fontWeight={400}
      variant="outline"
      {...rest}
    >
      {title}
    </Button>
  )
}

export default Outlined
