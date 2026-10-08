/* F2 · KİM.9.1.6 · Senaryo: plan/kimya/etkilesim/senaryolar/F-periyodik-tabloda-yer-bulma.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 67–70'ten. Bakırın dizilimi kitaptaki gibi 4s¹ 3d¹⁰ verilir; nedeni anlatılmaz.
   "ns ve (n−1)d" gösterimi yerine "en son s ve d" denir. f bloğunda yer hesabı yoktur.
   Öğrenciye kitap ya da sayfa anılmaz. Tablo ve dizilim yardımcıları F1 ve F3'te de yerel olarak durur. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const PER = 'var(--c1)', GRUP = 'var(--c2)', YER = RENK.vurgu;   // periyot · grup · elementin kutusu
  const D_RENK = 'var(--c4)', S_RENK = 'var(--c6)', P_RENK = 'var(--c3)';   // dizilimin bittiği orbital türü
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

  /* ---- Periyodik tablo: 7 satır, 18 sütun; element adı yok ---- */
  const kutuVar = (per, grup) => !((per === 1 && grup > 1 && grup < 18) || (per <= 3 && grup > 2 && grup < 13));
  const ilkSatir = (grup) => (grup === 1 || grup === 18 ? 1 : grup === 2 || grup >= 13 ? 2 : 4);
  function tablo(c, p, o = {}) {
    const x0 = o.x == null ? 84 : o.x, y0 = o.y, w = o.w || 50, h = o.h || 38;
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
    const boya = (per, grup, renk, opak = 0.4) => {
      const r = kutular[per + '-' + grup];
      if (!r) return;
      r.setAttribute('fill', renk || HUCRE);
      r.setAttribute('fill-opacity', renk ? opak : 1);
      r.setAttribute('stroke', renk || KENAR);
      r.removeAttribute('stroke-dasharray');
    };
    return {
      g, yaziKat, x0, y0, w, h, cx, cy, boya,
      satir: (per, renk = PER, opak) => { for (let grup = 1; grup <= 18; grup++) boya(per, grup, renk, opak); },
      sutun: (grup, renk = GRUP, opak) => { for (let per = 1; per <= 7; per++) boya(per, grup, renk, opak); },
      /* Elementin kutusu: dolu renk ve simge. */
      yak: (per, grup, ad, renk = YER) => {
        boya(per, grup, renk, 1);
        return ad ? yazi(c, yaziKat, cx(grup), cy(per) + 9, ad, { size: 24, renk: SIYAH, kalin: 700 }) : null;
      },
      /* Henüz yerleşmemiş kutu: kesikli çerçeve. */
      bekleyen: (per, grup, renk = YER) => {
        const r = kutular[per + '-' + grup];
        r.setAttribute('stroke', renk);
        r.setAttribute('stroke-dasharray', '6 5');
      },
      satirNo: (per, renk = 'var(--text)') => yazi(c, yaziKat, x0 - 26, cy(per) + 9, String(per), { size: 26, renk }),
      /* Sütunun ilk kutusunun üstündeki ad. kat = 1: bir satır yukarı (altına numara yazılacaksa). */
      baslik: (grup, metin, renk = GRUP, kat = 0) => yazi(c, yaziKat, cx(grup), y0 + (ilkSatir(grup) - 1) * h - 10 - kat * 32, metin, { size: 24, renk }),
      temizle: () => {
        Object.keys(kutular).forEach((k) => { const [per, grup] = k.split('-'); boya(+per, +grup, null); });
        yaziKat.replaceChildren();
      },
    };
  }
  /* 8B: yan yana üç sütunun (8, 9, 10) ortak adı. */
  function sekizBParantezi(c, T) {
    const g = c.S('g', {}, T.yaziKat), y = T.y0 + 3 * T.h - 40;
    c.S('path', { d: `M ${T.cx(8) - 20} ${y + 8} L ${T.cx(8) - 20} ${y} L ${T.cx(10) + 20} ${y} L ${T.cx(10) + 20} ${y + 8}`,
      fill: 'none', stroke: GRUP, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    yazi(c, g, T.cx(9), y - 8, '8B', { size: 24, renk: GRUP });
    return g;
  }

  /* ---- Elektron dizilimi: "1s2 2s2 2p6 3s1"; ilk parça "…" ile başlayabilir. Her orbital tek <text>;
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
    /* b.x: yazının başı; b.ic: "…" ön eki varsa ondan sonraki yer (çerçeve buradan başlar). */
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
      soluk: (i, deger) => { orb[i].t.style.opacity = deger; },
      /* Yalnızca en yüksek enerji seviyesinin baş sayılarını vurgular. */
      enYuksegiBoya: (r = PER) => orb.forEach((b) => { if (b.n === D.enYuksek) b.sayi.style.fill = r; }),
      /* Dizilimin bittiği orbitalin harfini boyar. */
      sonHarf: (r) => { orb[D.son].tur.style.fill = r; },
      cerceve: (i, j = i, r = GRUP) => c.S('rect', { x: orb[i].ic - 7, y: y - size * 0.98, width: orb[j].x + orb[j].w - orb[i].ic + 14,
        height: size * 1.36, rx: 8, fill: 'none', stroke: r, 'stroke-width': 3 }, g),
    };
    return D;
  }

  /* Üstte duran element kartı: ad, dizilim ve altında toplam satırı. Dizilim sonradan da yazılabilir. */
  function elementKarti(c, p, x, w, ad, diz, o = {}) {
    const g = c.S('g', {}, p), y = o.y == null ? 12 : o.y, h = o.h || 160, orta = x + w / 2;
    const cerceve = kutu(c, g, x, y, w, h);
    const K = { g, cerceve, x, y, w, h, orta, D: null };
    K.baslik = yazi(c, g, orta, y + 42, ad, { size: 28, renk: RENK.soluk });
    K.toplam = yazi(c, g, orta, y + 146, '', { size: 28, renk: GRUP });
    K.yaz = (metin) => { K.D = dizilim(c, g, orta, y + 96, metin, { size: o.size || 32 }); return K.D; };
    /* En son s ve d orbitallerini (son iki orbital) çerçeveler; toplam satırını çerçevenin altına taşır. */
    K.sonIkiyiCercevele = () => {
      const D = K.D;
      D.cerceve(D.son - 1, D.son);
      K.toplam.setAttribute('x', D.orta(D.son - 1, D.son));
    };
    if (diz) K.yaz(diz);
    return K;
  }
  /* Enerji seviyelerindeki elektron sayıları: 2 · 8 · 8 · 2 */
  function seviyeSayilari(c, p, x, y, sayilar) {
    const g = c.S('g', {}, p), adim = 56, ilk = x - ((sayilar.length - 1) * adim) / 2;
    const yazilar = sayilar.map((adet, k) => {
      if (k) nokta(c, g, ilk + (k - 0.5) * adim, y - 9);
      return yazi(c, g, ilk + k * adim, y, String(adet), { size: 28, renk: RENK.soluk });
    });
    return { g, yazilar };
  }

  /* ---- Sahne 1 · Kuralın tıkandığı yer ---- */
  async function tikanma(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 244 });
    const not = yazi(c, svg, 434, 302, '', { size: 28 });
    const kurallar = c.S('g', {}, svg);
    yazi(c, kurallar, 500, 52, 'Önceki dersin iki kuralı', { size: 28, renk: RENK.soluk });
    await belir(c, svg);
    await c.say('Önceki derste bir elementin yerini iki kuralla bulduk.');
    await belir(c, yazi(c, kurallar, 500, 112, 'Periyot = en yüksek enerji seviyesi', { size: 30, renk: PER }), 350);
    await c.say('Periyodu, dizilimdeki en yüksek enerji seviyesi verir.');
    await belir(c, yazi(c, kurallar, 500, 168, 'A grubu = o seviyedeki elektronların toplamı', { size: 30, renk: GRUP }), 350);
    await c.say('A grubunu, o seviyedeki elektronların toplamı verir.');

    await sil(c, kurallar);
    const ca = elementKarti(c, svg, 60, 420, 'Kalsiyum', '…3p6 4s2', { h: 196 });
    ca.D.soluk(0, 0.5);
    T.yak(4, 2, 'Ca');
    T.satirNo(4, PER);
    T.baslik(2, '2A');
    await belir(c, ca.g, 350);
    await c.say('Kalsiyumun dizilimi 4s² ile biter: dördüncü periyot, 2A.',
      { speak: 'Kalsiyumun dizilimi dört se iki ile biter: dördüncü periyot, iki A.' });
    const sc = elementKarti(c, svg, 520, 420, 'Skandiyum: 21 elektron', null, { h: 196 });
    T.bekleyen(4, 3);
    await belir(c, sc.g, 350);
    await c.say('Kalsiyumdan sonraki element skandiyumdur; yirmi bir elektronu vardır.');
    const S = sc.yaz('…3p6 4s2 3d1');
    S.soluk(0, 0.5);
    S.soluk(1, 0.5);
    S.orb[2].t.style.fill = D_RENK;
    await belir(c, S.g, 350);
    await c.say('Yirmi birinci elektron 3d orbitaline girer.', { speak: 'Yirmi birinci elektron üç de orbitaline girer.' });
    sc.baslik.textContent = 'Skandiyum';
    S.soluk(1, 1);
    S.orb[2].t.style.fill = 'var(--text)';
    S.orb[2].tur.style.fill = D_RENK;
    await c.say('Skandiyumun dizilimi 4s² 3d¹ ile biter.', { speak: 'Skandiyumun dizilimi dört se iki, üç de bir ile biter.' });

    ca.D.enYuksegiBoya();
    S.enYuksegiBoya();
    ca.D.cerceve(1);
    S.cerceve(1);
    await c.say('İkisinin de en yüksek enerji seviyesi dört; orada ikişer elektron var.');
    const caSayi = seviyeSayilari(c, ca.g, ca.orta, 184, [2, 8, 8, 2]);
    const scSayi = seviyeSayilari(c, sc.g, sc.orta, 184, [2, 8, 9, 2]);
    [caSayi, scSayi].forEach((s) => { s.yazilar[3].style.fill = GRUP; });
    await Promise.all([belir(c, caSayi.g, 350), belir(c, scSayi.g, 350)]);
    await c.say('Ortaokuldaki katman yolu da ikisi için aynı yeri gösterir.');
    not.textContent = 'bir kutu, bir element';
    not.style.fill = YER;
    await c.say('Oysa tabloda bir kutuda yalnızca bir element bulunur.',
      { speak: '[thoughtful] Oysa tabloda bir kutuda yalnızca bir element bulunur.' });

    await c.choice({ tag: 'Uygula', q: 'Skandiyuma A grubu kuralını uygularsak 2A çıkar. Bu sonuç için hangisi doğrudur?',
      options: ['Doğrudur; iki element aynı kutuyu paylaşır.', 'Yanlıştır; o kutu kalsiyumundur, 3d elektronu hesaba katılmamıştır.', 'Yanlıştır; skandiyum üçüncü periyottadır.'], answer: 1,
      hints: ['Tabloda her kutuda tek bir element bulunur.', '', 'Skandiyumun diziliminde 4s² var; en yüksek enerji seviyesi dörttür.'],
      right: 'Skandiyumun kalsiyumdan bir elektronu fazla: 3d¹. Kural bu elektronu saymadı.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        not.textContent = '';
        T.yak(4, 3, 'Sc');
        T.baslik(3, '3B');
      } });
    caSayi.g.style.opacity = 0;
    scSayi.g.style.opacity = 0;
    await c.say('Skandiyum, kalsiyumun hemen sağındaki sütundadır: 3B grubu.',
      { speak: 'Skandiyum, kalsiyumun hemen sağındaki sütundadır: [short pause] üç B grubu.' });
    for (let grup = 3; grup <= 12; grup++) T.sutun(grup, D_RENK, 0.3);
    T.yak(4, 3, null);
    not.textContent = 'd ile biter → B grubu';
    not.style.fill = D_RENK;
    await c.say('Dizilimi d orbitaliyle biten elementler B grubundadır.', { speak: 'Dizilimi de orbitaliyle biten elementler B grubundadır.' });
    caSayi.g.style.opacity = 1;
    scSayi.g.style.opacity = 1;
    not.textContent = 'katman yolu: yetmez';
    not.style.fill = 'var(--bad)';
    await c.say('Ortaokuldaki katman yolu, B grubunda yeri bulmaya yetmez.');
  }

  /* ---- Sahne 2 · B grubunda örüntü ---- */
  async function oruntu(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 244 });
    const not = yazi(c, svg, 434, 302, 'B grupları', { size: 28, renk: D_RENK });
    const kural = yazi(c, svg, 500, 214, '', { size: 26, renk: GRUP });
    const bGruplari = () => { for (let grup = 3; grup <= 12; grup++) T.sutun(grup, D_RENK, 0.3); };
    const kart = (i, ad, diz) => elementKarti(c, svg, 24 + i * 324, 304, ad, diz);
    bGruplari();
    await belir(c, svg);
    await c.say('B grubunda grubu bulmak için örneklere bakalım.');

    not.textContent = '';
    const basliklar = [];
    const sc = kart(0, 'Skandiyum', '…4s2 3d1');
    T.yak(4, 3, 'Sc');
    basliklar.push(T.baslik(3, '3B'));
    await belir(c, sc.g, 350);
    await c.say('Skandiyum 3B grubundadır; dizilimi 4s² 3d¹ ile biter.',
      { speak: 'Skandiyum üç B grubundadır; dizilimi dört se iki, üç de bir ile biter.' });
    const v = kart(1, 'Vanadyum', '…4s2 3d3');
    T.yak(4, 5, 'V');
    basliklar.push(T.baslik(5, '5B'));
    await belir(c, v.g, 350);
    await c.say('Vanadyum 5B grubundadır; dizilimi 4s² 3d³ ile biter.',
      { speak: 'Vanadyum beş B grubundadır; dizilimi dört se iki, üç de üç ile biter.' });
    sc.sonIkiyiCercevele();
    sc.toplam.textContent = '2 + 1 = 3';
    await c.say('Skandiyumda iki artı bir, üç eder.');
    v.sonIkiyiCercevele();
    v.toplam.textContent = '2 + 3 = 5';
    await c.say('Vanadyumda iki artı üç, beş eder.');
    sc.toplam.textContent = '3';
    v.toplam.textContent = '5';
    kural.textContent = 'en son s ve d toplamı = grup numarası';
    await c.say('İkisinde de en son s ve d elektronlarının toplamı, grup numarasıyla aynı.',
      { speak: 'İkisinde de en son se ve de elektronlarının toplamı, grup numarasıyla aynı.' });

    kural.textContent = '';
    const mn = kart(2, 'Mangan', '…4s2 3d5');
    mn.sonIkiyiCercevele();
    mn.toplam.textContent = '?';
    await belir(c, mn.g, 350);
    await c.choice({ tag: 'Uygula', q: 'Manganın dizilimi 4s² 3d⁵ ile biter. Bu örüntüye göre mangan hangi gruptadır?',
      options: ['5B', '7B', '2B'], answer: 1,
      hints: ['Yalnızca 3d⁵ sayılmış; 4s² elektronları da toplanır.', '', 'Yalnızca 4s² sayılmış; 3d⁵ elektronları da toplanır.'],
      right: '2 + 5 = 7: örüntüye göre 7B.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        mn.toplam.textContent = '2 + 5 = 7';
        T.yak(4, 7, 'Mn');
        basliklar.push(T.baslik(7, '7B'));
      } });
    await c.say('İki artı beş, yedi; mangan gerçekten 7B grubundadır.',
      { speak: 'İki artı beş, yedi; mangan gerçekten yedi B grubundadır.' });

    mn.toplam.textContent = '7';
    basliklar.forEach((t) => t.remove());
    T.satir(4, PER, 0.35);
    [3, 5, 7].forEach((grup) => T.yak(4, grup, null));
    T.satirNo(4, PER);
    [sc, v, mn].forEach((k) => k.D.enYuksegiBoya());
    await c.say('Üçünün de en yüksek enerji seviyesi dörttür; üçü de dördüncü periyottadır.');
    [sc, v, mn].forEach((k) => k.D.soluk(1, 0.45));
    kural.textContent = 'periyot: en yüksek enerji seviyesi';
    kural.style.fill = PER;
    await c.say('Son yazılan orbital 3d olsa da periyodu en yüksek enerji seviyesi verir.',
      { speak: '[thoughtful] Son yazılan orbital üç de olsa da periyodu en yüksek enerji seviyesi verir.' });
  }

  /* ---- Sahne 3 · Sekiz, dokuz, on: 8B ---- */
  async function sekizB(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 244 });
    const not = yazi(c, svg, 434, 290, '', { size: 28, renk: 'var(--bad)' });
    const kural = yazi(c, svg, 500, 214, '', { size: 26, renk: GRUP });
    const kart = (i, ad) => elementKarti(c, svg, 24 + i * 324, 304, ad, null);
    const fe = kart(0, 'Demir'), co = kart(1, 'Kobalt'), ni = kart(2, 'Nikel');
    await belir(c, svg);
    await c.say('Örüntüyü üç yeni elementte deneyelim: demir, kobalt ve nikel.');

    fe.yaz('…4s2 3d6');
    fe.sonIkiyiCercevele();
    fe.toplam.textContent = '2 + 6 = 8';
    await belir(c, fe.D.g, 350);
    await c.say('Demirin dizilimi 4s² 3d⁶ ile biter: toplam sekiz.',
      { speak: 'Demirin dizilimi dört se iki, üç de altı ile biter: toplam sekiz.' });
    T.yak(4, 8, 'Fe');
    const tekBaslik = T.baslik(8, '8B');
    await c.say('Demir 8B grubundadır; örüntü tuttu.', { speak: 'Demir sekiz B grubundadır; örüntü tuttu.' });

    fe.toplam.textContent = '8';
    co.yaz('…4s2 3d7');
    co.sonIkiyiCercevele();
    co.toplam.textContent = '2 + 7 = 9';
    await belir(c, co.D.g, 350);
    await c.say('Kobaltın dizilimi 4s² 3d⁷ ile biter: toplam dokuz.',
      { speak: 'Kobaltın dizilimi dört se iki, üç de yedi ile biter: toplam dokuz.' });
    not.textContent = '9B diye bir grup yok';
    await c.say('Ama tabloda 9B diye bir grup yoktur.', { speak: '[thoughtful] Ama tabloda dokuz B diye bir grup yoktur.' });

    not.textContent = '';
    tekBaslik.remove();
    [8, 9, 10].forEach((grup) => T.sutun(grup, GRUP, 0.35));
    T.yak(4, 8, null);
    await belir(c, sekizBParantezi(c, T), 350);
    await c.say('Harfli adlandırmada 8B, yan yana üç sütunun ortak adıdır.',
      { speak: 'Harfli adlandırmada sekiz B, yan yana üç sütunun ortak adıdır.' });
    const numaralar = [8, 9, 10].map((grup) => T.baslik(grup, String(grup), 'var(--text)'));
    await Promise.all(numaralar.map((t) => belir(c, t, 350)));
    await c.say('Bu sütunlar numarayla sekizinci, dokuzuncu ve onuncu gruptur.');
    T.yak(4, 9, 'Co');
    co.toplam.textContent = '9 → 8B';
    await c.say('Kobalt dokuzuncu gruptadır; harfli adı yine 8B’dir.', { speak: 'Kobalt dokuzuncu gruptadır; harfli adı yine sekiz B’dir.' });

    co.toplam.textContent = '9';
    ni.yaz('…4s2 3d8');
    ni.sonIkiyiCercevele();
    ni.toplam.textContent = '?';
    await belir(c, ni.D.g, 350);
    await c.choice({ tag: 'Uygula', q: 'Nikelin dizilimi 4s² 3d⁸ ile biter. Nikel hangi gruptadır?',
      options: ['10B', '8B', '2B'], answer: 1,
      hints: ['Toplam on, ama 10B diye bir ad yok; onuncu sütunun harfli adını düşün.', '', 'Yalnızca 4s² sayılmış; 3d⁸ elektronları da toplanır.'],
      right: '2 + 8 = 10; onuncu sütun 8B adını taşıyan üç sütundan biridir.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        ni.toplam.textContent = '2 + 8 = 10';
        T.yak(4, 10, 'Ni');
      } });
    await c.say('İki artı sekiz, on eder; onuncu grubun harfli adı 8B’dir.',
      { speak: 'İki artı sekiz, on eder; onuncu grubun harfli adı sekiz B’dir.' });
    ni.toplam.textContent = '10';
    kural.textContent = 'toplam 8, 9, 10 → 8B';
    await c.say('Toplam sekiz, dokuz ya da on ise grup 8B’dir.',
      { speak: 'Toplam sekiz, dokuz ya da on ise [short pause] grup sekiz B’dir.' });
    c.note('<b>B grubu = en son s + d elektronları. 8, 9, 10 → 8B.</b><br>Co: 2 + 7 = 9 → 8B', 'B grubu');
  }

  /* ---- Sahne 4 · On bir ve on iki: 1B, 2B ---- */
  async function birBikiB(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 244 });
    const not = yazi(c, svg, 434, 290, '', { size: 28, renk: 'var(--bad)' });
    const kural = yazi(c, svg, 500, 214, '', { size: 26, renk: GRUP });
    const kart = (i, ad, diz) => elementKarti(c, svg, 24 + i * 324, 304, ad, diz);
    [8, 9, 10].forEach((grup) => T.sutun(grup, GRUP, 0.15));
    const parantez = sekizBParantezi(c, T);
    parantez.style.opacity = 0.5;
    [11, 12].forEach((grup) => T.sutun(grup, GRUP));
    T.baslik(11, '1B', GRUP, 1);
    T.baslik(12, '2B', GRUP, 1);
    await belir(c, svg);
    await c.say('8B’nin sağında iki B sütunu daha vardır: 1B ve 2B.',
      { speak: 'Sekiz B grubunun sağında iki B sütunu daha vardır: bir B ve iki B.' });
    const numaralar = [11, 12].map((grup) => T.baslik(grup, String(grup), 'var(--text)'));
    await Promise.all(numaralar.map((t) => belir(c, t, 350)));
    await c.say('Bunlar numarayla on birinci ve on ikinci gruptur.');

    parantez.remove();
    const cu = kart(1, 'Bakır', '…4s1 3d10');
    await belir(c, cu.g, 350);
    await c.say('Bakırın dizilimi 4s¹ 3d¹⁰ ile biter.', { speak: 'Bakırın dizilimi dört se bir, üç de on ile biter.' });
    cu.sonIkiyiCercevele();
    cu.toplam.textContent = '1 + 10 = 11';
    T.yak(4, 11, 'Cu');
    await c.say('Bir artı on, on bir eder; bakır 1B grubundadır.', { speak: 'Bir artı on, on bir eder; bakır bir B grubundadır.' });
    cu.toplam.textContent = '11';
    const zn = kart(2, 'Çinko', '…4s2 3d10');
    zn.sonIkiyiCercevele();
    zn.toplam.textContent = '2 + 10 = 12';
    await belir(c, zn.g, 350);
    await c.say('Çinkonun dizilimi 4s² 3d¹⁰ ile biter.', { speak: 'Çinkonun dizilimi dört se iki, üç de on ile biter.' });

    await c.choice({ tag: 'Uygula', q: 'Çinkonun s ve d elektronlarının toplamı on iki. Çinko hangi gruptadır?',
      options: ['2A', '12B', '2B'], answer: 2,
      hints: ['Çinkonun dizilimi d ile biter; A grubunda olamaz.', 'Harfli adlar on ikiye kadar saymaz; on birinci sütunun adı 1B idi.', ''],
      right: 'On birinci sütun 1B; bir sonraki sütun 2B.',
      onPick: (i, dogru) => { if (dogru) T.yak(4, 12, 'Zn'); } });
    not.textContent = '12B diye bir ad yok';
    await c.say('On ikinci grubun harfli adı 2B’dir; 12B diye bir ad yoktur.',
      { speak: 'On ikinci grubun harfli adı iki B’dir; on iki B diye bir ad yoktur.' });
    not.textContent = '';
    zn.toplam.textContent = '12';
    const ca = kart(0, 'Kalsiyum', '…4s2');
    ca.D.sonHarf(S_RENK);
    T.sutun(2, S_RENK, 0.3);
    T.yak(4, 2, 'Ca', S_RENK);
    T.baslik(2, '2A', S_RENK);
    await belir(c, ca.g, 350);
    await c.say('2A ise dizilimi s ile biten kalsiyumun grubudur.', { speak: 'İki A ise dizilimi se ile biten kalsiyumun grubudur.' });
    kural.textContent = '11 → 1B, 12 → 2B';
    await c.say('Toplam on bir ise grup 1B, on iki ise 2B’dir.', { speak: 'Toplam on bir ise grup bir B, on iki ise iki B’dir.' });
  }

  /* ---- Sahne 5 · Genellemeyi kurallarla karşılaştır ---- */
  async function kurallar(c) {
    const svg = c.svg();
    const kartlar = c.S('g', {}, svg);
    const ust = c.S('g', {}, kartlar), solG = c.S('g', {}, kartlar), sagG = c.S('g', {}, kartlar);
    kutu(c, ust, 120, 22, 760, 106, { renk: PER });
    const solKutu = kutu(c, solG, 50, 150, 430, 330);
    const sagKutu = kutu(c, sagG, 520, 150, 430, 330);
    await belir(c, svg);
    await c.say('Örneklerden bir genelleme çıkardık; şimdi bilimsel kurallarla karşılaştıralım.');

    const periyot = yazi(c, ust, 500, 86, 'Periyot: en yüksek enerji seviyesi', { size: 32, renk: PER });
    await belir(c, periyot, 350);
    await c.say('Birinci kural: en yüksek enerji seviyesi periyot numarasıdır.',
      { speak: 'Birinci kural: [short pause] en yüksek enerji seviyesi periyot numarasıdır.' });
    periyot.setAttribute('y', 70);
    const ikisi = yazi(c, ust, 500, 110, 'A ve B gruplarında geçerli', { size: 26, renk: RENK.soluk });
    [solKutu, sagKutu].forEach((r) => r.setAttribute('stroke', PER));
    await c.say('Bu kural A ve B gruplarının ikisinde de geçerlidir.');
    ikisi.remove();
    periyot.setAttribute('y', 86);
    sagKutu.setAttribute('stroke', RENK.cizgi);
    solKutu.setAttribute('stroke', GRUP);

    const solIc = c.S('g', {}, solG), solYazi = c.S('g', {}, solIc);
    yazi(c, solIc, 265, 232, 'A', { size: 64, renk: GRUP, kalin: 700 });
    yazi(c, solYazi, 265, 300, 's ya da p ile biter', { size: 28 });
    await belir(c, solIc, 350);
    await c.say('İkinci kural: dizilim s ya da p ile bitiyorsa element A grubundadır.',
      { speak: 'İkinci kural: dizilim se ya da pe ile bitiyorsa element A grubundadır.' });
    await belir(c, yazi(c, solYazi, 265, 356, 'en yüksek seviyedeki toplam', { size: 28, renk: GRUP }), 350);
    await c.say('A grubunda en yüksek enerji seviyesindeki toplam elektron sayısı grup numarasıdır.');

    solKutu.setAttribute('stroke', RENK.cizgi);
    sagKutu.setAttribute('stroke', GRUP);
    const sagIc = c.S('g', {}, sagG);
    yazi(c, sagIc, 735, 232, 'B', { size: 64, renk: GRUP, kalin: 700 });
    yazi(c, sagIc, 735, 300, 'd ile biter', { size: 28 });
    await belir(c, sagIc, 350);
    await c.say('Üçüncü kural: dizilim d ile bitiyorsa element B grubundadır.',
      { speak: 'Üçüncü kural: dizilim de ile bitiyorsa element B grubundadır.' });
    const toplam = yazi(c, sagG, 735, 356, 'en son s + d', { size: 28, renk: GRUP });
    await belir(c, toplam, 350);
    await c.say('B grubunda en son s ve d elektronlarının toplamı grup numarasını verir.',
      { speak: 'B grubunda en son se ve de elektronlarının toplamı grup numarasını verir.' });

    solYazi.remove();
    solIc.style.opacity = 0.5;
    const serit = c.S('g', {}, sagG), sx = 595, sw = 56;
    [[0, 3, '8B'], [3, 1, '1B'], [4, 1, '2B']].forEach(([ilk, adet, ad]) => {
      kutu(c, serit, sx + ilk * sw, 384, adet * sw - 4, 38, { rx: 6, renk: GRUP, kalin: 2 });
      yazi(c, serit, sx + (ilk + adet / 2) * sw - 2, 412, ad, { size: 24, renk: GRUP });
    });
    [8, 9, 10, 11, 12].forEach((no, i) => yazi(c, serit, sx + (i + 0.5) * sw - 2, 456, String(no), { size: 24 }));
    await belir(c, serit, 350);
    await c.say('8B, 1B ve 2B için bulduğumuz eşlemeler de bu kuralın parçasıdır.',
      { speak: 'Sekiz B, bir B ve iki B için bulduğumuz eşlemeler de bu kuralın parçasıdır.' });
    serit.remove();
    await belir(c, yazi(c, sagG, 735, 412, '= valans elektronları', { size: 28 }), 350);
    await c.say('B grubunda toplanan bu elektronlar, elementin valans elektronlarıdır.');

    await c.tween(300, (e) => { solG.style.opacity = 1 - e; sagG.style.opacity = 1 - e; });
    solG.remove();
    sagG.remove();
    const ornekler = c.S('g', {}, svg);
    const kart = (i, ad, diz) => elementKarti(c, ornekler, 24 + i * 324, 304, ad, diz, { y: 170, h: 130 });
    const ca = kart(0, 'Kalsiyum', '…4s2'), cl = kart(1, 'Klor', '…3s2 3p5'), sc = kart(2, 'Skandiyum', '…4s2 3d1');
    await belir(c, ornekler, 350);
    await c.choice({ tag: 'Uygula', q: 'Bir öğrenci şu genellemeyi yazmış: “Periyot, en son yazılan orbitalin başındaki sayıdır.” Bu genelleme hangi elementte yanlış sonuç verir?',
      options: ['Kalsiyum: …4s²', 'Klor: …3s² 3p⁵', 'Skandiyum: …4s² 3d¹'], answer: 2,
      hints: ['Kalsiyumda son yazılan orbital 4s; iki yol da dört verir.', 'Klorda son yazılan orbital 3p; iki yol da üç verir.', ''],
      right: 'Skandiyumda son yazılan orbital 3d; genelleme üç der, oysa periyot dörttür.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        ca.g.style.opacity = 0.4;
        cl.g.style.opacity = 0.4;
        sc.cerceve.setAttribute('stroke', YER);
      } });
    sc.D.orb[1].sayi.style.fill = 'var(--bad)';
    sc.D.enYuksegiBoya();
    const karsi = c.S('g', {}, svg);
    yazi(c, karsi, 824, 350, 'son yazılan: 3', { size: 26, renk: 'var(--bad)' });
    yazi(c, karsi, 824, 392, 'en yüksek: 4', { size: 26, renk: PER });
    await belir(c, karsi, 350);
    await c.say('Skandiyumda son yazılan orbital 3d’dir, ama en yüksek enerji seviyesi dörttür.',
      { speak: 'Skandiyumda son yazılan orbital üç de orbitalidir, ama en yüksek enerji seviyesi dörttür.' });
    const sonuc = c.S('g', {}, svg);
    yazi(c, sonuc, 360, 480, 'en son yazılan', { size: 30, renk: 'var(--bad)' });
    c.S('line', { x1: 258, y1: 470, x2: 462, y2: 470, stroke: 'var(--bad)', 'stroke-width': 3 }, sonuc);
    yazi(c, sonuc, 640, 480, 'en yüksek', { size: 30, renk: PER });
    await belir(c, sonuc, 350);
    await c.say('Kural “en son yazılan” demez, “en yüksek” der.', { speak: '[thoughtful] Kural en son yazılan demez, en yüksek der.' });
    c.note('<b>Periyot = en yüksek enerji seviyesi.</b><br>s ya da p ile biten A, d ile biten B grubundadır.', 'Yer bulma kuralları');
  }

  /* ---- Sahne 6 · A mı, B mi? Yeni atomlar ---- */
  const ATOMLAR = [
    { no: 1, simge: 'Al', diz: '…3s2 3p1', yazim: '…3s² 3p¹', per: 3, grup: 13, ad: '3A', neden: 'p ile biter; üçüncü enerji seviyesinde 2 + 1 = 3 elektron: 3A.' },
    { no: 2, simge: 'Co', diz: '…4s2 3d7', yazim: '…4s² 3d⁷', per: 4, grup: 9, ad: '8B', neden: 'd ile biter; 2 + 7 = 9, harfli adı 8B.' },
    { no: 3, simge: 'Zn', diz: '…4s2 3d10', yazim: '…4s² 3d¹⁰', per: 4, grup: 12, ad: '2B', neden: 'd ile biter; 2 + 10 = 12, harfli adı 2B.' },
    { no: 4, simge: 'Br', diz: '…4s2 3d10 4p5', yazim: '…4s² 3d¹⁰ 4p⁵', per: 4, grup: 17, ad: '7A', neden: 'p ile biter; dördüncü enerji seviyesinde 2 + 5 = 7 elektron: 7A.' },
  ];
  async function yeniAtomlar(c) {
    const svg = c.svg();
    const sema = c.S('g', {}, svg), solDal = c.S('g', {}, sema), sagDal = c.S('g', {}, sema);
    yazi(c, sema, 500, 50, 'Dizilim hangi orbitalle bitiyor?', { size: 30 });
    const dal = (g, x, tur, kuralMetni) => {
      c.S('path', { d: `M 500 66 L ${x} 104`, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, g);
      const r = kutu(c, g, x - 180, 104, 360, 100);
      yazi(c, g, x, 144, tur, { size: 30 });
      yazi(c, g, x, 186, kuralMetni, { size: 26, renk: GRUP });
      g.style.opacity = 0;
      return r;
    };
    const solKutu = dal(solDal, 280, 's ya da p', 'A grubu kuralı');
    dal(sagDal, 720, 'd', 'B grubu kuralı');
    await belir(c, svg);
    await c.say('Yer bulurken önce dizilimin hangi orbitalle bittiğine bak.');
    await c.tween(350, (e) => { solDal.style.opacity = e; });
    await c.say('s ya da p ile bitiyorsa A grubu kuralını kullan.', { speak: 'Se ya da pe ile bitiyorsa A grubu kuralını kullan.' });
    await c.tween(350, (e) => { sagDal.style.opacity = e; });
    await c.say('d ile bitiyorsa B grubu kuralını kullan.', { speak: 'De ile bitiyorsa B grubu kuralını kullan.' });

    const as = elementKarti(c, svg, 170, 660, 'Arsenik', '…4s2 3d10 4p3', { y: 236, h: 200, size: 40 });
    as.toplam.setAttribute('y', 412);
    await belir(c, as.g, 350);
    await c.say('Arseniğin dizilimi 4s² 3d¹⁰ 4p³ ile biter.', { speak: 'Arseniğin dizilimi dört se iki, üç de on, dört pe üç ile biter.' });
    as.D.sonHarf(P_RENK);
    solKutu.setAttribute('stroke', P_RENK);
    sagDal.style.opacity = 0.4;
    as.toplam.textContent = 'p ile biter: A grubu';
    as.toplam.style.fill = P_RENK;
    await c.say('Dizilim p ile bittiği için arsenik A grubundadır.', { speak: 'Dizilim pe ile bittiği için arsenik A grubundadır.' });

    sagDal.remove();
    as.toplam.textContent = '';
    await c.choice({ tag: 'Uygula', q: 'Arsenik hangi gruptadır?',
      options: ['3A', '5A', '15A'], answer: 1,
      hints: ['Yalnızca 4p³ sayılmış; 4s² de dördüncü enerji seviyesindedir.', '', '3d¹⁰ elektronları da sayılmış; onlar üçüncü enerji seviyesindedir.'],
      right: 'Dördüncü enerji seviyesinde 2 + 3 = 5 elektron: 5A.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        as.D.enYuksegiBoya();
        as.D.cerceve(0);
        as.D.cerceve(2);
        as.toplam.textContent = '2 + 3 = 5 → 5A';
        as.toplam.style.fill = GRUP;
      } });
    await c.say('Dördüncü enerji seviyesinde 4s² ve 4p³ var: beş elektron, 5A.',
      { speak: 'Dördüncü enerji seviyesinde dört se iki ve dört pe üç var: beş elektron, beş A.' });
    as.D.soluk(1, 0.35);
    await c.say('3d¹⁰ üçüncü enerji seviyesindedir; A grubunda sayıma girmez.',
      { speak: 'Üç de on üçüncü enerji seviyesindedir; A grubunda sayıma girmez.' });

    await c.tween(350, (e) => { svg.style.opacity = 1 - e; });
    svg.replaceChildren();
    svg.style.opacity = 1;
    const T = tablo(c, svg, { y: 244 });
    const kartlar = c.S('g', {}, svg);
    const atomKartlari = ATOMLAR.map((a, i) => {
      const k = elementKarti(c, kartlar, 20 + i * 242, 234, a.simge, a.diz, { y: 16, h: 150, size: 26 });
      k.baslik.style.fill = 'var(--text)';
      c.S('circle', { cx: k.x + 34, cy: k.y + 32, r: 18, fill: 'none', stroke: YER, 'stroke-width': 3 }, k.g);
      yazi(c, k.g, k.x + 34, k.y + 41, String(a.no), { size: 24, renk: YER });
      return k;
    });
    await belir(c, svg, 350);
    const secenekler = ATOMLAR.map((a) => a.per + '. periyot, ' + a.ad);
    const harf = (a) => a.ad[a.ad.length - 1];
    for (let i = 0; i < ATOMLAR.length; i++) {
      const a = ATOMLAR[i], k = atomKartlari[i];
      k.cerceve.setAttribute('stroke', YER);
      const ipucu = ATOMLAR.map((b, j) => {
        if (j === i) return '';
        if (b.per !== a.per) return 'Periyot için dizilimdeki en yüksek enerji seviyesine bak.';
        if (harf(b) !== harf(a)) return 'Önce son orbitale bak: s ya da p ise A, d ise B grubu.';
        return 'Grup harfi doğru; toplamı yeniden say.';
      });
      await c.choice({ tag: 'Sıra sende', q: `<b>${a.no}. kart · ${a.simge}:</b> ${a.yazim}. Hangi kutuya yerleşir?`,
        options: secenekler, answer: i, hints: ipucu, right: a.simge + ': ' + a.neden,
        onPick: (j, dogru) => {
          if (!dogru) return;
          k.cerceve.setAttribute('stroke', RENK.cizgi);
          k.g.style.opacity = 0.5;
          T.yak(a.per, a.grup, a.simge);
          T.baslik(a.grup, a.ad);
        } });
    }
    await sil(c, kartlar);
    const adimlar = c.S('g', {}, svg);
    [['1', 'son orbitalin türü'], ['2', 'en yüksek enerji seviyesi'], ['3', 'toplam']].forEach(([no, metin], i) => {
      const y = 50 + i * 54;
      c.S('circle', { cx: 290, cy: y - 9, r: 18, fill: 'none', stroke: YER, 'stroke-width': 3 }, adimlar);
      yazi(c, adimlar, 290, y, no, { size: 24, renk: YER });
      yazi(c, adimlar, 326, y, metin, { size: 28, hiza: 'start' });
    });
    await belir(c, adimlar, 350);
    await c.say('Önce son orbitalin türü, sonra en yüksek enerji seviyesi, sonra toplam.');
    await c.tween(700, (e) => { adimlar.style.opacity = 0.55 + 0.45 * Math.abs(1 - 2 * e); });
    await c.say('Kural, yeni örnekte de tutuyorsa kuraldır.', { speak: 'Kural, yeni örnekte de tutuyorsa [short pause] kuraldır.' });
  }

  Ders.start({
    id: 'etkilesim-f2', kicker: 'Konu F · Periyodik tabloda yer bulma', title: 'Yeni örnek kuralı sınar', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Yeni örnek kuralı sınar', hook: 'Dizilim d orbitaliyle bitiyorsa grubu nasıl bulursun?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Kuralın tıkandığı yer', goal: 'A grubu kuralını skandiyumda sına.', run: tikanma },
      { title: 'B grubunda örüntü', goal: 's ve d toplamını grupla karşılaştır.', run: oruntu },
      { title: 'Sekiz, dokuz, on: 8B', goal: 'Üç sütunun ortak adını bul.', run: sekizB },
      { title: 'On bir ve on iki: 1B, 2B', goal: 'Son iki B sütununu adlandır.', run: birBikiB },
      { title: 'Genellemeyi kurallarla karşılaştır', goal: 'Üç kuralı genellemenle karşılaştır.', run: kurallar },
      { title: 'A mı, B mi? Yeni atomlar', goal: 'Dört atomu tablodaki kutusuna yerleştir.', run: yeniAtomlar },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Titanyumun dizilimi 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d². Titanyumun yeri neresidir?',
        options: ['3. periyot, 4B', '4. periyot, 4B', '4. periyot, 2A'], answer: 1,
        why: ['Son yazılan orbitale bakılmış; en yüksek enerji seviyesi dörttür.', 'En yüksek enerji seviyesi dört; dizilim d ile biter ve 2 + 2 = 4.', 'd elektronları sayılmamış; dizilim d ile bittiği için element B grubundadır.'], scene: 1 },
      { q: 'Galyumun dizilimi 4s² 3d¹⁰ 4p¹ ile biter. Galyumun yeri neresidir?',
        options: ['4. periyot, 3B', '4. periyot, 13A', '4. periyot, 3A'], answer: 2,
        why: ['Dizilim p ile biter; element A grubundadır.', '3d¹⁰ elektronları da sayılmış; A grubunda yalnızca dördüncü enerji seviyesindekiler sayılır.', 'Dizilim p ile biter; dördüncü enerji seviyesinde 2 + 1 = 3 elektron var.'], scene: 5 },
    ], summary: ['<b>Kural, yeni örnekte de tutuyorsa kuraldır.</b>', 'Dizilim d ile bitiyorsa en son s ve d elektronları toplanır: 8, 9, 10 → 8B; 11 → 1B; 12 → 2B.'],
    nextLesson: { href: 'f3-bloklar-ve-gruplar.html', label: 'Sonraki: Bloğu yerleşim türü söyler ›' },
  });
})();
