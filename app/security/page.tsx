'use client'

import { useLanguage } from '@/contexts/language-context'
import { Shield, Lock, Eye, AlertTriangle, CheckCircle } from 'lucide-react'

export default function SecurityPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'ممارسات الأمان',
      subtitle: 'نحافظ على أمان بيانات عملائنا بأعلى معايير الأمان',
      sections: [
        {
          title: 'التشفير',
          description: 'نستخدم تشفير SSL/TLS لحماية جميع البيانات المرسلة والمستقبلة.',
          icon: 'lock'
        },
        {
          title: 'المصادقة الثنائية',
          description: 'توفير المصادقة الثنائية لحماية إضافية لحسابك.',
          icon: 'shield'
        },
        {
          title: 'المراجعات الأمنية',
          description: 'نجري مراجعات أمنية منتظمة للتأكد من سلامة النظام.',
          icon: 'eye'
        },
        {
          title: 'الامتثال',
          description: 'نلتزم بجميع معايير الامتثال الدولية بما فيها GDPR.',
          icon: 'checkCircle'
        }
      ]
    },
    en: {
      title: 'Security Practices',
      subtitle: 'We protect our customers\' data with the highest security standards',
      sections: [
        {
          title: 'Encryption',
          description: 'We use SSL/TLS encryption to protect all transmitted and received data.',
          icon: 'lock'
        },
        {
          title: 'Two-Factor Authentication',
          description: 'Two-factor authentication for additional protection of your account.',
          icon: 'shield'
        },
        {
          title: 'Security Audits',
          description: 'We conduct regular security audits to ensure system integrity.',
          icon: 'eye'
        },
        {
          title: 'Compliance',
          description: 'We comply with all international compliance standards including GDPR.',
          icon: 'checkCircle'
        }
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'lock':
        return <Lock className="w-12 h-12 text-amber-600" />
      case 'shield':
        return <Shield className="w-12 h-12 text-amber-600" />
      case 'eye':
        return <Eye className="w-12 h-12 text-amber-600" />
      case 'checkCircle':
        return <CheckCircle className="w-12 h-12 text-amber-600" />
      default:
        return <AlertTriangle className="w-12 h-12 text-amber-600" />
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
          <div className="grid md:grid-cols-2 gap-12">
            {texts.sections.map((section, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <div className="flex items-center gap-4 mb-4">
                  {getIcon(section.icon)}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
