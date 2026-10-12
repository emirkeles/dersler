/* Konu C (Hâl değişimi) derslerinin ortak çizim araçları: window.KIT_C. Düz vektör; izometrik figür yok.
   Ölçüler ve anlamları senaryonun okuma kılavuzundadır (plan/fizik/enerji/senaryolar/C-hal-degisimi.md).
   Sayfada yükleme sırası: ders.js, kit.js, isitma-sekil.js, (gerekirse a-araclar.js), c-araclar.js, ders dosyası.
   Bu dosya C1'in aracıdır; C2 ve C3 okur, değiştirmez. Figür yazı taşımaz: aşağıdaki etiketler f.nokta(ad) noktasına bağlanır.

   bin(n) → '33.400'                              sayıyı yuvarlayıp binlik noktayla yazar (gerekirse eksi işareti '–' olur)
   figYazi(c, p, f, ad, metin, renk, { dx, dy, size=24, hiza='middle', sabit }) → { g, izle(), yaz(m) }
        f.nokta(ad) noktasından (dx, dy) uzağa bir yazı koyar. izle() yazıyı noktanın şimdiki yerine taşır; kadraj değişince
        ya da nokta oynayınca çağrılır. f.gorunur(ad) false ise yazı gizlenir. g yalnızca bu yazıyı taşır (gizle, belir için).
        sabit: [x, y] verilirse nokta izlenmez, yazı o yere konur (yakın kadrajda 'etiket' ve 'sureolcer' kadraj dışında kalır;
        o derslerde yazılar figür kutusunun altına sabit konur).
   kutleEtiketi(c, p, f, ist, metin, { sabit }) → figYazi      turkuaz, 24; '<ist>.etiket' noktasının 24 birim altında, ortalı ('100 g buz')
   isiSayaci(c, p, f, ist, { baslangic=0, sabit }) → { g, deger, yaz(Q), git(c, hedef, ms=1000, ease=linear), izle() }
        turuncu, 26, kalın; '<ist>.etiket' noktasının 58 birim altında (kütle etiketinin 34 birim altı), ortalı: '33.400 J'.
        Sayarken yuvarlar. yaz(Q) anında, git(c, hedef, ms) tween'le (tween içinde sayacı sen sürüyorsan yaz(Q) kullan).
   sicaklikEtiketi(c, p, f, ad) → { g, guncelle(T), izle() }     sarı, 24; ad ('sol.termometre') noktasının sağında (x + 12) '0 °C'.
        guncelle(T) hem sayıyı yazar hem noktayı yeniden izler; T verilmezse yalnızca izler. Noktanın sağında olduğu için
        sütun oynarken ve kadraj değişirken her karede guncelle çağır.
   sureEtiketi(c, p, f, { dx=0, dy=-40, sabit }) → { g, deger, yaz(sn), izle() }     'sureolcer' noktasının 40 birim üstünde '167 sn' (yuvarlar);
        iki istasyon açıkken kadranın üstü, iki istasyonun arasındaki boşluktur (altına konursa kütle etiketleriyle çakışır)
   grafik(c, p, o) → { g, X, Y, nokta(Q, T), kur(s), ilerle(c, i, ms, ease), vurgu(eksen, a, b, renk), bolge(metin, Q, T, o), uzunluk, kose }
        Sıcaklık–ısı grafiği. Okuma kılavuzundaki ölçüler varsayılandır; o ile değişir:
          o.kose        [[Q, T, kesik?], …]  köşeler (Q joule, T °C); üçüncü öğe true ise o köşeye varan parça kesiklidir
          o.X(Q), o.Y(T)  ölçek işlevleri (varsayılan X = 440 + Q/650, Y = 370 − 2·T)
          o.xCentik     [0, 100000, 200000, 300000]   x çentikleri (J), yazı binlik noktalı
          o.yCentik     [-20, 0, 100, 120]            y çentikleri (°C)
          o.kesikler    [0, 100]                      bu sıcaklıklarda eksenden sağ uca 0,35 saydam kesikli çizgi
          o.orijin [440, 410], o.yUst 110, o.xUc 945   eksenlerin uçları; o.xAd 'Isı (J)', o.yAd 'Sıcaklık (°C)'
          o.size 24     çentik ve eksen yazısı boyu
        g başlangıçta eksenleri ve adları gösterir; eğri boştur. ilerle(c, i, ms) çizgiyi i'inci köşeye kadar çeker (hız sabit,
        süre uzunlukla orantılı dağılmaz: ms toplam süredir); kur(s) çizgiyi s uzunluğuna anında getirir; uzunluk[i] i'inci
        köşenin eğri boyunca konumudur. vurgu('x' | 'y', a, b, renk) — 'x' için J, 'y' için °C aralığında yarı saydam bant (gizli başlar);
        bolge(metin, Q, T, { dy=-14, renk }) — çizginin üstüne bölge adı (gizli başlar). Hepsi belir(c, öğe) ile açılır. */
