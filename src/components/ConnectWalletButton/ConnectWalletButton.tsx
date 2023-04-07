import { useWalletContext } from '@/context/WalletContext'
import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useConnect, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import type { Address } from 'wagmi'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { chains } from '@/common/wagmiConfig'

import { truncateAddress } from './ConnectWalletButton.helpers'

function ConnectWalletButton() {
  const { isConnected, address, chain: currentChain } = useWalletContext()

  const { connect } = useConnect({
    connector: new MetaMaskConnector({
      chains,
    }),
  })

  const { disconnect } = useDisconnect()
  const { error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

  return (
    <>
      {!isConnected && (
        <Button colorScheme="blue" onClick={() => connect()}>
          Connect Wallet
        </Button>
      )}
      {isConnected && (
        <HStack gap="0.25rem">
          <Menu>
            <MenuButton
              as={Button}
              colorScheme={error ? 'red' : undefined}
              rightIcon={<ChevronDownIcon />}
            >
              {currentChain?.name || ''}
            </MenuButton>
            <MenuList>
              {chains.map((chain) => (
                <MenuItem key={chain.id} onClick={() => switchNetwork?.(chain.id)}>
                  {chain.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button onClick={() => disconnect()}>{truncateAddress(address as Address)}</Button>
        </HStack>
      )}
    </>
  )
}

export default ConnectWalletButton
