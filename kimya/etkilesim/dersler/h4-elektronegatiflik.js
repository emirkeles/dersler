/* H4 · KİM.9.1.8 · Senaryo: plan/kimya/etkilesim/senaryolar/H-periyodik-ozellikler.md, "## H4" (PLAN.md bölüm 12).
   Yazar notu: içerik MEB Kimya 9 s. 84 (tanım, halat çekme benzetmesi, Pauling ölçeği, ilk 20 elementin değerleri),
   s. 85 (eğilimler; soy gaz atomları bağ yapmadığı için değerleri yoktur) ve s. 86'dan (H–Cl, F–Cl). Yarıçaplar H1 ile
   aynıdır (s. 78). Pauling değerleri birimsizdir. "Küçük atom daha çok çeker" genellemesi bilerek kurulmaz; ilk 20
   element seçicisinde yarıçap gösterilmez. Öğrenciye kitap, sayfa ya da "hazır veri" anılmaz.
   Renkler: sarı = elektronegatiflik, mavi = yarıçap, turkuaz = bağ elektronları, mor = çekirdek. */
(() => {
  'use strict';
  const { RENK, yazi, belir } = KIT;
  const EN = RENK.vurgu, YARICAP = 'var(--c1)', BAG = 'var(--c6)', CEKIRDEK = 'var(--c4)', KOYU = '#162038';
  const pauling = (v) => v.toFixed(2).replace('.', ',');
  /* İlk 20 element: simge, ad, periyot, A grubu numarası, Pauling değeri (soy gazlarda değer yok). */
  const ELEMENT = [
    ['H', 'Hidrojen', 1, 1, 2.20], ['He', 'Helyum', 1, 8, null],
    ['Li', 'Lityum', 2, 1, 0.98], ['Be', 'Berilyum', 2, 2, 1.57], ['B', 'Bor', 2, 3, 2.04], ['C', 'Karbon', 2, 4, 2.55],
    ['N', 'Azot', 2, 5, 3.04], ['O', 'Oksijen', 2, 6, 3.44], ['F', 'Flor', 2, 7, 4.00], ['Ne', 'Neon', 2, 8, null],
    ['Na', 'Sodyum', 3, 1, 0.93], ['Mg', 'Magnezyum', 3, 2, 1.31], ['Al', 'Alüminyum', 3, 3, 1.61], ['Si', 'Silisyum', 3, 4, 1.90],
    ['P', 'Fosfor', 3, 5, 2.19], ['S', 'Kükürt', 3, 6, 2.58], ['Cl', 'Klor', 3, 7, 3.16], ['Ar', 'Argon', 3, 8, null],
    ['K', 'Potasyum', 4, 1, 0.82], ['Ca', 'Kalsiyum', 4, 2, 1.00],
  ].map(([simge, ad, periyot, grup, en], i) => ({ no: i + 1, simge, ad, periyot, grup, en }));
  const E = Object.fromEntries(ELEMENT.map((el) => [el.simge, el]));
  const PM = { Li: 152, Na: 186, K: 227, Mg: 160, Al: 143, Si: 118, P: 110, S: 103, Cl: 99 };
  const UCUNCU = ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl'];

  const kutu = (c, p, x, y, w, h, o = {}) => c.S('rect', { x, y, width: w, height: h, rx: 12,
    fill: KOYU, stroke: o.renk || RENK.cizgi, 'stroke-width': 3 }, p);
  const sil = async (c, el, ms = 300) => { await c.tween(ms, (e) => { el.style.opacity = 1 - e; }); el.remove(); };
  const gizle = (el) => { el.style.opacity = 0; return el; };
  /* (x1, y1) noktasından (x2, y2) noktasına ok. */
  const ok = (c, p, x1, y1, x2, y2, o = {}) => {
    const a = Math.atan2(y2 - y1, x2 - x1), u = o.uc || 13;
    const uc = (d) => `${x2 - u * Math.cos(a + d)} ${y2 - u * Math.sin(a + d)}`;
    return c.S('path', { d: `M ${x1} ${y1} L ${x2} ${y2} M ${uc(-0.55)} L ${x2} ${y2} L ${uc(0.55)}`, fill: 'none',
      stroke: o.renk || RENK.cizgi, 'stroke-width': o.kalin || 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
  };

  /* Çekim şeması: iki atom, aralarındaki bağ ve bağ elektron çifti. kay(dx) çifti atomlardan birine doğru kaydırır. */
  function cekim(c, p, o) {
    const g = c.S('g', {}, p), r = o.r || 58, x1 = o.x1 || 330, x2 = o.x2 || 670, xm = (x1 + x2) / 2;
    c.S('line', { x1: x1 + r, y1: o.y, x2: x2 - r, y2: o.y, stroke: RENK.cizgi, 'stroke-width': 4 }, g);
    const atomlar = [[x1, o.sol], [x2, o.sag]].map(([x, ad]) => ({
      x, daire: c.S('circle', { cx: x, cy: o.y, r, fill: KOYU, stroke: RENK.cizgi, 'stroke-width': 3 }, g),
      ad: yazi(c, g, x, o.y + r * 0.26, ad || '', { size: Math.max(34, Math.round(r * 0.7)) }),
    }));
    const cift = c.S('g', {}, g);
    [-13, 13].forEach((dx) => c.S('circle', { cx: xm + dx, cy: o.y, r: 10, fill: BAG }, cift));
    return { g, atomlar, cift, r, xm, kay: (dx) => cift.setAttribute('transform', `translate(${dx} 0)`) };
  }

  /* Halat çekme: iki takım aynı halata asılır. Halat ve takımlar birlikte kayar; yerdeki orta çizgi sabit kalır. */
  function halat(c, p, y) {
    const g = c.S('g', {}, p), kayan = c.S('g', {}, g), cizgi = { fill: 'none', stroke: 'var(--text)', 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    c.S('line', { x1: 200, y1: y + 48, x2: 800, y2: y + 48, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    c.S('line', { x1: 500, y1: y + 48, x2: 500, y2: y + 66, stroke: RENK.cizgi, 'stroke-width': 4 }, g);
    c.S('line', { x1: 250, y1: y, x2: 750, y2: y, stroke: '#c9d1e6', 'stroke-width': 4 }, kayan);
    c.S('rect', { x: 494, y: y - 18, width: 12, height: 36, rx: 3, fill: EN }, kayan);
    /* Elleri (x, y) noktasında halatı tutan, geriye yaslanmış kişi. yon: -1 sol takım, +1 sağ takım. */
    const kisi = (x, yon, hedef) => {
      const k = c.S('g', {}, hedef), omuz = [x + yon * 16, y - 14], kalca = [x + yon * 30, y + 16];
      c.S('circle', { cx: x + yon * 21, cy: y - 30, r: 9, fill: 'var(--text)' }, k);
      c.S('path', { ...cizgi, d: `M ${x} ${y} L ${omuz} L ${kalca} L ${x + yon * 12} ${y + 46} M ${kalca} L ${x + yon * 38} ${y + 46}` }, k);
      return k;
    };
    [420, 370, 320].forEach((x) => kisi(x, -1, kayan));
    [580, 630, 680].forEach((x) => kisi(x, 1, kayan));
    const yeni = gizle(kisi(730, 1, kayan));
    return { g, yeni, kay: (dx) => kayan.setAttribute('transform', `translate(${dx} 0)`) };
  }

  /* Periyodik tablonun ilk 20 elementlik kesiti. Her kutuda simge, Pauling değeriyle orantılı dolgu ve (gizli) değer
     yazısı vardır. Soy gaz kutularında değer yerine çizgi çizilir. o.sec: gösterilecek elementler; o.no: simgenin
     üstünde (gizli) atom numarası; o.h: kutu yüksekliği. */
  function tablo(c, p, o = {}) {
    const g = c.S('g', {}, p), w = 100, h = o.h || 92, x0 = o.x0 || 72, y0 = o.y0 || 40, ilk = o.ilkPeriyot || 1, kutular = {};
    ELEMENT.filter((el) => !o.sec || o.sec(el)).forEach((el) => {
      const x = x0 + (el.grup - 1) * (w + 8), y = y0 + (el.periyot - ilk) * (h + 8), k = c.S('g', {}, g);
      const cerceve = c.S('rect', { x, y, width: w, height: h, rx: 8, fill: KOYU, stroke: RENK.cizgi, 'stroke-width': 2 }, k);
      let dolgu = null, deger = null;
      if (el.en == null) {
        c.S('line', { x1: x + 36, y1: y + h - 24, x2: x + 64, y2: y + h - 24, stroke: RENK.soluk, 'stroke-width': 4, 'stroke-linecap': 'round' }, k);
      } else {
        const dh = el.en / 4 * (h - 4);
        dolgu = c.S('rect', { x: x + 2, y: y + h - 2 - dh, width: w - 4, height: dh, rx: 6, fill: EN, opacity: 0.2 }, k);
        deger = gizle(yazi(c, k, x + w / 2, y + h - 14, pauling(el.en), { size: 26, renk: EN }));
      }
      yazi(c, k, x + w / 2, y + (o.no ? 70 : 42), el.simge, { size: 30 });
      const no = o.no ? gizle(yazi(c, k, x + w / 2, y + 32, String(el.no), { size: 24, renk: RENK.soluk })) : null;
      kutular[el.simge] = { el, g: k, cerceve, dolgu, deger, no };
    });
    return { g, kutular, x0, y0, w, h };
  }
  const vurgula = (k, renk) => { k.cerceve.setAttribute('stroke', renk || RENK.cizgi); k.cerceve.setAttribute('stroke-width', renk ? 4 : 2); };
  /* Kutulardaki değer yazılarını açar (hedef 1) ya da kapatır (hedef 0). */
  const degerYaz = (c, liste, hedef, ms = 300) => c.tween(ms, (e) => {
    liste.forEach((k) => { if (k.deger) k.deger.style.opacity = hedef ? e : 1 - e; });
  });

  /* Üçüncü periyot, Na–Cl: üstte ölçekli atomlar (yarıçap), altta elektronegatiflik çubukları.
     Parçalar gizli çizilir; sahne sırayla açar. */
  function ucuncuPeriyot(c, svg) {
    svg.replaceChildren();
    const x = (i) => 150 + i * 120, cy = 200, taban = 500, yari = (s) => PM[s] / 186 * 46;
    const simgeler = c.S('g', {}, svg);
    UCUNCU.forEach((s, i) => yazi(c, simgeler, x(i), 56, s, { size: 32 }));
    const proton = gizle(c.S('g', {}, svg));
    yazi(c, proton, x(0), 100, '11 proton', { size: 24, renk: CEKIRDEK });
    yazi(c, proton, x(6), 100, '17 proton', { size: 24, renk: CEKIRDEK });
    yazi(c, proton, 510, 90, 'çekirdeğin çekimi güçlenir', { size: 24, renk: CEKIRDEK });
    ok(c, proton, 250, 106, 770, 106, { renk: CEKIRDEK, kalin: 3 });
    const daireler = gizle(c.S('g', {}, svg));
    UCUNCU.forEach((s, i) => c.S('circle', { cx: x(i), cy, r: yari(s), fill: YARICAP, 'fill-opacity': 0.16, stroke: YARICAP, 'stroke-width': 3 }, daireler));
    yazi(c, daireler, x(0), 284, '186 pm', { size: 26, renk: YARICAP });
    yazi(c, daireler, x(6), 284, '99 pm', { size: 26, renk: YARICAP });
    /* İlk ve son atomda çekirdek, kenardaki bağ elektron çifti ve aradaki uzaklık. */
    const mesafe = gizle(c.S('g', {}, svg));
    [0, 6].forEach((i) => {
      const r = yari(UCUNCU[i]);
      c.S('line', { x1: x(i), y1: cy, x2: x(i) + r, y2: cy, stroke: BAG, 'stroke-width': 3, 'stroke-dasharray': '5 5' }, mesafe);
      c.S('circle', { cx: x(i), cy, r: 7, fill: CEKIRDEK }, mesafe);
      [-7, 7].forEach((dy) => c.S('circle', { cx: x(i) + r, cy: cy + dy, r: 6, fill: BAG }, mesafe));
    });
    const neden = gizle(c.S('g', {}, svg));
    yazi(c, neden, x(0), 326, 'daha zayıf çekim', { size: 26, renk: RENK.soluk });
    yazi(c, neden, x(6), 326, 'daha güçlü çekim', { size: 26, renk: CEKIRDEK });
    const taban_ = gizle(c.S('line', { x1: 90, y1: taban, x2: 930, y2: taban, stroke: RENK.cizgi, 'stroke-width': 3 }, svg));
    const cubuklar = UCUNCU.map((s, i) => {
      const bh = E[s].en / 4 * 140;
      return { bh, rect: c.S('rect', { x: x(i) - 30, y: taban, width: 60, height: 0, rx: 3, fill: EN }, svg),
        etiket: gizle(yazi(c, svg, x(i), taban - bh - 12, pauling(E[s].en), { size: 26 })) };
    });
    const cubukAdi = gizle(yazi(c, svg, 510, 544, 'elektronegatiflik (Pauling değeri)', { size: 26, renk: RENK.soluk }));
    const yonler = gizle(c.S('g', {}, svg));
    yazi(c, yonler, 510, 300, 'yarıçap küçülür', { size: 26, renk: YARICAP });
    ok(c, yonler, 330, 312, 690, 312, { renk: YARICAP, kalin: 3 });
    yazi(c, yonler, 420, 544, 'elektronegatiflik artar', { size: 26, renk: EN });
    ok(c, yonler, 590, 535, 790, 535, { renk: EN, kalin: 3 });
    /* Çubukları (ilk … son) tabandan yukarı doldurur. e = 1 ise değerleri de yazar. */
    const doldur = (ilk, son, e) => cubuklar.slice(ilk, son + 1).forEach((b) => {
      b.rect.setAttribute('y', taban - b.bh * e);
      b.rect.setAttribute('height', b.bh * e);
      b.etiket.style.opacity = e > 0.98 ? 1 : 0;
    });
    return { proton, daireler, mesafe, neden, taban: taban_, cubukAdi, yonler, doldur };
  }
  /* Seçici için tek özellikli grafik; ölçek her özellikte sabittir. hangi: 0 yarıçap, 1 elektronegatiflik. */
  function ozellikGrafik(c, svg, hangi) {
    svg.replaceChildren();
    const g = c.S('g', {}, svg), taban = 430, h = 270, yaricap = hangi === 0, renk = yaricap ? YARICAP : EN;
    yazi(c, g, 500, 56, yaricap ? 'Atom yarıçapı (pm)' : 'Elektronegatiflik', { size: 32, renk });
    c.S('line', { x1: 90, y1: taban, x2: 930, y2: taban, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    UCUNCU.forEach((s, i) => {
      const x = 150 + i * 120, v = yaricap ? PM[s] : E[s].en, bh = v / (yaricap ? 200 : 4) * h;
      c.S('rect', { x: x - 34, y: taban - bh, width: 68, height: bh, rx: 3, fill: renk }, g);
      yazi(c, g, x, taban - bh - 12, yaricap ? String(v) : pauling(v), { size: 26 });
      yazi(c, g, x, taban + 42, s, { size: 30 });
    });
    yazi(c, g, 500, 530, yaricap ? 'sağa gidildikçe küçülür' : 'sağa gidildikçe artar', { size: 28, renk });
    return g;
  }

  /* ---- Sahne 1 · Bağ elektronları kime yakın? ---- */
  async function kimeYakin(c) {
    const svg = c.svg();
    const ust = c.S('g', {}, svg), Y = 210;
    const B = cekim(c, ust, { y: Y });
    gizle(B.cift);
    const etiket = yazi(c, ust, 500, Y + 104, 'kimyasal bağ', { size: 28, renk: RENK.soluk });
    await belir(c, ust);
    await c.say('Atomlar birbirine kimyasal bağlarla bağlanır.');
    etiket.textContent = 'bağ elektronları';
    etiket.style.fill = BAG;
    await belir(c, B.cift, 350);
    await c.say('Bağı, iki atomun valans elektronları oluşturur.');
    const cek = c.S('g', {}, ust);
    B.atomlar.forEach((a) => c.S('circle', { cx: a.x, cy: Y, r: 11, fill: CEKIRDEK }, cek));
    ok(c, cek, B.xm - 38, Y - 28, B.atomlar[0].x + B.r + 12, Y - 28, { renk: CEKIRDEK });
    ok(c, cek, B.xm + 38, Y - 28, B.atomlar[1].x - B.r - 12, Y - 28, { renk: CEKIRDEK });
    await belir(c, cek, 350);
    await c.say('Bu bağ elektronlarını iki atomun çekirdeği de kendine çeker.');
    const H = halat(c, svg, 440);
    await belir(c, H.g);
    await c.say('Durum, iki takımın aynı halata asıldığı halat çekme yarışına benzer.');
    await c.wait(400);
    await belir(c, H.yeni, 350);
    await c.tween(800, (e) => H.kay(44 * e));
    await c.say('Takımlar eşit güçteyse halat ortada kalır; biri güçlüyse halat ona kayar.');
    const tanim = c.S('g', {}, ust);
    yazi(c, tanim, 500, 56, 'Elektronegatiflik', { size: 36, renk: EN });
    yazi(c, tanim, 500, 98, 'bağ elektronlarını çekme gücü', { size: 26, renk: RENK.soluk });
    await belir(c, tanim);
    await c.say('Bir atomun bağ elektronlarını kendine çekme gücüne elektronegatiflik denir.');
    cek.remove();
    B.atomlar[0].ad.textContent = 'H';
    B.atomlar[1].ad.textContent = 'Cl';
    await c.tween(800, (e) => B.kay(62 * e));
    await c.say('Hidrojen ile klor bağ yaptığında bağ elektronlarını klor daha çok çeker.');
    B.atomlar[1].daire.setAttribute('stroke', EN);
    etiket.textContent = 'elektronegatiflik: Cl > H';
    etiket.style.fill = EN;
    await belir(c, etiket, 350);
    await c.say('Demek ki klorun elektronegatifliği hidrojeninkinden büyüktür.');

    await Promise.all([sil(c, H.g), sil(c, B.g), sil(c, etiket)]);
    const F = cekim(c, ust, { y: Y, sol: 'F', sag: 'Cl' });
    F.kay(-62);
    const etiket2 = yazi(c, ust, 500, Y + 104, 'bağ elektronları flora daha yakın', { size: 28, renk: BAG });
    await Promise.all([belir(c, F.g, 350), belir(c, etiket2, 350)]);
    await c.choice({ tag: 'Uygula', q: 'Flor ile klor bağ yaptığında bağ elektronlarını flor daha çok çeker. Hangisinin elektronegatifliği daha büyüktür?',
      options: ['Flor', 'Klor', 'İkisi eşit'], answer: 0,
      hints: ['', 'Bağ elektronlarını daha çok çeken atom klor değil, flor.', 'Eşit olsaydı bağ elektronları tam ortada kalırdı.'],
      right: 'Flor. Bağ elektronlarını daha çok çeken atomun elektronegatifliği büyüktür.',
      onPick: (i, dogru) => {
        if (!dogru) return;
        F.atomlar[0].daire.setAttribute('stroke', EN);
        etiket2.textContent = 'elektronegatiflik: F > Cl';
        etiket2.style.fill = EN;
      } });
    await c.say('Bağ elektronlarını daha çok çeken atom daha elektronegatiftir: flor.',
      { speak: 'Bağ elektronlarını daha çok çeken atom daha elektronegatiftir: [short pause] flor.' });
    await sil(c, ust, 350);
    const fark = c.S('g', {}, svg);
    const kart = (x, baslik, satirlar, renk) => {
      kutu(c, fark, x, 150, 410, 240, { renk });
      yazi(c, fark, x + 205, 215, baslik, { size: 34, renk });
      satirlar.forEach((s, i) => yazi(c, fark, x + 205, 285 + i * 46, s, { size: 30 }));
    };
    kart(70, 'İyonlaşma enerjisi', ['atomdan elektron', 'koparma'], 'var(--c2)');
    kart(520, 'Elektronegatiflik', ['bağdaki elektronu', 'çekme'], EN);
    await belir(c, fark);
    await c.say('İyonlaşma enerjisi elektron koparmayla, elektronegatiflik bağdaki elektronu çekmeyle ilgilidir.',
      { speak: '[thoughtful] İyonlaşma enerjisi elektron koparmayla, elektronegatiflik bağdaki elektronu çekmeyle ilgilidir.' });
    c.note('<b>Elektronegatiflik: atomun bağ elektronlarını kendine çekme gücü.</b><br>H–Cl bağında Cl daha çok çeker.', 'Elektronegatiflik');
  }

  /* ---- Sahne 2 · Göreceli bir ölçü: Pauling ölçeği ---- */
  async function olcek(c) {
    const svg = c.svg();
    const giris = c.S('g', {}, svg);
    yazi(c, giris, 500, 210, 'H < Cl < F', { size: 60 });
    yazi(c, giris, 500, 270, 'bağ elektronlarını çekme gücü', { size: 28, renk: RENK.soluk });
    await belir(c, giris);
    await c.say('Bir atomun elektronegatifliği, başka atomlarınkiyle karşılaştırılarak bulunur.');
    await belir(c, yazi(c, giris, 500, 360, 'göreceli: atomlar birbiriyle karşılaştırılır', { size: 30, renk: EN }), 350);
    await c.say('Bu yüzden elektronegatiflik göreceli bir kavramdır.');

    await sil(c, giris, 350);
    const D = c.S('g', {}, svg), Y = 300, px = (v) => 140 + 180 * v;
    c.S('line', { x1: px(0), y1: Y, x2: px(4), y2: Y, stroke: 'var(--text)', 'stroke-width': 4, 'stroke-linecap': 'round' }, D);
    const baslik = yazi(c, D, 500, 84, 'Linus Pauling', { size: 34, renk: RENK.soluk });
    /* Sayı doğrusunda bir element: nokta, üstünde simge ve değer. */
    const isaret = (simge, v, metin) => {
      const g = c.S('g', {}, D);
      c.S('circle', { cx: px(v), cy: Y, r: 10, fill: EN }, g);
      yazi(c, g, px(v), Y - 62, simge, { size: 32 });
      yazi(c, g, px(v), Y - 26, metin || pauling(v), { size: 26, renk: EN });
      return g;
    };
    await belir(c, D);
    await c.say('Karşılaştırma için bilim insanı Linus Pauling’in kurduğu ölçek kullanılır.',
      { speak: 'Karşılaştırma için bilim insanı Linus Poling’in kurduğu ölçek kullanılır.' });
    await belir(c, isaret('F', 4, '4,0'), 350);
    await c.say('Pauling, flor atomunun elektronegatifliğini 4,0 kabul etti.',
      { speak: 'Poling, flor atomunun elektronegatifliğini dört virgül sıfır kabul etti.' });
    const sayilar = c.S('g', {}, D);
    [0, 1, 2, 3, 4].forEach((v) => {
      c.S('line', { x1: px(v), y1: Y - 10, x2: px(v), y2: Y + 10, stroke: 'var(--text)', 'stroke-width': 3 }, sayilar);
      yazi(c, sayilar, px(v), Y + 48, String(v), { size: 28, renk: RENK.soluk });
    });
    await belir(c, sayilar, 350);
    await c.say('Öteki atomların değerlerini 0 ile 4 arasında hesapladı.',
      { speak: 'Öteki atomların değerlerini sıfır ile dört arasında hesapladı.' });
    baslik.textContent = 'Pauling ölçeği';
    baslik.style.fill = EN;
    await belir(c, baslik, 350);
    await c.say('Bu ölçeğe Pauling ölçeği denir.', { speak: 'Bu ölçeğe Poling ölçeği denir.' });
    const alt = yazi(c, D, 500, 130, 'birimsiz: yalnızca karşılaştırma', { size: 26, renk: RENK.soluk });
    await belir(c, alt, 350);
    await c.say('Pauling değerlerinin birimi yoktur; atomları karşılaştırmaya yarar.',
      { speak: 'Poling değerlerinin birimi yoktur; atomları karşılaştırmaya yarar.' });
    const hidrojen = isaret('H', 2.20), klor = isaret('Cl', 3.16);
    await Promise.all([belir(c, hidrojen, 350), belir(c, klor, 350)]);
    await c.say('Hidrojenin değeri 2,20, klorunki 3,16’dır.',
      { speak: 'Hidrojenin değeri iki virgül yirmi, klorunki üç virgül on altıdır.' });

    hidrojen.remove();
    klor.remove();
    const karbon = isaret('C', 2.55), oksijen = isaret('O', 3.44);
    await Promise.all([belir(c, karbon, 350), belir(c, oksijen, 350)]);
    await c.choice({ tag: 'Uygula', q: 'Karbonun değeri 2,55, oksijeninki 3,44’tür. Bağ yaptıklarında bağ elektronlarını hangisi daha çok çeker?',
      options: ['Karbon', 'Oksijen', 'İkisi eşit çeker'], answer: 1,
      hints: ['Karbonun değeri oksijeninkinden küçük: 2,55 < 3,44.', '', 'Değerler eşit değil: 2,55 ve 3,44.'],
      right: 'Oksijen. Değeri büyük olan atom bağ elektronlarını daha çok çeker.' });
    c.S('circle', { cx: px(3.44), cy: Y, r: 18, fill: 'none', stroke: EN, 'stroke-width': 3 }, oksijen);
    const bag = cekim(c, D, { y: 462, sol: 'C', sag: 'O', r: 40, x1: 400, x2: 600 });
    bag.atomlar[1].daire.setAttribute('stroke', EN);
    await belir(c, bag.g, 350);
    await c.tween(700, (e) => bag.kay(30 * e));
    await c.say('Değeri büyük olan oksijen, bağ elektronlarını daha çok çeker.');
    alt.textContent = 'sayı büyüdükçe çekme gücü artar';
    alt.style.fill = EN;
    await belir(c, ok(c, D, 320, 160, 680, 160, { renk: EN, kalin: 3 }), 350);
    await c.say('Sayı büyüdükçe atomun çekme gücü artar.');
    c.note('<b>Pauling ölçeği: göreceli, birimsiz, 0–4 arası.</b><br>F: 4,00', 'Pauling ölçeği');
  }

  /* ---- Sahne 3 · İlk yirmi elementin değerleri ---- */
  async function yirmiElement(c) {
    const svg = c.svg();
    const T = tablo(c, svg), K = T.kutular, hepsi = Object.values(K);
    const periyot = (n) => hepsi.filter((k) => k.el.periyot === n);
    hepsi.forEach((k) => gizle(k.g));
    const not_ = yazi(c, svg, 500, 500, '', { size: 30 });
    /* Kutular periyot periyot belirir; bir periyodun sayıları, sonraki gelmeden önce silinir (tahtada yalnızca dolgu kalır). */
    const kur = async () => {
      for (let n = 1; n <= 4; n++) {
        if (n > 1) await degerYaz(c, periyot(n - 1), 0, 250);
        const yeni = periyot(n);
        yeni.forEach((k) => { if (k.deger) k.deger.style.opacity = 1; });
        await c.tween(400, (e) => yeni.forEach((k) => { k.g.style.opacity = e; }));
        if (n < 4) await c.wait(700);
      }
    };
    await Promise.all([kur(), c.say('İlk yirmi elementin Pauling değerlerini periyodik tabloya yerleştirelim.',
      { speak: 'İlk yirmi elementin Poling değerlerini periyodik tabloya yerleştirelim.' })]);
    await degerYaz(c, periyot(4), 0, 250);
    vurgula(K.F, EN);
    await degerYaz(c, [K.F], 1);
    await c.say('En büyük değer florundur: 4,00.', { speak: 'En büyük değer florundur: dört virgül sıfır sıfır.' });
    vurgula(K.K, EN);
    await degerYaz(c, [K.K], 1);
    await c.say('En küçük değer potasyumundur: 0,82.', { speak: 'En küçük değer potasyumundur: sıfır virgül seksen iki.' });
    await degerYaz(c, [K.F, K.K], 0, 250);
    [K.F, K.K].forEach((k) => vurgula(k));
    const soyGaz = [K.He, K.Ne, K.Ar];
    soyGaz.forEach((k) => vurgula(k, 'var(--text)'));
    await c.say('Helyum, neon ve argonun kutularında sayı yerine çizgi var.');
    not_.textContent = 'He, Ne, Ar: soy gaz';
    await belir(c, not_, 350);
    await c.say('Bu üç element soy gazdır.');
    not_.textContent = 'soy gazlar bağ yapmaz';
    await belir(c, not_, 350);
    await c.say('Soy gaz atomları bağ yapmaz.');
    not_.textContent = 'bağ yok: değer yok';
    await belir(c, not_, 350);
    await c.say('Bağ yapmayan atomun bağ elektronu çekme gücünden söz edilemez.');

    not_.textContent = '';
    [K.He, K.Ne].forEach((k) => vurgula(k));
    vurgula(K.Na, EN);
    await degerYaz(c, [K.Na], 1);
    await c.choice({ tag: 'Uygula', q: 'Sodyumun değeri 0,93’tür; argonun kutusunda çizgi vardır. Hangi yorum doğrudur?',
      options: ['Argonun değeri sıfırdır; sodyumunkinden küçüktür.', 'Argon, sodyumdan daha elektronegatiftir.', 'Argonun elektronegatiflik değeri yoktur.'], answer: 2,
      hints: ['Kutuda sıfır yazmıyor; çizgi bir sayı değildir.', 'Argon bağ yapmaz; bağ elektronu çekme gücünden söz edilemez.', ''],
      right: 'Argon bağ yapmadığı için değeri yoktur; sodyumla karşılaştırılamaz.' });
    not_.textContent = 'çizgi ≠ sıfır';
    await belir(c, not_, 350);
    await c.say('Çizgi sıfır demek değildir; soy gazların elektronegatiflik değeri yoktur.',
      { speak: '[thoughtful] Çizgi sıfır demek değildir; soy gazların elektronegatiflik değeri yoktur.' });

    K.Na.deger.style.opacity = 0;
    const sec = c.slider({ label: 'Atom numarası', min: 1, max: 20, value: 11, fmt: (z) => z + ' · ' + ELEMENT[z - 1].simge,
      onInput: (z) => {
        const el = ELEMENT[z - 1];
        hepsi.forEach((k) => vurgula(k, k.el === el ? (el.en == null ? 'var(--text)' : EN) : null));
        not_.textContent = `${el.ad} (${el.simge}): ${el.en == null ? 'değeri yok' : pauling(el.en)}`;
      } });
    await c.say('Atom numarasına göre element seç; yerini ve Pauling değerini oku.', { noWait: true });
    await c.cont();
    sec.remove();
    hepsi.forEach((k) => vurgula(k));
    not_.textContent = '';
    await c.tween(600, (e) => hepsi.forEach((k) => { if (k.dolgu) k.dolgu.setAttribute('opacity', 0.2 + 0.45 * e); }));
    await c.say('Değerler tabloda rastgele dağılmıyor; şimdi düzenine bakalım.');
  }

  /* ---- Sahne 4 · Periyotta sağa: elektronegatiflik artar ---- */
  async function periyotta(c) {
    const svg = c.svg();
    let P = ucuncuPeriyot(c, svg);
    await belir(c, svg.firstChild);
    await c.say('Üçüncü periyotta sodyumdan klora doğru gidelim.');
    await belir(c, P.proton);
    await c.say('Proton sayısı 11’den 17’ye çıkar; çekirdeğin çekimi güçlenir.',
      { speak: 'Proton sayısı on birden on yediye çıkar; çekirdeğin çekimi güçlenir.' });
    await belir(c, P.daireler);
    await c.say('Atom yarıçapı 186 pm’den 99 pm’ye küçülür.',
      { speak: 'Atom yarıçapı yüz seksen altı pikometreden doksan dokuz pikometreye küçülür.' });
    await belir(c, P.mesafe);
    await c.say('Küçük atomda bağ elektronları çekirdeğe daha yakındır.');
    await c.choice({ q: 'Sodyumdan klora gidildikçe elektronegatiflik nasıl değişir?', options: ['Artar', 'Azalır', 'Değişmez'], answer: 0,
      hints: ['', 'Çekirdeğin çekimi güçleniyor, bağ elektronları da yaklaşıyor.', 'Proton sayısı da yarıçap da değişiyor; çekme gücü aynı kalmaz.'],
      right: 'Artar. Şimdi nedenine ve değerlere bakalım.' });
    await belir(c, P.neden, 350);
    await c.say('Yakındaki bağ elektronlarını, yükü artan çekirdek daha güçlü çeker.');
    await Promise.all([sil(c, P.neden), sil(c, P.proton)]);
    P.taban.style.opacity = 1;
    await belir(c, P.cubukAdi, 350);
    await c.tween(800, (e) => P.doldur(0, 3, e));
    await c.say('Sodyum 0,93; magnezyum 1,31; alüminyum 1,61; silisyum 1,90.',
      { speak: 'Sodyum sıfır virgül doksan üç; magnezyum bir virgül otuz bir; alüminyum bir virgül altmış bir; silisyum bir virgül doksan.' });
    await c.tween(800, (e) => P.doldur(4, 6, e));
    await c.say('Fosfor 2,19; kükürt 2,58; klor 3,16.',
      { speak: 'Fosfor iki virgül on dokuz; kükürt iki virgül elli sekiz; klor üç virgül on altı.' });

    const sec = c.slider({ label: 'Grafik', min: 0, max: 1, value: 0, fmt: (i) => (i ? 'Elektronegatiflik' : 'Yarıçap'), onInput: (i) => ozellikGrafik(c, svg, i) });
    await c.say('Yarıçap ve elektronegatiflik grafikleri arasında geçiş yap; yönlerini karşılaştır.', { noWait: true });
    await c.cont();
    sec.remove();

    P = ucuncuPeriyot(c, svg);
    [P.daireler, P.taban, P.yonler].forEach((el) => { el.style.opacity = 1; });
    P.doldur(0, 6, 1);
    await belir(c, svg, 350);
    await c.say('Periyotta sağa gidildikçe yarıçap küçülür, elektronegatiflik artar.',
      { speak: 'Periyotta sağa gidildikçe [short pause] yarıçap küçülür, elektronegatiflik artar.' });
    c.note('<b>Periyotta sağa: yarıçap küçülür, elektronegatiflik artar.</b><br>Na 0,93 < Cl 3,16', 'Periyotta');
  }

  /* ---- Sahne 5 · Grupta aşağı: elektronegatiflik azalır ---- */
  async function grupta(c) {
    const svg = c.svg(), ax = 190, OLCEK = 0.32;
    const grup = [{ s: 'Li', seviye: 2, y: 110, kalin: 5 }, { s: 'Na', seviye: 3, y: 242, kalin: 3.5 }, { s: 'K', seviye: 4, y: 396, kalin: 2 }];
    const atomlar = c.S('g', {}, svg), yaricap = gizle(c.S('g', {}, svg)), cift = gizle(c.S('g', {}, svg)), cekimOk = gizle(c.S('g', {}, svg));
    yazi(c, atomlar, ax, 44, '1A', { size: 28, renk: RENK.soluk });
    grup.forEach((a) => {
      const r = PM[a.s] * OLCEK;
      for (let k = 1; k <= a.seviye; k++) {
        c.S('circle', { cx: ax, cy: a.y, r: r * k / a.seviye, fill: 'none', stroke: k === a.seviye ? YARICAP : RENK.cizgi, 'stroke-width': k === a.seviye ? 3 : 2 }, atomlar);
      }
      c.S('circle', { cx: ax, cy: a.y, r: 7, fill: CEKIRDEK }, atomlar);
      yazi(c, atomlar, 66, a.y + 11, a.s, { size: 32 });
      yazi(c, yaricap, 350, a.y + 9, PM[a.s] + ' pm', { size: 26, renk: YARICAP });
      c.S('line', { x1: ax, y1: a.y, x2: ax + r, y2: a.y, stroke: BAG, 'stroke-width': 3, 'stroke-dasharray': '5 5' }, cift);
      [-7, 7].forEach((dy) => c.S('circle', { cx: ax + r, cy: a.y + dy, r: 6, fill: BAG }, cift));
      ok(c, cekimOk, ax + r - 10, a.y + 20, ax + 12, a.y + 20, { renk: CEKIRDEK, kalin: a.kalin, uc: 10 });
    });
    /* Pauling değeri: değerle orantılı yatay çubuk ve ucunda sayı. */
    const deger = (p, x, y, s) => {
      const w = E[s].en / 4 * 200;
      c.S('rect', { x, y: y - 13, width: w, height: 26, rx: 3, fill: EN }, p);
      yazi(c, p, x + w + 12, y + 9, pauling(E[s].en), { size: 26, hiza: 'start' });
    };
    await belir(c, atomlar);
    await c.say('Şimdi 1A grubunda aşağı inelim: lityum, sodyum, potasyum.',
      { speak: 'Şimdi bir A grubunda aşağı inelim: lityum, sodyum, potasyum.' });
    await belir(c, yaricap);
    await c.say('Her adımda bir enerji seviyesi eklenir; yarıçap 152, 186, 227 pm olur.',
      { speak: 'Her adımda bir enerji seviyesi eklenir; yarıçap yüz elli iki, yüz seksen altı, iki yüz yirmi yedi pikometre olur.' });
    await belir(c, cift);
    await c.say('Atom büyüdükçe bağ elektronları çekirdekten uzaklaşır.');
    const zayif = yazi(c, svg, 690, 405, 'uzak elektron → zayıf çekim', { size: 28 });
    await Promise.all([belir(c, cekimOk, 350), belir(c, zayif, 350)]);
    await c.say('Çekirdek, uzaktaki bağ elektronlarını daha zayıf çeker.');
    await c.choice({ q: '1A grubunda lityumdan potasyuma inildikçe elektronegatiflik nasıl değişir?', options: ['Artar', 'Azalır', 'Değişmez'], answer: 1,
      hints: ['Bağ elektronları çekirdekten uzaklaşıyor; çekirdek onları daha güçlü çekemez.', '', 'Yarıçap değişiyor; bağ elektronlarının uzaklığı ve çekim de değişir.'],
      right: 'Azalır. Şimdi değerlere bakalım.' });
    await sil(c, zayif);
    const birA = c.S('g', {}, svg);
    grup.forEach((a) => deger(birA, 450, a.y, a.s));
    await belir(c, birA);
    await c.say('Pauling değerleri: lityum 0,98; sodyum 0,93; potasyum 0,82.',
      { speak: 'Poling değerleri: lityum sıfır virgül doksan sekiz; sodyum sıfır virgül doksan üç; potasyum sıfır virgül seksen iki.' });
    const yediA = c.S('g', {}, svg);
    yazi(c, yediA, 660, 150, '7A', { size: 28, renk: RENK.soluk });
    [['F', 208], ['Cl', 272]].forEach(([s, y]) => { yazi(c, yediA, 660, y + 11, s, { size: 32 }); deger(yediA, 696, y, s); });
    await belir(c, yediA);
    await c.say('7A grubunda da böyledir: flor 4,00; klor 3,16.',
      { speak: 'Yedi A grubunda da böyledir: flor dört virgül sıfır sıfır; klor üç virgül on altı.' });
    const sonuc = yazi(c, svg, 500, 530, 'aşağı inildikçe: yarıçap büyür, elektronegatiflik azalır', { size: 26, renk: EN });
    const asagi = ok(c, svg, 28, 70, 28, 460, { kalin: 3 });
    await Promise.all([belir(c, sonuc, 350), belir(c, asagi, 350)]);
    await c.say('Grupta aşağı inildikçe yarıçap büyür, elektronegatiflik azalır.');
    sonuc.textContent = 'yarıçap ile elektronegatiflik: genellikle ters yönde';
    await belir(c, sonuc, 350);
    await c.say('Yarıçap ile elektronegatiflik genellikle ters yönde değişir.',
      { speak: '[thoughtful] Yarıçap ile elektronegatiflik genellikle ters yönde değişir.' });
    c.note('<b>Grupta aşağı: yarıçap büyür, elektronegatiflik azalır.</b><br>Li 0,98 > K 0,82', 'Grupta');
  }

  /* ---- Sahne 6 · Konumdan sırala ---- */
  async function sirala(c) {
    const svg = c.svg();
    const kesit = c.S('g', {}, svg);
    const T = tablo(c, kesit, { sec: (el) => el.periyot === 2 || el.periyot === 3, ilkPeriyot: 2, x0: 100, y0: 140, h: 120, no: true }), K = T.kutular;
    Object.values(K).forEach((k) => { k.g.style.opacity = 1; });
    const oklar = gizle(c.S('g', {}, kesit));
    ok(c, oklar, 110, 110, 946, 110, { renk: EN, kalin: 3 });
    yazi(c, oklar, 528, 92, 'artar', { size: 28, renk: EN });
    ok(c, oklar, 56, 150, 56, 380, { renk: EN, kalin: 3 });
    yazi(c, oklar, 56, 424, 'azalır', { size: 28, renk: EN });
    const isaretle = async (s) => { vurgula(K[s], EN); await belir(c, K[s].no, 350); };
    await belir(c, kesit);
    await c.say('İki eğilimi birleştirelim.');
    await belir(c, oklar);
    await c.say('Elektronegatiflik periyotta sağa gidildikçe artar, grupta aşağı inildikçe azalır.');
    await isaretle('F');
    await c.say('Flor ikinci periyotta, 7A grubundadır; atom numarası 9’dur.',
      { speak: 'Flor ikinci periyotta, yedi A grubundadır; atom numarası dokuzdur.' });
    await isaretle('Cl');
    await c.say('Klor florun hemen altındadır; atom numarası 17’dir.',
      { speak: 'Klor florun hemen altındadır; atom numarası on yedidir.' });
    await isaretle('Na');
    await c.say('Sodyum klorla aynı periyotta, 1A grubundadır; atom numarası 11’dir.',
      { speak: 'Sodyum klorla aynı periyotta, bir A grubundadır; atom numarası on birdir.' });
    await c.choice({ tag: 'Uygula', q: 'Bu üç atomu elektronegatifliği büyükten küçüğe sırala.',
      options: ['Na > Cl > F', 'Cl > F > Na', 'F > Cl > Na'], answer: 2,
      hints: ['Sodyum en solda; periyotta en küçük değer onda olur.', 'Klor florun altındadır; aşağı inildikçe değer azalır.', ''],
      right: 'F > Cl > Na. Flor klorun üstünde, klor sodyumun sağında.' });
    await degerYaz(c, [K.F, K.Cl, K.Na], 1);
    await c.say('Flor klorun üstünde, klor sodyumun sağındadır: 4,00; 3,16; 0,93.',
      { speak: 'Flor klorun üstünde, klor sodyumun sağındadır: dört virgül sıfır sıfır; üç virgül on altı; sıfır virgül doksan üç.' });

    await sil(c, kesit, 350);
    const onem = c.S('g', {}, svg);
    kutu(c, onem, 80, 110, 360, 96, { renk: EN });
    yazi(c, onem, 260, 170, 'Elektronegatiflik', { size: 32, renk: EN });
    ok(c, onem, 458, 158, 542, 158);
    kutu(c, onem, 560, 110, 360, 96);
    yazi(c, onem, 740, 170, 'Molekül özellikleri', { size: 30 });
    await belir(c, onem);
    await c.say('Elektronegatiflik, moleküllerin bazı özelliklerini anlamak için önemlidir.');
    await belir(c, yazi(c, onem, 740, 256, 'polarlık · apolarlık', { size: 30, renk: EN }), 350);
    await c.say('Polarlık ve apolarlık bu özelliklerdendir.');
    const bag = cekim(c, onem, { y: 410, sol: 'H', sag: 'Cl', r: 46, x1: 390, x2: 610 });
    bag.kay(30);
    yazi(c, bag.g, 390, 500, '2,20', { size: 26, renk: EN });
    yazi(c, bag.g, 610, 500, '3,16', { size: 26, renk: EN });
    await belir(c, bag.g);
    await c.say('Bu kavramlar, bağlar incelenirken elektronegatiflik değerleriyle açıklanır.');
    c.note('<b>Sağa gidildikçe artar, aşağı inildikçe azalır.</b><br>F 4,00 > Cl 3,16 > Na 0,93', 'Konumdan sıralama');
  }

  Ders.start({
    id: 'etkilesim-h4', kicker: 'Konu H · Periyodik özellikler', title: 'Elektronegatiflik', accent: '#ffc857', back: 'index.html',
    intro: { title: 'Elektronegatiflik', hook: 'Ortak elektron çiftini iki atom eşit mi çeker?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Bağ elektronları kime yakın?', goal: 'Elektronegatifliği bağ elektronlarının çekilmesiyle tanımla.', run: kimeYakin },
      { title: 'Göreceli bir ölçü: Pauling ölçeği', goal: 'Pauling değerleriyle atomları karşılaştır.', run: olcek },
      { title: 'İlk yirmi elementin değerleri', goal: 'Tablodaki değerleri ve çizgileri yorumla.', run: yirmiElement },
      { title: 'Periyotta sağa: elektronegatiflik artar', goal: 'Periyottaki değişimi yarıçapla ilişkilendir.', run: periyotta },
      { title: 'Grupta aşağı: elektronegatiflik azalır', goal: 'Gruptaki değişimi yarıçapla ilişkilendir.', run: grupta },
      { title: 'Konumdan sırala', goal: 'Atomları tablodaki yerine göre sırala.', run: sirala },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangisi elektronegatifliği tanımlar?',
        options: ['Gaz hâlindeki atomdan elektron koparmak için gereken enerji', 'Bağ yapan atomun bağ elektronlarını kendine çekme gücü', 'Çekirdek ile en dış enerji seviyesi arasındaki uzaklık'], answer: 1,
        why: ['Bu, iyonlaşma enerjisinin tanımıdır.', 'Elektronegatiflik, atomun bağ elektronlarını kendine çekme gücüdür.', 'Bu, atom yarıçapının tanımıdır.'], scene: 0 },
      { q: 'Karbon, azot ve oksijen ikinci periyotta bu sırayla yan yanadır. Elektronegatifliği büyükten küçüğe sırala.',
        options: ['C > N > O', 'N > O > C', 'O > N > C'], answer: 2,
        why: ['Bu sıra küçükten büyüğedir; sağa gidildikçe değer artar.', 'Oksijen azotun sağındadır; değeri azotunkinden büyüktür.', 'Periyotta sağa gidildikçe elektronegatiflik artar; en sağdaki oksijen en büyüktür.'], scene: 3 },
      { q: 'Sinem: “Bağ elektronları iki atomun ortak elektronlarıdır; bu yüzden iki atom bağ elektronlarını her zaman eşit çeker.” Sinem’e hangi karşılık verilmelidir?',
        options: ['Haksız; elektronegatifliği büyük olan atom bağ elektronlarını daha çok çeker.', 'Haksız; atom yarıçapı büyük olan atom bağ elektronlarını daha çok çeker.', 'Haklı; ortak elektronlar iki atomun tam ortasında kalır.'], answer: 0,
        why: ['Evet. Elektronegatifliği farklı iki atomda bağ elektronları büyük olana doğru kayar; halat çekme yarışındaki güçlü takım gibi.', 'Büyük atomda bağ elektronları çekirdekten uzaktır; çekim zayıflar. Yarıçap büyüdükçe elektronegatiflik genellikle azalır.', 'Elektronlar ortaktır ama çekme gücü farklıysa ortada kalmaz; güçlü çeken atoma yaklaşır.'], scene: 0 },
      { q: 'Oksijen ve kükürt 6A grubundadır; kükürt, oksijenin bir alt periyodundadır. Birbirine bağlandıklarında bağ elektronlarını hangisi daha çok çeker?',
        options: ['Kükürt', 'Oksijen', 'İkisi eşit'], answer: 1,
        why: ['Kükürt daha büyüktür; bağ elektronları çekirdeğinden daha uzaktır ve daha zayıf çekilir.', 'Evet. Grupta yukarı çıkıldıkça yarıçap küçülür, bağ elektronları çekirdeğe yaklaşır ve elektronegatiflik artar.', 'Aynı grupta olmak değerleri eşitlemez; yarıçap farklıdır, çekme gücü de farklıdır.'], scene: 4 },
    ], summary: ['<b>Elektronegatiflik bağ elektronunu çekme gücüdür; sağa ve yukarı gidildikçe artar.</b>', 'Pauling değerleri birimsizdir; soy gazların elektronegatiflik değeri yoktur.'],
    nextLesson: { href: 'h5-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
