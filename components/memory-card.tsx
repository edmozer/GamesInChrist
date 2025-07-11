"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type React from "react"

interface MemoryCardProps {
  id: string
  content: string | React.ReactNode
  isFlipped: boolean
  isMatched: boolean
  onClick: (id: string) => void
}

export function MemoryCard({ id, content, isFlipped, isMatched, onClick }: MemoryCardProps) {
  return (
    <motion.div
      className="relative aspect-square w-full cursor-pointer perspective-1000"
      onClick={() => !isFlipped && !isMatched && onClick(id)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      animate={{ opacity: isMatched ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Verso da Carta (Imagem do verso - back-min.jpg) - Sempre visível quando não virada */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/images/back-min.jpg"
            alt="Verso da carta"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Frente da Carta (Imagem a ser revelada) - Visível apenas quando virada */}
        <div
          className="absolute w-full h-full rounded-lg overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {typeof content === "string" && content.startsWith("/images/") ? (
            <Image
              src={content}
              alt="Carta do jogo da memória"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary-100/60 backdrop-blur-md border border-brand-secondary-600 text-brand-text-dark text-2xl font-bold">
              {content}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
