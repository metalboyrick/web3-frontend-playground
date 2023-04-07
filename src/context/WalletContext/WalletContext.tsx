import { createContext, useContext } from 'react'
import type { WalletContextValue, WalletProviderProps } from './WalletContext.types'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import { normalizeBalance } from './WalletContext.helpers'

const WalletContext = createContext<WalletContextValue | undefined>(undefined)

export function WalletProvider({ children }: WalletProviderProps) {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  const { chain } = useNetwork()
  const { data: balanceData, isLoading: balanceLoading } = useBalance({ address })

  const loading = isConnecting || isReconnecting || balanceLoading

  return (
    <WalletContext.Provider
      value={{ address, isConnected, chain, balance: normalizeBalance(balanceData), loading }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  const context = useContext(WalletContext)
  if (!context) throw new Error(`"useWalletContext" must be used with "WalletProvider"`)

  return context
}
