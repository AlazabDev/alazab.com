import { useEffect, useState } from 'react';

export interface ContentItem {
  path: string;
  section: string;
  title: string;
  slug: string;
  brand: string;
  published: boolean;
  order: number;
  description: string;
}

export interface ContentStats {
  totalItems: number;
  sections: Record<string, number>;
  brands: Record<string, number>;
}

export function useContentIndex() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState<ContentStats>({
    totalItems: 0,
    sections: {},
    brands: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // في الإنتاج سيتم جلب البيانات من API
        // const response = await fetch('/api/content');
        // const data = await response.json();
        
        // للآن نستخدم import الثابت
        const contentIndexData = await import('@/content/data/alazab-content-index.json').then(m => m.default);
        
        setContent(contentIndexData);
        
        // حساب الإحصائيات
        const sectionCounts: Record<string, number> = {};
        const brandCounts: Record<string, number> = {};
        
        contentIndexData.forEach((item: ContentItem) => {
          sectionCounts[item.section] = (sectionCounts[item.section] || 0) + 1;
          brandCounts[item.brand] = (brandCounts[item.brand] || 0) + 1;
        });
        
        setStats({
          totalItems: contentIndexData.length,
          sections: sectionCounts,
          brands: brandCounts
        });
      } catch (err) {
        console.error("[v0] Error loading content:", err);
        setError('خطأ في تحميل المحتوى');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, stats, loading, error };
}
