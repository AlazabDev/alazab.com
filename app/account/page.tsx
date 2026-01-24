'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { User, Mail, Phone, MapPin, Edit2, LogOut } from 'lucide-react'

export default function AccountPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'حسابي',
      profileInfo: 'معلومات الملف الشخصي',
      editProfile: 'تعديل الملف الشخصي',
      logout: 'تسجيل الخروج',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      address: 'العنوان',
      accountSettings: 'إعدادات الحساب',
      security: 'الأمان',
      changePassword: 'تغيير كلمة المرور',
      twoFactor: 'المصادقة الثنائية',
      connectedApps: 'التطبيقات المتصلة',
      preferences: 'التفضيلات',
      emailNotifications: 'إشعارات البريد الإلكتروني',
      pushNotifications: 'إشعارات Push',
      privateProfile: 'ملف شخصي خاص'
    },
    en: {
      title: 'My Account',
      profileInfo: 'Profile Information',
      editProfile: 'Edit Profile',
      logout: 'Logout',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      accountSettings: 'Account Settings',
      security: 'Security',
      changePassword: 'Change Password',
      twoFactor: 'Two-Factor Authentication',
      connectedApps: 'Connected Apps',
      preferences: 'Preferences',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      privateProfile: 'Private Profile'
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {texts.title}
            </h1>
            <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              {texts.logout}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {texts.profileInfo}
              </h2>
              <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
                <Edit2 className="w-4 h-4" />
                {texts.editProfile}
              </Button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{texts.name}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">محمد أحمد</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Mail className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{texts.email}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">example@azab.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Phone className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{texts.phone}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">+966 50 000 0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <MapPin className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{texts.address}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {texts.accountSettings}
              </h3>
              <div className="space-y-4">
                <Button className="w-full justify-start bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-left">
                  {texts.changePassword}
                </Button>
                <Button className="w-full justify-start bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-left">
                  {texts.twoFactor}
                </Button>
                <Button className="w-full justify-start bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-left">
                  {texts.connectedApps}
                </Button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {texts.preferences}
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-900 dark:text-white">{texts.emailNotifications}</span>
                </label>
                <label className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-900 dark:text-white">{texts.pushNotifications}</span>
                </label>
                <label className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-gray-900 dark:text-white">{texts.privateProfile}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
