/* E1 — Elektronegatiflik farkı: elektronlar eşit paylaşılmaz
   Aynı atomlar ortak elektronları eşit çeker (apolar kovalent bağ); elektronegatifliği farklı atomlarda elektronlar büyük atomun
   çevresinde yoğunlaşır (polar kovalent bağ, δ⁺ ve δ⁻). Fark büyüdükçe polarlık artar.
   Senaryo: plan/kimya/cesitlilik/senaryolar/E-molekul-polarligi.md ("E1"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Bu ders bağa bakar; molekülün bütününün polarlığı E2'dedir. Halat, bulut ve ok şematiktir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, gizle, belir, par, parcaKoy, sinifla } = window.KIT;
  const { EN, virgul, fark, html, lewis, bag, halat, enSatiri, siniflaTahtasi } = window.KIT_E;

  /* "H  2,20" gibi, simgesi soluk, değeri açık yazı. */
  const enYazi = (c, p, x, y, s, size = 26) => renkli(c, p, x, y, [[s, RENK.soluk], '  ' + virgul(EN[s])], { size, kalin: 600 });

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const l = lewis(c, svg, 'H2O', 500, 280, { olcek: 1.9, merkez: 0, cerceve: 0 });
    const b = bag(c, svg, 500, 300, 'H', 'H', { deltaY: 120 });
    gizle(l.g, b.hepsi);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, l.g, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Merkez atomdaki ortaklanmamış çift, bağ elektronlarına ne yapar?',
      options: ['Çeker', 'İter', 'Etkilemez'], answer: 1,
      hints: ['Ortaklanmamış çift bağ elektronlarını iter; molekül bükülür.', '', 'Ortaklanmamış çift bağ elektronlarını iter; molekül bükülür.'],
      right: 'Evet. Ortaklanmamış çift bağ elektronlarını iter.',
    });
    c.clearSay();
    await belir(c, l.g, 400, 0);
    await belir(c, b.hepsi.filter((e) => e !== b.dA && e !== b.dB), 500);
    await c.choice({
      tag: 'Hatırla', q: 'Kovalent bağda iki çekirdek, ortak elektronlara ne yapar?',
      options: ['Yalnızca biri çeker', 'İkisi de iter', 'İkisi de çeker'], answer: 2,
      hints: ['İki çekirdek de ortak elektronları çeker; bağ budur.', 'İki çekirdek de ortak elektronları çeker; bağ budur.', ''],
      right: 'Evet. İki çekirdek de ortak elektronları çeker.',
    });
    await c.say('Bugün bu çekişin her zaman eşit olup olmadığına bakacağız.', { speak: '[curious] Bugün bu çekişin her zaman eşit olup olmadığına bakacağız.' });
  }

  /* ---- 2. Aynı atomlar: ortak elektronlar ortada ---- */
  async function ayniAtomlar(c) {
    const svg = c.svg(1000, 562);
    const ip = halat(c, svg, 235, 300, 1, 1);
    const b = bag(c, svg, 715, 290, 'H', 'H');
    b.ayarla(0, 0, 0);
    const tA = enYazi(c, svg, b.xa, 478, 'H'), tB = enYazi(c, svg, b.xb, 478, 'H');
    const etiket = yazi(c, svg, 715, 535, 'apolar kovalent bağ', { size: 28, kalin: 700, renk: RENK.vurgu });
    gizle(ip.g, b.hepsi, tA, tB, etiket);
    const hH = [...b.cekirdek, ...b.elektron];

    await par(c.say('Bir bağda iki atom, ortak elektronları halat çeker gibi çeker.'), belir(c, ip.g, 600));
    await par(c.say('Bir atomun bağ elektronlarını çekme gücüne elektronegatiflik denir.'), belir(c, hH, 600));
    await par(c.say('Hidrojenin elektronegatifliği 2,20\'dir.', { speak: 'Hidrojenin elektronegatifliği iki virgül yirmidir.' }), belir(c, tA, 450));
    await par(c.say('İki hidrojen atomunun elektronegatifliği aynıdır.'), belir(c, tB, 450));
    await par(c.say('Aynı elementin atomlarının elektronegatifliği hep aynıdır.'),
      c.tween(900, (e) => { const s = 26 + 6 * Math.sin(Math.PI * e); tA.setAttribute('font-size', s); tB.setAttribute('font-size', s); }));
    await par(c.say('İkisi de ortak elektronları eşit kuvvetle çeker.'), belir(c, b.oklar, 400), b.git('H', 'H', 800));
    await par(c.say('Elektronlar iki çekirdeğin çevresinde eşit zaman geçirir.'), belir(c, b.bulut, 700));
    await c.say('Yük dağılımı dengelidir; elektronlar bir tarafa yığılmaz.');
    await par(c.say('Elektronegatifliği aynı atomların bağına apolar kovalent bağ denir.'), belir(c, etiket, 500));
    await c.say('Hidrojen, azot, oksijen ve klor moleküllerindeki bağlar böyledir.');

    // Sor: oksijen molekülü.
    c.clearSay();
    await par(belir(c, etiket, 350, 0), b.git('O', 'O', 700));
    parcaKoy(c, tA, [['O', RENK.soluk], '  ' + virgul(EN.O)]); parcaKoy(c, tB, [['O', RENK.soluk], '  ' + virgul(EN.O)]);
    await c.choice({
      tag: 'Sıra sende', q: 'Oksijen molekülünde iki oksijen atomu ortak elektronları nasıl çeker?',
      options: ['Biri daha kuvvetle', 'Eşit kuvvetle', 'Hiç çekmez'], answer: 1,
      hints: ['İki atom da oksijen.', '', 'Aynı elementin atomlarının elektronegatifliği aynıdır.'],
      right: 'Evet. İki oksijen atomunun elektronegatifliği aynı.',
    });
    await par(c.say('İki oksijen atomu eşit çeker; bağ apolardır.'), belir(c, etiket, 500));
  }

  /* ---- 3. Farklı atomlar: elektronlar kayar ---- */
  async function farkliAtomlar(c) {
    const svg = c.svg(1000, 562);
    const ip = halat(c, svg, 235, 300, 1, 1.3);
    const b = bag(c, svg, 715, 290, 'H', 'F');
    b.ayarla(0, 0, 0);
    const tA = enYazi(c, svg, b.xa, 478, 'H'), tB = enYazi(c, svg, b.xb, 478, 'F');
    const lDipol = yazi(c, svg, 715, 535, 'dipol', { size: 28, kalin: 700, renk: RENK.vurgu });
    const lPolar = yazi(c, svg, 715, 535, 'polar kovalent bağ', { size: 28, kalin: 700, renk: RENK.vurgu });
    b.etiket('+', '-', 0);
    gizle(ip.g, b.hepsi, tA, tB, lDipol, lPolar);

    await par(c.say('Şimdi hidrojen ile flor bağ yapsın: HF molekülü.', { speak: 'Şimdi hidrojen ile flor bağ yapsın: H F molekülü.' }),
      belir(c, [...b.cekirdek, ...b.elektron, b.bulut], 600));
    await par(c.say('Florun elektronegatifliği 4,00; hidrojeninki 2,20.', { speak: 'Florun elektronegatifliği dört; hidrojeninki iki virgül yirmi.' }), belir(c, [tA, tB], 500));
    b.ayarla(0, b.boyOf('H'), b.boyOf('F'));
    await par(c.say('Flor, ortak elektronları hidrojenden daha kuvvetle çeker.'), belir(c, [ip.g, ...b.oklar], 600), ip.git(0.85, 1000));
    await par(c.say('Elektronlar florun çevresinde daha yoğun durur.'), b.git('H', 'F', 1200));
    await c.say('Elektronlar yine ortaktır; yalnızca flora daha yakındır.', { speak: '[thoughtful] Elektronlar yine ortaktır; yalnızca flora daha yakındır.' });
    await par(c.say('Flor kısmen eksi yüklenir; gösterimi δ⁻.', { speak: 'Flor kısmen eksi yüklenir; gösterimi delta eksi.' }), belir(c, b.dB, 450));
    await par(c.say('Hidrojen kısmen artı yüklenir; gösterimi δ⁺.', { speak: 'Hidrojen kısmen artı yüklenir; gösterimi delta artı.' }), belir(c, b.dA, 450));
    await par(c.say('Kalıcı artı ve eksi kutuplu bu yapıya dipol denir.'), belir(c, lDipol, 500));
    await par(c.say('Elektronegatiflikleri farklı atomların bağına polar kovalent bağ denir.'), belir(c, lDipol, 300, 0).then(() => belir(c, lPolar, 500)));

    // Birlikte çöz: HCl, kısmen eksi olan atomu öğrenci bulur.
    const eski = [ip.g, ...b.hepsi, tA, tB, lPolar];
    c.clearSay();
    await belir(c, eski, 500, 0);
    const h = bag(c, svg, 500, 245, 'H', 'Cl');
    h.ayarla(0, 0, 0); h.etiket('+', '-', 0);
    const hA = enYazi(c, svg, h.xa, 430, 'H'), hB = enYazi(c, svg, h.xb, 430, 'Cl');
    const s1 = yazi(c, svg, 500, 488, 'Fark var → polar kovalent bağ', { size: 26, kalin: 600, renk: RENK.yazi });
    const s2 = yazi(c, svg, 500, 534, 'Kısmen eksi (δ^{−}) olan atom: ?', { size: 26, kalin: 700, renk: RENK.vurgu, math: true });
    gizle(h.hepsi, hA, hB, s1, s2);
    await par(c.say('Bu kez bağ hidrojen ile klor arasında.'), belir(c, [...h.cekirdek, ...h.elektron, h.bulut, hA, hB, s1], 600));
    await belir(c, s2, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Kısmen eksi (δ<sup>−</sup>) olan atom hangisi?',
      options: ['Hidrojen', 'İkisi de', 'Klor'], answer: 2,
      hints: ['Elektronları kim daha kuvvetle çekiyor?', 'Elektronegatifliği büyük olan atom δ<sup>−</sup> olur.', ''],
      right: 'Evet. Klorun elektronegatifliği (3,16) hidrojeninkinden (2,20) büyük.',
    });
    c.mathText(s2, 'Kısmen eksi (δ^{−}) olan atom: klor'); s2.style.fill = RENK.eksi;
    await par(c.say('Klor daha kuvvetle çeker: klor δ⁻, hidrojen δ⁺.', { speak: 'Klor daha kuvvetle çeker: klor delta eksi, hidrojen delta artı.' }),
      belir(c, h.oklar, 400), h.git('H', 'Cl', 1100).then(() => belir(c, [h.dA, h.dB], 450)));

    // Sor: H₂ ve HF aynı sayıda atom ve ortak çift taşır; ayıran nedir?
    c.clearSay();
    await belir(c, [...h.hepsi, hA, hB, s1, s2], 500, 0);
    const k1 = lewis(c, svg, 'H2', 270, 240, { olcek: 1.5 }), k2 = lewis(c, svg, 'HF', 730, 240, { olcek: 1.5 });
    const y1 = yazi(c, svg, 270, 380, '1 ortak çift', { size: 24, kalin: 600, renk: RENK.soluk }), y2 = yazi(c, svg, 730, 380, '1 ortak çift', { size: 24, kalin: 600, renk: RENK.soluk });
    const r1 = yazi(c, svg, 270, 460, 'fark yok: apolar', { size: 28, kalin: 700, renk: RENK.vurgu }), r2 = yazi(c, svg, 730, 460, 'fark var: polar', { size: 28, kalin: 700, renk: RENK.vurgu });
    gizle(k1.g, k2.g, y1, y2, r1, r2);
    await belir(c, [k1.g, k2.g, y1, y2], 600);
    await c.choice({
      tag: 'Sıra sende', q: `${html('H2')} ve HF molekülünde de iki atom ve bir ortak elektron çifti var; ilkinde bağ apolar, ötekinde polar. Bağın polarlığını ne belirler?`,
      options: ['Ortak elektron çifti sayısı', 'Atomların elektronegatiflik farkı', 'Moleküldeki atom sayısı'], answer: 1,
      hints: ['İki molekülde de ortak çift sayısı aynı.', '', 'İki molekülde de atom sayısı aynı; ayıran, atomların çekme gücüdür.'],
      right: 'Evet. İkisini ayıran, atomların elektronegatiflik farkıdır.',
    });
    await c.say('Bağın polarlığını elektronegatiflik farkı belirler.');
    await par(c.say('Fark yoksa bağ apolar, varsa polardır.'), belir(c, [r1, r2], 500));
  }

  /* ---- 4. Fark büyüdükçe polarlık artar ---- */
  async function farkBuyur(c) {
    const svg = c.svg(1000, 562);
    const opt = { olcek: 0.72 };
    const bC = bag(c, svg, 250, 250, 'H', 'Cl', opt), bF = bag(c, svg, 750, 250, 'H', 'F', opt);
    bC.etiket('+', '-', 0); bF.etiket('+', '-', 0);
    const eC = yazi(c, svg, 250, 440, '3,16 − 2,20 = 0,96', { size: 28, kalin: 700 }), eF = yazi(c, svg, 750, 440, '4,00 − 2,20 = 1,80', { size: 28, kalin: 700 });
    gizle(bC.hepsi, bF.hepsi, eC, eF);
    const gor = (b) => b.hepsi.filter((e) => e !== b.dA && e !== b.dB);

    await par(c.say('Klorun elektronegatifliği 3,16; HCl\'de fark 0,96\'dır.', { speak: 'Klorun elektronegatifliği üç virgül on altı; H Cl\'de fark sıfır virgül doksan altıdır.' }),
      belir(c, [...gor(bC), eC], 700));
    await par(c.say('HF\'de fark 1,80\'dir: HCl\'dekinden büyük.', { speak: 'H F\'de fark bir virgül seksendir: H Cl\'dekinden büyük.' }),
      belir(c, [...gor(bF), eF], 700));
    await par(c.say('HF\'de elektronlar flora, HCl\'dekinden daha çok kayar.', { speak: 'H F\'de elektronlar flora, H Cl\'dekinden daha çok kayar.' }),
      belir(c, [bC.dA, bC.dB], 500, 0.6), belir(c, [bF.dA, bF.dB], 500));
    await c.say('Fark büyüdükçe bağın polarlığı artar.');

    // Sor: N–H ile O–H.
    c.clearSay();
    await belir(c, [...bC.hepsi, ...bF.hepsi, eC, eF], 500, 0);
    const satir = enSatiri(c, svg, ['H', 'N', 'O'], 250, 290, 250, { size: 40 });
    gizle(satir.g);
    await belir(c, satir.g, 500);
    await c.choice({
      tag: 'Sıra sende', q: 'N–H bağı ile O–H bağından hangisi daha polardır?',
      options: ['N–H', 'İkisi eşit', 'O–H'], answer: 2,
      hints: ['Önce iki bağın farkını bul.', 'Fark hangisinde daha büyük?', ''],
      right: 'Evet. O–H bağında elektronegatiflik farkı daha büyük.',
    });
    await belir(c, satir.g, 400, 0);
    const bN = bag(c, svg, 250, 250, 'N', 'H', opt), bO = bag(c, svg, 750, 250, 'O', 'H', opt);
    bN.ayarla(0, 0, 0); bO.ayarla(0, 0, 0);
    const eN = yazi(c, svg, 250, 440, '3,04 − 2,20 = 0,84', { size: 28, kalin: 700 }), eO = yazi(c, svg, 750, 440, '3,44 − 2,20 = 1,24', { size: 28, kalin: 700 });
    gizle(bN.hepsi, bO.hepsi, eN, eO);
    await par(c.say('O–H\'de fark 1,24, N–H\'de 0,84: O–H daha polardır.', { speak: 'O H\'de fark bir virgül yirmi dört, N H\'de sıfır virgül seksen dört: O H daha polardır.' }),
      belir(c, [...gor(bN), ...gor(bO), eN, eO], 500).then(() => par(belir(c, [...bN.oklar, ...bO.oklar], 300), bN.git('N', 'H', 1100), bO.git('O', 'H', 1100))));

    // Dene: H–Y kaydırıcısı.
    c.clearSay();
    await belir(c, [...bN.hepsi, ...bO.hepsi, eN, eO], 500, 0);
    const YL = ['H', 'C', 'N', 'O', 'F'];
    const big = bag(c, svg, 500, 245, 'H', 'H');
    big.etiket('+', '-', 0);
    const gA = enYazi(c, svg, big.xa, 455, 'H'), gB = enYazi(c, svg, big.xb, 455, 'H');
    const gF = yazi(c, svg, 500, 500, 'fark yok', { size: 28, kalin: 700 }), gD = yazi(c, svg, 500, 545, 'apolar kovalent bağ', { size: 28, kalin: 700, renk: RENK.vurgu });
    gizle(big.hepsi, gA, gB, gF, gD);
    const ayarlaY = (v) => {
      const Y = YL[v], f = fark('H', Y), s = big.kaymaOf('H', Y);
      big.sembol('H', Y); big.ayarla(s, big.boyOf('H'), big.boyOf(Y));
      parcaKoy(c, gB, [[Y, RENK.soluk], '  ' + virgul(EN[Y])]);
      gF.textContent = f > 0 ? 'fark ' + virgul(f) : 'fark yok';
      gD.textContent = f > 0 ? 'polar kovalent bağ' : 'apolar kovalent bağ';
      big.dA.style.opacity = f > 0 ? 0.45 + 0.55 * (f / 1.8) : 0; big.dB.style.opacity = big.dA.style.opacity;
    };
    ayarlaY(0);
    await belir(c, [...gor(big), gA, gB, gF, gD], 600);
    await c.say('Y atomunu değiştir; bulutun nereye kaydığına bak.', { noWait: true });
    c.slider({ tag: 'Dene', label: 'Y atomu', min: 0, max: 4, step: 1, value: 0, fmt: (v) => YL[v], onInput: ayarlaY });
    await c.cont('Devam ›');
    c.clearAct();
    await c.say('Fark büyüdükçe bulut, elektronegatifliği büyük atoma kayar.');
    c.note('<b>Fark yoksa bağ apolar, varsa polardır.</b> Örnek: H–H apolar, H–F polar.', 'Bağın polarlığı', 'bagin-polarligi');
  }

  /* ---- 5. Sekiz bağı ayır ---- */
  async function sekizBag(c) {
    const svg = c.svg(1000, 562);
    const tablo = enSatiri(c, svg, ['H', 'C', 'N', 'O', 'F'], 140, 44, 180, { size: 26 });
    const st = siniflaTahtasi(c, svg, {
      kutular: [
        { x: 30, y: 270, w: 455, h: 250, baslik: 'apolar kovalent bağ', kol: 4 },
        { x: 515, y: 270, w: 455, h: 250, baslik: 'polar kovalent bağ', kol: 4 },
      ],
      kart: { x: 500, y: 150 }, chipPunto: 28,
      ciz: (k, g) => yazi(c, g, 500, 196, k.alt, { size: 26, kalin: 600, renk: RENK.soluk }),
    });
    gizle(tablo.g, st.kutularEl.map((e) => e.g));
    const KART = [
      { f: 'H_{2}', alt: 'H ve H', ats: ['H'], kutu: 0, neden: 'İki atom aynı elementin atomu; fark yok.' },
      { f: 'F_{2}', alt: 'F ve F', ats: ['F'], kutu: 0, neden: 'İki atom aynı elementin atomu; fark yok.' },
      { f: 'N_{2}', alt: 'N ve N', ats: ['N'], kutu: 0, neden: 'İki atom aynı elementin atomu; fark yok.' },
      { f: 'O_{2}', alt: 'O ve O', ats: ['O'], kutu: 0, neden: 'İki atom aynı elementin atomu; fark yok.' },
      { f: 'HF', alt: 'H ve F', ats: ['H', 'F'], kutu: 1, neden: 'Hidrojen ile flor farklı; fark 1,80.' },
      { f: 'CH_{4}', alt: 'C ve H', ats: ['C', 'H'], kutu: 1, neden: 'Karbon 2,55, hidrojen 2,20; fark var.' },
      { f: 'NH_{3}', alt: 'N ve H', ats: ['N', 'H'], kutu: 1, neden: 'Azot 3,04, hidrojen 2,20; fark var.' },
      { f: 'H_{2}O', alt: 'O ve H', ats: ['O', 'H'], kutu: 1, neden: 'Oksijen 3,44, hidrojen 2,20; fark var.' },
    ];
    KART.forEach((k) => { k.html = k.f.replace(/_\{([^}]*)\}/g, '<sub>$1</sub>'); k.ipucu = 'Atomların elektronegatifliğine bak: fark var mı?'; });
    const hepsi = ['H', 'C', 'N', 'O', 'F'];

    await par(c.say('Sekiz bağı elektronegatiflik farkına göre iki kutuya ayıralım.'), belir(c, [tablo.g, ...st.kutularEl.map((e) => e.g)], 600));
    await sinifla(c, {
      tag: 'Dene', kutular: ['apolar kovalent bağ', 'polar kovalent bağ'], kartlar: KART,
      soru: (k) => `<b>${k.html}</b> (${k.alt}): bu bağ hangi türdendir?`,
      sec: async (i, k) => { await tablo.vurgula(k.ats, 300); await st.sec(i, k); },
      yerlestir: async (i, k) => { await st.yerlestir(i, k); await tablo.vurgula(hepsi, 300); },
    });
    await c.say('C–H bağı da polardır: karbon hidrojenden daha elektronegatiftir.', { speak: 'C H bağı da polardır: karbon hidrojenden daha elektronegatiftir.' });
    await c.say('Polar bağda da elektronlar ortak kalır; yalnızca eşit paylaşılmaz.');
  }

  Ders.start({
    id: 'cesitlilik-e1', kicker: 'Konu E · Molekül polarlığı', title: 'Elektronegatiflik farkı: elektronlar eşit paylaşılmaz', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Elektronegatiflik farkı: elektronlar eşit paylaşılmaz',
      hook: 'İki kişi bir halatı çekerken güçlü olan halatı kendine kaydırır; atomlar ortak elektronları hep eşit mi çeker?',
      button: 'Derse başla ›',
    },
    goals: ['Elektronegatifliği aynı olan atomların bağının apolar olduğunu açıklar.', 'Elektronegatifliği farklı atomların bağında elektronların büyük atoma kaydığını, δ<sup>+</sup> ve δ<sup>−</sup> ile gösterir.', 'Elektronegatiflik farkı büyüdükçe bağın polarlığının arttığını söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Ortaklanmamış çiftin itmesini ve çekirdeklerin çekmesini hatırla.', run: hatirla },
      { title: 'Aynı atomlar: ortak elektronlar ortada', goal: 'Aynı atomların elektronları eşit çektiğini gör.', run: ayniAtomlar },
      { title: 'Farklı atomlar: elektronlar kayar', goal: 'Elektronların elektronegatifliği büyük atoma kaydığını gör.', run: farkliAtomlar },
      { title: 'Fark büyüdükçe polarlık artar', goal: 'Farkı hesapla, polarlığın nasıl değiştiğini gör.', run: farkBuyur },
      { title: 'Sekiz bağı ayır', goal: 'Bağları apolar ve polar kovalent bağ olarak ayır.', run: sekizBag },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangisi apolar kovalent bağdır?',
        options: ['H–Cl', 'Cl–Cl', 'O–H'], answer: 1,
        why: ['Hidrojen ile klorun elektronegatifliği farklı; bağ polardır.', 'İki klor atomunun elektronegatifliği aynı; elektronlar eşit çekilir.', 'Oksijen ile hidrojenin elektronegatifliği farklı; bağ polardır.'], scene: 1 },
      { q: 'Hidrojen (2,20) ile kükürt (2,58) bağ yapıyor. Hangi atom kısmen eksidir (δ<sup>−</sup>)?',
        options: ['Hidrojen', 'İkisi de', 'Kükürt'], answer: 2,
        why: ['Hidrojenin elektronegatifliği daha küçüktür; kısmen artı (δ<sup>+</sup>) olur.', 'Elektronegatiflikler farklı olduğundan yük dağılımı eşit değildir; biri eksi, biri artı olur.', 'Kükürt ortak elektronları daha kuvvetle çeker; kısmen eksi olur.'], scene: 2 },
      { q: 'C–H, N–H ve O–H bağlarını polarlığı küçükten büyüğe sırala (H 2,20 · C 2,55 · N 3,04 · O 3,44).',
        options: ['C–H, N–H, O–H', 'O–H, N–H, C–H', 'N–H, C–H, O–H'], answer: 0,
        why: ['Farklar 0,35 &lt; 0,84 &lt; 1,24; fark büyüdükçe polarlık artar.', 'Bu sıralama büyükten küçüğe doğrudur.', 'C–H farkı (0,35), N–H farkından (0,84) küçüktür; C–H önce gelmeli.'], scene: 3 },
      { q: 'H–F bağındaki ortak elektronlar için hangisi doğrudur?',
        options: ['Tamamen flora geçer, hidrojen elektronsuz kalır', 'Ortaktır ama flora daha yakındır', 'İki atoma eşit uzaklıkta durur'], answer: 1,
        why: ['Elektronlar yine ortaktır; flora geçmez, yalnızca ona daha yakındır.', 'Flor daha kuvvetli çeker; elektronlar ortak kalır ama flora yakın durur.', 'Eşit uzaklık, elektronegatifliği aynı atomlarda olur.'], scene: 2 },
      { q: 'Azot molekülünde (N<sub>2</sub>) bağın polarlığı için hangisi doğrudur?',
        options: ['Polar; azot elektronegatif bir atomdur', 'Polar; atomlar üç ortak çift kullanır', 'Apolar; iki azot atomunun elektronegatifliği aynı'], answer: 2,
        why: ['Polarlık atomun tek başına elektronegatif olmasına değil, iki atom arasındaki farka bağlıdır.', 'Ortak çift sayısı polarlığı belirlemez; fark belirler.', 'Aynı elementin iki atomu arasında fark yoktur; bağ apolardır.'], scene: 1 },
    ],
    summary: ['Aynı atomlar ortak elektronları eşit çeker: bağ apolar.', 'Fark varsa elektronlar büyük atoma kayar: bağ polar, δ<sup>+</sup> ve δ<sup>−</sup>.', 'Fark büyüdükçe polarlık artar.', '<b>Elektronegatifliği büyük olan atom, ortak elektronları kendine çeker.</b>'],
    nextLesson: { href: 'e2-polar-mi-apolar-mi.html', label: 'Sonraki: Polar mı, apolar mı ›' },
  });
})();
