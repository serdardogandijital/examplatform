#!/bin/bash

# Exam Platform - Quick Start Script
# Bu script tüm servisleri otomatik başlatır

echo "🚀 Exam Platform Başlatılıyor..."
echo "================================"

# Terminal session kontrolü
if ! command -v tmux &> /dev/null && ! command -v screen &> /dev/null; then
    echo "⚠️  tmux veya screen bulunamadı."
    echo "Manuel olarak 2 terminal açın:"
    echo ""
    echo "Terminal 1: npm run emulator"
    echo "Terminal 2: npm run dev"
    exit 1
fi

# tmux kullanarak başlat
if command -v tmux &> /dev/null; then
    echo "📦 tmux session oluşturuluyor..."
    
    # Yeni session oluştur
    tmux new-session -d -s examplatform
    
    # İlk window: Firebase Emulator
    tmux rename-window -t examplatform:0 'Firebase'
    tmux send-keys -t examplatform:0 'cd /Users/serdardogan/tst && npm run emulator' C-m
    
    # İkinci window: Dev servers
    tmux new-window -t examplatform:1 -n 'Servers'
    tmux send-keys -t examplatform:1 'cd /Users/serdardogan/tst && sleep 5 && npm run dev' C-m
    
    echo "✅ Servisler başlatıldı!"
    echo ""
    echo "📋 Erişim:"
    echo "   - Web: http://localhost:3000"
    echo "   - API: http://localhost:5000"
    echo "   - Firebase UI: http://localhost:4000"
    echo ""
    echo "🎮 tmux session'a bağlanmak için:"
    echo "   tmux attach -t examplatform"
    echo ""
    echo "🛑 Durdurmak için:"
    echo "   tmux kill-session -t examplatform"
    
    # Otomatik attach
    sleep 2
    tmux attach -t examplatform
else
    echo "❌ tmux kurulamadı"
    exit 1
fi

