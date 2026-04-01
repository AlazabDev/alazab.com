#!/bin/bash

KEYSTORE="app/alazab-release.keystore"
PASSWORD="Azab@202555"

echo "========================================="
echo "🔐 بصمات التوقيع لتطبيق العزب"
echo "========================================="
echo ""

# SHA-1 كامل
SHA1=$(keytool -list -v -keystore $KEYSTORE -storepass $PASSWORD 2>/dev/null | grep "SHA1:" | awk '{print $2}')
echo "📱 SHA-1 (كامل):"
echo "   $SHA1"
echo ""

# SHA-1 بدون نقطتين
SHA1_NO_COLONS=$(echo $SHA1 | tr -d ':')
echo "📱 SHA-1 (بدون نقطتين):"
echo "   $SHA1_NO_COLONS"
echo ""

# أول 11 حرف من SHA-1
SHA1_11=${SHA1_NO_COLONS:0:11}
echo "📱 SHA-1 (أول 11 حرف):"
echo "   $SHA1_11"
echo ""

# SHA-256
SHA256=$(keytool -list -v -keystore $KEYSTORE -storepass $PASSWORD 2>/dev/null | grep "SHA256:" | awk '{print $2}')
echo "🔒 SHA-256 (كامل):"
echo "   $SHA256"
echo ""

# SHA-256 بدون نقطتين
SHA256_NO_COLONS=$(echo $SHA256 | tr -d ':')
echo "🔒 SHA-256 (بدون نقطتين):"
echo "   $SHA256_NO_COLONS"
echo ""

# MD5
MD5=$(keytool -list -v -keystore $KEYSTORE -storepass $PASSWORD 2>/dev/null | grep "MD5:" | awk '{print $2}')
echo "🆔 MD5:"
echo "   $MD5"
echo ""

echo "========================================="
echo "✅ النتائج المحفوظة في: signatures.txt"
echo "========================================="

# حفظ النتائج في ملف
cat > signatures.txt << EOF
=========================================
بصمات التوقيع - تطبيق العزب
=========================================
SHA-1 (كامل): $SHA1
SHA-1 (بدون نقطتين): $SHA1_NO_COLONS
SHA-1 (أول 11 حرف): $SHA1_11
SHA-256 (كامل): $SHA256
SHA-256 (بدون نقطتين): $SHA256_NO_COLONS
MD5: $MD5
=========================================
EOF

cat signatures.txt
