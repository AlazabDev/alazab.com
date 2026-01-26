"use client"

import Image from "next/image"
import Link from "next/link"
import { Award, Target, Eye, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { CtaBanner } from "@/components/sections/cta-banner"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <PageHero
        title={language === "ar" ? "من نحن" : "About Alazab"}
        subtitle={
          language === "ar"
            ? "شركة مقاولات وإدارة تنفيذ متخصصة في التصميم المعماري والتشطيبات وإدارة المشاريع منذ أكثر من 15 عاماً." 
            : "A construction and execution management company specializing in architectural design, finishing, and project delivery for over 15 years."
        }
        badge={language === "ar" ? "شركة العزب للإنشاءات" : "Alazab Construction Company"}
        image="/images/about-team.png"
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "تعريف الشركة" : "Company Overview"}
            title={language === "ar" ? "نصنع فرقاً في الجودة والتنفيذ" : "Delivering Quality Through Execution"}
            description={
              language === "ar"
                ? "نقدم حلولاً متكاملة من الفكرة وحتى التسليم، مع التزام صارم بالجودة والجداول الزمنية ومعايير السلامة." 
                : "We deliver end-to-end solutions from concept to handover with strict adherence to quality, schedules, and safety standards."
            }
          />

          <div className="mt-12 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-sm sm:text-base text-[var(--color-dark)] dark:text-gray-300">
              <p>
                {language === "ar"
                  ? "تركز شركة العزب على تنفيذ المشاريع المعمارية والتجارية والسكنية بأعلى مستويات الاحتراف، مع فريق هندسي يتابع التفاصيل من التصميم وحتى التشغيل." 
                  : "Alazab focuses on delivering architectural, commercial, and residential projects with a professional engineering team overseeing every detail from design to operation."}
              </p>
              <p>
                {language === "ar"
                  ? "نمزج بين التخطيط الدقيق، إدارة المخاطر، واختيار الخامات بعناية لضمان تسليم مشاريع تدوم وتلبي تطلعات العملاء." 
                  : "We blend meticulous planning, risk management, and curated material selection to ensure projects are durable and aligned with client expectations."}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {STAT_ITEMS.map((item) => (
                  <div key={item.key} className="rounded-xl border border-[color:rgba(245,191,35,0.2)] p-4">
                    <p className="text-2xl font-bold text-[var(--color-primary)]">
                      {language === "ar" ? item.valueAr : item.valueEn}
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--color-dark)] dark:text-gray-300">
                      {language === "ar" ? item.labelAr : item.labelEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/about-story.png" alt="Alazab construction leadership" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[color:rgba(245,191,35,0.08)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "الرؤية والرسالة" : "Vision & Mission"}
            title={language === "ar" ? "نقود التحول في قطاع الإنشاءات" : "Leading Transformation in Construction"}
            description={
              language === "ar"
                ? "رؤيتنا ورسالتنا مستندة إلى الابتكار والجودة والشراكة طويلة الأمد." 
                : "Our vision and mission are rooted in innovation, quality, and long-term partnerships."
            }
          />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {MISSION_VISION.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm border border-[color:rgba(245,191,35,0.2)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-[color:rgba(245,191,35,0.2)] flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-deep)] dark:text-white">
                    {language === "ar" ? item.titleAr : item.titleEn}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[var(--color-dark)] dark:text-gray-300">
                  {language === "ar" ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "الإدارة التنفيذية" : "Leadership"}
            title={language === "ar" ? "فريق يقود بدقة" : "Leadership with Precision"}
            description={
              language === "ar"
                ? "فريق متخصص يجمع بين الخبرة الميدانية والإدارة الحديثة لضمان نجاح المشروع." 
                : "A specialized team combining field expertise and modern management to ensure project success."
            }
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEADERSHIP.map((member) => (
              <div key={member.nameEn} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                <div className="relative h-56 w-full rounded-xl overflow-hidden mb-4">
                  <Image src={member.image} alt={member.nameEn} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-deep)] dark:text-white">
                  {language === "ar" ? member.nameAr : member.nameEn}
                </h3>
                <p className="text-sm text-[var(--color-primary)] font-semibold mt-1">
                  {language === "ar" ? member.roleAr : member.roleEn}
                </p>
                <p className="text-xs sm:text-sm text-[var(--color-dark)] dark:text-gray-300 mt-3">
                  {language === "ar" ? member.bioAr : member.bioEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-deep)] text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {language === "ar" ? "جاهزون لبناء مشروعك القادم" : "Ready to Build Your Next Project"}
          </h2>
          <p className="text-sm sm:text-base text-white/80 mb-8">
            {language === "ar"
              ? "تواصل معنا للحصول على خطة تنفيذ واضحة وميزانية دقيقة وجدول زمني قابل للقياس." 
              : "Contact us for a clear execution plan, accurate budgeting, and measurable timelines."}
          </p>
          <Link href="/contact">
            <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] text-[var(--color-deep)] font-semibold px-6">
              {language === "ar" ? "تواصل الآن" : "Get in touch"}
            </Button>
          </Link>
        </div>
      </section>

      <CtaBanner
        title={language === "ar" ? "نصنع الجودة مع شركائنا" : "Building Quality with Our Partners"}
        description={
          language === "ar"
            ? "نعمل مع شبكة واسعة من الموردين والاستشاريين لضمان أفضل الحلول لكل مشروع." 
            : "We work with a wide network of suppliers and consultants to deliver the best solutions for each project."
        }
        primaryLabel={language === "ar" ? "شاهد خدماتنا" : "View Services"}
        primaryHref="/services"
        secondaryLabel={language === "ar" ? "مشاريعنا" : "Our Projects"}
        secondaryHref="/projects"
      />
    </div>
  )
}

