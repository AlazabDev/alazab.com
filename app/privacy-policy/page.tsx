'use client'

import { useLanguage } from '@/contexts/language-context'

export default function PrivacyPolicyPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'سياسة الخصوصية',
      lastUpdated: 'آخر تحديث:',
      introduction: 'تقدم شركة العزب للإنشاءات ("الشركة") أهمية قصوى لحماية خصوصيتك. تشرح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية بيانات شخصية.',
      sections: {
        collection: {
          title: '1. جمع البيانات',
          content: 'نقوم بجمع المعلومات التي تقدمها طواعية من خلال النماذج والبريد الإلكتروني والاتصالات.'
        },
        usage: {
          title: '2. استخدام البيانات',
          content: 'نستخدم بيانتك الشخصية لتقديم الخدمات وتحسين تجربتك معنا.'
        },
        protection: {
          title: '3. حماية البيانات',
          content: 'نطبق إجراءات أمان صارمة لحماية بيانتك الشخصية من الوصول غير المصرح به.'
        },
        sharing: {
          title: '4. مشاركة البيانات',
          content: 'لا نشارك بيانتك الشخصية مع أطراف ثالثة بدون موافقتك صريحة.'
        },
        rights: {
          title: '5. حقوقك',
          content: 'لديك الحق في الوصول والتعديل وحذف بيانتك الشخصية.'
        },
        contact: {
          title: '6. اتصل بنا',
          content: 'لأي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني.'
        }
      }
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated:',
      introduction: 'Al-Azab Construction Company ("Company") takes the protection of your privacy very seriously. This Privacy Policy explains how we collect, use, and protect your personal data.',
      sections: {
        collection: {
          title: '1. Data Collection',
          content: 'We collect information that you provide voluntarily through forms, email, and communications.'
        },
        usage: {
          title: '2. Data Usage',
          content: 'We use your personal data to provide services and improve your experience with us.'
        },
        protection: {
          title: '3. Data Protection',
          content: 'We implement strict security measures to protect your personal data from unauthorized access.'
        },
        sharing: {
          title: '4. Data Sharing',
          content: 'We do not share your personal data with third parties without your explicit consent.'
        },
        rights: {
          title: '5. Your Rights',
          content: 'You have the right to access, modify, and delete your personal data.'
        },
        contact: {
          title: '6. Contact Us',
          content: 'For any questions about this Privacy Policy, please contact us via email.'
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
