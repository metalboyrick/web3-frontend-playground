import { useWalletContext } from '@/context/WalletContext'
import { Box, Button } from '@chakra-ui/react'
import { useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function ConnectWalletButton() {
  const { isConnected, address } = useWalletContext()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return (
    <>
      {!isConnected && <Button onClick={() => connect()}>Connect Wallet</Button>}
      {isConnected && (
        <Box>
          <Button onClick={() => disconnect()}>{address}</Button>
        </Box>
      )}
    </>
  )
}

export default ConnectWalletButton
