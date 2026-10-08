/* Konu F (Bileşiklerin adlandırılması) ortak çizim araçları (window.KIT_F). kit.js'ten sonra, ders dosyasından önce yüklenir.
   Tahta 1000×562 birimdir. Renkler temanın kit.js dosyasındaki gibidir: katyon (ad, simge) turuncu, anyon mavi.
   Adlandırmada ek renk yoktur: ad parçaları yalnızca kendi iyonunun rengini taşır; Romen rakamı turuncudur (metalin yükü).

   H            'Mg_{3}N_{2}' → 'Mg<sub>3</sub>N<sub>2</sub>' (soru ve şık metinleri için)
   oku          formülün okunuşu (altyazının speak alanı için): 'Na_{2}S' → 'ne a iki se'
   yaz          parça parça renkli üs/indisli yazı: yaz(c, p, x, y, [['Na', arti], ['_{2}', arti], ['S', eksi]], { size })
   ION          iyon tanımları (terazi için)
   iyon         yüklü disk (tek atomlu) ya da yüklü kutu (çok atomlu)
   terazi       yük terazisi: kefelerde iyonlar; formül şeridi
   iyonSerit    formül şeridi: alt indislerden iyon çizimlerine çizgiler
   adKutulari   katyon adı ve anyon adı kutuları
   indisSoldur  formüldeki alt indisleri soluklaştırır (indis ada girmez)
   ionListesi   köşede küçük iyon listesi
   adSec        kart başına üç ad şıklı seçim döngüsü
   kartTasi     bir kartı tahtada bir yerden başka bir yere taşır
   romenSerit   1 I · 2 II · 3 III · 4 IV · 6 VI · 7 VII
   basamakListesi  yedi satırlı metal listesi (ad, simge, olası basamaklar)
   adParcalari  kovalent bileşik adının kurulması (atom sayısı, ön ek, ad)
   onEkListesi  1 mono … 8 okta
   yapboz       sekiz yuvalı tarsia tahtası */
