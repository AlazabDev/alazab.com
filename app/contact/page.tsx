"use client"

import { Mail, MapPin, Phone, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <PageHero
        title={language === "ar" ? "تواصل معنا" : "Contact Us"}
        subtitle={
          language === "ar"
            ? "فريق العزب جاهز للاستماع لمتطلباتك وتقديم أفضل الحلول التنفيذية." 
            : "Alazab team is ready to listen to your requirements and deliver the best execution solutions."
        }
        badge={language === "ar" ? "استشارة مجانية" : "Free Consultation"}
        image="/images/contact-hero.png"
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12">
            <div>
              <SectionHeader
                align="start"
                eyebrow={language === "ar" ? "بيانات الشركة" : "Company Details"}
                title={language === "ar" ? "نرحب بتواصلكم" : "We Would Love to Hear From You"}
                description={
                  language === "ar"
                    ? "سواء كنت تبحث عن شريك تنفيذ أو استشارة هندسية، نحن هنا لخدمتك." 
                    : "Whether you need an execution partner or engineering consultation, we are here to help."
                }
              />

              <div className="mt-8 space-y-6 text-sm sm:text-base text-[var(--color-dark)] dark:text-gray-300">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.key} className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[color:rgba(245,191,35,0.2)] flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-deep)] dark:text-white">
                        {language === "ar" ? item.labelAr : item.labelEn}
                      </p>
                      <p>{language === "ar" ? item.valueAr : item.valueEn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="quote-form" className="scroll-mt-24">
              <div className="rounded-2xl border border-[color:rgba(245,191,35,0.2)] bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-deep)] dark:text-white mb-2">
                  {language === "ar" ? "طلب عرض سعر" : "Request a Quote"}
                </h3>
                <p className="text-sm text-[var(--color-dark)] dark:text-gray-300 mb-6">
                  {language === "ar"
                    ? "أرسل تفاصيل مشروعك وسنتواصل معك خلال 24 ساعة عمل." 
                    : "Send your project details and we will get back to you within 24 business hours."}
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-deep)] dark:text-white mb-2" htmlFor="name">
                      {language === "ar" ? "الاسم الكامل" : "Full name"}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-deep)] dark:text-white mb-2" htmlFor="email">
                        {language === "ar" ? "البريد الإلكتروني" : "Email"}
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-deep)] dark:text-white mb-2" htmlFor="phone">
                        {language === "ar" ? "رقم الهاتف" : "Phone"}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-deep)] dark:text-white mb-2" htmlFor="service">
                      {language === "ar" ? "نوع الخدمة" : "Service type"}
                    </label>
                    <select
                      id="service"
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    >
                      {(language === "ar" ? SERVICE_OPTIONS_AR : SERVICE_OPTIONS_EN).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-deep)] dark:text-white mb-2" htmlFor="message">
                      {language === "ar" ? "تفاصيل المشروع" : "Project details"}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <Button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] text-[var(--color-deep)] font-semibold">
                    {language === "ar" ? "إرسال الطلب" : "Submit Request"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-[color:rgba(245,191,35,0.08)]">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-[color:rgba(245,191,35,0.2)]">
            <iframe
              title="Alazab location"
              src="https://www.google.com/maps?q=Maadi%20Cairo%20Egypt&output=embed"
              className="w-full h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

const CONTACT_ITEMS = [
  {
    key: "location",
    icon: MapPin,
    labelAr: "الموقع",
    labelEn: "Location",
    valueAr: "شارع المعادي 500/8، القاهرة، مصر",
    valueEn: "8/500 Maadi Street, Cairo, Egypt",
  },
  {
    key: "phone",
    icon: Phone,
    labelAr: "الهاتف",
    labelEn: "Phone",
    valueAr: "+20 100 400 6620",
    valueEn: "+20 100 400 6620",
  },
  {
    key: "email",
    icon: Mail,
    labelAr: "البريد الإلكتروني",
    labelEn: "Email",
    valueAr: "info@al-azab.co",
    valueEn: "info@al-azab.co",
  },
  {
    key: "hours",
    icon: Clock,
    labelAr: "ساعات العمل",
    labelEn: "Working hours",
    valueAr: "السبت - الخميس: 9 صباحاً - 6 مساءً",
    valueEn: "Saturday - Thursday: 9:00 AM - 6:00 PM",
  },
]

const SERVICE_OPTIONS_AR = [
  "التصميم المعماري",
  "التصميم الداخلي",
  "إدارة المشاريع",
  "الصيانة وإدارة المرافق",
]

const SERVICE_OPTIONS_EN = [
  "Architectural Design",
  "Interior Design",
  "Project Management",
  "Maintenance & Facilities",
]
