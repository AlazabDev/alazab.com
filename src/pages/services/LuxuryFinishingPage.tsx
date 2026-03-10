import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Crown, Home, Paintbrush, Gem, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from '@/contexts/LanguageContext';

const LuxuryFinishingPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Crown,
      titleAr: "تشطيبات فائقة الجودة", titleEn: "Ultra-High-Quality Finishes",
      descriptionAr: "تشطيبات راقية تعكس الذوق الرفيع باستخدام أحدث التصاميم",
      descriptionEn: "Refined finishes that reflect refined taste using the latest designs"
    },
    {
      icon: Paintbrush,
      titleAr: "تصميم داخلي حصري", titleEn: "Exclusive Interior Design",
      descriptionAr: "تصميمات داخلية مبتكرة تحول مساحتك إلى تحفة فنية",
      descriptionEn: "Innovative interior designs that turn your space into a masterpiece"
    },
    {
      icon: Home,
      titleAr: "فلل وشقق وديوبلكس", titleEn: "Villas, Apartments & Duplexes",
      descriptionAr: "حلول تشطيب شاملة لجميع أنواع الوحدات السكنية الراقية",
      descriptionEn: "Comprehensive finishing solutions for all types of upscale residential units"
    },
    {
      icon: Gem,
      titleAr: "أفخم الخامات", titleEn: "The Finest Materials",
      descriptionAr: "نستخدم أجود الخامات المستوردة والمحلية لضمان الجودة العالية",
      descriptionEn: "We use the finest imported and local materials to ensure the highest quality"
    }
  ];

  const features = [
    { ar: "تشطيب الأرضيات بالرخام والباركيه الفاخر", en: "Marble and luxury parquet flooring" },
    { ar: "دهانات ديكورية وورق حائط عالمي", en: "Decorative paints and international wallpaper" },
    { ar: "أنظمة إضاءة ذكية ومخفية", en: "Smart and concealed lighting systems" },
    { ar: "أسقف معلقة بتصاميم فنية", en: "Artistic suspended ceiling designs" },
    { ar: "مطابخ وحمامات بمعايير فندقية", en: "Hotel-standard kitchens and bathrooms" },
    { ar: "أنظمة أتمتة المنزل الذكي", en: "Smart home automation systems" },
  ];

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Crown className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('التشطيب الراقي', 'Luxury Finishing')}
            </h1>
            <p className="text-xl mb-2 text-amber-200 italic font-medium">
              {t('حيث تتحول المساحات إلى تحف فنية', 'Where spaces turn into masterpieces')}
            </p>
            <p className="text-lg mb-8 leading-relaxed opacity-90 max-w-2xl mx-auto">
              {t(
                'خط إنتاج متخصص في تقديم خدمات تشطيب فائقة الجودة للوحدات السكنية الراقية (الفلل، الشقق، الدوبلكس). نستخدم أحدث التصاميم وأفضل الخامات لتحويل منزلك إلى مساحة تعكس ذوقك الرفيع.',
                'A specialized production line offering ultra-high-quality finishing services for upscale residential units (villas, apartments, duplexes). We use the latest designs and the finest materials to transform your home into a space that reflects your refined taste.'
              )}
            </p>
            <Button asChild size="lg" className="bg-white text-amber-800 hover:bg-gray-100 rounded-full px-8">
              <Link to="/contact">
                {t('ابدأ مشروعك', 'Start Your Project')}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} w-5 h-5`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('خدماتنا المتخصصة', 'Our Specialized Services')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full mx-auto mb-4 flex items-center justify-center">
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

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('ما نقدمه لك', 'What We Offer')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{t(feature.ar, feature.en)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('جاهز لتحويل مساحتك؟', 'Ready to transform your space?')}</h2>
          <p className="text-xl mb-8">{t('دعنا نحول منزلك إلى تحفة فنية تعكس ذوقك الرفيع', 'Let us turn your home into a masterpiece that reflects your refined taste')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-amber-700 hover:bg-gray-100 rounded-full">
              <Link to="/contact">{t('تواصل معنا', 'Contact Us')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-700 rounded-full">
              <Link to="/projects">{t('شاهد أعمالنا', 'View Our Work')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LuxuryFinishingPage;
