"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Pause,
  Camera,
  MessageSquare,
  Building,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"

interface ProjectStage {
  id: string
  name: string
  status: "completed" | "inProgress" | "pending" | "delayed"
  startDate?: string
  endDate?: string
  expectedDate?: string
  description?: string
}

interface ProjectData {
  id: string
  name: string
  type: string
  location: string
  startDate: string
  expectedEndDate: string
  progress: number
  manager: {
    name: string
    phone: string
    email: string
  }
  engineer: {
    name: string
    phone: string
  }
  supervisor: {
    name: string
    phone: string
  }
  stages: ProjectStage[]
  updates: Array<{
    date: string
    message: string
    type: "info" | "success" | "warning"
  }>
  images: Array<{
    url: string
    caption: string
    date: string
  }>
}

// Mock project data
const mockProjects: Record<string, ProjectData> = {
  "AZ-2024-001": {
    id: "AZ-2024-001",
    name: "فيلا العائلة السعيدة - Happy Family Villa",
    type: "سكني - Residential",
    location: "التجمع الخامس، القاهرة الجديدة",
    startDate: "2024-01-15",
    expectedEndDate: "2024-06-15",
    progress: 65,
    manager: {
      name: "أحمد محمد - Ahmed Mohamed",
      phone: "+201004006620",
      email: "ahmed@al-azab.co",
    },
    engineer: {
      name: "سارة علي - Sara Ali",
      phone: "+201014536600",
    },
    supervisor: {
      name: "محمود حسن - Mahmoud Hassan",
      phone: "+201234567890",
    },
    stages: [
      {
        id: "planning",
        name: "التخطيط والتصميم",
        status: "completed",
        startDate: "2024-01-15",
        endDate: "2024-02-01",
        description: "تم الانتهاء من جميع التصاميم والمخططات",
      },
      {
        id: "permits",
        name: "التراخيص والموافقات",
        status: "completed",
        startDate: "2024-02-01",
        endDate: "2024-02-15",
        description: "تم الحصول على جميع التراخيص المطلوبة",
      },
      {
        id: "foundation",
        name: "أعمال الأساسات",
        status: "completed",
        startDate: "2024-02-15",
        endDate: "2024-03-15",
        description: "تم الانتهاء من أعمال الحفر والأساسات",
      },
      {
        id: "structure",
        name: "الهيكل الإنشائي",
        status: "inProgress",
        startDate: "2024-03-15",
        expectedDate: "2024-05-01",
        description: "جاري العمل في الطابق الثاني",
      },
      {
        id: "finishing",
        name: "أعمال التشطيب",
        status: "pending",
        expectedDate: "2024-05-15",
        description: "في انتظار انتهاء الهيكل الإنشائي",
      },
      {
        id: "delivery",
        name: "التسليم النهائي",
        status: "pending",
        expectedDate: "2024-06-15",
        description: "التسليم النهائي للعميل",
      },
    ],
    updates: [
      {
        date: "2024-01-20",
        message: "تم البدء في أعمال الهيكل الإنشائي للطابق الثاني",
        type: "info",
      },
      {
        date: "2024-01-18",
        message: "تم الانتهاء من أعمال الأساسات بنجاح",
        type: "success",
      },
      {
        date: "2024-01-15",
        message: "تأخير طفيف بسبب الأحوال الجوية - سيتم التعويض",
        type: "warning",
      },
    ],
    images: [
      {
        url: "/construction-foundation.png",
        caption: "أعمال الأساسات",
        date: "2024-03-10",
      },
      {
        url: "/building-structure-progress.png",
        caption: "تقدم الهيكل الإنشائي",
        date: "2024-04-05",
      },
      {
        url: "/placeholder-rui9c.png",
        caption: "منظر عام للموقع",
        date: "2024-04-15",
      },
    ],
  },
}

