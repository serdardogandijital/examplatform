# 🚀 HEMEN BAŞLA

## ✅ Tamamlanan İşlemler

1. ✅ GitHub repository oluşturuldu: https://github.com/serdardogandijital/examplatform
2. ✅ Tüm kod GitHub'a push edildi
3. ✅ Bağımlılıklar yüklendi (2154 paket)
4. ✅ Git hooks kuruldu (Husky)
5. ✅ Environment dosyaları oluşturuldu
6. ✅ Tüm testler geçti ✓
7. ✅ Lint hataları düzeltildi ✓

## 🔥 ŞİMDİ NE YAPMALI?

### Seçenek 1: Hızlı Başlangıç (Önerilen)

```bash
# 1. Firebase Emulator'ı başlat (Terminal 1)
cd /Users/serdardogan/tst
npm run emulator

# 2. Backend + Web'i başlat (Terminal 2 - yeni terminal aç)
cd /Users/serdardogan/tst
npm run dev
```

**Erişim:**
- 🌐 Web: http://localhost:3000
- 🔌 API: http://localhost:5000/health
- 🔥 Firebase UI: http://localhost:4000

### Seçenek 2: Otomatik Başlatma (tmux ile)

```bash
./START.sh
```

Durdurma:
```bash
./STOP.sh
```

---

## 📋 Firebase Kurulumu (İsteğe Bağlı)

Şu an **Firebase Emulator** ile çalışıyor, production Firebase'e gerek yok.

### Gerçek Firebase İstersen:

```bash
# Firebase CLI kur
npm install -g firebase-tools
firebase login

# Proje oluştur
firebase projects:create examplatform-dev

# Firebase Console'da:
# 1. Authentication → Email/Password aktif et
# 2. Firestore Database oluştur
# 3. Storage başlat
# 4. Web app ekle ve config'i kopyala

# web/.env dosyasını güncelle
nano web/.env
```

---

## 🎯 İlk Geliştirmeye Başla

### 1. Feature Branch Oluştur
```bash
git checkout -b feature/ilk-ozelligim
```

### 2. Kod Yaz
Örnek: Backend'e yeni endpoint ekle:
```bash
nano backend/src/routes/test.routes.ts
```

### 3. Test Et
```bash
npm test
npm run lint
```

### 4. Commit (Commitizen ile)
```bash
git add .
git cz
```

Mesaj örneği:
- Type: `feat` (yeni özellik) veya `fix` (hata düzeltme)
- Scope: `backend` veya `web` veya `mobile`
- Message: "add test endpoint"

### 5. Push
```bash
git push origin feature/ilk-ozelligim
```

### 6. Pull Request
GitHub'da PR aç: https://github.com/serdardogandijital/examplatform/pulls

---

## 📚 Önemli Dosyalar

| Dosya | Açıklama |
|-------|----------|
| **QUICKSTART.md** | 5 dakikada başla |
| **SETUP_GUIDE.md** | Detaylı kurulum |
| **COMMANDS.md** | Tüm komutlar |
| **STATUS.md** | Proje durumu |
| **docs/API.md** | API dokümantasyonu |
| **docs/ARCHITECTURE.md** | Mimari |

---

## 🆘 Sorun mu Var?

### Port zaten kullanımda
```bash
./STOP.sh
```

### Firebase bağlanamıyor
```bash
# Terminal 1'de Firebase Emulator çalışıyor mu kontrol et
# Çalışıyorsa http://localhost:4000 açılmalı
```

### Test başarısız
```bash
npm install
npm test
```

---

## 🎉 SİSTEM HAZIR!

**3 Adımda Başla:**

1. **Terminal 1**: `npm run emulator`
2. **Terminal 2**: `npm run dev`
3. **Tarayıcı**: http://localhost:3000

**Kod yazmaya başlayabilirsin!** 🚀

---

## 💡 Hızlı Aliaslar (İsteğe Bağlı)

`.zshrc` veya `.bashrc` dosyana ekle:

```bash
alias exam-start="cd /Users/serdardogan/tst && ./START.sh"
alias exam-stop="cd /Users/serdardogan/tst && ./STOP.sh"
alias exam-dev="cd /Users/serdardogan/tst && npm run dev"
alias exam-test="cd /Users/serdardogan/tst && npm test"

# Aktif et
source ~/.zshrc
```

Artık sadece `exam-start` yaz! 🎯

---

## 📞 Yardım

- **GitHub**: https://github.com/serdardogandijital/examplatform
- **Issues**: https://github.com/serdardogandijital/examplatform/issues
- **Dokümantasyon**: `/Users/serdardogan/tst/docs/`

---

**Hazırsın! İyi geliştirmeler! 🎊**

