/* A3 — Sıfır ve işaret: f(x) = x
   Fonksiyonun sıfırı (sarı), pozitif olduğu yer (yeşil, eksenin üstü), negatif olduğu yer (mor, eksenin altı);
   işaretin tanım kümesine bağlı olması.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, sayi, yaz, yazi, par, gizle, belir, kaybol, pop, soyle, duzlem, dogru, nokta, alan, etiket, isaretTablosu } = window.KIT;
  const { lerp, ease } = Ders;
  const D = { x0: 70, y0: 50, w: 460, h: 460 };

  /* [a, b] aralığında f(x) = x: parça, iki işaret bölgesi, sıfır noktası */
  function isaretli(dz, a, b) {
    const neg = alan(dz, [[0, 0]], { renk: RENK.eksi }), poz = alan(dz, [[0, 0]], { renk: RENK.arti });
    const d = dogru(dz, 1, 0, { x1: a, x2: b });
    const sifir = nokta(dz, 0, 0, { r: 9 });
    const api = { neg, poz, d, sifir, koy(a2, b2) {
      d.ayarla(1, 0, a2, b2);
      neg.ayarla(a2 < 0 ? [[a2, 0], [Math.min(b2, 0), 0], [Math.min(b2, 0), Math.min(b2, 0)], [a2, a2]] : [[0, 0]]);
      poz.ayarla(b2 > 0 ? [[Math.max(a2, 0), 0], [b2, 0], [b2, b2], [Math.max(a2, 0), Math.max(a2, 0)]] : [[0, 0]]);
      sifir.el.style.display = a2 <= 0 && b2 >= 0 ? '' : 'none';
    } };
    api.koy(a, b);
    return api;
  }
  /* sağ sütunda üç satır: sıfırı, negatif, pozitif */
  function ozet(svg, y) {
    const satir = (k, ad, renk) => ({ ad: yazi(svg, 610, y + k * 92, ad, { size: 24, renk, hiza: 'start' }), deger: yazi(svg, 610, y + k * 92 + 44, '', { size: 36, kalin: 700, hiza: 'start' }) });
    return { sifir: satir(0, 'sıfırı', RENK.sifir), neg: satir(1, 'negatif olduğu yer', RENK.eksi), poz: satir(2, 'pozitif olduğu yer', RENK.arti) };
  }
  const ozetYaz = (o, a, b) => {
    yaz(o.sifir.deger, a <= 0 && b >= 0 ? 'x = 0' : 'yok');
    yaz(o.neg.deger, a < 0 ? '[' + sayi(a) + ', 0)' : 'yok');
    yaz(o.poz.deger, a <= 0 ? '(0, ' + sayi(b) + ']' : '[' + sayi(a) + ', ' + sayi(b) + ']');
  };

  /* ---- 1. Sıfır ---- */
  async function sifir(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    dogru(dz, 1, 0);
    const p = nokta(dz, 0, 0, { r: 10 }); gizle(p.el);
    const denklem = yazi(svg, 765, 220, 'f(x) = 0', { size: 46, kalin: 700 });
    const cozum = yazi(svg, 765, 300, 'x = 0', { size: 52, kalin: 700, renk: RENK.sifir });
    gizle(denklem, cozum);
    await soyle(c, 'f(x) = x’in grafiği x eksenini bir yerde kesiyor.', { speak: 'f x eşittir x fonksiyonunun grafiği x eksenini bir yerde kesiyor.' });
    await c.choice({
      tag: 'Tahmin et', q: 'f(x) = x hangi x için 0 değerini alır?',
      options: ['x = 1', 'x = 0', 'Hiçbir x için'], answer: 1,
      hints: ['f(1) = 1 olur; 0 değil.', '', 'Çıktı girdiye eşit: f(0) = 0.'],
      right: 'f(0) = 0.',
    });
    await par(soyle(c, 'Doğru x eksenini tam burada keser.'), pop(c, p, dz.X(0), dz.Y(0)), belir(c, denklem, 500));
    await par(soyle(c, 'f(x) = 0 yapan x: fonksiyonun <b>sıfırı</b>.', { dur: true }), belir(c, cozum, 500));
    c.note('<b>Fonksiyonun sıfırı:</b> f(x) = 0 yapan x.<br>f(x) = x için x = 0', 'Sıfır', 'a3-sifir');
  }

  /* ---- 2. İşaret ---- */
  async function isaret(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const b = isaretli(dz, -5, 5); gizle(b.neg.el, b.poz.el);
    const pozT = etiket(dz, 3.4, 1.2, 'pozitif', { renk: RENK.arti, size: 24 }), negT = etiket(dz, -3.7, -1.9, 'negatif', { renk: RENK.eksi, size: 24 });
    gizle(pozT, negT);
    const tb = isaretTablosu(svg, { x: 590, y: 200, w: 370, ad: 'f(x)', kok: '0', sol: '−', sag: '+' });
    gizle(tb.g, tb.sol, tb.sag);
    await par(soyle(c, 'Sıfırın sağında grafik eksenin üstünde: f <b>pozitif</b>.'), belir(c, [b.poz.el, pozT], 600));
    await par(soyle(c, 'Solunda eksenin altında: f <b>negatif</b>.'), belir(c, [b.neg.el, negT], 600));
    await par(soyle(c, 'İşaretleri tek satırda toplayalım.'), (async () => { await belir(c, tb.g, 400); await belir(c, tb.sol, 300); await belir(c, tb.sag, 300); })());
    await c.choice({
      tag: 'Tahmin et', q: 'f(0) pozitif mi, negatif mi?',
      options: ['Pozitif', 'Negatif', 'Hiçbiri'], answer: 2,
      hints: ['f(0) = 0; 0 pozitif sayılmaz.', 'f(0) = 0; 0 negatif sayılmaz.', ''],
      right: '0 ne pozitif ne negatiftir.',
    });
    await soyle(c, 'İşaret tam sıfırda değişir.');
    c.note('<b>İşaret:</b> eksenin üstü +, altı −.<br>f(x) = x: x &gt; 0 için +', 'İşaret', 'a3-isaret');
  }

  /* ---- 3. Aralık değişirse ---- */
  async function aralikDegisirse(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const b = isaretli(dz, -5, 5);
    const u1 = nokta(dz, -2, -2, { renk: RENK.f, r: 9 }), u2 = nokta(dz, 4, 4, { renk: RENK.f, r: 9 }); gizle(u1.el, u2.el);
    const o = ozet(svg, 120); ozetYaz(o, -2, 4);
    const hepsi = [o.sifir, o.neg, o.poz].flatMap((s_) => [s_.ad, s_.deger]); gizle(hepsi);
    await par(soyle(c, 'Tanım kümesi [−2, 4] olsun.', { speak: 'Tanım kümesi eksi iki ile dört arasındaki kapalı aralık olsun.' }), (async () => {
      await c.tween(1000, (e) => b.koy(lerp(-5, -2, e), lerp(5, 4, e)), ease.inOut);
      await belir(c, [u1.el, u2.el], 300);
    })());
    await par(soyle(c, 'Negatif olduğu yer kısaldı; sıfırı yerinde.'), belir(c, hepsi, 500));
    await par(soyle(c, 'Şimdi tanım kümesi [1, 4].', { speak: 'Şimdi tanım kümesi bir ile dört arasındaki kapalı aralık.' }), (async () => {
      await kaybol(c, hepsi, 300);
      await c.tween(1100, (e) => { const a = lerp(-2, 1, e); b.koy(a, 4); u1.git(a, a); }, ease.inOut);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Bu aralıkta f’nin sıfırı var mı?',
      options: ['Var: x = 0', 'Yok'], answer: 1,
      hints: ['0 bu aralıkta değil; f oraya hiç uğramaz.', ''],
      right: 'Aralıkta 0 yok; f hep pozitif.',
    });
    ozetYaz(o, 1, 4);
    await par(soyle(c, 'İşaret ve sıfır, tanım kümesine bağlıdır.', { ton: 'thoughtful' }), belir(c, hepsi, 500));
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, D);
    const b = isaretli(dz, -2, 4);
    const u1 = nokta(dz, -2, -2, { renk: RENK.f, r: 9 }); nokta(dz, 4, 4, { renk: RENK.f, r: 9 });
    const o = ozet(svg, 120);
    await soyle(c, 'Sol ucu değiştir; işaretin nerede değiştiğine bak.', { noWait: true });
    c.slider({ label: 'Sol uç (sağ uç 4)', min: -4, max: 3, step: 1, value: -2, fmt: (v) => sayi(v), onInput: (a) => { b.koy(a, 4); u1.git(a, a); ozetYaz(o, a, 4); } });
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a3', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Sıfır ve işaret: f(x) = x', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Sıfır ve işaret', hook: 'Termometre 0’ın altına düştüğünde ne değişir, <b>0’ın üstünde ne farklıdır?</b>', button: 'Derse başla ›' },
    goals: ['f(x) = x’in sıfırını bulur.', 'Fonksiyonun pozitif ve negatif olduğu yerleri grafikten okur.', 'İşaretin tanım kümesine bağlı olduğunu görür.'],
    scenes: [
      { title: 'Sıfır', goal: 'Fonksiyonun sıfırını grafikte bul.', run: sifir },
      { title: 'İşaret', goal: 'Eksenin üstünü ve altını ayırt et.', run: isaret },
      { title: 'Aralık değişirse', goal: 'İşaretin tanım kümesine bağlı olduğunu gör.', run: aralikDegisirse },
      { title: 'Dene', goal: 'Aralığın ucunu değiştir, işaret bölgelerini izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'f(x) = x, [−3, 2] aralığında tanımlı. f hangi x’lerde <b>negatiftir</b>?', options: ['[−3, 0]', '[−3, 0)', '(0, 2]'], answer: 1,
        why: ['0 dahil olmaz: f(0) = 0, negatif değil.', 'Sıfırın solunda grafik eksenin altında; 0’ın kendisi hariç.', 'Burada grafik eksenin üstünde: f pozitif.'], scene: 2 },
      { q: 'Grafikte fonksiyonun <b>sıfırı</b> nerededir?', options: ['x eksenini kestiği yerde', 'y eksenini kestiği yerde', 'En alçak noktasında'], answer: 0,
        why: ['Orada f(x) = 0 olur.', 'y ekseninde x = 0’dır; orada okunan f(0) değeridir, sıfır değil.', 'En alçak nokta değerin 0 olduğu yer olmak zorunda değil.'], scene: 0 },
    ],
    summary: [
      '<b>Sıfır, işaretin değiştiği yerdir.</b>',
      '<b>Sıfır:</b> f(x) = 0 yapan x; grafiğin x eksenini kestiği yer.',
      'Eksenin üstünde f pozitif, altında negatiftir. Hangi x’lerde olduğu tanım kümesine bağlıdır.',
    ],
    nextLesson: { href: 'a4-artanlik-ve-uc-degerler.html', label: 'Sonraki: Artanlık ve uç değerler ›' },
  });
})();
