"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Palette, Lamp, Layers, Sofa } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function InteriorArchitecturePage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const focusPoints = [
    {
      title: language === "ar" ? "تخطيط المساحات" : "Spatial Planning",
      description:
        language === "ar"
          ? "توزيع ذكي للمساحات يضمن سهولة الحركة وتجربة استخدام مريحة." 
          : "Smart layout planning that ensures smooth circulation and comfortable user experience.",
      icon: Layers,
    },
    {
      title: language === "ar" ? "الهوية البصرية" : "Visual Identity",
      description:
        language === "ar"
          ? "لوحات ألوان وخامات تعكس شخصية العلامة أو هوية المشروع." 
          : "Color palettes and materials that reflect the brand or project identity.",
      icon: Palette,
    },
    {
      title: language === "ar" ? "الإضاءة والجو العام" : "Lighting & Atmosphere",
      description:
        language === "ar"
          ? "حلول إضاءة متعددة الطبقات تضبط المزاج وتبرز التفاصيل." 
          : "Layered lighting solutions that set the mood and highlight details.",
      icon: Lamp,
    },
    {
      title: language === "ar" ? "الأثاث والتجهيزات" : "Furniture & Fixtures",
      description:
        language === "ar"
          ? "اختيار قطع عملية وعصرية تعزز الراحة وتدعم التصميم." 
          : "Selecting practical, contemporary pieces that elevate comfort and support the design.",
      icon: Sofa,
    },
  ]

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <section className="relative h-[360px] sm:h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/80 z-10" />
        <Image
          src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/residential/1.jpg"
          alt={language === "ar" ? "الهندسة الداخلية" : "Interior Architecture"}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-yellow-300 text-sm sm:text-base mb-3">
              {language === "ar" ? "مسار العمارة الحديثة" : "Modern Architecture Track"}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ar" ? "الهندسة الداخلية" : "Interior Architecture"}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto">
              {language === "ar"
                ? "نخلق مساحات داخلية معاصرة تعكس الراحة والهوية البصرية للمشروع." 
                : "We craft contemporary interiors that reflect comfort and the project's visual identity."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {language === "ar" ? "عناصر التصميم الداخلي الحديث" : "Key Elements of Modern Interiors"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? "ننسق بين التخطيط والخامات والإضاءة لتحقيق تجربة متكاملة." 
                : "We coordinate planning, materials, and lighting to deliver a cohesive experience."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {focusPoints.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-sm"
              >
                <item.icon className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {language === "ar" ? "تصميم يدعم تجربة المستخدم" : "Design That Supports User Experience"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === "ar"
                ? "نضمن أن كل مساحة تخدم الغرض منها وتوفر الراحة والجاذبية البصرية." 
                : "We ensure each space serves its purpose while delivering comfort and visual appeal."}
            </p>
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
              <Link href="/contact">
                {language === "ar" ? "تحدث مع فريق التصميم" : "Talk to the Design Team"}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
              </Link>
            </Button>
          </div>
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/shops/abuauf_18.jpg"
              alt={language === "ar" ? "تصميم داخلي" : "Interior Design"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
