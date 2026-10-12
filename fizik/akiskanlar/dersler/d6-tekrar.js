/* D6 — Konu tekrarı: Kaldırma kuvveti
   Yeni bilgi yok. Tek sahnede konunun altı kuralı 3 × 2 kart olarak tahtada sırayla toplanır; ardından on soru gelir.
   Senaryo: plan/fizik/akiskanlar/senaryolar/D-kaldirma-kuvveti.md (D6). */
(() => {
  'use strict';
  const { RENK, yazi, kutu, gizle, belir, par, ok } = window.KIT;
  const KAP = '#c3cbea', CISIM = '#b7bfd6', CISIM_KENAR = '#e4e9fb';
  const SIVI_KENAR = '#5aa7ff';

  /* Kart yuvaları: 280 × 180; sütunlar x 60, 360, 660; satırlar y 110, 310. */
  const YUVA = [[60, 110], [360, 110], [660, 110], [60, 310], [360, 310], [660, 310]];
  const D = 14;          // çizim bölgesinin kart üstünden uzaklığı
  const YAZI_Y = 164;    // kart yazısının taban çizgisi (kart üstünden)

  /* ---- küçük çizim parçaları ---- */
  const sivi = (c, p, x, y, w, h, ton = 0.35) => c.S('rect', { x, y, width: w, height: h, fill: RENK.sivi, 'fill-opacity': ton }, p);
  const kapCiz = (c, p, x1, x2, ust, taban) => c.S('path', {
    d: `M${x1},${ust} V${taban} H${x2} V${ust}`, fill: 'none', stroke: KAP, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
  }, p);
  const kup = (c, p, x, y, w, h) => c.S('rect', { x, y, width: w, height: h, rx: 3, fill: CISIM, stroke: CISIM_KENAR, 'stroke-width': 2 }, p);

  /* 1. Tanım: kapta cisim ve mor yukarı ok (yazı yok). */
  function tanim(c, g, cx, y0) {
    const t = y0 + D + 16;
    sivi(c, g, cx - 58, t + 26, 116, 90); kapCiz(c, g, cx - 60, cx + 60, t, t + 118);
    kup(c, g, cx - 20, t + 62, 40, 40);
    ok(c, g, [cx, t + 58], [cx, t + 24], RENK.kaldirma, 6);
  }

  /* 2. Bağlı olduğu üç şey: V_b (mor), d_s (mavi), g (turuncu); her etiketin üstünde küçük simge. */
  function uc(c, g, cx, y0) {
    const t = y0 + D;
    const a = cx - 85, b = cx, d = cx + 85;
    kup(c, g, a - 20, t + 36, 40, 40); c.S('rect', { x: a - 20, y: t + 36, width: 40, height: 40, rx: 3, fill: 'none', stroke: RENK.kaldirma, 'stroke-width': 3, 'stroke-dasharray': '6 4' }, g);
    c.S('rect', { x: b - 26, y: t + 32, width: 52, height: 48, rx: 6, fill: RENK.sivi, 'fill-opacity': 0.6, stroke: SIVI_KENAR, 'stroke-width': 2 }, g);
    ok(c, g, [d, t + 22], [d, t + 90], RENK.kuvvet, 6);
    yazi(c, g, a, y0 + YAZI_Y, 'V_{b}', { size: 30, kalin: 700, renk: RENK.kaldirma, math: true });
    yazi(c, g, b, y0 + YAZI_Y, 'd_{s}', { size: 30, kalin: 700, renk: RENK.sivi, math: true });
    yazi(c, g, d, y0 + YAZI_Y, 'g', { size: 30, kalin: 700, renk: RENK.kuvvet });
  }

  /* 3. İki derinlikte aynı boyda mor ok: derinlik etkisiz. */
  function derinlik(c, g, cx, y0) {
    const t = y0 + D;
    sivi(c, g, cx - 68, t + 14, 136, 102); kapCiz(c, g, cx - 70, cx + 70, t, t + 118);
    kup(c, g, cx - 50, t + 60, 28, 28);
    kup(c, g, cx + 22, t + 86, 28, 28);
    ok(c, g, [cx - 36, t + 56], [cx - 36, t + 24], RENK.kaldirma, 6);
    ok(c, g, [cx + 36, t + 82], [cx + 36, t + 50], RENK.kaldirma, 6);
    yazi(c, g, cx, y0 + YAZI_Y, 'derinlik etkisiz', { size: 24, kalin: 600 });
  }

  /* 4. Taşırma kabı ve taşan damla; formül (ayrı grupta, 6. cümlede belirir). */
  function tasirma(c, g, cx, y0) {
    const t = y0 + D;
    sivi(c, g, cx - 78, t + 26, 106, 90);
    c.S('path', { d: `M${cx - 80},${t + 14} V${t + 118} H${cx + 30} V${t + 26} L${cx + 62},${t + 38}`, fill: 'none', stroke: KAP, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    kup(c, g, cx - 40, t + 50, 36, 36);
    c.S('path', { d: `M${cx + 66},${t + 52} q-7,11 -7,17 a7,7 0 0 0 14,0 q0,-6 -7,-17 z`, fill: RENK.sivi, 'fill-opacity': 0.8 }, g);
    sivi(c, g, cx + 48, t + 96, 40, 20);
    c.S('path', { d: `M${cx + 48},${t + 86} V${t + 118} H${cx + 88} V${t + 86}`, fill: 'none', stroke: KAP, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    const f = c.S('g', {}, g);
    yazi(c, f, cx, y0 + YAZI_Y, 'F_{k} = V_{b} · d_{s} · g', { size: 26, kalin: 700, math: true });
    gizle(f);
    return { formul: f };
  }

  /* 5. Silindir ve F₁, F₂ okları. */
  function fark(c, g, cx, y0) {
    const t = y0 + D;
    sivi(c, g, cx - 62, t, 124, 118);
    c.S('rect', { x: cx - 22, y: t + 36, width: 44, height: 32, rx: 4, fill: CISIM, stroke: CISIM_KENAR, 'stroke-width': 2 }, g);
    ok(c, g, [cx, t + 2], [cx, t + 34], RENK.kuvvet, 6);
    ok(c, g, [cx, t + 116], [cx, t + 70], RENK.kuvvet, 6);
    yazi(c, g, cx + 12, t + 26, 'F₁', { size: 22, kalin: 700, hiza: 'start', renk: RENK.kuvvet });
    yazi(c, g, cx + 12, t + 108, 'F₂', { size: 22, kalin: 700, hiza: 'start', renk: RENK.kuvvet });
    yazi(c, g, cx, y0 + YAZI_Y, 'F_{k} = F₂ − F₁', { size: 26, kalin: 700, math: true });
  }

  /* 6. Üç küçük kap: yüzen, askıda, batan; F_k = G ve F_k < G (batan kap ve yazısı 9. cümlede belirir). */
  function denge(c, g, cx, y0) {
    const t = y0 + D + 6;
    const kap = (x, nesneY) => {
      sivi(c, g, x + 1, t + 24, 68, 64);
      c.S('path', { d: `M${x},${t + 2} V${t + 90} H${x + 70} V${t + 2}`, fill: 'none', stroke: KAP, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
      const n = c.S('rect', { x: x + 22, y: t + nesneY, width: 26, height: 20, rx: 3, fill: CISIM, stroke: CISIM_KENAR, 'stroke-width': 2 }, g);
      return n;
    };
    kap(cx - 115, 14); kap(cx - 35, 44);
    yazi(c, g, cx - 40, y0 + YAZI_Y, 'F_{k} = G', { size: 26, kalin: 700, math: true });
    const b = c.S('g', {}, g);
    const x3 = cx + 45;
    sivi(c, b, x3 + 1, t + 24, 68, 64);
    c.S('path', { d: `M${x3},${t + 2} V${t + 90} H${x3 + 70} V${t + 2}`, fill: 'none', stroke: KAP, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, b);
    c.S('rect', { x: x3 + 22, y: t + 68, width: 26, height: 20, rx: 3, fill: CISIM, stroke: CISIM_KENAR, 'stroke-width': 2 }, b);
    yazi(c, b, x3 + 35, y0 + YAZI_Y, 'F_{k} < G', { size: 26, kalin: 700, math: true });
    gizle(b);
    return { batan: b };
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const onceki = [];
    const kart = (i) => {
      const [x0, y0] = YUVA[i];
      const g = c.S('g', {}, svg);
      kutu(c, g, x0, y0, 280, 180, { rx: 14 });
      return { g, cx: x0 + 140, y0 };
    };
    /* Yeni kart belirir, öncekiler 0,45'e iner; cümle onunla birlikte söylenir. */
    const goster = async (k, cumle, secenek) => {
      gizle(k.g);
      c.clearSay();
      await par(c.say(cumle, secenek), belir(c, k.g, 400), ...onceki.map((e) => belir(c, e, 400, 0.45)));
      await c.wait(400);
      onceki.push(k.g);
    };

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Kaldırma kuvveti', { size: 72, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    // 1. Tanım
    const k1 = kart(0); tanim(c, k1.g, k1.cx, k1.y0);
    await goster(k1, 'Sıvının cisme uyguladığı yukarı kuvvete kaldırma kuvveti denir.');
    c.note('Sıvının cisme uyguladığı <b>yukarı kuvvet</b>.', 'Tanım', 'ak-d6-tanim');

    // 2. Bağlı olduğu üç şey
    const k2 = kart(1); uc(c, k2.g, k2.cx, k2.y0);
    await goster(k2, 'Kaldırma kuvveti batan hacme, sıvının yoğunluğuna ve g’ye bağlıdır.', { speak: 'Kaldırma kuvveti batan hacme, sıvının yoğunluğuna ve ge’ye bağlıdır.' });
    c.note('<b>V<sub>b</sub>, d<sub>s</sub> ve g</b>’ye bağlıdır.', 'Bağlılık', 'ak-d6-baglilik');

    // 3. Derinlik
    const k3 = kart(2); derinlik(c, k3.g, k3.cx, k3.y0);
    await goster(k3, 'Tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir.');
    c.note('Tamamen batmışta <b>derinliğe bağlı değildir</b>.', 'Derinlik', 'ak-d6-derinlik');

    // 4. Arşimet İlkesi ve model (aynı kart)
    const k4 = kart(3); const t4 = tasirma(c, k4.g, k4.cx, k4.y0);
    await goster(k4, 'Arşimet İlkesi: kaldırma kuvveti, yeri değişen sıvının ağırlığına eşittir.');
    c.clearSay();
    await par(c.say('Modeli: F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g.', { speak: 'Modeli: F k eşittir V b çarpı d s çarpı ge.' }), belir(c, t4.formul, 400));
    await c.wait(400);
    c.note('<b>F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g</b>', 'Arşimet', 'ak-d6-arsimet');

    // 5. Alt ve üst yüzeydeki kuvvetlerin farkı
    const k5 = kart(4); fark(c, k5.g, k5.cx, k5.y0);
    await goster(k5, 'Kaldırma kuvveti, alt ve üst yüzeydeki kuvvetlerin farkından doğar.');
    c.note('<b>F<sub>k</sub> = F<sub>2</sub> − F<sub>1</sub></b>: alt eksi üst.', 'Fark', 'ak-d6-fark');

    // 6. Yüzen, askıda, batan (aynı kart, iki adım)
    const k6 = kart(5); const t6 = denge(c, k6.g, k6.cx, k6.y0);
    await goster(k6, 'Yüzen ve askıda kalan cisimde F<sub>k</sub> = G’dir.', { speak: 'Yüzen ve askıda kalan cisimde F k eşittir ağırlıktır.' });
    c.clearSay();
    await par(c.say('Batan cisimde F<sub>k</sub>, G’den küçüktür.', { speak: 'Batan cisimde F k, ağırlıktan küçüktür.' }), belir(c, t6.batan, 400));
    await c.wait(400);
    c.note('Yüzen, askıda: <b>F<sub>k</sub> = G</b>; batan: <b>F<sub>k</sub> &lt; G</b>.', 'Ağırlık', 'ak-d6-agirlik');

    await belir(c, onceki, 500, 1);  }

  Ders.start({
    id: 'akiskanlar-d6', kicker: 'Konu D · Kaldırma kuvveti', title: 'Konu tekrarı: Kaldırma kuvveti', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Kaldırma kuvveti',
      hook: 'Beş dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları farklı durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Bir cisim havada 8 N, suya tamamen batırılınca dinamometre 5 N gösteriyor. Kaldırma kuvveti kaç N’dur?',
        options: ['5 N', '3 N', '13 N'], answer: 1,
        why: ['5 N, cismin sudaki dinamometre okumasıdır; kaldırma kuvveti iki okumanın farkıdır.', 'Kaldırma kuvveti havadaki ve sudaki okumanın farkıdır: 8 − 5 = 3 N.', 'İki okuma toplanmaz; kaldırma kuvveti aralarındaki farktır.'], scene: 0,
      },
      {
        q: 'Tamamen batmış bir cisim havuzda 0,5 m derinlikten 1 m derinliğe iniyor. Kaldırma kuvveti nasıl değişir?',
        options: ['Değişmez', 'İki katına çıkar', 'Yarıya iner'], answer: 0,
        why: ['Batan hacim, sıvı ve g aynı kaldığı için F<sub>k</sub> değişmez; derinliğe bağlı değildir.', 'Kaldırma kuvveti derinlikle orantılı değildir; tamamen batmış cismin batan hacmi sabit kalır.', 'Derinlik arttı diye kaldırma kuvveti azalmaz; derinliğin etkisi yoktur.'], scene: 0,
      },
      {
        q: 'Bir ölçümde kaldırma kuvveti 1,96 N, taşan suyun ağırlığı 0,98 N kaydedilmiş. Bu ölçüm için hangisi söylenir?',
        options: ['Arşimet İlkesi’yle uyumludur', 'Arşimet İlkesi’nin yanlış olduğunu gösterir', 'Arşimet İlkesi’yle uyumsuzdur; yinelenmelidir'], answer: 2,
        why: ['İlkeye göre taşan suyun ağırlığı kaldırma kuvvetine eşit olmalı; 0,98 N ile 1,96 N eşit değil.', 'Tek bir uyumsuz ölçüm ilkeyi çürütmez; ölçüm hatalı olabilir.', 'Eşit olması gereken iki değer farklı çıktı; ölçüm hatalı olabileceğinden yinelenmelidir.'], scene: 0,
      },
      {
        q: 'Aynı cisim sırayla yoğunlukları d, 3d ve 2d olan üç sıvıya tamamen batırılıyor. Kaldırma kuvvetlerini büyükten küçüğe sıralayın.',
        options: ['d, 2d, 3d', '3d, 2d, d', '2d, 3d, d'], answer: 1,
        why: ['Bu sıralama küçükten büyüğe; soru büyükten küçüğe istiyor.', 'F<sub>k</sub>, sıvının yoğunluğuyla doğru orantılıdır; yoğunluğu en büyük sıvıda en büyüktür.', 'Kaldırma kuvveti yoğunlukla artar; 3d’lik sıvıdaki kuvvet 2d’likinden büyüktür, önce o gelir.'], scene: 0,
      },
      {
        q: 'Bir cisim taşırma kabına batırılınca ağırlığı 5 N olan su taşıyor. Aynı cisim aynı kadar batacak biçimde, yoğunluğu suyun iki katı olan sıvıyla dolu kaba batırılırsa taşan sıvının ağırlığı kaç N olur?',
        options: ['2,5 N', '5 N', '10 N'], answer: 2,
        why: ['Yoğunluk iki katına çıkınca taşan ağırlık yarıya inmez, iki katına çıkar.', '5 N suyla taşan ağırlıktır; sıvının yoğunluğu iki katı olunca ağırlık da iki katı olur.', 'Yer değiştiren hacim aynı, yoğunluk iki katı: taşan ağırlık 2 · 5 = 10 N.'], scene: 0,
      },
      {
        q: 'Hacimleri aynı iki cisimden biri ötekinden ağır; ikisi de aynı sıvıya tamamen batıyor. Hangisi doğrudur?',
        options: ['Kaldırma kuvvetleri eşittir', 'Ağır olana daha büyük kaldırma kuvveti etki eder', 'Hafif olana daha büyük kaldırma kuvveti etki eder'], answer: 0,
        why: ['Batan hacim, sıvı ve g aynı olduğundan kaldırma kuvvetleri eşittir.', 'Kaldırma kuvveti cismin ağırlığına değil, batan hacme ve sıvıya bağlıdır.', 'Hafif olana daha büyük kuvvet etki etmez; kaldırma kuvveti ağırlığa bağlı değildir.'], scene: 0,
      },
      {
        q: 'Sıvıdaki bir cismin alt yüzeyine etki eden kuvvet, üst yüzeyine etki edenden büyüktür. Bu iki kuvvetin farkı hangi kuvvettir?',
        options: ['Cismin ağırlığı', 'Kaldırma kuvveti', 'Yan yüzeylerdeki kuvvet'], answer: 1,
        why: ['Ağırlık Dünya’nın çekimidir; alt ve üst yüzey kuvvetlerinin farkı değildir.', 'Alttaki kuvvet daha büyük olduğundan fark yukarı yönlüdür ve kaldırma kuvvetidir.', 'Yan yüzeylerdeki kuvvetler eşit ve zıt yönlüdür; birbirini dengeler.'], scene: 0,
      },
      {
        q: 'Askıda kalan bir cisim için hangisi doğrudur?',
        options: ['Kaldırma kuvveti ağırlıktan küçüktür; cismin yoğunluğu sıvınınkinden büyüktür', 'Kaldırma kuvveti ağırlığa eşittir; cismin yoğunluğu sıvınınkinden küçüktür', 'Kaldırma kuvveti ağırlığa eşittir; cismin yoğunluğu sıvınınkine eşittir'], answer: 2,
        why: ['Askıda kalan cisimde kaldırma kuvveti ağırlığa eşittir, ondan küçük değildir.', 'Kaldırma kuvveti ağırlığa eşittir ama askıdaki cismin yoğunluğu sıvınınkinden küçük değildir.', 'Askıda kalan cisimde F<sub>k</sub> = G olur ve cismin yoğunluğu sıvınınkine eşittir.'], scene: 0,
      },
      {
        q: 'Çelik bir bilye suda batarken çelikten yapılmış bir gemi yüzüyor. Gemi için hangisi doğrudur?',
        options: ['Ortalama yoğunluğu suyunkinden küçüktür', 'Ortalama yoğunluğu suyunkinden büyüktür', 'Kaldırma kuvveti ağırlığından küçüktür'], answer: 0,
        why: ['Gemi yüzer; yüzen cismin ortalama yoğunluğu suyunkinden küçüktür.', 'Ortalama yoğunluğu suyunkinden büyük olsaydı gemi batardı.', 'Yüzen gemide kaldırma kuvveti ağırlığa eşittir, ondan küçük değildir.'], scene: 0,
      },
      {
        q: 'Denizlerdeki plastik atıklar neden suyun yüzeyinde kalır?',
        options: ['Atığa etki eden kaldırma kuvveti ağırlığından küçüktür', 'Yüzen atığa etki eden kaldırma kuvveti ağırlığına eşittir', 'Atıklara kaldırma kuvveti etki etmez'], answer: 1,
        why: ['Kaldırma kuvveti ağırlıktan küçük olsaydı atık batardı.', 'Yüzen atıkta kaldırma kuvveti ağırlığa eşittir; atık batmaz.', 'Sıvıya batan her cisme kaldırma kuvveti etki eder.'], scene: 0,
      },
    ],
    summary: [
      '<b>Kaldırma kuvveti, yerinden edilen sıvının ağırlığıdır.</b>',
      'F<sub>k</sub> = V<sub>b</sub> · d<sub>s</sub> · g; derinliğe bağlı değildir.',
      'Yüzen ve askıda F<sub>k</sub> = G; batanda F<sub>k</sub> &lt; G.',
    ],
  });
})();
