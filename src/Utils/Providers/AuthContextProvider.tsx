import PropTypes from 'prop-types'
import { IAuthContext } from 'Interfaces/auth.interface'
import { FC, useState, createContext, useContext, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { authStore } from 'Stores/auth.store'

const AuthContext = createContext({})

export const AuthContextProvider: FC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false)
  const [isAccepted, setAccepted] = useState<boolean>(false)
  const { error, message, isLoading, register, login, token } = authStore(
    state => state
  )

  const toast = useToast()

  useEffect(() => {
    if (error || message) {
      toast({
        title: error ? 'An error occurred' : 'Registration successful',
        duration: 20000,
        description: error || message,
        position: 'top',
        status: error ? 'error' : 'success',
        isClosable: true
      })
    }

    return () => authStore.setState({ error: null, message: null })
  }, [error, message])

  return (
    <AuthContext.Provider
      value={{
        show,
        login,
        token,
        setShow,
        register,
        isLoading,
        isAccepted,
        setAccepted
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useAuth = (): IAuthContext => useContext(AuthContext) as IAuthContext

export default useAuth
