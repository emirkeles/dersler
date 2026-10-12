/* Torricelli düzeneği: anatomy kitiyle (kit/iso-kit.mjs) çizilen izometrik figür. Yalnızca geliştirme.

   node fizik/akiskanlar/pilot/torricelli/build.mjs
     → torricelli.html, torricelli-light.html     tek başına sayfa (kart, gösterge, kendi hareketi)
     → ../../dersler/torricelli-sekil.js           ders motoru için: window.TORRICELLI (çizim + poz + model)

   Sayılar ders kitabından (9. sınıf fizik, s. 164): 1 m'lik boru, 76 cm cıva, d = 13.600 kg/m³, g = 9,8 m/s².
   Figürdeki her uzunluk aynı modelden gelir; 1 mm = U birim. */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));

/* ---- model ---- */
const D = 13600, G = 9.8;                 // kg/m³, m/s²
const H0 = 760;                           // mm; 1 atm'de sütun
const U = 0.45;                           // 1 mm = 0,45 birim
const BORU_MM = 1000;

/* ---- ölçüler (birim) ---- */
const WIDTH = 380, HEIGHT = 600;
const PLATE = { x: -66, y: -80, w: 132, d: 152, r: 8 };
const PLATE_H = 12, FOOT_H = 5;

const KAP = { r: 48, ic: 44, z: 3, h: 24 };            // cıva kabı
const KAP_UST = KAP.z + KAP.h;
const SEVIYE0 = 19;                                    // 1 atm'de kaptaki cıva yüzeyi
const BORU = { r: 4.2, ic: 3, alt: 10 };               // cam boru; alt ucu cıvanın içinde
const BORU_UST = BORU.alt + BORU_MM * U - BORU.r;      // kubbenin başladığı yer
const CUBUK = { x: -24, y: -4.2, w: 18, d: 3, r: 0.4 };// metre çubuğu; ön yüzü y = -1.2
const CUBUK_ALT = 23, CUBUK_UST = SEVIYE0 + 1000 * U;
const IGNE = [-15, -2.7];                              // çubuğun sıfır ucu; cıva yüzeyine değer
const DIREK = [-10, -64];
const SISE = [50, 42];
const DIREK_UST = 440;
const KOL_Z = [70, 410];                               // iki tutucunun yüksekliği
const KOL_H = 8;
const HMAX = (BORU_UST - SEVIYE0) / U;                 // boru ağzına kadar doluyken sütun (mm)

const AT = Math.PI * BORU.ic ** 2;
const AK = Math.PI * (KAP.ic ** 2 - BORU.r ** 2 + BORU.ic ** 2);
const ORAN = AT / AK;                                  // sütun 1 birim inince kap ne kadar yükselir

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [CUBUK.x, CUBUK.y, CUBUK_UST + 4], [0, 0, BORU_UST + BORU.r + 2], [DIREK[0], DIREK[1], DIREK_UST + 4]],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 50 },
);
const CAM = k.cameraOf(P);
const RISE = CAM.cosE * CAM.k;                         // 1 birim yükseklik kaç ekran birimi

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const Dn = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const r1 = (v) => Math.round(v * 10) / 10;

/* Bir çemberin izleyiciye bakan yarısı (ekran noktaları). */
function onYay(cx, cy, r, z, steps = 24) {
  const [vx, vy] = k.towardViewer(P);
  const facing = Math.atan2(vy, vx);
  const points = [];
  for (let s = 0; s <= steps; s++) {
    const a = facing - Math.PI / 2 + (s / steps) * Math.PI;
    points.push(at([cx + r * Math.cos(a), cy + r * Math.sin(a), z]));
  }
  return points;
}
/* Yüzeyden çıkan dik silindirin görünen kısmı: ön yayın üstü. */
function yuzeyUstu(cx, cy, r, z) {
  const arc = onYay(cx, cy, r, z);
  const top = at([cx, cy, CUBUK_UST + 40])[1];
  return k.pathOf([...arc, [arc[arc.length - 1][0] - 0.4, top], [arc[0][0] + 0.4, top]], true);
}

