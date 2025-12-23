"use client"

import { useAccount } from "wagmi"
import { toast } from "sonner"

// U2U Solaris mainnet chain ID (see README / SEPOLIA_MIGRATION.md)
// If you later deploy to a different network, update this value accordingly.
const REQUIRED_CHAIN_ID = 39

export function useTransactionGuard() {
  const { isConnected, chainId } = useAccount()

  const checkChainBeforeTransaction = (): boolean => {
    if (!isConnected) {
      toast.error("Please connect your wallet first")
      return false
    }

    if (chainId !== REQUIRED_CHAIN_ID) {
      toast.error("Wrong Network", {
        description: `Please switch your wallet to the U2U Solaris network (chain ID ${REQUIRED_CHAIN_ID}) to continue.`
      })
      return false
    }

    return true
  }

  const getChainErrorMessage = (): string => {
    if (!isConnected) {
      return "Wallet not connected"
    }
    
    if (chainId !== REQUIRED_CHAIN_ID) {
      return `Wrong network. Please switch to U2U Solaris (Chain ID: ${REQUIRED_CHAIN_ID}). Current chain: ${chainId}`
    }
    
    return ""
  }

  return {
    checkChainBeforeTransaction,
    getChainErrorMessage,
    isOnCorrectChain: isConnected && chainId === REQUIRED_CHAIN_ID,
    isConnected,
    chainId
  }
}
