import React from 'react'
import { Spinner, SpinnerProps } from '@chakra-ui/react'

const SmallSpinner: React.FC<SpinnerProps> = props => (
  <Spinner
    thickness={props.thickness || '4px'}
    speed="0.65s"
    size="sm"
    emptyColor="gray.200"
    color="brand.green.200"
    {...props}
  />
)

export default SmallSpinner
