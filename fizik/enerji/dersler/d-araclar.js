/* Konu D (Isıl denge) derslerinin ortak düz vektör araçları: window.KIT_D. Tahta 1000×562 birimdir.
   Bu dosyayı D1 dersini yazan oturum açtı; D2 okur, değiştirmez. Sayfada yükleme sırası: ders.js, kit.js, a-araclar.js,
   denge-sekil.js, d-araclar.js, ders dosyası. Isı oku için window.KIT_A (a-araclar.js) gerekir; öteki araçlar yalnızca window.KIT'e dayanır.
   Figürle ilgili araçlar f (DENGE.kur'un döndürdüğü nesne) ve noktalarının adını alır; yazılar figürün dışındaki düz katmandadır.

   halo(t, w=8) → t                                yazıya tahta renginde kontur verir (çizgilerin ve figürün üstünde okunsun diye)
   okuma(c, p, f, ad) → { g, guncelle(T), izle(), T }
        ad 'ic.termometre' | 'dis.termometre'. Termometre noktasını izleyen sarı sıcaklık yazısı ("60 °C", tam sayıya yuvarlanır).
        'dis' yazısı noktanın soluna (text-anchor: end, x − 10), 'ic' yazısı sağına (start, x + 10). guncelle(T) yazıyı yazar ve noktaya taşır;
        sütun c.tween içinde hareket ederken her adımda f.ayar(…) ardından guncelle(T) (ya da yalnızca izle()) çağrılır. g yazı öğesidir.
   etiket(c, p, f, ad, metin) → <text>
        ad 'ic' | 'dis'. Kütle ve madde etiketi, figürün 'ad.etiket' noktasına bağlı, turkuaz, ortalı: 'dis' noktanın 24, 'ic' 52 birim altında.
        Örnek: etiket(c, g, f, 'dis', 'beher: 300 g su'). Figürü y 12, h 488 kur: etiket noktası tezgâhın ön kenarının altındadır,
        daha büyük figürde ikinci satır tahtadan taşar.
   degisim(c, p, f, ad, { uzak = 100, etiket = 'yan' }) → { g, goster(c, metin, ms = 500), orta() }
        Değişim oku. Çağrıldığı anda f.nokta(ad)'in yüksekliğini hatırlar (sütun hareket etmeden önce kur), orada 24 birimlik gri kesikli
        yatay çizgi koyar. goster(): sütunun şimdiki tepesine kadar sarı dikey ok çizer (5 birim, ms ve `out`) ve yanında metni ("–30 °C", "+10 °C") yazar.
        'dis' oku noktanın solunda, 'ic' oku sağında, noktadan `uzak` birim ötededir (okuma yazısının yanına düşmesin diye). Yazı okun
        yanındadır (etiket: 'yan'; dis solunda, ic sağında); kısa okta ya da yan yer yoksa okun 24 birim üstündedir (etiket: 'ust', ortalı). Kısa ok (en az 15 birim)
        başını küçültür. orta() → [x, y] okun ortası (halka vb. için). Başta gizlidir.
   esitCizgi(c, p, f) → { g, ciz() }
        'dis.termometre' ile 'ic.termometre' tepelerini birleştiren ince sarı çizgi (denge anında yatay). Başta gizlidir; ciz() yeniden yerleştirir.
   temasOku(c, p, f) → { g, izle() }
        'temas' noktasının yüksekliğinde, erlenmayerden beher termometresine doğru turuncu ısı oku ve "ısı" (KIT_A.isiOku; gizli başlar).
        Erlenmayer hareket ederken izle() çağrılır.
   yalitim(c, p, x, y, w, h, { tx, ty, hiza = 'end' }) → { g, yazi }
        Gri kesikli dikdörtgen ve "yalıtılmış" yazısı (varsayılan: çerçevenin sağ üst köşesinin içinde).
   sicaklikSatiri(c, p, { x, y, w, min, max, uclar: [{ T, ad, renk }, { T, ad, renk }] }) → { g, konum(T), denge(c, T, ms = 800) }
        Sıcaklık çizgisi satırı: gri yatay çizgi (min…max °C arası x…x+w), iki uç halkası (üstünde sarı sıcaklık, altında ad), aradaki denge noktası
        (sarı dolu daire, altında "denge"; ilk denge() çağrısında belirir, sonrakilerde yeni sıcaklığa kayar). konum(T) → x.
   deneyTablosu(c, p, { x, y, satir, h = 56, bas = 76, size = 24, w = [90, 90, 90, 130, 130, 150] }) → { g, satirlar, yaz(i, j, metin, renk), goster(i, ms), vurgula(i, acik) }
        Altı sütunlu deney tablosu: Madde · Kütle · Öz ısı · İlk sıcaklık · Son sıcaklık · Sıcaklık değişimi. Başlık iki satırdır (bas yüksekliğinde,
        başlık yazısı size − 2); sütun genişliği w (en uzun hücre + 30). Veri satırları gizli başlar (KIT.tablo ile aynı arayüz). 485 birimlik yan sütuna
        sığdırmak için w daraltılır (örnek [74, 74, 64, 90, 90, 93]) ya da tablo tahtanın tamamına kurulur. */
