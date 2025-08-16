"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Package, Truck, Shield, Clock, BarChart3, Users } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function GeneralSuppliesPage() {
  const { t, language } = useLanguage()

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-slate-800/70 to-brown-900/80 z-10" />
        <Image
          src="https://al-azab.co/images/service-5.png"
          alt="General Supplies"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-300 text-sm font-medium mb-6">
              <Package className="h-4 w-4" />
              {language === "ar" ? "التوريدات العامة" : "General Supplies"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {language === "ar"
                ? "نوفر حلول التوريد الكاملة لجميع احتياجات مشروعك من البداية إلى النهاية"
                : "We offer full supply solutions for all your project needs, from start to finish"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "شريكك الموثوق في توريد جميع مواد البناء والمعدات بأعلى معايير الجودة وفي الوقت المحدد"
                : "Your trusted partner in supplying all construction materials and equipment with the highest quality standards and on time"}
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
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                {language === "ar" ? "خدماتنا المتكاملة" : "Our Integrated Services"}
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {language === "ar"
                  ? "شريكك الموثوق في سلسلة التوريد الكاملة"
                  : "Your trusted partner in the complete supply chain"}
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {language === "ar"
                  ? "في شركة العزب للإنشاءات، نفهم أن نجاح أي مشروع يعتمد على توفر المواد والمعدات المناسبة في الوقت المناسب. لذلك نقدم خدمات توريد شاملة تغطي جميع احتياجاتك من مواد البناء الأساسية إلى أحدث المعدات والتقنيات."
                  : "At Al-Azab Construction, we understand that the success of any project depends on having the right materials and equipment at the right time. Therefore, we provide comprehensive supply services that cover all your needs from basic construction materials to the latest equipment and technologies."}
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {language === "ar"
                  ? "بفضل شبكة موردينا الواسعة وخبرتنا العميقة في السوق، نضمن لك الحصول على أفضل المنتجات بأسعار تنافسية وجودة مضمونة."
                  : "Thanks to our extensive supplier network and deep market expertise, we guarantee you get the best products at competitive prices with guaranteed quality."}
              </p>
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 text-lg">
                  {language === "ar" ? "اطلب عرض أسعار" : "Request Quote"}
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
                src="https://al-azab.co/images/service-6.png"
                alt="Supply Chain"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "ما نوفره" : "What We Supply"}
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {language === "ar" ? "خدمات التوريد العامة" : "General Supply Services"}
            </h2>
            <p className="text-gray-700 text-lg">
              {language === "ar"
                ? "نقدم مجموعة شاملة من خدمات التوريد لتلبية جميع احتياجات مشروعك"
                : "We provide a comprehensive range of supply services to meet all your project needs"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {supplyServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-blue-100/50"
              >
                <div className="bg-gradient-to-br from-blue-100 to-slate-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-blue-600" />
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
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
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
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "عمليتنا" : "Our Process"}
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {language === "ar" ? "كيف نضمن التوريد المثالي لمشروعك" : "How We Ensure Perfect Supply for Your Project"}
            </h2>
            <p className="text-gray-700 text-lg">
              {language === "ar"
                ? "عملية منظمة ومدروسة تضمن حصولك على جميع المواد والمعدات في الوقت المناسب"
                : "An organized and thoughtful process that ensures you get all materials and equipment at the right time"}
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 hidden md:block"></div>

              {/* Process steps */}
              <div className="space-y-12 relative">
                {supplyProcessSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 relative">
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 p-8 rounded-3xl shadow-lg relative z-10 border border-blue-100/30">
                        <div className="bg-gradient-to-br from-blue-500 to-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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
                      <div className="absolute top-1/2 left-0 md:left-auto md:right-0 transform translate-y-[-50%] translate-x-[-50%] md:translate-x-[50%] w-8 h-8 bg-gradient-to-br from-blue-500 to-slate-700 rounded-full border-4 border-white z-20 hidden md:block shadow-lg"></div>
                    </div>
                    <div className="md:w-1/2 hidden md:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              {language === "ar" ? "ضمان الجودة" : "Quality Assurance"}
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              {language === "ar" ? "معايير الجودة والموثوقية" : "Quality and Reliability Standards"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {language === "ar"
                ? "نلتزم بأعلى معايير الجودة في جميع منتجاتنا وخدماتنا لضمان نجاح مشروعك"
                : "We adhere to the highest quality standards in all our products and services to ensure your project's success"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-slate-100/50"
              >
                <div className="bg-gradient-to-br from-slate-100 to-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-7 w-7 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {language === "ar" ? feature.titleAr : feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === "ar" ? feature.descriptionAr : feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              {language === "ar" ? "مشاريع التوريد المميزة" : "Featured Supply Projects"}
            </h2>
            <p className="text-gray-300 text-lg">
              {language === "ar"
                ? "استكشف مشاريعنا الناجحة في التوريد التي ساهمت في إنجاز مشاريع استثنائية"
                : "Explore our successful supply projects that contributed to completing exceptional projects"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {supplyProjects.map((project, index) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-xl text-white mb-2">
                      {language === "ar" ? project.titleAr : project.title}
                    </h3>
                    <p className="text-blue-300 mb-4">{language === "ar" ? project.locationAr : project.location}</p>
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
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 font-medium px-8 py-3 text-lg backdrop-blur-sm bg-transparent"
              >
                {language === "ar" ? "عرض جميع المشاريع" : "View All Projects"}
                <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-slate-600 to-blue-600">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {language === "ar"
                ? "هل تحتاج حلول توريد شاملة لمشروعك؟"
                : "Need comprehensive supply solutions for your project?"}
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              {language === "ar"
                ? "اتصل بنا اليوم للحصول على عرض أسعار مخصص واكتشف كيف يمكننا تلبية جميع احتياجات التوريد لمشروعك"
                : "Contact us today for a customized quote and discover how we can meet all your project's supply needs"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-xl"
                >
                  {language === "ar" ? "اطلب عرض أسعار" : "Request Quote"}
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
const supplyServices = [
  {
    title: "Construction Materials",
    titleAr: "مواد البناء",
    description: "Complete range of high-quality construction materials from trusted suppliers worldwide.",
    descriptionAr: "مجموعة كاملة من مواد البناء عالية الجودة من موردين موثوقين حول العالم.",
    icon: Package,
    features: ["Cement and concrete", "Steel and rebar", "Bricks and blocks", "Insulation materials"],
    featuresAr: ["الأسمنت والخرسانة", "الصلب والحديد", "الطوب والبلوك", "مواد العزل"],
  },
  {
    title: "Equipment & Tools",
    titleAr: "المعدات والأدوات",
    description: "Professional construction equipment and tools for all types of construction projects.",
    descriptionAr: "معدات وأدوات البناء المهنية لجميع أنواع مشاريع البناء.",
    icon: Truck,
    features: ["Heavy machinery rental", "Power tools supply", "Safety equipment", "Specialized tools"],
    featuresAr: ["تأجير الآلات الثقيلة", "توريد الأدوات الكهربائية", "معدات السلامة", "الأدوات المتخصصة"],
  },
  {
    title: "Logistics Management",
    titleAr: "إدارة اللوجستيات",
    description: "Efficient logistics and delivery management to ensure materials arrive on schedule.",
    descriptionAr: "إدارة لوجستية وتسليم فعالة لضمان وصول المواد في الموعد المحدد.",
    icon: BarChart3,
    features: ["Delivery scheduling", "Inventory management", "Storage solutions", "Transportation coordination"],
    featuresAr: ["جدولة التسليم", "إدارة المخزون", "حلول التخزين", "تنسيق النقل"],
  },
  {
    title: "Quality Control",
    titleAr: "مراقبة الجودة",
    description: "Rigorous quality control processes to ensure all materials meet industry standards.",
    descriptionAr: "عمليات مراقبة جودة صارمة لضمان أن جميع المواد تلبي معايير الصناعة.",
    icon: Shield,
    features: ["Material testing", "Quality certifications", "Compliance verification", "Performance monitoring"],
    featuresAr: ["اختبار المواد", "شهادات الجودة", "التحقق من الامتثال", "مراقبة الأداء"],
  },
  {
    title: "Project Coordination",
    titleAr: "تنسيق المشاريع",
    description: "Seamless coordination with your project timeline and requirements.",
    descriptionAr: "تنسيق سلس مع الجدول الزمني لمشروعك ومتطلباتك.",
    icon: Users,
    features: ["Timeline synchronization", "Requirement analysis", "Progress tracking", "Communication support"],
    featuresAr: ["مزامنة الجدول الزمني", "تحليل المتطلبات", "تتبع التقدم", "دعم التواصل"],
  },
  {
    title: "Emergency Supply",
    titleAr: "التوريد الطارئ",
    description: "Rapid response supply services for urgent project needs and unexpected requirements.",
    descriptionAr: "خدمات التوريد السريع للاحتياجات العاجلة للمشروع والمتطلبات غير المتوقعة.",
    icon: Clock,
    features: ["24/7 availability", "Express delivery", "Emergency stock", "Rapid procurement"],
    featuresAr: ["التوفر على مدار الساعة", "التسليم السريع", "المخزون الطارئ", "الشراء السريع"],
  },
]

const supplyProcessSteps = [
  {
    title: "Requirements Analysis",
    titleAr: "تحليل المتطلبات",
    description: "Detailed analysis of your project requirements to create a comprehensive supply plan.",
    descriptionAr: "تحليل مفصل لمتطلبات مشروعك لإنشاء خطة توريد شاملة.",
  },
  {
    title: "Supplier Selection",
    titleAr: "اختيار الموردين",
    description: "Careful selection of qualified suppliers based on quality, reliability, and competitive pricing.",
    descriptionAr: "اختيار دقيق للموردين المؤهلين بناءً على الجودة والموثوقية والأسعار التنافسية.",
  },
  {
    title: "Procurement Planning",
    titleAr: "تخطيط الشراء",
    description: "Strategic procurement planning to optimize costs and ensure timely delivery.",
    descriptionAr: "تخطيط استراتيجي للشراء لتحسين التكاليف وضمان التسليم في الوقت المناسب.",
  },
  {
    title: "Quality Verification",
    titleAr: "التحقق من الجودة",
    description: "Thorough quality checks and testing to ensure all materials meet specifications.",
    descriptionAr: "فحوصات واختبارات جودة شاملة لضمان أن جميع المواد تلبي المواصفات.",
  },
  {
    title: "Logistics Coordination",
    titleAr: "تنسيق اللوجستيات",
    description: "Efficient coordination of transportation and delivery to your project site.",
    descriptionAr: "تنسيق فعال للنقل والتسليم إلى موقع مشروعك.",
  },
  {
    title: "Delivery & Support",
    titleAr: "التسليم والدعم",
    description: "On-time delivery with ongoing support and inventory management throughout your project.",
    descriptionAr: "التسليم في الوقت المحدد مع الدعم المستمر وإدارة المخزون طوال مشروعك.",
  },
]

const qualityFeatures = [
  {
    title: "Certified Materials",
    titleAr: "مواد معتمدة",
    description: "All materials come with quality certifications",
    descriptionAr: "جميع المواد تأتي مع شهادات الجودة",
    icon: Shield,
  },
  {
    title: "On-Time Delivery",
    titleAr: "التسليم في الوقت المحدد",
    description: "Guaranteed delivery within agreed timeframes",
    descriptionAr: "تسليم مضمون ضمن الإطار الزمني المتفق عليه",
    icon: Clock,
  },
  {
    title: "Competitive Pricing",
    titleAr: "أسعار تنافسية",
    description: "Best market prices without compromising quality",
    descriptionAr: "أفضل أسعار السوق دون التنازل عن الجودة",
    icon: BarChart3,
  },
  {
    title: "Expert Support",
    titleAr: "دعم الخبراء",
    description: "Professional guidance and technical support",
    descriptionAr: "إرشاد مهني ودعم فني",
    icon: Users,
  },
]

const supplyProjects = [
  {
    id: "residential-complex-supply",
    title: "Residential Complex Supply",
    titleAr: "توريد مجمع سكني",
    location: "New Administrative Capital",
    locationAr: "العاصمة الإدارية الجديدة",
    image: "https://al-azab.co/images/service-7.png",
  },
  {
    id: "commercial-tower-materials",
    title: "Commercial Tower Materials",
    titleAr: "مواد برج تجاري",
    location: "Downtown Cairo",
    locationAr: "وسط القاهرة",
    image: "https://al-azab.co/images/service-8.png",
  },
  {
    id: "industrial-facility-equipment",
    title: "Industrial Facility Equipment",
    titleAr: "معدات منشأة صناعية",
    location: "10th of Ramadan City",
    locationAr: "مدينة العاشر من رمضان",
    image: "https://al-azab.co/images/service-9.png",
  },
]
