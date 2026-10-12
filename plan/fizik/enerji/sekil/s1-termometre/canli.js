
// Tek başına sayfanın canlı kodu: küçük bir gösteri turu (yalnızca bu sayfada; ders modülünde döngü yoktur).
// Adres çubuğundaki # ile tur durur ve bir dinlenme pozu kurulur: #oda #donma #kaynama #min #max #celsius #bos #yari
{
  const D = __DATA__;
  const sahne = document.querySelector(".ip-stage");
  const gosterge = document.querySelector("[data-readout]");
  const kur = cizimKur(sahne.querySelector("svg"), D);
  const f = kur.arayuz;
  const tr = (v) => String(Math.round(v)).replace("-", "−");
  const yaz = () => {
    const d = f.durum();
    const acik = ["c", "f", "k"].filter((s) => d[s] > 0.5).map((s) => ({ c: "Celsius", f: "Fahrenheit", k: "Kelvin" })[s]);
    gosterge.textContent = "sütun " + tr(d.sicaklik) + " °C · " + (acik.length ? acik.join(", ") : "şerit yok");
  };
  const hepsi = { c: 1, f: 1, k: 1 };
  const POZ = {
    oda: () => { f.sicaklik(20); f.goster(hepsi); },
    donma: () => { f.sicaklik(0); f.goster(hepsi); },
    kaynama: () => { f.sicaklik(100); f.goster(hepsi); },
    min: () => { f.sicaklik(-20); f.goster(hepsi); },
    max: () => { f.sicaklik(120); f.goster(hepsi); },
    celsius: () => { f.sicaklik(70); f.goster({ c: 1, f: 0, k: 0 }); },
    bos: () => { f.sicaklik(0); f.goster({ c: 0, f: 0, k: 0 }); },
    yari: () => { f.sicaklik(37); f.goster({ c: 1, f: 0.5, k: 0.5 }); },
  };
  window.termo = f; // denetim betikleri için
  window.termoYer = kur.yer;
  window.pozla = (ad) => { tur = false; (POZ[ad] || POZ.oda)(); yaz(); return gosterge.textContent; };
  const kip = location.hash.slice(1);
  let tur = !kip && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!tur) (POZ[kip] || POZ.oda)();
  yaz();

  // Tur: oda sıcaklığı → donma (0 °C) → kaynama (100 °C) → oda. Her adım 5 sn; son beşte biri bekleme.
  const yum = (t) => t * t * (3 - 2 * t);
  const ara = (a, b, t) => a + (b - a) * t;
  const ADIM = [[20, 0], [0, 100], [100, 20]];
  const SURE = 5000;
  let basla = null, gorunur = true;
  new IntersectionObserver(([e]) => { gorunur = e.isIntersecting; }).observe(sahne);
  const kare = (an) => {
    if (!tur) return;
    if (basla === null) basla = an;
    if (gorunur) {
      const gecen = (an - basla) / SURE, i = Math.floor(gecen) % ADIM.length, t = gecen - Math.floor(gecen);
      f.sicaklik(ara(ADIM[i][0], ADIM[i][1], yum(Math.min(1, t / 0.8))));
      yaz();
    }
    requestAnimationFrame(kare);
  };
  if (tur) requestAnimationFrame(kare);
}
