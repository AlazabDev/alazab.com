import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Zap, Clock, ShieldCheck, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from '@/contexts/LanguageContext';

const UberFixPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Wrench,
      titleAr: "صيانة معمارية شاملة", titleEn: "Comprehensive Architectural Maintenance",
      descriptionAr: "حلول صيانة متكاملة لجميع جوانب المبنى", descriptionEn: "Integrated maintenance solutions for all building aspects"
    },
    {
      icon: Zap,
      titleAr: "استجابة سريعة", titleEn: "Rapid Response",
      descriptionAr: "فريق جاهز للتدخل السريع في حالات الطوارئ", descriptionEn: "A team ready for rapid intervention in emergencies"
    },
    {
      icon: Clock,
      titleAr: "صيانة دورية", titleEn: "Periodic Maintenance",
      descriptionAr: "برامج صيانة منتظمة للحفاظ على مساحاتك", descriptionEn: "Regular maintenance programs to preserve your spaces"
    },
    {
      icon: ShieldCheck,
      titleAr: "ضمان الجودة", titleEn: "Quality Guarantee",
      descriptionAr: "نضمن جودة عملنا وندعمه بضمان شامل", descriptionEn: "We guarantee our work quality with comprehensive warranty"
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Wrench className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">UberFix</h1>
            <p className="text-xl mb-2 text-orange-200 italic font-medium">
              {t('لمسة إصلاح سريعة... تدوم طويلاً', 'A quick fix... that lasts')}
            </p>
            <p className="text-lg mb-8 leading-relaxed opacity-90 max-w-2xl mx-auto">
              {t(
                'خط إنتاجي متخصص في تقديم حلول الصيانة المعمارية السريعة والمبتكرة. سواء للمحلات التجارية أو الوحدات السكنية، يضمن فريق UberFix إعادة الحياة إلى مساحاتك بأعلى كفاءة.',
                'A specialized production line offering rapid and innovative architectural maintenance solutions. Whether for commercial shops or residential units, the UberFix team ensures your spaces are revitalized with maximum efficiency.'
              )}
            </p>
            <Button asChild size="lg" className="bg-white text-orange-700 hover:bg-gray-100 rounded-full px-8">
              <Link to="/maintenance-request">
                {t('اطلب خدمة صيانة', 'Request Maintenance')}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} w-5 h-5`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('خدمات UberFix', 'UberFix Services')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl font-bold">{t(service.titleAr, service.titleEn)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{t(service.descriptionAr, service.descriptionEn)}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('كيف يعمل UberFix؟', 'How UberFix Works')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, ar: 'طلب الخدمة', en: 'Request Service', descAr: 'تواصل معنا وحدد نوع الصيانة المطلوبة', descEn: 'Contact us and specify the maintenance needed' },
              { step: 2, ar: 'المعاينة', en: 'Inspection', descAr: 'فريقنا يقوم بمعاينة شاملة للموقع', descEn: 'Our team conducts a comprehensive site inspection' },
              { step: 3, ar: 'التنفيذ', en: 'Execution', descAr: 'تنفيذ الأعمال بأعلى معايير الجودة', descEn: 'Executing work with the highest quality standards' },
              { step: 4, ar: 'المتابعة', en: 'Follow-up', descAr: 'ضمان ومتابعة ما بعد التنفيذ', descEn: 'Warranty and post-execution follow-up' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-orange-600 text-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{t(item.ar, item.en)}</h3>
                <p className="text-gray-600">{t(item.descAr, item.descEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('تحتاج صيانة؟ UberFix هنا', 'Need Maintenance? UberFix is Here')}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 rounded-full">
              <Link to="/maintenance-request">{t('اطلب صيانة الآن', 'Request Maintenance Now')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 rounded-full">
              <Link to="/maintenance-tracking">{t('تتبع طلب الصيانة', 'Track Maintenance Request')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UberFixPage;
