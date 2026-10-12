// Ş2 ikiz ısıtma düzeneği: gövdeyi kurar ve figürü bir duruma getirir.
// Sayfa (build.mjs içindeki canlı kod) ve ders modülü (fizik/enerji/dersler/isitma-sekil.js) aynı kodu kullanır.
// Kit gerekmez: bütün sayılar derlemede hesaplanıp D içine yazılmıştır. Zamanlayıcı yoktur; her şey ayar çağrısıyla değişir.

// İki istasyon özdeştir: sağdaki, soldakinin ekranda ötelenmiş kopyasıdır (izometrik izdüşümde dünya ötelemesi ekran ötelemesidir).
function govdeOf(D) {
  const sag = D.ist.split(D.onek + 'sol-').join(D.onek + 'sag-');
  return D.arka + '<g data-ist="sol">' + D.ist + '</g>' + D.orta
    + '<g data-ist="sag" transform="translate(' + D.kayma[0] + ' ' + D.kayma[1] + ')">' + sag + '</g>';
}

function cizimKur(kok, D) {
  const sinir = (v, a, b) => Math.min(b, Math.max(a, v));
  const yumusat = (a, b, x) => { const t = sinir((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const kay = (dz) => 'translate(0 ' + (dz * D.uz).toFixed(2) + ')';
  const yaz = (el, ad, deger) => { if (el && el.getAttribute(ad) !== deger) el.setAttribute(ad, deger); };
  const ac = (el, acik) => { if (el) el.style.display = acik ? '' : 'none'; };
  const olcekle = (el, c, s) => yaz(el, 'transform', 'translate(' + c[0] + ' ' + c[1] + ') scale(' + s.toFixed(3) + ') translate(' + (-c[0]) + ' ' + (-c[1]) + ')');
  const ICERIK = ['su', 'yag', 'buz', 'mum', 'blok', 'bos'];
  const SIVI = { su: 'su', buz: 'su', yag: 'yag', mum: 'mum' };

  const ist = {};
  for (const ad of ['sol', 'sag']) {
    const g = kok.querySelector('[data-ist="' + ad + '"]');
    const tek = (p) => g.querySelector('[data-part="' + p + '"]');
    ist[ad] = {
      g,
      kayma: ad === 'sag' ? D.kayma : [0, 0],
      durum: Object.assign({}, D.ilk),
      beher: Array.from(g.querySelectorAll('[data-grup="beher"]')),
      buz: Array.from(g.querySelectorAll('[data-buz]')),
      kabarcik: Array.from(g.querySelectorAll('[data-kabarcik]')),
      el: {
        siviKap: tek('sivi-kap'), sivi: tek('sivi'), yagCizgi: tek('yag-cizgi'),
        mumKap: tek('mum-kap'), mum: tek('mum'),
        blokKap: tek('blok-kap'), blok: tek('blok'),
        buzArka: tek('buz-arka'), buzOn: tek('buz-on'),
        termoAlt: tek('termo-alt'), kirpAlt: tek('kirp-alt'), kirpHava: tek('kirp-hava'),
        suCizgi: tek('su-cizgi'), sutun: tek('sutun'), alev: tek('alev'), kabarcikKap: tek('kabarcik'),
      },
    };
  }
  const ibre = kok.querySelector('[data-part="ibre"]');
  let saniye = 0;

  function uygula(ad) {
    const s = ist[ad], d = s.durum, el = s.el, K = D.kap;
    const blok = d.icerik === 'blok', bos = d.icerik === 'bos';
    const sivi = SIVI[d.icerik] || '';
    const h = sivi ? sinir(d.seviye, 0, 1) * K.dolu : 0;          // sıvının boyu
    const kati = sinir(d.kati, 0, 1);
    for (const parca of s.beher) ac(parca, !blok);

    // Sıvı sütunu: tam boy çizilmiştir, aşağı kayar.
    ac(el.siviKap, sivi && h > 0.2);
    yaz(el.siviKap, 'data-sivi', sivi);
    yaz(el.sivi, 'transform', kay(h - K.dolu));
    ac(el.yagCizgi, d.icerik === 'yag');

    // Bal mumu: dipte katı, üstünde sıvı.
    const hk = d.icerik === 'mum' ? kati * h : 0;
    ac(el.mumKap, hk > 0.15);
    yaz(el.mum, 'transform', kay(hk - K.dolu));

    // Buz: yüzeyle birlikte kayar; kati 1 → 0 giderken parçalar küçülür, küçükten başlayarak kaybolur.
    const buz = d.icerik === 'buz' && h > 0.2;
    ac(el.buzArka, buz); ac(el.buzOn, buz);
    if (buz) {
      yaz(el.buzArka, 'transform', kay(h - K.dolu)); yaz(el.buzOn, 'transform', kay(h - K.dolu));
      const n = D.buz.length;
      for (const parca of s.buz) {
        const i = +parca.getAttribute('data-buz');
        const pay = sinir(kati * (1 + 0.16 * (n - 1)) - 0.16 * i, 0, 1);
        ac(parca, pay > 0.004);
        if (pay > 0.004) olcekle(parca, D.buz[i], Math.sqrt(pay));
      }
    }

    // Metal blok: beher yerine tablada; seviye bloğun boyu.
    const hb = blok ? sinir(d.seviye, 0.05, 1) * D.blok.boy : 0;
    ac(el.blokKap, blok);
    yaz(el.blok, 'transform', kay(hb - D.blok.boy));

    // Termometrenin alt kısmı: opak olanın (katı mum, blok) üstünde ve sıvının içinde kalan yer sıvı tonuyla,
    // yüzeyin üstünde kalan yer kendi tonuyla çizilir. İki kırpma aynı biçimdir, düşeyde kayar.
    const zk = blok ? D.blok.z0 - K.ic + hb : hk > 0.15 ? hk : -40;   // iç tabandan ölçülür
    const zs = blok ? zk : sivi && h > 0.2 ? h : -40;
    yaz(el.kirpAlt, 'transform', kay(zk));
    yaz(el.kirpHava, 'transform', kay(zs));
    ac(el.termoAlt, sivi && h > 0.2);
    yaz(el.termoAlt, 'data-sivi', sivi);
    const keser = sivi && h > D.term.alt + 1.5;                      // yüzey termometreyi kesiyor mu
    ac(el.suCizgi, keser);
    yaz(el.suCizgi, 'data-sivi', sivi);
    yaz(el.suCizgi, 'transform', kay(h - K.dolu));

    // Kaynama kabarcıkları: sıvının (mumda erimiş kısmın) tabanından yüzeyine yükselir. kaynama yoğunluk ve görünürlük,
    // faz yükselme evresi (0 → 1 bir tam döngü; her kabarcık tam sayıda tur atar, bu yüzden faz 0 ile 1 aynı görünür).
    const kay_ = sinir(d.kaynama, 0, 1), boyS = h - hk;
    const kaynar = sivi && kay_ > 0.001 && boyS > 3;
    ac(el.kabarcikKap, kaynar);
    if (kaynar) {
      yaz(el.kabarcikKap, 'data-sivi', sivi);
      const n = D.kabarcik.length, faz = d.faz - Math.floor(d.faz);
      for (const halka of s.kabarcik) {
        const i = +halka.getAttribute('data-kabarcik'), B = D.kabarcik[i];
        const pay = sinir(kay_ * n - i, 0, 1);                       // yoğunluk: kabarcıklar birer birer eklenir
        const u = (faz * B[4] + B[3]) % 1;                           // bu kabarcığın yolundaki yeri
        const gor = pay * yumusat(0, 0.1, u) * (1 - yumusat(0.86, 1, u));
        ac(halka, gor > 0.01);
        if (gor > 0.01) {
          yaz(halka, 'cx', B[0].toFixed(1));
          yaz(halka, 'cy', (B[1] + (hk + u * boyS) * D.uz).toFixed(1));
          yaz(halka, 'r', (B[2] * (0.6 + 0.6 * u)).toFixed(2));
          halka.style.opacity = gor.toFixed(2);
        }
      }
    }

    // Sütun: boyu sıcaklıkla doğru orantılı.
    const T = sinir(d.sicaklik, D.term.min, D.term.max);
    yaz(el.sutun, 'transform', kay((T - D.term.max) * D.term.birim));

    // Alev: düz tonlu biçim; 0 kapalı, 1 kısık, 2 açık. Aradaki değerler boyu yumuşakça değiştirir.
    const a = sinir(d.alev, 0, 2);
    ac(el.alev, a > 0.02);
    if (a > 0.02) {
      olcekle(el.alev, D.alev.taban, a <= 1 ? 0.25 + 0.25 * a : 0.5 + 0.5 * (a - 1));
      el.alev.style.opacity = String(yumusat(0, 0.35, a));
    }
  }

  function ayar(ad, o) {
    const s = ist[ad];
    if (!s) throw new Error('ISITMA: istasyon "sol" ya da "sag" olmalı: ' + ad);
    if (o) {
      if (o.icerik !== undefined) {
        if (ICERIK.indexOf(o.icerik) < 0) throw new Error('ISITMA: bilinmeyen içerik: ' + o.icerik);
        s.durum.icerik = o.icerik;
      }
      for (const alan of ['seviye', 'sicaklik', 'alev', 'kati', 'kaynama', 'faz']) if (o[alan] !== undefined && isFinite(o[alan])) s.durum[alan] = +o[alan];
    }
    uygula(ad);
  }
  function goster(ad, a) {
    const s = ist[ad];
    if (!s) throw new Error('ISITMA: istasyon "sol" ya da "sag" olmalı: ' + ad);
    const v = sinir(a === undefined ? 1 : +a, 0, 1);
    s.g.style.opacity = v >= 1 ? '' : String(v);
    s.g.style.display = v <= 0 ? 'none' : '';
  }
  function sure(sn) {
    saniye = +sn || 0;
    const S = D.saat, aci = S.sifir + (saniye / 60) * Math.PI * 2;
    const uc = (r) => {
      const x = Math.sin(aci) * r, y = -Math.cos(aci) * r;
      return (S.c[0] + x * S.ex[0] + y * S.ey[0]).toFixed(1) + ' ' + (S.c[1] + x * S.ex[1] + y * S.ey[1]).toFixed(1);
    };
    yaz(ibre, 'd', 'M' + uc(-S.kuyruk) + 'L' + uc(S.boy));
  }
  const durum = (ad) => Object.assign({ sure: saniye }, ist[ad] ? ist[ad].durum : {});

  // Figür birimiyle, o anki duruma göre.
  function yer(ad) {
    if (ad === 'sureolcer') return D.nokta.sureolcer.slice();
    const [i, p] = String(ad).split('.');
    const s = ist[i];
    if (!s || !D.nokta[p]) throw new Error('ISITMA: bilinmeyen nokta: ' + ad);
    const d = s.durum;
    let [x, y] = D.nokta[p];
    if (p === 'termometre') y += (sinir(d.sicaklik, D.term.min, D.term.max) - D.term.max) * D.term.birim * D.uz;
    if (p === 'kap' && d.icerik === 'blok') y = D.blok.tepe[1] + (sinir(d.seviye, 0.05, 1) - 1) * D.blok.boy * D.uz;
    return [x + s.kayma[0], y + s.kayma[1]];
  }

  uygula('sol'); uygula('sag'); sure(0);
  return { arayuz: { ayar, goster, sure, durum }, yer };
}
