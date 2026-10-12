
// Tek başına sayfanın canlı kodu: küçük bir gösteri turu (yalnızca bu sayfada; ders modülünde döngü yoktur).
// Adres çubuğundaki # ile tur durur ve bir dinlenme pozu kurulur: #disarda #yolda #ustunde #icte #denge #yag #dolu #bos
{
  const D = __DATA__;
  const sahne = document.querySelector(".ip-stage");
  const gosterge = document.querySelector("[data-readout]");
  const f = cizimKur(sahne.querySelector("svg"), D).arayuz;
  const tr = (v) => String(Math.round(v)).replace("-", "−");
  const yaz = () => {
    const d = f.durum();
    gosterge.textContent = "erlenmayer " + tr(d.ic) + " °C · beher " + tr(d.dis) + " °C";
    sahne.setAttribute("aria-valuetext", gosterge.textContent + (d.icte >= 1 ? ", erlenmayer beherin içinde" : d.icte <= 0 ? ", erlenmayer altlıkta" : ", erlenmayer taşınıyor"));
  };
  const SU = { icIcerik: "su", disIcerik: "su", icSeviye: 0.3, disSeviye: 0.7 };
  const POZ = {
    disarda: () => f.ayar({ ...SU, ic: 60, dis: 20, icte: 0 }),
    yolda: () => f.ayar({ ...SU, ic: 60, dis: 20, icte: 0.2 }),
    ustunde: () => f.ayar({ ...SU, ic: 60, dis: 20, icte: 0.6 }),
    inerken: () => f.ayar({ ...SU, ic: 60, dis: 20, icte: 0.88 }),
    icte: () => f.ayar({ ...SU, ic: 60, dis: 20, icte: 1 }),
    denge: () => f.ayar({ ...SU, ic: 30, dis: 30, icte: 1 }),
    yag: () => f.ayar({ icIcerik: "su", disIcerik: "yag", icSeviye: 0.3, disSeviye: 0.5, ic: 45, dis: 45, icte: 1 }),
    "yag-ic": () => f.ayar({ icIcerik: "yag", disIcerik: "su", icSeviye: 0.7, disSeviye: 0.3, ic: 52, dis: 38, icte: 0 }),
    dolu: () => f.ayar({ icIcerik: "su", disIcerik: "su", icSeviye: 1, disSeviye: 1, ic: 120, dis: -20, icte: 1 }),
    bos: () => f.ayar({ ...SU, icSeviye: 0, disSeviye: 0, ic: 20, dis: 20, icte: 0 }),
  };
  window.denge = f; // denetim betikleri için
  window.pozla = (ad) => { tur = false; (POZ[ad] || POZ.disarda)(); yaz(); return gosterge.textContent; };
  const kip = location.hash.slice(1);
  let tur = !kip && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!tur) (POZ[kip] || POZ.denge)();
  yaz();

  // Tur: erlenmayer beherin içine iner → iki sütun 30 °C'ta buluşur → erlenmayer altlığa döner. Her adım 5 sn.
  const yum = (t) => t * t * (3 - 2 * t);
  const cik = (t) => 1 - (1 - t) * (1 - t) * (1 - t);
  const ara = (a, b, t) => a + (b - a) * t;
  const ADIM = [
    (t) => f.ayar({ ...SU, ic: 60, dis: 20, icte: yum(Math.min(1, t / 0.7)) }),
    (t) => f.ayar({ ic: ara(60, 30, cik(t)), dis: ara(20, 30, cik(t)), icte: 1 }),
    (t) => f.ayar({ ic: 30, dis: 30, icte: 1 - yum(Math.min(1, Math.max(0, (t - 0.3) / 0.7))) }),
    (t) => f.ayar({ ic: ara(30, 60, yum(t)), dis: ara(30, 20, yum(t)), icte: 0 }),
  ];
  const SURE = 5000;
  let basla = null, gorunur = true;
  new IntersectionObserver(([e]) => { gorunur = e.isIntersecting; }).observe(sahne);
  const kare = (an) => {
    if (!tur) return;
    if (basla === null) basla = an;
    if (gorunur) {
      const gecen = (an - basla) / SURE, i = Math.floor(gecen) % ADIM.length, t = gecen - Math.floor(gecen);
      ADIM[i](Math.min(1, t / 0.85));
      yaz();
    }
    requestAnimationFrame(kare);
  };
  if (tur) requestAnimationFrame(kare);
}
