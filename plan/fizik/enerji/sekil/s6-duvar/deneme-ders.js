/* P6 · DENEME · Ş6 duvar kesiti ve çift camın (dersler/duvar-sekil.js, window.DUVAR) ders motorunda denenmesi.
   Tam ders değildir; figürün bütün ayarlarını, noktalarını ve kadrajlarını gezdirir. Sayılar senaryodaki örnek veridir
   (plan/fizik/enerji/senaryolar/F-isi-iletim-hizi-ve-yalitim.md, F2 sahne 2–5).
   Kaynağı plan/fizik/enerji/sekil/s6-duvar/deneme-ders.js olarak saklanır; tema klasöründe durmaz.
   Çalıştırmak için: bu dosyayı fizik/enerji/dersler/p6-duvar-deneme.js, sayfasını fizik/enerji/p6-duvar-deneme.html
   olarak koy (sayfa: ortak/ders.js, dersler/kit.js, dersler/duvar-sekil.js, bu dosya), sonra `node araclar/olc.js enerji/p6`. */
(() => {
  'use strict';
  const { lerp, ease } = Ders;
  const V = window.DUVAR;
  const YAZI = 'var(--text)', SOLUK = 'var(--muted)', SICAKLIK = 'var(--c5)', ISI = 'var(--c2)';
  const tr = (v) => String(Math.round(v)).replace('-', '−');

  const yazi = (c, p, metin, o = {}) => c.S('text', {
    x: 0, y: 0, 'text-anchor': o.hiza || 'start', 'font-size': 24, 'font-weight': o.kalin || 500,
    style: 'fill:' + (o.renk || SOLUK), text: metin,
  }, p);
  const belir = (c, el, ms = 350) => { const els = [el].flat(); els.forEach((e) => { e.style.opacity = 0; }); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = e; })); };
  const kadraj = (c, f, g, a, b, ms = 900) => c.tween(ms, (e) => { f.bak(a.map((v, i) => lerp(v, b[i], e))); g.guncelle(); }, ease.inOut);

  /* Senaryodaki yerleşim: x 40, y 90, h 400 (genişlik 440). */
  function kur(c, k = 'duvar') {
    const svg = c.svg(1000, 562);
    const f = V.kur(c, svg, { x: 40, y: 90, h: 400 });
    f.bak(V.kadraj[k]);
    return { svg, f };
  }
  /* Etiketler figürün noktalarına bağlıdır; g.guncelle() her karede yerlerini ve sayıları yeniler. */
  function etiketler(c, svg, f, liste) {
    const g = c.S('g', {}, svg);
    const hepsi = liste.map(([ad, metin, dx, dy, o]) => ({ ad, metin, dx, dy, el: yazi(c, g, '', o) }));
    g.guncelle = () => {
      for (const e of hepsi) {
        const [x, y] = f.nokta(e.ad);
        e.el.setAttribute('x', (x + e.dx).toFixed(1)); e.el.setAttribute('y', (y + e.dy).toFixed(1));
        e.el.style.display = f.gorunur(e.ad) ? '' : 'none';
        const m = typeof e.metin === 'function' ? e.metin() : e.metin;
        if (e.el.textContent !== m) e.el.textContent = m;
      }
    };
    g.guncelle();
    return g;
  }
  /* Isı oku: iki nokta arasında, kalınlığı değişebilen düz ok (turuncu). guncelle(kalinlik, ters) yeniden çizer. */
  function isiOku(c, svg, f) {
    const yol = c.S('path', { d: '', style: 'fill:' + ISI + ';opacity:.92' }, svg);
    yol.guncelle = (kalin, ters) => {
      let a = f.nokta('duvar.ic'), b = f.nokta('duvar.dis');
      if (ters) [a, b] = [b, a];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
      const bas = a.map((v, i) => v - [ux, uy][i] * 26), son = b.map((v, i) => v + [ux, uy][i] * 34);
      const uc = Math.max(12, kalin * 1.3), boyun = son.map((v, i) => v - [ux, uy][i] * uc * 1.2);
      const p = (q, s) => (q[0] + nx * s).toFixed(1) + ' ' + (q[1] + ny * s).toFixed(1);
      yol.setAttribute('d', 'M' + p(bas, kalin / 2) + 'L' + p(boyun, kalin / 2) + 'L' + p(boyun, uc) + 'L' + p(son, 0) + 'L' + p(boyun, -uc) + 'L' + p(boyun, -kalin / 2) + 'L' + p(bas, -kalin / 2) + 'Z');
    };
    return yol;
  }
  const sureCizgisi = (c, svg) => {
    const g = c.S('g', {}, svg);
    const cizgi = c.S('line', { x1: 60, y1: 530, x2: 60, y2: 530, style: 'stroke:#cfd8e3;stroke-width:3;stroke-linecap:round' }, g);
    c.S('text', { x: 60, y: 556, 'font-size': 24, style: 'fill:' + SOLUK, text: 'geçen süre' }, g);
    g.boy = (v) => cizgi.setAttribute('x2', 60 + v);
    return g;
  };
  const kart = (c, svg, metin, x, y, w, h) => {
    const g = c.S('g', {}, svg);
    c.S('rect', { x, y, width: w, height: h, rx: 14, style: 'fill:none;stroke:' + SOLUK + ';stroke-width:2' }, g);
    c.S('text', { x: x + w / 2, y: y + h / 2 + 9, 'text-anchor': 'middle', 'font-size': 26, style: 'fill:' + SOLUK, text: metin }, g);
    return g;
  };
  const okuma = (c, svg, f, ek = []) => etiketler(c, svg, f, [
    ['ic.termometre', () => tr(f.durum().ic) + ' °C', -14, 8, { hiza: 'end', renk: SICAKLIK, kalin: 600 }],
    ['dis.termometre', () => tr(f.durum().dis) + ' °C', 14, 8, { renk: SICAKLIK, kalin: 600 }],
    ['ic.etiket', 'iç', 0, 24, { hiza: 'middle', renk: YAZI }], ['dis.etiket', 'dış', 0, 24, { hiza: 'middle', renk: YAZI }],
    ...ek,
  ]);

  /* ---- Sahne 1 · Bütün noktalar, bütün ayarlar, bütün kadrajlar ---- */
  async function tanitim(c) {
    const { svg, f } = kur(c, 'tum');
    f.ayar({ yalitim: 1, cam: 1, ic: 20, dis: 20 });
    await belir(c, f.el, 500);
    const adlar = etiketler(c, svg, f, [
      ['ic.termometre', 't.iç', -14, 8, { hiza: 'end' }], ['dis.termometre', 't.dış', 14, 8],
      ['duvar.ic', 'd.iç', -8, -10, { hiza: 'end' }], ['duvar.dis', 'd.dış', 12, -10],
      ['yalitim', 'yalıtım', 56, 8], ['cam', 'cam', 66, 4],
      ['kalinlik.a', 'a', -6, -12, { hiza: 'end' }], ['kalinlik.b', 'b', 10, -14],
      ['ic.etiket', 'iç', 0, 24, { hiza: 'middle', renk: YAZI }], ['dis.etiket', 'dış', 0, 24, { hiza: 'middle', renk: YAZI }],
    ]);
    /* Her noktanın yerinde küçük bir işaret: etiketin neye bağlı olduğu görüntüde denetlenir. */
    const isaret = c.S('g', {}, svg);
    const NOKTA = ['ic.termometre', 'dis.termometre', 'duvar.ic', 'duvar.dis', 'yalitim', 'cam', 'kalinlik.a', 'kalinlik.b', 'ic.etiket', 'dis.etiket'];
    const benek = NOKTA.map((ad) => c.S('circle', { r: 4, style: 'fill:' + ISI }, isaret));
    const eski = adlar.guncelle;
    adlar.guncelle = () => { eski(); NOKTA.forEach((ad, i) => { const [x, y] = f.nokta(ad); benek[i].setAttribute('cx', x); benek[i].setAttribute('cy', y); benek[i].style.display = f.gorunur(ad) ? '' : 'none'; }); };
    adlar.guncelle();
    await belir(c, [adlar, isaret]);
    await c.say('Duvar kesiti: bütün noktalar işaretli; iki termometre <b>20 °C</b>.', { speak: 'Duvar kesiti: bütün noktalar işaretli; iki termometre yirmi santigrat derece.' });
    const y0 = f.nokta('ic.termometre')[1], y1 = f.nokta('dis.termometre')[1];
    const hiza = c.S('line', { x1: f.nokta('ic.termometre')[0], y1: y0, x2: f.nokta('dis.termometre')[0], y2: y1, style: 'stroke:' + SICAKLIK + ';stroke-width:2;stroke-dasharray:6 6' }, svg);
    /* Ölçüm tahtaya yazılır (olc.js konsolu dökmez): iki sütun tepesinin y'si ve farkı, tahta birimiyle. */
    const olcum = c.S('text', { x: 560, y: 150, 'font-size': 24, style: 'fill:' + YAZI, text: 'iç y ' + y0.toFixed(2).replace('.', ',') + ' · dış y ' + y1.toFixed(2).replace('.', ',') }, svg);
    const olcum2 = c.S('text', { x: 560, y: 190, 'font-size': 24, style: 'fill:' + YAZI, text: 'fark ' + Math.abs(y0 - y1).toFixed(2).replace('.', ',') + ' birim · 1 °C ' + (V.sabit.birim * f.h / 600).toFixed(2).replace('.', ',') }, svg);
    await c.say('Eşit sıcaklıkta iki sütunun tepesi aynı çizgide.', { speak: 'Eşit sıcaklıkta iki sütunun tepesi aynı çizgide.' });
    hiza.remove(); olcum.remove(); olcum2.remove();
    await c.tween(1200, (e) => { f.ayar({ yalitim: 1 - e }); adlar.guncelle(); }, ease.inOut);
    await c.say('Yalıtım levhası çıkarıldı; duvarın dış yüzü açıldı.', { speak: 'Yalıtım levhası çıkarıldı; duvarın dış yüzü açıldı.' });
    await c.tween(1500, (e) => { f.ayar({ ic: lerp(20, -10, e), dis: lerp(20, 50, e) }); adlar.guncelle(); }, ease.inOut);
    await c.tween(1200, (e) => { f.ayar({ yalitim: e, ic: lerp(-10, 22, e), dis: lerp(50, 0, e) }); adlar.guncelle(); }, ease.inOut);
    await kadraj(c, f, adlar, V.kadraj.tum, V.kadraj.duvar);
    await c.say('Kadraj: duvar.', { speak: 'Kadraj: duvar.' });
    await kadraj(c, f, adlar, V.kadraj.duvar, V.kadraj.cam);
    f.ayar({ cam: 2 }); adlar.guncelle();
    await c.say('Kadraj: cam; pencerede çift cam.', { speak: 'Kadraj: cam; pencerede çift cam.' });
    await kadraj(c, f, adlar, V.kadraj.cam, V.kadraj.pencere);
    await c.say('Kadraj: pencere; iki cam ve aradaki çıta.', { speak: 'Kadraj: pencere; iki cam ve aradaki çıta.' });
    f.ayar({ cam: 1 }); adlar.guncelle();
    await c.wait(500);
    await kadraj(c, f, adlar, V.kadraj.pencere, V.kadraj.tum);
  }

  /* ---- Sahne 2 · F2 sahne 2 aynen: kışın aynı duvar (yalıtımsız 22 → 9, yalıtımlı 22 → 17) ---- */
  async function kis(c) {
    const { svg, f } = kur(c, 'duvar');
    f.ayar({ yalitim: 0, cam: 1, ic: 22, dis: 0 });
    const ok = isiOku(c, svg, f); ok.style.opacity = 0;
    const g = okuma(c, svg, f, [['yalitim', () => (f.durum().yalitim > 0.6 ? 'yalıtım' : ''), 56, 8]]);
    const sure = sureCizgisi(c, svg);
    await c.say('Ela’nın evi kışın ısıtılıyor; içeride <b>22 °C</b>, dışarıda <b>0 °C</b>.', { speak: 'Ela’nın evi kışın ısıtılıyor; içeride yirmi iki, dışarıda sıfır derece.' });
    const k1 = kart(c, svg, 'ısıtıcı kapalı', 560, 110, 380, 90);
    await belir(c, k1, 400);
    await c.say('Duvarda yalıtım yok; bir gece ısıtıcı kapanıyor.', { speak: 'Duvarda yalıtım yok; bir gece ısıtıcı kapanıyor.' });
    ok.guncelle(14);
    await c.tween(500, (e) => { ok.style.opacity = e; }, ease.out);
    await c.say('Isı sıcaktan soğuğa, yani içeriden dışarıya aktarılıyor.', { speak: 'Isı sıcaktan soğuğa, yani içeriden dışarıya aktarılıyor.' });
    await c.tween(3000, (e) => { f.ayar({ ic: lerp(22, 9, e) }); sure.boy(440 * e); g.guncelle(); }, ease.linear);
    await c.say('Sabaha kadar iç sıcaklık <b>9 °C</b>’ye düşüyor.', { speak: 'Sabaha kadar iç sıcaklık dokuz dereceye düşüyor.' });
    await c.tween(600, (e) => { f.ayar({ ic: lerp(9, 22, e) }); sure.boy(440 * (1 - e)); g.guncelle(); }, ease.inOut);
    await c.tween(1000, (e) => { f.ayar({ yalitim: e }); ok.guncelle(lerp(14, 5, e)); g.guncelle(); }, ease.inOut);
    await c.say('Ertesi gün duvara bir yalıtım katmanı takılıyor.', { speak: 'Ertesi gün duvara bir yalıtım katmanı takılıyor.' });
    await c.tween(3000, (e) => { f.ayar({ ic: lerp(22, 17, e) }); sure.boy(440 * e); g.guncelle(); }, ease.linear);
    await c.say('Aynı gece iç sıcaklık yalnızca <b>17 °C</b>’ye düşüyor.', { speak: 'Aynı gece iç sıcaklık yalnızca on yedi dereceye düşüyor.' });
  }

  /* ---- Sahne 3 · F2 sahne 3–5: yazın aynı duvar; kalınlık ölçüsü ve strafor; kadraj cam ve çift cam ---- */
  async function yaz(c) {
    const { svg, f } = kur(c, 'duvar');
    f.ayar({ yalitim: 1, cam: 1, ic: 17, dis: 0 });
    const ok = isiOku(c, svg, f); ok.style.opacity = 0;
    const etiket = { dis: '' };
    const g = okuma(c, svg, f, [['duvar.dis', () => etiket.dis, 56, -50]]);
    const sure = sureCizgisi(c, svg);
    await c.wait(300);
    await c.tween(1000, (e) => { f.ayar({ yalitim: 1 - e, dis: lerp(0, 38, e), ic: lerp(17, 25, e) }); g.guncelle(); }, ease.inOut);
    await c.say('Yaz geldi; dışarısı <b>38 °C</b>, evin içi <b>25 °C</b>.', { speak: 'Yaz geldi; dışarısı otuz sekiz, evin içi yirmi beş derece.' });
    ok.guncelle(14, true);
    await c.tween(500, (e) => { ok.style.opacity = e; }, ease.out);
    await c.say('Isı yine sıcaktan soğuğa aktarılır; bu kez dışarıdan içeriye.', { speak: 'Isı yine sıcaktan soğuğa aktarılır; bu kez dışarıdan içeriye.' });
    await c.tween(3000, (e) => { f.ayar({ ic: lerp(25, 33, e) }); sure.boy(440 * e); g.guncelle(); }, ease.linear);
    await c.say('Yalıtımsız evde iç sıcaklık <b>33 °C</b>’ye çıkıyor.', { speak: 'Yalıtımsız evde iç sıcaklık otuz üç dereceye çıkıyor.' });
    /* Sahne 4: kalınlık ölçü çizgisi, sonra strafor */
    await c.tween(500, (e) => { ok.style.opacity = 1 - e; sure.style.opacity = 1 - e; });
    f.ayar({ ic: 22, dis: 0 }); g.guncelle();
    const olcu = c.S('g', {}, svg);
    const cizgi = c.S('path', { d: '', style: 'fill:none;stroke:#cfd8e3;stroke-width:2.5;stroke-linecap:round' }, olcu);
    const olcuYazi = yazi(c, olcu, 'kalınlık', { hiza: 'middle', renk: YAZI });
    const olcuCiz = () => {
      const a = f.nokta('kalinlik.a'), b = f.nokta('kalinlik.b'), u = 18;
      cizgi.setAttribute('d', `M${a[0]} ${a[1] - u + 7}V${a[1] - u - 7}M${a[0]} ${a[1] - u}L${b[0]} ${b[1] - u}M${b[0]} ${b[1] - u + 7}V${b[1] - u - 7}`);
      olcuYazi.setAttribute('x', (a[0] + b[0]) / 2); olcuYazi.setAttribute('y', Math.min(a[1], b[1]) - u - 14);
    };
    olcuCiz();
    await belir(c, olcu, 400);
    await c.say('Birinci yol duvarı kalın yapmaktır; kalınlık arttıkça hız azalır.', { speak: 'Birinci yol duvarı kalın yapmaktır; kalınlık arttıkça hız azalır.' });
    etiket.dis = 'strafor';
    await c.tween(1000, (e) => { f.ayar({ yalitim: e }); g.guncelle(); olcuCiz(); }, ease.inOut);
    await c.say('Duvarlar çoğunlukla dıştan <b>strafor</b> ile kaplanır.', { speak: 'Duvarlar çoğunlukla dıştan strafor ile kaplanır.' });
    /* Sahne 5: kadraj cam, çift cam */
    etiket.dis = ''; g.guncelle();
    await c.tween(300, (e) => { olcu.style.opacity = 1 - e; });
    olcu.remove();
    await kadraj(c, f, g, V.kadraj.duvar, V.kadraj.cam);
    /* Yazı kutunun sağında durur; 'cam' noktasına ince bir işaret çizgisi çekilir. */
    const camYazi = yazi(c, svg, '', { renk: YAZI });
    const isaret = c.S('path', { d: '', style: 'fill:none;stroke:#cfd8e3;stroke-width:2' }, svg);
    const isaretle = () => {
      const p = f.nokta('cam'), x = f.x + f.w + 14, y = p[1] - 30;
      camYazi.textContent = f.durum().cam >= 1.5 ? 'iki cam arasında hava' : 'tek cam';
      camYazi.setAttribute('x', x); camYazi.setAttribute('y', y + 8);
      isaret.setAttribute('d', `M${p[0]} ${p[1]}L${x - 8} ${y}`);
    };
    isaretle();
    await c.tween(3000, (e) => { f.ayar({ ic: lerp(22, 17, e) }); g.guncelle(); }, ease.linear);
    await c.say('Tek camlı pencerede iç sıcaklık <b>17 °C</b>’ye düştü.', { speak: 'Tek camlı pencerede iç sıcaklık on yedi dereceye düştü.' });
    await c.tween(600, (e) => { f.ayar({ ic: lerp(17, 22, e) }); g.guncelle(); }, ease.inOut);
    f.ayar({ cam: 2 }); isaretle();
    await c.tween(3000, (e) => { f.ayar({ ic: lerp(22, 19, e) }); g.guncelle(); }, ease.linear);
    await c.say('Çift camlı pencerede iç sıcaklık yalnızca <b>19 °C</b>’ye düştü.', { speak: 'Çift camlı pencerede iç sıcaklık yalnızca on dokuz dereceye düştü.' });
  }

  Ders.start({
    id: 'enerji-p6', kicker: 'Deneme · İzometrik figür', title: 'Duvar kesiti ve çift cam', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Duvar kesiti ve çift cam', hook: 'Figürün ders motorunda denenmesi: ayarlar, noktalar, kadrajlar.', button: 'Başla ›' },
    goals: ['Figürün bütün ayarlarını gör'],
    scenes: [
      { title: 'Tanıtım', goal: 'Noktalar, ayarlar, kadrajlar.', run: tanitim },
      { title: 'Kışın aynı duvar', goal: 'Yalıtımsız ve yalıtımlı gece.', run: kis },
      { title: 'Yaz, kalınlık, çift cam', goal: 'Yön değişir; strafor; çift cam.', run: yaz },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yalıtım takılınca iç sıcaklık nasıl değişti?', options: ['Daha yavaş düştü', 'Daha hızlı düştü'], answer: 0, why: ['Yalıtım ısıyı yavaşlatır.', 'Yalıtım ısı geçişini hızlandırmaz.'], scene: 1 },
    ],
    summary: ['Figür yalnızca <b>gösterir</b>; sayıları ders verir.'],
  });
})();
