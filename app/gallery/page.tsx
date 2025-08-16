"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter, Grid3X3, Grid2X2, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

// Gallery categories and images
const galleryCategories = [
  { id: "all", nameEn: "All Projects", nameAr: "جميع المشاريع" },
  { id: "luxury", nameEn: "Luxury Finishing", nameAr: "التشطيبات الفاخرة" },
  { id: "brand", nameEn: "Brand Identity", nameAr: "الهوية التجارية" },
  { id: "maintenance", nameEn: "Maintenance & Renovations", nameAr: "الصيانة والتجديدات" },
  { id: "supplies", nameEn: "General Supplies", nameAr: "التوريدات العامة" },
]

const galleryImages = [
  {
    id: 1,
    src: "https://al-azab.co/images/service-1.png",
    category: "luxury",
    titleEn: "Luxury Villa Interior",
    titleAr: "تشطيب فيلا فاخرة",
    descriptionEn: "High-end interior finishing with premium materials",
    descriptionAr: "تشطيب داخلي راقي بمواد عالية الجودة",
  },
  {
    id: 2,
    src: "https://al-azab.co/images/service-2.png",
    category: "brand",
    titleEn: "Corporate Office Design",
    titleAr: "تصميم مكتب شركة",
    descriptionEn: "Modern office space reflecting brand identity",
    descriptionAr: "مساحة مكتبية عصرية تعكس هوية العلامة التجارية",
  },
  {
    id: 3,
    src: "https://al-azab.co/images/service-3.png",
    category: "maintenance",
    titleEn: "Building Renovation",
    titleAr: "تجديد مبنى",
    descriptionEn: "Complete renovation and modernization project",
    descriptionAr: "مشروع تجديد وتحديث شامل",
  },
  {
    id: 4,
    src: "https://al-azab.co/images/service-4.png",
    category: "supplies",
    titleEn: "Construction Materials Supply",
    titleAr: "توريد مواد البناء",
    descriptionEn: "Premium construction materials and equipment",
    descriptionAr: "مواد ومعدات بناء عالية الجودة",
  },
  {
    id: 5,
    src: "https://al-azab.co/images/service-5.png",
    category: "luxury",
    titleEn: "Luxury Bathroom Design",
    titleAr: "تصميم حمام فاخر",
    descriptionEn: "Elegant bathroom with premium fixtures",
    descriptionAr: "حمام أنيق بتجهيزات فاخرة",
  },
  {
    id: 6,
    src: "https://al-azab.co/images/service-6.png",
    category: "brand",
    titleEn: "Restaurant Interior",
    titleAr: "تصميم مطعم",
    descriptionEn: "Restaurant design reflecting culinary brand",
    descriptionAr: "تصميم مطعم يعكس هوية العلامة التجارية",
  },
  {
    id: 7,
    src: "https://al-azab.co/images/service-7.png",
    category: "maintenance",
    titleEn: "Facade Restoration",
    titleAr: "ترميم واجهة",
    descriptionEn: "Professional facade restoration and maintenance",
    descriptionAr: "ترميم وصيانة واجهات احترافية",
  },
  {
    id: 8,
    src: "https://al-azab.co/images/service-8.png",
    category: "supplies",
    titleEn: "Equipment Installation",
    titleAr: "تركيب المعدات",
    descriptionEn: "Professional equipment installation services",
    descriptionAr: "خدمات تركيب المعدات الاحترافية",
  },
  {
    id: 9,
    src: "https://al-azab.co/images/service-9.png",
    category: "luxury",
    titleEn: "Modern Kitchen Design",
    titleAr: "تصميم مطبخ عصري",
    descriptionEn: "Contemporary kitchen with luxury finishes",
    descriptionAr: "مطبخ عصري بتشطيبات فاخرة",
  },
  {
    id: 10,
    src: "https://al-azab.co/images/service-10.png",
    category: "brand",
    titleEn: "Retail Store Design",
    titleAr: "تصميم متجر",
    descriptionEn: "Retail space designed for brand experience",
    descriptionAr: "مساحة تجارية مصممة لتجربة العلامة التجارية",
  },
  // Additional professional images
  {
    id: 11,
    src: "/luxury-living-room.png",
    category: "luxury",
    titleEn: "Luxury Living Room",
    titleAr: "صالة معيشة فاخرة",
    descriptionEn: "Sophisticated living space with premium materials",
    descriptionAr: "مساحة معيشة راقية بمواد عالية الجودة",
  },
  {
    id: 12,
    src: "/modern-office-exterior.png",
    category: "brand",
    titleEn: "Corporate Building",
    titleAr: "مبنى شركة",
    descriptionEn: "Modern corporate building design",
    descriptionAr: "تصميم مبنى شركة عصري",
  },
  {
    id: 13,
    src: "/construction-site-renovation.png",
    category: "maintenance",
    titleEn: "Site Renovation",
    titleAr: "تجديد موقع",
    descriptionEn: "Large-scale renovation and upgrade project",
    descriptionAr: "مشروع تجديد وترقية واسع النطاق",
  },
  {
    id: 14,
    src: "/construction-warehouse.png",
    category: "supplies",
    titleEn: "Materials Warehouse",
    titleAr: "مستودع المواد",
    descriptionEn: "Organized construction materials storage",
    descriptionAr: "تخزين منظم لمواد البناء",
  },
  {
    id: 15,
    src: "/luxury-hotel-lobby.png",
    category: "luxury",
    titleEn: "Hotel Lobby Design",
    titleAr: "تصميم لوبي فندق",
    descriptionEn: "Elegant hotel lobby with luxury finishes",
    descriptionAr: "لوبي فندق أنيق بتشطيبات فاخرة",
  },
]

