'use client'

import { useLanguage } from '@/contexts/language-context'
import { BookOpen, Code, FileText } from 'lucide-react'

export default function DocsPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'التوثيق',
      subtitle: 'دليل شامل لاستخدام النظام',
      sections: [
        {
          title: 'البدء السريع',
          description: 'ابدأ باستخدام النظام بسهولة في خطوات قليلة.',
          icon: 'book'
        },
        {
          title: 'API',
          description: 'توثيق كاملة للـ API مع أمثلة وأكواد.',
          icon: 'code'
        },
        {
          title: 'أدلة المستخدم',
          description: 'أدلة تفصيلية لكل ميزة في النظام.',
          icon: 'file'
        }
      ],
      docs: [
        { name: 'البدء السريع', href: '#' },
        { name: 'التثبيت والإعداد', href: '#' },
        { name: 'واجهة المستخدم', href: '#' },
        { name: 'إدارة المشاريع', href: '#' },
        { name: 'الفواتير والخطط', href: '#' },
        { name: 'حل المشاكل', href: '#' }
      ]
    },
    en: {
      title: 'Documentation',
      subtitle: 'Complete guide to using the system',
      sections: [
        {
          title: 'Quick Start',
          description: 'Get started using the system easily in a few steps.',
          icon: 'book'
        },
        {
          title: 'API',
          description: 'Complete API documentation with examples and code.',
          icon: 'code'
        },
        {
          title: 'User Guides',
          description: 'Detailed guides for each feature in the system.',
          icon: 'file'
        }
      ],
      docs: [
        { name: 'Quick Start', href: '#' },
        { name: 'Installation & Setup', href: '#' },
        { name: 'User Interface', href: '#' },
        { name: 'Project Management', href: '#' },
        { name: 'Billing & Plans', href: '#' },
        { name: 'Troubleshooting', href: '#' }
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <BookOpen className="w-12 h-12 text-amber-600" />
      case 'code':
        return <Code className="w-12 h-12 text-amber-600" />
      case 'file':
        return <FileText className="w-12 h-12 text-amber-600" />
      default:
        return <BookOpen className="w-12 h-12 text-amber-600" />
    }
  }

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

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {texts.sections.map((section, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {getIcon(section.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              المستندات الشهيرة
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {texts.docs.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.href}
                  className="p-4 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 group"
                >
                  <FileText className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
                  <span className="text-gray-900 dark:text-white font-medium group-hover:text-amber-600">
                    {doc.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