window.KIT_F = (() => {
  'use strict';
  const { RENK, yazi, cizgi, kutu, gizle, belir, par } = window.KIT;
  const { lerp, clamp } = Ders;
  const KOYU = '#10162b';

  const H = (m) => m.replace(/_\{([^}]*)\}/g, '<sub>$1</sub>').replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>');

  /* ---- okunuş ---- */
  const HARF = { a: 'a', b: 'be', c: 'ce', d: 'de', e: 'e', f: 'fe', g: 'ge', h: 'he', i: 'i', k: 'ke', l: 'le', m: 'me', n: 'ne', o: 'o', p: 'pe', r: 're', s: 'se', t: 'te', u: 'u', z: 'ze' };
  const SAYI = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz'];
  const oku = (f) => [...f.replace(/[_{}()^]/g, '')].map((ch) => (/\d/.test(ch) ? SAYI[+ch] : HARF[ch.toLowerCase()] || '')).filter(Boolean).join(' ');

  /* ---- parça parça renkli üs/indisli yazı ---- */
  function parcaliMath(c, t, parcalar) {
    t.textContent = '';
    const re = /([\^_])(?:\{([^}]*)\}|(.))/g;
    let bekleyen = 0;
    parcalar.forEach((q) => {
      const [str, renk] = Array.isArray(q) ? q : [q, null];
      const push = (txt, attrs) => {
        if (!txt) return;
        const ts = c.S('tspan', attrs || {}, t); ts.textContent = txt;
        if (renk) ts.style.fill = renk;
      };
      const duz = (txt) => { if (!txt) return; const a = bekleyen ? { dy: bekleyen + 'em' } : {}; bekleyen = 0; push(txt, a); };
      let son = 0, m; re.lastIndex = 0;
      while ((m = re.exec(str))) {
        duz(str.slice(son, m.index));
        const ust = m[1] === '^', govde = m[2] != null ? m[2] : m[3], dy = ust ? -0.55 : 0.35;
        push(govde, { dy: dy + 'em', 'font-size': '0.7em' });
        bekleyen = -dy * 0.7; son = re.lastIndex;
      }
      duz(str.slice(son));
    });
  }
  const yaz = (c, p, x, y, parcalar, o = {}) => {
    const t = yazi(c, p, x, y, '', o); parcaliMath(c, t, parcalar); return t;
  };

  /* ---- iyon tanımları (terazi için); yuk işaretlidir ---- */
  const ION = {
    Li: { etiket: 'Li^{+}', yuk: 1 }, Na: { etiket: 'Na^{+}', yuk: 1 }, K: { etiket: 'K^{+}', yuk: 1 },
    Mg: { etiket: 'Mg^{2+}', yuk: 2 }, Ca: { etiket: 'Ca^{2+}', yuk: 2 }, Sr: { etiket: 'Sr^{2+}', yuk: 2 }, Ba: { etiket: 'Ba^{2+}', yuk: 2 },
    Zn: { etiket: 'Zn^{2+}', yuk: 2 }, Al: { etiket: 'Al^{3+}', yuk: 3 }, NH4: { etiket: 'NH_{4}^{+}', yuk: 1, kutu: true },
    Cl: { etiket: 'Cl^{−}', yuk: -1 }, F: { etiket: 'F^{−}', yuk: -1 }, Br: { etiket: 'Br^{−}', yuk: -1 }, I: { etiket: 'I^{−}', yuk: -1 },
    O: { etiket: 'O^{2−}', yuk: -2 }, S: { etiket: 'S^{2−}', yuk: -2 }, N: { etiket: 'N^{3−}', yuk: -3 }, H: { etiket: 'H^{−}', yuk: -1 },
    OH: { etiket: 'OH^{−}', yuk: -1, kutu: true }, CO3: { etiket: 'CO_{3}^{2−}', yuk: -2, kutu: true }, NO3: { etiket: 'NO_{3}^{−}', yuk: -1, kutu: true },
    PO4: { etiket: 'PO_{4}^{3−}', yuk: -3, kutu: true }, SO4: { etiket: 'SO_{4}^{2−}', yuk: -2, kutu: true },
    Fe2: { etiket: 'Fe^{2+}', yuk: 2 }, Fe3: { etiket: 'Fe^{3+}', yuk: 3 }, Cu1: { etiket: 'Cu^{+}', yuk: 1 }, Cu2: { etiket: 'Cu^{2+}', yuk: 2 },
    Sn2: { etiket: 'Sn^{2+}', yuk: 2 }, Sn4: { etiket: 'Sn^{4+}', yuk: 4 }, Pb2: { etiket: 'Pb^{2+}', yuk: 2 }, Pb4: { etiket: 'Pb^{4+}', yuk: 4 },
    Mn2: { etiket: 'Mn^{2+}', yuk: 2 }, Mn4: { etiket: 'Mn^{4+}', yuk: 4 }, Cr3: { etiket: 'Cr^{3+}', yuk: 3 }, Co2: { etiket: 'Co^{2+}', yuk: 2 },
  };

  /* ---- iyon: yüklü disk (tek atomlu) ya da yüklü kutu (çok atomlu) ---- */
  function iyon(c, p, x, y, tur, etiket, o = {}) {
    const g = c.S('g', { transform: `translate(${x},${y})` }, p), renk = tur === 'arti' ? RENK.arti : RENK.eksi, size = o.size || 22;
    if (o.kutu) {
      const w = o.w || 100, h = o.h || 54;
      c.S('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 12, fill: renk }, g);
    } else c.S('circle', { r: o.r || 26, fill: renk }, g);
    const t = etiket ? yazi(c, g, 0, size * 0.36, etiket, { size, kalin: 700, renk: KOYU, math: true }) : null;
    return { g, t, tasi(a, b) { g.setAttribute('transform', `translate(${a},${b})`); } };
  }

  /* ---- yük terazisi ----
     kur(solTanim, sagTanim, nSol, nSag): tanım ION içinden. say(nSol, nSag, ms): kefelerdeki iyon sayısını değiştirir;
     yükler eşitse "toplam 0" yanar. formul(f, oran): formül şeridini yazar. o.y: kolun yüksekliği. */
  function terazi(c, p, o = {}) {
    const cx = 500, cy = o.y == null ? 120 : o.y, L = 270, ASIL = 112;
    const g = c.S('g', {}, p);
    c.S('path', { d: `M${cx - 34},${cy + 66} L${cx},${cy} L${cx + 34},${cy + 66} Z`, fill: RENK.kenarlik }, g);
    c.S('rect', { x: cx - 80, y: cy + 66, width: 160, height: 12, rx: 6, fill: RENK.kenarlik }, g);
    const kiris = cizgi(c, g, [cx - L, cy], [cx + L, cy], RENK.cizgi, 8);
    c.S('circle', { cx, cy, r: 10, fill: RENK.vurgu }, g);
    const taraf = (renk) => {
      const t = c.S('g', {}, g);
      return {
        h1: cizgi(c, t, [0, 0], [0, 0], RENK.ince, 3), h2: cizgi(c, t, [0, 0], [0, 0], RENK.ince, 3),
        tepsi: c.S('rect', { width: 330, height: 12, rx: 6, fill: RENK.cizgi }, t), iyonlar: c.S('g', {}, t),
        toplam: yazi(c, t, 0, 0, '', { size: 34, kalin: 700, renk, math: true }), slots: [], tanim: null, n: 0,
      };
    };
    const sol = taraf(RENK.arti), sag = taraf(RENK.eksi);
    const sifir = yazi(c, g, cx, cy + 150, 'toplam 0', { size: 30, kalin: 700, renk: RENK.iyi });
    sifir.style.opacity = 0;
    const fg = c.S('g', {}, p), fm = yazi(c, fg, 500, 452, '', { size: 56, kalin: 700, math: true });
    const or = yazi(c, fg, 760, 452, '', { size: 28, kalin: 600, renk: RENK.soluk });

    const pitch = (t) => (t.tanim && t.tanim.kutu ? 106 : 80);
    function doldur(t, tanim) {
      t.iyonlar.textContent = ''; t.slots = []; t.tanim = tanim; t.n = 0;
      if (!tanim) return;
      for (let i = 0; i < 4; i++) t.slots.push(iyon(c, t.iyonlar, 0, 0, tanim.yuk > 0 ? 'arti' : 'eksi', tanim.etiket, { kutu: tanim.kutu, w: 100, h: 54, r: 32, size: 24 }));
    }
    const etiketle = (n, yuk) => { const v = Math.round(n) * Math.abs(yuk || 0); return v ? `${v}${yuk > 0 ? '+' : '−'}` : ''; };
    function ciz(a, b) {
      sol.n = a; sag.n = b;
      const Ls = Math.abs(sol.tanim ? sol.tanim.yuk : 0) * a, Rs = Math.abs(sag.tanim ? sag.tanim.yuk : 0) * b;
      const th = clamp(0.05 * (Ls - Rs), -0.2, 0.2);
      const Lp = [cx - L * Math.cos(th), cy + L * Math.sin(th)], Rp = [cx + L * Math.cos(th), cy - L * Math.sin(th)];
      kiris.setAttribute('x1', Lp[0]); kiris.setAttribute('y1', Lp[1]); kiris.setAttribute('x2', Rp[0]); kiris.setAttribute('y2', Rp[1]);
      [[sol, Lp, a], [sag, Rp, b]].forEach(([t, E, n]) => {
        const ty = E[1] + ASIL, h = t.tanim && t.tanim.kutu ? 54 : 64;
        t.tepsi.setAttribute('x', E[0] - 165); t.tepsi.setAttribute('y', ty);
        [[t.h1, -150], [t.h2, 150]].forEach(([l, dx]) => { l.setAttribute('x1', E[0]); l.setAttribute('y1', E[1]); l.setAttribute('x2', E[0] + dx); l.setAttribute('y2', ty); });
        t.slots.forEach((s, i) => {
          s.tasi(E[0] + (i - (n - 1) / 2) * pitch(t), ty - h / 2);
          s.g.style.opacity = clamp(n - i, 0, 1);
        });
        t.toplam.setAttribute('x', E[0]); t.toplam.setAttribute('y', ty + 50);
        c.mathText(t.toplam, etiketle(n, t.tanim ? t.tanim.yuk : 0));
      });
      sifir.style.opacity = Math.abs(Ls - Rs) < 0.02 && Ls > 0 ? 1 : 0;
    }
    ciz(0, 0);
    return {
      g, fg, sol, sag, sifir,
      kur(st, sg, a = 0, b = 0) { doldur(sol, st); doldur(sag, sg); ciz(a, b); },
      say(a, b, ms = 900) { const a0 = sol.n, b0 = sag.n; return c.tween(ms, (e) => ciz(lerp(a0, a, e), lerp(b0, b, e))); },
      formul(f, oran) { c.mathText(fm, f || ''); or.textContent = oran ? 'oran ' + oran : ''; },
      fm,
    };
  }

  /* ---- formül şeridi ----
     o: { x, y, size, parcalar: [['Na', arti], ['_{2}', arti], ['S', eksi]], K: { etiket, n, kaynak: [ilkKarakter, sonKarakter] }, A: { … },
          kx, ax (iyon gruplarının x'i), iy (iyonların y'si), r, kutuK, kutuA }
     kaynak, formül metnindeki karakter sıralarıdır ('Na2S' → Na = [0, 1], 2 = [2, 2], S = [3, 3]); çizgi bu karakterlerin altından iner.
     Dönen: { g, t (formül), grup (çizgiler ve iyonlar), K, A (iyon çizimleri), cizgiler } */
  function iyonSerit(c, p, o) {
    const g = c.S('g', {}, p), t = yaz(c, g, o.x, o.y, o.parcalar, { size: o.size || 72, kalin: 700 });
    const grup = c.S('g', {}, g), r = o.r || 34, iy = o.iy || o.y + 230, sonuc = { g, t, grup, K: [], A: [], cizgiler: [] };
    [['K', 'arti', o.kx], ['A', 'eksi', o.ax]].forEach(([a, tur, cx]) => {
      const d = o[a], e0 = t.getExtentOfChar(d.kaynak[0]), e1 = t.getExtentOfChar(d.kaynak[1]);
      const sx = (e0.x + e1.x + e1.width) / 2, sy = Math.max(e0.y + e0.height, e1.y + e1.height) + 8;
      const kutuIyon = a === 'K' ? o.kutuK : o.kutuA;
      for (let i = 0; i < d.n; i++) {
        const X = cx + (i - (d.n - 1) / 2) * (kutuIyon ? 150 : 2 * r + 14);
        sonuc.cizgiler.push(cizgi(c, grup, [sx, sy], [X, iy - (kutuIyon ? 30 : r) - 6], RENK.cizgi, 3));
        sonuc[a].push(iyon(c, grup, X, iy, tur, d.etiket, kutuIyon ? { kutu: true, w: 136, h: 56, size: 26 } : { r, size: 24 }));
      }
    });
    return sonuc;
  }

  /* ---- ad kutuları: katyon adı (turuncu) ve anyon adı (mavi) ---- */
  function adKutulari(c, p, y, katyon, anyon, o = {}) {
    const g = c.S('g', {}, p), size = o.size || 32, h = o.h || 58, gen = (s) => Math.max(150, s.length * size * 0.52 + 44);
    const wk = gen(katyon), wa = gen(anyon), bosluk = o.bosluk == null ? 26 : o.bosluk, toplam = wk + wa + bosluk, x0 = (o.x == null ? 500 : o.x) - toplam / 2;
    const kg = c.S('g', {}, g), ag = c.S('g', {}, g);
    kutu(c, kg, x0, y - h / 2, wk, h, { renk: RENK.arti, w: 3 }); const tk = yazi(c, kg, x0 + wk / 2, y + size * 0.36, katyon, { size, kalin: 700, renk: RENK.arti });
    kutu(c, ag, x0 + wk + bosluk, y - h / 2, wa, h, { renk: RENK.eksi, w: 3 }); const ta = yazi(c, ag, x0 + wk + bosluk + wa / 2, y + size * 0.36, anyon, { size, kalin: 700, renk: RENK.eksi });
    return { g, k: kg, a: ag, tk, ta };
  }

  /* Formüldeki alt indisleri (küçük harfli tspan'lar) soluklaştırır: indis ada girmez. */
  function indisSoldur(c, t, ms = 700, hedef = 0.15) {
    const ts = [...t.querySelectorAll('tspan')].filter((x) => x.getAttribute('font-size'));
    return c.tween(ms, (e) => ts.forEach((x) => { x.style.opacity = 1 - (1 - hedef) * e; }));
  }

  /* ---- köşede küçük iyon listesi: satirlar = [['Na^{+}', 'sodyum', 'arti'], …] ---- */
  function ionListesi(c, p, x, y, satirlar, o = {}) {
    const g = c.S('g', {}, p), dy = o.dy || 32, size = o.size || 20, satir = [];
    satirlar.forEach(([sim, ad, tur], i) => {
      const sg = c.S('g', {}, g);
      yazi(c, sg, x, y + i * dy, sim, { hiza: 'start', size, kalin: 700, renk: tur === 'arti' ? RENK.arti : RENK.eksi, math: true });
      yazi(c, sg, x + (o.ayrac || 78), y + i * dy, ad, { hiza: 'start', size, kalin: 600, renk: RENK.soluk });
      satir.push(sg);
    });
    return { g, satir };
  }

  /* ---- bir kartı tahtada başka yere taşır (yazı konumu ve punto) ---- */
  function kartTasi(c, t, x, y, size, ms = 700) {
    const x0 = +t.getAttribute('x'), y0 = +t.getAttribute('y'), s0 = +t.getAttribute('font-size');
    return c.tween(ms, (e) => { t.setAttribute('x', lerp(x0, x, e)); t.setAttribute('y', lerp(y0, y, e)); t.setAttribute('font-size', lerp(s0, size, e)); }, Ders.ease.inOut);
  }

  /* ---- kart başına üç şıklı seçim döngüsü ----
     o: { tag, soru: (kart) => 'html', kartlar: [{ sec: [doğru, yanlış, yanlış], ipucu, neden, … }], once: async (i, kart), sonra: async (i, kart) }
     Doğru şık tahtada her kartta başka yere karıştırılır. Yanlış şıkta geri bildirim: kart.yanlis + ipucu. */
  async function adSec(c, o) {
    for (let i = 0; i < o.kartlar.length; i++) {
      const k = o.kartlar[i], poz = (i * 2 + 1) % 3, sec = k.sec.slice(1);
      sec.splice(poz, 0, k.sec[0]);
      if (o.once) await o.once(i, k);
      await c.choice({
        tag: o.tag || 'Dene', q: o.soru(k), options: sec.map(H), answer: poz,
        hints: sec.map((_, j) => (j === poz ? '' : (k.yanlis || o.yanlis || '') + (k.ipucu ? ' ' + k.ipucu : ''))),
        right: 'Evet. ' + (k.neden || ''),
      });
      if (o.sonra) await o.sonra(i, k);
    }
  }

  /* ---- Romen rakamı şeridi: 1 I · 2 II · 3 III · 4 IV · 6 VI · 7 VII ---- */
  const ROMEN = [[1, 'I'], [2, 'II'], [3, 'III'], [4, 'IV'], [6, 'VI'], [7, 'VII']];
  function romenSerit(c, p, y, o = {}) {
    const g = c.S('g', {}, p), W = 120, G = 22, x0 = (1000 - (6 * W + 5 * G)) / 2, kut = [];
    ROMEN.forEach(([n, r], i) => {
      const x = x0 + i * (W + G), kg = c.S('g', {}, g);
      const rc = kutu(c, kg, x, y, W, 78, { rx: 12 });
      const t1 = yazi(c, kg, x + W / 2, y + 40, r, { size: 38, kalin: 700, renk: RENK.arti });
      const t2 = yazi(c, kg, x + W / 2, y + 68, String(n), { size: 20, kalin: 600, renk: RENK.soluk });
      kut.push({ n, rc, t1, t2 });
    });
    return {
      g,
      ac(n) { kut.forEach((k) => { const a = k.n === n; k.rc.style.stroke = a ? RENK.vurgu : RENK.kenarlik; k.rc.style.strokeWidth = a ? 5 : 2; k.rc.style.fill = a ? '#2a3566' : RENK.yuzey; k.t2.style.fill = a ? RENK.yazi : RENK.soluk; }); },
    };
  }

  /* ---- yedi metal listesi (ad, simge, olası basamaklar) ---- */
  const METALLER = [['Krom', 'Cr', '+2,+3,+6'], ['Mangan', 'Mn', '+2,+4,+7'], ['Bakır', 'Cu', '+1,+2'], ['Kurşun', 'Pb', '+2,+4'], ['Kalay', 'Sn', '+2,+4'], ['Demir', 'Fe', '+2,+3'], ['Kobalt', 'Co', '+2,+3']];
  function basamakListesi(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p), dy = o.dy || 52, W = o.w || 400, satir = [];
    METALLER.forEach(([ad, sim, bas], i) => {
      const sg = c.S('g', {}, g), Y = y + i * dy;
      const cerceve = c.S('rect', { x, y: Y - 33, width: W, height: 46, rx: 10, fill: 'none', stroke: RENK.vurgu, 'stroke-width': 3 }, sg);
      cerceve.style.opacity = 0;
      yazi(c, sg, x + 20, Y, ad, { hiza: 'start', size: 30, kalin: 600 });
      yazi(c, sg, x + 190, Y, sim, { hiza: 'start', size: 30, kalin: 700, renk: RENK.arti });
      const b = yazi(c, sg, x + W - 14, Y, bas, { hiza: 'end', size: 30, kalin: 700, renk: RENK.soluk });
      sg.style.opacity = 0; satir.push({ g: sg, cerceve, bas: b });
    });
    return { g, satir, vurgula(i) { satir.forEach((s, j) => { s.cerceve.style.opacity = j === i ? 1 : 0; s.bas.style.fill = j === i ? RENK.arti : RENK.soluk; }); } };
  }


  /* ---- kovalent bileşik adı: ön ekler koyu, element ve anyon adı normal ---- */
  const ONEKLER = ['mono', 'tetra', 'penta', 'hekza', 'hepta', 'okta', 'tri', 'di', 'tetr', 'pent'];
  /* 'diazot' → [['di', true], 'azot']; 'pentoksit' → [['pent', true], 'oksit']. Ön eki olmayan sözcük düz kalır. */
  function onEkParcala(kelime) {
    for (const p of ONEKLER) if (kelime.startsWith(p) && kelime.length > p.length) return [[p, true], kelime.slice(p.length)];
    return [kelime];
  }
  const NORMAL = '#b4bddf';
  /* Tek satır ad: 'diazot pentoksit'. o: { size, hiza, parcalar (verilirse onEkParcala yerine), iyonik (ilk sözcük katyon rengi, ikincisi anyon rengi) }. */
  function adOnEk(c, p, x, y, ad, o = {}) {
    const t = yazi(c, p, x, y, '', { hiza: o.hiza || 'middle', size: o.size || 30, kalin: o.iyonik ? 600 : 500, renk: NORMAL });
    if (o.iyonik) {
      ad.split(' ').forEach((k, i) => { const ts = c.S('tspan', { text: (i ? ' ' : '') + k }, t); ts.style.fill = i ? RENK.eksi : RENK.arti; });
      return t;
    }
    const parcalar = o.parcalar || ad.split(' ').flatMap((k, i) => (i ? [' '] : []).concat(onEkParcala(k)));
    parcalar.forEach((q) => {
      const [m, kalin] = Array.isArray(q) ? q : [q, false];
      const ts = c.S('tspan', { text: m }, t);
      if (kalin) { ts.style.fontWeight = 800; ts.style.fill = RENK.yazi; }
    });
    return t;
  }

  /* ---- ön ek listesi: 1 mono … 8 okta (iki sütun) ---- */
  const ON = [[1, 'mono'], [2, 'di'], [3, 'tri'], [4, 'tetra'], [5, 'penta'], [6, 'hekza'], [7, 'hepta'], [8, 'okta']];
  function onEkListesi(c, p, x, y, o = {}) {
    const g = c.S('g', {}, p), dy = o.dy || 58, size = o.size || 30, satir = [];
    ON.forEach(([n, ek], i) => {
      const X = x + Math.floor(i / 4) * (o.sutun || 170), Y = y + (i % 4) * dy;
      const sg = c.S('g', {}, g);
      yazi(c, sg, X, Y, String(n), { hiza: 'start', size, kalin: 600, renk: RENK.soluk });
      yazi(c, sg, X + size * 0.9, Y, ek, { hiza: 'start', size, kalin: 800 });
      satir.push(sg);
    });
    return { g, satir, vurgu(...ix) { satir.forEach((s, i) => { s.style.opacity = ix.length === 0 || ix.includes(i) ? 1 : 0.35; }); } };
  }

  /* ---- nötr gri atom küresi (renk yalnız yük için; atomlar gridir) ---- */
  const ATOM = { H: '#e8ecfa', C: '#6b7494', N: '#8993b8', O: '#dfe4f5', F: '#cfd6ee', P: '#7d87ad', S: '#b9c1e0', Cl: '#c6cdea' };
  function atom(c, p, x, y, sim, r, o = {}) {
    const g = c.S('g', { transform: `translate(${x},${y})` }, p);
    const d = c.S('circle', { r, fill: ATOM[sim] || '#aab3d4' }, g);
    const t = o.etiket === false ? null : yazi(c, g, 0, (o.size || r * 0.7) * 0.36, sim, { size: o.size || r * 0.7, kalin: 700, renk: KOYU });
    return { g, d, t, tasi(a, b) { g.setAttribute('transform', `translate(${a},${b})`); } };
  }

  /* ---- tarsia yapbozu: sekiz yuva (4×2), her yuvada formül ve ad ----
     yuvalar: [{ f: 'SF_{6}', ad: 'kükürt hekzaflorür', kural: 0 (katyon + anyon) | 1 (Romen rakamlı) | 2 (ön ekli), iyonik: true }]
     ac(i): yuvayı öne çıkarır (kalın çerçeve); oturt(i): ad belirir, çift çizgiyle bağlanır, kural işareti yanar. Sürükleme yok. */
  function yapboz(c, p, yuvalar) {
    const g = c.S('g', {}, p), W = 232, Hh = 205, G = 12, x0 = (1000 - (4 * W + 3 * G)) / 2, y0 = 50;
    const KURAL = [RENK.cizgi, RENK.vurgu, '#c792ff'];
    const yuva = yuvalar.map((y, i) => {
      const X = x0 + (i % 4) * (W + G), Y = y0 + Math.floor(i / 4) * (Hh + G + 20);
      const rc = kutu(c, g, X, Y, W, Hh, { rx: 14 });
      const f = yaz(c, g, X + W / 2, Y + 70, [y.f], { size: 38, kalin: 700 });
      const baglan = cizgi(c, g, [X + W / 2, Y + 92], [X + W / 2, Y + 118], RENK.cekme, 3); baglan.style.opacity = 0;
      const ad = adOnEk(c, g, X + W / 2, Y + 152, y.ad, { size: 22, iyonik: y.kural === 0 || y.kural === 1 }); ad.style.opacity = 0;
      const isr = c.S('rect', { x: X + W / 2 - 26, y: Y + Hh - 26, width: 52, height: 9, rx: 4, fill: KURAL[y.kural] }, g); isr.style.opacity = 0;
      return { rc, f, baglan, ad, isr };
    });
    return {
      g, yuva,
      ac(i, a = true) { const r = yuva[i].rc; r.style.stroke = a ? RENK.vurgu : RENK.kenarlik; r.style.strokeWidth = a ? 5 : 2; },
      oturt(i) { const y = yuva[i]; y.rc.style.stroke = RENK.cekme; y.rc.style.strokeWidth = 3; return belir(c, [y.ad, y.baglan, y.isr], 450); },
    };
  }

  return { H, oku, yaz, yapboz, ONEKLER, onEkParcala, adOnEk, onEkListesi, ATOM, atom, ION, iyon, terazi, iyonSerit, adKutulari, indisSoldur, ionListesi, kartTasi, adSec, romenSerit, basamakListesi, KOYU };
})();
