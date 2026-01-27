"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {/* Company Info */}
          <div className="text-center sm:text-start">
            <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-6 justify-center sm:justify-start">
              <Image
                src="https://al-azab.co/w.png"
                alt={language === "ar" ? "شعار شركة العزب للإنشاءات" : "Alazab Construction Company Logo"}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-bold text-white whitespace-nowrap">
                {language === "ar" ? "العزب للإنشاءات" : "Al-Azab Construction"}
              </span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed px-2 sm:px-0">
              {language === "ar"
                ? "شركة مقاولات وإدارة تنفيذ متخصصة في التصميم المعماري والتشطيبات وإدارة المشاريع. نركز على الجودة والسلامة وتسليم الأعمال في الوقت المحدد."
                : "A construction and execution management firm specializing in architectural design, finishing, and project delivery. We focus on quality, safety, and on-time delivery."}
            </p>
            <div className="text-gray-400 text-sm sm:text-base">
              {language === "ar" ? "السجل التجاري: 1010-ALZB" : "Commercial Registration: 1010-ALZB"}
            </div>
          </div>

          {/* Legal & Compliance */}
          <div className="text-center sm:text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">{language === "ar" ? "السياسات القانونية" : "Legal"}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "شروط الخدمة" : "Terms of Service"}
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "سياسة الكوكيز" : "Cookie Policy"}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "إشعار قانوني" : "Legal Notice"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">{language === "ar" ? "خدماتنا" : "Our Services"}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "التصميم المعماري" : "Architectural Design"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "التصميم الداخلي" : "Interior Design"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "إدارة المشاريع" : "Project Management"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "الصيانة وإدارة المرافق" : "Maintenance & Facilities"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "من نحن" : "About Us"}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "المشاريع" : "Projects"}
                </Link>
              </li>
              <li>
                <Link
                  href="/clients"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "عملاؤنا" : "Clients"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "خدماتنا" : "Our Services"}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "اتصل بنا" : "Contact Us"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">
              {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base break-words">
                  {language === "ar" ? "شارع المعادي 500/8، القاهرة، مصر" : "8/500 Maadi Street, Cairo, Egypt"}
                </span>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <Phone className="h-5 w-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">+201004006620</span>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <Phone className="h-5 w-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">+201014536600</span>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <Mail className="h-5 w-5 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base break-all">info@al-azab.co</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact#quote-form">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium w-full transition-all duration-300">
                  {language === "ar" ? "احصل على عرض سعر مجاني" : "Get a Free Quote"}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 sm:mt-10 pt-6 text-center text-gray-400 text-sm max-w-6xl mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            {language === "ar"
              ? "شركة العزب للإنشاءات. جميع الحقوق محفوظة."
              : "Al-Azab Construction. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
