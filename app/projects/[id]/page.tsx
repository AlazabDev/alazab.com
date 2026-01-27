"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Ruler } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { CtaBanner } from "@/components/sections/cta-banner"
import { useLanguage } from "@/contexts/language-context"
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data/projects"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { language } = useLanguage()
  const project = PROJECTS.find((item) => item.id === params.id)
  const isRTL = language === "ar"

  if (!project) {
    notFound()
  }

  const categoryLabel = PROJECT_CATEGORIES.find((category) => category.id === project.category)
  const title = language === "ar" ? project.titleAr : project.titleEn
  const description = language === "ar" ? project.descriptionAr : project.descriptionEn
  const highlights = language === "ar" ? project.highlightsAr : project.highlightsEn

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${isRTL ? "rtl" : "ltr"}`}>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src={project.heroImage} alt={title} fill className="object-cover" priority sizes="100vw" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-white/90 hover:text-white mb-6"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
            {language === "ar" ? "العودة إلى المشاريع" : "Back to projects"}
          </Link>
          <span className="inline-flex items-center rounded-full bg-[color:rgba(245,191,35,0.2)] px-4 py-2 text-xs sm:text-sm text-white mb-4">
            {language === "ar" ? categoryLabel?.labelAr : categoryLabel?.labelEn}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-base sm:text-lg text-white/90 max-w-3xl">{description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-deep)] dark:text-white mb-4">
                  {language === "ar" ? "نظرة عامة على المشروع" : "Project Overview"}
                </h2>
                <p className="text-sm sm:text-base text-[var(--color-dark)] dark:text-gray-300 leading-relaxed">
                  {description}
                </p>
              </motion.div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[var(--color-deep)] dark:text-white mb-4">
                  {language === "ar" ? "أبرز الإنجازات" : "Highlights"}
                </h3>
                <ul className="space-y-3">
                  {highlights.map((item) => (
                    <li key={item} className="text-sm sm:text-base text-[var(--color-dark)] dark:text-gray-300">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-[color:rgba(245,191,35,0.2)] bg-white dark:bg-gray-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--color-deep)] dark:text-white mb-4">
                {language === "ar" ? "بيانات المشروع" : "Project Details"}
              </h3>
              <div className="space-y-4 text-sm text-[var(--color-dark)] dark:text-gray-300">
                <div className="flex items-center justify-between">
                  <span>{language === "ar" ? "العميل" : "Client"}</span>
                  <span className="font-semibold text-[var(--color-deep)] dark:text-white">
                    {language === "ar" ? project.clientAr : project.clientEn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === "ar" ? "الموقع" : "Location"}</span>
                  <span className="font-semibold text-[var(--color-deep)] dark:text-white">
                    {language === "ar" ? project.locationAr : project.locationEn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === "ar" ? "المساحة" : "Area"}</span>
                  <span className="font-semibold text-[var(--color-deep)] dark:text-white">
                    {language === "ar" ? project.area : project.areaEn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === "ar" ? "المدة" : "Duration"}</span>
                  <span className="font-semibold text-[var(--color-deep)] dark:text-white">
                    {language === "ar" ? project.duration : project.durationEn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{language === "ar" ? "الميزانية" : "Budget"}</span>
                  <span className="font-semibold text-[var(--color-deep)] dark:text-white">
                    {language === "ar" ? project.budgetAr : project.budgetEn}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-xl bg-[color:rgba(245,191,35,0.14)] p-3">
                  <MapPin className="h-4 w-4 mx-auto text-[var(--color-primary)]" />
                  <span className="block mt-2">
                    {language === "ar" ? project.locationAr : project.locationEn}
                  </span>
                </div>
                <div className="rounded-xl bg-[color:rgba(245,191,35,0.14)] p-3">
                  <Users className="h-4 w-4 mx-auto text-[var(--color-primary)]" />
                  <span className="block mt-2">{project.teamSize} {language === "ar" ? "عضو" : "Team"}</span>
                </div>
                <div className="rounded-xl bg-[color:rgba(245,191,35,0.14)] p-3">
                  <Ruler className="h-4 w-4 mx-auto text-[var(--color-primary)]" />
                  <span className="block mt-2">{language === "ar" ? project.area : project.areaEn}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] text-[var(--color-deep)]">
                  {language === "ar" ? "اطلب مشروعاً مشابهاً" : "Request a Similar Project"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[color:rgba(245,191,35,0.08)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--color-deep)] dark:text-white mb-10">
            {language === "ar" ? "معرض صور المشروع" : "Project Gallery"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((image) => (
              <div key={image} className="relative h-60 rounded-2xl overflow-hidden">
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={language === "ar" ? "جاهزون لتنفيذ مشروعكم القادم" : "Ready for Your Next Project"}
        description={
          language === "ar"
            ? "دع فريق العزب يقود مشروعك من التصميم إلى التسليم بأعلى معايير الجودة." 
            : "Let Alazab's team lead your project from design to delivery with the highest quality standards."
        }
        primaryLabel={language === "ar" ? "تواصل معنا" : "Contact Us"}
        primaryHref="/contact"
        secondaryLabel={language === "ar" ? "خدماتنا" : "Our Services"}
        secondaryHref="/services"
      />
    </div>
  )
}
