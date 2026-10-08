/* E2 — Polar mı, apolar mı: molekülün bütününe bak
   Bir molekülün polar ya da apolar olduğuna elektronegatiflik farkı ve merkez atomdaki ortaklanmamış elektron çifti birlikte karar verir;
   sonuç dipol momentiyle söylenir: sıfırsa apolar, sıfırdan farklıysa polar.
   Senaryo: plan/kimya/cesitlilik/senaryolar/E-molekul-polarligi.md ("E2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Dipol momentinin sayısı, birimi ve oku yoktur; geometri adı ve bağ açısı yazılmaz. Gölge şematiktir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, gizle, belir, par, ok, sinifla } = window.KIT;
  const { EN, virgul, html, lewis, uzayDolgu, bag, dipolKutusu, siniflaTahtasi } = window.KIT_E;

  const enYazi = (c, p, x, y, s, size = 26) => renkli(c, p, x, y, [[s, RENK.soluk], '  ' + virgul(EN[s])], { size, kalin: 600 });
  /* Gizli kurulan model: kürelerle harfler hazır, gölge ve δ etiketleri ayrı belirir. */
  function model(c, p, ad, x, y, olcek, yog, delta) {
    const m = uzayDolgu(c, p, ad, x, y, { olcek, golge: yog, delta });
    gizle(m.g, m.golgeG, m.deltaG);
    return m;
  }
  /* Sıfır (gölge eşit) ve kutuplu (bir yanda yoğun) yoğunluk dizileri. */
  const ESIT = (n, d = 0.38) => Array(n).fill(d);
  const KUTUP = (n, i, yuksek = 0.75, dusuk = 0.14) => Array.from({ length: n }, (_, j) => (j === i ? yuksek : dusuk));

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const b = bag(c, svg, 500, 290, 'H', 'F');
    b.ayarla(0, 0, 0);
    const tA = enYazi(c, svg, b.xa, 478, 'H'), tB = enYazi(c, svg, b.xb, 478, 'F');
    const l = lewis(c, svg, 'H2O', 500, 280, { olcek: 1.9, merkez: 0, cerceve: 0 });
    gizle(b.hepsi, tA, tB, l.g);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, [...b.cekirdek, ...b.elektron, b.bulut, tA, tB], 600));
    await c.choice({
      tag: 'Hatırla', q: 'Elektronegatifliği farklı iki atomun bağında ortak elektronlar nerede daha yoğundur?',
      options: ['Küçük atomun çevresinde', 'Elektronegatifliği büyük atomun çevresinde', 'İki atomun ortasında eşit'], answer: 1,
      hints: ['Elektronegatifliği büyük atom ortak elektronları kendine çeker.', '', 'Elektronegatifliği büyük atom ortak elektronları kendine çeker.'],
      right: 'Evet. Elektronegatifliği büyük atom ortak elektronları kendine çeker.',
    });
    await par(belir(c, b.oklar, 400), b.git('H', 'F', 1000));
    await c.wait(500);
    c.clearSay();
    await belir(c, [...b.hepsi, tA, tB], 400, 0);
    await belir(c, l.g, 500);
    await c.choice({
      tag: 'Hatırla', q: 'Merkez atomdaki ortaklanmamış çiftler, bağ elektronlarını ne yapar?',
      options: ['Çeker', 'Etkilemez', 'İter'], answer: 2,
      hints: ['Ortaklanmamış çift bağ elektronlarını iter; molekül bükülür.', 'Ortaklanmamış çift bağ elektronlarını iter; molekül bükülür.', ''],
      right: 'Evet. Ortaklanmamış çift bağ elektronlarını iter.',
    });
    await c.say('Bugün bu iki bilgiyi molekülün bütününe uygulayacağız.', { speak: '[curious] Bugün bu iki bilgiyi molekülün bütününe uygulayacağız.' });
  }

  /* ---- 2. İki atomlu moleküller ---- */
  async function ikiAtomlu(c) {
    const svg = c.svg(1000, 562);
    const sol = c.S('g', {}, svg), sag = c.S('g', {}, svg);
    const mH = model(c, sol, 'H2', 260, 215, 2.4, ESIT(2));
    const kH = dipolKutusu(c, sol, 260, 410, 300, 'sıfır');
    const mF = model(c, sag, 'HF', 740, 215, 2.4, KUTUP(2, 1), [[0, '+', 'ust'], [1, '-', 'ust']]);
    const kF = dipolKutusu(c, sag, 740, 410, 300, 'sıfırdan farklı');
    gizle(kH.g, kF.g, kH.deger, kF.deger);

    await par(c.say('Önce H<sub>2</sub> molekülüne bakalım: iki atomun elektronegatifliği aynı.', { speak: 'Önce H iki molekülüne bakalım: iki atomun elektronegatifliği aynı.' }), belir(c, mH.g, 600));
    await par(c.say('Ortak elektronlar eşit çekilir; yük dağılımı dengelidir.'), belir(c, mH.golgeG, 700));
    await c.say('Molekülde kalıcı artı ya da eksi kutup oluşmaz.');
    await par(c.say('Molekülün kutupsallığının ölçüsüne dipol momenti denir.'), belir(c, kH.g, 500));
    await par(c.say('H<sub>2</sub>\'de kalıcı kutup yoktur: dipol momenti sıfırdır.', { speak: 'H iki\'de kalıcı kutup yoktur: dipol momenti sıfırdır.' }), belir(c, kH.deger, 500));
    await par(c.say('HF\'de elektronlar flor çevresinde daha yoğundur.', { speak: 'H F\'de elektronlar flor çevresinde daha yoğundur.' }),
      (sol.style.opacity = 1, belir(c, sol, 500, 0.3)), belir(c, mF.g, 600).then(() => belir(c, mF.golgeG, 700)));
    await par(c.say('Flor ucu kalıcı eksi, hidrojen ucu kalıcı artı kutuptur.'), belir(c, mF.deltaG, 500));
    await par(c.say('HF\'nin dipol momenti sıfırdan farklıdır.', { speak: 'H F\'nin dipol momenti sıfırdan farklıdır.' }), belir(c, [kF.g, kF.deger], 500));
    await c.say('Dipol momenti sıfırdan farklı molekül polar, sıfır olan apolardır.');
    await c.say('İki atomlu moleküllerde bağın polarlığı, molekülün polarlığıdır.');

    // Birlikte çöz: HCl.
    c.clearSay();
    await belir(c, [sol, sag], 500, 0);
    const mC = model(c, svg, 'HCl', 500, 200, 2.2, KUTUP(2, 1), [[0, '+', 'ust'], [1, '-', 'ust']]);
    const eA = enYazi(c, svg, 410, 352, 'Cl', 28), eB = enYazi(c, svg, 590, 352, 'H', 28);
    const s1 = yazi(c, svg, 500, 408, 'Fark var: elektronlar klor çevresinde yoğun', { size: 24, kalin: 600 });
    const s2 = yazi(c, svg, 500, 466, 'Dipol momenti: ?', { size: 30, kalin: 700, renk: RENK.vurgu });
    gizle(eA, eB, s1, s2);
    await par(c.say('Şimdi aynı düşünceyi hidrojen klorüre uygulayalım.'), belir(c, mC.g, 500).then(() => belir(c, mC.golgeG, 600)), belir(c, [eA, eB, s1, s2], 600));
    await c.choice({
      tag: 'Birlikte çöz', q: 'HCl molekülü için hangisi doğrudur?',
      options: ['Dipol momenti sıfır; apolar', 'Dipol momenti sıfır; polar', 'Dipol momenti sıfırdan farklı; polar'], answer: 2,
      hints: ['Elektronlar klor çevresinde yoğunsa kalıcı kutuplar oluşur.', 'Kalıcı kutup varsa dipol momenti sıfır olamaz.', ''],
      right: 'Evet. Kalıcı kutuplar var; dipol momenti sıfırdan farklı.',
    });
    s2.textContent = 'Dipol momenti: sıfırdan farklı';
    await par(c.say('HCl\'nin dipol momenti sıfırdan farklı: molekül polardır.', { speak: 'H Cl\'nin dipol momenti sıfırdan farklı: molekül polardır.' }), belir(c, mC.deltaG, 500));

    // Sor: O₂.
    c.clearSay();
    await belir(c, [mC.g, eA, eB, s1, s2], 500, 0);
    const mO = model(c, svg, 'O2', 500, 210, 2.6, ESIT(2));
    const sO = yazi(c, svg, 500, 430, 'dipol momenti: sıfır', { size: 30, kalin: 700, renk: RENK.vurgu });
    gizle(sO);
    await belir(c, mO.g, 600);
    await c.choice({
      tag: 'Sıra sende', q: `Oksijen molekülü (O<sub>2</sub>) polar mı, apolar mı?`,
      options: ['Polar; oksijen elektronegatif bir atomdur', 'Apolar; iki atom aynı, elektronlar eşit çekilir', 'Polar; molekül iki atomludur'], answer: 1,
      hints: ['İki atom da oksijen.', '', 'Eşit çekilirse kalıcı kutup oluşmaz.'],
      right: 'Evet. Elektronlar eşit çekilir; kalıcı kutup yok.',
    });
    await par(c.say('O<sub>2</sub>\'de kalıcı kutup yok: dipol momenti sıfır, molekül apolar.', { speak: 'O iki\'de kalıcı kutup yok: dipol momenti sıfır, molekül apolar.' }),
      belir(c, mO.golgeG, 700), belir(c, sO, 600));
  }

  /* ---- 3. Merkez atom ve ortaklanmamış çift ---- */
  async function merkezAtom(c) {
    const svg = c.svg(1000, 562);
    const X = [170, 500, 830], AD = ['CH4', 'NH3', 'H2O'], ETK = ['yok', '1 çift', '2 çift'];
    const YOG = [ESIT(5, 0.35), KUTUP(4, 0), KUTUP(3, 0)];
    const DLT = [[], [[0, '-', 'ust'], [1, '+', 'sol'], [2, '+', 'sag'], [3, '+', 'alt']], [[0, '-', 'ust'], [1, '+', 'sol'], [2, '+', 'sag']]];
    const baslik = yazi(c, svg, 500, 288, 'ortaklanmamış çift', { size: 22, kalin: 500, renk: RENK.soluk });
    const kol = AD.map((ad, i) => {
      const g = c.S('g', {}, svg);
      const L = lewis(c, g, ad, X[i], 150, { olcek: 1.05, merkez: 0, cerceve: i > 0 ? 0 : undefined });
      const et = yazi(c, g, X[i], 326, ETK[i], { size: 30, kalin: 700, renk: RENK.vurgu });
      const m = model(c, svg, ad, X[i], 445, 1.0, YOG[i], DLT[i]);
      gizle(L.halka, L.cerceveler, et);
      return { g, L, et, m };
    });
    const [ch, nh, oh] = kol;
    gizle(baslik, kol.map((k) => k.g));
    const odak = (i, ms = 400) => par(...kol.map((k, j) => belir(c, k.g, ms, i < 0 || i === j ? 1 : 0.12)));
    // H₂O'da itme okları: ortaklanmamış çiftlerden bağ çiftlerine.
    const itme = c.S('g', {}, svg);
    const P = oh.L.P[0];
    [[-9, -26, -34, -8], [9, -26, 34, -8], [-9, 26, -34, 8], [9, 26, 34, 8]].forEach(([a, b, x2, y2]) => ok(c, itme, [P[0] + a, P[1] + b], [P[0] + x2, P[1] + y2], RENK.itme, 3.5));
    gizle(itme);

    await par(c.say('Üç ya da daha çok atomlu moleküllerde bir merkez atom vardır.'), belir(c, kol.map((k) => k.g), 600));
    await par(c.say('Merkez atom, öteki atomların bağlandığı atomdur.'), belir(c, kol.map((k) => k.L.halka), 500));
    await par(c.say('CH<sub>4</sub>\'te merkez atom karbondur; ortaklanmamış çifti yoktur.', { speak: 'C H dörtte merkez atom karbondur; ortaklanmamış çifti yoktur.' }), belir(c, [baslik, ch.et], 500));
    await par(c.say('NH<sub>3</sub>\'te merkez atom azottur; bir ortaklanmamış çifti vardır.', { speak: 'N H üçte merkez atom azottur; bir ortaklanmamış çifti vardır.' }), belir(c, [nh.et, ...nh.L.cerceveler], 500));
    await par(c.say('H<sub>2</sub>O\'da merkez atom oksijendir; iki ortaklanmamış çifti vardır.', { speak: 'H iki O\'da merkez atom oksijendir; iki ortaklanmamış çifti vardır.' }), belir(c, [oh.et, ...oh.L.cerceveler], 500));

    // H₂O: itme, dengesiz yük, kutuplar.
    await par(c.say('Merkez atomdaki ortaklanmamış çiftler, bağ elektronlarını iter.'), odak(2), belir(c, itme, 600));
    await par(c.say('Yük dağılımı dengede değildir; kalıcı kutuplar oluşur.'), belir(c, oh.m.g, 600).then(() => belir(c, oh.m.golgeG, 700)));
    await par(c.say('Su molekülünde oksijen ucu eksi, hidrojen uçları artıdır.'), belir(c, oh.m.deltaG, 500));
    await c.say('Dipol momenti sıfırdan farklıdır; su molekülü polardır.');

    // CH₄: çift yok, yük dengede.
    await par(c.say('CH<sub>4</sub>\'te merkez atomda ortaklanmamış çift yoktur.', { speak: 'C H dörtte merkez atomda ortaklanmamış çift yoktur.' }),
      par(belir(c, [oh.m.g, itme], 400, 0), odak(0)).then(() => belir(c, ch.m.g, 600)));
    await par(c.say('Yük dağılımı dengededir; dipol momenti sıfırdır.'), belir(c, ch.m.golgeG, 700));
    const n1 = yazi(c, svg, 700, 430, 'C–H bağları polar', { size: 26, kalin: 600 }), n2 = yazi(c, svg, 700, 480, 'dipol momenti sıfır', { size: 26, kalin: 700, renk: RENK.vurgu });
    gizle(n1, n2);
    await par(c.say('CH<sub>4</sub> apolar bir moleküldür.', { speak: 'C H dört apolar bir moleküldür.' }), belir(c, [n1, n2], 600));

    // Birlikte çöz: NH₃.
    c.clearSay();
    await par(belir(c, [ch.m.g, n1, n2], 400, 0), odak(1));
    const yd = yazi(c, svg, 500, 440, 'Yük dağılımı: ?', { size: 30, kalin: 700, renk: RENK.vurgu });
    gizle(yd); await belir(c, yd, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: `NH<sub>3</sub>'te yük dağılımı nasıldır?`,
      options: ['Dengede; dipol momenti sıfır', 'Dengede değil; dipol momenti sıfırdan farklı', 'Dengede; dipol momenti sıfırdan farklı'], answer: 1,
      hints: ['Merkez atomda ortaklanmamış çift var.', '', 'Çift bağ elektronlarını iter.'],
      right: 'Evet. Çift bağ elektronlarını iter; yük dağılımı dengede değil.',
    });
    await belir(c, yd, 300, 0);
    await par(c.say('NH<sub>3</sub> polardır: azotta bir ortaklanmamış çift var.', { speak: 'N H üç polardır: azotta bir ortaklanmamış çift var.' }),
      belir(c, nh.m.g, 600).then(() => belir(c, nh.m.golgeG, 700)).then(() => belir(c, nh.m.deltaG, 500)));

    // Sor: H₂S.
    c.clearSay();
    await par(belir(c, nh.m.g, 400, 0), belir(c, kol.map((k) => k.g), 400, 0), belir(c, baslik, 400, 0));
    const s = lewis(c, svg, 'H2S', 500, 230, { olcek: 1.9, merkez: 0, cerceve: 0 });
    gizle(s.g); await belir(c, s.g, 500);
    await c.choice({
      tag: 'Sıra sende', q: `H<sub>2</sub>S'de merkez atom kükürttür ve iki ortaklanmamış çifti vardır. Molekül polar mı, apolar mı?`,
      options: ['Apolar; hidrojenler aynı', 'Apolar; merkez atomda ortaklanmamış çift var', 'Polar; merkez atomda ortaklanmamış çift var'], answer: 2,
      hints: ['Önce merkez atomun çiftine bak.', 'Çiftli merkez atom yük dağılımını bozar.', ''],
      right: 'Evet. Merkez atomda ortaklanmamış çift var; molekül polar.',
    });
    await c.say('H<sub>2</sub>S\'de de merkez atom çiftli: molekül polardır.', { speak: 'H iki S\'de de merkez atom çiftli: molekül polardır.' });
  }

  /* ---- 4. İki ölçüt: tablodaki sekiz molekül ---- */
  async function ikiOlcut(c) {
    const svg = c.svg(1000, 562);
    const W = 230, YB = 290, HB = 250, XB = [15, 261, 507, 753];
    const BAS = [['Fark yok'], ['merkez atom', 'yok'], ['ortaklanmamış', 'çift yok'], ['ortaklanmamış', 'çift var']];
    const SONUC = ['apolar', 'polar', 'apolar', 'polar'];
    const st = siniflaTahtasi(c, svg, {
      kutular: XB.map((x) => ({ x, y: YB, w: W, h: HB, kol: 2, ust: 84 })),
      kart: { x: 330, y: 150 }, chipPunto: 28,
      ciz: (k, g) => { const m = uzayDolgu(c, g, k.ad, 640, 140, { olcek: 1.1 }); },
    });
    const basG = BAS.map((satir, i) => { const g = c.S('g', {}, svg); satir.forEach((t, j) => yazi(c, g, XB[i] + W / 2, YB + HB - 44 + j * 26, t, { size: 21, kalin: 700 })); return g; });
    const sonG = SONUC.map((t, i) => yazi(c, svg, XB[i] + W / 2, YB + 40, t, { size: 26, kalin: 700, renk: RENK.vurgu }));
    const yay = c.S('g', {}, svg);
    cizgi(c, yay, [XB[1] + 6, 246], [XB[3] + W - 6, 246], RENK.ince, 3);
    yazi(c, yay, XB[3] + W - 6, 234, 'Fark var', { hiza: 'end', size: 24, kalin: 700, renk: RENK.soluk });
    gizle(st.kutularEl.map((e) => e.g), basG, sonG, yay);

    await par(c.say('Bir molekülün polarlığına iki ölçüt birlikte karar verir.'), belir(c, st.kutularEl.map((e) => e.g), 600));
    await par(c.say('Birinci ölçüt: bağda elektronegatiflik farkı var mı?'), belir(c, [basG[0], yay], 500));
    await par(c.say('Fark yoksa elektronlar eşit çekilir; molekül apolardır.'), belir(c, sonG[0], 500));
    await par(c.say('İkinci ölçüt: merkez atomda ortaklanmamış çift var mı?'), belir(c, [basG[2], basG[3]], 500));
    await par(c.say('Fark varsa ve merkez atom yoksa molekül polardır.'), belir(c, [basG[1], sonG[1]], 500));
    await par(c.say('Fark varsa, merkez atomda çift varsa molekül polardır.'), belir(c, sonG[3], 500));
    await par(c.say('Fark varsa ama merkez atomda çift yoksa molekül apolardır.'), belir(c, sonG[2], 500));
    c.clearSay();
    await belir(c, sonG, 400, 0);

    const KART = [
      { ad: 'H2', kutu: 0, neden: 'Aynı elementin atomları; elektronlar eşit çekilir.' },
      { ad: 'F2', kutu: 0, neden: 'Aynı elementin atomları; elektronlar eşit çekilir.' },
      { ad: 'N2', kutu: 0, neden: 'Aynı elementin atomları; elektronlar eşit çekilir.' },
      { ad: 'O2', kutu: 0, neden: 'Aynı elementin atomları; elektronlar eşit çekilir.' },
      { ad: 'HF', kutu: 1, neden: 'İki atomlu; merkez atom yok.' },
      { ad: 'CH4', kutu: 2, neden: 'Merkez karbonda ortaklanmamış çift yok.' },
      { ad: 'NH3', kutu: 3, neden: 'Merkez atomda ortaklanmamış çift var.' },
      { ad: 'H2O', kutu: 3, neden: 'Merkez atomda ortaklanmamış çift var.' },
    ];
    KART.forEach((k) => { k.f = window.KIT_E.FORM[k.ad]; k.html = html(k.ad); k.ipucu = 'Önce bağda fark var mı, sonra merkez atomda çift var mı diye bak.'; });
    await sinifla(c, {
      tag: 'Dene', kutular: ['Fark yok', 'Fark var, merkez atom yok', 'Fark var, merkez atomda çift yok', 'Fark var, merkez atomda çift var'], kartlar: KART,
      soru: (k) => `<b>${k.html}</b> molekülü hangi kutuya girer?`,
      sec: (i, k) => st.sec(i, k), yerlestir: (i, k) => st.yerlestir(i, k),
    });
    await par(c.say('Ayrıştırma bitti: sekiz molekül dört kutuya dağıldı.'), belir(c, sonG, 600));
  }

  /* ---- 5. Dipol momentine göre grupla, adlandır ---- */
  async function dipolGrup(c) {
    const svg = c.svg(1000, 562);
    const YOG = { H2: ESIT(2), F2: ESIT(2), N2: ESIT(2), O2: ESIT(2), CH4: ESIT(5, 0.35), HF: KUTUP(2, 1), NH3: KUTUP(4, 0), H2O: KUTUP(3, 0) };
    const st = siniflaTahtasi(c, svg, {
      kutular: [{ x: 30, y: 280, w: 455, h: 260, baslik: 'Dipol momenti sıfır', kol: 4, ust: 84 }, { x: 515, y: 280, w: 455, h: 260, baslik: 'Dipol momenti sıfırdan farklı', kol: 4, ust: 84 }],
      kart: { x: 330, y: 150 }, chipPunto: 28,
      ciz: (k, g) => { uzayDolgu(c, g, k.ad, 640, 140, { olcek: 1.1, golge: YOG[k.ad] }); },
    });
    const et = [yazi(c, svg, 257, 314, 'apolar molekül', { size: 26, kalin: 700, renk: RENK.vurgu }), yazi(c, svg, 742, 314, 'polar molekül', { size: 26, kalin: 700, renk: RENK.vurgu })];
    gizle(st.kutularEl.map((e) => e.g), et);
    const KART = [
      { ad: 'H2', kutu: 0, neden: 'Bağ apolar; elektronlar eşit çekilir.' }, { ad: 'F2', kutu: 0, neden: 'Bağ apolar; elektronlar eşit çekilir.' },
      { ad: 'N2', kutu: 0, neden: 'Bağ apolar; elektronlar eşit çekilir.' }, { ad: 'O2', kutu: 0, neden: 'Bağ apolar; elektronlar eşit çekilir.' },
      { ad: 'CH4', kutu: 0, neden: 'Bağlar polar ama merkez atomda çift yok; yük dağılımı dengede.' },
      { ad: 'HF', kutu: 1, neden: 'Elektronlar flora yığılır; kalıcı kutuplar var.' },
      { ad: 'NH3', kutu: 1, neden: 'Merkez atomdaki çift yük dağılımını bozar.' }, { ad: 'H2O', kutu: 1, neden: 'Merkez atomdaki çift yük dağılımını bozar.' },
    ];
    KART.forEach((k) => { k.f = window.KIT_E.FORM[k.ad]; k.html = html(k.ad); k.ipucu = 'Gölgeye bak: bir yanda yığılıyor mu, her yerde eşit mi?'; });

    await par(c.say('Sekiz molekülü dipol momentine göre iki gruba ayıralım.'), belir(c, st.kutularEl.map((e) => e.g), 600));
    await c.say('Kalıcı kutbu olmayanların dipol momenti sıfırdır.');
    await c.say('Kalıcı kutbu olanların dipol momenti sıfırdan farklıdır.');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: ['Dipol momenti sıfır', 'Dipol momenti sıfırdan farklı'], kartlar: KART,
      soru: (k) => `<b>${k.html}</b> molekülünün dipol momenti nasıldır?`,
      sec: (i, k) => st.sec(i, k), yerlestir: (i, k) => st.yerlestir(i, k),
    });
    await par(c.say('Sıfır olanlar apolar, sıfırdan farklı olanlar polar moleküldür.'), belir(c, et, 600));
    c.note('<b>Dipol momenti sıfır: apolar. Sıfırdan farklı: polar.</b> Örnek: CH<sub>4</sub> apolar, H<sub>2</sub>O polar.', 'Polar ve apolar molekül', 'polar-apolar-molekul');
  }

  /* ---- 6. Bağlar polar, molekül apolar ---- */
  async function baglarPolar(c) {
    const svg = c.svg(1000, 562);
    const L = lewis(c, svg, 'CO2', 270, 215, { olcek: 1.6, merkez: 0 });
    const m = model(c, svg, 'CO2', 740, 215, 1.7, ESIT(3));
    const en = [enYazi(c, svg, 200, 410, 'C', 28), enYazi(c, svg, 340, 410, 'O', 28)];
    const dm = yazi(c, svg, 740, 380, 'dipol momenti sıfır', { size: 28, kalin: 700, renk: RENK.vurgu });
    const son = yazi(c, svg, 500, 470, 'bağlar polar, molekül apolar', { size: 30, kalin: 700 });
    gizle(L.g, en, dm, son); gizle(L.halka);

    await par(c.say('CO<sub>2</sub>\'de karbon–oksijen bağları polardır; elektronegatiflikleri farklıdır.', { speak: 'C O iki\'de karbon–oksijen bağları polardır; elektronegatiflikleri farklıdır.' }), belir(c, [L.g, ...en], 600));
    await par(c.say('Merkez atom karbondur; üzerinde ortaklanmamış çift yoktur.'), belir(c, L.halka, 500));
    L.cift[1].style.opacity = 1; L.cift[2].style.opacity = 1;
    await par(c.say('Oksijenlerdeki çiftler merkez atomda olmadığı için sayılmaz.'), belir(c, [L.cift[1], L.cift[2]], 600, 0.3));
    await par(c.say('Yük dağılımı dengededir; dipol momenti sıfırdır.'), belir(c, m.g, 600).then(() => belir(c, m.golgeG, 700)), belir(c, dm, 600));
    await par(c.say('Bağlar polar olsa da CO<sub>2</sub> molekülü apolardır.', { speak: 'Bağlar polar olsa da C O iki molekülü apolardır.' }), belir(c, son, 600));

    // Sor: CCl₄.
    c.clearSay();
    await belir(c, [L.g, ...en, m.g, dm, son], 500, 0);
    const L2 = lewis(c, svg, 'CCl4', 270, 225, { olcek: 1.25, merkez: 0, soluk: [1, 2, 3, 4] });
    const en2 = [enYazi(c, svg, 200, 450, 'C', 26), enYazi(c, svg, 340, 450, 'Cl', 26)];
    const m2 = model(c, svg, 'CCl4', 740, 225, 1.25, ESIT(5));
    const dm2 = yazi(c, svg, 740, 440, 'dipol momenti sıfır', { size: 28, kalin: 700, renk: RENK.vurgu });
    gizle(L2.g, en2, dm2);
    await belir(c, [L2.g, ...en2], 600);
    await c.choice({
      tag: 'Sıra sende', q: `CCl<sub>4</sub> molekülü polar mı, apolar mı?`,
      options: ['Polar; C–Cl bağları polar', 'Polar; klor atomlarında ortaklanmamış çift var', 'Apolar; merkez karbonda ortaklanmamış çift yok'], answer: 2,
      hints: ['Ortaklanmamış çifti merkez atomda ara.', 'Klorların çiftleri merkezde değil.', ''],
      right: 'Evet. Merkez karbonda ortaklanmamış çift yok; yük dağılımı dengede.',
    });
    await par(c.say('Polar bağlı bir molekül yine de apolar olabilir.'), belir(c, m2.g, 600).then(() => belir(c, m2.golgeG, 700)), belir(c, dm2, 600));
  }

  /* ---- 7. Yeni moleküllerde dene ---- */
  async function yeniMolekuller(c) {
    const svg = c.svg(1000, 562);
    const ENS = ['B', 'C', 'N', 'O', 'F', 'P', 'S', 'Cl', 'H'];
    const tablo = window.KIT_E.enSatiri(c, svg, ENS, 70, 26, 107, { size: 20 });
    const st = siniflaTahtasi(c, svg, {
      kutular: [{ x: 30, y: 290, w: 455, h: 250, baslik: 'apolar molekül', kol: 4 }, { x: 515, y: 290, w: 455, h: 250, baslik: 'polar molekül', kol: 4 }],
      kart: { x: 170, y: 150 }, chipPunto: 28,
      ciz: (k, g) => {
        lewis(c, g, k.ad, 440, 150, { olcek: 0.62, merkez: 0, cerceve: 0, soluk: [1, 2, 3, 4] });
        uzayDolgu(c, g, k.ad, 790, 150, { olcek: 0.8 });
      },
    });
    gizle(tablo.g, st.kutularEl.map((e) => e.g));
    const KART = [
      { ad: 'CCl4', ats: ['C', 'Cl'], kutu: 0, neden: 'Merkez karbonda çift yok.' },
      { ad: 'NCl3', ats: ['N', 'Cl'], kutu: 1, neden: 'Merkez azotta bir çift var.' },
      { ad: 'CO2', ats: ['C', 'O'], kutu: 0, neden: 'Merkez karbonda çift yok; oksijenlerinki sayılmaz.' },
      { ad: 'BH3', ats: ['B', 'H'], kutu: 0, neden: 'Merkez bordan çift yok.' },
      { ad: 'H2S', ats: ['H', 'S'], kutu: 1, neden: 'Merkez kükürtte iki çift var.' },
      { ad: 'PF3', ats: ['P', 'F'], kutu: 1, neden: 'Merkez fosforda bir çift var.' },
      { ad: 'CF4', ats: ['C', 'F'], kutu: 0, neden: 'Merkez karbonda çift yok.' },
    ];
    KART.forEach((k) => { k.f = window.KIT_E.FORM[k.ad]; k.html = html(k.ad); k.ipucu = 'Merkez atomu bul, sonra onun ortaklanmamış çiftine bak.'; });

    await par(c.say('Önce merkez atomu bul, sonra ortaklanmamış çiftine bak.'), belir(c, [tablo.g, ...st.kutularEl.map((e) => e.g)], 600));
    await sinifla(c, {
      tag: 'Dene', kutular: ['apolar molekül', 'polar molekül'], kartlar: KART,
      soru: (k) => `<b>${k.html}</b> molekülü polar mı, apolar mı?`,
      sec: async (i, k) => { await tablo.vurgula(k.ats, 300); await st.sec(i, k); },
      yerlestir: async (i, k) => { await par(st.yerlestir(i, k), tablo.vurgula([], 300)); },
    });
    await c.say('Merkez atomda çift varsa polar, yoksa apolar çıktı.');
  }

  Ders.start({
    id: 'cesitlilik-e2', kicker: 'Konu E · Molekül polarlığı', title: 'Polar mı, apolar mı: molekülün bütününe bak', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Polar mı, apolar mı: molekülün bütününe bak',
      hook: 'Bağlarının hepsi polar olan bir molekül, bütün olarak apolar olabilir mi?',
      button: 'Derse başla ›',
    },
    goals: ['Dipol momentini molekülün kutupsallığının ölçüsü olarak açıklar.', 'Elektronegatiflik farkı ve merkez atomdaki ortaklanmamış çift ölçütlerini birlikte uygular.', 'Molekülleri dipol momentine göre gruplar ve polar ya da apolar olarak adlandırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Elektronların kaymasını ve ortaklanmamış çiftin itmesini hatırla.', run: hatirla },
      { title: 'İki atomlu moleküller', goal: 'İki atomlu moleküllerde dipol momentini bağdan oku.', run: ikiAtomlu },
      { title: 'Merkez atom ve ortaklanmamış çift', goal: 'Merkez atomdaki çiftin yük dağılımını nasıl bozduğunu gör.', run: merkezAtom },
      { title: 'İki ölçüt: tablodaki sekiz molekül', goal: 'Molekülleri iki ölçüte göre dört kutuya ayır.', run: ikiOlcut },
      { title: 'Dipol momentine göre grupla, adlandır', goal: 'Molekülleri dipol momentine göre gruplayıp adlandır.', run: dipolGrup },
      { title: 'Bağlar polar, molekül apolar', goal: 'Polar bağlı bir molekülün apolar olabildiğini gör.', run: baglarPolar },
      { title: 'Yeni moleküllerde dene', goal: 'İki ölçütü yeni moleküllere uygula.', run: yeniMolekuller },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangi molekülün dipol momenti sıfırdır?',
        options: ['HCl', 'NH<sub>3</sub>', 'Cl<sub>2</sub>'], answer: 2,
        why: ['Elektronlar klor çevresinde yoğundur; kalıcı kutuplar var, dipol momenti sıfırdan farklı.', 'Merkez azotta ortaklanmamış çift var; yük dağılımı dengede değil.', 'İki klor atomu elektronları eşit çeker; kalıcı kutup yok, dipol momenti sıfır.'], scene: 1 },
      { q: 'CF<sub>4</sub>\'te karbon–flor bağları polardır (C 2,55 · F 4,00); merkez karbonda ortaklanmamış çift yoktur. CF<sub>4</sub> için hangisi doğrudur?',
        options: ['Bağlar polardır ama molekül apolardır', 'Bağlar polar olduğu için molekül polardır', 'Bağlar apolar olduğu için molekül apolardır'], answer: 0,
        why: ['Merkez atomda çift yok; yük dağılımı dengede, dipol momenti sıfır.', 'Bağların polar olması molekülü tek başına polar yapmaz; merkez atomdaki çifte de bakılır.', 'C–F bağlarında elektronegatiflik farkı var; bağlar apolar değil.'], scene: 5 },
      { q: 'PF<sub>3</sub>\'ün merkez atomu fosfordur ve bir ortaklanmamış çifti vardır. Molekül için hangisi doğrudur?',
        options: ['Apolar; merkez atomda ortaklanmamış çift var', 'Polar; merkez atomda ortaklanmamış çift var', 'Apolar; flor atomlarında ortaklanmamış çift var'], answer: 1,
        why: ['Merkez atomdaki çift yük dağılımını bozar; molekül apolar olamaz.', 'Merkez fosforda çift var; yük dağılımı dengede değil, molekül polar.', 'Flor atomlarındaki çiftler merkez atomda olmadığı için sayılmaz.'], scene: 2 },
      { q: 'BH<sub>3</sub> molekülünde bor merkez atomdur ve çevresinde ortaklanmamış çift yoktur. Molekül için hangisi doğrudur?',
        options: ['Polar; molekülde üç hidrojen var', 'Apolar; merkez atomda ortaklanmamış çift yok', 'Polar; bor ile hidrojenin elektronegatifliği farklı'], answer: 1,
        why: ['Atom sayısı polarlığı belirlemez.', 'Merkez atomda çift yok; yük dağılımı dengede, dipol momenti sıfır.', 'Fark var, ama merkez atomda çift yoksa molekül apolardır.'], scene: 5 },
      { q: 'NCl<sub>3</sub> ve CCl<sub>4</sub> moleküllerinden hangisi polardır?',
        options: ['NCl<sub>3</sub>', 'CCl<sub>4</sub>', 'İkisi de'], answer: 0,
        why: ['NCl<sub>3</sub>\'te merkez azotta ortaklanmamış çift var; molekül polar.', 'CCl<sub>4</sub>\'te merkez karbonda çift yok; molekül apolar.', 'Biri polar, öteki apolar: ikisinin merkez atomları farklı.'], scene: 6 },
    ],
    summary: ['Dipol momenti molekülün kutupsallığının ölçüsüdür.', 'İki atomlu molekülde bağın polarlığı belirler.', 'Merkez atomda ortaklanmamış çift varsa molekül polar, yoksa apolardır.', '<b>Dipol momenti olan molekül polardır, olmayan apolardır.</b>'],
    nextLesson: { href: 'e3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
