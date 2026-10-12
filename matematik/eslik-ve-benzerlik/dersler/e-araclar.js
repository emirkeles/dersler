/* Konu E (Eşlik ve benzerlik problemleri) ortak çizim araçları: window.KIT_E. Sayfada kit.js (ve isteğe bağlı b-araclar.js) dosyasından sonra,
   ders dosyasından önce yüklenir. Konu E'nin dersleri bu dosyayı okuyup kullanır, değiştirmez. Noktalar [x, y] dizisidir (tahta 1000×562, y aşağı
   doğru büyür). Hiçbir araç Math.random, setTimeout ya da CSS animasyonu kullanmaz; zamanlama c.tween ile yapılır. Dönüşü Promise olan araçlar
   `await` ile beklenir. "parcalar" KIT.renkli ile aynıdır: ['düz', ['renkli', renk], …]. Tablo satırı tek <text> öğesidir (ölçüm aracı bir öğe sayar).
   Renkler: verilen sayı beyaz (RENK.yazi), istenen sarı (RENK.merkez), hesaplanan ara değer yeşil (RENK.iyi), çıkmaz yol gri; kırmızı kullanılmaz.

   tablo(c, p, { x, y, sutunX: [0, 230], size = 24, aralik = 44, kalin = 600 }) → { g, satir(i, hucreler) → { el, koy(k, hucre), goster(ms) → Promise, soluk(ms, hedef = 0.4) → Promise }, satirlar }
       Genel tablo: i. satır y + i·aralik hizasında tek <text>; hucreler = her sütun için parcalar listesi, düz yazı ya da null; sütun k, x + sutunX[k] konumundan başlar.
       Satır başta gizlidir (opacity 0); goster ile belirir.
   buyutec(c, p, { kutu: [x, y, w, h], nokta: [x, y], r = 9, renk = RENK.cizgi }) → { g, kutu, ic, hat, halka, P(u, v) }
       Çizimin bir parçasını yanında büyütülmüş gösteren çerçeve: nokta çevresinde halka, halkadan kutunun iki köşesine ince çizgiler, kutu (yuvarlak köşeli dikdörtgen).
       ic: kutunun içindeki çizimleri koyacağın grup; P(u, v) → [kutu.x + u, kutu.y + v] (kutunun sol üstünden piksel). Kutu içinde ölçek ayrıdır; ana çizimin dışında bir ölçek yazısı koymak sana kalır.
   verilenIstenen(c, p, { x, y, ikinci = 230, genislik = 440, size = 24, aralik = 44, baslikSatiri = true }) → { g, baslik, ayrac, tablo, verilen(i, parcalar, ms) → Promise, istenen(i, parcalar, ms) → Promise, soluk(i, ms) → Promise, satirlar }
       Satır satır dolan iki sütunlu tablo: başlıklar "Verilen" ve "İstenen"; i. satırın sol hücresi verilen, sağ hücresi istenen (sarı yazı, sarı çerçeve). Başlık satırı y'de, satırlar y + (i + 1)·aralik'ta.
       verilen/istenen ilk kez çağrıldığında satır belirir (ms = 450), sonra yalnızca hücre değişir.
   ipucuArac(c, p, { x, y, ikinci = 300, size = 24, aralik = 46, baslik = ['İpucu', 'Araç'] }) → { g, basliklar, ayrac, tablo, ekle(i, ipucu, arac, ms) → Promise, soluk(i, ms) → Promise, satirlar }
       İpucu solda, kullanılacak araç sağda; ekle ile satır satır belirir. ipucu ve arac: düz yazı ya da parcalar (varsayılan renk: ipucu beyaz, araç turuncu; araçtan önce gri "→" gelir).
   denetim(c, p, { x, y, maddeler: ['…', '…', '…'], size = 24, aralik = 54 }) → { g, maddeler: [{ kutu, tik, yazi }], tikle(i, ms) → Promise, tikliler() }
       Üç (ya da daha çok) maddelik kontrol listesi; her kutu başta boş, tikle(i) tiki çizer ve kutuyu yeşile boyar. g başta görünür (gizle/belir caller'a ait).
   cikmaz(c, p, hedef, merkez, { boyut = 34, son = 0.35 }) → { g, kapat(ms) → Promise, ac() }
       Bir çözüm yolunun üstüne gri çarpı koyar ve yolu soluklaştırır; hedef: öğe ya da öğe dizisi; merkez: çarpının merkezi; son: yolun kalacağı saydamlık. Kırmızı yok. ac(): çarpıyı ve yolu eski haline getirir.
   ikiYol(c, p, { x, y, genislik = 900, basliklar = ['Yol 1', 'Yol 2'], renkler = [RENK.sekil, RENK.goruntu], size = 24, aralik = 44 }) → { g, basliklar, ayrac, adim(k, parcalar, ms) → Promise<{ el, i }>, bitir(k, i, ms) → Promise, adimlar }
       İki sütunlu adım listesi: iki çözüm yolu yan yana; adim(k, …) k. sütunun sıradaki satırına tek <text> adım koyar ve belirtir; bitir(k, i) biten adımı soluklaştırır (0.4).
       Sütun k, x + k·genislik/2 konumundan başlar; adım yazısı sütun genişliğinden (genislik/2 − 24 piksel) uzun olmamalı.
   parla(c, ogeler, ms = 700) → Promise; öğeleri (çizgi, çokgen, yay, yazı ya da bunları içeren grup) bir kez büyütüp eski haline getirir: çizgilerde kalınlık, yazıda punto.
   istenenKutu(c, p, x, y, metin, { size = 26 }) → { g, yazi, kutu }; (x, y) merkezli, sarı yazı ve sarı yuvarlak çerçeve (istenen uzunluk ya da harf). */
