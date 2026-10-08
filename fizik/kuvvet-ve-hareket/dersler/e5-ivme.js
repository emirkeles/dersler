/* E5 · FİZ.9.2.6 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/E-hareketin-temel-kavramlari.md ("## E5")
   Yazar notu: içerik MEB Fizik 9 s. 99–100, 107 ve 110'dan. Öğrenciye kitap ya da sayfa anılmaz.
   Renk rolleri: hız okları RENK.r, ivme okları RENK.b. Grafik çizilmez; öğrenciye ivme hesabı sorulmaz. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, belir, sol, kaybol, par, ok, okCiz, kart, gosterge, araba, insan } = KIT;
  const { lerp, ease } = Ders;
  const sakla = (el) => { [el].flat().forEach((e) => { e.style.opacity = 0; }); return el; };

  /* Yön çizgisi: ortada nokta, iki yana ok, uçlarda ad. */
  function yonCizgisi(c, p, x, y, solAd, sagAd, o = {}) {
    const g = c.S('g', {}, p), L = o.boy || 110, renk = RENK.soluk, s = o.size || 26;
    ok(c, g, x, y, x - L, y, { renk, kalin: 3, uc: 12 });
    ok(c, g, x, y, x + L, y, { renk, kalin: 3, uc: 12 });
    c.S('circle', { cx: x, cy: y, r: 6, fill: renk }, g);
    yazi(c, g, x - L - 14, y + s * 0.34, solAd, { size: s, renk, hiza: 'end' });
    yazi(c, g, x + L + 14, y + s * 0.34, sagAd, { size: s, renk, hiza: 'start' });
    return g;
  }
  /* Yolda duran ya da ilerleyen araç; üstünde hız oku, istenirse altında ivme oku. g.koy(x, hızOkuBoyu) */
  function hareketli(c, p, y, o = {}) {
    const g = c.S('g', {}, p);
    araba(c, g, 0, -2, { s: 0.5, renk: o.renk || RENK.a });
    const h = ok(c, g, 0, -46, 0, -46, { renk: RENK.r, kalin: 6, uc: 16 });
    if (o.ivme) ok(c, g, 0, 30, o.ivme, 30, { renk: RENK.b, kalin: 6, uc: 16 });
    g.koy = (x, boy) => { g.setAttribute('transform', `translate(${x} ${y})`); h.ayarla(0, -46, boy, -46); };
    g.koy(0, 0);
    return g;
  }
  /* Otobüsteki bir anın küçük kartı: eğik duran yolcu, başlık, altında değer; g.rozet(metin, renk) üçüncü satırı yazar. */
  function anKart(c, p, x, y, baslik, alt, egim) {
    const g = c.S('g', {}, p);
    kutu(c, g, x, y, 280, 118, { rx: 12 });
    insan(c, c.S('g', { transform: `rotate(${egim} ${x + 48} ${y + 100})` }, g), x + 48, y + 100, { s: 0.85 });
    yazi(c, g, x + 180, y + 40, baslik, { size: 26, renk: RENK.vurgu });
    if (alt) yazi(c, g, x + 180, y + 74, alt, { size: 26 });
    g.rozet = (metin, renk) => belir(c, yazi(c, g, x + 180, y + (alt ? 106 : 84), metin, { size: 24, renk }), 350);
    return sakla(g);
  }
  function kesir(c, p, x, y, ust, alt, o = {}) {
    const g = c.S('g', {}, p), s = o.size || 30, w = o.w || 130;
    yazi(c, g, x, y - 14, ust, { size: s });
    cizgi(c, g, x - w / 2, y, x + w / 2, y, { renk: RENK.yazi, kalin: 3 });
    yazi(c, g, x, y + s + 4, alt, { size: s });
    return g;
  }

  /* ---- Sahne 1 · Otobüste üç an ---- */
  async function otobuste(c) {
    const svg = c.svg(1000, 562), ana = c.S('g', {}, svg);
    cizgi(c, ana, 0, 394, 1000, 394, { kalin: 4 });
    const serit = c.S('line', { x1: -100, y1: 412, x2: 1100, y2: 412, stroke: RENK.ince, 'stroke-width': 5, 'stroke-dasharray': '46 34' }, ana);
    const bus = c.S('g', {}, ana);
    kutu(c, bus, 60, 196, 500, 172, { renk: RENK.a, rx: 20 });
    c.S('rect', { x: 82, y: 214, width: 456, height: 140, rx: 8, fill: '#1c2947', stroke: RENK.a, 'stroke-width': 2 }, bus);
    cizgi(c, bus, 96, 232, 524, 232, { renk: RENK.soluk, kalin: 3 });
    [150, 470].forEach((x) => daire(c, bus, x, 370, 24, { renk: RENK.a, fill: RENK.koyu, kalin: 4 }));
    c.S('circle', { cx: 548, cy: 340, r: 6, fill: RENK.vurgu }, bus);
    const s = 1.2, fx = 300, fy = 352, yolcu = c.S('g', {}, bus);
    daire(c, yolcu, fx, fy - 78 * s, 11 * s, { renk: RENK.yazi, kalin: 4 });
    yol(c, yolcu, `M ${fx} ${fy - 67 * s} L ${fx} ${fy - 30 * s} L ${fx - 13 * s} ${fy} M ${fx} ${fy - 30 * s} L ${fx + 13 * s} ${fy}`, { renk: RENK.yazi, kalin: 4 });
    cizgi(c, bus, fx + 30, 232, fx + 30, 258, { renk: RENK.soluk, kalin: 3 });
    const kol = cizgi(c, bus, 0, 0, 0, 0, { renk: RENK.yazi, kalin: 4 });
    const egil = (a) => {
      yolcu.setAttribute('transform', `rotate(${a} ${fx} ${fy})`);
      const r = a * Math.PI / 180, d = 56 * s;
      kol.setAttribute('x1', fx + d * Math.sin(r)); kol.setAttribute('y1', fy - d * Math.cos(r)); kol.setAttribute('x2', fx + 30); kol.setAttribute('y2', 258);
    };
    const hizOk = ok(c, ana, 130, 160, 130, 160, { renk: RENK.r, kalin: 7, uc: 20 });
    const hizAd = sakla(yazi(c, ana, 118, 170, 'hız', { size: 28, renk: RENK.r, hiza: 'end' }));
    const gst = gosterge(c, ana, 815, 200, 130, { max: 100, adim: 10, renk: RENK.yazi });
    sakla(gst.g);
    const st = { v: 50, off: 0 };
    const ciz = () => { gst.ayarla(st.v); hizOk.ayarla(130, 160, 130 + st.v * 4, 160); serit.setAttribute('stroke-dashoffset', st.off); };
    /* Otobüs ms süresince v0'dan v1'e geçer; şerit çizgileri akar, yolcu "egim" derece eğilir. */
    const surus = (ms, v0, v1, egim = 0) => {
      const off0 = st.off;
      return c.tween(ms, (t) => {
        st.v = lerp(v0, v1, t); st.off = off0 + ms * 0.0048 * (v0 * t + (v1 - v0) * t * t / 2);
        egil(egim * Math.min(1, t * 6, (1 - t) * 6)); ciz();
      }, ease.linear);
    };
    const kes = async (v) => { await sol(c, ana, 0.12, 220); st.v = v; egil(0); ciz(); await belir(c, ana, 260); };
    egil(0);

    await par(belir(c, hizAd, 300), c.tween(600, (e) => hizOk.ayarla(130, 160, 130 + 200 * e, 160), ease.out));
    await par(c.say('Hız, birim zamanda yapılan yer değiştirmedir; yönü vardır.'), surus(4300, 50, 50));
    await par(belir(c, gst.g, 400), c.tween(900, (e) => gst.ayarla(50 * e)));
    await par(c.say('Bir otobüs doğuya gidiyor, göstergesi 50 km/h gösteriyor.', { speak: 'Bir otobüs doğuya gidiyor, göstergesi elli kilometre bölü saat gösteriyor.' }), surus(4300, 50, 50));
    const yonAd = yazi(c, ana, 345, 170, 'doğuya 50 km/h', { size: 28, renk: RENK.r, hiza: 'start' });
    await belir(c, yonAd, 300);
    await par(c.say('Otobüsün anlık hızı doğu yönünde 50 km/h’tir.', { speak: 'Otobüsün anlık hızı doğu yönünde elli kilometre bölü saattir.' }), surus(3600, 50, 50));
    await kaybol(c, yonAd, 250);

    const kalkis = anKart(c, svg, 40, 434, 'kalkış', '0 → 50', -14), duz = anKart(c, svg, 360, 434, 'düz yol', '50', 0), fren = anKart(c, svg, 680, 434, 'fren', '50 → 0', 14);
    await kes(0);
    await par(c.say('Otobüs duraktan kalkarken ayaktaysan geriye doğru savrulursun.'), surus(3600, 0, 50, -15));
    await belir(c, kalkis, 350);
    await par(c.say('Şoför frene basınca bu kez öne doğru savrulursun.'), surus(3400, 50, 0, 15));
    await belir(c, fren, 350);
    await kes(50);
    await par(c.say('Düz yolda gösterge 50’de dururken ise savrulmazsın.', { speak: 'Düz yolda gösterge ellide dururken ise savrulmazsın.' }), surus(3800, 50, 50));
    await belir(c, duz, 350);
    await kes(0);
    await par(c.say('Kalkarken gösterge sıfırdan yukarı çıkar, frende aşağı iner.'),
      (async () => { await surus(1700, 0, 50, -15); await c.wait(350); await surus(1700, 50, 0, 15); })());

    await c.choice({ tag: 'Düşün', q: 'Kalkış ile frenin ortak yanı nedir?',
      options: ['İkisinde de otobüs çok hızlı gidiyor.', 'İkisinde de otobüsün hızı değişiyor.', 'İkisinde de otobüs aynı yöne doğru hızlanıyor.'], answer: 1,
      hints: ['Kalkış anında otobüs daha yeni hareketleniyor, hızı küçük. Ortak olan hızın büyük olması değil, değişmesidir.', '',
        'Frende otobüs hızlanmaz, yavaşlar. İki anda ortak olan, göstergenin kıpırdaması, yani hızın değişmesidir.'],
      right: 'Evet. İkisinde de gösterge kıpırdıyor: hız değişiyor.' });

    await par(kalkis.rozet('değişiyor', RENK.vurgu), fren.rozet('değişiyor', RENK.vurgu));
    await c.say('Kalkışta hız artar, frende azalır; ikisinde de hız değişir.');
    await kes(50);
    await duz.rozet('değişmiyor', RENK.soluk);
    await par(c.say('Gösterge 50’de dururken hız değişmez.', { speak: 'Gösterge ellide dururken hız değişmez.' }), surus(3000, 50, 50));
    await c.say('Hızın nasıl değiştiğini anlatan bir nicelik var; şimdi onu tanıyacağız.');
  }

  /* ---- Sahne 2 · İki araç, dört saniye ---- */
  async function ikiArac(c) {
    const svg = c.svg(1000, 562);
    const yon = sakla(yonCizgisi(c, svg, 500, 44, '−', '+', { size: 40 }));
    const X = (m) => 110 + 48 * m, yK = 250, yL = 470;
    const serit = (y, ad) => {
      const g = sakla(c.S('g', {}, svg));
      cizgi(c, g, 80, y, 990, y, { kalin: 3 });
      yazi(c, g, 40, y - 6, ad, { size: 36, renk: RENK.a });
      return g;
    };
    const etiket = (y) => sakla([yazi(c, svg, 40, y - 62, 'm/s', { size: 22, renk: RENK.r }), yazi(c, svg, 40, y + 42, 's', { size: 24, renk: RENK.soluk })]);
    /* Bir ölçüm anı: araç, üstünde hız değeri ve oku, altında saniye. */
    const damga = (y, m, v, t) => {
      const a = sakla(hareketli(c, svg, y)); a.koy(X(m), 0);
      const yz = sakla([yazi(c, svg, X(m), y - 64, String(v), { size: 26, renk: RENK.r }), yazi(c, svg, X(m), y + 42, String(t), { size: 24, renk: RENK.soluk })]);
      return { a, yz, m, v };
    };
    const olc = (d) => par(belir(c, d.yz, 250), c.tween(350, (e) => d.a.koy(X(d.m), 12 * d.v * e), ease.out));

    await belir(c, yon, 400);
    await c.say('Düz bir yolun sağına artı yön, soluna eksi yön diyelim.');
    const sK = serit(yK, 'K'), K = [0, 1, 2, 3, 4].map((t) => damga(yK, t * t, 2 * t, t)), gezK = sakla(hareketli(c, svg, yK));
    gezK.koy(X(0), 0);
    await belir(c, [sK, gezK], 400);
    await par(c.say('K aracı durgun hâlden harekete başlıyor ve artı yönde ilerliyor.', { speak: 'Ke aracı durgun hâlden harekete başlıyor ve artı yönde ilerliyor.' }),
      c.tween(3600, (t) => { const T = 4 * t; gezK.koy(X(T * T), 0); K.forEach((d, i) => { if (T >= i) d.a.style.opacity = 1; }); }, ease.linear));
    gezK.remove();
    await belir(c, etiket(yK), 300);
    await par(c.say('Hızı her saniye ölçülüyor: 0, 2, 4, 6, 8 m/s.', { speak: 'Hızı her saniye ölçülüyor: sıfır, iki, dört, altı, sekiz metre bölü saniye.' }),
      (async () => { for (const d of K) { await olc(d); await c.wait(280); } })());

    const sL = serit(yL, 'L'), L0 = damga(yL, 0, 4, 0);
    await belir(c, [sL, L0.a, ...etiket(yL)], 400);
    await olc(L0);
    await c.say('L aracı da artı yönde gidiyor; sürücüsü frene basıyor.', { speak: 'Le aracı da artı yönde gidiyor; sürücüsü frene basıyor.' });
    const gezL = hareketli(c, svg, yL), L4 = damga(yL, 8, 0, 4);
    await par(c.say('L’nin hızı 4 saniyede 4 m/s’den sıfıra iniyor.', { speak: 'Le aracının hızı dört saniyede dört metre bölü saniyeden sıfıra iniyor.' }),
      c.tween(3400, (t) => { const T = 4 * t; gezL.koy(X(4 * T - T * T / 2), 12 * (4 - T)); }, ease.linear));
    L4.a.style.opacity = 1; gezL.remove();
    await belir(c, L4.yz, 300);

    await c.choice({ tag: 'Düşün', q: 'Bu 4 saniye boyunca hangi aracın hızı değişti?', options: ['Yalnız K’nin', 'Yalnız L’nin', 'İkisinin de'], answer: 2,
      hints: ['L’nin hızı da değişti: 4 m/s’den sıfıra indi. Azalma da bir değişimdir.', 'K’nin hızı 0’dan 8 m/s’ye çıktı. Artma da bir değişimdir.', ''],
      right: 'Evet. Biri arttı, öteki azaldı; ikisi de değişti.' });

    await c.say('Hız artsa da azalsa da değişmiş olur.', { speak: '[thoughtful] Hız artsa da azalsa da değişmiş olur.' });
    await kaybol(c, K.slice(1, 4).flatMap((d) => [d.a, ...d.yz]), 350);
    await belir(c, [yazi(c, svg, 500, yK - 50, '8 m/s arttı', { size: 32, renk: RENK.r }), yazi(c, svg, 770, yL - 50, '4 m/s azaldı', { size: 32, renk: RENK.r })], 400);
    await c.say('K’nin hızı 8 m/s arttı, L’nin hızı 4 m/s azaldı.', { speak: 'Ke aracının hızı sekiz metre bölü saniye arttı, le aracının hızı dört metre bölü saniye azaldı.' });
    await c.say('İki aracın ortak yanı: hızları zamanla değişiyor.');
  }

  /* ---- Sahne 3 · İvme: tanım ve model ---- */
  async function tanim(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg);
    const tanimKart = sakla(kart(c, g1, 50, 36, 560, 84, 'İvme: birim zamandaki hız değişimi', { renk: RENK.b, size: 29 }));
    const sem = sakla(c.S('g', {}, g1));
    yazi(c, sem, 716, 102, 'a', { size: 64, renk: RENK.b }); ok(c, sem, 696, 50, 738, 50, { renk: RENK.b, kalin: 4, uc: 11 });
    yazi(c, sem, 860, 100, 'm/s²', { size: 44 });
    const model = sakla(c.S('g', {}, g1));
    yazi(c, model, 345, 242, 'İvme  =', { size: 38, renk: RENK.b, hiza: 'end' });
    kesir(c, model, 500, 230, 'Hız değişimi', 'Zaman', { size: 34, w: 250 });
    const satir = (x, ad, ust, sonuc) => {
      const ad1 = sakla(yazi(c, g1, x, 432, ad, { size: 38, renk: RENK.a }));
      const k = sakla(kesir(c, g1, x + 130, 420, ust, '4 s', { size: 30, w: 140 }));
      const s = sakla(yazi(c, g1, x + 216, 431, sonuc, { size: 34, renk: RENK.b, hiza: 'start' }));
      return { ad: ad1, k, s, x };
    };

    await belir(c, tanimKart, 400);
    await c.say('Hareketlinin birim zamandaki hız değişimine ivme denir.', { speak: 'Hareketlinin birim zamandaki hız değişimine, [short pause] ivme denir.' });
    await belir(c, sem, 400);
    await c.say('İvmenin sembolü a, birimi metre bölü saniyekaredir: m/s².', { speak: 'İvmenin sembolü a, birimi metre bölü saniyekaredir.' });
    await belir(c, model, 400);
    await c.say('İvme, hız değişiminin zamana bölünmesiyle bulunur.');
    const K = satir(70, 'K', '8 m/s', '= +2 m/s²');
    await belir(c, [K.ad, K.k], 400);
    await c.say('K’nin hız değişimi 8 m/s, geçen zaman 4 saniye.', { speak: 'Ke aracının hız değişimi sekiz metre bölü saniye, geçen zaman dört saniye.' });
    await belir(c, K.s, 400);
    await c.say('K’nin ivmesi +2 m/s²: hızı her saniye 2 m/s artıyor.', { speak: 'Ke aracının ivmesi artı iki metre bölü saniyekare: hızı her saniye iki metre bölü saniye artıyor.' });
    await kaybol(c, K.k, 300);
    await c.tween(400, (e) => K.s.setAttribute('x', lerp(K.x + 216, K.x + 40, e)));
    const L = satir(480, 'L', '−4 m/s', '= −1 m/s²');
    await belir(c, [L.ad, L.k], 400);
    await c.say('L’nin hız değişimi −4 m/s, geçen zaman yine 4 saniye.', { speak: 'Le aracının hız değişimi eksi dört metre bölü saniye, geçen zaman yine dört saniye.' });
    await belir(c, L.s, 400);
    await c.say('L’nin ivmesi −1 m/s²: saniye başına 1 m/s azalma.', { speak: 'Le aracının ivmesi eksi bir metre bölü saniyekare: saniye başına bir metre bölü saniye azalma.' });

    await c.choice({ tag: 'Düşün', q: 'K aracı 4. saniyede 8 m/s hızla gidiyor; ivmesi 2 m/s². İvme neyi söyler?',
      options: ['Hızın her saniye ne kadar değiştiğini', 'Aracın o an ne kadar hızlı gittiğini', 'Aracın 4 saniyede aldığı yolu'], answer: 0,
      hints: ['', 'Onu hız söyler: 8 m/s. İvme, hızın her saniye ne kadar değiştiğidir: 2 m/s².', 'İvme bir uzunluk değildir; birimi m/s²’dir. Hızın birim zamandaki değişimini verir.'],
      right: 'Evet. K’nin hızı her saniye 2 m/s değişiyor.' });

    await kaybol(c, g1, 350);
    const hizK = sakla(kart(c, svg, 130, 170, 320, 150, ['hız', '8 m/s'], { renk: RENK.r, size: 40, ara: 60 }));
    const ivmeK = sakla(kart(c, svg, 550, 170, 320, 150, ['ivme', '2 m/s²'], { renk: RENK.b, size: 40, ara: 60 }));
    await belir(c, [hizK, ivmeK], 400);
    await c.say('Hız “ne kadar hızlı” der; ivme “hız ne kadar çabuk değişiyor” der.');
    await belir(c, [yazi(c, svg, 290, 380, 'birim: m/s', { size: 30, renk: RENK.r }), yazi(c, svg, 710, 380, 'birim: m/s²', { size: 30, renk: RENK.b })], 400);
    await c.say('Birimleri de ayrıdır: hız m/s, ivme m/s².', { speak: 'Birimleri de ayrıdır: hız metre bölü saniye, ivme metre bölü saniyekare.' });
    c.note('<b>İvme = hız değişimi / zaman</b>; sembolü a, birimi m/s².<br>Örnek: hız 4 saniyede 0’dan 8 m/s’ye çıkar: +2 m/s².', 'İvme', 'ivme');
  }

  /* ---- Sahne 4 · İvmenin yönü ---- */
  async function ivmeYonu(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg);
    const yon = sakla(yonCizgisi(c, g1, 500, 44, '−', '+', { size: 40 }));
    const lej = sakla(c.S('g', {}, svg));
    ok(c, lej, 800, 36, 860, 36, { renk: RENK.r, kalin: 6, uc: 16 }); yazi(c, lej, 872, 45, 'hız', { size: 26, renk: RENK.r, hiza: 'start' });
    ok(c, lej, 800, 78, 860, 78, { renk: RENK.b, kalin: 6, uc: 16 }); yazi(c, lej, 872, 87, 'ivme', { size: 26, renk: RENK.b, hiza: 'start' });
    const serit = (y, ad) => { const g = sakla(c.S('g', {}, g1)); cizgi(c, g, 70, y, 960, y, { kalin: 3 }); yazi(c, g, 40, y - 6, ad, { size: 36, renk: RENK.a }); return g; };

    await belir(c, [yon, lej], 400);
    await c.say('İvme vektörel bir niceliktir: büyüklüğü de yönü de vardır.');
    const sK = serit(220, 'K'), kG = sakla(hareketli(c, g1, 220, { ivme: 80 }));
    kG.koy(140, 0);
    await belir(c, [sK, kG], 400);
    await par(c.say('K artı yönde gidiyor; ivmesi de artı yönde.', { speak: 'Ke aracı artı yönde gidiyor; ivmesi de artı yönde.' }), c.tween(3600, (t) => { const T = 4 * t; kG.koy(140 + 26 * T * T, 48 * T); }, ease.linear));
    await belir(c, yazi(c, g1, 870, 200, 'aynı yön', { size: 28, renk: RENK.vurgu }), 350);
    await c.say('Araç hızlanırken hızı ve ivmesi aynı yönlüdür.');
    const sL = serit(410, 'L'), lG = sakla(hareketli(c, g1, 410, { ivme: -40 }));
    lG.koy(140, 96);
    await belir(c, [sL, lG], 400);
    await par(c.say('L de artı yönde gidiyor; ama ivmesi eksi yönde.', { speak: 'Le aracı da artı yönde gidiyor; ama ivmesi eksi yönde.' }), c.tween(3600, (t) => { const T = 3 * t; lG.koy(140 + 52 * (4 * T - T * T / 2), 24 * (4 - T)); }, ease.linear));
    await belir(c, yazi(c, g1, 870, 390, 'zıt yön', { size: 28, renk: RENK.vurgu }), 350);
    await c.say('Araç yavaşlarken hızı ve ivmesi zıt yönlüdür.');

    await kaybol(c, g1, 350);
    const g2 = c.S('g', {}, svg), y2 = 300, X = (m) => 100 + 19 * m;
    const yon2 = sakla(yonCizgisi(c, g2, 500, 44, 'Batı', 'Doğu')), yolG = sakla(cizgi(c, g2, 60, y2, 960, y2, { kalin: 3 }));
    const hayalet = (m, v) => { const a = sakla(hareketli(c, g2, y2)); a.koy(X(m), 10 * v); return a; };
    const h0 = hayalet(0, 0), h1 = hayalet(4.5, 6), h2 = hayalet(18, 12), h3 = hayalet(36, 6);
    const gez = sakla(hareketli(c, g2, y2)); gez.koy(X(0), 0);
    const ayrac = (m1, m2, metin) => {
      const g = sakla(c.S('g', {}, g2));
      yol(c, g, `M ${X(m1) + 4} ${y2 + 50} L ${X(m1) + 4} ${y2 + 60} L ${X(m2) - 4} ${y2 + 60} L ${X(m2) - 4} ${y2 + 50}`, { renk: RENK.soluk, kalin: 3 });
      yazi(c, g, (X(m1) + X(m2)) / 2, y2 + 98, metin, { size: 26, renk: RENK.soluk });
      return g;
    };
    await belir(c, [yon2, yolG, gez], 400);
    await c.say('Yeni bir araç doğuya doğru durgun hâlden harekete başlıyor.');
    h0.style.opacity = 0.5;
    await par(c.say('Önce 3 saniyede hızını 12 m/s’ye çıkarıyor.', { speak: 'Önce üç saniyede hızını on iki metre bölü saniyeye çıkarıyor.' }),
      c.tween(3200, (t) => { const T = 3 * t; gez.koy(X(2 * T * T), 40 * T); if (T >= 1.5) h1.style.opacity = 0.5; }, ease.linear));
    h2.style.opacity = 0.5;
    await belir(c, [ayrac(0, 18, 'hızlanıyor, 3 s'), yazi(c, g2, X(18) + 60, y2 - 64, '12 m/s', { size: 26, renk: RENK.r })], 350);
    await par(c.say('Sonra 4 saniye boyunca düzgün yavaşlayıp duruyor.', { speak: 'Sonra dört saniye boyunca düzgün yavaşlayıp duruyor.' }),
      c.tween(3600, (t) => { const T = 4 * t; gez.koy(X(18 + 12 * T - 1.5 * T * T), 10 * (12 - 3 * T)); if (T >= 2) h3.style.opacity = 0.5; }, ease.linear));
    await belir(c, ayrac(18, 42, 'yavaşlıyor, 4 s'), 350);

    await c.choice({ tag: 'Düşün', q: 'Bu araç yavaşlarken ivmesi hangi yöndedir?',
      options: ['Doğuya; ivme hep hareket yönündedir.', 'Batıya; hıza zıt yönde.', 'Yavaşlayan aracın ivmesi yoktur.'], answer: 1,
      hints: ['İvme her zaman hareket yönünde olmaz. Araç doğuya giderken yavaşlıyor; ivmesi hızına zıt, yani batıya.', '',
        'Hız azalıyor, yani değişiyor; hız değişiyorsa ivme vardır. Yavaşlarken ivme hıza zıt yöndedir.'],
      right: 'Evet. Hız doğuya, ivme batıya.' });

    await okCiz(c, ok(c, g2, X(36), y2 + 28, X(36) - 80, y2 + 28, { renk: RENK.b, kalin: 7, uc: 18 }), 500);
    await c.say('Araç hep doğuya gitti; yavaşlarken ivmesi batıyaydı.');
    await okCiz(c, ok(c, g2, X(4.5), y2 + 28, X(4.5) + 80, y2 + 28, { renk: RENK.b, kalin: 7, uc: 18 }), 500);
    await c.say('Hızlanırken ivmesi doğuyaydı: iki bölümün ivmeleri zıt yönlü.');
    await c.say('Yavaşlayan aracın da ivmesi vardır; yalnızca hızına zıttır.');
    c.note('<b>Hızlanırken hız ile ivme aynı yönlü, yavaşlarken zıt yönlüdür.</b><br>Örnek: L aracı; hız “+” yönde, ivme “−” yönde.', 'İvmenin yönü', 'ivme-yonu');
  }

  /* ---- Sahne 5 · Hız değişmiyorsa ivme yok ---- */
  async function sabitHiz(c) {
    const svg = c.svg(1000, 562), g1 = c.S('g', {}, svg), gA = c.S('g', {}, g1), gK = c.S('g', {}, g1);
    cizgi(c, g1, 40, 150, 960, 150, { kalin: 3 });
    c.S('line', { x1: 40, y1: 168, x2: 960, y2: 168, stroke: RENK.ince, 'stroke-width': 4, 'stroke-dasharray': '40 30' }, g1);
    const arac = hareketli(c, g1, 150); arac.koy(110, 150);
    const serit = (p, y, h, degerler, size) => degerler.map((d, i) => {
      const g = sakla(c.S('g', {}, p));
      kutu(c, g, 180 + i * 110, y, 100, h, { rx: 8 }); yazi(c, g, 230 + i * 110, y + h / 2 + size * 0.35, String(d), { size });
      return g;
    });
    const otuz = serit(gA, 210, 64, [30, 30, 30, 30, 30], 32);
    const birimA = sakla(yazi(c, gA, 742, 254, 'm/s', { size: 26, renk: RENK.soluk, hiza: 'start' }));

    await par(c.say('Düz bir otoyolda bir araç 30 m/s sabit hızla gidiyor.', { speak: 'Düz bir otoyolda bir araç otuz metre bölü saniye sabit hızla gidiyor.' }),
      c.tween(4000, (t) => arac.koy(lerp(110, 330, t), 150), ease.linear));
    birimA.style.opacity = 1;
    await par(c.say('Beş ölçümde de hızı aynı: 30, 30, 30, 30, 30 m/s.', { speak: 'Beş ölçümde de hızı aynı: otuz, otuz, otuz, otuz, otuz metre bölü saniye.' }),
      c.tween(4600, (t) => { arac.koy(lerp(330, 790, t), 150); otuz.forEach((g, i) => { if (t >= i / 5) g.style.opacity = 1; }); }, ease.linear));
    await belir(c, [yazi(c, gA, 455, 322, 'hız değişimi 0', { size: 30, renk: RENK.vurgu }), yazi(c, gA, 890, 254, 'ivme yok', { size: 28, renk: RENK.b })], 400);
    await c.say('Hız değişimi sıfır; bu aracın ivmesi yoktur.', { speak: 'Hız değişimi sıfır; [short pause] bu aracın ivmesi yoktur.' });
    const kSerit = serit(gK, 392, 58, [0, 2, 4, 6, 8], 28);
    kSerit.push(sakla(yazi(c, gK, 130, 432, 'K', { size: 34, renk: RENK.a })), sakla(yazi(c, gK, 742, 432, 'm/s', { size: 26, renk: RENK.soluk, hiza: 'start' })));
    await belir(c, kSerit, 400);
    await belir(c, yazi(c, gK, 890, 432, 'ivme var', { size: 28, renk: RENK.b }), 350);
    await c.say('K aracı en çok 8 m/s’ye çıkmıştı, ama ivmesi vardı.', { speak: 'Ke aracı en çok sekiz metre bölü saniyeye çıkmıştı, ama ivmesi vardı.' });

    await c.choice({ tag: 'Uygula', q: 'Bir tren düz rayda 40 m/s sabit hızla gidiyor. Bir bisikletli 2 m/s’den 6 m/s’ye hızlanıyor. Hangisi doğrudur?',
      options: ['Tren daha hızlı; ivmesi de daha büyüktür.', 'İkisi de hareketli; ikisinin de ivmesi vardır.', 'Bisikletlinin ivmesi vardır, trenin yoktur.'], answer: 2,
      hints: ['Hızlı gitmek ivme demek değildir. Trenin hızı hiç değişmiyor; hız değişmiyorsa ivme yoktur.',
        'İvme için hareket etmek yetmez, hızın değişmesi gerekir. Trenin hızı 40 m/s’de sabit.', ''],
      right: 'Evet. Hızı değişen yalnızca bisikletli.' });

    await c.say('İvmeyi hızın büyüklüğü değil, hızın değişmesi belirler.', { speak: '[thoughtful] İvmeyi hızın büyüklüğü değil, hızın değişmesi belirler.' });
    await sol(c, gK, 0.3);
    await c.say('Çok hızlı giden bir cismin ivmesi olmayabilir.');
    await par(sol(c, gA, 0.3), belir(c, gK, 350));
    await c.say('Yeni kalkan, yavaş bir cismin ise ivmesi vardır.');
    await kaybol(c, g1, 350);
    const kartlar = [anKart(c, svg, 40, 200, 'kalkış', null, -14), anKart(c, svg, 360, 200, 'sabit hız', null, 0), anKart(c, svg, 680, 200, 'fren', null, 14)];
    await belir(c, kartlar, 400);
    await par(kartlar[0].rozet('ivme var', RENK.b), kartlar[2].rozet('ivme var', RENK.b));
    await kartlar[1].rozet('ivme yok', RENK.soluk);
    await c.say('Otobüste de böyleydi: kalkışta ve frende ivme vardı, sabit hızda yoktu.');
  }

  /* ---- Sahne 6 · Dört araç, üç soru ---- */
  async function dortArac(c) {
    const svg = c.svg(1000, 562);
    const araclar = [
      { ad: 'A', v: [0, 3, 6, 9], degisim: 0, yon: 0,
        yokIpucu: 'A’nın hızı 0’dan 9 m/s’ye çıkıyor; değişiyor. Hız değişiyorsa ivme vardır.' },
      { ad: 'B', v: [12, 8, 4, 0], degisim: 1, yon: 1,
        yokIpucu: 'B’nin hızı azalıyor, yani değişiyor: ivmesi var. Yavaşlayan aracın ivmesi harekete terstir.' },
      { ad: 'C', v: [1, 2, 3, 4], degisim: 0, yon: 0,
        yokIpucu: 'C yavaş gidiyor ama hızı her saniye artıyor. Hız değişiyorsa ivme vardır.' },
      { ad: 'D', v: [25, 25, 25, 25], degisim: 2, yon: -1 },
    ];
    const Y = (i) => 122 + i * 116;
    const basliklar = sakla([yazi(c, svg, 412, 50, 'm/s', { size: 24, renk: RENK.soluk }), yazi(c, svg, 700, 50, 'hız', { size: 26, renk: RENK.r }), yazi(c, svg, 880, 50, 'ivme', { size: 26, renk: RENK.b })]);
    const satirlar = araclar.map((a, i) => {
      const g = sakla(c.S('g', {}, svg)), y = Y(i);
      yazi(c, g, 40, y + 12, a.ad, { size: 34, renk: RENK.a });
      araba(c, g, 112, y + 24, { s: 0.5 });
      ok(c, g, 148, y, 206, y, { renk: RENK.r, kalin: 5, uc: 14 });
      a.v.forEach((v, k) => { kutu(c, g, 240 + k * 88, y - 30, 80, 60, { rx: 8 }); yazi(c, g, 280 + k * 88, y + 10, String(v), { size: 28 }); });
      const yuva = [625, 805].map((x) => c.S('rect', { x, y: y - 30, width: 150, height: 60, rx: 8, fill: 'none', stroke: RENK.ince, 'stroke-width': 2, 'stroke-dasharray': '7 6' }, g));
      return { g, y, yuva };
    });
    /* Hız yuvası: iki hız oku yan yana (kısa → uzun: hızlanıyor; uzun → kısa: yavaşlıyor; eşit: değişmiyor). */
    const egilim = (i, tur) => {
      const y = Y(i), g = c.S('g', {}, svg), b = [[30, 70], [70, 30], [52, 52]][tur];
      ok(c, g, 640, y, 640 + b[0], y, { renk: RENK.r, kalin: 5, uc: 14 });
      ok(c, g, 760 - b[1], y, 760, y, { renk: RENK.r, kalin: 5, uc: 14 });
      return belir(c, g, 350);
    };

    await belir(c, satirlar.map((s) => s.g), 500);
    await c.say('Dört aracın hızı birer saniye arayla dört kez ölçüldü.');
    await belir(c, basliklar[0], 300);
    await c.say('Her araç için önce şunu sor: hız değişiyor mu?', { speak: '[curious] Her araç için önce şunu sor: hız değişiyor mu?' });
    await belir(c, basliklar.slice(1), 300);
    await c.say('Değişiyorsa ivme vardır; sonra artıyor mu, azalıyor mu diye bak.');
    await c.say('Hız artıyorsa ivme hareket yönündedir, azalıyorsa harekete terstir.');

    await c.say('Her araç için soruları sırayla cevapla.', { noWait: true });
    for (let i = 0; i < araclar.length; i++) {
      const a = araclar[i], y = Y(i), sayilar = a.v.join(', '), ivmeli = a.degisim !== 2;
      satirlar.forEach((s, k) => { s.g.style.opacity = k === i ? 1 : 0.45; });
      let varYazi = null;
      await c.choice({ tag: 'Sıra sende', q: `<b>${a.ad}</b> aracı doğuya gidiyor: ${sayilar} m/s. İvmesi var mı?`, options: ['Var', 'Yok'], answer: ivmeli ? 0 : 1,
        hints: ivmeli ? ['', a.yokIpucu] : ['D en hızlı araç, ama hızı hep 25 m/s. Hız değişmiyorsa ivme yoktur.', ''],
        right: ivmeli ? 'Evet. Hız değişiyor; ivme var.' : 'Evet. Hız hep 25 m/s; ivme yok.',
        onPick: (k, dogru) => { if (dogru) { varYazi = yazi(c, svg, 880, y + 10, ivmeli ? 'var' : 'yok', { size: 28, renk: ivmeli ? RENK.b : RENK.soluk }); belir(c, varYazi, 300); } } });
      await c.choice({ tag: 'Sıra sende', q: `<b>${a.ad}</b> aracının hızı nasıl değişiyor? (${sayilar} m/s)`, options: ['Hızlanıyor', 'Yavaşlıyor', 'Değişmiyor'], answer: a.degisim,
        hints: [0, 1, 2].map((k) => (k === a.degisim ? '' : `Ölçümlere sırayla bak: ${sayilar}. Sayılar ${['artıyor', 'azalıyor', 'hiç değişmiyor'][a.degisim]}.`)),
        right: ['Evet. Hız her saniye artıyor.', 'Evet. Hız her saniye azalıyor.', 'Evet. Hız hep aynı.'][a.degisim],
        onPick: (k, dogru) => { if (dogru) egilim(i, a.degisim); } });
      if (ivmeli) {
        await c.choice({ tag: 'Sıra sende', q: `<b>${a.ad}</b> aracının ivmesi hangi yönde?`, options: ['Hareket yönünde', 'Harekete ters'], answer: a.yon,
          hints: a.yon === 0 ? ['', 'Hız artıyor; hızlanan aracın ivmesi hareket yönündedir.'] : ['B’nin hızı azalıyor, yani değişiyor: ivmesi var. Yavaşlayan aracın ivmesi harekete terstir.', ''],
          right: a.yon === 0 ? 'Evet. Hız ile ivme aynı yönlü.' : 'Evet. İvme hıza zıt yönde.',
          onPick: (k, dogru) => {
            if (!dogru) return;
            varYazi.remove();
            okCiz(c, a.yon === 0 ? ok(c, svg, 840, y, 920, y, { renk: RENK.b, kalin: 7, uc: 18 }) : ok(c, svg, 920, y, 840, y, { renk: RENK.b, kalin: 7, uc: 18 }), 400);
          } });
      }
    }
    satirlar.forEach((s, k) => { s.g.style.opacity = k === 3 ? 1 : 0.45; });
    await c.say('D en hızlı araçtı, ama hızı değişmediği için ivmesi yoktu.', { speak: 'De aracı en hızlı araçtı, ama hızı değişmediği için ivmesi yoktu.' });
    satirlar.forEach((s, k) => { s.g.style.opacity = k === 2 ? 1 : 0.45; });
    await c.say('C en yavaş araçtı, ama hızı arttığı için ivmesi vardı.', { speak: 'Ce aracı en yavaş araçtı, ama hızı arttığı için ivmesi vardı.' });
    await belir(c, satirlar.map((s) => s.g), 350);
    await c.say('<b>Hız değişiyorsa ivme vardır.</b>');
    c.note('<b>Hız değişiyorsa ivme vardır; değişmiyorsa yoktur.</b><br>Örnek: 25, 25, 25, 25 m/s → ivme yok.', 'İvme var mı?', 'ivme-var-mi');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-e5', kicker: 'Konu E · Hareketin temel kavramları', title: 'İvme: hız değişiyorsa', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'İvme: hız değişiyorsa', hook: 'Otobüs kalkarken geriye, fren yapınca öne savruluyorsun; ikisinde ortak olan ne?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Otobüste üç an', goal: 'Kalkış ile frenin ortak yanını bul.', run: otobuste },
      { title: 'İki araç, dört saniye', goal: 'Hızı değişen araçları belirle.', run: ikiArac },
      { title: 'İvme: tanım ve model', goal: 'İvmeyi tanımla, modeliyle hesapla.', run: tanim },
      { title: 'İvmenin yönü', goal: 'İvme okunu hız okuyla karşılaştır.', run: ivmeYonu },
      { title: 'Hız değişmiyorsa ivme yok', goal: 'Hızlı gitmek ile ivmeyi ayır.', run: sabitHiz },
      { title: 'Dört araç, üç soru', goal: 'Ölçümlerden ivmeyi ve yönünü çıkar.', run: dortArac },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Düz bir otoyolda saatte 120 km sabit hızla giden bir araç ile duraktan yeni kalkan bir otobüs var. Hangisinin ivmesi vardır?',
        options: ['Aracın; çünkü çok daha hızlı gidiyor.', 'Otobüsün; çünkü hızı değişiyor.', 'İkisinin de; çünkü ikisi de hareket ediyor.'], answer: 1,
        why: ['Hızlı gitmek ivme demek değildir; aracın hızı değişmiyor, ivmesi yok.', 'Otobüsün hızı artıyor; hız değişiyorsa ivme vardır.', 'Hareket etmek yetmez; ivme için hızın değişmesi gerekir. Aracın hızı sabit.'], scene: 4 },
      { q: 'Kuzeye doğru giden bir araç fren yapıyor. Aracın ivmesi hangi yöndedir?',
        options: ['Güneye; hızına zıt yönde.', 'Kuzeye; ivme hareket yönündedir.', 'Yavaşladığı için ivmesi yoktur.'], answer: 0,
        why: ['Araç yavaşlarken hızı ve ivmesi zıt yönlüdür: hız kuzeye, ivme güneye.', 'İvme her zaman hareket yönünde olmaz; yavaşlayan araçta hıza zıttır.', 'Hız azalıyor, yani değişiyor; hız değişiyorsa ivme vardır.'], scene: 3 },
    ],
    summary: ['<b>Hız değişiyorsa ivme vardır; değişmiyorsa yoktur.</b>', 'İvme = hız değişimi / zaman; sembolü a, birimi m/s².', 'Hızlanırken hız ile ivme aynı yönlü, yavaşlarken zıt yönlüdür.'],
    nextLesson: { href: 'e6-dort-hesap.html', label: 'Sonraki: Bir yolculuk, dört hesap ›' },
  });
})();
