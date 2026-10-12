/* F3 — Konu tekrarı: Isı iletim hızı ve yalıtım
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından sekiz soru gelir.
   Senaryo: plan/fizik/enerji/senaryolar/F-isi-iletim-hizi-ve-yalitim.md (F3). Çizimler şematiktir, sayı taşımaz.
   Konu F'nin araç dosyası yok; kalınlığı değişen ısı oku bu dosyada kurulur (okKalin). */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, gizle, belir, par, yon, ileri } = window.KIT;
  const { lerp, ease } = Ders;
  const S = { isi: RENK.isi, sicaklik: RENK.sicaklik, soguk: RENK.soguk };
  const ust = 20, alt = 290;               // iki satırın üst kenarı
  const X = [170, 500, 830];               // üç sütunun ortası
  const METAL = '#cfd8e3', TAHTA = '#c8a273';

  /* Kuralın kısa etiketi: renkli ad ve altında isteğe bağlı tek satır (tam cümle altyazıda ve defterde). */
  function etiket(c, g, cx, y0, ad, renk, alt2) {
    yazi(c, g, cx, y0 + 198, ad, { size: 30, kalin: 700, renk });
    if (alt2) yazi(c, g, cx, y0 + 230, alt2, { size: 24, kalin: 600 });
  }

  /* Kalınlığı değişebilen ısı oku: baş, çizgi kalınlığıyla birlikte büyür (yarı genişlik >= 0,9 · kalınlık). */
  function okKalin(c, p, P, Q, w) {
    const g = c.S('g', {}, p), hat = c.S('line', { stroke: S.isi, 'stroke-linecap': 'round' }, g), uc = c.S('path', { fill: S.isi }, g);
    const ciz = (P2, Q2, w2) => {
      const a = yon(P2, Q2), hl = 12 + w2 * 1.6, hw = 6 + w2 * 0.9, taban = ileri(Q2, a, -hl);
      const s1 = ileri(taban, a + Math.PI / 2, hw), s2 = ileri(taban, a - Math.PI / 2, hw);
      hat.setAttribute('x1', P2[0]); hat.setAttribute('y1', P2[1]); hat.setAttribute('x2', taban[0]); hat.setAttribute('y2', taban[1]);
      hat.setAttribute('stroke-width', w2);
      uc.setAttribute('d', `M${Q2[0]},${Q2[1]} L${s1[0]},${s1[1]} L${s2[0]},${s2[1]} Z`);
    };
    ciz(P, Q, w);
    return { g, ciz };
  }

  /* ---- 1. Her katı ısıyı kendi hızında iletir: bir ucu sıcak suda metal ve tahta kaşık, sap ucunda farklı kalınlıkta ok ---- */
  function kasik(c, g, cx, y0) {
    const su = kutu(c, g, cx - 150, y0 + 8, 62, 154, { rx: 10, dolgu: S.soguk, renk: S.soguk });
    su.setAttribute('fill-opacity', 0.3);
    [[y0 + 52, METAL, 14], [y0 + 124, TAHTA, 4]].forEach(([y, renk, w]) => {
      c.S('ellipse', { cx: cx - 117, cy: y, rx: 23, ry: 15, fill: renk }, g);
      c.S('rect', { x: cx - 100, y: y - 8, width: 160, height: 16, rx: 5, fill: renk }, g);
      okKalin(c, g, [cx + 72, y], [cx + 148, y], w);
    });
  }

  /* ---- 2. Isı iletim hızı: birim zamanda aktarılan ısı, birimi watt ("watt" yazısı ve bir ok) ---- */
  function iletimHizi(c, g) {
    const y = ust + 0;
    yazi(c, g, X[1], y + 66, 'watt', { size: 46, kalin: 700, renk: S.isi });
    okKalin(c, g, [X[1] - 120, y + 120], [X[1] + 120, y + 120], 9);
  }

  /* ---- 3. Yüzey alanı ve sıcaklık farkı: büyüyen levha, farkı büyüyen iki sarı sütun ---- */
  function alanFark(c, g) {
    const cx = X[2], yb = ust + 165, px = cx - 85;
    cizgi(c, g, [cx - 140, yb], [cx + 125, yb], RENK.ince, 3);
    const levha = c.S('rect', { rx: 6, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    const s1 = c.S('rect', { x: cx + 15, width: 34, rx: 6, fill: S.sicaklik }, g);
    const s2 = c.S('rect', { x: cx + 75, width: 34, rx: 6, fill: S.sicaklik }, g);
    const kur = (s, h1) => {
      levha.setAttribute('x', px - s / 2); levha.setAttribute('y', yb - s); levha.setAttribute('width', s); levha.setAttribute('height', s);
      s1.setAttribute('y', yb - h1); s1.setAttribute('height', h1);
      s2.setAttribute('y', yb - 55); s2.setAttribute('height', 55);
    };
    kur(50, 70);
    return { git: (c2) => c2.tween(700, (e) => kur(lerp(50, 90, e), lerp(70, 140, e)), ease.inOut) };
  }

  /* ---- 4. Kalınlık: duvar kalınlaşır, ok incelir ---- */
  function kalinlik(c, g) {
    const cx = X[0], y0 = alt, ym = y0 + 85;
    const duvar = c.S('rect', { x: cx - 110, y: y0 + 10, height: 150, rx: 6, fill: RENK.yuzey, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    const o = okKalin(c, g, [cx, ym], [cx + 145, ym], 14);
    const kur = (w, ow) => { duvar.setAttribute('width', w); o.ciz([cx - 110 + w + 14, ym], [cx + 145, ym], ow); };
    kur(30, 14);
    return { git: (c2) => c2.tween(700, (e) => kur(lerp(30, 100, e), lerp(14, 4, e)), ease.inOut) };
  }

  /* ---- 5. Katsayı: büyük ve küçük kartları, iletken–yalıtkan ayracı ---- */
  function katsayi(c, g) {
    const cx = X[1], y0 = alt;
    cizgi(c, g, [cx, y0], [cx, y0 + 172], RENK.ince, 3, { 'stroke-dasharray': '10 8' });
    kutu(c, g, cx - 140, y0 + 4, 130, 56, { rx: 14 }); yazi(c, g, cx - 75, y0 + 41, 'büyük', { size: 26 });
    kutu(c, g, cx + 10, y0 + 4, 130, 56, { rx: 14 }); yazi(c, g, cx + 75, y0 + 41, 'küçük', { size: 26 });
    okKalin(c, g, [cx - 125, y0 + 105], [cx - 25, y0 + 105], 12);
    okKalin(c, g, [cx + 25, y0 + 105], [cx + 125, y0 + 105], 4);
    yazi(c, g, cx - 75, y0 + 158, 'iletken', { size: 26, kalin: 700, renk: S.isi });
    yazi(c, g, cx + 75, y0 + 158, 'yalıtkan', { size: 26, kalin: 700, renk: S.soguk });
  }

  /* ---- 6. Yalıtım: duvarın iki yanında kış ve yaz okları, ikisi de ince ---- */
  function yalitim(c, g) {
    const cx = X[2], y0 = alt;
    kutu(c, g, cx - 25, y0 + 8, 50, 150, { rx: 6 });
    okKalin(c, g, [cx + 120, y0 + 62], [cx - 120, y0 + 62], 4);
    okKalin(c, g, [cx - 120, y0 + 126], [cx + 120, y0 + 126], 4);
    yazi(c, g, cx + 85, y0 + 42, 'kış', { size: 26, kalin: 700, renk: S.soguk });
    yazi(c, g, cx - 85, y0 + 106, 'yaz', { size: 26, kalin: 700, renk: S.sicaklik });
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const onceki = [];
    const kural = async (yap, cumle, opt = {}) => {
      const g = c.S('g', {}, svg); const r = yap(c, g) || {}; gizle(g);
      c.clearSay();
      await par(c.say(cumle, opt.speak ? { speak: opt.speak } : undefined), belir(c, g, 400), ...onceki.map((e) => belir(c, e, 400, 0.45)), r.git ? r.git(c) : null);
      await c.wait(400);
      onceki.push(g);
    };

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Isı iletim hızı ve yalıtım', { size: 56, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konuda öğrendiklerimizi altı kuralda toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    await kural((c2, g) => { kasik(c2, g, X[0], ust); etiket(c2, g, X[0], ust, 'her katı', S.isi, 'kendi hızı'); }, 'Her katı ısıyı kendi hızında iletir.');
    c.note('Her katı ısıyı kendi hızında iletir.', 'Katılar farklı', 'en-f3-kati');
    await kural((c2, g) => { iletimHizi(c2, g); etiket(c2, g, X[1], ust, 'iletim hızı', S.isi); },
      'Birim zamanda aktarılan ısı, ısı iletim hızıdır; birimi watt.', { speak: 'Birim zamanda aktarılan ısı, ısı iletim hızıdır; birimi vat.' });
    c.note('Birim zamanda aktarılan ısı; birimi watt.', 'İletim hızı', 'en-f3-hiz');
    await kural((c2, g) => { const r = alanFark(c2, g); etiket(c2, g, X[2], ust, 'alan, sıcaklık farkı', S.sicaklik, 'artar'); return r; },
      'Yüzey alanı ve sıcaklık farkı arttıkça ısı iletim hızı artar.');
    c.note('Alan ve sıcaklık farkı arttıkça hız artar.', 'Artıran etkenler', 'en-f3-alan');
    await kural((c2, g) => { const r = kalinlik(c2, g); etiket(c2, g, X[0], alt, 'kalınlık', RENK.cizgi, 'hız azalır'); return r; },
      'Kalınlık arttıkça ısı iletim hızı azalır.');
    c.note('Kalınlık arttıkça ısı iletim hızı azalır.', 'Kalınlık', 'en-f3-kalin');
    await kural((c2, g) => { katsayi(c2, g); etiket(c2, g, X[1], alt, 'katsayı', S.isi); },
      'Katsayısı büyük madde iletken, küçük madde yalıtkandır.');
    c.note('Büyükse iletken, küçükse yalıtkan.', 'Katsayı', 'en-f3-katsayi');
    await kural((c2, g) => { yalitim(c2, g); etiket(c2, g, X[2], alt, 'yalıtım', S.soguk, 'yavaşlatır'); },
      'Yalıtım ısıyı durdurmaz; iki yönde de yavaşlatır.');
    c.note('Isıyı durdurmaz; iki yönde de yavaşlatır.', 'Yalıtım', 'en-f3-yalitim');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'enerji-f3', kicker: 'Konu F · Isı iletim hızı ve yalıtım', title: 'Konu tekrarı: Isı iletim hızı ve yalıtım', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Isı iletim hızı ve yalıtım',
      hook: 'Isı iletim hızının kuralları aklında mı? Önce altı kuralı topla, sonra <b>sekiz soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Konunun altı kuralını hatırlar.', 'Kuralları farklı durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Çıplak ayakla odaya giren Ela, fayansı aynı odadaki ahşap parkeden daha soğuk hissediyor. Hangisi doğrudur?',
        options: ['Fayansın sıcaklığı parkeden düşüktür', 'Fayans ayaktan ısıyı daha hızlı alır; ikisinin sıcaklığı aynıdır', 'Parke ayağa ısı verir'], answer: 1,
        why: ['Aynı odadaki iki yüzey aynı sıcaklıktadır; fark, ısı iletim hızındadır.', 'Fayans ısıyı parkeden hızlı iletir; ayaktan ısıyı hızlı alması soğuk hissettirir.', 'Ayak parkeden sıcaktır; ısı ayaktan parkeye aktarılır.'], scene: 0,
      },
      {
        q: 'Aynı maddeden, aynı alanda iki levha var; biri ince, öteki kalın. İkisi de aynı iki ortamı ayırıyor. Hangisinden ısı daha hızlı geçer?',
        options: ['İnce levhadan', 'Kalın levhadan', 'İkisinden de aynı hızla'], answer: 0,
        why: ['Kalınlık azaldıkça ısı iletim hızı artar; ince levhadan ısı daha hızlı geçer.', 'Kalınlık arttıkça ısı iletim hızı azalır; kalın levhadan ısı daha yavaş geçer.', 'Madde ve alan aynı olsa da kalınlıklar farklıdır; hızlar eşit olmaz.'], scene: 0,
      },
      {
        q: 'Aynı düzenekte üç çubuk deneniyor; ısı iletim katsayıları: cam yünü 0,04, saf alüminyum 205, cam 0,8. Uçların ısınma sırası (en çabuktan en geçe) hangisidir?',
        options: ['Cam yünü, cam, alüminyum', 'Cam, alüminyum, cam yünü', 'Alüminyum, cam, cam yünü'], answer: 2,
        why: ['Sıra tersine yazılmış; katsayısı en küçük olan cam yünü en geç ısınır.', 'Alüminyumun katsayısı camınkinden çok büyüktür; en çabuk alüminyum ısınır.', 'Katsayısı büyük olan ısıyı hızlı iletir; sıra alüminyum, cam, cam yünü olur.'], scene: 0,
      },
      {
        q: 'Klimalı bir odanın içi 24 °C. Dışarısı bir gün 30 °C, ertesi gün 40 °C. Dışarıdan içeriye ısı hangi gün daha hızlı gelir?',
        options: ['30 °C’lik gün; dışarısı daha serin', '40 °C’lik gün; sıcaklık farkı daha büyük', 'İkisinde de aynı hızda'], answer: 1,
        why: ['Dışarısı serin olduğunda sıcaklık farkı küçüktür; fark küçükse ısı daha yavaş gelir.', 'Sıcaklık farkı arttıkça ısı iletim hızı artar; 40 °C’lik günde fark daha büyüktür.', 'İçerisi aynı kalsa da dışarısı değişir; fark değişince hız da değişir.'], scene: 0,
      },
      {
        q: 'Yalıtımlı bir evin duvarı için hangisi doğrudur?',
        options: ['Isı geçişi yavaşlar; kışın da yazın da işe yarar', 'Isı geçişi tamamen durur', 'Yalnızca kışın işe yarar'], answer: 0,
        why: ['Yalıtım ısı geçişini her iki yönde de yavaşlatır.', 'Yalıtım ısıyı durdurmaz, yalnızca yavaşlatır.', 'Yalıtım yazın dışarıdan gelen ısıyı da yavaşlatır.'], scene: 0,
      },
      {
        q: 'Bir odanın penceresi küçültülüp tek camlıdan çift camlıya çevriliyor. Isı iletim hızı nasıl değişir?',
        options: ['Değişmez; pencere hâlâ camdır', 'Artar; cam sayısı arttı', 'Azalır; alan küçülür ve iki cam arasındaki hava yavaşlatır'], answer: 2,
        why: ['Pencerenin alanı küçüldü ve araya hava girdi; ısı iletim hızı değişir.', 'Cam sayısı artsa da alan küçüldü ve aradaki hava ısıyı yavaşlatır; hız artmaz.', 'Alan küçüldükçe hız azalır; iki cam arasındaki hava da ısı geçişini yavaşlatır.'], scene: 0,
      },
      {
        q: 'Bir tencerenin gövdesi metal, sapı yalıtkan malzemedendir. Bunun nedeni hangisidir?',
        options: ['İkisi de ısıyı hızlı iletmeli', 'Gövde ısıyı yemeğe hızlı iletmeli; sap yavaş iletmeli', 'İkisi de ısıyı yavaş iletmeli'], answer: 1,
        why: ['Sap da ısıyı hızlı iletseydi tutarken elimiz yanardı.', 'Gövde ısıyı yemeğe hızlı iletir; sap ısıyı yavaş ilettiği için elimiz yanmaz.', 'Gövde ısıyı yavaş iletseydi yemek geç pişerdi.'], scene: 0,
      },
      {
        q: 'Isı iletim hızının birimi hangisidir?',
        options: ['Joule', 'Derece santigrat', 'Joule bölü saniye (watt)'], answer: 2,
        why: ['Joule enerjinin birimidir; zaman içermediği için hız birimi olmaz.', 'Derece santigrat sıcaklığın birimidir.', 'Isı iletim hızı, birim zamanda aktarılan ısıdır; birimi joule bölü saniye, yani watt’tır.'], scene: 0,
      },
    ],
    summary: [
      '<b>Isı iletim hızı alan ve sıcaklık farkıyla artar, kalınlıkla azalır; yalıtım ısıyı yavaşlatır.</b>',
      'Isı iletim hızının birimi watt; katsayısı büyük madde iletken, küçük madde yalıtkandır.',
      'Yalıtım ısıyı durdurmaz; kışın da yazın da ısı geçişini yavaşlatır.',
    ],
  });
})();
