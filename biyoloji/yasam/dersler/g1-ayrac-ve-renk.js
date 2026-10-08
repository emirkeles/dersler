/* G1 · BİY.9.1.7 · Yazar notu: içerik MEB Biyoloji 9 s. 74 (ayıraç tanımı, besin etiketi ve basit test) ve s. 75
   (ayıraç tablosu: Lugol, Benedict, Biüret, Sudan III ve IV; oluşan renkler). Besinlerin içeriği: s. 58 (fruktoz: bal),
   s. 60 (nişasta: mısır tohumu), s. 62 (zeytinyağı, tereyağı), s. 64 (yumurta ve süt proteinleri).
   Anlatım 8 Ekim 2026'da baştan yazıldı: önce ayraç öğretilir, renk değişimi tüpte gösterilir, soru sonra gelir. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.G, IKINCI = 'var(--c2)';
  const BOS = '#3a4763', MAVIMOR = '#5f56d6', KIREMIT = '#b9553d', MOR = '#a55fd0', KIRMIZI = '#e2493f';

  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const karis = (a, b, e) => { const x = rgb(a), y = rgb(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * e)).join(',')})`; };

  /* Deney tüpü: x tüpün ortası, y ağzı. Besinin adı altında, sonuç onun altında yazar. */
  function tup(c, p, x, y, ad) {
    const g = c.S('g', {}, p);
    const sivi = c.S('path', { d: `M ${x - 42} ${y + 120} V ${y + 204} Q ${x - 42} ${y + 246} ${x} ${y + 246} Q ${x + 42} ${y + 246} ${x + 42} ${y + 204} V ${y + 120} Z`, fill: BOS }, g);
    c.S('path', { d: `M ${x - 50} ${y} V ${y + 204} Q ${x - 50} ${y + 254} ${x} ${y + 254} Q ${x + 50} ${y + 254} ${x + 50} ${y + 204} V ${y}`, fill: 'none', stroke: '#9aa7bc', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
    K.yazi(c, g, x, y + 298, ad, { size: 28 });
    return { g, sivi, x, y };
  }
  /* Ayracın adı tüpün üstünde belirir. */
  async function ayrac(c, t, ad) {
    t.ayrac = K.yazi(c, t.g, t.x, t.y - 58, ad, { size: 26, renk: R });
    await K.belir(c, t.ayrac, 300);
  }
  /* Damla düşer; renk verilmişse sıvı o renge döner. Sonuç tüpün altına yazılır. */
  async function damlat(c, t, renk, sonuc) {
    const d = c.S('circle', { cx: t.x, cy: t.y - 34, r: 9, fill: '#dfe5f0' }, t.g);
    await c.tween(650, (e) => d.setAttribute('cy', t.y - 34 + 160 * e), Ders.ease.in);
    d.remove();
    if (renk) await c.tween(750, (e) => t.sivi.setAttribute('fill', karis(BOS, renk, e)));
    else await c.wait(450);
    await K.belir(c, K.yazi(c, t.g, t.x, t.y + 336, sonuc, { size: 26, renk: renk ? 'var(--text)' : 'var(--muted)' }), 300);
  }

  /* ---- Sahne 1 · Görünmeyeni gösteren damla ---- */
  async function damla(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 300, 130, 400, 240, 'Süt · besin etiketi', ['Karbohidrat', 'Yağ', 'Protein'], { renk: IKINCI }));
    await c.say('Süt kutusunun etiketinde karbohidrat, yağ ve protein yazar.');
    await c.say('Ama bu moleküller sütün içinde gözle görülmez.');
    await sil(c, g);
    const d = c.S('g', {}, s);
    await K.belir(c, K.yazi(c, d, 500, 58, 'Ayraç: aradığı molekülle karşılaşınca renk değiştirir', { size: 28, renk: R }), 350);
    await c.say('Bir besinde belirli bir molekülü aramak için kullanılan maddeye ayraç denir.',
      { speak: 'Bir besinde belirli bir molekülü aramak için kullanılan maddeye [short pause] ayraç denir.' });
    await c.say('Ayraç, aradığı molekülle karşılaşınca renk değiştirir.');
    const misir = tup(c, d, 300, 165, 'Mısır');
    await K.belir(c, misir.g);
    await c.say('Bitkiler nişastayı tohumlarında depolar; mısır tanesi buna örnektir.');
    await ayrac(c, misir, 'Lugol');
    await c.say('Lugol, nişastayı arayan bir iyot çözeltisidir.');
    await damlat(c, misir, MAVIMOR, 'mavi-mor');
    await c.say('Ezilmiş mısıra Lugol damlatılınca karışım mavi-mor oldu: nişasta bulundu.', { speak: 'Ezilmiş mısıra Lugol damlatılınca karışım mavi mor oldu: nişasta bulundu.' });
    const su = tup(c, d, 700, 165, 'Su');
    await K.belir(c, su.g);
    await ayrac(c, su, 'Lugol');
    await damlat(c, su, null, 'renk oluşmadı');
    await c.say('Aynı ayraç suya damlatılınca renk oluşmaz; çünkü suda nişasta yok.');
    await c.choice({ tag: 'Uygula', q: 'Bir besine Lugol damlatıldı; mavi-mor renk oluşmadı. Bu ne gösterir?',
      options: ['Besinde nişasta bulunamadı.', 'Besinde nişasta var.', 'Besinde hiçbir organik molekül yok.'], answer: 0,
      hints: ['', 'Nişasta olsaydı Lugol mavi-mor renk verirdi.', 'Lugol nişastayı arar; protein ya da yağ için bir şey söylemez.'],
      right: 'Lugol aradığı nişastayı bulamadı; bu yüzden renk oluşmadı.' });
    await c.say('Renk oluşursa aranan molekül var, oluşmazsa bulunamadı demektir.');
    c.note('<b>Ayraç, aradığı molekülle renk değiştirir.</b><br>Nişasta + Lugol → mavi-mor', 'Ayraç');
  }

  /* ---- Sahne 2 · Şekerin ayracı ---- */
  async function seker(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const bal = tup(c, g, 200, 165, 'Bal');
    await K.belir(c, bal.g);
    await c.say('Karbohidratların hepsi nişasta değildir.', { speak: '[thoughtful] Karbohidratların hepsi nişasta değildir.' });
    await K.belir(c, K.yazi(c, g, 700, 62, 'Fruktoz, glikoz: tek birimli şeker', { size: 28 }), 350);
    await c.say('Bal fruktoz içerir; fruktoz, glikoz gibi tek birimli bir şekerdir.');
    await K.belir(c, K.kart(c, g, 470, 100, 460, 150, 'Nişasta', ['Lugol → mavi-mor'], { renk: 'var(--muted)' }));
    await c.say('Lugol nişastayı arar; bu küçük şekerleri göstermez.');
    const kart = K.kart(c, g, 470, 290, 460, 150, 'Glikoz, fruktoz', ['Benedict'], { renk: R });
    await K.belir(c, kart);
    await ayrac(c, bal, 'Benedict');
    await c.say('Glikoz ve fruktozu Benedict çözeltisi arar.');
    await damlat(c, bal, KIREMIT, 'kiremit kırmızısı');
    kart.lastChild.textContent = 'Benedict → kiremit kırmızısı';
    await c.say('Bala Benedict eklenince kiremit kırmızısı renk oluştu: şeker bulundu.');
    await c.choice({ tag: 'Uygula', q: 'Bir meyve suyunda glikoz aranıyor. Hangi ayraç kullanılır, bulunursa hangi renk oluşur?',
      options: ['Lugol; mavi-mor', 'Benedict; mavi-mor', 'Benedict; kiremit kırmızısı'], answer: 2,
      hints: ['Lugol nişastayı arar; glikozu göstermez.', 'Ayraç doğru; ama mavi-mor, Lugol ile nişastanın rengidir.', ''],
      right: 'Glikozu Benedict arar; bulursa kiremit kırmızısı renk oluşur.' });
    await c.say('Aranan karbohidrat değişince ayraç da değişir.');
  }

  /* ---- Sahne 3 · Protein ve yağ ---- */
  async function proteinYag(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const yumurta = tup(c, g, 250, 130, 'Yumurta');
    await K.belir(c, yumurta.g);
    await c.say('Yumurtada protein bulunur.');
    await ayrac(c, yumurta, 'Biüret');
    await c.say('Proteini arayan ayracın adı Biürettir.');
    await damlat(c, yumurta, MOR, 'açık mavi ya da mor');
    await c.say('Biüret proteinle karşılaşınca açık mavi ya da mor renk oluşur.');
    const yag = tup(c, g, 750, 130, 'Zeytinyağı');
    await K.belir(c, yag.g);
    await c.say('Zeytinyağı bir lipittir; günlük dilde yağ deriz.');
    await ayrac(c, yag, 'Sudan III/IV');
    await c.say('Yağları Sudan III ve Sudan IV çözeltileri arar.', { speak: 'Yağları Sudan üç ve Sudan dört çözeltileri arar.' });
    await damlat(c, yag, KIRMIZI, 'kırmızı ya da turuncu');
    await c.say('Sudan damlatılan zeytinyağı kırmızı ya da turuncu renk alır.');
    await c.choice({ tag: 'Uygula', q: 'Tereyağı da bir yağdır. Bunu göstermek için hangi ayraç damlatılır, hangi renk beklenir?',
      options: ['Biüret; açık mavi ya da mor', 'Sudan III/IV; kırmızı ya da turuncu', 'Benedict; kiremit kırmızısı'], answer: 1,
      hints: ['Biüret proteini arar; yağı göstermez.', '', 'Benedict glikoz ve fruktozu arar; yağı göstermez.'],
      right: 'Yağı Sudan arar; bulursa kırmızı ya da turuncu renk oluşur.' });
  }

  /* ---- Sahne 4 · Dört ayraç, dört molekül ---- */
  async function dort(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const satirlar = [['Nişasta', 'Lugol', MAVIMOR, 'mavi-mor'], ['Glikoz, fruktoz', 'Benedict', KIREMIT, 'kiremit kırmızısı'],
      ['Protein', 'Biüret', MOR, 'açık mavi, mor'], ['Yağ', 'Sudan III/IV', KIRMIZI, 'kırmızı, turuncu']];
    satirlar.forEach(([molekul, ad, renk, renkAd], i) => {
      const y = 95 + i * 82;
      K.yazi(c, g, 180, y, molekul, { size: 28 });
      K.ok(c, g, 300, y - 9, 360, y - 9, 'var(--muted)');
      K.yazi(c, g, 470, y, ad, { size: 28, renk: R });
      c.S('circle', { cx: 630, cy: y - 9, r: 16, fill: renk }, g);
      K.yazi(c, g, 665, y, renkAd, { size: 28, hiza: 'start' });
      if (i < 3) K.cizgi(c, g, 70, y + 32, 930, y + 32, '#374561', { width: 2 });
    });
    await K.belir(c, g);
    await c.say('Her ayraç kendi molekülünü arar ve kendi rengini verir.');
    const bilinmeyen = c.S('g', {}, s);
    c.S('circle', { cx: 300, cy: 461, r: 20, fill: KIREMIT }, bilinmeyen);
    K.yazi(c, bilinmeyen, 340, 470, 'Etiketsiz tüpte oluşan renk', { size: 28, hiza: 'start' });
    await K.belir(c, bilinmeyen, 350);
    await c.choice({ tag: 'Uygula', q: 'Etiketsiz bir tüpe damlatılan ayraç kiremit kırmızısı renk verdi. Tüpte ne bulundu?',
      options: ['Protein', 'Nişasta', 'Glikoz ya da fruktoz'], answer: 2,
      hints: ['Proteinin rengi Biüret ile açık mavi ya da mordur.', 'Nişastanın rengi Lugol ile mavi-mordur.', ''],
      right: 'Kiremit kırmızısı, Benedict ile glikoz ya da fruktozun rengidir.' });
    await Promise.all([sil(c, g), sil(c, bilinmeyen)]);
    const son = c.S('g', {}, s);
    K.kart(c, son, 80, 150, 390, 190, 'Ayraç', ['Var mı, yok mu?'], { renk: R });
    K.kart(c, son, 530, 150, 390, 190, 'Etiket', ['Ne kadar var?'], { renk: IKINCI });
    await K.belir(c, son);
    await c.say('Ayraç testi nitelikseldir: molekülün olup olmadığını gösterir.',
      { speak: '[thoughtful] Ayraç testi nitelikseldir: molekülün olup olmadığını gösterir.' });
    await c.say('Kaç gram olduğunu renk söylemez; o bilgi etikette yazar.');
    c.note('<b>Lugol nişastayı, Benedict şekeri, Biüret proteini, Sudan yağı arar.</b>', 'Dört ayraç');
  }

  Ders.start({
    id: 'yasam-g1', kicker: 'Konu G · Besinlerde organik molekül arama', title: 'Ayraç: görünmeyeni renkle gösterir', accent: R, back: 'index.html',
    intro: { title: 'Ayraç: görünmeyeni renkle gösterir', hook: 'Bir damla sıvı, besindeki nişastayı nasıl görünür yapar?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Görünmeyeni gösteren damla', goal: 'Ayracın ne yaptığını gör.', run: damla },
      { title: 'Şekerin ayracı', goal: 'Nişasta ile şekerin ayracını ayır.', run: seker },
      { title: 'Protein ve yağ', goal: 'Biüret ile Sudanı tanı.', run: proteinYag },
      { title: 'Dört ayraç, dört molekül', goal: 'Renkten moleküle git.', run: dort },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Bir besinde nişasta aranıyor. Hangi ayraç kullanılır, bulunursa hangi renk oluşur?',
        options: ['Lugol; mavi-mor', 'Biüret; açık mavi ya da mor', 'Sudan III/IV; kırmızı ya da turuncu'], answer: 0,
        why: ['Lugol nişastayı arar; bulursa mavi-mor renk oluşur.', 'Biüret proteini arar; nişastayı göstermez.', 'Sudan yağı arar; nişastayı göstermez.'], scene: 0 },
      { q: 'Süte Biüret damlatılınca mor renk oluştu. Bu sonuç ne söyler?',
        options: ['Sütte kaç gram protein olduğunu', 'Sütte protein olduğunu', 'Sütte nişasta olduğunu'], answer: 1,
        why: ['Renk yalnızca var ya da yok der; miktar etikette yazar.', 'Biüret proteini arar; mor renk proteinin bulunduğunu gösterir.', 'Nişastayı Lugol arar; Biüret proteini gösterir.'], scene: 3 },
    ], summary: ['<b>Doğru ayraç, aranan molekülü gösterir.</b>', 'Lugol nişastayı, Benedict glikoz ve fruktozu, Biüret proteini, Sudan yağı arar.'],
    nextLesson: { href: 'g2-deneyi-tasarla.html', label: 'Sonraki: Deneyi tasarla: hangi besin, hangi ayraç ›' },
  });
})();
