/* E4 — Konu tekrarı: Elektron dizilimi
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart, orbitalKutusu } = window.KIT;
  const renk = '#6ea8ff';
  const UST = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const ust = (s) => s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '<sup>' + [...m].map((h) => UST.indexOf(h)).join('') + '</sup>');

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);

    // Dizilim yazımı
    const g1 = yeni();
    yazi(c, g1, 500, 95, 'Dizilimi oku', { size: 38, kalin: 700, renk });
    yazi(c, g1, 500, 210, '2p⁶', { size: 80, kalin: 700, renk: RENK.vurgu });
    yazi(c, g1, 500, 295, '2 → enerji seviyesi', { size: 32 });
    yazi(c, g1, 500, 355, 'p → orbitalin türü', { size: 32 });
    yazi(c, g1, 500, 415, '6 → elektron sayısı', { size: 32 });
    yazi(c, g1, 500, 500, 'Nötr atom: elektron sayısı = atom numarası', { size: 28, renk: RENK.soluk });
    await goster(g1, 'Dizilimde sayı seviyeyi, harf orbitalin türünü, üs elektron sayısını gösterir.');
    await c.say('Nötr bir atomda elektron sayısı atom numarasına eşittir.');
    c.note(ust('<b>2p⁶: 2. enerji seviyesi, p türü, 6 elektron.</b><br>Kutu orbital, ok elektron.'), 'Dizilim yazımı', 'etkilesim-dizilim-yazimi');
    await sil(g1);

    // Aufbau ilkesi
    const g2 = yeni();
    yazi(c, g2, 500, 100, 'Aufbau ilkesi', { size: 38, kalin: 700, renk });
    yazi(c, g2, 500, 195, 'Önce düşük enerjili orbital dolar', { size: 34 });
    yazi(c, g2, 500, 310, '1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p', { size: 38, kalin: 700, renk: RENK.a });
    yazi(c, g2, 500, 420, '4s, 3d’den önce dolar', { size: 32 });
    await goster(g2, 'Aufbau ilkesi: elektron, yer olan en düşük enerjili orbitale yerleşir.');
    await c.say('Sıra: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.', { speak: 'Sıra: bir se, iki se, iki pe, üç se, üç pe, dört se, üç de, dört pe.' });
    await c.say('Orbitalleri numara değil, enerji sıraya dizer.');
    c.note(ust('<b>Aufbau ilkesi: önce düşük enerjili orbital dolar.</b><br>C: 1s² 2s² 2p²'), 'Aufbau ilkesi', 'etkilesim-aufbau');
    await sil(g2);

    // Pauli dışlama ilkesi
    const g3 = yeni();
    yazi(c, g3, 500, 95, 'Pauli dışlama ilkesi', { size: 38, kalin: 700, renk });
    orbitalKutusu(c, g3, 460, 150, 2, { renk: RENK.a });
    yazi(c, g3, 500, 300, 'Bir orbitalde en çok 2 elektron', { size: 34 });
    yazi(c, g3, 500, 365, 'İki elektron zıt yönlü', { size: 34 });
    yazi(c, g3, 500, 470, 's² · p⁶ · d¹⁰', { size: 38, kalin: 700, renk: RENK.b });
    await goster(g3, 'Pauli dışlama ilkesi: bir orbitalde en çok iki elektron bulunur.');
    await c.say('Bu iki elektron zıt yönlü olmak zorundadır.');
    await c.say('Bu yüzden dizilimde en çok s², p⁶ ve d¹⁰ yazılır.', { speak: 'Bu yüzden dizilimde en çok se iki, pe altı ve de on yazılır.' });
    c.note(ust('<b>Pauli dışlama ilkesi: bir orbitalde en çok iki elektron, zıt yönlü.</b><br>s²: en çok 2, p⁶: en çok 6, d¹⁰: en çok 10'), 'Pauli dışlama ilkesi', 'etkilesim-pauli');
    await sil(g3);

    // Hund kuralı
    const g4 = yeni();
    yazi(c, g4, 500, 95, 'Hund kuralı', { size: 38, kalin: 700, renk });
    [290, 410, 530].forEach((x) => orbitalKutusu(c, g4, x, 160, 1, { renk: RENK.a, ayni: true }));
    yazi(c, g4, 500, 330, 'Önce her kutuya birer elektron', { size: 34 });
    yazi(c, g4, 500, 410, 'Boş kutu kalmayınca eşleşme', { size: 34, renk: RENK.b });
    await goster(g4, 'Hund kuralı: elektronlar eş enerjili orbitallere önce birer birer, aynı yönlü yerleşir.');
    await c.say('Boş kutu kalmayınca elektronlar zıt yönlü eşleşir.');
    c.note('<b>Hund kuralı: eş enerjili orbitallere önce birer birer, aynı yönlü.</b><br>Boş kutu kalmayınca elektronlar zıt yönlü eşleşir.', 'Hund kuralı', 'etkilesim-hund');
    await sil(g4);

    // Valans elektronları
    const g5 = yeni();
    yazi(c, g5, 500, 100, 'Valans elektronları', { size: 38, kalin: 700, renk });
    yazi(c, g5, 500, 195, 'En dış enerji seviyesindeki elektronlar', { size: 34 });
    yazi(c, g5, 500, 310, 'O: 2s² 2p⁴ → 6', { size: 42, kalin: 700, renk: RENK.a });
    yazi(c, g5, 500, 430, 'd ile bitiyorsa: son s ve d birlikte', { size: 32 });
    await goster(g5, 'Atomun en dış enerji seviyesindeki elektronlara valans elektronları denir.');
    await c.say('Oksijende 2s² ve 2p⁴ birlikte sayılır: altı valans elektronu.', { speak: 'Oksijende iki se iki ve iki pe dört birlikte sayılır: altı valans elektronu.' });
    await c.say('Dizilim d ile bitiyorsa son s ve d birlikte sayılır.', { speak: 'Dizilim de ile bitiyorsa son se ve de birlikte sayılır.' });
    c.note(ust('<b>Valans elektronları: en dış enerji seviyesindeki elektronlar.</b><br>O: 2s² 2p⁴ → 6'), 'Valans elektronları', 'etkilesim-valans');
    await sil(g5);

    // Yarı dolu, tam dolu
    const g6 = yeni();
    yazi(c, g6, 500, 95, 'Yarı dolu, tam dolu', { size: 38, kalin: 700, renk });
    kart(c, g6, 'Yarı dolu', ['s¹ · p³ · d⁵'], { x: 60, y: 170, w: 420, h: 200, renk: RENK.a, size: 34 });
    kart(c, g6, 'Tam dolu', ['s² · p⁶ · d¹⁰'], { x: 520, y: 170, w: 420, h: 200, renk: RENK.b, size: 34 });
    await goster(g6, 'Eş enerjili orbitallerin hepsinde tek elektron varsa orbitaller yarı doludur.');
    await c.say('Hepsi iki elektronla dolmuşsa orbitaller tam doludur.');
    await c.say('p orbitalleri üç elektronla yarı, altı elektronla tam dolar.', { speak: 'Pe orbitalleri üç elektronla yarı, altı elektronla tam dolar.' });
    c.note(ust('<b>Yarı dolu: s¹, p³, d⁵.</b><br>Tam dolu: s², p⁶, d¹⁰.'), 'Yarı dolu, tam dolu', 'etkilesim-yari-tam-dolu');
    await sil(g6);

    // Küresel simetri ve kararlılık
    const g7 = yeni();
    yazi(c, g7, 500, 95, 'Küresel simetri', { size: 38, kalin: 700, renk });
    yazi(c, g7, 500, 205, 'Yarı dolu ya da tam dolu', { size: 34 });
    yazi(c, g7, 500, 285, '→ çekim dengeli', { size: 34, renk: RENK.a });
    yazi(c, g7, 500, 365, '→ daha kararlı atom', { size: 34, renk: RENK.a });
    yazi(c, g7, 500, 445, '→ elektron koparmak daha zor', { size: 34, renk: RENK.a });
    await goster(g7, 'Yarı ya da tam dolu orbitallerle biten dizilim küresel simetri gösterir.');
    await c.say('Çekim dengeli dağıldığında atomun kararlılığı artar.');
    await c.say('Kararlı bir atomdan elektron koparmak daha zordur.');
    c.note('<b>Yarı dolu ya da tam dolu: dengeli dizilim, kararlı atom.</b>', 'Küresel simetri', 'etkilesim-kuresel-simetri');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'etkilesim-e4', kicker: 'Konu E · Elektron dizilimi', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Elektron dizilimi',
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
        q: 'Titanyumun yirmi iki elektronu vardır. Dizilimi hangi orbitallerle biter?',
        options: ['4s² 3d²', '3d⁴', '4s² 4p²'].map(ust), answer: 0,
        why: ['Evet. 3p dolunca sıra 4s’ye, sonra 3d’ye gelir: 18 + 2 + 2 = 22.', '4s atlanmış; enerji sırasında 4s, 3d’den önce gelir.', 'Sıra 4s, 3d, 4p’dir; 4p, 3d’den sonra dolar.'].map(ust), scene: 0,
      },
      {
        q: ust('Argonun dizilimi 1s² 2s² 2p⁶ 3s² 3p⁶. Kaç valans elektronu vardır?'),
        options: ['18', '6', '8'], answer: 2,
        why: ['On sekiz, bütün elektronların sayısıdır; iç seviyeler sayılmaz.', ust('Yalnızca 3p⁶ sayılmış; aynı seviyedeki 3s² de sayılır.'), ust('Evet. En dış seviye üçüncüdür; 3s² ve 3p⁶ birlikte sayılır: 2 + 6 = 8.')], scene: 0,
      },
      {
        q: 'Bir atomun üç 3p kutusunda beş elektron vardır. Kaç kutuda elektronlar eşleşmiştir?',
        options: ['Üç kutuda', 'İki kutuda', 'Bir kutuda'], answer: 1,
        why: ['Üç çift altı elektron eder; burada beş elektron var.', 'Evet. Önce üç kutuya birer elektron girer; dördüncü ve beşinci elektron iki kutuyu eşleştirir.', 'Tek eşleşme dört elektrona denk gelir; beşinci elektron ikinci bir kutuyu eşleştirir.'], scene: 0,
      },
      {
        q: ust('Nötr bir atomun dizilimi 1s² 2s² 2p⁶ 3s² 3p¹. Atom numarası kaçtır?'),
        options: ['1', '3', '13'], answer: 2,
        why: ['Bir, yalnızca son orbitaldeki elektron sayısıdır; nötr atomda bütün üsler toplanır.', 'Üç, son orbitalin seviye numarasıdır; atom numarası üslerin toplamıdır.', 'Evet. 2 + 2 + 6 + 2 + 1 = 13 elektron; nötr atomda elektron sayısı atom numarasına eşittir.'], scene: 0,
      },
      {
        q: 'Bir atomun beş d orbitalinde on elektron vardır. Bu orbitaller nasıl doludur?',
        options: ['Tam dolu', 'Yarı dolu', 'Eşit dolmamış'], answer: 0,
        why: ['Evet. Beş d orbitalinin hepsinde iki elektron var; d orbitalleri on elektronla tam dolar.', 'Yarı dolu için beş d orbitalinin her birinde tek elektron olmalı, toplam beş elektron.', 'Kutuların hepsinde çift var; orbitaller eşit dolmuştur.'], scene: 0,
      },
      {
        q: ust('Bir öğrenci bir atomun dizilimini 3d¹² ile bitirmiştir. Bu yazım neden olamaz?'),
        options: ['d orbitalleri en çok altı elektron alır.', 'd orbitalleri en çok on elektron alır.', 'd orbitalleri en çok sekiz elektron alır.'], answer: 1,
        why: ['Altı, üç p orbitalinin toplamıdır; beş d orbitali bundan fazla elektron alır.', 'Evet. Beş d orbitalinin her biri en çok iki elektron alır: toplam on.', 'Beş orbitalin her birinde iki elektron olur; sekiz değil, on elektron.'], scene: 0,
      },
      {
        q: ust('Dizilimi 3p² ile biten bir atom ile 3p³ ile biten bir atomdan hangisinden elektron koparmak daha zordur?'),
        options: ['3p² ile biten atomdan', '3p³ ile biten atomdan', 'İkisinden de aynı'].map(ust), answer: 1,
        why: [ust('3p² ile biten atomda 3p orbitalleri eşit dolmamıştır; küresel simetri yoktur.'), ust('Evet. 3p³ yarı doludur; küresel simetri gösteren atom daha kararlıdır, elektron koparmak daha zordur.'), 'Dizilimler aynı kararlılıkta değil: yalnızca biri küresel simetri gösterir.'], scene: 0,
      },
      {
        q: ust('Bir öğrenci borun beş elektronunu 1s² 2p³ olarak yazmış. Bu yazımın hatası nedir?'),
        options: ['1s orbitali en çok dört elektron alır.', '2p orbitalleri en çok iki elektron alır.', '2s dolmadan 2p orbitallerine geçilmiş.'].map(ust), answer: 2,
        why: [ust('1s² zaten iki elektrondur ve doğrudur; hata başka yerde.'), ust('Üç 2p orbitali en çok altı elektron alır; 2p³ yazılabilir.'), 'Evet. 1s dolunca sıradaki orbital 2s’dir; 2s boşken 2p orbitallerine geçilmez.'], scene: 0,
      },
    ],
    summary: [
      '<b>Elektron, yer olan en düşük enerjili orbitale yerleşir;</b> bir orbitalde en çok iki zıt yönlü elektron bulunur.',
      'Eş enerjili orbitallere elektronlar <b>önce birer birer</b> yerleşir; sonra eşleşir.',
      '<b>Yarı dolu ya da tam dolu</b> dizilim dengeli ve kararlıdır; valans elektronları en dış enerji seviyesindedir.',
    ],
    nextLesson: { href: 'f1-dizilimden-adrese.html', label: 'Sonraki konu: Periyodik tabloda yer bulma ›' },
  });
})();
