// Ş1 · Üç ölçekli gösteri termometresi: geometri, kayıt, tek başına sayfa ve ders modülü.
// node build.mjs [--light] [--audit] [--boyut]
// Yazar: termometre.html | termometre-light.html (bu klasöre) ve fizik/enerji/dersler/termometre-sekil.js (window.TERMO).
//
// Kurgu: pano izleyiciye tam dönüktür (kamera azimutu 90°, pano x–z düzleminde). Böylece aynı yükseklik ekranda aynı yatay
// çizgidir: sütunun tepesi ile üç şeritteki karşılığı tek bir yatay çizgiye düşer. İzometrik hacmi veren taban plakasıdır:
// plaka panoya göre 22° dönüktür ve pano onun üstündeki döner tablada durur (döner ayaklı gösteri panosu).
// Termometre panodaki düşey yarıkta durur: sütunun ekseni şeritlerin ön yüzüyle aynı düzlemdedir (y = EKSEN_Y), bu yüzden
// yukarıdan bakışın kaydırması (paralaks) yoktur.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as O from "../parcalar.mjs";

const { k, G, A } = O;
const HERE = dirname(fileURLToPath(import.meta.url));
const KOK = join(HERE, "..", "..", "..", "..", "..");
const THEME = process.argv.includes("--light") ? "light" : "dark";
const W = 450;
const H = 600; // oran 0,75 (IZOMETRIK.md 6b)
const AZ = 90;
const EL = 30;
const r2 = (v) => Math.round(v * 100) / 100;

// ---- Ölçüler (dünya birimi yaklaşık 1 mm; z = 0 taban plakasının üstü; x sağa, y izleyiciye, z yukarı) ----
const BETA = (22 * Math.PI) / 180; // taban plakasının panoya göre dönüklüğü
const PLAKA = { x: -92, y: -52, w: 184, d: 104, r: 8 }; // plakanın kendi eksenlerinde
const PLAKA_H = 12;
const AYAK_H = 8;
const TABLA = { r: 42, h: 5 };
const Z_PANO = TABLA.h + 5; // panonun altı (kirişin üstü)
const PANO = { arka: -3, on: 3 }; // levhanın kalınlığı (y)

const CAM = { r: 4.8, hazne: 6.8, sutun: 2, hazneBoy: 10 };
const YARIK = 7.4; // yarığın yarı genişliği
const SERIT = { en: 10, kalin: 1.2, ilk: 12, adim: 52, merdiven: 3.4 }; // ilk: eksenden ilk şeridin çentikli kenarına
const LEVHA_EN = 26; // şeritlerin tepesindeki boş plakaların eni
const PANO_EN = 18 + SERIT.ilk + 2 * SERIT.adim + LEVHA_EN + 6;
const XT = 18 - PANO_EN / 2; // termometre ekseni (pano x = 0 çevresinde ortalı)
const KIRIS = { x: -PANO_EN / 2 - 3, y: -8, w: PANO_EN + 6, d: 16, r: 1.5, z: TABLA.h, h: 5 }; // panonun oturduğu kiriş
const EKSEN_Y = PANO.on + SERIT.kalin; // termometre ekseni = şeritlerin ön yüzü
const BIRIM = 1.3; // 1 °C'ın boyu
const TERMO = { min: -20, max: 120 };
const Z_ALT = Z_PANO + 7; // haznenin en altı
const Z_GOVDE = Z_ALT + CAM.hazne + CAM.hazneBoy;
const KELEPCE = { yari: 11, on: 11, h: 7 };
const K_ALT = [Z_GOVDE + 7, Z_GOVDE + 7 + KELEPCE.h];
const Z_MIN = K_ALT[1] + 4; // −20 °C
const Z0 = Z_MIN - TERMO.min * BIRIM; // 0 °C
const Z_MAX = Z0 + TERMO.max * BIRIM; // 120 °C
const K_UST = [Z_MAX + 8, Z_MAX + 8 + KELEPCE.h]; // ön yüzü 120 °C çizgisini örtmesin diye 8 yukarıda
const Z_UC = K_UST[1] + 5; // camın bittiği yer
const KAPAK = { r: 5.5, h: 3 };

// Üç şerit: iki sabit noktaya göre hizalıdır (suyun donma ve kaynama sıcaklığı). Bir şeridin bir değeri, kendi iki sabit
// sayısı arasında doğrusal olarak yerleşir; şeritler arasında dönüşüm yapılmaz.
const Z_DONMA = Z0;
const Z_KAYNAMA = Z0 + 100 * BIRIM;
const OLCEK = {
  c: { ad: "c", donma: 0, kaynama: 100, min: -20, max: 120, adim: 10, uzun: 50 },
  f: { ad: "f", donma: 32, kaynama: 212, min: 0, max: 240, adim: 20, uzun: 100 },
  k: { ad: "k", donma: 273, kaynama: 373, min: 250, max: 390, adim: 10, uzun: 50 },
};
const SIRA = ["c", "f", "k"];
const zOf = (o, v) => Z_DONMA + ((v - o.donma) / (o.kaynama - o.donma)) * (Z_KAYNAMA - Z_DONMA);
const xOf = (i) => XT + SERIT.ilk + i * SERIT.adim; // şeridin çentikli (sol) kenarı
const Z_S0 = Z0 - 27 * BIRIM; // şeritlerin gövdesi: en düşük çentiğin (250 K) biraz altından
const Z_S1 = Z0 + 124 * BIRIM; // en yüksek çentiğin (120 °C) biraz üstüne
const LEVHA = { en: LEVHA_EN, alt: Z_S1 + 5, h: 20 }; // şeritlerin tepesindeki boş plakalar
const Z_PANO_UST = LEVHA.alt + LEVHA.h + 5;
const PANO_X = [-PANO_EN / 2, PANO_EN / 2];
const RAY_H = 3;
const DIREK = { c: [(PANO_X[0] + PANO_X[1]) / 2, -14], r: 3 };
const KOL = { z: Z_PANO_UST + RAY_H, h: 4 };
const Z_TEPE = KOL.z + KOL.h + 5.6;

