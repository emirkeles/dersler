/* F4 — Konu tekrarı: Periyodik tabloda yer bulma
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart } = window.KIT;
  const renk = '#ff8a5b';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    const baslik = (g, metin, y = 110) => yazi(c, g, 500, y, metin, { size: 38, kalin: 700, renk });

    // 1. Periyot
    const g1 = yeni();
    baslik(g1, 'Periyot = en yüksek enerji seviyesi');
    yazi(c, g1, 500, 250, 'S: …3s² 3p⁴', { size: 38 });
    yazi(c, g1, 500, 330, '→ 3. periyot', { size: 38, kalin: 700, renk: RENK.b });
    yazi(c, g1, 500, 460, 'Üstteki küçük sayılar periyodu göstermez', { size: 30, renk: RENK.soluk });
    await goster(g1, 'Periyodu, dizilimdeki en yüksek enerji seviyesi verir.');
    await c.say('Üstteki küçük sayılar elektron sayısıdır; periyodu göstermez.');
    c.note('<b>Periyot = dizilimdeki en yüksek enerji seviyesi.</b><br>S: …3s² 3p⁴ → 3. periyot', 'Periyot', 'etkilesim-periyot');
    await sil(g1);

    // 2. A grubu
    const g2 = yeni();
    baslik(g2, 'A grubu = en yüksek seviyedeki s + p', 100);
    yazi(c, g2, 500, 230, 'Cl: …3s² 3p⁵', { size: 38 });
    yazi(c, g2, 500, 310, '2 + 5 = 7 → 7A', { size: 38, kalin: 700, renk: RENK.b });
    yazi(c, g2, 500, 450, 'İstisna: He → 8A', { size: 32, renk: RENK.soluk });
    await goster(g2, 'A grubunda en yüksek enerji seviyesindeki s ve p elektronları toplanır.',
      { speak: 'A grubunda en yüksek enerji seviyesindeki se ve pe elektronları toplanır.' });
    await c.say('Klorda 2 + 5 = 7 elektron var: 7A.', { speak: 'Klorda iki artı beş, yedi elektron var: yedi A.' });
    await c.say('Helyum bu kuralın dışında kalır: iki elektronuyla 8A’dadır.',
      { speak: 'Helyum bu kuralın dışında kalır: iki elektronuyla sekiz A grubundadır.' });
    c.note('<b>A grubu = en yüksek enerji seviyesindeki s + p elektronları.</b><br>Cl: 2 + 5 = 7 → 7A', 'A grubu', 'etkilesim-a-grubu');
    await sil(g2);

    // 3. Grubun iki adı
    const g3 = yeni();
    baslik(g3, 'Grubun iki adı', 100);
    ['1A = 1. grup', '3A = 13. grup', '8A = 18. grup'].forEach((s, i) => yazi(c, g3, 500, 220 + i * 80, s, { size: 38 }));
    yazi(c, g3, 500, 490, 'Sütun aynı, ad farklı', { size: 30, renk: RENK.soluk });
    await goster(g3, 'Grupların iki farklı adlandırması vardır.');
    await c.say('3A on üçüncü, 8A on sekizinci gruptur.', { speak: 'Üç A on üçüncü, sekiz A on sekizinci gruptur.' });
    await c.say('Sütun aynıdır, yalnızca adı değişir.');
    c.note('<b>Grubun iki adı vardır.</b><br>1A = 1. grup, 3A = 13. grup, 8A = 18. grup', 'Grubun iki adı', 'etkilesim-grubun-iki-adi');
    await sil(g3);

    // 4. B grubu
    const g4 = yeni();
    baslik(g4, 'Dizilim d ile biterse: B grubu', 100);
    yazi(c, g4, 500, 210, 'en son s + d elektronları', { size: 36 });
    yazi(c, g4, 500, 310, '8, 9, 10 → 8B', { size: 38, kalin: 700, renk: RENK.b });
    yazi(c, g4, 500, 400, '11 → 1B, 12 → 2B', { size: 38, kalin: 700, renk: RENK.b });
    await goster(g4, 'Dizilim d ile biterse B grubudur; en son s ve d toplanır.',
      { speak: 'Dizilim de ile biterse B grubudur; en son se ve de elektronları toplanır.' });
    await c.say('Toplam 8, 9 ya da 10 ise grup 8B’dir.', { speak: 'Toplam sekiz, dokuz ya da on ise grup sekiz B’dir.' });
    await c.say('Toplam 11 ise grup 1B, 12 ise 2B’dir.', { speak: 'Toplam on bir ise grup bir B, on iki ise iki B’dir.' });
    c.note('<b>B grubu = en son s + d elektronları. 8, 9, 10 → 8B.</b><br>Co: 2 + 7 = 9 → 8B', 'B grubu', 'etkilesim-b-grubu');
    await sil(g4);

    // 5. Blok
    const g5 = yeni();
    baslik(g5, 'Blok = dizilimin son orbitali', 100);
    yazi(c, g5, 500, 220, 'Fe: …3d⁶ → d bloğu', { size: 38 });
    yazi(c, g5, 500, 310, 'He: 1s² → s bloğu', { size: 38 });
    yazi(c, g5, 500, 450, 'Sütun değil, son orbital belirler', { size: 30, renk: RENK.soluk });
    await goster(g5, 'Blok, dizilimi aynı tür orbitalle biten elementlerin ortak adıdır.');
    await c.say('Demirin dizilimi 3d⁶ ile biter: d bloğu.', { speak: 'Demirin dizilimi üç de altı ile biter: de bloğu.' });
    await c.say('Bloğu sütunun yeri değil, dizilimin son orbitali belirler.');
    c.note('<b>Blok = dizilimin bittiği orbital türü.</b><br>Fe: …3d⁶ → d bloğu. He: 1s² → s bloğu.', 'Blok', 'etkilesim-blok');
    await sil(g5);

    // 6. Beş grubun özel adı
    const g6 = yeni();
    baslik(g6, 'Beş grubun özel adı', 90);
    [['1A', 'alkali metaller'], ['2A', 'toprak alkali metaller'], ['3A', 'toprak metalleri'], ['7A', 'halojenler'], ['8A', 'soy gazlar']].forEach(([ad, isim], i) => {
      const y = 190 + i * 76;
      yazi(c, g6, 200, y, ad, { size: 36, kalin: 700, hiza: 'start', renk: RENK.b });
      yazi(c, g6, 320, y, isim, { size: 36, hiza: 'start' });
    });
    await goster(g6, '1A grubuna alkali metaller, 2A grubuna toprak alkali metaller denir.',
      { speak: 'Bir A grubuna alkali metaller, iki A grubuna toprak alkali metaller denir.' });
    await c.say('3A grubunun adı toprak metalleridir.', { speak: 'Üç A grubunun adı toprak metalleridir.' });
    await c.say('7A grubuna halojenler, 8A grubuna soy gazlar denir.', { speak: 'Yedi A grubuna halojenler, sekiz A grubuna soy gazlar denir.' });
    c.note('<b>Beş grubun özel adı</b><br>1A alkali metaller · 2A toprak alkali metaller · 3A toprak metalleri · 7A halojenler · 8A soy gazlar', 'Özel adlar', 'etkilesim-ozel-adlar');
    await sil(g6);

    // 7. Grup ve özellik
    const g7 = yeni();
    baslik(g7, 'Aynı grup, benzer özellik', 100);
    [['1A', 'H ametal, ötekiler metal'], ['3A', 'B yarı metal, ötekiler metal'], ['8A', 'tek atomlu, hepsi gaz']].forEach(([ad, ozellik], i) => {
      const y = 230 + i * 90;
      yazi(c, g7, 110, y, ad, { size: 36, kalin: 700, hiza: 'start', renk: RENK.b });
      yazi(c, g7, 240, y, ozellik, { size: 34, hiza: 'start' });
    });
    await goster(g7, 'Aynı gruptaki elementler benzer özellikler gösterir.');
    await c.say('Hidrojen ametaldir, bor yarı metaldir; bu gruplarda öteki elementler metaldir.');
    await c.say('Oda sıcaklığında soy gazların hepsi gazdır.');
    c.note('<b>Aynı gruptaki elementler benzer özellikler gösterir.</b><br>1A: H ametal, ötekiler metal. 3A: B yarı metal. 8A: hepsi gaz.', 'Grup ve özellik', 'etkilesim-grup-ozellik');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'etkilesim-f4', kicker: 'Konu F · Periyodik tabloda yer bulma', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Periyodik tabloda yer bulma',
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
        q: 'Bir element 4. periyotta ve 5B grubundadır. Dizilimi hangisiyle biter?',
        options: ['…4s² 3d⁵', '…4s² 3d³', '…4s² 3d¹⁰ 4p³'], answer: 1,
        why: ['2 + 5 = 7 olur; bu dizilim 7B grubundadır.', 'Dizilim d ile biter ve en son s ile d elektronlarının toplamı 2 + 3 = 5: 5B grubu.', 'Dizilim p ile biter; element B grubunda değil, A grubundadır.'], scene: 0,
      },
      {
        q: 'Borun dizilimi 1s² 2s² 2p¹ olur. Bor hangi A grubundadır?',
        options: ['3A', '1A', '2A'], answer: 0,
        why: ['En yüksek enerji seviyesi iki; orada 2 + 1 = 3 elektron var: 3A.', 'Yalnızca 2p¹ sayılmış; 2s² de aynı enerji seviyesindedir.', 'Yalnızca 2s² sayılmış; 2p¹ de ikinci enerji seviyesindedir.'], scene: 0,
      },
      {
        q: 'Dizilimi …4s² 3d¹⁰ 4p² ile biten element hangi bloktadır?',
        options: ['d bloğu', 's bloğu', 'p bloğu'], answer: 2,
        why: ['3d¹⁰ dizilimin sonu değil; blok son orbitale göre belirlenir.', '4s² dizilimin sonu değil; dizilim 4p² ile bitiyor.', 'Dizilimin son orbitali 4p²: p bloğu.'], scene: 0,
      },
      {
        q: 'Numarayla 14. grup olarak adlandırılan sütunun harfli adı hangisidir?',
        options: ['4A', '4B', '5A'], answer: 0,
        why: ['3A on üçüncü grupsa 4A on dördüncü gruptur.', 'B grupları ortadaki on sütundur ve üçten on ikiye numaralanır; on dördüncü grup sağdaki A sütunlarındandır.', '3A on üçüncü grupsa 5A on beşinci gruptur.'], scene: 0,
      },
      {
        q: 'Dizilimi …4s² 3d¹⁰ 4p⁵ ile biten elementin grubunun özel adı hangisidir?',
        options: ['Alkali metaller', 'Soy gazlar', 'Halojenler'], answer: 2,
        why: ['Alkali metaller 1A grubundadır; bu dizilim p ile bitiyor ve oradaki elektron sayısı bir değil.', 'Soy gazlar 8A grubundadır; burada dördüncü enerji seviyesinde 2 + 5 = 7 elektron var.', 'Dördüncü enerji seviyesinde 2 + 5 = 7 elektron var: 7A grubu, yani halojenler.'], scene: 0,
      },
      {
        q: 'Hangi dizilimle biten element 8B grubundadır?',
        options: ['…4s² 3d¹⁰', '…4s² 3d⁶', '…4s² 3d¹⁰ 4p⁶'], answer: 1,
        why: ['2 + 10 = 12 olur; bu dizilim 2B grubundadır.', 'Dizilim d ile biter ve 2 + 6 = 8: 8B grubu.', 'Dizilim p ile biter; toplam sekiz olsa da bu 8A grubudur.'], scene: 0,
      },
      {
        q: 'Hangisi üçüncü periyottaki bir elementin dizilimidir?',
        options: ['1s² 2s² 2p³', '1s² 2s² 2p⁶ 3s² 3p⁶ 4s²', '1s² 2s² 2p⁶ 3s² 3p²'], answer: 2,
        why: ['Üstteki 3 elektron sayısıdır; en yüksek enerji seviyesi iki, yani ikinci periyot.', 'Dizilim 4s² ile biter; en yüksek enerji seviyesi dörttür.', 'En yüksek enerji seviyesi üç: üçüncü periyot.'], scene: 0,
      },
      {
        q: 'Hidrojenden başka, 1A grubunda yer alan bir element için hangisi beklenir?',
        options: ['Metaldir; yumuşaktır ve yüzeyi parlaktır.', 'Ametaldir; çünkü hidrojenle aynı gruptadır.', 'Yarı metaldir; çünkü bor da bu gruptadır.'], answer: 0,
        why: ['Hidrojen dışındaki 1A elementleri alkali metaldir: yumuşak ve parlak.', 'Hidrojen 1A grubunun tek ametalidir; öteki elementler metaldir.', 'Yarı metal 3A grubundaki bordur; bor 1A grubunda değildir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Dizilimin sonu, elementin tablodaki adresidir.</b>',
      '<b>Periyodu</b> en yüksek enerji seviyesi, <b>A grubunu</b> oradaki s ve p, <b>B grubunu</b> en son s ve d elektronlarının toplamı verir.',
      '<b>Blok</b> dizilimin son orbitalidir; aynı gruptaki elementler benzer özellikler gösterir.',
    ],
    nextLesson: { href: 'g1-iyon-olusumu.html', label: 'Sonraki konu: İyon oluşumu ›' },
  });
})();
