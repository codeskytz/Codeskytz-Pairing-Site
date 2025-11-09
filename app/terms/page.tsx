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

export default function TermsPage() {
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
            Terms of Service
          </motion.h1>

          <motion.p className="text-gray-400 mb-8" variants={itemVariants}>
            Last updated: November 9, 2025
          </motion.p>

          <motion.div className="space-y-6 text-gray-300" variants={itemVariants}>
            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using CodeskyTz pairing services, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Service Description</h2>
              <p className="leading-relaxed">
                CodeskyTz provides remote pairing session services for developers. Our platform facilitates connections
                between users for collaborative coding sessions. We reserve the right to modify, suspend, or discontinue
                the service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">User Responsibilities</h2>
              <p className="leading-relaxed mb-3">As a user of CodeskyTz, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to any part of the service</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Not engage in any activity that disrupts or interferes with the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Disclaimer and Limitation of Liability</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
                <p className="leading-relaxed text-yellow-200">
                  <strong className="text-yellow-300">⚠️ Important:</strong> CodeskyTz is NOT affiliated with WhatsApp,
                  Meta, or any of their subsidiaries. We are an independent third-party service provider.
                </p>
              </div>
              <p className="leading-relaxed mb-3">
                The service is provided "as is" without warranties of any kind. CodeskyTz is not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any account bans, restrictions, or suspensions from third-party services</li>
                <li>Loss of data or content during pairing sessions</li>
                <li>Interruptions or errors in service availability</li>
                <li>Actions taken by third-party platforms against your accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Use at Your Own Risk</h2>
              <p className="leading-relaxed">
                By using CodeskyTz pairing services, you acknowledge and accept that you are using third-party tools
                that may violate the terms of service of other platforms. You assume all risks associated with such use,
                including but not limited to account termination by third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, features, and functionality of CodeskyTz are owned by CodeskyTz and are protected by
                international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting to the website. Your continued use of the service after changes constitutes acceptance of the
                new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-3">Contact Information</h2>
              <p className="leading-relaxed">
                For questions about these Terms of Service, please visit our{" "}
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
