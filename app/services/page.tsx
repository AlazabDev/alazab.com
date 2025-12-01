"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle, Building2, Palette, Package, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ServicesPage() {
  const { language } = useLanguage()

  const services = [
    {
      title: language === "ar" ? "التشطيبات الفاخرة" : "Luxury Finishing",
      titleEn: "Luxury Finishing",
      description:
        language === "ar"
          ? "حلول التشطيب الراقية التي تحول مساحاتك إلى تحف فنية أنيقة مع أجود المواد والتصاميم الاستثنائية"
          : "High-end finishing solutions that transform your spaces into elegant masterpieces with the finest materials and exceptional designs",
      image: "https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/residential/1.jpg",
      link: "/services/luxury-finishing",
      icon: Sparkles,
    },
    {
      title: language === "ar" ? "الهوية التجارية" : "Brand Identity",
      titleEn: "Brand Identity",
      description:
        language === "ar"
          ? "تصميم وتنفيذ المساحات التجارية والمحلات بهوية بصرية متكاملة تعكس علامتك التجارية"
          : "Design and implementation of commercial spaces and stores with an integrated visual identity that reflects your brand",
      image: "https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/shops/abuauf_18.jpg",
      link: "/services/brand-identity",
      icon: Palette,
    },
    {
      title: language === "ar" ? "التوريدات العامة" : "General Supplies",
      titleEn: "General Supplies",
      description:
        language === "ar"
          ? "توفير جميع مواد البناء والتشطيب عالية الجودة من أفضل المصادر المحلية والعالمية"
          : "Providing all high-quality construction and finishing materials from the best local and international sources",
      image: "https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/projects/1.jpg",
      link: "/services/general-supplies",
      icon: Package,
    },
    {
      title: language === "ar" ? "البناء السكني" : "Residential Construction",
      titleEn: "Residential Construction",
      description:
        language === "ar"
          ? "بناء المنازل والفيلات والوحدات السكنية بأعلى معايير الجودة والأمان"
          : "Building homes, villas, and residential units with the highest quality and safety standards",
      image: "https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/construction/1.jpg",
      link: "/services/residential",
      icon: Building2,
    },
  ]

  const processSteps = [
    {
      title: language === "ar" ? "الاستشارة الأولية" : "Initial Consultation",
      description:
        language === "ar"
          ? "نبدأ باستشارة متعمقة لفهم رؤيتك ومتطلباتك وميزانيتك"
          : "We begin with an in-depth consultation to understand your vision, requirements, and budget",
    },
    {
      title: language === "ar" ? "التصميم والتخطيط" : "Design & Planning",
      description:
        language === "ar"
          ? "يقوم فريق التصميم بإنشاء مخططات تفصيلية وتصورات ثلاثية الأبعاد"
          : "Our design team creates detailed plans and 3D visualizations",
    },
    {
      title: language === "ar" ? "التنفيذ" : "Execution",
      description:
        language === "ar"
          ? "ينفذ حرفيونا المهرة المشروع مع اهتمام دقيق بالتفاصيل والجودة"
          : "Our skilled craftsmen execute the project with meticulous attention to detail and quality",
    },
    {
      title: language === "ar" ? "التسليم" : "Delivery",
      description:
        language === "ar"
          ? "نسلم مشروعك في الوقت المحدد مع ضمان شامل على جميع الأعمال"
          : "We deliver your project on time with comprehensive warranty on all work",
    },
  ]

  const benefits = [
    {
      title: language === "ar" ? "فريق ذو خبرة" : "Experienced Team",
      description:
        language === "ar"
          ? "فريقنا يجمع عقوداً من الخبرة في جميع جوانب البناء والتصميم"
          : "Our team brings decades of combined experience in all aspects of construction and design",
    },
    {
      title: language === "ar" ? "جودة الحرفية" : "Quality Craftsmanship",
      description:
        language === "ar"
          ? "نستخدم فقط أجود المواد والتقنيات لضمان المتانة والجمال"
          : "We use only the finest materials and techniques to ensure durability and aesthetic appeal",
    },
    {
      title: language === "ar" ? "التواصل الشفاف" : "Transparent Communication",
      description:
        language === "ar"
          ? "تحديثات منتظمة وتواصل مفتوح يبقيك على اطلاع طوال المشروع"
          : "Regular updates and open communication keep you informed throughout the project",
    },
    {
      title: language === "ar" ? "التسليم في الوقت المحدد" : "On-Time Delivery",
      description:
        language === "ar"
          ? "نفتخر بالالتزام بالمواعيد وتسليم المشاريع كما وعدنا"
          : "We pride ourselves on meeting deadlines and delivering projects as promised",
    },
    {
      title: language === "ar" ? "أسعار تنافسية" : "Competitive Pricing",
      description:
        language === "ar"
          ? "أسعار عادلة وشفافة بدون تكاليف خفية أو مفاجآت غير متوقعة"
          : "Fair, transparent pricing with no hidden costs or unexpected surprises",
    },
  ]

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
        <Image
          src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/construction/1.jpg"
          alt={language === "ar" ? "خدماتنا" : "Our Services"}
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {language === "ar" ? "خدماتنا" : "Our Services"}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {language === "ar"
                ? "حلول بناء وتشطيب شاملة مصممة خصيصاً لتلبية احتياجاتك ورؤيتك"
                : "Comprehensive construction and finishing solutions tailored to your specific needs and vision"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "ما نقدمه" : "What We Offer"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {language === "ar" ? "حلول بناء وتشطيب شاملة" : "Comprehensive Construction Solutions"}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {language === "ar"
                ? "من الفكرة إلى التنفيذ، نقدم خدمات شاملة لتحقيق رؤيتك بدقة وتميز"
                : "From concept to completion, we provide end-to-end services to bring your vision to life with precision and excellence"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <service.icon className="h-6 w-6 text-yellow-400" />
                      <h3 className="text-2xl font-bold">{service.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>
                  <Link href={service.link}>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black w-full">
                      {language === "ar" ? "اعرف المزيد" : "Learn More"}
                      <ArrowRight className={`h-4 w-4 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-medium mb-4">
              {language === "ar" ? "كيف نعمل" : "Our Process"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {language === "ar" ? "منهجية العمل" : "How We Work"}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {language === "ar"
                ? "عملية منظمة تضمن تجربة سلسة من الاستشارة الأولى حتى التسليم النهائي"
                : "Our streamlined process ensures a smooth experience from initial consultation to project completion"}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg"
                >
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-yellow-700 dark:text-yellow-400 font-bold text-xl">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images/residential/2.jpg"
                alt={language === "ar" ? "جودة العمل" : "Quality Work"}
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-medium mb-4">
                {language === "ar" ? "لماذا نحن" : "Why Choose Us"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === "ar" ? "الفرق مع العزب للإنشاءات" : "The Al-Azab Difference"}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                {language === "ar"
                  ? "عندما تختار العزب للإنشاءات، فأنت تختار شريكاً ملتزماً بالتميز والابتكار ورضاك الكامل"
                  : "When you choose Al-Azab Construction, you're choosing a partner committed to excellence, innovation, and your complete satisfaction"}
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className={language === "ar" ? "mr-3" : "ml-3"}>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {language === "ar" ? "هل أنت مستعد لبدء مشروعك؟" : "Ready to Start Your Project?"}
            </h2>
            <p className="text-yellow-100 text-lg max-w-2xl mx-auto mb-10">
              {language === "ar"
                ? "اتصل بنا اليوم للحصول على استشارة مجانية واكتشف كيف يمكننا تحقيق رؤيتك"
                : "Contact us today for a free consultation and discover how we can bring your vision to life"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 font-bold px-8">
                  {language === "ar" ? "احصل على عرض سعر مجاني" : "Get a Free Quote"}
                  <ArrowRight className={`h-5 w-5 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                </Button>
              </Link>
              <Link href="/uberfix">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 font-bold px-8 bg-transparent"
                >
                  {language === "ar" ? "خدمات الصيانة - UberFix" : "Maintenance - UberFix"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
