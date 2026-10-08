/* E5 · BİY.9.1.5 · Yazar notu: içerik MEB Biyoloji 9 s. 170 (Form 8: on bir mineralin eksikliğinde ortaya çıkabilecek sağlık
   sorunları; kalsiyumda D vitaminiyle birlikte yetersizlik), s. 51 (mineral eksikliği vücudun normal işlevlerini etkiler),
   s. 53 (eksiklik sorunlarını en aza indirmede yeterli ve dengeli beslenme) ve s. 55 (yeterli miktar, uygun oran).
   Kitap raşitizm, osteoporoz ve basit guatrı tanımlamaz; derste de yalnızca adlarıyla geçer. Anlatım 8 Ekim 2026'da baştan
   yazıldı (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): eksiklikler görevle bağlanarak üç tabloda anlatılır,
   son sahne beslenmeye uygular. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.E, SOLUK = 'var(--muted)', SORUN = 'var(--c2)';
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const goster = (c, ...ogeler) => Promise.all(ogeler.map((el) => K.belir(c, el, 350)));

  /* Tablo: ilk sütun mineral, sonrakiler basliklar dizisindeki [x, ad] çiftleri. satir() hücreleri gizli çizer. */
  function tablo(c, s, basliklar, adet) {
    const g = c.S('g', {}, s), UST = 92, H = adet === 3 ? 132 : 100;
    basliklar.forEach(([x, ad]) => K.yazi(c, g, x, 68, ad, { size: 24, renk: SOLUK, hiza: 'start' }));
    c.S('line', { x1: 50, y1: UST, x2: 950, y2: UST, stroke: '#5b678f', 'stroke-width': 2 }, g);
    let n = 0;
    const hucre = (x, orta, satirlar, o = {}) => satirlar.map((metin, i) => {
      const el = K.yazi(c, g, x, orta + 9 + (i - (satirlar.length - 1) / 2) * 38, metin, { size: 26, hiza: 'start', ...o });
      el.style.opacity = 0;
      return el;
    });
    return {
      g,
      satir(ad, ...hucreler) {
        const orta = UST + n * H + H / 2; n++;
        c.S('line', { x1: 50, y1: UST + n * H, x2: 950, y2: UST + n * H, stroke: '#2f3a5c', 'stroke-width': 2 }, g);
        const son = hucreler.length - 1;
        return { ad: hucre(60, orta, [ad], { size: 28, renk: R, kalin: 700 })[0], h: hucreler.map((satirlar, i) => hucre(basliklar[i][0], orta, satirlar, i === son ? { renk: SORUN } : {})) };
      },
    };
  }

  /* ---- Sahne 1 · Görev aksarsa: demir, iyot, flor ---- */
  async function gorev(c) {
    const s = c.svg(1000, 562);
    const giris = K.kart(c, s, 150, 160, 700, 220, 'Mineral yeterince alınmazsa', ['Görevi aksar', 'Sağlık sorunu ortaya çıkar'], { renk: R });
    await K.belir(c, giris);
    await c.say('Bir mineral yeterince alınmazsa onun gördüğü iş aksar.');
    await sil(c, giris);
    const t = tablo(c, s, [[250, 'Görev'], [610, 'Eksikliğinde']], 3);
    const fe = t.satir('Demir', ['Kanda oksijen', 'taşınması'], ['Kansızlık,', 'çabuk yorulma']);
    const i = t.satir('İyot', ['Tiroksin hormonunun', 'üretimi'], ['Basit guatr']);
    const f = t.satir('Flor', ['Kemik ve diş', 'yapısını korur'], ['?']);
    await K.belir(c, t.g);
    await goster(c, fe.ad, ...fe.h[0]);
    await c.say('Demir, kanda oksijenin taşınmasında görev alıyordu.');
    await goster(c, ...fe.h[1]);
    await c.say('Demir eksikliğinde kansızlık görülür; kişi çabuk yorulur.');
    await goster(c, i.ad, ...i.h[0]);
    await c.say('İyot, tiroksin hormonunun üretimi için gerekliydi.');
    await goster(c, ...i.h[1]);
    await c.say('İyot eksikliğinde basit guatr adı verilen hastalık ortaya çıkar.');
    await goster(c, f.ad, ...f.h[0], ...f.h[1]);
    await c.say('Flor ise kemik ve diş yapısını koruyordu.');
    await c.choice({ q: 'Flor eksikliğinde hangi sorun beklenir?',
      options: ['Kansızlık', 'Basit guatr', 'Diş çürüğü'], answer: 2,
      hints: ['Kansızlık demir eksikliğinde görülür.', 'Basit guatr iyot eksikliğinde görülür.', ''],
      right: 'Dişin yapısını koruyan mineral eksik olunca diş çürüğü görülür.' });
    f.h[1][0].textContent = 'Diş çürüğü';
    await c.say('Eksiklik, mineralin görev aldığı yerde sorun yaratır.', { speak: '[thoughtful] Eksiklik, mineralin görev aldığı yerde sorun yaratır.' });
    c.note('<b>Mineral eksikse görevi aksar.</b><br>Demir: kansızlık. İyot: basit guatr. Flor: diş çürüğü.', 'Görev aksarsa');
  }

  /* ---- Sahne 2 · Kemik, kas ve kalp: kalsiyum, fosfor, potasyum, magnezyum ---- */
  async function kemik(c) {
    const s = c.svg(1000, 562), t = tablo(c, s, [[330, 'Eksikliğinde']], 4);
    const ca = t.satir('Kalsiyum', ['Raşitizm, osteoporoz', '(D vitamini de yetersizse)']);
    const p = t.satir('Fosfor', ['Güçsüzlük, kemik bozukluğu']);
    const k = t.satir('Potasyum', ['Kas yorgunluğu, düzensiz kalp atışı']);
    const mg = t.satir('Magnezyum', ['Sinir ve kas çalışması bozulur']);
    await K.belir(c, t.g);
    await goster(c, ca.ad, p.ad);
    await c.say('Kalsiyum ve fosfor kemik gelişiminde görev alıyordu.');
    await goster(c, ...p.h[0]);
    await c.say('Fosfor eksikliğinde güçsüzlük ve kemik bozukluğu görülür.');
    await goster(c, ...ca.h[0]);
    await c.say('Kalsiyum ve D vitamini yetersizse çocuklarda raşitizm, yaşlılarda osteoporoz görülür.',
      { speak: 'Kalsiyum ve de vitamini yetersizse çocuklarda raşitizm, yaşlılarda osteoporoz görülür.' });
    await goster(c, k.ad);
    await c.say('Potasyum sinir sisteminin çalışmasında görev alıyordu.');
    await goster(c, ...k.h[0]);
    await c.say('Eksikliğinde kaslar çabuk yorulur, kalp atışları düzensizleşir.');
    await goster(c, mg.ad, ...mg.h[0]);
    await c.say('Magnezyum eksikliğinde sinirlerin ve kasların çalışması bozulur.');
    await c.choice({ tag: 'Uygula', q: 'Potasyum meyve ve sebzelerde bulunur. Bunları hiç yemeyen biri için hangi risk artar?',
      options: ['Kas yorgunluğu ve kalp atışlarında düzensizlik', 'Diş çürüğü', 'Basit guatr'], answer: 0,
      hints: ['', 'Diş çürüğü flor eksikliğinde görülür.', 'Basit guatr iyot eksikliğinde görülür.'],
      right: 'Meyve ve sebze yemeyen kişi potasyumu yeterince alamaz.' });
    c.note('<b>Kalsiyum ve fosfor eksikse kemik, potasyum ve magnezyum eksikse kas etkilenir.</b>', 'Kemik, kas ve kalp');
  }

  /* ---- Sahne 3 · Sıvı dengesi, saç, bağışıklık: sodyum, klor, kükürt, çinko ---- */
  async function denge(c) {
    const s = c.svg(1000, 562), t = tablo(c, s, [[330, 'Eksikliğinde']], 4);
    const na = t.satir('Sodyum', ['Kas yorgunluğu, iştah azalması']);
    const cl = t.satir('Klor', ['Kas krampları, kusma']);
    const ku = t.satir('Kükürt', ['Sağlıksız saç, cilt ve tırnak']);
    const zn = t.satir('Çinko', ['?']);
    await K.belir(c, t.g);
    await goster(c, na.ad, cl.ad);
    await c.say('Sodyum ve klor vücudun su ve sıvı dengesinde görev alıyordu.');
    await goster(c, ...na.h[0]);
    await c.say('Sodyum eksikliğinde kaslar yorulur, iştah azalır.');
    await goster(c, ...cl.h[0]);
    await c.say('Klor eksikliğinde kas krampları ve kusma görülür.');
    await goster(c, ku.ad, ...ku.h[0]);
    await c.say('Kükürt eksikliğinde saç, cilt ve tırnaklar sağlıksız olur.');
    await goster(c, zn.ad, ...zn.h[0]);
    await c.say('Çinko, bağışıklık sisteminin gelişiminde görev alıyordu.');
    await c.choice({ q: 'Çinko eksikliğinde ne beklenir?',
      options: ['Diş çürüğü', 'Bağışıklığın zayıflaması', 'Kansızlık'], answer: 1,
      hints: ['Diş çürüğü flor eksikliğinde görülür.', '', 'Kansızlık demir eksikliğinde görülür.'],
      right: 'Bağışıklık sisteminin gelişiminde görev alan mineral eksik olunca bağışıklık zayıflar.' });
    zn.h[0][0].textContent = 'Bağışıklığın zayıflaması';
    await c.say('Çinko eksikliğinde bağışıklık zayıflar.');
    c.note('<b>Eksiklik sorunu mineralden minerale değişir.</b><br>Çinko: bağışıklığın zayıflaması.', 'Eksiklik sorunları');
  }

  /* ---- Sahne 4 · Yeterli ve dengeli beslenme ---- */
  async function tabak(c) {
    const s = c.svg(1000, 562), g = c.S('g', {}, s);
    await K.belir(c, K.kart(c, g, 60, 150, 420, 220, 'Yeterli beslenme', ['Besinleri', 'ihtiyaç kadar almak'], { renk: R }));
    await c.say('Yeterli beslenme, vücudun ihtiyacı kadar besin almaktır.');
    await K.belir(c, K.kart(c, g, 520, 150, 420, 220, 'Dengeli beslenme', ['Farklı besinleri', 'uygun oranlarda almak'], { renk: SORUN }));
    await c.say('Dengeli beslenme, farklı besinleri uygun oranlarda almaktır.');
    await sil(c, g);
    const besin = (x, y, ad, mineral) => K.kart(c, s, x, y, 420, 150, ad, [mineral], { renk: R, size: 28 });
    await goster(c, besin(60, 100, 'Süt ürünleri', 'Kalsiyum'), besin(520, 100, 'Et, balık, yumurta', 'Demir, çinko, iyot'));
    await c.say('Mineraller farklı besinlere dağılmıştır: süt ürünlerinde kalsiyum, ette demir ve çinko.');
    await goster(c, besin(60, 300, 'Meyve ve sebze', 'Potasyum, magnezyum'), besin(520, 300, 'Tahıl ve kuru yemiş', 'Fosfor, magnezyum'));
    await c.say('Meyve ve sebzeler potasyum; tahıllar ve kuru yemişler fosfor sağlar.');
    await c.choice({ tag: 'Uygula', q: 'Selin her öğünde yalnızca makarna ve ekmek yiyor. Hangi yorum doğrudur?',
      options: ['Tahıl yediği için bütün mineralleri alır.', 'Mineraller vücutta üretildiği için sorun olmaz.', 'Süt, et, meyve ve sebzedeki mineraller eksik kalır.'], answer: 2,
      hints: ['Tahıllar bazı mineralleri sağlar; kalsiyum ve potasyum başka besinlerdedir.', 'Vücut mineralleri üretemez; hepsi besinlerle alınır.', ''],
      right: 'Tek tür besin, öteki besinlerdeki mineralleri sağlayamaz.' });
    await c.say('Tek tür besinle beslenen kişide bazı mineraller eksik kalır.');
    await c.choice({ tag: 'Uygula', q: 'Kahvaltıda yalnızca çay içip ekmek yiyorsun. Kalsiyum için tabağa ne eklersin?',
      options: ['Peynir ya da yoğurt', 'Bir bardak çay daha', 'Bir dilim ekmek daha'], answer: 0,
      hints: ['', 'Çay flor sağlar; kalsiyum süt ürünlerindedir.', 'Ekmek bir tahıl ürünüdür; kalsiyum süt ürünlerindedir.'],
      right: 'Peynir ve yoğurt süt ürünüdür; kalsiyum sağlar.' });
    await c.say('Yeterli ve dengeli beslenme, mineral eksikliğinden doğan sorunları en aza indirir.');
    await c.say('Çeşitli beslenme, eksiklik riskini azaltır.', { speak: 'Çeşitli beslenme, [short pause] eksiklik riskini azaltır.' });
    c.note('<b>Çeşitli beslenme, eksiklik riskini azaltır.</b><br>Süt ürünü, et, sebze, meyve ve tahıl birlikte.', 'Dengeli beslenme');
  }

  Ders.start({
    id: 'yasam-e5', kicker: 'Konu E · İnorganik moleküller', title: 'Yeterli ve dengeli beslenme', accent: R, back: 'index.html',
    intro: { title: 'Yeterli ve dengeli beslenme', hook: 'Her gün yalnızca makarna yiyen birinin vücudunda ne eksik kalır?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Görev aksarsa', goal: 'Eksikliği mineralin göreviyle bağla.', run: gorev },
      { title: 'Kemik, kas ve kalp', goal: 'Dört mineralin eksikliğini tanı.', run: kemik },
      { title: 'Sıvı dengesi, saç, bağışıklık', goal: 'Dört mineralin eksikliğini tanı.', run: denge },
      { title: 'Yeterli ve dengeli beslenme', goal: 'Bir öğünü mineral açısından değerlendir.', run: tabak },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Demir kanda oksijen taşınmasında görev alır. Eksikliğinde hangisi görülür?', options: ['Kansızlık ve çabuk yorulma', 'Diş çürüğü', 'Basit guatr'], answer: 0,
        why: ['Oksijen taşıyan mineral eksik olunca kansızlık görülür.', 'Diş çürüğü flor eksikliğinde görülür.', 'Basit guatr iyot eksikliğinde görülür.'], scene: 0 },
      { q: 'Mineral eksikliğinden doğan sorunları en aza indirmenin yolu hangisidir?', options: ['Her gün aynı tek besini yemek', 'Farklı besinleri yeterli ve dengeli tüketmek', 'Yalnızca sofra tuzunu artırmak'], answer: 1,
        why: ['Tek besin, öteki besinlerdeki mineralleri sağlayamaz.', 'Mineraller farklı besinlere dağılmıştır; çeşitlilik eksiklik riskini azaltır.', 'Sofra tuzu sodyum ve klor sağlar; öteki mineraller başka besinlerdedir.'], scene: 3 },
    ], summary: ['<b>Çeşitli beslenme, eksiklik riskini azaltır.</b>', 'Bir mineral eksik kalırsa onun görevi aksar; mineraller farklı besinlere dağılmıştır.'],
    nextLesson: { href: 'f1-kur-ve-sok.html', label: 'Sonraki: Büyük molekülü kur, sök ›' },
  });
})();
