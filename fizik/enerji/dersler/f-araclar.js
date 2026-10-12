/* Konu F (Isı iletim hızı ve yalıtım) derslerinin ortak çizim araçları: window.KIT_F. Düz vektör; izometrik figür yok.
   Ölçüler ve anlamları senaryonun okuma kılavuzundadır (plan/fizik/enerji/senaryolar/F-isi-iletim-hizi-ve-yalitim.md).
   Sayfada yükleme sırası: ders.js, kit.js, (figür modülü: iletim-sekil.js ya da duvar-sekil.js), f-araclar.js, ders dosyası.
   Bu dosya F2'nin aracıdır; F1 okur, değiştirmez. Figür yazı taşımaz: okuma() yazısı f.nokta(ad) noktasına bağlanır.

   KALIN = { ince: 4, orta: 9, kalin: 14 }          ısı okunun kalınlığı aktarım hızının sıralamasını gösterir (sayı yazılmaz)
   isiOku(c, p, P, Q, { kalin = 9 }) → { g, ciz(P, Q), kalinlik(w), git(c, w, ms = 500, ease = inOut), w }
        turuncu ok, ucu Q'da; baş gövdeyle birlikte büyür (baş yarı genişliği = 6 + 0,9 · kalınlık). Gizli başlar: belir(c, o.g) ile açılır.
        Boyu 4 birimden kısaysa görünmez; 30 birimden kısa okta baş gövdeyi yutar (boyun en çok yüzde 70'i başa ayrılır).
        kalinlik(w) anında, git(c, w, ms) c.tween ile kalınlığı değiştirir; ciz(P, Q) oku yeniden yerleştirir (nokta izleyen figürde her karede).
   okuma(c, p, f, ad, { yan: 'sol' | 'sag' }) → { g, guncelle(T), izle() }
        figürün termometre noktasını (ad: 'ic.termometre', 'dis.termometre', 'sol.termometre' …) izleyen sarı sıcaklık yazısı, 24 birim,
        '22 °C'. yan 'sol': yazı noktanın soluna (text-anchor: end, x − 14); 'sag' (varsayılan): sağına (x + 14). y + 8.
        guncelle(T) hem sayıyı yazar hem noktayı izler (T verilmezse yalnızca izler); sütun değişirken her karede çağır.
        Nokta kadrajın dışındaysa (f.gorunur false) yazı kendiliğinden gizlenir.
   elKutusu(c, p, x, y, T) → { g, yaz(T) }        sol üst köşesi (x, y), 200 × 90 yuvarlatılmış kutu: 'el · 33 °C' (sıcaklık sarı). El çizilmez. Gizli başlar.
   sureCizgisi(c, p, { x = 655, x1 = 985, y = 506 }) → { g, boy(w), git(c, w, ms = 3000, ease = linear), w }
        x → x1 arasında ince açık gri iz ve soldan sağa dolan çubuk; altında 'geçen süre' (24 birim, soluk). w 0…1 dolu oranı. Sayı yazılmaz.
   katsayiSatiri(c, p, x, y, w, ad, deger, { h = 56, size = 24 }) → g
        ısı iletim katsayısı tablosunun bir satırı: yuvarlatılmış kutu, solda madde adı, sağda katsayı (kalın). Gizli başlar.
   yapiKarti(c, p, x, y, w, h, ad, { size = 24 }) → { g, cizim, vurgu(acik) }
        küçük yapı kartı çerçevesi: kutu, altında ad. cizim, kartın kendi koordinatlarında (sol üst köşe x, y) çizim koyman için boş gruptur;
        üst kısım (y … y + h − 44) çizime ayrılmıştır. vurgu(true) kenarlığı açık renkli ve kalın yapar. Gizli başlar. */
