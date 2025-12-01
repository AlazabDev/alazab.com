"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter, Grid3X3, Grid2X2, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { getImagesForCategories, type ImageCategory } from "@/lib/supabase-storage"

// Gallery categories mapped to Supabase folders
const galleryCategories = [
  { id: "all", nameEn: "All Projects", nameAr: "جميع المشاريع", folders: [] as ImageCategory[] },
  {
    id: "luxury",
    nameEn: "Luxury Finishing",
    nameAr: "التشطيبات الفاخرة",
    folders: ["residential", "live_edge"] as ImageCategory[],
  },
  {
    id: "brand",
    nameEn: "Brand Identity",
    nameAr: "الهوية التجارية",
    folders: ["commercial", "shops"] as ImageCategory[],
  },
  {
    id: "maintenance",
    nameEn: "Maintenance & Renovations",
    nameAr: "الصيانة والتجديدات",
    folders: ["maintenance", "construction"] as ImageCategory[],
  },
  { id: "supplies", nameEn: "General Supplies", nameAr: "التوريدات العامة", folders: ["projects"] as ImageCategory[] },
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
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [layout, setLayout] = useState("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    async function loadImages() {
      setIsLoading(true)
      try {
        // Get all image categories from Supabase
        const allCategories: ImageCategory[] = [
          "residential",
          "commercial",
          "shops",
          "maintenance",
          "construction",
          "projects",
          "live_edge",
        ]
        const imagesData = await getImagesForCategories(allCategories)

        // Transform images into gallery format
        const transformedImages: GalleryImage[] = []

        Object.entries(imagesData).forEach(([category, images]) => {
          images.forEach((image, index) => {
            // Determine which gallery category this belongs to
            let galleryCategory = "supplies"
            if (["residential", "live_edge"].includes(category)) galleryCategory = "luxury"
            else if (["commercial", "shops"].includes(category)) galleryCategory = "brand"
            else if (["maintenance", "construction"].includes(category)) galleryCategory = "maintenance"

            transformedImages.push({
              id: `${category}-${index}`,
              src: image.url,
              category: galleryCategory,
              titleEn: image.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
              titleAr: image.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
              descriptionEn: `${category.charAt(0).toUpperCase() + category.slice(1)} project`,
              descriptionAr: `مشروع ${category}`,
            })
          })
        })

        setGalleryImages(transformedImages)
      } catch (error) {
        console.error("[v0] Error loading gallery images:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
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
                  transition={{ duration: 0.5, delay: index * 0.05 }}
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
