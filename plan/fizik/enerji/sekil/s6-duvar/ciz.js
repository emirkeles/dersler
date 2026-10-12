// Ş6 duvar kesiti: gövdeyi kurar ve figürü bir duruma getirir.
// Sayfa (build.mjs içindeki canlı kod) ve ders modülü (fizik/enerji/dersler/duvar-sekil.js) aynı kodu kullanır.
// Kit gerekmez: bütün sayılar derlemede hesaplanıp D içine yazılmıştır. Zamanlayıcı yoktur; her şey ayar çağrısıyla değişir.

// Yalıtım levhası tek gruptur: duvardaki yerinde çizilmiştir, çıkarılınca ekranda D.kayma kadar ötelenir
// (izometrik izdüşümde dünya ötelemesi ekran ötelemesidir).
function govdeOf(D) {
  return D.arka + D.duvar + '<g data-part="levha">' + D.levha + '</g>' + D.on;
}

function cizimKur(kok, D) {
  const sinir = (v, a, b) => Math.min(b, Math.max(a, v));
  const yaz = (el, ad, deger) => { if (el && el.getAttribute(ad) !== deger) el.setAttribute(ad, deger); };
  const sutun = (ad) => kok.querySelector('[data-name="' + ad + '.termometre"] [data-part="sutun"]');
  const el = {
    levha: kok.querySelector('[data-part="levha"]'),
    cift: Array.from(kok.querySelectorAll('[data-grup="cift"]')),
    ic: sutun('ic'),
    dis: sutun('dis'),
  };
  const durum = Object.assign({}, D.ilk);
  const derece = (v) => sinir(v, D.term.min, D.term.max);
  // Levhanın duvardan uzaklığı (0 takılı, 1 çıkarılmış) ve dış yüzün levhaya geçme payı (son çeyrekte 0 → 1).
  const uzak = () => 1 - sinir(durum.yalitim, 0, 1);
  const kapli = () => sinir((sinir(durum.yalitim, 0, 1) - 0.75) * 4, 0, 1);

  function uygula() {
    const u = uzak();
    yaz(el.levha, 'transform', 'translate(' + (D.kayma[0] * u).toFixed(2) + ' ' + (D.kayma[1] * u).toFixed(2) + ')');
    const cift = durum.cam >= 1.5;
    for (const parca of el.cift) parca.style.display = cift ? '' : 'none';
    for (const ad of ['ic', 'dis']) yaz(el[ad], 'transform', 'translate(0 ' + ((derece(durum[ad]) - D.term.max) * D.term.birim * D.uz).toFixed(2) + ')');
  }

  function ayar(o) {
    if (o) for (const alan of ['yalitim', 'cam', 'ic', 'dis']) if (o[alan] !== undefined && isFinite(o[alan])) durum[alan] = +o[alan];
    uygula();
  }

  // Figür birimiyle, o anki duruma göre.
  function yer(ad) {
    const N = D.nokta;
    if (ad === 'ic.termometre' || ad === 'dis.termometre') {
      const p = N[ad];
      return [p[0], p[1] + (derece(durum[ad.slice(0, ad.indexOf('.'))]) - D.term.max) * D.term.birim * D.uz];
    }
    if (ad === 'duvar.dis' || ad === 'kalinlik.b') { const k = kapli(); return [N[ad][0] + D.kalin[0] * k, N[ad][1] + D.kalin[1] * k]; }
    if (ad === 'yalitim') { const u = uzak(); return [N.yalitim[0] + D.kayma[0] * u, N.yalitim[1] + D.kayma[1] * u]; }
    if (ad === 'cam') return (durum.cam >= 1.5 ? N.cam2 : N.cam1).slice();
    if (ad === 'duvar.ic' || ad === 'kalinlik.a') return N[ad].slice();
    if (ad === 'ic.etiket' || ad === 'dis.etiket') {
      // Tabanın ön kenarının altı; iki nokta aynı y'dedir (iki yazı tek satıra düşer). Kadraj tabanı kesiyorsa kadrajın
      // alt kenarı: yazı her kadrajda figürün hemen altında kalır.
      const kutu = (kok.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
      const alt = kutu.length === 4 && isFinite(kutu[3]) ? kutu[1] + kutu[3] : Infinity;
      return [N[ad][0], Math.min(Math.max(N['ic.etiket'][1], N['dis.etiket'][1]), alt)];
    }
    throw new Error('DUVAR: bilinmeyen nokta: ' + ad);
  }

  uygula();
  return { arayuz: { ayar, durum: () => Object.assign({}, durum) }, yer };
}
