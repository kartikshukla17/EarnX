"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll } from "motion/react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, BookOpen, Twitter, MessageCircle, ExternalLink, Search } from "lucide-react"
import { UserButton, useUser } from "@civic/auth/react"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems?: {
    name: string
    link: string
    icon?: any
  }[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUser()

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  // Redirect to dashboard if user is authenticated
  React.useEffect(() => {
    if (user && pathname === '/') {
      router.push('/dashboard')
    }
  }, [user, router, pathname])

  const defaultNavItems = [
    {
      name: "Docs",
      link: "/docs",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: "Blog",
      link: "/blog",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "Explorer",
      link: "/explorer",
      icon: <Search className="h-4 w-4" />,
    },
  ]

  const socialLinks = [
    {
      name: "Twitter",
      link: "https://twitter.com/earnx",
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      name: "Discord",
      link: "https://discord.gg/earnx",
      icon: <MessageCircle className="h-4 w-4" />,
    },
  ]

  const itemsToShow = navItems || defaultNavItems

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          className={cn(
            "flex max-w-6xl mx-auto border border-gray-800 rounded-2xl bg-black/80 backdrop-blur-md shadow-lg z-[5000] px-6 py-3 items-center justify-between",
            className,
          )}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">EarnX</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {itemsToShow.map((navItem: any, idx: number) => (
              <motion.a
                key={`link=${idx}`}
                href={navItem.link}
                className="relative text-gray-400 items-center flex space-x-1 hover:text-white transition-colors text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline-block">{navItem.icon}</span>
                <span>{navItem.name}</span>
              </motion.a>
            ))}

            {/* Social Links */}
            {socialLinks.map((social, idx) => (
              <motion.a
                key={`social=${idx}`}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* User Button or Launch App */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserButton />
            ) : (
              <motion.a
                href="/dashboard"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-sm hover:from-purple-500 hover:to-blue-500 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch App
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
