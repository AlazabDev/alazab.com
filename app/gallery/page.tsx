"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter, Grid3X3, Grid2X2, LayoutGrid } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import fs from "fs"
import path from "path"

const getImagesFromFolder = (folderPath) => {
  const images = fs.readdirSync(folderPath).map((file) => ({
    id: file.split(".")[0],
    src: `/public/${folderPath}/${file}`,
    category: folderPath.split("/")[1],
    type: folderPath.split("/")[2],
    title: file
      .split(".")[0]
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  }))
  return images
}

const galleryCategories = [
  { id: "all", nameEn: "All Projects", nameAr: "جميع المشاريع" },
  { id: "design", nameEn: "Design Showcase", nameAr: "عرض التصاميم" },
  { id: "residential", nameEn: "Residential", nameAr: "سكني" },
  { id: "kitchen", nameEn: "Kitchen & Dining", nameAr: "المطابخ والطعام" },
  { id: "commercial", nameEn: "Office & Commercial", nameAr: "مكتبي وتجاري" },
  { id: "products", nameEn: "Product Collections", nameAr: "مجموعات المنتجات" },
  { id: "brand", nameEn: "Premium Brands", nameAr: "العلامات المميزة" },
]

const layoutOptions = [
  { id: "grid", icon: Grid3X3, cols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" },
  { id: "large", icon: Grid2X2, cols: "grid-cols-1 md:grid-cols-2" },
  { id: "masonry", icon: LayoutGrid, cols: "columns-1 md:columns-2 lg:columns-3" },
]

interface GalleryImage {
  id: string
  src: string
  category: string
  type: string
  title: string
}

export default function GalleryPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [layout, setLayout] = useState("grid")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [LOCAL_GALLERY_IMAGES, setLOCAL_GALLERY_IMAGES] = useState<GalleryImage[]>([])

  useEffect(() => {
    const galleryFolder = path.join(process.cwd(), "public", "gallery")
    const projectsFolder = path.join(process.cwd(), "public", "projects")
    const galleryImages = getImagesFromFolder(galleryFolder)
    const projectsImages = getImagesFromFolder(projectsFolder)
    setLOCAL_GALLERY_IMAGES([...galleryImages, ...projectsImages])
  }, [])

  const filteredImages =
    selectedCategory === "all"
      ? LOCAL_GALLERY_IMAGES
      : LOCAL_GALLERY_IMAGES.filter((img) => img.category === selectedCategory)

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const currentImage = filteredImages[currentImageIndex]

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10" />
        <Image
          src="/images/contact-hero.png"
          alt="Gallery showcase"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-300 text-sm font-medium mb-6">
              {language === "ar" ? "معرضنا الشامل" : "Our Gallery"}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {language === "ar" ? "معرض المشاريع والتصاميم" : "Projects & Design Gallery"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "استكشف مجموعة شاملة من مشاريعنا والتصاميم الداخلية الفاخرة"
                : "Explore our comprehensive collection of projects and luxury interior designs"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Controls Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div
            className={`flex flex-col gap-6 ${isRTL ? "lg:flex-row-reverse" : "lg:flex-row"} lg:items-center lg:justify-between`}
          >
            {/* Category Filter */}
            <div className={`flex items-center gap-2 flex-wrap ${isRTL ? "justify-end" : "justify-start"}`}>
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300 flex-shrink-0" />
              <div className="flex gap-2 flex-wrap">
                {galleryCategories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      setCurrentImageIndex(0)
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                      selectedCategory === cat.id
                        ? "bg-yellow-500 text-white shadow-lg"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
                    }`}
                  >
                    {language === "ar" ? cat.nameAr : cat.nameEn}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Layout Options */}
            <div className="flex items-center gap-2">
              {layoutOptions.map((opt) => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setLayout(opt.id)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    layout === opt.id
                      ? "bg-yellow-500 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <opt.icon className="h-5 w-5" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Image Counter */}
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            {language === "ar" ? `${filteredImages.length} صورة` : `${filteredImages.length} images`}
          </div>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <section className="py-12 bg-white dark:bg-gray-900 flex-grow">
        <div className="container mx-auto px-4">
          <div
            className={`${layout === "masonry" ? layoutOptions[2].cols : `grid ${layoutOptions.find((l) => l.id === layout)?.cols || layoutOptions[0].cols}`} gap-6 mb-12`}
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setSelectedImage(image.src)
                    setCurrentImageIndex(index)
                  }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer h-64 sm:h-72 md:h-80 bg-gray-100 dark:bg-gray-800"
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="bg-yellow-500 p-3 rounded-full"
                    >
                      <ZoomIn className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh]"
            >
              <Image
                src={currentImage?.src || selectedImage}
                alt="Lightbox image"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg object-contain"
                quality={90}
                priority
              />

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevImage}
                className={`absolute top-1/2 ${isRTL ? "right-4" : "left-4"} transform -translate-y-1/2 bg-yellow-500/80 hover:bg-yellow-600 p-2 rounded-full transition-all duration-300`}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={handleNextImage}
                className={`absolute top-1/2 ${isRTL ? "left-4" : "right-4"} transform -translate-y-1/2 bg-yellow-500/80 hover:bg-yellow-600 p-2 rounded-full transition-all duration-300`}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-300"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Image Counter in Lightbox */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white text-sm">
                {currentImageIndex + 1} / {filteredImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
