import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Manrope, Outfit } from "next/font/google"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" })

export const metadata = {
  title: "Jogos em Cristo",
  description: "Plataforma de jogos cristãos que combinam aprendizado bíblico com diversão.",
}

import { LanguageProvider } from "@/lib/i18n/language-context"
import LanguageSelector from "@/components/language-selector"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${outfit.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicons/android-chrome-512x512.png" />
      </head>
      <body className="min-h-screen bg-white text-brand-text-dark antialiased">
        <LanguageProvider>
          <div className="relative">
            {children}
            <div className="fixed top-4 right-4 z-50">
              <LanguageSelector />
            </div>
          </div>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
