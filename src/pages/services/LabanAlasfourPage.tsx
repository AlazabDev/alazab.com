import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Globe, Search, Shield, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from '@/contexts/LanguageContext';

const LabanAlasfourPage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: Search,
      titleAr: "بحث عالمي عن الخامات", titleEn: "Global Material Search",
      descriptionAr: "نبحث في جميع أنحاء العالم عن أندر وأجود الخامات", descriptionEn: "We search worldwide for the rarest and finest materials"
    },
    {
      icon: Globe,
      titleAr: "شبكة موردين عالمية", titleEn: "Global Supplier Network",
      descriptionAr: "شبكة واسعة من الموردين المعتمدين في جميع القارات", descriptionEn: "A vast network of certified suppliers across all continents"
    },
    {
      icon: Shield,
      titleAr: "ضمان الجودة", titleEn: "Quality Assurance",
      descriptionAr: "جميع الخامات مفحوصة ومطابقة للمواصفات العالمية", descriptionEn: "All materials are inspected and meet international standards"
    },
    {
      icon: Package,
      titleAr: "توريد متخصص", titleEn: "Specialized Supply",
      descriptionAr: "نوفر الخامات الأكثر تعقيداً وندرة في السوق", descriptionEn: "We source the most complex and rare materials on the market"
    }
  ];

  const materials = [
    { ar: "الرخام والجرانيت النادر", en: "Rare marble and granite" },
    { ar: "الأخشاب الفاخرة والمعالجة", en: "Premium and treated woods" },
    { ar: "المعادن والسبائك الخاصة", en: "Special metals and alloys" },
    { ar: "الزجاج المعماري المتقدم", en: "Advanced architectural glass" },
    { ar: "مواد العزل المتطورة", en: "Advanced insulation materials" },
    { ar: "الخامات الصديقة للبيئة", en: "Eco-friendly materials" },
  ];

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Package className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Laban Alasfour</h1>
            <p className="text-xl mb-2 text-blue-200 italic font-medium">
              {t('نوفر المستحيل... لنبني المستحيل', 'We provide the impossible... to build the impossible')}
            </p>
            <p className="text-lg mb-8 leading-relaxed opacity-90 max-w-2xl mx-auto">
              {t(
                'خط إنتاج متخصص في توفير الخامات المعمارية التي يصعب العثور عليها. نبحث ونجلب لكم أندر وأجود الخامات من جميع أنحاء العالم لتلبية احتياجات مشاريعكم الأكثر تطلباً.',
                'A specialized production line focused on sourcing hard-to-find architectural materials. We search for and procure the rarest and highest quality materials from around the world to meet the demands of your most challenging projects.'
              )}
            </p>
            <Button asChild size="lg" className="bg-white text-blue-800 hover:bg-gray-100 rounded-full px-8">
              <Link to="/contact">
                {t('احصل على عرض سعر', 'Get a Quote')}
                <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} w-5 h-5`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('لماذا Laban Alasfour؟', 'Why Laban Alasfour?')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t('ما نوفره لك', 'What We Source For You')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{t(item.ar, item.en)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('تحتاج خامات نادرة؟', 'Need Rare Materials?')}</h2>
          <p className="text-xl mb-8">{t('تواصل معنا وسنوفر لك ما تحتاجه من أي مكان في العالم', 'Contact us and we\'ll source what you need from anywhere in the world')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100 rounded-full">
              <Link to="/contact">{t('تواصل معنا', 'Contact Us')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700 rounded-full">
              <Link to="/projects">{t('شاهد أعمالنا', 'View Our Work')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LabanAlasfourPage;
