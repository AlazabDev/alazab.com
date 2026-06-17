import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RealGallery from '@/components/RealGallery';
import { useGallery } from '@/hooks/useGalleryAPI';

const WorksGallery: React.FC = () => {
  const { images, loading } = useGallery();

  const categories = [
    { id: 'showcase', label: 'عروض مميزة', icon: '⭐' },
    { id: 'projects', label: 'مشاريع', icon: '🏗️' },
    { id: 'architectural', label: 'معماري', icon: '🏢' },
    { id: 'interior_design', label: 'تصميم داخلي', icon: '🎨' },
  ];

  const stats = categories.map(cat => ({
    ...cat,
    count: images.filter(img => img.category === cat.id).length
  })).filter(cat => cat.count > 0);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-construction-primary via-construction-dark to-construction-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.15)_0%,transparent_60%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-construction-accent/20 text-construction-accent border-construction-accent/30">
              +{images.length} عمل
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">معرض أعمالنا</h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              مجموعة شاملة من أفضل أعمالنا في البناء والتصميم الداخلي والمدافئ الفاخرة
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-construction-accent">{stat.count}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Sections */}
      <div className="container mx-auto px-4 py-16">
        {stats.map((category) => (
          <motion.section
            key={category.id}
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-3xl font-bold">{category.label}</h2>
              </div>
              <p className="text-muted-foreground">
                {category.count} أعمال في مجال {category.label}
              </p>
            </div>

            <RealGallery
              category={category.id}
              columns={3}
              showModal={true}
            />
          </motion.section>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default WorksGallery;
