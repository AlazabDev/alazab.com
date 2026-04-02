import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Map, Home, Wrench, Building2, Users, Phone, MessageSquare, Shield, FileText, Image, Armchair } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sitemapSections = [
  {
    title: "الصفحات الرئيسية",
    icon: Home,
    links: [
      { to: "/", label: "الرئيسية" },
      { to: "/about", label: "من نحن" },
      { to: "/ceo", label: "كلمة المدير" },
      { to: "/contact", label: "تواصل معنا" },
    ],
  },
  {
    title: "الخدمات",
    icon: Wrench,
    links: [
      { to: "/services", label: "جميع الخدمات" },
      { to: "/services/luxury-finishing", label: "التشطيبات الفاخرة" },
      { to: "/services/uberfix", label: "الصيانة والتجديد" },
      { to: "/services/brand-identity", label: "الهوية البصرية" },
      { to: "/services/laban-alasfour", label: "لبن العصفور للتوريدات" },
    ],
  },
  {
    title: "المشاريع والأعمال",
    icon: Building2,
    links: [
      { to: "/projects", label: "المشاريع" },
      { to: "/projects-gallery", label: "معرض المشاريع" },
      { to: "/portfolio", label: "البورتفوليو" },
      { to: "/furniture-gallery", label: "معرض الأثاث" },
    ],
  },
  {
    title: "خدمات العملاء",
    icon: Users,
    links: [
      { to: "/maintenance-request", label: "طلب صيانة" },
      { to: "/maintenance-tracking", label: "تتبع طلب الصيانة" },
      { to: "/chatbot", label: "المساعد الذكي" },
      { to: "/auth", label: "تسجيل الدخول" },
    ],
  },
  {
    title: "الصفحات القانونية",
    icon: Shield,
    links: [
      { to: "/privacy-policy", label: "سياسة الخصوصية" },
      { to: "/terms-of-service", label: "شروط الاستخدام" },
      { to: "/cookie-policy", label: "سياسة ملفات تعريف الارتباط" },
      { to: "/refund-policy", label: "سياسة الاسترداد" },
      { to: "/acceptable-use", label: "سياسة الاستخدام المقبول" },
      { to: "/disclaimer", label: "إخلاء المسؤولية" },
      { to: "/security", label: "الإفصاح الأمني" },
      { to: "/data-deletion", label: "حذف البيانات" },
      { to: "/legal-contact", label: "الاتصال القانوني" },
    ],
  },
];

const SitemapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Helmet>
        <title>خريطة الموقع | العزب للمقاولات</title>
        <meta name="description" content="خريطة موقع شركة العزب للمقاولات - تصفح جميع صفحات الموقع بسهولة" />
        <link rel="canonical" href="https://alazab.com/sitemap" />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Map className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              خريطة الموقع
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              تصفح جميع صفحات موقع شركة العزب للمقاولات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {sitemapSections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-card-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="block py-1.5 px-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SitemapPage;
