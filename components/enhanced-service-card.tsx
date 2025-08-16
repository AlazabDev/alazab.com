"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface EnhancedServiceCardProps {
  icon: LucideIcon
  title: string
  titleEn: string
  description: string
  delay?: number
}

export function EnhancedServiceCard({ icon: Icon, title, titleEn, description, delay = 0 }: EnhancedServiceCardProps) {
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="card-enhanced p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full">
        {/* Enhanced Icon Container */}
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg"
        >
          <Icon className="h-8 w-8 md:h-10 md:w-10 text-amber-600 dark:text-amber-400" />

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Enhanced Content */}
        <div className="text-center space-y-3">
          <h3
            className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 ${language === "ar" ? "font-cairo" : "font-montserrat"}`}
          >
            {title}
          </h3>

          <h4
            className={`text-sm font-semibold text-gray-700 dark:text-gray-300 ${language === "ar" ? "font-cairo" : "font-poppins"}`}
          >
            {titleEn}
          </h4>

          <p
            className={`text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed ${language === "ar" ? "font-cairo" : "font-poppins"}`}
          >
            {description}
          </p>
        </div>

        {/* Enhanced Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )
}
