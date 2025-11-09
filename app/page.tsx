"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SessionButton from "../components/SessionButton"
import QuoteDisplay from "../components/QuoteDisplay"

// Donate Modal Component
const DonateModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    amount: 200,
    customerName: '',
    customerEmail: '',
    description: 'Support CodeskyTz-MD development'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: formData.amount,
          description: formData.description,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success && data.paymentLink) {
        window.location.href = data.paymentLink
      } else {
        setError(data.message || 'Failed to generate payment link. Please try again.')
      }
    } catch (err) {
      console.error('Donation error:', err)
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError('Network error. Please check your internet connection and try again.')
        } else if (err.message.includes('HTTP error!')) {
          setError('Server error. Please try again later.')
        } else {
          setError(err.message || 'An unexpected error occurred. Please try again.')
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseInt(value) || 0 : value
    }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Support Our Project</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount (TZS) - Minimum 200 TZS
                  </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="200"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Minimum 200 TZS"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Leave a message..."
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Donate
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const sessionLinks = [
  { label: "Server 1", href: "https://server1.codeskytz.site" },
  { label: "Server 2", href: "https://server2.codeskytz.site" },
  { label: "Server 3", href: "https://server3.codeskytz.site" },
  { label: "Server 4", href: "https://server4.codeskytz.site" },
]

const deploymentOptions = [
  { id: 'heroku', label: 'Heroku', href: 'https://www.heroku.com', icon: '/heroku.png' },
  { id: 'render', label: 'Render', href: 'https://render.com', icon: '/render.png' },
  { id: 'koyeb', label: 'Koyeb', href: 'https://www.koyeb.com', icon: '/placeholder-logo.png' },
  { id: 'sevalla', label: 'Sevalla', href: '#', icon: '/sevalla.png' },
  { id: 'railway', label: 'Railway', href: 'https://railway.app', icon: '/railway.png' },
  { id: 'termux', label: 'Termux', href: '#', icon: '/termux.jpeg' },
  { id: 'vps', label: 'VPS', href: '#', icon: '/vps.png' },
]

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  
  {text: "beti sana maisha bado magumu " ,author :"elitechwiz"}
  ,
]

const musicTracks = [
  "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
  "https://cdn.pixabay.com/audio/2022/03/10/audio_4dedf3f94c.mp3",
  "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3",
  "https://cdn.pixabay.com/audio/2022/11/22/audio_31360fbd17.mp3",
  "https://cdn.pixabay.com/audio/2023/02/28/audio_c2f0d85b5f.mp3",
  "https://cdn.pixabay.com/audio/2022/10/25/audio_c8e7e1e6e5.mp3",
  "https://cdn.pixabay.com/audio/2022/10/25/audio_c8e7e1e6e5.mp3",
]

const titleVariants = {
  hidden: { opacity: 0, y: -60, scale: 0.7 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      delay: 0.1,
    },
  },
}

const disclaimerVariants = {
  hidden: { opacity: 0, y: 20, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      delay: 0.5,
      duration: 0.4,
      height: {
        duration: 0.3,
      },
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    height: 0,
    marginBottom: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.2 },
      height: {
        delay: 0.2,
        duration: 0.3,
      },
    },
  },
}

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

