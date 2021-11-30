import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthContextProvider } from 'utils/providers/AuthContextProvider'
import { ApiContextProvider } from 'utils/providers/APIContextProvider'

// import { ColorModeSwitcher } from './ColorModeSwitcher'
import { theme } from 'utils/theme'
import Router from 'routes'

import 'assets/styles/index.css'
import 'assets/fonts/fonts.css'

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
