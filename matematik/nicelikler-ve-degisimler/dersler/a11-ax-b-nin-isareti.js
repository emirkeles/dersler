/* A11 — ax + b'nin işareti
   Doğrusal fonksiyonun sıfırı x = −b/a, sıfırın iki yanında işaret, işaret tablosu.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, MIN, S, sayi, yaz, yazi, par, gizle, belir, kaybol, pop, soyle, duzlem, dogru, nokta, iz, serit, alan, etiket, isaretTablosu, soruTahtasi } = window.KIT;
  const { lerp, ease } = Ders;

  /* Hesap örneği: h(x) = −20x + 100; x gün, h(x) lira. */
  const PARA = { x0: 90, y0: 56, w: 440, h: 440, xmin: 0, xmax: 8, ymin: -75, ymax: 125, xadim: 1, yadim: 25, xsayi: 2, ysayi: 50, xad: 'gün', yad: 'lira' };
  const h = (x) => -20 * x + 100;
  const KX = 770;   // sağ sütunun ortası

  /* Doğrunun işarete göre boyanmış hâli: üstü yeşil, altı mor, sıfırı sarı. */
  function boyali(dz) {
    const alanY = alan(dz, [[0, 0], [0, 100], [5, 0]], { renk: RENK.arti });
    const alanM = alan(dz, [[5, 0], [8, h(8)], [8, 0]], { renk: RENK.eksi });
    const yesil = dogru(dz, -20, 100, { renk: RENK.arti, x1: 0, x2: 5 });
    const mor = dogru(dz, -20, 100, { renk: RENK.eksi, x1: 5, x2: 8 });
    const sifir = nokta(dz, 5, 0, { r: 9 });
    const bes = etiket(dz, 5, 0, '5', { dy: 27, renk: RENK.sifir });
    return { alanY, alanM, yesil, mor, sifir, bes };
  }

  /* ---- 1. Sıfırı bul ---- */
  async function sifiriBul(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, PARA);
    const d = dogru(dz, -20, 100, { renk: RENK.g, x1: 0, x2: 0 });
    const p = nokta(dz, 0, 100, { renk: RENK.g, r: 9 });
    const sifir = nokta(dz, 5, 0, { r: 9 });
    const bes = etiket(dz, 5, 0, '5', { dy: 27, renk: RENK.sifir });
    yazi(svg, KX, 112, 'h(x) = −20x + 100', { size: 36, kalin: 700, renk: RENK.g });
    const adim1 = yazi(svg, KX, 230, '−20x + 100 = 0', { size: 32 });
    const adim2 = yazi(svg, KX, 296, 'x = 5', { size: 38, kalin: 700, renk: RENK.sifir });
    const genel1 = yazi(svg, KX, 230, 'ax + b = 0', { size: 32 });
    const genel2 = yazi(svg, KX, 296, 'x = −b/a', { size: 38, kalin: 700, renk: RENK.sifir });
    const ornek = yazi(svg, KX, 400, '−100/(−20) = 5', { size: 30, renk: RENK.soluk });
    gizle(p.el, sifir.el, bes, adim1, adim2, genel1, genel2, ornek);
    const yuru = (x0, x1, ms) => c.tween(ms, (e) => { const x = lerp(x0, x1, e); p.git(x, h(x)); d.ayarla(-20, 100, 0, x); }, ease.inOut);

    await par(soyle(c, 'Hesapta 100 lira var; her gün 20 lira azalıyor.'), (async () => {
      await pop(c, p, dz.X(0), dz.Y(100)); await c.wait(300); await yuru(0, 3, 2400);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Hesap hangi gün sıfırlanır?',
      options: ['4. gün', '5. gün', '6. gün'], answer: 1,
      hints: ['4 günde 80 lira gider; 20 lira kalır.', '', '100 lira 5 günde biter; 6. günde hesap ekside.'],
      right: '5 günde 5 · 20 = 100 lira gider.',
    });
    await par(soyle(c, 'Doğru, ekseni 5’te kesiyor: fonksiyonun sıfırı.'), (async () => {
      await yuru(3, 5, 1400); await pop(c, sifir, dz.X(5), dz.Y(0)); await belir(c, bes, 300);
    })());
    await par(soyle(c, 'Sıfırı hesapla da bulursun: kuralı sıfıra eşitle.'), belir(c, adim1, 450));
    await par(soyle(c, 'Denklemi çözünce aynı sayı çıkıyor.'), belir(c, adim2, 450));
    await kaybol(c, [adim1, adim2], 300);
    await par(soyle(c, 'Her doğrusal fonksiyonda yol aynıdır.'), (async () => { await belir(c, genel1, 450); await c.wait(500); await belir(c, genel2, 450); })());
    await par(soyle(c, 'Eksiye dikkat: −100, −20’ye bölünür.'), belir(c, ornek, 450));
    c.note('<b>Sıfır:</b> x = −b/a<br>−20x + 100 → x = 5', 'Doğrunun sıfırı', 'a11-sifir');
  }

  /* ---- 2. Grafikten işaret ---- */
  async function isaret(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, PARA);
    const b = boyali(dz);
    const d = dogru(dz, -20, 100, { renk: RENK.g, x1: 0, x2: 5 });
    yazi(svg, KX, 112, 'h(x) = −20x + 100', { size: 36, kalin: 700, renk: RENK.g });
    const ust = yazi(svg, KX, 226, ['x < 5:  ', ['pozitif', RENK.arti]], { size: 30 });
    const alt = yazi(svg, KX, 282, ['x > 5:  ', ['negatif', RENK.eksi]], { size: 30 });
    const deger = yazi(svg, KX, 420, '', { size: 44, kalin: 700 });
    const p = nokta(dz, 3, h(3), { r: 10 }), izler = iz(dz, 3, h(3));
    gizle(b.alanY.el, b.alanM.el, b.yesil.el, b.mor.el, ust, alt, p.el, izler.g);

    await par(soyle(c, 'Günler geçiyor; doğru eksenin altına iniyor.'),
      c.tween(1800, (e) => d.ayarla(-20, 100, 0, lerp(5, 8, e)), ease.inOut));
    await c.choice({
      tag: 'Tahmin et', q: '7. günde h(7) pozitif mi, negatif mi?',
      options: ['Pozitif', 'Negatif', 'Sıfır'], answer: 1,
      hints: ['Para 5. günde bitti; sonrası eksi bakiye.', '', 'Sıfır yalnızca 5. günde.'],
      right: 'h(7) = −40: eksi bakiye.',
    });
    await par(soyle(c, '5’ten önce doğru eksenin üstünde: para var.'), (async () => {
      await belir(c, [b.yesil.el, b.alanY.el], 500); await belir(c, ust, 400);
    })());
    await par(soyle(c, '5’ten sonra eksenin altında: eksi bakiye.'), (async () => {
      await belir(c, [b.mor.el, b.alanM.el], 500); d.el.style.opacity = 0; await belir(c, alt, 400);
    })());
    await par(soyle(c, 'İşaret tam sıfırda değişiyor.'), pop(c, b.sifir, dz.X(5), dz.Y(0), 600));

    const koy = (x) => {
      const v = h(x), renk = v > 0 ? RENK.arti : v < 0 ? RENK.eksi : RENK.sifir;
      p.git(x, v); p.el.setAttribute('fill', renk); izler.ayarla(x, v);
      yaz(deger, ['h(' + sayi(x) + ') = ', [sayi(v), renk]]);
    };
    koy(3); await belir(c, [p.el, izler.g], 300);
    await soyle(c, 'Günü değiştir; değerin işaretini izle.', { noWait: true });
    c.slider({ label: 'x (gün)', min: 0, max: 8, step: 0.5, value: 3, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
  }

  /* ---- 3. İşaret tablosu ---- */
  async function tabloSahnesi(c) {
    const svg = c.svg(1000, 562);
    const g1 = S('g', {}, svg), g2 = S('g', {}, svg);
    const dz = duzlem(g1, PARA); boyali(dz);
    // ikinci örnek: h(x) = 2x − 6
    const dz2 = duzlem(g2, { x0: 80, y0: 60, w: 440, h: 440, xmin: -2, xmax: 8, ymin: -5, ymax: 5, sayilar: false });
    const d2 = dogru(dz2, 2, -6, { renk: RENK.g });
    const a2m = alan(dz2, [[0.5, 0], [0.5, -5], [3, 0]], { renk: RENK.eksi }), a2y = alan(dz2, [[3, 0], [5.5, 5], [5.5, 0]], { renk: RENK.arti });
    const mor2 = dogru(dz2, 2, -6, { renk: RENK.eksi, x2: 3 }), yesil2 = dogru(dz2, 2, -6, { renk: RENK.arti, x1: 3 });
    const sifir2 = nokta(dz2, 3, 0, { r: 9 });
    etiket(dz2, 3, 0, '3', { dy: 30, dx: 12, renk: RENK.sifir });
    gizle(g2, a2m.el, a2y.el, mor2.el, yesil2.el);

    const TX = 590, TW = 370;
    const bas1 = yazi(svg, TX, 112, 'azalan: −20x + 100', { size: 24, hiza: 'start', renk: RENK.soluk });
    const t1 = isaretTablosu(svg, { x: TX, y: 128, w: TW, kok: '5', sol: '+', sag: MIN });
    const bas2 = yazi(svg, TX, 322, 'artan: 2x − 6', { size: 24, hiza: 'start', renk: RENK.soluk });
    const t2 = isaretTablosu(svg, { x: TX, y: 338, w: TW, kok: '3', sol: MIN, sag: '+' });
    gizle(bas1, t1.g, t1.kok, t1.sol, t1.sifir, t1.sag, bas2, t2.g, t2.sol, t2.sag, t2.sifir);

    await par(soyle(c, 'Grafikteki işaretleri bir tabloya dökelim.'), belir(c, [bas1, t1.g], 500));
    await par(soyle(c, 'Üst satıra fonksiyonun sıfırı yazılır.'), belir(c, [t1.kok, t1.sifir], 450));
    await par(soyle(c, 'Sıfırın solunda fonksiyon pozitif.'), belir(c, t1.sol, 450));
    await par(soyle(c, 'Sağında negatif.'), belir(c, t1.sag, 450));
    await soyle(c, 'Bu tabloya <b>işaret tablosu</b> denir.');

    await kaybol(c, g1, 350);
    await par(soyle(c, 'Şimdi artan bir doğru; sıfırı 3’te.'), (async () => { await belir(c, g2, 450); await belir(c, [bas2, t2.g], 400); })());
    await c.choice({
      tag: 'Tahmin et', q: 'h(x) = 2x − 6 için alt satır hangisi?',
      options: ['+ &nbsp; 0 &nbsp; −', '− &nbsp; 0 &nbsp; +'], answer: 1,
      hints: ['Bu, azalan doğrunun tablosu. Artan doğru soldan alttan gelir.', ''],
      right: 'Artan doğru sıfırın solunda eksenin altında, sağında üstündedir.',
    });
    await par(soyle(c, 'Doğru soldan eksenin altından geliyor: negatif.'), (async () => {
      await belir(c, [mor2.el, a2m.el], 450); await belir(c, t2.sol, 350);
    })());
    await par(soyle(c, 'Sıfırdan sonra eksenin üstüne çıkıyor: pozitif.'), (async () => {
      await belir(c, [yesil2.el, a2y.el], 450); d2.el.style.opacity = 0; await belir(c, [t2.sifir, t2.sag], 350);
    })());
    await pop(c, sifir2, dz2.X(3), dz2.Y(0), 500);
    await soyle(c, 'Artan doğru sağda pozitif, azalan doğru sağda negatiftir.');
    c.note('<b>İşaret tablosu:</b> sıfırın solu ve sağı.<br>2x − 6: − 0 +', 'İşaret tablosu', 'a11-tablo');
  }

  /* ---- 4. Aralıkta ve sıra sende ---- */
  async function aralikta(c) {
    const svg = c.svg(1000, 562);
    const g1 = S('g', {}, svg);
    const dz = duzlem(g1, PARA), b = boyali(dz);
    yazi(g1, KX, 112, 'h(x) = −20x + 100', { size: 36, kalin: 700, renk: RENK.g });
    const sonuc = yazi(g1, KX, 250, ['[0, 4]:  hep ', ['pozitif', RENK.arti]], { size: 30 });
    const tanim = serit(dz, 'x', 0, 8), uc = nokta(dz, 4, h(4), { renk: RENK.arti, r: 9 });
    gizle(sonuc, tanim.el, uc.el);

    await soyle(c, 'Hesabı yalnızca ilk 4 gün izlersen ne değişir?');
    await c.choice({
      tag: 'Tahmin et', q: 'Tanım kümesi [0, 4] olursa h’nin sıfırı olur mu?',
      options: ['Olur: 5', 'Olmaz'], answer: 1,
      hints: ['5, [0, 4] aralığında değil; fonksiyon orada tanımsız.', ''],
      right: '5 aralıkta olmadığı için sıfır da yok.',
    });
    tanim.el.style.opacity = 0.9;
    await par(soyle(c, 'Mor kısım ve sıfır aralığın dışında kaldı.'), (async () => {
      await c.tween(1500, (e) => {
        const x = lerp(8, 4, e), xm = Math.max(x, 5), xy = Math.min(x, 5);
        tanim.ayarla(0, x);
        b.mor.ayarla(-20, 100, 5, xm); b.alanM.ayarla([[5, 0], [xm, h(xm)], [xm, 0]]);
        b.yesil.ayarla(-20, 100, 0, xy); b.alanY.ayarla([[0, 0], [0, 100], [xy, h(xy)], [xy, 0]]);
        b.sifir.el.style.opacity = b.bes.style.opacity = x < 5 ? 0 : 1; b.mor.el.style.opacity = x > 5.02 ? 1 : 0;
      }, ease.inOut);
      await pop(c, uc, dz.X(4), dz.Y(h(4)));
    })());
    await par(soyle(c, 'Bu aralıkta fonksiyon hep pozitif; sıfırı yok.'), belir(c, sonuc, 450));
    await c.wait(500);

    await kaybol(c, g1, 350); g1.remove();
    const tb = soruTahtasi(c, svg, { x: 110, y: 150, w: 780, h: 170 });
    await soyle(c, 'Üç soruda sıfırı ve işareti sen bul.', { noWait: true });
    await tb.sor('h(x) = 3x + 6', {
      q: 'Fonksiyonun sıfırı kaç?', options: ['2', '−2', '6'], answer: 1,
      hints: ['Eksiyi unutma: x = −b/a = −6/3.', '', '6 sabit terim; sıfır için 3x + 6 = 0 çözülür.'],
      right: '3x + 6 = 0 ise x = −2.', kanit: '3x + 6 = 0  →  x = −2',
    });
    await tb.sor('h(x) = 3x + 6', {
      q: 'İşaret tablosunun alt satırı hangisi?', options: ['+ &nbsp; 0 &nbsp; −', '− &nbsp; 0 &nbsp; +'], answer: 1,
      hints: ['a = 3 pozitif: doğru artan, sağda pozitif olur.', ''],
      right: 'Artan doğru: −2’nin solunda negatif, sağında pozitif.', kanit: 'artan:  −  0  +',
    });
    await tb.sor('h(x) = −2x + 8', {
      q: 'Fonksiyon hangi x’lerde pozitif?', options: ['x > 4', 'x < −4', 'x < 4'], answer: 2,
      hints: ['Doğru azalan; sıfırın sağında negatiftir.', 'Sıfırı bul: −2x + 8 = 0 ise x = 4.', ''],
      right: 'Sıfırı 4; azalan doğru sıfırın solunda pozitiftir.', kanit: 'azalan, sıfırı 4:  +  0  −', renk: RENK.iyi,
    });
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a11', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'ax + b’nin işareti', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'ax + b’nin işareti', hook: 'Hesabındaki 100 lira her gün 20 lira azalıyor. <b>Hangi günden sonra eksiye düşersin?</b>', button: 'Derse başla ›' },
    goals: ['ax + b’nin sıfırını x = −b/a ile bulur.', 'Sıfırın iki yanındaki işareti grafikten okur.', 'İşaret tablosu kurar ve yorumlar.'],
    scenes: [
      { title: 'Sıfırı bul', goal: 'Doğrunun ekseni kestiği yeri hesapla bul.', run: sifiriBul },
      { title: 'Grafikten işaret', goal: 'Sıfırın iki yanında işareti oku.', run: isaret },
      { title: 'İşaret tablosu', goal: 'İşaretleri tabloya dök.', run: tabloSahnesi },
      { title: 'Aralıkta ve sıra sende', goal: 'Sıfırı ve işareti kendin bul.', run: aralikta },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'h(x) = 2x − 8’in sıfırı kaçtır?', options: ['−4', '4', '8'], answer: 1,
        why: ['Eksiyi iki kez say: x = −b/a = −(−8)/2 = 4.', '2x − 8 = 0 ise 2x = 8, x = 4.', '8 sabit terimin büyüklüğü; x’in katsayısına bölmek gerekir.'], scene: 0 },
      { q: 'h(x) = −x + 3 hangi x’lerde pozitiftir?', options: ['x > 3', 'x > −3', 'x < 3'], answer: 2,
        why: ['Doğru azalan; sıfırın sağında negatiftir.', 'Sıfır −3 değil 3: −x + 3 = 0 ise x = 3.', 'Sıfırı 3; azalan doğru sıfırın solunda pozitiftir.'], scene: 2 },
    ],
    summary: [
      '<b>Fonksiyon sıfırın iki yanında işaret değiştirir.</b>',
      'ax + b’nin sıfırı x = −b/a’dır.',
      '<b>İşaret tablosu:</b> artan doğruda − 0 +, azalan doğruda + 0 −.',
    ],
    nextLesson: { href: 'a12-artanligin-ispati.html', label: 'Sonraki: Artanlığın ispatı ›' },
  });
})();
