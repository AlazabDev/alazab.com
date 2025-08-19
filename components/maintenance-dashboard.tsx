"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Settings,
  Search,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Phone,
  MapPin,
  Calendar,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { MaintenanceDetailsModal } from "./maintenance-details-modal"

interface MaintenanceRequest {
  id: string
  reference_number: string
  client_name: string
  client_phone: string
  client_email: string
  client_address: string
  maintenance_type: string
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  description: string
  status: "pending" | "in-progress" | "completed" | "cancelled"
  created_at: string
  scheduled_at: string
  assigned_technician?: string
  estimated_cost?: number
  actual_cost?: number
}

interface MaintenanceDashboardProps {
  initialRequests?: MaintenanceRequest[]
}

export function MaintenanceDashboard({ initialRequests = [] }: MaintenanceDashboardProps) {
  const { language } = useLanguage()
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchRequests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/maintenance")
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests || [])
      }
    } catch (error) {
      console.error("Failed to fetch requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (initialRequests.length === 0) {
      fetchRequests()
    }
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <Settings className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client_phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    inProgress: requests.filter((r) => r.status === "in-progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
  }

  const handleUpdateRequest = (updatedRequest: MaintenanceRequest) => {
    setRequests((prev) => prev.map((req) => (req.id === updatedRequest.id ? updatedRequest : req)))
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {language === "ar" ? "إجمالي الطلبات" : "Total Requests"}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Settings className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {language === "ar" ? "في الانتظار" : "Pending"}
                </p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {language === "ar" ? "قيد التنفيذ" : "In Progress"}
                </p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {language === "ar" ? "مكتملة" : "Completed"}
                </p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={
                    language === "ar"
                      ? "البحث بالاسم أو رقم المرجع أو الهاتف..."
                      : "Search by name, reference, or phone..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={language === "ar" ? "الحالة" : "Status"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === "ar" ? "جميع الحالات" : "All Status"}</SelectItem>
                  <SelectItem value="pending">{language === "ar" ? "في الانتظار" : "Pending"}</SelectItem>
                  <SelectItem value="in-progress">{language === "ar" ? "قيد التنفيذ" : "In Progress"}</SelectItem>
                  <SelectItem value="completed">{language === "ar" ? "مكتملة" : "Completed"}</SelectItem>
                  <SelectItem value="cancelled">{language === "ar" ? "ملغية" : "Cancelled"}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={language === "ar" ? "الأولوية" : "Priority"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === "ar" ? "جميع الأولويات" : "All Priorities"}</SelectItem>
                  <SelectItem value="urgent">{language === "ar" ? "عاجل" : "Urgent"}</SelectItem>
                  <SelectItem value="high">{language === "ar" ? "عالي" : "High"}</SelectItem>
                  <SelectItem value="medium">{language === "ar" ? "متوسط" : "Medium"}</SelectItem>
                  <SelectItem value="low">{language === "ar" ? "منخفض" : "Low"}</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={fetchRequests} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {language === "ar" ? "طلبات الصيانة" : "Maintenance Requests"}
            <Badge variant="secondary" className="ml-2">
              {filteredRequests.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{request.client_name}</h3>
                      <Badge className={getPriorityColor(request.priority)}>
                        {language === "ar"
                          ? request.priority === "urgent"
                            ? "عاجل"
                            : request.priority === "high"
                              ? "عالي"
                              : request.priority === "medium"
                                ? "متوسط"
                                : "منخفض"
                          : request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(request.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {language === "ar"
                            ? request.status === "pending"
                              ? "في الانتظار"
                              : request.status === "in-progress"
                                ? "قيد التنفيذ"
                                : request.status === "completed"
                                  ? "مكتملة"
                                  : "ملغية"
                            : request.status.replace("-", " ").charAt(0).toUpperCase() +
                              request.status.replace("-", " ").slice(1)}
                        </div>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{request.reference_number}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{request.client_phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(request.scheduled_at).toLocaleDateString("ar-EG")}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{request.client_address}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{request.description}</p>
                    </div>

                    {request.assigned_technician && (
                      <div className="mt-2">
                        <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                          {language === "ar" ? "مُكلف: " : "Assigned to: "}
                          {request.assigned_technician}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 bg-transparent"
                      onClick={() => setSelectedRequest(request)}
                    >
                      <Eye className="h-4 w-4" />
                      {language === "ar" ? "عرض" : "View"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {language === "ar" ? "لا توجد طلبات صيانة" : "No maintenance requests"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === "ar"
                    ? "لم يتم العثور على طلبات تطابق معايير البحث"
                    : "No requests match your search criteria"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      {selectedRequest && (
        <MaintenanceDetailsModal
          request={selectedRequest}
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onUpdate={handleUpdateRequest}
        />
      )}
    </div>
  )
}
