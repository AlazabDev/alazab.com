import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, Hammer, Palette, Home } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const premiumServices = [
  {
    id: "general-supplies",
    icon: Truck,
    titleAr: "توريدات عامة",
    titleEn: "Laban Alasfour 🚚",
    descriptionAr: "حلول إمداد متكاملة لدعم جميع احتياجات مشروعك",
    descriptionEn: "We offer full supply solutions for all your project needs, from start to finish.",
    color: "bg-blue-50 text-blue-600",
    route: "/services/general-supplies"
  },
  {
    id: "maintenance-renovation",
    icon: Hammer,
    titleAr: "الصيانة والتجديدات",
    titleEn: "UberFix 🛠️",
    descriptionAr: "حلول شاملة للحفاظ على مساندتك وتجديدها",
    descriptionEn: "Professionally managed maintenance solutions for shops and residential units",
    color: "bg-orange-50 text-orange-600",
    route: "/services/maintenance-renovation"
  },
  {
    id: "brand-identity",
    icon: Palette,
    titleAr: "هوية العلامة التجارية",
    titleEn: "Brand Identity 🏢",
    descriptionAr: "إنشاء منشآت مؤسسية تعكس هويتك التجارية",
    descriptionEn: "We create spaces that reflect your brand image and make a lasting impression.",
    color: "bg-purple-50 text-purple-600",
    route: "/services/brand-identity"
  },
  {
    id: "luxury-cleaning",
    icon: Home,
    titleAr: "تنظيف فاخر",
    titleEn: "Luxury Finishing 🏠",
    descriptionAr: "حلول تنظيف عالية الجودة لتحويل مساحتك إلى بيئة فريدة",
    descriptionEn: "High-end finishing solutions that turn your spaces into elegant masterpieces.",
    color: "bg-green-50 text-green-600",
    route: "/services/luxury-cleaning"
  },
];

const PremiumServices: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('خدماتنا المتميزة', 'Our Premium Services')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('اكتشف خدماتنا المصممة خصيصاً لتلبية احتياجاتك', 'Discover our services designed specifically to meet your needs')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full ${service.color} mx-auto mb-4 flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {t(service.titleAr, service.titleEn)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                    {t(service.descriptionAr, service.descriptionEn)}
                  </CardDescription>
                  <Button 
                    asChild
                    className="w-full bg-black hover:bg-gray-800 text-white rounded-full transition-all duration-200"
                  >
                    <Link to={service.route}>
                      {t('اعرف أكثر', 'Learn More')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;
