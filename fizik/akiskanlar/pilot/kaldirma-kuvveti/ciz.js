
// Figürü bir duruma getirir. Sayfa (live.js) ve ders modülü (dersler/arsimet-sekil.js) aynı kodu kullanır.
// Kit (translateAlong, segment, pathOf, axisVector) ve model (YAY_K, AGIZ, SILINDIR_BOY, yerler) aynı kapsamda olmalıdır.
function cizimKur(kok, D, yayYolu, ibreYolu) {
  const P = D.P;
  const tek = (ad) => kok.querySelector(`[data-part="${ad}"]`);
  const hepsi = (ad) => [...kok.querySelectorAll(`[data-part="${ad}"]`)];
  const el = {
    tasiyici: tek("tasiyici"),
    silindir: hepsi("silindir"),
    cubukKirp: kok.querySelector("#kk-cubuk [data-hold]"),
    direkKirp: tek("direk-kirp"),
    gosterge: tek("gosterge"),
    yayArka: tek("yay-arka"),
    yayOn: tek("yay-on"),
    su: tek("su"),
    sualtiYuzey: tek("sualti-yuzey"),
    sualtiKapak: tek("sualti-kapak"),
    sualtiSap: tek("sualti-sap"),
    suCizgi: tek("su-cizgi"),
    beherSu: tek("beher-su"),
    akis: tek("akis"),
    akisCizgi: tek("akis-cizgi"),
    akisHalka: tek("akis-halka"),
    ibre: tek("ibre"),
  };
  const yumusat = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  const kaydir = (dz) => (dz ? translateAlong(P, [0, 0, dz]) : "");
  const yaz = (dugum, ad, deger) => {
    if (dugum.getAttribute(ad) !== deger) dugum.setAttribute(ad, deger);
  };
  const yolOf = (noktalar) => pathOf(noktalar, true);

  // d: taşıyıcının indirilmesi; durum ve denge modelden; akis: akış çizgisinin zarfı, 0..1. Parçaların yerini döndürür.
  return function ciz(d, durum, denge, akis) {
    const kalkis = denge.kaldirma / YAY_K; // yay bu kadar kısaldı, silindir bu kadar yükseldi
    const yer = yerler(durum, denge);
    yaz(el.tasiyici, "transform", kaydir(-d));
    for (const dugum of el.silindir) yaz(dugum, "transform", kaydir(-d + kalkis));
    yaz(el.cubukKirp, "transform", kaydir(-kalkis));
    yaz(el.direkKirp, "transform", kaydir(-d));
    yaz(el.gosterge, "transform", kaydir(kalkis));
    const yay = yayYolu(D.yay.ust, D.yay.alt + kalkis, D.yay.c, D.yay.r, D.yay.tur, P);
    yaz(el.yayArka, "d", yay.arka);
    yaz(el.yayOn, "d", yay.on);

    const inis = denge.yuzey - AGIZ;
    yaz(el.su, "transform", kaydir(inis));
    yaz(el.sualtiYuzey, "transform", kaydir(inis));
    yaz(el.suCizgi, "transform", kaydir(inis));
    // Su çizgisi yalnızca silindir yüzeyi keserken görünür; iki uçta 2 mm'de girer ve çıkar.
    el.suCizgi.style.opacity = String(yumusat(0, 2, denge.dalma) * (1 - yumusat(SILINDIR_BOY - 0.5, SILINDIR_BOY + 1.5, denge.dalma)));
    // Silindir tümüyle batınca su üst yüzünü kenardan içeri doğru kapatır.
    const ortu = yumusat(SILINDIR_BOY, SILINDIR_BOY + 3, denge.dalma);
    if (ortu > 0) {
      const [cx, cy] = D.kapak.merkez;
      const dis = D.kapak.halka.map(([x, y]) => [cx + x, cy + y]);
      const ic = ortu < 1 ? D.kapak.halka.map(([x, y]) => [cx + x * (1 - ortu), cy + y * (1 - ortu)]) : [];
      yaz(el.sualtiKapak, "d", yolOf(dis) + (ic.length ? yolOf(ic) : ""));
      yaz(el.sualtiKapak, "transform", kaydir(-d + kalkis));
      // Üst yüzün üstünde, suyun içinde kalan sap ve çubuk: yüzeyden silindirin tepesine dar bir sütun.
      const birim = axisVector(P, [0, 0, 1])[1];
      const yYuzey = cy + birim * (D.yuzeyFarki + inis);
      const yTepe = cy + birim * (-d + kalkis);
      const yari = 3.4 * D.olcek * ortu;
      yaz(el.sualtiSap, "d", yolOf([[cx - yari, yYuzey], [cx + yari, yYuzey], [cx + yari, yTepe], [cx - yari, yTepe]]));
    } else {
      yaz(el.sualtiKapak, "d", "");
      yaz(el.sualtiSap, "d", "");
    }

    yaz(el.beherSu, "transform", kaydir(yer.seviye - D.beherSu));
    el.beherSu.style.opacity = String(yumusat(0, 0.8, yer.seviye));
    if (akis > 0.01) {
      el.akis.style.display = "";
      el.akis.style.opacity = String(akis);
      const [x, y, z] = D.akis.ust;
      yaz(el.akisCizgi, "d", segment([x, y, z], [x, y, D.akis.taban + yer.seviye], P));
      // Sayfada kesikler CSS ile akar; derste zamanlayıcı yoktur, kesikler toplanan suyla ilerler.
      yaz(el.akisCizgi, "stroke-dashoffset", (-(durum.toplanan / 350) % 8).toFixed(2));
      yaz(el.akisHalka, "transform", kaydir(yer.seviye - D.beherSu));
    } else el.akis.style.display = "none";
    yaz(el.ibre, "d", ibreYolu(yer.ibre / 360));
    return yer;
  };
}
