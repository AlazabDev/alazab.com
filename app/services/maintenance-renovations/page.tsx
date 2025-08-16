"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Wrench, RefreshCw, Shield, Clock, Settings, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function MaintenanceRenovationsPage() {
  const { t, language } = useLanguage()

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-emerald-800/70 to-orange-900/80 z-10" />
        <Image
          src="https://al-azab.co/images/service-3.png"
          alt="Maintenance & Renovations"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-green-300 text-sm font-medium mb-6">
              <Wrench className="h-4 w-4" />
              {language === "ar" ? "الصيانة والتجديدات" : "Maintenance & Renovations"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {language === "ar"
                ? "خدمات الصيانة الشاملة لتعزيز وتحديث مساحاتك"
                : "Comprehensive maintenance services to enhance and modernize your spaces"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "نحافظ على استثمارك ونجدد مساحاتك بخدمات صيانة متخصصة وحلول تجديد مبتكرة"
                : "We preserve your investment and renew your spaces with specialized maintenance services and innovative renovation solutions"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto ${language === "ar" ? "md:grid-cols-2" : ""}`}
          >
            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={language === "ar" ? "order-2 md:order-1" : ""}
            >
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                {language === "ar" ? "خدماتنا الشاملة" : "Our Comprehensive Services"}
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {language === "ar"
                  ? "نحافظ على جمال وقيمة مساحاتك على مدار السنين"
                  : "We preserve the beauty and value of your spaces over the years"}
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {language === "ar"
                  ? "في شركة العزب للإنشاءات، نؤمن بأن الصيانة الدورية والتجديد المدروس هما مفتاح الحفاظ على استثمارك العقاري. نقدم خدمات صيانة شاملة تضمن بقاء مساحاتك في أفضل حالاتها وتواكب أحدث المعايير."
                  : "At Al-Azab Construction, we believe that regular maintenance and thoughtful renovation are the key to preserving your real estate investment. We provide comprehensive maintenance services that ensure your spaces remain in their best condition and keep up with the latest standards."}
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {language === "ar"
                  ? "من الصيانة الوقائية إلى التجديدات الكاملة، فريقنا المتخصص مستعد لتلبية جميع احتياجاتك بكفاءة واحترافية عالية."
                  : "From preventive maintenance to complete renovations, our specialized team is ready to meet all your needs with high efficiency and professionalism."}
              </p>
              <Link href="/contact">
                <Button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 text-lg">
                  {language === "ar" ? "احجز خدمة الصيانة" : "Book Maintenance Service"}
                  <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative h-[600px] rounded-3xl overflow-hidden shadow-2xl ${language === "ar" ? "order-1 md:order-2" : ""}`}
            >
              <Image
                src="https://al-azab.co/images/service-4.png"
                alt="Maintenance Work"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "ما نقدمه" : "What We Offer"}
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {language === "ar" ? "خدمات الصيانة والتجديد" : "Maintenance & Renovation Services"}
            </h2>
            <p className="text-gray-700 text-lg">
              {language === "ar"
                ? "نقدم مجموعة شاملة من خدمات الصيانة والتجديد للحفاظ على مساحاتك وتحديثها"
                : "We provide a comprehensive range of maintenance and renovation services to preserve and update your spaces"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {maintenanceServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-green-100/50"
              >
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {language === "ar" ? service.titleAr : service.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {language === "ar" ? service.descriptionAr : service.description}
                </p>
                <ul className="space-y-3">
                  {(language === "ar" ? service.featuresAr : service.features).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "عمليتنا" : "Our Process"}
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {language === "ar"
                ? "كيف نقدم خدمات الصيانة والتجديد"
                : "How We Deliver Maintenance & Renovation Services"}
            </h2>
            <p className="text-gray-700 text-lg">
              {language === "ar"
                ? "منهجية منظمة تضمن تقديم خدمات صيانة وتجديد عالية الجودة"
                : "An organized methodology that ensures the delivery of high-quality maintenance and renovation services"}
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-200 via-green-300 to-green-200 hidden md:block"></div>

              {/* Process steps */}
              <div className="space-y-12 relative">
                {maintenanceProcessSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 relative">
                      <div className="bg-gradient-to-br from-gray-50 to-green-50/50 p-8 rounded-3xl shadow-lg relative z-10 border border-green-100/30">
                        <div className="bg-gradient-to-br from-green-500 to-green-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                          <span className="text-white font-bold text-xl">{index + 1}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                          {language === "ar" ? step.titleAr : step.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {language === "ar" ? step.descriptionAr : step.description}
                        </p>
                      </div>
                      {/* Circle on the timeline */}
                      <div className="absolute top-1/2 left-0 md:left-auto md:right-0 transform translate-y-[-50%] translate-x-[-50%] md:translate-x-[50%] w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-full border-4 border-white z-20 hidden md:block shadow-lg"></div>
                    </div>
                    <div className="md:w-1/2 hidden md:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              {language === "ar" ? "خدمات الطوارئ" : "Emergency Services"}
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              {language === "ar" ? "خدمة طوارئ على مدار الساعة" : "24/7 Emergency Service"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {language === "ar"
                ? "نحن متاحون على مدار الساعة للتعامل مع حالات الطوارئ والإصلاحات العاجلة"
                : "We are available 24/7 to handle emergencies and urgent repairs"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {emergencyServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-orange-100/50"
              >
                <div className="bg-gradient-to-br from-orange-100 to-red-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <service.icon className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {language === "ar" ? service.titleAr : service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === "ar" ? service.descriptionAr : service.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/contact">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 text-lg">
                {language === "ar" ? "اتصل للطوارئ" : "Call for Emergency"}
                <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              {language === "ar" ? "مشاريع الصيانة والتجديد المميزة" : "Featured Maintenance & Renovation Projects"}
            </h2>
            <p className="text-gray-300 text-lg">
              {language === "ar"
                ? "استكشف مشاريعنا الناجحة في الصيانة والتجديد التي أعادت الحياة للمساحات"
                : "Explore our successful maintenance and renovation projects that brought spaces back to life"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {maintenanceProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={language === "ar" ? project.titleAr : project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-xl text-white mb-2">
                      {language === "ar" ? project.titleAr : project.title}
                    </h3>
                    <p className="text-green-300 mb-4">{language === "ar" ? project.locationAr : project.location}</p>
                    <Link href={`/projects/${project.id}`}>
                      <Button
                        variant="outline"
                        className="text-white border-white hover:bg-white/20 backdrop-blur-sm bg-transparent"
                      >
                        {language === "ar" ? "عرض التفاصيل" : "View Details"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <Button
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 font-medium px-8 py-3 text-lg backdrop-blur-sm bg-transparent"
              >
                {language === "ar" ? "عرض جميع المشاريع" : "View All Projects"}
                <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {language === "ar"
                ? "هل تحتاج خدمات صيانة أو تجديد لمساحتك؟"
                : "Need maintenance or renovation services for your space?"}
            </h2>
            <p className="text-green-100 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              {language === "ar"
                ? "اتصل بنا اليوم لتحديد موعد فحص مجاني واكتشف كيف يمكننا الحفاظ على جمال وقيمة مساحتك"
                : "Contact us today to schedule a free inspection and discover how we can preserve the beauty and value of your space"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-xl"
                >
                  {language === "ar" ? "احجز فحص مجاني" : "Book Free Inspection"}
                  <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Sample data
const maintenanceServices = [
  {
    title: "Preventive Maintenance",
    titleAr: "الصيانة الوقائية",
    description: "Regular maintenance programs to prevent issues before they occur and extend building life.",
    descriptionAr: "برامج الصيانة المنتظمة لمنع المشاكل قبل حدوثها وإطالة عمر المبنى.",
    icon: Shield,
    features: [
      "Scheduled inspections",
      "HVAC system maintenance",
      "Plumbing system checks",
      "Electrical safety audits",
    ],
    featuresAr: ["الفحوصات المجدولة", "صيانة أنظمة التكييف", "فحص أنظمة السباكة", "تدقيق السلامة الكهربائية"],
  },
  {
    title: "Complete Renovations",
    titleAr: "التجديدات الكاملة",
    description: "Full-scale renovation projects that transform and modernize your existing spaces.",
    descriptionAr: "مشاريع التجديد الشاملة التي تحول وتحدث مساحاتك الحالية.",
    icon: RefreshCw,
    features: [
      "Space redesign and layout",
      "Modern system upgrades",
      "Interior and exterior updates",
      "Energy efficiency improvements",
    ],
    featuresAr: [
      "إعادة تصميم المساحة والتخطيط",
      "ترقيات الأنظمة الحديثة",
      "تحديثات داخلية وخارجية",
      "تحسينات كفاءة الطاقة",
    ],
  },
  {
    title: "Emergency Repairs",
    titleAr: "الإصلاحات الطارئة",
    description: "24/7 emergency repair services for urgent maintenance issues and unexpected problems.",
    descriptionAr: "خدمات الإصلاح الطارئة على مدار الساعة لمشاكل الصيانة العاجلة والمشاكل غير المتوقعة.",
    icon: Zap,
    features: [
      "24/7 emergency response",
      "Rapid problem diagnosis",
      "Immediate temporary fixes",
      "Permanent solution planning",
    ],
    featuresAr: ["استجابة طوارئ على مدار الساعة", "تشخيص سريع للمشاكل", "إصلاحات مؤقتة فورية", "تخطيط الحلول الدائمة"],
  },
  {
    title: "System Upgrades",
    titleAr: "ترقية الأنظمة",
    description: "Modernize your building systems with the latest technology and efficiency standards.",
    descriptionAr: "حدث أنظمة مبناك بأحدث التقنيات ومعايير الكفاءة.",
    icon: Settings,
    features: [
      "Smart building technology",
      "Energy-efficient systems",
      "Security system upgrades",
      "Automation integration",
    ],
    featuresAr: ["تقنية المباني الذكية", "الأنظمة الموفرة للطاقة", "ترقيات أنظمة الأمان", "تكامل الأتمتة"],
  },
  {
    title: "Structural Repairs",
    titleAr: "الإصلاحات الهيكلية",
    description: "Professional structural repair and reinforcement services to ensure building safety.",
    descriptionAr: "خدمات الإصلاح والتعزيز الهيكلي المهنية لضمان سلامة المبنى.",
    icon: Wrench,
    features: ["Foundation repair", "Structural reinforcement", "Crack repair and sealing", "Load-bearing assessments"],
    featuresAr: ["إصلاح الأساسات", "التعزيز الهيكلي", "إصلاح وإغلاق الشقوق", "تقييمات تحمل الأحمال"],
  },
  {
    title: "Scheduled Maintenance",
    titleAr: "الصيانة المجدولة",
    description: "Regular maintenance schedules tailored to your building's specific needs and usage.",
    descriptionAr: "جداول الصيانة المنتظمة المصممة خصيصاً لاحتياجات واستخدام مبناك.",
    icon: Clock,
    features: ["Custom maintenance plans", "Regular service visits", "Performance monitoring", "Maintenance reporting"],
    featuresAr: ["خطط الصيانة المخصصة", "زيارات الخدمة المنتظمة", "مراقبة الأداء", "تقارير الصيانة"],
  },
]

const maintenanceProcessSteps = [
  {
    title: "Initial Assessment",
    titleAr: "التقييم الأولي",
    description: "Comprehensive evaluation of your property to identify maintenance needs and priorities.",
    descriptionAr: "تقييم شامل لممتلكاتك لتحديد احتياجات الصيانة والأولويات.",
  },
  {
    title: "Maintenance Plan",
    titleAr: "خطة الصيانة",
    description: "Development of a customized maintenance plan based on your specific requirements and budget.",
    descriptionAr: "تطوير خطة صيانة مخصصة بناءً على متطلباتك المحددة والميزانية.",
  },
  {
    title: "Scheduling & Coordination",
    titleAr: "الجدولة والتنسيق",
    description: "Efficient scheduling of maintenance activities to minimize disruption to your operations.",
    descriptionAr: "جدولة فعالة لأنشطة الصيانة لتقليل الاضطراب في عملياتك.",
  },
  {
    title: "Professional Execution",
    titleAr: "التنفيذ المهني",
    description: "Skilled technicians perform maintenance work using quality materials and proven methods.",
    descriptionAr: "فنيون ماهرون ينفذون أعمال الصيانة باستخدام مواد عالية الجودة وطرق مثبتة.",
  },
  {
    title: "Quality Control",
    titleAr: "مراقبة الجودة",
    description: "Thorough inspection and testing to ensure all maintenance work meets our high standards.",
    descriptionAr: "فحص واختبار شامل لضمان أن جميع أعمال الصيانة تلبي معاييرنا العالية.",
  },
  {
    title: "Follow-up & Support",
    titleAr: "المتابعة والدعم",
    description: "Ongoing support and monitoring to ensure continued performance and customer satisfaction.",
    descriptionAr: "الدعم والمراقبة المستمرة لضمان الأداء المستمر ورضا العملاء.",
  },
]

const emergencyServices = [
  {
    title: "Plumbing Emergencies",
    titleAr: "طوارئ السباكة",
    description: "Burst pipes, leaks, blockages",
    descriptionAr: "انفجار الأنابيب، التسريبات، الانسدادات",
    icon: Wrench,
  },
  {
    title: "Electrical Issues",
    titleAr: "مشاكل كهربائية",
    description: "Power outages, short circuits",
    descriptionAr: "انقطاع التيار، الدوائر القصيرة",
    icon: Zap,
  },
  {
    title: "Structural Damage",
    titleAr: "أضرار هيكلية",
    description: "Cracks, foundation issues",
    descriptionAr: "الشقوق، مشاكل الأساسات",
    icon: Shield,
  },
  {
    title: "HVAC Failures",
    titleAr: "أعطال التكييف",
    description: "Heating, cooling system failures",
    descriptionAr: "أعطال أنظمة التدفئة والتبريد",
    icon: Settings,
  },
]

const maintenanceProjects = [
  {
    id: "office-renovation",
    title: "Office Building Renovation",
    titleAr: "تجديد مبنى مكاتب",
    location: "Downtown Cairo",
    locationAr: "وسط القاهرة",
    image: "https://al-azab.co/images/service-5.png",
  },
  {
    id: "residential-maintenance",
    title: "Residential Complex Maintenance",
    titleAr: "صيانة مجمع سكني",
    location: "New Cairo",
    locationAr: "القاهرة الجديدة",
    image: "https://al-azab.co/images/service-2.png",
  },
  {
    id: "commercial-upgrade",
    title: "Commercial Space Upgrade",
    titleAr: "ترقية مساحة تجارية",
    location: "Heliopolis",
    locationAr: "مصر الجديدة",
    image: "https://al-azab.co/images/service-1.png",
  },
]
