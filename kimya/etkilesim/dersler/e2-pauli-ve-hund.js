/* E2 · KİM.9.1.5 · Senaryo: plan/kimya/etkilesim/senaryolar/E-elektron-dizilimi.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 59–64 ve 73'ten; otobüs benzetmesi yazarındır. Okun yönünün fiziksel anlamı
   ("spin") anlatılmaz. Tek elektronlar tahtada yukarı yönlü çizilir; hepsinin aşağı yönlü çizildiği şema da Hund
   kuralına uyar, bu yüzden hiçbir yerde yanlış sayılmaz. Öğrenciye kitap, sayfa ya da "kaynak" anılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  /* Bir kavrama bir renk: orbital (kutu) mavi, elektron (ok) turuncu; kural adları ve vurgu sarı, hatalı çizim gri ve kırmızı. */
  const ORB = 'var(--c1)', ELEK = 'var(--c2)', VURGU = RENK.vurgu, SOLUK = RENK.soluk, GRI = RENK.cizgi;
  const HATA = 'var(--bad)', IYI = 'var(--good)', KOYU = '#162038';

  /* Üsler kaynak metinde ¹²³… diye yazılır; tahtada math: ile çizilir (yazı tipinde ⁴–⁹ yok). */
  const USLER = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const mat = (s) => s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^{' + [...m].map((k) => USLER.indexOf(k)).join('') + '}');
  /* Dizilim yazısı: taban düz, üs elektron renginde. yaz() aynı öğenin metnini değiştirir. */
  function terim(c, p, x, y, metin, o = {}) {
    const t = c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 34, 'font-weight': 600,
      style: 'fill:' + (o.renk || 'var(--text)') }, p);
    t.yaz = (yeni) => {
      c.mathText(t, mat(yeni));
      t.querySelectorAll('tspan[font-size]').forEach((s) => { s.style.fill = ELEK; });
    };
    t.yaz(metin);
    return t;
  }
  const sil = (c, el, ms = 300) => c.tween(ms, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const cerceve = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 10 : o.rx,
    fill: o.fill || 'none', stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
  const carpi = (c, p, x, y, r = 12) => c.S('path', { d: `M ${x - r} ${y - r} L ${x + r} ${y + r} M ${x + r} ${y - r} L ${x - r} ${y + r}`,
    fill: 'none', stroke: HATA, 'stroke-width': 5, 'stroke-linecap': 'round' }, p);
  /* (x1, y1) noktasından (x2, y2) noktasına uçlu ok. */
  function okCiz(c, p, x1, y1, x2, y2, renk = VURGU) {
    const a = Math.atan2(y2 - y1, x2 - x1), uc = (d) => `${x2 - 13 * Math.cos(a + d)} ${y2 - 13 * Math.sin(a + d)}`;
    return c.S('path', { d: `M ${x1} ${y1} L ${x2} ${y2} M ${uc(0.5)} L ${x2} ${y2} L ${uc(-0.5)}`,
      fill: 'none', stroke: renk, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  }

  /* ---- Orbital kutusu ve elektron oku: KIT çizimlerinin ölçeklenebilir sarmalayıcısı ---- */
  function kutu(c, p, x, y, { k = 1, renk = ORB, okRenk = ELEK } = {}) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${k})` }, p);
    const kenar = KIT.orbitalKutusu(c, g, 0, 0, 0, { renk }).firstChild;
    return { g, x, y, k, renk, okRenk, kenar, oklar: [] };
  }
  /* Kutuya ok ekler. yon verilmezse ilk ok yukarı, ikincisi aşağı bakar; yerelX verilmezse oklar yan yana dizilir. */
  function okKoy(c, b, yon, yerelX) {
    const i = b.oklar.length;
    const g = KIT.elektronOku(c, b.g, yerelX == null ? 24 + i * 30 : yerelX, 0, yon || (i === 0 ? 1 : -1), { renk: b.okRenk });
    b.oklar.push(g);
    return g;
  }
  /* Ok, tahtadaki [x, y] noktasından kutuya uçarak yerleşir. */
  async function okUcur(c, b, nereden, { yon, ms = 420 } = {}) {
    const yerelX = 24 + b.oklar.length * 30, g = okKoy(c, b, yon);
    const dx = (nereden[0] - b.x) / b.k - yerelX, dy = (nereden[1] - b.y) / b.k - 41;
    await c.tween(ms, (e) => g.setAttribute('transform', `translate(${dx * (1 - e)} ${dy * (1 - e)})`));
    return g;
  }
  /* Kutuya girmeyi bekleyen elektron: (x, y) merkezli tek ok. */
  function bekleyen(c, p, x, y, yon = 1, k = 0.8) {
    const g = c.S('g', { transform: `translate(${x} ${y}) scale(${k})` }, p);
    KIT.elektronOku(c, g, 0, -41, yon, { renk: ELEK });
    return g;
  }
  const bosalt = (kutular) => kutular.forEach((b) => { b.oklar.forEach((g) => g.remove()); b.oklar = []; });
  /* Kutuların çerçevesini kısa süre kalınlaştırıp renklendirir. */
  const parlat = (c, kutular, renk = VURGU) => c.tween(700, (e, t) => kutular.forEach((b) => {
    b.kenar.setAttribute('stroke', t < 1 ? renk : b.renk);
    b.kenar.setAttribute('stroke-width', 3 + 4 * Math.sin(Math.PI * t));
  }));

  /* Yan yana kutular. dolum: her kutu için 'u' (yukarı ok) ve 'd' (aşağı ok) harfleri; '' boş kutu.
     Örnek: ['ud', 'u', ''] bir çift, bir tek, bir boş kutu çizer. */
  function sema(c, p, x, y, dolum, { k = 1, ara = 10, renk = ORB, okRenk = ELEK } = {}) {
    const g = c.S('g', {}, p);
    const kutular = dolum.map((oklar, i) => {
      const b = kutu(c, g, x + i * (80 * k + ara), y, { k, renk, okRenk });
      [...oklar].forEach((yon, j) => okKoy(c, b, yon === 'u' ? 1 : -1, oklar.length === 3 ? 16 + j * 24 : null));
      return b;
    });
    return { g, kutular };
  }
  /* Aynı şemanın paneldeki (şık, soru, defter) küçük çizimi. */
  function semaHtml(dolum) {
    const w = 32, h = 32, ara = 5, ust = 2, genislik = dolum.length * (w + ara) - ara + 4;
    const ic = dolum.map((oklar, i) => {
      const x = 2 + i * (w + ara);
      const okYollari = [...oklar].map((yon, j) => {
        const ox = x + (oklar.length === 3 ? 7 + j * 9 : 10 + j * 12);
        const a = yon === 'u' ? ust + h - 6 : ust + 6, b = yon === 'u' ? ust + 6 : ust + h - 6, d = yon === 'u' ? 5 : -5;
        return `<path d="M ${ox} ${a} L ${ox} ${b} M ${ox - 4} ${b + d} L ${ox} ${b} L ${ox + 4} ${b + d}" fill="none" stroke="var(--c2)" stroke-width="2.2" stroke-linecap="round"/>`;
      }).join('');
      return `<rect x="${x}" y="${ust}" width="${w}" height="${h}" rx="3" fill="none" stroke="var(--c1)" stroke-width="2"/>${okYollari}`;
    }).join('');
    const okuma = dolum.map((oklar) => (oklar ? [...oklar].map((yon) => (yon === 'u' ? '↑' : '↓')).join('') : 'boş')).join(' | ');
    return `<svg viewBox="0 0 ${genislik} ${h + 4}" width="${genislik}" height="${h + 4}" role="img" aria-label="${okuma}" style="vertical-align:middle">${ic}</svg>`;
  }

  /* Büyük üç eş enerjili kutu (2p): sahne 4, 5 ve 7'de aynı yerde durur. Kutu merkezleri x = 386, 500, 614. */
  const ucKutu = (c, p, dolum = ['', '', ''], y = 150) => sema(c, p, 334, y, dolum, { k: 1.3 });

  /* 1s, 2s, üç 2p ve (başta gizli) 3s kutusu: daha yüksek enerjili orbital daha yukarıda ve sağda durur. */
  function merdiven(c, p, y0 = 0) {
    const g = c.S('g', {}, p), parca = {}, kutular = {};
    [['1s', 1, 130, 300], ['2s', 1, 280, 230], ['2p', 3, 450, 160], ['3s', 1, 790, 90]].forEach(([ad, adet, x, y]) => {
      const pg = c.S('g', {}, g);
      kutular[ad] = Array.from({ length: adet }, (_, i) => kutu(c, pg, x + i * 90, y + y0));
      yazi(c, pg, x + (adet * 90 - 10) / 2, y + y0 + 120, ad, { size: 30 });
      parca[ad] = pg;
    });
    parca['3s'].style.opacity = 0;
    return { g, parca, kutu: kutular };
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

  /* ---- Sahne 1 · Yazımın söylemediği ---- */
  async function yazimSoylemez(c) {
    const svg = c.svg();
    const m = merdiven(c, svg);
    await belir(c, m.g);
    for (const ad of ['1s', '1s', '2s', '2s']) {
      const b = m.kutu[ad][0];
      await okUcur(c, b, [b.x + 40, b.y - 110], { ms: 280 });
    }
    await c.say('Önceki derste elektronları düşük enerjili orbitalden başlayarak yerleştirdik.');
    const baslik = terim(c, svg, 500, 84, 'C: 1s² 2s² 2p²', { size: 44 });
    await belir(c, baslik, 350);
    await c.say('Karbonun dizilimi 1s² 2s² 2p² idi.', { speak: 'Karbonun dizilimi bir se iki, iki se iki, iki pe iki idi.' });
    const bekler = c.S('g', {}, svg);
    bekleyen(c, bekler, 800, 201);
    bekleyen(c, bekler, 850, 201);
    await Promise.all([belir(c, bekler, 350), parlat(c, m.kutu['2p'])]);
    await c.say('Bu yazım, 2p orbitallerinde iki elektron olduğunu söyler.',
      { speak: 'Bu yazım, iki pe orbitallerinde iki elektron olduğunu söyler.' });
    const soru = c.S('g', {}, svg);
    m.kutu['2p'].forEach((b) => yazi(c, soru, b.x + 40, b.y + 56, '?', { size: 44, renk: VURGU }));
    await belir(c, soru, 350);
    await c.say('Ama üç 2p orbitalinden hangilerinde olduklarını söylemez.',
      { speak: '[thoughtful] Ama üç tane iki pe orbitalinden hangilerinde olduklarını söylemez.' });
    soru.remove();
    const lejant = c.S('g', {}, svg);
    yazi(c, lejant, 330, 500, 'kutu: orbital', { size: 32, renk: ORB });
    yazi(c, lejant, 670, 500, 'ok: elektron', { size: 32, renk: ELEK });
    await belir(c, lejant, 350);
    await c.say('Bunu orbital şeması gösterir: kutu orbitaldir, ok elektrondur.');
    lejant.remove();
    const yonler = c.S('g', {}, svg);
    bekleyen(c, yonler, 250, 490, 1);
    yazi(c, yonler, 276, 500, 'yukarı yönlü', { size: 30, hiza: 'start' });
    bekleyen(c, yonler, 600, 490, -1);
    yazi(c, yonler, 626, 500, 'aşağı yönlü', { size: 30, hiza: 'start' });
    await belir(c, yonler, 350);
    await c.say('Şemada bir elektron yukarı ya da aşağı yönlü bir okla çizilir.');
    await c.tween(400, (e) => { [m.parca['2s'], m.parca['2p'], bekler, baslik, yonler].forEach((el) => { el.style.opacity = 1 - 0.7 * e; }); });
    await parlat(c, m.kutu['1s']);
    await c.say('Okları kutulara iki kural yerleştirir; önce tek bir kutuya bakalım.');
  }

  /* ---- Sahne 2 · Bir kutuda iki ok ---- */
  async function ikiOk(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    const X = [150, 383, 617, 850];
    /* Bir örnek: üstte ad, ortada büyük kutu, altta etiket. Görülmeyen yerleşim gri çizilir, etiketinin yanına çarpı konur. */
    const ornek = (i, ad, etiket, o = {}) => {
      const og = c.S('g', {}, g);
      yazi(c, og, X[i], 110, ad, { size: 30, renk: o.gri ? SOLUK : 'var(--text)' });
      const b = kutu(c, og, X[i] - 56, 150, { k: 1.4, renk: o.gri ? GRI : ORB, okRenk: o.gri ? SOLUK : ELEK });
      yazi(c, og, X[i] + (o.gri ? 20 : 0), 312, etiket, { size: 30, renk: o.gri ? HATA : SOLUK });
      if (o.gri) carpi(c, og, X[i] - 74, 302, 11);
      return { g: og, b };
    };
    const helyum = ornek(0, 'Helyum', '1s');
    await belir(c, helyum.g);
    await okUcur(c, helyum.b, [150, 60]);
    await okUcur(c, helyum.b, [150, 60]);
    await c.say('Helyumun iki elektronu da 1s orbitalindedir.', { speak: 'Helyumun iki elektronu da bir se orbitalindedir.' });
    const not = yazi(c, g, 60, 400, 'biri yukarı, öteki aşağı', { size: 30, renk: VURGU, hiza: 'start' });
    await belir(c, not, 350);
    await c.say('Şemasında oklardan biri yukarı, öteki aşağı bakar.');
    const magnezyum = ornek(1, 'Magnezyum', '3s');
    await belir(c, magnezyum.g);
    await okUcur(c, magnezyum.b, [383, 60]);
    await okUcur(c, magnezyum.b, [383, 60]);
    not.textContent = 'ikisinde de oklar zıt yönlü';
    await c.say('Magnezyumun 3s orbitalindeki iki elektron da zıt yönlü çizilir.',
      { speak: 'Magnezyumun üç se orbitalindeki iki elektron da zıt yönlü çizilir.' });
    const ayni = ornek(2, 'aynı yönlü', 'görülmez', { gri: true });
    okKoy(c, ayni.b, 1);
    okKoy(c, ayni.b, 1);
    await belir(c, ayni.g);
    await c.say('İki okun aynı yöne baktığı bir orbital hiçbir atomda görülmez.');
    const uclu = ornek(3, 'üç elektron', 'görülmez', { gri: true });
    [[1, 16], [-1, 40], [1, 64]].forEach(([yon, x]) => okKoy(c, uclu.b, yon, x));
    await belir(c, uclu.g);
    await c.say('İçinde üç elektron olan bir orbital de görülmez.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    yazi(c, g, 500, 70, 'Oksijen: üç 2p orbitalinde 4 elektron', { size: 30 });
    const ADAY = [['ud', 'u', 'u'], ['u', 'u', 'uu'], ['u', 'ud', 'u']];
    const aday = ADAY.map((dolum, i) => sema(c, g, 370, 110 + i * 140, dolum));
    await belir(c, g);
    await c.choice({ tag: 'Uygula', q: 'Oksijenin üç 2p orbitalinde dört elektron var. Hangi şema olamaz?',
      options: ADAY.map(semaHtml), answer: 1,
      hints: ['Bu şemadaki çiftin okları zıt yönlü; görülen örüntüye uyuyor.', '', 'Buradaki çiftin okları da zıt yönlü; çiftin hangi kutuda olduğu sorun değil.'],
      right: 'Son kutudaki iki ok aynı yöne bakıyor.',
      onPick: (i, dogru) => { if (dogru) { aday[1].kutular[2].kenar.setAttribute('stroke', HATA); carpi(c, g, 690, 291, 22); } } });
    await c.tween(350, (e) => { aday[0].g.style.opacity = aday[2].g.style.opacity = 1 - 0.7 * e; });
    await c.say('Son kutudaki iki ok aynı yöne bakıyor; böyle bir yerleşim olmaz.');

    await sil(c, g);
    g = c.S('g', {}, svg);
    await belir(c, yazi(c, g, 500, 100, 'Pauli dışlama ilkesi', { size: 40, renk: VURGU }));
    await c.say('Bu kurala Pauli dışlama ilkesi denir.');
    const tek = kutu(c, g, 436, 150, { k: 1.6 });
    await belir(c, tek.g, 300);
    await okUcur(c, tek, [500, 120]);
    await okUcur(c, tek, [500, 120]);
    await belir(c, yazi(c, g, 500, 340, 'bir orbitalde en çok 2 elektron', { size: 30 }), 350);
    await c.say('Pauli dışlama ilkesi: bir orbitalde en çok iki elektron bulunur.',
      { speak: 'Pauli dışlama ilkesi: [short pause] bir orbitalde en çok iki elektron bulunur.' });
    const yanlar = c.S('g', {}, g);
    sema(c, yanlar, 170, 175, ['uu'], { renk: GRI, okRenk: SOLUK });
    carpi(c, yanlar, 210, 290, 14);
    sema(c, yanlar, 750, 175, ['udu'], { renk: GRI, okRenk: SOLUK });
    carpi(c, yanlar, 790, 290, 14);
    yazi(c, yanlar, 500, 390, 'ikisi zıt yönlü', { size: 34, renk: VURGU });
    await belir(c, yanlar, 400);
    await c.say('Bu iki elektron zıt yönlü olmak zorundadır.');
    c.note('<b>Pauli dışlama ilkesi: bir orbitalde en çok iki elektron, zıt yönlü.</b><br>He: ' + semaHtml(['ud']), 'Pauli dışlama ilkesi');
  }

  /* ---- Sahne 3 · İki, altı, on ---- */
  async function kapasite(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    const birS = kutu(c, g, 240, 250, { k: 1.4 });
    okKoy(c, birS);
    okKoy(c, birS);
    yazi(c, g, 296, 220, 'dolu', { size: 30, renk: VURGU });
    const ucuncu = bekleyen(c, g, 520, 307, 1, 1.4);
    await belir(c, g);
    await c.tween(1000, (e, t) => ucuncu.setAttribute('transform', `translate(${520 - 130 * Math.sin(Math.PI * t)} 307) scale(1.4)`));
    await c.say('Pauli dışlama ilkesi, bir orbitalin neden iki elektronla dolduğunu açıklar.');
    const lityum = c.S('g', {}, g);
    yazi(c, lityum, 500, 70, 'Lityum', { size: 36 });
    yazi(c, lityum, 296, 412, '1s', { size: 32 });
    yazi(c, lityum, 616, 292, '2s', { size: 32 });
    const ikiS = kutu(c, lityum, 560, 130, { k: 1.4 });
    await belir(c, lityum, 400);
    ucuncu.remove();
    await okUcur(c, ikiS, [520, 307], { ms: 600 });
    await c.say("Lityumun üçüncü elektronu bu yüzden 1s’ye giremez; 2s’ye yerleşir.",
      { speak: 'Lityumun üçüncü elektronu bu yüzden bir se orbitaline giremez; iki se orbitaline yerleşir.' });

    await sil(c, g);
    g = c.S('g', {}, svg);
    /* Üç satır: tür harfi, kutular, hesap. */
    const satir = (i, harf, adet) => {
      const y = 100 + i * 140, sg = c.S('g', {}, g);
      yazi(c, sg, 110, y + 52, harf, { size: 48, renk: ORB });
      const hesap = yazi(c, sg, 730, y + 48, `${adet} × 2 = ?`, { size: 34 });
      return { g: sg, y, hesap, kutular: sema(c, sg, 190, y, Array(adet).fill(''), { k: 0.9, ara: 8 }).kutular };
    };
    const ciftle = async (r) => {
      for (const b of r.kutular) {
        await okUcur(c, b, [b.x + 36, b.y - 50], { ms: 150 });
        await okUcur(c, b, [b.x + 36, b.y - 50], { ms: 150 });
      }
    };
    const s = satir(0, 's', 1);
    s.hesap.textContent = '1 × 2 = 2';
    await belir(c, s.g);
    await ciftle(s);
    await c.say('s türünde tek orbital vardır; en çok iki elektron alır.',
      { speak: 'Se türünde tek orbital vardır; en çok iki elektron alır.' });
    const p = satir(1, 'p', 3);
    p.hesap.style.opacity = 0;
    await belir(c, p.g);
    await ciftle(p);
    await c.say('p türünde üç orbital vardır; her biri iki elektron alır.',
      { speak: 'Pe türünde üç orbital vardır; her biri iki elektron alır.' });
    p.hesap.textContent = '3 × 2 = 6';
    await belir(c, p.hesap, 350);
    await c.say('Üç p orbitali birlikte en çok altı elektron alır.', { speak: 'Üç pe orbitali birlikte en çok altı elektron alır.' });
    const d = satir(2, 'd', 5);
    await belir(c, d.g);
    await c.choice({ tag: 'Uygula', q: 'd türünde beş orbital var. Birlikte en çok kaç elektron alırlar?', options: ['5', '6', '10'], answer: 2,
      hints: ['Beş, orbital sayısı; her orbital iki elektron alır.', 'Altı, üç p orbitalinin toplamıydı; burada beş orbital var.', ''],
      right: 'Beş orbital, her birinde iki elektron.',
      onPick: (i, dogru) => { if (dogru) ciftle(d); } });
    d.hesap.textContent = '5 × 2 = 10';
    await c.say('Beş orbitalin her birinde iki elektron: toplam on.');
    for (const [r, metin] of [[s, 's²'], [p, 'p⁶'], [d, 'd¹⁰']]) await belir(c, terim(c, g, 910, r.y + 50, metin, { size: 42, renk: VURGU }), 250);
    await c.say('Bu yüzden dizilimde en çok s², p⁶ ve d¹⁰ yazılır.',
      { speak: 'Bu yüzden dizilimde en çok se iki, pe altı ve de on yazılır.' });
  }

  /* ---- Sahne 4 · Eş enerjili kutular: önce birer birer ---- */
  async function birerBirer(c) {
    const svg = c.svg();
    let baslik = terim(c, svg, 500, 90, 'Karbon · 2p²', { size: 40 });
    const s = ucKutu(c, svg), BX = [760, 815, 870], BY = 204;
    let bek = [0, 1].map((i) => bekleyen(c, svg, BX[i], BY, 1, 1.3));
    await belir(c, svg);
    await c.say('Şimdi karbona dönelim: iki 2p elektronu hangi kutularda?',
      { speak: '[curious] Şimdi karbona dönelim: iki tane iki pe elektronu hangi kutularda?' });
    const es = c.S('g', {}, svg);
    c.S('path', { d: 'M 334 276 L 334 290 L 666 290 L 666 276', fill: 'none', stroke: ORB, 'stroke-width': 3 }, es);
    yazi(c, es, 500, 332, 'üç 2p orbitali: eş enerjili', { size: 30, renk: ORB });
    await belir(c, es, 400);
    await c.say('Aynı alt enerji seviyesindeki orbitaller eş enerjilidir; üç 2p orbitali böyledir.',
      { speak: 'Aynı alt enerji seviyesindeki orbitaller eş enerjilidir; üç tane iki pe orbitali böyledir.' });
    for (const i of [0, 1]) {
      bek[i].remove();
      await okUcur(c, s.kutular[i], [BX[i], BY], { yon: 1, ms: 600 });
    }
    await c.say('Karbonun şemasında iki 2p elektronu iki ayrı kutuda durur.',
      { speak: 'Karbonun şemasında iki tane iki pe elektronu iki ayrı kutuda durur.' });
    const ayni = yazi(c, svg, 500, 396, 'iki ok da aynı yönlü', { size: 30, renk: VURGU });
    await belir(c, ayni, 350);
    await c.say('İki ok da aynı yöne bakar.');

    ayni.remove();
    bosalt(s.kutular);
    baslik.yaz('Azot · 2p³');
    bek = [0, 1, 2].map((i) => bekleyen(c, svg, BX[i], BY, 1, 1.3));
    await c.say('Azotun 2p orbitallerinde üç elektron vardır.', { speak: 'Azotun iki pe orbitallerinde üç elektron vardır.' });
    const birer = async () => {
      for (const i of [0, 1, 2]) {
        bek[i].remove();
        await okUcur(c, s.kutular[i], [BX[i], BY], { yon: 1, ms: 450 });
      }
    };
    await c.choice({ q: 'Azotun üç 2p elektronu nasıl yerleşir?',
      options: [['u', 'u', 'u'], ['ud', 'u', ''], ['u', 'd', 'u']].map(semaHtml), answer: 0,
      hints: ['', 'Karbonda iki elektron ayrı kutulardaydı; burada boş kutu dururken iki elektron eşleşmiş.', 'Elektronlar ayrı kutularda ama karbondaki gibi aynı yönlü değil.'],
      right: 'Karbondaki örüntü sürüyor: her elektron ayrı kutuya, aynı yönlü.',
      onPick: (i, dogru) => { if (dogru) birer(); } });
    await parlat(c, s.kutular);
    await c.say('Azotta üç elektron üç ayrı kutuya, aynı yönlü yerleşir.');
    const itme = c.S('g', {}, svg);
    const yukler = [440, 560].map((x) => {
      const yg = c.S('g', { transform: `translate(${x} 450)` }, itme);
      c.S('circle', { r: 26, fill: KOYU, stroke: ELEK, 'stroke-width': 3 }, yg);
      yazi(c, yg, 0, 13, '−', { size: 40, renk: ELEK });
      return yg;
    });
    const itmeOklari = c.S('g', {}, itme);
    okCiz(c, itmeOklari, 402, 450, 362, 450);
    okCiz(c, itmeOklari, 598, 450, 638, 450);
    await belir(c, itme, 400);
    await c.say('Elektronlar eksi yüklüdür; aynı yükler birbirini iter.');
    itmeOklari.remove();
    await c.tween(700, (e) => { yukler[0].setAttribute('transform', `translate(${440 - 120 * e} 450)`); yukler[1].setAttribute('transform', `translate(${560 + 120 * e} 450)`); });
    await belir(c, yazi(c, itme, 500, 524, 'uzakta: enerji daha düşük', { size: 28, renk: IYI }), 350);
    await c.say('Ayrı orbitallere yerleşen elektronlar birbirinden uzaklaşır; enerjileri azalır.');
    itme.remove();
    const koltuk = c.S('g', {}, svg);
    [386, 500, 614].forEach((x) => {
      cerceve(c, koltuk, x - 50, 404, 46, 46, { rx: 8 });
      cerceve(c, koltuk, x + 4, 404, 46, 46, { rx: 8 });
      c.S('circle', { cx: x - 27, cy: 427, r: 14, fill: ELEK }, koltuk);
    });
    const koltukYazi = yazi(c, koltuk, 500, 506, 'ikili koltuklar: önce tek tek', { size: 30, renk: SOLUK });
    await belir(c, koltuk, 400);
    await c.say('Otobüste de yolcular önce boş ikili koltuklara tek tek oturur.');
    baslik.remove();
    baslik = yazi(c, svg, 500, 90, 'Hund kuralı', { size: 40, renk: VURGU });
    await belir(c, baslik, 350);
    await c.say('Bu kurala Hund kuralı denir.');
    koltukYazi.textContent = 'önce birer birer, aynı yönlü';
    koltukYazi.style.fill = VURGU;
    await c.say('Hund kuralı: elektronlar eş enerjili orbitallere önce birer birer, aynı yönlü yerleşir.',
      { speak: 'Hund kuralı: [short pause] elektronlar eş enerjili orbitallere önce birer birer, aynı yönlü yerleşir.' });
    c.note('<b>Hund kuralı: eş enerjili orbitallere önce birer birer, aynı yönlü.</b><br>N: ' + semaHtml(['u', 'u', 'u']), 'Hund kuralı');
  }

  /* ---- Sahne 5 · Sonra eşleşme ---- */
  async function eslesme(c) {
    const svg = c.svg();
    const baslik = terim(c, svg, 500, 70, 'Oksijen · 2p⁴', { size: 40 });
    const s = ucKutu(c, svg, ['', '', ''], 170), BX = [740, 795, 850, 905], BY = 224, USTTE = [386, 122];
    const bek = BX.map((x) => bekleyen(c, svg, x, BY, 1, 1.3));
    await belir(c, svg);
    await c.say('Oksijenin 2p orbitallerinde dört elektron vardır.', { speak: 'Oksijenin iki pe orbitallerinde dört elektron vardır.' });
    for (const i of [0, 1, 2]) {
      bek[i].remove();
      await okUcur(c, s.kutular[i], [BX[i], BY], { yon: 1, ms: 450 });
    }
    await c.say('İlk üçü üç kutuya birer birer, aynı yönlü yerleşir.');
    const not = yazi(c, svg, 500, 338, 'boş 2p kutusu kalmadı', { size: 30, renk: SOLUK });
    await Promise.all([belir(c, not, 350), parlat(c, s.kutular)]);
    await c.say('Artık boş 2p kutusu kalmadı.', { speak: 'Artık boş iki pe kutusu kalmadı.' });
    await c.tween(700, (e) => bek[3].setAttribute('transform', `translate(${c.lerp(BX[3], USTTE[0], e)} ${c.lerp(BY, USTTE[1], e)}) scale(1.3)`));
    await c.say('Dördüncü elektron, içinde tek elektron olan bir kutuya girer.');
    await c.choice({ tag: 'Uygula', q: 'Dördüncü elektronun oku hangi yöne bakar?',
      options: ['Kutudaki okla aynı yöne', 'Kutudaki oka zıt yöne', 'Yönü fark etmez'], answer: 1,
      hints: ['Bir orbitaldeki iki elektron aynı yönlü olamaz.', '', 'Aynı kutudaki ikinci ok için yön serbest değildir; Pauli dışlama ilkesini hatırla.'],
      right: 'Pauli dışlama ilkesi: aynı orbitaldeki iki elektron zıt yönlüdür.',
      onPick: (i, dogru) => { if (dogru) { bek[3].remove(); okUcur(c, s.kutular[0], USTTE, { ms: 500 }); } } });
    not.remove();
    const etiket = [386, 500, 614].map((x, i) => yazi(c, svg, x, 322, i ? 'tek' : 'çift', { size: 30, renk: i ? SOLUK : VURGU }));
    etiket[1].style.opacity = etiket[2].style.opacity = 0;
    await belir(c, etiket[0], 350);
    await c.say('Kutudaki ikinci elektron zıt yönlü olur; iki elektron eşleşir.');
    await c.tween(350, (e) => { etiket[1].style.opacity = etiket[2].style.opacity = e; });
    await c.say('Oksijenin 2p şeması: bir kutuda çift, iki kutuda tek elektron.',
      { speak: 'Oksijenin iki pe şeması: bir kutuda çift, iki kutuda tek elektron.' });
    const es = c.S('g', {}, svg);
    [['ud', 'u', 'u'], ['u', 'ud', 'u'], ['u', 'u', 'ud']].forEach((dolum, i) => sema(c, es, 184 + i * 250, 380, dolum, { k: 0.5, ara: 6 }));
    yazi(c, es, 500, 480, 'üçü de olur: kutular eş enerjili', { size: 30 });
    await belir(c, es, 400);
    await c.say('Çiftin hangi kutuda olduğu fark etmez; üç kutu eş enerjilidir.');
    es.remove();
    const kural = c.S('g', {}, svg);
    yazi(c, kural, 500, 410, 'önce birer birer,', { size: 32, renk: VURGU });
    yazi(c, kural, 500, 454, 'boş kutu kalmayınca zıt yönlü eşleşme', { size: 32, renk: VURGU });
    await belir(c, kural, 400);
    await c.say('Boş kutu kalmayınca elektronlar zıt yönlü eşleşir; Hund kuralının devamı budur.');
    kural.remove();
    baslik.yaz('Neon · 2p⁶');
    for (const i of [1, 2]) {
      await okUcur(c, s.kutular[i], [386 + i * 114, 122], { ms: 450 });
      etiket[i].textContent = 'çift';
      etiket[i].style.fill = VURGU;
    }
    await c.say('Neonun altı 2p elektronu üç kutuyu da çift çift doldurur.',
      { speak: 'Neonun altı tane iki pe elektronu üç kutuyu da çift çift doldurur.' });
  }

  /* ---- Sahne 6 · Üç kural birlikte ---- */
  async function ucKural(c) {
    const svg = c.svg();
    const m = merdiven(c, svg, -20), BEKLE = [850, 390];
    const baslik = terim(c, svg, 480, 60, 'Üç kural birlikte', { size: 36 });
    const kural = [['Aufbau ilkesi', 'sıra', 170], ['Pauli dışlama ilkesi', 'bir kutu', 500], ['Hund kuralı', 'dağılım', 830]].map(([ad, is, x]) => {
      const g = c.S('g', {}, svg);
      yazi(c, g, x, 480, ad, { size: 28, renk: VURGU });
      yazi(c, g, x, 520, is, { size: 26 });
      g.style.opacity = 0.3;
      return g;
    });
    const yak = (i) => c.tween(400, (e) => { kural[i].style.opacity = 0.3 + 0.7 * e; });
    await belir(c, svg);
    await c.say('Bir orbital şeması çizerken üç kural birlikte çalışır.');
    const sira = c.S('g', {}, svg);
    okCiz(c, sira, 220, 280, 270, 254);
    okCiz(c, sira, 370, 210, 440, 180);
    await Promise.all([yak(0), belir(c, sira, 400)]);
    await c.say('Aufbau ilkesi sırayı verir: önce düşük enerjili orbital dolar.');
    await Promise.all([yak(1), parlat(c, m.kutu['1s'])]);
    await c.say('Pauli dışlama ilkesi bir kutuya en çok iki zıt yönlü ok koyar.');
    await Promise.all([yak(2), parlat(c, m.kutu['2p'])]);
    await c.say('Hund kuralı okları eş enerjili kutulara önce tek tek dağıtır.');

    sira.remove();
    baslik.yaz('Flor · 9 elektron');
    const kalan = yazi(c, svg, 850, 330, 'Kalan: 9', { size: 28, renk: SOLUK });
    let bek = bekleyen(c, svg, ...BEKLE, 1, 1);
    await c.say('Florun 9 elektronunu kutulara yerleştir.', { noWait: true });
    const tum = [m.kutu['1s'][0], m.kutu['2s'][0], ...m.kutu['2p']], ALT = ['1s', '2s', '2p', '2p', '2p'];
    await adimAdim(c, {
      adim: 9, secenekler: ['1s', '2s', '2p · 1. kutu', '2p · 2. kutu', '2p · 3. kutu'],
      soru: (n) => `<b>${n + 1}. elektron</b> hangi kutuya girer?`,
      kontrol: (n, i) => {
        const b = tum[i], sirada = ['1s', '2s', '2p'].find((ad) => m.kutu[ad].some((x) => x.oklar.length < 2));
        if (b.oklar.length === 2) return '<b>Pauli dışlama ilkesi:</b> bir kutuda en çok iki elektron bulunur.';
        if (ALT[i] !== sirada) return `<b>Aufbau ilkesi:</b> daha düşük enerjili ${sirada} kutusunda hâlâ yer var.`;
        if (b.oklar.length === 1 && m.kutu[ALT[i]].some((x) => x.oklar.length === 0)) return '<b>Hund kuralı:</b> boş bir 2p kutusu dururken elektronlar eşleşmez.';
        return true;
      },
      yerlestir: async (n, i) => {
        bek.remove();
        await okUcur(c, tum[i], BEKLE, { ms: 320 });
        kalan.textContent = 'Kalan: ' + (8 - n);
        if (n < 8) bek = bekleyen(c, svg, ...BEKLE, 1, 1);
      },
      son: 'Dokuz elektron yerleşti; üç kurala da uyuldu.',
    });
    kalan.remove();
    await parlat(c, m.kutu['2p']);
    await c.say('Florun 2p kutularında iki çift ve bir tek elektron kaldı.',
      { speak: 'Florun iki pe kutularında iki çift ve bir tek elektron kaldı.' });
    baslik.yaz('Sodyum · 11 elektron');
    const tekli = m.kutu['2p'].find((b) => b.oklar.length === 1);
    await okUcur(c, tekli, [tekli.x + 40, 60], { ms: 500 });
    await belir(c, m.parca['3s'], 400);
    await c.say('Sodyumda on elektron ilk beş kutuyu çift çift doldurur.');
    await okUcur(c, m.kutu['3s'][0], BEKLE, { ms: 600 });
    await c.say('On birinci elektron 3s kutusunda tek başına durur.',
      { speak: 'On birinci elektron üç se kutusunda tek başına durur.' });
  }

  /* ---- Sahne 7 · Yanlış şemayı bul ---- */
  async function yanlisSema(c) {
    const svg = c.svg();
    let g = c.S('g', {}, svg);
    await belir(c, yazi(c, g, 500, 70, 'Şemayı denetle: üç soru', { size: 34, renk: VURGU }));
    await c.say('Bir şemayı denetlerken üç soruyu sırayla sor.');
    /* Her soru bir satır: solda soru, sağda o hatanın küçük bir örneği (hatalı oklar kırmızı). */
    const soru = (i, metin, ornek) => {
      const sg = c.S('g', {}, g), y = 120 + i * 140;
      yazi(c, sg, 70, y + 36, `${i + 1}. ${metin}`, { size: 28, hiza: 'start' });
      ornek(sg, y);
      return belir(c, sg, 400);
    };
    const mini = { k: 0.6, ara: 6 };
    await soru(0, 'Sıra atlanmış mı?', (sg, y) => {
      sema(c, sg, 620, y, ['ud'], mini);
      sema(c, sg, 690, y, ['u'], mini);
      sema(c, sg, 760, y, ['u', '', ''], { ...mini, okRenk: HATA });
      [['1s', 644], ['2s', 714], ['2p', 838]].forEach(([ad, x]) => yazi(c, sg, x, y + 80, ad, { size: 24, renk: SOLUK }));
    });
    await c.say('Düşük enerjili orbital dolmadan üsttekine geçilmiş mi?');
    await soru(1, 'Aynı yönlü çift var mı?', (sg, y) => sema(c, sg, 620, y, ['uu'], { ...mini, okRenk: HATA }));
    await c.say('Bir kutuda aynı yönlü iki ok var mı?');
    await soru(2, 'Boş kutu varken eşleşme var mı?', (sg, y) => sema(c, sg, 620, y, ['ud', ''], { ...mini, okRenk: HATA }));
    await c.say('Boş eş enerjili kutu dururken elektronlar eşleşmiş mi?');

    await sil(c, g);
    g = c.S('g', {}, svg);
    terim(c, g, 500, 90, 'Azot · 2p³', { size: 40 });
    const s = ucKutu(c, g, ['ud', 'u', '']);
    await belir(c, g);
    await c.choice({ tag: 'Uygula', q: 'Azot için 2p kutuları ' + semaHtml(['ud', 'u', '']) + ' çizilmiş. Şema hangi kurala uymuyor?',
      options: ['Aufbau ilkesi', 'Pauli dışlama ilkesi', 'Hund kuralı'], answer: 2,
      hints: ['Burada yalnızca 2p kutuları var; sorun sırada değil, eş enerjili kutulara dağılımda.', 'Kutudaki iki ok zıt yönlü ve ikiden fazla değil; Pauli dışlama ilkesine uyuyor.', ''],
      right: 'Boş bir 2p kutusu dururken iki elektron eşleştirilmiş.',
      onPick: (i, dogru) => { if (dogru) s.kutular[0].kenar.setAttribute('stroke', HATA); } });
    const durum = yazi(c, g, 500, 332, 'boş kutu dururken eşleşme', { size: 30, renk: HATA });
    await Promise.all([belir(c, durum, 350), parlat(c, [s.kutular[2]])]);
    await c.say('Boş bir 2p kutusu dururken iki elektron eşleştirilmiş; Hund kuralına uymaz.',
      { speak: '[thoughtful] Boş bir iki pe kutusu dururken iki elektron eşleştirilmiş; Hund kuralına uymaz.' });
    /* Şema düzeltilir: eşleşen elektron boş kutuya geçer. */
    s.kutular[0].oklar.pop().remove();
    s.kutular[0].kenar.setAttribute('stroke', ORB);
    await okUcur(c, s.kutular[2], [s.kutular[0].x + 70, 204], { yon: 1, ms: 800 });
    durum.textContent = 'düzeltildi: üç kutuda birer elektron';
    durum.style.fill = IYI;
    await c.wait(1200);

    await sil(c, g);
    g = c.S('g', {}, svg);
    const baslik = terim(c, g, 500, 100, 'Beş 3d orbitali', { size: 40 });
    const d = sema(c, g, 272, 190, ['', '', '', '', ''], { ara: 14 }).kutular;
    yazi(c, g, 500, 322, '3d', { size: 34, renk: SOLUK });
    await belir(c, g);
    await c.say('Hund kuralı d orbitallerinde de geçerlidir.', { speak: 'Hund kuralı de orbitallerinde de geçerlidir.' });
    const tekTek = async (ms) => { for (const b of d) await okUcur(c, b, [b.x + 40, 430], { yon: 1, ms }); };
    baslik.yaz('Mangan · 3d⁵');
    await tekTek(350);
    await c.say('Manganın beş 3d elektronu beş kutuya birer birer, aynı yönlü yerleşir.',
      { speak: 'Manganın beş tane üç de elektronu beş kutuya birer birer, aynı yönlü yerleşir.' });
    bosalt(d);
    baslik.yaz('Demir · 3d⁶');
    await c.choice({ tag: 'Uygula', q: 'Demirin altı 3d elektronu var. Beş 3d kutusu nasıl dolar?',
      options: ['Bir kutuda çift, dört kutuda tek', 'Üç kutuda çift, iki kutu boş', 'Altı kutuda birer'], answer: 0,
      hints: ['', 'Boş kutu dururken elektronlar eşleşmez.', 'd türünde beş orbital vardır; altıncı bir kutu yok.'],
      right: 'Önce beş kutuya birer; altıncı elektron bir kutuda eşleşir.',
      onPick: (i, dogru) => { if (dogru) tekTek(250).then(() => okUcur(c, d[0], [d[0].x + 40, 430], { ms: 450 })); } });
    await c.say('Önce beş kutuya birer elektron yerleşir; altıncı elektron birini eşleştirir.');
    const son = c.S('g', {}, g);
    yazi(c, son, 500, 420, 'Önce herkese bir koltuk,', { size: 34, renk: VURGU });
    yazi(c, son, 500, 466, 'sonra yanına ikinci.', { size: 34, renk: VURGU });
    await belir(c, son, 400);
    await c.say('Önce herkese bir koltuk, sonra yanına ikinci.',
      { speak: 'Önce herkese bir koltuk, [short pause] sonra yanına ikinci.' });
  }

  Ders.start({
    id: 'etkilesim-e2', kicker: 'Konu E · Elektron dizilimi', title: 'Eş enerjiye önce tek tek', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Eş enerjiye önce tek tek', hook: 'Eş enerjili üç boş orbitale iki elektron nasıl yerleşir?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Yazımın söylemediği', goal: 'Dizilim yazımının neyi göstermediğini fark et.', run: yazimSoylemez },
      { title: 'Bir kutuda iki ok', goal: 'Bir kutudaki okların sayısını ve yönünü incele.', run: ikiOk },
      { title: 'İki, altı, on', goal: 's, p ve d türlerinin en çok kaç elektron aldığını hesapla.', run: kapasite },
      { title: 'Eş enerjili kutular: önce birer birer', goal: 'Eş enerjili kutuların dolma örüntüsünü bul.', run: birerBirer },
      { title: 'Sonra eşleşme', goal: 'Boş kutu kalmayınca elektronun nereye girdiğini izle.', run: eslesme },
      { title: 'Üç kural birlikte', goal: 'Florun şemasını üç kurala göre kur.', run: ucKural },
      { title: 'Yanlış şemayı bul', goal: 'Hatalı şemada çiğnenen kuralı ayır.', run: yanlisSema },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Fosforun üç 3p orbitalinde üç elektron vardır. Hangi şema doğrudur?',
        options: [['ud', 'u', ''], ['u', 'u', 'u'], ['u', 'd', 'u']].map(semaHtml), answer: 1,
        why: ['Boş bir kutu dururken iki elektron eşleştirilmiş.', 'Eş enerjili orbitallere elektronlar önce birer birer, aynı yönlü yerleşir.', 'Elektronlar ayrı kutularda ama aynı yönlü değil.'], scene: 3 },
      { q: 'Bir şemada 2s kutusuna aynı yönlü iki ok çizilmiş. Hangi kurala uyulmamıştır?',
        options: ['Hund kuralı', 'Aufbau ilkesi', 'Pauli dışlama ilkesi'], answer: 2,
        why: ['Hund kuralı, eş enerjili kutular arasındaki dağılımı düzenler.', 'Aufbau ilkesi, orbitallerin dolma sırasını düzenler.', 'Bir orbitaldeki iki elektron zıt yönlü olmak zorundadır.'], scene: 1 },
      { q: 'Kaan: “Elektronlar önce aynı kutuyu çift çift doldurur; yeni kutuya ancak o dolunca geçer.” Hangi karşılık doğrudur?',
        options: ['Haklı; elektronlar birbirini çeker, bu yüzden eşleşir.', 'Haksız; bir kutuya yalnızca bir elektron girebilir.', 'Haksız; eş enerjili kutulara önce birer birer yerleşirler.'], answer: 2,
        why: ['Elektronlar eksi yüklüdür ve birbirini iter; ayrı kutulara yerleşince birbirinden uzaklaşıp enerjileri azalır.', 'Pauli dışlama ilkesi bir kutuya en çok iki zıt yönlü elektron koyar; tek elektronla sınırlamaz.', 'Evet. Hund kuralı: boş eş enerjili kutu dururken elektronlar eşleşmez, önce her kutuya bir elektron girer.'], scene: 3 },
      { q: 'Kobaltın 3d orbitallerinde yedi elektron vardır. Beş 3d kutusunun kaçında elektronlar eşleşmiştir?',
        options: ['İki kutuda', 'Bir kutuda', 'Üç kutuda'], answer: 0,
        why: ['Evet. Önce beş kutuya birer elektron girer; kalan iki elektron iki kutuyu eşleştirir.', 'Tek eşleşme altı elektrona denk gelir; yedinci elektron da bir kutuyu daha eşleştirir.', 'Üç çift altı elektron eder ve boş kutu bırakır; oysa boş kutu dururken elektronlar eşleşmez.'], scene: 6 },
    ], summary: ['<b>Önce herkese bir koltuk, sonra yanına ikinci.</b>', 'Pauli dışlama ilkesi: bir orbitalde en çok iki zıt yönlü elektron. Hund kuralı: eş enerjili orbitallere önce birer birer.'],
    nextLesson: { href: 'e3-valans-ve-simetri.html', label: 'Sonraki: Dengeli doluluk ve valans ›' },
  });
})();
