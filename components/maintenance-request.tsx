"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wrench,
  User,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Clock,
  Camera,
  CheckCircle,
  RefreshCw,
  Upload,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

interface MaintenanceData {
  name: string
  phone: string
  email: string
  address: string
  type: string
  priority: string
  category: string
  description: string
  preferredDate: string
  preferredTime: string
  accessNotes: string
  contactPerson: string
  contactPhone: string
  images: File[]
}

interface MaintenanceResult {
  success: boolean
  referenceNumber: string
}

export function MaintenanceRequest() {
  const { language, t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestResult, setRequestResult] = useState<MaintenanceResult | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [formData, setFormData] = useState<MaintenanceData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "",
    priority: "",
    category: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
    accessNotes: "",
    contactPerson: "",
    contactPhone: "",
    images: [],
  })

  const updateFormData = (field: keyof MaintenanceData, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (validationErrors.length > 0) {
      setValidationErrors([])
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      type: "",
      priority: "",
      category: "",
      description: "",
      preferredDate: "",
      preferredTime: "",
      accessNotes: "",
      contactPerson: "",
      contactPhone: "",
      images: [],
    })
    setCurrentStep(1)
    setRequestResult(null)
    setValidationErrors([])
  }

  const validateStep = (step: number): string[] => {
    const errors: string[] = []

    switch (step) {
      case 1:
        if (!formData.name.trim()) errors.push(language === "ar" ? "الاسم مطلوب" : "Name is required")
        if (!formData.phone.trim()) errors.push(language === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required")
        if (!formData.email.trim()) errors.push(language === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required")
        if (!formData.address.trim()) errors.push(language === "ar" ? "العنوان مطلوب" : "Address is required")
        break
      case 2:
        if (!formData.type) errors.push(language === "ar" ? "نوع الصيانة مطلوب" : "Maintenance type is required")
        if (!formData.priority) errors.push(language === "ar" ? "مستوى الأولوية مطلوب" : "Priority level is required")
        if (!formData.category)
          errors.push(language === "ar" ? "فئة الصيانة مطلوبة" : "Maintenance category is required")
        if (!formData.description.trim())
          errors.push(language === "ar" ? "وصف المشكلة مطلوب" : "Problem description is required")
        break
      case 3:
        if (!formData.preferredDate)
          errors.push(language === "ar" ? "التاريخ المفضل مطلوب" : "Preferred date is required")
        if (!formData.preferredTime)
          errors.push(language === "ar" ? "الوقت المفضل مطلوب" : "Preferred time is required")
        break
      case 4:
        if (!formData.contactPerson.trim())
          errors.push(language === "ar" ? "اسم الشخص المسؤول مطلوب" : "Contact person name is required")
        if (!formData.contactPhone.trim())
          errors.push(language === "ar" ? "رقم هاتف الشخص المسؤول مطلوب" : "Contact person phone is required")
        break
    }

    return errors
  }

  const isStepValid = (step: number) => {
    return validateStep(step).length === 0
  }

  const submitRequest = async () => {
    console.log("[v0] Starting form submission...")

    const allErrors: string[] = []
    for (let i = 1; i <= 4; i++) {
      allErrors.push(...validateStep(i))
    }

    if (allErrors.length > 0) {
      console.log("[v0] Validation errors found:", allErrors)
      setValidationErrors(allErrors)
      return
    }

    setIsSubmitting(true)
    setValidationErrors([])

    console.log("[v0] Form data being submitted:", formData)

    setTimeout(() => {
      const referenceNumber = `MR-${Date.now().toString().slice(-6)}`
      console.log("[v0] Request submitted successfully with reference:", referenceNumber)
      setRequestResult({
        success: true,
        referenceNumber,
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) => file.type.startsWith("image/")).slice(0, 5)
    updateFormData("images", [...formData.images, ...validFiles].slice(0, 5))
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    updateFormData("images", newImages)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getMinDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  if (requestResult?.success) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-8 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </motion.div>

              <h2 className="text-2xl font-bold text-green-800 mb-4">{t("maintenance.success.title")}</h2>

              <p className="text-green-700 mb-6">{t("maintenance.success.message")}</p>

              <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                <p className="text-sm text-gray-600 mb-1">{t("maintenance.success.reference")}</p>
                <p className="text-lg font-mono font-bold text-green-600">{requestResult.referenceNumber}</p>
              </div>

              <div className="bg-red-50 p-3 rounded-lg border border-red-200 mb-6">
                <p className="text-sm text-red-700">{t("maintenance.success.emergency")}</p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700 text-white">
                  {t("maintenance.success.backHome")}
                </Button>
                <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent">
                  {t("maintenance.success.trackRequest")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Wrench className="h-4 w-4" />
          {t("maintenance.title")}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("maintenance.title")}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t("maintenance.description")}</p>
      </motion.div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step <= currentStep ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-12 h-1 mx-2 transition-colors ${step < currentStep ? "bg-yellow-500" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && t("maintenance.form.clientInfo")}
            {currentStep === 2 && t("maintenance.form.requestInfo")}
            {currentStep === 3 && t("maintenance.form.schedulingInfo")}
            {currentStep === 4 && t("maintenance.form.accessInfo")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t("maintenance.form.name")}
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      placeholder={t("maintenance.form.name")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t("maintenance.form.phone")}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+20 1XX XXX XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t("maintenance.form.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t("maintenance.form.address")}
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    placeholder={t("maintenance.form.address")}
                    rows={3}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      {t("maintenance.form.type")}
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("maintenance.form.type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">{t("maintenance.form.type.emergency")}</SelectItem>
                        <SelectItem value="routine">{t("maintenance.form.type.routine")}</SelectItem>
                        <SelectItem value="repair">{t("maintenance.form.type.repair")}</SelectItem>
                        <SelectItem value="renovation">{t("maintenance.form.type.renovation")}</SelectItem>
                        <SelectItem value="inspection">{t("maintenance.form.type.inspection")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {t("maintenance.form.priority")}
                    </Label>
                    <Select value={formData.priority} onValueChange={(value) => updateFormData("priority", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("maintenance.form.priority")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">{t("maintenance.form.priority.low")}</SelectItem>
                        <SelectItem value="medium">{t("maintenance.form.priority.medium")}</SelectItem>
                        <SelectItem value="high">{t("maintenance.form.priority.high")}</SelectItem>
                        <SelectItem value="urgent">{t("maintenance.form.priority.urgent")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">{t("maintenance.form.category")}</Label>
                    <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("maintenance.form.category")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="structural">{t("maintenance.form.category.structural")}</SelectItem>
                        <SelectItem value="electrical">{t("maintenance.form.category.electrical")}</SelectItem>
                        <SelectItem value="plumbing">{t("maintenance.form.category.plumbing")}</SelectItem>
                        <SelectItem value="hvac">{t("maintenance.form.category.hvac")}</SelectItem>
                        <SelectItem value="finishing">{t("maintenance.form.category.finishing")}</SelectItem>
                        <SelectItem value="other">{t("maintenance.form.category.other")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t("maintenance.form.description")}</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    placeholder={t("maintenance.form.description")}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    {t("maintenance.form.images")}
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">{t("maintenance.form.images.upload")}</p>
                      <p className="text-xs text-gray-500">{t("maintenance.form.images.max")}</p>
                    </label>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image) || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {t("maintenance.form.preferredDate")}
                    </Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => updateFormData("preferredDate", e.target.value)}
                      min={getMinDate()}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">{t("maintenance.form.preferredTime")}</Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) => updateFormData("preferredTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("maintenance.form.preferredTime")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">{t("maintenance.form.time.morning")}</SelectItem>
                        <SelectItem value="afternoon">{t("maintenance.form.time.afternoon")}</SelectItem>
                        <SelectItem value="evening">{t("maintenance.form.time.evening")}</SelectItem>
                        <SelectItem value="anytime">{t("maintenance.form.time.anytime")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formData.priority && (
                  <div className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">{t("maintenance.form.priority")}</span>
                      <Badge className={getPriorityColor(formData.priority)}>
                        {t(`maintenance.form.priority.${formData.priority}`)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formData.priority === "urgent" &&
                        (language === "ar" ? "سيتم التواصل معك خلال ساعة واحدة" : "We will contact you within 1 hour")}
                      {formData.priority === "high" &&
                        (language === "ar" ? "سيتم التواصل معك خلال 4 ساعات" : "We will contact you within 4 hours")}
                      {formData.priority === "medium" &&
                        (language === "ar" ? "سيتم التواصل معك خلال 24 ساعة" : "We will contact you within 24 hours")}
                      {formData.priority === "low" &&
                        (language === "ar" ? "سيتم التواصل معك خلال 48 ساعة" : "We will contact you within 48 hours")}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">{t("maintenance.form.contactPerson")}</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => updateFormData("contactPerson", e.target.value)}
                      placeholder={t("maintenance.form.contactPerson")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">{t("maintenance.form.contactPhone")}</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => updateFormData("contactPhone", e.target.value)}
                      placeholder="+20 1XX XXX XXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessNotes">{t("maintenance.form.accessNotes")}</Label>
                  <Textarea
                    id="accessNotes"
                    value={formData.accessNotes}
                    onChange={(e) => updateFormData("accessNotes", e.target.value)}
                    placeholder={t("maintenance.form.accessNotes")}
                    rows={4}
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-3">
                    {language === "ar" ? "ملخص الطلب" : "Request Summary"}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">{t("maintenance.form.type")}:</span>
                      <span className="font-medium ml-2">{t(`maintenance.form.type.${formData.type}`)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t("maintenance.form.priority")}:</span>
                      <Badge className={`${getPriorityColor(formData.priority)} ml-2`}>
                        {t(`maintenance.form.priority.${formData.priority}`)}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">{t("maintenance.form.category")}:</span>
                      <span className="font-medium ml-2">{t(`maintenance.form.category.${formData.category}`)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t("maintenance.form.preferredDate")}:</span>
                      <span className="font-medium ml-2">{formData.preferredDate}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Separator className="my-6" />

          <div className="flex justify-between">
            <div>
              {currentStep > 1 && (
                <Button onClick={prevStep} variant="outline">
                  {language === "ar" ? "السابق" : "Previous"}
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              <Button onClick={resetForm} variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={() => {
                    const errors = validateStep(currentStep)
                    if (errors.length > 0) {
                      setValidationErrors(errors)
                    } else {
                      nextStep()
                    }
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  {language === "ar" ? "التالي" : "Next"}
                </Button>
              ) : (
                <Button
                  onClick={submitRequest}
                  disabled={isSubmitting}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2"
                    >
                      <Wrench className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Wrench className="h-4 w-4 mr-2" />
                  )}
                  {isSubmitting
                    ? language === "ar"
                      ? "جاري الإرسال..."
                      : "Submitting..."
                    : t("maintenance.form.submit")}
                </Button>
              )}
            </div>
          </div>

          {validationErrors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="font-medium text-red-800">
                  {language === "ar" ? "يرجى إصلاح الأخطاء التالية:" : "Please fix the following errors:"}
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
