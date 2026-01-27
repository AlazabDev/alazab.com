"use client"

import { Quote } from "lucide-react"

import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { CtaBanner } from "@/components/sections/cta-banner"
import { useLanguage } from "@/contexts/language-context"

export default function ClientsPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <PageHero
        title={language === "ar" ? "عملاؤنا" : "Our Clients"}
        subtitle={
          language === "ar"
            ? "شراكات طويلة الأمد مع جهات حكومية وتجارية وسكنية." 
            : "Long-term partnerships with governmental, commercial, and residential clients."
        }
        badge={language === "ar" ? "الثقة أولاً" : "Trust First"}
        image="/construction-site-overview.png"
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "شركاء النجاح" : "Success Partners"}
            title={language === "ar" ? "جهات وثقت بالعزب" : "Organizations That Trust Alazab"}
            description={
              language === "ar"
                ? "نعمل مع مطورين ومؤسسات وشركات تشغيل تعتمد على التزامنا بالجودة والتسليم في الوقت المحدد." 
                : "We collaborate with developers, institutions, and operators who rely on our quality and on-time delivery."
            }
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.nameEn}
                className="rounded-2xl border border-[color:rgba(245,191,35,0.2)] bg-white dark:bg-gray-800 px-4 py-6 text-center shadow-sm"
              >
                <div className="text-lg font-bold text-[var(--color-deep)] dark:text-white">
                  {language === "ar" ? client.nameAr : client.nameEn}
                </div>
                <div className="mt-2 text-xs text-[var(--color-dark)] dark:text-gray-400">
                  {language === "ar" ? client.categoryAr : client.categoryEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[color:rgba(245,191,35,0.08)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "تجارب العملاء" : "Client Stories"}
            title={language === "ar" ? "شهادات من شركائنا" : "Testimonials From Partners"}
            description={
              language === "ar"
                ? "آراء صادقة من عملائنا حول تجربة العمل مع فريق العزب." 
                : "Real feedback from clients about working with Alazab's team."
            }
          />
          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <div key={item.nameEn} className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm">
                <Quote className="h-8 w-8 text-[var(--color-primary)]" />
                <p className="mt-4 text-sm text-[var(--color-dark)] dark:text-gray-300">
                  {language === "ar" ? item.quoteAr : item.quoteEn}
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-[var(--color-deep)] dark:text-white">
                    {language === "ar" ? item.nameAr : item.nameEn}
                  </p>
                  <p className="text-xs text-[var(--color-dark)] dark:text-gray-400">
                    {language === "ar" ? item.roleAr : item.roleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={language === "ar" ? "لنبدأ شراكة جديدة" : "Let’s Start a New Partnership"}
        description={
          language === "ar"
            ? "شاركنا تفاصيل مشروعك وسنضع خطة تنفيذ مخصصة تحقق أهدافك." 
            : "Share your project details and we will craft a tailored execution plan to meet your goals."
        }
        primaryLabel={language === "ar" ? "تواصل معنا" : "Contact Us"}
        primaryHref="/contact"
        secondaryLabel={language === "ar" ? "مشاريعنا" : "Our Projects"}
        secondaryHref="/projects"
      />
    </div>
  )
}

const CLIENT_LOGOS = [
  {
    nameAr: "مجموعة النخبة العقارية",
    nameEn: "Elite Real Estate Group",
    categoryAr: "تطوير عقاري",
    categoryEn: "Real Estate Development",
  },
  {
    nameAr: "شركة الخليج المالية",
    nameEn: "Gulf Financial",
    categoryAr: "مقار إدارية",
    categoryEn: "Corporate Offices",
  },
  {
    nameAr: "مجموعة الروضة للضيافة",
    nameEn: "Al Rawda Hospitality",
    categoryAr: "الضيافة والفنادق",
    categoryEn: "Hospitality",
  },
  {
    nameAr: "مستشفيات العناية",
    nameEn: "Care Hospitals",
    categoryAr: "الرعاية الصحية",
    categoryEn: "Healthcare",
  },
  {
    nameAr: "مطار القاهرة الدولي",
    nameEn: "Cairo International Airport",
    categoryAr: "مشروعات تشغيلية",
    categoryEn: "Operational Facilities",
  },
  {
    nameAr: "شركة السلم للتجارة",
    nameEn: "Al Salam Trading",
    categoryAr: "مشروعات تجارية",
    categoryEn: "Commercial Projects",
  },
  {
    nameAr: "مركز البيان التعليمي",
    nameEn: "Al Bayan Education Center",
    categoryAr: "المؤسسات التعليمية",
    categoryEn: "Education",
  },
  {
    nameAr: "مجموعة المدار السكنية",
    nameEn: "Al Madar Residential",
    categoryAr: "مجمعات سكنية",
    categoryEn: "Residential Compounds",
  },
]

const TESTIMONIALS = [
  {
    nameAr: "أ. سامح زكي",
    nameEn: "Sameh Zaki",
    roleAr: "مدير التطوير - مجموعة النخبة",
    roleEn: "Development Director - Elite Group",
    quoteAr:
      "التزام العزب بالمواعيد والمتابعة الدقيقة جعلت تسليم المشروع أكثر سلاسة من المتوقع.",
    quoteEn:
      "Alazab's commitment to timelines and meticulous follow-up made the handover smoother than expected.",
  },
  {
    nameAr: "م. منى الدسوقي",
    nameEn: "Mona El-Desouky",
    roleAr: "مديرة التشغيل - الروضة للضيافة",
    roleEn: "Operations Manager - Al Rawda Hospitality",
    quoteAr:
      "تم تنفيذ التصميم الداخلي بجودة عالية مع مراعاة تفاصيل التشغيل اليومي للفندق.",
    quoteEn:
      "The interior design was delivered with premium quality while addressing daily hotel operations.",
  },
  {
    nameAr: "أ. عادل قاسم",
    nameEn: "Adel Qassem",
    roleAr: "مدير المنشآت - الخليج المالية",
    roleEn: "Facilities Manager - Gulf Financial",
    quoteAr:
      "فريق إدارة المشاريع قدم تقارير واضحة وساعدنا على اتخاذ قرارات سريعة طوال التنفيذ.",
    quoteEn:
      "The project management team provided clear reporting that helped us make fast decisions throughout execution.",
  },
]
