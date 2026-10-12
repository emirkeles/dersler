
// Tek başına sayfanın canlı kodu: küçük bir gösteri turu (yalnızca bu sayfada; ders modülünde döngü yoktur).
// Adres çubuğundaki # ile tur durur ve bir dinlenme pozu kurulur: #takili #cikmis #ara #cift #cift-cikmis #kis #yaz #uc
{
  const D = __DATA__;
  const sahne = document.querySelector(".ip-stage");
  const gosterge = document.querySelector("[data-readout]");
  const f = cizimKur(sahne.querySelector("svg"), D).arayuz;
  const tr = (v) => String(Math.round(v)).replace("-", "−");
  const yaz = () => {
    const d = f.durum();
    gosterge.textContent = "iç " + tr(d.ic) + " °C · dış " + tr(d.dis) + " °C · yalıtım " + (d.yalitim > 0.99 ? "takılı" : d.yalitim < 0.01 ? "çıkarılmış" : "yolda") + " · " + (d.cam >= 1.5 ? "çift cam" : "tek cam");
  };
  const POZ = {
    takili: { yalitim: 1, cam: 1, ic: 20, dis: 20 },
    cikmis: { yalitim: 0, cam: 1, ic: 22, dis: 0 },
    ara: { yalitim: 0.5, cam: 1, ic: 22, dis: 0 },
    cift: { yalitim: 1, cam: 2, ic: 19, dis: 0 },
    "cift-cikmis": { yalitim: 0, cam: 2, ic: 19, dis: 0 },
    kis: { yalitim: 1, cam: 1, ic: 17, dis: 0 },
    yaz: { yalitim: 0, cam: 1, ic: 33, dis: 38 },
    uc: { yalitim: 1, cam: 2, ic: -10, dis: 50 },
  };
  window.duvar = f; // denetim betikleri için
  window.pozla = (ad) => { tur = false; f.ayar(POZ[ad] || POZ.takili); yaz(); return gosterge.textContent; };
  const kip = location.hash.slice(1);
  let tur = !kip && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!tur) f.ayar(POZ[kip] || POZ.kis);
  yaz();

  // Tur: kış gecesi yalıtımsız (iç 22 → 9) → levha takılır → aynı gece (22 → 17) → yaz, levha çıkar (25 → 33) → çift cam. Her adım 5 sn.
  const yum = (t) => t * t * (3 - 2 * t);
  const ara = (a, b, t) => a + (b - a) * t;
  const ADIM = [
    (t) => f.ayar({ yalitim: 0, cam: 1, dis: 0, ic: ara(22, 9, t) }),
    (t) => f.ayar({ yalitim: yum(Math.min(1, t * 2)), cam: 1, dis: 0, ic: ara(9, 22, Math.min(1, t * 2)) }),
    (t) => f.ayar({ yalitim: 1, cam: 1, dis: 0, ic: ara(22, 17, t) }),
    (t) => f.ayar({ yalitim: 1 - yum(Math.min(1, t * 2)), cam: 1, dis: ara(0, 38, Math.min(1, t * 2)), ic: ara(17, 25, Math.min(1, t * 2)) }),
    (t) => f.ayar({ yalitim: 0, cam: 1, dis: 38, ic: ara(25, 33, t) }),
    (t) => f.ayar({ yalitim: yum(Math.min(1, t * 2)), cam: t > 0.5 ? 2 : 1, dis: ara(38, 0, Math.min(1, t * 2)), ic: ara(33, 22, Math.min(1, t * 2)) }),
    (t) => f.ayar({ yalitim: 1, cam: 2, dis: 0, ic: ara(22, 19, t) }),
  ];
  const SURE = 5000;
  let basla = null, gorunur = true;
  new IntersectionObserver(([e]) => { gorunur = e.isIntersecting; }).observe(sahne);
  const kare = (an) => {
    if (!tur) return;
    if (basla === null) basla = an;
    if (gorunur) {
      const gecen = (an - basla) / SURE, i = Math.floor(gecen) % ADIM.length, t = gecen - Math.floor(gecen);
      ADIM[i](Math.min(1, t / 0.8));
      yaz();
    }
    requestAnimationFrame(kare);
  };
  if (tur) requestAnimationFrame(kare);
}
