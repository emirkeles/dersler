// Ş5 ısı iletim düzeneği: gövdeyi kurar ve figürü bir duruma getirir.
// Sayfa (build.mjs içindeki canlı kod) ve ders modülü (fizik/enerji/dersler/iletim-sekil.js) aynı kodu kullanır.
// Kit gerekmez: bütün sayılar derlemede hesaplanıp D içine yazılmıştır. Zamanlayıcı yoktur; her şey ayar çağrısıyla değişir.

// Üç yuva özdeştir: yuva 1 ve 2, yuva 0'ın ekranda ötelenmiş kopyasıdır (izometrik izdüşümde dünya ötelemesi ekran
// ötelemesidir). Her yuvada dört gövde (boy × kesit) ve iki uç termometresi (boy) hazır durur; biri görünür.
// Uç termometreleri ötelenmez: sapları yuvadan yuvaya değişir (0 °C çizgileri ekranda aynı hizada).
function govdeOf(D) {
  let s = D.arka;
  for (const j of [2, 1, 0]) {
    s += '<g data-cubuk="' + j + '"><g transform="translate(' + (D.kayma[0] * j).toFixed(2) + ' ' + (D.kayma[1] * j).toFixed(2) + ')">';
    for (const v of ['b1k1', 'b1k2', 'b2k1', 'b2k2']) s += '<g data-var="' + v + '" style="display:none">' + D.yuva[v] + '</g>';
    s += '</g>';
    for (const b of [1, 2]) s += '<g data-boy="' + b + '" style="display:none">' + D.termo[j][b - 1] + '</g>';
    s += '</g>';
  }
  return s;
}

function cizimKur(kok, D) {
  const sinir = (v, a, b) => Math.min(b, Math.max(a, v));
  const yaz = (el, ad, deger) => { if (el && el.getAttribute(ad) !== deger) el.setAttribute(ad, deger); };
  const ac = (el, acik) => { if (el) { const d = acik ? '' : 'none'; if (el.style.display !== d) el.style.display = d; } };
  const sutunYaz = (el, T) => yaz(el, 'transform', 'translate(0 ' + ((sinir(T, D.term.min, D.term.max) - D.term.max) * D.term.birim * D.uz).toFixed(2) + ')');
  const CINS = ['aluminyum', 'demir', 'cam', 'tahta'];

  const cubuklar = [0, 1, 2].map((j) => {
    const g = kok.querySelector('[data-cubuk="' + j + '"]');
    const gov = {}, ter = {};
    for (const el of g.querySelectorAll('[data-var]')) {
      gov[el.getAttribute('data-var')] = { el, cubuk: el.querySelector('[data-part="cubuk"]'), doku: Array.from(el.querySelectorAll('[data-doku]')) };
    }
    for (const el of g.querySelectorAll('[data-boy]')) ter[el.getAttribute('data-boy')] = { el, sutun: el.querySelector('[data-part="sutun"]') };
    return { g, gov, ter, durum: { cins: D.ilk.cins[j], boy: D.ilk.boy, kesit: D.ilk.kesit, uc: D.ilk.uc, gorunur: D.ilk.gorunur } };
  });
  const suSutun = kok.querySelector('[data-name="su.termometre"] [data-part="sutun"]');
  let suC = D.ilk.su;

  function uygula(j) {
    const s = cubuklar[j], d = s.durum, secili = 'b' + d.boy + 'k' + d.kesit;
    for (const ad in s.gov) {
      const v = s.gov[ad];
      ac(v.el, ad === secili);
      if (ad !== secili) continue;
      yaz(v.cubuk, 'class', 'il-' + d.cins);
      for (const g of v.doku) ac(g, g.getAttribute('data-doku') === d.cins);
    }
    for (const b in s.ter) {
      ac(s.ter[b].el, +b === d.boy);
      if (+b === d.boy) sutunYaz(s.ter[b].sutun, d.uc);
    }
    const a = sinir(d.gorunur, 0, 1);
    s.g.style.opacity = a >= 1 ? '' : String(a);
    ac(s.g, a > 0);
  }

  function cubuk(j, o) {
    const s = cubuklar[j];
    if (!s) throw new Error('ILETIM: çubuk 0, 1 ya da 2 olmalı: ' + j);
    if (o) {
      if (o.cins !== undefined) {
        if (CINS.indexOf(o.cins) < 0) throw new Error('ILETIM: bilinmeyen cins: ' + o.cins);
        s.durum.cins = o.cins;
      }
      if (o.boy !== undefined && isFinite(o.boy)) s.durum.boy = +o.boy >= 1.5 ? 2 : 1;
      if (o.kesit !== undefined && isFinite(o.kesit)) s.durum.kesit = +o.kesit >= 1.5 ? 2 : 1;
      if (o.uc !== undefined && isFinite(o.uc)) s.durum.uc = +o.uc;
      if (o.gorunur !== undefined && isFinite(o.gorunur)) s.durum.gorunur = +o.gorunur;
    }
    uygula(j);
  }
  function su(C) {
    if (C !== undefined && isFinite(C)) suC = +C;
    sutunYaz(suSutun, suC);
  }
  const durum = (j) => Object.assign({ su: suC }, cubuklar[j] ? cubuklar[j].durum : {});

  // Figür birimiyle, o anki duruma göre.
  function yer(ad) {
    const N = D.nokta, dy = (T) => (sinir(T, D.term.min, D.term.max) - D.term.max) * D.term.birim * D.uz;
    if (ad === 'su.termometre') return [N.su[0], N.su[1] + dy(suC)];
    if (ad === 'su.etiket') return N.suEtiket.slice();
    if (ad === 'su.yuzey') return N.suYuzey.slice();
    const m = /^cubuk([012])\.(uc|orta|etiket|bas|son)$/.exec(String(ad));
    if (!m) throw new Error('ILETIM: bilinmeyen nokta: ' + ad);
    const j = +m[1], d = cubuklar[j].durum, tepe = N.uc[j][d.boy - 1];
    if (m[2] === 'uc') return [tepe[0], tepe[1] + dy(d.uc)];
    if (m[2] === 'etiket') return [tepe[0], N.etiketY];
    const o = N.ust['b' + d.boy + 'k' + d.kesit][m[2] === 'bas' ? 0 : m[2] === 'son' ? 2 : 1];
    return [o[0] + D.kayma[0] * j, o[1] + D.kayma[1] * j];
  }

  uygula(0); uygula(1); uygula(2); su();
  return { arayuz: { cubuk, su, durum }, yer };
}
