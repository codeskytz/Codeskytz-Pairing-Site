"use client"

import type React from "react"
import { motion } from "framer-motion"

interface SessionButtonProps {
  href: string
  children: React.ReactNode
}

const buttonVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  },
}

const SessionButton: React.FC<SessionButtonProps> = ({ href, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href && href.trim() !== "") {
      // If href is provided, redirect to it
      window.location.href = href
    } else {
      // If no href, prevent default and do nothing
      e.preventDefault()
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className="block w-full px-8 py-4 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-800 text-white font-bold text-lg shadow-2xl hover:shadow-cyan-400/60 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group border border-white/20"
      variants={buttonVariants}
      whileHover={{
        scale: href ? 1.08 : 1,
        rotate: href ? [0, -2, 2, 0] : 0,
        boxShadow: href ? "0 25px 50px rgba(6, 182, 212, 0.5)" : "0 15px 30px rgba(6, 182, 212, 0.3)",
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{ scale: href ? 0.93 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      title={href ? `Navigate to ${href}` : "Link not configured"}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

export default SessionButton
