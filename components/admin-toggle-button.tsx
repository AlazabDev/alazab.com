"use client"
import { motion } from "framer-motion"
import { Settings } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface AdminToggleButtonProps {
  onClick: () => void
}

export function AdminToggleButton({ onClick }: AdminToggleButtonProps) {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed top-20 ${isRTL ? "right-4" : "left-4"} z-[50] bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20`}
      title={language === "ar" ? "النظام الإداري" : "Admin Panel"}
    >
      <Settings className="w-5 h-5" />
    </motion.button>
  )
}
