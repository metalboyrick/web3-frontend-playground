import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import { ChakraProvider } from '@chakra-ui/react'

import App from './App'
import { client } from '@/common/wagmiConfig'
import { theme } from '@/common/chakraTheme'
import { WalletProvider } from '@/context/WalletContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ChakraProvider theme={theme}>
        <WalletProvider>
          <App />
        </WalletProvider>
      </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
