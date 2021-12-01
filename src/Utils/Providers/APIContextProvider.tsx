import PropTypes from 'prop-types'
import { IApiContext } from 'Interfaces/api.interface'
import { FC, useState, createContext, useContext } from 'react'

const APIContext = createContext({})

export const ApiContextProvider: FC = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false)

  return (
    <APIContext.Provider
      value={{
        isLoading,
        setLoading
      }}
    >
      {children}
    </APIContext.Provider>
  )
}

ApiContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useApi = (): IApiContext => useContext(APIContext) as IApiContext

export default useApi
