import React from 'react'
import { Box, Flex, Text, Spinner, Slide } from '@chakra-ui/react'

interface Props {
  text?: string
}

const LoadingOverlay: React.FC<Props> = ({ text }): JSX.Element => {
  return (
    <Slide direction="top" in={true} style={{ zIndex: 100 }}>
      <Box pos="fixed" width="100vw" bg="rgba(255, 255, 255, 0.7)">
        <Flex align="center" justify="center" h="100vh">
          <Flex flexDir="column" align="center" bgColor="white" p={3}>
            <Spinner size="lg" speed="0.65s" thickness="4px" color="primary" />
            {text && (
              <Text textAlign="center" className="loading-text loading-text-b">
                {text}
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
    </Slide>
  )
}

export default LoadingOverlay
