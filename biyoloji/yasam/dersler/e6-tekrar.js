/* E6 — Konu tekrarı: İnorganik moleküller
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi. */
(() => {
  'use strict';
  const K = KIT, renk = K.renkler.E, IKINCI = 'var(--c2)', YESIL = 'var(--c3)', SOLUK = 'var(--muted)';

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = () => { const g = c.S('g', {}, svg); g.style.opacity = 0; return g; };
    const gizli = (el) => { el.style.opacity = 0; return el; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), K.belir(c, el, 400)]);

    // Küçük molekül (E1)
    const g1 = yeni();
    K.yazi(c, g1, 500, 100, 'Su ve mineraller', { size: 42, kalin: 700, renk });
    K.kart(c, g1, 30, 170, 300, 200, 'Sindirilmez', ['çok küçüktür'], { renk });
    K.kart(c, g1, 350, 170, 300, 200, 'Enerji vermez', ['yakıt değildir'], { renk });
    K.kart(c, g1, 670, 170, 300, 200, 'Zardan geçer', ['doğrudan'], { renk });
    await goster(g1, 'Su ve mineraller sindirilmez; küçük olduklarından zardan doğrudan geçer.');
    await c.say('Hücresel solunumda yakıt olarak kullanılmaz, bu yüzden enerji vermezler.');
    c.note('<b>Su ve mineraller sindirilmez, enerji vermez.</b><br>Küçük oldukları için hücre zarından doğrudan geçerler.', 'Küçük molekül', 'yasam-kucuk-molekul');
    await sil(g1);

    // Dışarıdan alınır, yapıya katılır, düzenler (E1)
    const g2 = c.S('g', {}, svg);
    const k1 = gizli(K.kart(c, g2, 30, 150, 300, 220, 'Dışarıdan alınır', ['üretilemez'], { renk }));
    const k2 = gizli(K.kart(c, g2, 350, 150, 300, 220, 'Yapıya katılır', ['kemik ve diş'], { renk }));
    const k3 = gizli(K.kart(c, g2, 670, 150, 300, 220, 'Düzenler', ['kas, sinir,', 'sıcaklık'], { renk: IKINCI }));
    await goster(k1, 'Mineralleri hiçbir canlı üretemez; su da dışarıdan alınır.');
    await goster(k2, 'Su hücrenin büyük bölümünü oluşturur, kalsiyum kemiğe katılır.');
    await goster(k3, 'Su sıcaklığı dengeler; mineraller kas ve sinirde görev alır.');
    c.note('<b>Su ve mineraller yapıya katılır ve düzenler.</b><br>Canlı ikisini de dışarıdan alır.', 'İnorganik moleküller', 'yasam-inorganik-molekuller');
    await sil(g2);

    // Kohezyon ve adezyon (E2)
    const g3 = c.S('g', {}, svg);
    const c1 = gizli(K.kart(c, g3, 110, 130, 360, 210, 'Kohezyon', ['su – su çekimi', 'damla dağılmaz'], { renk }));
    const c2 = gizli(K.kart(c, g3, 530, 130, 360, 210, 'Adezyon', ['su – başka madde', 'yaprağa tutunur'], { renk: IKINCI }));
    const alt = gizli(K.yazi(c, g3, 500, 450, 'Bitkide su iki çekimle yükselir', { size: 30, kalin: 700, renk: YESIL }));
    await goster(c1, 'Kohezyon, su moleküllerinin birbirini çekmesidir; damla bu yüzden dağılmaz.');
    await goster(c2, 'Adezyon, suyun başka maddeye tutunmasıdır; damla yaprağa böyle tutunur.');
    await goster(alt, 'Bitkide su, bu iki çekimle köklerden yapraklara yükselir.');
    c.note('<b>Kohezyon: su–su çekimi. Adezyon: su–başka madde çekimi.</b><br>Damla dağılmaz, yaprağa tutunur.', 'Kohezyon ve adezyon', 'yasam-kohezyon-ve-adezyon');
    await sil(g3);

    // Yüzey gerilimi (E2)
    const g4 = c.S('g', {}, svg);
    const b1 = [K.yazi(c, g4, 500, 110, 'Yüzey gerilimi', { size: 44, kalin: 700, renk }), K.yazi(c, g4, 500, 200, 'su yüzeyi görünmez bir film gibi', { size: 30 })].map(gizli);
    const b2 = [K.yazi(c, g4, 500, 380, 'Kohezyon > adezyon', { size: 36, kalin: 700, renk: YESIL }), K.yazi(c, g4, 500, 440, 'küçük böcek batmadan yürür', { size: 28, renk: SOLUK })].map(gizli);
    const b3 = gizli(K.yazi(c, g4, 500, 280, 'dolu bardak taşmadan kabarır', { size: 30 }));
    const hepsi = (els) => c.tween(400, (e) => els.forEach((el) => { el.style.opacity = e; }));
    await Promise.all([c.say('Su yüzeyi görünmez bir film gibi davranır; buna yüzey gerilimi denir.'), hepsi(b1)]);
    await Promise.all([c.say('Kohezyon adezyondan büyük olduğu için yüzey küçük böceği taşır.'), hepsi(b2)]);
    await goster(b3, 'Dolu bardağın kabaran yüzeyini de kohezyon tutar.');
    c.note('<b>Yüzey gerilimi: su yüzeyi görünmez bir film gibi davranır.</b><br>Küçük böcek batmadan yürür.', 'Yüzey gerilimi', 'yasam-yuzey-gerilimi');
    await sil(g4);

    // Suyun katkıları (E3)
    const g5 = c.S('g', {}, svg);
    K.yazi(c, g5, 500, 90, 'Suyun katkıları', { size: 34, kalin: 700 });
    const s1 = gizli(K.kart(c, g5, 30, 150, 300, 210, 'Çözücü', ['maddeleri çözer', 'taşımayı sağlar'], { renk }));
    const s2 = gizli(K.kart(c, g5, 350, 150, 300, 210, 'Isı kapasitesi', ['yüksek: değişime', 'direnç gösterir'], { renk }));
    const s3 = gizli(K.kart(c, g5, 670, 150, 300, 210, 'Buz', ['yoğunluğu düşük', 'yüzeyde kalır'], { renk: IKINCI }));
    await goster(s1, 'Su çözücüdür; bu özellik besin ve mineral taşınmasına katkı sağlar.');
    await goster(s2, 'Yüksek ısı kapasitesi, ani sıcaklık değişimine direnç sağlar.');
    await goster(s3, 'Buzun yoğunluğu sudan düşüktür; yüzeyde kalır ve altındaki yaşamı korur.');
    c.note('<b>Su çözer, taşır, sıcaklık değişimine direnç gösterir.</b><br>Buz yüzeyde kalır, altındaki yaşamı korur.', 'Suyun katkıları', 'yasam-suyun-katkilari');
    await sil(g5);

    // Mineral görevleri (E4)
    const g6 = c.S('g', {}, svg);
    const satir = (i, ad, is, r) => {
      const g = c.S('g', {}, g6), y = 90 + i * 85;
      g.style.opacity = 0;
      K.yazi(c, g, 110, y, ad, { size: 30, kalin: 700, hiza: 'start', renk: r });
      K.ok(c, g, 480, y - 10, 560, y - 10, r);
      K.yazi(c, g, 590, y, is, { size: 30, hiza: 'start' });
      return g;
    };
    const m = [satir(0, 'Kemik ve diş', 'Ca, P, F', renk), satir(1, 'Sinir, su dengesi', 'Na, K, Cl', renk),
      satir(2, 'Oksijen taşınması', 'Fe', IKINCI), satir(3, 'Tiroksin üretimi', 'I', IKINCI),
      satir(4, 'Enzimler', 'Mg, Zn', YESIL), satir(5, 'Protein sentezi', 'S', YESIL)];
    await Promise.all([c.say('Kemik ve dişte kalsiyum, fosfor, flor; sinirde sodyum, potasyum, klor.'), hepsi(m.slice(0, 2))]);
    await Promise.all([c.say('Demir oksijen taşır; iyot tiroksin üretimi için gereklidir.'), hepsi(m.slice(2, 4))]);
    await Promise.all([c.say('Magnezyum ve çinko enzimlerde, kükürt protein sentezinde görev alır.'), hepsi(m.slice(4))]);
    c.note('<b>Her mineralin kendi görevi vardır.</b><br>Kemik: Ca, P, F. Sinir: Na, K, Cl. Kan: Fe. Tiroksin: I. Enzim: Mg, Zn. Protein: S.', 'Mineral görevleri', 'yasam-mineral-gorevleri');
    await sil(g6);

    // Eksiklik ve dengeli beslenme (E5)
    const g7 = c.S('g', {}, svg);
    const e1 = gizli(K.yazi(c, g7, 500, 95, 'Mineral eksikse görevi aksar', { size: 38, kalin: 700, renk }));
    const eksik = (i, ad, is) => {
      const g = c.S('g', {}, g7), y = 200 + i * 75;
      g.style.opacity = 0;
      K.yazi(c, g, 200, y, ad, { size: 30, kalin: 700, hiza: 'start', renk: IKINCI });
      K.ok(c, g, 400, y - 10, 480, y - 10, IKINCI);
      K.yazi(c, g, 510, y, is, { size: 30, hiza: 'start' });
      return g;
    };
    const e2 = [eksik(0, 'Demir', 'kansızlık'), eksik(1, 'İyot', 'basit guatr'), eksik(2, 'Flor', 'diş çürüğü')];
    const e3 = [K.yazi(c, g7, 500, 450, 'Çeşitli beslenme riski azaltır', { size: 34, kalin: 700, renk: YESIL }), K.yazi(c, g7, 500, 500, 'süt ürünü, et, sebze, tahıl', { size: 26, renk: SOLUK })].map(gizli);
    await goster(e1, 'Bir mineral eksik kalırsa onun görevi aksar.');
    await Promise.all([c.say('Demir eksikse kansızlık, iyot eksikse basit guatr, flor eksikse diş çürüğü.'), hepsi(e2)]);
    await Promise.all([c.say('Mineraller farklı besinlere dağılmıştır; çeşitli beslenme eksiklik riskini azaltır.'), hepsi(e3)]);
    c.note('<b>Mineral eksikse görevi aksar.</b><br>Demir: kansızlık. İyot: basit guatr. Flor: diş çürüğü. Çeşitli beslenme eksiklik riskini azaltır.', 'Eksiklik ve beslenme', 'yasam-eksiklik-ve-beslenme');
    await c.say('Şimdi beş dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'yasam-e6', kicker: 'Konu E · İnorganik moleküller', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: İnorganik moleküller',
      hook: 'Beş dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Beş dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Mina bir kâğıt klibi su yüzeyine dikkatle bırakıyor ve klip batmıyor. Bunu hangisi açıklar?',
        options: ['Su molekülleri yalnızca klibe tutunur; birbirini çekmez.', 'Su ile klip arasındaki çekim, su molekülleri arasındaki çekimden büyüktür.', 'Su molekülleri birbirini güçlü çektiği için yüzey, klibi taşıyan bir film gibi davranır.'], answer: 2,
        why: ['Su molekülleri birbirini de çeker; yüzeyi taşıyan bu kohezyondur.', 'Böyle olsaydı yüzey klibi taşıyamazdı; kohezyon adezyondan büyüktür.', 'Kohezyon yüzeyi görünmez bir film gibi tutar; buna yüzey gerilimi denir.'], scene: 0,
      },
      {
        q: 'Hasan her öğünde yalnızca et, yumurta ve ekmek yiyor. Potasyum alması için tabağına ne eklemelidir?',
        options: ['Meyve ve sebze', 'Bir dilim ekmek daha', 'Bir yumurta daha'], answer: 0,
        why: ['Meyve ve sebzeler potasyum sağlar.', 'Ekmek bir tahıl ürünüdür; potasyum meyve ve sebzelerde bulunur.', 'Yumurta demir ve çinko sağlar; potasyum meyve ve sebzelerdedir.'], scene: 0,
      },
      {
        q: 'Mineral bakımından çok yoksul bir toprağa dikilen bir fide için hangisi söylenir?',
        options: ['Mineralleri kendi bünyesinde üretir, bu yüzden etkilenmez.', 'Mineralleri topraktan çözünmüş olarak alır; toprakta az olunca eksik kalır.', 'Mineral kullanmaz; mineraller yalnızca hayvanlar için gereklidir.'], answer: 1,
        why: ['Hiçbir canlı mineralleri kendi bünyesinde üretemez.', 'Bitkiler gerekli mineralleri topraktan çözünmüş olarak alır.', 'Bitkiler de mineral alır ve onlara ihtiyaç duyar.'], scene: 0,
      },
      {
        q: 'Atıştırmalık olarak ceviz yiyen biri hangi mineralden almış olur; bu mineral ne iş görür?',
        options: ['Flor; kemik ve diş yapısını korur', 'Sodyum; sinir sistemi ve su dengesinde görev alır', 'Magnezyum; enzimlerin çalışmasında görev alır'], answer: 2,
        why: ['Flor çayda, balıkta ve içme suyunda bulunur; cevizde değil.', 'Sodyum tuzda, ekmekte ve maden suyunda bulunur.', 'Ceviz magnezyum içerir; magnezyum enzimlerin çalışmasında görev alır.'], scene: 0,
      },
      {
        q: 'Yazın hava aniden ısınsa da bir gölün suyu birdenbire ısınmaz. Bu, suyun hangi özelliğiyle açıklanır?',
        options: ['Birçok maddeyi çözebilmesiyle', 'Sıcaklık değişimine direnç göstermesiyle', 'Katı hâlinin yoğunluğunun düşük olmasıyla'], answer: 1,
        why: ['Çözücülük maddelerin suya karışmasıyla ilgilidir; sıcaklık değişimini açıklamaz.', 'Yüksek ısı kapasitesi, ani sıcaklık değişimine direnç sağlar.', 'Bu özellik buzun yüzeyde kalmasını açıklar; ısınmayla ilgili değildir.'], scene: 0,
      },
      {
        q: 'Bir ağacın gövdesindeki ince borularda su molekülleri yukarı çıkarken birbirinden kopmaz. Bu bağı hangi çekim sağlar?',
        options: ['Kohezyon: su molekülleri birbirini çeker.', 'Adezyon: su molekülleri birbirini çeker.', 'Kohezyon: su molekülleri çepere tutunur.'], answer: 0,
        why: ['Su moleküllerinin birbirini çekmesinin adı kohezyondur.', 'Su molekülleri arasındaki çekim adezyon değil, kohezyondur.', 'Suyun çepere tutunması adezyondur; kohezyon değil.'], scene: 0,
      },
      {
        q: 'Berk sık sık kas kramplarından yakınıyor ve kusuyor. Hangi mineralin eksik olduğu düşünülür?',
        options: ['Demir', 'Çinko', 'Klor'], answer: 2,
        why: ['Demir eksikliğinde kansızlık ve çabuk yorulma görülür.', 'Çinko eksikliğinde bağışıklık zayıflar.', 'Klor eksikliğinde kas krampları ve kusma görülür.'], scene: 0,
      },
      {
        q: 'Uzun bir yürüyüşe çıkan Mert’in enerji ihtiyacını hangisi karşılar?',
        options: ['Karbonhidrat ve yağ içeren besinler', 'Bol miktarda içtiği su', 'Mineral içeren tabletler'], answer: 0,
        why: ['Karbonhidrat ve yağ gibi organik besinler hücresel solunumda yakıt olarak kullanılır.', 'Su enerji vermez; hücresel solunumda yakıt olmaz.', 'Mineraller enerji vermez; yaşamsal işlevleri düzenler.'], scene: 0,
      },
      {
        q: 'Bir öğrenci tuzun ve şekerin suda çözünmesini karşılaştıracak. Hangi düzen karşılaştırmayı korur?',
        options: ['Tuzlu bardağa daha çok, şekerli bardağa daha az su koymak', 'Birini soğuk, ötekini sıcak suyla hazırlamak', 'İki bardağa eşit miktarda su ve eşit miktarda madde koymak'], answer: 2,
        why: ['Su miktarı farklı olursa sonuçlar karşılaştırılamaz.', 'Sıcaklık farklı olursa fark sıcaklıktan da gelebilir; koşullar eşit olmalıdır.', 'Eşit miktar ve eşit koşul, karşılaştırmayı korur.'], scene: 0,
      },
      {
        q: 'Vücutta proteinlerin yapımında görev alan mineral, hangi besinle alınır?',
        options: ['Çinko; kabak çekirdeği', 'Kükürt; et ve deniz ürünleri', 'Klor; sofra tuzu'], answer: 1,
        why: ['Çinko bağışıklıkta ve enzimlerde görev alır; protein sentezi kükürtün işidir.', 'Kükürt protein sentezinde görev alır; et ve deniz ürünlerinde bulunur.', 'Klor sıvı dengesinde ve sindirimde görev alır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Su ve mineraller sindirilmez, enerji vermez, dışarıdan alınır;</b> yapıya katılır ve düzenler.',
      '<b>Su kohezyonla suya, adezyonla başka maddeye tutunur;</b> çözer, taşır, sıcaklık değişimine direnir.',
      '<b>Her mineralin kendi görevi vardır;</b> çeşitli beslenme eksiklik riskini azaltır.',
    ],
    nextLesson: { href: 'f1-kur-ve-sok.html', label: 'Sonraki konu: Organik moleküller ›' },
  });
})();
