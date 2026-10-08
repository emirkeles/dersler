/* B7 — Konu tekrarı: Mutlak değer fonksiyonu ve nitel özellikleri
   Yeni bilgi yok. Tek sahnede konunun altı kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Kurallar B1–B6'nın defter notlarından derlendi; seslendirilmedi (sayfada ses satırı yok). */
(() => {
  'use strict';
  const { RENK, yaz, yazi, par, gizle, belir, kaybol, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, parcali } = window.KIT;

  /* ---- 1. Konunun kuralları: solda düzlem, sağda kural; her kural tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, { x0: 60, y0: 46, w: 460, h: 460, xsayi: 2, ysayi: 4 });
    const SX = 770;
    const baslik = yazi(svg, SX, 120, '', { size: 32, kalin: 700 });
    const satir = [0, 1, 2].map((k) => yazi(svg, SX, 200 + k * 56, '', { size: 26 }));
    gizle(baslik, satir);
    let cizim = [];   // o kuralın düzlemdeki öğeleri; sonraki kuraldan önce kaldırılır
    const kur = async (b, ss, els) => {   // eski kuralı kaldır, yenisini yaz; öğeleri görünmez bırakır
      gizle(els);
      c.clearSay();
      await kaybol(c, [baslik, ...satir, ...cizim], 300);
      yaz(baslik, b); satir.forEach((t, k) => yaz(t, ss[k] || ''));
      cizim = els;
    };
    const V = (a, b, cc = 0, isaret = 1, renk) => kirik(dz, mutlakNoktalar(dz, a, b, cc, isaret), renk ? { renk } : {});

    // 1. Uzaklık ve V (B1)
    const f1 = dogru(dz, 1, 0, { renk: RENK.f, kesik: true }), v1 = V(1, 0);
    await kur('Uzaklık ve V', ['|x| sıfıra uzaklıktır', '|x| negatif olmaz'], [f1.el, v1.el]);
    await par(soyle(c, 'Mutlak değer, bir sayının sıfıra uzaklığıdır.'), belir(c, [baslik, satir[0], satir[1]], 400));
    await par(soyle(c, 'Doğrunun eksen altındaki yarısı katlanınca V çıkar.'), belir(c, [f1.el, v1.el], 400));
    c.note('<b>|x|</b> sıfıra uzaklıktır; hiç negatif olmaz.<br>Grafik bir V; görüntü kümesi [0, ∞)', 'Mutlak değer', 'b7-uzaklik');

    // 2. Parçalı yazım (B2, B6)
    const v2 = V(1, 0), n2 = nokta(dz, 0, 0);
    const pr2 = parcali(svg, { x: 590, y: 250, ad: '|x| =', satirlar: [['x', 'x ≥ 0'], ['−x', 'x < 0']], size: 26, kosulX: 90 });
    await kur('Parçalı yazım', [], [v2.el, n2.el, pr2.g]);
    await par(soyle(c, 'Sağ kolda x, sol kolda −x çıkar.'), belir(c, [baslik, v2.el, pr2.g], 400));
    await par(soyle(c, 'x negatifken −x pozitiftir; kollar sıfırda birleşir.'), belir(c, n2.el, 400));
    c.note('<b>|x| = x</b> (x ≥ 0), <b>−x</b> (x &lt; 0)<br>x negatifken −x pozitiftir', 'Parçalı yazım', 'b7-parcali');

    // 3. Nitel özellikler (B3)
    const v3 = V(1, 0), t3 = V(1, 0, 0, -1), y3 = dogru(dz, 0, 3, { renk: RENK.sifir, kesik: true }), p3 = [nokta(dz, -3, 3), nokta(dz, 3, 3)].map((n) => n.el);
    await kur('Nitel özellikler', ['|x|: en küçük 0', '|x| bire bir değil', '−|x|: en büyük 0'], [v3.el, t3.el, y3.el, ...p3]);
    await par(soyle(c, 'V solda azalan, sağda artandır; en küçük değeri 0.'), belir(c, [baslik, satir[0], v3.el], 400));
    await par(soyle(c, 'Aynı yükseklikte iki nokta var: bire bir değil.'), belir(c, [satir[1], y3.el, ...p3], 400));
    await par(soyle(c, 'Eksi koyunca ters V olur; en büyük değer 0.'), belir(c, [satir[2], t3.el], 400));
    c.note('<b>|x|:</b> solda azalan, sağda artan, en küçük değer 0, bire bir değil.<br><b>−|x|:</b> ters V, en büyük değer 0', 'Nitel özellikler', 'b7-ozellik');

    // 4. Kırılma noktası (B4)
    const h4 = dogru(dz, 2, -4, { renk: RENK.g, kesik: true }), v4 = V(2, -4), n4 = nokta(dz, 2, 0);
    await kur('Kırılma noktası', ['|ax + b| ucu −b/a’da', '|2x − 4|: uç 2’de'], [h4.el, v4.el, n4.el]);
    await par(soyle(c, 'İçteki doğrunun sıfırı, V’nin ucudur.'), belir(c, [baslik, satir[0], satir[1], h4.el, v4.el, n4.el], 400));
    await soyle(c, 'Doğru artan olsa da V sıfırın solunda azalır.');
    c.note('<b>|h(x)|’in sıfırı h’nin sıfırıdır;</b> |ax + b| x = −b/a’da kırılır.<br>h artan olsa da |h| sıfırın solunda azalır', 'Kırılma noktası', 'b7-kirilma');

    // 5. c ile taşıma (B5)
    const v5a = V(1, -2, 1), n5a = nokta(dz, 2, 1), v5b = V(1, -2, -1, 1, RENK.g), n5b = [nokta(dz, 1, 0), nokta(dz, 3, 0)].map((n) => n.el);
    await kur('c’nin etkisi', ['en küçük: c', 'c > 0: sıfır yok', 'c < 0: iki sıfır'], [v5a.el, n5a.el, v5b.el, ...n5b]);
    await par(soyle(c, 'c, V’yi yukarı ya da aşağı taşır; en küçük değer c olur.'), belir(c, [baslik, satir[0], v5a.el, n5a.el], 400));
    await par(soyle(c, 'c pozitifse sıfır yok, negatifse iki sıfır var.'), belir(c, [satir[1], satir[2], v5b.el, ...n5b], 400));
    c.note('<b>|h(x)| + c:</b> en küçük değer c. c &gt; 0 sıfır yok, c &lt; 0 iki sıfır.<br>−|h(x)| + c: en büyük değer c, durum tersine döner', 'c ile taşıma', 'b7-c');

    // 6. Mutlak değeri açmak (B6)
    const v6 = V(1, -1, 2), n6 = nokta(dz, 1, 2);
    const pr6 = parcali(svg, { x: 590, y: 250, ad: 'm =', satirlar: [['x + 1', 'x ≥ 1'], ['−x + 3', 'x < 1']], size: 26, kosulX: 90 });
    await kur('Açma kuralı', [], [v6.el, n6.el, pr6.g]);
    await par(soyle(c, 'İçerisi pozitifse aynen, negatifse eksiyle çıkar.'), belir(c, [baslik, v6.el, n6.el], 400));
    await par(soyle(c, 'Parçalar içerinin sıfırında ayrılır: burada x = 1.'), belir(c, pr6.g, 400));
    c.note('<b>h ≥ 0 ise |h| = h, h &lt; 0 ise |h| = −h</b><br>|x − 1| + 2: x ≥ 1 için x + 1, x &lt; 1 için −x + 3', 'Mutlak değeri açmak', 'b7-ac');
    await soyle(c, 'Şimdi altı dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-b7', kicker: 'Konu B · Mutlak değer fonksiyonu', title: 'Konu tekrarı', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Mutlak değer fonksiyonu',
      hook: 'Altı dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Altı dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Ev sayı doğrusunda 0’da, okul −8’de, market 5’te. Hangisi eve daha uzaktır?',
        options: ['Market; 5, −8’den büyüktür', 'Okul; |−8| = 8, |5| = 5', 'İkisi de aynı uzaklıkta'], answer: 1,
        why: ['Uzaklık işaretli sayıyla değil, mutlak değerle ölçülür.', 'Okulun eve uzaklığı 8, marketinki 5.', '8 ile 5 eşit değil.'], scene: 0,
      },
      {
        q: 'Parçalı gösterimiyle |x| fonksiyonunun grafiğinde hangi nokta bulunur?',
        options: ['(−6, −6)', '(6, −6)', '(−6, 6)'], answer: 2,
        why: ['x &lt; 0 için çıktı −x = 6; −6 olmaz.', 'x = 6 için çıktı x = 6; −6 olamaz.', '−6 &lt; 0: ikinci satır geçerli, −(−6) = 6.'], scene: 0,
      },
      {
        q: 'g(x) = |x| ve f(x) = x için hangisi <b>yalnızca g</b> için doğrudur?',
        options: ['En küçük değeri vardır', 'Tanım kümesi ℝ’dir', 'Sıfırı x = 0’dır'], answer: 0,
        why: ['g en küçük değer olarak 0’ı alır; f’nin en küçük değeri yoktur.', 'İkisinin de tanım kümesi ℝ’dir.', 'İkisi de x = 0’da sıfır olur.'], scene: 0,
      },
      {
        q: 'g(x) = |2x − 8| grafiğinin x ekseniyle kaç ortak noktası vardır?',
        options: ['İki', 'Hiç', 'Bir'], answer: 2,
        why: ['İki ortak nokta için V’nin ucu eksenin altında olmalıydı.', 'g’nin sıfırı var: g(4) = 0.', '2x − 8 = 0 ise x = 4; V’nin ucu eksene tam değer, tek ortak nokta.'], scene: 0,
      },
      {
        q: 'k(x) = −|x + 3| + 2 fonksiyonunun görüntü kümesi hangisidir?',
        options: ['[2, ∞)', '(−∞, 2]', '(−∞, 0]'], answer: 1,
        why: ['Bu, |x + 3| + 2 için geçerlidir; burada V ters.', 'Ters V’nin tepesi (−3, 2): en büyük değer 2, kollar aşağı iner.', 'c = 2 gözden kaçmış: en büyük değer 0 değil, 2.'], scene: 0,
      },
      {
        q: 'n(x) = −|x + 1| + 4 ifadesi x &lt; −1 için hangi kuralla yazılır?',
        options: ['x + 5', '−x + 3', '−x + 5'], answer: 0,
        why: ['x + 1 &lt; 0 iken |x + 1| = −x − 1; öndeki eksiyle n(x) = x + 1 + 4 = x + 5.', 'Bu x ≥ −1 için geçerli kuraldır: −(x + 1) + 4.', 'Ters V’nin sol kolu artandır; x’in katsayısı −1 olamaz.'], scene: 0,
      },
      {
        q: 'x ≥ 3 için x − 3, x &lt; 3 için 3 − x olarak parçalı yazılan fonksiyon hangisidir?',
        options: ['|x + 3|', '|x| − 3', '|x − 3|'], answer: 2,
        why: ['x + 3’ün sıfırı −3; parçalar x = −3’te ayrılırdı.', '|x| − 3’te parçalar x = 0’da ayrılır; kuralları x − 3 ve −x − 3 olur.', 'x − 3’ün sıfırı 3; x ≥ 3’te aynen, x &lt; 3’te eksiyle çıkar: 3 − x.'], scene: 0,
      },
      {
        q: 'Hangisi her gerçek sayı a için doğrudur?',
        options: ['|−a| = |a|', '|a| = a', '|a| = −a'], answer: 0,
        why: ['−a ile a sıfıra aynı uzaklıktadır.', 'a negatifken |a| = −a’dır, a değil.', 'a pozitifken |a| = a’dır, −a değil.'], scene: 0,
      },
      {
        q: 'Bir minibüs şirketinin ücreti, 4. kilometredeki duraktan uzaklığa göre s(x) = |x − 4| + 1 liradır (x, yolcunun bindiği kilometre). 1. ve 6. kilometredeki ücretlerin toplamı kaç liradır?',
        options: ['1', '6', '7'], answer: 2,
        why: ['(−3 + 1) + (2 + 1) = 1 çıkar; ama |1 − 4| = 3, uzaklık negatif olmaz.', 'c = 1 iki ücrete de eklenir; biri unutulmuş.', 's(1) = |−3| + 1 = 4 ve s(6) = |2| + 1 = 3; toplam 7.'], scene: 0,
      },
      {
        q: 'Bir topun yerden yüksekliği y(x) = −|x − 2| + 5 metredir (x saniye). Hangi x değerlerinde y artandır?',
        options: ['x &gt; 2', 'x &lt; 2', 'Her x’te'], answer: 1,
        why: ['x &gt; 2’de sağ kol aşağı iner: azalandır.', 'Tepe (2, 5); solunda top yükselir, y artandır.', 'Ters V her yerde artan olamaz; tepeden sonra alçalır.'], scene: 0,
      },
    ],
    summary: [
      '<b>|x| sıfıra uzaklıktır; grafiği bir V’dir, x &lt; 0 için −x, x ≥ 0 için x.</b>',
      '|x| solda azalan, sağda artandır; en küçük değeri 0’dır, bire bir değildir.',
      '|ax + b| grafiği, ax + b’nin sıfırında kırılır; c grafiği yukarı ya da aşağı taşır.',
      'Mutlak değeri açmak içerinin işaretine bakmaktır: parçalar içerinin sıfırında ayrılır.',
    ],
    nextLesson: { href: 'c1-problemi-fonksiyona-cevirmek.html', label: 'Sonraki konu: Denklem ve eşitsizlik problemleri ›' },
  });
})();
