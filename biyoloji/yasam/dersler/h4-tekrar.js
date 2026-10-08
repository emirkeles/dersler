/* H4 — Konu tekrarı: Enzim deneyi
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.H, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 400)]);

    // Enzim aktivitesi (H1)
    const g1 = yeni();
    K.yazi(c, g1, 500, 150, 'Enzim aktivitesi', { size: 46, kalin: 700, renk });
    K.yazi(c, g1, 500, 240, 'enzimli tepkimenin hızı', { size: 32 });
    K.yazi(c, g1, 500, 370, 'ortamın sıcaklığına', { size: 32, renk: IKINCI });
    K.yazi(c, g1, 500, 425, 've pH değerine bağlıdır', { size: 32, renk: IKINCI });
    await goster(g1, 'Enzimli bir tepkimenin hızına enzim aktivitesi denir.');
    await c.say('Enzim aktivitesi ortamın sıcaklığına ve pH değerine bağlıdır.', { speak: 'Enzim aktivitesi ortamın sıcaklığına ve pehaş değerine bağlıdır.' });
    c.note('<b>Enzim aktivitesi: enzimli tepkimenin hızı.</b><br>Sıcaklığa ve pH değerine bağlıdır.', 'Enzim aktivitesi', 'yasam-h-enzim-aktivitesi');
    await sil(g1);

    // Kabarcık sayısı (H1)
    const g2 = yeni();
    K.yazi(c, g2, 500, 110, 'Katalaz', { size: 42, kalin: 700, renk });
    K.yazi(c, g2, 230, 230, 'hidrojen peroksit', { size: 30 });
    K.ok(c, g2, 400, 220, 560, 220, SOLUK);
    K.yazi(c, g2, 750, 230, 'su + oksijen', { size: 30 });
    K.yazi(c, g2, 500, 380, 'daha çok kabarcık', { size: 34, kalin: 700, renk: YESIL });
    K.yazi(c, g2, 500, 440, 'daha yüksek aktivite', { size: 34, kalin: 700, renk: YESIL });
    await goster(g2, 'Katalaz, hidrojen peroksidi su ve oksijene dönüştürür.');
    await c.say('Aynı sürede daha çok kabarcık, daha yüksek enzim aktivitesidir.');
    c.note('<b>Kabarcık sayısı enzim aktivitesini gösterir.</b><br>Katalaz: hidrojen peroksit → su + oksijen', 'Ölçüm', 'yasam-h-olcum');
    await sil(g2);

    // Kontrollü deney (H1)
    const g3 = yeni();
    K.yazi(c, g3, 500, 90, 'Kontrollü deney', { size: 36, kalin: 700 });
    K.kart(c, g3, 30, 150, 300, 210, 'Değiştir', ['bağımsız', 'değişken'], { renk });
    K.kart(c, g3, 350, 150, 300, 210, 'Ölç', ['bağımlı', 'değişken'], { renk });
    K.kart(c, g3, 670, 150, 300, 210, 'Sabit tut', ['kontrol', 'değişkenleri'], { renk: IKINCI });
    await goster(g3, 'Araştırmacının değiştirdiği koşul bağımsız değişkendir.');
    await c.say('Ölçülen bağımlı değişkendir; öteki koşullar eşit tutulur.');
    c.note('<b>Birini değiştir, birini ölç, gerisini sabit tut.</b><br>Sıcaklık değişir, kabarcık sayılır.', 'Kontrollü deney', 'yasam-h-kontrollu-deney');
    await sil(g3);

    // Düşük sıcaklık (H2)
    const g4 = yeni();
    K.yazi(c, g4, 500, 100, 'Düşük sıcaklık', { size: 40, kalin: 700, renk });
    K.kart(c, g4, 110, 190, 360, 200, 'Tepkime', ['yavaşlar'], { renk: IKINCI });
    K.kart(c, g4, 530, 190, 360, 200, 'Enzimin yapısı', ['bozulmaz'], { renk: YESIL });
    await goster(g4, 'Soğukta enzim ile substrat seyrek karşılaşır; tepkime yavaşlar.');
    await c.say('Düşük sıcaklık enzimin yapısını bozmaz.');
    c.note('<b>Düşük sıcaklık enzimi yavaşlatır, yapısını bozmaz.</b><br>Buzluktaki gıda bu yüzden geç bozulur.', 'Düşük sıcaklık', 'yasam-h-dusuk-sicaklik');
    await sil(g4);

    // Yüksek sıcaklık (H2)
    const g5 = yeni();
    K.yazi(c, g5, 500, 110, 'Yüksek sıcaklık', { size: 42, kalin: 700, renk });
    K.yazi(c, g5, 500, 220, 'protein yapılı enzim', { size: 32 });
    K.yazi(c, g5, 500, 305, 'biçimi bozulur: denatürasyon', { size: 32, renk: IKINCI });
    K.yazi(c, g5, 500, 420, 'bozulma kalıcıdır', { size: 36, kalin: 700, renk: YESIL });
    await goster(g5, 'Yüksek sıcaklıkta enzim doğal biçimini kaybeder; buna denatürasyon denir.');
    await c.say('Biçimi bozulan enzim substratını dönüştüremez; bozulma kalıcıdır.');
    c.note('<b>Yüksek sıcaklık enzimi denatüre eder.</b><br>Biçimi bozulan enzim çalışamaz; bozulma kalıcıdır.', 'Yüksek sıcaklık', 'yasam-h-yuksek-sicaklik');
    await sil(g5);

    // Optimum sıcaklık (H2): iki eksen, tek eğri, üç etiket
    const g6 = yeni();
    K.cizgi(c, g6, 150, 90, 150, 400, SOLUK);
    K.cizgi(c, g6, 150, 400, 850, 400, SOLUK);
    c.S('path', { d: 'M 160 395 C 300 380 400 130 520 125 C 600 120 650 250 700 395', fill: 'none', stroke: renk, 'stroke-width': 4 }, g6);
    K.yazi(c, g6, 95, 110, 'Hız', { size: 28 });
    K.yazi(c, g6, 500, 450, 'Sıcaklık', { size: 28 });
    const tepe = yeni();
    c.S('circle', { cx: 520, cy: 125, r: 9, fill: '#ec9ec4' }, tepe);
    K.yazi(c, tepe, 520, 80, 'Optimum', { size: 32, kalin: 700, renk: IKINCI });
    const insan = yeni();
    K.yazi(c, insan, 500, 520, 'İnsanda birçok enzim: 35–40 °C', { size: 28, renk: SOLUK });
    await goster(g6, 'Sıcaklık arttıkça tepkime hızı önce yükselir.');
    await Promise.all([c.say('Hızın en yüksek olduğu sıcaklığa optimum sıcaklık denir.'), K.belir(c, tepe, 400)]);
    await Promise.all([c.say('Optimumun üstünde denatürasyon başlar; hız düşer.'), K.belir(c, insan, 400)]);
    c.note('<b>Optimum sıcaklık: aktivitenin en yüksek olduğu sıcaklık.</b><br>İnsanda birçok enzim: 35–40 °C', 'Optimum sıcaklık', 'yasam-h-optimum-sicaklik');
    await Promise.all([sil(g6), sil(tepe), sil(insan)]);

    // Optimum pH (H3)
    const g7 = yeni();
    K.yazi(c, g7, 500, 100, 'Optimum pH', { size: 42, kalin: 700, renk });
    K.kart(c, g7, 110, 170, 360, 190, 'Pepsin', ['asidik midede'], { renk: IKINCI });
    K.kart(c, g7, 530, 170, 360, 190, 'Tripsin', ['bazik bağırsakta'], { renk: YESIL });
    K.yazi(c, g7, 500, 450, 'hücre içinde birçok enzim: pH 6–8', { size: 28, renk: SOLUK });
    await goster(g7, 'Enzimin en aktif olduğu pH değerine optimum pH denir.', { speak: 'Enzimin en aktif olduğu pehaş değerine optimum pehaş denir.' });
    await c.say('Her enzimin kendi optimum pH değeri vardır.', { speak: 'Her enzimin kendi optimum pehaş değeri vardır.' });
    await c.say('Pepsin asidik, tripsin bazik ortamda en iyi çalışır.');
    c.note('<b>Her enzimin kendi optimum pH değeri vardır.</b><br>Pepsin asidik, tripsin bazik ortamda çalışır.', 'Optimum pH', 'yasam-h-optimum-ph');
    await c.say('Şimdi üç dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'yasam-h4', kicker: 'Konu H · Enzim deneyi', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Enzim deneyi',
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
        q: 'Bir araştırmacı, yeni bulunan bir enzimin aynı sürede oluşturduğu ürün miktarını üç sıcaklıkta ölçüyor. Bu ölçüm enzimin neyini gösterir?',
        options: ['Enzimin ortamdaki toplam miktarını', 'Enzimin optimum pH değerini', 'Enzimin aktivitesini, yani tepkime hızını'], answer: 2,
        why: ['Ürün miktarı enzimin miktarını değil, ne kadar hızlı çalıştığını gösterir.', 'Optimum pH, sıcaklık değil pH değiştirilerek bulunur.', 'Aynı sürede oluşan ürün tepkimenin hızıdır; buna enzim aktivitesi denir.'], scene: 0,
      },
      {
        q: 'Katalaz içeren bir doku parçası hidrojen peroksit çözeltisine atılıyor. Tepkimenin gerçekleştiğini en doğrudan hangi gözlem gösterir?',
        options: ['Doku parçasının tüpün dibine çökmesi', 'Sıvıda oksijen kabarcıklarının yükselmesi', 'Doku parçasının daha küçük görünmesi'], answer: 1,
        why: ['Çökmek tepkimenin ürünü değildir; katalaz su ve oksijen oluşturur.', 'Katalaz hidrojen peroksidi su ve oksijene dönüştürür; oksijen kabarcık olarak görülür.', 'Katalaz doku parçasını değil, hidrojen peroksidi parçalar.'], scene: 0,
      },
      {
        q: 'Bir öğrenci aynı sıcaklıkta ve aynı pH değerinde üç tüp hazırlıyor; tüplere farklı miktarlarda maya çözeltisi koyup beş dakikada çıkan kabarcıkları sayıyor. Bu deneyde bağımsız değişken hangisidir?',
        options: ['Tüplere konan maya çözeltisi miktarı', 'Beş dakikada sayılan kabarcık', 'Ortamın sıcaklığı'], answer: 0,
        why: ['Öğrencinin bilerek değiştirdiği koşul maya miktarıdır.', 'Sayılan kabarcık ölçülen bağımlı değişkendir.', 'Sıcaklık bu deneyde tüm tüplerde eşit tutulan bir kontrol değişkenidir.'], scene: 0,
      },
      {
        q: 'Bir süre buzdolabında bekletilen bir enzim çözeltisi oda sıcaklığına getiriliyor. Ne beklenir?',
        options: ['Aktivitesi artar; soğuk yapıyı bozmamış, yalnızca yavaşlatmıştı.', 'Çalışmaz; soğuk yapıyı kalıcı olarak bozmuştur.', 'Aktivitesi değişmez; sıcaklık enzim aktivitesini etkilemez.'], answer: 0,
        why: ['Düşük sıcaklık yapıyı bozmaz; ortam ısınınca moleküller hızlanır ve tepkime hızlanır.', 'Yapıyı kalıcı olarak bozan yüksek sıcaklıktır; soğuk yalnızca yavaşlatır.', 'Enzim aktivitesi ortamın sıcaklığına bağlıdır.'], scene: 0,
      },
      {
        q: 'Bir öğrenci mayayı kaynar suda bekletiyor, sonra soğutup hamura katıyor. Hamur kabarmıyor. Bunun nedeni hangisidir?',
        options: ['Soğutma, mayadaki enzimlerin yapısını bozdu.', 'Enzimler soğuyunca yalnızca yavaşladı; biraz bekleyince hamur kabarır.', 'Kaynar su mayadaki enzimleri denatüre etti; bozulma kalıcıdır.'], answer: 2,
        why: ['Yapıyı bozan yüksek sıcaklıktır; soğuma enzimin yapısını bozmaz.', 'Yavaşlama düşük sıcaklığın etkisidir; yüksek sıcaklık yapıyı bozar ve soğutunca düzelmez.', 'Yüksek sıcaklık enzimi denatüre eder; biçimi bozulan enzim çalışamaz.'], scene: 0,
      },
      {
        q: 'Bir enzimin hızı üç sıcaklıkta ölçüldü: 10 °C’de 2, 25 °C’de 9, 40 °C’de 4 birim. Bu enzimin optimum sıcaklığı hangisine en yakındır?',
        options: ['10 °C', '25 °C', '40 °C'], answer: 1,
        why: ['10 °C’de hız düşüktür; optimum, hızın en yüksek olduğu sıcaklıktır.', 'En yüksek hız 25 °C’de ölçüldü; optimum sıcaklık buna en yakındır.', '40 °C’de hız yeniden düşmüş; optimumun üstünde denatürasyon başlar.'], scene: 0,
      },
      {
        q: 'İnce bağırsakta ortamın pH değeri bir nedenle asidik bölgeye düşerse tripsinin aktivitesi nasıl değişir?',
        options: ['Artar; asidik ortam bütün sindirim enzimlerini hızlandırır.', 'Değişmez; tripsin ortamın pH değerinden etkilenmez.', 'Düşer; tripsinin optimum pH değeri bazik bölgededir.'], answer: 2,
        why: ['Her enzimin kendi optimum pH değeri vardır; tripsin asidik ortamda hızlanmaz.', 'Enzim aktivitesi ortamın pH değerine bağlıdır.', 'Tripsin bazik ortamda en iyi çalışır; optimumundan uzaklaşınca aktivitesi düşer.'], scene: 0,
      },
      {
        q: 'Optimum pH değerindeki bir ortamda duran enzim 90 °C’lik suya konuyor. Aktivitesi nasıl değişir?',
        options: ['En yüksek hızda çalışır; çünkü pH değeri uygundur.', 'Düşer; yüksek sıcaklık enzimin yapısını bozar.', 'Artar; sıcaklık yükseldikçe hız hep artar.'], answer: 1,
        why: ['Aktivite hem pH hem sıcaklığa bağlıdır; uygun pH, yüksek sıcaklığın zararını gidermez.', 'Yüksek sıcaklık enzimi denatüre eder; pH uygun olsa da enzim çalışamaz.', 'Hız yalnızca optimum sıcaklığa kadar artar; üstünde denatürasyon başlar.'], scene: 0,
      },
    ],
    summary: [
      '<b>Enzim aktivitesi sıcaklığa ve pH değerine bağlıdır.</b> Birini değiştir, birini ölç, gerisini sabit tut.',
      '<b>Soğuk enzimi yavaşlatır; yüksek sıcaklık yapısını kalıcı olarak bozar.</b> Her enzimin bir optimum sıcaklığı vardır.',
      '<b>Her enzimin kendi optimum pH değeri vardır.</b> Pepsin asidik, tripsin bazik ortamda çalışır.',
    ],
    nextLesson: { href: 'index.html', label: 'Tüm dersler ›' },
  });
})();
