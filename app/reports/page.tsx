'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Download, BarChart3, TrendingUp } from 'lucide-react'

export default function ReportsPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'التقارير والتحليلات',
      generateReport: 'إنشاء تقرير جديد',
      month: 'الشهر',
      year: 'السنة',
      type: 'نوع التقرير',
      status: 'الحالة',
      createdDate: 'تاريخ الإنشاء',
      download: 'تحميل',
      performanceSummary: 'ملخص الأداء',
      totalProjects: 'إجمالي المشاريع',
      completedProjects: 'المشاريع المكتملة',
      activeProjects: 'المشاريع النشطة',
      reports: [
        { id: 1, name: 'تقرير الأداء الشهري - مارس 2024', type: 'أداء', date: '2024-03-31' },
        { id: 2, name: 'تقرير الصيانة - Q1 2024', type: 'صيانة', date: '2024-03-30' },
        { id: 3, name: 'تقرير المالية - مارس 2024', type: 'مالي', date: '2024-03-28' },
      ]
    },
    en: {
      title: 'Reports & Analytics',
      generateReport: 'Generate New Report',
      month: 'Month',
      year: 'Year',
      type: 'Report Type',
      status: 'Status',
      createdDate: 'Created Date',
      download: 'Download',
      performanceSummary: 'Performance Summary',
      totalProjects: 'Total Projects',
      completedProjects: 'Completed Projects',
      activeProjects: 'Active Projects',
      reports: [
        { id: 1, name: 'Monthly Performance Report - March 2024', type: 'Performance', date: '03/31/2024' },
        { id: 2, name: 'Maintenance Report - Q1 2024', type: 'Maintenance', date: '03/30/2024' },
        { id: 3, name: 'Financial Report - March 2024', type: 'Financial', date: '03/28/2024' },
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {texts.title}
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Performance Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{texts.totalProjects}</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">45</p>
                </div>
                <BarChart3 className="w-12 h-12 text-amber-500 opacity-20" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{texts.completedProjects}</p>
                  <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">38</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{texts.activeProjects}</p>
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">7</p>
                </div>
                <BarChart3 className="w-12 h-12 text-blue-500 opacity-20" />
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                التقارير الأخيرة
              </h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.type}</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.createdDate}</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.download}</th>
                </tr>
              </thead>
              <tbody>
                {texts.reports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{report.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{report.type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{report.date}</td>
                    <td className="px-6 py-4">
                      <Button className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200">
                        <Download className="w-4 h-4" />
                        {texts.download}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
