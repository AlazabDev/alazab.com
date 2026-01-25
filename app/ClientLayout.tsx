"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex-grow"
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
