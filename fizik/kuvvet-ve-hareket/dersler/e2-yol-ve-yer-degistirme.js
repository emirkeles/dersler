/* E2 · FİZ.9.2.6 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/E-hareketin-temel-kavramlari.md
   Yazar notu: krokiler ve tablo MEB Fizik 9 s. 94–95, 102, 105–106, 108 ve 118'den; pist, koridor ve koşucu sayıları örnek veridir.
   Renk rolleri (Konu E boyunca): konum = mor, alınan yol = vurgu, yer değiştirme = r; referans noktası turkuaz halka.
   Grafik çizilmez; sayılar sayaç ve tablo üzerinde durur. Öğrenciye kitap ya da sayfa anılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, yol, gizle, belir, sol, kaybol, par, ok, okCiz, yonGulu, izgara, tablo, sayiDogrusu, insan } = KIT;
  const { lerp, ease, clamp } = Ders;
  const KONUM = RENK.mor, YOL = RENK.vurgu, YER = RENK.r, REF = RENK.turkuaz;

  /* ---- Ortak küçük araçlar ---- */
  const halka = (c, p, x, y, r = 21) => c.S('circle', { cx: x, cy: y, r, fill: 'none', stroke: REF, 'stroke-width': 4 }, p);
  const nokta = (c, p, x, y, o = {}) => c.S('circle', { cx: x, cy: y, r: o.r || 8, fill: o.renk || RENK.yazi, stroke: o.cerceve || 'none', 'stroke-width': 3 }, p);
  const kirp = (c, el, ms = 500) => c.tween(ms, (e, t) => { el.style.opacity = 1 - 0.75 * Math.sin(Math.PI * t); }, ease.linear);
  /* "batı ← → doğu" göstergesi */
  function yonOku(c, p, x, y) {
    const g = c.S('g', {}, p);
    yazi(c, g, x - 98, y + 8, 'batı', { size: 24, renk: RENK.soluk, hiza: 'end' });
    ok(c, g, x - 8, y, x - 86, y, { renk: RENK.soluk, kalin: 3, uc: 11 });
    ok(c, g, x + 8, y, x + 86, y, { renk: RENK.soluk, kalin: 3, uc: 11 });
    yazi(c, g, x + 98, y + 8, 'doğu', { size: 24, renk: RENK.soluk, hiza: 'start' });
    return g;
  }
  /* Yan yana yazı parçaları. { ok: true } parçanın son harfinin üstüne küçük bir vektör oku çizer; alt: alt indis. */
  function dizi(c, p, x, y, parcalar, o = {}) {
    const g = c.S('g', {}, p), s = o.size || 28, renk = o.renk || RENK.yazi; let u = 0;
    parcalar.forEach((pr) => {
      const q = typeof pr === 'string' ? { t: pr } : pr, r = q.renk || renk;
      const el = yazi(c, g, u, y, q.t, { size: s, renk: r, hiza: 'start' });
      const w = el.getComputedTextLength() || q.t.length * s * 0.56;
      if (q.ok) {
        const a = q.t.length > 1 ? el.getSubStringLength(0, q.t.length - 1) : 0;
        ok(c, g, u + a - 1, y - s * 0.8, u + w + 4, y - s * 0.8, { renk: r, kalin: 2.5, uc: 9 });
      }
      u += w;
      if (q.alt) { const al = yazi(c, g, u + 3, y + s * 0.2, q.alt, { size: Math.max(22, s * 0.62), renk: r, hiza: 'start', kalin: 500 }); u += 3 + (al.getComputedTextLength() || q.alt.length * 12); }
      u += q.ara == null ? s * 0.3 : q.ara;
    });
    const hiza = o.hiza || 'start';
    g.setAttribute('transform', `translate(${hiza === 'start' ? x : hiza === 'end' ? x - u : x - u / 2} 0)`);
    return g;
  }
  /* Adlı yer işareti: nokta + ad. */
  function yer(c, p, x, y, ad, konum = 'ust', o = {}) {
    const g = c.S('g', {}, p);
    nokta(c, g, x, y);
    const yerler = { ust: [x, y - 26, 'middle'], alt: [x, y + 44, 'middle'], sag: [x + 28, y + 8, 'start'], sol: [x - 28, y + 8, 'end'], sagalt: [x + 22, y + 30, 'start'], sagust: [x + 22, y - 12, 'start'] };
    const [tx, ty, hiza] = yerler[konum];
    yazi(c, g, tx, ty, ad, { size: o.size || 24, hiza });
    return { g, x, y };
  }
  /* Bir çizgi boyunca ilerleme: boya(t) çizginin baştan t oranındaki bölümünü yol rengiyle boyar, yer(t) o andaki [x, y]'yi verir. */
  function guzergah(c, p, d, o = {}) {
    const taban = yol(c, p, d, { renk: o.taban || RENK.cizgi, kalin: o.tabanKalin || 4 });
    if (o.kesik) taban.setAttribute('stroke-dasharray', o.kesik);
    const iz = yol(c, p, d, { renk: o.renk || YOL, kalin: o.kalin || 7 });
    const L = taban.getTotalLength();
    iz.setAttribute('stroke-dasharray', `${L} ${L}`);
    const boya = (t) => { iz.setAttribute('stroke-dashoffset', L * (1 - clamp(t, 0, 1))); iz.style.opacity = t > 0.002 ? 1 : 0; };
    const yerAl = (t) => { const q = taban.getPointAtLength(L * clamp(t, 0, 1)); return [q.x, q.y]; };
    boya(0);
    return { taban, iz, L, boya, yer: yerAl };
  }
  /* Köşeli yol: parça parça uzayan düz çizgiler (kesikli çizgi de boyanarak ilerleyebilsin diye). pts: tahta koordinatları. */
  function kirikYol(c, p, pts, o = {}) {
    const g = c.S('g', {}, p), boy = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1])), L = boy.reduce((a, b) => a + b, 0);
    const parcalar = boy.map((_, i) => {
      const l = cizgi(c, g, pts[i][0], pts[i][1], pts[i][0], pts[i][1], { renk: o.renk || YOL, kalin: o.kalin || 7 });
      if (o.kesik) { l.setAttribute('stroke-dasharray', o.kesik); l.setAttribute('stroke-linecap', 'butt'); }
      return l;
    });
    const boya = (t) => {
      let s = L * clamp(t, 0, 1);
      boy.forEach((b, i) => {
        const k = clamp(s / b, 0, 1);
        parcalar[i].setAttribute('x2', lerp(pts[i][0], pts[i + 1][0], k)); parcalar[i].setAttribute('y2', lerp(pts[i][1], pts[i + 1][1], k));
        parcalar[i].style.display = k > 0 ? '' : 'none'; s -= b;
      });
    };
    const yerAl = (t) => {
      let s = L * clamp(t, 0, 1), i = 0;
      while (i < boy.length - 1 && s > boy[i]) { s -= boy[i]; i++; }
      const k = clamp(s / boy[i], 0, 1);
      return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)];
    };
    boya(0);
    return { g, boya, yer: yerAl, L };
  }
  const noktaKoy = (n, [x, y]) => { n.setAttribute('cx', x); n.setAttribute('cy', y); };
  /* Noktayı güzergâh boyunca t0 → t1 arasında yürütür; herAdim(t) her karede çağrılır. */
  const yurut = (c, gz, n, t0, t1, ms, herAdim, e) => c.tween(ms, (k) => { const t = lerp(t0, t1, k); gz.boya(t); noktaKoy(n, gz.yer(t)); if (herAdim) herAdim(t); }, e || ease.inOut);
  /* A ve B şehirleri, aralarında iki yol: kıvrımlı (160 km) ve daha düz (120 km). İkinci yol B'den A'ya doğru tanımlıdır. */
  function sehir(c, p, ox, oy, k) {
    const q = (x, y) => `${ox + k * (x - 70)} ${oy + k * (y - 230)}`;
    const d1 = `M ${q(70, 230)} C ${q(80, 100)} ${q(160, 60)} ${q(200, 130)} C ${q(230, 185)} ${q(270, 185)} ${q(290, 130)} C ${q(320, 60)} ${q(380, 110)} ${q(390, 230)}`;
    const d2 = `M ${q(390, 230)} Q ${q(230, 345)} ${q(70, 230)}`;
    const y1 = guzergah(c, p, d1, { tabanKalin: 5 }), y2 = guzergah(c, p, d2, { tabanKalin: 5 });
    const A = [ox, oy], B = [ox + k * 320, oy];
    nokta(c, p, A[0], A[1], { r: 10 }); nokta(c, p, B[0], B[1], { r: 10 });
    yazi(c, p, A[0] - 20, A[1] + 10, 'A', { size: 28, hiza: 'end' }); yazi(c, p, B[0] + 20, B[1] + 10, 'B', { size: 28, hiza: 'start' });
    const e1 = yazi(c, p, ox + k * 160, oy + k * (62 - 230), '160 km', { size: 24, renk: YOL }), e2 = yazi(c, p, ox + k * 160, oy + k * (322 - 230), '120 km', { size: 24, renk: YOL });
    return { y1, y2, A, B, e1, e2 };
  }
  const VX = '<span style="display:inline-block;position:relative">x<span style="position:absolute;left:-.1em;right:-.1em;top:-.62em;text-align:center;font-size:.7em">→</span></span>';

  /* ---- Sahne 1 · Tam tur ---- */
  async function tamTur(c) {
    const svg = c.svg(1000, 562);
    // Ön bilgi 1: konum = referans noktasına göre yön ve uzaklık
    const on = c.S('g', {}, svg);
    nokta(c, on, 300, 260, { r: 9 }); halka(c, on, 300, 260);
    yazi(c, on, 300, 318, 'referans noktası', { size: 24, renk: REF });
    const kv0 = ok(c, on, 300, 260, 640, 260, { renk: KONUM, kalin: 7 });
    yazi(c, on, 470, 236, 'doğu, 200 m', { size: 26, renk: KONUM });
    nokta(c, on, 648, 260, { r: 9 });
    await belir(c, on, 400);
    await c.say('Konum, referans noktasına göre yön ve uzaklıkla söylenir.');
    await kaybol(c, on, 300);
    // Ön bilgi 2: zıt yönlü iki vektörün bileşkesi
    const on2 = c.S('g', {}, svg);
    const va = ok(c, on2, 300, 200, 700, 200, { renk: RENK.a, kalin: 7 }), vb = ok(c, on2, 700, 270, 400, 270, { renk: RENK.b, kalin: 7 }), vr = ok(c, on2, 300, 340, 400, 340, { renk: RENK.r, kalin: 7 });
    const sa = yazi(c, on2, 500, 184, '4', { size: 28, renk: RENK.a }), sb = yazi(c, on2, 550, 254, '3', { size: 28, renk: RENK.b }), sr = yazi(c, on2, 350, 324, '1', { size: 28, renk: RENK.r });
    gizle(sa, sb, sr);
    await par(okCiz(c, va, 500), belir(c, sa, 300)); await par(okCiz(c, vb, 500), belir(c, sb, 300)); await par(okCiz(c, vr, 400), belir(c, sr, 300));
    await c.say('Zıt yönlü iki vektör toplanınca fark kalır, büyük olanın yönünde.');
    await kaybol(c, on2, 300);

    // Pist: bir tur 400 m; koşucu saat yönünün tersine dolaşır.
    const p = c.S('g', {}, svg), D = 'M 400 160 L 250 160 A 130 130 0 0 0 250 420 L 550 420 A 130 130 0 0 0 550 160 L 400 160';
    yol(c, p, D, { renk: RENK.cizgi, kalin: 54 }); yol(c, p, D, { renk: '#18233f', kalin: 48 });
    const gz = guzergah(c, p, D, { taban: RENK.ince, tabanKalin: 2, kalin: 14 });
    cizgi(c, p, 400, 134, 400, 186, { renk: RENK.yazi, kalin: 5 });
    yazi(c, p, 400, 112, 'başlangıç', { size: 24 });
    const h = halka(c, p, 400, 160, 36), kv = ok(c, p, 400, 160, 400, 160, { renk: KONUM, kalin: 6 });
    const kosucu = nokta(c, p, 400, 160, { r: 12, cerceve: RENK.koyu });
    const sayacAd = yazi(c, p, 850, 250, 'alınan yol', { size: 24, renk: YOL }), sayac = yazi(c, p, 850, 306, '0 m', { size: 46, renk: YOL, kalin: 700 });
    gizle(h, kosucu, sayacAd, sayac);
    const adim = (t) => { const [x, y] = gz.yer(t); kv.ayarla(400, 160, x, y); sayac.textContent = Math.round(400 * t) + ' m'; };
    await belir(c, p, 450);
    await c.say('Şimdi bir turu 400 metre olan koşu pistindesin.', { speak: 'Şimdi bir turu dört yüz metre olan koşu pistindesin.' });
    await belir(c, [h, kosucu], 400);
    await c.say('Başlangıç çizgisi referans noktan; koşmaya başlıyorsun.');
    await belir(c, [sayacAd, sayac], 300);
    await par(yurut(c, gz, kosucu, 0, 0.3, 3200, adim, ease.in), c.say('Kolundaki saat koştuğun her metreyi sayıyor.'));
    await par(yurut(c, gz, kosucu, 0.3, 1, 4200, adim, ease.out), c.say('Pistin çevresini dolaşıp tam başladığın çizgide duruyorsun.'));
    adim(1);
    await c.choice({ tag: 'Tahmin et', q: 'Tam turun sonunda hangisi doğru?',
      options: ['Hiç yol almadın; çünkü başladığın yerdesin', '400 m yol aldın; konumun başlangıçtakiyle aynı', '400 m yol aldın; konumun da 400 m değişti'], answer: 1,
      hints: ['Saat her metreyi saydı; başa dönmek koştuğun 400 metreyi silmez.', '', 'Durduğun yer başlangıç çizgisi; konumun başladığın andakiyle aynı, değişim sıfır.'],
      right: 'Evet. Yol 400 m; konumun ise başladığın andaki gibi.' });
    await par(kirp(c, sayac, 600), kirp(c, h, 600));
    await c.say('Koştuğun 400 metre silinmedi, ama konumun başladığın andakiyle aynı.', { speak: '[thoughtful] Koştuğun dört yüz metre silinmedi, ama konumun başladığın andakiyle aynı.' });
    await c.say('Demek ki bir hareketi iki ayrı soruyla anlatabiliriz.');
    const s1 = yazi(c, p, 400, 494, 'ne kadar yol gittim?', { size: 26, renk: YOL }), s2 = yazi(c, p, 400, 534, 'yerim ne kadar, nereye değişti?', { size: 26, renk: YER });
    gizle(s1, s2); await belir(c, s1, 350); await belir(c, s2, 350);
    await c.say('Biri “ne kadar yol gittim”, öteki “yerim ne kadar, nereye değişti”.');
  }

  /* ---- Sahne 2 · Alınan yol ---- */
  async function alinanYol(c) {
    const svg = c.svg(1000, 562);
    const k1 = c.S('g', {}, svg), s = sehir(c, k1, 70, 230, 1);
    const arac = nokta(c, k1, s.A[0], s.A[1], { r: 11, renk: RENK.a, cerceve: RENK.yazi });
    const toplam = yazi(c, k1, 230, 404, '160 + 120 = 280 km', { size: 28, renk: YOL });
    gizle(s.e1, s.e2, arac, toplam);
    const k2 = c.S('g', {}, svg), izg = izgara(c, k2, { x: 470, y: 70, kare: 50, sutun: 10, satir: 6, olcek: '1 kare = 25 m' });
    const P = (i, j) => izg.P(i, j);
    const ptsI = [[1, 1], [6, 1], [6, 2], [8, 2], [8, 1], [9, 1], [9, 5]].map(([i, j]) => P(i, j));
    const onizI = yol(c, k2, 'M ' + ptsI.map((q) => q.join(' ')).join(' L '), { renk: YOL, kalin: 3 }); onizI.setAttribute('stroke-dasharray', '4 10');
    const yolII = kirikYol(c, k2, [[1, 1], [1, 5], [9, 5]].map(([i, j]) => P(i, j)));
    const yolI = kirikYol(c, k2, ptsI, { kesik: '14 8' });
    const [ex, ey] = P(1, 1), [ox, oy] = P(1, 5), [kx, ky] = P(9, 5);
    yer(c, k2, ex, ey, 'ev', 'sol'); yer(c, k2, ox, oy, 'okul', 'ust'); yer(c, k2, kx, ky, 'kütüphane', 'ust');
    const yuruyen = nokta(c, k2, ex, ey, { r: 10, renk: RENK.a, cerceve: RENK.yazi });
    cizgi(c, k2, 484, 446, 524, 446, { renk: YOL, kalin: 7 });
    const kare1 = yazi(c, k2, 544, 455, '0 kare', { size: 28, renk: YOL, hiza: 'start' }), metre1 = yazi(c, k2, 700, 455, '300 m', { size: 28, renk: YOL, hiza: 'start' });
    const ornek2 = cizgi(c, k2, 482, 496, 526, 496, { renk: YOL, kalin: 7, kesik: '14 8' }); ornek2.setAttribute('stroke-linecap', 'butt');
    const kare2 = yazi(c, k2, 544, 505, '0 kare', { size: 28, renk: YOL, hiza: 'start' }), metre2 = yazi(c, k2, 700, 505, '350 m', { size: 28, renk: YOL, hiza: 'start' });
    gizle(k2, metre1, ornek2, kare2, metre2, onizI);
    await belir(c, k1, 400);
    await c.say('A şehrinden B şehrine iki ayrı yol gidiyor.', { speak: 'a şehrinden be şehrine iki ayrı yol gidiyor.' });
    await belir(c, [s.e1, s.e2], 350);
    await c.say('Kıvrımlı yoldan giden araç 160, öteki yoldan giden 120 kilometre yol alır.', { speak: 'Kıvrımlı yoldan giden araç yüz altmış, öteki yoldan giden yüz yirmi kilometre yol alır.' });
    await belir(c, arac, 250);
    await par(c.say('Biriyle gidip ötekiyle dönen araç toplam 280 kilometre yol alır.', { speak: 'Biriyle gidip ötekiyle dönen araç toplam iki yüz seksen kilometre yol alır.' }), (async () => {
      await yurut(c, s.y1, arac, 0, 1, 2400); await yurut(c, s.y2, arac, 0, 1, 1900); await belir(c, toplam, 350);
    })());
    await belir(c, k2, 450);
    await c.say('İkinci krokide her kare 25 metre; ev, okul ve kütüphane işaretli.', { speak: 'İkinci krokide her kare yirmi beş metre; ev, okul ve kütüphane işaretli.' });
    const say1 = (t) => { kare1.textContent = Math.round(12 * t) + ' kare'; };
    await par(c.say('Evden okula 4 kare, okuldan kütüphaneye 8 kare var.', { speak: 'Evden okula dört kare, okuldan kütüphaneye sekiz kare var.' }), (async () => {
      await yurut(c, yolII, yuruyen, 0, 4 / 12, 1500, say1); await c.wait(400); await yurut(c, yolII, yuruyen, 4 / 12, 1, 2200, say1);
    })());
    await belir(c, metre1, 350);
    await c.say('Bu yoldan giden öğrenci 12 kare, yani 300 metre yol alır.', { speak: 'Bu yoldan giden öğrenci on iki kare, yani üç yüz metre yol alır.' });
    await c.choice({ tag: 'Düşün', q: 'Araç için 280 km, öğrenci için 300 m bulduk. İkisinde de <b>neyi</b> topladık?',
      options: ['Başlangıç ile bitiş arasındaki düz uzaklıkları', 'Gidilen yolun bölümlerinin uzunluklarını', 'Gidilen yönleri'], answer: 1,
      hints: ['Araç A’dan çıkıp A’ya döndü; başlangıç ile bitiş arasındaki düz uzaklık sıfırdır, oysa 280 km bulduk. Toplanan, gidilen yolun bölümleri.', '', 'Yön toplanmadı; kuzeye de gidilse doğuya da gidilse yalnızca uzunluklar eklendi.'],
      right: 'Evet. Gidilen yolun bölümleri toplandı.' });
    await par(kirp(c, s.y1.iz), kirp(c, s.y2.iz), kirp(c, yolII.g));
    await c.say('İki krokide de saydığımız şey aynı: izlenen çizginin uzunluğu.');
    await kaybol(c, [s.e1, s.e2], 300);
    const yor = yazi(c, k2, (ox + kx) / 2, oy + 36, 'yörünge', { size: 26, renk: YOL });
    await belir(c, yor, 350);
    await c.say('Cismin hareket ederken çizdiği bu çizgi onun <b>yörüngesidir</b>.');
    await c.say('Cismin hareketi boyunca çizdiği yörüngenin uzunluğuna <b>alınan yol</b> denir.', { speak: 'Cismin hareketi boyunca çizdiği yörüngenin uzunluğuna [short pause] alınan yol denir.' });
    metre1.textContent = 'x = 300 m'; await kirp(c, metre1);
    await c.say('Alınan yol x ile gösterilir; SI birimi metredir.', { speak: 'Alınan yol iks ile gösterilir; se i birimi metredir.' });
    await c.say('Yön taşımaz, yalnızca sayı ve birimle söylenir; skaler bir niceliktir.');
    await kaybol(c, yor, 300); metre1.textContent = '300 m';
    noktaKoy(yuruyen, [ex, ey]);
    await belir(c, [onizI, ornek2], 400);
    await c.choice({ tag: 'Uygula', q: 'Evden kütüphaneye giden öteki yol 14 kare tutuyor. Bu yoldan giden öğrenci kaç metre yol alır?',
      options: ['300 m; çünkü varılan yer aynı', '350 m', '200 m; okul ile kütüphane arası kadar'], answer: 1,
      hints: ['Varılan yer aynı olsa da izlenen çizgi daha uzun: 14 × 25 = 350 m. Alınan yol yörüngeye bağlıdır.', '', '200 m, okul ile kütüphane arasındaki bölümün boyu; öğrenci bu kez o bölümden hiç geçmedi.'],
      right: 'Evet. 14 × 25 = 350 m.' });
    await belir(c, kare2, 250);
    await yurut(c, yolI, yuruyen, 0, 1, 3200, (t) => { kare2.textContent = Math.round(14 * t) + ' kare'; }, ease.linear);
    await belir(c, metre2, 350);
    await c.say('İki öğrenci aynı yere vardı; biri 300, öteki 350 metre yol aldı.', { speak: 'İki öğrenci aynı yere vardı; biri üç yüz, öteki üç yüz elli metre yol aldı.' });
    c.note('<b>Alınan yol (x):</b> yörüngenin uzunluğu; skaler; birimi metre.<br>160 km + 120 km = 280 km', 'Alınan yol', 'yol');
  }

  /* ---- Sahne 3 · Yer değiştirme ---- */
  async function yerDegistirme(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    const iA = izgara(c, g, { x: 40, y: 50, kare: 60, sutun: 5, satir: 6, olcek: '1 kare = 200 m' }), iB = izgara(c, g, { x: 540, y: 50, kare: 60, sutun: 7, satir: 6, olcek: '1 kare = 20 m' });
    yonGulu(c, g, 440, 110, { r: 26 });
    const A = iA.P(2, 1), B = iA.P(2, 5), C = iB.P(1, 1), D = iB.P(6, 1);
    const gA = c.S('g', {}, g), gB = c.S('g', {}, g);
    const yolA = guzergah(c, gA, `M ${A[0]} ${A[1]} C 40 350 20 250 70 215 C 110 185 60 110 ${B[0]} ${B[1]}`, { taban: 'none' });
    const yolA2 = guzergah(c, gA, `M ${A[0]} ${A[1]} C 320 340 300 270 170 262 C 30 254 40 196 150 188 C 280 180 280 118 ${B[0]} ${B[1]}`, { taban: 'none' });
    const yolC = guzergah(c, gB, `M ${C[0]} ${C[1]} Q 750 110 ${D[0]} ${D[1]}`, { taban: 'none' });
    nokta(c, gA, A[0], A[1]); nokta(c, gA, B[0], B[1]); nokta(c, gB, C[0], C[1]); nokta(c, gB, D[0], D[1]);
    yazi(c, gA, A[0] + 20, A[1] + 34, 'A', { size: 28, hiza: 'start' }); yazi(c, gA, B[0] + 20, B[1] - 12, 'B', { size: 28, hiza: 'start' });
    yazi(c, gB, C[0] - 4, C[1] + 40, 'C', { size: 28 }); yazi(c, gB, D[0] + 4, D[1] + 40, 'D', { size: 28 });
    const nA = nokta(c, gA, A[0], A[1], { r: 10, renk: RENK.a, cerceve: RENK.yazi }), nC = nokta(c, gB, C[0], C[1], { r: 10, renk: RENK.a, cerceve: RENK.yazi });
    gizle(gA, gB);
    await belir(c, g, 400);
    await belir(c, gA, 350);
    await par(yurut(c, yolA, nA, 0, 1, 3000), c.say('Sezgin bisikletle kıvrımlı bir yoldan A’dan B’ye gidiyor.', { speak: 'Sezgin bisikletle kıvrımlı bir yoldan a noktasından be noktasına gidiyor.' }));
    await belir(c, gB, 350);
    await par(yurut(c, yolC, nC, 0, 1, 3000), c.say('Sonra yürüyerek yay biçimli bir yoldan C’den D’ye geçiyor.', { speak: 'Sonra yürüyerek yay biçimli bir yoldan ce noktasından de noktasına geçiyor.' }));
    const oA = ok(c, gA, A[0], A[1], B[0], B[1], { renk: YER, kalin: 7 }), oC = ok(c, gB, C[0], C[1], D[0], D[1], { renk: YER, kalin: 7 });
    gA.appendChild(nA); gB.appendChild(nC);
    await par(okCiz(c, oA, 900), okCiz(c, oC, 900));
    await c.say('İki krokide de başladığı noktadan bittiği noktaya düz bir ok çizelim.');
    const eA = yazi(c, gA, A[0] + 16, 240, 'kuzey, 800 m', { size: 24, renk: YER, hiza: 'start' });
    await belir(c, eA, 350);
    await c.say('Bisiklet krokisinde ok kuzeye 4 kare, yani 800 metre uzanıyor.', { speak: 'Bisiklet krokisinde ok kuzeye dört kare, yani sekiz yüz metre uzanıyor.' });
    const eC = yazi(c, gB, (C[0] + D[0]) / 2, C[1] + 38, 'doğu, 100 m', { size: 24, renk: YER });
    await belir(c, eC, 350);
    await c.say('Yürüyüş krokisinde ok doğuya 5 kare, yani 100 metre uzanıyor.', { speak: 'Yürüyüş krokisinde ok doğuya beş kare, yani yüz metre uzanıyor.' });
    // Daha kıvrımlı yol: ok yerinde kalır.
    noktaKoy(nA, A);
    await sol(c, yolA.iz, 0.25, 400);
    await yurut(c, yolA2, nA, 0, 1, 2800);
    await c.choice({ tag: 'Düşün', q: 'Sezgin A’dan B’ye çok daha kıvrımlı bir yoldan gitseydi çizdiğimiz <b>ok</b> nasıl değişirdi?',
      options: ['Uzardı; yol uzadıkça ok da uzar', 'Kıvrılırdı; ok yolu izler', 'Değişmezdi; ok yalnızca başlangıca ve bitişe bakıyor'], answer: 2,
      hints: ['Uzayan, alınan yoldur. Ok A’dan B’ye düz çizildi; A ve B yerinde durdukça boyu 800 m kalır.', 'Ok yörüngeyi izlemez; iki krokide de yol eğriydi ama ok dümdüz çizildi.', ''],
      right: 'Evet. A ve B yerinde durdukça ok aynı kalır.' });
    await par(kirp(c, oA), kirp(c, oC));
    await c.say('İki okun ortak yanı: ikisi de ilk konumdan son konuma çizildi.');
    await par(kirp(c, yolA2.iz), kirp(c, yolC.iz));
    await c.say('Yolun kıvrımı oku değiştirmez; ok yalnızca başa ve sona bakar.', { speak: '[thoughtful] Yolun kıvrımı oku değiştirmez; ok yalnızca başa ve sona bakar.' });
    await c.say('Son konum ile ilk konum arasındaki yönlü uzaklığa <b>yer değiştirme</b> denir.');
    await c.say('Yer değiştirmenin yönü vardır; vektörel bir niceliktir, birimi metredir.');
    const sem = dizi(c, g, 440, 270, [{ t: 'Δx', ok: true, ara: 0 }], { size: 44, renk: YER, hiza: 'middle' });
    await belir(c, sem, 350);
    await c.say('Sembolü, üstünde ok olan Δx’tir.', { speak: 'Sembolü, üstünde ok olan delta iks’tir.' });
    await kaybol(c, g, 400);
    // İki şehir: yol hangisi olursa olsun yer değiştirme aynı
    const k = c.S('g', {}, svg), s = sehir(c, k, 260, 320, 1.5);
    const araclar = [nokta(c, k, s.A[0], s.A[1], { r: 10, renk: RENK.a, cerceve: RENK.yazi }), nokta(c, k, s.A[0], s.A[1], { r: 10, renk: RENK.a, cerceve: RENK.yazi })];
    const oS = ok(c, k, s.A[0] + 14, s.A[1], s.B[0] - 14, s.B[1], { renk: YER, kalin: 7 }); oS.style.display = 'none';
    await belir(c, k, 400);
    await par(c.say('A’dan B’ye 160 ya da 120 kilometrelik yoldan gidenlerin yer değiştirmesi aynıdır.', { speak: 'a şehrinden be şehrine yüz altmış ya da yüz yirmi kilometrelik yoldan gidenlerin yer değiştirmesi aynıdır.' }), (async () => {
      s.y2.boya(1); s.y2.iz.style.opacity = 0;
      await par(yurut(c, s.y1, araclar[0], 0, 1, 2600), belir(c, s.y2.iz, 2600), c.tween(2600, (e) => noktaKoy(araclar[1], s.y2.yer(1 - e))));
      oS.style.display = ''; await okCiz(c, oS, 800);
      await belir(c, dizi(c, k, 500, 300, [{ t: 'Δx', ok: true, ara: 0 }], { size: 34, renk: YER, hiza: 'middle' }), 300);
    })());
    c.note('<b>Yer değiştirme (Δ' + VX + '):</b> ilk konumdan son konuma çizilen vektör.<br>C’den D’ye, doğuya 100 m.', 'Yer değiştirme', 'yer');
  }

  /* ---- Sahne 4 · Konumlardan hesap ---- */
  async function hesap(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    yonOku(c, g, 500, 46);
    const sd = sayiDogrusu(c, g, { x0: 150, x1: 850, y: 330, min: 0, max: 5, adim: 1 });
    yazi(c, g, 118, 340, 'A', { size: 28, hiza: 'end' }); halka(c, g, sd.x(0), 330, 15);
    const kg = c.S('g', {}, g);
    kutu(c, kg, -24, -52, 48, 48, { renk: RENK.yazi, fill: '#4a3a22', rx: 4 }); cizgi(c, kg, -24, -28, 24, -28, { renk: RENK.yazi, kalin: 2 });
    const kKoy = (v) => kg.setAttribute('transform', `translate(${sd.x(v)} 330)`); kKoy(0);
    const kGit = (a, b, ms) => c.tween(ms, (e) => kKoy(lerp(a, b, e)), ease.inOut);
    const model = dizi(c, g, 500, 506, [{ t: 'Δx', ok: true }, '=', { t: 'x', ok: true, alt: 'son' }, '−', { t: 'x', ok: true, alt: 'ilk' }], { size: 34, hiza: 'middle' });
    await belir(c, g, 400);
    await c.say('Yer değiştirmeyi konumlardan hesaplarız: son konumdan ilk konum çıkarılır.');
    const o1 = ok(c, g, sd.x(0), 240, sd.x(4), 240, { renk: RENK.a, kalin: 7 }), sayac = yazi(c, g, 150, 130, 'yol: 4 m', { size: 30, renk: YOL, hiza: 'start' });
    sayac.style.opacity = 0;
    await par(okCiz(c, o1, 1000), kGit(0, 4, 1000)); await belir(c, sayac, 300);
    await c.say('Ece bir kutuyu A noktasından doğuya 4 metre itiyor.', { speak: 'Ece bir kutuyu a noktasından doğuya dört metre itiyor.' });
    const o2 = ok(c, g, sd.x(4), 195, sd.x(1), 195, { renk: RENK.b, kalin: 7 });
    await par(okCiz(c, o2, 900), kGit(4, 1, 900)); sayac.textContent = 'yol: 7 m'; await kirp(c, sayac, 400);
    await c.say('Sonra kutuyu batıya 3 metre geri çekiyor.', { speak: 'Sonra kutuyu batıya üç metre geri çekiyor.' });
    const eIlk = yazi(c, g, sd.x(0), 412, 'ilk', { size: 24, renk: YER }), eSon = yazi(c, g, sd.x(1), 412, 'son', { size: 24, renk: YER });
    gizle(eIlk, eSon); await belir(c, [eIlk, eSon], 350);
    await c.say('Referans noktası A: kutunun ilk konumu 0, son konumu 1 metre doğu.', { speak: 'Referans noktası a: kutunun ilk konumu sıfır, son konumu bir metre doğu.' });
    const o3 = ok(c, g, sd.x(0), 440, sd.x(1), 440, { renk: YER, kalin: 7 });
    await par(okCiz(c, o3, 600), kaybol(c, model, 300));
    const hes = dizi(c, g, 500, 506, [{ t: 'Δx', ok: true }, '=', '1', '−', '0', '=', '1 m'], { size: 34, hiza: 'middle', renk: YER });
    await belir(c, hes, 350);
    await c.say('Yer değiştirme 1 − 0 = 1 metre, doğu yönünde.', { speak: 'Yer değiştirme bir eksi sıfır eşittir bir metre, doğu yönünde.' });
    await kaybol(c, [eIlk, eSon], 250);
    sayac.textContent = 'yol: 4 + 3 = 7 m'; await kirp(c, sayac, 400);
    await c.say('Alınan yol ise bölümlerin toplamı: 4 + 3 = 7 metre.', { speak: 'Alınan yol ise bölümlerin toplamı: dört artı üç eşittir yedi metre.' });
    await par(c.say('Oklarla da aynısı çıkar: doğuya 4, batıya 3; bileşke doğuya 1.', { speak: 'Oklarla da aynısı çıkar: doğuya dört, batıya üç; bileşke doğuya bir.' }), (async () => {
      for (const o of [o1, o2, o3]) { await kirp(c, o, 700); await c.wait(250); }
    })());
    await c.choice({ tag: 'Uygula', q: 'Bir çocuk koridorda doğuya 10 m yürüdü, sonra batıya 6 m geri döndü. Hangisi doğru?',
      options: ['Yol 4 m; yer değiştirme doğuya 16 m', 'Yol 16 m; yer değiştirme doğuya 16 m', 'Yol 16 m; yer değiştirme doğuya 4 m'], answer: 2,
      hints: ['İkisi yer değiştirmiş: yol için bölümler toplanır (10 + 6), yer değiştirme için ilk ve son konuma bakılır.', 'Alınan yol ile yer değiştirme aynı şey değil; çocuk geri döndüğü için son konumu başlangıcın yalnızca 4 m doğusunda.', ''],
      right: 'Evet. Yol 10 + 6 = 16 m; son konum 4 m doğuda.' });
    await c.say('Yol için 10 ile 6 toplandı; yer değiştirme için baştan sona bakıldı.', { speak: '[thoughtful] Yol için on ile altı toplandı; yer değiştirme için baştan sona bakıldı.' });
    await par(kaybol(c, [hes, sayac, o3], 350), sol(c, o1, 0.25));
    kKoy(4);
    const eIlk2 = yazi(c, g, sd.x(4), 412, 'ilk', { size: 24 }), eSon2 = yazi(c, g, sd.x(1), 412, 'son', { size: 24 });
    gizle(eIlk2, eSon2);
    await par(belir(c, [eIlk2, eSon2], 350), kGit(4, 1, 1200), kirp(c, o2, 1200));
    await c.say('Ece’nin kutusunda yalnız dönüşe bakalım: konum 4 metreden 1 metreye indi.', { speak: 'Ece’nin kutusunda yalnız dönüşe bakalım: konum dört metreden bir metreye indi.' });
    const hes2 = dizi(c, g, 500, 506, [{ t: 'Δx', ok: true }, '=', '1', '−', '4', '=', '−3 m'], { size: 34, hiza: 'middle' });
    await belir(c, hes2, 350);
    await c.say('Son konumdan ilk konumu çıkaralım: 1 − 4 = −3 metre.', { speak: 'Son konumdan ilk konumu çıkaralım: bir eksi dört eşittir eksi üç metre.' });
    const eBati = yazi(c, g, sd.x(2.5), 176, 'batıya 3 m', { size: 26, renk: RENK.b });
    await belir(c, eBati, 350);
    await c.say('Doğuyu artı saydığımız için eksi işareti batıyı gösterir: batıya 3 metre.', { speak: 'Doğuyu artı saydığımız için eksi işareti batıyı gösterir: batıya üç metre.' });
    c.note('<b>Δ' + VX + ' = ' + VX + '<sub>son</sub> − ' + VX + '<sub>ilk</sub></b><br>Doğuya 4 m, batıya 3 m → yol 7 m, yer değiştirme doğuya 1 m.', 'Konumlardan hesap', 'hesap');
  }

  /* Sayı doğrusu üstünde koşucu: iki sayaç, yol izi ve yer değiştirme oku. */
  function kosuDuzeni(c, g, o) {
    const sd = sayiDogrusu(c, g, { x0: o.x0, x1: o.x1, y: o.y, min: 0, max: o.max, adim: 10 });
    yonOku(c, g, 500, o.y - 130);
    yazi(c, g, 270, 60, 'alınan yol', { size: 24, renk: YOL }); yazi(c, g, 730, 60, 'yer değiştirme', { size: 24, renk: YER });
    const v1 = yazi(c, g, 270, 112, '0 m', { size: 40, renk: YOL, kalin: 700 }), v2 = yazi(c, g, 730, 112, '0 m', { size: 40, renk: YER, kalin: 700 });
    const okY = o.y + (o.ustuste ? 74 : 136), izKalin = o.ustuste ? 18 : 8;
    const izler = c.S('g', {}, g), yerOk = ok(c, g, sd.x(0), okY, sd.x(0), okY, { renk: YER, kalin: 6 });
    const kg = c.S('g', {}, g); insan(c, kg, 0, 0, { s: 0.62 });
    const kKoy = (v) => kg.setAttribute('transform', `translate(${sd.x(v)} ${o.y - 5})`);
    const yaz = (yolT, v) => {
      const n = Math.round(v);
      v1.textContent = Math.round(yolT) + ' m'; v2.textContent = n > 0 ? 'doğuya ' + n + ' m' : n < 0 ? 'batıya ' + (-n) + ' m' : '0 m';
      yerOk.ayarla(sd.x(0), okY, sd.x(v), okY); kKoy(v);
    };
    yaz(0, 0);
    /* Koşucu 0'dan başlar, duraklara sırayla uğrar. Her bölümün izi bir alt satıra çizilir. */
    const kos = async (duraklar) => {
      let pos = 0, yolT = 0;
      for (let k = 0; k < duraklar.length; k++) {
        const a = pos, b = duraklar[k], y = o.y + 74 + 22 * k, t0 = yolT;
        if (k) cizgi(c, izler, sd.x(a), y - 22, sd.x(a), y, { renk: YOL, kalin: izKalin });
        const iz = cizgi(c, izler, sd.x(a), y, sd.x(a), y, { renk: YOL, kalin: izKalin });
        await c.tween(Math.abs(b - a) * 45 + 300, (e) => { const v = lerp(a, b, e); iz.setAttribute('x2', sd.x(v)); yaz(t0 + Math.abs(v - a), v); }, ease.inOut);
        yolT += Math.abs(b - a); pos = b; yaz(yolT, pos);
        await c.wait(350);
      }
    };
    const sifirla = () => { izler.replaceChildren(); yaz(0, 0); };
    return { sd, kos, sifirla, izler, kg };
  }

  /* ---- Sahne 5 · Hangisi büyük, ne zaman eşit? ---- */
  async function hangisi(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    const kd = kosuDuzeni(c, g, { x0: 140, x1: 860, y: 320, max: 60, ustuste: true });
    await belir(c, g, 400);
    await par(kd.kos([60]), c.say('Bir koşucu düz yolda, hiç dönmeden doğuya 60 metre koşuyor.', { speak: 'Bir koşucu düz yolda, hiç dönmeden doğuya altmış metre koşuyor.' }));
    await c.say('Aldığı yol 60 metre; yer değiştirmesi de doğuya 60 metre.', { speak: 'Aldığı yol altmış metre; yer değiştirmesi de doğuya altmış metre.' });
    await c.say('Doğrusal yolda yön değiştirmeden gidilirse yol ile yer değiştirmenin büyüklüğü eşittir.', { speak: 'Doğrusal yolda yön değiştirmeden gidilirse [short pause] yol ile yer değiştirmenin büyüklüğü eşittir.' });
    await kaybol(c, g, 400);
    // Tablo: kara yolu ve kuş uçuşu uzaklıklar (yaklaşık)
    const t = c.S('g', {}, svg);
    yazi(c, t, 400, 78, 'yaklaşık uzaklıklar', { size: 26, renk: RENK.soluk });
    const tb = tablo(c, t, { x: 50, y: 100, satir: 62, size: 26, sutunlar: [{ ad: 'güzergâh', w: 280 }, { ad: 'kara yolu (km)', w: 210 }, { ad: 'kuş uçuşu (km)', w: 210 }] });
    const kucuk = c.S('g', {}, t);
    const ky = yol(c, kucuk, 'M 800 420 C 750 350 900 330 850 280 C 805 235 930 235 950 180', { renk: YOL, kalin: 7 });
    const ko = ok(c, kucuk, 800, 420, 950, 180, { renk: YER, kalin: 6 });
    nokta(c, kucuk, 800, 420, { r: 9 }); nokta(c, kucuk, 950, 180, { r: 9 });
    gizle(kucuk);
    await belir(c, t, 400);
    await c.say('Şimdi şehirler arası üç güzergâha bakalım.');
    await belir(c, kucuk, 400);
    await c.say('Kara yolu uzunluğu alınan yolu, kuş uçuşu uzaklık yer değiştirmenin büyüklüğünü verir.');
    const satir = async (h) => { const r = tb.satir(h, { renkler: [RENK.yazi, YOL, YER] }); r.style.opacity = 0; await belir(c, r, 350); };
    await satir(['Aydın–İzmir', '112', '89']);
    await c.say('Aydın ile İzmir arası kara yoluyla 112, kuş uçuşu 89 kilometre.', { speak: 'Aydın ile İzmir arası kara yoluyla yüz on iki, kuş uçuşu seksen dokuz kilometre.' });
    await satir(['İzmir–Trabzon', '1.309', '1.113']); await satir(['Trabzon–Erzurum', '262', '179']);
    await c.say('Öteki iki güzergâhta da kuş uçuşu uzaklık kara yolundan kısa.');
    await c.choice({ tag: 'Düşün', q: 'Bir yolcu “Kara yoluyla 262 km gittim; yer değiştirmemin büyüklüğü 300 km” diyor. Bu olabilir mi?',
      options: ['Olabilir; yol çok kıvrımlıysa', 'Olabilir; arada geri döndüyse', 'Olamaz; yer değiştirmenin büyüklüğü alınan yolu geçemez'], answer: 2,
      hints: ['Kıvrım yolu uzatır, yer değiştirmeyi değil; üç güzergâhta da kuş uçuşu uzaklık daha kısaydı.', 'Geri dönmek yer değiştirmeyi küçültür, yolu büyütür; yer değiştirme yine yoldan küçük kalır.', ''],
      right: 'Evet. Düz çizgiden kısa yol olmaz.' });
    await par(sol(c, ky, 0.3, 300), kirp(c, ko, 700));
    await c.say('İki nokta arasındaki en kısa çizgi düz çizgidir.');
    await belir(c, ky, 300);
    await c.say('Yer değiştirme oku o düz çizgidir; yol ondan kısa olamaz.');
    const kural = dizi(c, t, 400, 448, [{ t: 'yer değiştirmenin büyüklüğü', renk: YER }, '≤', { t: 'alınan yol', renk: YOL }], { size: 28, hiza: 'middle' });
    await belir(c, kural, 400);
    await c.say('Yer değiştirmenin büyüklüğü alınan yola en çok eşit olur, onu geçemez.');
    c.note('<b>Yer değiştirmenin büyüklüğü alınan yolu geçemez;</b> doğrusal yolda, dönmeden gidilirse eşittir.<br>89 km &lt; 112 km', 'Hangisi büyük?', 'buyuk');
  }

  /* ---- Sahne 6 · Başladığın yere dönünce ---- */
  async function basaDonus(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    const N = { oda: [190, 380], okul: [300, 120], spor: [690, 100], film: [800, 350] }, sira = [N.oda, N.okul, N.spor, N.film, N.oda];
    const gz = guzergah(c, g, 'M ' + sira.map((q) => q.join(' ')).join(' L '), { tabanKalin: 4, kalin: 8 });
    const boy = sira.slice(1).map((q, i) => Math.hypot(q[0] - sira[i][0], q[1] - sira[i][1])), top = boy.reduce((a, b) => a + b, 0);
    const kes = boy.map((_, i) => boy.slice(0, i + 1).reduce((a, b) => a + b, 0) / top);
    yer(c, g, ...N.oda, 'oda', 'alt'); yer(c, g, ...N.okul, 'okul', 'ust'); yer(c, g, ...N.spor, 'spor', 'ust'); yer(c, g, ...N.film, 'film', 'sag');
    halka(c, g, ...N.oda);
    yazi(c, g, 392, 508, 'alınan yol', { size: 24, renk: YOL, hiza: 'end' });
    kutu(c, g, 406, 484, 364, 30, { rx: 6, kalin: 2 });
    const dolgu = c.S('rect', { x: 409, y: 487, width: 0, height: 24, rx: 4, fill: YOL }, g);
    const kv = ok(c, g, ...N.oda, ...N.oda, { renk: KONUM, kalin: 6 });
    const kutay = nokta(c, g, ...N.oda, { r: 11, renk: RENK.a, cerceve: RENK.yazi });
    const adim = (t) => { const [x, y] = gz.yer(t); kv.ayarla(N.oda[0], N.oda[1], x, y); dolgu.setAttribute('width', 358 * t); };
    await belir(c, g, 400);
    await par(c.say('Kutay sabah odasından çıkıyor; okula gidiyor, spor yapıyor, film izliyor.'), (async () => {
      let t0 = 0;
      for (let i = 0; i < 3; i++) { await yurut(c, gz, kutay, t0, kes[i], 1500, adim); t0 = kes[i]; await c.wait(250); }
    })());
    await par(yurut(c, gz, kutay, kes[2], 1, 2200, adim), c.say('Gün sonunda yine odasına dönüyor.'));
    adim(1);
    const f1 = dizi(c, g, 495, 230, [{ t: 'x', ok: true, alt: 'son' }, '=', { t: 'x', ok: true, alt: 'ilk' }], { size: 36, hiza: 'middle', renk: KONUM });
    await belir(c, f1, 400);
    await c.say('İlk konumu odası, son konumu da odası.');
    const f2 = dizi(c, g, 495, 296, [{ t: 'Δx', ok: true }, '=', '0'], { size: 36, hiza: 'middle', renk: YER });
    await belir(c, f2, 400);
    await c.say('Son konumdan ilk konumu çıkarınca geriye sıfır kalır.', { speak: 'Son konumdan ilk konumu çıkarınca [short pause] geriye sıfır kalır.' });
    await c.choice({ tag: 'Düşün', q: 'Kutay’ın gün boyunca yer değiştirmesi ve aldığı yol için hangisi doğru?',
      options: ['Yer değiştirmesi sıfır; aldığı yol da sıfır', 'Yer değiştirmesi sıfır; aldığı yol sıfır değil', 'İkisi de sıfırdan büyük ve birbirine eşit'], answer: 1,
      hints: ['Okula giderken, spor yaparken, eve dönerken attığı her adım yola eklendi; başa dönmek yolu silmez.', '', 'İlk ve son konum aynı oda; aralarındaki yönlü uzaklık sıfırdır. Sıfırdan büyük olan yalnızca yol.'],
      right: 'Evet. Yol doldu, yer değiştirme sıfır kaldı.' });
    await par(kirp(c, dolgu, 700), kirp(c, gz.iz, 700));
    await c.say('Gün boyu attığı her adım alınan yola eklendi; yol geri sayılmaz.');
    await kaybol(c, [f1, f2], 300);
    const pist = c.S('g', {}, g);
    yol(c, pist, 'M 495 150 L 445 150 A 40 40 0 0 0 445 230 L 545 230 A 40 40 0 0 0 545 150 Z', { renk: YOL, kalin: 9 });
    cizgi(c, pist, 495, 138, 495, 162, { renk: RENK.yazi, kalin: 4 });
    yazi(c, pist, 495, 276, 'yol 400 m', { size: 26, renk: YOL }); yazi(c, pist, 495, 312, 'yer değiştirme 0', { size: 26, renk: YER });
    await belir(c, pist, 400);
    await c.say('Stadyumdaki tam tur da böyleydi: yol 400 metre, yer değiştirme sıfır.', { speak: 'Stadyumdaki tam tur da böyleydi: yol dört yüz metre, yer değiştirme sıfır.' });
    await c.say('Yol adım adım sayılır, yer değiştirme baştan sona çizilir.');
  }

  /* ---- Sahne 7 · Koşucuyu sen yönet ---- */
  async function kosucuyuYonet(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    const kd = kosuDuzeni(c, g, { x0: 100, x1: 900, y: 320, max: 80 }), sd = kd.sd;
    halka(c, g, sd.x(0), 320, 15);
    const bayraklar = c.S('g', {}, g); g.insertBefore(bayraklar, kd.kg);
    const bayrak = (v) => {
      const b = c.S('g', {}, bayraklar), x = sd.x(v);
      cizgi(c, b, x, 320, x, 224, { renk: RENK.b, kalin: 3 });
      c.S('path', { d: `M ${x} 224 L ${x + 30} 236 L ${x} 248 Z`, fill: RENK.b }, b);
      b.style.opacity = 0; return b;
    };
    const diz = async (duraklar) => { for (const v of duraklar) await belir(c, bayrak(v), 300); };
    const topla = async () => { await kaybol(c, [...bayraklar.children], 250); kd.sifirla(); };
    await belir(c, g, 400);
    await c.say('Düz bir yolda koşucuyu sen yöneteceksin.');
    await diz([60, 20]);
    await c.say('Duraklar bayrakla işaretli; koşucu sırayla hepsine uğrayacak.');
    await c.say('Üstte iki sayaç var: biri alınan yolu, öteki yer değiştirmeyi gösteriyor.');
    await topla();
    await c.say('Koşucu koşmadan önce iki sayacın ne göstereceğini kestir.');
    const gorevler = [
      { duraklar: [40], q: 'Koşucu doğuya 40 m koşup duracak. Sayaçlar ne gösterir?',
        sec: ['Yol 40 m; yer değiştirme doğuya 40 m', 'Yol 40 m; yer değiştirme sıfır', 'Yol 80 m; yer değiştirme doğuya 40 m'], d: 0,
        ip: ['', 'Koşucu başladığı yere dönmüyor; son konumu başlangıcın 40 m doğusunda.', 'Koşucu yalnızca gidiyor, dönmüyor; yol 40 m.'], sag: 'Evet. Hiç dönmediği için ikisi de 40 m.' },
      { duraklar: [60, 20], q: 'Koşucu doğuya 60 m koşacak, sonra batıya 40 m dönecek. Sayaçlar ne gösterir?',
        sec: ['Yol 20 m; yer değiştirme doğuya 100 m', 'Yol 100 m; yer değiştirme doğuya 100 m', 'Yol 100 m; yer değiştirme doğuya 20 m'], d: 2,
        ip: ['İkisi yer değiştirmiş: yol için bölümler toplanır, yer değiştirme için ilk ve son konuma bakılır.', 'Geri dönünce yol artar ama son konum başlangıca yaklaşır: 60 − 40 = 20.', ''], sag: 'Evet. Yol 60 + 40 = 100 m; son konum 20 m doğuda.' },
      { duraklar: [30, 0], q: 'Koşucu doğuya 30 m koşacak, sonra batıya 30 m dönecek. Sayaçlar ne gösterir?',
        sec: ['Yol 60 m; yer değiştirme sıfır', 'Yol sıfır; yer değiştirme sıfır', 'Yol 60 m; yer değiştirme doğuya 60 m'], d: 0,
        ip: ['', 'Başa dönmek koşulan 60 metreyi silmez; yol geri sayılmaz.', 'Son konum başlangıçla aynı; yer değiştirme sıfırdır.'], sag: 'Evet. Başa döndü: yol 60 m, yer değiştirme sıfır.' },
    ];
    for (let i = 0; i < gorevler.length; i++) {
      const gv = gorevler[i];
      if (i) await topla();
      await diz(gv.duraklar);
      await c.choice({ tag: 'Tahmin et', q: gv.q, options: gv.sec, answer: gv.d, hints: gv.ip, right: gv.sag });
      await kd.kos(gv.duraklar);
      await c.wait(900);
    }
    await c.say('İlk görevde iki sayaç aynı sayıyı gösterdi; koşucu hiç dönmedi.');
    await c.say('Geri dönünce yol artmaya devam etti, yer değiştirme küçüldü.', { speak: '[thoughtful] Geri dönünce yol artmaya devam etti, yer değiştirme küçüldü.' });
    await kaybol(c, g, 400);
    // Karşılaştırma tablosu
    const t = c.S('g', {}, svg), tb = tablo(c, t, { x: 70, y: 110, basliksiz: true, satir: 72, size: 26, sutunlar: [{ w: 400 }, { w: 460 }] });
    const satirlar = [['alınan yol', 'yer değiştirme'], ['skaler', 'vektörel'], ['yörüngeye bağlı', 'ilk ve son konuma bağlı'], ['başa dönünce sıfırlanmaz', 'başa dönünce sıfır']];
    const hucre = satirlar.map((s, r) => s.map((m, i) => { const [x, y] = tb.hucre(r, i); const e = yazi(c, t, x, y + (r ? 0 : 2), m, { size: r ? 26 : 30, renk: r ? RENK.yazi : (i ? YER : YOL), kalin: r ? 600 : 700 }); e.style.opacity = 0; return e; }));
    const cz = [cizgi(c, t, 70, 182, 930, 182, { kalin: 2 }), cizgi(c, t, 470, 116, 470, 392, { renk: RENK.ince, kalin: 2 })];
    gizle(cz);
    await belir(c, [...hucre[0], ...cz], 400);
    await par(c.say('Alınan yol skalerdir ve yörüngeye bağlıdır.'), (async () => { await belir(c, hucre[1][0], 350); await c.wait(900); await belir(c, hucre[2][0], 350); })());
    await par(c.say('Yer değiştirme vektöreldir; yalnızca ilk ve son konuma bağlıdır.'), (async () => { await belir(c, hucre[1][1], 350); await c.wait(900); await belir(c, hucre[2][1], 350); })());
    await belir(c, hucre[3], 400);
    await c.wait(1500);
    c.note('<b>Alınan yol:</b> skaler; yörüngeye bağlı; başa dönünce sıfırlanmaz.<br><b>Yer değiştirme:</b> vektörel; ilk ve son konuma bağlı; başa dönünce sıfır.', 'Yol ile yer değiştirme', 'tablo');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-e2', kicker: 'Konu E · Hareketin temel kavramları', title: 'Alınan yol ve yer değiştirme', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'Alınan yol ve yer değiştirme', hook: 'Stadyumda tam bir tur koştun ve başladığın çizgide durdun; ne kadar yol aldın, yerin ne kadar değişti?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Tam tur', goal: 'Bir turun sonunda neyin değiştiğini kestir.', run: tamTur },
      { title: 'Alınan yol', goal: 'İzlenen çizginin uzunluğunu bul.', run: alinanYol },
      { title: 'Yer değiştirme', goal: 'İlk konumdan son konuma ok çiz.', run: yerDegistirme },
      { title: 'Konumlardan hesap', goal: 'Yer değiştirmeyi son ve ilk konumdan hesapla.', run: hesap },
      { title: 'Hangisi büyük, ne zaman eşit?', goal: 'Yol ile yer değiştirmenin büyüklüğünü karşılaştır.', run: hangisi },
      { title: 'Başladığın yere dönünce', goal: 'Başa dönünce neyin sıfırlandığını bul.', run: basaDonus },
      { title: 'Koşucuyu sen yönet', goal: 'İki sayacı koşudan önce kestir.', run: kosucuyuYonet },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir bisikletli düz yolda doğuya 50 m gitti, sonra batıya 20 m geri döndü. Aldığı yol ve yer değiştirmesi nedir?',
        options: ['Yol 30 m; yer değiştirme doğuya 70 m', 'Yol 70 m; yer değiştirme doğuya 30 m', 'Yol 70 m; yer değiştirme doğuya 70 m'], answer: 1,
        why: ['İki nicelik yer değiştirmiş: yol için bölümler toplanır, yer değiştirme için ilk ve son konuma bakılır.', '50 + 20 = 70 m yol; son konum başlangıcın 30 m doğusunda.', 'Geri döndüğü için son konumu başlangıca yaklaştı; yer değiştirme yoldan küçüktür.'], scene: 3 },
      { q: 'Bir yüzücünün yer değiştirmesi sıfır çıktı. Hangisi kesin doğrudur?',
        options: ['Hiç hareket etmemiştir', 'Aldığı yol da sıfırdır', 'Son konumu ilk konumuyla aynıdır'], answer: 2,
        why: ['Gidip başladığı yere dönmüş de olabilir; yer değiştirme yine sıfır çıkar.', 'Başa dönmek yolu sıfırlamaz; yüzdüğü her metre yola eklenir.', 'Yer değiştirme son konum ile ilk konumun farkıdır; sıfırsa ikisi aynıdır.'], scene: 5 },
      { q: 'İskeleden doğuya 90 m açılan bir kayık, sonra batıya 150 m gidiyor. Kayığın aldığı yol ve yer değiştirmesi nedir?',
        options: ['Yol 60 m; yer değiştirme batıya 240 m', 'Yol 240 m; yer değiştirme doğuya 60 m', 'Yol 240 m; yer değiştirme batıya 60 m'], answer: 2,
        why: ['İkisi yer değiştirmiş: yol için bölümler toplanır (90 + 150), yer değiştirme için ilk ve son konuma bakılır.', 'Yol doğru ama yön yanlış: kayık iskeleyi geçip batıya çıktı, son konum iskelenin batısında.', '90 + 150 = 240 m yol; son konum iskelenin 150 − 90 = 60 m batısında.'], scene: 3 },
      { q: 'Berk ile Elif aynı kapıdan çıkıp pazar yerine gidiyor: Berk düz caddeden, Elif kıvrımlı sokaklardan. Berk “Elif’in yer değiştirmesi benimkinden büyük, çünkü o daha çok yürüdü” diyor. Berk haklı mı?',
        options: ['Haksız; ikisinin yer değiştirmesi aynıdır, çünkü ilk ve son konum aynı', 'Haklı; yol uzadıkça yer değiştirme de uzar', 'Haksız; Elif’in yer değiştirmesi daha küçüktür, çünkü kıvrılan yol oku kısaltır'], answer: 0,
        why: ['Yer değiştirme yalnızca ilk ve son konuma bakar; ikisi de aynı kapıdan pazar yerine gitti.', 'Daha çok yürümek yola eklenir; yer değiştirme yolun kıvrımını görmez.', 'Yolun kıvrımı oku ne uzatır ne kısaltır; ok yalnızca ilk ve son konumu birleştirir.'], scene: 2 },
    ],
    summary: ['<b>Yol adım adım sayılır, yer değiştirme baştan sona çizilir.</b>', 'Alınan yol yörüngenin uzunluğudur, skalerdir; yer değiştirme ilk konumdan son konuma çizilen vektördür.', 'Yer değiştirmenin büyüklüğü alınan yolu geçemez; başa dönünce yer değiştirme sıfır olur, yol olmaz.'],
    nextLesson: { href: 'e3-surat.html', label: 'Sonraki: Sürat: ortalama ve anlık ›' },
  });
})();
