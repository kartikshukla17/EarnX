"use client"

import { useState, useEffect } from 'react'
import { mockContractState, generateMockTxHash, simulateTransactionDelay } from '@/lib/mock-contracts'

// Enable mock mode - set to true to use mock contracts instead of real blockchain
const MOCK_MODE = true

export function useMockWriteContract() {
  const [isPending, setIsPending] = useState(false)
  const [hash, setHash] = useState<string | undefined>(undefined)
  const [error, setError] = useState<Error | null>(null)

  const writeContract = async (config: any) => {
    if (!MOCK_MODE) {
      throw new Error('Mock mode is disabled')
    }

    console.log('🎭 Mock: writeContract called', config)
    setIsPending(true)
    setError(null)
    setHash(undefined)

    try {
      // Simulate wallet confirmation delay
      await simulateTransactionDelay('fast')
      
      const txHash = generateMockTxHash()
      setHash(txHash)
      
      console.log('✅ Mock: Transaction sent', txHash)

      // Execute the mock contract call
      if (config.functionName === 'approve') {
        const [spender, amount] = config.args
        const amountBigInt = typeof amount === 'bigint' ? amount : BigInt(amount.toString())
        mockContractState.approve(config.account, spender, amountBigInt)
        console.log('✅ Mock: USDT approved', { spender, amount: amountBigInt.toString() })
      } else if (config.functionName === 'createBounty') {
        const [name, description, category, deadline, totalReward] = config.args
        const deadlineBigInt = typeof deadline === 'bigint' ? deadline : BigInt(deadline.toString())
        const rewardBigInt = typeof totalReward === 'bigint' ? totalReward : BigInt(totalReward.toString())
        const bountyId = mockContractState.createBounty(
          config.account,
          name,
          description,
          Number(category),
          Number(deadlineBigInt),
          rewardBigInt
        )
        console.log('✅ Mock: Bounty created', { bountyId, name })
      } else if (config.functionName === 'submitToBounty') {
        const [bountyId, mainUri, evidenceUris] = config.args
        mockContractState.submitToBounty(
          Number(bountyId),
          config.account,
          mainUri,
          evidenceUris
        )
        console.log('✅ Mock: Submission created', { bountyId })
      } else if (config.functionName === 'selectWinners') {
        const [bountyId, winners, percentages] = config.args
        mockContractState.selectWinners(
          Number(bountyId),
          winners,
          percentages.map(Number)
        )
        console.log('✅ Mock: Winners selected', { bountyId, winners })
      } else if (config.functionName === 'cancelBounty') {
        const [bountyId] = config.args
        mockContractState.cancelBounty(Number(bountyId), config.account)
        console.log('✅ Mock: Bounty cancelled', { bountyId })
      } else if (config.functionName === 'postGig') {
        const [title, shortDescription, detailsUri, usdtAmount, nativeStake, duration, proposalDuration] = config.args
        const usdtBigInt = typeof usdtAmount === 'bigint' ? usdtAmount : BigInt(usdtAmount.toString())
        const stakeBigInt = typeof nativeStake === 'bigint' ? nativeStake : BigInt(nativeStake.toString())
        const gigId = mockContractState.postGig(
          config.account,
          title,
          shortDescription,
          detailsUri,
          usdtBigInt,
          stakeBigInt,
          Number(duration),
          Number(proposalDuration)
        )
        console.log('✅ Mock: Gig posted', { gigId, title })
      } else if (config.functionName === 'submitProposal') {
        const [gigId, proposalUri] = config.args
        mockContractState.submitProposal(
          Number(gigId),
          config.account,
          proposalUri
        )
        console.log('✅ Mock: Proposal submitted', { gigId })
      } else if (config.functionName === 'selectProposal') {
        const [gigId, proposalIndex] = config.args
        mockContractState.selectProposal(
          Number(gigId),
          Number(proposalIndex),
          config.account
        )
        console.log('✅ Mock: Proposal selected', { gigId, proposalIndex })
      } else if (config.functionName === 'completeGig') {
        const [gigId] = config.args
        mockContractState.completeGig(Number(gigId), config.account)
        console.log('✅ Mock: Gig completed', { gigId })
      } else if (config.functionName === 'cancelGig') {
        const [gigId] = config.args
        mockContractState.cancelGig(Number(gigId), config.account)
        console.log('✅ Mock: Gig cancelled', { gigId })
      }

      // Simulate blockchain confirmation delay
      await simulateTransactionDelay('normal')
      
      setIsPending(false)
      return txHash
    } catch (err: any) {
      console.error('❌ Mock: Transaction failed', err)
      setError(err)
      setIsPending(false)
      throw err
    }
  }

  return {
    writeContract,
    isPending,
    hash,
    error
  }
}

