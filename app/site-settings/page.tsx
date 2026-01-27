"use client"

import { PageHero } from "@/components/sections/page-hero"
import { SectionHeader } from "@/components/sections/section-header"
import { useLanguage } from "@/contexts/language-context"
import { SITE_SETTINGS } from "@/lib/site-settings"

export default function SiteSettingsPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      <PageHero
        title={language === "ar" ? "إعدادات الموقع الافتراضية" : "Site Default Settings"}
        subtitle={
          language === "ar"
            ? "مرجع واضح للمحتويات الأساسية المستخدمة في الموقع لتسهيل التحديث المستقبلي." 
            : "A single reference for the default content values used across the site."
        }
        badge={language === "ar" ? "لوحة المراجعة" : "Reference Panel"}
        image="/images/about-team.png"
      />

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "الهوية" : "Branding"}
            title={language === "ar" ? "هوية شركة العزب" : "Alazab Brand Identity"}
            description={
              language === "ar"
                ? "هذه القيم تستخدم في الشعار والنصوص الرئيسية." 
                : "These values are used in logos, headlines, and key brand messaging."
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[color:rgba(245,191,35,0.2)] p-6">
              <h3 className="text-lg font-semibold text-[var(--color-deep)] dark:text-white mb-4">
                {language === "ar" ? "الاسم والشعار" : "Name & Tagline"}
              </h3>
              <ul className="space-y-2 text-sm text-[var(--color-dark)] dark:text-gray-300">
                <li>{SITE_SETTINGS.brand.nameAr}</li>
                <li>{SITE_SETTINGS.brand.nameEn}</li>
                <li>{SITE_SETTINGS.brand.sloganAr}</li>
                <li>{SITE_SETTINGS.brand.sloganEn}</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[color:rgba(245,191,35,0.2)] p-6">
              <h3 className="text-lg font-semibold text-[var(--color-deep)] dark:text-white mb-4">
                {language === "ar" ? "الألوان والشعارات" : "Colors & Logos"}
              </h3>
              <ul className="space-y-2 text-sm text-[var(--color-dark)] dark:text-gray-300">
                <li>{SITE_SETTINGS.brand.primaryColor}</li>
                <li>{SITE_SETTINGS.brand.secondaryColor}</li>
                <li>{SITE_SETTINGS.brand.logoLight}</li>
                <li>{SITE_SETTINGS.brand.logoDark}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[color:rgba(245,191,35,0.08)]">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "التواصل" : "Contact"}
            title={language === "ar" ? "بيانات التواصل الرسمية" : "Official Contact Details"}
            description={
              language === "ar"
                ? "تظهر هذه البيانات في التذييل وصفحة التواصل." 
                : "These details appear across the footer and contact page."
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white dark:bg-gray-800 p-6">
              <p className="text-sm text-[var(--color-dark)] dark:text-gray-300">
                {SITE_SETTINGS.contact.addressAr}
              </p>
              <p className="text-sm text-[var(--color-dark)] dark:text-gray-300">
                {SITE_SETTINGS.contact.addressEn}
              </p>
            </div>
            <div className="rounded-2xl bg-white dark:bg-gray-800 p-6">
              <p className="text-sm text-[var(--color-dark)] dark:text-gray-300">{SITE_SETTINGS.contact.phonePrimary}</p>
              <p className="text-sm text-[var(--color-dark)] dark:text-gray-300">{SITE_SETTINGS.contact.phoneSecondary}</p>
              <p className="text-sm text-[var(--color-dark)] dark:text-gray-300">{SITE_SETTINGS.contact.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow={language === "ar" ? "خدماتنا" : "Services"}
            title={language === "ar" ? "القائمة الافتراضية للخدمات" : "Default Service Set"}
            description={
              language === "ar"
                ? "قائمة الخدمات الأساسية المستخدمة في صفحات الموقع." 
                : "The baseline service list referenced across the site pages."
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SITE_SETTINGS.services.map((service) => (
              <div key={service.key} className="rounded-2xl border border-[color:rgba(245,191,35,0.2)] p-6">
                <h3 className="text-base font-semibold text-[var(--color-deep)] dark:text-white">
                  {language === "ar" ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-sm text-[var(--color-dark)] dark:text-gray-300 mt-2">
                  {language === "ar" ? service.summaryAr : service.summaryEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
