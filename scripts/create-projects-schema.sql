-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('luxury-finishing', 'brand-identity', 'maintenance-renovations', 'general-supplies')),
  location TEXT NOT NULL,
  client_name TEXT NOT NULL,
  completion_date DATE,
  project_area DECIMAL,
  budget_range TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('planning', 'in-progress', 'completed', 'on-hold')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project images table
CREATE TABLE IF NOT EXISTS project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text_en TEXT,
  alt_text_ar TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project files table
CREATE TABLE IF NOT EXISTS project_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  description_en TEXT,
  description_ar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project 3D models table
CREATE TABLE IF NOT EXISTS project_3d_models (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  model_url TEXT NOT NULL,
  model_type TEXT DEFAULT 'gltf' CHECK (model_type IN ('gltf', 'glb', 'obj')),
  thumbnail_url TEXT,
  description_en TEXT,
  description_ar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON project_files(project_id);
CREATE INDEX IF NOT EXISTS idx_project_3d_models_project_id ON project_3d_models(project_id);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_3d_models ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_images" ON project_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_files" ON project_files FOR SELECT USING (true);
CREATE POLICY "Allow public read access on project_3d_models" ON project_3d_models FOR SELECT USING (true);
