// Modelin sayı denetimi: node model-sina.mjs
// PLAN.md bölüm 3'teki tablo ve bölüm 10'daki sayı ölçütleri.
import * as M from './model.mjs';

let hata = 0;
const yakin = (ad, bulunan, beklenen, pay) => {
  const tamam = Math.abs(bulunan - beklenen) <= pay;
  if (!tamam) hata++;
  console.log(`${tamam ? 'tamam' : 'HATA '}  ${ad}: ${bulunan.toFixed(4)} (beklenen ${beklenen} ± ${pay})`);
};

// d hedefine küçük adımlarla yürür; taşma geçmişe bağlı olduğu için atlanmaz.
let durum = M.ilk();
let d = 0;
let son;
const yuru = (hedef, sn = 0) => {
  const adimSayisi = Math.max(1, Math.ceil(Math.abs(hedef - d) / 0.25), Math.ceil(sn / 0.01));
  const d0 = d;
  for (let i = 1; i <= adimSayisi; i++) {
    d = d0 + ((hedef - d0) * i) / adimSayisi;
    son = M.adim(durum, d, sn ? sn / adimSayisi : 0.01);
    durum = son.durum;
  }
  return M.oku(M.yerler(durum, son.denge));
};
const yaz = (ad, o) =>
  console.log(`       ${ad}: dinamometre ${M.bicim(o.dinamometre)} N · azalma ${M.bicim(o.azalma)} N · taşan su ${M.bicim(o.tasanSu)} N`);

console.log('Tablo');
yakin('silindir hacmi (cm³)', M.SILINDIR_HACIM / 1000, 100.5, 0.05);
yakin('ağırlık (N)', M.AGIRLIK, 2.66, 0.005);
yakin('tam batınca F_k (N)', M.RO_G * M.SILINDIR_HACIM, 0.985, 0.0005);
yakin('G\'de uzama (mm)', M.AGIRLIK / M.YAY_K, 26.6, 0.05);
yakin('batma katsayısı', (M.RO_G * M.SILINDIR_ALAN) / M.YAY_K, 0.12315, 0.00001);
yakin('toplama kabında yükselme (mm)', M.SILINDIR_HACIM / M.TOPLAMA_ALAN, 35.5, 0.1);

console.log('Pozlar');
let o = yuru(0);
yaz('üstte', o);
yakin('üstte dinamometre', o.dinamometre, M.AGIRLIK, 1e-6);
yakin('üstte taşan su', o.tasanSu, 0, 1e-9);

o = yuru(45);
yaz('yarı batık', o);
yakin('yarı batık batma (mm)', son.denge.batan, 45 / 1.12315, 1e-3);
yakin('yarı batık azalma = taşan su', o.azalma - o.tasanSu, 0, 1e-6);
yakin('yarı batık yüzey (mm)', son.denge.yuzey, M.AGIZ, 1e-9);

o = yuru(80 * 1.12315);
yaz('tam batık', o);
yakin('tam batık dinamometre', o.dinamometre, 1.675, 0.0005);
yakin('tam batık azalma', o.azalma, 0.985, 0.0005);
yakin('tam batık azalma = taşan su', o.azalma - o.tasanSu, 0, 1e-6);
const tamBatik = o;

o = yuru(80 * 1.12315 + 20);
yaz('derinde', o);
yakin('derinde dalma (mm)', son.denge.dalma, d - 9.85, 0.005);
yakin('derinde azalma değişmedi', o.azalma - tamBatik.azalma, 0, 1e-6);
yakin('derinde taşan su değişmedi', o.tasanSu - tamBatik.tasanSu, 0, 1e-6);
yakin('derinde silindir tabanı (mm)', son.denge.taban, 20, 0.005);

o = yuru(M.D_MAX);
yakin('en derinde silindir tabanı (mm)', son.denge.taban, M.AGIZ - M.D_MAX + 9.85, 0.005);

o = yuru(40);
yaz('yarı çekilmiş', o);
// yüzey musluğun altında; batma, yüzey ve yay birlikte: s = (d − V/A_kap) / (1 + 0,12315 − A_sil/A_kap)
const dusus = M.SILINDIR_HACIM / M.TASIRMA_ALAN;
yakin('yarı çekilmiş batma (mm)', son.denge.batan, (40 - dusus) / (1 + 0.12315 - M.SILINDIR_ALAN / M.TASIRMA_ALAN), 1e-3);
yakin('yarı çekilmiş taşan su kaldı', o.tasanSu - tamBatik.tasanSu, 0, 1e-6);

o = yuru(0);
yaz('geri çekilmiş', o);
yakin('geri çekilmiş dinamometre', o.dinamometre, M.AGIRLIK, 1e-6);
yakin('geri çekilmiş taşan su kaldı', o.tasanSu, 0.985, 0.0005);
yakin('geri çekilmiş yüzey (mm)', son.denge.yuzey, M.AGIZ - dusus, 1e-6);

durum = M.sifirla(durum);
o = yuru(0, M.SIFIR_SURE / 2);
console.log(`       sıfırlanırken (yarı yol): taşan su ${M.bicim(o.tasanSu)} N, yüzey ${son.denge.yuzey.toFixed(2)} mm`);
yakin('sıfırlama yarı yolda', o.tasanSu, 0.985 / 2, 0.001);
o = yuru(0, M.SIFIR_SURE / 2 + 0.01);
yaz('sıfırlanmış', o);
yakin('sıfırlanmış taşan su', o.tasanSu, 0, 1e-9);
yakin('sıfırlanmış yüzey (mm)', son.denge.yuzey, M.AGIZ, 1e-9);
yakin('sıfırlama bitti', durum.sifir === null ? 1 : 0, 1, 0);

// İkinci tur ilkinin aynısı olmalı.
o = yuru(80 * 1.12315 + 20);
yakin('ikinci tur azalma = taşan su', o.azalma - o.tasanSu, 0, 1e-6);
yakin('ikinci tur taşan su', o.tasanSu, 0.985, 0.0005);

// Sudayken sıfırlama: kap silindirin çevresinde dolar, toplama kabı boşalır.
durum = M.sifirla(durum);
o = yuru(d, M.SIFIR_SURE + 0.01);
yakin('sudayken sıfırlama: yüzey (mm)', son.denge.yuzey, M.AGIZ, 1e-9);
yakin('sudayken sıfırlama: taşan su', o.tasanSu, 0, 1e-9);
yakin('sudayken sıfırlama: azalma', o.azalma, 0.985, 0.0005);

console.log(hata ? `${hata} hata` : 'model tamam');
process.exit(hata ? 1 : 0);