const STAT_ITEMS = [
  {
    key: "experience",
    valueAr: "15+ سنة",
    valueEn: "15+ Years",
    labelAr: "خبرة في إدارة وتنفيذ المشاريع",
    labelEn: "Experience in project delivery",
  },
  {
    key: "projects",
    valueAr: "210+ مشروع",
    valueEn: "210+ Projects",
    labelAr: "تم تسليمها بنجاح",
    labelEn: "Delivered successfully",
  },
  {
    key: "team",
    valueAr: "60+ مهندس",
    valueEn: "60+ Engineers",
    labelAr: "فريق هندسي متخصص",
    labelEn: "Dedicated engineering team",
  },
  {
    key: "partners",
    valueAr: "45+ شريك",
    valueEn: "45+ Partners",
    labelAr: "موردون واستشاريون",
    labelEn: "Suppliers and consultants",
  },
]

const MISSION_VISION = [
  {
    key: "mission",
    icon: Target,
    titleAr: "رسالتنا",
    titleEn: "Our Mission",
    descriptionAr:
      "تنفيذ مشاريع معمارية متكاملة تعزز القيمة الاستثمارية لعملائنا من خلال الجودة، السلامة، والالتزام بالتوقيتات.",
    descriptionEn:
      "Deliver integrated architectural projects that enhance client investment value through quality, safety, and on-time execution.",
  },
  {
    key: "vision",
    icon: Eye,
    titleAr: "رؤيتنا",
    titleEn: "Our Vision",
    descriptionAr:
      "أن نكون الشريك الأول في إدارة وتنفيذ المشاريع المعمارية في مصر والمنطقة عبر حلول مبتكرة ومستدامة.",
    descriptionEn:
      "To be the leading partner in architectural project delivery across Egypt and the region through innovative, sustainable solutions.",
  },
  {
    key: "quality",
    icon: Award,
    titleAr: "معيار الجودة",
    titleEn: "Quality Standard",
    descriptionAr:
      "نعتمد معايير تدقيق جودة صارمة ونوثق كل مرحلة لضمان أفضل النتائج لعملائنا.",
    descriptionEn:
      "We apply strict quality auditing standards and document every phase to guarantee the best results for clients.",
  },
  {
    key: "compliance",
    icon: ShieldCheck,
    titleAr: "السلامة والامتثال",
    titleEn: "Safety & Compliance",
    descriptionAr:
      "نطبق خطط سلامة ميدانية وإجراءات امتثال تضمن بيئة عمل آمنة ومستدامة.",
    descriptionEn:
      "We enforce site safety plans and compliance procedures to ensure a safe and sustainable work environment.",
  },
]

const LEADERSHIP = [
  {
    nameAr: "م. محمد العزب",
    nameEn: "Mohamed Alazab",
    roleAr: "الرئيس التنفيذي",
    roleEn: "Chief Executive Officer",
    bioAr: "يشرف على استراتيجية الشركة وتطوير الأعمال مع خبرة تزيد عن 20 عاماً في إدارة المشاريع الكبرى.",
    bioEn: "Oversees company strategy and business development with 20+ years in major project delivery.",
    image: "/team/mo-azab-ceo.png",
  },
  {
    nameAr: "م. أحمد سالم",
    nameEn: "Ahmed Salem",
    roleAr: "مدير المشاريع",
    roleEn: "Projects Director",
    bioAr: "يقود فرق التنفيذ ويضمن الالتزام بالجداول الزمنية والجودة في جميع المواقع.",
    bioEn: "Leads execution teams and ensures schedule and quality compliance across all sites.",
    image: "/team/eng-ahmed.png",
  },
  {
    nameAr: "م. فاطمة يوسف",
    nameEn: "Fatma Youssef",
    roleAr: "مديرة التصميم الداخلي",
    roleEn: "Head of Interior Design",
    bioAr: "تركز على تطوير مفاهيم تصميم تعكس هوية العميل وتحقق أعلى درجات الراحة.",
    bioEn: "Develops design concepts that reflect client identity and deliver premium comfort.",
    image: "/team/hr-fatma.jpg",
  },
]
