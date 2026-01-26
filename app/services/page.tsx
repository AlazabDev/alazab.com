"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, DraftingCompass, Home, ClipboardCheck, Wrench, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { CtaBanner } from "@/components/sections/cta-banner"
import { useLanguage } from "@/contexts/language-context"

export default function ServicesPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <PageHero
        title={language === "ar" ? "خدمات العزب" : "Alazab Services"}
        subtitle={
          language === "ar"
            ? "خدمات متكاملة في التصميم المعماري والتصميم الداخلي وإدارة المشاريع والصيانة التشغيلية." 
            : "Integrated services in architectural design, interior design, project management, and maintenance operations."
        }
        badge={language === "ar" ? "حلول متكاملة" : "Integrated Solutions"}
        image="/images/services-hero.png"
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "الخدمات الرئيسية" : "Core Services"}
            title={language === "ar" ? "نغطي دورة المشروع كاملة" : "Covering the Full Project Lifecycle"}
            description={
              language === "ar"
                ? "نصمم، نخطط، ننفذ، ثم ندير التشغيل لضمان استدامة الأداء وجودة الاستثمار." 
                : "We design, plan, execute, and manage operations to sustain performance and investment quality."
            }
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-[color:rgba(245,191,35,0.2)] bg-white dark:bg-gray-800 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-[color:rgba(245,191,35,0.2)] flex items-center justify-center">
                    <service.icon className="h-6 w-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-deep)] dark:text-white">
                    {language === "ar" ? service.titleAr : service.titleEn}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[var(--color-dark)] dark:text-gray-300 mb-4">
                  {language === "ar" ? service.descriptionAr : service.descriptionEn}
                </p>
                <ul className="space-y-2 text-sm text-[var(--color-dark)] dark:text-gray-300">
                  {(language === "ar" ? service.pointsAr : service.pointsEn).map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[var(--color-primary)] mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[color:rgba(245,191,35,0.08)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "منهجية العمل" : "Delivery Process"}
            title={language === "ar" ? "خطوات واضحة وشفافة" : "Clear, Transparent Steps"}
            description={
              language === "ar"
                ? "نتبع منهجية دقيقة تضمن وضوح الرؤية منذ الاستشارة وحتى التسليم." 
                : "We follow a structured methodology that ensures clarity from consultation to handover."
            }
          />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.key} className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                <span className="text-2xl font-bold text-[var(--color-primary)]">{step.number}</span>
                <h3 className="mt-4 text-lg font-semibold text-[var(--color-deep)] dark:text-white">
                  {language === "ar" ? step.titleAr : step.titleEn}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-dark)] dark:text-gray-300">
                  {language === "ar" ? step.descriptionAr : step.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/quality.png" alt="Quality control" fill className="object-cover" />
            </div>
            <div>
              <SectionHeader
                align="start"
                eyebrow={language === "ar" ? "الالتزام بالجودة" : "Quality Commitment"}
                title={language === "ar" ? "إدارة تنفيذ دقيقة" : "Precision Execution Management"}
                description={
                  language === "ar"
                    ? "نطبق أنظمة جودة ورقابة هندسية لضمان أعلى معايير الأداء في كل مشروع." 
                    : "We apply quality systems and engineering supervision to ensure top performance in every project."
                }
              />
              <div className="mt-6 space-y-3 text-sm sm:text-base text-[var(--color-dark)] dark:text-gray-300">
                <p>
                  {language === "ar"
                    ? "نجهز تقارير متابعة أسبوعية، وخطط مخاطر، وجدول زمني مفصل يسهل مشاركة كل المستجدات مع العميل." 
                    : "We provide weekly progress reports, risk plans, and detailed schedules to keep clients informed."}
                </p>
                <p>
                  {language === "ar"
                    ? "فريقنا يشرف ميدانياً على مقاولي الباطن لضمان الالتزام بالمواصفات والاشتراطات الفنية." 
                    : "Our team supervises subcontractors on-site to ensure compliance with specifications and technical requirements."}
                </p>
              </div>
              <Link href="/contact" className="inline-block mt-6">
                <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] text-[var(--color-deep)] font-semibold">
                  {language === "ar" ? "اطلب استشارة" : "Request Consultation"}
                  <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={language === "ar" ? "هل تحتاج خطة تنفيذ مخصصة؟" : "Need a Customized Execution Plan?"}
        description={
          language === "ar"
            ? "تواصل معنا للحصول على نطاق عمل واضح، ميزانية دقيقة، وجدول زمني تفصيلي." 
            : "Contact us to receive a clear scope, accurate budget, and detailed timeline."
        }
        primaryLabel={language === "ar" ? "ابدأ الآن" : "Start Now"}
        primaryHref="/contact"
        secondaryLabel={language === "ar" ? "مشاريعنا" : "Our Projects"}
        secondaryHref="/projects"
      />
    </div>
  )
}

