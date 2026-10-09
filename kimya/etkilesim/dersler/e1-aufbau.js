/* E1 · KİM.9.1.5 · Senaryo: plan/kimya/etkilesim/senaryolar/E-elektron-dizilimi.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 54, 57–63, 65, 68, 73–74'ten. Basamak yükseklikleri temsilidir; yalnızca enerji
   sırasını gösterir. İki oklu kutular zıt yönlü çizilir ama yön üzerine söz söylenmez (E2'nin işi). Krom ve bakır
   gibi istisnalar anlatılmaz. Öğrenciye kitap, sayfa ya da "kaynak" anılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  /* Bir kavrama bir renk: orbital (kutu, tür harfi) mavi, elektron (ok, üs) turuncu, enerji seviyesi (sayı) mor. */
  const ORB = 'var(--c1)', ELEK = 'var(--c2)', SEVIYE = 'var(--c4)', VURGU = RENK.vurgu, SOLUK = RENK.soluk;
  const HATA = 'var(--bad)', IYI = 'var(--good)', KOYU = '#162038';

  /* Üsler kaynak metinde ¹²³… diye yazılır; tahtada math: ile, panelde <sup> ile çizilir (yazı tipinde ⁴–⁹ yok). */
  const USLER = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const usCevir = (s, ac, kapa) => s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => ac + [...m].map((k) => USLER.indexOf(k)).join('') + kapa);
  const ust = (s) => usCevir(s, '<sup>', '</sup>');
  const mat = (s) => usCevir(s, '^{', '}');
  const diz = (c, p, x, y, metin, o = {}) => c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 34,
    'font-weight': o.kalin || 600, style: 'fill:' + (o.renk || 'var(--text)'), math: mat(metin) }, p);
  /* Dizilim terimi: taban düz, üs elektron renginde. */
  function terim(c, p, x, y, metin, o = {}) {
    const t = diz(c, p, x, y, metin, o);
    t.querySelectorAll('tspan[font-size]').forEach((s) => { s.style.fill = ELEK; });
    return t;
  }
  const sil = (c, el, ms = 300) => c.tween(ms, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const cerceve = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 10 : o.rx,
    fill: o.fill || 'none', stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const carpi = (c, p, x, y, r = 12) => c.S('path', { d: `M ${x - r} ${y - r} L ${x + r} ${y + r} M ${x + r} ${y - r} L ${x - r} ${y + r}`,
    fill: 'none', stroke: HATA, 'stroke-width': 5, 'stroke-linecap': 'round' }, p);
  const tik = (c, p, x, y, r = 12) => c.S('path', { d: `M ${x - r} ${y} L ${x - r / 3} ${y + r * 0.8} L ${x + r} ${y - r * 0.8}`,
    fill: 'none', stroke: IYI, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);

  /* ---- Orbital kutusu ve elektron oku: KIT çizimlerinin ölçeklenebilir sarmalayıcısı ---- */
  function kutu(c, p, x, y, { k = 1, renk = ORB } = {}) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${k})` }, p);
    const kenar = KIT.orbitalKutusu(c, g, 0, 0, 0, { renk }).firstChild;
    return { g, x, y, k, renk, kenar, oklar: [] };
  }
  /* Kutuya ok ekler: ilk ok yukarı, ikincisi aşağı. */
  function okKoy(c, b) {
    const i = b.oklar.length;
    const g = KIT.elektronOku(c, b.g, 24 + i * 30, 0, i === 0 ? 1 : -1, { renk: ELEK });
    b.oklar.push(g);
    return g;
  }
  /* Ok, tahtadaki [x, y] noktasından kutuya uçarak yerleşir. */
  async function okUcur(c, b, nereden, ms = 420) {
    const yerelX = 24 + b.oklar.length * 30, g = okKoy(c, b);
    const dx = (nereden[0] - b.x) / b.k - yerelX, dy = (nereden[1] - b.y) / b.k - 41;
    await c.tween(ms, (e) => g.setAttribute('transform', `translate(${dx * (1 - e)} ${dy * (1 - e)})`));
    return g;
  }
  /* Kutuya girmeyi bekleyen elektron: (x, y) merkezli tek ok. */
  function bekleyen(c, p, x, y, k = 0.8) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${k})` }, p);
    KIT.elektronOku(c, g, 0, -41, 1, { renk: ELEK });
    return g;
  }
  /* Kutuların çerçevesini kısa süre kalınlaştırıp renklendirir. */
  const parlat = (c, kutular, renk = VURGU) => c.tween(700, (e, t) => kutular.forEach((b) => {
    b.kenar.setAttribute('stroke', t < 1 ? renk : b.renk);
    b.kenar.setAttribute('stroke-width', 3 + 4 * Math.sin(Math.PI * t));
  }));

  /* ---- Enerji basamakları ---- */
  const DORT = [['1s', 1, 410], ['2s', 1, 300], ['2p', 3, 190], ['3s', 1, 80]];
  const BES = [['1s', 1, 456], ['2s', 1, 366], ['2p', 3, 276], ['3s', 1, 186], ['3p', 3, 96]];
  /* satirlar alttan üste, yani enerji sırasıyla: [ad, kutu sayısı, y, renk]. */
  function basamaklar(c, p, satirlar, { k = 0.8, ok = [490, 78] } = {}) {
    const g = c.S('g', {}, p), bas = { g, sira: satirlar.map((s) => s[0]), kutu: {}, satir: {} };
    c.S('path', { d: `M 70 ${ok[0]} L 70 ${ok[1]} M 60 ${ok[1] + 16} L 70 ${ok[1]} L 80 ${ok[1] + 16}`,
      fill: 'none', stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    yazi(c, g, 70, ok[1] - 18, 'Enerji', { size: 26, renk: SOLUK });
    satirlar.forEach(([ad, adet, y, renk]) => {
      const sg = c.S('g', {}, g);
      yazi(c, sg, 160, y + 41 * k + 10, ad, { size: 30, renk: renk || 'var(--text)' });
      bas.satir[ad] = sg;
      bas.kutu[ad] = Array.from({ length: adet }, (_, i) => kutu(c, sg, 210 + i * (80 * k + 10), y, { k, renk: renk || ORB }));
    });
    return bas;
  }
  /* Bir satırda sıradaki elektronun gireceği kutu: önce boş kutular, sonra tek elektronlular. */
  const siradaki = (kutular) => kutular.find((b) => b.oklar.length === 0) || kutular.find((b) => b.oklar.length === 1);
  const elektronSayisi = (kutular) => kutular.reduce((t, b) => t + b.oklar.length, 0);
  const dolu = (kutular) => elektronSayisi(kutular) === kutular.length * 2;
  const koy = (c, bas, ad) => okKoy(c, siradaki(bas.kutu[ad]));
  const doldur = (c, bas, sayilar) => Object.entries(sayilar).forEach(([ad, n]) => { for (let i = 0; i < n; i++) koy(c, bas, ad); });
  const ucur = (c, bas, ad, nereden, ms) => okUcur(c, siradaki(bas.kutu[ad]), nereden, ms);
  const bosalt = (bas, adlar = bas.sira) => adlar.forEach((ad) => bas.kutu[ad].forEach((b) => { b.oklar.forEach((g) => g.remove()); b.oklar = []; }));
  /* Basamaklardaki yerleşimin yazımı: "1s² 2s¹". */
  const dizilim = (bas) => bas.sira.filter((ad) => elektronSayisi(bas.kutu[ad]))
    .map((ad) => ad + [...String(elektronSayisi(bas.kutu[ad]))].map((r) => USLER[r]).join('')).join(' ');
  /* Elektronları verilen sırayla, birer birer uçurarak yerleştirir: [[ad, adet], …]. */
  async function sirayla(c, bas, liste, nereden, ms = 170) {
    for (const [ad, n] of liste) for (let i = 0; i < n; i++) await ucur(c, bas, ad, nereden, ms);
  }

  /* Büyük dizilim yazımı ("2p⁶"): sayı, harf ve üs ayrı öğedir; her biri kendi renginde çizilir. */
  function buyukYazim(c, p, x, y, sayi, harf, us, size = 130) {
    const g = c.S('g', {}, p), w = size * 0.6;
    return { g,
      sayi: yazi(c, g, x, y, sayi, { size, renk: SEVIYE, hiza: 'end' }),
      harf: yazi(c, g, x, y, harf, { size, renk: ORB, hiza: 'start' }),
      us: yazi(c, g, x + w * 1.3, y - size * 0.42, us, { size: size * 0.55, renk: ELEK }) };
  }

  /* Adım adım yerleştirme paneli. Her adımda aynı soru sorulur, şıklar yerinde kalır: kurala uyan dokunuş elektronu
     yerleştirir ve sıradaki adıma geçer, uymayan dokunuş nedeniyle birlikte geri çevrilir. Sınıflar c.choice ile aynıdır.
     kontrol(n, i) → true ya da geri çevirme nedeni; yerlestir(n, i) → animasyon. */
  async function adimAdim(c, { adim, soru, secenekler, kontrol, yerlestir, son }) {
    const q = c.h('p', { class: 'q' }), fb = c.h('div');
    const dugmeler = secenekler.map((s) => c.h('button', { class: 'opt', html: s }));
    const panel = c.h('div', { class: 'panel' }, c.h('span', { class: 'tag' }, 'Sıra sende'), q, c.h('div', { class: 'opts' }, dugmeler), fb);
    let sec = null;
    dugmeler.forEach((b, i) => c.on(b, 'click', () => { if (sec) sec(i); }));
    c.act.appendChild(panel);
    for (let n = 0; n < adim; n++) {
      q.innerHTML = soru(n);
      for (;;) {
        const i = await new Promise((res) => { sec = res; });
        sec = null;
        const sonuc = kontrol(n, i);
        if (sonuc === true) { await yerlestir(n, i); break; }
        dugmeler[i].classList.add('wrong');
        dugmeler[i].disabled = true;
        c.feedback(fb, 'no', sonuc);
      }
      dugmeler.forEach((b) => { b.classList.remove('wrong'); b.disabled = false; });
      fb.className = ''; fb.innerHTML = '';
    }
    dugmeler.forEach((b) => { b.disabled = true; });
    c.feedback(fb, 'ok', son);
    await new Promise((res) => panel.appendChild(c.h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: res }, 'Devam ›')));
    panel.remove();
  }

  /* ---- Küçük çizimler: her biri (x, y) merkezli ---- */
  const ciz = {
    telefon(c, g, x, y) {
      cerceve(c, g, x - 42, y - 78, 84, 156, { rx: 14, fill: KOYU });
      cerceve(c, g, x - 30, y - 60, 60, 104, { rx: 4, kalin: 2 });
      [[-14, -30], [8, -6], [-8, 20]].forEach(([dx, dy]) => c.S('rect', { x: x + dx, y: y + dy, width: 14, height: 14, rx: 2, fill: ELEK }, g));
      c.S('circle', { cx: x, cy: y + 60, r: 5, fill: RENK.cizgi }, g);
    },
    cip(c, g, x, y) {
      cerceve(c, g, x - 34, y - 34, 68, 68, { rx: 6, renk: ELEK, fill: KOYU });
      for (let k = -1; k <= 1; k++) {
        c.S('line', { x1: x - 54, y1: y + k * 20, x2: x - 34, y2: y + k * 20, stroke: ELEK, 'stroke-width': 3 }, g);
        c.S('line', { x1: x + 34, y1: y + k * 20, x2: x + 54, y2: y + k * 20, stroke: ELEK, 'stroke-width': 3 }, g);
      }
    },
    tup(c, g, x, y) {
      c.S('path', { d: `M ${x - 34} ${y - 76} L ${x + 34} ${y - 76} L ${x + 26} ${y + 20} L ${x + 10} ${y + 34} L ${x - 10} ${y + 34} L ${x - 26} ${y + 20} Z`,
        fill: KOYU, stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
      c.S('line', { x1: x - 33, y1: y - 62, x2: x + 33, y2: y - 62, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
      c.S('rect', { x: x - 9, y: y + 34, width: 18, height: 12, fill: RENK.cizgi }, g);
      c.S('path', { d: `M ${x} ${y + 48} Q ${x + 30} ${y + 52} ${x + 14} ${y + 64} Q ${x - 20} ${y + 74} ${x + 26} ${y + 78}`,
        fill: 'none', stroke: SEVIYE, 'stroke-width': 9, 'stroke-linecap': 'round' }, g);
    },
    /* Orbital: elektronun bulunma olasılığı yüksek bölge; noktalar merkeze doğru sıklaşır. */
    bulut(c, g, x, y, r) {
      let tohum = 7;
      const rasgele = () => (tohum = (tohum * 16807) % 2147483647) / 2147483647;
      c.S('circle', { cx: x, cy: y, r: r + 10, fill: 'none', stroke: ORB, 'stroke-width': 3, 'stroke-dasharray': '8 8' }, g);
      for (let i = 0; i < 150; i++) {
        const aci = rasgele() * 2 * Math.PI, d = r * Math.pow(rasgele(), 0.8);
        c.S('circle', { cx: x + d * Math.cos(aci), cy: y + d * Math.sin(aci), r: 2.6, fill: ELEK, opacity: 0.8 }, g);
      }
      c.S('circle', { cx: x, cy: y, r: 9, fill: 'var(--text)' }, g);
    },
  };

  /* ---- Sahne 1 · Elektronların düzeni ---- */
  async function duzen(c) {
    const svg = c.svg();
    const gun = c.S('g', {}, svg);
    const durak = (x, cizim, ad, alt) => {
      const g = c.S('g', {}, gun);
      cizim(c, g, x, 180);
      yazi(c, g, x, 316, ad, { size: 30 });
      if (alt) yazi(c, g, x, 352, alt, { size: 24, renk: SOLUK });
      return g;
    };
    await belir(c, durak(210, ciz.telefon, 'Telefon'));
    await c.say('Telefonun içinde transistör denen çok küçük parçalar çalışır.');
    await belir(c, durak(500, ciz.cip, 'Transistör', 'yarı iletken malzeme'));
    await c.say('Transistörler, yarı iletken malzemedeki elektronların düzeni değiştirilerek çalışır.');
    await belir(c, durak(790, ciz.tup, 'Boya ve pigment'));
    await c.say('Birçok boya ve pigment de atomların elektron düzenine göre tasarlanır.');
    const tanim = c.S('g', {}, gun);
    yazi(c, tanim, 500, 446, 'Elektron dizilimi', { size: 34, renk: VURGU });
    yazi(c, tanim, 500, 490, 'elektronların orbitallere yerleşimi', { size: 28 });
    await belir(c, tanim);
    await c.say('Bir atomda elektronların orbitallere nasıl yerleştiğine elektron dizilimi denir.');

    await sil(c, gun, 350);
    const atom = c.S('g', {}, svg);
    ciz.bulut(c, atom, 250, 190, 112);
    yazi(c, atom, 250, 362, 'Orbital', { size: 32, renk: ORB });
    yazi(c, atom, 250, 398, 'bulunma olasılığı yüksek bölge', { size: 24, renk: SOLUK });
    await belir(c, atom);
    await c.say('Önceki derslerde gördük: orbital, elektronun bulunma olasılığının yüksek olduğu bölgedir.');
    const adlar = c.S('g', {}, svg);
    const ad = (x, sayi, harf) => {
      const g = c.S('g', {}, adlar);
      yazi(c, g, x, 200, sayi, { size: 96, renk: SEVIYE, hiza: 'end' });
      yazi(c, g, x, 200, harf, { size: 96, renk: ORB, hiza: 'start' });
      return g;
    };
    const birS = ad(620, '1', 's');
    ad(840, '2', 'p');
    await belir(c, adlar);
    await c.say('Bir orbital, bir sayı ve bir harfle adlandırılır: 1s, 2p.',
      { speak: 'Bir orbital, bir sayı ve bir harfle adlandırılır: bir se, iki pe.' });
    const anlam = c.S('g', {}, svg);
    yazi(c, anlam, 730, 272, 'sayı: enerji seviyesi', { size: 28, renk: SEVIYE });
    yazi(c, anlam, 730, 314, 'harf: orbitalin türü', { size: 28, renk: ORB });
    await belir(c, anlam, 350);
    await c.say('Sayı enerji seviyesini, harf orbitalin türünü gösterir.');
    const serit = c.S('g', {}, svg), tur = {};
    [['s', 1, 130], ['p', 3, 300], ['d', 5, 590]].forEach(([harf, adet, x]) => {
      const g = c.S('g', {}, serit);
      yazi(c, g, x, 488, harf, { size: 40, renk: ORB });
      for (let i = 0; i < adet; i++) kutu(c, g, x + 34 + i * 56, 448, { k: 0.6 });
      tur[harf] = g;
    });
    await belir(c, serit);
    await c.say('s türünde bir, p türünde üç, d türünde beş orbital vardır.',
      { speak: 'Se türünde bir, pe türünde üç, de türünde beş orbital vardır.' });
    await c.choice({ tag: 'Uygula', q: '2p orbitalleri hangi enerji seviyesindedir ve kaç tanedir?',
      options: ['Üçüncü seviyede, iki tane', 'İkinci seviyede, iki tane', 'İkinci seviyede, üç tane'], answer: 2,
      hints: ['Baştaki sayı seviyeyi gösterir; iki tane olan orbital türü de yok.', 'Seviye doğru; ama p türünde kaç orbital vardı?', ''],
      right: 'Sayı 2: ikinci enerji seviyesi. Harf p: üç orbital.' });
    await c.tween(400, (e) => { [birS, atom, tur.s, tur.d].forEach((el) => { el.style.opacity = 1 - 0.75 * e; }); });
    await c.say('Baştaki 2 enerji seviyesini gösterir; p türünde ise üç orbital vardır.',
      { speak: 'Baştaki iki, enerji seviyesini gösterir; pe türünde ise üç orbital vardır.' });
  }

  /* ---- Sahne 2 · Dizilim yazımı ve orbital şeması ---- */
  async function yazim(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    const bir = buyukYazim(c, g, 480, 270, '1', 's', '1');
    const usEtiket = c.S('g', {}, g);
    c.S('line', { x1: 616, y1: 196, x2: 660, y2: 196, stroke: ELEK, 'stroke-width': 3 }, usEtiket);
    yazi(c, usEtiket, 672, 206, 'elektron sayısı', { size: 28, renk: ELEK, hiza: 'start' });
    bir.us.style.opacity = 0; usEtiket.style.opacity = 0;
    await belir(c, g);
    await c.tween(450, (e) => { bir.us.style.opacity = e; usEtiket.style.opacity = e; });
    await c.say('Dizilim yazarken orbitalin adına, üs olarak elektron sayısı eklenir.');
    await belir(c, yazi(c, g, 500, 400, '1s orbitalinde 1 elektron', { size: 32 }), 350);
    await c.say('1s¹ yazımı, 1s orbitalinde bir elektron olduğunu gösterir.',
      { speak: 'Bir se bir yazımı, bir se orbitalinde bir elektron olduğunu gösterir.' });

    await sil(c, g);
    g = c.S('g', {}, svg);
    buyukYazim(c, g, 480, 250, '2', 'p', '6');
    c.S('line', { x1: 356, y1: 206, x2: 396, y2: 206, stroke: SEVIYE, 'stroke-width': 3 }, g);
    yazi(c, g, 344, 216, 'enerji seviyesi', { size: 28, renk: SEVIYE, hiza: 'end' });
    c.S('line', { x1: 519, y1: 296, x2: 519, y2: 322, stroke: ORB, 'stroke-width': 3 }, g);
    yazi(c, g, 519, 356, 'tür', { size: 28, renk: ORB });
    c.S('line', { x1: 616, y1: 176, x2: 660, y2: 176, stroke: ELEK, 'stroke-width': 3 }, g);
    yazi(c, g, 672, 186, 'elektron sayısı', { size: 28, renk: ELEK, hiza: 'start' });
    yazi(c, g, 500, 450, '2p orbitallerinde toplam 6 elektron', { size: 32 });
    await belir(c, g);
    await c.say('2p⁶ yazımı, 2p orbitallerinde toplam altı elektron olduğunu gösterir.',
      { speak: 'İki pe altı yazımı, iki pe orbitallerinde toplam altı elektron olduğunu gösterir.' });

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 72, 'Orbital şeması', { size: 34, renk: VURGU });
    buyukYazim(c, g, 265, 196, '1', 's', '1', 64);
    buyukYazim(c, g, 665, 196, '2', 'p', '6', 64);
    const sKutu = kutu(c, g, 232, 236, { k: 1.2 });
    const pKutu = [0, 1, 2].map((i) => kutu(c, g, 530 + i * 104, 236, { k: 1.2 }));
    await belir(c, g);
    await okUcur(c, sKutu, [280, 120], 300);
    for (let tur = 0; tur < 2; tur++) for (const b of pKutu) await okUcur(c, b, [b.x + 48, 120], 180);
    await c.say('Aynı bilgi çizimle de gösterilir; bu çizime orbital şeması denir.');
    const lejant = c.S('g', {}, g);
    yazi(c, lejant, 330, 440, 'kutu: orbital', { size: 32, renk: ORB });
    yazi(c, lejant, 670, 440, 'ok: elektron', { size: 32, renk: ELEK });
    await belir(c, lejant, 350);
    await c.say('Şemada her kutu bir orbitali, her ok bir elektronu gösterir.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 96, 'Bir orbital: en çok 2 elektron', { size: 32 });
    const kayan = c.S('g', {}, g);
    const tam = kutu(c, kayan, 448, 190, { k: 1.3 });
    await belir(c, g);
    await okUcur(c, tam, [500, 120], 320);
    await okUcur(c, tam, [500, 120], 320);
    await c.say('Bir orbital en çok iki elektron alabilir.');
    await c.tween(450, (e) => kayan.setAttribute('transform', `translate(${258 * e} 0)`));
    const ilkIki = c.S('g', {}, g);
    kutu(c, ilkIki, 190, 190, { k: 1.3 });
    okKoy(c, kutu(c, ilkIki, 448, 190, { k: 1.3 }));
    yazi(c, ilkIki, 242, 352, 'boş', { size: 32 });
    yazi(c, ilkIki, 500, 352, 'yarı dolu', { size: 32 });
    await belir(c, ilkIki);
    await c.say('Kutu boşsa orbital boş, tek ok varsa yarı doludur.');
    await belir(c, yazi(c, g, 758, 352, 'tam dolu', { size: 32, renk: VURGU }), 350);
    await c.say('Kutuda iki ok varsa orbital tam doludur.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 96, 'Bu şemanın dizilimi?', { size: 32, renk: SOLUK });
    const k1 = kutu(c, g, 322, 160, { k: 1.2 }), k2 = kutu(c, g, 582, 160, { k: 1.2 });
    okKoy(c, k1); okKoy(c, k1); okKoy(c, k2);
    const etiketler = [yazi(c, g, 370, 316, '1s', { size: 40 }), yazi(c, g, 630, 316, '2s', { size: 40 })];
    await belir(c, g);
    await c.choice({ tag: 'Uygula', q: 'Bir şemada 1s kutusunda iki ok, 2s kutusunda bir ok var. Dizilim nasıl yazılır?',
      options: ['1s¹ 2s²', '1s² 2s¹', '1s³'].map(ust), answer: 1,
      hints: ['Üsler yer değiştirmiş: iki ok 1s kutusunda, tek ok 2s kutusunda.', '', 'Oklar iki ayrı kutuda; üçü tek orbitale yazılamaz.'],
      right: 'İki ok 1s kutusunda, bir ok 2s kutusunda.' });
    etiketler.forEach((t) => t.remove());
    await belir(c, terim(c, g, 370, 316, '1s²', { size: 40 }), 300);
    await belir(c, terim(c, g, 630, 316, '2s¹', { size: 40 }), 300);
    await c.say('Her kutudaki ok sayısı, o orbitalin üssüne yazılır.');
    await belir(c, yazi(c, g, 500, 440, '2 + 1 = 3 elektron', { size: 36, renk: ELEK }), 350);
    await c.say('Üsleri toplayınca atomun elektron sayısını buluruz: iki artı bir, üç.');
    c.note(ust('<b>2p⁶: 2. enerji seviyesi, p türü, 6 elektron.</b><br>Kutu orbital, ok elektron.'), 'Dizilim yazımı');
  }

  /* ---- Sahne 3 · En düşük enerjili orbital ---- */
  async function enDusuk(c) {
    const svg = c.svg();
    const bas = basamaklar(c, svg, DORT), sag = c.S('g', {}, svg), BEKLE = [740, 410];
    const baslik = (ad, alt) => {
      sag.replaceChildren();
      yazi(c, sag, 740, 140, ad, { size: 40 });
      yazi(c, sag, 740, 186, alt, { size: 28, renk: SOLUK });
    };
    const sonuc = (metin) => belir(c, diz(c, sag, 740, 300, metin, { size: 52, renk: VURGU }), 350);
    await belir(c, bas.g);
    await c.say('Orbitallerin enerjileri farklıdır; sırayı önceki derste kurmuştuk.');
    yazi(c, sag, 740, 170, 'Düşükten yükseğe', { size: 28, renk: SOLUK });
    yazi(c, sag, 740, 230, '1s < 2s < 2p < 3s', { size: 34 });
    yazi(c, sag, 740, 282, '< 3p < 4s < 3d < 4p', { size: 34 });
    await belir(c, sag, 350);
    await c.say('Düşükten yükseğe sıra şöyledir: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.',
      { speak: 'Düşükten yükseğe sıra şöyledir: bir se, iki se, iki pe, üç se, üç pe, dört se, üç de, dört pe.' });
    sag.replaceChildren();
    yazi(c, sag, 740, 200, 'Nötr atom', { size: 36 });
    yazi(c, sag, 740, 256, 'elektron sayısı = atom numarası', { size: 28, renk: VURGU });
    await belir(c, sag, 350);
    await c.say('Nötr bir atomda elektron sayısı atom numarasına eşittir.');

    baslik('Hidrojen', 'atom numarası 1 · 1 elektron');
    let bek = bekleyen(c, svg, ...BEKLE);
    await belir(c, sag, 350);
    await c.say('Hidrojenin atom numarası birdir; tek elektronu vardır.');
    bek.remove();
    await ucur(c, bas, '1s', BEKLE, 600);
    await c.say('Bu elektron en düşük enerjili orbitalde, 1s orbitalinde bulunur.',
      { speak: 'Bu elektron en düşük enerjili orbitalde, [short pause] bir se orbitalinde bulunur.' });
    await sonuc('1s¹');
    await c.say('Hidrojenin dizilimi 1s¹ olur.', { speak: 'Hidrojenin dizilimi bir se bir olur.' });

    bosalt(bas);
    baslik('Helyum', '2 elektron');
    const ikili = [bekleyen(c, svg, 715, 410), bekleyen(c, svg, 765, 410)];
    await belir(c, sag, 350);
    ikili[0].remove();
    await ucur(c, bas, '1s', [715, 410], 500);
    ikili[1].remove();
    await ucur(c, bas, '1s', [765, 410], 500);
    await c.say('Helyumun iki elektronu vardır; ikisi de 1s orbitaline yerleşir.',
      { speak: 'Helyumun iki elektronu vardır; ikisi de bir se orbitaline yerleşir.' });
    const tamDolu = yazi(c, svg, 292, 452, 'tam dolu', { size: 26, renk: VURGU, hiza: 'start' });
    await Promise.all([sonuc('1s²'), belir(c, tamDolu, 350)]);
    await c.say('Helyumun dizilimi 1s² olur; 1s orbitali artık tam doludur.',
      { speak: 'Helyumun dizilimi bir se iki olur; bir se orbitali artık tam doludur.' });

    baslik('Lityum', '3 elektron');
    bek = bekleyen(c, svg, ...BEKLE);
    await belir(c, sag, 350);
    await c.choice({ q: 'Lityumun üç elektronu var. Üçüncü elektron hangi orbitale yerleşir?', options: ['1s', '2p', '2s'], answer: 2,
      hints: ['1s orbitalinde iki elektron var; bir orbital en çok iki elektron alır.', 'Sırada 2p’den önce gelen, daha düşük enerjili bir orbital var.', ''],
      right: '1s dolu; sıradaki en düşük enerjili orbital 2s.',
      onPick: (i, dogru) => { if (dogru) { bek.remove(); ucur(c, bas, '2s', BEKLE, 600); } } });
    await parlat(c, bas.kutu['2s']);
    await c.say("1s dolu olduğu için üçüncü elektron sıradaki orbitale, 2s’ye yerleşir.",
      { speak: 'Bir se dolu olduğu için üçüncü elektron sıradaki orbitale, iki se orbitaline yerleşir.' });
    await sonuc('1s² 2s¹');
    await c.say('Lityumun dizilimi 1s² 2s¹ olur.', { speak: 'Lityumun dizilimi bir se iki, iki se bir olur.' });
  }

  /* ---- Sahne 4 · Örüntünün adı: Aufbau ilkesi ---- */
  const ATOMLAR = [['Hidrojen', '1s¹'], ['Helyum', '1s²'], ['Lityum', '1s² 2s¹'], ['Berilyum', '1s² 2s²'], ['Bor', '1s² 2s² 2p¹'], ['Karbon', '1s² 2s² 2p²']];
  async function aufbau(c) {
    const svg = c.svg();
    const bas = basamaklar(c, svg, [['1s', 1, 400], ['2s', 1, 270], ['2p', 3, 140]]), BEKLE = [770, 470];
    doldur(c, bas, { '1s': 2, '2s': 1 });
    const liste = c.S('g', {}, svg);
    const satir = (i) => {
      const g = c.S('g', {}, liste), y = 122 + i * 52;
      yazi(c, g, 650, y, ATOMLAR[i][0], { size: 30, hiza: 'end' });
      diz(c, g, 674, y, ATOMLAR[i][1], { size: 30, hiza: 'start', renk: VURGU });
      return g;
    };
    const yeniAtom = async (i, ad) => {
      const bek = bekleyen(c, svg, ...BEKLE);
      await belir(c, bek, 250);
      bek.remove();
      await ucur(c, bas, ad, BEKLE, 600);
      await belir(c, satir(i), 350);
    };
    [0, 1, 2].forEach(satir);
    await belir(c, svg);
    await yeniAtom(3, '2s');
    await c.say('Berilyumun dördüncü elektronu 2s orbitalini doldurur: 1s² 2s².',
      { speak: 'Berilyumun dördüncü elektronu iki se orbitalini doldurur: bir se iki, iki se iki.' });
    await yeniAtom(4, '2p');
    await c.say('Borun beşinci elektronu sıradaki 2p orbitallerine geçer: 1s² 2s² 2p¹.',
      { speak: 'Borun beşinci elektronu sıradaki iki pe orbitallerine geçer: bir se iki, iki se iki, iki pe bir.' });
    await yeniAtom(5, '2p');
    await c.say('Karbonun altı elektronu vardır; dizilimi 1s² 2s² 2p² olur.',
      { speak: 'Karbonun altı elektronu vardır; dizilimi bir se iki, iki se iki, iki pe iki olur.' });
    const kenar = cerceve(c, svg, 492, 82, 400, 316, { renk: VURGU, kalin: 2 });
    await belir(c, kenar, 350);
    await c.say('Bu atomların hepsinde aynı örüntü görülüyor.');
    const yukari = c.S('g', {}, svg);
    [[394, 344], [264, 214]].forEach(([y1, y2]) => c.S('path', { d: `M 242 ${y1} L 242 ${y2} M 232 ${y2 + 12} L 242 ${y2} L 252 ${y2 + 12}`,
      fill: 'none', stroke: VURGU, 'stroke-width': 4, 'stroke-linecap': 'round' }, yukari));
    await belir(c, yukari, 400);
    await c.say('Düşük enerjili orbital dolmadan daha yüksek enerjili orbitale elektron yerleşmiyor.',
      { speak: '[thoughtful] Düşük enerjili orbital dolmadan daha yüksek enerjili orbitale elektron yerleşmiyor.' });
    await Promise.all([sil(c, liste), sil(c, kenar)]);
    const kural = c.S('g', {}, svg);
    await belir(c, yazi(c, kural, 740, 110, 'Aufbau ilkesi', { size: 40, renk: VURGU }), 350);
    await c.say('Bu kurala Aufbau ilkesi denir.');
    const tanim = c.S('g', {}, kural);
    yazi(c, tanim, 740, 176, 'önce düşük enerjili,', { size: 30 });
    yazi(c, tanim, 740, 218, 'sonra daha yüksek enerjili orbital', { size: 30 });
    await belir(c, tanim, 350);
    await c.say('Aufbau ilkesi: elektronlar önce düşük, sonra daha yüksek enerjili orbitallere yerleşir.',
      { speak: 'Aufbau ilkesi: [short pause] elektronlar önce düşük, sonra daha yüksek enerjili orbitallere yerleşir.' });
    const kararli = c.S('g', {}, kural);
    yazi(c, kararli, 740, 318, 'Düşük enerjili yerleşim', { size: 28, renk: SOLUK });
    yazi(c, kararli, 740, 360, 'daha kararlı atom', { size: 32, renk: IYI });
    await belir(c, kararli, 350);
    await c.say('Düşük enerjili yerleşim atomu daha kararlı yapar.');
    await belir(c, yazi(c, kural, 740, 440, 'kararlı: kolay değişmeyen', { size: 28 }), 350);
    await c.say('Kararlı, enerjisi düşük olduğu için kolay değişmeyen demektir.');

    await Promise.all([sil(c, kural), sil(c, yukari)]);
    bosalt(bas);
    const sag = c.S('g', {}, svg);
    yazi(c, sag, 740, 140, 'Azot', { size: 40 });
    yazi(c, sag, 740, 186, '7 elektron', { size: 28, renk: SOLUK });
    await belir(c, sag, 350);
    await c.choice({ tag: 'Uygula', q: 'Azotun yedi elektronu var. Hangi yazım Aufbau ilkesine uyar?',
      options: ['1s² 2s² 2p³', '1s² 2s¹ 2p⁴', '1s² 2p⁵'].map(ust), answer: 0,
      hints: ['', '2s orbitalinde bir elektronluk yer daha varken 2p orbitallerine geçilmiş.', '2s orbitali boş bırakılıp 2p orbitallerine geçilmiş.'],
      right: 'Önce 1s, sonra 2s dolar; kalan üç elektron 2p orbitallerine yerleşir.',
      onPick: (i, dogru) => { if (dogru) sirayla(c, bas, [['1s', 2], ['2s', 2], ['2p', 3]], [740, 300]); } });
    const yanlis = c.S('g', {}, sag);
    tik(c, yanlis, 590, 290);
    diz(c, yanlis, 760, 302, '1s² 2s² 2p³', { size: 34, renk: IYI });
    carpi(c, yanlis, 590, 370);
    diz(c, yanlis, 760, 382, '1s² 2s¹ 2p⁴', { size: 34, renk: HATA });
    carpi(c, yanlis, 590, 430);
    diz(c, yanlis, 760, 442, '1s² 2p⁵', { size: 34, renk: HATA });
    await belir(c, yanlis, 350);
    await c.say('Öteki iki yazımda 2s dolmadan 2p orbitallerine elektron konmuş.',
      { speak: 'Öteki iki yazımda iki se dolmadan iki pe orbitallerine elektron konmuş.' });
    c.note(ust('<b>Aufbau ilkesi: önce düşük enerjili orbital dolar.</b><br>C: 1s² 2s² 2p²'), 'Aufbau ilkesi');
  }

  /* ---- Sahne 5 · On bir elektron: sodyum ---- */
  async function sodyum(c) {
    const svg = c.svg();
    const bas = basamaklar(c, svg, DORT), sag = c.S('g', {}, svg), BEKLE = [740, 410];
    const baslik = (ad, alt) => {
      sag.replaceChildren();
      yazi(c, sag, 740, 140, ad, { size: 40 });
      yazi(c, sag, 740, 186, alt, { size: 28, renk: SOLUK });
    };
    const yaz = (metin, renk = VURGU) => diz(c, sag, 740, 290, metin, { size: 36, renk });
    await belir(c, bas.g);
    await sirayla(c, bas, [['1s', 2], ['2s', 2]], BEKLE, 220);
    await c.say('Elektron sayısı artınca da aynı sıra izlenir.');
    yazi(c, sag, 740, 200, 'Her 2p orbitali', { size: 30 });
    yazi(c, sag, 740, 244, 'en çok 2 elektron', { size: 30, renk: ELEK });
    await Promise.all([belir(c, sag, 350), parlat(c, bas.kutu['2p'])]);
    await sirayla(c, bas, [['2p', 6]], BEKLE, 200);
    await c.say('Üç 2p orbitalinin her biri en çok iki elektron alır.',
      { speak: 'Üç tane iki pe orbitalinin her biri en çok iki elektron alır.' });
    await belir(c, yazi(c, sag, 740, 320, '3 × 2 = 6 elektron', { size: 34, renk: VURGU }), 350);
    await c.say('Bu yüzden 2p orbitallerine toplam altı elektron sığar.',
      { speak: 'Bu yüzden iki pe orbitallerine toplam altı elektron sığar.' });
    baslik('Neon', '10 elektron');
    yaz('1s² 2s² 2p⁶');
    await belir(c, sag, 350);
    await c.say('Neonun on elektronu vardır; dizilimi 1s² 2s² 2p⁶ olur.',
      { speak: 'Neonun on elektronu vardır; dizilimi bir se iki, iki se iki, iki pe altı olur.' });
    baslik('Sodyum', '11 elektron');
    const bek = bekleyen(c, svg, ...BEKLE);
    await Promise.all([belir(c, sag, 350), belir(c, bek, 350)]);
    await c.say('Sodyumun on bir elektronu vardır.');
    await belir(c, yazi(c, sag, 740, 290, 'İlk 10 elektron: 1s, 2s, 2p dolu', { size: 26 }), 350);
    await parlat(c, ['1s', '2s', '2p'].flatMap((ad) => bas.kutu[ad]));
    await c.say('İlk on elektron 1s, 2s ve 2p orbitallerini tam doldurur.',
      { speak: 'İlk on elektron bir se, iki se ve iki pe orbitallerini tam doldurur.' });
    await c.choice({ tag: 'Uygula', q: 'Sodyumun dizilimi hangisidir?',
      options: ['1s² 2s² 2p⁵ 3s²', '1s² 2s² 2p⁶ 3s¹', '1s² 2s² 2p⁷'].map(ust), answer: 1,
      hints: ['2p orbitallerinde bir elektronluk yer daha varken 3s orbitaline geçilmiş.', '', 'Üç 2p orbitaline en çok altı elektron sığar.'],
      right: '2p dolunca sıradaki orbital 3s’dir.',
      onPick: (i, dogru) => { if (dogru) { bek.remove(); ucur(c, bas, '3s', BEKLE, 600); } } });
    baslik('Sodyum', '11 elektron');
    yaz('1s² 2s² 2p⁶ 3s¹');
    await belir(c, sag, 350);
    await c.say("2p dolunca sıradaki orbital 3s’dir; on birinci elektron oraya yerleşir.",
      { speak: 'İki pe dolunca sıradaki orbital üç se orbitalidir; on birinci elektron oraya yerleşir.' });

    /* Yanlış yazımlar basamaklarda da gösterilir, sonra doğru yerleşime dönülür. */
    const eksik = bas.kutu['2p'][2];
    eksik.oklar.pop().remove();
    koy(c, bas, '3s');
    eksik.kenar.setAttribute('stroke', HATA);
    baslik('Aufbau ilkesine uymaz', '2p dolmadan 3s’ye geçilmiş');
    yaz('1s² 2s² 2p⁵ 3s²', HATA);
    await belir(c, sag, 350);
    await c.say("2p⁵ 3s² yazımında 2p dolmadan 3s’ye geçilmiştir; Aufbau ilkesine uymaz.",
      { speak: 'İki pe beş, üç se iki yazımında iki pe dolmadan üç se orbitaline geçilmiştir; Aufbau ilkesine uymaz.' });
    eksik.kenar.setAttribute('stroke', ORB);
    okKoy(c, eksik);
    bosalt(bas, ['3s']);
    baslik('Yazılamaz', '2p: en çok 6 elektron');
    yaz('1s² 2s² 2p⁷', HATA);
    const fazla = bekleyen(c, svg, ...BEKLE);
    await belir(c, sag, 350);
    await c.tween(900, (e, t) => fazla.setAttribute('transform', `translate(${740 - 260 * Math.sin(Math.PI * t)} ${410 - 187 * Math.sin(Math.PI * t)}) scale(0.8)`));
    await c.say("2p⁷ de yazılamaz; üç 2p orbitali en çok altı elektron alır.",
      { speak: 'İki pe yedi de yazılamaz; üç tane iki pe orbitali en çok altı elektron alır.' });
    fazla.remove();
    baslik('Sodyum', '11 elektron');
    yaz('1s² 2s² 2p⁶ 3s¹');
    await Promise.all([belir(c, sag, 350), ucur(c, bas, '3s', BEKLE, 500)]);
  }

  /* ---- Sahne 6 · 4s, 3d'den önce dolar ---- */
  async function dortS(c) {
    const svg = c.svg();
    const bas = basamaklar(c, svg, [['3s', 1, 440], ['3p', 3, 340], ['4s', 1, 205, SEVIYE], ['3d', 5, 110]], { ok: [510, 86] });
    const sag = c.S('g', {}, svg), BEKLE = [800, 470];
    const yaz = (satirlar) => {
      sag.replaceChildren();
      satirlar.forEach(([metin, o], i) => diz(c, sag, 800, 310 + i * 46, metin, { size: 28, ...o }));
      return belir(c, sag, 350);
    };
    bas.satir['4s'].style.opacity = 0;
    await belir(c, bas.g);
    await yaz([['Üçüncü enerji seviyesi', { renk: SOLUK }], ['3s, 3p ve beş 3d orbitali', { size: 26 }]]);
    await c.say("Üçüncü enerji seviyesinde 3s ve 3p’den başka beş 3d orbitali de vardır.",
      { speak: 'Üçüncü enerji seviyesinde üç se ve üç pe orbitallerinden başka beş tane üç de orbitali de vardır.' });
    await belir(c, bas.satir['4s'], 600);
    await yaz([['Enerji sırası', { renk: SOLUK }], ['3p < 4s < 3d', { size: 40 }]]);
    await c.say("Ama enerji sırasında 4s, 3d’den önce gelir.",
      { speak: '[thoughtful] Ama enerji sırasında dört se, üç de orbitallerinden önce gelir.' });
    const yakin = c.S('g', {}, svg);
    c.S('path', { d: 'M 596 118 L 610 118 L 610 262 L 596 262', fill: 'none', stroke: VURGU, 'stroke-width': 3 }, yakin);
    yazi(c, yakin, 628, 184, 'enerjileri', { size: 28, renk: VURGU, hiza: 'start' });
    yazi(c, yakin, 628, 220, 'çok yakın', { size: 28, renk: VURGU, hiza: 'start' });
    await belir(c, yakin, 400);
    await c.say("Çok elektronlu atomlarda 4s ile 3d’nin enerjileri birbirine çok yakındır.",
      { speak: 'Çok elektronlu atomlarda dört se ile üç de orbitallerinin enerjileri birbirine çok yakındır.' });
    await yaz([['Önce 4s dolar:', {}], ['toplam enerji daha düşük', { renk: IYI }]]);
    await c.say("4s’nin önce dolması atomun toplam enerjisini daha düşük yapar.",
      { speak: 'Dört se orbitalinin önce dolması atomun toplam enerjisini daha düşük yapar.' });

    await sil(c, yakin);
    const not = yazi(c, svg, 330, 548, '1s, 2s, 2p dolu', { size: 24, renk: SOLUK });
    await Promise.all([yaz([['Argon', { size: 40 }], ['18 elektron', { renk: SOLUK }]]), belir(c, not, 350)]);
    await sirayla(c, bas, [['3s', 2], ['3p', 6]], BEKLE, 170);
    await c.say("Argonun on sekiz elektronu 3p’ye kadar bütün orbitalleri doldurur.",
      { speak: 'Argonun on sekiz elektronu üç pe orbitallerine kadar bütün orbitalleri doldurur.' });
    let bek = bekleyen(c, svg, ...BEKLE);
    await yaz([['Potasyum', { size: 40 }], ['19 elektron', { renk: SOLUK }]]);
    await c.say('Potasyumun on dokuz elektronu vardır.');
    await c.choice({ tag: 'Uygula', q: 'Potasyumun on dokuzuncu elektronu hangi orbitale yerleşir?', options: ['3d', '4s', '4p'], answer: 1,
      hints: ['3d üçüncü seviyededir ama enerji sırasında ondan önce gelen bir orbital var.', '', '4p, sırada 3d’den de sonra gelir.'],
      right: '3p dolunca sıradaki en düşük enerjili orbital 4s’dir.',
      onPick: (i, dogru) => { if (dogru) { bek.remove(); ucur(c, bas, '4s', BEKLE, 600); } } });
    await yaz([['Potasyum', { size: 40 }], ['1s² 2s² 2p⁶', { size: 30, renk: VURGU }], ['3s² 3p⁶ 4s¹', { size: 30, renk: VURGU }]]);
    await c.say('Potasyumun dizilimi 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ olur.',
      { speak: 'Potasyumun dizilimi bir se iki, iki se iki, iki pe altı, üç se iki, üç pe altı, dört se bir olur.' });
    bek = bekleyen(c, svg, ...BEKLE);
    await yaz([['4s doldu:', {}], ['sıra 3d orbitallerinde', {}]]);
    bek.remove();
    await ucur(c, bas, '4s', BEKLE, 600);
    await parlat(c, bas.kutu['3d']);
    await c.say('4s dolduktan sonra sıra 3d orbitallerine gelir.',
      { speak: 'Dört se dolduktan sonra sıra üç de orbitallerine gelir.' });
    bek = bekleyen(c, svg, ...BEKLE);
    await yaz([['Skandiyum', { size: 40 }], ['21 elektron', { renk: SOLUK }], ['… 4s² 3d¹', { size: 34, renk: VURGU }]]);
    bek.remove();
    await ucur(c, bas, '3d', BEKLE, 600);
    await c.say('Skandiyumun yirmi bir elektronu vardır; dizilimi 4s² 3d¹ ile biter.',
      { speak: 'Skandiyumun yirmi bir elektronu vardır; dizilimi dört se iki, üç de bir ile biter.' });
    await yaz([['Sıra: 3p, 4s, 3d', { size: 34 }], ['numara değil, enerji', { size: 30, renk: VURGU }]]);
    await c.say('Orbitalleri numara değil, enerji sıraya dizer.',
      { speak: 'Orbitalleri numara değil, [short pause] enerji sıraya dizer.' });
  }

  /* ---- Sahne 7 · Dizilimi sen kur ---- */
  async function kur(c) {
    const svg = c.svg();
    const bas = basamaklar(c, svg, BES, { ok: [522, 86] }), sag = c.S('g', {}, svg), BEKLE = [740, 420];
    bas.g.style.opacity = 0;
    const adim = (i, metin) => belir(c, yazi(c, sag, 500, 216 + i * 64, `${i + 1}. ${metin}`, { size: 28, hiza: 'start' }), 350);
    await belir(c, yazi(c, sag, 740, 130, 'Dizilimi yazmak: üç adım', { size: 32, renk: VURGU }));
    await c.say('Bir atomun dizilimini üç adımda yazabilirsin.');
    await adim(0, 'Elektron sayısını bul');
    await c.say('Önce atom numarasından elektron sayısını bul.');
    await Promise.all([adim(1, 'Enerji sırasına diz'), belir(c, bas.g)]);
    await c.say('Sonra orbitalleri enerji sırasına diz.');
    await adim(2, 'En düşük enerjiliden yerleştir');
    await c.say('Elektronları en düşük enerjili orbitalden başlayarak yerleştir; dolan orbitali geç.');

    sag.replaceChildren();
    yazi(c, sag, 740, 140, 'Magnezyum', { size: 40 });
    const kalan = yazi(c, sag, 740, 186, 'Kalan elektron: 12', { size: 28, renk: SOLUK });
    const yazilan = diz(c, sag, 740, 300, '', { size: 38, renk: VURGU });
    let bek = bekleyen(c, svg, ...BEKLE);
    await belir(c, sag, 350);
    await c.say('Magnezyumun 12 elektronunu basamaklara yerleştir.', { noWait: true });
    const hedef = () => bas.sira.find((ad) => !dolu(bas.kutu[ad]));
    await adimAdim(c, {
      adim: 12, secenekler: bas.sira,
      soru: (n) => `<b>${n + 1}. elektron</b> hangi orbitale yerleşir?`,
      kontrol: (n, i) => {
        const ad = bas.sira[i], sira = hedef(), cogul = (x) => (x.endsWith('p') ? 'orbitalleri' : 'orbitali');
        if (ad === sira) return true;
        if (dolu(bas.kutu[ad])) return `${ad} ${cogul(ad)} dolu; ${ad.endsWith('p') ? 'üç orbital en çok altı' : 'bir orbital en çok iki'} elektron alır.`;
        return `Daha düşük enerjili ${sira} ${cogul(sira)}nde hâlâ yer var.`;
      },
      yerlestir: async (n, i) => {
        bek.remove();
        await ucur(c, bas, bas.sira[i], BEKLE, 300);
        c.mathText(yazilan, mat(dizilim(bas)));
        kalan.textContent = 'Kalan elektron: ' + (11 - n);
        if (n < 11) bek = bekleyen(c, svg, ...BEKLE);
      },
      son: ust('On iki elektron yerleşti: 1s² 2s² 2p⁶ 3s².'),
    });
    kalan.textContent = '12 elektron';
    await parlat(c, bas.kutu['3s']);
    await c.say('Magnezyumun dizilimi 1s² 2s² 2p⁶ 3s² oldu.',
      { speak: 'Magnezyumun dizilimi bir se iki, iki se iki, iki pe altı, üç se iki oldu.' });
    let alt = c.S('g', {}, sag);
    yazi(c, alt, 740, 400, 'Gerçek yerleşim', { size: 28, renk: SOLUK });
    yazi(c, alt, 740, 442, 'deneylerle belirlenir', { size: 30 });
    await belir(c, alt, 350);
    await c.say('Atomlardaki gerçek yerleşim deneylerle belirlenir.');
    alt.remove();
    alt = c.S('g', {}, sag);
    yazi(c, alt, 740, 400, 'Aufbau ilkesi', { size: 28, renk: SOLUK });
    yazi(c, alt, 740, 442, 'pek çok atomda doğru tahmin', { size: 30 });
    await belir(c, alt, 350);
    await c.say('Aufbau ilkesi, pek çok atomun dizilimini doğru tahmin etmemizi sağlar.');
    alt.remove();
    alt = c.S('g', {}, sag);
    yazi(c, alt, 740, 400, 'Yer olan en düşük', { size: 32, renk: VURGU });
    yazi(c, alt, 740, 444, 'enerjili orbital', { size: 32, renk: VURGU });
    await belir(c, alt, 350);
    await c.say('Elektron, yer olan en düşük enerjili orbitale yerleşir.',
      { speak: 'Elektron, [short pause] yer olan en düşük enerjili orbitale yerleşir.' });
  }

  Ders.start({
    id: 'etkilesim-e1', kicker: 'Konu E · Elektron dizilimi', title: 'Önce düşük enerji', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Önce düşük enerji', hook: 'Atomdaki elektronlar orbitalleri hangi sırayla doldurur?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Elektronların düzeni', goal: 'Orbitalin adını oku: sayı seviye, harf tür.', run: duzen },
      { title: 'Dizilim yazımı ve orbital şeması', goal: 'Dizilimi yazıyla ve kutu-ok şemasıyla oku.', run: yazim },
      { title: 'En düşük enerjili orbital', goal: 'İlk elektronların yerini enerji sırasıyla bul.', run: enDusuk },
      { title: 'Örüntünün adı: Aufbau ilkesi', goal: 'Altı atomdaki örüntüyü kurala bağla.', run: aufbau },
      { title: 'On bir elektron: sodyum', goal: 'Dolan orbitali geç, sıradakine yerleştir.', run: sodyum },
      { title: "4s, 3d'den önce dolar", goal: 'Sırayı numaranın değil enerjinin belirlediğini gör.', run: dortS },
      { title: 'Dizilimi sen kur', goal: 'Magnezyumun elektronlarını sırayla yerleştir.', run: kur },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Oksijenin sekiz elektronu vardır. Dizilimi hangisidir?',
        options: ['1s² 2s² 2p³ 3s¹', '1s² 2s² 2p⁴', '1s² 2s⁴ 2p²'].map(ust), answer: 1,
        why: ['2p orbitallerinde yer varken 3s orbitaline geçilmez.', 'Elektronlar düşük enerjili orbitalden başlayarak yerleşir: 1s, 2s, sonra 2p.', 'Tek 2s orbitali en çok iki elektron alır.'], scene: 3 },
      { q: 'Kalsiyumun yirmi elektronu vardır. Son iki elektron hangi orbitale yerleşir?',
        options: ['3d', '3p', '4s'], answer: 2,
        why: ['Enerji sırasında 4s, 3d’den önce gelir.', '3p orbitalleri on sekizinci elektronla dolar.', '3p dolunca sıradaki en düşük enerjili orbital 4s’dir.'], scene: 5 },
      { q: 'Silisyumun on dört elektronu vardır. Dizilimi hangisidir?',
        options: ['1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>2</sup> 3p<sup>2</sup>', '1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>6</sup> 3s<sup>1</sup> 3p<sup>3</sup>', '1s<sup>2</sup> 2s<sup>2</sup> 2p<sup>5</sup> 3s<sup>2</sup> 3p<sup>3</sup>'], answer: 0,
        why: ['Evet. 2p dolunca sıra 3s’ye gelir; 3s dolunca kalan iki elektron 3p’ye yerleşir.', '3s orbitalinde bir elektronluk yer varken 3p orbitallerine geçilmiş.', '2p orbitallerinde bir elektronluk yer varken 3s orbitaline geçilmiş.'], scene: 4 },
      { q: 'Aylin: “3d orbitalleri üçüncü seviyede olduğu için 4s’den önce dolar.” Aylin’e hangi karşılık verilmeli?',
        options: ['Haklı; seviye numarası küçük olan orbital önce dolar.', 'Haksız; 3d en son dolar, 4s ve 4p’den de sonra.', 'Haksız; sırayı numara değil enerji belirler, 4s önce dolar.'], answer: 2,
        why: ['Orbitalleri numara değil, enerji sıraya dizer; 4s, 3d’den önce dolar.', 'Sıra 4s, 3d, 4p’dir; 3d, 4p’den önce dolar.', 'Evet. Enerji sırasında 4s, 3d’den önce gelir; 4s dolduktan sonra sıra 3d orbitallerine geçer.'], scene: 5 },
    ], summary: ['<b>Elektron, yer olan en düşük enerjili orbitale yerleşir.</b>', 'Sıra: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p. Orbitalleri numara değil, enerji sıraya dizer.'],
    nextLesson: { href: 'e2-pauli-ve-hund.html', label: 'Sonraki: Eş enerjiye önce tek tek ›' },
  });
})();
