/* P2 · PİLOT · FİZ.9.3.6 a, b · İzometrik Arşimet düzeneğinin (dersler/arsimet-sekil.js) ders motoruna bağlanışı.
   Tam ders değildir: D2'nin iki sahnelik kesiti. Model ders kitabından (9. sınıf fizik, s. 180): F_k = V_batan · d_s · g; g = 9,8 m/s² (s. 173).
   Kitap hazır düzenek ve ölçüm vermez; ölçüler örnek veridir ve figürün modelinden hesaplanır (pilot/kaldirma-kuvveti/PLAN.md, bölüm 3):
   alüminyum silindir, yarıçap 20 mm, boy 80 mm, 2,66 N; yarısı batık 0,49 N, tümü batık 0,99 N.
   Renk rolleri: dinamometredeki azalma (kaldırma kuvveti) = AZALMA (sarı), taşan suyun ağırlığı = SU (mavi).
   Figür kendi başına hareket etmez; her hareket c.tween ya da sürgü ile f.poz(mm) çağrılarak verilir. */
(() => {
  'use strict';
  const { lerp, ease } = Ders;
  const A = window.ARSIMET, K = A.sabit;
  const AZALMA = 'var(--c5)', SU = 'var(--c1)', YAZI = 'var(--text)', SOLUK = 'var(--muted)';
  const tr = (v, n = 2) => v.toFixed(n).replace('.', ',');
  const YARI = K.tamBatik / 2;   // silindirin yarısı suda

  const yazi = (c, p, x, y, metin, o = {}) => c.S('text', {
    x, y, 'text-anchor': o.hiza || 'start', 'font-size': o.size || 26, 'font-weight': o.kalin || 600,
    style: 'fill:' + (o.renk || YAZI), text: metin,
  }, p);
  const belir = (c, el, ms = 350) => { const els = [el].flat(); els.forEach((e) => { e.style.opacity = 0; }); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = e; })); };

  /* Tahta düzeni: figür solda, okumalar ve yazı sağda. */
  const X = 556;
  function kur(c) {
    const svg = c.svg(1000, 562);
    const f = A.kur(c, svg, { x: 24, y: 8, h: 546 });
    return { svg, f };
  }
  const kadraj = (c, f, a, b, ms = 900) => c.tween(ms, (e) => f.bak(a.map((v, i) => lerp(v, b[i], e))), ease.inOut);

  /* Sağda üç okuma, figürün yanında iki aletin adı. g.guncelle() figürün o anki hâlini okur. */
  function okumalar(c, svg, f) {
    const g = c.S('g', {}, svg);
    const satir = (y, ad, renk) => {
      yazi(c, g, X, y, ad, { size: 26, renk: SOLUK, kalin: 500 });
      return yazi(c, g, X + 180, y, '', { size: 30, renk });
    };
    const din = satir(96, 'dinamometre', YAZI), az = satir(142, 'azalma', AZALMA), su = satir(188, 'taşan su', SU);
    const adDin = yazi(c, g, 0, 0, 'dinamometre', { size: 24, renk: SOLUK, kalin: 500 });
    const [tx, ty] = f.nokta('terazi');
    yazi(c, g, tx + 14, ty + 8, 'terazi', { size: 24, renk: SOLUK, kalin: 500 });
    g.guncelle = () => {
      const o = f.oku(), [x, y] = f.nokta('dinamometre');
      din.textContent = tr(o.dinamometre) + ' N'; az.textContent = tr(o.azalma) + ' N'; su.textContent = tr(o.tasanSu) + ' N';
      adDin.setAttribute('x', x + 14); adDin.setAttribute('y', y + 8);
    };
    g.guncelle();
    return g;
  }
  /* Silindiri verilen indirmeye götürür; okumalar her karede figürden yenilenir. */
  async function indir(c, f, o, hedef, ms) {
    const d0 = f.oku().d;
    await c.tween(ms, (e) => { f.poz(lerp(d0, hedef, e)); o.guncelle(); }, ease.inOut);
    f.dur();
  }

  /* ---- Sahne 1 · Düzenek: dinamometre ve terazi aynı anda ölçer; silindirin yarısı suya iner ---- */
  async function duzenek(c) {
    const { svg, f } = kur(c);
    await belir(c, f.el, 500);
    await c.say('Alüminyum bir silindir, yaylı bir <b>dinamometreye</b> asılı.', { speak: 'Alüminyum bir silindir, yaylı bir dinamometreye asılı.' });
    await kadraj(c, f, A.kadraj.tum, A.kadraj.dinamometre);
    await c.say('Havada dinamometre silindirin ağırlığını gösterir: <b>2,66 N</b>.', { speak: 'Havada dinamometre silindirin ağırlığını gösterir: iki virgül altmış altı newton.' });
    await kadraj(c, f, A.kadraj.dinamometre, A.kadraj.olcum);
    await c.say('Altındaki kap, musluğuna kadar <b>suyla dolu</b>.', { speak: 'Altındaki kap, musluğuna kadar suyla dolu.' });
    await c.say('Taşan su, musluktan terazinin üstündeki kaba akar.', { speak: 'Taşan su, musluktan terazinin üstündeki kaba akar.' });
    await c.say('Terazi, kaba akan suyun <b>ağırlığını</b> gösterir.', { speak: 'Terazi, kaba akan suyun ağırlığını gösterir.' });
    await kadraj(c, f, A.kadraj.olcum, A.kadraj.tum);
    const o = okumalar(c, svg, f);
    await belir(c, o);
    await c.choice({
      tag: 'Tahmin et', q: 'Silindir suya indirilince dinamometrenin gösterdiği değer ne olur?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 1,
      hints: ['Artması için silindirin aşağı doğru daha çok çekilmesi gerekir; su onu yukarı iter.', '', 'Su silindire bir kuvvet uygular; yay bunu duyar.'],
      right: 'Evet. Su silindiri yukarı iter, yay daha az gerilir.',
    });
    await indir(c, f, o, YARI, 2800);
    await c.say('Silindirin yarısı suda; dinamometre <b>2,17 N</b> gösteriyor.', { speak: 'Silindirin yarısı suda; dinamometre iki virgül on yedi newton gösteriyor.' });
    await c.say('Gösterge <b class="t5">0,49 N</b> azaldı: su silindiri bu kadar itiyor.', { speak: 'Gösterge sıfır virgül kırk dokuz newton azaldı: su silindiri bu kadar itiyor.' });
    await c.say('Suyun cisme uyguladığı bu itmeye <b>kaldırma kuvveti</b> denir.', { speak: 'Suyun cisme uyguladığı bu itmeye kaldırma kuvveti denir.' });
    await c.say('Terazide de aynı sayı var: taşan su <b class="t1">0,49 N</b>.', { speak: 'Terazide de aynı sayı var: taşan su sıfır virgül kırk dokuz newton.' });
    c.note('<b>Azalma = taşan suyun ağırlığı</b><br>Silindirin yarısı suda: 0,49 N ve 0,49 N', 'İki ölçüm', 'arsimet-olcum');
  }

  /* ---- Sahne 2 · İlke: tümü batınca iki ölçüm yine eşit; daha derinde değişmez ---- */
  async function ilke(c) {
    const { svg, f } = kur(c);
    f.poz(YARI); f.dur();
    const o = okumalar(c, svg, f);
    await c.wait(300);
    await c.say('Silindirin yarısı sudayken iki ölçüm de <b>0,49 N</b> idi.', { speak: 'Silindirin yarısı sudayken iki ölçüm de sıfır virgül kırk dokuz newton idi.' });
    await c.say('Şimdi silindiri tümüyle suya indirelim.', { speak: 'Şimdi silindiri tümüyle suya indirelim.' });
    await indir(c, f, o, K.tamBatik, 2800);
    await c.say('Azalma <b class="t5">0,99 N</b>, taşan su yine aynı: <b class="t1">0,99 N</b>.', { speak: 'Azalma sıfır virgül doksan dokuz newton, taşan su yine aynı: sıfır virgül doksan dokuz newton.' });
    const e1 = yazi(c, svg, X, 262, 'kaldırma kuvveti', { size: 30, renk: AZALMA });
    const e2 = yazi(c, svg, X, 304, '= taşan suyun ağırlığı', { size: 30, renk: SU });
    await belir(c, [e1, e2]);
    await c.say('Kaldırma kuvveti, taşan suyun ağırlığına <b>eşittir</b>.', { speak: 'Kaldırma kuvveti, taşan suyun ağırlığına eşittir.' });
    await c.say('Buna <b>Arşimet İlkesi</b> denir.', { speak: 'Buna Arşimet İlkesi denir.' });
    const model = c.S('text', { x: X, y: 372, 'font-size': 32, 'font-weight': 600, style: 'fill:' + YAZI, math: 'F_{k} = V_{batan} · d_{s} · g' }, svg);
    await belir(c, model);
    await c.say('Taşan suyun ağırlığı: batan hacim, sıvının yoğunluğu ve g çarpımı.', { speak: 'Taşan suyun ağırlığı: batan hacim, sıvının yoğunluğu ve yer çekimi ivmesinin çarpımı.' });
    await c.say('Batan hacim artınca kaldırma kuvveti de <b>aynı oranda</b> artar.', { speak: 'Batan hacim artınca kaldırma kuvveti de aynı oranda artar.' });
    c.note('<b>F<sub>k</sub> = V<sub>batan</sub> · d<sub>s</sub> · g</b><br>Kaldırma kuvveti = taşan sıvının ağırlığı', 'Arşimet İlkesi', 'arsimet');

    await c.choice({
      tag: 'Sıra sende', q: 'Silindir tümüyle suyun içindeyken daha derine indirilirse kaldırma kuvveti ne olur?',
      options: ['Artar', 'Azalır', 'Değişmez'], answer: 2,
      hints: ['Artması için daha çok su taşmalı; silindirin tümü zaten suda.', 'Azalması için batan hacmin küçülmesi gerekir; silindir hâlâ tümüyle suda.', ''],
      right: 'Evet. Batan hacim değişmedi, taşan su da değişmedi.',
    });
    await indir(c, f, o, K.derin, 2000);
    await c.say('Daha derinde su taşmadı; iki ölçüm de <b>0,99 N</b> kaldı.', { speak: 'Daha derinde su taşmadı; iki ölçüm de sıfır virgül doksan dokuz newton kaldı.' });

    // dene: düzenek sıfırlanır, indirme sürgüsü figürü doğrudan sürer
    await c.tween(300, (e) => { [e1, e2, model].forEach((x) => { x.style.opacity = 1 - e; }); });
    [e1, e2, model].forEach((x) => x.remove());
    await indir(c, f, o, 0, 2000);
    await c.tween(1200, (e) => { f.sifir(e); o.guncelle(); }, ease.inOut);
    const uyari = yazi(c, svg, X, 440, 'taşan su kaba geri dönmez', { size: 24, renk: SOLUK, kalin: 500 });
    await belir(c, uyari);
    c.say('Silindiri indir; azalma ile taşan suyu karşılaştır.', { noWait: true });
    const sl = c.slider({ label: 'İndirme', min: 0, max: K.enDerin, step: 1, value: 0, fmt: (v) => v + ' mm', onInput: (v) => { f.poz(v); f.dur(); o.guncelle(); } });
    await c.cont('Devam ›');
    sl.remove();
    await c.say('Cisim ne kadar suyu yerinden ederse o kadar <b>kaldırılır</b>.', { speak: 'Cisim ne kadar suyu yerinden ederse o kadar kaldırılır.' });
  }

  Ders.start({
    id: 'akiskanlar-p2', kicker: 'Pilot · İzometrik figür', title: 'Kaldırma kuvveti, taşan suyun ağırlığı kadardır', accent: '#3cc8e8', back: '../../index.html#fizik',
    intro: { title: 'Kaldırma kuvveti, taşan suyun ağırlığı kadardır', hook: 'Ağzına kadar dolu küvete girince su taşar, sen de hafiflersin. Bu ikisi aynı sayıyla ölçülür.', button: 'Derse başla ›' },
    goals: ['Dinamometredeki azalmayı kaldırma kuvveti olarak oku', 'Kaldırma kuvvetini taşan suyun ağırlığına bağla'],
    scenes: [
      { title: 'İki ölçüm, tek düzenek', goal: 'Dinamometre ile terazinin neyi ölçtüğünü gör.', run: duzenek },
      { title: 'Arşimet İlkesi', goal: 'Kaldırma kuvvetini taşan suyun ağırlığına bağla.', run: ilke },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Musluğuna kadar dolu bir kaba indirilen cisim, ağırlığı 0,30 N olan su taşırıyor. Cisme etki eden kaldırma kuvveti kaç newtondur?', options: ['0,15 N', '0,30 N', '0,60 N'], answer: 1,
        why: ['Kaldırma kuvveti taşan suyun ağırlığının yarısı değil, kendisidir.', 'Kaldırma kuvveti, taşan suyun ağırlığına eşittir.', 'Kaldırma kuvveti taşan suyun ağırlığının iki katı değil, kendisidir.'], scene: 1 },
      { q: 'Tümüyle suya batmış bir silindir daha derine indiriliyor. Dinamometrenin gösterdiği değer nasıl değişir?', options: ['Azalır', 'Artar', 'Değişmez'], answer: 2,
        why: ['Azalması için kaldırma kuvvetinin artması gerekir; batan hacim aynı kaldı.', 'Artması için kaldırma kuvvetinin azalması gerekir; silindir hâlâ tümüyle suda.', 'Batan hacim değişmediği için kaldırma kuvveti de dinamometre de değişmez.'], scene: 1 },
    ],
    summary: ['<b>Kaldırma kuvveti = taşan sıvının ağırlığı</b> (Arşimet İlkesi).', 'F<sub>k</sub> = V<sub>batan</sub> · d<sub>s</sub> · g: batan hacim artınca kaldırma kuvveti aynı oranda artar.', 'Cisim tümüyle batınca daha derine inmek kaldırma kuvvetini değiştirmez.'],
  });
})();
