"use client"

import { useAccount } from "wagmi"
import { toast } from "sonner"

const U2U_SOLARIS_MAINNET_ID = 39

export function useTransactionGuard() {
  const { isConnected, chainId } = useAccount()

  const checkChainBeforeTransaction = (): boolean => {
    if (!isConnected) {
      toast.error("Please connect your wallet first")
      return false
    }

    if (chainId !== U2U_SOLARIS_MAINNET_ID) {
      toast.error("Wrong Network", {
        description: "Please switch to U2U Solaris Mainnet to continue with this transaction."
      })
      return false
    }

    return true
  }

  const getChainErrorMessage = (): string => {
    if (!isConnected) {
      return "Wallet not connected"
    }
    
    if (chainId !== U2U_SOLARIS_MAINNET_ID) {
      return `Wrong network. Please switch to U2U Solaris Mainnet (Chain ID: ${U2U_SOLARIS_MAINNET_ID}). Current chain: ${chainId}`
    }
    
    return ""
  }

  return {
    checkChainBeforeTransaction,
    getChainErrorMessage,
    isOnCorrectChain: isConnected && chainId === U2U_SOLARIS_MAINNET_ID,
    isConnected,
    chainId
  }
}
