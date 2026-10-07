/* B1 — Görselleri neye göre ayırırsın? (FİZ.9.1.2 a, b, c)
   Senaryo: plan/fizik/fizik-bilimi-ve-kariyer-kesfi/senaryolar/B-fizik-biliminin-alt-dallari.md
   Görseller ders kitabının 2. Etkinliği'nden (s. 23–24); nitelikler s. 25–29'daki açıklamalardan.
   Bu derste raflar nitelikle adlanır; alt dalın adı B2'de söylenir. */
(() => {
  'use strict';
  const { RENK, DALLAR, dal, buyuk, IKON_AD, raflar, yuva, gorselDali, yazi, kutu, gizle, belir, par, yer, ucur, sirayla, ikon } = window.KIT;

  /* ---- 1. Neye göre? ---- */
  const DIZI = ['metronom', 'kutup', 'kaynayan', 'molekul', 'termometre', 'pusula', 'kristal', 'prizma',
    'bt', 'bobin', 'santral', 'devre', 'golge', 'atom', 'neon', 'araba'];
  async function neyeGore(c) {
    const svg = c.svg(1000, 562);
    const S = 0.95, konum = (i) => [16 + (i % 8) * 122, 50 + Math.floor(i / 8) * 104, S];
    const g = {};
    DIZI.forEach((ad, i) => { g[ad] = ikon(c, svg, ad, ...konum(i)); gizle(g[ad]); });
    for (const ad of DIZI) { belir(c, g[ad], 250); await c.wait(70); }
    await c.say('Fizikte bilgi biriktikçe incelenen konular çoğaldı.');
    await c.say('Bu görsellerin her biri fiziğin incelediği bir olay ya da araç.');
    await c.say('Bu kadar konuyu incelemek için önce gruplara ayırmak gerekir.');
    await c.choice({
      tag: 'Tahmin et', q: 'Bu görselleri raflara neye göre ayırırsın?',
      options: ['Rengine göre', 'Büyüklüğüne göre', 'İçindeki olaya göre'], answer: 2,
      hints: ['Renk, görselde ne olduğunu söylemez.', 'Görsellerin hepsi aynı boyda.', ''],
      right: 'Evet. Görselde ne olduğuna bakarız.',
    });
    const digerleri = DIZI.filter((ad) => ad !== 'prizma' && ad !== 'golge').map((ad) => g[ad]);
    svg.append(g.prizma, g.golge);
    await par(belir(c, digerleri, 400, 0.3),
      ucur(c, g.prizma, konum(DIZI.indexOf('prizma')), [284, 276, 1.7], 700),
      ucur(c, g.golge, konum(DIZI.indexOf('golge')), [512, 276, 1.7], 700));
    await c.say('Prizmada ışık renklerine ayrılıyor; perdede gölge oluşuyor.');
    const ad = yazi(c, svg, 500, 478, 'ışık olayları', { size: 30, renk: RENK.dal });
    await belir(c, ad);
    await c.say('İkisini öbürlerinden ayıran özellik aynı: <b>ışık olayı</b>.');
    await c.say('Böyle bir özelliğe <b>nitelik</b> denir; raflar niteliğe göre açılır.');
  }

  /* ---- görselleri sırayla raflarına gönderir ---- */
  const BUYUK = [380, 44, 2];
  async function ayir(c, svg, R, sira, bilgi) {
    const ids = Object.keys(R);
    let g = null, ad = null;
    await sirayla(c, sira, {
      tag: 'Hangi rafa?', soru: (o) => `<b>${buyuk(IKON_AD[o])}</b>: onu ayıran özellik hangisi?`,
      secenekler: () => ids.map((id) => dal(id).nitelik), dogru: (o) => ids.indexOf(gorselDali(o)),
      ipucu: (o) => bilgi[o][0], gerekce: (o) => bilgi[o][1],
      goster: async (o) => {
        g = ikon(c, svg, o, ...BUYUK); ad = yazi(c, svg, 500, 262, IKON_AD[o], { size: 22 });
        gizle(g, ad); await belir(c, [g, ad], 300);
      },
      yerlestir: async (o) => { await par(ucur(c, g, BUYUK, yuva(R[gorselDali(o)]), 600), belir(c, ad, 250, 0)); ad.remove(); },
      bekle: 1200,
    });
  }

  /* ---- 2. İlk dört raf ---- */
  const BILGI1 = {
    metronom: ['Sarkaç bir sağa bir sola gidiyor. Görselde ne oluyor?', 'Metronomun sarkacı gidip geliyor: hareket.'],
    kaynayan: ['Su neden buharlaşıyor?', 'Su ısındıkça sıcaklığı artıyor ve kaynıyor.'],
    pusula: ['Pusulanın iğnesini döndüren şey ne olabilir?', 'Pusulayla yön bulma, manyetizmayla ilgilidir.'],
    araba: ['Kişi arabaya ne uyguluyor?', 'Kişi arabayı itiyor: kuvvet uyguluyor.'],
    termometre: ['Termometre neyi ölçer?', 'Termometre sıcaklığı ölçer.'],
    bobin: ['Pile bağlı tel ataşları neden çekiyor?', 'Pile bağlı bobin ataşları çekiyor: elektrik ve mıknatıs bir arada.'],
  };
  async function ilkDort(c) {
    const svg = c.svg(1000, 562);
    const R = raflar(c, svg, ['optik', 'mekanik', 'termo', 'elektro'], 322);
    dal('optik').gorsel.forEach((ad) => ikon(c, svg, ad, ...yuva(R.optik)));
    await c.say('Dört raf açtık; her rafın etiketi bir <b>nitelik</b>.');
    c.say('Görseli öbürlerinden ayıran özelliği seç.', { noWait: true });
    await ayir(c, svg, R, ['metronom', 'kaynayan', 'pusula', 'araba', 'termometre', 'bobin'], BILGI1);
    await c.say('Her rafta aynı niteliği taşıyan iki görsel var.');
  }

  /* ---- 3. Öteki dört raf ---- */
  const BILGI2 = {
    kristal: ['Köşeli, düz yüzeyli bir katı. Yapısına bak.', 'Kristal, düzenli yapılı bir katıdır.'],
    atom: ['Model neyi gösteriyor?', 'Model atomun yapısını gösteriyor: çekirdek ve elektronlar.'],
    santral: ['Bu santral enerjisini nereden üretir?', 'Nükleer santral enerjiyi atom çekirdeğinden üretir.'],
    kutup: ['Bu ışık bir lambadan ya da aynadan gelmiyor.', 'Kutup ışıkları plazmayla ilgili bir olaydır.'],
    devre: ['Çipler hangi tür katıdan yapılır?', 'Devre kartındaki çipler yarı iletken katılardan yapılır.'],
    molekul: ['Model nelerden oluşuyor?', 'Molekül, birbirine bağlı atomlardan oluşur.'],
    bt: ['Bu cihaz nükleer santralle aynı rafa girer.', 'BT cihazı nükleer fizikten yararlanılarak yapılır.'],
    neon: ['Tüpün içindeki gaz ışık veriyor. Bu maddenin hangi hâli?', 'Neon lamba plazma fiziğinden yararlanılarak yapılır.'],
  };
  async function otekiDort(c) {
    const svg = c.svg(1000, 562);
    const R = raflar(c, svg, ['kati', 'atom', 'nukleer', 'plazma'], 322);
    await c.say('Dört raf daha var; bu kez nitelikler gözle görülmüyor.');
    c.say('Görseli öbürlerinden ayıran özelliği seç.', { noWait: true });
    await ayir(c, svg, R, ['kristal', 'atom', 'santral', 'kutup', 'devre', 'molekul', 'bt', 'neon'], BILGI2);
    c.note('<b>Önce nitelik, sonra grup.</b><br>Prizma ile gölge oyunu: ışık olayları', 'Sınıflandırma', 'siniflandirma');
    await c.say('Önce neye baktığını söyle, sonra grupla.');
  }

  /* ---- 4. Yeni örnek nereye? ---- */
  const ORNEKLER = [
    { ad: 'aynada görüntü', dal: 'optik', sec: ['optik', 'mekanik', 'atom', 'plazma'], gerekce: 'Aynada görüntü ışığın yansımasıyla oluşur.' },
    { ad: 'bisiklet', dal: 'mekanik', sec: ['termo', 'mekanik', 'elektro', 'nukleer'], gerekce: 'Bisiklet, kuvvet uygulanınca hareket eder.' },
    { ad: 'çatıya ısı yalıtımı', dal: 'termo', sec: ['kati', 'optik', 'termo', 'mekanik'], gerekce: 'Yalıtım, ısı alışverişini azaltır.' },
    { ad: 'mıknatısla ayrılan metal atık', dal: 'elektro', sec: ['plazma', 'atom', 'mekanik', 'elektro'], gerekce: 'Metal atığı mıknatıs çekerek ayırır.' },
  ];
  async function yeniOrnek(c) {
    const svg = c.svg(1000, 562);
    const o = { olcek: 0.6, bant: 46, size: 18 };
    const R = Object.assign(raflar(c, svg, ['optik', 'mekanik', 'termo', 'elektro'], 190, o), raflar(c, svg, ['kati', 'atom', 'nukleer', 'plazma'], 320, o));
    DALLAR.forEach((d) => d.gorsel.forEach((ad) => ikon(c, svg, ad, ...yuva(R[d.id]))));
    await c.say('Sekiz raf hazır; şimdi yeni örnekler geliyor.');
    c.say('Örnek hangi rafa girer?', { noWait: true });
    let g = null;
    await sirayla(c, ORNEKLER, {
      tag: 'Yeni örnek', soru: (x) => `<b>${buyuk(x.ad)}</b> hangi rafa girer?`,
      secenekler: (x) => x.sec.map((id) => dal(id).nitelik), dogru: (x) => x.sec.indexOf(x.dal),
      ipucu: () => 'Örnekte ne oluyor? Raftaki iki görsele bak.', gerekce: (x) => x.gerekce,
      goster: async (x) => {
        g = c.S('g', {}, svg); yer(g, 500, 104, 1);
        kutu(c, g, -230, -50, 460, 100, { renk: RENK.dal });
        yazi(c, g, 0, 10, x.ad, { size: 28 });
        gizle(g); await belir(c, g, 300);
      },
      yerlestir: async (x) => {
        const r = R[x.dal];
        await c.tween(600, (e) => { yer(g, 500 + (r.x + r.w / 2 - 500) * e, 104 + (r.y + r.h / 2 - 104) * e, 1 - 0.75 * e); g.style.opacity = 1 - e; });
        g.remove();
        r.kutu.setAttribute('stroke', RENK.iyi);
      },
      bekle: 1200,
    });
    await c.say('Yeni örnek, niteliği aynı olan rafa girer.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-b1', kicker: 'Konu B · Fizik biliminin alt dalları', title: 'Görselleri neye göre ayırırsın?',
    accent: '#3ddc97', back: 'index.html',
    intro: { title: 'Görselleri neye göre ayırırsın?', hook: 'Fizikle ilgili on altı fotoğrafı raflara dizecek olsan, kaç raf açardın ve neye göre?', button: 'Derse başla ›' },
    goals: ['Görsellerdeki olguları ayıran niteliği belirler.', 'Görselleri niteliklerine göre ayrıştırır ve gruplandırır.'],
    scenes: [
      { title: 'Neye göre?', goal: 'Görselleri ayıran özelliğe, niteliğe bak.', run: neyeGore },
      { title: 'İlk dört raf', goal: 'Altı görseli niteliğine göre rafına gönder.', run: ilkDort },
      { title: 'Öteki dört raf', goal: 'Sekiz görseli niteliğine göre rafına gönder.', run: otekiDort },
      { title: 'Yeni örnek nereye?', goal: 'Yeni bir örneği niteliği aynı olan rafa koy.', run: yeniOrnek },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kaynayan su ile termometreyi aynı rafa koyan nitelik hangisi?', options: ['Isı ve sıcaklık', 'İkisi de mutfakta bulunur', 'İkisi de sıvı içerir'], answer: 0,
        why: ['Evet. İkisinde de olan şey ısı ve sıcaklıkla ilgili.', 'Nerede bulundukları, görselde ne olduğunu söylemez.', 'Sıvı içermek ortak, ama ikisini fizikte ayıran özellik bu değil.'], scene: 1 },
      { q: 'Aynada görüntü oluşumu hangi rafa girer?', options: ['Hareket ve kuvvet', 'Atomun yapısı', 'Işık olayları'], answer: 2,
        why: ['Aynada bir şey itilmiyor ya da çekilmiyor.', 'Görüntü atomun içiyle değil, ışıkla ilgili.', 'Evet. Görüntü ışığın yansımasıyla oluşur.'], scene: 3 },
    ],
    summary: ['<b>Önce neye baktığını söyle, sonra grupla.</b>', 'Aynı <b>niteliği</b> taşıyan görseller aynı rafa girer.'],
    nextLesson: { href: 'b2-fizigin-alt-dallari.html', label: 'Sonraki: Her grubun bir adı var ›' },
  });
})();