export function ProjectTracking() {
  const { language, t } = useLanguage()
  const [searchId, setSearchId] = useState("")
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const searchProject = async () => {
    if (!searchId.trim()) return

    setIsSearching(true)
    setNotFound(false)

    // Simulate API call
    setTimeout(() => {
      const project = mockProjects[searchId.toUpperCase()]
      if (project) {
        setProjectData(project)
        setNotFound(false)
      } else {
        setProjectData(null)
        setNotFound(true)
      }
      setIsSearching(false)
    }, 1500)
  }

  const getStatusIcon = (status: ProjectStage["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "inProgress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "delayed":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Pause className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: ProjectStage["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "inProgress":
        return "bg-yellow-100 text-yellow-800"
      case "delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Search className="h-4 w-4" />
          {t("tracking.title")}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("tracking.title")}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t("tracking.description")}</p>
      </motion.div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder={t("tracking.form.placeholder")}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && searchProject()}
              />
              <Button
                onClick={searchProject}
                disabled={!searchId.trim() || isSearching}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                {isSearching ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2"
                  >
                    <Search className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                {t("tracking.form.search")}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {language === "ar" ? "مثال: AZ-2024-001" : "Example: AZ-2024-001"}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {notFound && (
          <motion.div
            key="notFound"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">{t("tracking.notFound.title")}</h3>
                <p className="text-red-700 mb-4">{t("tracking.notFound.message")}</p>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                  {t("tracking.notFound.contact")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {projectData && (
          <motion.div
            key="projectData"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-yellow-500" />
                  {t("tracking.project.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{projectData.name}</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{projectData.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{projectData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {t("tracking.project.startDate")}: {formatDate(projectData.startDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {t("tracking.project.progress")}
                    </h4>
                    <div className="space-y-2">
                      <Progress value={projectData.progress} className="h-3" />
                      <p className="text-2xl font-bold text-yellow-600">{projectData.progress}%</p>
                      <p className="text-sm text-gray-600">
                        {t("tracking.project.expectedEnd")}: {formatDate(projectData.expectedEndDate)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t("tracking.team.title")}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium">{t("tracking.team.projectManager")}</p>
                        <p className="text-gray-600">{projectData.manager.name}</p>
                        <p className="text-gray-600">{projectData.manager.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Stages */}
            <Card>
              <CardHeader>
                <CardTitle>{t("tracking.stages.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectData.stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(stage.status)}
                        {index < projectData.stages.length - 1 && (
                          <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 mt-2" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{stage.name}</h4>
                          <Badge className={getStatusColor(stage.status)}>{t(`tracking.status.${stage.status}`)}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{stage.description}</p>
                        <div className="text-xs text-gray-500">
                          {stage.startDate && (
                            <span>
                              {t("tracking.timeline.started")}: {formatDate(stage.startDate)}
                            </span>
                          )}
                          {stage.endDate && (
                            <span className="ml-4">
                              {t("tracking.timeline.completed")}: {formatDate(stage.endDate)}
                            </span>
                          )}
                          {stage.expectedDate && !stage.endDate && (
                            <span className="ml-4">
                              {t("tracking.timeline.expected")}: {formatDate(stage.expectedDate)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latest Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-yellow-500" />
                    {t("tracking.updates.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projectData.updates.length > 0 ? (
                    <div className="space-y-4">
                      {projectData.updates.map((update, index) => (
                        <div key={index} className="border-l-4 border-yellow-400 pl-4">
                          <p className="text-sm font-medium">{update.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(update.date)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">{t("tracking.updates.noUpdates")}</p>
                  )}
                </CardContent>
              </Card>

              {/* Progress Photos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-yellow-500" />
                    {t("tracking.gallery.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {projectData.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {projectData.images.map((image, index) => (
                        <div key={index} className="relative group cursor-pointer">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.caption}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                          <p className="text-xs text-gray-600 mt-1 truncate">{image.caption}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">{t("tracking.gallery.noImages")}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
