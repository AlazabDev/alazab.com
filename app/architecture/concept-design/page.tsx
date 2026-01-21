"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Compass, Lightbulb, Layers, Map } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ConceptDesignPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const deliverables = [
    {
      title: language === "ar" ? "تحليل الموقع" : "Site Analysis",
      description:
        language === "ar"
          ? "دراسة الاتجاهات، الحركة، والقيود التنظيمية لتأسيس رؤية دقيقة." 
          : "Study orientation, circulation, and regulatory constraints to build an accurate vision.",
      icon: Map,
    },
    {
      title: language === "ar" ? "رؤية تصميمية" : "Design Vision",
      description:
        language === "ar"
          ? "مخططات أولية تُظهر الفكرة المعمارية ومحاور الحركة الرئيسية." 
          : "Initial layouts that define the architectural idea and primary circulation axes.",
      icon: Compass,
    },
    {
      title: language === "ar" ? "سرد بصري" : "Visual Narrative",
      description:
        language === "ar"
          ? "لوحات إلهام وخامات مقترحة تعكس شخصية المشروع." 
          : "Mood boards and material palettes that express the project's character.",
      icon: Lightbulb,
    },
    {
      title: language === "ar" ? "نماذج كتلية" : "Massing Models",
      description:
        language === "ar"
          ? "نماذج كتلية ثلاثية الأبعاد لاختبار العلاقات بين الكتل والفراغات." 
          : "3D massing models to test relationships between volumes and spaces.",
      icon: Layers,
    },
  ]

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <section className="relative h-[360px] sm:h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/80 z-10" />
        <Image
          src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/construction/1.jpg"
          alt={language === "ar" ? "التصميم المفاهيمي" : "Concept Design"}
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
              {language === "ar" ? "التصميم المفاهيمي" : "Concept Design"}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto">
              {language === "ar"
                ? "نصوغ رؤية معمارية قابلة للتنفيذ تجمع بين الإبداع والجدوى الفنية." 
                : "We craft an executable architectural vision that balances creativity with technical feasibility."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {language === "ar" ? "ما نقدمه في مرحلة المفهوم" : "What We Deliver in the Concept Phase"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? "نركز على بناء الأساس الذي يوجه التصميم التفصيلي لاحقاً." 
                : "We focus on building the foundation that guides detailed design later on."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {deliverables.map((item, index) => (
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
              src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/projects/1.jpg"
              alt={language === "ar" ? "رؤية تصميمية" : "Design Vision"}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {language === "ar" ? "خطوة أولى نحو تصميم متكامل" : "The First Step Toward an Integrated Design"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === "ar"
                ? "نساعدك على اتخاذ قرارات مبكرة مدروسة تقلل المخاطر وتسرّع مرحلة التنفيذ." 
                : "We help you make informed early decisions that reduce risk and accelerate execution."}
            </p>
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
              <Link href="/contact">
                {language === "ar" ? "ابدأ جلسة استشارية" : "Start a Consultation"}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
