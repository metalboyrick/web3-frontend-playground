import { ReactNode } from 'react'

export interface WalletContextValue {
  isConnected: boolean
  address: `0x${string}` | undefined
}

export interface WalletProviderProps {
  children: ReactNode
}
