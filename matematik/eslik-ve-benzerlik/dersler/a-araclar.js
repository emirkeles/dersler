/* Konu A (Geometrik dönüşümler) ortak çizim araçları: window.KIT_A. Sayfada kit.js'ten sonra, ders dosyasından önce yüklenir.
   Dönme araçlarıdır; kit.js içindekilerin üstüne kurulur (KIT'i değiştirmez). Dönme açısı derece cinsindendir ve
   ekranda saat yönü artıdır (KIT.dondur ile aynı). Zamanlama c.tween içinde yapılır; araçlar yalnızca durumu çizer.
   Köşe harfli çokgenin hareket ederken harflerini gizle, hareket bitince göster. */
window.KIT_A = (() => {
  'use strict';
  const { RENK, rad, uz, yon, ileri, ara, araHepsi, dondur, yansit, otele, yazi, cizgi, koy, nokta, cokgen, dogru, ok, bayrak } = window.KIT;

  /* Dönme merkezi: sarı nokta ve (ad verilmişse) sol altında adı. → { g, nokta, ad, O } */
  function merkezNokta(c, p, O, ad = 'O', o = {}) {
    const g = c.S('g', {}, p), n = nokta(c, g, O, RENK.merkez, o.r || 8);
    const t = ad ? yazi(c, g, O[0] - 22, O[1] - 12, ad, { size: 24, kalin: 700, renk: RENK.merkez }) : null;
    return { g, nokta: n, ad: t, O };
  }

  /* Noktanın çevresinde büyüyüp sönen halka (dikkat çeker, işi bitince kendini siler). Beklenebilir. */
  async function halka(c, p, P, renk = RENK.merkez, r0 = 9, r1 = 34, ms = 900) {
    const h = c.S('circle', { cx: P[0], cy: P[1], r: r0, fill: 'none', stroke: renk, 'stroke-width': 3 }, p);
    await c.tween(ms, (e) => { h.setAttribute('r', r0 + (r1 - r0) * e); h.style.opacity = 1 - e; });
    h.remove();
  }

  /* O çevresinde dönebilen çokgen: KIT.cokgen'in nesnesi + don(derece) (köşeleri ilk konumundan derece kadar döndürür)
     ve derece(). → { g, yuz, adlar, koy, pts, don, derece } */
  function donenCokgen(c, p, O, pts, renk, o = {}) {
    const g = cokgen(c, p, pts, renk, o);
    let d = 0;
    g.don = (derece) => { d = derece; g.koy(pts.map((P) => dondur(P, O, derece))); };
    g.derece = () => d;
    return g;
  }

  /* don(derece) yöntemi olan nesneleri (donenCokgen, yayIz, merkezAci) d0'dan d1'e birlikte döndürür. Beklenebilir. */
  async function donuyor(c, nesneler, d0, d1, ms = 1600) {
    await c.tween(ms, (e) => { const d = d0 + (d1 - d0) * e; nesneler.forEach((n) => n.don(d)); }, Ders.ease.inOut);
  }

  /* V köşesinin O çevresinde çizdiği yay (kesikli, soluk): don(derece) V'den başlayarak derece kadarını çizer.
     uc: yayın sonundaki ok başı (başta görünür; ilk anda gizle(uc) ile saklayıp sonra belir ile göster). → { g, yol, uc, don } */
  function yayIz(c, p, O, V, o = {}) {
    const r = uz(O, V), a0 = yon(O, V), renk = o.renk || RENK.cizgi;
    const g = c.S('g', {}, p);
    const yol = c.S('path', { fill: 'none', stroke: renk, 'stroke-width': o.w || 2.5, 'stroke-linecap': 'round', 'stroke-dasharray': '6 6' }, g);
    const uc = c.S('path', { fill: renk }, g);
    const don = (x) => {
      if (Math.abs(x) < 0.5) { yol.setAttribute('d', ''); uc.setAttribute('d', ''); return; }
      const s = x > 0 ? 1 : -1, a1 = a0 + rad(x), P0 = ileri(O, a0, r), P1 = ileri(O, a1, r);
      yol.setAttribute('d', `M${P0[0]},${P0[1]} A${r},${r} 0 ${Math.abs(x) > 180 ? 1 : 0} ${s > 0 ? 1 : 0} ${P1[0]},${P1[1]}`);
      const t = a1 + (s * Math.PI) / 2, u = ileri(P1, t, 5), b = ileri(P1, t, -8), k1 = ileri(b, t + Math.PI / 2, 7), k2 = ileri(b, t - Math.PI / 2, 7);
      uc.setAttribute('d', `M${u[0]},${u[1]} L${k1[0]},${k1[1]} L${k2[0]},${k2[1]} Z`);
    };
    don(o.derece || 0);
    return { g, yol, uc, don };
  }

  /* Merkezdeki dönme açısı: O'dan V'ye sabit ışın, O'dan V'nin d derece dönmüşüne ikinci ışın, aralarında sarı açı yayı ve
     derece etiketi. isin(x) yalnızca ikinci ışını, yayAc(x) yalnızca yayı ve etiketi, don(x) ikisini birden ayarlar
     (|x| < 1 iken yay ve etiket silinir). Başta hepsi d derecede çizilir. → { g, isin1, isin2, yay, etiket, isin, yayAc, don } */
  function merkezAci(c, p, O, V, d, o = {}) {
    const renk = o.renk || RENK.merkez, r = o.r || 34, a0 = yon(O, V), w = o.w || 3.5;
    const g = c.S('g', {}, p);
    const isin1 = cizgi(c, g, O, V, renk, w), isin2 = cizgi(c, g, O, V, renk, w);
    const yay = c.S('path', { fill: 'none', stroke: renk, 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    const etiket = yazi(c, g, O[0], O[1], '', { size: 24, kalin: 700, renk });
    const isin = (x) => koy(isin2, O, dondur(V, O, x));
    const yayAc = (x) => {
      if (Math.abs(x) < 1) { yay.setAttribute('d', ''); etiket.textContent = ''; return; }
      const s = x > 0 ? 1 : -1, P0 = ileri(O, a0, r), P1 = ileri(O, a0 + rad(x), r), q = ileri(O, a0 + rad(x) / 2, o.etiketR || r + 30);
      yay.setAttribute('d', `M${P0[0]},${P0[1]} A${r},${r} 0 ${Math.abs(x) > 180 ? 1 : 0} ${s > 0 ? 1 : 0} ${P1[0]},${P1[1]}`);
      etiket.setAttribute('x', q[0]); etiket.setAttribute('y', q[1] + 8);
      etiket.textContent = Math.round(Math.abs(x)) + '°';
    };
    const don = (x) => { isin(x); yayAc(x); };
    don(d);
    return { g, isin1, isin2, yay, etiket, isin, yayAc, don };
  }

  /* Merkezden bir noktaya uzaklık çizgisi (sarı) ve üzerinde uzunluk etiketi. taraf (+1 / -1) etiketin çizginin hangi yanında
     duracağını, t etiketin çizgi üzerindeki yerini (0–1), kay çizgiden uzaklığını (px) belirler. → { g, hat, etiket } */
  function yaricap(c, p, O, V, metin, renk = RENK.merkez, o = {}) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, O, V, renk, o.w || 3.5);
    const m = ara(O, V, o.t == null ? 0.5 : o.t), q = ileri(m, yon(O, V) + (o.taraf || 1) * (Math.PI / 2), o.kay || 20);
    const etiket = yazi(c, g, q[0], q[1] + 8, metin, { size: 24, kalin: 700, renk });
    return { g, hat, etiket };
  }

  /* Üç dönüşümü yan yana gösteren üç bölme: öteleme (yeşil ok), yansıma (mor doğru), dönme (sarı merkez ve yay).
     Her bölmede motif (varsayılan KIT.bayrak) ve görüntüsü bulunur; adı ve fiili (kaydırır / ters çevirir / döndürür) başlıkta durur.
     paneller[k] = { g (çerçeve, motif, görüntü, iz), baslik (ad ve fiil), sekil, goruntu, iz (ok / doğru / merkez ve yay),
     ilerle(e) (görüntüyü 0–1 arasında şekilden görüntüye götürür) }. Başta görüntü şeklin üstündedir ve iz gizlidir.
     o: { motif: (i, j) => köşeler (birim kare), b: birim px (34) }. */
  function ucDonusum(c, p, o = {}) {
    const b = o.b || 34, motif = o.motif || bayrak, W = 300, ARA = 20, X0 = 20;
    const ad = ['öteleme', 'yansıma', 'dönme'], fiil = ['kaydırır', 'ters çevirir', 'döndürür'], renk = [RENK.ok, RENK.dogru, RENK.merkez];
    const paneller = [];
    for (let k = 0; k < 3; k++) {
      const x = X0 + k * (W + ARA), g = c.S('g', {}, p);
      c.S('rect', { x, y: 90, width: W, height: 420, rx: 14, fill: 'none', stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
      const baslik = c.S('g', {}, g);
      yazi(c, baslik, x + W / 2, 135, ad[k], { size: 28, kalin: 700, renk: renk[k] });
      yazi(c, baslik, x + W / 2, 172, fiil[k], { size: 24, renk: RENK.soluk });
      const gx = x + 12, gy = 215, P = (u, v) => [gx + u * b, gy + v * b], yerel = (i, j) => motif(i, j).map(([u, v]) => P(u, v));
      const iz = c.S('g', {}, g);
      let A, B, don = null;
      if (k === 0) {
        A = yerel(1, 2.2); B = A.map((q) => otele(q, [4.5 * b, 0]));
        [0, 2, 5].forEach((i) => ok(c, iz, ara(A[i], B[i], 0.04), ara(A[i], B[i], 0.96)));
      } else if (k === 1) {
        const U = P(4.4, 0.9), V = P(4.4, 6.4);
        A = yerel(2, 2.2); B = A.map((q) => yansit(q, U, V));
        dogru(c, iz, U, V);
      } else {
        const O = P(3.6, 5.8);
        A = yerel(1, 1.6); B = A.map((q) => dondur(q, O, 90));
        nokta(c, iz, O, RENK.merkez, 7);
        don = yayIz(c, iz, O, A[2], { renk: RENK.merkez, w: 3, derece: 90 });
      }
      const sekil = cokgen(c, g, A, RENK.sekil), goruntu = cokgen(c, g, A, RENK.goruntu);
      g.appendChild(iz);
      const O3 = k === 2 ? P(3.6, 5.8) : null;
      const ilerle = (e) => {
        goruntu.koy(k === 2 ? A.map((q) => dondur(q, O3, 90 * e)) : araHepsi(A, B, e));
        if (don) don.don(90 * e);
      };
      ilerle(0);
      paneller.push({ g, baslik, sekil, goruntu, iz, ilerle, A, B });
    }
    return { paneller };
  }

  return { merkezNokta, halka, donenCokgen, donuyor, yayIz, merkezAci, yaricap, ucDonusum };
})();
