/* E3 · FİZ.9.2.6 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/E-hareketin-temel-kavramlari.md ("## E3")
   Renk rolleri: alınan yol ve sürat = RENK.vurgu (yol rengi), süre = RENK.a. Gösterge ibresi de yol rengindedir.
   Grafik çizilmez; birim dönüştürme yoktur (sahne 2–3 yalnızca m ve s, ötekiler yalnızca km ve h). */
(() => {
  'use strict';
  const { RENK, sayi, par, yazi, kutu, cizgi, daire, yol, belir, kaybol, kart, izgara, tablo, gosterge, araba } = KIT;
  const { lerp, ease } = Ders;
  const YOL = RENK.vurgu, SURE = RENK.a;

  /* ---- Derse özel yardımcılar ---- */
  const gizli = (el) => { [el].flat().forEach((e) => { e.style.opacity = 0; }); return el; };
  const vurgula = (c, el, ms = 800) => {
    const els = [el].flat();
    return c.tween(ms, (e, t) => els.forEach((x) => { x.style.opacity = 1 - 0.75 * Math.sin(Math.PI * t); })).then(() => els.forEach((x) => { x.style.opacity = 1; }));
  };
  /* Tek parça: düz yazı. { t, renk, kalin } */
  function simge(c, p, t, size, renk) {
    const g = c.S('g', {}, p), q = typeof t === 'string' ? { t } : t;
    const el = yazi(c, g, 0, 0, q.t, { size, renk: q.renk || renk, hiza: 'start', kalin: q.kalin });
    return { g, w: el.getComputedTextLength() };
  }
  /* Soldan sağa dizilen satır; { ust, alt } parçası kesir çizer. g.p parçaları tutar (tek tek belirsin diye). */
  function satir(c, p, x, y, parcalar, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 30, ara = o.ara == null ? size * 0.4 : o.ara, renk = o.renk || RENK.yazi;
    let cx = 0; g.p = [];
    parcalar.forEach((pr) => {
      const q = typeof pr === 'string' ? { t: pr } : pr, sg = c.S('g', {}, g);
      let w;
      if (q.ust != null) {
        const u = simge(c, sg, q.ust, size, q.renk || renk), a = simge(c, sg, q.alt, size, q.renk || renk);
        w = Math.max(u.w, a.w) + size * 0.5;
        u.g.setAttribute('transform', `translate(${(w - u.w) / 2} ${-size * 0.62})`);
        a.g.setAttribute('transform', `translate(${(w - a.w) / 2} ${size * 0.72})`);
        cizgi(c, sg, 0, -size * 0.3, w, -size * 0.3, { renk: q.cizgi || RENK.yazi, kalin: 2.5 });
      } else w = simge(c, sg, q, size, renk).w;
      sg.setAttribute('transform', `translate(${cx} 0)`); cx += w + ara; g.p.push(sg);
    });
    const W = cx - ara, sx = o.hiza === 'start' ? x : o.hiza === 'end' ? x - W : x - W / 2;
    g.setAttribute('transform', `translate(${sx} ${y})`); g.w = W;
    return g;
  }
  /* Kronometre: g.yaz(saniye, tur) yazıyı ve ibreyi günceller. */
  function krono(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || SURE;
    daire(c, g, x, y, 17, { renk, kalin: 3 }); kutu(c, g, x - 5, y - 27, 10, 8, { renk, rx: 2, kalin: 2, fill: 'none' });
    const ibre = cizgi(c, g, x, y, x, y - 11, { renk, kalin: 3 });
    const t = yazi(c, g, x + 28, y + 9, '0 s', { size: o.size || 26, renk, hiza: 'start' });
    g.yaz = (v, tur = 0) => {
      t.textContent = Math.round(v) + ' s'; const a = tur * 2 * Math.PI;
      ibre.setAttribute('x2', x + Math.sin(a) * 11); ibre.setAttribute('y2', y - Math.cos(a) * 11);
    };
    return g;
  }
  /* Adım adım çizilen yol (yol rengi). el.git(t) yolun t kadarını gösterir, o noktanın yerini döndürür. */
  function izYol(c, p, d, o = {}) {
    const el = yol(c, p, d, { renk: o.renk || YOL, kalin: o.kalin || 6 }), L = el.getTotalLength();
    el.setAttribute('stroke-dasharray', `${L} ${L}`);
    el.git = (t) => { el.setAttribute('stroke-dashoffset', L * (1 - t)); el.style.visibility = t <= 0 ? 'hidden' : ''; return el.getPointAtLength(L * t); };
    el.git(0);
    return el;
  }
  /* Düz yol şeridi: koyu bant, ortasında kesik çizgi. */
  function yolSeridi(c, p, x0, x1, y, h = 44) {
    const g = c.S('g', {}, p);
    kutu(c, g, x0, y - h / 2, x1 - x0, h, { rx: 6, kalin: 2 });
    cizgi(c, g, x0 + 14, y, x1 - 14, y, { renk: RENK.soluk, kalin: 2, kesik: '14 12' });
    return g;
  }
  /* Dört otoyol (örnek veri): sürat km/h, süre h, alınan yol km. */
  const OTO = { v: [50, 70, 90, 110], t: [0.5, 1.5, 3, 1], x: [25, 105, 270, 110], ad: ['I', 'II', 'III', 'IV'] };
  /* Dört parçalı yol şeridi: parçaların genişliği alınan yolla orantılı. dol(c, i) i. parçayı doldurur. */
  function dortParca(c, p, x0, w, y, h) {
    const g = c.S('g', {}, p), xs = []; let x = x0;
    kutu(c, g, x0, y, w, h, { rx: 6, kalin: 2 });
    const dolgu = OTO.x.map((km) => { const gw = w * km / 510, r = c.S('rect', { x, y: y + 3, width: 0, height: h - 6, fill: YOL, opacity: 0.6 }, g); xs.push([x, gw]); x += gw; return r; });
    xs.slice(1).forEach(([a]) => cizgi(c, g, a, y, a, y + h, { kalin: 2 }));
    const dol = (c2, i, ms = 700) => c2.tween(ms, (e) => dolgu[i].setAttribute('width', xs[i][1] * e));
    const orta = (i) => xs[i][0] + xs[i][1] / 2;
    return { g, dol, orta, dolgu, xs };
  }

  /* ---- Sahne 1 · Gösterge mi, bütün yol mu? ---- */
  async function gostergeMi(c) {
    const svg = c.svg(1000, 562);
    // Ön bilgi: bir yörünge ve uzunluğu
    const on = c.S('g', {}, svg);
    const iz = izYol(c, on, 'M 170 380 C 280 120 430 430 560 260 S 760 150 830 300');
    const nk = c.S('circle', { cx: 170, cy: 380, r: 11, fill: RENK.yazi }, on);
    const onAd = yazi(c, on, 500, 490, 'alınan yol', { size: 32, renk: YOL });
    await par(c.say('Alınan yol, hareket boyunca çizilen yörüngenin uzunluğuydu.'),
      c.tween(3200, (e) => { const q = iz.git(e); nk.setAttribute('cx', q.x); nk.setAttribute('cy', q.y); }));
    onAd.textContent = 'alınan yol: 300 m';
    await c.say('Yönü yoktu; yalnızca sayı ve birimle söyleniyordu.');
    await kaybol(c, on);

    const X0 = 470, X1 = 950, YY = 300, ORTA = (X0 + X1) / 2;
    const yg = gizli(c.S('g', {}, svg));
    yolSeridi(c, yg, X0, X1, YY);
    const car = c.S('g', {}, yg); araba(c, car, 0, 0, { s: 0.85 });
    const koy = (x) => car.setAttribute('transform', `translate(${x} ${YY - 24})`);
    koy(X0 + 40);
    const k90 = yazi(c, yg, ORTA, 205, '90 km', { size: 30, renk: YOL }), s2 = yazi(c, yg, ORTA, 372, '2 h', { size: 30, renk: SURE });
    await belir(c, yg);
    await par(c.say('Bir araba 90 kilometrelik bir yolu tam 2 saatte bitiriyor.', { speak: 'Bir araba doksan kilometrelik bir yolu tam iki saatte bitiriyor.' }), c.tween(3600, (e) => koy(lerp(X0 + 40, X1 - 40, e))));
    const bolen = gizli(cizgi(c, svg, ORTA, YY - 32, ORTA, YY + 32, { renk: RENK.yazi, kalin: 4 }));
    const yari = gizli([X0 + 120, X1 - 120].flatMap((x) => [yazi(c, svg, x, 205, '45 km', { size: 30, renk: YOL }), yazi(c, svg, x, 372, '1 h', { size: 30, renk: SURE })]));
    await kaybol(c, [k90, s2]);
    await belir(c, [bolen, ...yari]);
    await c.say('Yolu saatlere eşit bölersek her saate 45 kilometre düşüyor.', { speak: 'Yolu saatlere eşit bölersek her saate kırk beş kilometre düşüyor.' });
    const gs = gosterge(c, svg, 215, 290, 150, { adim: 30, renk: YOL }); gizli(gs.g);
    await par(belir(c, gs.g), c.tween(900, (e) => koy(lerp(X1 - 40, lerp(X0, X1, 0.7), e))));
    await gs.git(c, 90);
    await c.say('Yolun bir yerinde sürücü göstergeye bakıyor: ibre 90’ı gösteriyor.', { speak: 'Yolun bir yerinde sürücü göstergeye bakıyor: ibre doksanı gösteriyor.' });
    const gVal = gizli(yazi(c, svg, 215, 500, '90 km/h', { size: 34, renk: YOL }));
    await belir(c, gVal);
    await c.say('Göstergedeki birim kilometre bölü saat, yani saatte gidilen kilometre.');
    await c.choice({ tag: 'Tahmin et', q: 'Arabanın sürati hangisi?',
      options: ['Yalnızca 90 km/h; gösterge yanılmaz', 'Yalnızca 45 km/h; gösterge yanlış', 'İkisi de: 90 km/h o anı, 45 km/h bütün yolu anlatır'], answer: 2,
      hints: ['Araba hep 90 km/h ile gitseydi 2 saatte 180 km yol alırdı; oysa 90 km aldı. Gösterge yalnızca bakılan anı söyler.',
        'Gösterge yanlış değil; o an gerçekten 90 km/h ile gidiliyor. 45 km/h ise bütün yolculuğun hesabı.', ''],
      right: 'Evet. İki sayı da doğru; farklı şeyleri anlatıyorlar.' });
    gVal.textContent = 'o an: 90 km/h';
    const tum = gizli(yazi(c, svg, ORTA, 450, 'bütün yol: 45 km/h', { size: 30, renk: YOL }));
    await belir(c, tum);
    await c.say('İki sayı da doğru; biri tek bir anı, öteki bütün yolculuğu anlatıyor.', { speak: '[thoughtful] İki sayı da doğru; biri tek bir anı, öteki bütün yolculuğu anlatıyor.' });
    await c.say('İkisini ayırmak için önce süratin ne olduğuna bakalım.');
  }

  /* ---- Sahne 2 · İki araç, bir ortak yan ---- */
  async function ikiArac(c) {
    const svg = c.svg(1000, 562);
    const kroki = (x0, o) => {
      const g = c.S('g', {}, svg), iz = izgara(c, g, { kare: 50, sutun: 8, satir: 5, x: x0, y: 60 }), pt = (i, j) => iz.P(i, j).join(' ');
      const [ax, ay] = iz.P(...o.a), [bx, by] = iz.P(...o.b);
      const yolEl = izYol(c, g, o.d(pt));
      [[ax, ay], [bx, by]].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 7, fill: RENK.yazi }, g));
      yazi(c, g, ax - 22, ay + 9, o.ad[0], { size: 26 }); yazi(c, g, bx + 22, by + 9, o.ad[1], { size: 26 });
      const nk = c.S('circle', { cx: ax, cy: ay, r: 10, fill: RENK.a, stroke: RENK.yazi, 'stroke-width': 2 }, g);
      const yolAd = gizli(yazi(c, g, x0 + 200, 44, o.metre + ' m', { size: 28, renk: YOL }));
      const kr = krono(c, g, x0 + 160, 348);
      const sonuc = gizli(yazi(c, g, x0 + 200, 425, o.sonuc, { size: 34, renk: YOL }));
      const kos = (ms) => c.tween(ms, (e) => { const q = yolEl.git(e); nk.setAttribute('cx', q.x); nk.setAttribute('cy', q.y); kr.yaz(e * o.sure, e); }, ease.linear).then(() => belir(c, yolAd, 300));
      return { g, sonuc, kos };
    };
    const k1 = kroki(40, { a: [1, 1], b: [7, 3], ad: ['A', 'B'], metre: 240, sure: 40, sonuc: '6 m/s',
      d: (pt) => `M ${pt(1, 1)} C ${pt(2, 5)} ${pt(3.6, 0.2)} ${pt(4.4, 2.4)} S ${pt(6.2, 4.9)} ${pt(7, 3)}` });
    const k2 = kroki(560, { a: [1.5, 3], b: [6.4, 2], ad: ['K', 'L'], metre: 150, sure: 30, sonuc: '5 m/s',
      d: (pt) => `M ${pt(1.5, 3)} C ${pt(2.4, 4.6)} ${pt(3.4, 1)} ${pt(4.4, 2)} S ${pt(5.8, 3.8)} ${pt(6.4, 2)}` });
    gizli(k2.g);
    await par(c.say('Bir araç A’dan B’ye 240 metre yol alıyor; hareketi 40 saniye sürüyor.', { speak: 'Bir araç a noktasından be noktasına iki yüz kırk metre yol alıyor; hareketi kırk saniye sürüyor.' }), k1.kos(3600));
    await belir(c, k1.sonuc);
    await c.say('Bu aracın sürati 6 metre bölü saniye.', { speak: 'Bu aracın sürati altı metre bölü saniye.' });
    await belir(c, k2.g);
    await par(c.say('İkinci araç K’den L’ye 150 metreyi 30 saniyede alıyor.', { speak: 'İkinci araç ke noktasından le noktasına yüz elli metreyi otuz saniyede alıyor.' }), k2.kos(3000));
    await belir(c, k2.sonuc);
    await c.say('Onun sürati 5 metre bölü saniye.', { speak: 'Onun sürati beş metre bölü saniye.' });
    await c.choice({ tag: 'Düşün', q: '6 ve 5 sayıları, yol ve süreden nasıl çıkmış olabilir?',
      options: ['Yoldan süre çıkarılmış', 'Yol süreye bölünmüş', 'Yol ile süre çarpılmış'], answer: 1,
      hints: ['240 − 40 = 200 eder, 6 etmez; metre ile saniye birbirinden çıkarılmaz.', '', '240 × 40 = 9.600 eder; 6 için yolu süreye bölmek gerekir.'],
      right: 'Evet. İki araçta da yol süreye bölündü.' });
    gizli([k1.sonuc, k2.sonuc]); k1.sonuc.textContent = '240 ÷ 40 = 6 m/s'; k2.sonuc.textContent = '150 ÷ 30 = 5 m/s';
    await belir(c, [k1.sonuc, k2.sonuc]);
    await c.say('İki araçta da yol süreye bölündü: 240 ÷ 40 = 6.', { speak: 'İki araçta da yol süreye bölündü: iki yüz kırk bölü kırk eşittir altı.' });
    await par(c.say('Birinci araç her saniyede 6, ikincisi 5 metre yol alıyor.', { speak: 'Birinci araç her saniyede altı, ikincisi beş metre yol alıyor.' }), k1.kos(4000), k2.kos(3000));
    await kaybol(c, [k1.g, k2.g]);
    const orn = gizli(satir(c, svg, 500, 110, [{ ust: { t: '240 m', renk: YOL }, alt: { t: '40 s', renk: SURE } }, '=', { t: '6 m/s', renk: YOL }], { size: 32 }));
    const bir = gizli(yazi(c, svg, 500, 200, '1 saniyede 6 m', { size: 28, renk: RENK.soluk }));
    await belir(c, [orn, bir]);
    await c.say('Hareketlinin birim zamanda aldığı yola sürat denir.', { speak: 'Hareketlinin birim zamanda aldığı yola [short pause] sürat denir.' });
    const model = gizli(satir(c, svg, 500, 320, [{ t: 'sürat', renk: YOL, kalin: 700 }, '=', { ust: { t: 'alınan yol', renk: YOL }, alt: { t: 'zaman', renk: SURE } }], { size: 38 }));
    const sembol = gizli(satir(c, svg, 500, 440, [{ t: 'v', renk: YOL }, '=', { ust: { t: 'x', renk: YOL }, alt: { t: 'Δt', renk: SURE } }], { size: 34 }));
    await belir(c, model); await belir(c, sembol);
    await c.say('Modeli: sürat eşittir alınan yol bölü zaman.');
    const birim = gizli([yazi(c, svg, 400, 530, 'm/s', { size: 30, renk: RENK.soluk }), yazi(c, svg, 600, 530, 'km/h', { size: 30, renk: RENK.soluk })]);
    await belir(c, birim);
    await c.say('Süratin SI birimi metre bölü saniyedir; kilometre bölü saat de kullanılır.', { speak: 'Süratin se i birimi metre bölü saniyedir; kilometre bölü saat de kullanılır.' });
    const sk = gizli(yazi(c, svg, 840, 330, 'skaler', { size: 30, renk: RENK.soluk }));
    await belir(c, sk);
    await c.say('Sürat yön taşımaz; alınan yol gibi skaler bir niceliktir.');
    c.note(`<b>Sürat = ${c.M.frac('alınan yol', 'zaman')}</b> (v = x / Δt); skaler.<br>240 m / 40 s = 6 m/s`, 'Sürat', 'surat');
  }

  /* ---- Sahne 3 · Kim daha süratli? ---- */
  async function kimSuratli(c) {
    const svg = c.svg(1000, 562);
    const t = tablo(c, svg, { x: 40, y: 50, satir: 64, size: 28, sutunlar: [{ ad: 'araç', w: 110 }, { ad: 'alınan yol (m)', w: 230 }, { ad: 'süre (s)', w: 150 }, { ad: 'sürat (m/s)', w: 180 }] });
    const renkler = [RENK.yazi, YOL, SURE, YOL];
    t.satir(['1', '240', '40', '6'], { renkler }); t.satir(['2', '150', '30', '5'], { renkler });
    const r3 = gizli(t.satir(['3', '300', '100', null], { renkler }));
    const [sx, sy] = t.hucre(2, 3), bos = gizli(yazi(c, svg, sx, sy, '?', { size: 28, renk: YOL }));
    const SX = 735, serit = [0, 1, 2].map((i) => c.S('rect', { x: SX, y: t.hucre(i, 0)[1] - 22, width: 0, height: 26, rx: 5, fill: YOL, opacity: 0.75 }, svg));
    const genis = (ws, ms = 900) => { const ilk = serit.map((r) => +r.getAttribute('width')); return c.tween(ms, (e) => serit.forEach((r, i) => r.setAttribute('width', lerp(ilk[i], ws[i], e)))); };
    await c.say('Sürati karşılaştırırken yola da süreye de bakmak gerekir.', { speak: '[thoughtful] Sürati karşılaştırırken yola da süreye de bakmak gerekir.' });
    await belir(c, [r3, bos]);
    await c.say('Üçüncü bir araç 300 metre yol alıyor; hareketi 100 saniye sürüyor.', { speak: 'Üçüncü bir araç üç yüz metre yol alıyor; hareketi yüz saniye sürüyor.' });
    await genis([240, 150, 300].map((m) => m * 0.75));
    await c.say('Aldığı yol, üç aracın en uzunu.');
    await c.choice({ tag: 'Düşün', q: 'Üç araçtan en süratlisi hangisi?',
      options: ['Üçüncü araç; en çok yolu o aldı', 'Birinci araç: 240 m, 40 s', 'İkinci araç; en kısa sürede o bitirdi'], answer: 1,
      hints: ['Çok yol almak yetmez; süreye de bakılır: 300 ÷ 100 = 3 m/s, üçünün en küçüğü.', '', 'Süresi kısa ama yolu da kısa: 150 ÷ 30 = 5 m/s; birinci aracın sürati 6 m/s.'],
      right: 'Evet. Birinci araç saniyede 6 metre yol alıyor.' });
    bos.textContent = '3';
    const hesap = gizli(yazi(c, svg, 375, 400, '300 ÷ 100 = 3', { size: 34 }));
    await belir(c, hesap);
    await c.say('Üçüncü aracın sürati 300 ÷ 100 = 3 metre bölü saniye.', { speak: 'Üçüncü aracın sürati üç yüz bölü yüz eşittir üç metre bölü saniye.' });
    const baslik = gizli(yazi(c, svg, SX + 112, t.y + 64 * 0.66, '1 saniyede', { size: 24, renk: RENK.soluk }));
    await par(c.say('En çok yolu o aldı, ama saniyede en az yolu o alıyor.'),
      (async () => { await c.wait(1500); await kaybol(c, hesap); await par(belir(c, baslik), genis([6, 5, 3].map((v) => v * 30), 1200)); })());
    await c.say('Sürati yol tek başına belirlemez; yol süreye bölünür.');
  }

  /* ---- Sahne 4 · Sürat hep aynı kalmaz ---- */
  async function dortOtoyol(c) {
    const svg = c.svg(1000, 562), KOL = [150, 370, 590, 810];
    const gos = KOL.map((x) => gosterge(c, svg, x, 122, 68, { sayisiz: true, birim: ' ', renk: YOL }));
    const serit = dortParca(c, svg, 70, 820, 335, 40);
    const roma = gizli(KOL.map((x, i) => yazi(c, svg, x, 40, OTO.ad[i], { size: 26, renk: RENK.soluk })));
    const bag = gizli(KOL.map((x, i) => cizgi(c, svg, x, 290, serit.orta(i), 331, { renk: RENK.cizgi, kalin: 2 })));
    const deger = gizli(KOL.map((x, i) => yazi(c, svg, x, 232, String(OTO.v[i]), { size: 30, renk: YOL })));
    const sure = gizli(KOL.map((x, i) => yazi(c, svg, x, 276, sayi(OTO.t[i]), { size: 28, renk: SURE })));
    const yolAd = gizli(KOL.map((_, i) => yazi(c, svg, serit.orta(i), 412, String(OTO.x[i]), { size: 28, renk: YOL })));
    const bKmh = gizli(yazi(c, svg, 940, 232, 'km/h', { size: 24, renk: RENK.soluk })), bH = gizli(yazi(c, svg, 940, 276, 'h', { size: 24, renk: RENK.soluk })), bKm = gizli(yazi(c, svg, 940, 412, 'km', { size: 24, renk: RENK.soluk }));
    const dol = (i) => par(serit.dol(c, i), belir(c, i ? yolAd[i] : [yolAd[i], bKm]));
    await c.say('Uzun bir yolculukta araç hep aynı süratle gitmez.');
    await belir(c, [...roma, ...bag]);
    await c.say('Bir araç art arda dört otoyoldan geçiyor; her birinde sürati sabit.');
    await belir(c, bKmh, 200);
    for (let i = 0; i < 4; i++) await par(gos[i].git(c, OTO.v[i], 600), belir(c, deger[i], 600));
    await c.say('Göstergeler sırayla 50, 70, 90 ve 110 kilometre bölü saati gösteriyor.', { speak: 'Göstergeler sırayla elli, yetmiş, doksan ve yüz on kilometre bölü saati gösteriyor.' });
    await belir(c, [sure[0], sure[1], bH]);
    await c.say('Birinci otoyolda yarım saat, ikincide bir buçuk saat gidiyor.');
    await belir(c, [sure[2], sure[3]]);
    await c.say('Üçüncüde 3 saat, dördüncüde 1 saat.', { speak: 'Üçüncüde üç saat, dördüncüde bir saat.' });
    const model = gizli(satir(c, svg, 500, 500, [{ t: 'yol', renk: YOL }, '=', { t: 'sürat', renk: YOL }, '×', { t: 'zaman', renk: SURE }], { size: 36 }));
    await belir(c, model);
    await c.say('Sürat yol bölü zaman olduğuna göre yol, sürat çarpı zamandır.');
    await dol(0);
    await c.say('Birinci otoyolda 50 × 0,5 = 25 kilometre yol alır.', { speak: 'Birinci otoyolda elli çarpı sıfır virgül beş eşittir yirmi beş kilometre yol alır.' });
    await dol(1);
    await c.say('İkincide 70 × 1,5 = 105 kilometre.', { speak: 'İkincide yetmiş çarpı bir virgül beş eşittir yüz beş kilometre.' });
    await c.choice({ tag: 'Uygula', q: 'Üçüncü otoyolda 90 km/h ile 3 saat giden araç kaç kilometre yol alır?', options: ['30 km', '93 km', '270 km'], answer: 2,
      hints: ['90’ı 3’e bölmek yolu vermez; her saatte 90 km alan araç 3 saatte 90 × 3 = 270 km alır.', 'Sürat ile süre toplanmaz, çarpılır: 90 × 3 = 270 km.', ''],
      right: 'Evet. 90 × 3 = 270 km.' });
    await dol(2);
    await c.say('Her saatte 90 kilometre, 3 saatte 270 kilometre eder.', { speak: 'Her saatte doksan kilometre, üç saatte iki yüz yetmiş kilometre eder.' });
    await dol(3);
    await c.say('Dördüncü otoyolda 110 × 1 = 110 kilometre.', { speak: 'Dördüncü otoyolda yüz on çarpı bir eşittir yüz on kilometre.' });
  }

  /* ---- Sahne 5 · Ortalama sürat ---- */
  async function ortalama(c) {
    const svg = c.svg(1000, 562);
    const serit = dortParca(c, svg, 60, 640, 50, 40); serit.dolgu.forEach((r, i) => r.setAttribute('width', serit.xs[i][1]));
    const ust = c.S('g', {}, svg), ara = (i) => (serit.orta(i) + serit.orta(i + 1)) / 2;
    OTO.x.forEach((km, i) => yazi(c, ust, serit.orta(i), 126, String(km), { size: 26, renk: YOL }));
    const t1 = gizli([...[0, 1, 2].map((i) => yazi(c, ust, ara(i), 126, '+', { size: 26, renk: RENK.soluk })), yazi(c, ust, 716, 126, '= 510 km', { size: 28, renk: YOL, hiza: 'start' })]);
    const t2 = gizli([...OTO.t.map((h, i) => yazi(c, ust, serit.orta(i), 170, sayi(h), { size: 26, renk: SURE })),
      ...[0, 1, 2].map((i) => yazi(c, ust, ara(i), 170, '+', { size: 26, renk: RENK.soluk })), yazi(c, ust, 716, 170, '= 6 h', { size: 28, renk: SURE, hiza: 'start' })]);
    await c.say('Bütün yolculuğu tek bir süratle anlatmak istiyoruz.');
    await belir(c, t1);
    await c.say('Toplam yol: 25 + 105 + 270 + 110 = 510 kilometre.', { speak: 'Toplam yol: yirmi beş artı yüz beş artı iki yüz yetmiş artı yüz on eşittir beş yüz on kilometre.' });
    await belir(c, t2);
    await c.say('Toplam süre: 0,5 + 1,5 + 3 + 1 = 6 saat.', { speak: 'Toplam süre: sıfır virgül beş artı bir virgül beş artı üç artı bir eşittir altı saat.' });
    await kaybol(c, ust);
    const kesir = satir(c, svg, 500, 285, [{ ust: { t: '510 km', renk: YOL }, alt: { t: '6 h', renk: SURE } }, '=', { t: '85 km/h', renk: YOL, kalin: 700 }], { size: 36 });
    gizli(kesir.p);
    await belir(c, kesir.p[0]); await belir(c, [kesir.p[1], kesir.p[2]]);
    await c.say('Toplam yolu toplam süreye bölelim: 510 ÷ 6 = 85.', { speak: 'Toplam yolu toplam süreye bölelim: beş yüz on bölü altı eşittir seksen beş.' });
    await par(c.say('Aracın ortalama sürati 85 kilometre bölü saattir.', { speak: 'Aracın ortalama sürati seksen beş kilometre bölü saattir.' }), vurgula(c, kesir.p[2], 1200));
    const model = gizli(satir(c, svg, 500, 420, [{ t: 'ortalama sürat', renk: YOL }, '=', { ust: { t: 'alınan toplam yol', renk: YOL }, alt: { t: 'hareket süresi', renk: SURE } }], { size: 30 }));
    await belir(c, model);
    await c.say('Alınan toplam yolun hareket süresine oranına ortalama sürat denir.');
    const sk = gizli(yazi(c, svg, 500, 520, 'skaler', { size: 28, renk: RENK.soluk }));
    await belir(c, sk);
    await c.say('Ortalama sürat de skalerdir; yön taşımaz.');
    // Aynı uzunlukta ikinci şerit: 6 eş parça, her saatte 85 km
    const esG = c.S('g', {}, svg), PW = 640 / 6;
    kutu(c, esG, 60, 120, 640, 40, { rx: 6, kalin: 2 });
    const es = [0, 1, 2, 3, 4, 5].map((i) => {
      const g = gizli(c.S('g', {}, esG));
      c.S('rect', { x: 60 + i * PW + 2, y: 123, width: PW - 4, height: 34, fill: YOL, opacity: 0.25 }, g);
      yazi(c, g, 60 + i * PW + PW / 2, 149, '85', { size: 24 });
      return g;
    });
    for (let i = 1; i < 6; i++) cizgi(c, esG, 60 + i * PW, 120, 60 + i * PW, 160, { kalin: 2 });
    const esKm = gizli(yazi(c, esG, 716, 149, 'km', { size: 24, renk: RENK.soluk, hiza: 'start' }));
    gizli(esG); await belir(c, esG, 300);
    for (const g of es) await belir(c, g, 220);
    await belir(c, esKm, 200);
    await c.say('Araç hep 85 ile gitseydi 6 saatte yine 510 kilometre alırdı.', { speak: 'Araç hep seksen beş ile gitseydi altı saatte yine beş yüz on kilometre alırdı.' });
    // Tır sorusu
    await kaybol(c, [...svg.children]);
    const tg = gizli(c.S('g', {}, svg)), TX = 170, TW = 690, a = TW / 3;
    kutu(c, tg, TX, 230, TW, 44, { rx: 6, kalin: 2 }); cizgi(c, tg, TX + a, 230, TX + a, 274, { kalin: 2 });
    kutu(c, tg, 62, 226, 58, 40, { renk: RENK.a, rx: 4 }); kutu(c, tg, 122, 240, 28, 26, { renk: RENK.a, rx: 4 });
    daire(c, tg, 80, 270, 8, { renk: RENK.a, fill: RENK.koyu }); daire(c, tg, 134, 270, 8, { renk: RENK.a, fill: RENK.koyu });
    yazi(c, tg, TX + a / 2, 210, '120 km', { size: 28, renk: YOL }); yazi(c, tg, TX + a * 2, 210, '240 km', { size: 28, renk: YOL });
    yazi(c, tg, TX + a / 2, 314, '2 h', { size: 28, renk: SURE }); yazi(c, tg, TX + a * 2, 314, '3 h', { size: 28, renk: SURE });
    await belir(c, tg);
    await c.choice({ tag: 'Uygula', q: 'Bir tır önce 2 saatte 120 km, sonra 3 saatte 240 km yol alıyor. Ortalama sürati kaç km/h?', options: ['70 km/h', '72 km/h', '360 km/h'], answer: 1,
      hints: ['60 ile 80’in ortası 70 eder, ama tır 80 km/h ile daha uzun süre gitti. Toplam yol 360 km, süre 5 h: 360 ÷ 5 = 72 km/h.', '',
        '360, toplam yolun kilometresi; sürat için bunu toplam süreye, 5 saate bölmek gerekir.'],
      right: 'Evet. Toplam yol toplam süreye bölünür.' });
    const tk = gizli(satir(c, svg, 500, 440, [{ ust: { t: '360 km', renk: YOL }, alt: { t: '5 h', renk: SURE } }, '=', { t: '72 km/h', renk: YOL, kalin: 700 }], { size: 36 }));
    await belir(c, tk);
    await c.say('360 kilometre 5 saatte alındı: 360 ÷ 5 = 72.', { speak: 'Üç yüz altmış kilometre beş saatte alındı: üç yüz altmış bölü beş eşittir yetmiş iki.' });
    c.note(`<b>Ortalama sürat = ${c.M.frac('alınan toplam yol', 'hareket süresi')}</b><br>510 km / 6 h = 85 km/h`, 'Ortalama sürat', 'ortalama-surat');
  }

  /* ---- Sahne 6 · Ortalama sürat, süratlerin ortalaması değildir ---- */
  async function ortalamaDegil(c) {
    const svg = c.svg(1000, 562), ilk = c.S('g', {}, svg);
    const hes = satir(c, ilk, 500, 100, ['(', '50', '+', '70', '+', '90', '+', '110', ')', '÷', '4', '=', '80'].map((t, i) => ({ t, renk: [1, 3, 5, 7].includes(i) ? YOL : RENK.yazi })), { size: 36, ara: 12 });
    const islem = gizli(hes.p.filter((_, i) => ![1, 3, 5, 7].includes(i)));
    await c.say('Dört süratin ortalamasını alsak ne çıkar?', { speak: '[curious] Dört süratin ortalamasını alsak ne çıkar?' });
    await belir(c, islem);
    await c.say('50, 70, 90 ve 110’u toplayıp dörde bölünce 80 eder.', { speak: 'Elli, yetmiş, doksan ve yüz onu toplayıp dörde bölünce seksen eder.' });
    const k85 = gizli(kart(c, ilk, 330, 160, 340, 60, 'ortalama sürat: 85', { renk: YOL, size: 30, yaziRenk: YOL }));
    await belir(c, k85);
    await c.say('Oysa ortalama sürat 85 çıkmıştı.', { speak: 'Oysa ortalama sürat seksen beş çıkmıştı.' });
    await kaybol(c, ilk);
    const ozet = gizli([yazi(c, svg, 270, 76, 'süratlerin ortalaması: 80', { size: 28, renk: RENK.soluk }), yazi(c, svg, 740, 76, 'ortalama sürat: 85', { size: 28, renk: YOL })]);
    // 6 saatlik zaman şeridi: dilim genişliği süreyle orantılı
    const zg = gizli(c.S('g', {}, svg)), ZX = 80, ZW = 840; let zx = ZX;
    kutu(c, zg, ZX, 190, ZW, 64, { rx: 6, kalin: 2 });
    const dilim = OTO.t.map((h, i) => {
      const w = ZW * h / 6, r = c.S('rect', { x: zx + 2, y: 193, width: w - 4, height: 58, fill: YOL, opacity: 0.18 }, zg);
      if (i) cizgi(c, zg, zx, 190, zx, 254, { kalin: 2 });
      yazi(c, zg, zx + w / 2, 232, String(OTO.v[i]), { size: 28 }); yazi(c, zg, zx + w / 2, 292, sayi(h) + ' h', { size: 24, renk: SURE });
      zx += w; return r;
    });
    await belir(c, [...ozet, zg]);
    await c.say('Çünkü araç dört süratle eşit süre gitmedi.', { speak: '[thoughtful] Çünkü araç dört süratle eşit süre gitmedi.' });
    await c.tween(600, (e) => { dilim[2].setAttribute('opacity', lerp(0.18, 0.6, e)); });
    await c.say('6 saatin 3’ünde 90 ile gitti; yalnızca yarım saat 50 ile.', { speak: 'Altı saatin üçünde doksan ile gitti; yalnızca yarım saat elli ile.' });
    await c.say('Uzun süre gidilen süratin ortalamadaki payı daha büyüktür.');
    await c.say('Bu yüzden süratleri değil, yolları ve süreleri toplarız.');

    // Dene: iki bölümlü yolculuk. Önce tahmin, sonra hesap adım adım; en sonda serbest keşif.
    await kaybol(c, [...svg.children]);
    const B = { x0: 100, w: 800, y: 60, h: 64 }, dg = gizli(c.S('g', {}, svg));
    const d1 = c.S('rect', { x: B.x0, y: B.y, height: B.h, rx: 6, fill: YOL, opacity: 0.18 }, dg), d2 = c.S('rect', { y: B.y, height: B.h, rx: 6, fill: YOL, opacity: 0.4 }, dg);
    kutu(c, dg, B.x0, B.y, B.w, B.h, { rx: 6, kalin: 2, fill: 'none' });
    const bol = cizgi(c, dg, 0, B.y, 0, B.y + B.h, { kalin: 3, renk: RENK.yazi });
    const vE = [0, 1].map(() => yazi(c, dg, 0, B.y + 40, '', { size: 22 })), tE = [0, 1].map(() => yazi(c, dg, 0, B.y + B.h + 34, '', { size: 24, renk: SURE }));
    const adlar = ['toplam yol', 'toplam süre', 'ortalama sürat', 'süratlerin ortalaması'], RY = [250, 312, 374, 450];
    const renk = [YOL, SURE, YOL, RENK.soluk];
    const adE = gizli(adlar.map((a, i) => yazi(c, svg, 430, RY[i], a, { size: 28, renk: i === 3 ? RENK.soluk : RENK.yazi, hiza: 'end' })));
    const dgE = gizli(adlar.map((_, i) => yazi(c, svg, 456, RY[i], '', { size: 30, renk: renk[i], hiza: 'start', kalin: i === 2 ? 700 : 600 })));
    const ser = (a, ta, b, tb) => {
      const wa = B.w * ta / (ta + tb), xm = B.x0 + wa;
      d1.setAttribute('width', wa); d2.setAttribute('x', xm); d2.setAttribute('width', B.w - wa);
      bol.setAttribute('x1', xm); bol.setAttribute('x2', xm);
      vE[0].setAttribute('x', B.x0 + wa / 2); vE[1].setAttribute('x', xm + (B.w - wa) / 2); tE[0].setAttribute('x', B.x0 + wa / 2); tE[1].setAttribute('x', xm + (B.w - wa) / 2);
      vE[0].textContent = a + ' km/h'; vE[1].textContent = b + ' km/h'; tE[0].textContent = sayi(ta) + ' h'; tE[1].textContent = sayi(tb) + ' h';
    };
    const yuvar = (v) => sayi(Math.round(v * 10) / 10);
    const durumlar = [
      { a: 60, ta: 2, b: 80, tb: 2, dogru: 1, ipucu: ['Toplam yolu bul: 60 × 2 ile 80 × 2. Sonra toplam süreye, 4 saate böl.', '', 'Toplam yolu bul: 60 × 2 ile 80 × 2. Sonra toplam süreye, 4 saate böl.'], onay: 'Evet. Süreler eşit: 280 km ÷ 4 h = 70 km/h.' },
      { a: 60, ta: 1, b: 80, tb: 3, dogru: 2, ipucu: ['Araç 80 km/h ile daha uzun süre gitti; ortalama 80’e yakın çıkar.', 'Süreler eşit değil: 80 km/h ile 3 saat gidildi. Yolları topla, 4 saate böl.', ''], onay: 'Evet. 300 km ÷ 4 h = 75 km/h; 80’e daha yakın.' },
      { a: 60, ta: 3, b: 80, tb: 1, dogru: 0, ipucu: ['', 'Süreler eşit değil: bu kez 60 km/h ile 3 saat gidildi. Yolları topla, 4 saate böl.', 'Araç 60 km/h ile daha uzun süre gitti; ortalama 60’a yakın çıkar.'], onay: 'Evet. 260 km ÷ 4 h = 65 km/h; 60’a daha yakın.' },
    ];
    await c.say('İki bölümlü yolculukta ortalama sürati kestir.', { noWait: true });
    for (const d of durumlar) {
      gizli([...adE, ...dgE]); ser(d.a, d.ta, d.b, d.tb);
      await belir(c, dg, 300);
      await c.choice({ tag: 'Tahmin et', q: `Araç önce <b>${sayi(d.ta)} saat</b> ${d.a} km/h, sonra <b>${sayi(d.tb)} saat</b> ${d.b} km/h ile gidiyor. Ortalama sürati kaç km/h?`,
        options: ['65 km/h', '70 km/h', '75 km/h'], answer: d.dogru, hints: d.ipucu, right: d.onay });
      const y1 = d.a * d.ta, y2 = d.b * d.tb, top = y1 + y2, st = d.ta + d.tb;
      dgE[0].textContent = `${y1} + ${y2} = ${top} km`; await belir(c, [adE[0], dgE[0]]); await c.wait(900);
      dgE[1].textContent = `${sayi(st)} h`; await belir(c, [adE[1], dgE[1]]); await c.wait(900);
      dgE[2].textContent = `${yuvar(top / st)} km/h`; await belir(c, [adE[2], dgE[2]]); await c.wait(1100);
      dgE[0].textContent = `${top} km`; dgE[3].textContent = String((d.a + d.b) / 2);
      await belir(c, [adE[3], dgE[3]]); await c.wait(1800);
    }
    await c.say('Süreler eşitken iki hesap aynı çıktı; eşit değilken ayrıldı.');
    await c.say('Ortalama sürat, daha uzun süre gidilen sürate yakın çıkar.');
    // Serbest keşif (isteğe bağlı)
    const S = { a: 60, ta: 3, b: 80, tb: 1 };
    const ciz = () => {
      ser(S.a, S.ta, S.b, S.tb);
      const top = S.a * S.ta + S.b * S.tb, st = S.ta + S.tb;
      dgE[0].textContent = `${top} km`; dgE[1].textContent = `${sayi(st)} h`; dgE[2].textContent = `${yuvar(top / st)} km/h`; dgE[3].textContent = String((S.a + S.b) / 2);
    };
    await c.say('Kaydırıcılarla kendi yolculuğunu kur.', { noWait: true });
    const kmh = (v) => v + ' km/h', saat = (v) => sayi(v) + ' h';
    const kay = [
      c.slider({ label: '1. bölüm: sürat', min: 40, max: 120, step: 10, value: S.a, fmt: kmh, onInput: (v) => { S.a = v; ciz(); } }),
      c.slider({ tag: false, label: '1. bölüm: süre', min: 0.5, max: 3, step: 0.5, value: S.ta, fmt: saat, onInput: (v) => { S.ta = v; ciz(); } }),
      c.slider({ tag: false, label: '2. bölüm: sürat', min: 40, max: 120, step: 10, value: S.b, fmt: kmh, onInput: (v) => { S.b = v; ciz(); } }),
      c.slider({ tag: false, label: '2. bölüm: süre', min: 0.5, max: 3, step: 0.5, value: S.tb, fmt: saat, onInput: (v) => { S.tb = v; ciz(); } }),
    ];
    await c.cont('Devam ›');
    kay.forEach((k) => k.remove());
  }

  /* ---- Sahne 7 · Anlık sürat ---- */
  async function anlik(c) {
    const svg = c.svg(1000, 562), X = [190, 500, 810], gr = c.S('g', {}, svg);
    const veri = [['şehir içi', '16.00', 50], ['şehirler arası', '16.15', 90], ['otoyol', '16.32', 120]];
    const gos = X.map((x) => gosterge(c, gr, x, 195, 95, { sayisiz: true, birim: ' ', renk: YOL }));
    const saatler = [];
    const kare = veri.map(([ad, saat], i) => {
      const g = gizli(c.S('g', {}, gr)), x = X[i];
      yazi(c, g, x, 64, ad, { size: 26, renk: RENK.soluk });
      kutu(c, g, x - 62, 372, 124, 48, { rx: 8, kalin: 2 }); saatler.push(yazi(c, g, x, 407, saat, { size: 30, renk: SURE, kalin: 700 }));
      return g;
    });
    const deger = gizli(veri.map(([, , v], i) => yazi(c, gr, X[i], 340, v + ' km/h', { size: 28, renk: YOL })));
    const cerceve = gizli(X.map((x) => kutu(c, gr, x - 140, 26, 280, 414, { fill: 'none', renk: RENK.soluk, kalin: 2, rx: 10 })));
    const flas = X.map((x) => c.S('rect', { x: x - 140, y: 26, width: 280, height: 414, rx: 10, fill: '#fff', opacity: 0 }, gr));
    const cek = async (i) => {
      await belir(c, kare[i], 300);
      await par(gos[i].git(c, veri[i][2], 700), belir(c, deger[i], 700));
      cerceve[i].style.opacity = 1;
      await c.tween(450, (e) => flas[i].setAttribute('opacity', 0.7 * (1 - e)));
    };
    await c.say('Aynı aracın göstergesine üç ayrı anda bakalım.');
    await cek(0);
    await c.say('Saat 16.00’da şehir içinde ibre 50’yi gösteriyor.', { speak: 'Saat on altıda şehir içinde ibre elliyi gösteriyor.' });
    await cek(1);
    await c.say('16.15’te şehirler arası yolda 90’ı gösteriyor.', { speak: 'On altı on beşte şehirler arası yolda doksanı gösteriyor.' });
    await cek(2);
    await c.say('16.32’de otoyolda ibre 120’de.', { speak: 'On altı otuz ikide otoyolda ibre yüz yirmide.' });
    await c.choice({ tag: 'Düşün', q: 'Üç görüntünün ortak yanı hangisi?',
      options: ['Üçü de aynı sürati gösteriyor', 'Üçü de yolculuğun ortalama süratini gösteriyor', 'Her biri tek bir andaki sürati gösteriyor'], answer: 2,
      hints: ['Değerler 50, 90 ve 120; üçü de farklı. Ortak olan, her birinin tek bir saate ait olması.', 'Ortalama sürat tek sayıdır ve toplam yoldan hesaplanır; burada üç ayrı anda üç ayrı değer var.', ''],
      right: 'Evet. Her görüntü tek bir ana ait.' });
    await par(c.say('Her görüntü tek bir anda alındı: 16.00, 16.15, 16.32.', { speak: 'Her görüntü tek bir anda alındı: on altı, on altı on beş, on altı otuz iki.' }), vurgula(c, saatler, 1400));
    const ad = gizli(yazi(c, svg, 500, 508, 'anlık sürat', { size: 36, renk: YOL }));
    await belir(c, ad);
    await c.say('Sürat göstergesinde o an okunan değere anlık sürat denir.', { speak: 'Sürat göstergesinde o an okunan değere [short pause] anlık sürat denir.' });
    ad.textContent = 'anlık sürat: skaler';
    await c.say('Anlık sürat de skalerdir; gösterge yön söylemez.');
    await kaybol(c, [gr, ad]);
    const tek = gosterge(c, svg, 300, 265, 160, { adim: 30, renk: YOL }); gizli(tek.g);
    const yan = gizli([yazi(c, svg, 730, 220, 'yolda 3. saat', { size: 34 }), yazi(c, svg, 300, 500, '70 km/h', { size: 34, renk: YOL })]);
    await belir(c, [tek.g, ...yan]); await tek.git(c, 70);
    await c.choice({ tag: 'Uygula', q: 'Yola çıkalı 3 saat olan bir sürücü göstergede 70 km/h okuyor. Bundan hangisi çıkar?',
      options: ['3 saatte 210 km yol almıştır', 'Ortalama sürati 70 km/h’tir', 'O andaki sürati 70 km/h’tir'], answer: 2,
      hints: ['Bu hesap, araç 3 saat boyunca hep 70 km/h ile gittiyse tutar; gösterge yalnızca bakılan anı gösterir.', 'Ortalama sürat toplam yol ile hareket süresinden bulunur; göstergede yazmaz.', ''],
      right: 'Evet. Gösterge yalnızca o anı söyler.' });
    await c.say('Gösterge geçen 3 saati bilmez; yalnızca o andaki sürati gösterir.', { speak: '[thoughtful] Gösterge geçen üç saati bilmez; yalnızca o andaki sürati gösterir.' });
    const bilinmez = gizli([yazi(c, svg, 730, 310, 'toplam yol: ?', { size: 30, renk: YOL }), yazi(c, svg, 730, 366, 'ortalama sürat: ?', { size: 30, renk: YOL })]);
    await belir(c, bilinmez);
    await c.say('Ortalama sürat için toplam yolu ve hareket süresini bilmek gerekir.');
  }

  /* ---- Sahne 8 · Anı mı, bütün yolu mu? ---- */
  async function aniMi(c) {
    const svg = c.svg(1000, 562), KOL = [140, 380, 620, 860], GY = 150, R = 85, d1 = c.S('g', {}, svg);
    const gos = KOL.map((x) => gosterge(c, d1, x, GY, R, { sayisiz: true, birim: ' ', renk: YOL }));
    const a85 = (210 - 85) * Math.PI / 180;
    const isaret = gizli(KOL.map((x) => cizgi(c, d1, x + Math.cos(a85) * R * 0.74, GY - Math.sin(a85) * R * 0.74, x + Math.cos(a85) * R * 1.16, GY - Math.sin(a85) * R * 1.16, { renk: RENK.yazi, kalin: 5 })));
    const deger = gizli(KOL.map((x, i) => yazi(c, d1, x, 284, String(OTO.v[i]), { size: 30, renk: YOL })));
    const birim = gizli(yazi(c, d1, 948, 284, 'km/h', { size: 24, renk: RENK.soluk }));
    const ort = yazi(c, d1, 500, 352, 'ortalama: 85 km/h', { size: 30 });
    await c.say('Dört otoyoldaki aracın ortalama sürati 85 kilometre bölü saatti.', { speak: 'Dört otoyoldaki aracın ortalama sürati seksen beş kilometre bölü saatti.' });
    await belir(c, birim, 200);
    for (let i = 0; i < 4; i++) await par(gos[i].git(c, OTO.v[i], 500), belir(c, deger[i], 500));
    await c.say('Göstergesi ise yol boyunca 50, 70, 90 ve 110’u gösterdi.', { speak: 'Göstergesi ise yol boyunca elli, yetmiş, doksan ve yüz onu gösterdi.' });
    await belir(c, isaret);
    await c.say('Bu dört değeri 85 ile karşılaştıralım.', { speak: 'Bu dört değeri seksen beş ile karşılaştıralım.' });
    await c.choice({ tag: 'Düşün', q: 'Ortalama sürati 85 km/h olan bu araç için hangisi doğru?',
      options: ['Hiçbir an 85 km/h’in üstüne çıkmamıştır', 'Bazı anlarda 85’in üstünde, bazı anlarda altında gitmiştir', 'Her an tam 85 km/h ile gitmiştir'], answer: 1,
      hints: ['Üçüncü otoyolda 90, dördüncüde 110 km/h ile gitti; ortalama sürat, ulaşılan en büyük değer değildir.', '', 'Gösterge 50, 70, 90 ve 110’u gösterdi; 85 bütün yolculuğun hesabıdır, tek bir anın değil.'],
      right: 'Evet. Ortalama, anlık değerlerin arasında kalır.' });
    const ayrac = (x1, x2, ad) => { const g = gizli(c.S('g', {}, d1)); yol(c, g, `M ${x1} 400 L ${x1} 412 L ${x2} 412 L ${x2} 400`, { renk: RENK.soluk, kalin: 3 }); yazi(c, g, (x1 + x2) / 2, 452, ad, { size: 28 }); return g; };
    const ustu = ayrac(540, 940, 'üstünde'), alti = ayrac(60, 460, 'altında');
    await belir(c, ustu);
    await c.say('Araç 90 ve 110 ile giderken ortalamanın üstündeydi.', { speak: 'Araç doksan ve yüz on ile giderken ortalamanın üstündeydi.' });
    await belir(c, alti);
    await c.say('50 ve 70 ile giderken ortalamanın altındaydı.', { speak: 'Elli ve yetmiş ile giderken ortalamanın altındaydı.' });
    await kaybol(c, d1);
    // Baştaki araba
    const d2 = gizli(c.S('g', {}, svg)), X0 = 470, X1 = 950, YY = 250, ORTA = (X0 + X1) / 2;
    const gs = gosterge(c, d2, 215, 250, 140, { adim: 30, renk: YOL, deger: 90 });
    yolSeridi(c, d2, X0, X1, YY);
    const car = c.S('g', {}, d2); araba(c, car, 0, 0, { s: 0.85 }); car.setAttribute('transform', `translate(${lerp(X0, X1, 0.7)} ${YY - 24})`);
    yazi(c, d2, ORTA, 158, '90 km', { size: 30, renk: YOL }); yazi(c, d2, ORTA, 322, '2 h', { size: 30, renk: SURE });
    await belir(c, d2);
    await c.say('Baştaki arabaya dönelim: 90 kilometre, 2 saat.', { speak: 'Baştaki arabaya dönelim: doksan kilometre, iki saat.' });
    const oAd = gizli(yazi(c, d2, ORTA, 396, 'ortalama sürat', { size: 26, renk: RENK.soluk }));
    const oK = gizli(satir(c, d2, ORTA, 468, [{ ust: { t: '90 km', renk: YOL }, alt: { t: '2 h', renk: SURE } }, '=', { t: '45 km/h', renk: YOL, kalin: 700 }], { size: 30 }));
    await belir(c, [oAd, oK]);
    await c.say('Ortalama sürati 90 ÷ 2 = 45 kilometre bölü saat.', { speak: 'Ortalama sürati doksan bölü iki eşittir kırk beş kilometre bölü saat.' });
    const aAd = gizli(yazi(c, d2, 215, 452, 'anlık sürat: 90 km/h', { size: 28, renk: YOL }));
    await par(belir(c, aAd), vurgula(c, gs.g, 900));
    await c.say('Göstergedeki 90 ise bakılan andaki anlık süratti.', { speak: 'Göstergedeki doksan ise bakılan andaki anlık süratti.' });
    await kaybol(c, d2);
    const t = tablo(c, svg, { x: 110, y: 100, satir: 84, size: 28, sutunlar: [{ ad: 'ortalama sürat', w: 430 }, { ad: 'anlık sürat', w: 350 }] });
    gizli(t.g);
    t.satir(['bütün yolculuk', 'tek an']); t.satir(['toplam yol / hareket süresi', 'göstergede okunur']); t.satir(['skaler', 'skaler'], { renk: RENK.soluk });
    await belir(c, t.g);
    await c.say('Gösterge anı söyler, ortalama bütün yolu.');
    c.note('<b>Ortalama sürat:</b> bütün yolculuk; toplam yol / hareket süresi.<br><b>Anlık sürat:</b> tek an; göstergede okunur.<br>İkisi de skaler.', 'Ortalama ve anlık sürat', 'ortalama-anlik');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-e3', kicker: 'Konu E · Hareketin temel kavramları', title: 'Sürat: ortalama ve anlık', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'Sürat: ortalama ve anlık', hook: 'Arabanın göstergesi şu an 90 gösteriyor, ama 90 kilometrelik yol iki saat sürdü; hangisi arabanın sürati?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Gösterge mi, bütün yol mu?', goal: 'Göstergedeki sayı ile bütün yolun hesabını karşılaştır.', run: gostergeMi },
      { title: 'İki araç, bir ortak yan', goal: 'Süratin yol ve süreden nasıl bulunduğunu gör.', run: ikiArac },
      { title: 'Kim daha süratli?', goal: 'Sürati karşılaştırırken yola ve süreye birlikte bak.', run: kimSuratli },
      { title: 'Sürat hep aynı kalmaz', goal: 'Sürat ve süreden alınan yolu bul.', run: dortOtoyol },
      { title: 'Ortalama sürat', goal: 'Toplam yolu hareket süresine böl.', run: ortalama },
      { title: 'Ortalama sürat, süratlerin ortalaması değildir', goal: 'İki hesabın ne zaman ayrıldığını dene.', run: ortalamaDegil },
      { title: 'Anlık sürat', goal: 'Göstergenin tek bir anı gösterdiğini gör.', run: anlik },
      { title: 'Anı mı, bütün yolu mu?', goal: 'Ortalama sürat ile anlık sürati ayır.', run: aniMi },
      { title: 'Hikâye: İki kamera arası', goal: 'Ortalama süratin trafikteki yerini gör.', video: 'hikaye/e3-iki-kamera/renders/e3-iki-kamera.mp4' },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir otobüs 150 km’lik yolu 2 saatte alıyor. Ortalama sürati kaç km/h?', options: ['300 km/h', '75 km/h', '152 km/h'], answer: 1,
        why: ['300, yol ile sürenin çarpımıdır; sürat için yol süreye bölünür.', '150 ÷ 2 = 75; toplam yol hareket süresine bölünür.', '152, yol ile sürenin toplamıdır; sürat için yol süreye bölünür.'], scene: 4 },
      { q: 'Bir araç 1 saat 60 km/h, sonra 1 saat 100 km/h ile gidiyor. Başka bir araç yarım saat 60 km/h, sonra bir buçuk saat 100 km/h ile gidiyor. Ortalama süratleri için hangisi doğru?',
        options: ['İkisinin de 80 km/h; çünkü süratler aynı', 'Birincinin 80, ikincinin 90 km/h', 'Birincinin 90, ikincinin 80 km/h'], answer: 1,
        why: ['Ortalama sürat süratlerin ortalaması değildir; ikinci araç 100 km/h ile daha uzun süre gitti.', 'Birinci araç 160 km’yi, ikinci araç 180 km’yi 2 saatte alır: 80 ve 90 km/h.', 'Tersine: 100 km/h ile daha uzun süre giden ikinci araçtır; onun ortalaması büyük çıkar.'], scene: 5 },
    ],
    summary: ['<b>Gösterge anı söyler, ortalama bütün yolu.</b>', 'Sürat = alınan yol / zaman; skalerdir, birimi m/s ya da km/h.', 'Ortalama sürat = toplam yol / hareket süresi; süratlerin ortalaması değildir.'],
    nextLesson: { href: 'e4-hiz.html', label: 'Sonraki: Hız: yönü olan sürat ›' },
  });
})();
