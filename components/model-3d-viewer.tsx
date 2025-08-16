"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Maximize2, RotateCcw, Move3D, Download, Share2, Fullscreen, X, Info, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ResponsiveModal } from "@/components/responsive-modal"
import { useLanguage } from "@/contexts/language-context"

interface Model3DViewerProps {
  model: {
    id: string
    model_name: string
    model_url: string
    model_type: string
    thumbnail_url?: string
    description_en?: string
    description_ar?: string
  }
  showControls?: boolean
  autoRotate?: boolean
  className?: string
}

export function Model3DViewer({ model, showControls = true, autoRotate = false, className = "" }: Model3DViewerProps) {
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [viewerSettings, setViewerSettings] = useState({
    autoRotate: autoRotate,
    wireframe: false,
    showGrid: true,
    zoom: 1,
    rotationSpeed: 1,
  })

  const handleView3D = () => {
    setIsLoading(true)
    // Simulate loading time for 3D model
    setTimeout(() => {
      setIsLoading(false)
      setIsFullscreen(true)
    }, 1000)
  }

  const handleDownload = () => {
    // Create download link
    const link = document.createElement("a")
    link.href = model.model_url
    link.download = `${model.model_name}.${model.model_type}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: model.model_name,
          text: language === "ar" ? model.description_ar : model.description_en,
          url: model.model_url,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(model.model_url)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className={className}
      >
        <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <div className="relative h-64 w-full bg-gradient-to-br from-yellow-100 to-yellow-200">
            {model.thumbnail_url ? (
              <Image
                src={model.thumbnail_url || "/placeholder.svg"}
                alt={model.model_name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Move3D className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-yellow-700 font-medium">3D Model</p>
                  <p className="text-yellow-600 text-sm mt-1">{model.model_type.toUpperCase()}</p>
                </div>
              </div>
            )}

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <Button
                  onClick={handleView3D}
                  disabled={isLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                  size="sm"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? "Loading..." : "View 3D"}
                </Button>

                <Button
                  onClick={() => setShowInfo(true)}
                  variant="outline"
                  size="sm"
                  className="bg-white/90 hover:bg-white border-yellow-500 text-yellow-600"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Model Type Badge */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-yellow-500 text-white shadow-lg">{model.model_type.toUpperCase()}</Badge>
            </div>
          </div>

          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="truncate">{model.model_name}</span>
              {showControls && (
                <div className="flex gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDownload}
                    className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardTitle>
            {(model.description_en || model.description_ar) && (
              <CardDescription className="line-clamp-2">
                {language === "ar" ? model.description_ar : model.description_en}
              </CardDescription>
            )}
          </CardHeader>
        </Card>
      </motion.div>

      {/* Fullscreen 3D Viewer Modal */}
      <ResponsiveModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        size="full"
        showHeader={false}
        className="bg-black/95"
        contentClassName="bg-gray-900 border-gray-700"
      >
        <Enhanced3DViewer
          model={model}
          settings={viewerSettings}
          onSettingsChange={setViewerSettings}
          onClose={() => setIsFullscreen(false)}
        />
      </ResponsiveModal>

      {/* Model Info Modal */}
      <ResponsiveModal isOpen={showInfo} onClose={() => setShowInfo(false)} size="md" title={model.model_name}>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-yellow-600">Type:</span>
              <span className="ml-2">{model.model_type.toUpperCase()}</span>
            </div>
            <div>
              <span className="font-medium text-yellow-600">Format:</span>
              <span className="ml-2">3D Model</span>
            </div>
          </div>

          {(model.description_en || model.description_ar) && (
            <div>
              <h3 className="font-medium text-yellow-600 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {language === "ar" ? model.description_ar : model.description_en}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button onClick={handleView3D} className="flex-1 bg-yellow-500 hover:bg-yellow-600">
              <Maximize2 className="h-4 w-4 mr-2" />
              View in 3D
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50 bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </ResponsiveModal>
    </>
  )
}

// Enhanced 3D Viewer Component
function Enhanced3DViewer({
  model,
  settings,
  onSettingsChange,
  onClose,
}: {
  model: any
  settings: any
  onSettingsChange: (settings: any) => void
  onClose: () => void
}) {
  const [showControls, setShowControls] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate 3D model loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleReset = () => {
    onSettingsChange({
      ...settings,
      zoom: 1,
      autoRotate: false,
    })
  }

  return (
    <div className="relative w-full h-full bg-gray-900 text-white">
      {/* 3D Viewer Container */}
      <div ref={viewerRef} className="w-full h-full relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Loading 3D Model</h3>
                <p className="text-gray-400">{model.model_name}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-yellow-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                <Move3D className="h-12 w-12 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{model.model_name}</h3>
                <p className="text-gray-300 mb-4">Interactive 3D Model Viewer</p>
                <Badge className="bg-yellow-500 text-white px-4 py-2">{model.model_type.toUpperCase()} Format</Badge>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Rotate: Click and drag</p>
                <p>• Zoom: Mouse wheel or pinch</p>
                <p>• Pan: Right-click and drag</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 space-y-4 min-w-[250px] border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">3D Controls</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowControls(false)}
                className="h-8 w-8 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Auto Rotate</label>
                <Switch
                  checked={settings.autoRotate}
                  onCheckedChange={(checked) => onSettingsChange({ ...settings, autoRotate: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Show Grid</label>
                <Switch
                  checked={settings.showGrid}
                  onCheckedChange={(checked) => onSettingsChange({ ...settings, showGrid: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Wireframe</label>
                <Switch
                  checked={settings.wireframe}
                  onCheckedChange={(checked) => onSettingsChange({ ...settings, wireframe: checked })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">Zoom Level</label>
                <Slider
                  value={[settings.zoom]}
                  onValueChange={([value]) => onSettingsChange({ ...settings, zoom: value })}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">Rotation Speed</label>
                <Slider
                  value={[settings.rotationSpeed]}
                  onValueChange={([value]) => onSettingsChange({ ...settings, rotationSpeed: value })}
                  min={0.1}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 flex gap-2">
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="bg-gray-800/90 border-gray-600 text-white hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </Button>

        {!showControls && (
          <Button
            onClick={() => setShowControls(true)}
            variant="outline"
            size="icon"
            className="bg-gray-800/90 border-gray-600 text-white hover:bg-gray-700"
          >
            <Settings className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">{model.model_name}</h4>
            <p className="text-sm text-gray-400">{model.model_type.toUpperCase()} • Interactive 3D Model</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              onClick={() => window.open(model.model_url, "_blank")}
            >
              <Fullscreen className="h-4 w-4 mr-2" />
              External View
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3D Model Gallery Component
interface Model3DGalleryProps {
  models: Array<{
    id: string
    model_name: string
    model_url: string
    model_type: string
    thumbnail_url?: string
    description_en?: string
    description_ar?: string
  }>
  title?: string
  className?: string
}

export function Model3DGallery({ models, title, className = "" }: Model3DGalleryProps) {
  const { language } = useLanguage()

  if (!models || models.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Move3D className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500">No 3D models available</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === "ar"
              ? "استكشف النماذج ثلاثية الأبعاد التفاعلية لهذا المشروع"
              : "Explore interactive 3D models of this project"}
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model, index) => (
          <Model3DViewer key={model.id} model={model} showControls={true} autoRotate={false} className="h-full" />
        ))}
      </div>
    </div>
  )
}
