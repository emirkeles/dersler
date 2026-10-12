// Ş4 kesit oda: gövdeyi kurar ve figürü bir duruma getirir.
// Sayfa (build.mjs içindeki canlı kod) ve ders modülü (fizik/enerji/dersler/oda-sekil.js) aynı kodu kullanır.
// Kit gerekmez: bütün sayılar derlemede hesaplanıp D içine yazılmıştır. Zamanlayıcı yoktur; her şey ayar çağrısıyla değişir.

// Pencere kanadı: menteşesi etrafında dönen ince kutu. Ekran ötelemesiyle döndürülemez, bu yüzden her açıklıkta yeniden
// çizilir (derleme de denetim için aynı işlevi kullanır). K: D.kanat; pay: 0 (kapalı) … 1 (tam açık).
function kanatSvg(K, pay) {
  const a = Math.min(1, Math.max(0, pay)) * K.acik, c = Math.cos(a), s = Math.sin(a), C = K.kam;
  const pr = (x, y, z) => [C.o[0] + x * C.ex[0] + y * C.ey[0], C.o[1] + x * C.ex[1] + y * C.ey[1] + z * C.uz];
  const yol = (pts) => 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
  const boy = [c, s], ic = [-s, c], dis = [s, -c];            // kanat boyunca, iç yüzün ve dış yüzün normali
  const gor = (n) => n[0] * C.cosA + n[1] * C.sinA > 1e-6;
  const ton = (n) => Math.min(3, Math.max(0, Math.floor((n[1] * C.cosA - n[0] * C.sinA + 1) * 2)));
  // u: menteşeden uzaklık, v: iç yüzden dışa doğru derinlik
  const pt = (u, v, z) => pr(K.p[0] + boy[0] * u + dis[0] * v, K.p[1] + boy[1] * u + dis[1] * v, z);
  function kutu(u0, u1, v0, v1, z0, z1, cam) {
    const yuz = (v, uA, uB, zA, zB) => yol([pt(uA, v, zA), pt(uB, v, zA), pt(uB, v, zB), pt(uA, v, zB)]);
    const parca = [], cizgi = [];
    let golge = '', dolgu = '', camYolu = '';
    const buyuk = gor(ic) ? [v0, ic] : gor(dis) ? [v1, dis] : null;
    if (buyuk) {
      let d = yuz(buyuk[0], u0, u1, z0, z1);
      if (cam) { camYolu = yuz(buyuk[0], u0 + cam, u1 - cam, z0 + cam, z1 - cam); d += camYolu; }
      dolgu += '<path class="iso-fill" fill-rule="evenodd" d="' + d + '"/>';
      golge += '<path class="iso-shade" data-shade="' + ton(buyuk[1]) + '" fill-rule="evenodd" d="' + d + '"/>';
      cizgi.push(d);
    }
    const uc = gor(boy) ? [u1, boy] : [u0, [-boy[0], -boy[1]]];
    const ucYolu = yol([pt(uc[0], v0, z0), pt(uc[0], v1, z0), pt(uc[0], v1, z1), pt(uc[0], v0, z1)]);
    const ust = yol([pt(u0, v0, z1), pt(u1, v0, z1), pt(u1, v1, z1), pt(u0, v1, z1)]);
    dolgu += '<path class="iso-fill" d="' + ucYolu + ust + '"/>';
    golge += '<path class="iso-shade" data-shade="' + ton(uc[1]) + '" d="' + ucYolu + '"/><path class="iso-top" d="' + ust + '"/>';
    cizgi.push(ucYolu, ust);
    parca.push(dolgu, golge);
    if (camYolu) parca.push('<path class="od-cam" d="' + camYolu + '"/>');
    parca.push('<path class="iso-line iso-edge" data-tone="hi" d="' + cizgi.join('') + '"/>');
    return '<g class="iso-solid">' + parca.join('') + '</g>';
  }
  const govde = kutu(0, K.w, 0, K.t, K.z0, K.z1, K.cam);
  // Kol iç yüzdedir: iç yüz görünmüyorsa kanadın arkasında kalır, çizilmez.
  const zo = (K.z0 + K.z1) / 2;
  const kol = gor(ic) ? kutu(K.w - K.kol[0] - K.kol[1], K.w - K.kol[0], -K.kol[2], 0, zo - K.kol[3], zo + K.kol[3], 0) : '';
  return govde + kol;
}

