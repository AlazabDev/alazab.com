"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { useLanguage } from "@/contexts/language-context"
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data/projects"

export default function ProjectsPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const categories = [
    { id: "all", label: language === "ar" ? "الكل" : "All" },
    ...PROJECT_CATEGORIES.map((category) => ({
      id: category.id,
      label: language === "ar" ? category.labelAr : category.labelEn,
    })),
  ]

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <PageHero
        title={language === "ar" ? "مشاريع العزب" : "Alazab Projects"}
        subtitle={
          language === "ar"
            ? "نقدم مشاريع متكاملة تعكس خبرتنا في التصميم والتنفيذ وإدارة الجودة." 
            : "We deliver integrated projects reflecting our expertise in design, execution, and quality management."
        }
        badge={language === "ar" ? "معرض المشاريع" : "Project Portfolio"}
        image="/images/project-2.png"
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "مجموعة مختارة" : "Curated Selection"}
            title={language === "ar" ? "مشاريع منفذة بمعايير عالية" : "Delivered with High Standards"}
            description={
              language === "ar"
                ? "تغطي أعمالنا التصميم المعماري، التصميم الداخلي، إدارة المشاريع، والصيانة والتشغيل." 
                : "Our work spans architectural design, interior design, project management, and maintenance operations."
            }
          />

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full border border-[color:rgba(245,191,35,0.35)] px-4 py-2 text-sm text-[var(--color-deep)] dark:text-white"
              >
                {category.label}
              </span>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-60 overflow-hidden rounded-t-2xl">
                  <Image
                    src={project.heroImage}
                    alt={language === "ar" ? project.titleAr : project.titleEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className="absolute top-4 right-4 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-[var(--color-deep)]">
                    {categories.find((category) => category.id === project.category)?.label}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-deep)] dark:text-white">
                      {language === "ar" ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="text-sm text-[var(--color-dark)] dark:text-gray-300 mt-2">
                      {language === "ar" ? project.descriptionAr : project.descriptionEn}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-dark)] dark:text-gray-300">
                    <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                    <span>{language === "ar" ? project.locationAr : project.locationEn}</span>
                  </div>
                  <Link href={`/projects/${project.id}`} className="mt-auto">
                    <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] text-[var(--color-deep)] font-semibold">
                      {language === "ar" ? "عرض التفاصيل" : "View Details"}
                      <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
