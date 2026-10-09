/* E7 · FİZ.9.2.6 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/E-hareketin-temel-kavramlari.md ("## E7")
   Yazar notu: içerik MEB Fizik 9 s. 58, 92, 100–101 ve 105–107'den; sayılar örnek veridir. Öğrenciye kitap ya da sayfa anılmaz.
   Renk rolleri: konum RENK.mor, yol RENK.vurgu, hız RENK.r. Sürat sınırı yalnızca km ve saat, yeşil dalga yalnızca m ve saniye ile yürür. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, belir, sol, kaybol, par, ok, okCiz, kart, tablo, gosterge, araba, otobus } = KIT;
  const { lerp, ease, clamp } = Ders;
  const sakla = (el) => { [el].flat().forEach((e) => { e.style.opacity = 0; }); return el; };

  function yonCizgisi(c, p, x, y, solAd, sagAd) {
    const g = c.S('g', {}, p), L = 110, renk = RENK.soluk;
    ok(c, g, x, y, x - L, y, { renk, kalin: 3, uc: 12 });
    ok(c, g, x, y, x + L, y, { renk, kalin: 3, uc: 12 });
    c.S('circle', { cx: x, cy: y, r: 6, fill: renk }, g);
    yazi(c, g, x - L - 14, y + 9, solAd, { size: 26, renk, hiza: 'end' });
    yazi(c, g, x + L + 14, y + 9, sagAd, { size: 26, renk, hiza: 'start' });
    return g;
  }
  /* Sürat sınırı levhası: (x, y) dairenin merkezi; zemin verilirse direği de çizilir. */
  function sinirLevha(c, p, x, y, r, zemin) {
    const g = c.S('g', {}, p);
    if (zemin) cizgi(c, g, x, y + r, x, zemin, { kalin: 5 });
    daire(c, g, x, y, r, { renk: RENK.kotu, fill: '#f2f0e6', kalin: Math.max(6, r * 0.2) });
    yazi(c, g, x, y + r * 0.26, '100', { size: r * 0.72, renk: '#162038', kalin: 700 });
    return g;
  }
  /* Otoyolun kilometre levhası. */
  function kmLevha(c, p, x, zemin, metin) {
    const g = c.S('g', {}, p), w = metin.length * 15 + 34;
    cizgi(c, g, x, zemin, x, zemin - 70, { kalin: 5 });
    kart(c, g, x - w / 2, zemin - 112, w, 44, metin, { size: 24, renk: RENK.iyi, rx: 6 });
    return g;
  }
  /* Trafik ışığı: y zemindir. g.yak('k' | 'y' | null) kırmızıyı ya da yeşili yakar. */
  function isik(c, p, x, y, boy = 80) {
    const g = c.S('g', {}, p), ust = y - boy - 92;
    cizgi(c, g, x, y, x, y - boy, { kalin: 5 });
    kutu(c, g, x - 18, ust, 36, 92, { rx: 9 });
    const lamba = [18, 46, 74].map((dy) => c.S('circle', { cx: x, cy: ust + dy, r: 11, fill: RENK.ince }, g));
    g.yak = (d) => { lamba[0].setAttribute('fill', d === 'k' ? RENK.kotu : RENK.ince); lamba[2].setAttribute('fill', d === 'y' ? RENK.iyi : RENK.ince); };
    g.yak('k');
    return g;
  }
  /* Yol boyunca taşınan araç ve otobüs: taban ortası (0, 0); g.koy(x). */
  function tasit(c, p, y, cizim) {
    const g = c.S('g', {}, p);
    cizim(g);
    g.koy = (x) => g.setAttribute('transform', `translate(${x} ${y})`);
    g.koy(0);
    return g;
  }
  const arac = (c, p, y, renk) => tasit(c, p, y, (g) => araba(c, g, 0, 0, { s: 0.6, renk }));
  const otobusG = (c, p, y, s, renk) => tasit(c, p, y, (g) => otobus(c, g, 0, 0, { s, renk }));
  function sayac(c, p, x, y, w, size) {
    const g = c.S('g', {}, p);
    kutu(c, g, x - w / 2, y - size * 0.9, w, size * 1.5, { rx: 10 });
    const t = yazi(c, g, x, y + size * 0.2, '0 s', { size });
    g.yaz = (v) => { t.textContent = Math.round(v) + ' s'; };
    return g;
  }
  /* Yeşil dalgalı cadde: ışıklar 200 m arayla; k. ışık (0'dan) 20k–20k+10. saniyeler arasında yeşil. */
  const ISIK_X = [160, 400, 640, 880], cadX = (m) => 160 + m * 1.2;
  const isiklariAyarla = (isiklar, t) => isiklar.forEach((g, k) => g.yak(t >= 20 * k - 1e-6 && t <= 20 * k + 10 + 1e-6 ? 'y' : 'k'));
  /* v süratiyle giden aracın programı: ilerleme ve bekleme parçaları. Erken varan yeşili bekler, geç kalan kırmızıda kalır. */
  function program(v) {
    const parcalar = []; let t = 0, m = 0;
    for (let k = 1; k <= 3; k++) {
      parcalar.push({ t0: t, t1: t + 200 / v, m0: m, m1: m + 200 }); t += 200 / v; m += 200;
      if (t > 20 * k + 10 + 1e-6) { parcalar.push({ t0: t, t1: t + 6, m0: m, m1: m, bekle: true }); t += 6; break; }
      if (t < 20 * k - 1e-6) { parcalar.push({ t0: t, t1: 20 * k, m0: m, m1: m, bekle: true }); t = 20 * k; }
    }
    return { parcalar, son: t };
  }
  function konumu(p, t) {
    const a = p.parcalar.find((s) => t <= s.t1) || p.parcalar[p.parcalar.length - 1], u = clamp((t - a.t0) / (a.t1 - a.t0), 0, 1);
    return { m: lerp(a.m0, a.m1, u), bekleme: a.bekle ? Math.min(t, a.t1) - a.t0 : null };
  }

  /* ---- Sahne 1 · Trafikte iki durum ---- */
  async function ikiDurum(c) {
    const svg = c.svg(1000, 562);
    const h1 = sakla(c.S('g', {}, svg)), h2 = sakla(c.S('g', {}, svg));
    cizgi(c, h1, 60, 130, 440, 130, { kalin: 4 });
    yol(c, h1, 'M 62 160 L 62 172 L 438 172 L 438 160', { renk: RENK.vurgu, kalin: 3 });
    yazi(c, h1, 250, 204, 'ortalama sürat', { size: 26, renk: RENK.vurgu });
    araba(c, h1, 300, 126, { s: 0.5 });
    gosterge(c, h1, 300, 62, 30, { sayisiz: true, birim: ' ', deger: 150, renk: RENK.yazi });
    yazi(c, h1, 345, 70, 'anlık sürat', { size: 26, hiza: 'start' });
    daire(c, h2, 620, 150, 13, { renk: RENK.yazi, kalin: 4 }); c.S('circle', { cx: 620, cy: 150, r: 4, fill: RENK.yazi }, h2);
    yazi(c, h2, 620, 196, 'referans noktası', { size: 24, renk: RENK.soluk });
    ok(c, h2, 620, 150, 880, 70, { renk: RENK.mor, kalin: 6 });
    c.S('circle', { cx: 880, cy: 70, r: 7, fill: RENK.mor }, h2);
    yazi(c, h2, 780, 146, 'konum', { size: 26, renk: RENK.mor, hiza: 'start' });

    await belir(c, h1, 400);
    await c.say('Ortalama sürat bütün yolu, anlık sürat tek bir anı anlatır.');
    await belir(c, h2, 400);
    await c.say('Konum, seçilen bir referans noktasına göre söylenir.');
    await c.say('Bu kavramlar trafikte her gün kullanılır.');
    await kaybol(c, [h1, h2], 350);

    const solG = sakla(c.S('g', {}, svg)), sagG = sakla(c.S('g', {}, svg));
    cizgi(c, solG, 30, 400, 470, 400, { kalin: 4 });
    c.S('line', { x1: 30, y1: 418, x2: 470, y2: 418, stroke: RENK.ince, 'stroke-width': 4, 'stroke-dasharray': '34 26' }, solG);
    sinirLevha(c, solG, 110, 250, 46, 400);
    const bus = otobusG(c, solG, 396, 1); bus.koy(240);
    const solAd = sakla(yazi(c, solG, 250, 470, 'sürat sınırı', { size: 28, renk: RENK.vurgu }));
    cizgi(c, sagG, 530, 400, 970, 400, { kalin: 4 });
    const xs = [630, 740, 850, 950], isiklar = xs.map((x) => isik(c, sagG, x, 400, 60));
    const ar = arac(c, sagG, 396); ar.koy(560);
    const sagAd = sakla(yazi(c, sagG, 750, 470, 'yeşil dalga', { size: 28, renk: RENK.vurgu }));

    await belir(c, solG, 400);
    await par(c.say('Otoyolda araçlar için bir sürat sınırı vardır.'), belir(c, solAd, 400), c.tween(3200, (t) => bus.koy(lerp(240, 310, t)), ease.linear));
    await par(sol(c, solG, 0.4), belir(c, sagG, 400));
    await c.say('Bazı caddelerde art arda gelen trafik ışıkları birlikte ayarlanır.');
    await par(c.say('Belirli bir sabit süratle giden araç her ışığa yeşilde varır.'),
      c.tween(4200, (t) => { const x = lerp(560, 950, t); ar.koy(x); isiklar.forEach((g, k) => g.yak(x >= xs[k] - 46 ? 'y' : 'k')); }, ease.linear));
    await belir(c, sagAd, 350);
    await c.say('Bu düzene yeşil dalga denir.');

    await c.choice({ tag: 'Düşün', q: 'Bir sürücü böyle bir caddede hiç kırmızıya yakalanmadan geçti. Bu şans mı, hesap mı?',
      options: ['Şans; ışıkların ne zaman yanacağı bilinemez.', 'Hesap; yeterince hızlı giden herkes hepsini yeşilde geçer.', 'Hesap; ışıklar bir sürate göre ayarlı, sürücü o süratle gitti.'], answer: 2,
      hints: ['Bu caddede ışıklar birbirine göre ayarlanmıştır. Ayarlandıkları süratle giden araç her birine yeşilde varır.',
        'Işıklar tek bir sürate göre ayarlıdır. Daha hızlı giden, ışık yeşile dönmeden varır.', ''],
      right: 'Evet. Işıklar o sürate göre ayarlı.' });

    await c.say('Yeşil dalga bir hesaptır: konum, yol, süre ve sürat hesabı.');
    await par(sol(c, sagG, 0.4), belir(c, solG, 350));
    await c.say('Sürat sınırına uyulup uyulmadığı da aynı kavramlarla anlaşılır.');
    await par(c.say('Önce otoyoldaki bir otobüse binelim.'), c.tween(2600, (t) => bus.koy(lerp(310, 380, t)), ease.linear));
  }

  /* ---- Sahne 2 · Elif'in veri defteri ---- */
  async function veriDefteri(c) {
    const svg = c.svg(1000, 562), yolY = 470, X = (km) => 110 + km * 3.5;
    cizgi(c, svg, 0, yolY, 1000, yolY, { kalin: 4 });
    c.S('line', { x1: 0, y1: yolY + 20, x2: 1000, y2: yolY + 20, stroke: RENK.ince, 'stroke-width': 4, 'stroke-dasharray': '40 30' }, svg);
    sinirLevha(c, svg, X(120), yolY - 86, 36, yolY);
    const l0 = sakla(kmLevha(c, svg, X(0), yolY, '0 km')), l220 = sakla(kmLevha(c, svg, X(220), yolY, '220 km'));
    const bus = otobusG(c, svg, yolY - 4, 0.7); bus.koy(-70);
    const saat = sakla(c.S('g', {}, svg));
    kutu(c, saat, 50, 36, 150, 62, { rx: 10 });
    const saatYazi = yazi(c, saat, 125, 81, '9.00', { size: 38 });
    const saatKur = (dk) => { saatYazi.textContent = Math.floor(dk / 60) + '.' + String(Math.round(dk) % 60).padStart(2, '0'); };
    const t = tablo(c, svg, { x: 440, y: 40, basliksiz: true, satir: 64, size: 28, sutunlar: [{ w: 290 }, { w: 230 }] });
    const satirlar = [['alınan yol', '220 km', RENK.vurgu], ['süre', '2 saat'], ['göstergede', '95 km/h'], ['sürat sınırı', '100 km/h', RENK.kotu]].map((s) => sakla(t.satir(s.slice(0, 2), { renkler: [s[2] || RENK.soluk] })));
    const gst = gosterge(c, svg, 215, 262, 125, { max: 120, adim: 10, renk: RENK.yazi });
    sakla(gst.g);

    await belir(c, satirlar[3], 400);
    await par(c.say('Elif otobüsle otoyolda gidiyor; otobüsün sürat sınırı 100 km/h.', { speak: 'Elif otobüsle otoyolda gidiyor; otobüsün sürat sınırı yüz kilometre bölü saat.' }),
      c.tween(3000, (e) => bus.koy(lerp(-70, X(0) - 60, e)), ease.out));
    await par(belir(c, [l0, saat], 350), c.tween(700, (e) => bus.koy(lerp(X(0) - 60, X(0), e))));
    await c.say('Otobüs “0 km” levhasından saat 9’da geçiyor.', { speak: 'Otobüs sıfır kilometre levhasından saat dokuzda geçiyor.' });
    await belir(c, l220, 350);
    await par(c.say('“220 km” levhasından saat 11’de geçiyor.', { speak: 'İki yüz yirmi kilometre levhasından saat on birde geçiyor.' }),
      c.tween(3600, (u) => { bus.koy(lerp(X(0), X(220), u)); saatKur(540 + 120 * u); }, ease.linear));
    await belir(c, satirlar.slice(0, 2), 400);
    await c.say('Elif defterine yazıyor: alınan yol 220 km, süre 2 saat.', { speak: 'Elif defterine yazıyor: alınan yol iki yüz yirmi kilometre, süre iki saat.' });
    await kaybol(c, [l0, l220, saat], 300);
    await belir(c, gst.g, 400);
    await gst.git(c, 95, 900);
    await belir(c, satirlar[2], 350);
    await c.say('Yolun bir yerinde göstergeye bakıyor: 95 km/h.', { speak: 'Yolun bir yerinde göstergeye bakıyor: doksan beş kilometre bölü saat.' });
    const soz = c.S('g', {}, svg);
    kart(c, soz, 690, 356, 262, 50, 'Sınırın altındayız', { size: 24, rx: 18 });
    yol(c, soz, `M ${X(220) - 44} 404 L ${X(220) - 30} 422 L ${X(220) - 16} 404`, { fill: RENK.koyu });
    await belir(c, soz, 350);
    await c.say('Kardeşi Can “Sınırın altındayız, sorun yok” diyor.', { speak: 'Kardeşi Can sınırın altındayız, sorun yok diyor.' });

    await c.choice({ tag: 'Düşün', q: 'Elif’in gördüğü 95 km/h, otobüsün yol boyunca sınıra uyduğunu gösterir mi?',
      options: ['Göstermez; o yalnızca bir anın sürati.', 'Gösterir; gösterge sınırın altında.', 'Gösterir; gösterge ortalama sürati verir.'], answer: 0,
      hints: ['', 'Gösterge yalnızca bakıldığı anı söyler. Öteki anlarda ibrenin nerede olduğunu bu tek bakış göstermez.',
        'Göstergede okunan değer anlık sürattir. Ortalama sürat, alınan toplam yolun süreye oranıdır.'],
      right: 'Evet. Gösterge yalnızca o anı söyler.' });

    await kaybol(c, soz, 300);
    satirlar[2].querySelector('text').textContent = 'anlık sürat';
    await par(sol(c, [satirlar[0], satirlar[1], satirlar[3]], 0.4), belir(c, satirlar[2], 300));
    await c.say('Göstergede okunan değer anlık sürattir; yalnızca o anı söyler.', { speak: '[thoughtful] Göstergede okunan değer anlık sürattir; yalnızca o anı söyler.' });
    await par(sol(c, [satirlar[2], gst.g], 0.4), belir(c, satirlar.slice(0, 2), 350));
    await c.say('Bütün yol için ortalama sürate bakmak gerekir.');
  }

  /* ---- Sahne 3 · Ortalama sürat ve sınır ---- */
  async function ortalamaVeSinir(c) {
    const svg = c.svg(1000, 562), yS = 440, X = (km) => 80 + km * 3.8;
    const tA = tablo(c, svg, { x: 200, y: 30, basliksiz: true, satir: 58, size: 28, sutunlar: [{ w: 320 }, { w: 280 }] });
    const rA = [['alınan yol', '220 km', RENK.vurgu], ['süre', '2 saat'], ['sürat sınırı', '100 km/h', RENK.kotu], ['ortalama sürat', '110 km/h', RENK.vurgu]].map((s) => tA.satir(s.slice(0, 2), { renkler: [s[2] || RENK.soluk] }));
    sakla(rA[3]);
    const serit = c.S('g', {}, svg);
    cizgi(c, serit, X(0), yS, X(220), yS, { kalin: 4 });
    const isaret = (km, metin) => { const g = c.S('g', {}, serit); cizgi(c, g, X(km), yS - 10, X(km), yS + 10, { kalin: 3 }); yazi(c, g, X(km), yS + 42, metin, { size: 24, renk: RENK.soluk }); return g; };
    isaret(0, '0'); isaret(220, '220 km');
    const i100 = sakla(isaret(100, '100')), i200 = sakla(isaret(200, '200'));
    const saatAyrac = (k1, k2) => {
      const g = sakla(c.S('g', {}, serit));
      yol(c, g, `M ${X(k1) + 5} ${yS - 60} L ${X(k1) + 5} ${yS - 70} L ${X(k2) - 5} ${yS - 70} L ${X(k2) - 5} ${yS - 60}`, { renk: RENK.soluk, kalin: 3 });
      yazi(c, g, (X(k1) + X(k2)) / 2, yS - 82, '1 saat', { size: 24, renk: RENK.soluk });
      return g;
    };
    const s1 = saatAyrac(0, 100), s2 = saatAyrac(100, 200);
    const hayalet = sakla(otobusG(c, serit, yS - 4, 0.5, RENK.soluk)), bus = otobusG(c, serit, yS - 4, 0.5);
    hayalet.koy(X(0)); bus.koy(X(220));
    const fazla = sakla(cizgi(c, serit, X(200), yS, X(220), yS, { renk: RENK.kotu, kalin: 9 }));

    await c.say('Ortalama sürat, alınan toplam yolun hareket süresine oranıdır.');
    await belir(c, rA[3], 400);
    await c.say('Otobüs için: 220 / 2 = 110 km/h.', { speak: 'Otobüs için: iki yüz yirmi bölü iki eşittir yüz on kilometre bölü saat.' });
    rA[3].querySelectorAll('text')[1].style.fill = RENK.kotu;
    await sol(c, [rA[0], rA[1]], 0.4);
    await c.say('Sürat sınırı 100 km/h; ortalama sürat sınırın üstünde.', { speak: 'Sürat sınırı yüz kilometre bölü saat; [short pause] ortalama sürat sınırın üstünde.' });
    await par(sol(c, bus, 0), belir(c, hayalet, 300));
    await par(c.say('Hep 100 km/h ile gitseydi her saat 100 km alırdı.', { speak: 'Hep yüz kilometre bölü saat ile gitseydi her saat yüz kilometre alırdı.' }), (async () => {
      await c.tween(1500, (u) => hayalet.koy(lerp(X(0), X(100), u)), ease.linear); await belir(c, [s1, i100], 250);
      await c.tween(1500, (u) => hayalet.koy(lerp(X(100), X(200), u)), ease.linear); await belir(c, [s2, i200], 250);
    })());
    bus.koy(X(0)); bus.style.opacity = 1;
    await par(c.say('İki saatte en çok 200 km ederdi; oysa 220 km aldı.', { speak: 'İki saatte en çok iki yüz kilometre ederdi; oysa iki yüz yirmi kilometre aldı.' }),
      c.tween(3000, (u) => bus.koy(lerp(X(0), X(220), u)), ease.linear).then(() => belir(c, fazla, 350)));

    await c.choice({ tag: 'Düşün', q: 'Buna göre hangisi kesindir?',
      options: ['Otobüs bütün yol boyunca 110 km/h ile gitti.', 'Otobüs hiçbir an sınırı aşmadı; gösterge 95’ti.', 'Otobüs yolun bir bölümünde 100 km/h’in üstüne çıktı.'], answer: 2,
      hints: ['Ortalama, her an aynı süratle gidildiğini söylemez; Elif bir an 95 gördü. Kesin olan, bazı anlarda 100’ün aşıldığıdır.',
        '95 km/h tek bir anın süratidir. Otobüs sınırı hiç aşmasaydı 2 saatte en çok 200 km alırdı.', ''],
      right: 'Evet. Yoksa 220 km’ye yetişemezdi.' });

    await par(sol(c, fazla, 0.2, 250).then(() => belir(c, fazla, 350)));
    await c.say('Otobüs bazı anlarda 100 km/h’in üstünde gitmiş olmalı.', { speak: 'Otobüs bazı anlarda yüz kilometre bölü saatin üstünde gitmiş olmalı.' });
    await kaybol(c, [tA.g, s1, s2], 350);
    const tB = tablo(c, svg, { x: 130, y: 50, basliksiz: true, satir: 62, size: 28, sutunlar: [{ w: 300 }, { w: 240 }, { w: 200 }] });
    const rB = [['alınan yol', '220 km'], ['ortalama sürat', '110 km/h'], ['anlık sürat', '95 km/h']].map((s) => sakla(tB.satir([s[0], s[1], null], { renkler: [RENK.vurgu] })));
    await belir(c, rB.slice(0, 2), 350, 0.4);
    await belir(c, rB[2], 350);
    await c.say('Elif’in gördüğü 95 km/h tek bir andı; bütün yolu anlatmaz.', { speak: '[thoughtful] Elif’in gördüğü doksan beş kilometre bölü saat tek bir andı; bütün yolu anlatmaz.' });
    await belir(c, rB.slice(0, 2), 350);
    await c.say('Elif’in tablosunda üç kavram var: alınan yol, ortalama sürat, anlık sürat.');
    await belir(c, [0, 1, 2].map((r) => { const [x, y] = tB.hucre(r, 2); return yazi(c, tB.g, x, y, 'skaler', { size: 28, renk: RENK.soluk }); }), 400);
    await c.say('Üçü de skalerdir; yön söylemeden yazılır.');
    c.note('<b>Alınan yol 220 km; süre 2 saat; ortalama sürat 110 km/h.</b><br>Anlık sürat (bir an) 95 km/h. Sınır: 100 km/h.', 'Elif’in verileri', 'elif-veri');
  }

  /* ---- Sahne 4 · Sınıra uymak ve can güvenliği ---- */
  async function sinirVeCan(c) {
    const svg = c.svg(1000, 562);
    const levha = sakla(sinirLevha(c, svg, 420, 66, 44)), herAn = sakla(yazi(c, svg, 550, 78, 'her an', { size: 34, renk: RENK.vurgu }));
    const veriler = [
      { yol: '180 km', sure: '2 saat', sonuc: '90 km/h', renk: RENK.iyi },
      { yol: '330 km', sure: '3 saat', sonuc: '110 km/h', renk: RENK.kotu },
      { yol: '200 km', sure: '2 saat', sonuc: '100 km/h', renk: RENK.iyi, an: '120 km/h' },
    ];
    const kartlar = veriler.map((v, i) => {
      const x = 40 + i * 320, y = 136, g = sakla(c.S('g', {}, svg));
      kutu(c, g, x, y, 280, 330, {});
      yazi(c, g, x + 140, y + 40, 'Sürücü ' + (i + 1), { size: 24, renk: RENK.soluk });
      yazi(c, g, x + 140, y + 86, v.yol, { size: 32, renk: RENK.vurgu }); yazi(c, g, x + 140, y + 124, v.sure, { size: 28 });
      let an = null;
      if (v.an) {
        an = c.S('g', {}, g);
        gosterge(c, an, x + 76, y + 180, 36, { sayisiz: true, birim: ' ', deger: 120, renk: RENK.yazi });
        an.yazi = yazi(c, an, x + 190, y + 190, v.an, { size: 26 });
      }
      yazi(c, g, x + 140, y + 250, 'ortalama sürat', { size: 24, renk: RENK.soluk });
      const yuva = c.S('rect', { x: x + 30, y: y + 262, width: 220, height: 54, rx: 10, fill: 'none', stroke: RENK.ince, 'stroke-width': 3, 'stroke-dasharray': '8 6' }, g);
      return { g, yuva, an, x, y };
    });

    await belir(c, levha, 400);
    await c.say('Sürat sınırı, yoldaki herkesin can güvenliği için konur.');
    await belir(c, herAn, 400);
    await c.say('Sınıra uymak, yolun her anında sınırı aşmamaktır.');
    await c.say('Yani sürücünün anlık sürati hiçbir an 100 km/h’i geçmemelidir.', { speak: 'Yani sürücünün anlık sürati hiçbir an yüz kilometre bölü saati geçmemelidir.' });
    await belir(c, kartlar.map((k) => k.g), 450);
    await c.say('Ortalama sürat sınırın üstündeyse sınır kesinlikle aşılmıştır.');

    const sorular = [
      { q: 'Sürücü 1: 180 km, 2 saat. Ortalama sürati kaç km/h?', sec: ['90 km/h', '180 km/h', '360 km/h'], dogru: 0,
        ipucu: ['', 'Yolu süreye böl: 180 / 2.', 'Yol ile süre çarpılmaz; yol süreye bölünür: 180 / 2.'],
        q2: 'Sürücü 1’in ortalama sürati 90 km/h. 100 km/h’lik sınırla karşılaştır.', sec2: ['Ortalama sınırın altında.', 'Ortalama sınırın üstünde.', 'Ortalama sınıra eşit.'], dogru2: 0,
        ipucu2: ['', '90, 100’den küçüktür; ortalama sınırın altında.', '90, 100’e eşit değil; ortalama sınırın altında.'], onay: 'Evet. 90 km/h, sınırın altında.' },
      { q: 'Sürücü 2: 330 km, 3 saat. Ortalama sürati kaç km/h?', sec: ['100 km/h', '110 km/h', '990 km/h'], dogru: 1,
        ipucu: ['330 / 3 tam 100 etmez; bölmeyi yeniden yap.', '', 'Yol ile süre çarpılmaz; yol süreye bölünür: 330 / 3.'],
        q2: 'Sürücü 2’nin ortalama sürati 110 km/h. Sınıra uymuş olabilir mi?', sec2: ['Uymuş olabilir; ortalama her anı göstermez.', 'Uymadı; ortalama sınırın üstünde, bir yerde sınır aşıldı.', 'Uydu; ortalama sınırın altında.'], dogru2: 1,
        ipucu2: ['Hep 100 km/h ile gitse 3 saatte en çok 300 km alırdı. 330 km aldığına göre bir yerde sınırı aştı.', '', '110, 100’den büyüktür; ortalama sınırın üstünde.'], onay: 'Evet. Yolun bir yerinde sınır aşıldı.' },
      { q: 'Sürücü 3: 200 km, 2 saat. Ortalama sürati kaç km/h?', sec: ['120 km/h', '400 km/h', '100 km/h'], dogru: 2,
        ipucu: ['120 km/h göstergede bir an görülen değerdir. Ortalama için yolu süreye böl: 200 / 2.', 'Yol ile süre çarpılmaz; yol süreye bölünür: 200 / 2.', ''],
        q2: 'Sürücü 3’ün ortalaması 100 km/h; bir an göstergede 120 km/h görüldü. Sınıra uydu mu?', sec2: ['Uydu; ortalaması sınırı aşmıyor.', 'Uymadı; 120 km/h görülen an sınır aşıldı.', 'Uymadı; ortalaması sınırın üstünde.'], dogru2: 1,
        ipucu2: ['Ortalama 100 km/h, ama gösterge bir an 120 km/h’ti. Sınır her an için geçerlidir; o an aşılmıştır.', '', 'Ortalama 100 km/h; sınırı aşmıyor. Göstergedeki 120 km/h’e bak.'], onay: 'Evet. Sınır o an aşıldı.' },
    ];
    await c.say('Üç sürücünün ortalama süratini bul, sınırla karşılaştır.', { noWait: true });
    for (let i = 0; i < 3; i++) {
      const K = kartlar[i], S = sorular[i], v = veriler[i];
      kartlar.forEach((k, n) => { k.g.style.opacity = n === i ? 1 : 0.5; });
      let sonuc = null;
      await c.choice({ tag: 'Sıra sende', q: S.q, options: S.sec, answer: S.dogru, hints: S.ipucu, right: `Evet. ${v.sonuc}.`,
        onPick: (k, dogru) => { if (dogru) { sonuc = yazi(c, K.g, K.x + 140, K.y + 300, v.sonuc, { size: 30 }); belir(c, sonuc, 300); } } });
      await c.choice({ tag: 'Sıra sende', q: S.q2, options: S.sec2, answer: S.dogru2, hints: S.ipucu2, right: S.onay,
        onPick: (k, dogru) => {
          if (!dogru) return;
          K.yuva.setAttribute('stroke', v.renk); K.yuva.removeAttribute('stroke-dasharray'); sonuc.style.fill = v.renk;
          if (K.an) { K.an.yazi.style.fill = RENK.kotu; daire(c, K.an, K.x + 76, K.y + 180, 43, { renk: RENK.kotu, kalin: 4 }); }
        } });
    }
    kartlar.forEach((k, n) => { k.g.style.opacity = n === 2 ? 1 : 0.5; });
    await c.say('Üçüncü sürücünün ortalaması sınırı aşmadı, ama bir an 120 km/h gitti.', { speak: 'Üçüncü sürücünün ortalaması sınırı aşmadı, ama bir an yüz yirmi kilometre bölü saat gitti.' });
    await c.say('Ortalama sürat, sınırın aşıldığı anları gizleyebilir.', { speak: '[thoughtful] Ortalama sürat, sınırın aşıldığı anları gizleyebilir.' });
    await belir(c, kartlar.map((k) => k.g), 350);
    await c.say('Sınıra uyan sürücü kendini de yoldaki herkesi de korur.');
    await c.say('Bu, topluma karşı bir görevdir.');
  }

  /* ---- Sahne 5 · Yeşil dalga: konumlar ve varış anları ---- */
  async function yesilDalga(c) {
    const svg = c.svg(1000, 562), yS = 290;
    yonCizgisi(c, svg, 500, 40, 'Batı', 'Doğu');
    cizgi(c, svg, 40, yS, 960, yS, { kalin: 4 });
    const isiklar = ISIK_X.map((x, k) => { const g = isik(c, svg, x, yS); yazi(c, g, x, yS - 184, String(k + 1), { size: 24, renk: RENK.soluk }); return g; });
    yazi(c, svg, 26, yS - 184, 'ışık', { size: 22, renk: RENK.soluk, hiza: 'start' });
    const halka = sakla(c.S('g', {}, svg));
    daire(c, halka, ISIK_X[0], yS, 15, { renk: RENK.yazi, kalin: 4 }); yazi(c, halka, ISIK_X[0], yS + 106, 'referans noktası', { size: 24, renk: RENK.soluk });
    const konumOk = [1, 2, 3].map((k) => ok(c, svg, ISIK_X[0], yS + 12 + k * 17, ISIK_X[k], yS + 12 + k * 17, { renk: RENK.mor, kalin: 5, uc: 15 }));
    konumOk.forEach((o) => { o.style.display = 'none'; });
    const satir = (y, ad, degerler, renk) => ({ ad: sakla(yazi(c, svg, 26, y, ad, { size: 22, renk: RENK.soluk, hiza: 'start' })), d: degerler.map((d, k) => sakla(yazi(c, svg, ISIK_X[k], y, String(d), { size: 28, renk }))) });
    const konum = satir(452, 'konum (m)', [0, 200, 400, 600], RENK.mor), varis = satir(504, 'varış (s)', [0, 20, 40, 60], RENK.yazi);
    const krono = sakla(sayac(c, svg, 95, 50, 110, 28));
    const ar = sakla(arac(c, svg, yS - 4)), surat = sakla(yazi(c, ar, 0, -42, '10 m/s', { size: 24, renk: RENK.vurgu }));
    ar.koy(cadX(0));
    const an = (t) => { ar.koy(cadX(10 * t)); krono.yaz(t); isiklariAyarla(isiklar, t); };
    const ilerle = (t0, t1, ms) => c.tween(ms, (u) => an(lerp(t0, t1, u)), ease.linear);

    await c.say('Düz bir caddede art arda dört trafik ışığı var.');
    await belir(c, halka, 400);
    await c.say('Referans noktası olarak birinci ışığı seçelim.');
    await belir(c, [konum.ad, konum.d[0]], 300);
    await par(c.say('Işıkların konumları doğu yönünde 0, 200, 400 ve 600 m.', { speak: 'Işıkların konumları doğu yönünde sıfır, iki yüz, dört yüz ve altı yüz metre.' }), (async () => {
      for (let k = 0; k < 3; k++) { konumOk[k].style.display = ''; await okCiz(c, konumOk[k], 500); await belir(c, konum.d[k + 1], 250); }
    })());
    an(0);
    await belir(c, [ar, krono], 400);
    await c.say('Bir araç birinci ışıktan yeşilde geçiyor; kronometre o an başlıyor.');
    await belir(c, surat, 350);
    await c.say('Araç 10 m/s sabit süratle ilerliyor.', { speak: 'Araç on metre bölü saniye sabit süratle ilerliyor.' });
    await par(c.say('Her saniye 10 m yol alıyor.', { speak: 'Her saniye on metre yol alıyor.' }), ilerle(0, 5, 2400));
    await par(c.say('İkinci ışığa kadar 200 m var; bu 20 saniye sürer.', { speak: 'İkinci ışığa kadar iki yüz metre var; bu yirmi saniye sürer.' }), ilerle(5, 20, 3600));
    await belir(c, [varis.ad, varis.d[0], varis.d[1]], 350);

    await c.choice({ tag: 'Uygula', q: 'Araç dördüncü ışığa kaçıncı saniyede varır?', options: ['20. saniyede', '40. saniyede', '60. saniyede'], answer: 2,
      hints: ['20 saniye, art arda iki ışık arasında geçen süredir. Dördüncü ışık 600 m’de; araç oraya 60 saniyede varır.',
        '40. saniyede araç 400 m’dedir, yani üçüncü ışıkta. Dördüncü ışık 200 m daha ileride.', ''],
      right: 'Evet. 600 m, 10 m/s ile 60 saniye sürer.' });

    await par(c.say('Araç ışıklara 0, 20, 40 ve 60. saniyede varır.', { speak: 'Araç ışıklara sıfır, yirmi, kırk ve altmışıncı saniyede varır.' }), (async () => {
      await ilerle(20, 40, 1900); await belir(c, varis.d[2], 250); await ilerle(40, 60, 1900); await belir(c, varis.d[3], 250);
    })());
    await c.say('Işıklar tam bu anlarda yeşile dönecek biçimde ayarlanmış.');
    an(0);
    await par(c.say('Araç hiç durmadan dört ışıktan da yeşilde geçer.'), ilerle(0, 60, 4600));
    await c.say('Kullandığımız kavramlar: referans noktası, konum ve sürat.');
    c.note('<b>Yeşil dalga, 10 m/s</b><br>Işık 1: 0 m, 0. saniye<br>Işık 2: 200 m, 20. saniye<br>Işık 3: 400 m, 40. saniye<br>Işık 4: 600 m, 60. saniye', 'Varış anları', 'varis-anlari');
  }

  /* ---- Sahne 6 · Daha hızlı giden kazanır mı? ---- */
  async function hizliGiden(c) {
    const svg = c.svg(1000, 562), yS = 250;
    cizgi(c, svg, 40, yS, 960, yS, { kalin: 4 });
    const isiklar = ISIK_X.map((x) => isik(c, svg, x, yS));
    ['0', '200', '400', '600 m'].forEach((m, k) => yazi(c, svg, ISIK_X[k], yS + 64, m, { size: 24, renk: RENK.mor }));
    const aralik = ['0–10 s', '20–30 s', '40–50 s', '60–70 s'].map((m, k) => sakla(yazi(c, svg, ISIK_X[k], yS - 186, m, { size: 24, renk: RENK.iyi })));
    const krono = sayac(c, svg, 500, 392, 190, 44);
    /* Araç: üstünde sürat etiketi ya da bekleme süresi. */
    const tasitKur = (renk) => {
      const g = arac(c, svg, yS - 4, renk);
      g.etiket = yazi(c, g, 0, -42, '', { size: 24, renk: renk || RENK.vurgu });
      g.bekleme = yazi(c, g, -70, -10, '', { size: 24, renk: RENK.kotu });
      return g;
    };
    const ar = sakla(tasitKur()); ar.koy(cadX(0));
    /* t anındaki durumu çizer: aracın yeri, bekleme süresi, kronometre, ışıklar. */
    const ciz = (g, p, t, o = {}) => {
      const d = konumu(p, t);
      g.koy(cadX(d.m));
      g.bekleme.textContent = d.bekleme != null && d.bekleme > 0.4 ? Math.round(d.bekleme) + ' s' : '';
            if (!o.yalnizArac) { krono.yaz(t); isiklariAyarla(isiklar, t); }
    };
    const oynat = (g, p, t0, t1, ms, gecerli = () => true) => c.tween(ms, (u) => { if (gecerli()) ciz(g, p, lerp(t0, t1, u)); }, ease.linear);
    const zaman = (t) => { krono.yaz(t); isiklariAyarla(isiklar, t); };
    const P20 = program(20), P10 = program(10), P5 = program(5);
    zaman(0);

    await belir(c, aralik[0], 300);
    await c.say('Bu caddede her ışık 10 saniye yeşil kalıyor.', { speak: 'Bu caddede her ışık on saniye yeşil kalıyor.' });
    await belir(c, aralik[1], 300);
    await c.say('İkinci ışık 20. ile 30. saniye arasında yeşil.', { speak: 'İkinci ışık yirminci ile otuzuncu saniye arasında yeşil.' });
    await belir(c, aralik.slice(2), 300);
    await par(c.say('Üçüncü ışık 40–50, dördüncü ışık 60–70. saniyeler arasında yeşil.', { speak: 'Üçüncü ışık kırk ile elli, dördüncü ışık altmış ile yetmişinci saniyeler arasında yeşil.' }),
      c.tween(5200, (u) => zaman(72 * u), ease.linear));
    zaman(0); isiklar[0].yak('k');
    ar.etiket.textContent = '20 m/s';
    await belir(c, ar, 400);
    await c.say('Acelesi olan bir sürücü aynı caddeye 20 m/s ile giriyor.', { speak: 'Acelesi olan bir sürücü aynı caddeye yirmi metre bölü saniye ile giriyor.' });
    zaman(0);
    await c.say('O da birinci ışıktan sıfırıncı saniyede, yeşilde geçiyor.');

    await c.choice({ tag: 'Tahmin et', q: 'Bu sürücü ikinci ışığa vardığında ne görür?',
      options: ['Yeşil; hızlı giden bütün ışıklara yetişir.', 'Kırmızı; ışık henüz yeşile dönmemiştir.', 'Yeşil; ilk ışığı yeşilde geçen hepsini yeşilde geçer.'], answer: 1,
      hints: ['20 m/s ile 200 m, 10 saniye sürer. Işık 20. saniyede yeşile döner; sürücü erken varır ve kırmızıda bekler.', '',
        'İlk ışığı yeşilde geçmek yetmez; öteki ışıklara doğru anda varmak gerekir. Bu sürücü ikinci ışığa 10 saniye erken varır.'],
      right: 'Evet. Erken varır; ışık hâlâ kırmızıdır.' });

    await par(c.say('Sürücü her saniye 20 m alır; 200 m’ye 10. saniyede varır.', { speak: 'Sürücü her saniye yirmi metre alır; iki yüz metreye onuncu saniyede varır.' }), oynat(ar, P20, 0, 10, 2600));
    await par(c.say('Işık 20. saniyede yeşile döner; sürücü 10 saniye kırmızıda bekler.', { speak: 'Işık yirminci saniyede yeşile döner; sürücü on saniye kırmızıda bekler.' }), oynat(ar, P20, 10, 20, 3400));
    await c.say('İkinci ışıktan en erken 20. saniyede geçebilir.', { speak: 'İkinci ışıktan en erken [short pause] yirminci saniyede geçebilir.' });
    const golge = tasitKur(RENK.soluk); golge.etiket.textContent = '10 m/s'; golge.etiket.setAttribute('y', 30);
    svg.insertBefore(golge, ar);
    ciz(golge, P10, 0, { yalnizArac: true }); ciz(ar, P20, 0);
    await par(c.say('10 m/s ile giden araç da oradan 20. saniyede geçmişti.', { speak: 'On metre bölü saniye ile giden araç da oradan yirminci saniyede geçmişti.' }),
      c.tween(4200, (u) => { ciz(golge, P10, 20 * u, { yalnizArac: true }); ciz(ar, P20, 20 * u); }, ease.linear));

    /* Dene: üç sürat için önce tahmin, sonra benzetim. */
    golge.remove(); ar.etiket.textContent = '';
    const SURAT = [5, 10, 20], PROG = { 5: P5, 10: P10, 20: P20 };
    const cipler = SURAT.map((v, k) => {
      const g = sakla(c.S('g', {}, svg)), x = 250 + k * 250;
      g.kutu = kutu(c, g, x - 90, 474, 180, 58, { rx: 12, renk: RENK.ince });
      yazi(c, g, x - 14, 513, v + ' m/s', { size: 28 });
      g.nokta = c.S('circle', { cx: x + 62, cy: 503, r: 10, fill: RENK.ince }, g);
      return g;
    });
    const sec = (v) => cipler.forEach((g, k) => { const a = SURAT[k] === v; g.kutu.setAttribute('stroke', a ? RENK.vurgu : RENK.ince); g.kutu.setAttribute('stroke-width', a ? 5 : 3); });
    const sonuc = (v) => cipler[SURAT.indexOf(v)].nokta.setAttribute('fill', v === 10 ? RENK.iyi : RENK.kotu);
    await belir(c, cipler, 400);
    await c.say('Her sürat için önce tahmin et, sonra izle.', { noWait: true });
    const secenek = ['Yeşil; 20. saniyede varır.', 'Kırmızı; 10. saniyede varır, bekler.', 'Kırmızı; 40. saniyede varır, yeşil bitmiştir.'];
    const denemeler = [
      { v: 10, dogru: 0, onay: 'Evet. Tam ışık yeşile dönerken varır.',
        ipucu: ['', '10 m/s ile 200 m, 20 saniye sürer; araç ışık yeşile dönerken varır.', '10 m/s ile 200 m, 20 saniye sürer; ışık 20–30. saniyelerde yeşildir.'] },
      { v: 20, dogru: 1, onay: 'Evet. Erken varan bekler.',
        ipucu: ['Araç 10. saniyede varır; ışık 20. saniyede yeşile döner. Erken varan bekler.', '', '20 m/s ile 200 m, 10 saniye sürer; araç geç değil, erken varır.'] },
      { v: 5, dogru: 2, onay: 'Evet. Yavaş giden de tutturamaz.',
        ipucu: ['5 m/s ile 200 m, 40 saniye sürer. İkinci ışığın yeşili 30. saniyede biter; araç geç kalır.', '5 m/s ile 200 m, 40 saniye sürer; araç erken değil, geç varır.', ''] },
    ];
    for (const d of denemeler) {
      sec(d.v); ciz(ar, PROG[d.v], 0);
      await c.choice({ tag: 'Tahmin et', q: `Araç <b>${d.v} m/s</b> ile gidiyor. İkinci ışığa (200 m) vardığında ne görür?`, options: secenek, answer: d.dogru, hints: d.ipucu, right: d.onay });
      await oynat(ar, PROG[d.v], 0, PROG[d.v].son, PROG[d.v].son * 105);
      sonuc(d.v);
      await c.wait(500);
    }
    /* Serbest deneme: kaydırıcı benzetimi yeniden oynatır. */
    let kosu = 0, ilk = true;
    const kaydirici = c.slider({ label: 'Sürat', min: 0, max: 2, step: 1, value: 1, fmt: (k) => SURAT[k] + ' m/s',
      onInput: (k) => {
        if (ilk) { ilk = false; return; }
        const no = ++kosu, v = SURAT[k];
        sec(v);
        oynat(ar, PROG[v], 0, PROG[v].son, PROG[v].son * 105, () => no === kosu).catch(() => {});
      } });
    await c.cont('Devam ›');
    kosu++; kaydirici.remove();
    sec(10); ciz(ar, P10, 60);
    await c.say('Yalnızca 10 m/s ile giden araç hiç durmadan geçti.', { speak: 'Yalnızca on metre bölü saniye ile giden araç [short pause] hiç durmadan geçti.' });
    await c.say('Durup yeniden kalkmayan araç daha az yakıt harcar.');
    await kaybol(c, krono, 300);
    await belir(c, yazi(c, svg, 500, 404, 'yakıt tasarrufu', { size: 34, renk: RENK.iyi }), 400);
    await c.say('Yeşil dalga böylece yakıt tasarrufu sağlar.');
    await c.say('Az yakıt harcamak, israftan kaçınmak ve kaynakları sürdürülebilir kullanmaktır.');
  }

  /* ---- Sahne 7 · İki senaryo, tek tablo ---- */
  async function tekTablo(c) {
    const svg = c.svg(1000, 562);
    const t = tablo(c, svg, { x: 70, y: 36, satir: 58, size: 28, sutunlar: [{ ad: 'kavram', w: 270 }, { ad: 'senaryodaki veri', w: 290 }, { ad: 'skaler / vektörel', w: 300 }] });
    const veriler = [
      ['alınan yol', '220 km', 'skaler', RENK.vurgu], ['ortalama sürat', '110 km/h', 'skaler', RENK.vurgu], ['anlık sürat', '95 km/h', 'skaler', RENK.vurgu],
      ['referans noktası', 'birinci ışık', 'nicelik değil', RENK.yazi], ['konum', '200 m doğuda', 'vektörel', RENK.mor, RENK.mor],
      ['sürat', '10 m/s', 'skaler', RENK.vurgu], ['hız', 'doğuya 10 m/s', 'vektörel', RENK.r, RENK.r],
    ];
    /* Her satır: veri hücresi (g) ile kavram ve tür hücreleri (ek); vektörel satırda türün yanında küçük ok. */
    const satirlar = veriler.map(([kavram, veri, tur, renk, okRenk], r) => {
      const g = sakla(t.satir([null, veri, null])), [x0, y] = t.hucre(r, 0), [x2] = t.hucre(r, 2), ek = sakla(c.S('g', {}, g));
      yazi(c, ek, x0, y, kavram, { size: 28, renk }); yazi(c, ek, x2, y, tur, { size: 28, renk: RENK.soluk });
      if (okRenk) ok(c, ek, x2 + 72, y - 9, x2 + 114, y - 9, { renk: okRenk, kalin: 5, uc: 13 });
      return { g, ek, x0, y };
    });
    const ekle = (r) => { satirlar[r].ek.style.opacity = 1; return belir(c, satirlar[r].g, 400); };

    await c.say('İki senaryodaki verileri tek tabloda toplayalım.');
    await belir(c, satirlar.slice(0, 3).map((s) => s.g), 400);
    await c.say('Otobüste üç veri vardı: 220 km, 110 km/h ve 95 km/h.', { speak: 'Otobüste üç veri vardı: iki yüz yirmi kilometre, yüz on kilometre bölü saat ve doksan beş kilometre bölü saat.' });
    await belir(c, satirlar.slice(0, 3).map((s) => s.ek), 400);
    await c.say('Bunlar alınan yol, ortalama sürat ve anlık sürattir; üçü de skalerdir.');
    await sol(c, satirlar.slice(0, 3).map((s) => s.g), 0.6);
    await ekle(3);
    await c.say('Caddede birinci ışık referans noktasıydı; o bir nicelik değildir.');
    await ekle(4);
    await c.say('“200 m doğuda” bir konumdur; konum vektöreldir.', { speak: 'İki yüz metre doğuda bir konumdur; konum vektöreldir.' });
    await ekle(5);
    await c.say('Aracın 10 m/s’lik sürati skalerdir.', { speak: 'Aracın on metre bölü saniyelik sürati skalerdir.' });
    await ekle(6);
    await c.say('Yönü de söylersek, doğuya 10 m/s, aracın hızı olur.', { speak: 'Yönü de söylersek, doğuya on metre bölü saniye, aracın hızı olur.' });

    await c.choice({ tag: 'Düşün', q: 'Yeşil dalgayı kuran kişi, ışıkların yeşile dönme anlarını neye göre belirler?',
      options: ['Rastgele; trafik düzeni fizik hesabıyla kurulmaz.', 'Işıkların konumlarına ve seçilen sürate göre.', 'Hepsini aynı anda yeşil yakarak.'], answer: 1,
      hints: ['Trafik düzeni hareketin kavramlarıyla kurulur. Işıklar arası yol ve sürat, yeşile dönme anını belirler: 200 m, 10 m/s, 20 saniye.', '',
        'Araç ikinci ışığa 20, üçüncüye 40. saniyede varır. Her ışık, aracın varacağı anda yeşile dönmelidir.'],
      right: 'Evet. Konum ve sürat, varış anını verir.' });

    await belir(c, satirlar.map((s) => s.g), 350);
    await c.say('Trafiği düzenleyen kurallar, hareketin kavramlarıyla kurulur ve denetlenir.');

    /* Dene: aynı tabloda altı satırın kavram ve tür hücreleri kapanır; doğru eşleştirmeyle yeniden açılır. */
    const esler = [
      { satir: 0, tam: 'İki levha arası 220 km', sec: ['alınan yol', 'konum', 'ortalama sürat'], dogru: 0,
        ipucu: ['', 'Konum bir referans noktasına göre yönüyle söylenir; burada gidilen yolun uzunluğu var.', 'Ortalama sürat için yolu süreye bölmek gerekir; bu yalnızca yolun uzunluğu.'] },
      { satir: 2, tam: 'Göstergede o an 95 km/h', sec: ['ortalama sürat', 'anlık sürat', 'hız'], dogru: 1,
        ipucu: ['Ortalama sürat bütün yolu anlatır; gösterge yalnızca o anı söyler.', '', 'Hız için yön de söylenmelidir; göstergede yön yok.'] },
      { satir: 1, tam: '220 km bölü 2 saat', sec: ['anlık sürat', 'alınan yol', 'ortalama sürat'], dogru: 2,
        ipucu: ['Anlık sürat göstergede okunur; burada bütün yol bütün süreye bölünüyor.', 'Alınan yol yalnızca 220 km’dir; burada süreye bölünüyor.', ''] },
      { satir: 3, tam: 'Birinci ışık', sec: ['konum', 'referans noktası', 'sürat'], dogru: 1,
        ipucu: ['Konum, bu noktaya göre söylenen yerdir; birinci ışık ise seçilen noktanın kendisi.', '', 'Sürat bir niceliktir; birinci ışık ise seçilen bir noktadır.'] },
      { satir: 4, tam: 'İkinci ışık, birinci ışığın 200 m doğusunda', sec: ['alınan yol', 'konum', 'hız'], dogru: 1,
        ipucu: ['Burada bir referans noktası ve bir yön var. Referans noktasına göre yönüyle söylenen yer, konumdur.', '', 'Hızın birimi m/s’dir; burada bir yer tarif ediliyor.'] },
      { satir: 6, tam: 'Doğuya 10 m/s', sec: ['sürat', 'hız', 'konum'], dogru: 1,
        ipucu: ['Sürat yön taşımaz: yalnızca 10 m/s. Yön de söylendiği için bu bir hızdır.', '', 'Konum metreyle söylenir; burada m/s var.'] },
    ];
    await sol(c, esler.map((e) => satirlar[e.satir].ek), 0, 350);
    await c.say('Her veriyi anlattığı kavramla eşleştir.', { noWait: true });
    for (const e of esler) {
      const S = satirlar[e.satir];
      satirlar.forEach((s2) => { s2.g.style.opacity = s2 === S ? 1 : 0.6; });
      const soru = yazi(c, S.g, S.x0, S.y, '?', { size: 28, renk: RENK.soluk });
      await c.choice({ tag: 'Sıra sende', q: `<b>“${e.tam}”</b> hangi kavramı anlatır?`, options: e.sec, answer: e.dogru, hints: e.ipucu, right: 'Evet.',
        onPick: (k, dogru) => { if (dogru) { soru.remove(); belir(c, S.ek, 300); } } });
    }
    await belir(c, satirlar.map((s2) => s2.g), 350);
    await c.say('<b>Sürat sınırı canı, yeşil dalga yakıtı korur.</b>');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-e7', kicker: 'Konu E · Hareketin temel kavramları', title: 'Trafikte hareketin kavramları: sürat sınırı ve yeşil dalga', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'Trafikte hareketin kavramları: sürat sınırı ve yeşil dalga', hook: 'Bir caddede hiç kırmızıya yakalanmadan bütün ışıklardan geçmek şans mı, hesap mı?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Trafikte iki durum', goal: 'Sürat sınırını ve yeşil dalgayı tanı.', run: ikiDurum },
      { title: 'Elif’in veri defteri', goal: 'Göstergedeki değerin neyi söylediğini bul.', run: veriDefteri },
      { title: 'Ortalama sürat ve sınır', goal: 'Ortalama sürati sınırla karşılaştır.', run: ortalamaVeSinir },
      { title: 'Sınıra uymak ve can güvenliği', goal: 'Üç sürücünün sınıra uyup uymadığını belirle.', run: sinirVeCan },
      { title: 'Yeşil dalga: konumlar ve varış anları', goal: 'Aracın ışıklara varış anlarını hesapla.', run: yesilDalga },
      { title: 'Daha hızlı giden kazanır mı?', goal: 'Üç süratle yeşil dalgayı dene.', run: hizliGiden },
      { title: 'İki senaryo, tek tablo', goal: 'Verileri kavramlarıyla eşleştir.', run: tekTablo },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir otobüs için şu veri kaydedilmiş: iki levha arasındaki 300 km’yi 3 saatte gitti. Bu iki veriyle hangi kavram hesaplanır?',
        options: ['Ortalama sürat', 'Anlık sürat', 'Konum'], answer: 0,
        why: ['Alınan toplam yolun hareket süresine oranı ortalama sürattir: 300 / 3 = 100 km/h.', 'Anlık sürat göstergede okunur; yol ve süreden hesaplanmaz.', 'Konum, referans noktasına göre yönüyle söylenir; burada yol ve süre var.'], scene: 2 },
      { q: 'Bir caddenin ışıkları 10 m/s süratle giden araca göre ayarlı. 20 m/s ile giden sürücü ışıklara daha erken varır; neden zaman kazanmaz?',
        options: ['Çünkü hızlı giden araç daha çok yol alır.', 'Aslında kazanır; hızlı giden bütün ışıkları yeşilde geçer.', 'Çünkü ışık henüz yeşile dönmemiştir; kırmızıda bekler.'], answer: 2,
        why: ['İki araç da aynı yolu alır; fark ışıklara varış anındadır.', 'Işıklar tek bir sürate göre ayarlıdır; hızlı giden erken varır ve kırmızıya yakalanır.', 'Yeşile dönme anları sabittir; erken varan bekler ve 10 m/s ile giden araçla aynı anda geçer.'], scene: 5 },
      { q: 'Bir sahil yolunda yeşil dalga kurulmuş: birinci ışık referans noktası, üç ışık doğu yönünde 0, 300 ve 600 m konumunda. Işıklar 5 m/s sabit süratle giden elektrikli bir scooter’a göre ayarlı; scooter birinci ışıktan geçerken kronometre başlıyor. Üçüncü ışık kaçıncı saniyede yeşile dönmelidir?',
        options: ['60. saniyede', '120. saniyede', '180. saniyede'], answer: 1,
        why: ['60. saniye ikinci ışığın anıdır: 300 / 5. Üçüncü ışık 600 m’dedir.', 'Üçüncü ışık 600 m’de; 600 / 5 = 120 saniye.', '60 ile 120’yi toplamışsın; varış anları toplanmaz, her biri konumdan hesaplanır: 600 / 5.'], scene: 4 },
      { q: 'Bir tır şoförü 400 km’lik yolu 5 saatte gidiyor ve “Ortalamam 80 km/h; bu yolda sınır 90 km/h olduğuna göre hiçbir an sınırı aşmadım” diyor. Şoförün sonucu veriden kesin çıkar mı?',
        options: ['Çıkmaz; ortalama bütün yolu anlatır, bazı anlarda 90’ın üstüne çıkılmış olabilir', 'Çıkar; ortalama sınırın altındaysa her an sınırın altında gidilmiştir', 'Çıkmaz; ortalama sınırın altındaysa sınır kesinlikle aşılmıştır'], answer: 0,
        why: ['Evet. 400 / 5 = 80 km/h; ortalama her anı göstermez, sınır ise her an için geçerlidir.', 'Ortalama her anı göstermez: 80 km/h ortalamayla giden biri bir an 90’ı geçebilir.', 'Ortalama sınırın altındaysa aşıldığı kesin değildir; kesin olan, ortalama sınırın üstündeyse aşıldığıdır.'], scene: 3 },
    ],
    summary: ['<b>Sürat sınırı canı, yeşil dalga yakıtı korur.</b>', 'Göstergedeki değer anlık sürattir; ortalama sürat sınırın üstündeyse sınır kesinlikle aşılmıştır.', 'Yeşil dalgada ışıklar, konumlarına ve seçilen sürate göre ayarlanır; erken varan bekler.'],
    nextLesson: { href: 'e8-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
