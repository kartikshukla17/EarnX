"use client"
import React from 'react'
import { motion } from "motion/react"

export const TrustedBy = () => {
  // Placeholder partner names - replace with actual logos/images
  const partners = [
    { name: "Arbitrum", logo: "/partners/arbitrum.svg" },
    { name: "Coinbase", logo: "/partners/coinbase.svg" },
    { name: "Polygon", logo: "/partners/polygon.svg" },
    { name: "Ethereum", logo: "/partners/ethereum.svg" },
    { name: "Chainlink", logo: "/partners/chainlink.svg" },
    { name: "Uniswap", logo: "/partners/uniswap.svg" },
  ]

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <motion.p
          className="text-sm text-gray-500 text-center mb-8 uppercase tracking-wider font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted By
        </motion.p>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center w-full h-16 opacity-60 hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
            >
              {/* Placeholder for logo - replace with actual image */}
              <div className="text-gray-600 text-sm font-semibold">
                {partner.name}
              </div>
              {/* Uncomment when you have actual logos:
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 max-w-full object-contain filter brightness-0 invert opacity-60 hover:opacity-100"
              />
              */}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}



