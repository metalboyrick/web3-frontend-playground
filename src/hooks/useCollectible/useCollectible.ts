import { useState } from 'react'

import { type Address, useContract, useProvider } from 'wagmi'
import { getAddress } from '@ethersproject/address'

import collectibleAbi from './abi/collectibleAbi.json'

function useCollectible() {
  const [loading, setLoading] = useState(false)

  const provider = useProvider()

  const collectibleContract = useContract({
    address: import.meta.env.VITE_COLLECTIBLE_CONTRACT_ADDRESS,
    abi: collectibleAbi,
    signerOrProvider: provider,
  })

  const getBalanceOfAddress = async (address: Address) => {
    setLoading(true)
    const balanceValue = (await collectibleContract?.balanceOf(getAddress(address))) || NaN
    setLoading(false)

    return balanceValue
  }

  return { getBalanceOfAddress, loading }
}

export default useCollectible
