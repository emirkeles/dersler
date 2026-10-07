/* A16 — Parçalı gösterim
   Isıtılan buzun örnek verisi: üç doğru parçası, her aralığın kendi kuralı, süslü parantezli tek yazım.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, ciz, pop, soyle, duzlem, dogru, nokta, iz, etiket, tablo, parcali } = window.KIT;

  /* Örnek veri: t dakika, T sıcaklık (°C). */
  const VERI = [[0, -20], [1, -10], [2, 0], [4, 0], [6, 0], [7, 5], [8, 10]];
  const PARCA = [{ a: 10, b: -20, t1: 0, t2: 2 }, { a: 0, b: 0, t1: 2, t2: 6 }, { a: 5, b: -30, t1: 6, t2: 8 }];
  const SATIR = [['10t − 20', '0 ≤ t < 2'], ['0', '2 ≤ t ≤ 6'], ['5t − 30', '6 < t ≤ 8']];
  const T = (t) => (t < 2 ? 10 * t - 20 : t <= 6 ? 0 : 5 * t - 30);
  const hangi = (t) => (t < 2 ? 0 : t <= 6 ? 1 : 2);

  /* Zaman–sıcaklık düzlemi. sayili: eksen sayıları ve adları yazılsın mı (parçalı yazımın durduğu sahnelerde yazılmaz). */
  function grafik(svg, sayili) {
    const dz = duzlem(svg, {
      x0: 76, y0: 60, w: 378, h: 440, xmin: 0, xmax: 9, ymin: -25, ymax: 15, xadim: 1, yadim: 5, xsayi: 2, ysayi: 10,
      xyaz: (v) => (v === 2 ? '' : sayi(v)), yyaz: (v) => (v === -10 ? '' : sayi(v)), sayilar: sayili, xad: sayili ? 'dk' : '', yad: sayili ? '°C' : '',
    });
    if (sayili) etiket(dz, 2, 0, '2', { dx: 12, dy: 22, size: 17, kalin: 500, renk: RENK.soluk });   // 2'nin yazısı ilk parçanın altında kalmasın
    const parcalar = PARCA.map((p) => dogru(dz, p.a, p.b, { renk: RENK.g, x1: p.t1, x2: p.t2, kalin: 5 }));
    const noktalar = VERI.map(([t, v]) => nokta(dz, t, v, { renk: RENK.g, r: 7 }));
    return { dz, parcalar, noktalar, yak(i) { parcalar.forEach((p, k) => { p.el.style.opacity = i < 0 || k === i ? 1 : 0.3; }); } };
  }
  /* Aralıkların sınırları: t = 2 ve t = 6'da kesik dikmeler. */
  const sinirlar = (dz) => [2, 6].map((t) => S('line', { x1: dz.X(t), y1: dz.y0, x2: dz.X(t), y2: dz.y0 + dz.h, stroke: RENK.soluk, 'stroke-width': 2, 'stroke-dasharray': '5 7', opacity: 0.7 }, dz.arka));

  /* ---- 1. Veriler ---- */
  async function veriler(c) {
    const svg = c.svg(1000, 562);
    const g = grafik(svg, true), dz = g.dz;
    const tb = tablo(svg, { x: 520, y: 200, basliklar: ['dk', '°C'], n: 7, hucre: 52, yuk: 52, basGen: 76, size: 22, renkler: [RENK.soluk, RENK.g] });
    const sutun = VERI.map(([t, v], k) => [tb.yaz(0, k, sayi(t)), tb.yaz(1, k, sayi(v), RENK.g)]);
    const uzanti = dogru(dz, 10, -20, { renk: RENK.soluk, kalin: 3, kesik: true });
    gizle(g.parcalar.map((p) => p.el), g.noktalar.map((n) => n.el), sutun.flat(), uzanti.el);

    await par(soyle(c, 'Buz ısıtılıyor; örnek ölçümler tabloda.'), (async () => { for (const s of sutun) { await belir(c, s, 220); } })());
    await par(soyle(c, 'Her ölçümü düzleme bir nokta olarak koyalım.'), (async () => {
      for (const n of g.noktalar) { await pop(c, n, dz.X(n.x), dz.Y(n.y), 300); await c.wait(100); }
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Bütün noktalar tek bir doğru üzerinde mi?',
      options: ['Evet', 'Hayır'], answer: 1,
      hints: ['İlk üç noktanın doğrusunu uzat: 4. dakikada 20 °C ederdi, tabloda 0.', ''],
      right: 'Sıcaklık 2. dakikadan sonra 0’da kalıyor; tek doğru yetmez.',
    });
    await par(soyle(c, 'İlk üç noktanın doğrusu ötekileri ıskalıyor.'), ciz(c, uzanti, 500));
    await soyle(c, 'Sıcaklık baştan sona aynı hızla yükselmiyor.');
  }

  /* ---- 2. Üç parça ---- */
  async function ucParca(c) {
    const svg = c.svg(1000, 562);
    const g = grafik(svg, true), dz = g.dz;
    const satir = SATIR.map(([k], i) => {
      const sg = S('g', {}, svg), y = 190 + i * 96;
      yazi(sg, 560, y, ['0–2 dk', '2–6 dk', '6–8 dk'][i], { size: 24, kalin: 500, hiza: 'start', renk: RENK.soluk });
      yazi(sg, 700, y, k, { size: 36, kalin: 700, hiza: 'start', renk: RENK.g });
      return sg;
    });
    gizle(g.parcalar.map((p) => p.el), satir);
    const parca = async (i) => { await ciz(c, g.parcalar[i], 700); await belir(c, satir[i], 400); };

    await par(soyle(c, 'İlk 2 dakika: −20’den başlar, dakikada 10 °C yükselir.'), parca(0));
    await par(soyle(c, '2 ile 6 arasında sıcaklık 0’da kalır: sabit fonksiyon.'), parca(1));
    await c.choice({
      tag: 'Tahmin et', q: 'Son parçada sıcaklık dakikada kaç derece yükseliyor?',
      options: ['10 °C', '5 °C', 'Hiç yükselmiyor'], answer: 1,
      hints: ['O ilk parçanın hızı; son parça daha yatık.', '', 'Sıcaklık 6. dakikadan sonra yeniden yükseliyor.'],
      right: '6’dan 8’e 2 dakikada 10 °C: dakikada 5 °C.',
    });
    await par(soyle(c, 'Dakikada 5 °C; 6. dakikada 0 olsun diye 30 çıkar.'), parca(2));
    await soyle(c, 'Tek grafik, üç ayrı kural.');
  }

  /* ---- 3. Tek yazım ---- */
  async function tekYazim(c) {
    const svg = c.svg(1000, 562);
    const g = grafik(svg, false), dz = g.dz; sinirlar(dz);
    const pc = parcali(svg, { x: 470, y: 222, ad: 'T(t) =', satirlar: SATIR, aralik: 62, size: 28, kosulX: 178 });
    const p = nokta(dz, 7, 5, { r: 10 }), izler = iz(dz, 7, 5, { renk: RENK.sifir });
    const bes = etiket(dz, 0, 5, '5', { dx: -14, dy: 8, hiza: 'end', renk: RENK.sifir });
    gizle(pc.g, pc.satir.map((s) => s.g), p.el, izler.g, bes);
    const satir = async (i) => { g.yak(i); await belir(c, pc.satir[i].g, 450); };

    await par(soyle(c, 'Üç kuralı tek fonksiyon olarak yazalım.'), belir(c, pc.g, 500));
    await par(soyle(c, 'Her kuralın yanına geçerli olduğu aralık yazılır.'), (async () => {
      await satir(0); await c.wait(500); await satir(1); await c.wait(500); await satir(2); await c.wait(500); g.yak(-1);
    })());
    await soyle(c, 'Bu yazıma <b>parçalı gösterim</b> denir.');
    await soyle(c, 'Her t yalnızca bir aralığa düşer: tek satır kullanılır.');
    await c.choice({
      tag: 'Tahmin et', q: 'T(7) hangi satırla bulunur?',
      options: ['1. satır: 10t − 20', '2. satır: 0', '3. satır: 5t − 30'], answer: 2,
      hints: ['7, 0 ile 2 arasında değil.', '7, 6’dan büyük; ikinci aralık 6’da biter.', ''],
      right: '6 &lt; 7 ≤ 8: üçüncü satır.',
    });
    pc.yak(2); g.yak(2);
    await par(soyle(c, 't yerine 7 yaz: 5 · 7 − 30 = 5.'), (async () => {
      await pop(c, p, dz.X(7), dz.Y(5)); await belir(c, [izler.g, bes], 400);
    })());
    c.note('<b>Parçalı gösterim:</b> her aralığın kendi kuralı.<br>T(7) = 5 · 7 − 30', 'Parçalı gösterim', 'a16-parcali');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const g = grafik(svg, false), dz = g.dz; sinirlar(dz);
    const pc = parcali(svg, { x: 470, y: 222, ad: 'T(t) =', satirlar: SATIR, aralik: 62, size: 28, kosulX: 178 });
    const izler = iz(dz, 1, T(1), { renk: RENK.sifir }), p = nokta(dz, 1, T(1), { r: 10 });
    const deger = etiket(dz, 0, 0, '', { size: 24, dx: -14, hiza: 'end', renk: RENK.sifir });
    const koy = (t) => {
      const v = T(t), i = hangi(t);
      p.git(t, v); izler.ayarla(t, v); pc.yak(i); g.yak(i);
      yaz(deger, sayi(v)); deger.setAttribute('y', dz.Y(v) + 8);
    };
    await soyle(c, 't’yi değiştir; her an yalnızca bir satır yanar.', { noWait: true });
    c.slider({ label: 't (dakika)', min: 0, max: 8, step: 0.5, value: 1, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a16', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Parçalı gösterim', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Parçalı gösterim', hook: 'Bir buz kütlesini ısıtıyorsun. <b>Sıcaklık baştan sona aynı hızla mı yükselir?</b>', button: 'Derse başla ›' },
    goals: ['Veriyi doğru parçalarıyla modelleyip her parçanın kuralını yazar.', 'Kuralları parçalı gösterimle tek fonksiyon olarak yazar.', 'Bir girdi için doğru satırı seçip değeri hesaplar.'],
    scenes: [
      { title: 'Veriler', goal: 'Noktaların tek doğruya sığmadığını gör.', run: veriler },
      { title: 'Üç parça', goal: 'Her parçanın kuralını yaz.', run: ucParca },
      { title: 'Tek yazım', goal: 'Kuralları aralıklarıyla birleştir.', run: tekYazim },
      { title: 'Dene', goal: 'Girdiye göre doğru satırı seç.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'p(x), x &lt; 1 için x + 4, x ≥ 1 için 2x olsun. p(1) kaçtır?', options: ['5', '2', '7'], answer: 1,
        why: ['5 = 1 + 4, ama ilk kural yalnızca x &lt; 1 için geçerli.', '1 ≥ 1 koşulunu sağlar: ikinci kural, 2 · 1 = 2.', 'İki kuralın sonucu toplanmaz; her girdi tek satıra düşer.'], scene: 2 },
      { q: 'Parçalı gösterimde hangi kuralın kullanılacağını ne belirler?', options: ['Çıktının işareti', 'x’in hangi aralıkta olduğu', 'Hangisi kolaysa'], answer: 1,
        why: ['Çıktı, kural seçildikten sonra bulunur.', 'Önce girdinin aralığına bakılır, sonra o satırın kuralı uygulanır.', 'Seçim serbest değil; her girdinin tek bir satırı var.'], scene: 3 },
    ],
    summary: [
      '<b>Her aralığın kendi kuralı vardır.</b>',
      '<b>Parçalı gösterim</b> tek bir fonksiyondur; her girdi yalnızca bir satırı kullanır.',
      'Önce aralığı bul, sonra o satırın kuralını uygula.',
    ],
    nextLesson: { href: 'b1-mutlak-deger-ile-x.html', label: 'Sonraki: |x| ile f(x) = x ›' },
  });
})();
