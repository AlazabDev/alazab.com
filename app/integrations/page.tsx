'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Zap, Square } from 'lucide-react'

export default function IntegrationsPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'التكاملات',
      subtitle: 'قم بربط النظام مع تطبيقاتك المفضلة',
      connect: 'ربط الآن',
      connected: 'متصل',
      integrations: [
        { name: 'Slack', icon: '💬', connected: true },
        { name: 'Microsoft Teams', icon: '👥', connected: false },
        { name: 'Google Drive', icon: '☁️', connected: true },
        { name: 'Salesforce', icon: '📊', connected: false },
        { name: 'Zapier', icon: '⚡', connected: true },
        { name: 'Webhook', icon: '🔗', connected: false },
      ]
    },
    en: {
      title: 'Integrations',
      subtitle: 'Connect the system with your favorite applications',
      connect: 'Connect Now',
      connected: 'Connected',
      integrations: [
        { name: 'Slack', icon: '💬', connected: true },
        { name: 'Microsoft Teams', icon: '👥', connected: false },
        { name: 'Google Drive', icon: '☁️', connected: true },
        { name: 'Salesforce', icon: '📊', connected: false },
        { name: 'Zapier', icon: '⚡', connected: true },
        { name: 'Webhook', icon: '🔗', connected: false },
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
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {texts.integrations.map((integration, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{integration.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {integration.name}
                </h3>
                {integration.connected ? (
                  <div className="flex items-center justify-center gap-2 mb-4 text-green-600">
                    <Square className="w-4 h-4 fill-green-600" />
                    <span className="font-medium">{texts.connected}</span>
                  </div>
                ) : null}
                <Button
                  className={`w-full ${
                    integration.connected
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {integration.connected ? texts.connected : texts.connect}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
