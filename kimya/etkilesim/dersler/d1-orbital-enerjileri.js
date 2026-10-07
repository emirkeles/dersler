/* D1 · KİM.9.1.4 a–ç · MEB Kimya 9 s.54, 56–58.
   Bağıl enerji sırası kaynaklıdır; SVG yüksekliği ve boşlukları temsili.
   Çok elektronlu atomların genel sırası; sayısal enerji verisi değildir. */
(() => {
  'use strict';
  const { yazi, belir } = KIT;
  const vurgu = '#3cc8e8', soluk = '#667591';
  const turler = [['s', 1], ['p', 3], ['d', 5], ['f', 7]];
  const sira = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p'];
  function kaynak(c, svg, sayfa = '56–58') {
    yazi(c, svg, 500, 525, 'Kitap s. ' + sayfa + ' · Aralıklar temsili', { size: 30, renk: 'var(--muted)' });
  }
  function eksen(c, svg, x = 185) {
    c.S('line', { x1: x, y1: 455, x2: x, y2: 130, stroke: vurgu, 'stroke-width': 4 }, svg);
    c.S('path', { d: `M ${x - 8} 145 L ${x} 127 L ${x + 8} 145`, fill: 'none', stroke: vurgu, 'stroke-width': 4 }, svg);
  }
  function basamak(c, svg, ad, y, { x = 275, w = 260, renk = vurgu, adet = 1 } = {}) {
    const g = c.S('g', {}, svg);
    yazi(c, g, x - 35, y + 10, ad, { size: 34, hiza: 'end', renk });
    for (let i = 0; i < adet; i++) c.S('line', { x1: x + i * (w / adet), y1: y, x2: x + (i + 1) * (w / adet) - 15, y2: y, stroke: renk, 'stroke-width': 6 }, g);
    return g;
  }
  function ikili(c, svg, animasyon = false) {
    yazi(c, svg, 500, 72, 'Çok elektronlu atom · bağıl enerji', { size: 34 });
    eksen(c, svg);
    const d = basamak(c, svg, '3d', animasyon ? 250 : 215, { adet: 5, w: 400 });
    const s = basamak(c, svg, '4s', animasyon ? 315 : 350, { w: 400 });
    kaynak(c, svg);
    return { d, s };
  }
  async function turleriTani(c) {
    const svg = c.svg();
    const ciz = (secili) => {
      svg.replaceChildren();
      yazi(c, svg, 500, 65, 'Aynı alt düzeydeki orbital sayısı', { size: 34 });
      turler.forEach(([ad, n], i) => {
        const y = 150 + i * 85, renk = i === secili ? vurgu : soluk;
        yazi(c, svg, 195, y + 14, ad, { size: 40, renk });
        for (let j = 0; j < n; j++) c.S('rect', { x: 285 + j * 58, y: y - 20, width: 42, height: 42, rx: 4, fill: 'none', stroke: renk, 'stroke-width': 3 }, svg);
        yazi(c, svg, 785, y + 14, String(n), { size: 38, renk });
      });
      yazi(c, svg, 500, 520, 'Her kutu bir orbital · kitap s. 54', { size: 30, renk: 'var(--muted)' });
    };
    ciz(0);
    await c.say('Harf orbital türünü belirtir; kutular şekil göstermez.');
    await c.choice({ q: 'Bir p alt düzeyinde kaç orbital bulunur?', options: ['1', '3', '5', '7'], answer: 1,
      hints: ['Bir orbital s türündedir.', '', 'Beş orbital d türündedir.', 'Yedi orbital f türündedir.'], right: 'Üç orbital. p satırındaki kutuları say.' });
    c.slider({ label: 'Orbital türünü incele', min: 0, max: 3, step: 1, value: 0, fmt: (i) => turler[i][0], onInput: ciz });
    await c.say('Türü değiştir; alt düzeyin orbital sayısını karşılaştır.', { noWait: true });
    await c.cont();
  }
  async function onermeKur(c) {
    const svg = c.svg();
    yazi(c, svg, 350, 285, '4s', { size: 64, renk: vurgu });
    yazi(c, svg, 650, 285, '3d', { size: 64, renk: vurgu });
    await c.say('Bu iki etiketteki sayılar, enerji sırası için yeterli mi?');
    await c.choice({ tag: 'Tahmin et', q: 'Enerji sırasını hangi dayanakla belirleyelim?', options: ['Bağıl enerji diyagramıyla', 'Yalnız baştaki sayıyla', 'Yalnız orbital sayısıyla'], answer: 0,
      hints: ['', 'Başta 3 yazması tek başına enerji sırasını kanıtlamaz.', 'Orbital sayısı enerji değeri değildir.'], right: 'Önce kaynak diyagramını inceleyelim.' });
    svg.replaceChildren();
    const { d, s } = ikili(c, svg, true);
    await c.tween(1000, (e) => {
      d.setAttribute('transform', 'translate(0 ' + (-35 * e) + ')');
      s.setAttribute('transform', 'translate(0 ' + (35 * e) + ')');
    });
    await c.say('Ok yukarı doğru enerji artışını gösterir.');
    await c.choice({ tag: 'Önerme oluştur', q: 'Diyagramdan hangi önermeyi kurarsın?', options: ['4s, 3d’den düşük enerjilidir.', '3d, 4s’ten düşük enerjilidir.', '4s ve 3d eş enerjilidir.'], answer: 0,
      hints: ['', '3d çizgisi 4s çizgisinin üstündedir.', 'Çizgiler aynı yükseklikte değildir.'], right: '4s daha aşağıdadır; önerme diyagramla desteklenir.' });
    c.note('<b>Enerji sırası diyagramdan okunur.</b><br>Örnek: 4s &lt; 3d', 'Bağıl enerji');
  }
  async function dayanagiAyir(c) {
    const svg = c.svg();
    ikili(c, svg);
    yazi(c, svg, 815, 235, '3 < 4', { size: 42, renk: 'var(--c2)' });
    yazi(c, svg, 815, 305, '3d < 4s ?', { size: 34, renk: 'var(--c2)' });
    await c.say('Bir gerekçe diyagrama, diğeri yalnız etiketin sayısına dayanıyor.');
    await c.choice({ tag: 'Dayanağı ayır', q: 'Hangisi enerji verisine dayanmayan gerekçedir?', options: ['3 küçüktür 4; dolayısıyla 3d daha düşüktür.', '4s çizgisi aşağıda; 4s daha düşüktür.'], answer: 0,
      hints: ['', 'Çizginin konumu bağıl enerji verisidir.'], right: 'Etiketin sayısı bu sıralamayı desteklemiyor.' });
    await c.choice({ q: 'Dayanaklı olan önermeyi seç.', options: ['3d daha düşük; çünkü 3 daha küçük.', '4s daha düşük; çünkü çizgisi aşağıda.'], answer: 1,
      hints: ['Bu önerme kaynak diyagramıyla çelişir.', ''], right: 'Önerme ve gerekçesi aynı kaynak verisiyle uyuşuyor.' });
    await c.say('Geçerli gerekçe, diyagramdaki konumu kullanır.');
  }
  async function gecersiziAyikla(c) {
    const svg = c.svg();
    yazi(c, svg, 500, 70, 'Çok elektronlu atom · bağıl enerji', { size: 34 });
    eksen(c, svg);
    const p = basamak(c, svg, '2p', 215, { adet: 3, w: 450 });
    basamak(c, svg, '2s', 350, { w: 450 });
    kaynak(c, svg);
    await belir(c, p);
    await c.say('Üç 2p çizgisi aynı yükseklikte; 2s çizgisi aşağıdadır.');
    await c.choice({ tag: 'Geçersizi ayıkla', q: 'Bu diyagrama göre hangi çıkarımı elemeliyiz?', options: ['Aynı 2p alt düzeyindeki orbitaller eş enerjilidir.', '2s, 2p’den düşük enerjilidir.', '2s ve 2p, aynı sayıdan dolayı eş enerjilidir.'], answer: 2,
      hints: ['Üç 2p çizgisi aynı yükseklikte; bu geçerli.', '2s çizgisi aşağıda; bu geçerli.', ''], right: 'Aynı baştaki sayı eş enerji için yeterli değildir.' });
    yazi(c, svg, 805, 225, '=', { size: 50, renk: vurgu });
    await c.say('Aynı alt düzeyde eş enerji, farklı türlerde enerji farkı görülür.');
    c.note('<b>Aynı alt düzeyde orbitaller eş enerjilidir.</b><br>Örnek: üç 2p orbitali', 'Eş enerji');
  }
  async function siralamayiDene(c) {
    const svg = c.svg();
    const secilen = [];
    const ciz = (secili = -1) => {
      svg.replaceChildren();
      yazi(c, svg, 500, 58, 'Genel bağıl sıra', { size: 34 });
      eksen(c, svg, 150);
      sira.forEach((ad, i) => basamak(c, svg, ad, 455 - i * 45, { x: 245, w: 270, renk: i === secili ? vurgu : soluk }));
      let sonEtiket;
      if (secilen.length) {
        yazi(c, svg, 755, 190, 'Düşük → yüksek', { size: 32 });
        secilen.forEach((ad, i) => { sonEtiket = yazi(c, svg, 755, 265 + i * 55, ad, { size: 38, renk: vurgu }); });
      }
      kaynak(c, svg);
      return sonEtiket;
    };
    ciz();
    await c.say('Diyagramdaki dört etiketi düşükten yükseğe sırala.');
    let kalan = ['3d', '4p', '4s', '3p'];
    for (const dogru of ['3p', '4s', '3d', '4p']) {
      if (kalan.length > 1) await c.choice({ tag: 'Sıralama · ' + (secilen.length + 1) + '/4', q: 'Kalanların en düşük enerjilisini seç.', options: kalan, answer: kalan.indexOf(dogru),
        hints: kalan.map((ad) => ad === dogru ? '' : dogru + ' çizgisi daha aşağıda.'), right: dogru + ' sıradaki etikettir.' });
      secilen.push(dogru);
      kalan = kalan.filter((ad) => ad !== dogru);
      await belir(c, ciz(sira.indexOf(dogru)), 350);
    }
    c.clearAct();
    c.slider({ label: 'Tüm enerji sırasını incele', min: 0, max: 7, step: 1, value: 0, fmt: (i) => sira[i], onInput: ciz });
    await c.say('Sırayı numara değil, bağıl enerji belirler.', { noWait: true });
    await c.cont();
  }
  Ders.start({
    id: 'etkilesim-d1', kicker: 'Konu D · Orbitallerin enerjisi', title: 'Enerji sırasını veriden kur', accent: vurgu, back: 'index.html',
    intro: { title: 'Enerji sırasını veriden kur', hook: '4s mi, 3d mi daha düşük enerjili?', button: 'Derse başla ›' },
    scenes: [
      { title: 'Orbital türlerini tanı', goal: 's/p/d/f ve orbital sayılarını karşılaştır.', run: turleriTani },
      { title: 'Veriden önerme kur', goal: 'Kaynak diyagramını kullanarak önerme oluştur.', run: onermeKur },
      { title: 'Dayanağı ayır', goal: 'Veriye dayalı olan ve olmayan gerekçeleri ayır.', run: dayanagiAyir },
      { title: 'Geçersiz çıkarımı ele', goal: 'Eş enerji verisini kullanarak yanlış çıkarımı ayıkla.', run: gecersiziAyikla },
      { title: 'Enerji sırasına karar ver', goal: 'Geçerli tahminlerle düşükten yükseğe sıralama yap.', run: siralamayiDene },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Genel bağıl enerji diyagramında hangisi daha düşük enerjilidir?', options: ['3d', '4s', '4s ve 3d eşittir.'], answer: 1,
        why: ['3d çizgisi 4s çizgisinin üstündedir.', '4s çizgisi 3d çizgisinin altında yer alır.', 'Bu iki çizgi farklı yüksekliktedir.'], scene: 1 },
      { q: 'Aynı 2p alt düzeyindeki üç orbitalin enerjileri nasıldır?', options: ['Birbirine eşittir.', 'Biri daima iki kat büyüktür.', 'Orbital sayısı kadar artar.'], answer: 0,
        why: ['Üç 2p çizgisi aynı yüksekliktedir.', 'Diyagramda katlı enerji değeri verilmez.', 'Orbital sayısı enerji değeri değildir.'], scene: 3 },
    ],
    summary: ['<b>Sırayı numara değil, bağıl enerji belirler.</b>', 'Genel sıra: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p.', 'Aynı alt düzeydeki orbitaller eş enerjilidir.'],
    nextLesson: { href: 'e1-aufbau.html', label: 'Sonraki: Önce düşük enerji ›' },
  });
})();
