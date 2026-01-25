"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter, Grid3X3, Grid2X2, LayoutGrid } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { GalleryImage } from "@/lib/gallery-data"

const CATEGORY_LABELS: Record<string, { nameEn: string; nameAr: string }> = {
  gallery: { nameEn: "Gallery Collection", nameAr: "مجموعة الصور" },
  projects: { nameEn: "Projects Portfolio", nameAr: "معرض المشاريع" },
}

const layoutOptions = [
  { id: "grid", icon: Grid3X3, cols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" },
  { id: "large", icon: Grid2X2, cols: "grid-cols-1 md:grid-cols-2" },
  { id: "masonry", icon: LayoutGrid, cols: "columns-1 md:columns-2 lg:columns-3" },
]

interface GalleryClientProps {
  images: GalleryImage[]
}

export default function GalleryClient({ images }: GalleryClientProps) {
  const { language } = useLanguage()
  const isRTL = language === "ar"
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [layout, setLayout] = useState("grid")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const thumbnailStripRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(images.map((image) => image.category)))
    return [
      { id: "all", nameEn: "All Works", nameAr: "جميع الأعمال" },
      ...uniqueCategories.map((category) => ({
        id: category,
        nameEn: CATEGORY_LABELS[category]?.nameEn ?? category.replace(/\b\w/g, (l) => l.toUpperCase()),
        nameAr: CATEGORY_LABELS[category]?.nameAr ?? category,
      })),
    ]
  }, [images])

  const filteredImages =
    selectedCategory === "all" ? images : images.filter((image) => image.category === selectedCategory)

  useEffect(() => {
    if (currentImageIndex >= filteredImages.length) {
      setCurrentImageIndex(0)
    }
  }, [filteredImages.length, currentImageIndex])

  const handlePrevImage = () => {
    if (filteredImages.length === 0) {
      return
    }
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  const handleNextImage = () => {
    if (filteredImages.length === 0) {
      return
    }
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  useEffect(() => {
    if (!selectedImage) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrevImage()
      }
      if (event.key === "ArrowRight") {
        handleNextImage()
      }
      if (event.key === "Escape") {
        setSelectedImage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage, filteredImages.length])

  useEffect(() => {
    if (!selectedImage || !thumbnailStripRef.current) {
      return
    }

    const activeThumb = thumbnailStripRef.current.querySelector(
      `[data-thumb-index="${currentImageIndex}"]`
    ) as HTMLButtonElement | null
    activeThumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [currentImageIndex, selectedImage])

  const currentImage = filteredImages[currentImageIndex]
  const hasImages = filteredImages.length > 0

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
              {language === "ar" ? "معرض الأعمال الاحترافي" : "Professional Portfolio"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === "ar"
                ? "استكشف مكتبة كاملة من أعمالنا وصور المشاريع والتصاميم الداخلية."
                : "Explore our complete library of projects, designs, and premium interiors."}
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
                {categories.map((cat) => (
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
                  className="group relative overflow-hidden rounded-2xl cursor-pointer h-64 sm:h-72 md:h-80 bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-xl transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/70"
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm uppercase tracking-wide text-yellow-200/90">
                      {language === "ar" ? "معرض" : "Gallery"}
                    </p>
                    <p className="text-lg font-semibold line-clamp-2">{image.title}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="bg-yellow-500/90 p-3 rounded-full shadow-lg"
                    >
                      <ZoomIn className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!hasImages && (
              <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-16">
                {language === "ar" ? "لا توجد صور حالياً." : "No images available right now."}
              </div>
            )}
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
              <div className="relative bg-black/60 rounded-2xl p-4 sm:p-6">
                <div
                  className="relative"
                  onTouchStart={(event) => {
                    touchStartX.current = event.touches[0]?.clientX ?? null
                  }}
                  onTouchEnd={(event) => {
                    if (touchStartX.current === null) {
                      return
                    }
                    const endX = event.changedTouches[0]?.clientX ?? null
                    if (endX === null) {
                      touchStartX.current = null
                      return
                    }
                    const delta = touchStartX.current - endX
                    if (Math.abs(delta) > 40) {
                      if (delta > 0) {
                        handleNextImage()
                      } else {
                        handlePrevImage()
                      }
                    }
                    touchStartX.current = null
                  }}
                >
                  <Image
                    src={currentImage?.src || selectedImage}
                    alt={currentImage?.title ?? "Lightbox image"}
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
                    aria-label={language === "ar" ? "الصورة السابقة" : "Previous image"}
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className={`absolute top-1/2 ${isRTL ? "left-4" : "right-4"} transform -translate-y-1/2 bg-yellow-500/80 hover:bg-yellow-600 p-2 rounded-full transition-all duration-300`}
                    aria-label={language === "ar" ? "الصورة التالية" : "Next image"}
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all duration-300"
                    aria-label={language === "ar" ? "إغلاق" : "Close"}
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="text-sm text-white/80 whitespace-nowrap">
                    {currentImageIndex + 1} / {filteredImages.length}
                  </span>
                  <div
                    ref={thumbnailStripRef}
                    className="flex-1 flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-500/70 scrollbar-track-transparent pb-2"
                  >
                    {filteredImages.map((image, index) => (
                      <button
                        key={image.id}
                        type="button"
                        data-thumb-index={index}
                        onClick={() => {
                          setSelectedImage(image.src)
                          setCurrentImageIndex(index)
                        }}
                        className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex ? "border-yellow-500" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                          quality={60}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
