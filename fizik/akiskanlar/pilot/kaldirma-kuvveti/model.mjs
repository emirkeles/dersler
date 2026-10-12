// Arşimet düzeneğinin saf modeli. Derleme (build.mjs) ve sayfa (live.js) aynı kodu kullanır:
// içe aktarma yok, DOM yok, zaman yalnızca `adim` içindeki dt ile girer.
// Birimler: uzunluk mm, hacim mm³, kuvvet N, açı derece, süre sn.

export const RO_G = 1000 * 9.8 * 1e-9;            // suyun özgül ağırlığı (1000 kg/m³ · 9,8 m/s²), N/mm³

export const SILINDIR_R = 20;
export const SILINDIR_BOY = 80;
export const SILINDIR_ALAN = Math.PI * SILINDIR_R * SILINDIR_R;
export const SILINDIR_HACIM = SILINDIR_ALAN * SILINDIR_BOY;
export const AGIRLIK = 2700 * 9.8 * 1e-9 * SILINDIR_HACIM;   // alüminyum, 2700 kg/m³

export const YAY_K = 0.1;                         // 0–5 N, 50 mm'de tam ölçek
export const OLCEK_N = 5;
export const OLCEK_MM = OLCEK_N / YAY_K;

export const TASIRMA_R = 45;                      // taşırma kabı, iç yarıçap
export const TASIRMA_ALAN = Math.PI * TASIRMA_R * TASIRMA_R;
export const AGIZ = 120;                          // musluğun kap tabanından yüksekliği

export const TOPLAMA_R = 30;                      // toplama kabı, iç yarıçap
export const TOPLAMA_ALAN = Math.PI * TOPLAMA_R * TOPLAMA_R;

export const TERAZI_TUR = 2;                      // kadranın tam turu, N

// Taşıyıcının indirilme miktarı. 0'da silindirin tabanı dolu kabın yüzeyine değer.
// 130'da silindir kabın tabanına 0,15 mm girerdi; üst sınır tabandan 5 mm pay bırakır.
export const D_MIN = 0;
export const D_MAX = 125;

export const SIFIR_SURE = 1.2;

const yumusak = (t) => t * t * (3 - 2 * t);

// Verilen indirme ve kaptaki eksik su için dengeyi çözer: yüzey, batma ve yay birlikte.
// dalma: silindir tabanının yüzeyin altındaki derinliği (boyu aşabilir); batan = min(dalma, boy).
// f azalandır (yüzeyin eğimi 0,198 < 1 + 0,123), kök tektir ve [0, d] içindedir.
export function coz(d, eksik) {
  const yuzeyde = (s) => Math.min(AGIZ, AGIZ + (SILINDIR_ALAN * s - eksik) / TASIRMA_ALAN);
  const f = (p) => {
    const s = Math.min(p, SILINDIR_BOY);
    return yuzeyde(s) - AGIZ + d - (RO_G * SILINDIR_ALAN * s) / YAY_K - p;
  };
  let alt = 0;
  let ust = Math.max(d, 0);
  if (f(0) <= 0) ust = 0;
  else {
    for (let i = 0; i < 30; i++) {
      const orta = (alt + ust) / 2;
      if (f(orta) > 0) alt = orta;
      else ust = orta;
    }
  }
  const dalma = (alt + ust) / 2;
  const batan = Math.min(dalma, SILINDIR_BOY);
  const kaldirma = RO_G * SILINDIR_ALAN * batan;
  const gerilme = AGIRLIK - kaldirma;
  return {
    dalma,
    batan,
    kaldirma,
    gerilme,
    uzama: gerilme / YAY_K,
    yuzey: yuzeyde(batan),
    taban: AGIZ - d + kaldirma / YAY_K,           // silindir tabanının kap tabanından yüksekliği
  };
}

// eksik: taşırma kabının dolu hâline göre eksik su. toplanan: toplama kabındaki su.
// İkisi yalnızca taşmayla birlikte artar; sıfırlamada ayrılırlar.
export function ilk() {
  return { eksik: 0, toplanan: 0, sifir: null };
}

// Toplama kabı boşalır, taşırma kabı yeniden musluğa kadar dolar. Silindir o sırada sudaysa
// kap onun çevresinde dolar: eksik batan hacme iner, sıfıra değil.
export function sifirla(durum) {
  if (durum.sifir) return durum;
  return { ...durum, sifir: { t: 0, eksik: durum.eksik, toplanan: durum.toplanan } };
}

export function adim(durum, d, dt) {
  let { eksik, toplanan, sifir } = durum;
  if (sifir) {
    const t = Math.min(sifir.t + dt, SIFIR_SURE);
    const zarf = 1 - yumusak(t / SIFIR_SURE);
    eksik = sifir.eksik * zarf;
    toplanan = sifir.toplanan * zarf;
    sifir = t < SIFIR_SURE ? { ...sifir, t } : null;
  }
  const denge = coz(d, eksik);
  const tasan = Math.max(0, SILINDIR_ALAN * denge.batan - eksik);
  eksik += tasan;
  if (!durum.sifir) toplanan += tasan;
  return { durum: { eksik, toplanan, sifir }, denge, tasan: durum.sifir ? 0 : tasan };
}

// Parçaların yeri: gösterge diskinin ölçekteki yeri, toplama kabındaki seviye, ibrenin açısı.
export function yerler(durum, denge) {
  const seviye = durum.toplanan / TOPLAMA_ALAN;
  return {
    uzama: denge.uzama,
    seviye,
    ibre: (RO_G * TOPLAMA_ALAN * seviye / TERAZI_TUR) * 360,
  };
}

// Sayılar parçaların yerinden okunur. "azalma" yaydan, "tasanSu" ibreden gelir; aynı sayıdan türemezler.
export function oku(yer) {
  const dinamometre = YAY_K * yer.uzama;
  return {
    dinamometre,
    azalma: AGIRLIK - dinamometre,
    tasanSu: (yer.ibre / 360) * TERAZI_TUR,
  };
}

export function bicim(x, hane = 2) {
  const yazi = Math.abs(x).toFixed(hane).replace('.', ',');
  return x < 0 && Number(yazi.replace(',', '.')) !== 0 ? '−' + yazi : yazi;
}
