
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MessageSquare, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdvancedSidebar } from './layout/AdvancedSidebar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navigationItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'مشاريعنا', href: '/projects' },
    { name: 'معرض الأعمال', href: '/portfolio' },
    { name: 'من نحن', href: '/about' },
    { name: 'الشات بوت', href: '/chatbot' },
    { name: 'اتصل بنا', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo variant="full" showText={true} className="hidden md:flex" />
            <Logo variant="icon" showText={false} className="md:hidden" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4" role="navigation" aria-label="التنقل الرئيسي">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-medium transition-colors hover:text-construction-accent focus:outline-none focus:ring-2 focus:ring-construction-accent rounded px-2 py-1 whitespace-nowrap ${
                  isActive(item.href) 
                    ? 'text-construction-accent border-b-2 border-construction-accent pb-1' 
                    : 'text-gray-700'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name === 'الشات بوت' && <MessageSquare className="w-4 h-4 inline ml-1" aria-hidden="true" />}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons and Sidebar Toggle */}
          <div className="flex items-center gap-4">
            {/* ERP Link - Hidden on Mobile */}
            <a
              href="https://erp.alazab.com/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-construction-accent hover:bg-construction-accent/90 text-white rounded-lg transition-all duration-300 font-medium text-xs shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              نظام ERP
            </a>

            {/* Advanced Sidebar Toggle */}
            {isMobile ? (
              <Drawer open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white"
                    aria-label="فتح القائمة الجانبية"
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="h-[85vh]">
                  <AdvancedSidebar onClose={() => setIsSidebarOpen(false)} />
                </DrawerContent>
              </Drawer>
            ) : (
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white"
                    aria-label="فتح القائمة الجانبية"
                  >
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <AdvancedSidebar onClose={() => setIsSidebarOpen(false)} />
                </SheetContent>
              </Sheet>
            )}

            {/* Login Button */}
            <div className="hidden md:flex">
              <Link to="/auth">
                <Button 
                  variant="outline" 
                  className="border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white focus:ring-2 focus:ring-construction-primary"
                >
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-6 mt-6" role="navigation" aria-label="التنقل المتنقل">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-construction-accent focus:outline-none focus:ring-2 focus:ring-construction-accent rounded px-2 py-1 ${
                      isActive(item.href) 
                        ? 'text-construction-accent' 
                        : 'text-gray-700'
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.name === 'الشات بوت' && <MessageSquare className="w-4 h-4 inline ml-1" aria-hidden="true" />}
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t pt-6 space-y-3">
                  <Link to="/maintenance-request" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-construction-primary hover:bg-construction-dark text-white">
                      طلب صيانة
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-construction-primary text-construction-primary hover:bg-construction-primary hover:text-white">
                      تسجيل الدخول
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
