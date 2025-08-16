"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { User, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
  const { t, language } = useLanguage()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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

  const handleSave = async () => {
    setSaving(true)
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("settings")}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t("manageAccountSettings")}</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">{t("profile")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
          <TabsTrigger value="security">{t("security")}</TabsTrigger>
          <TabsTrigger value="preferences">{t("preferences")}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t("profileInformation")}
              </CardTitle>
              <CardDescription>{t("updateProfileInformation")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-yellow-500 text-white text-2xl">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    {t("changePhoto")}
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">{t("photoRequirements")}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t("fullName")}</Label>
                  <Input
                    id="fullName"
                    defaultValue={user?.user_metadata?.full_name || ""}
                    placeholder={t("enterFullName")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input id="phone" type="tel" placeholder={t("enterPhone")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">{t("position")}</Label>
                  <Input id="position" placeholder={t("enterPosition")} />
                </div>
              </div>

              <Button onClick={handleSave} disabled={saving} className="bg-yellow-500 hover:bg-yellow-600">
                {saving ? t("saving") : t("saveChanges")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t("notificationSettings")}
              </CardTitle>
              <CardDescription>{t("manageNotificationPreferences")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t("emailNotifications")}</Label>
                    <p className="text-sm text-gray-500">{t("receiveEmailUpdates")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t("projectUpdates")}</Label>
                    <p className="text-sm text-gray-500">{t("notifyProjectChanges")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t("maintenanceAlerts")}</Label>
                    <p className="text-sm text-gray-500">{t("urgentMaintenanceNotifications")}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t("securitySettings")}
              </CardTitle>
              <CardDescription>{t("manageAccountSecurity")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>{t("changePassword")}</Label>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    {t("updatePassword")}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t("twoFactorAuth")}</Label>
                    <p className="text-sm text-gray-500">{t("enableTwoFactor")}</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                {t("preferences")}
              </CardTitle>
              <CardDescription>{t("customizeExperience")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>{t("language")}</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    {t("currentLanguage")}: {language === "ar" ? "العربية" : "English"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t("darkMode")}</Label>
                    <p className="text-sm text-gray-500">{t("enableDarkTheme")}</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
