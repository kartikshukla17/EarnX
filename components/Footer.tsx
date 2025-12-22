import React from 'react'
import { Twitter, MessageCircle, Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/earnx" },
    { name: "Discord", icon: MessageCircle, href: "https://discord.gg/earnx" },
    { name: "GitHub", icon: Github, href: "https://github.com/earnx" },
  ]

  return (
    <footer className="bg-black border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Legal & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} EarnX. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/legal" className="hover:text-white transition-colors">
                Legal
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
