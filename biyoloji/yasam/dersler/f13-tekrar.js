/* F13 — Konu tekrarı: Organik moleküller
   Yeni bilgi yok. Tek sahnede konunun sekiz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.F, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (...els) => c.tween(300, (e) => els.forEach((el) => { el.style.opacity = 1 - e; })).then(() => els.forEach((el) => el.remove()));
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 400)]);
    // Ad – ok – iş satırı (a4 örneğindeki gibi)
    const satir = (g, y, ad, is, r, x1 = 110, xok = 360, xis = 460) => {
      K.yazi(c, g, x1, y, ad, { size: 30, kalin: 700, hiza: 'start', renk: r });
      K.ok(c, g, xok, y - 10, xok + 80, y - 10, r);
      K.yazi(c, g, xis, y, is, { size: 30, hiza: 'start' });
    };

    // Kur ve sök (F1)
    const g1 = yeni(), g1b = yeni();
    K.yazi(c, g1, 500, 80, 'Polimeri kur ve sök', { size: 34, kalin: 700 });
    K.kart(c, g1, 110, 130, 360, 200, 'Dehidrasyon', ['birimler birleşir', 'su açığa çıkar'], { renk });
    K.kart(c, g1, 530, 130, 360, 200, 'Hidroliz', ['polimer ayrılır', 'su kullanılır'], { renk: IKINCI });
    K.yazi(c, g1b, 500, 430, 'Büyük olan her molekül polimer değildir', { size: 30, renk: SOLUK });
    await goster(g1, 'Dehidrasyonda birimler birleşir ve genellikle su açığa çıkar.');
    await c.say('Hidrolizde su kullanılır ve polimer küçük birimlerine ayrılır.');
    await goster(g1b, 'Büyük olması yetmez; polimerde küçük birimler birbirine bağlıdır.');
    c.note('<b>Dehidrasyon: birimler birleşir, su açığa çıkar. Hidroliz: su kullanılır, polimer ayrılır.</b><br>Büyük olan her molekül polimer değildir; lipitler polimer değildir.', 'Kur ve sök', 'yasam-kur-ve-sok');
    await sil(g1, g1b);

    // Tek ve iki şeker (F2, F3): iki tahta
    const g2 = yeni(), g2b = yeni();
    [['Glikoz', 'hücre enerjisi', renk], ['Fruktoz', 'meyve ve bal', renk], ['Galaktoz', 'süt ürünleri', renk]]
      .forEach(([ad, is, r], i) => satir(g2, 110 + i * 88, ad, is, r));
    [['Riboz', 'RNA’nın şekeri', IKINCI], ['Deoksiriboz', 'DNA’nın şekeri', IKINCI]]
      .forEach(([ad, is, r], i) => satir(g2b, 374 + i * 88, ad, is, r));
    await goster(g2, 'Monosakkaritler tek birimlidir; şekerin türü görevini değiştirir.');
    await goster(g2b, 'Riboz RNA’nın, deoksiriboz DNA’nın yapısına katılır.',
      { speak: 'Riboz re ne a’nın, deoksiriboz de ne a’nın yapısına katılır.' });
    await sil(g2, g2b);
    const g3 = yeni(), g3b = yeni();
    K.yazi(c, g3, 500, 80, 'İki monosakkarit birleşir', { size: 34, kalin: 700 });
    [['Sükroz', 'glikoz + fruktoz'], ['Maltoz', 'glikoz + glikoz'], ['Laktoz', 'glikoz + galaktoz']]
      .forEach(([ad, is], i) => satir(g3, 200 + i * 90, ad, is, renk, 150, 400, 510));
    K.yazi(c, g3b, 500, 490, 'Türü birimler belirler', { size: 30, renk: SOLUK });
    await goster(g3, 'İki monosakkarit dehidrasyonla birleşince disakkarit oluşur.');
    await goster(g3b, 'Birimler aynı da farklı da olabilir; türü birimler belirler.');
    c.note('<b>Monosakkarit tek birimdir; türü görevini belirler.</b><br>Glikoz enerji, riboz RNA, deoksiriboz DNA. Disakkarit: sükroz, maltoz, laktoz.', 'Tek ve iki şeker', 'yasam-tek-ve-iki-seker');
    await sil(g3, g3b);

    // Polisakkaritler (F4)
    const g4 = yeni(), g4b = yeni();
    K.yazi(c, g4, 500, 70, 'Polisakkarit: depo ya da yapı', { size: 34, kalin: 700 });
    K.kart(c, g4, 110, 120, 360, 240, 'Depo', ['glikojen: hayvan', 'nişasta: bitki'], { renk });
    K.kart(c, g4, 530, 120, 360, 240, 'Yapı', ['selüloz: bitki duvarı', 'kitin: mantar duvarı'], { renk: IKINCI });
    K.yazi(c, g4b, 500, 440, 'İnsan selülozu parçalayamaz', { size: 30, renk: SOLUK });
    await goster(g4, 'Çok sayıda monosakkarit birleşince polisakkarit oluşur; görevi depo ya da yapıdır.');
    await c.say('Hayvanlar glikojeni, bitkiler nişastayı depolar; selüloz ve kitin yapıya destek verir.');
    await goster(g4b, 'İnsanlar selülozu parçalayacak enzime sahip değildir.');
    c.note('<b>Çok birimli zincirler depo ya da yapı görevi üstlenir.</b><br>Depo: glikojen, nişasta. Yapı: selüloz, kitin.', 'Depo ve yapı', 'yasam-depo-ve-yapi');
    await sil(g4, g4b);

    // Lipitler (F5, F6)
    const g5 = yeni();
    K.kart(c, g5, 30, 100, 300, 240, 'Trigliserit', ['üç yağ asidi', 'enerji deposu'], { renk });
    K.kart(c, g5, 350, 100, 300, 240, 'Fosfolipit', ['iki yağ asidi', 'fosfat başı', 'zar yapısı'], { renk: IKINCI });
    K.kart(c, g5, 670, 100, 300, 240, 'Steroit', ['dört halka', 'kolesterol: zar'], { renk: YESIL });
    K.yazi(c, g5, 500, 430, 'Lipitler polimer değildir', { size: 30, renk: SOLUK });
    await goster(g5, 'Lipitler polimer değildir; yapı ve görev çeşide göre farklılaşır.');
    await c.say('Trigliserit enerji depolar; fosfolipitin iki yağ asidi ve fosfatı zarı kurar.');
    await c.say('Steroitler dört halkalıdır; kolesterol zarın akışkanlığını düzenler.');
    c.note('<b>Trigliserit: gliserol ve üç yağ asidi, enerji deposu.</b><br>Fosfolipit: iki yağ asidi ve fosfat, zar. Steroit: dört halka.', 'Lipitler', 'yasam-lipitler');
    await sil(g5);

    // Proteinler (F7)
    const g6 = yeni(), g6b = yeni(), g6c = yeni();
    K.yazi(c, g6, 250, 100, 'Dizilim kurar', { size: 36, kalin: 700, renk });
    K.ok(c, g6, 420, 90, 580, 90, SOLUK);
    K.yazi(c, g6, 750, 100, 'biçim çalıştırır', { size: 36, kalin: 700, renk: IKINCI });
    K.yazi(c, g6, 500, 190, 'Değişken grup amino asidi çeşitlendirir', { size: 28 });
    K.yazi(c, g6b, 500, 280, 'Yapı, taşıma, savunma, kas kasılması', { size: 28 });
    K.yazi(c, g6c, 500, 390, 'Biçim değişirse: denatürasyon', { size: 34, kalin: 700, renk: YESIL });
    K.yazi(c, g6c, 500, 450, 'sıcaklık, pH, tuz', { size: 28, renk: SOLUK });
    await goster(g6, 'Değişken grup amino asidi çeşitlendirir; dizilim proteini kurar, biçim çalıştırır.');
    await goster(g6b, 'Proteinler yapı, taşıma, savunma ve kas kasılmasında görev alır.');
    await goster(g6c, 'Sıcaklık, pH ya da tuz biçimi değiştirebilir; buna denatürasyon denir.',
      { speak: 'Sıcaklık, pehaş ya da tuz biçimi değiştirebilir; buna denatürasyon denir.' });
    c.note('<b>Dizilim proteini kurar, biçim çalıştırır.</b><br>Sıcaklık, pH ya da tuz biçimi değiştirirse etkinlik kaybolabilir.', 'Biçim ve işlev', 'yasam-bicim-ve-islev');
    await sil(g6, g6b, g6c);

    // Enzimler (F8, F9): iki tahta
    const g7 = yeni(), g7b = yeni();
    K.yazi(c, g7, 500, 70, 'Enzim eşiği düşürür', { size: 36, kalin: 700 });
    K.kart(c, g7, 110, 120, 360, 230, 'Enzimsiz', ['yüksek eşik', 'yavaş tepkime'], { renk: IKINCI });
    K.kart(c, g7, 530, 120, 360, 230, 'Enzimli', ['düşük eşik', 'hızlı tepkime'], { renk });
    K.yazi(c, g7b, 500, 440, 'Net enerji farkı değişmez', { size: 32, renk: YESIL });
    await goster(g7, 'Enzim aktivasyon enerjisini düşürür; tepkime daha hızlı gerçekleşir.');
    await goster(g7b, 'Net enerji farkı değişmez, enzim de tepkimede tükenmez.');
    await sil(g7, g7b);
    const g8 = yeni();
    K.yazi(c, g8, 500, 70, 'Enzim kendi substratına özgüdür', { size: 34, kalin: 700 });
    K.yazi(c, g8, 500, 125, 'bağlanırken biçimi değişebilir', { size: 26, renk: SOLUK });
    const g8b = yeni();
    K.kart(c, g8b, 110, 170, 360, 250, 'Basit enzim', ['yardımcı bileşen', 'gerekmez'], { renk: IKINCI });
    K.kart(c, g8b, 530, 170, 360, 250, 'Bileşik enzim', ['yardımcı bileşen ister', 'çinko ya da vitamin'], { renk });
    await goster(g8, 'Enzim kendi substratını tanır; bağlanırken biçimi değişebilir.');
    await goster(g8b, 'Basit enzim tek başına çalışır; bileşik enzim yardımcı bileşen ister.');
    await c.say('Yardımcı bileşen bir metal ya da organik molekül, örneğin vitamin olabilir.');
    c.note('<b>Enzim aktivasyon enerjisini düşürür; net enerji farkını değiştirmez.</b><br>Kendi substratına özgüdür. Bileşik enzim yardımcı bileşen ister, basit enzim istemez.', 'Enzimler', 'yasam-enzimler');
    await sil(g8, g8b);

    // DNA ve RNA (F10)
    const g9 = yeni(), g9b = yeni();
    K.kart(c, g9, 110, 60, 360, 250, 'DNA', ['deoksiriboz, timin', 'çift iplik', 'bilgiyi depolar'], { renk });
    K.kart(c, g9, 530, 60, 360, 250, 'RNA', ['riboz, urasil', 'tek iplik', 'protein sentezinde aracı'], { renk: IKINCI });
    K.yazi(c, g9b, 500, 400, 'Nükleotit: fosfat, şeker, baz', { size: 30 });
    K.yazi(c, g9b, 500, 460, 'DNA’da A–T ve G–C eşleşir', { size: 30, renk: SOLUK });
    await goster(g9, 'DNA’da deoksiriboz ve timin, RNA’da riboz ve urasil bulunur.',
      { speak: 'De ne a’da deoksiriboz ve timin, re ne a’da riboz ve urasil bulunur.' });
    await c.say('DNA bilgiyi depolar; RNA protein sentezi gibi süreçlerde aracıdır.',
      { speak: 'De ne a bilgiyi depolar; re ne a protein sentezi gibi süreçlerde aracıdır.' });
    await goster(g9b, 'Nükleotit fosfat, şeker ve bazdan oluşur; DNA’da adenin timinle, guanin sitozinle eşleşir.',
      { speak: 'Nükleotit fosfat, şeker ve bazdan oluşur; de ne a’da adenin timinle, guanin sitozinle eşleşir.' });
    c.note('<b>DNA: deoksiriboz, timin, çift iplik. RNA: riboz, urasil, tek iplik.</b><br>Nükleotit: fosfat, şeker, baz. DNA’da A–T, G–C eşleşir.', 'DNA ve RNA', 'yasam-dna-ve-rna');
    await sil(g9, g9b);

    // Vitaminler (F11)
    const g10 = yeni(), g10b = yeni();
    K.kart(c, g10, 60, 90, 420, 290, 'Yağda çözünen', ['A: görme', 'D: kemik', 'E: hücresel koruma', 'K: pıhtılaşma'], { renk });
    K.kart(c, g10, 520, 90, 420, 290, 'Suda çözünen', ['B: enerji metabolizması', 'C: kolajen, savunma'], { renk: IKINCI, altSize: 26 });
    K.yazi(c, g10b, 500, 450, 'Aynı grup, aynı görev değil', { size: 30, renk: SOLUK });
    await goster(g10, 'Vitaminler çözündükleri ortama göre gruplanır.');
    await c.say('A, D, E ve K yağda; B ve C suda çözünür.',
      { speak: 'A, de, e ve ka yağda; be ve ce suda çözünür.' });
    await goster(g10b, 'Aynı grupta olmak, görevlerin aynı olması demek değildir.');
    c.note('<b>Vitaminler çözündükleri ortama göre gruplanır.</b><br>Yağda: A, D, E, K. Suda: B, C. Aynı grup, aynı görev demek değildir.', 'Vitaminler', 'yasam-vitaminler');
    await c.say('Şimdi on iki dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'yasam-f13', kicker: 'Konu F · Organik moleküller', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Organik moleküller',
      hook: 'On iki dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun sekiz kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'On iki dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Bir tepkimede enzimsiz yolun tepe noktası 90, enzimli yolun tepe noktası 60 birimdir; başlangıç düzeyi ikisinde de 20 birimdir. Enzim aktivasyon enerjisini nasıl değiştirir?',
        options: ['Değiştirmez; yalnızca ürünlerin enerjisini düşürür', '30 birim düşürür', '30 birim artırır'], answer: 1,
        why: ['Enzim ürünlerin enerjisini değiştirmez; düşen, tepkimenin başlangıç engelidir.', 'Enzimli yolun tepe noktası 30 birim daha aşağıdadır; aktivasyon enerjisi 70 birimden 40 birime düşer.', 'Enzim engeli artırmaz; tepe noktası enzimli yolda daha aşağıdadır.'], scene: 0,
      },
      {
        q: 'Bir hücre, amino asitleri birbirine bağlayarak uzun bir protein zinciri kuruyor. Bu sırada suyla ilgili ne beklenir?',
        options: ['Birimler bağlanırken genellikle su açığa çıkar', 'Birimler bağlanırken su kullanılır; su zincirin yapısına girer', 'Su, zincir tamamlanınca yalnızca bir kez açığa çıkar'], answer: 0,
        why: ['Amino asitler dehidrasyonla bağlanır; birimler birleşirken genellikle su açığa çıkar.', 'Su kullanımı hidrolizle ilişkilidir; birimler birleşirken genellikle su açığa çıkar.', 'Su çıkışı birimlerin bağlanması sırasındadır; zincir tamamlanınca değil.'], scene: 0,
      },
      {
        q: 'Kutup bölgesinde yaşayan bir fokun derisinin altında kalın bir yağ tabakası vardır. Bu yağ tabakası hangi iki işi birlikte görür?',
        options: ['Genetik bilgiyi saklar ve protein sentezinde aracılık eder', 'Glikoz depolar ve bitki duvarını kurar', 'Enerji depolar ve yalıtım sağlar'], answer: 2,
        why: ['Genetik bilgi nükleik asitlerle ilişkilidir; yağ tabakası bilgi saklamaz.', 'Glikoz depolamak ve bitki duvarını kurmak polisakkaritlerin işidir; trigliserit şeker birimlerinden kurulmaz.', 'Depo yağı enerji depolar; yalıtım sağlayarak sıcaklığın korunmasına da katılır.'], scene: 0,
      },
      {
        q: 'Çift iplikli bir DNA parçasında bazların yüzde 30’u adenindir. Bu parçada timin yüzde kaçtır?',
        options: ['Yüzde 30', 'Yüzde 20', 'Yüzde 70'], answer: 0,
        why: ['DNA’da adenin timinle eşleştiği için ikisinin oranı eşittir.', 'Yüzde 20 guanin ya da sitozinin payıdır; timin, eşleştiği adenin kadardır.', 'Yüzde 70, adeninin dışında kalan bazların toplamıdır; timin onların yalnızca bir kısmıdır.'], scene: 0,
      },
      {
        q: 'Bir böceğin dış iskeletinde ve bir mantarın hücre duvarında ortak bulunan, yapıya destek veren polisakkarit hangisidir?',
        options: ['Glikojen', 'Kitin', 'Selüloz'], answer: 1,
        why: ['Glikojen depo polisakkaritidir; yapıya destek vermez.', 'Kitin hem mantar duvarında hem eklem bacaklıların dış iskeletinde yapısal destek sağlar.', 'Selüloz bitki hücre duvarında bulunur; mantar duvarında ve dış iskelette bulunan kitindir.'], scene: 0,
      },
      {
        q: 'Bir enzim, vitamin içeren ortamda çalışıyor; vitamin ortamdan uzaklaştırılınca çalışmıyor. Vitamin bu enzimde hangi rolü üstlenmiştir?',
        options: ['Enzimin ürüne dönüştürdüğü madde', 'Tepkimenin sonunda oluşan ürün', 'Organik yardımcı bileşen'], answer: 2,
        why: ['Ürüne dönüşen madde substrattır; vitamin ise enzimin çalışması için gereken bileşendir.', 'Ürün tepkime sonunda oluşur; vitamin tepkimenin gerçekleşmesi için baştan gereklidir.', 'Vitaminler bazı enzimlerin organik yardımcı bileşenidir; bu enzim bileşik enzimdir.'], scene: 0,
      },
      {
        q: 'Maltoz hidrolizle birimlerine ayrılırken su ve ürünler için ne beklenir?',
        options: ['Su kullanılır; iki glikoz birimi elde edilir', 'Su açığa çıkar; iki glikoz birimi elde edilir', 'Su kullanılır; glikoz ve fruktoz elde edilir'], answer: 0,
        why: ['Hidrolizde su kullanılır; maltoz iki glikozdan oluştuğu için iki glikoz elde edilir.', 'İki glikoz doğru, ama hidrolizde su açığa çıkmaz, kullanılır; su çıkışı dehidrasyondadır.', 'Su kullanımı doğru, ama glikoz ve fruktoz sükrozun birimleridir; maltozunki iki glikozdur.'], scene: 0,
      },
      {
        q: 'Amino asit dizilimi aynı olan iki protein molekülünden biri yanlış katlanmış ve çalışmıyor. Bu durum neyle açıklanır?',
        options: ['Çalışmayan proteinde amino asitler başka bir moleküle dönüşmüştür', 'Dizilim aynıysa işlev değişmez; çalışmama başka bir nedene bağlıdır', 'Katlanma bozulunca işlevli üç boyutlu biçim de kaybolmuştur'], answer: 2,
        why: ['Katlanmadaki bozulma amino asitleri başka bir moleküle çevirmez; değişen, zincirin biçimidir.', 'Dizilim kurar, biçim çalıştırır; dizilim aynı olsa da biçim bozulursa işlev gider.', 'Dizilim proteini kurar, biçim çalıştırır; yanlış katlanma işlevli biçimi bozar.'], scene: 0,
      },
      {
        q: 'Bir lipit örneğinde gliserol, iki yağ asidi ve bir fosfat grubu bulunuyor. Bu lipitin hücredeki görevi hangisidir?',
        options: ['Enerjiyi uzun süre depolamak', 'Hücre zarının yapısını kurmak', 'Kalıtsal bilgiyi saklamak ve aktarmak'], answer: 1,
        why: ['Enerjiyi depolayan, üç yağ asidi taşıyan trigliseritlerdir; bu örnekte iki yağ asidi ve fosfat var.', 'İki yağ asidi ve fosfat fosfolipiti gösterir; fosfolipitler hücre zarının yapısını oluşturur.', 'Kalıtsal bilgiyi nükleik asitler taşır; lipitlerin yapısında nükleotit bulunmaz.'], scene: 0,
      },
      {
        q: 'Bir çocukta kalsiyum ve fosfor emilimi düşük, kemik gelişimi yetersizdir. Yağda çözünen hangi vitaminin eksikliği bu durumla ilişkili olabilir?',
        options: ['A vitamini', 'E vitamini', 'D vitamini'], answer: 2,
        why: ['A vitamini görme ve cilt sağlığıyla ilişkilidir; kalsiyum ve fosfor emilimiyle değil.', 'E vitamini hücre zarını zararlı bileşiklerin etkilerine karşı korur; emilimle ilişkili değildir.', 'D vitamini kalsiyum ve fosfor emilimiyle kemik sağlığını destekler.'], scene: 0,
      },
    ],
    summary: [
      '<b>Dehidrasyon kurar, hidroliz söker.</b> Şeker zincirleri depo ya da yapı görevi üstlenir; türü birimler belirler.',
      '<b>Lipitler polimer değildir;</b> yapı ve görev çeşide göre değişir. Dizilim proteini kurar, biçim çalıştırır.',
      '<b>Enzim eşiği düşürür,</b> kendi substratına özgüdür. DNA ile RNA şeker, baz ve iplikle; vitaminler çözündükleri ortamla ayrılır.',
    ],
    nextLesson: { href: 'g1-ayrac-ve-renk.html', label: 'Sonraki konu: Besinlerde organik molekül arama ›' },
  });
})();
