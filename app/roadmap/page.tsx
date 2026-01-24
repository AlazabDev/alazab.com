'use client'

import { useLanguage } from '@/contexts/language-context'
import { CheckCircle, Circle, Clock } from 'lucide-react'

export default function RoadmapPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'خارطة الطريق',
      subtitle: 'شاهد ما نخطط له للمستقبل',
      completed: 'مكتمل',
      inProgress: 'قيد التطوير',
      planned: 'مخطط',
      roadmap: [
        {
          quarter: 'Q1 2024',
          status: 'مكتمل',
          items: [
            'إطلاق النظام الأساسي',
            'المصادقة الثنائية',
            'لوحة التحكم الأساسية'
          ]
        },
        {
          quarter: 'Q2 2024',
          status: 'قيد التطوير',
          items: [
            'تطبيق الهاتف المحمول',
            'التقارير المتقدمة',
            'تكامل API'
          ]
        },
        {
          quarter: 'Q3 2024',
          status: 'مخطط',
          items: [
            'الذكاء الاصطناعي والتحليلات',
            'السيطرة الآلية',
            'التكامل مع أنظمة ثالثة'
          ]
        }
      ]
    },
    en: {
      title: 'Roadmap',
      subtitle: 'See what we have planned for the future',
      completed: 'Completed',
      inProgress: 'In Progress',
      planned: 'Planned',
      roadmap: [
        {
          quarter: 'Q1 2024',
          status: 'مكتمل',
          items: [
            'Platform Launch',
            'Two-Factor Authentication',
            'Basic Dashboard'
          ]
        },
        {
          quarter: 'Q2 2024',
          status: 'قيد التطوير',
          items: [
            'Mobile App',
            'Advanced Reports',
            'API Integration'
          ]
        },
        {
          quarter: 'Q3 2024',
          status: 'مخطط',
          items: [
            'AI and Analytics',
            'Automation Controls',
            'Third-party Integrations'
          ]
        }
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  const getStatusIcon = (status: string) => {
    if (status === 'مكتمل' || status === 'Completed')
      return <CheckCircle className="w-6 h-6 text-green-500" />
    if (status === 'قيد التطوير' || status === 'In Progress')
      return <Clock className="w-6 h-6 text-amber-500" />
    return <Circle className="w-6 h-6 text-gray-400" />
  }

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {texts.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {texts.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {texts.roadmap.map((quarter, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <div className="flex items-center gap-4 mb-6">
                  {getStatusIcon(quarter.status)}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {quarter.quarter}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {quarter.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 pl-4 border-l-2 border-amber-600">
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
