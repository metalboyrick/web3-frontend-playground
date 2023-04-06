import { configureChains, mainnet, goerli, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains([mainnet, goerli], [publicProvider()])

export const client = createClient({
  provider,
  autoConnect: true,
  webSocketProvider,
})
