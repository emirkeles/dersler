
// Sayfadaki döngü. Derleme bu dosyayı kit ve modelden sonra satır içine alır; __…__ yerlerini doldurur.
const D = __DATA__;
const P = D.P;
const yayYolu = __YAY_YOLU__;
const ibreYolu = __IBRE_YOLU__;

const stage = document.querySelector(".kk-stage");
const svg = stage.querySelector("svg");
const cizFigur = cizimKur(svg, D, yayYolu, ibreYolu);
const gostergeYazi = document.querySelector("[data-readout]");
const durumYazi = stage.querySelector("[data-durum]");
const sakin = matchMedia("(prefers-reduced-motion: reduce)");

const sinirla = (x, a, b) => Math.min(b, Math.max(a, x));
const yumusat = (a, b, x) => {
  const t = sinirla((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
// Durum: d gösterilen indirme, hedef istenen. Model yarı-statiktir; yay her an dengededir.
let d = 0;
let hedef = 0;
let durum = ilk();
let denge = coz(0, 0);
let akis = 0; // akış çizgisinin zarfı, 0..1
let bekleyenSifir = false; // sıfırlama önce silindiri sudan çıkarır
let kare = 0;
let son = 0;
let saat = 0;
let turda = !sakin.matches;
let turSifirladi = false;
let gorunur = false;
let bosZaman = 0;
let sonYazi = "";

// Boşta tur: yavaşça indir (tam batana ve 20 mm daha derine), bekle, kaldır, sıfırla, yinele.
const TUR = [
  [0, 0],
  [1.2, 0],
  [9.2, D.derin],
  [11.2, D.derin],
  [16.2, 0],
  [19.4, 0],
];
const TUR_SIFIR = 16.6;
const turHedefi = (t) => {
  for (let i = 1; i < TUR.length; i++) {
    if (t <= TUR[i][0]) return TUR[i - 1][1] + (TUR[i][1] - TUR[i - 1][1]) * yumusat(TUR[i - 1][0], TUR[i][0], t);
  }
  return 0;
};

function ciz() {
  const yer = cizFigur(d, durum, denge, akis);
  // Sayılar parçaların o anki yerinden okunur: yaydan ve ibreden.
  const okunan = oku(yer);
  const mesgul = bekleyenSifir || durum.sifir;
  const yazi = mesgul ? "sıfırlanıyor" : `dinamometre ${bicim(okunan.dinamometre)} N · azalma ${bicim(okunan.azalma)} N · taşan su ${bicim(okunan.tasanSu)} N`;
  if (yazi !== sonYazi) {
    gostergeYazi.textContent = yazi;
    sonYazi = yazi;
  }
  return okunan;
}

// Erişilebilir değer her karede değil, hareket durunca yazılır.
function anlat(okunan) {
  const konum = denge.dalma <= 0 ? "Silindir suyun üstünde" : denge.dalma < SILINDIR_BOY ? `Silindirin ${Math.round(denge.batan)} milimetresi suda` : "Silindir tümüyle suda";
  stage.setAttribute("aria-valuenow", String(Math.round(d)));
  stage.setAttribute("aria-valuetext", `${konum}. Dinamometre ${bicim(okunan.dinamometre)} newton, azalma ${bicim(okunan.azalma)} newton, taşan su ${bicim(okunan.tasanSu)} newton.`);
}

function adimAt(simdi) {
  const dt = son ? Math.min((simdi - son) / 1000, 1 / 30) : 1 / 60;
  son = simdi;
  const dingin = sakin.matches;
  if (turda) {
    saat += dt;
    if (saat >= TUR[TUR.length - 1][0]) {
      saat = 0;
      turSifirladi = false;
    }
    hedef = turHedefi(saat);
    if (saat >= TUR_SIFIR && !turSifirladi) {
      turSifirladi = true;
      bekleyenSifir = true;
    }
  }
  if (bekleyenSifir) hedef = 0;
  d = dingin ? hedef : d + (hedef - d) * (1 - Math.exp(-dt / (turda ? 0.12 : 0.32)));
  if (Math.abs(hedef - d) < 0.02) d = hedef;
  if (bekleyenSifir && d === 0) {
    bekleyenSifir = false;
    durum = sifirla(durum);
    durumYazi.textContent = "Düzenek sıfırlanıyor.";
  }
  const sifirdaydi = Boolean(durum.sifir);
  const sonuc = adim(durum, d, dingin && durum.sifir ? SIFIR_SURE : dt);
  durum = sonuc.durum;
  denge = sonuc.denge;
  if (sifirdaydi && !durum.sifir) durumYazi.textContent = "Düzenek sıfırlandı: toplama kabı boş, taşırma kabı dolu.";
  const akiyor = sonuc.tasan > 1e-6 ? 1 : 0;
  akis = dingin ? akiyor : akis + (akiyor - akis) * (1 - Math.exp(-dt / (akiyor ? 0.09 : 0.22)));
  if (akis < 0.004) akis = 0;
  const okunan = ciz();
  const durdu = !turda && d === hedef && !durum.sifir && !bekleyenSifir && akis === 0;
  if (durdu) anlat(okunan);
  kare = gorunur && !durdu ? requestAnimationFrame(adimAt) : 0;
}
const kos = () => {
  if (!kare && gorunur) {
    son = 0;
    kare = requestAnimationFrame(adimAt);
  }
};
// Okuyucu devralır: tur durur, durum olduğu yerde kalır; 3,6 sn sessizlikten sonra tur sürer.
function devral() {
  turda = false;
  clearTimeout(bosZaman);
  bosZaman = setTimeout(() => {
    turda = !sakin.matches;
    saat = 0;
    turSifirladi = false;
    kos();
  }, 3600);
}
function yonel(yeni) {
  devral();
  bekleyenSifir = false;
  hedef = sinirla(yeni, D_MIN, D_MAX);
  kos();
}
function sifirlaIste() {
  devral();
  if (!durum.sifir) bekleyenSifir = true;
  kos();
}

new IntersectionObserver(
  (girdiler) => {
    gorunur = girdiler[girdiler.length - 1].isIntersecting;
    if (gorunur) kos();
  },
  { rootMargin: "120px 0px" },
).observe(stage);
sakin.addEventListener("change", () => {
  turda = turda && !sakin.matches;
  kos();
});

// İşaretçi: sahnedeki düşey konum indirme miktarına eşlenir (üstte 0, altta en derin).
const isaretten = (olay) => {
  const kutu = svg.getBoundingClientRect();
  return sinirla(((olay.clientY - kutu.top) / kutu.height - 0.18) / 0.6, 0, 1) * D_MAX;
};
stage.addEventListener("pointermove", (olay) => {
  if (olay.pointerType === "touch") return;
  yonel(isaretten(olay));
});
stage.addEventListener("pointerdown", (olay) => yonel(isaretten(olay)));
stage.addEventListener("keydown", (olay) => {
  const adimBoyu = olay.shiftKey ? 10 : 2;
  const buradan = turda ? d : hedef; // turdayken okuyucunun gördüğü yerden adımla
  let yeni = null;
  if (olay.key === "ArrowDown") yeni = buradan + adimBoyu;
  if (olay.key === "ArrowUp") yeni = buradan - adimBoyu;
  if (olay.key === "Home") yeni = D_MIN;
  if (olay.key === "End") yeni = D_MAX;
  if (olay.key === "Enter") {
    olay.preventDefault();
    sifirlaIste();
    return;
  }
  if (yeni === null) return;
  olay.preventDefault();
  yonel(yeni);
});
stage.addEventListener("focus", () => anlat(oku(yerler(durum, denge))));
ciz();
