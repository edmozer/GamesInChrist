"use client"

import { motion, AnimatePresence } from "framer-motion"

interface CustomToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function CustomToast({ message, isVisible, onClose }: CustomToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-white/90 backdrop-blur-md border-2 border-green-500 rounded-xl p-6 shadow-lg min-w-[200px]">
            <div className="text-2xl font-bold text-center text-brand-primary-900">
              {message}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
