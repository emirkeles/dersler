/* A4 — Konu tekrarı: Biyolojinin dönüm noktaları
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.A, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 400)]);

    // Dönüm noktası (A1)
    const g1 = yeni();
    K.yazi(c, g1, 500, 160, 'Dönüm noktası', { size: 46, kalin: 700, renk });
    K.yazi(c, g1, 500, 260, 'yaşamı değiştirir', { size: 32 });
    K.yazi(c, g1, 500, 320, 'sonraki araştırmalara yön verir', { size: 32 });
    K.yazi(c, g1, 500, 420, 'Penisilin: ilk antibiyotik', { size: 28, renk: SOLUK });
    await goster(g1, 'Dönüm noktası, yaşamı değiştiren ve sonraki araştırmalara yön veren buluştur.');
    await c.say('Bir hastalığı tedavi etmese de yeni bir yol açması yeter.');
    c.note('<b>Dönüm noktası: yaşamı değiştiren, araştırmalara yön veren buluş.</b><br>Penisilin, ilk antibiyotik.', 'Dönüm noktası', 'yasam-donum-noktasi');
    await sil(g1);

    // Her buluş belirli bir sorunu çözer (A1)
    const g2 = yeni();
    K.yazi(c, g2, 500, 110, 'Her buluş belirli bir sorunu çözer', { size: 34, kalin: 700 });
    K.kart(c, g2, 110, 190, 360, 200, 'Antibiyotik', ['bakteri kaynaklı', 'hastalık'], { renk });
    K.kart(c, g2, 530, 190, 360, 200, 'Aşı', ['virüsün yol açtığı', 'salgın'], { renk: IKINCI });
    await goster(g2, 'Her buluş belirli bir sorunu çözer; bütün sorunları birden değil.');
    await c.say('Antibiyotik bakteriyi yok eder; virüsün yol açtığı salgını durdurmaz.');
    c.note('<b>Her buluş belirli bir sorunu çözer.</b><br>Antibiyotik bakteriye, aşı salgına karşı.', 'Buluş ve sorun', 'yasam-bulus-ve-sorun');
    await sil(g2);

    // Kalıtım ve DNA (A1)
    const g3 = yeni();
    K.yazi(c, g3, 500, 150, 'Kalıtım', { size: 42, kalin: 700, renk });
    K.yazi(c, g3, 500, 215, 'özellikler nesilden nesile aktarılır', { size: 30 });
    K.yazi(c, g3, 500, 340, 'DNA', { size: 42, kalin: 700, renk: IKINCI });
    K.yazi(c, g3, 500, 405, 'kalıtsal bilgiyi taşır: çift sarmal', { size: 30 });
    await goster(g3, 'Kalıtım, özelliklerin nesilden nesile aktarılmasıdır.');
    await c.say('Kalıtsal bilgiyi, çift sarmal yapıdaki DNA taşır.', { speak: 'Kalıtsal bilgiyi, çift sarmal yapıdaki de ne a taşır.' });
    c.note('<b>Kalıtım: özelliklerin nesilden nesile aktarılması.</b><br>Bilgi DNA’da, çift sarmalda saklanır.', 'Kalıtım ve DNA', 'yasam-kalitim-ve-dna');
    await sil(g3);

    // DNA ile çalışan beş buluş (A1)
    const g4 = c.S('g', {}, svg);
    const satir = (i, ad, is, r) => {
      const g = c.S('g', {}, g4), y = 110 + i * 88;
      g.style.opacity = 0;
      K.yazi(c, g, 110, y, ad, { size: 30, kalin: 700, hiza: 'start', renk: r });
      K.ok(c, g, 480, y - 10, 560, y - 10, r);
      K.yazi(c, g, 590, y, is, { size: 30, hiza: 'start' });
      return g;
    };
    const ilk = [satir(0, 'PZR', 'çoğaltır', renk), satir(1, 'Rekombinant DNA', 'başka canlıya aktarır', renk), satir(2, 'Klonlama', 'canlıyı kopyalar', renk)];
    const son = [satir(3, 'İnsan Genom Projesi', 'diziyi ortaya çıkarır', IKINCI), satir(4, 'CRISPR-Cas', 'gen bölgesini düzenler', IKINCI)];
    const hepsi = (els) => c.tween(400, (e) => els.forEach((el) => { el.style.opacity = e; }));
    await Promise.all([c.say('PZR bir DNA dizisini çoğaltır, rekombinant DNA teknolojisi başka canlıya aktarır.',
      { speak: 'Pe ze re bir de ne a dizisini çoğaltır, rekombinant de ne a teknolojisi başka canlıya aktarır.' }), hepsi(ilk)]);
    await c.say('Klonlama bir diziyi değil, canlının kendisini kopyalar.');
    await Promise.all([c.say('İnsan Genom Projesi diziyi ortaya çıkarır, CRISPR-Cas gen bölgesini düzenler.',
      { speak: 'İnsan Genom Projesi diziyi ortaya çıkarır, Krispır Kas gen bölgesini düzenler.' }), hepsi(son)]);
    c.note('<b>PZR çoğaltır, rekombinant DNA aktarır, klonlama kopyalar.</b><br>Genom projesi diziyi okur, CRISPR-Cas düzenler.', 'DNA teknikleri', 'yasam-dna-teknikleri');
    await sil(g4);

    // Üç sütunlu tablo (A2)
    const g5 = yeni();
    [['Ne Biliyorum?', 'bildiklerin', renk], ['Ne Bilmek İstiyorum?', 'bilmediğin: soru', renk], ['Ne Öğrendim?', 'cevap ve çıkarım', IKINCI]].forEach(([ad, ic, r], i) => {
      const x = 30 + i * 320;
      K.kutu(c, g5, x, 130, 300, 260);
      K.yazi(c, g5, x + 150, 180, ad, { size: 26, renk: r });
      K.cizgi(c, g5, x + 20, 204, x + 280, 204, '#5b678f');
      K.yazi(c, g5, x + 150, 290, ic, { size: 28 });
    });
    await goster(g5, 'Araştırma, bildiklerini yazıp bilmediğini soruya çevirmekle başlar.');
    await c.say('Son sütuna, bulduğun cevabı ve vardığın çıkarımı yazarsın.');
    c.note('<b>Bildiklerini yaz, bilmediğini soruya çevir.</b><br>Önce soru, sonra kaynak, en son cevap.', 'Araştırma sorusu', 'yasam-arastirma-sorusu');
    await sil(g5);

    // Kaynağı üç soruyla sına (A2)
    const g6 = yeni();
    K.yazi(c, g6, 500, 90, 'Kaynağı üç soruyla sına', { size: 34, kalin: 700 });
    K.kart(c, g6, 30, 150, 300, 210, 'Kim denetledi?', ['hakem, editör,', 'uzman'], { renk });
    K.kart(c, g6, 350, 150, 300, 210, 'Nerede?', ['bilimsel makale,', '.edu, .gov'], { renk });
    K.kart(c, g6, 670, 150, 300, 210, 'Ne zaman?', ['güncel mi?'], { renk });
    K.yazi(c, g6, 500, 450, 'Beğeni sayısı ölçüt değil', { size: 28, renk: IKINCI });
    await goster(g6, 'Bir kaynağı üç soruyla sınarsın: kim denetledi, nerede yayımlandı, ne zaman?');
    await c.say('Beğeni ve paylaşım sayısı bir güvenilirlik ölçütü değildir.');
    c.note('<b>Kaynağı sına: kim denetledi, nerede yayımlandı, ne zaman?</b><br>Hakem, uzman, .edu/.gov, güncellik.', 'Kaynak güvenilir mi?', 'yasam-kaynak-guvenilir-mi');
    await sil(g6);

    // Bilgi ve çıkarım (A3)
    const g7 = yeni();
    K.yazi(c, g7, 250, 150, 'Bilgi', { size: 40, kalin: 700, renk });
    K.yazi(c, g7, 250, 215, 'kaynakta yazar', { size: 28 });
    K.ok(c, g7, 420, 140, 570, 140, SOLUK);
    K.yazi(c, g7, 750, 150, 'Çıkarım', { size: 40, kalin: 700, renk: IKINCI });
    K.yazi(c, g7, 750, 215, 'bilgileri yorumlayarak', { size: 28 });
    K.yazi(c, g7, 750, 255, 'sen yaparsın', { size: 28 });
    K.yazi(c, g7, 500, 380, 'Bilgiden fazlasını söylemez', { size: 34, kalin: 700, renk: YESIL });
    K.yazi(c, g7, 500, 450, '“bütün”, “yalnızca”: dikkat', { size: 28, renk: SOLUK });
    await goster(g7, 'Bilgi kaynakta yazar; çıkarımı, bilgileri yorumlayarak sen yaparsın.');
    await c.say('Sağlam çıkarım, bilgilerin söylediğinden fazlasını söylemez.');
    await c.say('“Bütün” ya da “yalnızca” diyen çıkarım, çoğu zaman bilgiyi aşar.');
    c.note('<b>Çıkarım: bilgileri yorumlayarak varılan sonuç.</b><br>Bilgilerin söylediğinden fazlasını söylemez.', 'Çıkarım', 'yasam-cikarim');
    await c.say('Şimdi üç dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'yasam-a4', kicker: 'Konu A · Biyolojinin dönüm noktaları', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Biyolojinin dönüm noktaları',
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
        q: 'Bir hastanın boğaz enfeksiyonuna bir bakterinin yol açtığı anlaşıldı. Hangi buluş bu sorunu doğrudan çözer?',
        options: ['Antibiyotik', 'İnsan Genom Projesi', 'Klonlama'], answer: 0,
        why: ['Antibiyotikler bakteri kaynaklı hastalıkları tedavi eder.', 'Proje insan DNA’sının dizisini ortaya çıkardı; bakteriyi yok etmez.', 'Klonlama bir canlının kopyasını üretir; hastalığı tedavi etmez.'], scene: 0,
      },
      {
        q: 'Bilgi: “PZR ile tek bir DNA dizisinden milyonlarca kopya elde edilir.” Hangi çıkarım bu bilgiyi aşar?',
        options: ['Az miktarda DNA ile de araştırma yapılabilir.', 'PZR genetik araştırmaları kolaylaştırmış olabilir.', 'PZR bütün genetik hastalıkları ortadan kaldırdı.'], answer: 2,
        why: ['Çoğaltma, az DNA’yı incelenebilir kılar; bilgiye dayanır.', 'Çok kopya incelemeyi kolaylaştırır; “olabilir” diyerek bilgiyi aşmıyor.', 'Bilgi çoğaltmadan söz ediyor; “bütün hastalıkları” demek bilgiyi aşar.'], scene: 0,
      },
      {
        q: 'Üç sütunlu tabloda “Mendel hangi bitkiyle çalıştı?” cümlesi hangi sütuna yazılır?',
        options: ['Ne Biliyorum?', 'Ne Bilmek İstiyorum?', 'Ne Öğrendim?'], answer: 1,
        why: ['Bu sütuna soru değil, bildiklerin yazılır.', 'Bilmediğin şey soruya çevrilip bu sütuna yazılır.', 'Bu sütuna soru değil, cevap ve çıkarım yazılır.'], scene: 0,
      },
      {
        q: 'Hangisi DNA’yı değiştirmez, yalnızca dizisini ortaya çıkarır?',
        options: ['CRISPR-Cas', 'Rekombinant DNA teknolojisi', 'İnsan Genom Projesi'], answer: 2,
        why: ['CRISPR-Cas istenen gen bölgesini düzenler, yani değiştirir.', 'Bu teknoloji genetik materyali başka bir canlıya aktarır.', 'Proje insan DNA’sının dizisini baştan sona ortaya çıkardı.'], scene: 0,
      },
      {
        q: 'Bir site “Uzmanlar onayladı.” diyor; ama hangi uzmanın incelediği de yazının tarihi de yazmıyor. Bu kaynak için ne söylenir?',
        options: ['Sınanamıyor; denetleyen ve tarih belli değil.', 'Güvenilirdir; “uzmanlar onayladı” yazması yeter.', 'Günceldir; internette yayımlanmış.'], answer: 0,
        why: ['Kimin denetlediği ve ne zaman yayımlandığı görülemiyor.', 'Denetleyenin kim olduğu belli olmalı; sitenin kendi sözü yetmez.', 'İnternette olmak güncel olduğunu göstermez; tarihe bakılır.'], scene: 0,
      },
      {
        q: 'Bilgi: “Akşemseddin, penisilinden yüzyıllar önce hastalıkların mikroorganizmalarla bulaşabileceğini ileri sürdü.” Hangisi bu bilgiye dayanan sağlam bir çıkarımdır?',
        options: ['Akşemseddin, hastalıkların mikroorganizmalarla bulaşabileceğini ileri sürdü.', 'Hastalıkların nedeni, antibiyotikten çok önce de araştırılıyordu.', 'Akşemseddin bütün hastalıkların tedavisini buldu.'], answer: 1,
        why: ['Bu bir çıkarım değil, bilginin kendisidir.', 'Kaynakta yazmıyor; ama bilgiye dayanıyor ve onu aşmıyor.', 'Bilgi bulaşmadan söz ediyor; “bütün hastalıkların tedavisi” bilgiyi aşar.'], scene: 0,
      },
      {
        q: 'Mendel kalıtımı açıkladığında hangisi henüz bilinmiyordu?',
        options: ['Yavruların ebeveynlerine benzediği', 'Özelliklerin belirli kalıplarla aktarıldığı', 'Aktarılan bilginin hücrede nasıl saklandığı'], answer: 2,
        why: ['Bu benzerlik zaten görülüyordu; Mendel nasıl aktarıldığını araştırdı.', 'Bunu Mendel’in kendisi gösterdi.', 'Bu, DNA’nın çift sarmal yapısı bulununca ortaya çıktı.'], scene: 0,
      },
      {
        q: 'Çelişen iki kaynaktan güvenilir olanı seçtin ve sorunun cevabını buldun. Tabloda sıradaki iş hangisidir?',
        options: ['Cevabı kaynağıyla birlikte üçüncü sütuna yazmak', 'İkinci sütundaki soruyu silmek', 'Cevabı ilk sütuna, bildiklerinin yanına yazmak'], answer: 0,
        why: ['Önce soru, sonra kaynak, en son cevap: cevap kaynağıyla not edilir.', 'Soru yerinde kalır; cevabın neyi yanıtladığını gösterir.', 'İlk sütun araştırmanın başında bildiklerindir; öğrenilen üçüncü sütuna yazılır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Her dönüm noktası ya bir sorunu çözer ya yeni bir yol açar.</b>',
      '<b>Önce soru, sonra kaynak, en son cevap.</b> Kaynağı sına: kim denetledi, nerede yayımlandı, ne zaman?',
      '<b>Çıkarım bilgiye dayanır;</b> bilgiden fazlasını söylemez.',
    ],
    nextLesson: { href: 'b1-arastirilabilir-soru.html', label: 'Sonraki konu: Bilimsel araştırma ve bilimin doğası ›' },
  });
})();
