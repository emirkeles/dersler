/* A3 — Konu tekrarı: Basınç
   Yeni bilgi yok. Tek sahnede konunun beş kuralı tahtada sırayla toplanır; ardından sekiz soru gelir.
   Senaryo: plan/fizik/akiskanlar/senaryolar/A-basinc.md (A3). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, kutu, gizle, belir, par, ok } = window.KIT;
  const { tugla } = window.KIT_A;
  const GOVDE = '#8f9bc4', GOVDE_KENAR = '#c3cbea';

  /* ---- 1. Basınç: yüzeyin her birimine düşen dik kuvvet (dar ve geniş taban, birim başına bir ok) ---- */
  function tanim(c, g) {
    const blok = (x, w) => {
      c.S('rect', { x, y: 125, width: w, height: 60, rx: 5, fill: GOVDE, stroke: GOVDE_KENAR, 'stroke-width': 2.5 }, g);
      c.S('line', { x1: x + 3, y1: 185, x2: x + w - 3, y2: 185, stroke: 'var(--c6)', 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
      // Aynı kuvvet (dört ok): dar tabanda sıkışır, geniş tabanda seyrelir.
      for (let u = 0; u < 4; u++) { const ox = x + (w * (u + 0.5)) / 4; ok(c, g, [ox, 193], [ox, 233], RENK.basinc, 3); }
    };
    blok(30, 80); blok(150, 160);
    renkli(c, g, 170, 275, ['birim ', ['yüzeye', RENK.alan], ' ', ['kuvvet', RENK.kuvvet]], { size: 26 });
  }

  /* ---- 2. İki şeye bağlıdır: kuvvet ve yüzey alanı (yatık ve dik tuğla) ---- */
  function bagli(c, g) {
    c.S('line', { x1: 370, y1: 185, x2: 630, y2: 185, stroke: RENK.ince, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    const yat = c.S('g', { transform: 'translate(402,185) scale(0.7)' }, g); tugla(c, yat, 0, 0, { temas: true });
    const dik = c.S('g', { transform: 'translate(551,185) scale(0.7)' }, g); tugla(c, dik, 0, 0, { dik: true, temas: true });
    ok(c, g, [452, 94], [452, 133], RENK.kuvvet, 6);
    ok(c, g, [576, 46], [576, 85], RENK.kuvvet, 6);
    renkli(c, g, 500, 275, [['kuvvet', RENK.kuvvet], ', ', ['alan', RENK.alan]], { size: 28 });
  }

  /* ---- 3. Model: P = F / A ---- */
  function model(c, g) {
    kutu(c, g, 690, 115, 280, 110, { rx: 14 });
    renkli(c, g, 830, 188, [['P', RENK.basinc], ' = ', ['F', RENK.kuvvet], '/', ['A', RENK.alan]], { size: 54, kalin: 700 });
  }

  /* ---- 4. Kuvvet ve alan değişince basınç ---- */
  function iliski(c, g) {
    kutu(c, g, 170, 345, 320, 66, { rx: 12 });
    kutu(c, g, 170, 435, 320, 66, { rx: 12 });
    renkli(c, g, 330, 389, [['F × 2', RENK.kuvvet], ' → ', ['P × 2', RENK.basinc]], { size: 32 });
    renkli(c, g, 330, 479, [['A × 2', RENK.alan], ' → ', ['P ÷ 2', RENK.basinc]], { size: 32 });
  }

  /* ---- 5. Çivi: kuvvet aynen iletilir ---- */
  function civi(c, g) {
    c.S('rect', { x: 580, y: 445, width: 180, height: 75, rx: 6, fill: '#6b4a2e', stroke: '#a9774a', 'stroke-width': 2.5 }, g);
    c.S('path', {
      d: 'M648,352 h44 v14 h-13 v66 l-9,30 l-9,-30 v-66 h-13 z', fill: GOVDE_KENAR, stroke: GOVDE, 'stroke-width': 2.5, 'stroke-linejoin': 'round',
    }, g);
    ok(c, g, [670, 308], [670, 348], RENK.kuvvet, 6);
    ok(c, g, [670, 470], [670, 510], RENK.kuvvet, 6);
    yazi(c, g, 670, 550, 'aynen iletilir', { size: 26, renk: RENK.kuvvet });
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

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Basınç', { size: 72, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konuda öğrendiklerimizi beş kuralda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    await kural(tanim, 'Basınç, yüzeyin her birimine düşen dik kuvvettir.');
    c.note('<b>Birim yüzeye düşen dik kuvvet.</b>', 'Basınç', 'ak-a3-tanim');
    await kural(bagli, 'Basınç iki şeye bağlıdır: kuvvete ve yüzey alanına.');
    c.note('<b>Kuvvete ve yüzey alanına</b> bağlıdır.', 'Basınç', 'ak-a3-bagli');
    await kural(model, 'Modeli: P = F / A; birimi pascal.', { speak: 'Modeli: P eşittir F bölü A; birimi pascal.' });
    c.note('<b>P = F / A</b>; birimi pascal (Pa).', 'Basınç', 'ak-a3-model');
    await kural(iliski, 'Kuvvet büyürse basınç artar; yüzey alanı büyürse basınç azalır.');
    c.note('Kuvvet artınca basınç artar; <b>alan artınca azalır</b>.', 'Basınç', 'ak-a3-iliski');
    await kural(civi, 'Cisim, üstündeki kuvveti değdiği yüzeye aynen iletir.');
    c.note('Kuvvet, değdiği yüzeye <b>aynen iletilir</b>.', 'Basınç', 'ak-a3-iletim');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'akiskanlar-a3', kicker: 'Konu A · Basınç', title: 'Konu tekrarı: Basınç', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Basınç',
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
        q: 'Bir fil ile aynı ağırlıkta ama ayak tabanı daha küçük bir hayvan düşün. Hangisi yere daha büyük basınç yapar?',
        options: ['Fil', 'Ayak tabanı küçük olan', 'İkisi eşit basınç yapar'], answer: 1,
        why: ['Fil’in ayak tabanı daha geniş; aynı ağırlık daha büyük yüzeye yayılır, basıncı küçük kalır.', 'Ağırlık aynıyken yüzey alanı küçüldükçe basınç artar.', 'Ağırlıklar eşit olsa da yüzey alanları farklıdır; basınçlar eşit olmaz.'], scene: 0,
      },
      {
        q: '100 N büyüklüğünde bir kuvvet 0,5 m² yüzeye dik etki ediyor. Basınç kaç pascaldır?',
        options: ['50 Pa', '100,5 Pa', '200 Pa'], answer: 2,
        why: ['50, kuvvetle alanın çarpımıdır; basınç ise bölmeyle bulunur.', 'Kuvvet ile alan toplanmaz; basınç F bölü A ile bulunur.', 'P = F / A = 100 ÷ 0,5 = 200 Pa.'], scene: 0,
      },
      {
        q: 'Kışın arabaya, yere daha geniş yüzeyle değen kar lastikleri takılıyor. Arabanın yere yaptığı basınç nasıl değişir?',
        options: ['Azalır', 'Artar', 'Değişmez'], answer: 0,
        why: ['Ağırlık aynı kalır, değen yüzey büyür; P = F / A küçülür.', 'Yüzey büyürken basınç artmaz, tersine azalır.', 'Kuvvet aynı olsa da yüzey alanı büyüdüğü için basınç değişir.'], scene: 0,
      },
      {
        q: 'Üç özdeş küp üst üste duruyor. En üstteki küp alınırsa yere yapılan basınç nasıl değişir?',
        options: ['Değişmez; yüzey aynı', '3G / A’dan 2G / A’ya iner', '3G / A’dan G / A’ya iner'], answer: 1,
        why: ['Yüzey aynı kalır ama yere inen kuvvet 3G’den 2G’ye düşer; basınç da düşer.', 'Alan A aynı kalır, kuvvet 3G’den 2G’ye iner: basınç 2G / A olur.', 'Altta iki küp kalıyor; kuvvet G değil 2G’dir.'], scene: 0,
      },
      {
        q: 'Çekiçle bir çivinin başına vuruluyor. Hangisi doğrudur?',
        options: ['Uçtaki kuvvet baştakinden büyüktür', 'Baştaki ve uçtaki basınç eşittir', 'Baştaki ve uçtaki kuvvet eşit, uçtaki basınç büyüktür'], answer: 2,
        why: ['Çivi kuvveti aynen iletir; uçtaki kuvvet baştakine eşittir.', 'Kuvvet eşit ama uçtaki yüzey alanı çok küçüktür; uçtaki basınç daha büyüktür.', 'Kuvvet baştan uca aynen iletilir; alan küçük olduğu için uçtaki basınç büyüktür.'], scene: 0,
      },
      {
        q: 'Bir masanın ayaklarının altına daha geniş pullar takılıyor. Masanın yere yaptığı basınç nasıl değişir?',
        options: ['Azalır; ağırlık aynı, yüzey büyüdü', 'Artar; yüzey büyüdükçe basınç büyür', 'Değişmez; basınç yalnızca ağırlığa bağlıdır'], answer: 0,
        why: ['Ağırlık aynı kalır, değen yüzey büyür; P = F / A küçülür.', 'Yüzey büyüdükçe basınç büyümez, azalır.', 'Basınç yalnızca ağırlığa değil, yüzey alanına da bağlıdır.'], scene: 0,
      },
      {
        q: 'Bir cismin yere uyguladığı kuvvet de yere değen yüzeyi de üç katına çıkarılıyor. Basınç nasıl değişir?',
        options: ['Üç katına çıkar', 'Dokuz katına çıkar', 'Değişmez'], answer: 2,
        why: ['Kuvvet üç katına çıkınca basınç artar, ama alan da üç katına çıkınca o artış geri alınır.', 'Kuvvet ile alan çarpılmaz; basınç, ikisinin oranıdır.', '3F / 3A = F / A olduğundan basınç değişmez.'], scene: 0,
      },
      {
        q: 'Aynı yüzeyde ölçülen basınç 1.000 Pa’dan 3.000 Pa’ya çıktı. Yüzeye etki eden kuvvet nasıl değişti?',
        options: ['Değişmedi', 'Üç katına çıktı', 'Üçte birine indi'], answer: 1,
        why: ['Yüzey aynıyken basınç değiştiyse kuvvet de değişmiştir.', 'Alan aynıyken P = F / A: basınç üç katına çıktıysa kuvvet de üç katına çıkmıştır.', 'Kuvvet azalsaydı basınç da azalırdı; oysa basınç arttı.'], scene: 0,
      },
    ],
    summary: [
      '<b>Basınç kuvvetle büyür, yüzey alanıyla küçülür.</b>',
      'P = F / A; birimi pascal.',
      'Cisim, kuvveti değdiği yüzeye aynen iletir.',
    ],
  });
})();
