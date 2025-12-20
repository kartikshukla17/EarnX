import { http, createConfig } from "wagmi"
import { injected, metaMask, walletConnect } from "wagmi/connectors"
import { defineChain } from "viem"

// Define U2U Solaris Mainnet chain
const u2uSolarisMainnet = defineChain({
  id: 39,
  name: 'U2U Solaris Mainnet',
  network: 'u2u-solaris-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-mainnet.u2u.xyz'],
    },
    public: {
      http: ['https://rpc-mainnet.u2u.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'U2U Solaris Explorer',
      url: 'https://u2uscan.xyz',
    },
  },
  testnet: false,
})

// Get WalletConnect project ID from environment or use a fallback
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

console.log("Wagmi config: WalletConnect project ID:", walletConnectProjectId ? "Set" : "Not set")

const connectors = [
  injected(),
  metaMask(),
  ...(walletConnectProjectId ? [
    walletConnect({
      projectId: walletConnectProjectId,
      metadata: {
        name: "H4B Platform",
        description: "H4B Freelance and Bounty Platform",
        url: typeof window !== 'undefined' ? window.location.origin : 'https://h4b.com',
        icons: ['https://h4b.com/icon.png']
      }
    })
  ] : []),
]

console.log("Wagmi config: Available connectors:", connectors.map(c => c.name))

export const config = createConfig({
  chains: [u2uSolarisMainnet], // ✅ Set chain to U2U Solaris Mainnet
  connectors,
  transports: {
    [u2uSolarisMainnet.id]: http(), // ✅ Use default RPC for U2U Solaris Mainnet
  },
})