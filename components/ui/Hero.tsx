"use client"
import React from 'react'
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10 py-20">
        {/* Main Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          NASDAQ for AI Apps
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Decentralized AI app ecosystem enabling discovery, deployment, tokenization, trading, and monetization of autonomous AI applications built on blockchain technology.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/dashboard">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-500 flex items-center gap-2 text-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Launch App</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <Link href="/docs">
            <motion.button
              className="px-8 py-4 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:border-gray-600 hover:text-white transition-all duration-300 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Docs
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
