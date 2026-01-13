"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ChevronRight,
  Eye,
  Lightbulb,
  HardHat,
  Hammer,
  Compass,
  Target,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Award,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedButton } from "@/components/ui/animated-button"
import { HoverButton } from "@/components/ui/hover-button"
import { FadeIn } from "@/components/animations/fade-in"
import { ScaleIn } from "@/components/animations/scale-in"
import { HoverCard } from "@/components/animations/hover-card"
import { CountUp } from "@/components/animations/count-up"
import { ScrollProgress } from "@/components/animations/scroll-progress"
import { EnhancedContactSection } from "@/components/enhanced-contact-section"
import { useLanguage } from "@/contexts/language-context"

export default function HomePageClient() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <ScrollProgress />

      {/* Enhanced Hero Section with RTL/LTR Support */}
      <section className="relative w-full overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/modern-construction-site.png"
            alt={`${t("hero.badge")} - موقع بناء حديث`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
        </motion.div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70 z-10" />

        {/* Floating Decorative Elements - RTL/LTR Responsive */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <motion.div
            className={`absolute top-16 sm:top-20 ${isRTL ? "right-4 sm:right-10" : "left-4 sm:left-10"} text-yellow-300/20`}
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
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
          </motion.div>

          <motion.div
            className={`absolute top-32 sm:top-40 ${isRTL ? "left-4 sm:left-20" : "right-4 sm:right-20"} text-yellow-300/15`}
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
            <Sparkles className="h-4 w-4 sm:h-6 sm:w-6" />
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-5xl mx-auto text-center"
            >
              {/* Enhanced Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-md text-white rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{t("hero.badge")}</span>
              </motion.div>

              {/* Enhanced Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
              >
                {t("hero.title")}
              </motion.h1>

              {/* Enhanced Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 mb-3 sm:mb-4 leading-relaxed"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
              >
                {t("hero.subtitle")}
              </motion.h2>

              {/* Enhanced Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-6 sm:mb-8 md:mb-10"
              >
                <p
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl md:max-w-4xl mx-auto leading-relaxed"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                >
                  {t("hero.description")}
                </p>
              </motion.div>

              {/* Enhanced Action Buttons - RTL/LTR Support */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto ${isRTL ? "sm:flex-row-reverse" : ""}`}
              >
                <Link href="/services" className="w-full sm:w-auto">
                  <AnimatedButton
                    size="lg"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
                    hoverEffect="lift"
                    iconAnimation={true}
                  >
                    {t("hero.services")}
                    <ChevronRight className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                  </AnimatedButton>
                </Link>

                <Link href="/projects" className="w-full sm:w-auto">
                  <HoverButton
                    size="lg"
                    variant="outline"
                    className="text-white border-2 border-white/60 hover:bg-white/20 hover:border-white hover:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                    hoverEffect="glow"
                    rippleColor="rgba(255, 255, 255, 0.3)"
                  >
                    {t("hero.projects")}
                    <ChevronRight className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
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
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Contact Info Bar - RTL/LTR Support */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-3 sm:py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 md:gap-8 text-white text-center sm:text-left ${isRTL ? "sm:flex-row-reverse" : ""}`}
          >
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">+201004006620</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">info@al-azab.co</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            >
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">8/500st Maadi, Cairo, Egypt</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced About Us Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-5xl mx-auto">
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                {t("about.badge")}
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-white leading-tight">
                {t("about.title")}
              </h2>

              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-gray-200 leading-relaxed">
                {t("about.subtitle")}
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("about.description1")}
                </p>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("about.description2")}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Enhanced Stats Grid - RTL/LTR Support */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center max-w-6xl mx-auto mb-8 sm:mb-12 md:mb-16 ${isRTL ? "lg:grid-flow-col-dense" : ""}`}
          >
            {[
              { end: 10, key: "experience", icon: Clock },
              { end: 364, key: "projects", icon: CheckCircle },
              { end: 127, key: "clients", icon: Users },
              { end: 98, key: "workers", icon: Award },
            ].map((stat, index) => (
              <FadeIn key={stat.key} direction="up" delay={0.1 * (index + 1)}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>

                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-600 mb-1 sm:mb-2">
                    <CountUp end={stat.end} suffix="+" />
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm md:text-base">
                    {t(`stats.${stat.key}`)}
                  </p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section - RTL/LTR Support */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-4xl mx-auto">
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-400 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                {t("services.badge")}
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 dark:text-white leading-tight">
                {t("services.title")}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("services.subtitle")}
              </p>
            </div>
          </FadeIn>

          {/* Enhanced Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {[
              { icon: HardHat, key: "building" },
              { icon: Hammer, key: "renovation" },
              { icon: Compass, key: "design" },
              { icon: Target, key: "materials" },
              { icon: Lightbulb, key: "consulting" },
              { icon: Eye, key: "interior" },
            ].map((service, index) => (
              <HoverCard key={service.key}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group h-full"
                >
                  <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                    {/* Enhanced Icon Container */}
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="relative bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:shadow-lg"
                    >
                      <service.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-600 dark:text-yellow-400" />

                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-yellow-400/20 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>

                    {/* Enhanced Content */}
                    <div className="text-center space-y-2 sm:space-y-3 flex-grow flex flex-col justify-center">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                        {t(`services.${service.key}`)}
                      </h3>

                      <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                        {t(`services.${service.key}.desc`)}
                      </p>
                    </div>

                    {/* Enhanced Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-600/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </motion.div>
              </HoverCard>
            ))}
          </div>

          {/* Enhanced View All Button */}
          <ScaleIn delay={0.6}>
            <div className="mt-8 sm:mt-12 text-center">
              <Link href="/services">
                <AnimatedButton
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                  hoverEffect="shine"
                  iconRotate={true}
                >
                  {t("services.viewAll")}
                  <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </AnimatedButton>
              </Link>
            </div>
          </ScaleIn>
        </div>
      </section>

      <EnhancedContactSection />

      {/* Enhanced CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl relative z-10">
          <FadeIn>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{t("cta.title")}</h2>

              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 leading-relaxed">
                {t("cta.subtitle")}
              </h3>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl md:max-w-4xl mx-auto leading-relaxed">
                {t("cta.description")}
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto ${isRTL ? "sm:flex-row-reverse" : ""}`}
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <HoverButton
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
                  hoverEffect="ripple"
                >
                  {t("cta.freeQuote")}
                  <ChevronRight className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </HoverButton>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <AnimatedButton
                  size="lg"
                  variant="outline"
                  className="text-white border-2 border-white/60 hover:bg-white/10 hover:border-white hover:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                  hoverEffect="pulse"
                  iconAnimation={true}
                >
                  {t("cta.contactTeam")}
                  <ChevronRight className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </AnimatedButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