window.KIT_F = (() => {
  'use strict';
  const { RENK, yazi, renkli, cizgi, kutu, gizle, yon, ileri, uz } = window.KIT;
  const { ease, lerp, clamp } = Ders;
  const KALIN = { ince: 4, orta: 9, kalin: 14 };

  function isiOku(c, p, P, Q, o = {}) {
    const g = c.S('g', {}, p), hat = c.S('line', { stroke: RENK.isi, 'stroke-linecap': 'round' }, g), uc = c.S('path', { fill: RENK.isi }, g);
    const d = { P, Q, w: o.kalin == null ? KALIN.orta : o.kalin };
    const yaz = () => {
      const boy = uz(d.P, d.Q);
      if (boy < 4) { g.style.visibility = 'hidden'; return; }
      g.style.visibility = 'visible';
      const a = yon(d.P, d.Q), hl = Math.min(12 + d.w * 1.6, boy * 0.7), hw = 6 + d.w * 0.9, taban = ileri(d.Q, a, -hl);
      const s1 = ileri(taban, a + Math.PI / 2, hw), s2 = ileri(taban, a - Math.PI / 2, hw);
      hat.setAttribute('x1', d.P[0]); hat.setAttribute('y1', d.P[1]); hat.setAttribute('x2', taban[0]); hat.setAttribute('y2', taban[1]);
      hat.setAttribute('stroke-width', d.w);
      uc.setAttribute('d', `M${d.Q[0]},${d.Q[1]} L${s1[0]},${s1[1]} L${s2[0]},${s2[1]} Z`);
    };
    yaz();
    gizle(g);
    return {
      g,
      get w() { return d.w; },
      ciz(P2, Q2) { d.P = P2; d.Q = Q2; yaz(); },
      kalinlik(w) { d.w = w; yaz(); },
      git(c2, w, ms = 500, e = ease.inOut) { const w0 = d.w; return c2.tween(ms, (k) => { d.w = lerp(w0, w, k); yaz(); }, e); },
    };
  }

  function okuma(c, p, f, ad, o = {}) {
    const sol = o.yan === 'sol';
    const t = yazi(c, p, 0, 0, '', { size: 24, kalin: 700, renk: RENK.sicaklik, hiza: sol ? 'end' : 'start' });
    const izle = () => {
      const q = f.nokta(ad);
      t.setAttribute('x', q[0] + (sol ? -14 : 14)); t.setAttribute('y', q[1] + 8);
      t.style.display = f.gorunur && !f.gorunur(ad) ? 'none' : '';
    };
    const guncelle = (T) => { if (T != null) t.textContent = Math.round(T) + ' °C'; izle(); };
    izle();
    return { g: t, guncelle, izle };
  }

  function elKutusu(c, p, x, y, T) {
    const g = c.S('g', {}, p);
    kutu(c, g, x, y, 200, 90, { rx: 16 });
    const t = renkli(c, g, x + 100, y + 56, ['el · ', [Math.round(T) + ' °C', RENK.sicaklik]], { size: 28, kalin: 700 });
    gizle(g);
    return { g, yaz(T2) { window.KIT.parcaKoy(c, t, ['el · ', [Math.round(T2) + ' °C', RENK.sicaklik]]); } };
  }

  function sureCizgisi(c, p, o = {}) {
    const x = o.x == null ? 655 : o.x, x1 = o.x1 == null ? 985 : o.x1, y = o.y == null ? 506 : o.y, g = c.S('g', {}, p);
    cizgi(c, g, [x, y], [x1, y], RENK.ince, 3);
    const dolu = c.S('rect', { x, y: y - 3, width: 0, height: 6, rx: 3, fill: RENK.cizgi }, g);
    yazi(c, g, x, y + 34, 'geçen süre', { size: 24, kalin: 600, hiza: 'start', renk: RENK.soluk });
    const d = { w: 0 };
    const boy = (w) => { d.w = clamp(w, 0, 1); dolu.setAttribute('width', (x1 - x) * d.w); };
    return { g, boy, get w() { return d.w; }, git(c2, w, ms = 3000, e = ease.linear) { const w0 = d.w; return c2.tween(ms, (k) => boy(lerp(w0, w, k)), e); } };
  }

  function katsayiSatiri(c, p, x, y, w, ad, deger, o = {}) {
    const h = o.h || 56, size = o.size || 24, g = c.S('g', {}, p), yy = y + h / 2 + size * 0.36;
    kutu(c, g, x, y, w, h, { rx: 12 });
    yazi(c, g, x + 18, yy, ad, { size, kalin: 600, hiza: 'start' });
    yazi(c, g, x + w - 18, yy, deger, { size, kalin: 700, hiza: 'end' });
    gizle(g);
    return g;
  }

  function yapiKarti(c, p, x, y, w, h, ad, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 24;
    const cerceve = kutu(c, g, x, y, w, h, { rx: 14 });
    const cizim = c.S('g', {}, g);
    yazi(c, g, x + w / 2, y + h - 16, ad, { size, kalin: 600 });
    gizle(g);
    return { g, cizim, vurgu(acik = true) { cerceve.setAttribute('stroke', acik ? RENK.cizgi : RENK.kenarlik); cerceve.setAttribute('stroke-width', acik ? 4 : 2); } };
  }

  return { KALIN, isiOku, okuma, elKutusu, sureCizgisi, katsayiSatiri, yapiKarti };
})();
