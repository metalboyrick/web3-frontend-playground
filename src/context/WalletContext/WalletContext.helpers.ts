import { ethers } from 'ethers'
import { FetchBalanceResponse } from './WalletContext.types'

export function normalizeBalance(balanceData: FetchBalanceResponse | undefined) {
  return {
    decimals: balanceData?.decimals || 18,
    formatted: balanceData?.formatted || '',
    symbol: balanceData?.symbol || 'ETH',
    value: balanceData?.value || ethers.BigNumber.from(0),
  }
}
