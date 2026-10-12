// Ş3 ısıl denge düzeneği: figürü bir duruma getirir.
// Sayfa (build.mjs içindeki canlı kod) ve ders modülü (fizik/enerji/dersler/denge-sekil.js) aynı kodu kullanır.
// Kit gerekmez: bütün sayılar derlemede hesaplanıp D içine yazılmıştır. Zamanlayıcı yoktur; her şey ayar çağrısıyla değişir.

function cizimKur(kok, D) {
  const sinir = (v, a, b) => Math.min(b, Math.max(a, v));
  const f1 = (v) => (Math.round(v * 10) / 10).toString();
  const kay = (dz) => 'translate(0 ' + (dz * D.uz).toFixed(2) + ')';
  const yaz = (el, ad, deger) => { if (el && el.getAttribute(ad) !== deger) el.setAttribute(ad, deger); };
  const ac = (el, acik) => { if (el) el.style.display = acik ? '' : 'none'; };
  const tek = (p, ata) => (ata || kok).querySelector('[data-part="' + p + '"]');
  const oge = (ad) => kok.querySelector('[data-name="' + ad + '"]');
  const ICERIK = ['su', 'yag'];
  const E = D.erlen, B = D.beher, Y = D.yol;

  const el = {
    erlen: tek('erlen'), yer: tek('erlen-yer'),
    icSiviKap: tek('ic-sivi-kap'), icKirp: tek('ic-kirp'), icYuzey: tek('ic-yuzey'), icYuzeyCizgi: tek('ic-yuzey-cizgi'), icYag: tek('ic-yag'),
    icAlt: tek('ic-alt'), icSuCizgi: tek('ic-su-cizgi'),
    icSutun: tek('sutun', oge('ic.termometre')), icHava: tek('kirp-hava', oge('ic.termometre')),
    disSiviKap: tek('dis-sivi-kap'), disSivi: tek('dis-sivi'), disYag: tek('dis-yag'),
    disAlt: tek('dis-alt'), disSuCizgi: tek('dis-su-cizgi'),
    disSutun: tek('sutun', oge('dis.termometre')), disHava: tek('kirp-hava', oge('dis.termometre')),
    perde: tek('perde'), perdeKirp: tek('perde-kirp'), perdeIc: tek('perde-ic'), cizgiKap: tek('erlen-cizgi-kap'), cizgi: tek('erlen-cizgi'),
  };
  const durum = Object.assign({}, D.ilk);
  let duzey = 0;            // beherdeki sıvının o anki boyu (iç tabandan)
  let onde = false;         // erlenmayer grubu en sonda mı (beherin ağzının üstündeyken her şeyin önündedir)
  let konum = [0, 0];       // erlenmayerin, beherin içindeki yerine göre yolu: [yatay uzaklık, yükseklik] (dünya birimi)

  // Erlenmayerin yolu: altlıktan düşey kalkar, yuvarlak köşeyle yataya döner, beherin üstünde yuvarlak köşeyle iner.
  // icte yol boyunca eşit hızla ilerler. Döner: [beherdeki yerinden yatay uzaklık, tabandan yükseklik].
  const KOSE = Y.kose, DIK = Y.kalk - KOSE, YATAY = Y.git - 2 * KOSE, YAY = Math.PI * KOSE / 2;
  const TOPLAM = 2 * DIK + 2 * YAY + YATAY;
  function yol(icte) {
    let s = (1 - sinir(icte, 0, 1)) * TOPLAM;      // beherin içinden geriye doğru ölçülür
    if (s <= DIK) return [0, s];
    s -= DIK;
    if (s <= YAY) { const a = s / KOSE; return [KOSE * (1 - Math.cos(a)), DIK + KOSE * Math.sin(a)]; }
    s -= YAY;
    if (s <= YATAY) return [KOSE + s, Y.kalk];
    s -= YATAY;
    if (s <= YAY) { const a = s / KOSE; return [Y.git - KOSE + KOSE * Math.sin(a), DIK + KOSE * Math.cos(a)]; }
    s -= YAY;
    return [Y.git, Math.max(0, DIK - s)];
  }
  // Erlenmayerin dış yüzü: tabandan x yüksekliğe kadar olan hacmi (π'siz) ve o yükseklikteki yarıçapı.
  function hacim(x) {
    let v = 0;
    for (let i = 0; i < E.dis.length - 1 && x > E.dis[i][0]; i++) {
      const s0 = E.dis[i][0], ra = E.dis[i][1], s1 = E.dis[i + 1][0], s = Math.min(x, s1);
      const rb = ra + (E.dis[i + 1][1] - ra) * (s - s0) / ((s1 - s0) || 1);
      v += (s - s0) / 3 * (ra * ra + ra * rb + rb * rb);
    }
    return v;
  }
  function disR(x) {
    const p = E.dis;
    if (x <= p[0][0]) return p[0][1];
    for (let i = 0; i < p.length - 1; i++) if (x <= p[i + 1][0]) return p[i][1] + (p[i + 1][1] - p[i][1]) * (x - p[i][0]) / ((p[i + 1][0] - p[i][0]) || 1);
    return p[p.length - 1][1];
  }
  // Yatay bir çemberin ekrandaki elipsi ve yakın (alt) yayı.
  const elips = (x, y, r) => { const rx = f1(r * D.ks), ry = f1(r * D.ks * D.ey); return 'M' + f1(x - r * D.ks) + ' ' + f1(y) + 'A' + rx + ' ' + ry + ' 0 0 0 ' + f1(x + r * D.ks) + ' ' + f1(y) + 'A' + rx + ' ' + ry + ' 0 0 0 ' + f1(x - r * D.ks) + ' ' + f1(y) + 'Z'; };
  const altYay = (x, y, r) => 'M' + f1(x - r * D.ks) + ' ' + f1(y) + 'A' + f1(r * D.ks) + ' ' + f1(r * D.ks * D.ey) + ' 0 0 0 ' + f1(x + r * D.ks) + ' ' + f1(y);

  function uygula() {
    const d = durum;
    konum = yol(d.icte);
    // Gövdede erlenmayer beherin içindeki yerinde çizilidir; grup oradan ekranda ötelenir (aynı derinlik çizgisi: yatay kayma).
    const tx = konum[0] * D.ks, ty = konum[1] * D.uz;
    yaz(el.erlen, 'transform', 'translate(' + tx.toFixed(2) + ' ' + ty.toFixed(2) + ')');
    // Çizim sırası: kabın tabanı beherin ağzının altındayken grup beherin arka ve ön yarısı arasındadır; üstündeyken en öndedir.
    // Eşikte erlenmayer ile beherin ön yarısı ekranda üst üste gelmez; geçiş görünmez.
    const ustte = konum[1] >= Y.esik;
    if (ustte !== onde) { onde = ustte; if (ustte) kok.appendChild(el.erlen); else el.yer.parentNode.insertBefore(el.erlen, el.yer); }

    // Erlenmayerin içi: koni gövdesi yüzeyin teğet kirişinde kırpılır, yüzey elipsi üstüne çizilir (grubun kendi biriminde).
    const hi = sinir(d.icSeviye, 0, 1) * E.dolu, dolu = hi > 0.2;
    const gx = E.taban[0], gy = E.taban[1];                           // grubun içinde erlenmayerin iç tabanının ortası
    ac(el.icSiviKap, dolu);
    if (dolu) {
      const r = E.r0 + E.egim * hi, y = gy + hi * D.uz, yk = y + r * E.egim * D.ke * D.ks;
      yaz(el.icSiviKap, 'data-sivi', d.icIcerik);
      yaz(el.icKirp, 'd', 'M' + f1(gx - 400) + ' ' + f1(yk) + 'H' + f1(gx + 400) + 'V' + f1(yk + 400) + 'H' + f1(gx - 400) + 'Z');
      yaz(el.icYuzey, 'd', elips(gx, y, r));
      yaz(el.icYuzeyCizgi, 'd', elips(gx, y, r));
      ac(el.icYag, d.icIcerik === 'yag');
      if (d.icIcerik === 'yag') yaz(el.icYag, 'd', elips(gx, y, Math.max(1, r - 3.2)));
    }
    // Termometrenin alt kısmı: sıvının içinde sıvı tonuyla (alttaki kopya), yüzeyin üstünde kendi tonuyla (kırpılan asıl).
    yaz(el.icHava, 'transform', kay(dolu ? hi : -40));
    ac(el.icAlt, dolu);
    yaz(el.icAlt, 'data-sivi', d.icIcerik);
    ac(el.icSuCizgi, dolu && hi > D.term.altIc + 1.5);
    yaz(el.icSuCizgi, 'data-sivi', d.icIcerik);
    yaz(el.icSuCizgi, 'transform', kay(hi - E.dolu));

    // Beherin içi: erlenmayer içerideyken batan hacmi kadar sıvı yükselir (ikiye bölmeyle çözülür), ağzın altında durur.
    const h0 = sinir(d.disSeviye, 0, 1) * B.dolu, icinde = konum[0] <= KOSE + 0.01, zb = konum[1];
    let h = h0;
    if (icinde && h0 > zb) {
      const A0 = B.ri * B.ri;
      let a = h0, b = h0 + E.boy;
      for (let i = 0; i < 26; i++) { const m = (a + b) / 2; if (A0 * m - hacim(m - zb) < A0 * h0) a = m; else b = m; }
      h = (a + b) / 2;
    }
    h = Math.min(h, B.tavan);
    duzey = h;
    const disDolu = h > 0.2;
    ac(el.disSiviKap, disDolu);
    yaz(el.disSiviKap, 'data-sivi', d.disIcerik);
    yaz(el.disSivi, 'transform', kay(h - B.tavan));
    ac(el.disYag, d.disIcerik === 'yag');
    yaz(el.disHava, 'transform', kay(disDolu ? h : -40));
    ac(el.disAlt, disDolu);
    yaz(el.disAlt, 'data-sivi', d.disIcerik);
    ac(el.disSuCizgi, disDolu && h > D.term.altDis + 1.5);
    yaz(el.disSuCizgi, 'data-sivi', d.disIcerik);
    yaz(el.disSuCizgi, 'transform', kay(h - B.tavan));

    // Erlenmayerin sıvıda kalan kısmı: sıvı tonlu saydam perde, su çizgisinin yakın yayının altında.
    const batan = icinde && disDolu ? Math.min(h - zb, E.boy) : 0;
    ac(el.perde, batan > 0.3); ac(el.cizgiKap, batan > 0.3);
    if (batan > 0.3) {
      const x = E.dip[0] + tx, y = B.taban[1] + h * D.uz, r = disR(batan);
      yaz(el.perde, 'data-sivi', d.disIcerik); yaz(el.cizgiKap, 'data-sivi', d.disIcerik);
      yaz(el.perdeKirp, 'd', altYay(x, y, r) + 'H' + f1(x + 400) + 'V' + f1(y + 400) + 'H' + f1(x - 400) + 'V' + f1(y) + 'Z');
      yaz(el.perdeIc, 'transform', 'translate(' + tx.toFixed(2) + ' ' + ty.toFixed(2) + ')');
      yaz(el.cizgi, 'd', altYay(x, y, r));
    }

    // Sütunlar: boyu sıcaklıkla doğru orantılı.
    const t = (v) => kay((sinir(v, D.term.min, D.term.max) - D.term.max) * D.term.birim);
    yaz(el.icSutun, 'transform', t(d.ic));
    yaz(el.disSutun, 'transform', t(d.dis));
  }

  function ayar(o) {
    if (o) {
      for (const alan of ['icIcerik', 'disIcerik']) if (o[alan] !== undefined) {
        if (ICERIK.indexOf(o[alan]) < 0) throw new Error('DENGE: içerik "su" ya da "yag" olmalı: ' + o[alan]);
        durum[alan] = o[alan];
      }
      for (const alan of ['ic', 'dis', 'icSeviye', 'disSeviye', 'icte']) if (o[alan] !== undefined && isFinite(o[alan])) durum[alan] = +o[alan];
    }
    uygula();
  }
  const durumOf = () => Object.assign({ disDuzey: duzey }, durum);

  // Figür birimiyle, o anki duruma göre.
  function yer(ad) {
    const N = D.nokta, wx = konum[0] * D.ks, wy = konum[1] * D.uz;
    const sutun = (v) => (sinir(v, D.term.min, D.term.max) - D.term.max) * D.term.birim * D.uz;
    if (ad === 'dis.termometre') return [N[ad][0], N[ad][1] + sutun(durum.dis)];
    if (ad === 'ic.termometre') return [N[ad][0] + wx, N[ad][1] + wy + sutun(durum.ic)];
    if (ad === 'ic.kap') return [N[ad][0] + wx, N[ad][1] + wy];
    if (ad === 'dis.kap' || ad === 'dis.etiket' || ad === 'ic.etiket') return N[ad].slice();
    if (ad === 'temas') {
      const icinde = konum[0] <= KOSE + 0.01, batan = icinde ? sinir(duzey - konum[1], 0, E.boy) : 0;
      const s = batan > 0.3 ? batan / 2 : 22;
      return [E.dip[0] + wx - disR(s) * D.ks, E.dip[1] + wy + s * D.uz];
    }
    throw new Error('DENGE: bilinmeyen nokta: ' + ad);
  }

  uygula();
  return { arayuz: { ayar, durum: durumOf }, yer };
}
