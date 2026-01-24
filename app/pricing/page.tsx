'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function PricingPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'الأسعار والخطط',
      subtitle: 'اختر الخطة المناسبة لاحتياجاتك',
      monthly: 'شهري',
      yearly: 'سنوي',
      selectPlan: 'اختر الخطة',
      plans: [
        {
          name: 'أساسي',
          price: 99,
          description: 'للبدايات الصغيرة',
          features: [
            'دعم 5 مستخدمين',
            'تقارير أساسية',
            'دعم فني عبر البريد',
            'تخزين 10GB'
          ]
        },
        {
          name: 'احترافي',
          price: 299,
          description: 'للشركات المتوسطة',
          features: [
            'دعم 50 مستخدماً',
            'تقارير متقدمة',
            'دعم فني 24/7',
            'تخزين 100GB',
            'تكامل API',
            'تحليلات مخصصة'
          ],
          featured: true
        },
        {
          name: 'مؤسسي',
          price: 999,
          description: 'للمؤسسات الكبيرة',
          features: [
            'مستخدمون غير محدود',
            'تقارير مخصصة',
            'مدير حساب مخصص',
            'تخزين غير محدود',
            'تكامل API متقدم',
            'حل مخصص'
          ]
        }
      ]
    },
    en: {
      title: 'Pricing & Plans',
      subtitle: 'Choose the plan that fits your needs',
      monthly: 'Monthly',
      yearly: 'Yearly',
      selectPlan: 'Select Plan',
      plans: [
        {
          name: 'Starter',
          price: 99,
          description: 'For small businesses',
          features: [
            'Support for 5 users',
            'Basic reports',
            'Email support',
            '10GB storage'
          ]
        },
        {
          name: 'Professional',
          price: 299,
          description: 'For medium companies',
          features: [
            'Support for 50 users',
            'Advanced reports',
            '24/7 technical support',
            '100GB storage',
            'API integration',
            'Custom analytics'
          ],
          featured: true
        },
        {
          name: 'Enterprise',
          price: 999,
          description: 'For large organizations',
          features: [
            'Unlimited users',
            'Custom reports',
            'Dedicated account manager',
            'Unlimited storage',
            'Advanced API integration',
            'Custom solution'
          ]
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
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {texts.plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                  plan.featured
                    ? 'ring-2 ring-amber-600 md:scale-105'
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                {plan.featured && (
                  <div className="bg-amber-600 text-white py-2 text-center font-semibold">
                    الأكثر شهرة
                  </div>
                )}
                <div className={`p-8 ${plan.featured ? 'bg-white dark:bg-gray-800' : ''}`}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      {language === 'ar' ? 'ريال سعودي' : 'SAR'}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      {language === 'ar' ? 'شهري' : 'per month'}
                    </p>
                  </div>

                  <Button
                    className={`w-full mb-8 ${
                      plan.featured
                        ? 'bg-amber-600 hover:bg-amber-700 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                    }`}
                  >
                    {texts.selectPlan}
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
