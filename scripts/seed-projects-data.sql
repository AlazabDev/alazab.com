-- Insert sample projects data
INSERT INTO projects (title_en, title_ar, description_en, description_ar, category, location, client_name, completion_date, project_area, budget_range, featured) VALUES
-- Luxury Finishing Projects
('Modern Villa Luxury Finishing', 'تشطيب فيلا عصرية فاخرة', 'Complete luxury finishing for a modern villa with premium materials and sophisticated design elements.', 'تشطيب فاخر كامل لفيلا عصرية بمواد عالية الجودة وعناصر تصميم متطورة.', 'luxury-finishing', 'New Cairo, Egypt', 'Ahmed Hassan', '2024-03-15', 450.5, '$100,000 - $150,000', true),

('Penthouse Premium Interiors', 'تصميم داخلي فاخر لبنتهاوس', 'Exclusive penthouse interior design with custom furniture and high-end finishes.', 'تصميم داخلي حصري لبنتهاوس مع أثاث مخصص وتشطيبات راقية.', 'luxury-finishing', 'Zamalek, Cairo', 'Sarah Mohamed', '2024-02-28', 320.0, '$80,000 - $120,000', true),

-- Brand Identity Projects
('Corporate Headquarters Design', 'تصميم مقر شركة', 'Complete corporate identity design for headquarters reflecting company values and culture.', 'تصميم هوية شركة كامل للمقر الرئيسي يعكس قيم وثقافة الشركة.', 'brand-identity', 'Downtown Cairo', 'Tech Solutions Ltd', '2024-01-20', 800.0, '$200,000 - $300,000', true),

('Boutique Hotel Branding', 'هوية فندق بوتيك', 'Unique brand identity design for luxury boutique hotel with custom elements.', 'تصميم هوية فريدة لفندق بوتيك فاخر مع عناصر مخصصة.', 'brand-identity', 'Hurghada', 'Nile Hospitality', '2024-04-10', 1200.0, '$150,000 - $250,000', false),

-- Maintenance & Renovations Projects
('Historic Building Restoration', 'ترميم مبنى تاريخي', 'Complete restoration and renovation of a historic building preserving original architecture.', 'ترميم وتجديد كامل لمبنى تاريخي مع الحفاظ على العمارة الأصلية.', 'maintenance-renovations', 'Old Cairo', 'Heritage Foundation', '2024-05-05', 600.0, '$300,000 - $500,000', true),

('Office Complex Renovation', 'تجديد مجمع مكاتب', 'Modern renovation of office complex with updated systems and contemporary design.', 'تجديد عصري لمجمع مكاتب مع أنظمة محدثة وتصميم معاصر.', 'maintenance-renovations', 'New Administrative Capital', 'Business Park Egypt', '2024-03-30', 2000.0, '$400,000 - $600,000', false);

-- Insert sample images for projects
INSERT INTO project_images (project_id, image_url, alt_text_en, alt_text_ar, is_primary, display_order) 
SELECT 
  p.id,
  'https://al-azab.co/images/service-' || (ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY p.created_at) % 10 + 1) || '.png',
  'Project image for ' || p.title_en,
  'صورة المشروع ' || p.title_ar,
  ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY p.created_at) = 1,
  ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY p.created_at)
FROM projects p
CROSS JOIN generate_series(1, 5) AS series;

-- Insert sample 3D models
INSERT INTO project_3d_models (project_id, model_name, model_url, model_type, thumbnail_url, description_en, description_ar)
SELECT 
  id,
  'Project 3D Model',
  '/models/project-' || id || '.gltf',
  'gltf',
  'https://al-azab.co/images/cuate-23.png',
  '3D visualization of the project',
  'تصور ثلاثي الأبعاد للمشروع'
FROM projects 
WHERE featured = true;
