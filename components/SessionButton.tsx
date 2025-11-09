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
      type: "spring",
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
      className="block w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
      variants={buttonVariants}
      whileHover={{
        scale: href ? 1.08 : 1,
        rotate: href ? [0, -2, 2, 0] : 0,
        boxShadow: href ? "0 20px 40px rgba(6, 182, 212, 0.4)" : "0 10px 20px rgba(6, 182, 212, 0.2)",
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
