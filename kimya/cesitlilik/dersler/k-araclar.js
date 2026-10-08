/* Konu K (Viskozite) çizim araçları: window.KIT_K. kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Bu konuda yük çizilmez; renk yalnızca hidrojen bağı (yeşil kesikli çizgi) ve vurgu içindir.
   Sıvılar nötr açık tonlardadır (renk anlam taşımaz; mavi, turuncu, yeşil ve kırmızı sıvıya verilmez). Seçili şeyi kalın çerçeve işaretler.
   Sayısal değer yalnızca viskozite tablosunda (senaryodaki tek tablo) ve K2'de tüpün şekilden okunan bölme sayısındadır;
   leke büyüklüğü ve kayma hızı yalnızca sıra taşır (sayı yazılmaz).
   Tablo satırları tek <text> içinde sütun başına <tspan> olarak kurulur (sütunlar x ile hizalanır).
   Araçlar:
     buret(c, p, o)          özdeş büret, musluk, sıvı düzeyi, altında yere düşen leke; ac(ms) musluğu açıp kapatır
     lekeIkon(c, p, x, y, sira, dizi)  büyüklük sırasını taşıyan küçük leke
     kap(c, p, o)            eğilen kap: su hızlı, bal yavaş akar (K1 sahne 2)
     yapi(c, p, o)           sıvının yapı formülü; vurgula() OH çerçevelerini ve sayı rozetini açar
     viskTablo(c, p, o)      sıvı · (leke) · viskozite tablosu; başlıkta birim
     kayma(c, p, o)          sıvı kesiti: iki katman molekül, hidrojen bağı çizgileri, üst katmanın kayması
     bisiklet(c, p, o)       el frenli bisiklet (fren sıkı: ok kısa)
     tup(c, p, o)            özdeş deney tüpü, 10 bölme, sıvı yüzeyi 2. çizgide, çelik bilye
     sayac(c, p, x, y)       0'dan 10 s'ye sayar
     termometre(c, p, x, y, k)
     deneyTablosu(c, p, o)   Tüp · Sıvı · Sıcaklık · Bilyenin yolu (bölme, cm)
     yolGrafik(c, p, o)      sıcaklık – bilyenin yolu dağılım grafiği (üç sıvı, üç işaret)
     kartTahtasi(c, p, o)    iki kutulu sınıflandırma tahtası (sinifla ile) */
