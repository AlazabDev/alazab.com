'use client'

import { useLanguage } from '@/contexts/language-context'
import { Bell, Trash2, CheckCircle, AlertCircle, Info } from 'lucide-react'

export default function NotificationsPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'الإشعارات',
      noNotifications: 'لا توجد إشعارات جديدة',
      markAllAsRead: 'وضع علامة على الكل كمقروء',
      deleteAll: 'حذف الكل',
      success: 'نجح',
      warning: 'تحذير',
      info: 'معلومات',
      today: 'اليوم',
      yesterday: 'أمس',
      notifications: [
        { id: 1, type: 'success', title: 'تم قبول مشروعك', message: 'تم الموافقة على مشروعك الجديد بنجاح', time: 'قبل 2 ساعة' },
        { id: 2, type: 'info', title: 'تحديث جديد', message: 'تم إطلاق ميزات جديدة في النظام', time: 'قبل 4 ساعات' },
        { id: 3, type: 'warning', title: 'انتبه', message: 'سينتهي اشتراكك بعد 5 أيام', time: 'أمس' },
      ]
    },
    en: {
      title: 'Notifications',
      noNotifications: 'No new notifications',
      markAllAsRead: 'Mark all as read',
      deleteAll: 'Delete all',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      today: 'Today',
      yesterday: 'Yesterday',
      notifications: [
        { id: 1, type: 'success', title: 'Project Approved', message: 'Your new project has been approved successfully', time: '2 hours ago' },
        { id: 2, type: 'info', title: 'New Update', message: 'New features have been released in the system', time: '4 hours ago' },
        { id: 3, type: 'warning', title: 'Attention', message: 'Your subscription will end in 5 days', time: 'Yesterday' },
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />
      default:
        return <Bell className="w-6 h-6 text-gray-500" />
    }
  }

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {texts.title}
            </h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium">
                {texts.markAllAsRead}
              </button>
              <button className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg text-sm font-medium">
                {texts.deleteAll}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {texts.notifications.length > 0 ? (
            <div className="space-y-4">
              {texts.notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-start gap-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {notif.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {notif.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      {notif.time}
                    </p>
                  </div>
                  <button className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {texts.noNotifications}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
