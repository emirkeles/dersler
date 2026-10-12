/* Konu B (Isının hesabı) derslerinin ortak düz vektör araçları: window.KIT_B. Tahta 1000×562 birimdir.
   Ölçüler ve anlamları senaryonun okuma kılavuzundadır (plan/fizik/enerji/senaryolar/B-isinin-hesabi.md).
   Bu dosyayı B2 dersini yazan oturum açtı; öteki B dersleri okur, değiştirmez. Önce window.KIT yüklenmiş olmalıdır
   (kit.js). Beher, termometre, ısı oku ve iç enerji çubuğu window.KIT_A'dandır (a-araclar.js); bu dosya onlara bağlı değildir.

   P                       formül parçaları, renkli() için: P.Q ['Q', ısı], P.m ['m', kütle], P.dT ['ΔT', sıcaklık], P.c ve P.C (açık gri).
                           Kullanım: [P.C, ' = ', P.m, ' · ', P.c]
   sayi(v, birim?)         sayı yazımı: ondalık virgül, binlik nokta, birimle sayı arası boşluk.
                           sayi(1045, 'J/°C') → "1.045 J/°C"; sayi(4.18) → "4,18"; sayi(-20, '°C') → "–20 °C"
   kalinOk(c, p, P, Q, w=7, renk=ısı) → { g, ciz(P, Q) }
                           kalın ısı oku. Kitin ok() aracının başı yalnızca 17 birimdir; w = 14 gibi kalın gövdeyi yutar.
                           Bunun başı gövdeyle büyür (uzunluk en az 17, w × 1,7; yarı genişlik en az 9, w × 1,1).
   cozumKarti(c, p, { x, y, w, h?, size=26, satir=52 }) → { g, ekle(parcalar, { ms=300, soluk=true }), degistir(i, parcalar), satir(i) }
                           adım adım dolan hesap kartı. Aynı anda en çok üç satır görünür. ekle(): yeni satır alta gelir
                           (opacity 0 → 1, `out`, ms; ms: 0 ise anında); önceki satırlar 0,45'e iner (soluk: false ise inmez).
                           Dördüncü satır gelince en eski satır söner (300 ms, `in`) ve öbürleri bir satır yukarı kayar.
                           parcalar renkli() biçimindedir. degistir(i, parcalar): i. eklenen satırın yazısını değiştirir (boşluğu doldurur).
                           satir(i) satırın <text> öğesini verir. Satırlar sola yaslıdır (x + 36); eşitlik işaretleri altalta düşsün diye
                           satırlar "C = …" ile başlatılır.
   dogruGrafigi(c, p, { o=[110,430], xSon=[560,430], ySon=[110,110], xAd, yAd }) → { g, O, dogru(Q, renk, w=4), nokta(P, renk=sıcaklık), kesik(P, Q, renk) }
                           orijinden geçen doğru grafiği. Eksenler 2 birim açık gri, yazıları 22 birim (xAd eksenin sağ ucunun altında, sağa yaslı;
                           yAd dikey eksenin tepesinin sağında). Eksenin ortasının altı işaretler (örneğin "m") için boş kalır. Eksenlerde sayı yoktur.
                           dogru() → { g, ciz(ms=800) }: orijinden Q'ya uzanan doğru; ciz() `out` ile soldan sağa çizer ve beklenir.
                           nokta(): 8 birim yarıçaplı sarı daire. kesik(): kesik çizgi (belir ile gösterilir; gizli başlar).
   cubukCifti(c, p, { adX, x0, y: [y1, y2, …], adlar: [...], renk=sıcaklık }) → { g, boy(i, w), deger(i, metin), git(c, w[], ms=600) }
                           ΔT çubuk çifti (ya da dizisi): satır adı adX'ten başlar (24 birim), çubuk x0'dan 22 birim kalın sağa uzar,
                           değer yazısı çubuğun ucunun 12 birim sağındadır. y: yazının taban çizgisi. git() `out` ile boyları
                           (birim) verilen değere götürür ve beklenir; deger() yazıyı koyar (yazı çubuğu izler).
   sicaklikEtiketi(c, p, f, ad, { size=24, birim=' °C' }) → { g, guncelle(T?) }
                           izometrik figürün `ad` noktasını ('sol.termometre', 'sag.termometre') izleyen sarı sıcaklık sayısı.
                           guncelle(T): sayıyı yuvarlayıp yazar (T verilmezse yalnızca konumu yeniler). Yazı sütun tepesinin
                           12 birim sağındadır. Konum f.nokta'dan okunduğu için guncelle her f.ayar çağrısından SONRA,
                           hareket sırasında her karede çağrılır. f.gorunur(ad) false ise gizlenir. Gizli başlamaz; gizle() ile gizle.
   sureEtiketi(c, p, f, { dx=0, dy=… , size=24 }) → { g, yaz(metin) }
                           figürün 'sureolcer' noktasının yanına düz yazıyla geçen süre ("5. dk"). Yazı tahta renginde konturludur. */
