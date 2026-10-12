
// Tek başına sayfanın canlı kodu: küçük bir gösteri turu (yalnızca bu sayfada; ders modülünde döngü yoktur).
// Adres çubuğundaki # ile tur durur ve bir dinlenme pozu kurulur:
// #ilk #cins #cins2 #kesit #boy #su50 #su80 #uzun #genis #karma #bos
{
  const D = __DATA__;
  const sahne = document.querySelector(".ip-stage");
  const gosterge = document.querySelector("[data-readout]");
  const f = cizimKur(sahne.querySelector("svg"), D).arayuz;
  const tr = (v) => String(Math.round(v));
  const yaz = () => {
    const uc = [0, 1, 2].map((j) => f.durum(j)).map((d) => (d.gorunur > 0 ? tr(d.uc) : "–"));
    gosterge.textContent = "su " + tr(f.durum(0).su) + " °C · uçlar " + uc.join(" · ") + " °C";
  };
  const hepsi = (o) => [0, 1, 2].forEach((j) => f.cubuk(j, o));
  const POZ = {
    ilk: () => { hepsi({ boy: 1, kesit: 1, uc: 20, gorunur: 1 }); f.cubuk(0, { cins: "aluminyum" }); f.cubuk(1, { cins: "demir" }); f.cubuk(2, { cins: "tahta" }); f.su(80); },
    cins: () => { POZ.ilk(); f.cubuk(0, { uc: 62 }); f.cubuk(1, { uc: 41 }); f.cubuk(2, { uc: 21 }); },
    cins2: () => { POZ.ilk(); f.cubuk(0, { cins: "cam", uc: 24 }); f.cubuk(1, { cins: "tahta", uc: 21 }); f.cubuk(2, { cins: "aluminyum", uc: 62 }); },
    kesit: () => { POZ.ilk(); f.cubuk(0, { cins: "demir", kesit: 1, uc: 41 }); f.cubuk(1, { cins: "demir", kesit: 2, uc: 55 }); f.cubuk(2, { gorunur: 0 }); },
    boy: () => { POZ.ilk(); f.cubuk(0, { cins: "demir", boy: 1, uc: 41 }); f.cubuk(1, { cins: "demir", boy: 2, uc: 29 }); f.cubuk(2, { gorunur: 0 }); },
    su50: () => { POZ.ilk(); f.cubuk(0, { cins: "demir", uc: 30 }); f.cubuk(1, { gorunur: 0 }); f.cubuk(2, { gorunur: 0 }); f.su(50); },
    su80: () => { POZ.su50(); f.cubuk(0, { uc: 41 }); f.su(80); },
    uzun: () => { POZ.ilk(); hepsi({ boy: 2, kesit: 2, uc: 100 }); f.cubuk(0, { cins: "tahta" }); f.cubuk(1, { cins: "cam" }); f.cubuk(2, { cins: "aluminyum" }); f.su(100); },
    genis: () => { POZ.ilk(); hepsi({ kesit: 2, uc: 0 }); f.cubuk(0, { cins: "cam" }); f.cubuk(1, { cins: "aluminyum" }); f.cubuk(2, { cins: "demir" }); f.su(0); },
    karma: () => { POZ.ilk(); f.cubuk(0, { cins: "tahta", boy: 2, kesit: 1, uc: 30 }); f.cubuk(1, { cins: "cam", boy: 1, kesit: 2, uc: 45 }); f.cubuk(2, { cins: "demir", boy: 2, kesit: 1, uc: 70 }); },
    bos: () => { POZ.ilk(); hepsi({ gorunur: 0 }); f.su(60); },
  };
  window.iletim = f; // denetim betikleri için
  window.pozla = (ad) => { tur = false; (POZ[ad] || POZ.ilk)(); yaz(); return gosterge.textContent; };
  const kip = location.hash.slice(1);
  let tur = !kip && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!tur) (POZ[kip] || POZ.cins)();
  yaz();

  // Tur: üç cins → ince ve geniş demir → kısa ve uzun demir → tek demir, su 50 ve 80. Her adım 6 sn.
  const yum = (t) => t * t * (3 - 2 * t);
  const ara = (a, b, t) => a + (b - a) * t;
  const ADIM = [
    (t) => { POZ.ilk(); f.cubuk(0, { uc: ara(20, 62, t) }); f.cubuk(1, { uc: ara(20, 41, t) }); f.cubuk(2, { uc: ara(20, 21, t) }); },
    (t) => { POZ.kesit(); f.cubuk(0, { uc: ara(20, 41, t) }); f.cubuk(1, { uc: ara(20, 55, t) }); },
    (t) => { POZ.boy(); f.cubuk(0, { uc: ara(20, 41, t) }); f.cubuk(1, { uc: ara(20, 29, t) }); },
    (t) => { POZ.su50(); f.cubuk(0, { uc: ara(20, 30, t) }); },
    (t) => { POZ.su80(); f.cubuk(0, { uc: ara(20, 41, t) }); },
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
