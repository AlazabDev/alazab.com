"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter, Grid3X3, Grid2X2, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const SUPABASE_STORAGE_URL = "https://zrrffsjbfkphridqyais.supabase.co/storage/v1/object/public/az_gallery/images"

const GALLERY_IMAGES = {
  residential: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
  commercial: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  shops: ["abuauf_18.jpg", "abuauf_19.jpg", "abuauf_20.jpg", "abuauf_21.jpg", "abuauf_22.jpg"],
  live_edge: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
  construction: ["1.jpg", "2.jpg", "3.jpg"],
  projects: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
}

// Gallery categories
const galleryCategories = [
  { id: "all", nameEn: "All Projects", nameAr: "جميع المشاريع" },
  { id: "luxury", nameEn: "Luxury Finishing", nameAr: "التشطيبات الفاخرة" },
  { id: "brand", nameEn: "Brand Identity", nameAr: "الهوية التجارية" },
  { id: "construction", nameEn: "Construction", nameAr: "البناء والإنشاءات" },
  { id: "supplies", nameEn: "General Supplies", nameAr: "التوريدات العامة" },
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
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
}

export default function GalleryPage() {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [layout, setLayout] = useState("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    const images: GalleryImage[] = []

    // Residential images -> luxury category
    GALLERY_IMAGES.residential.forEach((img, index) => {
      images.push({
        id: `residential-${index}`,
        src: `${SUPABASE_STORAGE_URL}/residential/${img}`,
        category: "luxury",
        titleEn: `Luxury Residential Project ${index + 1}`,
        titleAr: `مشروع سكني فاخر ${index + 1}`,
        descriptionEn: "Premium residential finishing and interior design",
        descriptionAr: "تشطيبات سكنية فاخرة وتصميم داخلي متميز",
      })
    })

    // Live edge images -> luxury category
    GALLERY_IMAGES.live_edge.forEach((img, index) => {
      images.push({
        id: `live_edge-${index}`,
        src: `${SUPABASE_STORAGE_URL}/live_edge/${img}`,
        category: "luxury",
        titleEn: `Live Edge Design ${index + 1}`,
        titleAr: `تصميم حافة حية ${index + 1}`,
        descriptionEn: "Unique live edge wood furniture and designs",
        descriptionAr: "أثاث وتصاميم خشبية فريدة بحافة حية",
      })
    })

    // Commercial images -> brand category
    GALLERY_IMAGES.commercial.forEach((img, index) => {
      images.push({
        id: `commercial-${index}`,
        src: `${SUPABASE_STORAGE_URL}/commercial/${img}`,
        category: "brand",
        titleEn: `Commercial Project ${index + 1}`,
        titleAr: `مشروع تجاري ${index + 1}`,
        descriptionEn: "Professional commercial space design and branding",
        descriptionAr: "تصميم مساحات تجارية احترافية وهوية تجارية",
      })
    })

    // Shops images -> brand category
    GALLERY_IMAGES.shops.forEach((img, index) => {
      images.push({
        id: `shops-${index}`,
        src: `${SUPABASE_STORAGE_URL}/shops/${img}`,
        category: "brand",
        titleEn: `Retail Shop Design ${index + 1}`,
        titleAr: `تصميم محل تجاري ${index + 1}`,
        descriptionEn: "Modern retail shop interior design",
        descriptionAr: "تصميم داخلي عصري للمحلات التجارية",
      })
    })

    // Construction images -> construction category
    GALLERY_IMAGES.construction.forEach((img, index) => {
      images.push({
        id: `construction-${index}`,
        src: `${SUPABASE_STORAGE_URL}/construction/${img}`,
        category: "construction",
        titleEn: `Construction Project ${index + 1}`,
        titleAr: `مشروع إنشاء ${index + 1}`,
        descriptionEn: "Professional construction and building projects",
        descriptionAr: "مشاريع بناء وإنشاءات احترافية",
      })
    })

    // Projects images -> supplies category
    GALLERY_IMAGES.projects.forEach((img, index) => {
      images.push({
        id: `projects-${index}`,
        src: `${SUPABASE_STORAGE_URL}/projects/${img}`,
        category: "supplies",
        titleEn: `Supply Project ${index + 1}`,
        titleAr: `مشروع توريدات ${index + 1}`,
        descriptionEn: "General supplies and materials projects",
        descriptionAr: "مشاريع توريدات ومواد عامة",
      })
    })

    setGalleryImages(images)
    setIsLoading(false)
  }, [])

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openModal = (imageId: string) => {
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
          <div className="flex flex-wrap gap-2 justify-center">
            {galleryCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
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
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === "ar" ? "لا توجد صور في هذه الفئة" : "No images in this category"}
            </p>
          </div>
        ) : (
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
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                    layout === "masonry" ? "break-inside-avoid mb-4" : ""
                  }`}
                  onClick={() => openModal(image.id)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={language === "ar" ? image.titleAr : image.titleEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/construction-site-overview.png"
                      }}
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
        )}
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/construction-site-overview.png"
                  }}
                />
              </div>

              {/* Image Info */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
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