window.KIT_K = (() => {
  'use strict';
  const { RENK, rastgele, yazi, cizgi, kutu, gizle, belir, par, ok } = window.KIT;
  const { ease, lerp, clamp } = Ders;

  /* ---- renkler ---- */
  const GRI = { molekul: '#c9cfe0', alt: '#9aa4c4', cam: '#6b78b0', koyu: '#8a93ad', bilye: '#a3acc2', kenar: '#2a345f' };
  /* Her sıvı ayrı açık ton (renk anlam taşımaz). */
  const SIVI = {
    su: '#b9cbc4', etil: '#d9d1bb', propanol: '#d8c6ce', propilalkol: '#d8c6ce', etilenglikol: '#c9c4de',
    gliserin: '#ddd49c', propilenglikol: '#cdbfd0', zeytinyagi: '#cdc38a', bal: '#dbbd72',
  };
  const virgul = (n) => String(n).replace('.', ',');
  const sinir = (v, a, b) => Math.max(a, Math.min(b, v));
  let KIMLIK = 0;

  /* ---- yazı yardımcıları ---- */
  /* Sayı + birim tek öğe olarak okunur: ('25', '°C') → "25 °C". */
  const sb = (c, p, x, y, sayi, birim, o = {}) => {
    const t = yazi(c, p, x, y, '', o);
    t.sayi = c.S('tspan', { text: sayi }, t);
    if (birim) c.S('tspan', { text: birim, dx: o.dx == null ? 5 : o.dx, 'font-size': o.bsize || Math.max(18, Math.round((o.size || 26) * 0.72)), style: 'fill:' + (o.brenk || RENK.soluk) }, t);
    return t;
  };
  /* Tek <text> içinde sütunlara yerleşen tspan'lar. hucreler: [{ x, hiza, m, renk, size, kalin }]. */
  const sutunSatiri = (c, p, y, hucreler, o = {}) => {
    const t = c.S('text', { x: 0, y, 'font-size': o.size || 22, 'font-weight': o.kalin || 600, style: 'fill:' + (o.renk || RENK.yazi) }, p);
    const h = hucreler.map((q) => {
      const ts = c.S('tspan', { x: q.x, 'text-anchor': q.hiza || 'middle' }, t);
      if (q.m != null) ts.textContent = q.m;
      if (q.renk) ts.style.fill = q.renk;
      if (q.size) ts.setAttribute('font-size', q.size);
      if (q.kalin) ts.setAttribute('font-weight', q.kalin);
      return ts;
    });
    return { t, h };
  };

  /* "20 °C · 10⁻³ Pa·s": boşluksuz, tspan aralıklarıyla tek öğe (tablo başlığındaki birim). */
  const birimYaz = (c, p, x, y, hiza, size = 20, renk = RENK.soluk) => {
    const t = c.S('text', { x, y, 'text-anchor': hiza || 'start', 'font-size': size, 'font-weight': 600, style: 'fill:' + renk }, p);
    c.S('tspan', { text: '20' }, t); c.S('tspan', { text: '°C', dx: 3 }, t); c.S('tspan', { text: '·', dx: 7 }, t);
    window.Ders.mathText(c.S('tspan', { dx: 7 }, t), '10^{−3}');
    c.S('tspan', { text: 'Pa·s', dx: 5, dy: '0.385em' }, t);
    return t;
  };

  /* "1 bölme = 2 cm": tspan aralıklarıyla tek öğe (ölçek etiketi). */
  const olcekYaz = (c, p, x, y, size = 26, hiza = 'middle') => {
    const t = yazi(c, p, x, y, '', { size, kalin: 700, hiza });
    ['1', 'bölme', '=', '2', 'cm'].forEach((m, i) => c.S('tspan', { text: m, dx: i ? 7 : 0 }, t));
    return t;
  };

  /* ---- leke ---- */
  /* Büyüklük sırası → görece boyut. Yalnızca sıra taşır; sayı yazılmaz. */
  const OLCEK = { iki: [1, 0.42], uc: [1, 0.64, 0.34], bes: [1, 0.93, 0.86, 0.46, 0.24] };
  const lekeOlcek = (sira, dizi) => (OLCEK[dizi || 'bes'][sira - 1] || 0.3);
  function lekeIkon(c, p, x, y, sira, dizi, R = 40) {
    const rx = R * lekeOlcek(sira, dizi), ry = rx * 0.3;
    return c.S('ellipse', { cx: x, cy: y, rx, ry, fill: GRI.molekul, 'fill-opacity': 0.8 }, p);
  }

  /* ---- büret ----
     o: { x, zemin, k, ad (metin ya da satır dizisi), ton, duzey (0–1), leke (1–5), dizi ('iki'|'uc'|'bes'), adSize }
     Dönen: { g, ac(ms), yaricap(ms), seviye, cerceve(açık) , gizleLeke } */
  function buret(c, p, o) {
    const k = o.k || 1, x = o.x, zemin = o.zemin || 470, W = 44 * k, H = 190 * k;
    const uc = zemin - 70 * k, alt = uc - 34 * k, ust = alt - H, ton = o.ton || SIVI.su;
    const g = c.S('g', {}, p);
    let duzey = o.duzey == null ? 0.92 : o.duzey;
    const olcek = lekeOlcek(o.leke || 3, o.dizi), Rmax = 72 * k;
    // sıvı: tüp içi + huni
    const sivi = c.S('rect', { x: x - W / 2 + 1.5, y: alt - H * duzey, width: W - 3, height: H * duzey, fill: ton, 'fill-opacity': 0.92 }, g);
    c.S('path', { d: `M${x - W / 2 + 1.5},${alt} L${x + 5 * k},${alt + 20 * k} L${x - 5 * k},${alt + 20 * k} L${x + W / 2 - 1.5},${alt} Z`, fill: ton, 'fill-opacity': 0.92 }, g);
    // cam gövde ve huni
    c.S('path', { d: `M${x - W / 2},${ust} L${x - W / 2},${alt} L${x - 5 * k},${alt + 20 * k} L${x - 5 * k},${uc} L${x + 5 * k},${uc} L${x + 5 * k},${alt + 20 * k} L${x + W / 2},${alt} L${x + W / 2},${ust}`, fill: 'none', stroke: GRI.cam, 'stroke-width': 3 * Math.max(0.8, k), 'stroke-linejoin': 'round' }, g);
    // musluk kolu: kapalıyken yatay, açıkken dikey
    const kol = c.S('g', {}, g), my = alt + 11 * k;
    cizgi(c, kol, [x - 16 * k, my], [x + 16 * k, my], RENK.cizgi, 5 * Math.max(0.8, k));
    c.S('circle', { cx: x, cy: my, r: 5 * k, fill: RENK.cizgi }, kol);
    const kolDondur = (a) => kol.setAttribute('transform', `rotate(${a} ${x} ${my})`);
    // akış ve leke
    const akis = cizgi(c, g, [x, uc], [x, uc], ton, 5 * k);
    const leke = c.S('ellipse', { cx: x, cy: zemin + 15 * k, rx: 0, ry: 0, fill: ton, 'fill-opacity': 0.95 }, g);
    const yar = cizgi(c, g, [x, zemin + 15 * k], [x, zemin + 15 * k], GRI.kenar, 2.5, { 'stroke-dasharray': '4 5' });
    yar.style.opacity = 0;
    // ad
    const adlar = Array.isArray(o.ad) ? o.ad : (o.ad ? [o.ad] : []);
    const asz = o.adSize || 24, adG = c.S('g', {}, g);
    adlar.forEach((s, i) => yazi(c, adG, x, ust - 14 - (adlar.length - 1 - i) * (asz + 4), s, { size: asz, kalin: 700 }));
    const cerceve = c.S('rect', { x: x - W / 2 - 16 * k, y: ust - 12 - adlar.length * (asz + 4), width: W + 32 * k, height: zemin - ust + 70 * k + adlar.length * (asz + 4), rx: 12, fill: 'none', stroke: RENK.yazi, 'stroke-width': 4 }, g);
    cerceve.style.opacity = 0;
    const lekeBoyut = (e) => {
      const rx = Rmax * olcek * e;
      leke.setAttribute('rx', rx); leke.setAttribute('ry', rx * 0.3);
      return rx;
    };
    const duzeyAyarla = (d) => { duzey = d; sivi.setAttribute('y', alt - H * d); sivi.setAttribute('height', H * d); };
    const inme = 0.34 * olcek;
    let acik = false;
    return {
      g, adG, cerceve, x, zemin, leke, lekeBoyut, duzeyAyarla,
      get acildi() { return acik; },
      /* Musluk açılır, sabit süre sonra kapanır; leke büyür, düzey iner. */
      async ac(ms = 2200) {
        if (acik) return; acik = true;
        const d0 = duzey;
        await c.tween(260, (e) => kolDondur(90 * e));
        await c.tween(ms, (e) => {
          akis.setAttribute('y2', lerp(uc, zemin, Math.min(1, e * 6)));
          akis.setAttribute('x2', x);
          akis.style.opacity = e < 0.97 ? 1 : 0;
          lekeBoyut(e); duzeyAyarla(d0 - inme * e);
        }, ease.linear);
        akis.style.opacity = 0;
        await c.tween(220, (e) => kolDondur(90 * (1 - e)));
      },
      yaricap(ms = 400) {
        const rx = Rmax * olcek, yy = zemin + 15 * k;
        yar.setAttribute('x2', x + rx); yar.setAttribute('y2', yy);
        return belir(c, yar, ms, 1);
      },
      vurgu(acikMi, ms = 250) { return belir(c, cerceve, ms, acikMi ? 1 : 0); },
    };
  }

  /* ---- eğilen kap (K1 sahne 2) ----
     o: { x, y (kabın sağ alt köşesi = dönme noktası), zemin, ton, akisMs (akışın zemine ulaşma süresi), kalin (akış kalınlığı), havuz (zemindeki birikinti en çok yarıçap) }
     egil(ms): kap eğilir, akış zemine uzanır. */
  function kap(c, p, o) {
    const g = c.S('g', {}, p), px = o.x, py = o.y, kk = o.k || 1, GEN = 110 * kk, YUK = 120 * kk, SEV = 0.7 * YUK, id = 'kap' + (++KIMLIK);
    const defs = c.S('defs', {}, g), cp = c.S('clipPath', { id }, defs);
    const cr = c.S('rect', { x: -GEN + 2, y: -YUK, width: GEN - 4, height: YUK - 2 }, cp);
    const sg = c.S('g', { 'clip-path': `url(#${id})` }, g);
    c.S('rect', { x: px - 320, y: py - SEV, width: 640, height: 400, fill: o.ton, 'fill-opacity': 0.92 }, sg);
    const akis = cizgi(c, g, [px, py], [px, py], o.ton, o.kalin || 8);
    akis.style.opacity = 0;
    const havuz = c.S('ellipse', { cx: px + 60, cy: o.zemin + 12, rx: 0, ry: 0, fill: o.ton, 'fill-opacity': 0.95 }, g);
    const govde = c.S('g', {}, g);
    c.S('path', { d: `M${-GEN},${-YUK} L${-GEN},0 L0,0 L0,${-YUK}`, fill: 'none', stroke: GRI.cam, 'stroke-width': 4, 'stroke-linejoin': 'round' }, govde);
    const duzenle = (a) => {
      govde.setAttribute('transform', `translate(${px},${py}) rotate(${a})`);
      cr.setAttribute('transform', `translate(${px},${py}) rotate(${a})`);
      // cr, clipPath içinde dünya koordinatındadır: yerel dikdörtgen kap ile birlikte döner
    };
    // clipPath içindeki dikdörtgen kap koordinatında yazıldı; dünya dönüşümü transform ile verilir.
    duzenle(0);
    const dur = o.akisMs || 600;
    return {
      g, havuz,
      async egil(ms = 4200, bekle = 0) {
        let tBas = null;
        await c.tween(ms, (e, t) => {
          const tt = t * ms, a = 56 * ease.inOut(Math.min(1, tt / 1100));
          duzenle(a);
          const r = (a * Math.PI) / 180, lx = px + YUK * Math.sin(r), ly = py - YUK * Math.cos(r);
          if (a >= 46) {
            if (tBas == null) tBas = tt;
            const pr = sinir((tt - tBas) / dur, 0, 1);
            akis.style.opacity = 1;
            akis.setAttribute('x1', lx); akis.setAttribute('y1', ly); akis.setAttribute('x2', lx + 8); akis.setAttribute('y2', lerp(ly, o.zemin, pr));
            if (pr >= 1) {
              const hh = sinir((tt - tBas - dur) / 1400, 0, 1);
              const rx = (o.havuz || 60) * ease.out(hh);
              havuz.setAttribute('cx', lx + 8); havuz.setAttribute('rx', rx); havuz.setAttribute('ry', rx * 0.28);
            }
          }
        }, ease.linear);
      },
    };
  }

  /* ---- yapı formülü ----
     o: { x, y (ana satırın taban çizgisi), sivi, size, rozetY }. Formül tek satır metindir; OH grupları çerçevelenir (vurgula ile açılır). */
  const YAPI = {
    su: { ad: 'su', p: [['H', 'H'], ['OH', 'OH', 'ic']] },
    etil: { ad: 'etil alkol', p: [['CH_{3}', 'CH3'], ['CH_{2}', 'CH2'], ['OH', 'OH', 'ic']] },
    propanol: { ad: 'propanol', p: [['CH_{3}', 'CH3'], ['CH_{2}', 'CH2'], ['CH_{2}', 'CH2'], ['OH', 'OH', 'ic']] },
    etilenglikol: { ad: 'etilen glikol', p: [['CH_{2}', 'CH2', 'alt'], ['CH_{2}', 'CH2', 'alt']] },
    gliserin: { ad: 'gliserin', p: [['CH_{2}', 'CH2', 'alt'], ['CH', 'CH', 'alt'], ['CH_{2}', 'CH2', 'alt']] },
    propilenglikol: { ad: 'propilen glikol', p: [['CH_{3}', 'CH3'], ['CH', 'CH', 'alt'], ['CH_{2}', 'CH2', 'alt']] },
  };
  YAPI.propilalkol = YAPI.propanol;
  function yapi(c, p, o) {
    const T = YAPI[o.sivi], size = o.size || 30, g = c.S('g', {}, p);
    const math = T.p.map((q) => q[0]).join('–'), duz = T.p.map((q) => q[1]).join('–');
    const ana = yazi(c, g, o.x, o.y, math, { size, kalin: 700, math: true });
    // her parçanın duz içindeki karakter aralığı
    let bas = 0; const aralik = T.p.map((q) => { const a = [bas, bas + q[1].length - 1]; bas += q[1].length + 1; return a; });
    const olc = (i0, i1) => {
      try {
        const s = ana.getStartPositionOfChar(i0).x, e = ana.getEndPositionOfChar(i1).x;
        if (isFinite(s) && isFinite(e) && e > s) return [s, e];
      } catch (_) { /* ölçülemezse yaklaşık değer */ }
      const w = size * 0.62, tam = duz.length * w, sol = o.x - tam / 2;
      return [sol + i0 * w, sol + (i1 + 1) * w];
    };
    const cerceveler = [], sayi = T.p.filter((q) => q[2]).length;
    T.p.forEach((q, i) => {
      if (!q[2]) return;
      const [s, e] = olc(aralik[i][0], aralik[i][1]);
      if (q[2] === 'ic') {
        cerceveler.push(c.S('rect', { x: s - 7, y: o.y - size * 0.86, width: e - s + 14, height: size * 1.12, rx: 7, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.5 }, g));
      } else {
        const cx = (s + e) / 2, oy = o.y + size * 2.15;
        cizgi(c, g, [cx, o.y + size * 0.34], [cx, oy - size * 0.95], RENK.cizgi, 3);
        const t = yazi(c, g, cx, oy, 'OH', { size, kalin: 700 });
        cerceveler.push(c.S('rect', { x: cx - size * 0.8, y: oy - size * 0.86, width: size * 1.6, height: size * 1.12, rx: 7, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3.5 }, g));
        t.dataset.oh = 1;
      }
    });
    cerceveler.forEach((r) => { r.style.opacity = 0; });
    // sayı rozeti
    const ry = o.rozetY == null ? o.y + size * (T.p.some((q) => q[2] === 'alt') ? 3.5 : 1.7) : o.rozetY;
    const rozet = c.S('g', {}, g);
    c.S('circle', { cx: o.x, cy: ry, r: 19, fill: '#10162b', stroke: RENK.vurgu, 'stroke-width': 3 }, rozet);
    yazi(c, rozet, o.x, ry + 8, String(sayi), { size: 24, kalin: 700, renk: RENK.vurgu });
    rozet.style.opacity = 0;
    return {
      g, ana, cerceveler, rozet, sayi, ad: T.ad,
      vurgula(ms = 450) { return par(belir(c, cerceveler, ms, 1), belir(c, rozet, ms, 1)); },
      soluk(ms = 300, d = 0.2) { return belir(c, [g], ms, d); },
    };
  }

  /* ---- viskozite tablosu ----
     o: { x, y, w, leke (Leke sütunu olsun mu), size, sat }
     Dönen: { g, satirlar, satir(ad, deger, leke), yaz(i, 'deger'|'leke', metin), goster(i, ms), vurgu(i, açık) }
     Başlıkta birim yazılıdır: "Viskozite · 20 °C · 10⁻³ Pa·s". */
  function viskTablo(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 420, sz = o.size || 24, SAT = o.sat || 44;
    const xa = o.x + 16, xl = o.x + W * 0.55, xd = o.x + W - 16;
    const bas = sutunSatiri(c, g, o.y + 26, [{ x: xa, hiza: 'start', m: 'Sıvı' }, { x: xl, m: o.leke ? 'Leke' : '' }, { x: xd, hiza: 'end', m: 'Viskozite' }], { size: 22, renk: RENK.soluk });
    // birim satırı: 20 °C · 10⁻³ Pa·s (boşluksuz, tspan aralıklarıyla tek öğe)
    const ub = birimYaz(c, c.S('g', {}, g), xd, o.y + 54, 'end');
    cizgi(c, g, [o.x, o.y + 64], [o.x + W, o.y + 64], GRI.cam, 2);
    const degerBas = bas.h[2], birimG = ub.parentNode;
    if (o.degerYok) { degerBas.style.fillOpacity = 0; birimG.style.opacity = 0; }
    const satirlar = [], ogeler = [];
    return {
      g,
      satirlar,
      /* Viskozite sütununun başlığını (ve birimi) açar. */
      degerBasligi(ms = 450) { degerBas.style.fillOpacity = 1; return belir(c, birimG, ms, 1); },
      /* Satır ekler (gizli); hücreler sonradan yaz() ile dolar. */
      satir(ad, deger, leke) {
        const i = satirlar.length, y = o.y + 64 + SAT * (i + 0.5) + 8, e = c.S('g', {}, g);
        const fon = c.S('rect', { x: o.x - 4, y: y - SAT / 2 - 4, width: W + 8, height: SAT - 2, rx: 8, fill: RENK.vurgu, 'fill-opacity': 0 }, e);
        const sr = sutunSatiri(c, e, y + 8, [{ x: xa, hiza: 'start', m: ad }, { x: xl, m: '' }, { x: xd, hiza: 'end', m: '', renk: RENK.vurgu, kalin: 700 }], { size: sz });
        satirlar.push({ ad, deger, leke }); ogeler.push({ e, fon, sr });
        e.style.opacity = 0;
        return i;
      },
      yaz(i, tur, metin) {
        const sr = ogeler[i].sr, h = tur === 'leke' ? sr.h[1] : sr.h[2];
        h.textContent = metin == null ? (tur === 'leke' ? satirlar[i].leke : satirlar[i].deger) : metin;
      },
      goster(i, ms = 400) { return belir(c, ogeler[i].e, ms, 1); },
      vurgu(i, acik) { ogeler[i].fon.setAttribute('fill-opacity', acik ? 0.2 : 0); },
      yukseklik: () => 64 + SAT * satirlar.length,
    };
  }

  /* ---- sıvı kesiti: iki katman molekül ----
     o: { x, y, w, h, n, bag (0–3), hiz ('yavas'|'orta'|'hizli'), guc ('guclu'|'zayif'), etiket (ok altında "kayma" yazısı) }
     Üst katman kay(ms) ile sağa kayar. Hareket uzunluğu yalnızca hız düzeyini taşır. */
  const KAYMA = { yavas: 12, orta: 30, hizli: 50 }, OKUZ = { yavas: 26, orta: 62, hizli: 104 };
  function kayma(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 310, H = o.h || 200, n = o.n || 5, sp = 48, r = 13;
    kutu(c, g, o.x, o.y, W, H, { rx: 14 });
    const x0 = o.x + 36, yU = o.y + H * 0.46, yL = o.y + H * 0.78, S = KAYMA[o.hiz || 'orta'];
    const bagIdx = { 0: [], 1: [2], 2: [1, 3], 3: [0, 2, 4] }[o.bag || 0];
    const zayif = o.guc === 'zayif';
    const bagG = c.S('g', {}, g), bagl = bagIdx.map((i) => cizgi(c, bagG, [x0 + i * sp, yU + r], [x0 + i * sp, yL - r], RENK.cekme, zayif ? 2 : 5.5, zayif ? { 'stroke-dasharray': '3 12', 'stroke-opacity': 0.75 } : { 'stroke-dasharray': '7 6' }));
    const iz = [], ust = [], alt = [];
    for (let i = 0; i < n; i++) {
      iz.push(cizgi(c, g, [x0 + i * sp, yU], [x0 + i * sp, yU], GRI.koyu, 3, { 'stroke-opacity': 0.55 }));
    }
    for (let i = 0; i < n; i++) alt.push(c.S('circle', { cx: x0 + i * sp, cy: yL, r, fill: GRI.alt }, g));
    for (let i = 0; i < n; i++) ust.push(c.S('circle', { cx: x0 + i * sp, cy: yU, r, fill: GRI.molekul }, g));
    // itme oku
    const L = OKUZ[o.hiz || 'orta'], ya = o.y + H * 0.2;
    const itme = ok(c, g, [x0 - r, ya], [x0 - r + L, ya], RENK.yazi, 4);
    let etiket = null;
    if (o.etiket) etiket = yazi(c, g, x0 - r + Math.max(L, 80) / 2, ya - 14, 'kayma', { size: 20, kalin: 600, renk: RENK.soluk });
    const koyKayma = (d) => {
      ust.forEach((m, i) => m.setAttribute('cx', x0 + i * sp + d));
      iz.forEach((t, i) => { t.setAttribute('x2', x0 + i * sp + d - r * (d > 0.5 ? 1 : 0)); });
      bagl.forEach((b, j) => b.setAttribute('x1', x0 + bagIdx[j] * sp + d));
    };
    koyKayma(0);
    return {
      g, bagG, itme, etiket,
      kay(ms = 1800) { return c.tween(ms, (e) => koyKayma(S * e), ease.out); },
      sifirla() { koyKayma(0); },
    };
  }

  /* ---- bisiklet ---- */
  function bisiklet(c, p, o) {
    const g = c.S('g', {}, p), x = o.x, y = o.y, R = 48, kol = RENK.cizgi;
    const ar = [x - 78, y], on = [x + 78, y], bb = [x - 6, y], koltuk = [x - 34, y - 76], gidon = [x + 56, y - 82];
    [ar, on].forEach((q) => { c.S('circle', { cx: q[0], cy: q[1], r: R, fill: 'none', stroke: GRI.koyu, 'stroke-width': 5 }, g); c.S('circle', { cx: q[0], cy: q[1], r: 4, fill: GRI.koyu }, g); });
    [[ar, bb], [ar, koltuk], [koltuk, bb], [koltuk, gidon], [bb, gidon], [gidon, on]].forEach(([a, b]) => cizgi(c, g, a, b, kol, 5));
    cizgi(c, g, [koltuk[0] - 12, koltuk[1] - 6], [koltuk[0] + 12, koltuk[1] - 6], kol, 7);
    cizgi(c, g, gidon, [gidon[0] + 14, gidon[1] - 16], kol, 5);
    cizgi(c, g, [gidon[0] + 14, gidon[1] - 16], [gidon[0] + 32, gidon[1] - 16], kol, 5);
    // el freni: kol, kablo, balata
    const kolBas = [gidon[0] + 30, gidon[1] - 12], kolSon = [gidon[0] + 18, gidon[1] + 2];
    cizgi(c, g, kolBas, kolSon, RENK.vurgu, 6);
    const rim = [on[0] + 6, on[1] - R];
    cizgi(c, g, kolSon, [rim[0] + 2, rim[1] - 6], RENK.vurgu, 2.5, { 'stroke-dasharray': '3 5' });
    const balata = c.S('rect', { x: rim[0] - 8, y: rim[1] - 11, width: 16, height: 9, rx: 3, fill: RENK.vurgu }, g);
    c.S('circle', { cx: (kolBas[0] + kolSon[0]) / 2, cy: (kolBas[1] + kolSon[1]) / 2, r: 17, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 2.5 }, g);
    const fren = o.fren !== false;
    if (!fren) balata.style.opacity = 0.25;
    const uz = fren ? 44 : 170, ya = y - R - 86;
    ok(c, g, [x - 80, ya], [x - 80 + uz, ya], RENK.yazi, 5);
    return { g };
  }

  /* ---- deney tüpü ----
     o: { x, y (üst), k, ton, sic ('25'), bolme (bilyenin yolu), dibe, etiket (satırlar) }
     Tüp 10 bölmelidir (üstten sayılır); sıvı yüzeyi 2. çizgidedir; dip yarım bölme aşağıdadır.
     Bilye başlangıçta yüzeydedir (yol 0). */
  function tup(c, p, o) {
    const k = o.k || 1, b = 34 * k, Wt = 54 * k, rr = Wt / 2, x = o.x, y0 = o.y;
    const ys = y0 + 2 * b, dip = y0 + 10.5 * b, R = 0.3 * b, dibeBolme = (dip - R - ys) / b;
    const g = c.S('g', {}, p);
    const yol = `M${x - rr},%Y L${x - rr},${dip - rr} A${rr},${rr} 0 0 0 ${x + rr},${dip - rr} L${x + rr},%Y`;
    const sivi = c.S('path', { d: yol.replace(/%Y/g, ys) + ' Z', fill: o.ton || SIVI.su, 'fill-opacity': 0.92 }, g);
    c.S('path', { d: yol.replace(/%Y/g, y0), fill: 'none', stroke: GRI.cam, 'stroke-width': 3 * Math.max(0.8, k), 'stroke-linejoin': 'round' }, g);
    cizgi(c, g, [x - rr - 6, y0], [x + rr + 6, y0], GRI.cam, 3 * Math.max(0.8, k));
    const tikler = [];
    for (let i = 0; i <= 10; i++) tikler.push(cizgi(c, g, [x + rr + 8, y0 + i * b], [x + rr + 8 + (i % 5 === 0 ? 22 : 15) * k, y0 + i * b], RENK.ince, 2.5));
    const bilye = c.S('g', {}, g);
    c.S('circle', { cx: 0, cy: 0, r: R, fill: GRI.bilye, stroke: '#4a557f', 'stroke-width': 2 }, bilye);
    c.S('circle', { cx: -R * 0.3, cy: -R * 0.3, r: R * 0.28, fill: '#e3e7f3', 'fill-opacity': 0.8 }, bilye);
    const yAt = (bolme) => ys + bolme * b;
    const konum = (bolme) => bilye.setAttribute('transform', `translate(${x},${yAt(bolme)})`);
    konum(0);
    let etiketG = null, sicT = null;
    const lines = Array.isArray(o.etiket) ? o.etiket : (o.etiket ? [o.etiket] : []);
    if (lines.length) {
      etiketG = c.S('g', {}, g);
      lines.forEach((s, i) => yazi(c, etiketG, x, y0 - 16 - (lines.length - 1 - i) * 28, s, { size: o.esize || 24, kalin: 700 }));
    }
    if (o.sic != null) sicT = sb(c, g, x, dip + 38 * k + 6, String(o.sic), '°C', { size: 24, kalin: 700, bsize: 20, dx: 3, brenk: RENK.yazi });
    const hedef = o.dibe ? dibeBolme : o.bolme;
    let isG = null;
    return {
      g, x, y0, b, rr, ys, dip, tikler, R, dibeBolme, yAt, konum, etiketG, sicT, sivi, bilye,
      hedefBolme: hedef,
      ton(t) { sivi.setAttribute('fill', t); },
      sicaklik(v) { if (sicT) sicT.sayi.textContent = String(v); },
      /* Bilye yüzeyden iner; ms süresince yolunu alır (bolme verilmezse tüpün hedefi). dibe ise 0,65 sürede dibe ulaşır. */
      birak(ms = 3000, bolme, dibe) {
        const db = dibe != null ? dibe : (bolme == null && o.dibe);
        const son = db ? dibeBolme : (bolme != null ? bolme : (hedef == null ? 0 : hedef));
        return c.tween(ms, (e, t) => konum(son * (db ? Math.min(1, t / 0.65) : t)), ease.linear);
      },
      /* Yolu ölçekte işaretler: yüzeyden bilyeye ok, aradan geçilen bölme çizgileri vurgulanır. */
      isaret(bolme, ms = 500) {
        if (isG) isG.remove();
        const son = bolme != null ? bolme : hedef, yb = yAt(son), xb = x + rr + 8 + 36 * k;
        isG = c.S('g', {}, g);
        tikler.forEach((t, i) => t.setAttribute('stroke', (i >= 2 && y0 + i * b <= yb + 0.5) ? RENK.vurgu : RENK.ince));
        cizgi(c, isG, [xb - 4, ys], [xb + 8, ys], RENK.vurgu, 3);
        ok(c, isG, [xb, ys], [xb, yb], RENK.vurgu, 4);
        yazi(c, isG, xb + 12, (ys + yb) / 2 + 7, 'yol', { hiza: 'start', size: 22, kalin: 700, renk: RENK.vurgu });
        isG.style.opacity = 0;
        return belir(c, isG, ms, 1);
      },
      isaretSil() { if (isG) { isG.remove(); isG = null; } tikler.forEach((t) => t.setAttribute('stroke', RENK.ince)); },
    };
  }

  /* ---- sayaç: 0'dan 10 s'ye ---- */
  function sayac(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p);
    const t = sb(c, g, x, y, '0', 's', { size: o.size || 32, kalin: 700, bsize: 24, dx: 4, brenk: RENK.yazi });
    return {
      g, t,
      git(ms = 3000) { return c.tween(ms, (e) => { t.sayi.textContent = String(Math.round(10 * e)); }, ease.linear); },
      sifirla() { t.sayi.textContent = '0'; },
    };
  }

  /* ---- termometre simgesi ---- */
  function termometre(c, p, x, y, k = 1) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: x - 6 * k, y: y - 46 * k, width: 12 * k, height: 56 * k, rx: 6 * k, fill: 'none', stroke: GRI.koyu, 'stroke-width': 3 }, g);
    c.S('circle', { cx: x, cy: y + 14 * k, r: 11 * k, fill: GRI.molekul, stroke: GRI.koyu, 'stroke-width': 3 }, g);
    c.S('rect', { x: x - 2.5 * k, y: y - 28 * k, width: 5 * k, height: 40 * k, fill: GRI.molekul }, g);
    return g;
  }

  /* ---- deney tablosu (K2): Tüp · Sıvı · Sıcaklık · Bilyenin yolu (bölme, cm) ----
     o: { x, y, w, yer (satır yuvası sayısı: satırlar numarasına göre yerleşir), satirlar: [{ no, sivi, sic, bolme, cm, dibe, bolmeGizli, cmGizli, yuva }] }
     satirEkle(s, yuva) satırı belirir; bolmeYaz(i) ve cmYaz(i) gizli hücreleri doldurur. */
  function deneyTablosu(c, p, o) {
    const g = c.S('g', {}, p), W = o.w || 440, SAT = o.sat || 44, y0 = o.y;
    const X = { no: o.x + 22, sivi: o.x + 52, sic: o.x + W * 0.63, bolme: o.x + W * 0.81, cm: o.x + W - 12 };
    sutunSatiri(c, g, y0 + 24, [{ x: X.no, m: 'Tüp' }, { x: X.sivi, hiza: 'start', m: 'Sıvı' }, { x: X.sic, m: 'Sıcaklık' }, { x: X.bolme, m: 'bölme' }, { x: X.cm, hiza: 'end', m: 'cm' }], { size: 20, renk: RENK.soluk });
    cizgi(c, g, [o.x, y0 + 36], [o.x + W, y0 + 36], GRI.cam, 2);
    const satirlar = [], ogeler = [], yuvalar = {};
    const ekle = (s, anim, yuva) => {
      const j = yuva != null ? yuva : satirlar.length, y = y0 + 36 + SAT * (j + 0.5) + 8, e = c.S('g', {}, g);
      const fon = c.S('rect', { x: o.x - 4, y: y - SAT / 2 - 3, width: W + 8, height: SAT - 2, rx: 8, fill: RENK.vurgu, 'fill-opacity': 0 }, e);
      const sr = sutunSatiri(c, e, y + 7, [
        { x: X.no, m: s.no }, { x: X.sivi, hiza: 'start', m: s.sivi },
        { x: X.sic, m: '' }, { x: X.bolme, m: s.dibe ? 'dibe ulaştı' : (s.bolmeGizli ? '' : String(s.bolme)), size: s.dibe ? 18 : 21 }, { x: X.cm, hiza: 'end', m: (s.dibe || s.cmGizli) ? '' : String(s.cm) },
      ], { size: 21 });
      sr.h[2].textContent = String(s.sic);
      c.S('tspan', { text: '°C', dx: 3, style: 'fill:' + RENK.soluk, 'font-size': 18 }, sr.h[2]);
      if (s.dibe) sr.h[3].setAttribute('x', (X.bolme + X.cm) / 2 + 4);
      const i = satirlar.length; satirlar.push(s); ogeler.push({ e, fon, sr }); yuvalar[i] = j;
      if (anim) { e.style.opacity = 0; return belir(c, e, 450, 1); }
      return Promise.resolve();
    };
    (o.satirlar || []).forEach((s) => ekle(s, false, s.yuva));
    return {
      g, satirlar, ogeler, X,
      satirEkle: (s, yuva) => ekle(s, true, yuva != null ? yuva : s.yuva),
      bolmeYaz(i, ms = 400) { const s = satirlar[i]; s.bolmeGizli = false; if (!s.dibe) ogeler[i].sr.h[3].textContent = String(s.bolme); return belir(c, ogeler[i].e, ms, 1); },
      cmYaz(i, ms = 400) {
        const s = satirlar[i];
        if (s.dibe) return Promise.resolve();
        ogeler[i].sr.h[4].textContent = String(s.cm); s.cmGizli = false;
        return belir(c, ogeler[i].e, ms, 1);
      },
      vurgu(i, acik) { ogeler[i].fon.setAttribute('fill-opacity', acik ? 0.2 : 0); },
      yukseklik: () => 36 + SAT * (o.yer || satirlar.length),
    };
  }

  /* Çok satırlı etiket tek <text> içinde: satirlar ['I', 'propil alkol', ...]; x ve y: ilk satırın tabanı. */
  const etiketBlok = (c, p, x, y, satirlar, o = {}) => {
    const t = c.S('text', { x, y, 'text-anchor': o.hiza || 'middle', 'font-size': o.size || 22, 'font-weight': o.kalin || 600, style: 'fill:' + (o.renk || RENK.yazi) }, p);
    satirlar.forEach((m, i) => {
      const dizi = Array.isArray(m), ts = c.S('tspan', { x, dy: i ? (o.aralik || 26) : 0, text: dizi ? m[0] : m }, t);
      if (dizi) c.S('tspan', { text: m[1], dx: 3, style: 'fill:' + RENK.soluk }, t);   // sayı + birim: ['25', '°C']
      if (i === 0 && o.ilkKalin) ts.setAttribute('font-weight', 700);
      if (o.renkler && o.renkler[i]) ts.style.fill = o.renkler[i];
    });
    return t;
  };

  /* ---- sıcaklık – bilyenin yolu grafiği ----
     o: { x, y, w, h (çizim alanı), seriler: [{ ad, sim ('daire'|'kare'|'ucgen'), noktalar: [[sic, cm|null]] }], legendY }
     Yatay eksen 10–65 °C, dikey eksen 0–18 cm. cm = null: bilye dibe ulaştı (yukarı oklu, etiketli).
     Aynı sıvının iki noktası ince çizgiyle birleşir; çizginin ucunda yalnızca yön oku durur; ara değer yazılmaz. */
  function yolGrafik(c, p, o) {
    const g = c.S('g', {}, p), X0 = o.x, Y0 = o.y + o.h, W = o.w, H = o.h;
    const sx = (v) => X0 + ((v - 10) / 55) * W, sy = (v) => Y0 - (v / 18) * H;
    cizgi(c, g, [X0, Y0], [X0 + W, Y0], RENK.cizgi, 3); cizgi(c, g, [X0, Y0], [X0, o.y - 6], RENK.cizgi, 3);
    [0, 6, 12, 18].forEach((v) => {
      yazi(c, g, X0 - 12, sy(v) + 7, String(v), { hiza: 'end', size: 20, kalin: 600, renk: RENK.soluk });
      if (v) cizgi(c, g, [X0, sy(v)], [X0 + W, sy(v)], GRI.cam, 1, { 'stroke-opacity': 0.35 });
    });
    [15, 25, 30, 60].forEach((v) => {
      yazi(c, g, sx(v), Y0 + 28, String(v), { size: 20, kalin: 600, renk: RENK.soluk });
      cizgi(c, g, [sx(v), Y0], [sx(v), Y0 + 7], RENK.cizgi, 2);
    });
    sb(c, g, X0 + W / 2, Y0 + 62, 'Sıcaklık', '(°C)', { size: 22, kalin: 600, brenk: RENK.yazi, bsize: 22, dx: 6 });
    const yb = yazi(c, g, X0 - 58, o.y + H / 2, 'Bilyenin yolu (cm)', { size: 22, kalin: 600 });
    yb.setAttribute('transform', `rotate(-90 ${X0 - 58} ${o.y + H / 2})`);
    const sim = (grup, tur, x, y, r = 9) => {
      const st = { fill: RENK.yazi, stroke: '#10162b', 'stroke-width': 2 };
      if (tur === 'daire') return c.S('circle', Object.assign({ cx: x, cy: y, r }, st), grup);
      if (tur === 'kare') return c.S('rect', Object.assign({ x: x - r, y: y - r, width: 2 * r, height: 2 * r }, st), grup);
      return c.S('path', Object.assign({ d: `M${x},${y - r - 2} L${x + r + 2},${y + r - 1} L${x - r - 2},${y + r - 1} Z` }, st), grup);
    };
    const seriler = o.seriler.map((s, si) => {
      const e = c.S('g', {}, g), pts = s.noktalar.map(([t, cm]) => [sx(t), sy(cm == null ? 17 : cm), cm == null]);
      if (pts.length === 2) {
        const [a, bb] = pts, d = Math.hypot(bb[0] - a[0], bb[1] - a[1]), ux = (bb[0] - a[0]) / d, uy = (bb[1] - a[1]) / d;
        ok(c, e, [a[0] + ux * 16, a[1] + uy * 16], [bb[0] - ux * 20, bb[1] - uy * 20], RENK.cizgi, 2.5);
      }
      pts.forEach(([x, y, dibe]) => {
        sim(e, s.sim, x, y);
        if (dibe) {
          ok(c, e, [x, y - 16], [x, y - 44], RENK.yazi, 3.5);
          yazi(c, e, x - 20, y - 20, 'dibe ulaştı', { hiza: 'end', size: 20, kalin: 600 });
        }
      });
      // gösterge
      const lx = o.legendX + si * (o.legendW || 190), ly = o.legendY;
      sim(e, s.sim, lx, ly, 8);
      yazi(c, e, lx + 18, ly + 7, s.ad, { hiza: 'start', size: 20, kalin: 600 });
      e.style.opacity = 0;
      return e;
    });
    const halka = (sic, cm, r = 20) => {
      const h = c.S('circle', { cx: sx(sic), cy: sy(cm == null ? 17 : cm), r, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 4 }, g);
      h.style.opacity = 0; return h;
    };
    return { g, seriler, sx, sy, halka, goster: (i, ms = 500) => belir(c, seriler[i], ms, 1), hepsi: (ms = 500) => belir(c, seriler, ms, 1) };
  }

  /* ---- iki kutulu sınıflandırma tahtası (sinifla ile birlikte) ----
     o: { kutular: [{ baslik, x, y, w, h }], ciz(k, g) (kartın çizimi), chip(k, p, x, y) (kutuya konan yazıyı çizip döndürür) } */
  function kartTahtasi(c, p, o) {
    const kg = o.kutular.map((q) => {
      const g = c.S('g', {}, p); kutu(c, g, q.x, q.y, q.w, q.h, { rx: 14 });
      yazi(c, g, q.x + q.w / 2, q.y + 38, q.baslik, { size: 24, kalin: 700 });
      return { g, n: 0 };
    });
    let kartG = null;
    return {
      kg,
      async sec(i, k) {
        kartG = c.S('g', {}, p); kartG.style.opacity = 0;
        o.ciz(k, kartG);
        await belir(c, kartG, 350, 1);
      },
      async yerlestir(i, k) {
        const q = o.kutular[k.kutu], e = kg[k.kutu], hy = q.y + 86 + e.n * 50; e.n++;
        await belir(c, kartG, 250, 0); kartG.remove(); kartG = null;
        const ch = o.chip(k, p, q.x + q.w / 2, hy);
        ch.style.opacity = 0; await belir(c, ch, 350, 1);
      },
    };
  }

  return {
    GRI, SIVI, OLCEK, virgul, sinir, sb, birimYaz, olcekYaz, sutunSatiri, lekeOlcek, lekeIkon, buret, kap, yapi, viskTablo, kayma, bisiklet,
    tup, sayac, termometre, deneyTablosu, etiketBlok, yolGrafik, kartTahtasi,
  };
})();
