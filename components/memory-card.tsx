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
  // Função para gerar um número aleatório entre -1 e 1
  const randomRotation = () => (Math.random() > 0.5 ? 1 : -1)

  return (
    <motion.div
      className="relative aspect-square w-full cursor-pointer perspective-1000"
      onClick={() => !isFlipped && !isMatched && onClick(id)}
      whileHover={{ 
        scale: 1.05, 
        rotate: randomRotation() * 1.5, // Rotação aleatória entre -1.5 e 1.5 graus
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      style={{
        pointerEvents: isMatched ? 'none' : 'auto',
        opacity: isMatched ? '0.8' : '1'
      }}
    >
      <motion.div
        className="relative w-full h-full shadow-lg rounded-xl"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Verso da Carta (Imagem do verso - back-min.jpg) */}
        <div
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-2 border-white/50"
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
            sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
            className="transition-transform duration-200"
          />
        </div>

        {/* Frente da Carta (Imagem a ser revelada) */}
        <div
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] border-2 border-white/50"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src={content as string}
            alt="Carta"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
            className="transition-transform duration-200"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
