/* C4 · FİZ.9.2.3 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/C-vektorler.md ("## C4")
   Yazar notu: içerik MEB Fizik 9 s. 60, 61, 72, 75 ve 122'den. Öğrenciye kitap ya da sayfa anılmaz.
   Renk: birinci vektör RENK.a, ikinci vektör RENK.b, bileşke RENK.r. Vektörün adı üstü oklu harfle,
   büyüklüğü (R = 100 N) oksuz yazılır. "Sıfır vektör" terimi kullanılmaz; iki boyutta toplama anlatılmaz.
   Senaryodaki iki kaydırıcılı "dene" (halat, bot) "tahmin et → gör" dizisiyle kuruldu. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, yol, belir, sol, kaybol, kay, par, ok, okCiz, okGit, yonGulu, izgara, insan } = KIT;
  const { lerp, ease } = Ders;
  const N = (v) => v + ' N';

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
  /* Kareli düzlemde etiketli ok. Gizli doğar, ciz() ile çizilir; etiket oku izler.
     o.yan: 1 okun solunda (doğuya bakan okta üstte), -1 sağında; o.yer: 'bas' başlangıcın ötesinde. */
  function vek(c, iz, kat, i, j, di, dj, o = {}) {
    const v = iz.vektor(i, j, di, dj, { renk: o.renk, kalin: o.kalin, uc: o.uc, katman: kat });
    v.renk = o.renk || RENK.a;
    if (o.ad) {
      const s = o.size || 26, yarim = o.ad.length * s * 0.27, koy0 = v.koy;
      v.ad = c.S('g', {}, kat);
      yazi(c, v.ad, 0, 0, o.ad, { size: s, renk: v.renk });
      const yerlestir = () => {
        const [a, b] = iz.P(v.i, v.j), [d, e] = iz.P(v.i + v.di, v.j + v.dj), L = Math.hypot(d - a, e - b) || 1, ux = (d - a) / L, uy = (e - b) / L;
        const yan = o.yan == null ? 1 : o.yan;
        const x = o.yer === 'bas' ? a - ux * (12 + yarim) : (a + d) / 2 + uy * 24 * yan, y = o.yer === 'bas' ? b - uy * 22 : (b + e) / 2 - ux * 24 * yan;
        v.ad.setAttribute('transform', `translate(${x} ${y + s * 0.35})`);
      };
      v.koy = (...args) => { koy0(...args); yerlestir(); };
      yerlestir();
    }
    v.style.opacity = 0; if (v.ad) v.ad.style.opacity = 0;
    return v;
  }
  const ciz = (c, v, ms = 600) => { v.style.opacity = 1; return par(okCiz(c, v, ms), v.ad ? belir(c, v.ad, ms) : []); };
  /* Oku dönmeden kaydırır (KIT.izgara.tasi); eski yerinde soluk izi kalır. */
  async function tasi(c, iz, v, i2, j2, ms = 1000) {
    const golge = iz.vektor(v.i, v.j, v.di, v.dj, { renk: v.renk, kalin: 4, uc: 14, katman: v.parentNode });
    golge.style.opacity = 0.3; v.parentNode.insertBefore(golge, v);
    await iz.tasi(c, v, i2, j2, { ms });
    return golge;
  }
  const nokta = (c, iz, kat, i, j, bos) => { const [x, y] = iz.P(i, j); return c.S('circle', { cx: x, cy: y, r: bos ? 9 : 7, fill: bos ? 'none' : RENK.vurgu, stroke: RENK.vurgu, 'stroke-width': 3 }, kat); };
  const kilavuz = (c, iz, kat, i1, j1, i2, j2) => { const [a, b] = iz.P(i1, j1), [d, e] = iz.P(i2, j2); return cizgi(c, kat, a, b, d, e, { renk: RENK.soluk, kalin: 2, kesik: '5 6' }); };
  /* Bir noktayı köşeden köşeye yürütür. */
  const gez = (c, iz, el, yer, ms = 1600) => c.tween(ms, (e, t) => {
    const k = Math.min(yer.length - 2, Math.floor(t * (yer.length - 1))), f = t * (yer.length - 1) - k;
    const [a, b] = iz.P(...yer[k]), [d, g] = iz.P(...yer[k + 1]);
    el.setAttribute('cx', lerp(a, d, f)); el.setAttribute('cy', lerp(b, g, f));
  }, ease.linear);
  const yanSon = (c, els, ms = 1500) => c.tween(ms, (e, t) => { const o = 0.3 + 0.7 * Math.abs(Math.cos(t * Math.PI * 3)); [els].flat().forEach((x) => { x.style.opacity = o; }); }, ease.linear);
  const isaret = (c, p, x, y, dogru, s = 15) => yol(c, p, dogru ? `M ${x - s} ${y} L ${x - s * 0.3} ${y + s * 0.7} L ${x + s} ${y - s * 0.8}` : `M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`, { renk: dogru ? RENK.iyi : RENK.kotu, kalin: 5 });
  /* Karesiz tahtada etiketli ok; gizli doğar. Grup birlikte kaydırılabilir. */
  function duzOk(c, p, x1, y1, x2, y2, renk, ad, o = {}) {
    const g = c.S('g', {}, p);
    g.ok = ok(c, g, x1, y1, x2, y2, { renk });
    g.yazi = ad ? yazi(c, g, o.ax == null ? (x1 + x2) / 2 : o.ax, o.ay == null ? y1 - 16 : o.ay, ad, { size: 26, renk }) : null;
    g.style.opacity = 0;
    return g;
  }
  const okGoster = (c, d, ms = 500) => { d.style.opacity = 1; return par(okCiz(c, d.ok, ms), d.yazi ? belir(c, d.yazi, ms) : []); };
  /* Soru; doğru şık seçilince gor() tahtayı günceller ve bitmesi beklenir. */
  async function sor(c, o, gor) {
    let p = null;
    await c.choice({ ...o, onPick: (i, dogru) => { if (dogru && gor) p = gor(); } });
    if (p) await p;
  }

  /* ---- Derse özel çizimler ---- */
  function kanepe(c, p, x, y) {
    const g = c.S('g', {}, p), k = { renk: RENK.mor, fill: RENK.koyu };
    kutu(c, g, x - 80, y - 78, 160, 46, { ...k, rx: 12 });
    kutu(c, g, x - 92, y - 52, 24, 44, { ...k, rx: 8 }); kutu(c, g, x + 68, y - 52, 24, 44, { ...k, rx: 8 });
    kutu(c, g, x - 70, y - 40, 140, 30, { ...k, rx: 8 });
    cizgi(c, g, x - 66, y - 8, x - 66, y, { renk: RENK.mor, kalin: 5 }); cizgi(c, g, x + 66, y - 8, x + 66, y, { renk: RENK.mor, kalin: 5 });
    return g;
  }
  function sandik(c, p, x, y, w = 90) {
    const g = c.S('g', {}, p);
    kutu(c, g, x - w / 2, y - w, w, w, { renk: RENK.mor, rx: 6 });
    yol(c, g, `M ${x - w / 2 + 8} ${y - w + 8} L ${x + w / 2 - 8} ${y - 8} M ${x + w / 2 - 8} ${y - w + 8} L ${x - w / 2 + 8} ${y - 8}`, { renk: RENK.mor, kalin: 2 });
    return g;
  }
  /* Halat çekme: ip y yüksekliğinde, düğüm ortada. kayan: ip, düğüm, takımlar ve oklar (birlikte kayar). */
  function halat(c, p, y, xs) {
    const g = c.S('g', {}, p), zemin = y + 52;
    cizgi(c, g, 40, zemin, 960, zemin, { renk: RENK.cizgi, kalin: 3 });
    cizgi(c, g, 500, zemin - 16, 500, zemin + 20, { renk: RENK.yazi, kalin: 4 });
    const kayan = c.S('g', {}, g), kisiler = [];
    cizgi(c, kayan, xs[0] - 34, y - 2, 1034 - xs[0], y - 2, { renk: '#c9a36b', kalin: 5 });
    xs.forEach((x) => { kisiler.push([insan(c, kayan, x, zemin, { kol: 1 }), x, -1], [insan(c, kayan, 1000 - x, zemin, { kol: -1 }), 1000 - x, 1]); });
    c.S('circle', { cx: 500, cy: y - 2, r: 9, fill: RENK.vurgu }, kayan);
    /* Takımlar asılır: herkes kendi ayağı çevresinde geriye yatıp doğrulur; düğüm kıpırdamaz. */
    const asil = (ms = 3000) => c.tween(ms, (e, t) => {
      const a = 4 + 3 * Math.sin(t * Math.PI * 2 * Math.round(ms / 600));
      kisiler.forEach(([el, x, yon]) => el.setAttribute('transform', `rotate(${a * yon} ${x} ${zemin})`));
    }, ease.linear);
    return { g, kayan, zemin, asil };
  }
  /* Nehir, üstten görünüş; akış doğuya. bot grubuna çizilen oklar botla birlikte kayar. */
  function nehir(c, p, y0, h, bx) {
    const g = c.S('g', {}, p), by = y0 + h / 2;
    c.S('rect', { x: 0, y: y0, width: 1000, height: h, fill: '#12294d' }, g);
    cizgi(c, g, 0, y0, 1000, y0, { renk: RENK.turkuaz, kalin: 3 }); cizgi(c, g, 0, y0 + h, 1000, y0 + h, { renk: RENK.turkuaz, kalin: 3 });
    const dalga = c.S('g', { opacity: 0.5 }, g);
    for (let k = 0; k < 26; k++) { const x = -900 + k * 76, y = y0 + 20 + ((k * 53) % (h - 40)); yol(c, dalga, `M ${x} ${y - 7} l 11 7 l -11 7`, { renk: RENK.turkuaz, kalin: 3 }); }
    let kayma = 0;
    const akis = (ms = 3000) => { const k0 = kayma, k1 = kayma + ms * 0.035; kayma = k1; return c.tween(ms, (e, t) => dalga.setAttribute('transform', `translate(${lerp(k0, k1, t)} 0)`), ease.linear); };
    const bot = c.S('g', {}, g);
    c.S('rect', { x: bx - 62, y: by - 28, width: 124, height: 56, rx: 26, fill: '#3a2a12', stroke: RENK.vurgu, 'stroke-width': 4 }, bot);
    [-30, 0, 30].forEach((dx) => [-1, 1].forEach((u) => {
      cizgi(c, bot, bx + dx, by + u * 14, bx + dx - 8, by + u * 42, { renk: RENK.yazi, kalin: 3 });
      c.S('circle', { cx: bx + dx, cy: by + u * 11, r: 7, fill: RENK.yazi }, bot);
    }));
    if (y0 > 60) { yazi(c, g, 60, y0 - 18, 'akıntı', { size: 24, renk: RENK.turkuaz, hiza: 'start' }); ok(c, g, 150, y0 - 26, 220, y0 - 26, { renk: RENK.turkuaz, kalin: 4, uc: 12 }); }
    return { g, bot, akis, bx, by };
  }

  /* ---- Sahne 1 · Kuvvetler nereye gitti? ---- */
  async function nereye(c) {
    const svg = c.svg(1000, 562), kn = c.S('g', {}, svg);
    kanepe(c, kn, 430, 210); kanepe(c, kn, 430, 440);
    const u60 = duzOk(c, kn, 160, 150, 310, 150, RENK.a, N(60)), u40 = duzOk(c, kn, 210, 195, 310, 195, RENK.b, N(40), { ay: 232 });
    const u100 = duzOk(c, kn, 660, 172, 910, 172, RENK.r, N(100));
    const a60 = duzOk(c, kn, 160, 400, 310, 400, RENK.a, N(60)), a40 = duzOk(c, kn, 650, 400, 550, 400, RENK.b, N(40));
    const a20 = duzOk(c, kn, 760, 400, 810, 400, RENK.r, N(20));
    await belir(c, kn);
    await c.say('Kuvvet vektörel bir niceliktir: sonucu yönü de belirler.');
    await par(okGoster(c, u60), okGoster(c, u40));
    await c.say('İki kişi bir kanepeyi doğuya 60 N ve 40 N ile itmişti.', { speak: 'İki kişi bir kanepeyi doğuya altmış newton ve kırk newton ile itmişti.' });
    await okGoster(c, u100, 700);
    await c.say('Kanepeye etki eden toplam kuvvet 100 N olmuştu.', { speak: 'Kanepeye etki eden toplam kuvvet yüz newton olmuştu.' });
    await par(okGoster(c, a60), okGoster(c, a40));
    await okGoster(c, a20);
    await c.say('40 N’lık kuvvet batıya dönünce toplam kuvvet 20 N’a inmişti.', { speak: 'Kırk newtonluk kuvvet batıya dönünce toplam kuvvet yirmi newtona inmişti.' });
    await c.say('Aynı iki kuvvet, yönler değişince başka bir sonuç verdi.');
    await kaybol(c, kn, 350);
    const h = halat(c, svg, 300, [130, 190, 250]);
    await belir(c, h.g);
    await c.say('Halat çekmede iki takım ipi zıt yönlere çeker.');
    await par(c.say('İki takım da var gücüyle çekiyor ama ip kıpırdamıyor.'), h.asil(3600));
    await c.choice({ tag: 'Tahmin et', q: 'İp kıpırdamadığına göre iki takımın kuvvetleri için ne söylenebilir?',
      options: ['Kuvvetler ortadan kalkmıştır', 'Bir takımın kuvveti ötekinden biraz büyüktür', 'Büyüklükleri eşit, yönleri zıttır'], answer: 2,
      hints: ['Kuvvetler yok olmaz; iki takım da çekmeyi sürdürüyor. Eşit büyüklükte ve zıt yönlü kuvvetler birbirinin etkisini götürür.',
        'Biri büyük olsaydı ip o takıma doğru giderdi. Kanepede 60 N’lık kuvvet 40 N’lık kuvveti yenmiş, kanepe doğuya gitmişti.', ''],
      right: 'Evet. Eşit ve zıt iki kuvvet ipi yerinde tutar.' });
    const o1 = ok(c, h.kayan, 500, 232, 700, 232, { renk: RENK.a }), o2 = ok(c, h.kayan, 500, 232, 300, 232, { renk: RENK.b });
    await par(okCiz(c, o1), okCiz(c, o2));
    await par(c.say('Kuvvetler bir yere gitmedi; birbirinin etkisini götürdü.'), h.asil(3000));
    await c.say('Bunu çizerek göstermek için vektörlerin nasıl toplandığına bakalım.');
  }

  /* ---- Sahne 2 · Bileşke vektör ---- */
  async function bileske(c) {
    const svg = c.svg(1000, 562), ust = c.S('g', {}, svg);
    cizgi(c, ust, 80, 250, 920, 250, { renk: RENK.cizgi, kalin: 3 });
    kanepe(c, ust, 660, 250);
    const iki = c.S('g', {}, ust);
    insan(c, iki, 270, 250, { kol: 1 }); insan(c, iki, 330, 250, { kol: 1 });
    const d60 = duzOk(c, iki, 380, 165, 560, 165, RENK.a, N(60)), d40 = duzOk(c, iki, 440, 205, 560, 205, RENK.b, N(40), { ay: 238 });
    await belir(c, ust);
    await par(okGoster(c, d60), okGoster(c, d40));
    await c.say('Kanepeyi iki kişi yerine tek kişi itseydi?', { speak: '[curious] Kanepeyi iki kişi yerine tek kişi itseydi?' });
    await kaybol(c, iki, 350);
    const tek = c.S('g', {}, ust);
    insan(c, tek, 200, 250, { kol: 1 });
    const d100 = duzOk(c, tek, 260, 190, 560, 190, RENK.r, N(100), { ay: 226 });
    await belir(c, tek);
    await okGoster(c, d100, 700);
    await c.say('Tek kişi doğuya 100 N ile itse aynı etkiyi yapardı.', { speak: 'Tek kişi doğuya yüz newton ile itse aynı etkiyi yapardı.' });
    await c.say('İki vektörün yaptığı etkiyi tek başına yapan vektöre <b>bileşke vektör</b> denir.');
    await belir(c, harf(c, tek, 410, 166, 'R', { renk: RENK.r, size: 32 }));
    await c.say('Bileşke vektör R harfiyle gösterilir.', { speak: 'Bileşke vektör re harfiyle gösterilir.' });
    await belir(c, esitlik(c, svg, 240, 410, [['R', RENK.r, 1], ['='], ['A', RENK.a, 1], ['+'], ['B', RENK.b, 1]], { size: 44 }));
    await c.say('Bileşkeyi bulmak için vektörler toplanır: R = A + B.', { speak: 'Bileşkeyi bulmak için vektörler toplanır: re eşittir a artı be.' });
    await c.say('Yalnızca aynı tür nicelikler toplanabilir.');
    const satir = (y, m, dogru) => { const g = c.S('g', {}, svg); yazi(c, g, 660, y, m, { size: 30 }); isaret(c, g, 840, y - 10, dogru); return g; };
    await belir(c, satir(350, 'kuvvet + kuvvet', true)); await belir(c, satir(415, 'hız + hız', true));
    await c.say('Kuvvet vektörü kuvvet vektörüyle, hız vektörü hız vektörüyle toplanır.');
    await belir(c, satir(480, 'hız + kuvvet', false));
    await c.say('Bir hız vektörü ile bir kuvvet vektörü toplanamaz.');
    await c.choice({ tag: 'Uygula', q: 'Rüzgârlı havada uçan bir uçak için hangi ikisi toplanabilir?',
      options: ['Uçağın hızı ile rüzgârın uyguladığı kuvvet', 'Motorun sağladığı hız ile rüzgârın sürükleme hızı', 'Motorun itme kuvveti ile rüzgârın sürükleme hızı'], answer: 1,
      hints: ['Biri hız, öteki kuvvet; farklı tür nicelikler toplanamaz. Toplanacak iki vektör aynı tür nicelik olmalıdır.', '', 'Biri kuvvet, öteki hız; bu ikisi de toplanamaz.'],
      right: 'Evet. İkisi de hız vektörüdür.' });
    await c.say('İkisi de hızdır; toplanınca uçağın o andaki hızını verir.');
    await c.say('Motorun ve rüzgârın uçağa uyguladığı itme kuvvetleri de kendi aralarında toplanabilir.');
    c.note('<b>Bileşke vektör (R): iki vektörün etkisini tek başına yapan vektör.</b><br>doğuya 60 N ve 40 N → bileşke doğuya 100 N', 'Bileşke vektör', 'bileske');
  }

  /* ---- Sahne 3 · Yönler aynıysa ---- */
  async function ayniYon(c) {
    const svg = c.svg(1000, 562), iz = izgara(c, svg, { kare: 56, y: 30, yon: true, olcek: '1 kare = 20 N' }), kat = c.S('g', {}, iz.g);
    await belir(c, iz.g);
    await c.say('Kanepeyi iten kuvvetleri kareli düzlemde çizelim; 1 kare = 20 N.', { speak: 'Kanepeyi iten kuvvetleri kareli düzlemde çizelim; bir kare yirmi newton.' });
    const A = vek(c, iz, kat, 4, 6, 3, 0, { renk: RENK.a, ad: N(60) });
    await ciz(c, A);
    await c.say('60 N’lık kuvvet doğuya bakan 3 karelik oktur.', { speak: 'Altmış newtonluk kuvvet doğuya bakan üç karelik oktur.' });
    const B = vek(c, iz, kat, 4, 3, 2, 0, { renk: RENK.b, ad: N(40) });
    await ciz(c, B);
    await c.say('40 N’lık kuvvet doğuya bakan 2 karelik oktur.', { speak: 'Kırk newtonluk kuvvet doğuya bakan iki karelik oktur.' });
    await par(c.say('İkinci oku, yönünü ve boyunu değiştirmeden birinci okun bittiği noktaya taşıyalım.'), tasi(c, iz, B, 7, 6, 1400));
    const uclar = [kilavuz(c, iz, kat, 4, 6, 4, 5), kilavuz(c, iz, kat, 9, 6, 9, 5), nokta(c, iz, kat, 4, 6), nokta(c, iz, kat, 9, 6, true)];
    const R = vek(c, iz, kat, 4, 5, 5, 0, { renk: RENK.r, ad: 'R = 100 N', yan: -1 });
    await belir(c, uclar, 300);
    R.style.opacity = 1;
    await par(c.say('Şimdi ilk okun başlangıcından son okun ucuna tek ok çizelim.'), okCiz(c, R, 1200));
    await belir(c, R.ad);
    await c.say('Bu ok bileşkedir: doğu yönünde 5 kare, yani 100 N.', { speak: 'Bu ok bileşkedir: doğu yönünde beş kare, yani yüz newton.' });
    await c.say('Yönler aynıysa büyüklükler toplanır; bileşke de aynı yöne bakar.', { speak: 'Yönler aynıysa [short pause] büyüklükler toplanır; bileşke de aynı yöne bakar.' });
    await kaybol(c, iz.g, 350);

    const nh = nehir(c, svg, 150, 270, 300), by = nh.by;
    const f50 = duzOk(c, nh.g, 380, by - 25, 530, by - 25, RENK.a, N(50)), f70 = duzOk(c, nh.g, 380, by + 25, 590, by + 25, RENK.b, N(70), { ay: by + 61 });
    await belir(c, nh.g);
    await okGoster(c, f50);
    await par(c.say('Bir nehirde akıntı, rafting botunu 50 N ile itiyor.', { speak: 'Bir nehirde akıntı, rafting botunu elli newton ile itiyor.' }), nh.akis(3600));
    await okGoster(c, f70);
    await par(c.say('Sporcular akıntıyla aynı yönde 70 N ile kürek çekiyor.', { speak: 'Sporcular akıntıyla aynı yönde yetmiş newton ile kürek çekiyor.' }), nh.akis(3600));
    const f120 = duzOk(c, nh.g, 380, by + 45, 740, by + 45, RENK.r, N(120), { ay: by + 81 });
    await sor(c, { tag: 'Uygula', q: 'Bota etki eden bileşke kuvvet hangisidir?',
      options: ['Akıntı yönünde 120 N', 'Akıntı yönünde 20 N', 'Akıntıya karşı 120 N'], answer: 0,
      hints: ['', 'Fark, kuvvetler zıt yönlüyken alınır. Burada ikisi de akıntı yönünde; büyüklükler toplanır: 50 N + 70 N.',
        'Büyüklük doğru ama yön yanlış. İki kuvvet de akıntı yönünde olduğu için bileşke de o yöndedir.'],
      right: 'Evet. İki kuvvet de akıntı yönünde.' }, async () => {
      await kay(c, f70, 0, 0, 150, -50, 800);
      await okGoster(c, f120, 800);
    });
    await par(c.say('İki kuvvet aynı yönde: 50 N + 70 N = 120 N.', { speak: 'İki kuvvet aynı yönde: elli newton artı yetmiş newton eşittir yüz yirmi newton.' }), nh.akis(4200));
    await par(c.say('Bileşke de akıntı yönündedir.'), nh.akis(2400));
    c.note('<b>Yönler aynıysa büyüklükler toplanır; bileşke aynı yöndedir.</b><br>60 N + 40 N = 100 N, doğu', 'Aynı yön', 'ayni-yon');
  }

  /* ---- Sahne 4 · Yönler zıtsa ---- */
  async function zitYon(c) {
    const svg = c.svg(1000, 562), iz = izgara(c, svg, { kare: 56, y: 30, yon: true, olcek: '1 kare = 20 N' }), kat = c.S('g', {}, iz.g);
    await belir(c, iz.g);
    await c.say('Şimdi kişilerden biri kanepeyi batıya doğru itsin.');
    const A = vek(c, iz, kat, 5, 6, 3, 0, { renk: RENK.a, ad: N(60) }), B = vek(c, iz, kat, 8, 3, -2, 0, { renk: RENK.b, ad: N(40), yer: 'bas' });
    await ciz(c, A); await ciz(c, B);
    await c.say('60 N’lık ok doğuya 3 kare, 40 N’lık ok batıya 2 kare.', { speak: 'Altmış newtonluk ok doğuya üç kare, kırk newtonluk ok batıya iki kare.' });
    await par(c.say('Yine ikinci oku birincinin bittiği noktaya taşıyalım.'), tasi(c, iz, B, 8, 5.5, 1300));
    await belir(c, kilavuz(c, iz, kat, 8, 6, 8, 5.5), 250);
    const gezen = nokta(c, iz, kat, 5, 6);
    await par(c.say('Birinci ok 3 kare ileri gitti; ikinci ok 2 kare geri döndü.', { speak: 'Birinci ok üç kare ileri gitti; ikinci ok iki kare geri döndü.' }), gez(c, iz, gezen, [[5, 6], [6.5, 6], [8, 6], [8, 5.5], [6, 5.5]], 3200));
    await kaybol(c, gezen, 250);
    const uclar = [kilavuz(c, iz, kat, 5, 6, 5, 5), kilavuz(c, iz, kat, 6, 5.5, 6, 5), nokta(c, iz, kat, 5, 6), nokta(c, iz, kat, 6, 5.5, true)];
    const R = vek(c, iz, kat, 5, 5, 1, 0, { renk: RENK.r, ad: 'R = 20 N', yan: -1 });
    await belir(c, uclar, 300);
    R.style.opacity = 1;
    await par(c.say('İlk başlangıçtan son uca çizilen ok doğuya bakan 1 karedir.', { speak: 'İlk başlangıçtan son uca çizilen ok doğuya bakan bir karedir.' }), okCiz(c, R, 900));
    await belir(c, R.ad);
    await c.say('Bileşke doğu yönünde 1 kare, yani 20 N’dır.', { speak: 'Bileşke doğu yönünde bir kare, yani yirmi newtondur.' });
    await c.say('60 N − 40 N = 20 N: büyüklükler bu kez çıkarıldı.', { speak: 'Altmış newton eksi kırk newton eşittir yirmi newton: büyüklükler bu kez çıkarıldı.' });
    await c.say('Yönler zıtsa bileşkenin büyüklüğü, büyüklüklerin farkı kadardır.', { speak: 'Yönler zıtsa bileşkenin büyüklüğü, [short pause] büyüklüklerin farkı kadardır.' });
    await c.say('Bileşkenin yönü, büyük olan vektörün yönüdür.');
    await kaybol(c, iz.g, 350);

    const nh = nehir(c, svg, 150, 270, 500), by = nh.by;
    const f50 = duzOk(c, nh.bot, 580, by, 730, by, RENK.a, N(50)), f70 = duzOk(c, nh.bot, 420, by, 210, by, RENK.b, N(70));
    await belir(c, nh.g);
    await okGoster(c, f50);
    await par(c.say('Nehirde akıntı botu yine 50 N ile itiyor.', { speak: 'Nehirde akıntı botu yine elli newton ile itiyor.' }), nh.akis(3000));
    await okGoster(c, f70);
    await par(c.say('Sporcular bu kez akıntıya karşı 70 N ile kürek çekiyor.', { speak: 'Sporcular bu kez akıntıya karşı yetmiş newton ile kürek çekiyor.' }), nh.akis(3600));
    const f20 = duzOk(c, nh.bot, 500, by + 75, 440, by + 75, RENK.r, N(20), { ay: by + 110 });
    await sor(c, { tag: 'Uygula', q: 'Bota etki eden bileşke kuvvet hangisidir?',
      options: ['Akıntı yönünde 20 N', 'Akıntıya karşı 20 N', 'Akıntıya karşı 120 N'], answer: 1,
      hints: ['Bileşke, ilk söylenen kuvvetin değil, büyük olan kuvvetin yönündedir. Kürek kuvveti (70 N) büyük olduğu için bileşke akıntıya karşıdır.', '',
        'Zıt yönlü kuvvetlerde büyüklükler toplanmaz, çıkarılır: 70 N − 50 N = 20 N.'],
      right: 'Evet. Bileşke kürek kuvvetinin yönünde.' }, async () => {
      await okGoster(c, f20, 600);
      await kay(c, nh.bot, 0, 0, -50, 0, 1200);
    });
    await par(c.say('Kürek kuvveti daha büyük: 70 N − 50 N = 20 N.', { speak: 'Kürek kuvveti daha büyük: yetmiş newton eksi elli newton eşittir yirmi newton.' }), nh.akis(3600));
    await par(c.say('Bileşke, büyük olan kürek kuvvetinin yönündedir: akıntıya karşı.'), nh.akis(3600));
    c.note('<b>Yönler zıtsa büyüklükler çıkarılır; bileşke büyük olanın yönündedir.</b><br>60 N − 40 N = 20 N, doğu', 'Zıt yön', 'zit-yon');
  }

  /* ---- Sahne 5 · Aynı iki kuvvet, iki ayrı bileşke ---- */
  async function ikiBileske(c) {
    const svg = c.svg(1000, 562), hat = c.S('g', {}, svg);
    const satir = (y, sonuc) => {
      const g = c.S('g', {}, hat);
      yazi(c, g, 290, y, N(30), { size: 40, renk: RENK.a }); yazi(c, g, 440, y, N(40), { size: 40, renk: RENK.b });
      ok(c, g, 530, y - 13, 620, y - 13, { renk: RENK.soluk, kalin: 4, uc: 14 });
      yazi(c, g, 720, y, sonuc, { size: 40, renk: RENK.r });
      return g;
    };
    await belir(c, satir(210, N(70)));
    await c.say('30 N ve 40 N’lık iki kuvvet bir kez 70 N etmişti.', { speak: 'Otuz newton ve kırk newtonluk iki kuvvet bir kez yetmiş newton etmişti.' });
    await belir(c, satir(340, N(10)));
    await c.say('Aynı iki kuvvet başka bir kez 10 N etmişti.', { speak: 'Aynı iki kuvvet başka bir kez on newton etmişti.' });
    await kaybol(c, hat, 350);
    const iz = izgara(c, svg, { kare: 56, y: 30, yon: true, olcek: '1 kare = 10 N' });
    let kat = c.S('g', {}, iz.g);
    await belir(c, iz.g);
    await c.say('Artık nedenini çizebiliriz; ölçek 1 kare = 10 N.', { speak: 'Artık nedenini çizebiliriz; ölçek bir kare on newton.' });
    const A1 = vek(c, iz, kat, 2, 7, 3, 0, { renk: RENK.a, ad: N(30) }), B1 = vek(c, iz, kat, 5, 7, 4, 0, { renk: RENK.b, ad: N(40) });
    const R1 = vek(c, iz, kat, 2, 6, 7, 0, { renk: RENK.r, ad: N(70), yan: -1 });
    await ciz(c, A1); await ciz(c, B1);
    await c.say('Kuvvetler aynı yöndeyse oklar art arda uzar: 3 kare, sonra 4 kare.', { speak: 'Kuvvetler aynı yöndeyse oklar art arda uzar: üç kare, sonra dört kare.' });
    await ciz(c, R1, 900);
    await c.say('Bileşke 7 kare, yani 70 N olur.', { speak: 'Bileşke yedi kare, yani yetmiş newton olur.' });
    await c.choice({ tag: 'Düşün', q: 'Aynı iki kuvvetin bileşkesi hangi durumda 10 N olur?',
      options: ['Hiçbir durumda; 30 N ile 40 N hep 70 N eder', 'Kuvvetler aynı yönlüyse', 'Kuvvetler zıt yönlüyse'], answer: 2,
      hints: ['Büyüklükler her durumda toplanmaz; önce yönlere bakılır. Zıt yönde 40 N − 30 N = 10 N olur.',
        'Aynı yönde büyüklükler toplanır ve 70 N çıkar. 10 N iki büyüklüğün farkıdır; fark zıt yönde alınır.', ''],
      right: 'Evet. Zıt yönde büyüklüklerin farkı kalır.' });
    const B2 = vek(c, iz, kat, 2, 4, 4, 0, { renk: RENK.b, ad: N(40) }), A2 = vek(c, iz, kat, 6, 3.5, -3, 0, { renk: RENK.a, ad: N(30), yer: 'bas' });
    const R2 = vek(c, iz, kat, 2, 3, 1, 0, { renk: RENK.r, ad: N(10), yan: -1 });
    await ciz(c, B2); await ciz(c, A2);
    await belir(c, [kilavuz(c, iz, kat, 6, 4, 6, 3.5), kilavuz(c, iz, kat, 3, 3.5, 3, 3), kilavuz(c, iz, kat, 2, 4, 2, 3)], 250);
    await par(c.say('Zıt yönde 4 kare ileri, 3 kare geri: bileşke 1 kare.', { speak: 'Zıt yönde dört kare ileri, üç kare geri: bileşke bir kare.' }), ciz(c, R2, 900));
    await c.say('Bileşke 10 N’dır ve 40 N’lık kuvvetin yönündedir.', { speak: 'Bileşke on newtondur ve kırk newtonluk kuvvetin yönündedir.' });
    await c.say('Bu bileşke, toplanan iki kuvvetin ikisinden de küçük.');
    await kaybol(c, kat, 350);
    kat = c.S('g', {}, iz.g);
    const A3 = vek(c, iz, kat, 2, 6, 9, 0, { renk: RENK.a, ad: N(90) }), B3 = vek(c, iz, kat, 11, 5.5, -6, 0, { renk: RENK.b, ad: N(60), yer: 'bas' });
    const R3 = vek(c, iz, kat, 2, 5, 3, 0, { renk: RENK.r, ad: N(30), yan: -1 });
    await ciz(c, A3); await ciz(c, B3);
    await sor(c, { tag: 'Uygula', q: 'Bir cisme doğuya 90 N ve batıya 60 N’lık iki kuvvet etki ediyor. Bileşke için hangisi doğrudur?',
      options: ['İki kuvvetin ikisinden de küçüktür', 'İki kuvvetin ikisinden de büyüktür', 'Büyük olan kuvvete eşittir'], answer: 0,
      hints: ['', 'Bileşke yalnızca yönler aynıyken ikisinden de büyük çıkar. Burada yönler zıt: 90 N − 60 N = 30 N.',
        'Küçük kuvvet, büyüğün etkisinin bir kısmını götürür. Geriye doğu yönünde 30 N kalır.'],
      right: 'Evet. 90 N − 60 N = 30 N kalır.' }, async () => {
      await belir(c, [kilavuz(c, iz, kat, 11, 6, 11, 5.5), kilavuz(c, iz, kat, 5, 5.5, 5, 5), kilavuz(c, iz, kat, 2, 6, 2, 5)], 250);
      await ciz(c, R3, 900);
    });
    await c.say('Bileşke doğu yönünde 30 N: 90 N’dan da 60 N’dan da küçük.', { speak: 'Bileşke doğu yönünde otuz newton: doksan newtondan da altmış newtondan da küçük.' });
    await c.say('Bileşkenin büyüklüğü yönlere bağlıdır; her zaman büyük çıkmaz.', { speak: '[thoughtful] Bileşkenin büyüklüğü yönlere bağlıdır; her zaman büyük çıkmaz.' });
  }

  /* ---- Sahne 6 · Eşit ve zıt: etkiler birbirini götürür ---- */
  async function esitZit(c) {
    const svg = c.svg(1000, 562), h = halat(c, svg, 150, [130, 185, 240]), gul = yonGulu(c, svg, 110, 370, { r: 26 });
    const iz = izgara(c, svg, { x: 200, y: 290, sutun: 12, satir: 3, olcek: '1 kare = 100 N' }), kat = c.S('g', {}, iz.g);
    /* Düğümden çıkan kuvvet oku: 100 N = 50 birim (1 kare). */
    const kuvvet = (renk, yon) => {
      const g = c.S('g', {}, h.kayan), o = ok(c, g, 500, 92, 500 + yon * 200, 92, { renk }), t = yazi(c, g, 500 + yon * 100, 74, N(400), { size: 26, renk });
      g.style.opacity = 0;
      return { g, o, t, git: (n, ms = 700) => { t.textContent = N(n); t.setAttribute('x', 500 + yon * n / 4); return okGit(c, o, 500, 92, 500 + yon * n / 2, 92, ms); } };
    };
    const sag = kuvvet(RENK.a, 1), solK = kuvvet(RENK.b, -1);
    const goster = (k) => { k.g.style.opacity = 1; return par(okCiz(c, k.o, 600), belir(c, k.t, 600)); };
    await belir(c, [h.g, gul, iz.g]);
    await c.say('Halat çekmeye dönelim; ölçek 1 kare = 100 N.', { speak: 'Halat çekmeye dönelim; ölçek bir kare yüz newton.' });
    await goster(sag);
    await c.say('Sağ takım ipi doğuya 400 N ile çekiyor.', { speak: 'Sağ takım ipi doğuya dört yüz newton ile çekiyor.' });
    await goster(solK);
    await c.say('Sol takım ipi batıya 400 N ile çekiyor.', { speak: 'Sol takım ipi batıya dört yüz newton ile çekiyor.' });
    const A = vek(c, iz, kat, 4, 2, 4, 0, { renk: RENK.a }), B = vek(c, iz, kat, 8, 1.5, -4, 0, { renk: RENK.b });
    const n1 = nokta(c, iz, kat, 4, 2), n2 = nokta(c, iz, kat, 4, 1.5, true);
    n1.style.opacity = 0; n2.style.opacity = 0;
    await belir(c, n1, 250);
    await ciz(c, A, 800);
    await belir(c, kilavuz(c, iz, kat, 8, 2, 8, 1.5), 200);
    await par(c.say('Okları art arda dizelim: 4 kare ileri, 4 kare geri.', { speak: 'Okları art arda dizelim: dört kare ileri, dört kare geri.' }), ciz(c, B, 1400));
    await belir(c, n2, 250);
    await par(c.say('Son uç tam başlangıç noktasına döndü.'), yanSon(c, [n1, n2], 2400));
    await c.say('Baştan sona çizilecek bir ok kalmadı.');
    await c.say('Büyüklükleri eşit, yönleri zıt iki kuvvet birbirinin etkisini götürür.');
    await par(c.say('Kuvvetler hâlâ oradadır ama ip olduğu yerde kalır.', { speak: '[thoughtful] Kuvvetler hâlâ oradadır ama ip olduğu yerde kalır.' }), h.asil(3600));
    await kaybol(c, iz.g, 350);

    // Dene: üç durum; önce tahmin, sonra ip.
    const maddeler = [
      { sol: 300, sag: 500, q: 'Sol takım batıya <b>300 N</b>, sağ takım doğuya <b>500 N</b> ile çekiyor. Bileşke hangisidir?',
        options: ['Doğu yönünde 800 N', 'Doğu yönünde 200 N', 'Batı yönünde 200 N'], answer: 1,
        hints: ['Takımlar zıt yönlere çekiyor; büyüklükler toplanmaz, çıkarılır.', '', 'Bileşke büyük olan kuvvetin, yani sağ takımın yönündedir: doğu.'],
        right: 'Evet. 500 N − 300 N = 200 N; ip doğuya kayar.' },
      { sol: 500, sag: 200, q: 'Sol takım batıya <b>500 N</b>, sağ takım doğuya <b>200 N</b> ile çekiyor. Bileşke hangisidir?',
        options: ['Doğu yönünde 300 N', 'Batı yönünde 300 N', 'Batı yönünde 700 N'], answer: 1,
        hints: ['Bileşke büyük olan kuvvetin, yani sol takımın yönündedir: batı.', '', 'Takımlar zıt yönlere çekiyor; büyüklükler toplanmaz, çıkarılır.'],
        right: 'Evet. 500 N − 200 N = 300 N; ip batıya kayar.' },
      { sol: 400, sag: 400, q: 'İki takım da <b>400 N</b> ile çekiyor: biri batıya, öteki doğuya. İp ne yapar?',
        options: ['Doğuya kayar', 'Batıya kayar', 'Yerinde kalır'], answer: 2,
        hints: ['Kuvvetler eşit; ipi doğuya çekecek fazladan kuvvet yok.', 'Kuvvetler eşit; ipi batıya çekecek fazladan kuvvet yok.', ''],
        right: 'Evet. Etkiler birbirini götürür; ip yerinde kalır.' },
    ];
    await c.say('Bileşkeyi tahmin et, sonra ipi izle.', { noWait: true });
    for (const m of maddeler) {
      await par(sag.git(m.sag), solK.git(m.sol));
      const fark = m.sag - m.sol, yon = Math.sign(fark);
      const r = duzOk(c, h.kayan, 500, 244, 500 + fark / 2, 244, RENK.r, 'R = ' + N(Math.abs(fark)), { ay: 282 });
      await sor(c, { tag: 'Tahmin et', q: m.q, options: m.options, answer: m.answer, hints: m.hints, right: m.right }, async () => {
        if (!fark) { await h.asil(2400); return; }
        await okGoster(c, r, 600);
        await kay(c, h.kayan, 0, 0, yon * 60, 0, 1400);
      });
      await c.wait(300);
      if (fark) { await kaybol(c, r, 250); await kay(c, h.kayan, yon * 60, 0, 0, 0, 500); } else r.remove();
    }
    await par(sag.git(500), solK.git(200));
    const r2 = duzOk(c, h.kayan, 500, 244, 350, 244, RENK.r, 'R = ' + N(300), { ay: 282 });
    await par(okGoster(c, r2, 500), kay(c, h.kayan, 0, 0, -60, 0, 1200));
    await c.say('Kuvveti büyük olan takım ipi kendi yönüne çekti.');
    await kaybol(c, r2, 250);
    await par(sag.git(400), solK.git(400), kay(c, h.kayan, -60, 0, 0, 0, 700));
    await par(c.say('Kuvvetler eşit olunca ip iki yana da gitmedi.'), h.asil(3000));
    await kaybol(c, [h.g, gul], 350);

    const sd = c.S('g', {}, svg);
    cizgi(c, sd, 150, 360, 850, 360, { renk: RENK.cizgi, kalin: 3 });
    sandik(c, sd, 500, 360, 100);
    insan(c, sd, 400, 360, { kol: 1 }); insan(c, sd, 600, 360, { kol: -1 });
    const s1 = duzOk(c, sd, 330, 220, 450, 220, RENK.a, N(80)), s2 = duzOk(c, sd, 670, 220, 550, 220, RENK.b, N(80));
    await belir(c, sd);
    await par(okGoster(c, s1), okGoster(c, s2));
    await c.choice({ tag: 'Uygula', q: 'Duran bir sandığı iki kişi zıt yönlerden 80 N’lık kuvvetlerle itiyor. Sandık için hangisi doğrudur?',
      options: ['Olduğu yerde kalır', 'İki kuvvet etki ettiği için mutlaka hareket eder', '160 N’lık bileşkeyle hareket eder'], answer: 0,
      hints: ['', 'Kuvvet olması hareket için yetmez; kuvvetlerin birlikte yaptığı etkiye bakılır. Eşit büyüklükte ve zıt yönlü iki kuvvet birbirinin etkisini götürür.',
        '160 N, kuvvetler aynı yönde olsaydı çıkardı. Zıt yönde büyüklükler çıkarılır ve geriye kuvvet kalmaz.'],
      right: 'Evet. Eşit ve zıt iki kuvvetin etkisi birbirini götürür.' });
    await c.say('İki kuvvet de sürüyor ama etkileri birbirini götürdüğü için sandık yerinde kalıyor.');
    c.note('<b>Eşit büyüklükte, zıt yönlü iki kuvvet birbirinin etkisini götürür.</b><br>doğuya 400 N, batıya 400 N → ip yerinde kalır', 'Eşit ve zıt', 'esit-zit');
  }

  /* ---- Sahne 7 · Baştan sona tek ok ---- */
  async function tekOk(c) {
    const svg = c.svg(1000, 562);
    let iz = izgara(c, svg, { kare: 56, y: 30 });
    const serit = (j, a, b, bx, ad) => {
      const g = c.S('g', {}, iz.g), son = 2 + a + b;
      const A = vek(c, iz, g, 2, j, a, 0, { renk: RENK.a }), B = vek(c, iz, g, bx, j - (b < 0 ? 0.4 : 0), b, 0, { renk: RENK.b });
      const R = son > 2 ? vek(c, iz, g, 2, j - (b < 0 ? 0.8 : 0.5), son - 2, 0, { renk: RENK.r }) : null;
      const n1 = nokta(c, iz, g, 2, j), n2 = nokta(c, iz, g, son, j - (b < 0 ? 0.4 : 0), true);
      n2.style.opacity = 0;
      A.style.opacity = 1; B.style.opacity = 1;
      yazi(c, g, iz.P(10.6, j)[0], iz.P(0, j - 0.3)[1] + 9, ad, { size: 26, renk: RENK.soluk, hiza: 'start' });
      return { g, A, B, R, n1, n2, bx: 2 + a };
    };
    const ser = [serit(7, 3, 2, 6.2, 'yönler aynı'), serit(4.7, 3, -2, 7.4, 'yönler zıt'), serit(2.3, 4, -4, 8.6, 'eşit ve zıt')];
    await belir(c, iz.g);
    await c.say('Üç durumda da aynı iki adımı attık.');
    await par(c.say('Önce ikinci oku, birinci okun bittiği noktaya taşıdık.'), ...ser.map((s) => iz.tasi(c, s.B, s.bx, s.B.j, { ms: 1400 })));
    await belir(c, ser.map((s) => s.n2), 250);
    ser.forEach((s) => { if (s.R) s.R.style.opacity = 1; });
    await par(c.say('Sonra ilk başlangıçtan son uca tek bir ok çizdik.'), ...ser.filter((s) => s.R).map((s) => okCiz(c, s.R, 1200)));
    const vurgula = (k) => par(ser.map((s, i) => sol(c, s.g, i === k || k < 0 ? 1 : 0.25, 300)));
    await vurgula(0);
    await c.say('Yönler aynıyken bu ok uzadı: büyüklükler toplandı.');
    await vurgula(1);
    await c.say('Yönler zıtken bu ok kısaldı: büyüklükler çıkarıldı.');
    await vurgula(2);
    await par(c.say('Son uç başlangıca dönünce iki etki birbirini götürdü.'), yanSon(c, [ser[2].n1, ser[2].n2], 2400));
    await vurgula(-1);
    await c.say('Aynı doğrultudaki iki vektör hep bu yolla toplanır.');
    await kaybol(c, iz.g, 350);

    // Dene: akıntı sabit (50 N, doğu); kürek kuvveti değişir. 1 kare = 10 N, 1 N = 5 birim.
    const nh = nehir(c, svg, 30, 190, 400), by = nh.by;
    iz = izgara(c, svg, { x: 100, y: 260, satir: 4, olcek: '1 kare = 10 N' });
    const akinti = duzOk(c, nh.bot, 470, by - 18, 720, by - 18, RENK.a, 'akıntı 50 N');
    const kg = c.S('g', {}, nh.bot), ko = ok(c, kg, 470, by + 18, 620, by + 18, { renk: RENK.b }), kt = yazi(c, kg, 545, by + 54, 'kürek 30 N', { size: 26, renk: RENK.b });
    kg.style.opacity = 0;
    /* Kürek oku: akıntı yönündeyse botun önünden, akıntıya karşıysa arkasından çıkar. n yoksa yalnızca "kürek ?" yazar. */
    const kurek = async (n) => {
      if (+kg.style.opacity) await sol(c, kg, 0, 200);
      const x0 = n > 0 ? 470 : 330, y = n > 0 ? by + 18 : by;
      kt.textContent = n == null ? 'kürek ?' : 'kürek ' + N(Math.abs(n)); kt.setAttribute('x', n > 0 ? x0 + n * 2.5 : 322); kt.setAttribute('y', n > 0 ? by + 54 : by - 18); kt.setAttribute('text-anchor', n > 0 ? 'middle' : 'end');
      ko.ayarla(x0, y, x0 + (n || 0) * 5, y);
      kg.style.opacity = 1;
      await par(okCiz(c, ko, 600), belir(c, kt, 400));
    };
    await belir(c, [nh.g, iz.g]);
    await okGoster(c, akinti);
    /* Kareli düzlemde uç uca dizer ve bileşkeyi çizer; çizilen grubu döndürür. */
    const diz = async (n) => {
      const g = c.S('g', {}, iz.g), son = 2 + (50 + n) / 10;
      const A = vek(c, iz, g, 2, 3, 5, 0, { renk: RENK.a }), B = vek(c, iz, g, 7, n < 0 ? 2.5 : 3, n / 10, 0, { renk: RENK.b });
      await ciz(c, A, 500); await ciz(c, B, 600);
      if (son > 2) {
        await belir(c, [kilavuz(c, iz, g, 2, 3, 2, 2), kilavuz(c, iz, g, son, n < 0 ? 2.5 : 3, son, 2)], 200);
        await ciz(c, vek(c, iz, g, 2, 2, son - 2, 0, { renk: RENK.r, ad: 'R = ' + N(50 + n), yan: -1 }), 800);
      } else {
        const ns = [nokta(c, iz, g, 2, 3), nokta(c, iz, g, 2, 2.5, true)];
        await belir(c, ns, 250); await yanSon(c, ns, 1500);
      }
      return g;
    };
    const maddeler = [
      { n: 30, q: 'Kürek <b>akıntı yönünde 30 N</b>. Bota etki eden bileşke hangisidir?', options: ['Akıntı yönünde 20 N', 'Akıntı yönünde 80 N', 'Akıntıya karşı 80 N'], answer: 1,
        hints: ['Fark, kuvvetler zıt yönlüyken alınır; burada yönler aynı.', '', 'İki kuvvet de akıntı yönünde; bileşke de o yöndedir.'], right: 'Evet. 50 N + 30 N = 80 N, akıntı yönünde.' },
      { n: -20, q: 'Kürek <b>akıntıya karşı 20 N</b>. Bota etki eden bileşke hangisidir?', options: ['Akıntıya karşı 30 N', 'Akıntı yönünde 30 N', 'Akıntı yönünde 70 N'], answer: 1,
        hints: ['Kürek akıntıya karşı çekiliyor ama akıntı kuvveti daha büyük. Bileşke büyük olanın yönündedir: akıntı yönünde 30 N.', '', 'Kuvvetler zıt yönlü; büyüklükler toplanmaz, çıkarılır.'],
        right: 'Evet. 50 N − 20 N = 30 N, akıntı yönünde.' },
      { n: -50, gizli: true, q: 'Botu nehirde <b>sabit tutmak</b> için kürek kuvveti ne olmalı?', options: ['Akıntıya karşı 70 N', 'Akıntı yönünde 50 N', 'Akıntıya karşı 50 N'], answer: 2,
        hints: ['70 N akıntıyı yener; akıntıya karşı 20 N’lık bileşke kalır. Etkilerin birbirini götürmesi için kuvvetler eşit olmalıdır.', 'Aynı yönde büyüklükler toplanır; bot daha hızlı sürüklenir.', ''],
        right: 'Evet. Eşit ve zıt iki kuvvetin etkisi birbirini götürür.' },
    ];
    await c.say('Kürek kuvvetine bak; bileşkeyi tahmin et, sonra gör.', { noWait: true });
    for (const m of maddeler) {
      await kurek(m.gizli ? null : m.n);
      let g = null;
      await sor(c, { tag: 'Tahmin et', q: m.q, options: m.options, answer: m.answer, hints: m.hints, right: m.right }, async () => {
        if (m.gizli) await kurek(m.n);
        g = await diz(m.n);
        await par(nh.akis(1600), m.n === -50 ? [] : kay(c, nh.bot, 0, 0, 60, 0, 1600));
      });
      await c.wait(300);
      await par(kaybol(c, g, 250), kay(c, nh.bot, m.n === -50 ? 0 : 60, 0, 0, 0, 400));
    }
    await kurek(-20);
    await diz(-20);
    await par(c.say('Kürek akıntıya karşı çekildi ama bileşke akıntı yönünde kaldı.'), nh.akis(3600), kay(c, nh.bot, 0, 0, 60, 0, 3000));
    await par(c.say('Aynı yön toplar, zıt yön çıkarır; bileşke büyüğün yönündedir.'), nh.akis(3600));
    await kaybol(c, [nh.g, iz.g], 350);
    iz = izgara(c, svg, { kare: 56, y: 30, yon: true });
    const kat = c.S('g', {}, iz.g), D = vek(c, iz, kat, 6, 2, 4, 0, { renk: RENK.a }), K = vek(c, iz, kat, 6, 2, 0, 3, { renk: RENK.b });
    await belir(c, iz.g);
    await par(ciz(c, D), ciz(c, K));
    await c.say('Peki biri doğuya, öteki kuzeye bakan iki ok nasıl toplanır?', { speak: '[curious] Peki biri doğuya, öteki kuzeye bakan iki ok nasıl toplanır?' });
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c4', kicker: 'Konu C · Vektörler', title: 'Aynı doğrultuda iki vektör: bileşke', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Aynı doğrultuda iki vektör: bileşke', hook: 'Halat çekmede iki takım da var gücüyle çekiyor ama ip kıpırdamıyor; kuvvetler nereye gitti?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Kuvvetler nereye gitti?', goal: 'Kıpırdamayan ipteki kuvvetleri tahmin et.', run: nereye },
      { title: 'Bileşke vektör', goal: 'İki vektörün yerini tutan tek vektörü tanı.', run: bileske },
      { title: 'Yönler aynıysa', goal: 'Aynı yönlü iki vektörü topla.', run: ayniYon },
      { title: 'Yönler zıtsa', goal: 'Zıt yönlü iki vektörün bileşkesini bul.', run: zitYon },
      { title: 'Aynı iki kuvvet, iki ayrı bileşke', goal: 'Bileşkenin yönlere bağlı olduğunu gör.', run: ikiBileske },
      { title: 'Eşit ve zıt: etkiler birbirini götürür', goal: 'Eşit ve zıt iki kuvvetin sonucunu bul.', run: esitZit },
      { title: 'Baştan sona tek ok', goal: 'Üç durumu tek yolla topla.', run: tekOk },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir cisme batı yönünde 50 N ve doğu yönünde 80 N’lık iki kuvvet etki ediyor. Bileşke hangisidir?',
        options: ['Batı yönünde 30 N', 'Doğu yönünde 130 N', 'Doğu yönünde 30 N'], answer: 2,
        why: ['Bileşke ilk söylenen kuvvetin değil, büyük olan kuvvetin yönündedir: doğu.', 'Kuvvetler zıt yönlü; büyüklükler toplanmaz, çıkarılır.', 'Yönler zıt: 80 N − 50 N = 30 N; bileşke büyük olanın yönünde, doğudadır.'], scene: 3 },
      { q: 'Bileşke, toplanan iki vektörün ikisinden de küçük çıkabilir mi?',
        options: ['Hayır; bileşke her zaman ikisinden de büyüktür', 'Evet; vektörler zıt yönlüyse çıkabilir', 'Hayır; bileşke en az büyük olan vektör kadardır'], answer: 1,
        why: ['Bileşke yalnızca yönler aynıyken ikisinden de büyük çıkar.', '40 N ile 30 N zıt yönde 10 N, 90 N ile 60 N zıt yönde 30 N etmişti.', 'Zıt yönde küçük kuvvet büyüğün etkisinin bir kısmını götürür; bileşke büyük olandan küçük kalır.'], scene: 4 },
      { q: 'Bir sürgülü kapıya aynı doğrultuda iki kuvvet uygulanıyor; büyüklükleri 25 N ve 45 N. Bileşkenin büyüklüğü hangisi <b>olamaz</b>?',
        options: ['50 N', '20 N', '70 N'], answer: 0,
        why: ['Aynı yönde 25 N + 45 N = 70 N, zıt yönde 45 N − 25 N = 20 N çıkar. Başka bir değer çıkmaz.', 'Kuvvetler zıt yönlüyse bileşke 45 N − 25 N = 20 N olur; bu mümkündür.', 'Kuvvetler aynı yönlüyse bileşke 25 N + 45 N = 70 N olur; bu mümkündür.'], scene: 4 },
      { q: 'Bir tuğla, 40 N’lık eşit ve zıt iki kuvvetle itilirken kıpırdamıyor. Cem, “Kuvvetler yok oldu, tuğlaya artık kuvvet etki etmiyor” diyor. Doğru karşılık hangisidir?',
        options: ['Doğru; zıt yönlü iki kuvvet birbirini yok eder', 'Yanlış; kuvvetler sürer ve toplamları olan 80 N tuğlaya etki eder', 'Yanlış; kuvvetler sürer, yalnızca etkileri birbirini götürür'], answer: 2,
        why: ['Kuvvetler yok olmaz; iki kuvvet de etki etmeyi sürdürür.', '80 N, kuvvetler aynı yönde olsaydı çıkardı. Zıt yönde büyüklükler çıkarılır ve geriye kuvvet kalmaz.', 'Eşit büyüklükte, zıt yönlü iki kuvvet birbirinin etkisini götürür; tuğla yerinde kalır.'], scene: 5 },
    ],
    summary: ['<b>Aynı yön toplar, zıt yön çıkarır; bileşke büyüğün yönündedir.</b>', 'Bileşke vektör, iki vektörün etkisini tek başına yapan vektördür.', 'Eşit büyüklükte, zıt yönlü iki kuvvet birbirinin etkisini götürür.'],
    nextLesson: { href: 'c5-uc-uca-ekleme.html', label: 'Sonraki: Uç uca ekleme ›' },
  });
})();
