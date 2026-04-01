#!/bin/bash

# سكريبت إعادة بناء Android كامل مع الأيقونات الجديدة

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🔄 إعادة بناء تطبيق العزب مع الأيقونات الجديدة${NC}"
echo -e "${BLUE}========================================${NC}"

cd /var/www/core/alazab.com

# 1. نسخ الأيقونات الجديدة
echo -e "${YELLOW}📁 نسخ الأيقونات الجديدة...${NC}"
cp -r public/android/res/* android/app/src/main/res/
cp public/android/play_store_512.png android/app/src/main/res/drawable/
echo -e "${GREEN}✅ تم نسخ الأيقونات${NC}"

# 2. تنظيف المشروع
echo -e "${YELLOW}🧹 تنظيف المشروع...${NC}"
cd android
./gradlew clean
rm -rf app/build
echo -e "${GREEN}✅ تم التنظيف${NC}"

# 3. بناء AAB
echo -e "${YELLOW}📦 بناء AAB...${NC}"
./gradlew bundleRelease
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ تم بناء AAB${NC}"
else
    echo -e "${RED}❌ فشل بناء AAB${NC}"
    exit 1
fi

# 4. بناء APK
echo -e "${YELLOW}📱 بناء APK...${NC}"
./gradlew assembleRelease
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ تم بناء APK${NC}"
else
    echo -e "${RED}❌ فشل بناء APK${NC}"
    exit 1
fi

# 5. توقيع APK
echo -e "${YELLOW}🔐 توقيع APK...${NC}"
apksigner sign \
  --ks app/alazab-release.keystore \
  --ks-key-alias alazab \
  --ks-pass pass:Azab@202555 \
  --key-pass pass:Azab@202555 \
  --out app/build/outputs/apk/release/app-release-signed.apk \
  app/build/outputs/apk/release/app-release-unsigned.apk

# 6. نسخ إلى مجلد التحميلات
echo -e "${YELLOW}📂 نسخ إلى مجلد التحميلات...${NC}"
mkdir -p /var/www/downloads/alazab

# نسخ AAB
cp app/build/outputs/bundle/release/app-release.aab /var/www/downloads/alazab/app-release-1.0.0.aab

# نسخ APK الموقع
cp app/build/outputs/apk/release/app-release-signed.apk /var/www/downloads/alazab/app-release-1.0.0.apk

# 7. تحديث معلومات التوقيع
echo -e "${YELLOW}📝 تحديث معلومات التوقيع...${NC}"
cat > /var/www/downloads/alazab/signature-info.txt << EOF
========================================
تطبيق العزب - بصمات التوقيع (محدث)
========================================
تاريخ البناء: $(date)
الإصدار: 1.0.0

🔐 SHA-1:
$(keytool -list -v -keystore app/alazab-release.keystore -storepass Azab@202555 2>/dev/null | grep "SHA1:")

🔐 SHA-256:
$(keytool -list -v -keystore app/alazab-release.keystore -storepass Azab@202555 2>/dev/null | grep "SHA256:")

📦 Package: com.alazab.app
📱 App Name: العزب
========================================
EOF

# 8. عرض النتائج
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ إعادة البناء اكتملت بنجاح!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}📦 ملفات جاهزة:${NC}"
echo -e "  AAB: /var/www/downloads/alazab/app-release-1.0.0.aab"
echo -e "  APK: /var/www/downloads/alazab/app-release-1.0.0.apk"
echo ""
echo -e "${BLUE}📊 حجم الملفات:${NC}"
ls -lh /var/www/downloads/alazab/*.apk /var/www/downloads/alazab/*.aab 2>/dev/null
echo ""
echo -e "${BLUE}🔗 روابط التحميل:${NC}"
echo -e "  APK: https://alazab.com/downloads/alazab/app-release-1.0.0.apk"
echo -e "  AAB: https://alazab.com/downloads/alazab/app-release-1.0.0.aab"
echo -e "  صفحة التحميل: https://alazab.com/download.html"
echo ""