// ---- Plakanın eksenlerinden dünyaya ----
const don = ([u, v]) => [u * Math.cos(BETA) - v * Math.sin(BETA), u * Math.sin(BETA) + v * Math.cos(BETA)];
const donPlan = (plan, steps = 8) => k.ringOf(plan, steps).map(don);
const plakaRing = donPlan(PLAKA);

const P = k.fitProjection(
  [
    ...plakaRing.flatMap(([x, y]) => [[x, y, -PLAKA_H - AYAK_H], [x, y, 0]]),
    [PANO_X[0], 0, Z_PANO_UST + RAY_H],
    [PANO_X[1], 0, Z_PANO_UST + RAY_H],
    [DIREK.c[0], 0, Z_TEPE],
    [DIREK.c[0], DIREK.c[1], KOL.z + KOL.h + 5],
  ],
  W,
  H,
  { pad: 18, azimuth: AZ, elevation: EL },
);
const T = O.atolye(P, { bantlar: [{ piece: "sabit" }] });
const { R, KS, at, S, Ln, Dots } = T;
const yuzYolu = (x0, x1, z0, z1, y) => k.pathOf([at([x0, y, z0]), at([x1, y, z0]), at([x1, y, z1]), at([x0, y, z1])], true);
const yuzVida = (noktalar, y, r = 1.3) => Ln(noktalar.map(([x, z]) => k.sideRing([x, y, z], r, "y", P, 12)).join(""), { tone: "lo" }) + Dots(noktalar.map(([x, z]) => at([x, y, z])), { size: 0.45 });

// ---- Taban: dönük plaka, ayaklar, etiket plakası ----
let halo;
{
  const plaka = R.solid(A.extruded(plakaRing, -PLAKA_H, PLAKA_H, { name: "taban.plaka", ground: true }));
  for (const [i, uv] of k.corners(PLAKA, 13).entries()) {
    const [x, y] = don(uv);
    T.silindir(`taban.flans${i}`, 0, [x, y], 7, -PLAKA_H - AYAK_H, 1.6, { tone: "lo" }, { steps: 20 });
    T.silindir(`taban.ayak${i}`, 0, [x, y], 5.4, -PLAKA_H - AYAK_H + 1.6, AYAK_H - 1.6, { tone: "mid" }, { steps: 20, ek: Ln(k.knurl(x, y, 5.4, -PLAKA_H - AYAK_H + 1.6, -PLAKA_H, 22, P), { tone: "lo" }) });
  }
  const vidalar = k.corners(PLAKA, 10).map(don);
  const ETIKET = { x: -72, y: 28, w: 36, d: 17, r: 1.5 };
  const etiketRing = donPlan(ETIKET, 4);
  const satir = [0.78, 0.55, 0.66].map((oran, i) => k.onTop([don([ETIKET.x + 4, ETIKET.y + 4.5 + i * 4]), don([ETIKET.x + 4 + (ETIKET.w - 8) * oran, ETIKET.y + 4.5 + i * 4])], 0.8, P)).join("");
  const ek = [
    Ln(k.onTop(donPlan(k.insetPlan(PLAKA, 5)), 0, P, true), { tone: "lo" }),
    Ln(vidalar.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }),
    Dots(vidalar.map(([x, y]) => at([x, y, 0])), { size: 0.5 }),
    S(k.extrude(etiketRing, 0, 0.8, P), { tone: "lo", crease: "none" }),
    Ln(k.onTop(donPlan(k.insetPlan(ETIKET, 1.6), 4), 0.8, P, true), { tone: "faint" }),
    Ln(satir, { tone: "lo", free: true }),
    Dots([don([ETIKET.x + 2.6, ETIKET.y + ETIKET.d / 2]), don([ETIKET.x + ETIKET.w - 2.6, ETIKET.y + ETIKET.d / 2])].map(([x, y]) => at([x, y, 0.8])), { size: 0.45 }),
  ];
  R.solid(A.extruded(etiketRing, 0, 0.8, { name: "taban.etiket", owner: "taban.plaka" }));
  T.koy("taban.plaka", 0, [0, 0, -PLAKA_H / 2], S(k.extrude(plakaRing, -PLAKA_H, PLAKA_H, P, { bevel: 1.6 }), { tone: "lo" }) + ek.join(""), [plaka]);
  halo = `<path class="iso-halo" d="${k.extrude(plakaRing, -PLAKA_H - AYAK_H, PLAKA_H, P).fill}"/>`;
}

// ---- Döner tabla: bilezik, derece çizgili tabla, gösterge bloğu ve kilit vidası ----
{
  const cizgi = k.radialTicks(0, 0, TABLA.r - 1.6, 72, 6, TABLA.h, [1.6, 3.2], P);
  T.silindir("tabla", 0, [0, 0], TABLA.r, 0, TABLA.h, { tone: "mid" }, {
    bevel: 0.8,
    steps: 72,
    ek: Ln(k.ring(0, 0, TABLA.r - 1.6, TABLA.h, P, 72), { tone: "lo" }) + Ln(cizgi.minor, { tone: "lo" }) + Ln(cizgi.major, { tone: "mid" }),
    ic: Ln(k.sideArc(0, 0, TABLA.r, TABLA.h - 1.8, P, 48), { tone: "faint" }),
  });
  // Gösterge bloğu: tablanın sağ önünde, plakaya vidalı; üstündeki çizgi tablanın derece çizgilerini gösterir.
  const aci = (58 * Math.PI) / 180;
  const e = [Math.cos(aci), Math.sin(aci)];
  const n = [-e[1], e[0]];
  const yer = (rr, yan) => [e[0] * rr + n[0] * yan, e[1] * rr + n[1] * yan];
  const r0 = TABLA.r + 1;
  const r1 = TABLA.r + 13;
  const blok = [yer(r0, -4), yer(r1, -4), yer(r1, 4), yer(r0, 4)];
  const dugme = yer(TABLA.r + 8.6, 0);
  const sekil = R.solid(A.extruded(blok, 0, TABLA.h, { name: "gosterge" }));
  T.koy("gosterge", 0, [...yer((r0 + r1) / 2, 0), TABLA.h / 2], S(k.extrude(blok, 0, TABLA.h, P, { bevel: 0.4 }), { tone: "mid" }) + Ln(k.onTop([yer(r0, 0), dugme], TABLA.h, P), { tone: "hi" }), [sekil]);
  T.silindir("gosterge.mil", 0, dugme, 1.5, TABLA.h, 1, { tone: "mid", crease: "none" }, { steps: 12 });
  T.silindir("gosterge.vida", 0, dugme, 2.9, TABLA.h + 1, 4.6, { tone: "mid" }, { bevel: 0.3, steps: 18, ek: Ln(k.knurl(dugme[0], dugme[1], 2.9, TABLA.h + 1, TABLA.h + 5.6, 16, P, 0.3), { tone: "lo" }) });
}

