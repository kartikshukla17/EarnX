"use client"

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useTransactionGuard } from "./use-transaction-guard"
import { toast } from "sonner"

export function useSafeWriteContract() {
  const { writeContract, writeContractAsync, isPending, error: writeError, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: confirmError } = useWaitForTransactionReceipt({ hash })
  const { checkChainBeforeTransaction } = useTransactionGuard()

  const safeWriteContract = async (args: Parameters<typeof writeContractAsync>[0]) => {
    // Check chain before allowing transaction
    if (!checkChainBeforeTransaction()) {
      throw new Error("Transaction blocked: Wrong network")
    }

    try {
      return await writeContractAsync(args)
    } catch (error) {
      console.error("Safe write contract error:", error)
      throw error
    }
  }

  const safeWriteContractSync = (args: Parameters<typeof writeContract>[0]) => {
    // Check chain before allowing transaction
    if (!checkChainBeforeTransaction()) {
      return
    }

    writeContract(args)
  }

  return {
    writeContract: safeWriteContractSync,
    writeContractAsync: safeWriteContract,
    isPending,
    error: writeError,
    hash,
    isConfirming,
    isConfirmed,
    confirmError
  }
}
