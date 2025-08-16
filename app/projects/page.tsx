"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"

export default function ProjectsPage() {
  const { t, language } = useLanguage()

  return (
    <div className={`flex min-h-screen flex-col ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
        <Image
          src="https://al-azab.co/images/cuate-23.png"
          alt="Construction projects"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full text-amber-300 text-sm font-medium mb-6">
              {language === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {language === "ar" ? "مشاريعنا المميزة" : "Our Featured Projects"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "استكشف محفظة مشاريعنا الناجحة التي تعرض خبرتنا والتزامنا بالتميز في جميع المجالات"
                : "Explore our portfolio of successful projects that showcase our expertise and commitment to excellence across all sectors"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery */}
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
              {language === "ar" ? "معرض أعمالنا" : "Our Portfolio"}
            </div>
            <h2 className="text-4xl font-bold mb-6">{language === "ar" ? "مشاريع مميزة" : "Featured Projects"}</h2>
            <p className="text-lg text-gray-700">
              {language === "ar"
                ? "تصفح محفظة مشاريعنا المتنوعة المكتملة عبر القطاعات المختلفة"
                : "Browse through our diverse portfolio of completed projects across various sectors"}
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="all" className="mb-12">
              <div className="flex justify-center overflow-x-auto pb-2 -mx-4 px-4">
                <TabsList className="flex space-x-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger value="all" className="px-6 py-3 text-sm rounded-md font-medium">
                    {language === "ar" ? "الكل" : "All"}
                  </TabsTrigger>
                  <TabsTrigger value="luxury" className="px-6 py-3 text-sm rounded-md font-medium">
                    {language === "ar" ? "التشطيبات الفاخرة" : "Luxury Finishing"}
                  </TabsTrigger>
                  <TabsTrigger value="brand" className="px-6 py-3 text-sm rounded-md font-medium">
                    {language === "ar" ? "الهوية التجارية" : "Brand Identity"}
                  </TabsTrigger>
                  <TabsTrigger value="maintenance" className="px-6 py-3 text-sm rounded-md font-medium">
                    {language === "ar" ? "الصيانة والتجديد" : "Maintenance"}
                  </TabsTrigger>
                  <TabsTrigger value="supplies" className="px-6 py-3 text-sm rounded-md font-medium">
                    {language === "ar" ? "التوريدات" : "Supplies"}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {alAzabProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="luxury" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {alAzabProjects
                    .filter((project) => project.category === "luxury")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="brand" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {alAzabProjects
                    .filter((project) => project.category === "brand")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {alAzabProjects
                    .filter((project) => project.category === "maintenance")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="supplies" className="mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {alAzabProjects
                    .filter((project) => project.category === "supplies")
                    .map((project, index) => (
                      <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50/30">
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
                {language === "ar" ? "منهجيتنا" : "Our Approach"}
              </div>
              <h2 className="text-4xl font-bold mb-6">
                {language === "ar" ? "كيف نحقق التميز" : "How We Deliver Excellence"}
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                {language === "ar"
                  ? "كل مشروع نتولاه يتبع عملية صارمة لضمان الجودة والالتزام بالمواعيد ورضا العملاء"
                  : "Every project we undertake follows a rigorous process to ensure quality, timeliness, and client satisfaction"}
              </p>
              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{language === "ar" ? step.titleAr : step.title}</h3>
                      <p className="text-gray-700">{language === "ar" ? step.descriptionAr : step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative h-[500px] rounded-3xl overflow-hidden shadow-2xl ${language === "ar" ? "order-1 md:order-2" : ""}`}
            >
              <Image
                src="https://al-azab.co/images/service-1.png"
                alt="Construction process"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
            </motion.div>
          </div>
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
              {language === "ar" ? "هل أنت مستعد لبدء مشروعك؟" : "Ready to Start Your Project?"}
            </h2>
            <p className="text-amber-100 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              {language === "ar"
                ? "اتصل بنا اليوم لمناقشة كيف يمكننا تحقيق رؤيتك بنفس التميز المعروض في معرض أعمالنا"
                : "Contact us today to discuss how we can bring your vision to life with the same excellence showcased in our portfolio"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-xl"
                >
                  {language === "ar" ? "تواصل معنا" : "Get in Touch"}
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

// Project Card Component
function ProjectCard({ project, index }) {
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden group h-full hover:shadow-2xl transition-all duration-500 border border-gray-100">
        <div className="relative h-64 w-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={language === "ar" ? project.titleAr : project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-6 w-full">
              <h3 className="text-xl font-bold text-white mb-2">
                {language === "ar" ? project.titleAr : project.title}
              </h3>
              <p className="text-amber-300 mb-4">{language === "ar" ? project.categoryAr : project.categoryEn}</p>
              <Link href={`/projects/${project.id}`}>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white/20 backdrop-blur-sm bg-transparent"
                >
                  {language === "ar" ? "عرض التفاصيل" : "View Details"}
                  <ArrowRight className={`h-4 w-4 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <CardHeader className="p-6">
          <CardTitle className="text-xl">{language === "ar" ? project.titleAr : project.title}</CardTitle>
          <CardDescription className="text-amber-600">
            {language === "ar" ? project.categoryAr : project.categoryEn}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-gray-700 leading-relaxed">
            {language === "ar" ? project.descriptionAr : project.description}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Link href={`/projects/${project.id}`}>
            <Button
              variant="outline"
              className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white w-full bg-transparent"
            >
              {language === "ar" ? "عرض التفاصيل" : "View Details"}
              <ArrowRight className={`h-4 w-4 ${language === "ar" ? "mr-2 rotate-180" : "ml-2"}`} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// Process steps data
const processSteps = [
  {
    title: "Thorough Planning",
    titleAr: "التخطيط الشامل",
    description: "We begin with comprehensive planning to establish clear objectives, timelines, and budgets.",
    descriptionAr: "نبدأ بالتخطيط الشامل لوضع أهداف واضحة وجداول زمنية وميزانيات محددة.",
  },
  {
    title: "Quality Materials",
    titleAr: "مواد عالية الجودة",
    description: "We source only the highest quality materials to ensure durability and longevity.",
    descriptionAr: "نحصل على أجود المواد فقط لضمان المتانة والاستدامة.",
  },
  {
    title: "Expert Execution",
    titleAr: "التنفيذ الخبير",
    description: "Our skilled team executes each phase with precision and attention to detail.",
    descriptionAr: "فريقنا الماهر ينفذ كل مرحلة بدقة واهتمام بالتفاصيل.",
  },
  {
    title: "Quality Control",
    titleAr: "مراقبة الجودة",
    description: "We conduct thorough inspections at every stage to maintain our high standards.",
    descriptionAr: "نجري فحوصات شاملة في كل مرحلة للحفاظ على معاييرنا العالية.",
  },
]

// Al-Azab Construction Projects Data
const alAzabProjects = [
  // Luxury Finishing Projects
  {
    id: "luxury-penthouse-zamalek",
    title: "Luxury Penthouse Zamalek",
    titleAr: "بنتهاوس فاخر بالزمالك",
    category: "luxury",
    categoryEn: "Luxury Finishing",
    categoryAr: "التشطيبات الفاخرة",
    description: "Premium penthouse with Italian marble, custom millwork, and designer lighting systems.",
    descriptionAr: "بنتهاوس متميز بالرخام الإيطالي والأعمال الخشبية المخصصة وأنظمة الإضاءة المصممة.",
    image: "https://al-azab.co/images/service-1.png",
  },
  {
    id: "luxury-villa-new-capital",
    title: "Executive Villa New Capital",
    titleAr: "فيلا تنفيذية بالعاصمة الإدارية",
    category: "luxury",
    categoryEn: "Luxury Finishing",
    categoryAr: "التشطيبات الفاخرة",
    description: "Modern villa featuring high-end finishes, smart home technology, and premium materials.",
    descriptionAr: "فيلا عصرية تتميز بالتشطيبات الراقية وتقنية المنزل الذكي والمواد المتميزة.",
    image: "https://al-azab.co/images/service-2.png",
  },
  {
    id: "luxury-apartment-maadi",
    title: "Luxury Apartment Maadi",
    titleAr: "شقة فاخرة بالمعادي",
    category: "luxury",
    categoryEn: "Luxury Finishing",
    categoryAr: "التشطيبات الفاخرة",
    description: "Sophisticated apartment with custom cabinetry, premium flooring, and elegant lighting.",
    descriptionAr: "شقة أنيقة بالخزائن المخصصة والأرضيات المتميزة والإضاءة الأنيقة.",
    image: "https://al-azab.co/images/service-3.png",
  },
  {
    id: "luxury-duplex-heliopolis",
    title: "Luxury Duplex Heliopolis",
    titleAr: "دوبلكس فاخر بمصر الجديدة",
    category: "luxury",
    categoryEn: "Luxury Finishing",
    categoryAr: "التشطيبات الفاخرة",
    description: "Two-story luxury duplex with marble staircases, premium fixtures, and custom design elements.",
    descriptionAr: "دوبلكس فاخر من طابقين بسلالم رخامية وتجهيزات متميزة وعناصر تصميم مخصصة.",
    image: "https://al-azab.co/images/service-4.png",
  },
  {
    id: "luxury-townhouse-compound",
    title: "Luxury Townhouse Compound",
    titleAr: "تاون هاوس فاخر بكمبوند",
    category: "luxury",
    categoryEn: "Luxury Finishing",
    categoryAr: "التشطيبات الفاخرة",
    description: "Premium townhouse with landscaped gardens, luxury finishes, and modern amenities.",
    descriptionAr: "تاون هاوس متميز بحدائق منسقة وتشطيبات فاخرة ووسائل راحة عصرية.",
    image: "https://al-azab.co/images/service-5.png",
  },
  {
    id: "luxury-studio-downtown",
    title: "Designer Studio Downtown",
    titleAr: "استوديو مصمم وسط البلد",
    category: "luxury",
    categoryEn: "Luxury Finishing",
    categoryAr: "التشطيبات الفاخرة",
    description: "Compact luxury studio with space-maximizing design and premium finishes throughout.",
    descriptionAr: "استوديو فاخر مدمج بتصميم يعظم المساحة وتشطيبات متميزة في كل مكان.",
    image: "https://al-azab.co/images/service-6.png",
  },

  // Brand Identity Projects
  {
    id: "tech-startup-office",
    title: "Tech Startup Office",
    titleAr: "مكتب شركة تقنية ناشئة",
    category: "brand",
    categoryEn: "Brand Identity",
    categoryAr: "الهوية التجارية",
    description: "Modern office space reflecting innovative company culture with branded elements throughout.",
    descriptionAr: "مساحة مكتبية عصرية تعكس ثقافة الشركة المبتكرة مع عناصر العلامة التجارية في كل مكان.",
    image: "https://al-azab.co/images/service-7.png",
  },
  {
    id: "luxury-retail-store",
    title: "Luxury Retail Store",
    titleAr: "متجر تجزئة فاخر",
    category: "brand",
    categoryEn: "Brand Identity",
    categoryAr: "الهوية التجارية",
    description: "High-end retail space designed to enhance customer experience and brand perception.",
    descriptionAr: "مساحة تجزئة راقية مصممة لتعزيز تجربة العملاء وإدراك العلامة التجارية.",
    image: "https://al-azab.co/images/service-8.png",
  },
  {
    id: "modern-restaurant",
    title: "Modern Restaurant",
    titleAr: "مطعم عصري",
    category: "brand",
    categoryEn: "Brand Identity",
    categoryAr: "الهوية التجارية",
    description: "Contemporary restaurant design that creates memorable dining experiences and brand loyalty.",
    descriptionAr: "تصميم مطعم معاصر يخلق تجارب طعام لا تُنسى وولاء للعلامة التجارية.",
    image: "https://al-azab.co/images/service-9.png",
  },
  {
    id: "corporate-headquarters",
    title: "Corporate Headquarters",
    titleAr: "المقر الرئيسي للشركة",
    category: "brand",
    categoryEn: "Brand Identity",
    categoryAr: "الهوية التجارية",
    description: "Executive headquarters showcasing company values and professional excellence.",
    descriptionAr: "مقر تنفيذي يعرض قيم الشركة والتميز المهني.",
    image: "https://al-azab.co/images/service-10.png",
  },
  {
    id: "medical-clinic-design",
    title: "Medical Clinic Design",
    titleAr: "تصميم عيادة طبية",
    category: "brand",
    categoryEn: "Brand Identity",
    categoryAr: "الهوية التجارية",
    description: "Healthcare facility designed to promote wellness and trust through thoughtful branding.",
    descriptionAr: "منشأة رعاية صحية مصممة لتعزيز العافية والثقة من خلال العلامة التجارية المدروسة.",
    image: "https://al-azab.co/images/service-1.png",
  },
  {
    id: "educational-center",
    title: "Educational Center",
    titleAr: "مركز تعليمي",
    category: "brand",
    categoryEn: "Brand Identity",
    categoryAr: "الهوية التجارية",
    description: "Learning environment that inspires creativity and reflects educational excellence.",
    descriptionAr: "بيئة تعلم تلهم الإبداع وتعكس التميز التعليمي.",
    image: "https://al-azab.co/images/service-2.png",
  },

  // Maintenance & Renovations Projects
  {
    id: "office-building-renovation",
    title: "Office Building Renovation",
    titleAr: "تجديد مبنى مكاتب",
    category: "maintenance",
    categoryEn: "Maintenance & Renovations",
    categoryAr: "الصيانة والتجديدات",
    description: "Complete renovation of 10-story office building with modern systems and energy efficiency.",
    descriptionAr: "تجديد كامل لمبنى مكاتب من 10 طوابق بأنظمة حديثة وكفاءة في الطاقة.",
    image: "https://al-azab.co/images/service-3.png",
  },
  {
    id: "residential-complex-maintenance",
    title: "Residential Complex Maintenance",
    titleAr: "صيانة مجمع سكني",
    category: "maintenance",
    categoryEn: "Maintenance & Renovations",
    categoryAr: "الصيانة والتجديدات",
    description: "Comprehensive maintenance program for 200-unit residential complex including all systems.",
    descriptionAr: "برنامج صيانة شامل لمجمع سكني من 200 وحدة يشمل جميع الأنظمة.",
    image: "https://al-azab.co/images/service-4.png",
  },
  {
    id: "commercial-space-upgrade",
    title: "Commercial Space Upgrade",
    titleAr: "ترقية مساحة تجارية",
    category: "maintenance",
    categoryEn: "Maintenance & Renovations",
    categoryAr: "الصيانة والتجديدات",
    description: "Modern upgrade of commercial space with new HVAC, lighting, and interior systems.",
    descriptionAr: "ترقية عصرية للمساحة التجارية بأنظمة تكييف وإضاءة وداخلية جديدة.",
    image: "https://al-azab.co/images/service-5.png",
  },
  {
    id: "historic-building-restoration",
    title: "Historic Building Restoration",
    titleAr: "ترميم مبنى تاريخي",
    category: "maintenance",
    categoryEn: "Maintenance & Renovations",
    categoryAr: "الصيانة والتجديدات",
    description: "Careful restoration preserving historical character while updating safety and functionality.",
    descriptionAr: "ترميم دقيق يحافظ على الطابع التاريخي مع تحديث السلامة والوظائف.",
    image: "https://al-azab.co/images/service-6.png",
  },
  {
    id: "industrial-facility-upgrade",
    title: "Industrial Facility Upgrade",
    titleAr: "ترقية منشأة صناعية",
    category: "maintenance",
    categoryEn: "Maintenance & Renovations",
    categoryAr: "الصيانة والتجديدات",
    description: "Complete systems upgrade for manufacturing facility including safety and efficiency improvements.",
    descriptionAr: "ترقية كاملة للأنظمة لمنشأة تصنيع تشمل تحسينات السلامة والكفاءة.",
    image: "https://al-azab.co/images/service-7.png",
  },
  {
    id: "hotel-renovation-project",
    title: "Hotel Renovation Project",
    titleAr: "مشروع تجديد فندق",
    category: "maintenance",
    categoryEn: "Maintenance & Renovations",
    categoryAr: "الصيانة والتجديدات",
    description: "Luxury hotel renovation with updated guest rooms, lobby, and all hospitality systems.",
    descriptionAr: "تجديد فندق فاخر بغرف ضيوف محدثة وردهة وجميع أنظمة الضيافة.",
    image: "https://al-azab.co/images/service-8.png",
  },

  // General Supplies Projects
  {
    id: "residential-complex-supply",
    title: "Residential Complex Supply",
    titleAr: "توريد مجمع سكني",
    category: "supplies",
    categoryEn: "General Supplies",
    categoryAr: "التوريدات العامة",
    description: "Complete material supply for 300-unit residential development including all construction materials.",
    descriptionAr: "توريد مواد كامل لتطوير سكني من 300 وحدة يشمل جميع مواد البناء.",
    image: "https://al-azab.co/images/service-9.png",
  },
  {
    id: "commercial-tower-materials",
    title: "Commercial Tower Materials",
    titleAr: "مواد برج تجاري",
    category: "supplies",
    categoryEn: "General Supplies",
    categoryAr: "التوريدات العامة",
    description: "High-grade materials supply for 40-story commercial tower including steel, concrete, and finishes.",
    descriptionAr: "توريد مواد عالية الجودة لبرج تجاري من 40 طابق يشمل الصلب والخرسانة والتشطيبات.",
    image: "https://al-azab.co/images/service-10.png",
  },
  {
    id: "industrial-facility-equipment",
    title: "Industrial Facility Equipment",
    titleAr: "معدات منشأة صناعية",
    category: "supplies",
    categoryEn: "General Supplies",
    categoryAr: "التوريدات العامة",
    description: "Specialized equipment and materials supply for large-scale industrial manufacturing facility.",
    descriptionAr: "توريد معدات ومواد متخصصة لمنشأة تصنيع صناعية واسعة النطاق.",
    image: "https://al-azab.co/images/service-1.png",
  },
  {
    id: "infrastructure-project-supply",
    title: "Infrastructure Project Supply",
    titleAr: "توريد مشروع بنية تحتية",
    category: "supplies",
    categoryEn: "General Supplies",
    categoryAr: "التوريدات العامة",
    description: "Comprehensive supply chain management for major infrastructure development project.",
    descriptionAr: "إدارة شاملة لسلسلة التوريد لمشروع تطوير بنية تحتية كبير.",
    image: "https://al-azab.co/images/service-2.png",
  },
  {
    id: "hospital-construction-supply",
    title: "Hospital Construction Supply",
    titleAr: "توريد إنشاء مستشفى",
    category: "supplies",
    categoryEn: "General Supplies",
    categoryAr: "التوريدات العامة",
    description: "Medical-grade materials and specialized equipment supply for new hospital construction.",
    descriptionAr: "توريد مواد طبية ومعدات متخصصة لإنشاء مستشفى جديد.",
    image: "https://al-azab.co/images/service-3.png",
  },
  {
    id: "educational-campus-supply",
    title: "Educational Campus Supply",
    titleAr: "توريد حرم تعليمي",
    category: "supplies",
    categoryEn: "General Supplies",
    categoryAr: "التوريدات العامة",
    description: "Complete materials and equipment supply for multi-building educational campus development.",
    descriptionAr: "توريد كامل للمواد والمعدات لتطوير حرم تعليمي متعدد المباني.",
    image: "https://al-azab.co/images/service-4.png",
  },
]
