"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";

interface WinnerModalProps {
  winner: string;
  score: number;
  onPlayAgain: () => void;
  onReturn: () => void;
}

export function WinnerModal({ winner, score, onPlayAgain, onReturn }: WinnerModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="relative">
        {/* Left confetti */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2">
          <div className="confetti-pulse">
            <Image
              src="/images/confetti.png"
              alt="Confetti"
              width={120}
              height={120}
              className="object-contain"
              priority
              style={{ 
                transform: 'translate3d(0,0,0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                imageRendering: 'auto'
              }}
            />
          </div>
        </div>

        {/* Right confetti */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2">
          <div className="confetti-pulse" style={{ animationDelay: '0.5s' }}>
            <Image
              src="/images/confetti.png"
              alt="Confetti"
              width={120}
              height={120}
              className="object-contain"
              priority
              style={{ 
                transform: 'translate3d(0,0,0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                imageRendering: 'auto'
              }}
            />
          </div>
        </div>

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-xl"
        >
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src="/images/trophy.png"
              alt="Trophy"
              fill
              className="object-contain"
              priority
              style={{ 
                transform: 'translate3d(0,0,0)',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>
          <h2 className="text-3xl font-bold text-brand-primary-900 mb-2">
            Parabéns!
          </h2>
          <p className="text-xl text-brand-primary-700 mb-6">
            {winner} venceu com {score} {score === 1 ? 'ponto' : 'pontos'}!
          </p>
          <div className="space-y-3">
            <Button
              onClick={onPlayAgain}
              className="w-full bg-brand-primary-600 hover:bg-brand-primary-700"
            >
              Jogar Novamente
            </Button>
            <Button
              onClick={onReturn}
              variant="outline"
              className="w-full border-brand-primary-200 text-brand-primary-700"
            >
              Voltar ao Menu
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
