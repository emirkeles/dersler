/* E3 — Konu tekrarı: Bernoulli İlkesi
   Yeni bilgi yok. Tek sahnede konunun beş kuralı tahtada sırayla toplanır; ardından sekiz soru gelir.
   Senaryo: plan/fizik/akiskanlar/senaryolar/E-bernoulli-ilkesi.md (E3). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, gizle, belir, par, ok } = window.KIT;
  const GOVDE = '#8f9bc4', GOVDE_KENAR = '#c3cbea', KAGIT = '#dfe5ff', AKIS = '#7f93b8', BEYAZ = '#ffffff';

  /* ---- ortak küçük çizimler ---- */
  /* İki asılı kâğıt: cx ortası, y0 üst çubuğun yüksekliği. Alt uçlar yakındır (üfleyince birbirine yaklaşmış). */
  function kagitlar(c, g, cx, y0) {
    cizgi(c, g, [cx - 45, y0], [cx + 45, y0], RENK.gri, 5);
    const yol = (s) => `M${cx + s * 30},${y0} Q${cx + s * 22},${y0 + 65} ${cx + s * 20},${y0 + 140}`;
    [-1, 1].forEach((s) => c.S('path', { d: yol(s), fill: 'none', stroke: KAGIT, 'stroke-width': 7, 'stroke-linecap': 'round' }, g));
  }
  /* Kâğıtların arasında sık akış çizgileri (sürat büyük). */
  function sikCizgiler(c, g, cx, ya, yb) {
    [-10, 0, 10].forEach((d) => cizgi(c, g, [cx + d, ya], [cx + d, yb], AKIS, 2));
  }

  /* ---- 1. Kesit alanı daraldıkça sürat artar ---- */
  function kesit(c, g) {
    c.S('polygon', { points: '30,110 150,110 190,135 310,135 310,165 190,165 150,190 30,190', fill: RENK.sivi, 'fill-opacity': 0.35 }, g);
    const S = { fill: 'none', stroke: GOVDE_KENAR, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
    c.S('path', Object.assign({ d: 'M30,110 H150 L190,135 H310' }, S), g);
    c.S('path', Object.assign({ d: 'M30,190 H150 L190,165 H310' }, S), g);
    cizgi(c, g, [70, 110], [70, 190], RENK.alan, 3, { 'stroke-dasharray': '9 6' });
    cizgi(c, g, [250, 135], [250, 165], RENK.alan, 3, { 'stroke-dasharray': '9 6' });
    ok(c, g, [38, 150], [94, 150], BEYAZ, 5);
    ok(c, g, [198, 150], [302, 150], BEYAZ, 5);
    renkli(c, g, 170, 238, [['küçük kesit', RENK.alan], ', ', ['büyük sürat', BEYAZ]], { size: 22 });
  }

  /* ---- 2. Sürati artan yerde basınç azalır (Bernoulli İlkesi) ---- */
  function bernoulli(c, g) {
    const cx = 500, y0 = 50;
    kagitlar(c, g, cx, y0);
    sikCizgiler(c, g, cx, y0 + 25, y0 + 135);
    [cx - 100, cx - 70, cx + 70, cx + 100].forEach((x) => cizgi(c, g, [x, y0 + 25], [x, y0 + 135], AKIS, 2));
    const w = 178;
    c.S('rect', { x: cx - w / 2, y: 216, width: w, height: 38, rx: 10, fill: RENK.basinc, 'fill-opacity': 0.25 }, g);
    yazi(c, g, cx, 243, 'düşük basınç', { size: 22, kalin: 700, renk: RENK.basinc });
  }

  /* ---- 3. En küçük kesitte sürat en büyük, basınç en küçük ---- */
  function siralama(c, g) {
    const xs = [730, 830, 930], h = [110, 76, 40], okBoy = [26, 44, 64], bar = [44, 30, 16], cy = 95;
    xs.forEach((x, i) => {
      c.S('rect', { x: x - 40, y: cy - h[i] / 2, width: 80, height: h[i], rx: 6, fill: RENK.sivi, 'fill-opacity': 0.35, stroke: GOVDE_KENAR, 'stroke-width': 3 }, g);
      ok(c, g, [x - okBoy[i] / 2, cy], [x + okBoy[i] / 2, cy], BEYAZ, 5);
      yazi(c, g, x, 178, 'A' + ['₁', '₂', '₃'][i], { size: 24, kalin: 700, renk: RENK.alan });
      c.S('rect', { x: x - 15, y: 235 - bar[i], width: 30, height: bar[i], rx: 3, fill: RENK.basinc }, g);
      yazi(c, g, x, 264, 'P' + ['₁', '₂', '₃'][i], { size: 24, kalin: 700, renk: RENK.basinc });
    });
  }

  /* ---- 4. Cisim, düşük basınçlı tarafa itilir ---- */
  function itilir(c, g) {
    const cx = 280, y0 = 335;
    kagitlar(c, g, cx, y0);
    sikCizgiler(c, g, cx, y0 + 25, y0 + 130);
    ok(c, g, [cx - 125, 410], [cx - 42, 410], RENK.kuvvet, 6);
    ok(c, g, [cx + 125, 410], [cx + 42, 410], RENK.kuvvet, 6);
    yazi(c, g, cx - 84, 388, 'kuvvet', { size: 22, kalin: 700, renk: RENK.kuvvet });
  }

  /* ---- 5. Uçakta başka kuvvetler de etkilidir ---- */
  function ucak(c, g) {
    const cx = 700, cy = 400;
    const ST = { fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5, 'stroke-linejoin': 'round' };
    c.S('polygon', Object.assign({ points: `${cx - 62},${cy - 4} ${cx - 82},${cy - 42} ${cx - 54},${cy - 42} ${cx - 30},${cy - 12}` }, ST), g);
    c.S('polygon', Object.assign({ points: `${cx - 14},${cy + 6} ${cx + 38},${cy + 6} ${cx + 8},${cy + 38} ${cx - 6},${cy + 38}` }, ST), g);
    c.S('ellipse', Object.assign({ cx, cy, rx: 72, ry: 17 }, ST), g);
    ok(c, g, [cx, cy + 46], [cx, cy + 104], RENK.kuvvet, 6);
    yazi(c, g, cx + 14, cy + 90, 'ağırlık', { hiza: 'start', size: 22, kalin: 700, renk: RENK.kuvvet });
    ok(c, g, [cx, cy - 22], [cx, cy - 80], RENK.kaldirma, 6);
    yazi(c, g, cx + 14, cy - 44, 'kaldırma', { hiza: 'start', size: 22, kalin: 700, renk: RENK.kaldirma });
    ok(c, g, [cx + 78, cy], [cx + 140, cy], RENK.kuvvet, 6);
    yazi(c, g, cx + 112, cy + 32, 'itme', { size: 22, kalin: 700, renk: RENK.kuvvet });
    ok(c, g, [cx - 88, cy + 4], [cx - 150, cy + 4], RENK.kuvvet, 6);
    yazi(c, g, cx - 122, cy + 36, 'sürükleme', { size: 22, kalin: 700, renk: RENK.kuvvet });
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const onceki = [];
    const kural = async (yap, cumle, secenek) => {
      const g = c.S('g', {}, svg); yap(c, g); gizle(g);
      c.clearSay();
      await par(c.say(cumle, secenek), belir(c, g, 400), ...onceki.map((e) => belir(c, e, 400, 0.45)));
      await c.wait(400);
      onceki.push(g);
    };

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Bernoulli İlkesi', { size: 72, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konuda öğrendiklerimizi beş kuralda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    await kural(kesit, 'Kesit alanı daraldıkça akışkanın sürati artar.');
    c.note('<b>Kesit daralınca sürat artar.</b>', 'Bernoulli', 'ak-e3-kesit');
    await kural(bernoulli, 'Sürati artan yerde basınç azalır: Bernoulli İlkesi.');
    c.note('<b>Sürat artınca basınç azalır.</b>', 'Bernoulli', 'ak-e3-ilke');
    await kural(siralama, 'Kesit alanı en küçük yerde sürat en büyük, basınç en küçüktür.');
    c.note('En dar yerde <b>sürat en büyük, basınç en küçük</b>.', 'Bernoulli', 'ak-e3-en-kucuk');
    await kural(itilir, 'Cisim, hızlı akan akışkanın düşük basınçlı tarafına itilir.');
    c.note('Cisim <b>düşük basınçlı tarafa</b> itilir.', 'Bernoulli', 'ak-e3-itilir');
    await kural(ucak, 'Uçakta Bernoulli İlkesi’nin yanında başka kuvvetler de etkilidir.');
    c.note('Uçakta <b>başka kuvvetler de</b> etkilidir.', 'Bernoulli', 'ak-e3-ucak');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'akiskanlar-e3', kicker: 'Konu E · Bernoulli İlkesi', title: 'Konu tekrarı: Bernoulli İlkesi', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Bernoulli İlkesi',
      hook: 'İki dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun beş kuralını hatırlar.', 'Kuralları farklı durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun beş kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Yatay bir boru geniş bölümden dar bölüme geçiyor. Dar bölümde sürat ve basınç için hangisi doğrudur?',
        options: ['Sürat de basınç da büyüktür', 'Sürat büyük, basınç küçüktür', 'Sürat küçük, basınç büyüktür'], answer: 1,
        why: ['Sürat arttığı yerde basınç büyümez, azalır.', 'Dar bölümde akışkanın sürati artar; sürati artan yerde basınç azalır.', 'Dar bölümde sürat azalmaz, tersine artar.'], scene: 0,
      },
      {
        q: 'Kesit alanları A₁ > A₃ > A₂ olan bir borudan su akıyor. Süratler arasındaki doğru sıralama hangisidir?',
        options: ['v₂ > v₃ > v₁', 'v₁ > v₃ > v₂', 'v₃ > v₁ > v₂'], answer: 0,
        why: ['En küçük kesit A₂ olduğundan sürat en büyük v₂’dir; ardından v₃, en küçük sürat v₁’dir.', 'Bu sıralamada en büyük kesitte en büyük sürat var; oysa kesit küçüldükçe sürat artar.', 'En küçük kesit A₂ olduğu için v₂ en küçük olamaz; en büyük sürat orada olur.'], scene: 0,
      },
      {
        q: 'Kesit alanları A₁ > A₃ > A₂ olan bir borunun düşey borularında su yükseklikleri h₁, h₃, h₂ ölçülüyor. Hangi sıralama vardır?',
        options: ['h₂ > h₃ > h₁', 'h₁ > h₂ > h₃', 'h₁ > h₃ > h₂'], answer: 2,
        why: ['En küçük kesitte sürat en büyük, basınç en küçüktür; su yüksekliği h₂ de en küçük olur.', 'Bu sıra A₁ > A₂ > A₃ için doğru olurdu; burada A₃, A₂’den büyüktür.', 'Basınç, kesit alanıyla aynı sıradadır; su yüksekliği de basıncı gösterir: h₁ > h₃ > h₂.'], scene: 0,
      },
      {
        q: 'Ela, “Dar yerde su sıkışır, bu yüzden basınç artar” diyor. Bu söz için ne söylenir?',
        options: ['Doğru; dar yerde sürat azalır, basınç artar', 'Yanlış; dar yerde sürat artar, basınç azalır', 'Doğru; dar yerde sürat de basınç da artar'], answer: 1,
        why: ['Dar yerde sürat azalmaz, artar; basınç da artmaz, azalır.', 'Dar yerde akışkanın sürati artar, sürati artan yerde basınç azalır.', 'Sürat arttığı yerde basınç artmaz, tersine azalır.'], scene: 0,
      },
      {
        q: 'Dar bir yolda hızla geçen otobüsün yanında duran bisiklet otobüse doğru çekiliyor. Neden?',
        options: ['Aradaki havanın sürati artar, basıncı azalır', 'Aradaki havanın sürati azalır, basıncı artar', 'Otobüsün ağırlığı bisikleti çeker'], answer: 0,
        why: ['Aradaki havanın sürati artar, basıncı azalır; dışarıdaki daha büyük basınç bisikleti otobüse doğru iter.', 'Aradaki havanın sürati azalmaz, artar; basınç da artmaz, azalır.', 'Otobüsün ağırlığı aşağı yönlüdür; bisikleti yana çekmez.'], scene: 0,
      },
      {
        q: 'Hangisinde basınç farkından doğan kuvvet aşağı yönlüdür?',
        options: ['Fırtınada çatıda', 'Rüzgârda açık şemsiyede', 'Yarış arabasının arka kanadında'], answer: 2,
        why: ['Çatının üstünde basınç azalır; basınç farkından doğan kuvvet yukarı yönlüdür.', 'Şemsiyenin bombeli üst yüzeyinde basınç azalır; kuvvet yukarı yönlüdür.', 'Arka kanadın bombeli yüzeyi altta olduğundan basınç aşağıda küçüktür; kuvvet aşağı yönlüdür.'], scene: 0,
      },
      {
        q: 'Rüzgârlı bir günde bir çatı yerinden sökülüyor. Hangi ifade doğrudur?',
        options: ['İçerideki basınç, çatının üstündeki basınçtan küçüktür', 'İçerideki basınç, çatının üstündeki basınçtan büyüktür', 'İçerideki ve üstteki basınç eşittir'], answer: 1,
        why: ['İçerideki basınç küçük olsaydı çatı aşağı itilirdi; oysa yukarı sökülüyor.', 'Çatının üstünde hava akar, sürat artar, basınç düşer; içerideki büyük basınç çatıyı yukarı iter.', 'Basınçlar eşit olsaydı net kuvvet olmaz, çatı yerinden sökülmezdi.'], scene: 0,
      },
      {
        q: 'Bir öğrenci, “Uçaklar yalnızca Bernoulli İlkesi sayesinde uçar” diyor. Bu söz için ne söylenir?',
        options: ['Eksik; ağırlık, kaldırma, sürükleme ve itme kuvvetleri de etkilidir', 'Doğru; uçağa başka bir kuvvet etki etmez', 'Yanlış; Bernoulli İlkesi uçağın uçmasında hiç etkili değildir'], answer: 0,
        why: ['Bernoulli İlkesi’nin yanında ağırlık, kaldırma, sürükleme ve itme kuvvetleri de etkilidir.', 'Uçağa ağırlık, sürükleme ve itme gibi başka kuvvetler de etki eder.', 'Uçakta Bernoulli İlkesi de etkilidir; ama tek etken değildir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Sürat arttığı yerde basınç azalır.</b>',
      'Kesit alanı en küçük yerde sürat en büyük, basınç en küçüktür.',
      'Cisim, düşük basınçlı tarafa itilir; uçakta başka kuvvetler de etkilidir.',
    ],
  });
})();
