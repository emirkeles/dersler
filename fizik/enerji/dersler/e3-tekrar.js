/* E3 — Konu tekrarı: Isı aktarım yolları
   Yeni bilgi yok. Tek sahnede konunun altı kuralı tahtada sırayla toplanır; ardından sekiz soru gelir.
   Senaryo: plan/fizik/enerji/senaryolar/E-isi-aktarim-yollari.md (E3). Çizimler şematiktir, sayı taşımaz.
   Konu E'nin araç dosyası yoktur: kuralların küçük çizimleri bu dosyada düz vektörle kurulur;
   yalnızca sahne boyunca süren tek döngü için KIT_A.motor kullanılır. */
(() => {
  'use strict';
  const { RENK, yazi, kutu, cizgi, gizle, belir, par, ok } = window.KIT;
  const { motor } = window.KIT_A;
  const { lerp, clamp, ease } = Ders;
  const IC = '#0c1226', TANE = '#9cc2ff', TAU = Math.PI * 2;
  const X = [190, 500, 810];            // üç sütunun ortası
  const CY = [125, 360];                // iki satırın çizim merkezi
  const ETIKET = [232, 475];            // iki satırın etiket (kural adı) taban çizgisi

  /* Kuralın kısa etiketi: renkli ad ve altında tek satır (tam cümle altyazıda ve defterde). */
  function etiket(c, g, cx, y0, ad, renk, alt) {
    yazi(c, g, cx, y0, ad, { size: 28, kalin: 700, renk });
    yazi(c, g, cx, y0 + 32, alt, { size: 22, kalin: 600 });
  }
  const tane = (c, p, x, y, r = 8) => c.S('circle', { cx: x, cy: y, r, fill: TANE, stroke: IC, 'stroke-width': 1.5 }, p);
  const halka = (c, p, x, y, r = 13) => c.S('circle', { cx: x, cy: y, r, fill: 'none', stroke: RENK.isi, 'stroke-width': 3 }, p);

  /* ---- 1. Ortam yolu belirler: katı, akışkan, boşluk ---- */
  function ortam(c, g, mot, cx, cy) {
    const bx = [cx - 80, cx, cx + 80], y0 = cy - 54, k = 64;
    const renk = [RENK.kutle, RENK.soguk, RENK.gri], ad = ['katı', 'akışkan', 'boşluk'];
    bx.forEach((x, i) => {
      const r = kutu(c, g, x - k / 2, y0, k, k, { rx: 10, renk: renk[i], w: 3 });
      if (i === 2) r.setAttribute('stroke-dasharray', '7 6');
      yazi(c, g, x, y0 + k + 30, ad[i], { size: 20, kalin: 600, renk: renk[i] });
    });
    const ym = y0 + k / 2;
    [-16, 0, 16].forEach((dx) => [-16, 0, 16].forEach((dy) => tane(c, g, bx[0] + dx, ym + dy, 5)));
    [[-15, -17], [13, -19], [-4, 1], [17, 9], [-17, 16]].forEach(([dx, dy]) => tane(c, g, bx[1] + dx, ym + dy, 5));
  }

  /* ---- 2. İletim: tanecik şeridinde ısı dalgası soldan sağa ---- */
  function iletim(c, g, mot, cx, cy) {
    const n = 5, ara = 44, x0 = cx - ara * 2, y = cy - 8;
    kutu(c, g, cx - 110, y - 32, 220, 64, { rx: 14, dolgu: IC, renk: RENK.ince });
    const q = [];
    for (let i = 0; i < n; i++) {
      c.S('circle', { cx: x0 + i * ara, cy: y + 24, r: 3, fill: RENK.gri }, g);
    }
    for (let i = 0; i < n; i++) {
      const h = halka(c, g, x0 + i * ara, y, 13); h.style.opacity = 0;
      q.push({ el: tane(c, g, x0 + i * ara, y, 8), h, ph: i * 1.3 });
    }
    let t = 0;
    mot.ekle((dt) => {
      t = (t + dt) % 4.4;
      q.forEach((p, i) => {
        const sicak = clamp((t - i * 0.42) / 0.4, 0, 1) * (1 - clamp((t - 3.5) / 0.6, 0, 1));
        p.ph += dt * TAU / lerp(0.6, 0.35, sicak);
        const x = x0 + i * ara + Math.sin(p.ph) * lerp(3, 8, sicak);
        p.el.setAttribute('cx', x); p.h.setAttribute('cx', x); p.h.style.opacity = sicak;
      });
    });
  }

  /* ---- 3. Konveksiyon: halkalı tanecikler yukarı, halkasızlar aşağı ---- */
  function konveksiyon(c, g, mot, cx, cy) {
    c.S('circle', { cx, cy, r: 62, fill: IC, stroke: RENK.ince, 'stroke-width': 2 }, g);
    const q = [];
    for (let i = 0; i < 8; i++) {
      const h = halka(c, g, cx, cy); h.style.opacity = 0;
      q.push({ el: tane(c, g, cx, cy), h, a: i * Math.PI / 4 });
    }
    let t = 0;
    const ciz = () => q.forEach((p) => {
      const a = p.a - t * TAU / 6, x = cx + 38 * Math.cos(a), y = cy + 38 * Math.sin(a);
      p.el.setAttribute('cx', x); p.el.setAttribute('cy', y);
      p.h.setAttribute('cx', x); p.h.setAttribute('cy', y); p.h.style.opacity = clamp(Math.cos(a) * 2.5, 0, 1);
    });
    ciz();
    mot.ekle((dt) => { t += dt; ciz(); });
  }

  /* ---- 4. Işıma: Güneş'ten Dünya'ya, boşlukta yayılan dalga yayları ---- */
  function isima(c, g, mot, cx, cy) {
    const sx = cx - 90, ex = cx + 90, a = 28 * Math.PI / 180;
    c.S('circle', { cx: ex, cy, r: 14, fill: '#1c3a78', stroke: RENK.soguk, 'stroke-width': 3 }, g);
    const yaylar = [0, 1, 2].map(() => c.S('path', { fill: 'none', stroke: RENK.isi, 'stroke-width': 4, 'stroke-linecap': 'round' }, g));
    c.S('circle', { cx: sx, cy, r: 22, fill: RENK.isi }, g);
    let t = 0;
    const ciz = () => yaylar.forEach((y, i) => {
      const u = (t / 3 + i / 3) % 1, R = lerp(28, 150, u);
      y.setAttribute('d', `M${sx + R * Math.cos(a)},${cy - R * Math.sin(a)} A${R},${R} 0 0 1 ${sx + R * Math.cos(a)},${cy + R * Math.sin(a)}`);
      y.setAttribute('stroke-opacity', lerp(0.9, 0.2, u));
    });
    ciz();
    mot.ekle((dt) => { t += dt; ciz(); });
  }

  /* ---- 5. Koyu renk çok soğurur: koyu araba güçlü, açık araba zayıf parlar ---- */
  function arabalar(c, g, mot, cx, cy) {
    const parlamalar = [];
    [[cy - 66, '#2b2f3f', 0.8], [cy + 9, '#dfe4f4', 0.35]].forEach(([y, dolgu, deger]) => {
      const parla = c.S('rect', { x: cx - 59, y: y - 4, width: 118, height: 60, rx: 14, fill: RENK.isi, 'fill-opacity': 0 }, g);
      parlamalar.push({ parla, deger });
      const gv = { fill: dolgu, stroke: RENK.cizgi, 'stroke-width': 3 };
      c.S('rect', Object.assign({ x: cx - 30, y, width: 60, height: 22, rx: 8 }, gv), g);
      c.S('rect', Object.assign({ x: cx - 55, y: y + 20, width: 110, height: 28, rx: 8 }, gv), g);
      [-32, 32].forEach((dx) => c.S('circle', Object.assign({ cx: cx + dx, cy: y + 48, r: 7 }, gv), g));
    });
    return parlamalar;
  }

  /* ---- 6. Sera etkisi: atmosfer, gelen ok, dönen ok ---- */
  function sera(c, g, mot, cx, cy) {
    const b = c.S('rect', { x: cx - 100, y: cy - 44, width: 200, height: 30, rx: 8, fill: RENK.soguk, 'fill-opacity': 0.25, stroke: RENK.soguk, 'stroke-width': 2 }, g);
    cizgi(c, g, [cx - 100, cy + 62], [cx + 100, cy + 62], RENK.gri, 5);
    ok(c, g, [cx - 55, cy - 66], [cx - 55, cy + 54], RENK.isi, 5);
    ok(c, g, [cx, cy + 54], [cx, cy - 10], RENK.isi, 5);
    ok(c, g, [cx + 8, cy - 8], [cx + 52, cy + 50], RENK.isi, 5);
    const kacan = ok(c, g, [cx + 85, cy + 54], [cx + 85, cy - 66], RENK.isi, 5);
    kacan.g.style.opacity = 0.45;
    return b;
  }

  /* ---- Tek sahne: konunun kuralları ---- */
  async function kurallar(c) {
    const svg = c.svg(1000, 562);
    const mot = motor(c);
    const onceki = [];
    const kural = async (yap, sat, sut, cumle, ad, renk, alt, hareket) => {
      const g = c.S('g', {}, svg); const r = yap(c, g, mot, X[sut], CY[sat]);
      etiket(c, g, X[sut], ETIKET[sat], ad, renk, alt); gizle(g);
      c.clearSay();
      await par(c.say(cumle), belir(c, g, 400), ...onceki.map((e) => belir(c, e, 400, 0.45)), hareket ? hareket(r) : null);
      await c.wait(400);
      onceki.push(g);
    };

    const baslik = c.S('g', {}, svg); yazi(c, baslik, 500, 300, 'Isı aktarım yolları', { size: 64, kalin: 700 }); gizle(baslik);
    await par(c.say('Bu konudaki kuralları altı cümlede toplayalım.'), belir(c, baslik, 400));
    await belir(c, baslik, 300, 0); baslik.remove();

    await kural(ortam, 0, 0, 'Isının yolunu, geçtiği ortam belirler.', 'ortam', RENK.yazi, 'yolu belirler');
    c.note('Isının yolunu, geçtiği ortam belirler.', 'Ortam', 'en-e3-ortam');
    await kural(iletim, 0, 1, 'İletim: maddesel ortamda ısı, tanecikten taneciğe geçer.', 'iletim', RENK.kutle, 'titreşim');
    c.note('Maddesel ortamda tanecikten taneciğe geçer.', 'İletim', 'en-e3-iletim');
    await kural(konveksiyon, 0, 2, 'Konveksiyon: akışkanda yer değiştiren tanecikler ısıyı yayar.', 'konveksiyon', RENK.soguk, 'yer değiştirme');
    c.note('Akışkanda yer değiştiren tanecikler ısıyı yayar.', 'Konveksiyon', 'en-e3-konv');
    await kural(isima, 1, 0, 'Işıma: ısı elektromanyetik dalgalarla yayılır; maddesel ortam gerekmez.', 'ışıma', RENK.isi, 'boşlukta da');
    c.note('Elektromanyetik dalgalarla yayılır; maddesel ortam gerekmez.', 'Işıma', 'en-e3-isima');
    await kural(arabalar, 1, 1, 'Koyu renkli nesneler ışımayı daha fazla soğurur.', 'koyu renk', RENK.cizgi, 'çok soğurur',
      (pl) => c.tween(600, (e) => pl.forEach((p) => p.parla.setAttribute('fill-opacity', p.deger * e)), ease.out));
    c.note('Koyu renkli nesneler ışımayı daha fazla soğurur.', 'Soğurma', 'en-e3-sogurma');
    await kural(sera, 1, 2, 'Atmosfer, yeryüzünün ışımasının bir kısmını tutar: sera etkisi.', 'sera etkisi', RENK.isi, 'tutulan ışıma');
    c.note('Atmosfer, yeryüzünün ışımasının bir kısmını tutar.', 'Sera etkisi', 'en-e3-sera');
    await belir(c, onceki, 500, 1);
  }

  Ders.start({
    id: 'enerji-e3', kicker: 'Konu E · Isı aktarım yolları', title: 'Konu tekrarı: Isı aktarım yolları', accent: '#6ea8ff', back: 'index.html',
    intro: {
      title: 'Konu tekrarı: Isı aktarım yolları',
      hook: 'Isı hangi yollarla aktarılır? Önce altı kuralı topla, sonra <b>sekiz soruyla</b> kendini sına.',
      button: 'Tekrara başla ›',
    },
    goals: ['Isı aktarım yollarının kurallarını hatırlar.', 'Kuralları farklı durumlardaki sorularda uygular.'],
    scenes: [
      { title: 'Konunun kuralları', goal: 'Konunun altı kuralını bir arada gör.', run: kurallar },
    ],
    quizTitle: 'Sorular',
    quiz: [
      {
        q: 'Kışın güneşe dönük oturan kedinin sırtı ısınıyor. Isı Güneş’ten kediye hangi yolla gelir?',
        options: ['Konveksiyon', 'İletim', 'Işıma'], answer: 2,
        why: ['Konveksiyon için akışkan gerekir; Güneş’ten gelen ısı boşluktan da geçer.', 'İletim maddesel ortam ister; Güneş ile Dünya arasında boşluk vardır.', 'Güneş’ten gelen ısı elektromanyetik dalgalarla yayılır; boşluktan da geçer. Bu yola ışıma denir.'], scene: 0,
      },
      {
        q: 'Fırından çıkan tepsinin metal kulpunu tutan Ela’nın eli yanıyor. Isı kulpta hangi yolla ilerlemiştir?',
        options: ['İletim', 'Konveksiyon', 'Işıma'], answer: 0,
        why: ['Metal kulp maddesel ortamdır; ısı tanecikten taneciğe geçer. Bu yola iletim denir.', 'Konveksiyon akışkanda olur; kulp akışkan değildir.', 'Işıma dalgalarla yayılır; kulpta ısı tanecikten taneciğe ilerler.'], scene: 0,
      },
      {
        q: 'Bir kazanın tabanındaki ısıtıcı suyu ısıtıyor. Suyun tamamının ısınması hangi yolla olur?',
        options: ['İletim; tanecikler yerinde titreyerek ısıyı yayar', 'Konveksiyon; sıcak su yükselir, soğuk su iner', 'Işıma; ısı yalnızca dalgalarla geçer'], answer: 1,
        why: ['Su akışkandır; ısıyı yer değiştiren tanecikler yayar, yerinde titreyenler değil.', 'Su akışkandır; ısınan su yükselir, soğuk su iner ve yer değiştiren tanecikler ısıyı yayar.', 'Işıma maddesel ortam gerektirmez, ama suyun tamamının ısınması yer değiştiren taneciklerle olur.'], scene: 0,
      },
      {
        q: '“Isı yalnızca bir maddenin içinde yayılabilir.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; ışıma da madde ister', 'Doğrudur; boşlukta konveksiyon olur', 'Yanlıştır; ışıma boşlukta da yayılır'], answer: 2,
        why: ['Işıma maddesel ortam gerektirmez; cümle bu yüzden yanlıştır.', 'Konveksiyon akışkan ister; boşlukta akışkan yoktur.', 'Işıma elektromanyetik dalgalarla yayılır; boşlukta da geçer.'], scene: 0,
      },
      {
        q: 'Havası boşaltılmış odada çalışan elektrikli ısıtıcının karşısındaki el ısınıyor. Hangi yol etkilidir?',
        options: ['Işıma', 'Konveksiyon', 'İletim'], answer: 0,
        why: ['Işıma için maddesel ortam gerekmez; havası boşaltılmış odada da etkilidir.', 'Konveksiyon için akışkan gerekir; havası boşaltılmış odada akışkan yoktur.', 'İletim maddesel ortam ister; havası boşaltılmış odada ısıtıcı ile el arasında madde yoktur.'], scene: 0,
      },
      {
        q: '“Petekler tavana yakın konsa oda daha çabuk ısınır.” Bu cümle için ne söylenir?',
        options: ['Doğrudur; sıcak hava aşağı iner', 'Yanlıştır; zemine yakın petek, odadaki havanın tamamını dolaştırır', 'Doğrudur; ısı yalnızca yukarıya doğru yayılır'], answer: 1,
        why: ['Sıcak hava aşağı inmez, yükselir.', 'Zemine yakın petekte ısınan hava yükselir, soğuk hava iner; hava dolaşır ve oda ısınır.', 'Isı yalnızca yukarıya doğru yayılmaz; yükselen sıcak havanın yerini soğuk hava alır.'], scene: 0,
      },
      {
        q: 'Güneşte aynı süre kalan koyu ve açık renkli iki tişörtten hangisi daha çok ısınır?',
        options: ['Açık renkli; ışımayı daha fazla soğurur', 'İkisi eşit ısınır', 'Koyu renkli; ışımayı daha fazla soğurur'], answer: 2,
        why: ['Işımayı daha fazla soğuran, açık renkli değil koyu renkli nesnedir.', 'Koyu renk ışımayı daha fazla soğurur; ısınmaları eşit olmaz.', 'Koyu renkli nesneler ışımayı daha fazla soğurur, bu yüzden daha çok ısınır.'], scene: 0,
      },
      {
        q: 'Sera etkisi için hangisi doğrudur?',
        options: ['Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını tutar', 'Atmosfer, Güneş’ten gelen ışımayı tamamen geri gönderir', 'Yeryüzü ışıma yapmaz'], answer: 0,
        why: ['Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını tutar; buna sera etkisi denir.', 'Atmosfer, Güneş’ten gelen ışımayı tamamen geri göndermez; ışımanın bir kısmı yeryüzüne ulaşır.', 'Yeryüzü de ışıma yapar; atmosfer bunun bir kısmını tutar.'], scene: 0,
      },
    ],
    summary: [
      '<b>Isının yolunu geçtiği ortam belirler: iletim, konveksiyon, ışıma.</b>',
      'Koyu renkli nesneler ışımayı daha fazla soğurur.',
      'Atmosfer, yeryüzünün ışımasının bir kısmını tutar: sera etkisi.',
    ],
  });
})();
