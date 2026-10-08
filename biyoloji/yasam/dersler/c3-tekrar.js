/* C3 — Konu tekrarı: Bilim etiği
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.C, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 400)]);

    // Bilim etiği ve sonuç (C1)
    const g1 = yeni();
    K.yazi(c, g1, 500, 150, 'Bilim etiği', { size: 46, kalin: 700, renk });
    K.yazi(c, g1, 500, 235, 'araştırmada uyulan etik kurallar', { size: 32 });
    K.yazi(c, g1, 500, 330, 'Sonuç kadar yol da sorgulanır', { size: 32, kalin: 700, renk: IKINCI });
    K.yazi(c, g1, 500, 430, 'İyi sonuç yöntemi haklı çıkarmaz', { size: 28, renk: SOLUK });
    await goster(g1, 'Bilim etiği, araştırmada uyulması gereken etik kuralların tümüdür.');
    await c.say('İyi sonuç, yöntemi kendiliğinden haklı çıkarmaz; yol da sorgulanır.');
    c.note('<b>Bilim etiği: araştırmada uyulan etik kurallar.</b><br>İyi sonuç, yöntemi kendiliğinden haklı çıkarmaz.', 'Bilim etiği', 'yasam-bilim-etigi');
    await sil(g1);

    // Kaynak ve katkı (C1)
    const g2 = yeni();
    K.yazi(c, g2, 500, 100, 'Kaynak ve katkı', { size: 34, kalin: 700 });
    K.kart(c, g2, 110, 170, 360, 200, 'Kaynak', ['her bilginin', 'kaynağı gösterilir'], { renk });
    K.kart(c, g2, 530, 170, 360, 200, 'Katkı', ['yalnızca çalışanın', 'adı yazılır'], { renk: IKINCI });
    await goster(g2, 'Başka kaynaktan alınan her bilginin kaynağı gösterilir.');
    await c.say('Rapora da yalnızca çalışmaya katkısı olanların adı yazılır.');
    c.note('<b>Kaynak gösterilir; yalnızca katkısı olanın adı yazılır.</b><br>Kaynakçasız rapor, görev almayan üye: kurala aykırı.', 'Kaynak ve katkı', 'yasam-kaynak-ve-katki');
    await sil(g2);

    // Veri kuralları (C1)
    const g3 = yeni();
    K.yazi(c, g3, 500, 140, 'Veri', { size: 44, kalin: 700, renk });
    K.yazi(c, g3, 500, 235, 'doğru ve güvenilir; değiştirilmez', { size: 30 });
    K.yazi(c, g3, 500, 305, 'sonucu desteklemese de gizlenmez', { size: 30 });
    K.yazi(c, g3, 500, 375, 'başkasının verisi: kaynakla', { size: 30 });
    await goster(g3, 'Veri doğru ve güvenilir olmalı; istenen sonuca göre değiştirilmez.');
    await c.say('Sonucu desteklemeyen veri de raporda yer alır.');
    await c.say('Başkasının verisi ancak kaynağı gösterilerek kullanılır.');
    c.note('<b>Veri değiştirilmez, gizlenmez; başkasının verisi kaynakla kullanılır.</b><br>Aynı fotoğraf, zıt anket: sorgula.', 'Veri kuralları', 'yasam-veri-kurallari');
    await sil(g3);

    // Gönüllü onam (C1)
    const g4 = yeni();
    K.yazi(c, g4, 500, 120, 'Gönüllü onam', { size: 44, kalin: 700, renk });
    K.yazi(c, g4, 500, 195, 'kişi kendi isteğiyle onay verir', { size: 30 });
    K.yazi(c, g4, 250, 330, 'Bireyin hakları', { size: 32, kalin: 700, renk: IKINCI });
    K.yazi(c, g4, 500, 330, '↔', { size: 44, renk: SOLUK });
    K.yazi(c, g4, 750, 330, 'Toplumun yararı', { size: 32, kalin: 700, renk: YESIL });
    K.yazi(c, g4, 500, 430, 'birlikte tartılır', { size: 28, renk: SOLUK });
    await goster(g4, 'Katılımcı araştırmaya kendi isteğiyle onay verir; buna gönüllü onam denir.');
    await c.say('Bireyin hakları ile toplumun yararı, karar verirken birlikte tartılır.');
    c.note('<b>Gönüllü onam: kişi kendi isteğiyle onay verir.</b><br>Bireyin hakları ↔ toplumun yararı', 'Gönüllü onam', 'yasam-gonullu-onam');
    await sil(g4);

    // Araç seç (C2)
    const g5 = yeni();
    K.yazi(c, g5, 500, 90, 'Bilgiye göre araç', { size: 34, kalin: 700 });
    K.kart(c, g5, 30, 150, 300, 210, 'Raporu oku', ['kaynakça var mı?', 'iş bölümü?'], { renk });
    K.kart(c, g5, 350, 150, 300, 210, 'Karşılaştır', ['aynı fotoğraf?', 'zıt sonuç?'], { renk });
    K.kart(c, g5, 670, 150, 300, 210, 'Soru sor', ['kim hangi', 'işi yaptı?'], { renk });
    await goster(g5, 'Üç araç var: raporu okumak, karşılaştırmak, soru sormak.');
    await c.say('Hangi aracı kullanacağını, aradığın bilgi belirler.');
    c.note('<b>Araç, aranan bilgiye göre seçilir.</b><br>Raporu oku · karşılaştır · soru sor', 'Araç seçimi', 'yasam-arac-secimi');
    await sil(g5);

    // Doğrula ve kaydet (C2)
    const g6 = yeni();
    K.yazi(c, g6, 500, 95, 'Önce doğrula, sonra kaydet', { size: 34, kalin: 700 });
    K.kart(c, g6, 50, 170, 400, 200, 'Doğrula', ['farklı, güvenilir', 'kaynakla karşılaştır'], { renk });
    K.ok(c, g6, 465, 270, 535, 270, SOLUK);
    K.kart(c, g6, 550, 170, 400, 200, 'Kaydet', ['bulgu + kaynağı', 'emin değilsen belirt'], { renk: IKINCI });
    await goster(g6, 'Bir bilgiyi doğrulamak, farklı ve güvenilir bir kaynakla karşılaştırmaktır.');
    await c.say('Kayıtta bulgunun yanına kaynağı da yazılır.');
    await c.say('Emin olunamayan bilgi, emin olunmadığı belirtilerek yazılır.');
    c.note('<b>Doğrula, sonra kaydet: bulgu + bilginin kaynağı.</b><br>Emin olmadığını da yaz: “çeken belirsiz”.', 'Doğrula ve kaydet', 'yasam-dogrula-ve-kaydet');
    await c.say('Şimdi iki dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'yasam-c3', kicker: 'Konu C · Bilim etiği', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Bilim etiği',
      hook: 'İki dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'İki dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Bir öğrenci, çiçeklerin neden renk değiştirdiğini anlatan bir yazıdan üç cümleyi raporuna olduğu gibi koydu ve yazının adını hiçbir yerde belirtmedi. Hangi kurala uymamıştır?',
        options: ['Alınan her bilginin kaynağı gösterilir.', 'Rapora yalnızca katkısı olanın adı yazılır.', 'Kişi araştırmaya kendi isteğiyle onay verir.'], answer: 0,
        why: ['Başka kaynaktan alınan her bilginin kaynağı gösterilir; burada gösterilmemiş.', 'Katkı kuralı, rapora kimin adının yazılacağıyla ilgilidir.', 'Onay kuralı, araştırmaya katılan kişiyle ilgilidir.'], scene: 0,
      },
      {
        q: 'Bir raporda “Ölçümleri üç kişi birlikte yaptı.” yazıyor. Bu bilgiyi doğrulamak için hangisi uygundur?',
        options: ['Raporun giriş bölümünü bir daha okumak', 'Aynı öğrencinin yazdığı ikinci taslağa bakmak', 'Laboratuvarın giriş çıkış kayıt defterine bakmak'], answer: 2,
        why: ['Aynı rapor aynı şeyi söyler; farklı bir kaynak gerekir.', 'İkinci taslağı da aynı öğrenci yazdı; bu farklı bir kaynak değildir.', 'Rapordan ayrı ve güvenilir bir kayıt, bilgiyi sınar.'], scene: 0,
      },
      {
        q: 'Bir öğrenci, okul servis şoförlerine uyku düzenini soran bir anket uygulamak istiyor. Şoförlerden biri katılmak istemiyor. Bilim etiğine uygun olan hangisidir?',
        options: ['Anket yararlı olduğu için onu yine de katmak', 'Onay vermeyen kişiyi ankete katmamak', 'Cevapları kendisi tahmin edip forma yazmak'], answer: 1,
        why: ['Katılım, kişinin kendi isteğiyle verdiği onaya dayanır; yarar bunu ortadan kaldırmaz.', 'Gönüllü onam: kişi kendi isteğiyle onay verir; vermeyen araştırmaya katılmaz.', 'Tahminle yazılan cevap veri olamaz; veri doğru ve güvenilir olmalıdır.'], scene: 0,
      },
      {
        q: 'Bir araştırmacı, öğrencilerin dikkatini artıran bir yöntem buldu; ama bu sonuca ulaşmak için ölçümlerini değiştirmişti. Yöntem gerçekten işe yarıyor olsa bile hangisi söylenir?',
        options: ['Ölçümler değiştirildiği için araştırmanın yolu etik değildir.', 'Yöntem işe yaradığı için araştırma etiğe uygun sayılır.', 'Ölçümleri değiştirmek yalnızca sonuç kötüyse sorun olur.'], answer: 0,
        why: ['Veri değiştirilemez; sonuç iyi olsa da yol ayrıca sorgulanır.', 'İyi sonuç, yöntemi kendiliğinden haklı çıkarmaz.', 'Veri, sonuç iyi de kötü de olsa istenen sonuca göre değiştirilemez.'], scene: 0,
      },
      {
        q: 'Bir öğrenci defterine “Çam ağacının yaprakları iğne biçimindedir.” yazdı; bilgiyi nereden aldığını yazmadı. Bu kayıt neden eksiktir?',
        options: ['Cümle çok kısa olduğu için', 'Okuyan bilginin kaynağını görüp doğrulayamayacağı için', 'Çam ağacı hakkında bilgi yazılmaması gerektiği için'], answer: 1,
        why: ['Kısalık eksiklik değildir; eksik olan bilginin kaynağıdır.', 'Kayıt, bulguyla birlikte bilginin kaynağını da yazar; okuyan böylece kendisi doğrulayabilir.', 'Bilgi yazılabilir; eksik olan, nereden alındığıdır.'], scene: 0,
      },
      {
        q: 'Bir projeyi üç öğrenci hazırladı: biri ölçümleri yaptı, biri grafikleri çizdi, biri raporu yazdı. Dördüncü öğrenci yalnızca toplantıda yanlarında oturdu. Rapora kimlerin adı yazılır?',
        options: ['Dördünün de adı, aynı projede bulundukları için', 'Yalnızca ölçümleri yapan öğrencinin adı', 'Ölçüm, grafik ve rapor işini yapan üçünün adı'], answer: 2,
        why: ['Yalnızca katkısı olanın adı yazılır; yanında oturmak katkı değildir.', 'Grafiği çizen ve raporu yazan da çalışmaya katkı yaptı.', 'Rapora yalnızca çalışmaya katkısı olanların adı yazılır.'], scene: 0,
      },
      {
        q: 'Bir grup, topladığı toprak örneklerinin hangi bahçeden alındığını doğrulayamadı. Hangi kayıt kurala uygundur?',
        options: ['Alındığı yerin doğrulanamadığını belirterek yazmak', 'Okul bahçesinden alındığını kesin bilgi gibi yazmak', 'Bu bilgiyi kayda hiç geçirmemek'], answer: 0,
        why: ['Emin olunamayan bilgi, emin olunmadığı belirtilerek yazılır.', 'Doğrulanmamış bilgi kesinmiş gibi yazılırsa kayıt bilinenden fazlasını söyler.', 'Bilinmeyen de kayda geçer; okuyan neyin doğrulanamadığını bilmelidir.'], scene: 0,
      },
      {
        q: 'Aynı grafik iki ayrı raporda bulundu. Raporları karşılaştırmak hangi bilgiyi vermez?',
        options: ['İki raporda aynı grafik bulunduğunu', 'Grafiği hangi grubun çizdiğini', 'İki grafiğin başlıklarının aynı olduğunu'], answer: 1,
        why: ['Raporlar yan yana konunca bu aynılık görülür.', 'Karşılaştırma aynılığı gösterir; kimin çizdiğini öğrenmek için hazırlayanlara soru sorulur.', 'Başlıklar da raporlar yan yana konunca karşılaştırılabilir.'], scene: 0,
      },
    ],
    summary: [
      '<b>Sonuç kadar yol da sorgulanır.</b> Veri değiştirilmez, kaynak gösterilir, katkısı olan yazılır, onay gönüllü verilir.',
      '<b>Önce doğrula, sonra kaydet.</b> Aranan bilgiye göre araç seç, farklı kaynakla doğrula, bulguyu kaynağıyla yaz.',
    ],
    nextLesson: { href: 'd1-gozlem-duzeni.html', label: 'Sonraki konu: Canlıların ortak özellikleri ›' },
  });
})();
