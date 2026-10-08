/* Geometrik Şekiller temasının kısa dersleri. Biçim ve kurallar: ortak/katalog.js başındaki açıklama. */
KATALOG.tema('matematik', 'geometrik-sekiller', {
  tanitim: 'Üçgende bildiğin kurallar neden her üçgende doğru? Bu temada ölçmekle yetinmiyoruz: açı ve kenar özelliklerini önce doğruluyor, sonra ispatlıyoruz.',
  konular: [
    { harf: 'A', ad: 'Açılar ve ispat', renk: '#6ea8ff', dersler: [
      ['a1-olcmek-ispat-degildir.html', 'Ölçmek ispat değildir', 'Üç üçgende 180° çıktı. Bütün üçgenler için emin olabilir miyiz?', 4, 310],
      ['a2-ispat-neye-dayanir.html', 'İspat doğru bilgilerin üstüne kurulur', 'Bir mimar “bu çizim doğru” derken hangi bilgilere güvenir?', 6, 439],
      ['a3-ic-acilar-180.html', 'İç açıların toplamı 180°dir', 'Üç köşedeki açıların toplamını çizmeden bilebilir misin?', 7, 545],
      ['a4-dis-acilar-360.html', 'Dış açıların toplamı 360°dir', 'Üçgen bir parkın çevresini dolaşınca toplam kaç derece dönersin?', 6, 447],
      ['a5-dis-aci-iki-ic-aci.html', 'Dış açı, uzaktaki iki iç açının toplamıdır', 'Dışarı bakan bir açı, içerideki hangi açılarla ilgilidir?', 6, 474],
      ['a6-tekrar.html', 'Konu tekrarı: Açılar ve ispat', 'Beş dersin kuralları aklında mı?', 1, 206],
    ] },
    { harf: 'B', ad: 'Kenarlar ve açılar', renk: '#ff8a5b', dersler: [
      ['b1-en-uzun-kenar-en-buyuk-aci.html', 'En uzun kenarın karşısı en büyük açıdır', 'En uzun çubuğun karşısındaki köşe en dar mı, en geniş mi?', 4, 309],
      ['b2-acilari-sirala-kenarlari-sirala.html', 'Açıları sırala, kenarları sırala', 'Yalnızca kenarları ölçerek en dar köşeyi söyleyebilir misin?', 5, 390],
      ['b3-ucgen-esitsizligi.html', 'Üçgen eşitsizliği', '3 m, 4 m ve 8 m’lik çubuklarla üçgen bir destek kurulur mu?', 4, 286],
      ['b4-ucuncu-kenar-araligi.html', 'Üçüncü kenar hangi aralıkta?', '7 m ve 11 m’lik iki çubuğa üçüncü çubuk ne kadar olabilir?', 5, 384],
      ['b5-tekrar.html', 'Konu tekrarı: Kenarlar ve açılar', 'Dört dersin kuralları aklında mı?', 1, 245],
    ] },
    { harf: 'C', ad: 'Doğrulamayı sınamak ve kullanmak', renk: '#3ddc97', dersler: [
      ['c1-bu-ispat-her-ucgende-calisir-mi.html', 'Bu ispat her üçgende çalışır mı?', 'Yalnızca dik üçgenle yapılan bir “ispat” her üçgen için geçerli mi?', 4, 334],
      ['c2-onermeyi-yeni-sekle-uyarla.html', 'Önermeyi yeni şekle uyarla', 'İçe dönük köşedeki açıyı öbür üç açıdan bulabilir misin?', 4, 363],
      ['c3-onermeler-is-gorur.html', 'Doğrulanmış önermeler iş görür', 'Bir mühendis, kafesin hiç ölçmediği bir açısını nasıl bulur?', 6, 443],
      ['c4-tekrar.html', 'Konu tekrarı: Doğrulamayı sınamak ve kullanmak', 'Üç dersin kuralları aklında mı?', 1, 264],
    ] },
  ],
  hikayeler: [
    { kod: 'B3', ders: 'Üçgen eşitsizliği', ad: 'Çadır neden kapanmıyor?', video: 'hikaye/b3-cadir-neden-kapanmiyor/renders/b3-cadir-neden-kapanmiyor.mp4', kapak: 'hikaye/b3-cadir-neden-kapanmiyor/renders/kapak.jpg' },
  ],
});
