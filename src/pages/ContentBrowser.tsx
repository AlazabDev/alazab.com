import React, { useState, useMemo } from 'react';
import { Search, BookOpen, HelpCircle, Globe, FileText, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { useContentIndex, type ContentItem } from '@/hooks/useContentIndex';

const ContentBrowser: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const { content, stats, loading, error } = useContentIndex();

  const sections = [
    { id: 'all', label: 'جميع المحتوى', icon: Globe },
    { id: 'blogs', label: 'المقالات', icon: FileText },
    { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle },
    { id: 'brands', label: 'العلامات التجارية', icon: BookOpen },
    { id: 'knowledge', label: 'قاعدة المعرفة', icon: BookOpen },
  ];

  const filteredContent = useMemo(() => {
    if (loading) return [];
    
    return content.filter(item => {
      const matchesSection = selectedSection === 'all' || item.section === selectedSection;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSection && matchesSearch;
    });
  }, [searchQuery, selectedSection, content, loading]);

  const sectionCounts = {
    all: stats.totalItems,
    blogs: stats.sections['blogs'] || 0,
    faq: stats.sections['faq'] || 0,
    brands: stats.sections['brands'] || 0,
    knowledge: stats.sections['knowledge'] || 0,
  };

  if (error) {
    return (
      <PageLayout title="متصفح المحتوى" description="خطأ في تحميل المحتوى">
        <div className="text-center py-12">
          <p className="text-destructive text-lg">{error}</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="متصفح المحتوى" description="استعرض جميع المحتوى والموارد المتاحة">
      <div className="space-y-8">
        {/* رأس البحث */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg border border-primary/20">
          <h1 className="text-3xl font-bold text-foreground mb-2">متصفح المحتوى</h1>
          <p className="text-muted-foreground mb-6">
            اكتشف مقالاتنا وأسئلتك الشائعة والمعلومات عن العلامات التجارية ({stats.totalItems} عنصر)
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن محتوى..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
              disabled={loading}
            />
          </div>
        </div>

        {/* الأقسام */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {sections.map(section => {
            const Icon = section.icon;
            const count = sectionCounts[section.id as keyof typeof sectionCounts];
            const isActive = selectedSection === section.id;
            
            return (
              <Button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                variant={isActive ? 'default' : 'outline'}
                className="h-auto flex flex-col items-center justify-center gap-2 p-4 relative"
                disabled={loading}
              >
                <Icon className="w-6 h-6" />
                <div className="text-center">
                  <p className="font-semibold text-sm">{section.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{count}</p>
                </div>
              </Button>
            );
          })}
        </div>

        {/* نتائج البحث */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            {loading ? 'جاري التحميل...' : `النتائج (${filteredContent.length})`}
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="mr-3">جاري تحميل المحتوى...</span>
            </div>
          ) : filteredContent.length > 0 ? (
            <div className="grid gap-4">
              {filteredContent
                .sort((a, b) => a.order - b.order)
                .map(item => (
                  <div
                    key={item.slug}
                    className="p-6 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                            {sections.find(s => s.id === item.section)?.label}
                          </span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            {item.brand}
                          </span>
                          {!item.published && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                              قيد الإنشاء
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                لم يتم العثور على محتوى يطابق البحث
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ContentBrowser;
