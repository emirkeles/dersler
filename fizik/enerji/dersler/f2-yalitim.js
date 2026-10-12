/* F2 — Yalıtım: ısıyı yavaşlatmak
   Isı iletim hızına dair çıkarımlar yalıtımda sınanır: ısıyı yavaş ileten malzeme ısı alışverişini iki yönde de yavaşlatır;
   bu da enerji ve para tasarrufu sağlar. Formül ve hesap yok. Sayılar senaryonun "Örnek veri" satırıdır.
   Senaryo: plan/fizik/enerji/senaryolar/F-isi-iletim-hizi-ve-yalitim.md (F2). Duvar figürü: DUVAR (duvar-sekil.js).
   Isı okunun kalınlığı yalnızca sıralamayı gösterir: ince 4 (yavaş), orta 9, kalın 14 (hızlı). Altı yapıdan hiçbiri "en iyi" ilan edilmez. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, ileri, uz, sinifla } = window.KIT;
  const { KALIN, isiOku, okuma, sureCizgisi, katsayiSatiri, yapiKarti } = window.KIT_F;
  const { lerp, ease } = Ders;
  const K = DUVAR.kadraj;
  const FIG = { x: 40, y: 20, h: 500 };   // iç okuma yazısı solda, dış okuma yazısı sağda boş yere düşer; etiketler tahtanın içinde kalır
  const SOL = 655, SW = 330;               // sağ sütun: başlangıç ve genişlik
  const DUV = '#3a4678', STRAFOR = '#e8d9a0', CAMREN = '#9cc2ff';
  const soz = (c, m, s, o) => c.say(m, Object.assign(s ? { speak: s } : {}, o || {}));

  /* ---- ortak yardımcılar ---- */
  /* Sağ sütundaki ya da tahtadaki yazı kartı: satırlar düz yazı ya da renkli() parçaları; gizli başlar. */
  function kart(c, p, x, y, w, h, satirlar, o = {}) {
    const g = c.S('g', {}, p), ls = o.ls || 34, size = o.size || 24, y0 = y + h / 2 - ((satirlar.length - 1) * ls) / 2 + size * 0.36;
    kutu(c, g, x, y, w, h, { rx: 14, renk: o.renk });
    satirlar.forEach((s, i) => renkli(c, g, x + w / 2, y0 + i * ls, Array.isArray(s) ? s : [s], { size, kalin: o.kalin || 600 }));
    gizle(g);
    return g;
  }
  /* Duvar kesiti: koyu dikdörtgen. */
  const duvarKesit = (c, p, x, y, w, h) => c.S('rect', { x, y, width: w, height: h, rx: 4, fill: DUV, stroke: RENK.cizgi, 'stroke-width': 2 }, p);

  /* Duvar figürü, iç ve dış yazıları, iki sıcaklık okuması, yalıtım etiketi ve ısı oku: bir yerde toplanır.
     d.set({ ic, dis, yalitim, cam }) anında; d.git(ms, { ic, dis, yalitim, cam, kalin }, ease) c.tween ile; d.yon 'kis' (içten dışa) ya da 'yaz'. */
  function duvar(c, svg, o = {}) {
    const f = DUVAR.kur(c, svg, FIG);
    f.bak(o.kadraj || K.duvar);
    const d = Object.assign({ yalitim: 0, cam: 1, ic: 22, dis: 0 }, o.ayar);
    f.ayar(d);
    const L = c.S('g', {}, svg);
    const icEt = yazi(c, L, 0, 0, 'iç', { size: 24, kalin: 600 }), disEt = yazi(c, L, 0, 0, 'dış', { size: 24, kalin: 600 });
    const icO = okuma(c, L, f, 'ic.termometre', { yan: 'sol' }), disO = okuma(c, L, f, 'dis.termometre', { yan: 'sag' });
    const yal = yazi(c, L, 0, 0, o.yalAd || 'yalıtım', { size: 24, kalin: 600, hiza: 'start' });
    const ok = isiOku(c, L, [0, 0], [10, 0], { kalin: KALIN.kalin });
    const s = { yon: 'kis', ek: [] };
    const izle = () => {
      let q = f.nokta('ic.etiket'); icEt.setAttribute('x', q[0]); icEt.setAttribute('y', q[1] + 24);
      q = f.nokta('dis.etiket'); disEt.setAttribute('x', q[0]); disEt.setAttribute('y', q[1] + 24);
      q = f.nokta('yalitim'); yal.setAttribute('x', q[0] + 56); yal.setAttribute('y', q[1] + 8);
      const a = f.nokta('duvar.ic'), b = f.nokta('duvar.dis'), ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
      let P = ileri(a, ang, -30), Q = ileri(b, ang, 30);
      if (o.okMod === 'cam') { const m = f.nokta('cam'), yarim = uz(a, b) / 2 + 30; P = ileri(m, ang, -yarim); Q = ileri(m, ang, yarim); }
      if (s.yon === 'yaz') ok.ciz(Q, P); else ok.ciz(P, Q);
      icO.izle(); disO.izle();
      s.ek.forEach((fn) => fn());
    };
    const set = (n) => {
      Object.assign(d, n);
      const fa = {};
      ['yalitim', 'cam', 'ic', 'dis'].forEach((k) => { if (k in n) fa[k] = n[k]; });
      f.ayar(fa);
      if ('ic' in n) icO.guncelle(d.ic);
      if ('dis' in n) disO.guncelle(d.dis);
      izle();
    };
    icO.guncelle(d.ic); disO.guncelle(d.dis); izle();
    gizle(f.el, L, yal);
    if (o.okumaYok) gizle(icO.g, disO.g);
    return Object.assign(s, {
      f, L, d, ok, yal, set, izle,
      git(ms, hedef, e = ease.linear) {
        const b = Object.assign({}, d), bk = ok.w;
        return c.tween(ms, (k) => {
          const n = {};
          Object.keys(hedef).forEach((a) => { if (a !== 'kalin') n[a] = lerp(b[a], hedef[a], k); });
          if (hedef.kalin != null) ok.kalinlik(lerp(bk, hedef.kalin, k));
          set(n);
        }, e);
      },
      /* cam sayısı anında değişir: figürü 200 ms soluklaştır, ayarı değiştir, yeniden belirt. */
      async camDegis(n) { await belir(c, f.el, 200, 0); set({ cam: n }); await belir(c, f.el, 200, 1); },
      goster(ms = 450, ...ek) { return belir(c, [f.el, L, ...ek], ms); },
    });
  }

  /* Kıs/yaz tahtasındaki kısa oklar ve yön yazıları için küçük pencere çizimi (kesit). */
  const pencereCiz = (c, g, cx, cy, boy, cift) => {
    c.S('rect', { x: cx - boy / 2, y: cy - boy / 2, width: boy, height: boy, rx: 4, fill: CAMREN, 'fill-opacity': 0.22, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    if (cift) c.S('rect', { x: cx - boy / 2 + 8, y: cy - boy / 2 + 8, width: boy - 16, height: boy - 16, rx: 3, fill: 'none', stroke: CAMREN, 'stroke-width': 2.5 }, g);
  };

  /* Kart kartlarını kutulara ayırtan "Dene" tahtası (seç, kart yerine oturur). */
  async function siniflaTahta(c, svg, o) {
    const ust = c.S('g', {}, svg), sayac = o.kutular.map(() => 0);
    o.kutular.forEach((k) => { kutu(c, ust, k.x, 40, k.w, 54, { rx: 10 }); yazi(c, ust, k.x + k.w / 2, 76, k.ad, { size: 26, kalin: 700 }); });
    gizle(ust);
    await belir(c, ust, 400);
    c.clearSay();
    let kt = null;
    await sinifla(c, {
      tag: 'Dene', kutular: o.kutular.map((k) => k.ad), kartlar: o.kartlar, soru: () => o.soru,
      sec: async (_, k) => {
        kt = c.S('g', {}, svg);
        kutu(c, kt, 150, 330, 700, 110, { rx: 14 });
        yazi(c, kt, 500, 394, k.metin, { size: 26, kalin: 600 });
        gizle(kt);
        await belir(c, kt, 350);
      },
      yerlestir: async (_, k) => {
        const el = kt, kk = o.kutular[k.kutu], kx = kk.x + kk.w / 2, ky = 140 + sayac[k.kutu] * (o.adim || 38);
        sayac[k.kutu] += 1;
        await c.tween(400, (e) => { el.setAttribute('transform', `translate(${500 * 0.4 * e},${385 * 0.4 * e}) scale(${1 - 0.4 * e})`); el.style.opacity = 1 - e; }, ease.in);
        el.remove();
        const ad = yazi(c, ust, kx, ky, k.ad, { size: o.liste || 24, kalin: 600, renk: RENK.soluk });
        gizle(ad);
        await belir(c, ad, 300);
      },
    });
    return ust;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const k1 = c.S('g', {}, svg);
    const sKart = katsayiSatiri(c, k1, 90, 150, 340, 'strafor', '0,039', { h: 120, size: 34 }), dKart = katsayiSatiri(c, k1, 570, 150, 340, 'demir', '80', { h: 120, size: 34 });
    const sOk = isiOku(c, k1, [130, 370], [390, 370], { kalin: KALIN.ince }), dOk = isiOku(c, k1, [610, 370], [870, 370], { kalin: KALIN.kalin });
    gizle(k1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, [k1, sKart, dKart], 450));
    await c.choice({
      tag: 'Hatırla', q: 'Isı iletim katsayısı küçük olan bir madde ısıyı nasıl iletir?',
      options: ['Hızlı iletir; ısı iletkenidir', 'Yavaş iletir; ısı yalıtkanıdır', 'Hiç iletmez'], answer: 1,
      hints: ['Katsayısı küçük madde ısıyı yavaş iletir ve ısı yalıtkanı sayılır.', '', 'Katsayısı küçük madde ısıyı yavaş iletir ve ısı yalıtkanı sayılır.'],
      right: 'Evet. Katsayısı küçük madde ısıyı yavaş iletir.',
    });
    await par(c.say('Strafor ısıyı yavaş, demir hızlı iletir.'), belir(c, [sOk.g, dOk.g], 500));
    c.clearSay();
    await belir(c, k1, 350, 0); k1.remove();

    const k2 = c.S('g', {}, svg);
    c.S('rect', { x: 440, y: 80, width: 60, height: 380, rx: 4, fill: DUV, stroke: RENK.cizgi, 'stroke-width': 2 }, k2);
    renkli(c, k2, 410, 150, ['iç · ', ['22 °C', RENK.sicaklik]], { size: 36, kalin: 700, hiza: 'end' });
    renkli(c, k2, 530, 150, ['dış · ', ['0 °C', RENK.sicaklik]], { size: 36, kalin: 700, hiza: 'start' });
    const ok2 = isiOku(c, k2, [250, 330], [690, 330], { kalin: KALIN.orta });
    gizle(k2);
    await belir(c, k2, 450);
    await c.choice({
      tag: 'Hatırla', q: 'Kışın sıcak bir odanın duvarında ısı hangi yönde aktarılır?',
      options: ['Dışarıdan içeriye', 'Aktarılmaz', 'İçeriden dışarıya'], answer: 2,
      hints: ['Isı hep sıcaklığı yüksek olandan düşük olana aktarılır.', 'Isı hep sıcaklığı yüksek olandan düşük olana aktarılır.', ''],
      right: 'Evet. Isı sıcak yerden soğuk yere aktarılır.',
    });
    await par(c.say('Isı, sıcak içeriden soğuk dışarıya aktarılır.'), belir(c, ok2.g, 500));
    await c.say('Bugün bu bilgiyi evlerde, pencerelerde ve termosta kullanacağız.');
  }

  /* ---- 2. Kışın aynı duvar ---- */
  async function kis(c) {
    const svg = c.svg(1000, 562);
    const d = duvar(c, svg, { ayar: { yalitim: 0, cam: 1, ic: 22, dis: 0 } });
    const sure = sureCizgisi(c, svg);
    const kIsit = kart(c, svg, SOL, 60, SW, 60, [[['ısıtıcı kapalı', RENK.soluk]]]);
    const kTanim = kart(c, svg, SOL, 200, SW, 104, [[['ısı yalıtımı', RENK.yazi]], 'ısı geçişini azaltmak'], { kalin: 700 });
    const kDur = kart(c, svg, SOL, 340, SW, 64, ['durdurmaz · yavaşlatır'], { kalin: 700 });
    gizle(sure.g);

    await par(soz(c, 'Ela’nın evi kışın ısıtılıyor; içeride 22 °C, dışarıda 0 °C.', 'Ela’nın evi kışın ısıtılıyor; içeride yirmi iki derece, dışarıda sıfır derece.'), d.goster(450, sure.g));
    await par(c.say('Duvarda yalıtım yok; bir gece ısıtıcı kapanıyor.'), belir(c, kIsit, 400));
    await par(c.say('Isı sıcaktan soğuğa, yani içeriden dışarıya aktarılıyor.'), belir(c, d.ok.g, 500));
    await par(soz(c, 'Sabaha kadar iç sıcaklık 9 °C’ye düşüyor.', 'Sabaha kadar iç sıcaklık dokuz dereceye düşüyor.'), par(d.git(3000, { ic: 9 }), sure.git(c, 1, 3000)));
    await par(c.say('Ertesi gün duvara bir yalıtım katmanı takılıyor.'), (async () => {
      await par(d.git(600, { ic: 22 }, ease.inOut), sure.git(c, 0, 600, ease.inOut));
      await d.git(1000, { yalitim: 1 }, ease.inOut);
      await par(belir(c, d.yal, 300), d.git(500, { kalin: KALIN.ince }, ease.inOut));
    })());
    await par(soz(c, 'Aynı gece iç sıcaklık yalnızca 17 °C’ye düşüyor.', 'Aynı gece iç sıcaklık yalnızca on yedi dereceye düşüyor.'), par(d.git(3000, { ic: 17 }), sure.git(c, 1, 3000)));
    await c.say('Yalıtım ısıyı yavaş ileten bir katmandır; ev daha geç soğur.');
    await par(c.say('Isıyı yavaş ileten malzemeyle ısı geçişini azaltmaya ısı yalıtımı denir.'), belir(c, kTanim, 400));
    await par(soz(c, 'Yalıtım ısıyı üretmez ve durdurmaz; yalnızca yavaşlatır.', '[short pause] Yalıtım ısıyı üretmez ve durdurmaz; yalnızca yavaşlatır.'), belir(c, kDur, 400));
    c.note('Yalıtım ısıyı durdurmaz, yavaşlatır. Ev daha geç soğur.', 'Yalıtım');
  }

  /* ---- 3. Yazın aynı duvar ---- */
  const GISI = 'M40,0 Q70,26 100,0 L140,28 L140,62 L112,72 L112,150 L28,150 L28,72 L0,62 L0,28 Z';
  async function yaz(c) {
    const svg = c.svg(1000, 562);
    const d = duvar(c, svg, { ayar: { yalitim: 1, cam: 1, ic: 17, dis: 0 } });
    d.yon = 'yaz'; d.izle();
    const sure = sureCizgisi(c, svg);
    gizle(sure.g);
    const kc = c.S('g', {}, svg);
    kutu(c, kc, SOL, 110, SW, 150, { rx: 14 });
    yazi(c, kc, SOL + SW / 2, 160, 'Yazın ısı dıştan içeriye', { size: 24, kalin: 600 });
    yazi(c, kc, SOL + SW / 2, 196, 'akar. Yalıtımlı duvarda', { size: 24, kalin: 600 });
    const bos = renkli(c, kc, SOL + SW / 2, 232, ['bu akış ', ['……', RENK.soluk], ' .'], { size: 24, kalin: 600 });
    gizle(kc);

    await par(soz(c, 'Yaz geldi; dışarısı 38 °C, evin içi 25 °C.', 'Yaz geldi; dışarısı otuz sekiz derece, evin içi yirmi beş derece.'), (async () => {
      await d.goster(450, sure.g);
      await d.git(1000, { yalitim: 0, ic: 25, dis: 38 }, ease.inOut);
    })());
    await par(c.say('Isı yine sıcaktan soğuğa aktarılır; bu kez dışarıdan içeriye.'), belir(c, d.ok.g, 500));
    await par(soz(c, 'Yalıtımsız evde öğleden akşama iç sıcaklık 33 °C’ye çıkıyor.', 'Yalıtımsız evde öğleden akşama iç sıcaklık otuz üç dereceye çıkıyor.'), par(d.git(3000, { ic: 33 }), sure.git(c, 1, 3000)));
    await par(soz(c, 'Aynı gün yalıtım takılırsa iç sıcaklık yalnızca 28 °C’ye çıkıyor.', 'Aynı gün yalıtım takılırsa iç sıcaklık yalnızca yirmi sekiz dereceye çıkıyor.'), (async () => {
      await par(d.git(600, { ic: 25 }, ease.inOut), sure.git(c, 0, 600, ease.inOut));
      await d.git(1000, { yalitim: 1 }, ease.inOut);
      await par(belir(c, d.yal, 300), d.git(500, { kalin: KALIN.ince }, ease.inOut));
      await par(d.git(3000, { ic: 28 }), sure.git(c, 1, 3000));
    })());
    await c.say('Aynı katman ısıyı bu kez de yavaşlatıyor.');

    // Birlikte çöz: ilk cümle dolu gelir.
    c.clearSay();
    await belir(c, kc, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'Boşluğa hangisi yazılır?', options: ['durur', 'yavaşlar', 'hızlanır'], answer: 1,
      hints: ['Yalıtım ısıyı durdurmaz; yalnızca yavaşlatır.', '', 'Yalıtım kışın ısıyı yavaşlatıyordu; yazın ne yapar?'],
      right: 'Evet. Yalıtım yazın da ısı akışını yavaşlatır.',
    });
    parcaKoy(c, bos, ['bu akış ', ['yavaşlar', RENK.iyi], '.']);
    await c.say('Yalıtım ısıyı iki yönde de yavaşlatır.');
    await c.say('Kışın evi daha geç soğutur; yazın daha geç ısıtır.');

    // Sor: giysi.
    c.clearSay();
    await belir(c, [d.f.el, d.L, sure.g, kc], 350, 0);
    const g = c.S('g', {}, svg);
    [[120, 'kış'], [520, 'yaz']].forEach(([x, ad]) => {
      c.S('path', { d: GISI, transform: `translate(${x},80) scale(1.7)`, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-linejoin': 'round' }, g);
      yazi(c, g, x + 119, 400, ad, { size: 34, kalin: 700 });
    });
    gizle(g);
    await belir(c, g, 400);
    await c.choice({
      tag: 'Sor', q: 'Termal kumaştan yapılmış bir giysi kışın sıcak tutuyor. Yazın aynı giysi ne yapar?',
      options: ['Vücuda ısı verir', 'Yalnızca kışın işe yarar; yazın etkisi yoktur', 'Dışarıdan vücuda ısı geçişini yavaşlatır'], answer: 2,
      hints: ['Yazın ısı hangi yönde akıyor? Dışarıdan vücuda.', 'Yalıtım kışın ve yazın aynı işi yapar: ısıyı yavaşlatır.', ''],
      right: 'Evet. Giysi yazın da ısı geçişini yavaşlatır.',
    });
    const gor = c.S('g', {}, svg);
    yazi(c, gor, 239, 208, 'vücut', { size: 26, kalin: 600, renk: RENK.soluk });
    yazi(c, gor, 639, 208, 'vücut', { size: 26, kalin: 600, renk: RENK.soluk });
    yazi(c, gor, 492, 312, 'dış', { size: 28, kalin: 600, hiza: 'start' });
    yazi(c, gor, 892, 312, 'dış', { size: 28, kalin: 600, hiza: 'start' });
    const okK = isiOku(c, gor, [239, 304], [480, 304], { kalin: KALIN.ince }), okY = isiOku(c, gor, [880, 304], [650, 304], { kalin: KALIN.ince });
    gizle(gor);
    await par(c.say('Giysilerde de kışın ve yazın ısı iletimi en aza indirilir.'), belir(c, [gor, okK.g, okY.g], 500));
    c.note('Yalıtım kışın da yazın da ısıyı yavaşlatır.', 'İki yön');
  }

  /* ---- 4. Duvarda iki yol: kalınlık ve katman ---- */
  async function duvarYol(c) {
    const svg = c.svg(1000, 562);
    const d = duvar(c, svg, { ayar: { yalitim: 0, cam: 1, ic: 22, dis: 0 }, yalAd: 'strafor', okumaYok: true });
    // Kalınlık ölçü çizgisi: kalinlik.a ile kalinlik.b arasında, kesitin 18 birim üstünde.
    const olc = c.S('g', {}, d.L);
    const ol = cizgi(c, olc, [0, 0], [1, 1], RENK.cizgi, 3), u1 = cizgi(c, olc, [0, 0], [1, 1], RENK.cizgi, 3), u2 = cizgi(c, olc, [0, 0], [1, 1], RENK.cizgi, 3);
    const olcYazi = yazi(c, olc, 0, 0, 'kalınlık', { size: 24, kalin: 600 });
    const olcYer = () => {
      const a = d.f.nokta('kalinlik.a'), b = d.f.nokta('kalinlik.b'), A = [a[0], a[1] - 18], B = [b[0], b[1] - 18];
      [ol, u1, u2].forEach((e, i) => {
        const P = i === 0 ? A : i === 1 ? [A[0], A[1] - 8] : [B[0], B[1] - 8], Q = i === 0 ? B : i === 1 ? [A[0], A[1] + 8] : [B[0], B[1] + 8];
        e.setAttribute('x1', P[0]); e.setAttribute('y1', P[1]); e.setAttribute('x2', Q[0]); e.setAttribute('y2', Q[1]);
      });
      olcYazi.setAttribute('x', (A[0] + B[0]) / 2); olcYazi.setAttribute('y', Math.min(A[1], B[1]) - 18);
    };
    d.ek.push(olcYer); d.izle();
    gizle(olc);

    // Sağ sütun: ince ve kalın duvar kesiti.
    const iki = c.S('g', {}, svg);
    duvarKesit(c, iki, 690, 130, 40, 130); duvarKesit(c, iki, 830, 130, 110, 130);
    yazi(c, iki, 710, 304, 'ince', { size: 24, kalin: 600 }); yazi(c, iki, 885, 304, 'kalın', { size: 24, kalin: 600 });
    const okI = isiOku(c, iki, [662, 195], [758, 195], { kalin: KALIN.kalin }), okKal = isiOku(c, iki, [806, 195], [976, 195], { kalin: KALIN.ince });
    gizle(iki);
    const kKap = kart(c, svg, SOL, 150, SW, 80, ['kaplama:', 'katsayısı küçük'], { kalin: 700 });
    const kats = c.S('g', {}, svg);
    const r1 = katsayiSatiri(c, kats, SOL, 150, SW, 'strafor', '0,039'), r2 = katsayiSatiri(c, kats, SOL, 222, SW, 'çimento harcı', '1,6');
    gizle(kats);

    await par(c.say('Mühendisler ve mimarlar yalıtımda ısı iletim hızının etmenlerinden yararlanır.'), d.goster(450));
    await par(c.say('Birinci yol duvarı kalın yapmaktır; kalınlık arttıkça hız azalır.'), (async () => {
      await belir(c, olc, 400);
      await belir(c, [iki, okI.g, okKal.g], 500);
    })());
    await par(c.say('İkinci yol, duvarı katsayısı küçük bir malzemeyle kaplamaktır.'), (async () => {
      await belir(c, [iki, okI.g, okKal.g], 300, 0);
      await belir(c, kKap, 400);
    })());
    await par(c.say('Duvarlar çoğunlukla dıştan strafor ile kaplanır.'), (async () => {
      await d.git(1000, { yalitim: 1 }, ease.inOut);
      await belir(c, d.yal, 300);
    })());
    await par(soz(c, 'Strafor 0,039; çimento harcı 1,6: strafor çok daha yavaş iletir.', 'Strafor sıfır virgül sıfır otuz dokuz; çimento harcı bir virgül altı: strafor çok daha yavaş iletir.'), (async () => {
      await belir(c, kKap, 250, 0);
      await belir(c, [kats, r1, r2], 400);
    })());
    // Çatı kesiti.
    const cati = c.S('g', {}, svg);
    cizgi(c, cati, [662, 300], [820, 150], RENK.cizgi, 6); cizgi(c, cati, [978, 300], [820, 150], RENK.cizgi, 6);
    cizgi(c, cati, [680, 314], [960, 314], RENK.cizgi, 6);
    cizgi(c, cati, [680, 314], [680, 384], RENK.ince, 4); cizgi(c, cati, [960, 314], [960, 384], RENK.ince, 4);
    c.S('rect', { x: 715, y: 295, width: 210, height: 16, fill: STRAFOR }, cati);
    cizgi(c, cati, [820, 420], [820, 320], RENK.soluk, 2);
    yazi(c, cati, 820, 452, 'cam yünü ya da strafor', { size: 24, kalin: 600 });
    gizle(cati);
    await par(c.say('Çatı ile tavanın arasına da strafor ya da cam yünü serilir.'), (async () => {
      await belir(c, kats, 300, 0);
      await belir(c, cati, 450);
    })());

    // Sor: yeni durum.
    c.clearSay();
    await belir(c, [d.f.el, d.L, cati], 350, 0);
    const sg = c.S('g', {}, svg);
    const ck = katsayiSatiri(c, sg, 90, 150, 340, 'cam yünü', '0,04', { h: 120, size: 34 }), cc = katsayiSatiri(c, sg, 570, 150, 340, 'cam', '0,8', { h: 120, size: 34 });
    const sok1 = isiOku(c, sg, [130, 370], [390, 370], { kalin: KALIN.ince }), sok2 = isiOku(c, sg, [610, 370], [870, 370], { kalin: KALIN.orta });
    gizle(sg);
    await belir(c, [sg, ck, cc], 400);
    await c.choice({
      tag: 'Sor', q: 'Ela çatı katına aynı kalınlıkta bir katman serecek: cam yünü ya da cam. Hangisi evi daha iyi yalıtır?',
      options: ['Cam; katsayısı daha büyüktür, ısıyı iyi tutar', 'Cam yünü; katsayısı çok daha küçüktür', 'İkisi aynı; ikisi de katmandır'], answer: 1,
      hints: ['Yalıtım için katsayısı küçük olan malzeme seçilir.', '', '0,04 ile 0,8’i karşılaştır.'],
      right: 'Evet. Katsayısı küçük olan malzeme ısıyı daha yavaş iletir.',
    });
    await par(c.say('Cam yünü ısıyı camdan çok daha yavaş iletir.'), belir(c, [sok1.g, sok2.g], 500));
    c.note('Kalın duvar ve katsayısı küçük kaplama ısıyı yavaşlatır.', 'Duvar');
  }

  /* ---- 5. Pencere: küçük alan, çift cam ---- */
  async function pencere(c) {
    const svg = c.svg(1000, 562);
    const d = duvar(c, svg, { kadraj: K.cam, ayar: { yalitim: 1, cam: 2, ic: 22, dis: 0 }, okMod: 'cam' });
    d.ok.kalinlik(KALIN.orta);
    const sure = sureCizgisi(c, svg);
    gizle(sure.g);
    // Tahta 1: büyük ve küçük pencere, cam sayısı.
    const p1 = c.S('g', {}, svg);
    duvarKesit(c, p1, 120, 90, 300, 210); duvarKesit(c, p1, 580, 90, 300, 210);
    pencereCiz(c, p1, 270, 195, 120); pencereCiz(c, p1, 730, 195, 60);
    yazi(c, p1, 270, 336, 'büyük', { size: 24, kalin: 600 }); yazi(c, p1, 730, 336, 'küçük', { size: 24, kalin: 600 });
    const okB = isiOku(c, p1, [96, 195], [446, 195], { kalin: KALIN.kalin }), okK = isiOku(c, p1, [556, 195], [906, 195], { kalin: KALIN.ince });
    const kat = c.S('g', {}, svg);
    [[250, 'tek cam', 1], [500, 'çift cam', 2], [750, 'üç cam', 3]].forEach(([x, ad, n]) => {
      c.S('rect', { x: x - 28, y: 380, width: 56, height: 70, rx: 4, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, kat);
      for (let i = 0; i < n; i++) cizgi(c, kat, [x - 14 + i * 14 + (3 - n) * 7, 388], [x - 14 + i * 14 + (3 - n) * 7, 442], CAMREN, 4);
      yazi(c, kat, x, 490, ad, { size: 24, kalin: 600 });
    });
    gizle(p1, kat);
    // Sağ sütun.
    const kDis = kart(c, svg, SOL, 40, SW, 56, [['dış · ', ['0 °C', RENK.sicaklik]]], { kalin: 700 });
    gizle(kDis);
    const kd = c.S('g', {}, svg);
    const r1 = katsayiSatiri(c, kd, SOL, 120, SW, 'hava', '0,023'), r2 = katsayiSatiri(c, kd, SOL, 188, SW, 'cam', '0,8');
    gizle(kd);
    const yk = kart(c, svg, SOL, 370, SW, 64, ['hava kısmen boşaltılır'], { kalin: 700 });
    const yk2 = kart(c, svg, SOL, 370, SW, 64, ['konveksiyon engellenir'], { kalin: 700 });
    const yk3 = kart(c, svg, SOL, 370, SW, 64, [[['aktarım hızı düşer', RENK.isi]]], { kalin: 700 });
    // "iki cam arasında hava" etiketi ve işaret çizgisi.
    const camEt = yazi(c, d.L, 0, 0, 'iki cam arasında hava', { size: 24, kalin: 600, hiza: 'start' }), camCiz = cizgi(c, d.L, [0, 0], [1, 1], RENK.soluk, 2);
    const camYer = () => {
      const q = d.f.nokta('cam'), x = FIG.x + d.f.w + 14;
      camEt.setAttribute('x', x + 6); camEt.setAttribute('y', q[1] + 8);
      camCiz.setAttribute('x1', q[0]); camCiz.setAttribute('y1', q[1]); camCiz.setAttribute('x2', x); camCiz.setAttribute('y2', q[1]);
    };
    d.ek.push(camYer); d.izle();
    gizle(camEt, camCiz);

    await par(c.say('Pencereler mümkün olduğunca küçük yapılır.'), belir(c, p1, 450));
    await par(c.say('Yüzey alanı küçüldükçe ısı iletim hızı azalır.'), belir(c, [okB.g, okK.g], 500));
    await par(c.say('Pencereler ayrıca iki ya da üç katlı camla yapılır.'), belir(c, kat, 450));
    await par(c.say('Ela’nın penceresi çift camlı; camların arasında kuru hava var.'), (async () => {
      await belir(c, [p1, kat], 400, 0);
      await d.goster(450, kDis, sure.g);
      await belir(c, [camEt, camCiz], 350);
    })());
    await par(soz(c, 'Aynı gecede tek camlı pencerede iç sıcaklık 17 °C’ye düştü.', 'Aynı gecede tek camlı pencerede iç sıcaklık on yedi dereceye düştü.'), (async () => {
      await belir(c, [camEt, camCiz], 150, 0);
      await d.camDegis(1);
      await belir(c, d.ok.g, 400);
      await par(d.git(2800, { ic: 17 }), sure.git(c, 1, 2800));
    })());
    await par(soz(c, 'Çift camlı pencerede iç sıcaklık yalnızca 19 °C’ye düştü.', 'Çift camlı pencerede iç sıcaklık yalnızca on dokuz dereceye düştü.'), (async () => {
      await par(d.git(500, { ic: 22 }, ease.inOut), sure.git(c, 0, 500, ease.inOut));
      await par(d.camDegis(2), belir(c, [camEt, camCiz], 350));
      await d.ok.git(c, KALIN.ince, 400);
      await par(d.git(2600, { ic: 19 }), sure.git(c, 1, 2600));
    })());
    await par(soz(c, 'Havanın katsayısı camınkinden küçüktür: hava 0,023; cam 0,8.', 'Havanın katsayısı camınkinden küçüktür: hava sıfır virgül sıfır yirmi üç; cam sıfır virgül sekiz.'), belir(c, [kd, r1, r2], 400));
    await par(c.say('Camların arasındaki havanın bir bölümü boşaltılır.'), (async () => {
      await belir(c, kd, 250, 0);
      await belir(c, yk, 400);
    })());
    await par(c.say('Böylece konveksiyonla ısı geçişi de engellenir.'), (async () => {
      await belir(c, yk, 250, 0);
      await belir(c, yk2, 400);
    })());
    await par(c.say('Sonuçta çift camda ısının aktarım hızı düşer.'), (async () => {
      await belir(c, yk2, 250, 0);
      await belir(c, yk3, 400);
    })());

    // Sor: yeni durum.
    c.clearSay();
    await belir(c, [d.f.el, d.L, sure.g, kDis, yk3], 350, 0);
    const sg = c.S('g', {}, svg);
    const KART = [[90, 'küçük, tek cam', 50, false, KALIN.orta], [390, 'büyük, çift cam', 80, true, KALIN.kalin], [690, 'küçük, çift cam', 50, true, KALIN.ince]];
    const oklar = KART.map(([x, ad, boy, cift, w]) => {
      kutu(c, sg, x, 140, 220, 200, { rx: 14 });
      pencereCiz(c, sg, x + 110, 220, boy * 1.2, cift);
      yazi(c, sg, x + 110, 318, ad, { size: 26, kalin: 600 });
      return isiOku(c, sg, [x - 10, 410], [x + 230, 410], { kalin: w });
    });
    gizle(sg);
    await belir(c, sg, 400);
    await c.choice({
      tag: 'Sor', q: 'Ela oturma odasına üç pencereden birini seçecek. Isı iletim hızı en küçük olan hangisidir?',
      options: ['Büyük, çift camlı', 'Küçük, çift camlı', 'Küçük, tek camlı'], answer: 1,
      hints: ['Yüzey alanı küçülünce ve cam sayısı artınca hız küçülür.', '', 'İki özelliğin ikisi de hızı azaltıyor mu?'],
      right: 'Evet. Hem alan küçük hem iki cam var.',
    });
    await par(c.say('Küçük ve çift camlı pencerede ısı iletim hızı en küçüktür.'), belir(c, oklar.map((o) => o.g), 500));
    c.note('Küçük pencere ve çift cam ısı iletim hızını azaltır.', 'Pencere');
  }

  /* ---- 6. Altı yapıda ne görüyorsun? ---- */
  const YAPI = {
    'ahşap ev': (c, g) => {
      c.S('rect', { x: -50, y: 38, width: 100, height: 52, fill: '#6b4a32' }, g);
      [48, 58, 68, 78].forEach((y) => cizgi(c, g, [-50, y], [50, y], '#4d3523', 1.5));
      c.S('rect', { x: 22, y: 8, width: 12, height: 28, fill: '#4d3523' }, g);
      c.S('path', { d: 'M-62,40 L0,6 L62,40 Z', fill: '#3b2a1e' }, g);
      [-34, 18].forEach((x) => c.S('rect', { x, y: 54, width: 16, height: 16, rx: 2, fill: '#cfd8e3' }, g));
    },
    'taş ev': (c, g) => {
      c.S('rect', { x: -50, y: 20, width: 100, height: 36, fill: '#8b5e3c' }, g);
      c.S('rect', { x: -50, y: 56, width: 100, height: 34, fill: '#8a93a6' }, g);
      [[-30, 62, 24], [0, 62, 22], [26, 62, 22], [-44, 76, 24], [-14, 76, 24], [18, 76, 26]].forEach(([x, y, w]) => c.S('rect', { x, y, width: w, height: 11, rx: 2, fill: 'none', stroke: '#5b6479', 'stroke-width': 1.5 }, g));
      c.S('rect', { x: -56, y: 13, width: 112, height: 8, fill: '#4a5268' }, g);
      [-30, 14].forEach((x) => c.S('rect', { x, y: 30, width: 16, height: 14, rx: 2, fill: '#cfd8e3' }, g));
    },
    'tuğla ev': (c, g) => {
      c.S('rect', { x: 14, y: 4, width: 10, height: 24, fill: '#8a5a3a' }, g);
      c.S('rect', { x: -26, y: 8, width: 10, height: 22, fill: '#8a5a3a' }, g);
      c.S('rect', { x: -50, y: 28, width: 100, height: 62, fill: '#b8774f' }, g);
      for (let y = 36; y < 90; y += 8) cizgi(c, g, [-50, y], [50, y], '#9a603c', 1.5);
      c.S('path', { d: 'M-58,30 L0,4 L58,30 Z', fill: '#6b7385' }, g);
      [[-34, 38], [18, 38], [-34, 64], [18, 64]].forEach(([x, y]) => c.S('rect', { x, y, width: 16, height: 14, rx: 2, fill: '#cfd8e3' }, g));
    },
    'kerpiç ev': (c, g) => {
      c.S('rect', { x: -40, y: 40, width: 80, height: 50, rx: 10, fill: '#d9c3a0' }, g);
      c.S('path', { d: 'M-50,44 L0,8 L50,44 Z', fill: '#a98a5c' }, g);
      c.S('rect', { x: -9, y: 60, width: 18, height: 30, rx: 8, fill: '#5b4630' }, g);
    },
    'keçe çadır': (c, g) => {
      c.S('path', { d: 'M-60,90 A60,70 0 0 1 60,90 Z', fill: '#efe6cf' }, g);
      cizgi(c, g, [0, 20], [-36, 90], '#cdbf9c', 2); cizgi(c, g, [0, 20], [36, 90], '#cdbf9c', 2);
      c.S('rect', { x: -11, y: 62, width: 22, height: 28, rx: 5, fill: '#3b3326' }, g);
    },
    'yeşil çatılı bina': (c, g) => {
      c.S('rect', { x: -45, y: 30, width: 90, height: 60, fill: '#7b849c' }, g);
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) c.S('rect', { x: -33 + k * 26, y: 38 + r * 18, width: 14, height: 10, rx: 2, fill: '#cfd8e3' }, g);
      c.S('rect', { x: -50, y: 18, width: 100, height: 12, fill: '#6b4a32' }, g);
      [-36, -12, 12, 36].forEach((x) => c.S('path', { d: `M${x - 7},18 L${x},4 L${x + 7},18 Z`, fill: '#c3cbea' }, g));
    },
  };
  const YAPI_SIRA = ['ahşap ev', 'taş ev', 'tuğla ev', 'kerpiç ev', 'keçe çadır', 'yeşil çatılı bina'];

  const KARTLAR6 = [
    { metin: 'Ahşap evin duvarı ahşaptır.', ad: 'ahşap duvar', kutu: 0, neden: 'Evet. Maddenin cinsi ısı iletim hızını etkiler.', ipucu: 'Duvar hangi maddeden yapılmış?' },
    { metin: 'Ahşap evin pencereleri küçüktür.', ad: 'küçük pencere', kutu: 1, neden: 'Evet. Pencere küçüldükçe ısı iletim hızı azalır.', ipucu: 'Küçülen şey pencerenin alanı.' },
    { metin: 'Keçe çadırın örtüsü keçedir.', ad: 'keçe örtü', kutu: 0, neden: 'Evet. Keçenin katsayısı küçüktür.', ipucu: 'Örtü hangi maddeden?' },
    { metin: 'Çatının üstüne toprak katmanı serilmiştir.', ad: 'toprak katmanı', kutu: 2, neden: 'Evet. Isının geçeceği yol uzar.', ipucu: 'Katman ısının yolunu uzatıyor.' },
    { metin: 'Taş evin duvarı taştır.', ad: 'taş duvar', kutu: 0, neden: 'Evet. Duvarın maddesi ısı iletim hızını etkiler.', ipucu: 'Duvar hangi maddeden?' },
  ];
  async function alti(c) {
    const svg = c.svg(1000, 562);
    const ana = c.S('g', {}, svg);
    const kartlar = YAPI_SIRA.map((ad, i) => {
      const x = 50 + (i % 3) * 310, y = 90 + Math.floor(i / 3) * 200, k = yapiKarti(c, ana, x, y, 280, 170, ad);
      k.cizim.setAttribute('transform', `translate(${x + 140},${y + 14})`);
      YAPI[ad](c, k.cizim);
      k.g.style.opacity = 0.3;
      return k;
    });
    const katKec = yazi(c, ana, 0, 0, '0,037', { size: 24, kalin: 700 });
    katKec.setAttribute('x', 50 + 310 + 238); katKec.setAttribute('y', 290 + 72);   // keçe çadır kartının sağ kenarına yakın
    gizle(katKec);

    await par(soz(c, 'Ela altı farklı yapıya bakıyor.', '[curious] Ela altı farklı yapıya bakıyor.'), Promise.all(kartlar.map(async (k, i) => { await c.wait(150 * i); await belir(c, k.g, 300, 1); })));
    await c.say('Her yapının ısı iletimini önce malzemesinin cinsi belirler.');
    kartlar[4].vurgu(true);
    await par(soz(c, 'Keçe çadırın örtüsü keçedir; keçenin katsayısı 0,037’dir.', 'Keçe çadırın örtüsü keçedir; keçenin katsayısı sıfır virgül sıfır otuz yedidir.'), belir(c, katKec, 350));
    kartlar[4].vurgu(false); kartlar[5].vurgu(true);
    await par(c.say('Çatıdaki toprak katmanı, ısının geçeceği yola eklenen bir kalınlıktır.'), belir(c, katKec, 250, 0));
    kartlar[5].vurgu(false);
    await c.say('Yapılarda yalıtımı etkileyen görünür özellikler aranabilir.');

    c.clearSay();
    await belir(c, ana, 350, 0);
    const ust = await siniflaTahta(c, svg, {
      kutular: [{ x: 70, w: 260, ad: 'madde' }, { x: 370, w: 260, ad: 'yüzey alanı' }, { x: 670, w: 260, ad: 'kalınlık' }],
      kartlar: KARTLAR6, soru: 'Bu özellik hangi etmenle ilgili?',
    });
    await belir(c, ust, 350, 0);
    await belir(c, ana, 450, 1);
    await soz(c, 'Hiçbir yapıyı tek başına en iyi ilan edemeyiz.', '[thoughtful] Hiçbir yapıyı tek başına en iyi ilan edemeyiz.');
    const son = yazi(c, svg, 500, 522, 'bölgeye ve ihtiyaca göre birlikte karar', { size: 26, kalin: 700 });
    gizle(son);
    await par(c.say('Karar, bölgeye ve ihtiyaca göre etmenlerin birlikte değerlendirilmesidir.'), belir(c, son, 400));
    c.note('Yapının yalıtımı malzemesine, alanına ve kalınlığına bağlıdır.', 'Yapılar');
  }

  /* ---- 7. Mimar sensin ---- */
  function evKesit(c, p) {
    const g = c.S('g', {}, p);
    cizgi(c, g, [240, 365], [760, 365], RENK.ince, 4);
    const strL = c.S('rect', { x: 260, y: 215, width: 20, height: 150, fill: STRAFOR }, g);
    const wl = c.S('rect', { x: 280, y: 215, width: 30, height: 150, fill: DUV, stroke: RENK.cizgi, 'stroke-width': 2 }, g);
    const mk = (a) => c.S('rect', Object.assign({ fill: DUV, stroke: RENK.cizgi, 'stroke-width': 2 }, a), g);
    const wU = mk({}), wA = mk({});
    const sU = c.S('rect', { fill: STRAFOR }, g), sA = c.S('rect', { fill: STRAFOR }, g);
    const kat = c.S('rect', { x: 330, y: 191, width: 340, height: 16, fill: STRAFOR }, g);
    c.S('rect', { x: 280, y: 207, width: 440, height: 8, fill: RENK.cizgi }, g);
    c.S('path', { d: 'M270,215 L500,125 L730,215', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
    const cA = cizgi(c, g, [0, 0], [1, 1], CAMREN, 4), cB = cizgi(c, g, [0, 0], [1, 1], CAMREN, 4);
    const S = { t: 30, straf: 0, pen: 120, cift: 0, cati: 0 };
    const ciz = () => {
      const ac = 290 - S.pen / 2, al = 290 + S.pen / 2, xm = 720 - S.t / 2;
      wl.setAttribute('width', S.t);
      [wU, sU].forEach((e, i) => { e.setAttribute('x', i === 0 ? 720 - S.t : 720); e.setAttribute('y', 215); e.setAttribute('width', i === 0 ? S.t : 20); e.setAttribute('height', ac - 215); });
      [wA, sA].forEach((e, i) => { e.setAttribute('x', i === 0 ? 720 - S.t : 720); e.setAttribute('y', al); e.setAttribute('width', i === 0 ? S.t : 20); e.setAttribute('height', 365 - al); });
      [[cA, xm - 10 * S.cift], [cB, xm + 10 * S.cift]].forEach(([e, x]) => { e.setAttribute('x1', x); e.setAttribute('x2', x); e.setAttribute('y1', ac); e.setAttribute('y2', al); });
      [strL, sU, sA].forEach((e) => { e.style.opacity = S.straf; });
      kat.style.opacity = S.cati;
    };
    ciz();
    return { g, S, ciz };
  }
  async function mimar(c) {
    const svg = c.svg(1000, 562);
    const baslik = yazi(c, svg, 500, 52, 'yazı sıcak bölge · düşük fatura', { size: 30, kalin: 700 });
    const buyuk = c.S('g', { transform: 'translate(500,305) scale(1.4) translate(-500,-245)' }, svg);
    const ev = evKesit(c, buyuk);
    const okD = isiOku(c, buyuk, [800, 240], [610, 240], { kalin: KALIN.ince }), okC = isiOku(c, buyuk, [430, 92], [430, 188], { kalin: KALIN.ince });
    gizle(baslik, ev.g);
    const anim = (ms, fn, e = ease.inOut) => c.tween(ms, (k) => { fn(k); ev.ciz(); }, e);

    await par(soz(c, 'Ela mimar oldu; yazı çok sıcak geçen bir bölgede ev tasarlıyor.', '[curious] Ela mimar oldu; yazı çok sıcak geçen bir bölgede ev tasarlıyor.'), belir(c, [baslik, ev.g], 450));
    await c.say('Ev ailenin bütçesine yük olmamalı; serinletme masrafı az olmalı.');
    await c.say('Kararlarını ısı iletim hızının etmenlerine dayandıracak.');

    c.clearSay();
    await c.choice({
      tag: 'Sor', q: 'Duvar nasıl olsun?',
      options: ['Kalın; sıcaklık farkını büyütür', 'İnce; ısı daha çabuk dışarı çıkar', 'Kalın; ısı daha uzun yoldan geçer, hız azalır'], answer: 2,
      hints: ['Duvarın kalınlığı iç ile dış arasındaki sıcaklık farkını değiştirmez.', 'Kalınlık arttıkça ısı iletim hızı azalır.', ''],
      right: 'Evet. Kalın duvarda ısının geçeceği yol uzar.',
    });
    await par(c.say('Kalın duvarda ısının geçeceği yol uzar.'), anim(800, (k) => { ev.S.t = lerp(30, 80, k); }));
    c.clearSay();
    await c.choice({
      tag: 'Sor', q: 'Dış yüzey nasıl kaplansın?',
      options: ['Strafor; katsayısı çok küçüktür', 'Demir levha; katsayısı çok büyüktür', 'Kaplanmasın; duvar zaten yeter'], answer: 0,
      hints: ['', 'Demirin katsayısı 80’dir; strafor 0,039.', 'Yalıtım için katsayısı küçük olan malzeme seçilir.'],
      right: 'Evet. Strafor ısıyı çok yavaş iletir.',
    });
    await par(c.say('Strafor kaplama ısı geçişini yavaşlatır.'), anim(800, (k) => { ev.S.straf = k; }, ease.out));
    c.clearSay();
    await c.choice({
      tag: 'Sor', q: 'Pencere nasıl olsun?',
      options: ['Büyük ve tek camlı; daha çok ışık alır', 'Küçük ve çift camlı; alan küçük, iki cam arasında hava var', 'Büyük ve çift camlı; alan büyüse de cam yeter'], answer: 1,
      hints: ['Hem alanı küçültmek hem cam sayısını artırmak hızı azaltır.', '', 'Yüzey alanı büyüdükçe ısı iletim hızı artar.'],
      right: 'Evet. Küçük alan ve iki cam hızı azaltır.',
    });
    await par(c.say('Küçük, çift camlı pencere hızı azaltır.'), anim(800, (k) => { ev.S.pen = lerp(120, 60, k); ev.S.cift = k; }));
    c.clearSay();
    await c.choice({
      tag: 'Sor', q: 'Çatı ile tavan arasına ne serilsin?',
      options: ['Çimento harcı', 'Demir levha', 'Cam yünü ya da strafor'], answer: 2,
      hints: ['Hangisinin katsayısı küçük?', 'Çimento harcı 1,6; demir 80.', ''],
      right: 'Evet. Katsayısı küçük malzeme çatıdan geçen ısıyı yavaşlatır.',
    });
    await par(c.say('Çatı katındaki katman ısıyı yavaşlatır.'), anim(800, (k) => { ev.S.cati = k; }, ease.out));
    await par(c.say('Bu evde yazın ısı dışarıdan içeriye çok yavaş geçer.'), belir(c, [okD.g, okC.g], 500));
    await c.say('Ev daha az ısınır; serinletmek için daha az enerji gerekir.');
    await c.say('Daha az enerji, daha düşük fatura demektir.');
    c.note('Kalın duvar, yalıtım katmanı, küçük çift camlı pencere.', 'Mimar');
  }

  /* ---- 8. Yalıtım ve tasarruf ---- */
  async function tasarruf(c) {
    const svg = c.svg(1000, 562);
    const CY = 295, NOK = [[210, 140], [500, 440], [790, 140]];
    const cizg = NOK.map(([x, y]) => cizgi(c, svg, [500, CY], [x, y], RENK.ince, 3));
    const daire = c.S('g', {}, svg);
    c.S('circle', { cx: 500, cy: CY, r: 72, fill: RENK.isi }, daire);
    yazi(c, daire, 500, CY - 4, 'daha az', { size: 26, kalin: 700, renk: RENK.koyu });
    yazi(c, daire, 500, CY + 26, 'enerji', { size: 26, kalin: 700, renk: RENK.koyu });
    const ust = yazi(c, svg, 500, 192, 'ısınmak ve serinlemek için', { size: 24, kalin: 600 });
    const karti = [['aile bütçesi', 0], ['kaynaklar', 1], ['ülke ekonomisi', 2]].map(([ad, i]) => {
      const [x, y] = NOK[i], g = c.S('g', {}, svg);
      kutu(c, g, x - 120, y - 40, 240, 80, { rx: 14 });
      yazi(c, g, x, y + 9, ad, { size: 28, kalin: 700 });
      return g;
    });
    const surd = yazi(c, svg, 500, 512, 'sürdürülebilirlik', { size: 26, kalin: 700, renk: RENK.soluk });
    gizle(cizg, daire, ust, karti, surd);

    await par(c.say('Yalıtım malzemesi kullanmak enerji tasarrufu sağlar.'), belir(c, daire, 450));
    await par(c.say('Yalıtılmış ev, ısınmak ve serinlemek için daha az enerji ister.'), belir(c, ust, 400));
    await par(c.say('Daha az enerji, ailenin bütçesinde daha az harcama demektir.'), belir(c, [cizg[0], karti[0]], 400));
    await par(c.say('Ülke düzeyinde bu, enerji kaynaklarının verimli kullanılması demektir.'), belir(c, [cizg[1], cizg[2], karti[1], karti[2]], 400));
    await par(c.say('Kaynakları verimli kullanmak, sürdürülebilirliğe de katkı sağlar.'), belir(c, surd, 400));

    c.clearSay();
    await c.choice({
      tag: 'Sor', q: 'Bir mahallede çoğu ev yalıtılıyor. Ülke düzeyinde ne beklenir?',
      options: ['Daha çok enerji harcanır; yalıtım enerji üretir', 'Daha az enerji harcanır; kaynaklar daha verimli kullanılır', 'Hiçbir şey değişmez; enerji tasarrufu yalnızca aileyi ilgilendirir'], answer: 1,
      hints: ['Yalıtım ısı kaybını azaltır; ısıtmak için gereken enerjiye ne olur?', '', 'Aile bütçesine katkı veren tasarruf ülke ekonomisine de katkı verir.'],
      right: 'Evet. Daha az enerji harcanır; kaynaklar korunur.',
    });
    await c.say('Birçok evde tasarruf, ülkenin kaynaklarını da korur.');
    c.note('Yalıtım enerji tasarrufu sağlar; aileye ve ülkeye katkıdır.', 'Tasarruf');
  }

  /* ---- 9. Termos ve iletimin istendiği yerler ---- */
  const KARTLAR9 = [
    { metin: 'Kalorifer peteği', ad: 'kalorifer peteği', kutu: 0, neden: 'Evet. Sıcak su ısıyı odaya hızlı iletmeli; katsayısı büyük malzeme seçilir.', ipucu: 'Petek ısıyı odaya mümkün olduğunca çabuk iletmeli.' },
    { metin: 'Tencere sapı', ad: 'tencere sapı', kutu: 1, neden: 'Evet. Sap yalıtkan olduğu için elin yanmaz.', ipucu: 'Sapı tutan el ısınmamalı.' },
    { metin: 'Tencere tabanı', ad: 'tencere tabanı', kutu: 0, neden: 'Evet. Ocaktaki ısı yemeğe hızlı geçmeli.', ipucu: 'Isı ocaktan yemeğe ulaşmalı.' },
    { metin: 'Binanın dış duvar kaplaması', ad: 'duvar kaplaması', kutu: 1, neden: 'Evet. Yalıtım için katsayısı küçük malzeme seçilir.', ipucu: 'Yalıtım ısıyı yavaşlatır.' },
    { metin: 'Çaydanlık gövdesi', ad: 'çaydanlık gövdesi', kutu: 0, neden: 'Evet. Gövde ısıyı suya hızlı iletmeli.', ipucu: 'Gövde ısıyı suya aktarır.' },
    { metin: 'Otomobil motorunun üstündeki kapak', ad: 'motor kapağı', kutu: 1, neden: 'Evet. Motorun ısısı yolcuları doğrudan etkilememeli.', ipucu: 'Motorun ısısı yolcuya geçmemeli.' },
  ];
  async function termos(c) {
    const svg = c.svg(1000, 562);
    const CAY = '#8c4a2f';
    const sol = c.S('g', {}, svg);
    // Bardak (açık ağızlı) ve termos (kapalı silüet).
    c.S('path', { d: 'M150,200 L240,200 L232,310 L158,310 Z', fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, sol);
    c.S('path', { d: 'M153.5,222 L236.5,222 L232,310 L158,310 Z', fill: CAY, 'fill-opacity': 0.55 }, sol);
    c.S('rect', { x: 340, y: 130, width: 90, height: 190, rx: 14, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3 }, sol);
    c.S('rect', { x: 340, y: 100, width: 90, height: 34, rx: 10, fill: DUV, stroke: RENK.cizgi, 'stroke-width': 3 }, sol);
    yazi(c, sol, 195, 252, 'çay', { size: 24, kalin: 600 }); yazi(c, sol, 385, 232, 'çay', { size: 24, kalin: 600 });
    const bT = yazi(c, sol, 195, 290, '70 °C', { size: 24, kalin: 700, renk: RENK.sicaklik }), tT = yazi(c, sol, 385, 270, '70 °C', { size: 24, kalin: 700, renk: RENK.sicaklik });
    yazi(c, sol, 195, 350, 'bardak', { size: 24, kalin: 600 }); yazi(c, sol, 385, 360, 'termos', { size: 24, kalin: 600 });
    const bOk = isiOku(c, sol, [150, 255], [58, 255], { kalin: KALIN.kalin }), tOk = isiOku(c, sol, [430, 215], [520, 215], { kalin: KALIN.ince });
    gizle(sol);
    // Sağ sütun: ısının hızlı iletilmesi istenen yerler.
    const sag = c.S('g', {}, svg);
    const pet = c.S('g', { transform: 'translate(640,110)' }, sag);
    [0, 1, 2, 3, 4].forEach((i) => c.S('rect', { x: i * 20 - 50, y: 6, width: 14, height: 70, rx: 7, fill: '#9aa4bd' }, pet));
    cizgi(c, pet, [-56, 18], [48, 18], '#9aa4bd', 5); cizgi(c, pet, [-56, 64], [48, 64], '#9aa4bd', 5);
    const ten = c.S('g', { transform: 'translate(640,255)' }, sag);
    c.S('rect', { x: -38, y: 14, width: 76, height: 56, rx: 6, fill: '#9aa4bd' }, ten);
    c.S('rect', { x: 38, y: 24, width: 34, height: 10, rx: 5, fill: '#5b4630' }, ten);
    cizgi(c, ten, [-44, 14], [44, 14], '#cfd8e3', 5);
    const cay = c.S('g', { transform: 'translate(640,385)' }, sag);
    c.S('path', { d: 'M-38,70 Q-44,26 -14,16 L14,16 Q44,26 38,70 Z', fill: '#9aa4bd' }, cay);
    c.S('path', { d: 'M38,40 Q70,28 64,60', fill: 'none', stroke: '#5b4630', 'stroke-width': 8, 'stroke-linecap': 'round' }, cay);
    c.S('path', { d: 'M-38,44 L-62,24 L-52,18 L-34,34 Z', fill: '#9aa4bd' }, cay);
    cizgi(c, cay, [-16, 12], [16, 12], '#cfd8e3', 6);
    yazi(c, sag, 760, 172, 'kalorifer peteği', { size: 24, kalin: 600, hiza: 'start' });
    yazi(c, sag, 760, 322, 'tencere', { size: 24, kalin: 600, hiza: 'start' });
    yazi(c, sag, 760, 452, 'çaydanlık', { size: 24, kalin: 600, hiza: 'start' });
    gizle(sag);

    await par(soz(c, 'Ela’nın bardağında ve termosunda 70 °C’lik çay var.', 'Ela’nın bardağında ve termosunda yetmiş derecelik çay var.'), belir(c, sol, 450));
    await c.say('Termos da ısıyı yavaşlatmak için üretilmiş bir üründür.');
    await c.say('Çift cidar arasındaki boşluk ısıyı yavaşlatır.');
    await par(soz(c, 'Birkaç saat sonra bardaktaki çay 40 °C’ye düşüyor.', 'Birkaç saat sonra bardaktaki çay kırk dereceye düşüyor.'), par(
      belir(c, bOk.g, 500),
      c.tween(3000, (e) => { bT.textContent = Math.round(lerp(70, 40, e)) + ' °C'; tT.textContent = Math.round(lerp(70, 62, e)) + ' °C'; }, ease.linear)));
    await par(soz(c, 'Termostaki çay ise yalnızca 62 °C’ye düşüyor.', 'Termostaki çay ise yalnızca altmış iki dereceye düşüyor.'), belir(c, tOk.g, 500));
    await c.say('Termos, çayın ısıyı dışarıya vermesini yavaşlatır.');
    await par(c.say('Bazen de ısının hızlı iletilmesi istenir.'), belir(c, sag, 450));
    await c.say('Kalorifer petekleri, katsayısı büyük malzemelerden yapılır.');
    await c.say('Çaydanlık ve tencerenin tabanı ile gövdesi metaldendir.');
    await c.say('Sapları ise ısıyı yavaş iletmek için yalıtkan malzemeden yapılır.');

    c.clearSay();
    await belir(c, [sol, sag], 350, 0);
    const ust = await siniflaTahta(c, svg, {
      kutular: [{ x: 90, w: 390, ad: 'Isıyı hızlı iletmeli' }, { x: 520, w: 390, ad: 'Isıyı yavaş iletmeli' }],
      kartlar: KARTLAR9, soru: 'Bu parça ısıyı nasıl iletmeli?', adim: 62, liste: 28,
    });
    const hz = isiOku(c, svg, [130, 430], [440, 430], { kalin: KALIN.kalin }), yv = isiOku(c, svg, [560, 430], [870, 430], { kalin: KALIN.ince });
    await par(c.say('Malzeme, ısının hızlı mı yavaş mı iletileceğine göre seçilir.'), belir(c, [hz.g, yv.g], 500));
    await c.say('Yalıtım ısıyı durdurmaz, yavaşlatır.');
    c.note('Yalıtım ısıyı durdurmaz, yavaşlatır.', 'Seçim');
  }

  Ders.start({
    id: 'enerji-f2', kicker: 'Konu F · Isı iletim hızı ve yalıtım', title: 'Yalıtım: ısıyı yavaşlatmak', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Yalıtım: ısıyı yavaşlatmak',
      hook: 'Mimar olsaydın, yazı çok sıcak geçen bir şehirde faturası düşük gelen bir evi nasıl tasarlardın?',
      button: 'Derse başla ›',
    },
    goals: ['Yalıtımın ısıyı durdurmadığını, yavaşlattığını söyler.', 'Yalıtımın kışın da yazın da işe yaradığını açıklar.', 'Duvar kalınlığı, kaplama, pencere alanı ve cam sayısının ısı iletim hızına etkisini yorumlar.', 'Yalıtımın enerji ve para tasarrufu sağladığını açıklar.', 'Isının hızlı ya da yavaş iletilmesi istenen yerleri ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'Katsayı ile ısı geçişinin yönünü hatırla.', run: hatirla },
      { title: 'Kışın aynı duvar', goal: 'Yalıtımın ısı kaybını yavaşlattığını gör.', run: kis },
      { title: 'Yazın aynı duvar', goal: 'Yalıtımın yazın da ısıyı yavaşlattığını gör.', run: yaz },
      { title: 'Duvarda iki yol: kalınlık ve katman', goal: 'Kalın duvarın ve kaplamanın etkisini gör.', run: duvarYol },
      { title: 'Pencere: küçük alan, çift cam', goal: 'Pencere alanı ve cam sayısının etkisini gör.', run: pencere },
      { title: 'Altı yapıda ne görüyorsun?', goal: 'Yapılardaki özellikleri etmenlere ayır.', run: alti },
      { title: 'Mimar sensin', goal: 'Bir ev için yalıtım kararlarını gerekçelendir.', run: mimar },
      { title: 'Yalıtım ve tasarruf', goal: 'Yalıtımın aileye ve ülkeye katkısını gör.', run: tasarruf },
      { title: 'Termos ve iletimin istendiği yerler', goal: 'Isının hızlı ve yavaş iletilmesi istenen yerleri ayır.', run: termos },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Yalıtımlı bir evin duvarı için hangisi doğrudur?',
        options: ['Isı geçişi tamamen durur', 'Isı geçişi yavaşlar; kışın da yazın da işe yarar', 'Yalnızca kışın işe yarar'], answer: 1,
        why: ['Yalıtım ısıyı durdurmaz; yalnızca yavaşlatır.', 'Yalıtım ısı geçişini kışın içeriden dışarıya, yazın dışarıdan içeriye yavaşlatır.', 'Yazın da ısının dışarıdan içeriye geçişini yavaşlatır.'], scene: 1 },
      { q: 'Mimar dış duvar için üç kaplama düşünüyor: strafor (0,039), çimento harcı (1,6), demir (80). Aynı kalınlıkta hangisi ısıyı en yavaş iletir?',
        options: ['Çimento harcı', 'Demir', 'Strafor'], answer: 2,
        why: ['Katsayısı strafordan çok büyüktür; ısıyı daha hızlı iletir.', 'Katsayısı üçünün en büyüğüdür; ısıyı en hızlı iletir.', 'Katsayısı en küçüktür; ısıyı en yavaş iletir.'], scene: 3 },
      { q: 'Bir odanın penceresi büyük ve tek camlı. Hangi değişiklik ısı iletim hızını azaltır?',
        options: ['Pencereyi küçültüp çift camlı yapmak', 'Pencereyi büyütüp tek camlı bırakmak', 'Camı demir levhayla değiştirmek'], answer: 0,
        why: ['Alan küçülür, cam sayısı artar; iki değişiklik de hızı azaltır.', 'Alan büyüdükçe ısı iletim hızı artar.', 'Demirin katsayısı çok büyüktür; ısı daha hızlı geçer.'], scene: 4 },
      { q: 'Termosta sıcak çay saatlerce sıcak kalıyor. Bunun nedeni hangisidir?',
        options: ['Termos çaya sürekli ısı verir', 'Isı dışarıya çok yavaş geçer', 'Termos ısıyı tamamen durdurur'], answer: 1,
        why: ['Termos ısı üretmez; yalnızca ısının çıkışını yavaşlatır.', 'Çift cidar arasındaki boşluk ısıyı yavaşlatır.', 'Isı yine geçer; yalnızca yavaş geçer.'], scene: 8 },
      { q: 'Ela’nın ailesi evlerini yalıttırıyor. Hangisi beklenir?',
        options: ['Ev kendiliğinden ısınır', 'Isı evden hiç dışarı çıkmaz', 'Isıtma ve serinletme için daha az enerji harcanır'], answer: 2,
        why: ['Yalıtım ısı üretmez; evi kendiliğinden ısıtmaz.', 'Yalıtım ısıyı durdurmaz; yalnızca yavaşlatır.', 'Isı geçişi yavaşlayınca ev daha geç soğur ve ısınır; enerji tasarrufu sağlanır.'], scene: 7 },
    ],
    summary: ['Yalıtım, ısıyı yavaş ileten malzemeyle ısı geçişini azaltmaktır; kışın da yazın da çalışır.', 'Kalın duvar, katsayısı küçük kaplama, küçük pencere ve çift cam ısı iletim hızını azaltır; enerji ve para tasarrufu sağlar.', '<b>Yalıtım ısıyı durdurmaz, yavaşlatır.</b>'],
    nextLesson: { href: 'f3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
