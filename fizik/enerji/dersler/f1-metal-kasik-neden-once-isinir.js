/* F1 — Metal kaşık neden önce ısınır?
   Katılar ısıyı aynı hızla iletmez: ısı iletim hızı maddenin cinsine, yüzey alanına, sıcaklık farkına ve kalınlığa bağlıdır.
   Senaryo: plan/fizik/enerji/senaryolar/F-isi-iletim-hizi-ve-yalitim.md (F1). Formül, sembol ve hesap yok.
   Sayılar senaryonun "Örnek veri" satırıdır; yalnızca sırayı gösterir. Isı okunun kalınlığı da yalnızca sırayı gösterir (ince 4, orta 9, kalın 14).
   Figür: ILETIM (iletim-sekil.js), sahne 4–7. Araçlar: KIT_F (f-araclar.js). Bu dosyada yazılan araçlar: motor, tanecikler, kasik, tencere,
   tencereKasik, mini (düz termometre), akis (kaşıktan geçen ısı noktaları), sicakKutu, bank, yanKart, duzenek (figür + etiket + okuma). */
(() => {
  'use strict';
  const { RENK, yazi, renkli, parcaKoy, cizgi, kutu, gizle, belir, par, tablo, sinifla } = window.KIT;
  const { KALIN, isiOku, okuma, sureCizgisi } = window.KIT_F;
  const { lerp, ease } = Ders;
  const METAL = '#cfd8e3', TAHTA = '#c8a273', SU = 'var(--c1)', DUV = '#3a4678', SARI = RENK.sicaklik;
  const soz = (c, m, s, o) => c.say(m, Object.assign(s ? { speak: s } : {}, o || {}));
  /* Doğru şıkkı verilen yere koyar; hints şıklarla eşleşir (ipucu: yanlış şıkların sırasıyla ipuçları). */
  const sik = (dogru, yanlis, yer, ipucu) => {
    const options = yanlis.slice(), hints = ipucu.slice();
    options.splice(yer, 0, dogru); hints.splice(yer, 0, '');
    return { options, answer: yer, hints };
  };
  const karis = (a, b, k) => {
    const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), A = p(a), B = p(b);
    return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join('');
  };

  /* ---- sahne boyunca süren hareket: tek c.tween döngüsü (dt saniye) ---- */
  function motor(c) {
    const isler = new Set(); let basladi = false;
    return {
      ekle(f) {
        isler.add(f);
        if (!basladi) {
          basladi = true;
          (async () => {
            try { for (;;) { let o = 0; await c.tween(1000, (e) => { const dt = e - o; o = e; isler.forEach((g) => g(dt)); }, ease.linear); } } catch (_) { /* sahne değişti */ }
          })();
        }
        return f;
      },
    };
  }

  /* Yan yana tanecik dizisi; a[i] titreşim genliği (5 serin, 10 sıcak), rengi genliğe göre değişir. */
  function tanecikler(c, p, mot, x0, dx, y, n, genlik) {
    const g = c.S('g', {}, p), a = genlik.slice(), ds = [];
    for (let i = 0; i < n; i++) ds.push(c.S('circle', { cx: x0 + i * dx, cy: y, r: 9, fill: '#6ea8ff' }, g));
    let t = 0;
    mot.ekle((dt) => {
      t += dt;
      ds.forEach((d, i) => {
        d.setAttribute('cx', x0 + i * dx + a[i] * Math.sin(9 * t + i * 1.7));
        d.setAttribute('cy', y + a[i] * Math.cos(7.5 * t + i * 2.3));
        d.setAttribute('fill', karis('#6ea8ff', '#ff8a5b', (a[i] - 5) / 5));
      });
    });
    return { g, a };
  }

  /* Kaşık: sap çizgisi ve kepçe (46 × 30 elips). */
  function kasik(c, p, kep, sap, renk) {
    const g = c.S('g', {}, p);
    cizgi(c, g, kep, sap, renk, 18, { 'stroke-linecap': 'butt' });
    const a = Math.atan2(sap[1] - kep[1], sap[0] - kep[0]) * 180 / Math.PI + 90;
    c.S('ellipse', { cx: kep[0], cy: kep[1], rx: 23, ry: 15, fill: renk, transform: `rotate(${a} ${kep[0]} ${kep[1]})` }, g);
    return g;
  }
  /* Tencere ya da sürahi: içi dolgu renginde yarı saydam. */
  function tencere(c, p, x, y, w, h, dolgu) {
    const g = c.S('g', {}, p);
    c.S('path', {
      d: `M${x},${y} L${x},${y + h - 22} Q${x},${y + h} ${x + 22},${y + h} L${x + w - 22},${y + h} Q${x + w},${y + h} ${x + w},${y + h - 22} L${x + w},${y} Z`,
      fill: dolgu, 'fill-opacity': 0.3, stroke: RENK.cizgi, 'stroke-width': 4, 'stroke-linejoin': 'round',
    }, g);
    c.S('rect', { x: x - 16, y: y + 14, width: 16, height: 22, rx: 6, fill: RENK.gri }, g);
    c.S('rect', { x: x + w, y: y + 14, width: 16, height: 22, rx: 6, fill: RENK.gri }, g);
    return g;
  }
  /* Tencere ve içinde metal ile tahta kaşık (sahne 2, hatırla sonu, sahne 9). */
  function tencereKasik(c, p) {
    const g = c.S('g', {}, p), m = { kep: [180, 400], sap: [150, 170] }, t = { kep: [330, 400], sap: [360, 170] };
    const pot = tencere(c, g, 90, 330, 330, 130, SU), ks = c.S('g', {}, g);
    kasik(c, ks, m.kep, m.sap, METAL); kasik(c, ks, t.kep, t.sap, TAHTA);
    return { g, pot, ks, m, t };
  }
  /* Düz termometre (26 × 70): sütun 0…100 °C; sarı değer sağında. */
  function mini(c, p, x, y, T) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: x - 13, y, width: 26, height: 70, rx: 13, fill: RENK.koyu, stroke: RENK.cizgi, 'stroke-width': 3 }, g);
    const col = c.S('rect', { x: x - 5, y: y + 60, width: 10, height: 0, rx: 5, fill: SARI }, g);
    const t = yazi(c, g, x + 24, y + 46, '', { size: 24, kalin: 700, renk: SARI, hiza: 'start' });
    let son = T;
    const ayar = (v) => { son = v; const hh = 6 + 50 * v / 100; col.setAttribute('y', y + 62 - hh); col.setAttribute('height', hh); t.textContent = Math.round(v) + ' °C'; };
    ayar(T);
    return { g, ayar, git(c2, v, ms) { const v0 = son; return c2.tween(ms, (e) => ayar(lerp(v0, v, e)), ease.linear); } };
  }
  /* Isı noktaları P → Q yolunda 1.600 ms'de gider; her `aralik` ms'de bir nokta çıkar (aralık geçiş hızını gösterir). */
  function akis(c, p, mot, P, Q, aralik, gec = 1600) {
    const g = c.S('g', {}, p), n = Math.ceil(gec / aralik) + 1, ds = [];
    for (let i = 0; i < n; i++) { const d = c.S('circle', { r: 7, fill: RENK.isi }, g); d.style.opacity = 0; ds.push(d); }
    let t = 0, acik = false;
    mot.ekle((dt) => {
      if (!acik) return;
      t += dt * 1000;
      ds.forEach((d) => { d.style.opacity = 0; });
      for (let k = Math.floor(t / aralik); k >= 0 && t - k * aralik <= gec; k--) {
        const q = (t - k * aralik) / gec, d = ds[k % n];
        d.setAttribute('cx', lerp(P[0], Q[0], q)); d.setAttribute('cy', lerp(P[1], Q[1], q));
        d.style.opacity = q > 0.9 ? (1 - q) * 10 : 1;
      }
    });
    return { g, ac() { acik = true; } };
  }
  function sicakKutu(c, p, x, y, ad, T) {
    const g = c.S('g', {}, p);
    kutu(c, g, x, y, 200, 90, { rx: 16 });
    const t = renkli(c, g, x + 100, y + 56, [ad + ' · ', [T + ' °C', SARI]], { size: 28, kalin: 700 });
    gizle(g);
    return { g, yaz: (v) => parcaKoy(c, t, [ad + ' · ', [Math.round(v) + ' °C', SARI]]) };
  }
  function bank(c, p, x, y, renk) {
    const g = c.S('g', {}, p);
    c.S('rect', { x: x + 20, y: y + 36, width: 24, height: 70, rx: 4, fill: RENK.gri }, g);
    c.S('rect', { x: x + 296, y: y + 36, width: 24, height: 70, rx: 4, fill: RENK.gri }, g);
    c.S('rect', { x, y, width: 340, height: 36, rx: 6, fill: renk }, g);
    return g;
  }
  const kaydir = (g, dy) => g.setAttribute('transform', `translate(0,${dy})`);

  /* Sağ sütundaki kart: gruplar = [[satır, …], …]; satır düz yazı ya da renkli() parçaları. Gruplar tek tek açılır. */
  const SX = 670, SW = 315;
  function yanKart(c, p, y, gruplar) {
    const ls = 36, bos = 26, satirlar = gruplar.reduce((s, g) => s + g.length, 0);
    const h = 36 + (satirlar - 1) * ls + (gruplar.length - 1) * bos + 20;
    const k = kutu(c, p, SX, y, SW, h, { rx: 14 });
    let yy = y + 36; const gs = [], ts = [];
    gruplar.forEach((sat) => {
      const g = c.S('g', {}, p);
      ts.push(sat.map((s, i) => renkli(c, g, SX + SW / 2, yy + i * ls, Array.isArray(s) ? s : [s], { size: 26, kalin: 600 })));
      gizle(g); gs.push(g); yy += sat.length * ls + bos;
    });
    gizle(k);
    return { k, gs, ts, h, goster: (i, ms = 400) => belir(c, i === 0 ? [k, gs[0]] : gs[i], ms) };
  }

  /* ---- izometrik düzenek: figür + çubuk etiketleri + sarı okumalar ----
     o: { cubuk: [3 ayar], su, ad: ['alüminyum', …] (kullanılmayan yuva null), hiza: ['middle' | 'end', …], kutu } */
  const FIG = { x: 0, y: 24, h: 460 };
  function duzenek(c, svg, o) {
    const f = ILETIM.kur(c, svg, o.kutu || FIG);
    o.cubuk.forEach((a, i) => f.cubuk(i, Object.assign({ boy: 1, kesit: 1, uc: 20, gorunur: 1 }, a)));
    f.su(o.su);
    const L = c.S('g', {}, svg), d = { f, L, et: [], oku: [], uc: o.cubuk.map((a) => (a.uc == null ? 20 : a.uc)) };
    o.ad.forEach((ad, i) => {
      if (!ad) return;
      d.et[i] = yazi(c, L, 0, 0, ad, { size: 24, kalin: 600, hiza: (o.hiza && o.hiza[i]) || 'middle' });
      d.oku[i] = okuma(c, L, f, `cubuk${i}.uc`); d.oku[i].guncelle(d.uc[i]);
      gizle(d.et[i], d.oku[i].g);
    });
    d.suEt = yazi(c, L, 0, 0, 'sıcak su', { size: 24, kalin: 600 });
    d.suOku = okuma(c, L, f, 'su.termometre'); d.suOku.guncelle(o.su);
    gizle(d.suEt, d.suOku.g);
    d.izle = () => {
      o.ad.forEach((ad, i) => {
        if (!ad) return;
        const q = f.nokta(`cubuk${i}.etiket`), son = o.hiza && o.hiza[i] === 'end';
        d.et[i].setAttribute('x', q[0] + (son ? 30 : 0)); d.et[i].setAttribute('y', q[1] + 24);
        d.et[i].style.display = f.gorunur(`cubuk${i}.etiket`) ? '' : 'none';
        d.oku[i].izle();
      });
      const q = f.nokta('su.etiket');
      d.suEt.setAttribute('x', q[0]); d.suEt.setAttribute('y', q[1] + 24);
      d.suEt.style.display = f.gorunur('su.etiket') ? '' : 'none';
      d.suOku.izle();
    };
    d.izle();
    d.sure = sureCizgisi(c, svg);
    gizle(f.el, d.sure.g);
    /* Bir ya da birkaç uç termometresi aynı sürede yükselir; sarı sayılar ve süre çizgisi eşzamanlı. hedef: [T0, T1, T2] (null: durur) */
    d.dene = (hedef, ms = 3000, bas = [20, 20, 20]) => c.tween(ms, (e) => {
      hedef.forEach((T, i) => {
        if (T == null || !d.oku[i]) return;
        const v = lerp(bas[i], T, e); f.cubuk(i, { uc: v }); d.oku[i].guncelle(v); d.uc[i] = v;
      });
      d.sure.boy(e); d.izle();
    }, ease.linear);
    d.suGit = (v, ms) => { const v0 = d.suDeger == null ? o.su : d.suDeger; d.suDeger = v; return c.tween(ms, (e) => { const x = lerp(v0, v, e); f.su(x); d.suOku.guncelle(x); d.izle(); }, ease.inOut); };
    d.kaldir = async (...ek) => { await belir(c, [f.el, L, d.sure.g, ...ek], 350, 0); f.el.remove(); L.remove(); d.sure.g.remove(); ek.forEach((e) => e.remove()); };
    return d;
  }

  /* ---- 1. Hatırla ---- */
  async function hatirla(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const k1 = c.S('g', {}, svg);
    tencere(c, k1, 90, 330, 330, 130, SU);
    kasik(c, k1, [190, 420], [440, 230], METAL);
    yazi(c, k1, 255, 502, 'sıcak tencere', { size: 26, kalin: 600, renk: RENK.soluk });
    cizgi(c, k1, [440, 230], [520, 150], RENK.ince, 2); cizgi(c, k1, [440, 230], [520, 380], RENK.ince, 2);
    kutu(c, k1, 520, 150, 420, 230, { rx: 14 });
    const tn = tanecikler(c, k1, mot, 580, 60, 265, 6, [10, 10, 5, 5, 5, 5]);
    gizle(k1);
    await par(c.say('Başlamadan önce iki şeyi hatırlayalım.'), belir(c, k1, 450));
    await c.choice(Object.assign({ tag: 'Hatırla', q: 'Sıcak tencerede duran metal kaşığın sapına ısı nasıl ulaşır?', right: 'Evet. Titreşen tanecikler enerjiyi komşularına aktarır.' },
      sik('İletimle; titreşen tanecikler enerjiyi komşularına aktarır', ['Konveksiyonla; ısınan madde yükselir', 'Işımayla; ısı dalga olarak gelir'], 1,
        ['Katılarda ısı, taneciklerin titreşimi komşuya aktarmasıyla, yani iletimle yayılır.', 'Katılarda ısı, taneciklerin titreşimi komşuya aktarmasıyla, yani iletimle yayılır.'])));
    await par(c.say('Titreşim tanecikten taneciğe geçerek sapa ilerler.'), (async () => {
      const ps = [];
      for (let i = 2; i < 6; i++) { ps.push(c.tween(400, (e) => { tn.a[i] = lerp(5, 10, e); }, ease.linear)); await c.wait(250); }
      await Promise.all(ps);
    })());

    c.clearSay();
    await belir(c, k1, 300, 0); k1.remove();
    const k2 = c.S('g', {}, svg);
    kasik(c, k2, [400, 430], [400, 150], METAL); kasik(c, k2, [600, 430], [600, 150], TAHTA);
    yazi(c, k2, 400, 492, 'metal kaşık', { size: 26, kalin: 600 }); yazi(c, k2, 600, 492, 'ahşap kaşık', { size: 26, kalin: 600 });
    const s1 = yazi(c, k2, 400, 112, '20 °C', { size: 32, kalin: 700, renk: SARI }), s2 = yazi(c, k2, 600, 112, '20 °C', { size: 32, kalin: 700, renk: SARI });
    const es = yazi(c, k2, 500, 130, '=', { size: 56, kalin: 700 });
    gizle(k2, s1, s2, es);
    await belir(c, k2, 400);
    await c.choice(Object.assign({ tag: 'Hatırla', q: 'Odada uzun süre bekleyen bir metal ve bir ahşap kaşık için hangisi doğrudur?', right: 'Evet. Sıcaklıkları eşitlenir.' },
      sik('İkisinin sıcaklığı da oda sıcaklığıdır', ['Metalin sıcaklığı daha düşüktür', 'Ahşabın sıcaklığı daha yüksektir'], 2,
        ['Isıl dengede sıcaklıklar eşitlenir ve ısı alışverişi biter.', 'Isıl dengede sıcaklıklar eşitlenir ve ısı alışverişi biter.'])));
    k2.style.opacity = 1;
    await par(c.say('Aynı odada bekleyen iki kaşığın sıcaklığı eşit olur.'), belir(c, [s1, s2, es], 300));
    c.clearSay();
    await belir(c, k2, 300, 0); k2.remove();
    const k3 = tencereKasik(c, svg), soru = yazi(c, svg, 760, 300, 'aynı hızda mı?', { size: 40, kalin: 700 });
    k3.g.setAttribute('transform', 'translate(20,-30) scale(1.25)');
    gizle(k3.g, soru);
    await par(c.say('Bugün katıların ısıyı hep aynı hızla iletip iletmediğine bakacağız.'), belir(c, [k3.g, soru], 450));
  }

  /* ---- 2. Aynı tencere, iki kaşık ---- */
  async function tencereIki(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const T = tencereKasik(c, svg), yemek = renkli(c, svg, 255, 502, ['yemek · ', ['90 °C', SARI]], { size: 26, kalin: 600 });
    const mM = mini(c, svg, 150, 86, 20), mT = mini(c, svg, 360, 86, 20);
    const eM = yazi(c, svg, 150, 62, 'metal', { size: 24, kalin: 600 }), eT = yazi(c, svg, 360, 62, 'tahta', { size: 24, kalin: 600 });
    const akM = akis(c, svg, mot, T.m.kep, T.m.sap, 400), akT = akis(c, svg, mot, T.t.kep, T.t.sap, 1200);
    const tn = c.S('g', {}, svg);
    yazi(c, tn, 750, 170, 'ısı iletim hızı', { size: 34, kalin: 700 });
    yazi(c, tn, 750, 228, '→ birim zamanda', { size: 28, kalin: 600 });
    renkli(c, tn, 750, 266, ['aktarılan ', ['ısı', RENK.isi]], { size: 28, kalin: 600 });
    gizle(T.pot, T.ks, yemek, mM.g, mT.g, eM, eT, tn);

    await par(soz(c, 'Ela tencerede yemek pişiriyor; yemeğin sıcaklığı 90 °C.', 'Ela tencerede yemek pişiriyor; yemeğin sıcaklığı doksan derece.'), belir(c, [T.pot, yemek], 450));
    await par(c.say('Tencereye bir metal kaşık ile bir tahta kaşık koyuyor.'), belir(c, T.ks, 450));
    await c.say('İkisinin de sapı dışarıda, oda havasında duruyor.');
    await par(c.say('Birkaç dakika sonra sap uçlarının sıcaklığına bakıyor.'), belir(c, [mM.g, mT.g, eM, eT], 450));
    await par(soz(c, 'Metal kaşığın sapı 58 °C’ye, tahta kaşığınki 27 °C’ye çıkmış.', 'Metal kaşığın sapı elli sekiz dereceye, tahta kaşığınki yirmi yedi dereceye çıkmış.'), par(mM.git(c, 58, 2500), mT.git(c, 27, 2500)));
    akM.ac(); akT.ac();
    await c.say('Isı yemekten kaşığın içinden geçerek sapa ilerliyor.');
    await c.say('Metal kaşıkta ısı sapa çok daha hızlı ulaşıyor.');
    await par(c.say('Birim zamanda aktarılan ısı miktarına ısı iletim hızı denir.'), belir(c, tn, 450));
    await c.say('Burada iki ortam, sıcak yemek ile oda havasıdır.');
    await soz(c, 'Birimi joule bölü saniyedir; buna watt da denir.', 'Birimi jul bölü saniyedir; buna vat da denir.');
    await c.say('Metal kaşığın ısı iletim hızı, tahta kaşığınkinden büyüktür.');

    // Sor: yeni durum (sürahideki süt).
    c.clearSay();
    const eski = [...svg.children];
    await belir(c, eski, 350, 0); eski.forEach((e) => e.remove());
    const mot2 = motor(c), g2 = c.S('g', {}, svg);
    tencere(c, g2, 310, 330, 360, 130, '#e8eefc');
    const al = { kep: [400, 400], sap: [420, 170] }, ah = { kep: [580, 400], sap: [580, 170] };
    kasik(c, g2, al.kep, al.sap, METAL); kasik(c, g2, ah.kep, ah.sap, TAHTA);
    renkli(c, g2, 490, 502, ['süt · ', ['70 °C', SARI]], { size: 26, kalin: 600 });
    const m1 = mini(c, g2, 420, 86, 20), m2 = mini(c, g2, 580, 86, 20);
    yazi(c, g2, 420, 62, 'alüminyum', { size: 24, kalin: 600 }); yazi(c, g2, 580, 62, 'ahşap', { size: 24, kalin: 600 });
    const a1 = akis(c, g2, mot2, al.kep, al.sap, 400), a2 = akis(c, g2, mot2, ah.kep, ah.sap, 1200);
    gizle(g2);
    await belir(c, g2, 400);
    await c.choice(Object.assign({ tag: 'Sor', q: 'Ela aynı sıcak süte alüminyum ve ahşap birer kaşık koyuyor. Hangi kaşığın sapı daha çabuk ısınır?' },
      sik('Alüminyum kaşığın; ısıyı daha hızlı iletir', ['Ahşap kaşığın; ısıyı daha çok tutar', 'İkisinin de aynı; ikisi de aynı sütün içinde'], 0,
        ['Hangi kaşıkta ısı sapa daha hızlı ulaşıyor? Metal kaşığa bak.', 'Aynı sütün içinde olmak, ısının aynı hızla ilerlemesi demek değildir.'])));
    a1.ac(); a2.ac();
    await par(c.say('Alüminyum kaşığın sapı çok daha çabuk ısındı.'), par(m1.git(c, 49, 2000), m2.git(c, 23, 2000)));
    c.note('Birim zamanda aktarılan ısı. Birimi watt; metal kaşıkta büyük.', 'Isı iletim hızı');
  }

  /* ---- 3. Soğuk hissetmek sıcaklık değildir ---- */
  async function soguk(c) {
    const svg = c.svg(1000, 562);
    const AM = c.S('g', {}, svg), AA = c.S('g', {}, svg);
    bank(c, AM, 90, 310, METAL); bank(c, AA, 570, 310, TAHTA);
    const etM = yazi(c, AM, 260, 462, 'metal bank', { size: 26, kalin: 600 }), etA = yazi(c, AA, 740, 462, 'ahşap bank', { size: 26, kalin: 600 });
    const hM = sicakKutu(c, AM, 160, 100, 'el', 33), hA = sicakKutu(c, AA, 640, 100, 'el', 33);
    const okM = isiOku(c, AM, [260, 272], [260, 308], { kalin: KALIN.orta }), okA = isiOku(c, AA, [740, 272], [740, 308], { kalin: KALIN.orta });
    gizle(AM, AA);

    await par(c.say('Parktaki metal ve ahşap bank aynı havada uzun süre bekliyor.'), belir(c, [AM, AA], 450));
    await par(soz(c, 'İkisi de ortamla ısıl dengede; sıcaklıkları aynı, 20 °C.', 'İkisi de ortamla ısıl dengede; sıcaklıkları aynı, yirmi derece.'), (async () => {
      await belir(c, [etM, etA], 200, 0.0001);
      parcaKoy(c, etM, ['metal bank · ', ['20 °C', SARI]]); parcaKoy(c, etA, ['ahşap bank · ', ['20 °C', SARI]]);
      await belir(c, [etM, etA], 250, 1);
    })());
    await par(soz(c, 'Ela eliyle dokunuyor; elinin sıcaklığı 33 °C.', 'Ela eliyle dokunuyor; elinin sıcaklığı otuz üç derece.'), (async () => {
      await belir(c, [hM.g, hA.g], 350);
      await c.tween(600, (e) => { kaydir(hM.g, 80 * e); kaydir(hA.g, 80 * e); }, ease.inOut);
    })());
    await par(c.say('Isı sıcaktan soğuğa aktarılır; yani elden banka.'), belir(c, [okM.g, okA.g], 500));
    await par(c.say('Metal bank, elden ısıyı çok hızlı alır.'), okM.git(c, KALIN.kalin, 500));
    await par(c.say('Ahşap bank aynı ısıyı çok daha yavaş alır.'), okA.git(c, KALIN.ince, 500));

    c.clearSay();
    await c.choice(Object.assign({ tag: 'Sor', q: 'Ela’nın eli hangi bankta daha çok üşür?' },
      sik('Metal bankta; elinden ısı daha hızlı çekilir', ['Ahşap bankta; sıcaklığı daha düşüktür', 'İkisinde aynı; ikisinin de sıcaklığı 20 °C'], 1,
        ['Sıcaklıklar aynı. Eli ne kadar çabuk ısı kaybeder? Oklara bak.', 'Elden çıkan ısı ne kadar hızlıysa el o kadar üşür.'])));
    await par(c.say('Metal bankta elin sıcaklığı daha çok düşüyor.'), c.tween(2000, (e) => { hM.yaz(lerp(33, 30, e)); hA.yaz(lerp(33, 32, e)); }, ease.linear));
    await par(soz(c, 'Soğuk hissettiren, bankın sıcaklığı değil; ısının elden çekilme hızıdır.', '[thoughtful] Soğuk hissettiren, bankın sıcaklığı değil; ısının elden çekilme hızıdır.'));

    // Yaz günü: metal bank 40 °C.
    await par(soz(c, 'Yazın 40 °C’lik metal bank, ele ısıyı hızla verir.', 'Yazın kırk derecelik metal bank, ele ısıyı hızla verir.'), (async () => {
      const bas = yazi(c, svg, 500, 64, 'yaz günü', { size: 32, kalin: 700 });
      gizle(bas);
      await par(belir(c, AA, 400, 0.45), belir(c, okM.g, 250, 0));
      parcaKoy(c, etM, ['metal bank · ', ['40 °C', SARI]]); hM.yaz(33);
      okM.ciz([260, 308], [260, 272]);
      await par(belir(c, okM.g, 400), belir(c, bas, 400));
    })());
    c.clearSay();
    const eski = [...svg.children];
    await belir(c, eski, 350, 0); eski.forEach((e) => e.remove());
    const C = c.S('g', {}, svg), fa = c.S('g', {}, C), ha = c.S('g', {}, C);
    kutu(c, fa, 90, 290, 340, 120, { rx: 14, dolgu: '#2d3b6b' }); kutu(c, ha, 570, 290, 340, 120, { rx: 14, dolgu: '#4a3a3c' });
    renkli(c, fa, 260, 361, ['fayans · ', ['20 °C', SARI]], { size: 32, kalin: 700 });
    renkli(c, ha, 740, 361, ['halı · ', ['20 °C', SARI]], { size: 32, kalin: 700 });
    const ayF = sicakKutu(c, C, 160, 100, 'ayak', 33), ayH = sicakKutu(c, C, 640, 100, 'ayak', 33);
    const oF = isiOku(c, C, [260, 198], [260, 284], { kalin: KALIN.kalin }), oH = isiOku(c, C, [740, 198], [740, 284], { kalin: 5 });
    gizle(C, ayF.g, ayH.g);
    await par(c.say('Aynı odadaki fayans ve halı da aynı sıcaklıktadır.'), belir(c, [C, ayF.g, ayH.g], 450));
    await par(c.say('Fayans çıplak ayaktan ısıyı hızlı alır; halı yavaş alır.'), belir(c, [oF.g, oH.g], 500));
    c.note('Soğuk hissetmek sıcaklık değil, ısı iletim hızıdır.', 'Soğuk hissetmek');
  }

  /* ---- 4. Birinci etmen: maddenin cinsi ---- */
  async function madde(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, {
      cubuk: [{ cins: 'aluminyum', gorunur: 0 }, { cins: 'demir', gorunur: 0 }, { cins: 'tahta', gorunur: 0 }], su: 80,
      ad: ['alüminyum', 'demir', 'tahta'], hiza: ['end', 'middle', 'middle'],
    });
    const yk = yanKart(c, svg, 120, [[['değişen: ', ['madde', RENK.kutle]]], ['aynı: boy,', 'yüzey alanı, su'], ['sonuç: hız', ['maddeye bağlı']]]);
    const f = d.f;

    await par(c.say('Şimdi ısı iletimini bir düzenekle inceleyelim.'), belir(c, f.el, 450));
    await par(soz(c, 'Çubukların bir ucu 80 °C’lik sıcak suda duruyor.', 'Çubukların bir ucu seksen derecelik sıcak suda duruyor.'), (async () => {
      await belir(c, [d.suEt, d.suOku.g], 350);
      for (let i = 0; i < 3; i++) {
        belir(c, d.et[i], 400);
        const p = c.tween(400, (e) => f.cubuk(i, { gorunur: e }), ease.out);
        await c.wait(300); if (i === 2) await p;
      }
    })());
    await par(soz(c, 'Öbür uçlarda birer termometre var; üçü de 20 °C gösteriyor.', 'Öbür uçlarda birer termometre var; üçü de yirmi derece gösteriyor.'), belir(c, d.oku.map((k) => k.g), 400));
    await c.say('Isı çubuğun içinden geçip serbest ucu ısıtıyor.');
    await c.say('Uç ne kadar çabuk ısınırsa ısı o kadar hızlı ulaşmıştır.');
    await c.say('İlk deneyde yalnızca çubukların maddesi farklı: alüminyum, demir, tahta.');
    await c.say('Boyları ve yüzey alanları aynı; hepsi aynı suda duruyor.');

    c.clearSay();
    await c.choice(Object.assign({ tag: 'Tahmin et', q: 'Aynı süre sonra hangi çubuğun ucu en geç ısınır?' },
      sik('Tahta çubuğun', ['Alüminyum çubuğun', 'Demir çubuğun'], 2,
        ['Kaşıklarda hangi madde ısıyı yavaş iletiyordu?', 'Ucu en geç ısınan, ısıyı en yavaş ileten çubuktur.'])));
    await belir(c, d.sure.g, 300);
    await par(c.say('Aynı sürede üç uç da farklı sıcaklığa çıkıyor.'), d.dene([62, 41, 22], 3000));
    await par(c.say('Aynı sürede ısı en çok alüminyumdan geçti.'), par(yk.goster(0, 400), belir(c, [d.suEt, d.suOku.g], 300, 0)));
    await c.say('Demir ikinci oldu; tahta çubuğun ucu neredeyse ısınmadı.');
    await par(c.say('Yalnızca madde farklı olduğu için sonuç maddeden gelir.'), yk.goster(1, 400));
    await par(c.say('Isı iletim hızı maddenin cinsine bağlıdır.'), yk.goster(2, 400));
    c.note('Isı iletim hızı maddenin cinsine bağlıdır. Alüminyum tahtadan hızlıdır.', 'Madde');
  }

  /* ---- 5. İkinci etmen: yüzey alanı ---- */
  async function yuzeyAlani(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, {
      cubuk: [{ cins: 'demir', kesit: 1 }, { cins: 'demir', kesit: 2 }, { gorunur: 0 }], su: 80, ad: ['ince', 'geniş', null],
    });
    const yk = yanKart(c, svg, 120, [['ikisi de demir'], ['boy ve su aynı'], ['değişen:', ['yüzey alanı', RENK.kutle]]]);
    const bk = yanKart(c, svg, 120, [['Yüzey alanı büyük', 'çubuğun ucu daha', 'çabuk ısındı.'], ['Demek ki ısı iletim', 'hızı ……']]);
    const f = d.f;
    await par(c.say('İkinci deneyde Ela iki demir çubuk kullanıyor.'), belir(c, [f.el, d.sure.g, d.suEt, d.suOku.g, ...d.et.filter(Boolean), ...d.oku.filter(Boolean).map((k) => k.g)], 450));
    await par(c.say('İkisi de aynı boyda ve aynı sıcak suda duruyor.'), yk.goster(0, 350));
    await par(c.say('Yalnızca ısının geçtiği yüzey alanı farklı.'), (async () => { await yk.goster(1, 300); await yk.goster(2, 300); })());
    await c.say('Sağdaki çubuğun yüzey alanı daha büyük.');

    c.clearSay();
    await c.choice(Object.assign({ tag: 'Tahmin et', q: 'Aynı süre sonra hangi çubuğun ucu daha çok ısınır?' },
      sik('Yüzey alanı büyük olanın', ['Yüzey alanı küçük olanın', 'İkisinin de aynı'], 0,
        ['Isının geçtiği yol geniş olunca aynı anda daha çok ısı geçer mi?', 'İki çubuğun aynı olduğu şeyleri say; fark yalnızca yüzey alanı.'])));
    await par(c.say('Geniş çubuğun ucu aynı sürede daha çok ısınıyor.'), d.dene([41, 55, null], 3000));

    await belir(c, [yk.k, ...yk.gs, d.suEt, d.suOku.g], 300, 0);
    await par(c.say('Yüzey alanı büyük çubuğun ucu daha çabuk ısındı.'), belir(c, [bk.k, bk.gs[0]], 400));
    await bk.goster(1, 300);
    await c.choice(Object.assign({ tag: 'Birlikte çöz', q: 'Boşluğa hangisi yazılır?' },
      sik('daha büyüktür', ['daha küçüktür', 'aynıdır'], 1,
        ['Uç çabuk ısınıyorsa ısı o kadar hızlı ulaşmıştır.', 'Hızlı ulaşan ısının iletim hızı büyüktür.'])));
    parcaKoy(c, bk.ts[1][1], ['hızı ', ['daha büyüktür', RENK.iyi], '.']);
    await c.say('Yüzey alanı arttıkça ısı iletim hızı artar.');
    c.note('Yüzey alanı arttıkça ısı iletim hızı artar.', 'Yüzey alanı');
  }

  /* ---- 6. Üçüncü etmen: sıcaklık farkı ---- */
  async function sicaklikFarki(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, { cubuk: [{ cins: 'demir' }, { gorunur: 0 }, { gorunur: 0 }], su: 50, ad: ['demir', null, null] });
    const f = d.f;
    const lk = c.S('g', {}, svg);
    kutu(c, lk, SX, 130, SW, 200, { rx: 14 });
    yazi(c, lk, SX + SW / 2, 184, 'su → uç', { size: 26, kalin: 600, renk: RENK.soluk });
    const r1 = renkli(c, lk, SX + SW / 2, 244, [['50 °C → 30 °C', SARI]], { size: 30, kalin: 700 });
    const r2 = renkli(c, lk, SX + SW / 2, 298, [['80 °C → 41 °C', SARI]], { size: 30, kalin: 700 });
    gizle(lk, r1, r2);

    await par(c.say('Üçüncü deneyde Ela tek bir demir çubuk kullanıyor.'), belir(c, [f.el, d.sure.g, d.suEt, d.suOku.g, d.et[0], d.oku[0].g, lk], 450));
    await par(soz(c, 'Önce suyu 50 °C yapıyor; aynı sürede uç 30 °C’ye çıkıyor.', 'Önce suyu elli derece yapıyor; aynı sürede uç otuz dereceye çıkıyor.'), d.dene([30], 3000));
    await belir(c, r1, 400);
    await par(soz(c, 'Çubuğu soğutup bu kez suyu 80 °C yapacak.', 'Çubuğu soğutup bu kez suyu seksen derece yapacak.'), (async () => {
      await par(c.tween(500, (e) => { const v = lerp(30, 20, e); f.cubuk(0, { uc: v }); d.oku[0].guncelle(v); d.sure.boy(1 - e); d.izle(); }, ease.inOut));
      await d.suGit(80, 800);
    })());
    await c.say('Su ile oda arasındaki sıcaklık farkı bu kez daha büyük.');

    c.clearSay();
    await c.choice(Object.assign({ tag: 'Tahmin et', q: 'Su 80 °C olunca aynı sürede uç …?' },
      sik('daha çok ısınır', ['daha az ısınır', 'yine 30 °C’ye çıkar'], 2,
        ['Su ile oda arasındaki fark büyüdü; ısı aktarımı hızlanır mı yavaşlar mı?', 'Çubuk, süre ve madde aynı; yalnızca su değişti.'])));
    await par(c.say('Aynı sürede uç bu kez daha çok ısınıyor.'), d.dene([41], 3000));
    await belir(c, r2, 400);
    await c.say('Sıcaklık farkı büyüyünce uç daha çabuk ısındı.');
    await c.say('Sıcaklık farkı arttıkça ısı iletim hızı artar.');

    // Sor: yeni durum (ev ve dış hava).
    c.clearSay();
    await d.kaldir(lk);
    const E = c.S('g', {}, svg);
    kutu(c, E, 90, 160, 240, 140, { rx: 14 });
    renkli(c, E, 210, 242, ['iç · ', ['22 °C', SARI]], { size: 30, kalin: 700 });
    c.S('rect', { x: 450, y: 120, width: 40, height: 220, rx: 4, fill: DUV, stroke: RENK.cizgi, 'stroke-width': 2 }, E);
    kutu(c, E, 640, 130, 300, 80, { rx: 14 }); kutu(c, E, 640, 250, 300, 80, { rx: 14 });
    renkli(c, E, 790, 180, ['1. gün · dış ', ['5 °C', SARI]], { size: 26, kalin: 700 });
    renkli(c, E, 790, 300, ['2. gün · dış ', ['–5 °C', SARI]], { size: 26, kalin: 700 });
    const o1 = isiOku(c, E, [330, 170], [640, 170], { kalin: KALIN.orta }), o2 = isiOku(c, E, [330, 290], [640, 290], { kalin: KALIN.kalin });
    E.setAttribute('transform', 'translate(0,50)');
    gizle(E);
    await belir(c, E, 400);
    await c.choice(Object.assign({ tag: 'Sor', q: 'Evin içi 22 °C. Bir gün dışarısı 5 °C, ertesi gün –5 °C. Evden dışarıya ısı hangi gün daha hızlı gider?' },
      sik('–5 °C’lik gün; sıcaklık farkı daha büyük', ['5 °C’lik gün; dışarısı daha sıcak', 'İkisinde de aynı hızda; evin içi aynı'], 1,
        ['İç ile dış arasındaki farkı iki günde karşılaştır.', 'Fark büyüyünce ısı iletim hızı artar.'])));
    await par(c.say('Fark büyük olan günde ısı dışarıya daha hızlı gider.'), belir(c, [o1.g, o2.g], 500));
    c.note('Sıcaklık farkı arttıkça ısı iletim hızı artar.', 'Sıcaklık farkı');
  }

  /* ---- 7. Dördüncü etmen: kalınlık ---- */
  async function kalinlik(c) {
    const svg = c.svg(1000, 562);
    const d = duzenek(c, svg, { cubuk: [{ cins: 'demir', boy: 1 }, { cins: 'demir', boy: 2 }, { gorunur: 0 }], su: 80, ad: ['kısa', 'uzun', null] });
    const f = d.f, yk = yanKart(c, svg, 120, [['ikisi de demir'], ['yüzey alanı', 've su aynı'], [['değişen: ', ['kalınlık', RENK.kutle]]]]);
    const olc = [0, 1].map((i) => {
      const g = c.S('g', {}, d.L), ln = cizgi(c, g, [0, 0], [0, 0], RENK.cizgi, 3), t1 = cizgi(c, g, [0, 0], [0, 0], RENK.cizgi, 3), t2 = cizgi(c, g, [0, 0], [0, 0], RENK.cizgi, 3);
      const yz = yazi(c, g, 0, 0, 'kalınlık', { size: 24, kalin: 600 });
      Object.assign(yz.style, { paintOrder: 'stroke', stroke: RENK.koyu, strokeWidth: '8px', strokeLinejoin: 'round' });
      const izle = () => {
        const a = f.nokta(`cubuk${i}.bas`), b = f.nokta(`cubuk${i}.son`), P = [a[0], a[1] + 34], Q = [b[0], b[1] + 34];
        [[ln, P, Q], [t1, P, [P[0], P[1] - 10]], [t2, Q, [Q[0], Q[1] - 10]]].forEach(([e, u, v]) => { e.setAttribute('x1', u[0]); e.setAttribute('y1', u[1]); e.setAttribute('x2', v[0]); e.setAttribute('y2', v[1]); });
        yz.setAttribute('x', (P[0] + Q[0]) / 2); yz.setAttribute('y', (P[1] + Q[1]) / 2 + 34);
      };
      izle(); gizle(g);
      return { g, izle };
    });
    await par(c.say('Dördüncü deneyde iki demir çubuğun yalnızca boyu farklı.'), belir(c, [f.el, d.sure.g, d.suEt, d.suOku.g, ...d.et.filter(Boolean), ...d.oku.filter(Boolean).map((k) => k.g)], 450));
    await par(c.say('Boy, ısının geçeceği yolun uzunluğudur; buna kalınlık denir.'), belir(c, olc.map((o) => o.g), 400));
    await par(c.say('İkisi de aynı yüzey alanında, aynı sıcak suda duruyor.'), (async () => { await yk.goster(0, 300); await yk.goster(1, 300); await yk.goster(2, 300); })());

    c.clearSay();
    await c.choice(Object.assign({ tag: 'Tahmin et', q: 'Aynı süre sonra hangi çubuğun ucu daha çok ısınır?' },
      sik('Kısa olanın', ['Uzun olanın', 'İkisinin de aynı'], 1,
        ['Isı hangi çubukta daha kısa yol alır?', 'Yol uzadıkça ısının ucu ısıtması zorlaşır.'])));
    await par(c.say('Kısa çubuğun ucu aynı sürede daha çok ısınıyor.'), d.dene([41, 27, null], 3000));
    await c.say('Yolu uzun olan çubuğun ucu daha geç ısındı.');
    await c.say('Kalınlık arttıkça ısı iletim hızı azalır.');

    // Sor: yeni durum (ince ve kalın duvar).
    c.clearSay();
    await d.kaldir(yk.k, ...yk.gs);
    const W = c.S('g', {}, svg);
    c.S('rect', { x: 150, y: 160, width: 40, height: 160, rx: 4, fill: DUV, stroke: RENK.cizgi, 'stroke-width': 2 }, W);
    c.S('rect', { x: 630, y: 160, width: 120, height: 160, rx: 4, fill: DUV, stroke: RENK.cizgi, 'stroke-width': 2 }, W);
    renkli(c, W, 138, 200, ['iç ', ['22 °C', SARI]], { size: 24, kalin: 600, hiza: 'end' }); renkli(c, W, 202, 200, ['dış ', ['5 °C', SARI]], { size: 24, kalin: 600, hiza: 'start' });
    renkli(c, W, 618, 200, ['iç ', ['22 °C', SARI]], { size: 24, kalin: 600, hiza: 'end' }); renkli(c, W, 762, 200, ['dış ', ['5 °C', SARI]], { size: 24, kalin: 600, hiza: 'start' });
    yazi(c, W, 170, 370, 'ince', { size: 30, kalin: 700 }); yazi(c, W, 690, 370, 'kalın', { size: 30, kalin: 700 });
    const oi = isiOku(c, W, [70, 270], [290, 270], { kalin: KALIN.kalin }), ok = isiOku(c, W, [550, 270], [830, 270], { kalin: KALIN.ince });
    W.setAttribute('transform', 'translate(0,40)');
    gizle(W);
    await belir(c, W, 400);
    await c.choice(Object.assign({ tag: 'Sor', q: 'Aynı maddeden, aynı alanda iki duvar var; biri ince, öteki kalın. Hangisinden ısı daha hızlı geçer?' },
      sik('İnce duvardan', ['Kalın duvardan', 'İkisinden de aynı hızla'], 2,
        ['Isı hangi duvarda daha kısa yol alıyor?', 'Kalınlık arttıkça ısı iletim hızı azalır.'])));
    await par(c.say('İnce duvardan ısı daha hızlı geçiyor.'), belir(c, [oi.g, ok.g], 500));
    c.note('Kalınlık arttıkça ısı iletim hızı azalır.', 'Kalınlık');
  }

  /* ---- 8. Isı iletim katsayısı ---- */
  async function katsayi(c) {
    const svg = c.svg(1000, 562);
    const TB = c.S('g', {}, svg);
    const tb = tablo(c, TB, { x: 70, y: 100, satir: 5, h: 52, size: 24, sutunlar: [{ ad: 'Madde', w: 220 }, { ad: 'Isı iletim katsayısı (W/m · K)', w: 460 }] });
    [['elmas', '2.300'], ['saf alüminyum', '205'], ['demir', '80'], ['cam', '0,8'], ['strafor', '0,039']].forEach(([a, b], i) => { tb.yaz(i, 0, a); tb.yaz(i, 1, b, SARI); });
    const agac = c.S('g', {}, TB);
    kutu(c, agac, 70, 440, 680, 60, { rx: 12 });
    yazi(c, agac, 410, 480, 'ağaç · demirden çok küçük', { size: 24, kalin: 600 });
    const ay1 = c.S('g', {}, TB), ay2 = c.S('g', {}, TB);
    c.S('path', { d: 'M762,158 H774 V302 H762', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, ay1);
    yazi(c, ay1, 790, 238, 'iletken', { size: 24, kalin: 700, hiza: 'start' });
    c.S('path', { d: 'M762,364 H774 V496 H762', fill: 'none', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, ay2);
    yazi(c, ay2, 790, 438, 'yalıtkan', { size: 24, kalin: 700, hiza: 'start' });
    gizle(tb.g, agac, ay1, ay2);

    await par(c.say('Maddelerin ısıyı iletme hızı, bir sayıyla karşılaştırılır.'), belir(c, tb.g, 400));
    await par(soz(c, 'Bu sayıya ısı iletim katsayısı denir; tabloda 25 °C için verilir.', 'Bu sayıya ısı iletim katsayısı denir; tabloda yirmi beş derece için verilir.'));
    await par(c.say('Elmasın katsayısı en büyük; elmas ısıyı en hızlı iletir.'), tb.goster(0));
    await par(c.say('Metallerin katsayıları genellikle büyüktür; alüminyum demirden büyüktür.'), (async () => { await tb.goster(1); await tb.goster(2); })());
    tb.vurgula(1); tb.vurgula(2);
    await c.say('Deneyde en hızlı alüminyum, sonra demir, en yavaş tahta çıkmıştı.');
    tb.vurgula(1, false); tb.vurgula(2, false);
    await par(c.say('Tablo bu sırayı doğruluyor: ağaç demirden çok küçük.'), belir(c, agac, 400));
    await par(c.say('Katsayı ne kadar büyükse madde ısıyı o kadar hızlı iletir.'), tb.goster(3));
    await par(c.say('Katsayısı büyük maddelere ısı iletkeni denir.'), belir(c, ay1, 400));
    await par(c.say('Katsayısı küçük maddeler ısıyı yavaş iletir; bunlar ısı yalıtkanıdır.'), (async () => { await tb.goster(4); await belir(c, ay2, 400); })());
    await c.say('Strafor bu tabloda çok küçük katsayılı bir yalıtkandır.');

    c.clearSay();
    await c.choice(Object.assign({ tag: 'Sor', q: 'Ela aynı düzenekte üç çubuk deniyor: alüminyum, cam ve strafor. Uçların ısınma sırası (en çabuktan en geçe) hangisidir?' },
      sik('Alüminyum, cam, strafor', ['Strafor, cam, alüminyum', 'Cam, alüminyum, strafor'], 1,
        ['Katsayısı büyük olanın ucu daha çabuk ısınır. Tabloda sayılara bak.', '205, 0,8 ve 0,039 sayılarını büyükten küçüğe sırala.'])));

    // Gör: üç çubuk (düz vektör).
    await belir(c, TB, 350, 0); TB.remove();
    const R = c.S('g', {}, svg), sure = sureCizgisi(c, R, { x: 330, x1: 750, y: 490 });
    c.S('rect', { x: 270, y: 120, width: 60, height: 300, rx: 8, fill: SU, 'fill-opacity': 0.35, stroke: RENK.cizgi, 'stroke-width': 3 }, R);
    renkli(c, R, 300, 456, ['sıcak su · ', ['80 °C', SARI]], { size: 24, kalin: 600, hiza: 'start' });
    const cubuklar = [['alüminyum', '205', METAL, 60, 1], ['cam', '0,8', '#9cc2ff', 33, 0.55], ['strafor', '0,039', '#e8d9a0', 21, 1]].map(([ad, k, renk, hedef, sy], i) => {
      const y = 190 + i * 100;
      c.S('rect', { x: 330, y: y - 12, width: 420, height: 24, rx: 4, fill: renk, 'fill-opacity': sy }, R);
      yazi(c, R, 346, y - 24, `${ad} · ${k}`, { size: 24, kalin: 600, hiza: 'start' });
      const t = yazi(c, R, 766, y + 9, '20 °C', { size: 26, kalin: 700, renk: SARI, hiza: 'start' });
      return { t, hedef };
    });
    gizle(R, sure.g);
    await belir(c, R, 350);
    sure.g.style.opacity = 1;
    await par(c.say('Aynı sürede alüminyumun ucu en çok ısındı.'), c.tween(3000, (e) => {
      cubuklar.forEach((k) => { k.t.textContent = Math.round(lerp(20, k.hedef, e)) + ' °C'; });
      sure.boy(e);
    }, ease.linear));
    c.note('Katsayısı büyük madde iletken, küçük madde yalıtkandır.', 'Isı iletim katsayısı');
  }

  /* ---- 9. Dört etmeni ayır ---- */
  const KARTLAR = [
    { ust: 'Aynı duvarın', alt: 'yüzey alanı büyür.', ad: 'yüzey alanı büyür', kutu: 0,
      neden: 'Evet. Yüzey alanı arttıkça ısı iletim hızı artar.', ipucu: 'Dört etmenden hangisi değişiyor? Arttıkça ne olduğunu hatırla.' },
    { ust: 'Duvar daha', alt: 'kalın yapılır.', ad: 'kalınlık artar', kutu: 1,
      neden: 'Evet. Kalınlık arttıkça ısı iletim hızı azalır.', ipucu: 'Isı daha uzun yol alır.' },
    { ust: 'İç ve dış ortam arasındaki', alt: 'sıcaklık farkı küçülür.', ad: 'fark küçülür', kutu: 1,
      neden: 'Evet. Sıcaklık farkı küçülünce ısı iletim hızı da küçülür.', ipucu: 'Fark arttıkça hız artıyordu; şimdi fark küçülüyor.' },
    { ust: 'Tahta çubuğun yerine', alt: 'alüminyum çubuk konur.', ad: 'tahta yerine alüminyum', kutu: 0,
      neden: 'Evet. Alüminyumun katsayısı çok büyüktür.', ipucu: 'Tablodaki iki katsayıyı karşılaştır.' },
    { ust: 'Isının geçtiği', alt: 'yol kısalır.', ad: 'kalınlık azalır', kutu: 0,
      neden: 'Evet. Kalınlık azalınca ısı iletim hızı artar.', ipucu: 'Kalınlık arttıkça azalıyordu; şimdi kalınlık azalıyor.' },
    { ust: 'Alüminyum yerine', alt: 'strafor kullanılır.', ad: 'alüminyum yerine strafor', kutu: 1,
      neden: 'Evet. Strafor çok küçük katsayılı bir yalıtkandır.', ipucu: 'İki katsayıyı tablodan karşılaştır.' },
  ];
  async function ayir(c) {
    const svg = c.svg(1000, 562), mot = motor(c);
    const KUTU = [{ x: 90, ad: 'Isı iletim hızı artar' }, { x: 520, ad: 'Isı iletim hızı azalır' }], sayac = [0, 0];
    const ust = c.S('g', {}, svg);
    KUTU.forEach((k) => { kutu(c, ust, k.x, 50, 390, 190, { rx: 14 }); yazi(c, ust, k.x + 195, 98, k.ad, { size: 26, kalin: 700 }); });
    const sahne = c.S('g', {}, svg);
    let kart = null;
    const goster = async (k) => {
      kart = c.S('g', {}, sahne);
      kutu(c, kart, 150, 300, 700, 120, { rx: 14 });
      yazi(c, kart, 500, 354, k.ust, { size: 26, kalin: 600 }); yazi(c, kart, 500, 392, k.alt, { size: 26, kalin: 600 });
      gizle(kart);
      await belir(c, kart, 350);
    };
    const yerlestir = async (k) => {
      const el = kart, kx = KUTU[k.kutu].x + 195, ky = 150 + sayac[k.kutu] * 38;
      sayac[k.kutu] += 1;
      await c.tween(400, (e) => { el.setAttribute('transform', `translate(${500 * 0.4 * e},${370 * 0.4 * e}) scale(${1 - 0.4 * e})`); el.style.opacity = 1 - e; }, ease.in);
      el.remove();
      const ad = yazi(c, ust, kx, ky, k.ad, { size: 24, kalin: 600, renk: RENK.soluk });
      gizle(ad);
      await belir(c, ad, 300);
    };
    gizle(ust);
    await par(c.say('Şimdi dört etmeni günlük değişikliklere uygulayalım.'), belir(c, ust, 400));
    await c.say('Her değişiklik ısı iletim hızını artırıyor mu, azaltıyor mu?');
    c.clearSay();
    await sinifla(c, {
      tag: 'Dene', kutular: ['Artar', 'Azalır'], kartlar: KARTLAR,
      soru: () => 'Bu değişiklikte ısı iletim hızı ne olur?',
      sec: (_, k) => goster(k), yerlestir: (_, k) => yerlestir(k),
    });

    const tk = tencereKasik(c, svg);
    tk.g.setAttribute('transform', 'translate(309,164) scale(0.75)');
    const akM = akis(c, tk.g, mot, tk.m.kep, tk.m.sap, 400), akT = akis(c, tk.g, mot, tk.t.kep, tk.t.sap, 1200);
    const eM = yazi(c, svg, 421, 276, 'metal', { size: 24, kalin: 600 }), eT = yazi(c, svg, 579, 276, 'tahta', { size: 24, kalin: 600 });
    gizle(tk.g, eM, eT);
    await belir(c, ust, 400, 0.45);
    await par(c.say('Tencereye dönelim: metal kaşığın katsayısı tahtanınkinden çok büyük.'), belir(c, [tk.g, eM, eT], 500));
    akM.ac(); akT.ac();
    await c.say('O yüzden metal kaşığın sapı çabuk ısınır, tahtanınki ısınmaz.');
    await soz(c, 'Her katı ısıyı kendi hızında iletir.', '[short pause] Her katı ısıyı kendi hızında iletir.');
    c.note('Her katı ısıyı kendi hızında iletir.', 'Katılar');
  }

  Ders.start({
    id: 'enerji-f1', kicker: 'Konu F · Isı iletim hızı ve yalıtım', title: 'Metal kaşık neden önce ısınır?', accent: '#c792ff', back: 'index.html',
    intro: {
      title: 'Metal kaşık neden önce ısınır?',
      hook: 'Aynı tencerede duran tahta kaşığı tutabiliyorsun, metal kaşığı tutamıyorsun; ikisi de aynı yemeğin içinde değil mi?',
      button: 'Derse başla ›',
    },
    goals: ['Isı iletim hızını birim zamanda aktarılan ısı olarak söyler.', 'Soğuk hissetmenin sıcaklık değil, ısı iletim hızı olduğunu açıklar.', 'Isı iletim hızını etkileyen dört etmeni sayar.', 'Isı iletim katsayısına bakarak iletkeni yalıtkandan ayırır.'],
    scenes: [
      { title: 'Hatırla', goal: 'İletimi ve ısıl dengeyi hatırla.', run: hatirla },
      { title: 'Aynı tencere, iki kaşık', goal: 'Isı iletim hızını tanı.', run: tencereIki },
      { title: 'Soğuk hissetmek sıcaklık değildir', goal: 'Soğuk hissetmenin nedenini ısı iletim hızında gör.', run: soguk },
      { title: 'Birinci etmen: maddenin cinsi', goal: 'Hızın maddeye bağlı olduğunu gör.', run: madde },
      { title: 'İkinci etmen: yüzey alanı', goal: 'Hızın yüzey alanıyla arttığını gör.', run: yuzeyAlani },
      { title: 'Üçüncü etmen: sıcaklık farkı', goal: 'Hızın sıcaklık farkıyla arttığını gör.', run: sicaklikFarki },
      { title: 'Dördüncü etmen: kalınlık', goal: 'Hızın kalınlıkla azaldığını gör.', run: kalinlik },
      { title: 'Isı iletim katsayısı', goal: 'Maddeleri katsayılarına göre karşılaştır.', run: katsayi },
      { title: 'Dört etmeni ayır', goal: 'Dört etmeni günlük değişikliklere uygula.', run: ayir },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      { q: 'Kışın parkta metal bank ahşap banktan daha soğuk hissediliyor. Neden?',
        options: ['Metal bankın sıcaklığı havanınkinden düşüktür', 'Metal bank elden ısıyı daha hızlı çeker', 'Ahşap bank ele ısı verir'], answer: 1,
        why: ['İki bank da ortamla ısıl dengededir; sıcaklıkları aynıdır.', 'Soğuk hissi, elden ısının çekilme hızından gelir; metalde bu hız büyüktür.', 'Isı sıcaktan soğuğa aktarılır; ahşap bank ele ısı vermez.'], scene: 2 },
      { q: 'Aynı sıcak suya aynı boyda ve kalınlıkta bir demir ve bir cam çubuk batırılıyor (katsayılar: demir 80, cam 0,8). Hangisinin ucu daha çabuk ısınır?',
        options: ['Cam çubuğun; katsayısı daha küçüktür', 'İkisinin de aynı sürede', 'Demir çubuğun; katsayısı daha büyüktür'], answer: 2,
        why: ['Katsayısı küçük olan ısıyı daha yavaş iletir.', 'Maddeler farklıysa ısı iletim hızı da farklıdır.', 'Katsayısı büyük madde ısıyı daha hızlı iletir; ucu daha çabuk ısınır.'], scene: 7 },
      { q: 'Hangi değişiklik bir duvardan geçen ısı iletim hızını azaltır?',
        options: ['Duvarı daha kalın yapmak', 'Duvarın yüzey alanını büyütmek', 'İç ile dış arasındaki sıcaklık farkını büyütmek'], answer: 0,
        why: ['Kalınlık arttıkça ısı iletim hızı azalır.', 'Yüzey alanı arttıkça ısı iletim hızı artar.', 'Sıcaklık farkı arttıkça ısı iletim hızı artar.'], scene: 6 },
      { q: 'Aynı metal levhanın bir yüzünde 90 °C’lik su var. Öbür yüzünde bir kez 20 °C’lik, bir kez 60 °C’lik hava bulunuyor. Hangisinde ısı daha hızlı geçer?',
        options: ['60 °C’lik havada; hava daha sıcak', '20 °C’lik havada; sıcaklık farkı daha büyük', 'İkisinde de aynı hızda'], answer: 1,
        why: ['Hava ne kadar sıcaksa fark o kadar küçülür; hız da azalır.', 'Sıcaklık farkı büyüdükçe ısı iletim hızı artar.', 'Fark değişince ısı iletim hızı da değişir.'], scene: 5 },
      { q: 'Ela kışın dışarıda duran bir tahta ve bir demir çubuğu eline alıyor. Hangisi doğrudur?',
        options: ['Demirin sıcaklığı tahtadan düşüktür', 'Tahta ele ısı verdiği için daha sıcaktır', 'İkisinin sıcaklığı aynıdır; demir elden ısıyı daha hızlı çeker'], answer: 2,
        why: ['İkisi de dışarıdaki havayla ısıl dengededir; sıcaklıkları aynıdır.', 'Isı sıcaktan soğuğa aktarılır; ele ısı veren tahta değil, elin kendisidir.', 'Demir daha iletkendir; elden ısıyı daha hızlı çektiği için daha soğuk hissedilir.'], scene: 2 },
    ],
    summary: ['Isı iletim hızı, birim zamanda aktarılan ısıdır.', 'Madde, yüzey alanı, sıcaklık farkı ve kalınlık bu hızı belirler.', '<b>Her katı ısıyı kendi hızında iletir.</b>'],
    nextLesson: { href: 'f2-yalitim.html', label: 'Sonraki: Yalıtım: ısıyı yavaşlatmak ›' },
  });
})();
