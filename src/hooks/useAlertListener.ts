/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

import { StoreApi, UseBoundStore } from 'zustand'
import upperFirst from 'lodash/upperFirst'

const useAlertListener = (
  store: UseBoundStore<StoreApi<any>>,
  p: {
    message?: string | null
    type: 'error' | 'success' | 'info' | 'warning'
  }
) => {
  const toast = useToast()

  useEffect(() => {
    if (p.message) {
      toast({
        status: p.type,
        duration: 5000,
        isClosable: true,
        description: p.message,
        position: 'top-right',
        title: `${upperFirst(p.type)}!`
      })
    }

    return () => {
      store.setState({ error: null, message: null })
    }
  }, [p.message])

  return null
}

export default useAlertListener
