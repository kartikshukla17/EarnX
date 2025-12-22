"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation"

interface WalletContextType {
  isConnected: boolean
  address: string | undefined
  isConnecting: boolean
  connect: (connectorId: string) => Promise<void>
  disconnect: () => void
  showConnectionAnimation: boolean
  setShowConnectionAnimation: (show: boolean) => void
  shouldRedirectToDashboard: boolean
  setShouldRedirectToDashboard: (should: boolean) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected, chainId } = useAccount()
  const { connect: wagmiConnect, connectors, isPending } = useConnect()
  const { disconnect: wagmiDisconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const router = useRouter()
  const [showConnectionAnimation, setShowConnectionAnimation] = useState(false)
  const [hasShownAnimation, setHasShownAnimation] = useState(false)
  const [shouldRedirectToDashboard, setShouldRedirectToDashboard] = useState(false)
  const [isAutoSwitching, setIsAutoSwitching] = useState(false)

  // Ethereum Sepolia Chain ID
  const REQUIRED_CHAIN_ID = 11155111;

  // Enforce Ethereum Sepolia - switch immediately when connected to wrong network
  useEffect(() => {
    if (isConnected && chainId && chainId !== REQUIRED_CHAIN_ID && !isAutoSwitching) {
      console.log("🚨 ENFORCING SEPOLIA CHAIN: Switching to Ethereum Sepolia. Current chain:", chainId)
      setIsAutoSwitching(true)
      
      const enforceSepoliaChain = async () => {
        try {
          await switchChain({ chainId: REQUIRED_CHAIN_ID })
          console.log("✅ Successfully enforced Ethereum Sepolia")
        } catch (error) {
          console.error("❌ Failed to enforce Ethereum Sepolia:", error)
          // If switching fails, we should disconnect the user to prevent wrong chain usage
          console.log("🔌 Disconnecting wallet due to wrong chain")
          wagmiDisconnect()
        } finally {
          setIsAutoSwitching(false)
        }
      }
      
      enforceSepoliaChain()
    }
  }, [isConnected, chainId, switchChain, isAutoSwitching, wagmiDisconnect])

  // Reset animation state when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setShowConnectionAnimation(false)
      setIsAutoSwitching(false)
    }
  }, [isConnected])

  // Handle redirect to dashboard when wallet connects and is on correct chain
  useEffect(() => {
    if (isConnected && address && shouldRedirectToDashboard && 
        chainId === REQUIRED_CHAIN_ID && !isAutoSwitching) {
      // Check if we're not already on a dashboard page
      const currentPath = window.location.pathname
      if (!currentPath.startsWith('/dashboard')) {
        router.push('/dashboard')
      }
      setShouldRedirectToDashboard(false)
    }
  }, [isConnected, address, shouldRedirectToDashboard, router, chainId, isAutoSwitching])

  const connect = async (connectorId: string): Promise<void> => {
    console.log("Wallet context: Starting connection for connector:", connectorId)
    console.log("Wallet context: Available connectors:", connectors.map(c => ({ id: c.id, name: c.name, ready: c.ready })))
    
    const connector = connectors.find((c: any) => c.id === connectorId)
    if (!connector) {
      console.error("Wallet context: Connector not found:", connectorId)
      throw new Error(`Connector ${connectorId} not found`)
    }
    
    console.log("Wallet context: Found connector:", { id: connector.id, name: connector.name, ready: connector.ready })
    
    try {
      console.log("Wallet context: Attempting wagmiConnect...")
      await wagmiConnect({ connector })
      console.log("Wallet context: wagmiConnect successful")
      
      // Immediately enforce Sepolia chain after connection
      console.log("🔒 Enforcing Ethereum Sepolia after connection...")
      try {
        await switchChain({ chainId: REQUIRED_CHAIN_ID })
        console.log("✅ Successfully switched to Ethereum Sepolia after connection")
      } catch (switchError) {
        console.error("❌ Failed to switch to Sepolia after connection:", switchError)
        // Don't throw here, let the useEffect handle it
      }
      
      // Set redirect flag when connecting
      setShouldRedirectToDashboard(true)
    } catch (error) {
      console.error("Wallet context: Wallet connection failed:", error)
      throw error
    }
  }

  const disconnect = () => {
    wagmiDisconnect()
    setShowConnectionAnimation(false)
    setShouldRedirectToDashboard(false)
    setIsAutoSwitching(false)
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        isConnecting: isPending || isAutoSwitching,
        connect,
        disconnect,
        showConnectionAnimation,
        setShowConnectionAnimation,
        shouldRedirectToDashboard,
        setShouldRedirectToDashboard,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}