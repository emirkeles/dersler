/* A1 · KİM.9.1.1 · MEB Kimya 9 s.20–24, 33; hazır veri s.24.
   Gerçek gözlem ve veri toplama site dışıdır. Hastalık nedenselliği çıkarılmaz. */
(() => {
  'use strict';
  const { yazi, kart, cubuklar, belir } = KIT;
  const urunler = [
    ['Temizlik', 'Sıvı sabun', 'Temizlikte kullanılır.'],
    ['Mutfak gereci', 'Alüminyum folyo', 'Koşul, gıdaya geçişi etkiler.'],
    ['Öz bakım', 'Diş macunu', 'Kullanım amacı farklıdır.'],
    ['Hazır gıda', 'Gazlı içecek', 'Ürünün niteliği incelenir.'],
  ];
  const marinasyon = [
    { ad: 'A', ph: '6,12', al: '0,047', sicaklik: [0.051, 0.055, 0.062] },
    { ad: 'B', ph: '5,23', al: '0,125', sicaklik: [0.128, 0.130, 0.134] },
    { ad: 'C', ph: '6,07', al: '0,058', sicaklik: [0.061, 0.063, 0.066] },
  ];
  async function urun(c) {
    const svg = c.svg();
    const ciz = (i) => {
      svg.replaceChildren(); const u = urunler[i];
      kart(c, svg, u[0], [u[1], u[2]]);
      yazi(c, svg, 500, 495, 'Kaynaklı kart · gerçek gözlem değildir', { size: 28 });
    };
    ciz(0);
    await c.say('Ürün türü ve kullanım amacı birlikte incelenir.');
    await c.choice({ q: 'Diş macunu hangi kullanım türüne örnektir?', options: ['Öz bakım', 'Mutfak gereci', 'Hazır gıda'], answer: 0,
      hints: ['', 'Mutfak gereci başka bir kullanım alanıdır.', 'Diş macunu gıda değildir.'], right: 'Öz bakım. Aynı görünüş, aynı kullanım demek değildir.' });
    c.slider({ label: 'Ürün kartı', min: 0, max: 3, value: 0, fmt: (i) => urunler[i][0], onInput: ciz });
    await c.say('Kartları değiştir; gerçek ürün gözlemi sınıfta yapılır.', { noWait: true });
    await c.cont();
  }
  async function kayit(c) {
    const svg = c.svg();
    const ciz = (i) => {
      svg.replaceChildren(); const m = marinasyon[i];
      kart(c, svg, 'Marinasyon ' + m.ad, ['pH: ' + m.ph, 'Al: ' + m.al + ' mgAl/100 g']);
      yazi(c, svg, 500, 495, 'Hazır ölçüm kaydı · kitap s. 24', { size: 28 });
    };
    ciz(0);
    await c.say('Bu ölçümler kitapta hazır verilmiştir; yeni deney yapmıyoruz.');
    await c.choice({ q: 'Hangisi bir ölçüm kaydıdır?', options: ['A: 0,047 mgAl/100 g', 'Bütün ürünler zararlıdır.', 'Her kullanım aynı sonucu verir.'], answer: 0,
      hints: ['', 'Bu bir genelleme; ölçüm kaydı değil.', 'Koşul ve veri olmadan sonuç çıkarılamaz.'], right: 'Kaydı yorumdan ayır. Buradaki birim 100 g numune içindir.' });
    c.slider({ label: 'Marinasyon', min: 0, max: 2, value: 0, fmt: (i) => marinasyon[i].ad, onInput: ciz });
    await c.say('Seçilen satırdaki iki niteliği birlikte oku.', { noWait: true });
    await c.cont();
    c.note('<b>Önce veri, sonra yorum.</b><br>A: 0,047 mgAl/100 g', 'Kayıt');
  }
  async function tahmin(c) {
    const svg = c.svg();
    kart(c, svg, 'A · B · C', ['0,047 · 0,125 · 0,058', 'mgAl/100 g numune']);
    await c.say('Üç marinasyondaki birikimi önce sayılardan karşılaştır.');
    await c.choice({ q: 'Hangi marinasyonda alüminyum birikimi daha yüksek?', options: ['A', 'B', 'C'], answer: 1,
      hints: ['0,047, en büyük sayı değil.', '', '0,058, 0,125 değerinden küçük.'], right: 'B. Bu sonuç yalnız verilen koşullar ve numuneler içindir.' });
    svg.replaceChildren();
    await belir(c, cubuklar(c, svg, ['A', 'B', 'C'], [0.047, 0.125, 0.058], { baslik: 'Marinasyona göre birikim', birim: 'mgAl/100 g', kaynak: 'kitap s. 24' }));
    await c.say('Düşük pH gösteren B’de birikim daha yüksek.');
    await c.say('Kitap, sosun asitliğiyle metal geçişini ilişkilendiriyor.');
    c.note('<b>Koşul sonucu etkiler.</b><br>Bu veride: B > C > A', 'Karşılaştırma');
  }
  async function sicaklik(c) {
    const svg = c.svg();
    const ciz = (i) => {
      svg.replaceChildren();
      cubuklar(c, svg, ['150 °C', '200 °C', '250 °C'], marinasyon[i].sicaklik, { baslik: 'Marinasyon ' + marinasyon[i].ad, birim: 'mgAl/100 g', kaynak: 'kitap s. 24', max: 0.154 });
    };
    ciz(0);
    await c.say('Aynı marinasyonda sıcaklık değişince birikim nasıl değişiyor?');
    await c.choice({ q: 'Bu üç sıcaklıkta A marinasyonunun birikimi nasıl değişmiş?', options: ['Artmış', 'Azalmış', 'Değişmemiş'], answer: 0,
      hints: ['', '0,051 → 0,055 → 0,062 artıyor.', 'Sayılar birbirine eşit değil.'], right: 'Artmış. Ara sıcaklıklara ölçüm uydurmuyoruz.' });
    c.slider({ label: 'Marinasyonu seç', min: 0, max: 2, value: 0, fmt: (i) => marinasyon[i].ad, onInput: ciz });
    await c.say('Diğer marinasyonları seç; aynı üç sıcaklığı karşılaştır.', { noWait: true });
    await c.cont();
  }
  async function yorum(c) {
    const svg = c.svg();
    kart(c, svg, 'İddianın dayanağı', ['Kaynak · koşul · ölçüm', 'Hazır veri ≠ gerçek gözlem']);
    await c.say('Kimya bilgisi, ürünün uygun kullanımını değerlendirmeyi sağlar.');
    await c.choice({ q: 'Hangisi bu tablodan desteklenen yorum?', options: ['Her ürün her koşulda zararlıdır.', 'Verilen sıcaklıklarda birikim artmış.', 'Tek veri bütün hastalıkları açıklar.'], answer: 1,
      hints: ['Tablonun kapsamını aşan bir genelleme.', '', 'Tablo hastalık nedeni kanıtlamaz.'], right: 'Kaynaklı ve sınırları belli bir yorum. Sağlık değerlendirmesi ek kanıt ister.' });
    svg.replaceChildren();
    kart(c, svg, 'Sağlık ve ekoloji', ['Uygun kullanım', 'Atık yönetimi', 'Güvenilir bilgi']);
    await c.say('Kullanım ve atık yönetimi, sağlık ve çevreyle ilişkilidir.');
    c.note('<b>Kaynak ve koşul belirtilir.</b><br>Kitap s. 24: hazır veri', 'Güvenilir çıkarım');
  }
  Ders.start({
    id: 'etkilesim-a1', kicker: 'Konu A · Günlük hayatta kimya', title: 'Ürünün işi ve kullanım koşulu', accent: '#f5b04c', back: 'index.html',
    intro: { title: 'Ürünün işi ve kullanım koşulu', hook: 'Aynı alüminyum folyo her yiyecekte aynı sonucu verir mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Ürünleri karşılaştır', goal: 'Ürün türü ve kullanımı ilişkilendir.', run: urun },
      { title: 'Veriyi kaydet', goal: 'Hazır kaydı yorumdan ayır.', run: kayit },
      { title: 'Tahmin ve grafik', goal: 'Miktarları karşılaştır.', run: tahmin },
      { title: 'Koşulu değiştir', goal: 'Kaynaklı sıcaklık verisini yorumla.', run: sicaklik },
      { title: 'Güvenilir yorum', goal: 'Çıkarımın sınırını belirle.', run: yorum },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kitabın A/B/C marinasyon verisinde en yüksek Al miktarı hangisinde?', options: ['A: 0,047', 'B: 0,125', 'C: 0,058'], answer: 1,
        why: ['A değeri daha küçük.', '0,125 mgAl/100 g en büyük değerdir.', 'C değeri B’den küçüktür.'], scene: 2 },
      { q: 'Hangisi verilen tablonun desteklediği çıkarımdır?', options: ['Her koşul aynı miktarı verir.', 'Bütün ürünler aynı işe uygundur.', 'Verilen sıcaklıklarda birikim artmış.'], answer: 2,
        why: ['Koşulların değişimi sonuçla ilişkili.', 'Ürünlerin kullanım amacı farklıdır.', 'Sonuç bu veri ve koşullar için geçerlidir.'], scene: 4 },
    ], summary: ['<b>Ürünün işini ve kullanımını özellikleri belirler.</b>', 'Hazır veriyi oku; kaynak ve koşuluyla yorumla.'],
    nextLesson: { href: 'a2-kimyanin-dallari.html', label: 'Sonraki: Bir bilim, farklı sorular ›' },
  });
})();
