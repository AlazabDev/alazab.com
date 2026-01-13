"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, Users } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

const FEATURED_PROJECTS = [
  {
    id: 1,
    titleEn: "Luxury Residential Complex",
    titleAr: "مجمع سكني فاخر",
    descriptionEn: "Premium residential finishing with modern design and high-end materials",
    descriptionAr: "تشطيبات سكنية فاخرة بتصميم حديث ومواد عالية الجودة",
    image: "/projects/gold-walk-in-wardrobe-with-drawers-or-vista-walk-in-closet-or-lago.webp",
    category: "luxury",
    rating: 4.9,
    duration: "6 months",
    team: 12,
  },
  {
    id: 2,
    titleEn: "Modern Office Design",
    titleAr: "تصميم مكتب حديث",
    descriptionEn: "Contemporary commercial space with innovative workspace solutions",
    descriptionAr: "مساحة تجارية معاصرة مع حلول مساحات عمل مبتكرة",
    image: "/projects/home-studio-furniture-or-home-office-or-lago.webp",
    category: "commercial",
    rating: 4.8,
    duration: "4 months",
    team: 8,
  },
  {
    id: 3,
    titleEn: "Premium Kitchen & Dining",
    titleAr: "مطبخ وطعام فاخر",
    descriptionEn: "Custom-designed kitchen with marble finishes and modern appliances",
    descriptionAr: "مطبخ مصمم حسب الطلب مع نهايات رخامية وأجهزة حديثة",
    image: "/projects/marble-kitchen-with-wooden-peninsula-or-36e8-marble-xglass-kitchen-or-lago.webp",
    category: "luxury",
    rating: 4.9,
    duration: "5 months",
    team: 10,
  },
  {
    id: 4,
    titleEn: "Glass Wall Unit System",
    titleAr: "نظام وحدة الجدار الزجاجي",
    descriptionEn: "Innovative suspended glass wall system with integrated lighting",
    descriptionAr: "نظام جدار زجاجي معلق مبتكر مع إضاءة متكاملة",
    image: "/projects/glass-suspended-living-room-wall-unit-or-n.o.w.-wall-unit-or-lago.webp",
    category: "brand",
    rating: 5.0,
    duration: "3 months",
    team: 6,
  },
  {
    id: 5,
    titleEn: "TV Unit Entertainment System",
    titleAr: "نظام وحدة التلفاز الترفيهي",
    descriptionEn: "Modern black glass TV unit with storage and ambient lighting",
    descriptionAr: "وحدة تلفاز زجاج أسود حديثة مع تخزين وإضاءة محيطة",
    image: "/projects/modern-black-glass-tv-unit-or-36e8-glass-tv-unit-or-lago.webp",
    category: "luxury",
    rating: 4.8,
    duration: "2 months",
    team: 5,
  },
  {
    id: 6,
    titleEn: "Bedroom Wardrobe Collection",
    titleAr: "مجموعة الخزانة",
    descriptionEn: "Custom bedroom wardrobe with modern design and premium finishes",
    descriptionAr: "خزانة غرفة نوم مخصصة بتصميم حديث وتشطيبات فاخرة",
    image: "/projects/modern-bedroom-design-or-36e8-dresser-or-lago.webp",
    category: "residential",
    rating: 4.7,
    duration: "4 months",
    team: 7,
  },
]

export default function ProjectsPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  const categories = [
    { id: "all", label: language === "ar" ? "الكل" : "All" },
    { id: "luxury", label: language === "ar" ? "التشطيبات الفاخرة" : "Luxury Finishing" },
    { id: "brand", label: language === "ar" ? "الهوية التجارية" : "Brand Identity" },
    { id: "commercial", label: language === "ar" ? "تجاري" : "Commercial" },
    { id: "residential", label: language === "ar" ? "سكني" : "Residential" },
  ]

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
        <Image
          src="/images/project-1.png"
          alt="Construction projects"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-300 text-sm font-medium mb-6">
              {language === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {language === "ar" ? "مشاريعنا المميزة" : "Our Featured Projects"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "استكشف محفظة مشاريعنا الناجحة التي تعرض خبرتنا والتزامنا بالتميز"
                : "Explore our portfolio of successful projects that showcase our expertise and commitment to excellence"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "المشاريع الرائجة" : "Featured Projects"}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {language === "ar" ? "أحدث مشاريعنا" : "Our Latest Works"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              {language === "ar"
                ? "تصفح محفظة مشاريعنا المتنوعة المكتملة بنجاح"
                : "Browse through our diverse portfolio of successfully completed projects"}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            <AnimatePresence>
              {FEATURED_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group h-full"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-white dark:bg-gray-800">
                    {/* Image Container */}
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={language === "ar" ? project.titleAr : project.titleEn}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="bg-yellow-500 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2"
                        >
                          {language === "ar" ? "عرض التفاصيل" : "View Details"}
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find((c) => c.id === project.category)?.label}
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {project.rating}
                      </div>
                    </div>

                    {/* Content */}
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-xl sm:text-2xl group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                        {language === "ar" ? project.titleAr : project.titleEn}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {language === "ar" ? project.descriptionAr : project.descriptionEn}
                      </CardDescription>
                    </CardHeader>

                    {/* Project Details */}
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">
                            {project.duration}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {language === "ar" ? "المدة" : "Duration"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">{project.team}</div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                            <Users className="h-3 w-3" />
                            {language === "ar" ? "فريق" : "Team"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">{project.rating}</div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                            <Star className="h-3 w-3" />
                            {language === "ar" ? "تقييم" : "Rating"}
                          </p>
                        </div>
                      </div>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter>
                      <Link href={`/projects/${project.id}`} className="w-full">
                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-all duration-300">
                          {language === "ar" ? "عرض المشروع" : "View Project"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <Link href="/gallery">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {language === "ar" ? "معرض كامل" : "View Full Gallery"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
