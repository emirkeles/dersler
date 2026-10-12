/* P1 · PİLOT · FİZ.9.3.4 c · İzometrik figürün (dersler/torricelli-sekil.js) ders motoruna bağlanışını sınar.
   Tam ders değildir: C2'nin iki sahnelik kesiti. Sayılar ders kitabından (s. 164): 1 m boru, 76 cm, d = 13.600 kg/m³, g = 9,8 m/s².
   Renk rolleri: cıva sütununun boyu = SUTUN (sarı), açık hava basıncı = HAVA (mavi).
   Figür kendi başına hareket etmez; her hareket c.tween ya da sürgü ile f.poz(mm) çağrılarak verilir. */
(() => {
  'use strict';
  const { lerp, ease } = Ders;
  const T = window.TORRICELLI, K = T.sabit;
  const SUTUN = 'var(--c5)', HAVA = 'var(--c1)', YAZI = 'var(--text)', SOLUK = 'var(--muted)';
  const tr = (v, n = 1) => v.toFixed(n).replace('.', ',');

  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'start', 'font-size': o.size || 26, 'font-weight': o.kalin || 600,
    style: 'fill:' + (o.renk || YAZI), text: metin,
  }, p);
  const belir = (c, el, ms = 350) => { const els = [el].flat(); els.forEach((e) => { e.style.opacity = 0; }); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = e; })); };

  /* Tahta düzeni: figür solda, yazı sağda. */
  function kur(c) {
    const svg = c.svg(1000, 562);
    const f = T.kur(c, svg, { x: 64, y: 8, h: 546 });
    return { svg, f };
  }

  /* Sütunun boyunu gösteren ölçü: kaptaki yüzeyden sütunun tepesine. g.guncelle() figürün o anki pozunu okur. */
  function olcu(c, svg, f) {
    const g = c.S('g', {}, svg);
    const cizgi = (kalin = 3) => c.S('line', { stroke: SUTUN, 'stroke-width': kalin, 'stroke-linecap': 'round' }, g);
    const gov = cizgi(), ust = cizgi(), alt = cizgi();
    const et = yazi(c, g, 0, 0, '', { size: 28, renk: SUTUN });
    g.guncelle = (h) => {
      const [x, y1] = f.nokta('tepe'), y0 = f.nokta('seviye')[1], X = x + 26;
      gov.setAttribute('x1', X); gov.setAttribute('x2', X); gov.setAttribute('y1', y0); gov.setAttribute('y2', y1);
      [[ust, y1], [alt, y0]].forEach(([l, y]) => { l.setAttribute('x1', X - 9); l.setAttribute('x2', X + 9); l.setAttribute('y1', y); l.setAttribute('y2', y); });
      et.setAttribute('x', X + 18); et.setAttribute('y', (y0 + y1) / 2 + 9); et.textContent = tr(h / 10) + ' cm';
    };
    return g;
  }

  /* ---- Sahne 1 · Düzenek: dolu boru ters daldırılır, cıva 76 cm'de durur ---- */
  async function duzenek(c) {
    const { svg, f } = kur(c);
    f.poz(K.HMAX);
    await belir(c, f.el, 500);
    await c.say('Bir ucu kapalı, <b>1 metrelik</b> cam boru cıvayla doldurulur.', { speak: 'Bir ucu kapalı, bir metrelik cam boru cıvayla doldurulur.' });
    await c.say('Boru, cıva dolu bir kaba <b>ters</b> daldırılır.', { speak: 'Boru, cıva dolu bir kaba ters daldırılır.' });
    await c.say('Borunun ağzı kabın içinde <b>açıktır</b>; cıva kaba akabilir.', { speak: 'Borunun ağzı kabın içinde açıktır; cıva kaba akabilir.' });
    await c.choice({
      tag: 'Tahmin et', q: 'Boru bırakılınca içindeki cıvaya ne olur?',
      options: ['Hepsi kaba boşalır', 'Biraz iner, sonra durur', 'Hiç inmez'], answer: 1,
      hints: ['Boşalmaz: kaptaki cıvanın yüzeyine bir şey bastırıyor.', '', 'İner: boru 1 metre, sütun o kadar uzun kalamaz.'],
      right: 'Evet. Cıva bir miktar iner ve durur.',
    });
    await c.tween(2200, (e) => { f.poz(lerp(K.HMAX, K.H0, e)); }, ease.out);
    const bosluk = yazi(c, svg, f.nokta('tepe')[0] + 26, f.nokta('tepe')[1] - 38, 'boşluk', { size: 24, renk: SOLUK, kalin: 500 });
    await belir(c, bosluk);
    await c.say('Cıva biraz iner ve durur; üstünde <b>boşluk</b> kalır.', { speak: 'Cıva biraz iner ve durur; üstünde boşluk kalır.' });
    const o = olcu(c, svg, f); o.guncelle(K.H0);
    await belir(c, o);
    await c.say('Kaptaki yüzeyden sütunun tepesine <b>76 cm</b> ölçülür.', { speak: 'Kaptaki yüzeyden sütunun tepesine yetmiş altı santimetre ölçülür.' });
    const ad = yazi(c, svg, 500, 250, 'Torricelli deneyi', { size: 34 });
    const kosul = yazi(c, svg, 500, 296, 'deniz seviyesi, 0 °C', { size: 26, renk: SOLUK, kalin: 500 });
    await belir(c, [ad, kosul]);
    await c.say('Bu, <b>Torricelli deneyidir</b>: deniz seviyesinde, 0 °C sıcaklıkta.', { speak: 'Bu, Torricelli deneyidir: deniz seviyesinde, sıfır derece sıcaklıkta.' });
    c.note('<b>Torricelli deneyi</b><br>Deniz seviyesinde cıva sütunu 76 cm', 'Açık hava basıncı', 'torricelli');
  }

  /* ---- Sahne 2 · Denge: açık hava bastırır, sütun dengeler; basınç değişince sütun değişir ---- */
  async function denge(c) {
    const { svg, f } = kur(c);
    f.poz(K.H0);
    const kadraj = (a, b, ms = 900) => c.tween(ms, (e) => f.bak(a.map((v, i) => lerp(v, b[i], e))), ease.inOut);

    // önce kaba yaklaş: açık hava, kaptaki yüzeye inen iki okla gösterilir
    await c.wait(300);
    await kadraj(T.kadraj.tum, T.kadraj.kap);
    const [sx, sy] = f.nokta('seviye');
    const hava = c.S('g', {}, svg);
    [-74, 78].forEach((dx) => {
      c.S('line', { x1: sx + dx, y1: sy - 74, x2: sx + dx, y2: sy - 22, stroke: HAVA, 'stroke-width': 4, 'stroke-linecap': 'round' }, hava);
      c.S('path', { d: `M${sx + dx - 9} ${sy - 30}L${sx + dx} ${sy - 14}L${sx + dx + 9} ${sy - 30}Z`, fill: HAVA }, hava);
    });
    yazi(c, hava, sx + 100, sy - 44, 'P₀', { size: 30, renk: HAVA });
    await belir(c, hava);
    await c.say('Açık hava, kaptaki cıvanın yüzeyine <b>bastırır</b>.', { speak: 'Açık hava, kaptaki cıvanın yüzeyine bastırır.' });
    await c.say('Sütunun ağırlığı bu basıncı <b>dengeler</b>; cıva bu yüzden durur.', { speak: 'Sütunun ağırlığı bu basıncı dengeler; cıva bu yüzden durur.' });
    await c.tween(300, (e) => { hava.style.opacity = 1 - e; });
    hava.remove();
    await kadraj(T.kadraj.kap, T.kadraj.tum);
    const o = olcu(c, svg, f); o.guncelle(K.H0);
    await belir(c, o);

    const X = 500;
    const s1 = yazi(c, svg, X, 150, 'P₀ = h · d · g', { size: 34 });
    const s2 = yazi(c, svg, X, 200, '= 0,76 · 13.600 · 9,8', { size: 28, kalin: 500 });
    const s3 = yazi(c, svg, X, 246, '≈ 101.300 Pa = 1 atm', { size: 28, renk: HAVA });
    await belir(c, s1);
    await c.say('Sütunun basıncı <b>h · d · g</b> ile hesaplanır.', { speak: 'Sütunun basıncı; yükseklik, yoğunluk ve yer çekimi ivmesinin çarpımıyla hesaplanır.' });
    await belir(c, [s2, s3]);
    await c.say('Sonuç yaklaşık <b>101.300 Pa</b>; buna <b>1 atmosfer</b> denir.', { speak: 'Sonuç yaklaşık yüz bir bin üç yüz paskal; buna bir atmosfer denir.' });
    c.note('<b>P₀ = h · d · g</b><br>0,76 · 13.600 · 9,8 ≈ 101.300 Pa = 1 atm', 'Atmosfer birimi', 'atm');

    await c.choice({
      tag: 'Sıra sende', q: 'Açık hava basıncı azalırsa cıva sütunu ne olur?',
      options: ['Uzar', 'Kısalır', 'Değişmez'], answer: 1,
      hints: ['Uzaması için yüzeye daha çok bastırılması gerekir.', '', 'Sütunu ayakta tutan açık havadır; o azalınca sütun da değişir.'],
      right: 'Evet. Daha az basınç, daha kısa bir sütunu dengeler.',
    });

    // dene: basınç sürgüsü figürü doğrudan sürer
    [s2, s3].forEach((e) => { e.style.opacity = 0; });
    const okuma = yazi(c, svg, X, 330, '', { size: 30, renk: SUTUN });
    const basinc = yazi(c, svg, X, 376, '', { size: 30, renk: HAVA });
    let son = 0;
    const ciz = (kpa) => {
      const h = T.sutun(kpa * 1000); son = kpa;
      f.poz(h); o.guncelle(h);
      okuma.textContent = 'h = ' + tr(h / 10) + ' cm';
      basinc.textContent = 'P₀ = ' + tr(kpa) + ' kPa';
    };
    const ATM = Math.round(T.basinc(K.H0) / 100) / 10;
    ciz(ATM);
    c.say('Basıncı değiştir; sütunun boyunu çubuktan oku.', { noWait: true });
    const sl = c.slider({ label: 'Açık hava basıncı', min: 60, max: 104, step: 0.5, value: ATM, fmt: (v) => tr(v) + ' kPa', onInput: ciz });
    await c.cont('Devam ›');
    sl.remove();
    const birakilan = son;
    await c.tween(900, (e) => ciz(lerp(birakilan, ATM, e)), ease.inOut);
    [okuma, basinc].forEach((e) => { e.style.opacity = 0; });
    [s2, s3].forEach((e) => { e.style.opacity = 1; });
    await c.say('Sütunun boyu, açık hava basıncının <b>ölçüsüdür</b>.', { speak: 'Sütunun boyu, açık hava basıncının ölçüsüdür.' });
  }

  Ders.start({
    id: 'akiskanlar-p1', kicker: 'Pilot · İzometrik figür', title: 'Torricelli havayı nasıl tarttı?', accent: '#3cc8e8', back: '../../index.html#fizik',
    intro: { title: 'Torricelli havayı nasıl tarttı?', hook: 'Hava görünmez, tartıya da konmaz. Torricelli onu bir cam boru ve cıvayla tarttı.', button: 'Derse başla ›' },
    goals: ['Torricelli deneyinin düzeneğini tanı', 'Sütunun neden 76 cm’de durduğunu açıkla'],
    scenes: [
      { title: 'Dolu boru, ters daldırılır', goal: 'Cıvanın nerede durduğunu gör.', run: duzenek },
      { title: 'Hava bastırır, sütun dengeler', goal: 'Sütunun boyunu açık hava basıncına bağla.', run: denge },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Torricelli deneyinde borudaki cıva neden tamamen kaba boşalmaz?', options: ['Cam boru cıvayı tutar', 'Açık hava kaptaki cıvanın yüzeyine bastırır', 'Borunun üstündeki boşluk cıvayı çeker'], answer: 1,
        why: ['Cam cıvayı tutmaz; borunun ağzı kabın içinde açıktır.', 'Açık havanın yüzeye yaptığı basınç, sütunun basıncını dengeler.', 'Boşluk çekmez; sütunu aşağıdan açık hava basıncı tutar.'], scene: 1 },
      { q: 'Deniz seviyesinde 76 cm olan cıva sütunu, açık hava basıncının daha az olduğu bir yerde nasıl olur?', options: ['76 cm’den kısa', '76 cm’den uzun', 'Yine 76 cm'], answer: 0,
        why: ['Daha az basınç, daha kısa bir sütunu dengeler.', 'Sütunun uzaması için açık hava basıncının artması gerekir.', 'Sütunun boyu açık hava basıncıyla doğru orantılıdır; basınç değişince o da değişir.'], scene: 1 },
    ],
    summary: ['<b>Açık hava bastırır, cıva sütunu dengeler.</b>', 'Deniz seviyesinde sütun 76 cm: P₀ = h · d · g ≈ 101.300 Pa = 1 atm.', 'Açık hava basıncı azalınca sütun kısalır.'],
  });
})();
