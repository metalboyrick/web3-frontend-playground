import { Box, Flex, Text } from '@chakra-ui/react'

import ConnectWalletButton from '@/components/ConnectWalletButton'

function App() {
  return (
    <Box width="100vw">
      <Flex padding="1rem 1.5rem" justifyContent="space-between" alignItems={'center'} width="100%">
        <Text as="b">TokenGate Playground</Text>
        <ConnectWalletButton />
      </Flex>
    </Box>
  )
}

export default App