// ---- Pano: kiriş, ön çıta, arka şerit, sol dikme, levha, üst ray ----
{
  const perc = [-5, -3, -1, 1, 3, 5].map((n) => (n * PANO_EN) / 12).map((x) => at([x, PANO.on + 2.6, Z_PANO + 2.5]));
  T.kutu("kiris", 0, KIRIS, KIRIS.z, KIRIS.h, { tone: "mid" }, { steps: 3, bevel: 0.5, ic: Ln(k.sideSeam(KIRIS, KIRIS.z + 1.6, P, 3), { tone: "faint" }) });
  T.kutu("cita", 0, { x: PANO_X[0], y: PANO.on, w: PANO_EN, d: 2.6, r: 0 }, Z_PANO, 5, { tone: "mid" }, { steps: 1, ek: Dots(perc, { size: 0.45 }) });
  // Uç tutucular: panoyu iki yanından kirişe bağlayan köşebentler.
  for (const [i, x] of [PANO_X[0] - 3, PANO_X[1]].entries()) {
    T.kutu(`tutucu${i}`, 0, { x, y: PANO.arka - 1.5, w: 3, d: PANO.on + 2.6 - (PANO.arka - 1.5), r: 0 }, Z_PANO, 11, { tone: "mid" }, { steps: 1, ek: yuzVida([[x + 1.5, Z_PANO + 3], [x + 1.5, Z_PANO + 8]], PANO.on + 2.6, 0.8) });
  }
  const boy = Z_PANO_UST - Z_PANO;
  T.kutu("pano.arka", 0, { x: XT - 12, y: PANO.arka - 1.5, w: 24, d: 1.5, r: 0 }, Z_PANO, boy, { tone: "lo", crease: "none" }, { steps: 1 });
  const kose = (x) => [[x, Z_PANO + 10], [x, Z_PANO_UST - 5]];
  T.kutu("pano.dikme", 0, { x: PANO_X[0], y: PANO.arka, w: XT - YARIK - PANO_X[0], d: PANO.on - PANO.arka, r: 0 }, Z_PANO, boy, { tone: "mid" }, { steps: 1, ek: yuzVida(kose(PANO_X[0] + 5), PANO.on) });
  // Levhanın yüzü: her şeridin ve plakasının yatağı (şerit sökülünce görünen sığ oyuk ve iki vida deliği).
  const yatak = SIRA.map((_, i) => {
    const x = xOf(i);
    const delik = [[x + 6.7, Z_S0 + 2.6], [x + 6.7, Z_S1 - 2.6], [x + 3, LEVHA.alt + LEVHA.h / 2], [x + LEVHA.en - 3, LEVHA.alt + LEVHA.h / 2]];
    return Ln(yuzYolu(x + 1, x + SERIT.en - 1, Z_S0 + 1, Z_S1 - 1, PANO.on) + yuzYolu(x + 1, x + LEVHA.en - 1, LEVHA.alt + 1, LEVHA.alt + LEVHA.h - 1, PANO.on), { tone: "faint" }) + Ln(delik.map(([dx, dz]) => k.sideRing([dx, PANO.on, dz], 0.8, "y", P, 10)).join(""), { tone: "lo" });
  }).join("");
  T.kutu("pano.levha", 0, { x: XT + YARIK, y: PANO.arka, w: PANO_X[1] - XT - YARIK, d: PANO.on - PANO.arka, r: 0 }, Z_PANO, boy, { tone: "mid" }, { steps: 1, ek: yatak + yuzVida(kose(PANO_X[1] - 4), PANO.on) });
  const RAY = { x: PANO_X[0] - 1.5, y: PANO.arka - 1.5, w: PANO_X[1] - PANO_X[0] + 3, d: PANO.on - PANO.arka + 2.5, r: 0.8 };
  T.kutu("pano.ray", 0, RAY, Z_PANO_UST, RAY_H, { tone: "mid" }, { steps: 2, bevel: 0.5 });
}

