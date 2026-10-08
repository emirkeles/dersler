/* C6 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md ("## C6")
   Yazar notu: içerik MEB Fizik 9 s. 72, 76–78 ve 85'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Renk: A (birinci kuvvet) birinci vektör rengi, B (ikinci kuvvet) ikinci vektör rengi, R bileşke rengi.
   Paraleller kesikli çizilir: A'nın ucundan çıkan çizgi B'nin, B'nin ucundan çıkan çizgi A'nın rengindedir.
   Bileşkenin boyu sayıyla istenmez; karelerden okunur. Uç uca ekleme ile ilişki adlandırılmaz (C9).
   Sahne 5'teki kaydırıcı serbest keşiftir; sahne 6'daki sürükle-bırak adımı animasyon + seçenekle kuruldu. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, yol, belir, sol, kaybol, kay, par, okCiz, izgara } = KIT;
  const { lerp, ease } = Ders;

  /* ---- Derse özel yardımcılar ---- */
  /* Üstü oklu harf: vektörün adı. */
  function harf(c, p, x, y, ad, o = {}) {
    const g = c.S('g', {}, p), s = o.size || 28, renk = o.renk || RENK.yazi, w = s * (ad.length > 1 ? 0.42 : 0.3), yy = -s * 0.9, u = s * 0.15;
    yazi(c, g, 0, 0, ad, { size: s, renk });
    yol(c, g, `M ${-w} ${yy} L ${w} ${yy} M ${w - u} ${yy - u} L ${w} ${yy} L ${w - u} ${yy + u}`, { renk, kalin: Math.max(2, s * 0.08) });
    g.setAttribute('transform', `translate(${x} ${y})`);
    return g;
  }
  /* "R = A + B": parçalar [metin, renk, üstü oklu mu] */
  function esitlik(c, p, x, y, parcalar, o = {}) {
    const g = c.S('g', {}, p), s = o.size || 34, adim = s * 0.95, x0 = x - (parcalar.length - 1) * adim / 2;
    parcalar.forEach(([m, renk, oklu], k) => (oklu ? harf(c, g, x0 + k * adim, y, m, { size: s, renk }) : yazi(c, g, x0 + k * adim, y, m, { size: s, renk })));
    return g;
  }
  /* Kareli düzlemde etiketli ok. Gizli doğar (o.acik değilse), ciz() ile çizilir; etiket oku izler.
     o.ad: vektörün adı (üstü oklu); o.duz: düz yazı. o.yan: 1 okun solunda, -1 sağında; o.yer: 'bas' | 'uc'. */
  function vek(c, iz, kat, i, j, di, dj, o = {}) {
    const v = iz.vektor(i, j, di, dj, { renk: o.renk, kalin: o.kalin, uc: o.uc, katman: kat });
    v.renk = o.renk || RENK.a;
    if (o.ad) {
      const s = o.size || 26, yarim = o.duz ? o.ad.length * s * 0.27 : s * 0.3, koy0 = v.koy;
      v.ad = o.duz ? c.S('g', {}, kat) : harf(c, kat, 0, 0, o.ad, { size: s, renk: v.renk });
      if (o.duz) yazi(c, v.ad, 0, 0, o.ad, { size: s, renk: v.renk });
      const yerlestir = () => {
        const [a, b] = iz.P(v.i, v.j), [d, e] = iz.P(v.i + v.di, v.j + v.dj), L = Math.hypot(d - a, e - b) || 1, ux = (d - a) / L, uy = (e - b) / L;
        const yan = o.yan == null ? 1 : o.yan, uz = o.uzak || 26;
        let x = (a + d) / 2 + uy * uz * yan, y = (b + e) / 2 - ux * uz * yan;
        if (o.yer === 'bas') { x = a - ux * (14 + yarim); y = b - uy * 24; }
        if (o.yer === 'uc') { x = d + ux * (18 + yarim); y = e + uy * 26; }
        v.ad.setAttribute('transform', `translate(${x} ${y + s * (o.duz ? 0.35 : 0.45)})`);
      };
      v.koy = (...args) => { koy0(...args); yerlestir(); };
      yerlestir();
    }
    if (!o.acik) { v.style.opacity = 0; if (v.ad) v.ad.style.opacity = 0; }
    return v;
  }
  const ciz = (c, v, ms = 600) => { v.style.opacity = 1; return par(okCiz(c, v, ms), v.ad ? belir(c, v.ad, ms) : []); };
  /* Oku dönmeden kaydırır (KIT.izgara.tasi); eski yerinde soluk izi kalır. */
  async function tasi(c, iz, v, i2, j2, ms = 1100) {
    const golge = iz.vektor(v.i, v.j, v.di, v.dj, { renk: v.renk, kalin: 4, uc: 14, katman: v.parentNode });
    golge.style.opacity = 0.3; v.parentNode.insertBefore(golge, v);
    await iz.tasi(c, v, i2, j2, { ms });
    return golge;
  }
  const nokta = (c, iz, kat, i, j, bos) => { const [x, y] = iz.P(i, j); return c.S('circle', { cx: x, cy: y, r: bos ? 10 : 7, fill: bos ? 'none' : RENK.vurgu, stroke: RENK.vurgu, 'stroke-width': 3 }, kat); };
  const hat = (c, iz, kat, i1, j1, i2, j2, o = {}) => { const [a, b] = iz.P(i1, j1), [d, e] = iz.P(i2, j2); return cizgi(c, kat, a, b, d, e, { renk: o.renk || RENK.soluk, kalin: o.kalin || 3, kesik: o.kesik }); };
  /* Kareleri tek tek sayan nokta: önce yatay, sonra düşey adımlar. */
  async function kareSay(c, iz, kat, i, j, di, dj) {
    const n = nokta(c, iz, kat, i, j); let x = i, y = j;
    const adim = async (dx, dy) => {
      const x0 = x, y0 = y; x += dx; y += dy;
      await c.tween(220, (e) => { const [a, b] = iz.P(lerp(x0, x, e), lerp(y0, y, e)); n.setAttribute('cx', a); n.setAttribute('cy', b); });
      await c.wait(120);
    };
    for (let k = 0; k < Math.abs(di); k++) await adim(Math.sign(di), 0);
    for (let k = 0; k < Math.abs(dj); k++) await adim(0, Math.sign(dj));
    await kaybol(c, n, 200);
  }
  const tarif = (di, dj) => [di ? Math.abs(di) + (di > 0 ? ' sağ' : ' sol') : '', dj ? Math.abs(dj) + (dj > 0 ? ' yukarı' : ' aşağı') : ''].filter(Boolean).join(', ');
  /* Bir okun kaç kare sağa/sola, yukarı/aşağı gittiğini yazar; istenirse kesikli sayım çizgilerini de çizer. Gizli doğar. */
  function oku(c, iz, kat, i, j, di, dj, o = {}) {
    const g = c.S('g', {}, kat), [a, b] = iz.P(i, j), [d, e] = iz.P(i + di, j + dj), renk = o.renk || RENK.yazi, k = { renk: RENK.soluk, kalin: 3, kesik: '3 8' };
    if (di) {
      if (!o.cizgisiz && !o.yataysiz) cizgi(c, g, a, b, d, b, k);
      yazi(c, g, (a + d) / 2, b + 32, tarif(di, 0), { size: 24, renk });
    }
    if (dj) {
      if (!o.cizgisiz) cizgi(c, g, d, b, d, e, k);
      if (o.dikey === 'sag') yazi(c, g, d + 14, (b + e) / 2 + 8, tarif(0, dj), { size: 24, renk, hiza: 'start' });
      else if (o.dikey === 'sol') yazi(c, g, d - 14, (b + e) / 2 + 8, tarif(0, dj), { size: 24, renk, hiza: 'end' });
      else yazi(c, g, d, dj > 0 ? e - 18 : e + 36, tarif(0, dj), { size: 24, renk });
    }
    g.style.opacity = 0;
    return g;
  }
  const yanSon = (c, els, ms = 1500) => c.tween(ms, (e, t) => { const o = 0.3 + 0.7 * Math.abs(Math.cos(t * Math.PI * 3)); [els].flat().forEach((x) => { x.style.opacity = o; }); }, ease.linear);
  const carpi = (c, p, x, y, s = 16) => yol(c, p, `M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`, { renk: RENK.kotu, kalin: 5 });
  /* Soru; doğru şık seçilince gor() tahtayı günceller ve bitmesi beklenir. */
  async function sor(c, o, gor) {
    let p = null;
    await c.choice({ ...o, onPick: (i, dogru) => { if (dogru && gor) p = gor(); } });
    if (p) await p;
  }
  const duzlem = (c, svg) => izgara(c, svg, { kare: 56, y: 30 });
  const AD = { a: { renk: RENK.a, ad: 'A' }, b: { renk: RENK.b, ad: 'B' }, r: { renk: RENK.r, ad: 'R' } };

  /* Paralelkenar: O = [oi, oj] noktasından çıkan a ve b için uçlardan kesikli paraleller ve kesişme noktası K = O + a + b.
     cizA: A'nın ucundan B'ye paralel; cizB: B'nin ucundan A'ya paralel. ayarla(o, a, b) hepsini anında yerleştirir. */
  function paralel(c, iz, kat, o, a, b) {
    const g = c.S('g', {}, kat), P = iz.P, k = (renk) => { const l = cizgi(c, g, 0, 0, 0, 0, { renk, kalin: 4, kesik: '9 8' }); l.setAttribute('opacity', 0.85); return l; };
    const lA = k(RENK.b), lB = k(RENK.a), kose = nokta(c, iz, g, 0, 0, true);
    const d = { g, lA, lB, kose };
    const koy = (l, bas, son) => { const [x1, y1] = P(...bas), [x2, y2] = P(...son); l.bas = [x1, y1]; l.son = [x2, y2]; ['x1', 'y1', 'x2', 'y2'].forEach((ad, n) => l.setAttribute(ad, [x1, y1, x2, y2][n])); };
    d.ayarla = (o2, a2, b2) => {
      d.K = [o2[0] + a2[0] + b2[0], o2[1] + a2[1] + b2[1]];
      koy(lA, [o2[0] + a2[0], o2[1] + a2[1]], d.K); koy(lB, [o2[0] + b2[0], o2[1] + b2[1]], d.K);
      const [x, y] = P(...d.K); kose.setAttribute('cx', x); kose.setAttribute('cy', y);
    };
    const uzat = (l, ms) => { l.style.opacity = 1; return c.tween(ms, (e) => { l.setAttribute('x2', lerp(l.bas[0], l.son[0], e)); l.setAttribute('y2', lerp(l.bas[1], l.son[1], e)); }); };
    d.cizA = (ms = 1000) => uzat(lA, ms); d.cizB = (ms = 1000) => uzat(lB, ms);
    d.ayarla(o, a, b);
    [lA, lB, kose].forEach((e) => { e.style.opacity = 0; });
    return d;
  }

  /* ---- Derse özel çizimler ---- */
  /* Üstten görünüşte kişi: omuzlar, ipi tutan iki kol, baş. (hx, hy): ipin geldiği yöne birim vektör. */
  const kisiUst = (c, p, x, y, ad, hx, hy) => {
    const nx = -hy * 15, ny = hx * 15, ex = x + hx * 24, ey = y + hy * 24, k = { renk: RENK.yazi, kalin: 4 };
    cizgi(c, p, x + nx, y + ny, ex, ey, k); cizgi(c, p, x - nx, y - ny, ex, ey, k);
    cizgi(c, p, x + nx, y + ny, x - nx, y - ny, { renk: RENK.yazi, kalin: 12 });
    c.S('circle', { cx: x, cy: y, r: 10, fill: RENK.koyu, stroke: RENK.yazi, 'stroke-width': 3 }, p);
    yazi(c, p, x + 32, y + 8, ad, { size: 24, hiza: 'start' });
  };
  /* Sandık (üstten görünüş): ipler O'ya bağlı; Ali A = 4 sağ 1 yukarı, Zeynep B = 1 sağ 3 yukarı yönünde çeker. */
  function sandikSahne(c, iz, kat, oi, oj) {
    const g = c.S('g', {}, kat), [ox, oy] = iz.P(oi, oj), ip = { renk: '#c9a36b', kalin: 3 };
    const ali = iz.P(oi + 4.9, oj + 1.22), zey = iz.P(oi + 1.3, oj + 3.9);
    cizgi(c, g, ox, oy, ...ali, ip); cizgi(c, g, ox, oy, ...zey, ip);
    kutu(c, g, ox - 82, oy - 2, 84, 84, { renk: RENK.mor, rx: 6 });
    yol(c, g, `M ${ox - 72} ${oy + 8} L ${ox - 8} ${oy + 72} M ${ox - 8} ${oy + 8} L ${ox - 72} ${oy + 72}`, { renk: RENK.mor, kalin: 2 });
    const yon = ([px, py]) => { const L = Math.hypot(ox - px, oy - py); return [(ox - px) / L, (oy - py) / L]; };
    kisiUst(c, g, ...ali, 'Ali', ...yon(ali)); kisiUst(c, g, ...zey, 'Zeynep', ...yon(zey));
    const A = vek(c, iz, g, oi, oj, 4, 1, { ...AD.a, yan: -1 }), B = vek(c, iz, g, oi, oj, 1, 3, AD.b);
    const o = nokta(c, iz, g, oi, oj), oAd = yazi(c, g, ox + 4, oy + 36, 'O', { size: 24, renk: RENK.vurgu });
    oAd.style.opacity = 0;
    return { g, A, B, o, oAd };
  }

  /* ---- Sahne 1 · İki ip, bir sandık ---- */
  async function ikiIp(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg);
    let kat = c.S('g', {}, iz.g);
    const A0 = vek(c, iz, kat, 2, 6.5, 3, 0, { renk: RENK.a }), B0 = vek(c, iz, kat, 5, 6.5, 2, 0, { renk: RENK.b }), R0 = vek(c, iz, kat, 2, 5.9, 5, 0, { renk: RENK.r });
    await belir(c, iz.g);
    await ciz(c, A0, 400); await ciz(c, B0, 400);
    await par(c.say('İki vektörün etkisini tek başına yapan vektöre bileşke vektör denir.'), ciz(c, R0, 1000));
    const T = vek(c, iz, kat, 9, 5, 2, 1, { renk: RENK.mor });
    await ciz(c, T, 500);
    await par(c.say('Bir vektör, yönü ve büyüklüğü değişmeden taşınabilir.'), tasi(c, iz, T, 10.5, 2.5, 1700));
    await kaybol(c, kat, 350);

    kat = c.S('g', {}, iz.g);
    const s = sandikSahne(c, iz, kat, 5, 2);
    await belir(c, kat);
    await c.say('Ali ile Zeynep duran bir sandığı iki ayrı iple çekiyor.');
    await c.say('İpler sandığa aynı noktadan bağlı ama farklı yönlere uzanıyor.');
    await ciz(c, s.A, 900);
    await c.say('Ali’nin kuvveti 4 sağ, 1 yukarı giden bir ok.', { speak: 'Ali’nin kuvveti dört sağ, bir yukarı giden bir ok.' });
    await ciz(c, s.B, 900);
    await c.say('Zeynep’in kuvveti 1 sağ, 3 yukarı giden bir ok.', { speak: 'Zeynep’in kuvveti bir sağ, üç yukarı giden bir ok.' });
    await belir(c, s.oAd, 300);
    await par(c.say('İki ok aynı noktadan çıkıyor: iplerin bağlandığı nokta.'), yanSon(c, s.o, 2400));
    await sor(c, { tag: 'Tahmin et', q: 'Sandık hangi yöne gider?', options: ['Ali’nin çektiği yöne', 'İkisinin arasında bir yöne', 'Zeynep’in çektiği yöne'], answer: 1,
      hints: ['Büyük kuvvet tek başına karar vermez. Zeynep’in kuvveti de sandığı kendi yönüne çeker.', '', 'Ali’nin kuvveti yok sayılamaz. İki kuvvet sandığa birlikte etki eder.'],
      right: 'Evet. Sandık iki okun arasında bir yöne kayar.' }, () => kay(c, s.g, 0, 0, 35, -28, 1500));
    await c.say('İki kuvvet birlikte, tek bir bileşke kuvvet gibi etki eder.');
    await c.say('Bileşke iki okun arasında kalır; yerini bulmak için paralelkenar kuracağız.');
  }

  /* ---- Sahne 2 · Dört basamak ---- */
  async function dortBasamak(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg), P = iz.P;
    let kat = c.S('g', {}, iz.g);
    const A = vek(c, iz, kat, 4, 1, 4, 1, { ...AD.a, acik: true }), B = vek(c, iz, kat, 4, 1, 1, 3, { ...AD.b, acik: true });
    const pk = paralel(c, iz, kat, [4, 1], [4, 1], [1, 3]);
    const o = nokta(c, iz, kat, 4, 1);
    const ornek = c.S('path', { d: `M ${P(11, 2)} L ${P(14, 2)} L ${P(15, 4)} L ${P(12, 4)} Z`.replace(/,/g, ' '), fill: 'none', stroke: RENK.mor, 'stroke-width': 4, 'stroke-linejoin': 'round' }, kat);
    await belir(c, iz.g);
    await c.say('Paralelkenar, karşılıklı kenarları paralel olan dörtgendir.');
    await kaybol(c, ornek, 300);
    await par(c.say('Birinci basamak: iki vektörün başlangıç noktaları aynı noktaya getirilir.'), yanSon(c, o, 2400));
    await c.say('Sandıkta oklar zaten aynı noktadan çıkıyor.');
    await c.say('İkinci basamak: her vektörün bitiş noktasından ötekine paralel çizilir.');
    await par(c.say('A’nın ucundan çizilen çizgi B gibi ilerler: 1 sağ, 3 yukarı.', { speak: 'a vektörünün ucundan çizilen çizgi be vektörü gibi ilerler: bir sağ, üç yukarı.' }), (async () => { await kareSay(c, iz, kat, 8, 2, 1, 3); await pk.cizA(); })());
    await par(c.say('B’nin ucundan çizilen çizgi A gibi ilerler: 4 sağ, 1 yukarı.', { speak: 'be vektörünün ucundan çizilen çizgi a vektörü gibi ilerler: dört sağ, bir yukarı.' }), (async () => { await kareSay(c, iz, kat, 5, 4, 4, 1); await pk.cizB(); })());
    const alan = c.S('path', { d: `M ${P(4, 1)} L ${P(8, 2)} L ${P(9, 5)} L ${P(5, 4)} Z`.replace(/,/g, ' '), fill: RENK.r, opacity: 0.12 }, kat);
    kat.insertBefore(alan, kat.firstChild);
    await belir(c, pk.kose, 300);
    await c.say('İki çizgi 5 sağ, 4 yukarıda kesişir; bir paralelkenar oluşur.', { speak: 'İki çizgi beş sağ, dört yukarıda kesişir; bir paralelkenar oluşur.' });
    const R = vek(c, iz, kat, 4, 1, 5, 4, AD.r);
    R.style.opacity = 1;
    await par(c.say('Üçüncü basamak: başlangıç noktasından kesişme noktasına bir vektör çizilir.'), okCiz(c, R, 1500));
    await belir(c, [R.ad, esitlik(c, kat, P(12.8, 0)[0], P(0, 6.2)[1], [['R', RENK.r, 1], ['='], ['A', RENK.a, 1], ['+'], ['B', RENK.b, 1]], { size: 36 })]);
    await c.say('Dördüncü basamak: bu vektör bileşkedir, R ile gösterilir.', { speak: 'Dördüncü basamak: bu vektör bileşkedir, [short pause] re ile gösterilir.' });
    const okuma = oku(c, iz, kat, 4, 1, 5, 4, { dikey: 'sag', renk: RENK.r });
    await kareSay(c, iz, kat, 4, 1, 5, 4);
    await belir(c, okuma, 300);
    await c.say('Karelerden okuyalım: bileşke 5 sağ, 4 yukarı.', { speak: 'Karelerden okuyalım: bileşke beş sağ, dört yukarı.' });
    await kaybol(c, kat, 350);

    kat = c.S('g', {}, iz.g);
    const A2 = vek(c, iz, kat, 5, 2, 3, 0, { ...AD.a, yan: -1 }), B2 = vek(c, iz, kat, 5, 2, 1, 2, AD.b), pk2 = paralel(c, iz, kat, [5, 2], [3, 0], [1, 2]);
    nokta(c, iz, kat, 5, 2);
    const yer = yazi(c, kat, P(9, 4)[0] + 18, P(9, 4)[1] - 14, '4 sağ, 2 yukarı', { size: 24, renk: RENK.vurgu, hiza: 'start' });
    yer.style.opacity = 0;
    await par(ciz(c, A2), ciz(c, B2));
    await sor(c, { tag: 'Uygula', q: 'A: 3 sağ. B: 1 sağ, 2 yukarı. İkisi aynı noktadan çıkıyor. Paraleller başlangıç noktasına göre nerede kesişir?',
      options: ['3 sağ, 2 yukarıda', '4 sağ, 2 yukarıda', '1 sağ, 2 yukarıda'], answer: 1,
      hints: ['A’nın ucundan dik çıktın; çizgi B’ye paralel olmalı. B gibi 1 sağ, 2 yukarı gidilince 4 sağ, 2 yukarıya varılır.', '', 'Bu nokta B’nin ucu. Kesişme noktası, A’nın ucundan B gibi ilerleyerek bulunur.'],
      right: 'Evet. A’nın ucundan B gibi ilerlenir.' }, async () => {
      await kareSay(c, iz, kat, 8, 2, 1, 2);
      await par(pk2.cizA(800), pk2.cizB(800));
      await belir(c, [pk2.kose, yer], 300);
    });
    await c.say('A’nın ucundan B gibi 1 sağ, 2 yukarı gidilince kesişme noktası bulunur.', { speak: 'a vektörünün ucundan be vektörü gibi bir sağ, iki yukarı gidilince kesişme noktası bulunur.' });
    await kaybol(c, kat, 350);
    kat = c.S('g', {}, iz.g);
    const s = sandikSahne(c, iz, kat, 4, 2), pk3 = paralel(c, iz, s.g, [4, 2], [4, 1], [1, 3]), R3 = vek(c, iz, s.g, 4, 2, 5, 4, AD.r);
    [s.A, s.B, s.A.ad, s.B.ad, pk3.lA, pk3.lB].forEach((e) => { e.style.opacity = 1; });
    await belir(c, kat);
    await ciz(c, R3, 1200);
    await par(c.say('Sandık da 5 sağ, 4 yukarı giden bileşkenin yönünde çekilir.', { speak: 'Sandık da beş sağ, dört yukarı giden bileşkenin yönünde çekilir.' }), kay(c, s.g, 0, 0, 39, -31, 2400));
  }

  /* ---- Sahne 3 · Hangi köşegen? ---- */
  async function hangiKosegen(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg);
    let kat = c.S('g', {}, iz.g);
    vek(c, iz, kat, 2, 1, 4, 1, { renk: RENK.a, acik: true }); vek(c, iz, kat, 2, 1, 1, 3, { renk: RENK.b, acik: true });
    const pk0 = paralel(c, iz, kat, [2, 1], [4, 1], [1, 3]);
    [pk0.lA, pk0.lB].forEach((e) => { e.style.opacity = 1; });
    nokta(c, iz, kat, 2, 1);
    const k1 = hat(c, iz, kat, 2, 1, 7, 5, { renk: RENK.yazi }), k2 = hat(c, iz, kat, 6, 2, 3, 4, { renk: RENK.yazi });
    k1.style.opacity = 0; k2.style.opacity = 0;
    await belir(c, iz.g);
    await belir(c, [k1, k2], 500);
    await c.say('Bir paralelkenarın iki köşegeni vardır.');
    await sol(c, k2, 0.2, 300);
    await c.say('Biri başlangıç noktasından kesişme noktasına gider.');
    await par(sol(c, k1, 0.2, 300), belir(c, k2, 300));
    await c.say('Öteki, iki vektörün uçlarını birleştirir.');
    await kaybol(c, kat, 350);

    kat = c.S('g', {}, iz.g);
    const A = vek(c, iz, kat, 8, 1, -2, 2, AD.a), B = vek(c, iz, kat, 8, 1, 2, 2, { ...AD.b, yan: -1 }), pk = paralel(c, iz, kat, [8, 1], [-2, 2], [2, 2]);
    nokta(c, iz, kat, 8, 1);
    await par(ciz(c, A), ciz(c, B));
    await c.say('Yeni çift: A 2 sol, 2 yukarı; B 2 sağ, 2 yukarı.', { speak: 'Yeni çift: a vektörü iki sol, iki yukarı; be vektörü iki sağ, iki yukarı.' });
    await par(pk.cizA(), pk.cizB());
    await belir(c, pk.kose, 300);
    await c.say('Paraleller, başlangıç noktasının 4 kare yukarısında kesişiyor.', { speak: 'Paraleller, başlangıç noktasının dört kare yukarısında kesişiyor.' });
    const d1 = hat(c, iz, kat, 8, 1, 8, 5, { renk: RENK.yazi }), d2 = hat(c, iz, kat, 6, 3, 10, 3, { renk: RENK.yazi });
    await belir(c, [d1, d2], 400);
    const R = vek(c, iz, kat, 8, 1, 0, 4, { ...AD.r, yan: -1 });
    const okuma = yazi(c, kat, iz.P(8, 5)[0], iz.P(8, 5)[1] - 20, '4 yukarı', { size: 24, renk: RENK.r });
    okuma.style.opacity = 0;
    await sor(c, { tag: 'Düşün', q: 'Bileşke hangisidir?',
      options: ['A’nın ucundan B’nin ucuna giden ok: 4 sağ', 'Başlangıç noktasından kesişme noktasına giden ok: 4 yukarı', 'B’nin ucundan A’nın ucuna giden ok: 4 sol'], answer: 1,
      hints: ['Bu, uçları birleştiren öteki köşegen. Bileşke, vektörlerin çıktığı noktadan çıkar.', '', 'Bu da uçları birleştiren köşegen, ters yönde. Bileşke başlangıç noktasından kesişme noktasına gider.'],
      right: 'Evet. Bileşke başlangıç noktasından çıkar.' }, async () => {
      await par(kaybol(c, d2, 400), kaybol(c, d1, 400));
      await ciz(c, R, 1000);
      await belir(c, okuma, 300);
    });
    await c.say('Bileşke, vektörlerin çıktığı noktadan çıkan köşegendir.', { speak: 'Bileşke, [short pause] vektörlerin çıktığı noktadan çıkan köşegendir.' });
    const yatik = [oku(c, iz, kat, 8, 1, -2, 2, { dikey: 'sol', renk: RENK.a }), oku(c, iz, kat, 8, 1, 2, 2, { dikey: 'sag', renk: RENK.b })];
    await belir(c, yatik, 400);
    await c.say('A ne kadar sola yatıksa B o kadar sağa yatık.', { speak: 'a vektörü ne kadar sola yatıksa be vektörü o kadar sağa yatık.' });
    await c.say('Bu yüzden bileşke ikisinin tam ortasında, dümdüz yukarı bakıyor.');
    c.note('<b>Bileşke, paralelkenarın başlangıç noktasından çıkan köşegenidir.</b><br>2 sol 2 yukarı + 2 sağ 2 yukarı → R: 4 yukarı', 'Paralelkenar yöntemi', 'kosegen');
  }

  /* ---- Sahne 4 · Oklar ayrı duruyorsa ---- */
  async function ayriOklar(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg), kat = c.S('g', {}, iz.g);
    const A = vek(c, iz, kat, 8, 1, 3, 0, { ...AD.a, yer: 'uc' }), B = vek(c, iz, kat, 4, 4, -1, 3, AD.b);
    const nA = nokta(c, iz, kat, 8, 1), nB = nokta(c, iz, kat, 4, 4);
    await belir(c, iz.g);
    await par(ciz(c, A), ciz(c, B));
    await c.say('Vektörler her zaman aynı noktadan çıkmış çizilmez.');
    await c.say('Burada A 3 sağ; B ise uzakta, 1 sol, 3 yukarı.', { speak: 'Burada a vektörü üç sağ; be vektörü ise uzakta, bir sol, üç yukarı.' });
    await par(c.say('Paralelkenarın köşesi, iki okun ortak başlangıç noktasıdır.'), yanSon(c, [nA, nB], 2400));
    await c.choice({ tag: 'Düşün', q: 'Oklar ayrı duruyor. Paralelkenar kurmak için ilk iş nedir?',
      options: ['Okların uçlarından hemen paralel çizmek', 'B’yi taşıyıp başlangıcını A’nın başlangıcına getirmek', 'B’yi taşıyıp başlangıcını A’nın ucuna getirmek'], answer: 1,
      hints: ['Başlangıçlar ayrıyken çizgiler bir dörtgen kapatmaz. Önce iki ok aynı noktadan çıkmalıdır.', '', 'Bu, uç uca eklemenin ilk basamağıdır. Paralelkenar yönteminde başlangıçlar birleştirilir.'],
      right: 'Evet. Önce başlangıçlar birleştirilir.' });
    // Yanlış deneme: oklar yerindeyken uçlardan çekilen paraleller dörtgen kapatmaz.
    const yanlis = c.S('g', {}, kat), P = iz.P;
    const y1 = hat(c, iz, yanlis, 11, 1, 11, 1, { renk: RENK.b, kalin: 4, kesik: '9 8' }), y2 = hat(c, iz, yanlis, 3, 7, 3, 7, { renk: RENK.a, kalin: 4, kesik: '9 8' });
    yanlis.setAttribute('opacity', 0.7);
    await c.tween(1200, (e) => {
      y1.setAttribute('x2', lerp(P(11, 1)[0], P(10, 4)[0], e)); y1.setAttribute('y2', lerp(P(11, 1)[1], P(10, 4)[1], e));
      y2.setAttribute('x2', lerp(P(3, 7)[0], P(6, 7)[0], e));
    });
    await belir(c, carpi(c, yanlis, P(8, 5.6)[0], P(8, 5.6)[1], 20), 300);
    await c.say('Başlangıçlar ayrıyken çizilen paraleller bir dörtgen kapatmaz.', { speak: '[thoughtful] Başlangıçlar ayrıyken çizilen paraleller bir dörtgen kapatmaz.' });
    await kaybol(c, [yanlis, nB], 350);
    await par(c.say('B’yi taşırız; yönü ve büyüklüğü yine değişmez.', { speak: 'be vektörünü taşırız; yönü ve büyüklüğü yine değişmez.' }), tasi(c, iz, B, 8, 1, 1800));
    const pk = paralel(c, iz, kat, [8, 1], [3, 0], [-1, 3]);
    await par(c.say('Şimdi A’nın ucundan B’ye, B’nin ucundan A’ya paralel çizelim.', { speak: 'Şimdi a vektörünün ucundan be vektörüne, be vektörünün ucundan a vektörüne paralel çizelim.' }), (async () => { await pk.cizA(1100); await pk.cizB(1100); await belir(c, pk.kose, 300); })());
    const R = vek(c, iz, kat, 8, 1, 2, 3, { ...AD.r, yan: -1 }), okuma = oku(c, iz, kat, 8, 1, 2, 3, { yataysiz: true, renk: RENK.r });
    await sor(c, { tag: 'Uygula', q: 'Bileşke karelerden nasıl okunur?', options: ['4 sol, 3 yukarı', 'Oklar dik olmadığı için paralelkenar kurulamaz', '2 sağ, 3 yukarı'], answer: 2,
      hints: ['Bu, A’nın ucundan B’nin ucuna giden öteki köşegen. Bileşke başlangıç noktasından çıkar.', 'Yöntem okların dik olmasını istemez. A’nın ucundan 1 sol, 3 yukarı gidince paraleller kesişir.', ''],
      right: 'Evet. Başlangıç noktasından kesişme noktasına.' }, async () => {
      await ciz(c, R, 1000);
      await belir(c, okuma, 300);
    });
    await par(c.say('A’nın ucundan 1 sol, 3 yukarı gidince kesişme noktasına varılır.', { speak: 'a vektörünün ucundan bir sol, üç yukarı gidince kesişme noktasına varılır.' }), kareSay(c, iz, kat, 11, 1, -1, 3));
    // A ile B arasındaki geniş açı
    const [ox, oy] = P(8, 1), r = 40, a2 = Math.atan2(3, -1);
    const yay = yol(c, kat, `M ${ox + r} ${oy} A ${r} ${r} 0 0 0 ${ox + r * Math.cos(a2)} ${oy - r * Math.sin(a2)}`, { renk: RENK.vurgu, kalin: 4 });
    await belir(c, yay, 400);
    await c.say('Bu iki okun arası dik değil, geniş; yöntem yine işledi.');
    await c.say('Paralelkenar yöntemi dik, dar ya da geniş açılı her çiftte çalışır.');
  }

  /* ---- Sahne 5 · Büyük kuvvetin yönüne mi? ---- */
  async function buyukKuvvet(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg), P = iz.P;
    let kat = c.S('g', {}, iz.g);
    // Kanca: yatay zemine tutturulmuş, halkası O = (2, 1).
    const [ox, oy] = P(2, 1), zy = oy + 30, kanca = c.S('g', {}, kat);
    cizgi(c, kanca, P(0.3, 0)[0], zy, P(15.7, 0)[0], zy, { renk: RENK.cizgi, kalin: 4 });
    for (let k = 0; k < 14; k++) cizgi(c, kanca, P(0.6 + k * 1.1, 0)[0], zy, P(0.6 + k * 1.1, 0)[0] - 12, zy + 14, { renk: RENK.cizgi, kalin: 2 });
    kutu(c, kanca, ox - 26, zy - 10, 52, 10, { renk: RENK.yazi, rx: 2, kalin: 3 });
    cizgi(c, kanca, ox, zy - 10, ox, oy + 10, { renk: RENK.yazi, kalin: 5 });
    c.S('circle', { cx: ox, cy: oy, r: 10, fill: 'none', stroke: RENK.yazi, 'stroke-width': 5 }, kanca);
    const F1 = vek(c, iz, kat, 2, 1, 5, 1, { renk: RENK.a, ad: 'F₁', yan: -1 }), F2 = vek(c, iz, kat, 2, 1, 1, 5, { renk: RENK.b, ad: 'F₂' });
    const pk = paralel(c, iz, kat, [2, 1], [5, 1], [1, 5]), R = vek(c, iz, kat, 2, 1, 6, 6, { ...AD.r, yan: -1 });
    await belir(c, iz.g);
    await c.say('Zemine tutturulmuş bir kancayı iki iple çekiyoruz.');
    await par(ciz(c, F1, 900), ciz(c, F2, 900));
    await c.say('Birinci kuvvet 5 sağ, 1 yukarı; ikincisi 1 sağ, 5 yukarı.', { speak: 'Birinci kuvvet beş sağ, bir yukarı; ikincisi bir sağ, beş yukarı.' });
    await c.say('İki okun boyu aynı, yönleri farklı.');
    await par(pk.cizA(), pk.cizB());
    await belir(c, pk.kose, 300);
    await ciz(c, R, 1000);
    await c.say('Paralelkenarı kuralım: kesişme noktası 6 sağ, 6 yukarıda.', { speak: 'Paralelkenarı kuralım: kesişme noktası altı sağ, altı yukarıda.' });
    await c.say('Büyüklükleri eşit olduğu için bileşke ikisinin tam ortasından geçiyor.');
    await par(c.say('Kanca bileşkenin yönünde çekilir.'), okCiz(c, R, 1500));
    await kaybol(c, kat, 350);

    // İkinci düzlem: birinci kuvvet 4 sağ; ikinci kuvvet k sağ, 2k yukarı (k = 1, 2, 3).
    kat = c.S('g', {}, iz.g);
    const izler = [1, 2, 3].map((k) => { const v = vek(c, iz, kat, 3, 1, 4 + k, 2 * k, { renk: RENK.r, kalin: 4, uc: 14 }); return v; });
    const G1 = vek(c, iz, kat, 3, 1, 4, 0, { renk: RENK.a, ad: 'F₁', yan: -1 }), G2 = vek(c, iz, kat, 3, 1, 1, 2, { renk: RENK.b, ad: 'F₂' });
    const pk2 = paralel(c, iz, kat, [3, 1], [4, 0], [1, 2]), S = vek(c, iz, kat, 3, 1, 5, 2, { ...AD.r, yan: -1 });
    nokta(c, iz, kat, 3, 1);
    const yazili = yazi(c, kat, P(13, 0)[0], P(0, 1.6)[1], 'R: 5 sağ, 2 yukarı', { size: 26, renk: RENK.r });
    yazili.style.opacity = 0;
    const gorulen = new Set();
    /* Tahtayı ikinci kuvvetin k katına göre anında yerleştirir. */
    const kur = (k) => {
      G2.koy(3, 1, k, 2 * k); S.koy(3, 1, 4 + k, 2 * k); pk2.ayarla([3, 1], [4, 0], [k, 2 * k]);
      if (Number.isInteger(k)) { gorulen.add(k); yazili.textContent = 'R: ' + tarif(4 + k, 2 * k); }
      izler.forEach((v, n) => { v.style.opacity = gorulen.has(n + 1) && n + 1 !== k ? 0.3 : 0; });
    };
    await ciz(c, G1, 800);
    await c.say('Şimdi kuvvetleri değiştirelim: birinci kuvvet 4 sağ olsun.', { speak: 'Şimdi kuvvetleri değiştirelim: birinci kuvvet dört sağ olsun.' });
    await ciz(c, G2, 800);
    await c.say('İkinci kuvvet 1 sağ, 2 yukarı olsun.', { speak: 'İkinci kuvvet bir sağ, iki yukarı olsun.' });
    await par(pk2.cizA(800), pk2.cizB(800));
    await belir(c, pk2.kose, 250);
    await ciz(c, S, 900);
    gorulen.add(1);
    await belir(c, yazili, 300);
    await c.say('Bu durumda bileşke 5 sağ, 2 yukarı.', { speak: 'Bu durumda bileşke beş sağ, iki yukarı.' });
    await sor(c, { tag: 'Tahmin et', q: 'İkinci kuvvet aynı yönde iki katına çıkarsa bileşke nasıl değişir?',
      options: ['Tam ikinci kuvvetin yönüne döner', 'Yönü değişmez, yalnızca uzar', 'İkinci kuvvete doğru yatar'], answer: 2,
      hints: ['Birinci kuvvet hâlâ sağa çekiyor. Bileşke büyüyen kuvvete yaklaşır ama onun yönüne varmaz.', 'Paralelkenarın bir kenarı uzadı; kesişme noktası da köşegen de yer değiştirir.', ''],
      right: 'Evet. Bileşke büyüyen kuvvete doğru yatar.' }, async () => {
      await c.tween(1800, (e) => kur(1 + e));
      kur(2);
    });
    await c.say('İkinci kuvvet 2 sağ, 4 yukarı oldu; bileşke 6 sağ, 4 yukarı.', { speak: 'İkinci kuvvet iki sağ, dört yukarı oldu; bileşke altı sağ, dört yukarı.' });
    await c.say('Bileşke ikinci kuvvete doğru yattı ama onun yönüne varmadı.');
    await c.say('Kaydırıcıyla ikinci kuvveti büyüt, bileşkeyi izle.', { noWait: true });
    const kaydirici = c.slider({ label: 'İkinci kuvvet', min: 1, max: 3, step: 1, value: 2, fmt: (v) => tarif(v, 2 * v), onInput: (v) => kur(v) });
    await c.cont('Devam ›');
    kaydirici.remove();
    await c.say('Cisim büyük kuvvetin yönünde değil, bileşkenin yönünde gider.', { speak: '[thoughtful] Cisim büyük kuvvetin yönünde değil, bileşkenin yönünde gider.' });
    await c.say('Bileşke, büyük olan kuvvete daha yakın durur.');
  }

  /* ---- Sahne 6 · Paralelkenar kurulamayınca ---- */
  async function kurulamayinca(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg), P = iz.P;
    let kat = c.S('g', {}, iz.g);
    const A = vek(c, iz, kat, 3, 6, 3, 0, { ...AD.a, yan: -1 }), B = vek(c, iz, kat, 3, 6.5, 2, 0, AD.b);
    await belir(c, iz.g);
    await par(c.say('Peki iki vektör aynı doğrultudaysa?', { speak: '[curious] Peki iki vektör aynı doğrultudaysa?' }), (async () => { await ciz(c, A, 800); await ciz(c, B, 800); })());
    await c.say('A 3 sağ, B 2 sağ: ikisi aynı doğrunun üzerinde.', { speak: 'a vektörü üç sağ, be vektörü iki sağ: ikisi aynı doğrunun üzerinde.' });
    const p1 = hat(c, iz, kat, 6, 6, 6, 6, { renk: RENK.b, kalin: 4, kesik: '9 8' }), p2 = hat(c, iz, kat, 5, 6.5, 5, 6.5, { renk: RENK.a, kalin: 4, kesik: '9 8' });
    await par(c.say('Paralel çizgiler de aynı doğrunun üstüne düşer; kesişme noktası çıkmaz.'), c.tween(1600, (e) => {
      p1.setAttribute('x2', lerp(P(6, 0)[0], P(9, 0)[0], e)); p2.setAttribute('x2', lerp(P(5, 0)[0], P(9, 0)[0], e));
    }));
    await belir(c, carpi(c, kat, P(10.2, 6.25)[0], P(10.2, 6.25)[1], 18), 300);
    await c.say('Dörtgen oluşmadığı için paralelkenar yöntemi burada kullanılamaz.');
    const A2 = vek(c, iz, kat, 3, 3.6, 3, 0, { ...AD.a, yer: 'bas' }), B2 = vek(c, iz, kat, 9, 4.3, 2, 0, AD.b), R2 = vek(c, iz, kat, 3, 3, 5, 0, { renk: RENK.r, ad: '5 sağ', duz: true, yer: 'uc' });
    await par(c.say('Aynı doğrultuda okları uç uca ekleriz: bileşke 5 sağ.', { speak: 'Aynı doğrultuda okları uç uca ekleriz: bileşke beş sağ.' }), (async () => {
      await par(ciz(c, A2, 500), ciz(c, B2, 500));
      await tasi(c, iz, B2, 6, 3.6, 1200);
      await ciz(c, R2, 900);
    })());
    await c.say('Farklı doğrultudaki her çiftte ise paralelkenar kurulur.');
    await kaybol(c, kat, 350);

    // Dene: okları aynı noktaya taşı, paralelleri çiz, bileşke olan köşegeni seç.
    const maddeler = [
      { o: [5, 2], a: [3, 0], b: [0, 2], bYan: 1, rYan: 1, okuma: { cizgisiz: true },
        q: 'A: 3 sağ. B: 2 yukarı. Bileşke olan köşegen hangisidir?', options: ['3 sol, 2 yukarı', '3 sağ, 2 yukarı', '5 sağ'], answer: 1,
        hints: ['Bu, uçları birleştiren öteki köşegen. Bileşke başlangıç noktasından çıkar.', '', 'Büyüklükler yalnızca aynı yönde toplanır; B yukarı bakıyor.'], right: 'Evet. Başlangıçtan karşı köşeye: 3 sağ, 2 yukarı.' },
      { o: [5, 2], a: [3, 1], b: [1, 2], ayri: [11, 3], bYan: 1, rYer: 'uc', okuma: { dikey: 'sag' },
        q: 'A: 3 sağ, 1 yukarı. B: 1 sağ, 2 yukarı. Bileşke olan köşegen hangisidir?', options: ['4 sağ, 3 yukarı', '2 sol, 1 yukarı', '2 sağ, 1 aşağı'], answer: 0,
        hints: ['', 'Bu, A’nın ucundan B’nin ucuna giden öteki köşegen. Bileşke başlangıç noktasından çıkar.', 'Bu, B’nin ucundan A’nın ucuna giden köşegen. Bileşke başlangıç noktasından çıkar.'], right: 'Evet. Dar açılı çiftte de köşegen bileşkedir.' },
      { o: [7, 2], a: [3, 0], b: [-2, 2], bYan: 1, rYan: 1, okuma: { yataysiz: true },
        q: 'A: 3 sağ. B: 2 sol, 2 yukarı. Bileşke olan köşegen hangisidir?', options: ['5 sol, 2 yukarı', '5 sağ, 2 yukarı', '1 sağ, 2 yukarı'], answer: 2,
        hints: ['Bu, uçları birleştiren öteki köşegen. Bileşke başlangıç noktasından çıkar.', 'B sola yatık; A’nın ucundan 2 sol, 2 yukarı gidilir.', ''], right: 'Evet. Geniş açılı çiftte de yöntem işler.' },
    ];
    await c.say('Paraleller çiziliyor; bileşke olan köşegeni seç.', { noWait: true });
    for (const [n, m] of maddeler.entries()) {
      kat = c.S('g', {}, iz.g);
      const [oi, oj] = m.o, [ai, aj] = m.a, [bi, bj] = m.b, bas = m.ayri || m.o;
      nokta(c, iz, kat, oi, oj);
      const Am = vek(c, iz, kat, oi, oj, ai, aj, { ...AD.a, yer: 'uc' }), Bm = vek(c, iz, kat, bas[0], bas[1], bi, bj, { ...AD.b, yan: m.bYan });
      const pk = paralel(c, iz, kat, m.o, m.a, m.b);
      const d1 = hat(c, iz, kat, oi, oj, ...pk.K, { renk: RENK.yazi }), d2 = hat(c, iz, kat, oi + ai, oj + aj, oi + bi, oj + bj, { renk: RENK.yazi });
      const R = vek(c, iz, kat, oi, oj, ai + bi, aj + bj, { ...AD.r, yan: m.rYan, yer: m.rYer }), okuma = oku(c, iz, kat, oi, oj, ai + bi, aj + bj, { ...m.okuma, renk: RENK.r });
      d1.style.opacity = 0; d2.style.opacity = 0;
      await par(ciz(c, Am), ciz(c, Bm));
      if (m.ayri) await tasi(c, iz, Bm, oi, oj, 1200);
      await par(pk.cizA(800), pk.cizB(800));
      await belir(c, [pk.kose, d1, d2], 300);
      await sor(c, { tag: 'Sıra sende', q: m.q, options: m.options, answer: m.answer, hints: m.hints, right: m.right }, async () => {
        await par(kaybol(c, d2, 300), kaybol(c, d1, 300));
        await ciz(c, R, 900);
        await belir(c, okuma, 300);
      });
      await c.wait(300);
      if (n < maddeler.length - 1) await kaybol(c, kat, 300);
    }
    await c.say('Üç çiftte de basamaklar aynıydı: birleştir, paralel çiz, köşegeni çek.');
    await c.say('Bileşke, paralelkenarın köşegenidir.', { speak: 'Bileşke, [short pause] paralelkenarın köşegenidir.' });
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c6', kicker: 'Konu C · Vektörler', title: 'Paralelkenar yöntemi', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Paralelkenar yöntemi', hook: 'İki kişi bir sandığı iki ayrı iple, farklı yönlere çekiyor; sandık hangi yöne gider?', button: 'Derse başla ›' },
    scenes: [
      { title: 'İki ip, bir sandık', goal: 'Sandığın hangi yöne gideceğini tahmin et.', run: ikiIp },
      { title: 'Dört basamak', goal: 'Paralelkenarı kur, bileşkeyi çiz.', run: dortBasamak },
      { title: 'Hangi köşegen?', goal: 'Bileşke olan köşegeni seç.', run: hangiKosegen },
      { title: 'Oklar ayrı duruyorsa', goal: 'Önce başlangıçları aynı noktaya getir.', run: ayriOklar },
      { title: 'Büyük kuvvetin yönüne mi?', goal: 'Kuvvet büyüdükçe bileşkeyi izle.', run: buyukKuvvet },
      { title: 'Paralelkenar kurulamayınca', goal: 'Yöntemin sınırını gör, üç çifti topla.', run: kurulamayinca },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'A: 3 sağ, 1 aşağı. B: 1 sağ, 2 yukarı. İkisi aynı noktadan çıkıyor ve paralelkenar kurulmuş. Bileşke hangi oktur?',
        options: ['A’nın ucundan B’nin ucuna giden ok: 2 sol, 3 yukarı', 'Başlangıç noktasından karşı köşeye giden ok: 4 sağ, 1 yukarı', 'B’nin ucundan A’nın ucuna giden ok: 2 sağ, 3 aşağı'], answer: 1,
        why: ['Bu, uçları birleştiren öteki köşegen. Bileşke, vektörlerin çıktığı noktadan çıkar.', 'A’nın ucundan B gibi 1 sağ, 2 yukarı gidilir: 4 sağ, 1 yukarı.', 'Bu, uçları birleştiren öteki köşegen. Bileşke, vektörlerin çıktığı noktadan çıkar.'], scene: 2 },
      { q: 'İki kişi bir sandığı farklı yönlere çekiyor; kuvvetlerden biri daha büyük. Sandık hangi yöne gider?',
        options: ['Büyük kuvvetin yönüne', 'Her zaman iki kuvvetin tam ortasına', 'Bileşkenin yönüne; bileşke büyük kuvvete daha yakındır'], answer: 2,
        why: ['Küçük kuvvet de etki eder; bileşke iki okun arasında kalır.', 'Bu yalnızca büyüklükler eşitken olur; biri büyüyünce bileşke ona doğru yatar.', 'Cisim bileşkenin yönünde gider; bileşke büyük kuvvete daha yakın durur.'], scene: 4 },
    ],
    summary: ['<b>Bileşke, paralelkenarın köşegenidir.</b>', 'Oklar aynı noktadan çıkar; uçlardan paraleller çizilir; köşegen başlangıç noktasından çekilir.', 'Cisim büyük kuvvetin değil, bileşkenin yönünde gider.'],
    nextLesson: { href: 'c7-bilesenlerine-ayirma.html', label: 'Sonraki: Bir vektörü bileşenlerine ayırmak ›' },
  });
})();
