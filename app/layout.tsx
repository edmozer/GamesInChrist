import type React from "react"
import type { Metadata } from "next"
import { Outfit, Manrope } from "next/font/google" // Importar Outfit e Manrope
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit", // Variável para títulos
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope", // Variável para corpo de texto
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jogos Cristãos",
  description: "Jogos que edificam e divertem para toda a família cristã.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  )
}
