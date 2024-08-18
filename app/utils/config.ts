import { http, createConfig } from '@wagmi/core'
import { bscTestnet, sepolia } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [bscTestnet.id]: http(),
    [sepolia.id]: http(),
  },
})