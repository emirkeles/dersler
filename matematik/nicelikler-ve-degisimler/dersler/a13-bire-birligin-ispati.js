/* A13 — Bire birliğin ispatı
   a ≠ 0 iken h(x) = ax + b bire birdir: h(x₁) = h(x₂) hipotezinden x₁ = x₂ hükmüne.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, ciz, pop, soyle, duzlem, dogru, nokta, iz, etiket, adimlar } = window.KIT;

  /* ---- 1. Tanımı çevir ---- */
  async function tanimiCevir(c) {
    const svg = c.svg(1000, 562);
    // iki paket, ortada okunan barkod
    const paket = (x) => {
      const g = S('g', {}, svg);
      const kutu = S('rect', { x, y: 96, width: 116, height: 96, rx: 8, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 3 }, g);
      S('line', { x1: x + 58, y1: 96, x2: x + 58, y2: 192, stroke: RENK.kenar, 'stroke-width': 9 }, g);
      S('line', { x1: x, y1: 126, x2: x + 116, y2: 126, stroke: RENK.kenar, 'stroke-width': 2 }, g);
      return { g, kutu };
    };
    const p1 = paket(150), p2 = paket(734);
    const ok = (x1, x2) => {
      const g = S('g', {}, svg), yon = x2 > x1 ? 1 : -1;
      S('line', { x1, y1: 144, x2: x2 - yon * 12, y2: 144, stroke: RENK.soluk, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
      S('path', { d: `M${x2},144 l${-yon * 16},-9 v18 z`, fill: RENK.soluk }, g);
      return g;
    };
    const ok1 = ok(284, 400), ok2 = ok(716, 600);
    const barkod = S('g', {}, svg);
    S('rect', { x: 414, y: 84, width: 172, height: 120, rx: 10, fill: '#e9edf8' }, barkod);
    [0, 9, 15, 27, 34, 46, 52, 63, 75, 81, 93, 104, 110, 122, 133].forEach((dx, k) => S('rect', { x: 432 + dx, y: 98, width: [3, 2, 6, 3, 7, 2, 5, 6, 2, 6, 5, 2, 6, 5, 3][k], height: 68, fill: RENK.tahta }, barkod));
    yazi(barkod, 500, 194, '4071', { size: 22, kalin: 700, renk: RENK.tahta });

    const blok = (y, ad, ifade) => {
      const g = S('g', {}, svg);
      yazi(g, 500, y, ad, { size: 22, kalin: 500, renk: RENK.soluk });
      yazi(g, 500, y + 46, ifade, { size: 34, kalin: 700 });
      return g;
    };
    const tanim = blok(288, 'farklı girdi, farklı çıktı', 'x_{1} ≠ x_{2}  ise  h(x_{1}) ≠ h(x_{2})');
    const cevrik = blok(418, 'aynı çıktı, aynı girdi', ['h(x_{1}) = h(x_{2})', '  ise  ', ['x_{1} = x_{2}', RENK.sifir]]);
    gizle(p1.g, p2.g, ok1, ok2, barkod, tanim, cevrik);

    await par(soyle(c, 'İki paket okutuldu; ikisi de aynı barkodu verdi.'), (async () => {
      await belir(c, [p1.g, p2.g], 450); await belir(c, [ok1, ok2], 400); await belir(c, barkod, 450);
    })());
    await par(soyle(c, 'Her ürünün barkodu ayrıysa bu iki paket aynı üründür.'), c.tween(500, (e) => {
      [p1, p2].forEach((p) => { p.kutu.setAttribute('stroke', e > 0.5 ? RENK.sifir : RENK.kenar); });
    }));
    await par(soyle(c, 'Bire birliğin tanımı: farklı girdiler farklı çıktı verir.', { dur: true }), belir(c, tanim, 500));
    await par(soyle(c, 'Barkod aynı kuralı öbür yanından okudu.'), belir(c, cevrik, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Bu iki cümle aynı şeyi mi söyler?',
      options: ['Hayır, iki ayrı kural', 'Evet, aynı kural'], answer: 1,
      hints: ['Farklı ürünlerin barkodu hep farklıysa, aynı barkod aynı ürün demektir.', ''],
      right: 'Farklı girdiler hep farklı çıktı veriyorsa, aynı çıktı ancak aynı girdiden gelir.',
    });
    await par(soyle(c, 'İspatta ikinci yazımı kullanacağız: eşitlikle çalışmak kolay.'), belir(c, tanim, 400, 0.35));
    c.note('<b>Bire bir:</b> h(x<sub>1</sub>) = h(x<sub>2</sub>) ise x<sub>1</sub> = x<sub>2</sub>', 'Bire bir, eşitlikle', 'a13-tanim');
  }

  /* ---- 2. İspat ---- */
  async function ispat(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 50, y0: 110, w: 280, h: 340, xmin: -1, xmax: 6, ymin: -1, ymax: 7.5, sayilar: false, xad: '', yad: '' });
    dogru(dz, 1, 1, { renk: RENK.g });
    const cikti = dogru(dz, 0, 4, { renk: RENK.sifir, kalin: 3, kesik: true });
    const dik = S('line', { x1: dz.X(3), y1: dz.Y(4), x2: dz.X(3), y2: dz.Y(0), stroke: RENK.sifir, 'stroke-width': 2.5, 'stroke-dasharray': '5 6' }, dz.orta);
    const kesisim = nokta(dz, 3, 4, { r: 9 }), girdi = nokta(dz, 3, 0, { r: 6 });
    gizle(cikti.el, dik, kesisim.el, girdi.el);

    const ad = adimlar(svg, { x: 400, y: 160, aralik: 94, size: 34, gerekceX: 380 });
    const B = ['+ b', RENK.g], A = ['a', RENK.g];
    const s1 = ad.ekle('h(x_{1}) = h(x_{2})', 'hipotez');
    const s2 = ad.ekle(['ax_{1} ', B, ' = ax_{2} ', B]);
    const s3 = ad.ekle([A, 'x_{1} = ', A, 'x_{2}'], 'b çıkar');
    const s4 = ad.ekle('x_{1} = x_{2}', [['a ≠ 0', RENK.sifir], '   hüküm']);

    await soyle(c, 'h(x) = ax + b ve a sıfırdan farklı olsun.');
    await par(soyle(c, 'Hipotez: iki girdi aynı çıktıyı versin.'), (async () => { await belir(c, s1.g, 500); await ciz(c, cikti, 500); })());
    await par(soyle(c, 'Çıktıların yerine kuralı yaz.'), belir(c, s2.g, 500));
    await par(soyle(c, 'İki yandan b’yi çıkar.'), belir(c, s3.g, 500));
    await c.choice({
      tag: 'Tahmin et', q: 'Buradan x<sub>1</sub> = x<sub>2</sub> demek için ne yapmalı?',
      options: ['İki yana a ekle', 'İki yanı a’ya böl', 'İki yanı b’ye böl'], answer: 1,
      hints: ['a eklemek, x’in önündeki çarpanı kaldırmaz.', '', 'b artık eşitlikte yok; x’in önündeki çarpan a.'],
      right: 'a sıfır olmadığı için iki yan a’ya bölünebilir.',
    });
    await par(soyle(c, 'a sıfır değil; iki yanı a’ya bölebilirsin.'), belir(c, s4.g, 500));
    await par(soyle(c, 'Hüküm çıktı: iki girdi aslında aynı girdi.'), (async () => {
      await pop(c, kesisim, dz.X(3), dz.Y(4)); await belir(c, [dik, girdi.el], 400);
    })());
    await soyle(c, 'a sıfır olsaydı bu adım atılamazdı: sıfıra bölünmez.', { ton: 'thoughtful' });
    c.note('<b>a ≠ 0:</b> ax<sub>1</sub> = ax<sub>2</sub> ise x<sub>1</sub> = x<sub>2</sub>', 'Bire birliğin ispatı', 'a13-ispat');
  }

  /* ---- 3. Sayıyla dene ---- */
  async function sayiyla(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 80, y0: 52, w: 405, h: 450, xmin: -3, xmax: 6, ymin: -10, ymax: 15, xadim: 1, yadim: 5, xsayi: 2, ysayi: 99 });
    dogru(dz, 3, -2, { renk: RENK.g });
    const cizgi = dogru(dz, 0, 10, { renk: RENK.sifir, kalin: 3, kesik: true });
    const izler = iz(dz, 4, 10, { renk: RENK.sifir }), p = nokta(dz, 4, 10, { r: 10 });
    const yAd = etiket(dz, 0, 10, '', { dx: -12, dy: 8, hiza: 'end', renk: RENK.sifir });   // çıktının y eksenindeki değeri
    const KX = 745;
    yazi(svg, KX, 112, 'h(x) = 3x − 2', { size: 36, kalin: 700, renk: RENK.g });
    const g = S('g', {}, svg);
    const denk = yazi(g, KX, 240, '', { size: 34 });
    const cozum = yazi(g, KX, 312, '', { size: 44, kalin: 700 });
    yazi(g, KX, 400, 'tek girdi', { size: 26, kalin: 500, renk: RENK.soluk });
    const koy = (y) => {
      const x = (y + 2) / 3;
      cizgi.ayarla(0, y); p.git(x, y); izler.ayarla(x, y); yaz(yAd, sayi(y)); yAd.setAttribute('y', dz.Y(y) + 8);
      yaz(denk, ['3x − 2 = ', [sayi(y), RENK.sifir]]); yaz(cozum, 'x = ' + sayi(x));
    };
    koy(10);
    gizle(cizgi.el, izler.g, p.el, g, yAd);

    await soyle(c, 'İspatı bir örnekte görelim.');
    await c.choice({
      tag: 'Tahmin et', q: 'Çıktı 10 ise girdi kaç olabilir?',
      options: ['4 ya da −4', 'Yalnızca 4', 'Birçok değer'], answer: 1,
      hints: ['h(−4) = −14 eder; 10 etmez.', '', '3x − 2 = 10 denkleminin tek çözümü var.'],
      right: '3x − 2 = 10 ise x = 4; başka girdi yok.',
    });
    await par(soyle(c, 'Yatay çizgi bir çıktıyı gösterir; doğruyu tek noktada keser.'), (async () => {
      await par(ciz(c, cizgi, 500), belir(c, yAd, 400)); await pop(c, p, dz.X(4), dz.Y(10)); await belir(c, [izler.g, g], 450);
    })());
    await soyle(c, 'Çıktıyı değiştir; kesişim hiç iki tane oluyor mu?', { noWait: true });
    c.slider({ label: 'çıktı', min: -8, max: 13, step: 3, value: 10, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a13', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Bire birliğin ispatı', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Bire birliğin ispatı', hook: 'Bir mağaza her ürüne ayrı barkod verdiğini söylüyor. <b>Bunu nasıl denetlersin?</b>', button: 'Derse başla ›' },
    goals: ['Bire birliği h(x<sub>1</sub>) = h(x<sub>2</sub>) ise x<sub>1</sub> = x<sub>2</sub> diye yazar.', 'a ≠ 0 iken ax + b’nin bire bir olduğunu ispatlar.', 'a ≠ 0 koşulunun hangi adımda gerektiğini açıklar.'],
    scenes: [
      { title: 'Tanımı çevir', goal: 'Bire birliği eşitlikle yaz.', run: tanimiCevir },
      { title: 'İspat', goal: 'Eşit çıktılardan eşit girdilere var.', run: ispat },
      { title: 'Sayıyla dene', goal: 'Her çıktının tek girdisini bul.', run: sayiyla },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bire birlik ispatı hangi varsayımla başlar?', options: ['x<sub>1</sub> = x<sub>2</sub>', 'h(x<sub>1</sub>) = h(x<sub>2</sub>)', 'x<sub>1</sub> &lt; x<sub>2</sub>'], answer: 1,
        why: ['Bu hükümdür; ispat ona varır, ondan başlamaz.', 'Çıktılar eşit varsayılır, girdilerin eşitliğine varılır.', 'Bu, artanlık ispatının hipotezidir.'], scene: 1 },
      { q: 'ax<sub>1</sub> = ax<sub>2</sub> eşitliğinden x<sub>1</sub> = x<sub>2</sub> sonucuna geçmek için hangi koşul gerekir?', options: ['b ≠ 0', 'a &gt; 0', 'a ≠ 0'], answer: 2,
        why: ['b önceki adımda iki yandan çıkarıldı; bölmeyle ilgisi yok.', 'a negatif de olabilir; yeter ki sıfır olmasın.', 'İki yan a’ya bölünür; sıfıra bölünmez.'], scene: 1 },
      { q: 'h(x) = 5x + 2 için h(x<sub>1</sub>) = h(x<sub>2</sub>) = 17 ise hangisi doğrudur?', options: ['x<sub>1</sub> = 3, x<sub>2</sub> = −3', 'Bilinemez', 'x<sub>1</sub> = x<sub>2</sub> = 3'], answer: 2,
        why: ['h(−3) = −13; 17 değil.', 'a = 5 sıfır değil: h bire birdir, bu çıktının tek girdisi vardır.', '5x + 2 = 17 ise x = 3; bire bir fonksiyonda girdi tektir.'], scene: 2 },
      { q: 'h(x) = 0 · x + 6 bire bir midir?', options: ['Evet; kuralı ax + b biçiminde', 'Hayır; bütün girdiler 6 çıktısını verir', 'Evet; b ≠ 0'], answer: 1,
        why: ['İspat a ≠ 0 ister; burada a = 0.', 'a = 0: farklı girdiler aynı çıktıyı verir.', 'b’nin bire birlikle ilgisi yok; belirleyen a’dır.'], scene: 1 },
    ],
    summary: [
      '<b>Aynı çıktıyı veren iki girdi aslında aynı girdidir.</b>',
      'İspat h(x<sub>1</sub>) = h(x<sub>2</sub>) ile başlar, x<sub>1</sub> = x<sub>2</sub> ile biter.',
      'a’ya bölme adımı a ≠ 0 olduğu için atılabilir.',
    ],
    nextLesson: { href: 'a14-grafik-mi-cebir-mi.html', label: 'Sonraki: Grafik mi, cebir mi? ›' },
  });
})();
