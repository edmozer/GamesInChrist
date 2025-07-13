import { LanguageProvider } from "@/context/LanguageContext";
import type React from "react"
import type { Metadata } from "next"
import { Red_Hat_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"], // incluindo weights mais finos para um visual mais clean
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
    <html lang="pt-BR" className={redHat.variable}>
      <body>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
