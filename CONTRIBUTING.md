# Katkı Rehberi

Exam Platform projesine katkıda bulunmak için lütfen aşağıdaki kuralları takip edin.

## 🚀 Başlangıç

1. Repository'yi fork edin
2. Feature branch oluşturun: `git checkout -b feature/yeni-ozellik`
3. Değişikliklerinizi commit edin: `git cz`
4. Branch'inizi push edin: `git push origin feature/yeni-ozellik`
5. Pull Request açın

## 📝 Commit Mesajları

Commitizen kullanın:
```bash
git add .
git cz
```

Format:
- `feat`: Yeni özellik
- `fix`: Hata düzeltme
- `docs`: Dokümantasyon
- `style`: Kod formatı
- `refactor`: Kod iyileştirme
- `test`: Test ekleme
- `chore`: Konfigürasyon

## ✅ Pull Request Checklist

- [ ] Kod lint kontrolünden geçti
- [ ] Testler yazıldı ve geçti
- [ ] Build başarılı
- [ ] Dokümantasyon güncellendi
- [ ] TypeScript hataları yok
- [ ] Kod yorumları İngilizce

## 🧪 Test

```bash
npm test
npm run lint
```

## 💻 Kod Standartları

- TypeScript strict mode
- ESLint + Prettier
- Camel case (değişkenler)
- Pascal case (componentler)
- Single Responsibility Principle
- Error handling her yerde

## 🔍 Review Süreci

- En az 1 approver gerekli
- Tüm testler yeşil
- Linter hatasız
- Force push yasak

