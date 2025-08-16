"use client"

import { motion } from "framer-motion"
import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar")
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium px-3 py-2 rounded-lg transition-all duration-200"
        aria-label={`Switch to ${language === "ar" ? "English" : "Arabic"}`}
      >
        <Languages className="h-4 w-4" />
        <span className="text-sm font-semibold">{language === "ar" ? "EN" : "عر"}</span>
      </Button>
    </motion.div>
  )
}
