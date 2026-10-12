// Arşimet düzeneği: geometri, kayıt, kart. node build.mjs [--light] [--audit] [--az=48] [--el=36]
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";
import * as G from "./kit/lathe.mjs";
import { tubePieces, tubeSvg } from "./kit/tube.mjs";
import * as A from "./kit/audit.mjs";
import * as M from "./model.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sayi = (ad, yoksa) => {
  const bulunan = process.argv.find((a) => a.startsWith(`--${ad}=`));
  return bulunan ? Number(bulunan.split("=")[1]) : yoksa;
};
const THEME = process.argv.includes("--light") ? "light" : "dark";
const W = 560;
const H = 620;
const AZ = sayi("az", 48);
const EL = sayi("el", 36);
const TAU = Math.PI * 2;
const FI = (AZ * Math.PI) / 180; // zeminde izleyiciye bakan yön

// ---- Ölçüler (mm; z = 0 taban plakasının üstü) ----
const PLATE = { x: -128, y: -70, w: 276, d: 140, r: 8 };
const PLATE_H = 12;
const FOOT_H = 5;

const DIREK = [-100, 0];
const DIREK_R = 4;
const DIREK_UST = 428;

const KAP = [0, 0];
const BLOK_R = 53;
const BLOK_H = 18;
const IC = BLOK_H + 4; // kabın iç tabanı
const KAP_RI = M.TASIRMA_R;
const KAP_RO = KAP_RI + 2;
const KAP_UST = IC + 132;
const YUZEY0 = IC + M.AGIZ;

const SIL_R = M.SILINDIR_R;
const SIL_ALT = YUZEY0;
const SIL_UST = SIL_ALT + M.SILINDIR_BOY;

const BILYA_R = 2.4;
const SAP_R = 1.2;
const otur = (R, a) => Math.sqrt(R * R - a * a); // sapın kenarı bilyanın yüzeyine oturur
const OTUR = otur(BILYA_R, SAP_R);
const ALT_BILYA_R = 3;
const ALT_BILYA = SIL_UST + 7;
const YUKSUK_R = 1.6;
const YUKSUK = [ALT_BILYA + otur(ALT_BILYA_R, YUKSUK_R), ALT_BILYA + otur(ALT_BILYA_R, YUKSUK_R) + 4];
const CUBUK_UC = YUKSUK[1];

const GOVDE_R = 9;
const GOVDE_RI = 8;
const GOVDE_ALT = 291; // en derin pozda somunun altı kabın ağzından 4 mm yukarıda kalır
const GOVDE_UST = GOVDE_ALT + 87;
const KAPAK_UST = GOVDE_UST + 4;
const SOMUN_ALT = GOVDE_ALT - 8;
const CUBUK_R = 1.2;
const PENCERE = [GOVDE_ALT + 6, GOVDE_ALT + 68];
const SIFIR_Z = GOVDE_ALT + 62;
const UZAMA0 = M.AGIRLIK / M.YAY_K;
const GOSTERGE = SIFIR_Z - UZAMA0; // gösterge diskinin üst yüzü, havada
const GOSTERGE_R = 7.6;
const GOSTERGE_H = 2;
const YAY = { ust: GOVDE_UST, r: 4.6, tur: 9 };
const PENCERE_ACI = (38 * Math.PI) / 180;

const UST_BILYA = KAPAK_UST + 5;
const KOL_ALT = UST_BILYA + 10;
const KOL_H = 6;
const SURGU = { x: DIREK[0] - 11, y: -11, w: 22, d: 22, r: 3 };
const SURGU_Z = KOL_ALT - 8;
const SURGU_H = 22;
const KREMAYER = { x: DIREK[0] - 1.5, y: 3.4, w: 3, d: 2, r: 0.01 };
const BILEZIK = [243, 248];
const KREMAYER_Z = [BILEZIK[1], DIREK_UST - 6];

const MUSLUK_ACI = FI - (62 * Math.PI) / 180;
const MUSLUK = [Math.cos(MUSLUK_ACI), Math.sin(MUSLUK_ACI)];
const BORU_R = 4;
const BORU_Z = YUZEY0 + BORU_R - 0.5;

