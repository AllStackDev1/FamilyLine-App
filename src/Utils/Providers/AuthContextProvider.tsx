import PropTypes from 'prop-types'
import { IAuthContext } from 'interfaces/auth.interface'
import { FC, useState, createContext, useContext } from 'react'

const AuthContext = createContext({})

export const AuthContextProvider: FC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false)
  const [isAccepted, setAccepted] = useState<boolean>(false)

  return (
    <AuthContext.Provider
      value={{
        show,
        setShow,
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
