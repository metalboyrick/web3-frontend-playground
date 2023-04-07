import { BigNumber } from 'ethers'
import { ReactNode } from 'react'
import { Chain } from 'wagmi'

export interface BalanceData {
  decimals: number
  formatted: string
  symbol: string
  value: BigNumber
}

export type FetchBalanceResponse = Partial<BalanceData>

export interface WalletContextValue {
  isConnected: boolean
  address: `0x${string}` | undefined
  chain: Chain | undefined
  balance: BalanceData
  loading: boolean
}

export interface WalletProviderProps {
  children: ReactNode
}
