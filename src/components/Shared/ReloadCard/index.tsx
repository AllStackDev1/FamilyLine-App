import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'
import { Splash } from 'components/Shared/Loading'
import ErrorReloadButton from 'components/Shared/ErrorButton'

interface Props extends FlexProps {
  text?: string
  error?: unknown
  refetch(): void
  isLoading: boolean
}

const ReloadCard: React.FC<Props> = ({
  text,
  error,
  refetch,
  isLoading,
  ...rest
}): JSX.Element => {
  return (
    <Flex {...rest}>
      <Flex
        fontSize="md"
        align="center"
        justify="center"
        textAlign="center"
        direction="column"
      >
        {isLoading && <Splash text={text} />}
        {!isLoading && error && <ErrorReloadButton refetch={refetch} />}
      </Flex>
    </Flex>
  )
}

export default ReloadCard
