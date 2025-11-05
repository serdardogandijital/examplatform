#!/bin/bash

# Exam Platform - Stop Script
# Tüm servisleri durdurur

echo "🛑 Exam Platform Durduruluyor..."

# tmux session varsa kapat
if command -v tmux &> /dev/null; then
    if tmux has-session -t examplatform 2>/dev/null; then
        tmux kill-session -t examplatform
        echo "✅ tmux session kapatıldı"
    fi
fi

# Port'ları temizle
echo "🔍 Port kontrolü..."

PORTS=(3000 5000 4000 8080 9099 9199)

for PORT in "${PORTS[@]}"; do
    PID=$(lsof -ti:$PORT)
    if [ ! -z "$PID" ]; then
        kill -9 $PID 2>/dev/null
        echo "✅ Port $PORT temizlendi"
    fi
done

echo "✅ Tüm servisler durduruldu!"

