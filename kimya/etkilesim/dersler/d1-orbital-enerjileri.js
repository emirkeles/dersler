/* D1 · KİM.9.1.4 · Senaryo: plan/kimya/etkilesim/senaryolar/D-orbitallerin-enerjisi.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 54 ve 56–59'dan. Diyagramdaki yükseklikler ve aralıklar temsilidir; sayısal enerji
   ve atom adı yazılmaz. Kesit 1s–4p. Orbital şekilleri, kuantum sayıları ve elektron sayımı derse girmez.
   Amfideki koltuk sayıları (1, 4, 9, 16) seviyelerdeki orbital sayılarıdır; çizim atoma dönünce yanlış sayı kalmaz. */
(() => {
  'use strict';
  const { RENK, yazi, belir, elektronOku, orbitalKutusu } = KIT;
  const ORB = 'var(--c1)', ODAK = 'var(--c2)', KOYU = '#162038';
  const TURLER = [['s', 1, 1], ['p', 3, 2], ['d', 5, 3], ['f', 7, 4]]; // tür, orbital sayısı, başladığı seviye
  const ADET = { s: 1, p: 3, d: 5 };
  const SIRA = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p'];

  const sil = async (c, el, ms = 350) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };
  const yerlestir = (g, x, y) => g.setAttribute('transform', `translate(${x} ${y})`);
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 10 : o.rx,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);

  /* Dikey enerji oku: alttan üste. */
  function eksen(c, p, x, alt, ust) {
    const g = c.S('g', {}, p);
    c.S('path', { d: `M ${x} ${alt} L ${x} ${ust} M ${x - 9} ${ust + 16} L ${x} ${ust} L ${x + 9} ${ust + 16}`,
      fill: 'none', stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    yazi(c, g, x, ust - 18, 'Enerji', { size: 26, renk: RENK.soluk });
    return g;
  }

  /* Bağıl enerji diyagramının bir basamağı: etiket ve türün orbital sayısı kadar kısa çizgi. */
  function basamak(c, p, ad, x, y, o = {}) {
    const g = c.S('g', {}, p), w = o.w || 44, ara = o.ara || 14, renk = o.renk || ORB;
    const etiket = yazi(c, g, x - 26, y + 10, ad, { size: o.size || 30, hiza: 'end', renk });
    const cizgiler = [];
    for (let k = 0; k < ADET[ad[1]]; k++) {
      const x1 = x + k * (w + ara);
      cizgiler.push(c.S('line', { x1, y1: y, x2: x1 + w, y2: y, stroke: renk, 'stroke-width': 6, 'stroke-linecap': 'round' }, g));
    }
    return { g, etiket, cizgiler, x, y, w, ara };
  }
  const boya = (b, renk) => { b.etiket.style.fill = renk; b.cizgiler.forEach((l) => l.setAttribute('stroke', renk)); };

  /* İki ucu oklu dikey çizgi (iki yükseklik arasındaki fark). */
  const ciftOk = (c, p, x, y1, y2, renk) => c.S('path', {
    d: `M ${x} ${y1} L ${x} ${y2} M ${x - 8} ${y1 + 12} L ${x} ${y1} L ${x + 8} ${y1 + 12} M ${x - 8} ${y2 - 12} L ${x} ${y2} L ${x + 8} ${y2 - 12}`,
    fill: 'none', stroke: renk, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);

  /* Sıra yazarken iki orbital adı arasına konan "küçüktür" işareti (yazı değil, çizim). */
  const kucuktur = (c, p, x, y, r = 7) => c.S('path', { d: `M ${x + r} ${y - r - 2} L ${x - r} ${y} L ${x + r} ${y + r + 2}`,
    fill: 'none', stroke: RENK.soluk, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);

  /* Büyük orbital adı: sayı ve harf ayrı renklenebilsin diye iki ayrı yazı. */
  function buyukAd(c, p, x, y, ad, size, sayiRenk = RENK.vurgu) {
    const sayi = yazi(c, p, x - 2, y, ad[0], { size, hiza: 'end', renk: sayiRenk });
    const harf = yazi(c, p, x + 2, y, ad[1], { size, hiza: 'start', renk: ORB });
    return { sayi, harf };
  }

  /* Yan yana n orbital kutusu; (0, 0) köşesinden başlar, yerlestir ile taşınır. */
  const ADIM = 62, BOY = 48;
  function kutuDizisi(c, p, n) {
    const g = c.S('g', {}, p);
    for (let j = 0; j < n; j++) c.S('rect', { x: j * ADIM, y: 0, width: BOY, height: BOY, rx: 5, fill: 'none', stroke: ORB, 'stroke-width': 3 }, g);
    return g;
  }

  /* ---- Sahne 1 · Orbitalin adı ---- */
  const MERKEZ = { x: 500, y: 520 }, YARICAP = [130, 200, 270, 340], KOLTUK = [1, 4, 9, 16];
  const nokta = (r, derece) => ({ x: MERKEZ.x + r * Math.cos(derece * Math.PI / 180), y: MERKEZ.y - r * Math.sin(derece * Math.PI / 180) });
  function koltukSirasi(c, p, r, n) {
    const g = c.S('g', {}, p), adim = 42 / r * 180 / Math.PI;
    for (let k = 0; k < n; k++) {
      const derece = 90 + (k - (n - 1) / 2) * adim, { x, y } = nokta(r, derece);
      c.S('rect', { x: -15, y: -12, width: 30, height: 24, rx: 5, fill: KOYU, stroke: RENK.cizgi, 'stroke-width': 3,
        transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(90 - derece).toFixed(1)})` }, g);
    }
    return g;
  }

  async function orbitalinAdi(c) {
    const svg = c.svg();
    const amfi = c.S('g', {}, svg);
    const baslik = yazi(c, amfi, 500, 50, 'Amfi tiyatro', { size: 30, renk: RENK.soluk });
    const yaylar = c.S('g', {}, amfi);
    YARICAP.forEach((r) => {
      const a = nokta(r, 150), b = nokta(r, 30);
      c.S('path', { d: `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${r} ${r} 0 0 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2 }, yaylar);
    });
    yaylar.style.opacity = 0;
    const sahne = c.S('path', { d: 'M 430 520 A 70 54 0 0 1 570 520 Z', fill: KOYU, stroke: RENK.cizgi, 'stroke-width': 3 }, amfi);
    const altYazi = yazi(c, amfi, 500, 550, 'Sahne', { size: 26 });
    const siralar = YARICAP.map((r, i) => koltukSirasi(c, amfi, r, KOLTUK[i]));
    siralar[2].style.opacity = 0;
    siralar[3].style.opacity = 0;
    await belir(c, amfi);
    await c.say('Bir amfi tiyatroda koltuklar sahnenin çevresinde sıra sıra dizilir.');
    await belir(c, siralar[2], 400);
    await belir(c, siralar[3], 400);
    await c.say('Sahneden uzaklaştıkça sıralar yükselir ve koltuk sayısı artar.');

    await c.tween(300, (e) => { sahne.style.opacity = 1 - e; baslik.style.opacity = 1 - e; altYazi.style.opacity = 1 - e; });
    sahne.remove();
    baslik.textContent = 'Atom';
    altYazi.textContent = 'Çekirdek';
    const cekirdek = c.S('circle', { cx: 500, cy: 490, r: 28, fill: KOYU, stroke: RENK.vurgu, 'stroke-width': 4 }, amfi);
    const koltuklar = siralar.flatMap((g) => [...g.children]);
    koltuklar.forEach((k) => k.setAttribute('stroke', ORB));
    await c.tween(450, (e) => { cekirdek.style.opacity = e; baslik.style.opacity = e; altYazi.style.opacity = e; });
    await c.say('Atomda sahnenin yerinde çekirdek, koltukların yerinde orbitaller vardır.');
    const ornek = siralar[2].children[4];
    ornek.setAttribute('stroke', ODAK);
    ornek.setAttribute('stroke-width', 5);
    baslik.textContent = 'Orbital: elektronun bulunma olasılığı yüksek bölge';
    await belir(c, baslik, 350);
    await c.say('Önceki derste gördük: orbital, elektronun bulunma olasılığının yüksek olduğu bölgedir.');
    ornek.setAttribute('stroke', ORB);
    ornek.setAttribute('stroke-width', 3);
    baslik.textContent = 'Temel enerji seviyeleri';
    await Promise.all([belir(c, baslik, 350), belir(c, yaylar, 450)]);
    await c.say('Orbitaller, temel enerji seviyelerinde yer alır.');
    for (let i = 0; i < YARICAP.length; i++) {
      const u = nokta(YARICAP[i], 150);
      await belir(c, yazi(c, amfi, u.x - 20, u.y + 30, String(i + 1), { size: 30, renk: RENK.vurgu }), 250);
    }
    await c.say('Temel enerji seviyeleri çekirdekten dışa doğru birden başlayarak numaralanır.');

    await sil(c, amfi);
    const alt = c.S('g', {}, svg);
    yazi(c, alt, 500, 56, 'Temel enerji seviyesi → alt enerji seviyeleri', { size: 30, renk: RENK.soluk });
    const X0 = 300, GEN = 480;
    const satirlar = [1, 2, 3].map((n, i) => {
      const y = 140 + i * 110;
      yazi(c, alt, 170, y + 42, n + '. seviye', { size: 30 });
      const parcalar = [];
      for (let k = 0; k < n; k++) parcalar.push(c.S('rect', { x: X0, y, width: GEN / n, height: 64, fill: ORB }, alt));
      const butun = c.S('rect', { x: X0, y, width: GEN, height: 64, fill: ORB }, alt);
      const adet = yazi(c, alt, 860, y + 45, String(n), { size: 40, renk: RENK.vurgu });
      adet.style.opacity = 0;
      return { n, parcalar, butun, adet };
    });
    await belir(c, alt);
    await c.say('Her temel enerji seviyesi, alt enerji seviyelerine ayrılır.');
    satirlar.forEach((s) => s.butun.remove());
    await c.tween(700, (e) => satirlar.forEach(({ n, parcalar }) => {
      const ara = 18 * e, w = (GEN - ara * (n - 1)) / n;
      parcalar.forEach((r, k) => { r.setAttribute('x', X0 + k * (w + ara)); r.setAttribute('width', w); });
    }));
    await c.tween(350, (e) => satirlar.forEach((s) => { s.adet.style.opacity = e; }));
    await c.say('Birinci seviyede bir, ikincide iki, üçüncüde üç alt enerji seviyesi bulunur.');

    await sil(c, alt);
    const ad = c.S('g', {}, svg);
    yazi(c, ad, 500, 56, 'Orbital türleri', { size: 30, renk: RENK.soluk });
    const turKutu = {};
    for (let i = 0; i < TURLER.length; i++) {
      const g = c.S('g', {}, ad), x = 230 + i * 180, harf = TURLER[i][0];
      turKutu[harf] = kutu(c, g, x - 50, 92, 100, 88);
      yazi(c, g, x, 154, harf, { size: 52, renk: ORB });
      await belir(c, g, 220);
    }
    await c.say('Orbitallerin dört türü vardır: s, p, d ve f.', { speak: 'Orbitallerin dört türü vardır: se, pe, de ve fe.' });
    const buyuk = c.S('g', {}, ad);
    const ornekAd = buyukAd(c, buyuk, 500, 370, '1s', 130);
    c.S('path', { d: 'M 452 402 L 372 456 M 546 402 L 628 456', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linecap': 'round' }, buyuk);
    const solAd = yazi(c, buyuk, 320, 492, 'önce: enerji seviyesi', { size: 30, renk: RENK.vurgu });
    const sagAd = yazi(c, buyuk, 680, 492, 'sonra: tür', { size: 30, renk: ORB });
    await belir(c, buyuk);
    await c.say('Bir orbital yazılırken önce enerji seviyesi, sonra türü yazılır.');
    solAd.textContent = 'birinci enerji seviyesi';
    sagAd.textContent = 's türü';
    turKutu.s.setAttribute('stroke', ORB);
    await c.say('Örneğin 1s, birinci enerji seviyesindeki s türü orbitaldir.',
      { speak: 'Örneğin bir se, birinci enerji seviyesindeki se türü orbitaldir.' });

    turKutu.s.setAttribute('stroke', RENK.cizgi);
    ornekAd.sayi.textContent = '3';
    ornekAd.harf.textContent = 'p';
    solAd.textContent = '?';
    sagAd.textContent = '?';
    await belir(c, buyuk, 350);
    await c.choice({ tag: 'Uygula', q: '“3p” yazısı neyi anlatır?',
      options: ['Üç tane p orbitalini', 'Üçüncü enerji seviyesindeki p türü orbitali', 'Birinci seviyedeki üçüncü orbitali'], answer: 1,
      hints: ['Baştaki sayı kaç orbital olduğunu söylemez; enerji seviyesini söyler.', '', 'Enerji seviyesini baştaki sayı gösterir; burada o sayı 3.'],
      right: 'Önce enerji seviyesi, sonra tür: üçüncü seviye, p türü.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        solAd.textContent = 'üçüncü enerji seviyesi';
        sagAd.textContent = 'p türü';
        turKutu.p.setAttribute('stroke', ORB);
      } });
    const altCizgi = c.S('line', { x1: 424, y1: 386, x2: 494, y2: 386, stroke: ODAK, 'stroke-width': 6, 'stroke-linecap': 'round' }, buyuk);
    const degil = yazi(c, buyuk, 320, 532, 'orbital sayısı değil', { size: 26, renk: RENK.soluk });
    await Promise.all([belir(c, altCizgi, 350), belir(c, degil, 350)]);
    await c.say('Baştaki sayı orbital sayısını değil, enerji seviyesini gösterir.',
      { speak: '[thoughtful] Baştaki sayı orbital sayısını değil, enerji seviyesini gösterir.' });
  }

  /* ---- Sahne 2 · Dört tür, kaç orbital? ---- */
  async function turVeSayi(c) {
    const svg = c.svg();
    const tablo = c.S('g', {}, svg);
    yazi(c, tablo, 500, 52, 'Türlere göre orbital sayısı', { size: 30, renk: RENK.soluk });
    const KX = 340, satirY = (i) => 112 + i * 92;
    const basBaslik = yazi(c, tablo, 130, 96, 'Başladığı seviye', { size: 24, renk: RENK.soluk });
    basBaslik.style.opacity = 0;
    const satirlar = TURLER.map(([harf, n, seviye], i) => {
      const y = satirY(i);
      const tur = yazi(c, tablo, 262, y + 40, harf, { size: 46, renk: ORB });
      const kutular = kutuDizisi(c, svg, n);
      yerlestir(kutular, KX, y);
      [...kutular.children].forEach((k) => { k.style.opacity = 0; });
      const adet = yazi(c, tablo, 850, y + 38, String(n), { size: 38 });
      const bas = yazi(c, tablo, 130, y + 38, String(seviye), { size: 36, renk: RENK.vurgu });
      adet.style.opacity = 0;
      bas.style.opacity = 0;
      return { tur, kutular, adet, bas };
    });
    const goster = async (i) => {
      const s = satirlar[i];
      for (const k of [...s.kutular.children]) await belir(c, k, 150);
      await Promise.all([belir(c, s.adet, 250), belir(c, s.bas, 250)]);
    };
    await belir(c, tablo);
    await c.say('Her türün bir alt enerji seviyesindeki orbital sayısı bellidir.');
    await belir(c, basBaslik, 250);
    await goster(0);
    await c.say('s türünde tek orbital vardır ve her enerji seviyesinde bulunur.',
      { speak: 'Se türünde tek orbital vardır ve her enerji seviyesinde bulunur.' });
    await goster(1);
    await c.say('p türü ikinci enerji seviyesinde başlar; üç özdeş orbitalden oluşur.',
      { speak: 'Pe türü ikinci enerji seviyesinde başlar; üç özdeş orbitalden oluşur.' });
    await goster(2);
    await c.say('d türü üçüncü seviyede başlar; beş özdeş orbitalden oluşur.',
      { speak: 'De türü üçüncü seviyede başlar; beş özdeş orbitalden oluşur.' });
    await goster(3);
    await c.say('f türü dördüncü seviyede başlar; yedi özdeş orbitalden oluşur.',
      { speak: 'Fe türü dördüncü seviyede başlar; yedi özdeş orbitalden oluşur.' });
    const tekKutu = satirlar[2].kutular.children[2];
    tekKutu.setAttribute('stroke', ODAK);
    tekKutu.setAttribute('stroke-width', 5);
    await belir(c, yazi(c, tablo, 500, 512, 'Bir kutu = bir orbital', { size: 28, renk: ODAK }), 350);
    await c.say('Tahtadaki her kutu bir orbitali gösterir.');
    tekKutu.setAttribute('stroke', ORB);
    tekKutu.setAttribute('stroke-width', 3);

    await c.choice({ tag: 'Uygula', q: 'Üçüncü enerji seviyesinde hangi orbital türleri bulunur?',
      options: ['s, p ve d', 'Yalnızca s ve p', 's, p, d ve f'], answer: 0,
      hints: ['', 'd türü üçüncü seviyede başlar; üçüncü seviyede d de vardır.', 'f türü dördüncü seviyede başlar; üçüncü seviyede bulunmaz.'],
      right: 's her seviyede vardır; p ikincide, d üçüncüde başlar.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        satirlar[3].tur.style.opacity = 0.3;
        satirlar[3].kutular.style.opacity = 0.3;
        satirlar[3].adet.style.opacity = 0.3;
      } });

    /* Üçüncü seviyenin kutuları tablodan çıkıp tek satırda toplanır. */
    const UY = 230, INIS = 120, GX = [250, 352, 578];
    await c.tween(800, (e) => {
      tablo.style.opacity = 1 - e;
      satirlar[3].kutular.style.opacity = 0.3 * (1 - e);
      GX.forEach((gx, i) => yerlestir(satirlar[i].kutular, c.lerp(KX, gx, e), c.lerp(satirY(i), UY, e)));
    });
    tablo.remove();
    satirlar[3].kutular.remove();
    const toplu = c.S('g', {}, svg);
    const baslik = yazi(c, toplu, 500, 52, 'Üçüncü enerji seviyesi', { size: 30, renk: RENK.soluk });
    const ortaX = (gx, n) => gx + ((n - 1) * ADIM + BOY) / 2;
    const altAd = (p, seviye, i, y) => yazi(c, p, ortaX(GX[i], TURLER[i][1]), y - 16, seviye + TURLER[i][0], { size: 28, renk: ORB });
    const ucuncu = c.S('g', {}, svg);
    const ucAdlar = c.S('g', {}, ucuncu);
    [0, 1, 2].forEach((i) => { ucuncu.appendChild(satirlar[i].kutular); altAd(ucAdlar, 3, i, UY); });
    await Promise.all([belir(c, toplu, 350), belir(c, ucAdlar, 350)]);
    await c.say('Üçüncü seviyede 3s, 3p ve 3d bulunur; f dördüncüde başlar.',
      { speak: 'Üçüncü seviyede üç se, üç pe ve üç de bulunur; fe dördüncüde başlar.' });

    const toplam = yazi(c, toplu, 562, 372, '1 + 3 + 5 = 9', { size: 42, renk: RENK.vurgu });
    toplam.style.opacity = 0;
    await c.choice({ tag: 'Uygula', q: 'Üçüncü enerji seviyesinde toplam kaç orbital vardır?', options: ['3', '5', '9'], answer: 2,
      hints: ['Üç, alt enerji seviyelerinin sayısı; kutuları tek tek say.', 'Beş, yalnızca 3d orbitallerinin sayısı.', ''],
      right: '1 + 3 + 5 = 9 orbital.',
      onPick: (i, dogru) => { if (dogru) toplam.style.opacity = 1; } });
    await c.say('Bir 3s, üç 3p ve beş 3d orbitali: toplam dokuz.',
      { speak: 'Bir tane üç se, üç tane üç pe ve beş tane üç de orbitali: toplam dokuz.' });

    await sil(c, toplam, 300);
    await c.tween(500, (e) => yerlestir(ucuncu, 0, INIS * e));
    baslik.textContent = 'Seviyelerdeki orbital sayısı';
    const ust = c.S('g', {}, toplu);
    const SY = [110, 230];
    yerlestir(kutuDizisi(c, ust, 1), GX[0], SY[0]);
    altAd(ust, 1, 0, SY[0]);
    [0, 1].forEach((i) => {
      yerlestir(kutuDizisi(c, ust, TURLER[i][1]), GX[i], SY[1]);
      altAd(ust, 2, i, SY[1]);
    });
    yazi(c, ust, 930, 92, 'Toplam', { size: 24, renk: RENK.soluk });
    const toplamlar = [[SY[0], '1'], [SY[1], '4'], [UY + INIS, '9']].map(([y, t], i) => {
      yazi(c, ust, 120, y + 34, (i + 1) + '. seviye', { size: 28 });
      return yazi(c, ust, 930, y + 38, t, { size: 40, renk: RENK.vurgu });
    });
    await belir(c, ust);
    await c.say('Birinci seviyede bir, ikincide dört, üçüncüde dokuz orbital bulunur.');
    toplamlar.forEach((t) => { t.style.fill = ODAK; });
    await belir(c, yazi(c, toplu, 500, 500, 'Dışa doğru: daha çok orbital', { size: 28, renk: ODAK }), 350);
    await c.say('Amfinin arka sıraları gibi, dış seviyelerde daha çok orbital vardır.');
    c.note('<b>s: 1, p: 3, d: 5, f: 7 orbital</b><br>Üçüncü seviye: 1 + 3 + 5 = 9', 'Orbital sayıları');
  }

  /* ---- Sahne 3 · Enerjiyi veriyle karşılaştır ---- */
  async function veriyleKarsilastir(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    eksen(c, giris, 200, 470, 110);
    const ornekler = [410, 300, 180].map((y) => {
      const g = c.S('g', {}, giris);
      c.S('line', { x1: 290, y1: y, x2: 410, y2: y, stroke: ORB, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
      yazi(c, g, 434, y + 9, 'orbital', { size: 26, hiza: 'start', renk: RENK.soluk });
      g.style.opacity = 0;
      return g;
    });
    for (const g of ornekler) await c.tween(300, (e) => { g.style.opacity = e; });
    await c.say('Her orbitalin kendine özgü bir enerjisi vardır.');
    const bagil = c.S('g', {}, giris);
    ciftOk(c, bagil, 600, 184, 296, ODAK);
    yazi(c, bagil, 626, 236, 'bağıl enerji', { size: 30, hiza: 'start', renk: ODAK });
    yazi(c, bagil, 626, 272, 'birbirine göre', { size: 26, hiza: 'start', renk: RENK.soluk });
    await belir(c, bagil, 400);
    await c.say('Orbitallerin birbirine göre enerjisine bağıl enerji denir.');
    await belir(c, yazi(c, giris, 710, 420, 'Deneyle belirlenir', { size: 30, renk: RENK.vurgu }), 400);
    await c.say('Bilim insanları orbital enerjilerini deneysel çalışmalarla belirler.');

    /* Elektron (ok) başlangıç çizgisinden yukarı çıkarılır; elektronun x ve y'si translate ile verilir. */
    await sil(c, giris);
    const deney = c.S('g', {}, svg);
    const TABAN = 440, alttaY = TABAN - 72, kutudaY = 120;
    c.S('line', { x1: 110, y1: TABAN, x2: 450, y2: TABAN, stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, deney);
    yazi(c, deney, 280, 480, 'başlangıç', { size: 26, renk: RENK.soluk });
    const gecici = c.S('g', {}, deney);
    c.S('line', { x1: 110, y1: 210, x2: 450, y2: 210, stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-dasharray': '10 10' }, gecici);
    yazi(c, gecici, 300, 414, 'elektron', { size: 26, hiza: 'start', renk: RENK.soluk });
    yazi(c, gecici, 470, 219, 'daha yüksek enerjili seviye', { size: 26, hiza: 'start', renk: RENK.soluk });
    const alir = c.S('g', {}, gecici);
    c.S('path', { d: 'M 230 424 L 230 232 M 221 248 L 230 232 L 239 248', fill: 'none', stroke: ODAK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, alir);
    yazi(c, alir, 300, 320, 'enerji alır', { size: 30, hiza: 'start', renk: ODAK });
    alir.style.opacity = 0;
    const elektron = elektronOku(c, deney, 0, 0, 1);
    yerlestir(elektron, 280, alttaY);
    await belir(c, deney);
    await belir(c, alir, 300);
    await c.tween(900, (e) => yerlestir(elektron, 280, c.lerp(alttaY, 210 - 72, e)));
    await c.say('Önceki derste gördük: elektron enerji alınca daha yüksek enerjili seviyeye çıkar.');

    const olcum = c.S('g', {}, svg);
    yazi(c, olcum, 735, 96, 'Gereken enerji', { size: 30, renk: RENK.soluk });
    c.S('line', { x1: 580, y1: TABAN, x2: 890, y2: TABAN, stroke: RENK.cizgi, 'stroke-width': 3 }, olcum);
    const cubuk = (x, ad, renk) => {
      yazi(c, olcum, x + 45, 480, ad, { size: 26 });
      return c.S('rect', { x, y: TABAN, width: 90, height: 0, rx: 4, fill: renk }, olcum);
    };
    const cubuk2s = cubuk(610, '2s için', ORB), cubuk2p = cubuk(770, '2p için', ODAK);
    const doldur = (r, boy, e) => { r.setAttribute('y', TABAN - boy * e); r.setAttribute('height', boy * e); };
    const hedefler = c.S('g', {}, deney);
    orbitalKutusu(c, hedefler, 160, kutudaY, 0, { renk: ORB });
    orbitalKutusu(c, hedefler, 320, kutudaY, 0, { renk: ODAK });
    yazi(c, hedefler, 200, kutudaY - 16, '2s', { size: 30, renk: ORB });
    yazi(c, hedefler, 360, kutudaY - 16, '2p', { size: 30, renk: ODAK });
    await c.tween(500, (e) => { gecici.style.opacity = 1 - e; yerlestir(elektron, c.lerp(280, 200, e), c.lerp(210 - 72, alttaY, e)); });
    gecici.remove();
    await Promise.all([belir(c, hedefler, 350), belir(c, olcum, 350)]);
    await c.tween(1000, (e) => { yerlestir(elektron, 200, c.lerp(alttaY, kutudaY, e)); doldur(cubuk2s, 140, e); });
    await c.say('Bir atomda elektronu 2s orbitaline çıkarmak için belli bir enerji gerekir.',
      { speak: 'Bir atomda elektronu iki se orbitaline çıkarmak için belli bir enerji gerekir.' });
    await c.tween(500, (e) => yerlestir(elektron, c.lerp(200, 360, e), c.lerp(kutudaY, alttaY, e)));
    await c.tween(1200, (e) => { yerlestir(elektron, 360, c.lerp(alttaY, kutudaY, e)); doldur(cubuk2p, 250, e); });
    await c.say('Aynı elektronu 2p orbitaline çıkarmak için daha çok enerji gerekir.',
      { speak: 'Aynı elektronu iki pe orbitaline çıkarmak için daha çok enerji gerekir.' });

    await c.choice({ q: 'Bu veriden hangi önerme çıkar?',
      options: ['2s, 2p’den daha yüksek enerjilidir.', '2p, 2s’den daha yüksek enerjilidir.', '2s ve 2p eş enerjilidir.'], answer: 1,
      hints: ['2s’ye çıkmak için daha az enerji gerekti; daha çok enerji isteyen 2p’ydi.', '', 'Gereken enerjiler eşit değildi; çubukların boyu farklı.'],
      right: 'Daha çok enerji isteyen orbital, daha yüksek enerjili olandır.' });

    await sil(c, deney);
    const diyagram = c.S('g', {}, svg);
    eksen(c, diyagram, 110, 470, 110);
    const b2s = basamak(c, diyagram, '2s', 230, 330, { renk: ORB }), b2p = basamak(c, diyagram, '2p', 230, 180, { renk: ODAK });
    b2s.g.style.opacity = 0;
    b2p.g.style.opacity = 0;
    await belir(c, diyagram, 300);
    await c.tween(600, (e) => { b2s.g.style.opacity = e; yerlestir(b2s.g, 0, 110 * (1 - e)); });
    await c.tween(800, (e) => { b2p.g.style.opacity = e; yerlestir(b2p.g, 0, 260 * (1 - e)); });
    await c.say('Çıkmak için daha çok enerji gerekiyorsa orbital daha yüksek enerjilidir.');
    const sonuc = c.S('g', {}, diyagram);
    yazi(c, sonuc, 300, 440, '2s < 2p', { size: 40, renk: RENK.vurgu });
    yazi(c, sonuc, 300, 486, 'aynı seviye, farklı enerji', { size: 26, renk: RENK.soluk });
    await belir(c, sonuc, 400);
    await c.say('Demek ki aynı enerji seviyesindeki farklı türlerin enerjisi eşit değildir.',
      { speak: '[thoughtful] Demek ki aynı enerji seviyesindeki farklı türlerin enerjisi eşit değildir.' });

    await sil(c, olcum);
    const itme = c.S('g', {}, svg), ix = 770, iy = 290;
    yazi(c, itme, ix, 96, 'Çok elektronlu atom', { size: 30, renk: RENK.soluk });
    [90, 210, 330].forEach((derece) => {
      const a = derece * Math.PI / 180, cx = Math.cos(a), cy = -Math.sin(a);
      const u = { x: ix + 132 * cx, y: iy + 132 * cy };
      const ex = ix + 62 * cx, ey = iy + 62 * cy;
      c.S('circle', { cx: ex, cy: ey, r: 16, fill: ORB }, itme);
      c.S('line', { x1: ex - 8, y1: ey, x2: ex + 8, y2: ey, stroke: KOYU, 'stroke-width': 3 }, itme);
      c.S('path', { d: `M ${ix + 88 * cx} ${iy + 88 * cy} L ${u.x} ${u.y} M ${u.x - 14 * cx + 9 * cy} ${u.y - 14 * cy - 9 * cx} L ${u.x} ${u.y} L ${u.x - 14 * cx - 9 * cy} ${u.y - 14 * cy + 9 * cx}`,
        fill: 'none', stroke: ODAK, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, itme);
    });
    yazi(c, itme, ix, iy + 10, 'itme', { size: 28, renk: ODAK });
    await belir(c, itme);
    await c.say('Birden çok elektronu olan atomda elektronlar birbirini iter.');
    const fark = c.S('g', {}, diyagram);
    ciftOk(c, fark, 432, 192, 318, RENK.vurgu);
    yazi(c, fark, 452, 264, 'enerji farkı', { size: 26, hiza: 'start', renk: RENK.vurgu });
    await belir(c, fark, 400);
    await c.say('Bu itme, aynı seviyedeki alt enerji seviyelerinin enerjisini birbirinden ayırır.');
    c.note('<b>Önerme veriye dayanır.</b><br>2p’ye çıkmak daha çok enerji ister: 2s &lt; 2p', 'Veriden önerme');
  }

  /* ---- Sahne 4 · Veriye dayanan ve dayanmayan önerme ---- */
  async function dayananOnerme(c) {
    const svg = c.svg();
    const genel = c.S('g', {}, svg);
    yazi(c, genel, 580, 60, 'Bağıl enerji diyagramı', { size: 32, renk: RENK.soluk });
    eksen(c, genel, 200, 470, 110);
    basamak(c, genel, '2s', 340, 390);
    const p2 = basamak(c, genel, '2p', 340, 230);
    await belir(c, genel);
    await c.say('Deneylerle belirlenen enerji sırası, bağıl enerji diyagramında gösterilir.');
    const tek = c.S('g', {}, genel);
    p2.cizgiler[2].setAttribute('stroke', ODAK);
    c.S('line', { x1: 514, y1: 230, x2: 566, y2: 230, stroke: ODAK, 'stroke-width': 2 }, tek);
    yazi(c, tek, 580, 240, 'bir çizgi = bir orbital', { size: 28, hiza: 'start', renk: ODAK });
    await belir(c, tek, 350);
    await c.say('Diyagramda her kısa çizgi bir orbitaldir.');
    const yon = c.S('g', {}, genel);
    yazi(c, yon, 178, 140, 'yüksek', { size: 26, hiza: 'end', renk: RENK.vurgu });
    yazi(c, yon, 178, 468, 'düşük', { size: 26, hiza: 'end', renk: RENK.vurgu });
    await belir(c, yon, 350);
    await c.say('Çizgi ne kadar yukarıdaysa orbitalin enerjisi o kadar yüksektir.');

    await sil(c, genel);
    const ikili = c.S('g', {}, svg);
    const a4s = buyukAd(c, ikili, 300, 290, '4s', 120, ORB), a3d = buyukAd(c, ikili, 700, 290, '3d', 120, ORB);
    await belir(c, ikili);
    await c.say('Şimdi 4s ile 3d orbitallerini karşılaştıralım.', { speak: 'Şimdi dört se ile üç de orbitallerini karşılaştıralım.' });
    const soz = c.S('g', {}, ikili);
    kutu(c, soz, 240, 370, 520, 90, { renk: ODAK });
    yazi(c, soz, 500, 429, '3 < 4  →  3d < 4s ?', { size: 38 });
    await belir(c, soz, 400);
    await c.say('Bir önerme yalnızca sayıya bakıyor: “3 küçük, öyleyse 3d düşük enerjili.”',
      { speak: 'Bir önerme yalnızca sayıya bakıyor: üç küçük, öyleyse üç de düşük enerjili.' });
    a4s.sayi.style.fill = ODAK;
    a3d.sayi.style.fill = ODAK;
    await belir(c, yazi(c, ikili, 500, 512, 'Gerekçe: baştaki sayı', { size: 28, renk: ODAK }), 350);
    await c.say('Bu önermenin gerekçesi bir ölçüm değil, baştaki sayıdır.',
      { speak: '[thoughtful] Bu önermenin gerekçesi bir ölçüm değil, baştaki sayıdır.' });

    await sil(c, ikili);
    const kesit = c.S('g', {}, svg);
    eksen(c, kesit, 110, 470, 110);
    const k4s = basamak(c, kesit, '4s', 250, 370);
    basamak(c, kesit, '3d', 250, 220);
    const kart = c.S('g', {}, kesit);
    yazi(c, kart, 780, 150, 'Önerme', { size: 26, renk: RENK.soluk });
    kutu(c, kart, 610, 170, 340, 90, { renk: ODAK });
    yazi(c, kart, 780, 226, '3 < 4 → 3d < 4s ?', { size: 30 });
    await belir(c, kesit);
    await c.say('Diyagramda 4s ve 3d çizgilerinin yüksekliğine bak.', { speak: 'Diyagramda dört se ve üç de çizgilerinin yüksekliğine bak.' });

    await c.choice({ tag: 'Uygula', q: 'Hangi önerme veriye dayanır?',
      options: ['3d, 4s’ten düşük enerjilidir; çünkü 3, 4’ten küçüktür.', '3d daha yüksek enerjilidir; çünkü d türünde beş orbital vardır.',
        '4s, 3d’den düşük enerjilidir; çünkü diyagramda çizgisi daha aşağıdadır.'], answer: 2,
      hints: ['Bu gerekçe baştaki sayıya bakıyor; diyagramda 3d çizgileri 4s çizgisinin üstünde.',
        'Sonuç doğru ama gerekçe orbital sayısı; orbital sayısı bir enerji verisi değildir.', ''],
      right: 'Gerekçe diyagramdan geliyor: 4s çizgisi daha aşağıda.' });
    boya(k4s, RENK.vurgu);
    await belir(c, yazi(c, kesit, 388, 478, '4s < 3d', { size: 38, renk: RENK.vurgu }), 350);
    await c.say('Diyagramda 4s çizgisi, beş 3d çizgisinin altında durur.',
      { speak: 'Diyagramda dört se çizgisi, beş tane üç de çizgisinin altında durur.' });

    await sil(c, kart, 300);
    const gerekce = c.S('g', {}, kesit);
    const satir = (p, y, metin, renk) => {
      kutu(c, p, 620, y, 320, 66, { renk });
      yazi(c, p, 780, y + 43, metin, { size: 28 });
    };
    yazi(c, gerekce, 780, 132, 'Gerekçe', { size: 26, renk: RENK.soluk });
    satir(gerekce, 152, 'Ölçüm, diyagram', 'var(--good)');
    yazi(c, gerekce, 780, 256, 'veriye dayanır', { size: 26, renk: 'var(--good)' });
    await belir(c, gerekce, 400);
    await c.say('Veriye dayanan önerme, gerekçesini ölçümden ya da diyagramdan alır.');
    const dayanmaz = c.S('g', {}, kesit);
    satir(dayanmaz, 300, 'Baştaki sayı', 'var(--bad)');
    satir(dayanmaz, 378, 'Orbital sayısı', 'var(--bad)');
    yazi(c, dayanmaz, 780, 482, 'veriye dayanmaz', { size: 26, renk: 'var(--bad)' });
    await belir(c, dayanmaz, 400);
    await c.say('Sonucu doğru olsa bile gerekçesi veri değilse önerme veriye dayanmaz.');
    c.note('<b>Sırayı baştaki sayı değil, enerji belirler.</b><br>4s &lt; 3d', 'Veriye dayanan önerme');
  }

  /* ---- Sahne 5 · Diyagramla geçersizi ayıkla ---- */
  async function gecersiziAyikla(c) {
    const svg = c.svg();
    const d = c.S('g', {}, svg);
    eksen(c, d, 130, 480, 100);
    const YUK = { '1s': 460, '2s': 380, '2p': 310, '3s': 220, '3p': 150 };
    const b = {};
    for (const ad of Object.keys(YUK)) {
      b[ad] = basamak(c, d, ad, 280, YUK[ad], { ara: 30 });
      await belir(c, b[ad].g, 220);
    }
    await c.say('Diyagramın alt bölümüne bakalım: 1s, 2s, 2p, 3s ve 3p.',
      { speak: 'Diyagramın alt bölümüne bakalım: bir se, iki se, iki pe, üç se ve üç pe.' });
    boya(b['2p'], ODAK);
    const yan = yazi(c, d, 500, 320, '3 çizgi', { size: 28, hiza: 'start', renk: ODAK });
    await belir(c, yan, 300);
    await c.say('2p alt enerji seviyesinde üç orbital, yani üç çizgi var.', { speak: 'İki pe alt enerji seviyesinde üç orbital, yani üç çizgi var.' });
    const kilavuz = c.S('line', { x1: 130, y1: 310, x2: 484, y2: 310, stroke: RENK.soluk, 'stroke-width': 2, 'stroke-dasharray': '6 8' }, d);
    d.insertBefore(kilavuz, b['1s'].g);
    yan.textContent = 'aynı yükseklik';
    await Promise.all([belir(c, kilavuz, 350), belir(c, yan, 350)]);
    await c.say('Üç 2p çizgisi aynı yükseklikte duruyor.', { speak: 'Üç tane iki pe çizgisi aynı yükseklikte duruyor.' });
    const esit = (ad, renk) => [0, 1].map((k) => yazi(c, d, 280 + 44 + 15 + k * 74, YUK[ad] + 9, '=', { size: 28, renk }));
    kilavuz.remove();
    const esit2p = esit('2p', ODAK);
    yan.textContent = 'eşit enerji';
    await Promise.all([...esit2p.map((t) => belir(c, t, 350)), belir(c, yan, 350)]);
    await c.say('Aynı alt enerji seviyesindeki orbitallerin enerjileri birbirine eşittir.',
      { speak: 'Aynı alt enerji seviyesindeki orbitallerin enerjileri [short pause] birbirine eşittir.' });
    yan.textContent = 'eş enerjili';
    await belir(c, yan, 350);
    await c.say('Böyle orbitallere eş enerjili orbitaller denir.');

    await c.choice({ tag: 'Uygula', q: 'Diyagrama göre hangi çıkarım geçersizdir?',
      options: ['3s ve 3p eş enerjilidir; çünkü ikisi de üçüncü seviyededir.', 'Üç 3p orbitali eş enerjilidir.', '3s, 3p’den düşük enerjilidir.'], answer: 0,
      hints: ['', 'Üç 3p çizgisi aynı yükseklikte; bu çıkarım diyagramla uyuşur.', '3s çizgisi 3p çizgilerinin altında; bu çıkarım diyagramla uyuşur.'],
      right: 'Aynı seviyede olmak yetmez; 3s ve 3p farklı alt enerji seviyeleridir.' });
    boya(b['3s'], RENK.vurgu);
    boya(b['3p'], RENK.vurgu);
    const esitDegil = c.S('g', {}, d);
    ciftOk(c, esitDegil, 500, 158, 212, 'var(--bad)');
    yazi(c, esitDegil, 520, 194, 'eşit değil', { size: 28, hiza: 'start', renk: 'var(--bad)' });
    await belir(c, esitDegil, 350);
    await c.say('3s çizgisi 3p çizgilerinin altında; enerjileri eşit değil.', { speak: 'Üç se çizgisi üç pe çizgilerinin altında; enerjileri eşit değil.' });
    const esit3p = esit('3p', RENK.vurgu);
    await Promise.all(esit3p.map((t) => belir(c, t, 350)));
    await c.say('Eş enerji, yalnızca aynı alt enerji seviyesinin orbitalleri için geçerlidir.');
    await sil(c, esitDegil, 300);
    const yargi = c.S('g', {}, d);
    yazi(c, yargi, 800, 150, '3s < 3p', { size: 36 });
    yazi(c, yargi, 800, 192, 'uyuşur, kalır', { size: 26, renk: 'var(--good)' });
    yazi(c, yargi, 800, 300, '3s = 3p', { size: 36, renk: RENK.soluk });
    c.S('line', { x1: 728, y1: 288, x2: 872, y2: 288, stroke: 'var(--bad)', 'stroke-width': 4, 'stroke-linecap': 'round' }, yargi);
    yazi(c, yargi, 800, 342, 'çelişir, ayıklanır', { size: 26, renk: 'var(--bad)' });
    await belir(c, yargi, 400);
    await c.say('Diyagramla çelişen çıkarım ayıklanır, diyagramla uyuşan kalır.');
    c.note('<b>Aynı alt enerji seviyesindeki orbitaller eş enerjilidir.</b><br>Üç 2p orbitali', 'Eş enerji');
  }

  /* ---- Sahne 6 · Sırayı kur ---- */
  async function sirayiKur(c) {
    const svg = c.svg();
    const d = c.S('g', {}, svg);
    eksen(c, d, 110, 502, 92);
    const b = {};
    const hepsi = (renk) => SIRA.forEach((ad) => boya(b[ad], renk));
    for (let i = 0; i < SIRA.length; i++) {
      b[SIRA[i]] = basamak(c, d, SIRA[i], 250, 484 - i * 52, { w: 40, ara: 12, size: 28 });
      await belir(c, b[SIRA[i]].g, 160);
    }
    await c.say('Şimdi diyagramın tamamına bakalım: 1s’ten 4p’ye sekiz basamak.',
      { speak: 'Şimdi diyagramın tamamına bakalım: bir seden dört peye sekiz basamak.' });
    boya(b['1s'], RENK.vurgu);
    await c.say('En altta 1s durur; en düşük enerjili orbital odur.', { speak: 'En altta bir se durur; en düşük enerjili orbital odur.' });
    const tara = async (ms) => {
      for (const ad of SIRA) { hepsi(ORB); boya(b[ad], RENK.vurgu); await c.wait(ms); }
      hepsi(ORB);
    };
    await tara(170);
    await c.say('Yukarı çıktıkça orbitallerin enerjisi artar.');

    const KARTLAR = ['4p', '3p', '3d', '4s'], DOGRU = ['3p', '4s', '3d', '4p'];
    const kx = (k) => 592 + k * 100, KW = 76;
    const oyun = c.S('g', {}, svg);
    yazi(c, oyun, 784, 86, 'Karışık kartlar', { size: 26, renk: RENK.soluk });
    const kart = {};
    KARTLAR.forEach((ad, k) => {
      kart[ad] = c.S('g', {}, oyun);
      kutu(c, kart[ad], kx(k), 106, KW, 64, { renk: ORB });
      yazi(c, kart[ad], kx(k) + KW / 2, 149, ad, { size: 30 });
    });
    yazi(c, oyun, 784, 286, 'Düşük enerjiden yükseğe', { size: 26, renk: RENK.soluk });
    DOGRU.forEach((ad, k) => {
      c.S('rect', { x: kx(k), y: 306, width: KW, height: 64, rx: 10, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, oyun);
      if (k) kucuktur(c, oyun, kx(k) - 12, 338, 5);
    });
    await belir(c, oyun);
    await c.say('Karışık verilen orbitalleri sıralarken çizgilerin yüksekliğine bakarız.');

    let kalan = KARTLAR.slice();
    for (let n = 0; n < DOGRU.length; n++) {
      const ad = DOGRU[n];
      if (kalan.length > 1) {
        await c.choice({ tag: 'Sıra sende', q: n ? 'Kalan kartlardan en düşük enerjili olan hangisi?' : 'Dört karttan en düşük enerjili olan hangisi?',
          options: kalan, answer: kalan.indexOf(ad),
          hints: kalan.map((k) => (k === ad ? '' : `${k} çizgisi daha yukarıda; kalan kartlar içinde daha aşağıda duran var.`)),
          right: `${ad}, kalan kartların diyagramda en altta duranı.` });
      }
      kalan = kalan.filter((k) => k !== ad);
      kart[ad].style.opacity = 0.25;
      boya(b[ad], RENK.vurgu);
      await belir(c, yazi(c, oyun, kx(n) + KW / 2, 349, ad, { size: 30, renk: RENK.vurgu }), 350);
    }
    await c.wait(500);

    await sil(c, oyun);
    hepsi(ORB);
    const genel = c.S('g', {}, svg);
    yazi(c, genel, 770, 110, 'Genel sıra', { size: 28, renk: RENK.soluk });
    const jeton = {};
    for (let i = 0; i < SIRA.length; i++) {
      const x = 620 + (i % 4) * 100, y = i < 4 ? 180 : 250;
      if (i) kucuktur(c, genel, x - 50, y - 10);
      jeton[SIRA[i]] = yazi(c, genel, x, y, SIRA[i], { size: 32 });
      hepsi(ORB);
      boya(b[SIRA[i]], RENK.vurgu);
      await belir(c, jeton[SIRA[i]], 150);
    }
    hepsi(ORB);
    await c.say('Genel sıra şöyledir: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.',
      { speak: 'Genel sıra şöyledir: bir se, iki se, iki pe, üç se, üç pe, dört se, üç de, dört pe.' });
    ['4s', '3d'].forEach((ad) => { boya(b[ad], ODAK); jeton[ad].style.fill = ODAK; });
    await c.say('4s, numarası büyük olduğu hâlde 3d’den önce gelir.',
      { speak: '[thoughtful] Dört se, numarası büyük olduğu hâlde üç deden önce gelir.' });
    const sinir = yazi(c, genel, 770, 340, 'Çok elektronlu atomlar için', { size: 28, renk: RENK.vurgu });
    await belir(c, sinir, 350);
    await c.say('Bu, birden çok elektronu olan atomlar için genel sıradır.');
    /* Aralıklar değişir, sıra aynı kalır: basamaklar yer değiştirmeden biraz açılıp kapanır. */
    const KAYMA = [0, 6, -4, 6, -4, 4, 4, 0];
    const kaydir = (e) => SIRA.forEach((ad, i) => yerlestir(b[ad].g, 0, KAYMA[i] * e));
    sinir.textContent = 'Aralıklar atomdan atoma değişir';
    await belir(c, sinir, 300);
    await c.tween(800, (e) => kaydir(e));
    await c.say('Enerjilerin değeri ve aralarındaki fark atomdan atoma değişir.');
    await c.tween(500, (e) => kaydir(1 - e));

    await sil(c, genel);
    hepsi(ORB);
    const yazilan = c.S('g', {}, svg);
    const etiket = yazi(c, yazilan, 770, 110, 'Yazılan sıra', { size: 28, renk: RENK.soluk });
    const jx = (k) => 590 + k * 90;
    const dizi = ['2p', '3s', '3p', '3d', '4s'].map((ad, k) => {
      if (k) kucuktur(c, yazilan, jx(k) - 45, 170);
      return yazi(c, yazilan, jx(k), 180, ad, { size: 32 });
    });
    await belir(c, yazilan);
    await c.choice({ tag: 'Uygula', q: 'Bir sıralama şöyle yazılmış: 2p &lt; 3s &lt; 3p &lt; 3d &lt; 4s. Hangi düzeltme gerekir?',
      options: ['3s ile 3p yer değiştirmeli.', '3d ile 4s yer değiştirmeli.', 'Düzeltme gerekmez.'], answer: 1,
      hints: ['Diyagramda 3s çizgisi 3p çizgilerinin altında; bu ikisi doğru yerde.', '',
        'Diyagramda 4s çizgisi 3d çizgilerinin altında; yazılan sırada tersine konmuş.'],
      right: '4s, 3d’den düşük enerjilidir; ikisi yer değiştirmeli.' });
    dizi[3].style.fill = 'var(--good)';
    dizi[4].style.fill = 'var(--good)';
    await c.tween(700, (e) => { dizi[3].setAttribute('x', c.lerp(jx(3), jx(4), e)); dizi[4].setAttribute('x', c.lerp(jx(4), jx(3), e)); });
    etiket.textContent = 'Doğru sıra';
    etiket.style.fill = 'var(--good)';
    await c.say('Doğru sıra 2p, 3s, 3p, 4s, 3d şeklindedir.', { speak: 'Doğru sıra iki pe, üç se, üç pe, dört se, üç de şeklindedir.' });
    await sil(c, yazilan, 300);
    const son = c.S('g', {}, svg);
    await belir(c, yazi(c, son, 770, 200, 'Elektron yerleşimi bu sırayı izler', { size: 28, renk: RENK.vurgu }), 350);
    await tara(140);
    await c.say('Elektronların orbitallere yerleşimini de bu enerji sırası belirler.');
    ['4s', '3d'].forEach((ad) => boya(b[ad], ODAK));
    await belir(c, yazi(c, son, 770, 330, '4s < 3d', { size: 52, renk: ODAK }), 400);
    await c.say('Sırayı numara değil, enerji belirler.', { speak: 'Sırayı numara değil, [short pause] enerji belirler.' });
  }

  Ders.start({
    id: 'etkilesim-d1', kicker: 'Konu D · Orbitallerin enerjisi', title: 'Enerji sırasını veriden kur', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'Enerji sırasını veriden kur', hook: '4s mi, 3d mi daha düşük enerjili?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Orbitalin adı', goal: 'Orbital adındaki sayıyı ve harfi oku.', run: orbitalinAdi },
      { title: 'Dört tür, kaç orbital?', goal: 'Türlerin ve seviyelerin orbital sayısını bul.', run: turVeSayi },
      { title: 'Enerjiyi veriyle karşılaştır', goal: 'Gereken enerjiden bir önerme kur.', run: veriyleKarsilastir },
      { title: 'Veriye dayanan ve dayanmayan önerme', goal: 'Önermenin gerekçesine bak.', run: dayananOnerme },
      { title: 'Diyagramla geçersizi ayıkla', goal: 'Diyagramla çelişen çıkarımı bul.', run: gecersiziAyikla },
      { title: 'Sırayı kur', goal: 'Orbitalleri düşük enerjiliden yükseğe diz.', run: sirayiKur },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '“Baştaki sayısı küçük olan orbital her zaman daha düşük enerjilidir.” Bu önermeyi hangi çift çürütür?',
        options: ['1s ve 2s', '4s ve 3d', '2p ve 3s'], answer: 1,
        why: ['1s, 2s’den düşük enerjilidir; bu çift önermeye uyar.', '4s, numarası büyük olduğu hâlde 3d’den düşük enerjilidir.',
          '2p, 3s’den düşük enerjilidir; bu çift önermeye uyar.'], scene: 3 },
      { q: '3d alt enerji seviyesindeki orbitaller için hangisi doğrudur?',
        options: ['Üç orbitaldir ve eş enerjilidir.', 'Beş orbitaldir; enerjileri birbirinden farklıdır.', 'Beş orbitaldir ve eş enerjilidir.'], answer: 2,
        why: ['Üç orbital p türündedir; d türünde beş orbital vardır.', 'Aynı alt enerji seviyesindeki orbitaller eş enerjilidir.',
          'd türü beş özdeş orbitalden oluşur; aynı alt enerji seviyesinde oldukları için eş enerjilidir.'], scene: 4 },
    ], summary: ['<b>Sırayı numara değil, enerji belirler.</b>', 'Genel sıra: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.'],
    nextLesson: { href: 'e1-aufbau.html', label: 'Sonraki: Önce düşük enerji ›' },
  });
})();
