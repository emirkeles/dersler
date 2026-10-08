/* A17 — Konu tekrarı: Doğrusal fonksiyonlar ve nitel özellikleri
   Yeni bilgi yok. Tek sahnede konunun sekiz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Kurallar A1–A16'nın defter notlarından derlendi; seslendirilmedi (sayfada ses satırı yok). */
(() => {
  'use strict';
  const { RENK, yaz, yazi, par, gizle, belir, kaybol, soyle, duzlem, dogru, nokta, iz, serit, isaretTablosu, parcali } = window.KIT;
  const { lerp, ease } = Ders;

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

    // 1. Tanım ve görüntü kümesi (A1–A2)
    const d1 = dogru(dz, 1, 0, { x1: -2, x2: 3 }), sx = serit(dz, 'x', -2, 3), sy = serit(dz, 'y', -2, 3, { renk: RENK.g });
    await kur('İki küme', [['tanım kümesi: x ekseninde', RENK.sifir], ['görüntü kümesi: y ekseninde', RENK.g]].map((p) => [p]), [d1.el, sx.el, sy.el]);
    await par(soyle(c, 'Girebilen x’ler tanım kümesidir; x ekseninde okunur.'), belir(c, [baslik, d1.el, sx.el, satir[0]], 400));
    await par(soyle(c, 'Çıkabilen değerler görüntü kümesidir; y ekseninde okunur.'), belir(c, [sy.el, satir[1]], 400));
    c.note('<b>Tanım kümesi</b> x ekseninde, <b>görüntü kümesi</b> y ekseninde okunur.<br>f(x) = x, [−2, 3]: ikisi de [−2, 3]', 'İki küme', 'nd-a17-kumeler');

    // 2. Katsayılar: eğim ve yer (A6, A7, A9)
    const d2 = dogru(dz, 2, -1, { renk: RENK.g }), n2 = nokta(dz, 1, 1);
    await kur('Katsayılar', ['g(x) = 2 · f(x − 1) + 1', 'eğim 2, (1, 1)’den geçer'], [d2.el, n2.el]);
    await par(soyle(c, 'Kuraldaki a eğimi verir; doğru (r, k) noktasından geçer.'), belir(c, [baslik, satir[0], d2.el], 400));
    await par(soyle(c, 'Burada eğim 2: 1 sağa gidince 2 yukarı çıkılır.'), belir(c, [n2.el, satir[1]], 400));
    c.note('<b>a · f(x − r) + k:</b> eğimi a, (r, k)’den geçer.<br>r sağa, k yukarı kaydırır', 'Katsayılar', 'nd-a17-katsayilar');

    // 3. a'nın işareti: artan, azalan, sabit (A4, A8, A10)
    const d3 = dogru(dz, 2, -1, { renk: RENK.g });
    await kur('a’nın işareti', ['a > 0: artan', 'a < 0: azalan', 'a = 0: sabit'], [d3.el]);
    await par(soyle(c, 'a pozitifse doğrusal fonksiyon artandır.'), belir(c, [baslik, satir[0], d3.el], 400));
    await par(soyle(c, 'a negatifse azalandır: doğru sağa doğru alçalır.'), belir(c, satir[1], 400),
      c.tween(900, (e) => d3.ayarla(lerp(2, -1, e), lerp(-1, 2, e)), ease.inOut));
    await par(soyle(c, 'a sıfırsa fonksiyon sabittir: grafiği yatay doğrudur.'), belir(c, satir[2], 400),
      c.tween(900, (e) => d3.ayarla(lerp(-1, 0, e), lerp(2, 3, e)), ease.inOut));
    c.note('<b>a &gt; 0</b> artan, <b>a &lt; 0</b> azalan, <b>a = 0</b> sabit.<br>b yalnızca doğrunun yerini değiştirir', 'a’nın işareti', 'nd-a17-isaret');

    // 4. Sıfır ve işaret tablosu (A3, A11)
    const d4 = dogru(dz, 2, -4, { renk: RENK.g }), n4 = nokta(dz, 2, 0);
    const tb = isaretTablosu(svg, { x: 570, y: 290, w: 400, ad: 'h(x)', kok: '2', sol: '−', sag: '+' });
    await kur('Sıfır ve işaret', ['h(x) = 2x − 4'], [d4.el, n4.el, tb.g]);
    await par(soyle(c, 'ax + b’nin sıfırı x = −b/a’dır: burada 2.'), belir(c, [baslik, satir[0], d4.el, n4.el], 400));
    await par(soyle(c, 'Fonksiyon sıfırın iki yanında işaret değiştirir.'), belir(c, tb.g, 400));
    c.note('<b>Sıfır:</b> x = −b/a<br>Artan doğruda − 0 +, azalan doğruda + 0 −', 'Sıfır ve işaret', 'nd-a17-sifir');

    // 5. Uç değerler (A4, A15)
    const d5 = dogru(dz, -1, 2, { renk: RENK.g, x1: -1, x2: 3 }), n5a = nokta(dz, -1, 3), n5b = nokta(dz, 3, -1, { bos: true });
    await kur('Uç değerler', ['h(x) = −x + 2, [−1, 3)', 'en büyük: 3', 'en küçük: yok'], [d5.el, n5a.el, n5b.el]);
    await par(soyle(c, 'Azalan fonksiyon en büyük değerini sol uçta alır.'), belir(c, [baslik, satir[0], satir[1], d5.el, n5a.el], 400));
    await par(soyle(c, 'Sağ uç dahil değil: oradaki değer alınamaz.'), belir(c, [n5b.el, satir[2]], 400));
    c.note('Artan fonksiyon en büyük değerini sağ uçta, azalan sol uçta alır.<br>Uç dahil değilse o değer alınamaz', 'Uç değerler', 'nd-a17-uclar');

    // 6. Bire birlik (A5, A13)
    const d6 = dogru(dz, 2, -1, { renk: RENK.g }), i6 = iz(dz, 2, 3, { renk: RENK.sifir }), n6 = nokta(dz, 2, 3);
    await kur('Bire birlik', ['a ≠ 0 ise bire bir', 'her yükseklikte tek nokta'], [d6.el, i6.g, n6.el]);
    await par(soyle(c, 'a sıfır değilse farklı girdiler farklı çıktı verir.'), belir(c, [baslik, satir[0], d6.el], 400));
    await par(soyle(c, 'Grafikte her yükseklikte tek nokta vardır.'), belir(c, [i6.g, n6.el, satir[1]], 400));
    c.note('<b>Bire bir:</b> h(x<sub>1</sub>) = h(x<sub>2</sub>) ise x<sub>1</sub> = x<sub>2</sub><br>a ≠ 0 ise ax + b bire birdir', 'Bire birlik', 'nd-a17-bire-bir');

    // 7. Örnek, karşı örnek, ispat (A12, A14)
    const d7 = dogru(dz, 2, -1, { renk: RENK.g }), n7 = [nokta(dz, 0, -1), nokta(dz, 1, 1), nokta(dz, 2, 3)].map((n) => n.el);
    await kur('Emin olmanın yolu', ['örnek: varsayım kurar', 'karşı örnek: varsayımı düşürür', 'ispat: her durumu kapsar'], [d7.el, ...n7]);
    await par(soyle(c, 'Örnekler varsayım kurdurur; tek karşı örnek varsayımı düşürür.'), belir(c, [baslik, satir[0], satir[1], d7.el, ...n7], 400));
    await par(soyle(c, 'Her durum için emin olmanın yolu cebirsel ispattır.'), belir(c, satir[2], 400));
    c.note('<b>Grafik gösterir, ispat garanti eder.</b><br>Tek karşı örnek varsayımı düşürür', 'İspat', 'nd-a17-ispat');

    // 8. Parçalı gösterim (A16)
    const d8a = dogru(dz, 2, 1, { renk: RENK.g, x2: 1 }), d8b = dogru(dz, -1, 4, { renk: RENK.g, x1: 1 }), n8 = nokta(dz, 1, 3);
    const pr = parcali(svg, { x: 570, y: 250, ad: 'p(x) =', satirlar: [['2x + 1', 'x < 1'], ['−x + 4', 'x ≥ 1']], size: 26, kosulX: 150 });
    await kur('Parçalı gösterim', [], [d8a.el, d8b.el, n8.el, pr.g]);
    await par(soyle(c, 'Parçalı gösterimde her aralığın kendi kuralı vardır.'), belir(c, [baslik, d8a.el, d8b.el, n8.el, pr.g], 400));
    await soyle(c, 'Önce girdinin aralığını bul, sonra o satırın kuralını uygula.');
    c.note('<b>Parçalı gösterim</b> tek fonksiyondur.<br>Önce aralık, sonra o satırın kuralı', 'Parçalı gösterim', 'nd-a17-parcali');
    await soyle(c, 'Şimdi on altı dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-a17', kicker: 'Konu A · Doğrusal fonksiyonlar', title: 'Konu tekrarı', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Doğrusal fonksiyonlar',
      hook: 'On altı dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun sekiz kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'On altı dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Bir telefonun şarjı h(x) = −5x + 80 kuralıyla değişiyor (x saat, h yüzde). Şarj kaçıncı saatte biter?',
        options: ['8', '16', '80'], answer: 1,
        why: ['h(8) = 40; şarj yarıya inmiş, bitmemiş.', '−5x + 80 = 0 ise x = 16.', '80 başlangıç değeridir: h(0) = 80.'], scene: 0,
      },
      {
        q: 'Hangisi bire bir <b>değildir</b>?',
        options: ['h(x) = −3x + 1', 'h(x) = 4', 'h(x) = x − 9'], answer: 1,
        why: ['a = −3 sıfır değil: bire birdir.', 'Sabit fonksiyon: bütün girdiler 4 çıktısını verir.', 'a = 1 sıfır değil: bire birdir.'], scene: 0,
      },
      {
        q: 'g(x) = 2 · f(x − 3) doğrusu x eksenini hangi noktada keser?',
        options: ['x = 3', 'x = −3', 'x = 6'], answer: 0,
        why: ['g(3) = 2 · f(0) = 0.', 'g(−3) = 2 · (−6) = −12; sıfır değil.', 'g(6) = 2 · 3 = 6; sıfır değil.'], scene: 0,
      },
      {
        q: 'h(x) = −x + 6, (1, 4] aralığında tanımlı. Hangisi doğrudur?',
        options: ['En büyük değeri 5’tir', 'En küçük değeri 2’dir, en büyük değeri yoktur', 'En küçük değeri yoktur'], answer: 1,
        why: ['5 = h(1) olurdu, ama 1 aralığa dahil değil.', 'Azalan fonksiyon en küçük değerini sağ uçta alır: h(4) = 2. Sol uç dahil değil.', 'Sağ uç dahil: h(4) = 2 alınır.'], scene: 0,
      },
      {
        q: 'Elif “a &gt; 0 ise ax + b’nin sıfırı negatiftir” diyor. h(x) = 3x − 9 bu iddia için nedir?',
        options: ['Destekleyen bir örnek', 'Bir ispat', 'Bir karşı örnek'], answer: 2,
        why: ['Sıfırı 3’tür; iddianın söylediği gibi negatif değil.', 'Tek örnek ispat olmaz; üstelik bu örnek iddiayı bozuyor.', 'a pozitif ama sıfır pozitif çıktı: iddia düşer.'], scene: 0,
      },
      {
        q: 'f(x) = x, [−3, 5] aralığında tanımlı. Görüntü kümesindeki en büyük sayı kaçtır?',
        options: ['5', '−3', '8'], answer: 0,
        why: ['Çıktı girdiye eşit; en büyük girdi 5.', '−3 en küçük çıktıdır.', '8 aralığın uzunluğudur; bir çıktı değil.'], scene: 0,
      },
      {
        q: 'Bir doğru (0, 2) ve (1, 5) noktalarından geçiyor. Eğimi kaçtır?',
        options: ['2', '5', '3'], answer: 2,
        why: ['2, doğrunun y eksenini kestiği yerdir.', '5, x = 1’deki çıktıdır; artış değil.', '1 sağa gidince 5 − 2 = 3 yukarı çıkılır.'], scene: 0,
      },
      {
        q: 'h(x) = −2x + 1 için x<sub>1</sub> &lt; x<sub>2</sub> ise hangisi doğrudur?',
        options: ['h(x<sub>1</sub>) &lt; h(x<sub>2</sub>)', 'h(x<sub>1</sub>) &gt; h(x<sub>2</sub>)', 'h(x<sub>1</sub>) = h(x<sub>2</sub>)'], answer: 1,
        why: ['Bu, a pozitifken çıkan sonuçtur.', 'a = −2 negatif: çarpınca yön döner, fonksiyon azalandır.', 'a sıfır olmadığı için farklı girdiler farklı çıktı verir.'], scene: 0,
      },
      {
        q: 'p(x), x &lt; 0 için −x, x ≥ 0 için 2x + 1 olsun. p(−3) + p(0) kaçtır?',
        options: ['4', '3', '−4'], answer: 0,
        why: ['p(−3) = 3 ve p(0) = 2 · 0 + 1 = 1; toplam 4.', '0, x ≥ 0 satırına düşer: p(0) = 1, 0 değil.', '−3, x &lt; 0 satırına düşer: p(−3) = 3, −5 değil.'], scene: 0,
      },
      {
        q: 'h(x) = 2x + 6 hangi x’lerde negatiftir?',
        options: ['x &gt; −3', 'x &lt; 3', 'x &lt; −3'], answer: 2,
        why: ['Artan doğru sıfırın sağında pozitiftir.', 'Sıfır 3 değil: 2x + 6 = 0 ise x = −3.', 'Sıfırı −3; artan doğru sıfırın solunda negatiftir.'], scene: 0,
      },
    ],
    summary: [
      '<b>a eğimi ve yönü, b ile kaydırmalar yeri belirler.</b>',
      'Sıfır x = −b/a’dadır; işaret orada değişir.',
      'a ≠ 0 ise ax + b <b>bire bir</b>dir; a = 0 ise <b>sabit</b>tir.',
      'Uç değerler aralığın uçlarında aranır; dahil olmayan uçtaki değer alınamaz.',
      '<b>Grafik gösterir, ispat garanti eder.</b>',
    ],
    nextLesson: { href: 'b1-mutlak-deger-ile-x.html', label: 'Sonraki konu: Mutlak değer fonksiyonu ›' },
  });
})();