// ---- Arka destek: tablaya basan direk, panonun üst rayını tutan kol, sıkma vidası ----
{
  const [x, y] = DIREK.c;
  T.silindir("destek.yaka", 0, DIREK.c, 5, TABLA.h, 3, { tone: "mid" }, { steps: 14 });
  T.silindir("destek.direk", 0, DIREK.c, DIREK.r, TABLA.h + 3, KOL.z - TABLA.h - 3, { tone: "mid", crease: "none" }, { steps: 12 });
  const KOLP = { x: x - 5, y: y - 6, w: 10, d: PANO.on + 1 - (y - 6), r: 1.6 };
  const delik = A.cylinder(x, y, DIREK.r, KOL.z - 1, KOL.h + 2, { name: "destek.direk-ic" });
  T.kutu("destek.kol", 0, KOLP, KOL.z, KOL.h, { tone: "mid" }, { steps: 4, bevel: 0.5, sekil: { cut: [delik] }, ic: Ln(k.sideSeam(KOLP, KOL.z + 1.4, P, 4), { tone: "faint" }) });
  T.silindir("destek.direk-ust", 0, DIREK.c, DIREK.r, KOL.z + KOL.h, 3, { tone: "mid", crease: "none" }, { steps: 14 });
  T.silindir("destek.baslik", 0, DIREK.c, DIREK.r + 0.9, KOL.z + KOL.h + 3, 2, { tone: "mid" }, { bevel: 0.3, steps: 16 });
  const v = [x, 0];
  const zv = KOL.z + KOL.h;
  T.silindir("destek.vida-mil", 0, v, 1.5, zv, 1, { tone: "mid", crease: "none" }, { steps: 12 });
  T.silindir("destek.vida", 0, v, 3.3, zv + 1, 4.6, { tone: "mid" }, { bevel: 0.3, steps: 20, ek: Ln(k.knurl(v[0], v[1], 3.3, zv + 1, zv + 5.6, 18, P, 0.3), { tone: "lo" }) + Ln(k.lineOnTop([v[0] - 3.3, v[1]], [v[0] + 3.3, v[1]], zv + 5.6, P), { tone: "lo" }) });
}

// ---- Şeritler ve plakaları (grup: serit-c, serit-f, serit-k; dersin goster() çağrısı bunları açar ve gizler) ----
const YUZ = EKSEN_Y;
for (const [i, ad] of SIRA.entries()) {
  const o = OLCEK[ad];
  const x = xOf(i);
  const kisa = [];
  const uzun = [];
  for (let v = o.min; v <= o.max + 1e-9; v += o.adim) {
    const z = zOf(o, v);
    const buyuk = Math.round(v) % o.uzun === 0;
    (buyuk ? uzun : kisa).push(k.segment([x, YUZ, z], [x + (buyuk ? SERIT.en : SERIT.merdiven), YUZ, z], P));
  }
  const plan = { x, y: PANO.on, w: SERIT.en, d: SERIT.kalin, r: 0 };
  const cizim =
    S(k.slabOf(plan, Z_S0, Z_S1 - Z_S0, P, 1), { tone: "hi", crease: "lo" }) +
    Ln(k.rise([x + SERIT.merdiven, YUZ], Z_S0, Z_S1, P), { tone: "lo" }) +
    Ln(kisa.join(""), { tone: "mid" }) +
    Ln(uzun.join(""), { tone: "hi" }) +
    Dots([at([x + 6.7, YUZ, Z_S0 + 2.6]), at([x + 6.7, YUZ, Z_S1 - 2.6])], { size: 0.5 });
  T.koy(`serit.${ad}`, 0, [x + SERIT.en / 2, PANO.on + SERIT.kalin / 2, (Z_S0 + Z_S1) / 2], `<g class="ip-metal">${cizim}</g>`, [R.solid(A.slab(plan, Z_S0, Z_S1 - Z_S0, { name: `serit.${ad}` }, 1))], { grup: `serit-${ad}` });
  const lp = { x, y: PANO.on, w: LEVHA.en, d: SERIT.kalin, r: 0 };
  const levha =
    S(k.slabOf(lp, LEVHA.alt, LEVHA.h, P, 1), { tone: "hi", crease: "lo" }) +
    Ln(yuzYolu(x + 1.6, x + LEVHA.en - 1.6, LEVHA.alt + 1.6, LEVHA.alt + LEVHA.h - 1.6, YUZ), { tone: "lo" }) +
    Dots([at([x + 3, YUZ, LEVHA.alt + LEVHA.h / 2]), at([x + LEVHA.en - 3, YUZ, LEVHA.alt + LEVHA.h / 2])], { size: 0.45 });
  T.koy(`levha.${ad}`, 0, [x + LEVHA.en / 2, PANO.on + SERIT.kalin / 2, LEVHA.alt + LEVHA.h / 2], `<g class="ip-metal">${levha}</g>`, [R.solid(A.slab(lp, LEVHA.alt, LEVHA.h, { name: `levha.${ad}` }, 1))], { grup: `serit-${ad}` });
}

