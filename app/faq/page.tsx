'use client'

import { useLanguage } from '@/contexts/language-context'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQPage() {
  const { language } = useLanguage()
  const [openItem, setOpenItem] = useState<number | null>(null)

  const content = {
    ar: {
      title: 'الأسئلة الشائعة',
      subtitle: 'إجابات على الأسئلة الأكثر شيوعاً',
      faqs: [
        {
          id: 1,
          category: 'الحساب والفواتير',
          questions: [
            {
              q: 'كيف يمكنني إنشاء حساب جديد؟',
              a: 'يمكنك الذهاب إلى صفحة التسجيل وملء النموذج ببياناتك الشخصية.'
            },
            {
              q: 'هل يمكنني تغيير خطتي في أي وقت؟',
              a: 'نعم، يمكنك تغيير خطتك من صفحة الفواتير في أي وقت.'
            },
            {
              q: 'ما سياسة الاسترجاع؟',
              a: 'لدينا سياسة استرجاع لمدة 30 يوماً للخطط السنوية.'
            }
          ]
        },
        {
          id: 2,
          category: 'الدعم الفني',
          questions: [
            {
              q: 'كيف أحصل على الدعم الفني؟',
              a: 'يمكنك التواصل معنا عبر البريد الإلكتروني أو الدردشة المباشرة.'
            },
            {
              q: 'ما وقت استجابة الدعم؟',
              a: 'نرد على جميع الاستفسارات خلال 24 ساعة.'
            }
          ]
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions',
      faqs: [
        {
          id: 1,
          category: 'Account & Billing',
          questions: [
            {
              q: 'How do I create a new account?',
              a: 'Go to the registration page and fill out the form with your personal information.'
            },
            {
              q: 'Can I change my plan anytime?',
              a: 'Yes, you can change your plan from the billing page at any time.'
            },
            {
              q: 'What is your refund policy?',
              a: 'We have a 30-day refund policy for annual plans.'
            }
          ]
        },
        {
          id: 2,
          category: 'Technical Support',
          questions: [
            {
              q: 'How do I get technical support?',
              a: 'You can contact us via email or live chat.'
            },
            {
              q: 'What is the support response time?',
              a: 'We respond to all inquiries within 24 hours.'
            }
          ]
        }
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
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {texts.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {texts.faqs.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const itemId = `${category.id}-${index}`
                    return (
                      <div key={itemId} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <button
                          onClick={() => setOpenItem(openItem === itemId ? null : itemId)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">
                            {faq.q}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-amber-600 transition-transform ${
                              openItem === itemId ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openItem === itemId && (
                          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
