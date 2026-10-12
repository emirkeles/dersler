
// Tek başına sayfanın canlı kodu: küçük bir gösteri turu (yalnızca bu sayfada; ders modülünde döngü yoktur).
// Adres çubuğundaki # ile tur durur ve bir dinlenme pozu kurulur: #kapali #soba #petek #pencere #yari #isitici #havasiz #sicak
{
  const D = __DATA__;
  const sahne = document.querySelector(".ip-stage");
  const gosterge = document.querySelector("[data-readout]");
  const f = cizimKur(sahne.querySelector("svg"), D).arayuz;
  const tr = (v, n = 0) => v.toFixed(n).replace(".", ",");
  const yaz = () => {
    const d = f.durum();
    gosterge.textContent = d.termometre > 0.5 ? "tavan " + tr(d.tavan) + " °C · taban " + tr(d.taban) + " °C" : "havasız oda";
  };
  const BOS = { soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1, termometre: 1 };
  const POZ = {
    kapali: () => f.ayar(BOS),
    soba: () => f.ayar({ ...BOS, soba: 1, tavan: 40, taban: 22 }),
    petek: () => f.ayar({ ...BOS, petek: 1, tavan: 32, taban: 26 }),
    pencere: () => f.ayar({ ...BOS, petek: 1, pencere: 1, tavan: 32, taban: 26 }),
    yari: () => f.ayar({ ...BOS, pencere: 0.5 }),
    isitici: () => f.ayar({ ...BOS, isitici: 1 }),
    havasiz: () => f.ayar({ ...BOS, isitici: 1, hava: 0, termometre: 0 }),
    sicak: () => f.ayar({ ...BOS, soba: 1, petek: 1, isitici: 1, tavan: 50, taban: 0 }),
  };
  window.oda = f; // denetim betikleri için
  window.pozla = (ad) => { tur = false; (POZ[ad] || POZ.kapali)(); yaz(); return gosterge.textContent; };
  const kip = location.hash.slice(1);
  let tur = !kip && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!tur) (POZ[kip] || POZ.soba)();
  yaz();

  // Tur: soba yanar, tavan termometresi tabandakinden çok yükselir → petek → pencere açılır → hava boşalır, ısıtıcı çalışır. Her adım 6 sn.
  const yum = (t) => t * t * (3 - 2 * t);
  const ara = (a, b, t) => a + (b - a) * t;
  const ADIM = [
    (t) => f.ayar({ ...BOS, soba: Math.min(1, t * 4), tavan: ara(18, 40, t), taban: ara(18, 22, t) }),
    (t) => f.ayar({ ...BOS, petek: Math.min(1, t * 4), tavan: ara(18, 32, t), taban: ara(18, 26, t) }),
    (t) => f.ayar({ ...BOS, petek: 1, pencere: t, tavan: ara(32, 26, t), taban: ara(26, 16, t) }),
    (t) => f.ayar({ ...BOS, isitici: t > 0.5 ? 1 : 0, hava: 1 - Math.min(1, t * 2.5), termometre: 1 - Math.min(1, t * 2.5) }),
  ];
  const SURE = 6000;
  let basla = null, gorunur = true;
  new IntersectionObserver(([e]) => { gorunur = e.isIntersecting; }).observe(sahne);
  const kare = (an) => {
    if (!tur) return;
    if (basla === null) basla = an;
    if (gorunur) {
      const gecen = (an - basla) / SURE, i = Math.floor(gecen) % ADIM.length, t = gecen - Math.floor(gecen);
      ADIM[i](yum(Math.min(1, t / 0.8)));
      yaz();
    }
    requestAnimationFrame(kare);
  };
  if (tur) requestAnimationFrame(kare);
}
