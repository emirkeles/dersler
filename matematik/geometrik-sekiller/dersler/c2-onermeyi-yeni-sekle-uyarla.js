/* C2 — Önermeyi yeni şekle uyarla
   İspatlanmış önerme, üçgen olmayan bir şeklin içinde üçgen bulunarak yeni bir sonuca uyarlanır:
   içe dönük köşede x = a + b + c (dış açı önermesi iki kez). İç nokta önermesi ölçerek doğrulanır.
   Senaryo: plan/matematik/geometrik-sekiller/senaryolar/C-dogrulamayi-sinamak-ve-kullanmak.md */
(() => {
  'use strict';
  const { RENK, uz, yon, ileri, ara, kisa, aci, orta, tepe, cevapla, yazi, renkli, parcaKoy, cizgi, koy, nokta, gizle, belir, par, dilim, adimlar, tahminAl, tepeKontrol } = window.KIT;
  const { ease } = Ders;
  const R = 40;
  let tahmin = null;   // 1. sahnede yapılan tahmin; 2. sahnede anılır
  const sayi = (x) => x.toFixed(1).replace('.', ',');
  const pts = (K) => K.map((P) => P.join(',')).join(' ');
  /* P'den a yönünde giden doğru ile Q–S doğrusunun kesişimi. */
  const kesisim = (P, a, Q, S) => {
    const dx = Math.cos(a), dy = Math.sin(a), ex = S[0] - Q[0], ey = S[1] - Q[1];
    const t = ((Q[0] - P[0]) * ey - (Q[1] - P[1]) * ex) / (dx * ey - dy * ex);
    return [P[0] + dx * t, P[1] + dy * t];
  };

  /* İçe dönük köşeli ABDC dörtgeni: A üstte, B sol altta, C sağ altta, D içeride.
     Açılar: a (A'da), b (B'de, BA ile BD arası), c (C'de, CA ile CD arası), x (D'de, DB ile DC arası).
     BD'nin AC'yi kestiği nokta E; E'deki açı e (ED ile EC arası). koy(D) her şeyi yeni D'ye göre çizer. */
  function bumerang(c, p, A, B, C, D0) {
    const g = c.S('g', {}, p), ic = c.S('g', {}, g);
    const poly = c.S('polygon', { fill: 'rgba(110,168,255,.07)', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, g);
    const uzanti = cizgi(c, g, D0, D0, RENK.ince, 2, { 'stroke-dasharray': '7 7' });
    const dl = {
      a: dilim(c, g, A, B, C, RENK.A, R), b: dilim(c, g, B, A, D0, RENK.B, R), c: dilim(c, g, C, A, D0, RENK.C, R),
      x: dilim(c, g, D0, B, C, RENK.dis, R, { dolgu: 0.3 }), e: dilim(c, g, D0, B, C, RENK.dis, R, { dolgu: 0.3 }),
    };
    const ad = (renk) => yazi(c, g, 0, 0, '', { size: 22, kalin: 700, renk });
    const et = { a: ad(RENK.A), b: ad(RENK.B), c: ad(RENK.C), x: ad(RENK.dis), e: ad(RENK.dis) };
    const hf = (m) => yazi(c, g, 0, 0, m, { size: 24, kalin: 700 });
    const harf = { A: hf('A'), B: hf('B'), C: hf('C'), D: hf('D'), E: hf('E') };
    const yerles = (t, q) => { t.setAttribute('x', q[0]); t.setAttribute('y', q[1] + 8); };
    const uzak = (derece) => R + (derece < 22 ? 60 : derece < 32 ? 46 : derece < 45 ? 30 : 24);
    let D = D0, E = D0;
    yerles(harf.A, ileri(A, orta(A, B, C) + Math.PI, 24));
    yerles(harf.B, ileri(B, orta(B, A, C) + Math.PI, 24)); yerles(harf.C, ileri(C, orta(C, A, B) + Math.PI, 24));
    yerles(et.a, ileri(A, orta(A, B, C), uzak(aci(A, B, C))));
    function koyHepsi(D2) {
      D = D2; E = kesisim(B, yon(B, D), A, C);
      poly.setAttribute('points', pts([A, B, D, C]));
      koy(uzanti, D, E);
      dl.b.ciz(B, A, D); dl.c.ciz(C, A, D); dl.x.ciz(D, B, C); dl.e.ciz(E, D, C);
      yerles(et.b, ileri(B, orta(B, A, D), uzak(aci(B, A, D)))); yerles(et.c, ileri(C, orta(C, A, D), uzak(aci(C, A, D))));
      yerles(et.x, ileri(D, orta(D, B, C), R + 26)); yerles(et.e, ileri(E, orta(E, D, C), R + 22));
      yerles(harf.D, ileri(D, orta(D, B, C) + Math.PI, 24)); yerles(harf.E, ileri(E, yon(B, E), 22));
    }
    koyHepsi(D0);
    /* ölçüler tam sayıya yuvarlanır; x her zaman a + b + c olarak yazılır */
    const olcu = () => { const a = Math.round(aci(A, B, C)), b = Math.round(aci(B, A, D)), cc = Math.round(aci(C, A, D)); return [a, b, cc, a + b + cc]; };
    return { g, ic, uzanti, dl, et, harf, koy: koyHepsi, olcu, E: () => E, yaz: (m) => ['a', 'b', 'c', 'x'].forEach((k, i) => { et[k].textContent = m[i]; }) };
  }
  const vurgu = (c, s, K, renk) => { const u = c.S('polygon', { points: pts(K), fill: renk, 'fill-opacity': 0.16 }, s.ic); gizle(u); return u; };

  /* ---- 1. İçe dönük köşe ---- */
  async function iceDonuk(c) {
    const svg = c.svg(1000, 562);
    const B = [310, 490], C = [690, 490], A = tepe(B, C, 65, 65), D = tepe(B, C, 35, 40);
    const s = bumerang(c, svg, A, B, C, D);
    s.yaz(['50°', '30°', '25°', 'x']);
    const E = s.E(), u1 = vurgu(c, s, [A, B, E], RENK.A), u2 = vurgu(c, s, [D, E, C], RENK.C);
    koy(s.uzanti, D, D); gizle(s.dl.e.el, s.harf.E);
    await c.say('Bumerang biçimli bir dörtgen: D köşesi içe dönük.');
    await c.say('Üç köşedeki açılar belli: 50°, 30° ve 25°.', { speak: 'Üç köşedeki açılar belli: elli, otuz ve yirmi beş derece.' });
    tahmin = await tahminAl(c, { q: 'D’deki x açısı sence kaç derece?', options: ['55°', '105°', '255°'] });
    await c.say('Şekil üçgen değil; ama içinde üçgenler saklı.');
    await par(c.say('BD kenarını AC’ye kadar uzatıyoruz: E noktası.'), (async () => {
      await c.tween(900, (e) => koy(s.uzanti, D, ara(D, E, e)), ease.inOut); await belir(c, s.harf.E, 300);
    })());
    await par(c.say('İki üçgen çıktı: ABE ve DEC.'), (async () => { await belir(c, u1, 450); await c.wait(400); await belir(c, u2, 450); })());
    await c.say('Tahminini aklında tut; bu iki üçgenle ispatlayacağız.');
  }

  /* ---- 2. Dış açıyı iki kez kullan ---- */
  async function ikiKez(c) {
    const svg = c.svg(1000, 562);
    const B = [100, 490], C = [480, 490], A = tepe(B, C, 65, 65), D = tepe(B, C, 35, 40);
    const s = bumerang(c, svg, A, B, C, D);
    s.yaz(['a', 'b', 'c', 'x']); s.et.e.textContent = 'e';
    const E = s.E(), u1 = vurgu(c, s, [A, B, E], RENK.A), u2 = vurgu(c, s, [D, E, C], RENK.C);
    const kop = (V, P, Q, renk) => { const k = dilim(c, svg, V, P, Q, renk, R, { dolgu: 0.85 }); gizle(k.el); return k; };
    const kA = kop(A, B, C, RENK.A), kB = kop(B, A, D, RENK.B), kC = kop(C, A, D, RENK.C);
    const aA = yon(A, B), dA = kisa(yon(A, C) - aA), aB = yon(B, A), dB = kisa(yon(B, D) - aB), aC = yon(C, A), dC = kisa(yon(C, D) - aC);
    gizle(s.dl.e.el, s.et.e);
    const liste = adimlar(c, svg, 660, 170, { size: 28, aralik: 110 });
    const a1 = liste.ekle('e = a + b', ''), a2 = liste.ekle('x = e + c', '');
    const a3 = adimlar(c, svg, 640, 220, { size: 30 }).ekle('x = a + b + c', '50° + 30° + 25° = 105°');

    await par(c.say('ABE üçgeninde E köşesinde dışarı bakan bir açı var: e.'), (async () => {
      await belir(c, u1, 400); await belir(c, [s.dl.e.el, s.et.e], 400); await belir(c, a1.g, 400);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'e = a + b. Bu adımın gerekçesi nedir?',
      options: ['İç açılar toplamı', 'Dış açı önermesi: e, ABE üçgeninin dış açısı', 'Üçgen eşitsizliği'], answer: 1,
      hints: ['İç açılar toplamı üç iç açıyı 180°’ye bağlar; burada bir dış açı var.', '', 'Üçgen eşitsizliği kenar uzunluklarıyla ilgilidir.'],
      right: 'Dış açı, uzaktaki iki iç açının toplamıdır.',
    });
    a1.gerekce('dış açı');
    await par(c.say('a ve b dilimleri E’deki açıyı tam dolduruyor.'), (async () => {
      kA.el.style.opacity = 1;
      await c.tween(1100, (e) => kA.yon(aA, dA, ara(A, E, e), R), ease.inOut);
      kB.el.style.opacity = 1;
      await c.tween(1200, (e) => kB.yon(aB + Math.PI * e, dB, ara(B, E, e), R), ease.inOut);
    })());
    await par(c.say('Şimdi DEC üçgeni: x, D köşesinde dışarı bakan açı.'), (async () => {
      await belir(c, u1, 300, 0); await belir(c, u2, 400); await belir(c, a2.g, 400);
    })());
    await c.choice({
      tag: 'Boşluğu doldur', q: 'x = e + c. x hangi üçgenin dış açısıdır?',
      options: ['ABE', 'DEC', 'ABC'], answer: 1,
      hints: ['ABE üçgeninin dış açısı e idi; x, D köşesinde.', '', 'D, ABC üçgeninin köşesi değil.'],
      right: 'DEC üçgeninde uzaktaki iki açı: e ve c.',
    });
    a2.gerekce('dış açı');
    await par(c.say('E’deki iki dilim ve c dilimi x’i dolduruyor.'), (async () => {
      await c.tween(1100, (e) => { kA.yon(aA, dA, ara(E, D, e), R); kB.yon(aB + Math.PI, dB, ara(E, D, e), R); }, ease.inOut);
      kC.el.style.opacity = 1;
      await c.tween(1200, (e) => kC.yon(aC + Math.PI * e, dC, ara(C, D, e), R), ease.inOut);
    })());
    await par(c.say('İki adımı birleştir: e yerine a + b yaz.'), (async () => {
      await belir(c, [a1.g, a2.g, u2], 300, 0); await belir(c, a3.g, 450);
    })());
    await c.say(tahmin === 1 ? 'Tahminin tuttu: x = 105°.' : 'x = 105°: ölçmeden, iki dış açıyla bulduk.',
      { speak: tahmin === 1 ? 'Tahminin tuttu: x yüz beş derece.' : 'x yüz beş derece: ölçmeden, iki dış açıyla bulduk.' });
    c.note('<b>x = a + b + c</b><br>50° + 30° + 25° = 105°', 'İçe dönük köşe', 'gs-ice-donuk');
  }

  /* ---- 3. Yeni sayılarla ---- */
  async function yeniSayilar(c) {
    const svg = c.svg(1000, 562);
    const B = [280, 470], C = [720, 470], A = tepe(B, C, 60, 60), D0 = [500, 370];
    const s = bumerang(c, svg, A, B, C, D0);
    gizle(s.uzanti, s.dl.e.el, s.harf.E);
    const esit = renkli(c, svg, 500, 540, [''], { size: 30, kalin: 700 });
    const ciz = (P) => {
      s.koy(P); const [a, b, cc, x] = s.olcu();
      s.yaz([a + '°', b + '°', cc + '°', x + '°']);
      parcaKoy(c, esit, [[a + '°', RENK.A], ' + ', [b + '°', RENK.B], ' + ', [cc + '°', RENK.C], ' = ', [x + '°', RENK.dis]]);
    };
    await c.say('D köşesini gezdir: üç açının toplamı x’i izliyor mu?', { noWait: true });
    const t = tepeKontrol(c, svg, { x: [450, 550], y: [320, 420], bas: D0, ciz, etiket: ['D köşesi: sola, sağa', 'D köşesi: aşağı, yukarı'] });
    await c.cont('Devam ›');
    t.kaldir();
    await c.say('D nereye giderse gitsin: x = a + b + c.');
    await belir(c, [s.g, esit], 350, 0); s.g.remove(); esit.remove();

    /* taban açıları ve D'nin tabanla yaptığı açılar verilince tam ölçekli yeni şekil */
    const kur = (bc, taban, dbc, dcb, etiket) => {
      const B2 = [500 - bc / 2, 470], C2 = [500 + bc / 2, 470];
      const y = bumerang(c, svg, tepe(B2, C2, taban, taban), B2, C2, tepe(B2, C2, dbc, dcb));
      y.yaz(etiket); gizle(y.uzanti, y.dl.e.el, y.harf.E, y.g);
      return y;
    };
    let y = kur(280, 70, 35, 50, ['40°', '35°', '20°', '?']);
    await par(c.say('Sıra sende: soru işaretli açıyı bul.', { noWait: true }), belir(c, y.g, 350));
    await c.choice({
      tag: 'Soru 1 / 2', q: 'a = 40°, b = 35°, c = 20°. İçe dönük köşedeki x kaç derece?',
      options: ['85°', '95°', '265°'], answer: 1,
      hints: ['Üç açının hepsi toplanır: 40° + 35° + 20°.', '', 'x, 180°’den küçük olan açı; 360°’den çıkarmak gerekmez.'],
      right: '40° + 35° + 20° = 95°.',
    });
    cevapla(y.et.x, '95°');
    await c.wait(600);
    await belir(c, y.g, 300, 0); y.g.remove();
    y = kur(340, 65, 35, 25, ['50°', '30°', '?', '120°']);
    await belir(c, y.g, 350);
    await c.choice({
      tag: 'Soru 2 / 2', q: 'x = 120°, a = 50°, b = 30°. C’deki açı kaç derece?',
      options: ['40°', '80°', '200°'], answer: 0,
      hints: ['', '80°, a ile b’nin toplamı; c kalan kısımdır.', 'Toplamak değil: 120°, üç açının toplamı.'],
      right: '120° − 50° − 30° = 40°.',
    });
    cevapla(y.et.c, '40°');
    await c.say('Yeni şekilde tanıdık üçgeni ara.');
  }

  /* ---- 4. İç nokta ---- */
  async function icNokta(c) {
    const svg = c.svg(1000, 562);
    const S = 40, A = [300, 110], B = [80, 470], C = [480, 470], D0 = [290, 380], X0 = 560, PX = 17;
    c.S('polygon', { points: pts([A, B, C]), fill: 'rgba(110,168,255,.07)', stroke: RENK.cizgi, 'stroke-width': 3, 'stroke-linejoin': 'round' }, svg);
    const dis = c.S('g', {}, svg), icYol = c.S('g', {}, svg);
    cizgi(c, dis, A, B, RENK.A, 6); cizgi(c, dis, A, C, RENK.A, 6);
    const db = cizgi(c, icYol, D0, B, RENK.dis, 6), dc = cizgi(c, icYol, D0, C, RENK.dis, 6);
    const dn = nokta(c, svg, D0, RENK.yazi, 7);
    yazi(c, svg, A[0], A[1] - 16, 'A', { size: 24, kalin: 700 }); yazi(c, svg, B[0] - 22, B[1] + 26, 'B', { size: 24, kalin: 700 });
    yazi(c, svg, C[0] + 22, C[1] + 26, 'C', { size: 24, kalin: 700 });
    const hD = yazi(c, svg, 0, 0, 'D', { size: 24, kalin: 700 });
    const panel = c.S('g', {}, svg);
    const tIc = yazi(c, panel, X0, 200, '', { hiza: 'start', size: 28, kalin: 700, renk: RENK.dis });
    const bIc = c.S('rect', { x: X0, y: 218, width: 10, height: 18, rx: 5, fill: RENK.dis }, panel);
    const tDis = yazi(c, panel, X0, 330, '', { hiza: 'start', size: 28, kalin: 700, renk: RENK.A });
    const dT = (uz(A, B) + uz(A, C)) / S;
    c.S('rect', { x: X0, y: 348, width: dT * PX, height: 18, rx: 5, fill: RENK.A }, panel);
    tDis.textContent = '|AB| + |AC| = ' + sayi(dT);
    const ciz = (P) => {
      koy(db, P, B); koy(dc, P, C); dn.setAttribute('cx', P[0]); dn.setAttribute('cy', P[1]);
      hD.setAttribute('x', P[0] + 22); hD.setAttribute('y', P[1] - 6);
      const t = (uz(P, B) + uz(P, C)) / S;
      tIc.textContent = '|DB| + |DC| = ' + sayi(t); bIc.setAttribute('width', t * PX);
    };
    ciz(D0); gizle(dis, icYol, panel);
    await c.say('ABC üçgeninin içinde bir D noktası var.');
    await par(c.say('D’den B ve C’ye iki yol; A’dan da iki yol.'), (async () => { await belir(c, icYol, 400); await belir(c, dis, 400); })());
    await tahminAl(c, { q: 'Hangi iki yolun toplamı daha kısa?', options: ['D’den gidenler: |DB| + |DC|', 'A’dan gidenler: |AB| + |AC|', 'D’nin yerine göre değişir'] });
    await belir(c, panel, 400);
    await c.say('D’yi gezdir: iki toplamı karşılaştır.', { noWait: true });
    const t = tepeKontrol(c, svg, { x: [190, 390], y: [300, 440], bas: D0, ciz, etiket: ['D noktası: sola, sağa', 'D noktası: aşağı, yukarı'] });
    await c.cont('Devam ›');
    const P0 = t.P().slice();
    t.kaldir();
    await c.say('Denediğin her noktada içteki toplam daha küçük kaldı.');
    await par(c.say('D’yi A’ya doğru götürüyoruz.'), c.tween(1800, (e) => ciz(ara(P0, A, e)), ease.inOut));
    await c.choice({
      tag: 'Ne gördün?', q: 'D, A’ya yaklaştıkça iki toplam ne oldu?',
      options: ['Birbirine yaklaştı; D, A’ya gelince eşitlendi', 'Aralarındaki fark büyüdü', 'İçteki toplam dıştakini geçti'], answer: 0,
      hints: ['', 'Sarı çubuk uzadı, mavi çubuğa yaklaştı.', 'Sarı çubuk maviyi hiç geçmedi; en çok ona eşit oldu.'],
      right: 'D, A ile çakışınca iki yol aynı yol olur.',
    });
    await par(c.say('D içeride kaldıkça içteki yol hep daha kısa.'), c.tween(1400, (e) => ciz(ara(A, D0, e)), ease.inOut));
    await c.choice({
      tag: 'Değerlendir', q: 'Birçok noktada ölçtük, önerme hep tuttu. Bu çalışma önermeyi ispatladı mı?',
      options: ['Evet, hiç bozulmadı', 'Hayır, denediğimiz noktalar için doğruladı'], answer: 1,
      hints: ['Denemediğimiz noktalar hâlâ var; ölçmek örnek verir.', ''],
      right: 'Ölçerek doğruladık; ispat için adım ve gerekçe gerekir.',
    });
    c.note('<b>|DB| + |DC| &lt; |AB| + |AC|</b><br>D içeride; ölçerek doğrulandı.', 'İç nokta', 'gs-ic-nokta');
    await c.say('Önermeyi yeni şekle uyarladık; sonucu yine sınadık.');
  }

  Ders.start({
    id: 'geometrik-sekiller-c2', kicker: 'Konu C · Doğrulamayı sınamak ve kullanmak', title: 'Önermeyi yeni şekle uyarla', accent: '#3ddc97', back: 'index.html',
    intro: {
      title: 'Önermeyi yeni şekle uyarla',
      hook: 'Bumerang biçimli bir dörtgenin <b>içe dönük</b> köşesindeki açıyı, öbür üç köşedeki açılardan bulabilir misin?',
      button: 'Derse başla ›',
    },
    goals: ['Dış açı önermesini üçgen olmayan bir şekle uyarlar.', 'x = a + b + c eşitliğini adım ve gerekçeleriyle ispatlar.', 'Yeni bir önermeyi ölçerek doğrular; doğrulama ile ispatı ayırır.'],
    scenes: [
      { title: 'İçe dönük köşe', goal: 'Dörtgenin içindeki iki üçgeni bul.', run: iceDonuk },
      { title: 'Dış açıyı iki kez kullan', goal: 'x = a + b + c eşitliğini gerekçeleriyle ispatla.', run: ikiKez },
      { title: 'Yeni sayılarla', goal: 'Eşitliği başka şekillerde dene ve kullan.', run: yeniSayilar },
      { title: 'İç nokta', goal: 'İçeriden giden yolun daha kısa olduğunu ölçerek doğrula.', run: icNokta },
    ],
    quizTitle: 'Çıkış soruları',
    quiz: [
      {
        q: 'İçe dönük köşeli bir dörtgende öbür üç açı 45°, 25° ve 30°. İçe dönük köşedeki x kaç derecedir?',
        options: ['70°', '100°', '260°'], answer: 1,
        why: ['70° yalnızca iki açının toplamı; üçü de toplanır.', '45° + 25° + 30° = 100°.', '260°, 360°’den çıkarılarak bulunur; x üç açının toplamıdır.'],
        scene: 1,
      },
      {
        q: 'x = a + b + c ispatında hangi önermeyi iki kez kullandık?',
        options: ['Üçgen eşitsizliği', 'Dış açı önermesi', 'En uzun kenar önermesi'], answer: 1,
        why: ['Üçgen eşitsizliği kenar uzunluklarıyla ilgilidir; ispatta açılar vardı.', 'Önce ABE, sonra DEC üçgeninde: dış açı, uzaktaki iki iç açının toplamıdır.', 'Kenar uzunluklarını hiç kullanmadık.'],
        scene: 1,
      },
    ],
    summary: [
      '<b>Yeni şekilde tanıdık üçgeni ara.</b>',
      'İçe dönük köşe: <b>x = a + b + c</b>. Dış açı önermesi iki kez kullanılır; bu bir ispattır.',
      'İç nokta: |DB| + |DC| &lt; |AB| + |AC|. Ölçerek <b>doğruladık</b>, ispatlamadık.',
    ],
    nextLesson: { href: 'c3-onermeler-is-gorur.html', label: 'Sonraki: Doğrulanmış önermeler iş görür ›' },
  });
})();
