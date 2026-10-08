/* C11 — Konu tekrarı: Denklem ve eşitsizlik problemleri
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Kurallar C1–C10'un defter notlarından derlendi; seslendirilmedi (sayfada ses satırı yok). */
(() => {
  'use strict';
  const { RENK, yaz, yazi, par, gizle, belir, kaybol, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, iz, serit } = window.KIT;
  const { ease } = Ders;

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

    // 1. Sözden kurala (C1)
    const d1 = dogru(dz, 2, 1, { renk: RENK.g }), n1 = nokta(dz, 0, 1);
    await kur('Sözden kurala', ['f(x) = 2x + 1', 'sabit terim: 1', 'katsayı: 2'], [d1.el, n1.el]);
    await par(soyle(c, 'Sabit ücret sabit terim, birim ücret katsayı olur.'), belir(c, [baslik, satir[0], d1.el], 400));
    await par(soyle(c, 'Doğru y’yi sabit terimde keser; katsayı artışı verir.'), belir(c, [n1.el, satir[1], satir[2]], 400));
    c.note('<b>Sözü kurala çevir:</b> sabit ücret sabit terim, birim ücret katsayıdır.<br>“Tam” denklem, “en çok” ve “en az” eşitsizlik kurar', 'Sözden kurala', 'nd-c11-kural');

    // 2. Sıfır ve işaret (C2)
    const d2 = dogru(dz, 2, -4, { renk: RENK.g }), n2 = nokta(dz, 2, 0);
    const e2 = serit(dz, 'x', -5, 2, { renk: RENK.eksi }), a2 = serit(dz, 'x', 2, 5, { renk: RENK.arti });
    await kur('Sıfır ve işaret', ['kök: x = 2', 'üstte: x > 2', 'altta: x < 2'], [d2.el, n2.el, e2.el, a2.el]);
    await par(soyle(c, 'f(x) = 0 çözümü, grafiğin x eksenini kestiği kökte bulunur.'), belir(c, [baslik, satir[0], d2.el, n2.el], 400));
    await par(soyle(c, 'Eksenin üstü f(x) > 0, altı f(x) < 0 çözümüdür.'), belir(c, [satir[1], satir[2], a2.el, e2.el], 400));
    c.note('<b>f(x) = 0</b> kökü verir; <b>f(x) &gt; 0</b> eksenin üstünde, <b>f(x) &lt; 0</b> altında.<br>Kök ikisine de dahil değildir', 'Sıfır ve işaret', 'nd-c11-sifir');

    // 3. İki doğru (C3, C4)
    const f3 = dogru(dz, 1, 1, { renk: RENK.f }), g3 = dogru(dz, -1, 3, { renk: RENK.g }), n3 = nokta(dz, 1, 2), i3 = iz(dz, 1, 2, { renk: RENK.sifir });
    const s3 = serit(dz, 'x', -5, 1), u3 = nokta(dz, 1, 0);
    await kur('İki doğru', ['f(x) = g(x): x = 1', 'f(x) ≤ g(x): x ≤ 1'], [f3.el, g3.el, n3.el, i3.g, s3.el, u3.el]);
    await par(soyle(c, 'Doğrular kesişince f(x) = g(x); çözüm kesişimin x’idir.'), belir(c, [baslik, satir[0], f3.el, g3.el, n3.el, i3.g], 400));
    await par(soyle(c, 'f altta kaldığı yerde f(x) ≤ g(x); uç dahildir.'), belir(c, [satir[1], s3.el, u3.el], 400));
    c.note('<b>f(x) = g(x):</b> çözüm, kesişimin x’i.<br><b>f(x) ≤ g(x):</b> f’nin altta ya da eşit olduğu x’ler', 'İki doğru', 'nd-c11-kesisim');

    // 4. Mutlak değer ve k (C5, C6)
    const v4 = kirik(dz, mutlakNoktalar(dz, 1, -1)), k4 = dogru(dz, 0, 3, { renk: RENK.g });
    const p4 = [nokta(dz, -2, 3), nokta(dz, 4, 3)].map((n) => n.el);
    const s4 = serit(dz, 'x', -2, 4), h4 = [nokta(dz, -2, 0, { bos: true }), nokta(dz, 4, 0, { bos: true })].map((n) => n.el);
    const s4a = serit(dz, 'x', -5, -2), s4b = serit(dz, 'x', 4, 5);
    await kur('Mutlak değer ve k', ['k > 0: iki çözüm', 'altta: tek aralık', 'üstte: iki aralık'], [v4.el, k4.el, ...p4, s4.el, ...h4, s4a.el, s4b.el]);
    await par(soyle(c, 'İki kesişim: f(x) = k ve f(x) = −k çözümleridir.'), belir(c, [baslik, satir[0], v4.el, k4.el, ...p4], 400));
    await par(soyle(c, 'Altında kalan tek aralık, üstünde kalan iki ayrı aralıktır.'), (async () => {
      await belir(c, [satir[1], s4.el, ...h4], 400);
      await c.wait(1600);
      await kaybol(c, s4.el, 300);
      await belir(c, [satir[2], s4a.el, s4b.el], 400);
    })());
    c.note('<b>|f(x)| = k</b> (k &gt; 0): f(x) = k ya da f(x) = −k.<br>Küçüktür tek aralık, büyüktür iki ayrı aralık verir', 'Mutlak değer ve k', 'nd-c11-mutlak-k');

    // 5. Mutlak değer ve doğru (C7, C8)
    const v5 = kirik(dz, mutlakNoktalar(dz, 1, -2)), g5 = dogru(dz, 2, -1, { renk: RENK.g }), n5 = nokta(dz, 1, 1);
    const s5 = serit(dz, 'x', 1, 5), u5 = nokta(dz, 1, 0);
    await kur('Mutlak değer ve doğru', ['çözüm: x = 1', 'sahte çözüm: −1', 'V altta: x ≥ 1'], [v5.el, g5.el, n5.el, s5.el, u5.el]);
    await par(soyle(c, 'İki durumdan 1 ve −1 çıkar; yerine koyunca yalnızca 1 tutar.'), belir(c, [baslik, satir[0], satir[1], v5.el, g5.el, n5.el], 400));
    await par(soyle(c, 'V’nin doğrunun altında ya da üzerinde kaldığı x’ler çözümdür.'), belir(c, [satir[2], s5.el, u5.el], 400));
    c.note('<b>|f(x)| = g(x):</b> iki durum, sonra yerine koy; koşulu sağlamayan sayı sahte çözümdür.<br>Eşitsizlikte eşitliği çöz, bölgelerden birer sayı dene', 'Mutlak değer ve doğru', 'nd-c11-mutlak-dogru');

    // 6. Başka yoldan sına (C9)
    const f6 = dogru(dz, 2, -1, { renk: RENK.f }), g6 = dogru(dz, 1, 1, { renk: RENK.g }), n6 = nokta(dz, 2, 3), i6 = iz(dz, 2, 3, { renk: RENK.sifir });
    await kur('Başka yoldan sına', ['cebir: x = 2', 'yerine koy: 3 = 3', 'grafik: kesişim'], [f6.el, g6.el, n6.el, i6.g]);
    await par(soyle(c, 'x = 2’yi yerine koy: iki yan da 3 eder.'), belir(c, [baslik, satir[0], satir[1]], 400));
    await par(soyle(c, 'Grafikte iki doğru x = 2’de kesişir: iki yol aynı çıktı.'), belir(c, [satir[2], f6.el, g6.el, n6.el, i6.g], 400));
    c.note('<b>Bir yoldan bulduğunu başka yoldan sına.</b><br>Tek sayıda yerine koy; aralıkta grafiğe ya da işaret tablosuna bak', 'Başka yoldan sına', 'nd-c11-sina');

    // 7. Modelin sınırı (C10)
    const d7 = dogru(dz, -1, 4, { renk: RENK.g, x1: 0, x2: 4 }), l7 = dogru(dz, -1, 4, { renk: RENK.g, kesik: true, x2: 0 }), r7 = dogru(dz, -1, 4, { renk: RENK.g, kesik: true, x1: 4 });
    const s7 = serit(dz, 'x', 0, 4), n7 = [nokta(dz, 0, 4), nokta(dz, 4, 0)].map((n) => n.el);
    await kur('Modelin sınırı', ['h(x) = 4 − x', '0 ≤ x ≤ 4: anlamlı'], [d7.el, l7.el, r7.el, s7.el, ...n7]);
    await par(soyle(c, 'Model, anlamlı olduğu aralıkta ve koşullar sürdükçe geçerlidir.'), belir(c, [baslik, satir[0], satir[1], d7.el, s7.el, ...n7], 400));
    await par(soyle(c, 'Aralığın dışında model anlamsız değerler verir; güvenilmez.'), belir(c, [l7.el, r7.el], 400));
    c.note('<b>Modelin sınırı:</b> yalnızca anlamlı olduğu aralıkta ve koşullar sürdükçe geçerli.<br>Aralığın dışında modele güvenilmez', 'Modelin sınırı', 'nd-c11-model');
    await soyle(c, 'Şimdi on dersin sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-c11', kicker: 'Konu C · Denklem ve eşitsizlik problemleri', title: 'Konu tekrarı', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Denklem ve eşitsizlik problemleri',
      hook: 'On dersin kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'On dersin kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: '|2x − 3| = x denkleminin çözüm kümesi hangisidir?',
        options: ['{3}', '{1}', '{1, 3}'], answer: 2,
        why: ['Yalnızca x ≥ 1,5 durumu alınmış; x &lt; 1,5 durumundan da çözüm çıkar.', 'Yalnızca x &lt; 1,5 durumu alınmış; 2x − 3 = x yolundan x = 3 çıkar.', '3 − 2x = x ise x = 1; 2x − 3 = x ise x = 3. İkisi de kendi durumunun koşulunu sağlar ve denklemi tutar.'], scene: 0,
      },
      {
        q: 'f(x) = 3x − 2 ve g(x) = −x + 6 doğrularının kesişim noktası hangisidir?',
        options: ['(2, 4)', '(4, 2)', '(8, 4)'], answer: 0,
        why: ['3x − 2 = −x + 6 ise x = 2; f(2) = 4 = g(2).', 'Sıra ters: önce x gelir, sonra y.', 'x = 8 değil: 4x = 8 ise x = 2.'], scene: 0,
      },
      {
        q: 'Bir havuza V(x) = 40 + 8x modeliyle su doluyor (x dakika, V(x) litre). Havuz 400 litre alıyor. Model hangi x’ler için anlamlıdır?',
        options: ['x ≥ 45', '0 ≤ x ≤ 50', '0 ≤ x ≤ 45'], answer: 2,
        why: ['45 dakikadan sonra havuz taşar; model orada anlamsızdır.', '400 / 8 = 50: başlangıçtaki 40 litre hesaba katılmamış.', 'Dakika 0’dan başlar; 40 + 8x = 400 ise x = 45.'], scene: 0,
      },
      {
        q: 'Bir taksimetre grafiğinde doğru y eksenini 12’de kesiyor ve her kilometrede 5 yükseliyor. Ücretin kuralı hangisidir?',
        options: ['f(x) = 5x + 12', 'f(x) = 12x + 5', 'f(x) = 5x − 12'], answer: 0,
        why: ['Sabit terim 12 (y eksenini kestiği yer), katsayı 5 (her kilometredeki artış).', 'Sabit terim ile katsayı yer değiştirmiş.', 'Sabit terim eksi değil: doğru y eksenini 12’de, eksenin üstünde keser.'], scene: 0,
      },
      {
        q: '|x − 3| ≥ 2 eşitsizliğinin çözüm kümesi hangisidir?',
        options: ['[1, 5]', '(−∞, 1] ∪ [5, ∞)', '(−∞, 1) ∪ (5, ∞)'], answer: 1,
        why: ['Bu, |x − 3| ≤ 2 eşitsizliğinin çözümüdür; ≥ iki dış aralık verir.', 'x − 3 ≥ 2 ya da x − 3 ≤ −2: x ≥ 5 ya da x ≤ 1. Eşitlik olduğu için uçlar dahil.', 'Uçlarda |x − 3| = 2 olur; ≥ uçları da alır.'], scene: 0,
      },
      {
        q: 'Cebirle x = 3, grafikte kesişim x = 5 bulundu. Ne yapılır?',
        options: ['Büyük olan sayı seçilir', 'Biri hatalıdır: yerine koyup adımlar yeniden gözden geçirilir', 'İkisi de doğrudur; yollar farklıdır'], answer: 1,
        why: ['Büyük olanın doğru olması gerekmez; yerine koyarak sınamak gerekir.', 'İki yol farklı sonuç verdiyse biri hatalıdır; yerine koy ve adımlara bak.', 'Aynı denklemin çözümü yola göre değişmez; fark varsa hata vardır.'], scene: 0,
      },
      {
        q: 'f(x) = x + 3 ve g(x) = 3x − 5 için f(x) &lt; g(x) eşitsizliğinin çözümü hangisidir?',
        options: ['x &lt; 4', 'x ≥ 4', 'x &gt; 4'], answer: 2,
        why: ['x = 0 dene: f(0) = 3, g(0) = −5; f altta değil.', 'x = 4’te f(4) = g(4) = 7; &lt; eşitliği almaz.', 'x + 3 &lt; 3x − 5 ise 8 &lt; 2x, yani x &gt; 4.'], scene: 0,
      },
      {
        q: 'g(x) = −2x + 10 için g(x) ≥ 0 eşitsizliğinin çözüm kümesi hangisidir?',
        options: ['x ≤ 5', 'x ≥ 5', 'x ≤ −5'], answer: 0,
        why: ['−2x + 10 ≥ 0 ise x ≤ 5; kökte değer 0 olduğundan 5 dahil.', 'Azalan doğru kökün sağında negatiftir.', 'Kök −5 değil; −2x + 10 = 0 ise x = 5.'], scene: 0,
      },
      {
        q: '|x + 1| = 2x + 5 denkleminin tek çözümü x = −2’dir. |x + 1| ≤ 2x + 5 eşitsizliğinin çözüm kümesi hangisidir?',
        options: ['(−∞, −2]', '[−4, −2]', '[−2, ∞)'], answer: 2,
        why: ['x = −3 dene: 2 ≤ −1 yanlış; sol bölge çözüm değil.', 'x = −4 dene: 3 ≤ −3 yanlış; −4 aralığın içinde değil.', 'x = 0 dene: 1 ≤ 5 doğru. Eşitlik noktasının sağı çözüm, uç dahil.'], scene: 0,
      },
      {
        q: '|x + 2| = k denkleminin tam bir çözümü olması için k kaç olmalıdır?',
        options: ['2', '0', '−2'], answer: 1,
        why: ['k = 2 iken x + 2 = 2 ve x + 2 = −2: iki çözüm.', 'k = 0 iken iki yol aynı denklem olur: yalnızca x = −2.', 'k = −2 negatif; çözüm yok.'], scene: 0,
      },
    ],
    summary: [
      '<b>Sözü fonksiyona çevir; denklemi ve eşitsizliği grafikten ve işaretten oku.</b>',
      'f(x) = 0 kökü verir; f(x) = g(x) kesişimin x’ini, f(x) ≤ g(x) altta kalan doğruyu sorar.',
      '|f(x)| = k iki yola ayrılır; küçüktür tek aralık, büyüktür iki ayrı aralık verir.',
      'Mutlak değerli denklemde bulunan sayı yerine konur; sahte çözüm ayıklanır.',
      '<b>Çözümü başka yoldan sına; modeli yalnızca geçerli olduğu aralıkta kullan.</b>',
    ],
  });
})();
