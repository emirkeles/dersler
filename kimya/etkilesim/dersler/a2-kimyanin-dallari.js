/* A2 · KİM.9.1.1 · Senaryo: plan/kimya/etkilesim/senaryolar/A-gunluk-hayatta-kimya.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 25–28'den (altı alt disiplin, programlar ve unvanlar, Kimya Teknoloji Merkezi,
   Aziz Sancar, Oktay Sinanoğlu). Öğrenciye kitap ya da sayfa anılmaz. Kişi kartları portresizdir. Plastik iki dalda da
   sayıldığı için eşleştirmede kullanılmaz. Her dalın rengi ders boyunca aynıdır. */
(() => {
  'use strict';
  const { RENK, yazi, kart, belir } = KIT;
  const KOYU = '#162038', GRI = '#8f9bbd';
  const DAL = {
    analitik: { ad: 'Analitik kimya', renk: 'var(--c1)' },
    biyo: { ad: 'Biyokimya', renk: 'var(--c3)' },
    organik: { ad: 'Organik kimya', renk: 'var(--c2)' },
    anorganik: { ad: 'Anorganik kimya', renk: 'var(--c6)' },
    fiziko: { ad: 'Fizikokimya', renk: 'var(--c4)' },
    polimer: { ad: 'Polimer kimyası', renk: 'var(--c5)' },
  };

  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx,
    fill: o.fill || KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const cizgi = (c, p, d, renk = RENK.cizgi, kalin = 4) => c.S('path', { d, fill: 'none', stroke: renk, 'stroke-width': kalin,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  /* (x1, y1) noktasından (x2, y2) noktasına ok. */
  function ok(c, p, x1, y1, x2, y2, renk = RENK.cizgi) {
    const a = Math.atan2(y2 - y1, x2 - x1), u = 13;
    const kanat = (d) => `M ${x2} ${y2} L ${x2 - u * Math.cos(a + d)} ${y2 - u * Math.sin(a + d)}`;
    return cizgi(c, p, `M ${x1} ${y1} L ${x2} ${y2} ${kanat(0.5)} ${kanat(-0.5)}`, renk);
  }
  const sil = async (c, el, ms = 300) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };

  /* Bir dalın kartı: 430 × 460 çerçeve ve dalın renginde başlık. m: kartın orta çizgisi. */
  function dalKart(c, p, dal, x) {
    const g = c.S('g', {}, p);
    const cerceve = kutu(c, g, x, 60, 430, 460, { renk: dal.renk });
    yazi(c, g, x + 215, 112, dal.ad, { size: 34, renk: dal.renk });
    return { g, cerceve, m: x + 215 };
  }

  /* ---- Sahne 1 · Kimya neyi inceler? ---- */
  async function neyi(c) {
    const svg = c.svg();
    const zincir = c.S('g', {}, svg);
    const HALKA = ['Madde', 'Özellik', 'Etkileşim', 'Sonuç'];
    const halka = (i) => {
      const g = c.S('g', {}, zincir), x = 60 + i * 230;
      kutu(c, g, x, 150, 190, 84);
      yazi(c, g, x + 95, 203, HALKA[i], { size: 30 });
      if (i) ok(c, g, x - 34, 192, x - 6, 192);
      return g;
    };
    const ornek = c.S('g', {}, zincir);
    yazi(c, ornek, 155, 282, 'Limon tuzu', { size: 26, renk: RENK.soluk });
    yazi(c, ornek, 385, 282, 'kireci çözer', { size: 26, renk: RENK.soluk });
    halka(0); halka(1);
    await belir(c, zincir);
    await c.say('Önceki derste gördük: bir ürünün işini maddenin özelliği belirler.');
    ornek.remove();
    const baslik = yazi(c, zincir, 500, 92, 'Kimya neyi inceler?', { size: 34, renk: RENK.soluk });
    await Promise.all([belir(c, baslik), belir(c, halka(2)), belir(c, halka(3))]);
    await c.say('Kimya; maddelerin özelliklerini, etkileşimlerini ve bu etkileşimlerin sonuçlarını inceler.');
    const urunler = c.S('g', {}, zincir);
    ['Besin', 'Gübre', 'Deterjan', 'Şampuan'].forEach((ad, i) => {
      const x = 60 + i * 230;
      kutu(c, urunler, x, 310, 190, 64, { renk: GRI, kalin: 2 });
      yazi(c, urunler, x + 95, 352, ad, { size: 28 });
    });
    await belir(c, urunler);
    await c.say('Besinlerden gübreye, deterjandan şampuana pek çok ürün kimyanın konusudur.');
    await belir(c, yazi(c, zincir, 500, 460, 'Tek bir soru yetmez', { size: 30, renk: 'var(--bad)' }), 350);
    await c.say('Bu kadar geniş bir bilim tek bir soruyla ilerleyemez.',
      { speak: '[thoughtful] Bu kadar geniş bir bilim tek bir soruyla ilerleyemez.' });

    await sil(c, zincir, 350);
    const harita = c.S('g', {}, svg);
    const dallar = Object.values(DAL);
    const yer = (i) => ({ x: i < 3 ? 40 : 680, y: 100 + (i % 3) * 149 });
    kutu(c, harita, 410, 240, 180, 82, { renk: 'var(--text)' });
    yazi(c, harita, 500, 293, 'Kimya', { size: 34 });
    const dalKutulari = dallar.map((dal, i) => {
      const g = c.S('g', {}, harita), { x, y } = yer(i), sol = i < 3;
      cizgi(c, g, `M ${sol ? 410 : 590} 281 L ${sol ? 376 : 624} ${y + 32}`, dal.renk, 3);
      kutu(c, g, x, y, 280, 64, { renk: dal.renk });
      yazi(c, g, x + 140, y + 42, dal.ad, { size: 28 });
      g.style.opacity = 0;
      return g;
    });
    for (const g of dalKutulari) await belir(c, g, 180);
    await c.say('Bu yüzden kimya, alt disiplin denen dallara ayrılır.');
    const sorular = c.S('g', {}, harita);
    dallar.forEach((dal, i) => { const { y } = yer(i); yazi(c, sorular, i < 3 ? 350 : 650, y + 44, '?', { size: 36, renk: dal.renk }); });
    await belir(c, sorular, 350);
    await c.say('Her dal maddeye başka bir soru sorar.');

    await sil(c, harita, 350);
    const lab = c.S('g', {}, svg);
    kart(c, lab, 'Gıda analiz laboratuvarı', ['Yemek örneğinde alüminyum'], { y: 120, h: 250, renk: GRI });
    const labSoru = yazi(c, lab, 500, 316, 'Sorduğu soru: ?', { size: 32, renk: RENK.soluk });
    await belir(c, lab, 350);
    await c.choice({ tag: 'Uygula', q: 'Aşçının yemeğindeki alüminyumu ölçen laboratuvar maddeye hangi soruyu sordu?',
      options: ['Bu madde nasıl üretilir?', 'İçinde ne var, ne kadar var?', 'Bu madde canlıda ne yapar?'], answer: 1,
      hints: ['Laboratuvar bir şey üretmedi; yemekteki alüminyumu ölçtü.', '', 'Laboratuvar bir canlıyı değil, yemek örneğini inceledi.'],
      right: 'Laboratuvar yemekte alüminyum olup olmadığını ve miktarını ölçtü.',
      onPick: (i, dogru) => { if (dogru) { labSoru.textContent = 'İçinde ne var, ne kadar var?'; labSoru.style.fill = 'var(--text)'; } } });
    await belir(c, yazi(c, lab, 500, 440, 'Bu soru bir kimya dalının işi', { size: 30, renk: DAL.analitik.renk }), 350);
    await c.say('“İçinde ne var, ne kadar var?” sorusu bir kimya dalının işidir.');
  }

  /* ---- Sahne 2 · Analitik kimya ve biyokimya ---- */
  async function analitikBiyo(c) {
    const svg = c.svg();
    const A = dalKart(c, svg, DAL.analitik, 40), ar = DAL.analitik.renk;
    /* Numune kabı: içinde üç ayrı bileşen. */
    cizgi(c, A.g, 'M 215 160 L 215 230 Q 215 242 227 242 L 283 242 Q 295 242 295 230 L 295 160', ar, 3);
    c.S('rect', { x: 218, y: 190, width: 74, height: 49, rx: 6, fill: ar, opacity: 0.18 }, A.g);
    [[232, 205, 'var(--text)'], [258, 222, GRI], [278, 204, ar], [244, 228, ar], [272, 228, 'var(--text)'], [236, 222, GRI]]
      .forEach(([cx, cy, fill]) => c.S('circle', { cx, cy, r: 6, fill }, A.g));
    await belir(c, A.g);
    await c.say('Analitik kimya, bir maddenin hangi bileşenlerden oluştuğunu inceler.');
    const analiz = (x, ad, soru) => {
      const g = c.S('g', {}, A.g);
      const r = kutu(c, g, x, 270, 190, 92, { renk: GRI, kalin: 2 });
      yazi(c, g, x + 95, 307, ad, { size: 26 });
      yazi(c, g, x + 95, 343, soru, { size: 24, renk: ar });
      return { g, r };
    };
    const nitel = analiz(58, 'Nitel analiz', 'Ne var?');
    await belir(c, nitel.g, 350);
    await c.say('Bileşenlerin ne olduğunu bulmaya nitel analiz denir.');
    const nicel = analiz(262, 'Nicel analiz', 'Ne kadar var?');
    await belir(c, nicel.g, 350);
    await c.say('Her bileşenin miktarını bulmaya nicel analiz denir.');
    const ornekler = c.S('g', {}, A.g);
    await belir(c, yazi(c, ornekler, A.m, 412, 'Pancardaki şeker miktarı', { size: 26 }), 350);
    await c.say('Şeker pancarındaki şeker miktarını belirlemek analitik kimyanın işidir.');
    const ikinci = c.S('g', {}, ornekler);
    yazi(c, ikinci, A.m, 454, 'Suyun sertliği', { size: 26 });
    yazi(c, ikinci, A.m, 496, 'Kandaki maddeler', { size: 26 });
    await belir(c, ikinci, 350);
    await c.say('Suyun sertliğini ve kandaki maddelerin miktarını ölçmek de öyle.');

    ornekler.remove();
    const B = dalKart(c, svg, DAL.biyo, 530), br = DAL.biyo.renk;
    c.S('ellipse', { cx: B.m, cy: 205, rx: 84, ry: 54, fill: KOYU, stroke: br, 'stroke-width': 3 }, B.g);
    c.S('circle', { cx: B.m - 26, cy: 208, r: 19, fill: br, opacity: 0.55 }, B.g);
    const tanim = yazi(c, B.g, B.m, 305, 'Canlıların kimyası', { size: 28 });
    await belir(c, B.g);
    await c.say('Biyokimya, canlıların kimyasıdır.');
    const ic = c.S('g', {}, B.g);
    [[B.m + 18, 185], [B.m + 46, 214], [B.m + 12, 232]].forEach(([cx, cy]) => c.S('circle', { cx, cy, r: 6, fill: 'var(--text)' }, ic));
    ok(c, ic, B.m + 24, 191, B.m + 40, 207, br);
    ok(c, ic, B.m + 38, 220, B.m + 20, 230, br);
    tanim.textContent = 'Bileşikler ve tepkimeler';
    await belir(c, ic, 350);
    await c.say('Canlılardaki bileşikleri ve yaşam boyunca süren tepkimeleri inceler.');
    const molekuller = c.S('g', {}, B.g);
    [['Protein', 640, 362], ['Karbonhidrat', 850, 362], ['Vitamin', 640, 408], ['Hormon', 850, 408]]
      .forEach(([ad, x, y]) => yazi(c, molekuller, x, y, ad, { size: 26, renk: br }));
    await belir(c, molekuller, 350);
    await c.say('Proteinler, karbonhidratlar, vitaminler ve hormonlar biyokimyanın konusudur.');
    await belir(c, yazi(c, B.g, B.m, 480, 'Tıp, gıda, tarım', { size: 28 }), 350);
    await c.say('Biyokimya; tıp, gıda ve tarım alanlarında kullanılır.');

    await c.choice({ tag: 'Uygula', q: 'Bir laboratuvar kandaki şeker miktarını ölçüyor. Bu hangi analizdir?',
      options: ['Nitel analiz', 'Nicel analiz', 'İkisi de değil'], answer: 1,
      hints: ['Nitel analiz bileşenin ne olduğunu bulur; burada miktar ölçülüyor.', '', 'Bir bileşenin miktarını bulmak da bir analiz türüdür.'],
      right: 'Nicel analiz. Laboratuvar şekerin miktarını ölçüyor.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        nicel.r.setAttribute('stroke', ar); nicel.r.setAttribute('stroke-width', 5);
        nitel.g.style.opacity = 0.4; B.g.style.opacity = 0.4;
      } });
    await belir(c, yazi(c, A.g, A.m, 430, 'Kandaki şeker miktarı', { size: 26, renk: ar }), 350);
    await c.say('Miktar soruluyorsa analiz niceldir.', { speak: 'Miktar soruluyorsa [short pause] analiz niceldir.' });
  }

  /* ---- Sahne 3 · Organik ve anorganik kimya ---- */
  async function organikAnorganik(c) {
    const svg = c.svg();
    const O = dalKart(c, svg, DAL.organik, 40), or = DAL.organik.renk;
    const ustSatir = yazi(c, O.g, O.m, 160, 'Yapı, özellik, tepkime', { size: 26, renk: RENK.soluk });
    await belir(c, O.g);
    await c.say('Organik kimya, organik bileşiklerin yapısını, özelliklerini ve tepkimelerini inceler.');
    const karbon = c.S('g', {}, O.g);
    const zincir = c.S('g', {}, karbon);
    c.S('circle', { cx: O.m, cy: 238, r: 32, fill: KOYU, stroke: or, 'stroke-width': 4 }, karbon);
    yazi(c, karbon, O.m, 252, 'C', { size: 38, renk: or });
    const karbonAd = yazi(c, karbon, O.m, 322, 'Karbon kimyası', { size: 28 });
    await belir(c, karbon, 350);
    await c.say('Bu dala karbon kimyası da denir.');
    const BAGLI = [[O.m - 70, 222], [O.m - 140, 252], [O.m + 70, 222], [O.m + 140, 252]];
    cizgi(c, zincir, `M ${O.m - 140} 252 L ${O.m - 70} 222 L ${O.m} 238 L ${O.m + 70} 222 L ${O.m + 140} 252`, or, 3);
    BAGLI.forEach(([cx, cy]) => c.S('circle', { cx, cy, r: 18, fill: KOYU, stroke: or, 'stroke-width': 3 }, zincir));
    ustSatir.textContent = 'Kimyanın en geniş dalı';
    ustSatir.style.fill = 'var(--text)';
    await belir(c, zincir, 500);
    await c.say('Organik bileşikler çok çeşitli olduğu için kimyanın en geniş dalıdır.');
    const urunler = c.S('g', {}, O.g);
    [['Petrol ürünleri', 165, 386], ['İlaçlar', 365, 386], ['Plastikler', 165, 432], ['Boyalar', 365, 432], ['Deterjanlar', O.m, 478]]
      .forEach(([ad, x, y]) => yazi(c, urunler, x, y, ad, { size: 26, renk: or }));
    await belir(c, urunler, 350);
    await c.say('Petrol ürünleri, ilaçlar, plastikler, boyalar ve deterjanlar bu dalın konusudur.');

    ustSatir.remove();
    const N = dalKart(c, svg, DAL.anorganik, 530), nr = DAL.anorganik.renk;
    const altSatir = yazi(c, N.g, N.m, 160, 'Organik olmayan bileşikler', { size: 26, renk: RENK.soluk });
    const orgu = c.S('g', {}, N.g);
    for (let r = 0; r < 3; r++) for (let k = 0; k < 5; k++) {
      c.S('circle', { cx: N.m - 60 + k * 30, cy: 212 + r * 30, r: (r + k) % 2 ? 8 : 11, fill: (r + k) % 2 ? GRI : nr }, orgu);
    }
    await belir(c, N.g);
    await c.say('Anorganik kimya, organik olmayan bileşikleri inceler.');
    const liste = (adlar, x) => {
      const g = c.S('g', {}, N.g);
      adlar.forEach((ad, i) => {
        c.S('circle', { cx: x, cy: 337 + i * 47, r: 6, fill: nr }, g);
        yazi(c, g, x + 20, 346 + i * 47, ad, { size: 26, hiza: 'start' });
      });
      return g;
    };
    const liste1 = liste(['Asitler', 'Bazlar', 'Tuzlar'], 570);
    await belir(c, liste1, 350);
    await c.say('Asitlerin, bazların ve tuzların çoğu bu dalın konusudur.');
    const liste2 = liste(['Metaller', 'Ametaller', 'Mineraller'], 760);
    await belir(c, liste2, 350);
    await c.say('Metaller, ametaller ve mineraller de anorganik kimyada incelenir.');

    await c.choice({ tag: 'Uygula', q: 'Tuzları ve metalleri hangi dal inceler?', options: ['Organik kimya', 'Biyokimya', 'Anorganik kimya'], answer: 2,
      hints: ['Organik kimya karbon bileşiklerini inceler.', 'Biyokimya canlılardaki bileşiklere ve tepkimelere bakar.', ''],
      right: 'Anorganik kimya. Tuzlar da metaller de bu dalda incelenir.',
      onPick: (i, dogru) => { if (dogru) N.cerceve.setAttribute('stroke-width', 6); } });
    N.cerceve.setAttribute('stroke-width', 3);
    await Promise.all([sil(c, urunler), sil(c, liste1), sil(c, liste2), sil(c, zincir)]);
    karbonAd.remove(); altSatir.remove();
    const ozet = c.S('g', {}, svg);
    yazi(c, ozet, O.m, 400, 'Karbon bileşikleri', { size: 32, renk: or });
    yazi(c, ozet, N.m, 400, 'Geri kalan bileşikler', { size: 32, renk: nr });
    await belir(c, ozet, 350);
    await c.say('Organik kimya karbon bileşiklerine, anorganik kimya geri kalanına bakar.',
      { speak: 'Organik kimya karbon bileşiklerine, [short pause] anorganik kimya geri kalanına bakar.' });
  }

  /* ---- Sahne 4 · Fizikokimya ve polimer kimyası ---- */
  async function fizikoPolimer(c) {
    const svg = c.svg();
    const F = dalKart(c, svg, DAL.fiziko, 40), fr = DAL.fiziko.renk;
    const satir = (kartG, m, i, metin, renk) => yazi(c, kartG, m, 356 + i * 46, metin, { size: 26, renk: renk || 'var(--text)' });
    /* Tepkime ve enerji: iki tanecik çifti, aralarında ok, üstte enerji işareti. */
    const tepkime = c.S('g', {}, F.g);
    c.S('circle', { cx: 130, cy: 232, r: 17, fill: fr }, tepkime);
    c.S('circle', { cx: 166, cy: 232, r: 17, fill: GRI }, tepkime);
    ok(c, tepkime, 205, 232, 305, 232);
    c.S('circle', { cx: 345, cy: 216, r: 17, fill: GRI }, tepkime);
    c.S('circle', { cx: 372, cy: 244, r: 17, fill: fr }, tepkime);
    c.S('path', { d: 'M 262 150 L 240 192 L 258 192 L 246 222 L 276 180 L 258 180 Z', fill: 'var(--warn)' }, tepkime);
    const ilkSatir = satir(F.g, F.m, 0, 'Tepkime ve enerji');
    await belir(c, F.g);
    await c.say('Fizikokimya, tepkimelerin nasıl gerçekleştiğini ve enerji dönüşümlerini inceler.');

    await sil(c, tepkime, 250);
    const termo = c.S('g', {}, F.g);
    c.S('rect', { x: 121, y: 150, width: 18, height: 112, rx: 9, fill: KOYU, stroke: fr, 'stroke-width': 3 }, termo);
    const civa = c.S('rect', { x: 126, y: 250, width: 8, height: 12, fill: fr }, termo);
    c.S('circle', { cx: 130, cy: 272, r: 17, fill: fr }, termo);
    const kosullar = satir(F.g, F.m, 1, 'Sıcaklık, basınç, derişim');
    await Promise.all([belir(c, termo, 300), belir(c, kosullar, 300)]);
    await c.tween(600, (e) => { civa.setAttribute('y', 250 - 80 * e); civa.setAttribute('height', 12 + 80 * e); });
    await c.say('Sıcaklık, basınç ve derişimin tepkimelere etkisi bu dalın sorusudur.');
    const buz = c.S('g', {}, F.g);
    const kup = c.S('rect', { x: 225, y: 212, width: 60, height: 60, rx: 8, fill: '#c9d1e6', stroke: GRI, 'stroke-width': 3 }, buz);
    const su = c.S('ellipse', { cx: 255, cy: 276, rx: 4, ry: 3, fill: 'var(--c1)' }, buz);
    const erime = satir(F.g, F.m, 2, 'Erime ve çözünme');
    await Promise.all([belir(c, buz, 300), belir(c, erime, 300)]);
    await c.tween(800, (e) => {
      const kenar = 60 - 26 * e;
      kup.setAttribute('x', 255 - kenar / 2); kup.setAttribute('y', 272 - kenar);
      kup.setAttribute('width', kenar); kup.setAttribute('height', kenar);
      su.setAttribute('rx', 4 + 48 * e); su.setAttribute('ry', 3 + 6 * e);
    });
    await c.say('Buzun erimesi ve tuzun suda çözünmesi fizikokimyayla açıklanır.');
    const alev = c.S('g', {}, F.g);
    c.S('path', { d: 'M 380 282 C 340 270 348 226 366 204 C 368 222 380 224 380 206 C 380 186 372 170 388 152 C 392 186 424 208 418 246 C 414 270 398 282 380 282 Z',
      fill: 'var(--warn)' }, alev);
    const yanma = satir(F.g, F.m, 3, 'Yakıtın yanması');
    await Promise.all([belir(c, alev, 300), belir(c, yanma, 300)]);
    await c.say('Araç motorunda yakıtın yanması da bu dalın konusudur.');

    ilkSatir.remove();
    const P = dalKart(c, svg, DAL.polimer, 530), pr = DAL.polimer.renk;
    const boncukYeri = (i) => ({ x: 581 + i * 41, y: 215 + (i % 2 ? -14 : 14) });
    const baglar = c.S('g', {}, P.g);
    const boncuk = (i) => {
      const { x, y } = boncukYeri(i);
      if (i) { const o = boncukYeri(i - 1); cizgi(c, baglar, `M ${o.x} ${o.y} L ${x} ${y}`, pr, 4); }
      return c.S('circle', { cx: x, cy: y, r: 15, fill: KOYU, stroke: pr, 'stroke-width': 4 }, P.g);
    };
    const tanim = satir(P.g, P.m, 0, 'Çok büyük moleküller');
    await belir(c, P.g, 300);
    for (let i = 0; i < 6; i++) await belir(c, boncuk(i), 110);
    await c.say('Polimer kimyası çok büyük molekülleri, yani polimerleri inceler.');
    /* Üç küçük birim zincirin ucuna eklenir. */
    const birimler = [6, 7, 8].map((i) => {
      const hedef = boncukYeri(i), bas = { x: 650 + (i - 6) * 70, y: 300 };
      const el = c.S('circle', { cx: bas.x, cy: bas.y, r: 15, fill: KOYU, stroke: pr, 'stroke-width': 4 }, P.g);
      return { i, el, bas, hedef };
    });
    const uretim = satir(P.g, P.m, 1, 'Üretim, yapı, özellik');
    await Promise.all([belir(c, uretim, 300), ...birimler.map((b) => belir(c, b.el, 300))]);
    for (const b of birimler) {
      await c.tween(380, (e) => { b.el.setAttribute('cx', Ders.lerp(b.bas.x, b.hedef.x, e)); b.el.setAttribute('cy', Ders.lerp(b.bas.y, b.hedef.y, e)); });
      const o = boncukYeri(b.i - 1);
      cizgi(c, baglar, `M ${o.x} ${o.y} L ${b.hedef.x} ${b.hedef.y}`, pr, 4);
    }
    await c.say('Polimerlerin nasıl üretildiği, yapısı ve özellikleri bu dalın konusudur.');
    await belir(c, satir(P.g, P.m, 2, 'Plastik, kauçuk, yapıştırıcı', pr), 350);
    await c.say('Plastikler, kauçuklar ve yapıştırıcılar polimerdir.');

    await c.choice({ tag: 'Uygula', q: 'Sıcaklığın bir tepkimeye etkisini araştıran kimyager hangi dalda çalışır?',
      options: ['Fizikokimya', 'Polimer kimyası', 'Analitik kimya'], answer: 0,
      hints: ['', 'Polimer kimyası çok büyük moleküllerin üretimini ve yapısını inceler.', 'Analitik kimya maddede ne olduğunu ve miktarını bulur.'],
      right: 'Fizikokimya. Sıcaklık, tepkimeye etki eden bir koşuldur.',
      onPick: (i, dogru) => { if (dogru) { F.cerceve.setAttribute('stroke-width', 6); P.g.style.opacity = 0.4; } } });
    erime.remove(); yanma.remove(); tanim.remove();
    kosullar.textContent = 'Koşul ve enerji';
    kosullar.style.fill = fr;
    kosullar.setAttribute('font-size', 32);
    await c.say('Etki eden koşul ve enerji soruluyorsa dal fizikokimyadır.');
    c.note('<b>Kimyanın altı dalı var; her biri maddeye başka soru sorar.</b><br>Analitik, biyokimya, organik, anorganik, fizikokimya, polimer', 'Altı dal');
  }

  /* ---- Sahne 5 · Altı dalı eşleştir ---- */
  const IZGARA = ['analitik', 'biyo', 'fiziko', 'organik', 'polimer', 'anorganik'];
  const ORNEKLER = [
    { ad: 'Kan tahlili', dal: 'analitik', siklar: ['biyo', 'analitik', 'organik'], neden: 'Tahlilde kandaki maddelerin miktarı ölçülür; bu analitik kimyanın işidir.',
      ipucu: { biyo: 'Tahlilde kandaki maddelerin miktarı ölçülür. Miktarı hangi dal bulur?', organik: 'Organik kimya karbon bileşiklerinin yapısına bakar; burada ölçüm yapılıyor.' } },
    { ad: 'Hormonlar', dal: 'biyo', siklar: ['biyo', 'polimer', 'anorganik'], neden: 'Hormonlar canlılarda bulunur; biyokimyanın konusudur.',
      ipucu: { polimer: 'Polimer kimyası plastik ve kauçuk gibi malzemeleri inceler.', anorganik: 'Anorganik kimya asitlere, bazlara, tuzlara ve metallere bakar.' } },
    { ad: 'Petrol ürünleri', dal: 'organik', siklar: ['fiziko', 'anorganik', 'organik'], neden: 'Petrol ürünleri organik kimyanın konusudur.',
      ipucu: { fiziko: 'Fizikokimya enerjiye ve koşulların etkisine bakar.', anorganik: 'Anorganik kimya organik olmayan bileşikleri inceler.' } },
    { ad: 'Tuzlar ve metaller', dal: 'anorganik', siklar: ['organik', 'anorganik', 'analitik'], neden: 'Tuzlar ve metaller anorganik kimyada incelenir.',
      ipucu: { organik: 'Organik kimya karbon bileşiklerini inceler.', analitik: 'Analitik kimya bir maddenin bileşenlerini ve miktarını bulur.' } },
    { ad: 'Buzun erimesi', dal: 'fiziko', siklar: ['analitik', 'polimer', 'fiziko'], neden: 'Buzun erimesi fizikokimyayla açıklanır.',
      ipucu: { analitik: 'Burada bir miktar ölçülmüyor; erime açıklanıyor.', polimer: 'Buz çok büyük moleküllerden oluşan bir malzeme değildir.' } },
    { ad: 'Kauçuk', dal: 'polimer', siklar: ['anorganik', 'polimer', 'fiziko'], neden: 'Kauçuk bir polimerdir.',
      ipucu: { anorganik: 'Anorganik kimya tuzlara, metallere ve minerallere bakar.', fiziko: 'Fizikokimya enerjiye ve koşulların etkisine bakar.' } },
  ];
  async function eslestir(c) {
    const svg = c.svg();
    const kutuYeri = (ad) => { const i = IZGARA.indexOf(ad); return { x: 40 + (i % 3) * 315, y: 50 + Math.floor(i / 3) * 145 }; };
    const kutular = {};
    IZGARA.forEach((ad) => {
      const g = c.S('g', {}, svg), { x, y } = kutuYeri(ad);
      kutu(c, g, x, y, 290, 130, { renk: DAL[ad].renk });
      yazi(c, g, x + 145, y + 46, DAL[ad].ad, { size: 28, renk: DAL[ad].renk });
      g.style.opacity = 0;
      kutular[ad] = g;
    });
    for (const ad of IZGARA) await belir(c, kutular[ad], 160);
    await c.say('Altı dalın her biri maddeye farklı bir soru soruyor.');
    const kartlar = c.S('g', {}, svg);
    ORNEKLER.forEach((o, i) => {
      const g = c.S('g', {}, kartlar), x = 40 + (i % 3) * 315, y = 372 + Math.floor(i / 3) * 74;
      const r = kutu(c, g, x, y, 290, 58, { renk: GRI, kalin: 2 });
      yazi(c, g, x + 145, y + 38, o.ad, { size: 24 });
      o.kart = { g, r };
    });
    await belir(c, kartlar);
    await c.say('Şimdi her örneği kendi dalıyla eşleştir.');
    for (const o of ORNEKLER) {
      o.kart.r.setAttribute('stroke', 'var(--text)');
      o.kart.r.setAttribute('stroke-width', 4);
      await c.choice({ tag: 'Sıra sende', q: `<b>${o.ad}</b> hangi dalın konusudur?`, options: o.siklar.map((k) => DAL[k].ad), answer: o.siklar.indexOf(o.dal),
        hints: o.siklar.map((k) => (k === o.dal ? '' : o.ipucu[k])), right: o.neden,
        onPick: (i, dogru) => {
          if (!dogru) return;
          o.kart.g.remove();
          const { x, y } = kutuYeri(o.dal);
          belir(c, yazi(c, kutular[o.dal], x + 145, y + 96, o.ad, { size: 24 }), 350);
        } });
    }
    kartlar.remove();
    const plastik = c.S('g', {}, svg);
    kutu(c, plastik, 242, 430, 200, 64, { renk: 'var(--text)' });
    yazi(c, plastik, 342, 472, 'Plastik', { size: 30 });
    await belir(c, plastik, 350);
    await c.say('Bir ürün birden çok dalın konusu olabilir.', { speak: '[thoughtful] Bir ürün birden çok dalın konusu olabilir.' });
    const baglar = c.S('g', {}, svg);
    ok(c, baglar, 300, 428, 200, 332, DAL.organik.renk);
    ok(c, baglar, 384, 428, 484, 332, DAL.polimer.renk);
    await Promise.all([belir(c, baglar, 400), c.tween(400, (e) => {
      ['analitik', 'biyo', 'fiziko', 'anorganik'].forEach((ad) => { kutular[ad].style.opacity = 1 - 0.6 * e; });
    })]);
    await c.say('Plastik hem organik kimyada hem polimer kimyasında incelenir.');
  }

  /* ---- Sahne 6 · Kimyadan mesleğe ---- */
  async function meslek(c) {
    const svg = c.svg();
    const basamak = c.S('g', {}, svg);
    const ust = yazi(c, basamak, 500, 62, 'Kimya okuyan nerede çalışır?', { size: 32, renk: RENK.soluk });
    const b1 = kutu(c, basamak, 50, 250, 420, 270, { renk: GRI });
    const b2 = kutu(c, basamak, 530, 110, 420, 410, { renk: GRI });
    await belir(c, basamak);
    await c.say('Kimya okuyan biri pek çok alanda çalışabilir.');
    ust.remove();
    b1.setAttribute('stroke', 'var(--c1)');
    const onLisans = c.S('g', {}, basamak);
    yazi(c, onLisans, 260, 298, 'Ön lisans', { size: 30, renk: 'var(--c1)' });
    yazi(c, onLisans, 260, 340, 'Kimya teknolojisi', { size: 26, renk: RENK.soluk });
    ok(c, onLisans, 260, 358, 260, 384, 'var(--c1)');
    yazi(c, onLisans, 260, 426, 'Kimya teknikeri', { size: 30 });
    await belir(c, onLisans, 350);
    await c.say('Kimya teknolojisi ön lisans programını bitiren, kimya teknikeri olur.');
    await belir(c, yazi(c, basamak, 260, 486, 'Laboratuvar, kalite kontrol', { size: 26, renk: 'var(--c1)' }), 350);
    await c.say('Teknikerler laboratuvarda ve kalite kontrolde çalışır.');
    b2.setAttribute('stroke', 'var(--c3)');
    const lisans = c.S('g', {}, basamak);
    yazi(c, lisans, 740, 156, 'Lisans', { size: 30, renk: 'var(--c3)' });
    const yuvalar = [0, 1, 2, 3].map((i) => kutu(c, lisans, 555, 184 + i * 80, 370, 62, { renk: GRI, kalin: 2 }));
    await belir(c, lisans, 350);
    await c.say('Lisans programlarını bitirenler dört unvandan birini alır.');
    const UNVAN = ['Kimyager', 'Kimya mühendisi', 'Polimer malzeme mühendisi', 'Kimya öğretmeni'];
    for (let i = 0; i < 4; i++) {
      yuvalar[i].setAttribute('stroke', 'var(--c3)');
      await belir(c, yazi(c, lisans, 740, 224 + i * 80, UNVAN[i], { size: 26 }), 200);
    }
    await c.say('Kimyager, kimya mühendisi, polimer malzeme mühendisi ve kimya öğretmeni.');

    await sil(c, basamak, 350);
    const alanlar = c.S('g', {}, svg);
    const ALAN = ['İlaç', 'Gıda', 'Enerji', 'Tarım', 'Çevre'];
    const alanX = (i) => 132 + i * 184;
    const alanKutu = ALAN.map((ad, i) => {
      const r = kutu(c, alanlar, alanX(i) - 82, 230, 164, 80, { renk: GRI });
      yazi(c, alanlar, alanX(i), 281, ad, { size: 30 });
      return r;
    });
    await belir(c, alanlar);
    await c.say('Bu kişiler ilaç, gıda, enerji, tarım ve çevre alanlarında çalışır.');
    const isler = (i, satirlar, renk) => {
      alanKutu[i].setAttribute('stroke', renk);
      alanKutu[i].setAttribute('stroke-width', 5);
      const g = c.S('g', {}, alanlar);
      satirlar.forEach((s, k) => yazi(c, g, alanX(i), 356 + k * 40, s, { size: 26, renk }));
      return belir(c, g, 350);
    };
    await isler(4, ['Su arıtma', 'Atık yönetimi'], 'var(--c3)');
    await c.say('Su arıtma ve atık yönetimi çevre alanının işleridir.');
    await isler(2, ['Pil', 'Yenilenebilir enerji'], 'var(--c5)');
    await c.say('Pil ve yenilenebilir enerji teknolojileri enerji alanının işleridir.');
    await c.choice({ tag: 'Uygula', q: 'Bir şehrin içme suyunu arıtan ekipteki kimyager hangi alanda çalışıyor?',
      options: ['Enerji sektörü', 'Gıda ve içecek endüstrisi', 'Çevre ve sürdürülebilirlik'], answer: 2,
      hints: ['Enerji alanının işleri pil ve yenilenebilir enerji teknolojileridir.', 'Suyu arıtmak, bir gıda ürünü üretmek değildir.', ''],
      right: 'Su arıtma, çevre alanının işidir.' });
    const egitim = c.S('g', {}, alanlar);
    kutu(c, egitim, 360, 70, 280, 70, { renk: 'var(--text)' });
    yazi(c, egitim, 500, 116, 'Kimya eğitimi', { size: 30 });
    ALAN.forEach((ad, i) => ok(c, egitim, 500 + (i - 2) * 50, 142, alanX(i), 224));
    await belir(c, egitim, 450);
    await c.say('Aynı kimya eğitimi, birbirinden çok farklı işlere açılır.',
      { speak: '[thoughtful] Aynı kimya eğitimi, birbirinden çok farklı işlere açılır.' });
  }

  /* ---- Sahne 7 · İki bilim insanı ve bir merkez ---- */
  async function bilimInsanlari(c) {
    const svg = c.svg();
    const kisiler = c.S('g', {}, svg);
    const kisi = (x, ad, renk) => {
      const g = c.S('g', {}, kisiler);
      kutu(c, g, x, 60, 430, 460, { renk });
      yazi(c, g, x + 215, 112, ad, { size: 34, renk });
      return g;
    };
    const sr = 'var(--c3)', nr = 'var(--c1)';
    const sancar = kisi(40, 'Aziz Sancar', sr), sinan = kisi(530, 'Oktay Sinanoğlu', nr);
    await belir(c, kisiler);
    await c.say('Kimya alanında dünyaca tanınan iki Türk bilim insanı var.');
    /* DNA şeridi: basamaklardan biri kopuk; onarılınca tamamlanır. */
    const dna = c.S('g', {}, sancar);
    cizgi(c, dna, 'M 105 190 Q 155 170 205 190 T 305 190 T 405 190', sr, 4);
    cizgi(c, dna, 'M 105 262 Q 155 282 205 262 T 305 262 T 405 262', sr, 4);
    [130, 180, 230, 330, 380].forEach((x) => cizgi(c, dna, `M ${x} 190 L ${x} 262`, GRI, 4));
    const kopukUst = cizgi(c, dna, 'M 280 190 L 280 208', 'var(--bad)', 5);
    const kopukAlt = cizgi(c, dna, 'M 280 262 L 280 244', 'var(--bad)', 5);
    const dnaAd = yazi(c, sancar, 255, 340, 'DNA onarımı', { size: 30 });
    await Promise.all([belir(c, dna, 350), belir(c, dnaAd, 350)]);
    await c.tween(900, (e) => {
      kopukUst.setAttribute('d', `M 280 190 L 280 ${208 + 18 * e}`);
      kopukAlt.setAttribute('d', `M 280 262 L 280 ${244 - 18 * e}`);
    });
    kopukUst.setAttribute('stroke', 'var(--good)'); kopukAlt.setAttribute('stroke', 'var(--good)');
    await c.say('Aziz Sancar, hasar gören DNA’nın hücrede nasıl onarıldığını araştırdı.',
      { speak: 'Aziz Sancar, hasar gören de ne a’nın hücrede nasıl onarıldığını araştırdı.' });
    const odul = c.S('g', {}, sancar);
    c.S('circle', { cx: 255, cy: 408, r: 26, fill: 'none', stroke: 'var(--c5)', 'stroke-width': 4 }, odul);
    c.S('circle', { cx: 255, cy: 408, r: 14, fill: 'var(--c5)' }, odul);
    yazi(c, odul, 255, 478, '2015 Nobel Kimya Ödülü', { size: 28, renk: 'var(--c5)' });
    await belir(c, odul, 350);
    await c.say('Bu çalışmayla 2015 Nobel Kimya Ödülü’nü kazandı.', { speak: 'Bu çalışmayla iki bin on beş Nobel Kimya Ödülü’nü kazandı.' });
    /* Çok elektronlu atom: çekirdek, iki yörünge çizgisi, beş elektron. */
    const atom = c.S('g', {}, sinan);
    c.S('ellipse', { cx: 745, cy: 226, rx: 110, ry: 44, fill: 'none', stroke: GRI, 'stroke-width': 3 }, atom);
    c.S('ellipse', { cx: 745, cy: 226, rx: 44, ry: 76, fill: 'none', stroke: GRI, 'stroke-width': 3 }, atom);
    c.S('circle', { cx: 745, cy: 226, r: 16, fill: nr }, atom);
    [[635, 226], [855, 226], [745, 150], [745, 302], [823, 195]].forEach(([cx, cy]) => c.S('circle', { cx, cy, r: 8, fill: 'var(--text)' }, atom));
    const kuram = c.S('g', {}, sinan);
    yazi(c, kuram, 745, 362, 'Atom ve Moleküllerde', { size: 28 });
    yazi(c, kuram, 745, 400, 'Çoklu Elektron Kuramı', { size: 28 });
    await Promise.all([belir(c, atom, 350), belir(c, kuram, 350)]);
    await c.say('Oktay Sinanoğlu, Atom ve Moleküllerde Çoklu Elektron Kuramı’nı geliştirdi.');
    await belir(c, yazi(c, sinan, 745, 478, '25 yaşında profesör', { size: 28, renk: nr }), 350);
    await c.say('Yirmi beş yaşında profesör oldu.');

    await sil(c, kisiler, 350);
    const merkez = c.S('g', {}, svg);
    kutu(c, merkez, 330, 70, 340, 150, { renk: 'var(--c5)' });
    yazi(c, merkez, 500, 124, 'Kimya Teknoloji', { size: 32, renk: 'var(--c5)' });
    yazi(c, merkez, 500, 164, 'Merkezi', { size: 32, renk: 'var(--c5)' });
    yazi(c, merkez, 500, 202, 'İstanbul', { size: 26, renk: RENK.soluk });
    kutu(c, merkez, 60, 105, 190, 80, { renk: GRI });
    yazi(c, merkez, 155, 156, 'Kamu', { size: 30 });
    ok(c, merkez, 258, 145, 322, 145);
    kutu(c, merkez, 750, 105, 190, 80, { renk: GRI });
    yazi(c, merkez, 845, 156, 'Sanayi', { size: 30 });
    ok(c, merkez, 742, 145, 678, 145);
    await belir(c, merkez);
    await c.say('İstanbul’daki Kimya Teknoloji Merkezi, kamu ve sanayi iş birliğiyle kuruldu.');
    const amac = c.S('g', {}, merkez);
    ok(c, amac, 500, 228, 500, 276, 'var(--c5)');
    yazi(c, amac, 500, 322, 'Yerli kimya ürünleri', { size: 32 });
    yazi(c, amac, 500, 362, 'Yüksek katma değerli', { size: 26, renk: RENK.soluk });
    await belir(c, amac, 350);
    await c.say('Amacı, yüksek katma değerli yerli kimya ürünleri geliştirmektir.');
    await belir(c, yazi(c, merkez, 500, 462, 'Genç bilim insanları: araştırma ve geliştirme', { size: 28, renk: 'var(--c5)' }), 350);
    await c.say('Merkez, genç bilim insanlarına araştırma ve geliştirme fırsatı sunar.');

    await sil(c, merkez, 350);
    const soruKarti = c.S('g', {}, svg);
    kart(c, soruKarti, 'Aziz Sancar', ['DNA onarımı', 'Canlıdaki bir süreç'], { y: 110, h: 250, renk: sr });
    const dalAdi = yazi(c, soruKarti, 500, 440, 'Hangi dal?', { size: 32, renk: RENK.soluk });
    await belir(c, soruKarti, 350);
    await c.choice({ tag: 'Uygula', q: 'DNA onarımı canlıdaki bir süreçtir. Aziz Sancar’ın çalışması en çok hangi dalla ilişkilidir?',
      options: ['Polimer kimyası', 'Biyokimya', 'Fizikokimya'], answer: 1,
      hints: ['Polimer kimyası plastik ve kauçuk gibi malzemeleri inceler.', '', 'Fizikokimya enerjiye ve koşulların etkisine bakar.'],
      right: 'Biyokimya, canlılardaki bileşikleri ve tepkimeleri inceler.',
      onPick: (i, dogru) => { if (dogru) { dalAdi.textContent = 'Biyokimya'; dalAdi.style.fill = DAL.biyo.renk; } } });
    await sil(c, soruKarti, 300);
    const katki = c.S('g', {}, svg);
    kutu(c, katki, 350, 110, 300, 84, { renk: 'var(--text)' });
    yazi(c, katki, 500, 164, 'Kimya bilgisi', { size: 32 });
    ok(c, katki, 440, 200, 300, 300);
    ok(c, katki, 560, 200, 700, 300);
    kutu(c, katki, 130, 310, 300, 84, { renk: 'var(--c1)' });
    yazi(c, katki, 280, 364, 'Bilim', { size: 32, renk: 'var(--c1)' });
    kutu(c, katki, 570, 310, 300, 84, { renk: 'var(--c5)' });
    yazi(c, katki, 720, 364, 'Ülke ekonomisi', { size: 32, renk: 'var(--c5)' });
    await belir(c, katki);
    await c.say('Kimya bilgisi hem bilime hem ülke ekonomisine katkı sağlar.');
  }

  Ders.start({
    id: 'etkilesim-a2', kicker: 'Konu A · Günlük hayatta kimya', title: 'Bir bilim, farklı sorular', accent: '#f5b04c', back: 'index.html',
    intro: { title: 'Bir bilim, farklı sorular', hook: 'Bir ilacı tasarlayan ile sudaki maddeyi ölçen aynı işi mi yapar?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Kimya neyi inceler?', goal: 'Kimyanın neden dallara ayrıldığını gör.', run: neyi },
      { title: 'Analitik kimya ve biyokimya', goal: 'Nitel ve nicel analizi ayır.', run: analitikBiyo },
      { title: 'Organik ve anorganik kimya', goal: 'İki dalın konularını karşılaştır.', run: organikAnorganik },
      { title: 'Fizikokimya ve polimer kimyası', goal: 'Dalı, sorduğu soruyla tanı.', run: fizikoPolimer },
      { title: 'Altı dalı eşleştir', goal: 'Her örneği kendi dalına yerleştir.', run: eslestir },
      { title: 'Kimyadan mesleğe', goal: 'Unvanları ve çalışma alanlarını tanı.', run: meslek },
      { title: 'İki bilim insanı ve bir merkez', goal: 'Çalışmaları kimyanın dallarına bağla.', run: bilimInsanlari },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir içme suyunun sertlik derecesini belirlemek hangi dalın işidir?',
        options: ['Polimer kimyası', 'Analitik kimya', 'Biyokimya'], answer: 1,
        why: ['Polimer kimyası çok büyük molekülleri inceler.', 'Suyun sertliğini ölçmek, bir bileşenin miktarını bulmaktır.', 'Biyokimya canlılardaki bileşiklere ve tepkimelere bakar.'], scene: 1 },
      { q: 'Hangisi polimer kimyasının inceleyeceği bir malzemedir?',
        options: ['Sofra tuzu', 'Hormon', 'Kauçuk'], answer: 2,
        why: ['Tuzlar anorganik kimyanın konusudur.', 'Hormonlar biyokimyanın konusudur.', 'Kauçuk bir polimerdir.'], scene: 3 },
      { q: 'Bir laboratuvar bir maden suyunda önce hangi minerallerin bulunduğunu, sonra her birinin miktarını buluyor. Sırasıyla hangi analizleri yapıyor?',
        options: ['Önce nitel, sonra nicel analiz', 'Önce nicel, sonra nitel analiz', 'İki adımda da nicel analiz'], answer: 0,
        why: ['Evet. “Ne var?” sorusu nitel, “ne kadar var?” sorusu nicel analizdir.', 'Sıra ters: bileşenin ne olduğunu bulmak nitel analizdir.', 'İlk adımda miktar ölçülmüyor; bileşenlerin ne olduğu bulunuyor.'], scene: 1 },
      { q: 'Mert: “Plastiği organik kimya inceliyorsa polimer kimyası inceleyemez; bir ürün tek dalın konusudur.” Hangi karşılık doğrudur?',
        options: ['Haklı; her ürünü yalnızca bir dal inceler.', 'Haksız; plastiği yalnızca polimer kimyası inceler.', 'Haksız; bir ürün birden çok dalın konusu olabilir.'], answer: 2,
        why: ['Plastik iki dalda da incelenir; dallar aynı ürüne başka sorular sorar.', 'Plastik organik kimyanın da konusudur; tek dala bağlamak aynı yanılgıdır.', 'Evet. Plastik hem organik kimyada hem polimer kimyasında incelenir.'], scene: 4 },
    ], summary: ['<b>Kimya tek bilim, çok daldır; her dal maddeye başka bir soru sorar.</b>', 'Aynı kimya eğitimi, ilaçtan çevreye pek çok mesleğe açılır.'],
    nextLesson: { href: 'a3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
