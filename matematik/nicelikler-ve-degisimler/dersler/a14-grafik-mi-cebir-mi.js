/* A14 — Grafik mi, cebir mi?
   Örneklerle kurulan varsayım, karşı örnekle düşmesi, düzeltilmesi ve cebirsel ispatı; hangi yöntem ne zaman.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, kural, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, serit, etiket, adimlar, soruTahtasi } = window.KIT;
  const { ease } = Ders;

  const ORNEK = [[2, 4], [1, 3], [3, 3], [2, -4]];   // h(x) = ax + b; sonuncusu karşı örnek
  const LX = 640;

  /* Düzlem, örnek doğrular (sıfırı ve adıyla), sağda kural listesi ve varsayım kutusu. */
  function kur(svg) {
    const dz = duzlem(svg, { x0: 70, y0: 56, w: 450, h: 450, sayilar: false, xad: '', yad: '' });
    const sol = serit(dz, 'x', -5, 0, { renk: RENK.eksi, op: 0.55 });
    const ornek = ORNEK.map(([a, b], k) => ({
      a, b, d: dogru(dz, a, b, { renk: RENK.g }),
      sifir: nokta(dz, -b / a, 0, { r: 8 }),
      ad: etiket(dz, -b / a, 0, sayi(-b / a), { dx: 14, dy: 27, renk: RENK.sifir }),
      kural: yazi(svg, LX, 112 + k * 46, kural(a, b), { size: 30, hiza: 'start', renk: RENK.g }),
    }));
    const kutu = S('g', {}, svg);
    S('rect', { x: 590, y: 316, width: 370, height: 150, rx: 14, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, kutu);
    yazi(kutu, 612, 350, 'varsayım', { size: 20, kalin: 500, hiza: 'start', renk: RENK.soluk });
    const v1 = yazi(kutu, 775, 396, 'a > 0 ise', { size: 28 }), v2 = yazi(kutu, 775, 438, 'sıfır negatiftir', { size: 28 });
    const cizik = S('line', { x1: 630, y1: 446, x2: 920, y2: 372, stroke: RENK.kotu, 'stroke-width': 5, 'stroke-linecap': 'round' }, kutu);
    return { dz, sol, ornek, kutu, v1, v2, cizik };
  }
  const els = (o) => [o.d.el, o.sifir.el, o.ad, o.kural];

  /* ---- 1. Üç örnek, bir varsayım ---- */
  async function ucOrnek(c) {
    const svg = c.svg(1000, 562);
    const t = kur(svg);
    gizle(t.ornek.flatMap(els), t.sol.el, t.kutu, t.cizik);
    const goster = async (o) => {
      await par(belir(c, o.kural, 300), ciz(c, o.d, 650));
      await pop(c, o.sifir, t.dz.X(-o.b / o.a), t.dz.Y(0), 350); await belir(c, o.ad, 250);
    };
    await par(soyle(c, 'Üç artan doğru çizelim; sıfırlarına bakalım.'), (async () => {
      for (const o of t.ornek.slice(0, 3)) { await goster(o); await c.wait(250); }
    })());
    await par(soyle(c, 'Üçünün sıfırı da eksenin sol yanında: negatif.'), belir(c, t.sol.el, 500, 0.55));
    await par(soyle(c, 'Bu örüntüden bir varsayım kuralım.'), belir(c, t.kutu, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Üç örnek tuttu. Varsayım kesin doğru mu?',
      options: ['Evet, kesin doğru', 'Henüz bilemeyiz'], answer: 1,
      hints: ['Üç örnek tuttu; ama bütün a ve b’leri denemedik.', ''],
      right: 'Örnekler varsayım kurdurur; kanıtlamaz.',
    });
    await soyle(c, 'Varsayımı yeni örneklerle sınamak gerek.');
  }

  /* ---- 2. Kontrol et ---- */
  async function kontrol(c) {
    const svg = c.svg(1000, 562);
    const t = kur(svg), k = t.ornek[3];
    gizle(els(k), t.cizik); t.sol.el.style.opacity = 0.55;
    t.ornek.slice(0, 3).forEach((o) => { o.d.el.style.opacity = 0.45; });

    await par(soyle(c, 'Varsayımı dördüncü bir örnekle sınayalım.'), par(belir(c, k.kural, 300), ciz(c, k.d, 700)));
    await c.choice({
      tag: 'Tahmin et', q: 'h(x) = 2x − 4’ün sıfırı kaç?',
      options: ['−2', '2', '−4'], answer: 1,
      hints: ['2 · (−2) − 4 = −8; sıfır etmiyor.', '', '−4 sabit terim; sıfır için 2x − 4 = 0 çözülür.'],
      right: '2x − 4 = 0 ise x = 2.',
    });
    await par(soyle(c, 'Sıfırı 2: eksenin sağ yanında, pozitif.'), (async () => { await pop(c, k.sifir, t.dz.X(2), t.dz.Y(0)); await belir(c, k.ad, 300); })());
    await par(soyle(c, 'Tek <b>karşı örnek</b> yetti: varsayım düştü.'), ciz(c, t.cizik, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'İlk üç örnekte ortak olup gözden kaçan neydi?',
      options: ['Hepsinde a > 1', 'Hepsinde b > 0', 'Hepsi orijinden geçiyor'], answer: 1,
      hints: ['x + 3’te a = 1; ortak olan bu değil.', '', 'Hiçbiri orijinden geçmiyor; geçseydi b sıfır olurdu.'],
      right: 'Üçünde de sabit terim pozitifti.',
    });
    t.ornek.forEach((o) => yaz(o.kural, [kural(o.a, 0) + ' ', [(o.b > 0 ? '+ ' : '− ') + sayi(Math.abs(o.b)), o.b > 0 ? RENK.arti : RENK.eksi]]));
    await soyle(c, 'İlk üçünde b pozitifti; dördüncüde negatif.');
    await kaybol(c, [t.v1, t.v2, t.cizik, ...t.ornek.map((o) => o.ad)], 300);
    yaz(t.v1, ['a > 0 ', ['ve b > 0', RENK.arti], ' ise']); yaz(t.v2, 'sıfır negatiftir');
    await par(soyle(c, 'Varsayımı düzeltelim: b de pozitif olsun.'), par(belir(c, [t.v1, t.v2], 500), belir(c, k.d.el, 400, 0.3), belir(c, t.ornek.slice(0, 3).map((o) => o.d.el), 400)));
    c.note('Tek <b>karşı örnek</b> varsayımı düşürür.<br>2x − 4: sıfırı 2', 'Karşı örnek', 'a14-karsi');
  }

  /* ---- 3. Cebirle ispat ---- */
  async function ispat(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 50, y0: 150, w: 320, h: 320, sayilar: false, xad: '', yad: '' });
    const ab = (t) => [2 + Math.sin(2 * Math.PI * t), 2.25 + 1.75 * Math.sin(3 * Math.PI * t + 0.5)];
    const [a0, b0] = ab(0);
    const sol = serit(dz, 'x', -5, 0, { renk: RENK.eksi, op: 0.55 });
    const d = dogru(dz, a0, b0, { renk: RENK.g }), z = nokta(dz, -b0 / a0, 0, { r: 8 });
    gizle(sol.el, d.el, z.el);
    yazi(svg, 420, 112, 'a > 0 ve b > 0 ise sıfır negatiftir', { size: 28, hiza: 'start', renk: RENK.soluk });
    const ad = adimlar(svg, { x: 420, y: 232, aralik: 100, size: 38, gerekceX: 290 });
    const s1 = ad.ekle('x = −b/a', 'fonksiyonun sıfırı');
    const s2 = ad.ekle([['b/a', RENK.arti], ' > 0'], 'ikisi pozitif');
    const s3 = ad.ekle([['−b/a', RENK.eksi], ' < 0'], 'hüküm');

    await soyle(c, 'Düzeltilmiş varsayımı bu kez cebirle sınayalım.');
    await par(soyle(c, 'ax + b’nin sıfırını biliyoruz.'), belir(c, s1.g, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'a ve b pozitifse b/a’nın işareti nedir?',
      options: ['Negatif', 'Pozitif', 'Bilinemez'], answer: 1,
      hints: ['İki pozitif sayının bölümü negatif olmaz.', '', 'Sayıları bilmek gerekmez: pozitif bölü pozitif.'],
      right: 'Pozitif bölü pozitif, pozitiftir.',
    });
    await par(soyle(c, 'Pozitif bir sayının pozitife bölümü pozitiftir.'), belir(c, s2.g, 500));
    await par(soyle(c, 'Önüne eksi gelince negatif olur: hüküm çıktı.'), belir(c, s3.g, 500));
    await soyle(c, 'Örnek gerekmedi; ispat bütün pozitif a ve b’leri kapsar.');
    await belir(c, [d.el, z.el], 400); await belir(c, sol.el, 300, 0.55);
    await par(soyle(c, 'Hangi pozitif a ve b’yi seçersen seç, sıfır solda kalır.'),
      c.tween(5600, (e, t) => { const [a, b] = ab(t); d.ayarla(a, b); z.git(-b / a, 0); }, ease.linear));
    c.note('<b>İspatlandı:</b> a &gt; 0 ve b &gt; 0 ise −b/a &lt; 0', 'Sıfırın işareti', 'a14-ispat');
  }

  /* ---- 4. Hangisi ne zaman? ---- */
  async function hangisi(c) {
    const svg = c.svg(1000, 562);
    const tb = soruTahtasi(c, svg, { x: 90, y: 150, w: 820, h: 170, size: 36 });
    const options = ['Grafik ve tablo', 'Tek karşı örnek', 'Cebirsel ispat'];
    await soyle(c, 'Her iş için doğru aracı seç.', { noWait: true });
    await tb.sor('“Bir örüntü arıyorum.”', {
      q: 'Hangi yol işini görür?', options, answer: 0,
      hints: ['', 'Karşı örnek hazır bir önermeyi çürütür; örüntü bulmaz.', 'İspat için önce ispatlanacak bir varsayım gerekir.'],
      right: 'Örnekler örüntüyü gösterir, varsayım kurdurur.', kanit: 'grafik ve tablo fikir verir',
    });
    await tb.sor('“Bir önermeyi çürütmek istiyorum.”', {
      q: 'Hangi yol işini görür?', options, answer: 1,
      hints: ['Çok örnek gerekmez; önermeyi bozan bir tanesi yeter.', '', 'Yanlış önermenin ispatı olmaz; onu bir örnek düşürür.'],
      right: 'Önermeyi bozan tek örnek yeter.', kanit: 'tek karşı örnek yeter',
    });
    await tb.sor('“Her a için doğru mu, emin olmak istiyorum.”', {
      q: 'Hangi yol işini görür?', options, answer: 2,
      hints: ['Grafikler yalnızca çizdiğin örnekleri gösterir.', 'Karşı örnek çürütür; doğrulamaz.', ''],
      right: 'İspat bütün durumları birden kapsar.', kanit: 'cebirsel ispat garanti eder',
    });
    await soyle(c, 'Grafik fikir verir ve hatayı yakalar; ispat genelleştirir.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a14', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Grafik mi, cebir mi?', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Grafik mi, cebir mi?', hook: 'Bir mağaza “indirim hiçbir ürünün fiyatını artırmaz” diyor. <b>Bunu denetlemek için üç fişe mi bakarsın, kurala mı?</b>', button: 'Derse başla ›' },
    goals: ['Örneklerden varsayım kurar, karşı örnekle sınar.', 'Düzeltilmiş varsayımı cebirle ispatlar.', 'Grafik, karşı örnek ve ispatın ne zaman işe yaradığına karar verir.'],
    scenes: [
      { title: 'Üç örnek, bir varsayım', goal: 'Örneklerden bir varsayım kur.', run: ucOrnek },
      { title: 'Kontrol et', goal: 'Varsayımı yeni bir örnekle sına.', run: kontrol },
      { title: 'Cebirle ispat', goal: 'Düzeltilmiş varsayımı ispatla.', run: ispat },
      { title: 'Hangisi ne zaman?', goal: 'İşe uygun yöntemi seç.', run: hangisi },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Üç grafik bir önermeyi destekliyor. Bundan ne çıkar?', options: ['Önerme her zaman doğrudur', 'Önerme bu üç örnekte doğrudur', 'Önerme yanlıştır'], answer: 1,
        why: ['Üç örnek bütün durumları kapsamaz; dördüncüsü bozabilir.', 'Grafikler yalnızca çizilen örnekler için konuşur.', 'Destekleyen örnekler önermeyi çürütmez; karşı örnek çürütür.'], scene: 0 },
      { q: '“∀a &gt; 0 için …” diye başlayan bir önermeden emin olmanın yolu hangisidir?', options: ['On grafik çizmek', 'Büyük bir tablo yapmak', 'Cebirsel ispat'], answer: 2,
        why: ['On grafik on örnektir; a’nın sonsuz değeri var.', 'Tablo ne kadar büyük olsa da sonlu sayıda örnek içerir.', 'İspat bütün a değerlerini birden kapsar.'], scene: 2 },
    ],
    summary: [
      '<b>Grafik gösterir, ispat garanti eder.</b>',
      'Örnekler varsayım kurdurur; tek karşı örnek varsayımı düşürür.',
      'Her durum için emin olmanın yolu cebirsel ispattır.',
    ],
    nextLesson: { href: 'a15-aralikta-en-buyuk-en-kucuk.html', label: 'Sonraki: Bir aralıkta en büyük ve en küçük değer ›' },
  });
})();
