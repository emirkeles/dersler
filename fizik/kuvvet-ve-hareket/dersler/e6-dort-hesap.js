/* E6 · FİZ.9.2.6 · Senaryo: plan/fizik/kuvvet-ve-hareket/senaryolar/E-hareketin-temel-kavramlari.md ("## E6")
   Yazar notu: içerik MEB Fizik 9 s. 105–111 ve 120–121'den. Öğrenciye kitap ya da sayfa anılmaz.
   Renk rolleri: konum RENK.mor, yol RENK.vurgu, yer değiştirme ve hız RENK.r. Birim dönüştürme ve grafik yoktur. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, daire, yol, belir, sol, kaybol, par, ok, okCiz, kart, kutular, sinifla, sayiDogrusu, izgara, araba, insan } = KIT;
  const { lerp, ease } = Ders;
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
  function kesir(c, p, x, y, ust, alt, o = {}) {
    const g = c.S('g', {}, p), s = o.size || 28, w = o.w || 110;
    yazi(c, g, x, y - 14, ust, { size: s, renk: o.ustRenk });
    cizgi(c, g, x - w / 2, y, x + w / 2, y, { renk: RENK.yazi, kalin: 3 });
    yazi(c, g, x, y + s + 4, alt, { size: s });
    return g;
  }
  function kronometre(c, p, x, y) {
    const g = c.S('g', {}, p);
    kutu(c, g, x - 8, y - 54, 16, 12, { rx: 3 });
    daire(c, g, x, y, 42, { fill: RENK.koyu });
    const t = yazi(c, g, x, y + 9, '0 s', { size: 26 });
    g.yaz = (v) => { t.textContent = Math.round(v) + ' s'; };
    return g;
  }
  function balon(c, p, x, y, w, h, satirlar, o = {}) {
    const g = c.S('g', {}, p);
    const k = kart(c, g, x, y, w, h, satirlar, { size: o.size || 24, rx: 18 });
    if (o.kuyruk) yol(c, g, `M ${o.kuyruk[0] - 14} ${y + h - 2} L ${o.kuyruk[0]} ${o.kuyruk[1]} L ${o.kuyruk[0] + 14} ${y + h - 2}`, { fill: RENK.koyu });
    g.cerceve = k.querySelector('rect'); g.metin = k.querySelector('text');
    return g;
  }
  /* Dört adım kutusu: yol, yer değiştirme, ortalama sürat, ortalama hız. yaz(i, metin, { ok }) değeri yazar;
     ok verilirse değerin yanına sağa bakan küçük bir ok çizilir (vektörel nicelik). */
  const ADIM = [['yol', RENK.vurgu], ['yer değiştirme', RENK.r], ['ortalama sürat', RENK.vurgu], ['ortalama hız', RENK.r]];
  function adimlar(c, p, x, y, w, h, o = {}) {
    const g = c.S('g', {}, p), bosluk = o.bosluk == null ? 12 : o.bosluk, sira = o.sira || [0, 1, 2, 3], deger = [null, null, null, null];
    const yer = (i) => (o.yatay ? [x + sira[i] * (w + bosluk), y] : [x, y + sira[i] * (h + bosluk)]);
    const kutu1 = ADIM.map(([ad, renk], i) => {
      const [a, b] = yer(i), r = kutu(c, g, a, b, w, h, { renk: RENK.ince });
      yazi(c, g, a + w / 2, b + 34, ad, { size: 24, renk });
      return r;
    });
    const yaz = (i, metin, yo = {}) => {
      if (deger[i]) deger[i].remove();
      const [a, b] = yer(i), d = c.S('g', {}, g), t = yazi(c, d, a + w / 2 - (yo.ok ? 28 : 0), b + h - 20, metin, { size: 32 });
      if (yo.ok) { const u = a + w / 2 - 28 + t.getComputedTextLength() / 2 + 12; ok(c, d, u, b + h - 31, u + 44, b + h - 31, { renk: RENK.r, kalin: 5, uc: 14 }); }
      deger[i] = d; d.metin = t;
      return yo.hemen ? Promise.resolve() : belir(c, d, 300);
    };
    const guncelle = (i, metin) => { if (deger[i]) deger[i].metin.textContent = metin; else yaz(i, metin, { hemen: true }); };
    const temizle = () => { deger.forEach((d, i) => { if (d) d.remove(); deger[i] = null; }); };
    const isaret = (liste) => kutu1.forEach((r, i) => { const v = liste.includes(i); r.setAttribute('stroke', v ? ADIM[i][1] : RENK.ince); r.setAttribute('stroke-width', v ? 5 : 3); });
    return { g, yaz, guncelle, temizle, isaret };
  }
  /* Araç: taban ortası (0, 0); g.koy(x) ile yol boyunca taşınır. */
  function arac(c, p, y, s = 0.6) {
    const g = c.S('g', {}, p);
    araba(c, g, 0, 0, { s });
    g.koy = (x) => g.setAttribute('transform', `translate(${x} ${y})`);
    return g;
  }
  /* Bisikletli ve koşucu: taban ortası (0, 0); g.koy(x, yön) yönüne döner. */
  function bisikletli(c, p) {
    const g = c.S('g', {}, p), k = { renk: RENK.a, kalin: 3 }, b = { renk: RENK.yazi, kalin: 3 };
    daire(c, g, -17, -13, 13, k); daire(c, g, 17, -13, 13, k);
    yol(c, g, 'M -17 -13 L -5 -34 L 12 -32 L 17 -13 M -5 -34 L 3 -13 L 12 -32 M 12 -32 L 10 -43 L 19 -45', k);
    yol(c, g, 'M 3 -13 L -5 -36 L 4 -56 L 17 -44', b);
    daire(c, g, 8, -65, 7, b);
    return g;
  }
  function kosucu(c, p) {
    const g = c.S('g', {}, p);
    insan(c, g, 0, 0, { s: 0.62, kol: 1 });
    return g;
  }

  /* ---- Sahne 1 · Aynı yürüyüş, iki sayı ---- */
  async function ikiSayi(c) {
    const svg = c.svg(1000, 562);
    const egri = (y) => `M 60 ${y} C 95 ${y - 60}, 120 ${y + 40}, 150 ${y - 15} S 190 ${y - 50}, 215 ${y - 10}`;
    const r1 = sakla(c.S('g', {}, svg));
    yol(c, r1, egri(110), { renk: RENK.vurgu, kalin: 5 });
    yazi(c, r1, 250, 110, 'alınan yol', { size: 28, renk: RENK.vurgu, hiza: 'start' });
    const r2 = sakla(c.S('g', {}, svg));
    yol(c, r2, egri(222), { renk: RENK.cizgi, kalin: 3 }).setAttribute('stroke-dasharray', '5 8');
    ok(c, r2, 60, 222, 215, 212, { renk: RENK.r, kalin: 6 });
    yazi(c, r2, 250, 222, 'yer değiştirme', { size: 28, renk: RENK.r, hiza: 'start' });
    const r3 = sakla(c.S('g', {}, svg));
    yazi(c, r3, 50, 340, 'ortalama sürat', { size: 28, hiza: 'start' }); yazi(c, r3, 286, 340, '=', { size: 28 });
    kesir(c, r3, 410, 328, 'yol', 'süre', { ustRenk: RENK.vurgu });
    const r4 = sakla(c.S('g', {}, svg));
    yazi(c, r4, 50, 462, 'ortalama hız', { size: 28, hiza: 'start' }); yazi(c, r4, 286, 462, '=', { size: 28 });
    kesir(c, r4, 410, 450, 'yer değiştirme', 'süre', { ustRenk: RENK.r, w: 210 });

    await belir(c, r1, 400);
    await c.say('Alınan yol, cismin çizdiği yörüngenin uzunluğudur; skalerdir.');
    await par(sol(c, r1, 0.5), belir(c, r2, 400));
    await c.say('Yer değiştirme, son konum ile ilk konum arasındaki yönlü uzaklıktır.');
    await par(sol(c, r2, 0.5), belir(c, r3, 400));
    await c.say('Ortalama sürat, alınan toplam yolun hareket süresine oranıdır.');
    await par(sol(c, r3, 0.5), belir(c, r4, 400));
    await c.say('Ortalama hız, toplam yer değiştirmenin hareket süresine oranıdır.');

    const sag = c.S('g', {}, svg), emine = sakla(c.S('g', {}, sag)), krono = sakla(kronometre(c, sag, 590, 120));
    insan(c, emine, 0, 0, { s: 1.3 }); yazi(c, emine, 0, 38, 'Emine', { size: 24, renk: RENK.soluk });
    emine.setAttribute('transform', 'translate(572 420)');
    await par(sol(c, r4, 0.5), belir(c, [emine, krono], 400));
    await par(c.say('Emine mahallesinde 40 saniye yürüyor.', { speak: 'Emine mahallesinde kırk saniye yürüyor.' }),
      c.tween(3000, (t) => { emine.setAttribute('transform', `translate(${lerp(572, 606, t)} 420)`); krono.yaz(40 * t); }, ease.linear));
    const a1 = sakla(c.S('g', {}, sag)), a2 = sakla(c.S('g', {}, sag));
    insan(c, a1, 740, 420, { renk: RENK.soluk, kol: -1 }); balon(c, a1, 660, 212, 160, 86, ['saniyede', '3,5 metre'], { kuyruk: [740, 318] });
    insan(c, a2, 905, 420, { renk: RENK.soluk, kol: -1 }); balon(c, a2, 830, 212, 160, 86, ['saniyede', '2,5 metre'], { kuyruk: [905, 318] });
    await belir(c, a1, 400);
    await c.say('Bir arkadaşı “Saniyede 3,5 metre gitti” diyor.', { speak: 'Bir arkadaşı saniyede üç buçuk metre gitti diyor.' });
    await belir(c, a2, 400);
    await c.say('Öteki arkadaşı “Hayır, saniyede 2,5 metre” diyor.', { speak: 'Öteki arkadaşı hayır, saniyede iki buçuk metre diyor.' });

    await c.choice({ tag: 'Düşün', q: 'İkisi de haklı olabilir mi?',
      options: ['Hayır; bir yürüyüşün tek bir doğru sayısı olur.', 'Evet; biri ortalama sürati, öteki ortalama hızı söylüyor olabilir.', 'Evet; ama ancak biri süreyi yanlış ölçtüyse.'], answer: 1,
      hints: ['Aynı yürüyüş için iki ayrı oran vardır: yol bölü süre ve yer değiştirme bölü süre. Yol ile yer değiştirme farklıysa iki sayı da farklı çıkar.', '',
        'Süre aynı olsa da iki sayı farklı çıkabilir. Biri alınan yolu, öteki yer değiştirmeyi süreye bölmüştür.'],
      right: 'Evet. Aynı yürüyüş için iki ayrı oran vardır.' });

    await belir(c, [r3, r4], 350);
    await c.say('Yol ile yer değiştirme farklıysa iki oran da farklı çıkar.', { speak: '[thoughtful] Yol ile yer değiştirme farklıysa iki oran da farklı çıkar.' });
    await par(c.say('Hangi sayının ne olduğunu dört adımda bulacağız.'),
      (async () => { for (const r of [r1, r2]) { await belir(c, r, 350); await c.wait(500); } })());
    await c.say('Önce düz bir yolda deneyelim, sonra Emine’ye dönelim.');
  }

  /* ---- Sahne 2 · Düz yolda dört adım ---- */
  async function duzYol(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { kare: 64, sutun: 8, satir: 4, x: 60, y: 130 });
    const xA = iz.P(0, 2)[0], xB = iz.P(4, 2)[0], xC = iz.P(8, 2)[0], Y = iz.P(0, 2)[1];
    cizgi(c, svg, xA, Y, xC, Y, { kalin: 4 });
    [xA, xB, xC].forEach((x, i) => { c.S('circle', { cx: x, cy: Y, r: 7, fill: RENK.yazi }, svg); yazi(c, svg, x, Y + 42, 'ABC'[i], { size: 28 }); });
    const ar = arac(c, svg, Y - 4); ar.koy(xA);
    const ayrac = (x1, x2) => {
      const g = sakla(c.S('g', {}, svg));
      yol(c, g, `M ${x1 + 5} ${Y - 46} L ${x1 + 5} ${Y - 56} L ${x2 - 5} ${Y - 56} L ${x2 - 5} ${Y - 46}`, { renk: RENK.vurgu, kalin: 3 });
      yazi(c, g, (x1 + x2) / 2, Y - 68, '240 m', { size: 26, renk: RENK.vurgu });
      return g;
    };
    const orta1 = (xA + xB) / 2, orta2 = (xB + xC) / 2;
    const sur = (ms1, ms2) => (async () => { await c.tween(ms1, (t) => ar.koy(lerp(xA, xB, t)), ease.linear); await c.tween(ms2, (t) => ar.koy(lerp(xB, xC, t)), ease.linear); })();

    await par(c.say('Bir araç doğrusal bir yolda A’dan B’ye, oradan C’ye gidiyor.', { speak: 'Bir araç doğrusal bir yolda a noktasından be noktasına, oradan ce noktasına gidiyor.' }), sur(1300, 2600));
    const uz = [ayrac(xA, xB), ayrac(xB, xC)];
    await belir(c, uz, 400);
    await c.say('İki aralık da 240 m uzunluğunda.', { speak: 'İki aralık da iki yüz kırk metre uzunluğunda.' });
    const sure = sakla([yazi(c, svg, orta1, Y + 42, '10 s', { size: 26, renk: RENK.soluk }), yazi(c, svg, orta2, Y + 42, '20 s', { size: 26, renk: RENK.soluk })]);
    ar.koy(xA);
    await belir(c, sure, 350);
    await par(c.say('İlk aralık 10 saniye, ikinci aralık 20 saniye sürüyor.', { speak: 'İlk aralık on saniye, ikinci aralık yirmi saniye sürüyor.' }), sur(1300, 2600));
    const h1 = yazi(c, svg, orta1, Y + 86, '24 m/s', { size: 28, renk: RENK.r }), h2 = yazi(c, svg, orta2, Y + 86, '12 m/s', { size: 28, renk: RENK.r });
    sakla(h2);
    await belir(c, h1, 350);
    await c.say('İlk aralıkta ortalama hızın büyüklüğü 240 / 10 = 24 m/s.', { speak: 'İlk aralıkta ortalama hızın büyüklüğü iki yüz kırk bölü on eşittir yirmi dört metre bölü saniye.' });
    await belir(c, h2, 350);
    await c.say('İkinci aralıkta 240 / 20 = 12 m/s.', { speak: 'İkinci aralıkta iki yüz kırk bölü yirmi eşittir on iki metre bölü saniye.' });
    await kaybol(c, [h1, h2], 300);
    const ad = adimlar(c, svg, 640, 58, 330, 96); sakla(ad.g);
    await belir(c, ad.g, 400);
    await c.say('Şimdi bütün hareket için dört adımı sırayla atalım.');
    ad.isaret([0]); await ad.yaz(0, '480 m');
    await c.say('Birinci adım, alınan yol: 240 + 240 = 480 m.', { speak: 'Birinci adım, alınan yol: iki yüz kırk artı iki yüz kırk eşittir dört yüz seksen metre.' });
    const dx = ok(c, svg, xA, Y + 112, xC, Y + 112, { renk: RENK.r, kalin: 6 });
    ad.isaret([1]); await okCiz(c, dx, 600); await ad.yaz(1, '480 m', { ok: true });
    await c.say('İkinci adım, yer değiştirme: A’dan C’ye 480 m.', { speak: 'İkinci adım, yer değiştirme: a noktasından ce noktasına dört yüz seksen metre.' });
    await kaybol(c, sure, 250);
    const toplam = yazi(c, svg, xB, Y + 84, '30 s', { size: 28, renk: RENK.soluk });
    ad.isaret([]); await belir(c, toplam, 350);
    await c.say('Toplam süre 10 + 20 = 30 saniye.', { speak: 'Toplam süre on artı yirmi eşittir otuz saniye.' });
    ad.isaret([2]); await ad.yaz(2, '16 m/s');
    await c.say('Üçüncü adım, ortalama sürat: 480 / 30 = 16 m/s.', { speak: 'Üçüncü adım, ortalama sürat: dört yüz seksen bölü otuz eşittir on altı metre bölü saniye.' });
    ad.isaret([3]);

    await c.choice({ tag: 'Uygula', q: 'Dördüncü adım: bütün hareketin ortalama hızının büyüklüğü kaç m/s’dir?', options: ['18', '16', '36'], answer: 1,
      hints: ['24 ile 12’nin ortalamasını aldın. Ortalama hız, toplam yer değiştirmenin toplam süreye oranıdır: 480 / 30.', '',
        'Aralıkların hızları toplanmaz. Toplam yer değiştirme 480 m, toplam süre 30 saniyedir.'],
      right: 'Evet. 480 / 30 = 16 m/s.' });

    await ad.yaz(3, '16 m/s', { ok: true });
    await c.say('Ortalama hız 480 / 30 = 16 m/s; yönü A’dan C’ye.', { speak: 'Ortalama hız dört yüz seksen bölü otuz eşittir on altı metre bölü saniye; yönü a noktasından ce noktasına.' });
    ad.isaret([0, 1]);
    await c.say('Araç hiç geri dönmedi; yol ile yer değiştirme eşit çıktı.');
    ad.isaret([2, 3]);
    await c.say('Bu yüzden ortalama sürat ile ortalama hızın büyüklüğü de eşit.');
    ad.isaret([]);
    await kaybol(c, [toplam, ...uz], 300);
    ar.koy(xA);
    await belir(c, [yazi(c, svg, orta1, Y + 42, '10 s', { size: 26, renk: RENK.soluk }), yazi(c, svg, orta2, Y + 42, '20 s', { size: 26, renk: RENK.vurgu })], 350);
    await par(c.say('Sonuç 18 değil: araç yavaş aralıkta daha uzun süre kaldı.', { speak: '[thoughtful] Sonuç on sekiz değil: araç yavaş aralıkta daha uzun süre kaldı.' }), sur(1300, 2600));
    c.note('<b>Dört adım:</b> 1) alınan yol; 2) yer değiştirme;<br>3) ortalama sürat = yol / süre; 4) ortalama hız = yer değiştirme / süre.', 'Dört adım', 'dort-adim');
  }

  /* ---- Sahne 3 · Konumlar verilince ---- */
  async function konumlar(c) {
    const svg = c.svg(1000, 562);
    yonCizgisi(c, svg, 500, 44, 'Batı', 'Doğu');
    const iz = izgara(c, svg, { kare: 70, sutun: 12, satir: 4, x: 80, y: 120 });
    const Y = iz.P(0, 1)[1], X = [0, 3, 7, 12].map((i) => iz.P(i, 1)[0]), konum = ['0', '45', '105', '180'];
    cizgi(c, svg, X[0], Y, X[3], Y, { kalin: 4 });
    const noktalar = X.map((x, i) => {
      const g = sakla(c.S('g', {}, svg));
      c.S('circle', { cx: x, cy: Y, r: 7, fill: RENK.yazi }, g); yazi(c, g, x, Y + 42, 'ABCD'[i], { size: 28 });
      return g;
    });
    const halka = sakla(daire(c, svg, X[0], Y, 14, { renk: RENK.mor, kalin: 4 }));
    const konumYazi = sakla(konum.map((k, i) => yazi(c, svg, X[i], Y + 106, k, { size: 26, renk: RENK.mor })));
    const metre = sakla(yazi(c, svg, 967, Y + 106, 'm', { size: 26, renk: RENK.mor }));
    const sure = sakla(['3 s', '2 s', '5 s'].map((s, i) => yazi(c, svg, (X[i] + X[i + 1]) / 2, Y + 42, s, { size: 26, renk: RENK.soluk })));
    const ar = sakla(arac(c, svg, Y - 4)); ar.koy(X[0]);

    await belir(c, [...noktalar, halka, konumYazi[0], ar], 400);
    await c.say('Bu kez noktaların konumları veriliyor; referans noktası A.', { speak: 'Bu kez noktaların konumları veriliyor; referans noktamız a noktası.' });
    await belir(c, [...konumYazi.slice(1), metre], 400);
    await c.say('B 45 m’de, C 105 m’de, D 180 m’de; hepsi doğuda.', { speak: 'Be noktası kırk beş metrede, ce noktası yüz beş metrede, de noktası yüz seksen metrede; hepsi doğuda.' });
    await par(c.say('Araç A’dan B’ye 3, B’den C’ye 2, C’den D’ye 5 saniyede gidiyor.', { speak: 'Araç a noktasından be noktasına üç, be noktasından ce noktasına iki, ce noktasından de noktasına beş saniyede gidiyor.' }), (async () => {
      for (let i = 0; i < 3; i++) { await c.tween([900, 600, 1500][i], (t) => ar.koy(lerp(X[i], X[i + 1], t)), ease.linear); await belir(c, sure[i], 250); }
    })());
    await c.say('Yer değiştirme, son konumdan ilk konum çıkarılarak bulunur.');
    const bc = c.S('g', {}, svg);
    await okCiz(c, ok(c, bc, X[1], Y - 56, X[2], Y - 56, { renk: RENK.r, kalin: 6 }), 600);
    await belir(c, yazi(c, bc, (X[1] + X[2]) / 2, Y - 76, '105 − 45 = 60 m', { size: 26, renk: RENK.r }), 350);
    await c.say('B ile C arasında: 105 − 45 = 60 m, doğuya.', { speak: 'Be ile ce noktaları arasında: yüz beş eksi kırk beş eşittir altmış metre, doğuya.' });
    await belir(c, yazi(c, bc, (X[1] + X[2]) / 2, Y - 116, '30 m/s', { size: 28, renk: RENK.r }), 350);
    await c.say('Bu aralıkta ortalama hız doğuya 60 / 2 = 30 m/s.', { speak: 'Bu aralıkta ortalama hız doğuya altmış bölü iki eşittir otuz metre bölü saniye.' });

    await c.choice({ tag: 'Uygula', q: 'Araç B’den D’ye giderken yer değiştirmesinin büyüklüğü kaç metredir?', options: ['135 m', '180 m', '225 m'], answer: 0,
      hints: ['', '180 m, D’nin A’ya göre konumudur. Yer değiştirme B’den başlar: 180 − 45.', 'Konumlar toplanmaz; son konumdan ilk konum çıkarılır: 180 − 45.'],
      right: 'Evet. 180 − 45 = 135 m.' });

    await kaybol(c, bc, 300);
    const bd = c.S('g', {}, svg), bdOk = ok(c, bd, X[1], Y - 56, X[3], Y - 56, { renk: RENK.r, kalin: 6 });
    await okCiz(c, bdOk, 600);
    const bdYazi = yazi(c, bd, (X[1] + X[3]) / 2, Y - 76, '180 − 45 = 135 m', { size: 26, renk: RENK.r });
    await belir(c, bdYazi, 350);
    await c.say('B’den D’ye yer değiştirme 180 − 45 = 135 m, doğuya.', { speak: 'Be noktasından de noktasına yer değiştirme yüz seksen eksi kırk beş eşittir yüz otuz beş metre, doğuya.' });
    const konumOk = ok(c, svg, X[0], Y - 130, X[3], Y - 130, { renk: RENK.mor, kalin: 6 });
    await okCiz(c, konumOk, 600);
    await c.say('180 m, D’nin A’ya göre konumudur; yer değiştirme B’den başlar.', { speak: '[thoughtful] Yüz seksen metre, de noktasının a noktasına göre konumudur; yer değiştirme be noktasından başlar.' });
    await par(kaybol(c, [bdYazi, konumOk], 300), sol(c, bdOk, 0.3));
    const ad = c.S('g', {}, svg);
    await okCiz(c, ok(c, ad, X[0], Y - 100, X[3], Y - 100, { renk: RENK.r, kalin: 6 }), 700);
    await belir(c, yazi(c, ad, 500, Y - 120, '180 m', { size: 28, renk: RENK.r }), 350);
    await c.say('Bütün yolculukta yer değiştirme doğuya 180 m.', { speak: 'Bütün yolculukta yer değiştirme doğuya yüz seksen metre.' });
    await belir(c, yazi(c, svg, 400, 520, '10 s', { size: 30, renk: RENK.soluk }), 350);
    await c.say('Toplam süre 3 + 2 + 5 = 10 saniye.', { speak: 'Toplam süre üç artı iki artı beş eşittir on saniye.' });
    await belir(c, yazi(c, svg, 600, 520, '18 m/s', { size: 30, renk: RENK.r }), 350);
    await c.say('Bütün yolculuğun ortalama hızı doğuya 180 / 10 = 18 m/s.', { speak: 'Bütün yolculuğun ortalama hızı doğuya yüz seksen bölü on eşittir on sekiz metre bölü saniye.' });
  }

  /* ---- Sahne 4 · Geri dönünce ---- */
  async function geriDonunce(c) {
    const svg = c.svg(1000, 562), YS = 236;
    yonCizgisi(c, svg, 500, 44, 'Batı', 'Doğu');
    const sd = sayiDogrusu(c, svg, { min: 0, max: 100, adim: 10, y: YS, x0: 90, x1: 910, sayisiz: true });
    [0, 50, 100].forEach((v) => yazi(c, svg, sd.x(v), YS + 40, v === 100 ? '100 m' : String(v), { size: 24, renk: RENK.soluk, kalin: 500 }));
    const krono = kronometre(c, svg, 900, 84), ad = adimlar(c, svg, 40, 330, 220, 124, { yatay: true, bosluk: 13 });
    let izG = c.S('g', {}, svg);
    const figur = (g) => { g.koy = (v, yon = 1) => g.setAttribute('transform', `translate(${sd.x(v)} ${YS - 4}) scale(${yon} 1)`); g.koy(0); return g; };
    /* Figürü duraklara sırayla götürür; gidilen yol kesikli çizilir, yol kutusu sayar. */
    const gezdir = async (fig, duraklar, sayac) => {
      let konum = 0, toplam = 0;
      for (let k = 0; k < duraklar.length; k++) {
        const h = duraklar[k], bas = konum, y0 = toplam, y = YS - 102 + k * 14;
        const iz1 = cizgi(c, izG, sd.x(bas), y, sd.x(bas), y, { renk: RENK.vurgu, kalin: 4, kesik: '9 7' });
        await c.tween(Math.abs(h - bas) * 26, (t) => { const v = lerp(bas, h, t); fig.koy(v, h >= bas ? 1 : -1); iz1.setAttribute('x2', sd.x(v)); if (sayac) ad.guncelle(0, Math.round(y0 + Math.abs(v - bas)) + ' m'); }, ease.linear);
        konum = h; toplam += Math.abs(h - bas);
        await c.wait(200);
      }
    };
    const yerOk = (v) => (v ? okCiz(c, ok(c, izG, sd.x(0), YS - 126, sd.x(v), YS - 126, { renk: RENK.r, kalin: 6 }), 500) : belir(c, daire(c, izG, sd.x(0), YS, 15, { renk: RENK.r, kalin: 4 }), 300));

    const bis = figur(bisikletli(c, svg));
    ad.isaret([0]);
    await par(c.say('Bir bisikletli doğuya 100 m gidiyor, sonra dönüp batıya 40 m geliyor.', { speak: 'Bir bisikletli doğuya yüz metre gidiyor, sonra dönüp batıya kırk metre geliyor.' }), gezdir(bis, [100, 60], true));
    await par(c.say('Bütün hareket 20 saniye sürüyor.', { speak: 'Bütün hareket yirmi saniye sürüyor.' }), c.tween(1200, (t) => krono.yaz(20 * t), ease.linear));
    await c.say('Birinci adım, alınan yol: 100 + 40 = 140 m.', { speak: 'Birinci adım, alınan yol: yüz artı kırk eşittir yüz kırk metre.' });
    ad.isaret([1]); await yerOk(60); await ad.yaz(1, '60 m', { ok: true });
    await c.say('İkinci adım, yer değiştirme: 100 − 40 = 60 m, doğuya.', { speak: 'İkinci adım, yer değiştirme: yüz eksi kırk eşittir altmış metre, doğuya.' });
    ad.isaret([2]); await ad.yaz(2, '7 m/s');
    await c.say('Üçüncü adım, ortalama sürat: 140 / 20 = 7 m/s.', { speak: 'Üçüncü adım, ortalama sürat: yüz kırk bölü yirmi eşittir yedi metre bölü saniye.' });
    ad.isaret([3]);

    await c.choice({ tag: 'Uygula', q: 'Dördüncü adım: bisikletlinin ortalama hızı nedir?', options: ['Doğuya 7 m/s', 'Batıya 2 m/s', 'Doğuya 3 m/s'], answer: 2,
      hints: ['140 m alınan yoldur; ondan ortalama sürat çıkar. Ortalama hız yer değiştirmeden hesaplanır: 60 / 20.',
        'Yalnızca dönüş parçasına baktın. Ortalama hız bütün hareketin yer değiştirmesinden bulunur: doğuya 60 m.', ''],
      right: 'Evet. 60 / 20 = 3 m/s, doğuya.' });

    await ad.yaz(3, '3 m/s', { ok: true });
    await c.say('Ortalama hız 60 / 20 = 3 m/s, doğuya.', { speak: 'Ortalama hız altmış bölü yirmi eşittir üç metre bölü saniye, doğuya.' });
    ad.isaret([0, 1]);
    await c.say('Geri dönünce yol büyür, yer değiştirme küçülür.', { speak: 'Geri dönünce yol büyür, [short pause] yer değiştirme küçülür.' });
    await c.say('Yer değiştirmenin büyüklüğü alınan yolu geçemez.');
    ad.isaret([2, 3]);
    await c.say('Bu yüzden ortalama hızın büyüklüğü de ortalama sürati geçemez.');

    const gorevler = [
      { durak: [60], anlat: 'Koşucu doğuya 60 m koştu; süre 20 saniye.', deger: ['60 m', '60 m', '3 m/s', '3 m/s'], yd: 60,
        sec: [['60 m', '120 m', '20 m'], ['Doğuya 60 m', 'Batıya 60 m', 'Sıfır'], ['3 m/s', '60 m/s', '20 m/s'], ['Doğuya 60 m/s', 'Doğuya 3 m/s', 'Sıfır']], dogru: [0, 0, 0, 1],
        ipucu: [['', 'Koşucu geri dönmedi; yalnızca 60 m koştu.', '20, sürenin sayısıdır; alınan yol 60 m.'],
          ['', 'Koşucu doğuya gitti; son konumu başlangıcın doğusunda.', 'Koşucu başladığı yere dönmedi; son konumu 60 m doğuda.'],
          ['', 'Yolu süreye böl: 60 / 20.', 'Yolu süreye böl: 60 / 20.'],
          ['Yer değiştirmeyi süreye böl: 60 / 20.', '', 'Yer değiştirme sıfır değil: doğuya 60 m.']] },
      { durak: [50, 20], anlat: 'Koşucu doğuya 50 m, sonra batıya 30 m koştu; süre 20 saniye.', deger: ['80 m', '20 m', '4 m/s', '1 m/s'], yd: 20,
        sec: [['20 m', '80 m', '50 m'], ['Doğuya 80 m', 'Batıya 30 m', 'Doğuya 20 m'], ['1 m/s', '4 m/s', '2,5 m/s'], ['Doğuya 4 m/s', 'Doğuya 1 m/s', 'Batıya 1,5 m/s']], dogru: [1, 2, 1, 1],
        ipucu: [['20 m yer değiştirmenin büyüklüğü. Yol için bölümleri topla: 50 + 30.', '', 'Dönüşteki 30 m de yola eklenir: 50 + 30.'],
          ['80 m alınan yoldur. Yer değiştirme için ilk ve son konuma bak: 50 − 30.', 'Yalnızca dönüş parçasına baktın. Son konum başlangıcın 20 m doğusunda.', ''],
          ['Bu sayı yer değiştirmeden çıkar. Ortalama sürat için yolu süreye böl: 80 / 20.', '', 'Bütün yolu süreye böl: 80 / 20.'],
          ['Bu sayı ortalama sürattir. Ortalama hız için yer değiştirmeyi süreye böl.', '', 'Yalnızca dönüş parçasına baktın. Bütün hareketin yer değiştirmesi doğuya 20 m.']] },
      { durak: [40, 0], anlat: 'Koşucu doğuya 40 m, sonra batıya 40 m koştu; süre 20 saniye.', deger: ['80 m', '0', '4 m/s', '0'], yd: 0,
        sec: [['0 m', '40 m', '80 m'], ['Sıfır', 'Doğuya 80 m', 'Batıya 40 m'], ['0 m/s', '4 m/s', '2 m/s'], ['4 m/s', 'Doğuya 2 m/s', 'Sıfır']], dogru: [2, 0, 1, 2],
        ipucu: [['Başa dönmek koşulan yolu silmez: 40 + 40.', 'Dönüşteki 40 m de yola eklenir: 40 + 40.', ''],
          ['', '80 m alınan yoldur. İlk ve son konum aynı; yer değiştirme sıfır.', 'Yalnızca dönüş parçasına baktın. İlk ve son konum aynı.'],
          ['Sürat yoldan hesaplanır; yol sıfır değil: 80 / 20.', '', 'Bütün yolu süreye böl: 80 / 20.'],
          ['Koşucu başladığı yere döndü; yer değiştirmesi sıfır. Sıfır bölü 20 saniye, sıfır eder.', 'Yer değiştirme sıfır; sıfır bölü 20 saniye, sıfır eder.', '']] },
    ];
    const sorular = ['<b>Alınan yol</b> kaç metre?', '<b>Yer değiştirme</b> nedir?', '<b>Ortalama sürat</b> kaç m/s?', '<b>Ortalama hız</b> nedir?'];
    await c.say('Her koşu için dört kutuyu sırayla doldur.', { noWait: true });
    bis.remove();
    const kos = figur(kosucu(c, svg));
    for (let n = 0; n < gorevler.length; n++) {
      const G = gorevler[n];
      izG.remove(); izG = c.S('g', {}, svg); ad.temizle(); ad.isaret([]); kos.koy(0);
      await gezdir(kos, G.durak);
      for (let i = 0; i < 4; i++) {
        ad.isaret([i]);
        await c.choice({ tag: 'Koşu ' + (n + 1), q: `${G.anlat} ${sorular[i]}`, options: G.sec[i], answer: G.dogru[i], hints: G.ipucu[i], right: 'Evet.',
          onPick: (k, dogru) => {
            if (!dogru) return;
            if (i === 1) yerOk(G.yd);
            ad.yaz(i, G.deger[i], { ok: (i === 1 || i === 3) && G.yd > 0 });
          } });
      }
    }
    ad.isaret([2, 3]);
    await c.say('Başa dönen koşucunun ortalama hızı sıfır, ortalama sürati 4 m/s.', { speak: 'Başa dönen koşucunun ortalama hızı [short pause] sıfır, ortalama sürati dört metre bölü saniye.' });
  }

  /* ---- Sahne 5 · Emine'nin yürüyüşü ---- */
  async function emine(c) {
    const svg = c.svg(1000, 562);
    const iz = izgara(c, svg, { kare: 70, sutun: 6, satir: 5, x: 40, y: 110 });
    const A = iz.P(1, 4), B = iz.P(5, 4), C = iz.P(5, 1);
    const nokta = (p, ad, dx, dy) => { const g = sakla(c.S('g', {}, svg)); c.S('circle', { cx: p[0], cy: p[1], r: 7, fill: RENK.yazi }, g); yazi(c, g, p[0] + dx, p[1] + dy, ad, { size: 28 }); return g; };
    const nA = nokta(A, 'A', -24, -12), nB = nokta(B, 'B', 24, -12), nC = nokta(C, 'C', 24, 32);
    const iz1 = cizgi(c, svg, A[0], A[1], A[0], A[1], { renk: RENK.vurgu, kalin: 6, kesik: '2 11' }), iz2 = cizgi(c, svg, B[0], B[1], B[0], B[1], { renk: RENK.vurgu, kalin: 6, kesik: '2 11' });
    const yuruyen = c.S('circle', { cx: A[0], cy: A[1], r: 10, fill: RENK.vurgu }, svg);
    const krono = kronometre(c, svg, 640, 150);
    const b1 = sakla(balon(c, svg, 640, 280, 340, 64, 'saniyede 3,5 metre', { size: 26 })), b2 = sakla(balon(c, svg, 640, 370, 340, 64, 'saniyede 2,5 metre', { size: 26 }));

    await par(belir(c, nA, 400), belir(c, [b1, b2], 400, 0.5));
    await par(c.say('Emine A binasından B binasına 80 m yürüyor.', { speak: 'Emine a binasından be binasına seksen metre yürüyor.' }),
      c.tween(2400, (t) => { const x = lerp(A[0], B[0], t); yuruyen.setAttribute('cx', x); iz1.setAttribute('x2', x); krono.yaz(40 * t * 4 / 7); }, ease.linear));
    await belir(c, [nB, yazi(c, svg, (A[0] + B[0]) / 2, A[1] - 18, '80 m', { size: 26, renk: RENK.vurgu })], 350);
    const dik = yol(c, svg, `M ${B[0] - 22} ${B[1]} L ${B[0] - 22} ${B[1] + 22} L ${B[0]} ${B[1] + 22}`, { renk: RENK.soluk, kalin: 3 });
    await belir(c, dik, 300);
    await par(c.say('B’de dik açıyla dönüp C binasına 60 m yürüyor.', { speak: 'Be binasında dik açıyla dönüp ce binasına altmış metre yürüyor.' }),
      c.tween(1800, (t) => { const y = lerp(B[1], C[1], t); yuruyen.setAttribute('cy', y); iz2.setAttribute('y2', y); krono.yaz(40 * (4 + 3 * t) / 7); }, ease.linear));
    await belir(c, [nC, yazi(c, svg, B[0] + 16, (B[1] + C[1]) / 2 + 8, '60 m', { size: 26, renk: RENK.vurgu, hiza: 'start' })], 350);
    await c.say('Bütün yürüyüş 40 saniye sürüyor.', { speak: 'Bütün yürüyüş kırk saniye sürüyor.' });
    await belir(c, yazi(c, svg, 860, 160, 'yol 140 m', { size: 30, renk: RENK.vurgu }), 350);
    await c.say('Birinci adım, alınan yol: 80 + 60 = 140 m.', { speak: 'Birinci adım, alınan yol: seksen artı altmış eşittir yüz kırk metre.' });
    const dx = ok(c, svg, A[0], A[1], C[0], C[1], { renk: RENK.r, kalin: 7, uc: 22 });
    await okCiz(c, dx, 700);
    const dxAd = c.S('g', {}, svg);
    yazi(c, dxAd, 196, 330, 'Δx', { size: 32, renk: RENK.r }); ok(c, dxAd, 178, 296, 216, 296, { renk: RENK.r, kalin: 3, uc: 10 });
    await belir(c, dxAd, 350);
    await c.say('İkinci adım, yer değiştirme: A’dan C’ye çizilen ok.', { speak: 'İkinci adım, yer değiştirme: a binasından ce binasına çizilen ok.' });
    const ucgen = c.S('path', { d: `M ${A[0]} ${A[1]} L ${B[0]} ${B[1]} L ${C[0]} ${C[1]} Z`, fill: RENK.r }, svg);
    svg.insertBefore(ucgen, nA);
    await belir(c, ucgen, 400, 0.14);
    await c.say('Bu ok, kenarları 80 m ve 60 m olan dik üçgenin hipotenüsüdür.', { speak: 'Bu ok, kenarları seksen metre ve altmış metre olan dik üçgenin hipotenüsüdür.' });
    await belir(c, yazi(c, svg, 196, 368, '100 m', { size: 28, renk: RENK.r }), 350);
    await c.say('Böyle bir üçgenin hipotenüsü 100 m’dir.', { speak: 'Böyle bir üçgenin hipotenüsü [short pause] yüz metredir.' });
    await c.say('Yer değiştirmenin büyüklüğü 100 m; alınan yoldan kısa.', { speak: 'Yer değiştirmenin büyüklüğü yüz metre; alınan yoldan kısa.' });
    await belir(c, [b1, b2], 350);

    await c.choice({ tag: 'Düşün', q: '“Saniyede 3,5 metre” diyen arkadaş hangi niceliği söylemiştir?',
      options: ['Ortalama hızın büyüklüğünü; hız süratten büyük olur.', 'Ortalama sürati; alınan yolu süreye bölmüştür.', 'Anlık sürati; Emine her an bu süratle yürümüştür.'], answer: 1,
      hints: ['Ortalama hız yer değiştirmeden hesaplanır: 100 / 40 = 2,5 m/s. Yer değiştirme yolu geçemediği için hızın büyüklüğü de sürati geçemez.', '',
        'Anlık sürat tek bir anın süratidir; elimizde öyle bir ölçüm yok. 3,5 sayısı bütün yolun bütün süreye oranıdır.'],
      right: 'Evet. 140 / 40 = 3,5 m/s.' });

    const bagla = (b, metin, renk, x, y, by) => {
      b.metin.textContent = metin; b.metin.style.fill = renk; b.cerceve.setAttribute('stroke', renk);
      return belir(c, cizgi(c, svg, 640, by, x, y, { renk, kalin: 3, kesik: '6 7' }), 350);
    };
    await bagla(b1, 'ortalama sürat 3,5 m/s', RENK.vurgu, B[0] + 6, B[1] + 150, 312);
    await c.say('Üçüncü adım, ortalama sürat: 140 / 40 = 3,5 m/s.', { speak: 'Üçüncü adım, ortalama sürat: yüz kırk bölü kırk eşittir üç buçuk metre bölü saniye.' });
    await bagla(b2, 'ortalama hız 2,5 m/s', RENK.r, C[0] + 12, C[1] + 6, 402);
    await c.say('Dördüncü adım, ortalama hızın büyüklüğü: 100 / 40 = 2,5 m/s.', { speak: 'Dördüncü adım, ortalama hızın büyüklüğü: yüz bölü kırk eşittir iki buçuk metre bölü saniye.' });
    await c.say('Ortalama hızın yönü A’dan C’ye doğrudur.', { speak: 'Ortalama hızın yönü a binasından ce binasına doğrudur.' });
    await c.say('İki arkadaş da haklı: biri sürati, öteki hızı söyledi.');
    c.note('<b>Skaler yoldan, vektörel yer değiştirmeden hesaplanır.</b><br>Örnek: 40 saniyede yol 140 m → 3,5 m/s; yer değiştirme 100 m → 2,5 m/s.', 'Dört hesap', 'dort-hesap');
  }

  /* ---- Sahne 6 · Hangi bilgi neyi verir? ---- */
  async function hangiBilgi(c) {
    const svg = c.svg(1000, 562);
    const cumle = sakla(kart(c, svg, 120, 26, 760, 66, 'Damla 7 saniyede 35 m’yi aynı tempoda koştu.', { size: 28 }));
    const ad = adimlar(c, svg, 40, 112, 220, 108, { yatay: true, bosluk: 13, sira: [0, 2, 1, 3] }); sakla(ad.g);
    /* Üç olası yörünge; her biri 220 birim (35 m) uzunluğunda. */
    const dalga = (x0, y0, en) => {
      const boy = (A) => { let L = 0, px = 0, py = 0; for (let k = 1; k <= 80; k++) { const u = k / 80, x = en * u, y = -A * Math.sin(3 * Math.PI * u); L += Math.hypot(x - px, y - py); px = x; py = y; } return L; };
      let a = 0, b = 80; for (let k = 0; k < 30; k++) { const m = (a + b) / 2; if (boy(m) < 220) a = m; else b = m; }
      let d = `M ${x0} ${y0}`; for (let k = 1; k <= 80; k++) { const u = k / 80; d += ` L ${(x0 + en * u).toFixed(1)} ${(y0 - a * Math.sin(3 * Math.PI * u)).toFixed(1)}`; }
      return d;
    };
    const Y = 385;
    const yorunge = [
      { d: `M 70 ${Y} L 290 ${Y}`, bas: [70, Y], son: [290, Y] },
      { d: dalga(420, Y, 160), bas: [420, Y], son: [580, Y] },
      { d: `M 725 ${Y - 9} L 865 ${Y - 9} Q 880 ${Y} 865 ${Y + 9} L 805 ${Y + 9}`, bas: [725, Y - 9], son: [805, Y + 9] },
    ].map((v) => {
      const g = sakla(c.S('g', {}, svg)), p = yol(c, g, v.d, { renk: RENK.vurgu, kalin: 5 }), L = p.getTotalLength();
      p.setAttribute('stroke-dasharray', L); p.setAttribute('stroke-dashoffset', L);
      daire(c, g, v.bas[0], v.bas[1], 11, { renk: RENK.yazi, kalin: 3 });
      const uc = sakla(c.S('circle', { cx: v.son[0], cy: v.son[1], r: 8, fill: RENK.yazi }, g));
      return { ...v, g, p, L, uc };
    });
    const kos = (v, ms) => c.tween(ms, (t) => v.p.setAttribute('stroke-dashoffset', v.L * (1 - t)), ease.linear).then(() => { v.uc.style.opacity = 1; });

    await belir(c, cumle, 400);
    await c.say('Damla 7 saniyede 35 m’yi aynı tempoda koştu.', { speak: 'Damla yedi saniyede otuz beş metreyi aynı tempoda koştu.' });
    await belir(c, ad.g, 400);
    await c.say('Elimizde yalnızca bu cümle var.');
    ad.isaret([0]); await ad.yaz(0, '35 m');
    await c.say('Alınan yol belli: 35 m.', { speak: 'Alınan yol belli: otuz beş metre.' });
    ad.isaret([2]); await ad.yaz(2, '5 m/s');
    await c.say('Ortalama sürat de bulunur: 35 / 7 = 5 m/s.', { speak: 'Ortalama sürat de bulunur: otuz beş bölü yedi eşittir beş metre bölü saniye.' });
    ad.isaret([]);
    await belir(c, yorunge.map((v) => v.g), 350);
    await c.say('Ama Damla’nın hangi yörüngeyi izlediğini bilmiyoruz.');
    await par(c.say('Düz koşmuş, kıvrılmış ya da gidip dönmüş olabilir.'), (async () => { for (const v of yorunge) { await kos(v, 1300); await c.wait(200); } })());

    await c.choice({ tag: 'Düşün', q: 'Bu cümleyle Damla’nın ortalama hızı bulunabilir mi?',
      options: ['Hayır; yer değiştirmesi bilinmiyor.', 'Evet; 35 / 7 = 5 m/s.', 'Evet; ortalama hız her zaman ortalama sürate eşittir.'], answer: 0,
      hints: ['', '35 m alınan yoldur; bu bölüm ortalama sürati verir. Ortalama hız için yer değiştirme gerekir, o da bilinmiyor.',
        'İkisi ancak düz yolda, geri dönmeden gidilirse eşit olur. Damla’nın yörüngesini bilmiyoruz.'],
      right: 'Evet. Yörünge bilinmeden yer değiştirme bilinmez.' });

    await c.say('Yer değiştirme için ilk ve son konum bilinmelidir.');
    await par(yorunge.map((v) => okCiz(c, ok(c, svg, v.bas[0], Y + 62, v.son[0], Y + 62, { renk: RENK.r, kalin: 6 }), 600)));
    await c.say('Üç yörüngede de yol 35 m, ama oklar farklı.', { speak: 'Üç yörüngede de yol otuz beş metre, ama oklar farklı.' });
    ad.isaret([1, 3]); await par(ad.yaz(1, '?'), ad.yaz(3, '?'));
    await c.say('Yer değiştirme bilinmeden ortalama hız hesaplanamaz.', { speak: '[thoughtful] Yer değiştirme bilinmeden ortalama hız hesaplanamaz.' });
    ad.isaret([0, 2]);
    await c.say('Yol ve süre yalnızca alınan yolu ve ortalama sürati verir.');
  }

  /* ---- Sahne 7 · On bir kavram, iki kutu ---- */
  async function onBir(c) {
    const svg = c.svg(1000, 562), hepsi = sakla(c.S('g', {}, svg));
    kutu(c, hepsi, 250, 22, 500, 76, { renk: RENK.soluk });
    yazi(c, hepsi, 375, 70, 'Nicelik değil', { size: 26, renk: RENK.soluk });
    const kt = kutular(c, hepsi, ['Skaler', 'Vektörel'], { x: 100, y: 116, w: 390, h: 320, bosluk: 20, renkler: [RENK.vurgu, RENK.r] });
    let ekler = [];
    /* Kutuya bir kavram yazar; vektörel kutuda yanına küçük bir ok, üstteki kutuda bir halka çizer. */
    const koy = (cc, i, metin) => {
      if (i === 2) {
        const g = c.S('g', {}, hepsi);
        daire(c, g, 512, 61, 9, { renk: RENK.yazi, kalin: 3 }); yazi(c, g, 640, 70, metin, { size: 24 });
        ekler.push(g); return belir(c, g, 350);
      }
      const n = kt.icerik[i].length, p = kt.koy(cc, i, metin);
      if (i === 1) { const o = ok(c, hepsi, 526, 196 + n * 36, 562, 196 + n * 36, { renk: RENK.r, kalin: 4, uc: 11 }); ekler.push(o); belir(c, o, 350); }
      return p;
    };
    const dizi = async (i, adlar) => { for (const a of adlar) { await koy(c, i, a); await c.wait(150); } };

    await belir(c, hepsi, 400);
    await c.say('Hareketi anlatmak için on bir kavram kullandık.');
    await c.say('Skaler niceliğin yalnızca büyüklüğü, vektörel niceliğin ayrıca yönü vardır.');
    await dizi(0, ['alınan yol', 'sürat', 'ortalama sürat']);
    await c.say('Alınan yol skalerdir; ondan hesaplanan sürat ve ortalama sürat de skalerdir.');
    await dizi(1, ['yer değiştirme', 'hız', 'ortalama hız']);
    await c.say('Yer değiştirme vektöreldir; ondan hesaplanan hız ve ortalama hız da vektöreldir.');
    await dizi(1, ['konum']);
    await c.say('Konum vektöreldir: referans noktasından cisme çizilen okla gösterilir.');
    await dizi(1, ['anlık hız', 'ivme']);
    await c.say('Anlık hız ve ivme de vektöreldir; yönleri vardır.');
    await dizi(0, ['anlık sürat']);
    await c.say('Anlık sürat, anlık hızın büyüklüğüdür; skalerdir.');
    await koy(c, 2, 'referans noktası');
    await c.say('Referans noktası ise nicelik değildir; seçilen bir noktadır.');

    await kaybol(c, [...kt.icerik[0], ...kt.icerik[1], ...ekler], 350);
    kt.icerik[0].length = 0; kt.icerik[1].length = 0; ekler = [];
    await c.say('On bir kavramı doğru kutuya yerleştir.', { noWait: true });
    const ref = 'Referans noktası ölçülen bir nicelik değildir; konumu söylemek için seçilen noktadır. Büyüklüğü ya da birimi yoktur.';
    await sinifla(c, { g: svg, adlar: ['Skaler', 'Vektörel', 'Nicelik değil'], koy }, [
      { ad: 'alınan yol', kutu: 0, neden: 'Evet. Yalnızca sayı ve birimle söylenir.', ipucu: ['', 'Alınan yol yön taşımaz; yalnızca sayı ve birimle söylenir.', 'Alınan yol ölçülür; büyüklüğü ve birimi vardır.'] },
      { ad: 'hız', kutu: 1, neden: 'Evet. Hızın yönü vardır.', ipucu: ['Hızın yönü vardır; yön taşımayan sürattir.', '', 'Hız ölçülen bir niceliktir; büyüklüğü ve yönü vardır.'] },
      { ad: 'sürat', kutu: 0, neden: 'Evet. Sürat yön taşımaz.', ipucu: ['', 'Sürat yön taşımaz; yönü olan hızdır.', 'Sürat ölçülen bir niceliktir; birimi m/s’dir.'] },
      { ad: 'ortalama sürat', kutu: 0, neden: 'Evet. Yoldan hesaplanır; skalerdir.', ipucu: ['', 'Ortalama sürat yoldan hesaplanır; yol gibi skalerdir.', 'Ortalama sürat hesaplanan bir niceliktir.'] },
      { ad: 'yer değiştirme', kutu: 1, neden: 'Evet. İlk konumdan son konuma bir oktur.', ipucu: ['Yer değiştirme ilk konumdan son konuma çizilen oktur; yönü vardır.', '', 'Yer değiştirme bir niceliktir; birimi metredir.'] },
      { ad: 'ortalama hız', kutu: 1, neden: 'Evet. Yer değiştirmeden hesaplanır; yönü vardır.', ipucu: ['Ortalama hız yer değiştirmeden hesaplanır; onun gibi yönü vardır.', '', 'Ortalama hız hesaplanan bir niceliktir.'] },
      { ad: 'konum', kutu: 1, neden: 'Evet. Konum okla gösterilir.', ipucu: ['Konum yön ve uzaklıkla söylenir; okla gösterilir.', '', 'Konum bir niceliktir; birimi metredir. Nicelik olmayan, referans noktasıdır.'] },
      { ad: 'anlık sürat', kutu: 0, neden: 'Evet. Anlık hızın büyüklüğüdür.', ipucu: ['', 'Anlık sürat, anlık hızın yalnızca büyüklüğüdür. Yön taşımadığı için skalerdir.', 'Anlık sürat göstergede okunan bir niceliktir.'] },
      { ad: 'anlık hız', kutu: 1, neden: 'Evet. Anlık hızın yönü vardır.', ipucu: ['Anlık hızın yönü vardır; yön taşımayan anlık sürattir.', '', 'Anlık hız bir niceliktir; büyüklüğü ve yönü vardır.'] },
      { ad: 'ivme', kutu: 1, neden: 'Evet. İvmenin de yönü vardır.', ipucu: ['İvmenin yönü vardır; yavaşlayan araçta hıza zıttır.', '', 'İvme bir niceliktir; birimi m/s²’dir.'] },
      { ad: 'referans noktası', kutu: 2, neden: 'Evet. O, seçilen bir noktadır.', ipucu: [ref, ref, ''] },
    ], { tag: 'Sıra sende', y: 494 });

    await c.say('Dört skaler, altı vektörel nicelik ve seçilen bir nokta.');
    await c.say('Ortalama sürat yoldan, ortalama hız yer değiştirmeden hesaplanır.');
    c.note('<b>Skaler:</b> alınan yol, sürat, anlık sürat, ortalama sürat.<br><b>Vektörel:</b> konum, yer değiştirme, hız, anlık hız, ortalama hız, ivme.<br><b>Referans noktası:</b> nicelik değil.', 'On bir kavram', 'on-bir-kavram');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-e6', kicker: 'Konu E · Hareketin temel kavramları', title: 'Bir yolculuk, dört hesap', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'Bir yolculuk, dört hesap', hook: 'İki arkadaş aynı yolculuk için biri “saniyede 3,5 metre”, öteki “saniyede 2,5 metre” diyor; ikisi de haklı olabilir mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Aynı yürüyüş, iki sayı', goal: 'İki sayının nasıl doğru olabileceğini düşün.', run: ikiSayi },
      { title: 'Düz yolda dört adım', goal: 'Dört niceliği sırayla hesapla.', run: duzYol },
      { title: 'Konumlar verilince', goal: 'Yer değiştirmeyi konumlardan bul.', run: konumlar },
      { title: 'Geri dönünce', goal: 'Yol ile yer değiştirmeyi ayrı hesapla.', run: geriDonunce },
      { title: 'Emine’nin yürüyüşü', goal: 'İki doğrultulu yürüyüşte dört adımı uygula.', run: emine },
      { title: 'Hangi bilgi neyi verir?', goal: 'Hangi niceliğin bulunamayacağını gör.', run: hangiBilgi },
      { title: 'On bir kavram, iki kutu', goal: 'Kavramları skaler ve vektörel diye ayır.', run: onBir },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir koşucu önce doğuya 60 m, sonra batıya 20 m koşuyor; hareket 20 saniye sürüyor. Ortalama sürati ve ortalama hızı nedir?',
        options: ['Sürat 2 m/s; hız doğuya 4 m/s.', 'Sürat 4 m/s; hız doğuya 2 m/s.', 'İkisi de 4 m/s.'], answer: 1,
        why: ['İkisi yer değiştirmiş; ortalama hızın büyüklüğü ortalama sürati geçemez.', 'Yol 60 + 20 = 80 m, yer değiştirme doğuya 40 m; 80 / 20 = 4 m/s, 40 / 20 = 2 m/s.', 'Ortalama hız yoldan değil, yer değiştirmeden hesaplanır: 40 / 20 = 2 m/s.'], scene: 3 },
      { q: 'Bir yüzücü için yalnızca şu bilgi var: 50 m’yi 25 saniyede yüzdü. Buna göre hangisi bulunamaz?',
        options: ['Alınan yol', 'Ortalama sürat', 'Ortalama hız'], answer: 2,
        why: ['Alınan yol verilmiş: 50 m.', 'Yol ve süre belli: 50 / 25 = 2 m/s.', 'Yörünge bilinmediği için yer değiştirme, dolayısıyla ortalama hız bulunamaz.'], scene: 5 },
    ],
    summary: ['<b>Skaler yoldan, vektörel yer değiştirmeden hesaplanır.</b>', 'Dört adım: alınan yol, yer değiştirme, ortalama sürat = yol / süre, ortalama hız = yer değiştirme / süre.', 'Ortalama hızın büyüklüğü ortalama sürati geçemez; yol ve süre tek başına ortalama hızı vermez.'],
    nextLesson: { href: 'e7-trafikte-hareket.html', label: 'Sonraki: Trafikte hareketin kavramları: sürat sınırı ve yeşil dalga ›' },
  });
})();
