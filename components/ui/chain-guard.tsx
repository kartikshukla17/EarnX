"use client"

import React, { useEffect, useState } from "react"
import { useAccount, useSwitchChain } from "wagmi"
import { motion, AnimatePresence } from "motion/react"
import { AlertTriangle, RefreshCw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const U2U_SOLARIS_MAINNET_ID = 39

interface ChainGuardProps {
  children: React.ReactNode
}

export function ChainGuard({ children }: ChainGuardProps) {
  const { isConnected, chainId } = useAccount()
  const { switchChain, isPending } = useSwitchChain()
  const [showGuard, setShowGuard] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)

  // Check if user is on the correct chain
  useEffect(() => {
    if (isConnected && chainId && chainId !== U2U_SOLARIS_MAINNET_ID) {
      setShowGuard(true)
    } else {
      setShowGuard(false)
    }
  }, [isConnected, chainId])

  const handleSwitchChain = async () => {
    setIsSwitching(true)
    try {
      await switchChain({ chainId: U2U_SOLARIS_MAINNET_ID })
      setShowGuard(false)
    } catch (error) {
      console.error("Failed to switch chain:", error)
    } finally {
      setIsSwitching(false)
    }
  }

  const addU2UToWallet = () => {
    // U2U Solaris Mainnet network details
    const networkDetails = {
      chainId: "0x27", // 39 in hex
      chainName: "U2U Solaris Mainnet",
      nativeCurrency: {
        name: "U2U",
        symbol: "U2U",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mainnet.u2u.xyz"],
      blockExplorerUrls: ["https://u2uscan.xyz"],
    }

    // Try to add the network to the wallet
    if (window.ethereum) {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networkDetails],
      }).catch((error: any) => {
        console.error("Failed to add network:", error)
      })
    }
  }

  // If not connected or on correct chain, show children
  if (!isConnected || !showGuard) {
    return <>{children}</>
  }

  // Show chain guard if on wrong chain
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md"
        >
          <Card className="bg-black/95 border border-red-500/50 text-white">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <CardTitle className="text-xl text-red-400">
                Wrong Network Detected
              </CardTitle>
              <CardDescription className="text-gray-300">
                This application only works on U2U Solaris Mainnet
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-gray-400">
                <p>Current Network: <span className="text-red-400">Chain ID {chainId}</span></p>
                <p>Required Network: <span className="text-green-400">U2U Solaris Mainnet (Chain ID 39)</span></p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleSwitchChain}
                  disabled={isSwitching || isPending}
                  className="w-full bg-[#E23E6B] hover:bg-[#E23E6B]/80 text-white"
                >
                  {isSwitching || isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Switching Network...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Switch to U2U Solaris Mainnet
                    </>
                  )}
                </Button>

                <Button
                  onClick={addU2UToWallet}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Add U2U Network to Wallet
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                <p>If you don't have U2U Solaris Mainnet in your wallet,</p>
                <p>click "Add U2U Network" to add it automatically.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
