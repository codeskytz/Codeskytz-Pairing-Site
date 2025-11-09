"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SessionButton from "../components/SessionButton"
import QuoteDisplay from "../components/QuoteDisplay"

const sessionLinks = [
  { label: "SESSION-1", href: "https://session.codeskytz.site" }, // Add actual link here to enable redirect
  { label: "SESSION-2", href: "https://session1.codeskytz.site" }, // Add actual link here to enable redirect
  { label: "SESSION-3", href: "https://session2.codeskytz.site" }, // Add actual link here to enable redirect
  { label: "SESSION-4", href: "https://session3.codeskytz.site" }, // Add actual link here to enable redirect
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
  "https://cdn.pixabay.com/audio/2023/09/04/audio_84af5b3b29.mp3",
  "https://cdn.pixabay.com/audio/2022/08/23/audio_d1718ab41b.mp3",
]

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

export default function Page() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
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
            CodeskyTz-MD 
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
