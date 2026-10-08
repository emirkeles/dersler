/* E1 · FİZ.9.2.6 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/E-hareketin-temel-kavramlari.md
   Yazar notu: krokilerin kuruluşu MEB Fizik 9 s. 92–93, 105, 111 ve 120'den; yer adları ve uzaklıklar örnek veridir.
   Renk rolleri (Konu E boyunca): konum = mor, alınan yol = vurgu, yer değiştirme = r; referans noktası turkuaz halka.
   Krokiler kareli ve şematiktir; yön gülünde yukarı kuzey, sağ doğu. Öğrenciye kitap ya da sayfa anılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, gizle, belir, sol, kaybol, par, ok, okCiz, yonGulu, izgara, insan, araba } = KIT;
  const { lerp, ease } = Ders;
  const KONUM = RENK.mor, REF = RENK.turkuaz, CAM = '#0e1730';
  const sessiz = (p) => p.catch(() => {});

  /* ---- Ortak küçük araçlar ---- */
  const halka = (c, p, x, y, r = 21) => c.S('circle', { cx: x, cy: y, r, fill: 'none', stroke: REF, 'stroke-width': 4 }, p);
  const halkaGit = (c, h, x, y, ms = 650) => {
    const x0 = +h.getAttribute('cx'), y0 = +h.getAttribute('cy');
    return c.tween(ms, (e) => { h.setAttribute('cx', lerp(x0, x, e)); h.setAttribute('cy', lerp(y0, y, e)); }, ease.inOut);
  };
  const nabiz = (c, el, r0, r1, ms = 700) => c.tween(ms, (e, t) => el.setAttribute('r', lerp(r0, r1, Math.sin(Math.PI * t))), ease.linear);
  /* "batı ← → doğu" göstergesi */
  function yonOku(c, p, x, y) {
    const g = c.S('g', {}, p);
    yazi(c, g, x - 98, y + 8, 'batı', { size: 24, renk: RENK.soluk, hiza: 'end' });
    ok(c, g, x - 8, y, x - 86, y, { renk: RENK.soluk, kalin: 3, uc: 11 });
    ok(c, g, x + 8, y, x + 86, y, { renk: RENK.soluk, kalin: 3, uc: 11 });
    yazi(c, g, x + 98, y + 8, 'doğu', { size: 24, renk: RENK.soluk, hiza: 'start' });
    return g;
  }
  /* Yan yana yazı parçaları. { ok: true } parçanın son harfinin üstüne küçük bir vektör oku çizer. */
  function dizi(c, p, x, y, parcalar, o = {}) {
    const g = c.S('g', {}, p), s = o.size || 28, renk = o.renk || RENK.yazi; let u = 0;
    parcalar.forEach((pr) => {
      const q = typeof pr === 'string' ? { t: pr } : pr;
      const el = yazi(c, g, u, y, q.t, { size: s, renk: q.renk || renk, hiza: 'start' });
      const w = el.getComputedTextLength() || q.t.length * s * 0.56;
      if (q.ok) {
        const a = q.t.length > 1 ? el.getSubStringLength(0, q.t.length - 1) : 0;
        ok(c, g, u + a - 1, y - s * 0.8, u + w + 4, y - s * 0.8, { renk: q.renk || renk, kalin: 2.5, uc: 9 });
      }
      u += w + (q.ara == null ? s * 0.3 : q.ara);
    });
    const hiza = o.hiza || 'start';
    g.setAttribute('transform', `translate(${hiza === 'start' ? x : hiza === 'end' ? x - u : x - u / 2} 0)`);
    return g;
  }
  /* Adlı yer işareti: nokta + ad. */
  function yer(c, p, x, y, ad, konum = 'ust', o = {}) {
    const g = c.S('g', {}, p);
    const n = c.S('circle', { cx: x, cy: y, r: 8, fill: o.renk || RENK.yazi }, g);
    const yerler = { ust: [x, y - 26, 'middle'], alt: [x, y + 44, 'middle'], sag: [x + 28, y + 8, 'start'], sol: [x - 28, y + 8, 'end'], sagust: [x + 18, y - 20, 'start'], solust: [x - 18, y - 20, 'end'] };
    const [tx, ty, hiza] = yerler[konum];
    const etiket = yazi(c, g, tx, ty, ad, { size: o.size || 24, hiza });
    return { g, n, etiket, x, y };
  }
  /* İki yer arasında kesikli çizgi ve uzaklık yazısı. */
  function bag(c, p, a, b, metin, o = {}) {
    const g = c.S('g', {}, p), yatay = Math.abs(a[1] - b[1]) < 1;
    const l = cizgi(c, g, a[0], a[1], b[0], b[1], { renk: RENK.soluk, kalin: 3, kesik: '8 8' });
    const t = yatay ? yazi(c, g, (a[0] + b[0]) / 2, a[1] + (o.alt ? 50 : -12), metin, { size: 24, renk: RENK.soluk })
      : yazi(c, g, a[0] + (o.sol ? -12 : 12), (a[1] + b[1]) / 2 + 8, metin, { size: 24, renk: RENK.soluk, hiza: o.sol ? 'end' : 'start' });
    return { g, l, t };
  }
  const vurgula = (b, renk = RENK.yazi, kalin = 5) => { b.l.setAttribute('stroke', renk); b.l.setAttribute('stroke-width', kalin); b.t.style.fill = renk; };
  const sondur = (b) => vurgula(b, RENK.soluk, 3);

  /* Otobüs, durak ve durakta bekleyen kişi. adlar: camda görünen iki koltuğun adı (soldaki, sağdaki). */
  function otobusSahnesi(c, svg, adlar) {
    const Y = 400, g = c.S('g', {}, svg);
    cizgi(c, g, 20, Y, 980, Y, { kalin: 4 });
    cizgi(c, g, 70, Y, 70, Y - 142, { renk: RENK.soluk, kalin: 5 });
    kutu(c, g, 46, Y - 178, 48, 36, { renk: RENK.soluk, rx: 8 });
    kutu(c, g, 58, Y - 168, 24, 13, { renk: RENK.soluk, rx: 3, kalin: 2 });
    yazi(c, g, 70, Y + 38, 'durak', { size: 24, renk: RENK.soluk });
    insan(c, g, 136, Y, { s: 1.2 });
    const b = c.S('g', {}, g);
    kutu(c, b, -190, -190, 380, 156, { renk: RENK.a, rx: 18 });
    kutu(c, b, -172, -174, 224, 80, { renk: RENK.a, rx: 6, kalin: 2, fill: CAM });
    kutu(c, b, 66, -174, 50, 80, { renk: RENK.a, rx: 6, kalin: 2, fill: CAM });
    kutu(c, b, 130, -174, 44, 130, { renk: RENK.a, rx: 6, kalin: 2, fill: CAM });
    [-110, 110].forEach((x) => daire(c, b, x, -22, 22, { renk: RENK.a, fill: RENK.koyu }));
    const yolcu = (x, renk) => {
      cizgi(c, b, x - 34, -152, x - 34, -98, { renk: RENK.cizgi, kalin: 6 });
      daire(c, b, x, -132, 15, { renk, kalin: 4, fill: RENK.koyu });
      yol(c, b, `M ${x - 24} -96 Q ${x - 24} -113 ${x} -113 Q ${x + 24} -113 ${x + 24} -96`, { renk, kalin: 4 });
    };
    yolcu(-120, RENK.yazi); yolcu(0, RENK.soluk);
    yazi(c, b, -120, -204, adlar[0], { size: 24 }); yazi(c, b, 0, -204, adlar[1], { size: 24, renk: RENK.soluk });
    let x = 420; const dinle = [];
    const koy = (v) => { x = v; b.setAttribute('transform', `translate(${v} ${Y})`); dinle.forEach((f) => f(v)); };
    koy(x);
    const git = (hedef, ms, e) => { const ilk = x; return c.tween(ms, (t) => koy(lerp(ilk, hedef, t)), e || ease.inOut); };
    return { g, b, Y, koy, git, dinle, x: () => x };
  }

  /* ---- Sahne 1 · Kime göre? ---- */
  async function kimeGore(c) {
    const svg = c.svg(1000, 562);
    // Ön bilgi: "okuldan 200 metre" bir çember verir; yön okla gelir.
    const on = c.S('g', {}, svg), OX = 400, OY = 290, R = 170;
    daire(c, on, OX, OY, R, { renk: RENK.soluk, kalin: 3 }).setAttribute('stroke-dasharray', '8 8');
    c.S('circle', { cx: OX, cy: OY, r: 9, fill: RENK.yazi }, on);
    yazi(c, on, OX, OY + 40, 'okul', { size: 24 });
    yazi(c, on, OX, OY - R - 14, '200 m', { size: 24, renk: RENK.soluk });
    [150, 215, 320].forEach((a) => { const r = a * Math.PI / 180; yazi(c, on, OX + Math.cos(r) * (R + 26), OY - Math.sin(r) * (R + 26) + 10, '?', { size: 30, renk: RENK.soluk }); });
    await belir(c, on, 400);
    await c.say('Arkadaşına “okuldan 200 metre uzaktayım” demek seni buldurmaya yetmemişti.', { speak: 'Arkadaşına okuldan iki yüz metre uzaktayım demek seni buldurmaya yetmemişti.' });
    const ux = OX + R * Math.cos(Math.PI / 6), uy = OY - R * Math.sin(Math.PI / 6);
    const v = ok(c, on, OX, OY, ux, uy, { renk: RENK.a, kalin: 7 });
    await okCiz(c, v, 700);
    await c.say('Eksik olan yöndü; yön isteyen nicelikleri okla çizeriz.');
    const e1 = yazi(c, on, ux + 16, uy - 6, 'ucu: yön', { size: 24, renk: RENK.a, hiza: 'start' });
    const e2 = yazi(c, on, OX + 84, OY - 4, 'boyu: büyüklük', { size: 24, renk: RENK.a, hiza: 'start' });
    await belir(c, [e1, e2]);
    await c.say('Okun ucu yönü, boyu büyüklüğü söyler.');
    await kaybol(c, on);

    const s = otobusSahnesi(c, svg, ['sen', 'yolcu']);
    const HY = s.Y - 132;
    const kisa = cizgi(c, s.b, -103, -132, -17, -132, { renk: RENK.yazi, kalin: 3, kesik: '7 7' });
    const uzun = cizgi(c, s.g, 152, s.Y - 94, 0, HY, { renk: RENK.yazi, kalin: 3, kesik: '7 7' });
    s.dinle.push((x) => uzun.setAttribute('x2', x - 138)); s.koy(420);
    gizle(kisa, uzun);
    await belir(c, s.g, 450);
    await c.say('Şimdi bir otobüste, cam kenarında oturduğunu düşün.');
    await par(belir(c, [kisa, uzun], 400), s.git(540, 3200, ease.in), c.say('Otobüs duraktan kalkıyor ve düz yolda ilerliyor.'));
    await par(s.git(650, 3400, ease.linear), c.say('Yanındaki yolcu hep yanında; aranızdaki uzaklık hiç değişmiyor.'));
    await par(s.git(760, 3400, ease.out), c.say('Durakta bekleyen kişi ise her saniye biraz daha geride kalıyor.'));
    await c.choice({ tag: 'Tahmin et', q: 'Otobüste oturuyorsun. Yerin <b>kime göre</b> değişiyor?',
      options: ['Yanındaki yolcuya göre', 'Durakta bekleyen kişiye göre', 'Kimseye göre; çünkü oturuyorum'], answer: 1,
      hints: ['Yanındaki yolcuyla aranızdaki uzaklık da yön de hep aynı; ona göre yerin değişmiyor.', '', 'Oturman yalnızca otobüsün içindeki yerinin aynı kaldığını gösterir; durakta bekleyen kişiden her saniye uzaklaşıyorsun.'],
      right: 'Evet. Duraktaki kişiden her saniye uzaklaşıyorsun.' });
    const ayni = yazi(c, s.b, -60, -62, 'aynı', { size: 24 });
    const degis = yazi(c, s.g, (152 + s.x() - 138) / 2, s.Y - 76, 'değişiyor', { size: 24 });
    await belir(c, [ayni, degis]);
    await c.say('Yanındaki yolcuya göre yerin aynı, duraktaki kişiye göre değişiyor.');
    await c.say('Aynı anda iki ayrı cevap çıktı ve ikisi de doğru.', { speak: '[thoughtful] Aynı anda iki ayrı cevap çıktı ve ikisi de doğru.' });
    await c.say('Demek ki bir yeri söylemeden önce “neye göre” sorusunu cevaplamalıyız.');
  }

  /* ---- İki kroki (sahne 2 ve 3): okul çevresi ve çarşı; 1 kare = 100 m ---- */
  function ikiKroki(c, svg) {
    const g = c.S('g', {}, svg);
    const i1 = izgara(c, g, { x: 40, y: 40, kare: 48, sutun: 8, satir: 9 }), i2 = izgara(c, g, { x: 600, y: 40, kare: 72, sutun: 5, satir: 6 });
    const orta = c.S('g', {}, g);
    yonGulu(c, orta, 512, 110, { r: 26 });
    yazi(c, orta, 512, 214, '1 kare', { size: 24, renk: RENK.soluk }); yazi(c, orta, 512, 246, '= 100 m', { size: 24, renk: RENK.soluk });
    const g1 = c.S('g', {}, g), g2 = c.S('g', {}, g);
    const O = i1.P(4, 5), K = i1.P(1, 5), Pk = i1.P(4, 1), C = i2.P(2, 3), F = i2.P(2, 5), E = i2.P(3, 3);
    const bKut = bag(c, g1, K, O, '300 m'), bPark = bag(c, g1, O, Pk, '400 m');
    const bFirin = bag(c, g2, C, F, '200 m', { sol: true }), bEcz = bag(c, g2, C, E, '100 m', { alt: true });
    const okul = yer(c, g1, O[0], O[1], 'okul', 'sagust'), kut = yer(c, g1, K[0], K[1], 'kütüphane', 'alt'), park = yer(c, g1, Pk[0], Pk[1], 'park', 'sol');
    const cesme = yer(c, g2, C[0], C[1], 'çeşme', 'sol'), firin = yer(c, g2, F[0], F[1], 'fırın', 'ust'), ecz = yer(c, g2, E[0], E[1], 'eczane', 'sag');
    return { g, i1, i2, orta, g1, g2, okul, kut, park, cesme, firin, ecz, bKut, bPark, bFirin, bEcz };
  }
  function bisiklet(c, p, x, y) {
    const g = c.S('g', {}, p), k = { renk: RENK.a, kalin: 3 };
    daire(c, g, x - 20, y - 14, 14, k); daire(c, g, x + 20, y - 14, 14, k);
    yol(c, g, `M ${x - 20} ${y - 14} L ${x - 6} ${y - 36} L ${x + 12} ${y - 36} L ${x + 20} ${y - 14} M ${x - 6} ${y - 36} L ${x + 2} ${y - 14} L ${x + 12} ${y - 36} L ${x + 16} ${y - 46}`, k);
    daire(c, g, x - 2, y - 66, 8, { renk: RENK.yazi, kalin: 3 });
    yol(c, g, `M ${x - 3} ${y - 58} L ${x - 6} ${y - 38} M ${x - 4} ${y - 52} L ${x + 16} ${y - 46}`, { renk: RENK.yazi, kalin: 3 });
    return g;
  }

  /* ---- Sahne 2 · İki kroki, bir ortak yan ---- */
  async function krokiler(c) {
    const svg = c.svg(1000, 562), k = ikiKroki(c, svg);
    gizle(k.g2);
    const hal = [k.kut, k.park, k.firin, k.ecz].map((y) => { const h = halka(c, k.g, y.x, y.y); h.style.opacity = 0; return h; });
    await belir(c, k.g, 400);
    await c.say('İlk krokide okulun yerini iki ayrı biçimde tarif edebiliriz.');
    vurgula(k.bKut); await belir(c, hal[0], 350);
    await c.say('Okul, kütüphanenin 300 metre doğusundadır.', { speak: 'Okul, kütüphanenin üç yüz metre doğusundadır.' });
    sondur(k.bKut); vurgula(k.bPark); await par(sol(c, hal[0], 0.3), belir(c, hal[1], 350));
    await c.say('Aynı okul, parkın 400 metre kuzeyindedir.', { speak: 'Aynı okul, parkın dört yüz metre kuzeyindedir.' });
    sondur(k.bPark); vurgula(k.bFirin); await par(belir(c, k.g2, 400), sol(c, hal[1], 0.3), belir(c, hal[2], 350));
    await c.say('İkinci krokide çeşme, fırının 200 metre güneyindedir.', { speak: 'İkinci krokide çeşme, fırının iki yüz metre güneyindedir.' });
    sondur(k.bFirin); vurgula(k.bEcz); await par(sol(c, hal[2], 0.3), belir(c, hal[3], 350));
    await c.say('Aynı çeşme, eczanenin 100 metre batısındadır.', { speak: 'Aynı çeşme, eczanenin yüz metre batısındadır.' });
    sondur(k.bEcz);
    await c.choice({ tag: 'Düşün', q: 'Dört tarifin <b>ortak yanı</b> hangisi?',
      options: ['Hepsi aynı uzaklığı veriyor', 'Hepsi aynı yönü gösteriyor', 'Hepsi bilinen başka bir yerden başlıyor'], answer: 2,
      hints: ['Uzaklıklar 300, 400, 200 ve 100 metre; hepsi farklı. Ortak olan, her tarifin dayandığı bir başlangıç yeri olması.', 'Yönler doğu, kuzey, güney ve batı; dördü de farklı. Ortak olan, tarifin başladığı yer.', ''],
      right: 'Evet. Her tarif bilinen bir yerden başlıyor.' });
    await belir(c, hal, 400);
    await c.say('Her tarif, yerinde durduğunu kabul ettiğimiz bir noktadan başlıyor.');
    await par(hal.map((h) => nabiz(c, h, 21, 28)));
    await c.say('Yeri belirtmek için seçilen, hareket etmediği kabul edilen noktaya <b>referans noktası</b> denir.');
    await sol(c, [hal[2], hal[3]], 0.3);
    await nabiz(c, hal[0], 21, 30); await nabiz(c, hal[1], 21, 30);
    await c.say('İlk tarifte referans noktası kütüphane, ikincisinde parktı.');
    const hOkul = halka(c, k.g, k.okul.x, k.okul.y); hOkul.style.opacity = 0;
    await par(sol(c, [hal[0], hal[1]], 0.3), belir(c, hOkul, 400));
    await c.say('Baştaki mesajda da referans noktası okuldu: “okuldan 200 metre”.', { speak: 'Baştaki mesajda da referans noktası okuldu: okuldan iki yüz metre.' });
    await kaybol(c, k.g, 400);

    // Bisikletli: ev, çeşme, çarşı
    const b = c.S('g', {}, svg), BY = 300, duraklar = [[170, 'ev'], [520, 'çeşme'], [850, 'çarşı']];
    cizgi(c, b, 90, BY, 930, BY, { kalin: 4 });
    duraklar.forEach(([x, ad]) => yer(c, b, x, BY, ad, 'alt', { size: 26 }));
    const bis = c.S('g', {}, b); bisiklet(c, bis, 0, BY - 8);
    const bisKoy = (x) => bis.setAttribute('transform', `translate(${x} 0)`); bisKoy(200);
    await belir(c, b, 400);
    await c.tween(1600, (e) => bisKoy(lerp(200, 330, e)), ease.out);
    await c.choice({ tag: 'Uygula', q: 'Bir bisikletli evinden çıkıp çarşıya gidecek. Yerini tarif etmek için <b>referans noktası</b> ne olabilir?',
      options: ['Yalnızca ev; çünkü yola oradan çıkıyor', 'Yalnızca çarşı; çünkü oraya varacak', 'Ev, çarşı ya da yol üstündeki çeşme; hangisini seçersek'], answer: 2,
      hints: ['Referans noktası hareketin başladığı yer olmak zorunda değil; okul için bir kez kütüphaneyi, bir kez parkı seçmiştik.', 'Varılacak yer de seçilebilir ama tek seçenek değildir; yerinde durduğunu kabul ettiğimiz her nokta olur.', ''],
      right: 'Evet. Yerinde durduğunu kabul ettiğimiz her nokta olur.' });
    for (const [x] of duraklar) { const h = halka(c, b, x, BY); h.style.opacity = 0; await belir(c, h, 300); }
    await c.say('Referans noktasını biz seçeriz; yeter ki yerinde durduğunu kabul edelim.');
    c.note('<b>Referans noktası:</b> yeri belirtmek için seçilen, hareket etmediği kabul edilen nokta.<br>“Okul, parkın 400 m kuzeyinde” tarifinde park.', 'Referans noktası', 'ref');
  }

  /* ---- Sahne 3 · Yön ve uzaklık birlikte: konum ---- */
  async function konum(c) {
    const svg = c.svg(1000, 562), k = ikiKroki(c, svg);
    const hOkul = halka(c, k.g, k.okul.x, k.okul.y), hCesme = halka(c, k.g2, k.cesme.x, k.cesme.y);
    gizle(hOkul, hCesme);
    await belir(c, k.g, 400);
    await belir(c, [hOkul, hCesme], 400);
    await c.say('Şimdi tersini yapalım: referans noktasını sabit tutup öteki yerleri tarif edelim.');
    vurgula(k.bKut, KONUM, 6);
    await c.say('Referans noktası okul olsun: kütüphane, okulun 300 metre batısındadır.', { speak: 'Referans noktası okul olsun: kütüphane, okulun üç yüz metre batısındadır.' });
    vurgula(k.bFirin, KONUM, 6);
    await c.say('İkinci krokide referans noktası çeşme: fırın, çeşmenin 200 metre kuzeyindedir.', { speak: 'İkinci krokide referans noktası çeşme: fırın, çeşmenin iki yüz metre kuzeyindedir.' });
    vurgula(k.bEcz, KONUM, 6);
    await c.say('Eczane de çeşmenin 100 metre doğusundadır.', { speak: 'Eczane de çeşmenin yüz metre doğusundadır.' });
    await kaybol(c, [k.g2, k.i2.g], 400);
    await nabiz(c, k.park.n, 8, 14);
    await c.say('Parkın yerini de aynı kalıpla, okula göre söylemek istiyoruz.');
    // Yardımcı çizimler: uzaklık bir çember, yön bir ışın verir.
    const O = [k.okul.x, k.okul.y], yard = c.S('g', {}, k.g); k.g.insertBefore(yard, k.g1);
    const cem = c.S('g', {}, yard), isin = c.S('g', {}, yard);
    daire(c, cem, O[0], O[1], 192, { renk: RENK.b, kalin: 4 });
    const cemAd = yazi(c, cem, 436, 338, 'okula 400 m', { size: 24, renk: RENK.b, hiza: 'start' });
    cizgi(c, isin, O[0], O[1], O[0], 472, { renk: RENK.a, kalin: 5 });
    const isinAd = yazi(c, isin, O[0] + 14, 464, 'okulun güneyi', { size: 24, renk: RENK.a, hiza: 'start' });
    gizle(cem, isin);
    await c.choice({ tag: 'Uygula', q: 'Referans noktası okul. Hangi tarif parkı <b>tek bir noktada</b> buldurur?',
      options: ['Park okula 400 m uzakta', 'Park okulun güneyinde', 'Park okulun 400 m güneyinde'], answer: 2,
      hints: ['Okula 400 m uzaktaki noktalar koca bir çember doldurur; yön söylenmeden park bulunmaz.', 'Güneyde sayısız nokta var; hangisi olduğunu uzaklık söyler.', ''],
      right: 'Evet. Yön ve uzaklık birlikte tek bir nokta verir.',
      onPick: (i, dogru) => {
        if (i === 0 || dogru) sessiz(belir(c, cem, 350));
        if (i === 1 || dogru) sessiz(belir(c, isin, 350));
        if (dogru) k.park.n.setAttribute('fill', KONUM);
      } });
    await belir(c, [cem, isin], 300);
    await c.say('Uzaklık tek başına bir çember, yön tek başına bir çizgi verir.');
    await nabiz(c, k.park.n, 8, 16); k.park.n.setAttribute('r', 11);
    await c.say('İkisi birlikte tek bir noktayı gösterir.');
    await kaybol(c, [cemAd, isinAd], 300);
    const oz = c.S('g', {}, svg);
    const u1 = yazi(c, oz, 780, 176, 'referans noktası', { size: 28, renk: REF }), u2 = yazi(c, oz, 780, 226, 'yön', { size: 28, renk: RENK.a }), u3 = yazi(c, oz, 780, 276, 'uzaklık', { size: 28, renk: RENK.b });
    gizle(u1, u2, u3);
    for (const u of [u1, u2, u3]) await belir(c, u, 300);
    await c.say('Tariflerin hepsinde aynı üç şey var: referans noktası, yön ve uzaklık.', { speak: 'Tariflerin hepsinde aynı üç şey var: [short pause] referans noktası, yön ve uzaklık.' });
    const cz = cizgi(c, oz, 670, 300, 890, 300, { kalin: 3 }), ad = yazi(c, oz, 780, 350, 'konum', { size: 38, renk: KONUM, kalin: 700 });
    gizle(cz, ad); await belir(c, [cz, ad], 400);
    await c.say('Bir cismin herhangi bir anda referans noktasına göre bulunduğu yere <b>konum</b> denir.');
    c.note('<b>Konum:</b> cismin referans noktasına göre bulunduğu yer; yön ve uzaklıkla söylenir.<br>Park, okulun 400 m güneyinde.', 'Konum', 'konum');
  }

  /* ---- Tek kroki (sahne 4): okul ortada, 1 kare = 100 m ---- */
  function okulKrokisi(c, svg) {
    const g = c.S('g', {}, svg);
    const izg = izgara(c, g, { x: 260, y: 40, kare: 48, sutun: 10, satir: 9, yon: true, olcek: '1 kare = 100 m' });
    const P = (i, j) => izg.P(5 + i, 5 + j);
    const cizim = c.S('g', {}, g);
    return { g, izg, P, cizim };
  }

  /* ---- Sahne 4 · Konum vektörü ---- */
  async function konumVektoru(c) {
    const svg = c.svg(1000, 562);
    // (a) okul → park
    let k = okulKrokisi(c, svg);
    let O = k.P(0, 0), Pk = k.P(0, -4);
    yer(c, k.cizim, O[0], O[1], 'okul', 'ust'); yer(c, k.cizim, Pk[0], Pk[1], 'park', 'sol');
    halka(c, k.cizim, O[0], O[1]);
    await belir(c, k.g, 400);
    await c.say('Konumu söylerken yön gerekti; demek ki konum vektörel bir niceliktir.');
    const vp = ok(c, k.cizim, O[0], O[1], Pk[0], Pk[1], { renk: KONUM, kalin: 7 });
    await okCiz(c, vp, 800);
    await c.say('Bu yüzden okla çizilir: ok referans noktasından başlar, cismin bulunduğu noktada biter.');
    const ad = yazi(c, k.cizim, O[0] + 22, 300, 'konum vektörü', { size: 26, renk: KONUM, hiza: 'start' });
    await belir(c, ad);
    await c.say('Bu oka <b>konum vektörü</b> denir.');
    const deger = dizi(c, k.cizim, O[0] + 22, 346, [{ t: 'x', ok: true, ara: 1 }, ':', 'güney, 400 m'], { size: 28, renk: KONUM });
    await belir(c, deger);
    await c.say('Parkın konum vektörü okuldan başlar, 4 kare güneye uzanır.', { speak: 'Parkın konum vektörü okuldan başlar, dört kare güneye uzanır.' });
    await c.say('Konumun sembolü, üstünde ok olan x harfidir; SI birimi metredir.', { speak: 'Konumun sembolü, üstünde ok olan iks harfidir; se i birimi metredir.' });
    await kaybol(c, k.g, 400);

    // (b) bir referans noktası, üç yön
    const b = c.S('g', {}, svg), ib = izgara(c, b, { yon: true });
    const R = ib.P(11, 4), uclar = [[ib.P(8, 7), 'alışveriş merkezi', 'kuzeybatı', [592, 168, 'start'], -2], [ib.P(7, 4), 'benzin istasyonu', 'batı', [550, 246, 'middle'], 8], [ib.P(8, 1), 'gençlik merkezi', 'güneybatı', [592, 374, 'start'], 18]];
    c.S('circle', { cx: R[0], cy: R[1], r: 9, fill: RENK.yazi }, b); halka(c, b, R[0], R[1]);
    yazi(c, b, R[0] + 30, R[1] + 8, 'referans noktası', { size: 24, renk: REF, hiza: 'start' });
    uclar.forEach(([u, adi, , , dy]) => yazi(c, b, u[0] - 14, u[1] + dy, adi, { size: 24, hiza: 'end' }));
    const oklar = uclar.map(([u]) => { const o = ok(c, b, R[0], R[1], u[0], u[1], { renk: KONUM, kalin: 6 }); o.style.display = 'none'; return o; });
    const yonler = uclar.map(([, , yon, [x, y, hiza]]) => yazi(c, b, x, y, yon, { size: 24, renk: KONUM, hiza }));
    gizle(yonler);
    await belir(c, b, 400);
    await c.say('Başka bir krokide üç yer aynı referans noktasına göre veriliyor.');
    await par(c.say('Alışveriş merkezi kuzeybatıda, benzin istasyonu batıda, gençlik merkezi güneybatıda.'), (async () => {
      for (let i = 0; i < 3; i++) { oklar[i].style.display = ''; await okCiz(c, oklar[i], 600); await belir(c, yonler[i], 300); await c.wait(500); }
    })());
    await c.say('Üç konum vektörü de aynı noktadan çıkar, üç ayrı yöne gider.');
    await kaybol(c, b, 400);

    // (c) eksenli düzlem: A(4, 2)
    const d = c.S('g', {}, svg), id = izgara(c, d, { x: 212, y: 60, kare: 64, sutun: 9, satir: 6 });
    const E0 = id.P(0.4, 1), E1 = id.P(8.7, 1), E2 = id.P(2, 0.3), E3 = id.P(2, 5.7), Or = id.P(2, 1), A = id.P(6, 3);
    ok(c, d, E0[0], E0[1], E1[0], E1[1], { renk: RENK.soluk, kalin: 3, uc: 12 }); ok(c, d, E2[0], E2[1], E3[0], E3[1], { renk: RENK.soluk, kalin: 3, uc: 12 });
    yazi(c, d, E1[0] - 4, E1[1] + 34, 'x', { size: 26, renk: RENK.soluk }); yazi(c, d, E3[0] - 22, E3[1] + 14, 'y', { size: 26, renk: RENK.soluk });
    yazi(c, d, Or[0] - 26, Or[1] + 36, 'O', { size: 26 }); halka(c, d, Or[0], Or[1], 17);
    const nA = c.S('circle', { cx: A[0], cy: A[1], r: 9, fill: RENK.yazi }, d), adA = yazi(c, d, A[0] + 16, A[1] - 14, 'A', { size: 30, hiza: 'start' });
    await belir(c, d, 400);
    await c.say('Kareli düzlemde referans noktası orijin seçilirse konum iki sayıyla yazılır.');
    const va = id.vektor(2, 1, 4, 2, { renk: KONUM, kalin: 7, katman: d });
    d.appendChild(nA);
    await okCiz(c, va, 800);
    const say = id.sayim(va); say.style.opacity = 0; d.insertBefore(say, va);
    await belir(c, say, 400);
    adA.textContent = 'A(4, 2)';
    await c.say('A noktasının konumu (4, 2): orijinden 4 birim sağda, 2 birim yukarıda.', { speak: 'a noktasının konumu dört, iki: orijinden dört birim sağda, iki birim yukarıda.' });
    await kaybol(c, d, 400);

    // (d) dene: okul krokisinde üç konum vektörü
    k = okulKrokisi(c, svg); O = k.P(0, 0);
    const F = k.P(2, 0), D = k.P(-2, 0); Pk = k.P(0, -4);
    yer(c, k.cizim, O[0], O[1], 'okul', 'ust'); yer(c, k.cizim, F[0], F[1], 'fırın', 'ust'); yer(c, k.cizim, D[0], D[1], 'durak', 'ust'); yer(c, k.cizim, Pk[0], Pk[1], 'park', 'sol');
    halka(c, k.cizim, O[0], O[1]);
    await belir(c, k.g, 400);
    await c.say('Referans noktası okul; konum vektörünü seç.', { noWait: true });
    const gorevler = [
      { q: 'Fırın, okulun 200 m doğusunda. Fırının <b>konum vektörü</b> hangisi?', sec: ['Okuldan başlar, 2 kare sağa uzanır', 'Fırından başlar, 2 kare sola uzanır', 'Okuldan başlar, 2 kare sola uzanır'], d: 0,
        ip: ['', 'Konum vektörü referans noktasından, yani okuldan başlar; fırında biter.', 'Doğu krokide sağ taraftır; ok sağa uzanmalı.'], sag: 'Evet. Ok okuldan başlar, fırında biter.',
        uc: F, et: [F[0] + 18, F[1] + 8, 'doğu, 200 m', 'start'] },
      { q: 'Park, okulun 400 m güneyinde. Parkın <b>konum vektörü</b> hangisi?', sec: ['Okuldan başlar, 4 kare yukarı uzanır', 'Okuldan başlar, 2 kare aşağı uzanır', 'Okuldan başlar, 4 kare aşağı uzanır'], d: 2,
        ip: ['Güney krokide aşağıdır; yukarısı kuzey.', '1 kare 100 m; 400 m için 4 kare gerekir.', ''], sag: 'Evet. 400 m, 4 kare eder; güney aşağıdadır.',
        uc: Pk, et: [O[0] + 18, 340, 'güney, 400 m', 'start'] },
      { q: 'Durak, okulun 200 m batısında. Durağın <b>konum vektörü</b> hangisi?', sec: ['Okuldan başlar, 2 kare sağa uzanır', 'Okuldan başlar, 2 kare sola uzanır', 'Okuldan başlar, 4 kare sola uzanır'], d: 1,
        ip: ['Bu, fırının konum vektörü; batı krokide sol taraftır.', '', '200 m, 2 kare eder; ok fırınınkiyle aynı boyda olmalı.'], sag: 'Evet. Fırının okuyla aynı boyda, zıt yönde.',
        uc: D, et: [D[0] - 18, D[1] + 8, 'batı, 200 m', 'end'] },
    ];
    for (const gv of gorevler) {
      await c.choice({ tag: 'Sıra sende', q: gv.q, options: gv.sec, answer: gv.d, hints: gv.ip, right: gv.sag });
      const o = ok(c, k.cizim, O[0], O[1], gv.uc[0], gv.uc[1], { renk: KONUM, kalin: 7 });
      await okCiz(c, o, 700);
      await belir(c, yazi(c, k.cizim, gv.et[0], gv.et[1], gv.et[2], { size: 24, renk: KONUM, hiza: gv.et[3] }), 300);
    }
    await c.say('Fırın ile durağın okları aynı boyda çıktı.');
    await c.choice({ tag: 'Düşün', q: 'Fırın okulun 200 m doğusunda, durak 200 m batısında. Konumları için hangisi doğru?',
      options: ['Konumları aynı; ikisi de okula 200 m uzakta', 'Uzaklıkları aynı, yönleri zıt; konumları farklı', 'Durağın konumu daha küçük; çünkü batıda'], answer: 1,
      hints: ['Konum yalnızca uzaklık değildir; biri doğuda, öteki batıda olduğu için iki konum vektörü birbirinin zıddıdır.', '', 'Okun boyu uzaklığı gösterir ve iki ok da 2 kare; batıda olmak oku kısaltmaz, yönünü çevirir.'],
      right: 'Evet. İki ok aynı boyda ama zıt yönde.' });
    await c.say('Uzaklık aynı olsa bile yön farklıysa konum farklıdır.', { speak: '[thoughtful] Uzaklık aynı olsa bile yön farklıysa konum farklıdır.' });
    c.note('<b>Konum vektörü (' + VX + '):</b> referans noktasından cisme çizilen ok; birimi metre.<br>Park için okuldan 4 kare güneye.', 'Konum vektörü', 'vektor');
  }
  const VX = '<span style="display:inline-block;position:relative">x<span style="position:absolute;left:-.1em;right:-.1em;top:-.62em;text-align:center;font-size:.7em">→</span></span>';

  /* ---- Sahne 5 · Referans noktası değişirse ---- */
  async function degisirse(c) {
    const svg = c.svg(1000, 562), g = c.S('g', {}, svg);
    const X = (v) => 140 + 4 * v, YY = 150, HY = YY + 34;
    const N = { A: 0, B: 45, C: 105, D: 180 };
    yonOku(c, g, 500, 50);
    cizgi(c, g, 100, YY, 900, YY, { kalin: 4 });
    const uzak = {};
    Object.entries(N).forEach(([ad, v]) => {
      cizgi(c, g, X(v), YY - 9, X(v), YY + 9, { kalin: 3 });
      yazi(c, g, X(v), YY + 44, ad, { size: 30 });
      uzak[ad] = yazi(c, g, X(v), YY + 80, v ? v + ' m' : '0', { size: 22, renk: RENK.soluk, kalin: 500 });
    });
    const arac = araba(c, g, X(0), YY, { s: 0.8 }); arac.style.opacity = 0;
    const h = halka(c, g, X(0), HY, 23); h.style.opacity = 0;
    const cizOk = async (a, b, y, ms = 700) => { const o = ok(c, g, X(a), y, X(b), y, { renk: KONUM, kalin: 7 }); await okCiz(c, o, ms); return o; };
    await belir(c, g, 400);
    await c.say('Düz bir yolda dört nokta işaretli: A, B, C ve D.', { speak: 'Düz bir yolda dört nokta işaretli: a, be, ce ve de.' });
    await belir(c, h, 350);
    const oA = [await cizOk(0, 45, 290)];
    await c.say('Referans noktası A seçilince B’nin konumu 45 metre doğudur.', { speak: 'Referans noktası a seçilince be noktasının konumu kırk beş metre doğudur.' });
    oA.push(await cizOk(0, 105, 335), await cizOk(0, 180, 380));
    await c.say('C’nin konumu 105 metre, D’ninki 180 metre doğudur.', { speak: 'Ce noktasının konumu yüz beş metre, de noktasınınki yüz seksen metre doğudur.' });
    await belir(c, arac, 400);
    await c.say('Bir araç A noktasında, yola çıkmak için bekliyor.', { speak: 'Bir araç a noktasında, yola çıkmak için bekliyor.' });
    await par(kaybol(c, oA, 400), halkaGit(c, h, X(45), HY));
    await c.say('Şimdi referans noktasını değiştirip B’yi seçelim.', { speak: 'Şimdi referans noktasını değiştirip be noktasını seçelim.' });
    const oBA = await cizOk(45, 0, 290), eBA = yazi(c, g, X(22.5), 326, 'batı, 45 m', { size: 24, renk: KONUM });
    await belir(c, eBA, 300);
    await c.say('Araç artık “B’nin 45 metre batısında” diye tarif edilir.', { speak: 'Araç artık be noktasının kırk beş metre batısında diye tarif edilir.' });
    await c.choice({ tag: 'Düşün', q: 'Referans noktasını A’dan B’ye aldık. <b>Araca</b> ne oldu?',
      options: ['Araç 45 m batıya gitti', 'Araç yerinde; yalnızca konumunun tarifi değişti', 'Hiçbir şey değişmedi; konumu da aynı kaldı'], answer: 1,
      hints: ['Araç kıpırdamadı, hâlâ A noktasında. Değişen, yerini hangi noktadan ölçtüğümüz.', '', 'Aracın yeri aynı ama konum referans noktasına göre söylenir: A seçilince tam referans noktasındaydı, B seçilince 45 m batıda.'],
      right: 'Evet. Araç hâlâ A noktasında.' });
    await c.say('Araç kıpırdamadı; değişen, yerini hangi noktadan ölçtüğümüz.', { speak: '[thoughtful] Araç kıpırdamadı; değişen, yerini hangi noktadan ölçtüğümüz.' });
    await par(kaybol(c, eBA, 300), sol(c, oBA, 0.3));
    uzak.D.style.fill = RENK.yazi;
    await c.say('Öteki noktaların konumu da değişir: D, A’dan 180 metre doğudaydı.', { speak: 'Öteki noktaların konumu da değişir: de noktası, a noktasından yüz seksen metre doğudaydı.' });
    uzak.B.style.fill = RENK.yazi;
    const oBD = await cizOk(45, 180, 370), hes = yazi(c, g, X(112.5), 410, '180 − 45 = 135 m', { size: 26 });
    await belir(c, hes, 300);
    await c.say('B, A’dan 45 metre doğuda; fark 180 − 45 = 135.', { speak: 'Be noktası, a noktasından kırk beş metre doğuda; fark yüz seksen eksi kırk beş eşittir yüz otuz beş.' });
    const eBD = yazi(c, g, X(112.5), 352, 'doğu, 135 m', { size: 24, renk: KONUM });
    await belir(c, eBD, 300);
    await c.say('Öyleyse D’nin B’ye göre konumu 135 metre doğudur.', { speak: 'Öyleyse de noktasının be noktasına göre konumu yüz otuz beş metre doğudur.' });
    await kaybol(c, [oBA, oBD, hes, eBD], 400);
    uzak.D.style.fill = RENK.soluk; uzak.B.style.fill = RENK.soluk;

    // Dene: C'nin konumu üç ayrı referans noktasına göre
    await c.say('Referans noktası değişiyor; her seferinde C’nin konumunu seç.', { noWait: true });
    const gorevler = [
      { ref: 'A', sec: ['105 m doğu', '105 m batı', '60 m doğu'], d: 0, ip: ['', 'C, A’nın sağında, yani doğusunda kalır.', 'A’dan C’ye 105 m var; 60 m başka bir noktadan ölçülür.'], sag: 'Evet. C, A’nın 105 m doğusunda.', y: 290 },
      { ref: 'B', sec: ['150 m doğu', '60 m doğu', '60 m batı'], d: 1, ip: ['Uzaklıklar toplanmaz; aradaki fark alınır: 105 − 45.', '', 'C, B’nin sağında kalır; yön doğu.'], sag: 'Evet. 105 − 45 = 60; C, B’nin 60 m doğusunda.', y: 340 },
      { ref: 'D', sec: ['75 m doğu', '105 m batı', '75 m batı'], d: 2, ip: ['C, D’nin solunda kalır; ok bu kez batıya döner.', '105 m, A’dan ölçülen uzaklık; D’den C’ye 180 − 105 var.', ''], sag: 'Evet. 180 − 105 = 75; C, D’nin 75 m batısında.', y: 390 },
    ];
    for (const gv of gorevler) {
      await halkaGit(c, h, X(N[gv.ref]), HY);
      await c.choice({ tag: 'Sıra sende', q: `Referans noktası <b>${gv.ref}</b>. C noktasının konumu nedir?`, options: gv.sec, answer: gv.d, hints: gv.ip, right: gv.sag });
      const a = N[gv.ref], sola = a > N.C;
      c.S('circle', { cx: X(a), cy: gv.y, r: 9, fill: 'none', stroke: REF, 'stroke-width': 3 }, g);
      await cizOk(a, 105, gv.y);
      await belir(c, yazi(c, g, X(105) + (sola ? -14 : 14), gv.y + 8, gv.sec[gv.d], { size: 24, renk: KONUM, hiza: sola ? 'end' : 'start' }), 300);
    }
    await c.say('C hiç yerinden oynamadı; üç referans noktası üç ayrı konum verdi.', { speak: 'Ce noktası hiç yerinden oynamadı; üç referans noktası üç ayrı konum verdi.' });
    c.note('<b>Referans noktası değişince konum değişir, cisim yerinden oynamaz.</b><br>C: A’ya göre 105 m doğu, D’ye göre 75 m batı.', 'Referans noktası değişirse', 'degisir');
  }

  /* ---- Sahne 6 · Hareket ediyor mu? Neye göre? ---- */
  async function hareket(c) {
    const svg = c.svg(1000, 562), s = otobusSahnesi(c, svg, ['yolcu', 'koltuk']);
    const SATIR = [50, 100, 150], XS = [520, 640, 760];
    const anlar = SATIR.map((y, i) => { const t = yazi(c, s.g, 808, y + 8, (i + 1) + '. saniye', { size: 24, renk: RENK.soluk, hiza: 'start' }); t.style.opacity = 0; return t; });
    const hDurak = halka(c, s.g, 70, s.Y - 160, 34), hKoltuk = halka(c, s.b, 0, -132, 26);
    gizle(hDurak, hKoltuk);
    await belir(c, s.g, 450);
    await c.say('Otobüse dönelim; artık referans noktasını ve konumu biliyoruz.');
    await belir(c, hDurak, 350);
    const duraktan = [];
    await par(c.say('Referans noktası durak olsun: yolcunun konum vektörü her saniye uzuyor.'), (async () => {
      for (let i = 0; i < 3; i++) {
        await s.git(XS[i], 800);
        const o = ok(c, s.g, 70, SATIR[i], XS[i] - 120, SATIR[i], { renk: KONUM, kalin: 7 }); duraktan.push(o);
        await par(okCiz(c, o, 500), belir(c, anlar[i], 300));
      }
    })());
    await c.say('Bir cisim seçilen referans noktasına göre zamanla yer değiştiriyorsa <b>hareket ediyordur</b>.', { speak: 'Bir cisim seçilen referans noktasına göre zamanla yer değiştiriyorsa [short pause] hareket ediyordur.' });
    await c.say('Yolcu, durağa göre hareket ediyor.');
    await par(kaybol(c, [...duraktan, hDurak], 400), s.git(420, 800));
    await belir(c, hKoltuk, 350);
    await par(c.say('Şimdi referans noktası yanındaki koltuk olsun: konum vektörü hiç değişmiyor.'), (async () => {
      for (let i = 0; i < 3; i++) {
        await s.git(XS[i], 800);
        await okCiz(c, ok(c, s.g, XS[i], SATIR[i], XS[i] - 120, SATIR[i], { renk: KONUM, kalin: 7 }), 500);
      }
    })());
    await c.say('Yolcu, yanındaki koltuğa göre hareket etmiyor.');
    await kaybol(c, s.g, 400);

    // Asansör
    const a = c.S('g', {}, svg), ZY = 510;
    kutu(c, a, 260, 30, 480, 480, { fill: 'none', rx: 4 });
    kutu(c, a, 390, 30, 220, 480, { fill: CAM, rx: 0, kalin: 2 });
    [390, 270, 150].forEach((y) => { cizgi(c, a, 260, y, 390, y, { kalin: 2 }); cizgi(c, a, 610, y, 740, y, { kalin: 2 }); });
    cizgi(c, a, 170, ZY, 850, ZY, { kalin: 4 });
    yazi(c, a, 325, 496, 'zemin kat', { size: 24, renk: RENK.soluk });
    const kabin = c.S('g', {}, a);
    kutu(c, kabin, -100, -116, 200, 112, { renk: RENK.a, rx: 6, fill: RENK.koyu });
    const halat = cizgi(c, a, 500, 30, 500, 30, { kalin: 2 });
    insan(c, kabin, -42, -8, { s: 0.85 }); insan(c, kabin, 42, -8, { s: 0.85, renk: RENK.soluk });
    let ky = ZY, okAcik = false;
    const uzunOk = ok(c, a, 780, ZY, 780, ZY, { renk: KONUM, kalin: 7 });
    const kisaOk = ok(c, kabin, 26, -76, -26, -76, { renk: KONUM, kalin: 5, uc: 12 }); kisaOk.style.opacity = 0;
    const kabinKoy = (y) => { ky = y; kabin.setAttribute('transform', `translate(500 ${y})`); halat.setAttribute('y2', y - 116); if (okAcik) uzunOk.ayarla(780, ZY, 780, y); };
    kabinKoy(ZY - 4);
    await belir(c, a, 450);
    await c.tween(3000, (e) => kabinKoy(lerp(ZY - 4, 390, e)), ease.inOut);
    await c.choice({ tag: 'Uygula', q: 'Asansörde iki kişi yan yana yukarı çıkıyor. Biri <b>ötekine göre</b> hareket ediyor mu?',
      options: ['Evet; ikisi de yukarı çıkıyor', 'Hayır; birbirlerine göre konumları değişmiyor', 'Evet; hareket eden bir şey herkese göre hareket eder'], answer: 1,
      hints: ['Yukarı çıkmaları zemin kata göre hareket ettiklerini söyler. Birbirlerine göre konumları hep aynı kaldığı için birbirlerine göre hareket etmiyorlar.', '', 'Hareket referans noktasına göre söylenir; otobüsteki yolcu durağa göre hareket ediyor, koltuğuna göre etmiyordu.'],
      right: 'Evet. Aralarındaki konum vektörü hiç değişmiyor.' });
    okAcik = true; kabinKoy(ky);
    const eDegis = yazi(c, a, 796, 330, 'değişiyor', { size: 24, renk: KONUM, hiza: 'start' }), eAyni = yazi(c, a, 500, 0, 'aynı', { size: 24, renk: KONUM });
    const ayniKoy = () => eAyni.setAttribute('y', ky - 126);
    gizle(eDegis, eAyni); ayniKoy();
    await par(belir(c, [kisaOk, eDegis, eAyni], 400), c.tween(3600, (e) => { kabinKoy(lerp(390, 200, e)); ayniKoy(); }, ease.inOut),
      c.say('İkisi de zemin kata göre hareket ediyor, ama birbirlerine göre etmiyor.'));
    await c.say('“Hareket ediyor” ya da “duruyor” demeden önce referans noktasını söylemeliyiz.', { speak: '[thoughtful] Hareket ediyor ya da duruyor demeden önce referans noktasını söylemeliyiz.' });
    await c.say('Konum, “nereye göre” sorusuyla başlar.');
    c.note('<b>Cisim, referans noktasına göre zamanla yer değiştiriyorsa hareket ediyordur.</b><br>Yolcu durağa göre hareket eder, koltuğuna göre etmez.', 'Hareket', 'hareket');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-e1', kicker: 'Konu E · Hareketin temel kavramları', title: 'Nereye göre? Referans noktası ve konum', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'Nereye göre? Referans noktası ve konum', hook: 'Otobüste oturuyorsun; yanındaki yolcuya göre mi hareket ediyorsun, duraktaki birine göre mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Kime göre?', goal: 'Yerinin kime göre değiştiğini bul.', run: kimeGore },
      { title: 'İki kroki, bir ortak yan', goal: 'Tariflerin başladığı noktayı fark et.', run: krokiler },
      { title: 'Yön ve uzaklık birlikte: konum', goal: 'Bir yeri yön ve uzaklıkla tarif et.', run: konum },
      { title: 'Konum vektörü', goal: 'Konumu referans noktasından çıkan okla çiz.', run: konumVektoru },
      { title: 'Referans noktası değişirse', goal: 'Aynı noktanın konumunu farklı noktalara göre söyle.', run: degisirse },
      { title: 'Hareket ediyor mu? Neye göre?', goal: 'Hareketi referans noktasına göre söyle.', run: hareket },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Düz bir yolda durak okulun 120 m doğusunda, fırın okulun 50 m doğusundadır. Referans noktası fırın seçilirse durağın konumu nedir?',
        options: ['120 m doğu', '70 m doğu', '70 m batı'], answer: 1,
        why: ['120 m doğu, durağın okula göre konumudur; referans noktası değişince konum da değişir.', '120 − 50 = 70; durak fırının da doğusunda kalır.', 'Uzaklık doğru ama yön yanlış: durak fırından daha doğudadır.'], scene: 4 },
      { q: 'Otobüste uyuyan bir yolcu için “duruyor” demek doğru mu?',
        options: ['Evet; uyuyan biri hareket etmez', 'Hayır; otobüs gittiğine göre kesinlikle hareket ediyor', 'Referans noktasına bağlı: koltuğuna göre duruyor, durağa göre hareket ediyor'], answer: 2,
        why: ['Referans noktası söylenmeden “duruyor” denemez; yolcu durağa göre hareket ediyor.', 'Referans noktası söylenmeden “hareket ediyor” denemez; yolcu koltuğuna göre duruyor.', 'Koltuğuna göre konumu değişmiyor, durağa göre değişiyor; ikisi de doğru.'], scene: 5 },
    ],
    summary: ['<b>Konum, “nereye göre” sorusuyla başlar.</b>', 'Konum, cismin referans noktasına göre yeridir; yön ve uzaklıkla söylenir, okla çizilir.', 'Referans noktası değişince konum değişir; “hareket ediyor mu” sorusunun cevabı da değişebilir.'],
    nextLesson: { href: 'e2-yol-ve-yer-degistirme.html', label: 'Sonraki: Alınan yol ve yer değiştirme ›' },
  });
})();
