"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Layers, Sun, Shield, Building2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function FacadeInnovationPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const pillars = [
    {
      title: language === "ar" ? "هوية المشروع" : "Project Identity",
      description:
        language === "ar"
          ? "واجهات تُترجم رؤية العميل إلى لغة بصرية واضحة." 
          : "Facades that translate the client's vision into a clear visual language.",
      icon: Building2,
    },
    {
      title: language === "ar" ? "كفاءة حرارية" : "Thermal Performance",
      description:
        language === "ar"
          ? "معالجات تظليل وتفاصيل تحافظ على الراحة الداخلية." 
          : "Shading treatments and details that maintain interior comfort.",
      icon: Sun,
    },
    {
      title: language === "ar" ? "مواد مبتكرة" : "Innovative Materials",
      description:
        language === "ar"
          ? "اختيارات خامات حديثة تجمع بين المتانة والجمال." 
          : "Modern material selections that combine durability with elegance.",
      icon: Shield,
    },
    {
      title: language === "ar" ? "تفاصيل دقيقة" : "Refined Details",
      description:
        language === "ar"
          ? "تصميم تفاصيل إنشائية وتكسية عالية الدقة." 
          : "Designing high-precision structural and cladding details.",
      icon: Layers,
    },
  ]

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <section className="relative h-[360px] sm:h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/55 to-black/80 z-10" />
        <Image
          src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/projects/1.jpg"
          alt={language === "ar" ? "واجهات مبتكرة" : "Innovative Facades"}
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
              {language === "ar" ? "واجهات مبتكرة" : "Innovative Facades"}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto">
              {language === "ar"
                ? "نطور واجهات حديثة تدعم الأداء الحراري وتمنح المشروع حضوراً مميزاً." 
                : "We develop modern facades that enhance thermal performance and deliver a distinctive presence."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {language === "ar" ? "أسس تصميم الواجهات" : "Facade Design Pillars"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? "نوازن بين الجمال والأداء باستخدام حلول هندسية متقدمة." 
                : "We balance aesthetics and performance through advanced engineering solutions."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((item, index) => (
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
              src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/residential/1.jpg"
              alt={language === "ar" ? "تصميم واجهات" : "Facade Design"}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {language === "ar" ? "واجهة تعكس قوة العلامة" : "A Facade That Reflects Brand Strength"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === "ar"
                ? "نصمم واجهات قابلة للتنفيذ تدعم الهوية البصرية وتزيد من قيمة المشروع." 
                : "We design executable facades that reinforce visual identity and elevate project value."}
            </p>
            <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
              <Link href="/contact">
                {language === "ar" ? "ناقش واجهتك" : "Discuss Your Facade"}
                <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
