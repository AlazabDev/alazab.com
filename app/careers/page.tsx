'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { MapPin, Briefcase, Users } from 'lucide-react'

export default function CareersPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'الوظائف',
      subtitle: 'انضم إلى فريقنا',
      aboutUs: 'من نحن',
      aboutText: 'شركة العزب للإنشاءات تبحث عن متخصصين موهوبين للانضمام إلى فريقنا المتنامي.',
      benefits: 'المزايا',
      why: 'لماذا تنضم إليك؟',
      whyText: 'نوفر بيئة عمل ديناميكية وفرص نمو واضحة وراتب تنافسي.',
      openPositions: 'الوظائف المتاحة',
      apply: 'تقديم الطلب',
      positions: [
        { title: 'مهندس برمجيات', level: 'أساسي', location: 'الرياض' },
        { title: 'مدير مشاريع', level: 'متوسط', location: 'جدة' },
        { title: 'متخصص تسويق', level: 'أساسي', location: 'الرياض' }
      ]
    },
    en: {
      title: 'Careers',
      subtitle: 'Join Our Team',
      aboutUs: 'About Us',
      aboutText: 'Al-Azab Construction Company is looking for talented professionals to join our growing team.',
      benefits: 'Benefits',
      why: 'Why Join Us?',
      whyText: 'We offer a dynamic work environment, clear growth opportunities, and competitive salary.',
      openPositions: 'Open Positions',
      apply: 'Apply Now',
      positions: [
        { title: 'Software Engineer', level: 'Entry', location: 'Riyadh' },
        { title: 'Project Manager', level: 'Mid', location: 'Jeddah' },
        { title: 'Marketing Specialist', level: 'Entry', location: 'Riyadh' }
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
          {/* About Us */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {texts.aboutUs}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              {texts.aboutText}
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {texts.why}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {texts.whyText}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">تطوير احترافي مستمر</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">فريق ودود وتعاوني</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700 dark:text-gray-300">مرونة العمل</span>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {texts.openPositions}
            </h2>
            <div className="space-y-4">
              {texts.positions.map((pos, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex justify-between items-center hover:shadow-lg transition-shadow">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {pos.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{pos.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{pos.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    {texts.apply}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
