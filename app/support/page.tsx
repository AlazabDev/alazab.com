'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Plus, Clock, CheckCircle } from 'lucide-react'

export default function SupportPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'تذاكر الدعم',
      newTicket: 'تذكرة دعم جديدة',
      ticketId: 'رقم التذكرة',
      subject: 'الموضوع',
      status: 'الحالة',
      createdDate: 'تاريخ الإنشاء',
      priority: 'الأولوية',
      view: 'عرض',
      tickets: [
        { id: 'TKT-001', subject: 'مشكلة في تسجيل الدخول', status: 'مفتوح', date: '2024-03-20', priority: 'عالية' },
        { id: 'TKT-002', subject: 'طلب إضافة ميزة', status: 'قيد المراجعة', date: '2024-03-18', priority: 'متوسطة' },
        { id: 'TKT-003', subject: 'استفسار عن الفواتير', status: 'مُغلق', date: '2024-03-15', priority: 'منخفضة' },
      ]
    },
    en: {
      title: 'Support Tickets',
      newTicket: 'New Support Ticket',
      ticketId: 'Ticket ID',
      subject: 'Subject',
      status: 'Status',
      createdDate: 'Created Date',
      priority: 'Priority',
      view: 'View',
      tickets: [
        { id: 'TKT-001', subject: 'Login Issue', status: 'Open', date: '03/20/2024', priority: 'High' },
        { id: 'TKT-002', subject: 'Feature Request', status: 'Under Review', date: '03/18/2024', priority: 'Medium' },
        { id: 'TKT-003', subject: 'Billing Inquiry', status: 'Closed', date: '03/15/2024', priority: 'Low' },
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

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
              {texts.newTicket}
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
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.ticketId}</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.subject}</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.createdDate}</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.status}</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.priority}</th>
                  <th className="px-6 py-4 text-left text-gray-900 dark:text-white font-semibold">{texts.view}</th>
                </tr>
              </thead>
              <tbody>
                {texts.tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ticket.id}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{ticket.subject}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{ticket.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ticket.status === 'مفتوح' || ticket.status === 'Open'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : ticket.status === 'قيد المراجعة' || ticket.status === 'Under Review'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ticket.priority === 'عالية' || ticket.priority === 'High'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : ticket.priority === 'متوسطة' || ticket.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button className="text-sm bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200">
                        {texts.view}
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
