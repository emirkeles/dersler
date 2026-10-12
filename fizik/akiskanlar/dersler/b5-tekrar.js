/* B5 — Konu tekrarı: Sıvılarda basınç
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından on soru gelir.
   Senaryo: plan/fizik/akiskanlar/senaryolar/B-sivilarda-basinc.md (B5). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, kutu, cizgi, gizle, belir, par, ok, onay } = window.KIT;
  const { sivKabi, suSutunu, basincOklari } = window.KIT_B;
  const GOVDE = '#8f9bc4', GOVDE_KENAR = '#c3cbea';
  const Y1 = 245, Y2 = 535; // kural yazılarının taban çizgisi (üst ve alt sıra)

  /* ---- 1. Derinlik arttıkça basınç artar: derin ve sığ nokta, üstlerinde kesikli sütunlar ---- */
  function derinlik(c, g) {
    sivKabi(c, g, { x1: 55, x2: 295, y: 45, dip: 205, ust: 25 });
    [[120, 85, 40], [230, 165, 120]].forEach(([x, y, boy]) => {
      suSutunu(c, g, { x, y, yuzey: 45, w: 40 });
      ok(c, g, [x, y - boy], [x, y], RENK.kuvvet, 5);
      cizgi(c, g, [x - 20, y], [x + 20, y], RENK.alan, 6);
    });
    renkli(c, g, 175, Y1, [['derinlik ↑', RENK.sivi], ' → ', ['basınç ↑', RENK.basinc]], { size: 24 });
  }

  /* ---- 2. P = h·d·g: silindirik kap, tabanda basınç okları ---- */
  function model(c, g) {
    sivKabi(c, g, { x1: 440, x2: 560, y: 50, dip: 205, ust: 28 });
    const o = basincOklari(c, g, [440, 205], [560, 205], [500, 100], { n: 3, boy: 34 });
    o.oklar.forEach((q) => { q.g.style.opacity = 1; });
    renkli(c, g, 500, Y1 + 5, [['P', RENK.basinc], ' = h·d·g'], { size: 34, kalin: 700 });
  }

  /* ---- 3. Bir değişken değişir: iki satır, çok sayıda sabit, bir değişen ---- */
  function degisken(c, g) {
    kutu(c, g, 695, 70, 260, 55, { rx: 10 });
    kutu(c, g, 695, 140, 260, 55, { rx: 10 });
    [725, 755, 785].forEach((x) => c.S('circle', { cx: x, cy: 97.5, r: 9, fill: RENK.gri }, g));
    c.S('circle', { cx: 725, cy: 167.5, r: 9, fill: RENK.yazi }, g);
    yazi(c, g, 820, 107, 'sabit', { hiza: 'start', size: 26, renk: RENK.gri });
    yazi(c, g, 820, 177, 'değişir', { hiza: 'start', size: 26 });
    yazi(c, g, 825, Y1, 'bir değişken değişir', { size: 24 });
  }

  /* ---- 4. Pascal: kapalı kap, pistonla basılıyor, sekiz yöne eşit ok ---- */
  function pascal(c, g) {
    c.S('rect', { x: 95, y: 350, width: 160, height: 130, rx: 8, fill: RENK.sivi, 'fill-opacity': 0.6, stroke: GOVDE, 'stroke-width': 6 }, g);
    c.S('rect', { x: 130, y: 332, width: 90, height: 16, rx: 4, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2 }, g);
    ok(c, g, [175, 300], [175, 330], RENK.kuvvet, 5);
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4, cx = 175, cy = 415;
      ok(c, g, [cx + 14 * Math.cos(a), cy + 14 * Math.sin(a)], [cx + 50 * Math.cos(a), cy + 50 * Math.sin(a)], RENK.basinc, 3);
    }
    renkli(c, g, 175, Y2, ['her yöne ', ['eşit', RENK.basinc], ' iletilir'], { size: 24 });
  }

  /* ---- 5. Su cenderesi: aynı basınç (ok sıklığı aynı), büyük pistonda büyük kuvvet ---- */
  function cendere(c, g) {
    c.S('path', { d: 'M364,408 L418,408 L418,450 L466,450 L466,408 L628,408 L628,487 L364,487 Z', fill: RENK.sivi, 'fill-opacity': 0.7 }, g);
    c.S('path', {
      d: 'M361,350 L361,490 L631,490 L631,350 M421,350 L421,450 L463,450 L463,350',
      fill: 'none', stroke: GOVDE, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
    }, g);
    c.S('rect', { x: 364, y: 392, width: 54, height: 16, rx: 3, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2 }, g);
    c.S('rect', { x: 466, y: 392, width: 162, height: 16, rx: 3, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2 }, g);
    ok(c, g, [391, 365], [391, 390], RENK.kuvvet, 5);
    ok(c, g, [547, 315], [547, 390], RENK.kuvvet, 5);
    for (let i = 0; i < 2; i++) ok(c, g, [377.5 + 27 * i, 436], [377.5 + 27 * i, 411], RENK.basinc, 3);
    for (let i = 0; i < 6; i++) ok(c, g, [479.5 + 27 * i, 436], [479.5 + 27 * i, 411], RENK.basinc, 3);
    renkli(c, g, 500, Y2, ['aynı ', ['P', RENK.basinc], ', büyük ', ['F', RENK.kuvvet]], { size: 24 });
  }

  /* ---- 6. Önce sına, sonra çıkar: kaynak kartı ve kontrol listesi ---- */
  function sina(c, g) {
    kutu(c, g, 690, 325, 125, 160, { rx: 10 });
    cizgi(c, g, [705, 352], [785, 352], RENK.gri, 6);
    [380, 405, 430, 455].forEach((y, i) => cizgi(c, g, [705, y], [i === 3 ? 760 : 800, y], RENK.ince, 4));
    kutu(c, g, 835, 325, 130, 160, { rx: 10 });
    [365, 405, 445].forEach((y) => { onay(c, g, 865, y, 12); cizgi(c, g, [890, y], [945, y], RENK.ince, 4); });
    yazi(c, g, 825, Y2, 'önce sına, sonra çıkar', { size: 24 });
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

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Sıvılarda basınç', { size: 72, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konunun kurallarını altı satırda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    await kural(derinlik, 'Sıvıda derine inildikçe basınç artar.');
    c.note('Derinlik arttıkça <b>basınç artar</b>.', 'Sıvıda basınç', 'ak-b5-derinlik');
    await kural(model, 'Basınç P = h·d·g’dir; kabın şekline bağlı değildir.',
      { speak: 'Basınç P eşittir h çarpı d çarpı ge’dir; kabın şekline bağlı değildir.' });
    c.note('<b>P = h·d·g</b>; kabın şekline bağlı değil.', 'Sıvıda basınç', 'ak-b5-model');
    await kural(degisken, 'Deneyde bir değişken değişir, ötekiler sabit tutulur.');
    c.note('Bir değişken değişir, <b>ötekiler sabit</b> kalır.', 'Sıvıda basınç', 'ak-b5-degisken');
    await kural(pascal, 'Pascal Yasası: kapalı kaptaki basınç her yöne eşit iletilir.');
    c.note('Pascal Yasası: kapalı kapta basınç <b>her yöne eşit</b> iletilir.', 'Sıvıda basınç', 'ak-b5-pascal');
    await kural(cendere, 'Su cenderesinde basınç aynıdır; büyük pistonda kuvvet büyüktür.');
    c.note('Su cenderesinde <b>basınç aynı</b>, büyük pistonda kuvvet büyük.', 'Sıvıda basınç', 'ak-b5-cendere');
    await kural(sina, 'Bilgi önce sınanır, sonra ondan çıkarım yapılır.');
    c.note('Önce <b>bilgiyi sına</b>, sonra çıkarım yap.', 'Sıvıda basınç', 'ak-b5-sina');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'akiskanlar-b5', kicker: 'Konu B · Sıvılarda basınç', title: 'Konu tekrarı: Sıvılarda basınç', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Sıvılarda basınç',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>on soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları farklı durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Bir gölde dalgıç 2 metre derinlikten 6 metre derinliğe iniyor. Çevresindeki basınç nasıl değişir?',
        options: ['2 katına çıkar', '3 katına çıkar', 'Değişmez'], answer: 1,
        why: ['Derinlik 2 katına değil, 6 ÷ 2 = 3 katına çıkıyor; basınç da derinlikle aynı oranda artar.', 'Basınç derinlikle orantılıdır; derinlik 3 katına çıktığı için basınç da 3 katına çıkar.', 'Sıvıda derine inildikçe basınç artar; derinlik değiştiği için basınç da değişir.'], scene: 0,
      },
      {
        q: 'Bir sonda suda 0,1 metre derinlikte 980 Pa ölçüyor. Aynı suda 0,9 metre derinlikte basınç kaç pascal olur?',
        options: ['980 Pa', '109 Pa', '8.820 Pa'], answer: 2,
        why: ['Derinlik değişince basınç da değişir; aynı kalmaz.', 'Derinlik arttığı için basınç azalmaz, artar; 109 Pa bölme yapılırsa çıkar.', 'Derinlik 0,1 m’den 0,9 m’ye 9 katına çıkıyor; basınç da 9 katına çıkar: 9 · 980 = 8.820 Pa.'], scene: 0,
      },
      {
        q: 'Aynı derinlikte, yoğunlukları d ve 3d olan iki sıvıda basınç ölçülüyor. Hangisi doğrudur?',
        options: ['3d olan sıvıda basınç 3 katıdır', 'İkisinde basınç aynıdır', '3d olan sıvıda basınç üçte biridir'], answer: 0,
        why: ['Derinlik ve g aynıyken P = h·d·g ile basınç yoğunlukla orantılıdır; yoğunluk 3 katıysa basınç da 3 katıdır.', 'Derinlik aynı olsa da sıvıların yoğunluğu farklıdır; basınç da farklı olur.', 'Yoğunluk arttıkça basınç artar; 3d olan sıvıda basınç azalmaz.'], scene: 0,
      },
      {
        q: 'A, suyun 0,2 metre derinliğinde; B, yoğunluğu 2d olan sıvının 0,2 metre derinliğinde; C, suyun 0,4 metre derinliğinde. Basınçlar nasıl sıralanır?',
        options: ['A = B = C', 'B = C > A', 'C > B > A'], answer: 1,
        why: ['Üç noktada da derinlik ya da yoğunluk farklıdır; basınçlar eşit olmaz.', 'B’de yoğunluk 2 katı, C’de derinlik 2 katı; ikisi de A’nın 2 katı basınç verir. B = C > A olur.', 'B ile C’de h·d çarpımı aynıdır: 0,2·2d = 0,4·d. Bu yüzden B, C’den büyük değildir.'], scene: 0,
      },
      {
        q: 'Taban alanı 3A olan geniş bir kap ile taban alanı A olan dar bir kap aynı sıvıyla aynı yüksekliğe kadar dolu. Tabandaki basınçlar için hangisi doğrudur?',
        options: ['Geniş kapta büyüktür', 'Dar kapta büyüktür', 'Eşittir'], answer: 2,
        why: ['Geniş kapta sıvı daha ağırdır ama yük geniş tabana yayılır; basınç büyümez.', 'Dar kapta sıvı daha az ama taban da dardır; basınç büyümez.', 'P = h·d·g; sıvı, yükseklik ve g aynı olduğundan kabın şekli ya da taban alanı basıncı değiştirmez.'], scene: 0,
      },
      {
        q: 'Kapalı bir kaptaki sıvıya pistonla basılıyor. Kabın iç yüzeyindeki her noktaya iletilen basınç artışı için hangisi doğrudur?',
        options: ['Eşit büyüklüktedir', 'Pistona yakın noktada daha büyüktür', 'Tabanda daha büyüktür'], answer: 0,
        why: ['Pascal Yasası: kapalı kaptaki basınç artışı sıvının her noktasına ve kabın iç yüzeyine eşit iletilir.', 'Basınç artışı pistona yakın yerde birikmez; her yöne eşit iletilir.', 'Tabana da ötekiler kadar iletilir; basınç artışı tabanda daha büyük olmaz.'], scene: 0,
      },
      {
        q: 'Su cenderesinin büyük pistonunun alanı küçük pistonunkinden büyüktür. Hangisi doğrudur?',
        options: ['Basınç büyük pistonda daha büyüktür; kuvvet aynıdır', 'Basınç büyük pistonda daha küçüktür; kuvvet daha büyüktür', 'Basınç aynıdır; büyük pistonda kuvvet daha büyüktür'], answer: 2,
        why: ['Sıvıdaki basınç iki pistona da aynı iletilir; büyük pistonda daha büyük olmaz.', 'Basınç iki pistonda da aynıdır; büyük pistonda daha küçük olmaz.', 'Basınç iki pistonda aynıdır; alan büyük olduğu için büyük pistondaki kuvvet de büyüktür.'], scene: 0,
      },
      {
        q: 'Su dolu bir deponun yan duvarında biri üstte, biri altta iki delik var. Hangi delikte basınç daha büyüktür?',
        options: ['Alttaki delikte', 'Üstteki delikte', 'İkisinde de aynıdır'], answer: 0,
        why: ['Alttaki delik daha derindedir; sıvıda derinlik arttıkça basınç artar.', 'Üstteki delik daha sığdır; orada basınç alttakinden küçüktür.', 'Delikler farklı derinliktedir; bu yüzden basınçları eşit olmaz.'], scene: 0,
      },
      {
        q: 'Bir kaynağın yayım tarihi yok, yazanı belli değil ve iddiası başka bir kaynakta yer almıyor. Ne yaparsın?',
        options: ['İddiayı doğru kabul ederim', 'İddiaya güvenmeyip başka kaynaklarla sınarım', 'İddiayı doğrulanmış diye başkalarına anlatırım'], answer: 1,
        why: ['Yazanı ve tarihi belli olmayan, başka kaynakta da bulunmayan bilgi doğru kabul edilmez.', 'Bilgi önce sınanır: başka kaynaklarda doğrulanmayan iddiaya güvenilmez.', 'Sınanmamış bir iddia doğrulanmış gibi anlatılmaz.'], scene: 0,
      },
      {
        q: 'Serbest dalıştan çıkarken nefes tutulursa ne olabilir?',
        options: ['Hiçbir sorun olmaz', 'Kulaktaki dolgunluk hissi tamamen geçer', 'Akciğerler zarar görebilir'], answer: 2,
        why: ['Yükselirken çevre basıncı azalır; nefes tutmak sorunsuz değildir.', 'Nefes tutmak kulaktaki dolgunluğu gidermez; asıl tehlike başka bir yerdedir.', 'Yükselirken basınç azalır; nefes tutulursa akciğerler zarar görebilir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Sıvı basıncı derinlikle büyür, kapalı kapta her yöne iletilir.</b>',
      'P = h·d·g; kabın şekline bağlı değildir.',
      'Su cenderesinde basınç aynıdır; büyük pistonda kuvvet büyüktür.',
    ],
  });
})();
