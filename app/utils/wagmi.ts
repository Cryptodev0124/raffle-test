import { http } from 'wagmi'
import { sepolia, bscTestnet } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'IRA-Raffle',
  projectId: 'b6187205b37dc9d704772f16dca5b71e',
  chains: [sepolia],
  ssr: true,

  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
    [bscTestnet.id]: http('https://bsc-testnet-rpc.publicnode.com	'),
  },
})
