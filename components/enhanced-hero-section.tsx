"use client"

import { motion } from "framer-motion"
import { ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AnimatedButton } from "@/components/ui/animated-button"
import { HoverButton } from "@/components/ui/hover-button"
import { useLanguage } from "@/contexts/language-context"

export function EnhancedHeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative w-full overflow-hidden h-[600px] md:h-[700px] lg:h-[800px]">
      {/* Enhanced Background with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/hero-1.png"
          alt={`${t("hero.badge")} - موقع بناء`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero z-10" />

      {/* Floating Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-amber-300/30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-8 w-8" />
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 text-amber-300/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-1/4 text-amber-300/25"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
      </div>

      {/* Enhanced Hero Content */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Enhanced Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium mb-6 border border-white/30 hover-glow"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Enhanced Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-shadow-lg ${language === "ar" ? "font-cairo" : "font-montserrat"}`}
            >
              <span className="inline-block">
                {t("hero.title")
                  .split(" ")
                  .map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
              </span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 mb-4 text-shadow ${language === "ar" ? "font-cairo" : "font-montserrat"}`}
            >
              {t("hero.subtitle")}
            </motion.h2>

            {/* Enhanced Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className={`text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-xl md:max-w-3xl mx-auto text-shadow ${language === "ar" ? "font-cairo" : "font-poppins"}`}
            >
              {t("hero.description")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className={`text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto text-shadow ${language === "ar" ? "font-cairo" : "font-poppins"}`}
            >
              {t("hero.description.en")}
            </motion.p>

            {/* Enhanced Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/services" className="w-full sm:w-auto">
                <AnimatedButton
                  size="lg"
                  className="btn-enhanced bg-[#ffb900] hover:bg-[#e6a500] active:bg-[#cc8f00] text-blue-900 dark:text-blue-800 font-semibold px-8 py-4 w-full sm:w-auto shadow-lg"
                  hoverEffect="lift"
                  iconAnimation={true}
                >
                  {t("hero.services")}
                  <ChevronRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                </AnimatedButton>
              </Link>

              <Link href="/projects" className="w-full sm:w-auto">
                <HoverButton
                  size="lg"
                  variant="outline"
                  className="btn-enhanced text-white border-2 border-white/50 hover:bg-white/20 hover:text-white font-semibold px-8 py-4 w-full sm:w-auto backdrop-blur-sm shadow-lg"
                  hoverEffect="glow"
                  rippleColor="rgba(255, 255, 255, 0.3)"
                >
                  {t("hero.projects")}
                  <ChevronRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                </HoverButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
