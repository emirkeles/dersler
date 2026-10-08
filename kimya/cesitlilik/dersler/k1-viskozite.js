/* K1 — Viskozite: akmaya karşı direnç
   Viskozite, sıvının akmaya karşı gösterdiği dirençtir; akışkanlıkla ters yönde değişir. Saf sıvılar arasında fark vardır
   (su, etil alkol, propanol kolay; etilen glikol zor; gliserin çok zor akar); örüntü OH grubu sayısı ve hidrojen bağıyla açıklanır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/K-viskozite.md (K1). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Benzetimde süre ya da yol için sayı yoktur: kayıt, leke büyüklüğü sırasıdır. Viskozite değerleri yalnızca tablodadır (20 °C, tek üs, ·10⁻³ Pa·s). */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok, cubuk, sinifla } = window.KIT;
  const { GRI, SIVI, sb, birimYaz, lekeIkon, buret, kap, yapi, viskTablo, kayma, bisiklet, kartTahtasi } = window.KIT_K;
  const { lerp } = Ders;

  /* Birim yazılmadan tablo başlığı dışında hiçbir yerde anılmaz. */
  const OHSES = 'o ha';

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    // Soru 1: iki molekül çifti, aralarındaki çekim güçlü ya da zayıf.
    const cift = (g, cx, cy, n, kalin, et) => {
      c.S('circle', { cx: cx - 78, cy, r: 30, fill: GRI.molekul }, g); c.S('circle', { cx: cx + 78, cy, r: 30, fill: GRI.molekul }, g);
      for (let i = 0; i < n; i++) cizgi(c, g, [cx - 44, cy + (i - (n - 1) / 2) * 16], [cx + 44, cy + (i - (n - 1) / 2) * 16], RENK.cekme, kalin, { 'stroke-dasharray': '7 6' });
      yazi(c, g, cx, cy + 82, et, { size: 28, kalin: 700 });
    };
    const g1 = c.S('g', {}, svg);
    cift(g1, 270, 250, 3, 5, 'kuvvetli etkileşim'); cift(g1, 730, 250, 1, 2.5, 'zayıf etkileşim');
    // Soru 2: iki molekül arasında hidrojen bağı.
    const g2 = c.S('g', {}, svg);
    c.S('circle', { cx: 330, cy: 250, r: 48, fill: GRI.molekul }, g2); c.S('circle', { cx: 670, cy: 250, r: 48, fill: GRI.molekul }, g2);
    cizgi(c, g2, [388, 250], [612, 250], RENK.cekme, 5, { 'stroke-dasharray': '8 7' });
    yazi(c, g2, 500, 232, 'hidrojen bağı', { size: 30, kalin: 700, renk: RENK.cekme });
    gizle(g1, g2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 600));
    await c.choice({
      tag: 'Hatırla', q: 'İki sıvı aynı dış basınçta kaynıyor; birinin molekülleri arasındaki etkileşim daha kuvvetli. Hangisi daha yüksek sıcaklıkta kaynar?',
      options: ['İkisi aynı sıcaklıkta kaynar', 'Etkileşimi kuvvetli olan', 'Etkileşimi zayıf olan'], answer: 1,
      hints: ['Etkileşim güçlendikçe moleküller zor ayrılır; kaynama noktası yükselir.', '', 'Etkileşim güçlendikçe moleküller zor ayrılır; kaynama noktası yükselir.'],
      right: 'Evet. Etkileşim güçlendikçe kaynama noktası yükselir.',
    });
    c.clearSay();
    await belir(c, g1, 400, 0);
    await belir(c, g2, 500, 1);
    await c.choice({
      tag: 'Hatırla', q: 'Hangi bağ, hidrojen bağı kurulabileceğini gösterir?',
      options: ['C–H', 'S–H', 'O–H'], answer: 2,
      hints: ['F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulabilir.', 'F–H, O–H ya da N–H bağı varsa hidrojen bağı kurulabilir.', ''],
      right: 'Evet. O–H bağı hidrojen bağı kurabileceğini gösterir.',
    });
    c.clearSay();
    await belir(c, g2, 400, 0);
    await c.say('Bugün sıvıların ne kadar kolay aktığına bakacağız.');
  }

  /* ---- 2. Bal ve su: viskozite ---- */
  async function balVeSu(c) {
    const svg = c.svg(1000, 562);
    const ZEMIN = 454, PY = 312;
    const zeminG = c.S('g', {}, svg);
    cizgi(c, zeminG, [60, ZEMIN], [940, ZEMIN], RENK.ince, 3);
    cizgi(c, zeminG, [80, PY + 3], [290, PY + 3], RENK.ince, 5); cizgi(c, zeminG, [490, PY + 3], [700, PY + 3], RENK.ince, 5);
    const su = kap(c, svg, { k: 1.25, x: 230, y: PY, zemin: ZEMIN, ton: SIVI.su, akisMs: 650, kalin: 10, havuz: 150 });
    const bal = kap(c, svg, { k: 1.25, x: 640, y: PY, zemin: ZEMIN, ton: SIVI.bal, akisMs: 3700, kalin: 15, havuz: 24 });
    const adlar = c.S('g', {}, svg);
    yazi(c, adlar, 362, 526, 'su', { size: 34, kalin: 700 }); yazi(c, adlar, 772, 526, 'bal', { size: 34, kalin: 700 });
    const cerceve = c.S('g', {}, svg);
    kutu(c, cerceve, 230, 34, 540, 62, { rx: 14, w: 3, renk: RENK.vurgu });
    yazi(c, cerceve, 500, 76, 'viskozite = akmaya karşı direnç', { size: 30, kalin: 700 });
    const vz = yazi(c, svg, 810, 170, 'viskoz sıvı', { size: 28, kalin: 700, renk: RENK.vurgu });
    // Direnç ve akış çubukları (su solda, bal sağda).
    const cubG = c.S('g', {}, svg), gruplar = [];
    [['su', 60, 36, 270], ['bal', 540, 270, 36]].forEach(([ad, x0, dir, ak]) => {
      const g = c.S('g', {}, cubG);
      yazi(c, g, x0 + 150, 170, ad, { size: 38, kalin: 700 });
      yazi(c, g, x0, 244, 'direnç', { hiza: 'start', size: 26, kalin: 600, renk: RENK.soluk });
      yazi(c, g, x0, 316, 'akış', { hiza: 'start', size: 26, kalin: 600, renk: RENK.soluk });
      const bd = cubuk(c, g, x0 + 120, 238, GRI.koyu, { h: 34 }), ba = cubuk(c, g, x0 + 120, 310, '#e3e7f3', { h: 34 });
      gruplar.push({ g, bd, ba, dir, ak });
    });
    const bilgiBal = yazi(c, svg, 730, 400, 'viskozite büyük', { size: 28, kalin: 700, renk: RENK.vurgu });
    const bilgiSu = yazi(c, svg, 250, 400, 'akışkanlık büyük', { size: 28, kalin: 700, renk: RENK.vurgu });
    const ters = c.S('g', {}, svg);
    ok(c, ters, [478, 330], [478, 250], RENK.yazi, 5); ok(c, ters, [522, 250], [522, 330], RENK.yazi, 5);
    yazi(c, ters, 500, 384, 'ters yönde', { size: 26, kalin: 700 });
    gizle(zeminG, su.g, bal.g, adlar, cerceve, vz, cubG, bilgiBal, bilgiSu, ters);

    await par(c.say('Süt, su, bal, pekmez, zeytinyağı: hepsi akar.'), belir(c, [zeminG, su.g, bal.g, adlar], 600));
    await par(c.say('Aynı koşulda hepsi aynı kolaylıkla akmaz.'), su.egil(5200), bal.egil(5200));
    await c.say('Bal, sudan çok daha yavaş akar.');
    await par(c.say('Sıvının akmaya karşı gösterdiği dirence viskozite denir.'), belir(c, cerceve, 500));
    await par(c.say('Viskozitesi büyük sıvıya viskoz sıvı denir.'), belir(c, vz, 500));
    // Çubuklar: kapları ve çerçeveyi soluklaştır.
    await par(belir(c, [zeminG, su.g, bal.g, adlar, cerceve, vz], 450, 0.1), belir(c, cubG, 500));
    await par(c.say('Bal çok direnir: viskozitesi büyüktür.'), (async () => {
      await c.tween(1100, (e) => { gruplar[1].bd.boy(gruplar[1].dir * e); gruplar[1].ba.boy(gruplar[1].ak * e); gruplar[0].bd.boy(gruplar[0].dir * e); gruplar[0].ba.boy(gruplar[0].ak * e); });
      await belir(c, bilgiBal, 450);
    })());
    await par(c.say('Akması kolay sıvının akışkanlığı büyüktür.'), belir(c, bilgiSu, 450));

    await c.choice({
      tag: 'Sıra sende', q: 'Aynı koşulda su ile bal karşılaştırılıyor. Hangisinin viskozitesi büyüktür?',
      options: ['Suyun', 'İkisinin eşit', 'Balın'], answer: 2,
      hints: ['Hangisi daha zor akıyor?', 'Aynı koşulda su, balı geçerek akıyordu; ikisi eşit değil.', ''],
      right: 'Evet. Bal çok direnir; viskozitesi büyüktür.',
    });
    await par(c.say('Direnç büyükse akışkanlık küçüktür: ikisi ters yöndedir.', { speak: '[thoughtful] Direnç büyükse akışkanlık küçüktür: ikisi ters yöndedir.' }), belir(c, ters, 500));
    c.note('<b>Viskozite arttıkça akışkanlık azalır.</b><br>Örnek: bal, su.', 'Viskozite ve akışkanlık', 'viskozite-akiskanlik');
  }

  /* ---- 3. Akış: tanecikler birbiri üzerinde kayar ---- */
  async function akis(c) {
    const svg = c.svg(1000, 562);
    const k1 = kayma(c, svg, { x: 90, y: 70, h: 190, hiz: 'hizli' }), k2 = kayma(c, svg, { x: 570, y: 70, h: 190, hiz: 'yavas' });
    const t1 = yazi(c, svg, 245, 50, 'hızlı kayma', { size: 28, kalin: 700 }), t2 = yazi(c, svg, 725, 50, 'yavaş kayma', { size: 28, kalin: 700 });
    const bis = bisiklet(c, svg, { x: 360, y: 440, fren: true });
    const bt = yazi(c, svg, 360, 540, 'el freni', { size: 26, kalin: 700, renk: RENK.vurgu });
    const vz = yazi(c, svg, 725, 296, 'viskoz sıvı', { size: 28, kalin: 700, renk: RENK.vurgu });
    const kr = c.S('rect', { x: 560, y: 60, width: 330, height: 210, rx: 14, fill: 'none', stroke: RENK.yazi, 'stroke-width': 4 }, svg);
    const bil = c.S('g', {}, svg); // tanecik–bisiklet bağı: kesit 2'den bisiklete ince kesikli çizgi
    cizgi(c, bil, [600, 300], [470, 372], RENK.soluk, 2.5, { 'stroke-dasharray': '4 7' });
    const s1 = yazi(c, svg, 730, 340, 'viskozite büyük', { size: 28, kalin: 700 }), s2 = yazi(c, svg, 730, 378, 'akışkanlık küçük', { size: 28, kalin: 700 });
    gizle(k1.g, k2.g, t1, t2, bis.g, bt, vz, kr, bil, s1, s2);

    await par(c.say('Sıvı akarken tanecikleri birbirinin üzerinde kayar.'), (async () => { await belir(c, k1.g, 500); await k1.kay(2000); })());
    k1.sifirla();
    await par(c.say('Taneciklerin kayması hızlıysa sıvı kolay akar.'), belir(c, t1, 400), k1.kay(2200));
    await par(c.say('Kayma yavaşsa sıvı akmaya direnç gösterir.'), (async () => { await belir(c, [k2.g, t2], 500); await k2.kay(2600); })());
    await par(c.say('El freni çekili bisiklet zor ilerler.'), belir(c, [bis.g, bt], 600));
    await par(c.say('Viskoz sıvıda tanecikler de böyle zor kayar.'), belir(c, [kr, vz, bil], 500));
    c.clearSay();

    await c.choice({
      tag: 'Sıra sende', q: 'Bir sıvının tanecikleri birbirinin üzerinde çok yavaş kayıyor. Bu sıvı için hangisi doğrudur?',
      options: ['Viskozitesi küçük, akışkanlığı büyüktür', 'Viskozitesi ve akışkanlığı büyüktür', 'Viskozitesi büyük, akışkanlığı küçüktür'], answer: 2,
      hints: ['Yavaş kayma, akmaya karşı büyük direnç demektir.', 'Direnç büyükse akışkanlık ne olur?', ''],
      right: 'Evet. Yavaş kayma büyük direnç demektir.',
    });
    await par(c.say('Yavaş kayan taneciklerin sıvısında viskozite büyük, akışkanlık küçüktür.'), belir(c, [s1, s2], 500));
  }

  /* ---- 4. Aynı sürede kim ne kadar akar? ---- */
  async function ayniSurede(c) {
    const svg = c.svg(1000, 562);
    const K = 1.0, ZEMIN = 400, XS = [330, 540, 750];
    const zg = cizgi(c, svg, [260, ZEMIN], [850, ZEMIN], RENK.ince, 3);
    const B = [['su', SIVI.su, 1], ['zeytinyağı', SIVI.zeytinyagi, 2], ['bal', SIVI.bal, 3]].map(([ad, ton, sira], i) => buret(c, svg, { x: XS[i], zemin: ZEMIN, k: K, ad, ton, leke: sira, dizi: 'uc', adSize: 26 }));
    const r1 = yazi(c, svg, 30, 466, 'akışkanlık', { hiza: 'start', size: 24, kalin: 600, renk: RENK.soluk });
    const r2 = yazi(c, svg, 30, 512, 'viskozite', { hiza: 'start', size: 24, kalin: 600, renk: RENK.soluk });
    const ak = ['en çok', 'orta', 'en az'].map((m, i) => yazi(c, svg, XS[i], 466, m, { size: 26, kalin: 700, renk: RENK.vurgu }));
    const vi = ['en az', 'orta', 'en çok'].map((m, i) => yazi(c, svg, XS[i], 512, m, { size: 26, kalin: 700, renk: RENK.vurgu }));
    // ölçülen değerler: tek satırlı tablo (başlıkta birim)
    const tb = c.S('g', {}, svg);
    yazi(c, tb, 30, 476, 'Viskozite', { hiza: 'start', size: 24, kalin: 600, renk: RENK.soluk });
    birimYaz(c, tb, 30, 506, 'start');
    const deg = ['1,01', '81', '2000–10000'].map((m, i) => yazi(c, tb, XS[i], 494, m, { size: 28, kalin: 700, renk: RENK.vurgu }));
    gizle(zg, r1, r2, ak, vi, tb, deg, B.map((b) => b.g));

    await par(c.say('Özdeş üç büretin içinde su, zeytinyağı ve bal var.'), belir(c, [zg, ...B.map((b) => b.g)], 600));
    await par(c.say('Muslukları aynı anda kısa süre açıp kapatıyoruz.'), ...B.map((b) => b.ac(2200)));
    await c.say('Akan sıvı yere yayılıp bir leke bırakır.');
    await par(c.say('Su en geniş, bal en küçük lekeyi bıraktı.'), ...B.map((b) => b.yaricap(500)));
    await par(c.say('Aynı sürede en çok su aktı: en akışkan o.'), belir(c, [r1, ak[0]], 450), B[0].vurgu(true));
    await par(c.say('En az bal aktı: en az akışkan o.'), belir(c, [ak[1], ak[2]], 450), B[0].vurgu(false), B[2].vurgu(true));
    await par(c.say('Viskozite bunun tersidir: önce bal, sonra zeytinyağı, sonra su.', { speak: 'Viskozite bunun tersidir: [short pause] önce bal, sonra zeytinyağı, sonra su.' }), B[2].vurgu(false), belir(c, [r2, ...vi], 450));
    await par(c.say('Bir laboratuvar bu üç sıvının viskozitesini 20 °C’ta ölçmüş.', { speak: 'Bir laboratuvar bu üç sıvının viskozitesini yirmi derecede ölçmüş.' }),
      (async () => { await belir(c, [r1, r2, ...ak, ...vi], 300, 0); await belir(c, tb, 450, 1); })());
    await par(c.say('Ölçülen değerler bu sıralamayı doğrular.'), belir(c, deg, 500, 1));

    // Birlikte çöz: iki büret, etil alkol ve etilen glikol.
    c.clearSay();
    await belir(c, svg, 400, 0);
    svg.remove();
    const s2 = c.svg(1000, 562), Z2 = 420, X2 = [130, 320];
    cizgi(c, s2, [40, Z2], [430, Z2], RENK.ince, 3);
    const B2 = [['etil alkol', SIVI.etil, 1], ['etilen glikol', SIVI.etilenglikol, 4]].map(([ad, ton, sira], i) => buret(c, s2, { x: X2[i], zemin: Z2, k: K, ad: ad.split(' '), ton, leke: sira, dizi: 'bes', adSize: 24 }));
    const T = viskTablo(c, s2, { x: 500, y: 50, w: 460, size: 26 });
    T.satir('etil alkol', '1,20'); T.satir('etilen glikol', '19,83');
    const st = c.S('g', {}, s2);
    yazi(c, st, 490, 262, '1. Viskozitesi büyük olan: etilen glikol', { hiza: 'start', size: 22, kalin: 600 });
    const st2 = yazi(c, st, 490, 312, '2. Aynı sürede daha çok akan: ?', { hiza: 'start', size: 22, kalin: 600 });
    gizle(B2.map((b) => b.g), T.g, st);
    await belir(c, [...B2.map((b) => b.g), T.g, st], 500);
    T.goster(0, 1); T.goster(1, 1); T.yaz(0, 'deger'); T.yaz(1, 'deger');
    await c.choice({
      tag: 'Birlikte çöz', q: 'Aynı sürede hangi sıvı daha çok akar?',
      options: ['Etilen glikol', 'İkisi aynı miktarda', 'Etil alkol'], answer: 2,
      hints: ['19,83 ile 1,20’yi karşılaştır; büyük olanda direnç büyük, akış az.', 'İki viskozite değeri aynı değil.', ''],
      right: 'Evet. Viskozitesi küçük olan daha kolay akar.',
    });
    st2.textContent = '2. Aynı sürede daha çok akan: etil alkol';
    await par(...B2.map((b) => b.ac(2200)));
    await par(c.say('Viskozitesi küçük olan sıvı, aynı sürede daha çok akar.'), ...B2.map((b) => b.yaricap(450)));

    // Yeni durum: dört özdeş büret.
    c.clearSay();
    await belir(c, s2, 400, 0);
    s2.remove();
    const s3 = c.svg(1000, 562), Z3 = 430, X3 = [160, 380, 600, 820];
    cizgi(c, s3, [60, Z3], [940, Z3], RENK.ince, 3);
    const B3 = ['L', 'M', 'K', 'N'].map((ad, i) => buret(c, s3, { x: X3[i], zemin: Z3, k: K, ad, ton: [SIVI.propanol, SIVI.gliserin, SIVI.zeytinyagi, SIVI.su][i], leke: [1, 3, 5, 2][i], dizi: 'bes', adSize: 30 }));
    gizle(B3.map((b) => b.g));
    await belir(c, B3.map((b) => b.g), 500);
    await par(...B3.map((b) => b.ac(2200)));
    await c.choice({
      tag: 'Sıra sende', q: 'Dört özdeş büretin muslukları aynı anda açılıp kapatıldı. K sıvısı en küçük lekeyi bıraktı. K sıvısı için hangisi doğrudur?',
      options: ['Dördü arasında akışkanlığı en büyüktür', 'Dördü arasında viskozitesi en büyüktür', 'Dördü arasında viskozitesi en küçüktür'], answer: 1,
      hints: ['En küçük leke, aynı sürede en az akmak demektir.', '', 'En az akan sıvıda direnç en büyüktür.'],
      right: 'Evet. En az akan sıvının viskozitesi en büyüktür.',
    });
    await par(c.say('K en az aktı: viskozitesi en büyük.'), B3[2].vurgu(true));
  }

  /* ---- 5. Günlük hayatta viskozite ---- */
  async function gunluk(c) {
    const svg = c.svg(1000, 562);
    // Üç çizim: ters çevrilmiş domates sosu şişesi, şampuan şişesi, kavanozdan akan bal.
    const sos = c.S('g', {}, svg), sam = c.S('g', {}, svg), bal = c.S('g', {}, svg);
    const SOS = '#d3b39a', SAM = '#cfc9e0';
    c.S('rect', { x: 118, y: 30, width: 76, height: 96, rx: 14, fill: SOS, 'fill-opacity': 0.9, stroke: GRI.cam, 'stroke-width': 3 }, sos);
    c.S('path', { d: 'M126,126 L186,126 L172,148 L140,148 Z', fill: SOS, 'fill-opacity': 0.9, stroke: GRI.cam, 'stroke-width': 3, 'stroke-linejoin': 'round' }, sos);
    c.S('rect', { x: 138, y: 148, width: 36, height: 12, rx: 3, fill: GRI.alt }, sos);
    c.S('ellipse', { cx: 156, cy: 172, rx: 11, ry: 14, fill: SOS }, sos);
    c.S('rect', { x: 468, y: 66, width: 64, height: 100, rx: 16, fill: SAM, 'fill-opacity': 0.9, stroke: GRI.cam, 'stroke-width': 3 }, sam);
    c.S('rect', { x: 486, y: 46, width: 28, height: 20, rx: 4, fill: GRI.alt }, sam);
    c.S('rect', { x: 508, y: 50, width: 18, height: 8, rx: 3, fill: GRI.alt }, sam);
    const kv = c.S('g', { transform: 'rotate(-28 830 80)' }, bal);
    c.S('rect', { x: 796, y: 42, width: 68, height: 76, rx: 10, fill: SIVI.bal, 'fill-opacity': 0.9, stroke: GRI.cam, 'stroke-width': 3 }, kv);
    c.S('rect', { x: 800, y: 34, width: 60, height: 10, rx: 3, fill: GRI.alt }, kv);
    cizgi(c, bal, [792, 112], [786, 176], SIVI.bal, 9);
    c.S('ellipse', { cx: 785, cy: 184, rx: 9, ry: 12, fill: SIVI.bal }, bal);
    const et = c.S('g', {}, svg);
    yazi(c, et, 156, 212, 'domates sosu', { size: 26, kalin: 700 }); yazi(c, et, 500, 212, 'şampuan', { size: 26, kalin: 700 }); yazi(c, et, 830, 212, 'bal', { size: 26, kalin: 700 });
    gizle(sos, sam, bal, et);
    const kt = kartTahtasi(c, svg, {
      kutular: [{ baslik: 'viskozitesi çok yüksek', x: 60, y: 300, w: 420, h: 244 }, { baslik: 'viskozitesi düşük', x: 520, y: 300, w: 420, h: 244 }],
      ciz: (k, g) => { kutu(c, g, 100, 232, 800, 50, { rx: 12, w: 3, renk: RENK.yazi }); yazi(c, g, 500, 267, k.metin, { size: 26, kalin: 600 }); },
      chip: (k, p, x, y) => yazi(c, p, x, y, k.chip, { size: 26, kalin: 600 }),
    });
    const kutuG = [...svg.querySelectorAll('g')].slice(-2);
    gizle(kutuG);

    await par(c.say('Viskozite günlük hayatta da işe karışır.'), belir(c, [sos, sam, bal, et], 600));
    await c.say('Domates sosunun şişeden çıkışını viskozite belirler.');
    await c.say('Viskozitesi çok yüksek sıvı şişeden uzun sürede akar.');
    await c.say('Akan kısım, şişede kalandan zor kopar.');
    await c.say('Viskozitesi düşük sıvıda miktarı ayarlamak güçleşir.');
    await belir(c, kutuG, 450, 1);
    await c.say('Her kart bir durum; hangi kutuya girer?', { noWait: true });
    await sinifla(c, {
      tag: 'Sınıflandır', soru: (k) => `Kart: “${k.metin}” Hangi kutuya girer?`, kutular: ['Viskozitesi çok yüksek', 'Viskozitesi düşük'],
      kartlar: [
        { metin: 'Şişeden akması uzun sürer', kutu: 0, chip: 'uzun sürer', neden: 'Direnci büyük; akışkanlığı küçük.', ipucu: 'Uzun sürede akan sıvıda direnç büyüktür.' },
        { metin: 'Şişeden çabucak boşalır', kutu: 1, chip: 'çabuk boşalır', neden: 'Akışkanlığı büyük; akma süresi kısa.', ipucu: 'Çabuk akan sıvıda direnç küçüktür.' },
        { metin: 'Akan kısım şişede kalandan zor kopar', kutu: 0, chip: 'zor kopar', neden: 'Tanecikler zor kayar; akış kesilirken de direnir.', ipucu: 'Zor kopan sıvıda tanecikler zor kayar.' },
        { metin: 'Dökülen miktarı ayarlamak güçtür', kutu: 1, chip: 'miktar ayarı güç', neden: 'Çok kolay akar; miktar kontrolü zorlaşır.', ipucu: 'Çok kolay akan sıvıda miktarı ayarlamak güçtür.' },
      ],
      sec: kt.sec, yerlestir: kt.yerlestir,
    });
    await c.say('Viskozite, sıvıların nasıl akıp döküldüğünü belirler.');
  }

  /* ---- 6. Beş saf sıvı, aynı büret ---- */
  async function besSivi(c) {
    const svg = c.svg(1000, 562);
    const K = 0.85, ZEMIN = 452, XS = [75, 193, 311, 429, 547];
    const zg = cizgi(c, svg, [20, ZEMIN], [610, ZEMIN], RENK.ince, 3);
    const SV = [['su', ['su'], SIVI.su, 1], ['etil', ['etil', 'alkol'], SIVI.etil, 2], ['propanol', ['propanol'], SIVI.propanol, 3], ['etilenglikol', ['etilen', 'glikol'], SIVI.etilenglikol, 4], ['gliserin', ['gliserin'], SIVI.gliserin, 5]];
    const B = SV.map(([, ad, ton, sira], i) => buret(c, svg, { x: XS[i], zemin: ZEMIN, k: K, ad, ton, leke: sira, dizi: 'bes', adSize: 22 }));
    const T = viskTablo(c, svg, { x: 620, y: 110, w: 370, leke: true, degerYok: true });
    const ADLAR = ['su', 'etil alkol', 'propanol', 'etilen glikol', 'gliserin'], LEKE = ['iri', 'iri', 'iri', 'orta', 'küçük'], DEGER = ['1,01', '1,20', '1,94', '19,83', '1490'];
    ADLAR.forEach((a, i) => T.satir(a, DEGER[i], LEKE[i]));
    const oklar = c.S('g', {}, svg);
    ok(c, oklar, [80, 98], [570, 98], RENK.yazi, 4);
    yazi(c, oklar, 325, 70, 'leke küçüldükçe viskozite büyür', { size: 26, kalin: 700 });
    gizle(B.map((b) => b.g), zg, T.g, oklar);
    B.forEach((b) => { b.adG.style.opacity = 0; });

    await par(c.say('Şimdi beş saf sıvıyı aynı koşulda deneyelim.'), belir(c, [zg, ...B.map((b) => b.g)], 600));
    await par(c.say('Su, etil alkol, propanol, etilen glikol ve gliserin.'), belir(c, B.map((b) => b.adG), 700, 1));
    await c.say('Muslukları aynı anda açıp aynı süre sonra kapatacağız.');

    // Dene 1: musluklar açılır.
    await c.say('Muslukları aç; lekelerin büyüklüğünü karşılaştır.', { noWait: true });
    await c.cont('Muslukları aç ›');
    await par(...B.map((b) => b.ac(2600)));
    await c.cont('Devam ›');

    // Dene 2: leke büyüklüğüne göre sınıflandır; satır tabloya yazılır.
    await c.say('Lekeleri büyüklüklerine göre ayır.', { noWait: true });
    await belir(c, T.g, 450, 1);
    await sinifla(c, {
      tag: 'Sınıflandır', soru: (k) => `Sıvı: <b>${k.ad}</b>. Lekesi hangi kutuya girer?`, kutular: ['İri leke (çok aktı)', 'Orta leke', 'Küçük leke (az aktı)'],
      kartlar: [
        { ad: 'su', i: 0, kutu: 0, neden: 'Aynı sürede çok aktı.', ipucu: 'Su lekesinin büyüklüğüne bak.' },
        { ad: 'etil alkol', i: 1, kutu: 0, neden: 'Lekesi suyunkine yakın.', ipucu: 'Etil alkolün lekesi suyunkine yakın.' },
        { ad: 'propanol', i: 2, kutu: 0, neden: 'Lekesi bu ikisininkine yakın.', ipucu: 'Propanolün lekesi ilk ikisininkine yakın.' },
        { ad: 'etilen glikol', i: 3, kutu: 1, neden: 'Lekesi ilk üçünden belirgin küçük.', ipucu: 'Etilen glikolün lekesi ilk üçünden belirgin küçük.' },
        { ad: 'gliserin', i: 4, kutu: 2, neden: 'Lekesi en küçük; en az aktı.', ipucu: 'Gliserinin lekesi hepsinden küçük.' },
      ],
      sec: async (i) => { await B[i].vurgu(true, 250); },
      yerlestir: async (i) => { await B[i].vurgu(false, 200); T.yaz(i, 'leke'); await T.goster(i, 350); },
    });
    c.clearSay();

    // Gör: viskozite değerleri tabloya gelir.
    await par(c.say('Bir laboratuvar bu sıvıların viskozitesini 20 °C’ta ölçmüş.', { speak: 'Bir laboratuvar bu sıvıların viskozitesini yirmi derecede ölçmüş.' }), T.degerBasligi(500));
    for (let i = 0; i < 5; i++) { T.yaz(i, 'deger'); await c.wait(450); }
    await par(c.say('Leke küçüldükçe viskozite büyüdü.'), belir(c, oklar, 600));
    await c.say('Gliserin en az aktı; viskozitesi en büyük.');
    await c.say('Su, etil alkol ve propanolün viskoziteleri birbirine yakın ve küçük.');
    await c.choice({
      tag: 'Sıra sende', q: 'Tabloya göre hangisi doğrudur?',
      options: ['Su ile gliserinin akışkanlığı eşittir', 'Etil alkol, etilen glikolden daha az akışkandır', 'Gliserin, etilen glikolden daha az akışkandır'], answer: 2,
      hints: ['Su 1,01, gliserin 1490: değerler çok farklı.', 'Etil alkolün değeri 1,20, etilen glikolünki 19,83.', ''],
      right: 'Evet. Viskozitesi daha büyük olan, daha az akışkandır.',
    });
    await c.say('Gliserinin viskozitesi etilen glikolünkinden çok büyük: daha az akışkandır.');
  }

  /* ---- 7. Yapılara bak: OH grubu sayısı ---- */
  async function yapilar(c) {
    const svg = c.svg(1000, 562), XS = [235, 455, 675, 885];
    const SV = [['etil', 'etil alkol', 2, '1,20'], ['propanol', 'propanol', 3, '1,94'], ['etilenglikol', 'etilen glikol', 4, '19,83'], ['gliserin', 'gliserin', 5, '1490']];
    const ad = c.S('g', {}, svg);
    SV.forEach(([, a], i) => yazi(c, ad, XS[i], 60, a, { size: 28, kalin: 700 }));
    const Y = SV.map(([s], i) => yapi(c, svg, { x: XS[i], y: 132, sivi: s, size: 24, rozetY: 248 }));
    const lk = c.S('g', {}, svg), vz = c.S('g', {}, svg);
    SV.forEach(([, , sira, d], i) => { lekeIkon(c, lk, XS[i], 340, sira, 'bes', 50); yazi(c, vz, XS[i], 420, d, { size: 28, kalin: 700, renk: RENK.vurgu }); });
    yazi(c, vz, 128, 420, 'viskozite', { hiza: 'end', size: 24, kalin: 600, renk: RENK.soluk });
    const yon = ok(c, svg, [200, 490], [920, 490], RENK.yazi, 4);
    gizle(ad, Y.map((y) => y.g), lk, vz, yon.g);

    await par(c.say('Şimdi dört sıvının yapı formülüne bakalım.'), belir(c, [ad, ...Y.map((y) => y.g)], 600));
    await par(c.say('Dördünde de OH grubu var.', { speak: `Dördünde de ${OHSES} grubu var.` }), ...Y.map((y) => belir(c, y.cerceveler, 500, 1)));
    await par(c.say('Etil alkol ve propanolde bir OH var.', { speak: `Etil alkol ve propanolde bir ${OHSES} var.` }), belir(c, [Y[0].rozet, Y[1].rozet], 500));
    await par(c.say('Etilen glikolde iki, gliserinde üç OH var.', { speak: `Etilen glikolde iki, gliserinde üç ${OHSES} var.` }), belir(c, [Y[2].rozet, Y[3].rozet], 500));
    await par(c.say('Aynı sıvıların lekeleri de altlarında.'), belir(c, [lk, vz], 600));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'OH grubu sayısıyla leke büyüklüğü arasında hangi örüntü var?',
      options: ['OH sayısı arttıkça leke büyür', 'OH sayısı ile leke arasında ilişki yok', 'OH sayısı arttıkça leke küçülür'], answer: 2,
      hints: ['Bir, iki, üç OH’lu sıvıların lekelerini sırayla karşılaştır.', 'Lekeler OH sayısına göre sıralanıyor: bir ilişki var.', ''],
      right: 'Evet. OH sayısı arttıkça leke küçülür.',
    });
    await par(c.say('OH sayısı arttıkça akışkanlık azalıyor, viskozite artıyor.', { speak: `${OHSES} sayısı arttıkça akışkanlık azalıyor, viskozite artıyor.` }), belir(c, yon.g, 600));
  }

  /* ---- 8. Neden: hidrojen bağı sayısı ---- */
  async function neden(c) {
    const svg = c.svg(1000, 562), XS = [22, 350, 678];
    const T = [['etil alkol', 1, 'hizli', 'en az'], ['etilen glikol', 2, 'orta', 'orta'], ['gliserin', 3, 'yavas', 'en çok']];
    const K = T.map(([, bag, hiz], i) => kayma(c, svg, { x: XS[i], y: 215, h: 200, bag, hiz }));
    const ad = c.S('g', {}, svg), bg = c.S('g', {}, svg), vz = c.S('g', {}, svg);
    T.forEach(([a, bag, , v], i) => {
      yazi(c, ad, XS[i] + 155, 198, a, { size: 28, kalin: 700 });
      yazi(c, bg, XS[i] + 155, 462, `bağ: ${bag}`, { size: 28, kalin: 700, renk: RENK.cekme });
      yazi(c, vz, XS[i] + 155, 510, v, { size: 26, kalin: 700, renk: RENK.vurgu });
    });
    const cerc = c.S('rect', { x: XS[2] - 8, y: 150, width: 326, height: 330, rx: 14, fill: 'none', stroke: RENK.yazi, 'stroke-width': 4 }, svg);
    // su ve gliserin: iki yapı formülü
    const cift = c.S('g', {}, svg);
    yazi(c, cift, 240, 44, 'su', { size: 26, kalin: 700 }); yazi(c, cift, 700, 44, 'gliserin', { size: 26, kalin: 700 });
    const ys = yapi(c, cift, { x: 240, y: 90, sivi: 'su', size: 26 }), yg = yapi(c, cift, { x: 700, y: 90, sivi: 'gliserin', size: 26 });
    gizle(K.map((k) => k.g), ad, K.map((k) => k.bagG), bg, vz, cerc, cift);

    await par(c.say('Her OH grubu, komşu molekülle hidrojen bağı kurabilir.', { speak: `Her ${OHSES} grubu, komşu molekülle hidrojen bağı kurabilir.` }), belir(c, [...K.map((k) => k.g), ad], 600));
    K.forEach((k) => { k.bagG.style.opacity = 0; });
    await par(c.say('OH sayısı arttıkça hidrojen bağı sayısı da artar.', { speak: `${OHSES} sayısı arttıkça hidrojen bağı sayısı da artar.` }), belir(c, [...K.map((k) => k.bagG), bg], 600, 1));
    await par(c.say('Hidrojen bağı çoksa moleküller birbirinin üzerinden zor kayar.'), ...K.map((k) => k.kay(3000)));
    await par(c.say('Zor kayan moleküllerde akışkanlık azalır, viskozite artar.'), belir(c, vz, 600));
    await par(c.say('Gliserinde hidrojen bağı en çoktur: viskozitesi en büyüktür.'), belir(c, cerc, 450));
    await par(c.say('Su da gliserin de hidrojen bağı kurar; sayıları farklıdır.', { speak: '[thoughtful] Su da gliserin de hidrojen bağı kurar; sayıları farklıdır.' }), belir(c, cerc, 300, 0), belir(c, cift, 600));
    c.clearSay();
    await c.choice({
      tag: 'Sıra sende', q: 'Aynı sıcaklıktaki iki sıvıdan A’nın molekülünde 1, B’nin molekülünde 3 OH grubu var. Hangisi daha akışkandır?',
      options: ['B', 'İkisi eşit', 'A'], answer: 2,
      hints: ['OH sayısı arttıkça hidrojen bağı çoğalır; bağ çoksa moleküller zor kayar.', 'OH sayıları farklı; hidrojen bağı sayıları da farklı olur.', ''],
      right: 'Evet. Az OH’lu sıvıda bağ az, moleküller kolay kayar.',
    });
    await belir(c, cift, 300, 0);
    K.forEach((k) => k.sifirla());
    await par(c.say('Etkileşim büyüdükçe moleküller zor kayar; viskozite büyür.'), belir(c, cerc, 450, 1), ...K.map((k) => k.kay(3000)));
    c.note('<b>Etkileşim büyüdükçe viskozite artar.</b><br>Örnek: gliserin, 3 OH.', 'Etkileşim ve viskozite', 'etkilesim-viskozite');
  }

  Ders.start({
    id: 'cesitlilik-k1', kicker: 'Konu K · Viskozite', title: 'Viskozite: akmaya karşı direnç', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Viskozite: akmaya karşı direnç',
      hook: 'Bal kavanozdan neden sudan çok daha yavaş akar?',
      button: 'Derse başla ›',
    },
    goals: ['Viskoziteyi akmaya karşı direnç olarak tanımlar; akışkanlıkla ters yönde değiştiğini söyler.', 'Aynı sürede akan miktardan sıvıların viskozite sırasını çıkarır.', 'Viskozite farkını OH grubu sayısı ve hidrojen bağı sayısıyla açıklar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Etkileşimin kaynamaya etkisini ve hidrojen bağı ölçütünü hatırla.', run: hatirla },
      { title: 'Bal ve su: viskozite', goal: 'Viskozite ile akışkanlığın ters yönde olduğunu gör.', run: balVeSu },
      { title: 'Akış: tanecikler birbiri üzerinde kayar', goal: 'Viskoz sıvıda taneciklerin zor kaydığını gör.', run: akis },
      { title: 'Aynı sürede kim ne kadar akar?', goal: 'Leke büyüklüğünden viskozite sırasını çıkar.', run: ayniSurede },
      { title: 'Günlük hayatta viskozite', goal: 'Günlük durumları viskozitesi yüksek ve düşük diye ayır.', run: gunluk },
      { title: 'Beş saf sıvı, aynı büret', goal: 'Beş sıvının lekelerini karşılaştırıp tabloyla eşle.', run: besSivi },
      { title: 'Yapılara bak: OH grubu sayısı', goal: 'OH sayısı ile leke büyüklüğü arasındaki örüntüyü bul.', run: yapilar },
      { title: 'Neden: hidrojen bağı sayısı', goal: 'Viskozite farkını hidrojen bağı sayısıyla açıkla.', run: neden },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Viskozite nedir?',
        options: ['Sıvı yüzeyindeki buharın basıncı', 'Sıvının akmaya karşı gösterdiği direnç', 'Sıvının kaynamaya başladığı sıcaklık'], answer: 1,
        why: ['Buhar basıncı başka bir niteliktir; akışla ilgisi yoktur.', 'Sıvı akarken karşılaştığı dirence viskozite denir.', 'Kaynama sıcaklığı akışı değil, sıvının buharlaşmasını anlatır.'], scene: 1 },
      { q: 'Bir sıvının viskozitesi büyüdükçe akışkanlığı nasıl değişir?',
        options: ['Artar', 'Değişmez', 'Azalır'], answer: 2,
        why: ['Viskozitesi büyük sıvı daha zor akar; akışkanlığı artmaz.', 'Viskozite ile akışkanlık birlikte değişir, ters yönde.', 'Direnç büyüdükçe sıvı zor akar; akışkanlık azalır.'], scene: 1 },
      { q: 'Üç özdeş büretin muslukları aynı anda açılıp kapatıldı; lekelerin yarıçapları P &lt; Q &lt; R çıktı. Viskozite sıralaması hangisidir?',
        options: ['P &gt; Q &gt; R', 'R &gt; Q &gt; P', 'Üçü eşit'], answer: 0,
        why: ['En küçük leke en az akan sıvıdır; viskozitesi en büyük olan P’dir.', 'Bu sıra tersine kurulmuş: en çok akan R’nin viskozitesi en küçüktür.', 'Lekeler farklı büyüklükte; sıvılar aynı sürede farklı miktarda akmış.'], scene: 3 },
      { q: 'Aynı sıcaklıkta M sıvısının molekülünde 2, N sıvısının molekülünde 3 OH grubu var. Hangisi doğrudur?',
        options: ['M’nin viskozitesi daha büyüktür', 'N’nin viskozitesi daha büyüktür', 'İkisinin viskozitesi eşittir'], answer: 1,
        why: ['M’de OH ve hidrojen bağı daha az; moleküller daha kolay kayar.', 'N’de OH çok, hidrojen bağı çok; moleküller zor kayar, viskozite büyüktür.', 'OH sayıları farklı olduğundan hidrojen bağı sayıları da farklıdır.'], scene: 7 },
      { q: 'Su ve gliserin ikisi de hidrojen bağı kurar. Viskoziteleri hakkında hangisi doğrudur?',
        options: ['Gliserinde hidrojen bağı sayısı fazla olduğundan viskozitesi daha büyüktür', 'İkisinde de hidrojen bağı olduğundan viskoziteleri eşittir', 'Suyun viskozitesi daha büyüktür'], answer: 0,
        why: ['Gliserinde OH sayısı fazla; çok hidrojen bağı moleküllerin kaymasını zorlaştırır.', 'Bağ türü aynı olsa da bağ sayısı farklıdır; viskozite eşit olmaz.', 'Suyun lekesi gliserininkinden çok büyüktür; viskozitesi daha küçüktür.'], scene: 7 },
    ],
    summary: [
      'Viskozite, akmaya karşı dirençtir.',
      'Viskozite büyüdükçe akışkanlık küçülür.',
      'OH sayısı ve hidrojen bağı arttıkça sıvı zor akar.',
      '<b>Viskozite arttıkça akışkanlık azalır.</b>',
    ],
    nextLesson: { href: 'k2-sicaklik-viskozite.html', label: 'Sonraki: Sıcaklık ve viskozite ›' },
  });
})();
