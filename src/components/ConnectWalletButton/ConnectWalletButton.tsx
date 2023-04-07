import { useState } from 'react'

import { useConnect, useSwitchNetwork, type Address } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { useWalletContext } from '@/context/WalletContext'
import { chains } from '@/common/wagmiConfig'

import { truncateAddress } from './ConnectWalletButton.helpers'
import WalletInfoModal from './components/WalletInfoModal/WalletInfoModal'

function ConnectWalletButton() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  const { isConnected, address, chain: currentChain, loading: walletLoading } = useWalletContext()

  const { connect } = useConnect({
    connector: new MetaMaskConnector({
      chains,
    }),
  })

  const { error, switchNetwork, isLoading: switchNetworkLoading } = useSwitchNetwork()

  const loading = walletLoading || switchNetworkLoading

  return (
    <>
      {!isConnected && (
        <Button
          colorScheme="blue"
          onClick={() => connect()}
          loadingText="Connecting"
          isLoading={loading}
          disabled={loading}
        >
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
              loadingText={'Switching'}
              isLoading={loading}
              disabled={loading}
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
          <Button
            onClick={() => setIsInfoModalOpen(true)}
            loadingText={'Processing'}
            isLoading={loading}
            disabled={loading}
          >
            {truncateAddress(address as Address)}
          </Button>
        </HStack>
      )}
      {isInfoModalOpen && <WalletInfoModal onClose={() => setIsInfoModalOpen(false)} />}
    </>
  )
}

export default ConnectWalletButton
