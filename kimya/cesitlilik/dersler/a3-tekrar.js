/* A3 — Konu tekrarı: Metalik bağ
   Yeni bilgi yok. Tek sahnede konunun dört kuralı toplanır; ardından sekiz karışık soru gelir (plan/KURALLAR.md 3.4).
   Senaryo: plan/kimya/cesitlilik/senaryolar/A-metalik-bag.md (A3). Seslendirme yok.
   Tahtada dört küçük pano durur; kuralın uzun hâli altyazıda ve defterdedir, panoda çizim ve kısa etiket vardır. */
(() => {
  'use strict';
  const { RENK, ileri, yazi, renkli, kutu, gizle, belir, par, atom, etkilesim, metal, cubuk } = window.KIT;
  const { ease } = Ders;

  /* ---- 1. Konunun kuralları: dört pano, her kural kendi panosuna çizilir, sonra deftere geçer ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const P1 = [30, 20], P2 = [520, 20], P3 = [30, 290], P4 = [520, 290], W = 450, H = 245;
    const cerceve = c.S('g', {}, svg);
    [P1, P2, P3, P4].forEach((p) => kutu(c, cerceve, p[0], p[1], W, H));
    gizle(cerceve);

    // Kural 1: iki atom, iki itme, iki çekme.
    const g1 = c.S('g', {}, svg);
    renkli(c, g1, P1[0] + W / 2, P1[1] + 44, [['itme', RENK.itme], ' ve ', ['çekme', RENK.cekme]], { size: 26, kalin: 700 });
    const N1 = [140, 160], N2 = [370, 160], a1 = -1.1, a2 = Math.PI - 1.1;
    atom(c, g1, N1, { r: 56, e: a1, ed: 34 }); atom(c, g1, N2, { r: 56, e: a2, ed: 34 });
    const E1 = ileri(N1, a1, 34), E2 = ileri(N2, a2, 34);
    etkilesim(c, g1, N1, N2, 'itme', { b: 18, boy: 34 }); etkilesim(c, g1, E1, E2, 'itme', { b: 12, boy: 28 });
    etkilesim(c, g1, N1, E2, 'cekme', { b: 18, boy: 46 }); etkilesim(c, g1, N2, E1, 'cekme', { b: 18, boy: 46 });
    gizle(g1);

    // Kural 2: itme çubuğu ile çekme çubuğu eşit.
    const g2 = c.S('g', {}, svg);
    renkli(c, g2, P2[0] + W / 2, P2[1] + 44, [['itme', RENK.itme], ' = ', ['çekme', RENK.cekme]], { size: 26, kalin: 700 });
    const bi = cubuk(c, g2, 570, 150, RENK.itme), bc = cubuk(c, g2, 570, 210, RENK.cekme);
    gizle(g2);

    // Kural 3: artı iyonlar ve elektron denizi.
    const g3 = c.S('g', {}, svg);
    yazi(c, g3, P3[0] + W / 2, P3[1] + 44, 'elektron denizi', { size: 26, kalin: 700, renk: RENK.eksi });
    const m = metal(c, g3, { x: 70, y: 368, w: 370, h: 130, sutun: 4, satir: 1, etiket: 'Na^{+}', yukSayisi: 1, r: 24, re: 8, size: 18, dagit: 0, tohum: 11 });
    gizle(g3);

    // Kural 4: Na, Mg, Al; yük ve serbest elektron arttıkça çubuk yükselir.
    const g4 = c.S('g', {}, svg);
    yazi(c, g4, P4[0] + W / 2, P4[1] + 44, 'bağ kuvveti artar', { size: 26, kalin: 700, renk: RENK.cekme });
    const taban = 488, yuk4 = [['Na^{+}', 620, 50], ['Mg^{2+}', 745, 90], ['Al^{3+}', 870, 130]];
    const dik = yuk4.map(([et, x, h]) => {
      const r = c.S('rect', { x: x - 34, y: taban, width: 68, height: 0, rx: 6, fill: RENK.cekme }, g4);
      yazi(c, g4, x, taban + 30, et, { size: 22, kalin: 700, math: true });
      return { r, h };
    });
    gizle(g4);

    // Anlatım: dört kural sırayla, her biri panosuyla ve defter satırıyla.
    await par(c.say('Bu konuda öğrendiklerimizi dört kuralda toplayalım.'), belir(c, cerceve, 500));

    await par(c.say('İki atom arasında hem itme hem çekme kuvveti vardır.'), belir(c, g1, 500));
    c.note('<b>İtme ve çekme</b> birlikte vardır.<br>Örnek: iki hidrojen atomu.', 'İtme ve çekme', 'tekrar-itme-cekme');

    await par(c.say('Bağ, itme ile çekmenin dengelendiği uzaklıkta kurulur.', { speak: '[thoughtful] Bağ, itme ile çekmenin dengelendiği uzaklıkta kurulur.' }),
      (async () => {
        await belir(c, g2, 350);
        await c.tween(1100, (e) => { bi.boy(340 * e); bc.boy(340 * e); }, ease.out);
      })());
    c.note('<b>Bağ: itme = çekme</b>, net kuvvet sıfır.', 'Bağ', 'tekrar-bag');

    await par(c.say('Metal atomları valans elektronlarını bırakır ve artı iyona dönüşür.'), (async () => {
      await belir(c, g3, 400);
      await c.tween(1500, (e) => m.dagit(e), ease.inOut);
    })());
    await par(c.say('Metalik bağ, artı iyonlarla elektron denizi arasındaki çekimdir.'), m.dolas(4200));
    c.note('<b>Metalik bağ:</b> artı iyonlar ile elektron denizi arasındaki çekim.<br>Örnek: Na<sup>+</sup> iyonları.', 'Metalik bağ', 'tekrar-metalik-bag');

    await par(c.say('İyon yükü ve serbest elektron arttıkça metalik bağ kuvvetlenir.'), (async () => {
      await belir(c, g4, 400);
      await c.tween(1500, (e) => dik.forEach((d, i) => {
        const k = Math.max(0, Math.min(1, e * 1.6 - i * 0.3)), h = d.h * k;
        d.r.setAttribute('y', taban - h); d.r.setAttribute('height', h);
      }), ease.out);
      await m.dolas(1200);
    })());
    c.note('<b>Yük ve serbest elektron arttıkça bağ kuvvetlenir.</b><br>Na &lt; Mg &lt; Al', 'Bağın kuvveti', 'tekrar-kuvvet');
  }

  Ders.start({
    id: 'cesitlilik-a3', kicker: 'Konu A · Metalik bağ', title: 'Konu tekrarı: Metalik bağ', accent: '#f5b04c', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Metalik bağ',
      hook: 'Metalik bağın dört kuralı aklında mı? Önce kuralları topla, sonra <b>sekiz karışık soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun dört kuralını hatırlar.', 'Kuralları karışık sırayla gelen sorularda yeni durumlara uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun dört kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Karışık sorular',
    // Sorular derslerin sırasıyla değil karışık dizilir; doğru şık sorudan soruya yer değiştirir.
    quiz: [
      { q: 'Magnezyum atomu iki valans elektronunu bırakırsa hangi iyon oluşur?',
        options: ['Mg<sup>+</sup>', 'Mg<sup>2+</sup>', 'Mg<sup>2−</sup>'], answer: 1,
        why: ['Mg<sup>+</sup> iyonu tek elektron bırakmış atomdur; burada iki elektron gitti.', 'İki eksi yük gidince geriye 2+ yük fazlası kalır.', 'Elektron bırakan atom eksi değil, artı yüklü olur.'], scene: 0 },
      { q: 'Bağ yapmış iki atom birbirine doğru bastırılıyor. Hangi kuvvet büyük olur?',
        options: ['İtme', 'Çekme', 'İkisi de sıfır olur'], answer: 0,
        why: ['Yaklaşınca çekirdekler birbirini kuvvetle iter; atomlar geri itilir.', 'Çekme, atomlar denge uzaklığından uzaklaştıkça büyür.', 'Kuvvetler ancak atomlar çok uzaklaşınca kaybolur.'], scene: 0 },
      { q: 'Sodyum (Na<sup>+</sup>), magnezyum (Mg<sup>2+</sup>) ve alüminyumu (Al<sup>3+</sup>) metalik bağı zayıf olandan kuvvetli olana sırala.',
        options: ['Al, Mg, Na', 'Mg, Na, Al', 'Na, Mg, Al'], answer: 2,
        why: ['Bu, kuvvetliden zayıfa doğru bir sıralamadır.', 'Na yalnızca 1+ yüklüdür ve bir serbest elektron verir; Mg’den zayıftır.', 'Yük ve serbest elektron sayısı 1, 2, 3 diye arttıkça bağ kuvvetlenir.'], scene: 0 },
      { q: 'İki atomun çekirdekleri birbirine hangi kuvveti uygular?',
        options: ['Çekme', 'İtme', 'Kuvvet uygulamaz'], answer: 1,
        why: ['Çekme zıt yükler arasında olur; iki çekirdek de artı yüklüdür.', 'İki çekirdek de artı yüklüdür; aynı yükler birbirini iter.', 'Yaklaşan yüklü taneciklerin arasında kuvvet vardır.'], scene: 0 },
      { q: 'Bir metal telde elektron denizini ne oluşturur?',
        options: ['Atomlardan ayrılıp serbest dolaşan valans elektronları', 'Çekirdeklerdeki protonlar', 'Atomlara sıkıca bağlı iç elektronlar'], answer: 0,
        why: ['Valans elektronları atomlarından ayrılır ve bütün iyonların arasında dolaşır.', 'Protonlar çekirdekte kalır; artı yüklüdür, deniz eksi yüklü elektronlardan oluşur.', 'İç elektronlar atoma bağlı kalır; serbest dolaşan valans elektronlarıdır.'], scene: 0 },
      { q: 'Hangi durumda iki atom arasında bağ kurulmuştur?',
        options: ['Yalnızca çekme kuvveti kaldığında', 'Atomlar birbirinden çok uzaklaştığında', 'İtme ile çekme dengelendiğinde'], answer: 2,
        why: ['Bağ kurulunca itme yok olmaz; çekmeyle dengelenir.', 'Çok uzakta atomlar arasında etkileşim olmaz.', 'Bağ, net kuvvetin sıfır olduğu uzaklıkta kurulur.'], scene: 0 },
      { q: 'Bir metalde iyon başına üç serbest elektron varsa iyonun yükü nedir?',
        options: ['1+', '3+', '3−'], answer: 1,
        why: ['1+ yük, tek elektron bırakmış atomun yüküdür.', 'Üç eksi yük giden atomda üç artı yük fazlası kalır.', 'Elektron bırakan atom eksi değil, artı yüklü olur.'], scene: 0 },
      { q: 'Çok uzaktaki iki atom yaklaşmaya başladığında önce hangi kuvvet büyüktür?',
        options: ['Çekme; atomlar birbirine doğru çekilir', 'İtme; atomlar uzaklaşır', 'Hiç kuvvet oluşmaz'], answer: 0,
        why: ['Atomlar yaklaştıkça önce çekme daha büyüktür.', 'İtme, atomlar çok yaklaştıktan sonra baskın olur.', 'Yaklaşırken kuvvetler oluşur ve büyür.'], scene: 0 },
    ],
    summary: [
      'İki atom arasında hem <b>itme</b> hem <b>çekme</b> vardır.',
      'Bağ, itme ile çekmenin <b>dengelendiği</b> uzaklıkta kurulur.',
      'Metalik bağ, artı iyonlarla <b>elektron denizi</b> arasındaki çekimdir.',
      'Yük ve serbest elektron arttıkça bağ kuvvetlenir.',
      '<b>Bağ bir dengedir; metalde bu dengeyi artı iyonlar ve elektron denizi kurar.</b>',
    ],
    nextLesson: { href: 'b1-katyon-anyon.html', label: 'Sonraki konu: İyonik bağ ›' },
  });
})();
