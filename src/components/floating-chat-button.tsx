'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FloatingChatButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/chat">
      <motion.button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-amber-300 hover:border-amber-400 z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -2 : 0,
        }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Chat with Reze</span>
      </motion.button>
    </Link>
  )
}