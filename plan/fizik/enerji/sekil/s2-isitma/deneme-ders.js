/* P2 · DENEME · Ş2 ikiz ısıtma düzeneğinin (dersler/isitma-sekil.js, window.ISITMA) ders motorunda denenmesi.
   Tam ders değildir; figürün bütün ayarlarını, noktalarını ve kadrajlarını gezdirir. Sayılar örnek veridir.
   Kaynağı plan/fizik/enerji/sekil/s2-isitma/deneme-ders.js olarak saklanır; tema klasöründe durmaz.
   Çalıştırmak için: bu dosyayı fizik/enerji/dersler/p2-isitma-deneme.js, sayfasını fizik/enerji/p2-isitma-deneme.html
   olarak koy (sayfa: ortak/ders.js, dersler/isitma-sekil.js, bu dosya), sonra `node araclar/olc.js enerji/p2`. */
(() => {
  'use strict';
  const { lerp, ease } = Ders;
  const I = window.ISITMA;
  const YAZI = 'var(--text)', SOLUK = 'var(--muted)', SICAK = 'var(--c2)';
  const tr = (v) => String(Math.round(v));

  const yazi = (c, p, metin, o = {}) => c.S('text', {
    x: 0, y: 0, 'text-anchor': o.hiza || 'start', 'font-size': 24, 'font-weight': o.kalin || 500,
    style: 'fill:' + (o.renk || SOLUK), text: metin,
  }, p);
  const belir = (c, el, ms = 350) => { const els = [el].flat(); els.forEach((e) => { e.style.opacity = 0; }); return c.tween(ms, (e) => els.forEach((x) => { x.style.opacity = e; })); };
  const kadraj = (c, f, g, a, b, ms = 900) => c.tween(ms, (e) => { f.bak(a.map((v, i) => lerp(v, b[i], e))); g.guncelle(); }, ease.inOut);

  function kur(c) {
    const svg = c.svg(1000, 562);
    const f = I.kur(c, svg, { x: 138, y: 18, h: 500 });
    return { svg, f };
  }
  /* Etiketler figürün noktalarına bağlıdır; g.guncelle() her karede yerlerini ve sayıları yeniler. */
  function etiketler(c, svg, f, liste) {
    const g = c.S('g', {}, svg);
    const hepsi = liste.map(([ad, metin, dx, dy, o]) => ({ ad, metin, dx, dy, el: yazi(c, g, '', o) }));
    g.guncelle = () => {
      for (const e of hepsi) {
        const [x, y] = f.nokta(e.ad);
        e.el.setAttribute('x', (x + e.dx).toFixed(1)); e.el.setAttribute('y', (y + e.dy).toFixed(1));
        e.el.style.display = f.gorunur(e.ad) ? '' : 'none';   // yakınlaşınca kadraj dışında kalan noktanın yazısı gizlenir
        const m = typeof e.metin === 'function' ? e.metin() : e.metin;
        if (e.el.textContent !== m) e.el.textContent = m;
      }
    };
    g.guncelle();
    return g;
  }
  const derece = (f, ist) => () => tr(f.durum(ist).sicaklik) + ' °C';

  /* ---- Sahne 1 · Bütün noktalar; iki istasyon su, biri 24 → 33 °C, öteki 24 → 42 °C; süreölçer ilerler ---- */
  async function isitma(c) {
    const { svg, f } = kur(c);
    f.ayar('sol', { icerik: 'su', seviye: 0.9, sicaklik: 24 });
    f.ayar('sag', { icerik: 'su', seviye: 0.45, sicaklik: 24 });
    await belir(c, f.el, 500);
    const adlar = etiketler(c, svg, f, [
      ['sol.termometre', 'sol termometre', 12, 7], ['sag.termometre', 'sağ termometre', 12, 7],
      ['sol.kap', 'sol kap', 42, 8], ['sag.kap', 'sağ kap', 42, 8],
      ['sol.alev', 'alev', 14, 8], ['sag.alev', 'alev', 14, 8],
      ['sol.etiket', '200 g su', 0, 24, { hiza: 'middle', renk: YAZI }], ['sag.etiket', '100 g su', 0, 24, { hiza: 'middle', renk: YAZI }],
      ['sureolcer', 'süreölçer', 44, 30],
    ]);
    await belir(c, adlar);
    await c.say('İki özdeş istasyon: solda <b>200 g</b>, sağda <b>100 g</b> su.', { speak: 'İki özdeş istasyon: solda iki yüz gram, sağda yüz gram su.' });
    await c.tween(300, (e) => { adlar.style.opacity = 1 - e; });
    adlar.remove();
    const okuma = etiketler(c, svg, f, [
      ['sol.termometre', derece(f, 'sol'), 12, 7, { renk: SICAK, kalin: 600 }], ['sag.termometre', derece(f, 'sag'), 12, 7, { renk: SICAK, kalin: 600 }],
      ['sol.etiket', '200 g su', 0, 24, { hiza: 'middle', renk: YAZI }], ['sag.etiket', '100 g su', 0, 24, { hiza: 'middle', renk: YAZI }],
      ['sureolcer', () => tr(f.durum('sol').sure) + ' sn', 44, 30, { renk: YAZI }],
    ]);
    await belir(c, okuma);
    await c.tween(700, (e) => { f.ayar('sol', { alev: 2 * e }); f.ayar('sag', { alev: 2 * e }); });
    await c.say('İki ocak aynı anda yandı; süreölçer çalışıyor.', { speak: 'İki ocak aynı anda yandı; süreölçer çalışıyor.' });
    await c.tween(4200, (e) => {
      f.ayar('sol', { sicaklik: lerp(24, 33, e) }); f.ayar('sag', { sicaklik: lerp(24, 42, e) }); f.sure(60 * e);
      okuma.guncelle();
    }, ease.linear);
    await c.say('Bir dakikada sol <b>33 °C</b>, sağ <b>42 °C</b> oldu.', { speak: 'Bir dakikada sol otuz üç, sağ kırk iki santigrat derece oldu.' });
    await kadraj(c, f, okuma, I.kadraj.tum, I.kadraj.kaplar);
    await c.say('Az su, aynı alevde daha çok ısındı.', { speak: 'Az su, aynı alevde daha çok ısındı.' });
    await kadraj(c, f, okuma, I.kadraj.kaplar, I.kadraj.tum);
    await c.tween(600, (e) => { f.ayar('sol', { alev: 2 - 2 * e }); f.ayar('sag', { alev: 2 - 2 * e }); });
  }

  /* ---- Sahne 2 · Tek istasyon: buz erir, termometre 0 °C'ta durur; içerik 'su' olur (sıçrama yok); ısınır ve kaynar ---- */
  async function erime(c) {
    const { svg, f } = kur(c);
    f.goster('sag', 0);
    f.ayar('sol', { icerik: 'buz', seviye: 0.7, sicaklik: 0, kati: 1, alev: 2 });
    const okuma = etiketler(c, svg, f, [
      ['sol.termometre', derece(f, 'sol'), 12, 7, { renk: SICAK, kalin: 600 }],
      ['sol.etiket', 'buzlu su', 0, 24, { hiza: 'middle', renk: YAZI }],
      ['sureolcer', () => tr(f.durum('sol').sure) + ' sn', 44, 30, { renk: YAZI }],
    ]);
    await c.wait(300);
    await c.say('Sağ istasyon kalktı; solda buzlu su var.', { speak: 'Sağ istasyon kalktı; solda buzlu su var.' });
    await kadraj(c, f, okuma, I.kadraj.tum, I.kadraj.sol);
    await c.tween(4000, (e) => { f.ayar('sol', { kati: 1 - e }); f.sure(50 * e); okuma.guncelle(); }, ease.linear);
    await c.say('Buz eridi; termometre bu sürede <b>0 °C</b> gösterdi.', { speak: 'Buz eridi; termometre bu sürede sıfır santigrat derece gösterdi.' });
    f.ayar('sol', { icerik: 'su' });   // kati 0 iken 'buz' ile 'su' aynı görünür
    await c.tween(3000, (e) => { f.ayar('sol', { sicaklik: 100 * e, kaynama: Math.max(0, (e - 0.8) * 5) , faz: 3 * e }); f.sure(50 + 70 * e); okuma.guncelle(); }, ease.linear);
    await c.tween(3000, (e) => { f.ayar('sol', { faz: 3 * e }); f.sure(120 + 30 * e); okuma.guncelle(); }, ease.linear);
    await c.say('Su <b>100 °C</b> oldu ve kaynıyor.', { speak: 'Su yüz santigrat derece oldu ve kaynıyor.' });
    await kadraj(c, f, okuma, I.kadraj.sol, I.kadraj.tum);
    // Bütün düzenek görünürken: solda kaynayan su, sağda eriyen buz (tahta tonlarının tum kadrajındaki denemesi)
    f.ayar('sag', { icerik: 'buz', seviye: 0.7, sicaklik: 0, kati: 0.7, alev: 2 });
    await c.tween(500, (e) => f.goster('sag', e));
    await c.tween(2000, (e) => { f.ayar('sol', { faz: 2 * e }); f.ayar('sag', { kati: 0.7 - 0.2 * e }); okuma.guncelle(); }, ease.linear);
    await c.say('Solda su kaynıyor, sağda buz eriyor.', { speak: 'Solda su kaynıyor, sağda buz eriyor.' });
    f.ayar('sol', { kaynama: 0, alev: 0 });
  }

  /* ---- Sahne 3 · Öteki içerikler: zeytinyağı, bal mumu (kati 1 → 0), metal bloklar (0,5 ve 1), boş kap ---- */
  async function icerikler(c) {
    const { svg, f } = kur(c);
    f.ayar('sol', { icerik: 'su', seviye: 0.6, sicaklik: 20 });
    f.ayar('sag', { icerik: 'yag', seviye: 0.6, sicaklik: 20 });
    const ad = { sol: 'su', sag: 'zeytinyağı' };
    const okuma = etiketler(c, svg, f, [
      ['sol.termometre', derece(f, 'sol'), 12, 7, { renk: SICAK, kalin: 600 }], ['sag.termometre', derece(f, 'sag'), 12, 7, { renk: SICAK, kalin: 600 }],
      ['sol.etiket', () => ad.sol, 0, 24, { hiza: 'middle', renk: YAZI }], ['sag.etiket', () => ad.sag, 0, 24, { hiza: 'middle', renk: YAZI }],
      ['sol.kap', () => ad.solKap || '', 42, 8], ['sag.kap', () => ad.sagKap || '', 42, 8],
    ]);
    await c.wait(300);
    await c.tween(2500, (e) => { f.ayar('sol', { sicaklik: lerp(20, 40, e), alev: 1 }); f.ayar('sag', { sicaklik: lerp(20, 64, e), alev: 1 }); f.sure(40 * e); okuma.guncelle(); }, ease.linear);
    await c.say('Solda su, sağda <b>zeytinyağı</b>: yağ daha çok ısındı.', { speak: 'Solda su, sağda zeytinyağı: yağ daha çok ısındı.' });
    f.ayar('sol', { icerik: 'mum', seviye: 0.5, sicaklik: 63, kati: 1, alev: 2 }); f.ayar('sag', { icerik: 'bos', sicaklik: 20, alev: 0 });
    ad.sol = 'bal mumu'; ad.sag = 'boş kap'; okuma.guncelle();
    await c.tween(3000, (e) => { f.ayar('sol', { kati: 1 - e }); f.sure(40 + 60 * e); okuma.guncelle(); }, ease.linear);
    await c.say('Bal mumu erirken termometre <b>63 °C</b>\'ta durdu.', { speak: 'Bal mumu erirken termometre altmış üç santigrat derecede durdu.' });
    f.ayar('sol', { icerik: 'blok', seviye: 0.5, sicaklik: 20, alev: 2 }); f.ayar('sag', { icerik: 'blok', seviye: 1, sicaklik: 20, alev: 2 });
    ad.sol = 'kısa blok'; ad.sag = 'uzun blok'; ad.solKap = 'blok'; ad.sagKap = 'blok'; okuma.guncelle();
    await kadraj(c, f, okuma, I.kadraj.tum, I.kadraj.sag);
    await kadraj(c, f, okuma, I.kadraj.sag, I.kadraj.tum);
    await c.tween(2500, (e) => { f.ayar('sol', { sicaklik: lerp(20, 80, e) }); f.ayar('sag', { sicaklik: lerp(20, 50, e) }); f.sure(30 * e); okuma.guncelle(); }, ease.linear);
    await c.say('Aynı metalden iki blok: kısa olan daha çok ısındı.', { speak: 'Aynı metalden iki blok: kısa olan daha çok ısındı.' });
  }

  Ders.start({
    id: 'enerji-p2', kicker: 'Deneme · İzometrik figür', title: 'İkiz ısıtma düzeneği', accent: '#ff8a5b', back: 'index.html',
    intro: { title: 'İkiz ısıtma düzeneği', hook: 'Figürün ders motorunda denenmesi: ayarlar, noktalar, kadrajlar.', button: 'Başla ›' },
    goals: ['Figürün bütün ayarlarını gör'],
    scenes: [
      { title: 'Isıtma', goal: 'İki istasyon, iki termometre, süreölçer.', run: isitma },
      { title: 'Erime ve kaynama', goal: 'Buz erir, su kaynar.', run: erime },
      { title: 'Öteki içerikler', goal: 'Yağ, mum, blok, boş kap.', run: icerikler },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Aynı alevde hangi su daha çok ısındı?', options: ['200 g su', '100 g su'], answer: 1, why: ['Çok su aynı sürede daha az ısınır.', 'Az su aynı ısıyla daha çok ısınır.'], scene: 0 },
    ],
    summary: ['Figür yalnızca <b>gösterir</b>; sayıları ders verir.'],
  });
})();
