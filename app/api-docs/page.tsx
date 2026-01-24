'use client'

import { useLanguage } from '@/contexts/language-context'
import { Code, Copy } from 'lucide-react'

export default function APIDocsPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'توثيق API',
      subtitle: 'واجهة برمجية شاملة للتكامل',
      authentication: 'المصادقة',
      endpoints: 'نقاط النهاية',
      exampleRequest: 'مثال على الطلب',
      exampleResponse: 'مثال على الاستجابة',
      sections: [
        {
          title: 'البدء السريع',
          content: 'استخدم مفتاح API الخاص بك في رؤوس الطلب: Authorization: Bearer YOUR_API_KEY'
        },
        {
          title: 'المصادقة',
          content: 'جميع الطلبات تتطلب مفتاح API صحيح في رأس Authorization'
        },
        {
          title: 'معدل الحد',
          content: 'الحد الأقصى 1000 طلب في الساعة'
        }
      ]
    },
    en: {
      title: 'API Documentation',
      subtitle: 'Comprehensive API interface for integration',
      authentication: 'Authentication',
      endpoints: 'Endpoints',
      exampleRequest: 'Example Request',
      exampleResponse: 'Example Response',
      sections: [
        {
          title: 'Quick Start',
          content: 'Use your API key in request headers: Authorization: Bearer YOUR_API_KEY'
        },
        {
          title: 'Authentication',
          content: 'All requests require a valid API key in the Authorization header'
        },
        {
          title: 'Rate Limiting',
          content: 'Maximum 1000 requests per hour'
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

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {texts.sections.map((section, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {section.content}
                </p>
              </div>
            ))}

            {/* Code Example */}
            <div className="bg-gray-900 dark:bg-black rounded-lg p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  {texts.exampleRequest}
                </h3>
                <button className="text-gray-400 hover:text-white">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`curl -X GET https://api.azab.com/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>

            <div className="bg-gray-900 dark:bg-black rounded-lg p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">
                  {texts.exampleResponse}
                </h3>
                <button className="text-gray-400 hover:text-white">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <pre className="text-gray-300 text-sm overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Project Name",
      "status": "active",
      "createdAt": "2024-03-20T10:00:00Z"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
