"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { MobileMenu } from "@/components/mobile-menu"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const { t, language } = useLanguage()

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)

    // Add scroll event listener
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction
      if (currentScrollY > lastScrollY + 5) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY - 5) {
        setScrollDirection("up")
      }

      // Update scroll state
      if (currentScrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      // Always show navbar at the top of the page
      if (currentScrollY < 50) {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Close mobile menu on route change
    const handleRouteChange = () => {
      setMobileMenuOpen(false)
    }

    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [lastScrollY])

  // Toggle mobile menu with useCallback to ensure consistent behavior
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prevState) => !prevState)
  }, [])

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  // Navbar animation variants
  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 100,
        damping: 20,
        duration: prefersReducedMotion ? 0.1 : undefined,
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 100,
        damping: 20,
        duration: prefersReducedMotion ? 0.1 : undefined,
      },
    },
  }

  // Determine if navbar should be visible
  const shouldShowNavbar = scrollDirection === "up" || !scrolled || lastScrollY < 50

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 w-full backdrop-blur-sm transition-all duration-300 ${
          scrolled ? "bg-background/95 shadow-md" : "bg-background/80"
        } safe-top`}
        initial="visible"
        animate={shouldShowNavbar ? "visible" : "hidden"}
        variants={navVariants}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 max-w-[1920px]">
          <div
            className={`flex h-16 sm:h-18 md:h-20 lg:h-24 items-center justify-between ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className="flex items-center">
              <Link href="/" className="flex items-center group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative"
                >
                  <Image
                    src={mounted && theme === "dark" ? "https://al-azab.co/w.png" : "https://al-azab.co/b.png"}
                    alt="Alazab Construction Company Logo"
                    width={96}
                    height={96}
                    className="h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation - Fixed RTL/LTR layout */}
            <nav className="hidden md:flex items-center justify-center">
              <ul className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}>
                <NavItem
                  href="/"
                  label={t("nav.home")}
                  isActive={pathname === "/"}
                  onHover={() => setHoveredItem("home")}
                  onLeave={() => setHoveredItem(null)}
                  isHovered={hoveredItem === "home"}
                />

                <NavItem
                  href="/about"
                  label={t("nav.about")}
                  isActive={pathname === "/about"}
                  onHover={() => setHoveredItem("about")}
                  onLeave={() => setHoveredItem(null)}
                  isHovered={hoveredItem === "about"}
                />

                <NavItem
                  href="/services"
                  label={t("nav.services")}
                  isActive={pathname === "/services"}
                  onHover={() => setHoveredItem("services")}
                  onLeave={() => setHoveredItem(null)}
                  isHovered={hoveredItem === "services"}
                />

                <NavItem
                  href="/projects"
                  label={t("nav.projects")}
                  isActive={pathname === "/projects"}
                  onHover={() => setHoveredItem("projects")}
                  onLeave={() => setHoveredItem(null)}
                  isHovered={hoveredItem === "projects"}
                />

                <NavItem
                  href="/clients"
                  label={t("nav.clients")}
                  isActive={pathname === "/clients"}
                  onHover={() => setHoveredItem("clients")}
                  onLeave={() => setHoveredItem(null)}
                  isHovered={hoveredItem === "clients"}
                />

                <NavItem
                  href="/contact"
                  label={t("nav.contact")}
                  isActive={pathname === "/contact"}
                  onHover={() => setHoveredItem("contact")}
                  onLeave={() => setHoveredItem(null)}
                  isHovered={hoveredItem === "contact"}
                />
              </ul>
            </nav>

            {/* Desktop Right Side - Fixed RTL/LTR layout */}
            <div
              className={`hidden md:flex items-center gap-2 lg:gap-4 ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
            >
              <LanguageToggle />

              <Link href="/contact#quote-form">
                <AnimatedButton
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] active:bg-[#d9a718] text-[var(--color-deep)] dark:text-[var(--color-deep)] font-medium text-sm sm:text-base h-9 sm:h-10 transition-all duration-300 shadow-md hover:shadow-lg"
                  hoverEffect="lift"
                  iconAnimation={true}
                >
                  {t("nav.getQuote")}
                  <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 ${language === "ar" ? "mr-1" : "ml-1"}`} />
                </AnimatedButton>
              </Link>

              {/* Theme toggle button */}
              {mounted && (
                <motion.div
                  whileHover={{ rotate: 15 }}
                  whileTap={{ scale: 0.9, rotate: 30 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="bg-gray-100 dark:bg-gray-800 p-1.5 sm:p-2 rounded-full"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle theme"
                    className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                    type="button"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme}
                        initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                      >
                        {theme === "dark" ? (
                          <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
                        ) : (
                          <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-700 dark:text-gray-300" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button - Fixed RTL/LTR layout */}
            <div
              className={`flex items-center gap-1.5 sm:gap-2 md:hidden ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}
            >
              <LanguageToggle />

              {/* Mobile theme toggle */}
              {mounted && (
                <motion.div
                  whileHover={{ rotate: 15 }}
                  whileTap={{ scale: 0.9, rotate: 30 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle theme"
                    className="h-8 w-8 sm:h-9 sm:w-9"
                    type="button"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme}
                        initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                      >
                        {theme === "dark" ? (
                          <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                        ) : (
                          <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </motion.div>
              )}

              {/* Hamburger Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9 bg-amber-50 dark:bg-amber-900/20"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
                type="button"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Now using a separate component for better isolation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  )
}

// Desktop Nav Item
function NavItem({
  href,
  label,
  isActive,
  onHover,
  onLeave,
  isHovered,
}: {
  href: string
  label: string
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  isHovered: boolean
}) {
  return (
    <li>
      <Link
        href={href}
        className={`relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${
          isActive
            ? "text-[var(--color-primary)]"
            : "text-foreground hover:text-[var(--color-primary)] hover:bg-[color:rgba(245,191,35,0.12)] dark:hover:bg-[color:rgba(245,191,35,0.08)]"
        }`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <motion.span
          animate={isHovered && !isActive ? { y: -2, color: "#f5bf23" } : { y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="inline-block"
        >
          {label}
        </motion.span>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
            layoutId="navbar-underline"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    </li>
  )
}
