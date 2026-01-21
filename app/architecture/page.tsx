"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Compass, Leaf, Layers, MapPin, Palette, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ArchitectureOverviewPage() {
  const { language, t } = useLanguage()
  const isRTL = language === "ar"

  const focusAreas = [
    {
      key: "concept",
      title: t("nav.architecture.concept"),
      description:
        language === "ar"
          ? "نحوّل الأفكار إلى رؤية تصميمية واضحة مدعومة بدراسة الموقع والاحتياجات التشغيلية."
          : "We translate ideas into a clear design vision backed by site analysis and operational needs.",
      icon: Compass,
      href: "/architecture/concept-design",
    },
    {
      key: "interiors",
      title: t("nav.architecture.interiors"),
      description:
        language === "ar"
          ? "تناغم بين الجمال والوظائف اليومية مع حلول إضاءة وخامات متوازنة."
          : "A balance between beauty and daily functionality with smart lighting and material palettes.",
      icon: Palette,
      href: "/architecture/interior-architecture",
    },
    {
      key: "sustainable",
      title: t("nav.architecture.sustainable"),
      description:
        language === "ar"
          ? "تصميمات تقلل استهلاك الطاقة وتدعم المواد الصديقة للبيئة."
          : "Designs that reduce energy use while prioritizing environmentally responsible materials.",
      icon: Leaf,
      href: "/architecture/sustainable-design",
    },
    {
      key: "facades",
      title: t("nav.architecture.facades"),
      description:
        language === "ar"
          ? "واجهات معاصرة تضيف هوية للمشروع وتدعم الراحة الحرارية."
          : "Contemporary facades that strengthen brand identity while improving thermal comfort.",
      icon: Layers,
      href: "/architecture/facade-innovation",
    },
    {
      key: "urban",
      title: t("nav.architecture.urban"),
      description:
        language === "ar"
          ? "مخططات حضرية تربط المشروع بالسياق المجتمعي وشبكات الحركة."
          : "Urban plans that connect the project to community context and mobility networks.",
      icon: MapPin,
      href: "/architecture/urban-planning",
    },
  ]

  const highlights = [
    {
      title: language === "ar" ? "تحليل الموقع" : "Site Analysis",
      description:
        language === "ar"
          ? "نبدأ بتحليل المناخ، الحركة، والكتل المجاورة لضمان حلول واقعية." 
          : "We start with climate, circulation, and context studies to ensure realistic solutions.",
    },
    {
      title: language === "ar" ? "محاكاة ثلاثية الأبعاد" : "3D Visualization",
      description:
        language === "ar"
          ? "نماذج ثلاثية الأبعاد تساعدك على تصور المشروع قبل التنفيذ."
          : "3D models help you visualize the project before execution.",
    },
    {
      title: language === "ar" ? "تكامل مع التنفيذ" : "Execution Alignment",
      description:
        language === "ar"
          ? "نربط التصميم بخطط التنفيذ لضمان جودة وتسليم في الوقت المحدد."
          : "We align design with execution plans to ensure quality and on-time delivery.",
    },
  ]

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <section className="relative h-[380px] sm:h-[440px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 z-10" />
        <Image
          src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/projects/1.jpg"
          alt={language === "ar" ? "العمارة الحديثة" : "Modern Architecture"}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-xs sm:text-sm mb-4">
              <Sparkles className="h-4 w-4" />
              <span>{t("nav.architecture")}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ar" ? "مساحات معمارية حديثة برؤية متكاملة" : "Modern Architecture with an Integrated Vision"}
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-3xl mx-auto">
              {language === "ar"
                ? "تعرّف على صفحاتنا المتخصصة التي تبرز توجهات العمارة الحديثة، من الفكرة إلى واجهة المشروع." 
                : "Explore specialized pages that showcase modern architecture, from concept to project facade."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {language === "ar" ? "مسارات العمارة الحديثة" : "Modern Architecture Tracks"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? "اختر المسار المناسب لمشروعك من خلال صفحات متخصصة ومحتوى تفصيلي." 
                : "Choose the right track for your project through dedicated pages and detailed content."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <area.icon className="h-8 w-8 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{area.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{area.description}</p>
                <Link href={area.href} className="inline-flex items-center text-yellow-600 font-semibold">
                  {language === "ar" ? "استعرض التفاصيل" : "View Details"}
                  <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {language === "ar" ? "كيف ندعم رؤيتك الحديثة" : "How We Support Your Modern Vision"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {language === "ar"
                ? "نعتمد على أدوات تحليلية وإبداعية لضمان أن كل قرار تصميمي يخدم هدف المشروع وتجربة المستخدم." 
                : "We rely on analytical and creative tools to ensure every design decision serves project goals and user experience."}
            </p>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item.title} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-80 lg:h-full rounded-2xl overflow-hidden">
            <Image
              src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/residential/1.jpg"
              alt={language === "ar" ? "رؤية معمارية" : "Architectural Vision"}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "ar" ? "جاهزون لمشروع معماري جديد؟" : "Ready for a New Architectural Project?"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {language === "ar"
              ? "تواصل معنا للحصول على استشارة متخصصة وخطة تصميم تلائم احتياجاتك." 
              : "Contact us for a specialized consultation and a design plan tailored to your needs."}
          </p>
          <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
            <Link href="/contact">
              {language === "ar" ? "احجز استشارة" : "Book a Consultation"}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
