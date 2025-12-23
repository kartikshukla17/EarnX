"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Briefcase } from "lucide-react"
import { AuroraText } from "@/components/magicui/aurora-text"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { WalletDisplay } from "@/components/ui/wallet-display"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export default function Jobs() {
  // Animation variants
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 * index, duration: 0.5, ease: "easeOut" },
    }),
  }

  const features = [
    "Premium remote roles that complement your on-chain EarnX profile",
    "Network growth opportunities with top Web3 companies",
    "Career advancement through curated off-chain opportunities",
  ]

  return (
    <div
      className={cn(
        "relative bg-black text-white py-8 px-4 md:px-6 min-h-screen",
        poppins.className
      )}
    >
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-end items-center gap-4">
          <div className="flex items-center gap-4">
            <WalletDisplay />
            <Link href="/dashboard">
              <motion.button
                className="flex items-center space-x-3 px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="max-w-4xl mx-auto text-center relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)]">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-emerald-400/10 opacity-50 rounded-3xl blur-md"></div>

        <div className="relative z-10">
          {/* Header */}
          <motion.div
            className="mb-12"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-thin mb-4",
                poppins.className
              )}
              variants={itemVariants}
              custom={0}
            >
              <AuroraText colors={["#22C55E", "#4ADE80", "#BBF7D0", "#A3E635"]}>
                <span className="text-transparent">EarnX Off-Chain Jobs</span>
              </AuroraText>
            </motion.h1>
            <motion.p
              className="text-2xl text-gray-300/80"
              variants={itemVariants}
              custom={1}
            >
              Coming Soon – curated remote roles and off-chain opportunities that plug into your on-chain EarnX reputation and freelance income streams.
            </motion.p>
          </motion.div>

          {/* Features List */}
          <motion.ul
            className="space-y-6 max-w-2xl mx-auto"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center justify-center text-lg text-gray-300/70"
                variants={itemVariants}
                custom={index + 2}
              >
                <div className="w-2 h-2 bg-emerald-400/70 rounded-full mr-3"></div>
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  )
}
