import type React from "react"
import Link from "next/link"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-6 px-4 sm:px-8 z-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">© {currentYear} CodeskyTz. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
