/* A2 — Girdi ve çıktı kümeleri
   Tanım kümesi (x eksenindeki gölge, sarı) ve görüntü kümesi (y eksenindeki gölge, turuncu); aralıkta tanımlı f(x) = x.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, ciz, soyle, duzlem, dogru, nokta, iz, serit } = window.KIT;
  const { lerp, ease } = Ders;
  const D = { x0: 70, y0: 50, w: 460, h: 460 };
  const aralik = (a, b) => '[' + sayi(a) + ', ' + sayi(b) + ']';
  /* sağ sütunda küme adı ve değeri */
  const kumeYazisi = (svg, y, ad, renk) => ({ ad: yazi(svg, 765, y, ad, { size: 26, renk }), deger: yazi(svg, 765, y + 58, '', { size: 46, kalin: 700 }) });

  /* ---- 1. Girebildiklerin ---- */
  async function girebildiklerin(c) {
    const svg = c.svg(1000, 562);
    const tus = S('g', {}, svg);
    for (let k = 0; k < 9; k++) {
      const x = 377 + (k % 3) * 86, y = 80 + Math.floor(k / 3) * 86;
      S('rect', { x, y, width: 74, height: 74, rx: 12, fill: RENK.kutu, stroke: RENK.kenar, 'stroke-width': 2 }, tus);
      yazi(tus, x + 37, y + 49, String(k + 1), { size: 34, kalin: 700 });
    }
    const kume = yazi(svg, 500, 420, '{1, 2, …, 9}', { size: 46, kalin: 700, renk: RENK.sifir });
    const kumeAd = yazi(svg, 500, 472, 'tanım kümesi', { size: 26, renk: RENK.soluk });
    gizle(kume, kumeAd);
    await soyle(c, 'Bu otomat tek tuşla çalışır: 1’den 9’a kadar.');
    await c.choice({
      tag: 'Tahmin et', q: 'Bu otomatta 0 numaralı ürünü seçebilir misin?',
      options: ['Evet', 'Hayır'], answer: 1,
      hints: ['Tuş takımında 0 yok; yalnızca 1’den 9’a kadar girilir.', ''],
      right: 'Girebildiklerin belli: 1, 2, …, 9.',
    });
    await par(soyle(c, 'Girebildiğin sayıların kümesi: <b>tanım kümesi</b>.'), belir(c, [kume, kumeAd], 500));
    await kaybol(c, [tus, kume, kumeAd], 400);

    const dz = duzlem(svg, D); dz.g.style.opacity = 0;
    dogru(dz, 1, 0);
    const sx = serit(dz, 'x', -5, 5); gizle(sx.el);
    const t = kumeYazisi(svg, 210, 'tanım kümesi', RENK.sifir); yaz(t.deger, 'ℝ'); gizle(t.ad, t.deger);
    await par(soyle(c, 'f(x) = x’e her gerçek sayı girebilir.'), belir(c, dz.g, 500));
    await par(soyle(c, 'Tanım kümesi x ekseninin tamamıdır.'), ciz(c, sx, 1000), belir(c, [t.ad, t.deger], 500));
    c.note('<b>Tanım kümesi:</b> girebilen x’lerin kümesi.<br>f(x) = x için ℝ', 'Tanım kümesi', 'a2-tanim');
  }

  /* ---- 2. Çıkabildiklerin ---- */
  async function cikabildiklerin(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    dogru(dz, 1, 0);
    const sy = serit(dz, 'y', -5, -5, { renk: RENK.g });
    const izler = iz(dz, 2.5, 2.5, { renk: RENK.g }), p = nokta(dz, 2.5, 2.5, { renk: RENK.g, r: 9 });
    gizle(izler.g, p.el);
    const g = kumeYazisi(svg, 210, 'görüntü kümesi', RENK.g); yaz(g.deger, 'ℝ'); gizle(g.ad, g.deger);
    await soyle(c, 'Şimdi çıktılara bak: değerler y ekseninde okunur.');
    await c.choice({
      tag: 'Tahmin et', q: 'f(x) = x’ten 2,5 çıkabilir mi?',
      options: ['Hayır: yalnızca tam sayılar çıkar', 'Evet: x = 2,5 için'], answer: 1,
      hints: ['Girdi her gerçek sayı olabilir; 2,5 de girer.', ''],
      right: 'f(2,5) = 2,5.',
    });
    await par(soyle(c, 'x = 2,5 girerse y ekseninde 2,5 çıkar.'), belir(c, [izler.g, p.el], 400));
    const yuru = (x) => { p.git(x, x); izler.ayarla(x, x); };
    await par(soyle(c, 'Nokta doğruyu gezerken izi y eksenini boyar.'), (async () => {
      await c.tween(900, (e) => yuru(lerp(2.5, -5, e)), ease.inOut);
      await c.tween(2000, (e) => { const x = lerp(-5, 5, e); yuru(x); sy.ayarla(-5, x); }, ease.inOut);
      await kaybol(c, [izler.g, p.el], 300);
    })());
    await par(soyle(c, 'Çıkabilen değerlerin kümesi: <b>görüntü kümesi</b>.'), belir(c, [g.ad, g.deger], 500));
    c.note('<b>Görüntü kümesi:</b> çıkabilen değerlerin kümesi.<br>f(x) = x için ℝ', 'Görüntü kümesi', 'a2-goruntu');
  }

  /* aralıkta tanımlı f(x) = x: parça, iki uç, iki gölge */
  function parca(dz, a, b) {
    const d = dogru(dz, 1, 0, { x1: a, x2: b }), sx = serit(dz, 'x', a, b), sy = serit(dz, 'y', a, b, { renk: RENK.g });
    const u1 = nokta(dz, a, a, { renk: RENK.f, r: 9 }), u2 = nokta(dz, b, b, { renk: RENK.f, r: 9 });
    return { d, sx, sy, u1, u2, koy(a2, b2) { d.ayarla(1, 0, a2, b2); sx.ayarla(a2, b2); sy.ayarla(a2, b2); u1.git(a2, a2); u2.git(b2, b2); } };
  }

  /* ---- 3. Aralıkta tanımlıysa ---- */
  async function aralikta(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const pr = parca(dz, -5, 5); gizle(pr.sx.el, pr.sy.el, pr.u1.el, pr.u2.el);
    const t = kumeYazisi(svg, 130, 'tanım kümesi', RENK.sifir), g = kumeYazisi(svg, 330, 'görüntü kümesi', RENK.g);
    yaz(t.deger, aralik(-2, 3)); yaz(g.deger, aralik(-2, 3)); gizle(t.ad, t.deger, g.ad, g.deger);
    await par(soyle(c, 'Tanım kümesi bu kez bir aralık olsun.'), belir(c, [t.ad, t.deger], 400));
    await par(soyle(c, 'Doğrudan yalnızca bu parça kalır; uçlar dahil.'), (async () => {
      await c.tween(1000, (e) => pr.d.ayarla(1, 0, lerp(-5, -2, e), lerp(5, 3, e)), ease.inOut);
      pr.sx.ayarla(-2, 3); pr.u1.git(-2, -2); pr.u2.git(3, 3);
      await belir(c, [pr.sx.el, pr.u1.el, pr.u2.el], 400);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Görüntü kümesi hangisi?',
      options: ['ℝ', '[0, 3]', '[−2, 3]'], answer: 2,
      hints: ['Doğrunun yalnızca bir parçası kaldı; her değer çıkmaz.', 'x negatifken çıktı da negatif: f(−2) = −2.', ''],
      right: 'En küçük çıktı −2, en büyük çıktı 3.',
    });
    const i1 = iz(dz, -2, -2, { renk: RENK.g }), i2 = iz(dz, 3, 3, { renk: RENK.g }); gizle(i1.g, i2.g);
    pr.sy.ayarla(-2, 3);
    await par(soyle(c, 'Çıktılar da −2 ile 3 arasında kalır.'), (async () => { await belir(c, [i1.g, i2.g], 400); await belir(c, [pr.sy.el, g.ad, g.deger], 500); })());
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const pr = parca(dz, -2, 3);
    const t = kumeYazisi(svg, 130, 'tanım kümesi', RENK.sifir), g = kumeYazisi(svg, 330, 'görüntü kümesi', RENK.g);
    let a = -2, b = 3;
    const koy = () => { pr.koy(a, b); yaz(t.deger, aralik(a, b)); yaz(g.deger, aralik(a, b)); };
    await soyle(c, 'Uçları değiştir; iki eksendeki gölgeyi izle.', { noWait: true });
    c.slider({ label: 'Sol uç', min: -4, max: 0, step: 1, value: a, fmt: (v) => sayi(v), onInput: (v) => { a = v; koy(); } });
    c.slider({ label: 'Sağ uç', tag: false, min: 1, max: 4, step: 1, value: b, fmt: (v) => sayi(v), onInput: (v) => { b = v; koy(); } });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a2', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Girdi ve çıktı kümeleri', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Girdi ve çıktı kümeleri', hook: 'Otomatın tuş takımında yalnızca 1’den 9’a kadar sayılar var. <b>Hangi numaralar girilebilir?</b>', button: 'Derse başla ›' },
    goals: ['f(x) = x’in tanım ve görüntü kümesini belirler.', 'Bir aralıkta tanımlı fonksiyonun görüntü kümesini grafikten okur.'],
    scenes: [
      { title: 'Girebildiklerin', goal: 'Tanım kümesini x ekseninde gör.', run: girebildiklerin },
      { title: 'Çıkabildiklerin', goal: 'Görüntü kümesini y ekseninde gör.', run: cikabildiklerin },
      { title: 'Aralıkta tanımlıysa', goal: 'Tanım kümesi daralınca görüntü kümesinin de daraldığını gör.', run: aralikta },
      { title: 'Dene', goal: 'Aralığın uçlarını değiştir, iki kümeyi izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'f(x) = x’in tanım kümesi [−1, 5] ise <b>görüntü kümesi</b> hangisidir?', options: ['ℝ', '[−1, 5]', '[0, 5]'], answer: 1,
        why: ['Girdi sınırlıysa çıktı da sınırlıdır; her değer çıkmaz.', 'Çıktı girdiye eşit: en küçük −1, en büyük 5.', 'f(−1) = −1 de çıkar; negatif çıktılar unutulmuş.'], scene: 2 },
      { q: 'Grafikte <b>tanım kümesi</b> hangi eksende okunur?', options: ['y ekseninde', 'İkisinde de', 'x ekseninde'], answer: 2,
        why: ['y ekseninde çıktılar, yani görüntü kümesi okunur.', 'Girdiler yalnızca x eksenindedir.', 'Girdiler x eksenindedir; grafiğin oradaki gölgesi tanım kümesidir.'], scene: 0 },
    ],
    summary: [
      '<b>Girebildiklerin tanım kümesi, çıkabildiklerin görüntü kümesidir.</b>',
      'Tanım kümesi x ekseninde, görüntü kümesi y ekseninde okunur.',
      'f(x) = x gerçek sayılarda tanımlıysa ikisi de ℝ; [−2, 3] aralığında tanımlıysa ikisi de [−2, 3].',
    ],
    nextLesson: { href: 'a3-sifir-ve-isaret.html', label: 'Sonraki: Sıfır ve işaret ›' },
  });
})();
