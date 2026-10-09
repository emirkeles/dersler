/* B2 — Her grubun bir adı var: fiziğin alt dalları (FİZ.9.1.2 ç)
   Senaryo: plan/fizik/fizik-bilimi-ve-kariyer-kesfi/senaryolar/B-fizik-biliminin-alt-dallari.md
   Dal adları programın saydığı sekizle sınırlıdır; "neyi inceler" cümleleri ders kitabı s. 29'dan,
   eşleştirme terimleri s. 25'ten. */
(() => {
  'use strict';
  const { RENK, DALLAR, dal, buyuk, raf, raflar, yuva, yazi, kutu, gizle, belir, par, sar, paragraf, yer, sirayla, ikon } = window.KIT;

  /* ---- 1. Rafın adı ---- */
  async function rafinAdi(c) {
    const svg = c.svg(1000, 562);
    const d = dal('nukleer');
    const r = raf(c, svg, 330, 110, d.nitelik, { w: 340, olcek: 1.2, bant: 66, size: 24 });
    d.gorsel.forEach((ad, i) => ikon(c, svg, ad, r.yuva[i][0], r.yuva[i][1], 1.2));
    await c.say('Bu rafı niteliğiyle etiketlemiştik: atom çekirdeği.');
    await c.say('Fizikçiler her konuyu birden incelemez; bir alanda uzmanlaşır.');
    await c.say('Uzmanlaşılan her alan fiziğin bir <b>alt dalıdır</b> ve bir adı vardır.');
    await c.say('Adlar ipucu verir: “nükleer”, çekirdekle ilgili demektir.');
    await c.choice({
      tag: 'Tahmin et', q: 'BT cihazını tasarlayan ekip, fiziğin hangi dalından birini arar?',
      options: ['Optik', 'Nükleer fizik', 'Mekanik'], answer: 1,
      hints: ['Optik ışık olaylarıyla ilgilenir. Bu rafın konusu çekirdek.', '', 'Mekanik hareket ve kuvvetle ilgilenir. Bu rafın konusu çekirdek.'],
      right: 'Evet. Atom çekirdeğini inceleyen dal nükleer fiziktir.',
    });
    await belir(c, r.etiket, 250, 0);
    r.yaz(d.ad, RENK.dal); r.kutu.setAttribute('stroke', RENK.dal);
    await belir(c, r.etiket, 350);
    await c.say('Rafın adı artık bir <b>alt dal</b>: nükleer fizik.');
    const p = paragraf(c, svg, 500, 392, d.inceler, { size: 22, en: 520, hiza: 'middle' });
    gizle(p.el); await belir(c, p.el);
    await c.say('Alt dalın adı, neyi incelediğini söyler.');
  }

  /* ---- dört rafı sırayla adlandırır ---- */
  async function adlandir(c, ids, sira, ipucu) {
    const svg = c.svg(1000, 562);
    const R = raflar(c, svg, ids, 120);
    ids.forEach((id) => dal(id).gorsel.forEach((ad) => ikon(c, svg, ad, ...yuva(R[id]))));
    await c.say('Dört rafın etiketinde hâlâ nitelik yazıyor.');
    c.say('Rafın adını seç.', { noWait: true });
    let onceki = null;
    await sirayla(c, sira, {
      tag: 'Rafın adı', soru: (id) => `Niteliği <b>${dal(id).nitelik}</b> olan rafın adı ne?`,
      secenekler: () => ids.map((id) => buyuk(dal(id).ad)), dogru: (id) => ids.indexOf(id),
      ipucu: (id) => ipucu[id], gerekce: (id) => `${buyuk(dal(id).ad)}: ${dal(id).inceler.charAt(0).toLocaleLowerCase('tr') + dal(id).inceler.slice(1)}.`,
      goster: async (id) => { R[id].kutu.setAttribute('stroke', RENK.fizik); R[id].kutu.setAttribute('stroke-width', 3); },
      yerlestir: async (id) => {
        const r = R[id];
        await par(belir(c, r.etiket, 200, 0), onceki ? belir(c, onceki, 200, 0) : null);
        if (onceki) onceki.remove();
        r.yaz(dal(id).ad, RENK.dal); r.kutu.setAttribute('stroke', RENK.dal);
        onceki = paragraf(c, svg, 500, 340, dal(id).inceler, { size: 24, en: 640, hiza: 'middle' }).el;
        gizle(onceki);
        await par(belir(c, r.etiket, 300), belir(c, onceki, 300));
      },
      bekle: 1500,
    });
    return svg;
  }

  /* ---- 2. Dört alt dal ---- */
  async function dortDal(c) {
    await adlandir(c, ['optik', 'mekanik', 'termo', 'elektro'], ['mekanik', 'termo', 'elektro', 'optik'], {
      mekanik: '“Mekanik” sözü makineyi, hareket eden parçaları hatırlatır.',
      termo: '“Termo” ısıyla ilgilidir: termometre, termos.',
      elektro: 'Adın içinde iki söz var: elektrik ve manyetizma.',
      optik: 'Gözlük satan dükkânın tabelasını düşün.',
    });
    c.note('<b>Mekanik, termodinamik, elektromanyetizma, optik</b>', 'Fiziğin alt dalları', 'dallar-1');
    await c.say('Dört raf, dört alt dal oldu.');
  }

  /* ---- 3. Dört alt dal daha ---- */
  async function dortDalDaha(c) {
    await adlandir(c, ['kati', 'atom', 'nukleer', 'plazma'], ['kati', 'plazma', 'atom', 'nukleer'], {
      kati: 'Kristal de çip de katı. Adında “katı” geçen dalı ara.',
      plazma: 'Adında “plazma” geçen dalı ara.',
      atom: 'Bu raf atomun bütününe bakıyor, yalnızca çekirdeğine değil.',
      nukleer: '“Nükleer”, çekirdekle ilgili demektir.',
    });
    c.note('<b>Katı hâl, atom, nükleer, yüksek enerji ve plazma fiziği</b>', 'Fiziğin alt dalları', 'dallar-2');
    await c.say('Atom fiziği atomun bütününe, nükleer fizik çekirdeğine bakar.');
    await c.say('Fiziğin <b>sekiz alt dalı</b> böylece tamamlandı.');
  }

  /* ---- 4. Eşleştir ---- */
  const TERIMLER = [
    { ad: 'hareket', dal: 'mekanik' }, { ad: 'ısı iletimi', dal: 'termo' }, { ad: 'mıknatıs', dal: 'elektro' }, { ad: 'ışık', dal: 'optik' },
    { ad: 'kristal yapı', dal: 'kati' }, { ad: 'atomdaki elektron dizilimi', dal: 'atom' }, { ad: 'radyasyon', dal: 'nukleer' }, { ad: 'kutup ışıkları', dal: 'plazma' },
    { ad: 'hücre', dal: null },
  ];
  async function eslestir(c) {
    const svg = c.svg(1000, 562);
    const W = 228, H = 78, K = {};
    DALLAR.forEach((d, i) => {
      const x = 26 + (i % 4) * (W + 12), y = 250 + Math.floor(i / 4) * (H + 16);
      const cerceve = kutu(c, svg, x, y, W, H, {});
      const t = yazi(c, svg, x + W / 2, y, '', { size: 20, renk: RENK.dal });
      const n = sar(c, t, d.ad, W - 20, x + W / 2, 24);
      t.setAttribute('y', y + H / 2 + 7 - (n - 1) * 12);
      K[d.id] = { cerceve, cx: x + W / 2, cy: y + H / 2 };
    });
    await c.say('Sekiz alt dal tahtada; terimler sırayla gelecek.');
    c.say('Terim hangi alt dalın konusu?', { noWait: true });
    const ilk = DALLAR.slice(0, 4).map((d) => d.id), son = DALLAR.slice(4).map((d) => d.id);
    let g = null;
    await sirayla(c, TERIMLER, {
      tag: 'Eşleştir', soru: (t) => `<b>${buyuk(t.ad)}</b> hangi alt dalın konusu?`,
      secenekler: (t) => (t.dal ? (ilk.includes(t.dal) ? ilk : son).map((id) => buyuk(dal(id).ad)) : ['Atom fiziği', 'Katı hâl fiziği', 'Hiçbiri']),
      dogru: (t) => (t.dal ? (ilk.includes(t.dal) ? ilk : son).indexOf(t.dal) : 2),
      ipucu: (t) => (t.dal ? 'Dalın adına bak: neyi incelediğini söylüyor.' : 'Hücreyi hangi disiplin inceler?'),
      gerekce: (t) => (t.dal ? `${buyuk(dal(t.dal).ad)}: ${dal(t.dal).inceler.charAt(0).toLocaleLowerCase('tr') + dal(t.dal).inceler.slice(1)}.` : 'Hücreyi biyoloji inceler; fiziğin alt dalı değildir.'),
      goster: async (t) => {
        g = c.S('g', {}, svg); yer(g, 500, 120, 1);
        kutu(c, g, -230, -50, 460, 100, { renk: RENK.fizik });
        yazi(c, g, 0, 10, t.ad, { size: 28 });
        gizle(g); await belir(c, g, 300);
      },
      yerlestir: async (t) => {
        const k = t.dal ? K[t.dal] : { cx: 500, cy: 30 };
        await c.tween(600, (e) => { yer(g, 500 + (k.cx - 500) * e, 120 + (k.cy - 120) * e, 1 - 0.75 * e); g.style.opacity = 1 - e; });
        g.remove();
        if (t.dal) k.cerceve.setAttribute('stroke', RENK.iyi);
      },
      bekle: 1100,
    });
    await c.say('Alt dalın adı, neyi incelediğini söyler.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-b2', kicker: 'Konu B · Fizik biliminin alt dalları', title: 'Her grubun bir adı var: fiziğin alt dalları',
    accent: '#3ddc97', back: 'index.html',
    intro: { title: 'Her grubun bir adı var: fiziğin alt dalları', hook: 'Bir hastanedeki görüntüleme cihazını tasarlayan ekip, fiziğin hangi dalından birini arar?', button: 'Derse başla ›' },
    goals: ['Fiziğin alt dallarını çalışma alanlarıyla ilişkilendirerek adlandırır.', 'Her alt dalın ilgilendiği konuyu açıklar.'],
    scenes: [
      { title: 'Rafın adı', goal: 'Nitelikle etiketlenen rafın bir alt dal olduğunu gör.', run: rafinAdi },
      { title: 'Dört alt dal', goal: 'Dört rafı alt dal adıyla etiketle.', run: dortDal },
      { title: 'Dört alt dal daha', goal: 'Kalan dört rafı alt dal adıyla etiketle.', run: dortDalDaha },
      { title: 'Eşleştir', goal: 'Verilen terimi ilgili alt dalla eşleştir.', run: eslestir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Isı, sıcaklık ve hâl değişimi hangi alt dalın konusudur?', options: ['Mekanik', 'Termodinamik', 'Optik'], answer: 1,
        why: ['Mekanik kuvvet, hareket ve dengeyle ilgilenir.', 'Evet. Termodinamik ısı ve sıcaklıkla ilgilenir.', 'Optik ışık olaylarını inceler.'], scene: 1 },
      { q: 'Atom çekirdeğini ve çekirdekteki tepkimeleri hangi alt dal inceler?', options: ['Nükleer fizik', 'Atom fiziği', 'Katı hâl fiziği'], answer: 0,
        why: ['Evet. Nükleer fizik atom çekirdeğini inceler.', 'Atom fiziği atomun bütününe, elektron dizilimine bakar.', 'Katı hâl fiziği kristal yapılı ve yarı iletken maddeleri inceler.'], scene: 2 },
      { q: 'Bir mühendis, bir köprünün üzerindeki araçların uyguladığı kuvvetleri ve köprünün dengede kalmasını hesaplıyor. Hangi alt daldan yararlanır?',
        options: ['Termodinamik', 'Optik', 'Mekanik'], answer: 2,
        why: ['Termodinamik ısı ve sıcaklıkla ilgilenir; köprü hesabında kuvvet ve denge söz konusu.', 'Optik ışık olaylarını inceler; köprünün dengesinin ışıkla ilgisi yok.', 'Evet. Mekanik kuvvet, hareket ve dengeyle ilgilenir.'], scene: 1 },
      { q: 'Zeynep: “Atomdaki elektronların dizilimini nükleer fizik inceler.” Zeynep’e ne dersin?',
        options: ['Haklısın; nükleer fizik atomun bütününü, elektron dizilimini de inceler.', 'Yanılıyorsun; elektron dizilimini atom fiziği, çekirdeği nükleer fizik inceler.', 'Yanılıyorsun; elektron dizilimini katı hâl fiziği, çekirdeği atom fiziği inceler.'], answer: 1,
        why: ['Nükleer fizik yalnızca atom çekirdeğine bakar; atomun bütününe bakan dal başka.', 'Evet. Atom fiziği atomun bütününe ve elektron dizilimine, nükleer fizik çekirdeğine bakar.', 'Katı hâl fiziği kristal yapılı ve yarı iletken maddeleri inceler. Çekirdeğe atom fiziği değil, nükleer fizik bakar.'], scene: 2 },
    ],
    summary: ['<b>Alt dalın adı, neyi incelediğini söyler.</b>', 'Mekanik, elektromanyetizma, termodinamik, optik, katı hâl fiziği, atom fiziği, nükleer fizik, yüksek enerji ve plazma fiziği'],
    nextLesson: { href: 'b3-tekrar.html', label: 'Sonraki: Konu tekrarı ›' },
  });
})();
