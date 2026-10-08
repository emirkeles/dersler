/* D1 · FİZ.9.2.5 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/D-dogadaki-temel-kuvvetler.md
   Yazar notu: içerik MEB Fizik 9 s. 86–91, 123, 124'ten. Öğrenciye kitap ya da sayfa anılmaz.
   Dört kuvvetin rengi D1 ve D2'de aynıdır: kütle çekim yeşil, elektromanyetik sarı, güçlü nükleer mor, zayıf nükleer turuncu.
   Çekirdek çizimlerinde proton kırmızı, nötron mavidir. Şiddet sıralaması, sayısal oran ve taşıyıcı parçacık yoktur. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, gizle, belir, sol, kaybol, par, ok, okCiz, kart, insan } = KIT;
  const { lerp, ease } = Ders;

  const KC = 'var(--c3)', EM = 'var(--c5)', GN = 'var(--c4)', ZN = 'var(--c2)';
  const KUVVET = [['kütle çekim', KC], ['elektromanyetik', EM], ['güçlü nükleer', GN], ['zayıf nükleer', ZN]];
  const PROTON = '#e5484d', NOTRON = '#4f8ef7', CELIK = '#c9d1e6', TAHTA = '#b98552', TEN = '#e0b089', GUNES = '#f6b93b';

  /* ---- Derse özel yardımcılar (D2'de de aynıları tanımlıdır) ---- */
  const yer = (g, x, y, s) => g.setAttribute('transform', `translate(${x} ${y})` + (s == null ? '' : ` scale(${s})`));
  const sira = async (...isler) => { for (const is of isler) await is(); };
  const acili = (x, y, r, a) => [x + r * Math.cos(a * Math.PI / 180), y + r * Math.sin(a * Math.PI / 180)];
  /* Henüz çizilmemiş ok: okCiz ile başlangıcından ucuna doğru büyür. */
  const yeniOk = (c, p, x1, y1, x2, y2, o) => { const g = ok(c, p, x1, y1, x2, y2, o); g.ayarla(x1, y1, x1, y1); g.uclar = [x1, y1, x2, y2]; return g; };
  const arti = (c, p, x, y, s = 9) => yol(c, p, `M ${x - s} ${y} L ${x + s} ${y} M ${x} ${y - s} L ${x} ${y + s}`, { renk: '#fff', kalin: Math.max(2, s * 0.4) });
  const eksi = (c, p, x, y, s = 9) => yol(c, p, `M ${x - s} ${y} L ${x + s} ${y}`, { renk: '#fff', kalin: Math.max(2, s * 0.4) });

  /* Çekirdek: n parçacıklı sıkı küme; proton kırmızı, nötron mavi. parcalar: [{ el, x, y, dx, dy, proton }], R: kümenin yarıçapı. */
  function cekirdek(c, p, x, y, o = {}) {
    const n = o.n || 7, r = o.r || 30, d = r * 1.9, g = c.S('g', {}, p);
    let yerler;
    if (n === 1) yerler = [[0, 0]];
    else if (n === 2) yerler = [[-d / 2, 0], [d / 2, 0]];
    else if (n === 4) yerler = [[-d / 2, -d / 2], [d / 2, -d / 2], [d / 2, d / 2], [-d / 2, d / 2]];
    else {
      yerler = [];
      for (let q = -6; q <= 6; q++) for (let s = -6; s <= 6; s++) yerler.push([d * (q + s / 2), d * s * 0.866]);
      const uz = (a) => Math.round(Math.hypot(a[0], a[1]) * 10);
      yerler.sort((a, b) => uz(a) - uz(b) || Math.atan2(a[1], a[0]) - Math.atan2(b[1], b[0]));
      yerler = yerler.slice(0, n);
    }
    const P = o.proton == null ? Math.floor(n / 2) : o.proton;
    const parcalar = yerler.map(([dx, dy], i) => {
      // Küçük kümede sırayla, büyük kümede dağınık: proton ve nötronlar şerit oluşturmasın.
      const proton = n > 19 ? (i * 29) % n < P : Math.floor((i + 1) * P / n) > Math.floor(i * P / n);
      const el = c.S('circle', { cx: x + dx, cy: y + dy, r, fill: proton ? PROTON : NOTRON, stroke: '#0c1226', 'stroke-width': Math.max(1.2, r * 0.08) }, g);
      return { el, x: x + dx, y: y + dy, dx, dy, proton };
    });
    return { g, parcalar, x, y, r, R: Math.max(...yerler.map((a) => Math.hypot(a[0], a[1]))) + r };
  }
  /* Çekirdeği saran, içe doğru oklar (bir arada tutma). */
  function icOklar(c, p, x, y, R, o = {}) {
    const n = o.n || 6, uz = o.uz || 70, bosluk = o.bosluk == null ? 12 : o.bosluk, bas = o.bas == null ? 30 : o.bas;
    return Array.from({ length: n }, (_, i) => {
      const a = bas + i * 360 / n, [x1, y1] = acili(x, y, R + bosluk + uz, a), [x2, y2] = acili(x, y, R + bosluk, a);
      return ok(c, p, x1, y1, x2, y2, { renk: o.renk || GN, kalin: o.kalin || 6, uc: o.uc || 16 });
    });
  }
  /* Çubuk mıknatıs: iki kutup iki tonla gösterilir. (x, y) merkez. */
  function miknatis(c, p, x, y, w, h, o = {}) {
    const g = c.S('g', {}, p), koyu = '#6b7694', acik = '#e8ecf5';
    c.S('rect', { x: x - w / 2, y: y - h / 2, width: w / 2, height: h, fill: o.ters ? acik : koyu }, g);
    c.S('rect', { x, y: y - h / 2, width: w / 2, height: h, fill: o.ters ? koyu : acik }, g);
    c.S('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 3, fill: 'none', stroke: acik, 'stroke-width': 2 }, g);
    return g;
  }
  function gunes(c, p, x, y, R) {
    return c.S('circle', { cx: x, cy: y, r: R, fill: GUNES, 'fill-opacity': 0.14, stroke: GUNES, 'stroke-width': 4 }, p);
  }
  /* Elma: merkez (0, 0), yarıçap 14. */
  function elmaCiz(c, p) {
    const g = c.S('g', {}, p);
    c.S('circle', { cx: 0, cy: 0, r: 14, fill: '#d9485f' }, g);
    yol(c, g, 'M 0 -13 Q 2 -20 7 -23', { renk: '#5a9e4b', kalin: 3 });
    return g;
  }
  function pusulaCiz(c, p, r) {
    const g = c.S('g', {}, p), ibre = c.S('g', {}, g);
    daire(c, g, 0, 0, r, { renk: RENK.yazi, fill: RENK.koyu });
    c.S('path', { d: `M 0 ${-r * 0.74} L ${r * 0.16} 0 L ${-r * 0.16} 0 Z`, fill: PROTON }, ibre);
    c.S('path', { d: `M 0 ${r * 0.74} L ${r * 0.16} 0 L ${-r * 0.16} 0 Z`, fill: CELIK }, ibre);
    g.appendChild(ibre);
    g.cevir = (a) => ibre.setAttribute('transform', `rotate(${a})`);
    return g;
  }

  /* ---- Sahne 1 · Kuvvet ne yapar? ---- */
  async function kuvvetNeYapar(c) {
    const svg = c.svg(1000, 562);
    const giris = c.S('g', {}, svg);
    cizgi(c, giris, 240, 332, 760, 332, { renk: RENK.ince });
    daire(c, giris, 350, 290, 40, { renk: RENK.yazi, fill: RENK.koyu, kalin: 4 });
    gizle(giris); await belir(c, giris);
    await c.say('Kuvvet vektörel bir niceliktir: büyüklüğü de yönü de vardır.');
    await okCiz(c, yeniOk(c, giris, 392, 290, 640, 290, { renk: RENK.a, kalin: 9, uc: 26 }), 700);
    await c.say('Bu yüzden kuvveti okla çizeriz; okun ucu yönü, boyu büyüklüğü gösterir.');
    const adlar = [yazi(c, giris, 510, 262, 'F', { size: 44, renk: RENK.a, kalin: 700 }), yazi(c, giris, 664, 302, 'newton (N)', { size: 30, hiza: 'start' })];
    gizle(adlar); await belir(c, adlar);
    await c.say('Kuvvetin sembolü F, birimi newtondur.', { speak: 'Kuvvetin sembolü fe, birimi newtondur.' });
    await kaybol(c, giris);

    // Altı küçük canlandırma: her biri kendi yuvasında oynar. Kuvvet oku her yerde aynı renktedir.
    const X = [180, 500, 820], Y = [140, 400], beyaz = { renk: RENK.yazi, fill: RENK.koyu, kalin: 3 };
    const mini = (i, kur) => {
      const cx = X[i % 3], cy = Y[Math.floor(i / 3)], gy = cy + 60, g = c.S('g', {}, svg);
      cizgi(c, g, cx - 135, gy, cx + 135, gy, { renk: RENK.ince });
      const m = { g, cx, cy, gy };
      m.oyna = kur(m); g.style.opacity = 0;
      return m;
    };
    const ayak = mini(0, ({ g, cx, gy }) => {
      const hx = cx - 78, hy = gy - 40, k = { renk: RENK.yazi, kalin: 4 };
      daire(c, g, hx, hy - 48, 11, k);
      yol(c, g, `M ${hx} ${hy - 37} L ${hx} ${hy} L ${hx - 12} ${gy} M ${hx - 15} ${hy - 12} L ${hx} ${hy - 28} L ${hx + 15} ${hy - 14}`, k);
      const bacak = c.S('g', {}, g); yol(c, bacak, 'M 0 0 L 0 38 L 13 38', k);
      const top = daire(c, g, 0, gy - 14, 14, beyaz), f = ok(c, g, cx - 10, gy - 14, cx + 52, gy - 14, { renk: RENK.a });
      const kur = (a, x) => { bacak.setAttribute('transform', `translate(${hx} ${hy}) rotate(${a})`); top.setAttribute('cx', x); };
      kur(40, cx - 30); f.style.opacity = 0;
      return async () => {
        kur(40, cx - 30); f.style.opacity = 0; await c.wait(250);
        await c.tween(300, (e) => kur(lerp(40, -32, e), cx - 30), ease.in);
        await c.tween(1000, (e) => { kur(lerp(-32, 8, e), lerp(cx - 30, cx + 108, e)); f.style.opacity = e < 0.5 ? 1 : 2 - 2 * e; }, ease.out);
      };
    });
    const araba = mini(1, ({ g, cx, gy }) => {
      const h = c.S('g', {}, g);
      insan(c, h, -38, 0, { kol: 1, s: 0.9 });
      yol(c, h, 'M -12 -52 L 0 -46 L 10 -16 L 54 -16 L 62 -46 L 0 -46', { renk: CELIK });
      daire(c, h, 18, -7, 6, { renk: CELIK }); daire(c, h, 48, -7, 6, { renk: CELIK });
      ok(c, h, 68, -32, 116, -32, { renk: RENK.a });
      const koy = (x) => yer(h, x, gy);
      koy(cx - 95);
      return async () => { koy(cx - 95); await c.wait(200); await c.tween(1400, (e) => koy(lerp(cx - 95, cx + 15, e)), ease.in); };
    });
    const bisiklet = mini(2, ({ g, cx, gy }) => {
      const h = c.S('g', {}, g), k = { renk: RENK.yazi, kalin: 3 };
      daire(c, h, -30, -20, 20, k); daire(c, h, 30, -20, 20, k);
      yol(c, h, 'M -30 -20 L -8 -52 L 22 -52 L 30 -20 M -8 -52 L 2 -20 L 22 -52 M -16 -58 L -2 -58 M 22 -52 L 20 -66 L 32 -68', k);
      ok(c, h, -58, -44, -108, -44, { renk: RENK.a });
      const koy = (x) => yer(h, x, gy);
      koy(cx - 20);
      return async () => { koy(cx - 20); await c.wait(200); await c.tween(1700, (e) => koy(lerp(cx - 20, cx + 78, e)), ease.out); };
    });
    const kaleci = mini(3, ({ g, cx, gy }) => {
      yol(c, g, `M ${cx + 120} ${gy} L ${cx + 120} ${gy - 116} L ${cx + 66} ${gy - 116}`, { renk: RENK.cizgi });
      insan(c, g, cx + 78, gy, { kol: -1 });
      const top = daire(c, g, 0, gy - 53, 13, beyaz), f = ok(c, g, cx + 22, gy - 53, cx - 36, gy - 53, { renk: RENK.a });
      top.setAttribute('cx', cx - 125); f.style.opacity = 0;
      return async () => {
        f.style.opacity = 0; top.setAttribute('cx', cx - 125); await c.wait(200);
        await c.tween(650, (e) => top.setAttribute('cx', lerp(cx - 125, cx + 39, e)), ease.linear);
        await belir(c, f, 200); await c.wait(500);
      };
    });
    const raket = mini(4, ({ g, cx, gy }) => {
      c.S('ellipse', { cx: cx + 72, cy: gy - 70, rx: 12, ry: 34, fill: 'none', stroke: RENK.yazi, 'stroke-width': 4 }, g);
      cizgi(c, g, cx + 72, gy - 36, cx + 72, gy - 2, { renk: RENK.yazi, kalin: 5 });
      const top = daire(c, g, 0, gy - 70, 11, beyaz), f = ok(c, g, cx + 44, gy - 100, cx - 14, gy - 100, { renk: RENK.a });
      top.setAttribute('cx', cx - 125); f.style.opacity = 0;
      return async () => {
        f.style.opacity = 0; top.setAttribute('cx', cx - 125); await c.wait(200);
        await c.tween(550, (e) => top.setAttribute('cx', lerp(cx - 125, cx + 49, e)), ease.linear);
        f.style.opacity = 1;
        await c.tween(800, (e) => top.setAttribute('cx', lerp(cx + 49, cx - 125, e)), ease.out);
      };
    });
    const sunger = mini(5, ({ g, cx, gy }) => {
      const my = gy - 66, s = c.S('rect', { rx: 8, fill: '#c9a66b', stroke: '#8e7446', 'stroke-width': 3 }, g);
      const ten = (w, h) => c.S('rect', { width: w, height: h, rx: Math.min(w, h) / 2, fill: TEN, stroke: '#a9805e', 'stroke-width': 2 }, g);
      const avuc = ten(22, 10), parmak = [0, 1, 2, 3].map(() => ten(21, 34)), bas = ten(46, 20);
      const f1 = ok(c, g, 0, 0, 1, 1, { renk: RENK.a }), f2 = ok(c, g, 0, 0, 1, 1, { renk: RENK.a });
      const kur = (e) => {
        const h = lerp(66, 26, e), w = lerp(92, 120, e), ust = my - h / 2, alt = my + h / 2;
        s.setAttribute('x', cx - w / 2); s.setAttribute('y', ust); s.setAttribute('width', w); s.setAttribute('height', h);
        avuc.setAttribute('x', cx - 72); avuc.setAttribute('y', ust - 26); avuc.setAttribute('height', h + 44);
        parmak.forEach((p, i) => { p.setAttribute('x', cx - 54 + i * 24); p.setAttribute('y', ust - 26); });
        bas.setAttribute('x', cx - 54); bas.setAttribute('y', alt - 2);
        f1.ayarla(cx + 92, ust - 46, cx + 92, ust - 2); f2.ayarla(cx + 92, alt + 46, cx + 92, alt + 2);
      };
      kur(0);
      return async () => { kur(0); await c.wait(250); await c.tween(900, kur, ease.inOut); await c.wait(300); };
    });
    const hepsi = [ayak, araba, bisiklet, kaleci, raket, sunger];
    const goster = async (m) => { await belir(c, m.g, 250); await m.oyna(); };
    const kis = (m) => sol(c, m.g, 0.35);

    await par(c.say('Kuvvet, duran bir cismi harekete geçirebilir.'), goster(ayak));
    await kis(ayak);
    await par(c.say('Hareket eden bir cismi hızlandırabilir, yavaşlatabilir ya da durdurabilir.'),
      sira(() => goster(araba), () => kis(araba), () => goster(bisiklet), () => kis(bisiklet), () => goster(kaleci)));
    await kis(kaleci);
    await par(c.say('Cismin hareket yönünü de değiştirebilir.'), goster(raket));
    await kis(raket);
    await par(c.say('Kuvvet, bir cismin şeklini de değiştirebilir.'), goster(sunger));
    await kis(sunger);

    // Dene: olayı kuvvetin etkisiyle eşleştir. Alışveriş arabası hazır örnek olarak yazılır.
    const etiket = (m, metin) => { const t = yazi(c, svg, m.cx, m.cy + 106, metin, { size: 24 }); t.style.opacity = 0; return belir(c, t, 300); };
    const SEC = ['Yavaşlatır', 'Şeklini değiştirir', 'Harekete geçirir', 'Hareket yönünü değiştirir', 'Durdurur'];
    const KISA = ['yavaşlatır', 'şeklini değiştirir', 'harekete geçirir', 'yönünü değiştirir', 'durdurur'];
    await c.say('Her olayı kuvvetin etkisiyle eşleştir.', { noWait: true });
    etiket(araba, 'hızlandırır');
    const ogeler = [
      [ayak, 'Duran topa vuran ayak', 2, 'Top başta duruyordu. Vuruştan sonra ne oldu?', 'Evet. Duran top harekete geçti.'],
      [bisiklet, 'Fren yapan bisiklet', 0, 'Bisiklet hâlâ ilerliyor ama eskisi kadar hızlı değil.', 'Evet. Fren kuvveti bisikleti yavaşlattı.'],
      [kaleci, 'Topu yakalayan kaleci', 4, 'Top kalecinin elinde kaldı; artık ilerlemiyor.', 'Evet. Kalecinin uyguladığı kuvvet topu durdurdu.'],
      [raket, 'Raketle karşılanan top', 3, 'Top durmadı; geldiği yöne geri gitti.', 'Evet. Top geri döndü: hareket yönü değişti.'],
      [sunger, 'Avuçta sıkılan sünger', 1, 'Sünger bir yere gitmedi. Başka neyi değişti?', 'Evet. Sünger yerinde kaldı ama şekli değişti.'],
    ];
    for (const [m, ad, dogru, ipucu, neden] of ogeler) {
      await goster(m);
      await c.choice({ tag: 'Sıra sende', q: `<b>${ad}:</b> kuvvet cisme ne yaptı?`, options: SEC, answer: dogru,
        hints: SEC.map(() => ipucu), right: neden, onPick: (i, tamam) => { if (tamam) etiket(m, KISA[dogru]); } });
    }
    await belir(c, araba.g, 300);
    await sol(c, hepsi.filter((m) => m !== sunger).map((m) => m.g), 0.4);
    await par(c.say('Kuvvet her zaman hareket ettirmez; süngerin yalnızca şekli değişti.', { speak: '[thoughtful] Kuvvet her zaman hareket ettirmez; süngerin yalnızca şekli değişti.' }), sunger.oyna());
    await belir(c, hepsi.map((m) => m.g), 300);
    await c.say('Şimdi doğadaki kuvvetlerin en temel olanlarını tanıyacağız.');
  }

  /* ---- Sahne 2 · Anahtar ve mıknatıs ---- */
  async function anahtarVeMiknatis(c) {
    const svg = c.svg(1000, 562);
    cizgi(c, svg, 30, 400, 480, 400, { renk: RENK.ince }); cizgi(c, svg, 520, 400, 970, 400, { renk: RENK.ince });
    const nesne = {
      anahtar(g) { daire(c, g, 0, -46, 11, { renk: CELIK, kalin: 4 }); yol(c, g, 'M 0 -35 L 0 0 M 0 -8 L 10 -8 M 0 -18 L 8 -18', { renk: CELIK, kalin: 4 }); },
      silgi(g) { c.S('rect', { x: -18, y: -22, width: 36, height: 22, rx: 4, fill: '#e7a3ad' }, g); c.S('rect', { x: -18, y: -22, width: 13, height: 22, rx: 4, fill: '#7f9bd6' }, g); },
      kasik(g) { cizgi(c, g, 0, -32, 0, -2, { renk: TAHTA, kalin: 6 }); c.S('ellipse', { cx: 0, cy: -46, rx: 12, ry: 16, fill: TAHTA }, g); },
      yaprak(g) { c.S('path', { d: 'M 0 0 Q -24 -24 0 -50 Q 24 -24 0 0 Z', fill: '#5a9e4b' }, g); cizgi(c, g, 0, 0, 0, -40, { renk: '#2f6a2a', kalin: 2 }); },
    };
    const XS = [80, 190, 300, 410], adlar = ['anahtar', 'silgi', 'tahta kaşık', 'yaprak'], tur = ['anahtar', 'silgi', 'kasik', 'yaprak'];
    const el = c.S('g', {}, svg);
    c.S('rect', { x: -28, y: -18, width: 56, height: 24, rx: 10, fill: TEN }, el);
    [-20, -5, 10].forEach((dx) => c.S('rect', { x: dx, y: 0, width: 10, height: 18, rx: 5, fill: TEN }, el));
    let elX = XS[0]; yer(el, elX, 104); gizle(el);
    const yazilar = [];
    const birak = async (i, ms = 650) => {
      const g = c.S('g', {}, svg); nesne[tur[i]](g); yer(g, XS[i], 176); gizle(g);
      const x0 = elX; elX = XS[i];
      await c.tween(250, (e) => yer(el, lerp(x0, XS[i], e), 104));
      await belir(c, g, 200); await c.wait(150);
      const o = yeniOk(c, svg, XS[i] + 36, 220, XS[i] + 36, 320, { renk: KC });
      const ad = yazi(c, svg, XS[i], 434, adlar[i], { size: 22, renk: RENK.soluk }); gizle(ad); yazilar.push(ad);
      await par(c.tween(ms, (e, t) => yer(g, XS[i] + (i === 3 ? Math.sin(t * 9) * 12 * (1 - t) : 0), lerp(176, 400, e)), i === 3 ? ease.inOut : ease.in), okCiz(c, o, 450), belir(c, ad, 300));
    };
    await belir(c, el, 250);
    await par(c.say('Elinden bıraktığın anahtar yere düşer.'), birak(0));
    await par(c.say('Silgiyi, tahta kaşığı ya da bir yaprağı bırak: hepsi düşer.'), sira(() => birak(1), () => birak(2), () => birak(3, 1100)));
    await kaybol(c, el, 250);

    // Sağ yarı: yandan görünüş. Çelik kapıya mıknatıs yapışır, tahta kapağa tutunmaz.
    const sag = c.S('g', {}, svg);
    kutu(c, sag, 540, 90, 100, 310, { renk: CELIK, rx: 6 });
    c.S('rect', { x: 640, y: 90, width: 22, height: 310, rx: 3, fill: CELIK }, sag);
    const ad1 = yazi(c, sag, 640, 434, 'çelik kapı', { size: 22, renk: RENK.soluk });
    const mk = (x, y) => { const g = c.S('g', {}, svg); c.S('rect', { x: -11, y: -20, width: 22, height: 40, rx: 4, fill: '#6b7694', stroke: '#e8ecf5', 'stroke-width': 2 }, g); yer(g, x, y); gizle(g); return g; };
    const m1 = mk(770, 230);
    gizle(sag); await par(belir(c, sag), belir(c, m1));
    const emOk = yeniOk(c, svg, 766, 186, 678, 186, { renk: EM });
    await par(c.say('Buzdolabının çelik kapısına koyduğun mıknatıs ise kapıya yapışır.'),
      sira(() => c.wait(300), () => par(c.tween(550, (e) => yer(m1, lerp(770, 673, e), 230), ease.in), okCiz(c, emOk, 550))));
    const tahta = c.S('g', {}, svg);
    kutu(c, tahta, 800, 140, 60, 260, { renk: TAHTA, rx: 6 });
    c.S('rect', { x: 860, y: 140, width: 22, height: 260, rx: 3, fill: TAHTA }, tahta);
    const ad2 = yazi(c, tahta, 860, 434, 'tahta kapak', { size: 22, renk: RENK.soluk });
    const m2 = mk(960, 230);
    gizle(tahta); await par(belir(c, tahta), belir(c, m2));
    await par(c.say('Aynı mıknatısı tahta dolap kapağına koy: tutunmaz.'),
      sira(() => c.wait(300), () => c.tween(500, (e) => yer(m2, lerp(960, 893, e), 230), ease.in), () => c.wait(350), () => c.tween(550, (e) => yer(m2, 893 + 8 * e, lerp(230, 380, e)), ease.in)));
    await c.choice({ tag: 'Tahmin et', q: 'Anahtarı yere çeken ile mıknatısı buzdolabının kapısında tutan aynı kuvvet mi?',
      options: ['Evet; ikisi de cisimleri aşağı çekiyor', 'Hayır; biri her cismi çekiyor, öteki yalnızca bazı maddeleri', 'Evet; ikisi de yalnızca metallere etki ediyor'], answer: 1,
      hints: ['Mıknatıs aşağı değil, kapıya doğru çekilir; üstelik tahtaya tutunmaz. Yere çeken kuvvet ise her cismi çeker.', '',
        'Silgi ve yaprak metal değildir ama düşer. Yere çeken kuvvet madde seçmez; mıknatıs seçer.'],
      right: 'Evet. Biri madde seçmiyor, öteki seçiyor.' });
    const ayrac = cizgi(c, svg, 500, 80, 500, 440, { renk: RENK.cizgi, kalin: 2, kesik: true }); gizle(ayrac);
    await belir(c, ayrac, 300);
    await c.say('Biri her cisme, öteki yalnızca bazı maddelere etki ediyor: iki ayrı kuvvet.', { speak: 'Biri her cisme, öteki yalnızca bazı maddelere etki ediyor: [short pause] iki ayrı kuvvet.' });
    const b1 = yazi(c, svg, 255, 52, 'kütle çekim kuvveti', { size: 28, renk: KC }), b2 = yazi(c, svg, 745, 52, 'elektromanyetik kuvvet', { size: 28, renk: EM });
    const k3 = kart(c, svg, 60, 470, 390, 58, 'güçlü nükleer kuvvet', { renk: GN, yaziRenk: GN, size: 26 }), k4 = kart(c, svg, 550, 470, 390, 58, 'zayıf nükleer kuvvet', { renk: ZN, yaziRenk: ZN, size: 26 });
    gizle(b1, b2, k3, k4);
    await belir(c, [b1, b2, k3, k4], 400, 0.3);
    await c.say('Doğada dört temel kuvvet vardır.');
    await belir(c, b1, 300);
    await c.say('Anahtarı yere çeken, kütle çekim kuvvetidir.');
    await belir(c, b2, 300);
    await c.say('Mıknatısı kapıda tutan, elektromanyetik kuvvettir.');
    await belir(c, [k3, k4], 300);
    await c.say('Öteki ikisi atomun çekirdeğinde çalışır: güçlü ve zayıf nükleer kuvvet.');
    c.note('<b>Dört temel kuvvet:</b> kütle çekim, elektromanyetik, güçlü nükleer, zayıf nükleer.<br>Örnek: anahtar düşer, mıknatıs kapıya yapışır.', 'Dört temel kuvvet', 'dort-kuvvet');
    void ad1; void ad2; void yazilar;
  }

  /* ---- Sahne 3 · Kütle çekim kuvveti ---- */
  async function kutleCekim(c) {
    const svg = c.svg(1000, 562), beyaz = { renk: RENK.yazi, fill: RENK.koyu, kalin: 4 };
    const a = c.S('g', {}, svg);
    daire(c, a, 350, 250, 52, beyaz); daire(c, a, 670, 250, 32, beyaz);
    gizle(a); await belir(c, a);
    const o1 = yeniOk(c, a, 410, 250, 506, 250, { renk: KC, kalin: 8, uc: 22 }), o2 = yeniOk(c, a, 630, 250, 534, 250, { renk: KC, kalin: 8, uc: 22 });
    await par(c.say('Kütle çekim kuvveti, iki kütlenin birbirine uyguladığı kuvvettir.'), okCiz(c, o1, 800), okCiz(c, o2, 800));
    const ka = [yazi(c, a, 350, 350, 'kütle', { size: 26, renk: RENK.soluk }), yazi(c, a, 670, 330, 'kütle', { size: 26, renk: RENK.soluk })];
    gizle(ka); await belir(c, ka);
    await c.say('Bütün maddeler, kütleleri nedeniyle birbirine bu kuvveti uygular.');
    await kaybol(c, a);

    // Dört olay yan yana; biten soluklaşır.
    const b = c.S('g', {}, svg), GY = 430;
    const sahne = (x, ad) => { const g = c.S('g', {}, b); yazi(c, g, x, 478, ad, { size: 24, renk: RENK.soluk }); gizle(g); return g; };
    const g1 = sahne(130, 'elma');
    cizgi(c, g1, 40, GY, 220, GY, { renk: RENK.ince });
    yol(c, g1, 'M 30 118 Q 110 150 218 132', { renk: TAHTA, kalin: 7 });
    [[66, 116], [116, 126], [168, 122], [200, 148]].forEach(([x, y]) => c.S('ellipse', { cx: x, cy: y, rx: 20, ry: 11, fill: '#5a9e4b' }, g1));
    const elma = elmaCiz(c, g1); yer(elma, 130, 170);
    const ok1 = yeniOk(c, g1, 172, 220, 172, 330, { renk: KC });
    const g2 = sahne(375, 'atılan top');
    cizgi(c, g2, 285, GY, 465, GY, { renk: RENK.ince });
    const top = daire(c, g2, 375, GY - 14, 14, { renk: RENK.yazi, fill: RENK.koyu });
    const ok2 = yeniOk(c, g2, 420, 220, 420, 330, { renk: KC });
    const g3 = sahne(625, 'gezegen');
    daire(c, g3, 625, 280, 100, { renk: RENK.ince, kalin: 2 });
    c.S('circle', { cx: 625, cy: 280, r: 26, fill: GUNES }, g3);
    const gez = c.S('circle', { r: 10, fill: RENK.a }, g3), ok3 = ok(c, g3, 0, 0, 1, 1, { renk: KC, kalin: 5, uc: 14 });
    const don = (t) => {
      const ac = -Math.PI / 2 + t * 2 * Math.PI, kx = Math.cos(ac), ky = Math.sin(ac), x = 625 + 100 * kx, y = 280 + 100 * ky;
      gez.setAttribute('cx', x); gez.setAttribute('cy', y); ok3.ayarla(x - 15 * kx, y - 15 * ky, x - 64 * kx, y - 64 * ky);
    };
    don(0);
    const g4 = sahne(870, 'gelgit');
    const su = c.S('rect', { x: 780, width: 180, fill: '#3b6fd1', opacity: 0.8 }, g4);
    cizgi(c, g4, 812, 322, 812, GY, { renk: TAHTA, kalin: 7 });
    c.S('path', { d: `M 846 ${GY} L 960 338 L 960 ${GY} Z`, fill: '#c9a66b' }, g4);
    const seviye = (y) => { su.setAttribute('y', y); su.setAttribute('height', GY - y); };
    seviye(404);

    await belir(c, g1);
    await par(c.say('Dalda duran elma bu kuvvetin etkisiyle yere düşer.'),
      sira(() => c.wait(400), () => par(c.tween(750, (e) => yer(elma, 130, lerp(170, GY - 14, e)), ease.in), okCiz(c, ok1, 500))));
    await par(sol(c, g1, 0.35), belir(c, g2));
    await par(c.say('Havaya atılan top yavaşlar, durur ve yere düşer; sebep aynıdır.'),
      sira(() => c.wait(300), () => par(c.tween(1000, (e) => top.setAttribute('cy', lerp(GY - 14, 150, e)), ease.out), okCiz(c, ok2, 500)),
        () => c.wait(350), () => c.tween(1000, (e) => top.setAttribute('cy', lerp(150, GY - 14, e)), ease.in)));
    await par(sol(c, g2, 0.35), belir(c, g3));
    await par(c.say('Gezegenler de bu kuvvetin etkisiyle Güneş’in etrafında dolanır.'), c.tween(4200, (e, t) => don(t), ease.linear));
    await par(sol(c, g3, 0.35), belir(c, g4));
    await par(c.say('Okyanuslarda gelgit oluşması da kütle çekim kuvvetinin etkisidir.'), c.tween(4200, (e, t) => seviye(378 + 26 * Math.cos(t * 4 * Math.PI)), ease.linear));
    await kaybol(c, b);

    // Top ve Dünya: karşılıklı iki ok.
    const d = c.S('g', {}, svg);
    c.S('circle', { cx: 500, cy: 800, r: 370, fill: '#1b3a6b', stroke: NOTRON, 'stroke-width': 4 }, d);
    yazi(c, d, 500, 505, 'Dünya', { size: 28 });
    const top2 = daire(c, d, 500, 414, 16, { renk: RENK.yazi, fill: RENK.koyu });
    const topAd = yazi(c, d, 532, 180, 'top', { size: 26, hiza: 'start' }); gizle(topAd);
    gizle(d); await belir(c, d);
    await c.tween(1000, (e) => top2.setAttribute('cy', lerp(414, 172, e)), ease.out);
    const asagi = yeniOk(c, d, 488, 196, 488, 306, { renk: KC, kalin: 8, uc: 22 });
    await par(okCiz(c, asagi, 600), belir(c, topAd, 300));
    await c.choice({ tag: 'Tahmin et', q: 'Havaya atılan topu Dünya çeker. Peki top da Dünya’yı çeker mi?',
      options: ['Hayır; yalnızca Dünya cisimleri çeker', 'Hayır; top Dünya’yı çekemeyecek kadar küçüktür', 'Evet; iki kütle birbirine kuvvet uygular'], answer: 2,
      hints: ['Kütle çekimi Dünya’ya özgü değildir; kütlesi olan bütün maddeler birbirini çeker. Gezegenleri çeken de Güneş’tir.',
        'Küçük kütle de kuvvet uygular. Top Dünya’yı çeker; yalnızca Dünya’yı yerinden oynatamaz.', ''],
      right: 'Evet. Top da Dünya’yı çeker.' });
    const yukari = yeniOk(c, d, 512, 446, 512, 336, { renk: KC, kalin: 8, uc: 22 });
    await okCiz(c, yukari, 800);
    await c.say('Havaya atılan top da Dünya’yı kendine doğru çeker.');
    await c.say('Kütle çekim kuvveti karşılıklıdır: iki kütle de ötekini çeker.', { speak: 'Kütle çekim kuvveti karşılıklıdır: [short pause] iki kütle de ötekini çeker.' });
    const ag = yazi(c, d, 466, 262, 'ağırlık', { size: 26, renk: KC, hiza: 'end' }); gizle(ag);
    await belir(c, ag);
    await c.say('Bir cismin ağırlığının sebebi de kütle çekim kuvvetidir.');
    const uzak = [ok(c, d, 250, 470, 60, 110, { renk: KC, kalin: 3, uc: 14, kesik: true }), ok(c, d, 750, 470, 940, 110, { renk: KC, kalin: 3, uc: 14, kesik: true }),
      yazi(c, d, 500, 66, 'etki mesafesi: sonsuz kabul edilir', { size: 26, renk: KC })];
    gizle(uzak); await belir(c, uzak, 500);
    await c.say('Kütle çekim kuvvetinin etki mesafesinin sonsuz olduğu kabul edilir.');
    c.note('<b>Kütle çekim kuvveti:</b> kütlesi olan bütün maddeler birbirini çeker.<br>Örnek: düşen elma, Güneş’in etrafında dolanan gezegen.', 'Kütle çekim kuvveti', 'kutle-cekim');
  }

  /* ---- Sahne 4 · Elektromanyetik kuvvet ---- */
  async function elektromanyetik(c) {
    const svg = c.svg(1000, 562), a = c.S('g', {}, svg);
    const X = [180, 500, 820], Y = [150, 400];
    const yuva = (i, ad) => {
      const cx = X[i % 3], cy = Y[Math.floor(i / 3)], g = c.S('g', {}, a);
      if (ad) yazi(c, g, cx, cy + 112, ad, { size: 24, renk: RENK.soluk });
      gizle(g); return { g, cx, cy };
    };
    const emk = { renk: EM, kalin: 5, uc: 14 };

    // 0: elektrik yükleri
    const s0 = yuva(0, 'elektrik yükleri'), oklar0 = [];
    {
      const { g, cx, cy } = s0, yuk = (x, y, artiMi) => { daire(c, g, x, y, 22, { renk: RENK.yazi, fill: RENK.koyu }); (artiMi ? arti : eksi)(c, g, x, y, 10); };
      yuk(cx - 78, cy - 42, true); yuk(cx + 78, cy - 42, false); yuk(cx - 34, cy + 38, true); yuk(cx + 34, cy + 38, true);
      oklar0.push(yeniOk(c, g, cx - 50, cy - 42, cx - 8, cy - 42, emk), yeniOk(c, g, cx + 50, cy - 42, cx + 8, cy - 42, emk),
        yeniOk(c, g, cx - 62, cy + 38, cx - 106, cy + 38, emk), yeniOk(c, g, cx + 62, cy + 38, cx + 106, cy + 38, emk));
    }
    // 1: tarak ve kâğıt
    const s1 = yuva(1, 'tarak ve kâğıt');
    let tarakOyna;
    {
      const { g, cx, cy } = s1, gy = cy + 70, hx = cx - 104, hy = cy - 8;
      daire(c, g, hx, hy, 34, { renk: RENK.soluk });
      c.S('path', { d: `M ${hx - 36} ${hy - 2} A 36 36 0 0 1 ${hx + 36} ${hy - 2} Z`, fill: '#6b4a33' }, g);
      cizgi(c, g, cx - 40, gy, cx + 130, gy, { renk: TAHTA, kalin: 5 });
      const kagit = [[4, 0], [18, -1], [34, 0], [50, -1], [66, 0], [80, -1]].map(([dx, dy], i) => {
        const r = c.S('rect', { x: cx + dx, y: gy - 9 + dy, width: 9, height: 6, fill: RENK.yazi, transform: `rotate(${i * 23 - 40} ${cx + dx + 4} ${gy - 6})` }, g);
        return { r, dx };
      });
      const tarak = c.S('g', {}, g);
      c.S('rect', { x: -50, y: -14, width: 100, height: 12, rx: 4, fill: '#8fa3d9' }, tarak);
      for (let x = -44; x <= 44; x += 8) cizgi(c, tarak, x, -4, x, 16, { renk: '#8fa3d9', kalin: 3 });
      yer(tarak, hx + 4, hy - 42);
      const emOk = yeniOk(c, g, cx + 112, gy - 8, cx + 112, gy - 56, emk);
      tarakOyna = async () => {
        await c.tween(1300, (e, t) => yer(tarak, hx + 4 + Math.sin(t * 6 * Math.PI) * 16, hy - 42), ease.linear);
        await c.tween(700, (e) => yer(tarak, lerp(hx + 4, cx + 46, e), lerp(hy - 42, gy - 72, e)));
        await par(c.tween(450, (e) => kagit.forEach(({ r, dx }, i) => r.setAttribute('transform', `translate(0 ${-e * (48 + (i % 2) * 3)}) rotate(${i * 23 - 40} ${cx + dx + 4} ${gy - 6})`)), ease.in), okCiz(c, emOk, 450));
      };
    }
    // 2: mıknatıslar (üstte çeken çift, altta iten çift)
    const s2 = yuva(2, 'mıknatıslar');
    let miknatisOyna;
    {
      const { g, cx, cy } = s2;
      const c1 = miknatis(c, g, cx - 88, cy - 36, 64, 24), c2 = miknatis(c, g, cx + 88, cy - 36, 64, 24);
      const i1 = miknatis(c, g, cx - 36, cy + 48, 64, 24), i2 = miknatis(c, g, cx + 36, cy + 48, 64, 24, { ters: true });
      const oklar = [yeniOk(c, g, cx - 110, cy - 66, cx - 56, cy - 66, emk), yeniOk(c, g, cx + 110, cy - 66, cx + 56, cy - 66, emk),
        yeniOk(c, g, cx - 46, cy + 18, cx - 100, cy + 18, emk), yeniOk(c, g, cx + 46, cy + 18, cx + 100, cy + 18, emk)];
      miknatisOyna = async () => {
        await par(oklar.slice(0, 2).map((o) => okCiz(c, o, 400)), c.tween(800, (e) => { yer(c1, 52 * e, 0); yer(c2, -52 * e, 0); }, ease.in));
        await par(oklar.slice(2).map((o) => okCiz(c, o, 400)), c.tween(800, (e) => { yer(i1, -52 * e, 0); yer(i2, 52 * e, 0); }, ease.out));
      };
    }
    // 3: dağınık iğneleri toplayan mıknatıs
    const s3 = yuva(3, 'iğneler');
    let igneOyna;
    {
      const { g, cx, cy } = s3, gy = cy + 70;
      cizgi(c, g, cx - 125, gy, cx + 125, gy, { renk: TAHTA, kalin: 5 });
      const mk = miknatis(c, g, cx, cy - 20, 130, 26);
      const igneler = [-92, -58, -20, 14, 50, 88].map((dx, i) => {
        const l = cizgi(c, g, 0, 0, 0, 0, { renk: CELIK, kalin: 3 }), e0 = [cx + dx - 17, gy - 5 - (i % 2) * 6, cx + dx + 17, gy - 5 - ((i + 1) % 2) * 6], X2 = cx - 50 + i * 20, e1 = [X2, cy - 6, X2, cy + 28];
        const koy = (t) => ['x1', 'y1', 'x2', 'y2'].forEach((k, j) => l.setAttribute(k, lerp(e0[j], e1[j], t)));
        koy(0); return koy;
      });
      yer(mk, 0, -74);
      const emOk = yeniOk(c, g, cx + 112, gy - 10, cx + 112, cy + 14, emk);
      igneOyna = async () => {
        await c.tween(800, (e) => yer(mk, 0, lerp(-74, 0, e)));
        await par(c.tween(500, (e) => igneler.forEach((koy) => koy(e)), ease.in), okCiz(c, emOk, 500));
      };
    }
    // 4: pusula
    const s4 = yuva(4, 'pusula');
    const pus = pusulaCiz(c, s4.g, 60); yer(pus, s4.cx, s4.cy + 4); pus.cevir(130);
    yazi(c, s4.g, s4.cx, s4.cy - 66, 'K', { size: 22, renk: RENK.soluk });
    // 5: ortak ad
    const s5 = yuva(5, null);
    yazi(c, s5.g, s5.cx, s5.cy - 8, 'elektromanyetik', { size: 30, renk: EM }); yazi(c, s5.g, s5.cx, s5.cy + 30, 'kuvvet', { size: 30, renk: EM });

    await belir(c, s0.g);
    await c.say('Maddede artı ve eksi olmak üzere iki tür elektrik yükü bulunur.');
    await par(oklar0.map((o) => okCiz(c, o, 500)));
    await c.say('Elektrik yükleri birbirine itme ya da çekme kuvveti uygular.');
    await par(sol(c, s0.g, 0.35), belir(c, s1.g));
    await par(c.say('Saça sürtülen plastik tarak, küçük kâğıt parçalarını bu kuvvetle çeker.'), tarakOyna());
    await par(sol(c, s1.g, 0.35), belir(c, s2.g));
    await c.say('Her mıknatısın iki manyetik kutbu vardır.');
    await par(c.say('Mıknatıslar, manyetik özelliği olan maddeleri iter ya da çeker.'), miknatisOyna());
    await par(sol(c, s2.g, 0.35), belir(c, s3.g));
    await par(c.say('Dağılan iğneleri mıknatısla toplamak bu yüzden kolaydır.'), igneOyna());
    await par(sol(c, s3.g, 0.35), belir(c, s4.g));
    await par(c.say('Pusulanın iğnesi, Dünya’nın manyetik alanı nedeniyle kuzeye doğru hizalanır.'),
      c.tween(3200, (e, t) => pus.cevir(130 * (1 - e) * Math.cos(t * 5 * Math.PI)), ease.out));
    pus.cevir(0);
    await par(belir(c, [s0.g, s1.g, s2.g, s3.g], 400), belir(c, s5.g, 400));
    await c.say('Bu itme ve çekmelerin hepsi elektromanyetik kuvvettir.');
    await c.say('Elektromanyetik kuvvet, elektrik yüklerinin ve manyetik kutupların etkileşimiyle oluşur.');
    await kaybol(c, a);

    // Masadaki iğne: iki kuvvet aynı olayda.
    const m = c.S('g', {}, svg);
    cizgi(c, m, 260, 440, 740, 440, { renk: TAHTA, kalin: 8 });
    cizgi(c, m, 300, 446, 300, 545, { renk: TAHTA, kalin: 6 }); cizgi(c, m, 700, 446, 700, 545, { renk: TAHTA, kalin: 6 });
    const mk = miknatis(c, m, 500, 150, 180, 44), igne = cizgi(c, m, 455, 432, 545, 432, { renk: CELIK, kalin: 4 });
    const igneY = (y) => { igne.setAttribute('y1', y); igne.setAttribute('y2', y); };
    yer(mk, 0, -200); gizle(m);
    await belir(c, m);
    await c.tween(900, (e) => yer(mk, 0, lerp(-200, 0, e)));
    await c.tween(450, (e) => igneY(lerp(432, 176, e)), ease.in);
    await c.choice({ tag: 'Uygula', q: 'Masadaki iğneye üstten mıknatıs yaklaştırdın; iğne yukarı sıçrayıp mıknatısa yapıştı. İğneyi yukarı çeken hangisi?',
      options: ['Kütle çekim kuvveti', 'Elektromanyetik kuvvet', 'İkisi aynı kuvvettir; yalnızca adları farklıdır'], answer: 1,
      hints: ['Kütle çekim kuvveti iğneyi aşağı, Dünya’ya doğru çeker. Yukarı çeken, mıknatısın uyguladığı elektromanyetik kuvvettir.', '',
        'Yer çekimi ile mıknatısın çekmesi aynı kuvvet değildir. Biri kütleyle, öteki elektrik yükü ve manyetik kutupla ilgilidir.'],
      right: 'Evet. İğneyi yukarı çeken, mıknatısın elektromanyetik kuvvetidir.' });
    igneY(432);
    await c.tween(500, (e) => igneY(lerp(432, 330, e)), ease.out);
    const yu = yeniOk(c, m, 500, 322, 500, 200, { renk: EM, kalin: 8, uc: 22 }), as = yeniOk(c, m, 500, 338, 500, 408, { renk: KC, kalin: 8, uc: 22 });
    const ikiAd = [yazi(c, m, 524, 270, 'elektromanyetik', { size: 26, renk: EM, hiza: 'start' }), yazi(c, m, 524, 386, 'kütle çekim', { size: 26, renk: KC, hiza: 'start' })];
    gizle(ikiAd);
    await par(okCiz(c, as, 500), okCiz(c, yu, 600), belir(c, ikiAd, 500));
    await c.say('İğneye iki ayrı temel kuvvet etki etti: biri aşağı, öteki yukarı çekti.');
    await kaybol(c, m);

    // Maglev treni
    const r = c.S('g', {}, svg);
    cizgi(c, r, 30, 330, 970, 330, { renk: CELIK, kalin: 8 });
    [140, 380, 620, 860].forEach((x) => c.S('rect', { x: x - 9, y: 334, width: 18, height: 110, fill: RENK.cizgi }, r));
    const tren = c.S('g', {}, r);
    c.S('path', { d: 'M 0 -78 L 250 -78 Q 322 -74 344 -30 L 344 -22 L 0 -22 Z', fill: RENK.koyu, stroke: CELIK, 'stroke-width': 4, 'stroke-linejoin': 'round' }, tren);
    [22, 82, 142, 202].forEach((x) => c.S('rect', { x, y: -64, width: 44, height: 20, rx: 4, fill: 'none', stroke: CELIK, 'stroke-width': 2 }, tren));
    for (let x = 16; x <= 330; x += 26) cizgi(c, tren, x, -16, x, -6, { renk: EM, kalin: 4 });
    const trenAd = yazi(c, r, 500, 496, 'maglev treni', { size: 26, renk: RENK.soluk });
    yer(tren, -380, 330); gizle(r);
    await belir(c, r, 300);
    await par(c.say('Maglev trenlerinin hareket etmesi de elektromanyetik kuvvetin etkisidir.'), c.tween(4200, (e) => yer(tren, lerp(-380, 520, e), 330), ease.out));
    const uzak = yazi(c, svg, 500, 120, 'etki mesafesi: sonsuz kabul edilir', { size: 26, renk: EM }); gizle(uzak);
    await belir(c, uzak);
    await c.say('Elektromanyetik kuvvetin etki mesafesinin de sonsuz olduğu kabul edilir.');
    c.note('<b>Elektromanyetik kuvvet:</b> elektrik yükleri ve manyetik kutuplar iter ya da çeker.<br>Örnek: iğneleri toplayan mıknatıs.', 'Elektromanyetik kuvvet', 'elektromanyetik');
    void trenAd;
  }

  /* ---- Sahne 5 · Güçlü nükleer kuvvet ---- */
  async function gucluNukleer(c) {
    const svg = c.svg(1000, 562), CX = 540, CY = 285, a = c.S('g', {}, svg);
    const atom = c.S('g', {}, a);
    [0, 60, 120].forEach((ac) => c.S('ellipse', { cx: 130, cy: 140, rx: 86, ry: 30, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2, transform: `rotate(${ac} 130 140)` }, atom));
    c.S('circle', { cx: 130, cy: 140, r: 9, fill: PROTON }, atom);
    [[216, 140], [173, 214.5], [87, 214.5]].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 6, fill: RENK.yazi }, atom));
    yazi(c, atom, 130, 262, 'atom', { size: 24, renk: RENK.soluk });
    const buyut = c.S('g', {}, a);
    cizgi(c, buyut, 138, 132, 462, 205, { renk: RENK.cizgi, kalin: 2, kesik: '6 8' }); cizgi(c, buyut, 138, 148, 452, 350, { renk: RENK.cizgi, kalin: 2, kesik: '6 8' });
    const nuk = cekirdek(c, a, CX, CY, { n: 7, r: 36, proton: 3 });
    const lej = c.S('g', {}, a);
    c.S('circle', { cx: 838, cy: 62, r: 11, fill: PROTON }, lej); yazi(c, lej, 858, 70, 'proton', { size: 24, hiza: 'start' });
    c.S('circle', { cx: 838, cy: 98, r: 11, fill: NOTRON }, lej); yazi(c, lej, 858, 106, 'nötron', { size: 24, hiza: 'start' });
    gizle(atom, buyut, nuk.g, lej);
    await belir(c, atom);
    await par(c.say('Atomun merkezinde çekirdek, çekirdekte de protonlar ve nötronlar bulunur.'), sira(() => c.wait(500), () => belir(c, buyut, 300), () => belir(c, [nuk.g, lej], 500)));
    const protonlar = nuk.parcalar.filter((p) => p.proton);
    const artilar = c.S('g', {}, a); protonlar.forEach((p) => arti(c, artilar, p.x, p.y, 12));
    gizle(artilar); await belir(c, artilar);
    await c.say('Protonlar artı yüklüdür.');
    const itme = protonlar.map((p) => { const L = Math.hypot(p.dx, p.dy), ux = p.dx / L, uy = p.dy / L; return yeniOk(c, a, p.x + ux * 22, p.y + uy * 22, p.x + ux * 104, p.y + uy * 104, { renk: EM, kalin: 7, uc: 20 }); });
    await par(itme.map((o) => okCiz(c, o, 600)));
    await c.say('Artı yüklü protonlar birbirine elektriksel itme kuvveti uygular.');
    const emAd = [yazi(c, a, 880, 215, 'elektromanyetik', { size: 24, renk: EM }), yazi(c, a, 880, 245, 'itme', { size: 24, renk: EM })];
    gizle(emAd); await belir(c, emAd);
    await c.say('Bu itme, az önce tanıdığımız elektromanyetik kuvvettir.');
    await c.choice({ tag: 'Tahmin et', q: 'Protonlar birbirini itiyor. Öyleyse çekirdek neden dağılmıyor olabilir?',
      options: ['Çekirdeğin içinde itme kuvveti yoktur', 'Protonlar çekirdekte yüklerini kaybeder', 'İtmeye rağmen onları bir arada tutan başka bir kuvvet vardır'], answer: 2,
      hints: ['Çekirdekte yalnızca çekme yoktur; artı yüklü protonlar çekirdekte de birbirini iter. Dağılmamanın sebebi başka bir kuvvettir.',
        'Protonlar çekirdekte de artı yüklüdür ve birbirini itmeyi sürdürür.', ''],
      right: 'Evet. İtmeye karşı koyan başka bir kuvvet var.' });
    const tutma = icOklar(c, a, CX, CY, nuk.R, { uz: 72, kalin: 7, uc: 20 });
    const gnAd = [yazi(c, a, 880, 310, 'güçlü nükleer', { size: 24, renk: GN }), yazi(c, a, 880, 340, 'kuvvet', { size: 24, renk: GN })];
    gizle(tutma, gnAd);
    await par(belir(c, tutma, 500), belir(c, gnAd, 500), sol(c, itme, 0.4), sol(c, emAd, 0.5));
    await c.say('Proton ve nötronları bir arada tutan kuvvet, güçlü nükleer kuvvettir.');
    await c.say('Güçlü nükleer kuvvet böylece atom çekirdeğinin yapısını korur.');
    const demir = [yazi(c, a, 150, 340, 'örnek:', { size: 22, renk: RENK.soluk }), yazi(c, a, 150, 368, 'demir çekirdeği', { size: 22, renk: RENK.soluk })];
    gizle(demir); await belir(c, demir);
    await c.say('Demir atomunun çekirdeği bu kuvvet sayesinde parçalanmadan bir arada kalır.');
    const enGuclu = yazi(c, a, 880, 386, 'en güçlü kuvvet', { size: 22, renk: GN, kalin: 500 }); gizle(enGuclu);
    await belir(c, enGuclu);
    await c.say('Güçlü nükleer kuvvet, en güçlü kuvvettir.');
    await c.say('Ama etki mesafesi atom çekirdeğiyle sınırlıdır.');
    await kaybol(c, demir, 250);
    const kalem = c.S('g', {}, a);
    cizgi(c, kalem, 40, 500, 270, 500, { renk: TAHTA, kalin: 5 });
    [[60, 470], [84, 488]].forEach(([x, y]) => {
      c.S('rect', { x, y: y - 6, width: 130, height: 12, fill: '#d9a441' }, kalem);
      c.S('path', { d: `M ${x + 130} ${y - 6} L ${x + 152} ${y} L ${x + 130} ${y + 6} Z`, fill: TEN }, kalem);
      c.S('rect', { x: x - 12, y: y - 6, width: 12, height: 12, fill: '#e7a3ad' }, kalem);
    });
    yazi(c, kalem, 150, 536, 'iki kalem', { size: 22, renk: RENK.soluk });
    gizle(kalem); await belir(c, kalem);
    await c.choice({ tag: 'Düşün', q: 'En güçlü kuvvet bu. Masada yan yana duran iki kalem arasında etkisini görür müsün?',
      options: ['Evet; en güçlü kuvvet her yerde kendini gösterir', 'Hayır; etki mesafesi atom çekirdeğiyle sınırlıdır', 'Evet; kalemler birbirine değiyorsa görürsün'], answer: 1,
      hints: ['En güçlü olmak, her yerde hissedilmek demek değildir. Bu kuvvet çekirdeğin dışına ulaşmaz.', '',
        'Değmek yetmez; bu kuvvet yalnızca çekirdeğin içinde, proton ve nötronlar arasında etkilidir.'],
      right: 'Evet. Bu kuvvet çekirdeğin dışına ulaşmaz.' });
    const halka = c.S('g', {}, a);
    daire(c, halka, CX, CY, nuk.R + 24, { renk: GN, kalin: 4 }).setAttribute('stroke-dasharray', '10 9');
    cizgi(c, halka, 806, 430, 648, 362, { renk: GN, kalin: 2 });
    yazi(c, halka, 880, 444, 'etki mesafesi', { size: 22, renk: GN });
    gizle(halka);
    await par(belir(c, halka, 500), sol(c, tutma, 0.25), sol(c, itme, 0.2));
    await c.say('Bu yüzden en güçlü kuvveti gündelik hayatta doğrudan fark etmeyiz.', { speak: '[thoughtful] Bu yüzden en güçlü kuvveti gündelik hayatta doğrudan fark etmeyiz.' });
    await kaybol(c, a);

    // Güneş: iki hidrojen çekirdeği birleşir, helyum çekirdeği olur.
    const gs = c.S('g', {}, svg);
    gunes(c, gs, 500, 281, 236);
    yazi(c, gs, 500, 100, 'Güneş', { size: 28, renk: GUNES });
    const h1 = cekirdek(c, gs, 0, 0, { n: 2, r: 20 }), h2 = cekirdek(c, gs, 0, 0, { n: 2, r: 20 });
    yer(h1.g, 340, 300); yer(h2.g, 660, 300);
    const hAd = yazi(c, gs, 500, 420, 'hidrojen çekirdekleri', { size: 24 });
    gizle(gs); await belir(c, gs);
    const he = cekirdek(c, gs, 500, 300, { n: 4, r: 20 }); gizle(he.g);
    await par(c.say('Güneş’in merkezine yakın bölgede hidrojen çekirdekleri birleşerek helyuma dönüşür.'),
      sira(() => c.wait(500), () => c.tween(1800, (e) => { yer(h1.g, lerp(340, 462, e), 300); yer(h2.g, lerp(660, 538, e), 300); }, ease.in),
        () => par(belir(c, he.g, 300), sol(c, [h1.g, h2.g], 0, 300)), () => { hAd.textContent = 'helyum çekirdeği'; }));
    const gOk = icOklar(c, gs, 500, 300, he.R, { n: 4, bas: 45, uz: 54 }), gAd = yazi(c, gs, 500, 178, 'güçlü nükleer kuvvet', { size: 26, renk: GN });
    gizle(gOk, gAd); await belir(c, [...gOk, gAd], 500);
    await c.say('Bu birleşmede etkili olan da güçlü nükleer kuvvettir.');
    c.note('<b>Güçlü nükleer kuvvet:</b> proton ve nötronları bir arada tutar, çekirdekle sınırlıdır.<br>Örnek: demir çekirdeği dağılmaz.', 'Güçlü nükleer kuvvet', 'guclu-nukleer');
  }

  /* ---- Sahne 6 · Zayıf nükleer kuvvet ---- */
  async function zayifNukleer(c) {
    const svg = c.svg(1000, 562);
    const dalga = (x, y, R, faz) => {
      let d = '';
      for (let i = 0; i <= 120; i++) { const ac = i / 120 * 2 * Math.PI, r = R + 6 * Math.sin(14 * ac + faz); d += (i ? ' L ' : 'M ') + (x + r * Math.cos(ac)).toFixed(1) + ' ' + (y + r * Math.sin(ac)).toFixed(1); }
      return d + ' Z';
    };
    /* Bir nötronu protona dönüştürür: üstüne kırmızı daire belirir, çevresi zayıf nükleer rengiyle vurgulanır. */
    const donustur = async (p, parca, r) => {
      const yeni = c.S('circle', { cx: parca.x, cy: parca.y, r, fill: PROTON, stroke: '#0c1226', 'stroke-width': 2 }, p);
      const vurgu = daire(c, p, parca.x, parca.y, r + 7, { renk: ZN, kalin: 6 });
      gizle(yeni, vurgu);
      await belir(c, vurgu, 300); await belir(c, yeni, 900);
      return [yeni, vurgu];
    };
    /* Çekirdeği ikiye ayırır. */
    const ayir = (nuk, e, uz = 62) => nuk.parcalar.forEach((p) => { const solda = p.dx < -1 || (Math.abs(p.dx) <= 1 && p.dy < 0); p.el.setAttribute('transform', `translate(${(solda ? -uz : uz) * e} ${(solda ? -10 : 10) * e})`); });
    const enerji = (p, x, y) => { const g = c.S('g', {}, p); [20, 70, 110, 160, 200, 250, 290, 340].forEach((ac) => { const [x1, y1] = acili(x, y, 26, ac), [x2, y2] = acili(x, y, 50, ac); cizgi(c, g, x1, y1, x2, y2, { renk: RENK.yazi, kalin: 3 }); }); return g; };

    const a = c.S('g', {}, svg);
    const n1 = cekirdek(c, a, 270, 250, { n: 7, r: 32, proton: 3 });
    const titrek = c.S('path', { d: dalga(270, 250, n1.R + 30, 0), fill: 'none', stroke: ZN, 'stroke-width': 4 }, a);
    const kararsiz = yazi(c, a, 270, 470, 'kararsız', { size: 26, renk: ZN });
    gizle(a, titrek, kararsiz); a.style.opacity = 0;
    await belir(c, a);
    await c.say('Dördüncü kuvvet de atom çekirdeğinde etkilidir: zayıf nükleer kuvvet.');
    await belir(c, [titrek, kararsiz], 400);
    await par(c.say('Zayıf nükleer kuvvet, atom çekirdeğinin kararsız olmasına yol açar.'), c.tween(4200, (e, t) => titrek.setAttribute('d', dalga(270, 250, n1.R + 30, t * 26)), ease.linear));
    await par(c.say('Proton ve nötronların başka parçacıklara dönüşebilmesini sağlar.'), sira(() => c.wait(500), () => donustur(a, n1.parcalar[0], 32)));
    const b = c.S('g', {}, svg);
    const n2 = cekirdek(c, b, 730, 250, { n: 19, r: 20 }), en = enerji(b, 730, 250);
    const parAd = yazi(c, b, 730, 470, 'parçalanma', { size: 26, renk: ZN }), enAd = yazi(c, b, 730, 110, 'enerji', { size: 24 });
    gizle(b, en, enAd); b.style.opacity = 0;
    await par(belir(c, b), sol(c, a, 0.4));
    await par(c.say('Atom çekirdeğinin parçalanmasında da zayıf nükleer kuvvet etkilidir.'), sira(() => c.wait(700), () => c.tween(1300, (e) => ayir(n2, e), ease.out)));
    await belir(c, [en, enAd], 400);
    await c.say('Çekirdek parçalanırken yüksek miktarda enerji açığa çıkar.');

    // Soru: biri bir arada kalıyor, öteki parçalanıyor.
    await kaybol(c, a); await kaybol(c, enAd, 200);
    parAd.textContent = 'parçalanıyor'; parAd.style.fill = RENK.yazi;
    const s = c.S('g', {}, svg);
    const n3 = cekirdek(c, s, 270, 250, { n: 19, r: 20 });
    yazi(c, s, 270, 470, 'bir arada kalıyor', { size: 26 });
    gizle(s); await belir(c, s);
    await c.choice({ tag: 'Uygula', q: 'Bir çekirdek parçalanmadan bir arada kalıyor; bir başkası parçalanıyor. Hangi kuvvetler etkili?',
      options: ['İkisinde de güçlü nükleer kuvvet', 'Birincide zayıf, ikincide güçlü nükleer kuvvet', 'Birincide güçlü, ikincide zayıf nükleer kuvvet'], answer: 2,
      hints: ['Çekirdekle ilgili her olay güçlü nükleer kuvvetin işi değildir. O çekirdeği korur; parçalanmada etkili olan zayıf nükleer kuvvettir.',
        'Tam tersi: bir arada tutan güçlü, parçalanmada etkili olan zayıf nükleer kuvvettir.', ''],
      right: 'Evet. Koruyan güçlü, parçalanmada etkili olan zayıf nükleer kuvvettir.' });
    const tutma = icOklar(c, s, 270, 250, n3.R, { uz: 62 });
    const adlar = [yazi(c, s, 270, 508, 'güçlü nükleer', { size: 26, renk: GN }), yazi(c, b, 730, 508, 'zayıf nükleer', { size: 26, renk: ZN })];
    const cerceve = c.S('ellipse', { cx: 730, cy: 250, rx: 178, ry: 118, fill: 'none', stroke: ZN, 'stroke-width': 4, 'stroke-dasharray': '10 9' }, b);
    gizle(tutma, adlar, cerceve);
    await belir(c, [...tutma, ...adlar, cerceve], 500);
    await c.say('Güçlü nükleer kuvvet çekirdeği korur; zayıf nükleer kuvvet çekirdeğin yapısını değiştirir.', { speak: 'Güçlü nükleer kuvvet çekirdeği korur; [short pause] zayıf nükleer kuvvet çekirdeğin yapısını değiştirir.' });
    await par(kaybol(c, s), kaybol(c, b));

    // Güneş yeniden
    const gs = c.S('g', {}, svg);
    gunes(c, gs, 500, 270, 215);
    yazi(c, gs, 500, 104, 'Güneş', { size: 28, renk: GUNES });
    const he = cekirdek(c, gs, 500, 250, { n: 4, r: 20 });
    [[380, 180], [620, 180], [370, 330], [630, 330]].forEach(([x, y]) => cekirdek(c, gs, x, y, { n: 2, r: 13 }));
    icOklar(c, gs, 500, 250, he.R, { n: 4, bas: 45, uz: 44, kalin: 5 });
    const gAd = yazi(c, gs, 500, 372, 'güçlü nükleer', { size: 26, renk: GN }), zAd = yazi(c, gs, 500, 410, 'zayıf nükleer', { size: 26, renk: ZN });
    gizle(gs, zAd); gs.style.opacity = 0;
    await belir(c, gs); await belir(c, zAd, 400);
    await c.say('Güneş’teki çekirdek tepkimeleri sırasında zayıf nükleer kuvvet de gözlemlenir.');
    await kaybol(c, gs);
    void gAd;

    // Etki alanı: dar halkanın içinde daha dar halka. Sonra proton sayısı ve element.
    const e = c.S('g', {}, svg);
    const n5 = cekirdek(c, e, 500, 245, { n: 7, r: 34, proton: 3 });
    const h1 = c.S('g', {}, e), h2 = c.S('g', {}, e);
    daire(c, h1, 500, 245, n5.R + 26, { renk: GN, kalin: 4 }).setAttribute('stroke-dasharray', '10 9');
    cizgi(c, h1, 268, 142, 398, 190, { renk: GN, kalin: 2 }); yazi(c, h1, 190, 140, 'güçlü nükleer', { size: 24, renk: GN });
    daire(c, h2, 500, 245, 44, { renk: ZN, kalin: 5 });
    cizgi(c, h2, 730, 142, 536, 222, { renk: ZN, kalin: 2 }); yazi(c, h2, 810, 140, 'zayıf nükleer', { size: 24, renk: ZN });
    const baslik = yazi(c, e, 500, 50, 'etki alanı', { size: 26, renk: RENK.soluk });
    gizle(e, h2); e.style.opacity = 0;
    await belir(c, e); await belir(c, h2, 500);
    await c.say('Zayıf nükleer kuvvetin etki alanı, güçlü nükleer kuvvetinkinden daha kısadır.');
    await kaybol(c, [h1, h2, baslik]);
    const sayi = yazi(c, e, 500, 440, 'proton sayısı: 3', { size: 30 }); gizle(sayi);
    const artilar = c.S('g', {}, e); n5.parcalar.filter((p) => p.proton).forEach((p) => arti(c, artilar, p.x, p.y, 11)); gizle(artilar);
    await belir(c, [sayi, artilar]);
    await c.say('Bir atomun hangi element olduğunu çekirdeğindeki proton sayısı belirler.');
    const baska = yazi(c, e, 500, 490, 'başka bir element', { size: 28, renk: ZN }); gizle(baska);
    await par(c.say('Çekirdekteki parçacıklar dönüşürse atom, başka bir elementin atomu olabilir.'),
      sira(() => c.wait(400), () => donustur(e, n5.parcalar[0], 34), () => { arti(c, e, 500, 245, 11); sayi.textContent = 'proton sayısı: 4'; }, () => belir(c, baska, 400)));
    c.note('<b>Zayıf nükleer kuvvet:</b> çekirdeği kararsız kılar, proton ve nötronları dönüştürür.<br>Örnek: çekirdeğin parçalanması.', 'Zayıf nükleer kuvvet', 'zayif-nukleer');
  }

  /* ---- Sahne 7 · Olayı kuvvetine bağla ---- */
  const notr = { renk: RENK.soluk, kalin: 4, uc: 11 };
  const ikon = {
    yaprak(c, g) { c.S('path', { d: 'M -10 12 Q -38 -10 -8 -32 Q 18 -12 -10 12 Z', fill: '#5a9e4b' }, g); ok(c, g, 22, -24, 22, 24, notr); },
    top(c, g) { yol(c, g, 'M -30 22 Q -6 -58 24 6', { renk: RENK.soluk, kalin: 3 }).setAttribute('stroke-dasharray', '5 7'); daire(c, g, 24, 14, 10, { renk: RENK.yazi, fill: RENK.koyu }); cizgi(c, g, -34, 26, 36, 26, { renk: RENK.cizgi }); },
    igne(c, g) { miknatis(c, g, 0, -18, 58, 20); [-20, -6, 8, 22].forEach((x, i) => cizgi(c, g, x, -6, x + (i % 2 ? 3 : -3), 24, { renk: CELIK, kalin: 2.5 })); },
    tarak(c, g) { c.S('rect', { x: -30, y: -30, width: 60, height: 10, rx: 3, fill: '#8fa3d9' }, g); for (let x = -26; x <= 26; x += 8) cizgi(c, g, x, -20, x, -6, { renk: '#8fa3d9', kalin: 3 }); [[-16, 2], [0, 8], [14, 0], [-6, 20], [18, 18]].forEach(([x, y]) => c.S('rect', { x, y, width: 8, height: 6, fill: RENK.yazi }, g)); },
    pusula(c, g) { const p = pusulaCiz(c, g, 30); p.cevir(0); },
    gelgit(c, g) { [-8, 12].forEach((y) => yol(c, g, `M -34 ${y} q 8.5 -11 17 0 t 17 0 t 17 0 t 17 0`, { renk: '#5b8def', kalin: 4 })); ok(c, g, 0, -14, 0, -34, notr); },
    gezegen(c, g) { c.S('ellipse', { cx: 0, cy: 0, rx: 33, ry: 21, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2 }, g); c.S('circle', { cx: 0, cy: 0, r: 10, fill: GUNES }, g); c.S('circle', { cx: 27, cy: -12, r: 6, fill: RENK.a }, g); },
    demir(c, g) { cekirdek(c, g, 0, 0, { n: 19, r: 7 }); },
    uranyum(c, g) { cekirdek(c, g, -19, 5, { n: 7, r: 6 }); cekirdek(c, g, 19, -5, { n: 7, r: 6 }); [[0, -30, 0, -18], [0, 18, 0, 30], [-5, -5, 5, 5]].forEach(([x1, y1, x2, y2]) => cizgi(c, g, x1, y1, x2, y2, { renk: RENK.yazi, kalin: 2 })); },
    hidrojen(c, g) { cekirdek(c, g, -24, 6, { n: 2, r: 7 }); cekirdek(c, g, 24, 6, { n: 2, r: 7 }); ok(c, g, -32, -18, -6, -18, notr); ok(c, g, 32, -18, 6, -18, notr); },
    protonlar(c, g) { cekirdek(c, g, 0, 0, { n: 4, r: 10 }); ok(c, g, 16, -16, 34, -34, notr); ok(c, g, -16, 16, -34, 34, notr); },
  };
  async function olayiBagla(c) {
    const svg = c.svg(1000, 562), BX = (i) => 50 + i * 229, BW = 213;
    const kutuG = c.S('g', {}, svg);
    KUVVET.forEach(([ad, renk], i) => { kutu(c, kutuG, BX(i), 28, BW, 264, { renk }); yazi(c, kutuG, BX(i) + BW / 2, 62, ad, { size: 24, renk }); });
    gizle(kutuG); await belir(c, kutuG);
    await c.say('Dört temel kuvveti tanıdın; şimdi olayları kuvvetlerine bağla.');
    // Karar ağacı: aşağıdaki kökten kutulara doğru.
    const agac = c.S('g', {}, svg), ak = { renk: RENK.cizgi, kalin: 2 };
    const kok = c.S('g', {}, agac), solDal = c.S('g', {}, agac), sagDal = c.S('g', {}, agac);
    yazi(c, kok, 500, 532, 'çekirdekte mi?', { size: 26 });
    cizgi(c, solDal, 420, 506, 290, 456, ak); yazi(c, solDal, 318, 500, 'hayır', { size: 22, renk: RENK.soluk });
    yazi(c, solDal, 271, 440, 'kütle mi, yük ya da mıknatıs mı?', { size: 24 });
    cizgi(c, solDal, 200, 412, 160, 300, ak); cizgi(c, solDal, 340, 412, 380, 300, ak);
    cizgi(c, sagDal, 580, 506, 710, 456, ak); yazi(c, sagDal, 682, 500, 'evet', { size: 22, renk: RENK.soluk });
    yazi(c, sagDal, 729, 440, 'yapı korunuyor mu, değişiyor mu?', { size: 24 });
    cizgi(c, sagDal, 660, 412, 620, 300, ak); cizgi(c, sagDal, 800, 412, 840, 300, ak);
    gizle(kok, solDal, sagDal);
    await belir(c, kok);
    await c.say('Önce sor: olay çekirdekte mi, çekirdeğin dışında mı gerçekleşiyor?', { speak: '[curious] Önce sor: olay çekirdekte mi, çekirdeğin dışında mı gerçekleşiyor?' });
    await belir(c, solDal);
    await c.say('Çekirdeğin dışındaysa sor: kütle mi iş görüyor, yük ya da mıknatıs mı?');
    await belir(c, sagDal);
    await c.say('Çekirdekteyse sor: yapı korunuyor mu, değişiyor mu?');
    await kaybol(c, agac);

    const sayac = [0, 0, 0, 0], yerlesen = [];
    const yerlestir = (ad, k) => {
      const n = sayac[k]++, g = c.S('g', {}, svg); ikon[ad](c, g);
      yer(g, BX(k) + 58 + (n % 2) * 97, 130 + Math.floor(n / 2) * 88, 0.95); gizle(g); belir(c, g, 300); yerlesen.push(g);
    };
    const kartGoster = (o) => {
      const g = c.S('g', {}, svg), ig = c.S('g', {}, g);
      kutu(c, g, 190, 340, 620, 150, { renk: RENK.cizgi });
      g.appendChild(ig); ikon[o.ikon](c, ig); yer(ig, 290, 415, 1.7);
      o.kart.forEach((m, i) => yazi(c, g, 580, 425 - (o.kart.length - 1) * 18 + i * 36, m, { size: 28 }));
      gizle(g); return g;
    };
    const SEC = ['Kütle çekim kuvveti', 'Elektromanyetik kuvvet', 'Güçlü nükleer kuvvet', 'Zayıf nükleer kuvvet'];
    const tur = async (ogeler) => {
      for (const o of ogeler) {
        const g = kartGoster(o);
        await belir(c, g, 250);
        await c.choice({ tag: 'Sıra sende', q: `<b>${o.ad}:</b> hangi temel kuvvetin işi?`, options: SEC, answer: o.k, hints: o.ipucu, right: o.neden,
          onPick: (i, tamam) => { if (tamam) { g.remove(); yerlestir(o.ikon, o.k); } } });
      }
    };
    const DISARIDA = 'Bu olay çekirdeğin dışında, gözünün önünde gerçekleşiyor.';
    await c.say('Her olayı kuvvetinin kutusuna bırak.', { noWait: true });
    await tur([
      { ad: 'Dalından kopan yaprağın yere düşmesi', kart: ['Yaprak dalından', 'kopup düşüyor'], ikon: 'yaprak', k: 0,
        ipucu: ['', 'Yaprakta yük ya da mıknatıs iş görmüyor; onu yere çeken, kütledir.', DISARIDA, DISARIDA], neden: 'Evet. Yaprağı yere çeken kütle çekim kuvvetidir.' },
      { ad: 'Futbolcunun havalandırdığı topun sahaya düşmesi', kart: ['Havalanan top', 'sahaya düşüyor'], ikon: 'top', k: 0,
        ipucu: ['', 'Topu yere indiren yük ya da mıknatıs değil; kütledir.', DISARIDA, DISARIDA], neden: 'Evet. Topu yere indiren kütle çekim kuvvetidir.' },
      { ad: 'İğnelerin mıknatısla toplanması', kart: ['Mıknatıs iğneleri', 'topluyor'], ikon: 'igne', k: 1,
        ipucu: ['Kütle çekimi iğneleri yere çeker; onları yukarı toplayan mıknatıstır.', '', DISARIDA, DISARIDA], neden: 'Evet. Mıknatısın çekmesi elektromanyetik kuvvettir.' },
      { ad: 'Saça sürtülen tarağın kâğıt parçalarını çekmesi', kart: ['Tarak kâğıt', 'parçalarını çekiyor'], ikon: 'tarak', k: 1,
        ipucu: ['Kâğıtları tarağa çeken kütle değil, tarağın elektrik yüküdür.', '', DISARIDA, DISARIDA], neden: 'Evet. Yüklü tarağın çekmesi elektromanyetik kuvvettir.' },
      { ad: 'Pusulayla yön bulunması', kart: ['Pusulayla yön', 'bulunuyor'], ikon: 'pusula', k: 1,
        ipucu: ['İğneyi kuzeye çeviren kütle değil, Dünya’nın manyetik alanıdır.', '', DISARIDA, DISARIDA], neden: 'Evet. Pusulanın iğnesini elektromanyetik kuvvet çevirir.' },
      { ad: 'Okyanuslarda gelgit oluşması', kart: ['Okyanusta gelgit', 'oluşuyor'], ikon: 'gelgit', k: 0,
        ipucu: ['', 'Gelgit yük ya da mıknatıs etkisi değildir; kütlelerin çekmesidir.', DISARIDA, DISARIDA], neden: 'Evet. Gelgit kütle çekim kuvvetinin etkisidir.' },
      { ad: 'Gezegenlerin Güneş’in etrafında dolanması', kart: ['Gezegenler Güneş’in', 'etrafında dolanıyor'], ikon: 'gezegen', k: 0,
        ipucu: ['', 'Gezegeni Güneş’e çeken yük ya da mıknatıs değil; kütledir.', DISARIDA, DISARIDA], neden: 'Evet. Düşen bir şey yok ama kuvvet aynı: kütle çekim.' },
    ]);
    await c.say('Bu yedi olayın hepsi çekirdeğin dışında, gözümüzün önünde gerçekleşti.');
    await sol(c, yerlesen.slice(), 0.45);
    await c.say('Şimdi çekirdekle ilgili dört olayı yerleştir.', { noWait: true });
    await tur([
      { ad: 'Demir atomunun çekirdeğinin parçalanmadan bir arada kalması', kart: ['Demir çekirdeği', 'bir arada kalıyor'], ikon: 'demir', k: 2,
        ipucu: ['Olay çekirdekte; orada iş gören kütle çekimi değildir.', 'Elektromanyetik kuvvet protonları iter; bir arada tutan başka bir kuvvettir.', '', 'Burada yapı korunuyor. Zayıf nükleer kuvvet yapıyı değiştirir.'],
        neden: 'Evet. Çekirdeği bir arada tutan güçlü nükleer kuvvettir.' },
      { ad: 'Uranyum çekirdeğinin parçalanması', kart: ['Uranyum çekirdeği', 'parçalanıyor'], ikon: 'uranyum', k: 3,
        ipucu: ['Olay çekirdekte gerçekleşiyor; kütle çekimiyle ilgili değil.', 'Parçalanmada etkili olan, yalnızca çekirdekte çalışan bir kuvvettir.', 'Güçlü nükleer kuvvet çekirdeği korur; burada yapı değişiyor.', ''],
        neden: 'Evet. Parçalanmada zayıf nükleer kuvvet etkilidir.' },
      { ad: 'Güneş’te hidrojen çekirdeklerinin birleşmesi', kart: ['Güneş’te hidrojen', 'çekirdekleri birleşiyor'], ikon: 'hidrojen', k: 2,
        ipucu: ['Çekirdekler birleşiyor; bu olay çekirdek düzeyindedir.', 'Elektromanyetik kuvvet artı yüklü çekirdekleri iter; birleştirmez.', '', 'Birleşmede etkili olan, parçacıkları bir arada tutan kuvvettir.'],
        neden: 'Evet. Birleşmede güçlü nükleer kuvvet etkilidir.' },
      { ad: 'Çekirdekteki protonların birbirini itmesi', kart: ['Çekirdekteki protonlar', 'birbirini itiyor'], ikon: 'protonlar', k: 1,
        ipucu: ['İtme, protonların kütlesinden değil elektrik yükünden doğar.', '', 'Güçlü nükleer kuvvet bir arada tutar; iten o değildir.', 'Zayıf nükleer kuvvet parçacıkları dönüştürür; iten o değildir.'],
        neden: 'Evet. Olay çekirdekte ama iten kuvvet elektromanyetiktir.' },
    ]);
    await belir(c, yerlesen, 300);
    await c.say('Çekirdekteki her olay nükleer kuvvetin işi değildir: protonların itmesi elektromanyetiktir.', { speak: '[thoughtful] Çekirdekteki her olay nükleer kuvvetin işi değildir: protonların itmesi elektromanyetiktir.' });
    const ayrim = c.S('g', {}, svg);
    yol(c, ayrim, `M ${BX(0) + 6} 304 L ${BX(0) + 6} 314 L ${BX(1) + BW - 6} 314 L ${BX(1) + BW - 6} 304`, { renk: RENK.soluk, kalin: 2 });
    yol(c, ayrim, `M ${BX(2) + 6} 304 L ${BX(2) + 6} 314 L ${BX(3) + BW - 6} 314 L ${BX(3) + BW - 6} 304`, { renk: RENK.soluk, kalin: 2 });
    yazi(c, ayrim, 271, 344, 'çekirdeğin dışında da', { size: 24, renk: RENK.soluk }); yazi(c, ayrim, 729, 344, 'yalnızca çekirdekte', { size: 24, renk: RENK.soluk });
    gizle(ayrim); await belir(c, ayrim);
    await c.say('İki kuvvet yalnızca çekirdekte, iki kuvvet çekirdeğin dışında da çalışır.');

    // Ada: ağaçtan düşen elma ve pusula.
    const ada = c.S('g', {}, svg);
    yol(c, ada, 'M 200 530 q 25 -12 50 0 t 50 0 M 700 530 q 25 -12 50 0 t 50 0', { renk: '#5b8def', kalin: 4 });
    c.S('path', { d: 'M 300 532 Q 500 418 700 532 Z', fill: '#c9a66b' }, ada);
    cizgi(c, ada, 440, 484, 440, 410, { renk: TAHTA, kalin: 9 });
    c.S('circle', { cx: 440, cy: 398, r: 30, fill: '#5a9e4b' }, ada); c.S('circle', { cx: 468, cy: 410, r: 20, fill: '#5a9e4b' }, ada);
    const elma = elmaCiz(c, ada); yer(elma, 478, 426, 0.8);
    const pus = pusulaCiz(c, ada, 32); yer(pus, 600, 446); pus.cevir(0);
    yazi(c, ada, 600, 396, 'K', { size: 22, renk: RENK.soluk });
    gizle(ada); await belir(c, ada);
    await c.choice({ tag: 'Uygula', q: 'Issız bir adada pusulanın iğnesi kuzeye hizalanıyor, ağaçtan elmalar düşüyor. Bu iki gözlemde etkili kuvvetler sırasıyla hangileri?',
      options: ['Elektromanyetik, kütle çekim', 'Kütle çekim, elektromanyetik', 'İkisinde de kütle çekim'], answer: 0,
      hints: ['', 'Sıra ters: iğneyi çeviren manyetik etkidir, elmayı düşüren kütle çekimidir.',
        'Pusulanın iğnesini yere çeken değil, kuzeye çeviren kuvveti soruyoruz. Bu, Dünya’nın manyetik alanıyla ilgili elektromanyetik kuvvettir.'],
      right: 'Evet. Önce elektromanyetik, sonra kütle çekim.' });
    const vurgu = daire(c, ada, 600, 446, 39, { renk: EM, kalin: 5 }), eOk = yeniOk(c, ada, 502, 420, 502, 474, { renk: KC });
    gizle(vurgu);
    await par(c.say('Pusulayı elektromanyetik kuvvet çevirir, elmayı kütle çekim kuvveti düşürür.'),
      sira(() => belir(c, vurgu, 400), () => c.tween(900, (e, t) => pus.cevir(40 * (1 - e) * Math.cos(t * 4 * Math.PI)), ease.out),
        () => par(okCiz(c, eOk, 500), c.tween(700, (e) => yer(elma, 478, lerp(426, 466, e), 0.8), ease.in))));
    c.note('<b>Kütle çekim:</b> düşen elma, dolanan gezegen<br><b>Elektromanyetik:</b> mıknatıs, pusula, sürtülen tarak<br><b>Güçlü nükleer:</b> çekirdeğin bir arada kalması<br><b>Zayıf nükleer:</b> çekirdeğin parçalanması',
      'Olay ve kuvveti', 'olay-kuvvet');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-d1', kicker: 'Konu D · Doğadaki temel kuvvetler', title: 'Kuvvet ve doğadaki dört temel kuvvet', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Kuvvet ve doğadaki dört temel kuvvet', hook: 'Elinden bıraktığın anahtarı yere çeken ile buzdolabındaki mıknatısı kapıda tutan aynı kuvvet mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Kuvvet ne yapar?', goal: 'Kuvvetin bir cisme neler yapabildiğini gör.', run: kuvvetNeYapar },
      { title: 'Anahtar ve mıknatıs', goal: 'İki çekmenin iki ayrı kuvvet olduğunu fark et.', run: anahtarVeMiknatis },
      { title: 'Kütle çekim kuvveti', goal: 'Kütle çekim kuvvetini olaylarıyla tanı.', run: kutleCekim },
      { title: 'Elektromanyetik kuvvet', goal: 'Elektromanyetik kuvveti olaylarıyla tanı.', run: elektromanyetik },
      { title: 'Güçlü nükleer kuvvet', goal: 'Çekirdeği bir arada tutan kuvveti tanı.', run: gucluNukleer },
      { title: 'Zayıf nükleer kuvvet', goal: 'Çekirdeğin yapısını değiştiren kuvveti tanı.', run: zayifNukleer },
      { title: 'Olayı kuvvetine bağla', goal: 'On bir olayı dört temel kuvvete ayır.', run: olayiBagla },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yaş tayininde kullanılan karbon atomları azota dönüşür. Bu dönüşümü hangi temel kuvvet sağlar?',
        options: ['Güçlü nükleer kuvvet', 'Zayıf nükleer kuvvet', 'Elektromanyetik kuvvet'], answer: 1,
        why: ['Güçlü nükleer kuvvet çekirdeğin yapısını korur; değiştirmez.', 'Karbonun azota dönüşmesi çekirdekteki parçacıkların dönüşmesidir; bunu zayıf nükleer kuvvet sağlar.',
          'Bu dönüşüm çekirdeğin içinde, parçacıkların dönüşmesiyle olur; yük ya da mıknatıs etkisi değildir.'], scene: 5 },
      { q: 'Dalından kopan yaprak yere düşüyor, bir gezegen Güneş’in etrafında dolanıyor. İkisinde etkili olan kuvvet aynı mı?',
        options: ['Hayır; kütle çekimi yalnızca Dünya’nın cisimleri çekmesidir', 'Evet; ikisi de kütle çekim kuvvetidir', 'Hayır; gezegen düşmediğine göre başka bir kuvvet etkilidir'], answer: 1,
        why: ['Kütle çekimi Dünya’ya özgü değildir; bütün maddeler kütleleri nedeniyle birbirini çeker.', 'Yaprağı Dünya, gezegeni Güneş çeker; ikisi de kütle çekim kuvvetidir.',
          'Düşme olmasa da kuvvet aynıdır: gezegen kütle çekim kuvvetinin etkisiyle dolanır.'], scene: 2 },
    ],
    summary: ['<b>Dört temel kuvvet: ikisi çekirdekte çalışır, ikisi çekirdeğin dışında da.</b>',
      'Kütle çekim kuvveti kütleleri birbirine çeker; elektromanyetik kuvvet yükler ve kutuplar arasında iter ya da çeker.',
      'Güçlü nükleer kuvvet çekirdeği bir arada tutar; zayıf nükleer kuvvet çekirdeğin yapısını değiştirir.'],
    nextLesson: { href: 'd2-benzer-ve-ayri-kuvvetler.html', label: 'Sonraki: Dört kuvvet: nerede benzer, nerede ayrı? ›' },
  });
})();
