import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Eye, Upload, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GalleryImage {
  id: string;
  title: string;
  url: string;
  category: string;
  description?: string;
  alt_text?: string;
  created_at: string;
}

const AdminGalleryManagement: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'showcase',
    description: '',
    alt_text: ''
  });

  // تحميل الصور
  useEffect(() => {
    fetchImages();
  }, [filter]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' ? '/api/gallery/images' : `/api/gallery/images?category=${filter}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setImages(data.data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.url || !formData.category) {
      alert('الرجاء ملء البيانات المطلوبة');
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/gallery/images/${editingId}` : '/api/gallery/images';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(editingId ? 'تم تحديث الصورة بنجاح' : 'تم إضافة الصورة بنجاح');
        setOpenDialog(false);
        setEditingId(null);
        setFormData({ title: '', url: '', category: 'showcase', description: '', alt_text: '' });
        fetchImages();
      }
    } catch (error) {
      console.error('Error saving image:', error);
      alert('حدث خطأ أثناء حفظ الصورة');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل تريد حذف هذه الصورة؟')) return;

    try {
      const response = await fetch(`/api/gallery/images/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        alert('تم حذف الصورة بنجاح');
        fetchImages();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('حدث خطأ أثناء حذف الصورة');
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setFormData({
      title: image.title,
      url: image.url,
      category: image.category,
      description: image.description || '',
      alt_text: image.alt_text || ''
    });
    setEditingId(image.id);
    setOpenDialog(true);
  };

  const filteredImages = images.filter(img =>
    img.title.toLowerCase().includes(search.toLowerCase()) ||
    img.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">إدارة معرض الصور</h1>
          <p className="text-muted-foreground">أضف أو عدّل أو احذف صور المعرض</p>
        </div>

        {/* أدوات التحكم */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <Input
            placeholder="بحث عن صورة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              <SelectItem value="showcase">عروض مميزة</SelectItem>
              <SelectItem value="projects">مشاريع</SelectItem>
              <SelectItem value="architectural">معماري</SelectItem>
              <SelectItem value="interior_design">تصميم داخلي</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={openDialog} onOpenChange={(open) => {
            setOpenDialog(open);
            if (!open) {
              setEditingId(null);
              setFormData({ title: '', url: '', category: 'showcase', description: '', alt_text: '' });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-construction-accent hover:bg-construction-accent/90 text-construction-primary">
                <Plus className="w-4 h-4 ml-2" />
                إضافة صورة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent dir="rtl">
              <DialogHeader>
                <DialogTitle>{editingId ? 'تعديل الصورة' : 'إضافة صورة جديدة'}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">العنوان</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="اسم الصورة"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">رابط الصورة</label>
                  <Input
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="https://..."
                    type="url"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">الفئة</label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="showcase">عروض مميزة</SelectItem>
                      <SelectItem value="projects">مشاريع</SelectItem>
                      <SelectItem value="architectural">معماري</SelectItem>
                      <SelectItem value="interior_design">تصميم داخلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">الوصف</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="وصف الصورة"
                    className="w-full border rounded px-3 py-2 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">النص البديل</label>
                  <Input
                    value={formData.alt_text}
                    onChange={(e) => setFormData({...formData, alt_text: e.target.value})}
                    placeholder="النص البديل للصورة"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSubmit} disabled={loading} className="bg-construction-accent hover:bg-construction-accent/90 text-construction-primary">
                    {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {editingId ? 'تحديث' : 'إضافة'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* جدول الصور */}
        <Card>
          <CardHeader>
            <CardTitle>الصور ({filteredImages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <Loader className="w-8 h-8 animate-spin mx-auto" />
              </div>
            ) : filteredImages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">لا توجد صور</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-4">الصورة</th>
                      <th className="text-right p-4">العنوان</th>
                      <th className="text-right p-4">الفئة</th>
                      <th className="text-right p-4">التاريخ</th>
                      <th className="text-right p-4">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredImages.map(image => (
                      <tr key={image.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <img src={image.url} alt={image.title} className="w-12 h-12 rounded object-cover" />
                        </td>
                        <td className="p-4 font-medium">{image.title}</td>
                        <td className="p-4">{image.category}</td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {new Date(image.created_at).toLocaleDateString('ar-EG')}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => window.open(image.url)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleEdit(image)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDelete(image.id)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default AdminGalleryManagement;
