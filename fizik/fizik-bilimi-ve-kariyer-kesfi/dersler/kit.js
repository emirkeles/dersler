/* Fizik Bilimi ve Kariyer Keşfi temasının ortak araçları (window.KIT). Tahta 1000×562 birimdir; y aşağı doğru büyür.
   Temada formül ve kaydırıcı yok; ortak etkileşim "kartı doğru kutuya gönder"dir: kart tahtada görünür,
   öğrenci yan sütundaki seçenekten kutuyu seçer (sec), kart kutusuna uçar (ucur).
   Renkler tema boyunca aynı kalır: fizik sarı, disiplin mavi, alt dal yeşil, bilim insanı turuncu, kurum mor, kaynak turkuaz.
   Not: tahtadaki <text> öğelerinin rengi CSS ile verilir; `fill` özniteliği işlemez, `style` kullan. */
window.KIT = (() => {
  'use strict';
  const RENK = {
    fizik: 'var(--c5)', disiplin: 'var(--c1)', dal: 'var(--c3)', kisi: 'var(--c2)', kurum: 'var(--c4)', kaynak: 'var(--c6)',
    cizgi: '#c3cbea', ince: '#5b678f', soluk: 'var(--muted)', yazi: 'var(--text)',
    iyi: 'var(--good)', kotu: 'var(--bad)', yuzey: '#18213f', kenarlik: '#33437f', koyu: '#101936',
  };

  /* ---- temel çizim ---- */
  const liste = (x) => (Array.isArray(x) ? x : [x]);
  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 22, 'font-weight': o.kalin || 600,
    style: 'fill:' + (o.renk || RENK.yazi), text: metin,
  }, p);
  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', Object.assign({
    x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx, fill: o.dolgu || RENK.yuzey, stroke: o.renk || RENK.kenarlik, 'stroke-width': o.w || 2,
  }, o.kesik ? { 'stroke-dasharray': '8 7' } : {}), p);
  const cizgi = (c, p, x1, y1, x2, y2, renk = RENK.ince, w = 3, o = {}) => c.S('line', Object.assign({
    x1, y1, x2, y2, stroke: renk, 'stroke-width': w, 'stroke-linecap': 'round',
  }, o), p);
  const gizle = (...els) => els.flat().forEach((e) => { e.style.opacity = 0; });
  /* Öğeyi (ya da öğeleri) şimdiki saydamlığından hedefe götürür. Zamanlama her zaman c.tween ile kurulur. */
  const belir = (c, el, ms = 350, hedef = 1) => {
    const es = liste(el), bas = es.map((e) => (e.style.opacity === '' ? (hedef > 0 ? 0 : 1) : +e.style.opacity));
    return c.tween(ms, (e) => es.forEach((x, i) => { x.style.opacity = bas[i] + (hedef - bas[i]) * e; }));
  };
  const par = (...ps) => Promise.all(ps);

  /* ---- yazı ---- */
  /* t (<text>) içine metni `en` birim genişliğe sığacak satırlarla yazar; '\n' satır sonudur. Satır sayısını döndürür. */
  function sar(c, t, metin, en, x, aralik) {
    t.textContent = '';
    const olc = c.S('tspan', {}, t), satirlar = [];
    String(metin).split('\n').forEach((parca) => {
      let satir = '';
      parca.split(' ').forEach((k) => {
        const aday = satir ? satir + ' ' + k : k;
        olc.textContent = aday;
        if (satir && olc.getComputedTextLength() > en) { satirlar.push(satir); satir = k; } else satir = aday;
      });
      satirlar.push(satir);
    });
    t.textContent = '';
    satirlar.forEach((s, i) => c.S('tspan', { x, dy: i ? aralik : 0, text: s }, t));
    return satirlar.length;
  }
  /* Çok satırlı yazı. (x, y) ilk satırın taban çizgisidir; o.hiza 'middle' ise x satırların ortasıdır. */
  function paragraf(c, p, x, y, metin, o = {}) {
    const size = o.size || 22, aralik = size * (o.aralik || 1.34);
    const el = yazi(c, p, x, y, '', Object.assign({ hiza: 'start', kalin: 500 }, o, { size }));
    const satir = sar(c, el, metin, o.en || 300, x, aralik);
    return { el, satir, yukseklik: satir * aralik };
  }
  /* Kart: çerçeve, isteğe bağlı küçük başlık ve dikeyde ortalanmış metin. (x, y) sol üst köşedir. */
  function kart(c, p, x, y, w, h, o = {}) {
    const g = c.S('g', { transform: `translate(${x} ${y})` }, p);
    const cerceve = kutu(c, g, 0, 0, w, h, { renk: o.renk, dolgu: o.dolgu, kesik: o.kesik });
    const pad = o.pad || 22, size = o.size || 22;
    let ust = 0, baslik = null;
    if (o.baslik) { baslik = yazi(c, g, pad, 36, o.baslik, { hiza: 'start', size: o.baslikSize || 19, kalin: 650, renk: o.baslikRenk || o.renk || RENK.soluk }); ust = 40; }
    const m = paragraf(c, g, pad, 0, o.metin || '', { size, en: w - 2 * pad, kalin: o.kalin || 500, renk: o.yaziRenk });
    m.el.setAttribute('y', ust + (h - ust - m.yukseklik) / 2 + size * 0.9);
    return { g, kutu: cerceve, baslik, metin: m.el, x, y, w, h };
  }
  /* Etiket: tek satır yazı ve çevresinde kutu. (cx, cy) merkezdir; genişlik yazıya göre ayarlanır. */
  function etiket(c, p, cx, cy, metin, o = {}) {
    const size = o.size || 20, h = o.h || size * 2;
    const g = c.S('g', { transform: `translate(${cx} ${cy})` }, p);
    const cerceve = kutu(c, g, 0, -h / 2, 10, h, { renk: o.renk, dolgu: o.dolgu, rx: 10 });
    const t = yazi(c, g, 0, size * 0.35, metin, { size, kalin: o.kalin || 600, renk: o.yaziRenk });
    const w = o.w || t.getComputedTextLength() + size * 1.6;
    cerceve.setAttribute('x', -w / 2); cerceve.setAttribute('width', w);
    return { g, kutu: cerceve, yazi: t, cx, cy, w, h };
  }

  /* ---- yer değiştirme ---- */
  const yer = (g, x, y, s = 1) => g.setAttribute('transform', `translate(${x} ${y}) scale(${s})`);
  /* g'yi a = [x, y, ölçek] durumundan b durumuna taşır. */
  const ucur = (c, g, a, b, ms = 600) => c.tween(ms, (e) => yer(g, a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e, (a[2] || 1) + ((b[2] || 1) - (a[2] || 1)) * e));

  /* ---- hızlı seçim ---- */
  /* Yan sütunda seçenekler; doğru seçilince beklemeden döner (c.choice'taki "Devam" adımı yok), panel bir sonraki
     sec çağrısına ya da c.clearAct'e kadar gerekçesiyle durur. answer verilmezse her seçenek kabul edilir.
     Sınıflar c.choice ile aynıdır; araclar/olc.js bu paneli de kendiliğinden geçer. */
  function sec(c, o) {
    c.clearAct();
    return new Promise((res) => {
      const opts = c.h('div', { class: 'opts' }), fb = c.h('div');
      let deneme = 0;
      o.options.forEach((txt, i) => {
        const b = c.h('button', { class: 'opt', html: txt });
        b.addEventListener('click', () => {
          deneme++;
          if (o.answer == null || i === o.answer) {
            b.classList.add('right');
            [...opts.children].forEach((x) => { x.disabled = true; });
            const iyi = Array.isArray(o.right) ? o.right[i] : o.right;
            if (iyi) c.feedback(fb, 'ok', iyi);
            res({ tries: deneme, picked: i });
          } else {
            b.classList.add('wrong'); b.disabled = true;
            c.feedback(fb, 'no', (Array.isArray(o.hints) ? o.hints[i] : o.hints) || 'Tam değil. Bir daha bak.');
          }
        });
        opts.appendChild(b);
      });
      c.panel(null, c.h('span', { class: 'tag' }, o.tag || 'Sıra sende'), c.h('p', { class: 'q', html: o.q }), opts, fb);
    });
  }
  /* Öğeleri sırayla sorar: goster(öğe) → öğrenci seçer → yerlestir(öğe). Her alan öğeye göre hesaplanan bir işlevdir. */
  async function sirayla(c, ogeler, a) {
    for (let i = 0; i < ogeler.length; i++) {
      const o = ogeler[i];
      await a.goster(o, i);
      await sec(c, {
        tag: a.tag, q: typeof a.soru === 'function' ? a.soru(o, i) : a.soru, options: a.secenekler(o, i), answer: a.dogru(o, i),
        hints: a.ipucu ? a.ipucu(o, i) : null, right: a.gerekce ? a.gerekce(o, i) : null,
      });
      await a.yerlestir(o, i);
      await c.wait(a.bekle == null ? 900 : a.bekle);
    }
    c.clearAct();
  }

  /* ---- fiziğin sekiz alt dalı (ders kitabı s. 23–29; plan/…/PLAN.md bölüm 6b) ---- */
  const DALLAR = [
    { id: 'optik', nitelik: 'ışık olayları', ad: 'optik', inceler: 'Işığın yansıması, kırılması gibi ışık olayları', gorsel: ['prizma', 'golge'] },
    { id: 'mekanik', nitelik: 'hareket ve kuvvet', ad: 'mekanik', inceler: 'Kuvvet, hareket, denge', gorsel: ['metronom', 'araba'] },
    { id: 'termo', nitelik: 'ısı ve sıcaklık', ad: 'termodinamik', inceler: 'Isı, sıcaklık, hâl değişimi', gorsel: ['kaynayan', 'termometre'] },
    { id: 'elektro', nitelik: 'elektrik ve mıknatıs', ad: 'elektromanyetizma', inceler: 'Elektrik yükleri, elektrik akımı, manyetizma', gorsel: ['pusula', 'bobin'] },
    { id: 'kati', nitelik: 'kristal ve yarı iletken', ad: 'katı hâl fiziği', inceler: 'Kristal yapılı ve yarı iletken maddeler', gorsel: ['kristal', 'devre'] },
    { id: 'atom', nitelik: 'atomun yapısı', ad: 'atom fiziği', inceler: 'Atomun yapısı, elektron dizilimi, enerji seviyeleri', gorsel: ['atom', 'molekul'] },
    { id: 'nukleer', nitelik: 'atom çekirdeği', ad: 'nükleer fizik', inceler: 'Atom çekirdeği ve çekirdekteki tepkimeler', gorsel: ['santral', 'bt'] },
    { id: 'plazma', nitelik: 'plazma hâli', ad: 'yüksek enerji ve plazma fiziği', inceler: 'Yüksek enerjili parçacıklar, maddenin plazma hâli', gorsel: ['kutup', 'neon'] },
  ];
  const dal = (id) => DALLAR.find((d) => d.id === id);
  const buyuk = (s) => s.charAt(0).toLocaleUpperCase('tr') + s.slice(1);

  /* ---- görseller: 120×90 birimlik küçük çizimler ---- */
  const A = '#e8ecff', G = '#9aa4c7';
  const yol = (c, g, d, o = {}) => c.S('path', Object.assign({ d, fill: 'none', stroke: A, 'stroke-width': 2.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, o), g);
  const daire = (c, g, cx, cy, r, o = {}) => c.S('circle', Object.assign({ cx, cy, r, fill: A }, o), g);
  const dik = (c, g, x, y, w, h, o = {}) => c.S('rect', Object.assign({ x, y, width: w, height: h, fill: A }, o), g);
  const IKON = {
    metronom(c, g) {
      yol(c, g, 'M46 74 L55 16 L65 16 L74 74 Z', { fill: '#8a6a45', stroke: '#c9a777' });
      dik(c, g, 40, 74, 40, 7, { rx: 2, fill: '#c9a777' });
      yol(c, g, 'M60 68 L45 22', { 'stroke-width': 3 });
      dik(c, g, 42, 32, 12, 9, { rx: 2, transform: 'rotate(-18 48 36)' });
    },
    araba(c, g) {
      cizgi(c, g, 8, 74, 112, 74, RENK.ince, 2);
      yol(c, g, 'M60 62 L64 46 L76 36 L98 36 L109 47 L112 62 Z', { fill: '#6ea8ff', stroke: 'none' });
      daire(c, g, 76, 65, 8, { fill: RENK.koyu, stroke: G, 'stroke-width': 3 });
      daire(c, g, 99, 65, 8, { fill: RENK.koyu, stroke: G, 'stroke-width': 3 });
      daire(c, g, 35, 28, 7, { fill: '#f5b04c' });
      yol(c, g, 'M37 37 L29 56 L20 73 M29 56 L37 73 M36 42 L59 47', { stroke: '#f5b04c', 'stroke-width': 5 });
    },
    kaynayan(c, g) {
      yol(c, g, 'M46 36 q-6 -8 0 -14 q6 -6 0 -12 M60 36 q-6 -8 0 -14 q6 -6 0 -12 M74 36 q-6 -8 0 -14 q6 -6 0 -12', { stroke: G });
      dik(c, g, 34, 44, 52, 30, { rx: 5, fill: G });
      dik(c, g, 30, 40, 60, 6, { rx: 3 });
      yol(c, g, 'M34 52 h-10 M86 52 h10', { 'stroke-width': 5 });
    },
    termometre(c, g) {
      dik(c, g, 53, 10, 14, 56, { rx: 7, fill: RENK.koyu, stroke: A, 'stroke-width': 2.5 });
      daire(c, g, 60, 70, 12, { fill: '#ff6b6b', stroke: A, 'stroke-width': 2.5 });
      dik(c, g, 57, 30, 6, 36, { rx: 3, fill: '#ff6b6b' });
      yol(c, g, 'M74 20 h8 M74 32 h8 M74 44 h8 M74 56 h8', { stroke: G, 'stroke-width': 2 });
    },
    pusula(c, g) {
      daire(c, g, 60, 45, 34, { fill: RENK.koyu, stroke: A, 'stroke-width': 3 });
      yol(c, g, 'M60 15 v6 M60 69 v6 M30 45 h6 M84 45 h6', { stroke: G, 'stroke-width': 2 });
      yol(c, g, 'M60 45 L52 40 L72 24 Z', { fill: '#ff6b6b', stroke: 'none' });
      yol(c, g, 'M60 45 L68 50 L48 66 Z', { fill: A, stroke: 'none' });
      daire(c, g, 60, 45, 3, { fill: RENK.koyu });
    },
    bobin(c, g) {
      dik(c, g, 12, 14, 40, 20, { rx: 4, fill: '#3ddc97' });
      dik(c, g, 52, 20, 5, 8, { fill: A });
      yol(c, g, 'M12 24 C2 24 2 62 34 62 M57 24 C76 24 96 40 90 62', { stroke: '#3cc8e8', 'stroke-width': 2 });
      cizgi(c, g, 28, 62, 100, 62, G, 6);
      yol(c, g, 'M36 70 v-16 M44 70 v-16 M52 70 v-16 M60 70 v-16 M68 70 v-16 M76 70 v-16 M84 70 v-16', { stroke: '#3cc8e8', 'stroke-width': 3 });
      yol(c, g, 'M100 58 q10 6 6 16 M103 66 q10 2 8 12', { stroke: A, 'stroke-width': 2 });
    },
    prizma(c, g) {
      yol(c, g, 'M8 56 L50 46', { 'stroke-width': 3 });
      ['#ff6b6b', '#f5b04c', '#ffe066', '#3ddc97', '#6ea8ff', '#c792ff'].forEach((r, i) => yol(c, g, `M70 46 L114 ${38 + i * 7}`, { stroke: r, 'stroke-width': 3 }));
      yol(c, g, 'M60 16 L86 68 L34 68 Z', { fill: 'rgba(232,236,255,.18)', stroke: A });
    },
    golge(c, g) {
      dik(c, g, 74, 8, 38, 74, { rx: 3, fill: A, opacity: 0.92 });
      daire(c, g, 14, 45, 7, { fill: '#ffe066' });
      yol(c, g, 'M22 41 L74 12 M22 49 L74 78', { stroke: '#ffe066', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' });
      daire(c, g, 46, 36, 5, { fill: '#f5b04c' });
      yol(c, g, 'M46 41 L40 58 L52 58 Z M46 58 v10', { fill: '#f5b04c', stroke: '#f5b04c', 'stroke-width': 2 });
      daire(c, g, 93, 28, 9, { fill: '#2a3257' });
      yol(c, g, 'M93 37 L82 66 L104 66 Z', { fill: '#2a3257', stroke: 'none' });
    },
    kristal(c, g) {
      yol(c, g, 'M26 76 L34 34 L44 24 L54 36 L50 76 Z', { fill: '#9b6bdc', stroke: '#d9c2ff', 'stroke-width': 1.5 });
      yol(c, g, 'M50 76 L56 30 L67 16 L78 32 L76 76 Z', { fill: '#c792ff', stroke: '#eadbff', 'stroke-width': 1.5 });
      yol(c, g, 'M76 76 L80 48 L88 40 L97 50 L95 76 Z', { fill: '#7d4fc4', stroke: '#d9c2ff', 'stroke-width': 1.5 });
      yol(c, g, 'M44 24 L42 76 M67 16 L64 76 M88 40 L86 76', { stroke: 'rgba(255,255,255,.35)', 'stroke-width': 1.2 });
      cizgi(c, g, 16, 76, 104, 76, RENK.ince, 2);
    },
    devre(c, g) {
      dik(c, g, 10, 12, 100, 66, { rx: 5, fill: '#1f6b4f' });
      yol(c, g, 'M24 78 V58 H38 M52 12 V24 M96 12 V30 H80 M110 62 H88 V52 M10 34 H26', { stroke: '#7be3b5', 'stroke-width': 2 });
      dik(c, g, 38, 26, 30, 30, { rx: 2, fill: '#0c1022', stroke: G, 'stroke-width': 1.5 });
      dik(c, g, 76, 40, 16, 12, { rx: 1, fill: '#0c1022', stroke: G, 'stroke-width': 1.5 });
      yol(c, g, 'M44 26 v-5 M53 26 v-5 M62 26 v-5 M44 56 v5 M53 56 v5 M62 56 v5', { stroke: G, 'stroke-width': 2 });
      daire(c, g, 24, 58, 3, { fill: '#7be3b5' }); daire(c, g, 26, 34, 3, { fill: '#7be3b5' });
    },
    atom(c, g) {
      [0, 60, 120].forEach((a) => c.S('ellipse', { cx: 60, cy: 45, rx: 44, ry: 15, fill: 'none', stroke: G, 'stroke-width': 1.8, transform: `rotate(${a} 60 45)` }, g));
      daire(c, g, 56, 43, 6, { fill: '#ff6b6b' }); daire(c, g, 64, 43, 6, { fill: G }); daire(c, g, 60, 50, 6, { fill: '#ff6b6b' });
      daire(c, g, 104, 45, 4, { fill: '#6ea8ff' }); daire(c, g, 38, 7, 4, { fill: '#6ea8ff' }); daire(c, g, 38, 83, 4, { fill: '#6ea8ff' });
    },
    molekul(c, g) {
      daire(c, g, 30, 45, 19, { fill: '#ff6b6b' }); daire(c, g, 90, 45, 19, { fill: '#ff6b6b' });
      daire(c, g, 60, 45, 22, { fill: '#2a2f45', stroke: G, 'stroke-width': 2 });
    },
    santral(c, g) {
      yol(c, g, 'M20 20 q8 -10 18 -4 q10 -8 18 2 M66 14 q8 -8 16 -2 q10 -6 16 4', { stroke: A, 'stroke-width': 4 });
      yol(c, g, 'M16 76 Q26 52 22 30 L50 30 Q46 52 56 76 Z', { fill: G, stroke: 'none' });
      yol(c, g, 'M62 76 Q72 52 68 26 L96 26 Q92 52 102 76 Z', { fill: '#7f89ad', stroke: 'none' });
      cizgi(c, g, 8, 76, 112, 76, RENK.ince, 2);
    },
    bt(c, g) {
      dik(c, g, 14, 8, 62, 68, { rx: 14, fill: G });
      daire(c, g, 45, 42, 19, { fill: RENK.koyu });
      dik(c, g, 40, 50, 70, 7, { rx: 3 });
      dik(c, g, 92, 57, 8, 19, { fill: '#7f89ad' });
      cizgi(c, g, 8, 78, 112, 78, RENK.ince, 2);
    },
    kutup(c, g) {
      yol(c, g, 'M6 40 C26 10 40 54 60 26 S96 30 114 12', { stroke: '#3ddc97', 'stroke-width': 9, opacity: 0.9 });
      yol(c, g, 'M6 56 C30 30 44 66 66 42 S98 46 114 30', { stroke: '#7be3b5', 'stroke-width': 6, opacity: 0.6 });
      yol(c, g, 'M10 28 C30 6 50 36 72 14', { stroke: '#3cc8e8', 'stroke-width': 4, opacity: 0.55 });
      yol(c, g, 'M8 82 L16 64 L24 82 Z M24 82 L34 58 L44 82 Z M46 82 L54 66 L62 82 Z M68 82 L78 60 L88 82 Z M90 82 L98 68 L106 82 Z', { fill: '#0a2a22', stroke: 'none' });
    },
    neon(c, g) {
      let d = '';
      for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 12 : 28; d += (i ? 'L' : 'M') + (60 + r * Math.cos(a)).toFixed(1) + ' ' + (42 + r * Math.sin(a)).toFixed(1); }
      yol(c, g, d + 'Z', { stroke: '#ff6fb1', 'stroke-width': 5 });
      yol(c, g, 'M22 78 q10 -8 19 0 t19 0 t19 0 t19 0', { stroke: '#3cc8e8', 'stroke-width': 4 });
    },
  };
  const IKON_AD = {
    metronom: 'metronom', araba: 'arabayı iten kişi', kaynayan: 'kaynayan su', termometre: 'termometre', pusula: 'pusula',
    bobin: 'ataş çeken bobin', prizma: 'prizmada ışık', golge: 'gölge oyunu', kristal: 'kristal', devre: 'devre kartı',
    atom: 'atom modeli', molekul: 'molekül modeli', santral: 'nükleer santral', bt: 'BT cihazı', kutup: 'kutup ışıkları', neon: 'neon lamba',
  };
  /* Görsel: (x, y) sol üst köşe, s ölçek (1 → 120×90). Dönen g `yer` ve `ucur` ile taşınır. */
  function ikon(c, p, ad, x, y, s = 1) {
    const g = c.S('g', {}, p);
    yer(g, x, y, s);
    dik(c, g, 0, 0, 120, 90, { rx: 9, fill: RENK.koyu, stroke: RENK.kenarlik, 'stroke-width': 2 });
    IKON[ad](c, g);
    return g;
  }

  /* ---- raf: üstte etiket, altta iki görsel yuvası ---- */
  function raf(c, p, x, y, metin, o = {}) {
    const w = o.w || 228, s = o.olcek || 0.8, gw = 120 * s, gh = 90 * s, bos = (w - 2 * gw) / 3, bant = o.bant || 58;
    const h = gh + bant + 14, size = o.size || 18;
    const g = c.S('g', {}, p);
    const cerceve = kutu(c, g, x, y, w, h, { renk: o.renk });
    const t = yazi(c, g, x + w / 2, y, '', { size, renk: o.yaziRenk || RENK.soluk });
    const r = { g, kutu: cerceve, etiket: t, x, y, w, h, olcek: s, yuva: [[x + bos, y + bant], [x + 2 * bos + gw, y + bant]] };
    /* Etiketi yazar; sığmazsa iki satıra böler ve bandın ortasına oturtur. */
    r.yaz = (m, renk) => {
      const n = sar(c, t, m, w - 18, x + w / 2, size * 1.22);
      t.setAttribute('y', y + bant / 2 + size * 0.36 - (n - 1) * size * 0.61 + 2);
      if (renk) t.style.fill = renk;
    };
    r.yaz(metin);
    return r;
  }

  /* Yan yana raflar (ids: dal kimlikleri); etiketlerinde dalın niteliği yazar. Dönen nesne id → raf. */
  function raflar(c, p, ids, y, o = {}) {
    const w = o.w || 228, ara = o.ara || 12, x0 = (1000 - (ids.length * w + (ids.length - 1) * ara)) / 2, m = {};
    ids.forEach((id, i) => { m[id] = raf(c, p, x0 + i * (w + ara), y, dal(id).nitelik, o); m[id].dolu = 0; });
    return m;
  }
  /* Raftaki sıradaki boş yuva: [x, y, ölçek]. */
  const yuva = (r) => { const [x, y] = r.yuva[r.dolu++]; return [x, y, r.olcek]; };
  const gorselDali = (ad) => DALLAR.find((d) => d.gorsel.includes(ad)).id;

  return {
    RENK, DALLAR, dal, buyuk, IKON_AD, raflar, yuva, gorselDali,
    yazi, kutu, cizgi, gizle, belir, par, sar, paragraf, kart, etiket, yer, ucur, sec, sirayla, ikon, raf, yol, daire, dik,
  };
})();