// Peteğin dilimleri özdeştir: ilki bir kez çizilir, ötekiler ekranda ötelenmiş kopyalarıdır.
function govdeOf(D) {
  const on = D.on.replace(/§(\d+)§/g, (m, i) => '<g transform="translate(' + (D.kayma[0] * i).toFixed(2) + ' ' + (D.kayma[1] * i).toFixed(2) + ')">' + D.dilim + '</g>');
  return D.arka + '<g data-part="hava">' + D.hava + '</g><g data-part="termolar">' + D.termo + '</g>'
    + D.pencere.replace('§K§', '<g data-part="kanat">' + kanatSvg(D.kanat, D.ilk.pencere) + '</g>') + on;
}

function cizimKur(kok, D) {
  const sinir = (v, a, b) => Math.min(b, Math.max(a, v));
  const yaz = (el, ad, deger) => { if (el && el.getAttribute(ad) !== deger) el.setAttribute(ad, deger); };
  const ALAN = ['soba', 'petek', 'isitici', 'pencere', 'tavan', 'taban', 'hava', 'termometre'];
  const durum = Object.assign({}, D.ilk);
  const tek = (p) => kok.querySelector('[data-part="' + p + '"]');
  const isi = {};
  for (const ad of ['soba', 'petek', 'isitici']) isi[ad] = Array.from(kok.querySelectorAll('[data-isi="' + ad + '"]'));
  const hava = tek('hava'), termolar = tek('termolar'), kanat = tek('kanat');
  const sutun = {};
  for (const ad of ['tavan', 'taban']) sutun[ad] = kok.querySelector('[data-name="' + ad + '.termometre"] [data-part="sutun"]');
  let sonKanat = D.ilk.pencere;
  const sutunKaymasi = (ad) => (sinir(durum[ad], D.term.min, D.term.max) - D.term.max) * D.term.birim * D.uz;

  function uygula() {
    // Isı kaynakları: kızgın yüzeyin turuncu kopyası tabanın üstünde durur; ayar saydamlığıdır.
    for (const ad in isi) {
      const v = sinir(durum[ad], 0, 1) * D.isi[ad];
      for (const el of isi[ad]) { el.style.opacity = v.toFixed(3); el.style.display = v > 0.004 ? '' : 'none'; }
    }
    const h = sinir(durum.hava, 0, 1);
    hava.style.opacity = h.toFixed(3); hava.style.display = h > 0.004 ? '' : 'none';
    const t = sinir(durum.termometre, 0, 1);
    termolar.style.opacity = t >= 1 ? '' : t.toFixed(3); termolar.style.display = t > 0.004 ? '' : 'none';
    for (const ad in sutun) yaz(sutun[ad], 'transform', 'translate(0 ' + sutunKaymasi(ad).toFixed(2) + ')');
    const p = sinir(durum.pencere, 0, 1);
    if (p !== sonKanat) { kanat.innerHTML = kanatSvg(D.kanat, p); sonKanat = p; }
  }
  function ayar(o) {
    if (o) for (const alan of ALAN) if (o[alan] !== undefined && isFinite(o[alan])) durum[alan] = +o[alan];
    uygula();
  }
  const durumOku = () => Object.assign({}, durum);

  // Figür birimiyle, o anki duruma göre. 'yol.<ad>.<i>' bir yolun i. noktasıdır (f.yol bunu kullanır).
  function yer(ad) {
    ad = String(ad);
    if (ad.indexOf('yol.') === 0) {
      const b = ad.split('.'), y = D.yol[b[1]];
      if (!y || !y[+b[2]]) throw new Error('ODA: bilinmeyen yol noktası: ' + ad);
      return y[+b[2]].slice();
    }
    const p = D.nokta[ad];
    if (!p) throw new Error('ODA: bilinmeyen nokta: ' + ad);
    if (ad === 'tavan.termometre' || ad === 'taban.termometre') return [p[0], p[1] + sutunKaymasi(ad.split('.')[0])];
    return p.slice();
  }
  // Tahta birimiyle nokta dizisi; kadrajı izler. f.yol(ad) diye çağrılır (f'ye bağlıdır).
  function yol(ad) {
    const y = D.yol[ad];
    if (!y) throw new Error('ODA: bilinmeyen yol: ' + ad);
    const f = this;
    return y.map((_, i) => f.nokta('yol.' + ad + '.' + i));
  }

  uygula();
  return { arayuz: { ayar, yol, durum: durumOku }, yer };
}