// ---- Gösteri termometresi: hazne, cam boru, kılcal, sütun; iki kelepçe, üstte metal kapak ----
// Ortak O.termometre ile aynı kurgu (dolu hazne ve sütun `ip-sutun`, sütun tam boy çizilir ve aşağı kayar); farkı: camda
// çentik yoktur (ölçek şeritlerdedir), kılcal boru çizilir, gövde iki kelepçeyle üçe bölünür, ölçüler gösteri boyudur.
const C = [XT, EKSEN_Y];
{
  const zHazne = Z_ALT + CAM.hazne;
  const cam = (z0, z1) => S(k.cylinder(C[0], C[1], CAM.r, z0, z1 - z0, P, 20), { tone: "hi", crease: "none" });
  const kilcal = (z0, z1) => S(k.cylinder(C[0], C[1], CAM.sutun, z0, z1 - z0, P, 10), { tone: "mid", crease: "none" });
  const dolu = (z0, z1) => `<g class="ip-sutun">${S(k.cylinder(C[0], C[1], CAM.sutun, z0, z1 - z0, P, 10), { tone: "hi", lit: true, crease: "none" })}</g>`;
  const hazne = `<g class="ip-sutun">${S(G.sphereOf([C[0], C[1], zHazne], CAM.hazne, P, { steps: 32 }), { tone: "hi", lit: true })}${S(k.cylinder(C[0], C[1], CAM.hazne, zHazne, CAM.hazneBoy, P, 24), { tone: "hi", lit: true, crease: "none" })}</g>`;
  const govde = (ad, z0, z1) => R.solid(A.cylinder(C[0], C[1], CAM.r, z0, z1 - z0, { name: ad, owner: "termo" }));
  const altSekil = [R.solid(A.ball([C[0], C[1], zHazne], CAM.hazne, { name: "termo.hazne-uc", owner: "termo" })), R.solid(A.cylinder(C[0], C[1], CAM.hazne, zHazne, CAM.hazneBoy, { name: "termo.hazne", owner: "termo" })), govde("termo.alt", Z_GOVDE, K_ALT[0])];
  T.koy("termo.alt", 0, [C[0], C[1], (Z_ALT + K_ALT[0]) / 2], hazne + cam(Z_GOVDE, K_ALT[0]) + dolu(Z_GOVDE, K_ALT[0]), altSekil);
  const kirp = Z_MIN - 1.5;
  const aralik = (TERMO.max - TERMO.min) * BIRIM;
  const oynak =
    `<clipPath id="tm-sutun"><path d="${T.sutun(C, CAM.sutun + 0.5, kirp)}"/></clipPath>` +
    `<g clip-path="url(#tm-sutun)" class="ip-sutun"><g data-part="sutun">${S(k.cylinder(C[0], C[1], CAM.sutun, kirp - aralik, 1.5 + 2 * aralik, P, 10), { tone: "hi", lit: true, crease: "none" })}</g></g>`;
  const ortaSekil = govde("termo.orta", K_ALT[1], K_UST[0]);
  T.koy("termo.orta", 0, [C[0], C[1], (K_ALT[1] + K_UST[0]) / 2], cam(K_ALT[1], K_UST[0]) + kilcal(K_ALT[1], K_UST[0]) + dolu(K_ALT[1], kirp + 0.6) + oynak, [ortaSekil]);
  const ustSekil = govde("termo.ust", K_UST[1], Z_UC);
  T.koy("termo.ust", 0, [C[0], C[1], (K_UST[1] + Z_UC) / 2], cam(K_UST[1], Z_UC) + kilcal(K_UST[1], Z_UC), [ustSekil]);
  T.silindir("termo.kapak", 0, C, KAPAK.r, Z_UC, KAPAK.h, { tone: "mid" }, { bevel: 0.4, steps: 22, ic: Ln(k.sideArc(C[0], C[1], KAPAK.r, Z_UC + 1.2, P, 14), { tone: "faint" }) });
  // Kelepçeler: yarığın iki yanına basan, camı önden saran bloklar; ikişer vida.
  for (const [i, [z0, z1]] of [K_ALT, K_UST].entries()) {
    const plan = { x: C[0] - KELEPCE.yari, y: PANO.on, w: KELEPCE.yari * 2, d: KELEPCE.on - PANO.on, r: 1.2 };
    const oyuk = A.cylinder(C[0], C[1], CAM.r, z0 - 1, z1 - z0 + 2, { name: `kelepce${i}.ic` });
    const vida = [-8.6, 8.6].map((dx) => [C[0] + dx, (z0 + z1) / 2]);
    T.kutu(`kelepce${i}`, 0, plan, z0, z1 - z0, { tone: "mid" }, { steps: 3, bevel: 0.5, sekil: { cut: [oyuk, ...altSekil, ortaSekil, ustSekil] }, ek: yuzVida(vida, KELEPCE.on, 1.2) + Ln(k.ring(C[0], C[1], CAM.r + 0.9, z1, P, 20), { tone: "lo" }) });
  }
}

T.yerles();
// Kayıtsız içerik yok; yalnızca sütun kendi öğesinin içinde kayar. Şeritler levhadan sonra çizilmeli.
for (const ad of SIRA) {
  T.once("pano.levha", `serit.${ad}`);
  T.once("pano.levha", `levha.${ad}`);
}
T.once("pano.arka", "termo.orta");

// ---- Derlemede hesaplanan sayılar ----
const olcekVeri = Object.fromEntries(
  SIRA.map((ad, i) => {
    const o = OLCEK[ad];
    const p = at([xOf(i), YUZ, zOf(o, o.donma)]);
    const q = at([xOf(i), YUZ, zOf(o, o.kaynama)]);
    // x: çentikli kenar; y0: `ref` değerinin ekrandaki yeri; adim: bir birimin ekrandaki dy'si (eksi: yukarı)
    return [ad, { x: r2(p[0]), sag: r2(at([xOf(i) + SERIT.en, YUZ, 0])[0]), y0: r2(p[1]), ref: o.donma, adim: Math.round(((q[1] - p[1]) / (o.kaynama - o.donma)) * 1e5) / 1e5, min: o.min, max: o.max }];
  }),
);
const tepe = at([C[0], C[1], Z_MAX]);
const D = {
  govde: halo + T.katman(0),
  uz: Math.round(T.uz * 1e5) / 1e5,
  ilk: { sicaklik: 20, c: 1, f: 1, k: 1 },
  term: { min: TERMO.min, max: TERMO.max, birim: BIRIM, tepe: tepe.map(r2) },
  olcek: olcekVeri,
  nokta: {
    hazne: at([C[0], C[1], Z_ALT + CAM.hazne + CAM.hazneBoy / 2]).map(r2),
    ...Object.fromEntries(SIRA.map((ad, i) => [`${ad}.baslik`, at([xOf(i) + LEVHA.en / 2, YUZ, LEVHA.alt + LEVHA.h / 2]).map(r2)])),
  },
};
// Hizalama güvencesi: sütunun tepesi ile üç şeritteki karşılığı aynı yatay çizgide olmalı.
for (const ad of SIRA) {
  const o = OLCEK[ad];
  for (const [nokta, zHedef] of [[o.donma, Z_DONMA], [o.kaynama, Z_KAYNAMA]]) {
    const ySerit = at([xOf(SIRA.indexOf(ad)), YUZ, zOf(o, nokta)])[1];
    const ySutun = at([C[0], C[1], zHedef])[1];
    if (Math.abs(ySerit - ySutun) > 0.01) throw new Error(`hizalama: ${ad} ${nokta} sütunla aynı çizgide değil (${ySerit.toFixed(2)} / ${ySutun.toFixed(2)})`);
  }
}
const BOSLUK = (SERIT.adim - SERIT.en) * KS; // şeritler arası boşluk (figür birimi)
if ((BOSLUK * 480) / H < 60) throw new Error(`şeritler arası boşluk h: 480'de ${((BOSLUK * 480) / H).toFixed(1)} birim; en az 60 olmalı`);

