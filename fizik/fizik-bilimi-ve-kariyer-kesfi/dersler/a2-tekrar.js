/* A2 — Konu tekrarı: Fizik bilimi
   Yeni bilgi yok. Tek sahnede konunun beş kuralı toplanır; ardından altı karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, belir, kart } = window.KIT;
  const renk = '#6ea8ff';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    const kartO = (baslik, metin, r) => ({ baslik, metin, renk: r, baslikSize: 26, size: 26 });

    // Bir olaya iki disiplin bakar
    const g1 = yeni();
    yazi(c, g1, 500, 110, 'Bir olaya iki disiplin bakar', { size: 36, kalin: 700 });
    kart(c, g1, 110, 180, 360, 200, kartO('Müzik', 'sesi adlandırır', RENK.disiplin));
    kart(c, g1, 530, 180, 360, 200, kartO('Fizik', 'nasıl oluştuğunu açıklar', RENK.fizik));
    yazi(c, g1, 500, 460, 'Gitar teli titrer ve ses verir', { size: 28, renk: RENK.soluk });
    await goster(g1, 'Bir olaya iki disiplin, yani iki bilgi alanı birlikte bakabilir.');
    await c.say('Müzik sesi adlandırır, fizik sesin nasıl oluştuğunu açıklar.');
    c.note('<b>Bir olaya iki disiplin birlikte bakar.</b><br>Müzik sesi adlandırır, fizik nasıl oluştuğunu açıklar.', 'Disiplin', 'fizik-iki-disiplin');
    await sil(g1);

    // Dört disiplin fiziğin bir konusundan yararlanır
    const g2 = yeni();
    yazi(c, g2, 500, 90, 'Fizikten yararlananlar', { size: 36, kalin: 700 });
    [['Müzik', 'dalgalar'], ['Astronomi', 'hareket'], ['Biyoloji', 'ışık'], ['Kimya', 'hareket ve enerji']].forEach(([ad, konu], i) => {
      const y = 190 + i * 88;
      yazi(c, g2, 180, y, ad, { size: 32, kalin: 700, hiza: 'start', renk: RENK.disiplin });
      cizgi(c, g2, 400, y - 11, 500, y - 11, RENK.ince);
      yazi(c, g2, 540, y, konu, { size: 32, hiza: 'start', renk: RENK.fizik });
    });
    await goster(g2, 'Dört disiplin, fiziğin bir konusundan yararlanır.');
    await c.say('Müzik dalgalardan, astronomi hareketten, biyoloji ışıktan yararlanır.');
    await c.say('Kimya, atomların davranışını hareket ve enerjiyle açıklar.');
    c.note('<b>Müzik dalgalar, astronomi hareket, biyoloji ışık.</b><br>Kimya: hareket ve enerji.', 'Fizikle bağlar', 'fizik-baglar');
    await sil(g2);

    // Matematik bağı ters yöndedir
    const g3 = yeni();
    yazi(c, g3, 500, 150, 'Fizik matematikten yararlanır', { size: 40, kalin: 700, renk });
    yazi(c, g3, 500, 270, 'yasalarını matematik diliyle yazar', { size: 32 });
    yazi(c, g3, 500, 400, 'grafik, hesap', { size: 32, renk: RENK.soluk });
    await goster(g3, 'Matematik bağında yön değişir: yararlanan taraf fiziktir.');
    await c.say('Fizik, bağıntılarını ve yasalarını matematik diliyle yazar.');
    c.note('<b>Fizik, yasalarını matematik diliyle yazar.</b><br>Grafik ve hesap matematikten gelir.', 'Fizik ve matematik', 'fizik-matematik');
    await sil(g3);

    // Fiziğin tanımı
    const g4 = yeni();
    yazi(c, g4, 500, 110, 'Fizik bilimi', { size: 42, kalin: 700, renk: RENK.fizik });
    yazi(c, g4, 500, 200, 'evreni', { size: 32 });
    yazi(c, g4, 500, 265, 'kuvvet, madde, enerji, uzay ve zaman', { size: 36, kalin: 700, renk });
    yazi(c, g4, 500, 330, 'ilişkileriyle inceler.', { size: 32 });
    yazi(c, g4, 500, 450, 'Aracı: hesaplama ve gözlem', { size: 28, renk: RENK.soluk });
    await goster(g4, 'Fizik, evreni ve evrendeki olayları açıklar.');
    await c.say('Bunu kuvvet, madde, enerji, uzay ve zaman ilişkileriyle yapar.');
    await c.say('Aracı hesaplama ve gözlemdir.');
    c.note('<b>Fizik</b>, evreni kuvvet, madde, enerji, uzay ve zaman ilişkileriyle inceler.', 'Fizik bilimi', 'fizik-tanim');
    await sil(g4);

    // Günlük hayatta fizik
    const g5 = yeni();
    yazi(c, g5, 500, 120, 'Günlük hayatta fizik', { size: 36, kalin: 700 });
    kart(c, g5, 30, 200, 300, 220, kartO('Gökkuşağı', 'ışığın kırılması', renk));
    kart(c, g5, 350, 200, 300, 220, kartO('Kaykaycı', 'enerji dönüşümü', renk));
    kart(c, g5, 670, 200, 300, 220, kartO('LED lamba', 'elektrik ve manyetizma', renk));
    await goster(g5, 'Günlük olayları da fiziğin konuları açıklar.');
    await c.say('Gökkuşağını ışığın kırılması, kaykaycıyı enerji dönüşümü açıklar.');
    await c.say('LED lambanın çalışması elektrik ve manyetizma ile açıklanır.', { speak: 'Led lambanın çalışması elektrik ve manyetizma ile açıklanır.' });
    c.note('<b>Günlük olayları fiziğin konuları açıklar.</b><br>Gökkuşağı: ışığın kırılması. Kaykaycı: enerji dönüşümü.', 'Günlük hayatta fizik', 'fizik-gunluk');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-a2', kicker: 'Konu A · Fizik bilimi', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Fizik bilimi',
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
        q: 'Su dolu bardağa konan kalem, yandan bakınca kırıkmış gibi görünür. Bu olayı fiziğin hangi konusu açıklar?',
        options: ['Enerji dönüşümü', 'Işığın kırılması', 'Elektrik ve manyetizma'], answer: 1,
        why: ['Enerji dönüşümü, yokuştan inen kaykaycıyı açıklıyordu; burada görüntü söz konusu.', 'Evet. Gökkuşağındaki gibi ışık suda kırılır.', 'Olayda elektrik yok; bu konu LED lambanın çalışmasını açıklıyordu.'], scene: 0,
      },
      {
        q: 'Bir öğrenci fiziği şöyle tanımlıyor: “Fizik, evreni madde ve enerji ilişkileriyle inceler.” Tanımda eksik kalan hangisidir?',
        options: ['Kuvvet, uzay ve zaman', 'Canlılar ve dokular', 'Notalar ve sesler'], answer: 0,
        why: ['Evet. Tanımda beş kavram var: kuvvet, madde, enerji, uzay ve zaman.', 'Canlıları ve dokuları biyoloji inceler; fiziğin tanımında yer almaz.', 'Notaları müzik adlandırır; fiziğin tanımında yer almaz.'], scene: 0,
      },
      {
        q: 'Fizikle bağ kuran beş disiplinden hangisinde yararlanan taraf fiziktir?',
        options: ['Biyoloji', 'Kimya', 'Matematik'], answer: 2,
        why: ['Biyoloji, mikroskopta fiziğin ışık konusundan yararlanır.', 'Kimya, atomların davranışını fiziğin hareket ve enerji konularıyla açıklar.', 'Evet. Fizik, bağıntılarını ve yasalarını matematik diliyle yazar.'], scene: 0,
      },
      {
        q: 'Ece: “Fizik yalnızca laboratuvardaki deneylerle ilgilenir; günlük olaylar onun konusu değildir.” Hangi örnek Ece’nin yanıldığını gösterir?',
        options: ['Gökkuşağının ışığın kırılmasıyla açıklanması', 'Bitki dokularının mikroskopla incelenmesi', 'Bir sesin nota olarak adlandırılması'], answer: 0,
        why: ['Evet. Gökkuşağı günlük bir olaydır ve onu fiziğin bir konusu açıklar.', 'Dokuları incelemek biyolojinin işidir; günlük bir olayı fiziğin açıkladığını göstermez.', 'Sesi adlandırmak müziğin işidir; fiziğin açıkladığı bir olay değildir.'], scene: 0,
      },
      {
        q: 'Bir araştırmacı, bir kuyruklu yıldızın Güneş çevresindeki yolunu hesaplıyor. Hangi disiplin, fiziğin hangi konusundan yararlanır?',
        options: ['Biyoloji, ışık konusundan', 'Kimya, hareket ve enerji konularından', 'Astronomi, hareket konusundan'], answer: 2,
        why: ['Biyoloji dokuları inceler; gök cisimlerine bakmaz.', 'Kimya atomları ve molekülleri inceler; gök cisimlerinin yoluna bakmaz.', 'Evet. Astronomi, gök cisimlerinin yörüngesini hareket konusuyla hesaplar.'], scene: 0,
      },
      {
        q: 'Bir flütün içindeki hava titreşir ve ses oluşur. Müzik, bu sesin nasıl oluştuğunu fiziğin hangi konusuyla açıklar?',
        options: ['Işık', 'Dalgalar', 'Hareket'], answer: 1,
        why: ['Işık, biyolojinin mikroskopta yararlandığı konuydu.', 'Evet. Gitar telinde olduğu gibi ses dalgalar konusuyla açıklanır.', 'Hareket, astronominin yörünge hesabında yararlandığı konuydu.'], scene: 0,
      },
    ],
    summary: [
      '<b>Fiziği, öteki bilimlerle kurduğu bağlardan tanırız.</b> Dört disiplin fizikten, fizik matematikten yararlanır.',
      'Fizik, evreni <b>kuvvet, madde, enerji, uzay ve zaman</b> ilişkileriyle inceler.',
      '<b>Günlük olayları</b> da fiziğin konuları açıklar.',
    ],
    nextLesson: { href: 'b1-gorselleri-neye-gore-ayirirsin.html', label: 'Sonraki konu: Fizik biliminin alt dalları ›' },
  });
})();
