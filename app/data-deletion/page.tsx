'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'

export default function DataDeletionPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'حذف البيانات الشخصية',
      lastUpdated: 'آخر تحديث:',
      introduction: 'نحترم حقك في الخصوصية. يمكنك طلب حذف بيانتك الشخصية في أي وقت من خلال هذه الصفحة.',
      sections: {
        howToDelete: {
          title: 'كيفية حذف بيانتك',
          content: 'لحذف بيانتك الشخصية، يرجى ملء النموذج أدناه مع تقديم معلومات التحقق المطلوبة.'
        },
        dataIncluded: {
          title: 'البيانات المشمولة بالحذف',
          content: 'سيتم حذف جميع المعلومات الشخصية المرتبطة بحسابك من قواعد البيانات الخاصة بنا.'
        },
        timeline: {
          title: 'الجدول الزمني',
          content: 'سيتم معالجة طلب حذف البيانات خلال 30 يوماً من تقديمه.'
        },
        confirmation: {
          title: 'تأكيد الحذف',
          content: 'ستتلقى رسالة تأكيد عبر البريد الإلكتروني عند اكتمال عملية الحذف.'
        }
      },
      formTitle: 'نموذج طلب حذف البيانات',
      formFields: {
        email: 'البريد الإلكتروني',
        fullName: 'الاسم الكامل',
        reason: 'السبب (اختياري)',
        submit: 'إرسال طلب الحذف'
      }
    },
    en: {
      title: 'Data Deletion Request',
      lastUpdated: 'Last Updated:',
      introduction: 'We respect your privacy. You can request deletion of your personal data at any time through this page.',
      sections: {
        howToDelete: {
          title: 'How to Delete Your Data',
          content: 'To delete your personal data, please fill out the form below with the required verification information.'
        },
        dataIncluded: {
          title: 'Data Covered by Deletion',
          content: 'All personal information associated with your account will be deleted from our databases.'
        },
        timeline: {
          title: 'Timeline',
          content: 'Data deletion requests will be processed within 30 days of submission.'
        },
        confirmation: {
          title: 'Deletion Confirmation',
          content: 'You will receive a confirmation email when the deletion process is complete.'
        }
      },
      formTitle: 'Data Deletion Request Form',
      formFields: {
        email: 'Email',
        fullName: 'Full Name',
        reason: 'Reason (Optional)',
        submit: 'Submit Deletion Request'
      }
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  return (
    <div className={`flex min-h-screen flex-col ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {texts.title}
            </h1>
            <p className="text-amber-600 dark:text-amber-400">
              {texts.lastUpdated} 2024
            </p>
          </div>

          <div className="mb-16">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
              {texts.introduction}
            </p>

            <div className="space-y-8">
              {Object.entries(texts.sections).map(([key, section]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-gray-800 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {texts.formTitle}
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {texts.formFields.email}
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {texts.formFields.fullName}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {texts.formFields.reason}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                {texts.formFields.submit}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
