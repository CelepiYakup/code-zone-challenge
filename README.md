## Proje Hakkında

Verilen vaka çalışması kapsamında Next.js 15 kullanılarak geliştirilmiş Desktop/mobile responsive bir web uygulamasıdır. Figma tasarımlarına maksimum uyumluluğ hedeflenilmiş olup ek olarak geliştirci olarak belirli noktalarında tasarım dokunuşları eklenmiş figma dosyası haricinde rapkology web sitesi içinden örneklemeler alınmıştır.

Scss kullanılarak order yonetimi ile sayfa bileşenlerinin responsive yapılarını dektop/mobile uyumlulugunu gozeterek devam ettirilmeye çalışılmıştır.

Swipper ile carousel/slider bileşenleri oluşturulmuş tasarıma uygun bir şekilde hazırlanması amaçlanmıştır.


## Teknik Mimari

### Frontend Framework

- **Next.js 15** - App Router kullanımı ile modern React geliştirme
- **TypeScript** - Tip güvenliği ve geliştirici deneyimi
- **SCSS Modules** - Bileşen bazlı stillendirme sistemi

## Temel Özellikler

### Ana Sayfa Bileşenleri

1. **Hero Slider** - Öne çıkan içeriklerin otomatik geçişli sunumu
2. **Twitch Entegrasyonu** - Canlı yayın duyurları ve takip butonları
3. **Trends Bölümü** - Popüler içeriklerin sıralı gösterimi
4. **Aylık Favoriler** - Swiper ile kaydırmalı müzik listesi
5. **Keşfet Bölümü** - Filtrelenebilir içerik galerisi

### Blog-list Sistemi

- **Dinamik Routing** - `/blog/[slug]` yapısı

### Arama ve Filtreleme

- **Tag Bazlı Filtreleme** - Kategoriye göre içerik sınıflandırması
- **Pagination** - Lazy loading ile performans optimizasyonu
- **Responsive Arama** - Mobil dostu arama deneyimi

## Veri Yönetimi

### İçerik Yapısı

```typescript
interface Article {
  _id: string;
  attributes: {
    title: string;
    desc: string;
    img: string;
    authors: string[];
    category: string[];
    tags: string[];
    trends: boolean;
    slug: string;
    content?: string;
  };
  createdAt: string;
}
```

### Image Optimization

- **Next/Image** kullanımı ile otomatik optimizasyon
- **Lazy Loading** - Görünür alan dışındaki görseller gecikmeli yüklenir
- **Responsive Images** - Cihaz boyutuna göre görsel boyutlandırması


### Code Splitting

- **Dynamic Imports** - Sayfa bazlı kod bölümlemesi
- **Component Lazy Loading** - Büyük bileşenlerin gecikmeli yüklenmesi
- **Bundle Optimization** - Gereksiz kütüphane import'larının minimizasyonu

### Caching

```typescript
export async function generateStaticParams() {
  return data.map((post) => ({
    slug: post.attributes.slug,
  }));
}
```

## Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # Paylaşılan bileşenler
│   ├── blog/              # Blog sayfaları
│   │   ├── [slug]/        # Dinamik blog sayfası
│   │   └── _components/   # Blog özel bileşenleri
│   └── layout.tsx         # Ana layout
├── hooks/                 # Custom React hooks
├── lib/                   # Utility fonksiyonları
├── styles/                # Global stiller ve mixins
├── types/                 # TypeScript tip tanımları
└── data/                  # Statik veri dosyaları
```
## Kurulum ve Çalıştırma

```bash
# Projeyi klonlayın
git clone [repository-url]

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev

# Production build oluşturun
npm run build
```

Bu proje, modern web teknolojileri kullanarak Türk rap müzik sahnesine odaklanan, kullanıcı dostu ve performanslı bir platform sunmayı hedeflemektedir.
