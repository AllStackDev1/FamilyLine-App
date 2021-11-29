import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthContextProvider } from 'utils/Providers/AuthContextProvider'
import { ApiContextProvider } from 'utils/Providers/APIContextProvider'

// import { ColorModeSwitcher } from './ColorModeSwitcher'
import { theme } from 'utils/Theme'
import Router from 'routes'

import 'Assets/Styles/index.css'
import 'Assets/Fonts/fonts.css'

const queryClient = new QueryClient()

export const App: FC = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <AuthContextProvider>
        <ApiContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ApiContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </ChakraProvider>
)
