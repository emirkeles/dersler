/* C5 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md ("## C5")
   Yazar notu: içerik MEB Fizik 9 s. 61, 72, 75 ve 76'dan. Öğrenciye kitap ya da sayfa anılmaz.
   Renk: A birinci vektör rengi, B ikinci vektör rengi, R bileşke rengi. Bileşkenin boyu sayıyla
   istenmez; karelerden "kaç sağ, kaç yukarı" diye okunur. "Bileşen" sözü kullanılmaz (C7'de adlandırılır).
   Senaryodaki sürükle-bırak adımı: taşıma animasyonu gösterilir, bileşke kare sayısıyla seçtirilir. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, yol, belir, sol, kaybol, kay, par, ok, okCiz, okGit, yonGulu, izgara, insan } = KIT;
  const { lerp, ease } = Ders;

  /* ---- Derse özel yardımcılar ---- */
  /* Üstü oklu harf: vektörün adı. */
  function harf(c, p, x, y, ad, o = {}) {
    const g = c.S('g', {}, p), s = o.size || 28, renk = o.renk || RENK.yazi, w = s * 0.3, yy = -s * 0.9, u = s * 0.15;
    yazi(c, g, 0, 0, ad, { size: s, renk });
    yol(c, g, `M ${-w} ${yy} L ${w} ${yy} M ${w - u} ${yy - u} L ${w} ${yy} L ${w - u} ${yy + u}`, { renk, kalin: Math.max(2, s * 0.08) });
    g.setAttribute('transform', `translate(${x} ${y})`);
    return g;
  }
  /* "R = A + B": parçalar [metin, renk, üstü oklu mu] */
  function esitlik(c, p, x, y, parcalar, o = {}) {
    const g = c.S('g', {}, p), s = o.size || 34, adim = s * 0.95, x0 = x - (parcalar.length - 1) * adim / 2;
    parcalar.forEach(([m, renk, oklu], k) => (oklu ? harf(c, g, x0 + k * adim, y, m, { size: s, renk }) : yazi(c, g, x0 + k * adim, y, m, { size: s, renk })));
    return g;
  }
  /* Kareli düzlemde etiketli ok. Gizli doğar (o.acik değilse), ciz() ile çizilir; etiket oku izler.
     o.ad: vektörün adı (üstü oklu); o.duz: düz yazı. o.yan: 1 okun solunda, -1 sağında; o.yer: 'bas' | 'uc'. */
  function vek(c, iz, kat, i, j, di, dj, o = {}) {
    const v = iz.vektor(i, j, di, dj, { renk: o.renk, kalin: o.kalin, uc: o.uc, katman: kat });
    v.renk = o.renk || RENK.a;
    if (o.ad) {
      const s = o.size || 26, yarim = o.duz ? o.ad.length * s * 0.27 : s * 0.3, koy0 = v.koy;
      v.ad = o.duz ? c.S('g', {}, kat) : harf(c, kat, 0, 0, o.ad, { size: s, renk: v.renk });
      if (o.duz) yazi(c, v.ad, 0, 0, o.ad, { size: s, renk: v.renk });
      const yerlestir = () => {
        const [a, b] = iz.P(v.i, v.j), [d, e] = iz.P(v.i + v.di, v.j + v.dj), L = Math.hypot(d - a, e - b) || 1, ux = (d - a) / L, uy = (e - b) / L;
        const yan = o.yan == null ? 1 : o.yan, uz = o.uzak || 26;
        let x = (a + d) / 2 + uy * uz * yan, y = (b + e) / 2 - ux * uz * yan;
        if (o.yer === 'bas') { x = a - ux * (14 + yarim); y = b - uy * 24; }
        if (o.yer === 'uc') { x = d + ux * (16 + yarim); y = e + uy * 24; }
        v.ad.setAttribute('transform', `translate(${x} ${y + s * (o.duz ? 0.35 : 0.45)})`);
      };
      v.koy = (...args) => { koy0(...args); yerlestir(); };
      yerlestir();
    }
    if (!o.acik) { v.style.opacity = 0; if (v.ad) v.ad.style.opacity = 0; }
    return v;
  }
  const ciz = (c, v, ms = 600) => { v.style.opacity = 1; return par(okCiz(c, v, ms), v.ad ? belir(c, v.ad, ms) : []); };
  /* Oku dönmeden kaydırır (KIT.izgara.tasi); o.izsiz değilse eski yerinde soluk izi kalır. */
  async function tasi(c, iz, v, i2, j2, ms = 1100, o = {}) {
    let golge = null;
    if (!o.izsiz) { golge = iz.vektor(v.i, v.j, v.di, v.dj, { renk: v.renk, kalin: 4, uc: 14, katman: v.parentNode }); golge.style.opacity = 0.3; v.parentNode.insertBefore(golge, v); }
    await iz.tasi(c, v, i2, j2, { ms });
    return golge;
  }
  const nokta = (c, iz, kat, i, j, bos) => { const [x, y] = iz.P(i, j); return c.S('circle', { cx: x, cy: y, r: bos ? 10 : 7, fill: bos ? 'none' : RENK.vurgu, stroke: RENK.vurgu, 'stroke-width': 3 }, kat); };
  const kesik = (c, iz, kat, i1, j1, i2, j2, o = {}) => { const [a, b] = iz.P(i1, j1), [d, e] = iz.P(i2, j2); return cizgi(c, kat, a, b, d, e, { renk: o.renk || RENK.soluk, kalin: o.kalin || 2, kesik: o.kesik || '6 7' }); };
  /* Bir noktayı köşeden köşeye yürütür. */
  const gez = (c, iz, el, yer, ms = 1500, kolay = ease.linear) => c.tween(ms, (e) => {
    const k = Math.min(yer.length - 2, Math.floor(e * (yer.length - 1))), f = e * (yer.length - 1) - k;
    const [a, b] = iz.P(...yer[k]), [d, g] = iz.P(...yer[k + 1]);
    el.setAttribute('cx', lerp(a, d, f)); el.setAttribute('cy', lerp(b, g, f));
  }, kolay);
  /* Kareleri tek tek sayan nokta: önce yatay, sonra düşey adımlar. */
  async function kareSay(c, iz, kat, i, j, di, dj) {
    const n = nokta(c, iz, kat, i, j); let x = i, y = j;
    const adim = async (dx, dy) => {
      const x0 = x, y0 = y; x += dx; y += dy;
      await c.tween(220, (e) => { const [a, b] = iz.P(lerp(x0, x, e), lerp(y0, y, e)); n.setAttribute('cx', a); n.setAttribute('cy', b); });
      await c.wait(120);
    };
    for (let k = 0; k < Math.abs(di); k++) await adim(Math.sign(di), 0);
    for (let k = 0; k < Math.abs(dj); k++) await adim(0, Math.sign(dj));
    await kaybol(c, n, 200);
  }
  /* Bir okun kaç kare sağa/sola, yukarı/aşağı gittiğini yazar; istenirse kesikli sayım çizgilerini de çizer. Gizli doğar. */
  function oku(c, iz, kat, i, j, di, dj, o = {}) {
    const g = c.S('g', {}, kat), [a, b] = iz.P(i, j), [d, e] = iz.P(i + di, j + dj), renk = o.renk || RENK.yazi, k = { renk: RENK.soluk, kalin: 3, kesik: '6 7' };
    if (di) {
      if (!o.cizgisiz && !o.yataysiz) cizgi(c, g, a, b, d, b, k);
      yazi(c, g, (a + d) / 2, b + (o.yatayUst ? -14 : 32), Math.abs(di) + (di > 0 ? ' sağ' : ' sol'), { size: 24, renk });
    }
    if (dj) {
      if (!o.cizgisiz) cizgi(c, g, d, b, d, e, k);
      const m = Math.abs(dj) + (dj > 0 ? ' yukarı' : ' aşağı');
      if (o.dikey === 'sag') yazi(c, g, d + 14, (b + e) / 2 + 8, m, { size: 24, renk, hiza: 'start' });
      else if (o.dikey === 'sol') yazi(c, g, d - 14, (b + e) / 2 + 8, m, { size: 24, renk, hiza: 'end' });
      else yazi(c, g, d, dj > 0 ? e - 18 : e + 36, m, { size: 24, renk });
    }
    g.style.opacity = 0;
    return g;
  }
  const yanSon = (c, els, ms = 1500) => c.tween(ms, (e, t) => { const o = 0.3 + 0.7 * Math.abs(Math.cos(t * Math.PI * 3)); [els].flat().forEach((x) => { x.style.opacity = o; }); }, ease.linear);
  const isaret = (c, p, x, y, dogru, s = 15) => yol(c, p, dogru ? `M ${x - s} ${y} L ${x - s * 0.3} ${y + s * 0.7} L ${x + s} ${y - s * 0.8}` : `M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`, { renk: dogru ? RENK.iyi : RENK.kotu, kalin: 5 });
  /* Bir oku boyunu koruyarak yatırıp (x, y) noktasından sağa doğru serer. */
  const yatir = (c, g, x, y, ms = 1100) => {
    const [a, b, d, e] = g.uclar, L = Math.hypot(d - a, e - b), th0 = Math.atan2(e - b, d - a);
    return c.tween(ms, (t) => { const px = lerp(a, x, t), py = lerp(b, y, t), th = lerp(th0, 0, t); g.ayarla(px, py, px + Math.cos(th) * L, py + Math.sin(th) * L); }, ease.inOut);
  };
  /* Soru; doğru şık seçilince gor() tahtayı günceller ve bitmesi beklenir. */
  async function sor(c, o, gor) {
    let p = null;
    await c.choice({ ...o, onPick: (i, dogru) => { if (dogru && gor) p = gor(); } });
    if (p) await p;
  }
  const duzlem = (c, svg, o = {}) => {
    const iz = izgara(c, svg, { kare: 56, y: 30, olcek: o.olcek });
    iz.gul = o.gulsuz ? null : yonGulu(c, iz.g, 902, 82, { r: 26 });
    return iz;
  };
  const AD = { a: { renk: RENK.a, ad: 'A' }, b: { renk: RENK.b, ad: 'B' }, r: { renk: RENK.r, ad: 'R' } };

  /* ---- Derse özel çizimler ---- */
  const agac = (c, p, x, y) => { c.S('circle', { cx: x, cy: y, r: 22, fill: '#17402e', stroke: '#2f7d57', 'stroke-width': 3 }, p); c.S('circle', { cx: x, cy: y, r: 5, fill: '#2f7d57' }, p); };
  /* Parktaki yürüyüş: O'dan 3 sağ, sonra 4 yukarı. Okları gizli döndürür. */
  function park(c, iz, kat, oi, oj, o = {}) {
    const [ox, oy] = iz.P(oi, oj);
    if (!o.agacsiz) [[oi + 6.5, oj + 4.4], [oi + 8.4, oj + 0.6], [oi - 2.5, oj + 4.5]].forEach(([i, j]) => agac(c, kat, ...iz.P(i, j)));
    const A = vek(c, iz, kat, oi, oj, 3, 0, { renk: RENK.a }), B = vek(c, iz, kat, oi + 3, oj, 0, 4, { renk: RENK.b });
    const R = vek(c, iz, kat, oi, oj, 3, 4, { renk: RENK.r });
    const bas = nokta(c, iz, kat, oi, oj), oAd = yazi(c, kat, ox - 4, oy + 36, 'O', { size: 24, renk: RENK.vurgu });
    const kisi = insan(c, kat, ox - 34, oy + 22, { s: 0.8 });
    kisi.style.opacity = 0;
    return { A, B, R, bas, oAd, kisi };
  }
  function ucak(c, p, x, y) {
    const g = c.S('g', {}, p), k = { fill: '#aab4d4' };
    c.S('path', { d: 'M -64 0 Q -64 -10 -40 -11 L 30 -11 Q 62 -8 72 0 Q 62 8 30 11 L -40 11 Q -64 10 -64 0 Z', ...k }, g);
    c.S('path', { d: 'M 22 -10 L -14 -70 L -34 -70 L -10 -10 Z M 22 10 L -14 70 L -34 70 L -10 10 Z', ...k }, g);
    c.S('path', { d: 'M -38 -10 L -56 -32 L -66 -32 L -56 -10 Z M -38 10 L -56 32 L -66 32 L -56 10 Z', ...k }, g);
    g.git = (dx, dy) => g.setAttribute('transform', `translate(${x + dx} ${y + dy})`);
    g.git(0, 0);
    return g;
  }

  /* ---- Sahne 1 · İki yürüyüş, iki doğrultu ---- */
  async function ikiYuruyus(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg, { olcek: '1 kare = 1 birim' });
    let kat = c.S('g', {}, iz.g);
    const A0 = vek(c, iz, kat, 2, 6.5, 3, 0, { renk: RENK.a }), B0 = vek(c, iz, kat, 5, 6.5, 2, 0, { renk: RENK.b }), R0 = vek(c, iz, kat, 2, 5.9, 5, 0, { renk: RENK.r });
    const A1 = vek(c, iz, kat, 2, 4.4, 3, 0, { renk: RENK.a }), B1 = vek(c, iz, kat, 5, 3.9, -2, 0, { renk: RENK.b }), R1 = vek(c, iz, kat, 2, 3.4, 1, 0, { renk: RENK.r });
    await belir(c, iz.g);
    await ciz(c, A0, 400); await ciz(c, B0, 400);
    await par(c.say('İki vektörün etkisini tek başına yapan vektöre bileşke vektör denir.'), ciz(c, R0, 1000));
    await ciz(c, A1, 400); await ciz(c, B1, 400); await ciz(c, R1, 500);
    await c.say('Aynı doğrultudaki vektörlerde kural kısaydı: aynı yön toplar, zıt yön çıkarır.');
    const T = vek(c, iz, kat, 9, 5.5, 2, 1, { renk: RENK.mor });
    await ciz(c, T, 500);
    await par(c.say('Bir vektör, yönü ve büyüklüğü değişmeden başka bir yere taşınabilir.'), tasi(c, iz, T, 10.5, 3, 1700));
    await kaybol(c, kat, 350);

    kat = c.S('g', {}, iz.g);
    const p = park(c, iz, kat, 5, 1);
    p.R.remove();
    const sen = nokta(c, iz, kat, 5, 1);
    await belir(c, kat);
    await par(c.say('Şimdi parkta, başlangıç noktasından 3 kare doğuya yürüyorsun.', { speak: 'Şimdi parkta, başlangıç noktasından üç kare doğuya yürüyorsun.' }), ciz(c, p.A, 1800), gez(c, iz, sen, [[5, 1], [8, 1]], 1800, ease.out));
    await par(c.say('Sonra dönüp 4 kare kuzeye yürüyorsun.', { speak: 'Sonra dönüp dört kare kuzeye yürüyorsun.' }), ciz(c, p.B, 2000), gez(c, iz, sen, [[8, 1], [8, 5]], 2000, ease.out));
    await c.say('Bu iki yürüyüş aynı doğrultuda değil.');
    const dogrultu = [kesik(c, iz, kat, 0.4, 1, 13, 1, { kalin: 3 }), kesik(c, iz, kat, 8, 0.2, 8, 7.8, { kalin: 3 })];
    await belir(c, dogrultu, 400);
    await c.say('Biri doğu–batı, öteki kuzey–güney doğrultusunda.');
    await kaybol(c, dogrultu, 300);
    await belir(c, p.kisi);
    await c.say('Arkadaşın başlangıç noktasında durmuş, sana bakıyor.');
    await c.choice({ tag: 'Düşün', q: 'Arkadaşın seni hangi yönde görür?', options: ['Tam doğuda', 'Doğu ile kuzey arasında', 'Tam kuzeyde'], answer: 1,
      hints: ['Yalnızca ilk yürüyüşü saydın. İkinci yürüyüş seni 4 kare kuzeye de taşıdı.', '', 'Yalnızca son yürüyüşü saydın. 3 kare doğuya gitmiş olman hâlâ geçerli.'],
      right: 'Evet. İki yürüyüş de yerini değiştirdi.' });
    await c.say('İki yürüyüş de yerini değiştirdi; ikisi birlikte hesaba katılır.');
    await c.say('Aynı yön toplar, zıt yön çıkarır kuralı burada tek başına yetmez.', { speak: '[thoughtful] Aynı yön toplar, zıt yön çıkarır kuralı burada tek başına yetmez.' });
    await c.say('Farklı doğrultudaki vektörleri toplamak için okları uç uca ekleriz.');
  }

  /* ---- Sahne 2 · Üç basamak ---- */
  async function ucBasamak(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg);
    let kat = c.S('g', {}, iz.g);
    const A = vek(c, iz, kat, 6, 1, 3, 0, AD.a), B = vek(c, iz, kat, 2, 3, 0, 4, { ...AD.b, yan: -1 });
    nokta(c, iz, kat, 6, 1);
    await belir(c, iz.g);
    await ciz(c, A); await ciz(c, B);
    await c.say('İki yürüyüşü iki okla çizelim: A doğuya 3, B kuzeye 4 birim.', { speak: 'İki yürüyüşü iki okla çizelim: a vektörü doğuya üç, be vektörü kuzeye dört birim.' });
    await par(c.say('Kareli düzlemde doğu sağ, kuzey yukarı demektir.'), yanSon(c, iz.gul, 2400));
    await par(c.say('Birinci basamak: B vektörü, A vektörünün bitiş noktasına taşınır.', { speak: 'Birinci basamak: be vektörü, a vektörünün bitiş noktasına taşınır.' }), tasi(c, iz, B, 9, 1, 1800));
    await c.say('Taşırken B’nin yönü de büyüklüğü de değiştirilmez.', { speak: 'Taşırken be vektörünün yönü de büyüklüğü de değiştirilmez.' });
    const R = vek(c, iz, kat, 6, 1, 3, 4, AD.r);
    R.style.opacity = 1;
    await par(c.say('İkinci basamak: A’nın başlangıç noktasından B’nin bitiş noktasına ok çizilir.', { speak: 'İkinci basamak: a vektörünün başlangıç noktasından be vektörünün bitiş noktasına ok çizilir.' }), okCiz(c, R, 1500));
    const es = esitlik(c, kat, iz.P(12.6, 0)[0], iz.P(0, 5)[1], [['R', RENK.r, 1], ['='], ['A', RENK.a, 1], ['+'], ['B', RENK.b, 1]], { size: 36 });
    await belir(c, [R.ad, es]);
    await c.say('Üçüncü basamak: çizilen ok bileşke vektördür, R ile gösterilir.', { speak: 'Üçüncü basamak: çizilen ok bileşke vektördür, re ile gösterilir.' });
    await c.say('Bu yola <b>uç uca ekleme yöntemi</b> denir.');
    const okuma = oku(c, iz, kat, 6, 1, 3, 4, { cizgisiz: true, renk: RENK.r });
    await kareSay(c, iz, kat, 6, 1, 3, 4);
    await belir(c, okuma, 300);
    await c.say('Bileşkeyi karelerden okuruz: başlangıçtan 3 sağ, 4 yukarı.', { speak: 'Bileşkeyi karelerden okuruz: başlangıçtan üç sağ, dört yukarı.' });
    await kaybol(c, kat, 350);

    kat = c.S('g', {}, iz.g);
    const A2 = vek(c, iz, kat, 6, 2, 2, 0, AD.a), B2 = vek(c, iz, kat, 3, 3, 0, 3, { ...AD.b, yan: -1 }), R2 = vek(c, iz, kat, 6, 2, 2, 3, AD.r);
    const okuma2 = oku(c, iz, kat, 6, 2, 2, 3, { cizgisiz: true, renk: RENK.r });
    nokta(c, iz, kat, 6, 2);
    await par(ciz(c, A2), ciz(c, B2));
    await sor(c, { tag: 'Uygula', q: 'A: 2 sağ. B: 3 yukarı. Uç uca eklenince bileşke nasıl okunur?', options: ['5 sağ', '2 sağ, 3 yukarı', '3 sağ, 2 yukarı'], answer: 1,
      hints: ['Büyüklükleri topladın; bu yalnızca aynı yöndeki vektörlerde olur. B yukarı baktığı için bileşke 3 kare yukarı da çıkar.', '',
        'Okları karıştırdın. Sağa giden A’dır ve 2 karedir; yukarı giden B’dir ve 3 karedir.'],
      right: 'Evet. A kadar sağa, B kadar yukarı.' }, async () => {
      await tasi(c, iz, B2, 8, 2, 1000);
      await ciz(c, R2, 800);
      await belir(c, okuma2, 300);
    });
    await c.say('Bileşke, A kadar sağa ve B kadar yukarı gider.', { speak: 'Bileşke, a vektörü kadar sağa ve be vektörü kadar yukarı gider.' });
    await kaybol(c, kat, 350);
    kat = c.S('g', {}, iz.g);
    const p = park(c, iz, kat, 5, 1);
    nokta(c, iz, kat, 8, 5);
    [p.A, p.B].forEach((v) => { v.style.opacity = 1; });
    p.kisi.style.opacity = 1;
    await belir(c, kat);
    await par(c.say('Parktaki arkadaşın da seni tam bileşkenin yönünde görür.'), ciz(c, p.R, 1500));
    c.note('<b>Uç uca ekleme: ikinci oku birincinin ucuna taşı, baştan sona ok çek.</b><br>3 sağ + 4 yukarı → R: 3 sağ, 4 yukarı', 'Uç uca ekleme', 'uc-uca');
  }

  /* ---- Sahne 3 · Eğik bir okla ---- */
  async function egik(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg), kat = c.S('g', {}, iz.g);
    const B = vek(c, iz, kat, 3, 4, -1, 2, { ...AD.b, yan: -1 }), A = vek(c, iz, kat, 6, 1, 3, 0, AD.a);
    await belir(c, iz.g);
    await ciz(c, B, 800);
    await c.say('Her ok doğuya ya da kuzeye bakmaz; eğik oklar da vardır.');
    await c.say('Eğik oku da karelerle tarif ederiz: başlangıcından ucuna kaç kare gidiyor?', { speak: '[curious] Eğik oku da karelerle tarif ederiz: başlangıcından ucuna kaç kare gidiyor?' });
    const sB = oku(c, iz, kat, 3, 4, -1, 2, { dikey: 'sol', renk: RENK.b });
    await kareSay(c, iz, kat, 3, 4, -1, 2);
    await belir(c, sB, 300);
    await c.say('Buradaki B oku 1 kare sola, 2 kare yukarı gidiyor.', { speak: 'Buradaki be vektörünün oku bir kare sola, iki kare yukarı gidiyor.' });
    await kaybol(c, sB, 300);
    nokta(c, iz, kat, 6, 1);
    await ciz(c, A, 800);
    await c.say('A oku ise 3 kare sağa gidiyor.', { speak: 'a vektörünün oku ise üç kare sağa gidiyor.' });
    await c.say('B’yi A’nın bitiş noktasına taşıyacağız.', { speak: 'Be vektörünü a vektörünün bitiş noktasına taşıyacağız.' });
    // Üç aday: küçük çizimler (1 kare = 26 birim).
    const adaylar = c.S('g', {}, svg), u = 26;
    [[2.236, 0, 'döndürülmüş'], [-0.5, -1, 'kısaltılmış'], [-1, -2, 'kaydırılmış']].forEach(([dx, dy, ad], k) => {
      const x = 408 + k * 180, y = 96;
      kutu(c, adaylar, x, y, 170, 176, { rx: 10, kalin: 2 });
      ok(c, adaylar, x + 14, y + 112, x + 14 + 3 * u, y + 112, { renk: RENK.a, kalin: 5, uc: 13 });
      ok(c, adaylar, x + 14 + 3 * u, y + 112, x + 14 + (3 + dx) * u, y + 112 + dy * u, { renk: RENK.b, kalin: 5, uc: 13 });
      yazi(c, adaylar, x + 85, y + 160, ad, { size: 22, renk: RENK.soluk });
    });
    await belir(c, adaylar);
    await sor(c, { tag: 'Düşün', q: 'B, A’nın ucuna nasıl taşınır?', options: ['A’nın devamı olacak biçimde döndürülerek', 'Sığması için kısaltılarak', 'Yönü ve boyu aynı kalarak, kaydırılarak'], answer: 2,
      hints: ['Dönen ok başka bir yöne bakar; artık B değildir. Taşımada yön korunur.', 'Boyu değişen okun büyüklüğü değişir; artık B değildir. Taşımada büyüklük korunur.', ''],
      right: 'Evet. Taşımada yön de boy da korunur.' }, async () => {
      await kaybol(c, adaylar, 300);
      await tasi(c, iz, B, 9, 1, 1600);
    });
    await c.say('Döndürülen ya da kısaltılan ok artık aynı vektör değildir.', { speak: '[thoughtful] Döndürülen ya da kısaltılan ok artık aynı vektör değildir.' });
    await c.say('B kaydırıldı: A’nın ucundan 1 sola, 2 yukarı gidiyor.', { speak: 'Be vektörü kaydırıldı: a vektörünün ucundan bir sola, iki yukarı gidiyor.' });
    await c.say('Şimdi A’nın başlangıcından B’nin ucuna bileşkeyi çizeceğiz.', { speak: 'Şimdi a vektörünün başlangıcından be vektörünün ucuna bileşkeyi çizeceğiz.' });
    const R = vek(c, iz, kat, 6, 1, 2, 2, AD.r), okuma = oku(c, iz, kat, 6, 1, 2, 2, { yataysiz: true, renk: RENK.r });
    await sor(c, { tag: 'Uygula', q: 'Bileşke karelerden nasıl okunur?', options: ['4 sağ, 2 yukarı', '2 sol, 2 aşağı', '2 sağ, 2 yukarı'], answer: 2,
      hints: ['B sola gidiyor; 3 sağdan 1 kare geri gelinir. Yatayda 4 değil, 2 kare kalır.', 'Oku ters yönde okudun. Bileşke A’nın başlangıcından B’nin ucuna gider.', ''],
      right: 'Evet. Yatayda 2, düşeyde 2 kare.' }, async () => {
      await ciz(c, R, 900);
      await belir(c, okuma, 300);
    });
    await c.say('Önce 3 sağ, sonra 1 sol: yatayda 2 kare sağdasın.', { speak: 'Önce üç sağ, sonra bir sol: yatayda iki kare sağdasın.' });
    await c.say('Yukarı yalnızca B çıkıyor: 2 kare.', { speak: 'Yukarı yalnızca be vektörü çıkıyor: iki kare.' });
    await c.say('Bileşke, başlangıçtan 2 sağ, 2 yukarı giden oktur.', { speak: 'Bileşke, başlangıçtan iki sağ, iki yukarı giden oktur.' });
  }

  /* ---- Sahne 4 · Kestirme ok ---- */
  async function kestirme(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg), kat = c.S('g', {}, iz.g);
    const p = park(c, iz, kat, 1, 2, { agacsiz: true });
    const bit = nokta(c, iz, kat, 4, 6, true);
    [p.A, p.B, p.R].forEach((v) => { v.style.opacity = 1; });
    await belir(c, iz.g);
    await c.say('Parktaki yürüyüşe dönelim: 3 kare doğu, 4 kare kuzey.', { speak: 'Parktaki yürüyüşe dönelim: üç kare doğu, dört kare kuzey.' });
    // Şerit: A ve B art arda yatırılır (7 kare); R altına yatırılır.
    const serit = c.S('g', {}, iz.g), P = iz.P;
    const kopya = (v) => ok(c, serit, ...v.uclar, { renk: v.renk });
    const kA = kopya(p.A), kB = kopya(p.B);
    await okGit(c, kA, ...P(7, 4), ...P(10, 4), 900);
    await yatir(c, kB, ...P(10, 4), 1100);
    const yedi = yazi(c, serit, P(14, 4)[0] + 14, P(14, 4)[1] + 9, '7 kare', { size: 26, renk: RENK.yazi, hiza: 'start' });
    await belir(c, yedi, 300);
    await c.say('Adımlarını sayarsan toplam 7 kare yürüdün.', { speak: 'Adımlarını sayarsan toplam yedi kare yürüdün.' });
    await par(c.say('Ama bileşke, köşeyi dönmeden giden kestirme oktur.'), okCiz(c, p.R, 1500));
    const kR = kopya(p.R);
    await yatir(c, kR, ...P(7, 3), 1300);
    await belir(c, kesik(c, iz, serit, 14, 4.4, 14, 2.6, { kalin: 3 }), 300);
    await c.say('Kestirme ok, iki okun art arda dizilmiş boyundan kısadır.');
    const okuma = oku(c, iz, kat, 1, 2, 3, 4, { cizgisiz: true, renk: RENK.r });
    await belir(c, okuma, 300);
    await c.say('Bu yüzden bileşkeye 7 kare demeyiz; 3 sağ, 4 yukarı deriz.', { speak: 'Bu yüzden bileşkeye yedi kare demeyiz; üç sağ, dört yukarı deriz.' });
    await kaybol(c, serit, 350);
    // İkinci çizim: aynı yürüyüş, ok ters çizilmiş.
    const ters = c.S('g', {}, iz.g);
    kesik(c, iz, ters, 9, 2, 12, 2, { kalin: 3 }); kesik(c, iz, ters, 12, 2, 12, 6, { kalin: 3 });
    vek(c, iz, ters, 12, 6, -3, -4, { renk: RENK.soluk, acik: true });
    nokta(c, iz, ters, 9, 2); nokta(c, iz, ters, 12, 6, true);
    const adlar = [yazi(c, kat, P(1, 2)[0] + 6, P(1, 2)[1] + 62, 'başlangıç', { size: 22, renk: RENK.vurgu }), yazi(c, kat, P(4, 6)[0], P(4, 6)[1] - 46, 'bitiş', { size: 22, renk: RENK.vurgu })];
    await sol(c, okuma, 0, 200);
    await belir(c, [ters, ...adlar]);
    await c.say('Okun yönü de önemlidir: bileşke başlangıçtan çıkar, bitişte biter.');
    const isaretler = [isaret(c, kat, P(2.5, 0.6)[0], P(2.5, 0.6)[1], true), isaret(c, ters, P(10.5, 0.6)[0], P(10.5, 0.6)[1], false)];
    isaretler.forEach((e) => { e.style.opacity = 0; });
    await sor(c, { tag: 'Uygula', q: 'Evden 4 kare doğuya, sonra 2 kare kuzeye yürüyen biri için bileşke hangisidir?',
      options: ['Varılan noktadan eve çizilen ok', '6 kare doğuya giden ok', 'Evden varılan noktaya çizilen ok'], answer: 2,
      hints: ['Bu ok ters yöne bakar. Bileşke ilk okun başlangıcından son okun ucuna çizilir.', 'Yürünen kareleri topladın. Bileşke 4 sağ, 2 yukarı giden kestirme oktur.', ''],
      right: 'Evet. Bileşke başlangıçtan çıkar, bitişte biter.' }, () => belir(c, isaretler, 400));
    await c.say('Ters çizilen ok bileşke değil, bileşkenin zıt vektörüdür.', { speak: '[thoughtful] Ters çizilen ok bileşke değil, bileşkenin zıt vektörüdür.' });
    await par(c.say('Bileşke hep ilk okun başlangıcından son okun ucuna bakar.'), okCiz(c, p.R, 1500), yanSon(c, bit, 1500));
  }

  /* ---- Sahne 5 · Sıra değişse de ---- */
  async function sira(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg);
    let kat = c.S('g', {}, iz.g);
    const A = vek(c, iz, kat, 6, 1, 3, 0, { ...AD.a, yan: -1, acik: true }), B = vek(c, iz, kat, 9, 1, 0, 4, { ...AD.b, yan: -1, acik: true });
    const B2 = vek(c, iz, kat, 6, 1, 0, 4, AD.b), A2 = vek(c, iz, kat, 6, 1, 3, 0, AD.a);
    const R = vek(c, iz, kat, 6, 1, 3, 4, { ...AD.r, yan: -1, acik: true });
    nokta(c, iz, kat, 6, 1);
    const son = nokta(c, iz, kat, 9, 5, true);
    await belir(c, iz.g);
    B2.style.opacity = 0.6;
    await par(c.say('Bu kez önce 4 kare kuzeye, sonra 3 kare doğuya yürüyelim.', { speak: 'Bu kez önce dört kare kuzeye, sonra üç kare doğuya yürüyelim.' }), okCiz(c, B2, 1800), belir(c, B2.ad, 800));
    A2.style.opacity = 0.6; A2.ad.style.opacity = 1;
    await par(c.say('Yani önce B’yi çizip A’yı onun ucuna taşıyoruz.', { speak: 'Yani önce be vektörünü çizip a vektörünü onun ucuna taşıyoruz.' }), tasi(c, iz, A2, 6, 5, 1800, { izsiz: true }));
    await par(c.say('Varılan nokta yine başlangıçtan 3 sağ, 4 yukarıda.', { speak: 'Varılan nokta yine başlangıçtan üç sağ, dört yukarıda.' }), yanSon(c, son, 2400));
    await par(c.say('İki yol da aynı noktada bitiyor.'), okCiz(c, R, 1500));
    await kaybol(c, kat, 350);

    kat = c.S('g', {}, iz.g);
    const B3 = vek(c, iz, kat, 6, 1, 1, 3, AD.b), A3 = vek(c, iz, kat, 10, 1, 2, 1, AD.a), R3 = vek(c, iz, kat, 6, 1, 3, 4, { ...AD.r, yan: -1 });
    const okuma = oku(c, iz, kat, 6, 1, 3, 4, { dikey: 'sag', renk: RENK.r });
    nokta(c, iz, kat, 6, 1);
    await par(ciz(c, B3), ciz(c, A3));
    await sor(c, { tag: 'Uygula', q: 'A: 2 sağ, 1 yukarı. B: 1 sağ, 3 yukarı. Önce B çizilip A onun ucuna taşınırsa bileşke ne olur?',
      options: ['3 sol, 4 aşağı', '3 sağ, 4 yukarı', 'Sıra değiştiği için bilinemez'], answer: 1,
      hints: ['Sıra değişince bileşke ters dönmez. Başlangıç ve bitiş noktaları aynı kalır.', '', 'Karelerden sayabilirsin. Sağa 1 ile 2, yukarı 3 ile 1 gidilir: 3 sağ, 4 yukarı.'],
      right: 'Evet. Sıra değişti, bileşke değişmedi.' }, async () => {
      await tasi(c, iz, A3, 7, 4, 1200);
      await ciz(c, R3, 900);
      await belir(c, okuma, 300);
    });
    await c.say('Hangi oku önce çizersen çiz, aynı noktaya varırsın.');
    await belir(c, esitlik(c, kat, iz.P(12.4, 0)[0], iz.P(0, 5.6)[1], [['A', RENK.a, 1], ['+'], ['B', RENK.b, 1], ['='], ['B', RENK.b, 1], ['+'], ['A', RENK.a, 1]], { size: 34 }));
    await c.say('Vektörlerin toplamı, toplama sırasına bağlı değildir.', { speak: 'Vektörlerin toplamı, [short pause] toplama sırasına bağlı değildir.' });
    c.note('<b>A + B = B + A</b><br>3 sağ + 4 yukarı ile 4 yukarı + 3 sağ aynı bileşkeyi verir', 'Sıra değişse de', 'sira');
  }

  /* ---- Sahne 6 · Aynı doğrultuda da çalışır ---- */
  async function ayniDogrultu(c) {
    const svg = c.svg(1000, 562), iz = duzlem(c, svg, { gulsuz: true }), kat = c.S('g', {}, iz.g);
    const a = { ...AD.a, yer: 'bas' }, okuR = (m) => ({ renk: RENK.r, ad: m, duz: true, yer: 'uc' });
    const A1 = vek(c, iz, kat, 2, 6.6, 4, 0, a), B1 = vek(c, iz, kat, 10, 7.2, 2, 0, AD.b), R1 = vek(c, iz, kat, 2, 6, 6, 0, okuR('6 sağ'));
    await belir(c, iz.g);
    await c.say('Uç uca ekleme, aynı doğrultudaki vektörlerde de çalışır.');
    await ciz(c, A1); await ciz(c, B1);
    await par(c.say('A 4 sağ, B 2 sağ: B’yi A’nın ucuna taşıyalım.', { speak: 'a vektörü dört sağ, be vektörü iki sağ: be vektörünü a vektörünün ucuna taşıyalım.' }), tasi(c, iz, B1, 6, 6.6, 1600));
    await par(c.say('Baştan sona çizilen ok 6 kare sağa gider.', { speak: 'Baştan sona çizilen ok altı kare sağa gider.' }), ciz(c, R1, 1200));
    await c.say('Aynı yön toplar kuralının çizimi budur.');
    const A2 = vek(c, iz, kat, 2, 3.9, 4, 0, a), B2 = vek(c, iz, kat, 12, 4.4, -2, 0, { ...AD.b, yan: -1 }), R2 = vek(c, iz, kat, 2, 3.3, 2, 0, okuR('2 sağ'));
    await ciz(c, A2); await ciz(c, B2);
    await c.say('Şimdi B’yi ters çevirelim: A 4 sağ, B 2 sol.', { speak: 'Şimdi be vektörünü ters çevirelim: a vektörü dört sağ, be vektörü iki sol.' });
    await par(c.say('B, A’nın ucundan geriye doğru 2 kare gelir.', { speak: 'Be vektörü, a vektörünün ucundan geriye doğru iki kare gelir.' }), tasi(c, iz, B2, 6, 4.4, 1600));
    await sor(c, { tag: 'Uygula', q: 'A: 4 sağ. B: 2 sol. Uç uca eklenince bileşke nedir?', options: ['6 sağ', '2 sol', '2 sağ'], answer: 2,
      hints: ['Büyüklükleri topladın; oysa B sola bakıyor. 4 sağdan 2 kare geri gelinir: 2 sağ.', 'Bileşke son okun yönüne bakmak zorunda değildir. Son uç, başlangıcın 2 kare sağındadır.', ''],
      right: 'Evet. 4 sağdan 2 kare geri gelindi.' }, async () => {
      await belir(c, [kesik(c, iz, kat, 2, 3.9, 2, 3.3), kesik(c, iz, kat, 4, 4.4, 4, 3.3)], 250);
      await ciz(c, R2, 900);
    });
    await c.say('Son uç başlangıcın 2 kare sağında: zıt yön çıkarır.', { speak: 'Son uç başlangıcın iki kare sağında: zıt yön çıkarır.' });
    await c.say('Bileşke büyük olanın yönünde, çünkü son uç o tarafta kaldı.');
    const A3 = vek(c, iz, kat, 2, 1.2, 4, 0, a), B3 = vek(c, iz, kat, 13, 1.7, -4, 0, { ...AD.b, yan: -1 });
    await ciz(c, A3); await ciz(c, B3);
    await c.say('Peki A 4 sağ, B 4 sol olursa?', { speak: '[curious] Peki a vektörü dört sağ, be vektörü dört sol olursa?' });
    const n1 = nokta(c, iz, kat, 2, 1.2), n2 = nokta(c, iz, kat, 2, 1.7, true), sifir = yazi(c, kat, iz.P(8, 0)[0], iz.P(0, 1.45)[1] + 9, 'bileşke sıfır', { size: 26, renk: RENK.r, hiza: 'start' });
    [n1, n2, sifir].forEach((e) => { e.style.opacity = 0; });
    await par(c.say('B’nin ucu tam başlangıç noktasına döner; çizilecek ok kalmaz.', { speak: 'Be vektörünün ucu tam başlangıç noktasına döner; çizilecek ok kalmaz.' }), (async () => {
      await tasi(c, iz, B3, 6, 1.7, 1600);
      await belir(c, [n1, n2], 250); await yanSon(c, [n1, n2], 1500); await belir(c, sifir, 300);
    })());
    await c.say('Bu durumda iki vektör birbirinin etkisini götürür.');
  }

  /* ---- Sahne 7 · Uçak, rüzgâr ve sen ---- */
  async function ucakVeSen(c) {
    const svg = c.svg(1000, 562), hava = c.S('g', {}, svg);
    const X = 200, Y = 410, M = [330, 0], W = [70, -170];
    const uc = ucak(c, hava, X, Y);
    const motor = c.S('g', {}, hava), ruzgar = c.S('g', {}, hava), hiz = c.S('g', {}, hava);
    const oM = ok(c, motor, X, Y, X + M[0], Y, { renk: RENK.a }); yazi(c, motor, X + M[0] / 2 + 20, Y + 40, 'motorun sağladığı hız', { size: 24, renk: RENK.a });
    const oW = ok(c, ruzgar, X, Y, X + W[0], Y + W[1], { renk: RENK.b }); yazi(c, ruzgar, X + W[0] + 14, Y + W[1] + 60, 'rüzgârın sürükleme hızı', { size: 24, renk: RENK.b, hiza: 'start' });
    const oR = ok(c, hiz, X, Y, X + M[0] + W[0], Y + W[1], { renk: RENK.r }); yazi(c, hiz, X + 150, Y - 150, 'uçağın hızı', { size: 24, renk: RENK.r });
    [motor, ruzgar, hiz].forEach((g) => { g.style.opacity = 0; });
    const ac = (g, o, ms = 900) => { g.style.opacity = 1; return par(okCiz(c, o, ms), belir(c, g.querySelector('text'), ms)); };
    await belir(c, hava);
    await c.say('Uç uca eklenen oklar yürüyüş olmak zorunda değildir.');
    await ac(motor, oM);
    await c.say('Bir uçak belli bir yönde, motorunun sağladığı hızla ilerliyor.');
    await ac(ruzgar, oW);
    await c.say('Farklı bir yönden esen rüzgâr uçağı sürüklüyor.');
    const iz0 = ok(c, hava, X, Y, X + W[0], Y + W[1], { renk: RENK.b, kalin: 4, uc: 14 });
    iz0.style.opacity = 0.3; hava.insertBefore(iz0, ruzgar);
    await par(c.say('Motorun sağladığı hız ile rüzgârın sürükleme hızı uç uca eklenir.'), kay(c, ruzgar, 0, 0, M[0], 0, 1800));
    await ac(hiz, oR, 1200);
    await c.say('Bileşke, uçağın o andaki hızıdır.');
    await par(c.say('Uçak bu yüzden yöneldiği yönden farklı bir yöne gider.'), c.tween(3200, (e) => uc.git((M[0] + W[0]) * 0.8 * e, W[1] * 0.8 * e)));
    await c.say('Yalnızca aynı tür nicelikler toplanır: hız hızla, kuvvet kuvvetle.', { speak: '[thoughtful] Yalnızca aynı tür nicelikler toplanır: hız hızla, kuvvet kuvvetle.' });
    await c.say('Şimdi üç çifti sen topla.');
    await kaybol(c, hava, 350);

    // Dene: ikinci ok birincinin ucuna taşınır; bileşke kare sayısıyla seçilir.
    const iz = duzlem(c, svg, { gulsuz: true });
    await belir(c, iz.g);
    /* ilk: O'dan çıkan ok; ikinci: ayrı duran, taşınacak ok. [di, dj, renk rolü, etiket yanı] */
    const maddeler = [
      { o: [5, 2], ilk: [4, 0, 'a', 1], ikinci: [0, 2, 'b', -1], ayri: [11, 4], ry: 1, okuma: { cizgisiz: true },
        q: 'A: 4 sağ. B: 2 yukarı. Bileşke hangisidir?', options: ['6 sağ', '4 sağ, 2 yukarı', '2 sağ, 4 yukarı'], answer: 1,
        hints: ['Büyüklükler yalnızca aynı yönde toplanır; B yukarı bakıyor.', '', 'Okları karıştırdın: sağa giden A’dır, 4 karedir.'], right: 'Evet. 4 sağ, 2 yukarı.' },
      { o: [5, 2], ilk: [3, 1, 'a', 1], ikinci: [-1, 2, 'b', -1], ayri: [12, 3], ry: 1, okuma: {},
        q: 'A: 3 sağ, 1 yukarı. B: 1 sol, 2 yukarı. Bileşke hangisidir?', options: ['4 sağ, 3 yukarı', '2 sağ, 1 yukarı', '2 sağ, 3 yukarı'], answer: 2,
        hints: ['B sola gidiyor; 3 sağdan 1 kare geri gelinir.', 'Yukarı iki ok da çıkıyor: 1 kare ile 2 kare.', ''], right: 'Evet. 2 sağ, 3 yukarı.' },
      { o: [4, 3.6], ilk: [5, 0, 'a', 0], ikinci: [-3, 0, 'b', -1], ayri: [13, 5.5], ust: 0.5, alt: 0.6, okuma: { cizgisiz: true },
        q: 'A: 5 sağ. B: 3 sol. Bileşke hangisidir?', options: ['2 sağ', '8 sağ', '2 sol'], answer: 0,
        hints: ['', 'B sola bakıyor; 5 sağdan 3 kare geri gelinir.', 'Son uç, başlangıcın 2 kare sağında kalır.'], right: 'Evet. 5 sağdan 3 kare geri: 2 sağ.' },
      { o: [6, 2], ilk: [-1, 2, 'b', 1], ikinci: [3, 1, 'a', 1], ayri: [10, 2], ry: -1, okuma: {},
        q: 'Aynı çift, bu kez önce B: 1 sol, 2 yukarı; ucunda A: 3 sağ, 1 yukarı. Bileşke hangisidir?', options: ['2 sol, 3 aşağı', '4 sağ, 3 yukarı', 'Yine 2 sağ, 3 yukarı'], answer: 2,
        hints: ['Sıra değişince bileşke ters dönmez.', 'B sola gidiyor; yatayda 3 sağdan 1 kare geri gelinir.', ''], right: 'Evet. Sıra değişti, bileşke değişmedi.' },
    ];
    await c.say('İkinci ok taşınıyor; bileşkeyi karelerden oku.', { noWait: true });
    for (const m of maddeler) {
      const kat = c.S('g', {}, iz.g), [oi, oj] = m.o, [d1, e1, r1, y1] = m.ilk, [d2, e2, r2, y2] = m.ikinci, ust = m.ust || 0, alt = m.alt || 0;
      nokta(c, iz, kat, oi, oj);
      const V1 = vek(c, iz, kat, oi, oj, d1, e1, y1 ? { ...AD[r1], yan: y1 } : { ...AD[r1], yer: 'bas' }), V2 = vek(c, iz, kat, m.ayri[0], m.ayri[1], d2, e2, { ...AD[r2], yan: y2 });
      const R = vek(c, iz, kat, oi, oj - alt, d1 + d2, e1 + e2, m.ry ? { ...AD.r, yan: m.ry } : { renk: RENK.r });
      const okuma = oku(c, iz, kat, oi, oj - alt, d1 + d2, e1 + e2, { ...m.okuma, renk: RENK.r });
      await par(ciz(c, V1), ciz(c, V2));
      await tasi(c, iz, V2, oi + d1, oj + e1 + ust, 1300);
      await sor(c, { tag: 'Sıra sende', q: m.q, options: m.options, answer: m.answer, hints: m.hints, right: m.right }, async () => {
        await ciz(c, R, 900);
        await belir(c, okuma, 300);
      });
      await c.wait(300);
      await kaybol(c, kat, 300);
    }
    const kat = c.S('g', {}, iz.g);
    vek(c, iz, kat, 5, 2, 3, 1, { ...AD.a, acik: true }); vek(c, iz, kat, 8, 3, -1, 2, { ...AD.b, yan: -1, acik: true });
    const R = vek(c, iz, kat, 5, 2, 2, 3, AD.r);
    nokta(c, iz, kat, 5, 2);
    await belir(c, kat);
    await par(c.say('Üç çiftte de aynı üç basamak işledi: taşı, çiz, oku.'), ciz(c, R, 1500));
    await c.say('Okları uç uca diz, baştan sona bir ok çek.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c5', kicker: 'Konu C · Vektörler', title: 'Uç uca ekleme', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Uç uca ekleme', hook: 'Önce 3 kare doğuya, sonra 4 kare kuzeye yürüdün; başladığın yerden bakan biri seni hangi yönde görür?', button: 'Derse başla ›' },
    scenes: [
      { title: 'İki yürüyüş, iki doğrultu', goal: 'Farklı doğrultuda iki yürüyüşün sonucunu tahmin et.', run: ikiYuruyus },
      { title: 'Üç basamak', goal: 'İki oku uç uca ekleyip bileşkeyi çiz.', run: ucBasamak },
      { title: 'Eğik bir okla', goal: 'Eğik bir oku taşı, bileşkeyi karelerden oku.', run: egik },
      { title: 'Kestirme ok', goal: 'Bileşkenin boyunu ve yönünü doğru yorumla.', run: kestirme },
      { title: 'Sıra değişse de', goal: 'Sıra değişince bileşkenin değişmediğini gör.', run: sira },
      { title: 'Aynı doğrultuda da çalışır', goal: 'Yöntemi aynı doğrultudaki oklara uygula.', run: ayniDogrultu },
      { title: 'Uçak, rüzgâr ve sen', goal: 'Üç çifti uç uca ekleyerek topla.', run: ucakVeSen },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'A: 2 sağ, 2 yukarı. B: 3 sağ, 1 aşağı. Uç uca eklenince bileşke hangi oktur?',
        options: ['Başlangıçtan 5 sağ, 3 yukarı giden ok', 'Başlangıçtan 5 sağ, 1 yukarı giden ok', 'Son uçtan başlangıca çizilen, 5 sol, 1 aşağı giden ok'], answer: 1,
        why: ['B aşağı gidiyor; 2 yukarıdan 1 kare inilir.', 'B, A’nın ucundan 3 sağ, 1 aşağı gider: 5 sağ, 1 yukarı.', 'Bileşke ilk okun başlangıcından son okun ucuna çizilir.'], scene: 2 },
      { q: '3 kare doğuya, sonra 4 kare kuzeye yürüyen biri başlangıçtan 7 kare uzakta mıdır?',
        options: ['Evet; 3 + 4 = 7 eder', 'Hayır; 4 − 3 = 1 kare uzaktadır', 'Hayır; bileşke 3 sağ, 4 yukarı giden kestirme oktur ve 7 kareden kısadır'], answer: 2,
        why: ['7 kare yürüdüğün karelerdir; bileşke köşeyi dönmeyen kestirme oktur.', 'Çıkarma yalnızca aynı doğrultuda, zıt yönlü vektörlerde yapılır.', 'Kestirme ok, art arda dizilen iki okun boyundan kısadır.'], scene: 3 },
      { q: 'Bir robot süpürge kareli zeminde iki yol alıyor. A: 4 sağ, 1 yukarı. B: 2 sol, 3 yukarı. Uç uca eklenince bileşke hangi oktur?',
        options: ['Başlangıçtan 2 sağ, 4 yukarı giden ok', 'Başlangıçtan 6 sağ, 4 yukarı giden ok', 'Başlangıçtan 2 sağ, 2 yukarı giden ok'], answer: 0,
        why: ['Yatayda 4 sağdan 2 kare geri gelinir: 2 sağ. Yukarı iki ok da çıkar: 1 + 3 = 4.', 'B sola gidiyor; 4 ile 2 toplanmaz, 4 sağdan 2 kare geri gelinir.', 'İki ok da yukarı çıkıyor; yukarı kareler çıkarılmaz, toplanır: 1 + 3 = 4.'], scene: 2 },
      { q: 'Naz, iki vektörü uç uca eklerken “Hangisini önce çizdiğim bileşkeyi değiştirir” diyor. Doğru karşılık hangisidir?',
        options: ['Doğru; önce çizilen ok bileşkenin yönünü belirler', 'Yanlış; sıra değişse de başlangıçtan aynı noktaya varılır', 'Yanlış; sıra değişince yön aynı kalır ama boy değişir'], answer: 1,
        why: ['Bileşke ilk okun başlangıcından son okun ucuna çizilir; sıra değişse de bu iki nokta aynı kalır.', 'A + B = B + A: hangi sırayla eklenirse eklensin bileşke aynı çıkar.', 'Boy da yön de değişmez; bileşke aynı oktur.'], scene: 4 },
    ],
    summary: ['<b>Okları uç uca diz, baştan sona bir ok çek.</b>', 'Bileşke, ilk okun başlangıcından son okun ucuna çizilir ve karelerden okunur.', 'A + B = B + A: sıra değişse de bileşke değişmez.'],
    nextLesson: { href: 'c6-paralelkenar.html', label: 'Sonraki: Paralelkenar yöntemi ›' },
  });
})();
