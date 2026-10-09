/* D2 · FİZ.9.2.5 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/D-dogadaki-temel-kuvvetler.md
   Yazar notu: içerik MEB Fizik 9 s. 86–91 ve 124'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Dört kuvvetin rengi D1 ile aynıdır: kütle çekim yeşil, elektromanyetik sarı, güçlü nükleer mor, zayıf nükleer turuncu.
   Şiddet sıralaması, etki mesafesi için sayı, formül ve taşıyıcı parçacık yoktur. Sahne 2, 3 ve 6'daki karşılaştırma
   tabloları bütün satırlarıyla görünür; bu üç sahnede tahtadaki 25 kelime sınırı kullanıcı kararıyla aşılır. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, gizle, belir, sol, kaybol, par, ok, okCiz, kart } = KIT;
  const { lerp, ease } = Ders;

  const KC = 'var(--c3)', EM = 'var(--c5)', GN = 'var(--c4)', ZN = 'var(--c2)';
  const KUVVET = [['kütle çekim', KC], ['elektromanyetik', EM], ['güçlü nükleer', GN], ['zayıf nükleer', ZN]];
  const PROTON = '#e5484d', NOTRON = '#4f8ef7', CELIK = '#c9d1e6', TAHTA = '#b98552', GUNES = '#f6b93b';

  /* ---- Derse özel yardımcılar (D1'de de aynıları tanımlıdır) ---- */
  const yer = (g, x, y, s) => g.setAttribute('transform', `translate(${x} ${y})` + (s == null ? '' : ` scale(${s})`));
  const sira = async (...isler) => { for (const is of isler) await is(); };
  const acili = (x, y, r, a) => [x + r * Math.cos(a * Math.PI / 180), y + r * Math.sin(a * Math.PI / 180)];
  const yeniOk = (c, p, x1, y1, x2, y2, o) => { const g = ok(c, p, x1, y1, x2, y2, o); g.ayarla(x1, y1, x1, y1); g.uclar = [x1, y1, x2, y2]; return g; };
  const arti = (c, p, x, y, s = 9) => yol(c, p, `M ${x - s} ${y} L ${x + s} ${y} M ${x} ${y - s} L ${x} ${y + s}`, { renk: '#fff', kalin: Math.max(2, s * 0.4) });
  const eksi = (c, p, x, y, s = 9) => yol(c, p, `M ${x - s} ${y} L ${x + s} ${y}`, { renk: '#fff', kalin: Math.max(2, s * 0.4) });

  /* Çekirdek: n parçacıklı sıkı küme; proton kırmızı, nötron mavi. parcalar: [{ el, x, y, dx, dy, proton }], R: kümenin yarıçapı. */
  function cekirdek(c, p, x, y, o = {}) {
    const n = o.n || 7, r = o.r || 30, d = r * 1.9, g = c.S('g', {}, p);
    let yerler;
    if (n === 1) yerler = [[0, 0]];
    else if (n === 2) yerler = [[-d / 2, 0], [d / 2, 0]];
    else if (n === 4) yerler = [[-d / 2, -d / 2], [d / 2, -d / 2], [d / 2, d / 2], [-d / 2, d / 2]];
    else {
      yerler = [];
      for (let q = -6; q <= 6; q++) for (let s = -6; s <= 6; s++) yerler.push([d * (q + s / 2), d * s * 0.866]);
      const uz = (a) => Math.round(Math.hypot(a[0], a[1]) * 10);
      yerler.sort((a, b) => uz(a) - uz(b) || Math.atan2(a[1], a[0]) - Math.atan2(b[1], b[0]));
      yerler = yerler.slice(0, n);
    }
    const P = o.proton == null ? Math.floor(n / 2) : o.proton;
    const parcalar = yerler.map(([dx, dy], i) => {
      // Küçük kümede sırayla, büyük kümede dağınık: proton ve nötronlar şerit oluşturmasın.
      const proton = n > 19 ? (i * 29) % n < P : Math.floor((i + 1) * P / n) > Math.floor(i * P / n);
      const el = c.S('circle', { cx: x + dx, cy: y + dy, r, fill: proton ? PROTON : NOTRON, stroke: '#0c1226', 'stroke-width': Math.max(1.2, r * 0.08) }, g);
      return { el, x: x + dx, y: y + dy, dx, dy, proton };
    });
    return { g, parcalar, x, y, r, R: Math.max(...yerler.map((a) => Math.hypot(a[0], a[1]))) + r };
  }
  /* Çekirdeği saran, içe doğru oklar (bir arada tutma). */
  function icOklar(c, p, x, y, R, o = {}) {
    const n = o.n || 6, uz = o.uz || 70, bosluk = o.bosluk == null ? 12 : o.bosluk, bas = o.bas == null ? 30 : o.bas;
    return Array.from({ length: n }, (_, i) => {
      const a = bas + i * 360 / n, [x1, y1] = acili(x, y, R + bosluk + uz, a), [x2, y2] = acili(x, y, R + bosluk, a);
      return ok(c, p, x1, y1, x2, y2, { renk: o.renk || GN, kalin: o.kalin || 6, uc: o.uc || 16 });
    });
  }
  /* Çubuk mıknatıs: iki kutup iki tonla gösterilir. (x, y) merkez. */
  function miknatis(c, p, x, y, w, h, o = {}) {
    const g = c.S('g', {}, p), koyu = '#6b7694', acik = '#e8ecf5';
    c.S('rect', { x: x - w / 2, y: y - h / 2, width: w / 2, height: h, fill: o.ters ? acik : koyu }, g);
    c.S('rect', { x, y: y - h / 2, width: w / 2, height: h, fill: o.ters ? koyu : acik }, g);
    c.S('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 3, fill: 'none', stroke: acik, 'stroke-width': 2 }, g);
    return g;
  }
  function gunes(c, p, x, y, R) {
    return c.S('circle', { cx: x, cy: y, r: R, fill: GUNES, 'fill-opacity': 0.14, stroke: GUNES, 'stroke-width': 4 }, p);
  }
  function elmaCiz(c, p) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: 0, cy: 0, r: 14, fill: '#d9485f' }, g);
    yol(c, g, 'M 0 -13 Q 2 -20 7 -23', { renk: '#5a9e4b', kalin: 3 });
    return g;
  }
  /* Dört sütunlu tablonun başlığı: kuvvet adları kendi renkleriyle. */
  function tabloBasi(c, p, X0, CW, y) {
    const g = c.S('g', {}, p);
    KUVVET.forEach(([ad, renk], i) => {
      yazi(c, g, X0 + i * CW + CW / 2, y + 32, ad, { size: 22, renk });
      c.S('rect', { x: X0 + i * CW + 12, y: y + 44, width: CW - 24, height: 4, rx: 2, fill: renk }, g);
    });
    return g;
  }
  const nokta = (c, p, x, y, renk, r = 9) => c.S('circle', { cx: x, cy: y, r, fill: renk }, p);

  /* ---- Sahne 1 · Hangilerini fark ederiz? ---- */
  async function hangileri(c) {
    const svg = c.svg(1000, 562), BX = (i) => 50 + i * 229, BW = 213, MX = (i) => BX(i) + BW / 2, IY = 150, INIS = 290;
    const serit = c.S('g', {}, svg);
    const bolme = [kutu(c, serit, 40, 296, 454, 252, { renk: RENK.cizgi, kalin: 2 }), kutu(c, serit, 506, 296, 454, 252, { renk: RENK.cizgi, kalin: 2 })];
    const makro = c.S('g', {}, serit), mikro = c.S('g', {}, serit);
    yol(c, makro, 'M 152 529 Q 174 512 196 529 Q 174 546 152 529 Z', { renk: RENK.yazi }); c.S('circle', { cx: 174, cy: 529, r: 5, fill: RENK.yazi }, makro);
    yazi(c, makro, 300, 538, 'makro düzey', { size: 26 });
    daire(c, mikro, 646, 526, 11, { renk: RENK.yazi }); cizgi(c, mikro, 654, 534, 664, 545, { renk: RENK.yazi, kalin: 4 });
    yazi(c, mikro, 770, 538, 'mikro düzey', { size: 26 });
    gizle(serit); makro.style.opacity = 1; mikro.style.opacity = 1;
    const gr = KUVVET.map(([ad, renk], i) => { const g = c.S('g', {}, svg); kart(c, g, BX(i), 24, BW, 52, ad, { renk, yaziRenk: renk, size: 24 }); gizle(g); return g; });
    const ik = gr.map((g) => { const k = c.S('g', {}, g); gizle(k); return k; });
    // kütle çekim: düşen elma
    cizgi(c, ik[0], MX(0) - 62, IY + 60, MX(0) + 62, IY + 60, { renk: RENK.ince });
    const elma = elmaCiz(c, ik[0]); yer(elma, MX(0) - 12, IY - 44);
    const eOk = yeniOk(c, ik[0], MX(0) + 28, IY - 36, MX(0) + 28, IY + 36, { renk: KC });
    // elektromanyetik: iğneyi çeken mıknatıs
    cizgi(c, ik[1], MX(1) - 62, IY + 60, MX(1) + 62, IY + 60, { renk: RENK.ince });
    miknatis(c, ik[1], MX(1) - 8, IY - 44, 96, 24);
    const igne = cizgi(c, ik[1], MX(1) - 36, IY + 56, MX(1) + 20, IY + 56, { renk: CELIK, kalin: 3 });
    const mOk = yeniOk(c, ik[1], MX(1) + 60, IY + 44, MX(1) + 60, IY - 26, { renk: EM });
    // güçlü nükleer: bir arada duran çekirdek
    const n2 = cekirdek(c, ik[2], MX(2), IY + 6, { n: 7, r: 11 });
    icOklar(c, ik[2], MX(2), IY + 6, n2.R, { uz: 22, bosluk: 8, kalin: 4, uc: 11 });
    // zayıf nükleer: parçalanan çekirdek
    const n3 = cekirdek(c, ik[3], MX(3), IY + 6, { n: 7, r: 11 }), kiv = c.S('g', {}, ik[3]);
    [[0, -40, 0, -24], [0, 24, 0, 40], [-7, -7, 7, 7], [-7, 7, 7, -7]].forEach(([x1, y1, x2, y2]) => cizgi(c, kiv, MX(3) + x1, IY + 6 + y1, MX(3) + x2, IY + 6 + y2, { renk: ZN, kalin: 3 }));
    gizle(kiv);
    const ayir = (e) => n3.parcalar.forEach((p) => p.el.setAttribute('transform', `translate(${(p.dx < -1 ? -26 : 26) * e} 0)`));

    await belir(c, gr, 500);
    await c.say('Doğada dört temel kuvvet var; her birini bir olayla tanıdık.');
    await belir(c, [ik[0], ik[1]], 300);
    await par(c.say('Kütle çekim kuvveti elmayı düşürür; elektromanyetik kuvvet iğneyi mıknatısa çeker.'),
      sira(() => par(c.tween(700, (e) => yer(elma, MX(0) - 12, lerp(IY - 44, IY + 46, e)), ease.in), okCiz(c, eOk, 500)), () => c.wait(500),
        () => par(c.tween(450, (e) => { const y = lerp(IY + 56, IY - 29, e); igne.setAttribute('y1', y); igne.setAttribute('y2', y); }, ease.in), okCiz(c, mOk, 450))));
    await belir(c, ik[2], 400);
    await c.say('Güçlü nükleer kuvvet çekirdeği bir arada tutar.');
    await belir(c, ik[3], 400);
    await par(c.say('Zayıf nükleer kuvvet çekirdeğin yapısını değiştirir.'), sira(() => c.wait(500), () => c.tween(900, ayir, ease.out), () => belir(c, kiv, 300)));
    await belir(c, serit, 500);
    await c.say('Kuvvetlerin bazıları makro, bazıları mikro düzeyde etkili olur.');
    const vurgula = (i) => { bolme.forEach((b, k) => b.setAttribute('stroke', k === i ? RENK.yazi : RENK.cizgi)); return par(sol(c, i === 0 ? mikro : makro, 0.35, 250), belir(c, i === 0 ? makro : mikro, 250)); };
    await vurgula(0);
    await c.say('Makro düzeydeki etkiler günlük hayatta kolayca gözlemlenir ve ölçülür.');
    await vurgula(1);
    await c.say('Mikro düzeydeki etkiler ise kolayca gözlemlenemez.');
    bolme.forEach((b) => b.setAttribute('stroke', RENK.cizgi)); await belir(c, makro, 250);
    await c.choice({ tag: 'Uygula', q: 'Dört temel kuvvetten hangilerinin etkisini gündelik hayatta doğrudan fark edersin?',
      options: ['Güçlü ve zayıf nükleer kuvvet', 'Dördünü de aynı kolaylıkla', 'Kütle çekim ve elektromanyetik kuvvet'], answer: 2,
      hints: ['Bu iki kuvvet yalnızca atom çekirdeğinde etkilidir; çekirdek mikro düzeydir, gözle görülmez.',
        'Düşen elmayı ve mıknatısı her gün görürsün; çekirdeğin içini göremezsin. İki kuvvet makro, iki kuvvet mikro düzeyde kalır.', ''],
      right: 'Evet. Bu ikisinin etkisi makro düzeyde, gözünün önündedir.' });
    const indir = (...gs) => c.tween(1000, (e) => gs.forEach((g) => yer(g, 0, INIS * e)));
    await par(c.say('İki nükleer kuvvet yalnızca atom çekirdeğinde etkilidir; çekirdek mikro düzeydir.'), indir(gr[2], gr[3]));
    await par(c.say('Kütle çekim ve elektromanyetik kuvvetin etkisini ise her gün görürüz.'), indir(gr[0], gr[1]));
    await c.tween(600, (e) => { yer(serit, 0, -150 * e); gr.forEach((g) => yer(g, 0, INIS - 150 * e)); });
    await c.choice({ tag: 'Düşün', q: 'Güçlü nükleer kuvveti doğrudan fark etmiyoruz. Öyleyse gündelik hayatta etkisiz mi?',
      options: ['Evet; fark edilmeyen kuvvet bir şey yapmaz', 'Hayır; çevremizdeki atomların çekirdeğini o bir arada tutar', 'Evet; yalnızca Güneş’te etkilidir'], answer: 1,
      hints: ['Görememek etkisiz demek değildir. Güçlü nükleer kuvvet olmasa çekirdekteki protonlar birbirini iter, çekirdek dağılırdı.', '',
        'Güneş bir örnekti. Bu kuvvet atom çekirdeğinin bulunduğu her yerde, çekirdeğin içinde etkilidir.'],
      right: 'Evet. Göremesek de her atomun çekirdeğinde iş görür.' });
    await kaybol(c, [serit, ...gr]);

    // Masa → atomlar → çekirdek
    const z = c.S('g', {}, svg), masa = c.S('g', {}, z), atomlar = c.S('g', {}, z), cek = c.S('g', {}, z);
    c.S('rect', { x: 50, y: 300, width: 210, height: 14, rx: 4, fill: TAHTA }, masa);
    cizgi(c, masa, 72, 314, 72, 408, { renk: TAHTA, kalin: 8 }); cizgi(c, masa, 238, 314, 238, 408, { renk: TAHTA, kalin: 8 });
    c.S('rect', { x: 76, y: 288, width: 84, height: 10, fill: '#d9a441' }, masa); c.S('path', { d: 'M 160 288 L 176 293 L 160 298 Z', fill: '#e0b089' }, masa);
    c.S('ellipse', { cx: 214, cy: 288, rx: 24, ry: 13, fill: '#8a93a8' }, masa);
    yazi(c, masa, 155, 450, 'masa', { size: 26, renk: RENK.soluk });
    cizgi(c, atomlar, 155, 296, 392, 214, { renk: RENK.cizgi, kalin: 2, kesik: '6 8' }); cizgi(c, atomlar, 155, 316, 392, 366, { renk: RENK.cizgi, kalin: 2, kesik: '6 8' });
    daire(c, atomlar, 490, 290, 118, { renk: RENK.cizgi, fill: RENK.koyu });
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { daire(c, atomlar, 490 + i * 62, 290 + j * 62, 24, { renk: RENK.soluk, kalin: 2 }); c.S('circle', { cx: 490 + i * 62, cy: 290 + j * 62, r: 4, fill: RENK.yazi }, atomlar); }
    yazi(c, atomlar, 490, 450, 'atomlar', { size: 26, renk: RENK.soluk });
    cizgi(c, cek, 494, 286, 742, 214, { renk: RENK.cizgi, kalin: 2, kesik: '6 8' }); cizgi(c, cek, 494, 294, 742, 366, { renk: RENK.cizgi, kalin: 2, kesik: '6 8' });
    daire(c, cek, 830, 290, 118, { renk: RENK.cizgi, fill: RENK.koyu });
    const nk = cekirdek(c, cek, 830, 290, { n: 7, r: 17 });
    const tutma = icOklar(c, cek, 830, 290, nk.R, { uz: 36, bosluk: 8, kalin: 5, uc: 14 });
    yazi(c, cek, 830, 450, 'çekirdek', { size: 26, renk: RENK.soluk });
    gizle(masa, atomlar, cek, tutma);
    await belir(c, masa);
    await par(c.say('Masa, kalem, taş: hepsi atomlardan oluşur.'), sira(() => c.wait(900), () => belir(c, atomlar, 600)));
    await belir(c, cek, 600); await belir(c, tutma, 500);
    await c.say('Bu atomların çekirdeği, güçlü nükleer kuvvet sayesinde dağılmaz.');
    await c.say('Görememek etkisiz demek değildir; karşılaştırırken dört kuvvete de bakacağız.', { speak: '[thoughtful] Görememek etkisiz demek değildir; karşılaştırırken dört kuvvete de bakacağız.' });
  }

  /* ---- Sahne 2 · İlk iki soru: neyle ilgili, ne yapar? ---- */
  async function ilkIkiSoru(c) {
    const svg = c.svg(1000, 562), X0 = 200, CW = 190, MX = (i) => X0 + i * CW + CW / 2, TOP = (r) => 86 + r * 204;
    const bas = tabloBasi(c, svg, X0, CW, 26);
    const satirAd = (r, satirlar) => {
      const g = c.S('g', {}, svg);
      cizgi(c, g, 30, TOP(r), 960, TOP(r), { renk: RENK.ince, kalin: 1.5 });
      satirlar.forEach((m, k) => yazi(c, g, 112, TOP(r) + 108 - (satirlar.length - 1) * 16 + k * 32, m, { size: 26 }));
      gizle(g); return g;
    };
    const hucre = (r, x, satirlar, ciz) => {
      const g = c.S('g', {}, svg);
      ciz(g, x, TOP(r) + 68);
      satirlar.forEach((m, k) => yazi(c, g, x, TOP(r) + 158 - (satirlar.length - 1) * 14 + k * 28, m, { size: 24 }));
      gizle(g); return g;
    };
    const beyaz = { renk: RENK.yazi, fill: RENK.koyu }, kucuk = { kalin: 5, uc: 12 };
    const XN = X0 + 3 * CW; // iki nükleer sütunun arası
    const pn = (g, x, y) => { nokta(c, g, x - 24, y, PROTON, 20); nokta(c, g, x + 24, y, NOTRON, 20); };
    const s0 = satirAd(0, ['Neyle', 'ilgili?']), s1 = satirAd(1, ['Ne', 'yapar?']);
    const h0 = [
      hucre(0, MX(0), ['kütle'], (g, x, y) => { daire(c, g, x - 22, y - 2, 26, beyaz); daire(c, g, x + 34, y + 10, 13, beyaz); }),
      hucre(0, MX(1), ['elektrik yükü,', 'manyetik kutup'], (g, x, y) => {
        daire(c, g, x - 62, y - 8, 15, beyaz); arti(c, g, x - 62, y - 8, 7); daire(c, g, x - 24, y - 8, 15, beyaz); eksi(c, g, x - 24, y - 8, 7);
        miknatis(c, g, x + 44, y - 8, 64, 22);
      }),
      hucre(0, MX(2), ['proton, nötron'], pn),
      hucre(0, MX(3), ['proton, nötron'], pn),
    ];
    const h1 = [
      hucre(1, MX(0), ['çeker'], (g, x, y) => { daire(c, g, x - 52, y, 16, beyaz); daire(c, g, x + 52, y, 16, beyaz); ok(c, g, x - 32, y, x - 4, y, { renk: KC, ...kucuk }); ok(c, g, x + 32, y, x + 4, y, { renk: KC, ...kucuk }); }),
      hucre(1, MX(1), ['iter ya da çeker'], (g, x, y) => {
        nokta(c, g, x - 14, y - 22, RENK.yazi, 8); nokta(c, g, x + 14, y - 22, RENK.yazi, 8); ok(c, g, x - 28, y - 22, x - 64, y - 22, { renk: EM, ...kucuk }); ok(c, g, x + 28, y - 22, x + 64, y - 22, { renk: EM, ...kucuk });
        nokta(c, g, x - 64, y + 22, RENK.yazi, 8); nokta(c, g, x + 64, y + 22, RENK.yazi, 8); ok(c, g, x - 50, y + 22, x - 12, y + 22, { renk: EM, ...kucuk }); ok(c, g, x + 50, y + 22, x + 12, y + 22, { renk: EM, ...kucuk });
      }),
      hucre(1, MX(2), ['bir arada tutar'], (g, x, y) => { const n = cekirdek(c, g, x, y, { n: 7, r: 10 }); icOklar(c, g, x, y, n.R, { uz: 17, bosluk: 6, kalin: 4, uc: 10 }); }),
      hucre(1, MX(3), ['dönüştürür'], (g, x, y) => { nokta(c, g, x - 46, y, NOTRON, 17); nokta(c, g, x + 46, y, PROTON, 17); ok(c, g, x - 22, y, x + 22, y, { renk: ZN, ...kucuk }); }),
    ];
    const altCizgi = cizgi(c, svg, 30, TOP(2), 960, TOP(2), { renk: RENK.ince, kalin: 1.5 });
    gizle(bas, altCizgi);

    await belir(c, bas);
    await c.say('Karşılaştırmak, dört kuvvete aynı soruları sormaktır.');
    await belir(c, s0, 300);
    await c.say('Birinci soru: kuvvet neyle ilgili?', { speak: '[curious] Birinci soru: kuvvet neyle ilgili?' });
    await belir(c, h0[0], 300);
    await c.say('Kütle çekim kuvveti kütleyle ilgilidir; maddeler onu kütleleri nedeniyle uygular.');
    await belir(c, h0[1], 300);
    await c.say('Elektromanyetik kuvvet elektrik yükleriyle ve manyetik kutuplarla ilgilidir.');
    await belir(c, [h0[2], h0[3]], 300);
    await c.say('İki nükleer kuvvet, çekirdekteki proton ve nötronlarla ilgilidir.');
    await par(sol(c, [s0, ...h0], 0.5), belir(c, [s1, altCizgi], 300));
    await c.say('İkinci soru: kuvvet ne yapar?');
    await belir(c, h1[0], 300);
    await c.say('Kütle çekim kuvveti, kütleleri birbirine doğru çeker.');
    await belir(c, h1[1], 300);
    await c.say('Elektromanyetik kuvvet iter ya da çeker.');
    await belir(c, h1[2], 300);
    await c.say('Güçlü nükleer kuvvet proton ve nötronları bir arada tutar.');
    await belir(c, h1[3], 300);
    await c.say('Zayıf nükleer kuvvet proton ve nötronların başka parçacıklara dönüşmesini sağlar.');
    // Soru: iki nükleer sütunu iki satırda birlikte oku. Tablonun tamamı görünür kalır.
    await belir(c, [s0, ...h0], 300);
    await c.choice({ tag: 'Uygula', q: 'Hangisi güçlü ve zayıf nükleer kuvvetin ortak yanıdır?',
      options: ['İkisi de çekirdeği bir arada tutar', 'Ortak yanları yoktur; iki kuvvet her bakımdan farklıdır', 'İkisi de çekirdekteki proton ve nötronlarla ilgilidir'], answer: 2,
      hints: ['Bu, “ne yapar” sorusunun cevabıdır ve iki kuvvette farklıdır: bir arada tutan yalnızca güçlü nükleer kuvvettir.',
        'Temel kuvvetler hiçbir bakımdan benzemez sanma. Bu ikisi farklı işler yapar ama ikisi de proton ve nötronlarla ilgilidir.', ''],
      right: 'Evet. “Neyle ilgili” sorusuna ikisi aynı cevabı verir.' });
    const cerceve = (p, r, i, renk) => c.S('rect', { x: X0 + i * CW + 10, y: TOP(r) + 12, width: CW - 20, height: 180, rx: 12, fill: 'none', stroke: renk, 'stroke-width': 4 }, p);
    const ayni = c.S('g', {}, svg);
    cerceve(ayni, 0, 2, RENK.yazi); cerceve(ayni, 0, 3, RENK.yazi);
    yol(c, ayni, `M ${XN - 8} ${TOP(0) + 62} L ${XN + 8} ${TOP(0) + 62} M ${XN - 8} ${TOP(0) + 74} L ${XN + 8} ${TOP(0) + 74}`, { renk: RENK.yazi, kalin: 4 });
    gizle(ayni); await belir(c, ayni, 400);
    await c.say('Bir soruya aynı cevabı veren kuvvetler, o bakımdan benzerdir.');
    const farkli = c.S('g', {}, svg);
    cerceve(farkli, 1, 2, GN); cerceve(farkli, 1, 3, ZN);
    yol(c, farkli, `M ${XN - 8} ${TOP(1) + 62} L ${XN + 8} ${TOP(1) + 62} M ${XN - 8} ${TOP(1) + 74} L ${XN + 8} ${TOP(1) + 74} M ${XN + 6} ${TOP(1) + 52} L ${XN - 6} ${TOP(1) + 84}`, { renk: RENK.yazi, kalin: 4 });
    gizle(farkli); await belir(c, farkli, 400);
    await c.say('Aynı iki kuvvet başka bir soruda farklı cevap verebilir.');
  }

  /* ---- Sahne 3 · Son iki soru: nerede etkili, ne kadar uzağa? ----
     Tablo sahne 2'deki iki satırla açılır; üçüncü ve dördüncü satır altına eklenir. */
  async function sonIkiSoru(c) {
    const svg = c.svg(1000, 562), X0 = 180, CW = 195, MX = (i) => X0 + i * CW + CW / 2, TOP = (r) => 54 + r * 64;
    const bas = tabloBasi(c, svg, X0, CW, 2);
    const yazY = (r, n, k) => TOP(r) + (n === 1 ? 40 : 27 + k * 26);
    const satir = (r, ad, hucreler) => {
      const etiket = c.S('g', {}, svg);
      cizgi(c, etiket, 30, TOP(r), 960, TOP(r), { renk: RENK.ince, kalin: 1.5 });
      ad.forEach((m, k) => yazi(c, etiket, 105, yazY(r, ad.length, k), m, { size: 22 }));
      const hs = hucreler.map((satirlar, i) => { const h = c.S('g', {}, svg); satirlar.forEach((m, k) => yazi(c, h, MX(i), yazY(r, satirlar.length, k), m, { size: 22, kalin: 500 })); return h; });
      gizle(etiket, hs);
      return { etiket, hs, hepsi: [etiket, ...hs] };
    };
    const DISINDA = ['çekirdeğin', 'dışında da'], CEKIRDEKTE = ['yalnızca', 'çekirdekte'], SONSUZ = ['sonsuz', 'kabul edilir'];
    const r0 = satir(0, ['Neyle', 'ilgili?'], [['kütle'], ['elektrik yükü,', 'manyetik kutup'], ['proton, nötron'], ['proton, nötron']]);
    const r1 = satir(1, ['Ne', 'yapar?'], [['çeker'], ['iter ya da çeker'], ['bir arada tutar'], ['dönüştürür']]);
    const r2 = satir(2, ['Nerede', 'etkili?'], [DISINDA, DISINDA, CEKIRDEKTE, CEKIRDEKTE]);
    const r3 = satir(3, ['Etki', 'mesafesi'], [SONSUZ, SONSUZ, ['çekirdekle', 'sınırlı'], ['daha da kısa']]);
    const altCizgi = cizgi(c, svg, 30, TOP(4), 960, TOP(4), { renk: RENK.ince, kalin: 1.5 });
    // Ölçeksiz çizim: çekirdek, iki dar halka, tahtayı boydan boya geçen iki ok.
    const NX = 150, NY = 442, ciz = c.S('g', {}, svg);
    const nk = cekirdek(c, ciz, NX, NY, { n: 7, r: 15 });
    const gHalka = daire(c, ciz, NX, NY, nk.R + 22, { renk: GN, kalin: 4 }); gHalka.setAttribute('stroke-dasharray', '10 9');
    const zHalka = daire(c, ciz, NX, NY, 21, { renk: ZN, kalin: 5 });
    const kcOk = yeniOk(c, ciz, 40, 340, 962, 340, { renk: KC, kalin: 5, uc: 18, kesik: true }), emOk = yeniOk(c, ciz, 40, 543, 962, 543, { renk: EM, kalin: 5, uc: 18, kesik: true });
    const enGuclu = yazi(c, ciz, NX + nk.R + 40, NY + 8, 'en güçlü', { size: 26, renk: GN, hiza: 'start' });
    const cerceve = c.S('rect', { x: X0 + 2 * CW + 6, y: 6, width: CW - 12, height: 44, rx: 10, fill: 'none', stroke: GN, 'stroke-width': 3 }, svg);
    gizle(bas, altCizgi, nk.g, gHalka, zHalka, enGuclu, cerceve);
    const ilkIki = [...r0.hepsi, ...r1.hepsi];

    await belir(c, [bas, altCizgi, ...ilkIki], 500);
    await par(sol(c, ilkIki, 0.55), belir(c, r2.etiket, 300));
    await c.say('Üçüncü soru: kuvvet nerede etkili?');
    await par(belir(c, [r2.hs[2], r2.hs[3]], 300), belir(c, nk.g, 500));
    await c.say('Güçlü ve zayıf nükleer kuvvet yalnızca atom çekirdeği düzeyinde etkilidir.');
    await belir(c, [r2.hs[0], r2.hs[1]], 300);
    await c.say('Kütle çekim ve elektromanyetik kuvvet atom çekirdeğinin dışında da etkilidir.');
    await par(sol(c, r2.hepsi, 0.55), belir(c, r3.etiket, 300));
    await c.say('Dördüncü soru: kuvvetin etkisi ne kadar uzağa ulaşır?');
    await belir(c, [r3.hs[0], r3.hs[1]], 300);
    await par(c.say('Kütle çekim ve elektromanyetik kuvvetin etki mesafesi sonsuz kabul edilir.'), okCiz(c, kcOk, 1800), okCiz(c, emOk, 1800));
    await par(belir(c, r3.hs[2], 300), belir(c, gHalka, 500));
    await c.say('Güçlü nükleer kuvvetin etki mesafesi atom çekirdeğiyle sınırlıdır.');
    await par(belir(c, r3.hs[3], 300), belir(c, zHalka, 500));
    await c.say('Zayıf nükleer kuvvetin etki alanı bundan da kısadır.');
    await belir(c, [enGuclu, cerceve], 400);
    await c.say('Dört kuvvet içinde en güçlü olan, güçlü nükleer kuvvettir.');
    await c.choice({ tag: 'Düşün', q: 'Bir kuvvetin en güçlü olması, etkisinin en uzağa ulaştığını gösterir mi?',
      options: ['Hayır; en güçlü kuvvetin etki mesafesi çekirdekle sınırlıdır', 'Evet; kuvvet güçlendikçe daha uzağa ulaşır', 'Evet; dört kuvvetin etki mesafesi zaten aynıdır'], answer: 0,
      hints: ['', 'Güçlü olan kuvvet uzağa da etki eder sanma. En güçlü kuvvet olan güçlü nükleer kuvvet, çekirdeğin dışına ulaşmaz.',
        'Aynı değil: iki kuvvetin etki mesafesi sonsuz kabul edilir, iki kuvvetinki çekirdekle sınırlıdır.'],
      right: 'Evet. En güçlü kuvvet çekirdeğin dışına ulaşmaz.' });
    await belir(c, [...ilkIki, ...r2.hepsi], 400);
    await c.say('Güçlü olmak ile uzağa ulaşmak iki ayrı özelliktir.', { speak: '[thoughtful] Güçlü olmak ile uzağa ulaşmak iki ayrı özelliktir.' });
    await c.say('Bir kuvveti tanımak için bu iki özelliğe ayrı ayrı bakarız.');
    c.note('<b>Kütle çekim:</b> çekirdeğin dışında da; sonsuz kabul edilir<br><b>Elektromanyetik:</b> çekirdeğin dışında da; sonsuz kabul edilir<br><b>Güçlü nükleer:</b> yalnızca çekirdekte; çekirdekle sınırlı<br><b>Zayıf nükleer:</b> yalnızca çekirdekte; daha da kısa',
      'Nerede etkili, ne kadar uzağa', 'nerede-mesafe');
  }

  /* ---- Sahne 4 · Benzerlikler ve farklılıklar ---- */
  async function benzerFarkli(c) {
    const svg = c.svg(1000, 562), liste = c.S('g', {}, svg);
    yazi(c, liste, 60, 70, 'Benzerlikler', { size: 32, hiza: 'start' }); yazi(c, liste, 530, 70, 'Farklılıklar', { size: 32, hiza: 'start' });
    cizgi(c, liste, 60, 90, 450, 90, { renk: RENK.cizgi, kalin: 2 }); cizgi(c, liste, 530, 90, 940, 90, { renk: RENK.cizgi, kalin: 2 });
    /* Benzerlik maddesi: ilgili kuvvetlerin renk noktaları + kısa söz. */
    const benzer = (y, renkler, metin) => {
      const g = c.S('g', {}, liste);
      renkler.forEach((r, i) => nokta(c, g, 72 + i * 24, y - 8, r));
      yazi(c, g, 72 + renkler.length * 24 + 4, y, metin, { size: 26, hiza: 'start' });
      gizle(g); return g;
    };
    /* Farklılık maddesi: iki kuvvet, iki ayrı cevap. */
    const fark = (y, [r1, m1], [r2, m2]) => {
      const g = c.S('g', {}, liste);
      nokta(c, g, 542, y - 8, r1); yazi(c, g, 560, y, m1, { size: 26, hiza: 'start' });
      nokta(c, g, 742, y - 8, r2); yazi(c, g, 760, y, m2, { size: 26, hiza: 'start' });
      gizle(g); return g;
    };
    const b = [benzer(150, [KC, EM, GN, ZN], 'temel kuvvet'), benzer(230, [GN, ZN], 'yalnızca çekirdekte'), benzer(310, [KC, EM], 'etki mesafesi sonsuz')];
    const f = [fark(150, [KC, 'kütle'], [EM, 'yük, kutup']), fark(230, [KC, 'çeker'], [EM, 'iter, çeker']), fark(310, [GN, 'korur'], [ZN, 'değiştirir']), fark(390, [GN, 'kısa'], [ZN, 'daha kısa'])];
    gizle(liste); await belir(c, liste);
    await c.say('Tablodaki cevaplar aynıysa benzerlik, farklıysa farklılık yazarız.');
    const cumleler = [
      'Benzerlik: dördü de doğadaki temel kuvvetlerdendir.', 'Benzerlik: iki nükleer kuvvet yalnızca çekirdek düzeyinde etkilidir.',
      'Benzerlik: kütle çekim ve elektromanyetik kuvvetin etki mesafesi sonsuz kabul edilir.',
      'Farklılık: kütle çekim kütleyle, elektromanyetik kuvvet yük ve kutupla ilgilidir.', 'Farklılık: elektromanyetik kuvvet iter ya da çeker; kütle çekim kuvveti çeker.',
      'Farklılık: güçlü nükleer kuvvet çekirdeği korur, zayıf nükleer kuvvet yapısını değiştirir.', 'Farklılık: zayıf nükleer kuvvetin etki alanı güçlününkinden daha kısadır.',
    ];
    const maddeler = [...b, ...f];
    for (let i = 0; i < maddeler.length; i++) {
      if (i) await sol(c, maddeler[i - 1], 0.45, 250);
      await belir(c, maddeler[i], 350);
      await c.say(cumleler[i]);
    }
    await belir(c, maddeler, 300); await c.wait(900);
    await kaybol(c, liste);

    // Dene: altı ifade, iki kutu.
    const kutuG = c.S('g', {}, svg), KX = [50, 510];
    ['Benzerlik', 'Farklılık'].forEach((ad, i) => { kutu(c, kutuG, KX[i], 26, 440, 262, { renk: RENK.cizgi }); yazi(c, kutuG, KX[i] + 220, 64, ad, { size: 28 }); });
    gizle(kutuG); await belir(c, kutuG);
    const sayac = [0, 0];
    const koy = (k, renkler, metin) => {
      const n = sayac[k]++, g = c.S('g', {}, svg), y = 126 + n * 54, x = KX[k] + 60;
      renkler.forEach((r, i) => nokta(c, g, x + i * 24, y - 8, r));
      yazi(c, g, x + Math.max(renkler.length, 0) * 24 + (renkler.length ? 4 : -12), y, metin, { size: 26, hiza: 'start' });
      gizle(g); belir(c, g, 300);
    };
    const ifadeler = [
      { kart: ['Güçlü ve zayıf nükleer kuvvet', 'proton ve nötronlarla ilgilidir.'], k: 0, renkler: [GN, ZN], kisa: 'proton, nötron',
        ipucu: 'İki kuvvet için aynı şey söyleniyor: ikisi de proton ve nötronlarla ilgili.', neden: 'Evet. İki kuvvetin ortak yanı.' },
      { kart: ['Kütle çekim ve elektromanyetik kuvvet', 'çekirdeğin dışında da etkilidir.'], k: 0, renkler: [KC, EM], kisa: 'çekirdeğin dışında',
        ipucu: 'İki kuvvet aynı soruya aynı cevabı veriyor: ikisi de çekirdeğin dışında da etkili.', neden: 'Evet. İkisi de aynı cevabı veriyor.' },
      { kart: ['Biri çekirdeği bir arada tutar, öteki', 'çekirdeğin kararsız olmasına yol açar.'], k: 1, renkler: [GN, ZN], kisa: 'çekirdeğe etkisi',
        ipucu: '“Biri…, öteki…” diye ayrılıyor: iki kuvvet farklı iş yapıyor.', neden: 'Evet. İki kuvvet farklı iş yapıyor.' },
      { kart: ['Birinin etki mesafesi sonsuz kabul edilir,', 'ötekininki çekirdekle sınırlıdır.'], k: 1, renkler: [], kisa: 'etki mesafesi',
        ipucu: 'İki kuvvetin etki mesafesi aynı değil; bu onları ayırır.', neden: 'Evet. Etki mesafeleri farklı.' },
      { kart: ['Kütle çekim ve elektromanyetik kuvvetin etkisi', 'günlük hayatta kolayca gözlemlenir.'], k: 0, renkler: [KC, EM], kisa: 'günlük hayatta',
        ipucu: 'İki kuvvetin ortak yanı söyleniyor: ikisinin etkisi de kolayca gözlemlenir.', neden: 'Evet. İkisinin etkisi de makro düzeydedir.' },
      { kart: ['Dört kuvvetten yalnızca biri', 'en güçlü kuvvettir.'], k: 1, renkler: [], kisa: 'en güçlü',
        ipucu: 'Tek bir kuvveti ötekilerden ayıran özellik de farklılıktır.', neden: 'Evet. Bir kuvveti ötekilerden ayıran özellik farklılıktır.' },
    ];
    await c.say('Her ifadeyi benzerlik ya da farklılık kutusuna bırak.', { noWait: true });
    for (const o of ifadeler) {
      const g = kart(c, svg, 110, 322, 780, 150, o.kart, { size: 28, ara: 42 }); gizle(g);
      await belir(c, g, 250);
      await c.choice({ tag: 'Sıra sende', q: 'Karttaki ifade kuvvetlerin benzerliği mi, farklılığı mı?', options: ['Benzerlik', 'Farklılık'], answer: o.k,
        hints: [o.ipucu, o.ipucu], right: o.neden, onPick: (i, tamam) => { if (tamam) { g.remove(); koy(o.k, o.renkler, o.kisa); } } });
    }
    // Aynı iki kuvvet (güçlü ve zayıf nükleer) iki kutuda da var.
    const bag = c.S('g', {}, svg);
    [0, 1].forEach((k) => c.S('rect', { x: KX[k] + 40, y: 97, width: 330, height: 46, rx: 10, fill: 'none', stroke: RENK.yazi, 'stroke-width': 3 }, bag));
    cizgi(c, bag, KX[0] + 370, 120, KX[1] + 40, 120, { renk: RENK.yazi, kalin: 3 });
    gizle(bag); await belir(c, bag, 400);
    await c.say('Aynı iki kuvvet bir bakımdan benzer, başka bir bakımdan farklı olabilir.', { speak: 'Aynı iki kuvvet bir bakımdan benzer, [short pause] başka bir bakımdan farklı olabilir.' });
  }

  /* ---- Sahne 5 · Aynı yerde iki kuvvet ---- */
  async function ikiKuvvet(c) {
    const svg = c.svg(1000, 562), NX = 215, NY = 285;
    const d = c.S('g', {}, svg);
    const nk = cekirdek(c, d, NX, NY, { n: 56, r: 11, proton: 26 });
    yazi(c, d, NX, 44, 'demir çekirdeği', { size: 24, renk: RENK.soluk }); yazi(c, d, NX, 78, '26 proton, 30 nötron', { size: 26 });
    gizle(d); await belir(c, d);
    await c.say('Bir demir atomunun çekirdeğinde 26 proton ve 30 nötron bulunur.', { speak: 'Bir demir atomunun çekirdeğinde yirmi altı proton ve otuz nötron bulunur.' });
    const artilar = c.S('g', {}, d); nk.parcalar.filter((p) => p.proton).forEach((p) => arti(c, artilar, p.x, p.y, 5));
    const itme = [0, 60, 120, 180, 240, 300].map((a) => { const [x1, y1] = acili(NX, NY, nk.R - 30, a), [x2, y2] = acili(NX, NY, nk.R + 50, a); return yeniOk(c, d, x1, y1, x2, y2, { renk: EM, kalin: 6, uc: 16 }); });
    const itAd = c.S('g', {}, d); nokta(c, itAd, 84, 496, EM); yazi(c, itAd, 102, 504, 'itme', { size: 24, hiza: 'start' });
    gizle(artilar, itAd);
    await belir(c, artilar, 300);
    await par(c.say('Protonlar artı yüklüdür ve birbirine elektriksel itme kuvveti uygular.'), sira(() => c.wait(600), () => par(itme.map((o) => okCiz(c, o, 600)), belir(c, itAd, 400))));
    await c.say('Buna rağmen demir çekirdeği dağılmaz, kararlı yapısını korur.', { speak: 'Buna rağmen, [short pause] demir çekirdeği dağılmaz, kararlı yapısını korur.' });
    await c.choice({ tag: 'Uygula', q: 'Protonların birbirini itmesi ve çekirdeğin dağılmaması hangi kuvvetlerin işi?',
      options: ['İkisi de güçlü nükleer kuvvetin', 'İtme elektromanyetik, bir arada tutma güçlü nükleer kuvvetin', 'İkisi de elektromanyetik kuvvetin'], answer: 1,
      hints: ['Bir olayda tek bir temel kuvvet arama. Güçlü nükleer kuvvet bir arada tutar; iten, yüklerle ilgili elektromanyetik kuvvettir.', '',
        'Elektromanyetik kuvvet burada protonları iter. Onları itmeye rağmen bir arada tutan ayrı bir kuvvettir: güçlü nükleer kuvvet.'],
      right: 'Evet. İki etki, iki ayrı temel kuvvet.' });
    const tutma = icOklar(c, d, NX, NY, nk.R, { uz: 56, kalin: 6, uc: 16 });
    const tuAd = c.S('g', {}, d); nokta(c, tuAd, 178, 496, GN); yazi(c, tuAd, 196, 504, 'bir arada tutma', { size: 24, hiza: 'start' });
    gizle(tutma, tuAd);
    await belir(c, [...tutma, tuAd], 500);
    await c.say('Aynı çekirdekte iki temel kuvvet birlikte iş görüyor.');
    // Güneş
    const gs = c.S('g', {}, svg);
    gunes(c, gs, 590, 285, 104); yazi(c, gs, 590, 160, 'Güneş', { size: 26, renk: GUNES });
    cekirdek(c, gs, 590, 222, { n: 4, r: 9 });
    const gAd = yazi(c, gs, 590, 284, 'güçlü nükleer', { size: 24, renk: GN }), zAd = yazi(c, gs, 590, 330, 'zayıf nükleer', { size: 24, renk: ZN });
    gizle(gs, zAd);
    await par(sol(c, d, 0.45), belir(c, gs, 500));
    await c.say('Güneş’te hidrojen çekirdeklerinin birleşmesinde güçlü nükleer kuvvet etkilidir.');
    await belir(c, zAd, 400);
    await c.say('Güneş’teki çekirdek tepkimeleri sırasında zayıf nükleer kuvvet de gözlemlenir.');
    // Masadaki iğne
    const ig = c.S('g', {}, svg), IX = 850;
    cizgi(c, ig, IX - 95, 400, IX + 95, 400, { renk: TAHTA, kalin: 6 });
    miknatis(c, ig, IX, 180, 120, 28);
    cizgi(c, ig, IX - 34, 318, IX + 34, 318, { renk: CELIK, kalin: 4 });
    const yu = yeniOk(c, ig, IX, 310, IX, 204, { renk: EM, kalin: 7, uc: 18 }), as = yeniOk(c, ig, IX, 326, IX, 388, { renk: KC, kalin: 7, uc: 18 });
    yazi(c, ig, IX, 444, 'kütle çekim', { size: 24, renk: KC }); yazi(c, ig, IX, 478, 'elektromanyetik', { size: 24, renk: EM });
    gizle(ig);
    await par(sol(c, gs, 0.45), belir(c, ig, 500));
    await par(c.say('Masadaki iğneyi de iki kuvvet çekmişti: kütle çekim ve elektromanyetik kuvvet.'), okCiz(c, as, 600), okCiz(c, yu, 700));
    await belir(c, [d, gs], 400);
    await c.say('Bir olayda birden fazla temel kuvvet etkili olabilir.');
    void gAd;
  }

  /* ---- Sahne 6 · Beş özellik, dört kuvvet ---- */
  async function besOzellik(c) {
    const svg = c.svg(1000, 562), X0 = 262, CW = 176, MX = (i) => X0 + i * CW + CW / 2, TOP = (r) => 66 + r * 58;
    const bas = tabloBasi(c, svg, X0, CW, 8);
    const cizgiler = c.S('g', {}, svg);
    for (let r = 0; r <= 5; r++) cizgi(c, cizgiler, 30, TOP(r), X0 + 4 * CW, TOP(r), { renk: RENK.ince, kalin: 1.5 });
    for (let i = 0; i <= 4; i++) cizgi(c, cizgiler, X0 + i * CW, TOP(0), X0 + i * CW, TOP(5), { renk: RENK.ince, kalin: 1.5 });
    const etiket = ['ağırlığın sebebi', 'çekirdeği korur', 'çekirdeği değiştirir', 'yalnızca çekirdekte', 'çekirdeğin dışında da']
      .map((m, r) => { const t = yazi(c, cizgiler, 40, TOP(r) + 38, m, { size: 22, hiza: 'start' }); t.style.opacity = 0.6; return t; });
    gizle(bas, cizgiler);
    await belir(c, [bas, cizgiler]);
    await c.say('Şimdi beş özelliği dört kuvvetle eşleştireceksin.');
    const tik = (p, r, i, renk) => yol(c, p, `M ${MX(i) - 14} ${TOP(r) + 29} L ${MX(i) - 4} ${TOP(r) + 41} L ${MX(i) + 15} ${TOP(r) + 17}`, { renk, kalin: 7 });
    // Örnek satır: hiçbir özelliğe bağlı değil; iki işaretli bir satırın nasıl göründüğünü gösterir.
    const ornek = c.S('g', {}, svg);
    c.S('rect', { x: 30, y: 420, width: X0 + 4 * CW - 30, height: 58, rx: 8, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2 }, ornek);
    c.S('rect', { x: 46, y: 440, width: 170, height: 18, rx: 9, fill: RENK.cizgi }, ornek);
    [1, 2].forEach((i) => yol(c, ornek, `M ${MX(i) - 14} 451 L ${MX(i) - 4} 463 L ${MX(i) + 15} 439`, { renk: RENK.soluk, kalin: 7 }));
    gizle(ornek);
    await belir(c, ornek, 400);
    await c.say('Bir özellik birden fazla kuvvete uyabilir; uyan her kuvveti işaretle.');
    await kaybol(c, ornek, 300);
    await c.say('Karar verirken dört soruyu kullan: neyle ilgili, ne yapar, nerede, nereye kadar?');
    const gezici = c.S('rect', { y: TOP(0) + 6, width: CW - 16, height: 46, rx: 8, fill: 'none', stroke: RENK.yazi, 'stroke-width': 3 }, svg);
    const gez = (i) => { gezici.setAttribute('x', X0 + i * CW + 8); return c.wait(900); };
    await par(c.say('Her satırda dört kuvveti tek tek yokla.'), sira(() => gez(0), () => gez(1), () => gez(2), () => gez(3)));
    gezici.remove();
    const isaretle = (r, sutunlar) => {
      const g = c.S('g', {}, svg);
      sutunlar.forEach((i) => tik(g, r, i, KUVVET[i][1]));
      gizle(g); belir(c, g, 350);
    };
    const OZ = [
      { tam: ['Bir cismin ağırlığının sebebidir.'], kisa: 'ağırlığın sebebi', isaret: [0], dogru: 0,
        sec: ['Kütle çekim', 'Elektromanyetik', 'Güçlü nükleer', 'Kütle çekim ve elektromanyetik'],
        ipucu: ['', 'Ağırlık yük ya da mıknatısla değil, kütleyle ilgilidir.', 'Ağırlık çekirdeğin içindeki bir olay değildir; Dünya’nın cismi çekmesidir.', 'Yalnızca biri: ağırlığın sebebi kütle çekim kuvvetidir.'],
        neden: 'Evet. Ağırlığın sebebi kütle çekim kuvvetidir.' },
      { tam: ['Atom çekirdeğini ve çekirdeği oluşturan', 'parçacıkların yapısını korumakta etkilidir.'], kisa: 'çekirdeği korur', isaret: [2], dogru: 1,
        sec: ['Zayıf nükleer', 'Güçlü nükleer', 'Güçlü ve zayıf nükleer', 'Elektromanyetik'],
        ipucu: ['Zayıf nükleer kuvvet yapıyı korumaz, değiştirir.', '', 'İkisi de çekirdekte etkilidir ama yapıyı koruyan yalnızca biridir.', 'Elektromanyetik kuvvet çekirdekteki protonları iter; yapıyı korumaz.'],
        neden: 'Evet. Yapıyı koruyan güçlü nükleer kuvvettir.' },
      { tam: ['Çekirdeğin yapısında', 'bir değişime neden olur.'], kisa: 'çekirdeği değiştirir', isaret: [3], dogru: 2,
        sec: ['Güçlü nükleer', 'Güçlü ve zayıf nükleer', 'Zayıf nükleer', 'Kütle çekim'],
        ipucu: ['Güçlü nükleer kuvvet çekirdeği korur; değiştirmez.', 'Değişime neden olan yalnızca biridir; öteki yapıyı korur.', '', 'Kütle çekim kuvveti çekirdeğin yapısını değiştirmez.'],
        neden: 'Evet. Yapıyı değiştiren zayıf nükleer kuvvettir.' },
      { tam: ['Sadece atom çekirdeği', 'düzeyinde etkilidir.'], kisa: 'yalnızca çekirdekte', isaret: [2, 3], dogru: 2,
        sec: ['Güçlü nükleer', 'Zayıf nükleer', 'Güçlü ve zayıf nükleer', 'Dört kuvvet de'],
        ipucu: ['Doğru ama eksik: bir kuvvet daha yalnızca çekirdekte etkilidir.', 'Doğru ama eksik: bir kuvvet daha yalnızca çekirdekte etkilidir.', '', 'İki kuvvetin etkisini çekirdeğin dışında, her gün görürsün.'],
        neden: 'Evet. Bu özellik iki kuvvete birden uyar.' },
      { tam: ['Atom çekirdeğinin', 'dışında da etkilidir.'], kisa: 'çekirdeğin dışında da', isaret: [0, 1], dogru: 1,
        sec: ['Kütle çekim', 'Kütle çekim ve elektromanyetik', 'Elektromanyetik', 'Dört kuvvet de'],
        ipucu: ['Doğru ama eksik: mıknatısın etkisi de çekirdeğin dışındadır.', '', 'Doğru ama eksik: düşen elma da çekirdeğin dışındadır.', 'İki nükleer kuvvet çekirdeğin dışına ulaşmaz.'],
        neden: 'Evet. Bu özellik de iki kuvvete birden uyar.' },
    ];
    await c.say('Her özellik için uyan kuvveti ya da kuvvetleri seç.', { noWait: true });
    for (let r = 0; r < OZ.length; r++) {
      const o = OZ[r], g = kart(c, svg, 130, 396, 740, 132, o.tam, { size: 28, ara: 40, renk: RENK.yazi }); gizle(g);
      const imlec = c.S('rect', { x: 30, y: TOP(r) + 3, width: X0 + 4 * CW - 30, height: 52, rx: 8, fill: 'none', stroke: RENK.yazi, 'stroke-width': 2 }, svg); gizle(imlec);
      await belir(c, [g, imlec, etiket[r]], 250);
      await c.choice({ tag: 'Sıra sende', q: 'Karttaki özellik hangi kuvvete ya da kuvvetlere uyar?', options: o.sec, answer: o.dogru, hints: o.ipucu, right: o.neden,
        onPick: (i, tamam) => { if (tamam) { g.remove(); imlec.remove(); isaretle(r, o.isaret); } } });
    }
    await c.say('İki özellik ikişer kuvvete, üç özellik birer kuvvete uydu.');
    const vurgu = c.S('g', {}, svg);
    [[1, 2, GN], [2, 3, ZN]].forEach(([r, i, renk]) => c.S('rect', { x: X0 + i * CW + 8, y: TOP(r) + 6, width: CW - 16, height: 46, rx: 8, fill: 'none', stroke: renk, 'stroke-width': 3 }, vurgu));
    gizle(vurgu); await belir(c, vurgu, 400);
    await c.say('Çekirdeği koruyan ile çekirdeği değiştiren, iki ayrı nükleer kuvvettir.');
    const son = yazi(c, svg, 500, 470, 'En güçlü kuvvet, çekirdeğin dışına ulaşmaz.', { size: 32, renk: GN }); gizle(son);
    await par(kaybol(c, vurgu), belir(c, son, 500));
    await c.say('En güçlü kuvvet, çekirdeğin dışına ulaşmayan kuvvettir.', { speak: '[thoughtful] En güçlü kuvvet, çekirdeğin dışına ulaşmayan kuvvettir.' });
    c.note('<b>Güçlü olmak ile uzağa ulaşmak ayrı özelliklerdir.</b><br>Örnek: güçlü nükleer kuvvet en güçlüdür, çekirdekle sınırlıdır.', 'Güç ve etki mesafesi', 'guc-ve-mesafe');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-d2', kicker: 'Konu D · Doğadaki temel kuvvetler', title: 'Dört kuvvet: nerede benzer, nerede ayrı?', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Dört kuvvet: nerede benzer, nerede ayrı?', hook: 'Dört temel kuvvetten hangilerinin etkisini gündelik hayatta doğrudan fark edersin?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Hangilerini fark ederiz?', goal: 'Kuvvetleri makro ve mikro düzeye yerleştir.', run: hangileri },
      { title: 'İlk iki soru: neyle ilgili, ne yapar?', goal: 'Dört kuvvete aynı iki soruyu sor.', run: ilkIkiSoru },
      { title: 'Son iki soru: nerede etkili, ne kadar uzağa?', goal: 'Güçlü olmak ile uzağa ulaşmayı ayır.', run: sonIkiSoru },
      { title: 'Benzerlikler ve farklılıklar', goal: 'Altı ifadeyi benzerlik ve farklılık diye ayır.', run: benzerFarkli },
      { title: 'Aynı yerde iki kuvvet', goal: 'Bir olayda iki temel kuvveti birlikte gör.', run: ikiKuvvet },
      { title: 'Beş özellik, dört kuvvet', goal: 'Beş özelliği uyan kuvvetlerle eşleştir.', run: besOzellik },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangi iki temel kuvvet atom çekirdeğinin dışında da etkilidir?',
        options: ['Güçlü ve zayıf nükleer kuvvet', 'Güçlü nükleer kuvvet ve kütle çekim kuvveti', 'Kütle çekim ve elektromanyetik kuvvet'], answer: 2,
        why: ['İki nükleer kuvvet yalnızca çekirdek düzeyinde etkilidir.', 'Güçlü olan uzağa da etki eder sanma: güçlü nükleer kuvvet çekirdeğin dışına ulaşmaz.',
          'Bu iki kuvvetin etki mesafesi sonsuz kabul edilir; çekirdeğin dışında da etkilidirler.'], scene: 2 },
      { q: 'En güçlü kuvvet güçlü nükleer kuvvettir. Gezegenleri Güneş’in etrafında neden o tutmaz?',
        options: ['Gezegenlerde proton ve nötron yoktur', 'Etki mesafesi atom çekirdeğiyle sınırlıdır', 'Güneş’te güçlü nükleer kuvvet etkili değildir'], answer: 1,
        why: ['Gezegenler de atomlardan oluşur; atomların çekirdeğinde proton ve nötron bulunur.', 'Güçlü olmak ile uzağa ulaşmak ayrı özelliklerdir; gezegenleri kütle çekim kuvveti dolandırır.',
          'Güneş’te hidrojen çekirdeklerinin birleşmesinde güçlü nükleer kuvvet etkilidir.'], scene: 2 },
      { q: 'Tavandan ipe bağlı çelik bir bilyeye yandan bir mıknatıs yaklaştırılıyor; bilye mıknatısa doğru savrulup ip eğiliyor. Bilyeyi mıknatısa doğru çeken kuvvet ile bilyeyi aşağı çeken kuvvet sırasıyla hangileridir?',
        options: ['Elektromanyetik kuvvet, kütle çekim kuvveti', 'Kütle çekim kuvveti, elektromanyetik kuvvet', 'İkisi de elektromanyetik kuvvet'], answer: 0,
        why: ['Evet. Mıknatısın çekmesi elektromanyetik kuvvettir, bilyeyi aşağı çeken kütle çekim kuvvetidir; bir olayda iki temel kuvvet birlikte etkilidir.', 'Sıra ters: mıknatısa doğru çeken, manyetik kutuplarla ilgili kuvvettir; aşağı çeken kütleyle ilgili kuvvettir.', 'Bilyeyi aşağı çeken, mıknatıs ya da yükle değil kütleyle ilgili kuvvettir: kütle çekim kuvveti.'], scene: 4 },
      { q: 'Tuna: “Kütle çekim kuvveti ile elektromanyetik kuvvet, çekirdeğin dışında da etkili ve ikisinin de etki mesafesi sonsuz kabul edilir; demek ki bunlar aynı kuvvettir.” Doğru karşılık hangisidir?',
        options: ['Haksız; elektromanyetik kuvvet yalnızca çekirdek düzeyinde etkilidir.', 'Haklı; bir bakımdan benzeyen kuvvetler aynı kuvvettir.', 'Haksız; biri kütleyle, öteki yük ve kutuplarla ilgilidir.'], answer: 2,
        why: ['Elektromanyetik kuvvet çekirdeğin dışında da etkilidir; Tuna’nın bu söylediği doğru, sorun sonucundadır.', 'Aynı iki kuvvet bir bakımdan benzer, başka bir bakımdan farklı olabilir; benzerlik aynılık demek değildir.', 'Evet. İki kuvvet etki mesafesinde benzer, neyle ilgili oldukları bakımından farklıdır.'], scene: 3 },
    ],
    summary: ['<b>En güçlü kuvvet, çekirdeğin dışına ulaşmaz.</b>',
      'Kütle çekim ve elektromanyetik kuvvet çekirdeğin dışında da etkilidir; etki mesafeleri sonsuz kabul edilir.',
      'Güçlü ve zayıf nükleer kuvvet yalnızca çekirdekte etkilidir; bir olayda birden fazla temel kuvvet bulunabilir.'],
    nextLesson: { href: 'd3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
