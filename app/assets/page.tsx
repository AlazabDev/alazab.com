'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'
import { Plus, MapPin, Wrench, BarChart3 } from 'lucide-react'

export default function AssetsPage() {
  const { language } = useLanguage()

  const content = {
    ar: {
      title: 'الأصول والمواقع',
      addAsset: 'إضافة أصل جديد',
      assetName: 'اسم الأصل',
      location: 'الموقع',
      type: 'النوع',
      condition: 'الحالة',
      lastMaintenance: 'آخر صيانة',
      status: 'الحالة',
      building: 'مبنى',
      equipment: 'معدات',
      infrastructure: 'بنية تحتية',
      excellent: 'ممتازة',
      good: 'جيدة',
      fair: 'معقولة',
      poor: 'سيئة',
      assets: [
        { id: 1, name: 'نظام التكييف - الطابق 1', location: 'المبنى الرئيسي', type: 'معدات', condition: 'جيدة', lastMaintenance: '2024-02-15' },
        { id: 2, name: 'مولد الكهرباء', location: 'غرفة المولدات', type: 'معدات', condition: 'ممتازة', lastMaintenance: '2024-03-01' },
        { id: 3, name: 'أنظمة الإضاءة', location: 'الفناء الخارجي', type: 'بنية تحتية', condition: 'معقولة', lastMaintenance: '2024-01-20' },
        { id: 4, name: 'شبكة الصرف الصحي', location: 'تحت الأرض', type: 'بنية تحتية', condition: 'جيدة', lastMaintenance: '2024-03-10' },
      ]
    },
    en: {
      title: 'Assets & Locations',
      addAsset: 'Add New Asset',
      assetName: 'Asset Name',
      location: 'Location',
      type: 'Type',
      condition: 'Condition',
      lastMaintenance: 'Last Maintenance',
      status: 'Status',
      building: 'Building',
      equipment: 'Equipment',
      infrastructure: 'Infrastructure',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      assets: [
        { id: 1, name: 'Air Conditioning System - Floor 1', location: 'Main Building', type: 'Equipment', condition: 'Good', lastMaintenance: '02/15/2024' },
        { id: 2, name: 'Power Generator', location: 'Generator Room', type: 'Equipment', condition: 'Excellent', lastMaintenance: '03/01/2024' },
        { id: 3, name: 'Lighting Systems', location: 'Outdoor Courtyard', type: 'Infrastructure', condition: 'Fair', lastMaintenance: '01/20/2024' },
        { id: 4, name: 'Drainage Network', location: 'Underground', type: 'Infrastructure', condition: 'Good', lastMaintenance: '03/10/2024' },
      ]
    }
  }

  const texts = content[language]
  const isRtl = language === 'ar'

  const getConditionColor = (condition: string) => {
    if (condition === 'ممتازة' || condition === 'Excellent')
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    if (condition === 'جيدة' || condition === 'Good')
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    if (condition === 'معقولة' || condition === 'Fair')
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
  }

  return (
    <div className={`flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 ${isRtl ? 'rtl' : 'ltr'}`}>
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {texts.title}
            </h1>
            <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
              <Plus className="w-5 h-5" />
              {texts.addAsset}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-6">
            {texts.assets.map((asset) => (
              <div key={asset.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {asset.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{asset.location}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(asset.condition)}`}>
                    {asset.condition}
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{texts.type}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{asset.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{texts.lastMaintenance}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{asset.lastMaintenance}</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <Button className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800">
                      <Wrench className="w-4 h-4" />
                      Schedule Maintenance
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
