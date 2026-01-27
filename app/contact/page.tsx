"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
import emailjs from "@emailjs/browser"

import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" })

  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY_DOMAINS
  const mapSrc = mapsKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=Maadi%20Cairo%20Egypt`
    : "https://www.google.com/maps?q=Maadi%20Cairo%20Egypt&output=embed"

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setFormStatus({ type: "idle" })

    const formData = new FormData(event.currentTarget)
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    }

    try {
      const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const emailJsUserId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID

      if (emailJsServiceId && emailJsTemplateId && emailJsUserId) {
        await emailjs.send(emailJsServiceId, emailJsTemplateId, payload, emailJsUserId)
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      event.currentTarget.reset()
      setFormStatus({
        type: "success",
        message: language === "ar" ? "تم استلام طلبك بنجاح. سنعود إليك خلال 24 ساعة." : "Your request was received. We will reply within 24 hours.",
      })
    } catch (error) {
      setFormStatus({
        type: "error",
        message: language === "ar" ? "تعذر إرسال الطلب حالياً. يرجى المحاولة لاحقاً." : "We could not send your request. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-deep)] dark:text-white mb-2" htmlFor="name">
                      {language === "ar" ? "الاسم الكامل" : "Full name"}
                    </label>
                    <input
                      id="name"
                      name="name"
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
                        name="email"
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
                        name="phone"
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
                      name="service"
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
                      name="message"
                      rows={4}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <Button
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-alt)] text-[var(--color-deep)] font-semibold"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? language === "ar"
                        ? "جاري الإرسال..."
                        : "Submitting..."
                      : language === "ar"
                        ? "إرسال الطلب"
                        : "Submit Request"}
                  </Button>
                  {formStatus.type !== "idle" ? (
                    <p
                      className={`text-sm ${
                        formStatus.type === "success" ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
                      }`}
                    >
                      {formStatus.message}
                    </p>
                  ) : null}
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
              src={mapSrc}
              className="w-full h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

type FormStatus = {
  type: "idle" | "success" | "error"
  message?: string
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
