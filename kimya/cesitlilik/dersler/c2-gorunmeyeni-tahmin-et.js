/* C2 — Görünmeyeni tahmin et: çekirdekler ortak elektronları çeker
   Animasyonda görülmeyen kuvvetler yüklere bakılarak tahmin edilir; tahmin süreç aşamalı görselle sınanır; aynı model hidrojen
   florüre ve oksijene uygulanır.
   Senaryo: plan/kimya/cesitlilik/senaryolar/C-kovalent-bag.md ("C2"). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Kuvvet okları şematiktir: boyları yalnızca "uzun" ile "kısa" ayrımını gösterir, sayı taşımaz. Hangi çekirdeğin elektronları daha çok
   çektiği (E konusu) söylenmez. Önerme ve eşleştirme sahneleri kart başına seçimle kurulur (sürükleme yok); kartların tam cümlesi
   sorunun panelinde, tahtada kısa adı durur. */
(() => {
  'use strict';
  const { RENK, ileri, yazi, cizgi, kutu, gizle, belir, par, ok, yuk, etkilesim, sinifla } = window.KIT;
  const { BULUT, cekirdekEtiket, iki, kart, rozet, bosKutu } = window.KIT_C;
  const { lerp, ease } = Ders;

  const birim = (P, Q) => { const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]) || 1; return [(Q[0] - P[0]) / d, (Q[1] - P[1]) / d]; };
  const mesafe = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const kay = (P, u, t) => [P[0] + u[0] * t, P[1] + u[1] * t];
  const bulutCiz = (c, p, P, R, a = 0.13) => c.S('circle', { cx: P[0], cy: P[1], r: R, fill: BULUT, 'fill-opacity': a, stroke: BULUT, 'stroke-opacity': 0.55, 'stroke-width': 2, 'stroke-dasharray': '3 7' }, p);

  /* Dört aşamalı süreç çizimi (yazısız; ölçeklenebilir): iki atom, çekirdekler ve elektronlar, aşamaya göre oklar.
     i: 0 uzak · 1 yaklaşırken · 2 denge ve ortak kullanım · 3 ortak elektronlar çekirdekler arasında.
     o: { k ölçek, d çekirdekler arası uzaklık, Rl, Rr sol ve sağ bulut yarıçapı, rn sağ çekirdek yarıçapı }. Dönen grup yerel (0,0) merkezlidir. */
  function asama(c, p, cx, cy, i, o = {}) {
    const k = o.k || 1, g = c.S('g', { transform: `translate(${cx},${cy}) scale(${k})` }, p);
    const Rl = o.Rl || 75, Rr = o.Rr || 75, d = o.d != null ? o.d : [250, 150, 100, 100][i];
    const N = [[-d / 2, 0], [d / 2, 0]];
    bulutCiz(c, g, N[0], Rl); bulutCiz(c, g, N[1], Rr);
    yuk(c, g, N[0], 'arti', 14); yuk(c, g, N[1], 'arti', o.rn || 14);
    const E = [[[-26, -30], [26, 30]], [[-40, -50], [40, 50]]][i < 2 ? i : 0];
    const e = i < 2 ? [[N[0][0] + E[0][0], E[0][1]], [N[1][0] + E[1][0], E[1][1]]] : (i === 2 ? [[-10, -22], [10, 22]] : [[-10, -20], [11, 21]]);
    if (i === 1) {
      [0, 1].forEach((j) => {
        const own = N[j], oth = N[1 - j], u1 = birim(e[j], own), u2 = birim(e[j], oth), dist = mesafe(e[j], own);
        ok(c, g, kay(e[j], u1, 8), kay(e[j], u1, dist - 12), RENK.cekme, 5);
        ok(c, g, kay(e[j], u2, 8), kay(e[j], u2, 34), RENK.cekme, 3);
      });
      ok(c, g, [N[0][0] - 20, 0], [N[0][0] - 52, 0], RENK.itme, 4); ok(c, g, [N[1][0] + 20, 0], [N[1][0] + 52, 0], RENK.itme, 4);
      const u = birim(e[1], e[0]);
      ok(c, g, kay(e[0], u, 10), kay(e[0], u, 40), RENK.itme, 3); ok(c, g, kay(e[1], u, -10), kay(e[1], u, -40), RENK.itme, 3);
    }
    if (i === 3) {
      [0, 1].forEach((j) => [0, 1].forEach((m) => {
        const u = birim(N[j], e[m]), dist = mesafe(N[j], e[m]);
        ok(c, g, kay(N[j], u, 18), kay(N[j], u, dist - 12), RENK.cekme, 3.5);
      }));
    }
    e.forEach((q) => yuk(c, g, q, 'eksi', 8));
    return g;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const a = iki(c, svg, { cx: 500, cy: 250, olcek: 1.4, d: 84, tohum: 6 });
    a.canlan();
    const cg = c.S('g', {}, svg);
    yuk(c, cg, [330, 250], 'arti', 30); yuk(c, cg, [670, 250], 'eksi', 18);
    const cek = etkilesim(c, svg, [330, 250], [670, 250], 'cekme', { b: 44, boy: 90 });
    gizle(a.g, cg, cek);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, a.g, 500));
    await c.choice({
      tag: 'Hatırla', q: 'İki ametal atomu bağ kurunca elektronlara ne olur?',
      options: ['Ortaklaşa kullanılırlar', 'Bir atomdan ötekine verilirler', 'Elektron denizinde serbestçe dolaşırlar'], answer: 0,
      hints: ['', 'Kovalent bağda elektron verilmez, ortak kullanılır.', 'Kovalent bağda elektron verilmez, ortak kullanılır.'],
      right: 'Evet. Kovalent bağda elektron verilmez, ortak kullanılır.',
    });
    await c.wait(500);
    c.clearSay();
    await par(belir(c, a.g, 400, 0), belir(c, cg, 500));
    await c.choice({
      tag: 'Hatırla', q: 'Bir atomun çekirdeği ile öteki atomun elektronu arasındaki kuvvet hangisidir?',
      options: ['İtme', 'Çekme', 'Kuvvet yoktur'], answer: 1,
      hints: ['Çekirdek artı, elektron eksi yüklüdür; zıt yükler çeker.', '', 'Çekirdek artı, elektron eksi yüklüdür; zıt yükler çeker.'],
      right: 'Evet. Zıt yükler birbirini çeker.',
    });
    await par(belir(c, cek, 450), c.say('Zıt yükler birbirini çeker.'));
    await c.wait(500);
    await c.say('Bugün animasyonda göremediğimiz kuvvetleri tahmin edeceğiz.', { speak: '[curious] Bugün animasyonda göremediğimiz kuvvetleri tahmin edeceğiz.' });
  }

  /* ---- 2. Görünmeyen kuvveti yüklerden tahmin et ---- */
  async function tahmin(c) {
    const svg = c.svg(1000, 562);
    const A = [170, 300], B = [480, 300], E1 = [275, 205], E2 = [385, 395];
    const res = c.S('g', {}, svg);
    bulutCiz(c, res, A, 125, 0.09); bulutCiz(c, res, B, 125, 0.09);
    yuk(c, res, A, 'arti', 20); yuk(c, res, B, 'arti', 20); yuk(c, res, E1, 'eksi', 11); yuk(c, res, E2, 'eksi', 11);
    const adlar = c.S('g', {}, svg);
    [['A', 170, 352], ['B', 480, 352], ['1', 302, 196], ['2', 360, 424]].forEach(([t, x, y]) => yazi(c, adlar, x, y, t, { size: 24, kalin: 700, renk: RENK.soluk }));
    gizle(res, adlar);

    // Tablo: çift · yük · kuvvet.
    const tab = c.S('g', {}, svg);
    yazi(c, tab, 640, 72, 'çift', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, tab, 810, 72, 'yük', { size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, tab, 925, 72, 'kuvvet', { size: 22, kalin: 500, renk: RENK.soluk });
    cizgi(c, tab, [620, 90], [985, 90], RENK.kenarlik, 1.5);
    gizle(tab);
    const CIFT = [
      { ad: 'A–B', yuk: '+/+', tur: 'itme', P: A, Q: B, b: 22 }, { ad: 'A–1', yuk: '+/−', tur: 'cekme', P: A, Q: E1, b: 20 },
      { ad: 'B–1', yuk: '+/−', tur: 'cekme', P: B, Q: E1, b: 20 }, { ad: '1–2', yuk: '−/−', tur: 'itme', P: E1, Q: E2, b: 16 },
      { ad: 'A–2', yuk: '+/−', tur: 'cekme', P: A, Q: E2, b: 20 }, { ad: 'B–2', yuk: '+/−', tur: 'cekme', P: B, Q: E2, b: 20 },
    ];
    const satirlar = CIFT.map((q, i) => {
      const y = 140 + 66 * i, g = c.S('g', {}, svg);
      yazi(c, g, 640, y, q.ad, { hiza: 'start', size: 28, kalin: 600 });
      yazi(c, g, 810, y, q.yuk, { size: 28, kalin: 600, renk: RENK.soluk });
      q.kuvvet = yazi(c, g, 925, y, q.tur === 'itme' ? 'itme' : 'çekme', { size: 28, kalin: 700, renk: q.tur === 'itme' ? RENK.itme : RENK.cekme });
      q.ok = etkilesim(c, svg, q.P, q.Q, q.tur, { b: q.b, boy: 44 });
      q.isik = cizgi(c, svg, q.P, q.Q, RENK.vurgu, 9, { 'stroke-opacity': 0.35 });
      gizle(g, q.ok, q.isik);
      q.g = g;
      return g;
    });
    const isik = (i, ac) => { CIFT[i].isik.style.opacity = ac ? 1 : 0; };
    const goster = (i) => par(belir(c, CIFT[i].g, 400), belir(c, CIFT[i].ok, 450));

    await par(c.say('Animasyonda elektronların yerini gördük; kuvvetleri göremedik.'), belir(c, res, 500));
    await c.say('Görünmeyen kuvveti, yüklere bakarak tahmin edebiliriz.');
    await par(c.say('Tahtada iki çekirdek ve iki ortak elektron var.'), belir(c, adlar, 450));
    await c.say('Çekirdekler artı, elektronlar eksi yüklüdür.');
    await c.say('Aynı yükler iter, zıt yükler çeker.');
    await par(c.say('Elektronlar iki çekirdeğin arasında: bu kez altı çiftin hepsini sayarız.'), belir(c, tab, 450));
    isik(0, true);
    await par(c.say('Çekirdek A ile çekirdek B: ikisi de artı, birbirini iter.'), goster(0));
    isik(0, false); isik(1, true);
    await par(c.say('Çekirdek A ile elektron 1: zıt yükler, birbirini çeker.', { speak: 'Çekirdek A ile birinci elektron: zıt yükler, birbirini çeker.' }), goster(1));
    isik(1, false);

    // Birlikte çöz: üçüncü satırın kuvveti eksik.
    c.clearSay();
    isik(2, true);
    const k3 = CIFT[2].kuvvet; k3.textContent = '?'; k3.style.fill = RENK.vurgu;
    await belir(c, CIFT[2].g, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Üçüncü satırı sen tamamla: çekirdek B ile elektron 1 arasındaki kuvvet hangisi?',
      options: ['Çekme', 'İtme', 'Kuvvet yok'], answer: 0,
      hints: ['', 'Çekirdek B artı, elektron eksi yüklüdür.', 'Elektron 1’e öteki çekirdek de yakın.'],
      right: 'Evet. Zıt yükler birbirini çeker.',
    });
    k3.textContent = 'çekme'; k3.style.fill = RENK.cekme; isik(2, false);
    await par(belir(c, CIFT[2].ok, 450), c.say('Elektron 1’i yalnızca çekirdek A değil, çekirdek B de çeker.', { speak: 'Birinci elektronu yalnızca çekirdek A değil, çekirdek B de çeker.' }));

    // Sor: iki elektron.
    c.clearSay();
    isik(3, true);
    const k4 = CIFT[3].kuvvet; k4.textContent = '?'; k4.style.fill = RENK.vurgu;
    await belir(c, CIFT[3].g, 400);
    await c.choice({
      tag: 'Sıra sende', q: 'Elektron 1 ile elektron 2 arasındaki kuvvet hangisi?',
      options: ['Çekme', 'İtme', 'Kuvvet yok'], answer: 1,
      hints: ['İkisi de eksi yüklü.', '', 'Aynı yükler birbirine ne yapar?'],
      right: 'Evet. Aynı yükler birbirini iter.',
    });
    k4.textContent = 'itme'; k4.style.fill = RENK.itme; isik(3, false);
    await par(belir(c, CIFT[3].ok, 450), c.say('İki elektron birbirini iter.'));

    // Gör: kalan iki çift aynı yük kuralıyla dolar.
    const kalan = (async () => {
      isik(4, true); await goster(4); isik(4, false);
      isik(5, true); await goster(5); isik(5, false);
    })();
    await par(c.say('İkinci elektronu da iki çekirdek çeker.', { speak: 'İkinci elektronu da iki çekirdek çeker.' }), kalan);
    await c.say('İki itme, dört çekme: ortak elektronları iki çekirdek de çeker.');
  }

  /* ---- 3. Tahmini süreç aşamalı görselle karşılaştır ---- */
  async function surec(c) {
    const svg = c.svg(1000, 562);
    const PX = [20, 510, 20, 510], PY = [20, 20, 290, 290], W = 470, H = 250;
    const paneller = PX.map((x, i) => {
      const g = c.S('g', {}, svg), r = kutu(c, g, x, PY[i], W, H);
      asama(c, g, x + W / 2, PY[i] + 135, i);
      yazi(c, g, x + 34, PY[i] + 44, String(i + 1), { size: 28, kalin: 700, renk: RENK.soluk });
      gizle(g);
      return { g, r };
    });
    const denge = yazi(c, svg, PX[2] + W / 2, PY[2] + 236, 'denge', { size: 24, kalin: 700, renk: RENK.vurgu });
    gizle(denge);
    const vur = (i) => paneller.forEach((q, j) => { q.r.style.stroke = j === i ? RENK.vurgu : RENK.kenarlik; q.r.style.strokeWidth = j === i ? 4 : 2; });

    await c.say('Şimdi tahminimizi süreç aşamalı görselle karşılaştıralım.');
    vur(0);
    await par(c.say('Birinci aşama: atomlar uzakta, aralarında kuvvet yok.'), belir(c, paneller[0].g, 500));
    vur(1);
    await par(c.say('İkinci aşama: her elektron öteki çekirdeğe doğru da çekilir.'), belir(c, paneller[1].g, 500));
    await c.say('Bu çekim, kendi çekirdeğinin çekiminden zayıftır; atomları birbirine yaklaştırır.');
    await c.say('Çekirdekler birbirini, elektronlar da birbirini iter.');
    vur(2);
    await par(c.say('Üçüncü aşama: itme ile çekme dengelenir; elektronlar ortak kullanılır.', { speak: 'Üçüncü aşama: itme ile çekme [short pause] dengelenir; elektronlar ortak kullanılır.' }), belir(c, [paneller[2].g, denge], 500));
    vur(3);
    await par(c.say('Dördüncü aşama: ortak elektronlar çekirdeklerin arasında sürekli hareket eder.'), belir(c, paneller[3].g, 500));
    await c.say('Artık iki çekirdek de ortak elektronları çeker.');
    await c.say('Dengelenmiş bu etkileşimler atomları bir arada tutar.');

    c.clearSay();
    vur(1);
    await c.choice({
      tag: 'Sıra sende', q: 'İkinci aşamada bir elektronu hangi çekirdek daha güçlü çeker?',
      options: ['Kendi atomunun çekirdeği', 'Öteki atomun çekirdeği', 'İkisi aynı güçte çeker'], answer: 0,
      hints: ['', 'Okların boyuna bak: biri uzun, biri kısa.', 'Öteki çekirdek daha uzakta.'],
      right: 'Evet. Kendi çekirdeğine giden ok daha uzun.',
    });
    vur(3);
    await c.say('Elektronlar ortak kullanılınca ikisini de çeken, iki çekirdek olur.');
  }

  /* ---- 4. Tahminin geçerli mi? ---- */
  async function gecerlilik(c) {
    const svg = c.svg(1000, 562);
    const kucuk = c.S('g', {}, svg);
    for (let i = 0; i < 4; i++) {
      const y = 30 + i * 127;
      kutu(c, kucuk, 20, y, 230, 115, { rx: 12 });
      asama(c, kucuk, 135, y + 57, i, { k: 0.4 });
      yazi(c, kucuk, 40, y + 34, String(i + 1), { size: 24, kalin: 700, renk: RENK.soluk });
    }
    const bA = yazi(c, svg, 440, 66, 'Geçerli tahmin', { size: 24, kalin: 700 }), bB = yazi(c, svg, 810, 66, 'Geçersiz tahmin', { size: 24, kalin: 700 });
    gizle(kucuk, bA, bB);
    const KART = [
      { metin: 'Birbirinden uzak iki atom arasında kuvvet oluşmaz.', kisa: 'kuvvet yok', gecerli: true, kanit: '1', neden: 'Birinci aşamada kuvvet yok.' },
      { metin: 'Yaklaşırken her elektron öteki çekirdeğe doğru da çekilir.', kisa: 'çapraz çekim', gecerli: true, kanit: '2', neden: 'İkinci aşamadaki çapraz oklar bunu gösteriyor.' },
      { metin: 'İki çekirdek birbirini çeker.', kisa: 'birbirini çeker', gecerli: false, neden: 'İkisi de artı yüklüdür; birbirini iter.', duzelt: 'iki çekirdek birbirini iter' },
      { metin: 'Denge kurulunca itme kuvvetleri kalmaz.', kisa: 'itme kalmaz', gecerli: false, neden: 'İtme yok olmaz; çekmeyle dengelenir.', duzelt: 'itme çekmeyle dengelenir' },
      { metin: 'Ortak elektronlar iki çekirdeğin tam ortasında durur.', kisa: 'ortada durur', gecerli: false, neden: 'Elektronlar sürekli hareket eder.', duzelt: 'elektronlar hareket eder' },
      { metin: 'Ortak elektronları iki çekirdek de çeker.', kisa: 'iki çekirdek çeker', gecerli: true, kanit: '4', neden: 'Dördüncü aşamada iki çekirdekten de ok var.' },
    ];
    const SX = [270, 640], BEK = [455, 420], dolu = [0, 0];
    let bekleyen = null;
    const getir = async (k) => { bekleyen = kart(c, svg, BEK[0], BEK[1], 340, 50, k.kisa); bekleyen.g.style.opacity = 0; await belir(c, bekleyen.g, 400); };
    const yerles = async (k) => {
      const kt = bekleyen, s = k.gecerli ? 0 : 1, y = 96 + 100 * dolu[s]++;
      await c.tween(550, (e) => kt.tasi(lerp(BEK[0], SX[s], e), lerp(BEK[1], y, e)));
      const r = k.gecerli ? rozet(c, kt, k.kanit) : bosKutu(c, kt);
      r.style.opacity = 0; await belir(c, r, 300);
      k.kt = kt; k.y = y; k.s = s;
    };

    await par(c.say('Altı tahmin var; süreç görseline uyanlar geçerlidir.'), belir(c, [kucuk, bA, bB], 500));
    await c.say('Görsele aykırı olan tahmin geçersizdir.');
    await sinifla(c, {
      tag: 'Sıra sende', kutular: ['Geçerli', 'Geçersiz'],
      kartlar: KART.map((k) => Object.assign(k, { kutu: k.gecerli ? 0 : 1, ipucu: k.neden, neden: 'Evet. ' + k.neden })),
      soru: (k) => `Tahmin: “${k.metin}” Bu tahmin geçerli mi?`,
      sec: async (i, k) => { await getir(k); },
      yerlestir: async (i, k) => { await yerles(k); },
    });

    // Gör: geçersiz tahminlerin düzeltilmiş hâlleri.
    const duz = KART.filter((k) => !k.gecerli).map((k) => {
      const t = yazi(c, svg, SX[1] + 12, k.y + 80, k.duzelt, { hiza: 'start', size: 22, kalin: 600, renk: RENK.cekme }); t.style.opacity = 0; return t;
    });
    await par(c.say('Görseller tahminlerimizi sınadı: geçerli olanı bıraktık, geçersizi düzelttik.'), (async () => {
      await par(belir(c, kucuk, 450, 0), belir(c, KART.filter((k) => k.gecerli).map((k) => k.kt.g), 450, 0.12));
      await belir(c, duz, 600);
    })());
  }

  /* ---- 5. Başka bir bileşik: hidrojen ve flor ---- */
  async function florur(c) {
    const svg = c.svg(1000, 562);
    const H = [110, 300], F = [440, 300], E1 = [255, 235], E2 = [330, 385];
    const res = c.S('g', {}, svg);
    bulutCiz(c, res, H, 95); bulutCiz(c, res, F, 135); bulutCiz(c, res, F, 60, 0.12);
    yuk(c, res, H, 'arti', 16); cekirdekEtiket(c, res, F, '9+'); yuk(c, res, E1, 'eksi', 10); yuk(c, res, E2, 'eksi', 10);
    const adlar = c.S('g', {}, svg);
    [['H', 110, 352], ['F', 440, 394], ['1', 280, 224], ['2', 356, 412]].forEach(([t, x, y]) => yazi(c, adlar, x, y, t, { size: 24, kalin: 700, renk: RENK.soluk }));
    const not = yazi(c, svg, 330, 44, 'Yalnızca ortak kullanılan elektronlar çizildi', { size: 21, kalin: 500, renk: RENK.soluk });
    gizle(res, adlar, not);
    const tab = c.S('g', {}, svg);
    yazi(c, tab, 640, 72, 'çift', { hiza: 'start', size: 22, kalin: 500, renk: RENK.soluk });
    yazi(c, tab, 900, 72, 'kuvvet', { size: 22, kalin: 500, renk: RENK.soluk });
    cizgi(c, tab, [620, 90], [980, 90], RENK.kenarlik, 1.5);
    gizle(tab);
    const CIFT = [
      { ad: 'H–F', P: H, Q: F, tur: 'itme', b: 30, soru: 'Hidrojen çekirdeği ile flor çekirdeği', ipucu: 'İkisi de artı yüklü; aynı yükler iter.', neden: 'İkisi de artı yüklü: itme.' },
      { ad: '1–2', P: E1, Q: E2, tur: 'itme', b: 16, soru: 'Hidrojenin elektronu (1) ile florun elektronu (2)', ipucu: 'İkisi de eksi yüklü; aynı yükler iter.', neden: 'İkisi de eksi yüklü: itme.' },
      { ad: 'H–1', P: H, Q: E1, tur: 'cekme', b: 22, soru: 'Hidrojen çekirdeği ile hidrojenin elektronu (1)', ipucu: 'Biri artı, biri eksi yüklü; zıt yükler çeker.', neden: 'Zıt yükler: çekme.' },
      { ad: 'H–2', P: H, Q: E2, tur: 'cekme', b: 22, soru: 'Hidrojen çekirdeği ile florun elektronu (2)', ipucu: 'Her elektronu iki çekirdek de çeker; zıt yükler çeker.', neden: 'Zıt yükler: çekme.' },
      { ad: 'F–1', P: F, Q: E1, tur: 'cekme', b: 24, soru: 'Flor çekirdeği ile hidrojenin elektronu (1)', ipucu: 'Her elektronu iki çekirdek de çeker; zıt yükler çeker.', neden: 'Zıt yükler: çekme.' },
      { ad: 'F–2', P: F, Q: E2, tur: 'cekme', b: 24, soru: 'Flor çekirdeği ile florun elektronu (2)', ipucu: 'Biri artı, biri eksi yüklü; zıt yükler çeker.', neden: 'Zıt yükler: çekme.' },
    ];
    CIFT.forEach((q, i) => {
      const y = 140 + 66 * i, g = c.S('g', {}, svg);
      yazi(c, g, 640, y, q.ad, { hiza: 'start', size: 28, kalin: 600 });
      yazi(c, g, 900, y, q.tur === 'itme' ? 'itme' : 'çekme', { size: 28, kalin: 700, renk: q.tur === 'itme' ? RENK.itme : RENK.cekme });
      q.ok = etkilesim(c, svg, q.P, q.Q, q.tur, { b: q.b, boy: 44 });
      q.isik = cizgi(c, svg, q.P, q.Q, RENK.vurgu, 9, { 'stroke-opacity': 0.35 });
      gizle(g, q.ok, q.isik);
      q.g = g;
    });

    await par(c.say('Aynı yöntemi başka bir atom çiftine uygulayalım: hidrojen ve flor.'), belir(c, [res, adlar], 500));
    await par(c.say('Flor çekirdeği de artı yüklüdür; elektronlar yine eksi.'), belir(c, not, 400));
    await par(c.say('Hidrojenin elektronu ile florun bir elektronu ortak kullanılır.'), belir(c, tab, 400));
    await c.say('Yine iki çekirdek, iki ortak elektron ve altı çift var.');
    await c.say('Her çiftin kuvvetini yüklere bakarak tahmin et.');

    await sinifla(c, {
      tag: 'Sıra sende', kutular: ['Çekme', 'İtme'],
      kartlar: CIFT.map((q) => Object.assign(q, { kutu: q.tur === 'itme' ? 1 : 0, neden: 'Evet. ' + q.neden })),
      soru: (q) => `${q.soru} arasındaki kuvvet hangisi?`,
      sec: async (i, q) => { await belir(c, q.isik, 300); },
      yerlestir: async (i, q) => { await par(belir(c, q.isik, 300, 0), belir(c, q.g, 400), belir(c, q.ok, 450)); },
    });

    // Gör: dört aşamalı süreç, öğrencinin okları yanında.
    c.clearSay();
    await par(belir(c, [tab, not, ...CIFT.map((q) => q.g)], 450, 0));
    const PC = [[705, 150], [888, 150], [705, 380], [888, 380]];
    const asamalar = PC.map(([x, y], i) => {
      const g = c.S('g', {}, svg);
      asama(c, g, x, y, i, { k: 0.55, d: i === 0 ? 190 : undefined, Rl: 62, Rr: 88, rn: 18 });
      yazi(c, g, x - 82, y - 92, String(i + 1), { size: 24, kalin: 700, renk: RENK.soluk });
      gizle(g);
      return g;
    });
    await par(c.say('Hidrojende olduğu gibi: iki itme, dört çekme.'), (async () => { for (const g of asamalar) { await belir(c, g, 450); await c.wait(250); } })());

    await c.choice({
      tag: 'Sıra sende', q: 'Hidrojen molekülü için yaptığın tahmin modeli bu bileşik için de geçerli mi?',
      options: ['Geçerli; çekirdekler artı, elektronlar eksi yüklü olduğu için kuvvetlerin türü değişmez', 'Geçersiz; hidrojen florürde çekirdekler birbirini çeker', 'Geçersiz; hidrojen florürde itme kuvveti yoktur'], answer: 0,
      hints: ['', 'Atomlar farklı; yükler aynı türde.', 'Yük cinsleri H<sub>2</sub>’dekiyle aynı.'],
      right: 'Evet. Yük cinsleri aynı olduğu için kuvvetlerin türü de aynı.',
    });
    await c.say('Atomlar farklı olsa da yükler aynı türdendir: model değişmez.');
    await c.say('İki çekirdek de ortak elektronları çeker.');
    c.note('<b>İki çekirdek de ortak elektronları çeker.</b><br>Örnek: HF.', 'Görünmeyen çekim', 'gorunmeyen-cekim');
  }

  /* ---- 6. Oksijende de aynı süreç ---- */
  async function oksijen(c) {
    const svg = c.svg(1000, 562);
    // Üç aşama; tahtada karışık sırada: 3, 1, 2.
    const SIRA = [2, 0, 1], PY = [25, 197, 369];
    const oks = (g, cx, cy, j) => {
      const d = [260, 118, 76][j], N = [[cx - d / 2, cy], [cx + d / 2, cy]];
      bulutCiz(c, g, N[0], 58); bulutCiz(c, g, N[1], 58);
      yuk(c, g, N[0], 'arti', 13); yuk(c, g, N[1], 'arti', 13);
      const e = [[[-20, -26], [20, 26]], [[30, -14], [-30, 14]], [[-6, -16], [6, 16]]][j];
      yuk(c, g, j === 2 ? [cx + e[0][0], cy + e[0][1]] : [N[0][0] + e[0][0], cy + e[0][1]], 'eksi', 8);
      yuk(c, g, j === 2 ? [cx + e[1][0], cy + e[1][1]] : [N[1][0] + e[1][0], cy + e[1][1]], 'eksi', 8);
    };
    const panel = SIRA.map((j, s) => {
      const g = c.S('g', {}, svg), r = kutu(c, g, 30, PY[s], 560, 150);
      oks(g, 310, PY[s] + 75, j);
      yazi(c, g, 62, PY[s] + 40, String(j + 1), { size: 28, kalin: 700, renk: RENK.soluk });
      gizle(g);
      return { g, r, j };
    });
    const OLAY = ['Atomlar uzaktadır; aralarında etkileşim yoktur.', 'Atomlar yaklaşır; çekme ve itme kuvvetleri oluşur.', 'İtme ile çekme dengelenir; elektronlar ortak kullanılır.'];
    const KISA = ['uzakta: etkileşim yok', 'yaklaşır: çekme ve itme', 'denge: ortak elektronlar'];
    const olaylar = KISA.map((t, i) => { const k = kart(c, svg, 620, 70 + 145 * i, 360, 90, t, { size: 22 }); gizle(k.g); return k; });
    const HINT = [
      ['', 'Bu aşamada atomlar çok uzakta; çekme ve itme henüz yok.', 'Bu aşamada bulutlar üst üste binmemiş; elektronlar ortak değil.'],
      ['Bu aşamada atomlar uzak değil; birbirine yaklaşmış.', '', 'Bu aşamada bulutlar henüz üst üste binmemiş.'],
      ['Bu aşamada atomlar uzak değil; bulutlar üst üste binmiş.', 'Bu aşamada bulutlar üst üste binmiş ve elektronlar ortak kullanılıyor.', ''],
    ];

    await par(c.say('İki oksijen atomunda da süreç aynı üç aşamadan geçer.'), belir(c, [...panel.map((q) => q.g), ...olaylar.map((k) => k.g)], 600));
    await c.say('Her aşamayı olayıyla eşleştir.', { noWait: true });
    for (let s = 0; s < 3; s++) {
      const q = panel[s];
      q.r.style.stroke = RENK.vurgu; q.r.style.strokeWidth = 4;
      await c.choice({
        tag: 'Dene', q: `${q.j + 1}. aşamayı hangi olay anlatır?`, options: OLAY, answer: q.j, hints: HINT[q.j],
        right: ['Evet. Atomlar uzakta, etkileşim yok.', 'Evet. Yaklaşınca çekme ve itme oluşur.', 'Evet. İtme ile çekme dengelenir; elektronlar ortak kullanılır.'][q.j],
      });
      q.r.style.stroke = RENK.kenarlik; q.r.style.strokeWidth = 2;
      const r = rozet(c, olaylar[q.j], String(q.j + 1)); r.style.opacity = 0; await belir(c, r, 350);
    }
  }

  Ders.start({
    id: 'cesitlilik-c2', kicker: 'Konu C · Kovalent bağ', title: 'Görünmeyeni tahmin et: çekirdekler ortak elektronları çeker', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Görünmeyeni tahmin et: çekirdekler ortak elektronları çeker',
      hook: 'Elektronların iki atomun arasına yerleştiğini gördün; onları orada tutan kuvveti görebildin mi?',
      button: 'Derse başla ›',
    },
    goals: ['Görünmeyen kuvvetleri yüklere bakarak tahmin eder.', 'Tahminleri süreç aşamalı görselle karşılaştırıp geçerli olanı ayırır.', 'İki çekirdeğin de ortak elektronları çektiğini farklı atom çiftlerinde söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Elektronların ortak kullanımını ve çekirdek–elektron çekimini hatırla.', run: hatirla },
      { title: 'Görünmeyen kuvveti yüklerden tahmin et', goal: 'Altı parçacık çiftinin kuvvetini yüklere bakarak bul.', run: tahmin },
      { title: 'Tahmini süreç aşamalı görselle karşılaştır', goal: 'Dört aşamalı süreci izle; kuvvetlerin nasıl değiştiğini gör.', run: surec },
      { title: 'Tahminin geçerli mi?', goal: 'Tahminleri görsele göre geçerli ve geçersiz diye ayır.', run: gecerlilik },
      { title: 'Başka bir bileşik: hidrojen ve flor', goal: 'Aynı tahmin modelini hidrojen florüre uygula.', run: florur },
      { title: 'Oksijende de aynı süreç', goal: 'Oksijen atomlarının yaklaşma aşamalarını olaylarla eşleştir.', run: oksijen },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ortak kullanılan elektronları hangi çekirdek çeker?',
        options: ['Yalnızca birinci atomun çekirdeği', 'Hiçbir çekirdek', 'Bağ yapan iki atomun çekirdeği de'], answer: 2,
        why: ['Elektronlar iki çekirdeğin arasındadır; öteki çekirdek de onları çeker.', 'Çekirdekler artı, elektronlar eksi yüklüdür; zıt yükler çeker.', 'İki çekirdek de ortak elektronları çeker; bağ budur.'], scene: 1 },
      { q: 'Bir öğrenci H<sub>2</sub> molekülünde her elektronun yalnızca kendi atomunun çekirdeğince çekildiğini söylüyor. Bu tahmin için hangisi doğrudur?',
        options: ['Geçerlidir; öteki çekirdek elektronu iter', 'Geçersizdir; elektronu öteki çekirdek de çeker', 'Geçerlidir; öteki çekirdek elektronu hiç etkilemez'], answer: 1,
        why: ['Öteki çekirdek de artıdır, elektron eksidir: zıt yükler çeker, itmez.', 'İkinci aşamadaki çapraz oklar ve dördüncü aşama, elektronun öteki çekirdekçe de çekildiğini gösterir.', 'Yüklü tanecikler arasında kuvvet vardır; öteki çekirdek de elektronu çeker.'], scene: 3 },
      { q: 'Hidrojen florürde hidrojen çekirdeği ile florun ortak kullandığı elektron arasında hangi kuvvet vardır?',
        options: ['Çekme', 'İtme', 'Kuvvet yoktur'], answer: 0,
        why: ['Çekirdek artı, elektron eksi yüklüdür; zıt yükler çeker.', 'İtme aynı yükler arasında olur; burada yükler zıttır.', 'Yüklü tanecikler arasında kuvvet vardır.'], scene: 4 },
      { q: 'İki klor atomu bağ kuruyor; klor çekirdekleri de artı yüklüdür. İki çekirdek arasındaki kuvvet hangisidir?',
        options: ['Kuvvet yoktur', 'İtme', 'Çekme'], answer: 1,
        why: ['Yüklü tanecikler arasında kuvvet vardır.', 'İki çekirdek de artı yüklüdür; aynı yükler birbirini iter.', 'Çekme zıt yükler arasında olur; iki çekirdek de artıdır.'], scene: 1 },
      { q: 'Bir öğrenci hidrojen florürde ortak kullanılan iki elektronun birbirini çektiğini tahmin etti. Bu tahmin için hangisi doğrudur?',
        options: ['Geçerlidir; elektronlar ortak kullanıldığı için birbirini çeker', 'Geçerlidir; elektronlar çekirdeği çeker, birbirini değil', 'Geçersizdir; iki elektron da eksi yüklüdür, birbirini iter'], answer: 2,
        why: ['Ortak kullanılmaları yüklerini değiştirmez; eksi yükler iter.', 'Elektronlar birbirini de iter; çekirdeği çekmeleri bunu değiştirmez.', 'Aynı yükler birbirini iter; iki elektron da eksi yüklüdür.'], scene: 4 },
    ],
    summary: ['Görünmeyen kuvveti yüklerden tahmin ederiz.', 'Aynı yükler iter, zıt yükler çeker.', 'Tahmin, süreç aşamalı görselle sınanır.', '<b>İki çekirdek de ortak elektronları çeker; bağ budur.</b>'],
    nextLesson: { href: 'c3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
