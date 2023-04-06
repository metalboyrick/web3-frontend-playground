import { useState } from 'react'
import { Box, Button } from '@chakra-ui/react'
import ConnectWalletButton from '@/components/ConnectWalletButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Button onClick={() => setCount(count + 1)}>Count is {count}</Button>
      <ConnectWalletButton></ConnectWalletButton>
    </Box>
  )
}

export default App
