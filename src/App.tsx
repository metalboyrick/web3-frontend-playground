import { useState } from 'react'
import { Box, Button } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Button onClick={() => setCount(count + 1)}>Count is {count}</Button>
    </Box>
  )
}

export default App
