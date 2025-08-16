"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Building2, Palette, Users, Target, Lightbulb, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function BrandIdentityPage() {
  const { t, language } = useLanguage()

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-purple-900/80 z-10" />
        <Image
          src="https://al-azab.co/images/service-6.png"
          alt="Brand Identity Spaces"
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
              <Building2 className="h-4 w-4" />
              {language === "ar" ? "الهوية التجارية" : "Brand Identity"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {language === "ar"
                ? "ننشئ مساحات تعكس هوية علامتك التجارية وتترك انطباعاً دائماً"
                : "We create spaces that reflect your brand image and make a lasting impression"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "نحول رؤية علامتك التجارية إلى مساحات حقيقية تحكي قصتك وتعزز هويتك في كل تفصيل"
                : "We transform your brand vision into real spaces that tell your story and strengthen your identity in every detail"}
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
                {language === "ar" ? "خدماتنا المتخصصة" : "Our Specialized Services"}
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {language === "ar" ? "مساحات تحكي قصة علامتك التجارية" : "Spaces that tell your brand story"}
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {language === "ar"
                  ? "في عالم الأعمال اليوم، المساحة ليست مجرد مكان للعمل، بل هي امتداد لهوية علامتك التجارية. نحن في شركة العزب للإنشاءات نفهم أهمية خلق بيئات تعكس قيم شركتك وتعزز تجربة عملائك وموظفيك."
                  : "In today's business world, space is not just a place to work, but an extension of your brand identity. We at Al-Azab Construction understand the importance of creating environments that reflect your company's values and enhance the experience of your customers and employees."}
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {language === "ar"
                  ? "من المكاتب التنفيذية إلى المحلات التجارية والمطاعم، نصمم وننفذ مساحات تترك انطباعاً قوياً وتحقق أهدافك التجارية."
                  : "From executive offices to retail stores and restaurants, we design and execute spaces that leave a strong impression and achieve your business goals."}
              </p>
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 text-lg">
                  {language === "ar" ? "ابدأ مشروعك معنا" : "Start Your Project With Us"}
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
                src="https://al-azab.co/images/service-7.png"
                alt="Brand Identity Interior"
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
              {language === "ar" ? "ما نقدمه" : "What We Offer"}
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {language === "ar" ? "خدمات الهوية التجارية" : "Brand Identity Services"}
            </h2>
            <p className="text-gray-700 text-lg">
              {language === "ar"
                ? "نقدم حلولاً شاملة لتصميم وتنفيذ مساحات تعكس هوية علامتك التجارية وتحقق أهدافك"
                : "We provide comprehensive solutions for designing and implementing spaces that reflect your brand identity and achieve your goals"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {brandServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-blue-100/50"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
              {language === "ar"
                ? "كيف نبني هوية علامتك التجارية في المساحة"
                : "How We Build Your Brand Identity in Space"}
            </h2>
            <p className="text-gray-700 text-lg">
              {language === "ar"
                ? "منهجية متكاملة تضمن تحويل رؤية علامتك التجارية إلى واقع ملموس"
                : "An integrated methodology that ensures transforming your brand vision into tangible reality"}
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 hidden md:block"></div>

              {/* Process steps */}
              <div className="space-y-12 relative">
                {brandProcessSteps.map((step, index) => (
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
                        <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
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
                      <div className="absolute top-1/2 left-0 md:left-auto md:right-0 transform translate-y-[-50%] translate-x-[-50%] md:translate-x-[50%] w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-4 border-white z-20 hidden md:block shadow-lg"></div>
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
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
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
              {language === "ar" ? "مشاريع الهوية التجارية المميزة" : "Featured Brand Identity Projects"}
            </h2>
            <p className="text-gray-300 text-lg">
              {language === "ar"
                ? "استكشف مشاريعنا التي نجحت في تحويل رؤى العلامات التجارية إلى مساحات استثنائية"
                : "Explore our projects that successfully transformed brand visions into exceptional spaces"}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {brandProjects.map((project, index) => (
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
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {language === "ar"
                ? "هل أنت مستعد لبناء هوية علامتك التجارية في المساحة؟"
                : "Ready to Build Your Brand Identity in Space?"}
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              {language === "ar"
                ? "دعنا نساعدك في إنشاء مساحات تحكي قصة علامتك التجارية وتترك انطباعاً لا يُنسى لدى عملائك"
                : "Let us help you create spaces that tell your brand story and leave an unforgettable impression on your customers"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-xl"
                >
                  {language === "ar" ? "ابدأ مشروعك الآن" : "Start Your Project Now"}
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
const brandServices = [
  {
    title: "Corporate Office Design",
    titleAr: "تصميم المكاتب الشركات",
    description: "Create professional workspaces that reflect your company culture and enhance productivity.",
    descriptionAr: "إنشاء مساحات عمل مهنية تعكس ثقافة شركتك وتعزز الإنتاجية.",
    icon: Building2,
    features: [
      "Executive office suites",
      "Open workspace design",
      "Meeting room configuration",
      "Reception area branding",
    ],
    featuresAr: [
      "أجنحة المكاتب التنفيذية",
      "تصميم مساحات العمل المفتوحة",
      "تكوين غرف الاجتماعات",
      "علامة منطقة الاستقبال",
    ],
  },
  {
    title: "Retail Space Design",
    titleAr: "تصميم المساحات التجارية",
    description: "Design retail environments that enhance customer experience and drive sales.",
    descriptionAr: "تصميم البيئات التجارية التي تعزز تجربة العملاء وتزيد المبيعات.",
    icon: Target,
    features: [
      "Store layout optimization",
      "Product display systems",
      "Customer flow design",
      "Brand integration elements",
    ],
    featuresAr: ["تحسين تخطيط المتجر", "أنظمة عرض المنتجات", "تصميم تدفق العملاء", "عناصر تكامل العلامة التجارية"],
  },
  {
    title: "Restaurant & Hospitality",
    titleAr: "المطاعم والضيافة",
    description: "Create dining experiences that reflect your brand and delight customers.",
    descriptionAr: "إنشاء تجارب طعام تعكس علامتك التجارية وتسعد العملاء.",
    icon: Users,
    features: ["Dining area design", "Kitchen layout planning", "Ambiance creation", "Brand storytelling elements"],
    featuresAr: ["تصميم منطقة الطعام", "تخطيط تخطيط المطبخ", "خلق الأجواء", "عناصر سرد العلامة التجارية"],
  },
  {
    title: "Healthcare Facilities",
    titleAr: "المرافق الصحية",
    description: "Design healing environments that promote wellness and reflect care values.",
    descriptionAr: "تصميم بيئات الشفاء التي تعزز العافية وتعكس قيم الرعاية.",
    icon: Lightbulb,
    features: ["Patient-centered design", "Wayfinding systems", "Calming color schemes", "Accessibility compliance"],
    featuresAr: [
      "التصميم المتمحور حول المريض",
      "أنظمة العثور على الطريق",
      "أنظمة الألوان المهدئة",
      "الامتثال لإمكانية الوصول",
    ],
  },
  {
    title: "Educational Spaces",
    titleAr: "المساحات التعليمية",
    description: "Create learning environments that inspire and support educational goals.",
    descriptionAr: "إنشاء بيئات تعلم تلهم وتدعم الأهداف التعليمية.",
    icon: TrendingUp,
    features: [
      "Classroom optimization",
      "Collaborative spaces",
      "Technology integration",
      "Flexible furniture solutions",
    ],
    featuresAr: ["تحسين الفصول الدراسية", "المساحات التعاونية", "تكامل التكنولوجيا", "حلول الأثاث المرنة"],
  },
  {
    title: "Brand Color & Materials",
    titleAr: "ألوان ومواد العلامة التجارية",
    description: "Implement your brand colors and materials throughout the space for consistency.",
    descriptionAr: "تنفيذ ألوان ومواد علامتك التجارية في جميع أنحاء المساحة للاتساق.",
    icon: Palette,
    features: [
      "Brand color implementation",
      "Material selection guidance",
      "Texture coordination",
      "Visual identity integration",
    ],
    featuresAr: ["تنفيذ ألوان العلامة التجارية", "إرشادات اختيار المواد", "تنسيق الملمس", "تكامل الهوية البصرية"],
  },
]

const brandProcessSteps = [
  {
    title: "Brand Discovery",
    titleAr: "اكتشاف العلامة التجارية",
    description: "We dive deep into understanding your brand values, target audience, and business objectives.",
    descriptionAr: "نتعمق في فهم قيم علامتك التجارية والجمهور المستهدف والأهداف التجارية.",
  },
  {
    title: "Space Analysis",
    titleAr: "تحليل المساحة",
    description: "Comprehensive analysis of your space to identify opportunities for brand integration.",
    descriptionAr: "تحليل شامل لمساحتك لتحديد فرص تكامل العلامة التجارية.",
  },
  {
    title: "Concept Development",
    titleAr: "تطوير المفهوم",
    description: "Creating design concepts that seamlessly blend your brand identity with functional space design.",
    descriptionAr: "إنشاء مفاهيم التصميم التي تمزج بسلاسة هوية علامتك التجارية مع تصميم المساحة الوظيفية.",
  },
  {
    title: "Design Implementation",
    titleAr: "تنفيذ التصميم",
    description: "Executing the design with precision, ensuring every element reinforces your brand message.",
    descriptionAr: "تنفيذ التصميم بدقة، مما يضمن أن كل عنصر يعزز رسالة علامتك التجارية.",
  },
  {
    title: "Brand Integration",
    titleAr: "تكامل العلامة التجارية",
    description: "Integrating brand elements, signage, and visual identity throughout the space.",
    descriptionAr: "دمج عناصر العلامة التجارية واللافتات والهوية البصرية في جميع أنحاء المساحة.",
  },
  {
    title: "Experience Optimization",
    titleAr: "تحسين التجربة",
    description: "Fine-tuning the space to ensure optimal user experience and brand impact.",
    descriptionAr: "ضبط المساحة لضمان تجربة المستخدم المثلى وتأثير العلامة التجارية.",
  },
]

const brandProjects = [
  {
    id: "tech-startup-office",
    title: "Tech Startup Office",
    titleAr: "مكتب شركة تقنية ناشئة",
    location: "New Capital",
    locationAr: "العاصمة الإدارية",
    image: "https://al-azab.co/images/service-8.png",
  },
  {
    id: "luxury-retail-store",
    title: "Luxury Retail Store",
    titleAr: "متجر تجزئة فاخر",
    location: "City Stars Mall",
    locationAr: "سيتي ستارز مول",
    image: "https://al-azab.co/images/service-9.png",
  },
  {
    id: "modern-restaurant",
    title: "Modern Restaurant",
    titleAr: "مطعم عصري",
    location: "Zamalek",
    locationAr: "الزمالك",
    image: "https://al-azab.co/images/service-10.png",
  },
]
