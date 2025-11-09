"use client"

import type React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const LOGO_URL = "" // Add your company logo URL here (e.g., "https://example.com/logo.png")

const Header: React.FC = () => {
  return (
    <motion.header
      className="w-full py-6 px-4 sm:px-8 z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {LOGO_URL ? (
              <Image
                src={LOGO_URL || "/placeholder.svg"}
                alt="CodeskyTz Logo"
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <span className="text-white font-bold text-lg">CT</span>
            )}
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">CodeskyTz</h2>
        </Link>

        <motion.a
          href="https://github.com/codeskytz"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-gray-100 hover:shadow-lg hover:shadow-cyan-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">GitHub</span>
        </motion.a>
      </div>
    </motion.header>
  )
}

export default Header
