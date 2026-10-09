/* F3 · KİM.9.1.6 · Senaryo: plan/kimya/etkilesim/senaryolar/F-periyodik-tabloda-yer-bulma.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 67 ve 70–72'den; iyon kavramı ile metal, ametal, yarı metal ve soy gaz ayrımı
   ortaokul ön bilgisi. Alttaki iki f satırı s. 67'deki tablodaki gibi on beşer kutudur. f elementlerinde dizilim
   ya da grup hesabı yapılmaz; 7A için "hepsi gaz" denmez (F, Cl gaz · Br sıvı · I katı). Öğrenciye kitap ya da
   sayfa anılmaz. Tablo ve dizilim yardımcıları F1 ve F2'de de yerel olarak durur. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const PER = 'var(--c1)', GRUP = 'var(--c2)', YER = RENK.vurgu;   // periyot · grup · elementin kutusu
  const BLOK = { s: 'var(--c6)', p: 'var(--c3)', d: 'var(--c4)', f: 'var(--c2)' };   // dört blok, dört renk
  const FARKLI = 'var(--c3)';   // grubun ötekilerinden ayrılan elementi (H, B)
  const KOYU = '#162038', HUCRE = '#1b2942', KENAR = '#53627f', SIYAH = '#0b0d12';

  const kutu = (c, p, x, y, w, h, o = {}) => {
    const r = c.S('rect', { x, y, width: w, height: h, rx: o.rx == null ? 12 : o.rx, fill: o.fill || KOYU,
      stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 3 }, p);
    if (o.kesik) r.setAttribute('stroke-dasharray', '8 8');
    return r;
  };
  const sil = async (c, el, ms = 300) => {
    await c.tween(ms, (e) => { el.style.opacity = 1 - e; });
    el.remove();
  };
  const nokta = (c, p, x, y, renk = RENK.soluk) => c.S('circle', { cx: x, cy: y, r: 3.5, fill: renk }, p);

  /* ---- Periyodik tablo: 7 satır, 18 sütun; element adı yok. o.f: altta on beşer kutuluk iki f satırı. ---- */
  const kutuVar = (per, grup) => !((per === 1 && grup > 1 && grup < 18) || (per <= 3 && grup > 2 && grup < 13));
  const ilkSatir = (grup) => (grup === 1 || grup === 18 ? 1 : grup === 2 || grup >= 13 ? 2 : 4);
  /* Sütuna göre blok. Helyum (1. satır, 18. sütun) haritada önce sütununa göre boyanır; ayrıca düzeltilir. */
  const blokAdi = (grup) => (grup <= 2 ? 's' : grup >= 13 ? 'p' : 'd');
  function tablo(c, p, o = {}) {
    const x0 = o.x == null ? 84 : o.x, y0 = o.y, w = o.w || 50, h = o.h || 40;
    const g = c.S('g', {}, p), kutuKat = c.S('g', {}, g), yaziKat = c.S('g', {}, g);
    const kutular = {};
    for (let per = 1; per <= 7; per++) {
      for (let grup = 1; grup <= 18; grup++) {
        if (!kutuVar(per, grup)) continue;
        kutular[per + '-' + grup] = c.S('rect', { x: x0 + (grup - 1) * w, y: y0 + (per - 1) * h, width: w - 3, height: h - 3,
          rx: 4, fill: HUCRE, stroke: KENAR, 'stroke-width': 1.5 }, kutuKat);
      }
    }
    const cx = (grup) => x0 + (grup - 0.5) * w - 1.5, cy = (per) => y0 + (per - 0.5) * h - 1.5;
    const boyaKutu = (r, renk, opak) => {
      r.setAttribute('fill', renk || HUCRE);
      r.setAttribute('fill-opacity', renk ? opak : 1);
      r.setAttribute('stroke', renk || KENAR);
      r.removeAttribute('stroke-dasharray');
    };
    const boya = (per, grup, renk, opak = 0.4) => { const r = kutular[per + '-' + grup]; if (r) boyaKutu(r, renk, opak); };
    const T = {
      g, yaziKat, x0, y0, w, h, cx, cy, boya,
      satir: (per, renk = PER, opak) => { for (let grup = 1; grup <= 18; grup++) boya(per, grup, renk, opak); },
      sutun: (grup, renk = GRUP, opak) => { for (let per = 1; per <= 7; per++) boya(per, grup, renk, opak); },
      /* Bir bloğun bütün kutularını boyar (helyum sütununa göre p ile gelir). */
      blok: (ad, opak = 0.5, renk = BLOK[ad]) => {
        if (ad === 'f') { T.fSatir(0, renk, opak); T.fSatir(1, renk, opak); return; }
        for (let grup = 1; grup <= 18; grup++) if (blokAdi(grup) === ad) T.sutun(grup, renk, opak);
      },
      /* Elementin kutusu: dolu renk ve simge. */
      yak: (per, grup, ad, renk = YER) => {
        boya(per, grup, renk, 1);
        return ad ? yazi(c, yaziKat, cx(grup), cy(per) + 9, ad, { size: 24, renk: SIYAH, kalin: 700 }) : null;
      },
      /* Henüz yerleşmemiş kutu: kesikli çerçeve. */
      bekleyen: (per, grup, renk = YER) => {
        const r = kutular[per + '-' + grup];
        r.setAttribute('stroke', renk);
        r.setAttribute('stroke-width', 3);
        r.setAttribute('stroke-dasharray', '6 5');
      },
      satirNo: (per, renk = 'var(--text)') => yazi(c, yaziKat, x0 - 26, cy(per) + 9, String(per), { size: 26, renk }),
      baslik: (grup, metin, renk = GRUP) => yazi(c, yaziKat, cx(grup), y0 + (ilkSatir(grup) - 1) * h - 10, metin, { size: 24, renk }),
      temizle: () => {
        Object.keys(kutular).forEach((k) => { const [per, grup] = k.split('-'); boya(+per, +grup, null); kutular[k].setAttribute('stroke-width', 1.5); });
        yaziKat.replaceChildren();
      },
    };
    if (o.f) {
      /* f satırları 4.–18. sütunların altında durur; kesikli çizgiler 6. ve 7. periyodun üçüncü kutusuna bağlar. */
      const fy = y0 + 7 * h + 46, fKat = c.S('g', {}, g);
      const satirlar = [0, 1].map((i) => {
        const dizi = [];
        for (let j = 0; j < 15; j++) {
          dizi.push(c.S('rect', { x: x0 + (3 + j) * w, y: fy + i * h, width: w - 3, height: h - 3, rx: 4, fill: HUCRE, stroke: KENAR, 'stroke-width': 1.5 }, fKat));
        }
        return dizi;
      });
      const xa = x0 + 2 * w + 34, xb = x0 + 2 * w + 14, uc = x0 + 3 * w - 4;
      T.baglar = [
        c.S('path', { d: `M ${xa} ${y0 + 6 * h - 3} V ${fy + h / 2 - 2} H ${uc}`, fill: 'none', stroke: BLOK.f, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }, fKat),
        c.S('path', { d: `M ${xb} ${y0 + 7 * h - 3} V ${fy + 1.5 * h - 2} H ${uc}`, fill: 'none', stroke: BLOK.f, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }, fKat),
      ];
      T.fy = fy;
      T.fSatir = (i, renk, opak = 0.5) => satirlar[i].forEach((r) => boyaKutu(r, renk, opak));
    }
    return T;
  }

  /* ---- Elektron dizilimi: "1s2 2s2 2p5"; ilk parça "…" ile başlayabilir. Her orbital tek <text>;
     baş sayı, harf ve üst sayı ayrı <tspan> olduğu için ayrı ayrı boyanır. (x, y): satırın ortası ve taban çizgisi. ---- */
  const UST = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
  const ustSayi = (n) => String(n).split('').map((r) => UST[+r]).join('');
  function dizilim(c, p, x, y, metin, o = {}) {
    const size = o.size || 32, bosluk = o.bosluk || size * 0.6, g = c.S('g', {}, p);
    const orb = metin.split(' ').map((ham) => {
      const t = c.S('text', { x: 0, y, 'font-size': size, 'font-weight': 600, 'text-anchor': 'start', style: 'fill:var(--text)' }, g);
      const kisaltma = ham[0] === '…', parca = kisaltma ? ham.slice(1) : ham;
      if (kisaltma) c.S('tspan', { text: '…', style: 'fill:' + RENK.soluk }, t);
      const n = +parca[0], harf = parca[1], e = +parca.slice(2);
      const sayi = c.S('tspan', { text: String(n) }, t), tur = c.S('tspan', { text: harf }, t), us = c.S('tspan', { text: ustSayi(e) }, t);
      if (kisaltma) sayi.setAttribute('dx', size * 0.3);
      return { t, n, harf, e, sayi, tur, us, kisaltma };
    });
    let gen = -bosluk;
    /* "…" ön ekinden sonra küçük bir boşluk (dx) bırakılır; ölçülen uzunluğa eklenir. */
    orb.forEach((b) => { b.w = (b.t.getComputedTextLength() || size * 1.5) + (b.kisaltma ? size * 0.3 : 0); gen += b.w + bosluk; });
    let sol = x - gen / 2;
    orb.forEach((b) => {
      b.x = sol;
      b.ic = sol + (b.kisaltma ? b.t.getSubStringLength(0, 1) + size * 0.3 : 0);
      b.t.setAttribute('x', sol);
      sol += b.w + bosluk;
    });
    const D = {
      g, orb, y, size,
      son: orb.length - 1,
      enYuksek: Math.max(...orb.map((b) => b.n)),
      orta: (i, j = i) => (orb[i].ic + orb[j].x + orb[j].w) / 2,
      enYuksegiBoya: (r = PER) => orb.forEach((b) => { if (b.n === D.enYuksek) b.sayi.style.fill = r; }),
      /* Dizilimin bittiği orbitalin harfini kendi bloğunun rengine boyar. */
      sonHarf: (r) => { orb[D.son].tur.style.fill = r || BLOK[orb[D.son].harf]; },
      cerceve: (i, j = i, r = GRUP) => c.S('rect', { x: orb[i].ic - 7, y: y - size * 0.98, width: orb[j].x + orb[j].w - orb[i].ic + 14,
        height: size * 1.36, rx: 8, fill: 'none', stroke: r, 'stroke-width': 3 }, g),
    };
    return D;
  }

  /* ---- Sahne 1 · Dizilimin sonu bloğu söyler ---- */
  async function sonBlok(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    yazi(c, giris, 500, 62, 'Dizilimin sonu', { size: 32, renk: RENK.soluk });
    const etiket = (x, metin, renk) => {
      const g = c.S('g', {}, giris);
      kutu(c, g, x - 110, 92, 220, 64, { renk });
      yazi(c, g, x, 135, metin, { size: 30, renk });
      return g;
    };
    etiket(260, 'periyot', RENK.cizgi);
    etiket(500, 'grup', RENK.cizgi);
    await belir(c, svg);
    await c.say('Önceki iki derste dizilimin sonuna bakarak grubu bulduk.');
    await belir(c, etiket(740, 'blok', YER), 350);
    await c.say('Dizilimin bittiği orbital türü bir şey daha söyler: elementin bloğunu.',
      { speak: 'Dizilimin bittiği orbital türü bir şey daha söyler: [short pause] elementin bloğunu.' });
    await belir(c, yazi(c, giris, 500, 208, 'blok: aynı tür orbitalle biten elementler', { size: 28 }), 350);
    await c.say('Blok, dizilimi aynı tür orbitalle biten elementlerin ortak adıdır.');

    const dortlu = c.S('g', {}, svg);
    const blokKutusu = (i, harf) => {
      const g = c.S('g', {}, dortlu), x = 44 + i * 232;
      kutu(c, g, x, 262, 216, 220, { renk: BLOK[harf] });
      yazi(c, g, x + 108, 362, '…' + harf, { size: 64, renk: BLOK[harf], kalin: 700 });
      yazi(c, g, x + 108, 440, harf + ' bloğu', { size: 30 });
      return g;
    };
    await belir(c, blokKutusu(0, 's'), 350);
    await c.say('Dizilimi s orbitaliyle biten elementler s bloğundadır.', { speak: 'Dizilimi se orbitaliyle biten elementler se bloğundadır.' });
    await Promise.all([belir(c, blokKutusu(1, 'p'), 350), belir(c, blokKutusu(2, 'd'), 350)]);
    await c.say('p ile bitenler p bloğunda, d ile bitenler d bloğundadır.', { speak: 'Pe ile bitenler pe bloğunda, de ile bitenler de bloğundadır.' });
    await belir(c, blokKutusu(3, 'f'), 350);
    await c.say('f orbitaliyle biten elementler de f bloğunu oluşturur.', { speak: 'Fe orbitaliyle biten elementler de fe bloğunu oluşturur.' });

    await c.tween(350, (e) => { giris.style.opacity = 1 - e; dortlu.style.opacity = 1 - e; });
    giris.remove();
    dortlu.remove();
    /* Üç element satırı: ad · dizilimin sonu · blok */
    const satir = (i, ad, diz) => {
      const g = c.S('g', {}, svg), y = 96 + i * 150;
      kutu(c, g, 90, y, 820, 112);
      yazi(c, g, 130, y + 68, ad, { size: 32, hiza: 'start' });
      const D = dizilim(c, g, 480, y + 70, diz, { size: 40 });
      const sonuc = yazi(c, g, 870, y + 68, '', { size: 32, hiza: 'end' });
      return { g, D, sonuc };
    };
    const blokYaz = (s) => {
      const harf = s.D.orb[s.D.son].harf;
      s.D.sonHarf();
      s.sonuc.textContent = harf + ' bloğu';
      s.sonuc.style.fill = BLOK[harf];
    };
    const na = satir(0, 'Sodyum', '…3s1');
    blokYaz(na);
    await belir(c, na.g, 350);
    await c.say('Sodyumun dizilimi 3s¹ ile biter; sodyum s bloğundadır.', { speak: 'Sodyumun dizilimi üç se bir ile biter; sodyum se bloğundadır.' });
    const cl = satir(1, 'Klor', '…3s2 3p5');
    blokYaz(cl);
    await belir(c, cl.g, 350);
    await c.say('Klorun dizilimi 3p⁵ ile biter; klor p bloğundadır.', { speak: 'Klorun dizilimi üç pe beş ile biter; klor pe bloğundadır.' });

    const fe = satir(2, 'Demir', '…4s2 3d6');
    fe.sonuc.textContent = '?';
    fe.sonuc.style.fill = YER;
    await belir(c, fe.g, 350);
    await c.choice({ tag: 'Uygula', q: 'Demirin dizilimi 4s² 3d⁶ ile biter. Demir hangi bloktadır?',
      options: ['s bloğu', 'd bloğu', 'p bloğu'], answer: 1,
      hints: ['4s² sondan bir önceki orbital; dizilim onunla bitmiyor.', '', 'Dizilimin son orbitalinin harfi p değil.'],
      right: 'Dizilimin son orbitali 3d⁶: d bloğu.',
      onPick: (i, dogru) => { if (dogru) blokYaz(fe); } });
    await c.say('Dizilim 3d ile bittiği için demir d bloğundadır.', { speak: 'Dizilim üç de ile bittiği için demir de bloğundadır.' });
  }

  /* ---- Sahne 2 · Bloklar tabloda nerede? ---- */
  async function harita(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 104, h: 36, f: true });
    const not = yazi(c, svg, 434, 166, '', { size: 26 });
    const bantY = T.y0 + 7 * T.h + 32;
    const blokEtiketi = (ad, x, y = bantY, hiza = 'middle') => yazi(c, svg, x, y, ad + ' bloğu', { size: 24, renk: BLOK[ad], hiza });
    await belir(c, svg);
    await c.say('Bloklar tabloda dört ayrı bölge oluşturur.');

    T.blok('s');
    const sA = [blokEtiketi('s', (T.cx(1) + T.cx(2)) / 2), T.baslik(1, '1A', BLOK.s), T.baslik(2, '2A', BLOK.s)];
    await c.say('s bloğu soldaki iki sütundur: 1A ve 2A.', { speak: 'Se bloğu soldaki iki sütundur: bir A ve iki A.' });
    T.blok('p');
    const pA = [blokEtiketi('p', (T.cx(15) + T.cx(16)) / 2), T.baslik(13, '3A', BLOK.p), T.baslik(18, '8A', BLOK.p)];
    await c.say('p bloğu sağdaki altı sütundur: 3A’dan 8A’ya.', { speak: 'Pe bloğu sağdaki altı sütundur: üç A grubundan sekiz A grubuna.' });
    T.blok('d');
    blokEtiketi('d', 434);
    not.textContent = 'B grupları';
    not.style.fill = BLOK.d;
    await c.say('Ortadaki on sütun d bloğudur; B grupları buradadır.', { speak: 'Ortadaki on sütun de bloğudur; B grupları buradadır.' });
    not.textContent = '';
    T.blok('f');
    blokEtiketi('f', T.x0 + 3 * T.w - 62, T.fy + T.h + 8, 'end');
    await c.say('f bloğu tablonun altında ayrı durur.', { speak: 'Fe bloğu tablonun altında ayrı durur.' });

    [sA[1], sA[2], pA[1]].forEach((t) => t.remove());
    T.bekleyen(1, 18);
    const he = yazi(c, svg, T.cx(18) - 38, T.y0 + 25, 'Helyum: 1s²', { size: 26, hiza: 'end' });
    await belir(c, he, 350);
    await c.say('Helyum 8A sütununda durur, ama dizilimi 1s²’dir.',
      { speak: '[thoughtful] Helyum sekiz A sütununda durur, ama dizilimi bir se ikidir.' });
    T.yak(1, 18, 'He', BLOK.s);
    he.style.fill = BLOK.s;
    await c.say('Dizilimi s ile bittiği için helyum s bloğu elementidir.', { speak: 'Dizilimi se ile bittiği için helyum se bloğu elementidir.' });
    const sutunCercevesi = c.S('rect', { x: T.x0 + 17 * T.w - 5, y: T.y0 - 5, width: T.w + 7, height: 7 * T.h + 7, rx: 8, fill: 'none', stroke: YER, 'stroke-width': 3 }, svg);
    not.textContent = 'soy gazlar: 8A sütununda yan yana';
    not.style.fill = YER;
    await c.say('Soy gaz olduğu için öteki soy gazların yanında gösterilir.');

    sutunCercevesi.remove();
    not.textContent = '';
    he.textContent = 'Neon: …2s² 2p⁶';
    he.setAttribute('y', T.y0 + T.h + 25);
    he.setAttribute('x', T.cx(13) - 40);
    he.style.fill = 'var(--text)';
    T.bekleyen(2, 18);
    await c.choice({ tag: 'Uygula', q: 'Neon 8A grubundadır; dizilimi 2s² 2p⁶ ile biter. Neon hangi bloktadır?',
      options: ['s bloğu', 'd bloğu', 'p bloğu'], answer: 2,
      hints: ['Helyumun dizilimi s ile biter; neonunki 2p⁶ ile bitiyor.', 'Neonun diziliminde d orbitali yok.', ''],
      right: 'Dizilimin son orbitali 2p⁶: p bloğu.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        T.yak(2, 18, 'Ne', BLOK.p);
        he.style.fill = BLOK.p;
      } });
    await c.say('Neonun dizilimi p ile biter; neon p bloğundadır.', { speak: 'Neonun dizilimi pe ile biter; neon pe bloğundadır.' });
    he.textContent = '';
    not.textContent = 'bloğu belirleyen: dizilimin son orbitali';
    not.style.fill = 'var(--text)';
    await c.say('Bloğu sütunun yeri değil, dizilimin son orbitali belirler.',
      { speak: 'Bloğu sütunun yeri değil, [short pause] dizilimin son orbitali belirler.' });
    c.note('<b>Blok = dizilimin bittiği orbital türü.</b><br>Fe: …3d⁶ → d bloğu. He: 1s² → s bloğu.', 'Blok');
  }

  /* ---- Sahne 3 · d ve f blokları ---- */
  async function dVeF(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 104, h: 36, f: true });
    const bantY = T.y0 + 7 * T.h + 32, solX = T.x0 + 2 * T.w + 2;
    ['s', 'p', 'd', 'f'].forEach((ad) => T.blok(ad, 0.15));
    T.yak(1, 18, null, BLOK.s);
    T.boya(1, 18, BLOK.s, 0.15);
    T.blok('d', 0.6);
    const dAd = yazi(c, svg, 434, 172, 'geçiş metalleri', { size: 28, renk: BLOK.d });
    const dEtiket = yazi(c, svg, 434, 136, 'd bloğu', { size: 24, renk: BLOK.d });
    await belir(c, svg);
    await c.say('d bloğundaki elementlere geçiş metalleri denir.', { speak: 'De bloğundaki elementlere geçiş metalleri denir.' });
    const ornekler = [T.yak(4, 8, 'Fe'), T.yak(4, 11, 'Cu'), T.yak(4, 12, 'Zn')];
    await Promise.all(ornekler.map((t) => belir(c, t, 350)));
    await c.say('Demir, bakır ve çinko birer geçiş metalidir.');

    T.blok('d', 0.2);
    [8, 11, 12].forEach((grup) => T.yak(4, grup, null));
    dEtiket.remove();
    dAd.style.opacity = 0.6;
    T.blok('f', 0.6);
    const fAd = yazi(c, svg, (T.cx(10) + T.cx(11)) / 2, bantY, 'iç geçiş metalleri', { size: 26, renk: BLOK.f });
    await belir(c, fAd, 350);
    await c.say('f bloğundaki elementlere iç geçiş metalleri denir.', { speak: 'Fe bloğundaki elementlere iç geçiş metalleri denir.' });
    const fEtiket = yazi(c, svg, solX, T.fy + T.h + 8, 'f bloğu', { size: 24, renk: BLOK.f, hiza: 'end' });
    const fCerceve = c.S('rect', { x: T.x0 + 3 * T.w - 5, y: T.fy - 5, width: 15 * T.w + 7, height: 2 * T.h + 7, rx: 8, fill: 'none', stroke: BLOK.f, 'stroke-width': 3 }, svg);
    await belir(c, fEtiket, 350);
    await c.say('f bloğu, tablonun altında ayrı duran iki satırdır.', { speak: 'Fe bloğu, tablonun altında ayrı duran iki satırdır.' });
    fEtiket.remove();
    fCerceve.remove();
    const adlar = [
      yazi(c, svg, solX, T.fy + 25, 'lantanitler', { size: 24, hiza: 'end' }),
      yazi(c, svg, solX, T.fy + T.h + 25, 'aktinitler', { size: 24, hiza: 'end' }),
    ];
    await Promise.all(adlar.map((t) => belir(c, t, 350)));
    await c.say('Üstteki satırın adı lantanitler, alttakinin adı aktinitlerdir.');
    T.baglar.forEach((b) => { b.setAttribute('stroke', YER); b.setAttribute('stroke-width', 4); });
    const altiYedi = [T.satirNo(6, YER), T.satirNo(7, YER)];
    T.boya(6, 3, YER, 0.8);
    T.boya(7, 3, YER, 0.8);
    await c.say('Lantanitler altıncı periyodun, aktinitler yedinci periyodun elementleridir.');

    await c.choice({ tag: 'Uygula', q: 'Tablonun altındaki iki satır için hangisi doğrudur?',
      options: ['Sekizinci ve dokuzuncu periyottur.', 'Altıncı ve yedinci periyodun parçalarıdır.', 'd bloğunun son iki satırıdır.'], answer: 1,
      hints: ['Alttaki satırlar yeni periyot açmaz; kesikli çizgilerin nereye bağlandığına bak.', '', 'd bloğu ortadaki on sütundur; alttaki iki satır f bloğudur.'],
      right: 'Lantanitler altıncı, aktinitler yedinci periyodun elementleridir.' });
    altiYedi.forEach((t) => t.remove());
    const hepsi = [1, 2, 3, 4, 5, 6, 7].map((per) => { const t = T.satirNo(per, per >= 6 ? YER : PER); t.style.opacity = 0; return t; });
    await c.tween(900, (e) => { hepsi.forEach((t, i) => { t.style.opacity = c.clamp(e * 7 - i, 0, 1); }); }, c.ease.linear);
    await c.say('Tabloda yedi periyot vardır; alttaki satırlar yeni periyot değildir.',
      { speak: '[thoughtful] Tabloda yedi periyot vardır; alttaki satırlar yeni periyot değildir.' });
    T.fSatir(0, YER, 0.5);
    T.fSatir(1, YER, 0.5);
    await c.say('Ayrı çizilseler de altıncı ve yedinci periyotta sayılırlar.');
  }

  /* ---- Sahne 4 · Beş grubun özel adı ---- */
  const OZEL = [
    { ad: '1A', grup: 1, isim: 'alkali metaller', ornek: 'Li', per: 2, tekil: 'bir alkali metaldir' },
    { ad: '2A', grup: 2, isim: 'toprak alkali metaller', ornek: 'Mg', per: 3, tekil: 'bir toprak alkali metaldir' },
    { ad: '3A', grup: 13, isim: 'toprak metalleri', ornek: 'Al', per: 3, tekil: 'bir toprak metalidir' },
    { ad: '7A', grup: 17, isim: 'halojenler', ornek: 'Cl', per: 3, tekil: 'bir halojendir' },
    { ad: '8A', grup: 18, isim: 'soy gazlar', ornek: 'Ar', per: 3, tekil: 'bir soy gazdır' },
  ];
  const buyukHarf = (s) => s[0].toLocaleUpperCase('tr') + s.slice(1);
  async function ozelAdlar(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 76 });
    const not = [yazi(c, svg, 434, 122, '', { size: 26 }), yazi(c, svg, 434, 160, '', { size: 26 })];
    const yaz = (a, b = '', renk = 'var(--text)') => { not[0].textContent = a; not[1].textContent = b; not.forEach((t) => { t.style.fill = renk; }); };
    T.yak(2, 1, 'Li');
    T.yak(3, 1, 'Na');
    yaz('Li: …2s¹', 'Na: …3s¹');
    await belir(c, svg);
    await c.say('Lityumun dizilimi 2s¹, sodyumunki 3s¹ ile biter.', { speak: 'Lityumun dizilimi iki se bir, sodyumunki üç se bir ile biter.' });
    T.sutun(1);
    T.yak(2, 1, null);
    T.yak(3, 1, null);
    T.baslik(1, '1A');
    yaz('bir valans elektronu', '1A grubu', GRUP);
    await c.say('İkisinin de bir valans elektronu vardır; ikisi de 1A grubundadır.',
      { speak: 'İkisinin de bir valans elektronu vardır; ikisi de bir A grubundadır.' });
    yaz('valans elektron sayısı', '→ kimyasal özellikler');
    await c.say('Valans elektron sayısı, bir elementin kimyasal özelliklerini belirler.');
    T.sutun(1, GRUP, 0.7);
    T.yak(2, 1, null);
    T.yak(3, 1, null);
    yaz('aynı grup', '→ benzer özellikler', GRUP);
    await c.say('Bu yüzden aynı gruptaki elementler benzer özellikler gösterir.');

    T.temizle();
    yaz('Beş grubun özel adı');
    OZEL.forEach((o) => { T.sutun(o.grup, GRUP, 0.3); T.baslik(o.grup, o.ad); });
    await c.say('Beş grubun özel bir adı vardır.');
    yaz('');
    const liste = c.S('g', {}, svg);
    const satirlar = OZEL.map((o, i) => {
      const g = c.S('g', {}, liste), x = i < 3 ? 84 : 560, y = 412 + (i < 3 ? i : i - 3) * 46;
      yazi(c, g, x, y, o.ad, { size: 28, renk: GRUP, hiza: 'start' });
      yazi(c, g, x + 56, y, o.isim, { size: 28, hiza: 'start' });
      g.style.opacity = 0;
      return g;
    });
    const goster = async (yeni) => {
      satirlar.forEach((g, i) => { if (!yeni.includes(i) && +g.style.opacity > 0) g.style.opacity = 0.55; });
      OZEL.forEach((o, i) => T.sutun(o.grup, GRUP, yeni.includes(i) ? 0.75 : 0.3));
      await c.tween(350, (e) => { yeni.forEach((i) => { satirlar[i].style.opacity = e; }); });
    };
    await goster([0, 1]);
    await c.say('1A grubuna alkali metaller, 2A grubuna toprak alkali metaller denir.',
      { speak: 'Bir A grubuna alkali metaller, iki A grubuna toprak alkali metaller denir.' });
    await goster([2]);
    await c.say('3A grubunun adı toprak metalleridir.', { speak: 'Üç A grubunun adı toprak metalleridir.' });
    await goster([3, 4]);
    await c.say('7A grubuna halojenler, 8A grubuna soy gazlar denir.',
      { speak: 'Yedi A grubuna halojenler, sekiz A grubuna soy gazlar denir.' });

    OZEL.forEach((o) => T.sutun(o.grup, GRUP, 0.3));
    satirlar.forEach((g) => { g.style.opacity = 0.55; });
    const secenekler = OZEL.map((o) => buyukHarf(o.isim));
    for (let i = 0; i < OZEL.length; i++) {
      const o = OZEL[i];
      T.bekleyen(o.per, o.grup);
      await c.choice({ tag: 'Sıra sende', q: `<b>${o.ornek}</b> elementi ${o.ad} grubundadır. Grubunun özel adı hangisidir?`,
        options: secenekler, answer: i,
        hints: OZEL.map((b, j) => (j === i ? '' : buyukHarf(b.isim) + ', ' + b.ad + ' grubunun adıdır.')),
        right: o.ornek + ' ' + o.tekil + '.',
        onPick: (j, dogru) => {
          if (!dogru) return;
          T.sutun(o.grup, GRUP, 0.3);
          T.yak(o.per, o.grup, o.ornek);
          satirlar[i].style.opacity = 1;
        } });
    }
    const dalga = c.tween(1500, (e) => { OZEL.forEach((o, i) => { T.sutun(o.grup, GRUP, 0.3 + 0.45 * c.clamp(1 - Math.abs(e * 6 - 1 - i), 0, 1)); T.yak(o.per, o.grup, null); }); }, c.ease.linear);
    await c.say('Özel adı bilirsen elementin hangi sütunda olduğunu da bilirsin.');
    await dalga;
    c.note('<b>Beş grubun özel adı</b><br>1A alkali metaller · 2A toprak alkali metaller · 3A toprak metalleri · 7A halojenler · 8A soy gazlar', 'Özel adlar');
  }

  /* ---- Sahne 5 ve 6 için ortak düzen: üstte tablo, altta grubun özellik kartı ---- */
  function ozellikDuzeni(c, svg) {
    const T = tablo(c, svg, { y: 70 });
    const kartG = c.S('g', {}, svg);
    kutu(c, kartG, 84, 372, 897, 172);
    const grupAdi = yazi(c, kartG, 160, 478, '', { size: 56, renk: GRUP, kalin: 700 });
    const satirlar = [0, 1, 2].map((i) => yazi(c, kartG, 262, 424 + i * 44, '', { size: 28, hiza: 'start' }));
    const not = [yazi(c, svg, 434, 122, '', { size: 26, renk: RENK.soluk }), yazi(c, svg, 434, 160, '', { size: 26, renk: RENK.soluk })];
    const ek = c.S('g', {}, kartG);
    return {
      T, kartG, ek, satirlar,
      /* Yeni grup: tablo ve kart temizlenir, sütun parlar. */
      grup: (ad, grup) => {
        T.temizle();
        T.sutun(grup, GRUP, 0.5);
        T.baslik(grup, ad);
        grupAdi.textContent = ad;
        satirlar.forEach((t) => { t.textContent = ''; });
        ek.replaceChildren();
        not.forEach((t) => { t.textContent = ''; });
      },
      satir: (i, metin) => { satirlar[i].textContent = metin; },
      /* Geçici not: tablonun ortasındaki boşlukta, en çok iki satır. */
      not: (a = '', b = '') => { not[0].textContent = a; not[1].textContent = b; },
    };
  }

  /* ---- Sahne 5 · 1A ve 2A: iki metal grubu ---- */
  async function birIkiA(c) {
    const svg = c.svg();
    const O = ozellikDuzeni(c, svg), T = O.T;
    O.grup('1A', 1);
    T.yak(1, 1, 'H', FARKLI);
    O.satir(0, 'H: ametal');
    await belir(c, svg);
    await c.say('1A grubunun en üstünde hidrojen vardır; hidrojen bir ametaldir.',
      { speak: '[thoughtful] Bir A grubunun en üstünde hidrojen vardır; hidrojen bir ametaldir.' });
    for (let per = 2; per <= 7; per++) T.boya(per, 1, GRUP, 0.85);
    O.not('öteki elementler: alkali metal');
    await c.say('Gruptaki öteki elementler metaldir; alkali metal adı onlar içindir.');
    O.not();
    O.satir(1, 'yumuşak, parlak');
    await c.say('Alkali metaller yumuşaktır ve yüzeyleri parlaktır.');
    O.not('ısıyı ve elektriği çok iyi iletir');
    await c.say('Isıyı ve elektriği çok iyi iletirler.');
    O.not('doğada: bileşikleri hâlinde');
    await c.say('Doğada tek başlarına değil, bileşikleri hâlinde bulunurlar.');
    O.not('elektron veren atom', '→ artı yüklü iyon');
    await c.say('Elektron veren bir atom, artı yüklü iyona dönüşür.');
    O.not();
    O.satir(2, '+1 yüklü iyon');
    await c.say('Alkali metaller bileşiklerinde yalnızca +1 yüklü iyon oluşturur.',
      { speak: 'Alkali metaller bileşiklerinde yalnızca artı bir yüklü iyon oluşturur.' });
    T.yak(2, 1, 'Li');
    O.not('Li: pillerin yapısında');
    /* Küçük pil çizimi: kartın sağında. */
    kutu(c, O.ek, 760, 430, 120, 56, { rx: 8, renk: YER });
    kutu(c, O.ek, 880, 446, 12, 24, { rx: 3, renk: YER, fill: YER });
    yazi(c, O.ek, 820, 468, 'Li', { size: 28, renk: YER });
    await c.say('Lityum metali pillerin yapısında kullanılır.');

    O.grup('2A', 2);
    for (let per = 2; per <= 7; per++) T.boya(per, 2, GRUP, 0.85);
    O.satir(0, 'hepsi metal');
    await c.say('2A grubundaki elementlerin hepsi metaldir.', { speak: 'İki A grubundaki elementlerin hepsi metaldir.' });
    O.satir(1, '+2 yüklü iyon');
    await c.say('Toprak alkali metaller bileşiklerinde yalnızca +2 yüklü iyon oluşturur.',
      { speak: 'Toprak alkali metaller bileşiklerinde yalnızca artı iki yüklü iyon oluşturur.' });
    O.satir(2, 'oda koşullarında katı');
    await c.say('Oda koşullarında hepsi katıdır.');

    T.yak(4, 2, 'Ca');
    await c.choice({ tag: 'Uygula', q: 'Kalsiyum bir toprak alkali metaldir. Bileşiklerinde hangi iyonu oluşturur?',
      options: ['Ca⁺', 'Ca²⁺', 'Ca³⁺'], answer: 1,
      hints: ['+1 yüklü iyon, 1A grubundaki alkali metallerin özelliğidir.', '', 'Toprak alkali metaller bileşiklerinde yalnızca +2 yüklü iyon oluşturur.'],
      right: 'Kalsiyum 2A grubundadır: Ca²⁺.',
      onPick: (i, dogru) => { if (dogru) O.not('Ca → Ca²⁺'); } });
    await c.say('Kalsiyum 2A grubundadır; grubunun ortak özelliğini taşır: +2 yüklü iyon.',
      { speak: 'Kalsiyum iki A grubundadır; grubunun ortak özelliğini taşır: [short pause] artı iki yüklü iyon.' });
    c.note('<b>1A: H ametal, ötekiler alkali metal, +1 yüklü iyon.</b><br>2A: hepsi metal, +2 yüklü iyon.', '1A ve 2A');
  }

  /* ---- Sahne 6 · 3A, 7A ve 8A ---- */
  async function ucGrup(c) {
    const svg = c.svg();
    const O = ozellikDuzeni(c, svg), T = O.T;
    const GAZ = 'var(--c6)', SIVI = 'var(--c1)', KATI = 'var(--c4)';   // üç hâl için üç renk
    O.grup('3A', 13);
    T.yak(2, 13, 'B', FARKLI);
    for (let per = 3; per <= 7; per++) T.boya(per, 13, GRUP, 0.85);
    O.satir(0, 'B: yarı metal');
    O.not('öteki elementler: metal');
    await belir(c, svg);
    await c.say('3A grubunda bor yarı metaldir; öteki elementler metaldir.',
      { speak: 'Üç A grubunda bor yarı metaldir; öteki elementler metaldir.' });
    O.not();
    O.satir(1, 'çoğunlukla +3 yüklü iyon');
    await c.say('Toprak metalleri bileşiklerinde çoğunlukla +3 yüklü iyon oluşturur.',
      { speak: 'Toprak metalleri bileşiklerinde çoğunlukla artı üç yüklü iyon oluşturur.' });

    O.grup('7A', 17);
    const halojenler = [['F', 2], ['Cl', 3], ['Br', 4], ['I', 5]];
    halojenler.forEach(([ad, per]) => T.yak(per, 17, ad));
    O.satir(0, 'F, Cl, Br, I: ametal');
    await c.say('7A grubundan flor, klor, brom ve iyot ametaldir.',
      { speak: 'Yedi A grubundan flor, klor, brom ve iyot ametaldir.' });
    O.satir(1, 'oda sıcaklığında üç ayrı hâl');
    await c.say('Halojenler oda sıcaklığında üç ayrı hâlde bulunur.');
    [GAZ, GAZ, SIVI, KATI].forEach((renk, i) => T.boya(halojenler[i][1], 17, renk, 1));
    yazi(c, O.ek, 262, 512, 'F, Cl gaz', { size: 28, renk: GAZ, hiza: 'start' });
    nokta(c, O.ek, 418, 503);
    yazi(c, O.ek, 436, 512, 'Br sıvı', { size: 28, renk: SIVI, hiza: 'start' });
    nokta(c, O.ek, 556, 503);
    yazi(c, O.ek, 574, 512, 'I katı', { size: 28, renk: KATI, hiza: 'start' });
    await c.say('Flor ve klor gaz, brom sıvı, iyot katıdır.');

    O.grup('8A', 18);
    for (let per = 1; per <= 7; per++) T.boya(per, 18, GRUP, 0.85);
    O.satir(0, 'tek atomlu');
    /* Tek tek duran atomlar: kartın sağında. */
    [[700, 440], [790, 490], [880, 430], [930, 500], [640, 500]].forEach(([x, y]) => c.S('circle', { cx: x, cy: y, r: 13, fill: 'none', stroke: GRUP, 'stroke-width': 3 }, O.ek));
    await c.say('8A grubundaki soy gazlar tek atomlu yapıdadır.', { speak: 'Sekiz A grubundaki soy gazlar tek atomlu yapıdadır.' });
    O.not('kararlı: olağan koşullarda', 'bileşik oluşturmaz');
    await c.say('Kararlı oldukları için olağan koşullarda bileşik oluşturmazlar.');
    O.not();
    O.satir(1, 'oda sıcaklığında hepsi gaz');
    await c.say('Oda sıcaklığında soy gazların hepsi gazdır.');
    T.yak(2, 18, 'Ne');
    O.not('Ne: neon lambalar');
    await c.say('Neon, neon lambaların yapımında kullanılır.');

    O.not();
    T.yak(3, 18, 'Ar');
    await c.choice({ tag: 'Uygula', q: 'Argon 8A grubundadır. Oda sıcaklığında argon için hangisi beklenir?',
      options: ['Katı bir metaldir.', 'Sıvı bir ametaldir.', 'Tek atomlu bir gazdır.'], answer: 2,
      hints: ['Soy gazlar metal değildir; oda sıcaklığında hepsi gazdır.', 'Oda sıcaklığında soy gazların hepsi gazdır.', ''],
      right: 'Argon bir soy gazdır: tek atomlu ve gaz.' });
    O.not('Ar: soy gaz');
    await c.say('Argon bir soy gazdır; grubunun ortak özelliklerini taşır.');
    O.not('grup → özellikler');
    await c.say('Bir elementin grubunu bilmek, özelliklerini tahmin etmeyi sağlar.',
      { speak: 'Bir elementin grubunu bilmek, [short pause] özelliklerini tahmin etmeyi sağlar.' });
    c.note('<b>3A: B yarı metal, çoğunlukla +3. 7A: halojenler. 8A: tek atomlu gaz.</b>', '3A, 7A ve 8A');
  }

  /* ---- Sahne 7 · Dizilimden dört bilgi ---- */
  const BLOKLUK = [
    { simge: 'Na', ad: 'Sodyum', yazim: '…3s¹', blok: 's' },
    { simge: 'Al', ad: 'Alüminyum', yazim: '…3p¹', blok: 'p' },
    { simge: 'Ni', ad: 'Nikel', yazim: '…3d⁸', blok: 'd' },
    { simge: 'He', ad: 'Helyum', yazim: '1s²', blok: 's' },
    { simge: 'Ar', ad: 'Argon', yazim: '…3p⁶', blok: 'p' },
    { simge: 'Ti', ad: 'Titanyum', yazim: '…3d²', blok: 'd' },
  ];
  async function dortBilgi(c) {
    const svg = c.svg();
    const kart = c.S('g', {}, svg);
    kutu(c, kart, 120, 20, 760, 522);
    const baslik = yazi(c, kart, 500, 70, '', { size: 30, renk: RENK.soluk });
    const dizG = c.S('g', {}, kart);
    const toplam = yazi(c, kart, 500, 196, '', { size: 26, renk: GRUP });
    const ADLAR = ['Periyot', 'Grup', 'Blok', 'Özel ad'];
    const etiketler = ADLAR.map((ad, i) => yazi(c, kart, 470, 268 + i * 62, ad, { size: 28, renk: RENK.soluk, hiza: 'end' }));
    const degerler = ADLAR.map((ad, i) => yazi(c, kart, 500, 268 + i * 62, '', { size: 30, hiza: 'start' }));
    const deger = (i, metin, renk) => { degerler[i].textContent = metin; degerler[i].style.fill = renk; };
    await belir(c, svg);
    await c.say('Artık bir dizilimden dört bilgi çıkarabilirsin.');
    await c.tween(1200, (e) => { etiketler.forEach((t, i) => { t.style.fill = e * 4 > i ? 'var(--text)' : RENK.soluk; }); }, c.ease.linear);
    await c.say('Periyot, grup, blok ve varsa grubun özel adı.');

    baslik.textContent = 'Flor';
    const F = dizilim(c, dizG, 500, 146, '1s2 2s2 2p5', { size: 44 });
    await belir(c, F.g, 350);
    await c.say('Florun dizilimi 1s² 2s² 2p⁵.', { speak: 'Florun dizilimi bir se iki, iki se iki, iki pe beş.' });
    F.enYuksegiBoya();
    deger(0, '2', PER);
    await c.say('En yüksek enerji seviyesi iki; flor ikinci periyottadır.');
    F.cerceve(1, 2);
    toplam.setAttribute('x', F.orta(1, 2));
    toplam.textContent = '2 + 5 = 7';
    deger(1, '7A', GRUP);
    await c.say('İki artı beş, yedi; flor 7A grubundadır.', { speak: 'İki artı beş, yedi; flor yedi A grubundadır.' });
    F.sonHarf();
    deger(2, 'p', BLOK.p);
    deger(3, 'halojen', YER);
    await c.say('Dizilim p ile biter; flor p bloğunda bir halojendir.', { speak: 'Dizilim pe ile biter; flor pe bloğunda bir halojendir.' });

    dizG.replaceChildren();
    toplam.textContent = '';
    baslik.textContent = 'Potasyum';
    const K = dizilim(c, dizG, 500, 146, '…4s1', { size: 44 });
    [0, 1, 2, 3].forEach((i) => deger(i, '?', RENK.soluk));
    await c.choice({ tag: 'Uygula', q: 'Potasyumun dizilimi 4s¹ ile biter. Potasyum için hangisi doğrudur?',
      options: ['p bloğunda bir halojendir.', 'd bloğunda bir geçiş metalidir.', 's bloğunda bir alkali metaldir.'], answer: 2,
      hints: ['Dizilim p ile bitmiyor; halojenler 7A grubundadır.', 'Dizilimin son orbitali d değil; geçiş metalleri d bloğundadır.', ''],
      right: 'Dizilim 4s¹ ile bitiyor: s bloğu, 1A grubu.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        K.enYuksegiBoya();
        K.sonHarf();
        deger(0, '4', PER);
        deger(1, '1A', GRUP);
        deger(2, 's', BLOK.s);
        deger(3, 'alkali metal', YER);
      } });
    await c.say('4s¹: dördüncü periyot, 1A grubu, s bloğu; potasyum bir alkali metaldir.',
      { speak: 'Dört se bir: dördüncü periyot, bir A grubu, se bloğu; potasyum bir alkali metaldir.' });

    await sil(c, kart);
    const alan = c.S('g', {}, svg);
    const kutular = {};
    ['s', 'p', 'd'].forEach((ad, i) => {
      const x = 40 + i * 312;
      kutu(c, alan, x, 196, 296, 320, { renk: BLOK[ad] });
      yazi(c, alan, x + 148, 246, ad + ' bloğu', { size: 30, renk: BLOK[ad] });
      kutular[ad] = { x: x + 148, adet: 0 };
    });
    const bekleyen = c.S('g', {}, alan);
    kutu(c, bekleyen, 320, 30, 360, 130, { renk: YER });
    const bekAd = yazi(c, bekleyen, 500, 82, '', { size: 34 });
    const bekDiz = yazi(c, bekleyen, 500, 134, '', { size: 34, renk: YER });
    bekAd.textContent = BLOKLUK[0].simge;
    bekDiz.textContent = BLOKLUK[0].yazim;
    await belir(c, alan, 350);
    const SECENEK = ['s bloğu', 'p bloğu', 'd bloğu'], SIRA = ['s', 'p', 'd'];
    for (const el of BLOKLUK) {
      bekAd.textContent = el.simge;
      bekDiz.textContent = el.yazim;
      bekleyen.style.opacity = 1;
      const son = el.yazim[el.yazim.length - 2];
      await c.choice({ tag: 'Sıra sende', q: `<b>${el.simge}</b> (${el.yazim}) hangi bloğa girer?`,
        options: SECENEK, answer: SIRA.indexOf(el.blok),
        hints: SIRA.map((ad) => (ad === el.blok ? '' : el.simge === 'He' && ad === 'p'
          ? 'Helyum 8A sütununda durur, ama dizilimi s ile biter.' : 'Dizilimin son orbitalinin harfi ' + ad + ' değil.')),
        right: el.simge + ': dizilim ' + son + ' ile biter, ' + son + ' bloğu.',
        onPick: (i, dogru) => {
          if (!dogru) return;
          const k = kutular[el.blok];
          yazi(c, alan, k.x, 330 + k.adet * 84, el.simge + ' ' + el.yazim, { size: 32 });
          k.adet++;
          bekleyen.style.opacity = 0;
        } });
    }
    bekleyen.remove();
    await c.say('Son elektron hangi orbitaldeyse element o bloktadır.',
      { speak: 'Son elektron hangi orbitaldeyse [short pause] element o bloktadır.' });
  }

  Ders.start({
    id: 'etkilesim-f3', kicker: 'Konu F · Periyodik tabloda yer bulma', title: 'Bloğu yerleşim türü söyler', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Bloğu yerleşim türü söyler', hook: 'Dizilimin son orbitali, elementin tablonun hangi bölgesinde olduğunu söyler mi?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Dizilimin sonu bloğu söyler', goal: 'Son orbitalden bloğu bul.', run: sonBlok },
      { title: 'Bloklar tabloda nerede?', goal: 'Dört bloğun yerini ve helyumu ayır.', run: harita },
      { title: 'd ve f blokları', goal: 'Geçiş ve iç geçiş metallerinin yerini gör.', run: dVeF },
      { title: 'Beş grubun özel adı', goal: 'Beş grubu özel adıyla eşleştir.', run: ozelAdlar },
      { title: '1A ve 2A: iki metal grubu', goal: 'İki grubun ortak özelliklerini tanı.', run: birIkiA },
      { title: '3A, 7A ve 8A', goal: 'Üç grubun ortak özelliklerini tanı.', run: ucGrup },
      { title: 'Dizilimden dört bilgi', goal: 'Dizilimden periyot, grup, blok ve adı çıkar.', run: dortBilgi },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Helyum için hangisi doğrudur?',
        options: ['8A grubundadır ve p bloğu elementidir.', '8A grubundadır ve s bloğu elementidir.', '2A grubundadır ve s bloğu elementidir.'], answer: 1,
        why: ['Helyumun dizilimi 1s²; bloğu sütun değil, son orbital belirler.', 'Soy gaz olduğu için 8A’da gösterilir; dizilimi 1s² olduğu için s bloğundadır.', 'Helyum bir soy gazdır; 8A grubunda yer alır.'], scene: 1 },
      { q: 'Hidrojen 1A grubundadır. Hidrojen için hangisi doğrudur?',
        options: ['Bir alkali metaldir.', 'Bir soy gazdır.', 'Ametaldir; alkali metal değildir.'], answer: 2,
        why: ['Alkali metal adı 1A’daki öteki elementler içindir; hidrojen ametaldir.', 'Soy gazlar 8A grubundadır.', 'Hidrojen 1A’nın en üstündedir ve ametaldir.'], scene: 4 },
      { q: 'Magnezyumun dizilimi 1s² 2s² 2p⁶ 3s² ile biter. Magnezyum için hangisi doğrudur?',
        options: ['s bloğunda bir toprak alkali metaldir.', 's bloğunda bir alkali metaldir.', 'p bloğunda bir toprak metalidir.'], answer: 0,
        why: ['Dizilim 3s² ile biter: s bloğu. En yüksek enerji seviyesinde iki elektron var: 2A, yani toprak alkali metal.', 'Alkali metaller 1A grubundadır; magnezyumun en yüksek enerji seviyesinde iki elektron var.', 'Dizilim p ile bitmiyor; ayrıca toprak metalleri 3A grubundadır.'], scene: 6 },
      { q: 'Selin: “3A grubunun adı toprak metalleri olduğuna göre bu gruptaki bütün elementler metaldir.” Selin’e hangi karşılık verilmelidir?',
        options: ['Haklı; bir grubun adı, içindeki bütün elementlerin metal olduğunu gösterir.', 'Haksız; bor yarı metaldir, 3A grubunun öteki elementleri metaldir.', 'Haksız; 3A grubundaki bütün elementler yarı metaldir.'], answer: 1,
        why: ['Bor 3A grubundadır ve yarı metaldir; grubun adı her elementin özelliğini söylemez.', '3A grubunda yalnızca bor yarı metaldir; öteki elementler metaldir.', 'Yarı metal yalnızca bordur; alüminyum gibi öteki 3A elementleri metaldir.'], scene: 5 },
    ], summary: ['<b>Son elektron hangi orbitaldeyse element o bloktadır.</b>', 'Beş grubun özel adı vardır; aynı gruptaki elementler benzer özellikler gösterir.'],
    nextLesson: { href: 'f4-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
