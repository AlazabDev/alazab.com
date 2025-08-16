"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Settings,
  FolderOpen,
  Users,
  Shield,
  UserCheck,
  Headphones,
  BarChart3,
  FileText,
  Calendar,
  DollarSign,
  Truck,
  X,
  ChevronRight,
  LogIn,
  LogOut,
  User,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { t, language } = useLanguage()
  const isRTL = language === "ar"
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    onClose()
    window.location.href = "/"
  }

  const adminMenuItems = [
    {
      id: "projects",
      icon: FolderOpen,
      titleAr: "إدارة المشروعات",
      titleEn: "Project Management",
      href: "/admin/projects",
      color: "text-yellow-600",
    },
    {
      id: "maintenance",
      icon: Settings,
      titleAr: "إدارة الصيانات",
      titleEn: "Maintenance Management",
      href: "/admin/maintenance",
      color: "text-yellow-700",
    },
    {
      id: "customers",
      icon: Headphones,
      titleAr: "خدمة العملاء",
      titleEn: "Customer Service",
      href: "/admin/customers",
      color: "text-yellow-500",
    },
    {
      id: "quality",
      icon: Shield,
      titleAr: "إدارة الجودة",
      titleEn: "Quality Management",
      href: "/admin/quality",
      color: "text-yellow-600",
    },
    {
      id: "hr",
      icon: UserCheck,
      titleAr: "الموارد البشرية",
      titleEn: "Human Resources",
      href: "/admin/hr",
      color: "text-yellow-700",
    },
    {
      id: "employees",
      icon: Users,
      titleAr: "إدارة الموظفين",
      titleEn: "Employee Management",
      href: "/admin/employees",
      color: "text-yellow-500",
    },
    {
      id: "reports",
      icon: BarChart3,
      titleAr: "التقارير والإحصائيات",
      titleEn: "Reports & Analytics",
      href: "/admin/reports",
      color: "text-yellow-600",
    },
    {
      id: "documents",
      icon: FileText,
      titleAr: "إدارة المستندات",
      titleEn: "Document Management",
      href: "/admin/documents",
      color: "text-yellow-700",
    },
    {
      id: "schedule",
      icon: Calendar,
      titleAr: "جدولة المهام",
      titleEn: "Task Scheduling",
      href: "/admin/schedule",
      color: "text-yellow-500",
    },
    {
      id: "finance",
      icon: DollarSign,
      titleAr: "الإدارة المالية",
      titleEn: "Financial Management",
      href: "/admin/finance",
      color: "text-yellow-600",
    },
    {
      id: "supplies",
      icon: Truck,
      titleAr: "إدارة التوريدات",
      titleEn: "Supply Management",
      href: "/admin/supplies",
      color: "text-yellow-700",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{
              x: isRTL ? 320 : -320,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: isRTL ? 320 : -320,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-[101] overflow-y-auto border-r border-gray-200 dark:border-gray-700 flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("adminPanel")}</h2>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                    {language === "ar" ? "شركة العزب للإنشاءات" : "Al-Azab Construction"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-gray-800 transition-colors group"
              >
                <X className="w-5 h-5 text-gray-500 group-hover:text-yellow-600" />
              </button>
            </div>

            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              {!user ? (
                <div className="space-y-3">
                  <Link href="/auth/login" onClick={onClose}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                      <LogIn className="w-4 h-4 mr-2" />
                      {t("login")}
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up" onClick={onClose}>
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {t("signUp")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("welcome")}</p>
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                </div>
              )}
            </div>

            {/* Menu Items - Only show if user is logged in */}
            {user && (
              <div className="flex-1 p-4 space-y-2">
                {adminMenuItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-yellow-50 dark:hover:bg-gray-800 transition-all duration-200 group border border-transparent hover:border-yellow-200 dark:hover:border-gray-700"
                      >
                        <div
                          className={`p-2 rounded-lg bg-yellow-100 dark:bg-gray-800 group-hover:scale-110 transition-transform group-hover:bg-yellow-200 dark:group-hover:bg-gray-700 ${item.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">
                            {language === "ar" ? item.titleAr : item.titleEn}
                          </h3>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors ${isRTL ? "rotate-180" : ""}`}
                        />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {user && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback className="bg-yellow-500 text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {user.user_metadata?.full_name || user.email}
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/admin/settings" onClick={onClose} className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs border-yellow-500 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      {t("settings")}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex-1 text-xs border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    <LogOut className="w-3 h-3 mr-1" />
                    {t("logout")}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
