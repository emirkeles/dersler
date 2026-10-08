/* B4 — Konu tekrarı: Bilimsel araştırma ve bilimin doğası
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.B, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 400)]);
    const ekle = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 350)]);

    // Araştırılabilir soru (B1)
    const g1 = yeni();
    K.yazi(c, g1, 500, 100, 'Araştırılabilir soru', { size: 46, kalin: 700, renk });
    K.yazi(c, g1, 500, 170, 'gözlem ya da deneyle cevaplanır', { size: 30 });
    K.kart(c, g1, 70, 230, 400, 200, 'Araştırılabilir', ['Göz desenleri', 'avlanmayı etkiler mi?'], { renk: YESIL });
    K.kart(c, g1, 530, 230, 400, 200, 'Araştırılamaz', ['En güzel güve', 'hangisi?'], { renk: IKINCI });
    await goster(g1, 'Araştırılabilir soru, gözlem ya da deneyle cevaplanabilen sorudur.');
    await c.say('“En güzel güve hangisi?” sorusunun cevabı kişiden kişiye değişir.');
    c.note('<b>Araştırılabilir soru gözlem ya da deneyle cevaplanır.</b><br>Göz desenleri avlanmayı etkiler mi?', 'Araştırılabilir soru', 'yasam-arastirilabilir-soru');
    await sil(g1);

    // Hipotez (B1)
    const g2 = yeni();
    K.yazi(c, g2, 500, 100, 'Hipotez', { size: 46, kalin: 700, renk });
    K.yazi(c, g2, 500, 165, 'sınanabilir açıklama önerisi', { size: 32 });
    K.kart(c, g2, 70, 225, 400, 210, 'Soru', ['Göz desenleri var mı?', 'hipotez değil'], { renk: IKINCI });
    K.kart(c, g2, 530, 225, 400, 210, 'Açıklama', ['Göz desenleri avcıları', 'uzaklaştırır.'], { renk: YESIL });
    await goster(g2, 'Hipotez, bir olayın nedenini açıklayan sınanabilir bir öneridir.');
    await c.say('Soru cümlesi hipotez olamaz; hipotez bir açıklama önerir.');
    await c.say('Hipotez henüz doğrulanmış değildir; sınanması gerekir.');
    c.note('<b>Hipotez: sınanabilir açıklama önerisi.</b><br>Göz desenleri avcıları uzaklaştırır.', 'Hipotez', 'yasam-hipotez');
    await sil(g2);

    // Tahmin (B2)
    const g3 = yeni();
    K.yazi(c, g3, 250, 150, 'Hipotez', { size: 40, kalin: 700, renk });
    K.yazi(c, g3, 250, 215, 'desen avcıları', { size: 28 });
    K.yazi(c, g3, 250, 255, 'uzaklaştırır', { size: 28 });
    K.ok(c, g3, 420, 140, 570, 140, SOLUK);
    K.yazi(c, g3, 750, 150, 'Tahmin', { size: 40, kalin: 700, renk: IKINCI });
    K.yazi(c, g3, 750, 215, 'desenli güveyi', { size: 28 });
    K.yazi(c, g3, 750, 255, 'kuşlar yemekten kaçınır', { size: 28 });
    const alt3 = K.yazi(c, g3, 500, 400, 'Sınamadan önce çıkarılır', { size: 34, kalin: 700, renk: YESIL });
    alt3.style.opacity = 0;
    await goster(g3, 'Tahmin, hipotezden akıl yürütmeyle çıkarılan sonuçtur.');
    await ekle(alt3, 'Sınamadan önce çıkarılır ve neye bakılacağını belirler.');
    c.note('<b>Tahmin: hipotezden çıkarılan, sınanacak sonuç.</b><br>Desen varsa kuşlar güveyi yemekten kaçınır.', 'Tahmin', 'yasam-tahmin');
    await sil(g3);

    // Değişkenler (B2)
    const g4 = yeni();
    K.kart(c, g4, 110, 110, 360, 220, 'Bağımsız değişken', ['araştırmacı', 'değiştirir'], { renk });
    K.kart(c, g4, 530, 110, 360, 220, 'Bağımlı değişken', ['ona bağlı', 'değişir'], { renk: IKINCI });
    K.yazi(c, g4, 500, 440, 'Göz deseni → kalan güve sayısı', { size: 30, renk: SOLUK });
    await goster(g4, 'Araştırmacının değiştirdiği değişkene bağımsız değişken denir.');
    await c.say('Ona bağlı olarak değişen değişkene bağımlı değişken denir.');
    c.note('<b>Bağımsız değişken değiştirilir; bağımlı değişken ona bağlı değişir.</b><br>Göz deseni → kalan güve sayısı', 'Değişkenler', 'yasam-degiskenler');
    await sil(g4);

    // Analiz ve sonuç (B2)
    const g5 = yeni();
    K.yazi(c, g5, 500, 95, 'Analiz ve sonuç', { size: 42, kalin: 700, renk });
    K.yazi(c, g5, 500, 160, 'veriler yorumlanır', { size: 30 });
    K.kart(c, g5, 30, 220, 300, 190, 'Destekliyorsa', ['raporla,', 'duyur'], { renk: YESIL });
    K.kart(c, g5, 350, 220, 300, 190, 'Çelişiyorsa', ['hipotezi', 'gözden geçir'], { renk: IKINCI });
    K.kart(c, g5, 670, 220, 300, 190, 'Yetersizse', ['yeni veri', 'topla'], { renk });
    await goster(g5, 'Veriler hipotezi destekliyorsa sonuçlar raporlanır ve duyurulur.');
    await c.say('Veriler çelişirse hipotez gözden geçirilir, yetersizse yeni veri toplanır.');
    c.note('<b>Veri destekliyorsa duyur, çelişiyorsa hipotezi gözden geçir.</b><br>Yetersizse yeni veri topla.', 'Analiz ve sonuç', 'yasam-analiz-ve-sonuc');
    await sil(g5);

    // Bilimsel bilgi: değişebilir, gözlem ve çıkarıma dayanır, bakış açısı etkiler (B3)
    const g6 = c.S('g', {}, svg);
    const t6 = K.yazi(c, g6, 500, 100, 'Bilimsel bilgi', { size: 46, kalin: 700, renk });
    const l6 = [
      K.yazi(c, g6, 500, 210, 'yeni bulgularla değişebilir', { size: 32, renk }),
      K.yazi(c, g6, 500, 300, 'gözlem ve çıkarıma dayanır', { size: 32, renk: IKINCI }),
      K.yazi(c, g6, 500, 390, 'yorumu bakış açısı etkileyebilir', { size: 32, renk: YESIL }),
    ];
    t6.style.opacity = 0; l6.forEach((el) => { el.style.opacity = 0; });
    await Promise.all([c.say('Bilimsel bilgi kesin ve değişmez değildir; yeni bulgularla değişebilir.'), K.belir(c, t6, 350).then(() => K.belir(c, l6[0], 350))]);
    await ekle(l6[1], 'Gözlem veriyi verir; çıkarım, o verinin yorumlanmasıdır.');
    await ekle(l6[2], 'Bilim insanının bakış açısı, yorumunu etkileyebilir.');
    c.note('<b>Bilimsel bilgi yeni bulgularla değişebilir.</b><br>Gözlem ve çıkarıma dayanır; yorumu bakış açısı etkiler.', 'Bilimsel bilgi', 'yasam-bilimsel-bilgi');
    await sil(g6);

    // Kanun ve teori (B3)
    const g7 = yeni();
    K.yazi(c, g7, 500, 85, 'Kanun ve teori', { size: 40, kalin: 700, renk });
    K.kart(c, g7, 110, 130, 360, 210, 'Kanun', ['olay nasıl', 'gerçekleşir?'], { renk: YESIL });
    K.kart(c, g7, 530, 130, 360, 210, 'Teori', ['olay neden', 'gerçekleşir?'], { renk: IKINCI });
    const alt7 = K.yazi(c, g7, 500, 430, 'Biri ötekine dönüşmez', { size: 34, kalin: 700, renk });
    alt7.style.opacity = 0;
    await goster(g7, 'Kanun, doğal bir olayın nasıl gerçekleştiğini söyler.');
    await c.say('Teori kanunları açıklar; olayın neden gerçekleştiğine cevap arar.');
    await ekle(alt7, 'Teori ile kanun arasında üstünlük sırası yoktur; biri ötekine dönüşmez.');
    c.note('<b>Kanun “nasıl”ı söyler, teori “neden”i açıklar.</b><br>Biri zamanla ötekine dönüşmez.', 'Kanun ve teori', 'yasam-kanun-ve-teori');
    await c.say('Şimdi üç dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'yasam-b4', kicker: 'Konu B · Bilimsel araştırma ve bilimin doğası', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Bilimsel araştırma ve bilimin doğası',
      hook: 'Üç dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Üç dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: '“Sivrisinekler ışığa doğru uçar.” hipotezine dayalı tahmin hangisidir?',
        options: ['Işıklı kutuda daha çok sivrisinek toplanır.', 'Sivrisinekler neden ışığa doğru uçar?', 'Akşamları lambanın çevresinde sivrisinekler görülüyor.'], answer: 0,
        why: ['Tahmin, hipotez doğruysa sınamada görülmesi beklenen sonuçtur.', 'Bu, problemi belirleyen sorudur.', 'Bu bir gözlemdir; hipotezden çıkarılmış bir sonuç değildir.'], scene: 0,
      },
      {
        q: 'Bir araştırmacı ormanda çamları sayıyor: kuzey yamaçta 120, güney yamaçta 45 çam buluyor. Hangisi çıkarımdır?',
        options: ['Kuzey yamaçta 120 çam var.', 'Güney yamaçta 45 çam var.', 'Kuzey yamaç çamlara daha uygun olabilir.'], answer: 2,
        why: ['Sayım bir gözlemdir; bu veridir.', 'Bu da sayımdan elde edilen veridir.', 'Sayılardan yorum yapılarak varılan sonuç çıkarımdır.'], scene: 0,
      },
      {
        q: 'Bir öğrenci kedileri izlerken üç soru yazdı. Hangisi araştırılabilir sorudur?',
        options: ['Hangi kedi cinsi en sevimlidir?', 'Parlak ışıkta kedilerin gözbebeği küçülür mü?', 'Kediler mi köpekler mi daha iyi bir dosttur?'], answer: 1,
        why: ['“Sevimli” kişiye göre değişir; ölçülemez.', 'Gözbebeği ışıklı ve ışıksız ortamda ölçülüp karşılaştırılabilir.', '“Daha iyi dost” kişiye göre değişir; gözlem ya da deneyle cevaplanamaz.'], scene: 0,
      },
      {
        q: 'Bir öğrenci hipotezini sınadı ama yalnızca üç ölçüm yaptığı için verileri yeterli bulmadı. Ne yapmalıdır?',
        options: ['Yeni gözlem ya da deneyle yeni veri toplamalıdır.', 'Hipotezi desteklenmiş sayıp sonucu duyurmalıdır.', 'Verileri hipoteze uygun hâle getirmelidir.'], answer: 0,
        why: ['Veriler yeterli değilse yeni gözlem ya da deneylerle yeni veri toplanır.', 'Yetersiz veri hipotezi desteklemek için yetmez.', 'Veri olduğu gibi kaydedilir; hipoteze uydurulmaz.'], scene: 0,
      },
      {
        q: 'Bir defterde iki not var: “Isıtılan gaz genleşir.” ve “Gaz tanecikleri hızlanır; gaz bu yüzden genleşir.” Bu iki not için hangisi doğrudur?',
        options: ['Birincisi teori, ikincisi kanun gibidir.', 'Birincisi kanun gibi, ikincisi teori gibidir.', 'İkisi de aynıdır; teori zamanla kanuna dönüşür.'], answer: 1,
        why: ['Olayın nasıl gerçekleştiğini söyleyen kanun gibidir; birincisi bunu yapıyor.', 'Birincisi olayın nasıl olduğunu, ikincisi neden olduğunu söylüyor.', 'Teori ve kanun birbirine dönüşmez; ikisi farklı sorulara cevap verir.'], scene: 0,
      },
      {
        q: 'Bir öğrenci “Kırmızı yemişler kuşları çeker.” hipotezini sınamak istiyor. Hangi düzen hipotezi sınamaya uygundur?',
        options: ['Ortama yalnızca kırmızı yemiş koyup kuşları izlemek', 'Kuşlara en sevdikleri rengi sormak', 'Aynı ortama eşit sayıda kırmızı ve yeşil yemiş koymak'], answer: 2,
        why: ['Karşılaştıracak başka yemiş olmadığı için kırmızının çekiciliği anlaşılamaz.', 'Kuşlara sorulamaz; hipotez gözlem ya da deneyle sınanır.', 'Eşit sayıda yemişle kuşların hangisine gittiği sayılıp karşılaştırılabilir.'], scene: 0,
      },
      {
        q: 'Bir öğrenci akvaryum suyunun sıcaklığının balıkların yüzme hızını etkileyip etkilemediğini sınıyor. Sıcaklığı değiştirip hızı ölçüyor. Bağımlı değişken hangisidir?',
        options: ['Suyun sıcaklığı', 'Balıkların yüzme hızı', 'Akvaryumun büyüklüğü'], answer: 1,
        why: ['Sıcaklığı öğrenci değiştiriyor; bu bağımsız değişkendir.', 'Hız, sıcaklığa bağlı olarak değişir; öğrenci onu ölçüyor.', 'Akvaryumun büyüklüğü deneyde değiştirilmiyor.'], scene: 0,
      },
      {
        q: 'Bir araştırmacı, bilinen bir bulguyu yeni bir bakış açısıyla yeniden değerlendirdi. Bu durum bilimin doğasının hangi özelliğine örnektir?',
        options: ['Özgünlük', 'Tek bir yöntem olmaması', 'Kanunla teorinin aynı olması'], answer: 0,
        why: ['Bilineni yeni bir bakış açısıyla değerlendirmek de özgünlüktür.', 'Burada yöntem değil, bilginin yeni bir açıdan ele alınması anlatılıyor.', 'Kanun ve teori ayrıdır; bu olayda ikisi de yok.'], scene: 0,
      },
    ],
    summary: [
      '<b>Sınanabilen soru, araştırmanın başıdır.</b> Gözlem → problem → araştırılabilir soru → hipotez → sınama.',
      '<b>Yol değişir, basamaklar tanınır.</b> Gözlem → problem → veri → hipotez → tahmin → deney → analiz ve sonuç.',
      '<b>Bilimsel bilgi kanıta dayanır, yeni kanıtla değişebilir.</b>',
    ],
    nextLesson: { href: 'c1-etige-uygun-mu.html', label: 'Sonraki konu: Bilim etiği ›' },
  });
})();
