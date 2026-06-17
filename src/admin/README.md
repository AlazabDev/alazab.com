# Admin Dashboard Documentation

## Overview

الواجهة الإدارية (Admin Dashboard) هي نظام إدارة شامل للتحكم في جميع جوانب تطبيق Alazab. تم بناؤها باستخدام React، TypeScript، و Tailwind CSS مع معمارية حديثة وسهلة الصيانة.

## Features

### 1. Dashboard الرئيسية
- عرض الإحصائيات الرئيسية للنظام
- رسوم بيانية توضح الاتجاهات
- معلومات قاعدة البيانات الحية
- سجل النشاطات الأخيرة

### 2. إدارة WhatsApp
- عرض جميع الحسابات المتصلة
- إرسال الرسائل من خلال الواجهة
- عرض سجل الرسائل (الواردة والصادرة)
- إضافة حسابات WhatsApp جديدة
- تتبع الإحصائيات (عدد الرسائل، معدل النجاح، etc)

### 3. مراقبة Webhooks
- عرض جميع أحداث Webhook
- تصفية الأحداث حسب النوع أو الحالة
- إعادة محاولة الأحداث الفاشلة
- عرض تفاصيل الحمولة (Payload)
- إدارة نقاط النهاية (Endpoints)

### 4. إدارة قاعدة البيانات
- مراقبة اتصالات قاعدة البيانات
- عرض إحصائيات الأداء
- إنشاء النسخ الاحتياطية
- تحميل النسخ الاحتياطية السابقة
- عرض معلومات الجداول

### 5. سجلات التدقيق
- تتبع جميع الأنشطة الإدارية
- تصفية حسب الإجراء أو المورد أو التاريخ
- عرض تفاصيل التغييرات
- ملخص الأنشطة والمستخدمين الأكثر نشاطاً

## Directory Structure

```
src/admin/
├── pages/                  # صفحات الواجهة الإدارية
│   ├── Dashboard.tsx      # لوحة التحكم الرئيسية
│   ├── WhatsAppManagement.tsx  # إدارة WhatsApp
│   ├── WebhookMonitoring.tsx   # مراقبة الـ Webhooks
│   ├── DatabaseManagement.tsx  # إدارة قاعدة البيانات
│   └── AuditLogs.tsx      # سجلات التدقيق
├── components/             # مكونات معاد استخدامها
│   └── AdminLayout.tsx     # تخطيط الواجهة الرئيسي
├── hooks/                  # Custom React Hooks
│   └── useAdminAPI.ts      # Hooks لجلب البيانات من API
├── context/                # React Context
│   └── AdminContext.tsx    # إدارة الحالة العامة
├── types/                  # TypeScript types
│   └── index.ts           # تعريفات الأنواع
├── utils/                  # دوال مساعدة
│   └── ...
└── api/                    # دوال API
    └── ...
```

## Getting Started

### Installation

```bash
# تثبيت المتطلبات
cd /vercel/share/v0-project
pnpm install

# بدء خادم التطوير
pnpm dev
```

### Accessing Admin Dashboard

```
http://localhost:5173/admin
```

## Component Usage

### AdminLayout Component

التخطيط الرئيسي لجميع صفحات الواجهة الإدارية:

```tsx
import AdminLayout from '@/admin/components/AdminLayout';

export default function MyAdminPage() {
  return (
    <AdminLayout>
      {/* Page content here */}
    </AdminLayout>
  );
}
```

### useAdmin Hook

الوصول إلى حالة الواجهة الإدارية:

```tsx
import { useAdmin } from '@/admin/context/AdminContext';

export default function Component() {
  const { 
    currentUser, 
    dashboard, 
    notifications,
    addNotification,
    refreshDashboard 
  } = useAdmin();

  // Use admin context data
}
```

### Data Fetching Hooks

جلب البيانات من API:

```tsx
import { 
  useWhatsAppAccounts,
  useWebhookEvents,
  useDatabaseStats,
  useAuditLogs 
} from '@/admin/hooks/useAdminAPI';

export default function Component() {
  const { accounts, loading, error, refetch } = useWhatsAppAccounts();
  
  // Use data
}
```

## API Integration

### Required API Endpoints

الواجهة الإدارية تتطلب الاتصال بالـ API التالية:

