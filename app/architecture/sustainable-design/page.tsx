"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf, Sun, Droplets, Recycle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function SustainableDesignPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const strategies = [
    {
      title: language === "ar" ? "توجيه المبنى" : "Building Orientation",
      description:
        language === "ar"
          ? "توجيه الكتل للاستفادة من الإضاءة الطبيعية وتقليل الأحمال الحرارية." 
          : "Orienting volumes to maximize daylight and minimize thermal loads.",
      icon: Sun,
    },
    {
      title: language === "ar" ? "إدارة المياه" : "Water Management",
      description:
        language === "ar"
          ? "حلول حصاد مياه الأمطار وإعادة الاستخدام للمساحات الخضراء." 
          : "Rainwater harvesting and reuse strategies for landscape areas.",
      icon: Droplets,
    },
    {
      title: language === "ar" ? "مواد مسؤولة" : "Responsible Materials",
      description:
        language === "ar"
          ? "اختيار خامات منخفضة الانبعاثات وعالية الكفاءة." 
          : "Selecting low-emission, high-performance materials.",
      icon: Recycle,
    },
    {
      title: language === "ar" ? "كفاءة الطاقة" : "Energy Efficiency",
      description:
        language === "ar"
          ? "تكامل أنظمة العزل والطاقة المتجددة لخفض الاستهلاك." 
          : "Integrating insulation and renewable energy systems to reduce consumption.",
      icon: Leaf,
    },
  ]

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <section className="relative h-[360px] sm:h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/80 z-10" />
        <Image
          src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/projects/1.jpg"
          alt={language === "ar" ? "التصميم المستدام" : "Sustainable Design"}
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
              {language === "ar" ? "التصميم المستدام" : "Sustainable Design"}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto">
              {language === "ar"
                ? "حلول تصميم تقلل البصمة البيئية وتحافظ على كفاءة التشغيل." 
                : "Design solutions that reduce environmental impact and improve operational efficiency."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {language === "ar" ? "استراتيجيات الاستدامة" : "Sustainability Strategies"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? "نطبق حلولاً عملية تحقق التوازن بين البيئة والتكلفة." 
                : "We apply practical solutions that balance environment and cost."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {strategies.map((item, index) => (
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
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/construction/1.jpg"
              alt={language === "ar" ? "استدامة" : "Sustainability"}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {language === "ar" ? "مشاريع مسؤولة للمستقبل" : "Responsible Projects for the Future"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === "ar"
                ? "نساعدك على تحقيق معايير الاستدامة المطلوبة مع الحفاظ على جودة التصميم." 
                : "We help you meet sustainability standards while maintaining design quality."}
            </p>
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
              <Link href="/contact">
                {language === "ar" ? "احصل على خطة مستدامة" : "Get a Sustainable Plan"}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
