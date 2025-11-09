"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Quote {
  text: string
  author: string
}

interface QuoteDisplayProps {
  quote: Quote
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote }) => {
  return (
    <div className="mb-12 min-h-[120px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.text}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
          }}
          exit={{
            opacity: 0,
            y: -30,
            scale: 0.95,
            transition: {
              duration: 0.4,
            },
          }}
          className="text-center px-4"
        >
          <motion.p
            className="text-lg md:text-xl text-gray-300 italic mb-3 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            "{quote.text}"
          </motion.p>
          <motion.p
            className="text-sm md:text-base text-cyan-400 font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            — {quote.author}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default QuoteDisplay
