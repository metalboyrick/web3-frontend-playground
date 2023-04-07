import { ReactNode } from 'react'
import { Chain } from 'wagmi'

export interface WalletContextValue {
  isConnected: boolean
  address: `0x${string}` | undefined
  chain: Chain | undefined
}

export interface WalletProviderProps {
  children: ReactNode
}
