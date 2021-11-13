import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthContextProvider } from 'Utils/Providers/AuthContextProvider'

// import { ColorModeSwitcher } from './ColorModeSwitcher'
import { theme } from 'Utils/Theme'
import Router from 'Routes'

import 'Assets/Styles/index.css'
import 'Assets/Fonts/fonts.css'

const queryClient = new QueryClient()

export const App: FC = () => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <AuthContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  </ChakraProvider>
)
