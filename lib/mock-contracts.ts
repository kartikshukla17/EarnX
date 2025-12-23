/**
 * Mock Contract System - Handles bounty operations without blockchain
 * This provides a fully functional demo experience
 */

interface MockBounty {
  id: number
  creator: string
  name: string
  description: string
  category: number
  deadline: number
  totalReward: bigint
  status: number
  submissionCount: number
  createdAt: number
}

interface MockSubmission {
  submitter: string
  mainUri: string
  evidenceUris: string[]
  timestamp: number
}

interface MockGig {
  id: number
  poster: string
  title: string
  shortDescription: string
  detailsUri: string
  usdtAmount: bigint
  nativeStake: bigint
  duration: number
  proposalDuration: number
  status: number
  proposalCount: number
  selectedProposal: number
  postedAt: number
  deadline: number
}

interface MockProposal {
  proposer: string
  proposalUri: string
  submittedAt: number
  withdrawn: boolean
}

class MockContractState {
  private bounties: Map<number, MockBounty> = new Map()
  private submissions: Map<number, MockSubmission[]> = new Map()
  private gigs: Map<number, MockGig> = new Map()
  private proposals: Map<number, MockProposal[]> = new Map()
  private nextBountyId: number = 1
  private nextGigId: number = 1
  private balances: Map<string, bigint> = new Map()
  private allowances: Map<string, Map<string, bigint>> = new Map()

