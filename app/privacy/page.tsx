"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function PrivacyPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-950 font-sans text-gray-100">
      <div
        className="circles absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-30"
        aria-hidden="true"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute block list-none w-5 h-5 bg-gray-600/20 rounded-full animate-circles"
            style={{
              left: `${[25, 70, 40, 75, 50][i]}%`,
              width: `${[80, 20, 60, 110, 25][i]}px`,
              height: `${[80, 20, 60, 110, 25][i]}px`,
              animationDelay: `${[0, 2, 0, 3, 15][i]}s`,
              animationDuration: `${[25, 25, 18, 25, 45][i]}s`,
              bottom: "-150px",
            }}
          />
        ))}
      </div>

      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 z-10">
        <motion.div
          className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 sm:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text"
            variants={itemVariants}
          >
            Privacy Policy
          </motion.h1>

          <motion.p className="text-gray-400 mb-8" variants={itemVariants}>
            Last updated: November 9, 2025
          </motion.p>

          <motion.div className="space-y-6 text-gray-300" variants={itemVariants}>
            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Introduction</h2>
              <p className="leading-relaxed">
                Welcome to CodeskyTz. We respect your privacy and are committed to protecting your personal data. This
                privacy policy explains how we handle your information when you use our pairing services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Information We Collect</h2>
              <p className="leading-relaxed mb-3">When you use CodeskyTz pairing services, we may collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Session connection data and timestamps</li>
                <li>Device information and browser type</li>
                <li>IP addresses for security purposes</li>
                <li>Usage statistics and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and maintain our pairing services</li>
                <li>Improve user experience and functionality</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Ensure security and prevent abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate security measures to protect your data. However, no method of transmission over
                the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Third-Party Services</h2>
              <p className="leading-relaxed">
                CodeskyTz is an independent service and is not affiliated with WhatsApp or Meta. We are not responsible
                for the privacy practices of third-party services you may connect with through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy, please contact us through our{" "}
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                  contact page
                </Link>
                .
              </p>
            </section>
          </motion.div>
        </motion.div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes circles {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-circles {
          animation: circles 25s linear infinite;
        }
      `}</style>
    </div>
  )
}
