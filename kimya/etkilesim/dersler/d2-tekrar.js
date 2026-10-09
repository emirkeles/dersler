/* D2 — Konu tekrarı: Orbitallerin enerjisi
   Yeni bilgi yok. Tek sahnede konunun beş kuralı toplanır; ardından altı karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, belir, kart } = window.KIT;
  const renk = '#3cc8e8';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);

    // Orbitalin adı: önce enerji seviyesi, sonra tür
    const g1 = yeni();
    yazi(c, g1, 500, 100, 'Orbitalin adı: sayı ve harf', { size: 38, kalin: 700, renk });
    yazi(c, g1, 500, 260, '3p', { size: 100, kalin: 700, renk: RENK.a });
    yazi(c, g1, 500, 350, 'önce enerji seviyesi', { size: 34 });
    yazi(c, g1, 500, 410, 'sonra tür', { size: 34 });
    yazi(c, g1, 500, 490, 'Sayı, orbital sayısı değil', { size: 28, renk: RENK.soluk });
    await goster(g1, 'Bir orbitalin adında önce enerji seviyesi, sonra tür yazılır.');
    await c.say('3p, üçüncü enerji seviyesindeki p türü orbitaldir.', { speak: 'Üç pe, üçüncü enerji seviyesindeki pe türü orbitaldir.' });
    await c.say('Baştaki sayı orbital sayısını değil, enerji seviyesini gösterir.');
    c.note('<b>Baştaki sayı orbital sayısını değil, enerji seviyesini gösterir.</b><br>3p: üçüncü seviye, p türü', 'Orbitalin adı', 'etkilesim-orbitalin-adi');
    await sil(g1);

    // Türlere göre orbital sayısı
    const g2 = yeni();
    yazi(c, g2, 500, 100, 'Orbital sayıları', { size: 38, kalin: 700, renk });
    ['s', 'p', 'd', 'f'].forEach((t, i) => {
      yazi(c, g2, 200 + i * 200, 225, t, { size: 70, kalin: 700, renk: RENK.a });
      yazi(c, g2, 200 + i * 200, 305, [1, 3, 5, 7][i] + ' orbital', { size: 32 });
    });
    yazi(c, g2, 500, 450, 'Üçüncü seviye: 9 orbital', { size: 32, kalin: 700, renk: RENK.b });
    await goster(g2, 'Orbital sayısı türe göre bellidir.');
    await c.say('s bir, p üç, d beş, f yedi orbitaldir.', { speak: 'Se bir, pe üç, de beş, fe yedi orbitaldir.' });
    await c.say('Üçüncü seviyede bir, üç ve beş orbital var; toplam dokuz.');
    c.note('<b>s: 1, p: 3, d: 5, f: 7 orbital</b><br>Üçüncü seviye: 1 + 3 + 5 = 9', 'Orbital sayıları', 'etkilesim-orbital-sayilari');
    await sil(g2);

    // Önerme veriye dayanır
    const g3 = yeni();
    yazi(c, g3, 500, 100, 'Önerme veriye dayanır', { size: 38, kalin: 700, renk });
    kart(c, g3, 'Ölçüm, diyagram', ['veriye dayanır'], { x: 60, y: 170, w: 420, h: 200, renk: RENK.a, size: 32 });
    kart(c, g3, 'Baştaki sayı', ['veriye dayanmaz'], { x: 520, y: 170, w: 420, h: 200, renk: RENK.b, size: 32 });
    yazi(c, g3, 500, 470, 'Daha çok enerji → daha yüksek enerjili', { size: 30, renk: RENK.soluk });
    await goster(g3, 'Çıkmak için daha çok enerji gerekiyorsa orbital daha yüksek enerjilidir.');
    await c.say('Veriye dayanan önerme, gerekçesini ölçümden ya da diyagramdan alır.');
    await c.say('Sonucu doğru olsa bile gerekçesi veri değilse önerme veriye dayanmaz.');
    c.note('<b>Önerme veriye dayanır.</b><br>2p’ye çıkmak daha çok enerji ister: 2s &lt; 2p', 'Veriden önerme', 'etkilesim-veriden-onerme');
    await sil(g3);

    // Eş enerjili orbitaller
    const g4 = yeni();
    yazi(c, g4, 500, 100, 'Eş enerji', { size: 38, kalin: 700, renk });
    [['Üç 2p orbitali', 'eş enerjili', RENK.a], ['Beş 3d orbitali', 'eş enerjili', RENK.a], ['3s ile 3p', 'eşit değil', RENK.b]].forEach(([sol, sag, r], i) => {
      const y = 220 + i * 80;
      yazi(c, g4, 90, y, sol, { size: 34, hiza: 'start' });
      yazi(c, g4, 560, y, sag, { size: 34, kalin: 700, hiza: 'start', renk: r });
    });
    yazi(c, g4, 500, 490, 'Aynı alt enerji seviyesi', { size: 28, renk: RENK.soluk });
    await goster(g4, 'Aynı alt enerji seviyesindeki orbitallerin enerjileri birbirine eşittir.');
    await c.say('Üç 2p orbitali ve beş 3d orbitali eş enerjilidir.', { speak: 'Üç tane iki pe orbitali ve beş tane üç de orbitali eş enerjilidir.' });
    await c.say('3s ile 3p farklı alt enerji seviyeleridir; enerjileri eşit değil.', { speak: 'Üç se ile üç pe farklı alt enerji seviyeleridir; enerjileri eşit değil.' });
    c.note('<b>Aynı alt enerji seviyesindeki orbitaller eş enerjilidir.</b><br>Üç 2p orbitali', 'Eş enerji', 'etkilesim-es-enerji');
    await sil(g4);

    // Genel enerji sırası
    const g5 = yeni();
    yazi(c, g5, 500, 100, 'Sırayı enerji belirler', { size: 38, kalin: 700, renk });
    yazi(c, g5, 500, 220, '1s, 2s, 2p, 3s', { size: 40 });
    yazi(c, g5, 500, 295, '3p, 4s, 3d, 4p', { size: 40 });
    yazi(c, g5, 500, 400, '4s, 3d’den önce gelir', { size: 34, kalin: 700, renk: RENK.b });
    yazi(c, g5, 500, 490, 'düşük enerjiden yükseğe', { size: 28, renk: RENK.soluk });
    await goster(g5, 'Genel sıra şöyledir: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.',
      { speak: 'Genel sıra şöyledir: bir se, iki se, iki pe, üç se, üç pe, dört se, üç de, dört pe.' });
    await c.say('4s, numarası büyük olduğu hâlde 3d’den önce gelir.', { speak: 'Dört se, numarası büyük olduğu hâlde üç deden önce gelir.' });
    await c.say('Sırayı numara değil, enerji belirler.', { speak: 'Sırayı numara değil, [short pause] enerji belirler.' });
    c.note('<b>Sırayı baştaki sayı değil, enerji belirler.</b><br>4s &lt; 3d', 'Enerji sırası', 'etkilesim-enerji-sirasi');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'etkilesim-d2', kicker: 'Konu D · Orbitallerin enerjisi', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Orbitallerin enerjisi',
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
        q: '4f alt enerji seviyesinde kaç orbital vardır?',
        options: ['Dört', 'Beş', 'Yedi'], answer: 2,
        why: ['Baştaki 4 enerji seviyesini gösterir; orbital sayısını değil.', 'Beş orbital d türündedir; f türünde beş değil, yedi orbital vardır.', 'Evet. f türü yedi özdeş orbitalden oluşur.'], scene: 0,
      },
      {
        q: 'Bir atomda elektronu 3p orbitaline çıkarmak, 4p orbitaline çıkarmaktan daha az enerji istiyor. Bu veriden hangi önerme çıkar?',
        options: ['3p, 4p’den daha düşük enerjilidir.', '4p, 3p’den daha düşük enerjilidir.', '3p ve 4p eş enerjilidir.'], answer: 0,
        why: ['Evet. Çıkmak için daha az enerji gereken orbital daha düşük enerjilidir.', 'Sıra ters: daha çok enerji isteyen 4p daha yüksek enerjilidir.', 'Gereken enerjiler eşit değil; bu yüzden enerjileri de eşit değildir.'], scene: 0,
      },
      {
        q: 'Hangi orbital grubu eş enerjilidir?',
        options: ['1s ve 2s orbitalleri', 'Üç 4p orbitali', '3s ve 3p orbitalleri'], answer: 1,
        why: ['1s ile 2s farklı alt enerji seviyeleridir; enerjileri eşit değildir.', 'Evet. Aynı alt enerji seviyesindeki orbitaller eş enerjilidir.', '3s ile 3p farklı alt enerji seviyeleridir; yalnızca aynı seviyede olmak yetmez.'], scene: 0,
      },
      {
        q: 'Ece orbitalleri düşük enerjiden yükseğe diziyor: 2s, 2p, 3s, 3p, 4s, 3d. 4p orbitalini nereye koymalıdır?',
        options: ['3d’den sonra', '4s ile 3d arasına', '3p ile 4s arasına'], answer: 0,
        why: ['Evet. Genel sırada 4p, 3d’den sonra gelir ve diyagramda en üsttedir.', '4s ile 3d yan yana gelir; arada başka orbital yoktur.', '3p ile 4s arasında başka orbital yoktur; 4p bu sıranın sonundadır.'], scene: 0,
      },
      {
        q: 'Dördüncü enerji seviyesinde s, p, d ve f türü orbitaller bulunur. Bu seviyede toplam kaç orbital vardır?',
        options: ['Dört', 'Yedi', 'On altı'], answer: 2,
        why: ['Dört, alt enerji seviyelerinin sayısıdır; orbitaller tek tek sayılmalı.', 'Yedi, yalnızca 4f orbitallerinin sayısıdır.', 'Evet. 1 + 3 + 5 + 7 = 16 orbital.'], scene: 0,
      },
      {
        q: 'Defne: “Orbitallerin enerji sırasını ölçmeye gerek yok, baştaki sayıya bakmak yeter.” Hangi karşılık doğrudur?',
        options: ['Haklı; baştaki sayı büyüdükçe enerji de büyür.', 'Haksız; sıra deneylerle belirlenen bağıl enerji diyagramından okunur.', 'Haksız; sıra yalnızca orbitallerin sayısına bakılarak bulunur.'], answer: 1,
        why: ['Her zaman değil: 4s, numarası büyük olduğu hâlde 3d’den düşük enerjilidir.', 'Evet. Orbitallerin birbirine göre enerjisini deneyler belirler; diyagram bunu gösterir.', 'Orbital sayısı bir enerji verisi değildir; sıra ölçümden gelir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Orbitalin adında önce enerji seviyesi, sonra tür yazılır;</b> s: 1, p: 3, d: 5, f: 7 orbital.',
      '<b>Önerme veriye dayanır;</b> aynı alt enerji seviyesindeki orbitaller eş enerjilidir.',
      '<b>Sırayı numara değil, enerji belirler:</b> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p.',
    ],
    nextLesson: { href: 'e1-aufbau.html', label: 'Sonraki konu: Elektron dizilimi ›' },
  });
})();
