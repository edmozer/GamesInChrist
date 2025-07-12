"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Brain, Users, ArrowRight, Cross, Star, BookOpen, Puzzle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function LandingPage() {
  const [showSobreModal, setShowSobreModal] = useState(false)

  return (
    <div className="min-h-screen relative isolate font-sans text-brand-text-dark">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 -z-10 bg-[url('/images/beack-bg.png')] bg-cover bg-center bg-no-repeat"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      />
      
      {/* Main Content */}
      <div className="relative flex flex-col min-h-screen backdrop-blur-[2px]">
        {/* Header */}
        <header className="sticky top-0 h-16 flex items-center border-b border-brand-primary-100/30 bg-white/60 backdrop-blur-md shadow-sm">
          <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center justify-center gap-2">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-brand-primary-50">
                <Image
                  src="/images/logo-black.png"
                  alt="Jogos em Cristo Logo"
                  width={64}
                  height={64}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-brand-primary-800 font-heading">
                Jogos em Cristo
              </span>
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                href="#jogos"
                className="text-sm font-medium text-brand-text-medium hover:text-brand-primary-700 hover:underline underline-offset-4"
              >
                Jogos
              </Link>
              <Link
                href="#sobre"
                className="text-sm font-medium text-brand-text-medium hover:text-brand-primary-700 hover:underline underline-offset-4"
              >
                Sobre
              </Link>
              <Link
                href="#contato"
                className="text-sm font-medium text-brand-text-medium hover:text-brand-primary-700 hover:underline underline-offset-4"
              >
                Contato
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Rest of your content sections */}
          {/* ... */}
        </main>

        {/* Footer */}
        <footer className="flex flex-col gap-2 sm:flex-row py-12 w-full shrink-0 px-4 md:px-6 border-t border-brand-primary-100/30 bg-white/30 backdrop-blur-md">
          <div className="container mx-auto">
            {/* Footer content */}
            {/* ... */}
          </div>
        </footer>
      </div>

      {/* Modal */}
      {showSobreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
            {/* Modal content */}
            {/* ... */}
          </div>
        </div>
      )}
    </div>
  )
}