window.KIT_D = (() => {
  'use strict';
  const { RENK, yazi, cizgi, koy, kutu, gizle, belir } = window.KIT;
  const { lerp, ease } = Ders;

  const halo = (t, w = 8) => {
    Object.assign(t.style, { paintOrder: 'stroke', stroke: RENK.koyu, strokeWidth: w + 'px', strokeLinejoin: 'round' });
    return t;
  };

  function okuma(c, p, f, ad) {
    const sol = ad.startsWith('dis');
    const t = halo(yazi(c, p, 0, 0, '', { hiza: sol ? 'end' : 'start', size: 26, kalin: 700, renk: RENK.sicaklik }));
    let T = null;
    const izle = () => { const [x, y] = f.nokta(ad); t.setAttribute('x', sol ? x - 10 : x + 10); t.setAttribute('y', y + 9); };
    return { g: t, izle, guncelle(v) { T = v; t.textContent = Math.round(v) + ' °C'; izle(); }, get T() { return T; } };
  }

  function etiket(c, p, f, ad, metin) {
    const t = yazi(c, p, 0, 0, metin, { size: 24, kalin: 600, renk: RENK.kutle });
    const [x, y] = f.nokta(ad + '.etiket');
    t.setAttribute('x', x); t.setAttribute('y', y + (ad === 'ic' ? 52 : 24));
    return t;
  }

  function degisim(c, p, f, ad, o = {}) {
    const sol = ad.startsWith('dis'), [x0, y0] = f.nokta(ad), ax = x0 + (sol ? -1 : 1) * (o.uzak || 100);
    const g = c.S('g', {}, p);
    cizgi(c, g, [ax - 12, y0], [ax + 12, y0], RENK.gri, 3, { 'stroke-dasharray': '5 4' });
    const govde = cizgi(c, g, [ax, y0], [ax, y0], RENK.sicaklik, 5);
    const bas = c.S('path', { fill: RENK.sicaklik }, g);
    const ust = o.etiket === 'ust';
    const yz = halo(yazi(c, g, ust ? ax : ax + (sol ? -24 : 24), y0, '', { hiza: ust ? 'middle' : sol ? 'end' : 'start', size: 24, kalin: 700, renk: RENK.sicaklik }));
    let y1 = y0;
    const ciz = (y) => {
      const uz = Math.abs(y - y0);
      if (uz < 4) { govde.style.visibility = 'hidden'; bas.style.visibility = 'hidden'; return; }
      govde.style.visibility = bas.style.visibility = 'visible';
      const yon = Math.sign(y - y0), hb = Math.min(16, uz * 0.6), hw = Math.max(8, hb * 0.55);
      koy(govde, [ax, y0], [ax, y - yon * hb * 0.8]);
      bas.setAttribute('d', `M${ax},${y} L${ax - hw},${y - yon * hb} L${ax + hw},${y - yon * hb} Z`);
      yz.setAttribute('y', ust ? Math.min(y0, y) - 24 : (y0 + y) / 2 + 9);
    };
    ciz(y0);
    gizle(g);
    return {
      g,
      orta() { return [ax, (y0 + y1) / 2]; },
      async goster(c2, metin, ms = 500) {
        y1 = f.nokta(ad)[1]; yz.textContent = metin; g.style.opacity = 1;
        await c2.tween(ms, (e) => ciz(lerp(y0, y1, e)), ease.out);
      },
    };
  }

  function esitCizgi(c, p, f) {
    const g = c.S('g', {}, p), l = cizgi(c, g, [0, 0], [0, 0], RENK.sicaklik, 2);
    const ciz = () => { const a = f.nokta('dis.termometre'), b = f.nokta('ic.termometre'); koy(l, [a[0] + 5, a[1]], [b[0] - 5, b[1]]); };
    ciz(); gizle(g);
    return { g, ciz };
  }

  function temasOku(c, p, f) {
    const o = window.KIT_A.isiOku(c, p, [0, 0], [40, 0]);
    const izle = () => { const [x, y] = f.nokta('temas'), [dx] = f.nokta('dis.termometre'); o.ciz([x - 4, y], [dx + 12, y]); };
    izle();
    return { g: o.g, izle };
  }

  function yalitim(c, p, x, y, w, h, o = {}) {
    const g = c.S('g', {}, p);
    c.S('rect', { x, y, width: w, height: h, rx: 14, fill: 'none', stroke: RENK.gri, 'stroke-width': 3, 'stroke-dasharray': '12 9' }, g);
    const t = yazi(c, g, o.tx == null ? x + w - 24 : o.tx, o.ty == null ? y + 38 : o.ty, 'yalıtılmış', { size: 24, kalin: 600, renk: RENK.soluk, hiza: o.hiza || 'end' });
    return { g, yazi: t };
  }

  function sicaklikSatiri(c, p, o) {
    const g = c.S('g', {}, p), konum = (T) => o.x + o.w * (T - o.min) / (o.max - o.min);
    cizgi(c, g, [o.x, o.y], [o.x + o.w, o.y], RENK.gri, 4);
    o.uclar.forEach((u) => {
      const ux = konum(u.T);
      c.S('circle', { cx: ux, cy: o.y, r: 13, fill: RENK.koyu, stroke: u.renk || RENK.cizgi, 'stroke-width': 4 }, g);
      yazi(c, g, ux, o.y - 28, u.T + ' °C', { size: 24, kalin: 700, renk: RENK.sicaklik });
      yazi(c, g, ux, o.y + 44, u.ad, { size: 24, kalin: 600, renk: RENK.soluk });
    });
    const nokta = c.S('circle', { cx: konum(o.min), cy: o.y, r: 10, fill: RENK.sicaklik }, g);
    const ad = yazi(c, g, konum(o.min), o.y + 44, 'denge', { size: 24, kalin: 700 });
    gizle(nokta, ad);
    let simdi = null;
    return {
      g, konum,
      async denge(c2, T, ms = 800) {
        const x1 = konum(T), x0 = simdi == null ? x1 : simdi;
        const ilk = simdi == null; simdi = x1;
        if (ilk) { nokta.setAttribute('cx', x1); ad.setAttribute('x', x1); await belir(c2, [nokta, ad], 350); return; }
        await c2.tween(ms, (e) => { const x = lerp(x0, x1, e); nokta.setAttribute('cx', x); ad.setAttribute('x', x); }, ease.inOut);
      },
    };
  }

  function deneyTablosu(c, p, o) {
    const g = c.S('g', {}, p), h = o.h || 56, bas = o.bas || 76, size = o.size || 24, w = o.w || [90, 90, 90, 130, 130, 150];
    const W = w.reduce((s, v) => s + v, 0);
    const basliklar = ['Madde', 'Kütle', 'Öz ısı', ['İlk', 'sıcaklık'], ['Son', 'sıcaklık'], ['Sıcaklık', 'değişimi']];
    kutu(c, g, o.x, o.y, W, bas + h * o.satir, { rx: 10 });
    const xs = []; let x = o.x;
    w.forEach((v) => { xs.push(x + v / 2); x += v; });
    basliklar.forEach((b, j) => {
      const satirlar = Array.isArray(b) ? b : [b], ilk = o.y + bas / 2 - (satirlar.length - 1) * (size - 2) * 0.62 + (size - 2) * 0.36;
      satirlar.forEach((s, k) => yazi(c, g, xs[j], ilk + k * (size - 2) * 1.24, s, { size: size - 2, kalin: 700 }));
    });
    cizgi(c, g, [o.x, o.y + bas], [o.x + W, o.y + bas], RENK.kenarlik, 2);
    const satirlar = [];
    for (let i = 0; i < o.satir; i++) {
      const sg = c.S('g', {}, g), y = o.y + bas + h * i;
      const zemin = c.S('rect', { x: o.x + 3, y: y + 3, width: W - 6, height: h - 6, rx: 7, fill: RENK.sicaklik, 'fill-opacity': 0 }, sg);
      const hucreler = w.map((_, j) => yazi(c, sg, xs[j], y + h / 2 + size * 0.36, '', { size, kalin: 600 }));
      gizle(sg); satirlar.push({ g: sg, zemin, hucreler });
    }
    return {
      g, satirlar,
      yaz(i, j, metin, renk) { const t = satirlar[i].hucreler[j]; t.textContent = metin; if (renk) t.style.fill = renk; },
      goster(i, ms = 350) { return belir(c, satirlar[i].g, ms); },
      vurgula(i, acik = true) { satirlar[i].zemin.setAttribute('fill-opacity', acik ? 0.14 : 0); },
    };
  }

  return { halo, okuma, etiket, degisim, esitCizgi, temasOku, yalitim, sicaklikSatiri, deneyTablosu };
})();
