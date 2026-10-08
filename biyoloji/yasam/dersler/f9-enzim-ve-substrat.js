/* F9 · BİY.9.1.6 · Yazar notu: içerik MEB Biyoloji 9 s. 64–66 (substrat, aktif bölge, indüklenmiş uyum, anahtar-kilit,
   basit ve bileşik enzim, sükraz örneği). Şematik modeller; açık formül yok. Programın sınırı: isimlendirme, düzenlenme,
   inhibitör ve aktivatör yok; kofaktör, koenzim, apoenzim terimleri kullanılmaz.
   8 Ekim 2026'da hafifçe düzenlendi (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): terim sorudan önce tanımlanır. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.F, SUB = 'var(--c6)', YRD = 'var(--c4)';
  const yazi = (c, p, x, y, t, size = 30, renk) => K.yazi(c, p, x, y, t, { size, renk });
  const ACIK = 'M 245 320 Q 180 180 290 180 Q 335 240 380 180 Q 515 220 435 345 Z';
  const SARILI = 'M 245 320 Q 180 180 290 180 Q 290 245 335 235 Q 380 245 380 180 Q 515 220 435 345 Z';
  const enzim = (c, p, d = ACIK) => c.S('path', { d, fill: '#202a43', stroke: R, 'stroke-width': 6 }, p);
  function protein(c, p, x, y) {
    return c.S('path', { d: `M ${x} ${y} c 90 -110 165 80 90 85 c -120 25 -90 -120 35 -95 c 90 15 60 120 -40 85`, fill: 'none', stroke: R, 'stroke-width': 14, 'stroke-linecap': 'round' }, p);
  }

  /* ---- Sahne 1 · Aktif bölge ve substrat ---- */
  async function s1(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    enzim(c, g); yazi(c, g, 340, 415, 'Enzim');
    const sukroz = c.S('ellipse', { cx: 670, cy: 180, rx: 45, ry: 30, fill: SUB }, g);
    const sukrozAd = yazi(c, g, 670, 120, 'Substrat');
    await K.belir(c, g);
    await c.say('Enzimin ürüne dönüştürdüğü maddeye substrat denir.');
    const aktif = yazi(c, g, 335, 150, 'Aktif bölge', 26, R);
    await K.belir(c, aktif, 350);
    await c.say('Enzimin aktif bölgesi, substratın bağlandığı ve tepkimenin gerçekleştiği bölgedir.');
    await c.tween(900, (e) => { sukroz.setAttribute('cx', 670 - 335 * e); sukroz.setAttribute('cy', 180 + 28 * e); sukrozAd.style.opacity = 1 - e; });
    await c.say('Enzimler genellikle substratlarına özgüdür; benzer maddeler arasında kendi substratını tanır.');
    yazi(c, g, 340, 460, 'Sükraz', 26, R); sukrozAd.textContent = 'Sükroz'; sukrozAd.setAttribute('x', 335); sukrozAd.setAttribute('y', 105); sukrozAd.style.opacity = 1; aktif.remove();
    await c.say('Örneğin sükraz enzimi yalnızca sükroz üzerinde etkilidir.');
    const maltoz = c.S('rect', { x: 640, y: 150, width: 80, height: 60, rx: 6, fill: YRD }, g);
    const maltozAd = yazi(c, g, 680, 120, 'Maltoz');
    await Promise.all([K.belir(c, maltoz, 350), K.belir(c, maltozAd, 350)]);
    await c.choice({ tag: 'Uygula', q: 'Maltoz, yapıca sükroza benzeyen bir şekerdir. Sükraz, maltozu ürüne dönüştürür mü?',
      options: ['Evet; benzer her şekeri dönüştürür.', 'Hayır; sükrazın substratı sükrozdur.', 'Evet; ama önce maltozu sükroza çevirir.'], answer: 1,
      hints: ['Enzimler benzer maddeler arasında kendi substratını tanır.', '', 'Enzim substratını değiştirmez; yalnızca kendi substratına etki eder.'],
      right: 'Enzim, benzer maddeler arasında yalnızca kendi substratını tanır.' });
    await c.tween(500, (e) => { maltoz.setAttribute('x', 640 - 150 * e); });
    await c.tween(500, (e) => { maltoz.setAttribute('x', 490 + 150 * e); });
    await c.say('Sükraz maltoza etki etmez; substratı yalnızca sükrozdur.');
    c.note('<b>Enzim kendi substratına özgüdür.</b><br>Sükraz yalnızca sükroza etki eder.', 'Substrat');
  }

  /* ---- Sahne 2 · Bağlanırken uyum ---- */
  async function s2(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    const enz = enzim(c, g); const sub = c.S('ellipse', { cx: 660, cy: 180, rx: 45, ry: 30, fill: SUB }, g);
    await K.belir(c, g);
    await c.tween(900, (e) => { sub.setAttribute('cx', 660 - 325 * e); sub.setAttribute('cy', 180 + 28 * e); });
    enz.setAttribute('d', SARILI);
    await c.say('Birçok enzim, substratıyla etkileşirken biçimini değiştirir.');
    await c.say('Bu biçim değişimi, tepkimenin gerçekleşmesini kolaylaştırır.');
    const ad = yazi(c, g, 340, 430, 'İndüklenmiş uyum', 30, R);
    await K.belir(c, ad, 350);
    await c.say('Bu olaya indüklenmiş uyum denir.', { speak: 'Bu olaya [short pause] indüklenmiş uyum denir.' });
    const kilit = c.S('g', {}, g);
    c.S('path', { d: 'M 620 320 L 620 190 L 700 190 L 700 250 L 760 250 L 760 190 L 840 190 L 840 320 Z', fill: '#202a43', stroke: R, 'stroke-width': 6 }, kilit);
    c.S('rect', { x: 703, y: 196, width: 54, height: 50, rx: 4, fill: SUB }, kilit);
    yazi(c, kilit, 730, 430, 'Anahtar-kilit', 30, R);
    await K.belir(c, kilit);
    await c.say('Bazı enzimlerde ise bağlanırken belirgin bir biçim değişimi olmaz.');
    await c.say('Bu ilişki anahtar-kilit modeliyle açıklanır.', { speak: 'Bu ilişki anahtar kilit modeliyle açıklanır.' });
    await c.choice({ tag: 'Uygula', q: 'Bir enzimin aktif bölgesi, substrat bağlanırken onu saracak biçimde daralıyor. Bu hangi modele uyar?',
      options: ['İndüklenmiş uyum', 'Anahtar-kilit', 'İkisine de uymaz'], answer: 0,
      hints: ['', 'Anahtar-kilit modelinde enzimin biçimi belirgin olarak değişmez.', 'Biçim değişimi iki modelden birinin ayırt edici özelliğiydi.'],
      right: 'Enzim bağlanırken biçim değiştiriyorsa bu indüklenmiş uyumdur.' });
    g.replaceChildren(); protein(c, g, 180, 245); K.ok(c, g, 430, 285, 555, 285);
    c.S('circle', { cx: 675, cy: 250, r: 25, fill: SUB }, g); c.S('circle', { cx: 765, cy: 300, r: 25, fill: SUB }, g);
    yazi(c, g, 290, 425, 'Enzim'); yazi(c, g, 720, 425, 'Ürünler');
    await K.belir(c, g);
    await c.say('Substrat ürüne dönüşür; enzim değişmeden kalır ve yeniden görev yapar.');
    c.note('<b>İndüklenmiş uyum: enzim bağlanırken biçim değiştirir.</b><br>Biçimi değişmeyenler: anahtar-kilit.', 'Uyum');
  }

  /* ---- Sahne 3 · Basit ve bileşik enzim ---- */
  async function s3(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    protein(c, g, 170, 240); yazi(c, g, 280, 420, 'Basit enzim');
    await K.belir(c, g);
    await c.say('Çalışmak için ilave bileşene ihtiyaç duymayan enzimlere basit enzim denir.');
    const bilesik = c.S('g', {}, s);
    protein(c, bilesik, 600, 240);
    await K.belir(c, bilesik);
    await c.say('Bazı enzimler ise yardımcı bir bileşen olmadan çalışamaz.');
    const yrd = c.S('g', {}, bilesik);
    c.S('circle', { cx: 780, cy: 280, r: 25, fill: YRD }, yrd); yazi(c, yrd, 785, 365, 'Yardımcı bileşen', 25, YRD);
    await K.belir(c, yrd, 350);
    await c.say('Yardımcı bileşen çinko gibi bir metal ya da organik bir molekül olabilir.');
    await K.belir(c, yazi(c, bilesik, 730, 420, 'Bileşik enzim'), 350);
    await c.say('Bu enzimlere bileşik enzim denir.', { speak: 'Bu enzimlere [short pause] bileşik enzim denir.' });
    await c.say('Vitaminler, bazı enzimlerin organik yardımcı bileşeni olarak görev yapar.');
    await c.choice({ tag: 'Uygula', q: 'Bir enzim, ortamda çinko yokken çalışmıyor; çinko eklenince çalışıyor. Bu enzim nasıl sınıflandırılır?',
      options: ['Basit enzim', 'Substrat', 'Bileşik enzim'], answer: 2,
      hints: ['Basit enzim ilave bileşene ihtiyaç duymaz.', 'Substrat, enzimin ürüne dönüştürdüğü maddedir.', ''],
      right: 'Çinko bu enzimin yardımcı bileşenidir; enzim bileşiktir.' });
    await c.say('Çinko olmadan çalışmayan enzim, bileşik bir enzimdir.');
  }

  Ders.start({
    id: 'yasam-f9', kicker: 'Konu F · Organik moleküller', title: 'Enzim ve substrat', accent: R, back: 'index.html',
    intro: { title: 'Enzim ve substrat', hook: 'Enzim kendi substratıyla nasıl etkileşir?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Aktif bölge ve substrat', goal: 'Enzimin substratına özgü olduğunu gör.', run: s1 },
      { title: 'Bağlanırken uyum', goal: 'İki bağlanma modelini ayır.', run: s2 },
      { title: 'Basit ve bileşik enzim', goal: 'Yardımcı bileşen gerektiren enzimi tanı.', run: s3 },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'İndüklenmiş uyumda ne değişir?', options: ['Enzimin biçimi', 'Substratın adı', 'Ürünler enzime dönüşür'], answer: 0,
        why: ['Enzim, substratla etkileşirken biçimini değiştirir.', 'İndüklenmiş uyum bir biçim değişimidir.', 'Substrat ürüne dönüşür; enzim değişmeden kalır.'], scene: 1 },
      { q: 'Çalışması için yardımcı bileşen gerektiren enzim hangisidir?', options: ['Basit enzim', 'Bileşik enzim', 'Her enzim'], answer: 1,
        why: ['Basit enzim ilave bileşene ihtiyaç duymaz.', 'Bileşik enzim yardımcı bileşen olmadan çalışamaz.', 'Basit enzimler yardımcı bileşen olmadan çalışır.'], scene: 2 },
    ], summary: ['<b>Enzim substratını tanır, ona göre biçim alır.</b>', 'Bileşik enzim yardımcı bir bileşenle çalışır; basit enzim tek başına.'],
    nextLesson: { href: 'f10-dna-ve-rna.html', label: 'Sonraki: Nükleik asitler: DNA ve RNA ›' },
  });
})();