export function useMockWaitForTransactionReceipt({ hash }: { hash?: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!hash) {
      setIsLoading(false)
      setIsSuccess(false)
      return
    }

    console.log('⏳ Mock: Waiting for transaction receipt', hash)
    setIsLoading(true)
    setIsSuccess(false)

    // Simulate blockchain confirmation
    const timer = setTimeout(() => {
      console.log('✅ Mock: Transaction confirmed', hash)
      setIsLoading(false)
      setIsSuccess(true)
    }, 2000 + Math.random() * 2000) // 2-4 seconds

    return () => clearTimeout(timer)
  }, [hash])

  return {
    isLoading,
    isSuccess,
    error: null
  }
}

export function useMockReadContract(config: any) {
  const [data, setData] = useState<any>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = async () => {
    if (!MOCK_MODE) return

    setIsLoading(true)
    setError(null)

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))

      let result: any

      if (config.functionName === 'balanceOf') {
        const [address] = config.args || []
        result = mockContractState.getBalance(address)
      } else if (config.functionName === 'allowance') {
        const [owner, spender] = config.args || []
        result = mockContractState.getAllowance(owner, spender)
      } else if (config.functionName === 'nextBountyId') {
        result = BigInt(mockContractState.getNextBountyId())
      } else if (config.functionName === 'getBounty') {
        const [bountyId] = config.args || []
        const bounty = mockContractState.getBounty(Number(bountyId))
        if (bounty) {
          result = [
            bounty.id,
            bounty.creator,
            bounty.name,
            bounty.description,
            bounty.category,
            BigInt(bounty.deadline),
            bounty.totalReward,
            bounty.status,
            BigInt(bounty.submissionCount),
            BigInt(bounty.createdAt)
          ]
        }
      } else if (config.functionName === 'getBountySubmissions') {
        const [bountyId] = config.args || []
        result = mockContractState.getBountySubmissions(Number(bountyId))
      } else if (config.functionName === 'nextGigId') {
        result = BigInt(mockContractState.getNextGigId())
      } else if (config.functionName === 'getGig') {
        const [gigId] = config.args || []
        const gig = mockContractState.getGig(Number(gigId))
        if (gig) {
          result = [
            gig.id,
            gig.poster,
            gig.title,
            gig.shortDescription,
            gig.detailsUri,
            gig.usdtAmount,
            gig.nativeStake,
            BigInt(gig.duration),
            BigInt(gig.proposalDuration),
            gig.status,
            BigInt(gig.proposalCount),
            BigInt(gig.selectedProposal),
            BigInt(gig.postedAt),
            BigInt(gig.deadline)
          ]
        }
      } else if (config.functionName === 'getGigProposals') {
        const [gigId] = config.args || []
        result = mockContractState.getGigProposals(Number(gigId))
      }

      setData(result)
      setIsLoading(false)
    } catch (err: any) {
      console.error('❌ Mock: Read contract failed', err)
      setError(err)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (config.query?.enabled !== false) {
      refetch()
    }
  }, [config.address, config.functionName, JSON.stringify(config.args)])

  return {
    data,
    isLoading,
    error,
    refetch
  }
}
