/* C4 — Konu tekrarı: Hâl değişimi
   Yeni bilgi yok. Tek sahnede konunun altı kuralı 3 × 2 kart ızgarasında sırayla toplanır; ardından sekiz soru gelir.
   Senaryo: plan/fizik/enerji/senaryolar/C-hal-degisimi.md (C4). Çizimler şematiktir, sayı taşımaz.
   Konu C'nin araç dosyası yok; küçük çizimler bu dosyada düz vektörle kurulur. Figür kullanılmaz. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, belir, par, ok, cubuk } = window.KIT;
  const { termometre } = window.KIT_A;
  const { ease } = Ders;
  const KX = [40, 355, 670], KY = [70, 300];   // kartların sol üst köşeleri
  const KW = 290, KH = 200;

  const yari = (el, o) => { el.setAttribute('fill-opacity', o); return el; };

  /* Kartın çerçevesi ve (varsa) başlığı. */
  function kart(c, g, x0, y0, ad, renk) {
    kutu(c, g, x0, y0, KW, KH, { rx: 16, w: 3 });
    if (ad) yazi(c, g, x0 + KW / 2, y0 + 34, ad, { size: 24, kalin: 700, renk });
  }

  /* 1. Isı almadan erimez: erime sıcaklığındaki buz küpü, kapalı ısıtıcı, "0 J" sayacı. */
  function isiAlmadan(c, g, x0, y0) {
    kart(c, g, x0, y0, 'Isı almadan erimez', RENK.isi);
    kutu(c, g, x0 + 30, y0 + 160, 150, 26, { rx: 8, renk: RENK.gri });
    c.S('circle', { cx: x0 + 160, cy: y0 + 173, r: 5, fill: 'none', stroke: RENK.gri, 'stroke-width': 2 }, g);
    yari(kutu(c, g, x0 + 75, y0 + 96, 60, 60, { rx: 6, dolgu: RENK.soguk, renk: RENK.soguk, w: 3 }), 0.35);
    yazi(c, g, x0 + 238, y0 + 146, '0 J', { size: 32, kalin: 700, renk: RENK.isi });
  }

  /* 2. Kütle: 100 g ve 200 g bloklar, altlarında 60 ve 120 boyunda turuncu çubuk. */
  function kutle(c, g, x0, y0) {
    kart(c, g, x0, y0, 'Kütle', RENK.kutle);
    yari(kutu(c, g, x0 + 50, y0 + 84, 40, 40, { rx: 6, dolgu: RENK.kutle, renk: RENK.kutle, w: 3 }), 0.35);
    yari(kutu(c, g, x0 + 140, y0 + 84, 80, 40, { rx: 6, dolgu: RENK.kutle, renk: RENK.kutle, w: 3 }), 0.35);
    const a = cubuk(c, g, x0 + 40, y0 + 154, RENK.isi, { h: 16 }), b = cubuk(c, g, x0 + 120, y0 + 154, RENK.isi, { h: 16 });
    return { a, b, wa: 60, wb: 120 };
  }

  /* 3. Cins: aynı kütlede iki blok; buzun altında uzun, mumun altında yarı uzun çubuk. */
  function cins(c, g, x0, y0) {
    kart(c, g, x0, y0, 'Cins', RENK.yazi);
    yari(kutu(c, g, x0 + 55, y0 + 80, 50, 40, { rx: 6, dolgu: RENK.kutle, renk: RENK.kutle, w: 3 }), 0.35);
    yari(kutu(c, g, x0 + 185, y0 + 80, 50, 40, { rx: 6, dolgu: RENK.kutle, renk: RENK.kutle, w: 3 }), 0.35);
    const a = cubuk(c, g, x0 + 20, y0 + 144, RENK.isi, { h: 16 }), b = cubuk(c, g, x0 + 180, y0 + 144, RENK.isi, { h: 16 });
    yazi(c, g, x0 + 80, y0 + 188, 'buz', { size: 22, renk: RENK.soluk });
    yazi(c, g, x0 + 210, y0 + 188, 'mum', { size: 22, renk: RENK.soluk });
    return { a, b, wa: 120, wb: 60 };
  }

  /* 4. Saflık ve basınç: tuz serpilmiş buz, sarı küçük termometre, kapaklı tencere. */
  function saflikBasinc(c, g, x0, y0) {
    kart(c, g, x0, y0, 'Saflık ve basınç', RENK.sicaklik);
    yari(kutu(c, g, x0 + 20, y0 + 100, 60, 60, { rx: 6, dolgu: RENK.soguk, renk: RENK.soguk, w: 3 }), 0.35);
    [[34, 114], [52, 110], [68, 118], [40, 130], [58, 130], [72, 142], [34, 148], [52, 148]].forEach(([dx, dy]) =>
      c.S('circle', { cx: x0 + 20 + dx - 20, cy: y0 + 100 + dy - 100, r: 3, fill: '#ffffff' }, g));
    termometre(c, g, { x: x0 + 128, y: y0 + 172, h: 80, T: 50 });
    kutu(c, g, x0 + 180, y0 + 132, 86, 42, { rx: 6, renk: RENK.cizgi });
    kutu(c, g, x0 + 174, y0 + 120, 98, 12, { rx: 4, renk: RENK.cizgi });
    kutu(c, g, x0 + 211, y0 + 106, 24, 14, { rx: 4, renk: RENK.cizgi });
  }

  /* 5. Yatay basamak: küçük ısı–sıcaklık grafiği (eğik, yatay, eğik, yatay); basamaklar turuncu. */
  function basamak(c, g, x0, y0) {
    kart(c, g, x0, y0, 'Yatay basamak', RENK.isi);
    const ox = x0 + 45, oy = y0 + 182;
    ok(c, g, [ox, oy], [ox, oy - 134], RENK.sicaklik, 3);
    ok(c, g, [ox, oy], [ox + 215, oy], RENK.isi, 3);
    const P = [[ox + 3, oy - 3], [ox + 38, oy - 32], [ox + 90, oy - 32], [ox + 130, oy - 86], [ox + 190, oy - 86]];
    cizgi(c, g, P[0], P[1], RENK.sicaklik, 4);
    cizgi(c, g, P[1], P[2], RENK.isi, 7);
    cizgi(c, g, P[2], P[3], RENK.sicaklik, 4);
    cizgi(c, g, P[3], P[4], RENK.isi, 7);
  }

  /* 6. Q = m · L; sonra erime–donma ve buharlaşma–yoğuşma eşitliği. */
  function formul(c, g, x0, y0) {
    kart(c, g, x0, y0, null);
    renkli(c, g, x0 + KW / 2, y0 + 98, [['Q', RENK.isi], ' = ', ['m', RENK.kutle], ' · L'], { size: 40, kalin: 700 });
    const s1 = yazi(c, g, x0 + KW / 2, y0 + 150, 'L: maddeye göre', { size: 22, renk: RENK.soluk });
    const s2 = yazi(c, g, x0 + KW / 2, y0 + 184, 'buharlaşma = yoğuşma', { size: 22, renk: RENK.soluk });
    gizle(s2);
    return { s1, s2 };
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const onceki = [];
    const koy = (g, cx, cy, s) => g.setAttribute('transform', `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`);
    const sirala = async (yap, i, cumle, o = {}) => {
      const x0 = KX[i % 3], y0 = KY[Math.floor(i / 3)], cx = x0 + KW / 2, cy = y0 + KH / 2;
      const g = c.S('g', {}, svg); const r = yap(c, g, x0, y0); gizle(g); koy(g, cx, cy, 0.9);
      c.clearSay();
      const gel = c.tween(400, (e) => { g.style.opacity = e; koy(g, cx, cy, 0.9 + 0.1 * e); }, ease.out);
      await par(c.say(cumle, o.say), gel, ...onceki.map((e) => belir(c, e, 400, 0.45)), o.hareket ? o.hareket(r) : null);
      g.removeAttribute('transform');
      await c.wait(400);
      onceki.push(g);
      return r;
    };
    const buyut = (r) => c.tween(450, (e) => { r.a.boy(r.wa * e); r.b.boy(r.wb * e); }, ease.out);

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Hâl değişimi', { size: 64, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    await sirala(isiAlmadan, 0, 'Erime sıcaklığındaki madde, ısı almadan hâl değiştirmez.');
    c.note('Erime sıcaklığındaki madde, ısı almadan hâl değiştirmez.', 'Isı gerekir', 'en-c4-isi');
    await sirala(kutle, 1, 'Kütle büyüdükçe hâl değişimi için gereken ısı da büyür.', { hareket: buyut });
    c.note('Kütle büyüdükçe gereken ısı da büyür.', 'Kütle', 'en-c4-kutle');
    await sirala(cins, 2, 'Gereken ısı maddenin cinsine göre değişir.', { hareket: buyut });
    c.note('Gereken ısı maddenin cinsine göre değişir.', 'Cins', 'en-c4-cins');
    await sirala(saflikBasinc, 3, 'Saflık ve basınç, hâl değişim sıcaklığını değiştirir.');
    c.note('Saflık ve basınç, hâl değişim sıcaklığını değiştirir.', 'Saflık ve basınç', 'en-c4-saflik');
    await sirala(basamak, 4, 'Hâl değişirken ısı girer, sıcaklık sabit kalır; grafikte yatay basamak.');
    c.note('Hâl değişirken ısı girer, sıcaklık sabit kalır.', 'Yatay basamak', 'en-c4-basamak');
    const f = await sirala(formul, 5, 'Hâl değişimi için gereken ısı Q = m · L ile hesaplanır.',
      { say: { speak: 'Hâl değişimi için gereken ısı Q eşittir m çarpı L ile hesaplanır.' } });
    c.note('Q = m · L; L maddeye göre değişir.', 'Isı hesabı', 'en-c4-formul');
    c.clearSay();
    const degis = (async () => {
      await belir(c, f.s1, 250, 0);
      f.s1.textContent = 'erime = donma';
      await par(belir(c, f.s1, 250, 1), belir(c, f.s2, 250, 1));
    })();
    await par(c.say('Erime ısısı donma ısısına, buharlaşma ısısı yoğuşma ısısına eşittir.'), degis);
    c.note('Erime ısısı donma ısısına, buharlaşma ısısı yoğuşma ısısına eşittir.', 'Eşitlik', 'en-c4-esit');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'enerji-c4', kicker: 'Konu C · Hâl değişimi', title: 'Konu tekrarı: Hâl değişimi', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Hâl değişimi',
      hook: 'Hâl değişiminin kuralları aklında mı? Önce altı kuralı topla, sonra <b>sekiz soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları farklı durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Ela, erime sıcaklığındaki 500 g buzu eritecek (L = 334 J/g). Kaç J ısı gerekir?',
        options: ['334 J', '167.000 J', '66.800 J'], answer: 1,
        why: ['334 J, bir gramın erime ısısıdır; 500 g için bunu kütleyle çarpmak gerekir.', 'Q = m · L = 500 · 334 = 167.000 J.', '66.800 J, 200 g buzun erime ısısıdır; burada kütle 500 g’dır.'], scene: 0,
      },
      {
        q: 'Kaynama sıcaklığındaki 3 kg su tamamen buharlaştırılacak (L = 2.260 kJ/kg). Kaç kJ ısı gerekir?',
        options: ['6.780 kJ', '2.260 kJ', '2.263 kJ'], answer: 0,
        why: ['Q = m · L = 3 · 2.260 = 6.780 kJ.', '2.260 kJ, 1 kg suyun buharlaşma ısısıdır; kütle 3 kg olduğundan çarpmak gerekir.', 'Kütle ile erime ya da buharlaşma ısısı toplanmaz, çarpılır.'], scene: 0,
      },
      {
        q: 'Düdüklü tencerede suyun kaynama sıcaklığı 100 °C’tan yüksektir. Bunun nedeni hangisidir?',
        options: ['Suyun saf olmaması', 'Suyun kütlesinin çok olması', 'İçerideki basıncın yüksek olması'], answer: 2,
        why: ['Su saf olsa da kaynama sıcaklığı yükselir; asıl neden kapalı kabın içindeki basınçtır.', 'Kütle yalnızca gereken ısıyı değiştirir, kaynama sıcaklığını değiştirmez.', 'Kapaklı kapta basınç büyür ve basınç büyüdükçe kaynama sıcaklığı yükselir.'], scene: 0,
      },
      {
        q: 'Kütleleri eşit iki katı erime sıcaklığında, özdeş ısıtıcılarla ısıtılıyor. X, Y’den önce tamamen eriyor. Hangisi doğrudur?',
        options: ['X’in erime ısısı, Y’ninkinden büyüktür', 'İki maddenin erime ısısı eşittir', 'X’in erime ısısı, Y’ninkinden küçüktür'], answer: 2,
        why: ['Erime ısısı büyük olan madde daha uzun sürede erir; X daha önce erimiştir.', 'Erime ısıları eşit olsaydı iki madde aynı anda erirdi.', 'Kütleler ve ısıtıcılar aynıdır; X daha az ısıyla eridiği için erime ısısı daha küçüktür.'], scene: 0,
      },
      {
        q: '“Hâl değiştirirken saf bir maddenin sıcaklığı yükselir.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; ısı hep sıcaklığı yükseltir', 'Yanlıştır; sıcaklık sabit kalır', 'Doğrudur; yalnızca erimede'], answer: 1,
        why: ['Hâl değişirken ısı girse de sıcaklık yükselmez; grafikte yatay basamak vardır.', 'Hâl değişirken alınan ısı hâli değiştirmeye harcanır; saf maddenin sıcaklığı sabit kalır.', 'Kaynarken ve buharlaşırken de sıcaklık sabit kalır; yalnızca erimeye özgü değildir.'], scene: 0,
      },
      {
        q: 'Eşit zaman aralıklarında eşit ısı veren bir kaynakla katı bir madde ısıtılıyor. Sıcaklık–zaman grafiğinde sıcaklığın sabit kaldığı iki yatay parça var: erime için 2t ile 3t arasında (3T sıcaklığında), buharlaşma için 6t ile 9t arasında (7T sıcaklığında). Buharlaşma için gereken ısı, erime için gerekenin kaç katıdır?',
        options: ['9 katı', '2 katı', '3 katı'], answer: 2,
        why: ['9t, buharlaşmanın bittiği andır; buharlaşma 3t süre sürer.', '2t, erimenin başladığı andır; erime t süre sürer.', 'Erime t, buharlaşma 3t süre sürer; ısı süreyle orantılı olduğundan buharlaşma 3 kat ısı ister.'], scene: 0,
      },
      {
        q: 'Soğuk bir gece göldeki su donarken çevredeki havaya ne olur?',
        options: ['Hava ısı verir; sıcaklığı düşer', 'Hava ısı alır; sıcaklığı bir miktar artar', 'Havayla ısı alışverişi olmaz'], answer: 1,
        why: ['Donan su ısı verir; ısıyı alan taraf havadır, havanın sıcaklığı düşmez.', 'Donan su çevreye ısı verir; hava bu ısıyı alır ve sıcaklığı bir miktar artar.', 'Donarken su çevreye ısı verir; havayla ısı alışverişi vardır.'], scene: 0,
      },
      {
        q: 'Erime sıcaklığındaki 2 kg buzu eriten ısı, kaynama sıcaklığındaki 0,5 kg suyu buharlaştırmaya yeter mi? (Buzun erime ısısı 334 kJ/kg; suyun buharlaşma ısısı 2.260 kJ/kg.)',
        options: ['Yeter; buzun kütlesi daha büyüktür', 'Yetmez; 668 kJ, 1.130 kJ’den küçüktür', 'Yeter; iki ısı eşittir'], answer: 1,
        why: ['Gereken ısı yalnızca kütleye bağlı değildir; erime ve buharlaşma ısıları çok farklıdır.', 'Buz için 2 · 334 = 668 kJ, buhar için 0,5 · 2.260 = 1.130 kJ gerekir; 668 kJ yetmez.', 'İki ısı eşit değildir: 668 kJ ile 1.130 kJ bulunur.'], scene: 0,
      },
    ],
    summary: [
      '<b>Hâl değişirken ısı girer, sıcaklık sabit kalır; gereken ısı Q = m · L ile hesaplanır.</b>',
      'Erime sıcaklığındaki madde ısı almadan hâl değiştirmez; kütle büyüdükçe ve cins değiştikçe gereken ısı değişir.',
      'Saflık ve basınç hâl değişim sıcaklığını değiştirir; erime ısısı donma ısısına, buharlaşma ısısı yoğuşma ısısına eşittir.',
    ],
  });
})();
