
// Tek başına sayfanın canlı kodu: küçük bir gösteri turu (yalnızca bu sayfada; ders modülünde döngü yoktur).
// Adres çubuğundaki # ile tur durur ve bir dinlenme pozu kurulur: #su #isinmis #yag #buz #buz-yari #mum #mum-yari #blok #bos #kaynar #tek
{
  const D = __DATA__;
  const sahne = document.querySelector(".ip-stage");
  const gosterge = document.querySelector("[data-readout]");
  const f = cizimKur(sahne.querySelector("svg"), D).arayuz;
  const tr = (v, n = 0) => v.toFixed(n).replace(".", ",");
  const yaz = () => {
    const a = f.durum("sol"), b = f.durum("sag");
    gosterge.textContent = "sol " + tr(a.sicaklik) + " °C · sağ " + tr(b.sicaklik) + " °C · " + tr(a.sure) + " sn";
  };
  const POZ = {
    su: () => { f.ayar("sol", { icerik: "su", seviye: 0.6, sicaklik: 24, alev: 0, kati: 1, kaynama: 0 }); f.ayar("sag", { icerik: "su", seviye: 0.6, sicaklik: 24, alev: 0, kati: 1, kaynama: 0 }); f.sure(0); },
    isinmis: () => { f.ayar("sol", { icerik: "su", seviye: 0.9, sicaklik: 33, alev: 2 }); f.ayar("sag", { icerik: "su", seviye: 0.45, sicaklik: 42, alev: 2 }); f.sure(42); },
    yag: () => { f.ayar("sol", { icerik: "su", seviye: 0.6, sicaklik: 40, alev: 1 }); f.ayar("sag", { icerik: "yag", seviye: 0.6, sicaklik: 64, alev: 1 }); f.sure(20); },
    buz: () => { f.ayar("sol", { icerik: "buz", seviye: 0.7, sicaklik: 0, alev: 2, kati: 1 }); f.ayar("sag", { icerik: "su", seviye: 0.7, sicaklik: 58, alev: 2 }); f.sure(8); },
    "buz-yari": () => { f.ayar("sol", { icerik: "buz", seviye: 0.7, sicaklik: 0, alev: 2, kati: 0.45 }); f.ayar("sag", { icerik: "buz", seviye: 0.7, sicaklik: 12, alev: 2, kati: 0 }); f.sure(31); },
    mum: () => { f.ayar("sol", { icerik: "mum", seviye: 0.5, sicaklik: 22, alev: 0, kati: 1 }); f.ayar("sag", { icerik: "mum", seviye: 0.5, sicaklik: 80, alev: 1, kati: 0 }); f.sure(0); },
    "mum-yari": () => { f.ayar("sol", { icerik: "mum", seviye: 0.6, sicaklik: 63, alev: 2, kati: 0.5 }); f.ayar("sag", { icerik: "mum", seviye: 0.6, sicaklik: 63, alev: 2, kati: 0.2 }); f.sure(50); },
    blok: () => { f.ayar("sol", { icerik: "blok", seviye: 0.5, sicaklik: 70, alev: 2 }); f.ayar("sag", { icerik: "blok", seviye: 1, sicaklik: 45, alev: 2 }); f.sure(15); },
    bos: () => { f.ayar("sol", { icerik: "bos", sicaklik: -20, alev: 0 }); f.ayar("sag", { icerik: "bos", sicaklik: 120, alev: 0 }); f.sure(0); },
    kaynar: () => { f.ayar("sol", { icerik: "su", seviye: 0.8, sicaklik: 100, alev: 2, kaynama: 1, faz: 0.3 }); f.ayar("sag", { icerik: "su", seviye: 0.5, sicaklik: 96, alev: 2, kaynama: 0.4, faz: 0.3 }); f.sure(55); },
    tek: () => { POZ.su(); f.goster("sag", 0); },
  };
  window.isitma = f; // denetim betikleri için
  window.pozla = (ad) => { tur = false; (POZ[ad] || POZ.su)(); yaz(); return gosterge.textContent; };
  const kip = location.hash.slice(1);
  let tur = !kip && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!tur) (POZ[kip] || POZ.isinmis)();
  yaz();

  // Tur: su ısınır (sol çok su, sağ az su) → buz erir (sütun 0 °C'ta durur) → mum erir → blok. Her adım 6 sn.
  const yum = (t) => t * t * (3 - 2 * t);
  const ara = (a, b, t) => a + (b - a) * t;
  const ADIM = [
    (t) => { f.ayar("sol", { icerik: "su", seviye: 0.9, sicaklik: ara(24, 33, t), alev: 2, kati: 1, kaynama: 0 }); f.ayar("sag", { icerik: "su", seviye: 0.45, sicaklik: ara(24, 42, t), alev: 2, kati: 1 }); f.sure(ara(0, 40, t)); },
    (t) => { f.ayar("sol", { icerik: "buz", seviye: 0.7, sicaklik: t < 0.75 ? 0 : ara(0, 14, (t - 0.75) * 4), alev: 2, kati: 1 - Math.min(1, t / 0.75) }); f.ayar("sag", { icerik: "su", seviye: 0.7, sicaklik: ara(20, 70, t), alev: 2 }); f.sure(ara(0, 60, t)); },
    (t) => { f.ayar("sol", { icerik: "mum", seviye: 0.55, sicaklik: t < 0.2 ? ara(22, 63, t * 5) : t < 0.8 ? 63 : ara(63, 80, (t - 0.8) * 5), alev: 1, kati: 1 - yum(Math.min(1, Math.max(0, (t - 0.2) / 0.6))) }); f.ayar("sag", { icerik: "yag", seviye: 0.55, sicaklik: ara(22, 110, t), alev: 1 }); f.sure(ara(0, 90, t)); },
    (t) => { f.ayar("sol", { icerik: "blok", seviye: 0.5, sicaklik: ara(20, 80, t), alev: 2 }); f.ayar("sag", { icerik: "blok", seviye: 1, sicaklik: ara(20, 50, t), alev: 2 }); f.sure(ara(0, 30, t)); },
    (t) => { f.ayar("sol", { icerik: "su", seviye: 0.6, sicaklik: ara(80, 100, Math.min(1, t * 2)), alev: 2, kaynama: Math.max(0, t * 2 - 0.8), faz: t * 3 }); f.ayar("sag", { icerik: "su", seviye: 0.6, sicaklik: ara(60, 90, t), alev: 1, kaynama: 0 }); f.sure(ara(0, 45, t)); },
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
