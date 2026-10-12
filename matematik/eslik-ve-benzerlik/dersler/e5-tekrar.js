/* E5 — Konu tekrarı: Eşlik ve benzerlik problemleri
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından sekiz karışık soru gelir.
   Senaryo: plan/matematik/eslik-ve-benzerlik/senaryolar/E-problemler.md (E5). */
(() => {
  'use strict';
  const { RENK, gizle, belir, par, yazi, renkli, parcaKoy, cizgi, cokgen, aciYayi, ok } = window.KIT;
  const E = window.KIT_E;

  const kaldir = async (c, ...els) => { const l = els.flat(); await belir(c, l, 300, 0); l.forEach((e) => e.remove()); };
  const baslik = (c, g, metin) => { const t = yazi(c, g, 500, 66, metin, { size: 38, kalin: 700 }); gizle(t); return t; };
  /* Dik üçgen: dik köşe, dikey uç, yatay uç; dik açı işareti üçgenin grubundadır. */
  function dikUcgen(c, g, K, U, V, renk) {
    const t = cokgen(c, g, [U, K, V], renk, {});
    aciYayi(c, t.g, K, U, V, renk, 30, { dik: true });
    return t;
  }

  /* ---- 1. Verilen, istenen, şekil ---- */
  async function verilenIstenen(c, g) {
    const bas = baslik(c, g, 'Şekle dök');
    const t = E.verilenIstenen(c, g, { x: 70, y: 170, ikinci: 150, genislik: 290, size: 28, aralik: 52 });
    gizle(t.baslik, t.ayrac);
    const bag = renkli(c, g, 70, 410, [['x²', RENK.merkez], ' = 17² − 15²'], { hiza: 'start', size: 30 });
    const K = [640, 460], U = [640, 250], V = [752, 460];
    const sekil = dikUcgen(c, g, K, U, V, RENK.sekil);
    const e15 = yazi(c, g, 610, 362, '15', { size: 26 }), e17 = yazi(c, g, 722, 342, '17', { size: 26 });
    const ex = E.istenenKutu(c, g, 696, 508, 'x', { size: 26 });
    gizle(bag, sekil.g, e15, e17, ex.g);
    await belir(c, [bas, ...t.baslik, t.ayrac], 450);
    await t.verilen(0, '17 m'); await t.istenen(0, 'x');
    await t.verilen(1, '15 m');
    await c.wait(300);
    await belir(c, bag, 450);
    await belir(c, [sekil.g, e15, e17, ex.g], 550);
  }

  /* ---- 2. İpucu → araç ---- */
  async function ipucu(c, g) {
    const bas = baslik(c, g, 'Aracı seç');
    const t = E.ipucuArac(c, g, { x: 250, y: 170, ikinci: 250, size: 30, aralik: 62, genislik: 260 });
    gizle(t.basliklar, t.ayrac);
    await belir(c, [bas, ...t.basliklar, t.ayrac], 450);
    await t.ekle(0, 'eşit açı', 'Açı-Açı');
    await t.ekle(1, 'paralel', 'Tales');
    await t.ekle(2, 'yükseklik', 'Öklid');
    await t.ekle(3, 'dik üçgen', 'Pisagor');
  }

  /* ---- 3. Sırayla uygula: bir sonuç öbürünün girdisi ---- */
  async function sirayla(c, g) {
    const bas = baslik(c, g, 'Sırayla uygula');
    const mavi = dikUcgen(c, g, [90, 440], [90, 305], [270, 440], RENK.sekil);
    const e3 = yazi(c, g, 62, 378, '3', { size: 26 }), e4 = yazi(c, g, 180, 482, '4', { size: 26 });
    const e5 = yazi(c, g, 208, 350, '5', { size: 26, renk: RENK.iyi });
    const pis = yazi(c, g, 180, 268, 'Pisagor', { size: 24, renk: RENK.cizgi });
    const tur = dikUcgen(c, g, [440, 440], [440, 170], [800, 440], RENK.goruntu);
    const e6 = yazi(c, g, 412, 312, '6', { size: 26 });
    const eq = E.istenenKutu(c, g, 655, 262, '?', { size: 26 });
    const ben = yazi(c, g, 690, 196, 'benzerlik', { size: 24, renk: RENK.cizgi });
    const oran = renkli(c, g, 540, 524, ['6 / 3 = ', ['?', RENK.merkez], ' / ', ['5', RENK.iyi]], { size: 34 });
    gizle(bas, mavi.g, e3, e4, e5, pis, tur.g, e6, eq.g, ben, oran);
    await belir(c, [bas, mavi.g, e3, e4], 500);
    await belir(c, pis, 350);
    await belir(c, e5, 450);
    await c.wait(250);
    await belir(c, [tur.g, e6, eq.g], 500);
    await belir(c, ben, 350);
    await belir(c, oran, 500);
  }

  /* ---- 4. Denetle ---- */
  async function denetle(c, g) {
    const bas = baslik(c, g, 'Denetle');
    const d = E.denetim(c, g, { x: 330, y: 230, maddeler: ['Şekle uyar', 'Verilene uyar', 'Birim doğru'], size: 32, aralik: 78 });
    gizle(bas, d.g);
    await belir(c, [bas, d.g], 450);
    for (let i = 0; i < 3; i++) { await d.tikle(i, 550); await c.wait(250); }
  }

  /* ---- 5. İki yol ---- */
  async function ikiYol(c, g) {
    const bas = baslik(c, g, 'İki yol');
    const y = E.ikiYol(c, g, { x: 130, y: 200, genislik: 760, basliklar: ['Öklid', 'Benzerlik'], size: 30, aralik: 62 });
    gizle(y.basliklar, y.ayrac);
    await belir(c, [bas, ...y.basliklar, y.ayrac], 450);
    await y.adim(0, 'h² = 4 · 9');
    await y.adim(1, '4 / h = h / 9');
    const a = await y.adim(0, [['h = 6', RENK.iyi]]);
    const b = await y.adim(1, [['h = 6', RENK.iyi]]);
    await E.parla(c, [a.el, b.el], 800);
  }

  /* ---- 6. Çıkmaz yol ---- */
  async function cikmazYol(c, g) {
    const bas = baslik(c, g, 'Çıkmaz yol');
    const yo = yazi(c, g, 215, 312, 'Öklid', { size: 38, kalin: 700, renk: RENK.sekil });
    const yol = ok(c, g, [320, 300], [560, 300], RENK.cizgi, 5);
    const eksik = yazi(c, g, 760, 312, 'eksik: yükseklik', { size: 32, kalin: 700, renk: RENK.merkez });
    const cm = E.cikmaz(c, g, [yo, yol.g], [440, 300], { boyut: 34, son: 0.45 });
    gizle(bas, yo, yol.g, eksik);
    await belir(c, [bas, yo, yol.g], 500);
    await belir(c, eksik, 450);
    await c.wait(300);
    await cm.kapat(800);
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const bos = () => c.S('g', {}, svg);
    const kural = async (yap, cumle, not) => {
      const g = bos();
      await par(c.say(cumle), yap(c, g));
      await c.wait(500);
      c.note(not[0], 'Problem çözme', not[1]);
      return g;
    };
    const gec = async (g) => { c.clearSay(); await kaldir(c, g); };

    const g0 = bos(); yazi(c, g0, 500, 290, 'Problem çözme', { size: 46, kalin: 700 }); gizle(g0);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, g0, 450));
    await gec(g0);

    await gec(await kural(verilenIstenen, 'Önce verilen ve istenen, sonra ilişki, sonra şekil.',
      ['<b>Önce:</b> verilen, istenen, şekil.', 'eb-e5-1']));
    await gec(await kural(ipucu, 'Şekildeki ipucu aracı gösterir: eşit açı, paralel, yükseklik, dik üçgen.',
      ['<b>İpucu</b> aracı gösterir: Açı-Açı, Tales, Öklid, Pisagor.', 'eb-e5-2']));
    await gec(await kural(sirayla, 'Araçları sırayla uygularız; bir sonuç öbürünün girdisi olur.',
      ['<b>Sırayla:</b> bir sonuç öbürünün girdisi.', 'eb-e5-3']));
    await gec(await kural(denetle, 'Sonucu şekle, verilenlere ve birime göre denetleriz.',
      ['<b>Denetle:</b> şekil, verilenler, birim.', 'eb-e5-4']));
    await gec(await kural(ikiYol, 'İki yol aynı sonucu verirse çözüm sağlamlaşır.',
      ['<b>İki yol</b> aynı sonucu verirse sağlam.', 'eb-e5-5']));
    await kural(cikmazYol, 'Çıkmaz yolda eksik bilgiyi söyleriz; her yol her probleme uymaz.',
      ['<b>Çıkmaz yolda</b> eksik bilgiyi söyle.', 'eb-e5-6']);
    c.note('<b>Verilen, istenen, şekil; araç, uygulama, denetim; yola bak.</b>', 'Problem çözme', 'eb-e5-7');
  }

  Ders.start({
    id: 'eslik-ve-benzerlik-e5', kicker: 'Konu E · Eşlik ve benzerlik problemleri', title: 'Konu tekrarı: Eşlik ve benzerlik problemleri', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Eşlik ve benzerlik problemleri',
      hook: 'Dört dersin kuralları aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Problem çözmenin altı kuralını hatırlar.', 'Kuralları karışık sırayla gelen problemlerde uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    quiz: [
      {
        q: 'Bir merdiven duvara dayalı: 17 m boyunda, duvardaki ucu yerden 15 m yüksekte. Yerdeki ucu duvardan kaç m uzaktadır?',
        options: ['2 m', '8 m', '64 m'], answer: 1,
        why: ['2, 17 − 15 farkıdır; dik üçgende kenarların farkı alınmaz, kareleri çıkarılır.', 'Merdiven hipotenüstür: 17² − 15² = 289 − 225 = 64 ve √64 = 8 m.', '64, kareler farkıdır; yerdeki uzaklık bunun karekökü olan 8 m’dir.'], scene: 0,
      },
      {
        q: 'Aynı anda 1,5 m boyundaki çocuğun gölgesi 2 m; bir direğin gölgesi 12 m. Direk kaç metredir?',
        options: ['9 m', '16 m', '10,5 m'], answer: 0,
        why: ['Benzer üçgenlerde 1,5 / 2 = h / 12 olur; h = 9 m.', 'Oran ters kurulmuş: 12 × 2 ÷ 1,5 = 16. Boy ile gölge aynı oranda büyür.', '10,5, 12 − 1,5 farkıdır; benzerlikte oran korunur, fark korunmaz.'], scene: 0,
      },
      {
        q: 'Gonca’nın evi H noktasında. H’den yere dik, 200 cm’lik bir sopa dikilmiş; ucu T. Köşesi T’ye takılmış, kenarları dik açı yapan bir cetvelin bir kenarı boyunca bakınca yerdeki A noktası (|AH| = 5 cm) görülüyor; öbür kenarı boyunca bakınca Halûk’un evi görülüyor. H, A ile Halûk’un evi arasında. Halûk’un evi Gonca’nın evinden kaç m uzaktadır?',
        options: ['40 m', '8 m', '80 m'], answer: 2,
        why: ['40, 200’ü 5’e bölmekten çıkar; yükseklik bağıntısında 200’ün karesi alınır.', '8, 8 000 cm’nin metreye yanlış çevrilmesidir; 8 000 cm = 80 m’dir.', 'TH, dik köşeden hipotenüse yüksekliktir: 200² = 5 · uzaklık; uzaklık 40 000 ÷ 5 = 8 000 cm, yani 80 m.'], scene: 0,
      },
      {
        q: 'Stor perde problemi: masa 75 cm yüksekte, masa kenarı perdeden 30 cm uzakta. Perde açıkken ışık masa kenarından sonra 60 cm ilerliyor. Perde 75 cm indirilince ışığın masa kenarından sonra ilerlediği yola x denir. Bir öğrenci x = 100 cm buldu. Hangi denetim hatayı gösterir?',
        options: ['Perde indikçe ışık daha az ilerler; x, 60’tan küçük olmalıydı', 'Perde ne kadar inerse insin ışığın yolu hep 100 cm olur', 'Birim santimetre olduğu için 100 cm sonucu doğru kabul edilir'], answer: 0,
        why: ['Perde indikçe ışık masada daha az ilerler; doğru değer x = 10 cm, yani 60’tan küçüktür. 100 cm şekle uymaz.', 'Perde indikçe ışığın yolu değişir, sabit kalmaz. Üstelik 100, ilk durumdaki 60’tan büyük olurdu.', 'Birimin santimetre olması sonucu doğru yapmaz; sonuç şekle de uymalıdır. 100, 60’tan büyük olduğu için şekle uymaz.'], scene: 0,
      },
      {
        q: '15 eş üçgenin en küçük açıları ortada tam açıyı dolduruyor. Üçgenin bir açısı 100° ise üçüncü açısı kaç derecedir?',
        options: ['24°', '80°', '56°'], answer: 2,
        why: ['24°, en küçük açıdır; sorulan üçüncü açıdır.', '80°, yalnızca 180° − 100° işleminden çıkar; en küçük açı da çıkarılmalıdır.', '360° ÷ 15 = 24°; üçüncü açı 180° − 100° − 24° = 56°.'], scene: 0,
      },
      {
        q: 'Dik kenarları 15 ve 20 olan dik üçgende hipotenüse inen yükseklik kaç birimdir?',
        options: ['9 birim', '12 birim', '12,5 birim'], answer: 1,
        why: ['9, hipotenüsün bir parçasıdır (15² = p · 25); yükseklik h² = 9 · 16 ile bulunur.', 'Hipotenüs 25; 15² = p · 25 ile p = 9 ve q = 16 olur. h² = 9 · 16 = 144 ve h = 12 birim.', '12,5, hipotenüsün yarısıdır; yükseklik hipotenüsün yarısı değildir.'], scene: 0,
      },
      {
        q: 'Bir kulenin gölgesi 40 m, aynı anda 2 m’lik sopanın gölgesi 5 m. Kulenin boyunu bulmak için Öklid denenirse ne olur?',
        options: ['Çıkmaz: dik köşeden hipotenüse inen yükseklik yok; benzerlik gerekir', 'İşe yarar: Öklid her problemde çalışır, yöntem seçmek gerekmez', 'İşe yarar: gölge, dik köşeden hipotenüse inen yüksekliktir'], answer: 0,
        why: ['Öklid, dik köşeden hipotenüse inen yükseklik varsa kullanılır; bu problemde yok. Benzerlik kurulur: 2 / 5 = h / 40 ve h = 16 m.', 'Öklid her problemde çalışmaz; önce şekilde dik köşeden hipotenüse inen yükseklik aranır.', 'Gölge yer boyunca uzanır, dik köşeden hipotenüse inen yükseklik değildir. Öklid bu yüzden uygulanamaz.'], scene: 0,
      },
      {
        q: 'Arda, dik köşeli bir kitabı gözüne tutarak bir abideyi ölçüyor: kitabın bir kenarı abidenin tepesine, öbürü dibine bakıyor. Göz yerden 2 m yüksekte, abideye uzaklık 6 m. Abide kaç metredir?',
        options: ['18 m', '12 m', '20 m'], answer: 2,
        why: ['18, gözün üstünde kalan parçadır; gözün altındaki 2 m de abidenin boyuna katılır.', '12, 6 × 2 işleminden çıkar; yükseklik bağıntısında 6’nın karesi alınır: 6² = 2 · üst parça.', 'Yükseklik 6 m: 6² = 2 · üst parça ve üst parça 18 m. Abide 2 + 18 = 20 m.'], scene: 0,
      },
    ],
    summary: [
      '<b>Önce şekle dök, aracı seç, denetle, yola bak.</b>',
      'Verilen, istenen, şekil; araç, uygulama, denetim; yola bak.',
      'İpucu aracı gösterir; iki yol aynı sonucu verirse çözüm sağlamdır; çıkmaz yolda eksik bilgiyi söyle.',
    ],
  });
})();
