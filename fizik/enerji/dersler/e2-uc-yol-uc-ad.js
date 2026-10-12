/* E2 — Üç yol, üç ad
   Benzer nitelikli durumlar gruplanınca üç ısı aktarım yolu çıkar: iletim, konveksiyon, ışıma; yeni durumlar bu adlarla sınıflanır.
   Senaryo: plan/fizik/enerji/senaryolar/E-isi-aktarim-yollari.md (E2). Sahne 4, 8 ve 9'da izometrik kesit oda (ODA, Ş4) büyük kurulur; sağ sütun x 625–985.
   Termometre ölçeği 0…50 °C (figür); sıcaklıklar sarı sayıyla sütun tepelerinin sağına yazılır.
   Düz çizim: sahne 5 ve 7'deki termometreler KIT_A.termometre (0–100 ölçeği) ve elKutusu'nun küçük termometresidir; sayı yazılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, parcaKoy, koy, ok: okCiz, sinifla } = window.KIT;
  const { motor, kap, termometre } = window.KIT_A;
  const { yolOku, yaylar, tanecikKutusu, alev, elKutusu, ucKutu } = window.KIT_E;
  const { lerp, ease } = Ders;
  const KAT = RENK.kutle, AKI = RENK.soguk, ISI = RENK.isi, GRI = RENK.gri, SARI = RENK.sicaklik;
  const KUTU_ODA = { x: 0, y: 16, h: 530 };
  const IC = '#0c1226';

  /* Doğru şıkkı verilen konuma koyar; yanlış şıkların ipucu aynı sırayla gelir. */
  const sec = (dogru, yanlis, konum) => {
    const o = yanlis.map((y) => y[0]), h = yanlis.map((y) => y[1]);
    o.splice(konum, 0, dogru); h.splice(konum, 0, '');
    return { options: o, hints: h, answer: konum };
  };
  /* Yazıya tahta renginde kontur verir (çizgilerin üstüne düşen etiket). */
  const konturla = (t) => { t.style.stroke = RENK.koyu; t.style.strokeWidth = '10px'; t.style.paintOrder = 'stroke'; return t; };
  /* Kelimeleri dengeli iki satıra böler. */
  const iki = (ad) => {
    const k = ad.split(' ');
    if (k.length < 2) return [ad];
    let en = 1, fark = 1e9;
    for (let i = 1; i < k.length; i++) {
      const a = k.slice(0, i).join(' ').length, b = k.slice(i).join(' ').length;
      if (Math.abs(a - b) < fark) { fark = Math.abs(a - b); en = i; }
    }
    return [k.slice(0, en).join(' '), k.slice(en).join(' ')];
  };
  const donustur = (cx, cy, s) => `translate(${cx},${cy}) scale(${s}) translate(${-cx},${-cy})`;

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const g1 = c.S('g', {}, svg);
    const kutular = [['katı', 40], ['sıvı', 365], ['boşluk', 690]].map(([ad, x]) => {
      const k = kutu(c, g1, x, 150, 270, 260, { rx: 18, w: 3, renk: ad === 'boşluk' ? GRI : RENK.kenarlik });
      if (ad === 'boşluk') k.setAttribute('stroke-dasharray', '12 9');
      yazi(c, g1, x + 135, 296, ad, { size: 48, kalin: 700 });
      return k;
    });
    gizle(g1);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 450));
    await c.choice(Object.assign({ tag: 'Hatırla', q: 'Isının hangi ortamda ilerlemesi için madde gerekmez?', right: 'Evet. Boşlukta tanecik yoktur; ısı dalgalarla ilerler.' },
      sec('Boşlukta', [['Katıda', 'Boşlukta tanecik yoktur; ısı dalgalarla ilerler.'], ['Sıvıda', 'Boşlukta tanecik yoktur; ısı dalgalarla ilerler.']], 1)));
    kutular[2].style.stroke = RENK.iyi;
    await c.say('Boşlukta tanecik yok; ısı dalgalarla ilerler.');

    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const sol = tanecikKutusu(c, g2, mot, { x: 120, y: 170, w: 380, h: 260, n: 6, T: 80, halkali: 6, tohum: 5 });
    const sag = tanecikKutusu(c, g2, mot, { x: 500, y: 170, w: 380, h: 260, n: 6, T: 20, tohum: 6 });
    const e1 = yazi(c, g2, 310, 130, 'sıcak oda havası', { size: 32, kalin: 700 }), e2 = yazi(c, g2, 690, 130, 'soğuk dış hava', { size: 32, kalin: 700 });
    const isi = window.KIT_A.isiOku(c, g2, [400, 300], [610, 300]);
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice(Object.assign({ tag: 'Hatırla', q: 'Sıcak oda havası ile soğuk dış hava birbirine değiyor. Isı hangi yönde aktarılır?', right: 'Evet. Isı, sıcaklığı yüksek olandan düşük olana aktarılır.' },
      sec('Odadan dışarıya', [['Dışarıdan odaya', 'Isı, sıcaklığı yüksek olandan düşük olana aktarılır.'], ['Hiçbir yöne', 'Isı, sıcaklığı yüksek olandan düşük olana aktarılır.']], 2)));
    await par(c.say('Isı, sıcak odadan soğuk dışarıya aktarılır.'), belir(c, isi.g, 500));
    await c.say('Bugün ısı aktarım yollarına ad vereceğiz.');
  }

  /* ---- 2. Benzerlere göre gruplayalım ---- */
  const GRUP = [
    { ad: 'metal kaşık', satir: ['metal kaşık'], kutu: 0 },
    { ad: 'tuğla ocak', satir: ['tuğla ocak'], kutu: 0, neden: 'Evet. Tuğla katıdır; titreşim tanecikten taneciğe geçer.', ipucu: 'Tuğla da metal kaşık gibi katıdır.' },
    { ad: 'soba odasının havası', satir: ['soba odasının', 'havası'], kutu: 1, neden: 'Evet. Sıcak hava yükselir, soğuk hava iner.', ipucu: 'Hava akışkandır; tanecikleri yer değiştirir.' },
    { ad: 'tencerenin suyu', satir: ['tencerenin', 'suyu'], kutu: 1, neden: 'Evet. Sıcak su yükselir, soğuk su iner.', ipucu: 'Su da akışkandır.' },
    { ad: 'Güneş ile Dünya', satir: ['Güneş ile', 'Dünya'], kutu: 2, neden: 'Evet. Aradaki boşlukta ısı dalgalarla geçer.', ipucu: 'Orada hava yok; ısı neyle geçer?' },
  ];
  async function gruplar(c) {
    const svg = c.svg(1000, 562);
    const AD = ['titreşim komşuya geçer', 'tanecikler yer değiştirir', 'dalgalar boşluktan geçer'];
    const uk = ucKutu(c, svg, { adlar: AD, renkler: [RENK.cizgi, AKI, ISI], y: 160, h: 330, yazi: 30 });
    gizle(uk.g);
    const ustG = c.S('g', {}, svg), yerG = c.S('g', {}, svg);
    const kartlar = GRUP.map((k, i) => {
      const cx = 116 + 192 * i, cy = 72, g = c.S('g', {}, ustG);
      const r = kutu(c, g, cx - 90, 36, 180, 72, { rx: 12, w: 2 });
      k.satir.forEach((s, j) => yazi(c, g, cx, k.satir.length === 1 ? 82 : 70 + j * 27, s, { size: 23, kalin: 600 }));
      return { g, r, cx, cy };
    });
    gizle(ustG);
    const sayac = [0, 0, 0];
    const one = (i) => { const q = kartlar[i]; q.r.style.stroke = RENK.yazi; q.r.setAttribute('stroke-width', 4); q.g.setAttribute('transform', donustur(q.cx, q.cy, 1.07)); };
    const koyKart = async (i) => {
      const q = kartlar[i], k = GRUP[i], kt = uk.kutular[k.kutu];
      await c.tween(400, (e) => { q.g.setAttribute('transform', donustur(q.cx, q.cy, 1.07 - 0.47 * e)); q.g.style.opacity = 1 - e; }, ease.in);
      q.g.remove();
      const t = yazi(c, yerG, kt.cx, kt.y + 140 + sayac[k.kutu] * 52, k.ad, { size: 25, kalin: 600 });
      sayac[k.kutu] += 1; gizle(t);
      await belir(c, t, 300);
    };

    await par(c.say('Önceki derste ısının geçtiği beş duruma baktık.'), belir(c, ustG, 400));
    await par(c.say('Şimdi bunları benzer niteliklerine göre gruplayacağız.', { speak: '[curious] Şimdi bunları benzer niteliklerine göre gruplayacağız.' }), belir(c, uk.g, 400));
    await c.say('Aynı biçimde ilerleyen ısılar aynı grupta toplanır.');
    one(0);
    await c.say('Metal kaşıkta ısı, titreşimle tanecikten taneciğe ilerliyordu.');
    await par(c.say('O hâlde metal kaşık, birinci gruba girer.'), koyKart(0));

    c.clearSay();
    await sinifla(c, {
      tag: 'Birlikte çöz', kutular: AD, kartlar: GRUP.slice(1),
      soru: () => 'Bu durum hangi gruba girer?',
      sec: (i) => { one(i + 1); return c.wait(250); }, yerlestir: (i) => koyKart(i + 1),
    });

    await par(c.say('Benzer niteliği olan durumlar aynı grupta toplandı.'), belir(c, uk.g, 400, 0.45),
      c.tween(500, (e) => { uk.g.setAttribute('transform', `translate(0,${-36 * e})`); yerG.setAttribute('transform', `translate(0,${-36 * e})`); }, ease.inOut));
    await c.say('Her grup, bir ısı aktarım yoludur.');
    await c.say('Şimdi üç yola birer ad verelim.');
  }

  /* ---- 3. Üç yol, üç ad ---- */
  async function adlar(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const CX = [190, 500, 810], BX = [60, 370, 680];
    const NAD = ['iletim', 'konveksiyon', 'ışıma'], REN = [RENK.cizgi, AKI, ISI];
    const TAN = [['tanecikten', 'taneciğe'], ['yer değiştiren', 'tanecikler'], ['elektromanyetik', 'dalgalar']];
    const ust = c.S('g', {}, g1);
    kutu(c, ust, 350, 36, 300, 64, { rx: 14, w: 3 });
    yazi(c, ust, 500, 79, 'Isı aktarım yolları', { size: 30, kalin: 700 });
    const dallar = CX.map((x) => cizgi(c, g1, [500, 100], [500, 100], RENK.cizgi, 2));
    const parca = CX.map((x, i) => {
      const g = c.S('g', {}, g1);
      kutu(c, g, BX[i], 170, 260, 74, { rx: 14, renk: REN[i], w: 3 });
      yazi(c, g, x, 220, NAD[i], { size: 38, kalin: 700 });
      TAN[i].forEach((s, j) => yazi(c, g, x, 288 + j * 32, s, { size: 26, kalin: 600, renk: RENK.soluk }));
      gizle(g);
      return g;
    });
    const bar = (x, w, renk, satir) => {
      const g = c.S('g', {}, g1);
      const r = c.S('rect', { x, y: 380, width: 0, height: 80, rx: 12, fill: renk, 'fill-opacity': 0.25, stroke: renk, 'stroke-width': 3 }, g);
      const ty = satir.length === 1 ? 430 : 410;
      const tx = satir.map((s, j) => yazi(c, g, x + w / 2, ty + j * 32, s, { size: satir.length === 1 ? 32 : 28, kalin: 700 }));
      gizle(tx);
      return { r, tx, w };
    };
    const b1 = bar(60, 570, KAT, ['maddesel ortam gerekir']), b2 = bar(680, 260, GRI, ['maddesel ortam', 'gerekmez']);
    const halka = CX.map((x, i) => { const r = c.S('rect', { x: BX[i], y: 170, width: 260, height: 74, rx: 14, fill: 'none', stroke: ISI, 'stroke-width': 8 }, g1); r.style.opacity = 0; return r; });
    gizle(ust);
    const yol = async (i) => {
      await c.tween(400, (e) => koy(dallar[i], [500, 100], [lerp(500, CX[i], e), lerp(100, 170, e)]), ease.linear);
      await belir(c, parca[i], 300);
    };
    const barCiz = async (b) => { await c.tween(500, (e) => b.r.setAttribute('width', b.w * e), ease.linear); await belir(c, b.tx, 250); };

    await par(c.say('Üç gruptan üç ısı aktarım yolu çıktı.'), belir(c, ust, 300));
    await par(c.say('Isının tanecikten taneciğe aktarılarak yayılmasına iletim denir.'), yol(0));
    await c.say('Sıvı ve gazda tanecikler uzaktır; iletim zordur ama olabilir.');
    await par(c.say('Akışkanda taneciklerin yer değiştirmesiyle ısının yayılmasına konveksiyon denir.'), yol(1));
    await par(c.say('Isının elektromanyetik dalgalarla yayılmasına ışıma denir.'), yol(2));
    await par(c.say('İletim ve konveksiyonda maddesel ortam gerekir.'), barCiz(b1));
    await par(c.say('Işımada maddesel ortama gerek yoktur.'), barCiz(b2));
    halka.forEach((r) => { r.style.opacity = 0.6; });
    await par(c.say('Isı üç yolla aktarılır: iletim, konveksiyon, ışıma.'), c.tween(500, (e) => halka.forEach((r) => { r.style.opacity = 0.6 * (1 - e); }), ease.out));

    // Sor: yeni durum, su dolu kap.
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    const kp = kap(c, g2, { x: 400, y: 110, w: 200, h: 250, su: 200 });
    const al = alev(c, g2, 500, 380, { w: 56, h: 90 });
    const yuk = okCiz(c, g2, [455, 300], [455, 225], ISI, 6), asa = okCiz(c, g2, [545, 225], [545, 300], AKI, 6);
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice(Object.assign({ tag: 'Sor', q: 'Kaptaki suyun ısınması, yer değiştiren sıcak ve soğuk tanecikler sayesinde oluyor. Bu yolun adı nedir?', right: 'Evet. Tanecikler yer değiştiriyor: bu yol konveksiyondur.' },
      sec('Konveksiyon', [['İletim', 'Tanecikler yer değiştiriyor; hangi tanımda böyle deniyor?'], ['Işıma', 'Işımada tanecik yoktur, dalga vardır; iletimde tanecik yerinde titreşir.']], 2)));
    // Gör: oklar bir kez döner.
    const dolu = c.S('g', {}, g2);
    const yay = (a0, a1) => { const P = []; for (let a = a0; a <= a1; a += 15) P.push([500 + 45 * Math.cos(a * Math.PI / 180), 235 + 45 * Math.sin(a * Math.PI / 180)]); return P; };
    const sicak = yolOku(c, dolu, [[455, 335], ...yay(180, 270)], ISI, { kalin: 6, oran: 0 });
    const soguk = yolOku(c, dolu, [...yay(270, 360), [545, 335]], AKI, { kalin: 6, oran: 0 });
    const ad = yazi(c, g2, 500, 70, 'konveksiyon', { size: 38, kalin: 700 }); gizle(ad);
    await par(c.say('Isınan su yükselir, soğuk su iner: bu hareket konveksiyondur.'), (async () => {
      await belir(c, [yuk.g, asa.g], 250, 0);
      await sicak.git(c, 1200); await soguk.git(c, 1200);
      await belir(c, ad, 300);
    })());
    c.note('Isı üç yolla aktarılır: iletim, konveksiyon, ışıma.', 'Üç yol');
  }

  /* ---- Figür sahneleri için ortak yardımcılar ---- */
  /* Sıcaklık sayıları: sarı, sütun tepelerinin sağında; sütunla birlikte güncellenir. */
  function sayilar(c, svg, f) {
    const liste = [['tavan.termometre', 'tavan'], ['taban.termometre', 'taban']].map(([nokta, ad]) => ({ nokta, ad, el: yazi(c, svg, 0, 0, '', { hiza: 'start', size: 28, kalin: 700, renk: SARI }) }));
    const guncelle = () => {
      const d = f.durum();
      liste.forEach((s) => { const q = f.nokta(s.nokta); s.el.setAttribute('x', q[0] + 14); s.el.setAttribute('y', q[1] + 9); s.el.textContent = Math.round(d[s.ad]) + ' °C'; });
    };
    guncelle(); gizle(liste.map((s) => s.el));
    return { liste, el: liste.map((s) => s.el), guncelle };
  }
  const kadrajGit = (c, f, a, b, ms, cb) => c.tween(ms, (e) => { f.bak(a.map((v, i) => lerp(v, b[i], e))); if (cb) cb(); }, ease.inOut);

  /* ---- 4. Petek neden aşağıda? ---- */
  async function petekSahnesi(c) {
    const svg = c.svg(1000, 562);
    const f = ODA.kur(c, svg, KUTU_ODA);
    f.ayar({ soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1 });
    const yol = f.yol('petekDongu'), pP = f.nokta('petek');
    const okG = c.S('g', {}, svg);
    const okS = yolOku(c, okG, yol.slice(0, 13), ISI, { kalin: 7, oran: 0 }), okK = yolOku(c, okG, yol.slice(12), AKI, { kalin: 7, oran: 0 });
    okG.style.opacity = 1;
    const pYazi = yazi(c, svg, pP[0] - 2, pP[1] - 45, 'petek', { hiza: 'end', size: 26, kalin: 700 }); gizle(pYazi);
    const tv = f.nokta('tavan');
    const kon = yazi(c, svg, tv[0] + 40, tv[1] - 60, 'konveksiyon', { size: 30, kalin: 700 }); gizle(kon);
    const sy = sayilar(c, svg, f);
    // Sağ sütunda, tavana yakın petekli küçük kesit.
    const mini = c.S('g', {}, svg);
    kutu(c, mini, 640, 100, 330, 230, { rx: 14, w: 3 });
    const soguk = c.S('rect', { x: 643, y: 215, width: 324, height: 112, rx: 10, fill: AKI, 'fill-opacity': 0 }, mini);
    c.S('rect', { x: 648, y: 108, width: 28, height: 66, rx: 6, fill: ISI }, mini);
    const dr = [];
    for (let i = 0; i <= 13; i++) { const a = (Math.PI * 1.1) + i * (Math.PI * 1.65) / 13; dr.push([815 + 44 * Math.cos(a), 160 + 44 * Math.sin(a)]); }
    const don = yolOku(c, mini, dr, ISI, { kalin: 6, oran: 1 });
    const miniYazi = yazi(c, svg, 805, 375, 'tavana yakın petek', { size: 28, kalin: 700 });
    const isinmaz = yazi(c, svg, 805, 285, 'ısınmaz', { size: 32, kalin: 700, renk: GRI });
    gizle(mini, miniYazi, isinmaz);
    soguk.style.opacity = 1;

    await par(c.say('Kalorifer peteği odanın zeminine yakın bir yere konur.'), belir(c, pYazi, 400));
    await par(c.say('Peteğe değen havanın sıcaklığı artar, yoğunluğu azalır.'), c.tween(600, (e) => f.ayar({ petek: e }), ease.out));
    await par(c.say('Sıcak hava tavana doğru yükselirken yerini soğuk havaya bırakır.'), (async () => { await okS.git(c, 1200); await okK.git(c, 1200); })());
    const A = ODA.kadraj.tum, B = ODA.kadraj.pencere;
    const gor = async () => {
      await par(belir(c, okG, 300, 0), belir(c, pYazi, 300, 0));
      await kadrajGit(c, f, A, B, 900, sy.guncelle);
      await belir(c, sy.el, 300);
      await c.tween(3000, (e) => { f.ayar({ tavan: lerp(18, 32, e), taban: lerp(18, 26, e) }); sy.guncelle(); }, ease.out);
      await kadrajGit(c, f, B, A, 900, sy.guncelle);
      await par(belir(c, okG, 400, 1), belir(c, pYazi, 400, 1));
    };
    await par(c.say('Petek çalıştığı sürece bu hareket sürer ve oda ısınır.'), gor());
    await par(c.say('Bu hareket konveksiyondur; ısı havayı oluşturan taneciklerle yayılır.'), belir(c, kon, 300));
    await par(c.say('Petek tavana yakın olsaydı, yalnızca üst hava dolaşırdı.'), belir(c, mini, 400), belir(c, miniYazi, 400), belir(c, okG, 400, 0.45));
    await par(c.say('Zemindeki hava ısınmazdı; bu yüzden petek zemine yakın konur.'), belir(c, isinmaz, 300),
      c.tween(500, (e) => { soguk.setAttribute('fill-opacity', 0.25 * e); }, ease.out));

    // Sor: su ısıtıcısı kesiti.
    c.clearSay();
    const hepsi = [f.el, okG, pYazi, kon, mini, miniYazi, isinmaz, ...sy.el];
    await belir(c, hepsi, 350, 0); hepsi.forEach((e) => e.remove());
    const g2 = c.S('g', {}, svg);
    const kp = kap(c, g2, { x: 380, y: 110, w: 240, h: 330, su: 280 });
    const tel = c.S('polyline', { points: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `${410 + i * 22.5},${i % 2 ? 392 : 414}`).join(' '), fill: 'none', stroke: ISI, 'stroke-width': 7, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g2);
    const isitma = c.S('rect', { x: 383, y: 167, width: 234, height: 270, rx: 4, fill: ISI, 'fill-opacity': 0 }, g2);
    const telAd = yazi(c, g2, 700, 403, 'ısıtıcı tel', { hiza: 'start', size: 28, kalin: 700 });
    const telCizgi = cizgi(c, g2, [690, 399], [628, 399], RENK.cizgi, 2);
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice(Object.assign({ tag: 'Sor', q: 'Bir su ısıtıcısında ısıtıcı tel neden tabana yerleştirilir?', right: 'Evet. Isınan su yükselir, yerine soğuk su gelir.' },
      sec('Alttaki ısınan su yükselir, yerine soğuk su gelir; suyun tamamı ısınır', [
        ['Isınan su aşağı çöker; üstteki su hiç ısınmaz', 'Peteğin neden aşağıda olduğunu düşün: ısınan akışkan nereye gider?'],
        ['Tel üstte olsaydı su hiç ısınmazdı; ısı yalnızca aşağıya geçer', 'Sıcak akışkan yükselir, soğuk akışkan iner.']], 0)));
    const hY = yolOku(c, g2, [[455, 380], [455, 200]], ISI, { kalin: 7, oran: 0 }), sY = yolOku(c, g2, [[545, 200], [545, 380]], AKI, { kalin: 7, oran: 0 });
    await par(c.say('Su ısıtıcısında da aynı hareket suyun tamamını ısıtır.'), (async () => {
      await par(hY.git(c, 1200), sY.git(c, 1200), c.tween(1500, (e) => isitma.setAttribute('fill-opacity', 0.2 * e), ease.inOut));
    })());
    c.note('Sıcak akışkan yükselir, soğuk iner. Örnek: zemine yakın petek.', 'Konveksiyon');
  }

  /* ---- 5. Mum alevine üstten ve yandan ---- */
  async function mumSahnesi(c) {
    const svg0 = c.svg(1000, 562);
    const svg = c.S('g', { transform: 'translate(500,281) scale(1.2) translate(-500,-292)' }, svg0);
    const halkaG = c.S('g', {}, svg);
    const mum = c.S('g', {}, svg);
    c.S('rect', { x: 480, y: 384, width: 40, height: 100, rx: 4, fill: '#f1e3c1', stroke: '#b9a77c', 'stroke-width': 2 }, mum);
    cizgi(c, mum, [500, 384], [500, 372], '#b9a77c', 3);
    alev(c, mum, 500, 328, { w: 24, h: 54 });
    const el1 = elKutusu(c, svg, { x: 440, y: 125, w: 120, h: 90 });
    const el2 = elKutusu(c, svg, { x: 625, y: 310, w: 120, h: 90 });
    const tU = termometre(c, svg, { x: 600, y: 232, h: 130, T: 20 }), tY = termometre(c, svg, { x: 785, y: 417, h: 130, T: 20 });
    const ustYazi = yazi(c, svg, 500, 100, 'üstten', { size: 28, kalin: 700 }), yanYazi = yazi(c, svg, 685, 285, 'yandan', { size: 28, kalin: 700 });
    const okl = [480, 500, 520].map((x) => yolOku(c, svg, [[x, 322], [x, 225]], ISI, { kalin: 5, oran: 0 }));
    const sr = [];
    for (let i = 0; i < 3; i++) { const r = c.S('circle', { cx: 500, cy: 355, r: 40, fill: 'none', stroke: ISI, 'stroke-width': 4 }, halkaG); r.style.opacity = 0; sr.push(r); }
    const yaz1 = yazi(c, svg, 415, 182, 'konveksiyon + ışıma', { hiza: 'end', size: 28, kalin: 700, renk: ISI });
    const yaz2 = yazi(c, svg, 685, 440, 'ışıma', { size: 30, kalin: 700, renk: ISI });
    const hepsi = [mum, el1.g, el2.g, tU.g, tY.g, ustYazi, yanYazi];
    gizle(hepsi, yaz1, yaz2);
    const halkalar = () => {
      const toplam = 900 + 2 * 300;
      return c.tween(toplam, (e) => sr.forEach((r, i) => {
        const k = Math.min(1, Math.max(0, (e * toplam - i * 300) / 900));
        r.setAttribute('r', lerp(40, 200, k)); r.style.opacity = k <= 0 || k >= 1 ? 0 : lerp(0.7, 0.1, k);
      }), ease.linear);
    };

    await par(c.say('Ela, güvenli uzaklıkta, elini mum alevine üstten ve yandan yaklaştırıyor.'), belir(c, hepsi, 500));
    await c.say('Alevin çevresindeki hava ısınır ve yukarı çıkar.');
    await par(c.say('Üstteki el, yükselen sıcak havayla konveksiyon yoluyla ısınır.'), (async () => { for (const o of okl) { o.git(c, 1000); await c.wait(300); } await c.wait(700); })());
    await par(c.say('Alev ayrıca her yöne elektromanyetik dalgalar yayar.'), halkalar());
    await par(c.say('Dalgalar iki ele de ulaşır; bu ısı aktarım yolu ışımadır.'), halkalar());
    await par(c.say('Üstteki el hem konveksiyonla hem ışımayla ısınır.'), belir(c, yaz1, 300));
    await par(c.say('Yandaki el çoğunlukla ışımayla ısınır.'), belir(c, yaz2, 300));

    await c.choice(Object.assign({ tag: 'Sor', q: 'Hangi el daha fazla sıcaklık hisseder, neden?', right: 'Evet. Üstteki el iki yolla ısınır.' },
      sec('Üstteki; hem konveksiyonla hem ışımayla ısınır', [
        ['Yandaki; yalnızca konveksiyonla ısınır', 'Yükselen sıcak hava hangi ele ulaşır?'],
        ['İkisi eşit; ikisi de yalnızca ışımayla ısınır', 'Dalgalar iki ele de gelir; ek olarak hangi elde bir yol daha var?']], 1)));
    await par(c.say('Bu yüzden üstten yaklaşınca daha fazla sıcaklık hissedilir.'), tU.git(c, 40, 3000, ease.out), tY.git(c, 30, 3000, ease.out));
    c.note('Üstteki el konveksiyon ve ışımayla, yandaki çoğunlukla ışımayla ısınır.', 'Mum alevi');
  }

  /* ---- 6. Kamp ateşi ---- */
  async function kampSahnesi(c) {
    const svg0 = c.svg(1000, 562);
    const svg = c.S('g', { transform: 'translate(500,281) scale(1.15) translate(-500,-366)' }, svg0);
    const yayKat = c.S('g', {}, svg);
    const ates = c.S('g', {}, svg);
    cizgi(c, ates, [110, 450], [255, 415], GRI, 6); cizgi(c, ates, [110, 415], [255, 450], GRI, 6); cizgi(c, ates, [100, 432], [265, 432], GRI, 6);
    alev(c, ates, 150, 372, { w: 46, h: 62 }); alev(c, ates, 182, 330, { w: 60, h: 100 }); alev(c, ates, 216, 376, { w: 44, h: 58 });
    const atesAd = yazi(c, svg, 182, 500, 'kamp ateşi', { size: 30, kalin: 700 });
    // Ela: ateşe dönük, gövdesi x 655–745.
    const kisi = c.S('g', {}, svg);
    const bas = c.S('circle', { cx: 700, cy: 252, r: 28, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3 }, kisi);
    const govde = c.S('path', { d: 'M675,284 H725 Q745,284 745,304 V412 Q745,432 725,432 H675 Q655,432 655,412 V304 Q655,284 675,284 Z', fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3 }, kisi);
    const goz = c.S('circle', { cx: 689, cy: 247, r: 4, fill: RENK.cizgi }, kisi);
    const elaAd = yazi(c, svg, 700, 482, 'Ela', { size: 30, kalin: 700 });
    // Parlamalar ekran koordinatındadır (kişi dönse de yerinde kalır).
    const parSol = c.S('path', { d: 'M700,284 H675 Q655,284 655,304 V412 Q655,432 675,432 H700 Z', fill: ISI }, svg);
    const parSag = c.S('path', { d: 'M700,284 H725 Q745,284 745,304 V412 Q745,432 725,432 H700 Z', fill: ISI }, svg);
    parSol.style.opacity = 0; parSag.style.opacity = 0;
    const kesik = cizgi(c, svg, [762, 284], [762, 432], GRI, 3, { 'stroke-dasharray': '9 8' });
    const dalgaYok = yazi(c, svg, 778, 366, 'dalga yok', { hiza: 'start', size: 28, kalin: 700, renk: GRI });
    const isima = yazi(c, svg, 420, 330, 'ışıma', { size: 34, kalin: 700, renk: ISI });
    const kizil = yazi(c, svg, 182, 290, 'kızılötesi', { size: 28, kalin: 700, renk: ISI });
    gizle(ates, atesAd, kisi, elaAd, kesik, dalgaYok, isima, kizil);
    const yay = () => yaylar(c, yayKat, { cx: 215, cy: 380, r0: 50, r1: 430, n: 3, aralik: 400, ms: 1400, aci: 20 });
    const parlat = (el, a, b, ms, e = ease.out) => c.tween(ms, (k) => { el.style.opacity = lerp(a, b, k); }, e);

    await par(c.say('Ela kamp ateşinin yanında oturuyor.'), belir(c, [ates, atesAd, kisi, elaAd], 500));
    await par(c.say('Ateşin yaydığı elektromanyetik dalgalar Ela’ya ulaşıyor.'), yay());
    await par(c.say('Dalgalar, Ela’nın ateşe dönük yüzeyi tarafından soğuruluyor.'), parlat(parSol, 0, 0.5, 500));
    await par(c.say('Ateşe dönük yüzü ısınıyor; arka yüzüne dalga çarpmıyor.'), belir(c, [kesik, dalgaYok], 300));
    await par(c.say('Sonra ısı vücudun içinde yayılıyor ve tüm vücut ısınıyor.'), parlat(parSag, 0, 0.3, 1500, ease.inOut), parlat(parSol, 0.5, 0.4, 1500, ease.inOut));
    await par(c.say('Kamp ateşinin ısıtması ışıma yoluyla gerçekleşiyor.'), belir(c, isima, 300));
    await par(c.say('Sıcaklığı 0 kelvinin üzerindeki her madde kızılötesi ışınlar yayar.', { speak: 'Sıcaklığı sıfır kelvinin üzerindeki her madde kızılötesi ışınlar yayar.' }), yay());
    await par(c.say('Kızılötesi, elektromanyetik dalgaların bir türüdür.'), belir(c, kizil, 300));

    // Sor: Ela ateşe sırtını döner.
    c.clearSay();
    await par(belir(c, [kesik, dalgaYok, kizil], 300, 0), parlat(parSol, 0.4, 0, 400, ease.in), parlat(parSag, 0.3, 0, 400, ease.in));
    kesik.remove(); dalgaYok.remove(); kizil.remove();
    await c.tween(500, (e) => { kisi.setAttribute('transform', `translate(700,0) scale(${1 - 2 * e},1) translate(-700,0)`); }, ease.inOut);
    await c.choice(Object.assign({ tag: 'Sor', q: 'Ela ateşe sırtını dönüp oturuyor. Hangi yüzeyi doğrudan ısınır?', right: 'Evet. Dalga hangi yüzeye çarparsa o yüzey ısınır.' },
      sec('Sırtı; ateşe dönük olan yüzeyi', [
        ['Yüzü; dalgalar yalnızca yüze çarpar', 'Dalga hangi yüzeye çarparsa o yüzey ısınır.'],
        ['İkisi de aynı ölçüde', 'Ateşe dönük olan yüzü bul.']], 0)));
    await par(c.say('Dalgalar ateşe dönük sırtına çarpıyor; yalnızca sırtı ısınıyor.'), yay(), parlat(parSol, 0, 0.5, 500));
    c.note('Işıma: ısı elektromanyetik dalgalarla yayılır. Örnek: kamp ateşi.', 'Işıma');
  }

  /* ---- 7. Koyu renk, açık renk ---- */
  async function renkSahnesi(c) {
    const svg = c.svg(1000, 562);
    const araba = (x, dolgu, kenar) => {
      const g = c.S('g', {}, svg);
      c.S('rect', { x: x + 55, y: 286, width: 130, height: 46, rx: 12, fill: dolgu, stroke: kenar, 'stroke-width': 3 }, g);
      c.S('rect', { x, y: 330, width: 240, height: 62, rx: 12, fill: dolgu, stroke: kenar, 'stroke-width': 3 }, g);
      [x + 56, x + 184].forEach((wx) => c.S('circle', { cx: wx, cy: 394, r: 17, fill: IC, stroke: RENK.cizgi, 'stroke-width': 3 }, g));
      const parla = c.S('rect', { x: x + 55, y: 286, width: 130, height: 46, rx: 12, fill: ISI }, g);
      parla.style.opacity = 0;
      return { g, parla };
    };
    const koyu = araba(100, '#2a2a2a', RENK.cizgi), acik = araba(560, '#e6e6e6', '#9aa3bf');
    const tK = termometre(c, svg, { x: 392, y: 412, h: 200, T: 20 }), tA = termometre(c, svg, { x: 852, y: 412, h: 200, T: 20 });
    const koyuAd = yazi(c, svg, 220, 475, 'koyu renkli araç', { size: 28, kalin: 700 }), acikAd = yazi(c, svg, 680, 475, 'açık renkli araç', { size: 28, kalin: 700 });
    const gunes = yazi(c, svg, 500, 78, 'Güneş’ten gelen ışınlar', { size: 30, kalin: 700 });
    const oklar = [100, 560].flatMap((x) => [0, 1, 2, 3].map((i) => yolOku(c, svg, [[x + 30 + i * 60, 128], [x + 30 + i * 60, 268]], ISI, { kalin: 5, oran: 0 })));
    gizle(koyu.g, acik.g, tK.g, tA.g, koyuAd, acikAd, gunes);
    const parlat = (el, hedef) => c.tween(500, (k) => { el.style.opacity = hedef * k; }, ease.out);

    await par(c.say('Ela güneşte aynı süre kalan iki arabayı karşılaştırıyor.'), belir(c, [koyu.g, acik.g, tK.g, tA.g, koyuAd, acikAd], 500));
    await c.say('Biri koyu renkli, öteki açık renkli.');
    await par(c.say('Güneş’ten kızılötesi, görünür ışık ve morötesi ışınlar yayılır.'), belir(c, gunes, 300), Promise.all(oklar.map((o) => o.git(c, 1200))));
    await par(c.say('Bu ışınlar soğurulunca maddeye enerji aktarır.'), parlat(koyu.parla, 0.8), parlat(acik.parla, 0.35));
    await c.say('Koyu renkli nesneler, açık renkli nesnelere göre bu ışınları daha fazla soğurur.');
    await c.say('Daha fazla enerji soğuran nesnenin sıcaklığı daha çok artar.');

    await c.choice(Object.assign({ tag: 'Sor', q: 'Güneşte aynı süre kalan koyu ve açık renkli araçtan hangisinin sıcaklığı daha çok artar?', right: 'Evet. Koyu renk ışınları daha fazla soğurur.' },
      sec('Koyu renkli; ışınları daha fazla soğurur', [
        ['Açık renkli; ışınları daha fazla soğurur', 'Daha çok enerji soğuran, daha çok ısınır.'],
        ['İkisi eşit artar', 'Hangi renk ışınları daha fazla soğuruyor?']], 1)));
    await par(c.say('Koyu renkli araç daha çok ısındı; açık renkli araç daha az.'), tK.git(c, 46, 3000, ease.out), tA.git(c, 32, 3000, ease.out));
    c.note('Koyu renkli nesneler ışımayı daha fazla soğurur. Örnek: siyah araba.', 'Renk');
  }

  /* ---- 8. Havası boşaltılmış oda ---- */
  async function havasizSahnesi(c) {
    const svg = c.svg(1000, 562);
    const f = ODA.kur(c, svg, KUTU_ODA);
    f.ayar({ soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1, termometre: 1 });
    const yayKat = c.S('g', {}, svg);
    const sag = c.S('g', {}, svg);
    const kart = c.S('g', {}, sag);
    kutu(c, kart, 625, 40, 360, 160, { rx: 14, w: 3 });
    yazi(c, kart, 805, 90, 'Elektrikli ısıtıcı', { size: 30, kalin: 700 }); yazi(c, kart, 805, 128, 'odayı ısıtır mı?', { size: 30, kalin: 700 });
    const cevap = yazi(c, kart, 805, 176, 'Isıtır; ışıma.', { size: 30, kalin: 700, renk: ISI });
    gizle(sag, cevap);
    let elG = null, el = null, yol = null;
    const kur = () => {
      const q = f.nokta('el');
      elG = c.S('g', {}, svg);
      el = elKutusu(c, elG, { x: q[0] - 130, y: q[1] - 45, w: 100, h: 90, termometre: true });
      el.sutun(0.4);
      const parla = c.S('rect', { x: q[0] - 130, y: q[1] - 45, width: 100, height: 90, rx: 14, fill: ISI }, elG);
      parla.style.opacity = 0;
      gizle(elG);
      return parla;
    };
    const dalga = () => {
      const a = f.nokta('isitici'), b = f.nokta('el');
      return yaylar(c, yayKat, { cx: a[0], cy: a[1], r0: 24, r1: Math.hypot(b[0] - a[0], b[1] - a[1]) - 70, n: 3, aralik: 500, ms: 1400, aci: 20, yon: Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI });
    };
    const A = ODA.kadraj.tum, B = ODA.kadraj.isitici;
    let parla = null;

    await par(c.say('Önce odadaki havayı boşaltalım.'), belir(c, sag, 400), c.tween(1200, (e) => f.ayar({ hava: 1 - e, termometre: 1 - e }), ease.inOut));
    await c.say('Odada ısıyı ilerletecek hiç hava kalmadı.', { speak: '[thoughtful] Odada ısıyı ilerletecek hiç hava kalmadı.' });
    await par(c.say('Şimdi elektrikli ısıtıcıyı çalıştıralım.'), (async () => { await kadrajGit(c, f, A, B, 900); f.ayar({ isitici: 1 }); parla = kur(); })());
    await par(c.say('Sıcak ısıtıcı, elektromanyetik dalgalar yayar.'), belir(c, elG, 400), dalga());
    await par(c.say('Işımanın ilerlemesi için maddesel ortam gerekmez.'), dalga());
    await par(c.say('Dalgalar elin yüzeyine çarpar ve enerjisini aktarır.'), c.tween(400, (e) => { parla.style.opacity = 0.35 * e; }, ease.out));
    await par(c.say('Eli ısınıyor; ısıtıcı, havasız odada ışımayla ısıtır.'), c.tween(2000, (e) => el.sutun(lerp(0.4, 0.68, e)), ease.out), belir(c, cevap, 300));
    await belir(c, kart, 300, 0.45);

    // Birlikte çöz: ısıtıcı kapanır, petek çalışır.
    c.clearSay();
    await par(belir(c, elG, 300, 0), kadrajGit(c, f, B, A, 900), c.tween(500, (e) => f.ayar({ isitici: 1 - e, petek: e }), ease.inOut));
    elG.remove();
    await belir(c, sag, 300, 0); sag.remove();
    const sag2 = c.S('g', {}, svg);
    kutu(c, sag2, 625, 40, 360, 230, { rx: 14, w: 3 });
    ['Petek odayı', 'konveksiyonla ısıtır.', 'Konveksiyon için', 'akışkan gerekir.'].forEach((s, i) => yazi(c, sag2, 805, 92 + i * 44, s, { size: 30, kalin: 700 }));
    gizle(sag2);
    await belir(c, sag2, 400);
    await c.choice(Object.assign({ tag: 'Birlikte çöz', q: 'Havası boşaltılmış odada petek odayı konveksiyonla ısıtabilir mi?', right: 'Evet. Hava yoksa konveksiyon oluşmaz.' },
      sec('Isıtamaz; hava yoktur, konveksiyon oluşmaz', [
        ['Isıtır; konveksiyon boşlukta da oluşur', 'Konveksiyonda tanecikler yer değiştirir; odada yer değiştirecek tanecik var mı?'],
        ['Isıtır; konveksiyon için akışkan gerekmez', 'Odanın havasının boşaltıldığını hatırla.']], 1)));
    const dY = yolOku(c, svg, f.yol('petekDongu'), GRI, { kalin: 5, kesikli: true, oran: 0 });
    const m = f.yol('petekDongu')[12];
    const carpi = c.S('g', {}, svg);
    cizgi(c, carpi, [m[0] - 14, m[1] - 14], [m[0] + 14, m[1] + 14], GRI, 6); cizgi(c, carpi, [m[0] - 14, m[1] + 14], [m[0] + 14, m[1] - 14], GRI, 6);
    gizle(carpi);
    await par(c.say('Havasız odada petek havayı dolaştıramaz.'), (async () => { await dY.git(c, 800); await belir(c, carpi, 300); })());
    await belir(c, sag2, 300, 0.45);
    await c.say('Petek havayı dolaştıramaz; ısıtıcı ise ışımayla ısıtır.');
    c.note('Havasız odada ışıma olur, konveksiyon olmaz. Örnek: elektrikli ısıtıcı.', 'Havasız oda');
  }

  /* ---- 9. Pencere açılınca ---- */
  async function pencereSahnesi(c) {
    const svg = c.svg(1000, 562);
    // Sağ sütunu olmayan sahne: figür tahtanın ortasına kurulur.
    const f = ODA.kur(c, svg, Object.assign({}, KUTU_ODA, { x: 205 }));
    f.ayar({ soba: 0, petek: 1, isitici: 0, pencere: 0, tavan: 32, taban: 26, hava: 1 });
    f.bak(ODA.kadraj.pencere);
    const sy = sayilar(c, svg, f);
    sy.guncelle();
    const dis = f.nokta('pencere.dis');
    const disYazi = yazi(c, svg, dis[0], dis[1], 'dışarı', { size: 30, kalin: 700, renk: AKI }); gizle(disYazi);
    const ustYol = f.yol('pencereUst'), altYol = f.yol('pencereAlt');
    const oU = yolOku(c, svg, ustYol, ISI, { kalin: 7, oran: 0 }), oA = yolOku(c, svg, altYol, AKI, { kalin: 7, oran: 0 });
    // Dışarısı: pencerenin dışında kalan yol parçalarını saran mavi, yarı saydam alan.
    const pu = f.nokta('pencere.ust'), pa = f.nokta('pencere.alt');
    const alan = c.S('polygon', { points: [pu, ustYol[7], altYol[0], pa].map((q) => q[0] + ',' + q[1]).join(' '), fill: AKI, 'fill-opacity': 0.26 }, svg);
    gizle(alan);

    await par(c.say('Dışarısı soğuk, içerisi sıcak; Ela pencereyi açıyor.'), belir(c, [alan, disYazi, ...sy.el], 400), c.tween(1200, (e) => f.ayar({ pencere: e }), ease.inOut));
    await par(c.say('Sıcak hava yoğunluğu az olduğu için yukarı çıkar.'), oU.git(c, 400, 0.35, ease.out));
    await par(c.say('Soğuk hava yoğunluğu fazla olduğu için aşağı iner.'), oA.git(c, 400, 0.35, ease.out));

    c.clearSay();
    await par(oU.git(c, 300, 0, ease.in), oA.git(c, 300, 0, ease.in));
    await c.choice(Object.assign({ tag: 'Sor', q: 'Pencere açılınca sıcak ve soğuk hava nasıl hareket eder?', right: 'Evet. Sıcak hava yükselip çıkar, soğuk hava inip girer.' },
      sec('Üstten sıcak hava çıkar, alttan soğuk hava girer', [
        ['Üstten soğuk hava girer, alttan sıcak hava çıkar', 'Sıcak hava yükselir; pencerenin hangi yarısından çıkar?'],
        ['Hava hareket etmez; ısı yalnızca camdan iletimle geçer', 'Soğuk hava iner; hangi yarıdan içeri girer?']], 0)));
    await par(c.say('Pencerenin üst yarısından sıcak hava dışarı çıkar.'), oU.git(c, 1600, 1));
    await par(c.say('Alt yarısından soğuk hava içeri girer.'), oA.git(c, 1600, 1));
    await c.say('Bu hava hareketi de konveksiyondur.');
    c.note('Sıcak hava üstten çıkar, soğuk hava alttan girer: konveksiyon.', 'Pencere');
  }

  /* ---- 10. Metal ve tahta bank ---- */
  async function bankSahnesi(c) {
    const svg0 = c.svg(1000, 562);
    const svg = c.S('g', { transform: 'translate(500,300) scale(1.12) translate(-500,-357)' }, svg0);
    const bank = (x, dolgu, kenar) => {
      const g = c.S('g', {}, svg);
      c.S('rect', { x: x + 20, y: 404, width: 20, height: 66, rx: 4, fill: dolgu, stroke: kenar, 'stroke-width': 3 }, g);
      c.S('rect', { x: x + 260, y: 404, width: 20, height: 66, rx: 4, fill: dolgu, stroke: kenar, 'stroke-width': 3 }, g);
      c.S('rect', { x, y: 378, width: 300, height: 26, rx: 6, fill: dolgu, stroke: kenar, 'stroke-width': 3 }, g);
      const cx = x + 150;
      c.S('rect', { x: cx - 46, y: 232, width: 92, height: 146, rx: 18, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
      c.S('circle', { cx, cy: 196, r: 28, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
      return g;
    };
    const metal = bank(100, '#b9c2da', '#6f7898'), tahta = bank(600, '#a9784a', '#6b4a2a');
    const mAd = yazi(c, svg, 250, 520, 'metal bank', { size: 30, kalin: 700 }), tAd = yazi(c, svg, 750, 520, 'tahta bank', { size: 30, kalin: 700 });
    const oklar = [250, 750].map((x) => yolOku(c, svg, [[x, 346], [x, 402]], ISI, { kalin: 7, oran: 0 }));
    const serit = [100, 600].flatMap((x) => [[x, 378, 300, 26], [x + 20, 404, 20, 66], [x + 260, 404, 20, 66]].map(([a, b, w, h]) => c.S('rect', { x: a, y: b, width: w, height: h, rx: 5, fill: ISI }, svg)));
    serit.forEach((q) => { q.style.opacity = 0; });
    gizle(metal, tahta, mAd, tAd);

    await par(c.say('Soğuk bir günde Ela metal bir banka oturuyor.'), belir(c, [metal, mAd], 400));
    await par(c.say('Arkadaşı da tahta bir banka oturuyor.'), belir(c, [tahta, tAd], 400));
    await par(c.say('İkisinin vücut ısısı da banka geçiyor.'), Promise.all(oklar.map((o) => o.git(c, 500, 1, ease.out))));
    await c.say('Bank katıdır; ısı bankın içinde tanecikten taneciğe ilerler.');

    await c.choice(Object.assign({ tag: 'Sor', q: 'Kişiden banka ısı hangi yolla aktarılır?', right: 'Evet. Bank katıdır; katıda ısı iletimle geçer.' },
      sec('İletim', [['Işıma', 'Bank katıdır; katıda ısı nasıl ilerler?'], ['Konveksiyon', 'Tanecikler yerinde titreşiyor; yer değiştirmiyor.']], 1)));
    await par(c.say('Hem metal hem tahta bankta ısı iletimle geçer.'), c.tween(700, (e) => serit.forEach((q) => { q.style.opacity = 0.45 * e; }), ease.out));
    await c.say('Hangi bankın daha çok üşüttüğünü sonraki derslerde inceleyeceğiz.');
    c.note('Katı bankta ısı iletimle geçer. Örnek: metal bank, tahta bank.', 'Bank');
  }

  /* ---- 11. Sera etkisi ---- */
  async function seraSahnesi(c) {
    const svg = c.svg(1000, 562);
    const zemin = c.S('g', {}, svg);
    const gun = c.S('circle', { cx: 110, cy: 100, r: 46, fill: ISI }, zemin);
    c.S('rect', { x: 40, y: 230, width: 920, height: 70, fill: AKI, 'fill-opacity': 0.22, stroke: AKI, 'stroke-width': 2 }, zemin);
    c.S('rect', { x: 40, y: 430, width: 920, height: 70, fill: '#2a3a66', 'fill-opacity': 0.6 }, zemin);
    const isinan = c.S('rect', { x: 40, y: 430, width: 920, height: 70, fill: ISI, 'fill-opacity': 0 }, zemin);
    const katman = c.S('g', {}, svg);
    const ok1 = yolOku(c, katman, [[165, 130], [430, 425]], ISI, { kalin: 7, oran: 0 });
    const ok2 = yolOku(c, katman, [[700, 425], [700, 305]], ISI, { kalin: 6, oran: 0 }); ok2.g.style.opacity = 0.75;
    const okA = yolOku(c, katman, [[700, 302], [700, 205]], ISI, { kalin: 6, oran: 0 }); okA.g.style.opacity = 0.5;
    const B = [];
    for (let i = 0; i <= 8; i++) { const t = i / 8; B.push([(1 - t) * (1 - t) * 722 + 2 * t * (1 - t) * 800 + t * t * 790, (1 - t) * (1 - t) * 302 + 2 * t * (1 - t) * 312 + t * t * 422]); }
    const okB = yolOku(c, katman, B, ISI, { kalin: 6, oran: 0 }); okB.g.style.opacity = 0.75;
    const e1 = yazi(c, svg, 290, 192, 'Güneş’ten gelen ışıma', { hiza: 'start', size: 26, kalin: 600 });
    const e2 = yazi(c, svg, 680, 405, 'yeryüzünün ışıması', { hiza: 'end', size: 26, kalin: 600 });
    const e3 = yazi(c, svg, 815, 360, 'tutulan kısım', { hiza: 'start', size: 26, kalin: 600 });
    const e4 = yazi(c, svg, 880, 272, 'atmosfer', { size: 26, kalin: 600, renk: RENK.soluk }), e5 = yazi(c, svg, 880, 472, 'yeryüzü', { size: 26, kalin: 600, renk: RENK.soluk });
    const e6 = yazi(c, svg, 850, 190, 'sera etkisi', { size: 30, kalin: 700 });
    const i1 = yazi(c, svg, 372, 335, 'ışıma', { hiza: 'start', size: 28, kalin: 700, renk: ISI }), i2 = yazi(c, svg, 676, 345, 'ışıma', { hiza: 'end', size: 28, kalin: 700, renk: ISI });
    const yazilar = [e1, e2, e3, e4, e5];
    gizle(zemin, e1, e2, e3, e4, e5, e6, i1, i2);
    const parlat = () => {
      const kopya = [[[165, 130], [430, 425]], [[700, 425], [700, 305]]].map((p) => yolOku(c, katman, p, ISI, { kalin: 18 }));
      kopya.forEach((k) => { k.g.style.opacity = 0.6; });
      return c.tween(500, (e) => kopya.forEach((k) => { k.g.style.opacity = 0.6 * (1 - e); }), ease.out).then(() => kopya.forEach((k) => k.g.remove()));
    };

    await par(c.say('Güneş’ten gelen ışıma atmosferden geçerek yeryüzüne ulaşır.'), belir(c, [zemin, e1, e4, e5], 400), ok1.git(c, 1400));
    await par(c.say('Yeryüzü bu enerjiyi alır ve ısınır.'), c.tween(700, (e) => isinan.setAttribute('fill-opacity', 0.3 * e), ease.out));
    await par(c.say('Her madde gibi yeryüzü de ışıma yapar.'), belir(c, e2, 300), ok2.git(c, 900));
    await par(c.say('Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını tutar.'), belir(c, e3, 300), (async () => { await okA.git(c, 600); await okB.git(c, 900); })());
    await par(c.say('Tutulan enerji, bir sera gibi atmosferde kalır.', { speak: '[short pause] Tutulan enerji, bir sera gibi atmosferde kalır.' }), c.tween(900, (e) => isinan.setAttribute('fill-opacity', lerp(0.3, 0.45, e)), ease.inOut));
    await par(c.say('Buna sera etkisi denir.'), belir(c, e6, 300));
    await c.say('Bu etki olmasaydı yeryüzü çok daha soğuk olurdu.');
    await c.say('Boşlukta yalnızca ışıma enerji getirir; iletim ve konveksiyon olmaz.');

    c.clearSay();
    await belir(c, [...yazilar, e6], 300, 0.45);
    await c.choice(Object.assign({ tag: 'Sor', q: 'Sera etkisi hangi ısı aktarım yoluyla ilişkilidir?', right: 'Evet. Enerji dalgalarla gelir ve atmosferde tutulur.' },
      sec('Işıma; enerji dalgalarla gelir ve atmosferde tutulur', [
        ['İletim; enerji tanecikten taneciğe geçer', 'Atmosferin tuttuğu şey bir dalga mı, tanecik mi?'],
        ['Konveksiyon; enerji yükselen havayla taşınır', 'Güneş ile yeryüzü arasında ısı neyle geçiyor?']], 0)));
    await par(c.say('Sera etkisi, ışımayla gelen enerjinin atmosferde tutulmasıyla ilgilidir.'), belir(c, [i1, i2], 300), parlat());
    c.note('Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını tutar: sera etkisi.', 'Sera etkisi');
  }

  /* ---- 12. Dene: yolu adlandır ---- */
  const KARTLAR = [
    { ust: 'Metal kaşığın sapının ısınması', ad: 'kaşık', kutu: 0, neden: 'Evet. Katıda ısı tanecikten taneciğe geçer.', ipucu: 'Kaşık katıdır; tanecikler yerinde titreşir.' },
    { ust: 'Pencere açılınca sıcak havanın üstten çıkması', ad: 'pencere', kutu: 1, neden: 'Evet. Hava akışkandır; sıcak hava yer değiştirir.', ipucu: 'Hava yer değiştiriyor; hangi yolda böyle?' },
    { ust: 'Güneş’in Dünya’yı ısıtması', ad: 'Güneş', kutu: 2, neden: 'Evet. Enerji boşlukta dalgalarla gelir.', ipucu: 'Arada madde yok; ısı neyle geçer?' },
    { ust: 'Tencerenin içindeki suyun ısınması', ad: 'tencere suyu', kutu: 1, neden: 'Evet. Sıcak su yükselir, soğuk su iner.', ipucu: 'Su akışkandır; tanecikleri yer değiştirir.' },
    { ust: 'Kamp ateşinin yanındaki kişinin ısınması', ad: 'kamp ateşi', kutu: 2, neden: 'Evet. Ateşin dalgaları ateşe dönük yüzeye çarpar.', ipucu: 'Ateşten Ela’ya geçen şey ne?' },
    { ust: 'Sıcak tuğla ocağa dokunan elin yanması', ad: 'tuğla ocak', kutu: 0, neden: 'Evet. Tuğla katıdır; ısı tanecikten taneciğe geçer.', ipucu: 'Tuğla da metal kaşık gibi katıdır.' },
    { ust: 'Soğuk banka oturan kişiden banka ısı geçmesi', ad: 'bank', kutu: 0, neden: 'Evet. Bank katıdır; ısı bankın içinde tanecikten taneciğe ilerler.', ipucu: 'Bank katıdır.' },
    { ust: 'Havası boşaltılmış odada elektrikli ısıtıcının eli ısıtması', ad: 'ısıtıcı', kutu: 2, neden: 'Evet. Havasız odada yalnızca dalgalar ilerler.', ipucu: 'Odada hava yok; hangi yolun maddesel ortama ihtiyacı yok?' },
  ];
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const AD = ['iletim', 'konveksiyon', 'ışıma'];
    const uk = ucKutu(c, svg, { adlar: AD, renkler: [RENK.cizgi, AKI, ISI], y: 50, h: 250, yazi: 32 });
    gizle(uk.g);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, svg);
      kutu(c, kart, 120, 345, 760, 130, { rx: 16 });
      iki(k.ust).forEach((s, j, a) => yazi(c, kart, 500, (a.length === 1 ? 420 : 400) + j * 40, s, { size: 32, kalin: 600 }));
      gizle(kart);
      await belir(c, kart, 350);
    };
    const yerlestir = async (k) => {
      const el = kart;
      await c.tween(400, (e) => { el.setAttribute('transform', donustur(500, 410, 1 - 0.4 * e)); el.style.opacity = 1 - e; }, ease.in);
      el.remove();
      const t = uk.yaz(k.kutu, k.ad);
      await belir(c, t, 300);
    };
    await par(c.say('Şimdi sekiz durumda ısı aktarım yolunu adlandıralım.'), belir(c, uk.g, 400));
    await c.say('Her biri için üç yoldan birini seç.');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: AD, kartlar: KARTLAR,
      soru: () => 'Bu durumda ısı hangi yolla aktarılıyor?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    await par(c.say('Aynı olay birden çok yolla da gerçekleşebilir; mum alevi böyleydi.'), c.tween(500, (e) => uk.g.setAttribute('transform', `translate(0,${130 * e})`), ease.inOut));
    await c.say('Isı üç yolla aktarılır: iletim, konveksiyon, ışıma.');
  }

  Ders.start({
    id: 'enerji-e2', kicker: 'Konu E · Isı aktarım yolları', title: 'Üç yol, üç ad', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Üç yol, üç ad',
      hook: 'Havası boşaltılmış bir odada elektrikli ısıtıcı odayı ısıtır mı; kalorifer peteği ısıtır mı?',
      button: 'Derse başla ›',
    },
    goals: ['Benzer durumları ısının ilerleme biçimine göre gruplar.', 'İletim, konveksiyon ve ışımayı tanımlar.', 'Günlük durumlarda ısı aktarım yolunu adlandırır.', 'Sera etkisini ışımayla ilişkilendirir.'],
    scenes: [
      { title: 'Hatırla', goal: 'Boşlukta ısının nasıl ilerlediğini ve ısının yönünü hatırla.', run: hatirla },
      { title: 'Benzerlere göre gruplayalım', goal: 'Isının ilerleme biçimi benzeyen durumları aynı gruba koy.', run: gruplar },
      { title: 'Üç yol, üç ad', goal: 'Üç gruba iletim, konveksiyon ve ışıma adlarını ver.', run: adlar },
      { title: 'Petek neden aşağıda?', goal: 'Konveksiyonun odayı nasıl ısıttığını gör.', run: petekSahnesi },
      { title: 'Mum alevine üstten ve yandan', goal: 'Aynı olayda birden çok yolu ayırt et.', run: mumSahnesi },
      { title: 'Kamp ateşi', goal: 'Işımanın yüzeyi nasıl ısıttığını gör.', run: kampSahnesi },
      { title: 'Koyu renk, açık renk', goal: 'Rengin ışımayı soğurmaya etkisini gör.', run: renkSahnesi },
      { title: 'Havası boşaltılmış oda', goal: 'Işıma ile konveksiyonu havasız odada karşılaştır.', run: havasizSahnesi },
      { title: 'Pencere açılınca', goal: 'Pencere aralığında sıcak ve soğuk havanın hareketini gör.', run: pencereSahnesi },
      { title: 'Metal ve tahta bank', goal: 'Katıda ısının iletimle geçtiğini gör.', run: bankSahnesi },
      { title: 'Sera etkisi', goal: 'Sera etkisini ışımayla ilişkilendir.', run: seraSahnesi },
      { title: 'Dene: yolu adlandır', goal: 'Sekiz durumda ısı aktarım yolunu seç.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını hiç tutmasaydı yeryüzü için ne söylenir?',
        options: ['Bugünkünden çok daha sıcak olurdu', 'Sıcaklığı hiç değişmezdi', 'Bugünkünden çok daha soğuk olurdu'], answer: 2,
        why: ['Tutulmayan ışıma uzaya gider; yeryüzü daha az enerji tutar.', 'Atmosferin tuttuğu enerji yeryüzünü ısıtıyor; tutmasa sıcaklık değişirdi.', 'Atmosferin tuttuğu enerji yeryüzünde kalır; tutmasaydı yeryüzü çok daha soğuk olurdu.'], scene: 10 },
      { q: 'Ocaktaki tencerenin metal sapı ısınıyor, içindeki su da ısınıyor. Hangisi doğrudur?',
        options: ['Sap iletimle, su konveksiyonla ısınır', 'Sap konveksiyonla, su iletimle ısınır', 'Sap da su da yalnızca ışımayla ısınır'], answer: 0,
        why: ['Sap katıdır, ısı tanecikten taneciğe geçer. Su akışkandır, sıcak su yükselir soğuk su iner.', 'Katıda tanecikler yer değiştirmez; sap iletimle ısınır.', 'Sapın ve suyun ısınmasında ısı maddenin içinden taneciklerle ilerler.'], scene: 2 },
      { q: '“Petekler tavana yakın konsa oda daha çabuk ısınır, çünkü sıcak hava yukarı çıkar.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; tavandaki petek bütün odayı ısıtır', 'Yanlıştır; zemine yakın petek, odadaki havanın tamamını dolaştırır', 'Doğrudur; ısı yalnızca yukarıya doğru yayılır'], answer: 1,
        why: ['Tavandaki petek yalnızca üst havayı dolaştırır; zemindeki hava ısınmaz.', 'Zemine yakın petek, ısınan havayı yükseltir ve soğuk havayı yerine çeker; havanın tamamı dolaşır.', 'Isı yalnızca yukarıya yayılmaz; zemindeki hava ısınmazsa oda ısınmaz.'], scene: 3 },
      { q: '“Havası boşaltılmış odada hiçbir ısıtıcı odayı ısıtamaz, çünkü ısı için hava gerekir.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; ısı her yolla yalnızca havada yayılır', 'Doğrudur; elektrikli ısıtıcı yalnızca konveksiyonla ısıtır', 'Yanlıştır; ışıma maddesel ortam gerektirmez, elektrikli ısıtıcı ısıtır'], answer: 2,
        why: ['Isı ışımayla boşlukta da ilerler; yalnızca havada yayılmaz.', 'Elektrikli ısıtıcı ışımayla ısıtır; havasız odada konveksiyon oluşmaz.', 'Isıtıcının yaydığı elektromanyetik dalgalar boşlukta ilerler ve eli ısıtır.'], scene: 7 },
      { q: 'Sıcak bir mutfağın kapısı serin balkona açılıyor. Kapı aralığında hava nasıl hareket eder?',
        options: ['Üstten sıcak hava balkona çıkar, alttan serin hava mutfağa girer', 'Üstten serin hava mutfağa girer, alttan sıcak hava balkona çıkar', 'Hava hareket etmez; ısı yalnızca kapıdan iletimle geçer'], answer: 0,
        why: ['Sıcak hava yükselip üstten çıkar, serin hava inip alttan girer.', 'Serin hava ağırdır; üstten değil alttan girer.', 'Hava akışkandır; hareket eder ve ısıyı konveksiyonla taşır.'], scene: 8 },
    ],
    summary: ['İletim tanecikten taneciğe, konveksiyon yer değiştiren taneciklerle, ışıma elektromanyetik dalgalarla olur.', 'İletim ve konveksiyonda maddesel ortam gerekir; ışımada gerekmez.', '<b>Isı üç yolla aktarılır: iletim, konveksiyon, ışıma.</b>'],
    nextLesson: { href: 'e3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
