/* C2 · BİY.9.1.3 a–ç · Yazar notu: içerik MEB Biyoloji 9 s. 31 (doğal yaşam parkı ödevi, üç raporun değerlendirmesi,
   sunumda sorulan sorular; "rapordaki bilgilerin doğruluğunu farklı ve güvenilir kaynaklardan doğrulayınız"), s. 32 (veri,
   kaynak ve katkı kuralları), s. 167 (etik araştırma raporu: bulgular ve yararlanılan kaynaklar kaydedilir).
   Anlatım 8 Ekim 2026'da baştan yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): olay yeniden kurulur;
   araç, bilgiye ulaşma, doğrulama ve kayıt aynı olay üzerinde öğretilir. Öğrenciye kitap, sınıf ya da çekince söylenmez. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.C, IKINCI = 'var(--c5)', SOLUK = 'var(--muted)', IYI = 'var(--good)', KOTU = 'var(--bad)';

  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const satirlar = (kart) => [...kart.querySelectorAll('text')].slice(1);
  const yaz = (kart, ...metin) => satirlar(kart).forEach((t, i) => { t.textContent = metin[i] || ''; });

  function belge(c, p, x, y, ad) {
    const g = c.S('g', {}, p);
    K.kutu(c, g, x, y, 150, 180, { rx: 8, renk });
    [0, 1, 2, 3].forEach((i) => K.cizgi(c, g, x + 25, y + 40 + i * 32, x + (i === 3 ? 90 : 125), y + 40 + i * 32, SOLUK));
    K.yazi(c, g, x + 75, y + 220, ad, { size: 26 });
    return g;
  }

  /* ---- Sahne 1 · Üç araç ---- */
  async function araclar(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const belgeler = c.S('g', {}, g);
    [220, 425, 630].forEach((x, i) => belge(c, belgeler, x, 110, `${i + 1}. rapor`));
    await K.belir(c, belgeler);
    await c.say('Üç öğrenci grubu, bir doğal yaşam parkındaki hayvanlar hakkında rapor hazırladı.');
    const icerik = K.yazi(c, g, 500, 420, 'Gözlem, fotoğraf, kaynak bilgisi, anket', { size: 28 });
    await K.belir(c, icerik, 300);
    await c.say('Raporlarda gözlemler, hayvan fotoğrafları, kaynaklardan toplanan bilgiler ve bir ziyaretçi anketi var.');
    await K.belir(c, K.yazi(c, g, 500, 65, 'Bu raporlar bilim etiğine uygun mu?', { size: 30, renk }), 300);
    await c.say('Soru şu: bu raporlar bilim etiğine uygun hazırlanmış mı?', { speak: '[curious] Soru şu: bu raporlar bilim etiğine uygun hazırlanmış mı?' });
    icerik.textContent = 'Değiştirilmemiş veri, gösterilmiş kaynak, doğru yazılmış katkı';
    await c.say('Bilim etiği verinin değiştirilmemesini, kaynağın gösterilmesini, katkının doğru yazılmasını ister.');
    await Promise.all([sil(c, belgeler), sil(c, icerik)]);
    const arac = (x, ad, s1, s2) => K.belir(c, K.kart(c, g, x, 170, 290, 200, ad, [s1, s2], { renk, altSize: 26 }));
    await arac(40, 'Raporu oku', 'Kaynakça?', 'İş bölümü?');
    await c.say('İlk araç raporun kendisidir: kaynakça var mı, iş bölümü yazılmış mı?');
    await arac(355, 'Karşılaştır', 'Aynı fotoğraf?', 'Zıt sonuç?');
    await c.say('İkinci araç raporları karşılaştırmaktır: aynı fotoğraf ya da zıt sonuç var mı?');
    await arac(670, 'Soru sor', 'Kim hangi', 'işi yaptı?');
    await c.say('Üçüncü araç hazırlayanlara soru sormaktır: kim hangi işi yaptı?');
    await c.choice({ tag: 'Uygula', q: '“İkinci grupta herkes ödevde görev aldı mı?” sorusunun cevabı hangi araçla bulunur?',
      options: ['Raporun kaynakçasına bakarak', 'Grup üyelerine soru sorarak', 'Fotoğrafları karşılaştırarak'], answer: 1,
      hints: ['Kaynakça bilginin nereden alındığını gösterir, kimin çalıştığını değil.', '', 'Fotoğraflar kimin çalıştığını göstermez.'],
      right: 'Kimin ne yaptığını en iyi, işi yapanların cevapları gösterir.' });
    c.note('<b>Araç, aranan bilgiye göre seçilir.</b><br>Raporu oku · karşılaştır · soru sor', 'Araç');
  }

  /* ---- Sahne 2 · Bilgiye ulaş ---- */
  async function ulas(c) {
    const s = c.svg(1000, 562);
    const blok = (y, ad) => {
      const g = c.S('g', {}, s);
      K.kutu(c, g, 40, y + 35, 240, 80, { renk });
      K.yazi(c, g, 160, y + 86, ad, { size: 28, renk });
      g.style.opacity = 0;
      return g;
    };
    const bulgu = (g, y, metin, r) => {
      const k = c.S('g', {}, g);
      K.ok(c, k, 290, y + 30, 325, y + 30, renk);
      K.kutu(c, k, 335, y, 625, 60, { rx: 10, renk: r || '#5b678f' });
      K.yazi(c, k, 647, y + 40, metin, { size: 26 });
      return K.belir(c, k, 300);
    };
    const oku = blok(30, 'Raporu oku');
    oku.style.opacity = 1;
    await bulgu(oku, 40, '3. rapor: kaynakça yok');
    await c.say('Raporlar okununca görülüyor: üçüncü raporda kaynakça yok.');
    await bulgu(oku, 115, '2. ve 3. rapor: iş bölümü yok');
    await c.say('İkinci ve üçüncü raporlarda iş bölümü de yazılmamış.');
    const kars = blok(220, 'Karşılaştır');
    kars.style.opacity = 1;
    await bulgu(kars, 230, '2. ve 3. rapor: aynı fotoğraflar');
    await c.say('Raporlar karşılaştırılınca ikinci ve üçüncüdeki hayvan fotoğraflarının aynı olduğu görülüyor.');
    await bulgu(kars, 305, 'Anket sonuçları birbirine zıt');
    await c.say('Anket sonuçları ise zıt: birinde herkes hayvanların kapatılmasını doğru, ötekinde yanlış buluyor.');
    await c.choice({ tag: 'Uygula', q: 'İki raporda aynı fotoğraflar var. Bu karşılaştırmadan hangi bilgiye ulaşılır?',
      options: ['Üçüncü grup fotoğrafları ikinci gruptan almıştır.', 'İkinci grup fotoğrafları üçüncü gruptan almıştır.', 'En az bir grup, fotoğrafları kendisi çekmemiştir.'], answer: 2,
      hints: ['Tersi de olabilir; karşılaştırma kimin kimden aldığını göstermez.', 'Tersi de olabilir; ikisi de başka bir yerden almış olabilir.', ''],
      right: 'Karşılaştırma fotoğrafların aynı olduğunu gösterir; kimin çektiğini göstermez.' });
    await sil(c, oku);
    const sor = blok(30, 'Soru sor');
    await K.belir(c, sor, 300);
    await bulgu(sor, 78, 'Fotoğrafları kim çekti?', IKINCI);
    await c.say('Kimin çektiğini öğrenmek için başka bir araca gerek var.');
    c.note('<b>Her araç ayrı bir bilgi verir.</b><br>Karşılaştırma: aynı fotoğraf. Kimin çektiği: sorulur.', 'Bilgiye ulaşma');
  }

  /* ---- Sahne 3 · Doğrula ---- */
  async function dogrula(c) {
    const s = c.svg(1000, 562);
    await K.belir(c, K.kart(c, s, 150, 20, 700, 170, 'Doğrulama', ['Bilgiyi farklı ve güvenilir', 'bir kaynakla karşılaştırmak'], { renk, altSize: 26 }));
    await c.say('Bir bilgiyi doğrulamak, onu farklı ve güvenilir bir kaynakla karşılaştırmaktır.',
      { speak: 'Bir bilgiyi doğrulamak, [short pause] onu farklı ve güvenilir bir kaynakla karşılaştırmaktır.' });
    let g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 50, 230, 400, 180, 'Rapor', ['“Dört kişilik grubun', 'ortak çalışması”'], { renk: IKINCI, altSize: 26 }));
    await c.say('İkinci grubun raporu, dört üyenin ortak çalışması olarak teslim edilmişti.');
    const sunum = c.S('g', {}, g);
    K.yazi(c, sunum, 500, 340, '≠', { size: 54, renk: KOTU });
    K.kart(c, sunum, 550, 230, 400, 180, 'Sunumdaki sorular', ['İki üye hiç', 'görev almamış'], { renk: KOTU, altSize: 26 });
    await K.belir(c, sunum);
    await c.say('Sunumda sınıf gruba sorular sordu: iki üye hiçbir aşamada görev almamıştı.');
    await c.say('Rapor tek başına yanıltıyordu; ikinci bir kaynak gerçeği ortaya çıkardı.',
      { speak: '[thoughtful] Rapor tek başına yanıltıyordu; ikinci bir kaynak gerçeği ortaya çıkardı.' });
    await sil(c, g);

    g = c.S('g', {}, s);
    K.kart(c, g, 50, 215, 400, 135, '2. rapor', ['Herkes: “doğru”'], { renk: IKINCI, altSize: 26 });
    K.kart(c, g, 550, 215, 400, 135, '3. rapor', ['Herkes: “yanlış”'], { renk: IKINCI, altSize: 26 });
    K.yazi(c, g, 500, 300, '≠', { size: 54, renk: KOTU });
    const ucuncu = K.kart(c, g, 300, 380, 400, 135, 'Farklı kaynak', ['?'], { renk, altSize: 26 });
    await K.belir(c, g);
    await c.say('Anket sonuçlarında ise iki rapor birbiriyle çelişiyor.');
    await c.choice({ tag: 'Uygula', q: 'İkinci raporda herkes “doğru”, üçüncü raporda herkes “yanlış” demiş. Hangisinin doğru olduğu nasıl anlaşılır?',
      options: ['İkisinin ortalaması alınır.', 'Raporların dışında bir kaynağa bakılır: doldurulmuş anket formları gibi.', 'Önce teslim edilen rapor doğru sayılır.'], answer: 1,
      hints: ['Ortalama, iki sonuçtan hangisinin gerçek olduğunu söylemez.', '', 'Teslim sırası verinin doğruluğunu göstermez.'],
      right: 'İki rapor çelişiyorsa üçüncü, farklı bir kaynak gerekir.' });
    yaz(ucuncu, 'Doldurulmuş anket formları');
    await c.wait(1200);
    await sil(c, g);
    g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 200, 250, 600, 170, 'Henüz doğrulanamadı', ['Fotoğrafları kim çekti?'], { renk: IKINCI, altSize: 26 }));
    await c.say('Doğrulanamayan bilgi de olur: fotoğrafları kimin çektiği hâlâ bilinmiyor.');
    c.note('<b>Doğrulama: bilgiyi farklı, güvenilir bir kaynakla karşılaştır.</b><br>Rapor: dört kişi ↔ sunum: iki kişi', 'Doğrulama');
  }

  /* ---- Sahne 4 · Kaydet ---- */
  async function kaydet(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    K.yazi(c, g, 310, 60, 'Bulgu', { size: 28, renk });
    K.yazi(c, g, 780, 60, 'Kaynak', { size: 28, renk });
    const satir = (i) => {
      const y = 90 + i * 125;
      K.kutu(c, g, 40, y, 540, 100, { rx: 10 }); K.kutu(c, g, 600, y, 360, 100, { rx: 10 });
      const a = K.yazi(c, g, 310, y + 60, '', { size: 26 }), b = K.yazi(c, g, 780, y + 60, '', { size: 26 });
      return (m1, m2) => { a.textContent = m1; b.textContent = m2; };
    };
    const r1 = satir(0), r2 = satir(1), r3 = satir(2);
    await K.belir(c, g);
    await c.say('Son adım kayıttır: bulunan her etik sorun, kaynağıyla birlikte yazılır.');
    r1('3. raporda kaynakça yok', 'Raporun kendisi');
    await c.say('Örnek: üçüncü raporda kaynakça yok; bilginin kaynağı raporun kendisi.');
    r2('2. grupta iki üye çalışmamış', 'Sunumdaki cevaplar');
    await c.say('İkinci grupta iki üye çalışmamış; kaynağı, sunumda verilen cevaplar.');
    await c.say('Emin olunamayan bilgi, emin olunmadığı belirtilerek yazılır.');
    await c.choice({ tag: 'Uygula', q: 'Fotoğraflarla ilgili hangi kayıt doğrudur?',
      options: ['“Üçüncü grup fotoğrafları kopyalamıştır.”', '“Fotoğraflarda sorun yoktur.”', '“İki raporda aynı fotoğraflar var; kimin çektiği belirlenemedi.”'], answer: 2,
      hints: ['Kimin kopyaladığı doğrulanmadı; kayıt bilinenden fazlasını söylüyor.', 'Aynı fotoğrafın iki raporda olması bir sorundur.', ''],
      right: 'Kayıt, bilineni de bilinmeyeni de olduğu gibi yazar.' });
    r3('Aynı fotoğraflar; çeken belirsiz', 'Raporların karşılaştırması');
    await c.choice({ tag: 'Uygula', q: 'Hangi kayıt eksiktir?',
      options: ['“Üçüncü raporda kaynakça yok. Kaynak: raporun kendisi.”', '“İkinci grupta iki üye çalışmamış.”', '“Fotoğraflar aynı. Kaynak: iki raporun karşılaştırması.”'], answer: 1,
      hints: ['Bulgu da kaynağı da yazılmış: raporun kendisi.', '', 'Bulgu da kaynağı da yazılmış: iki raporun karşılaştırması.'],
      right: 'Bilginin nereden öğrenildiği yazılmamış; okuyan bunu doğrulayamaz.' });
    await c.say('Kaynağı yazılı bir kaydı, okuyan herkes kendisi de doğrulayabilir.');
    c.note('<b>Kayıt: bulgu + bilginin kaynağı.</b><br>Emin olmadığını da yaz: “çeken belirsiz”.', 'Kayıt');
  }

  Ders.start({
    id: 'yasam-c2', kicker: 'Konu C · Bilim etiği', title: 'Etik iddiasını doğrula, kaydet', accent: renk, back: 'index.html',
    intro: { title: 'Etik iddiasını doğrula, kaydet', hook: 'İki raporda aynı fotoğraf var. Kimin çektiğini nasıl anlarsın?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Üç araç', goal: 'Aranan bilgiye göre araç seç.', run: araclar },
      { title: 'Bilgiye ulaş', goal: 'Aracın verdiği bilgiyi ayır.', run: ulas },
      { title: 'Doğrula', goal: 'Bilgiyi farklı kaynakla sına.', run: dogrula },
      { title: 'Kaydet', goal: 'Bulguyu kaynağıyla yaz.', run: kaydet },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'İki raporda aynı fotoğrafların bulunduğu hangi araçla anlaşılır?',
        options: ['Raporları karşılaştırarak', 'Kaynakçayı okuyarak', 'Ziyaretçilere anket yaparak'], answer: 0,
        why: ['Aynılık, iki rapor yan yana konunca görülür.', 'Kaynakça fotoğrafların aynı olduğunu göstermez.', 'Anket ziyaretçilerin görüşünü verir, fotoğrafları değil.'], scene: 0 },
      { q: 'Bir raporda “Herkes eşit çalıştı.” yazıyor. Bu bilgi nasıl doğrulanır?',
        options: ['Raporu bir kez daha okuyarak', 'Raporun uzunluğuna bakarak', 'Grup üyelerine ayrı ayrı sorarak'], answer: 2,
        why: ['Aynı kaynak aynı şeyi söyler; farklı bir kaynak gerekir.', 'Uzunluk kimin çalıştığını göstermez.', 'Farklı bir kaynak, rapordaki bilgiyi sınar.'], scene: 2 },
      { q: 'Bir grubun raporunda “Fideler gölgede daha hızlı büyüdü.” yazıyor. Bu bilgiyi doğrulamak için hangisi uygundur?',
        options: ['Raporu bir arkadaşa yüksek sesle okutmak', 'Fidelerin boyunu her gün ölçen ayrı bir deney defterine bakmak', 'Cümlenin raporda kalın yazılmış olmasına bakmak'], answer: 1,
        why: ['Okuyan değişse de kaynak aynı rapordur; farklı bir kaynak gerekir.', 'Rapordan ayrı ve güvenilir bir kayıt, bilgiyi sınar.', 'Yazı biçimi bilginin doğru olduğunu göstermez.'], scene: 2 },
      { q: 'Bir öğrenci “Rapor çok ayrıntılı ve düzenli yazılmış; öyleyse içindeki her bilgi doğrudur.” diyor. Hangisi doğrudur?',
        options: ['Haksız; bilgiyi raporun dışındaki güvenilir bir kaynakla karşılaştırmak gerekir.', 'Haklı; ayrıntılı yazılmış rapor kendi bilgisini doğrulamış olur.', 'Haksız; ayrıntılı yazılmış rapor her zaman yanlış bilgi taşır.'], answer: 0,
        why: ['Rapor tek başına yanıltabilir; doğrulama farklı ve güvenilir bir kaynakla yapılır.', 'Rapor kendi kendini doğrulayamaz; aynı kaynak aynı şeyi söyler.', 'Ayrıntılı rapor yanlış olmak zorunda değildir; bilgi farklı bir kaynakla sınanır.'], scene: 2 },
    ], summary: ['<b>Önce doğrula, sonra kaydet.</b>', 'Araç seç, bilgiye ulaş, farklı kaynakla doğrula, kaynağıyla yaz.'],
    nextLesson: { href: 'c3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
