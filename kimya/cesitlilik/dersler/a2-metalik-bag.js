/* A2 — Metalik bağ: artı iyonlar ve elektron denizi
   Metal atomları valans elektronlarını bırakır ve artı iyona dönüşür; bırakılan elektronlar bütün iyonların arasında
   dolaşır. Metali, artı iyonlarla elektron denizinin çekimi bir arada tutar.
   Senaryo: plan/kimya/cesitlilik/senaryolar/A-metalik-bag.md ("A2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Çekim çizgileri ve kuvvet çubukları şematiktir, sayı taşımaz. */
(() => {
  'use strict';
  const { RENK, uz, ileri, koy, rastgele, yazi, cizgi, gizle, belir, par, ok, isaret, yuk, atom, etkilesim, metal, cubuk } = window.KIT;
  const { lerp, ease } = Ders;

  /* ---- bu dersin yerel çizim yardımcıları ---- */

  /* Elektronlar iyonların üstünde çizilsin diye metal() sonrası öğe sırası düzeltilir. */
  function kur(c, p, o) {
    const m = metal(c, p, o);
    araya(m, o); m.dagit(o.dagit == null ? 1 : o.dagit);
    m.elektronlar.forEach((e) => m.g.appendChild(e.el));
    return m;
  }
  /* İyon disklerinin üstüne artı işareti (yazı öğesi değil, çizgi). Elektronlar yine en üstte kalır. */
  function artilar(c, m, s = 7) {
    const g = c.S('g', {}, m.g);
    m.iyonlar.forEach((P) => {
      cizgi(c, g, [P[0] - s, P[1]], [P[0] + s, P[1]], '#10162b', 3);
      cizgi(c, g, [P[0], P[1] - s], [P[0], P[1] + s], '#10162b', 3);
    });
    m.elektronlar.forEach((e) => m.g.appendChild(e.el));
    return g;
  }
  /* Elektronların gezinti merkezlerini iyonlar arasındaki boşluklara alır; kenarlara yığılmasınlar. */
  function araya(m, o) {
    const r = rastgele((o.tohum || 7) + 99), dx = o.w / o.sutun, dy = o.h / o.satir;
    m.elektronlar.forEach((e) => {
      const i = 1 + Math.floor(r() * (o.sutun - 1)), j = 1 + Math.floor(r() * (o.satir - 1));
      e.merkez = [o.x + dx * i, o.y + dy * j]; e.gx = dx * (0.3 + r() * 0.6); e.gy = dy * (0.3 + r() * 0.6);
    });
  }
  /* Her iyondan en yakın k elektrona ince yeşil çekim çizgisi; guncelle() elektronlar yer değiştirince çağrılır.
     Çizgiler iyonların ve elektronların altında kalır. */
  function cekim(c, p, m, k) {
    const g = c.S('g', {}, p), hatlar = [];
    p.insertBefore(g, m.g);
    m.iyonlar.forEach(() => { for (let j = 0; j < k; j++) hatlar.push(cizgi(c, g, [0, 0], [0, 0], RENK.cekme, 2.2, { 'stroke-opacity': 0.9 })); });
    const guncelle = () => {
      const E = m.elektronlar.map((e) => [+e.el.getAttribute('cx'), +e.el.getAttribute('cy')]);
      m.iyonlar.forEach((P, i) => {
        const yakin = E.map((q) => [uz(P, q), q]).sort((a, b) => a[0] - b[0]);
        for (let j = 0; j < k; j++) koy(hatlar[i * k + j], P, yakin[j][1]);
      });
    };
    guncelle();
    return { g, guncelle };
  }
  /* Elektronları sahne bitene kadar gezdirir; her karede ek() çağrılır. */
  function gezdir(c, metaller, ek) {
    (async () => {
      try {
        while (c.alive()) await par(...metaller.map((m) => m.dolas(2000)), c.tween(2000, () => { if (ek) ek(); }, ease.linear));
      } catch (e) { if (!(e instanceof Ders.Cancelled)) throw e; }
    })();
  }
  const iyonDaireleri = (m) => [...m.g.querySelectorAll('circle')].filter((d) => d.getAttribute('fill') === RENK.arti);

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const ea = -1.1, eb = Math.PI - 1.1;
    let N1 = [330, 160], N2 = [670, 160];
    const a1 = atom(c, svg, N1, { r: 90, e: ea, ed: 44 }), a2 = atom(c, svg, N2, { r: 90, e: eb, ed: 44 });
    const E2 = ileri(N2, eb, 44);
    const adC = yazi(c, svg, N1[0], N1[1] + 50, 'çekirdek', { size: 22, kalin: 600, renk: RENK.arti });
    const adE = yazi(c, svg, E2[0], E2[1] + 42, 'elektron', { size: 22, kalin: 600, renk: RENK.eksi });
    const cek = etkilesim(c, svg, N1, E2, 'cekme', { b: 22, boy: 60 });
    const cub = c.S('g', {}, svg);
    yazi(c, cub, 430, 388, 'çekme', { hiza: 'end', size: 26, kalin: 600, renk: RENK.cekme });
    yazi(c, cub, 430, 448, 'itme', { hiza: 'end', size: 26, kalin: 600, renk: RENK.itme });
    const bc = cubuk(c, cub, 450, 380, RENK.cekme), bi = cubuk(c, cub, 450, 440, RENK.itme);
    gizle(a1.g, a2.g, adC, adE, cek, cub);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, [a1.g, a2.g, adC, adE], 500));
    await c.choice({
      tag: 'Hatırla', q: 'İki atom yaklaşırken bir atomun çekirdeği, öteki atomun elektronuna ne yapar?',
      options: ['İter', 'Çeker', 'Etkilemez'], answer: 1,
      hints: ['Çekirdek artı, elektron eksi yüklüdür; zıt yükler çeker.', '', 'İkisi de yüklüdür; zıt yükler birbirini çeker.'],
      right: 'Evet. Zıt yükler birbirini çeker.',
    });
    await par(c.say('Zıt yükler: çekirdek, öteki atomun elektronunu çeker.'), belir(c, cek, 450));
    await c.wait(600);
    c.clearSay();
    await par(belir(c, [cek, adC, adE], 400, 0), c.tween(1000, (e) => {
      a1.tasi([lerp(330, 375, e), 160]); a2.tasi([lerp(670, 625, e), 160]);
    }, ease.inOut));
    await c.choice({
      tag: 'Hatırla', q: 'Bağ kurulduğunda itme ve çekme kuvvetleri nasıl olur?',
      options: ['İtme yok olur', 'Çekme yok olur', 'Birbirini dengeler'], answer: 2,
      hints: ['Bağ, itme ile çekmenin dengelendiği yerde kurulur.', 'Bağ, itme ile çekmenin dengelendiği yerde kurulur.', ''],
      right: 'Evet. İtme ile çekme eşit büyüklüktedir.',
    });
    await par(c.say('Bağ kurulunca itme ile çekme dengelenir.'), belir(c, cub, 300).then(() => c.tween(800, (e) => { bc.boy(260 * e); bi.boy(260 * e); })));
    await c.wait(600);
    c.clearSay();
    await belir(c, [a1.g, a2.g, cub], 400, 0);
    await c.say('Bugün bu çekimin metallerde nasıl kurulduğuna bakacağız.', { speak: '[curious] Bugün bu çekimin metallerde nasıl kurulduğuna bakacağız.' });
  }

  /* ---- 2. Metal atomu elektronunu bırakır ---- */
  async function birak(c) {
    const svg = c.svg(1000, 562);

    // Bakır tel ve büyüteç.
    const tel = c.S('g', {}, svg);
    c.S('rect', { x: 80, y: 70, width: 330, height: 44, rx: 10, fill: RENK.metal }, tel);
    yazi(c, tel, 245, 162, 'bakır tel', { size: 24, kalin: 500, renk: RENK.soluk });
    cizgi(c, tel, [410, 92], [628, 138], RENK.ince, 2, { 'stroke-dasharray': '4 6' });
    c.S('circle', { cx: 740, cy: 170, r: 118, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 3 }, tel);
    [[128, 4], [162, 5], [196, 4]].forEach(([y, n]) => {
      for (let i = 0; i < n; i++) c.S('circle', { cx: 740 + (i - (n - 1) / 2) * 36, cy: y + 8, r: 15, fill: RENK.metal }, tel);
    });
    gizle(tel);

    // Tek bir sodyum atomu: çekirdek, iç elektronlar (soluk halka), en dışta tek valans elektronu.
    const C = [360, 300], RD = 140, RI = 76, AV = -0.55, EV = ileri(C, AV, RD);
    const kat = c.S('g', {}, svg), dis = c.S('g', {}, svg), zayif = c.S('g', {}, svg);
    c.S('circle', { cx: C[0], cy: C[1], r: RI, fill: RENK.eksi, 'fill-opacity': 0.1, stroke: RENK.eksi, 'stroke-opacity': 0.45, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, kat);
    yuk(c, kat, C, 'arti', 24);
    const adIc = yazi(c, kat, 556, 368, 'iç elektronlar', { hiza: 'start', size: 22, kalin: 600, renk: RENK.soluk });
    const gosterge = cizgi(c, kat, ileri(C, 0.33, RI), [546, 362], RENK.ince, 2, { 'stroke-dasharray': '3 5' });
    c.S('circle', { cx: C[0], cy: C[1], r: RD, fill: 'none', stroke: RENK.eksi, 'stroke-opacity': 0.5, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, dis);
    yuk(c, dis, EV, 'eksi', 13);
    const halka = c.S('circle', { cx: EV[0], cy: EV[1], r: 26, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, dis);
    yazi(c, dis, 536, 228, 'valans elektronu', { hiza: 'start', size: 22, kalin: 600, renk: RENK.eksi });
    ok(c, zayif, ileri(EV, AV + Math.PI, 20), ileri(EV, AV + Math.PI, 70), RENK.cekme);
    yazi(c, zayif, 536, 272, 'zayıf çekim', { hiza: 'start', size: 22, kalin: 600, renk: RENK.cekme });
    gizle(kat, dis, zayif, halka);

    // Sodyum atomlarından kurulu metal parçası.
    const m = kur(c, svg, { x: 180, y: 50, w: 640, h: 390, sutun: 4, satir: 3, r: 30, etiket: 'Na', size: 20, yukSayisi: 1, dagit: 0, tohum: 5, re: 7 });
    const IS = 5, ise = m.elektronlar[IS];
    Object.assign(ise, { merkez: [500, 245], gx: 270, gy: 150, w1: 0.55, w2: 0.83, f1: 0.5, f2: 2.1 });
    const iz = c.S('polyline', { fill: 'none', stroke: RENK.vurgu, 'stroke-opacity': 0.6, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
    svg.insertBefore(iz, m.g.nextSibling);
    const noktalar = []; let izAcik = false;
    const izGuncelle = () => {
      if (!izAcik) return;
      noktalar.push(`${(+ise.el.getAttribute('cx')).toFixed(0)},${(+ise.el.getAttribute('cy')).toFixed(0)}`);
      if (noktalar.length > 260) noktalar.shift();
      iz.setAttribute('points', noktalar.join(' '));
    };
    const daireler = iyonDaireleri(m);
    const aciklama = c.S('g', {}, svg);
    c.S('circle', { cx: 330, cy: 508, r: 14, fill: RENK.arti }, aciklama);
    yazi(c, aciklama, 356, 516, 'artı iyonlar', { hiza: 'start', size: 24, kalin: 600, renk: RENK.arti });
    c.S('circle', { cx: 590, cy: 508, r: 8, fill: RENK.eksi }, aciklama);
    yazi(c, aciklama, 612, 516, 'serbest elektronlar', { hiza: 'start', size: 24, kalin: 600, renk: RENK.eksi });
    gizle(m.g, aciklama);
    gezdir(c, [m], izGuncelle);

    // Anlat: bakır tel, sonra sodyum atomu ve valans elektronu.
    await par(c.say('Bir bakır telin içinde sayısız bakır atomu yan yana durur.'), belir(c, tel, 500));
    await par(c.say('Onları neyin bir arada tuttuğunu görmek için sodyum metaline bakalım.'), belir(c, tel, 450, 0), belir(c, kat, 500));
    await par(c.say('Bir atomun en dış katmanındaki elektronlara valans elektronu denir.'), belir(c, dis, 500, 1));
    await par(c.say('Sodyum atomunun tek bir valans elektronu vardır.'), belir(c, halka, 400));
    await par(c.say('Metal atomları valans elektronlarını zayıf çeker.'), belir(c, halka, 300, 0), belir(c, zayif, 450));

    // Atomlar bir araya gelir: elektronlar ayrılır ve dolaşır.
    await par(c.say('Atomlar bir araya gelince valans elektronları atomlarından ayrılır.'),
      belir(c, [kat, dis, zayif, tel], 450, 0).then(() => belir(c, m.g, 450)).then(() => c.wait(400)).then(() => c.tween(2200, (e) => m.dagit(e))));
    ise.el.setAttribute('r', 9); ise.el.style.stroke = RENK.vurgu; ise.el.style.strokeWidth = 3;
    izAcik = true;
    await par(c.say('Ayrılan elektronlar bütün atomların arasında serbestçe dolaşır.'), c.wait(5500));
    await par(c.say('Elektronunu bırakan atom artı yüklü bir iyona dönüşür.'), c.tween(700, (e) => daireler.forEach((d) => { d.setAttribute('stroke', '#c3cbea'); d.setAttribute('stroke-width', 3.5 * e); })));

    // Sor: bir eksi yük gitti, geriye ne kaldı?
    await c.choice({
      tag: 'Sıra sende', q: 'Sodyum atomu tek valans elektronunu bıraktı. Oluşan iyonun yükü nedir?',
      options: ['Yüksüz', '1−', '1+'], answer: 2,
      hints: ['Atom elektron bıraktı; nötr kalmaz.', 'Eksi yüklü bir elektron gitti; geriye artı yük fazlası kaldı.', ''],
      right: 'Evet. Eksi yüklü bir elektron gitti; geriye bir artı yük kaldı.',
    });
    await par(c.say('Bir elektron giden sodyum atomu, Na<sup>+</sup> iyonu olur.', { speak: 'Bir elektron giden sodyum atomu, sodyum iyonu olur.' }),
      c.tween(500, () => {}).then(() => m.etiketler.forEach((t) => c.mathText(t, 'Na^{+}'))));
    await par(c.say('Tahtada artık atomlar değil, artı iyonlar ve serbest elektronlar var.'),
      belir(c, m.etiketler, 500, 0).then(() => artilar(c, m)).then(() => belir(c, aciklama, 500)));
  }

  /* ---- 3. Dört metal, tek örüntü ---- */
  async function dortMetal(c) {
    const svg = c.svg(1000, 562);
    const SATIR = [
      { ad: 'sodyum', iyon: 'Na^{+}', n: 1 }, { ad: 'magnezyum', iyon: 'Mg^{2+}', n: 2 },
      { ad: 'kalsiyum', iyon: 'Ca^{2+}', n: 2 }, { ad: 'alüminyum', iyon: 'Al^{3+}', n: 3 },
    ];
    const YC = (i) => 124 + i * 114;
    const baslik = c.S('g', {}, svg);
    yazi(c, baslik, 400, 38, 'metal', { hiza: 'start', size: 20, kalin: 500, renk: RENK.soluk });
    yazi(c, baslik, 640, 38, 'iyon', { size: 20, kalin: 500, renk: RENK.soluk });
    yazi(c, baslik, 835, 38, 'iyon başına serbest elektron', { size: 20, kalin: 500, renk: RENK.soluk });
    cizgi(c, baslik, [30, 56], [970, 56], RENK.kenarlik, 1.5);
    gizle(baslik);

    const deniz = [], satirlar = SATIR.map((s, i) => {
      const y = YC(i);
      const dz = c.S('rect', { x: 26, y: y - 54, width: 328, height: 108, rx: 16, fill: RENK.eksi, 'fill-opacity': 0.08, stroke: RENK.eksi, 'stroke-opacity': 0.5, 'stroke-width': 2, 'stroke-dasharray': '6 6' });
      svg.insertBefore(dz, svg.firstChild); deniz.push(dz); gizle(dz);
      const m = kur(c, svg, { x: 40, y: y - 48, w: 300, h: 96, sutun: 3, satir: 2, r: 20, yukSayisi: s.n, tohum: 11 + i * 3, re: 5, dagit: 1 });
      artilar(c, m, 7);
      const cek = cekim(c, svg, m, s.n);
      const ad = yazi(c, svg, 400, y + 9, s.ad, { hiza: 'start', size: 26, kalin: 600 });
      const iyon = yazi(c, svg, 640, y + 10, s.iyon, { size: 32, kalin: 700, math: true });
      const say = yazi(c, svg, 835, y + 10, String(s.n), { size: 32, kalin: 700 });
      gizle(m.g, cek.g, ad, iyon, say);
      return { m, cek, ad, iyon, say };
    });
    const [Na, Mg, Ca, Al] = satirlar;
    const tablo = [baslik, ...satirlar.flatMap((r) => [r.ad, r.iyon, r.say])];
    gezdir(c, satirlar.map((r) => r.m), () => satirlar.forEach((r) => r.cek.guncelle()));

    // Sağ taraf: elektron denizi ve metalik bağ (tablo soluklaşınca açılır).
    const sag = { arti: yazi(c, svg, 700, 170, 'artı iyonlar', { size: 34, kalin: 700, renk: RENK.arti }), deniz: yazi(c, svg, 700, 322, 'elektron denizi', { size: 34, kalin: 700, renk: RENK.eksi }) };
    const bag = c.S('g', {}, svg);
    ok(c, bag, [700, 192], [700, 238], RENK.cekme, 5); ok(c, bag, [700, 282], [700, 236], RENK.cekme, 5);
    yazi(c, bag, 732, 244, 'metalik bağ', { hiza: 'start', size: 28, kalin: 700, renk: RENK.cekme });
    gizle(sag.arti, sag.deniz, bag);

    // Anlat: sodyum, magnezyum, kalsiyum (elektron sayısı yükü belirler).
    await par(c.say('Sodyumda her atom bir elektron bıraktı: iyon Na<sup>+</sup>.', { speak: 'Sodyumda her atom bir elektron bıraktı: sodyum iyonu.' }),
      belir(c, [baslik, Na.m.g, Na.ad, Na.iyon, Na.say], 500));
    Mg.m.dagit(0);
    await par(c.say('Magnezyum atomunun iki valans elektronu vardır.'), belir(c, [Mg.m.g, Mg.ad], 500));
    await par(c.say('İkisini de bırakır: iyon Mg<sup>2+</sup>, iyon başına iki serbest elektron.', { speak: 'İkisini de bırakır: magnezyum iyonu; iyon başına iki serbest elektron.' }),
      c.tween(1700, (e) => Mg.m.dagit(e)), belir(c, [Mg.iyon, Mg.say], 600));
    await par(c.say('Kalsiyum da iki valans elektronunu bırakır ve Ca<sup>2+</sup> olur.', { speak: 'Kalsiyum da iki valans elektronunu bırakır ve kalsiyum iyonu olur.' }),
      belir(c, [Ca.m.g, Ca.ad, Ca.iyon, Ca.say], 600));

    // Birlikte çöz: alüminyum satırında elektron sayısı eksik.
    gizle(Al.m.elektronlar.map((e) => e.el)); Al.say.textContent = '?'; Al.say.style.fill = RENK.vurgu;
    c.clearSay();
    await belir(c, [Al.m.g, Al.ad, Al.iyon, Al.say], 600);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Alüminyum iyonunun yükü 3+. Son satırı sen tamamla: her atom kaç valans elektronu bırakmıştır?',
      options: ['3', '1', '2'], answer: 0,
      hints: ['', 'Na<sup>+</sup> bir, Mg<sup>2+</sup> iki elektron bırakmıştı.', 'Yük 3+; iki elektron yetmez.'],
      right: 'Evet. Yük, bırakılan elektron sayısına eşittir.',
    });
    Al.say.textContent = '3'; Al.say.style.fill = RENK.yazi;
    await par(c.say('Alüminyum atomu üç valans elektronu bırakır.'), belir(c, Al.m.elektronlar.map((e) => e.el), 600));

    // Sor: dört metalde değişmeyen nedir?
    await c.say('Bırakılan elektron sayısı değişiyor; peki değişmeyen ne?', { speak: '[curious] Bırakılan elektron sayısı değişiyor; peki değişmeyen ne?' });
    await c.choice({
      tag: 'Sıra sende', q: 'Dört metalde de aynı kalan nedir?',
      options: ['Her atom tek elektron bırakır', 'Çekim, artı iyonlarla serbest elektronlar arasındadır', 'Elektronlar kendi atomunun yanında kalır'], answer: 1,
      hints: ['Bırakılan elektron sayısı metalden metale değişti.', '', 'Elektronlar atomlarından ayrılıp dolaşıyordu.'],
      right: 'Evet. Dört metalde de aynı çekim var.',
    });
    await par(c.say('Dördünde de artı iyonlar, aralarında dolaşan eksi elektronları çeker.'), belir(c, satirlar.map((r) => r.cek.g), 600));
    await par(c.say('Serbest dolaşan valans elektronlarının tümüne elektron denizi denir.'),
      belir(c, tablo, 500, 0), belir(c, deniz, 600), belir(c, sag.deniz, 600), belir(c, satirlar.map((r) => r.cek.g), 600, 0.35));
    await par(c.say('Artı yüklü metal iyonlarıyla elektron denizi arasındaki çekim, metalik bağdır.'), belir(c, [sag.arti, bag], 700));
    c.note('<b>Metalik bağ:</b> artı iyonlar ile elektron denizi arasındaki çekim. Örnek: Na<sup>+</sup>.', 'Metalik bağ', 'metalik-bag');
  }

  /* ---- 4. Hangi metalde bağ daha kuvvetli? ---- */
  async function kuvvet(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [
      { iyon: 'Na^{+}', k: 1, bar: 70 }, { iyon: 'Mg^{2+}', k: 2, bar: 150 }, { iyon: 'Al^{3+}', k: 3, bar: 230 },
    ];
    const kutular = KUTU.map((s, i) => {
      const x = 40 + i * 315;
      const kenar = c.S('rect', { x, y: 60, width: 290, height: 330, rx: 14, fill: '#18213f', stroke: '#33437f', 'stroke-width': 2.5 }, svg);
      const ad = yazi(c, svg, x + 145, 108, s.iyon, { size: 34, kalin: 700, math: true });
      const m = kur(c, svg, { x: x + 22, y: 130, w: 246, h: 240, sutun: 3, satir: 3, r: 22, yukSayisi: s.k, tohum: 21 + i * 5, re: 6, dagit: 1 });
      artilar(c, m, 6);
      const cek = cekim(c, svg, m, s.k);
      const b = cubuk(c, svg, x + 25, 436, RENK.cekme, { h: 20 });
      gizle(kenar, ad, m.g, cek.g);
      return { x, kenar, ad, m, cek, b, bar: s.bar };
    });
    const [Na, Mg, Al] = kutular;
    const ad = yazi(c, svg, 500, 506, 'metalik bağın kuvveti', { size: 24, kalin: 500, renk: RENK.soluk });
    gizle(ad);
    const vurgula = (k, a) => { k.kenar.style.stroke = a ? RENK.vurgu : '#33437f'; k.kenar.style.strokeWidth = a ? 4 : 2.5; };
    const kutuAc = (k, ms = 550) => belir(c, [k.kenar, k.ad, k.m.g], ms);

    await par(c.say('Metalik bağın kuvveti her metalde aynı değildir.'), kutuAc(Na), kutuAc(Mg));
    await par(c.say('İyonun yükü büyüdükçe elektronları daha kuvvetli çeker.'), belir(c, [Na.cek.g, Mg.cek.g], 600));
    await par(c.say('Serbest elektron sayısı arttıkça çekilen elektron da çoğalır.'), (async () => {
      const el = [Na, Mg].flatMap((k) => k.m.elektronlar.map((e) => e.el));
      await c.tween(450, (e) => el.forEach((x) => x.setAttribute('r', 6 + 3 * e)));
      await c.tween(450, (e) => el.forEach((x) => x.setAttribute('r', 9 - 3 * e)));
    })());
    vurgula(Na, true);
    await c.say('Sodyumda iyon yükü 1+, iyon başına bir serbest elektron var.', { speak: 'Sodyumda iyon yükü bir artı, iyon başına bir serbest elektron var.' });
    vurgula(Na, false); vurgula(Mg, true);
    await c.say('Magnezyumda iyon yükü 2+, iyon başına iki serbest elektron var.', { speak: 'Magnezyumda iyon yükü iki artı, iyon başına iki serbest elektron var.' });
    await par(c.say('Bu yüzden magnezyumda metalik bağ sodyumdakinden kuvvetlidir.'), belir(c, ad, 450),
      c.tween(900, (e) => { Na.b.boy(Na.bar * e); Mg.b.boy(Mg.bar * e); }));
    vurgula(Mg, false);

    // Sor: alüminyum, yeni durum.
    c.clearSay();
    await kutuAc(Al, 600);
    await c.choice({
      tag: 'Sıra sende', q: 'Magnezyum (Mg<sup>2+</sup>) ile alüminyumu (Al<sup>3+</sup>) karşılaştır. Hangisinde metalik bağ daha kuvvetlidir?',
      options: ['Magnezyum', 'Alüminyum', 'İkisinde eşittir'], answer: 1,
      hints: ['Yük ve serbest elektron sayısı hangisinde büyük?', '', 'Yükler farklı: 2+ ve 3+.'],
      right: 'Evet. Yükü ve serbest elektron sayısı daha büyük olan, daha kuvvetli.',
    });
    vurgula(Al, true);
    await par(c.say('Alüminyumda yük 3+, iyon başına üç elektron: bağ en kuvvetli.', { speak: 'Alüminyumda yük üç artı, iyon başına üç elektron: bağ en kuvvetli.' }),
      belir(c, Al.cek.g, 700), c.tween(900, (e) => Al.b.boy(Al.bar * e)));
    vurgula(Al, false);
    c.note('<b>Yük ve serbest elektron arttıkça bağ kuvvetlenir.</b> Na < Mg < Al.', 'Metalik bağın kuvveti', 'bag-kuvveti');
  }

  /* ---- 5. Yanlışı bul ---- */
  async function yanlisiBul(c) {
    const svg = c.svg(1000, 562);
    const KART = [
      { harf: 'A', satir: ['Metalik bağ, metal atomunun', 'çekirdeği ile kendi valans', 'elektronları arasında oluşur.'], dogru: false,
        hint: 'Valans elektronları atomlarından ayrılıp dolaşır.', right: 'Yanlış. Valans elektronları atomdan ayrılmıştır; bütün iyonlarca çekilir.' },
      { harf: 'B', satir: ['Metal katyonları ile serbest', 'valans elektronları arasında', 'oluşur.'], dogru: true,
        hint: 'Bu, tanımın kendisi: artı iyonlar ile elektron denizi.', right: 'Doğru. Tanımın kendisi.' },
      { harf: 'C', satir: ['Yalnızca farklı metal atomları', 'arasında oluşur.'], dogru: false,
        hint: 'Saf sodyum metalini düşün: bütün atomlar aynı.', right: 'Yanlış. Sodyum metalinde bütün atomlar sodyumdu; bağ yine kuruldu.' },
      { harf: 'D', satir: ['Metal atomları arasında', 'elektronların ortak', 'kullanılmasıyla oluşur.'], dogru: false,
        hint: 'Elektronlar iki atomla sınırlı kalmıyor.', right: 'Yanlış. Elektronlar iki atomun arasında kalmaz; bütün iyonların arasında dolaşır.' },
    ];
    const kartlar = c.S('g', {}, svg);
    const yerler = [[30, 50], [520, 50], [30, 300], [520, 300]];
    const ks = KART.map((k, i) => {
      const [x, y] = yerler[i], g = c.S('g', {}, kartlar);
      c.S('rect', { x, y, width: 450, height: 200, rx: 18, fill: RENK.yuzey, stroke: RENK.kenarlik, 'stroke-width': 2.5 }, g);
      c.S('circle', { cx: x + 40, cy: y + 42, r: 22, fill: RENK.kenarlik }, g);
      yazi(c, g, x + 40, y + 50, k.harf, { size: 24, kalin: 700 });
      const metin = c.S('g', {}, g);
      k.satir.forEach((s, j) => yazi(c, metin, x + 82, y + 78 + j * 36, s, { hiza: 'start', size: 22, kalin: 500 }));
      gizle(metin);
      const mark = isaret(c, g, x + 410, y + 40, k.dogru ? 'ok' : 'no', 17);
      gizle(mark);
      return { metin, mark };
    });

    await c.say('Dört öğrenci metalik bağı anlatıyor; hepsi doğru söylemiyor.');
    await c.say('Tanımı hatırla: artı metal iyonları ile elektron denizi arasındaki çekim.');
    for (let i = 0; i < KART.length; i++) {
      const k = KART[i];
      await belir(c, ks[i].metin, 450);
      await c.choice({
        tag: 'Yanlışı bul', q: `${k.harf} öğrencisinin söylediği doğru mu?`,
        options: ['Doğru', 'Yanlış'], answer: k.dogru ? 0 : 1,
        hints: k.dogru ? ['', k.hint] : [k.hint, ''], right: k.right,
      });
      await par(belir(c, ks[i].metin, 350, 0.12), belir(c, ks[i].mark, 350));
    }

    // Kapanış: elektronlar tek bir atoma değil, ortak denize aittir.
    c.clearSay();
    await c.wait(500);
    await belir(c, kartlar, 450, 0);
    const deniz = c.S('rect', { x: 250, y: 60, width: 500, height: 360, rx: 26, fill: RENK.eksi, 'fill-opacity': 0.08, stroke: RENK.eksi, 'stroke-opacity': 0.5, 'stroke-width': 2, 'stroke-dasharray': '6 6' }, svg);
    const m = kur(c, svg, { x: 280, y: 85, w: 440, h: 310, sutun: 4, satir: 3, r: 28, yukSayisi: 1, tohum: 9, re: 7, dagit: 1 });
    artilar(c, m, 7);
    const ad = yazi(c, svg, 500, 480, 'ortak elektron denizi', { size: 28, kalin: 700, renk: RENK.eksi });
    gizle(deniz, m.g, ad);
    gezdir(c, [m]);
    await par(c.say('Metalde elektronlar tek bir atoma ait değildir; hepsi ortak bir denizdedir.', { speak: 'Metalde elektronlar tek bir atoma ait değildir; [short pause] hepsi ortak bir denizdedir.' }),
      belir(c, [deniz, m.g, ad], 600));
  }

  Ders.start({
    id: 'cesitlilik-a2', kicker: 'Konu A · Metalik bağ', title: 'Metalik bağ: artı iyonlar ve elektron denizi', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Metalik bağ: artı iyonlar ve elektron denizi',
      hook: 'Bir bakır telin içinde sayısız atomu birbirine ne bağlar?',
      button: 'Derse başla ›',
    },
    goals: ['Metal atomlarının valans elektronlarını bırakıp artı iyona dönüştüğünü açıklar.', 'Metalik bağı, artı metal iyonları ile elektron denizi arasındaki çekim olarak tanımlar.', 'İyon yükü ve serbest elektron sayısı arttıkça metalik bağın kuvvetlendiğini söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'İtme, çekme ve bağın dengesini hatırla.', run: hatirla },
      { title: 'Metal atomu elektronunu bırakır', goal: 'Valans elektronunun atomdan ayrılıp serbest dolaştığını gör.', run: birak },
      { title: 'Dört metal, tek örüntü', goal: 'Dört metalde iyonu, serbest elektron sayısını ve ortak çekimi bul.', run: dortMetal },
      { title: 'Hangi metalde bağ daha kuvvetli?', goal: 'Yük ve elektron sayısı arttıkça bağın nasıl değiştiğini gör.', run: kuvvet },
      { title: 'Yanlışı bul', goal: 'Metalik bağ hakkındaki yanlış ifadeleri bul.', run: yanlisiBul },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Metalik bağ hangi tanecikler arasındaki çekimdir?',
        options: ['Metal atomlarının çekirdekleri ile kendi iç elektronları', 'Artı metal iyonları ile serbest valans elektronları', 'Artı iyonlar ile eksi iyonlar'], answer: 1,
        why: ['İç elektronlar atomda kalır; bağı kuran çekim bu değildir.', 'Metalik bağ, artı iyonlarla serbest valans elektronları arasındadır.', 'Eksi yüklü olanlar iyon değil, serbest elektronlardır.'], scene: 2 },
      { q: 'Potasyumun bir, kalsiyumun iki valans elektronu vardır. Hangisinde metalik bağ daha kuvvetlidir?',
        options: ['Kalsiyum', 'Potasyum', 'İkisinde eşittir'], answer: 0,
        why: ['Kalsiyumda yük 2+ ve iyon başına iki serbest elektron var.', 'Potasyumda yük 1+; serbest elektron daha az.', 'Yük ve serbest elektron sayısı farklı olduğundan bağ kuvveti de farklıdır.'], scene: 3 },
      { q: 'Bir metal parçasında valans elektronları için hangisi doğrudur?',
        options: ['Her biri kendi atomunun çevresinde kalır', 'İki komşu atomun arasında sabit dururlar', 'Bütün iyonların arasında serbestçe dolaşırlar'], answer: 2,
        why: ['Valans elektronları atomlarından ayrılmıştır.', 'Elektronlar iki atomla sınırlı kalmaz.', 'Ayrılan elektronlar bütün iyonların arasında dolaşır.'], scene: 1 },
      { q: 'Lityum atomunun bir valans elektronu vardır. Lityum metalinde hangi iyon bulunur?',
        options: ['Li<sup>2+</sup>', 'Li<sup>−</sup>', 'Li<sup>+</sup>'], answer: 2,
        why: ['Yük, bırakılan elektron sayısına eşittir; lityum bir elektron bırakır.', 'Elektron bırakan atom artı yüklenir, eksi değil.', 'Bir eksi yüklü elektron giden atom 1+ yüklü olur.'], scene: 2 },
      { q: 'Elektron denizini hangi elektronlar oluşturur?',
        options: ['Atomlardan ayrılan valans elektronları', 'Çekirdeğe en yakın elektronlar', 'Atomların bütün elektronları'], answer: 0,
        why: ['Valans elektronları atomlarından ayrılıp serbest dolaşır.', 'Bu elektronlar atomda kalır.', 'Yalnızca valans elektronları serbest kalır.'], scene: 2 },
    ],
    summary: ['Metal atomları valans elektronlarını bırakır, artı iyona dönüşür.', 'Serbest elektronların tümü elektron denizidir.', '<b>Metali, artı iyonlarla elektron denizinin çekimi bir arada tutar.</b>', 'Yük ve serbest elektron arttıkça bağ kuvvetlenir.'],
    nextLesson: { href: 'a3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