/* Boyunlu, tırtıllı sıkma vidası; `yon` boynun çıktığı yüz. */
function sikma(x, y, z, yon) {
  const out = [];
  const [nx, ny] = yon === "x" ? [1, 0] : [0, 1];
  const boyun = yon === "x" ? { x, y: y - 1.4, w: 3, d: 2.8, r: 0.8 } : { x: x - 1.4, y, w: 2.8, d: 3, r: 0.8 };
  const bas = [x + nx * 4.4, y + ny * 4.4];
  out.push(S(k.slabOf(boyun, z + 1, 4, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(bas[0], bas[1], 2.6, z, 6, P, 20), { tone: "mid" }));
  out.push(L(k.knurl(bas[0], bas[1], 2.6, z, z + 6, 18, P), { tone: "lo" }));
  return out.join("");
}

function taban() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 16))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
    out.push(L(k.knurl(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, -PLATE_H, 26, P, 0.3), { tone: "lo" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const vidalar = k.corners(PLATE, 10);
  out.push(L(vidalar.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(Dn(vidalar.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

  // etiket plakası: üç çizgi yazının yerini tutar
  const etiket = { x: -22, y: 56, w: 42, d: 12, r: 1.2 };
  out.push(S(k.slabOf(etiket, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(etiket, 1.6), 0.8, P, 3), { tone: "faint" }));
  [[26, 0], [18, 3], [22, 6]].forEach(([len, dy]) => out.push(L(k.lineOnTop([etiket.x + 8, etiket.y + 3 + dy], [etiket.x + 8 + len, etiket.y + 3 + dy], 0.8, P), { tone: "lo", free: true })));
  out.push(Dn([at([etiket.x + 3.2, etiket.y + 6, 0.8]), at([etiket.x + etiket.w - 3.2, etiket.y + 6, 0.8])], { size: 0.45 }));

  // su terazisi: boru düşey durmalı
  const [tx, ty] = [-48, 58];
  out.push(S(k.cylinder(tx, ty, 6, 0, 3, P, 32, 0.5), { tone: "mid" }));
  out.push(L(k.ring(tx, ty, 4.4, 3, P, 28), { tone: "lo" }));
  out.push(L(k.ring(tx, ty, 1.5, 3, P, 14), { tone: "hi" }));
  return out.join("");
}

/* Cıva şişesi: boru bununla doldurulur. Gövde, omuz, boyun, tıpa. */
function sise() {
  const [x, y] = SISE;
  const out = [];
  out.push(S(k.cylinder(x, y, 9, 0, 22, P, 36, 0.6), { tone: "mid", inner: L(k.sideArc(x, y, 9, 5, P, 20) + k.sideArc(x, y, 9, 15, P, 20), { tone: "faint" }) }));
  out.push(S(k.cylinder(x, y, 5.6, 22, 2.4, P, 28), { tone: "mid" }));
  out.push(S(k.cylinder(x, y, 3.2, 24.4, 6, P, 20), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(x, y, 4, 30.4, 3.2, P, 22), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(x, y, 4, 30.4, 33.6, 20, P, 0.3), { tone: "lo" }));
  return out.join("");
}

function direk(z0, z1, { yaka = false, baslik = false } = {}) {
  const [x, y] = DIREK;
  const out = [];
  if (yaka) {
    out.push(S(k.cylinder(x, y, 7, 0, 2, P, 32, 0.4), { tone: "mid" }));
    out.push(Dn([0, 1, 2, 3, 4, 5].map((i) => at([x + 5.2 * Math.cos(i * Math.PI / 3 + 0.4), y + 5.2 * Math.sin(i * Math.PI / 3 + 0.4), 2])), { size: 0.4 }));
    out.push(S(k.cylinder(x, y, 5, 2, 4, P, 28), { tone: "mid" }));
  }
  const seams = [];
  for (let z = Math.ceil(z0 / 60) * 60; z < z1 - 6; z += 60) if (z > z0 + 6) seams.push(k.sideArc(x, y, 3.2, z, P, 16));
  out.push(S(k.cylinder(x, y, 3.2, z0, z1 - z0, P, 28), { tone: "mid", crease: "none", inner: L(seams.join(""), { tone: "faint" }) }));
  if (baslik) out.push(S(k.cylinder(x, y, 3.8, z1, 2, P, 28), { tone: "mid" }));
  return out.join("");
}

/* Tutucu: direkteki kelepçe, kol ve borunun arkasına yaslandığı çapraz çubuk. */
function tutucu(z) {
  const [x, y] = DIREK;
  const out = [];
  const kelepce = { x: x - 7, y: y - 7, w: 14, d: 14, r: 2.5 };
  out.push(S(k.slabOf(kelepce, z - 2, KOL_H + 4, P, 4, 0.6), { tone: "mid" }));
  out.push(sikma(kelepce.x + kelepce.w, y, z, "x"));
  const kol = { x: x - 3, y: kelepce.y + kelepce.d, w: 6, d: -8 - (kelepce.y + kelepce.d), r: 1.5 };
  out.push(S(k.slabOf(kol, z, KOL_H - 2, P, 3, 0.5), { tone: "mid" }));
  out.push(Dn([at([x, kol.y + 4, z + KOL_H - 2]), at([x, kol.y + kol.d - 4, z + KOL_H - 2])], { size: 0.45 }));
  const capraz = { x: -33, y: -8, w: 39, d: 3.8, r: 1 };
  out.push(S(k.slabOf(capraz, z, KOL_H, P, 3, 0.5), { tone: "mid" }));
  out.push(Dn([at([capraz.x + 3, capraz.y + 1.9, z + KOL_H]), at([capraz.x + capraz.w - 3, capraz.y + 1.9, z + KOL_H])], { size: 0.4 }));
  return out.join("");
}

function kap() {
  const out = [];
  out.push(S(k.cylinder(0, 0, 53, 0, KAP.z, P, 72, 0.5), { tone: "lo" }));
  const dikis = L(k.sideArc(0, 0, KAP.r, KAP.z + 4, P, 40) + k.sideArc(0, 0, KAP.r, KAP_UST - 3, P, 40), { tone: "faint" });
  out.push(S(k.cylinder(0, 0, KAP.r, KAP.z, KAP.h, P, 72, 0.8), { tone: "mid", inner: dikis }));
  const agiz = k.ring(0, 0, KAP.ic, KAP_UST, P, 72);
  const yuzey = k.ring(0, 0, KAP.ic, SEVIYE0, P, 72);
  out.push(`<clipPath id="tor-agiz"><path d="${agiz}"/></clipPath>`);
  out.push(`<g clip-path="url(#tor-agiz)"><path class="tor-oyuk" d="${agiz}"/><g data-part="havuz"><path class="tor-hg-havuz" d="${yuzey}"/><path class="iso-line" data-tone="mid" d="${yuzey}"/></g></g>`);
  out.push(L(agiz, { tone: "mid" }));
  return out.join("");
}

function cubuk() {
  const out = [];
  const yuz = CUBUK.y + CUBUK.d;
  out.push(`<clipPath id="tor-igne"><path data-part="kesim" d="${yuzeyUstu(IGNE[0], IGNE[1], 0.8, SEVIYE0)}"/></clipPath>`);
  out.push(`<g clip-path="url(#tor-igne)">${S(k.cylinder(IGNE[0], IGNE[1], 0.8, SEVIYE0 - 4, CUBUK_ALT - SEVIYE0 + 4, P, 10), { tone: "hi", crease: "none" })}</g>`);
  out.push(S(k.slabOf(CUBUK, CUBUK_ALT, CUBUK_UST - CUBUK_ALT, P, 2), { tone: "mid", crease: "lo" }));
  const kisa = [], orta = [], uzun = [];
  for (let i = 2; i <= 99; i++) {
    const z = SEVIYE0 + i * 10 * U;
    const len = i % 10 === 0 ? 7.2 : i % 5 === 0 ? 5.2 : 3.4;   // en uzunu ekranda 7 birimin altında: kökü çubuğun kenarında
    (i % 10 === 0 ? uzun : i % 5 === 0 ? orta : kisa).push(k.segment([CUBUK.x, yuz, z], [CUBUK.x + len, yuz, z], P));
  }
  out.push(L(kisa.join(""), { tone: "lo" }), L(orta.join(""), { tone: "mid" }), L(uzun.join(""), { tone: "hi" }));
  // çubuğu çapraz çubuklara bağlayan vidalar
  out.push(L(KOL_Z.map((z) => k.sideRing([CUBUK.x + 14.6, yuz, z + 4], 1.3, "y", P, 12)).join(""), { tone: "lo" }));
  out.push(Dn(KOL_Z.map((z) => at([CUBUK.x + 14.6, yuz, z + 4])), { size: 0.45 }));
  return out.join("");
}

/* Sürgü: üst kenarı cıva sütununun tepesini gösterir. z = 0'da kurulur, sütunla birlikte taşınır. */
function surgu() {
  const out = [];
  const yuz = CUBUK.y + CUBUK.d;
  const govde = { x: CUBUK.x - 1.2, y: yuz, w: CUBUK.w + 2.4, d: 2.4, r: 0.6 };
  out.push(S(k.slabOf({ x: govde.x - 1.6, y: yuz + 0.2, w: 1.8, d: 2, r: 0.5 }, -4, 3, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(govde.x - 3.6, yuz + 1.2, 2.3, -5, 5, P, 18), { tone: "mid" }));
  out.push(L(k.knurl(govde.x - 3.6, yuz + 1.2, 2.3, -5, 0, 16, P, 0.3), { tone: "lo" }));
  out.push(S(k.slabOf(govde, -5, 5, P, 3, 0.4), { tone: "hi", crease: "lo" }));
  out.push(Dn([at([govde.x + 3, yuz + 1.2, 0]), at([govde.x + govde.w - 3, yuz + 1.2, 0])], { size: 0.4, tone: "hi" }));
  return out.join("");
}

function boru() {
  const out = [];
  const tepe = at([0, 0, BORU_UST]);
  const R = BORU.r * CAM.k, Ri = (BORU.ic - 0.2) * CAM.k;
  const kubbe = (r) => `M${r1(tepe[0] - r)} ${r1(tepe[1])}A${r1(r)} ${r1(r)} 0 0 1 ${r1(tepe[0] + r)} ${r1(tepe[1])}`;
  const taban = (r) => `A${r1(r)} ${r1(r * CAM.sinE)} 0 0 1 ${r1(tepe[0] - r)} ${r1(tepe[1])}Z`;
  out.push(`<clipPath id="tor-boru"><path data-part="kesim" d="${yuzeyUstu(0, 0, BORU.r, SEVIYE0)}"/></clipPath>`);
  out.push(`<g clip-path="url(#tor-boru)">`);
  // cam: boş boru kâğıt renginde durur, içinde yalnızca cıva görünür
  const yaylar = KOL_Z.flatMap((z) => [k.sideArc(0, 0, BORU.r, z + 2, P, 16), k.sideArc(0, 0, BORU.r, z + 6, P, 16)]).join("");
  out.push(S(k.cylinder(0, 0, BORU.r, BORU.alt, BORU_UST - BORU.alt, P, 28), { tone: "mid", flat: true, crease: "none", className: "tor-cam", inner: L(yaylar, { tone: "mid" }) }));
  out.push(`<path class="iso-fill tor-cam-dolgu" d="${kubbe(R)}${taban(R)}"/><path class="iso-line iso-edge" data-tone="mid" d="${kubbe(R)}"/>`);
  out.push(`<path data-part="kubbe" class="tor-hg-yuzey" style="opacity:0" d="${kubbe(Ri)}${taban(Ri)}"/>`);
  // cıva sütunu: tepesi BORU_UST'te kurulur, aşağı kaydırılır; alt ucu kesimin altında kalır
  const boy = BORU_UST - SEVIYE0 + 12;
  out.push(`<g data-part="sutun">${S(k.cylinder(0, 0, BORU.ic, BORU_UST - 2 * boy, 2 * boy, P, 24), { tone: "hi", lit: true, crease: "lo", className: "tor-hg" })}</g>`);
  out.push(`</g>`);
  return out.join("");
}

const body = [
  taban(),
  direk(6, KOL_Z[0] - 2, { yaka: true }),
  kap(),
  sise(),
  tutucu(KOL_Z[0]),
  direk(KOL_Z[0] + KOL_H + 2, KOL_Z[1] - 2),
  tutucu(KOL_Z[1]),
  direk(KOL_Z[1] + KOL_H + 2, DIREK_UST, { baslik: true }),
  cubuk(),
  `<g data-part="surgu">${surgu()}</g>`,
  boru(),
].join("");

/* ---- poz: figürü bir sütun yüksekliğine (mm) getirir; sayfa da ders de aynı kodu kullanır ---- */
const SABIT = { D, G, H0, HMAX: Math.round(HMAX * 10) / 10, U, SEVIYE0, BORU_UST, ORAN, RISE, W: WIDTH, H: HEIGHT };
const POZ = `
function torPoz(kok, hmm) {
  var C = TOR_SABIT, h = Math.max(0, Math.min(C.HMAX, hmm));
  var seviye = C.SEVIYE0 - (h - C.H0) * C.U * C.ORAN / (1 + C.ORAN);   // cıva korunur: sütun inerse kap yükselir
  var tepe = seviye + h * C.U;
  var q = function (ad) { return kok.querySelectorAll('[data-part="' + ad + '"]'); };
  var tasi = function (ad, dz) { q(ad).forEach(function (el) { el.setAttribute('transform', 'translate(0 ' + (-dz * C.RISE).toFixed(2) + ')'); }); };
  tasi('havuz', seviye - C.SEVIYE0);
  tasi('kesim', seviye - C.SEVIYE0);
  tasi('sutun', tepe - C.BORU_UST);
  tasi('surgu', tepe);
  q('kubbe').forEach(function (el) { el.style.opacity = Math.max(0, Math.min(1, (tepe - C.BORU_UST + 1.5) / 1.5)); });
  return { h: h, seviye: seviye, tepe: tepe };
}
function torBasinc(hmm) { return (hmm / 1000) * TOR_SABIT.D * TOR_SABIT.G; }
function torSutun(pa) { return (pa / (TOR_SABIT.D * TOR_SABIT.G)) * 1000; }
`;

/* Figüre özgü stil: cıva kendi mürekkebinin tonlarıdır (renk değil), oyuk daha koyu bir zemindir. */
const TOR_CSS = `
.tor{--tor-hg-0:#676d78;--tor-hg-1:#7b818d;--tor-hg-2:#8f95a1;--tor-hg-3:#a4aab5;--tor-hg-ust:#c9cdd6;--tor-oyuk:#0b0b0b}
.tor[data-theme="light"]{--tor-hg-0:#7f848c;--tor-hg-1:#92979f;--tor-hg-2:#a5aab1;--tor-hg-3:#b9bdc3;--tor-hg-ust:#d3d6da;--tor-oyuk:#d6d6d2}
.tor .tor-hg>.iso-fill{fill:var(--tor-hg-2)}
.tor .tor-hg>.iso-shade[data-shade="0"]{fill:var(--tor-hg-0)}
.tor .tor-hg>.iso-shade[data-shade="1"]{fill:var(--tor-hg-1)}
.tor .tor-hg>.iso-shade[data-shade="2"]{fill:var(--tor-hg-2)}
.tor .tor-hg>.iso-shade[data-shade="3"]{fill:var(--tor-hg-3)}
.tor .tor-hg>.iso-top,.tor .tor-hg-yuzey{fill:var(--tor-hg-ust);stroke:none}
.tor .tor-hg-havuz{fill:var(--tor-hg-3);stroke:none}
.tor .tor-oyuk{fill:var(--tor-oyuk);stroke:none}
`;

/* ---- 1. tek başına sayfa ---- */
const LIVE = `
const TOR_SABIT = ${JSON.stringify(SABIT)};
${POZ}
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");
const TR = (v, n) => v.toFixed(n).replace(".", ",");
const ATM = torBasinc(TOR_SABIT.H0), ALT = 60000, UST = 104000;
let p = ATM, target = ATM, frame = 0, last = 0, clock = 0, touring = !still.matches, visible = false, idleTimer = 0;
const tourAt = (t) => ATM - (ATM - 72000) * (0.5 - 0.5 * Math.cos(t * 0.5));
function draw() {
  const h = torSutun(p);
  torPoz(svg, h);
  const text = "P₀ " + TR(p / 1000, 1) + " kPa · sütun " + TR(h / 10, 1) + " cm";
  if (readout.textContent !== text) readout.textContent = text;
  stage.setAttribute("aria-valuenow", String(Math.round(p / 100) / 10));
  stage.setAttribute("aria-valuetext", "Açık hava basıncı " + TR(p / 1000, 1) + " kilopaskal, cıva sütunu " + TR(h / 10, 1) + " santimetre");
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  if (touring) { clock += dt; target = tourAt(clock); }
  p = still.matches ? target : p + (target - p) * (1 - Math.exp(-dt / 0.35));
  if (Math.abs(target - p) < 2) p = target;
  draw();
  frame = visible && (touring || p !== target) ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (next) => { touring = false; target = Math.min(UST, Math.max(ALT, next)); clearTimeout(idleTimer); idleTimer = setTimeout(() => { if (still.matches) return; touring = true; clock = Math.acos(1 - 2 * Math.min(1, Math.max(0, (ATM - target) / (ATM - 72000)))) / 0.5; run(); }, 3600); run(); };
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
stage.addEventListener("pointermove", (event) => {
  const box = svg.getBoundingClientRect();
  const share = Math.min(1, Math.max(0, 1 - (event.clientY - box.top - box.height * 0.2) / (box.height * 0.6)));
  steer(ALT + share * (UST - ALT));
});
stage.addEventListener("pointerleave", () => steer(target));
stage.addEventListener("keydown", (event) => {
  let to = null;
  if (event.key === "ArrowUp" || event.key === "ArrowRight") to = target + 1000;
  if (event.key === "ArrowDown" || event.key === "ArrowLeft") to = target - 1000;
  if (event.key === "Home") to = ATM;
  if (event.key === "End") to = ALT;
  if (to === null) return;
  event.preventDefault();
  steer(to);
});
draw();
`;

const label =
  "Torricelli düzeneği: bir ucu kapalı, 1 metrelik cam boru cıva dolu bir kaba ters daldırılmış. Açık hava kaptaki cıvaya bastırır, borudaki cıva sütunu bu basıncı dengeler. Sütunun boyu yanındaki metre çubuğundan okunur; basınç düşünce sütun kısalır.";

for (const theme of ["dark", "light"]) {
  const svg = k.figureSvg({ width: WIDTH, height: HEIGHT, label, body, className: "tor" }).replace("<svg", `<svg data-theme="${theme}"`);
  const card = k.plateHtml({
    fig: "Şekil 1",
    title: "Torricelli deneyi",
    hint: "Basıncı değiştirmek için gez",
    readout: "P₀ 101,3 kPa · sütun 76,0 cm",
    keys: [
      { mark: "lit", label: "Cıva: borudaki sütun ve kaptaki yüzey" },
      { mark: "raised", label: "Metre çubuğu ve sürgü: sütunun boyu" },
    ],
    caption:
      "Açık hava kaptaki cıvanın yüzeyine bastırır; borudaki sütun, ağırlığı bu basıncı dengeleyene kadar durur. Deniz seviyesinde 76 cm: 0,76 · 13.600 · 9,8 ≈ 101.300 Pa = 1 atm. Basınç azalınca sütun kısalır, cıva kaba döner.",
    body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Torricelli düzeneği: ok tuşları açık hava basıncını değiştirir" aria-valuemin="60" aria-valuemax="104" aria-valuenow="101.3">${svg}</div>`,
  });
  const page = k
    .pageHtml({ title: "Torricelli deneyi", theme, body: card, script: LIVE, width: 560 })
    .replace('<html lang="en">', '<html lang="tr">')
    .replace("</style>", `${TOR_CSS}.iso-plate .iso-svg{max-width:400px}</style>`);
  const name = theme === "light" ? "torricelli-light.html" : "torricelli.html";
  writeFileSync(join(HERE, name), page);
  console.log("yazıldı", name, Math.round(page.length / 1024) + " KB");
}

/* ---- 2. ders motoru için ---- */
/* Yakın kadrajlar figürle aynı orandadır (W : H); kap alt yarıyı, tepe borunun üst ucunu gösterir. */
const kadraj = (cx, alt, w) => { const h = (w * HEIGHT) / WIDTH; return [r1(cx - w / 2), r1(alt - h), r1(w), r1(h)]; };
const KADRAJ = {
  tum: [0, 0, WIDTH, HEIGHT],
  kap: kadraj(at([0, 0, 0])[0], HEIGHT - 4, 232),
  tepe: kadraj(at([0, 0, 0])[0] + 8, at([0, 0, BORU_UST - 150])[1], 150),
};
/* Tahta rengi (--board) kâğıt olur; tonlar tahtanın mavisine çekilir. Kart, gölge bulanıklığı ve CSS animasyonu yok. */
const TAHTA_CSS = `
.tor{--anatomy-paper:var(--board,#10162b);--anatomy-face:#1a2240;--anatomy-top:#1c2443;
--anatomy-shade-0:#0c1122;--anatomy-shade-1:#0f1529;--anatomy-shade-2:#131a31;--anatomy-shade-3:#171f3a;
--anatomy-lit-top:#2a3358;--anatomy-lit-shade:#1e2647;
--anatomy-hi:#dfe4f2;--anatomy-mid:#7c87a8;--anatomy-lo:#47527a;--anatomy-faint:#283154;--anatomy-lit:#ffffff;
--anatomy-halo:#060914;--anatomy-halo-opacity:.5;--anatomy-dot:#dfe4f2;--anatomy-weight:.6px;
--tor-hg-0:#6d7486;--tor-hg-1:#81889a;--tor-hg-2:#959cae;--tor-hg-3:#aab0c0;--tor-hg-ust:#d0d5e2;--tor-oyuk:#080c1a}
.tor path,.tor circle{vector-effect:non-scaling-stroke}
`;
const kitCss = k.ISO_CSS.split("\n").filter((line) => /^\.iso-(fill|solid|shade|top|halo|line|dots)/.test(line) && !/data-flow|data-pulse|iso-plate/.test(line)).join("\n");
const sekil = `/* Torricelli düzeneği (izometrik figür). ÜRETİLMİŞ DOSYA: elle değiştirme.
   Kaynak: fizik/akiskanlar/pilot/torricelli/build.mjs (anatomy kiti, MIT; bkz. pilot/torricelli/kit/LICENSE).

   const f = TORRICELLI.kur(c, svg, { x, y, h });   tahtaya yerleştirir (h: yükseklik, tahta birimi)
   f.poz(760)                                        cıva sütununu verilen boya (mm) getirir; { h, seviye, tepe } döner
   f.nokta('tepe' | 'seviye')                        o anki sütun tepesinin / kap yüzeyinin tahtadaki yeri [x, y]
   f.bak(kutu)                                       figürün [x, y, w, h] bölgesini gösterir; TORRICELLI.kadraj.{tum,kap,tepe}
                                                     (kutular figürle aynı orandadır; arası c.tween ile yumuşatılır)
   TORRICELLI.basinc(hmm) → Pa · TORRICELLI.sutun(pa) → mm · TORRICELLI.sabit */
window.TORRICELLI = (() => {
  'use strict';
  const TOR_SABIT = ${JSON.stringify(SABIT)};
  ${POZ.trim().split("\n").join("\n  ")}
  const CSS = ${JSON.stringify(kitCss + TOR_CSS + TAHTA_CSS)};
  const GOVDE = ${JSON.stringify(body)};
  const EKSEN = ${JSON.stringify([r1(at([0, 0, 0])[0]), r1(at([0, 0, 0])[1])])};   // boru ekseninin z = 0 noktası (figür birimi)
  const KADRAJ = ${JSON.stringify(KADRAJ)};
  function kur(c, svg, o = {}) {
    const h = o.h || 540, w = h * TOR_SABIT.W / TOR_SABIT.H, x = o.x || 0, y = o.y || 0, olcek = h / TOR_SABIT.H;
    const el = c.S('svg', { x, y, width: w, height: h, class: 'iso tor' }, svg);
    el.innerHTML = '<style>' + CSS + '</style>' + GOVDE;
    let durum = torPoz(el, TOR_SABIT.H0), kutu = KADRAJ.tum;
    const bak = (k) => { kutu = k; el.setAttribute('viewBox', k.map((v) => v.toFixed(2)).join(' ')); };
    const yer = (z) => [x + (EKSEN[0] - kutu[0]) * w / kutu[2], y + (EKSEN[1] - z * TOR_SABIT.RISE - kutu[1]) * h / kutu[3]];
    bak(kutu);
    return {
      el, w, h, olcek,
      poz: (hmm) => (durum = torPoz(el, hmm)),
      bak,
      nokta: (ad) => yer(ad === 'seviye' ? durum.seviye : durum.tepe),
    };
  }
  return { kur, basinc: torBasinc, sutun: torSutun, sabit: TOR_SABIT, kadraj: KADRAJ };
})();
`;
writeFileSync(join(HERE, "..", "..", "dersler", "torricelli-sekil.js"), sekil);
console.log("yazıldı dersler/torricelli-sekil.js", Math.round(sekil.length / 1024) + " KB");
console.log("parça: katı", (body.match(/class="iso-solid/g) || []).length, "· yol", (body.match(/<path/g) || []).length, "· ölçek", P.scale.toFixed(3));
