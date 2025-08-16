"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminToggleButton } from "@/components/admin-toggle-button"
import { Montserrat, Poppins, Cairo } from "next/font/google"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SmartChatbot } from "@/components/smart-chatbot"

import "@/app/globals.css"

// Initialize the fonts with display swap for better performance
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false)

  return (
    <html lang="ar" className={`${montserrat.variable} ${poppins.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body className={`${cairo.className} antialiased`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <AdminToggleButton onClick={() => setIsAdminSidebarOpen(true)} />
              <AdminSidebar isOpen={isAdminSidebarOpen} onClose={() => setIsAdminSidebarOpen(false)} />
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
              <ScrollToTop />
              <SmartChatbot />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
