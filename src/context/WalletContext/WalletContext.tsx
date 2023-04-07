import { createContext, useContext } from 'react'
import type { WalletContextValue, WalletProviderProps } from './WalletContext.types'
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const WalletContext = createContext<WalletContextValue | undefined>(undefined)

export function WalletProvider({ children }: WalletProviderProps) {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  return (
    <WalletContext.Provider value={{ address, isConnected, chain }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  const context = useContext(WalletContext)
  if (!context) throw new Error(`"useWalletContext" must be used with "WalletProvider"`)

  return context
}
