'use client'

import { useLanguage } from '@/contexts/language-context'

export default function PrivacyPolicyPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث:",
      introduction:
        "توضح هذه السياسة كيفية جمع شركة العزب للمقاولات وإدارة التنفيذ للبيانات الشخصية واستخدامها وحمايتها عند تواصلك معنا أو استخدامك للموقع.",
      sections: {
        collection: {
          title: "1. البيانات التي نجمعها",
          content:
            "نقوم بجمع بيانات التعريف والتواصل (الاسم، البريد الإلكتروني، الهاتف) ومعلومات المشروع التي تقدمها عبر النماذج أو البريد الإلكتروني أو الهاتف.",
        },
        usage: {
          title: "2. استخدام البيانات",
          content:
            "نستخدم بياناتك للرد على الاستفسارات، تجهيز عروض الأسعار، تحسين جودة خدماتنا، وإدارة العلاقة مع العملاء.",
        },
        legal: {
          title: "3. الأساس القانوني للمعالجة",
          content:
            "نعالج بياناتك بناءً على موافقتك أو لتنفيذ طلبك أو للامتثال للالتزامات القانونية المطبقة.",
        },
        retention: {
          title: "4. مدة الاحتفاظ بالبيانات",
          content:
            "نحتفظ بالبيانات للمدة اللازمة لتحقيق الأغراض المذكورة أو وفق ما تقتضيه الأنظمة، ثم نقوم بحذفها أو إخفاء هويتها.",
        },
        protection: {
          title: "5. حماية البيانات",
          content:
            "نطبق إجراءات أمنية وتنظيمية لحماية بياناتك من الوصول غير المصرح به أو الفقد أو التغيير.",
        },
        sharing: {
          title: "6. مشاركة البيانات",
          content:
            "لا نشارك بياناتك مع جهات خارجية إلا عند الحاجة لتنفيذ الخدمة أو بناءً على التزام قانوني.",
        },
        rights: {
          title: "7. حقوقك",
          content:
            "يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها عبر التواصل معنا.",
        },
        contact: {
          title: "8. التواصل",
          content:
            "للاستفسارات المتعلقة بالخصوصية، يرجى مراسلتنا عبر info@al-azab.co.",
        },
      },
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated:",
      introduction:
        "This policy explains how Alazab Construction Company collects, uses, and protects personal data when you contact us or use this website.",
      sections: {
        collection: {
          title: "1. Data We Collect",
          content:
            "We collect identification and contact data (name, email, phone) and project details you submit through forms, email, or phone.",
        },
        usage: {
          title: "2. How We Use Data",
          content:
            "We use your data to respond to inquiries, prepare quotations, improve our services, and manage client relationships.",
        },
        legal: {
          title: "3. Legal Basis",
          content:
            "We process data based on your consent, to fulfill your request, or to comply with applicable legal obligations.",
        },
        retention: {
          title: "4. Data Retention",
          content:
            "We retain data for as long as needed to achieve the stated purposes or as required by law, then delete or anonymize it.",
        },
        protection: {
          title: "5. Data Protection",
          content:
            "We apply technical and organizational safeguards to protect your data from unauthorized access, loss, or alteration.",
        },
        sharing: {
          title: "6. Data Sharing",
          content:
            "We do not share your data with third parties unless needed to deliver services or comply with legal obligations.",
        },
        rights: {
          title: "7. Your Rights",
          content:
            "You may request access, correction, or deletion of your data by contacting us.",
        },
        contact: {
          title: "8. Contact",
          content: "For privacy inquiries, please contact us at info@al-azab.co.",
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
