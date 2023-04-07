import { Box, Flex, Text } from '@chakra-ui/react'

import ConnectWalletButton from '@/components/ConnectWalletButton'
import { type Address } from 'wagmi'
import { useWalletContext } from './context/WalletContext'
import useCollectible from './hooks/useCollectible'
import { useEffect, useState } from 'react'

function App() {
  const { address, loading: walletLoading } = useWalletContext()
  const { getBalanceOfAddress, loading: collectibleLoading } = useCollectible()

  const [isEligible, setIsEligible] = useState<boolean>(false)

  const loading = walletLoading || collectibleLoading

  useEffect(() => {
    getBalanceOfAddress(address as Address).then((balance) => {
      setIsEligible(balance >= 1)
    })
  }, [address, getBalanceOfAddress])

  return (
    <Box width="100vw">
      <Flex padding="1rem 1.5rem" justifyContent="space-between" alignItems={'center'} width="100%">
        <Text as="b">TokenGate Playground</Text>
        <ConnectWalletButton />
      </Flex>

      <Text>{loading ? 'loading...' : `${isEligible ? 'Approved' : 'Rejected'}`}</Text>
    </Box>
  )
}

export default App
