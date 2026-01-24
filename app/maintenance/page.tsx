'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function MaintenancePage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'طلبات الصيانة',
      newRequest: 'طلب صيانة جديد',
      active: 'نشط',
      completed: 'مكتمل',
      pending: 'قيد الانتظار',
      requestId: 'رقم الطلب',
      location: 'الموقع',
      date: 'التاريخ',
      status: 'الحالة',
      priority: 'الأولوية',
      action: 'الإجراء',
      viewDetails: 'عرض التفاصيل',
      maintenanceRequests: [
        { id: 'MR-001', location: 'المبنى الرئيسي - الطابق 3', date: '2024-03-20', status: 'نشط', priority: 'عالية' },
        { id: 'MR-002', location: 'الفناء الخارجي', date: '2024-03-15', status: 'قيد الانتظار', priority: 'متوسطة' },
        { id: 'MR-003', location: 'نظام التكييف', date: '2024-03-10', status: 'مكتمل', priority: 'منخفضة' },
      ]
    },
    en: {
      title: 'Maintenance Requests',
      newRequest: 'New Maintenance Request',
      active: 'Active',
      completed: 'Completed',
      pending: 'Pending',
      requestId: 'Request ID',
      location: 'Location',
      date: 'Date',
      status: 'Status',
      priority: 'Priority',
      action: 'Action',
      viewDetails: 'View Details',
      maintenanceRequests: [
        { id: 'MR-001', location: 'Main Building - Floor 3', date: '03/20/2024', status: 'Active', priority: 'High' },
        { id: 'MR-002', location: 'Outdoor Courtyard', date: '03/15/2024', status: 'Pending', priority: 'Medium' },
        { id: 'MR-003', location: 'Air Conditioning System', date: '03/10/2024', status: 'Completed', priority: 'Low' },
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'نشط':
      case 'Active':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'مكتمل':
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {texts.title}
            </h1>
            <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
              <Plus className="w-5 h-5" />
              {texts.newRequest}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">
                    {texts.requestId}
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">
                    {texts.location}
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">
                    {texts.date}
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">
                    {texts.status}
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">
                    {texts.priority}
                  </th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">
                    {texts.action}
                  </th>
                </tr>
              </thead>
              <tbody>
                {texts.maintenanceRequests.map((req) => (
                  <tr key={req.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{req.id}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{req.location}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{req.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(req.status)}
                        <span className="text-gray-700 dark:text-gray-300">{req.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        req.priority === 'عالية' || req.priority === 'High'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : req.priority === 'متوسطة' || req.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button className="text-sm bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800">
                        {texts.viewDetails}
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
