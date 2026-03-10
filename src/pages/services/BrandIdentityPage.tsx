import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Building2, Users, Target, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from '@/contexts/LanguageContext';

const BrandIdentityPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Building2,
      titleAr: "تجهيز المحلات التجارية", titleEn: "Retail Outlet Fitting",
      descriptionAr: "تجهيز وتشطيب المحلات التجارية وفق معايير العلامة التجارية", descriptionEn: "Fitting out and finishing retail outlets to brand standards"
    },
    {
      icon: Palette,
      titleAr: "التصميم الداخلي المؤسسي", titleEn: "Corporate Interior Design",
      descriptionAr: "تصميم داخلي يجسد قيم ورؤية الشركة في كل تفصيلة", descriptionEn: "Interior design that embodies company values in every detail"
    },
    {
      icon: Users,
      titleAr: "سلاسل الإمداد الكبرى", titleEn: "Major Supply Chains",
      descriptionAr: "خبرة في تجهيز سلاسل أبو عوف وسفن فيرجن بمعايير موحدة", descriptionEn: "Expertise in outfitting Abou Ouf and Seven Virgin chains to uniform standards"
    },
    {
      icon: Target,
      titleAr: "الهوية البصرية التطبيقية", titleEn: "Applied Visual Identity",
      descriptionAr: "تطبيق الهوية البصرية على جميع عناصر المكان بدقة", descriptionEn: "Precisely applying visual identity to all spatial elements"
    }
  ];

  const features = [
    { ar: "تصميم واجهات المحلات التجارية", en: "Retail storefront design" },
    { ar: "تجهيز داخلي وفق دليل العلامة التجارية", en: "Interior fit-out per brand guidelines" },
    { ar: "تصميم وتنفيذ اللافتات والإعلانات", en: "Signage design and execution" },
    { ar: "تخطيط المساحات التجارية الوظيفي", en: "Functional commercial space planning" },
    { ar: "اختيار الألوان والمواد المطابقة للهوية", en: "Brand-matched color and material selection" },
    { ar: "تنسيق المعارض والصالات", en: "Exhibition and showroom coordination" },
  ];

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Palette className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('هوية العلامة التجارية', 'Brand Identity')}
            </h1>
            <p className="text-xl mb-2 text-purple-200 italic font-medium">
              {t('مساحتك التجارية... مرآة علامتك', 'Your commercial space... the mirror of your brand')}
            </p>
            <p className="text-lg mb-8 leading-relaxed opacity-90 max-w-2xl mx-auto">
              {t(
                'حلول متكاملة لتجهيز وتشطيب وفرش المحلات التجارية. نحن نترجم هوية علامتك التجارية إلى مساحة مادية جاذبة. نتخصص في تجهيز سلاسل الإمداد الكبرى مثل أبو عوف وسفن فيرجن بمعايير موحدة.',
                'Integrated solutions for fitting out, finishing, and furnishing retail outlets. We translate your brand identity into an attractive physical space. We specialize in outfitting major supply chains such as Abou Ouf and Seven Virgin to uniform standards.'
              )}
            </p>
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8">
              <Link to="/contact">
                {t('ابدأ مشروعك', 'Start Your Project')}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} w-5 h-5`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('خدماتنا المتخصصة', 'Our Specialized Services')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
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

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('ما نقدمه لك', 'What We Offer')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{t(feature.ar, feature.en)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('جاهز لتطوير هويتك التجارية؟', 'Ready to develop your brand identity?')}</h2>
          <p className="text-xl mb-8">{t('دعنا نساعدك في إنشاء مساحة تعكس قيم وهوية علامتك التجارية', 'Let us help you create a space that reflects your brand values and identity')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 rounded-full">
              <Link to="/contact">{t('ابدأ مشروعك', 'Start Your Project')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 rounded-full">
              <Link to="/projects">{t('شاهد أعمالنا السابقة', 'View Our Previous Work')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandIdentityPage;
