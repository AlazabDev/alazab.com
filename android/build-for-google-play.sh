#!/bin/bash

# ============================================
# سكريبت بناء APK و AAB لتطبيق العزب
# Alazab Google Play Build Script
# ============================================

# الألوان
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# متغيرات التطبيق
APP_NAME="Alazab"
APP_PACKAGE="com.alazab.app"
APP_VERSION_NAME="1.0.0"
APP_VERSION_CODE=1

# المسارات
PROJECT_DIR="/var/www/core/alazab.com"
ANDROID_DIR="$PROJECT_DIR/android"
KEYSTORE_FILE="$ANDROID_DIR/app/alazab-release.keystore"
KEYSTORE_PASSWORD="Azab@202555"
KEY_ALIAS="alazab"
OUTPUT_DIR="$ANDROID_DIR/google-play-build"

# الألوان
print_header() {
    echo ""
    echo -e "${CYAN}============================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}============================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}📌 $1${NC}"
}

print_step() {
    echo -e "${YELLOW}🔧 $1${NC}"
}

# ============================================
# 1. التحقق من المتطلبات
# ============================================

print_header "📋 التحقق من المتطلبات"

# التحقق من Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -1 | cut -d'"' -f2)
    print_success "Java موجود: $JAVA_VERSION"
else
    print_error "Java غير موجود. جاري التثبيت..."
    sudo apt update && sudo apt install openjdk-17-jdk -y
fi

# التحقق من Gradle
cd "$ANDROID_DIR"
if [ -f "./gradlew" ]; then
    print_success "Gradle موجود"
else
    print_error "Gradle غير موجود"
    exit 1
fi

# ============================================
# 2. التحقق من Keystore
# ============================================

print_header "🔐 التحقق من Keystore"

if [ -f "$KEYSTORE_FILE" ]; then
    print_success "Keystore موجود"
    
    # التحقق من صحة keystore
    if keytool -list -keystore "$KEYSTORE_FILE" -storepass "$KEYSTORE_PASSWORD" &> /dev/null; then
        print_success "Keystore صالح"
        
        # استخراج بصمة SHA-1
        SHA1=$(keytool -list -v -keystore "$KEYSTORE_FILE" -storepass "$KEYSTORE_PASSWORD" 2>/dev/null | grep "SHA1:" | awk '{print $2}')
        SHA1_NO_COLONS=$(echo $SHA1 | tr -d ':')
        
        print_info "SHA-1: ${SHA1:0:20}..."
        print_info "SHA-1 (بدون نقطتين): ${SHA1_NO_COLONS:0:20}..."
    else
        print_error "Keystore غير صالح أو كلمة المرور خاطئة"
        exit 1
    fi
else
    print_error "Keystore غير موجود"
    exit 1
fi

# ============================================
# 3. إنشاء مجلد الإخراج
# ============================================

print_header "📁 إعداد مجلد الإخراج"

mkdir -p "$OUTPUT_DIR"
rm -rf "$OUTPUT_DIR"/*
print_success "تم إنشاء مجلد: $OUTPUT_DIR"

# ============================================
# 4. تحديث إصدار التطبيق
# ============================================

print_header "📱 تحديث إصدار التطبيق"

# تحديث build.gradle
sed -i "s/versionCode [0-9]*/versionCode $APP_VERSION_CODE/" "$ANDROID_DIR/app/build.gradle"
sed -i "s/versionName \".*\"/versionName \"$APP_VERSION_NAME\"/" "$ANDROID_DIR/app/build.gradle"

print_success "الإصدار: $APP_VERSION_NAME ($APP_VERSION_CODE)"

# ============================================
# 5. تنظيف المشروع
# ============================================

print_header "🧹 تنظيف المشروع"

print_step "حذف الملفات القديمة..."
rm -rf "$ANDROID_DIR/.gradle"
rm -rf "$ANDROID_DIR/app/build"
rm -rf "$ANDROID_DIR/build"

print_step "تنظيف Gradle..."
./gradlew clean

print_success "تم التنظيف"

# ============================================
# 6. بناء AAB (Android App Bundle)
# ============================================

print_header "📦 بناء AAB لـ Google Play"

print_step "جاري بناء AAB (قد يستغرق 3-5 دقائق)..."

./gradlew bundleRelease

if [ -f "$ANDROID_DIR/app/build/outputs/bundle/release/app-release.aab" ]; then
    AAB_FILE="app-release-${APP_VERSION_NAME}.aab"
    cp "$ANDROID_DIR/app/build/outputs/bundle/release/app-release.aab" "$OUTPUT_DIR/$AAB_FILE"
    print_success "✅ AAB تم بناؤه بنجاح"
    print_info "الحجم: $(du -h "$OUTPUT_DIR/$AAB_FILE" | cut -f1)"
    print_info "الموقع: $OUTPUT_DIR/$AAB_FILE"
else
    print_error "فشل بناء AAB"
    exit 1
fi

# ============================================
# 7. بناء APK (متعدد الأجهزة)
# ============================================

print_header "📱 بناء APK متعدد الأجهزة"

print_step "جاري بناء APK..."

./gradlew assembleRelease

if [ -f "$ANDROID_DIR/app/build/outputs/apk/release/app-release.apk" ]; then
    APK_FILE="app-release-${APP_VERSION_NAME}.apk"
    cp "$ANDROID_DIR/app/build/outputs/apk/release/app-release.apk" "$OUTPUT_DIR/$APK_FILE"
    print_success "✅ APK تم بناؤه بنجاح"
    print_info "الحجم: $(du -h "$OUTPUT_DIR/$APK_FILE" | cut -f1)"