const BEHER = [MUSLUK[0] * 104, MUSLUK[1] * 104];
const BEHER_RI = M.TOPLAMA_R;
const BEHER_RO = BEHER_RI + 1.5;
const TERAZI = { x: BEHER[0] - 34, y: BEHER[1] - 34, w: 68, d: 120, r: 5 };
const TERAZI_Z = 4;
const TERAZI_UST = 40;
const KEFE_UST = TERAZI_UST + 9;
const BEHER_IC = KEFE_UST + 3;
const BEHER_UST = BEHER_IC + 64;
const BEHER_SU = 60; // çizilen su sütununun boyu; seviye bu sütunu aşağı kaydırır
const KADRAN = [BEHER[0], BEHER[1] + 60];
const KADRAN_R = 20;
const KADRAN_UST = TERAZI_UST + 5;
const KADRAN_SIFIR = FI - Math.PI / 2; // sıfır izleyicinin karşısında, saat yönünde artar

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [DIREK[0], DIREK[1], DIREK_UST + 4], [6, 0, KOL_ALT + KOL_H], [BEHER[0] + BEHER_RO, BEHER[1], BEHER_UST]],
  W,
  H,
  { pad: 30, azimuth: AZ, elevation: EL },
);
const V = G.viewOf(P);
const KS = G.scaleOf(P);
const COS_E = Math.cos((EL * Math.PI) / 180);

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const Ln = (d, style) => k.lineSvg(d, style);
const Dots = (points, style) => k.dotsSvg(points, style);
const ZF = (c) => G.frameOf([c[0], c[1], 0], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
const nokta = (c, r, aci, z) => [c[0] + r * Math.cos(aci), c[1] + r * Math.sin(aci), z];
const adimSay = (r) => Math.max(16, Math.min(96, Math.round(r * KS * 2.4)));
const yay3 = (c, r, z, a0, a1, n = 12) => k.pathOf(Array.from({ length: n + 1 }, (_, i) => at(nokta(c, r, a0 + ((a1 - a0) * i) / n, z))));
const halka = (c, r, z, n = 48) => Array.from({ length: n }, (_, i) => at(nokta(c, r, (i / n) * TAU, z)));
// Düşey bir gövdenin z düzleminin üstünde (dz > 0) ya da altında kalan kısmının ekrandaki bölgesi.
const sutun = (c, r, z, dz) => k.pathOf(G.hullOf([...halka(c, r, z), ...halka(c, r, z + dz)]), true);
const yakinYay = (c, r, z, n = 32) => Array.from({ length: n + 1 }, (_, i) => at(nokta(c, r, FI - Math.PI / 2 + (Math.PI * i) / n, z)));

// ---- Kayıt: her yardımcı çizdiğinin gerçek şeklini yazar ----
// Bantlar DOM sırasını sabitler: 0 arkadaki sabit parçalar, 1 silindir takımı, 2 taşıyıcı, 3 direğin sürgüden çıkan üstü, 4 öndeki cam ve musluk.
// Hareketli iki takımın sabit parçalarla sırası hiçbir pozda değişmez; denetim bunu her pozda sınar.
const R = A.recorder(P);
const BANT = 4000;
const INIS = [0, 0, -M.D_MAX];
const HAREKET = [{ piece: "sabit" }, { piece: "silindir", move: INIS }, { piece: "tasiyici", move: INIS }, { piece: "sabit" }, { piece: "sabit" }];
const ON = 4;
function koy(ad, bant, ref, svg, shapes, { bias = 0, hareket = HAREKET[bant] } = {}) {
  return R.put({ name: ad, at: ref, bias: bant * BANT + bias, svg, shapes, bant, ...hareket });
}
function silindir(ad, bant, c, r, z, h, stil = {}, { bevel = 0, ek = "", ic = "", bias = 0, sekil = {}, steps } = {}) {
  const shape = R.solid(A.cylinder(c[0], c[1], r, z, h, { name: ad, ...sekil }));
  koy(ad, bant, [c[0], c[1], z + h / 2], S(k.cylinder(c[0], c[1], r, z, h, P, steps ?? adimSay(r), bevel), { tone: "mid", ...stil, inner: ic }) + ek, [shape], { bias });
  return shape;
}
function kutu(ad, bant, plan, z, h, stil = {}, { steps = 4, bevel = 0, ek = "", ic = "", bias = 0, sekil = {} } = {}) {
  const shape = R.solid(A.slab(plan, z, h, { name: ad, ...sekil }, steps));
  koy(ad, bant, [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2], S(k.slabOf(plan, z, h, P, steps, bevel), { tone: "mid", ...stil, inner: ic }) + ek, [shape], { bias });
  return shape;
}
function disk(ad, bant, F, s0, s1, r, stil = {}, { bevel = 0, ek = "", ic = "", bias = 0, sekil = {} } = {}) {
  const shape = R.solid(A.disc(F, s0, s1, r, { name: ad, ...sekil }));
  koy(ad, bant, G.add3(F.o, G.mul3(F.a, (s0 + s1) / 2)), S(G.disc(s0, s1, r, F, P, { bevel }), { tone: "mid", ...stil, inner: ic }) + ek, [shape], { bias });
  return shape;
}
function bilya(ad, bant, merkez, r, stil = {}) {
  const shape = R.solid(A.ball(merkez, r, { name: ad }));
  koy(ad, bant, merkez, S(G.sphereOf(merkez, r, P, { steps: 32 }), { tone: "mid", ...stil }), [shape]);
  return shape;
}

// Cam kabın yarısı: yakın yarıda dış yüz, uzak yarıda iç yüz görünür. İkiye bölünür ki içine giren şey araya çizilsin.
function yarimHalka(c, rIn, rOut, z0, z1, on, n = 48) {
  const a0 = on ? FI - Math.PI / 2 : FI + Math.PI / 2;
  const acilar = Array.from({ length: n + 1 }, (_, i) => a0 + (Math.PI * i) / n);
  const rYuz = on ? rOut : rIn;
  const alt = acilar.map((a) => at(nokta(c, rYuz, a, z0)));
  const ust = acilar.map((a) => at(nokta(c, rYuz, a, z1)));
  const ustIc = acilar.map((a) => at(nokta(c, rIn, a, z1)));
  const ustDis = acilar.map((a) => at(nokta(c, rOut, a, z1)));
  const kovalar = [[], [], [], [], []];
  for (let i = 0; i < n; i++) {
    const orta = (acilar[i] + acilar[i + 1]) / 2;
    const yon = on ? 1 : -1;
    kovalar[G.toneOf([yon * Math.cos(orta), yon * Math.sin(orta), 0], P)].push(k.pathOf([alt[i], alt[i + 1], ust[i + 1], ust[i]], true));
  }
  const agiz = k.pathOf([...ustDis, ...[...ustIc].reverse()], true);
  const yuz = k.pathOf([...alt, ...[...ust].reverse()], true);
  const kenar = on ? [k.pathOf(ustDis), k.pathOf(ustIc), k.pathOf(alt), k.pathOf([alt[0], ust[0]]), k.pathOf([alt[n], ust[n]])] : [k.pathOf(ustDis), k.pathOf(ustIc), k.pathOf(alt)];
  const plan = [...acilar.map((a) => [c[0] + rOut * Math.cos(a), c[1] + rOut * Math.sin(a)]), ...[...acilar].reverse().map((a) => [c[0] + rIn * Math.cos(a), c[1] + rIn * Math.sin(a)])];
  return {
    paths: { fill: yuz + agiz, shades: kovalar.slice(0, 4).map((b) => b.join("")), top: agiz + kovalar[4].join(""), crease: "", outline: kenar.join("") },
    plan,
    ref: nokta(c, ((rIn + rOut) / 2) * 0.64, on ? FI : FI + Math.PI, (z0 + z1) / 2),
  };
}
function cam(ad, c, rIn, rOut, z0, z1, on, ek = "", bant = on ? ON : 0) {
  const yari = yarimHalka(c, rIn, rOut, z0, z1, on);
  const shape = R.solid(A.extruded(yari.plan, z0, z1 - z0, { name: ad }));
  koy(ad, bant, yari.ref, S(yari.paths, { tone: "hi", crease: "none", className: on ? "kk-cam" : "kk-cam-ic" }) + ek, [shape]);
  return shape;
}

// ---- Taban ----
{
  const plaka = R.solid(A.slab(PLATE, -PLATE_H, PLATE_H, { name: "taban.plaka", ground: true }, 8));
  for (const [i, [x, y]] of k.corners(PLATE, 22).entries()) {
    silindir(`taban.flans${i}`, 0, [x, y], 7, -PLATE_H - FOOT_H, 1.6, { tone: "lo" }, { steps: 28 });
    silindir(`taban.ayak${i}`, 0, [x, y], 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, { tone: "mid" }, { steps: 28, ek: Ln(k.knurl(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, -PLATE_H, 22, P), { tone: "lo" }) });
  }
  const vidalar = k.corners(PLATE, 10);
  const serit = { x: -112, y: PLATE.y + PLATE.d - 15, w: 150, d: 7, r: 1 };
  const cizgi = k.topTicks(serit.x + 4, serit.x + serit.w - 4, 4, 5, serit.y + 0.8, 0.6, [2, 3.6], P);
  const etiket = { x: -118, y: 24, w: 36, d: 18, r: 1.5 };
  const yazi = [30, 22, 26].map((boy, i) => k.lineOnTop([etiket.x + 4, etiket.y + 5 + i * 4], [etiket.x + 4 + boy, etiket.y + 5 + i * 4], 0.8, P)).join("");
  const ek = [
    Ln(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }),
    Ln(vidalar.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }),
    Dots(vidalar.map(([x, y]) => at([x, y, 0])), { size: 0.5 }),
    S(k.slabOf(serit, 0, 0.6, P, 3), { tone: "lo", crease: "none" }),
    Ln(cizgi.minor, { tone: "lo" }),
    Ln(cizgi.major, { tone: "mid" }),
    Dots([at([serit.x + 2, serit.y + 3.5, 0.6]), at([serit.x + serit.w - 2, serit.y + 3.5, 0.6])], { size: 0.45 }),
    S(k.slabOf(etiket, 0, 0.8, P, 4), { tone: "lo", crease: "none" }),
    Ln(k.planOutline(k.insetPlan(etiket, 1.6), 0.8, P, 4), { tone: "faint" }),
    Ln(yazi, { tone: "lo", free: true }),
    Dots([at([etiket.x + 2.6, etiket.y + etiket.d / 2, 0.8]), at([etiket.x + etiket.w - 2.6, etiket.y + etiket.d / 2, 0.8])], { size: 0.45 }),
  ].join("");
  koy("taban.plaka", 0, [PLATE.x + PLATE.w / 2, PLATE.y + PLATE.d / 2, -PLATE_H / 2], S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "lo" }) + ek, [plaka]);
  R.solid(A.slab(serit, 0, 0.6, { name: "taban.cetvel", owner: "taban.plaka" }, 3));
  R.solid(A.slab(etiket, 0, 0.8, { name: "taban.etiket", owner: "taban.plaka" }, 4));
  // Su terazisi
  const su = [-62, 40];
  silindir("taban.suterazisi", 0, su, 7, 0, 4, { tone: "mid" }, {
    bevel: 0.5,
    ek: Ln(k.ring(su[0], su[1], 4.8, 4, P, 28) + k.ring(su[0], su[1], 1.7, 4, P, 14), { tone: "lo" }) + Dots([at([su[0] + 0.6, su[1] - 0.4, 4])], { size: 0.7, tone: "hi" }),
  });
}

