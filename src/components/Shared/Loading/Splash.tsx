import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text, Spinner } from '@chakra-ui/react'

interface Props {
  text?: string
}
const Splash: React.FC<Props> = ({ text }) => (
  <Flex flexDir="column" h="100vh" align="center" justify="center">
    <Spinner
      size="lg"
      speed="0.65s"
      thickness="5px"
      emptyColor="gray.200"
      color="brand.green.200"
    />
    {text && <Text className="loading-text loading-text-b">{text}</Text>}
  </Flex>
)

Splash.propTypes = {
  text: PropTypes.string
}

export default Splash
