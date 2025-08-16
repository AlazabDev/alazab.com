"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Sparkles, Palette, Crown, Gem, Award, Star } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function LuxuryFinishingPage() {
  const { t, language } = useLanguage()

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
        <Image
          src="https://al-azab.co/images/service-1.png"
          alt="Luxury Finishing"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full text-amber-300 text-sm font-medium mb-6">
              <Crown className="h-4 w-4" />
              {language === "ar" ? "التشطيبات الفاخرة" : "Luxury Finishing"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {language === "ar"
                ? "حلول التشطيب الفاخرة التي تحول مساحاتك إلى تحف فنية أنيقة"
                : "High-end finishing solutions that turn your spaces into elegant masterpieces"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "نقدم أرقى خدمات التشطيب والديكور بمواد عالية الجودة وتصاميم استثنائية تعكس ذوقك الرفيع"
                : "We provide the finest finishing and decoration services with high-quality materials and exceptional designs that reflect your refined taste"}
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
              <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                {language === "ar" ? "خدماتنا المتميزة" : "Our Premium Services"}
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {language === "ar"
                  ? "إبداع لا حدود له في عالم التشطيبات الفاخرة"
                  : "Unlimited creativity in the world of luxury finishing"}
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {language === "ar"
                  ? "في شركة العزب للإنشاءات، نؤمن بأن التشطيب الفاخر ليس مجرد عمل، بل فن يحول المساحات العادية إلى قصور من الجمال والأناقة. نحن نجمع بين الخبرة العريقة والتقنيات الحديثة لنقدم لك تشطيبات تفوق توقعاتك."
                  : "At Al-Azab Construction, we believe that luxury finishing is not just work, but an art that transforms ordinary spaces into palaces of beauty and elegance. We combine extensive experience with modern techniques to provide you with finishes that exceed your expectations."}
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {language === "ar"
                  ? "من اختيار أجود المواد إلى تنفيذ أدق التفاصيل، نحن نضمن لك تشطيباً يعكس شخصيتك ويلبي أحلامك في مساحة تستحقها."
                  : "From selecting the finest materials to executing the finest details, we guarantee you a finish that reflects your personality and fulfills your dreams in a space you deserve."}
              </p>
              <Link href="/contact">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-8 py-3 text-lg">
                  {language === "ar" ? "احصل على استشارة مجانية" : "Get a Free Consultation"}
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
                src="https://al-azab.co/images/service-2.png"
                alt="Luxury Interior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "ما نقدمه" : "What We Offer"}
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {language === "ar" ? "خدمات التشطيب الفاخر" : "Luxury Finishing Services"}
            </h2>
            <p className="text-gray-700 text-lg">
              {language === "ar"
                ? "نقدم مجموعة شاملة من خدمات التشطيب الفاخر لتلبية جميع احتياجاتك في إنشاء مساحات استثنائية"
                : "We provide a comprehensive range of luxury finishing services to meet all your needs in creating exceptional spaces"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {luxuryServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-amber-100/50"
              >
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-amber-600" />
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
                      <CheckCircle className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
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
            <div className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "عمليتنا" : "Our Process"}
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {language === "ar" ? "كيف نحقق أحلامك في التشطيب الفاخر" : "How We Achieve Your Luxury Finishing Dreams"}
            </h2>
            <p className="text-gray-700 text-lg">
              {language === "ar"
                ? "عملية مدروسة ومنظمة تضمن تجربة سلسة من الاستشارة الأولى حتى التسليم النهائي"
                : "A thoughtful and organized process that ensures a smooth experience from initial consultation to final delivery"}
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-200 hidden md:block"></div>

              {/* Process steps */}
              <div className="space-y-12 relative">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 relative">
                      <div className="bg-gradient-to-br from-gray-50 to-amber-50/50 p-8 rounded-3xl shadow-lg relative z-10 border border-amber-100/30">
                        <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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
                      <div className="absolute top-1/2 left-0 md:left-auto md:right-0 transform translate-y-[-50%] translate-x-[-50%] md:translate-x-[50%] w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full border-4 border-white z-20 hidden md:block shadow-lg"></div>
                    </div>
                    <div className="md:w-1/2 hidden md:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              {language === "ar" ? "مشاريع التشطيب الفاخر المميزة" : "Featured Luxury Finishing Projects"}
            </h2>
            <p className="text-gray-300 text-lg">
              {language === "ar"
                ? "استكشف بعض مشاريع التشطيب الفاخر الحديثة التي تعرض خبرتنا وجودتنا الاستثنائية"
                : "Explore some of our recent luxury finishing projects that showcase our expertise and exceptional quality"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {luxuryProjects.map((project, index) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-xl text-white mb-2">
                      {language === "ar" ? project.titleAr : project.title}
                    </h3>
                    <p className="text-amber-300 mb-4">{language === "ar" ? project.locationAr : project.location}</p>
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
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900 font-medium px-8 py-3 text-lg backdrop-blur-sm bg-transparent"
              >
                {language === "ar" ? "عرض جميع المشاريع" : "View All Projects"}
                <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {language === "ar"
                ? "هل أنت مستعد لتحويل مساحتك إلى تحفة فنية؟"
                : "Ready to Transform Your Space into a Masterpiece?"}
            </h2>
            <p className="text-amber-100 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              {language === "ar"
                ? "اتصل بنا اليوم للحصول على استشارة مجانية واكتشف كيف يمكن لشركة العزب للإنشاءات أن تحقق رؤيتك في التشطيب الفاخر"
                : "Contact us today for a free consultation and discover how Al-Azab Construction can bring your luxury finishing vision to life"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-xl"
                >
                  {language === "ar" ? "احصل على عرض أسعار مجاني" : "Get a Free Quote"}
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
const luxuryServices = [
  {
    title: "Premium Interior Design",
    titleAr: "التصميم الداخلي المتميز",
    description: "Bespoke interior design solutions that reflect your personal style and luxury preferences.",
    descriptionAr: "حلول التصميم الداخلي المخصصة التي تعكس أسلوبك الشخصي وتفضيلاتك الفاخرة.",
    icon: Palette,
    features: [
      "Custom furniture design",
      "Premium material selection",
      "Lighting design consultation",
      "Color scheme development",
    ],
    featuresAr: ["تصميم الأثاث المخصص", "اختيار المواد المتميزة", "استشارة تصميم الإضاءة", "تطوير نظام الألوان"],
  },
  {
    title: "High-End Flooring",
    titleAr: "الأرضيات الفاخرة",
    description: "Exquisite flooring solutions using the finest materials from marble to hardwood.",
    descriptionAr: "حلول الأرضيات الرائعة باستخدام أجود المواد من الرخام إلى الخشب الصلب.",
    icon: Gem,
    features: [
      "Italian marble installation",
      "Exotic hardwood flooring",
      "Custom pattern designs",
      "Underfloor heating systems",
    ],
    featuresAr: [
      "تركيب الرخام الإيطالي",
      "أرضيات الخشب الاستوائي",
      "تصاميم الأنماط المخصصة",
      "أنظمة التدفئة تحت الأرضية",
    ],
  },
  {
    title: "Luxury Wall Treatments",
    titleAr: "معالجات الجدران الفاخرة",
    description: "Sophisticated wall finishes including textured surfaces, premium paints, and decorative elements.",
    descriptionAr: "تشطيبات الجدران المتطورة بما في ذلك الأسطح المنسوجة والدهانات المتميزة والعناصر الزخرفية.",
    icon: Sparkles,
    features: [
      "Venetian plaster application",
      "Designer wallpaper installation",
      "Custom millwork and moldings",
      "Accent wall creation",
    ],
    featuresAr: [
      "تطبيق الجص الفينيسي",
      "تركيب ورق الحائط المصمم",
      "الأعمال الخشبية والقوالب المخصصة",
      "إنشاء جدران مميزة",
    ],
  },
  {
    title: "Premium Lighting Solutions",
    titleAr: "حلول الإضاءة المتميزة",
    description: "Sophisticated lighting systems that enhance ambiance and highlight architectural features.",
    descriptionAr: "أنظمة الإضاءة المتطورة التي تعزز الأجواء وتبرز الميزات المعمارية.",
    icon: Star,
    features: [
      "Designer fixture installation",
      "Smart lighting controls",
      "Architectural lighting design",
      "Mood lighting systems",
    ],
    featuresAr: [
      "تركيب التجهيزات المصممة",
      "أنظمة التحكم الذكية في الإضاءة",
      "تصميم الإضاءة المعمارية",
      "أنظمة الإضاءة المزاجية",
    ],
  },
  {
    title: "Custom Cabinetry",
    titleAr: "الخزائن المخصصة",
    description: "Handcrafted cabinetry solutions designed to maximize space and enhance functionality.",
    descriptionAr: "حلول الخزائن المصنوعة يدوياً المصممة لتعظيم المساحة وتعزيز الوظائف.",
    icon: Crown,
    features: [
      "Bespoke kitchen cabinets",
      "Walk-in closet systems",
      "Built-in storage solutions",
      "Premium hardware selection",
    ],
    featuresAr: ["خزائن المطبخ المخصصة", "أنظمة الخزائن الكبيرة", "حلول التخزين المدمجة", "اختيار الأجهزة المتميزة"],
  },
  {
    title: "Luxury Bathroom Finishing",
    titleAr: "تشطيب الحمامات الفاخرة",
    description: "Transform your bathroom into a spa-like retreat with premium fixtures and finishes.",
    descriptionAr: "حول حمامك إلى ملاذ يشبه السبا مع التجهيزات والتشطيبات المتميزة.",
    icon: Award,
    features: [
      "Premium tile installation",
      "Luxury fixture selection",
      "Custom vanity design",
      "Spa-inspired features",
    ],
    featuresAr: [
      "تركيب البلاط المتميز",
      "اختيار التجهيزات الفاخرة",
      "تصميم طاولة الزينة المخصصة",
      "ميزات مستوحاة من السبا",
    ],
  },
]

const processSteps = [
  {
    title: "Design Consultation",
    titleAr: "استشارة التصميم",
    description: "We begin with an in-depth consultation to understand your vision, lifestyle, and luxury preferences.",
    descriptionAr: "نبدأ باستشارة متعمقة لفهم رؤيتك وأسلوب حياتك وتفضيلاتك الفاخرة.",
  },
  {
    title: "Concept Development",
    titleAr: "تطوير المفهوم",
    description: "Our design team creates detailed concepts and 3D visualizations to bring your vision to life.",
    descriptionAr: "يقوم فريق التصميم لدينا بإنشاء مفاهيم مفصلة وتصورات ثلاثية الأبعاد لإحياء رؤيتك.",
  },
  {
    title: "Material Selection",
    titleAr: "اختيار المواد",
    description: "We guide you through selecting premium materials that balance luxury, durability, and aesthetics.",
    descriptionAr: "نرشدك خلال اختيار المواد المتميزة التي توازن بين الفخامة والمتانة والجماليات.",
  },
  {
    title: "Precision Installation",
    titleAr: "التركيب الدقيق",
    description: "Our master craftsmen execute the installation with meticulous attention to detail and quality.",
    descriptionAr: "ينفذ حرفيونا الماهرون التركيب مع اهتمام دقيق بالتفاصيل والجودة.",
  },
  {
    title: "Quality Assurance",
    titleAr: "ضمان الجودة",
    description: "Rigorous quality checks ensure every element meets our exacting luxury standards.",
    descriptionAr: "فحوصات الجودة الصارمة تضمن أن كل عنصر يلبي معايير الفخامة الصارمة لدينا.",
  },
  {
    title: "Final Reveal",
    titleAr: "الكشف النهائي",
    description: "We present your transformed space and provide comprehensive care instructions for lasting beauty.",
    descriptionAr: "نقدم مساحتك المحولة ونوفر تعليمات العناية الشاملة للجمال الدائم.",
  },
]

const luxuryProjects = [
  {
    id: "penthouse-suite",
    title: "Penthouse Suite",
    titleAr: "جناح البنتهاوس",
    location: "Downtown Cairo",
    locationAr: "وسط القاهرة",
    image: "https://al-azab.co/images/service-3.png",
  },
  {
    id: "luxury-villa",
    title: "Luxury Villa",
    titleAr: "الفيلا الفاخرة",
    location: "New Capital",
    locationAr: "العاصمة الإدارية",
    image: "https://al-azab.co/images/service-4.png",
  },
  {
    id: "executive-office",
    title: "Executive Office",
    titleAr: "المكتب التنفيذي",
    location: "Maadi",
    locationAr: "المعادي",
    image: "https://al-azab.co/images/service-5.png",
  },
]