const layoutOptions = [
  { id: "grid", icon: Grid3X3, cols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" },
  { id: "large", icon: Grid2X2, cols: "grid-cols-1 md:grid-cols-2" },
  { id: "masonry", icon: LayoutGrid, cols: "columns-1 md:columns-2 lg:columns-3" },
]

export default function GalleryPage() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [layout, setLayout] = useState("grid")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openModal = (imageId: number) => {
    setSelectedImage(imageId)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = "unset"
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex].id)
  }

  const selectedImageData = selectedImage ? filteredImages.find((img) => img.id === selectedImage) : null

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
            {language === "ar" ? "معرض أعمالنا" : "Our Gallery"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {language === "ar"
              ? "استكشف مجموعة من أفضل مشاريعنا وإنجازاتنا في مجال الإنشاءات والتشطيبات"
              : "Explore our finest construction and finishing projects showcasing excellence and innovation"}
          </p>
        </motion.div>
      </section>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div
          className={`flex flex-col md:flex-row gap-4 items-center justify-between ${language === "ar" ? "md:flex-row-reverse" : ""}`}
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50"
                } transition-all duration-300`}
              >
                <Filter className={`w-4 h-4 ${language === "ar" ? "ml-2" : "mr-2"}`} />
                {language === "ar" ? category.nameAr : category.nameEn}
              </Button>
            ))}
          </div>

          {/* Layout Options */}
          <div className="flex gap-2">
            {layoutOptions.map((option) => (
              <Button
                key={option.id}
                variant={layout === option.id ? "default" : "outline"}
                size="icon"
                onClick={() => setLayout(option.id)}
                className={`${
                  layout === option.id
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "border-yellow-200 hover:border-yellow-400"
                }`}
              >
                <option.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          layout
          className={`${
            layout === "masonry"
              ? layoutOptions[2].cols + " gap-4 space-y-4"
              : `grid ${layoutOptions.find((l) => l.id === layout)?.cols} gap-6`
          }`}
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  layout === "masonry" ? "break-inside-avoid mb-4" : ""
                }`}
                onClick={() => openModal(image.id)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={language === "ar" ? image.titleAr : image.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{language === "ar" ? image.titleAr : image.titleEn}</h3>
                      <p className="text-sm text-gray-200">
                        {language === "ar" ? image.descriptionAr : image.descriptionEn}
                      </p>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={closeModal}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image */}
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedImageData.src || "/placeholder.svg"}
                  alt={language === "ar" ? selectedImageData.titleAr : selectedImageData.titleEn}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {/* Image Info */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold mb-2">
                  {language === "ar" ? selectedImageData.titleAr : selectedImageData.titleEn}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === "ar" ? selectedImageData.descriptionAr : selectedImageData.descriptionEn}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
