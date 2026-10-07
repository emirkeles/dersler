/* B6 — Mutlak değerli fonksiyonun parçalı gösterimi
   m(x) = ±|ax ± b| ± c iki doğrusal fonksiyonun tek ifadede birleşmiş hâlidir; parçalar içteki doğrunun sıfırında ayrılır.
   Senaryo: plan/matematik/nicelikler-ve-degisimler/senaryolar/B-mutlak-deger-fonksiyonu.md
   Renkler: grafik turkuaz; mutlak değerin aynen çıktığı parça mavi, eksiyle çıktığı parça turuncu; ayrılma noktası sarı. */
(() => {
  'use strict';
  const { RENK, S, sayi, yaz, yazi, par, gizle, belir, kaybol, pop, soyle, duzlem, dogru, kirik, mutlakNoktalar, nokta, iz, etiket, parcali } = window.KIT;
  const { lerp, ease } = Ders;
  const KUTU = { x0: 50, y0: 61, w: 440, h: 440, xad: '', yad: '' };

  /* m(x) = |2x − 4| + 1: V, kolların altındaki renkli izler ve kolları uzatan kesik yarım doğrular */
  function vDuzlemi(svg, o = {}) {
    const dz = duzlem(svg, Object.assign({}, KUTU, { xmin: -2, xmax: 6, ymin: -1, ymax: 7, xsayi: 2, ysayi: 3 }, o));
    const sagIz = dogru(dz, 2, -3, { renk: RENK.f, kalin: 14, x1: 2 }), solIz = dogru(dz, -2, 5, { renk: RENK.g, kalin: 14, x2: 2 });
    const sagUz = dogru(dz, 2, -3, { renk: RENK.f, kalin: 3.5, kesik: true, x2: 2 }), solUz = dogru(dz, -2, 5, { renk: RENK.g, kalin: 3.5, kesik: true, x1: 2 });
    kirik(dz, mutlakNoktalar(dz, 2, -4, 1));
    gizle(sagIz.el, solIz.el);
    const yak = (i) => { sagIz.el.style.opacity = i === 0 ? 0.55 : 0; solIz.el.style.opacity = i === 1 ? 0.55 : 0; };
    return { dz, sagUz, solUz, yak };
  }
  /* yazıyı yerinde değiştirir: söner, yeni hâliyle yanar */
  async function degis(c, el, metin) { await kaybol(c, el, 200); yaz(el, metin); await belir(c, el, 300); }

  /* ---- 1. V'de iki doğru ---- */
  async function ikiDogru(c) {
    const svg = c.svg(1000, 562);
    const { dz, sagUz, solUz, yak } = vDuzlemi(svg);
    sagUz.ayarla(2, -3, 2, 2); solUz.ayarla(-2, 5, 2, 2);
    const izler = iz(dz, 2, 1, { renk: RENK.sifir }), uc = nokta(dz, 2, 1, { r: 10 });
    const sagEt = etiket(dz, 4.35, 5, '2x − 3', { renk: RENK.f, hiza: 'start' }), solEt = etiket(dz, -0.3, 5, '−2x + 5', { renk: RENK.g, hiza: 'end' });
    yazi(svg, 745, 170, 'm(x) = |2x − 4| + 1', { size: 36, kalin: 700, renk: RENK.mutlak });
    const ayrilma = yazi(svg, 745, 300, ['ayrılma:  ', ['x = 2', RENK.sifir]], { size: 34 });
    gizle(izler.g, uc.el, sagEt, solEt, ayrilma);

    await soyle(c, 'Kuryenin ücreti eve uzaklıkla artıyor: grafik bir V.');
    await c.choice({
      tag: 'Tahmin et', q: 'Bu V kaç doğrusal fonksiyonun parçasından oluşur?',
      options: ['Bir', 'İki', 'Üç'], answer: 1,
      hints: ['Tek bir doğru kırılmaz; burada bir köşe var.', '', 'Köşe tek: iki kol, iki doğru.'],
      right: 'İki kol, iki ayrı doğrunun birer parçası.',
    });
    yak(0);
    await par(soyle(c, 'Sağ kolu geriye uzat: her adımda 2 artan bir doğru.'), (async () => {
      await c.tween(1100, (e) => sagUz.ayarla(2, -3, lerp(2, -2, e), 2), ease.inOut);
      await belir(c, sagEt, 400);
    })());
    yak(1);
    await par(soyle(c, 'Sol kolu uzat: her adımda 2 azalan başka bir doğru.'), (async () => {
      await c.tween(1100, (e) => solUz.ayarla(-2, 5, 2, lerp(2, 6, e)), ease.inOut);
      await belir(c, solEt, 400);
    })());
    yak(-1);
    await par(soyle(c, 'İki doğru x = 2’de buluşuyor: içteki 2x − 4’ün sıfırı.'), pop(c, uc, dz.X(2), dz.Y(1), 450), belir(c, [izler.g, ayrilma], 500));
    c.note('Kollar, içteki doğrunun sıfırında ayrılır.<br>|2x − 4|: x = 2', 'V’nin iki kolu', 'b6-ayrilma');
  }

  /* ---- 2. Mutlak değeri aç ---- */
  async function ac(c) {
    const svg = c.svg(1000, 562);
    const pr = parcali(svg, { x: 190, y: 130, ad: ['|', ['2x − 4', RENK.f], '| + 1 ='], satirlar: [[[['2x − 3', RENK.f]], 'x ≥ 2'], [[['−2x + 5', RENK.g]], 'x < 2']], aralik: 64, size: 38, kosulX: 210 });
    // işaret şeridi: 2x − 4, 2'nin solunda negatif, sağında pozitif
    const Y0 = 334, serit = S('g', {}, svg), solG = S('g', {}, serit), sagG = S('g', {}, serit);
    yazi(serit, 172, Y0 + 10, '2x − 4', { size: 28, renk: RENK.f, hiza: 'end' });
    S('line', { x1: 200, y1: Y0, x2: 500, y2: Y0, stroke: RENK.eksi, 'stroke-width': 9, 'stroke-linecap': 'round' }, solG);
    yazi(solG, 350, Y0 - 24, '−', { size: 44, kalin: 700, renk: RENK.eksi });
    S('line', { x1: 500, y1: Y0, x2: 800, y2: Y0, stroke: RENK.arti, 'stroke-width': 9, 'stroke-linecap': 'round' }, sagG);
    yazi(sagG, 650, Y0 - 24, '+', { size: 44, kalin: 700, renk: RENK.arti });
    S('circle', { cx: 500, cy: Y0, r: 10, fill: RENK.sifir }, serit);
    yazi(serit, 500, Y0 + 44, '2', { size: 28, kalin: 700, renk: RENK.sifir });
    const W = yazi(svg, 500, 490, '', { size: 46, kalin: 700 });
    const yan = (i) => { solG.style.opacity = i === 0 ? 0.3 : 1; sagG.style.opacity = i === 1 ? 0.3 : 1; };
    gizle(pr.satir[0].g, pr.satir[1].g, serit, W);

    await soyle(c, 'Mutlak değeri açmak için içindekinin işaretine bak.');
    await par(soyle(c, 'İçteki 2x − 4, 2’nin solunda negatif, sağında pozitif.'), belir(c, serit, 500));
    yan(0); yaz(W, [['(2x − 4)', RENK.f], ' + 1']);
    await par(soyle(c, 'Sağda içerisi pozitif: mutlak değer aynen çıkar.'), belir(c, W, 500));
    await degis(c, W, '2x − 4 + 1');
    await par(soyle(c, 'Topla: sağ parçanın kuralı hazır.'), degis(c, W, [['2x − 3', RENK.f]]));
    await kaybol(c, W, 250); await belir(c, pr.satir[0].g, 450);
    yan(1);
    await c.choice({
      tag: 'Tahmin et', q: 'x &lt; 2 iken |2x − 4| neye eşittir?',
      options: ['−2x − 4', '−2x + 4', '2x + 4'], answer: 1,
      hints: ['Eksi parantezin tamamına dağılır: −4 de işaret değiştirir.', '', 'İki terimin de işareti çevrilir: 2x, −2x olur.'],
      right: '−(2x − 4) = −2x + 4: iki terim de işaret değiştirir.',
    });
    yaz(W, [['−(2x − 4)', RENK.g], ' + 1']);
    await par(soyle(c, 'Solda içerisi negatif: mutlak değer eksiyle çıkar.'), belir(c, W, 500));
    await par(soyle(c, 'Eksi iki terime de dağılır; sondaki 1 değişmez.'), degis(c, W, '−2x + 4 + 1'));
    await degis(c, W, [['−2x + 5', RENK.g]]);
    await kaybol(c, W, 250); await belir(c, pr.satir[1].g, 450);
    yan(-1);
    await soyle(c, 'İki doğrusal kural tek bir fonksiyonda birleşti.');
    c.note('<b>|h| açılırken:</b> h ≥ 0 ise h, h &lt; 0 ise −h', 'Mutlak değeri açmak', 'b6-ac');
  }

  /* ---- 3. Eksi ve c ile ---- */
  async function eksiVeC(c) {
    const svg = c.svg(1000, 562);
    const dz = duzlem(svg, Object.assign({}, KUTU, { xmin: -6, xmax: 4, ymin: -5, ymax: 5, xsayi: 2, ysayi: 3 }));
    const sagIz = dogru(dz, -1, 2, { renk: RENK.f, kalin: 14, x1: -1 }), solIz = dogru(dz, 1, 4, { renk: RENK.g, kalin: 14, x2: -1 });
    const sagUz = dogru(dz, -1, 2, { renk: RENK.f, kalin: 3.5, kesik: true, x2: -1 }), solUz = dogru(dz, 1, 4, { renk: RENK.g, kalin: 3.5, kesik: true, x1: -1 });
    const kilavuz = S('line', { x1: dz.X(-1), x2: dz.X(-1), y1: dz.Y(3), y2: dz.Y(0), stroke: RENK.sifir, 'stroke-width': 2, 'stroke-dasharray': '5 6' }, dz.orta);
    kirik(dz, mutlakNoktalar(dz, 1, 1, 3, -1));
    const uc = nokta(dz, -1, 3, { r: 10 });
    const pr = parcali(svg, { x: 530, y: 150, ad: '−|x + 1| + 3 =', satirlar: [[[['−x + 2', RENK.f]], 'x ≥ −1'], [[['x + 4', RENK.g]], 'x < −1']], aralik: 58, size: 26, kosulX: 100 });
    pr.ad.style.fill = RENK.mutlak;
    const W = yazi(svg, 745, 370, '', { size: 36, kalin: 700 });
    gizle(sagIz.el, solIz.el, sagUz.el, solUz.el, kilavuz, uc.el, pr.satir[0].g, pr.satir[1].g, W);
    const yak = (i) => { sagIz.el.style.opacity = i === 0 ? 0.55 : 0; solIz.el.style.opacity = i === 1 ? 0.55 : 0; };

    await soyle(c, 'Bu kez önde eksi, sonda artı 3 var.');
    await c.choice({
      tag: 'Tahmin et', q: 'Parçalar hangi x’te ayrılır?',
      options: ['x = 1', 'x = −1', 'x = 3'], answer: 1,
      hints: ['x = 1’de içerisi 2 eder; sıfır olmaz.', '', '3 grafiği yukarı taşır; ayrılma yerini değiştirmez.'],
      right: 'İçteki x + 1’in sıfırı: x = −1.',
    });
    await par(pop(c, uc, dz.X(-1), dz.Y(3), 450), belir(c, kilavuz, 400));
    yak(0); yaz(W, ['−', ['(x + 1)', RENK.f], ' + 3']);
    await par(soyle(c, 'Sağda içerisi pozitif: aynen çıkar, önündeki eksi kalır.'), belir(c, W, 500));
    await par(soyle(c, 'Eksi iki terime dağılır; 3 yerinde kalır.'), degis(c, W, '−x − 1 + 3'));
    await degis(c, W, [['−x + 2', RENK.f]]);
    await kaybol(c, W, 250); await belir(c, [pr.satir[0].g, sagUz.el], 450);
    yak(1); yaz(W, ['−', ['(−(x + 1))', RENK.g], ' + 3']);
    await par(soyle(c, 'Solda içerisi negatif: eksiyle çıkar; öndeki eksiyle iki eksi olur.'), belir(c, W, 500));
    await par(soyle(c, 'İki eksi birbirini götürür.'), degis(c, W, 'x + 1 + 3'));
    await degis(c, W, [['x + 4', RENK.g]]);
    await kaybol(c, W, 250); await belir(c, [pr.satir[1].g, solUz.el], 450);
    yak(-1);
    await soyle(c, 'Grafikle karşılaştır: sol kol artan, sağ kol azalan doğru.');
    c.note('<b>Açarken:</b> öndeki eksi ve c yerinde kalır, yalnızca |h| açılır.', 'Eksi ve c ile açmak', 'b6-eksi-c');
  }

  /* ---- 4. Dene ---- */
  async function dene(c) {
    const svg = c.svg(1000, 562);
    const { dz, yak } = vDuzlemi(svg, { ysayi: 9 });
    const pr = parcali(svg, { x: 520, y: 160, ad: '|2x − 4| + 1 =', satirlar: [[[['2x − 3', RENK.f]], 'x ≥ 2'], [[['−2x + 5', RENK.g]], 'x < 2']], aralik: 58, size: 26, kosulX: 110 });
    pr.ad.style.fill = RENK.mutlak;
    const izler = iz(dz, 3.5, 4, { renk: RENK.sifir });
    const p = nokta(dz, 3.5, 4, { r: 10 });
    const deger = yazi(svg, 745, 350, '', { size: 40, kalin: 700 });
    const koy = (x) => {
      const y = Math.abs(2 * x - 4) + 1, i = x >= 2 ? 0 : 1;
      p.git(x, y); izler.ayarla(x, y); yak(i); pr.yak(i);
      yaz(deger, ['m(' + sayi(x) + ') = ', [sayi(y), RENK.mutlak]]);
    };
    await soyle(c, 'x’i değiştir; nokta hangi koldaysa o satır yanar.', { noWait: true });
    const sl = c.slider({ label: 'x (girdi)', min: -1, max: 5, step: 0.5, value: 3.5, fmt: (v) => sayi(v), onInput: koy });
    await c.cont('Devam ›');
    sl.remove();
    const x0 = p.x;
    await c.tween(700, (e) => koy(lerp(x0, 2, e)), ease.inOut);
    koy(2); yak(-1); pr.yak(-1);
    yaz(deger, ['en küçük değer:  ', ['1', RENK.sifir]]); deger.setAttribute('font-size', 32);
    await soyle(c, 'Sol parça azalan, sağ parça artan: en küçük değer birleşme yerinde.');
  }

  Ders.start({
    id: 'nicelikler-ve-degisimler-b6', kicker: 'Konu B · Mutlak değer fonksiyonu', title: 'Mutlak değerli fonksiyonun parçalı gösterimi', accent: '#3cc8e8', back: 'index.html',
    intro: { title: 'Mutlak değerli fonksiyonun parçalı gösterimi', hook: 'Eve uzaklığa göre ücret alan bir kurye, evin iki yanında da aynı tarifeyi <b>tek kuralla nasıl yazar?</b>', button: 'Derse başla ›' },
    goals: ['V’nin iki kolunun hangi doğrular üzerinde olduğunu bulur.', 'Mutlak değeri içindekinin işaretine göre açar.', 'Mutlak değerli fonksiyonu parçalı gösterimle yazar.'],
    scenes: [
      { title: 'V’de iki doğru', goal: 'İki kolun doğrularını ve ayrıldıkları yeri bul.', run: ikiDogru },
      { title: 'Mutlak değeri aç', goal: 'İşarete göre iki kuralı adım adım çıkar.', run: ac },
      { title: 'Eksi ve c ile', goal: 'Önünde eksi, sonunda c olan ifadeyi aç.', run: eksiVeC },
      { title: 'Dene', goal: 'Girdiye göre hangi parçanın geçerli olduğunu izle.', run: dene },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'm(x) = |x − 3| + 2 fonksiyonu x &lt; 3 için hangi kuralla yazılır?', options: ['x − 1', '−x − 1', '−x + 5'], answer: 2,
        why: ['Bu x ≥ 3 için geçerli kuraldır: (x − 3) + 2.', 'Eksi, −3’ün de işaretini çevirir: −(x − 3) = −x + 3.', '−(x − 3) + 2 = −x + 3 + 2 = −x + 5.'], scene: 1 },
      { q: '|3x + 6| ifadesinin parçalı gösteriminde parçalar hangi x’te ayrılır?', options: ['x = 2', 'x = −2', 'x = 6'], answer: 1,
        why: ['3 · 2 + 6 = 12 eder; içerisi sıfır olmaz.', '3x + 6 = 0 için x = −2: parçalar içerinin sıfırında ayrılır.', '6 sabit terimdir; ayrılma yeri içerinin sıfırıdır.'], scene: 0 },
    ],
    summary: [
      '<b>Mutlak değeri açmak, işarete göre iki yol çizmektir.</b>',
      'İçerisi pozitifse mutlak değer aynen, negatifse eksiyle çıkar; parçalar içerinin sıfırında ayrılır.',
      '|2x − 4| + 1: x ≥ 2 için 2x − 3, x &lt; 2 için −2x + 5.',
    ],
    nextLesson: { href: 'c1-problemi-fonksiyona-cevirmek.html', label: 'Sonraki: Problemi fonksiyona çevirmek ›' },
  });
})();
