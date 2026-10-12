/* Konu C (Benzer üçgenler oluşturma) ortak çizim araçları (window.KIT_C). kit.js'ten sonra, ders dosyasından önce yüklenir
   (b-araclar.js yüklenmesi gerekmez; bu dosya ona bağlı değildir). Konu C'nin dersleri bu dosyayı okuyup kullanır, değiştirmez.
   Noktalar [x, y] dizisidir (tahta 1000×562, y aşağı doğru büyür); `c` ders bağlamı, `p` üst SVG grubu; açılar derece, ekranda saat yönü artı.
   Eşleme renkleri B konusundaki gibidir: 1. çift mavi, 2. çift turuncu, 3. çift yeşil (ESLEME); paralel doğrular mor (RENK.dogru).
   Zamanlama yalnızca c.tween ile; Math.random, setTimeout, CSS animasyonu yok.

   İMZALAR VE DÖNÜŞLER
   ESLEME → renk dizisi [mavi, turuncu, yeşil].

   bolNoktalar(c, p, P, Q, n, o) → { g, pts, dots, cent }
       P–Q kenarını n eşit parçaya böler. pts: n + 1 nokta (uçlar dahil, P'den Q'ya); dots: ic noktalardaki n − 1 daire; cent: n − 1 kısa dik çentik çizgisi.
       o: { renk (RENK.yazi), r (5), nokta (varsayılan true; false: daire çizme), cent (varsayılan false; true: çentik çiz), uzun (çentik yarı boyu, 7), w (2.5) }.

   paralel(c, p, B, C, X0, X1, o) → { g, hat, ac(t), kaydir(ms, ease), uc(), koy(X) }
       B–C doğrultusunda mor kesikli doğru; X(t) = X0'dan X1'e giden nokta. Doğru her an X(t)'den geçer ve o.sinir çokgeninin (dışbükey köşe listesi,
       örn. üçgen) içinde kalan kısmı çizilir: X0 köşedeyse doğru bir noktadan başlayıp kayarak büyür. ac(t) 0–1 arası konumu kurar,
       kaydir(ms, ease) Promise döndürüp kaydırır, uc() → [sol uç, sağ uç] (şimdiki), koy(X) doğruyu doğrudan X noktasından geçirir.
       o: { sinir (köşe listesi; yoksa her yöne o.uzun kadar), uzun (sinir yoksa yarı uzunluk, |BC|), renk, w (3.5), uclar (true: uçlara nokta) }.

   aciCift(c, p, tur, X1, X2, U1, U2, o) → { g, iz, yay: [y1, y2], et: [e1, e2], noktalar }
       İki doğru ve bir kesen. X1, X2: kesenin iki doğruyu kestiği noktalar; U1 (1. doğru üstünde X1'den uzaktaki nokta) ve U2 (2. doğru üstünde,
       U1 ile aynı doğrultuda): U2 − X2 ile U1 − X1 aynı yönlüdür. tur 'F' (yöndeş: X1'de U1–X1–X2, X2'de U2–X2–kesenin devamı) ya da
       'Z' (iç ters: X1'de U1–X1–X2, X2'de X1–X2–[U1'in karşıtı]). iz: F ya da Z harfi biçimli soluk kalın çizgi grubu (ayrı belirtilir);
       yay: iki açı yayı; et: iki açı etiketi (o.etiket verilmişse).
       o: { renk (RENK.merkez), r (30), etiket (['a', 'a'] gibi; yoksa yazı yok), izRenk (RENK.cizgi), ust (true: F için kesenin öteki yanındaki çift: X1'de üst,
       X2'de X1 yönündeki açı), size (24) }.

   cevirTasi(c, p, S, T, renk, o) → { g, cok, hayalet, kopar(ms), cevir(ms), don(ms), otur(ms), hepsi(ms), durum(k, f, r, u), donus() }
       S üçgenini (köşe i, T'nin i. köşesine karşılık gelir) kesip ayırır, gerekirse ters çevirir, döndürür ve T üzerine oturtur.
       cok: oynayan üçgen (cokgen nesnesi; köşe harfleri o.harf ile); hayalet: S'nin yerinde kalan soluk kesikli iz (o.hayalet === false ise yok).
       kopar(ms): S'yi o.kopar [dx, dy] kadar ayırır; cevir(ms): ters çevirme (yalnızca S ile T ters yönlüyse; değilse hemen biter);
       don(ms): yeterli kadar döndürür; otur(ms): T'ye taşır ve ölçeği uydurur; hepsi(ms): dördü art arda. Hepsi Promise döndürür.
       durum(k, f, r, u): her adımın 0–1 arası ilerlemesini doğrudan kurar. donus() → { aci (derece, saat yönü artı), olcek, yansima (true/false) }.
       o: { kopar ([0, 0]), eksen (ters çevirme ekseninin doğrultusu, derece; 0 = yatay eksen), harf, harfSize, dolgu, ease }.

   tablo(c, p, o) → { g, satir, hucre(i, j, metin, renk), goster(i, ms), sirala(ms, bekle), kaldir() }
       Adım adım dolan tablo: her satır TEK bir <text>; hücreler tspan (kendi x'inde), satırlar saydam başlar. satir: <text> dizisi.
       hucre(i, j, metin, renk) hücreyi değiştirir (renk verilmezse mevcut renk kalır); goster(i, ms) i. satırı belirtir (Promise);
       sirala(ms = 350, bekle = 250) hepsini sırayla belirtir (Promise); kaldir() hepsini siler.
       o: { x (706), y (150), adim (46), size (25), kolon (hücre x kaymaları, [0, 140]), satir ([[hücre, …], …]; hücre: 'metin' ya da ['metin', renk]), kalin (700) }.

   ortakKose(c, p, buyuk, kucuk, o) → { g, kenarB, kenarK, yayB, yayK }
       İki benzer üçgeni eşleme renkleriyle boyar (köşe i ↔ ESLEME[i]; bir kenar karşısındaki köşenin rengini alır, i. köşede i + 1 yay).
       buyuk = [V0, V1, V2], kucuk = [W0, W1, W2] (köşe i karşılık gelir; ortak köşe için aynı nokta verilir, orada yay bir kez çizilir).
       kenarB, kenarK: 3'er çizgi; yayB, yayK: 3'er yay grubu (ortak köşede yayK[i] boş grup). Gruplar ayrı gizlenip belirtilebilir.
       o: { w (4), yayR (28), aralik (7), dik (dik açılı köşenin sırası 0–2, yoksa -1) } */
