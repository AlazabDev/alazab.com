'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Search, MessageCircle, PhoneIcon, Mail } from 'lucide-react'
import { useState } from 'react'

export default function HelpPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')

  const content = {
    ar: {
      title: 'مركز المساعدة',
      searchPlaceholder: 'ابحث عن إجابات...',
      contactSupport: 'التواصل مع الدعم',
      categories: 'الفئات',
      liveChat: 'محادثة مباشرة',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      gettingStarted: 'البدء',
      billing: 'الفواتير',
      account: 'الحساب',
      technicalSupport: 'الدعم الفني',
      articles: [
        { id: 1, title: 'كيفية إنشاء حساب جديد', category: 'البدء' },
        { id: 2, title: 'كيفية تحديث ملفك الشخصي', category: 'الحساب' },
        { id: 3, title: 'شرح الخطط والأسعار', category: 'الفواتير' },
        { id: 4, title: 'حل مشاكل الاتصال', category: 'الدعم الفني' },
      ]
    },
    en: {
      title: 'Help Center',
      searchPlaceholder: 'Search for answers...',
      contactSupport: 'Contact Support',
      categories: 'Categories',
      liveChat: 'Live Chat',
      phone: 'Phone',
      email: 'Email',
      gettingStarted: 'Getting Started',
      billing: 'Billing',
      account: 'Account',
      technicalSupport: 'Technical Support',
      articles: [
        { id: 1, title: 'How to Create a New Account', category: 'Getting Started' },
        { id: 2, title: 'How to Update Your Profile', category: 'Account' },
        { id: 3, title: 'Understanding Plans and Pricing', category: 'Billing' },
        { id: 4, title: 'Troubleshooting Connection Issues', category: 'Technical Support' },
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {texts.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            ابحث عن إجابات وحلول لأسئلتك
          </p>
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 max-w-md mx-auto">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder={texts.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 bg-transparent text-gray-900 dark:text-white outline-none"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <MessageCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{texts.liveChat}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">نتحدث معك مباشرة</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <PhoneIcon className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{texts.phone}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">+966 50 000 0000</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Mail className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{texts.email}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">support@azab.com</p>
            </div>
          </div>

          {/* Articles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {texts.categories}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {texts.articles.map((article) => (
                <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">{article.category}</p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {article.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
