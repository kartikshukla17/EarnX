"use client"

import { ArrowRight, MessageCircle, Lock, ChevronRight } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { AuroraText } from "@/components/magicui/aurora-text"
import Link from "next/link"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export default function BentoGrid() {
  // Animation variants
  const cardVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const iconVariants: Variants = {
    initial: {
      scale: 0.8,
      opacity: 0.5,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const arrowVariants: Variants = {
    initial: { x: -5 },
    hover: {
      x: 5,
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        duration: 0.8,
      },
    },
  }

  return (
    <div className={cn("relative text-white py-10 px-4 md:px-6 z-10 font-thin", poppins.className)}>
      {/* SVG Gradients for icons */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="lock-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="chevron-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </svg>

      {/* Glassmorphic background */}
      <div className="max-w-5xl mx-auto relative backdrop-blur-sm " />

      {/* Heading */}
      <motion.h1
        className={cn("text-3xl md:text-4xl lg:text-5xl font-thin text-center mb-8", poppins.className)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <AuroraText colors={["#22C55E", "#4ADE80", "#BBF7D0", "#A3E635"]}>
          <span className="text-transparent">The Freelance OS for Web3</span>
        </AuroraText>
        <br />
        Gigs, bounties, and clients in a $1.5T market
      </motion.h1>

      {/* Main feature banner */}
      <Link href="/">
        <motion.div
          className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 relative mb-4 group shadow-lg cursor-pointer"
          initial="initial"
          animate="animate"
          whileHover="hover"
          //@ts-ignore
          variants={cardVariants}
          custom={0}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white to-[#E23E6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
          <div className="relative z-10 p-8 flex items-center justify-between">
            <div>
              <p
                className={cn(
                  "text-xs uppercase text-gray-300/80 mb-2 font-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-emerald-400 transition-colors duration-300",
                  poppins.className,
                )}
              >
                FREELANCER HOME
              </p>
              <h2
                className={cn(
                  "text-4xl font-thin mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-emerald-400 transition-colors duration-300",
                  poppins.className,
                )}
              >
                Find serious gigs,
                <br />
                keep more of what you earn.
              </h2>
            </div>
            <motion.div variants={arrowVariants}>
              <ArrowRight
                className="text-emerald-400 w-8 h-8 group-hover:text-white transition-colors duration-300"
                strokeWidth={1.5}
              />
            </motion.div>
          </div>
        </motion.div>
      </Link>

      {/* Grid layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Feature 1 - Bounty Hiring - Spans 4 columns */}
        <Link href="/dashboard/bounties" className="col-span-12 md:col-span-4">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col h-full relative group overflow-hidden shadow-lg cursor-pointer"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            custom={1}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#E23E6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              <p
                className={cn(
                  "text-xs uppercase text-gray-300/80 mb-6 font-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-emerald-400 transition-colors duration-300",
                  poppins.className,
                )}
              >
                COMPETITIVE BOUNTIES
              </p>
              <div className="flex-grow flex items-center justify-center mb-8">
                <motion.div variants={iconVariants} initial="initial" animate="animate" whileHover="hover">
                  <MessageCircle
                    className="w-24 h-24 text-emerald-400 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>
              <div className="flex justify-between items-end mt-auto">
                <h3
                  className={cn(
                    "text-2xl font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B] transition-colors duration-300",
                    poppins.className,
                  )}
                >
                  Win bounties
                  <br />
                  with proof of work
                </h3>
                <motion.div variants={arrowVariants}>
                  <ChevronRight
                    className="text-emerald-400 w-6 h-6 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Feature 2 - Freelance GIG - Spans 4 columns */}
        <Link href="/dashboard/freelance" className="col-span-12 md:col-span-4">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col h-full relative group overflow-hidden shadow-lg cursor-pointer"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            custom={2}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#E23E6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              <p
                className={cn(
                  "text-xs uppercase text-gray-300/80 mb-6 font-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-emerald-400 transition-colors duration-300",
                  poppins.className,
                )}
              >
                ESCROW GIGS
              </p>
              <div className="flex-grow flex items-center justify-center mb-6">
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="relative w-16 h-16">
                      <motion.div
                        className="absolute top-1 right-1"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          duration: 2,
                          delay: 0.5,
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"
                            fill="#22C55E"
                            stroke="none"
                          />
                        </svg>
                      </motion.div>
                      <motion.div
                        className="absolute -top-2 -left-2"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          duration: 2,
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"
                            fill="#22C55E"
                            stroke="none"
                          />
                        </svg>
                      </motion.div>
                      <motion.div
                        className="absolute bottom-0 right-0"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          duration: 2,
                          delay: 1,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z"
                            fill="#22C55E"
                            stroke="none"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <h3
                className={cn(
                  "text-2xl font-thin mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-emerald-400 transition-colors duration-300",
                  poppins.className,
                )}
              >
                Escrow‑protected
                <br />
                freelance work
              </h3>
              <p className={cn("text-gray-300/70 text-sm mb-6 font-light leading-relaxed", poppins.className)}>
                Smart contracts secure payments
                <br />
                until work is verified
              </p>
              <div className="flex justify-end mt-auto">
                <motion.div
                  className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-lime-400 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ChevronRight
                    className="text-emerald-400 w-6 h-6 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Feature 3 - Staked Commitments - Spans 4 columns */}
        <Link href="/dashboard/jobs" className="col-span-12 md:col-span-4">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col h-full relative group overflow-hidden shadow-lg cursor-pointer"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            custom={3}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#E23E6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              <p
                className={cn(
                  "text-xs uppercase text-gray-300/80 mb-6 font-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-emerald-400 transition-colors duration-300",
                  poppins.className,
                )}
              >
                STAKED COMMITMENTS
              </p>
              <div className="flex-grow flex items-center justify-center mb-8">
                <motion.div variants={iconVariants} initial="initial" animate="animate" whileHover="hover">
                  <Lock
                    className="w-20 h-20 text-emerald-400 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>
              <div className="flex justify-between items-end mt-auto">
                <h3
                  className={cn(
                    "text-2xl font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-[#E23E6B] transition-colors duration-300",
                    poppins.className,
                  )}
                >
                  Anti‑ghosting
                  <br />
                  for both sides
                </h3>
                <motion.div variants={arrowVariants}>
                  <ChevronRight
                    className="text-emerald-400 w-6 h-6 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Feature 4 - Web3 Jobs Portal - Spans full width */}
        <Link href="/dashboard/jobs" className="col-span-12">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex justify-between items-center relative group overflow-hidden shadow-lg cursor-pointer"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={cardVariants}
            custom={4}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#E23E6B] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>
            <div className="relative z-10 flex justify-between items-center w-full">
              <div>
                <p
                  className={cn(
                    "text-xs uppercase text-gray-300/80 mb-2 font-light group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-emerald-400 transition-colors duration-300",
                    poppins.className,
                  )}
                >
                  OPPORTUNITY FEED
                </p>
                <h3
                  className={cn(
                    "text-4xl font-thin group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-t group-hover:from-white group-hover:to-emerald-400 transition-colors duration-300",
                    poppins.className,
                  )}
                >
                  Gigs, bounties
                  <br />
                  & off-chain roles
                </h3>
              </div>
              <motion.div variants={arrowVariants}>
                <ChevronRight
                  className="text-emerald-400 w-10 h-10 group-hover:text-white transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </motion.div>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
