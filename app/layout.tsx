import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechSpecs - Hardware Database",
  description: "Comprehensive database of processors, GPUs, motherboards and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1e2942] min-h-screen`}>
        <Navbar />
        <main className="container mx-auto px-4 py-4">{children}</main>
      </body>
    </html>
  )
}


import './globals.css'