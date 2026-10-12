/* B3 — Deneyle modele: ısı, kütle, madde, sıcaklık farkı
   Her seferinde tek değişkenin değiştiği üç deneyin verisinden Q = C · ΔT ve C = m · c, yani Q = m · c · ΔT modeline ulaşılır.
   Senaryo: plan/fizik/enerji/senaryolar/B-isinin-hesabi.md (B3). Sıra plan/KURALLAR.md 3.2'ye göredir.
   Sahne 3 ve 5'te Ş2 (ISITMA) izometrik figürü (kutu x 0, y 30, h 440; yan içerik x 610–985); öteki sahneler düz vektördür.
   Sayılar kitabın ölçümleridir (senaryodaki tablolar). Zeytinyağının öz ısısı yalnızca "suyunkinin yarısı" diye geçer. */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, ok, tablo, tahminAl, sinifla } = window.KIT;
  const { kap, isiOku } = window.KIT_A;
  const { P, cozumKarti, dogruGrafigi, cubukCifti, sicaklikEtiketi, sureEtiketi } = window.KIT_B;
  const { lerp, ease } = Ders;
  const S = { sicaklik: RENK.sicaklik, isi: RENK.isi, kutle: RENK.kutle, su: RENK.soguk, yazi: RENK.yazi, gri: RENK.soluk };
  const ARKA = '#10162b';

  /* Bardak: üstü açık, içinde su (yükseklik birim). */
  function bardak(c, p, x, y, w, h, su) {
    const g = c.S('g', {}, p);
    if (su > 0) c.S('rect', { x: x + 2, y: y + h - su - 2, width: w - 4, height: su, fill: S.su, 'fill-opacity': 0.3 }, g);
    c.S('path', { d: `M${x},${y} V${y + h} H${x + w} V${y}`, fill: 'none', stroke: '#c3cbea', 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    return g;
  }

  /* Sıcaklık sayıları ve süre yazısı: figürdeki iki termometreyi izler. */
  function olcum(c, ov, f, T0) {
    const tS = sicaklikEtiketi(c, ov, f, 'sol.termometre'), tP = sicaklikEtiketi(c, ov, f, 'sag.termometre');
    const sure = sureEtiketi(c, ov, f, { dy: 100 });
    tS.guncelle(T0[0]); tP.guncelle(T0[1]); sure.yaz('0. dk');
    const ayarla = (a, b, sn) => {
      f.ayar('sol', { sicaklik: a }); f.ayar('sag', { sicaklik: b });
      if (sn != null) f.sure(sn);
      tS.guncelle(a); tP.guncelle(b);
    };
    return { tS, tP, sure, ayarla };
  }
  /* Bir dilim: gerçek 5 dakika 1.600 ms'ye sıkışır; sonunda tablo satırı açılır. */
  async function dilim(c, o, i, bas, son) {
    await c.tween(1600, (e) => o.ayarla(lerp(bas[0], son[0], e), lerp(bas[1], son[1], e), 300 * (i + e)), ease.linear);
    o.sure.yaz(5 * (i + 1) + '. dk');
    await o.tb.goster(i + 1);
    await c.wait(400);
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', {}, svg);
    c.S('rect', { x: 330, y: 200, width: 100, height: 100, rx: 8, fill: S.kutle, 'fill-opacity': 0.3, stroke: S.kutle, 'stroke-width': 3 }, g1);
    c.S('rect', { x: 540, y: 130, width: 140, height: 170, rx: 8, fill: S.kutle, 'fill-opacity': 0.3, stroke: S.kutle, 'stroke-width': 3 }, g1);
    yazi(c, g1, 380, 345, '1 kg', { size: 28, kalin: 600 });
    yazi(c, g1, 610, 345, '2 kg', { size: 28, kalin: 600 });
    const cc = c.S('g', {}, svg);
    yazi(c, cc, 380, 180, 'C', { size: 30, kalin: 700 });
    yazi(c, cc, 610, 110, '2 C', { size: 30, kalin: 700 });
    g1.setAttribute('transform', 'translate(0,40)'); cc.setAttribute('transform', 'translate(0,40)');
    gizle(g1, cc);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, g1, 450));
    const H1 = 'Isı sığası kütleyle birlikte artar: C = m · c.';
    await c.choice({
      tag: 'Hatırla', q: 'Aynı maddeden 1 kg ve 2 kg iki cisimden hangisinin ısı sığası daha büyüktür?',
      options: ['1 kg’lık olanın', 'İkisi eşit', '2 kg’lık olanın'], answer: 2,
      hints: [H1, H1, ''], right: 'Evet. ' + H1,
    });
    await par(c.say('Kütlesi iki katı olan cismin ısı sığası da iki katıdır.'), belir(c, cc, 400));

    c.clearSay();
    await belir(c, [g1, cc], 350, 0); g1.remove(); cc.remove();
    const g2 = c.S('g', {}, svg);
    c.S('rect', { x: 230, y: 220, width: 170, height: 130, rx: 14, fill: S.isi, 'fill-opacity': 0.22, stroke: S.isi, 'stroke-width': 3 }, g2);
    c.S('rect', { x: 600, y: 220, width: 170, height: 130, rx: 14, fill: S.su, 'fill-opacity': 0.22, stroke: S.su, 'stroke-width': 3 }, g2);
    const oku = isiOku(c, svg, [415, 285], [585, 285]);
    gizle(g2, oku.g);
    await belir(c, g2, 400);
    const H2 = 'Isı bir enerjidir; birimi joule.';
    await c.choice({
      tag: 'Hatırla', q: 'Isının birimi nedir?',
      options: ['Derece', 'Joule', 'Kelvin'], answer: 1,
      hints: [H2, '', H2], right: 'Evet. ' + H2,
    });
    await par(c.say('Isı aktarılan enerjidir; birimi joule.'), belir(c, oku.g, 400));
    await c.say('Bugün bu kavramların arasındaki bağıntıyı deneylerden çıkaracağız.');
  }

  /* ---- 2. Tek değişken kuralı ---- */
  async function tekDegisken(c) {
    const svg = c.svg(1000, 562);
    const g1 = c.S('g', { transform: 'translate(0,40)' }, svg);
    const orta = c.S('g', {}, g1);
    kutu(c, orta, 370, 230, 260, 80, { rx: 12, renk: S.sicaklik, w: 3 });
    const ortaT = yazi(c, orta, 500, 280, 'sıcaklık değişimi', { size: 26, kalin: 700, renk: S.sicaklik });
    const tanim = yazi(c, g1, 500, 352, 'son sıcaklık − ilk sıcaklık', { size: 24, kalin: 600, renk: S.gri });
    const kart = (x, y, ad, renk) => {
      const g = c.S('g', {}, g1);
      kutu(c, g, x, y, 200, 80, { rx: 12, renk, w: 3 });
      yazi(c, g, x + 100, y + 51, ad, { size: 32, kalin: 700, renk });
      return g;
    };
    const kartlar = [kart(90, 230, 'ısı', S.isi), kart(400, 80, 'kütle', S.kutle), kart(710, 230, 'madde', S.yazi)];
    const oklar = [ok(c, g1, [290, 270], [370, 270], RENK.cizgi, 4), ok(c, g1, [500, 160], [500, 230], RENK.cizgi, 4), ok(c, g1, [710, 270], [630, 270], RENK.cizgi, 4)];
    const yb = [
      yazi(c, g1, 190, 345, 'yalnızca bu değişir', { size: 22, kalin: 600 }),
      yazi(c, g1, 520, 200, 'yalnızca bu değişir', { size: 22, kalin: 600, hiza: 'start' }),
      yazi(c, g1, 810, 345, 'yalnızca bu değişir', { size: 22, kalin: 600 }),
    ];
    const isiNot = yazi(c, g1, 190, 380, 'ısıtıcı ya da süre', { size: 24, kalin: 600, renk: S.isi });
    gizle(orta, tanim, ...kartlar, ...oklar.map((o) => o.g), ...yb, isiNot);
    let op = [1, 1, 1];
    const vurgu = async (i) => {
      const bas = op.slice(), son = [0, 1, 2].map((j) => (j === i ? 1 : 0.45));
      await c.tween(600, (e) => kartlar.forEach((k, j) => { k.style.opacity = lerp(bas[j], son[j], e); }), ease.inOut);
      op = son;
    };

    await belir(c, orta, 400);
    await c.say('Ela, sıcaklığın neye bağlı değiştiğini deneyle bulmak istiyor.');
    ortaT.textContent = 'ΔT'; ortaT.setAttribute('font-size', 34);
    await par(c.say('Sıcaklık değişimini ΔT ile gösteriyoruz: son eksi ilk sıcaklık.', { speak: 'Sıcaklık değişimini delta T ile gösteriyoruz: son eksi ilk sıcaklık.' }), belir(c, tanim, 400));
    await par(c.say('Etkili olabilecek üç şey var: ısı, kütle ve madde.'), (async () => {
      for (let i = 0; i < 3; i++) await par(belir(c, kartlar[i], 400), belir(c, oklar[i].g, 400));
    })());
    await c.say('[curious] Üçünü birden değiştirirsek hangisinin etkili olduğunu anlayamayız.', { speak: '[curious] Üçünü birden değiştirirsek hangisinin etkili olduğunu anlayamayız.' });
    await par(c.say('Bu yüzden her deneyde yalnızca biri değişir; ötekiler aynı kalır.'), (async () => {
      for (let i = 0; i < 3; i++) {
        await vurgu(i);
        await belir(c, yb[i], 250); await c.wait(250); await belir(c, yb[i], 200, 0);
      }
    })());
    const tam = [1, 1, 1];
    await par(c.say('Özdeş ısıtıcılar, eşit sürede eşit ısı verir.'), (async () => {
      const bas = op.slice();
      await c.tween(600, (e) => kartlar.forEach((k, j) => { k.style.opacity = lerp(bas[j], tam[j], e); }), ease.inOut);
    })());
    await par(c.say('Isıyı değiştirmek için ısıtıcıyı ya da süreyi değiştiririz.'), belir(c, isiNot, 400));

    // Sor: yeni durum
    c.clearSay();
    await belir(c, g1, 350, 0); g1.remove();
    const g2 = c.S('g', {}, svg);
    kutu(c, g2, 250, 100, 500, 76, { rx: 12 });
    renkli(c, g2, 500, 149, ['amaç: ', ['kütlenin', S.kutle], ' etkisi'], { size: 32, kalin: 700 });
    const satirlar = [
      renkli(c, g2, 300, 280, ['madde: aynı'], { size: 30, kalin: 600, hiza: 'start' }),
      renkli(c, g2, 300, 350, [['ısıtıcı', S.isi], ' ve ', ['süre', S.isi], ': aynı'], { size: 30, kalin: 600, hiza: 'start' }),
      renkli(c, g2, 300, 420, [['kütle', S.kutle], ': farklı'], { size: 30, kalin: 600, hiza: 'start' }),
    ];
    gizle(g2, ...satirlar);
    await belir(c, g2, 400);
    const Hk = 'Yalnızca bir şey değişecekse ötekiler aynı kalmalı.';
    await c.choice({
      tag: 'Sor', q: 'Ela kütlenin etkisini görmek istiyor. Hangi deneyi kurmalı?',
      options: ['Madde, ısıtıcı ve süre aynı; yalnızca kütle farklı', 'Kütle ve madde birlikte farklı', 'Kütle aynı; ısıtıcı farklı'], answer: 0,
      hints: ['', 'İki şey birden değişirse hangisinin etkisi olduğu anlaşılmaz.', Hk],
      right: 'Evet. Yalnızca kütle değişir; ötekiler aynı kalır.',
    });
    await par(c.say('Yalnızca kütle farklı olmalı; ötekiler aynı kalmalı.'), (async () => { for (const s of satirlar) await belir(c, s, 350); })());
  }

  /* ---- 3. Birinci deney: ısı değişince ---- */
  async function birinciDeney(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', { icerik: 'yag', seviye: 0.5, sicaklik: 25, alev: 0 });
    f.ayar('sag', { icerik: 'yag', seviye: 0.5, sicaklik: 25, alev: 0 });
    const ov = c.S('g', {}, svg);
    const [sx, sy] = f.nokta('sol.etiket'), [gx, gy] = f.nokta('sag.etiket');
    const e1 = yazi(c, ov, sx, sy + 24, '1. ısıtıcı', { size: 24, kalin: 600 });
    const e2 = yazi(c, ov, gx, gy + 24, '2. ısıtıcı', { size: 24, kalin: 600 });
    const eYag = renkli(c, ov, (sx + gx) / 2, Math.max(sy, gy) + 62, ['zeytinyağı · ', ['eşit kütle', S.kutle]], { size: 24, kalin: 600 });
    const o = olcum(c, ov, f, [25, 25]);
    // Tablo: dar sütunlar (dk, 1. ısıtıcı, 2. ısıtıcı)
    const cap = yazi(c, ov, 797, 112, 'sıcaklık (°C)', { size: 24, kalin: 600, renk: S.sicaklik });
    const tb = tablo(c, ov, { x: 610, y: 128, satir: 4, h: 46, size: 24, sutunlar: [{ ad: 'dk', w: 80 }, { ad: '1. ısıtıcı', w: 147 }, { ad: '2. ısıtıcı', w: 148 }] });
    const VERI = [[0, 25, 25], [5, 32, 28], [10, 39, 31], [15, 46, 34]];
    VERI.forEach((r, i) => r.forEach((v, j) => tb.yaz(i, j, String(v), j ? S.sicaklik : null)));
    o.tb = tb;
    // Grafik
    const G = dogruGrafigi(c, ov, { o: [650, 390], xSon: [975, 390], ySon: [650, 130] });
    const gYAd = yazi(c, ov, 664, 140, 'ΔT (°C)', { size: 24, kalin: 600, hiza: 'start' });
    const gXAd = yazi(c, ov, 812, 456, 'Verilen ısı', { size: 24, kalin: 600 });
    const tQ = [yazi(c, ov, 750, 420, 'Q', { size: 24, kalin: 700, renk: S.isi }), yazi(c, ov, 850, 420, '2 Q', { size: 24, kalin: 700, renk: S.isi }), yazi(c, ov, 950, 420, '3 Q', { size: 24, kalin: 700, renk: S.isi })];
    const NOK = [[750, 310, '7'], [850, 230, '14'], [950, 150, '21']];
    const dg = G.dogru([950, 150], S.isi);
    const noktalar = NOK.map(([x, y]) => G.nokta([x, y]));
    const degerler = NOK.map(([x, y, t]) => yazi(c, ov, x - 20, y + 8, t, { size: 24, kalin: 700, hiza: 'end', renk: S.sicaklik }));
    const orantiT = yazi(c, ov, 660, 196, 'doğru orantı', { size: 24, kalin: 600, hiza: 'start', renk: S.isi });
    const formul = renkli(c, ov, 797, 84, [P.C, ' = ', P.Q, ' / ', P.dT], { size: 34, kalin: 700 });
    gizle(f.el, e1, e2, eYag, o.tS.g, o.tP.g, o.sure.g, cap, tb.g, G.g, gYAd, gXAd, ...tQ, ...noktalar, ...degerler, orantiT, formul);

    await par(c.say('İlk deneyde yalnızca ısı değişiyor: ısıtıcılar farklı.'), belir(c, f.el, 450));
    await par(c.say('İki özdeş kapta, aynı sıcaklıkta, eşit kütlede zeytinyağı var.'), belir(c, [eYag, o.tS.g, o.tP.g, o.sure.g], 400));
    f.ayar('sol', { alev: 2 }); f.ayar('sag', { alev: 1 });
    await par(c.say('Birinci ısıtıcı, birim sürede ikinciden daha çok ısı verir.'), belir(c, [e1, e2], 350));
    c.clearSay();
    await tahminAl(c, { tag: 'Tahmin et', q: 'Sence beş dakika sonra hangi kapta sıcaklık daha çok artar?', options: ['Birinci kapta', 'İkinci kapta', 'İkisinde aynı'] });
    // Tablo açılır: ısıtıcı ve madde etiketleri kalkar (tablo başlıkları aynı adı taşır).
    await par(c.say('Ela her beş dakikada iki termometreyi okuyor.'), (async () => {
      await belir(c, [e1, e2, eYag], 300, 0);
      await belir(c, [cap, tb.g], 350);
      await tb.goster(0);
    })());
    await par(c.say('Beş dakikada birinci yağ 7 °C, ikincisi 3 °C ısındı.', { speak: 'Beş dakikada birinci yağ yedi derece, ikincisi üç derece ısındı.' }),
      dilim(c, o, 0, [25, 25], [32, 28]));
    await par(c.say('On beşinci dakikada ΔT birincide 21 °C, ikincide 9 °C.', { speak: 'On beşinci dakikada delta T birincide yirmi bir derece, ikincide dokuz derece.' }),
      (async () => { await dilim(c, o, 1, [32, 28], [39, 31]); await dilim(c, o, 2, [39, 31], [46, 34]); })());
    tb.vurgula(3);
    await c.say('Aynı sürede daha çok ısı veren ısıtıcıda sıcaklık daha çok artar.');

    // Grafik
    tb.vurgula(3, false);
    await belir(c, [tb.g, cap], 300, 0);
    await par(c.say('Birinci ısıtıcının beş dakikada verdiği ısıya Q diyelim.', { speak: 'Birinci ısıtıcının beş dakikada verdiği ısıya kü diyelim.' }),
      belir(c, [G.g, gYAd, gXAd, tQ[0], e1, e2], 400));
    await par(c.say('Isıtıcı sabit hızla ısı verir.'), belir(c, [tQ[1], tQ[2]], 400));
    await par(c.say('10 dakikada 2 Q, 15’te 3 Q verir; ΔT 14, 21.', { speak: 'On dakikada iki kü, on beşte üç kü verir; delta T on dört, yirmi bir.' }),
      (async () => { for (let i = 0; i < 3; i++) { await belir(c, [noktalar[i], degerler[i]], 300); await c.wait(150); } })());
    await par(c.say('Isı iki katına çıkınca ΔT de iki katına çıkıyor.', { speak: 'Isı iki katına çıkınca delta T de iki katına çıkıyor.' }), dg.ciz(800));
    await par(c.say('Sıcaklık değişimi, verilen ısıyla doğru orantılıdır.'), belir(c, orantiT, 400));
    await belir(c, [o.tS.g, o.tP.g, o.sure.g, e1, e2, orantiT], 300, 0);
    f.el.style.opacity = 1;
    await par(c.say('Isıyı ΔT’ye bölünce ısı sığası bulunur: C = Q / ΔT.', { speak: 'Isıyı delta T’ye bölünce ısı sığası bulunur: büyük C eşittir Q bölü delta T.' }),
      par(belir(c, f.el, 400, 0.35), belir(c, formul, 400)));
    await par(c.say('Buradan verilen ısı bulunur: Q = C · ΔT.', { speak: 'Buradan verilen ısı bulunur: Q eşittir büyük C çarpı delta T.' }),
      (async () => { await belir(c, formul, 200, 0); parcaKoy(c, formul, [P.Q, ' = ', P.C, ' · ', P.dT]); await belir(c, formul, 300); })());

    // Sor: yeni durum
    c.clearSay();
    await belir(c, [f.el, ov], 350, 0); f.el.remove(); ov.remove();
    const g2 = c.S('g', { transform: 'translate(0,30)' }, svg);
    kap(c, g2, { x: 430, y: 110, w: 140, h: 140, su: 110 });
    const s1 = renkli(c, g2, 500, 320, ['1. ısıtıcı, 5 dk: ', ['ΔT = 7 °C', S.sicaklik]], { size: 30, kalin: 600 });
    const s2 = renkli(c, g2, 500, 390, ['20 dk: ', ['ΔT = 4 · 7 = 28 °C', S.sicaklik]], { size: 30, kalin: 600 });
    gizle(g2, s2);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'Aynı ısıtıcı aynı kapta 20 dakika çalışırsa ΔT kaç °C olur?',
      options: ['14 °C', '28 °C', '35 °C'], answer: 1,
      hints: ['20 dakika, 5 dakikanın kaç katı? Isı da o kadar katı olur.', '', 'ΔT, ısıyla doğru orantılıdır; ısı 4 katına çıkarsa ΔT de çıkar.'],
      right: 'Evet. 20 dakika 5 dakikanın 4 katıdır; ΔT = 4 · 7 = 28 °C.',
    });
    await par(c.say('Isı dört katına çıkar; ΔT = 28 °C olur.', { speak: 'Isı dört katına çıkar; delta T eşittir yirmi sekiz derece olur.' }), belir(c, s2, 400));
    c.note('ΔT, ısıyla doğru orantılıdır: Q = C · ΔT.', 'Isı ve ΔT');
  }

  /* ---- 4. İkinci deney: kütle değişince ---- */
  async function ikinciDeney(c) {
    const svg = c.svg(1000, 562);
    const fr = c.S('g', {}, svg);
    c.S('rect', { x: 40, y: 90, width: 210, height: 340, rx: 18, fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3 }, fr);
    cizgi(c, fr, [60, 110], [60, 410], RENK.cizgi, 3);
    cizgi(c, fr, [60, 270], [230, 270], RENK.cizgi, 3);
    const b1 = bardak(c, fr, 70, 160, 60, 110, 55), b2 = bardak(c, fr, 150, 160, 60, 110, 110);
    const l1 = yazi(c, fr, 100, 305, 'm', { size: 24, kalin: 700, renk: S.kutle });
    const l2 = yazi(c, fr, 180, 305, '2 m', { size: 24, kalin: 700, renk: S.kutle });
    const rafT = yazi(c, svg, 145, 470, 'aynı raf', { size: 24, kalin: 600 });
    const ov = c.S('g', {}, svg);
    const tb = tablo(c, ov, { x: 290, y: 90, satir: 4, h: 46, size: 22, sutunlar: [{ ad: 'Süre (dk)', w: 200 }, { ad: 'm kütleli (°C)', w: 220 }, { ad: '2 m kütleli (°C)', w: 240 }] });
    const VERI = [[0, '23', '23'], [5, '20', '21,5'], [10, '17', '20'], [15, '14', '18,5']];
    VERI.forEach((r, i) => r.forEach((v, j) => tb.yaz(i, j, String(v), j ? S.sicaklik : null)));
    const bars = cubukCifti(c, ov, { adX: 320, x0: 420, y: [222, 292], adlar: ['', ''] });
    const barAd = [yazi(c, ov, 320, 222, 'm', { size: 24, kalin: 700, renk: S.kutle, hiza: 'start' }), yazi(c, ov, 320, 292, '2 m', { size: 24, kalin: 700, renk: S.kutle, hiza: 'start' })];
    const barBas = renkli(c, ov, 420, 160, [['ΔT', S.sicaklik], ' (soğuma)'], { size: 24, kalin: 600, hiza: 'start' });
    const sonuc = renkli(c, ov, 640, 400, ['kütle ×2 → ', ['ΔT', S.sicaklik], ' ÷2'], { size: 28, kalin: 600 });
    gizle(fr, rafT, tb.g, bars.g, ...barAd, barBas, sonuc);
    bars.deger(0, '9 °C'); bars.deger(1, '4,5 °C');

    await par(c.say('İkinci deneyde yalnızca kütle değişiyor.'), belir(c, fr, 450));
    await c.say('İki özdeş bardakta aynı limonata var: biri m, öteki 2 m kütleli.', { speak: 'İki özdeş bardakta aynı limonata var: biri me, öteki iki me kütleli.' });
    await par(c.say('İkisi buzdolabının aynı rafında; eşit sürede eşit ısı verir.'), belir(c, rafT, 400));
    c.clearSay();
    await tahminAl(c, { tag: 'Tahmin et', q: 'Sence 2 m kütleli limonatanın sıcaklığı m kütleliye göre nasıl düşer?', options: ['Daha çok', 'Daha az', 'Aynı'] });
    await par(c.say('Ela beş dakikada bir iki bardağı da ölçüyor.'), (async () => {
      await par(belir(c, rafT, 300, 0), belir(c, fr, 350, 0.35));
      await belir(c, tb.g, 350);
      await tb.goster(0);
    })());
    await par(c.say('Beş dakikada m kütleli 3 °C, 2 m kütleli 1,5 °C soğudu.', { speak: 'Beş dakikada me kütleli üç derece, iki me kütleli bir virgül beş derece soğudu.' }), tb.goster(1));
    await par(c.say('On beşinci dakikada soğuma 9 °C ve 4,5 °C oldu.', { speak: 'On beşinci dakikada soğuma dokuz derece ve dört virgül beş derece oldu.' }),
      (async () => { await tb.goster(2); await c.wait(300); await tb.goster(3); })());
    await par(c.say('Kütle iki katına çıkınca sıcaklık değişimi yarıya indi.'), (async () => {
      await belir(c, tb.g, 300, 0);
      await belir(c, [bars.g, ...barAd, barBas], 300);
      await bars.git(c, [270, 135], 600);
    })());
    await par(c.say('Eşit ısıda ΔT, kütleyle ters orantılıdır.', { speak: 'Eşit ısıda delta T, kütleyle ters orantılıdır.' }), belir(c, sonuc, 400));
    await belir(c, sonuc, 200, 0);
    parcaKoy(c, sonuc, [['Q', S.isi], ' aynı · ', ['ΔT', S.sicaklik], ' ÷2 → ', ['C', S.yazi], ' ×2']);
    await par(c.say('Q aynı, ΔT yarıya indi; öyleyse C iki katına çıktı.', { speak: 'Kü aynı, delta T yarıya indi; öyleyse büyük C iki katına çıktı.' }), belir(c, sonuc, 300));
    await belir(c, sonuc, 200, 0);
    parcaKoy(c, sonuc, [['m', S.kutle], ' ×2 → ', ['C', S.yazi], ' ×2']);
    await par(c.say('Isı sığası, kütleyle doğru orantılıdır.'), belir(c, sonuc, 300));

    // Sor: yeni durum
    c.clearSay();
    await belir(c, [fr, ov], 350, 0); fr.remove(); ov.remove();
    const g2 = c.S('g', {}, svg);
    cizgi(c, g2, [250, 360], [750, 360], RENK.cizgi, 3);
    const gl = [bardak(c, g2, 300, 190, 80, 170, 56), bardak(c, g2, 460, 190, 80, 170, 112), bardak(c, g2, 620, 190, 80, 170, 168)];
    gl[0].style.opacity = 0.45; gl[1].style.opacity = 0.45;
    c.S('rect', { x: 614, y: 184, width: 92, height: 176, rx: 8, fill: 'none', stroke: S.kutle, 'stroke-width': 3 }, g2);
    yazi(c, g2, 340, 400, 'm', { size: 28, kalin: 700, renk: S.kutle });
    yazi(c, g2, 500, 400, '2 m', { size: 28, kalin: 700, renk: S.kutle });
    yazi(c, g2, 660, 400, '3 m', { size: 28, kalin: 700, renk: S.kutle });
    renkli(c, g2, 500, 120, ['m kütleli: 15 dk’da ', ['9 °C', S.sicaklik], ' soğudu'], { size: 28, kalin: 600 });
    const res = renkli(c, g2, 500, 480, [['ΔT = 9 / 3 = 3 °C', S.sicaklik]], { size: 30, kalin: 700 });
    gizle(g2, res);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'Aynı limonatadan 3 m kütleli bardak da aynı rafta 15 dakika kalıyor. Sıcaklığı kaç °C düşer?',
      options: ['27 °C', '4,5 °C', '3 °C'], answer: 2,
      hints: ['Kütle arttıkça ΔT azalır.', 'Kütle üç katına çıkınca ΔT nasıl değişir? Tabloda iki katı için ne olmuştu?', ''],
      right: 'Evet. Eşit ısıda ΔT ile kütlenin çarpımı sabit: 9 / 3 = 3.',
    });
    await par(c.say('Kütle üç katına çıkınca ΔT üçte birine, yani 3 °C’ye iner.', { speak: 'Kütle üç katına çıkınca delta T üçte birine, yani üç dereceye iner.' }), belir(c, res, 400));
    c.note('Eşit ısıda ΔT, kütleyle ters orantılıdır; C kütleyle doğru.', 'Kütle ve ΔT');
  }

  /* ---- 5. Üçüncü deney: madde değişince ---- */
  async function ucuncuDeney(c) {
    const svg = c.svg(1000, 562);
    const f = ISITMA.kur(c, svg, { x: 0, y: 30, h: 440 });
    f.ayar('sol', { icerik: 'su', seviye: 0.5, sicaklik: 24, alev: 0 });
    f.ayar('sag', { icerik: 'yag', seviye: 0.5, sicaklik: 24, alev: 0 });
    const ov = c.S('g', {}, svg);
    const [sx, sy] = f.nokta('sol.etiket'), [gx, gy] = f.nokta('sag.etiket');
    const eSu = yazi(c, ov, sx, sy + 24, 'su', { size: 24, kalin: 600 });
    const eYag = yazi(c, ov, gx, gy + 24, 'zeytinyağı', { size: 24, kalin: 600 });
    const eOrta = renkli(c, ov, (sx + gx) / 2, Math.max(sy, gy) + 62, [['eşit kütle', S.kutle], ' · ', ['özdeş ısıtıcı', S.isi]], { size: 24, kalin: 600 });
    const o = olcum(c, ov, f, [24, 24]);
    const cap = yazi(c, ov, 797, 112, 'sıcaklık (°C)', { size: 24, kalin: 600, renk: S.sicaklik });
    const tb = tablo(c, ov, { x: 610, y: 128, satir: 4, h: 46, size: 24, sutunlar: [{ ad: 'dk', w: 80 }, { ad: 'su', w: 125 }, { ad: 'zeytinyağı', w: 170 }] });
    const VERI = [[0, 24, 24], [5, 27, 30], [10, 30, 36], [15, 33, 42]];
    VERI.forEach((r, i) => r.forEach((v, j) => tb.yaz(i, j, String(v), j ? S.sicaklik : null)));
    o.tb = tb;
    // ΔT çubukları (tablo kalkınca sütuna gelir)
    const barBas = renkli(c, ov, 797, 140, ['15 dk sonra ', ['ΔT', S.sicaklik]], { size: 24, kalin: 600 });
    const barAd = [yazi(c, ov, 640, 190, 'su', { size: 24, kalin: 600, hiza: 'start' }), yazi(c, ov, 640, 270, 'zeytinyağı', { size: 24, kalin: 600, hiza: 'start' })];
    const bars = cubukCifti(c, ov, { adX: 640, x0: 640, y: [226, 306], adlar: ['', ''] });
    bars.deger(0, '9 °C'); bars.deger(1, '18 °C');
    // Öz ısı etiketleri ve ilişki satırı
    const eSu2 = renkli(c, ov, sx, sy + 24, ['su · ', ['c', S.yazi]], { size: 24, kalin: 600 });
    const eYag2 = renkli(c, ov, gx, gy + 24, ['zeytinyağı · ', ['c/2', S.yazi]], { size: 24, kalin: 600 });
    const iliski = renkli(c, ov, 797, 400, [['c', S.yazi], ' ÷2 → ', ['ΔT', S.sicaklik], ' ×2'], { size: 28, kalin: 600 });
    gizle(f.el, eSu, eYag, eOrta, o.tS.g, o.tP.g, o.sure.g, cap, tb.g, barBas, ...barAd, bars.g, eSu2, eYag2, iliski);

    await par(c.say('Üçüncü deneyde yalnızca madde değişiyor.'), belir(c, f.el, 450));
    await par(c.say('Özdeş iki kapta eşit kütlede su ve zeytinyağı var.'), belir(c, [eSu, eYag, eOrta, o.tS.g, o.tP.g, o.sure.g], 400));
    f.ayar('sol', { alev: 2 }); f.ayar('sag', { alev: 2 });
    await c.say('İki özdeş ısıtıcı aynı anda açılıyor.');
    c.clearSay();
    await tahminAl(c, { tag: 'Tahmin et', q: 'Sence on beş dakika sonra hangisi daha çok ısınır?', options: ['Su', 'Zeytinyağı', 'İkisi aynı'] });
    await Promise.all([belir(c, [eSu, eYag, eOrta], 300, 0), belir(c, [cap, tb.g], 350)]);
    await tb.goster(0);
    await par(c.say('Beş dakikada su 3 °C, zeytinyağı 6 °C ısındı.', { speak: 'Beş dakikada su üç derece, zeytinyağı altı derece ısındı.' }),
      dilim(c, o, 0, [24, 24], [27, 30]));
    await par(c.say('On beşinci dakikada ΔT su için 9 °C, zeytinyağı için 18 °C.', { speak: 'On beşinci dakikada delta T su için dokuz derece, zeytinyağı için on sekiz derece.' }),
      (async () => { await dilim(c, o, 1, [27, 30], [30, 36]); await dilim(c, o, 2, [30, 36], [33, 42]); })());
    await par(c.say('Aynı ısıyla zeytinyağının ΔT’si, suyunkinin iki katı oldu.', { speak: 'Aynı ısıyla zeytinyağının delta T’si, suyunkinin iki katı oldu.' }), (async () => {
      await belir(c, [tb.g, cap, o.tS.g, o.tP.g, o.sure.g], 300, 0);
      await belir(c, [barBas, ...barAd, bars.g], 300);
      await bars.git(c, [90, 180], 600);
    })());
    await par(c.say('[short pause] Zeytinyağının öz ısısı suyunkinin yarısıdır.', { speak: '[short pause] Zeytinyağının öz ısısı suyunkinin yarısıdır.' }), belir(c, [eSu2, eYag2], 400));
    await par(c.say('Öz ısı yarıya inince, aynı ısıyla ΔT iki katına çıkıyor.', { speak: 'Öz ısı yarıya inince, aynı ısıyla delta T iki katına çıkıyor.' }), belir(c, iliski, 400));
    await belir(c, iliski, 200, 0);
    parcaKoy(c, iliski, [['ΔT', S.sicaklik], ' · ', ['c', S.yazi], ' = sabit']);
    await par(c.say('Eşit ısıda ΔT, öz ısıyla ters orantılıdır.', { speak: 'Eşit ısıda delta T, öz ısıyla ters orantılıdır.' }), belir(c, iliski, 300));
    await belir(c, iliski, 200, 0);
    parcaKoy(c, iliski, [['Q', S.isi], ' aynı → ', ['C', S.yazi], ' ÷2']);
    await par(c.say('Q aynı, ΔT iki katı; öyleyse zeytinyağının ısı sığası yarıdır.', { speak: 'Kü aynı, delta T iki katı; öyleyse zeytinyağının ısı sığası yarıdır.' }), belir(c, iliski, 300));
    await belir(c, iliski, 200, 0);
    parcaKoy(c, iliski, [['m', S.kutle], ' aynı → ', ['C', S.yazi], ' ile ', ['c', S.yazi], ' doğru']);
    await par(c.say('Kütle aynıysa ısı sığası, öz ısıyla doğru orantılıdır.'), belir(c, iliski, 300));

    // Sor: yeni durum
    c.clearSay();
    await belir(c, [f.el, ov], 350, 0); f.el.remove(); ov.remove();
    const g2 = c.S('g', {}, svg);
    kap(c, g2, { x: 250, y: 130, w: 140, h: 140, su: 110 });
    kap(c, g2, { x: 610, y: 130, w: 140, h: 140, su: 110 });
    yazi(c, g2, 320, 320, 'su', { size: 28, kalin: 700 });
    renkli(c, g2, 680, 320, ['başka sıvı'], { size: 28, kalin: 700 });
    yazi(c, g2, 680, 360, 'c: suyunkinin dörtte biri', { size: 24, kalin: 600, renk: S.gri });
    renkli(c, g2, 500, 440, [['eşit kütle', S.kutle], ' · ', ['özdeş ısıtıcı', S.isi], ' · eşit süre'], { size: 24, kalin: 600 });
    const res = renkli(c, g2, 500, 500, [['ΔT', S.sicaklik], ' · ', ['c', S.yazi], ' = sabit → ΔT 4 katı'], { size: 28, kalin: 700 });
    gizle(g2, res);
    await belir(c, g2, 400);
    await c.choice({
      tag: 'Sor', q: 'Aynı ısıyla başka sıvının ΔT’si, suyun ΔT’sinin kaç katı olur?',
      options: ['4 katı', 'Dörtte biri', '2 katı'], answer: 0,
      hints: ['', 'Öz ısı küçülünce aynı ısıyla ΔT nasıl değişir? Zeytinyağında ne olmuştu?', 'Öz ısı dörtte birine inerse ΔT 4 katına çıkar.'],
      right: 'Evet. Öz ısı dörtte bire inince ΔT 4 katına çıkar.',
    });
    await par(c.say('Öz ısı dörtte bire inince ΔT dört katına çıkar.', { speak: 'Öz ısı dörtte bire inince delta T dört katına çıkar.' }), belir(c, res, 400));
    c.note('Eşit ısıda ΔT, öz ısıyla ters orantılıdır.', 'Madde ve ΔT');
  }

  /* ---- 6. Üç ilişki, tek model ---- */
  async function model(c) {
    const svg = c.svg(1000, 562);
    const kg = c.S('g', { transform: 'translate(0,50)' }, svg);
    const kart = (x, parcalar) => {
      const g = c.S('g', {}, kg);
      kutu(c, g, x, 90, 280, 80, { rx: 12 });
      renkli(c, g, x + 140, 140, parcalar, { size: 26, kalin: 600 });
      return g;
    };
    const kartlar = [
      kart(60, [['ısı', S.isi], ': ', ['ΔT', S.sicaklik], ' artar']),
      kart(360, [['kütle', S.kutle], ': ', ['ΔT', S.sicaklik], ' azalır']),
      kart(660, [['öz ısı', S.yazi], ': ', ['ΔT', S.sicaklik], ' azalır']),
    ];
    const csat = renkli(c, kg, 500, 225, ['kütle ve öz ısı büyürse ', ['C', S.yazi], ' büyür'], { size: 26, kalin: 600 });
    gizle(kg, csat);
    const ck = cozumKarti(c, svg, { x: 140, y: 250, w: 720, size: 34, satir: 56 });
    gizle(ck.g);

    await c.say('Üç deneyin sonucunu birleştirelim.');
    await par(c.say('ΔT, ısıyla doğru; kütleyle ve öz ısıyla ters orantılıdır.', { speak: 'Delta T, ısıyla doğru; kütleyle ve öz ısıyla ters orantılıdır.' }), belir(c, kg, 400));
    await par(c.say('Isı sığası, kütleyle ve öz ısıyla doğru orantılıdır.'), belir(c, csat, 400));
    c.clearSay();
    await belir(c, kg, 300, 0); kg.remove();
    ck.g.style.opacity = 1;
    await par(c.say('Bu yüzden C = m · c yazılır.', { speak: 'Bu yüzden büyük C eşittir m çarpı küçük c yazılır.' }), ck.ekle([P.C, ' = ', P.m, ' · ', P.c], { soluk: false }));
    await par(c.say('Isı, ısı sığası ile ΔT’nin çarpımıdır: Q = C · ΔT.', { speak: 'Isı, ısı sığası ile delta T’nin çarpımıdır: Q eşittir büyük C çarpı delta T.' }), ck.ekle([P.Q, ' = ', P.C, ' · ', P.dT]));
    await par(c.say('C yerine m · c yazınca model tamamlanır.', { speak: 'Büyük C yerine m çarpı küçük c yazınca model tamamlanır.' }), (async () => {
      await belir(c, ck.satir(1), 200, 0.15);
      ck.degistir(1, [P.Q, ' = (', P.m, ' · ', P.c, ') · ', P.dT]);
      await belir(c, ck.satir(1), 300, 1);
    })());

    // Model: büyük formül
    await belir(c, ck.g, 300, 0); ck.g.remove();
    const mg = c.S('g', {}, svg);
    kutu(c, mg, 200, 220, 600, 120, { rx: 14 });
    const XS = [290, 360, 430, 480, 530, 580, 650];
    const TK = [['Q', S.isi], ['=', S.yazi], ['m', S.kutle], ['·', S.yazi], ['c', S.yazi], ['·', S.yazi], ['ΔT', S.sicaklik]];
    TK.forEach(([t, r], i) => yazi(c, mg, XS[i], 295, t, { size: 46, kalin: 700, renk: r }));
    gizle(mg);
    const birim = (x, t, r) => { const e = yazi(c, svg, x, 392, t, { size: 26, kalin: 600, renk: r }); gizle(e); return e; };
    const bQ = birim(290, 'J', S.isi), bm = birim(430, 'g', S.kutle), bc = birim(530, 'J/g · °C', S.yazi), bT = birim(650, '°C', S.sicaklik);
    const suC = renkli(c, svg, 500, 470, ['su için ', ['c', S.yazi], ' = 4,18 J/g · °C'], { size: 26, kalin: 600 });
    gizle(suC);
    await par(c.say('[short pause] Q = m · c · ΔT.', { speak: '[short pause] Q eşittir m çarpı c çarpı delta T.' }), belir(c, mg, 450));
    await par(c.say('Isı joule, kütle gram, sıcaklık değişimi °C ile yazılır.', { speak: 'Isı joule, kütle gram, sıcaklık değişimi derece ile yazılır.' }),
      (async () => { await belir(c, bQ, 300); await belir(c, bm, 300); await belir(c, bT, 300); })());
    await par(c.say('Öz ısının birimi böylece J/g · °C olur.', { speak: 'Öz ısının birimi böylece jul bölü gram derece olur.' }), belir(c, bc, 400));
    await par(c.say('Suyun öz ısısı 4,18 J/g · °C alınır.', { speak: 'Suyun öz ısısı dört virgül on sekiz jul bölü gram derece alınır.' }), belir(c, suC, 400));
    c.note('Q = m · c · ΔT. Isı arttıkça ΔT artar.', 'Model');
    c.note('Q = C · ΔT; C = m · c.', 'Isı sığasıyla');
  }

  /* ---- 7. Model deneyle uyuşuyor mu? ---- */
  async function sinama(c) {
    const svg = c.svg(1000, 562);
    const bas = renkli(c, svg, 500, 130, [P.Q, ' = ', P.m, ' · ', P.c, ' · ', P.dT], { size: 36, kalin: 700 });
    const kA = cozumKarti(c, svg, { x: 140, y: 180, w: 720 });
    const kB = cozumKarti(c, svg, { x: 140, y: 180, w: 720 });
    gizle(bas, kA.g, kB.g);
    await par(c.say('Modeli sınayalım: özdeş ısıtıcılar eşit ısı vermişti.'), belir(c, [bas, kA.g], 450));
    await par(c.say('Su için on beş dakikada ΔT 9 °C’tı.', { speak: 'Su için on beş dakikada delta T dokuz dereceydi.' }), kA.ekle([['su', S.su], ': ', P.dT, ' = 9 °C']));
    await par(c.say('Zeytinyağının öz ısısı c’nin yarısı, ΔT ise 18 °C’tı.', { speak: 'Zeytinyağının öz ısısı küçük c’nin yarısı, delta T ise on sekiz dereceydi.' }), kA.ekle(['yağ: öz ısı c/2, ', P.dT, ' = 18 °C']));
    await belir(c, kA.g, 300, 0); kA.g.remove();
    kB.g.style.opacity = 1;
    await par(c.say('Su için yazılır: m · c · 9.', { speak: 'Su için yazılır: m çarpı c çarpı dokuz.' }), kB.ekle(['Su: ', P.m, ' · ', P.c, ' · 9'], { soluk: false }));
    await par(c.say('Zeytinyağı için yazılır: m · c/2 · 18.', { speak: 'Zeytinyağı için yazılır: m çarpı c bölü iki çarpı on sekiz.' }), kB.ekle(['Yağ: ', P.m, ' · c/2 · 18'], { soluk: false }));
    await belir(c, bas, 300, 0);
    await par(c.say('18’in yarısı 9’dur; ikisi de m · c · 9 eder.', { speak: 'On sekizin yarısı dokuzdur; ikisi de m çarpı c çarpı dokuz eder.' }), kB.ekle(['Yağ: ', P.m, ' · ', P.c, ' · 9'], { soluk: false }));
    const kx = 620;
    const yk = [228, 332];
    const br = c.S('path', { d: `M${kx - 40},${yk[0]} H${kx} V${yk[1]} H${kx - 40}`, fill: 'none', stroke: S.sicaklik, 'stroke-width': 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
    const esit = yazi(c, svg, kx + 30, 291, 'eşit', { size: 28, kalin: 700, renk: S.sicaklik, hiza: 'start' });
    gizle(br, esit);
    await par(c.say('Isılar eşit çıktı; model deneyle uyuşuyor.'), belir(c, [br, esit], 300));

    // Birlikte çöz
    c.clearSay();
    await belir(c, [kB.g, br, esit], 300, 0); kB.g.remove(); br.remove(); esit.remove(); bas.remove();
    const k2 = cozumKarti(c, svg, { x: 140, y: 180, w: 720 });
    gizle(k2.g);
    await k2.ekle([['m', S.kutle], ' kütleli: ', P.m, ' · ', P.c, ' · 9'], { ms: 0, soluk: false });
    await k2.ekle([['2 m', S.kutle], ' kütleli: ', ['2 m', S.kutle], ' · ', P.c, ' · ', P.dT], { ms: 0, soluk: false });
    await k2.ekle([['ısı', S.isi], ' aynı: ', P.dT, ' = ?'], { ms: 0, soluk: false });
    await belir(c, k2.g, 400);
    await c.choice({
      tag: 'Birlikte çöz', q: 'ΔT kaç °C olur?',
      options: ['9', '4,5', '18'], answer: 1,
      hints: ['Her iki yanda m · c var; sadeleşince 2 · ΔT = 9 kalır.', '', 'Kütle iki katıysa ΔT yarısı olmalı.'],
      right: 'Evet. 2 · ΔT = 9 olduğundan ΔT = 4,5 °C.',
    });
    k2.degistir(2, [P.dT, ' = 9 / 2 = 4,5 °C']);
    await c.say('Model kütle için de uyuşuyor: 2 m için ΔT yarıya iniyor.', { speak: 'Model kütle için de uyuşuyor: iki me için delta T yarıya iniyor.' });

    // Sor: tek başına
    c.clearSay();
    await belir(c, k2.g, 300, 0); k2.g.remove();
    const k3 = cozumKarti(c, svg, { x: 140, y: 180, w: 720 });
    gizle(k3.g);
    await k3.ekle(['aynı kap, aynı yağ'], { ms: 0, soluk: false });
    await k3.ekle(['1. ısıtıcı, 15 dk: ', P.dT, ' = 21 °C'], { ms: 0, soluk: false });
    await k3.ekle(['2. ısıtıcı, 15 dk: ', P.dT, ' = 9 °C'], { ms: 0, soluk: false });
    await belir(c, k3.g, 400);
    await c.choice({
      tag: 'Sor', q: 'Birinci ısıtıcı on beş dakikada, ikincinin aynı sürede verdiği ısının kaç katını verdi?',
      options: ['3/7 katını', '2 katını', '7/3 katını'], answer: 2,
      hints: ['Büyük ΔT’yi küçüğüne böl.', 'Kütle ve öz ısı aynı; ısı oranı ΔT oranına eşit olur.', ''],
      right: 'Evet. Kütle ve öz ısı aynı; 21 / 9 = 7 / 3.',
    });
    await belir(c, k3.g, 300, 0); k3.g.remove();
    const cb = cubukCifti(c, svg, { adX: 130, x0: 300, y: [270, 350], adlar: ['ikinci', 'birinci'], renk: S.isi });
    cb.deger(0, 'm · c · 9'); cb.deger(1, 'm · c · 21');
    gizle(cb.g);
    await par(c.say('Isılar ΔT gibi orantılı: 21 / 9 = 7 / 3.', { speak: 'Isılar delta T gibi orantılı: yirmi bir bölü dokuz, yani yedi bölü üç.' }), (async () => {
      await belir(c, cb.g, 250);
      await cb.git(c, [90, 210], 600);
    })());
  }

  /* ---- 8. Hangi düzenek hangi ilişkiyi arıyor? ---- */
  const KARTLAR = [
    { ust: 'Özdeş bardaklarda m ve 2 m kütleli limonata,', alt: 'buzdolabının aynı rafında.', kutu: 1,
      neden: 'Evet. Yalnızca kütle değişiyor.', ipucu: 'Bu düzenekte neyi değiştirdik?' },
    { ust: 'Özdeş iki kapta eşit kütlede su ve zeytinyağı,', alt: 'özdeş ısıtıcılar.', kutu: 2,
      neden: 'Evet. Madde değişince öz ısı değişir.', ipucu: 'Değişen şey madde; maddeye ait özellik hangisi?' },
    { ust: 'Özdeş iki kapta eşit kütlede zeytinyağı,', alt: 'birim sürede farklı ısı veren iki ısıtıcı.', kutu: 0,
      neden: 'Evet. Yalnızca verilen ısı değişiyor.', ipucu: 'İki ısıtıcının farkı ne?' },
    { ust: 'Özdeş iki kapta eşit kütlede su;', alt: 'biri 5, öteki 10 dakika ısıtılıyor.', kutu: 0,
      neden: 'Evet. Süre arttıkça verilen ısı artıyor.', ipucu: 'Süre değişince değişen şey ne?' },
    { ust: 'Özdeş iki kapta 100 g ve 300 g su,', alt: 'özdeş ısıtıcıda eşit süre.', kutu: 1,
      neden: 'Evet. Yalnızca kütle değişiyor.', ipucu: 'Hangi nicelik 100 g ve 300 g?' },
  ];
  async function siniflama(c) {
    const svg = c.svg(1000, 562);
    const KUTU = [{ x: 60, ad: 'Isı – ΔT', renk: S.isi }, { x: 360, ad: 'Kütle – ΔT', renk: S.kutle }, { x: 660, ad: 'Öz ısı – ΔT', renk: S.yazi }], sayac = [0, 0, 0];
    const ust = c.S('g', {}, svg);
    KUTU.forEach((k) => { kutu(c, ust, k.x, 70, 280, 190, { rx: 14 }); yazi(c, ust, k.x + 140, 122, k.ad, { size: 32, kalin: 700, renk: k.renk }); });
    const sahne = c.S('g', {}, svg);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 150, 330, 700, 130, { rx: 14 });
      yazi(c, kart, 500, 385, k.ust, { size: 26, kalin: 600 });
      yazi(c, kart, 500, 425, k.alt, { size: 26, kalin: 600 });
      gizle(kart);
      await belir(c, kart, 350);
    };
    /* Kart yerinde küçülüp söner; kutusuna bir nokta konur (yazı bütçesi için ad yazılmaz). */
    const yerlestir = async (k) => {
      const el = kart, kb = KUTU[k.kutu], nx = kb.x + 50 + sayac[k.kutu] * 50;
      sayac[k.kutu] += 1;
      await c.tween(400, (e) => { el.setAttribute('transform', `translate(${500 * 0.4 * e},${395 * 0.4 * e}) scale(${1 - 0.4 * e})`); el.style.opacity = 1 - e; }, ease.in);
      el.remove();
      const nk = c.S('circle', { cx: nx, cy: 215, r: 14, fill: kb.renk, 'fill-opacity': 0.8 }, ust);
      gizle(nk);
      await belir(c, nk, 300);
    };
    gizle(ust);

    await par(c.say('Her düzenekte bir ilişki aranıyor.'), belir(c, ust, 400));
    await c.say('Hangi şey değişiyorsa ilişki onunla ΔT arasındadır.', { speak: 'Hangi şey değişiyorsa ilişki onunla delta T arasındadır.' });
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: KUTU.map((k) => k.ad), kartlar: KARTLAR,
      soru: () => 'Bu düzenekte hangi ilişki araştırılıyor?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });
    const ozet = [
      yazi(c, ust, 200, 340, 'ısıtıcı ya da süre', { size: 26, kalin: 600, renk: S.isi }),
      yazi(c, ust, 500, 340, 'kütle', { size: 26, kalin: 600, renk: S.kutle }),
      yazi(c, ust, 800, 340, 'madde', { size: 26, kalin: 600 }),
    ];
    const ozetBas = yazi(c, ust, 500, 300, 'değişen şey:', { size: 26, kalin: 600, renk: S.gri });
    gizle(...ozet, ozetBas);
    await par(c.say('Her ilişkide yalnızca tek şey değişir.'), belir(c, [ozetBas, ...ozet], 450));
  }

  Ders.start({
    id: 'enerji-b3', kicker: 'Konu B · Isının hesabı', title: 'Deneyle modele: ısı, kütle, madde, sıcaklık farkı', accent: '#ff8a5b', back: 'index.html',
    intro: {
      title: 'Deneyle modele: ısı, kütle, madde, sıcaklık farkı',
      hook: 'Aynı ocakta bir bardak su mu, bir tencere su mu önce kaynar; peki iki katı su iki katı süre mi ister?',
      button: 'Derse başla ›',
    },
    goals: ['Deneyde her seferinde yalnızca bir değişkeni değiştirir.', 'Sıcaklık değişiminin ısıyla, kütleyle ve öz ısıyla ilişkisini verilerden çıkarır.', 'Q = C · ΔT ve C = m · c bağıntılarını birleştirerek Q = m · c · ΔT modeline ulaşır.', 'Modeli deney verisiyle sınar.'],
    scenes: [
      { title: 'Hatırla', goal: 'Isı sığasının kütleyle büyüdüğünü ve ısının birimini hatırla.', run: hatirla },
      { title: 'Tek değişken kuralı', goal: 'Bir etkiyi görmek için her seferinde yalnızca bir şeyi değiştir.', run: tekDegisken },
      { title: 'Birinci deney: ısı değişince', goal: 'Sıcaklık değişiminin verilen ısıyla doğru orantılı olduğunu gör.', run: birinciDeney },
      { title: 'İkinci deney: kütle değişince', goal: 'Eşit ısıda sıcaklık değişiminin kütleyle ters orantılı olduğunu gör.', run: ikinciDeney },
      { title: 'Üçüncü deney: madde değişince', goal: 'Eşit ısıda sıcaklık değişiminin öz ısıyla ters orantılı olduğunu gör.', run: ucuncuDeney },
      { title: 'Üç ilişki, tek model', goal: 'Üç ilişkiyi Q = m · c · ΔT modelinde birleştir.', run: model },
      { title: 'Model deneyle uyuşuyor mu?', goal: 'Modeli deney verisiyle sına ve onunla hesap yap.', run: sinama },
      { title: 'Hangi düzenek hangi ilişkiyi arıyor?', goal: 'Düzeneğin hangi ilişkiyi araştırdığını belirle.', run: siniflama },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Ela özdeş iki kaba eşit kütlede su koyuyor; özdeş ısıtıcılarla birini 5, ötekini 10 dakika ısıtıyor. 10 dakika ısıtılan kapta ΔT, ötekinin kaç katıdır?',
        options: ['Yarısı', '2 katı', 'Aynı'], answer: 1,
        why: ['Daha uzun süre ısıtılan kap daha çok ısı alır; ΔT azalmaz.', 'Isı iki katına çıkınca ΔT de iki katına çıkar; ΔT ısıyla doğru orantılıdır.', 'Isıtma süresi farklı olduğundan verilen ısı da farklıdır; ΔT aynı olamaz.'], scene: 2 },
      { q: 'Aynı ısıtıcıyla aynı süre ısıtılan, aynı maddeden 3 m kütleli cismin ΔT’si m kütleli olanın kaç katıdır?',
        options: ['3 katı', 'Aynı', 'Üçte biri'], answer: 2,
        why: ['Kütle arttıkça ΔT azalır; üç katına çıkmaz.', 'Kütle farklı olduğundan ΔT aynı kalmaz.', 'Eşit ısıda ΔT, kütleyle ters orantılıdır; kütle 3 katına çıkınca ΔT üçte birine iner.'], scene: 3 },
      { q: 'Eşit kütlede su ve zeytinyağına eşit ısı verildi; zeytinyağı daha çok ısındı. Neden?',
        options: ['Zeytinyağının öz ısısı suyunkinden küçüktür', 'Zeytinyağına daha çok ısı verildi', 'Zeytinyağının kütlesi daha küçüktü'], answer: 0,
        why: ['Eşit ısıda öz ısısı küçük olan madde daha çok ısınır.', 'Soruda ısının eşit olduğu söyleniyor.', 'Soruda kütlelerin eşit olduğu söyleniyor.'], scene: 4 },
      { q: 'Q = m · c · ΔT bağıntısında c neyi gösterir?',
        options: ['Isı sığasını', 'Sıcaklık değişimini', 'Öz ısıyı'], answer: 2,
        why: ['Isı sığası C ile gösterilir ve C = m · c yazılır.', 'Sıcaklık değişimi ΔT ile gösterilir.', 'c, maddenin öz ısısıdır.'], scene: 5 },
      { q: 'Ela, ısının sıcaklık değişimine etkisini ölçecek. Hangi kurgu uygundur?',
        options: ['Kütle ve ısı birlikte farklı', 'Kütle ve madde aynı; yalnızca verilen ısı farklı', 'Madde ve ısı birlikte farklı'], answer: 1,
        why: ['İki şey birden değişirse hangisinin etkisi olduğu anlaşılmaz.', 'Her deneyde yalnızca bir değişken değişir; burada o değişken ısıdır.', 'Madde ve ısı birlikte değişirse etkiler birbirine karışır.'], scene: 1 },
    ],
    summary: ['ΔT, verilen ısıyla doğru; kütleyle ve öz ısıyla ters orantılıdır.', 'Isı sığası C = m · c; verilen ısı Q = C · ΔT.', '<b>Q = m · c · ΔT</b>'],
    nextLesson: { href: 'b4-modelle-hesap.html', label: 'Sonraki: Modelle hesap ›' },
  });
})();
