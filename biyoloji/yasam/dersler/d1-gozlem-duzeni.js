/* D1 · BİY.9.1.4 · Yazar notu: içerik MEB Biyoloji 9 s. 40 (3. Etkinlik "Çevremizdeki Canlılar": bir hayvan ve bir bitki,
   üç gün, gözlem tablosunun dört satırı, gözlemlenen (+) ve gözlemlenemeyen (−) işareti) ve s. 33 (menekşe ve tavşan
   görselleri). Elif'in üç günlük gözlemi bu düzeni gösteren kurgu bir öyküdür. Anlatım 8 Ekim 2026'da baştan yazıldı
   (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): gözlemin nasıl yapıldığı önce anlatılır, soru sonra gelir. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.D, HAYVAN = 'var(--c2)', BITKI = 'var(--c4)', SOLUK = 'var(--muted)';
  const OZELLIK = ['Beslenme', 'Üreme', 'Büyüme ve gelişme', 'Uyarılara tepki'];
  const SUTUN = [350, 450, 550, 690, 790, 890];   // hücre merkezleri: tavşan 1–3. gün, menekşe 1–3. gün
  const UST = 150, YUKSEKLIK = 80;                 // ilk satırın üstü ve satır yüksekliği
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());

  /* Artı ve eksi çizgiyle çizilir (yazı değil): artı = gözlemlendi, eksi = gözlemlenemedi. */
  function isaret(c, p, x, y, tur) {
    const g = c.S('g', {}, p), renk = tur === '+' ? R : SOLUK;
    c.S('line', { x1: x - 15, y1: y, x2: x + 15, y2: y, stroke: renk, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    if (tur === '+') c.S('line', { x1: x, y1: y - 15, x2: x, y2: y + 15, stroke: renk, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
    return g;
  }

  /* Gözlem tablosu: dört özellik satırı, iki canlı için üçer gün sütunu. */
  function tablo(c, s) {
    const g = c.S('g', {}, s);
    const vurgu = c.S('rect', { x: 28, y: UST, width: 924, height: YUKSEKLIK, rx: 8, fill: R, opacity: 0 }, g);
    const izgara = c.S('g', {}, g), satirlar = c.S('g', {}, g), sutunlar = c.S('g', {}, g), aciklama = c.S('g', {}, g), isaretler = c.S('g', {}, g);
    OZELLIK.forEach((ad, i) => {
      const y = UST + i * YUKSEKLIK;
      SUTUN.forEach((x) => K.kutu(c, izgara, x - 50, y, 100, YUKSEKLIK, { rx: 0, fill: 'none' }));
      K.yazi(c, satirlar, 40, y + 49, ad, { size: 26, hiza: 'start' });
    });
    K.yazi(c, sutunlar, 450, 72, 'Tavşan', { size: 28, renk: HAYVAN });
    K.yazi(c, sutunlar, 790, 72, 'Menekşe', { size: 28, renk: BITKI });
    K.yazi(c, sutunlar, 40, 124, 'Gün', { size: 24, renk: SOLUK, hiza: 'start' });
    SUTUN.forEach((x, k) => K.yazi(c, sutunlar, x, 124, `${(k % 3) + 1}.`, { size: 24, renk: SOLUK }));
    isaret(c, aciklama, 315, 512, '+'); K.yazi(c, aciklama, 342, 521, 'gözlemlendi', { size: 24, hiza: 'start' });
    isaret(c, aciklama, 585, 512, '-'); K.yazi(c, aciklama, 612, 521, 'gözlemlenemedi', { size: 24, hiza: 'start', renk: SOLUK });
    return {
      g, satirlar, sutunlar, aciklama,
      koy: (sutun, satir, tur) => isaret(c, isaretler, SUTUN[sutun], UST + satir * YUKSEKLIK + YUKSEKLIK / 2, tur),
      vurgula: (satir) => { vurgu.setAttribute('y', UST + satir * YUKSEKLIK); return c.tween(350, (e) => vurgu.setAttribute('opacity', 0.16 * e)); },
    };
  }
  /* Bir satırdaki hücreleri topluca doldurur: desen 6 karakterdir, boşluk "henüz yazılmadı" demektir. */
  function doldur(t, satir, desen) {
    return [...desen].map((tur, sutun) => (tur === ' ' ? null : t.koy(sutun, satir, tur))).filter(Boolean);
  }

  /* ---- Sahne 1 · İki canlı, üç gün ---- */
  async function sec(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const tavsan = K.resim(c, g, 'tavsan.webp', 90, 40, 350, 200), menekse = K.resim(c, g, 'menekse.webp', 560, 40, 350, 200);
    menekse.style.opacity = 0;
    await K.belir(c, tavsan);
    await c.say('Elif, canlıların ortak özelliklerini kendi gözleriyle görmek istiyor.', { speak: '[curious] Elif, canlıların ortak özelliklerini kendi gözleriyle görmek istiyor.' });
    await K.belir(c, menekse);
    await c.say('Gözlemek için tavşanını ve saksıdaki menekşeyi seçiyor.');
    const adlar = c.S('g', {}, g);
    K.yazi(c, adlar, 265, 282, 'Tavşan (hayvan)', { size: 28, renk: HAYVAN }); K.yazi(c, adlar, 735, 282, 'Menekşe (bitki)', { size: 28, renk: BITKI });
    await K.belir(c, adlar, 350);
    await c.say('Biri hayvan, biri bitki; ikisinde de görülen özellik ortaktır.');
    const tanim = K.yazi(c, g, 500, 400, 'Gözlem: duyularla ya da basit araçlarla bilgi toplama', { size: 28, renk: R });
    await K.belir(c, tanim, 350);
    await c.say('Gözlem, duyularla ya da basit araçlarla dikkatli bilgi toplamaktır.');
    await sil(c, tanim);
    const gunler = c.S('g', {}, g);
    [0, 1, 2].forEach((i) => K.kart(c, gunler, 80 + i * 295, 340, 250, 80, `${i + 1}. gün`, [], { renk: R, size: 28 }));
    await K.belir(c, gunler);
    await c.say('Elif iki canlıyı üç gün boyunca gözleyecek.');
    const saatler = c.S('g', {}, g);
    [0, 1, 2].forEach((i) => K.yazi(c, saatler, 205 + i * 295, 468, 'sabah, akşam', { size: 26 }));
    await K.belir(c, saatler, 350);
    await c.say('Gözlem düzenli aralıklarla yapılır: her sabah ve her akşam bakacak.');
    await c.say('Aralıklar düzenli olunca günlerin kayıtları birbiriyle karşılaştırılabilir.');
    await c.choice({ tag: 'Uygula', q: 'Arda da iki canlı gözleyecek. Hangi plan düzenli bir gözlemdir?',
      options: ['İlk gün beş kez bakmak, sonraki günler hiç bakmamak', 'Aklına geldikçe bakmak', 'Üç gün boyunca her gün aynı saatlerde bakmak'], answer: 2,
      hints: ['Gözlem tek güne sıkışırsa öteki günlerle karşılaştırılamaz.', 'Aklına geldikçe bakınca aralıklar düzenli olmaz.', ''],
      right: 'Aralıklar eşit olunca üç günün kayıtları karşılaştırılabilir.' });
    c.note('<b>Gözlem düzenli aralıklarla yapılır.</b><br>Üç gün, her sabah ve her akşam.', 'Gözlem düzeni');
  }

  /* ---- Sahne 2 · Gözlem tablosu ---- */
  async function kayit(c) {
    const s = c.svg(1000, 562), t = tablo(c, s);
    t.sutunlar.style.opacity = 0; t.aciklama.style.opacity = 0;
    await K.belir(c, t.g);
    await c.say('Elif gördüklerini bir gözlem tablosuna işleyecek.');
    await c.say('Satırlara, bakacağı dört canlılık özelliğini yazdı.');
    await K.belir(c, t.sutunlar);
    await c.say('Sütunlar günleri gösteriyor: her canlı için üç gün.');
    await K.belir(c, t.aciklama);
    await c.say('Özelliği gördüğü güne artı, göremediği güne eksi koyacak.');
    await K.belir(c, t.koy(0, 0, '+'), 350);
    await c.say('Birinci gün tavşan önüne konan otu yedi: beslenme satırına artı.');
    await c.say('Elif gördüğünü hemen işliyor; sonraya bırakırsa ayrıntıyı unutabilir.', { speak: '[thoughtful] Elif gördüğünü hemen işliyor; sonraya bırakırsa ayrıntıyı unutabilir.' });
    await K.belir(c, t.koy(0, 3, '+'), 350);
    await c.say('Elif el çırpınca tavşan kulaklarını dikti: uyarılara tepki satırına artı.');
    await K.belir(c, t.koy(5, 3, '+'), 350);
    await c.say('İkinci gün saksıyı çevirdi; üçüncü gün yapraklar yine ışığa dönmüştü.');
    await c.choice({ tag: 'Sıra sende', q: 'Üçüncü gün menekşede yeni bir yaprak çıkmıştı. Artı hangi satıra konur?',
      options: ['Beslenme', 'Büyüme ve gelişme', 'Uyarılara tepki'], answer: 1,
      hints: ['Elif menekşenin beslendiğini görmedi; gördüğü şey yeni bir yaprak.', '', 'Tepki, bir uyarıya verilen karşılıktır; burada bir uyarı yok.'],
      right: 'Yeni yaprak, menekşenin büyüdüğünü gösterir.' });
    await K.belir(c, t.koy(5, 2, '+'), 350);
    await c.say('Yeni yaprak büyümenin işaretidir: artı, büyüme ve gelişme satırına.');
    const kalan = [t.koy(1, 0, '+'), t.koy(2, 0, '+'), t.koy(1, 3, '+'), t.koy(2, 3, '+')];
    await Promise.all(kalan.map((el) => K.belir(c, el, 350)));
    await c.say('Tavşan öteki günlerde de ot yedi ve sese tepki verdi.');
    await t.vurgula(3);
    await c.say('Uyarılara tepki iki canlıda da görüldü: bu, ortak bir özellik.');
    c.note('<b>Görülen, görüldüğü gün tabloya işlenir.</b><br>Tavşan otu yedi: beslenme satırına artı.', 'Gözlem tablosu');
  }

  /* ---- Sahne 3 · Gözlem mi, yorum mu? ---- */
  async function yorum(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 60, 110, 420, 180, 'Elif', ['“Tavşan otu yedi.”'], { renk: R }));
    await c.say('Elif defterine şunu yazmıştı: “Tavşan otu yedi.”', { speak: 'Elif defterine şunu yazmıştı: Tavşan otu yedi.' });
    await K.belir(c, K.yazi(c, g, 270, 350, 'Gözlem: görülen', { size: 28, renk: R }), 350);
    await c.say('Bunu kendi gözüyle gördü: bu bir gözlemdir.');
    await K.belir(c, K.kart(c, g, 520, 110, 420, 180, 'Arda', ['“Tavşan çok acıkmıştı.”'], { renk: HAYVAN }));
    await c.say('Arda aynı olayı şöyle yazdı: “Tavşan çok acıkmıştı.”', { speak: 'Arda aynı olayı şöyle yazdı: Tavşan çok acıkmıştı.' });
    await c.say('Açlık gözle görülmez; Arda gördüğünden bir sonuç çıkardı.', { speak: '[thoughtful] Açlık gözle görülmez; Arda gördüğünden bir sonuç çıkardı.' });
    await K.belir(c, K.yazi(c, g, 730, 350, 'Yorum: görülenden çıkarılan', { size: 28, renk: HAYVAN }), 350);
    await c.say('Görülenden çıkarılan açıklamaya yorum denir.', { speak: 'Görülenden çıkarılan açıklamaya [short pause] yorum denir.' });
    await c.say('Gözlem tablosuna görülen yazılır; yorum gözlemin yerine geçmez.');
    await sil(c, g);
    const sol = K.kart(c, s, 60, 130, 420, 230, 'Gözlem', ['?'], { renk: R }), sag = K.kart(c, s, 520, 130, 420, 230, 'Yorum', ['?'], { renk: HAYVAN });
    await Promise.all([K.belir(c, sol), K.belir(c, sag)]);
    await c.choice({ tag: 'Uygula', q: 'Menekşe için yazılan cümlelerden hangisi gözlemdir?',
      options: ['Menekşe ışığı seviyor.', 'Menekşe pencere kenarında mutlu.', 'Menekşenin yaprakları pencereye dönük.'], answer: 2,
      hints: ['Sevmek görülmez; yaprakların yönünden çıkarılmış bir yorum.', 'Mutluluk görülmez; bu bir yorum.', ''],
      right: 'Yaprakların yönü gözle görülür; cümleye yorum katılmamış.' });
    sol.remove();
    K.kart(c, s, 60, 130, 420, 230, 'Gözlem', ['Menekşenin yaprakları', 'pencereye dönük.'], { renk: R });
    await c.choice({ tag: 'Uygula', q: 'Tavşan için yazılan cümlelerden hangisi yorumdur?',
      options: ['Tavşan sesten korktu.', 'Tavşan kulaklarını dikti.', 'Tavşan kafesin köşesine gitti.'], answer: 0,
      hints: ['', 'Kulakların dikildiği gözle görülür; bu bir gözlem.', 'Tavşanın nereye gittiği gözle görülür; bu bir gözlem.'],
      right: 'Korku görülmez; görülen davranıştan çıkarılmış bir açıklamadır.' });
    sag.remove();
    K.kart(c, s, 520, 130, 420, 230, 'Yorum', ['Tavşan sesten', 'korktu.'], { renk: HAYVAN });
    await c.say('Gözlemi başkası da görüp doğrulayabilir; yorum kişiden kişiye değişebilir.');
    c.note('<b>Gözlem görüleni yazar; yorum görülenden çıkarılır.</b><br>“Otu yedi” gözlem, “acıkmıştı” yorum.', 'Gözlem ve yorum');
  }

  /* ---- Sahne 4 · Görülmeyen özellik ---- */
  async function gorulmeyen(c) {
    const s = c.svg(1000, 562), t = tablo(c, s);
    doldur(t, 0, '+++---'); doldur(t, 1, '------'); doldur(t, 2, '-----+'); doldur(t, 3, '+++--+');
    await K.belir(c, t.g);
    await c.say('Üç gün bitti; Elif göremediği her güne eksi koymuştu.');
    await t.vurgula(1);
    await c.say('Üreme satırında tek bir artı yok.');
    await c.say('Tavşan da menekşe de bu üç günde üremedi.');
    await c.say('Üreme her gün görülen bir olay değildir; üç gün bunun için kısadır.');
    await c.choice({ tag: 'Uygula', q: 'Üreme satırındaki eksilerden hangi sonuç çıkar?',
      options: ['Tavşan ve menekşe üremez.', 'Üreme bu üç günde gözlemlenemedi.', 'Elif üreme satırına bakmayı unuttu.'], answer: 1,
      hints: ['Görmemek, özelliğin olmadığını göstermez.', '', 'Elif her gün baktı; eksi, baktığı hâlde göremediğini gösterir.'],
      right: 'Eksi, özelliğin olmadığını değil, bu sürede görülmediğini gösterir.' });
    await c.say('Eksi “yok” demek değildir: özellik bu sürede görülmemiştir.', { speak: 'Eksi, yok demek değildir: özellik bu sürede görülmemiştir.' });
    await c.say('Elif iki canlının da ürediğini güvenilir bir kaynaktan doğruluyor.');
    await c.say('Tablodaki öteki eksiler de böyle okunur: görülmedi, ama yok sayılmaz.');
    await c.say('Gözlem düzenli yapılır, hemen yazılır; görülmeyen de kaydedilir.',
      { speak: 'Gözlem düzenli yapılır, hemen yazılır; [short pause] görülmeyen de kaydedilir.' });
    c.note('<b>Eksi “yok” demek değildir.</b><br>Üreme üç günde gözlemlenemedi.', 'Görülmeyen özellik');
  }

  Ders.start({
    id: 'yasam-d1', kicker: 'Konu D · Canlıların ortak özellikleri', title: 'İki canlı, üç gün: gözlem düzeni', accent: R, back: 'index.html',
    intro: { title: 'İki canlı, üç gün', hook: 'İki canlıyı üç gün gözlerken deftere ne yazarsın?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'İki canlı, üç gün', goal: 'Düzenli gözlem planını seç.', run: sec },
      { title: 'Gözlem tablosu', goal: 'Görüleni doğru satıra işle.', run: kayit },
      { title: 'Gözlem mi, yorum mu?', goal: 'Görüleni yorumdan ayır.', run: yorum },
      { title: 'Görülmeyen özellik', goal: 'Eksi işaretini doğru oku.', run: gorulmeyen },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangi cümle bir gözlemdir?', options: ['Tavşan havucu çok seviyor.', 'Tavşan havucu yedi.', 'Tavşan havucu görünce sevindi.'], answer: 1,
        why: ['Sevmek görülmez; yenen havuçtan çıkarılmış bir yorumdur.', 'Yeme olayı gözle görülür.', 'Sevinç görülmez; bu bir yorumdur.'], scene: 2 },
      { q: 'Deniz bir kaplumbağayı üç gün gözledi; ürediğini görmedi. Tabloya ne yazmalı?', options: ['Üreme bu sürede gözlemlenemedi.', 'Kaplumbağa üremez.', 'Hiçbir şey; üreme satırını silmeli.'], answer: 0,
        why: ['Eksi, özelliğin bu sürede görülmediğini gösterir.', 'Görmemek, özelliğin olmadığını göstermez.', 'Bakılan ama görülmeyen özellik de kaydedilir.'], scene: 3 },
    ], summary: ['<b>Gözlem düzenli yapılır, hemen yazılır.</b>', 'Tabloya görülen işlenir; görülmeyen özellik “gözlemlenemedi” diye kaydedilir.'],
    nextLesson: { href: 'd2-beslenme-buyume.html', label: 'Sonraki: Özellik ortak, yolu farklı ›' },
  });
})();
