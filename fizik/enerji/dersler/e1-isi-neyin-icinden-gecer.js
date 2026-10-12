/* E1 — Isı neyin içinden geçer?
   Isının yolunu, geçtiği ortam belirler: katı (akışkan olmayan maddesel ortam), sıvı ve gaz (akışkan maddesel ortam), boşluk (maddesel olmayan ortam).
   Senaryo: plan/fizik/enerji/senaryolar/E-isi-aktarim-yollari.md (E1). Yol adları (iletim, konveksiyon, ışıma) E2'de gelir; burada verilmez.
   Sahne 3'te izometrik kesit oda (ODA, Ş4) büyük kurulur; sağ sütun x 620–985. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, parcaKoy, sinifla } = window.KIT;
  const { motor, pencere, termometre, kap } = window.KIT_A;
  const { yolOku, yaylar, serit, tanecikKutusu, gunes, dunya, tencere, alev, alevYatay, kasik, elKutusu, ucKutu } = window.KIT_E;
  const { lerp, ease } = Ders;
  const KAT = RENK.kutle, AKI = RENK.soguk, BOS = RENK.gri;
  const METAL = '#b9c2da', METAL_KENAR = '#6f7898';

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg);
    kap(c, g1, { x: 190, y: 90, w: 200, h: 240, su: 170 }); kap(c, g1, { x: 610, y: 90, w: 200, h: 240, su: 170 });
    const tS = termometre(c, g1, { x: 320, y: 318, h: 200, T: 80 }), tR = termometre(c, g1, { x: 740, y: 318, h: 200, T: 30 });
    yazi(c, g1, 290, 394, 'sıcak su', { size: 32, kalin: 700 }); yazi(c, g1, 710, 394, 'soğuk su', { size: 32, kalin: 700 });
    gizle(g1);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Sıcak su ile soğuk su birbirine ısı veriyor. İki suyun sıcaklıkları eşitlenince ne olur?',
      options: ['Isı soğuktan sıcağa akmaya başlar', 'Isı alışverişi biter', 'Isı alışverişi hızlanır'], answer: 1,
      hints: ['Sıcaklıklar eşitlenince ısı alışverişi biter.', '', 'Sıcaklıklar eşitlenince ısı alışverişi biter.'],
      right: 'Evet. Sıcaklıklar eşitlenince ısı alışverişi biter.',
    });
    await par(c.say('İki termometre aynı sıcaklığı gösteriyor: ısı alışverişi bitti.'), tS.git(c, 55, 1200), tR.git(c, 55, 1200));

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const pn = pencere(c, g2, mot, { cx: 500, cy: 255, r: 150, n: 6, T: 20, tohum: 5 });
    yazi(c, g2, 500, 455, 'katı', { size: 32, kalin: 700 });
    gizle(g2);
    await belir(c, g2, 400);
    await pn.isin(c, 60, 700);
    await c.choice({
      tag: 'Hatırla', q: 'Bir katının tanecikleri eskisinden daha hızlı titreşiyor. Bu katı için ne söylenir?',
      options: ['Tanecik sayısı artmıştır', 'Isısı artmıştır', 'Sıcaklığı artmıştır'], answer: 2,
      hints: ['Daha hızlı hareket eden tanecik, daha yüksek sıcaklığı gösterir.', 'Daha hızlı hareket eden tanecik, daha yüksek sıcaklığı gösterir.', ''],
      right: 'Evet. Daha hızlı hareket eden tanecik, daha yüksek sıcaklığı gösterir.',
    });
    await c.say('Katının sıcaklığı arttı: tanecikleri artık daha hızlı titreşiyor.');
    await c.say('Bugün ısının hangi ortamın içinden geçtiğine bakacağız.');
  }

  /* ---- 2. Kaşığın içinden ---- */
  async function kasikSahnesi(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g = c.S('g', {}, svg);
    // Tencere ve kaşık: sap tencerenin kenarından aşıp yatay uzanır.
    const grup = c.S('g', {}, g);
    const t = tencere(c, grup, { x: 50, y: 215, w: 170, h: 85, sap: 0 });
    alev(c, grup, 100, 306, { w: 28, h: 46 }); alev(c, grup, 170, 306, { w: 28, h: 46 });
    kasik(c, grup, { kx: 122, ky: 268, rx: 34, ry: 18, yol: [[150, 258], [215, 196], [800, 196]], kalin: 20 });
    const el = elKutusu(c, g, { x: 800, y: 156, w: 100, h: 80 });
    const isi = yolOku(c, g, [[270, 196], [780, 196]], RENK.isi, { kalin: 7, oran: 0 });
    const isiYazi = yazi(c, g, 525, 158, 'ısı', { size: 28, kalin: 700, renk: RENK.isi });
    const bag1 = cizgi(c, g, [300, 207], [240, 365], RENK.ince, 2), bag2 = cizgi(c, g, [780, 207], [960, 365], RENK.ince, 2);
    const sr = serit(c, g, mot, { x: 240, y: 365, w: 720, h: 120, n: 11, aralik: 64, x0: 280, cy: 425 });
    const alt = yazi(c, g, 600, 525, 'kaşığın sapı, yakından', { size: 26, kalin: 600, renk: RENK.soluk });
    const etiket = yazi(c, g, 525, 150, 'maddesel ortam', { size: 30, kalin: 700, renk: KAT });
    gizle(grup, el.g, isiYazi, bag1, bag2, sr.g, alt, etiket);

    await par(c.say('Ela çorbayı metal kaşıkla karıştırıyor.'), belir(c, grup, 400));
    await par(c.say('Bir süre sonra kaşığın sapı da ısınıyor.'), belir(c, el.g, 300));
    await par(c.say('Isı, kaşığın içinden geçerek sapa ulaştı.'), belir(c, isiYazi, 250), isi.git(c, 1200));
    await par(c.say('Katıda tanecikler, sıvı ve gazdakilerden birbirine daha yakındır.'),
      belir(c, [isi.g, isiYazi], 400, 0), belir(c, [sr.g, bag1, bag2, alt], 500));
    await par(c.say('Isı alan uçtaki tanecikler daha hızlı titreşmeye başlar.'), sr.dalga(c, { bas: 0, son: 0 }));
    await par(c.say('Hızlanan tanecik komşularını etkiler; onlar da hızlanır.'), sr.dalga(c, { bas: 1, son: 10 }));
    await c.say('Böylece titreşim, tanecikten taneciğe sapa kadar ilerler.');
    await par(c.say('Tanecikler yerinde titreşir; yolculuk eden şey titreşimdir.', { speak: '[thoughtful] Tanecikler yerinde titreşir; yolculuk eden şey titreşimdir.' }), sr.izGoster(c, 300));
    await par(c.say('Isının içinden geçtiği madde, maddesel bir ortamdır.'), belir(c, etiket, 300));

    // Sor: yeni durum, metal şiş.
    c.clearSay();
    await belir(c, g, 350, 0); g.remove();
    const g2 = c.S('g', {}, svg);
    c.S('rect', { x: 140, y: 150, width: 720, height: 26, rx: 10, fill: METAL, stroke: METAL_KENAR, 'stroke-width': 3 }, g2);
    alevYatay(c, g2, 112, 165, { w: 54, h: 70 });
    elKutusu(c, g2, { x: 860, y: 130, w: 90, h: 66 });
    const alt2 = yazi(c, g2, 500, 520, 'şişin içi, yakından', { size: 26, kalin: 600, renk: RENK.soluk });
    gizle(alt2);
    await c.choice({
      tag: 'Sor', q: 'Ela metal şişin bir ucunu ateşte tutuyor. Öteki uca ısı nasıl ulaşır?',
      options: ['Sıcak tanecikler şişin ucuna doğru yürür', 'Isı şişin içinden değil, yalnızca havadan geçer', 'Titreşim, tanecikten komşu taneciğe geçer'], answer: 2,
      hints: ['Katıda tanecikler yerinde titreşir; ilerleyen şeyin ne olduğunu düşün.', 'Hızlanan tanecik komşusunu hızlandırır; titreşim şişin içinden ilerler.', ''],
      right: 'Evet. Titreşim, tanecikten komşu taneciğe geçer.',
    });
    const sr2 = serit(c, g2, mot, { x: 200, y: 290, w: 600, h: 190, n: 7, aralik: 80, x0: 260, cy: 385 });
    gizle(sr2.g);
    await belir(c, [sr2.g, alt2], 500);
    await par(c.say('Tanecikler yerinde kalıyor; titreşim tanecikten taneciğe ilerliyor.'), sr2.dalga(c, {}));
    await sr2.izGoster(c, 300);
    await c.say('Şişte de kaşıkta da ısı katının içinden geçti.');
    c.note('Katıda ısı tanecikten taneciğe geçer. Örnek: metal kaşık.', 'Katı');
  }

  /* ---- 3. Soba yanan oda ---- */
  async function sobaOda(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const f = ODA.kur(c, svg, { x: 0, y: 16, h: 530 });
    const yol = f.yol('dongu'), pS = f.nokta('soba');
    const elips = c.S('ellipse', { cx: pS[0], cy: pS[1] + 10, rx: 70, ry: 98, fill: RENK.isi }, svg);
    elips.style.opacity = 0;
    const sobaYazi = yazi(c, svg, pS[0] - 44, pS[1] - 26, 'soba', { hiza: 'end', size: 28, kalin: 700 });
    gizle(sobaYazi);
    const okG = c.S('g', {}, svg);
    const okS = yolOku(c, okG, yol.slice(0, 13), RENK.isi, { kalin: 7, oran: 0 }), okK = yolOku(c, okG, yol.slice(12), RENK.soguk, { kalin: 7, oran: 0 });
    okG.style.opacity = 1;

    const sag = c.S('g', {}, svg);
    sag.style.opacity = 1;
    const kart = c.S('g', {}, sag);
    kutu(c, kart, 625, 34, 360, 58, { rx: 12 });
    renkli(c, kart, 805, 72, [['akışkan', AKI], ': sıvı ve gaz'], { size: 28, kalin: 700 });
    const bS = tanecikKutusu(c, sag, mot, { x: 650, y: 118, w: 120, h: 120, n: 8, T: 20, tohum: 11 });
    const yS = yazi(c, sag, 710, 280, 'soğuk hava', { size: 26, kalin: 600 });
    const bH = tanecikKutusu(c, sag, mot, { x: 840, y: 118, w: 120, h: 120, n: 4, T: 80, halkali: 4, tohum: 12 });
    const yH = yazi(c, sag, 900, 280, 'sıcak hava', { size: 26, kalin: 600 });
    const KOL = [-140, -100, -60, -20, 20, 60, 100, 140], YAL = 170;
    const win = tanecikKutusu(c, sag, mot, {
      x: 640, y: 322, w: 340, h: 190, tohum: 13,
      tane: KOL.map((dx, i) => (i % 2 === 0
        ? { x: YAL + dx, y: 145, y2: 50, T: 80, halka: true }
        : { x: YAL + dx, y: 50, y2: 145, T: 20, halka: false })),
    });
    gizle(kart, bS.g, yS, bH.g, yH, win.g);

    await par(c.say('Eski köy evinde sobada odun yanıyor.'), c.tween(500, (e) => f.ayar({ soba: e }), ease.inOut), belir(c, sobaYazi, 400));
    await par(c.say('Sobanın yanındaki hava ısı alıyor.'), belir(c, elips, 500, 0.3));
    await par(c.say('Sıvılar ve gazlar akışkandır; tanecikleri yer değiştirebilir.'), belir(c, kart, 300));
    await par(c.say('Isınan havada tanecikler hızlanır, aralarındaki mesafe artar.'), belir(c, [bS.g, yS], 400));
    await par(c.say('Aynı kapta daha az tanecik kalır; yoğunluk azalır.'), belir(c, [bH.g, yH], 400));
    await par(belir(c, [bS.g, yS, bH.g, yH], 300, 0.3), belir(c, win.g, 400));
    await par(c.say('Yoğunluğu azalan sıcak tanecikler yukarı çıkar.'), win.gez(c, 1100, ease.inOut, (q) => q.halkali));
    await par(c.say('Yoğunluğu fazla olan soğuk tanecikler aşağı iner.'), win.gez(c, 1100, ease.inOut, (q) => !q.halkali));
    await par(c.say('Yükselen sıcak tanecikler enerjiyi beraberinde taşır.'), okS.git(c, 1200));
    await par(c.say('Sıcak hava tavana yükselirken yerini soğuk hava tabakasına bırakır.'), okK.git(c, 1200));

    // Sor: sağ alan temizlenir, termometre sayıları belirir.
    c.clearSay();
    const sayilar = [['tavan.termometre', 'tavan'], ['taban.termometre', 'taban']].map(([nokta, ad]) => ({ nokta, ad, el: yazi(c, svg, 0, 0, '', { hiza: 'start', size: 28, kalin: 700, renk: RENK.sicaklik }) }));
    const sayiGuncelle = () => {
      const d = f.durum();
      sayilar.forEach((s) => { const q = f.nokta(s.nokta); s.el.setAttribute('x', q[0] + 14); s.el.setAttribute('y', q[1] + 9); s.el.textContent = Math.round(d[s.ad]) + ' °C'; });
    };
    sayiGuncelle(); gizle(sayilar.map((s) => s.el));
    await par(belir(c, [sag, elips, sobaYazi], 350, 0), belir(c, okG, 350, 0.45), belir(c, sayilar.map((s) => s.el), 350));
    sag.remove();
    await c.choice({
      tag: 'Sor', q: 'Soba uzun süre yandı. Tavandaki ve tabandaki termometreler için ne söylenir?',
      options: ['Tabandaki daha yüksek gösterir', 'Tavandaki daha yüksek gösterir', 'İkisi aynı gösterir'], answer: 1,
      hints: ['Sıcak hava yükselir, soğuk hava iner; tavana hangisi toplanır?', '', 'Isınan havaya ne olduğunu düşün: yukarı mı çıkar, aşağı mı iner?'],
      right: 'Evet. Sıcak hava tavana toplanır.',
    });

    // Gör: termometrelere yakınlaş, sıcaklıklar değişsin, tekrar uzaklaş.
    const A = ODA.kadraj.tum, B = ODA.kadraj.pencere;
    const bak = (a, b, e) => { f.bak(a.map((v, i) => lerp(v, b[i], e))); sayiGuncelle(); };
    const gor = async () => {
      await belir(c, okG, 300, 0);
      await c.tween(900, (e) => bak(A, B, e), ease.inOut);
      await c.tween(3000, (e) => { f.ayar({ tavan: lerp(18, 40, e), taban: lerp(18, 22, e) }); sayiGuncelle(); }, ease.out);
      await c.tween(900, (e) => bak(B, A, e), ease.inOut);
      await belir(c, okG, 400, 1);
    };
    await par(c.say('Tavan sıcak, taban serin: termometreler farkı gösteriyor.'), gor());
    await c.say('Sıcak hava enerjiyi tavana taşıdı; taban serin kaldı.');
    const son = c.S('g', {}, svg);
    kutu(c, son, 640, 170, 340, 220, { rx: 16, renk: KAT, w: 3 });
    renkli(c, son, 810, 262, [['akışkan', AKI]], { size: 40, kalin: 700 });
    renkli(c, son, 810, 318, [['maddesel ortam', KAT]], { size: 38, kalin: 700 });
    gizle(son);
    await par(c.say('Sıvı ve gazlar, akışkan maddesel ortamdır.'), belir(c, son, 350));
    c.note('Akışkanda ısıyı, yer değiştiren tanecikler taşır. Örnek: soba odası.', 'Sıvı ve gaz');
  }

  /* ---- 4. Güneş ile Dünya ---- */
  async function gunesDunya(c) {
    const svg = c.svg(1000, 562);
    const yg = c.S('g', {}, svg);
    const hat = cizgi(c, svg, [216, 281], [822, 281], BOS, 3, { 'stroke-dasharray': '10 8' });
    const gn = gunes(c, svg, { cx: 130, cy: 281, r: 80 }), dn = dunya(c, svg, { cx: 870, cy: 281, r: 44 });
    const gy = yazi(c, svg, 130, 397, 'Güneş', { size: 30, kalin: 700 }), dy = yazi(c, svg, 870, 361, 'Dünya', { size: 30, kalin: 700 });
    const bos = yazi(c, svg, 500, 238, 'boşluk', { size: 30, kalin: 700, renk: BOS });
    bos.style.stroke = RENK.koyu; bos.style.strokeWidth = '10px'; bos.style.paintOrder = 'stroke';
    const tn = yazi(c, svg, 500, 62, 'maddesel olmayan ortam', { size: 34, kalin: 700, renk: BOS });
    gizle(gn.g, dn.g, gy, dy, bos, hat, tn);
    const salla = (t) => c.tween(400, (e) => dn.parla(lerp(...t, e)), t[0] < t[1] ? ease.out : ease.in);
    const dalgalar = () => yaylar(c, yg, { cx: 130, cy: 281, r0: 84, r1: 700, n: 4, aralik: 400, ms: 1800, aci: 20 });

    await par(c.say('Güneş’ten gelen ısı Dünya’yı ısıtıyor.'), belir(c, [gn.g, dn.g, gy, dy], 500));
    await par(c.say('Güneş ile Dünya arasında hava yok; orası boşluktur.'), belir(c, [bos, hat], 400));
    await c.say('Orada ısıyı ilerletecek tanecik yok.', { speak: '[curious] Orada ısıyı ilerletecek tanecik yok.' });
    await par(c.say('Sıcak cisimler, enerji taşıyan elektromanyetik dalgalar yayar.'), dalgalar());
    await par(c.say('Bu dalgalar boşlukta ışık hızıyla ilerler.'), dalgalar());
    await par(c.say('Dalga bir cisme çarpınca enerjisinin bir kısmını ya da tamamını aktarır.'), salla([0, 0.35]));
    await c.say('Dünya bu enerjiyi alınca ısınır.');

    c.clearSay();
    await salla([0.35, 0]);
    await c.choice({
      tag: 'Sor', q: 'Güneş ile Dünya arasındaki boşlukta ısı nasıl ilerler?',
      options: ['Elektromanyetik dalgalarla', 'Havanın taneciklerinin titreşimiyle', 'Yükselen sıcak havayla'], answer: 0,
      hints: ['', 'Orada hava yok; titreşecek ya da yer değiştirecek tanecik de yok.', 'Güneş gibi sıcak cisimlerin yaydığı şeyi düşün.'],
      right: 'Evet. Sıcak cisimler elektromanyetik dalgalar yayar.',
    });
    await par(c.say('Dalgalar boşluktan geçip Dünya’ya ulaşıyor.'), (async () => { await dalgalar(); await salla([0, 0.35]); })());
    await c.say('Güneş’ten gelen ısı, boşluktan dalgalarla geçti.');
    await par(c.say('Boşluk, maddesel olmayan bir ortamdır.'), belir(c, tn, 350));
    c.note('Boşlukta ısı elektromanyetik dalgalarla geçer. Örnek: Güneş ile Dünya.', 'Boşluk');
  }

  /* ---- 5. Üç ortam yan yana ---- */
  async function ucOrtam(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const CX = [190, 500, 810];
    const bas = ['katı', 'sıvı ve gaz', 'boşluk'].map((s, i) => yazi(c, svg, CX[i], 112, s, { size: 32, kalin: 700 }));
    const sr = serit(c, svg, mot, { x: 50, y: 220, w: 280, h: 80, n: 5, aralik: 50, x0: 90, cy: 260 });
    const PK = [30, 70, 110, 150, 190, 230];
    const pn = tanecikKutusu(c, svg, mot, {
      x: 370, y: 160, w: 260, h: 200, tohum: 21,
      tane: PK.map((dx, i) => (i % 2 === 0 ? { x: dx, y: 135, y2: 65, T: 80, halka: true } : { x: dx, y: 65, y2: 135, T: 20, halka: false })),
    });
    const yg = c.S('g', {}, svg);
    const dK = c.S('circle', { cx: 700, cy: 260, r: 20, fill: RENK.isi }, svg), dM = c.S('circle', { cx: 920, cy: 260, r: 14, fill: '#1b3a78', stroke: '#9cc2ff', 'stroke-width': 3 }, svg);
    const resim = [sr.g, pn.g, yg];
    const etK = (x, y, parca, renk) => yazi(c, svg, x, y, parca, { size: 28, kalin: 700, renk });
    const m1 = etK(CX[0], 412, 'maddesel ortam', KAT), m2 = etK(CX[1], 412, 'maddesel ortam', KAT);
    const m3a = etK(CX[2], 412, 'maddesel olmayan', BOS), m3b = etK(CX[2], 448, 'ortam', BOS);
    const a1 = etK(CX[0], 448, 'akışkan olmayan', RENK.yazi), a2 = etK(CX[1], 448, 'akışkan', AKI);
    const ort = cizgi(c, svg, [60, 492], [60, 492], KAT, 3);
    gizle(bas, resim, dK, dM, m1, m2, m3a, m3b, a1, a2, ort);

    await par(c.say('Üç durumda ısının geçtiği ortamları yan yana koyalım.'), belir(c, [...bas, ...resim, dK, dM], 400));
    await par(c.say('Katıda titreşim, tanecikten komşu taneciğe geçer.'), sr.dalga(c, {}));
    await par(c.say('Sıvı ve gazda sıcak tanecikler yükselirken enerjiyi taşır.'), pn.gez(c, 1600, ease.inOut));
    await par(c.say('Boşlukta tanecik yoktur; enerji dalgalarla ilerler.'), yaylar(c, yg, { cx: 700, cy: 260, r0: 24, r1: 204, n: 3, aralik: 400, ms: 1400, aci: 24 }));
    await par(c.say('İlk ikisinde ısı maddenin içinden geçer; bunlar maddesel ortamdır.'), belir(c, [m1, m2], 300));
    await par(c.say('Boşluk ise maddesel olmayan ortamdır.'), belir(c, [m3a, m3b], 300));
    await par(c.say('Katı akışkan değildir; sıvı ve gaz akışkandır.'), belir(c, [a1, a2], 300));
    await c.say('Katı, akışkan olmayan maddesel ortamdır.');

    c.clearSay();
    const yazilar = [m1, m2, m3a, m3b, a1, a2];
    await belir(c, yazilar, 300, 0.45);
    await c.choice({
      tag: 'Sor', q: 'Katı ile sıvı ve gaz hangi bakımdan benzer, hangi bakımdan farklıdır?',
      options: ['İkisi de akışkandır; yalnızca katı maddeseldir', 'Hiçbiri maddesel değildir; yalnızca boşluk akışkandır', 'İkisi de maddesel ortamdır; yalnızca sıvı ve gaz akışkandır'], answer: 2,
      hints: ['Tanecikleri yer değiştirebilen, yani akışkan olan hangisi?', 'Isı ikisinde de maddenin içinden geçiyor; bu bir benzerlik.', ''],
      right: 'Evet. İkisi de maddesel ortamdır; yalnızca sıvı ve gaz akışkandır.',
    });
    await par(c.say('İkisi de maddedir; yalnızca sıvı ve gazın tanecikleri yer değiştirir.'), belir(c, yazilar, 300, 1),
      c.tween(700, (e) => { ort.style.opacity = 1; ort.setAttribute('x2', lerp(60, 630, e)); }, ease.linear));
    await c.say('Isının yolunu, geçtiği ortam belirler.');
    c.note('Isının yolunu, geçtiği ortam belirler.', 'Ortam');
  }

  /* ---- 6. Tencere ve tuğla ocak ---- */
  /* Sağ alttaki bilgi kartı: iki satır, her satır renkli() parçalarıyla. */
  function bilgiKarti(c, p, satir1, satir2) {
    const g = c.S('g', {}, p);
    kutu(c, g, 150, 410, 700, 118, { rx: 14 });
    return { g, t1: renkli(c, g, 500, 454, satir1, { size: 30, kalin: 600 }), t2: renkli(c, g, 500, 504, satir2, { size: 30, kalin: 600 }) };
  }
  async function tencereOcak(c) {
    const svg = c.svg(1000, 562);
    const g = c.S('g', {}, svg);
    const tn = tencere(c, g, { x: 220, y: 190, w: 280, h: 130, sap: 300 });
    [290, 360, 430].forEach((x) => alev(c, g, x, 326, { w: 30, h: 56 }));
    const sapV = c.S('rect', { x: 500, y: 244, width: 300, height: 30, rx: 8, fill: RENK.isi }, g);
    const suV = c.S('rect', { x: 222, y: 222, width: 276, height: 96, rx: 8, fill: AKI }, g);
    sapV.style.opacity = 0; suV.style.opacity = 0;
    const sapY = yazi(c, g, 650, 224, 'sap', { size: 28, kalin: 700 }), suY = yazi(c, g, 360, 280, 'su', { size: 28, kalin: 700 });
    const ok1 = yolOku(c, g, [[330, 310], [330, 240]], RENK.isi, { kalin: 6, oran: 0 }), ok2 = yolOku(c, g, [[420, 310], [420, 240]], RENK.isi, { kalin: 6, oran: 0 });
    gizle(g);
    const k1 = bilgiKarti(c, svg, ['Isı sapa hangi ortamdan ulaşır?'], [['akışkan olmayan maddesel ortam', KAT]]);
    gizle(k1.g, k1.t2);

    // Çözülmüş örnek.
    await par(c.say('Ela ocağın üstüne su dolu bir tencere koyuyor.'), belir(c, g, 400), belir(c, k1.g, 400));
    await par(c.say('Önce sapa bakalım; sap metaldir, yani katıdır.'), belir(c, sapV, 300, 0.35));
    await c.say('Katıda ısı, tanecikten komşu taneciğe geçer.');
    await par(c.say('Sapa ısı, akışkan olmayan maddesel ortamdan ulaşır.'), belir(c, k1.t2, 300));
    await belir(c, k1.g, 300, 0.45);

    // Birlikte çöz.
    c.clearSay();
    await par(belir(c, sapV, 250, 0), belir(c, k1.g, 250, 0));
    k1.g.remove();
    const k2 = bilgiKarti(c, svg, ['Su bir sıvıdır; sıvı akışkandır.'], ['Isı suyun içinde …… ortamdan geçer.']);
    gizle(k2.g);
    await par(belir(c, k2.g, 350), belir(c, suV, 350, 0.35));
    await c.choice({
      tag: 'Birlikte çöz', q: 'Isı suyun içinde hangi ortamdan geçer?',
      options: ['Akışkan olmayan maddesel ortamdan', 'Akışkan maddesel ortamdan', 'Maddesel olmayan ortamdan'], answer: 1,
      hints: ['Sıvıda tanecikler yer değiştirebilir; bu hangi niteliktir?', '', 'Su maddedir; ortam maddesel mi, değil mi?'],
      right: 'Evet. Su akışkandır; ortam maddeseldir.',
    });
    parcaKoy(c, k2.t2, ['Isı suyun içinde ', ['akışkan maddesel', AKI], ' ortamdan geçer.']);
    await par(c.say('Suyun içinde ısıyı, yükselen sıcak tanecikler taşır.'), belir(c, [ok1.g, ok2.g], 200, 1), ok1.git(c, 1200), ok2.git(c, 1200));

    // Sor: tuğla ocak.
    c.clearSay();
    await belir(c, g, 350, 0); g.remove(); await belir(c, [k2.g, suV], 150, 0); k2.g.remove();
    const g2 = c.S('g', {}, svg);
    const sut = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) c.S('rect', { x: 320 + i * 100, y: 160 + j * 52, width: 100, height: 52, fill: RENK.koyu, stroke: '#c3cbea', 'stroke-width': 3 }, g2);
    for (let i = 0; i < 4; i++) {
      const sg = c.S('g', {}, g2);
      for (let j = 0; j < 3; j++) c.S('rect', { x: 323 + i * 100, y: 163 + j * 52, width: 94, height: 46, fill: RENK.isi }, sg);
      sg.style.opacity = 0; sut.push(sg);
    }
    [248, 276, 304].forEach((x, i) => alev(c, g2, x, 205 + (i === 1 ? -14 : 0), { w: 26, h: i === 1 ? 108 : 90 }));
    yazi(c, g2, 520, 375, 'tuğla ocak', { size: 32, kalin: 700 });
    g2.setAttribute('transform', 'translate(0,40)');
    gizle(g2);
    await belir(c, g2, 400);
    sut.forEach((s) => { s.style.opacity = 0; });
    await c.choice({
      tag: 'Sor', q: 'Eski bir tuğla ocakta ateş yanıyor. Hangisinde ısı akışkan olmayan maddesel ortamdan geçer?',
      options: ['Ocağın tuğla duvarında', 'Ocaktaki tencerenin suyunda', 'Güneş ile Dünya arasında'], answer: 0,
      hints: ['', 'Tuğla katıdır; katı akışkan mıdır?', 'Akışkan olmayan, ama madde olan ortamı ara.'],
      right: 'Evet. Tuğla katıdır; ısı tanecikten taneciğe geçer.',
    });
    await par(c.say('Isı tuğlanın içinden, tanecikten taneciğe geçiyor.'),
      Promise.all(sut.map(async (s, i) => { await c.wait(i * 450); await belir(c, s, 400, 0.45); })));
    c.note('Katı, akışkan, boşluk: ısı her birinde farklı ilerler.', 'Üç ortam');
  }

  /* ---- 7. Dene: ortamı bul ---- */
  const KARTLAR = [
    { ust: 'Kepçenin metal sapı', ad: 'kepçe sapı', kutu: 0, neden: 'Evet. Metal katıdır; ısı tanecikten taneciğe geçer.', ipucu: 'Katı akışkan değildir; ama maddedir.' },
    { ust: 'Tencerenin içindeki su', ad: 'tencere suyu', kutu: 1, neden: 'Evet. Sıvı akışkandır; sıcak tanecikler yükselir.', ipucu: 'Sıvıda tanecikler yer değiştirebilir.' },
    { ust: 'Güneş ile Dünya arasındaki boşluk', ad: 'boşluk', kutu: 2, neden: 'Evet. Orada madde yoktur; ısı dalgalarla geçer.', ipucu: 'Hava bile yok; ortam madde mi?' },
    { ust: 'Soba yanan odanın havası', ad: 'oda havası', kutu: 1, neden: 'Evet. Gaz akışkandır; sıcak hava tavana yükselir.', ipucu: 'Hava bir gazdır; gaz akışkan mıdır?' },
    { ust: 'Sıcak tuğla duvar', ad: 'tuğla duvar', kutu: 0, neden: 'Evet. Tuğla katıdır; tanecikleri yerinde titreşir.', ipucu: 'Tuğlanın tanecikleri yer değiştirebilir mi?' },
    { ust: 'Bir bardaktaki sıcak çay', ad: 'çay', kutu: 1, neden: 'Evet. Çay sıvıdır; sıvı akışkandır.', ipucu: 'Sıvı, gaz gibi akışkanlardan biridir.' },
  ];
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const AD = ['Akışkan olmayan maddesel ortam', 'Akışkan maddesel ortam', 'Maddesel olmayan ortam'];
    const uk = ucKutu(c, svg, { adlar: AD, renkler: [KAT, AKI, BOS], y: 120, h: 350, yazi: 34 });
    gizle(uk.g);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, svg);
      kutu(c, kart, 150, 16, 700, 84, { rx: 14 });
      yazi(c, kart, 500, 72, k.ust, { size: 34, kalin: 600 });
      gizle(kart);
      await belir(c, kart, 350);
    };
    const yerlestir = async (k) => {
      const el = kart;
      await c.tween(400, (e) => { const s = 1 - 0.4 * e; el.setAttribute('transform', `translate(${500 * (1 - s)},${58 * (1 - s)}) scale(${s})`); el.style.opacity = 1 - e; }, ease.in);
      el.remove();
      const t = uk.yaz(k.kutu, k.ad);
      await belir(c, t, 300);
    };
    await par(c.say('Şimdi altı durumda ısının geçtiği ortamı bulalım.'), belir(c, uk.g, 400));
    await c.say('Her biri için üç ortamdan birini seç.');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: AD, kartlar: KARTLAR,
      soru: () => 'Isı hangi ortamın içinden geçiyor?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await c.say('Isı her durumda bir ortamın içinden geçti.');
    await c.say('Isının yolunu, geçtiği ortam belirler.');
  }

  Ders.start({
    id: 'enerji-e1', kicker: 'Konu E · Isı aktarım yolları', title: 'Isı neyin içinden geçer?', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Isı neyin içinden geçer?',
      hook: 'Güneş ile Dünya arasında hava yok; Güneş’ten gelen ısı neyin içinden geçiyor?',
      button: 'Derse başla ›',
    },
    goals: ['Katıda ısının tanecikten taneciğe titreşimle geçtiğini söyler.', 'Sıvı ve gazda sıcak taneciklerin yer değiştirerek enerjiyi taşıdığını söyler.', 'Boşlukta ısının dalgalarla ilerlediğini söyler.', 'Isının geçtiği ortamı akışkan olmayan maddesel, akışkan maddesel ya da maddesel olmayan diye ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Sıcaklık ve ısı alışverişini hatırla.', run: hatirla },
      { title: 'Kaşığın içinden', goal: 'Katıda ısının nasıl ilerlediğini gör.', run: kasikSahnesi },
      { title: 'Soba yanan oda', goal: 'Sıvı ve gazda ısının nasıl ilerlediğini gör.', run: sobaOda },
      { title: 'Güneş ile Dünya', goal: 'Boşlukta ısının nasıl ilerlediğini gör.', run: gunesDunya },
      { title: 'Üç ortam yan yana', goal: 'Üç ortamı niteliklerine göre ayır.', run: ucOrtam },
      { title: 'Tencere ve tuğla ocak', goal: 'Aynı durumda farklı ortamları bul.', run: tencereOcak },
      { title: 'Dene: ortamı bul', goal: 'Altı durumda ısının geçtiği ortamı seç.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Uzaydaki bir uydunun Güneş’e dönük yüzü ısınıyor. Isı Güneş ile uydu arasında hangi ortamdan geçer?',
        options: ['Akışkan maddesel ortamdan', 'Maddesel olmayan ortamdan', 'Akışkan olmayan maddesel ortamdan'], answer: 1,
        why: ['Uzayda yükselen sıcak tanecikleri taşıyacak bir akışkan yoktur.', 'Aradaki boşluk maddesel olmayan ortamdır; ısı dalgalarla geçer.', 'Güneş ile uydu arasında titreşecek bir katı yoktur.'], scene: 3 },
      { q: 'Eski bir köy evinde ocakta odun yanıyor ve odanın havası ısınıyor. Isı odanın içinde hangi ortamdan geçer?',
        options: ['Akışkan olmayan maddesel ortamdan', 'Maddesel olmayan ortamdan', 'Akışkan maddesel ortamdan'], answer: 2,
        why: ['Havanın tanecikleri yer değiştirebilir; hava katı değildir.', 'Odada hava vardır; ortam maddeseldir.', 'Hava bir gazdır; gaz akışkan maddesel ortamdır.'], scene: 2 },
      { q: '“Metal kaşığın sapına ısı, sıcak tanecikler yürüyerek ulaşır.” Bu cümle için ne söylenir?',
        options: ['Yanlıştır; tanecikler yerinde titreşir, titreşim komşuya geçer', 'Doğrudur; katıda tanecikler yer değiştirerek ilerler', 'Doğrudur; ısı katının içinden geçmez'], answer: 0,
        why: ['Katıda tanecikler yerinde kalır; ilerleyen şey titreşimdir.', 'Katıda tanecikler yer değiştirmez, yerlerinde titreşir.', 'Isı katının içinden tanecikten taneciğe geçer.'], scene: 1 },
      { q: '“Güneş ile Dünya arasında hava olmasaydı Güneş’ten ısı gelemezdi.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; ısı yalnızca madde içinden geçer', 'Yanlıştır; ısı maddesel ortam olmadan dalgalarla da geçer', 'Doğrudur; ısı yalnızca sıvının içinden geçer'], answer: 1,
        why: ['Isı boşlukta da dalgalarla ilerler.', 'Isı, maddesel ortam olmadan elektromanyetik dalgalarla da geçer.', 'Isı yalnızca sıvıdan değil, katıdan, gazdan ve boşluktan da geçer.'], scene: 3 },
      { q: 'Hangisinde ısı ilerlerken tanecikler yer değiştirir?',
        options: ['Metal kaşığın sapının ısınmasında', 'Güneş’ten gelen ısının Dünya’ya ulaşmasında', 'Sıcak havanın odanın tavanına yükselmesinde'], answer: 2,
        why: ['Katıda tanecikler yerinde titreşir.', 'Boşlukta tanecik yoktur; ısı dalgalarla ilerler.', 'Sıcak tanecikler yükselir ve enerjiyi beraberinde taşır.'], scene: 2 },
    ],
    summary: ['Katıda ısı, titreşimle tanecikten komşu taneciğe geçer; tanecikler yerinde kalır.', 'Sıvı ve gazda sıcak tanecikler yer değiştirir; boşlukta ısı dalgalarla ilerler.', '<b>Isının yolunu, geçtiği ortam belirler.</b>'],
    nextLesson: { href: 'e2-uc-yol-uc-ad.html', label: 'Sonraki: Üç yol, üç ad ›' },
  });
})();
