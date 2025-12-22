"use client"
import React from 'react'
import { motion } from "motion/react"
import { ArrowRight, Link2, Cloud, Zap } from "lucide-react"
import Link from "next/link"

export const Features = () => {
  const features = [
    {
      title: "EarnX Chain",
      description: "Layer-2 trading and settlement for AI app tokens",
      icon: Link2,
      link: "/explorer",
      color: "from-purple-600 to-blue-600"
    },
    {
      title: "EarnX Super App",
      description: "Discover and trade AI applications",
      icon: Zap,
      link: "/dashboard",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "EarnX Cloud",
      description: "Deploy and scale AI infrastructure",
      icon: Cloud,
      link: "/cloud",
      color: "from-purple-600 via-blue-600 to-purple-600"
    }
  ]

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={feature.link}>
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 h-full hover:border-gray-700 transition-all duration-300 cursor-pointer">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-sm font-semibold text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