// ---- Stil ----
const SAYFA_CSS = `${O.PARCA_CSS}${O.siviCss("sayfa")}
.ip-stage{position:relative;border-radius:10px}
.ip-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
@media (max-width:640px){.iso-plate-corner[data-corner="readout"]{font-size:9px;letter-spacing:0}}
`;
const TAHTA_CSS = `${O.kitCss()}${O.PARCA_CSS}${O.tahtaCss("trm")}`;

// ---- Tek başına sayfa ----
const CIZ = O.oku(join(HERE, "ciz.js"));
const ETIKET =
  "Üç ölçekli gösteri termometresi: döner tablalı bir taban üstünde dik duran pano. Panonun solundaki yarıkta iki kelepçeyle tutulan büyük bir cam termometre, sağında yan yana üç çentikli cetvel şeridi (Celsius, Fahrenheit, Kelvin) ve her şeridin tepesinde boş bir plaka var. Arkadaki direk panoyu üstten tutar.";
const svg = k.figureSvg({ width: W, height: H, label: ETIKET, body: D.govde });
const CANLI = O.oku(join(HERE, "canli.js")).replace("__DATA__", JSON.stringify({ ...D, govde: "" }));
const dosyaAdi = THEME === "light" ? "termometre-light.html" : "termometre.html";
const boySayfa = O.sayfaYaz({
  dosya: join(HERE, dosyaAdi),
  tema: THEME,
  baslik: "Üç ölçekli termometre",
  sekilNo: "Şekil 1",
  ipucu: "gösteri turu",
  gosterge: "sütun 20 °C",
  anahtarlar: [
    { mark: "lit", label: "Termometre sütunu: boyu sıcaklıkla doğru orantılı" },
    { mark: "raised", label: "Üç cetvel şeridi: Celsius, Fahrenheit, Kelvin" },
    { mark: "dim", label: "Döner tablalı taban, pano ve arka destek" },
  ],
  aciklama:
    "Pano izleyiciye dönüktür; sütunun tepesi ile üç şeritteki karşılığı aynı yatay çizgidedir. Şeritler suyun donma ve kaynama sıcaklığına göre hizalıdır: 0 °C, 32 °F ve 273 K aynı yükseklikte, 100 °C, 212 °F ve 373 K da öyle. Çentikler: Celsius ve Kelvin şeridinde 10'da bir, Fahrenheit şeridinde 20'de bir.",
  svg,
  css: SAYFA_CSS,
  script: CIZ + CANLI,
  genislik: 560,
  etiket: ETIKET,
});
console.log("yazıldı", dosyaAdi, `${(boySayfa / 1024).toFixed(0)} KB`, `${R.items.length} öğe`, `${R.solids.length} katı`, `ölçek ${KS.toFixed(3)}`, `boşluk ${((BOSLUK * 480) / H).toFixed(1)} birim (h 480)`);

