/* D2 — Bu bilgi güvenilir mi? Kaynaktan mesleğe (FİZ.9.1.4 c, ç, d)
   Senaryo: plan/fizik/fizik-bilimi-ve-kariyer-kesfi/senaryolar/D-kariyer-kesfi.md
   Doğru bilgiler ders kitabından: s. 40–41 (kurumlar, makine mühendisliği dersleri), s. 43 (kariyer olanakları).
   "Örnek" diye adlandırılan kaynak kartları uydurmadır (KURALLAR.md 2.3). Güvenilirlik ölçütleri sitenin seçimidir. */
(() => {
  'use strict';
  const { RENK, buyuk, yazi, kutu, cizgi, gizle, belir, par, sar, kart, etiket, yer, sirayla, daire } = window.KIT;

  /* Kartı (x, y) noktasına doğru küçülterek gönderir ve kaldırır. */
  const gonder = async (c, k, x, y) => {
    await c.tween(600, (e) => { yer(k.g, k.x + (x - k.x) * e, k.y + (y - k.y) * e, 1 - 0.9 * e); k.g.style.opacity = 1 - e; });
    k.g.remove();
  };
  /* Alt sırada yan yana hedef kutuları; her kutu aldığı kartları nokta olarak sayar. */
  function hedefler(c, svg, adlar, renk, y = 350) {
    const w = (880 - (adlar.length - 1) * 20) / adlar.length;
    return adlar.map((ad, i) => {
      const x = 60 + i * (w + 20);
      const cerceve = kutu(c, svg, x, y, w, 120, { renk });
      yazi(c, svg, x + w / 2, y + 48, ad, { size: 23, renk });
      return { cerceve, x, y, w, n: 0 };
    });
  }
  const say1 = (c, svg, h) => { c.S('circle', { cx: h.x + h.w / 2 - 30 + h.n * 30, cy: h.y + 88, r: 10, fill: RENK.iyi }, svg); h.n++; };

  /* ---- 1. İki kaynak ---- */
  async function ikiKaynak(c) {
    const svg = c.svg(1000, 562);
    const a = kart(c, svg, 40, 130, 440, 250, { baslik: 'Örnek gönderi: yazarı ve tarihi yok', metin: '“ASELSAN’da yalnızca mühendisler çalışır.”', renk: RENK.cizgi, kesik: true, size: 25 });
    const b = kart(c, svg, 520, 130, 440, 250, { baslik: 'Ders kitabı, s. 40', metin: '“Uzmanlaşmış fizikçiler ve fizik mühendisleri de bu çalışanlar arasındadır.”', renk: RENK.kaynak, size: 25 });
    gizle(a.g, b.g);
    await c.say('Bir kurumu ya da mesleği araştırırken bilgi toplarsın.');
    await c.say('Her bilginin bir <b>kaynağı</b> vardır: onu yazan kişi ya da kurum.');
    await belir(c, a.g); await belir(c, b.g);
    await c.say('İki kaynak, ASELSAN için iki ayrı şey söylüyor.');
    await c.choice({
      tag: 'Tahmin et', q: 'Hangisine güvenirsin?',
      options: ['Gönderiye: daha kısa ve net', 'Ders kitabına: kimin yazdığı belli', 'İkisine de aynı ölçüde'], answer: 1,
      hints: ['Kısa olması doğru olduğunu göstermez. Kim yazmış?', '', 'İkisi çelişiyor; ikisi birden doğru olamaz.'],
      right: 'Evet. Kaynağı belli olan bilgi sınanabilir.',
    });
    await belir(c, a.g, 400, 0.3);
    await c.say('Bilgiye güvenmeden önce <b>kaynağına</b> bakılır.');
  }

  /* ---- 2. Kaynağı sına ---- */
  const KAYNAKLAR = [
    { metin: 'Kurumun kendi sitesinde, tarihli bir duyuru', kutu: 0, gerekce: 'Yazan belli, bilgi ilk elden, tarihi var.' },
    { metin: 'Yazarı da tarihi de olmayan bir gönderi', kutu: 1, gerekce: 'Kimin, ne zaman yazdığı belli değil.' },
    { metin: 'MEB ders kitabı', kutu: 0, gerekce: 'Yazan ve yayımlayan belli.' },
    { metin: 'Kaynak göstermeyen, tarihi belli olmayan bir site', kutu: 1, gerekce: 'Bilginin nereden geldiği belli değil.' },
  ];
  async function kaynagiSina(c) {
    const svg = c.svg(1000, 562);
    const H = hedefler(c, svg, ['güvenilir', 'sınanmalı'], RENK.kaynak);
    await c.say('Dört örnek kaynağı iki kutuya ayıracaksın.');
    c.say('Kaynak hangi kutuya girer?', { noWait: true });
    let k = null;
    await sirayla(c, KAYNAKLAR, {
      tag: 'Kaynağı sına', soru: 'Bu kaynak hangi kutuya girer?', secenekler: () => ['Güvenilir', 'Sınanmalı'], dogru: (o) => o.kutu,
      ipucu: () => 'Kim yazmış, ne zaman yazmış? İkisi de belli mi?', gerekce: (o) => o.gerekce,
      goster: async (o) => { k = kart(c, svg, 150, 40, 700, 170, { baslik: 'Örnek kaynak', metin: o.metin, renk: RENK.kaynak, kesik: o.kutu === 1, size: 26 }); gizle(k.g); await belir(c, k.g, 300); },
      yerlestir: async (o) => { const h = H[o.kutu]; await gonder(c, k, h.x + h.w / 2, h.y + 80); say1(c, svg, h); },
      bekle: 1200,
    });
    const S = ['Kim yazdı?', 'İlk elden mi?', 'Güncel mi?'].map((s, i) => etiket(c, svg, 220 + i * 280, 130, s, { renk: RENK.kaynak, size: 24, w: 240, h: 64 }).g);
    gizle(S);
    for (const s of S) await belir(c, s, 300);
    await c.say('Bir kaynağı bu üç soruyla sınarsın.');
    c.note('<b>Kaynağı sına:</b> kim yazdı, ilk elden mi, güncel mi?', 'Kaynak', 'kaynak');
    await c.say('Sınanmalı, yanlış demek değildir; başka kaynakla doğrulanır.');
  }

  /* ---- 3. Bilgi doğru mu? ---- */
  const NOT = [
    ['Ders kitabı, s. 40', 'TENMAK’ta fizikçiler nükleer santrallerin güvenliği üzerine çalışır.'],
    ['Ders kitabı, s. 41', 'NASA ve ESA’da astrofizikçiler yıldız ve galaksileri araştırır.'],
  ];
  const IDDIA = [
    { not: 0, metin: 'TENMAK’ta fizikçiler santral güvenliği üzerine çalışır.', uyar: 0, gerekce: 'Evet. Not da aynı şeyi söylüyor.' },
    { not: 0, metin: 'TENMAK’ta fizikçiler uzay aracı üretir.', uyar: 1, gerekce: 'Evet. Notta böyle bir bilgi yok.' },
    { not: 1, metin: 'NASA’da astrofizikçiler yıldızları ve galaksileri araştırır.', uyar: 0, gerekce: 'Evet. Not da aynı şeyi söylüyor.' },
  ];
  async function bilgiDogruMu(c) {
    const svg = c.svg(1000, 562);
    let n = null, hangi = -1, k = null;
    const notKoy = async (i) => {
      if (i === hangi) return;
      const eski = n; hangi = i;
      n = kart(c, svg, 150, 30, 700, 190, { baslik: 'Notum · ' + NOT[i][0], metin: NOT[i][1], renk: RENK.kaynak, size: 25 });
      gizle(n.g);
      await par(belir(c, n.g, 300), eski ? belir(c, eski.g, 200, 0) : null);
      if (eski) eski.g.remove();
    };
    await notKoy(0);
    await c.say('Bulduğun bilgiyi <b>kaynağıyla birlikte</b> not edersin.');
    await c.say('Sonra duyduğun her cümleyi notunla karşılaştırırsın.');
    c.say('Cümle notla uyuşuyor mu?', { noWait: true });
    await sirayla(c, IDDIA, {
      tag: 'Karşılaştır', soru: 'Alttaki cümle notla uyuşuyor mu?', secenekler: () => ['Notla uyuşuyor', 'Notta yok'], dogru: (o) => o.uyar,
      ipucu: (o) => (o.uyar ? 'Notu yeniden oku: bu iş geçiyor mu?' : 'Notu yeniden oku: aynı işi anlatıyor.'), gerekce: (o) => o.gerekce,
      goster: async (o) => {
        await notKoy(o.not);
        k = kart(c, svg, 150, 290, 700, 150, { metin: o.metin, renk: RENK.cizgi, kesik: true, size: 24 });
        gizle(k.g); await belir(c, k.g, 300);
      },
      yerlestir: async (o) => {
        k.kutu.setAttribute('stroke', o.uyar ? RENK.kotu : RENK.iyi); k.kutu.removeAttribute('stroke-dasharray');
        await c.wait(900);
        await belir(c, k.g, 250, 0); k.g.remove();
      },
      bekle: 300,
    });
    await c.say('Notta olmayan bilgi, doğrulanana kadar kullanılmaz.');
  }

  /* ---- 4. Dersten mesleğe ---- */
  const DERSLER = [
    { metin: 'Mukavemet: kuvvet etkisindeki cisimlerin dayanıklılığı', kutu: 0, gerekce: 'Kuvvet ve denge, mekaniğin konusudur.' },
    { metin: 'Isı transferi: ısı ve ısı iletimi', kutu: 1, gerekce: 'Isı ve sıcaklık, termodinamiğin konusudur.' },
    { metin: 'Nanoteknolojilere giriş: üretim yöntemleri ve uygulamaları', kutu: 2, gerekce: 'Nanoteknoloji, katı hâl fiziğinin uygulama alanlarındandır.' },
  ];
  const DAL3 = ['mekanik', 'termodinamik', 'katı hâl fiziği'];
  async function derstenMeslege(c) {
    const svg = c.svg(1000, 562);
    const H = hedefler(c, svg, DAL3, RENK.dal);
    await c.say('Bir makine mühendisi üniversitede bu dersleri alır.');
    c.say('Ders fiziğin hangi alt dalına dayanır?', { noWait: true });
    let k = null;
    await sirayla(c, DERSLER, {
      tag: 'Çıkarım yap', soru: 'Bu ders fiziğin hangi alt dalına dayanır?', secenekler: () => DAL3.map(buyuk), dogru: (o) => o.kutu,
      ipucu: () => 'Dersin açıklamasındaki konuya bak.', gerekce: (o) => o.gerekce,
      goster: async (o) => { k = kart(c, svg, 150, 40, 700, 170, { baslik: 'Makine mühendisliği dersi', metin: o.metin, renk: RENK.kurum, size: 25 }); gizle(k.g); await belir(c, k.g, 300); },
      yerlestir: async (o) => { const h = H[o.kutu]; await gonder(c, k, h.x + h.w / 2, h.y + 80); say1(c, svg, h); },
      bekle: 1200,
    });
    const s = kart(c, svg, 150, 60, 700, 150, { metin: 'Makine mühendisi fiziğin üç alt dalından yararlanır.', renk: RENK.fizik, size: 27 });
    gizle(s.g); await belir(c, s.g);
    await c.say('Derslere bakıp mesleğin hangi dallardan yararlandığını çıkardın.');
  }

  /* ---- 5. Yol haritası ---- */
  const ALAN = ['akademik kariyer', 'bilgi teknolojileri', 'eğitim', 'medikal fizik', 'araştırma geliştirme'];
  const DURAK = ['lise', 'fizik bölümü', 'yüksek lisans ya da doktora', 'medikal fizik'];
  const SEC = ['Yüksek lisans ya da doktora', 'Üniversitede fizik bölümü', 'Medikal fizik'];
  async function yolHaritasi(c) {
    const svg = c.svg(1000, 562);
    const ax = [148, 350, 503, 640, 838];
    const A = ALAN.map((a, i) => etiket(c, svg, ax[i], 70, a, { renk: RENK.kurum, size: 19 }));
    gizle(A.map((a) => a.g));
    for (const a of A) await belir(c, a.g, 250);
    await c.say('Fizik okuyanların önünde beş kariyer alanı var.');
    A[3].kutu.setAttribute('stroke', RENK.fizik); A[3].kutu.setAttribute('stroke-width', 3);
    await c.say('Birini seçelim: medikal fiziğe giden yolu çizeceğiz.');
    const Y = 300, X = [130, 380, 630, 880];
    const hat = cizgi(c, svg, X[0], Y, X[0], Y, RENK.ince, 5);
    const durak = (i) => {
      const g = c.S('g', {}, svg);
      daire(c, g, X[i], Y, 13, { fill: i === 3 ? RENK.fizik : RENK.kurum });
      const t = yazi(c, g, X[i], Y + 50, '', { size: 21 });
      sar(c, t, DURAK[i], 200, X[i], 27);
      gizle(g); return g;
    };
    await belir(c, durak(0));
    c.say('Sıradaki durağı seç.', { noWait: true });
    await sirayla(c, [1, 2, 3], {
      tag: 'Yol haritası', soru: (i) => `<b>${buyuk(DURAK[i - 1])}</b> durağından sonra hangisi gelir?`,
      secenekler: () => SEC, dogru: (i) => [1, 0, 2][i - 1],
      ipucu: (i) => ['Üniversite, liseden hemen sonra gelir.', 'Uzmanlıktan önce bir eğitim daha var.', 'Yolun sonu, seçtiğimiz kariyer alanı.'][i - 1],
      gerekce: (i) => ['Yol üniversitede fizik bölümüyle başlar.', 'Mezunlar yüksek lisans ya da doktorayla uzmanlaşır.', 'Yol seçtiğimiz alana, medikal fiziğe vardı.'][i - 1],
      goster: async () => {},
      yerlestir: async (i) => { await c.tween(600, (e) => hat.setAttribute('x2', X[i - 1] + (X[i] - X[i - 1]) * e)); await belir(c, durak(i)); },
      bekle: 900,
    });
    const alt = yazi(c, svg, 500, 470, 'radyoloji, nükleer tıp, radyoterapi', { size: 23, renk: RENK.fizik });
    gizle(alt); await belir(c, alt);
    await c.say('Medikal fizikte radyoloji, nükleer tıp ve radyoterapi alanlarında çalışılır.');
    await c.say('Önce kaynağı sına, sonra bilgiye güven.');
  }

  Ders.start({
    id: 'fizik-bilimi-ve-kariyer-kesfi-d2', kicker: 'Konu D · Fizik bilimi ile ilgili kariyer keşfi', title: 'Bu bilgi güvenilir mi? Kaynaktan mesleğe',
    accent: '#c792ff', back: 'index.html',
    intro: { title: 'Bu bilgi güvenilir mi? Kaynaktan mesleğe', hook: 'Bir meslek hakkında iki sitede iki ayrı bilgi okudun; hangisine güveneceğine nasıl karar verirsin?', button: 'Derse başla ›' },
    goals: ['Fizikle ilişkili çalışmalar ve meslekler hakkında bilgi toplar, doğruluğunu değerlendirir.', 'Fiziğin çalışma alanlarından yararlanan meslekler hakkında çıkarım yapar.'],
    scenes: [
      { title: 'İki kaynak', goal: 'Çelişen iki bilgide önce kaynağa bak.', run: ikiKaynak },
      { title: 'Kaynağı sına', goal: 'Kaynakları güvenilir ve sınanmalı diye ayır.', run: kaynagiSina },
      { title: 'Bilgi doğru mu?', goal: 'Bir cümleyi kaynaklı notunla karşılaştır.', run: bilgiDogruMu },
      { title: 'Dersten mesleğe', goal: 'Bir mesleğin yararlandığı alt dalları çıkar.', run: derstenMeslege },
      { title: 'Yol haritası', goal: 'Bir kariyer alanına giden yolu sırala.', run: yolHaritasi },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Hangisi öncelikle sınanması gereken bir kaynaktır?', options: ['Yazarı ve tarihi belli olmayan bir site', 'Kurumun kendi sitesindeki tarihli duyuru', 'MEB ders kitabı'], answer: 0,
        why: ['Evet. Kimin, ne zaman yazdığı belli değil.', 'Yazan belli, bilgi ilk elden ve tarihli.', 'Yazan ve yayımlayan belli.'], scene: 1 },
      { q: 'Isı transferi dersi alan bir makine mühendisi, fiziğin hangi alt dalından yararlanır?', options: ['Optik', 'Nükleer fizik', 'Termodinamik'], answer: 2,
        why: ['Optik ışık olaylarını inceler.', 'Nükleer fizik atom çekirdeğini inceler.', 'Evet. Isı ve sıcaklık termodinamiğin konusudur.'], scene: 3 },
    ],
    summary: ['<b>Önce kaynağı sına, sonra bilgiye güven.</b>', 'Kaynağa üç soru: <b>kim yazdı, ilk elden mi, güncel mi?</b>'],
  });
})();
