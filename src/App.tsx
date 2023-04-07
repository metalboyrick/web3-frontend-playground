import { Flex, Spinner, Text } from '@chakra-ui/react'

import ConnectWalletButton from '@/components/ConnectWalletButton'
import { type Address } from 'wagmi'
import { useWalletContext } from './context/WalletContext'
import useCollectible from './hooks/useCollectible'
import { useEffect, useState } from 'react'

function App() {
  const { address, loading: walletLoading, isConnected } = useWalletContext()
  const { getBalanceOfAddress, loading: collectibleLoading } = useCollectible()

  const [isEligible, setIsEligible] = useState<boolean>(false)

  useEffect(() => {
    getBalanceOfAddress(address as Address).then((balance) => {
      setIsEligible(balance >= 1)
    })
  }, [address])

  const renderPreConnWallet = () => {
    return <Text>Please connect wallet before testing this app !</Text>
  }

  const renderPostConnWallet = () => {
    if (isEligible)
      return (
        <Text as="b" color="green">
          You own the required NFT, welcome to the club!
        </Text>
      )

    return (
      <Text as="b" color="red">
        You do not own the required NFT yet, please get it first.
      </Text>
    )
  }

  const renderScreen = () => {
    if (!isConnected) return renderPreConnWallet()
    if (collectibleLoading) return <Spinner />
    return renderPostConnWallet()
  }

  return (
    <Flex width="100vw" height="100vh" flexDirection={'column'}>
      <Flex padding="1rem 1.5rem" justifyContent="space-between" alignItems={'center'} width="100%">
        <Text as="b">TokenGate Playground</Text>
        <ConnectWalletButton />
      </Flex>
      <Flex height="100%" justifyContent={'center'} alignItems={'center'}>
        {walletLoading ? <Spinner /> : <>{renderScreen()} </>}
      </Flex>
    </Flex>
  )
}

export default App
