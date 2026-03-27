# 📱 دليل بناء تطبيق أندرويد — شركة العزب
## Android Build Guide (AAB + APK + Signing for Google Play)

---

## المتطلبات

- **Node.js 18+** و **pnpm**
- **Android Studio** (أحدث إصدار)
- **Java JDK 17+** (يأتي مع Android Studio)
- حساب **Google Play Console** جاهز

---

## الخطوات

### 1️⃣ استنساخ المشروع وتثبيت التبعيات

```bash
git clone https://github.com/AlazabDev/alazab.com.git
cd alazab.com
pnpm install
```

### 2️⃣ بناء ملفات الويب

```bash
pnpm build
```

### 3️⃣ تثبيت Capacitor (إن لم يكن مثبتاً)

```bash
pnpm add @capacitor/core @capacitor/cli @capacitor/android
```

### 4️⃣ إضافة منصة أندرويد

```bash
npx cap add android
```

### 5️⃣ مزامنة المشروع

```bash
npx cap sync android
```

### 6️⃣ تحديث `capacitor.config.ts` للإنتاج

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alazab.app',
  appName: 'شركة العزب للمقاولات',
  webDir: 'dist',
  server: {
    hostname: 'alazab.com',
    androidScheme: 'https',
  },
};

export default config;
```

> ⚠️ **مهم**: احذف `server.url` نهائياً في الإنتاج حتى يعمل التطبيق من الملفات المحلية.

### 7️⃣ فتح المشروع في Android Studio

```bash
npx cap open android
```

---

## 🔐 إنشاء بصمة التوقيع (Keystore)

### إنشاء ملف Keystore جديد

```bash
keytool -genkey -v \
  -keystore alazab-release.keystore \
  -alias alazab \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=Alazab Construction, OU=Mobile, O=Alazab, L=Cairo, ST=Cairo, C=EG"
```

> 🔴 **احفظ الملف وكلمات المرور في مكان آمن جداً! فقدانهم = لا يمكنك تحديث التطبيق أبداً**

### استخراج بصمة SHA-256 (مطلوبة لـ Google Play)

```bash
keytool -list -v -keystore alazab-release.keystore -alias alazab
```

ستظهر:
```
SHA1:   XX:XX:XX:...
SHA256: XX:XX:XX:...
```

---

## 📦 بناء AAB (للنشر على Google Play)

### الطريقة 1: من Android Studio (الأسهل)

1. افتح Android Studio
2. اذهب إلى: **Build → Generate Signed Bundle / APK**
3. اختر **Android App Bundle**
4. اختر ملف الـ Keystore واملأ كلمات المرور
5. اختر **release**
6. اضغط **Create**

الملف الناتج:
```
android/app/release/app-release.aab
```

### الطريقة 2: من سطر الأوامر

1. أنشئ ملف `android/key.properties`:

```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=alazab
storeFile=../../alazab-release.keystore
```

2. عدّل `android/app/build.gradle` — أضف قبل `android {`:

```gradle
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
```

3. داخل `android {}` أضف:

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

4. ابنِ:

```bash
cd android
./gradlew bundleRelease
```

الملف الناتج:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## 📱 بناء APK (للتثبيت المباشر)

```bash
cd android
./gradlew assembleRelease
```

الملف الناتج:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🚀 النشر على Google Play

### 1. ارفع AAB على Google Play Console

1. ادخل على [Google Play Console](https://play.google.com/console)
2. اذهب للتطبيق → **Release → Production**
3. أنشئ إصدار جديد
4. ارفع ملف `app-release.aab`
5. أضف ملاحظات الإصدار
6. أرسل للمراجعة

### 2. بيانات التطبيق المطلوبة

| البند | القيمة |
|-------|--------|
| اسم التطبيق | شركة العزب للمقاولات العامة |
| Package Name | `com.alazab.app` |
| الفئة | Business / أعمال |
| الموقع | https://alazab.com |
| سياسة الخصوصية | https://alazab.com/privacy |

### 3. الصور المطلوبة

| النوع | الحجم |
|-------|-------|
| أيقونة التطبيق | 512×512 px |
| Feature Graphic | 1024×500 px |
| لقطات شاشة هاتف | 2-8 صور (1080×1920 px) |
| لقطات شاشة تابلت | 1-8 صور (اختياري) |

---

## 🔄 التحديث المستقبلي

```bash
git pull
pnpm install
pnpm build
npx cap sync android
cd android
./gradlew bundleRelease
```

ثم ارفع AAB الجديد على Google Play Console.

---

## ⚠️ ملاحظات مهمة

1. **لا تشارك ملف keystore أو كلمات المرور أبداً**
2. **خذ نسخة احتياطية من keystore** في مكان آمن
3. تأكد من زيادة `versionCode` في `android/app/build.gradle` مع كل تحديث
4. **لا تضف `key.properties` أو `*.keystore` إلى Git** — أضفهم للـ `.gitignore`
5. فعّل **Google Play App Signing** للحماية الإضافية
