'use client'

import { useLanguage } from '@/contexts/language-context'
import { CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react'

export default function StatusPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'حالة النظام',
      allSystems: 'جميع الأنظمة تعمل بشكل طبيعي',
      uptime: 'وقت التشغيل',
      uptime99: '99.9%',
      lastUpdated: 'آخر تحديث:',
      systemStatus: 'حالة الأنظمة',
      systems: [
        { name: 'الخادم الرئيسي', status: 'تشغيل' },
        { name: 'قاعدة البيانات', status: 'تشغيل' },
        { name: 'API', status: 'تشغيل' },
        { name: 'التطبيق المحمول', status: 'تشغيل' },
        { name: 'الخدمات الثالثة', status: 'تشغيل' },
      ]
    },
    en: {
      title: 'System Status',
      allSystems: 'All systems are operating normally',
      uptime: 'Uptime',
      uptime99: '99.9%',
      lastUpdated: 'Last Updated:',
      systemStatus: 'System Status',
      systems: [
        { name: 'Main Server', status: 'Operational' },
        { name: 'Database', status: 'Operational' },
        { name: 'API', status: 'Operational' },
        { name: 'Mobile App', status: 'Operational' },
        { name: 'Third-party Services', status: 'Operational' },
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {texts.title}
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Overall Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center mb-12">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {texts.allSystems}
            </h2>
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{texts.uptime}</p>
                <p className="text-4xl font-bold text-green-600">{texts.uptime99}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{texts.lastUpdated}</p>
                <p className="text-lg text-gray-900 dark:text-white">قبل 5 دقائق</p>
              </div>
            </div>
          </div>

          {/* System Components */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {texts.systemStatus}
            </h3>
            <div className="space-y-4">
              {texts.systems.map((system, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-900 dark:text-white font-medium">{system.name}</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600">{system.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