window.KIT_B = (() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, uz, yon, ileri, koy } = window.KIT;
  const { ease, lerp } = Ders;

  const P = {
    Q: ['Q', RENK.isi], m: ['m', RENK.kutle], dT: ['ΔT', RENK.sicaklik], c: ['c', RENK.yazi], C: ['C', RENK.yazi],
  };

  function sayi(v, birim) {
    const [t, k] = String(Math.abs(v)).split('.');
    const binlik = t.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (v < 0 ? '–' : '') + binlik + (k ? ',' + k : '') + (birim ? ' ' + birim : '');
  }

  function kalinOk(c, p, P1, Q1, w = 7, renk = RENK.isi) {
    const g = c.S('g', {}, p), hat = cizgi(c, g, P1, Q1, renk, w), uc = c.S('path', { fill: renk }, g);
    const ciz = (A, B) => {
      const d = uz(A, B);
      if (d < 4) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const L = Math.max(17, w * 1.7), hw = Math.max(9, w * 1.1), a = yon(A, B);
      const taban = ileri(B, a, -L), t1 = ileri(taban, a + Math.PI / 2, hw), t2 = ileri(taban, a - Math.PI / 2, hw);
      koy(hat, A, d > L * 0.8 ? ileri(B, a, -L * 0.8) : A);
      uc.setAttribute('d', `M${B[0]},${B[1]} L${t1[0]},${t1[1]} L${t2[0]},${t2[1]} Z`);
    };
    ciz(P1, Q1);
    return { g, ciz };
  }

  function cozumKarti(c, p, o) {
    const g = c.S('g', {}, p), size = o.size || 26, sat = o.satir || 52, h = o.h || sat * 3 + 44;
    kutu(c, g, o.x, o.y, o.w, h, { rx: 14 });
    const slotY = (s) => o.y + 22 + sat * s + sat / 2 + size * 0.36;
    const hepsi = [], gorunen = [];
    const yerle = (r, s) => r.t.setAttribute('y', slotY(s));
    async function ekle(parcalar, op = {}) {
      const ms = op.ms == null ? 300 : op.ms, soluk = op.soluk !== false;
      const t = renkli(c, g, o.x + 36, slotY(0), parcalar, { size, kalin: 600, hiza: 'start' });
      gizle(t);   // yeni satır, eski satır sönüp ötekiler kayana kadar görünmez (yoksa en üstteki satırın üstüne biner)
      const r = { t };
      hepsi.push(r);
      if (gorunen.length === 3) {
        const eski = gorunen.shift();
        if (ms) await belir(c, eski.t, 300, 0); else gizle(eski.t);
        eski.t.remove();
        if (ms) await c.tween(300, (e) => gorunen.forEach((q, i) => q.t.setAttribute('y', lerp(slotY(i + 1), slotY(i), e))), ease.inOut);
        gorunen.forEach((q, i) => yerle(q, i));
      }
      gorunen.push(r);
      yerle(r, gorunen.length - 1);
      gizle(t);
      const oncekiler = gorunen.slice(0, -1);
      if (ms) {
        await Promise.all([belir(c, t, ms), soluk && oncekiler.length ? belir(c, oncekiler.map((q) => q.t), ms, 0.45) : null]);
      } else {
        t.style.opacity = 1;
        if (soluk) oncekiler.forEach((q) => { q.t.style.opacity = 0.45; });
      }
      return r;
    }
    return {
      g, ekle,
      degistir(i, parcalar) { parcaKoy(c, hepsi[i].t, parcalar); },
      satir(i) { return hepsi[i].t; },
    };
  }

  function dogruGrafigi(c, p, o = {}) {
    const O = o.o || [110, 430], X = o.xSon || [560, 430], Y = o.ySon || [110, 110], g = c.S('g', {}, p);
    cizgi(c, g, O, X, RENK.cizgi, 2); cizgi(c, g, O, Y, RENK.cizgi, 2);
    if (o.xAd) yazi(c, g, X[0], O[1] + 44, o.xAd, { size: 22, kalin: 600, renk: RENK.yazi, hiza: 'end' });
    if (o.yAd) yazi(c, g, Y[0] + 14, Y[1] + 6, o.yAd, { size: 22, kalin: 600, renk: RENK.yazi, hiza: 'start' });
    return {
      g, O,
      dogru(Q1, renk, w = 4) {
        const dg = c.S('g', {}, g), l = cizgi(c, dg, O, O, renk, w);
        return {
          g: dg,
          ciz(ms = 800) {
            return c.tween(ms, (e) => { l.setAttribute('x2', lerp(O[0], Q1[0], e)); l.setAttribute('y2', lerp(O[1], Q1[1], e)); }, ease.out);
          },
        };
      },
      nokta(P1, renk = RENK.sicaklik) { return c.S('circle', { cx: P1[0], cy: P1[1], r: 8, fill: renk }, g); },
      kesik(P1, Q1, renk = RENK.cizgi) {
        const l = cizgi(c, g, P1, Q1, renk, 2, { 'stroke-dasharray': '8 7' });
        gizle(l);
        return l;
      },
    };
  }

  function cubukCifti(c, p, o) {
    const g = c.S('g', {}, p), renk = o.renk || RENK.sicaklik, satirlar = [];
    o.y.forEach((y, i) => {
      yazi(c, g, o.adX, y, o.adlar[i], { size: 24, kalin: 600, hiza: 'start' });
      const el = c.S('rect', { x: o.x0, y: y - 8 - 11, width: 0, height: 22, rx: 6, fill: renk }, g);
      const dt = yazi(c, g, o.x0 + 12, y, '', { size: 24, kalin: 700, hiza: 'start', renk });
      satirlar.push({ el, dt, w: 0 });
    });
    const boy = (i, w) => { const s = satirlar[i]; s.w = Math.max(0, w); s.el.setAttribute('width', s.w); s.dt.setAttribute('x', o.x0 + s.w + 12); };
    return {
      g, boy,
      deger(i, metin) { satirlar[i].dt.textContent = metin; },
      git(c2, ws, ms = 600) {
        const w0 = satirlar.map((s) => s.w);
        return c2.tween(ms, (e) => ws.forEach((w, i) => boy(i, lerp(w0[i], w, e))), ease.out);
      },
    };
  }

  function sicaklikEtiketi(c, p, f, ad, o = {}) {
    const birim = o.birim == null ? ' °C' : o.birim;
    const t = yazi(c, p, 0, 0, '', { size: o.size || 24, kalin: 700, renk: RENK.sicaklik, hiza: 'start' });
    t.style.stroke = RENK.koyu; t.style.strokeWidth = '6px'; t.style.paintOrder = 'stroke'; t.style.strokeLinejoin = 'round';
    function guncelle(T) {
      if (T != null) t.textContent = Math.round(T) + birim;
      const [x, y] = f.nokta(ad);
      t.setAttribute('x', x + 12); t.setAttribute('y', y + 8);
      t.style.display = f.gorunur(ad) ? '' : 'none';
    }
    return { g: t, guncelle };
  }

  function sureEtiketi(c, p, f, o = {}) {
    const t = yazi(c, p, 0, 0, '', { size: o.size || 24, kalin: 600 });
    t.style.stroke = RENK.koyu; t.style.strokeWidth = '6px'; t.style.paintOrder = 'stroke'; t.style.strokeLinejoin = 'round';
    const yer = () => { const [x, y] = f.nokta('sureolcer'); t.setAttribute('x', x + (o.dx || 0)); t.setAttribute('y', y + (o.dy == null ? 62 : o.dy)); };
    yer();
    return { g: t, yaz(metin) { t.textContent = metin; yer(); } };
  }

  return { P, sayi, kalinOk, cozumKarti, dogruGrafigi, cubukCifti, sicaklikEtiketi, sureEtiketi };
})();
