/* C4 — Konu tekrarı: Açık hava basıncı
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı tahtada sırayla toplanır; ardından sekiz soru gelir.
   Senaryo: plan/fizik/akiskanlar/senaryolar/C-acik-hava-basinci.md (C4). */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, gizle, belir, par, ok } = window.KIT;
  const { HAVA, havaAlani, zemin, sivKabi, agirlikOku, olcuOku, esitX, tanecik, cerceve } = window.KIT_C;

  /* Yedi kartın yeri (sol üst köşe). Her kart 470 × 124; son kart alt satırın ortasında. */
  const YER = [[20, 14], [510, 14], [20, 152], [510, 152], [20, 290], [510, 290], [265, 428]];
  const KW = 470, KH = 124;

  /* Kartın çizim alanı 140 × 104 (kartın solunda, g'nin kendi koordinatlarıyla); yazı sağda. */

  /* 1. Havanın ağırlığı yüzeye bastırır. */
  function agirlik(c, d) {
    zemin(c, d, 6, 134, 96);
    havaAlani(c, d, { x1: 36, x2: 104, y1: 6, y2: 92, ust: 0.12, alt: 0.45, kademe: 6 });
    agirlikOku(c, d, 56, 20, 84);
    agirlikOku(c, d, 84, 20, 84);
  }

  /* 2. Sıvı sıkışmaz (sık mavi taneciklerle), hava yükseldikçe seyrelir. */
  function yogunluk(c, d) {
    cerceve(c, d, 2, 4, 62, 100, RENK.ince, { kesik: false });
    cerceve(c, d, 74, 4, 134, 100, RENK.ince, { kesik: false });
    for (let sat = 0; sat < 6; sat++) {
      for (let s = 0; s < 4; s++) tanecik(c, d, 14 + s * 15, 17 + sat * 15, RENK.sivi);
    }
    [[90, 5], [75, 4], [60, 3], [45, 3], [30, 2], [15, 1]].forEach(([y, n]) => {
      esitX(84, 124, n).forEach((x) => tanecik(c, d, x, y, HAVA.tanecik));
    });
  }

  /* 3. Derinlik ve yükseklik ölçüsü. */
  function olcu(c, d) {
    c.S('rect', { x: 6, y: 40, width: 56, height: 58, fill: RENK.sivi, 'fill-opacity': 0.55 }, d);
    cizgi(c, d, [6, 40], [62, 40], RENK.sivi, 3);
    olcuOku(c, d, 38, 44, 96, '', { etiketX: 20 });
    havaAlani(c, d, { x1: 78, x2: 134, y1: 4, y2: 98, ust: 0.1, alt: 0.4, kademe: 6 });
    olcuOku(c, d, 112, 10, 94, '', { etiketX: 94 });
  }

  /* 4. Torricelli düzeneği: dıştaki hava oku aşağı, borudaki basınç oku yukarı. */
  function torricelli(c, d) {
    const kap = sivKabi(c, d, { x1: 12, x2: 128, yUst: 76, yAlt: 100, yYuzey: 86 });
    c.S('rect', { x: 63, y: 30, width: 16, height: 62, fill: RENK.sivi, 'fill-opacity': 0.8 }, d);
    c.S('path', { d: 'M62,96 L62,6 L80,6 L80,96', fill: 'none', stroke: HAVA.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, d);
    ok(c, d, [30, 46], [30, 80], HAVA.cizgi, 4);
    ok(c, d, [110, 46], [110, 80], HAVA.cizgi, 4);
    ok(c, d, [71, 92], [71, 58], RENK.basinc, 4);
    return kap;
  }

  /* 6. Isınan hava yükselir, soğuyan hava alçalır. */
  function dolasim(c, d) {
    zemin(c, d, 6, 134, 98);
    ok(c, d, [40, 90], [40, 12], HAVA.cizgi, 5);
    ok(c, d, [100, 12], [100, 90], HAVA.cizgi, 5);
  }

  /* 7. Yüzeyde yüksek basınçtan alçak basınca ilerleyen hava (rüzgâr). */
  function ruzgar(c, d) {
    zemin(c, d, 6, 134, 98);
    [28, 52, 76].forEach((y) => ok(c, d, [128, y], [16, y], HAVA.cizgi, 5));
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const onceki = [];
    const kart = (i, cizim, satirlar) => {
      const [x, y] = YER[i];
      const g = c.S('g', { transform: `translate(${x},${y})` }, svg);
      kutu(c, g, 0, 0, KW, KH, { rx: 14 });
      if (cizim) cizim(c, c.S('g', { transform: 'translate(12,10)' }, g));
      const n = satirlar.length;
      satirlar.forEach((m, k) => yazi(c, g, 168, KH / 2 + 9 + (k - (n - 1) / 2) * 38, m, { hiza: 'start', size: 26 }));
      gizle(g);
      return g;
    };
    const kural = async (g, cumle, secenek) => {
      c.clearSay();
      await par(c.say(cumle, secenek), belir(c, g, 400), ...onceki.map((e) => belir(c, e, 400, 0.45)));
      await c.wait(400);
      onceki.push(g);
    };

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Açık hava basıncı', { size: 64, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konuda öğrendiklerimizi yedi kuralda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    const k1 = kart(0, agirlik, ['Ağırlık']);
    await kural(k1, 'Atmosferdeki gazlar, ağırlıkları nedeniyle yüzeylere açık hava basıncı uygular.');
    c.note('Hava, <b>ağırlığı yüzünden</b> yüzeylere basınç uygular.', 'Hava basıncı', 'ak-c4-agirlik');

    const k2 = kart(1, yogunluk, ['Hava seyrelir']);
    await kural(k2, 'Sıvı sıkıştırılamaz kabul edilir; havanın yoğunluğu yükseldikçe azalır.');
    c.note('Sıvı sıkışmaz; <b>havanın yoğunluğu yükseldikçe azalır</b>.', 'Hava basıncı', 'ak-c4-yogunluk');

    const k3 = kart(2, olcu, ['Derinde artar,', 'yüksekte azalır']);
    await kural(k3, 'Sıvıda derinlikle basınç artar; havada yükseklikle basınç azalır.');
    c.note('Derinlikle <b>artar</b>; yükseklikle <b>azalır</b>.', 'Basınç', 'ak-c4-olcu');

    const k4 = kart(3, torricelli, ['Hava = cıva']);
    await kural(k4, 'Torricelli düzeneğinde açık hava basıncı, cıva sütununun basıncına eşittir.');
    c.note('Açık hava basıncı = <b>cıva sütununun basıncı</b>.', 'Torricelli', 'ak-c4-torricelli');

    const k5 = kart(4, null, ['1 atm = 76 cmHg', '≈ 1,013 · 10⁵ Pa']);
    k5.querySelectorAll('text').forEach((t) => { t.setAttribute('x', KW / 2); t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', 32); });
    await kural(k5, '1 atm, 76 cmHg ve yaklaşık 1,013 · 10⁵ Pa’dır.', {
      speak: 'Bir atmosfer, yetmiş altı santimetre cıva ve yaklaşık bir virgül sıfır on üç çarpı on üzeri beş pascal’dır.',
    });
    c.note('<b>1 atm = 76 cmHg ≈ 1,013 · 10⁵ Pa</b>', 'Birimler', 'ak-c4-birim');

    const k6 = kart(5, dolasim, ['Isınan: alçak', 'Soğuyan: yüksek']);
    await kural(k6, 'Isınan hava yükselir: alçak basınç; soğuyan hava alçalır: yüksek basınç.');
    c.note('Isınan hava yükselir: <b>alçak basınç</b>. Soğuyan hava alçalır: <b>yüksek basınç</b>.', 'Hava basıncı', 'ak-c4-dolasim');

    const k7 = kart(6, ruzgar, ['Rüzgâr']);
    await kural(k7, 'Hava, yüksek basınçtan alçak basınca akar: rüzgâr oluşur.');
    c.note('Hava <b>yüksek basınçtan alçak basınca</b> akar: rüzgâr.', 'Hava basıncı', 'ak-c4-ruzgar');

    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'akiskanlar-c4', kicker: 'Konu C · Açık hava basıncı', title: 'Konu tekrarı: Açık hava basıncı', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Açık hava basıncı',
      hook: 'Üç dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları yeni durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun yedi kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Ela bir uçurumun dibinde, sonra tepesinde duruyor. Hangisinde açık hava basıncı daha büyüktür?',
        options: ['Tepesinde', 'Uçurumun dibinde', 'İkisinde de eşittir'], answer: 1,
        why: ['Yükseldikçe açık hava basıncı azalır; tepede daha küçüktür.', 'Dipte üstündeki hava sütunu daha yüksektir; açık hava basıncı daha büyüktür.', 'Yükseklik değişince açık hava basıncı da değişir; eşit olmaz.'], scene: 0,
      },
      {
        q: 'Torricelli düzeneğinde, aynı koşullarda, bu kez kıvrımlı ve kalın bir boru kullanılıyor. Cıva sütununun dikey yüksekliği nasıl olur?',
        options: ['76 cm', '76 cm’den büyük', '76 cm’den küçük'], answer: 0,
        why: ['Sütunun dikey yüksekliğini açık hava basıncı belirler; borunun biçimi ve kalınlığı değiştirmez.', 'Boru kıvrımlı olsa da dikey yükseklik büyümez.', 'Boru kalın olsa da dikey yükseklik küçülmez.'], scene: 0,
      },
      {
        q: 'Bir bölgede hava ısınıp yükseliyor. Hangisi doğrudur?',
        options: ['Yeryüzünde yüksek basınç alanı oluşur', 'Basınç değişmez', 'Yeryüzünde alçak basınç alanı oluşur'], answer: 2,
        why: ['Isınan hava yükselince yeryüzünde yüksek değil, alçak basınç oluşur.', 'Hava yükselince yeryüzündeki basınç değişir.', 'Isınan hava yükselir; yeryüzünde alçak basınç alanı oluşur.'], scene: 0,
      },
      {
        q: 'Havanın yoğunluğu için hangisi doğrudur?',
        options: ['Her yükseklikte aynıdır', 'Yeryüzüne yakın yerde daha fazladır', 'Yükseldikçe artar'], answer: 1,
        why: ['Hava yükseldikçe seyrelir; yoğunluğu her yükseklikte aynı olmaz.', 'Yeryüzüne yakın yerde hava sıktır; yükseldikçe yoğunluk azalır.', 'Yükseldikçe yoğunluk artmaz, azalır.'], scene: 0,
      },
      {
        q: 'Deniz seviyesinde açık hava basıncı 1,013 · 10⁵ Pa’dır. 76 cmHg ile ilişkisi nedir?',
        options: ['İkisi de aynı basınçtır', '76 cmHg daha büyüktür', '1,013 · 10⁵ Pa daha büyüktür'], answer: 0,
        why: ['İki değer de aynı basıncın farklı birimlerle yazılışıdır; ikisi de 1 atm’dir.', 'Birimler farklı olsa da ikisi aynı basınçtır; biri ötekinden büyük değildir.', 'Sayı büyük görünse de pascal ile santimetre cıva aynı basıncı gösterir.'], scene: 0,
      },
      {
        q: 'A kentinde yüksek basınç, B kentinde alçak basınç var. Rüzgâr nasıl eser?',
        options: ['B’den A’ya doğru', 'Rüzgâr esmez', 'A’dan B’ye doğru'], answer: 2,
        why: ['Hava alçak basınçtan yüksek basınca akmaz; yönü tersidir.', 'Basınç farkı olan yerde hava akar; rüzgâr eser.', 'Hava, yüksek basınçtan alçak basınca akar: rüzgâr A’dan B’ye eser.'], scene: 0,
      },
      {
        q: 'Torricelli düzeneğinde kaptaki cıva yüzeyine bastıran açık hava basıncı neye eşittir?',
        options: ['Kaptaki cıvanın ağırlığına', 'Cıva sütununun basıncına', 'Borunun üstündeki boşluğun basıncına'], answer: 1,
        why: ['Kaptaki cıvanın toplam ağırlığı değil, sütunun basıncı hava basıncını dengeler.', 'Cıva sütununun basıncı, kaptaki yüzeye bastıran açık hava basıncına eşittir.', 'Borunun üstü boştur; orada basınç yoktur.'], scene: 0,
      },
      {
        q: 'İçindeki hava boşaltılan iki yarım küreyi bir arada tutan nedir?',
        options: ['Dışarıdaki açık hava basıncı', 'İçerideki basınç', 'Kürelerin birbirini çekmesi'], answer: 0,
        why: ['İçeride hava kalmadığı için dıştaki açık hava basıncı yarım küreleri birbirine bastırır.', 'Hava boşaltıldığı için içeride bastıracak bir basınç kalmaz.', 'Kürelerin birbirini çektiği bir kuvvet yoktur; onları dışarıdaki hava bastırır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Basınç yükseldikçe azalır; hava yüksek basınçtan alçak basınca akar.</b>',
      '1 atm = 76 cmHg ≈ 1,013 · 10⁵ Pa.',
      'Açık hava basıncı, cıva sütununun basıncına eşittir.',
    ],
  });
})();
