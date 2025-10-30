import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Manrope, Outfit } from "next/font/google"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" })

export const metadata = {
  title: "Jogos em Cristo",
  description: "Plataforma de jogos cristãos que combinam aprendizado bíblico com diversão.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-white text-brand-text-dark antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
