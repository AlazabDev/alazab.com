'use client'

import { useLanguage } from '@/contexts/language-context'

export default function CookiePolicyPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'سياسة ملفات تعريف الارتباط',
      lastUpdated: 'آخر تحديث:',
      introduction: 'يستخدم موقع شركة العزب للإنشاءات ملفات تعريف الارتباط لتحسين تجربة المستخدم. توضح هذه السياسة كيفية استخدام هذه الملفات.',
      sections: {
        what: {
          title: 'ما هي ملفات تعريف الارتباط؟',
          content: 'ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم حفظها على جهازك عند زيارة الموقع.'
        },
        why: {
          title: 'لماذا نستخدم ملفات تعريف الارتباط؟',
          content: 'نستخدمها لتحسين تجربتك وتخصيص المحتوى وتحليل سلوك المستخدمين.'
        },
        types: {
          title: 'أنواع ملفات تعريف الارتباط',
          content: 'نستخدم ملفات تعريف الارتباط الأساسية واختيارية لتحسين الخدمات.'
        },
        control: {
          title: 'التحكم في ملفات تعريف الارتباط',
          content: 'يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.'
        },
        contact: {
          title: 'اتصل بنا',
          content: 'لأي أسئلة حول سياسة ملفات تعريف الارتباط، يرجى التواصل معنا.'
        }
      }
    },
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last Updated:',
      introduction: 'Al-Azab Construction Company website uses cookies to improve user experience. This policy explains how these files are used.',
      sections: {
        what: {
          title: 'What are Cookies?',
          content: 'Cookies are small text files that are saved on your device when you visit the website.'
        },
        why: {
          title: 'Why Do We Use Cookies?',
          content: 'We use them to improve your experience and customize content and analyze user behavior.'
        },
        types: {
          title: 'Types of Cookies',
          content: 'We use essential and optional cookies to improve our services.'
        },
        control: {
          title: 'Controlling Cookies',
          content: 'You can control cookies through your browser settings.'
        },
        contact: {
          title: 'Contact Us',
          content: 'For any questions about our Cookie Policy, please contact us.'
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
