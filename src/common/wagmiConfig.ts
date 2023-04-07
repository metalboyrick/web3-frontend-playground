import { Chain, configureChains, createClient } from 'wagmi'
import { mainnet, goerli, sepolia, localhost, hardhat } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'

export const chains: Chain[] = (() => {
  const prodChains = [mainnet, goerli, sepolia]

  if (import.meta.env.DEV) {
    console.log([...prodChains, localhost, hardhat])

    return [...prodChains, localhost, hardhat]
  }

  return prodChains
})()

const { provider, webSocketProvider } = configureChains(chains, [
  infuraProvider({ apiKey: import.meta.env.VITE_INFURA_API_KEY }),
  publicProvider(),
])

export const client = createClient({
  provider,
  autoConnect: true,
  webSocketProvider,
})