  constructor() {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      this.loadState()
    }
  }

  private saveState() {
    if (typeof window !== 'undefined') {
      // Convert BigInt to string for JSON serialization
      const bountiesArray = Array.from(this.bounties.entries()).map(([id, bounty]) => [
        id,
        {
          ...bounty,
          totalReward: bounty.totalReward.toString()
        }
      ])
      localStorage.setItem('mock_bounties', JSON.stringify(bountiesArray))
      localStorage.setItem('mock_nextBountyId', this.nextBountyId.toString())
      
      const gigsArray = Array.from(this.gigs.entries()).map(([id, gig]) => [
        id,
        {
          ...gig,
          usdtAmount: gig.usdtAmount.toString(),
          nativeStake: gig.nativeStake.toString()
        }
      ])
      localStorage.setItem('mock_gigs', JSON.stringify(gigsArray))
      localStorage.setItem('mock_nextGigId', this.nextGigId.toString())
      
      localStorage.setItem('mock_balances', JSON.stringify(Array.from(this.balances.entries()).map(([k, v]) => [k, v.toString()])))
      localStorage.setItem('mock_allowances', JSON.stringify(
        Array.from(this.allowances.entries()).map(([owner, spenders]) => 
          [owner, Array.from(spenders.entries()).map(([spender, amount]) => [spender, amount.toString()])]
        )
      ))
      localStorage.setItem('mock_submissions', JSON.stringify(Array.from(this.submissions.entries())))
      localStorage.setItem('mock_proposals', JSON.stringify(Array.from(this.proposals.entries())))
    }
  }

  private loadState() {
    try {
      const bountiesData = localStorage.getItem('mock_bounties')
      if (bountiesData) {
        const parsed = JSON.parse(bountiesData)
        this.bounties = new Map(parsed.map(([id, bounty]: [number, any]) => [
          id,
          { ...bounty, totalReward: BigInt(bounty.totalReward) }
        ]))
      }

      const nextId = localStorage.getItem('mock_nextBountyId')
      if (nextId) this.nextBountyId = parseInt(nextId)

      const balancesData = localStorage.getItem('mock_balances')
      if (balancesData) {
        const parsed = JSON.parse(balancesData)
        this.balances = new Map(parsed.map(([k, v]: [string, string]) => [k, BigInt(v)]))
      }

      const allowancesData = localStorage.getItem('mock_allowances')
      if (allowancesData) {
        const parsed = JSON.parse(allowancesData)
        this.allowances = new Map(
          parsed.map(([owner, spenders]: [string, [string, string][]]) => [
            owner,
            new Map(spenders.map(([spender, amount]) => [spender, BigInt(amount)]))
          ])
        )
      }

      const submissionsData = localStorage.getItem('mock_submissions')
      if (submissionsData) {
        this.submissions = new Map(JSON.parse(submissionsData))
      }

      const gigsData = localStorage.getItem('mock_gigs')
      if (gigsData) {
        const parsed = JSON.parse(gigsData)
        this.gigs = new Map(parsed.map(([id, gig]: [number, any]) => [
          id,
          { ...gig, usdtAmount: BigInt(gig.usdtAmount), nativeStake: BigInt(gig.nativeStake) }
        ]))
      }

      const nextGigId = localStorage.getItem('mock_nextGigId')
      if (nextGigId) this.nextGigId = parseInt(nextGigId)

      const proposalsData = localStorage.getItem('mock_proposals')
      if (proposalsData) {
        this.proposals = new Map(JSON.parse(proposalsData))
      }
    } catch (error) {
      console.error('Error loading mock state:', error)
    }
  }

  // USDT Mock Functions
  getBalance(address: string): bigint {
    return this.balances.get(address.toLowerCase()) || BigInt(1000000000) // Default 1000 USDT
  }

  getAllowance(owner: string, spender: string): bigint {
    const ownerAllowances = this.allowances.get(owner.toLowerCase())
    if (!ownerAllowances) return BigInt(0)
    return ownerAllowances.get(spender.toLowerCase()) || BigInt(0)
  }

  approve(owner: string, spender: string, amount: bigint): boolean {
    const ownerKey = owner.toLowerCase()
    if (!this.allowances.has(ownerKey)) {
      this.allowances.set(ownerKey, new Map())
    }
    this.allowances.get(ownerKey)!.set(spender.toLowerCase(), amount)
    this.saveState()
    return true
  }

  transferFrom(from: string, to: string, amount: bigint): boolean {
    const fromKey = from.toLowerCase()
    const balance = this.getBalance(fromKey)
    
    if (balance < amount) {
      throw new Error('Insufficient balance')
    }

    this.balances.set(fromKey, balance - amount)
    const toBalance = this.getBalance(to.toLowerCase())
    this.balances.set(to.toLowerCase(), toBalance + amount)
    this.saveState()
    return true
  }

  // Bounty Mock Functions
  getNextBountyId(): number {
    return this.nextBountyId
  }

  createBounty(
    creator: string,
    name: string,
    description: string,
    category: number,
    deadline: number,
    totalReward: bigint
  ): number {
    const bountyId = this.nextBountyId++
    
    const bounty: MockBounty = {
      id: bountyId,
      creator: creator.toLowerCase(),
      name,
      description,
      category,
      deadline,
      totalReward,
      status: 0, // Open
      submissionCount: 0,
      createdAt: Math.floor(Date.now() / 1000)
    }

    this.bounties.set(bountyId, bounty)
    this.submissions.set(bountyId, [])
    
    // Transfer USDT from creator
    this.transferFrom(creator, 'contract', totalReward)
    
    this.saveState()
    return bountyId
  }

  getBounty(bountyId: number): MockBounty | undefined {
    return this.bounties.get(bountyId)
  }

  getAllBounties(): MockBounty[] {
    return Array.from(this.bounties.values())
  }

  submitToBounty(
    bountyId: number,
    submitter: string,
    mainUri: string,
    evidenceUris: string[]
  ): boolean {
    const bounty = this.bounties.get(bountyId)
    if (!bounty) throw new Error('Bounty not found')
    if (bounty.status !== 0) throw new Error('Bounty not open')
    
    const submissions = this.submissions.get(bountyId) || []
    
    // Check if already submitted
    if (submissions.some(s => s.submitter.toLowerCase() === submitter.toLowerCase())) {
      throw new Error('Already submitted')
    }

    const submission: MockSubmission = {
      submitter: submitter.toLowerCase(),
      mainUri,
      evidenceUris,
      timestamp: Math.floor(Date.now() / 1000)
    }

    submissions.push(submission)
    this.submissions.set(bountyId, submissions)
    
    bounty.submissionCount++
    this.bounties.set(bountyId, bounty)
    
    this.saveState()
    return true
  }

  getBountySubmissions(bountyId: number): MockSubmission[] {
    return this.submissions.get(bountyId) || []
  }

  selectWinners(bountyId: number, winners: string[], percentages: number[]): boolean {
    const bounty = this.bounties.get(bountyId)
    if (!bounty) throw new Error('Bounty not found')
    
    bounty.status = 1 // Completed
    this.bounties.set(bountyId, bounty)
    
    // Distribute rewards
    winners.forEach((winner, index) => {
      const amount = (bounty.totalReward * BigInt(percentages[index])) / BigInt(100)
      const winnerBalance = this.getBalance(winner.toLowerCase())
      this.balances.set(winner.toLowerCase(), winnerBalance + amount)
    })
    
    this.saveState()
    return true
  }

  cancelBounty(bountyId: number, caller: string): boolean {
    const bounty = this.bounties.get(bountyId)
    if (!bounty) throw new Error('Bounty not found')
    if (bounty.creator !== caller.toLowerCase()) throw new Error('Not the creator')
    
    bounty.status = 2 // Cancelled
    this.bounties.set(bountyId, bounty)
    
    // Refund with penalty
    const penalty = bounty.totalReward / BigInt(10) // 10% penalty
    const refund = bounty.totalReward - penalty
    const creatorBalance = this.getBalance(bounty.creator)
    this.balances.set(bounty.creator, creatorBalance + refund)
    
    this.saveState()
    return true
  }

  // Gig Mock Functions
  getNextGigId(): number {
    return this.nextGigId
  }

  postGig(
    poster: string,
    title: string,
    shortDescription: string,
    detailsUri: string,
    usdtAmount: bigint,
    nativeStake: bigint,
    duration: number,
    proposalDuration: number
  ): number {
    const gigId = this.nextGigId++
    const now = Math.floor(Date.now() / 1000)
    
    const gig: MockGig = {
      id: gigId,
      poster: poster.toLowerCase(),
      title,
      shortDescription,
      detailsUri,
      usdtAmount,
      nativeStake,
      duration,
      proposalDuration,
      status: 0, // Open
      proposalCount: 0,
      selectedProposal: 0,
      postedAt: now,
      deadline: now + (proposalDuration * 86400) // proposalDuration in days
    }

    this.gigs.set(gigId, gig)
    this.proposals.set(gigId, [])
    
    // Transfer USDT from poster
    if (usdtAmount > BigInt(0)) {
      this.transferFrom(poster, 'contract', usdtAmount)
    }
    
    this.saveState()
    return gigId
  }

  getGig(gigId: number): MockGig | undefined {
    return this.gigs.get(gigId)
  }

  getAllGigs(): MockGig[] {
    return Array.from(this.gigs.values())
  }

  submitProposal(
    gigId: number,
    proposer: string,
    proposalUri: string
  ): boolean {
    const gig = this.gigs.get(gigId)
    if (!gig) throw new Error('Gig not found')
    if (gig.status !== 0) throw new Error('Gig not open')
    
    const proposals = this.proposals.get(gigId) || []
    
    // Check if already submitted
    if (proposals.some(p => p.proposer.toLowerCase() === proposer.toLowerCase())) {
      throw new Error('Already submitted')
    }

    const proposal: MockProposal = {
      proposer: proposer.toLowerCase(),
      proposalUri,
      submittedAt: Math.floor(Date.now() / 1000),
      withdrawn: false
    }

    proposals.push(proposal)
    this.proposals.set(gigId, proposals)
    
    gig.proposalCount++
    this.gigs.set(gigId, gig)
    
    this.saveState()
    return true
  }

  getGigProposals(gigId: number): MockProposal[] {
    return this.proposals.get(gigId) || []
  }

  selectProposal(gigId: number, proposalIndex: number, caller: string): boolean {
    const gig = this.gigs.get(gigId)
    if (!gig) throw new Error('Gig not found')
    if (gig.poster !== caller.toLowerCase()) throw new Error('Not the poster')
    
    gig.status = 1 // In Progress
    gig.selectedProposal = proposalIndex
    this.gigs.set(gigId, gig)
    
    this.saveState()
    return true
  }

  completeGig(gigId: number, caller: string): boolean {
    const gig = this.gigs.get(gigId)
    if (!gig) throw new Error('Gig not found')
    if (gig.poster !== caller.toLowerCase()) throw new Error('Not the poster')
    
    gig.status = 2 // Completed
    this.gigs.set(gigId, gig)
    
    // Pay the selected freelancer
    if (gig.selectedProposal > 0) {
      const proposals = this.proposals.get(gigId) || []
      const selectedProposal = proposals[gig.selectedProposal - 1]
      if (selectedProposal) {
        const freelancerBalance = this.getBalance(selectedProposal.proposer)
        this.balances.set(selectedProposal.proposer, freelancerBalance + gig.usdtAmount)
      }
    }
    
    this.saveState()
    return true
  }

  cancelGig(gigId: number, caller: string): boolean {
    const gig = this.gigs.get(gigId)
    if (!gig) throw new Error('Gig not found')
    if (gig.poster !== caller.toLowerCase()) throw new Error('Not the poster')
    
    gig.status = 3 // Cancelled
    this.gigs.set(gigId, gig)
    
    // Refund USDT
    if (gig.usdtAmount > BigInt(0)) {
      const posterBalance = this.getBalance(gig.poster)
      this.balances.set(gig.poster, posterBalance + gig.usdtAmount)
    }
    
    this.saveState()
    return true
  }

  clearAllData() {
    this.bounties.clear()
    this.submissions.clear()
    this.gigs.clear()
    this.proposals.clear()
    this.nextBountyId = 1
    this.nextGigId = 1
    this.balances.clear()
    this.allowances.clear()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_bounties')
      localStorage.removeItem('mock_nextBountyId')
      localStorage.removeItem('mock_gigs')
      localStorage.removeItem('mock_nextGigId')
      localStorage.removeItem('mock_balances')
      localStorage.removeItem('mock_allowances')
      localStorage.removeItem('mock_submissions')
      localStorage.removeItem('mock_proposals')
    }
  }
}

// Singleton instance
export const mockContractState = new MockContractState()

// Helper to generate realistic transaction hash
export function generateMockTxHash(): string {
  const chars = '0123456789abcdef'
  let hash = '0x'
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}

// Helper to simulate transaction delay
export function simulateTransactionDelay(type: 'fast' | 'normal' | 'slow' = 'normal'): Promise<void> {
  const delays = {
    fast: 1000 + Math.random() * 1000,    // 1-2 seconds
    normal: 2000 + Math.random() * 2000,  // 2-4 seconds
    slow: 4000 + Math.random() * 3000     // 4-7 seconds
  }
  return new Promise(resolve => setTimeout(resolve, delays[type]))
}
