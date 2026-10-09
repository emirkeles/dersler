/* G2 — Konu tekrarı: İyon oluşumu
   Yeni bilgi yok. Tek sahnede konunun beş kuralı toplanır; ardından altı karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart } = window.KIT;
  const renk = '#ff6b7a';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);

    // Elektron değişir, proton kalır
    const g1 = yeni();
    yazi(c, g1, 500, 110, 'Elektron değişir, proton kalır', { size: 38, kalin: 700, renk });
    kart(c, g1, 'Na atomu', ['11 proton', '11 elektron'], { x: 60, y: 190, w: 420, h: 250, renk: RENK.a, size: 30 });
    kart(c, g1, 'Na⁺ iyonu', ['11 proton', '10 elektron'], { x: 520, y: 190, w: 420, h: 250, renk: RENK.b, size: 30 });
    await goster(g1, 'Atom iyon olurken yalnızca elektron sayısı değişir.');
    await c.say('Proton sayısı değişmediği için tanecik hâlâ aynı elementtir.');
    c.note('<b>İyon oluşurken elektron sayısı değişir, proton sayısı değişmez.</b><br>Na → Na<sup>+</sup>', 'İyon oluşumu', 'etkilesim-iyon-olusumu');
    await sil(g1);

    // Katyon ve anyon
    const g2 = yeni();
    yazi(c, g2, 500, 100, 'Elektron veren katyon, alan anyon', { size: 38, kalin: 700, renk });
    kart(c, g2, 'Katyon', ['2 elektron verir', 'yük 2+'], { x: 60, y: 160, w: 420, h: 250, renk: RENK.a, size: 30 });
    kart(c, g2, 'Anyon', ['1 elektron alır', 'yük 1−'], { x: 520, y: 160, w: 420, h: 250, renk: RENK.b, size: 30 });
    yazi(c, g2, 500, 480, 'proton > elektron → katyon', { size: 30, renk: RENK.soluk });
    await goster(g2, 'Elektron veren atom katyon, elektron alan atom anyon olur.');
    await c.say('Verilen ya da alınan elektron sayısı, yükteki sayıya eşittir.');
    await c.say('Proton sayısı elektron sayısından fazlaysa yük pozitiftir.');
    c.note('<b>Elektron veren atom katyon, alan atom anyon olur.</b><br>Ca<sup>2+</sup>, F<sup>−</sup>', 'Katyon ve anyon', 'etkilesim-katyon-anyon');
    await sil(g2);

    // İyonun dizilimi
    const g3 = yeni();
    yazi(c, g3, 500, 100, 'İyonun dizilimini bulma', { size: 38, kalin: 700, renk });
    kart(c, g3, 'Katyon', ['en yüksek seviyeden', 'elektron çıkar'], { x: 60, y: 160, w: 420, h: 250, renk: RENK.a, size: 30 });
    kart(c, g3, 'Anyon', ['boş yerlere', 'elektron girer'], { x: 520, y: 160, w: 420, h: 250, renk: RENK.b, size: 30 });
    yazi(c, g3, 500, 480, 'Önce atomun dizilimini yaz', { size: 30, renk: RENK.soluk });
    await goster(g3, 'İyonun dizilimini bulmak için önce atomun dizilimini yazarız.');
    await c.say('Katyonda elektronlar en yüksek enerji seviyesinden çıkar; anyonda boş yerlere girer.');
    c.note('<b>İyonun dizilimini atomun dizilimi verir.</b><br>Katyonda elektron en yüksek enerji seviyesinden çıkar; anyonda boş yerlere girer.', 'İyonun dizilimi', 'etkilesim-iyon-dizilimi');
    await sil(g3);

    // Soy gaz dizilimi
    const g4 = yeni();
    yazi(c, g4, 500, 110, 'İyon, soy gaz dizilimine ulaşır', { size: 38, kalin: 700, renk });
    yazi(c, g4, 500, 230, '1A, 2A, 3A: elektron verir', { size: 34 });
    yazi(c, g4, 500, 310, '7A, 6A, 5A: elektron alır', { size: 34 });
    yazi(c, g4, 500, 430, 'K⁺ ve Ar: aynı dizilim', { size: 34, kalin: 700, renk: RENK.b });
    await goster(g4, 'Atom, kendine en yakın soy gazın dizilimine ulaşınca kararlı olur.');
    await c.say('1A, 2A ve 3A grubu metalleri sırasıyla bir, iki, üç elektron verir.',
      { speak: 'Bir A, iki A ve üç A grubu metalleri sırasıyla bir, iki, üç elektron verir.' });
    await c.say('7A, 6A ve 5A grubu ametalleri sırasıyla bir, iki, üç elektron alır.',
      { speak: 'Yedi A, altı A ve beş A grubu ametalleri sırasıyla bir, iki, üç elektron alır.' });
    c.note('<b>İyonun dizilimi en yakın soy gazın dizilimine benzer.</b><br>K<sup>+</sup> ve Ar', 'Soy gaz dizilimi', 'etkilesim-soy-gaz');
    await sil(g4);

    // İzoelektronik
    const g5 = yeni();
    yazi(c, g5, 500, 110, 'İzoelektronik tanecikler', { size: 38, kalin: 700, renk });
    yazi(c, g5, 500, 230, 'Na⁺ · Mg²⁺ · Ne', { size: 44, kalin: 700, renk: RENK.a });
    yazi(c, g5, 500, 320, '10 elektron · aynı dizilim', { size: 34 });
    yazi(c, g5, 500, 410, 'proton: 11 · 12 · 10', { size: 34, renk: RENK.b });
    await goster(g5, 'Elektron sayısı ve dizilimi aynı, proton sayısı farklı taneciklere izoelektronik denir.');
    await c.say('Na⁺, Mg²⁺ ve Ne’nin üçünde de 10 elektron vardır.',
      { speak: 'Artı bir yüklü sodyum iyonu, artı iki yüklü magnezyum iyonu ve neonun üçünde de on elektron vardır.' });
    c.note('<b>İzoelektronik: elektron sayısı ve dizilimi aynı, protonu farklı.</b><br>Na<sup>+</sup>/Mg<sup>2+</sup>/Ne', 'İzoelektronik', 'etkilesim-izoelektronik');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'etkilesim-g2', kicker: 'Konu G · İyon oluşumu', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: İyon oluşumu',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>altı karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun beş kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Bir taneciğin elektron sayısı, proton sayısından 2 fazladır. Bu tanecik hangisidir?',
        options: ['2+ yüklü katyon', '2− yüklü anyon', 'Nötr atom'], answer: 1,
        why: ['Katyonda elektron değil, proton fazladır; elektron veren atom katyon olur.', 'Evet. Elektron protondan 2 fazlaysa yük 2− olur; tanecik anyondur.', 'Nötr atomda proton ve elektron sayıları eşittir; burada iki fark var.'], scene: 0,
      },
      {
        q: 'Magnezyum atomu Mg<sup>2+</sup> iyonuna dönüşürken hangisi aynı kalır?',
        options: ['Elektron sayısı', 'Taneciğin yükü', 'Proton sayısı'], answer: 2,
        why: ['Magnezyum iki elektron verir; elektron sayısı iki azalır.', 'Nötr atomun yükü 0, iyonun yükü 2+; yük değişir.', 'Evet. Çekirdekteki protonlar yerinde kalır; tanecik hâlâ magnezyumdur.'], scene: 0,
      },
      {
        q: 'Berilyumun dizilimi 1s<sup>2</sup>2s<sup>2</sup>; berilyum 2A grubundadır. Be<sup>2+</sup> oluşurken hangi elektronlar verilir?',
        options: ['İki 2s elektronu', 'İki 1s elektronu', 'Bir 1s ve bir 2s elektronu'], answer: 0,
        why: ['Evet. Katyonda elektronlar en yüksek enerji seviyesinden çıkar; burada bu ikinci seviyedeki 2s orbitalidir.', '1s en içteki seviyedir; en yüksek enerji seviyesi ikincidir ve elektronlar oradan çıkar.', 'Elektronlar farklı seviyelerden değil, hepsi en yüksek enerji seviyesinden çıkar.'], scene: 0,
      },
      {
        q: 'X atomu 3A grubunda yer alan bir metaldir. X iyon oluşturursa hangisi olur?',
        options: ['X<sup>+</sup>', 'X<sup>3−</sup>', 'X<sup>3+</sup>'], answer: 2,
        why: ['Bir elektron veren 1A grubu metalidir; 3A grubu metali üç elektron verir.', 'Negatif yük elektron alan atomun yüküdür; metal elektron verir.', 'Evet. 3A grubu metali üç elektron verir ve 3+ yüklü katyon olur.'], scene: 0,
      },
      {
        q: 'O<sup>2−</sup> iyonunda 8 proton, Mg<sup>2+</sup> iyonunda 12 proton var. İkisi için hangisi doğrudur?',
        options: ['Proton sayıları farklı olduğu için dizilimleri de farklıdır.', 'İkisinin de elektron sayısı ve dizilimi aynıdır; izoelektroniktir.', 'İkisi de aynı elementin farklı iyonlarıdır.'], answer: 1,
        why: ['İkisinde de 10 elektron var ve dizilimleri aynıdır; farklı olan yalnızca proton sayısıdır.', 'Evet. 8 + 2 = 10 ve 12 − 2 = 10 elektron var; dizilim aynı, proton sayısı farklıdır.', 'Proton sayıları farklı; biri oksijenin, öteki magnezyumun iyonudur.'], scene: 0,
      },
      {
        q: 'Yükü 2+ olan bir katyonun 20 elektronu var. Kaç protonu vardır?',
        options: ['22', '20', '18'], answer: 0,
        why: ['Evet. Katyonda proton elektrondan fazladır: 20 + 2 = 22.', 'Proton 20 olsaydı elektron sayısıyla eşit olur, tanecik nötr kalırdı.', 'Proton 18 olsaydı elektron fazla kalır ve yük negatif olurdu.'], scene: 0,
      },
    ],
    summary: [
      '<b>İyon oluşurken elektron değişir, proton kalır;</b> elektron veren katyon, alan anyon olur.',
      'İyonun dizilimi <b>en yakın soy gazın dizilimine</b> benzer.',
      '<b>İzoelektronik taneciklerde</b> elektron sayısı ve dizilim aynı, proton sayısı farklıdır.',
    ],
    nextLesson: { href: 'h1-atom-yaricapi.html', label: 'Sonraki konu: Periyodik özellikler ›' },
  });
})();
