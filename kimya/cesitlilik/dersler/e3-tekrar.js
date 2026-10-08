/* E3 — Konu tekrarı: Molekül polarlığı
   Yeni bilgi yok. Tek sahnede konunun yedi kuralı toplanır; ardından dokuz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/E-molekul-polarligi.md (E3). Seslendirme yok.
   Tahtada yedi küçük pano durur; kuralın uzun hâli altyazıda ve defterdedir, panoda çizim ve en çok birkaç kelime vardır. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, gizle, belir, par } = window.KIT;
  const { lewis, uzayDolgu, bag } = window.KIT_E;

  /* Küçük bağ çizimi: simgeler silinir (kelime sayısı için), yalnızca çekirdek, bulut ve oklar kalır. */
  function mini(c, g, x, y, A, B, olcek) {
    const b = bag(c, g, x, y, A, B, { olcek });
    b.cekirdek[2].remove(); b.cekirdek[3].remove();
    return b;
  }
  const etiket = (c, g, x, y, t, renk = RENK.vurgu, size = 22) => yazi(c, g, x, y, t, { size, kalin: 700, renk });

  /* ---- 1. Konunun kuralları: yedi pano, her kural kendi panosuna çizilir, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const UST = [0, 1, 2, 3].map((i) => [10 + i * 245, 10, 235, 255]), ALT = [0, 1, 2].map((i) => [10 + i * 327, 285, 316, 265]);
    const pano = [...UST, ...ALT].map(([x, y, w, h]) => {
      const g = c.S('g', {}, svg);
      kutu(c, g, x, y, w, h);
      return { g, x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
    });
    gizle(pano.map((p) => p.g));

    // Kural 1: elektronegatiflik = çekme gücü (iki atom, farklı uzunlukta çekme okları).
    const p1 = pano[0], b1 = mini(c, p1.g, p1.cx, p1.cy - 10, 'H', 'F', 0.38);
    etiket(c, p1.g, p1.cx, p1.y + 225, 'elektronegatiflik');
    // Kural 2: fark yok → apolar, fark var → polar.
    const p2 = pano[1];
    const b2a = mini(c, p2.g, p2.x + 80, p2.y + 80, 'H', 'H', 0.3), b2b = mini(c, p2.g, p2.x + 80, p2.y + 190, 'H', 'F', 0.3);
    b2a.ayarla(0, b2a.boyOf('H'), b2a.boyOf('H'));
    etiket(c, p2.g, p2.x + 185, p2.y + 88, 'apolar'); etiket(c, p2.g, p2.x + 185, p2.y + 198, 'polar');
    // Kural 3: fark büyüdükçe polarlık artar.
    const p3 = pano[2];
    const b3a = mini(c, p3.g, p3.cx, p3.y + 70, 'H', 'Cl', 0.34), b3b = mini(c, p3.g, p3.cx, p3.y + 170, 'H', 'F', 0.34);
    etiket(c, p3.g, p3.cx, p3.y + 240, 'polarlık artar');
    // Kural 4: iki atomlu molekülde bağın polarlığı = molekülün polarlığı.
    const p4 = pano[3], m4 = uzayDolgu(c, p4.g, 'HF', p4.cx, p4.cy - 5, { olcek: 1.4, golge: [0.14, 0.75], harf: false, delta: [[0, '+', 'ust'], [1, '-', 'ust']] });
    etiket(c, p4.g, p4.cx, p4.y + 232, 'polar molekül');
    // Kural 5: merkez atomda çift varsa polar.
    const p5 = pano[4], l5 = lewis(c, p5.g, 'H2O', p5.cx, p5.cy - 15, { olcek: 1.0, merkez: 0, cerceve: 0 });
    etiket(c, p5.g, p5.cx, p5.y + 240, 'polar');
    // Kural 6: merkez atomda çift yoksa apolar.
    const p6 = pano[5], l6 = lewis(c, p6.g, 'CH4', p6.cx, p6.cy - 15, { olcek: 0.9, merkez: 0 });
    etiket(c, p6.g, p6.cx, p6.y + 245, 'apolar');
    // Kural 7: dipol momenti sıfır / sıfırdan farklı.
    const p7 = pano[6];
    etiket(c, p7.g, p7.cx, p7.cy - 30, 'sıfır: apolar', RENK.yazi, 30); etiket(c, p7.g, p7.cx, p7.cy + 40, 'sıfırdan farklı: polar', RENK.yazi, 30);

    // Her pano yalnızca kendi kuralı söylenirken parlak, sonra biraz soluk kalır.
    const goster = async (i) => { if (i > 0) await belir(c, pano[i - 1].g, 300, 0.55); await belir(c, pano[i].g, 450); };
    await c.say('Bu konuda öğrendiklerimizi kurallarda toplayalım.');

    await par(c.say('Elektronegatiflik, atomun bağ elektronlarını çekme gücüdür.'), goster(0));
    c.note('<b>Elektronegatiflik:</b> atomun bağ elektronlarını çekme gücü. Örnek: F &gt; H.', 'Elektronegatiflik', 'tekrar-elektronegatiflik');

    await par(c.say('Bağda fark yoksa apolar, varsa polar kovalent bağdır.'), goster(1));
    c.note('<b>Fark yoksa apolar, varsa polar bağ.</b> Örnek: H–H apolar, H–F polar.', 'Bağın türü', 'tekrar-bag-turu');

    await par(c.say('Fark büyüdükçe bağın polarlığı artar.'), goster(2));
    c.note('<b>Fark büyüdükçe bağın polarlığı artar.</b> Örnek: O–H, N–H\'den polar.', 'Fark ve polarlık', 'tekrar-fark');

    await par(c.say('İki atomlu molekülde bağın polarlığı, molekülün polarlığıdır.'), goster(3));
    c.note('<b>İki atomlu molekülde bağ polarsa molekül polar.</b> Örnek: HF.', 'İki atomlu molekül', 'tekrar-iki-atomlu');

    await par(c.say('Merkez atomda ortaklanmamış çift varsa molekül polardır.'), goster(4));
    c.note('<b>Merkez atomda çift varsa molekül polar.</b> Örnek: H<sub>2</sub>O.', 'Merkez atomda çift var', 'tekrar-cift-var');

    await par(c.say('Merkez atomda çift yoksa yük dağılımı dengedir; molekül apolardır.'), goster(5));
    c.note('<b>Merkez atomda çift yoksa molekül apolar.</b> Örnek: CH<sub>4</sub>.', 'Merkez atomda çift yok', 'tekrar-cift-yok');

    await par(c.say('Dipol momenti sıfırsa molekül apolar, sıfırdan farklıysa polardır.'), goster(6));
    c.note('<b>Dipol momenti sıfırsa apolar, sıfırdan farklıysa polar.</b> Örnek: CO<sub>2</sub> apolar.', 'Dipol momenti', 'tekrar-dipol');
  }

  Ders.start({
    id: 'cesitlilik-e3', kicker: 'Konu E · Molekül polarlığı', title: 'Konu tekrarı: Molekül polarlığı', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Molekül polarlığı',
      hook: 'Bağın ve molekülün polarlığına nasıl karar verildiği aklında mı? Önce kuralları topla, sonra <b>dokuz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun yedi kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun yedi kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Karbon (2,55) ile oksijen (3,44) bağ yapıyor. Hangi atom kısmen eksidir (δ<sup>−</sup>)?',
        options: ['Karbon', 'Oksijen', 'İkisi de'], answer: 1,
        why: ['Karbonun elektronegatifliği daha küçüktür; kısmen artı (δ<sup>+</sup>) olur.', 'Oksijen ortak elektronları daha kuvvetle çeker; kısmen eksi olur.', 'Elektronegatiflikler farklı olduğundan biri eksi, öteki artı olur.'], scene: 0 },
      { q: 'Hangisi apolar kovalent bağdır?',
        options: ['H–F', 'C–H', 'F–F'], answer: 2,
        why: ['Hidrojen ile flor farklı atomlardır; fark var, bağ polardır.', 'Karbon ile hidrojenin elektronegatifliği farklıdır; bağ polardır.', 'İki flor atomunun elektronegatifliği aynı; bağ apolardır.'], scene: 0 },
      { q: 'N–H, O–H ve F–H bağlarını polarlığı küçükten büyüğe sırala (H 2,20 · N 3,04 · O 3,44 · F 4,00).',
        options: ['F–H, O–H, N–H', 'N–H, O–H, F–H', 'O–H, N–H, F–H'], answer: 1,
        why: ['Bu sıralama büyükten küçüğe doğrudur.', 'Farklar 0,84 &lt; 1,24 &lt; 1,80; fark büyüdükçe polarlık artar.', 'N–H farkı (0,84) O–H farkından (1,24) küçüktür; N–H önce gelmeli.'], scene: 0 },
      { q: 'F<sub>2</sub>, HF ve N<sub>2</sub> moleküllerinden hangisinin dipol momenti sıfırdan farklıdır?',
        options: ['F<sub>2</sub>', 'N<sub>2</sub>', 'HF'], answer: 2,
        why: ['İki flor atomu elektronları eşit çeker; dipol momenti sıfırdır.', 'İki azot atomu elektronları eşit çeker; dipol momenti sıfırdır.', 'Elektronlar flora yığılır; kalıcı kutuplar var, dipol momenti sıfırdan farklı.'], scene: 0 },
      { q: 'CCl<sub>4</sub>\'te merkez atom karbondur ve çevresinde ortaklanmamış çift yoktur; dört klor atomu bağlıdır. Molekül polar mı, apolar mı?',
        options: ['Apolar; merkez atomda ortaklanmamış çift yok', 'Polar; C–Cl bağları polar', 'Polar; klor atomlarında ortaklanmamış çift var'], answer: 0,
        why: ['Merkez atomda çift yok; yük dağılımı dengede, dipol momenti sıfır.', 'Bağların polar olması molekülü tek başına polar yapmaz; merkez atomdaki çifte bakılır.', 'Klorlardaki çiftler merkez atomda olmadığı için sayılmaz.'], scene: 0 },
      { q: 'H<sub>2</sub>S\'de kükürt merkez atomdur ve iki ortaklanmamış çifti vardır (H 2,20 · S 2,58). Molekül için hangisi doğrudur?',
        options: ['Apolar; merkez atomda ortaklanmamış çift var', 'Polar; merkez atomda ortaklanmamış çift var', 'Apolar; hidrojenler aynı'], answer: 1,
        why: ['Merkez atomdaki çift yük dağılımını bozar; molekül apolar olamaz.', 'Merkez kükürtteki çiftler yük dağılımını bozar; molekül polar.', 'İki hidrojenin aynı olması merkez atomdaki çiftin etkisini ortadan kaldırmaz.'], scene: 0 },
      { q: 'CO<sub>2</sub>\'de oksijenlerde ortaklanmamış çift vardır ve karbon–oksijen bağları polardır; merkez karbonda çift yoktur. Molekül için hangisi doğrudur?',
        options: ['Polar; oksijenlerde ortaklanmamış çift var', 'Polar; bağlar polar', 'Apolar; merkez karbonda ortaklanmamış çift yok'], answer: 2,
        why: ['Oksijenlerdeki çiftler merkez atomda olmadığı için sayılmaz.', 'Bağların polar olması tek başına molekülü polar yapmaz.', 'Merkez karbonda çift yok; yük dağılımı dengede, dipol momenti sıfır.'], scene: 0 },
      { q: 'Bağlarının hepsi polar olan bir molekül, bütün olarak apolar olabilir mi?',
        options: ['Olamaz; polar bağlar molekülü polar yapar', 'Olabilir; merkez atomda ortaklanmamış çift yoksa', 'Yalnızca iki atomlu moleküllerde olabilir'], answer: 1,
        why: ['CH<sub>4</sub> ve CO<sub>2</sub> gibi moleküllerde polar bağlara rağmen yük dağılımı dengedir.', 'Merkez atomda çift yoksa yük dağılımı dengede olur ve molekül apolardır.', 'İki atomlu molekülde bağ polarsa molekül de polardır; apolar olması bağın apolar olmasına bağlıdır.'], scene: 0 },
      { q: 'H<sub>2</sub>O ve CO<sub>2</sub> moleküllerinin ikisinde de polar bağlar vardır; H<sub>2</sub>O polar, CO<sub>2</sub> apolardır. Fark nereden gelir?',
        options: ['H<sub>2</sub>O\'nun merkez atomunda ortaklanmamış çift vardır, CO<sub>2</sub>\'nin yoktur', 'CO<sub>2</sub>\'de daha çok atom vardır', 'H<sub>2</sub>O\'daki bağlar CO<sub>2</sub>\'dekinden uzundur'], answer: 0,
        why: ['Oksijendeki çiftler yük dağılımını bozar; karbondioksitte merkez karbonda çift yoktur.', 'Atom sayısı polarlığı belirlemez; merkez atomdaki çifte bakılır.', 'Bağ uzunluğu bu konudaki ölçütlerden biri değildir.'], scene: 0 },
    ],
    summary: [
      'Elektronegatifliği büyük atom ortak elektronları kendine çeker.',
      'Fark yoksa bağ apolar, varsa polardır; fark büyüdükçe polarlık artar.',
      'Merkez atomda ortaklanmamış çift varsa molekül polar, yoksa apolardır.',
      'Dipol momenti sıfırsa molekül apolar, sıfırdan farklıysa polardır.',
      '<b>Bağ polar olabilir; molekülün polarlığına merkez atomdaki ortaklanmamış çift de karar verir.</b>',
    ],
    nextLesson: { href: 'f1-iyonik-bilesik-adi.html', label: 'Sonraki konu: Bileşiklerin adlandırılması ›' },
  });
})();
