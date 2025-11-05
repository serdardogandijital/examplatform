#!/bin/bash

echo "🚀 Exam Platform Setup Script"
echo "================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js bulunamadı. Lütfen Node.js 20+ kurun."
    exit 1
fi

echo "✅ Node.js $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm bulunamadı."
    exit 1
fi

echo "✅ npm $(npm -v)"

# Install dependencies
echo "📦 Bağımlılıklar yükleniyor..."
npm install

# Setup Husky
echo "🐶 Husky yapılandırılıyor..."
npm run prepare

# Copy env files
echo "📝 Environment dosyaları hazırlanıyor..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ backend/.env oluşturuldu"
fi

if [ ! -f web/.env ]; then
    cp web/.env.example web/.env
    echo "✅ web/.env oluşturuldu"
fi

echo ""
echo "✅ Kurulum tamamlandı!"
echo ""
echo "📝 Sonraki adımlar:"
echo "1. backend/.env ve web/.env dosyalarını düzenleyin"
echo "2. Firebase projenizi yapılandırın"
echo "3. 'npm run emulator' ile Firebase Emulator başlatın"
echo "4. 'npm run dev' ile geliştirme sunucularını başlatın"
echo ""
echo "Daha fazla bilgi için README.md dosyasına bakın."

