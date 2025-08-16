"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Building,
  DollarSign,
  MessageSquare,
  CheckCircle,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/contexts/language-context"

interface BookingData {
  name: string
  email: string
  phone: string
  projectType: string
  budget: string
  description: string
  preferredDate: string
  preferredTime: string
  consultationType: string
}

interface BookingResult {
  success: boolean
  referenceNumber: string
}

export function ConsultationBooking() {
  const { language, t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null)
  const [formData, setFormData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
    consultationType: "",
  })

  const updateFormData = (field: keyof BookingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      description: "",
      preferredDate: "",
      preferredTime: "",
      consultationType: "",
    })
    setCurrentStep(1)
    setBookingResult(null)
  }

  const submitBooking = async () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const referenceNumber = `AZ-${Date.now().toString().slice(-6)}`
      setBookingResult({
        success: true,
        referenceNumber,
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.projectType && formData.budget && formData.description
      case 3:
        return formData.preferredDate && formData.preferredTime && formData.consultationType
      default:
        return false
    }
  }

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  if (bookingResult?.success) {
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

              <h2 className="text-2xl font-bold text-green-800 mb-4">{t("booking.success.title")}</h2>

              <p className="text-green-700 mb-6">{t("booking.success.message")}</p>

              <div className="bg-white p-4 rounded-lg border border-green-200 mb-6">
                <p className="text-sm text-gray-600 mb-1">{t("booking.success.reference")}</p>
                <p className="text-lg font-mono font-bold text-green-600">{bookingResult.referenceNumber}</p>
              </div>

              <Button onClick={resetForm} className="bg-green-600 hover:bg-green-700 text-white">
                {t("booking.success.backHome")}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Calendar className="h-4 w-4" />
          {t("booking.title")}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("booking.title")}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t("booking.description")}</p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step <= currentStep ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-1 mx-2 transition-colors ${step < currentStep ? "bg-yellow-500" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && t("booking.form.personalInfo")}
            {currentStep === 2 && t("booking.form.projectInfo")}
            {currentStep === 3 && t("booking.form.schedulingInfo")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
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
                      {t("booking.form.name")}
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      placeholder={t("booking.form.name")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t("booking.form.phone")}
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
                    {t("booking.form.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Project Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectType" className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {t("booking.form.projectType")}
                    </Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => updateFormData("projectType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("booking.form.projectType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">{t("calculator.projectType.residential")}</SelectItem>
                        <SelectItem value="commercial">{t("calculator.projectType.commercial")}</SelectItem>
                        <SelectItem value="industrial">{t("calculator.projectType.industrial")}</SelectItem>
                        <SelectItem value="renovation">{t("calculator.projectType.renovation")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget" className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {t("booking.form.budget")}
                    </Label>
                    <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("booking.form.budget")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under100k">{t("booking.form.budget.under100k")}</SelectItem>
                        <SelectItem value="100k-500k">{t("booking.form.budget.100k-500k")}</SelectItem>
                        <SelectItem value="500k-1m">{t("booking.form.budget.500k-1m")}</SelectItem>
                        <SelectItem value="over1m">{t("booking.form.budget.over1m")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {t("booking.form.description")}
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    placeholder={t("booking.form.description")}
                    rows={4}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Scheduling Information */}
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
                      <Calendar className="h-4 w-4" />
                      {t("booking.form.preferredDate")}
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
                    <Label htmlFor="preferredTime" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {t("booking.form.preferredTime")}
                    </Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) => updateFormData("preferredTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("booking.form.preferredTime")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">{t("booking.form.time.morning")}</SelectItem>
                        <SelectItem value="afternoon">{t("booking.form.time.afternoon")}</SelectItem>
                        <SelectItem value="evening">{t("booking.form.time.evening")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consultationType">{t("booking.form.consultationType")}</Label>
                  <Select
                    value={formData.consultationType}
                    onValueChange={(value) => updateFormData("consultationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("booking.form.consultationType")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">{t("booking.form.consultationType.office")}</SelectItem>
                      <SelectItem value="site">{t("booking.form.consultationType.site")}</SelectItem>
                      <SelectItem value="online">{t("booking.form.consultationType.online")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Separator className="my-6" />

          {/* Navigation Buttons */}
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

              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  {language === "ar" ? "التالي" : "Next"}
                </Button>
              ) : (
                <Button
                  onClick={submitBooking}
                  disabled={!isStepValid(currentStep) || isSubmitting}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="mr-2"
                    >
                      <Calendar className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <Calendar className="h-4 w-4 mr-2" />
                  )}
                  {t("booking.form.submit")}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
