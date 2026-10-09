/* F1 · KİM.9.1.6 · Senaryo: plan/kimya/etkilesim/senaryolar/F-periyodik-tabloda-yer-bulma.md (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 14, 54, 62–63, 66–70 ve 73'ten; periyot, grup, katman elektron dağılımı ve
   soy gazların yeri ortaokul ön bilgisi. Tablo çizimi s. 67'deki tablonun boş hâlidir (7 satır, 18 sütun).
   Öğrenciye kitap ya da sayfa anılmaz. Tablo ve dizilim yardımcıları F2 ve F3'te de yerel olarak durur. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const PER = 'var(--c1)', GRUP = 'var(--c2)', YER = RENK.vurgu;   // periyot · grup · elementin kutusu
  const SEVIYE = [null, 'var(--c6)', 'var(--c3)', 'var(--c4)', 'var(--c1)'];   // 1.–4. enerji seviyesi
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
      kutu: (per, grup) => kutular[per + '-' + grup],
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
      baslik: (grup, metin, renk = GRUP) => yazi(c, yaziKat, cx(grup), y0 + (ilkSatir(grup) - 1) * h - 10, metin, { size: 24, renk }),
      temizle: () => {
        Object.keys(kutular).forEach((k) => { const [per, grup] = k.split('-'); boya(+per, +grup, null); });
        yaziKat.replaceChildren();
      },
    };
  }

  /* ---- Elektron dizilimi: "1s2 2s2 2p6 3s1". Her orbital tek <text>; baş sayı, harf ve üst sayı ayrı <tspan>
     olduğu için ayrı ayrı boyanır. (x, y): satırın ortası ve taban çizgisi. ---- */
  const UST = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
  const ustSayi = (n) => String(n).split('').map((r) => UST[+r]).join('');
  function dizilim(c, p, x, y, metin, o = {}) {
    const size = o.size || 32, bosluk = o.bosluk || size * 0.6, g = c.S('g', {}, p);
    const orb = metin.split(' ').map((parca) => {
      const t = c.S('text', { x: 0, y, 'font-size': size, 'font-weight': 600, 'text-anchor': 'start', style: 'fill:var(--text)' }, g);
      const n = +parca[0], harf = parca[1], e = +parca.slice(2);
      const sayi = c.S('tspan', { text: String(n) }, t), tur = c.S('tspan', { text: harf }, t), us = c.S('tspan', { text: ustSayi(e) }, t);
      return { t, n, harf, e, sayi, tur, us };
    });
    let gen = -bosluk;
    orb.forEach((b) => { b.w = b.t.getComputedTextLength() || size * 1.5; gen += b.w + bosluk; });
    let sol = x - gen / 2;
    orb.forEach((b) => { b.x = sol; b.t.setAttribute('x', sol); sol += b.w + bosluk; });
    const D = {
      g, orb, y, size,
      enYuksek: Math.max(...orb.map((b) => b.n)),
      orta: (i, j = i) => (orb[i].x + orb[j].x + orb[j].w) / 2,
      /* Orbitalin tamamını boyar. */
      renk: (i, r) => { orb[i].t.style.fill = r; },
      soluk: (i, deger) => { orb[i].t.style.opacity = deger; },
      /* Baş sayıları enerji seviyesinin rengine boyar. */
      seviyeRenkleri: (tamami = false) => orb.forEach((b) => { (tamami ? b.t : b.sayi).style.fill = SEVIYE[b.n]; }),
      /* Yalnızca en yüksek enerji seviyesinin baş sayılarını vurgular. */
      enYuksegiBoya: (r = PER) => orb.forEach((b) => { if (b.n === D.enYuksek) b.sayi.style.fill = r; }),
      cerceve: (i, j = i, r = GRUP) => c.S('rect', { x: orb[i].x - 8, y: y - size * 0.98, width: orb[j].x + orb[j].w - orb[i].x + 16,
        height: size * 1.36, rx: 8, fill: 'none', stroke: r, 'stroke-width': 3 }, g),
      altCizgi: (i, j = i, r = RENK.cizgi) => c.S('line', { x1: orb[i].x, y1: y + size * 0.32, x2: orb[j].x + orb[j].w, y2: y + size * 0.32,
        stroke: r, 'stroke-width': 4, 'stroke-linecap': 'round' }, g),
    };
    return D;
  }
  /* En yüksek enerji seviyesindeki orbitalleri çerçeveler (ardışık olanlar tek çerçeve). */
  function disCerceve(D, renk = GRUP) {
    const dis = D.orb.map((b, i) => (b.n === D.enYuksek ? i : -1)).filter((i) => i >= 0);
    const parcalar = [];
    dis.forEach((i) => {
      const son = parcalar[parcalar.length - 1];
      if (son && son[1] === i - 1) son[1] = i; else parcalar.push([i, i]);
    });
    return parcalar.map(([i, j]) => D.cerceve(i, j, renk));
  }

  /* Üstte duran element kartı: ad ve dizilim. */
  function elementKarti(c, p, x, w, ad, diz, o = {}) {
    const g = c.S('g', {}, p), y = o.y == null ? 18 : o.y, h = o.h || 132;
    kutu(c, g, x, y, w, h);
    yazi(c, g, x + w / 2, y + 42, ad, { size: 28, renk: RENK.soluk });
    const D = dizilim(c, g, x + w / 2, y + 96, diz, { size: o.size || 30 });
    return { g, D, x, y, w, h, orta: x + w / 2 };
  }

  /* ---- Sahne 1 · Periyot ve grup ---- */
  async function yer(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 150, h: 48 });
    const not = yazi(c, svg, 434, 232, '', { size: 28 });
    const sirali = [[1, 1], [1, 18], [2, 1], [2, 2], [2, 13], [2, 14], [2, 15], [2, 16], [2, 17], [2, 18]];
    const atomNo = c.S('g', {}, svg);
    const noYazilari = sirali.map(([per, grup], i) => {
      const t = yazi(c, atomNo, T.cx(grup), T.cy(per) + 9, String(i + 1), { size: 24, renk: RENK.soluk });
      t.style.opacity = 0;
      return t;
    });
    await belir(c, T.g);
    not.textContent = 'atom numarası artar';
    not.style.fill = RENK.soluk;
    const say = c.tween(1400, (e) => { noYazilari.forEach((t, i) => { t.style.opacity = c.clamp(e * 10 - i, 0, 1); }); }, c.ease.linear);
    await c.say('Periyodik tabloda elementler artan atom numarasına göre sıralanır.');
    await say;

    await sil(c, atomNo, 250);
    T.satir(3);
    not.textContent = 'yatay sıra: periyot';
    not.style.fill = PER;
    await c.say('Tablodaki yatay sıralara periyot denir.');
    const satirlar = [1, 2, 3, 4, 5, 6, 7].map((per) => { const t = T.satirNo(per, PER); t.style.opacity = 0; return t; });
    await c.tween(900, (e) => { satirlar.forEach((t, i) => { t.style.opacity = c.clamp(e * 7 - i, 0, 1); }); }, c.ease.linear);
    await c.say('Yukarıdan aşağıya yedi periyot vardır.');

    T.satir(3, null);
    T.sutun(1);
    not.textContent = 'dikey sütun: grup';
    not.style.fill = GRUP;
    await c.say('Dikey sütunlara grup denir.');
    not.textContent = '';
    const sutunlar = [];
    for (let grup = 1; grup <= 18; grup++) {
      const t = yazi(c, svg, T.cx(grup), T.y0 - 14, String(grup), { size: 24, renk: GRUP });
      t.style.opacity = 0;
      sutunlar.push(t);
    }
    await c.tween(1200, (e) => { sutunlar.forEach((t, i) => { t.style.opacity = c.clamp(e * 18 - i, 0, 1); }); }, c.ease.linear);
    await c.say('Soldan sağa on sekiz grup vardır.');

    await c.tween(300, (e) => { sutunlar.slice(1).forEach((t) => { t.style.opacity = 1 - e; }); });
    sutunlar.slice(1).forEach((t) => t.remove());
    T.satir(3);
    T.sutun(1);
    T.yak(3, 1);
    not.textContent = 'Yer: periyot ve grup';
    not.style.fill = 'var(--text)';
    await c.say('Bir elementin yeri, periyodu ve grubuyla söylenir.');
    T.yak(3, 1, 'Na');
    not.textContent = 'Na: 3. periyot, 1. grup';
    await c.say('Sodyum üçüncü periyotta, soldan birinci gruptadır.');

    T.bekleyen(3, 2);
    const soru = yazi(c, T.yaziKat, T.cx(2), T.cy(3) + 9, '?', { size: 26, renk: YER });
    not.textContent = '';
    await c.choice({ tag: 'Uygula', q: 'Magnezyum, sodyumun hemen sağındaki kutudadır. Magnezyumun yeri neresidir?',
      options: ['2. periyot, soldan 3. grup', '3. periyot, soldan 2. grup', '4. periyot, soldan 1. grup'], answer: 1,
      hints: ['Magnezyum sodyumla aynı yatay sırada; periyot değişmez.', '', 'Sağdaki kutuya geçince sütun değişir, satır aynı kalır.'],
      right: 'Aynı sıra, bir sonraki sütun: 3. periyot, 2. grup.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        soru.remove();
        T.yak(3, 2, 'Mg');
        yazi(c, svg, T.cx(2), T.y0 - 14, '2', { size: 24, renk: GRUP });
        not.textContent = 'Mg: 3. periyot, 2. grup';
      } });
    const y = T.y0 - 23, x1 = T.cx(1) + 13, x2 = T.cx(2) - 13;
    c.S('path', { d: `M ${x1} ${y} L ${x2} ${y} M ${x2 - 8} ${y - 6} L ${x2} ${y} L ${x2 - 8} ${y + 6}`,
      fill: 'none', stroke: GRUP, 'stroke-width': 3, 'stroke-linecap': 'round' }, svg);
    not.textContent = 'bir kutu sağa: grup bir artar';
    not.style.fill = GRUP;
    await c.say('Aynı periyotta bir kutu sağa geçince grup bir artar.');
  }

  /* ---- Sahne 2 · Grubun iki adı ---- */
  async function ikiAd(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 184, h: 44 });
    const yHarf = 124, yNo = 164;
    const serit = c.S('g', {}, svg);
    kutu(c, serit, T.x0 - 6, yHarf - 27, 18 * T.w + 9, 36, { rx: 6, renk: GRUP, kalin: 2 });
    kutu(c, serit, T.x0 - 6, yNo - 27, 18 * T.w + 9, 36, { rx: 6, kalin: 2 });
    const baslik = yazi(c, svg, 500, 62, 'Grupların iki adı', { size: 30, renk: RENK.soluk });
    const harf = (grup, metin, x = T.cx(grup)) => yazi(c, svg, x, yHarf, metin, { size: 24, renk: GRUP });
    const no = (grup, metin = String(grup)) => yazi(c, svg, T.cx(grup), yNo, metin, { size: 24 });
    const boya = (ilk, son, renk, opak) => { for (let grup = ilk; grup <= son; grup++) T.sutun(grup, renk, opak); };
    await belir(c, svg);
    await c.say('Grupların iki farklı adlandırması vardır.');

    baslik.textContent = 'Harfli ad: sayı ve harf';
    const ornekler = [harf(1, '1A'), harf(2, '2A'), harf(3, '3B')];
    await Promise.all(ornekler.map((t) => belir(c, t, 350)));
    await c.say('Birincisinde bir sayı ve bir harf kullanılır: 1A, 2A, 3B gibi.',
      { speak: 'Birincisinde bir sayı ve bir harf kullanılır: bir A, iki A, üç B gibi.' });
    baslik.textContent = 'Numara: birden on sekize';
    const hepsi = [];
    for (let grup = 1; grup <= 18; grup++) { const t = no(grup); t.style.opacity = 0; hepsi.push(t); }
    await c.tween(1200, (e) => { hepsi.forEach((t, i) => { t.style.opacity = c.clamp(e * 18 - i, 0, 1); }); }, c.ease.linear);
    await c.say('İkincisinde sütunlar soldan sağa birden on sekize numaralanır.');

    ornekler.forEach((t) => t.remove());
    baslik.textContent = '';
    const kurum = c.S('g', {}, svg);
    yazi(c, kurum, 434, 228, 'IUPAC', { size: 32, renk: YER });
    await belir(c, kurum, 350);
    await c.say('Bu adlandırmayı IUPAC kabul etmiştir.', { speak: 'Bu adlandırmayı ayupak kabul etmiştir.' });
    const acilim = c.S('g', {}, kurum);
    yazi(c, acilim, 434, 266, 'Uluslararası Temel ve', { size: 24 });
    yazi(c, acilim, 434, 298, 'Uygulamalı Kimya Birliği', { size: 24 });
    await belir(c, acilim, 350);
    await c.say('IUPAC, Uluslararası Temel ve Uygulamalı Kimya Birliğidir.',
      { speak: 'Ayupak, Uluslararası Temel ve Uygulamalı Kimya Birliğidir.' });

    await c.tween(300, (e) => { kurum.style.opacity = 1 - e; hepsi.forEach((t) => { t.style.opacity = 1 - e; }); });
    kurum.remove();
    hepsi.forEach((t) => t.remove());
    const sol = c.S('g', {}, svg);
    boya(1, 2, GRUP);
    [harf(1, '1A'), harf(2, '2A'), no(1), no(2)].forEach((t) => sol.appendChild(t));
    baslik.textContent = 'Soldaki iki sütun';
    await belir(c, sol, 350);
    await c.say('Soldaki iki sütun 1A ve 2A’dır: birinci ve ikinci grup.',
      { speak: 'Soldaki iki sütun bir A ve iki A gruplarıdır: birinci ve ikinci grup.' });

    sol.style.opacity = 0.5;
    boya(1, 2, GRUP, 0.15);
    boya(3, 12, GRUP);
    const ortaAd = harf(0, 'B grupları', (T.cx(7) + T.cx(8)) / 2);
    const ortaNo = c.S('g', {}, svg);
    for (let grup = 3; grup <= 12; grup++) ortaNo.appendChild(no(grup));
    baslik.textContent = 'Ortadaki on sütun';
    await Promise.all([belir(c, ortaAd, 350), belir(c, ortaNo, 350)]);
    await c.say('Ortadaki on sütun B gruplarıdır; üçten on ikiye numaralanır.');

    ortaNo.remove();
    ortaAd.style.opacity = 0.5;
    boya(3, 12, GRUP, 0.15);
    boya(13, 18, GRUP);
    const sag = c.S('g', {}, svg);
    for (let grup = 13; grup <= 18; grup++) sag.appendChild(harf(grup, (grup - 10) + 'A'));
    baslik.textContent = 'Sağdaki altı sütun';
    await belir(c, sag, 350);
    await c.say('Sağdaki altı sütun 3A’dan 8A’ya uzanır.', { speak: 'Sağdaki altı sütun üç A grubundan sekiz A grubuna uzanır.' });
    const uclar = [no(13), no(18)];
    await Promise.all(uclar.map((t) => belir(c, t, 350)));
    await c.say('3A on üçüncü, 8A on sekizinci gruptur.', { speak: 'Üç A on üçüncü, sekiz A on sekizinci gruptur.' });

    boya(13, 18, GRUP, 0.15);
    T.sutun(17, GRUP, 0.6);
    const bilinmeyen = no(17, '?');
    bilinmeyen.style.fill = YER;
    baslik.textContent = '';
    await c.choice({ tag: 'Uygula', q: 'Klor 7A grubundadır. Bu grubun numarayla adı hangisidir?',
      options: ['7. grup', '17. grup', '18. grup'], answer: 1,
      hints: ['Yedinci grup ortadaki B sütunlarından biridir; sağdaki A grupları on üçten başlar.', '', 'On sekizinci grup en sağdaki 8A sütunudur.'],
      right: '3A on üçüncü grupsa 7A dört sütun sağındadır: on yedinci grup.',
      onPick: (i, dogru) => { if (dogru) bilinmeyen.textContent = '17'; } });
    await c.say('7A, 8A’nın hemen solundadır: on yedinci grup.',
      { speak: 'Yedi A, sekiz A grubunun hemen solundadır: [short pause] on yedinci grup.' });
    bilinmeyen.style.fill = 'var(--text)';
    boya(13, 18, GRUP);
    const kalan = [14, 15, 16].map((grup) => no(grup));
    sol.style.opacity = 1;
    boya(1, 2, GRUP);
    baslik.textContent = 'Sütun aynı, ad farklı';
    await Promise.all(kalan.map((t) => belir(c, t, 350)));
    await c.say('Sütun aynıdır, yalnızca adı değişir.');
    c.note('<b>Grubun iki adı vardır.</b><br>1A = 1. grup, 3A = 13. grup, 8A = 18. grup', 'Grubun iki adı');
  }

  /* ---- Sahne 3 · Katman dağılımından dizilime ---- */
  function katmanliAtom(c, p, cx, cy, sayilar) {
    const g = c.S('g', {}, p), yaricap = [58, 100, 142];
    c.S('circle', { cx, cy, r: 30, fill: KOYU, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    yazi(c, g, cx, cy + 9, 'Na', { size: 26 });
    const halkalar = sayilar.map((adet, k) => {
      const halka = c.S('circle', { cx, cy, r: yaricap[k], fill: 'none', stroke: RENK.cizgi, 'stroke-width': 2.5 }, g);
      const elektronlar = [];
      for (let i = 0; i < adet; i++) {
        const aci = -Math.PI / 2 + (i / adet) * 2 * Math.PI + k * 0.4;
        const e = c.S('circle', { cx: cx + yaricap[k] * Math.cos(aci), cy: cy + yaricap[k] * Math.sin(aci), r: 8, fill: 'var(--text)' }, g);
        e.style.opacity = 0;
        elektronlar.push(e);
      }
      return { halka, elektronlar };
    });
    return { g, halkalar };
  }
  async function katman(c) {
    const svg = c.svg();
    const solG = c.S('g', {}, svg);
    yazi(c, solG, 245, 52, 'Katman elektron dağılımı', { size: 28, renk: RENK.soluk });
    const atom = katmanliAtom(c, solG, 245, 232, [2, 8, 1]);
    await belir(c, solG);
    await c.say('Ortaokulda bir elementin yerini katman elektron dağılımıyla bulmuştun.');

    const sayilar = [2, 8, 1].map((adet, k) => { const t = yazi(c, solG, 195 + k * 50, 428, String(adet), { size: 32 }); t.style.opacity = 0; return t; });
    [220, 270].forEach((x) => nokta(c, solG, x, 418));
    for (let k = 0; k < 3; k++) {
      await c.tween(450, (e) => { atom.halkalar[k].elektronlar.forEach((el) => { el.style.opacity = e; }); sayilar[k].style.opacity = e; });
    }
    await c.say('Sodyumun on bir elektronu üç katmana 2, 8, 1 diye dağılır.',
      { speak: 'Sodyumun on bir elektronu üç katmana iki, sekiz, bir diye dağılır.' });
    const sonuc = c.S('g', {}, solG);
    yazi(c, sonuc, 245, 484, '3 katman → 3. periyot', { size: 26, renk: PER });
    yazi(c, sonuc, 245, 524, 'son katmanda 1 → 1A', { size: 26, renk: GRUP });
    await belir(c, sonuc, 350);
    await c.say('Üç katman üçüncü periyodu, son katmandaki bir elektron 1A’yı gösterir.',
      { speak: 'Üç katman üçüncü periyodu, son katmandaki bir elektron bir A grubunu gösterir.' });

    await sil(c, sonuc, 250);
    const sagG = c.S('g', {}, svg);
    c.S('line', { x1: 480, y1: 40, x2: 480, y2: 520, stroke: RENK.cizgi, 'stroke-width': 2, 'stroke-dasharray': '6 8' }, sagG);
    yazi(c, sagG, 725, 52, 'Elektron dizilimi', { size: 28, renk: RENK.soluk });
    const D = dizilim(c, sagG, 725, 240, '1s2 2s2 2p6 3s1', { size: 42 });
    D.orb.forEach((b) => { b.us.style.fillOpacity = 0; });
    await belir(c, sagG);
    await c.say('Önceki derslerde elektronları katmanlara değil, orbitallere yerleştirdik.');
    await c.tween(450, (e) => { D.orb.forEach((b) => { b.us.style.fillOpacity = e; }); });
    await c.say('Sodyumun elektron dizilimi 1s² 2s² 2p⁶ 3s¹ olur.',
      { speak: 'Sodyumun elektron dizilimi bir se iki, iki se iki, iki pe altı, üç se bir olur.' });
    D.seviyeRenkleri();
    const etiket = yazi(c, sagG, 725, 160, 'baş sayı: enerji seviyesi', { size: 26 });
    await belir(c, etiket, 350);
    await c.say('Orbitalin başındaki sayı, enerji seviyesini gösterir.');

    atom.halkalar.forEach((h, k) => {
      h.halka.setAttribute('stroke', SEVIYE[k + 1]);
      h.elektronlar.forEach((el) => el.setAttribute('fill', SEVIYE[k + 1]));
      sayilar[k].style.fill = SEVIYE[k + 1];
    });
    etiket.textContent = 'katman = enerji seviyesi';
    await c.say('Ortaokulda katman dediğimiz şey, enerji seviyesidir.');
    const toplamlar = c.S('g', {}, sagG);
    [[0, 0, '2'], [1, 2, '2 + 6 = 8'], [3, 3, '1']].forEach(([i, j, metin], k) => {
      D.altCizgi(i, j, SEVIYE[k + 1]);
      yazi(c, toplamlar, D.orta(i, j), 312, metin, { size: 28, renk: SEVIYE[k + 1] });
    });
    await belir(c, toplamlar, 350);
    await c.say('İkinci enerji seviyesinde 2s² ve 2p⁶ var: toplam sekiz elektron.',
      { speak: 'İkinci enerji seviyesinde iki se iki ve iki pe altı var: toplam sekiz elektron.' });

    await c.tween(350, (e) => { svg.style.opacity = 1 - e; });
    svg.replaceChildren();
    svg.style.opacity = 1;
    const al = c.S('g', {}, svg);
    kutu(c, al, 150, 70, 700, 330);
    yazi(c, al, 500, 126, 'Alüminyum', { size: 30, renk: RENK.soluk });
    const A = dizilim(c, al, 500, 220, '1s2 2s2 2p6 3s2 3p1', { size: 44 });
    A.seviyeRenkleri();
    [[0, 0], [1, 2], [3, 4]].forEach(([i, j], k) => A.altCizgi(i, j, SEVIYE[k + 1]));
    const ucuncu = yazi(c, al, A.orta(3, 4), 300, '?', { size: 32, renk: SEVIYE[3] });
    await belir(c, al, 350);
    await c.choice({ tag: 'Uygula', q: 'Alüminyumun dizilimi 1s² 2s² 2p⁶ 3s² 3p¹. Üçüncü enerji seviyesinde kaç elektron vardır?',
      options: ['1', '3', '13'], answer: 1,
      hints: ['Bu yalnızca 3p¹ orbitalindeki elektron; 3s² de üçle başlıyor.', '', 'On üç, atomdaki bütün elektronların sayısıdır.'],
      right: 'Üçle başlayan orbitaller 3s² ve 3p¹: 2 + 1 = 3.',
      onPick: (i, dogru) => { if (dogru) ucuncu.textContent = '2 + 1 = 3'; } });
    await c.say('3s² ve 3p¹ aynı enerji seviyesindedir: iki artı bir, üç elektron.',
      { speak: 'Üç se iki ve üç pe bir aynı enerji seviyesindedir: iki artı bir, üç elektron.' });
    ucuncu.textContent = '3';
    const otekiler = c.S('g', {}, al);
    yazi(c, otekiler, A.orta(0, 0), 300, '2', { size: 32, renk: SEVIYE[1] });
    yazi(c, otekiler, A.orta(1, 2), 300, '8', { size: 32, renk: SEVIYE[2] });
    yazi(c, otekiler, 500, 364, 'her enerji seviyesindeki elektron sayısı', { size: 26, renk: RENK.soluk });
    await belir(c, otekiler, 350);
    await c.say('Dizilimden, her enerji seviyesindeki elektron sayısı da okunur.');
  }

  /* ---- Sahne 4 · Periyodu dizilim söyler ---- */
  async function periyot(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 236 });
    const kartlar = c.S('g', {}, svg);
    const kural = yazi(c, svg, 500, 198, '', { size: 26, renk: PER });
    const bos = [0, 1, 2].map((i) => kutu(c, kartlar, 24 + i * 324, 18, 304, 132, { kesik: true, kalin: 2 }));
    await belir(c, svg);
    await c.say('Şimdi dizilimi, elementin tablodaki yeriyle yan yana koyalım.');

    bos[0].remove();
    const li = elementKarti(c, kartlar, 24, 304, 'Lityum', '1s2 2s1');
    T.satir(2);
    T.satirNo(2, PER);
    T.yak(2, 1, 'Li');
    await belir(c, li.g, 350);
    await c.say('Lityumun dizilimi 1s² 2s¹; lityum ikinci periyottadır.',
      { speak: 'Lityumun dizilimi bir se iki, iki se bir; lityum ikinci periyottadır.' });
    bos[1].remove();
    const kar = elementKarti(c, kartlar, 348, 304, 'Karbon', '1s2 2s2 2p2');
    T.yak(2, 14, 'C');
    await belir(c, kar.g, 350);
    await c.say('Karbonun dizilimi 1s² 2s² 2p²; karbon da ikinci periyottadır.',
      { speak: 'Karbonun dizilimi bir se iki, iki se iki, iki pe iki; karbon da ikinci periyottadır.' });
    [li, kar].forEach((k) => { k.D.enYuksegiBoya(); k.D.soluk(0, 0.5); });
    await c.say('İkisinin de en yüksek enerji seviyesi ikidir.');

    bos[2].remove();
    const na = elementKarti(c, kartlar, 672, 304, 'Sodyum', '1s2 2s2 2p6 3s1');
    na.D.enYuksegiBoya();
    [0, 1, 2].forEach((i) => na.D.soluk(i, 0.5));
    T.satir(2, PER, 0.15);
    T.yak(2, 1, null);
    T.yak(2, 14, null);
    T.satir(3);
    T.satirNo(3, PER);
    T.yak(3, 1, 'Na');
    await belir(c, na.g, 350);
    await c.say('Sodyumun en yüksek enerji seviyesi üçtür; sodyum üçüncü periyottadır.');
    kural.textContent = 'en yüksek enerji seviyesi → periyot';
    await belir(c, kural, 350);
    await c.say('Demek ki dizilimdeki en yüksek enerji seviyesi, periyot numarasını verir.',
      { speak: 'Demek ki dizilimdeki en yüksek enerji seviyesi, [short pause] periyot numarasını verir.' });

    await sil(c, kartlar);
    kural.textContent = '';
    T.temizle();
    const s = elementKarti(c, svg, 190, 620, 'Kükürt', '1s2 2s2 2p6 3s2 3p4', { size: 36 });
    await belir(c, s.g, 350);
    await c.choice({ tag: 'Uygula', q: 'Kükürdün dizilimi 1s² 2s² 2p⁶ 3s² 3p⁴. Kükürt kaçıncı periyottadır?',
      options: ['2. periyot', '3. periyot', '4. periyot'], answer: 1,
      hints: ['Dizilimde üçle başlayan orbitaller de var.', '', 'Dört, en sondaki üst sayıdır; dörtle başlayan orbital yok.'],
      right: 'En yüksek enerji seviyesi üç: kükürt üçüncü periyottadır.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        T.satir(3);
        T.satirNo(3, PER);
        T.yak(3, 16, 'S');
      } });
    s.D.enYuksegiBoya();
    [0, 1, 2].forEach((i) => s.D.soluk(i, 0.5));
    await c.say('En büyük baş sayı üç; kükürt üçüncü periyottadır.');
    s.D.orb.forEach((b) => { b.t.style.opacity = 1; b.us.style.fill = GRUP; });
    kural.textContent = 'üstteki küçük sayılar: elektron sayısı';
    kural.style.fill = GRUP;
    await c.say('Üstteki küçük sayılar elektron sayısıdır; periyodu göstermez.',
      { speak: '[thoughtful] Üstteki küçük sayılar elektron sayısıdır; periyodu göstermez.' });
    c.note('<b>Periyot = dizilimdeki en yüksek enerji seviyesi.</b><br>S: …3s² 3p⁴ → 3. periyot', 'Periyot');
  }

  /* ---- Sahne 5 · A grubunu dizilim söyler ---- */
  async function aGrubu(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 244, h: 38 });
    const kartlar = c.S('g', {}, svg);
    const kural = yazi(c, svg, 500, 212, '', { size: 26, renk: GRUP });
    const kart = (i, ad, diz) => {
      const k = elementKarti(c, kartlar, 24 + i * 324, 304, ad, diz, { y: 12, h: 160 });
      k.D.enYuksegiBoya();
      disCerceve(k.D);
      const dis = k.D.orb.map((b, j) => (b.n === k.D.enYuksek ? j : -1)).filter((j) => j >= 0);
      k.toplam = yazi(c, k.g, k.D.orta(dis[0], dis[dis.length - 1]), 158, '', { size: 28, renk: GRUP });
      return k;
    };
    const li = kart(0, 'Lityum', '1s2 2s1');
    await belir(c, svg);
    await c.say('Grup için de dizilimin en yüksek enerji seviyesine bakarız.');
    li.toplam.textContent = '1';
    T.sutun(1);
    T.baslik(1, '1A');
    T.yak(2, 1, 'Li');
    await c.say('Lityumun en yüksek enerji seviyesinde bir elektron var; lityum 1A grubundadır.',
      { speak: 'Lityumun en yüksek enerji seviyesinde bir elektron var; lityum bir A grubundadır.' });

    const be = kart(1, 'Berilyum', '1s2 2s2');
    be.toplam.textContent = '2';
    T.sutun(1, GRUP, 0.15);
    T.yak(2, 1, null);
    T.sutun(2);
    T.baslik(2, '2A');
    T.yak(2, 2, 'Be');
    await belir(c, be.g, 350);
    await c.say('Berilyumun dizilimi 1s² 2s²; berilyum 2A grubundadır.',
      { speak: 'Berilyumun dizilimi bir se iki, iki se iki; berilyum iki A grubundadır.' });
    const kar = kart(2, 'Karbon', '1s2 2s2 2p2');
    kar.toplam.textContent = '2 + 2 = 4';
    await belir(c, kar.g, 350);
    await c.say('Karbonun en yüksek enerji seviyesinde 2s² ve 2p² var: dört elektron.',
      { speak: 'Karbonun en yüksek enerji seviyesinde iki se iki ve iki pe iki var: dört elektron.' });
    T.sutun(2, GRUP, 0.15);
    T.yak(2, 2, null);
    T.sutun(14);
    T.baslik(14, '4A');
    T.yak(2, 14, 'C');
    await c.say('Karbon 4A grubundadır.', { speak: 'Karbon dört A grubundadır.' });

    kar.toplam.textContent = '4';
    T.temizle();
    [1, 2, 13, 14, 15, 16, 17, 18].forEach((grup) => T.sutun(grup));
    [li, be, kar].forEach((k) => { const son = k.D.orb[k.D.orb.length - 1]; son.tur.style.fill = YER; });
    kural.textContent = 's ya da p ile biter → A grubu';
    await c.say('Dizilimi s ya da p orbitaliyle biten elementler A grubundadır.',
      { speak: 'Dizilimi se ya da pe orbitaliyle biten elementler A grubundadır.' });
    kural.textContent = 'en yüksek enerji seviyesindeki elektronlar = grup numarası';
    await c.say('A grubunda en yüksek enerji seviyesindeki toplam elektron sayısı, grup numarasıdır.',
      { speak: 'A grubunda en yüksek enerji seviyesindeki toplam elektron sayısı, [short pause] grup numarasıdır.' });
    kural.textContent = 'bu elektronlar: valans elektronları';
    await c.say('Bu elektronlar, daha önce tanıdığın valans elektronlarıdır.');

    await sil(c, kartlar);
    kural.textContent = '';
    T.temizle();
    const cl = elementKarti(c, svg, 190, 620, 'Klor', '1s2 2s2 2p6 3s2 3p5', { size: 36, y: 12, h: 160 });
    cl.D.enYuksegiBoya();
    disCerceve(cl.D);
    const toplam = yazi(c, cl.g, cl.D.orta(3, 4), 160, '?', { size: 28, renk: GRUP });
    await belir(c, cl.g, 350);
    await c.choice({ tag: 'Uygula', q: 'Klorun dizilimi 1s² 2s² 2p⁶ 3s² 3p⁵. Klor hangi gruptadır?',
      options: ['5A', '7A', '3A'], answer: 1,
      hints: ['Yalnızca 3p⁵ elektronlarını saydın; 3s² de aynı enerji seviyesindedir.', '', 'Üç, en yüksek enerji seviyesinin numarasıdır; grup için oradaki elektronlar sayılır.'],
      right: 'Üçüncü enerji seviyesinde 2 + 5 = 7 elektron var: 7A.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        toplam.textContent = '2 + 5 = 7';
        T.sutun(17);
        T.baslik(17, '7A');
        T.yak(3, 17, 'Cl');
      } });
    await c.say('3s² ve 3p⁵: iki artı beş, yedi; klor 7A grubundadır.',
      { speak: 'Üç se iki ve üç pe beş: iki artı beş, yedi; klor yedi A grubundadır.' });
    kural.textContent = 'yalnızca 3p⁵ sayılırsa 5 çıkar: eksik';
    kural.style.fill = 'var(--bad)';
    await c.say('Yalnızca p elektronlarını sayarsan grubu eksik bulursun.',
      { speak: '[thoughtful] Yalnızca pe elektronlarını sayarsan grubu eksik bulursun.' });
    c.note('<b>A grubu = en yüksek enerji seviyesindeki s + p elektronları.</b><br>Cl: 2 + 5 = 7 → 7A', 'A grubu');
  }

  /* ---- Sahne 6 · Dördüncü periyot: selenyum ---- */
  async function selenyum(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 250, h: 38 });
    T.satir(4);
    T.satirNo(4, PER);
    const uclar = c.S('g', {}, svg);
    yazi(c, uclar, T.cx(1), T.cy(4) + 9, '19', { size: 24 });
    yazi(c, uclar, T.cx(18), T.cy(4) + 9, '36', { size: 24 });
    await belir(c, svg);
    await c.say('Dördüncü periyot, on dokuzuncu elementten otuz altıncıya kadar uzanır.');
    for (let grup = 3; grup <= 12; grup++) T.boya(4, grup, SEVIYE[3], 0.55);
    const dEtiket = yazi(c, uclar, (T.cx(7) + T.cx(8)) / 2, T.y0 + 3 * T.h - 14, '3d orbitalleri dolar', { size: 26, renk: SEVIYE[3] });
    await belir(c, dEtiket, 350);
    await c.say('Bu periyotta 3d orbitalleri de dolar.', { speak: 'Bu periyotta üç de orbitalleri de dolar.' });

    const kart = c.S('g', {}, svg);
    yazi(c, kart, 500, 40, 'Selenyum: 34 elektron', { size: 28, renk: RENK.soluk });
    await belir(c, kart, 350);
    await c.say('Selenyumun otuz dört elektronu vardır.');
    const ust = dizilim(c, kart, 500, 88, '1s2 2s2 2p6 3s2 3p6', { size: 32 });
    const alt = dizilim(c, kart, 500, 136, '4s2 3d10 4p4', { size: 32, bosluk: 28 });
    ust.g.style.opacity = 0;
    alt.g.style.opacity = 0;
    await c.tween(400, (e) => { ust.g.style.opacity = 0.5 * e; alt.g.style.opacity = e; });
    await c.say('Dizilimi 4s² 3d¹⁰ 4p⁴ ile biter.', { speak: 'Dizilimi dört se iki, üç de on, dört pe dört ile biter.' });
    ust.g.style.opacity = 1;
    ust.seviyeRenkleri(true);
    alt.seviyeRenkleri(true);
    await c.say('3d orbitalleri 4s’ten sonra dolar, ama üçüncü enerji seviyesindedir.',
      { speak: '[thoughtful] Üç de orbitalleri dört se orbitalinden sonra dolar, ama üçüncü enerji seviyesindedir.' });
    const ara = yazi(c, kart, 500, 186, '2 + 6 + 10 = 18', { size: 28, renk: SEVIYE[3] });
    await belir(c, ara, 350);
    await c.say('Üçüncü enerji seviyesinde 3s², 3p⁶ ve 3d¹⁰ var: on sekiz elektron.',
      { speak: 'Üçüncü enerji seviyesinde üç se iki, üç pe altı ve üç de on var: on sekiz elektron.' });
    ara.remove();
    const sayilar = c.S('g', {}, kart);
    [2, 8, 18, 6].forEach((adet, k) => yazi(c, sayilar, 401 + k * 66, 186, String(adet), { size: 30, renk: SEVIYE[k + 1] }));
    [434, 496, 570].forEach((x) => nokta(c, sayilar, x, 176));
    await belir(c, sayilar, 350);
    await c.say('Enerji seviyelerindeki elektron sayıları 2, 8, 18, 6 olur.',
      { speak: 'Enerji seviyelerindeki elektron sayıları iki, sekiz, on sekiz, altı olur.' });

    uclar.remove();
    await c.choice({ tag: 'Uygula', q: 'Selenyumun tablodaki yeri neresidir?',
      options: ['3. periyot, 6A', '4. periyot, 4A', '4. periyot, 6A'], answer: 2,
      hints: ['Dizilimde dörtle başlayan orbitaller var; en yüksek enerji seviyesi üç değil.', 'Yalnızca 4p⁴ sayılmış; 4s² de dördüncü enerji seviyesindedir.', ''],
      right: 'Dördüncü enerji seviyesinde 2 + 4 = 6 elektron: 4. periyot, 6A.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        T.sutun(16);
        T.satir(4);
        T.baslik(16, '6A');
        T.yak(4, 16, 'Se');
      } });
    alt.cerceve(0, 0);
    alt.cerceve(2, 2);
    const dis = yazi(c, kart, 720, 136, '2 + 4 = 6', { size: 28, renk: GRUP });
    await c.say('En yüksek enerji seviyesi dört; 4s² ve 4p⁴ toplam altı elektron.',
      { speak: 'En yüksek enerji seviyesi dört; dört se iki ve dört pe dört toplam altı elektron.' });
    alt.soluk(1, 0.4);
    await c.say('3d¹⁰ elektronları üçüncü enerji seviyesindedir; bu sayıma girmez.',
      { speak: 'Üç de on elektronları üçüncü enerji seviyesindedir; bu sayıma girmez.' });
    dis.remove();
    alt.soluk(1, 1);
    const yol = c.S('g', {}, kart);
    yazi(c, yol, 376, 186, 'dört seviye:', { size: 26, hiza: 'end' });
    yazi(c, yol, 632, 186, 'sonuncuda altı', { size: 26, hiza: 'start' });
    c.S('circle', { cx: 599, cy: 176, r: 20, fill: 'none', stroke: GRUP, 'stroke-width': 3 }, yol);
    await belir(c, yol, 350);
    await c.say('Ortaokuldaki katman yolu da aynı yeri gösterir: dört seviye, sonuncuda altı elektron.');
    yol.remove();
    const sira = yazi(c, kart, 500, 226, 'dolma sırası: 4s → 3d → 4p', { size: 26, renk: RENK.soluk });
    await belir(c, sira, 350);
    await c.say('Ama bu sayıları yazmak için orbitallerin dolma sırasını bilmek gerekti.');
  }

  /* ---- Sahne 7 · Kuralın dışında kalan: helyum ---- */
  async function helyum(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 126, h: 50 });
    const ust = yazi(c, svg, 500, 62, 'Kuralın dışında kalan element', { size: 30, renk: RENK.soluk });
    const alt = yazi(c, svg, 500, 524, '', { size: 28 });
    T.yak(1, 18, 'He');
    await belir(c, svg);
    await c.say('Bir element A grubu kuralının dışında kalır: helyum.');

    const he = c.S('g', {}, svg);
    yazi(c, he, 434, 172, 'Helyum', { size: 28, renk: RENK.soluk });
    const D = dizilim(c, he, 434, 230, '1s2', { size: 44 });
    D.enYuksegiBoya();
    T.satirNo(1, PER);
    await belir(c, he, 350);
    await c.say('Helyumun dizilimi 1s²; en yüksek enerji seviyesi birdir.',
      { speak: 'Helyumun dizilimi bir se iki; en yüksek enerji seviyesi birdir.' });
    D.orb[0].us.style.fill = GRUP;
    const hayalet = c.S('g', {}, svg);
    c.S('rect', { x: T.x0 + T.w, y: T.y0, width: T.w - 3, height: T.h - 3, rx: 4, fill: 'none', stroke: GRUP, 'stroke-width': 2.5, 'stroke-dasharray': '6 5' }, hayalet);
    yazi(c, hayalet, T.cx(2), T.cy(1) + 9, '?', { size: 26, renk: GRUP });
    yazi(c, hayalet, T.cx(2), T.y0 - 10, '2A', { size: 24, renk: GRUP });
    T.sutun(2, GRUP, 0.25);
    alt.textContent = '2 elektron → 2A?';
    alt.style.fill = GRUP;
    await belir(c, hayalet, 350);
    await c.say('Sayma kuralı iki elektron için 2A derdi.', { speak: 'Sayma kuralı iki elektron için iki A derdi.' });
    alt.textContent = 'helyum: soy gaz';
    alt.style.fill = 'var(--text)';
    await c.say('Oysa helyum bir soy gazdır.', { speak: '[thoughtful] Oysa helyum bir soy gazdır.' });

    hayalet.style.opacity = 0.35;
    T.sutun(2, null);
    T.sutun(18);
    T.yak(1, 18, null);
    T.baslik(18, '8A');
    alt.textContent = '8A: soy gazlar';
    await c.say('Soy gazlar tablonun en sağındaki 8A grubunda yer alır.',
      { speak: 'Soy gazlar tablonun en sağındaki sekiz A grubunda yer alır.' });
    hayalet.remove();
    T.boya(1, 1, PER);
    alt.textContent = 'Helyum: 1. periyot, 8A';
    await c.say('Helyumun yeri birinci periyot, 8A grubudur.', { speak: 'Helyumun yeri birinci periyot, sekiz A grubudur.' });

    he.remove();
    ust.textContent = '';
    alt.textContent = '';
    T.boya(1, 1, null);
    T.bekleyen(2, 18);
    const ne = c.S('g', {}, svg);
    yazi(c, ne, 434, 160, 'Neon', { size: 28, renk: RENK.soluk });
    const N = dizilim(c, ne, 434, 210, '1s2 2s2 2p6', { size: 38 });
    N.enYuksegiBoya();
    disCerceve(N);
    await belir(c, ne, 350);
    await c.choice({ tag: 'Uygula', q: 'Neon da 8A grubundadır; dizilimi 1s² 2s² 2p⁶. Sayma kuralı neonda doğru sonucu verir mi?',
      options: ['Vermez: 6 elektron sayılır, 6A çıkar.', 'Verir: 2 + 6 = 8, yani 8A.', 'Vermez: 2 elektron sayılır, 2A çıkar.'], answer: 1,
      hints: ['Yalnızca 2p⁶ sayılmış; 2s² de ikinci enerji seviyesindedir.', '', 'Yalnızca 2s² sayılmış; 2p⁶ da ikinci enerji seviyesindedir.'],
      right: 'En yüksek enerji seviyesi iki; orada 2 + 6 = 8 elektron var.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        T.yak(2, 18, 'Ne');
        T.satirNo(2, PER);
      } });
    yazi(c, ne, N.orta(1, 2), 258, '2 + 6 = 8', { size: 28, renk: GRUP });
    alt.textContent = 'Neon: 8 elektron → 8A';
    alt.style.fill = GRUP;
    await c.say('Neonun en yüksek enerji seviyesinde sekiz elektron var; kural tutuyor.');
    alt.textContent = 'Helyum: 2 elektron, yine 8A';
    alt.style.fill = YER;
    await c.say('Helyum ise iki elektronuyla 8A’dadır; onu ayrıca aklında tut.',
      { speak: 'Helyum ise iki elektronuyla sekiz A grubundadır; onu ayrıca aklında tut.' });
  }

  /* ---- Sahne 8 · Yeni adres ---- */
  const ELEMENTLER = [
    { simge: 'Li', ad: 'Lityum', z: 3, diz: '1s2 2s1', per: 2, grup: 1, a: '1A', dis: 1 },
    { simge: 'C', ad: 'Karbon', z: 6, diz: '1s2 2s2 2p2', per: 2, grup: 14, a: '4A', dis: 4 },
    { simge: 'Na', ad: 'Sodyum', z: 11, diz: '1s2 2s2 2p6 3s1', per: 3, grup: 1, a: '1A', dis: 1 },
    { simge: 'S', ad: 'Kükürt', z: 16, diz: '1s2 2s2 2p6 3s2 3p4', per: 3, grup: 16, a: '6A', dis: 6 },
    { simge: 'Cl', ad: 'Klor', z: 17, diz: '1s2 2s2 2p6 3s2 3p5', per: 3, grup: 17, a: '7A', dis: 7 },
    { simge: 'Ca', ad: 'Kalsiyum', z: 20, diz: '1s2 2s2 2p6 3s2 3p6 4s2', per: 4, grup: 2, a: '2A', dis: 2 },
    { simge: 'Se', ad: 'Selenyum', z: 34, diz: '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p4', per: 4, grup: 16, a: '6A', dis: 6 },
  ];
  async function yeniAdres(c) {
    const svg = c.svg();
    const T = tablo(c, svg, { y: 244, h: 38 });
    const kart = c.S('g', {}, svg);
    /* Kartı baştan çizer. asama: 1 ad · 2 dizilim · 3 iki soru · 4 cevaplar ve tablodaki kutu. */
    const goster = (el, asama) => {
      kart.replaceChildren();
      T.temizle();
      yazi(c, kart, 500, 44, el.ad + ': ' + el.z + ' elektron', { size: 28, renk: RENK.soluk });
      if (asama < 2) return;
      const D = dizilim(c, kart, 500, 104, el.diz, { size: 34 });
      if (asama < 3) return;
      D.enYuksegiBoya();
      disCerceve(D);
      const acik = asama >= 4;
      yazi(c, kart, 300, 172, 'en yüksek enerji seviyesi: ' + (acik ? el.per : '?'), { size: 26, renk: PER });
      yazi(c, kart, 720, 172, 'oradaki elektron: ' + (acik ? el.dis : '?'), { size: 26, renk: GRUP });
      if (!acik) return;
      T.satir(el.per, PER, 0.25);
      T.sutun(el.grup, GRUP, 0.25);
      T.satirNo(el.per, PER);
      T.baslik(el.grup, el.a);
      T.yak(el.per, el.grup, el.simge);
    };
    const ca = ELEMENTLER[5];
    await belir(c, svg);
    await c.say('Şimdi iki kuralı yeni bir elemente birlikte uygulayalım.');
    goster(ca, 1);
    await c.say('Kalsiyumun yirmi elektronu vardır.');
    goster(ca, 2);
    await c.say('Dizilimi 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² olur.',
      { speak: 'Dizilimi bir se iki, iki se iki, iki pe altı, üç se iki, üç pe altı, dört se iki olur.' });
    goster(ca, 3);
    await c.say('Önce en yüksek enerji seviyesini, sonra oradaki elektronları bul.');
    await c.choice({ tag: 'Uygula', q: 'Kalsiyumun yeri neresidir?',
      options: ['3. periyot, 2A', '4. periyot, 8A', '4. periyot, 2A'], answer: 2,
      hints: ['Dizilim 4s² ile bitiyor; en yüksek enerji seviyesi üç değil.', 'Sekiz, üçüncü enerji seviyesindeki elektron sayısıdır; en yüksek seviye dört.', ''],
      right: 'Dördüncü enerji seviyesinde yalnızca 4s² var: 4. periyot, 2A.',
      onPick: (i, dogru) => { if (dogru) goster(ca, 4); } });
    await c.say('En yüksek enerji seviyesi dört, orada iki elektron: dördüncü periyot, 2A.',
      { speak: 'En yüksek enerji seviyesi dört, orada iki elektron: dördüncü periyot, iki A.' });

    const secici = c.slider({ label: 'Element', min: 0, max: 6, value: 5, fmt: (i) => ELEMENTLER[i].simge, onInput: (i) => goster(ELEMENTLER[i], 4) });
    await c.say('Elementi değiştir; dizilimin sonunu tablodaki kutusuyla karşılaştır.', { noWait: true });
    await c.cont();
    secici.remove();
    await c.say('Dizilimin sonu, elementin tablodaki adresidir.',
      { speak: 'Dizilimin sonu, [short pause] elementin tablodaki adresidir.' });
  }

  Ders.start({
    id: 'etkilesim-f1', kicker: 'Konu F · Periyodik tabloda yer bulma', title: 'Dizilim adres verir', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'Dizilim adres verir', hook: 'Yalnızca elektron dizilimine bakarak bir elementin tablodaki yerini bulabilir misin?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Periyot ve grup', goal: 'Tabloda satırı ve sütunu oku.', run: yer },
      { title: 'Grubun iki adı', goal: 'Harfli adı numarayla eşleştir.', run: ikiAd },
      { title: 'Katman dağılımından dizilime', goal: 'Dizilimde enerji seviyelerini say.', run: katman },
      { title: 'Periyodu dizilim söyler', goal: 'Dizilimden periyodu bul.', run: periyot },
      { title: 'A grubunu dizilim söyler', goal: 'Dizilimden A grubunu bul.', run: aGrubu },
      { title: 'Dördüncü periyot: selenyum', goal: '3d elektronlarının yerini ayır.', run: selenyum },
      { title: 'Kuralın dışında kalan: helyum', goal: 'Helyumun yerini kuralla karşılaştır.', run: helyum },
      { title: 'Yeni adres', goal: 'İki kuralı yeni elemente uygula.', run: yeniAdres },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Fosforun dizilimi 1s² 2s² 2p⁶ 3s² 3p³. Fosforun yeri neresidir?',
        options: ['3. periyot, 3A', '2. periyot, 5A', '3. periyot, 5A'], answer: 2,
        why: ['Yalnızca p elektronları sayılmış; 3s² de aynı enerji seviyesindedir.', 'Dizilimde üçle başlayan orbitaller var; en yüksek enerji seviyesi üçtür.', 'En yüksek enerji seviyesi üç; orada 2 + 3 = 5 elektron var.'], scene: 4 },
      { q: 'Oksijen 6A grubundadır. Bu grubun numarayla adı hangisidir?',
        options: ['6. grup', '16. grup', '8. grup'], answer: 1,
        why: ['Altıncı grup ortadaki B sütunlarından biridir.', '8A on sekizinci grup olduğuna göre 6A on altıncı gruptur.', 'Sekizinci grup ortadaki B sütunlarından biridir.'], scene: 1 },
      { q: 'Kriptonun 36 elektronu vardır ve dizilimi 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ olur. Kripton tabloda nerede yer alır?',
        options: ['4. periyot, 8A', '4. periyot, 6A', '3. periyot, 8A'], answer: 0,
        why: ['En yüksek enerji seviyesi dört; orada 4s² ve 4p⁶ ile 2 + 6 = 8 elektron var.', 'Yalnızca 4p⁶ sayılmış; 4s² de dördüncü enerji seviyesindedir.', 'Dizilimde dörtle başlayan orbitaller var; 3d¹⁰ en yüksek enerji seviyesini göstermez.'], scene: 5 },
      { q: 'Ayşe: “Azotun dizilimi 1s² 2s² 2p³ ile biter. En sondaki sayı 3 olduğundan azot üçüncü periyottadır.” Ayşe’ye hangi karşılık verilmelidir?',
        options: ['Haklı; periyodu dizilimin en sonundaki üst sayı gösterir.', 'Haksız; periyodu atomdaki toplam elektron sayısı gösterir.', 'Haksız; periyodu en yüksek enerji seviyesi gösterir, azot ikincidir.'], answer: 2,
        why: ['Üstteki küçük sayılar elektron sayısıdır; periyodu göstermez.', 'Toplam elektron sayısı atomun kaç elektronu olduğunu söyler; periyodu en yüksek enerji seviyesi verir.', 'Azotun en yüksek enerji seviyesi iki (2s² 2p³); azot ikinci periyottadır.'], scene: 3 },
    ], summary: ['<b>Dizilimin sonu, elementin tablodaki adresidir.</b>', 'Periyot en yüksek enerji seviyesidir; A grubu oradaki s ve p elektronlarının toplamıdır.'],
    nextLesson: { href: 'f2-b-gruplari.html', label: 'Sonraki: Yeni örnek kuralı sınar ›' },
  });
})();
