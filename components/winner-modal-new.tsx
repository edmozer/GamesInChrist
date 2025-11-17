"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTranslation } from "@/lib/i18n/use-translation";

interface WinnerModalProps {
  winner: string;
  score: number;
  onPlayAgain: () => void;
  onReturn: () => void;
}

export function WinnerModal({ winner, score, onPlayAgain, onReturn }: WinnerModalProps) {
  const { t } = useTranslation();
  const winnerMsg = t('winnerMessage', { player: winner });
  const shareUrl = 'https://games-in-christ.vercel.app/';
  const shareText = `${winnerMsg} ${shareUrl}`;
  const shareTextEncoded = encodeURIComponent(shareText);
  const shareMsgEncoded = encodeURIComponent(winnerMsg);
  const shareUrlEncoded = encodeURIComponent(shareUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="relative bg-white rounded-lg p-6 max-w-sm w-full">
        {/* Confetti left */}
        <div className="absolute -left-24 top-1/2 -translate-y-1/2">
          <Image
            src="/images/confetti.png"
            alt="Confetti left"
            width={120}
            height={120}
            className="object-contain animate-float-left"
            priority
          />
        </div>
        {/* Confetti right */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2">
          <Image
            src="/images/confetti.png"
            alt="Confetti right"
            width={120}
            height={120}
            className="object-contain animate-float-right"
            priority
          />
        </div>
        {/* Trophy */}
        <div className="w-24 h-24 mx-auto mb-4">
          <Image src="/images/trophy.png" alt="Troféu" width={96} height={96} className="w-full h-full object-contain" />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('congratulations')}</h2>
          <p className="text-gray-600">{winnerMsg}</p>
        </div>
        <div className="space-y-3">
          <Button
            onClick={onPlayAgain}
            className="w-full bg-brand-primary-600 hover:bg-brand-primary-700"
          >
            {t('playAgain')}
          </Button>
          <Button
            onClick={onReturn}
            variant="outline"
            className="w-full border-brand-primary-200 text-brand-primary-700"
          >
            {t('mainMenu')}
          </Button>
          {/* Social Share Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${shareTextEncoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              style={{ minWidth: 64 }}
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 transition shadow">
                <Image
                  src="/images/social-media/Digital_Glyph_White.png"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                />
              </span>
              <span className="text-xs mt-1 text-green-700 font-medium">WhatsApp</span>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              style={{ minWidth: 64 }}
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition shadow">
                <Image
                  src="/images/social-media/Instagram_Glyph_White.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                />
              </span>
              <span className="text-xs mt-1 text-pink-700 font-medium">Instagram</span>
            </a>
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}&quote=${shareMsgEncoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              style={{ minWidth: 64 }}
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition shadow">
                <Image
                  src="/images/social-media/Facebook_Logo_Primary.png"
                  alt="Facebook"
                  width={28}
                  height={28}
                />
              </span>
              <span className="text-xs mt-1 text-blue-700 font-medium">Facebook</span>
            </a>
            {/* X */}
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrlEncoded}&text=${shareMsgEncoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
              style={{ minWidth: 64 }}
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black hover:bg-gray-800 transition shadow">
                <Image
                  src="/images/social-media/logo-white.png"
                  alt="X"
                  width={28}
                  height={28}
                />
              </span>
              <span className="text-xs mt-1 text-gray-800 font-medium">X</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}