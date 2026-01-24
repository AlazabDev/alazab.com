'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { CreditCard, Download, Check } from 'lucide-react'

export default function BillingPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'الفواتير والخطط',
      currentPlan: 'الخطة الحالية',
      planName: 'خطة احترافية',
      monthlyPrice: '299 ريال سعودي / شهري',
      features: 'المميزات',
      billingHistory: 'سجل الفواتير',
      invoice: 'الفاتورة',
      date: 'التاريخ',
      amount: 'المبلغ',
      status: 'الحالة',
      action: 'إجراء',
      download: 'تحميل',
      paymentMethod: 'طرق الدفع',
      addPaymentMethod: 'إضافة طريقة دفع',
      nextBilling: 'الفاتورة التالية',
      upgrade: 'ترقية الخطة',
      cancel: 'إلغاء الخطة',
      features_list: [
        'جميع الميزات الأساسية',
        'دعم فني 24/7',
        'تقارير متقدمة',
        'تكامل API'
      ]
    },
    en: {
      title: 'Billing & Plans',
      currentPlan: 'Current Plan',
      planName: 'Professional Plan',
      monthlyPrice: '299 SAR / Monthly',
      features: 'Features',
      billingHistory: 'Billing History',
      invoice: 'Invoice',
      date: 'Date',
      amount: 'Amount',
      status: 'Status',
      action: 'Action',
      download: 'Download',
      paymentMethod: 'Payment Methods',
      addPaymentMethod: 'Add Payment Method',
      nextBilling: 'Next Billing',
      upgrade: 'Upgrade Plan',
      cancel: 'Cancel Plan',
      features_list: [
        'All basic features',
        '24/7 Technical Support',
        'Advanced Reports',
        'API Integration'
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  const invoices = [
    { id: 'INV-2024-001', date: isRtl ? '2024-01-15' : '01/15/2024', amount: '299 SAR', status: 'مدفوع' },
    { id: 'INV-2024-002', date: isRtl ? '2024-02-15' : '02/15/2024', amount: '299 SAR', status: 'مدفوع' },
    { id: 'INV-2024-003', date: isRtl ? '2024-03-15' : '03/15/2024', amount: '299 SAR', status: 'معلق' },
  ]

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {texts.title}
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          {/* Current Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {texts.currentPlan}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-amber-600 mb-2">
                  {texts.planName}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {texts.monthlyPrice}
                </p>
                <p className="text-amber-600 mb-6">
                  {texts.nextBilling}: 2024-04-15
                </p>
                <div className="flex gap-4">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    {texts.upgrade}
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    {texts.cancel}
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {texts.features}
                </h4>
                <ul className="space-y-3">
                  {texts.features_list.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {texts.paymentMethod}
              </h2>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                {texts.addPaymentMethod}
              </Button>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <CreditCard className="w-8 h-8 text-amber-600" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Visa ••••4242</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">ينتهي في 12/2025</p>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {texts.billingHistory}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">
                      {texts.invoice}
                    </th>
                    <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">
                      {texts.date}
                    </th>
                    <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">
                      {texts.amount}
                    </th>
                    <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">
                      {texts.status}
                    </th>
                    <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">
                      {texts.action}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-4 px-4 text-gray-900 dark:text-white">{inv.id}</td>
                      <td className="py-4 px-4 text-gray-900 dark:text-white">{inv.date}</td>
                      <td className="py-4 px-4 text-gray-900 dark:text-white font-semibold">{inv.amount}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          inv.status === 'مدفوع' || inv.status === 'Paid'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white">
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
        </div>
      </section>
    </div>
  )
}
