/* M3 — Konu tekrarı: Yüzey gerilimi
   Yeni bilgi yok. Tek sahnede konunun beş kuralı beş panoda toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/M-yuzey-gerilimi.md (M3). Seslendirme yok.
   Panoda çizim ve kısa etiket vardır; kuralın uzun hâli altyazıda ve defterdedir. Oklar ve molekül sayıları şematiktir. Araçlar: m-araclar.js (KIT_M). */
(() => {
  'use strict';
  const { RENK, ileri, yazi, cizgi, kutu, gizle, belir, par } = window.KIT;
  const { GRI, MOR, kubbeH, sb, para, suMol, sabunMol, cekim } = window.KIT_M;

  /* ---- 1. Konunun kuralları: beş pano, her kural kendi panosuna çizilir, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const P = [[20, 20, 310, 250], [345, 20, 310, 250], [670, 20, 310, 250], [20, 290, 475, 262], [505, 290, 475, 262]];
    const cerceve = c.S('g', {}, svg);
    P.forEach((p) => kutu(c, cerceve, p[0], p[1], p[2], p[3]));
    gizle(cerceve);

    // Pano 1: para, damlalık ve yüksek kubbe.
    const g1 = c.S('g', {}, svg);
    para(c, g1, { x: 175, y: 205, k: 0.55, sivi: 'su', N: 22, H: kubbeH('su-20'), n: 22, sayac: false, tasti: false });
    yazi(c, g1, 175, 252, 'yüksek kubbe, büyük gerilim', { size: 20, kalin: 600 });

    // Pano 2: üç sütunlu değişken çerçevesi.
    const g2 = c.S('g', {}, svg);
    ['Bağımlı', 'Bağımsız', 'Kontrol'].forEach((ad, i) => {
      const x = 355 + i * 98;
      kutu(c, g2, x, 80, 94, 100, { rx: 10 });
      yazi(c, g2, x + 47, 112, ad, { size: 20, kalin: 700, renk: RENK.soluk });
      cizgi(c, g2, [x + 10, 126], [x + 84, 126], GRI.cam, 2);
    });
    yazi(c, g2, 500, 252, 'tek değişken değişir', { size: 20, kalin: 600 });

    // Pano 3: iki sıvı kesiti, 20 °C ve 50 °C.
    const g3 = c.S('g', {}, svg);
    cekim(c, g3, { x: 680, y: 36, w: 140, h: 160, sutun: 3, satir: 3, r: 11, kalin: 5, ust: 20, alt: 16, kenar: 44, tohum: 4 });
    cekim(c, g3, { x: 830, y: 36, w: 140, h: 160, sutun: 3, satir: 3, r: 11, kalin: 1.6, iz: 16, ust: 20, alt: 16, kenar: 44, tohum: 9 });
    sb(c, g3, 750, 222, '20', '°C', { size: 24, kalin: 700, brenk: RENK.yazi }); sb(c, g3, 900, 222, '50', '°C', { size: 24, kalin: 700, brenk: RENK.yazi });
    yazi(c, g3, 825, 254, 'ısınınca azalır', { size: 20, kalin: 600 });

    // Pano 4: tuz ve sabun yan yana.
    const g4 = c.S('g', {}, svg);
    cizgi(c, g4, [257, 310], [257, 500], GRI.cam, 2, { 'stroke-dasharray': '5 7' });
    const N = [135, 405];
    [-150, -30, 90].forEach((d) => {
      const a = (d * Math.PI) / 180, W = ileri(N, a, 78);
      cizgi(c, g4, N, W, RENK.cekme, 9); suMol(c, g4, W, a, 0.9);
    });
    c.S('circle', { cx: N[0], cy: N[1], r: 26, fill: RENK.arti }, g4);
    c.S('circle', { cx: 100, cy: 330, r: 0 }, g4);
    yazi(c, g4, N[0], N[1] + 9, 'Na^{+}', { size: 24, kalin: 700, renk: '#10162b', math: true });
    const S0 = [372, 468];
    [[304, 405], [440, 405], [300, 475], [444, 475]].forEach((W) => { cizgi(c, g4, S0, W, RENK.cekme, 2, { 'stroke-dasharray': '5 7' }); suMol(c, g4, W, Math.atan2(W[1] - S0[1], W[0] - S0[0]) + Math.PI, 0.9); });
    sabunMol(c, g4, S0, 0, 1.25);
    yazi(c, g4, 135, 536, 'tuz artırır', { size: 22, kalin: 600 }); yazi(c, g4, 372, 536, 'sabun azaltır', { size: 22, kalin: 600 });

    // Pano 5: sabun molekülü, baş ve kuyruk.
    const g5 = c.S('g', {}, svg);
    sabunMol(c, g5, [600, 485], 0, 1.9);
    yazi(c, g5, 650, 490, 'hidrofil', { hiza: 'start', size: 24, kalin: 600 });
    yazi(c, g5, 640, 395, 'hidrofob', { hiza: 'start', size: 24, kalin: 600 });
    [[860, 410], [880, 480]].forEach((W) => suMol(c, g5, W, -0.5, 0.9));
    cizgi(c, g5, [860, 410], [880, 480], RENK.cekme, 2, { 'stroke-dasharray': '5 7' });
    yazi(c, g5, 742, 540, 'kohezyonu azaltır', { size: 22, kalin: 600 });
    gizle(g1, g2, g3, g4, g5);

    await par(c.say('Bu konuda öğrendiklerimizi beş kuralda toplayalım.'), belir(c, cerceve, 500));
    await par(c.say('Kubbe ne kadar yüksekse yüzey gerilimi o kadar büyüktür.'), belir(c, g1, 600));
    c.note('<b>Kubbe yüksekse yüzey gerilimi büyüktür.</b>', 'Dolaylı yöntem', 'tekrar-kubbe');
    await par(c.say('Araştırmada tek değişken değişir, ötekiler sabit kalır.'), belir(c, g2, 600));
    c.note('<b>Tek değişken değişir,</b> ötekiler sabit kalır.', 'Değişkenler', 'tekrar-degiskenler');
    await par(c.say('Sıcaklık arttıkça çekim zayıflar, yüzey gerilimi azalır.'), belir(c, g3, 600));
    c.note('<b>Sıcaklık arttıkça</b> çekim zayıflar; yüzey gerilimi azalır.', 'Sıcaklık', 'tekrar-sicaklik');
    await par(c.say('Tuz yüzey gerilimini artırır; sabun ve deterjan azaltır.'), belir(c, g4, 600));
    c.note('<b>Tuz artırır; sabun ve deterjan azaltır.</b>', 'Çözünen madde', 'tekrar-cozunen');
    await par(c.say('Sabun molekülü, sıvı içindeki kohezyonu azaltır.'), belir(c, g5, 600));
    c.note('<b>Sabun molekülü,</b> sıvı içindeki kohezyonu azaltır.', 'Sabun molekülü', 'tekrar-sabun');
  }

  Ders.start({
    id: 'cesitlilik-m3', kicker: 'Konu M · Yüzey gerilimi', title: 'Konu tekrarı: Yüzey gerilimi', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Yüzey gerilimi',
      hook: 'İki dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun kurallarını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Para üstünde denenen üç sıvıdan X en yüksek, Z en alçak kubbeyi yapıyor. Yüzey gerilimi en küçük olan hangisidir?',
        options: ['X', 'Hepsinin yüzey gerilimi eşittir', 'Z'], answer: 2,
        why: ['X en yüksek kubbeyi yapıyor; yüzey gerilimi en büyük olan odur.', 'Kubbe yükseklikleri farklıysa yüzey gerilimleri de farklıdır.', 'Kubbesi en alçak olan Z’nin yüzey gerilimi en küçüktür.'], scene: 0 },
      { q: 'Hangisi araştırılabilir bir sorudur?',
        options: ['Suya tuz katılırsa para üstünde taşmadan duran damla sayısı değişir mi?', 'Hangi sıvının damlası daha güzel görünür?', 'Yüzey gerilimi neden bu kadar önemlidir?'], answer: 0,
        why: ['Tuzu değiştirir, damla sayısını ölçeriz; soru araştırılabilirdir.', '“Güzel”i ölçemeyiz; değiştirip ölçecek bir şey yok.', 'Bir şeyi değiştirip ölçerek cevaplanmaz.'], scene: 0 },
      { q: 'Sıvıyı ısıtmanın yüzey gerilimine etkisi araştırılıyor. Hangisi kontrol değişkenidir?',
        options: ['Sıcaklık', 'Madenî para ve damlalık', 'Taşmadan duran damla sayısı'], answer: 1,
        why: ['Sıcaklığı değiştiriyoruz; bağımsız değişken odur.', 'Para ve damlalık iki denemede de aynı kalır; kontrol değişkenidir.', 'Damla sayısını ölçüyoruz; bağımlı değişken odur.'], scene: 0 },
      { q: 'Bir öğrenci 20 °C’taki suyu, 50 °C’taki sabunlu suyla karşılaştırıp çözünen maddenin etkisini bulmaya çalışıyor. Sorun nedir?',
        options: ['Sabun kullanılmış', 'Su kullanılmış', 'Çözünen madde de sıcaklık da farklı'], answer: 2,
        why: ['Sabun da kullanılabilir; sorun o değil.', 'Su da kullanılabilir; sorun o değil.', 'İki şey birden değişince fark hangisinden geldiği anlaşılmaz.'], scene: 0 },
      { q: 'Isıtılan gliserinin yüzey gerilimi nasıl değişir?',
        options: ['Azalır', 'Artar', 'Değişmez'], answer: 0,
        why: ['Isınan sıvıda çekim zayıflar; yüzey gerilimi azalır.', 'Isınınca yüzey gerilimi artmaz, azalır.', 'Sıcaklık yüzey gerilimini değiştirir; ısınınca azalır.'], scene: 0 },
      { q: 'Suya sofra tuzu katılıyor. Para üstünde taşmadan duran damla sayısı nasıl değişir?',
        options: ['Azalır', 'Artar', 'Değişmez'], answer: 1,
        why: ['Tuz yüzey gerilimini azaltmaz; artırır.', 'Tuz yüzey gerilimini artırır; kubbe yükselir, daha çok damla taşır.', 'Çözünen madde yüzey gerilimini değiştirir; tuz artırır.'], scene: 0 },
      { q: 'Deterjan suyun yüzey gerilimini neden azaltır?',
        options: ['Su moleküllerini birbirine daha çok bağlar', 'Suyu ısıtır', 'Sıvı içindeki kohezyonu azaltır'], answer: 2,
        why: ['Bağlasaydı yüzey gerilimi artardı; deterjan çekimi azaltır.', 'Deterjan suyu ısıtmaz.', 'Deterjan sıvı içindeki kohezyonu azaltır; yüzey gerilimi de azalır.'], scene: 0 },
      { q: 'Süt tabağındaki boyalara deterjan damlatılınca boyalar dağılıyor. Bu olayda yüzey gerilimi nasıl değişmiştir?',
        options: ['Azalmıştır', 'Artmıştır', 'Değişmemiştir'], answer: 0,
        why: ['Deterjan yüzey gerilimini azaltır; boyalar toplu kalamayıp dağılır.', 'Yüzey gerilimi artsaydı boyalar toplu kalırdı.', 'Yüzey gerilimi değişmeseydi boyalar dağılmazdı.'], scene: 0 },
    ],
    summary: [
      'Kubbe yüksekse yüzey gerilimi büyüktür; araştırmada tek değişken değişir.',
      'Isındıkça çekim zayıflar, yüzey gerilimi azalır.',
      'Tuz artırır; sabun ve deterjan azaltır.',
      '<b>Isındıkça ve sabunla yüzey gerilimi azalır; tuzla artar.</b>',
    ],
  });
})();
