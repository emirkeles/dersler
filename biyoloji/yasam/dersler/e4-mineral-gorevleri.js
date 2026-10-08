/* E4 · BİY.9.1.5 · Yazar notu: içerik MEB Biyoloji 9 s. 170 (Form 8, "Mineraller ve Görevleri" çalışma kâğıdı: on bir mineralin
   işlevleri ve bulunduğu besinler) ve s. 51 (mineraller bünyede üretilemez, dışarıdan alınır). Her mineral için kitabın saydığı
   görev ve besinlerden bir bölümü alındı; eksiklik sütunu E5'tedir. Anlatım 8 Ekim 2026'da baştan yazıldı
   (plan/biyoloji/yasam/PLAN.md "Anlatımın gözden geçirilmesi"): mineraller görevlerine göre dört grupta, küçük tablolarla
   anlatılır; her grubun sonunda bir uygulama sorusu vardır. */
(() => {
  'use strict';
  const K = KIT, R = K.renkler.E, SOLUK = 'var(--muted)', VURGU = 'var(--c5)';
  const KOL = [60, 250, 610];                       // sütun başlangıçları: mineral, görev, besin
  const sil = (c, el) => c.tween(300, (e) => { el.style.opacity = 1 - e; }).then(() => el.remove());
  const goster = (c, ...ogeler) => Promise.all(ogeler.map((el) => K.belir(c, el, 350)));

  /* Üç sütunlu tablo. satir() hücreleri gizli çizer; anlatım sırası geldikçe goster() ile açılır. */
  function tablo(c, s, adet) {
    const g = c.S('g', {}, s), UST = 92, H = adet === 2 ? 180 : 132;
    K.yazi(c, g, KOL[1], 68, 'Görev', { size: 24, renk: SOLUK, hiza: 'start' });
    K.yazi(c, g, KOL[2], 68, 'Besin', { size: 24, renk: SOLUK, hiza: 'start' });
    c.S('line', { x1: 50, y1: UST, x2: 950, y2: UST, stroke: '#5b678f', 'stroke-width': 2 }, g);
    let n = 0;
    const hucre = (x, orta, satirlar, o = {}) => satirlar.map((metin, i) => {
      const el = K.yazi(c, g, x, orta + 9 + (i - (satirlar.length - 1) / 2) * 38, metin, { size: 26, hiza: 'start', ...o });
      el.style.opacity = 0;
      return el;
    });
    return {
      g,
      satir(ad, gorev, besin) {
        const orta = UST + n * H + H / 2; n++;
        c.S('line', { x1: 50, y1: UST + n * H, x2: 950, y2: UST + n * H, stroke: '#2f3a5c', 'stroke-width': 2 }, g);
        return { ad: hucre(KOL[0], orta, [ad], { size: 28, renk: R, kalin: 700 })[0], gorev: hucre(KOL[1], orta, gorev), besin: hucre(KOL[2], orta, besin) };
      },
    };
  }

  /* ---- Sahne 1 · Kemik ve diş: kalsiyum, fosfor, flor ---- */
  async function kemik(c) {
    const s = c.svg(1000, 562);
    const giris = K.kart(c, s, 150, 160, 700, 220, 'Mineraller', ['Vücut üretemez', 'Besinlerle ve suyla alınır'], { renk: R });
    await K.belir(c, giris);
    await c.say('Mineralleri vücut üretemez; besinlerle ve içme suyuyla alırız.');
    await sil(c, giris);
    const t = tablo(c, s, 3);
    const ca = t.satir('Kalsiyum', ['Kemik gelişimi,', 'kas kasılması'], ['Süt ürünleri,', 'fındık']);
    const p = t.satir('Fosfor', ['Kemik gelişimi,', 'enerji metabolizması'], ['Tahıl, kuru yemiş']);
    const f = t.satir('Flor', ['Kemik, diş yapısı'], ['Çay, balık, su']);
    await K.belir(c, t.g);
    await c.say('Her mineralin vücutta bir görevi ve bulunduğu besinler vardır.');
    await goster(c, ca.ad, ...ca.gorev);
    await c.say('Kalsiyum, kemiklerin gelişmesinde ve kasların kasılmasında görev alır.');
    await goster(c, ...ca.besin);
    await c.say('Süt ve süt ürünlerinde, brokolide ve fındıkta bulunur.');
    await goster(c, p.ad, ...p.gorev);
    await c.say('Fosfor kas ve kemik gelişiminde, ayrıca enerji metabolizmasında görev alır.');
    await goster(c, ...p.besin);
    await c.say('Tahıllarda, kuru yemişlerde ve proteince zengin besinlerde bulunur.');
    await goster(c, f.ad, ...f.gorev);
    await c.say('Flor, kemik ve diş yapısını korur.');
    await goster(c, ...f.besin);
    await c.say('Çayda, balıkta ve içme suyunda bulunur.');
    await c.choice({ tag: 'Uygula', q: 'Kemikleri gelişen bir çocuk için hangi mineral, hangi besinle alınır?',
      options: ['Kalsiyum, çayla', 'Flor, süt ürünleriyle', 'Kalsiyum, süt ürünleriyle'], answer: 2,
      hints: ['Mineral doğru; ama çay flor kaynağıdır.', 'Süt ürünlerindeki mineral kalsiyumdur; flor çayda, balıkta ve suda bulunur.', ''],
      right: 'Kalsiyum kemik gelişiminde görev alır ve süt ürünlerinde bulunur.' });
    c.note('<b>Kemik ve diş: kalsiyum (Ca), fosfor (P), flor (F).</b><br>Süt ürünleri, tahıllar, çay.', 'Kemik ve diş');
  }

  /* ---- Sahne 2 · Sinir ve su dengesi: sodyum, potasyum, klor ---- */
  async function sinir(c) {
    const s = c.svg(1000, 562), t = tablo(c, s, 3);
    const na = t.satir('Sodyum', ['Sinir sistemi,', 'su dengesi'], ['Tuz, ekmek,', 'maden suyu']);
    const k = t.satir('Potasyum', ['Sinir sistemi,', 'su dengesi'], ['Muz, incir, patates']);
    const cl = t.satir('Klor', ['Sıvı dengesi, sindirim'], ['Sofra tuzu']);
    await K.belir(c, t.g);
    await goster(c, na.ad, na.gorev[0], k.ad, k.gorev[0]);
    await c.say('Sodyum ve potasyum sinir sisteminin çalışmasında görev alır.');
    await goster(c, na.gorev[1], k.gorev[1]);
    await c.say('İkisi de vücudun su dengesinin korunmasında görev alır.');
    await goster(c, ...na.besin);
    await c.say('Sodyum tuzda, ekmekte ve maden suyunda bulunur.');
    await goster(c, ...k.besin);
    await c.say('Potasyum muz, incir ve patates gibi meyve ve sebzelerde bulunur.');
    await goster(c, cl.ad, ...cl.gorev);
    await c.say('Klor, vücudun sıvı dengesinde görev alır; sindirime de yardım eder.');
    await goster(c, ...cl.besin);
    await c.say('Klorun kaynağı sofra tuzudur.');
    await c.choice({ tag: 'Uygula', q: 'Muz ve patates yiyen biri hangi minerali alır; bu mineral ne iş görür?',
      options: ['Potasyum; sinir sisteminin çalışmasında görev alır', 'Klor; sindirime yardım eder', 'Potasyum; diş yapısını korur'], answer: 0,
      hints: ['', 'Klorun kaynağı sofra tuzudur.', 'Mineral doğru; ama diş yapısını koruyan flordur.'],
      right: 'Potasyum meyve ve sebzelerde bulunur; sinir sistemi ve su dengesi için gereklidir.' });
    c.note('<b>Sinir ve su dengesi: sodyum (Na), potasyum (K), klor (Cl).</b><br>Tuz, muz, patates.', 'Sinir ve su dengesi');
  }

  /* ---- Sahne 3 · Oksijen ve hormon: demir, iyot ---- */
  async function kan(c) {
    const s = c.svg(1000, 562), t = tablo(c, s, 2);
    const fe = t.satir('Demir', ['Kanda oksijen', 'taşınması'], ['Kırmızı et, yumurta,', 'yeşil yapraklı sebze']);
    const i = t.satir('İyot', ['Tiroksin hormonunun', 'üretimi'], ['Deniz ürünleri,', 'yeşil yapraklı sebze']);
    await K.belir(c, t.g);
    await goster(c, fe.ad, ...fe.gorev);
    await c.say('Demir, kanda oksijenin taşınmasında görev alır.');
    await goster(c, ...fe.besin);
    await c.say('Kırmızı et, yumurta sarısı ve yeşil yapraklı sebzeler demir içerir.');
    await goster(c, i.ad, ...i.gorev);
    await c.say('İyot, tiroksin hormonunun üretimi için gereklidir.');
    i.gorev.forEach((el) => { el.style.fill = VURGU; });
    await c.say('Tiroksin büyümenin, gelişmenin ve metabolizmanın kontrolünde görevlidir.', { speak: '[thoughtful] Tiroksin büyümenin, gelişmenin ve metabolizmanın kontrolünde görevlidir.' });
    i.gorev.forEach((el) => { el.style.fill = 'var(--text)'; });
    await goster(c, ...i.besin);
    await c.say('İyot deniz ürünlerinde ve yeşil yapraklı sebzelerde bulunur.');
    await c.choice({ tag: 'Uygula', q: 'Tabloya göre hangi besin hem demir hem iyot sağlar?',
      options: ['Kırmızı et', 'Yeşil yapraklı sebzeler', 'Deniz ürünleri'], answer: 1,
      hints: ['Kırmızı et demir sağlar; iyot kaynakları arasında geçmedi.', '', 'Deniz ürünleri iyot sağlar; demir kaynakları arasında geçmedi.'],
      right: 'Yeşil yapraklı sebzeler iki satırda da var.' });
    [fe.besin[1], i.besin[1]].forEach((el) => { el.style.fill = VURGU; });
    await c.say('Bir besin birden çok minerali birlikte sağlayabilir.');
    c.note('<b>Demir (Fe) oksijen taşır; iyot (I) tiroksin üretimi içindir.</b><br>Kırmızı et, deniz ürünleri.', 'Oksijen ve hormon');
  }

  /* ---- Sahne 4 · Enzim, protein, bağışıklık: magnezyum, kükürt, çinko ---- */
  async function enzim(c) {
    const s = c.svg(1000, 562), t = tablo(c, s, 3);
    const mg = t.satir('Magnezyum', ['Enzimlerin çalışması,', 'enerji metabolizması'], ['Badem, fındık, ceviz']);
    const ku = t.satir('Kükürt', ['Protein sentezi'], ['Et, deniz ürünleri']);
    const zn = t.satir('Çinko', ['Bağışıklık, enzimlerin', 'çalışması'], ['Et, yumurta,', 'kabak çekirdeği']);
    await K.belir(c, t.g);
    await goster(c, mg.ad, ...mg.gorev);
    await c.say('Magnezyum, enzimlerin çalışmasında ve enerji metabolizmasında görev alır.');
    await goster(c, ...mg.besin);
    await c.say('Badem, fındık, ceviz ve koyu yeşil yapraklı sebzeler magnezyum içerir.');
    await goster(c, ku.ad, ...ku.gorev);
    await c.say('Kükürt, protein sentezinde yani proteinlerin yapımında görev alır.');
    await goster(c, ...ku.besin);
    await c.say('Et, deniz ürünleri ve kuru yemişler kükürt içerir.');
    await goster(c, zn.ad, ...zn.gorev);
    await c.say('Çinko, bağışıklık sisteminin gelişiminde ve enzimlerin çalışmasında görev alır.');
    await goster(c, ...zn.besin);
    await c.say('Kırmızı et, yumurta ve kabak çekirdeği çinko içerir.');
    await c.choice({ tag: 'Uygula', q: 'Bağışıklık sisteminin gelişimi için hangi mineral, hangi besinle alınır?',
      options: ['Kükürt, bademle', 'Magnezyum, deniz ürünleriyle', 'Çinko, yumurta ve kabak çekirdeğiyle'], answer: 2,
      hints: ['Kükürt protein sentezinde görev alır; badem de magnezyum kaynağıdır.', 'Magnezyum enzimlerin çalışmasında görev alır; bademde, fındıkta bulunur.', ''],
      right: 'Çinko bağışıklık sisteminin gelişiminde görev alır; yumurtada ve kabak çekirdeğinde bulunur.' });
    await c.say('Mineraller üretilmez, besinle alınır; her birinin kendi görevleri vardır.',
      { speak: 'Mineraller üretilmez, besinle alınır; [short pause] her birinin kendi görevleri vardır.' });
    c.note('<b>Enzimler: magnezyum (Mg), çinko (Zn). Protein sentezi: kükürt (S).</b><br>Kuru yemiş, et, yumurta.', 'Enzim ve protein');
  }

  Ders.start({
    id: 'yasam-e4', kicker: 'Konu E · İnorganik moleküller', title: 'Mineraller ne iş görür?', accent: R, back: 'index.html',
    intro: { title: 'Mineraller ne iş görür?', hook: 'Sütteki, çaydaki ve muzdaki mineraller vücutta ne iş görür?', button: 'Derse başla ›' },
    goals: [],
    scenes: [
      { title: 'Kemik ve diş', goal: 'Kalsiyum, fosfor ve floru besiniyle eşleştir.', run: kemik },
      { title: 'Sinir ve su dengesi', goal: 'Sodyum, potasyum ve kloru besiniyle eşleştir.', run: sinir },
      { title: 'Oksijen ve hormon', goal: 'Demir ve iyodun görevini besinle bağla.', run: kan },
      { title: 'Enzim, protein, bağışıklık', goal: 'Magnezyum, kükürt ve çinkoyu besiniyle eşleştir.', run: enzim },
    ], quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Tiroksin hormonunun üretimi için gereken mineral hangisidir ve nerede bulunur?', options: ['Demir, kırmızı ette', 'İyot, deniz ürünlerinde', 'Klor, sofra tuzunda'], answer: 1,
        why: ['Demir kanda oksijenin taşınmasında görev alır.', 'İyot tiroksin üretimi için gereklidir; deniz ürünlerinde bulunur.', 'Klor sıvı dengesinde ve sindirimde görev alır.'], scene: 2 },
      { q: 'Bir avuç fındık yiyen biri hangi iki minerali birlikte alır?', options: ['Kalsiyum ve magnezyum', 'Flor ve klor', 'İyot ve sodyum'], answer: 0,
        why: ['Fındık hem kalsiyum hem magnezyum kaynağıdır.', 'Flor çayda, balıkta ve içme suyunda; klor sofra tuzunda bulunur.', 'İyot deniz ürünlerinde, sodyum tuzda ve ekmekte bulunur.'], scene: 3 },
      { q: 'Sibel, kanında oksijenin taşınmasında görev alan minerali almak istiyor. Tabağına hangisini eklemelidir?',
        options: ['Bir yumurta sarısı', 'Bir bardak çay', 'Bir dilim peynir'], answer: 0,
        why: ['Yumurta sarısı demir içerir; demir kanda oksijenin taşınmasında görev alır.', 'Çay flor kaynağıdır; flor kemik ve diş yapısını korur.', 'Süt ürünleri kalsiyum sağlar; oksijeni taşıyan mineral demirdir.'], scene: 2 },
      { q: 'Duru: “Mineraller aynı işi yapar; kalsiyum alırsam kanım oksijeni de taşır.” Bu cümle için hangisi doğrudur?',
        options: ['Doğru; kalsiyum kemiklerin yanında kanda oksijenin taşınmasında da görev alır.', 'Yanlış; kanda oksijeni kalsiyum değil, flor taşır.', 'Yanlış; her mineralin görevi ayrıdır, oksijen taşınmasında demir görev alır.'], answer: 2,
        why: ['Kalsiyum kemik ve kas işlerinde görev alır; oksijen taşınmasında görevi yoktur.', 'Flor kemik ve diş yapısını korur; oksijen taşınmasında demir görev alır.', 'Kalsiyum kemik gelişiminde ve kas kasılmasında görev alır; oksijeni demir taşır.'], scene: 2 },
    ], summary: ['<b>Mineraller üretilmez, besinle alınır; her birinin kendi görevi vardır.</b>', 'Kalsiyum kemikte, demir kanda, iyot tiroksinde, sodyum ve potasyum sinirde görev alır.'],
    nextLesson: { href: 'e5-dengeli-beslenme.html', label: 'Sonraki: Yeterli ve dengeli beslenme ›' },
  });
})();