#### Dashboard
- `GET /api/v1/admin/dashboard` - البيانات الرئيسية
- `GET /api/v1/admin/database/stats` - إحصائيات قاعدة البيانات

#### WhatsApp
- `GET /api/v1/whatsapp/accounts` - قائمة الحسابات
- `GET /api/v1/whatsapp/messages` - سجل الرسائل
- `POST /api/v1/whatsapp/send` - إرسال رسالة
- `GET /api/v1/whatsapp/statistics` - الإحصائيات

#### Webhooks
- `GET /api/v1/webhooks/events` - قائمة الأحداث
- `GET /api/v1/webhooks/statistics` - إحصائيات الـ Webhooks
- `POST /api/v1/webhooks/events/:id/retry` - إعادة محاولة
- `GET /api/v1/webhooks/endpoints` - نقاط النهاية

#### Audit Logs
- `GET /api/v1/admin/audit-logs` - سجلات التدقيق

## Authentication

جميع الطلبات تحتاج token JWT في رأس Authorization:

```javascript
const token = localStorage.getItem('token');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

## Styling

الواجهة الإدارية تستخدم:
- **Framework**: Tailwind CSS
- **Color Scheme**: Dark mode (Gray-800/900)
- **Components**: Custom components مع Shadcn/UI patterns
- **Icons**: Lucide React

### Color Palette

```css
- Primary: Blue (#3b82f6)
- Success: Green (#10b981)
- Warning: Orange (#f59e0b)
- Error: Red (#ef4444)
- Background: Gray-900 (#111827)
- Surface: Gray-800 (#1f2937)
```

## State Management

استخدام React Context API:

```tsx
import { AdminProvider } from '@/admin/context/AdminContext';

export default function App() {
  return (
    <AdminProvider>
      <AdminDashboard />
    </AdminProvider>
  );
}
```

## Error Handling

معالجة الأخطاء الموحدة:

```tsx
const { data, loading, error } = useWhatsAppAccounts();

if (error) {
  return <div className="text-red-400">Error: {error}</div>;
}

if (loading) {
  return <div>Loading...</div>;
}
```

## Performance Optimization

### Lazy Loading
```tsx
const Dashboard = lazy(() => import('@/admin/pages/Dashboard'));
```

### Memoization
```tsx
const AdminLayout = React.memo(({ children }) => {
  // Component
});
```

### Data Caching
```tsx
const { stats, loading, refetch } = useDatabaseStats();

useEffect(() => {
  // Refresh every 30 seconds
  const interval = setInterval(refetch, 30000);
  return () => clearInterval(interval);
}, [refetch]);
```

## Testing

### Unit Tests
```bash
pnpm test
```

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import Dashboard from '@/admin/pages/Dashboard';

test('renders dashboard', () => {
  render(<Dashboard />);
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});
```

## Common Tasks

### Adding a New Admin Page

1. إنشاء الملف في `src/admin/pages/`
2. استيراد `AdminLayout`
3. إضافة صفحة في الملاحة الجانبية

```tsx
'use client';

import AdminLayout from '../components/AdminLayout';

export default function NewPage() {
  return (
    <AdminLayout>
      {/* Your content */}
    </AdminLayout>
  );
}
```

### Adding a New Data Hook

```tsx
// src/admin/hooks/useAdminAPI.ts

export const useNewData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/endpoint', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Token Expired
```tsx
// Automatically refresh token
if (error.statusCode === 401) {
  // Redirect to login
  window.location.href = '/login';
}
```

### API Connection Failed
```tsx
// Check network and API status
if (!navigator.onLine) {
  // Show offline message
}
```

### Slow Performance
```tsx
// Enable debug logging
localStorage.setItem('DEBUG', 'true');
```

## Contributing

عند إضافة ميزات جديدة:

1. اتبع المعايير الموجودة
2. أضف TypeScript types
3. أضف تعليقات للكود
4. اختبر الميزة
5. وثق التغييرات

## Support

للمساعدة أو الإبلاغ عن المشاكل:
- تواصل مع فريق التطوير
- افحص الـ server logs
- تحقق من اتصال API

---

**آخر تحديث**: 2026-06-17
**النسخة**: 1.0.0
