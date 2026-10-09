/* E8 — Konu tekrarı: Hareketin temel kavramları
   Yeni bilgi yok. Tek sahnede konunun dokuz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, daire, ok, sayiDogrusu, belir } = window.KIT;
  const renk = '#3cc8e8';

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
    const baslik = (g, metin, y = 95) => yazi(c, g, 500, y, metin, { size: 38, kalin: 700, renk });

    // E1: referans noktası ve konum
    const g1 = yeni();
    baslik(g1, 'Konum: nereye göre?', 90);
    yazi(c, g1, 60, 230, 'referans noktası: okul', { size: 34, hiza: 'start', renk: RENK.a });
    yazi(c, g1, 60, 310, 'yön: güney', { size: 34, hiza: 'start', renk: RENK.b });
    yazi(c, g1, 60, 390, 'uzaklık: 400 m', { size: 34, hiza: 'start', renk: RENK.r });
    yazi(c, g1, 760, 180, 'okul', { size: 32, kalin: 700 });
    daire(c, g1, 760, 215, 10, { fill: RENK.vurgu, renk: RENK.vurgu });
    ok(c, g1, 760, 225, 760, 425, { renk: RENK.a });
    daire(c, g1, 760, 445, 10, { fill: RENK.vurgu, renk: RENK.vurgu });
    yazi(c, g1, 760, 500, 'park', { size: 32, kalin: 700 });
    yazi(c, g1, 60, 480, 'Referans değişirse konum değişir', { size: 28, hiza: 'start', renk: RENK.soluk });
    await goster(g1, 'Konum, cismin referans noktasına göre yeridir; yön ve uzaklıkla söylenir.');
    await c.say('Park, okulun 400 metre güneyindedir.', { speak: 'Park, okulun dört yüz metre güneyindedir.' });
    await c.say('Referans noktası değişince konum değişir; cisim yerinden oynamaz.');
    c.note('<b>Konum:</b> cismin referans noktasına göre bulunduğu yer; yön ve uzaklıkla söylenir.<br>Park, okulun 400 m güneyinde.', 'Konum', 'kuvvet-konum');
    await sil(g1);

    // E2: alınan yol ve yer değiştirme
    const g2 = yeni();
    baslik(g2, 'Yol ile yer değiştirme', 80);
    const sd = sayiDogrusu(c, g2, { x0: 150, x1: 850, y: 330, min: 0, max: 4, adim: 1, size: 28 });
    yazi(c, g2, 850, 180, 'doğu ›', { size: 28, hiza: 'end', renk: RENK.soluk });
    ok(c, g2, sd.x(0), 235, sd.x(4), 235, { renk: RENK.a });
    ok(c, g2, sd.x(4), 285, sd.x(1), 285, { renk: RENK.b });
    yazi(c, g2, 500, 450, 'yol: 4 + 3 = 7 m', { size: 36, kalin: 700 });
    yazi(c, g2, 500, 510, 'yer değiştirme: doğuya 1 m', { size: 36, kalin: 700, renk: RENK.r });
    await goster(g2, 'Doğuya 4, batıya 3 metre: bölümler toplanır, yol 7 metredir.', { speak: 'Doğuya dört, batıya üç metre: bölümler toplanır, yol yedi metredir.' });
    await c.say('Yer değiştirme ilk konumdan son konuma çizilir: doğuya 1 metre.', { speak: 'Yer değiştirme ilk konumdan son konuma çizilir: doğuya bir metre.' });
    await c.say('Başa dönünce yol sıfırlanmaz, yer değiştirme sıfır olur.');
    c.note('<b>Alınan yol:</b> skaler; yörüngeye bağlı; başa dönünce sıfırlanmaz.<br><b>Yer değiştirme:</b> vektörel; ilk ve son konuma bağlı; başa dönünce sıfır.', 'Yol ile yer değiştirme', 'kuvvet-yol-yer');
    await sil(g2);

    // E3: ortalama sürat
    const g3 = yeni();
    baslik(g3, 'Ortalama sürat', 100);
    yazi(c, g3, 500, 220, 'toplam yol ÷ hareket süresi', { size: 40, kalin: 700, renk: RENK.a });
    yazi(c, g3, 500, 330, '510 km ÷ 6 h = 85 km/h', { size: 46, kalin: 700 });
    yazi(c, g3, 500, 450, 'Süratlerin ortalaması değildir', { size: 32, renk: RENK.soluk });
    await goster(g3, 'Ortalama sürat, toplam yolun hareket süresine oranıdır.');
    await c.say('510 kilometre 6 saatte alındıysa ortalama sürat 85 kilometre bölü saattir.', { speak: 'Beş yüz on kilometre altı saatte alındıysa ortalama sürat seksen beş kilometre bölü saattir.' });
    await c.say('Ortalama sürat, süratlerin ortalaması değildir.');
    c.note('<b>Ortalama sürat = alınan toplam yol / hareket süresi</b><br>510 km / 6 h = 85 km/h', 'Ortalama sürat', 'kuvvet-ortalama-surat');
    await sil(g3);

    // E3: anlık sürat
    const g4 = yeni();
    baslik(g4, 'Anı mı, bütün yolu mu?', 100);
    kart(g4, 60, 170, 420, 230, 'Ortalama sürat', ['bütün yolculuk', 'yol ve süreden bulunur'], { renk: RENK.a });
    kart(g4, 520, 170, 420, 230, 'Anlık sürat', ['tek bir an', 'göstergede okunur'], { renk: RENK.b });
    await goster(g4, 'Göstergede o an okunan değere anlık sürat denir.');
    await c.say('Ortalama sürat bütün yolculuğu, anlık sürat tek bir anı anlatır.');
    c.note('<b>Ortalama sürat:</b> bütün yolculuk; toplam yol / hareket süresi.<br><b>Anlık sürat:</b> tek an; göstergede okunur.<br>İkisi de skaler.', 'Ortalama ve anlık sürat', 'kuvvet-anlik-surat');
    await sil(g4);

    // E4: hız ve ortalama hız
    const g5 = yeni();
    baslik(g5, 'Ortalama hız', 100);
    yazi(c, g5, 500, 220, 'toplam yer değiştirme ÷ hareket süresi', { size: 36, kalin: 700, renk: RENK.a });
    yazi(c, g5, 500, 330, 'doğuya 200 m ÷ 25 s = doğuya 8 m/s', { size: 40, kalin: 700 });
    yazi(c, g5, 500, 450, 'Başa dönünce ortalama hız sıfır', { size: 32, renk: RENK.soluk });
    await goster(g5, 'Hız, yer değiştirmenin zamana oranıdır; yönü yer değiştirmenin yönüdür.');
    await c.say('Ortalama hız, toplam yer değiştirmenin hareket süresine oranıdır.');
    await c.say('Başa dönen cismin ortalama hızı sıfırdır.');
    c.note('<b>Ortalama hız = toplam yer değiştirme / hareket süresi</b>; vektörel.<br>doğuya 200 m / 25 s = doğuya 8 m/s', 'Ortalama hız', 'kuvvet-ortalama-hiz');
    await sil(g5);

    // E5: ivme
    const g6 = yeni();
    baslik(g6, 'İvme', 100);
    yazi(c, g6, 500, 215, 'ivme = hız değişimi ÷ zaman', { size: 40, kalin: 700, renk: RENK.a });
    yazi(c, g6, 500, 320, '0’dan 8 m/s’ye, 4 s', { size: 38 });
    yazi(c, g6, 500, 430, '8 ÷ 4 = +2 m/s²', { size: 46, kalin: 700, renk: RENK.r });
    await goster(g6, 'İvme, hız değişiminin zamana oranıdır; birimi m/s²’dir.', { speak: 'İvme, hız değişiminin zamana oranıdır; birimi metre bölü saniyekaredir.' });
    await c.say('Hız 4 saniyede 0’dan 8 m/s’ye çıkarsa ivme +2 m/s²’dir.', { speak: 'Hız dört saniyede sıfırdan sekiz metre bölü saniyeye çıkarsa ivme artı iki metre bölü saniyekaredir.' });
    await c.say('Hız değişmiyorsa ivme yoktur; yavaşlarken ivme hıza zıttır.');
    c.note('<b>İvme = hız değişimi / zaman</b>; sembolü a, birimi m/s².<br>Örnek: hız 4 saniyede 0’dan 8 m/s’ye çıkar: +2 m/s².', 'İvme', 'kuvvet-ivme');
    await sil(g6);

    // E6: aynı yolculuk, dört hesap
    const g7 = yeni();
    baslik(g7, 'Bir yolculuk, dört hesap', 90);
    kart(g7, 60, 160, 420, 230, 'Sürat', ['yol: 140 m', '3,5 m/s'], { renk: RENK.a });
    kart(g7, 520, 160, 420, 230, 'Hız', ['yer değiştirme: 100 m', '2,5 m/s'], { renk: RENK.b });
    yazi(c, g7, 500, 470, 'süre: 40 s', { size: 32, renk: RENK.soluk });
    await goster(g7, 'Sürat yoldan, hız yer değiştirmeden hesaplanır; ikisi farklı çıkabilir.');
    await c.say('Yol 140 metre, yer değiştirme 100 metre, süre 40 saniye.', { speak: 'Yol yüz kırk metre, yer değiştirme yüz metre, süre kırk saniye.' });
    await c.say('Sürat 3,5 metre bölü saniye; hız 2,5 metre bölü saniye.', { speak: 'Sürat üç buçuk metre bölü saniye; hız iki buçuk metre bölü saniye.' });
    c.note('<b>Skaler yoldan, vektörel yer değiştirmeden hesaplanır.</b><br>Örnek: 40 saniyede yol 140 m → 3,5 m/s; yer değiştirme 100 m → 2,5 m/s.', 'Dört hesap', 'kuvvet-dort-hesap');
    await sil(g7);

    // E7: sürat sınırı
    const g8 = yeni();
    baslik(g8, 'Sürat sınırı her an geçerlidir', 100);
    yazi(c, g8, 500, 235, 'sınır: 100 km/h', { size: 46, kalin: 700, renk: RENK.b });
    yazi(c, g8, 500, 335, 'ortalama sürat: 110 km/h', { size: 46, kalin: 700, renk: RENK.a });
    yazi(c, g8, 500, 450, '110 > 100: sınır aşılmıştır', { size: 38, kalin: 700, renk: RENK.r });
    await goster(g8, 'Sürücünün anlık sürati hiçbir an sınırı geçmemelidir.');
    await c.say('Sınır 100 km/h; ortalama sürat 110 km/h.', { speak: 'Sınır yüz kilometre bölü saat; ortalama sürat yüz on kilometre bölü saat.' });
    await c.say('Ortalama sürat sınırın üstündeyse sınır kesinlikle aşılmıştır.');
    c.note('<b>Sürat sınırı her an için geçerlidir;</b> ortalama sürat sınırın üstündeyse sınır kesinlikle aşılmıştır.<br>Ortalama sürat 110 km/h, sınır 100 km/h.', 'Sürat sınırı', 'kuvvet-surat-siniri');
    await sil(g8);

    // E7: yeşil dalga
    const g9 = yeni();
    baslik(g9, 'Yeşil dalga: 10 m/s', 90);
    const yd = sayiDogrusu(c, g9, { x0: 130, x1: 870, y: 300, min: 0, max: 600, adim: 200, sayisiz: true });
    [0, 200, 400, 600].forEach((v) => {
      daire(c, g9, yd.x(v), 300, 16, { fill: RENK.iyi, renk: RENK.iyi });
      yazi(c, g9, yd.x(v), 240, v + ' m', { size: 32, kalin: 700, renk: RENK.a });
      yazi(c, g9, yd.x(v), 375, (v / 10) + ' s', { size: 32, kalin: 700, renk: RENK.b });
    });
    yazi(c, g9, 500, 470, 'Erken varan bekler', { size: 34, renk: RENK.soluk });
    await goster(g9, 'Yeşil dalgada ışıklar, konumlarına ve seçilen sürate göre ayarlanır.');
    await c.say('Işık 2, 200 metrede; araç oraya 20. saniyede varır.', { speak: 'Işık iki, iki yüz metrede; araç oraya yirminci saniyede varır.' });
    await c.say('Daha hızlı giden erken varır ve kırmızıda bekler.');
    c.note('<b>Yeşil dalga, 10 m/s</b><br>Işık 1: 0 m, 0. saniye<br>Işık 2: 200 m, 20. saniye<br>Işık 3: 400 m, 40. saniye<br>Işık 4: 600 m, 60. saniye', 'Varış anları', 'kuvvet-yesil-dalga');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-e8', kicker: 'Konu E · Hareketin temel kavramları', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Hareketin temel kavramları',
      hook: 'Konunun kuralları aklında mı? Önce <b>dokuz kuralı</b> topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun dokuz kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Bir alışveriş merkezinin düz koridorunda B mağazası A mağazasının 20 m doğusunda, C mağazası ise A’nın 50 m doğusundadır. Referans noktası C seçilirse B’nin konumu nedir?',
        options: ['30 m doğu', '70 m batı', '30 m batı'], answer: 2,
        why: ['Uzaklık doğru ama yön yanlış: B, C’den daha batıdadır.', 'Uzaklıklar toplanmış; iki mağaza referans noktasının aynı yanında olduğu için çıkarılır.', 'Evet. 50 − 20 = 30 m; B, C’nin batısında kalır.'], scene: 0,
      },
      {
        q: 'Yeşil dalga kurulan bir bulvarda ışıklar 15 m/s sabit süratle giden araca göre ayarlıdır. İki ışık arası 450 m ise ikinci ışık yeşile döndükten kaç saniye sonra üçüncü ışık yeşile dönmelidir?',
        options: ['30 saniye sonra', '60 saniye sonra', '15 saniye sonra'], answer: 0,
        why: ['Evet. 450 ÷ 15 = 30; araç iki ışık arasını 30 saniyede alır.', 'Bu, aracın birinci ışıktan üçüncü ışığa kadar geçirdiği süredir: 900 ÷ 15. Soru ikinci ışıktan sonrasını soruyor.', '15, aracın süratidir; süre için yol sürate bölünür: 450 ÷ 15.'], scene: 0,
      },
      {
        q: 'Bir tren yolculuğunda ilk 150 km 2 saatte, sonraki 270 km 3 saatte alınıyor. Bütün yolculuktaki ortalama sürat kaç km/h’tir?',
        options: ['82,5 km/h', '84 km/h', '420 km/h'], answer: 1,
        why: ['Bu, 75 ile 90’ın ortasıdır; ortalama sürat süratlerin ortalaması değildir.', 'Evet. Toplam yol 150 + 270 = 420 km, süre 5 saat: 420 ÷ 5 = 84.', 'Bu, toplam yoldur; ortalama sürat için yol süreye bölünür.'], scene: 0,
      },
      {
        q: 'Durgun hâlden bırakılıp artı yönde ilerleyen bir bilyenin hızı 6 saniyede 18 m/s’ye çıkıyor. Bilyenin ivmesi nedir?',
        options: ['+3 m/s²', '+108 m/s²', '+12 m/s²'], answer: 0,
        why: ['Evet. Hız değişimi 18 − 0 = 18 m/s, süre 6 s: 18 ÷ 6 = +3 m/s².', 'Bu, 18 ile 6’nın çarpımıdır; ivme için hız değişimi süreye bölünür.', 'Bu, 18 − 6 işleminin sonucudur; süre hız değişiminden çıkarılmaz, hız değişimi süreye bölünür.'], scene: 0,
      },
      {
        q: 'Hangisinde alınan yolun uzunluğu ile yer değiştirmenin büyüklüğü eşittir?',
        options: ['Tepenin çevresinde bir tur atıp başladığı yere dönen dağcı', 'Düz bir patikada doğuya gidip sonra batıya geri dönen dağcı', 'Düz bir patikada hiç geri dönmeden doğuya ilerleyen dağcı'], answer: 2,
        why: ['Tam turda yol çevre kadardır, yer değiştirme sıfırdır; ikisi eşit değildir.', 'Geri dönünce yol artmaya devam eder, yer değiştirme küçülür; yol daha büyük çıkar.', 'Evet. Doğrusal yolda geri dönmeden gidilirse yol ile yer değiştirmenin büyüklüğü eşittir.'], scene: 0,
      },
      {
        q: 'Bir dron kalkış noktasından kuzeye 60 m uçuyor, sonra güneye 90 m geri geliyor; hepsi 15 s sürüyor. Ortalama hızı nedir?',
        options: ['Kuzeye 2 m/s', 'Güneye 2 m/s', 'Güneye 10 m/s'], answer: 1,
        why: ['Sayı doğru ama yön yanlış: dron kalkış noktasının güneyinde kaldı.', 'Evet. Yer değiştirme güneye 90 − 60 = 30 m; 30 ÷ 15 = 2 m/s.', 'Bu, alınan yolun (150 m) süreye bölümüdür; bu ortalama sürattir.'], scene: 0,
      },
      {
        q: 'Referans noktası kapı olan düz bir depo koridorunda bir robot, kapıdan çıkıp önce kapının 40 m doğusundaki rafa gidiyor, sonra geri dönüp kapının 10 m doğusundaki rafa varıyor; hareket 10 saniye sürüyor. Ortalama sürati ve ortalama hızı nedir?',
        options: ['Sürat 5 m/s; hız doğuya 1 m/s', 'Sürat 7 m/s; hız doğuya 1 m/s', 'Sürat 7 m/s; hız doğuya 5 m/s'], answer: 1,
        why: ['Yol 40 + 10 değil, 40 + 30 = 70 m’dir; geri dönüşteki 30 m yola eklenir.', 'Evet. Yol 40 + 30 = 70 m, yer değiştirme doğuya 10 m: 70 ÷ 10 = 7 m/s, 10 ÷ 10 = 1 m/s.', 'Sürat doğru; ama yer değiştirme 10 m’dir ve 10 ÷ 10 = 1 m/s.'], scene: 0,
      },
      {
        q: 'Hangisi anlık sürate örnektir?',
        options: ['Yürüyüşçünün akıllı saatinde o an 6 km/h yazması', 'Yürüyüşçünün 3 saatte 12 km yol alması', 'Yürüyüşçünün bütün yürüyüş boyunca saatte ortalama 4 km gitmesi'], answer: 0,
        why: ['Evet. Göstergede o an okunan değer, anlık süratin tanımıdır.', '12 ÷ 3 = 4 km/h; yol ve süreden bulunan bu değer bütün yürüyüşü anlatan ortalama sürattir.', 'Ortalama sürat bütün yolculuğu anlatır; tek bir anı değil.'], scene: 0,
      },
      {
        q: 'Sınırı 80 km/h olan bir yolda bir kamyonet 270 km yolu 3 saatte alıyor. Bu iki veriyle sınır için ne söylenebilir?',
        options: ['Bilinemez; ortalama sürat sınırın üstünde olsa bile bir şey söylemez', 'Aşılmamıştır; 270 km ile 3 saat sınırı aşmak için yeterli değildir', 'Aşılmıştır; ortalama sürat 90 km/h olup sınırın üstündedir'], answer: 2,
        why: ['Ortalama her anı göstermez, ama ortalama sınırın üstündeyse sınır kesinlikle aşılmıştır.', '270 ÷ 3 = 90 km/h, sınırdan büyüktür; sınır aşılmıştır.', 'Evet. 270 ÷ 3 = 90 km/h; sürat ortalaması bile sınırın üstündeyse yolun bir yerinde sınır aşılmıştır.'], scene: 0,
      },
      {
        q: 'Batı yönünde giden bir kaykaycının ivmesi de batı yönündedir. Kaykaycı için hangisi doğrudur?',
        options: ['Yavaşlıyor; ivme hareketi azaltan etkiyi gösterir', 'Hızlanıyor; hız ile ivme aynı yönlüdür', 'Hızı değişmiyor; ivme yalnızca yönü gösterir'], answer: 1,
        why: ['Yavaşlarken ivme hıza zıt yönlüdür; burada ikisi aynı yöndedir.', 'Evet. Hızlanırken hız ile ivme aynı yönlüdür.', 'İvme varsa hız değişiyordur; hızı değişmeyen cismin ivmesi yoktur.'], scene: 0,
      },
    ],
    summary: [
      '<b>Konum, referans noktasına göre yön ve uzaklıkla söylenir;</b> yol bölümler toplanarak, yer değiştirme baştan sona çizilerek bulunur.',
      '<b>Sürat yoldan, hız yer değiştirmeden hesaplanır;</b> ortalama sürat bütün yolculuğu, anlık sürat tek bir anı anlatır.',
      '<b>Hız değişiyorsa ivme vardır;</b> sürat sınırı her an için geçerlidir, yeşil dalgada erken varan bekler.',
    ],
    nextLesson: { href: 'f1-oteleme-donme-titresim.html', label: 'Sonraki konu: Hareket türleri ›' },
  });
})();
