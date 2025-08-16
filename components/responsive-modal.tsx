"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ResponsiveModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: "sm" | "md" | "lg" | "xl" | "full" | "auto"
  showHeader?: boolean
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  className?: string
  contentClassName?: string
  isRTL?: boolean
}

export function ResponsiveModal({
  isOpen,
  onClose,
  children,
  title,
  size = "md",
  showHeader = true,
  showCloseButton = true,
  closeOnOverlayClick = true,
  className,
  contentClassName,
  isRTL = false,
}: ResponsiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const getSizeClasses = () => {
    const sizeMap = {
      sm: "max-w-md",
      md: "max-w-2xl",
      lg: "max-w-4xl",
      xl: "max-w-6xl",
      full: "max-w-[95vw] max-h-[95vh]",
      auto: "max-w-fit",
    }
    return sizeMap[size]
  }

  const getResponsiveClasses = () => {
    return cn(
      "w-full mx-4",
      "sm:mx-6",
      "md:mx-8",
      "lg:mx-auto",
      getSizeClasses(),
      size === "full" && "h-[95vh]",
      size !== "full" && "max-h-[90vh]",
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            "bg-black/60 backdrop-blur-sm",
            isRTL && "rtl",
            className,
          )}
          onClick={closeOnOverlayClick ? onClose : undefined}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative bg-white rounded-2xl shadow-2xl",
              "border border-gray-200",
              "overflow-hidden",
              getResponsiveClasses(),
              contentClassName,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {showHeader && (
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-amber-100/50">
                {title && <h2 className="text-xl font-bold text-gray-900 truncate pr-4">{title}</h2>}
                {showCloseButton && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="flex-shrink-0 hover:bg-amber-200/50 text-gray-600 hover:text-gray-900"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close modal</span>
                  </Button>
                )}
              </div>
            )}

            {/* Close button for headerless modals */}
            {!showHeader && showCloseButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close modal</span>
              </Button>
            )}

            {/* Content */}
            <div
              className={cn(
                "overflow-auto",
                showHeader ? "max-h-[calc(90vh-80px)]" : "max-h-[90vh]",
                size === "full" && "h-full",
              )}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Specialized modal components for different use cases

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: string
    title_en: string
    title_ar: string
    description_en: string
    description_ar: string
    category: string
    location: string
    client_name: string
    project_images?: Array<{
      id: string
      image_url: string
      alt_text_en?: string
    }>
  }
  isRTL?: boolean
}

export function ProjectModal({ isOpen, onClose, project, isRTL = false }: ProjectModalProps) {
  const primaryImage = project.project_images?.[0]

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={isRTL ? project.title_ar : project.title_en}
      isRTL={isRTL}
      contentClassName="max-h-[85vh]"
    >
      <div className="p-6 space-y-6">
        {/* Project Image */}
        {primaryImage && (
          <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden">
            <img
              src={primaryImage.image_url || "/placeholder.svg"}
              alt={primaryImage.alt_text_en || project.title_en}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Project Details */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium text-amber-600">Location:</span>
              <span className="ml-2">{project.location}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-amber-600">Client:</span>
              <span className="ml-2">{project.client_name}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Project Description</h3>
            <p className="text-gray-700 leading-relaxed">{isRTL ? project.description_ar : project.description_en}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Button
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => {
                window.open(`/projects/${project.id}`, "_blank")
              }}
            >
              <Maximize2 className="h-4 w-4 mr-2" />
              View Full Project
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-amber-500 text-amber-600 hover:bg-amber-50 bg-transparent"
              onClick={() => {
                // Handle contact for similar project
                window.open("/contact", "_blank")
              }}
            >
              Request Similar Project
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  )
}

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: Array<{
    id: string
    image_url: string
    alt_text_en?: string
    alt_text_ar?: string
  }>
  currentIndex: number
  onNavigate?: (index: number) => void
  isRTL?: boolean
}

export function ImageModal({ isOpen, onClose, images, currentIndex, onNavigate, isRTL = false }: ImageModalProps) {
  const currentImage = images[currentIndex]

  const handlePrevious = () => {
    if (onNavigate) {
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
      onNavigate(newIndex)
    }
  }

  const handleNext = () => {
    if (onNavigate) {
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
      onNavigate(newIndex)
    }
  }

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      showHeader={false}
      className="bg-black/90"
      contentClassName="bg-transparent shadow-none border-none"
      isRTL={isRTL}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Main Image */}
        <div className="relative max-w-full max-h-full">
          <img
            src={currentImage?.image_url || "/placeholder.svg"}
            alt={currentImage?.alt_text_en || `Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        {/* Navigation Controls */}
        {images.length > 1 && onNavigate && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border border-white/20"
            >
              <motion.div whileHover={{ x: -2 }} transition={{ duration: 0.2 }}>
                {isRTL ? "→" : "←"}
              </motion.div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border border-white/20"
            >
              <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                {isRTL ? "←" : "→"}
              </motion.div>
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border border-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </ResponsiveModal>
  )
}

interface Model3DModalProps {
  isOpen: boolean
  onClose: () => void
  model: {
    id: string
    model_name: string
    model_url: string
    model_type: string
    description_en?: string
    description_ar?: string
  }
  isRTL?: boolean
}

export function Model3DModal({ isOpen, onClose, model, isRTL = false }: Model3DModalProps) {
  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={model.model_name}
      isRTL={isRTL}
      contentClassName="max-h-[90vh]"
    >
      <div className="p-6 space-y-6">
        {/* 3D Model Viewer Container */}
        <div className="relative h-96 sm:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto">
                <Maximize2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3D Model Viewer</h3>
                <p className="text-gray-600 mb-4">{isRTL ? model.description_ar : model.description_en}</p>
                <Button
                  className="bg-amber-500 hover:bg-amber-600"
                  onClick={() => window.open(model.model_url, "_blank")}
                >
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Open in New Window
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Model Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Model Information</h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
              {model.model_type.toUpperCase()}
            </span>
          </div>

          {(model.description_en || model.description_ar) && (
            <p className="text-gray-700 leading-relaxed">{isRTL ? model.description_ar : model.description_en}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Button
              className="flex-1 bg-amber-500 hover:bg-amber-600"
              onClick={() => window.open(model.model_url, "_blank")}
            >
              <Maximize2 className="h-4 w-4 mr-2" />
              View Full Screen
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-amber-500 text-amber-600 hover:bg-amber-50 bg-transparent"
              onClick={() => {
                navigator.clipboard.writeText(model.model_url)
                // You could add a toast notification here
              }}
            >
              Copy Model Link
            </Button>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  )
}
