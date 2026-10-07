/* A15 — Bir aralıkta en büyük ve en küçük değer
   Aralıkta tanımlı doğrusal fonksiyonun uç değerleri; artanda sağ, azalanda sol uç; uç dahil değilse değer alınamaz.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/A-dogrusal-fonksiyonlar.md */
(() => {
  'use strict';
  const { RENK, S, sayi, kural, yaz, yazi, par, gizle, belir, kaybol, ciz, pop, soyle, duzlem, dogru, nokta, iz, etiket } = window.KIT;
  const { lerp, ease } = Ders;

  const DZ = { x0: 80, y0: 56, w: 360, h: 450, xmin: -3, xmax: 5, ymin: -2, ymax: 8, sayilar: false, xad: '', yad: '' };
  const KX = 725;   // sağ sütunun ortası

  /* [x1, x2] aralığında tanımlı y = ax + b parçası: uç noktaları, eksenlere inen izleri ve eksenlerdeki sayıları. */
  function parca(dz, a, b, x1, x2) {
    const api = { a, b, f: (x) => api.a * x + api.b, d: dogru(dz, a, b, { renk: RENK.g, x1, x2 }) };
    api.uc = [x1, x2].map((x) => {
      const izler = iz(dz, x, 0), p = nokta(dz, x, 0, { renk: RENK.g, r: 9 });
      const ex = etiket(dz, x, 0, sayi(x), { renk: RENK.soluk }), ey = etiket(dz, 0, 0, '', {});
      return { x, p, izler, ex, ey, els: [izler.g, p.el, ex, ey] };
    });
    api.ayarla = (a2, b2) => {
      api.a = a2; api.b = b2; api.d.ayarla(a2, b2);
      api.uc.forEach((u) => {
        const y = api.f(u.x);
        u.p.git(u.x, y); u.izler.ayarla(u.x, y);
        u.ex.setAttribute('x', dz.X(u.x) - (u.x === 0 ? 15 : 0)); u.ex.setAttribute('y', dz.Y(0) + (y >= 0 ? 27 : -12));
        yaz(u.ey, sayi(y)); u.ey.setAttribute('y', dz.Y(y) + 8);
        u.ey.setAttribute('text-anchor', u.x < 0 ? 'start' : 'end'); u.ey.setAttribute('x', dz.X(0) + (u.x < 0 ? 13 : u.x === 0 ? -27 : -13));
      });
      return api;
    };
    api.els = [api.d.el, ...api.uc.flatMap((u) => u.els)];
    return api.ayarla(a, b);
  }
  /* Uç değerin alındığı noktayı saran sarı halka. */
  const halka = (dz, x, y) => S('circle', { cx: dz.X(x), cy: dz.Y(y), r: 16, fill: 'none', stroke: RENK.sifir, 'stroke-width': 3.5 }, dz.on);
  const deger = (svg, y, ad) => yazi(svg, KX, y, ad, { size: 28 });
  const sonuc = (ad, v, renk = RENK.sifir) => [ad + ':  ', [v, renk]];
  const sari = (u) => { u.ey.style.fill = RENK.sifir; };

  /* ---- 1. Artan, kapalı aralık ---- */
  async function artan(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ), pr = parca(dz, 2, 1, -1, 3), [sol, sag] = pr.uc;
    yazi(svg, KX, 108, 'h(x) = 2x + 1', { size: 36, kalin: 700, renk: RENK.g });
    const aralik = yazi(svg, KX, 164, '[−1, 3]', { size: 30, renk: RENK.soluk });
    const buyuk = deger(svg, 300, sonuc('en büyük değer', 'h(3) = 7')), kucuk = deger(svg, 360, sonuc('en küçük değer', 'h(−1) = −1'));
    const h1 = halka(dz, 3, 7), h2 = halka(dz, -1, -1);
    const gezen = nokta(dz, -1, -1, { r: 7 });
    gizle(pr.els, aralik, buyuk, kucuk, h1, h2, gezen.el);

    await par(soyle(c, 'Bu doğru yalnızca −1 ile 3 arasında tanımlı.'), (async () => {
      await ciz(c, pr.d, 700); await belir(c, [sol.p.el, sag.p.el, sol.izler.g, sag.izler.g, sol.ex, sag.ex, aralik], 450);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Fonksiyon en büyük değerini hangi uçta alır?',
      options: ['Sol uçta, x = −1', 'Sağ uçta, x = 3'], answer: 1,
      hints: ['Fonksiyon artan: sola gittikçe değer küçülür.', ''],
      right: 'Artan fonksiyon sağa gittikçe yükselir.',
    });
    gezen.el.style.opacity = 1;
    await par(soyle(c, 'Sağa gittikçe değer büyüyor; en büyüğü sağ uçta.'), (async () => {
      await c.tween(1800, (e) => { const x = lerp(-1, 3, e); gezen.git(x, pr.f(x)); }, ease.inOut);
      gezen.el.style.opacity = 0; sari(sag);
      await belir(c, [h1, sag.ey], 350); await belir(c, buyuk, 400);
    })());
    await par(soyle(c, 'En küçük değer öbür uçta, solda.'), (async () => {
      sari(sol); await belir(c, [h2, sol.ey], 350); await belir(c, kucuk, 400);
    })());
    await soyle(c, 'İkisi de aralığın uçlarında çıktı.');
  }

  /* ---- 2. Azalan olunca ---- */
  async function azalan(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 80, y0: 56, w: 450, h: 450, xmin: -1, xmax: 5, ymin: -1, ymax: 5, sayilar: false, xad: '', yad: '' });
    const pr = parca(dz, -1, 4, 0, 3), [sol, sag] = pr.uc, X = 770;
    yazi(svg, X, 108, 'h(x) = −x + 4', { size: 36, kalin: 700, renk: RENK.g });
    const aralik = yazi(svg, X, 164, '[0, 3]', { size: 30, renk: RENK.soluk });
    const buyuk = yazi(svg, X, 300, sonuc('en büyük değer', 'h(0) = 4'), { size: 28 }), kucuk = yazi(svg, X, 360, sonuc('en küçük değer', 'h(3) = 1'), { size: 28 });
    const h1 = halka(dz, 0, 4), h2 = halka(dz, 3, 1);
    gizle(pr.els, aralik, buyuk, kucuk, h1, h2);

    await par(soyle(c, 'Şimdi azalan bir doğru: sağa gittikçe alçalıyor.'), (async () => {
      await ciz(c, pr.d, 700); await belir(c, [sol.p.el, sag.p.el, sol.izler.g, sag.izler.g, sol.ex, sag.ex, aralik], 450);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Bu kez en büyük değer hangi uçta?',
      options: ['Sağ uçta, x = 3', 'Sol uçta, x = 0'], answer: 1,
      hints: ['Azalan fonksiyon sağa gittikçe küçülür; sağ uç en alçak yer.', ''],
      right: 'Azalan fonksiyonda en yüksek nokta sol uçtadır.',
    });
    await par(soyle(c, 'Azalan fonksiyon en büyük değerini en başta alır.'), (async () => {
      sari(sol); await belir(c, [h1, sol.ey], 350); await belir(c, buyuk, 400);
    })());
    await par(soyle(c, 'En küçük değer bu kez sağ uçta.'), (async () => {
      sari(sag); await belir(c, [h2, sag.ey], 350); await belir(c, kucuk, 400);
    })());
    await soyle(c, 'Artanda sağ uç, azalanda sol uç en büyüğü verir.');
    c.note('<b>En büyük değer:</b> artanda sağ uçta, azalanda sol uçta; en küçük öbüründe.', 'Uç değerler', 'a15-uclar');
  }

  /* ---- 3. Uç dahil değilse ---- */
  async function acikUc(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ), pr = parca(dz, 2, 1, -1, 3), [sol, sag] = pr.uc;
    sag.p.bos(true);
    yazi(svg, KX, 108, 'h(x) = 2x + 1', { size: 36, kalin: 700, renk: RENK.g });
    yazi(svg, KX, 164, ['[−1, 3', [')', RENK.sifir]], { size: 30, renk: RENK.soluk });
    const satirlar = ['h(2,9) = 6,8', 'h(2,99) = 6,98', 'h(2,999) = 6,998'].map((s, k) => yazi(svg, KX, 260 + k * 52, s, { size: 30 }));
    const buyuk = deger(svg, 300, sonuc('en büyük değer', 'yok', RENK.kotu)), kucuk = deger(svg, 360, sonuc('en küçük değer', 'h(−1) = −1'));
    const h2 = halka(dz, -1, -1), gezen = nokta(dz, 1, 3, { r: 6 });
    dz.on.insertBefore(gezen.el, sag.p.el);   // boş ucun altında kalsın: uç hep boş görünür
    gizle(satirlar, buyuk, kucuk, h2, gezen.el);
    const git = (x0, x1, ms) => c.tween(ms, (e) => { const x = lerp(x0, x1, e); gezen.git(x, pr.f(x)); }, ease.out);

    await soyle(c, 'Aynı doğru; bu kez 3 aralığa dahil değil.');
    gezen.el.style.opacity = 1;
    await par(soyle(c, 'Nokta 3’e yaklaşıyor ama 3’ü alamıyor.'), (async () => { await git(1, 2.9, 1500); await belir(c, satirlar[0], 350); })());
    await par(soyle(c, 'Her adımda değer büyüyor; 7’ye hep biraz kalıyor.'), (async () => {
      await git(2.9, 2.99, 700); await belir(c, satirlar[1], 350); await c.wait(500);
      await git(2.99, 2.999, 700); await belir(c, satirlar[2], 350);
    })());
    await c.choice({
      tag: 'Tahmin et', q: 'Bu aralıkta en büyük değer kaç?',
      options: ['7', '6,998', 'Yok'], answer: 2,
      hints: ['h(x) = 7 yalnızca x = 3’te olur; 3 aralıkta değil.', '2,9999 da aralıkta; o daha büyük bir değer verir.', ''],
      right: 'Hangi değeri söylesen daha büyüğü var.',
    });
    await kaybol(c, [...satirlar, gezen.el], 300);
    await par(soyle(c, 'Hangi değeri seçersen seç, daha büyüğü var.'), belir(c, buyuk, 450));
    await par(soyle(c, 'Sol uç aralıkta; en küçük değer yine −1.'), (async () => {
      sari(sol); await belir(c, h2, 350); await belir(c, kucuk, 400);
    })());
    await soyle(c, 'Çocuk biletinde de böyle: 12 dahil değil, en pahalı yaş yok.');
    c.note('Uç dahil değilse oradaki değer alınamaz.<br>[−1, 3): en büyük değer yok', 'Dahil olmayan uç', 'a15-acik');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, DZ), pr = parca(dz, 2, 1, -1, 3);
    const kuralT = yazi(svg, KX, 108, '', { size: 36, kalin: 700, renk: RENK.g });
    const aralikT = yazi(svg, KX, 164, '', { size: 30, renk: RENK.soluk });
    const buyukT = deger(svg, 300, ''), kucukT = deger(svg, 360, '');
    const halkalar = pr.uc.map((u) => halka(dz, u.x, 0));
    const st = { dahil: [true, true], artan: true };
    const ciz_ = () => {
      pr.ayarla(st.artan ? 2 : -1, st.artan ? 1 : 4);
      yaz(kuralT, 'h(x) = ' + kural(pr.a, pr.b));
      yaz(aralikT, (st.dahil[0] ? '[' : '(') + '−1, 3' + (st.dahil[1] ? ']' : ')'));
      pr.uc.forEach((u, i) => {
        u.p.bos(!st.dahil[i]); u.ey.style.fill = st.dahil[i] ? RENK.sifir : RENK.soluk;
        halkalar[i].setAttribute('cy', dz.Y(pr.f(u.x))); halkalar[i].style.opacity = st.dahil[i] ? 1 : 0;
      });
      const b = st.artan ? 1 : 0, k = 1 - b;   // en büyük ve en küçük değerin arandığı uç
      const v = (i) => (st.dahil[i] ? ['h(' + sayi(pr.uc[i].x) + ') = ' + sayi(pr.f(pr.uc[i].x)), RENK.sifir] : ['yok', RENK.kotu]);
      yaz(buyukT, ['en büyük değer:  ', v(b)]); yaz(kucukT, ['en küçük değer:  ', v(k)]);
    };
    const dugme = (metin, degistir) => {
      const b = c.h('button', { class: 'opt', html: metin() });
      c.on(b, 'click', () => { degistir(); b.innerHTML = metin(); ciz_(); });
      return b;
    };
    const uc = (i, ad) => dugme(() => ad + ': <b>' + (st.dahil[i] ? 'dahil' : 'dahil değil') + '</b>', () => { st.dahil[i] = !st.dahil[i]; });
    ciz_();
    await soyle(c, 'Düğmelerle uçları ve yönü değiştir; değerleri izle.', { noWait: true });
    c.panel('Dene', c.h('div', { style: { display: 'grid', gap: '6px' } },
      uc(0, 'Sol uç'), uc(1, 'Sağ uç'),
      dugme(() => 'Fonksiyon: <b>' + (st.artan ? 'artan' : 'azalan') + '</b>', () => { st.artan = !st.artan; })));
    await c.cont('Devam ›');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a15', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Bir aralıkta en büyük ve en küçük değer', accent: '#6ea8ff', back: 'index.html',
    intro: { title: 'Bir aralıkta en büyük ve en küçük değer', hook: 'Çocuk bileti 12 yaşından küçüklere geçerli ve fiyat yaşla artıyor. <b>En pahalı çocuk bileti hangi yaşındır?</b>', button: 'Derse başla ›' },
    goals: ['Aralıkta tanımlı doğrusal fonksiyonun en büyük ve en küçük değerini bulur.', 'Artan ve azalan fonksiyonda hangi uca bakacağını bilir.', 'Uç aralığa dahil değilse o değerin alınamadığını açıklar.'],
    scenes: [
      { title: 'Artan, kapalı aralık', goal: 'En büyük ve en küçük değeri uçlarda bul.', run: artan },
      { title: 'Azalan olunca', goal: 'Azalan fonksiyonda uçları karşılaştır.', run: azalan },
      { title: 'Uç dahil değilse', goal: 'Dahil olmayan uçta ne olduğunu gör.', run: acikUc },
      { title: 'Dene', goal: 'Uçları ve yönü değiştir.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'h(x) = 3x − 2, [0, 4] aralığında en büyük değerini kaç alır?', options: ['−2', '10', '4'], answer: 1,
        why: ['−2 sol uçtaki değer; artan fonksiyonda en küçüğü odur.', 'Artan fonksiyon en büyük değerini sağ uçta alır: h(4) = 10.', '4 girdidir; sorulan çıktı: h(4) = 10.'], scene: 0 },
      { q: 'h(x) = x + 1, (2, 5) aralığında en küçük değeri kaçtır?', options: ['3', '2', 'Yoktur'], answer: 2,
        why: ['3 = h(2) olurdu, ama 2 aralıkta değil.', '2 aralığın ucu, bir çıktı değil; üstelik aralığa dahil değil.', 'Sol uç dahil değil: değerler 3’e yaklaşır, 3’ü alamaz.'], scene: 2 },
    ],
    summary: [
      '<b>Uç aralığa dahil değilse o uçtaki değer alınamaz.</b>',
      'Artan fonksiyon en büyük değerini sağ uçta, azalan fonksiyon sol uçta alır.',
      'En küçük değer öbür uçtadır.',
    ],
    nextLesson: { href: 'a16-parcali-gosterim.html', label: 'Sonraki: Parçalı gösterim ›' },
  });
})();
