/* B1 · FİZ.9.2.2 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/B-skaler-ve-vektorel-nicelikler.md
   Yazar notu: içerik MEB Fizik 9 s. 59–63 ve 117'den; "okuldan 200 metre" mesajı ve benzetim değerleri kurgudur.
   Öğrenciye kitap ya da sayfa anılmaz. Bileşke ve okla toplama C konusunun işidir; burada toplam kuvvet sayı ve yön olarak söylenir.
   Renkler: skaler yeşil, vektörel mor; birinci kişi (kuvvet) mavi, ikinci kişi turuncu; toplam sarı. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, belir, sol, kaybol, par, ok, okCiz, kart, kutular, sinifla, izgara, insan, araba, yonGulu } = KIT;
  const { lerp, ease } = Ders;
  const SK = RENK.r, VK = RENK.mor, A = RENK.a, B = RENK.b, TOP = RENK.vurgu;
  const gizli = (el) => { [el].flat().forEach((e) => { e.style.opacity = 0; }); return el; };
  const sessiz = (p) => { p.catch(() => {}); };
  /* Oku sıfır boydan başlatıp ucuna doğru çizer (çizilmeden önce tam boy görünmesin). */
  const ciz = (c, g, ms) => { const u = g.uclar; g.ayarla(u[0], u[1], u[0], u[1]); g.uclar = u; return okCiz(c, g, ms); };
  const vurgula = (c, el) => c.tween(500, (e) => el.setAttribute('stroke-width', 3 + 4 * Math.sin(e * Math.PI)), ease.linear);
  /* Parçaları sırayla açılan tek satır yazı: t.ac(i) i. parçayı görünür yapar. */
  function parcali(c, p, x, y, parcalar, o) {
    const t = yazi(c, p, x, y, '', o);
    t.innerHTML = parcalar.map((m) => `<tspan style="fill-opacity:0">${m}</tspan>`).join(' ');
    t.ac = (i) => c.tween(350, (e) => { t.children[i].style.fillOpacity = e; });
    return t;
  }
  /* Doğu–batı yön oku: ortası (x, y). */
  function yonOku(c, p, x, y) {
    const g = c.S('g', {}, p);
    ok(c, g, x, y, x + 56, y, { renk: RENK.soluk, kalin: 3, uc: 11 }); ok(c, g, x, y, x - 56, y, { renk: RENK.soluk, kalin: 3, uc: 11 });
    yazi(c, g, x - 66, y + 8, 'batı', { size: 24, renk: RENK.soluk, hiza: 'end' }); yazi(c, g, x + 66, y + 8, 'doğu', { size: 24, renk: RENK.soluk, hiza: 'start' });
    return g;
  }

  /* ---- Sahne 1 · Sayı ve birim yetiyor ---- */
  async function yeter(c) {
    const svg = c.svg(1000, 562), IX = 230, TABAN = 384;
    const is = gizli(c.S('g', {}, svg));
    const su = c.S('rect', { x: IX - 67, y: TABAN, width: 134, height: 0, fill: A, opacity: 0.6 }, is);
    const akis = c.S('line', { x1: IX - 38, y1: 92, x2: IX - 38, y2: TABAN, stroke: A, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0 }, is);
    yol(c, is, `M ${IX - 70} 168 L ${IX - 70} ${TABAN} L ${IX + 70} ${TABAN} L ${IX + 70} 168`, { renk: RENK.yazi, kalin: 5 });
    yol(c, is, `M ${IX - 70} 176 L ${IX - 96} 160 L ${IX - 70} 166`, { renk: RENK.yazi, kalin: 4 });
    yol(c, is, `M ${IX + 70} 196 Q ${IX + 124} 200 ${IX + 122} 268 Q ${IX + 120} 330 ${IX + 70} 334`, { renk: RENK.yazi, kalin: 7 });
    kutu(c, is, IX - 84, TABAN + 4, 168, 22, { rx: 8, renk: RENK.cizgi });
    cizgi(c, is, IX + 70, 166, IX + 14, 100, { renk: RENK.yazi, kalin: 6 }); c.S('circle', { cx: IX + 50, cy: 124, r: 8, fill: RENK.yazi }, is); // açık kapak
    [60, 120, 180].forEach((h) => cizgi(c, is, IX + 44, TABAN - h, IX + 66, TABAN - h, { renk: RENK.soluk, kalin: 3 }));
    const dok = (h1, h2, ms) => c.tween(ms, (e, t) => {
      const h = lerp(h1, h2, e);
      su.setAttribute('y', TABAN - h); su.setAttribute('height', h); akis.setAttribute('y2', TABAN - h);
      akis.setAttribute('opacity', t < 0.9 ? 0.85 : 0.85 * (1 - t) / 0.1);
    }, ease.inOut);
    const e1 = parcali(c, svg, IX + 10, 478, ['1 L', '+ 0,5 L', '= 1,5 L'], { size: 34 });
    await belir(c, is);
    await c.say('Her ölçümün bir sayı ve bir birimden oluştuğunu biliyorsun.');
    await par(c.say('Sevinç Hanım kahvaltı için ısıtıcıya bir litre su koyuyor.'), dok(0, 120, 1800).then(() => e1.ac(0)));
    await par(c.say('Yetmeyeceğini düşünüp yarım litre daha ekliyor.'), dok(120, 180, 1400).then(() => e1.ac(1)));
    await e1.ac(2);
    await c.say('Isıtıcıdaki suyun hacmi için iki sayıyı toplarız: 1,5 litre.', { speak: 'Isıtıcıdaki suyun hacmi için iki sayıyı toplarız: bir buçuk litre.' });

    // Pazar filesi
    const FX = 770, file = gizli(c.S('g', {}, svg));
    [[-34, 330, SK], [8, 344, SK], [-12, 296, SK], [40, 306, B], [26, 262, B]].forEach(([dx, y, renk]) => c.S('circle', { cx: FX + dx, cy: y, r: 27, fill: renk, opacity: 0.85 }, file));
    yol(c, file, `M ${FX - 74} 226 Q ${FX - 92} 392 ${FX} 392 Q ${FX + 92} 392 ${FX + 74} 226 Z`, { renk: RENK.yazi, kalin: 4 });
    [-40, 0, 40].forEach((dx) => yol(c, file, `M ${FX + dx} 226 Q ${FX + dx * 1.3} 320 ${FX + dx * 0.7} 390`, { renk: RENK.soluk, kalin: 2 }));
    [270, 320, 362].forEach((y) => yol(c, file, `M ${FX - 80 + (y - 226) * 0.02} ${y} Q ${FX} ${y + 14} ${FX + 80 - (y - 226) * 0.02} ${y}`, { renk: RENK.soluk, kalin: 2 }));
    yol(c, file, `M ${FX - 50} 226 Q ${FX - 40} 150 ${FX - 6} 226 M ${FX + 6} 226 Q ${FX + 40} 150 ${FX + 50} 226`, { renk: RENK.yazi, kalin: 4 });
    const e2 = parcali(c, svg, FX, 478, ['3 kg', '+ 2 kg', '= 5 kg'], { size: 34 });
    await belir(c, file);
    await par(e2.ac(0), e2.ac(1));
    await c.say('Pazardan üç kilogram sebze, iki kilogram meyve alan birini düşün.');
    await e2.ac(2);
    await c.say('Taşıyacağı toplam kütle beş kilogramdır.');
    const cz = [IX + 10, FX].map((x) => c.S('line', { x1: x - 150, y1: 496, x2: x + 150, y2: 496, stroke: SK, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0 }, svg));
    await belir(c, cz);
    await c.say('İki örnekte de sayı ve birim, toplamı bulmaya yetti.');

    // Termometre: 0 °C y = 334, 100 °C y = 154
    const TX = 470, ty = (d) => 334 - d * 1.8, tr = gizli(c.S('g', {}, svg));
    kutu(c, tr, TX - 11, 134, 22, 216, { rx: 11, renk: RENK.yazi, fill: RENK.koyu });
    c.S('circle', { cx: TX, cy: 358, r: 19, fill: RENK.kotu, stroke: RENK.yazi, 'stroke-width': 3 }, tr);
    const civa = cizgi(c, tr, TX, 350, TX, ty(20), { renk: RENK.kotu, kalin: 10 });
    for (let d = 0; d <= 100; d += 20) cizgi(c, tr, TX + 11, ty(d), TX + 22, ty(d), { renk: RENK.soluk, kalin: 2 });
    yazi(c, tr, TX + 34, ty(20) + 10, '20 °C', { size: 28, hiza: 'start' });
    ok(c, tr, TX + 48, ty(30) - 4, TX + 48, ty(64), { renk: RENK.kotu, kalin: 4, uc: 12 });
    yazi(c, tr, TX + 64, ty(46), '+70 °C', { size: 28, hiza: 'start', renk: RENK.kotu });
    await belir(c, tr);
    await c.choice({ tag: 'Uygula', q: 'Isıtıcıdaki su 20 °C idi; ısıtıcı çalışınca sıcaklığı 70 °C arttı. Suyun son sıcaklığı kaç °C oldu?', options: ['50 °C', '70 °C', '90 °C'], answer: 2,
      hints: ['Sıcaklık azalmadı, arttı; artışı ilk değere eklemelisin.', '70 °C artış miktarıdır; su zaten 20 °C idi.', ''],
      right: 'Evet. 20 + 70 = 90.' });
    const son = gizli(yazi(c, svg, TX + 34, ty(90) + 10, '90 °C', { size: 28, hiza: 'start', renk: TOP }));
    await par(c.tween(900, (e) => civa.setAttribute('y2', ty(lerp(20, 90, e))), ease.inOut), belir(c, son, 900));
    await c.say('Yirmiye yetmiş eklenir: doksan derece Celsius.', { speak: 'Yirmiye yetmiş eklenir: doksan derece selsiyus.' });
    await c.say('Hacimde, kütlede ve sıcaklıkta “hangi yöne” diye sormak gerekmedi.');
  }

  /* ---- Sahne 2 · Bir şey eksik ---- */
  async function eksik(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg), OX = 640, OY = 292, R = 180;
    // Telefon
    const tel = gizli(c.S('g', {}, g1));
    kutu(c, tel, 30, 96, 290, 340, { rx: 30, renk: RENK.yazi });
    cizgi(c, tel, 150, 120, 200, 120, { renk: RENK.soluk, kalin: 5 });
    c.S('rect', { x: 48, y: 160, width: 254, height: 100, rx: 18, fill: '#2a3766' }, tel);
    const m1 = yazi(c, tel, 175, 202, 'Okuldan 200', { size: 26 }), m2 = yazi(c, tel, 175, 238, 'metre uzaktayım.', { size: 26 });
    // Okul
    const okul = gizli(c.S('g', {}, g1));
    kutu(c, okul, OX - 36, OY - 22, 72, 44, { rx: 3, renk: RENK.yazi });
    yol(c, okul, `M ${OX - 44} ${OY - 22} L ${OX} ${OY - 52} L ${OX + 44} ${OY - 22}`, { renk: RENK.yazi });
    kutu(c, okul, OX - 8, OY - 2, 16, 24, { rx: 2, renk: RENK.yazi, kalin: 2 });
    cizgi(c, okul, OX, OY - 52, OX, OY - 76, { renk: RENK.yazi, kalin: 2 }); c.S('path', { d: `M ${OX} ${OY - 76} L ${OX + 20} ${OY - 69} L ${OX} ${OY - 62} Z`, fill: RENK.kotu }, okul);
    yazi(c, okul, OX, OY + 50, 'okul', { size: 22, renk: RENK.soluk });
    const gul = gizli(yonGulu(c, g1, 930, 78, { r: 26 }));
    const ark = gizli(c.S('g', {}, g1)); insan(c, ark, 0, 0, { s: 0.6, renk: B });
    const arkKoy = (x) => ark.setAttribute('transform', `translate(${x} ${OY + 26})`);
    arkKoy(OX - 62);
    // 200 m çemberi
    const cevre = 2 * Math.PI * R;
    const cember = c.S('circle', { cx: OX, cy: OY, r: R, fill: 'none', stroke: RENK.soluk, 'stroke-width': 3, 'stroke-dasharray': cevre, 'stroke-dashoffset': cevre, transform: `rotate(-90 ${OX} ${OY})` }, g1);
    const yari = gizli(c.S('g', {}, g1));
    cizgi(c, yari, OX + 46, OY, OX + R - 12, OY, { renk: RENK.soluk, kalin: 3, kesik: '8 8' });
    yazi(c, yari, OX + 112, OY - 38, '200 m', { size: 24, renk: RENK.soluk });
    const noktalar = Array.from({ length: 12 }, (_, k) => {
      const a = k * Math.PI / 6;
      return gizli(c.S('circle', { cx: OX + R * Math.cos(a), cy: OY - R * Math.sin(a), r: 10, fill: TOP }, g1));
    });
    await par(belir(c, tel), belir(c, okul), belir(c, gul));
    await c.say('Kaybolan arkadaşına şöyle yazdın: “Okuldan 200 metre uzaktayım.”', { speak: 'Kaybolan arkadaşına şöyle yazdın: Okuldan iki yüz metre uzaktayım.' });
    await belir(c, ark);
    await c.say('Arkadaşın okula geldi ama seni göremedi.');
    await c.tween(900, (e) => cember.setAttribute('stroke-dashoffset', cevre * (1 - e)), ease.inOut);
    await belir(c, yari, 250);
    await par(c.say('Çünkü okuldan 200 metre uzakta sayısız nokta vardır.', { speak: '[thoughtful] Çünkü okuldan iki yüz metre uzakta sayısız nokta vardır.' }),
      c.tween(3600, (e, t) => noktalar.forEach((n, k) => { n.style.opacity = 0.25 + 0.75 * Math.max(0, Math.sin(2 * Math.PI * (t * 3 - k / 12))); }), ease.linear)
        .then(() => belir(c, noktalar, 300)));
    await c.choice({ tag: 'Düşün', q: 'Arkadaşının seni bulması için mesajına ne eklemelisin?', options: ['Daha kesin bir sayı', 'Başka bir birim', 'Okulun hangi yönünde olduğunu'], answer: 2,
      hints: ['200 metre zaten yeterince kesin; eksik olan yöndür.', 'Metre yerine başka birim yazmak yerini belli etmez.', ''],
      right: 'Evet. Eksik olan yöndür.' });
    await par(kaybol(c, noktalar.slice(1), 400), sol(c, [m1, m2], 0, 300));
    m1.textContent = 'Okulun 200 metre'; m2.textContent = 'doğusundayım.';
    noktalar[0].setAttribute('fill', SK);
    await par(belir(c, [m1, m2], 300), c.tween(500, (e) => noktalar[0].setAttribute('r', 10 + 5 * e)));
    await par(c.say('“Okulun 200 metre doğusundayım” yazsaydın seni hemen bulurdu.', { speak: 'Okulun iki yüz metre doğusundayım yazsaydın seni hemen bulurdu.' }),
      c.tween(1800, (e) => arkKoy(lerp(OX - 62, OX + R - 34, e)), ease.inOut));
    await kaybol(c, g1, 400);

    // Düz yol, iki araç
    const g2 = gizli(c.S('g', { transform: 'translate(0 40)' }, svg)), X0 = 500;
    c.S('rect', { x: 40, y: 236, width: 920, height: 156, rx: 8, fill: '#1b2540' }, g2);
    cizgi(c, g2, 50, 314, 950, 314, { renk: RENK.soluk, kalin: 3, kesik: '22 18' });
    cizgi(c, g2, X0, 228, X0, 400, { renk: RENK.yazi, kalin: 2, kesik: '6 6' });
    yonOku(c, g2, 500, 70);
    const arac = (y, renk, yon) => {
      const g = c.S('g', {}, g2); araba(c, g, 0, 0, { renk, s: 1.05 });
      const et = gizli(yazi(c, g2, X0, yon > 0 ? y - 86 : y + 44, '60 km/h', { size: 28, renk }));
      const koy = (x) => { g.setAttribute('transform', `translate(${x} ${y}) scale(${yon} 1)`); et.setAttribute('x', x); };
      koy(X0);
      return { g, et, koy, y, renk, yon };
    };
    const a1 = arac(302, A, 1), a2 = arac(380, B, -1);
    await belir(c, g2);
    await c.say('Şimdi yan yana duran iki araca bak.');
    await belir(c, [a1.et, a2.et]);
    await c.say('İkisi de aynı anda, 60 km/h büyüklüğünde hızla yola çıkıyor.', { speak: 'İkisi de aynı anda, altmış kilometre bölü saat büyüklüğünde hızla yola çıkıyor.' });
    await par(c.say('Düz yolda eşit süre gidiyorlar ama farklı yerlere varıyorlar.'),
      c.tween(2600, (e) => { a1.koy(X0 + 320 * e); a2.koy(X0 - 320 * e); }, ease.inOut));
    const o1 = ok(c, g2, X0 + 10, 262, X0 + 262, 262, { renk: A, kalin: 5, uc: 14 }), o2 = ok(c, g2, X0 - 10, 340, X0 - 262, 340, { renk: B, kalin: 5, uc: 14 });
    await par(ciz(c, o1), ciz(c, o2));
    await c.say('Çünkü biri doğuya, öbürü batıya gitti.');
    a1.et.textContent = '60 km/h, doğu'; a2.et.textContent = '60 km/h, batı';
    await c.say('Hızı anlatmak için sayı ve birim yetmedi; yön de gerekti.');
  }

  /* ---- Sahne 3 · Aynı iki kuvvet, iki ayrı sonuç ---- */
  function kanepe(c, p) { // (0, 0): taban ortası
    const g = c.S('g', {}, p), k = { renk: RENK.yazi };
    kutu(c, g, -100, -116, 200, 66, { ...k, rx: 18, fill: '#2a3766' });
    kutu(c, g, -100, -62, 200, 46, { ...k, rx: 10, fill: '#33427a' });
    kutu(c, g, -116, -86, 32, 72, { ...k, rx: 13, fill: '#2a3766' }); kutu(c, g, 84, -86, 32, 72, { ...k, rx: 13, fill: '#2a3766' });
    cizgi(c, g, -92, -14, -92, 0, { ...k, kalin: 6 }); cizgi(c, g, 92, -14, 92, 0, { ...k, kalin: 6 });
    return g;
  }
  /* Yaslanıp iten kişi. x: ayakların ortası, yon: 1 doğuya iter, kol: uzanan kolun boyu. */
  function itici(c, p, x, yon, renk, o = {}) {
    const g = c.S('g', {}, p), k = { renk, kalin: 5 }, dy = o.dy || 0, kol = o.kol || 44;
    daire(c, g, x + 20 * yon, dy - 94, 12, { ...k, fill: RENK.koyu });
    yol(c, g, `M ${x + 15 * yon} ${dy - 81} L ${x - 4 * yon} ${dy - 38} L ${x - 26 * yon} ${dy} M ${x - 4 * yon} ${dy - 38} L ${x + 10 * yon} ${dy}`, k);
    yol(c, g, `M ${x + 12 * yon} ${dy - 72} L ${x + kol * yon} ${dy - 64}`, k);
    return g;
  }
  async function kanepeSahne(c) {
    const svg = c.svg(1000, 562), G = 452, OLCEK = 2.4;
    cizgi(c, svg, 40, G + 2, 960, G + 2, { kalin: 4 });
    yonOku(c, svg, 850, 56);
    const sonuc = gizli(yazi(c, svg, 500, 150, '', { size: 42, renk: TOP }));
    const yaz = async (m) => { sonuc.style.opacity = 0; sonuc.textContent = m; await belir(c, sonuc); };
    /* İki kişi ve kanepe tek grupta durur; grup kayınca hepsi birlikte kayar. yonB: ikinci kişinin ittiği yön. */
    let takim = null;
    const kur = (fa, fb, yonB) => {
      const g = gizli(c.S('g', {}, svg));
      g.kisiler = c.S('g', {}, g);
      if (yonB > 0) itici(c, g.kisiler, -214, 1, B, { dy: 14, kol: 100 });
      itici(c, g.kisiler, -160, 1, A);
      if (yonB < 0) itici(c, g.kisiler, 160, -1, B);
      kanepe(c, g);
      g.oklar = c.S('g', {}, g);
      g.okA = ok(c, g.oklar, 0, -150, fa * OLCEK, -150, { renk: A });
      g.okB = ok(c, g.oklar, 0, -196, fb * OLCEK * yonB, -196, { renk: B });
      yazi(c, g.oklar, fa * OLCEK + 14, -141, fa + ' N', { size: 28, renk: A, hiza: 'start' });
      yazi(c, g.oklar, (fb * OLCEK + 14) * yonB, -187, fb + ' N', { size: 28, renk: B, hiza: yonB > 0 ? 'start' : 'end' });
      g.x0 = yonB > 0 ? 390 : 480; // aynı yönde itilince kanepe doğuya uzun kayar
      g.koy = (x) => g.setAttribute('transform', `translate(${x} ${G})`);
      g.koy(g.x0);
      return g;
    };
    const degis = async (fa, fb, yonB) => {
      const eski = takim; takim = kur(fa, fb, yonB);
      await par(eski ? kaybol(c, eski, 300) : [], sol(c, sonuc, 0, 300));
      await belir(c, takim, 350);
    };
    const kay = (d, ms) => c.tween(ms, (e) => takim.koy(takim.x0 + d * e), ease.inOut);

    takim = kur(60, 40, 1); gizli(takim.oklar);
    const bas = gizli(c.S('g', {}, takim));
    yazi(c, bas, -118, -128, '60 N', { size: 28, renk: A, hiza: 'start' }); yazi(c, bas, -216, -110, '40 N', { size: 28, renk: B, hiza: 'end' });
    await belir(c, takim);
    await c.say('Yerde duran bir kanepeyi iki kişi itiyor.');
    await belir(c, bas);
    await c.say('Biri 60 newton, öbürü 40 newton büyüklüğünde kuvvet uyguluyor.', { speak: 'Biri altmış newton, öbürü kırk newton büyüklüğünde kuvvet uyguluyor.' });
    await kaybol(c, bas, 250);
    takim.oklar.style.opacity = 1;
    await par(ciz(c, takim.okA), ciz(c, takim.okB));
    await c.say('İkisi de doğuya doğru iterse kuvvetler birbirine eklenir.');
    await kay(170, 1300);
    await yaz('100 N, doğu');
    await c.say('Kanepeye etki eden toplam kuvvet 100 newton olur; yönü doğudur.', { speak: 'Kanepeye etki eden toplam kuvvet yüz newton olur; yönü doğudur.' });
    await degis(60, 40, -1);
    await c.say('Şimdi biri doğuya, öbürü batıya doğru itsin.');
    await c.choice({ tag: 'Tahmin et', q: 'Biri doğuya 60 N, öbürü batıya 40 N ile itiyor. Kanepeye etki eden toplam kuvvet ne olur?', options: ['100 N', '20 N, doğuya', '20 N, batıya'], answer: 1,
      hints: ['Kuvvetler zıt yönde; birbirine eklenmez, biri ötekini azaltır.', '', 'Doğuya iten kuvvet daha büyük; kanepe doğuya gider.'],
      right: 'Evet. Şimdi kanepeyi izle.' });
    await kay(56, 2400);
    await yaz('20 N, doğu');
    await c.say('Zıt yönlü kuvvetlerde büyük olandan küçük olan çıkar: 20 newton.', { speak: 'Zıt yönlü kuvvetlerde büyük olandan küçük olan çıkar: [short pause] yirmi newton.' });
    await c.say('Toplam kuvvet, büyük olan kuvvetin yönündedir: doğu.');
    await c.say('Sayılar aynı kaldı ama yön değişince sonuç değişti.');

    // Dene: üç durum; önce tahmin, sonra kanepe
    const SEC = ['80 N, doğuya', '20 N, doğuya', '20 N, batıya'];
    const durumlar = [
      { fa: 50, fb: 30, yonB: 1, q: 'Biri doğuya 50 N, öbürü de doğuya 30 N ile itiyor. Toplam kuvvet ne olur?', sec: SEC, dogru: 0,
        ipucu: ['', 'İkisi de aynı yöne itiyor; kuvvetler birbirine eklenir.', 'İkisi de doğuya itiyor; toplam da doğuya olur.'], kayma: 140, ms: 1400, sonuc: '80 N, doğu' },
      { fa: 50, fb: 30, yonB: -1, q: 'Biri doğuya 50 N, öbürü batıya 30 N ile itiyor. Toplam kuvvet ne olur?', sec: SEC, dogru: 1,
        ipucu: ['Kuvvetler zıt yönde; büyük olandan küçük olan çıkar.', '', 'Doğuya iten kuvvet daha büyük; toplam doğuya olur.'], kayma: 56, ms: 2400, sonuc: '20 N, doğu' },
      { fa: 40, fb: 40, yonB: -1, q: 'Biri doğuya 40 N, öbürü batıya 40 N ile itiyor. Kanepe ne yapar?', sec: ['Doğuya kayar.', 'Batıya kayar.', 'Yerinde kalır.'], dogru: 2,
        ipucu: ['İki kuvvet eşit; doğuya iten daha büyük değil.', 'İki kuvvet eşit; batıya iten daha büyük değil.', ''], kayma: 0, ms: 1200, sonuc: 'yerinde kalır' },
    ];
    await degis(50, 30, 1);
    await c.say('Toplam kuvveti tahmin et, sonra kanepeyi izle.', { noWait: true });
    for (const [i, d] of durumlar.entries()) {
      if (i) await degis(d.fa, d.fb, d.yonB);
      await c.choice({ tag: 'Tahmin et', q: d.q, options: d.sec, answer: d.dogru, hints: d.ipucu, right: 'Evet. Şimdi kanepeyi izle.' });
      if (d.kayma) await kay(d.kayma, d.ms);
      else await c.tween(d.ms, (e, t) => takim.koy(takim.x0 + 3 * Math.sin(t * Math.PI * 8) * (1 - t)), ease.linear);
      await yaz(d.sonuc);
      await c.wait(500);
    }
    await c.say('Kuvvetler eşit ve zıt yönlüyse kanepe olduğu yerde kalır.');
  }

  /* ---- Sahne 4 · İki tür nicelik ---- */
  async function ikiTur(c) {
    const svg = c.svg(1000, 562), SX = 265, VX = 735;
    const cer = gizli([60, 530].map((x) => kutu(c, svg, x, 40, 410, 440)));
    const bs = gizli(c.S('g', {}, svg)), bv = gizli(c.S('g', {}, svg));
    yazi(c, bs, SX, 90, 'Skaler', { size: 32, renk: SK }); yazi(c, bs, SX, 128, 'sayı + birim', { size: 26, renk: SK });
    yazi(c, bv, VX, 90, 'Vektörel', { size: 32, renk: VK }); yazi(c, bv, VX, 128, 'sayı + birim + yön', { size: 26, renk: VK });
    const sk = gizli(['5 kg', '1,5 L', '90 °C'].map((m, i) => kart(c, svg, SX - 110, 176 + i * 90, 220, 64, m, { size: 30 })));
    const vk = gizli([['60 N, doğu', 1], ['60 km/h, batı', -1]].map(([m, yon], i) => {
      const g = c.S('g', {}, svg), y = 206 + i * 120;
      kart(c, g, VX - 170, y, 250, 64, m, { size: 30 });
      ok(c, g, VX + 135 - 30 * yon, y + 32, VX + 135 + 30 * yon, y + 32, { renk: VK, kalin: 5, uc: 14 });
      return g;
    }));
    await belir(c, [...cer, ...sk, ...vk]);
    await c.say('Gördüğümüz nicelikler iki ayrı biçimde davrandı.');
    await vurgula(c, cer[0]);
    await c.say('Kütle, hacim ve sıcaklık bir sayı ve bir birimle tam anlatıldı.');
    cer[0].setAttribute('stroke', SK); await belir(c, bs);
    await c.say('Böyle niceliklere skaler nicelik denir.');
    await vurgula(c, cer[1]);
    await c.say('Kuvvette ve hızda sayı ve birimin yanında yön de gerekti.');
    cer[1].setAttribute('stroke', VK); await belir(c, bv);
    await c.say('Böyle niceliklere vektörel nicelik denir.');
    await kaybol(c, sk, 300);
    const top = gizli(yazi(c, svg, SX, 300, '3 kg + 2 kg = 5 kg', { size: 36 }));
    await belir(c, top);
    await c.say('Skaler nicelikler toplanırken sayılar doğrudan toplanır.');
    await kaybol(c, vk, 300);
    /* İki küçük ok çifti: üstte aynı yönlü, altta zıt yönlü. k: ok boyu ölçeği. */
    const ciftler = (fa, fb, k, s1, s2) => {
      const g = gizli(c.S('g', {}, svg)), x = 560;
      ok(c, g, x, 250, x + fa * k, 250, { renk: A }); ok(c, g, x + fa * k + 16, 250, x + fa * k + 16 + fb * k, 250, { renk: B });
      ok(c, g, x, 370, x + fa * k, 370, { renk: A }); ok(c, g, x + fa * k + 16 + fb * k, 370, x + fa * k + 16, 370, { renk: B });
      yazi(c, g, 860, 260, s1, { size: 32, renk: TOP }); yazi(c, g, 860, 380, s2, { size: 32, renk: TOP });
      return g;
    };
    let cift = ciftler(60, 40, 1.9, '100 N', '20 N');
    await belir(c, cift);
    await c.say('Vektörel nicelikler toplanırken yönlere de bakılır.');
    await c.choice({ tag: 'Düşün', q: 'Bir sandığa 30 N ve 40 N büyüklüğünde iki kuvvet etki ediyor. Toplam kuvvet için ne söylenebilir?',
      options: ['Kesinlikle 70 N’dır.', 'Kesinlikle 10 N’dır.', 'Yönler bilinmeden söylenemez; 70 N da olabilir, 10 N da.'], answer: 2,
      hints: ['Kuvvet kütle gibi toplanmaz; zıt yönlü iseler 10 N eder.', 'Aynı yönlü iseler 70 N eder; önce yönleri bilmek gerekir.', ''],
      right: 'Evet. Önce yönleri bilmek gerekir.' });
    await kaybol(c, cift, 300);
    cift = ciftler(30, 40, 2.6, '70 N', '10 N');
    await belir(c, cift);
    await c.say('Aynı yönde iterlerse 70, zıt yönde iterlerse 10 newton eder.', { speak: 'Aynı yönde iterlerse yetmiş, zıt yönde iterlerse on newton eder.' });
    await vurgula(c, cer[1]);
    await c.say('Kuvveti kütle gibi toplamak, en sık yapılan hatadır.', { speak: '[thoughtful] Kuvveti kütle gibi toplamak, en sık yapılan hatadır.' });
    c.note('<b>Skaler: sayı ve birim. Vektörel: sayı, birim ve yön.</b><br>5 kg skaler; doğuya 60 N vektörel', 'Skaler ve vektörel', 'skaler-vektorel');
  }

  /* ---- Sahne 5 · Hangisi skaler, hangisi vektörel? ---- */
  async function hangisi(c) {
    const svg = c.svg(1000, 562);
    const soru = gizli(yazi(c, svg, 500, 330, '?', { size: 190, renk: TOP, kalin: 700 }));
    await belir(c, soru);
    await c.say('Bir niceliğin türünü anlamak için tek bir soru yeter.');
    await kaybol(c, soru, 250);
    const baslik = gizli(kart(c, svg, 320, 14, 360, 58, 'Yön gerekir mi?', { renk: TOP, size: 30, yaziRenk: TOP }));
    await belir(c, baslik);
    await c.say('“Bu niceliği anlatırken yön söylemem gerekir mi?”', { speak: '[curious] “Bu niceliği anlatırken yön söylemem gerekir mi?”' });
    const g1 = c.S('g', {}, svg);
    const k1 = gizli(kart(c, g1, 150, 108, 700, 76, 'Suyun yoğunluğu 1.000 kg/m³', { size: 30 }));
    const t1 = gizli(yazi(c, g1, 500, 226, 'skaler', { size: 32, renk: SK }));
    const k2 = gizli(kart(c, g1, 110, 290, 780, 76, 'Rüzgâr kuzeybatı yönünde 12 km/h hızla esiyor', { size: 30 }));
    const t2 = gizli(c.S('g', {}, g1));
    yazi(c, t2, 480, 408, 'vektörel', { size: 32, renk: VK }); ok(c, t2, 596, 414, 556, 374, { renk: VK, kalin: 5, uc: 14 });
    await belir(c, k1);
    await c.say('Suyun yoğunluğu 1.000 kg/m³’tür; yön gerekmez.', { speak: 'Suyun yoğunluğu bin kilogram bölü metreküptür; yön gerekmez.' });
    await belir(c, t1);
    await c.say('Yoğunluk skaler bir niceliktir.');
    await belir(c, k2);
    await c.say('İzmir’de rüzgâr kuzeybatı yönünde, 12 km/h hızla esiyor.', { speak: 'İzmir’de rüzgâr kuzeybatı yönünde, on iki kilometre bölü saat hızla esiyor.' });
    await belir(c, t2);
    await c.say('Rüzgârın hızında yön de söylendi; hız vektörel bir niceliktir.');
    await kaybol(c, g1, 350);
    const KO = { x: 60, y: 92, w: 430, h: 340, bosluk: 20, renkler: [SK, VK], baslikBoy: 28 };
    const kt = kutular(c, svg, ['Skaler', 'Vektörel'], KO);
    gizli(kt.g); await belir(c, kt.g, 300);
    for (const ad of ['kütle', 'sıcaklık', 'yoğunluk', 'hacim']) await kt.koy(c, 0, ad);
    await kt.koy(c, 1, 'kuvvet'); await kt.koy(c, 1, 'hız');
    for (const ad of ['uzunluk', 'enerji', 'zaman']) await kt.koy(c, 0, ad);
    await c.say('Zaman, uzunluk ve enerji de yön gerektirmez; onlar da skalerdir.');
    await kaybol(c, kt.g, 350);

    const kd = kutular(c, svg, ['Skaler', 'Vektörel'], KO);
    gizli(kd.g); await belir(c, kd.g, 300);
    await c.say('Altı cümledeki niceliği doğru kutuya koy.', { noWait: true });
    const SI = 'Bu niceliği anlatırken yön söylemek gerekmez.', VI = 'Cümlede yön de söylenmiş; bu nicelik yön ister.';
    await sinifla(c, kd, [
      { ad: 'Yolculuk 6 saat sürdü.', kisa: 'zaman', kutu: 0, neden: 'Zaman: yön gerekmez, skaler.', ipucu: ['', SI] },
      { ad: 'Şişede 1,5 L su var.', kisa: 'hacim', kutu: 0, neden: 'Hacim: yön gerekmez, skaler.', ipucu: ['', SI] },
      { ad: 'Kanepe doğuya doğru 60 N ile itiliyor.', kisa: 'kuvvet', kutu: 1, neden: 'Kuvvet: yön de gerekir, vektörel.', ipucu: [VI, ''] },
      { ad: 'Hava sıcaklığı 21 °C.', kisa: 'sıcaklık', kutu: 0, neden: 'Sıcaklık: yön gerekmez, skaler.', ipucu: ['', SI] },
      { ad: 'Rüzgâr kuzeydoğu yönünde 8,1 m/s hızla esiyor.', kisa: 'hız', kutu: 1, neden: 'Hız: yön de gerekir, vektörel.', ipucu: [VI, ''] },
      { ad: 'Çantanın kütlesi 4 kg.', kisa: 'kütle', kutu: 0, neden: 'Kütle: yön gerekmez, skaler.', ipucu: ['', SI] },
    ], { tag: 'Sıra sende', y: 492, size: 26, soru: (a) => `“${a}”<br>Bu cümledeki nicelik hangi kutuya girer?` });
    const kamyon = gizli(yazi(c, svg, 500, 492, 'kamyon: 20.000 kg', { size: 30, renk: TOP }));
    await belir(c, kamyon);
    await c.choice({ tag: 'Düşün', q: 'Bir kamyonun kütlesi 20.000 kg. Sayı bu kadar büyük olduğuna göre kütle vektörel midir?',
      options: ['Evet; büyük nicelikler vektöreldir.', 'Hayır; yön gerekmediği için skalerdir.', 'Evet; çünkü kamyon hareket eder.'], answer: 1,
      hints: ['Türü sayının büyüklüğü belirlemez; yön gerekip gerekmediği belirler.', '', 'Hareket eden kamyonun hızı yön ister; kütlesi istemez.'],
      right: 'Evet. Kütle yön gerektirmez.' });
    kamyon.style.fill = SK;
    await c.say('Niceliğin türünü sayının büyüklüğü değil, yön gerekip gerekmediği belirler.');
  }

  /* ---- Sahne 6 · Yönsüz tarifle çanta bulunmaz ---- */
  async function canta(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { y: 84, satir: 8, yon: true, olcek: '1 kare = 1 m' });
    gizli(iz.g);
    const izKat = c.S('g', {}, svg), okKat = c.S('g', {}, svg);
    const [cx, cy] = iz.P(9, 4), cantaG = gizli(c.S('g', {}, svg));
    const hale = daire(c, cantaG, cx, cy, 26, { renk: SK, kalin: 4 }); hale.style.opacity = 0;
    kutu(c, cantaG, cx - 15, cy - 13, 30, 30, { rx: 8, renk: B, fill: '#5a3a22' });
    yol(c, cantaG, `M ${cx - 8} ${cy - 13} q 8 -14 16 0`, { renk: B });
    cizgi(c, cantaG, cx - 15, cy, cx + 15, cy, { renk: B, kalin: 2 });
    const oy = gizli(c.S('g', {}, svg));
    insan(c, oy, 0, 0, { s: 0.6 }); cizgi(c, oy, -8, -47, 8, -47, { renk: TOP, kalin: 6 });
    const koy = (i, j) => { const [x, y] = iz.P(i, j); oy.setAttribute('transform', `translate(${x} ${y + 26})`); };
    let pi = 4, pj = 3;
    koy(pi, pj);
    const yuru = (i2, j2, ms = 700) => { const i1 = pi, j1 = pj; pi = i2; pj = j2; return c.tween(ms, (e) => koy(lerp(i1, i2, e), lerp(j1, j2, e)), ease.inOut); };
    const cipler = [300, 500, 700].map((x, i) => {
      const g = gizli(kart(c, svg, x - 95, 14, 190, 54, ['2 m', '1 m', '3 m'][i], { size: 30 }));
      return Object.assign(g, { t: g.querySelector('text'), r: g.querySelector('rect') });
    });
    await par(belir(c, iz.g), belir(c, cantaG), belir(c, oy));
    await c.say('Bir oyunda gözleri bağlı oyuncu, saklanan çantasını arıyor.');
    for (const g of cipler) await belir(c, g, 250);
    await c.say('Arkadaşı yalnızca şunu söylüyor: “2 metre, 1 metre, 3 metre yürü.”', { speak: 'Arkadaşı yalnızca şunu söylüyor: iki metre, bir metre, üç metre yürü.' });
    const rastgele = async () => {
      for (const [i2, j2] of [[4, 5], [3, 5], [3, 2]]) {
        const [x1, y1] = iz.P(pi, pj), [x2, y2] = iz.P(i2, j2);
        await yuru(i2, j2, 900);
        cizgi(c, izKat, x1, y1, x2, y2, { renk: RENK.soluk, kalin: 5, kesik: '4 10' });
      }
    };
    await par(c.say('Oyuncu yürüyor ama çantaya ulaşamıyor.'), rastgele());
    await c.say('Çünkü her adımda hangi yöne gideceğini bilmiyor.', { speak: '[thoughtful] Çünkü her adımda hangi yöne gideceğini bilmiyor.' });
    await par(kaybol(c, izKat, 400), yuru(4, 3, 800));
    await c.say('Arkadaşı bu kez her adımın yönünü de söyleyecek.');

    // Dene: her adım için yön seç
    const YON = { Kuzey: [0, 1], 'Doğu': [1, 0], 'Güney': [0, -1], 'Batı': [-1, 0] }, SEC = ['Kuzey', 'Doğu', 'Güney', 'Batı'];
    const adimlar = [
      [2, 'Doğu', ['Çanta yalnızca bir kare kuzeyde; iki metre kuzey fazla gelir.', '', 'Çanta güneyde değil; oyuncu ondan uzaklaştı.', 'Çanta doğuda; oyuncu ters yöne yürüdü.']],
      [1, 'Kuzey', ['', 'Çanta bir kare kuzeyde; önce o sıraya çıkmalı.', 'Çanta kuzeyde kalıyor; oyuncu ondan uzaklaştı.', 'Çanta doğuda; oyuncu geri döndü.']],
      [3, 'Doğu', ['Çanta aynı sırada, üç kare doğuda.', '', 'Çanta aynı sırada, üç kare doğuda.', 'Çanta doğuda; oyuncu ters yöne yürüdü.']],
    ];
    let nesil = 0;
    await c.say('Her adım için yön seç; oyuncuyu çantaya ulaştır.', { noWait: true });
    for (const [k, [m, dogru, ipucu]] of adimlar.entries()) {
      const i1 = pi, j1 = pj, cip = cipler[k];
      cip.r.setAttribute('stroke', TOP);
      await c.choice({ tag: 'Sıra sende', q: `${k + 1}. adım: <b>${m} metre</b>. Oyuncu hangi yöne yürümeli?`, options: SEC, answer: SEC.indexOf(dogru), hints: ipucu,
        right: `Evet. ${m} metre ${dogru.toLowerCase()}.`,
        onPick: (i, tamam) => {
          const [di, dj] = YON[SEC[i]], n = ++nesil, i2 = i1 + di * m, j2 = j1 + dj * m;
          if (tamam) sessiz(c.tween(700, (e) => { if (n === nesil) koy(lerp(i1, i2, e), lerp(j1, j2, e)); }, ease.inOut));
          else sessiz(c.tween(1500, (e, t) => { if (n !== nesil) return; const u = t < 0.45 ? t / 0.45 : t < 0.6 ? 1 : (1 - t) / 0.4; koy(lerp(i1, i2, u), lerp(j1, j2, u)); }, ease.linear));
        } });
      nesil++;
      const [di, dj] = YON[dogru];
      pi = i1 + di * m; pj = j1 + dj * m; koy(pi, pj);
      const v = iz.vektor(i1, j1, di * m, dj * m, { renk: VK, katman: okKat });
      cip.t.textContent = `${m} m ${dogru.toLowerCase()}`; cip.t.style.fill = VK; cip.r.setAttribute('stroke', VK);
      await ciz(c, v, 400);
    }
    hale.style.opacity = 1;
    await c.tween(700, (e) => hale.setAttribute('r', 26 + 12 * Math.sin(e * Math.PI)), ease.linear);
    await c.say('Aynı üç sayı, yönler söylenince oyuncuyu çantaya götürdü.');
    await c.say('Skaler “ne kadar” der; vektörel “ne kadar ve nereye”.', { speak: 'Skaler “ne kadar” der; [short pause] vektörel “ne kadar ve nereye”.' });
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-b1', kicker: 'Konu B · Skaler ve vektörel nicelikler', title: 'Bazı nicelikler yön ister', accent: '#3ddc97', back: 'index.html',
    intro: { title: 'Bazı nicelikler yön ister', hook: 'Kaybolan arkadaşına “okuldan 200 metre uzaktayım” yazdın; seni bulabilir mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Sayı ve birim yetiyor', goal: 'Sayı ve birimle tam anlatılan nicelikleri gör.', run: yeter },
      { title: 'Bir şey eksik', goal: 'Sayı ve birimin yetmediği durumu fark et.', run: eksik },
      { title: 'Aynı iki kuvvet, iki ayrı sonuç', goal: 'Yön değişince toplam kuvvetin değiştiğini gör.', run: kanepeSahne },
      { title: 'İki tür nicelik', goal: 'Skaler ve vektörel niceliği tanımla.', run: ikiTur },
      { title: 'Hangisi skaler, hangisi vektörel?', goal: 'Bir niceliğin türünü tek soruyla belirle.', run: hangisi },
      { title: 'Yönsüz tarifle çanta bulunmaz', goal: 'Üç adıma yön vererek oyuncuyu çantaya ulaştır.', run: canta },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: '“Bir tekne güneye doğru 5 m/s hızla ilerliyor.” Bu cümledeki nicelik nasıl bir niceliktir?',
        options: ['Skaler; çünkü sayısı ve birimi var.', 'Vektörel; çünkü yönü de söylenmiş.', 'Skaler; çünkü birimi m/s.'], answer: 1,
        why: ['Sayı ve birim vektörel nicelikte de vardır; ayıran yöndür.', 'Hız yön ister; cümlede yön de söylenmiş.', 'Türü birim belirlemez; yön gerekip gerekmediği belirler.'], scene: 4 },
      { q: 'Bir arabayı iki kişi 30 N ve 40 N büyüklüğünde kuvvetlerle itiyor. Ali “Toplam kuvvet kesin 70 N.” diyor. Ali neyi hesaba katmadı?',
        options: ['Kuvvetlerin birimini', 'Arabanın kütlesini', 'Kuvvetlerin yönünü'], answer: 2,
        why: ['İki kuvvetin birimi de newton; sorun birimde değil.', 'Toplam kuvvet için kütle değil, kuvvetlerin yönü gerekir.', 'Aynı yönde 70 N, zıt yönde 10 N eder; yön bilinmeli.'], scene: 3 },
    ],
    summary: ['<b>Skaler “ne kadar” der; vektörel “ne kadar ve nereye”.</b>',
      'Skaler nicelik bir sayı ve bir birimle tam anlatılır: kütle, hacim, sıcaklık, zaman.',
      'Vektörel nicelikte yön de gerekir: kuvvet, hız. Toplarken yönlere bakılır.'],
    nextLesson: { href: 'b2-benzer-ve-ayri.html', label: 'Sonraki: Skaler ile vektörel: nerede benzer, nerede ayrı? ›' },
  });
})();