window.KIT_C = (() => {
  'use strict';
  const K = window.KIT;
  const { RENK, uz, yon, ileri, ara, agirlik, rad, yazi, cizgi, nokta, belir } = K;
  const ESLEME = [RENK.sekil, RENK.goruntu, RENK.ok];   // 1., 2., 3. karşılıklı çift: mavi, turuncu, yeşil
  const PI = Math.PI;

  /* ---- n eşit parçaya bölen noktalar ---- */
  function bolNoktalar(c, p, P, Q, n, o = {}) {
    const g = c.S('g', {}, p), a = yon(P, Q), r = o.r == null ? 5 : o.r, renk = o.renk || RENK.yazi, h = o.uzun || 7;
    const pts = [], dots = [], cent = [];
    for (let i = 0; i <= n; i++) pts.push(ara(P, Q, i / n));
    for (let i = 1; i < n; i++) {
      const X = pts[i];
      if (o.cent) cent.push(cizgi(c, g, ileri(X, a + PI / 2, h), ileri(X, a - PI / 2, h), renk, o.w || 2.5));
      if (o.nokta !== false) dots.push(nokta(c, g, X, renk, r));
    }
    return { g, pts, dots, cent };
  }

  /* ---- bir noktadan verilen kenara paralel doğru (kayarak gelir) ---- */
  function paralel(c, p, B, C, X0, X1, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.dogru, d0 = uz(B, C) || 1, dx = (C[0] - B[0]) / d0, dy = (C[1] - B[1]) / d0, yar = o.uzun || d0;
    const hat = cizgi(c, g, X0, X0, renk, o.w || 3.5, { 'stroke-dasharray': '10 8' });
    const uclar = o.uclar ? [nokta(c, g, X0, renk, 6), nokta(c, g, X0, renk, 6)] : [];
    let ucNok = [X0, X0];
    /* X'ten geçen doğrunun çokgen içindeki kirişi: kenarlarla kesişimlerin en küçük ve en büyük parametresi. */
    const kiris = (X) => {
      if (!o.sinir) return [[X[0] - dx * yar, X[1] - dy * yar], [X[0] + dx * yar, X[1] + dy * yar]];
      const S = o.sinir, ss = [];
      for (let i = 0; i < S.length; i++) {
        const V = S[i], W = S[(i + 1) % S.length], ex = W[0] - V[0], ey = W[1] - V[1], den = dx * ey - dy * ex;
        if (Math.abs(den) < 1e-9) continue;
        const qx = V[0] - X[0], qy = V[1] - X[1], s = (qx * ey - qy * ex) / den, t = (qx * dy - qy * dx) / den;
        if (t >= -1e-9 && t <= 1 + 1e-9) ss.push(s);
      }
      if (!ss.length) return [X, X];
      const a = Math.min(...ss), b = Math.max(...ss);
      return [[X[0] + dx * a, X[1] + dy * a], [X[0] + dx * b, X[1] + dy * b]];
    };
    const koy = (X) => {
      const [U, V] = kiris(X); ucNok = [U, V]; K.koy(hat, U, V);
      hat.style.opacity = uz(U, V) < 1 ? 0 : 1;
      uclar.forEach((n, i) => { n.setAttribute('cx', ucNok[i][0]); n.setAttribute('cy', ucNok[i][1]); n.style.opacity = uz(U, V) < 1 ? 0 : 1; });
    };
    const ac = (t) => koy(ara(X0, X1, t));
    ac(0);
    return { g, hat, ac, koy, kaydir: (ms, ease) => c.tween(ms, (e) => ac(e), ease || Ders.ease.inOut), uc: () => ucNok };
  }

  /* ---- F (yöndeş) ve Z (iç ters) açı çizimi ---- */
  function aciCift(c, p, tur, X1, X2, U1, U2, o = {}) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.merkez, r = o.r || 30, size = o.size || 24;
    const izRenk = o.izRenk || RENK.cizgi, iz = c.S('g', {}, g), yay = [], et = [];
    const dir = [U1[0] - X1[0], U1[1] - X1[1]], dl = Math.hypot(dir[0], dir[1]) || 1;
    const R2 = ara(X1, X2, 2);                      // kesenin X2'den sonraki devamı
    const R0 = ara(X2, X1, 2);                      // kesenin X1'den önceki devamı
    const kar = [X2[0] - dir[0] / dl * 80, X2[1] - dir[1] / dl * 80]; // X2'de U1'in karşıtı yönündeki nokta
    /* Soluk kalın F ya da Z harfi: tek <path> (kesişen parçalar iki kez koyulaşmaz). */
    const yol = (...ls) => c.S('path', { d: ls.map((l) => 'M' + l.map((q) => q.join(',')).join(' L')).join(' '), fill: 'none', stroke: izRenk, 'stroke-width': 11, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-opacity': 0.35 }, iz);
    let a1, a2;
    if (tur === 'Z') {
      yol([U1, X1, X2, kar]);
      a1 = [X1, U1, X2]; a2 = [X2, X1, kar];
    } else if (o.ust) {
      yol([ara(X1, X2, -0.2), ara(X1, X2, 1.2)], [X1, U1], [X2, U2]);
      a1 = [X1, U1, R0]; a2 = [X2, U2, X1];
    } else {
      yol([X1, ara(X1, X2, 1.35)], [X1, U1], [X2, U2]);
      a1 = [X1, U1, X2]; a2 = [X2, U2, R2];
    }
    [a1, a2].forEach((a, i) => {
      yay.push(K.aciYayi(c, g, a[0], a[1], a[2], renk, r));
      if (o.etiket && o.etiket[i] != null) {
        const m = K.aciIci(a[0], a[1], a[2], r + 20);
        et.push(yazi(c, g, m[0], m[1] + size * 0.33, o.etiket[i], { size, kalin: 700, renk }));
      }
    });
    return { g, iz, yay, et, noktalar: [X1, X2, U1, U2] };
  }

  /* ---- üçgeni kesip ters çevirerek, döndürerek başka bir üçgenin üstüne oturtma ---- */
  function cevirTasi(c, p, S, T, renk, o = {}) {
    const g = c.S('g', {}, p), kopa = o.kopar || [0, 0], eks = rad(o.eksen || 0);
    const hayalet = o.hayalet === false ? null : K.cokgen(c, g, S, renk, { dolgu: 0.05, w: 2 });
    if (hayalet) { hayalet.yuz.setAttribute('stroke-dasharray', '6 6'); hayalet.yuz.setAttribute('stroke-opacity', 0.6); }
    const cok = K.cokgen(c, g, S, renk, { harf: o.harf, harfSize: o.harfSize, dolgu: o.dolgu });
    const Cs = agirlik(S), Ct = agirlik(T);
    const alan = (Q) => Q.reduce((s, V, i) => { const W = Q[(i + 1) % Q.length]; return s + V[0] * W[1] - W[0] * V[1]; }, 0);
    const yans = alan(S) * alan(T) < 0;
    const don2 = (v, a) => [v[0] * Math.cos(a) - v[1] * Math.sin(a), v[0] * Math.sin(a) + v[1] * Math.cos(a)];
    /* f: 0 → 1 arası ters çevirme (eksen doğrultusuna dik boyut 1 → −1). */
    const M = (v, f) => { const q = don2(v, -eks); return don2([q[0], q[1] * (1 - 2 * f)], eks); };
    let re = 0, im = 0, kare = 0;
    S.forEach((V, i) => {
      const a = M([V[0] - Cs[0], V[1] - Cs[1]], yans ? 1 : 0), b = [T[i][0] - Ct[0], T[i][1] - Ct[1]];
      re += a[0] * b[0] + a[1] * b[1]; im += a[0] * b[1] - a[1] * b[0]; kare += a[0] * a[0] + a[1] * a[1];
    });
    const teta = Math.atan2(im, re), olcek = Math.hypot(re, im) / kare;
    const st = { k: 0, f: 0, r: 0, u: 0 };
    const ciz = () => {
      const K0 = [Cs[0] + kopa[0] * st.k, Cs[1] + kopa[1] * st.k], Cp = ara(K0, Ct, st.u), s = 1 + (olcek - 1) * st.u;
      cok.koy(S.map((V) => {
        const q = don2(M([V[0] - Cs[0], V[1] - Cs[1]], st.f), teta * st.r);
        return [Cp[0] + s * q[0], Cp[1] + s * q[1]];
      }));
    };
    const adim = (ad, ms, ok) => (ok ? c.tween(ms, (e) => { st[ad] = e; ciz(); }, o.ease || Ders.ease.inOut) : Promise.resolve());
    ciz();
    return {
      g, cok, hayalet,
      kopar: (ms = 700) => adim('k', ms, uz([0, 0], kopa) > 0.5),
      cevir: (ms = 800) => adim('f', ms, yans),
      don: (ms = 900) => adim('r', ms, Math.abs(teta) > 0.01),
      otur: (ms = 900) => adim('u', ms, true),
      hepsi: async (ms = 800) => { await adim('k', ms, uz([0, 0], kopa) > 0.5); await adim('f', ms, yans); await adim('r', ms, Math.abs(teta) > 0.01); await adim('u', ms, true); },
      durum: (k, f, r, u) => { Object.assign(st, { k, f, r, u }); ciz(); },
      donus: () => ({ aci: (teta * 180) / PI, olcek, yansima: yans }),
    };
  }

  /* ---- adım adım dolan tablo ---- */
  function tablo(c, p, o = {}) {
    const g = c.S('g', {}, p), x = o.x == null ? 706 : o.x, y0 = o.y == null ? 150 : o.y, adim = o.adim || 46, kolon = o.kolon || [0, 140];
    const satir = [], tsp = [];
    (o.satir || []).forEach((hucreler, i) => {
      const t = yazi(c, g, x, y0 + i * adim, '', { hiza: 'start', size: o.size || 25, kalin: o.kalin || 700 });
      tsp[i] = hucreler.map((h, j) => {
        const [m, r] = Array.isArray(h) ? h : [h, null];
        const ts = c.S('tspan', { text: m, x: x + (kolon[j] == null ? j * 140 : kolon[j]) }, t);
        if (r) ts.style.fill = r;
        return ts;
      });
      t.style.opacity = 0;
      satir.push(t);
    });
    const hucre = (i, j, metin, renk) => { const ts = tsp[i][j]; ts.textContent = metin; if (renk) ts.style.fill = renk; };
    const goster = (i, ms = 350) => belir(c, satir[i], ms);
    const sirala = async (ms = 350, bekle = 250) => { for (let i = 0; i < satir.length; i++) { await goster(i, ms); if (i < satir.length - 1) await c.wait(bekle); } };
    return { g, satir, hucre, goster, sirala, kaldir: () => g.remove() };
  }

  /* ---- benzer iki üçgeni eşleme renkleriyle boyama ---- */
  function ortakKose(c, p, buyuk, kucuk, o = {}) {
    const g = c.S('g', {}, p), w = o.w || 4, R = o.yayR || 28, ar = o.aralik || 7;
    const kenarB = [], kenarK = [], yayB = [], yayK = [];
    const yaylar = (V, A, B, n, r, dik) => {
      const gg = c.S('g', {}, g);
      if (dik) K.aciYayi(c, gg, V, A, B, ESLEME[0], r * 1.1, { dik: true });
      else for (let k = 0; k < n; k++) K.aciYayi(c, gg, V, A, B, ESLEME[n - 1], r + k * ar);
      return gg;
    };
    [[buyuk, kenarB], [kucuk, kenarK]].forEach(([Q, hedef]) => {
      for (let i = 0; i < 3; i++) hedef.push(cizgi(c, g, Q[(i + 1) % 3], Q[(i + 2) % 3], ESLEME[i], w));
    });
    for (let i = 0; i < 3; i++) {
      const dik = o.dik === i, j = (i + 1) % 3, k = (i + 2) % 3;
      yayB.push(yaylar(buyuk[i], buyuk[j], buyuk[k], i + 1, R, dik));
      if (uz(buyuk[i], kucuk[i]) < 1) yayK.push(c.S('g', {}, g));
      else yayK.push(yaylar(kucuk[i], kucuk[j], kucuk[k], i + 1, R * 0.8, dik));
    }
    return { g, kenarB, kenarK, yayB, yayK };
  }

  return { ESLEME, bolNoktalar, paralel, aciCift, cevirTasi, tablo, ortakKose };
})();