window.KIT_C = (() => {
  'use strict';
  const { RENK, yazi, cizgi, gizle } = window.KIT;
  const { ease, lerp, clamp } = Ders;

  const bin = (n) => {
    const v = Math.round(n), s = String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (v < 0 ? '–' : '') + s;
  };

  function figYazi(c, p, f, ad, metin, renk, o = {}) {
    const t = yazi(c, p, 0, 0, metin, { size: o.size || 24, kalin: o.kalin || 700, renk, hiza: o.hiza || 'middle' });
    const izle = () => {
      if (o.sabit) { t.setAttribute('x', o.sabit[0]); t.setAttribute('y', o.sabit[1]); return; }
      const q = f.nokta(ad);
      t.setAttribute('x', q[0] + (o.dx || 0)); t.setAttribute('y', q[1] + (o.dy || 0));
      t.style.display = f.gorunur && !f.gorunur(ad) ? 'none' : '';
    };
    izle();
    return { g: t, izle, yaz(m) { t.textContent = m; } };
  }

  const kutleEtiketi = (c, p, f, ist, metin, o = {}) => figYazi(c, p, f, ist + '.etiket', metin, RENK.kutle, { dy: 24, sabit: o.sabit });

  function isiSayaci(c, p, f, ist, o = {}) {
    const y = figYazi(c, p, f, ist + '.etiket', '', RENK.isi, { dy: 58, size: 26, sabit: o.sabit });
    const d = { deger: o.baslangic || 0 };
    const yaz = (Q) => { d.deger = Q; y.yaz(bin(Q) + ' J'); };
    yaz(d.deger);
    return {
      g: y.g, izle: y.izle, yaz,
      get deger() { return d.deger; },
      git(c2, hedef, ms = 1000, e = ease.linear) { const Q0 = d.deger; return c2.tween(ms, (k) => yaz(lerp(Q0, hedef, k)), e); },
    };
  }

  function sicaklikEtiketi(c, p, f, ad) {
    const y = figYazi(c, p, f, ad, '', RENK.sicaklik, { dx: 12, dy: 8, hiza: 'start' });
    return { g: y.g, izle: y.izle, guncelle(T) { if (T != null) { const r = Math.round(T); y.yaz((r < 0 ? '–' + (-r) : r) + ' °C'); } y.izle(); } };
  }

  function sureEtiketi(c, p, f, o = {}) {
    const y = figYazi(c, p, f, 'sureolcer', '', RENK.yazi, { dx: o.dx || 0, dy: o.dy == null ? -40 : o.dy, sabit: o.sabit });
    const d = { deger: 0 };
    const yaz = (sn) => { d.deger = sn; y.yaz(Math.round(sn) + ' sn'); };
    yaz(0);
    return { g: y.g, izle: y.izle, yaz, get deger() { return d.deger; } };
  }

  function grafik(c, p, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 24;
    const X = o.X || ((Q) => 440 + Q / 650), Y = o.Y || ((T) => 370 - 2 * T);
    const [x0, y0] = o.orijin || [440, 410], yUst = o.yUst || 110, xUc = o.xUc || 945;
    const xCentik = o.xCentik || [0, 100000, 200000, 300000], yCentik = o.yCentik || [-20, 0, 100, 120];
    const kose = o.kose || [];
    /* bantlar eksenlerin altında kalsın diye önce çizilir */
    const bandlar = c.S('g', {}, g);
    (o.kesikler || [0, 100]).forEach((T) => cizgi(c, g, [x0, Y(T)], [xUc, Y(T)], RENK.cizgi, 2, { 'stroke-dasharray': '10 8', opacity: 0.35 }));
    cizgi(c, g, [x0, yUst], [x0, y0], RENK.cizgi, 3);
    cizgi(c, g, [x0, y0], [xUc, y0], RENK.cizgi, 3);
    xCentik.forEach((Q) => {
      cizgi(c, g, [X(Q), y0], [X(Q), y0 + 8], RENK.cizgi, 3);
      yazi(c, g, X(Q), y0 + 32, bin(Q), { size, kalin: 600, renk: RENK.soluk });
    });
    yCentik.forEach((T) => {
      cizgi(c, g, [x0 - 8, Y(T)], [x0, Y(T)], RENK.cizgi, 3);
      yazi(c, g, x0 - 14, Y(T) + 8, (T < 0 ? '–' : '') + Math.abs(T), { size, kalin: 600, renk: RENK.soluk, hiza: 'end' });
    });
    yazi(c, g, xUc, y0 + 68, o.xAd || 'Isı (J)', { size, kalin: 700, renk: RENK.isi, hiza: 'end' });
    yazi(c, g, x0, yUst - 15, o.yAd || 'Sıcaklık (°C)', { size, kalin: 700, renk: RENK.sicaklik, hiza: 'start' });

    /* eğri: her parça ayrı çizgi; s = eğri boyunca çizilmiş uzunluk */
    const P = kose.map((k) => [X(k[0]), Y(k[1])]);
    const uzunluk = [0];
    for (let i = 1; i < P.length; i++) uzunluk.push(uzunluk[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const parcalar = [];
    for (let i = 1; i < P.length; i++) {
      const at = kose[i][2] ? { 'stroke-dasharray': '12 9' } : {};
      parcalar.push(cizgi(c, g, P[i - 1], P[i - 1], RENK.sicaklik, 4, at));
    }
    const d = { s: 0 };
    const kur = (s) => {
      d.s = clamp(s, 0, uzunluk[uzunluk.length - 1] || 0);
      parcalar.forEach((el, i) => {
        const a = uzunluk[i], b = uzunluk[i + 1], k = b > a ? clamp((d.s - a) / (b - a), 0, 1) : 0;
        el.setAttribute('x2', P[i][0] + (P[i + 1][0] - P[i][0]) * k); el.setAttribute('y2', P[i][1] + (P[i + 1][1] - P[i][1]) * k);
        el.style.visibility = k > 0 ? 'visible' : 'hidden';   // sıfır uzunluklu parça yuvarlak uç yüzünden nokta gibi görünmesin
      });
    };
    const ilerle = (c2, i, ms = 1000, e = ease.linear) => { const s0 = d.s, s1 = uzunluk[i]; return c2.tween(ms, (k) => kur(lerp(s0, s1, k)), e); };

    const vurgu = (eksen, a, b, renk = RENK.isi) => {
      const el = eksen === 'x'
        ? c.S('rect', { x: X(a), y: yUst, width: X(b) - X(a), height: y0 - yUst, fill: renk, 'fill-opacity': 0.16 }, bandlar)
        : c.S('rect', { x: x0, y: Y(b), width: xUc - x0, height: Y(a) - Y(b), fill: renk, 'fill-opacity': 0.16 }, bandlar);
      gizle(el);
      return el;
    };
    const bolge = (metin, Q, T, b = {}) => {
      const t = yazi(c, g, X(Q), Y(T) + (b.dy == null ? -14 : b.dy), metin, { size, kalin: 700, renk: b.renk || RENK.yazi });
      gizle(t);
      return t;
    };
    return { g, X, Y, nokta: (Q, T) => [X(Q), Y(T)], kur, ilerle, vurgu, bolge, uzunluk, kose, get s() { return d.s; } };
  }

  return { bin, figYazi, kutleEtiketi, isiSayaci, sicaklikEtiketi, sureEtiketi, grafik };
})();
