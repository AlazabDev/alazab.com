'use client'

import { useLanguage } from '@/contexts/language-context'

export default function TermsOfServicePage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "شروط الخدمة",
      lastUpdated: "آخر تحديث:",
      introduction:
        "تنظم هذه الشروط استخدامك لموقع وخدمات شركة العزب للمقاولات وإدارة التنفيذ. باستخدامك للموقع، فإنك توافق على الالتزام بها.",
      sections: {
        acceptance: {
          title: "1. قبول الشروط",
          content:
            "يُعد استمرارك في استخدام الموقع والخدمات موافقة صريحة على هذه الشروط وأي تحديثات لاحقة لها.",
        },
        usage: {
          title: "2. استخدام الموقع",
          content:
            "يجب أن يكون استخدامك قانونياً وألا ينتهك حقوق الملكية الفكرية أو الأنظمة المعمول بها.",
        },
        services: {
          title: "3. نطاق الخدمات",
          content:
            "الموقع يقدم معلومات عن خدمات التصميم المعماري، إدارة المشاريع، والصيانة. أي اتفاقيات تنفيذ تخضع لعقود مستقلة.",
        },
        liability: {
          title: "4. حدود المسؤولية",
          content:
            "لا تتحمل الشركة مسؤولية أي أضرار غير مباشرة أو خاصة ناتجة عن استخدام الموقع أو الاعتماد على المعلومات المنشورة فيه.",
        },
        intellectual: {
          title: "5. الملكية الفكرية",
          content:
            "جميع المحتويات والنصوص والتصاميم والشعارات محمية وملك للشركة، ولا يجوز استخدامها دون إذن كتابي.",
        },
        changes: {
          title: "6. التعديلات",
          content:
            "تحتفظ الشركة بحق تعديل هذه الشروط في أي وقت، ويتم نشر النسخة المحدثة على الموقع.",
        },
        contact: {
          title: "7. التواصل",
          content: "لأي استفسارات حول الشروط، يرجى مراسلتنا عبر info@al-azab.co.",
        },
      },
    },
    en: {
      title: "Terms of Service",
      lastUpdated: "Last Updated:",
      introduction:
        "These Terms govern your use of Alazab Construction Company’s website and services. By using the site, you agree to these Terms.",
      sections: {
        acceptance: {
          title: "1. Acceptance of Terms",
          content:
            "Your continued use of the website constitutes acceptance of these Terms and any future updates.",
        },
        usage: {
          title: "2. Website Use",
          content:
            "You must use the website lawfully and not infringe intellectual property or applicable regulations.",
        },
        services: {
          title: "3. Service Scope",
          content:
            "The website provides information about architectural design, project management, and maintenance. Execution agreements are governed by separate contracts.",
        },
        liability: {
          title: "4. Limitation of Liability",
          content:
            "The Company is not liable for indirect or special damages arising from the use of the website or reliance on its content.",
        },
        intellectual: {
          title: "5. Intellectual Property",
          content:
            "All content, text, designs, and logos are protected and owned by the Company and may not be used without written consent.",
        },
        changes: {
          title: "6. Updates",
          content:
            "We reserve the right to update these Terms at any time. The latest version will be published on the website.",
        },
        contact: {
          title: "7. Contact",
          content: "For questions about these Terms, contact us at info@al-azab.co.",
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
