"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
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
              <img
                src="https://al-azab.co/images/logaz.gif"
                alt={language === "ar" ? "شعار شركة العزب للإنشاءات" : "Al-Azab Construction Logo"}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white">
                {language === "ar" ? "العزب للإنشاءات" : "Al-Azab Construction"}
              </span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed px-2 sm:px-0">
              {language === "ar"
                ? "شريكك الموثوق في حلول البناء المبتكرة. نبني التميز ونقدم الجودة منذ عام 2000."
                : "Your trusted partner for innovative construction solutions. Building excellence and delivering quality since 2000."}
            </p>
            <div className="flex gap-4 justify-center sm:justify-start">
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="text-center sm:text-start">
            <h3 className="text-lg font-semibold mb-4 text-white">{language === "ar" ? "خدماتنا" : "Our Services"}</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  href="/services/luxury-finishing"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "التشطيبات الفاخرة" : "Luxury Finishing"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/brand-identity"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "الهوية التجارية" : "Brand Identity"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/maintenance-renovations"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "الصيانة والتجديدات" : "Maintenance & Renovations"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/general-supplies"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "التوريدات العامة" : "General Supplies"}
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
                  href="/testimonials"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "آراء العملاء" : "Testimonials"}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 text-sm sm:text-base hover:text-yellow-500 transition-colors inline-block"
                >
                  {language === "ar" ? "الوظائف" : "Careers"}
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
                <MapPin className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base break-words">
                  {language === "ar" ? "8/500 شارع المعادي، القاهرة، مصر" : "8/500st Maadi, Cairo, Egypt"}
                </span>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <Phone className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">+201004006620</span>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <Phone className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">+201014536600</span>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3">
                <Mail className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
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
