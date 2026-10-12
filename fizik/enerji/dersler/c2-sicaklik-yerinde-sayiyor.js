/* C2 — Isı veriyorsun, sıcaklık yerinde sayıyor
   Hâl değişirken madde ısı alır ama sıcaklığı değişmez: sıcaklık–ısı grafiğinde bu düz bir basamaktır.
   Senaryo: plan/fizik/enerji/senaryolar/C-hal-degisimi.md (C2). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Sayılar senaryonun "Örnek veri" satırındandır (100 g buz, –20 °C; ısıtıcı saniyede 200 J). Hesap öğrenciye gösterilmez.
   Figür tek istasyon, yakın kadraj; figür ile grafik yan yana ilerler. Sıcaklık sayısı, ısı sayacı ve grafik aynı c.tween içinde sürülür. */
(() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par, ok, cubuk: yatayCubuk } = window.KIT;
  const { kap, termometre, pencere, motor } = window.KIT_A;
  const { kutleEtiketi, isiSayaci, sicaklikEtiketi, grafik } = window.KIT_C;
  const { lerp, clamp, ease } = Ders;
  const KAD = ISITMA.kadraj;
  const ISI = RENK.isi, KUTLE = RENK.kutle, SIC = RENK.sicaklik, IC = RENK.icEnerji;

  /* ---- veri: ısıtıcının verdiği ısıya göre madde (senaryonun örnek verisi) ---- */
  /* m gram buz, –20 °C'tan başlar. Bölge sınırları (J): katı ısınır, erime, sıvı ısınır, kaynama. */
  const esikler = (m) => { const a = m * 42, b = a + m * 334, s = b + m * 418, d = s + m * 2260; return [a, b, s, d]; };
  const hal = (Q, m = 100) => {
    const [a, b, s, d] = esikler(m), sev = 0.05 + 0.2 * m / 100;
    if (Q <= a) return { T: -20 + 20 * Q / a, kati: 1, icerik: 'buz', seviye: sev, kaynama: 0 };
    if (Q <= b) return { T: 0, kati: 1 - (Q - a) / (b - a), icerik: 'buz', seviye: sev, kaynama: 0 };
    if (Q <= s) return { T: 100 * (Q - b) / (s - b), kati: 0, icerik: 'su', seviye: sev, kaynama: 0 };
    const k = clamp((Q - s) / (d - s), 0, 1);
    return { T: 100, kati: 0, icerik: k >= 1 ? 'bos' : 'su', seviye: sev * (1 - k), kaynama: Math.min(clamp(k / 0.04, 0, 1), clamp((1 - k) / 0.04, 0, 1)) };
  };
  /* Grafiğin köşeleri (Q, T): 100 g için beş bölge; sondaki parça gazdır, kesiklidir. */
  const koseOf = (m, gazli) => {
    const [a, b, s, d] = esikler(m), k = [[0, -20], [a, 0], [b, 0], [s, 100]];
    if (gazli) k.push([d, 100], [325000, 120, true]);
    return k;
  };
  const KOSE100 = koseOf(100, true);
  /* Isı Q iken eğri boyunca konum (grafik aracının uzunluk dizisiyle). */
  const sQ = (uz, kose, Q) => {
    for (let i = 1; i < kose.length; i++) {
      if (Q <= kose[i][0]) return uz[i - 1] + (Q - kose[i - 1][0]) / (kose[i][0] - kose[i - 1][0]) * (uz[i] - uz[i - 1]);
    }
    return uz[uz.length - 1];
  };
  const ms = (metin) => Math.round(metin.length * 65);

  /* ---- yerel yardımcılar ---- */
  const FIG = { x: -70, y: 30, h: 440 };
  const KUT_YER = [190, 506], SAY_YER = [190, 540];

  /* Eğri (çokgen): kose = [[Q, T], …]; gr grafiğin nokta işlevi için. Isı Q'ya ya da boy s'ye kadar çizer. */
  function egri(c, p, gr, kose, renk, o = {}) {
    const P = kose.map((k) => gr.nokta(k[0], k[1]));
    const el = c.S('polyline', Object.assign({ fill: 'none', stroke: renk, 'stroke-width': o.w || 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
      o.kesik ? { 'stroke-dasharray': o.kesik } : {}), p);
    const uz = [0];
    for (let i = 1; i < P.length; i++) uz.push(uz[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const kur = (s) => {
      const pts = [P[0]];
      for (let i = 1; i < P.length; i++) {
        if (s >= uz[i]) pts.push(P[i]);
        else { const k = (s - uz[i - 1]) / (uz[i] - uz[i - 1]); pts.push([lerp(P[i - 1][0], P[i][0], k), lerp(P[i - 1][1], P[i][1], k)]); break; }
      }
      el.setAttribute('points', pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' '));
    };
    kur(0);
    return { el, kur, kurQ: (Q) => kur(sQ(uz, kose, Q)), uz, P };
  }
  const yolCiz = (el, pts) => el.setAttribute('points', pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' '));

  /* grafik aracının kur(s) işlevi, henüz çizilmemiş (sıfır uzunluklu) parçaları yuvarlak uçla nokta olarak gösterir;
     bu sarmalayıcı o parçaları gizler. Araç dosyasına dokunulmaz (raporda bildirildi). */
  const grKur = (gr, s) => {
    gr.kur(s);
    gr.g.querySelectorAll('line[stroke-width="4"]').forEach((l) => {
      l.style.visibility = (l.getAttribute('x1') === l.getAttribute('x2') && l.getAttribute('y1') === l.getAttribute('y2')) ? 'hidden' : 'visible';
    });
  };

  /* Figür + etiketler + grafik: sahne 2, 3, 4, 7. */
  function kurSahne(c, o = {}) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, FIG);
    f.goster('sag', 0);
    f.ayar('sol', { icerik: 'buz', seviye: 0.25, sicaklik: -20, alev: 0, kati: 1, kaynama: 0, faz: 0 });
    f.sure(0);
    f.bak(KAD.sol);
    const L = c.S('g', {}, svg);
    const kut = kutleEtiketi(c, L, f, 'sol', '100 g buz', { sabit: KUT_YER });
    const say = isiSayaci(c, L, f, 'sol', { sabit: SAY_YER });
    const sic = sicaklikEtiketi(c, L, f, 'sol.termometre');
    /* sicaklikEtiketi eksi işaretini '-' yazar; tema '–' (U+2013) kullanır: sarmalayıcı değiştirir (araç dosyasına dokunulmadı). */
    const sicGun = sic.guncelle;
    sic.guncelle = (T) => { sicGun(T); if (T != null) sic.g.textContent = sic.g.textContent.replace('-', '–'); };
    sic.guncelle(-20);
    const G = c.S('g', {}, svg);
    const gr = grafik(c, G, o.grafik || { kose: KOSE100 });
    grKur(gr, 0);
    const st = { m: 100, faz: 0 };
    const nokta = o.nokta ? c.S('circle', { r: 6, fill: SIC, stroke: RENK.koyu, 'stroke-width': 2 }, G) : null;
    const bantlar = [];
    /* Turuncu ince bant: basamak boyunca; eğri çizildikçe uzar. */
    const bant = (Q1, Q2, T) => {
      const el = c.S('rect', { x: gr.X(Q1), y: gr.Y(T) - 5, width: 0, height: 10, rx: 3, fill: ISI, 'fill-opacity': 0.4 }, G);
      gizle(el);
      const b = { el, Q1, Q2, ayarla: (Q) => el.setAttribute('width', Math.max(0, gr.X(Math.min(Math.max(Q, Q1), Q2)) - gr.X(Q1))) };
      bantlar.push(b);
      return b;
    };
    const uygula = (Q, m = st.m) => {
      const h = hal(Q, m);
      f.ayar('sol', { icerik: h.icerik, seviye: h.seviye, sicaklik: h.T, kati: h.kati, kaynama: h.kaynama });
      sic.guncelle(h.T); say.yaz(Q); f.sure(Q / 200);
      return h;
    };
    const cizim = (Q, h) => {
      if (!o.egriYok) grKur(gr, sQ(gr.uzunluk, gr.kose, Q));
      if (nokta) { const q = gr.nokta(Q, h.T); nokta.setAttribute('cx', q[0]); nokta.setAttribute('cy', q[1]); }
      bantlar.forEach((b) => b.ayarla(Q));
    };
    /* Isıyı Q0'dan Q1'e götürür: sayı, sütun, sayaç, kabarcıklar ve grafik aynı tween içinde. */
    const ak = (Q0, Q1, sure, e = ease.linear) => {
      const f0 = st.faz; st.faz += sure / 1100;
      return c.tween(sure, (k) => {
        const Q = lerp(Q0, Q1, k), h = uygula(Q);
        f.ayar('sol', { faz: f0 + k * sure / 1100 });
        cizim(Q, h);
      }, e);
    };
    const koy = (Q, m) => { const h = uygula(Q, m); cizim(Q, h); };
    return { svg, f, L, kut, say, sic, G, gr, nokta, bant, uygula, cizim, ak, koy, st };
  }
  /* Bir altyazıyı söylerken hareket: tween süresi altyazının okunma süresine yakın tutulur. */
  const adim = (c, s, Q0, Q1, metin, ses) => par(c.say(metin, ses ? { speak: ses } : undefined), s.ak(Q0, Q1, ms(metin)));
  const alevAc = (c, f, ms2 = 300) => c.tween(ms2, (e) => f.ayar('sol', { alev: 2 * e }), ease.out);

  /* ---- 1. Hatırla ---- */
  function kare(c, p, x, y, metin) {
    const g = c.S('g', {}, p);
    c.S('rect', { x, y, width: 80, height: 80, rx: 8, fill: KUTLE, 'fill-opacity': 0.22, stroke: KUTLE, 'stroke-width': 3 }, g);
    yazi(c, g, x + 40, y + 48, metin, { size: 24, kalin: 700 });
    return g;
  }
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    const k1 = kare(c, g1, 290, 150, '100 g'), k2 = kare(c, g1, 590, 150, '200 g');
    const b1 = yatayCubuk(c, g1, 290, 300, ISI, { h: 30 }), b2 = yatayCubuk(c, g1, 590, 300, ISI, { h: 30 });
    const et1 = yazi(c, g1, 540, 372, 'gereken ısı', { size: 26, kalin: 700, renk: ISI });
    gizle(g1, et1);
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 130, y: 150, su: 110, etiket: ['aynı su'] });
    const bas = yazi(c, g2, 610, 176, 'sıcaklık artışı', { size: 26, kalin: 700, renk: SIC });
    const sut = [[512, 60], [672, 120]].map(([x, h]) => c.S('rect', { x, y: 330 - h, width: 36, height: h, rx: 8, fill: SIC }, g2));
    const ad = [yazi(c, g2, 530, 366, 'birinci', { size: 24, kalin: 600, renk: RENK.soluk }), yazi(c, g2, 690, 366, 'ikinci', { size: 24, kalin: 600, renk: RENK.soluk })];
    const c1 = yatayCubuk(c, g2, 490, 410, ISI, { h: 30 }), c2 = yatayCubuk(c, g2, 610, 410, ISI, { h: 30 });
    const et2 = yazi(c, g2, 630, 466, 'gereken ısı', { size: 26, kalin: 700, renk: ISI });
    gizle(g2, et2);

    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 450));
    await c.choice({
      tag: 'Hatırla', q: 'Erime sıcaklığındaki 200 g buzu eritmek için gereken ısı, 100 g buzunkine göre nasıldır?',
      options: ['Yarısıdır', 'Aynıdır', 'İki katıdır'], answer: 2,
      hints: ['Kütle büyüdükçe erimek için gereken ısı da büyür: 200 g için iki katı.', 'Kütle büyüdükçe erimek için gereken ısı da büyür: 200 g için iki katı.', ''],
      right: 'Evet. Kütle iki katına çıkınca gereken ısı da iki katına çıkar.',
    });
    await par(c.say('Kütle iki katıysa gereken ısı da iki katıdır.'), belir(c, et1, 400), c.tween(700, (e) => { b1.boy(100 * e); b2.boy(200 * e); }, ease.out));
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    await belir(c, g2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Aynı suyun sıcaklık artışı iki katına çıkarsa gereken ısı ne olur?',
      options: ['Yarıya iner', 'İki katına çıkar', 'Değişmez'], answer: 1,
      hints: ['Q = m · c · ΔT: sıcaklık farkı iki katına çıkınca ısı da iki katına çıkar.', '', 'Q = m · c · ΔT: sıcaklık farkı iki katına çıkınca ısı da iki katına çıkar.'],
      right: 'Evet. Sıcaklık artışı iki katına çıkınca gereken ısı da iki katına çıkar.',
    });
    await par(c.say('Sıcaklık artışı iki katıysa gereken ısı da iki katıdır.'), belir(c, et2, 400), c.tween(700, (e) => { c1.boy(80 * e); c2.boy(160 * e); }, ease.out));
    c.clearSay();
    await belir(c, g2, 350, 0); g2.remove();
    const g3 = c.S('g', {}, svg);
    ok(c, g3, [380, 430], [380, 120], SIC, 4); ok(c, g3, [380, 430], [790, 430], ISI, 4);
    c.S('polyline', { points: '400,408 470,330', fill: 'none', stroke: SIC, 'stroke-width': 5, 'stroke-linecap': 'round' }, g3);
    c.S('polyline', { points: '470,330 600,330', fill: 'none', stroke: ISI, 'stroke-width': 7, 'stroke-linecap': 'round' }, g3);
    c.S('polyline', { points: '600,330 700,190', fill: 'none', stroke: SIC, 'stroke-width': 5, 'stroke-linecap': 'round' }, g3);
    gizle(g3);
    await par(c.say('Bugün ısıtılan bir maddenin sıcaklığının neden bazen yerinde saydığına bakacağız.'), belir(c, g3, 500));
  }

  /* ---- 2. Buzu –20 °C'tan başlatıyoruz ---- */
  const secenek = (harf, d) => `<span style="display:flex;align-items:center;gap:14px"><b style="font-size:1.2em">${harf}</b><svg viewBox="0 0 140 90" width="140" height="90"><path d="M8 6 V82 H134" fill="none" stroke="#7b849c" stroke-width="2"/><path d="${d}" fill="none" stroke="#f5c542" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
  async function baslangic(c) {
    const s = kurSahne(c);
    const { f, L, G } = s;
    gizle(f.el, L, G);
    await par(c.say('Ela bu kez 100 g buzu –20 °C’tan başlatıyor.', { speak: 'Ela bu kez yüz gram buzu eksi yirmi dereceden başlatıyor.' }), belir(c, [f.el, L], 450));
    await c.say('Isıtıcı saniyede 200 joule veriyor.', { speak: 'Isıtıcı saniyede iki yüz jul veriyor.' });
    await par(c.say('Ela verilen ısıyı ve sıcaklığı grafiğe işleyecek.'), belir(c, G, 600));
    await c.say('Yatay eksende ısı, dikey eksende sıcaklık var.');
    await c.say('Isıtıcı buzu 100 °C’a kadar ısıtacak.', { speak: 'Isıtıcı buzu yüz dereceye kadar ısıtacak.' });
    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Sıcaklık–ısı grafiği nasıl görünür?',
      options: [secenek('A', 'M8 56 H62 L126 14'), secenek('B', 'M8 80 L34 54 H74 L126 14'), secenek('C', 'M8 80 L126 14')], answer: 1,
      hints: ['Buz bitince su ısınmaya devam eder; çizgi yeniden yükselir.', '', 'Buz erirken termometre ne gösteriyordu? Çizgi o sırada nasıl olmalı?'],
      right: 'Evet. Eğik, sonra yatay, sonra yine eğik.',
    });
    await c.say('Deneyi başlatıp grafiğin nasıl çizildiğine bakalım.');
  }

  /* ---- 3. Katı, erime, sıvı ---- */
  async function basamak(c) {
    const s = kurSahne(c, { nokta: true });
    const { f } = s;
    const [a, b, sv] = esikler(100);
    s.koy(0);
    const bant1 = s.bant(a, b, 0);
    await alevAc(c, f);
    await adim(c, s, 0, a, 'Isı verdikçe termometre yükseliyor; grafik yukarı eğiliyor.');
    await c.wait(400);
    const q2 = (p) => lerp(a, b, p);
    await adim(c, s, a, q2(0.06), 'Termometre 0 °C’a geldi; buz erimeye başlıyor.', 'Termometre sıfır dereceye geldi; buz erimeye başlıyor.');
    await adim(c, s, q2(0.06), q2(0.3), 'Isı girmeye devam ediyor ama termometre yerinde sayıyor.');
    await par(belir(c, bant1.el, 300, 1), adim(c, s, q2(0.3), q2(0.55), 'Grafikte bu bölge yatay bir basamak.'));
    await adim(c, s, q2(0.55), b, 'Basamak boyunca buz azalıyor; sıcaklık hep 0 °C.', 'Basamak boyunca buz azalıyor; sıcaklık hep sıfır derece.');
    await c.wait(400);
    const q3 = (p) => lerp(b, sv, p);
    await adim(c, s, b, q3(0.08), 'Buz bitince basamak da bitiyor.');
    await adim(c, s, q3(0.08), q3(0.6), 'Isı şimdi suyu ısıtıyor; grafik yeniden eğiliyor.');
    await adim(c, s, q3(0.6), sv, 'Su 100 °C’a kadar ısınıyor.', 'Su yüz dereceye kadar ısınıyor.');

    // Sor: basamağın ortasında dur.
    c.clearSay();
    await par(c.say('Ela deneyi tekrarlıyor ve basamağın ortasında durup bakıyor.'), s.ak(sv, q2(0.5), 400, ease.out));
    await c.choice({
      tag: 'Sor', q: 'Buzun yarısı erimiş. Termometre kaç °C gösterir?',
      options: ['–20 °C', '50 °C', '0 °C'], answer: 2,
      hints: ['Buz tamamen erimeden sıcaklık değişmez; basamak boyunca sıcaklık kaç °C?', 'Basamak yatay: sıcaklık hep aynı.', ''],
      right: 'Evet. Basamak boyunca sıcaklık 0 °C.',
    });
    const yan = async () => { for (let i = 0; i < 2; i++) { await c.tween(300, (e) => { s.nokta.style.opacity = 1 - 0.85 * e; }, ease.inOut); await c.tween(300, (e) => { s.nokta.style.opacity = 0.15 + 0.85 * e; }, ease.inOut); } };
    await par(c.say('Buz yarı yarıya erimişken de termometre 0 °C’ta kalır.', { speak: 'Buz yarı yarıya erimişken de termometre sıfır derecede kalır.' }), yan());
  }

  /* ---- 4. Kaynama: ikinci basamak ---- */
  async function kaynama(c) {
    const s = kurSahne(c, { nokta: true });
    const { f } = s;
    const [, , sv, d] = esikler(100);
    f.ayar('sol', { alev: 2 });
    s.kut.yaz('100 g su');
    s.koy(sv);
    const bant2 = s.bant(sv, d, 100);
    await c.say('Su 100 °C’a geldi; ısıtıcı yanmaya devam ediyor.', { speak: 'Su yüz dereceye geldi; ısıtıcı yanmaya devam ediyor.' });
    c.clearSay();
    await c.choice({
      tag: 'Tahmin et', q: 'Su kaynarken termometre ne gösterir?',
      options: ['100 °C’tan yükselmeye devam eder', '100 °C’ta kalır', '100 °C’tan düşer'], answer: 1,
      hints: ['Buz erirken sıcaklık nasıl davranmıştı? Hâl değişiminde yine öyle olabilir.', '', 'Hâl değişirken ısı girer ama sıcaklık değişmiyordu.'],
      right: 'Evet. Su kaynarken sıcaklık 100 °C’ta kalır.',
    });
    const q = (p) => lerp(sv, d, p);
    await adim(c, s, sv, q(0.25), 'Su kaynıyor ve seviyesi azalıyor.');
    await adim(c, s, q(0.25), q(0.5), 'Isı giriyor ama termometre 100 °C’ta duruyor.', 'Isı giriyor ama termometre yüz derecede duruyor.');
    await par(belir(c, bant2.el, 300, 1), adim(c, s, q(0.5), q(0.75), 'Grafikte ikinci bir yatay basamak oluşuyor.'));
    await adim(c, s, q(0.75), d, 'Kaynama basamağı çok daha uzun: sayaç 305.400 J’a çıkıyor.', 'Kaynama basamağı çok daha uzun: sayaç üç yüz beş bin dört yüz jule çıkıyor.');
    // Su bitti: buhar ısınır; sayaç söner, grafikte gaz bölümü kesikli.
    f.ayar('sol', { icerik: 'bos', kaynama: 0 });
    await par(c.say('Su bitince buhar ısınır; sıcaklık yeniden yükselir.'), c.tween(700, (e) => {
      const T = 100 + 20 * e;
      /* Kap boşaldı: figürdeki termometre 100 °C'ta kalır, sayısı söner; buharın ısınması yalnızca grafikte gösterilir. */
      const qq = s.gr.nokta(lerp(d, 325000, e), T); s.nokta.setAttribute('cx', qq[0]); s.nokta.setAttribute('cy', qq[1]);
    }, ease.linear), belir(c, s.say.g, 300, 0), belir(c, s.sic.g, 300, 0), (() => { s.gr.g.querySelectorAll('line[stroke-width="4"]').forEach((l) => { l.style.visibility = 'visible'; }); return s.gr.ilerle(c, 5, 700, ease.linear); })());
  }

  /* ---- 5. Isı nereye gidiyor? ---- */
  async function icEnerji(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const f = ISITMA.kur(c, svg, FIG);
    f.goster('sag', 0);
    f.ayar('sol', { icerik: 'su', seviye: 0.25, sicaklik: 0, alev: 0, kati: 0 });
    f.bak(KAD.sol);
    f.el.style.opacity = 1;
    const g = c.S('g', {}, svg);
    const pen = pencere(c, g, mot, { cx: 230, cy: 250, r: 100, n: 6, T: 10, tohum: 5 });
    const th = termometre(c, g, { x: 373, y: 310, h: 120, T: 55.6 });
    const bas = yazi(c, g, 230, 126, 'eğik parça', { size: 26, kalin: 700 });
    const isiOk = ok(c, g, [230, 470], [230, 366], ISI, 7);
    const isiYazi = yazi(c, g, 252, 430, 'ısı', { size: 26, kalin: 700, renk: ISI, hiza: 'start' });
    // iki parçalı iç enerji çubuğu
    const cg = c.S('g', {}, svg);
    const ACIK = '#d9b6ff', KOYU = '#8a4bd1';
    const pA = c.S('rect', { x: 500, y: 230, width: 120, height: 40, rx: 6, fill: ACIK }, cg);
    const pB = c.S('rect', { x: 620, y: 230, width: 100, height: 40, rx: 6, fill: KOYU, stroke: IC, 'stroke-width': 2 }, cg);
    const toplam = c.S('rect', { x: 494, y: 224, width: 232, height: 52, rx: 10, fill: 'none', stroke: IC, 'stroke-width': 4 }, cg);
    const eA = yazi(c, cg, 500, 310, 'hareket', { size: 24, kalin: 600, renk: RENK.soluk, hiza: 'start' });
    const eB = yazi(c, cg, 620, 310, 'birbirine göre', { size: 24, kalin: 600, renk: RENK.soluk, hiza: 'start' });
    const ib = yazi(c, cg, 500, 208, 'iç enerji', { size: 26, kalin: 700, renk: IC, hiza: 'start' });
    // küçük grafik: ısının hangi parçada olduğunu gösterir (nokta eğik parçadan basamağa yürür)
    const MP = [[532, 522], [592, 462], [682, 462], [742, 402]];
    ok(c, cg, [520, 534], [520, 384], SIC, 3); ok(c, cg, [520, 534], [770, 534], ISI, 3);
    c.S('polyline', { points: MP.map((q) => q.join(',')).join(' '), fill: 'none', stroke: SIC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, cg);
    const mn = c.S('circle', { r: 8, fill: RENK.koyu, stroke: SIC, 'stroke-width': 4 }, cg);
    const mnKoy = (i, k) => { mn.setAttribute('cx', lerp(MP[i][0], MP[i + 1][0], k)); mn.setAttribute('cy', lerp(MP[i][1], MP[i + 1][1], k)); };
    mnKoy(0, 0);
    const w = { A: 120, B: 100 };
    const boy = () => {
      pA.setAttribute('width', w.A); pB.setAttribute('x', 500 + w.A); pB.setAttribute('width', w.B);
      eB.setAttribute('x', 500 + w.A); toplam.setAttribute('width', w.A + w.B + 12);
    };
    boy();
    gizle(g, cg, toplam);
    isiOk.g.style.opacity = 0;
    gizle(isiYazi);

    await par(c.say('Basamakta ısı giriyor; peki bu ısı nereye gidiyor?'), belir(c, f.el, 400, 0.2), belir(c, g, 450), belir(c, cg, 450));
    await belir(c, [isiOk.g, isiYazi], 350);
    // durum 1: eğik parça
    await par(c.say('Eğik parçada ısı, taneciklerin hareketini artırıyor.'), c.tween(1500, (e) => {
      pen.kur(lerp(10, 36.5, e)); th.kur(lerp(55.6, 100, e)); w.A = lerp(120, 190, e); boy(); mnKoy(0, e);
    }, ease.linear));
    await c.say('Sıcaklık, taneciklerin ortalama hareket enerjisinin göstergesidir.');
    // durum 2: basamak
    bas.textContent = 'basamak';
    await par(c.say('Basamakta sıcaklık sabit; tanecikler hızlanmıyor.'), c.tween(1500, (e) => { w.B = lerp(100, 170, e); boy(); mnKoy(1, e); }, ease.linear));
    await c.say('Isı alan maddenin iç enerjisi yine de artar.');
    await c.say('Artan, taneciklerin birbirini çekip itmesinden gelen enerjidir.');
    await c.choice({
      tag: 'Sor', q: 'Basamak sırasında termometre sabit. Maddenin iç enerjisi için ne söylenir?',
      options: ['Sabit kalır; sıcaklık değişmiyor', 'Artar; ısı alıyor', 'Azalır; tanecikler yavaşlıyor'], answer: 1,
      hints: ['Isı alan maddenin iç enerjisi artar; bu her zaman sıcaklıkla görünmez.', '', 'Basamakta ısı giriyor; iç enerji sabit kalabilir mi?'],
      right: 'Evet. Isı giren maddenin iç enerjisi artar; sıcaklıkla görünmeyebilir.',
    });
    await par(c.say('Basamakta iç enerji arttı ama sıcaklık sabit kaldı.'), c.tween(400, (e) => { w.B = lerp(170, 190, e); boy(); }, ease.out), belir(c, toplam, 400));
  }

  /* ---- 6. Grafiği oku ---- */
  async function oku(c) {
    const svg = c.svg(1000, 562);
    const G = c.S('g', {}, svg);
    G.setAttribute('transform', 'translate(-120,0)');
    const gr = grafik(c, G, { kose: KOSE100 });
    grKur(gr, gr.uzunluk[gr.uzunluk.length - 1]);
    const AD = { size: 24, kalin: 700, renk: RENK.cizgi };
    const ad = [
      yazi(c, G, 452, 150, 'Katı', Object.assign({ hiza: 'start' }, AD)),
      yazi(c, G, 452, 190, 'Katı +', Object.assign({ hiza: 'start' }, AD)), yazi(c, G, 452, 218, 'sıvı', Object.assign({ hiza: 'start' }, AD)),
      yazi(c, G, 575, 280, 'Sıvı', AD), yazi(c, G, 700, 146, 'Sıvı + gaz', AD), yazi(c, G, 900, 108, 'Gaz', AD),
    ];
    const cz = [cizgi(c, G, [447, 160], [447, 366], RENK.ince, 2), cizgi(c, G, [475, 232], [475, 366], RENK.ince, 2)];
    gizle(ad, cz);
    const bn = [gr.vurgu('y', -4, 4, ISI), gr.vurgu('y', 96, 104, ISI)];
    const halka = c.S('ellipse', { cx: 472, cy: 370, rx: 38, ry: 16, fill: 'none', stroke: SIC, 'stroke-width': 3 }, G);
    gizle(halka);
    const nokta = c.S('circle', { cx: gr.nokta(54320, 40)[0], cy: gr.nokta(54320, 40)[1], r: 8, fill: RENK.koyu, stroke: SIC, 'stroke-width': 4 }, G);
    gizle(nokta);

    await par(c.say('Grafikte beş bölge var; adlarını sırayla okuyalım.'), (async () => {
      await belir(c, [ad[0], cz[0]], 300); await c.wait(250);
      await belir(c, [ad[1], ad[2], cz[1]], 300); await c.wait(250);
      await belir(c, ad[3], 300); await c.wait(250);
      await belir(c, ad[4], 300); await c.wait(250);
      await belir(c, ad[5], 300);
    })());
    await c.say('Eğik parçalarda madde tek hâlde; sıcaklık yükseliyor.');
    await par(c.say('Yatay parçalarda madde hâl değiştiriyor; sıcaklık sabit kalıyor.'), belir(c, bn, 450));

    // Çözülmüş örnek.
    c.clearSay();
    await belir(c, bn, 300, 0);
    await par(c.say('Bu parçada buz eriyor; madde hem katı hem sıvıdır.'), belir(c, halka, 400));
    await c.say('Sıcaklık 0 °C’ta sabit, çünkü madde hâl değiştiriyor.', { speak: 'Sıcaklık sıfır derecede sabit, çünkü madde hâl değiştiriyor.' });

    // Birlikte çöz: ikinci basamak.
    c.clearSay();
    await belir(c, halka, 250, 0);
    halka.setAttribute('cx', 736); halka.setAttribute('cy', 170); halka.setAttribute('rx', 190); halka.setAttribute('ry', 13);
    await belir(c, halka, 350, 1);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Bu parçada madde hangi hâllerde birlikte bulunur?',
      options: ['Katı ve sıvı', 'Yalnızca gaz', 'Sıvı ve gaz'], answer: 2,
      hints: ['Yatay parçada madde hâl değiştiriyor; su kaynıyor.', 'Kaynarken hem su hem buhar vardır.', ''],
      right: 'Evet. Kaynarken sıvı ve gaz birlikte bulunur.',
    });
    await c.say('Kaynarken su ve buhar birlikte bulunur.');

    // Sor: eğik parçada bir nokta.
    c.clearSay();
    await belir(c, halka, 250, 0);
    await belir(c, nokta, 350);
    await c.choice({
      tag: 'Sor', q: 'Grafikte işaretli noktada madde hangi hâldedir?',
      options: ['Katı + sıvı', 'Sıvı', 'Gaz'], answer: 1,
      hints: ['İşaretli nokta eğik parçada; eğik parçada madde tek hâldedir.', '', 'Bu parça iki basamağın arasında; hangi hâl?'],
      right: 'Evet. Eğik parçada madde tek hâldedir.',
    });
    await c.say('İşaretli nokta iki basamağın arasında; madde sıvıdır.');
    c.note('Hâl değişirken ısı girer, sıcaklık sabit kalır.', 'Hâl değişimi ve sıcaklık');
  }

  /* ---- 7. Kütle ve madde değişince grafik ---- */
  /* Küçük grafik: yerel koordinatlarda 220 × 150 birim, 250 J = 1 birim (senaryo); tahtada 1,45 kat büyütülerek (tx, ty) noktasına konur.
     Büyütme iki grafikte de aynıdır: uzunluk ve yükseklik oranları korunur. */
  function mini(c, p, tx, ty, baslik, hy, uz) {
    const g = c.S('g', { transform: `translate(${tx},${ty}) scale(1.45)` }, p);
    ok(c, g, [0, 0], [0, -150], SIC, 3); ok(c, g, [0, 0], [220, 0], ISI, 3);
    yazi(c, g, 110, -170, baslik, { size: 24, kalin: 700, renk: KUTLE });
    const P = [[10, -8], [30, -hy], [30 + uz, -hy], [50 + uz, -hy - 40]];
    c.S('polyline', { points: P.map((q) => q.join(',')).join(' '), fill: 'none', stroke: SIC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    const yuk = cizgi(c, g, [0, -hy], [30, -hy], RENK.cizgi, 2, { 'stroke-dasharray': '6 6' });
    const boyG = c.S('g', {}, g);
    cizgi(c, boyG, [30, 24], [30 + uz, 24], ISI, 5);
    cizgi(c, boyG, [30, 14], [30, 34], ISI, 3); cizgi(c, boyG, [30 + uz, 14], [30 + uz, 34], ISI, 3);
    gizle(yuk, boyG);
    return { g, yuk, boyG };
  }
  async function kutleMadde(c) {
    const s = kurSahne(c, { egriYok: true });
    const { f, gr, G } = s;
    grKur(gr, gr.uzunluk[3]);
    G.style.opacity = 1;
    const e200 = egri(c, G, gr, koseOf(200), '#ffe38a');
    const e50 = egri(c, G, gr, koseOf(50), RENK.soguk, { kesik: '10 8' });
    const et = [yazi(c, G, 548, 150, '100 g', { size: 24, kalin: 700, renk: KUTLE }), yazi(c, G, 690, 150, '200 g', { size: 24, kalin: 700, renk: KUTLE }),
      yazi(c, G, 470, 150, '50 g', { size: 24, kalin: 700, renk: KUTLE })];
    gizle(et);
    gizle(f.el, s.L);
    await par(c.say('Ela şimdi 200 g buzla aynı deneyi yapıyor.', { speak: 'Ela şimdi iki yüz gram buzla aynı deneyi yapıyor.' }), belir(c, [f.el, s.L], 400));
    await c.tween(500, (e) => { f.ayar('sol', { seviye: lerp(0.25, 0.45, e) }); if (e > 0.5) s.kut.yaz('200 g buz'); }, ease.inOut);
    s.st.m = 200;
    s.koy(0, 200);
    await alevAc(c, f);
    const Qs = esikler(200)[2];
    await c.tween(4000, (k) => {
      const Q = lerp(0, Qs, k), h = s.uygula(Q, 200);
      e200.kurQ(Q);
    }, ease.linear);
    await par(c.tween(300, (e) => f.ayar('sol', { alev: 2 * (1 - e) }), ease.in), belir(c, [et[0], et[1]], 400), c.say('Basamak aynı yükseklikte: erime sıcaklığı değişmedi.'));
    await c.say('Ama basamak iki kat uzun: gereken ısı iki katına çıktı.');
    await c.say('Kütle büyüyünce basamak uzar, yüksekliği değişmez.');

    c.clearSay();
    await c.choice({
      tag: 'Sor', q: '50 g buzla aynı deney yapılsa 0 °C’ta basamak nasıl olur?',
      options: ['Daha uzun, aynı yükseklikte', 'Aynı uzunlukta, daha aşağıda', 'Daha kısa, aynı yükseklikte'], answer: 2,
      hints: ['Kütle küçülünce gereken ısı da küçülür; basamağın boyu ısıdır.', 'Erime sıcaklığı değişmez; basamak yine 0 °C’ta.', ''],
      right: 'Evet. Kütle küçülünce basamak kısalır, yüksekliği değişmez.',
    });
    const Q50 = esikler(50)[2];
    await par(c.say('50 g buzun basamağı daha kısa, aynı yükseklikte.', { speak: 'Elli gram buzun basamağı daha kısa, aynı yükseklikte.' }),
      c.tween(800, (k) => e50.kurQ(lerp(0, Q50, k)), ease.linear), belir(c, et[2], 600));

    // Madde karşılaştırması.
    c.clearSay();
    const M = c.S('g', {}, s.svg);
    const m1 = mini(c, M, 120, 420, '100 g buz', 45, 133.6), m2 = mini(c, M, 560, 420, '100 g bal mumu', 95, 67.2);
    gizle(M);
    await par(belir(c, G, 450, 0), belir(c, [f.el, s.L], 450, 0));
    await par(c.say('Şimdi aynı kütlede iki farklı madde var: buz ve bal mumu.'), belir(c, M, 450));
    await par(c.say('Her saf maddenin basamağı kendi hâl değişim sıcaklığında olur.'), belir(c, [m1.yuk, m2.yuk], 400));
    await par(c.say('Bal mumunun basamağı, buzunkinin yarısı kadar uzun.'), belir(c, [m1.boyG, m2.boyG], 400));
    await c.say('Madde değişince basamağın yüksekliği ve uzunluğu değişir.');
  }

  /* ---- 8. Dene: kütleyi seç, basamağı ölç ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const G = c.S('g', {}, svg);
    G.setAttribute('transform', 'translate(-120,0)');
    const gr = grafik(c, G, { kose: [], xCentik: [0, 100000, 200000], yCentik: [-20, 0, 100] });
    const yol = (m) => { const k = koseOf(m); return k.map((q) => gr.nokta(q[0], q[1])); };
    const gri = c.S('polyline', { fill: 'none', stroke: RENK.gri, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, G);
    yolCiz(gri, yol(100));
    const sari = c.S('polyline', { fill: 'none', stroke: SIC, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, G);
    const et = yazi(c, G, 535, 150, '100 g', { size: 24, kalin: 700, renk: KUTLE });
    const R = c.S('g', {}, svg);
    R.setAttribute('transform', 'translate(-120,0)');
    kutu(c, R, 700, 196, 245, 168, { rx: 12 });
    const ust = yazi(c, R, 718, 228, 'Görev 1', { size: 24, kalin: 700, renk: SIC, hiza: 'start' });
    const sat = [0, 1, 2, 3].map((i) => yazi(c, R, 718, 262 + i * 28, '', { size: 24, kalin: 600, hiza: 'start' }));
    const gorevYaz = (no, satirlar) => { ust.textContent = 'Görev ' + no; sat.forEach((t, i) => { t.textContent = satirlar[i] || ''; }); };
    gorevYaz(1, ['Basamağı gri', 'basamağın yarısı', 'kadar olan', 'kütleyi bul.']);
    gizle(G, R);
    const st = { pts: yol(100), tok: 0, m: 100 };
    yolCiz(sari, st.pts);
    const uygula = (m) => {
      st.m = m;
      const hedef = yol(m), bas = st.pts, tok = ++st.tok;
      c.tween(500, (e) => { if (tok !== st.tok) return; st.pts = bas.map((q, i) => [lerp(q[0], hedef[i][0], e), lerp(q[1], hedef[i][1], e)]); yolCiz(sari, st.pts); }, ease.inOut);
    };
    const sl = c.slider({ label: 'Kütle', min: 50, max: 200, step: 50, value: 100, fmt: (v) => v + ' g', onInput: (v) => uygula(+v) });

    await par(c.say('Kütleyi sen seç; basamağın boyu ona göre değişir.'), belir(c, G, 450));
    c.say('Önce gri basamağın yarısı kadar uzun olanı bul.', { noWait: true });
    await belir(c, R, 350);
    const gorevler = [
      { m: 50, no: 1 },
      { m: 200, no: 2, yaz: ['Basamağı gri', 'basamağın iki katı', 'olan kütleyi bul.'], y: 'Şimdi gri basamağın iki katı uzunlukta olanı bul.' },
    ];
    for (let gi = 0; gi < gorevler.length; gi++) {
      const gv = gorevler[gi];
      if (gi > 0) {
        gorevYaz(gv.no, gv.yaz);
        c.say(gv.y, { noWait: true });
      }
      await c.cont('Devam ›');
      if (st.m !== gv.m) {
        c.say('Basamağın boyu ısıyı gösterir; kütle ile birlikte değişir.', { noWait: true });
        await c.cont('Devam ›');
        sl.set(gv.m);
      }
      const [a, b] = esikler(gv.m);
      const yesil = gr.vurgu('x', a, b, RENK.iyi);
      await belir(c, yesil, 300, 1);
      await c.wait(900);
      if (gi < gorevler.length - 1) { c.clearSay(); await belir(c, yesil, 250, 0); yesil.remove(); }
    }
    sl.remove();
    await c.say('Kütle arttıkça basamak uzar; yüksekliği hiç değişmez.');
  }

  Ders.start({
    id: 'enerji-c2', kicker: 'Konu C · Hâl değişimi', title: 'Isı veriyorsun, sıcaklık yerinde sayıyor', accent: '#3cc8e8', back: 'index.html',
    intro: {
      title: 'Isı veriyorsun, sıcaklık yerinde sayıyor',
      hook: 'İçinde buz olan suyu ocağa koydun; buz bitene kadar termometre ne gösterir?',
      button: 'Derse başla ›',
    },
    goals: ['Sıcaklık–ısı grafiğinde hâl değişimini yatay basamak olarak tanır.', 'Hâl değişirken ısının girdiğini ama sıcaklığın sabit kaldığını söyler.', 'Basamakta iç enerjinin neden arttığını açıklar.', 'Kütle ya da madde değişince basamağın nasıl değiştiğini söyler.'],
    scenes: [
      { title: 'Hatırla', goal: 'Kütle ve sıcaklık artışının gereken ısıyı nasıl değiştirdiğini hatırla.', run: hatirla },
      { title: 'Buzu –20 °C’tan başlatıyoruz', goal: 'Grafiğin nasıl görüneceğini tahmin et.', run: baslangic },
      { title: 'Katı, erime, sıvı', goal: 'Erirken ısının girdiğini ama sıcaklığın sabit kaldığını gör.', run: basamak },
      { title: 'Kaynama: ikinci basamak', goal: 'Kaynarken de sıcaklığın sabit kaldığını gör.', run: kaynama },
      { title: 'Isı nereye gidiyor?', goal: 'Basamakta iç enerjinin arttığını gör.', run: icEnerji },
      { title: 'Grafiği oku', goal: 'Grafiğin beş bölgesini oku.', run: oku },
      { title: 'Kütle ve madde değişince grafik', goal: 'Basamağın kütleyle ve maddeyle nasıl değiştiğini gör.', run: kutleMadde },
      { title: 'Dene: kütleyi seç, basamağı ölç', goal: 'Kütleyi değiştirip basamağın boyunu ölç.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela buz–su karışımını ısıtıyor; buzun yarısı erimiş, termometre 0 °C. Isıtmaya devam edilirse buz tamamen erimeden termometre ne gösterir?',
        options: ['Yavaş yavaş yükselir', '0 °C’ta kalır', '–20 °C’a düşer'], answer: 1,
        why: ['Buz erirken sıcaklık yükselmez; giren ısı buzu eritmeye gider.', 'Hâl değişirken sıcaklık sabit kalır; giren ısı buzu eritir.', 'Isı girerken sıcaklık düşmez; basamakta sabit kalır.'], scene: 2 },
      { q: '“Isı verilen bir maddenin sıcaklığı her zaman yükselir.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; ısı hep sıcaklığı yükseltir', 'Doğrudur; yalnızca sıvılar için', 'Yanlıştır; hâl değişirken sıcaklık sabit kalır'], answer: 2,
        why: ['Erirken ve kaynarken ısı girer ama sıcaklık yükselmez.', 'Sıvılar için de değişmez; kaynarken sıcaklık sabit kalır.', 'Hâl değişimi sırasında ısı girer, sıcaklık sabit kalır.'], scene: 2 },
      { q: 'Bir maddenin sıcaklık–ısı grafiğinde iki yatay parça var. Bu ne anlama gelir?',
        options: ['Madde iki kez hâl değiştirmiştir', 'Isıtıcı iki kez kapanmıştır', 'Madde iki kez ısınmıştır'], answer: 0,
        why: ['Yatay parça hâl değişimidir; iki yatay parça, iki hâl değişimi demektir.', 'Isıtıcı kapanınca grafik ilerlemez; yatay parça bu değildir.', 'Isınma eğik parçalarda görülür; yatay parçada sıcaklık değişmez.'], scene: 5 },
      { q: 'Aynı maddeden 100 g ve 300 g, erime sıcaklığına kadar getirilip ısıtılıyor. 300 g’ın erime basamağı 100 g’ınkine göre nasıldır?',
        options: ['Üç kat yüksekte, aynı uzunlukta', 'Aynı yükseklikte, aynı uzunlukta', 'Aynı yükseklikte, üç kat uzun'], answer: 2,
        why: ['Erime sıcaklığı değişmediği için basamak yüksekte durmaz.', 'Kütle üç katına çıkınca gereken ısı da değişir; basamak uzar.', 'Yükseklik erime sıcaklığıdır, değişmez; uzunluk ısıdır ve kütleyle üç katına çıkar.'], scene: 6 },
      { q: '“Kaynayan suyun termometresi 100 °C’ta duruyor; demek ki suya ısı girmiyor.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; sıcaklık değişmiyorsa ısı girmez', 'Yanlıştır; ısı giriyor, su hâl değiştiriyor', 'Doğrudur; ısı yalnızca ısıtıcıda kalır'], answer: 1,
        why: ['Hâl değişirken sıcaklık sabit olsa da ısı girmeye devam eder.', 'Kaynarken giren ısı suyu buhara çevirir; sıcaklık sabit kalır.', 'Isı ısıtıcıdan suya geçer; kaynama basamağında sayaç artmaya devam eder.'], scene: 3 },
    ],
    summary: ['Sıcaklık–ısı grafiğinde hâl değişimi yatay bir basamak olarak görünür.', 'Basamakta tanecikler hızlanmaz ama iç enerji artar; kütle büyüyünce basamak uzar.', '<b>Hâl değişirken ısı girer, sıcaklık bekler.</b>'],
    nextLesson: { href: 'c3-hal-degisimi-icin-isi.html', label: 'Sonraki: Hâl değişimi için gereken ısı ›' },
  });
})();
