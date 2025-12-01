"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import {
  Wrench,
  Smartphone,
  Globe,
  Star,
  Clock,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Download,
  Play,
  Zap,
  HeartHandshake,
  Award,
  MapPin,
} from "lucide-react"

const SUPABASE_STORAGE_URL = "https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images"

export default function UberFixPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"

  const features = [
    {
      icon: Clock,
      titleAr: "خدمة سريعة",
      titleEn: "Fast Service",
      descAr: "احصل على فني متخصص في غضون ساعات قليلة",
      descEn: "Get a specialized technician within hours",
    },
    {
      icon: Shield,
      titleAr: "ضمان الجودة",
      titleEn: "Quality Guarantee",
      descAr: "جميع أعمالنا مضمونة لراحة بالك",
      descEn: "All our work is guaranteed for your peace of mind",
    },
    {
      icon: Users,
      titleAr: "فنيون معتمدون",
      titleEn: "Certified Technicians",
      descAr: "فريق من الفنيين المدربين والمعتمدين",
      descEn: "Team of trained and certified technicians",
    },
    {
      icon: Zap,
      titleAr: "أسعار شفافة",
      titleEn: "Transparent Pricing",
      descAr: "لا رسوم خفية - اعرف السعر مقدماً",
      descEn: "No hidden fees - know the price upfront",
    },
  ]

  const services = [
    {
      titleAr: "السباكة",
      titleEn: "Plumbing",
      image: `${SUPABASE_STORAGE_URL}/maintenance/2008390_pi_bd_5650a_273468_crop.jpg`,
    },
    {
      titleAr: "الكهرباء",
      titleEn: "Electrical",
      image: `${SUPABASE_STORAGE_URL}/uberfix/electrical.jpg`,
    },
    {
      titleAr: "التكييف",
      titleEn: "HVAC",
      image: `${SUPABASE_STORAGE_URL}/uberfix/hvac.jpg`,
    },
    {
      titleAr: "النجارة",
      titleEn: "Carpentry",
      image: `${SUPABASE_STORAGE_URL}/uberfix/carpentry.jpg`,
    },
    {
      titleAr: "الدهانات",
      titleEn: "Painting",
      image: `${SUPABASE_STORAGE_URL}/uberfix/painting.jpg`,
    },
    {
      titleAr: "التنظيف",
      titleEn: "Cleaning",
      image: `${SUPABASE_STORAGE_URL}/uberfix/cleaning.jpg`,
    },
  ]

  const stats = [
    { valueAr: "+5000", valueEn: "5000+", labelAr: "عميل سعيد", labelEn: "Happy Customers" },
    { valueAr: "+500", valueEn: "500+", labelAr: "فني معتمد", labelEn: "Certified Technicians" },
    { valueAr: "+20", valueEn: "20+", labelAr: "خدمة متنوعة", labelEn: "Service Types" },
    { valueAr: "24/7", valueEn: "24/7", labelAr: "دعم متواصل", labelEn: "Support Available" },
  ]

  const technicianBenefits = [
    {
      icon: HeartHandshake,
      titleAr: "مرونة في العمل",
      titleEn: "Work Flexibility",
      descAr: "اختر أوقات عملك وجدولك الخاص",
      descEn: "Choose your own working hours and schedule",
    },
    {
      icon: Award,
      titleAr: "دخل مجزي",
      titleEn: "Rewarding Income",
      descAr: "احصل على عمولات تنافسية عن كل مهمة",
      descEn: "Get competitive commissions for each task",
    },
    {
      icon: Users,
      titleAr: "قاعدة عملاء واسعة",
      titleEn: "Wide Customer Base",
      descAr: "وصول لآلاف العملاء المحتملين",
      descEn: "Access to thousands of potential customers",
    },
    {
      icon: Shield,
      titleAr: "تأمين وحماية",
      titleEn: "Insurance & Protection",
      descAr: "تأمين شامل أثناء العمل",
      descEn: "Comprehensive insurance during work",
    },
  ]

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23eab308' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-start"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6"
              >
                <Wrench className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">
                  {isRTL ? "تطبيق الصيانات الأول في مصر" : "Egypt's #1 Maintenance App"}
                </span>
              </motion.div>

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <h1 className="text-6xl md:text-7xl font-black">
                  <span className="text-white">Uber</span>
                  <span className="text-yellow-400">Fix</span>
                </h1>
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6">
                {isRTL ? "كل خدمات الصيانة في تطبيق واحد" : "All Maintenance Services in One App"}
              </h2>

              <p className="text-lg text-gray-400 mb-8 max-w-xl">
                {isRTL
                  ? "احجز فني متخصص في دقائق. سباكة، كهرباء، تكييف، نجارة وأكثر. خدمة موثوقة بأسعار شفافة."
                  : "Book a specialized technician in minutes. Plumbing, electrical, HVAC, carpentry and more. Reliable service with transparent pricing."}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="https://uberfix.shop" target="_blank">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-yellow-500/25 w-full sm:w-auto"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    {isRTL ? "زيارة الموقع" : "Visit Website"}
                  </Button>
                </Link>
                <Link href="https://uberfix.shop" target="_blank">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 px-8 py-6 text-lg rounded-xl w-full sm:w-auto bg-transparent"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    {isRTL ? "تحميل التطبيق" : "Download App"}
                  </Button>
                </Link>
              </div>

              {/* App Store Badges */}
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>4.9</span>
                  <span className="text-gray-600">|</span>
                  <span>{isRTL ? "+10K تحميل" : "10K+ Downloads"}</span>
                </div>
              </div>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative mx-auto w-72 md:w-80">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-yellow-500/30 blur-3xl rounded-full" />

                {/* Phone Frame */}
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-700">
                  <div className="bg-black rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    <Image
                      src={`${SUPABASE_STORAGE_URL}/uberfix/app-screenshot.jpg`}
                      alt="UberFix App"
                      width={320}
                      height={680}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/mobile-app-maintenance-services-interface.jpg"
                      }}
                    />
                  </div>
                  {/* Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-4 -right-4 bg-green-500 text-white rounded-xl px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{isRTL ? "تم الحجز" : "Booked!"}</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-yellow-500 text-black rounded-xl px-4 py-2 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{isRTL ? "30 دقيقة" : "30 mins"}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-yellow-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-black mb-2">
                  {isRTL ? stat.valueAr : stat.valueEn}
                </div>
                <div className="text-black/70 font-medium">{isRTL ? stat.labelAr : stat.labelEn}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isRTL ? "لماذا تختار UberFix؟" : "Why Choose UberFix?"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isRTL
                ? "نقدم لك أفضل تجربة صيانة منزلية مع فنيين محترفين وأسعار شفافة"
                : "We provide the best home maintenance experience with professional technicians and transparent pricing"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{isRTL ? feature.titleAr : feature.titleEn}</h3>
                      <p className="text-gray-400">{isRTL ? feature.descAr : feature.descEn}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{isRTL ? "خدماتنا" : "Our Services"}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isRTL
                ? "مجموعة شاملة من خدمات الصيانة المنزلية تحت سقف واحد"
                : "A comprehensive range of home maintenance services under one roof"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={isRTL ? service.titleAr : service.titleEn}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=200&width=200&query=${service.titleEn} maintenance service`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-center">{isRTL ? service.titleAr : service.titleEn}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technician Registration Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-6">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">{isRTL ? "انضم لفريقنا" : "Join Our Team"}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {isRTL ? "هل أنت فني محترف؟" : "Are You a Professional Technician?"}
              </h2>

              <p className="text-lg text-gray-400 mb-8">
                {isRTL
                  ? "انضم إلى شبكة فنيي UberFix واحصل على فرص عمل مستمرة، دخل مجزي، ومرونة كاملة في جدولك."
                  : "Join the UberFix technician network and get continuous work opportunities, rewarding income, and complete flexibility in your schedule."}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {technicianBenefits.map((benefit, index) => {
                  const Icon = benefit.icon
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{isRTL ? benefit.titleAr : benefit.titleEn}</h4>
                        <p className="text-sm text-gray-400">{isRTL ? benefit.descAr : benefit.descEn}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Link href="https://uberfix.shop/technician-register" target="_blank">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-6 text-lg rounded-xl"
                >
                  {isRTL ? "سجل كفني الآن" : "Register as Technician"}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </Button>
              </Link>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                `${SUPABASE_STORAGE_URL}/maintenance/technician1.jpg`,
                `${SUPABASE_STORAGE_URL}/maintenance/technician2.jpg`,
                `${SUPABASE_STORAGE_URL}/maintenance/technician3.jpg`,
                `${SUPABASE_STORAGE_URL}/maintenance/technician4.jpg`,
              ].map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative aspect-square rounded-2xl overflow-hidden ${index === 1 || index === 2 ? "mt-8" : ""}`}
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt="UberFix Technician"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=300&width=300&query=professional technician working ${index + 1}`
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isRTL ? "معرض أعمالنا" : "Our Work Gallery"}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isRTL
                ? "نماذج من أعمال الصيانة والإصلاح التي أنجزها فريقنا"
                : "Samples of maintenance and repair work completed by our team"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={`${SUPABASE_STORAGE_URL}/maintenance/work${index}.jpg`}
                  alt={`Work Sample ${index}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=300&width=300&query=home maintenance work sample ${index}`
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              {isRTL ? "جاهز لتجربة أفضل خدمة صيانة؟" : "Ready for the Best Maintenance Experience?"}
            </h2>
            <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
              {isRTL
                ? "حمّل تطبيق UberFix الآن واحصل على خصم 20% على أول طلب"
                : "Download UberFix app now and get 20% off your first order"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://uberfix.shop" target="_blank">
                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-900 text-white font-bold px-8 py-6 text-lg rounded-xl w-full sm:w-auto"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  {isRTL ? "زيارة الموقع" : "Visit Website"}
                </Button>
              </Link>
              <Link href="https://uberfix.shop" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black/10 px-8 py-6 text-lg rounded-xl w-full sm:w-auto bg-transparent"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {isRTL ? "تحميل التطبيق" : "Download App"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            {isRTL
              ? "UberFix هو تطبيق مستقل للصيانات المنزلية - شراكة استراتيجية مع شركة العزب للإنشاءات"
              : "UberFix is an independent home maintenance app - Strategic partnership with Al-Azab Construction"}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400">{isRTL ? "متاح في جميع أنحاء مصر" : "Available throughout Egypt"}</span>
          </div>
        </div>
      </section>
    </div>
  )
}
