'use client'

import { useLanguage } from '@/contexts/language-context'

export default function TermsOfServicePage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'شروط الخدمة',
      lastUpdated: 'آخر تحديث:',
      introduction: 'هذه شروط الخدمة ("الشروط") تحكم استخدامك لموقع وخدمات شركة العزب للإنشاءات. باستخدام خدماتنا، فإنك توافق على هذه الشروط.',
      sections: {
        acceptance: {
          title: '1. قبول الشروط',
          content: 'بالوصول إلى موقعنا واستخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط.'
        },
        usage: {
          title: '2. نطاق الاستخدام',
          content: 'تقر بأن استخدامك للموقع يجب أن يكون قانوني وليس منتهكاً لحقوق الآخرين.'
        },
        liability: {
          title: '3. تحديد المسؤولية',
          content: 'نحن لا نتحمل مسؤولية عن أي أضرار غير مباشرة أو خسائر ناجمة عن استخدام خدماتنا.'
        },
        intellectual: {
          title: '4. الملكية الفكرية',
          content: 'جميع المحتويات والملكية الفكرية على الموقع محمية وملك للشركة.'
        },
        changes: {
          title: '5. تعديل الشروط',
          content: 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت.'
        },
        contact: {
          title: '6. اتصل بنا',
          content: 'لأي استفسار حول شروط الخدمة، يرجى التواصل معنا.'
        }
      }
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated:',
      introduction: 'These Terms of Service ("Terms") govern your use of the website and services of Al-Azab Construction Company. By using our services, you agree to these Terms.',
      sections: {
        acceptance: {
          title: '1. Acceptance of Terms',
          content: 'By accessing our website and using our services, you agree to be bound by these Terms.'
        },
        usage: {
          title: '2. Scope of Use',
          content: 'You acknowledge that your use of the website must be legal and not infringe on the rights of others.'
        },
        liability: {
          title: '3. Limitation of Liability',
          content: 'We are not responsible for any indirect damages or losses arising from the use of our services.'
        },
        intellectual: {
          title: '4. Intellectual Property',
          content: 'All content and intellectual property on the website is protected and owned by the Company.'
        },
        changes: {
          title: '5. Modification of Terms',
          content: 'We reserve the right to modify these Terms at any time.'
        },
        contact: {
          title: '6. Contact Us',
          content: 'For any questions about the Terms of Service, please contact us.'
        }
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

          <div className="prose prose-invert max-w-none dark:prose-invert">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
              {texts.introduction}
            </p>

            <div className="space-y-12">
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
        </div>
      </section>
    </div>
  )
}