export default function Page() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [showDonateModal, setShowDonateModal] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Quote rotation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  // Hide disclaimer after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set volume to comfortable level
    audio.volume = 0.3

    const handleTrackEnd = () => {
      console.log("[v0] Track ended, switching to next random track")
      // Get a random track that's different from the current one
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * musicTracks.length)
      } while (nextIndex === currentTrackIndex && musicTracks.length > 1)

      console.log(`[v0] Switching from track ${currentTrackIndex} to track ${nextIndex}`)
      setCurrentTrackIndex(nextIndex)
    }

    const handleError = (e: Event) => {
      console.log("[v0] Audio error, attempting next track:", e)
      // If there's an error, try the next track
      const nextIndex = (currentTrackIndex + 1) % musicTracks.length
      setCurrentTrackIndex(nextIndex)
    }

    audio.addEventListener("ended", handleTrackEnd)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("ended", handleTrackEnd)
      audio.removeEventListener("error", handleError)
    }
  }, [currentTrackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    console.log(`[v0] Loading track ${currentTrackIndex}: ${musicTracks[currentTrackIndex]}`)

    audio.src = musicTracks[currentTrackIndex]
    audio.load()

    const playAudio = async () => {
      try {
        await audio.play()
        console.log("[v0] Audio playing successfully")
      } catch (error) {
        console.log("[v0] Autoplay prevented, waiting for user interaction")
        // If autoplay fails, wait for user interaction
        const playOnInteraction = async () => {
          try {
            await audio.play()
            console.log("[v0] Audio started after user interaction")
            document.removeEventListener("click", playOnInteraction)
            document.removeEventListener("scroll", playOnInteraction)
            document.removeEventListener("touchstart", playOnInteraction)
            document.removeEventListener("keydown", playOnInteraction)
          } catch (err) {
            console.log("[v0] Audio playback prevented:", err)
          }
        }

        document.addEventListener("click", playOnInteraction, { once: true })
        document.addEventListener("scroll", playOnInteraction, { once: true })
        document.addEventListener("touchstart", playOnInteraction, { once: true })
        document.addEventListener("keydown", playOnInteraction, { once: true })
      }
    }

    playAudio()
  }, [currentTrackIndex])

  // Handle donate modal
  useEffect(() => {
    const handleOpenDonateModal = () => setShowDonateModal(true)
    const handleCloseDonateModal = () => setShowDonateModal(false)

    window.addEventListener('open-donate-modal', handleOpenDonateModal)
    window.addEventListener('close-donate-modal', handleCloseDonateModal)

    return () => {
      window.removeEventListener('open-donate-modal', handleOpenDonateModal)
      window.removeEventListener('close-donate-modal', handleCloseDonateModal)
    }
  }, [])

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-950 font-sans text-gray-100">
      <div
        className="circles absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none"
        aria-hidden="true"
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute block list-none bg-gray-600/20 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
            }}
            style={{
              left: `${[25, 10, 70, 40, 65, 75, 35, 50, 20, 85][i]}%`,
              width: `${[80, 20, 20, 60, 20, 110, 150, 25, 15, 150][i]}px`,
              height: `${[80, 20, 20, 60, 20, 110, 150, 25, 15, 150][i]}px`,
              animationDelay: `${[0, 2, 4, 0, 0, 3, 7, 15, 2, 0][i]}s`,
              animationDuration: `${[25, 12, 25, 18, 25, 25, 25, 45, 35, 11][i]}s`,
              bottom: "-150px",
            }}
          />
        ))}
      </div>

      <Header />

      {/* Donate Modal */}
      <DonateModal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
      />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 z-10">
        <div className="w-full max-w-2xl text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
          >
            CODESKYTZ-MD
          </motion.h1>

          <QuoteDisplay quote={quotes[currentQuoteIndex]} />

          <AnimatePresence>
            {showDisclaimer && (
              <motion.div
                className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg backdrop-blur-sm overflow-hidden"
                variants={disclaimerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="text-sm text-yellow-200/90 leading-relaxed">
                  <strong className="text-yellow-300">⚠️ Disclaimer:</strong> CodeskyTz is not affiliated with WhatsApp
                  or Meta. We are not responsible for any account bans or restrictions that may occur from using
                  third-party pairing tools. Use at your own risk.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Session Servers</h2>
            <p className="text-gray-300 text-sm md:text-base">Choose your preferred server to start your session</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={buttonContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {sessionLinks.map((link, index) => (
              <SessionButton key={index} href={link.href}>
                {link.label}
              </SessionButton>
            ))}
          </motion.div>

          {/* Deployment options cards (enhanced design) */}
          <motion.div
            className="text-center mt-16 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Deploy On</h2>
            <p className="text-gray-300 text-sm md:text-base">Choose your deployment platform</p>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {deploymentOptions.map((opt, index) => (
              <motion.div
                key={opt.id}
                className="group relative overflow-hidden bg-gradient-to-br from-white/12 via-white/8 to-white/6 backdrop-blur-xl border border-white/25 rounded-3xl shadow-2xl hover:shadow-3xl hover:shadow-cyan-400/30 transition-all duration-500 p-6 sm:p-8"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 3,
                  rotateX: 2,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-cyan-400/6 to-purple-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className="relative z-10">
                  {/* Header with icon and title */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 xl:w-20 xl:h-20 rounded-2xl bg-gradient-to-br from-white/25 to-white/15 shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-white/20 mb-3 mx-auto">
                      <img src={opt.icon} alt={opt.label} className="w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 object-contain drop-shadow-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300 break-words leading-tight">{opt.label}</h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 mx-auto" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base xl:text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300 mb-6 leading-relaxed">
                    Deploy your bot on {opt.label} 
                  </p>

                  {/* Action button */}
                  <div className="flex justify-end">
                    <a
                      href={opt.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-800 text-white rounded-xl text-sm sm:text-base xl:text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-cyan-400/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    >
                      <span>View Docs</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <audio ref={audioRef} preload="auto">
        <source src={musicTracks[currentTrackIndex]} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

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
        .circles > div {
          animation: circles 25s linear infinite;
        }
      `}</style>
    </div>
  )
}

