"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter, Grid3X3, Grid2X2, LayoutGrid } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const LOCAL_GALLERY_IMAGES = [
  // Design Showcase - Gallery Folder
  { id: "design-1", src: "/gallery/0024209_egadi-40-x-95-oval-table_450.jpeg", category: "design", type: "furniture" },
  { id: "design-2", src: "/gallery/0024280_biancamano-chair_450.jpeg", category: "design", type: "furniture" },
  {
    id: "design-3",
    src: "/gallery/0024304_favignana-swivelling-mirror_450.jpeg",
    category: "design",
    type: "accessories",
  },
  { id: "design-4", src: "/gallery/0025764_doge-console_450.jpeg", category: "design", type: "furniture" },
  {
    id: "design-5",
    src: "/gallery/0026441_egadi-o-40-round-coffee-table-14-high_450.jpeg",
    category: "design",
    type: "tables",
  },
  {
    id: "design-6",
    src: "/gallery/0026474_axum-rectangular-outdoor-coffee-table_450.jpeg",
    category: "design",
    type: "outdoor",
  },

  // Product Collections - Gallery Folder
  { id: "prod-1", src: "/gallery/0036693_sofas-and-armchairs_366.jpeg", category: "products", type: "sofas" },
  { id: "prod-2", src: "/gallery/0036701_accessories_366.jpeg", category: "products", type: "accessories" },
  { id: "prod-3", src: "/gallery/0036703_tables-and-chairs_366.jpeg", category: "products", type: "furniture" },
  { id: "prod-4", src: "/gallery/0036717_storage_366.jpeg", category: "products", type: "storage" },
  { id: "prod-5", src: "/gallery/0036728_home-decor_366.jpeg", category: "products", type: "decor" },
  { id: "prod-6", src: "/gallery/0036730_outdoor-furniture_366.jpeg", category: "products", type: "outdoor" },
  { id: "prod-7", src: "/gallery/0036770_bedroom_366.jpeg", category: "products", type: "bedroom" },

  // Interior Projects - Projects Folder
  {
    id: "proj-1",
    src: "/projects/modern-black-glass-tv-unit-or-36e8-glass-tv-unit-or-lago.webp",
    category: "residential",
    type: "living-room",
  },
  {
    id: "proj-2",
    src: "/projects/suspended-glass-sideboard-or-sideboard-36e8-glass-or-lago.webp",
    category: "residential",
    type: "dining",
  },
  {
    id: "proj-3",
    src: "/projects/gold-walk-in-wardrobe-with-drawers-or-vista-walk-in-closet-or-lago.webp",
    category: "residential",
    type: "bedroom",
  },
  {
    id: "proj-4",
    src: "/projects/modern-bedroom-design-or-36e8-dresser-or-lago.webp",
    category: "residential",
    type: "bedroom",
  },
  {
    id: "proj-5",
    src: "/projects/glass-suspended-living-room-wall-unit-or-n.o.w.-wall-unit-or-lago.webp",
    category: "residential",
    type: "living-room",
  },

  // Kitchen & Dining - Projects Folder
  {
    id: "kitchen-1",
    src: "/projects/suspended-corner-kitchen-with-pantry-or-36e8-cut-kitchenor-lago.webp",
    category: "kitchen",
    type: "modern",
  },
  {
    id: "kitchen-2",
    src: "/projects/marble-kitchen-with-wooden-peninsula-or-36e8-marble-xglass-kitchen-or-lago.webp",
    category: "kitchen",
    type: "luxury",
  },
  {
    id: "kitchen-3",
    src: "/projects/white-kitchen-pantry-or-36e8-cut-kitchen-or-lago.webp",
    category: "kitchen",
    type: "modern",
  },
  {
    id: "kitchen-4",
    src: "/projects/modern-dining-room-furniture-or-36e8-sideboard-or-lago.webp",
    category: "kitchen",
    type: "dining",
  },

  // Commercial/Office - Projects Folder
  {
    id: "office-1",
    src: "/projects/home-studio-furniture-or-home-office-or-lago.webp",
    category: "commercial",
    type: "office",
  },
  {
    id: "office-2",
    src: "/projects/modern-glass-desk-or-livre-desk-or-lago.webp",
    category: "commercial",
    type: "desk",
  },
  {
    id: "office-3",
    src: "/projects/floating-bookcase-with-corner-desk-or-home-office-or-lago.webp",
    category: "commercial",
    type: "workspace",
  },
  {
    id: "office-4",
    src: "/projects/design-wall-bookshelf-or-lagolinea-bookshelf-or-lago.webp",
    category: "commercial",
    type: "storage",
  },
]

const galleryCategories = [
  { id: "all", nameEn: "All Projects", nameAr: "جميع المشاريع" },
  { id: "design", nameEn: "Design Showcase", nameAr: "عرض التصاميم" },
  { id: "residential", nameEn: "Residential", nameAr: "سكني" },
  { id: "kitchen", nameEn: "Kitchen & Dining", nameAr: "المطابخ والطعام" },
  { id: "commercial", nameEn: "Office & Commercial", nameAr: "مكتبي وتجاري" },
  { id: "products", nameEn: "Product Collections", nameAr: "مجموعات المنتجات" },
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
}

export default function GalleryPage() {
  const { language } = useLanguage()
  const isRTL = language === "ar"
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [layout, setLayout] = useState("grid")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
