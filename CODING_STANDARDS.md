# معايير الترميز وأفضل الممارسات
**Code Quality Standards & Best Practices**

---

## 1️⃣ معايير TypeScript

### النوع والواجهات
```typescript
// ✅ صحيح
interface ComponentProps {
  title: string
  onClick: (id: string) => void
  disabled?: boolean
}

export function MyComponent({ title, onClick, disabled = false }: ComponentProps) {
  return <button onClick={() => onClick('123')}>{title}</button>
}

// ❌ خاطئ - بدون نوع
export function MyComponent(props: any) {
  return <button>{props.title}</button>
}
```

### الثوابت
```typescript
// ✅ صحيح
const NAVIGATION_ITEMS = ['home', 'about', 'services'] as const
type NavigationItem = (typeof NAVIGATION_ITEMS)[number]

// ❌ خاطئ
const navItems = ['home', 'about', 'services']
```

---

## 2️⃣ معايير React

### المكونات الوظيفية
```tsx
// ✅ صحيح - استخدام export function
export function MyComponent() {
  return <div>محتوى</div>
}

// ✅ صحيح - مع TypeScript
interface Props {
  name: string
}

export function MyComponent({ name }: Props) {
  return <div>{name}</div>
}

// ❌ خاطئ - export default
const MyComponent = () => <div>محتوى</div>
export default MyComponent
```

### الـ Hooks
```tsx
// ✅ صحيح
export function MyComponent() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // التأثيرات هنا
  }, [count])
  
  return <div onClick={() => setCount(count + 1)}>{count}</div>
}

// ❌ خاطئ - Hooks شرطي
export function MyComponent({ enabled }: { enabled: boolean }) {
  if (enabled) {
    const [count, setCount] = useState(0)  // ❌ لا يجوز
  }
}
```

---

## 3️⃣ معايير الترميز

### التسمية (Naming)
```typescript
// ✅ صحيح
const getUserProfile = async (userId: string) => {}
const isUserLoggedIn = false
const MAX_RETRIES = 3
const DARK_MODE_CLASS = 'dark'

// ❌ خاطئ
const gUP = async (id) => {}
const u = false
const max = 3
const dm = 'dark'
```

### التعليقات (Comments)
```typescript
// ✅ صحيح - شرح السبب والفائدة
// استخدام localStorage بدلاً من sessionStorage للحفاظ على اختيار اللغة
const savedLanguage = localStorage.getItem('language')

// ❌ خاطئ - تكرار الكود
// احفظ اللغة
localStorage.setItem('language', 'ar')
```

### التنسيق والمحاذاة
```typescript
// ✅ صحيح
export function longFunctionNameWithManyParameters(
  firstParameter: string,
  secondParameter: number,
  thirdParameter: boolean
): void {
  // الكود هنا
}

// ❌ خاطئ
export function longFunctionNameWithManyParameters(firstParameter: string, secondParameter: number, thirdParameter: boolean): void {
  // الكود هنا
}
```

---

## 4️⃣ معايير المكونات

### بنية المكون
```tsx
// ✅ الترتيب الصحيح
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'

interface MyComponentProps {
  title: string
  onClose: () => void
}

export function MyComponent({ title, onClose }: MyComponentProps) {
  // Hooks
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  // Handlers
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  // Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>{t('button.label')}</Button>
    </div>
  )
}
```

### دعم i18n
```tsx
// ✅ صحيح
interface Props {
  projectName: string
}

export function ProjectCard({ projectName }: Props) {
  const { t } = useLanguage()
  
  return (
    <div>
      <h3>{projectName}</h3>
      <p>{t('projects.description')}</p>
      <button>{t('buttons.viewMore')}</button>
    </div>
  )
}

// ❌ خاطئ - نص مباشر بدون ترجمة
<button>View More</button>
```

---

## 5️⃣ معايير الأداء

### Image Optimization
```tsx
// ✅ صحيح
<OptimizedImage
  src="/images/project.jpg"
  alt="وصف الصورة"
  width={400}
  height={300}
  priority={false}
/>

// ❌ خاطئ
<img src="/images/project.jpg" />
```

### Code Splitting
```tsx
// ✅ صحيح - استيراد ديناميكي
import dynamic from 'next/dynamic'
const HeavyComponent = dynamic(() => import('@/components/heavy'), {
  loading: () => <div>جاري التحميل...</div>,
})

// ❌ خاطئ - استيراد كل شيء
import { HeavyComponent } from '@/components'
```

### Memoization
```tsx
// ✅ صحيح - مع useMemo و useCallback
const memoizedValue = useMemo(() => expensiveFunction(a, b), [a, b])
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b])

// ❌ خاطئ - بدون تحسين
const value = expensiveFunction(a, b)
const callback = () => doSomething(a, b)
```

---

## 6️⃣ معايير الـ Accessibility

### ARIA Labels
```tsx
// ✅ صحيح
<button aria-label="إغلاق القائمة" onClick={closeMenu}>
  ✕
</button>

<nav aria-label="الملاحة الرئيسية">
  <ul>{/* روابط الملاحة */}</ul>
</nav>

// ❌ خاطئ
<button onClick={closeMenu}>✕</button>
```

### Semantic HTML
```tsx
// ✅ صحيح
<header>
  <nav>{/* الملاحة */}</nav>
</header>
<main>
  <article>{/* المحتوى */}</article>
</main>
<footer>
  <p>&copy; 2026</p>
</footer>

// ❌ خاطئ
<div className="header">
  <div className="nav">{/* الملاحة */}</div>
</div>
<div className="main">
  <div className="article">{/* المحتوى */}</div>
</div>
```

### Focus Management
```tsx
// ✅ صحيح
<button 
  onClick={handleClick}
  className="focus:outline-none focus:ring-2 focus:ring-yellow-500"
>
  اضغط هنا
</button>

// ❌ خاطئ
<button onClick={handleClick} className="no-focus-ring">
  اضغط هنا
</button>
```

---

## 7️⃣ معايير الاختبار

### Unit Tests
```typescript
// ✅ صحيح
describe('Button Component', () => {
  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Integration Tests
```typescript
// ✅ صحيح
describe('Contact Form', () => {
  it('should submit form with valid data', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John' } })
    fireEvent.click(screen.getByText('Submit'))
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled()
    })
  })
})
```

---

## ✅ Checklist قبل الـ Commit

- [ ] لا توجد أخطاء TypeScript
- [ ] جميع المكونات لها JSDoc comments
- [ ] جميع النصوص مترجمة
- [ ] اختبارات Unit موجودة
- [ ] لا يوجد console.log في Production
- [ ] Responsive Design يعمل
- [ ] Accessibility متوفرة
- [ ] Performance محسّن

---

**آخر تحديث:** 2026-01-10
`