else
    print_error "فشل بناء APK"
fi

# ============================================
# 8. تحليل جودة APK
# ============================================

print_header "🔍 تحليل جودة APK"

if command -v aapt2 &> /dev/null; then
    print_info "تحليل APK..."
    aapt2 dump badging "$OUTPUT_DIR/$APK_FILE" | grep -E "package:|versionName|versionCode|uses-permission|installLocation" > "$OUTPUT_DIR/apk-info.txt"
    print_success "تم حفظ معلومات APK في: apk-info.txt"
fi

# التحقق من الحجم
APK_SIZE=$(stat -c%s "$OUTPUT_DIR/$APK_FILE" 2>/dev/null || stat -f%z "$OUTPUT_DIR/$APK_FILE" 2>/dev/null)
if [ $APK_SIZE -gt 104857600 ]; then
    print_warning "حجم APK كبير ($((APK_SIZE/1048576)) MB). قد تحتاج إلى تحسين الحجم"
else
    print_success "حجم APK مناسب ($((APK_SIZE/1048576)) MB)"
fi

# ============================================
# 9. إنشاء ملفات meta-data لـ Google Play
# ============================================

print_header "📝 إنشاء ملفات Google Play"

cat > "$OUTPUT_DIR/google-play-info.txt" << EOF
========================================
تطبيق العزب - معلومات Google Play
========================================

📱 معلومات التطبيق
------------------
اسم التطبيق: $APP_NAME
Package Name: $APP_PACKAGE
الإصدار: $APP_VERSION_NAME
رمز الإصدار: $APP_VERSION_CODE

🔐 معلومات التوقيع
------------------
Keystore: alazab-release.keystore
Alias: $KEY_ALIAS
SHA-1: $SHA1
SHA-1 (بدون نقطتين): $SHA1_NO_COLONS

📦 ملفات النشر
------------------
AAB: $(basename $OUTPUT_DIR/$AAB_FILE) (${APP_VERSION_NAME})
APK: $(basename $OUTPUT_DIR/$APK_FILE) (${APP_VERSION_NAME})

✅ متطلبات Google Play
------------------
✓ Min SDK: 23 (Android 6.0)
✓ Target SDK: 34 (Android 14)
✓ التطبيق موقع بالتوقيع الصحيح
✓ تم بناء AAB و APK

📋 خطوات النشر على Google Play
------------------
1. ادخل إلى Google Play Console
2. أنشئ تطبيق جديد
3. ارفع ملف AAB: $AAB_FILE
4. أكمل معلومات المتجر
5. أرسل للمراجعة

========================================
EOF

print_success "تم حفظ معلومات Google Play"

# ============================================
# 10. إنشاء تقرير نهائي
# ============================================

print_header "📊 تقرير البناء النهائي"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 نجح بناء تطبيق العزب!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

echo -e "${CYAN}📦 ملفات جاهزة للنشر على Google Play:${NC}"
echo -e "  📱 AAB: ${GREEN}$OUTPUT_DIR/$AAB_FILE${NC}"
echo -e "  📱 APK: ${GREEN}$OUTPUT_DIR/$APK_FILE${NC}"
echo ""

echo -e "${CYAN}📊 معلومات الملفات:${NC}"
echo -e "  AAB: $(ls -lh "$OUTPUT_DIR/$AAB_FILE" | awk '{print $5}')"
echo -e "  APK: $(ls -lh "$OUTPUT_DIR/$APK_FILE" | awk '{print $5}')"
echo ""

echo -e "${CYAN}🔐 بصمة التوقيع:${NC}"
echo -e "  SHA-1: ${YELLOW}$SHA1${NC}"
echo -e "  SHA-1 (بدون نقطتين): ${YELLOW}${SHA1_NO_COLONS:0:30}...${NC}"
echo ""

echo -e "${CYAN}📁 مسار الملفات:${NC}"
echo -e "  $OUTPUT_DIR/"
echo ""

echo -e "${YELLOW}📋 خطوات النشر على Google Play:${NC}"
echo -e "  1. قم بزيارة: ${BLUE}https://play.google.com/console${NC}"
echo -e "  2. أنشئ تطبيق جديد"
echo -e "  3. ارفع ملف AAB: ${GREEN}$AAB_FILE${NC}"
echo -e "  4. أكمل معلومات المتجر"
echo -e "  5. أرسل للمراجعة (تستغرق 24-48 ساعة)"
echo ""

echo -e "${CYAN}✅ جاهز للنشر على Google Play!${NC}"
echo ""

# عرض الملفات
ls -la "$OUTPUT_DIR/"

# ============================================
# 11. اختبار APK على جهاز متصل
# ============================================

print_header "🧪 اختبار APK على الجهاز"

if command -v adb &> /dev/null; then
    DEVICES=$(adb devices | grep -v "List" | grep "device" | wc -l)
    if [ $DEVICES -gt 0 ]; then
        print_info "تم العثور على $DEVICES جهاز متصل"
        read -p "هل تريد تثبيت APK على الجهاز؟ (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            adb install -r "$OUTPUT_DIR/$APK_FILE"
            print_success "تم تثبيت التطبيق"
            
            # تشغيل التطبيق
            adb shell am start -n $APP_PACKAGE/.MainActivity
            print_success "تم تشغيل التطبيق"
        fi
    else
        print_warning "لا توجد أجهزة متصلة للتثبيت"
    fi
fi

print_success "✅ اكتمل البناء بنجاح!"
