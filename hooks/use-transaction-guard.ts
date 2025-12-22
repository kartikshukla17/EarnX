"use client"

import { useAccount } from "wagmi"
import { toast } from "sonner"

const REQUIRED_CHAIN_ID = 11155111

export function useTransactionGuard() {
  const { isConnected, chainId } = useAccount()

  const checkChainBeforeTransaction = (): boolean => {
    if (!isConnected) {
      toast.error("Please connect your wallet first")
      return false
    }

    if (chainId !== REQUIRED_CHAIN_ID) {
      toast.error("Wrong Network", {
        description: "Please switch to Ethereum Sepolia to continue with this transaction."
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
      return `Wrong network. Please switch to Ethereum Sepolia (Chain ID: ${REQUIRED_CHAIN_ID}). Current chain: ${chainId}`
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
