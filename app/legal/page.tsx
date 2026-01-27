'use client'

import { useLanguage } from '@/contexts/language-context'

export default function LegalPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "الإشعار القانوني",
      lastUpdated: "آخر تحديث:",
      introduction:
        "يوضح هذا الإشعار مسؤوليات الاستخدام وحدودها، ويحدد العلاقة القانونية بين الزائر وشركة العزب للمقاولات وإدارة التنفيذ.",
      sections: {
        disclaimer: {
          title: "1. إخلاء المسؤولية",
          content:
            "يتم تقديم المحتوى لأغراض معلوماتية فقط، ولا يُعد التزاماً تعاقدياً أو عرضاً ملزماً.",
        },
        accuracy: {
          title: "2. دقة المعلومات",
          content:
            "نسعى لتحديث المعلومات باستمرار، إلا أننا لا نضمن خلوها من الأخطاء أو السهو.",
        },
        limitation: {
          title: "3. حدود المسؤولية",
          content:
            "لا تتحمل الشركة أي مسؤولية عن أي خسائر مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو الاعتماد على محتواه.",
        },
        external: {
          title: "4. الروابط الخارجية",
          content:
            "قد يحتوي الموقع على روابط خارجية لراحة المستخدم، ولا نتحمل مسؤولية محتواها أو سياساتها.",
        },
        intellectual: {
          title: "5. حقوق الملكية",
          content:
            "جميع المواد والعلامات التجارية والشعارات مملوكة للشركة ومحميّة بموجب القوانين ذات الصلة.",
        },
        governing: {
          title: "6. القانون الحاكم",
          content: "يخضع هذا الإشعار للقوانين والأنظمة المعمول بها داخل جمهورية مصر العربية.",
        },
      },
    },
    en: {
      title: "Legal Notice",
      lastUpdated: "Last Updated:",
      introduction:
        "This notice outlines usage responsibilities and defines the legal relationship between visitors and Alazab Construction Company.",
      sections: {
        disclaimer: {
          title: "1. Disclaimer",
          content:
            "Content is provided for informational purposes only and does not constitute a binding offer or contract.",
        },
        accuracy: {
          title: "2. Accuracy of Information",
          content:
            "We strive to keep information up to date, but do not guarantee it is error-free or complete.",
        },
        limitation: {
          title: "3. Limitation of Liability",
          content:
            "The Company is not liable for direct or indirect losses resulting from use of the website or reliance on its content.",
        },
        external: {
          title: "4. External Links",
          content:
            "External links may be provided for convenience. We are not responsible for their content or policies.",
        },
        intellectual: {
          title: "5. Intellectual Property",
          content:
            "All materials, trademarks, and logos are owned by the Company and protected under applicable laws.",
        },
        governing: {
          title: "6. Governing Law",
          content: "This notice is governed by applicable laws of the Arab Republic of Egypt.",
        },
      },
    },
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
