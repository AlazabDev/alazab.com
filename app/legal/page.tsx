'use client'

import { useLanguage } from '@/contexts/language-context'

export default function LegalPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'الإشعار القانوني',
      lastUpdated: 'آخر تحديث:',
      introduction: 'هذا الإشعار القانوني يوضح معلومات المسؤولية القانونية والعلاقات بين المستخدمين والشركة.',
      sections: {
        disclaimer: {
          title: '1. إخلاء المسؤولية',
          content: 'يتم تقديم جميع المعلومات على هذا الموقع "كما هي"، وبدون أي ضمانات من أي نوع.'
        },
        accuracy: {
          title: '2. دقة المعلومات',
          content: 'بينما نسعى لتقديم معلومات دقيقة، لا نتحمل مسؤولية عن الأخطاء أو الحذف.'
        },
        limitation: {
          title: '3. تحديد المسؤولية',
          content: 'لن تكون الشركة مسؤولة عن أي أضرار غير مباشرة أو عرضية.'
        },
        external: {
          title: '4. الروابط الخارجية',
          content: 'لا نتحمل مسؤولية عن محتوى المواقع الخارجية المرتبطة بموقعنا.'
        },
        governing: {
          title: '5. القانون الحاكم',
          content: 'تحكم هذا الإشعار القوانين المحلية ذات الصلة.'
        }
      }
    },
    en: {
      title: 'Legal Notice',
      lastUpdated: 'Last Updated:',
      introduction: 'This legal notice clarifies legal liability information and the relationship between users and the Company.',
      sections: {
        disclaimer: {
          title: '1. Disclaimer',
          content: 'All information on this website is provided "as is" without any warranties of any kind.'
        },
        accuracy: {
          title: '2. Accuracy of Information',
          content: 'While we strive to provide accurate information, we are not responsible for errors or omissions.'
        },
        limitation: {
          title: '3. Limitation of Liability',
          content: 'The Company shall not be responsible for any indirect or incidental damages.'
        },
        external: {
          title: '4. External Links',
          content: 'We are not responsible for the content of external websites linked to our site.'
        },
        governing: {
          title: '5. Governing Law',
          content: 'This notice is governed by applicable local laws.'
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
