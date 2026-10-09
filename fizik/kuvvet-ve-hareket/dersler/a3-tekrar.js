/* A3 — Konu tekrarı: Temel ve türetilmiş nicelikler
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, belir } = window.KIT;
  const renk = '#f5b04c';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    /* Başlıklı kart: çerçeve, renkli başlık ve ortalı satırlar. */
    const kart = (g, x, y, w, h, baslik, satirlar, o = {}) => {
      kutu(c, g, x, y, w, h, { renk: o.renk });
      yazi(c, g, x + w / 2, y + 52, baslik, { size: o.size || 30, kalin: 700, renk: o.renk });
      satirlar.forEach((m, i) => yazi(c, g, x + w / 2, y + 118 + i * 52, m, { size: o.size || 30 }));
    };
    /* İki sütunlu satır tek yazı öğesidir: solda nicelik ya da gündelik birim, sağda SI birimi. */
    const ikili = (g, y, solda, sagda, x1 = 250, x2 = 600) => {
      const t = c.S('text', { x: x1, y, 'text-anchor': 'start', 'font-size': 30, 'font-weight': 600, style: 'fill:' + RENK.yazi }, g);
      c.S('tspan', { text: solda + ' ' }, t);
      c.S('tspan', { x: x2, style: 'fill:' + renk, text: sagda }, t);
    };

    // Ölçüm: sayı ve birim
    const g1 = yeni();
    yazi(c, g1, 500, 100, 'Her ölçüm: sayı ve birim', { size: 38, kalin: 700, renk });
    yazi(c, g1, 500, 250, '8 kilogram', { size: 60, kalin: 700 });
    yazi(c, g1, 300, 370, 'nicelik: kütle', { size: 34, renk: RENK.a });
    yazi(c, g1, 700, 370, 'birim: kilogram', { size: 34, renk: RENK.b });
    yazi(c, g1, 500, 480, 'Ölçmek karşılaştırmaktır', { size: 28, renk: RENK.soluk });
    await goster(g1, 'Ölçmek, bir büyüklüğü aynı cinsten bilinen bir büyüklükle karşılaştırmaktır.');
    await c.say('Kütle bir niceliktir; kilogram ise o niceliğin birimidir.');
    await c.say('Her ölçüm iki parçadan oluşur: bir sayı ve bir birim.');
    c.note('<b>Her ölçüm bir sayı ve bir birimdir.</b><br>8 kilogram: nicelik kütle, birim kilogram', 'Nicelik ve birim', 'kuvvet-nicelik-birim');
    await sil(g1);

    // SI: ortak birim sistemi
    const g2 = yeni();
    yazi(c, g2, 500, 100, 'SI: herkes için aynı birim', { size: 38, kalin: 700, renk });
    [['uzunluk', 'metre (m)'], ['kütle', 'kilogram (kg)'], ['zaman', 'saniye (s)']].forEach(([n, b], i) => ikili(g2, 215 + i * 75, n, b, 280, 560));
    yazi(c, g2, 500, 480, 'Standart birimi herkes aynı anlar', { size: 28, renk: RENK.soluk });
    await goster(g2, 'Standart birimle yapılan ölçümü her yerde herkes aynı anlar.');
    await c.say('SI’da uzunluk metre, kütle kilogram, zaman saniye ile ölçülür.', { speak: 'Se i sisteminde uzunluk metre, kütle kilogram, zaman saniye ile ölçülür.' });
    c.note('<b>Her niceliğin SI’da bir birimi vardır.</b><br>uzunluk → metre (m)', 'SI birimi', 'kuvvet-si');
    await sil(g2);

    // Gündelik birim SI birimi değildir
    const g3 = yeni();
    yazi(c, g3, 500, 90, 'Gündelik birim → SI birimi', { size: 38, kalin: 700, renk });
    [['kilometre', 'metre'], ['saat', 'saniye'], ['litre', 'metreküp'], ['gram', 'kilogram'], ['°C', 'kelvin']].forEach(([n, b], i) => ikili(g3, 185 + i * 70, n, b, 300, 580));
    await goster(g3, 'Kilometre ve saat gündelik hayatta kullanışlıdır ama SI birimi değildir.', { speak: 'Kilometre ve saat gündelik hayatta kullanışlıdır ama se i birimi değildir.' });
    await c.say('Litre, gram ve derece Celsius da gündelik birimlerdir.', { speak: 'Litre, gram ve derece selsiyus da gündelik birimlerdir.' });
    await c.say('SI’da hacim metreküp, kütle kilogram, sıcaklık kelvin ile yazılır.', { speak: 'Se i sisteminde hacim metreküp, kütle kilogram, sıcaklık kelvin ile yazılır.' });
    c.note('<b>Kilometre, saat, litre, gram ve °C SI birimi değildir.</b><br>100 km/h: nicelik sürat, SI birimi m/s', 'Gündelik birim', 'kuvvet-gundelik');
    await sil(g3);

    // Her niceliğin bir ölçüm aleti
    const g4 = yeni();
    yazi(c, g4, 500, 100, 'Her niceliğin bir ölçüm aleti', { size: 38, kalin: 700, renk });
    kart(g4, 30, 170, 300, 170, 'Terazi', ['kütle, kg'], { renk: RENK.a });
    kart(g4, 350, 170, 300, 170, 'Dinamometre', ['kuvvet, N'], { renk: RENK.b });
    kart(g4, 670, 170, 300, 170, 'Dereceli silindir', ['hacim, m³'], { renk: RENK.r });
    yazi(c, g4, 500, 450, 'Kütle ile kuvvet ayrı niceliklerdir', { size: 30, renk: RENK.soluk });
    await goster(g4, 'Terazi kütleyi ölçer; sonucu kilogramla yazarız.');
    await c.say('Dinamometre kuvveti ölçer; sonucu newtonla yazarız.');
    await c.say('Kütle ile kuvvet ayrı niceliklerdir; aletleri de birimleri de ayrıdır.');
    c.note('<b>Terazi kütleyi, dinamometre kuvveti ölçer.</b><br>kütle: kg · kuvvet: N', 'Ölçüm aleti', 'kuvvet-alet');
    await sil(g4);

    // Temel ve türetilmiş
    const g5 = yeni();
    yazi(c, g5, 500, 100, 'Temel mi, türetilmiş mi?', { size: 38, kalin: 700, renk });
    kart(g5, 60, 160, 420, 230, 'Temel nicelik', ['birimi tek başına', 'uzunluk: m'], { renk: RENK.a });
    kart(g5, 520, 160, 420, 230, 'Türetilmiş nicelik', ['birimi kurulmuş', 'sürat: m/s'], { renk: RENK.b });
    yazi(c, g5, 500, 480, 'Aletle ölçülmek temel yapmaz', { size: 28, renk: RENK.soluk });
    await goster(g5, 'Birimi tek başına duran niceliklere temel nicelik denir.');
    await c.say('Birimi başka birimlerden kurulan niceliklere türetilmiş nicelik denir.');
    await c.say('Bir aletle ölçülebilmek, niceliği tek başına temel yapmaz.');
    c.note('<b>Temel nicelik kendi başına ifade edilir; türetilmiş nicelik temellerden kurulur.</b><br>uzunluk (m) temel, sürat (m/s) türetilmiş', 'Temel ve türetilmiş', 'kuvvet-temel-turetilmis');
    await sil(g5);

    // Yedi temel nicelik
    const g6 = yeni();
    yazi(c, g6, 500, 80, 'SI’da yedi temel nicelik', { size: 38, kalin: 700, renk });
    [['uzunluk', 'metre'], ['kütle', 'kilogram'], ['zaman', 'saniye'], ['elektrik akımı', 'amper'], ['sıcaklık', 'kelvin'],
      ['ışık şiddeti', 'kandela'], ['madde miktarı', 'mol']].forEach(([n, b], i) => ikili(g6, 155 + i * 58, n, b, 280, 580));
    await goster(g6, 'SI’da yedi temel nicelik vardır; üçü uzunluk, kütle ve zamandır.', { speak: 'Se i sisteminde yedi temel nicelik vardır; üçü uzunluk, kütle ve zamandır.' });
    await c.say('Ötekiler elektrik akımı, sıcaklık, ışık şiddeti ve madde miktarıdır.');
    await c.say('Bu yedisinin dışındaki nicelikler türetilmiş niceliklerdir.');
    c.note('<b>SI’da yedi temel nicelik vardır.</b><br>uzunluk, kütle, zaman, elektrik akımı, sıcaklık, ışık şiddeti, madde miktarı', 'Yedi temel nicelik', 'kuvvet-yedi-temel');
    await sil(g6);

    // Özel adlı birimler
    const g7 = yeni();
    yazi(c, g7, 500, 100, 'Kısa ad, uzun birim', { size: 38, kalin: 700, renk });
    yazi(c, g7, 500, 215, 'newton (N) = kg·m/s²', { size: 40, kalin: 700 });
    yazi(c, g7, 500, 300, 'joule (J) = kg·m²/s²', { size: 32 });
    yazi(c, g7, 500, 365, 'pascal (Pa) = kg/(m·s²)', { size: 32 });
    yazi(c, g7, 500, 470, 'Kuvvet: kütle, uzunluk ve zamandan türetilmiş', { size: 28, renk: RENK.soluk });
    await goster(g7, 'Newton tek sözcüktür ama içinde üç birim vardır.');
    await c.say('Kuvvet; kütle, uzunluk ve zamandan kurulan türetilmiş bir niceliktir.');
    await c.say('Joule ve pascal da kilogram, metre ve saniyeden kurulur.', { speak: 'Jul ve paskal da kilogram, metre ve saniyeden kurulur.' });
    c.note('<b>Newton, joule ve pascal kısa adlardır.</b><br>newton = kg·m/s²: kuvvet türetilmiştir', 'Özel adlı birim', 'kuvvet-ozel-ad');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-a3', kicker: 'Konu A · Temel ve türetilmiş nicelikler', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Temel ve türetilmiş nicelikler',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Hangisi türetilmiş bir niceliktir?',
        options: ['Işık şiddeti (kandela)', 'Madde miktarı (mol)', 'Yoğunluk (kg/m³)'], answer: 2,
        why: ['Işık şiddeti yedi temel nicelikten biridir.', 'Madde miktarı yedi temel nicelikten biridir.', 'Evet. Yoğunluğun birimi kilogram ve metreden kurulur; yoğunluk türetilmiştir.'], scene: 0,
      },
      {
        q: 'Bir öğrenci, sandığı çekerken uyguladığı kuvveti ölçmek istiyor. Hangi aleti kullanır, sonucu hangi birimle yazar?',
        options: ['Dinamometre, newton', 'Terazi, kilogram', 'Dinamometre, kilogram'], answer: 0,
        why: ['Evet. Dinamometre kuvveti ölçer; kuvvetin birimi newtondur.', 'Terazi kütleyi ölçer; burada ölçülmek istenen kuvvettir.', 'Alet doğru; ama kilogram kütlenin birimidir, kuvvetin birimi newtondur.'], scene: 0,
      },
      {
        q: 'Bir su şişesinin üstünde “1,5 litre” yazıyor. Bu ölçümdeki nicelik ve o niceliğin SI birimi hangisidir?',
        options: ['Hacim, litre', 'Hacim, metreküp', 'Kütle, kilogram'], answer: 1,
        why: ['Nicelik doğru; ama litre gündelik bir birimdir, SI birimi değildir.', 'Evet. Litre hacmi ölçer; hacmin SI birimi metreküptür.', 'Litre kütleyi değil hacmi ölçer.'], scene: 0,
      },
      {
        q: 'Basıncın birimi pascal, kg/(m·s²) demektir. Basınç hangi temel niceliklerden türetilmiştir?',
        options: ['Kütle ve uzunluk', 'Kütle, uzunluk ve zaman', 'Uzunluk ve zaman'], answer: 1,
        why: ['Birimde saniye de var; zaman eksik kaldı.', 'Evet. Kilogram kütleyi, metre uzunluğu, saniye zamanı gösterir.', 'Birimde kilogram da var; kütle eksik kaldı.'], scene: 0,
      },
      {
        q: 'Bir paketin üstünde “kütle: 500 gram” yazıyor. Bu ölçümde 500 nedir?',
        options: ['Sayı; kütlenin gramın kaç katı olduğunu söyler.', 'Nicelik; ölçülen özelliğin kendisidir.', 'Birim; karşılaştırmada kullanılan büyüklüktür.'], answer: 0,
        why: ['Evet. Ölçüm bir sayı ve bir birimdir; 500 sayıdır.', 'Ölçülen özellik, yani nicelik kütledir.', 'Karşılaştırmada kullanılan bilinen büyüklük gramdır; birim odur.'], scene: 0,
      },
      {
        q: 'Zeynep: “Metreküp bir SI birimi; öyleyse hacim temel bir niceliktir.” Doğru karşılık hangisidir?',
        options: ['Haklı; SI birimi olan her nicelik temeldir.', 'Haksız; metreküp bir SI birimi değildir.', 'Haksız; türetilmiş niceliklerin de SI birimi vardır.'], answer: 2,
        why: ['Her niceliğin SI’da bir birimi vardır; bu, hepsini temel yapmaz.', 'Metreküp hacmin SI birimidir; sorun orada değil.', 'Evet. Metreküp üç metrenin çarpımıdır; hacim uzunluktan kurulur.'], scene: 0,
      },
      {
        q: 'Elektrik akımının SI birimi amperdir. Elektrik akımı için hangisi doğrudur?',
        options: ['Temeldir; yedi temel nicelikten biridir.', 'Temeldir; çünkü gündelik hayatta çok kullanılır.', 'Türetilmiştir; amper, metre ve saniyeden kurulur.'], answer: 0,
        why: ['Evet. Elektrik akımı yedi temel nicelikten biridir; amper tek başına durur.', 'Sonuç doğru ama gerekçe yanlış: temel olmak çok kullanılmaya bağlı değildir.', 'Amper başka birimlerden kurulmaz; tek başına duran bir birimdir.'], scene: 0,
      },
      {
        q: 'İki ayrı ülkeden iki mühendis aynı köprünün planını paylaşıyor; ikisi de uzunlukları metreyle yazıyor. Bu, SI’nın hangi yararını gösterir?',
        options: ['Ölçümlerin daha büyük sayılarla yazılmasını', 'Ülkeler arasında iletişimin kolaylaşmasını', 'Türetilmiş niceliklerin temel sayılmasını'], answer: 1,
        why: ['Ortak birim sayıyı büyütmez; herkesin aynı şeyi anlamasını sağlar.', 'Evet. Ortak birim kullanan herkes ölçümü aynı anlar.', 'SI, niceliklerin temel ya da türetilmiş oluşunu değiştirmez.'], scene: 0,
      },
    ],
    summary: [
      '<b>Her ölçüm bir sayı ve bir birimdir;</b> her niceliğin SI’da bir birimi vardır.',
      'Kilometre, saat, litre, gram ve °C <b>gündelik birimlerdir;</b> SI birimi değildir.',
      '<b>Temel nicelik ölçülür, türetilmiş nicelik temellerden kurulur;</b> SI’da yedi temel nicelik vardır.',
    ],
    nextLesson: { href: 'b1-yon-isteyen-nicelikler.html', label: 'Sonraki konu: Skaler ve vektörel nicelikler ›' },
  });
})();
