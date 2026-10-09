/* C10 — Konu tekrarı: Vektörler
   Yeni bilgi yok. Tek sahnede konunun dokuz kuralı toplanır; ardından on karışık soru gelir (plan/KURALLAR.md 3.4).
   Yürütme planı 2b: anlatımı değişmeyen temaya eklenen tekrar dersi; seslendirilmedi.
   Renk: birinci vektör RENK.a, ikinci vektör RENK.b, bileşke RENK.r. Vektör adı üstü oklu harfle, büyüklük oksuz yazılır. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, belir, ok, izgara, kart: duzKart } = window.KIT;
  const renk = '#6ea8ff';

  /* ---- Derse özel yardımcılar (C8 ile aynı ölçüler) ---- */
  /* Vektör adının üstündeki küçük ok: t yazısının i. harfinin üstüne çizilir. */
  function ustOk(c, g, t, i, size, rk) {
    const n = t.textContent.length;
    let a = null, b = null;
    try { a = t.getStartPositionOfChar(i).x; b = t.getEndPositionOfChar(i).x; } catch (e) { a = null; }
    if (a == null || !(b > a)) {
      const w = size * 0.6, x = +t.getAttribute('x'), hiza = t.getAttribute('text-anchor');
      a = (hiza === 'middle' ? x - n * w / 2 : hiza === 'end' ? x - n * w : x) + i * w; b = a + w;
    }
    const y = +t.getAttribute('y') - size * 0.9, m = (a + b) / 2, w = Math.max((b - a) / 2 + 1, size * 0.3), u = size * 0.15;
    return c.S('path', { d: `M ${m - w} ${y} L ${m + w} ${y} M ${m + w - u} ${y - u} L ${m + w} ${y} L ${m + w - u} ${y + u}`, fill: 'none', stroke: rk, 'stroke-width': Math.max(2, size * 0.08), 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  }
  /* Tahta yazısı: '~A_{x}' alt indis yazar; '~' işaretinden sonraki harfin üstüne vektör oku konur. */
  const myazi = (c, p, x, y, m, o = {}) => {
    const size = o.size || 30, rk = o.renk || RENK.yazi, idx = [];
    let duz = '', n = 0;
    for (const ch of m) { if (ch === '~') idx.push(n); else { duz += ch; if (!'_{}'.includes(ch)) n++; } }
    const g = idx.length ? c.S('g', {}, p) : p;
    const t = c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': size, 'font-weight': o.kalin || 600, style: 'fill:' + rk, math: duz }, g);
    if (!idx.length) return t;
    idx.forEach((i) => ustOk(c, g, t, i, size, rk));
    g.yazi = t; return g;
  };

  /* ---- 1. Konunun kuralları: her kural tahtada tek başına durur, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const yeni = (p = svg) => { const g = c.S('g', {}, p); g.style.opacity = 0; return g; };
    const sil = (el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
    const goster = (el, metin, o) => Promise.all([c.say(metin, o), belir(c, el, 400)]);
    const baslik = (g, m) => yazi(c, g, 500, 80, m, { size: 38, kalin: 700, renk });
    const satir = (g, y, m, o = {}) => myazi(c, g, o.x || 500, y, m, { size: 32, ...o });
    /* Başlıklı kart: çerçeve, renkli başlık ve ortalı satırlar. */
    const kart = (g, x, y, w, h, bsl, satirlar, o = {}) => {
      kutu(c, g, x, y, w, h, { renk: o.renk });
      yazi(c, g, x + w / 2, y + 52, bsl, { size: 32, kalin: 700, renk: o.renk });
      satirlar.forEach((m, i) => yazi(c, g, x + w / 2, y + 118 + i * 52, m, { size: 34 }));
    };
    /* Kareli düzlemde ok ve (isteğe bağlı) üstü oklu adı; lx, ly adın okun ortasına göre kayması. */
    const vek = (iz, p, i, j, di, dj, ad, rk, o = {}) => {
      const v = iz.vektor(i, j, di, dj, { renk: rk, katman: p, kesik: o.kesik, kalin: o.kalin });
      if (ad) {
        const [a, b] = iz.P(i, j), [d, e] = iz.P(i + di, j + dj);
        myazi(c, p, (a + d) / 2 + (o.lx || 0), (b + e) / 2 + (o.ly || 0), ad, { size: 30, renk: rk, hiza: o.hiza });
      }
      return v;
    };

    // C1 · Vektör
    const g1 = yeni(); baslik(g1, 'Vektör: yönlü ok');
    const z1 = izgara(c, g1, { kare: 60, sutun: 8, satir: 3, x: 260, y: 140 });
    const a1 = yeni(g1); vek(z1, a1, 2, 1, 4, 0, '~B', RENK.a, { ly: -24 });
    const b1 = yeni(g1); satir(b1, 405, 'Ucu yönü gösterir: doğu'); satir(b1, 460, 'Boyu büyüklüğü: 4 birim');
    await goster([g1, a1], 'Vektör, ok olarak çizilen yönlü bir doğru parçasıdır.');
    await goster(b1, 'Okun ucu yönü, boyu büyüklüğü söyler.');
    await c.say('Okun düzlemde nerede çizildiği yönünü de büyüklüğünü de değiştirmez.');
    c.note('<b>Vektör yönlü doğru parçasıdır: ucu yönü, boyu büyüklüğü gösterir.</b><br>F = 30 N bir kuvvetin büyüklüğüdür.', 'Vektör', 'kuvvet-vektor');
    await sil(g1);

    // C2 · Eşit ve zıt
    const g2 = yeni(); baslik(g2, 'Eşit ve zıt vektör');
    const z2 = izgara(c, g2, { kare: 60, sutun: 8, satir: 4, x: 260, y: 120 });
    const a2 = yeni(g2); vek(z2, a2, 4, 3, -2, 0, '~A', RENK.a, { ly: -24 }); vek(z2, a2, 7, 2, -2, 0, '~C', RENK.a, { ly: -24 });
    satir(a2, 425, '~A = ~C: aynı yön, aynı boy');
    const b2 = yeni(g2); vek(z2, b2, 2, 1, 2, 0, '~D', RENK.b, { ly: -24 });
    satir(b2, 480, '~A ve ~D zıt: ters yön, aynı boy');
    await goster([g2, a2], 'Yönü ve büyüklüğü aynı olan vektörlere eşit vektör denir.');
    await goster(b2, 'Büyüklüğü aynı, yönü ters olan vektöre zıt vektör denir.');
    await c.say('Boyları farklıysa iki vektör ne eşittir ne zıttır.');
    c.note('<b>yön aynı, boy aynı → eşit · yön ters, boy aynı → zıt</b><br>boy farklı → ne eşit ne zıt', 'Eşit mi, zıt mı?', 'kuvvet-esit-zit');
    await sil(g2);

    // C3 · Sayıyla çarpma
    const g3 = yeni(); baslik(g3, 'Sayıyla çarpma');
    const z3 = izgara(c, g3, { kare: 60, sutun: 8, satir: 4, x: 260, y: 130 });
    const a3 = yeni(g3); vek(z3, a3, 1, 3, 2, 0, '~K', RENK.a, { ly: -24 }); vek(z3, a3, 1, 1.5, 4, 0, '2~K', RENK.a, { ly: -24 });
    satir(a3, 430, 'Pozitif sayı yönü korur, boyu ayarlar');
    const b3 = yeni(g3); vek(z3, b3, 4, 0, -2, 0, '−~K', RENK.b, { ly: -24 });
    satir(b3, 485, 'Eksi işareti yönü ters çevirir');
    await goster([g3, a3], 'Pozitif sayıyla çarpınca yön değişmez; ok uzar ya da kısalır.');
    await goster(b3, 'Negatif sayı yönü ters çevirir; boyu sayının büyüklüğü ayarlar.');
    await c.say('Sayıyla çarpınca doğrultu değişmez.');
    c.note('<b>Sayıyla çarpınca doğrultu değişmez; işaret yönü, sayının büyüklüğü boyu belirler.</b><br>−0,5 → yön ters, boy yarı', 'Çarpanın etkisi', 'kuvvet-carpma');
    await sil(g3);

    // C4 · Aynı doğrultuda bileşke
    const g4 = yeni(); baslik(g4, 'Aynı doğrultuda bileşke');
    const k4a = yeni(g4); kart(k4a, 60, 170, 420, 230, 'Aynı yön', ['60 N + 40 N', '100 N, doğu'], { renk: RENK.a });
    const k4b = yeni(g4); kart(k4b, 520, 170, 420, 230, 'Zıt yön', ['60 N − 40 N', '20 N, doğu'], { renk: RENK.b });
    await goster([g4, k4a], 'Yönler aynıysa büyüklükler toplanır; bileşke aynı yöne bakar.');
    await goster(k4b, 'Yönler zıtsa büyüklükler çıkarılır; bileşke büyüğün yönündedir.');
    await c.say('Eşit büyüklükte zıt yönlü iki kuvvet birbirinin etkisini götürür.');
    c.note('<b>Aynı yön toplar, zıt yön çıkarır; bileşke büyük olanın yönündedir.</b><br>60 N + 40 N = 100 N, doğu · 60 N − 40 N = 20 N, doğu', 'Aynı doğrultuda bileşke', 'kuvvet-ayni-dogrultu');
    await sil(g4);

    // C5 · Uç uca ekleme
    const g5 = yeni(); baslik(g5, 'Uç uca ekleme');
    const z5 = izgara(c, g5, { kare: 60, sutun: 6, satir: 4, x: 320, y: 110 });
    const a5 = yeni(g5); vek(z5, a5, 1, 0, 3, 0, '~A', RENK.a, { ly: -24 }); vek(z5, a5, 4, 0, 0, 4, '~B', RENK.b, { lx: 34, ly: 8 });
    satir(a5, 420, '~B, ~A’nın ucuna taşınır', { size: 30 });
    const r5 = yeni(g5); vek(z5, r5, 1, 0, 3, 4, '~R', RENK.r, { lx: -34, ly: -6 });
    satir(r5, 467, '~R: baştan sona çizilen ok', { size: 30 });
    const s5 = yeni(g5); satir(s5, 514, '~A + ~B = ~B + ~A', { size: 30 });
    await goster([g5, a5], 'İkinci ok, birincinin bitiş noktasına taşınır.');
    await goster(r5, 'Baştan sona çizilen ok bileşkedir.');
    await goster(s5, 'Sıra değişse de bileşke değişmez.');
    c.note('<b>Uç uca ekleme: ikinci oku birincinin ucuna taşı, baştan sona ok çek.</b><br>3 sağ + 4 yukarı → R: 3 sağ, 4 yukarı', 'Uç uca ekleme', 'kuvvet-uc-uca');
    await sil(g5);

    // C6 · Paralelkenar
    const g6 = yeni(); baslik(g6, 'Paralelkenar yöntemi');
    const z6 = izgara(c, g6, { kare: 60, sutun: 6, satir: 4, x: 320, y: 110 });
    const a6 = yeni(g6); vek(z6, a6, 3, 0, -2, 2, '~A', RENK.a, { lx: -40, ly: 18 }); vek(z6, a6, 3, 0, 2, 2, '~B', RENK.b, { lx: 40, ly: 18 });
    const p6 = yeni(g6);
    cizgi(c, p6, ...z6.P(1, 2), ...z6.P(3, 4), { renk: RENK.b, kalin: 4, kesik: true });
    cizgi(c, p6, ...z6.P(5, 2), ...z6.P(3, 4), { renk: RENK.a, kalin: 4, kesik: true });
    satir(p6, 420, 'Paraleller uçlardan çizilir');
    const r6 = yeni(g6); vek(z6, r6, 3, 0, 0, 4, '~R', RENK.r, { lx: 30, ly: 8 });
    satir(r6, 475, '~R: başlangıçtan çıkan köşegen');
    await goster([g6, a6], 'Oklar aynı noktadan çıkar; uçlardan paraleller çizilir.');
    await goster([p6, r6], 'Bileşke, başlangıçtan çıkan köşegendir.');
    await c.say('Cisim büyük kuvvetin değil, bileşkenin yönünde gider.');
    c.note('<b>Bileşke, paralelkenarın başlangıç noktasından çıkan köşegenidir.</b><br>2 sol 2 yukarı + 2 sağ 2 yukarı → R: 4 yukarı', 'Paralelkenar yöntemi', 'kuvvet-paralelkenar');
    await sil(g6);

    // C7 · Bileşenlerine ayırma
    const g7 = yeni(); baslik(g7, 'Bileşenlerine ayırma');
    const z7 = izgara(c, g7, { kare: 60, sutun: 5, satir: 4, x: 120, y: 110 });
    const [ox, oy] = z7.P(0, 0);
    ok(c, g7, ox, oy, ox + 335, oy, { renk: RENK.cizgi, kalin: 3, uc: 12 }); ok(c, g7, ox, oy, ox, oy - 255, { renk: RENK.cizgi, kalin: 3, uc: 12 });
    yazi(c, g7, ox + 350, oy + 10, '+x', { size: 28, hiza: 'start', renk: RENK.soluk }); yazi(c, g7, ox, oy - 268, '+y', { size: 28, renk: RENK.soluk });
    const a7 = yeni(g7); vek(z7, a7, 0, 0, 2, 3, '~A', RENK.a, { lx: 34, ly: 22 });
    cizgi(c, a7, ...z7.P(2, 3), ...z7.P(2, 0), { renk: RENK.soluk, kalin: 2.5, kesik: '3 8' });
    cizgi(c, a7, ...z7.P(2, 3), ...z7.P(0, 3), { renk: RENK.soluk, kalin: 2.5, kesik: '3 8' });
    vek(z7, a7, 0, 0, 2, 0, null, RENK.a, { kesik: true, kalin: 5 }); vek(z7, a7, 0, 0, 0, 3, null, RENK.a, { kesik: true, kalin: 5 });
    myazi(c, a7, z7.P(1, 0)[0], oy + 42, '~A_{x}', { renk: RENK.a }); myazi(c, a7, ox - 16, z7.P(0, 1.5)[1] + 8, '~A_{y}', { renk: RENK.a, hiza: 'end' });
    const b7 = yeni(g7); satir(b7, 210, '~A_{x}: +x yönünde 2 birim', { x: 520, hiza: 'start', renk: RENK.a }); satir(b7, 275, '~A_{y}: +y yönünde 3 birim', { x: 520, hiza: 'start', renk: RENK.a });
    await goster([g7, a7], 'Bileşen, vektörün eksen üzerindeki iz düşümüdür.');
    await goster(b7, 'Yatay bileşen x ekseninde, düşey bileşen y eksenindedir.', { speak: 'Yatay bileşen iks ekseninde, düşey bileşen ye eksenindedir.' });
    await c.say('Bileşenler uç uca eklenince vektörün kendisi geri gelir.');
    c.note('<b>Bileşen, vektörün eksen üzerindeki iz düşümüdür.</b><br>2 sağ, 3 yukarı → A<sub>x</sub>: +x 2 birim; A<sub>y</sub>: +y 3 birim', 'Bileşen', 'kuvvet-bilesen');
    await sil(g7);

    // C8 · Bileşenlerle toplama
    const g8 = yeni(); baslik(g8, 'Bileşenlerle toplama');
    /* Bir satır tek yazı öğesidir: ad ve iki sütun. */
    const sat = (g, y, ad, x1, x2, rk) => {
      const t = c.S('text', { x: 260, y, 'text-anchor': 'start', 'font-size': 40, 'font-weight': 600, style: 'fill:' + rk }, g);
      c.S('tspan', { text: ad }, t);
      c.S('tspan', { x: 430, text: x1 }, t);
      c.S('tspan', { x: 680, text: x2 }, t);
      ustOk(c, g, t, 0, 40, rk);
    };
    const ab8 = yeni(g8); sat(ab8, 205, 'A', '+x 2', '+y 3', RENK.a); sat(ab8, 280, 'B', '+x 2', '+y 1', RENK.b);
    const r8 = yeni(g8); cizgi(c, r8, 240, 315, 790, 315, { kalin: 2 }); sat(r8, 385, 'R', '+x 4', '+y 4', RENK.r);
    const s8 = yeni(g8); satir(s8, 480, 'Yatay yatayla, düşey düşeyle toplanır', { size: 32, renk: RENK.soluk });
    await goster([g8, ab8], 'Önce her vektörün yatay ve düşey bileşenleri yazılır.');
    await goster(r8, 'Aynı eksendeki bileşenler kendi aralarında toplanır.');
    await goster(s8, 'Yatay yatayla, düşey düşeyle toplanır.');
    c.note('<b>Yatay yatayla, düşey düşeyle toplanır.</b><br>A: +x 2, +y 3<br>B: +x 2, +y 1<br>R: +x 4, +y 4', 'Bileşenlerle toplama', 'kuvvet-bilesenlerle');
    await sil(g8);

    // C9 · Yöntem değişir, bileşke değişmez
    const g9 = yeni(); baslik(g9, 'Üç yol, tek bileşke');
    satir(g9, 160, '~A: 3 sağ, 1 yukarı', { size: 34, renk: RENK.a }); satir(g9, 215, '~B: 2 sağ, 3 yukarı', { size: 34, renk: RENK.b });
    const k9 = yeni(g9);
    [['Uç uca ekleme', 40], ['Paralelkenar', 355], ['Bileşenler', 670]].forEach(([m, x]) => duzKart(c, k9, x, 265, 290, 100, m, { renk: RENK.cizgi, size: 32 }));
    const r9 = yeni(g9); satir(r9, 465, '~R: 5 sağ, 4 yukarı', { size: 44, renk: RENK.r });
    await goster(g9, 'A vektörü 3 sağ, 1 yukarı; B vektörü 2 sağ, 3 yukarı.', { speak: 'a vektörü üç sağ, bir yukarı; be vektörü iki sağ, üç yukarı.' });
    await goster(k9, 'Üç yöntem de aynı bileşkeyi verir.');
    await goster(r9, 'Yöntem değişir, bileşke değişmez: hep 5 sağ, 4 yukarı.', { speak: 'Yöntem değişir, bileşke değişmez: hep beş sağ, dört yukarı.' });
    c.note('<b>Yöntem değişir, bileşke değişmez.</b><br>3 sağ 1 yukarı + 2 sağ 3 yukarı → üç yolla da 5 sağ, 4 yukarı', 'Üç yol', 'kuvvet-yontem');
    await c.say('Şimdi bu konunun sorularını karışık sırayla çöz.');
  }

  Ders.start({
    id: 'kuvvet-ve-hareket-c10', kicker: 'Konu C · Vektörler', title: 'Konu tekrarı', accent: renk, back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Vektörler',
      hook: 'Konunun kuralları aklında mı? Önce kuralları topla, sonra <b>on karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun dokuz kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun kurallarını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular kuralların sırasıyla değil karışık dizilir; çoğu kuralı yeni bir duruma uygulatır.
    quiz: [
      {
        q: 'Kareli haritada bir martı önce 3 kare sağa, 2 kare yukarı; sonra 2 kare sağa, 3 kare aşağı uçuyor. İki hareket uç uca eklenirse bileşke hangi oktur?',
        options: ['Başlangıçtan 5 sağ, 5 yukarı giden ok', 'Başlangıçtan 5 sağ, 1 aşağı giden ok', 'Başlangıçtan 1 sağ, 1 yukarı giden ok'], answer: 1,
        why: ['Yatay kısım doğru; ama ikinci ok aşağı gidiyor. Düşeyde 2 kare yukarı çıkılır, 3 kare aşağı inilir.', 'Evet. Yatayda 3 + 2 = 5 sağ; düşeyde 2 yukarı ile 3 aşağı zıt yönlüdür, fark 1 kare aşağı.', 'Sağa giden iki ok aynı yönlü; çıkarılmaz, toplanır: 5 sağ.'], scene: 0,
      },
      {
        q: 'Teleferik kabinine iki kuvvet etki ediyor. A: +x yönünde 5, −y yönünde 2 birim. B: −x yönünde 3, −y yönünde 4 birim. Bileşkenin bileşenleri nedir?',
        options: ['R<sub>x</sub>: +x yönünde 8, R<sub>y</sub>: −y yönünde 6 birim', 'R<sub>x</sub>: −x yönünde 2, R<sub>y</sub>: −y yönünde 6 birim', 'R<sub>x</sub>: +x yönünde 2, R<sub>y</sub>: −y yönünde 6 birim'], answer: 2,
        why: ['x ekseninde biri sağa, öteki sola bakıyor; zıt yön çıkarır, 8 olmaz.', 'Fark doğru ama yön yanlış: x ekseninde büyük olan 5 birimlik bileşen sağa bakar, bileşke +x yönündedir.', 'Evet. x ekseninde 5 sağ ile 3 sol zıt yönde: fark 2, +x yönünde. y ekseninde 2 ile 4 aynı yönde, ikisi de aşağı: 6 birim.'], scene: 0,
      },
      {
        q: 'Kareli düzlemde orijinden 5 kare sola giden bir P vektörü çiziliyor. P vektörünün bileşenleri hangisidir?',
        options: ['Yalnızca P<sub>x</sub>: −x yönünde 5 birim', 'P<sub>x</sub>: −x yönünde 5, P<sub>y</sub>: +y yönünde 5 birim', 'Yalnızca P<sub>y</sub>: +y yönünde 5 birim'], answer: 0,
        why: ['Evet. Ok x ekseninin üzerinde ve sola gidiyor; tek bileşeni kendisidir: −x yönünde 5 birim.', 'Ok yukarı çıkmıyor; y ekseninde bileşeni yoktur.', 'Eksenleri karıştırdın: sola giden ok x ekseni üzerindedir, y ekseni üzerinde değil.'], scene: 0,
      },
      {
        q: 'Rüzgâr, bir yelkenliyi doğuya 12 N ile itiyor. Kareli düzlemde ölçek 1 kare = 3 N ise bu kuvvet hangi okla gösterilir?',
        options: ['Doğuya bakan, 36 kare boyunda ok', 'Batıya bakan, 4 kare boyunda ok', 'Doğuya bakan, 4 kare boyunda ok'], answer: 2,
        why: ['Büyüklük ölçekle çarpılmaz; 12 N içinde kaç tane 3 N olduğuna bakılır.', 'Boy doğru ama ok ters yöne bakıyor; rüzgâr yelkenliyi doğuya itiyor.', 'Evet. Her kare 3 N: 12 N içinde dört tane 3 N var; ok doğuya bakar ve 4 kare tutar.'], scene: 0,
      },
      {
        q: 'Kaya tırmanıcısının kemerine bağlı iki ip, kareli düzlemde iki kuvvet oku olarak gösteriliyor: A, 2 sağ, 1 yukarı; B, 3 sağ, 2 yukarı. Bir öğrenci bileşenleri toplayarak bileşkenin 5 sağ, 3 yukarı olduğunu buluyor. Aynı çifti paralelkenar yöntemiyle çizen öğrencinin köşegeni başlangıçtan hangi noktaya ulaşmalıdır?',
        options: ['1 sağ, 1 yukarıdaki noktaya', '5 sağ, 3 yukarıdaki noktaya', '5 sağ, 2 yukarıdaki noktaya'], answer: 1,
        why: ['Bu, uçları birleştiren öteki köşegen; bileşke, vektörlerin çıktığı noktadan çıkan köşegendir.', 'Evet. Yöntem değişir, bileşke değişmez: köşegen de 5 sağ, 3 yukarıdaki noktaya varır.', 'Düşeyde iki ok da yukarı gidiyor; 1 + 2 = 3 yukarı olur, 2 yukarı olmaz.'], scene: 0,
      },
      {
        q: 'P vektörü batıya 6 birimdir. Doğuya 3 birim olan Q vektörü, P cinsinden nasıl yazılır?',
        options: ['Q = −½P', 'Q = ½P', 'Q = −2P'], answer: 0,
        why: ['Evet. Yön ters olduğu için eksi, 3 birim 6 birimin yarısı olduğu için ½: Q = −½P.', '½P batıya bakar ve 3 birimdir; Q ise doğuya bakıyor.', '−2P doğuya bakar ama boyu 12 birimdir; Q’nun boyu P’nin yarısıdır.'], scene: 0,
      },
      {
        q: 'Tek hatlı yolda karşılıklı giden iki trenden birinin hız vektörü doğuya 30 m/s, ötekinin batıya 30 m/s. Bu iki hız vektörü için hangisi doğrudur?',
        options: ['Zıt vektörlerdir; büyüklükleri aynı, yönleri ters', 'Eşit vektörlerdir; ikisinin de büyüklüğü 30 m/s', 'Ne eşit ne zıttır; yönleri ters olduğu için karşılaştırılamaz'], answer: 0,
        why: ['Evet. Büyüklük aynı, yön ters: zıt vektörler.', 'Büyüklükler aynı ama yönler ters; eşit vektörde yön de aynı olmalı.', 'Büyüklükler aynı ve yönler ters; bu, zıt vektörün tanımıdır.'], scene: 0,
      },
      {
        q: 'Aşağı yönde 5 birim olan W vektörü 3 ile çarpılıyor. Sonuç hangisidir?',
        options: ['Yukarı yönde 15 birim', 'Aşağı yönde 8 birim', 'Aşağı yönde 15 birim'], answer: 2,
        why: ['Pozitif sayı yönü çevirmez; yönü eksi işaretli çarpan çevirir.', 'Sayıyla çarpmak boyu çarpan kadar katlar; 5 + 3 değil, 3 × 5 = 15.', 'Evet. Çarpan pozitif: yön aynı kalır, boy üç katına çıkar: aşağı yönde 15 birim.'], scene: 0,
      },
      {
        q: 'Maden vagonuna aynı doğrultuda iki kuvvet etki ediyor: doğuya 300 N, batıya 450 N. Bileşke hangisidir?',
        options: ['Doğu yönünde 150 N', 'Batı yönünde 150 N', 'Batı yönünde 750 N'], answer: 1,
        why: ['Büyüklük doğru ama bileşke büyük olan kuvvetin yönündedir: batı.', 'Evet. Zıt yönde büyüklükler çıkarılır: 450 N − 300 N = 150 N; bileşke büyük olanın yönünde, batıdadır.', 'Kuvvetler zıt yönlü; büyüklükler toplanmaz, çıkarılır.'], scene: 0,
      },
      {
        q: 'Uçurtmaya bağlı iki ip, aynı noktadan çıkan iki kuvvet oku olarak gösteriliyor: biri 3 sol, 1 yukarı; öteki 3 sağ, 1 yukarı. Paralelkenar yöntemiyle bileşke hangi oktur?',
        options: ['Başlangıçtan 2 yukarı giden ok', 'Başlangıçtan 6 sağ, 2 yukarı giden ok', 'Birinci okun ucundan ikincinin ucuna giden ok'], answer: 0,
        why: ['Evet. Paraleller başlangıç noktasının 2 kare yukarısında kesişir; bileşke oraya giden köşegendir.', 'Oklardan biri sola, öteki sağa bakıyor; yatay kareler toplanmaz.', 'Bu, uçları birleştiren öteki köşegen; bileşke, vektörlerin çıktığı noktadan çıkar.'], scene: 0,
      },
    ],
    summary: [
      '<b>Vektörün ucu yönü, boyu büyüklüğü gösterir;</b> eşit vektörde ikisi de aynı, zıt vektörde yön ters, boy aynıdır.',
      'Aynı doğrultuda <b>aynı yön toplar, zıt yön çıkarır;</b> farklı doğrultuda uç uca ekleme ve paralelkenar yöntemiyle bileşke bulunur.',
      '<b>Her vektör bileşenlerine ayrılır, aynı eksendeki bileşenler toplanır;</b> yöntem değişse de bileşke değişmez.',
    ],
    nextLesson: { href: 'd1-dort-temel-kuvvet.html', label: 'Sonraki konu: Doğadaki temel kuvvetler ›' },
  });
})();