window.KIT_E = (() => {
  'use strict';
  const K = window.KIT;
  const { RENK, uz, yon, ileri, yazi, belir } = K;
  const GRI = RENK.soluk;
  const dizi = (x) => (Array.isArray(x) ? x : [x]);

  /* Hücre içeriğini <text> içine tspan olarak yazar; ilk parçaya x verilir. */
  function hucreYaz(c, t, x, h) {
    if (h == null) return;
    const parcalar = typeof h === 'string' ? [h] : h;
    parcalar.forEach((q, j) => {
      const [m, r] = Array.isArray(q) ? q : [q, null], ts = c.S('tspan', { text: m }, t);
      if (j === 0) ts.setAttribute('x', x);
      if (r) ts.style.fill = r;
    });
  }
  /* Yazının genişliğini ölçer (geçici öğe). */
  function genislikOlc(c, p, h, size, kalin) {
    const t = c.S('text', { x: 0, y: 0, 'font-size': size, 'font-weight': kalin, 'text-anchor': 'start' }, p);
    t.style.opacity = 0; hucreYaz(c, t, 0, h);
    const w = t.getBBox().width; t.remove(); return w;
  }

  function tablo(c, p, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 24, aralik = o.aralik || 44, kalin = o.kalin || 600, sx = o.sutunX || [0, 230], satirlar = [];
    function satir(i, hucreler) {
      const t = c.S('text', { x: o.x, y: o.y + i * aralik, 'text-anchor': 'start', 'font-size': size, 'font-weight': kalin, style: 'fill:' + RENK.yazi }, g);
      const durum = hucreler.slice();
      const ciz = () => { t.textContent = ''; durum.forEach((h, k) => hucreYaz(c, t, o.x + sx[k], h)); };
      ciz(); t.style.opacity = 0;
      const nesne = {
        el: t, i,
        koy(k, h) { durum[k] = h; ciz(); },
        goster: (ms = 450) => belir(c, t, ms),
        soluk: (ms = 350, hedef = 0.4) => belir(c, t, ms, hedef),
      };
      satirlar[i] = nesne;
      return nesne;
    }
    return { g, satir, satirlar };
  }

  function buyutec(c, p, o = {}) {
    const [kx, ky, kw, kh] = o.kutu, N = o.nokta, r = o.r || 9, renk = o.renk || RENK.cizgi;
    const g = c.S('g', {}, p);
    // Noktadan bakıldığında en geniş açıyı veren iki köşe.
    const koseler = [[kx, ky], [kx + kw, ky], [kx, ky + kh], [kx + kw, ky + kh]];
    let en = null, enA = -1;
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
      let d = Math.abs(yon(N, koseler[i]) - yon(N, koseler[j])); if (d > Math.PI) d = 2 * Math.PI - d;
      if (d > enA) { enA = d; en = [koseler[i], koseler[j]]; }
    }
    const hat = c.S('g', {}, g);
    en.forEach((k) => {
      const a = yon(N, k), S = ileri(N, a, r + 2);
      c.S('line', { x1: S[0], y1: S[1], x2: k[0], y2: k[1], stroke: renk, 'stroke-width': 1.8, 'stroke-opacity': 0.7 }, hat);
    });
    const halka = c.S('circle', { cx: N[0], cy: N[1], r, fill: 'none', stroke: renk, 'stroke-width': 2.5 }, g);
    const kutu = c.S('rect', { x: kx, y: ky, width: kw, height: kh, rx: 12, fill: RENK.yuzey, stroke: renk, 'stroke-width': 2.5 }, g);
    const ic = c.S('g', {}, g);
    return { g, kutu, ic, hat, halka, P: (u, v) => [kx + u, ky + v] };
  }

  function istenenKutu(c, p, x, y, metin, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 26;
    const t = yazi(c, g, x, y + size * 0.34, metin, { size, kalin: 700, renk: RENK.merkez });
    const w = Math.max(t.getBBox().width + 18, size * 1.5), h = size * 1.5;
    const kutu = c.S('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 8, fill: 'none', stroke: RENK.merkez, 'stroke-width': 2.5 }, g);
    return { g, yazi: t, kutu };
  }

  function baslikSatiri(c, g, x, y, basliklar, sx, genislik, size, renkler) {
    const t = basliklar.map((b, k) => yazi(c, g, x + sx[k], y, b, { hiza: 'start', size, kalin: 700, renk: renkler ? renkler[k] : RENK.cizgi }));
    const ayrac = c.S('line', { x1: x, y1: y + 14, x2: x + genislik, y2: y + 14, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
    return { t, ayrac };
  }

  function verilenIstenen(c, p, o = {}) {
    const size = o.size || 24, aralik = o.aralik || 44, sx = [0, o.ikinci || 230], gen = o.genislik || 440;
    const g = c.S('g', {}, p);
    const bs = baslikSatiri(c, g, o.x, o.y, ['Verilen', 'İstenen'], sx, gen, size, [RENK.yazi, RENK.merkez]);
    const tb = tablo(c, g, { x: o.x, y: o.y, sutunX: sx, size, aralik });
    const cerceveler = [];
    const al = (i) => tb.satirlar[i + 1] || tb.satir(i + 1, [null, null]);
    const dolu = (i) => !!tb.satirlar[i + 1];
    const ekle = async (k, i, h, ms, sari) => {
      const yeni = !dolu(i), s = al(i);
      s.koy(k, h);
      if (sari) {
        const w = genislikOlc(c, g, h, size, 600), cy = o.y + (i + 1) * aralik;
        const kutu = c.S('rect', { x: o.x + sx[1] - 9, y: cy - size * 0.95, width: w + 18, height: size * 1.4, rx: 7, fill: 'none', stroke: RENK.merkez, 'stroke-width': 2.5 }, g);
        kutu.style.opacity = 0; cerceveler.push(kutu);
        await Promise.all([yeni ? s.goster(ms) : Promise.resolve(), belir(c, kutu, ms)]);
      } else if (yeni) await s.goster(ms);
    };
    return {
      g, baslik: bs.t, ayrac: bs.ayrac, tablo: tb, get satirlar() { return tb.satirlar; },
      verilen: (i, h, ms = 450) => ekle(0, i, h, ms, false),
      istenen: (i, h, ms = 450) => ekle(1, i, dizi(h).map((q) => (Array.isArray(q) ? q : [q, RENK.merkez])), ms, true),
      soluk: (i, ms = 350) => tb.satirlar[i + 1].soluk(ms),
    };
  }

  function ipucuArac(c, p, o = {}) {
    const size = o.size || 24, aralik = o.aralik || 46, sx = [0, o.ikinci || 300];
    const g = c.S('g', {}, p), bas = o.baslik || ['İpucu', 'Araç'];
    const bs = baslikSatiri(c, g, o.x, o.y, bas, sx, sx[1] + (o.genislik || 360), size, null);
    const tb = tablo(c, g, { x: o.x, y: o.y, sutunX: sx, size, aralik });
    const renkle = (h, renk) => (typeof h === 'string' ? [[h, renk]] : h);
    return {
      g, basliklar: bs.t, ayrac: bs.ayrac, tablo: tb, get satirlar() { return tb.satirlar; },
      ekle(i, ipucu, arac, ms = 500) {
        const s = tb.satir(i + 1, [renkle(ipucu, RENK.yazi), [['→ ', GRI], ...renkle(arac, RENK.goruntu)]]);
        return s.goster(ms);
      },
      soluk: (i, ms = 350) => tb.satirlar[i + 1].soluk(ms),
    };
  }

  function denetim(c, p, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 24, aralik = o.aralik || 54, k = 32, maddeler = [];
    (o.maddeler || []).forEach((m, i) => {
      const y = o.y + i * aralik;
      const kutu = c.S('rect', { x: o.x, y: y - k / 2 - 2, width: k, height: k, rx: 7, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2.5 }, g);
      const tik = c.S('path', { d: `M${o.x + 7},${y + 1} L${o.x + 14},${y + 8} L${o.x + 26},${y - 9}`, fill: 'none', stroke: RENK.iyi, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
      const uzun = tik.getTotalLength(); tik.setAttribute('stroke-dasharray', uzun); tik.setAttribute('stroke-dashoffset', uzun);
      const yz = yazi(c, g, o.x + k + 16, y + size * 0.34, m, { hiza: 'start', size, kalin: 600 });
      maddeler.push({ kutu, tik, yazi: yz, uzun, bitti: false });
    });
    return {
      g, maddeler,
      async tikle(i, ms = 500) {
        const m = maddeler[i];
        m.bitti = true;
        m.kutu.setAttribute('fill', RENK.iyi); m.kutu.setAttribute('fill-opacity', 0);
        await c.tween(ms, (e) => {
          m.tik.setAttribute('stroke-dashoffset', m.uzun * (1 - e));
          m.kutu.setAttribute('fill-opacity', 0.18 * e); m.kutu.setAttribute('stroke', e > 0.2 ? RENK.iyi : RENK.cizgi);
        });
      },
      tikliler: () => maddeler.filter((m) => m.bitti).length,
    };
  }

  function cikmaz(c, p, hedef, merkez, o = {}) {
    const g = c.S('g', {}, p), b = o.boyut || 34, son = o.son == null ? 0.35 : o.son, es = dizi(hedef);
    const k = [[-1, -1, 1, 1], [-1, 1, 1, -1]].map((d) => c.S('line', {
      x1: merkez[0] + d[0] * b, y1: merkez[1] + d[1] * b, x2: merkez[0] + d[2] * b, y2: merkez[1] + d[3] * b,
      stroke: GRI, 'stroke-width': 9, 'stroke-linecap': 'round',
    }, g));
    g.style.opacity = 0;
    const ilk = es.map((e) => (e.style.opacity === '' ? 1 : +e.style.opacity));
    return {
      g, cizgiler: k,
      async kapat(ms = 700) {
        await c.tween(ms, (e) => {
          g.style.opacity = Math.min(1, e * 2.5);
          k.forEach((l, i) => {
            const d = i === 0 ? [-1, -1, 1, 1] : [-1, 1, 1, -1], s = 0.3 + 0.7 * e;
            l.setAttribute('x1', merkez[0] + d[0] * b * s); l.setAttribute('y1', merkez[1] + d[1] * b * s);
            l.setAttribute('x2', merkez[0] + d[2] * b * s); l.setAttribute('y2', merkez[1] + d[3] * b * s);
          });
          es.forEach((x, i) => { x.style.opacity = ilk[i] + (son - ilk[i]) * e; });
        });
      },
      async ac(ms = 400) {
        await c.tween(ms, (e) => { g.style.opacity = 1 - e; es.forEach((x, i) => { x.style.opacity = son + (ilk[i] - son) * e; }); });
      },
    };
  }

  function ikiYol(c, p, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 24, aralik = o.aralik || 44, gen = o.genislik || 900, yarim = gen / 2;
    const bas = o.basliklar || ['Yol 1', 'Yol 2'], renkler = o.renkler || [RENK.sekil, RENK.goruntu];
    const basliklar = bas.map((b, k) => yazi(c, g, o.x + k * yarim, o.y, b, { hiza: 'start', size, kalin: 700, renk: renkler[k] }));
    const ayrac = c.S('line', { x1: o.x + yarim - 16, y1: o.y - size, x2: o.x + yarim - 16, y2: o.y + 14 + 5 * aralik, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
    c.S('line', { x1: o.x, y1: o.y + 14, x2: o.x + gen - 40, y2: o.y + 14, stroke: RENK.kenarlik, 'stroke-width': 2 }, g);
    const adimlar = [[], []];
    return {
      g, basliklar, ayrac, adimlar,
      async adim(k, parcalar, ms = 450) {
        const i = adimlar[k].length;
        const t = c.S('text', { x: o.x + k * yarim, y: o.y + (i + 1) * aralik, 'text-anchor': 'start', 'font-size': size, 'font-weight': 600, style: 'fill:' + RENK.yazi }, g);
        hucreYaz(c, t, o.x + k * yarim, parcalar);
        t.style.opacity = 0; adimlar[k].push(t);
        await belir(c, t, ms);
        return { el: t, i };
      },
      bitir: (k, i, ms = 350) => belir(c, adimlar[k][i], ms, 0.4),
    };
  }

  function parla(c, ogeler, ms = 700) {
    const liste = [];
    const topla = (e) => {
      const t = e.tagName;
      if (t === 'g') [...e.children].forEach(topla);
      else if (t === 'text') liste.push({ e, tur: 'yazi', v: +e.getAttribute('font-size') || 24 });
      else liste.push({ e, tur: 'cizgi', v: +e.getAttribute('stroke-width') || 3 });
    };
    dizi(ogeler).forEach(topla);
    return c.tween(ms, (e) => {
      const s = Math.sin(Math.PI * e);
      liste.forEach((x) => {
        if (x.tur === 'yazi') x.e.setAttribute('font-size', x.v * (1 + 0.28 * s));
        else x.e.setAttribute('stroke-width', x.v * (1 + 0.9 * s));
      });
    });
  }

  return { tablo, buyutec, verilenIstenen, ipucuArac, denetim, cikmaz, ikiYol, parla, istenenKutu };
})();