// ---- Ders modülü: fizik/enerji/dersler/termometre-sekil.js (window.TERMO) ----
{
  const sx = (x, z, y = YUZ) => at([x, y, z]);
  const kSag = xOf(2) + SERIT.en; // Kelvin şeridinin sağ kenarı
  const solX = sx(XT - KELEPCE.yari - 2.5, 0)[0]; // kelepçenin sol ucunun biraz solu
  // sabit: 0 °C ile 100 °C arası, üç şerit boydan boya ve plakaları; genişlik termometrenin solundan Kelvin plakasının sağına,
  // üst kenar plakaların hemen üstü.
  const sagX = sx(xOf(2) + LEVHA.en + 4, 0)[0];
  const sabitW = Math.max(sagX - solX, ((sx(0, Z_S0)[1] - sx(0, LEVHA.alt + LEVHA.h)[1] + 14) * W) / H);
  const sabitKutu = [(solX + sagX) / 2 - sabitW / 2, sx(0, LEVHA.alt + LEVHA.h)[1] - 7, sabitW, (sabitW * H) / W];
  const hazneY = at([C[0], C[1], Z_ALT + CAM.hazne])[1] - 200 * 0.36;
  const hazneW = 150;
  const ustW = 225;
  const sinirla = (kutu) => {
    const q = kutu.slice();
    q[0] = Math.max(0, Math.min(W - q[2], q[0]));
    q[1] = Math.max(0, Math.min(H - q[3], q[1]));
    return q.map((v) => Math.round(v * 10) / 10);
  };
  const KADRAJ = {
    tum: [0, 0, W, H],
    hazne: sinirla([sx(XT, 0)[0] - 52, hazneY, hazneW, 200]),
    ust: sinirla([sx(PANO_X[0], 0)[0] - 4, 0, ustW, 300]),
    sabit: sinirla(sabitKutu),
  };
  const icinde = (kutu, p) => p[0] >= kutu[0] && p[0] <= kutu[0] + kutu[2] && p[1] >= kutu[1] && p[1] <= kutu[1] + kutu[3];
  for (const p of [sx(XT, Z0, C[1]), sx(XT, Z_KAYNAMA, C[1]), sx(kSag, Z_S0), sx(kSag, Z_S1), sx(xOf(0), Z_S0), sx(XT - CAM.r, Z0), sx(xOf(2) + LEVHA.en, LEVHA.alt + LEVHA.h), sx(xOf(0), LEVHA.alt + LEVHA.h)]) if (!icinde(KADRAJ.sabit, p)) throw new Error("kadraj sabit: 0–100 °C arası ve üç şerit kutunun içinde değil");
  const pay = (v) => Math.round(v * 10) / 10;
  const birimPx = -T.uz * BIRIM; // 1 °C'ın figürdeki boyu
  const doluluk = Math.round(((Math.max(...plakaRing.map(([x, y]) => at([x, y, 0])[0])) - Math.min(...plakaRing.map(([x, y]) => at([x, y, 0])[0]))) / W) * 100);
  const seritPx = SERIT.en * KS;
  const BASLIK = `Ş1 · Üç ölçekli gösteri termometresi (izometrik figür). ÜRETİLMİŞ DOSYA: elle değiştirme.
   Kaynak: plan/fizik/enerji/sekil/s1-termometre/build.mjs ve ciz.js, ortak parçalar plan/fizik/enerji/sekil/parcalar.mjs
   (anatomy kiti, MIT; bkz. plan/fizik/enerji/sekil/kit/LICENSE). Sözleşme: plan/fizik/enerji/IZOMETRIK.md 6b.

   Ne var: döner tablalı bir tabanın üstünde, izleyiciye tam dönük duran pano. Panonun solundaki düşey yarıkta iki kelepçeyle
   tutulan büyük bir cam termometre (altta dolu hazne, kılcal boru, sütun; camda çentik yok). Sağında soldan sağa üç cetvel
   şeridi: Celsius ('c'), Fahrenheit ('f'), Kelvin ('k'). Her şeridin çentikli kenarı sol kenarıdır ve tepesinde boş bir plaka
   durur. Figürde yazı ve rakam yoktur: hangi şeridin hangisi olduğu, sayılar ve işaret çizgileri dersin düz SVG katmanına
   yazılır ve f.nokta / f.olcek ile figüre bağlanır. Figür kendi başına hareket etmez; hareket için ayarları c.tween içinde çağır.
   Sayfa bu dosyayı ders dosyasından önce yükler: <script src="dersler/termometre-sekil.js"></script>

   const f = TERMO.kur(c, svg, { x, y, h });
       Figürü tahtaya (1000 × 562) sol üst köşesi x, y, yüksekliği h olacak biçimde koyar; genişlik h × TERMO.oran (0,75).
       f.el kök öğe (f.el.style.opacity ile bütün figür soldurulur), f.w ve f.h tahta birimiyle boyutu.
       Düzenek kutuyu boydan boya doldurur; eninin yaklaşık yüzde ${doluluk}'ini kaplar (pano yüzde ${Math.round(((sx(PANO_X[1], 0)[0] - sx(PANO_X[0], 0)[0]) / W) * 100)}). Yazıyı kutunun
       kenarına göre değil, f.nokta ve f.olcek ile bulduğun yere göre hizala.

   f.sicaklik(C)           sütunun boyu, °C. −20…120 arası doğrusal, dışı kırpılır; anında uygulanır. Başlangıç: 20.
                           Yükselme için: c.tween(1200, (e) => f.sicaklik(Ders.lerp(0, 100, e)), Ders.ease.inOut).
   f.goster({ c, f, k })   üç şeridi (plakasıyla birlikte) ayrı ayrı 0…1 saydamlıkla gösterir; 0'da şerit tümüyle kalkar ve panoda
                           yalnızca yatağı (soluk bir çerçeve ve vida delikleri) kalır. Verilmeyen şerit değişmez. Başlangıç: üçü de 1.
                           Belirme için: c.tween(500, (e) => f.goster({ f: e }), Ders.ease.out).
   f.durum()               şu anki ayarlar: { sicaklik, c, f, k }.

   f.nokta(ad) → [x, y]    tahta birimiyle, figürün o anki durumuna ve kadrajına göre:
       'sutun'                              sütunun tepesi (sıcaklıkla birlikte oynar; eksenin ortası). Sayıyı soluna, panonun
                                            dışına yaz: x − ${Math.ceil(((C[0] - PANO_X[0]) * KS * 480) / H) + 8} (h: 400…480), y + 8, text-anchor: end. Üstüne yazılan sayı
                                            (y − 28, text-anchor: middle) okunur ama Celsius şeridinin ve camın üstüne biner.
       'hazne'                              haznenin ortası (etiketi soluna, panonun dışına: x − ${Math.ceil(((C[0] - PANO_X[0]) * KS * 480) / H) + 8}, text-anchor: end)
       'c.baslik', 'f.baslik', 'k.baslik'   şeritlerin tepesindeki boş plakaların ortası. Şeridin adını ("°C", "°F", "K") buraya
                                            text-anchor: middle ile, y + 8'e yaz. Plaka h: 400'de ${Math.floor((LEVHA.en * KS * 400) / H)} × ${Math.floor((-T.uz * LEVHA.h * 400) / H)}, h: 480'de ${Math.floor((LEVHA.en * KS * 480) / H)} × ${Math.floor((-T.uz * LEVHA.h * 480) / H)} tahta
                                            birimidir: 24 birimlik iki harf sığar, daha uzun yazı sığmaz.
                                            Şerit gizliyken (goster 0) plakası da gizlidir: yazıyı da gizle ya da birlikte soldur.
   f.olcek(serit, deger) → [x, y]   serit: 'c' | 'f' | 'k'. O şeritte verilen değerin tahtadaki yeri: şeridin çentikli (sol)
       kenarında, değerin yüksekliğinde. Değer çentik olmak zorunda değildir (32 °F ve 273 K çentik değildir, iki çentiğin
       arasına düşer); şeridin aralığının dışındaki değer aralığın ucuna kırpılır. Aralıklar ve çentikler:
           'c'  −20…120, çentik 10'da bir, uzun çentikler 0, 50, 100
           'f'  ${OLCEK.f.min}…${OLCEK.f.max}, çentik 20'de bir, uzun çentikler 0, 100, 200
           'k'  ${OLCEK.k.min}…${OLCEK.k.max}, çentik 10'da bir, uzun çentikler 250, 300, 350
       Kısa çentik şeridin sol üçte birinde durur, uzun çentik şeridi boydan boya geçer.
       Üç şerit aynı sütuna göre hizalıdır ve pano izleyiciye tam dönüktür: f.olcek('c', 0), f.olcek('f', 32) ve f.olcek('k', 273)
       aynı y değerini verir; bu y, f.sicaklik(0) iken f.nokta('sutun') ile de aynıdır. 100 °C, 212 °F, 373 K için de öyle.
       Yani sütunun tepesinden sağa çizilen tek yatay çizgi üç şeridi doğru yerde keser.
   f.olcekSag(serit, deger) → [x, y]   aynı değerin şeridin sağ kenarındaki yeri (sözleşmeye ek). Sayıyı şeridin yanına yazmak
       için: x + 6, y + 9, text-anchor: start. Kadraj değişse de yazı şeride yapışık kalır.
       Şeritler arasındaki boş pano h: 400'de ${Math.floor((BOSLUK * 400) / H)}, h: 480'de ${Math.floor((BOSLUK * 480) / H)} tahta birimidir (24 birimlik üç rakam sığar; "100 °C" sığmaz).
       Kelvin şeridinin sağında pano ${Math.floor(((PANO_X[1] - kSag) * KS * 480) / H)} birim (h: 480) sürer; yazı panodan figür kutusunun sağ kenarına taşabilir.
       Birimli ya da uzun yazıyı figürün dışına al: noktadan sağa yatay bir çizgi çek, ucuna yaz (B1 senaryosundaki gibi).
       f.olcek ve f.olcekSag yöntemdir: f.olcek(...) biçiminde çağır (const { olcek } = f diye koparma). Modülde ölçekler
       arası dönüşüm işlevi yoktur; yalnızca "şu şeritte şu sayı nerede" sorusu cevaplanır.
   f.gorunur(ad) → true/false   nokta şu anki kadrajın içinde mi. ad bir nokta adı ya da bir şerit değeridir: 'c@0', 'f@32',
                           'k@273' (çentikli kenar) ve 'c@0+' (sağ kenar). f.nokta da bu biçimi kabul eder:
                           f.olcek('f', 32) ile f.nokta('f@32'), f.olcekSag('f', 32) ile f.nokta('f@32+') aynıdır.
                           f.bak ile yakınlaşan sahnede etiketi her karede buna göre gizle.
   f.bak(kutu)             figürün [x, y, w, h] bölgesine yaklaşır (figür birimi: 450 × 600). Hazır kutular TERMO.kadraj:
       tum    bütün düzenek
       hazne  alt üçte bir: hazne, alt kelepçe, Celsius şeridinin alt ucu, döner tabla (3 kat)
       ust    üst yarı: panonun sol kenarı, termometrenin üst yarısı, Celsius ve Fahrenheit şeritleri ve plakaları (2 kat). Kelvin şeridi bu
              kadrajın dışında kalır; üç şerit birlikte gerekiyorsa sabit kadrajını kullan.
       sabit  0 °C ile 100 °C arası, üç şerit boydan boya ve plakaları, iki kelepçe (yaklaşık ${(W / KADRAJ.sabit[2]).toFixed(1).replace(".", ",")} kat); taban dışarıda kalır,
              haznenin yalnızca üst ucu görünür
       Geçiş: c.tween(900, (e) => f.bak(a.map((v, i) => Ders.lerp(v, b[i], e))), Ders.ease.inOut). f.nokta, f.olcek ve
       f.olcekSag kadrajı izler; yakınlaşan sahnede etiketlerin yerini her karede yeniden hesapla.
   TERMO.oran              0,75 (en / boy)
   TERMO.kadraj            { tum, hazne, ust, sabit }
   TERMO.sabit             { min, max, birim (bir °C'ın figürdeki boyu, figür birimi; tahtada × h / 600), serit (şerit genişliği),
                           bosluk (iki şerit arası), olcek: { c: [min, max, çentik adımı], f: […], k: […] } }
   Tuzaklar: TERMO.sabit sayılar nesnesidir, TERMO.kadraj.sabit bir kadraj kutusudur. Etiket yazıları en az 24 tahta birimi
   olmalı (22 birim, olc.js'in 750x402 ölçümünde 12 px'in altında kalır). Kırpma kimliği her kurulumda ayrı önek alır.
   Bir °C tahtada h: 400'de ${((birimPx * 400) / H).toFixed(2).replace(".", ",")}, h: 480'de ${((birimPx * 480) / H).toFixed(2).replace(".", ",")} birimdir (0 → 100 °C: ${Math.round((birimPx * 100 * 400) / H)} ve ${Math.round((birimPx * 100 * 480) / H)} birim).`;
  const kb = O.dersModuluYaz({
    dosya: join(KOK, "fizik", "enerji", "dersler", "termometre-sekil.js"),
    ad: "TERMO",
    sinif: "trm",
    baslik: BASLIK,
    W,
    H,
    css: TAHTA_CSS,
    ciz: CIZ,
    veri: D,
    kadraj: KADRAJ,
    sabit: { min: TERMO.min, max: TERMO.max, birim: r2(birimPx), serit: pay(seritPx), bosluk: pay(BOSLUK), olcek: Object.fromEntries(SIRA.map((ad) => [ad, [OLCEK[ad].min, OLCEK[ad].max, OLCEK[ad].adim]])) },
  });
  console.log("yazıldı fizik/enerji/dersler/termometre-sekil.js", `${kb.toFixed(0)} KB`, "kadraj", JSON.stringify(KADRAJ));
}

if (process.argv.includes("--boyut")) {
  const boylar = R.items.map((item) => [item.name, item.svg.length]).sort((a, b) => b[1] - a[1]);
  console.log(boylar.slice(0, 20).map(([ad, n]) => `${(n / 1024).toFixed(1)} ${ad}`).join("\n"));
}
A.auditOrExit(R, P);