const SERVICES = [
  {
    key: "architectural",
    icon: DraftingCompass,
    titleAr: "التصميم المعماري",
    titleEn: "Architectural Design",
    descriptionAr: "حلول تصميم معماري دقيقة توازن بين الجمال والوظيفة ومتطلبات التنفيذ.",
    descriptionEn: "Architectural design solutions that balance aesthetics, functionality, and execution needs.",
    pointsAr: ["تصميم مخططات تنفيذية", "دراسات واجهات متكاملة", "تحليل احتياجات الموقع"],
    pointsEn: ["Execution-ready drawings", "Integrated façade studies", "Site requirement analysis"],
  },
  {
    key: "interior",
    icon: Home,
    titleAr: "التصميم الداخلي",
    titleEn: "Interior Design",
    descriptionAr: "تصاميم داخلية تعكس هوية العميل مع اختيار خامات عملية وفاخرة.",
    descriptionEn: "Interior designs that reflect client identity with practical, premium material selection.",
    pointsAr: ["مخططات توزيع الفراغات", "تصميم الإضاءة والمواد", "إشراف على التنفيذ"],
    pointsEn: ["Space planning", "Lighting and material design", "Execution supervision"],
  },
  {
    key: "management",
    icon: ClipboardCheck,
    titleAr: "إدارة المشاريع",
    titleEn: "Project Management",
    descriptionAr: "إدارة شاملة للوقت والميزانية والمخاطر لضمان نجاح المشروع.",
    descriptionEn: "Comprehensive management of time, budget, and risks to ensure project success.",
    pointsAr: ["خطط زمنية دقيقة", "تقييم المخاطر والتكلفة", "تقارير تقدم دورية"],
    pointsEn: ["Detailed timelines", "Risk and cost assessment", "Regular progress reports"],
  },
  {
    key: "maintenance",
    icon: Wrench,
    titleAr: "الصيانة وإدارة المرافق",
    titleEn: "Maintenance & Facilities",
    descriptionAr: "خطط تشغيل وصيانة تضمن استمرارية الأداء واستدامة الأصول.",
    descriptionEn: "Operations and maintenance plans that ensure asset performance and sustainability.",
    pointsAr: ["صيانة وقائية مخططة", "تقارير متابعة التشغيل", "استجابة طارئة خلال 24 ساعة"],
    pointsEn: ["Planned preventive maintenance", "Operational follow-up reports", "24-hour emergency response"],
  },
]

const PROCESS_STEPS = [
  {
    key: "discovery",
    number: "01",
    titleAr: "الاستشارة والتحليل",
    titleEn: "Consultation & Analysis",
    descriptionAr: "اجتماع تفصيلي لفهم المتطلبات ووضع نطاق العمل.",
    descriptionEn: "A detailed meeting to understand requirements and define scope.",
  },
  {
    key: "planning",
    number: "02",
    titleAr: "التخطيط والتصميم",
    titleEn: "Planning & Design",
    descriptionAr: "إعداد المخططات التنفيذية وخطة العمل التفصيلية.",
    descriptionEn: "Preparing execution drawings and a detailed work plan.",
  },
  {
    key: "execution",
    number: "03",
    titleAr: "التنفيذ والإشراف",
    titleEn: "Execution & Supervision",
    descriptionAr: "إدارة فرق العمل وضبط الجودة في كل مرحلة.",
    descriptionEn: "Managing teams and quality control at every stage.",
  },
  {
    key: "handover",
    number: "04",
    titleAr: "التسليم والتشغيل",
    titleEn: "Handover & Operation",
    descriptionAr: "تسليم المشروع مع خطط التشغيل والصيانة المطلوبة.",
    descriptionEn: "Project handover with required operation and maintenance plans.",
  },
]
