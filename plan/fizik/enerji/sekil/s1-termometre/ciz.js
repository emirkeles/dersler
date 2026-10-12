// Ş1 üç ölçekli termometre: figürü bir duruma getirir.
// Sayfa (build.mjs içindeki canlı kod) ve ders modülü (fizik/enerji/dersler/termometre-sekil.js) aynı kodu kullanır.
// Kit gerekmez: bütün sayılar derlemede hesaplanıp D içine yazılmıştır. Zamanlayıcı yoktur; her şey ayar çağrısıyla değişir.
// Ölçekler arası dönüşüm yoktur: her şeridin yalnızca kendi sayılarının yeri bilinir (D.olcek).
function cizimKur(kok, D) {
  const sinir = (v, a, b) => Math.min(b, Math.max(a, v));
  const yaz = (el, ad, deger) => { if (el && el.getAttribute(ad) !== deger) el.setAttribute(ad, deger); };
  const SERIT = ['c', 'f', 'k'];
  const sutun = kok.querySelector('[data-part="sutun"]');
  const grup = {};
  for (const s of SERIT) grup[s] = Array.from(kok.querySelectorAll('[data-grup="serit-' + s + '"]'));
  const durum = Object.assign({}, D.ilk);

  function sicaklik(C) {
    if (C !== undefined && isFinite(C)) durum.sicaklik = +C;
    const T = sinir(durum.sicaklik, D.term.min, D.term.max);
    yaz(sutun, 'transform', 'translate(0 ' + ((T - D.term.max) * D.term.birim * D.uz).toFixed(2) + ')');
  }
  function goster(o) {
    for (const s of SERIT) {
      if (o && o[s] !== undefined && isFinite(o[s])) durum[s] = sinir(+o[s], 0, 1);
      const v = durum[s];
      for (const el of grup[s]) {
        el.style.opacity = v >= 1 ? '' : v.toFixed(3);
        el.style.display = v <= 0 ? 'none' : '';
      }
    }
  }
  // Bir şeritte bir değerin yeri: çentikli kenarda, figür birimiyle. Aralığın dışı kırpılır.
  // sag: şeridin öteki (sağ) kenarı; sayı buranın sağına yazılır.
  function serittekiYer(s, deger, sag) {
    const o = D.olcek[s];
    if (!o) throw new Error('TERMO: şerit "c", "f" ya da "k" olmalı: ' + s);
    if (deger === '' || deger === null || !isFinite(deger)) throw new Error('TERMO: ' + s + ' şeridinde sayı bekleniyor: ' + deger);
    return [sag ? o.sag : o.x, o.y0 + (sinir(+deger, o.min, o.max) - o.ref) * o.adim];
  }
  // Figür birimiyle, o anki duruma göre. 'c@0' bir şerit değeridir (çentikli kenar); 'c@0+' aynı değerin şeridin sağ kenarındaki yeri.
  function yer(ad) {
    const isim = String(ad);
    const k = isim.indexOf('@');
    if (k > 0) {
      const sag = isim.charAt(isim.length - 1) === '+';
      return serittekiYer(isim.slice(0, k), isim.slice(k + 1, sag ? -1 : undefined), sag);
    }
    if (isim === 'sutun') return [D.term.tepe[0], D.term.tepe[1] + (sinir(durum.sicaklik, D.term.min, D.term.max) - D.term.max) * D.term.birim * D.uz];
    if (!D.nokta[isim]) throw new Error('TERMO: bilinmeyen nokta: ' + ad);
    return D.nokta[isim].slice();
  }
  // Tahta birimiyle (kadrajı izler): dersin f.olcek(...) çağrısı. Kurulmuş figürün yöntemi olarak çağrılır.
  function olcek(s, deger) {
    serittekiYer(s, deger);
    if (!this || typeof this.nokta !== 'function') throw new Error('TERMO: olcek, f.olcek(serit, deger) biçiminde çağrılır');
    return this.nokta(s + '@' + (+deger));
  }
  // Aynı değerin şeridin sağ kenarındaki yeri: sayı buranın hemen sağına yazılır (kadraj değişse de şeride yapışık kalır).
  function olcekSag(s, deger) {
    serittekiYer(s, deger);
    if (!this || typeof this.nokta !== 'function') throw new Error('TERMO: olcekSag, f.olcekSag(serit, deger) biçiminde çağrılır');
    return this.nokta(s + '@' + (+deger) + '+');
  }

  sicaklik(); goster();
  return { arayuz: { sicaklik, goster, olcek, olcekSag, durum: () => Object.assign({}, durum) }, yer };
}
