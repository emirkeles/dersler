/* Konu B (Eşlik ve benzerlik koşulları) ortak çizim araçları (window.KIT_B). kit.js'ten sonra, ders dosyasından önce yüklenir.
   Konu B'nin dersleri bu dosyayı okuyup kullanır, değiştirmez. Noktalar [x, y] dizisidir (tahta 1000×562, y aşağı doğru büyür);
   açılar derece, ekranda saat yönü artıdır. Eşleme renkleri: 1. çift mavi (A ↔ D), 2. çift turuncu (B ↔ E), 3. çift yeşil (C ↔ F);
   bir kenar, karşısındaki köşenin rengini alır. Hiçbir araç Math.random, setTimeout ya da CSS animasyonu kullanmaz. */
window.KIT_B = (() => {
  'use strict';
  const K = window.KIT;
  const { RENK, uz, yon, ileri, ara, agirlik, rad, yazi, renkli, cizgi, nokta } = K;
  const ESLEME = [RENK.sekil, RENK.goruntu, RENK.ok];   // 1., 2., 3. karşılıklı çiftin rengi
  const NOTR = RENK.cizgi;
  const sinirla = (x, a, b) => Math.max(a, Math.min(b, x));

  /* notrUcgen(c, p, pts, harf, o) → cokgen nesnesi (g, yuz, adlar, koy, pts); nötr dolgulu üçgen, köşe harfleri eşleme renginde.
     o: { harfSize, dolgu, w, renkler }. */
  function notrUcgen(c, p, pts, harf, o = {}) {
    const t = K.cokgen(c, p, pts, NOTR, { harf, harfSize: o.harfSize || 26, dolgu: o.dolgu == null ? 0.12 : o.dolgu, w: o.w || 3 });
    t.adlar.forEach((a, i) => { a.style.fill = (o.renkler || ESLEME)[i]; });
    return t;
  }

  /* esitYay(c, p, V, P, Q, n, renk, o) → g; V köşesinde P–V–Q açısına n yay (1, 2, 3) çizer; o: { r, aralik, dik }. dik: true ise yay yerine dik açı işareti. */
  function esitYay(c, p, V, P, Q, n, renk, o = {}) {
    const g = c.S('g', {}, p), r = o.r || 26;
    if (o.dik) { K.aciYayi(c, g, V, P, Q, renk, r * 1.2, { dik: true }); return g; }
    for (let i = 0; i < n; i++) K.aciYayi(c, g, V, P, Q, renk, r + i * (o.aralik || 7));
    return g;
  }

  /* esitCentik(c, p, P, Q, n, renk, o) → g; P–Q kenarının ortasına n çentik (1, 2, 3) çizer; o: { t (ortanın yeri 0–1), uzun, aralik, w }. */
  function esitCentik(c, p, P, Q, n, renk, o = {}) {
    const g = c.S('g', {}, p), M = ara(P, Q, o.t == null ? 0.5 : o.t), a = yon(P, Q), h = o.uzun || 9, ar = o.aralik || 7;
    for (let i = 0; i < n; i++) {
      const m = ileri(M, a, (i - (n - 1) / 2) * ar);
      cizgi(c, g, ileri(m, a + Math.PI / 2, h), ileri(m, a - Math.PI / 2, h), renk, o.w || 3);
    }
    return g;
  }

  /* kenarEtiketi(c, p, P, Q, metin, renk, o) → <text>; P–Q kenarının dışına, kenara paralel kaydırılmış uzunluk yazısı.
     o: { merkez (şeklin içinden bir nokta; yazı ondan uzağa konur), uzak, size }. */
  function kenarEtiketi(c, p, P, Q, metin, renk, o = {}) {
    const M = ara(P, Q, 0.5), d = uz(P, Q) || 1, size = o.size || 24;
    let nx = -(Q[1] - P[1]) / d, ny = (Q[0] - P[0]) / d;
    if (o.merkez && (M[0] - o.merkez[0]) * nx + (M[1] - o.merkez[1]) * ny < 0) { nx = -nx; ny = -ny; }
    const u = (o.uzak == null ? 22 : o.uzak) + Math.abs(nx) * String(metin).length * size * 0.28;
    return yazi(c, p, M[0] + nx * u, M[1] + ny * u + size * 0.33, metin, { size, kalin: 700, renk: renk || RENK.yazi });
  }

  /* esleme(c, p, P, Q, o) → { g, ilk, ikinci, yaylar, kenarlar, kenarCift, adlar }; iki üçgende karşılıklı köşe, açı ve kenar aynı renkte
     (köşe i: ESLEME[i]; i. köşenin karşısındaki kenar aynı renk ve i + 1 çentik; i. köşede i + 1 yay).
     P, Q: üçer köşe; o: { harf1: ['A','B','C'], harf2: ['D','E','F'], dik (dik açılı köşenin sırası 0–2, yoksa -1), yayR }.
     ilk, ikinci: cokgen nesneleri; yaylar: 6 açı yayı grubu; kenarlar: 6 renkli kenar+çentik grubu; kenarCift[i] = [P'deki çizgi, Q'daki çizgi]
     (i. köşenin karşısındaki kenar; stroke-width ile vurgulanır); adlar: 6 köşe harfi. Açı ve kenarlar ayrı gizlenip belirtilebilir. */
  function esleme(c, p, P, Q, o = {}) {
    const g = c.S('g', {}, p), h1 = o.harf1 || ['A', 'B', 'C'], h2 = o.harf2 || ['D', 'E', 'F'], dik = o.dik == null ? -1 : o.dik;
    const ilk = notrUcgen(c, g, P, h1), ikinci = notrUcgen(c, g, Q, h2);
    const yaylar = [], kenarlar = [], kenarCift = [[], [], []];
    [P, Q].forEach((X, t) => {
      for (let i = 0; i < 3; i++) {
        const j = (i + 1) % 3, k = (i + 2) % 3;
        yaylar.push(esitYay(c, g, X[i], X[j], X[k], i + 1, ESLEME[i], { dik: i === dik, r: o.yayR || 26 }));
        const kg = c.S('g', {}, g);
        kenarCift[i][t] = cizgi(c, kg, X[j], X[k], ESLEME[i], 6);
        esitCentik(c, kg, X[j], X[k], i + 1, ESLEME[i]);
        kenarlar.push(kg);
      }
    });
    return { g, ilk, ikinci, yaylar, kenarlar, kenarCift, adlar: [...ilk.adlar, ...ikinci.adlar] };
  }

  /* eslemeYazisi(c, p, x, y, sol, sag, simge, o) → <text>; "△ABC ≅ △DEF" (simge '≅') ya da "△ABC ~ △DEF" (simge '~') yazısı;
     soldaki i. harf ESLEME[i] renginde, sağdaki harfler eşlendiği sıranın renginde. o: { ucgenSimge (false ise △ yazılmaz), sagSira: [0,1,2]
     (sağdaki harflerin renk sırası; yanlış yazım ABC ≅ DFE için [0,2,1]), size, hiza }. */
  function eslemeYazisi(c, p, x, y, sol, sag, simge, o = {}) {
    const u = o.ucgenSimge === false ? null : '△', sira = o.sagSira || [0, 1, 2], pr = [];
    if (u) pr.push(u);
    [...sol].forEach((h, i) => pr.push([h, ESLEME[i]]));
    pr.push(' ' + (simge || '≅') + ' ');
    if (u) pr.push(u);
    [...sag].forEach((h, i) => pr.push([h, ESLEME[sira[i]]]));
    return renkli(c, p, x, y, pr, { size: o.size || 36, hiza: o.hiza || 'middle', kalin: 700 });
  }

  /* ucgenKur(tur, veri, A, o) → [A, B, C] (piksel); ölçekli üçgen köşeleri. A, verilen nokta; B, A'dan o.aci doğrultusunda; C, o.taraf yanında.
     tur 'KKK': veri = [|AB|, |BC|, |CA|]; 'KAK': veri = [|AB|, A açısı (derece), |AC|]; 'AKA': veri = [|AB|, A açısı, B açısı] (derece).
     Uzunluklar birim cinsindendir; o: { olcek (birim başına piksel, varsayılan 40), aci (AB'nin doğrultusu, derece; 0 = sağa), taraf (1: C yukarıda, -1: aşağıda) }. */
  function ucgenKur(tur, v, A, o = {}) {
    const b = o.olcek == null ? 40 : o.olcek, a0 = rad(o.aci || 0), s = o.taraf == null ? 1 : o.taraf;
    let AB, AC, aA;
    if (tur === 'KKK') {
      AB = v[0] * b; const BC = v[1] * b; AC = v[2] * b;
      aA = Math.acos(sinirla((AB * AB + AC * AC - BC * BC) / (2 * AB * AC), -1, 1));
    } else if (tur === 'KAK') {
      AB = v[0] * b; aA = rad(v[1]); AC = v[2] * b;
    } else if (tur === 'AKA') {
      AB = v[0] * b; aA = rad(v[1]); const aB = rad(v[2]), aC = Math.PI - aA - aB;
      AC = (AB * Math.sin(aB)) / Math.sin(aC);
    } else throw new Error('ucgenKur: bilinmeyen tür ' + tur);
    return [A, ileri(A, a0, AB), ileri(A, a0 - s * aA, AC)];
  }

  /* mentese(c, p, V, u1, u2, o) → { g, ac(derece), aci(), uc(), kenar3() }; V köşesinde menteşeli iki çubuk (uzunlukları u1, u2 piksel; sabit),
     aradaki açı ac(derece) ile değişir; üçüncü kenar (turuncu) ona göre çizilir. uc() → [V, P1, P2]; kenar3() → üçüncü kenarın uzunluğu (piksel).
     o: { yon (birinci çubuğun doğrultusu, derece; ikinci çubuk ondan saatin tersine açılır), aci (başlangıç, 90), renk1, renk2, renk3, etiket (false: derece yazısı yok), yayR }. */
  function mentese(c, p, V, u1, u2, o = {}) {
    const g = c.S('g', {}, p), a0 = rad(o.yon || 0), r = o.yayR || 34, renkA = RENK.merkez;
    const k3 = cizgi(c, g, V, V, o.renk3 || RENK.goruntu, 5);
    const s1 = cizgi(c, g, V, V, o.renk1 || RENK.sekil, 7), s2 = cizgi(c, g, V, V, o.renk2 || RENK.sekil, 7);
    const yay = c.S('path', { fill: 'none', stroke: renkA, 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
    const et = o.etiket === false ? null : yazi(c, g, 0, 0, '', { size: 24, kalin: 700, renk: renkA });
    const n0 = nokta(c, g, V, RENK.yazi, 6), n1 = nokta(c, g, V, RENK.yazi, 5), n2 = nokta(c, g, V, RENK.yazi, 5);
    let d = 0, P1 = V, P2 = V;
    const ac = (x) => {
      d = x; P1 = ileri(V, a0, u1); P2 = ileri(V, a0 - rad(x), u2);
      K.koy(s1, V, P1); K.koy(s2, V, P2); K.koy(k3, P1, P2);
      [[n1, P1], [n2, P2]].forEach(([n, q]) => { n.setAttribute('cx', q[0]); n.setAttribute('cy', q[1]); });
      const a = ileri(V, a0, r), b = ileri(V, a0 - rad(x), r);
      yay.setAttribute('d', x < 1 ? '' : `M${a[0]},${a[1]} A${r},${r} 0 ${x > 180 ? 1 : 0} 0 ${b[0]},${b[1]}`);
      if (et) { const m = ileri(V, a0 - rad(x) / 2, r + 26); et.setAttribute('x', m[0]); et.setAttribute('y', m[1] + 8); et.textContent = x < 1 ? '' : Math.round(x) + '°'; }
    };
    ac(o.aci == null ? 90 : o.aci);
    return { g, ac, aci: () => d, uc: () => [V, P1, P2], kenar3: () => uz(P1, P2), k3, s1, s2, yay, etiket: et };
  }

  /* icice(c, p, pts, sabit, o) → { g, kucuk, buyuk, buyut(k), k(), pts(), hesap(k) }; ortak köşeden büyüyen iç içe üçgen: pts köşeli üçgen sabit (mavi),
     sabit sırasındaki köşe yerinde kalır, öteki köşeler ona göre k katına çıkar (turuncu büyük üçgen). buyut(k) büyük üçgeni yeniden çizer.
     o: { k0 (başlangıç, 1), harf (küçük üçgenin köşe harfleri), harfBuyuk, renk, renkBuyuk }. */
  function icice(c, p, pts, sabit, o = {}) {
    const g = c.S('g', {}, p), S = pts[sabit];
    const buyuk = K.cokgen(c, g, pts, o.renkBuyuk || RENK.goruntu, { harf: o.harfBuyuk, dolgu: 0.12 });
    const kucuk = K.cokgen(c, g, pts, o.renk || RENK.sekil, { harf: o.harf });
    const hesap = (k) => pts.map((q, i) => (i === sabit ? q : [S[0] + (q[0] - S[0]) * k, S[1] + (q[1] - S[1]) * k]));
    let k = o.k0 || 1;
    const buyut = (x) => { k = x; buyuk.koy(hesap(x)); };
    buyut(k);
    return { g, kucuk, buyuk, buyut, k: () => k, pts: () => buyuk.pts(), hesap };
  }

  return { ESLEME, notrUcgen, esitYay, esitCentik, kenarEtiketi, esleme, eslemeYazisi, ucgenKur, mentese, icice };
})();
