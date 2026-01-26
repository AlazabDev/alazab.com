"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useLanguage } from "@/contexts/language-context"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) onClose()
    }

    window.addEventListener("popstate", handleRouteChange)
    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [isOpen, onClose])

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: language === "ar" ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: language === "ar" ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed top-0 ${language === "ar" ? "left-0" : "right-0"} bottom-0 w-[85vw] sm:w-[350px] bg-background border-${language === "ar" ? "r" : "l"} border-amber-200 dark:border-amber-800 z-50 md:hidden overflow-y-auto`}
          >
            <div className="flex flex-col h-full p-4 sm:p-6">
              <div
                className={`flex items-center justify-between border-b py-3 sm:py-4 ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                  <Image
                    src="https://al-azab.co/logo/logo-b.png"
                    alt="Alazab Construction Company"
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain"
                  />
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    className="flex flex-col"
                  >
                    <span className="text-base sm:text-lg font-bold">Alazab Construction</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      {language === "ar" ? "هندسة وتنفيذ بمعايير عالية" : "Engineering & Execution Excellence"}
                    </span>
                  </motion.div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 sm:h-9 sm:w-9 bg-amber-50 dark:bg-amber-900/20"
                  type="button"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              <nav className="flex flex-col gap-4 sm:gap-6 py-6 sm:py-8">
                <MobileNavItem
                  href="/"
                  label={t("nav.home")}
                  isActive={pathname === "/"}
                  onClick={onClose}
                  delay={0.1}
                />

                <MobileNavItem
                  href="/services"
                  label={t("nav.services")}
                  isActive={pathname === "/services"}
                  onClick={onClose}
                  delay={0.2}
                />

                <MobileNavItem
                  href="/projects"
                  label={t("nav.projects")}
                  isActive={pathname === "/projects"}
                  onClick={onClose}
                  delay={0.3}
                />

                <MobileNavItem
                  href="/about"
                  label={t("nav.about")}
                  isActive={pathname === "/about"}
                  onClick={onClose}
                  delay={0.35}
                />

                <MobileNavItem
                  href="/clients"
                  label={t("nav.clients")}
                  isActive={pathname === "/clients"}
                  onClick={onClose}
                  delay={0.4}
                />

                <MobileNavItem
                  href="/contact"
                  label={t("nav.contact")}
                  isActive={pathname === "/contact"}
                  onClick={onClose}
                  delay={0.45}
                />
              </nav>

              <motion.div
                className="mt-auto border-t py-4 sm:py-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.7,
                  mass: 0.8,
                }}
              >
                <Link href="/contact#quote-form" onClick={onClose}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <AnimatedButton
                      className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] text-[var(--color-deep)] font-medium text-sm sm:text-base transition-all duration-300 py-5 sm:py-6"
                      hoverEffect="shine"
                      iconAnimation={true}
                    >
                      {t("nav.getQuote")}
                      <ChevronRight className={`h-3 w-3 sm:h-4 sm:w-4 ${language === "ar" ? "mr-1" : "ml-1"}`} />
                    </AnimatedButton>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Mobile Nav Item
function MobileNavItem({
  href,
  label,
  isActive,
  onClick,
  delay = 0,
}: {
  href: string
  label: string
  isActive: boolean
  onClick: () => void
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: delay,
        mass: 0.8,
      }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(245, 191, 35, 0.08)" }}
      className="overflow-hidden rounded-lg"
    >
      <Link
        href={href}
        className={`text-base sm:text-lg font-medium block text-center py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 ${
          isActive ? "text-[var(--color-primary)] bg-[color:rgba(245,191,35,0.12)]" : ""
        }`}
        onClick={onClick}
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="inline-block"
        >
          {label}
        </motion.span>
      </Link>
    </motion.div>
  )
}
