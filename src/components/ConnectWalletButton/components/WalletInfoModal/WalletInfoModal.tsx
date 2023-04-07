import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react'
import { useDisconnect } from 'wagmi'

import { WalletInfoModalProps } from './WalletInfoModal.types'

import { useWalletContext } from '@/context/WalletContext'

function WalletInfoModal({ onClose }: WalletInfoModalProps) {
  const { address, balance } = useWalletContext()

  const { disconnect } = useDisconnect()

  const handleDisconnect = () => {
    disconnect()
    onClose()
  }

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wallet Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Wallet address</FormLabel>
            <FormHelperText>{address}</FormHelperText>
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Balance</FormLabel>
            <FormHelperText>
              {balance.formatted} {balance.symbol}
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WalletInfoModal