// ---- Statif ----
{
  const flans = k.cylinder(DIREK[0], DIREK[1], 9, 0, 3, P, 36, 0.4);
  const civata = [0.4, 2.5, 4.6].map((a) => at(nokta(DIREK, 7, a, 3)));
  R.solid(A.cylinder(DIREK[0], DIREK[1], 9, 0, 3, { name: "statif.flans" }));
  koy("statif.flans", 0, [DIREK[0], DIREK[1], 1.5], S(flans, { tone: "mid" }) + Dots(civata, { size: 0.5 }), [R.solids[R.solids.length - 1]]);
  silindir("statif.yaka", 0, DIREK, 6, 3, 5, { tone: "mid" }, { bevel: 0.4 });
  // Sürgü direkte kayar: direğin sürgünün altında ve üstünde kalan kısımları, sürgüyle birlikte uzayıp kısalan iki çubuktur.
  // Çizim sabittir (tam direk altta, üst kısmı sürgünün üst yüzüne kırpılmış olarak üstte); kayıt A.slide ile her pozda doğru boyu verir.
  const direkSekil = A.cylinder(DIREK[0], DIREK[1], DIREK_R, 8, DIREK_UST - 10, { name: "statif.direk" });
  const kremayerSekil = A.slab(KREMAYER, KREMAYER_Z[0], KREMAYER_Z[1] - KREMAYER_Z[0], { name: "statif.kremayer" }, 2);
  const surguUst = SURGU_Z + SURGU_H;
  const ortaSekil = R.solid(A.slide(G.frameOf([DIREK[0], DIREK[1], BILEZIK[1]], [0, 0, 1], [1, 0, 0], [0, 1, 0]), 0, SURGU_Z - BILEZIK[1], DIREK_R, { name: "statif.direk-orta" }));
  const ustSekil = R.solid(A.slide(G.frameOf([DIREK[0], DIREK[1], DIREK_UST - 2], [0, 0, -1], [1, 0, 0], [0, 1, 0]), 0, DIREK_UST - 2 - surguUst, DIREK_R, { name: "statif.direk-ust" }));
  const dikis = Ln([70, 130, 190].map((z) => k.sideArc(DIREK[0], DIREK[1], DIREK_R, z, P, 16)).join(""), { tone: "faint" });
  silindir("statif.direk-alt", 0, DIREK, DIREK_R, 8, BILEZIK[0] - 8, { tone: "mid", crease: "none" }, { steps: 28, ic: dikis });
  const BF = G.frameOf([DIREK[0], DIREK[1], (BILEZIK[0] + BILEZIK[1]) / 2], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  silindir("statif.bilezik", 0, DIREK, 6.4, BILEZIK[0], BILEZIK[1] - BILEZIK[0], { tone: "mid" }, { bevel: 0.4, steps: 32 });
  disk("statif.bilezik-vida", 0, BF, 6.2, 10, 1.7, { tone: "mid" }, { bias: 0.1 });
  const direk = S(k.cylinder(DIREK[0], DIREK[1], DIREK_R, BILEZIK[1], DIREK_UST - 2 - BILEZIK[1], P, 28), { tone: "mid", crease: "none" });
  const yuz = KREMAYER.y + KREMAYER.d;
  const disler = [];
  for (let z = KREMAYER_Z[0] + 3; z < KREMAYER_Z[1] - 1; z += 3) disler.push(k.segment([KREMAYER.x, yuz, z], [KREMAYER.x + KREMAYER.w, yuz, z], P));
  const kremayer = S(k.slabOf(KREMAYER, KREMAYER_Z[0], KREMAYER_Z[1] - KREMAYER_Z[0], P, 2), { tone: "mid", inner: Ln(disler.join(""), { tone: "lo" }) });
  const kirp = k.pathOf(
    G.hullOf([
      ...halka(DIREK, DIREK_R + 0.4, surguUst, 32),
      ...halka(DIREK, DIREK_R + 0.4, surguUst + 400, 32),
      ...[[KREMAYER.x - 0.3, yuz + 0.3], [KREMAYER.x + KREMAYER.w + 0.3, yuz + 0.3]].flatMap(([x, y]) => [at([x, y, surguUst]), at([x, y, surguUst + 400])]),
    ]),
    true,
  );
  const tasiyan = { piece: "tasiyici", move: INIS };
  koy("statif.direk-orta", 0, [DIREK[0], DIREK[1], 300], direk + kremayer, [ortaSekil], { hareket: tasiyan });
  koy("statif.direk-ust", 3, [DIREK[0], DIREK[1], DIREK_UST - 6], `<clipPath id="kk-direk-ust"><path data-part="direk-kirp" d="${kirp}"/></clipPath><g clip-path="url(#kk-direk-ust)">${direk}${kremayer}</g>`, [ustSekil], { hareket: tasiyan });
  silindir("statif.baslik", 3, DIREK, 4.8, DIREK_UST - 2, 2.4, { tone: "mid" }, { bevel: 0.3, steps: 28, bias: 0.1 });

  // Sürgü ve taşıyıcı (bant 2)
  const vidaUst = [at([SURGU.x + 4, SURGU.y + SURGU.d - 4, SURGU_Z + SURGU_H]), at([SURGU.x + SURGU.w - 4, SURGU.y + SURGU.d - 4, SURGU_Z + SURGU_H])];
  kutu("surgu.govde", 2, SURGU, SURGU_Z, SURGU_H, { tone: "mid" }, {
    bevel: 0.6,
    ic: Ln(k.sideSeam(SURGU, SURGU_Z + SURGU_H - 4, P, 4), { tone: "faint" }),
    ek: Dots(vidaUst, { size: 0.45 }),
    sekil: { cut: [direkSekil, kremayerSekil] },
  });
  const PF = G.frameOf([DIREK[0], SURGU.y + SURGU.d, SURGU_Z + SURGU_H / 2], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
  disk("surgu.pinyon", 2, PF, 0, 4, 5.4, { tone: "mid" });
  const tirtil = k.fadedSvg(G.ribsOf(PF, 4, 10, 6.8, 34, P, { fade: [0.08, 0.5] }), { tone: "lo" });
  const isaret = Ln(k.pathOf([at(G.pointOf(PF, 10, 0, 0)), at(G.pointOf(PF, 10, 5.6, 2.2))]), { tone: "hi" }) + Dots([at(G.pointOf(PF, 10, 0, 0))], { size: 0.5, tone: "hi" });
  disk("surgu.dugme", 2, PF, 4, 10, 6.8, { tone: "mid" }, { bevel: 0.5, ek: tirtil + isaret });
  const kilit = [SURGU.x + SURGU.w - 5, SURGU.y + 5];
  silindir("surgu.kilit", 2, kilit, 2.6, SURGU_Z + SURGU_H, 4.5, { tone: "mid" }, { steps: 20, ek: Ln(k.knurl(kilit[0], kilit[1], 2.6, SURGU_Z + SURGU_H, SURGU_Z + SURGU_H + 4.5, 16, P), { tone: "lo" }) });
  const KOL = { x: SURGU.x + SURGU.w, y: -3.5, w: -6 - (SURGU.x + SURGU.w), d: 7, r: 0.6 };
  kutu("kol", 2, KOL, KOL_ALT, KOL_H, { tone: "mid" }, { bevel: 0.5, ek: Dots([at([KOL.x + 5, 0, KOL_ALT + KOL_H]), at([KOL.x + KOL.w - 5, 0, KOL_ALT + KOL_H])], { size: 0.45 }) });
  const UC = { x: -6, y: -5.5, w: 12, d: 11, r: 1.6 };
  kutu("kol.uc", 2, UC, KOL_ALT - 1.5, KOL_H + 3, { tone: "mid" }, { bevel: 0.5, ek: Ln(k.ring(0, 0, 2.2, KOL_ALT + KOL_H + 1.5, P, 14), { tone: "lo" }) + Dots([at([0, 0, KOL_ALT + KOL_H + 1.5])], { size: 0.5 }) });
  silindir("kol.sap", 2, KAP, SAP_R, UST_BILYA + OTUR, KOL_ALT - 1.5 - UST_BILYA - OTUR, { tone: "mid", crease: "none" }, { steps: 12 });
  bilya("kol.bilya", 2, [0, 0, UST_BILYA], BILYA_R, { tone: "mid" });
}

// ---- Dinamometre (bant 2) ----
const yayYolu = (zUst, zAlt, c, r, tur, P) => {
  const say = Math.max(1, Math.round(tur * 16));
  const arka = [];
  const on = [];
  let parca = [];
  let yakin = null;
  for (let i = 0; i <= say; i++) {
    const pay = i / say;
    const aci = pay * tur * Math.PI * 2;
    const yuzde = k.depthOf([Math.cos(aci), Math.sin(aci), 0], P) > 0;
    const duz = k.iso([c[0] + r * Math.cos(aci), c[1] + r * Math.sin(aci), zUst + (zAlt - zUst) * pay], P);
    if (yakin === null) yakin = yuzde;
    if (yuzde !== yakin) {
      parca.push(duz);
      (yakin ? on : arka).push(k.pathOf(parca));
      parca = [duz];
      yakin = yuzde;
      continue;
    }
    parca.push(duz);
  }
  if (parca.length > 1) (yakin ? on : arka).push(k.pathOf(parca));
  return { arka: arka.join(""), on: on.join("") };
};
{
  const F = ZF(KAP);
  const sekiller = [
    R.solid(A.ring(F, GOVDE_ALT, GOVDE_ALT + 3, CUBUK_R + 0.1, GOVDE_R, { name: "dinamometre.salmastra" })),
    R.solid(A.ring(F, GOVDE_ALT + 3, GOVDE_UST, GOVDE_RI, GOVDE_R, { name: "dinamometre.boru" })),
    // Salmastra somunu gövdeyle tek öğedir: çubuk ikisinin içinden geçer, ayrı öğe olsalar sıraları kurulamaz.
    R.solid(A.ring(F, SOMUN_ALT, GOVDE_ALT, CUBUK_R + 0.1, 4.2, { name: "dinamometre.somun" })),
  ];
  const somun = S(k.cylinder(0, 0, 4.2, SOMUN_ALT, GOVDE_ALT - SOMUN_ALT, P, 24), { tone: "hi", crease: "lo" });
  const a0 = FI - PENCERE_ACI;
  const a1 = FI + PENCERE_ACI;
  const kose = (r, a, z) => at(nokta(KAP, r, a, z));
  const yayNokta = (r, z, from, to, n = 10) => Array.from({ length: n + 1 }, (_, i) => kose(r, from + ((to - from) * i) / n, z));
  const dis = [...yayNokta(GOVDE_R, PENCERE[1], a0, a1), ...yayNokta(GOVDE_R, PENCERE[0], a1, a0)];
  const acik = k.pathOf(dis, true);
  // Açıklığın iç duvarları: iki yan ve alt dudak, boru et kalınlığı kadar
  const yan = (a) => k.pathOf([kose(GOVDE_R, a, PENCERE[0]), kose(GOVDE_R, a, PENCERE[1]), kose(GOVDE_RI, a, PENCERE[1]), kose(GOVDE_RI, a, PENCERE[0])], true);
  const dudak = k.pathOf([...yayNokta(GOVDE_R, PENCERE[0], a0, a1), ...yayNokta(GOVDE_RI, PENCERE[0], a1, a0)], true);
  const icKenar = k.pathOf([kose(GOVDE_RI, a0, PENCERE[1]), ...yayNokta(GOVDE_RI, PENCERE[0], a0, a1), kose(GOVDE_RI, a1, PENCERE[1])]);
  const duvar = `<path class="iso-shade" data-shade="1" d="${yan(a0)}"/><path class="iso-shade" data-shade="2" d="${yan(a1)}"/><path class="iso-top" d="${dudak}"/>`;
  const yay = yayYolu(YAY.ust, GOSTERGE, KAP, YAY.r, YAY.tur, P);
  const gosterge =
    S(k.cylinder(0, 0, CUBUK_R, GOVDE_ALT - 16, GOSTERGE - GOSTERGE_H - GOVDE_ALT + 16, P, 12), { tone: "hi", crease: "none" }) +
    S(k.cylinder(0, 0, GOSTERGE_R, GOSTERGE - GOSTERGE_H, GOSTERGE_H, P, 32), { tone: "hi", crease: "lo" });
  const icerik = [
    `<clipPath id="kk-pencere"><path d="${acik}"/></clipPath>`,
    `<g clip-path="url(#kk-pencere)">`,
    `<path class="kk-oyuk" d="${acik}"/>`,
    `<path data-part="yay-arka" class="iso-line kk-yay" data-tone="lo" d="${yay.arka}"/>`,
    `<path data-part="yay-on" class="iso-line kk-yay" data-tone="mid" d="${yay.on}"/>`,
    `<g data-part="gosterge">${gosterge}</g>`,
    duvar,
    `</g>`,
    Ln(icKenar, { tone: "faint" }),
    Ln(acik, { tone: "lo" }),
  ].join("");
  // Ölçek: açıklığın kenarına köklü çentikler, 0,25 N'da bir; tam newtonlar uzun
  const cizgi = { kucuk: [], buyuk: [], sifir: "" };
  for (let n = 0; n <= 20; n++) {
    const z = SIFIR_Z - n * 2.5;
    const tam = n % 4 === 0;
    const d = k.pathOf([kose(GOVDE_R, a0, z), kose(GOVDE_R, a0 - (tam ? 0.4 : 0.22), z)]);
    if (n === 0) cizgi.sifir = d;
    else (tam ? cizgi.buyuk : cizgi.kucuk).push(d);
  }
  const olcek = Ln(cizgi.kucuk.join(""), { tone: "lo" }) + Ln(cizgi.buyuk.join(""), { tone: "mid" }) + Ln(cizgi.sifir, { tone: "hi" });
  const dikis = Ln(k.sideArc(0, 0, GOVDE_R, GOVDE_ALT + 3, P, 24), { tone: "faint" });
  const govde = S(k.cylinder(0, 0, GOVDE_R, GOVDE_ALT, GOVDE_UST - GOVDE_ALT, P, 40, 0.5), { tone: "hi", crease: "lo", inner: dikis });
  koy("dinamometre.govde", 2, [0, 0, (GOVDE_ALT + GOVDE_UST) / 2], somun + govde + icerik + olcek, sekiller);
  silindir("dinamometre.kapak", 2, KAP, GOVDE_R + 0.7, GOVDE_UST, KAPAK_UST - GOVDE_UST, { tone: "hi", crease: "lo" }, { bevel: 0.5, steps: 40, ek: Ln(k.knurl(0, 0, GOVDE_R + 0.7, GOVDE_UST, KAPAK_UST, 40, P, 0.3), { tone: "lo" }) });
  silindir("dinamometre.sap", 2, KAP, SAP_R, KAPAK_UST, UST_BILYA - OTUR - KAPAK_UST, { tone: "hi", crease: "none" }, { steps: 12 });

}

// ---- Silindir takımı (bant 1) ----
const CUBUK = G.rodOut(G.frameOf([0, 0, SOMUN_ALT], [0, 0, -1], [1, 0, 0], [0, 1, 0]), 0, SOMUN_ALT - CUBUK_UC, CUBUK_R, P, { stroke: 12, steps: 12 });
{
  const bant = Ln([20, 60].map((z) => k.sideArc(0, 0, SIL_R, SIL_ALT + z, P, 32)).join(""), { tone: "lo" });
  silindir("silindir", 1, KAP, SIL_R, SIL_ALT, M.SILINDIR_BOY, { tone: "hi", lit: true, crease: "lo" }, { bevel: 1, ic: bant, steps: 64 });
  silindir("silindir.pul", 1, KAP, 4.6, SIL_UST, 1, { tone: "hi", crease: "lo" }, { steps: 24 });
  silindir("silindir.sap", 1, KAP, SAP_R, SIL_UST + 1, ALT_BILYA - otur(ALT_BILYA_R, SAP_R) - SIL_UST - 1, { tone: "hi", crease: "none" }, { steps: 12 });
  bilya("silindir.bilya", 1, [0, 0, ALT_BILYA], ALT_BILYA_R, { tone: "hi" });
  silindir("cubuk.yuksuk", 1, KAP, YUKSUK_R, YUKSUK[0], YUKSUK[1] - YUKSUK[0], { tone: "hi", crease: "lo" }, { steps: 14 });
  const F = ZF(KAP);
  const sekiller = [
    R.solid(A.disc(F, CUBUK_UC, GOSTERGE - GOSTERGE_H, CUBUK_R, { name: "cubuk" })),
    R.solid(A.disc(F, GOSTERGE - GOSTERGE_H, GOSTERGE, GOSTERGE_R, { name: "cubuk.gosterge" })),
  ];
  const svg = `<clipPath id="kk-cubuk"><path data-hold d="${CUBUK.clip}"/></clipPath><g clip-path="url(#kk-cubuk)">${S(CUBUK.paths, { tone: "hi", crease: "none" })}</g>`;
  koy("cubuk", 1, [0, 0, (CUBUK_UC + SOMUN_ALT) / 2], svg, sekiller);
}

// ---- Taşırma kabı ----
let BORU_UC;
{
  silindir("kap.blok", 0, KAP, BLOK_R, 0, BLOK_H, { tone: "mid" }, { bevel: 1, steps: 80, ic: Ln(k.sideArc(0, 0, BLOK_R, 6, P, 48) + k.sideArc(0, 0, BLOK_R, 12, P, 48), { tone: "faint" }) });
  silindir("kap.taban", 0, KAP, KAP_RO, BLOK_H, IC - BLOK_H, { tone: "hi", crease: "lo" }, { steps: 80 });
  for (const [i, aci] of [FI - 0.62, FI + 0.62].entries()) {
    const yer = nokta(KAP, KAP_RO + 2.2, aci, 0);
    silindir(`kap.pim${i}`, ON, yer, 1.9, BLOK_H, 5.5, { tone: "mid" }, { steps: 14, bias: 0.2 });
  }
  cam("kap.arka", KAP, KAP_RI, KAP_RO, IC, KAP_UST, false);
  const onCam = cam("kap.on", KAP, KAP_RI, KAP_RO, IC, KAP_UST, true);

  // Musluk: yastık kabın eğri duvarına oturur, boru yastığın düz yüzünden çıkar
  const MF = G.frameAlong([0, 0, BORU_Z], [MUSLUK[0], MUSLUK[1], 0]);
  const yastikUc = KAP_RO + 3.5;
  const yastik = R.solid(A.disc(MF, KAP_RO - 0.6, yastikUc, 5.8, { name: "musluk.yastik", seated: true, cut: [onCam] }));
  koy("musluk.yastik", ON, G.pointOf(MF, KAP_RO + 2, 0, 0), S(G.saddleOf(MF, 5.8, KAP_RO, yastikUc, P), { tone: "hi", crease: "lo" }), [yastik], { bias: 0.1 });
  const egim = 9;
  const rota = G.fillet(
    [G.pointOf(MF, yastikUc, 0, 0), G.pointOf(MF, 76, 0, 0), [MUSLUK[0] * 93, MUSLUK[1] * 93, BORU_Z - egim]],
    10,
    8,
    { P, tube: BORU_R },
  );
  R.route("musluk.boru", rota, BORU_R, { ends: [true, false], piece: "sabit" });
  tubePieces(rota, BORU_R, P, { maxLength: 30, spacing: 1.6 }).forEach((parca, i) => {
    R.put({ name: `musluk.boru:${i}`, at: parca.mid, bias: ON * BANT + 0.05, svg: tubeSvg(parca, { tone: "hi" }), shapes: [A.tube(parca.points, parca.radii)], bant: ON, piece: "sabit", route: "musluk.boru", chunk: i });
  });
  BORU_UC = rota[rota.length - 1];
}

// ---- Terazi ve toplama kabı ----
{
  for (const [i, [x, y]] of k.corners(TERAZI, 9).entries()) silindir(`terazi.ayak${i}`, ON, [x, y], 4, 0, TERAZI_Z, { tone: "lo" }, { steps: 20 });
  const vida = k.corners(TERAZI, 6).map(([x, y]) => at([x, y, TERAZI_UST]));
  kutu("terazi.govde", ON, TERAZI, TERAZI_Z, TERAZI_UST - TERAZI_Z, { tone: "mid" }, {
    steps: 6,
    bevel: 1,
    ic: Ln(k.sideSeam(TERAZI, TERAZI_UST - 6, P, 6), { tone: "faint" }),
    ek:
      Dots(vida, { size: 0.45 }) +
      // +x yüzünde havalandırma: kapalı yarıklar
      Ln(
        [0, 1, 2, 3, 4]
          .map((i) => {
            const y0 = TERAZI.y + 62 + i * 9;
            const x = TERAZI.x + TERAZI.w;
            return k.pathOf([at([x, y0, 12]), at([x, y0 + 5, 12]), at([x, y0 + 5, 26]), at([x, y0, 26])], true);
          })
          .join(""),
        { tone: "lo" },
      ),
  });
  const yuzY = TERAZI.y + TERAZI.d;
  const levha = { x: TERAZI.x + 9, y: yuzY, w: 30, d: 0.7, r: 0.01 };
  const satir = [22, 16].map((boy, i) => k.segment([levha.x + 4, yuzY + 0.7, 26 - i * 5], [levha.x + 4 + boy, yuzY + 0.7, 26 - i * 5], P)).join("");
  kutu("terazi.levha", ON, levha, 14, 16, { tone: "lo", crease: "none" }, {
    steps: 2,
    bias: 0.2,
    ek: Ln(satir, { tone: "lo", free: true }) + Dots([at([levha.x + 1.8, yuzY + 0.7, 22]), at([levha.x + levha.w - 1.8, yuzY + 0.7, 22])], { size: 0.45 }),
  });
  silindir("terazi.mil", ON, BEHER, 5, TERAZI_UST, 6, { tone: "mid" }, { steps: 24 });
  silindir("terazi.kefe", ON, BEHER, 34, TERAZI_UST + 6, 3, { tone: "mid" }, { bevel: 0.7, steps: 72 });
  silindir("beher.taban", ON, BEHER, BEHER_RO, KEFE_UST, BEHER_IC - KEFE_UST, { tone: "hi", crease: "lo" }, { steps: 64 });
  cam("beher.arka", BEHER, BEHER_RI, BEHER_RO, BEHER_IC, BEHER_UST, false, "", ON);
  // Ölçek: 12,5 mL'de bir çentik, 50 mL'de bir uzun; cam üstündeki baskı şeridinin kenarına köklü
  const mL = (hacim) => BEHER_IC + (hacim * 1000) / M.TOPLAMA_ALAN;
  const s0 = FI + 0.5;
  const serit = [...Array.from({ length: 9 }, (_, i) => at(nokta(BEHER, BEHER_RO, s0 + (0.07 * i) / 8, mL(150) + 3))), ...Array.from({ length: 9 }, (_, i) => at(nokta(BEHER, BEHER_RO, s0 + 0.07 - (0.07 * i) / 8, mL(0) + 3)))];
  const kucuk = [];
  const buyuk = [];
  for (let n = 1; n <= 12; n++) (n % 4 === 0 ? buyuk : kucuk).push(yay3(BEHER, BEHER_RO, mL(n * 12.5), s0, s0 - (n % 4 === 0 ? 0.16 : 0.09), 1));
  const olcek = Ln(k.pathOf(serit, true), { tone: "lo" }) + Ln(kucuk.join(""), { tone: "lo" }) + Ln(buyuk.join(""), { tone: "mid" });
  cam("beher.on", BEHER, BEHER_RI, BEHER_RO, BEHER_IC, BEHER_UST, true, olcek);

  // Kadran: yukarı bakan disk, tam tur 2 N
  const [x, y] = KADRAN;
  const cizgi = k.radialTicks(x, y, KADRAN_R - 3, 40, 5, KADRAN_UST, [1.5, 3.2], P, KADRAN_SIFIR);
  const sifir = k.lineOnTop([x + Math.sin(KADRAN_SIFIR) * (KADRAN_R - 8), y - Math.cos(KADRAN_SIFIR) * (KADRAN_R - 8)], [x + Math.sin(KADRAN_SIFIR) * (KADRAN_R - 3), y - Math.cos(KADRAN_SIFIR) * (KADRAN_R - 3)], KADRAN_UST, P);
  const ek = [
    Ln(k.knurl(x, y, KADRAN_R, KADRAN_UST - 2.6, KADRAN_UST, 72, P, 0.3), { tone: "lo" }),
    Ln(k.ring(x, y, KADRAN_R - 2.4, KADRAN_UST, P, 64), { tone: "lo" }),
    Ln(cizgi.minor, { tone: "lo" }),
    Ln(cizgi.major, { tone: "mid" }),
    Ln(sifir, { tone: "hi" }),
    Ln(k.ring(x, y, 1.7, KADRAN_UST, P, 16), { tone: "mid" }),
    k.faceTextSvg(k.topMatrix([x + 7 * Math.cos(FI), y + 7 * Math.sin(FI)], KADRAN_UST, P, "x"), "N", { size: 3.6, tone: "lo", anchor: "middle" }),
  ].join("");
  silindir("terazi.kadran", ON, KADRAN, KADRAN_R, TERAZI_UST, KADRAN_UST - TERAZI_UST, { tone: "hi", crease: "lo" }, { bevel: 0.8, steps: 64, ic: Ln(k.sideArc(x, y, KADRAN_R, KADRAN_UST - 2.6, P, 40), { tone: "faint" }), ek });
  const dugme = [TERAZI.x + TERAZI.w - 9, TERAZI.y + TERAZI.d - 9];
  silindir("terazi.dugme", ON, dugme, 4, TERAZI_UST, 4, { tone: "mid" }, {
    steps: 24,
    ek: Ln(k.knurl(dugme[0], dugme[1], 4, TERAZI_UST, TERAZI_UST + 4, 22, P), { tone: "lo" }) + Ln(k.lineOnTop(dugme, [dugme[0] + 4, dugme[1]], TERAZI_UST + 4, P), { tone: "hi" }) + Dots([at([dugme[0], dugme[1], TERAZI_UST + 4])], { size: 0.5, tone: "hi" }),
  });
}

const ibreYolu = (tur) => {
  const aci = KADRAN_SIFIR + tur * Math.PI * 2;
  const [x, y] = KADRAN;
  return k.lineOnTop([x - Math.sin(aci) * 3.6, y + Math.cos(aci) * 3.6], [x + Math.sin(aci) * (KADRAN_R - 5), y - Math.cos(aci) * (KADRAN_R - 5)], KADRAN_UST + 0.2, P);
};

// ---- Pozlar: denetim sırayı ve boşlukları her pozda sınar ----
function pozlar() {
  let durum = M.ilk();
  const out = [0];
  let d = 0;
  const git = (hedef, etiket) => {
    let son;
    const say = Math.max(1, Math.ceil(Math.abs(hedef - d) / 0.25));
    const d0 = d;
    for (let i = 1; i <= say; i++) {
      d = d0 + ((hedef - d0) * i) / say;
      son = M.adim(durum, d, 0.01);
      durum = son.durum;
    }
    out.push({ label: etiket, shares: { tasiyici: d / M.D_MAX, silindir: (d - son.denge.kaldirma / M.YAY_K) / M.D_MAX, sabit: 0 } });
  };
  for (const hedef of [15, 30, 45, 60, 75, 89.85, 100, 109.85, 118, M.D_MAX]) git(hedef, `indirme ${hedef}`);
  for (const hedef of [80, 40, 12]) git(hedef, `geri ${hedef}`);
  return out;
}
const POZLAR = pozlar();

A.settle(R, P, { states: POZLAR });
R.items.sort((a, b) => a.key - b.key);
for (const item of R.items) {
  if (Math.floor((item.key + BANT / 2) / BANT) !== item.bant) throw new Error(`${item.name} bandının dışına itildi (anahtar ${item.key.toFixed(1)}, bant ${item.bant}): katmanı yanlış`);
}
// Yuvalar: yerleşik sırada adı verilen öğenin hemen ardına çizilen canlı parçalar (su, akış, ibre).
const yuva = new Map();
const katman = (n) => R.items.filter((item) => item.bant === n).map((item) => `<g class="it" data-name="${item.name}">${item.svg}</g>${yuva.get(item.name) ?? ""}`).join("");

// ---- Su: kayıtlı katı değildir; yerleşik sıranın ayrılmış yuvalarında çizilir ----
const suSutunu = (c, r, z, h, ad, kirp) =>
  `<clipPath id="${kirp}"><path d="${sutun(c, r + 0.4, z, 400)}"/></clipPath><g clip-path="url(#${kirp})"><g data-part="${ad}" class="kk-su">${S(k.cylinder(c[0], c[1], r, z, h, P, 72), { tone: "mid", crease: "lo" })}</g></g>`;
const akisUst = [BORU_UC[0], BORU_UC[1], BORU_UC[2] - BORU_R * 0.9];
const dusme = [akisUst[0], akisUst[1]];
const halkaSu = Ln(k.ring(dusme[0], dusme[1], 3.2, BEHER_IC + BEHER_SU, P, 20) + k.ring(dusme[0], dusme[1], 6, BEHER_IC + BEHER_SU, P, 28), { tone: "lo" }) + Dots([at([dusme[0], dusme[1], BEHER_IC + BEHER_SU])], { size: 0.7, tone: "hi" });
const suKatmani = suSutunu(KAP, KAP_RI - 0.3, IC, M.AGIZ, "su", "kk-kap-ici");
yuva.set(
  "beher.arka",
  suSutunu(BEHER, BEHER_RI - 0.3, BEHER_IC, BEHER_SU, "beher-su", "kk-beher-ici") +
    `<g data-part="akis" class="kk-su" style="display:none"><path data-part="akis-cizgi" class="iso-line kk-akis" data-tone="hi" data-flow d=""/><g clip-path="url(#kk-beher-ici)"><g data-part="akis-halka">${halkaSu}</g></g></g>`,
);

yuva.set("terazi.kadran", `<path data-part="ibre" class="iso-line kk-ibre" data-tone="hi" data-free="start" d="${ibreYolu(0)}"/>`);
const kapakHalka = halka(KAP, SIL_R, SIL_UST, 40);
const kapakMerkez = at([0, 0, SIL_UST]);
const altinda = (() => {
  const yay = yakinYay(KAP, SIL_R + 0.5, YUZEY0);
  const dy = 400 * COS_E * KS;
  return k.pathOf([...yay, [yay[yay.length - 1][0], yay[yay.length - 1][1] + dy], [yay[0][0], yay[0][1] + dy]], true);
})();
const sualti = `<clipPath id="kk-sualti"><path data-part="sualti-yuzey" d="${altinda}"/><path data-part="sualti-kapak" clip-rule="evenodd" d=""/><path data-part="sualti-sap" d=""/></clipPath>`;
const takim = katman(1);
const takimKopya = takim.replace(/<clipPath[\s\S]*?<\/clipPath>/g, "");
const suCizgisi = `<g class="kk-su"><path data-part="su-cizgi" class="iso-line" data-tone="hi" d="${k.pathOf(yakinYay(KAP, SIL_R + 0.05, YUZEY0))}" style="opacity:0"/></g>`;
const ETIKET =
  "Arşimet düzeneği: kremayerli bir statifin koluna asılı yaylı dinamometre, ucunda alüminyum bir silindir taşır. Altında musluğuna kadar su dolu cam taşırma kabı, musluğun altında kadranlı bir terazinin kefesinde cam toplama kabı durur. Silindir suya indikçe dinamometrenin göstergesi yukarı kayar, taşan su toplama kabına akar ve terazinin ibresi döner.";
const GOVDE = [
    `<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`,
    katman(0),
    suKatmani,
    sualti,
    `<g data-part="silindir">${takim}</g>`,
    `<g class="kk-su" clip-path="url(#kk-sualti)"><g data-part="silindir">${takimKopya}</g></g>`,
    suCizgisi,
    `<g data-part="tasiyici">${katman(2)}</g>`,
    katman(3),
    katman(ON),
].join("");
const svg = k.figureSvg({ width: W, height: H, label: ETIKET, body: GOVDE });

const DATA = {
  P,
  yay: { ...YAY, alt: GOSTERGE, c: KAP },
  kadran: { c: KADRAN, r: KADRAN_R, ust: KADRAN_UST, sifir: KADRAN_SIFIR },
  akis: { ust: akisUst, taban: BEHER_IC },
  beherSu: BEHER_SU,
  kapak: { merkez: kapakMerkez, halka: kapakHalka.map(([x, y]) => [Math.round((x - kapakMerkez[0]) * 100) / 100, Math.round((y - kapakMerkez[1]) * 100) / 100]) },
  olcek: KS,
  yuzeyFarki: YUZEY0 - SIL_UST,
  derin: M.SILINDIR_BOY * (1 + (M.RO_G * M.SILINDIR_ALAN) / M.YAY_K) + 20,
};

// Figürün kendi parçalarının stili: sayfa da ders modülü de kullanır.
const KK_CSS = `
.kk-cam>.iso-fill{fill-opacity:.2}
.kk-cam>.iso-shade{fill-opacity:.4}
.kk-cam>.iso-top{fill-opacity:.9}
.kk-cam-ic>.iso-shade{fill-opacity:.55}
.kk-oyuk{fill:var(--kk-oyuk);stroke:none}
.kk-yay{stroke-linejoin:round}
.kk-ibre{stroke-width:1.1}
.kk-akis{stroke-width:1.6;stroke-dasharray:5 3}
`;
const CSS = `${KK_CSS}
.kk-stage{position:relative;border-radius:10px;cursor:ns-resize;touch-action:pan-y;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none}
.kk-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
.kk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.kk-stage{--kk-oyuk:#e2e2df}
.iso[data-theme="dark"] .kk-stage{--kk-oyuk:#0b0b0b}
.kk-su{--anatomy-paper:#e6eaec;--anatomy-face:#eaeef0;--anatomy-top:#eef2f3;--anatomy-shade-0:#cbd2d6;--anatomy-shade-1:#d3dadd;--anatomy-shade-2:#dae0e3;--anatomy-shade-3:#e1e6e8;--anatomy-lit-top:#e9edef;--anatomy-lit-shade:#d2d9dc;--anatomy-hi:#4b5257;--anatomy-mid:#8f979c;--anatomy-lo:#aab2b7;--anatomy-faint:#c3cace;--anatomy-lit:#2b3136}
.iso[data-theme="dark"] .kk-su{--anatomy-paper:#1a1d1f;--anatomy-face:#1f2325;--anatomy-top:#202427;--anatomy-shade-0:#141719;--anatomy-shade-1:#171a1c;--anatomy-shade-2:#1a1d20;--anatomy-shade-3:#1d2123;--anatomy-lit-top:#262b2e;--anatomy-lit-shade:#1e2225;--anatomy-hi:#aeb6ba;--anatomy-mid:#687075;--anatomy-lo:#454c50;--anatomy-faint:#2f3538;--anatomy-lit:#d5dde1}
@media (max-width:640px){.kk-stage{overflow:hidden}.iso-plate .kk-stage .iso-svg{width:128%;margin:-7% -14% -5%}.iso-plate-corner[data-corner="readout"]{font-size:9px;letter-spacing:0}}
@media (prefers-reduced-motion:reduce){.kk-akis{animation:none}}
`;

const ilkOku = M.oku(M.yerler(M.ilk(), M.coz(0, 0)));
const gostergeYazi = (o) => `dinamometre ${M.bicim(o.dinamometre)} N · azalma ${M.bicim(o.azalma)} N · taşan su ${M.bicim(o.tasanSu)} N`;
const body =
  `<style>${CSS}</style>` +
  k.plateHtml({
    fig: "Şekil 2",
    title: "Arşimet düzeneği",
    hint: "↑ ↓ indirir · Enter sıfırlar",
    readout: gostergeYazi(ilkOku),
    keys: [
      { mark: "lit", label: "Silindir: suya inen cisim" },
      { mark: "raised", label: "Dinamometre ve terazi: aynı kuvvetin iki ayrı ölçümü" },
      { mark: "dim", label: "Su: taşırma kabında, musluktan toplama kabına" },
    ],
    caption: `Kremayerli statif, alüminyum silindiri (yarıçap ${M.SILINDIR_R} mm, boy ${M.SILINDIR_BOY} mm, ağırlık ${M.bicim(M.AGIRLIK)} N) yaylı dinamometreyle musluğuna kadar dolu taşırma kabına indirir. Silindir battıkça dinamometrenin gösterdiği değer azalır, taşan su kadranlı terazinin üstündeki kaba akar. Dinamometredeki azalma ile taşan suyun ağırlığı her an aynıdır. Silindir tümüyle batınca ikisi de ${M.bicim(M.RO_G * M.SILINDIR_HACIM)} N olur; daha derine inmek ikisini de değiştirmez. Silindir geri çekilince dinamometre eski değerine döner, taşan su kapta kalır.`,
    body: `<div class="iso-stage kk-stage" tabindex="0" role="slider" aria-label="Arşimet düzeneği. Yukarı ve aşağı ok silindiri 2 mm kaldırır ya da indirir, Shift ile 10 mm; Home en üste, End en derine götürür; Enter düzeneği sıfırlar." aria-valuemin="${M.D_MIN}" aria-valuemax="${M.D_MAX}" aria-valuenow="0" aria-valuetext="Silindir suyun üstünde.">${svg}<span class="kk-sr" role="status" aria-live="polite" data-durum></span></div>`,
  });

const soyulmus = (dosya) => readFileSync(join(HERE, dosya), "utf8").replace(/^export /gm, "");
const YAY_YOLU = yayYolu.toString().replace(/\bk\./g, "");
const IBRE_YOLU = ibreYolu.toString().replace(/\bk\./g, "").replace(/KADRAN_SIFIR/g, "D.kadran.sifir").replace(/KADRAN_UST/g, "D.kadran.ust").replace(/KADRAN_R/g, "D.kadran.r").replace(/KADRAN\b/g, "D.kadran.c");
const CIZ = readFileSync(join(HERE, "ciz.js"), "utf8");
const LIVE = readFileSync(join(HERE, "live.js"), "utf8").replace("__DATA__", JSON.stringify(DATA)).replace("__YAY_YOLU__", YAY_YOLU).replace("__IBRE_YOLU__", IBRE_YOLU);
const page = k
  .pageHtml({ title: "Arşimet düzeneği", theme: THEME, body, script: soyulmus("kit/iso-kit.mjs") + soyulmus("model.mjs") + CIZ + LIVE, width: 650 })
  .replace('<html lang="en">', '<html lang="tr">');
const ad = THEME === "light" ? "kaldirma-kuvveti-light.html" : "kaldirma-kuvveti.html";
writeFileSync(join(HERE, ad), page);
console.log("yazıldı", ad, `${(page.length / 1024).toFixed(0)} KB`, `${R.items.length} öğe`, `${R.solids.length} katı`, `ölçek ${KS.toFixed(3)}`);

// ---- Ders motoru için: dersler/arsimet-sekil.js (window.ARSIMET). Çizim ve model sayfadakiyle aynı koddur. ----
{
  const r1 = (v) => Math.round(v * 10) / 10;
  // Yakın kadrajlar figürle aynı orandadır (W : H).
  const kadraj = (merkez, w) => [r1(merkez[0] - w / 2), r1(merkez[1] - (w * H) / W / 2), r1(w), r1((w * H) / W)];
  const KADRAJ = {
    tum: [0, 0, W, H],
    dinamometre: kadraj(at([0, 0, GOVDE_ALT - 10]), 210),
    olcum: kadraj(at([MUSLUK[0] * 55, MUSLUK[1] * 55, 96]), 330),
  };
  // Dersin yazı ve işaret bağlayacağı yerler (figür birimi). hareket: taşıyıcıyla mı, silindirle mi iner.
  const NOKTA = {
    dinamometre: { xy: at(nokta(KAP, GOVDE_R, FI - Math.PI / 2, (GOVDE_ALT + GOVDE_UST) / 2)).map(r1), hareket: "tasiyici" },
    silindir: { xy: at(nokta(KAP, SIL_R, FI - Math.PI / 2, SIL_ALT + 40)).map(r1), hareket: "silindir" },
    kadran: { xy: at([KADRAN[0], KADRAN[1], KADRAN_UST]).map(r1), hareket: "" },
    beher: { xy: at(nokta(BEHER, BEHER_RO, FI - Math.PI / 2, BEHER_UST)).map(r1), hareket: "" },
    terazi: { xy: at([TERAZI.x + TERAZI.w, TERAZI.y, TERAZI_UST - 12]).map(r1), hareket: "" },
  };
  // Tahta rengi (--board) kâğıt olur; tonlar tahtanın mavisine çekilir. Kart, gölge bulanıklığı ve CSS animasyonu yok.
  const TAHTA_CSS = `
.ars{--anatomy-paper:var(--board,#10162b);--anatomy-face:#1a2240;--anatomy-top:#1c2443;
--anatomy-shade-0:#0c1122;--anatomy-shade-1:#0f1529;--anatomy-shade-2:#131a31;--anatomy-shade-3:#171f3a;
--anatomy-lit-top:#2a3358;--anatomy-lit-shade:#1e2647;
--anatomy-hi:#dfe4f2;--anatomy-mid:#7c87a8;--anatomy-lo:#47527a;--anatomy-faint:#283154;--anatomy-lit:#ffffff;
--anatomy-halo:#060914;--anatomy-halo-opacity:.5;--anatomy-dot:#dfe4f2;--anatomy-weight:.6px;--kk-oyuk:#080c1a}
.ars .kk-su{--anatomy-paper:#172446;--anatomy-face:#1c2a50;--anatomy-top:#1f2f58;
--anatomy-shade-0:#111b38;--anatomy-shade-1:#141f3e;--anatomy-shade-2:#172345;--anatomy-shade-3:#1a274b;
--anatomy-lit-top:#27386a;--anatomy-lit-shade:#1d2b55;
--anatomy-hi:#aebbe0;--anatomy-mid:#6a7aa8;--anatomy-lo:#44558a;--anatomy-faint:#2b3a68;--anatomy-lit:#dbe4ff}
.ars path,.ars circle{vector-effect:non-scaling-stroke}
`;
  const kitCss = k.ISO_CSS.split("\n").filter((line) => /^\.iso-(fill|solid|shade|top|halo|line|dots|face-text)|^\.tb-/.test(line) && !/data-flow|data-pulse|iso-plate/.test(line)).join("\n");
  // Kadrana kazınmış "N" derste çıkarılır: tahtada 12 px'in altında yazı olmaz.
  const DERS_GOVDE = GOVDE.replace(/<text class="iso-face-text"[^>]*>[^<]*<\/text>/g, "");
  const girinti = (kod) => kod.trim().split("\n").join("\n  ");
  // Kit kaynağı, sayfa stilleri (ISO_CSS, PAGE_CSS) boşaltılarak modüle gömülür.
  const KIT_KAYNAK = soyulmus("kit/iso-kit.mjs")
    .replace(/^const ISO_CSS = `[^`]*`;$/m, "const ISO_CSS = '';")
    .replace(/^const PAGE_CSS = `[^`]*`;$/m, "const PAGE_CSS = '';");
  const sekil = `/* Arşimet düzeneği (izometrik figür). ÜRETİLMİŞ DOSYA: elle değiştirme.
   Kaynak: fizik/akiskanlar/pilot/kaldirma-kuvveti/build.mjs (anatomy kiti, MIT; bkz. pilot/kaldirma-kuvveti/kit/LICENSE).

   const f = ARSIMET.kur(c, svg, { x, y, h });   tahtaya yerleştirir (h: yükseklik, tahta birimi)
   f.poz(mm)                                     taşıyıcıyı verilen indirmeye (0…${M.D_MAX} mm) getirir; taşan su geçmişe bağlı olduğu için
                                                 aradaki yolu küçük adımlarla yürür. f.oku() sonucunu döner. Su taşarken akış çizgisi görünür.
   f.dur()                                       akış çizgisini kapatır (hareket bitince çağır)
   f.sifir(e)                                    e: 0→1; toplama kabını boşaltır, taşırma kabını doldurur (c.tween ile sür; silindir sudan çıkmış olmalı)
   f.oku()                                       { d, batan, dalma, dinamometre, azalma, tasanSu }: sayılar yaydan ve ibreden okunur (N, mm)
   f.nokta('dinamometre' | 'silindir' | 'kadran' | 'beher' | 'terazi')   parçanın o anki tahtadaki yeri [x, y]
   f.bak(kutu)                                   figürün [x, y, w, h] bölgesini gösterir; ARSIMET.kadraj.{tum,dinamometre,olcum}
   ARSIMET.sabit                                 { agirlik, tamBatik, derin, enDerin, … }
   Aynı sahnede tek figür kurulur (kırpma kimlikleri ortaktır). */
window.ARSIMET = (() => {
  'use strict';
  ${girinti(KIT_KAYNAK)}
  ${girinti(soyulmus("model.mjs"))}
  ${girinti(CIZ)}
  const D = ${JSON.stringify(DATA)};
  const P = D.P;
  const yayYolu = ${YAY_YOLU};
  const ibreYolu = ${IBRE_YOLU};
  const CSS = ${JSON.stringify(kitCss + KK_CSS + TAHTA_CSS)};
  const GOVDE = ${JSON.stringify(DERS_GOVDE)};
  const BOY = { W: ${W}, H: ${H} };
  const KADRAJ = ${JSON.stringify(KADRAJ)};
  const NOKTA = ${JSON.stringify(NOKTA)};
  const SABIT = { agirlik: AGIRLIK, tamBatik: SILINDIR_BOY * (1 + (RO_G * SILINDIR_ALAN) / YAY_K), derin: D.derin, enDerin: D_MAX, yaricap: SILINDIR_R, boy: SILINDIR_BOY, hacim: SILINDIR_HACIM };
  function kur(c, svg, o = {}) {
    const h = o.h || 540, w = h * BOY.W / BOY.H, x = o.x || 0, y = o.y || 0;
    const el = c.S('svg', { x, y, width: w, height: h, class: 'iso ars' }, svg);
    el.innerHTML = '<style>' + CSS + '</style>' + GOVDE;
    const ciz = cizimKur(el, D, yayYolu, ibreYolu);
    let d = 0, durum = ilk(), denge = coz(0, 0), kutu = KADRAJ.tum, taban = null;
    const birim = axisVector(P, [0, 0, 1])[1];
    const oku_ = () => ({ d, batan: denge.batan, dalma: denge.dalma, ...oku(yerler(durum, denge)) });
    const poz = (mm) => {
      const hedef = Math.min(D_MAX, Math.max(D_MIN, mm)), d0 = d, say = Math.max(1, Math.ceil(Math.abs(hedef - d0) / 0.5));
      let tasan = 0;
      for (let i = 1; i <= say; i++) {
        d = d0 + (hedef - d0) * i / say;
        const s = adim(durum, d, 0);
        durum = s.durum; denge = s.denge; tasan += s.tasan;
      }
      ciz(d, durum, denge, tasan > 1e-6 ? 1 : 0);
      return oku_();
    };
    const dur = () => { ciz(d, durum, denge, 0); };
    const sifir = (e) => {
      if (!taban) taban = { eksik: durum.eksik, toplanan: durum.toplanan };
      const kalan = 1 - Math.min(1, Math.max(0, e));
      durum = { eksik: taban.eksik * kalan, toplanan: taban.toplanan * kalan, sifir: null };
      if (kalan === 0) taban = null;
      const s = adim(durum, d, 0);
      durum = { ...s.durum, toplanan: durum.toplanan }; denge = s.denge;
      ciz(d, durum, denge, 0);
      return oku_();
    };
    const bak = (k) => { kutu = k; el.setAttribute('viewBox', k.map((v) => v.toFixed(2)).join(' ')); };
    const nokta = (ad) => {
      const n = NOKTA[ad], dz = n.hareket === 'tasiyici' ? -d : n.hareket === 'silindir' ? -d + denge.kaldirma / YAY_K : 0;
      return [x + (n.xy[0] - kutu[0]) * w / kutu[2], y + (n.xy[1] + birim * dz - kutu[1]) * h / kutu[3]];
    };
    bak(kutu);
    ciz(d, durum, denge, 0);
    return { el, w, h, poz, dur, sifir, oku: oku_, bak, nokta };
  }
  return { kur, sabit: SABIT, kadraj: KADRAJ };
})();
`;
  writeFileSync(join(HERE, "..", "..", "dersler", "arsimet-sekil.js"), sekil);
  console.log("yazıldı dersler/arsimet-sekil.js", Math.round(sekil.length / 1024) + " KB");
}

A.auditOrExit(R, P, { frames: POZLAR.slice(1) });
