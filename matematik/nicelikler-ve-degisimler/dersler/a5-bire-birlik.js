/* A5 — Bire birlik: f(x) = x
   Farklı girdiler farklı çıktı verir; tabloda, grafikte (her yükseklikte tek nokta) ve sembolle.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, sayi, yaz, yazi, par, gizle, belir, kaybol, soyle, duzlem, dogru, nokta, iz, tablo, soruTahtasi } = window.KIT;
  const D = { x0: 70, y0: 50, w: 460, h: 460 };

  /* ---- 1. Aynı numara olur mu? ---- */
  async function ayniNumara(c) {
    const svg = c.svg(1000, 562);
    const tb = tablo(svg, { x: 130, y: 150, basliklar: ['öğrenci', 'okul numarası', 'doğduğu ay'], n: 4, hucre: 130, yuk: 70, basGen: 220, size: 26 });
    const ad = ['Ada', 'Can', 'Ece', 'Mert'], no = ['214', '305', '127', '418'], ay = ['mart', 'ekim', 'mart', 'ocak'];
    ad.forEach((v, k) => tb.yaz(0, k, v));
    const noT = no.map((v, k) => tb.yaz(1, k, v, RENK.f)), ayT = ay.map((v, k) => tb.yaz(2, k, v));
    gizle(noT, ayT);
    await par(soyle(c, 'Dört öğrenci, dört ayrı okul numarası.'), (async () => { for (const t of noT) { await belir(c, t, 250); } })());
    await par(soyle(c, 'Doğdukları ayda ise iki öğrenci aynı: mart.', { ton: 'thoughtful' }), (async () => {
      for (const t of ayT) { await belir(c, t, 250); }
      ayT[0].style.fill = RENK.g; ayT[2].style.fill = RENK.g;
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Hangisini bilince öğrenciyi kesin bulursun?',
      options: ['Doğduğu ayı', 'Okul numarasını'], answer: 1,
      hints: ['“Mart” deyince iki öğrenci çıkıyor: Ada ve Ece.', ''],
      right: 'Her numara tek bir öğrenciye ait.',
    });
    await soyle(c, 'Farklı girdiye hep farklı çıktı: buna <b>bire bir</b> denir.', { dur: true });
    c.note('<b>Bire bir:</b> farklı girdiler farklı çıktı verir.<br>Okul numarası bire birdir', 'Bire birlik', 'a5-tanim');
  }

  /* ---- 2. Tabloda ---- */
  async function tabloda(c) {
    const svg = c.svg(1000, 562);
    const tb = tablo(svg, { x: 180, y: 130, basliklar: ['x', 'f(x)'], n: 6, hucre: 88, yuk: 76, basGen: 112, size: 32, renkler: [RENK.soluk, RENK.f] });
    const xs = [-2, -1, 0, 1, 2];
    xs.forEach((v, k) => { tb.yaz(0, k, sayi(v)); tb.yaz(1, k, sayi(v), RENK.f); });
    const alt = yazi(svg, 500, 380, '', { size: 34, kalin: 700 });
    await soyle(c, 'f(x) = x’in tablosu: alt satırda tekrar eden sayı yok.', { speak: 'f x eşittir x fonksiyonunun tablosu: alt satırda tekrar eden sayı yok.' });
    tb.yaz(0, 5, '?', RENK.sifir); tb.yaz(1, 5, '3', RENK.f);
    await c.choice({
      tag: 'Tahmin et', q: 'Çıktı 3 ise girdi kaç olabilir?',
      options: ['Yalnızca 3', '3 ya da −3', 'Bilinemez'], answer: 0,
      hints: ['', 'f(−3) = −3 olur; 3 değil.', 'f(x) = 3 ise x = 3; başka seçenek yok.'],
      right: 'Çıktı girdinin kendisi.',
    });
    tb.yaz(0, 5, '3', RENK.sifir); yaz(alt, ['f(x) = 3  ise  ', ['x = 3', RENK.sifir]]);
    await soyle(c, 'Her çıktı tek bir girdiden gelir.');
  }

  /* ---- 3. Grafikte ---- */
  async function grafikte(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    dogru(dz, 1, 0);
    const yatay = dogru(dz, 0, 2, { renk: RENK.g, kalin: 3 });
    const izler = iz(dz, 2, 2, { renk: RENK.sifir }), p = nokta(dz, 2, 2, { r: 10 });
    yazi(svg, 610, 150, 'çıktı', { size: 24, renk: RENK.g, hiza: 'start' });
    const cikti = yazi(svg, 610, 200, '', { size: 40, kalin: 700, hiza: 'start' });
    yazi(svg, 610, 310, 'bu çıktıyı veren girdi', { size: 24, renk: RENK.sifir, hiza: 'start' });
    const girdi = yazi(svg, 610, 360, '', { size: 40, kalin: 700, hiza: 'start' });
    const koy = (k) => { yatay.ayarla(0, k); p.git(k, k); izler.ayarla(k, k); yaz(cikti, sayi(k)); yaz(girdi, 'yalnızca ' + sayi(k)); };
    koy(2);
    await soyle(c, 'Yatay çizgi tek bir çıktı değerini gösterir.');
    await soyle(c, 'Çizgiyi gezdir: doğruyu kaç noktada kesiyor?', { noWait: true });
    const sl = c.slider({ label: 'Çıktı', min: -4, max: 4, step: 0.5, value: 2, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
    sl.remove();
    await soyle(c, 'Her yükseklikte tek kesişim: f(x) = x bire birdir.', { speak: 'Her yükseklikte tek kesişim: f x eşittir x fonksiyonu bire birdir.' });
  }

  /* ---- 4. Sembolle ---- */
  async function sembolle(c) {
    const svg = c.svg(1000, 562);
    const sol = yazi(svg, 500, 110, ['x_{1} ≠ x_{2}', ['   ise   ', RENK.soluk], 'f(x_{1}) ≠ f(x_{2})'], { size: 44, kalin: 700 });
    const ornek = yazi(svg, 500, 300, ['2 ≠ 5', ['   ise   ', RENK.soluk], ['f(2) ≠ f(5)', RENK.f]], { size: 40, kalin: 700 });
    const acik = yazi(svg, 500, 360, 'çünkü f(2) = 2 ve f(5) = 5', { size: 26, renk: RENK.soluk });
    gizle(sol, ornek, acik);
    await par(soyle(c, 'Tanımı sembolle yazalım: iki farklı girdi, iki farklı çıktı.'), belir(c, sol, 600));
    await par(soyle(c, 'f(x) = x’te çıktı girdinin kendisi; farklı kalır.', { speak: 'f x eşittir x fonksiyonunda çıktı girdinin kendisi; farklı kalır.' }), (async () => { await belir(c, ornek, 500); await belir(c, acik, 400); })());
    c.note('<b>Bire bir:</b> x<sub>1</sub> ≠ x<sub>2</sub> ise f(x<sub>1</sub>) ≠ f(x<sub>2</sub>)<br>f(x) = x bire birdir', 'Bire birlik, sembolle', 'a5-sembol');
    await kaybol(c, [ornek, acik], 300);
    const tb = soruTahtasi(c, svg, { x: 150, y: 200, w: 700, h: 150 });
    await tb.sor(['f(a) = 7   ve   f(b) = 7'], {
      q: 'f(x) = x için a ile b hakkında ne söylenir?', options: ['a ≠ b olabilir', 'a = b'], answer: 1,
      hints: ['Bire birde aynı çıktı tek bir girdiden gelir.', ''], right: 'İkisi de 7 olmak zorunda.', kanit: 'a = b = 7',
    });
    await tb.sor(['f(x) = −2'], {
      q: 'Çıktı −2 ise girdi kaçtır?', options: ['2', '−2', '2 ya da −2'], answer: 1,
      hints: ['f(2) = 2 olur; −2 değil.', '', '−2’yi veren tek girdi var.'], right: 'Tek girdi: −2.', kanit: 'x = −2',
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a5', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Bire birlik: f(x) = x', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Bire birlik', hook: 'Okulda her öğrenci kendine ait bir numara taşır. <b>İki öğrenci aynı numarayı taşıyabilir mi?</b>', button: 'Derse başla ›' },
    goals: ['Bire birliğin ne demek olduğunu söyler.', 'f(x) = x’in bire bir olduğunu tablo, grafik ve sembolle gösterir.'],
    scenes: [
      { title: 'Aynı numara olur mu?', goal: 'Farklı girdilerin farklı çıktı vermesini tanı.', run: ayniNumara },
      { title: 'Tabloda', goal: 'Tabloda tekrar eden çıktı olmadığını gör.', run: tabloda },
      { title: 'Grafikte', goal: 'Her yükseklikte tek nokta olduğunu gör.', run: grafikte },
      { title: 'Sembolle', goal: 'Bire birliği sembolle yaz ve kullan.', run: sembolle },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'f(x) = x için f(a) = 7 ve f(b) = 7 ise hangisi doğrudur?', options: ['a ≠ b olabilir', 'a = b', 'Bilinemez'], answer: 1,
        why: ['Bire bir fonksiyonda iki farklı girdi aynı çıktıyı vermez.', 'Aynı çıktı tek girdiden gelir: a = b = 7.', 'f bire bir olduğu için bilinir: a = b.'], scene: 3 },
      { q: '<b>Bire birliği</b> hangisi anlatır?', options: ['Her girdinin bir çıktısı vardır', 'Çıktılar girdilerden büyüktür', 'Farklı girdiler farklı çıktı verir'], answer: 2,
        why: ['Bu her fonksiyon için geçerlidir; bire birlik daha fazlasını ister.', 'Bire birlik büyüklükle ilgili değildir.', 'İki farklı girdi hiçbir zaman aynı çıktıyı vermez.'], scene: 0 },
    ],
    summary: [
      '<b>Bire birde iki farklı girdi aynı çıktıyı vermez.</b>',
      'Tabloda çıktı satırında tekrar yoktur; grafikte her yükseklikte tek nokta vardır.',
      'Sembolle: x<sub>1</sub> ≠ x<sub>2</sub> ise f(x<sub>1</sub>) ≠ f(x<sub>2</sub>).',
    ],
    nextLesson: { href: 'a6-dogruyu-kaydirmak.html', label: 'Sonraki: Doğruyu kaydırmak ›' },
  });
})();
