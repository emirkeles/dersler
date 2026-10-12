// Ş5 · Isı iletim düzeneği: geometri, kayıt, tek başına sayfa ve ders modülü.
// node build.mjs [--light] [--audit] [--boyut] [--az=28] [--el=20]
// Yazar: iletim.html | iletim-light.html (bu klasöre) ve fizik/enerji/dersler/iletim-sekil.js (window.ILETIM).
//
// Düzen (Ingenhousz düzeneği): arkada uzun bir sıcak su teknesi, ön duvarındaki üç rakordan izleyiciye doğru çıkan üç
// yatay çubuk, her çubuğun serbest ucunda kelepçe bloğuna oturan düşey bir gösteri termometresi. Çubuklar +x boyunca
// uzanır, yuvalar −y boyunca dizilir (yuva 0 en yakın ve ekranda en solda). Kamera çubuklara büyük açıyla bakar
// (azimut 28°): yuvalar ekranda yan yana düşer. Dört termometrenin (üç uç + su) 0 °C çizgisi ekranda aynı yatay
// çizgidedir: derinliğe göre z'de kaydırılır (zHat); hazneden ölçeğe kadar olan sap yuvadan yuvaya ve `boy` ile değişir.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as O from "../parcalar.mjs";

const { k, G, A } = O;
const HERE = dirname(fileURLToPath(import.meta.url));
const KOK = join(HERE, "..", "..", "..", "..", "..");
const sayi = (ad, yoksa) => {
  const bulunan = process.argv.find((a) => a.startsWith(`--${ad}=`));
  return bulunan ? Number(bulunan.split("=")[1]) : yoksa;
};
const THEME = process.argv.includes("--light") ? "light" : "dark";
const W = 840;
const H = 600; // oran 1,4 (IZOMETRIK.md 6b)
const AZ = sayi("az", 28);
const EL = sayi("el", 18);
const RAD = Math.PI / 180;
const derinlik = (x, y) => x * Math.cos(AZ * RAD) + y * Math.sin(AZ * RAD); // zeminde izleyiciye yakınlık
const TAN_E = Math.tan(EL * RAD);
const r2 = (v) => Math.round(v * 100) / 100;

// ---- Ölçüler (yaklaşık mm; z = 0 tezgâh plakasının üstü) ----
const ARA = sayi("ara", 140); // yuvalar arası
const BOY = 150; // boy: 1 çubuğun duvardan ucuna uzunluğu; boy: 2 iki katı
const RC = { 1: 6.5, 2: 10.4 }; // kesit 1 ve 2: yarıçap (çap oranı 1,6)
const ZR = 30; // çubuk ekseni
const RAKOR = 11; // rakorun duvardan taşması; çubuk buradan başlar
const BANYO = { x0: -60, x1: 0, y0: -2 * ARA - 20, y1: 120, t: 3, ped: 3, taban: 2.5, ust: 52, su: 46 };
const KAPAK = { y1: 60, h: 2.5 };
const ZK = BANYO.ust + KAPAK.h; // kapağın üstü
const YAKA = 1.6; // geçiş yuvasının yakası
const GECIS = [44, -ARA + 44, -2 * ARA + 44].map((y) => [-30, y]); // kapaktaki üç geçiş yuvası; ilkinde su termometresi
const TOPUZ = [-30, -ARA / 2 + 30];
const ZT = ZR + RC[2] + 4; // kelepçe bloğunun üstü (iki kesitte aynı)
const SOKET = 5;
const TERMO = { min: 0, max: 100, birim: 2, rCam: 4.6, rHazne: 5.2, rSutun: 1.9, hazneBoy: 12, ust: 6 };
const PLATE = { x: -78, y: BANYO.y0 - 20, w: 78 + 2 * BOY + 26, d: BANYO.y1 + 22 - (BANYO.y0 - 20), r: 8 };
const PLATE_H = 12;
const RAY_H = 0.8;
const FOOT_H = 5;
const CINS = ["aluminyum", "demir", "cam", "tahta"];

// ---- 0 °C çizgisi: dört termometrede ekranda aynı yükseklik ----
const CS = GECIS[0]; // su termometresi
const D_SU = derinlik(CS[0], CS[1]);
// Etiket bölgesi (20 °C çizgisinin biraz altından yukarısı) boş kalsın: kapağın ve üstündekilerin hiçbir noktası oraya çıkmasın.
const ENGEL = [
  [BANYO.x0 - 1.5, BANYO.y0 - 1.5, ZK],
  [BANYO.x1 + 1.5, BANYO.y0 - 1.5, ZK],
  [TOPUZ[0], TOPUZ[1], ZK + 8],
  ...GECIS.slice(1).map(([x, y]) => [x, y, ZK + YAKA + 5]),
];
// Ölçek ile izdüşüm birbirine bağlıdır (sütun uzadıkça figür küçülür): 1 °C tahtada (h: 380) en az 1,5 birim olacak biçimde yakınsat.
const HEDEF = sayi("derece", 2.42); // 1 °C'ın figür birimiyle boyu (2,42 × 380 / 600 = 1,53 tahta birimi)
const ucX = (boy) => boy * BOY - 17; // uç termometresinin ekseni
let ZS0, zHat, P;
for (let tur = 0; tur < 8; tur++) {
  ZS0 = Math.max(...ENGEL.map(([x, y, z]) => z - (derinlik(x, y) - D_SU) * TAN_E - 20 * TERMO.birim + 11));
  const z0 = ZS0;
  zHat = (x, y) => z0 + (derinlik(x, y) - D_SU) * TAN_E; // o derinlikte 0 °C çizgisinin z'si
  const zTepe = (x, y) => zHat(x, y) + (TERMO.max - TERMO.min) * TERMO.birim + TERMO.ust;
  P = k.fitProjection(
    [
      ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
      [PLATE.x + PLATE.w, PLATE.y + PLATE.d, -PLATE_H - FOOT_H - sayi("alt", 32)], // altta etiket satırına yer
      ...[0, 1, 2].flatMap((j) => [1, 2].map((b) => [ucX(b), -j * ARA, zTepe(ucX(b), -j * ARA)])),
      [CS[0], CS[1], zTepe(CS[0], CS[1])],
    ],
    W,
    H,
    { pad: 14, azimuth: AZ, elevation: EL },
  );
  const yeni = HEDEF / (k.iso([0, 0, 0], P)[1] - k.iso([0, 0, 1], P)[1]);
  if (Math.abs(yeni - TERMO.birim) < 1e-4) break;
  TERMO.birim = yeni;
}
TERMO.birim = Math.round(TERMO.birim * 1000) / 1000;

// ---- Bir kurulum: tezgâh, tekne ve verilen boy / kesitlerle üç çubuk. Bantlar: 0 tezgâh, 1 tekne, 2–4 yuva 2, 1, 0. ----
function kurulum(boylar, kesitler) {
  const T = O.atolye(P, { bantlar: Array.from({ length: 5 }, () => ({ piece: "sabit" })) });
  const { R, at, S, Ln, Dots } = T;
  const prizma = (ad, bant, F, poly, s0, s1, stil = {}) => {
    const shape = R.solid(A.prism(F, poly, s0, s1, { name: ad }));
    const m = poly.reduce((t, p) => [t[0] + p[0] / poly.length, t[1] + p[1] / poly.length], [0, 0]);
    T.koy(ad, bant, G.pointOf(F, (s0 + s1) / 2, Math.hypot(m[0], m[1]), Math.atan2(m[1], m[0])), S(G.prismOf(F, poly, s0, s1, P), { tone: "mid", ...stil }), [shape]);
    return shape;
  };

  // ---- Tezgâh: ayaklı plaka, etiket plakası, çubuk 0'ın önünde cetvel şeridi (0 duvar yüzü; 150 ve 300'de uzun çentik) ----
  const tezgah = O.tabanPlakasi(T, { ad: "tezgah", bant: 0, plan: PLATE, kalinlik: PLATE_H, ayakBoy: FOOT_H, etiket: { x: 2 * BOY - 52, y: PLATE.y + PLATE.d - 30, w: 38, d: 18, r: 1.5 } });
  for (const [i, y] of [PLATE.y + 24, PLATE.y + PLATE.d - 24].entries()) {
    const x = PLATE.x + PLATE.w / 2;
    T.silindir(`tezgah.orta-flans${i}`, 0, [x, y], 7, -PLATE_H - FOOT_H, 1.6, { tone: "lo" }, { steps: 20 });
    T.silindir(`tezgah.orta-ayak${i}`, 0, [x, y], 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, { tone: "mid" }, { steps: 20, ek: Ln(k.knurl(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, -PLATE_H, 22, P), { tone: "lo" }) });
  }
  {
    const serit = { x: -1, y: 22, w: 2 * BOY + 6, d: 7, r: 1 };
    const cizgi = k.topTicks(0, 2 * BOY, 5, 5, serit.y + 0.8, 0.6, [2, 3.6], P);
    T.kutu("tezgah.cetvel", 0, serit, 0, 0.6, { tone: "lo", crease: "none" }, { steps: 3, bias: 0.3, ek: Ln(cizgi.minor, { tone: "lo" }) + Ln(cizgi.major, { tone: "mid" }) + Dots([at([serit.x + 2.6, serit.y + 5.6, 0.6]), at([serit.x + serit.w - 2.6, serit.y + 5.6, 0.6])], { size: 0.45 }) });
  }

  // Kızaklar: her çubuğun altında, ikinci yatağın boy ile kaydığı ray (ortasında yarık, uçlarında vida)
  for (const j of [0, 1, 2]) {
    const RAY = { x: 30, y: -j * ARA - 5, w: 2 * BOY - 44, d: 10, r: 1.5 };
    const yarik = { x: RAY.x + 7, y: RAY.y + 3.4, w: RAY.w - 14, d: 3.2, r: 1.6 };
    T.kutu(`tezgah.kizak${j}`, 0, RAY, 0, RAY_H, { tone: "lo", crease: "none" }, { steps: 3, bias: 0.3, ek: Ln(k.planOutline(yarik, RAY_H, P, 4), { tone: "faint" }) + Dots([at([RAY.x + 3.4, RAY.y + 5, RAY_H]), at([RAY.x + RAY.w - 3.4, RAY.y + 5, RAY_H])], { size: 0.45 }) });
  }

  // ---- Tekne (bant 1): dört pabuç, taban, dört duvar, kapak, topuz, üç geçiş yuvası, boşaltma musluğu, etiket plakası ----
  const B = BANYO;
  const uzun = B.y1 - B.y0;
  const zD = B.ped + B.taban; // duvarların altı
  const hD = B.ust - zD;
  const GOVDE = { x: B.x0, y: B.y0, w: B.x1 - B.x0, d: uzun, r: 1 };
  for (const [i, [x, y]] of k.corners(GOVDE, 11).entries()) T.kutu(`banyo.pabuc${i}`, 1, { x: x - 8, y: y - 8, w: 16, d: 16, r: 2.5 }, 0, B.ped, { tone: "lo" }, { steps: 3 });
  T.kutu("banyo.taban", 1, GOVDE, B.ped, B.taban, { tone: "mid" }, { steps: 2 });
  const D_ARKA = { x: B.x0, y: B.y0, w: B.t, d: uzun, r: 0.5 };
  const D_ON = { x: B.x1 - B.t, y: B.y0, w: B.t, d: uzun, r: 0.5 };
  const D_UZAK = { x: B.x0 + B.t, y: B.y0, w: B.x1 - B.x0 - 2 * B.t, d: B.t, r: 0 };
  const D_YAKIN = { x: B.x0 + B.t, y: B.y1 - B.t, w: B.x1 - B.x0 - 2 * B.t, d: B.t, r: 0 };
  T.kutu("banyo.arka", 1, D_ARKA, zD, hD, { tone: "mid" }, { steps: 2 });
  T.kutu("banyo.uzak", 1, D_UZAK, zD, hD, { tone: "mid" }, { steps: 2 });
  // Su: kayıtsız, arka duvarın ardına; yalnızca açık bölmede (kapağın solunda) görünür.
  const SU = { x: B.x0 + B.t, y: B.y0 + B.t, w: B.x1 - B.x0 - 2 * B.t, d: uzun - 2 * B.t, r: 0.4 };
  T.yuvaEkle("banyo.arka", `<g class="ip-sivi" data-part="su">${S(k.slabOf(SU, zD, B.su - zD, P, 2), { tone: "mid", crease: "lo" })}</g>`);
  // Ön duvar: çubukların girdiği yüz. Rakor kalkınca altında kör delik görünür.
  const delikler = [0, 1, 2]
    .map((j) => {
      const F = G.frameOf([B.x1, -j * ARA, ZR], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
      return `<path class="il-oyuk" d="${G.circleOf(F, 0, RC[2] + 0.6, P, 28)}"/>` + Ln(G.circleOf(F, 0, RC[2] + 0.6, P, 28), { tone: "lo" }) + Ln(G.circleOf(F, 0, RC[2] + 3.4, P, 28), { tone: "faint" });
    })
    .join("");
  T.kutu("banyo.on", 1, D_ON, zD, hD, { tone: "mid" }, { steps: 2, ic: Ln(k.sideSeam(D_ON, B.ust - 3.5, P, 2), { tone: "faint" }), ek: delikler });
  T.kutu("banyo.yakin", 1, D_YAKIN, zD, hD, { tone: "mid" }, { steps: 2 });
  {
    // Etiket plakası: ön duvarda, yuva 1'in rakorunun solunda (yuva 0'ın uç termometresinin sapı önünden geçmesin)
    const y0 = -ARA + 20;
    const PL = { x: B.x1, y: y0, w: 0.8, d: 34, r: 0 };
    const satir = [0.8, 0.5, 0.66].map((oran, i) => k.segment([B.x1 + 0.8, y0 + 30.5, 27 - i * 4], [B.x1 + 0.8, y0 + 30.5 - 27 * oran, 27 - i * 4], P)).join("");
    T.kutu("banyo.plaka", 1, PL, 12, 20, { tone: "lo", crease: "none" }, { steps: 1, ek: Ln(satir, { tone: "lo", free: true }) + Dots([at([B.x1 + 0.8, y0 + 2.2, 22]), at([B.x1 + 0.8, y0 + 31.8, 22])], { size: 0.45 }) });
  }
  {
    // Boşaltma musluğu: yakın uç duvarında (+y yüzü)
    const F = G.frameOf([-30, B.y1, 15], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
    T.disk("banyo.musluk-flans", 1, F, 0, 1.8, 5.4, { tone: "mid" }, { steps: 20, ek: Dots(G.dotsOf(F, 1.8, 4.1, 4, P, { all: true, phase: 0.78 }), { size: 0.4 }) });
    T.disk("banyo.musluk-boru", 1, F, 1.8, 11, 2.8, { tone: "mid", crease: "none" }, { steps: 16 });
    T.kutu("banyo.musluk-govde", 1, { x: -33.5, y: B.y1 + 4, w: 7, d: 5, r: 1 }, 15 + 2.8, 4.4, { tone: "mid" }, { steps: 2 });
    T.kutu("banyo.musluk-kol", 1, { x: -32, y: B.y1 + 4.6, w: 14, d: 3.8, r: 1.4 }, 15 + 7.2, 2, { tone: "hi", crease: "lo" }, { steps: 3, ek: Dots([at([-30, B.y1 + 6.5, 24.2])], { size: 0.45 }) });
  }
  // Su termometresi: kapaktaki ilk geçiş yuvasından suya sarkar; kapağın altı görünmez (kırpılır).
  const zYaka = ZK + YAKA;
  const suTerm = O.termometre(T, { ad: "su.termometre", bant: 1, c: CS, zAlt: zD + 7, zOlcek: ZS0, birim: TERMO.birim, min: TERMO.min, max: TERMO.max, zUst: ZS0 + 100 * TERMO.birim + TERMO.ust, zBol: zYaka + 1, kirp: zYaka, kimlik: "il-su", rCam: TERMO.rCam, rHazne: TERMO.rHazne, rSutun: TERMO.rSutun, hazneBoy: TERMO.hazneBoy });
  {
    // Kapağın altı çizilmez (kırpılır): kayda da yalnızca görünen gövde yazılır; termometre yakanın üstünde durur.
    const item = R.items.find((o) => o.name === "su.termometre");
    for (const s of suTerm.sekiller) R.solids.splice(R.solids.indexOf(s), 1);
    const gorunen = R.solid(A.cylinder(CS[0], CS[1], TERMO.rCam, zYaka, suTerm.ust - zYaka, { name: "su.termometre" }));
    Object.assign(gorunen, { move: item.move, ride: item.ride, piece: item.piece });
    item.shapes = [gorunen];
  }
  const KAP = { x: B.x0 - 1.5, y: B.y0 - 1.5, w: B.x1 - B.x0 + 3, d: KAPAK.y1 - B.y0 + 1.5, r: 2 };
  T.kutu("banyo.kapak", 1, KAP, B.ust, KAPAK.h, { tone: "mid" }, { steps: 3, bevel: 0.6, ek: Ln(k.planOutline(k.insetPlan(KAP, 4), ZK, P, 3), { tone: "faint" }) });
  T.silindir("banyo.gecis0", 1, CS, 7.4, ZK, YAKA, { tone: "mid" }, { steps: 24, ek: Ln(k.ring(CS[0], CS[1], TERMO.rCam + 1.4, zYaka, P, 20), { tone: "lo" }) });
  for (const [i, c] of GECIS.slice(1).entries()) {
    T.silindir(`banyo.gecis${i + 1}`, 1, c, 7.4, ZK, YAKA, { tone: "mid" }, { steps: 24 });
    T.silindir(`banyo.tipa${i + 1}`, 1, c, 4.8, zYaka, 5, { tone: "hi", crease: "lo" }, { steps: 20, bevel: 0.5, ek: Ln(k.sideArc(c[0], c[1], 4.8, zYaka + 1.6, P, 12), { tone: "faint" }) });
  }
  T.silindir("banyo.topuz-sap", 1, TOPUZ, 2.4, ZK, 3, { tone: "mid", crease: "none" }, { steps: 14 });
  T.silindir("banyo.topuz", 1, TOPUZ, 6.4, ZK + 3, 5, { tone: "mid" }, { steps: 26, bevel: 0.5, ek: Ln(k.knurl(TOPUZ[0], TOPUZ[1], 6.4, ZK + 3, ZK + 8, 26, P), { tone: "lo" }) });

  // ---- Bir yuva: rakor, iki V yatak, çubuk (dört cins dokusuyla), kelepçe bloğu ve soketi, uç termometresi ----
  const termo = [];
  function yuva(j) {
    const b = 4 - j;
    const boy = boylar[j];
    const kes = kesitler[j];
    const y = -j * ARA;
    const r = RC[kes];
    const xe = boy * BOY;
    const n = (ad) => `c${j}.${ad}`;
    const F = G.frameOf([0, y, ZR], [1, 0, 0], [0, 1, 0], [0, 0, 1]);

    T.disk(n("rakor-flans"), b, F, 0, 3, r + 5.6, { tone: "mid" }, { bevel: 0.4, steps: 30, ek: Dots(G.dotsOf(F, 3, r + 4.2, 6, P, { all: true, phase: 0.5 }), { size: 0.42 }) });
    T.disk(n("rakor-somun"), b, F, 3, RAKOR, r + 2.6, { tone: "mid" }, { steps: 24, ek: k.fadedSvg(G.ribsOf(F, 3, RAKOR, r + 2.6, 12, P, { fade: [0.08, 0.5] }), { tone: "lo" }) });

    // Çubuk: tek gövde; cins yalnızca ton takımını ve dokuyu değiştirir (canlı kod sınıfı ve data-doku gruplarını yazar).
    const s0 = RAKOR;
    const iz = (acilar, ton, fade = [0.05, 0.45]) => k.fadedSvg(acilar.flatMap((aci) => G.ribsOf(F, s0 + 0.25, xe, r, 1, P, { phase: aci, fade })), { tone: ton });
    const halka = (oran, ton) => Ln(G.circleOf(F, xe, r * oran, P, 20), { tone: ton });
    const pah = Ln(G.arcOf(F, xe - 1.6, r, P), { tone: "faint" });
    const tepeAci = Math.PI / 2; // +z yönü (u = +y, v = +z)
    const doku = {
      aluminyum: iz([tepeAci - 0.5, tepeAci - 0.72], "hi", [0.02, 0.3]) + pah + halka(0.5, "faint"),
      demir: pah + Ln([0.25, 0.5, 0.75].map((o) => G.arcOf(F, s0 + (xe - s0) * o, r, P)).join(""), { tone: "faint" }),
      cam: iz([tepeAci - 0.35], "hi", [0.02, 0.3]) + iz([tepeAci - 1.5, tepeAci + 0.9], "mid", [0.02, 0.3]) + halka(0.72, "mid"),
      tahta: iz([0.15, 0.55, 0.85, 1.2, 1.5, 1.95, 2.3, 2.75, 3.3, 5.9, 5.4], "lo") + halka(0.74, "lo") + halka(0.46, "lo") + halka(0.2, "lo"),
    };
    const kusak = [xe - 25, xe - 9].map((s) => G.arcOf(F, s, r, P)).join("");
    const govde = S(G.disc(s0, xe, r, F, P, { steps: 30 }), { tone: "hi", crease: "lo", inner: Ln(G.arcOf(F, s0 + 0.25, r, P), { tone: "lo" }) + Ln(kusak, { tone: "mid" }) });
    T.koy(n("cubuk"), b, [(s0 + xe) / 2, y, ZR], `<g data-part="cubuk" class="il-demir">${govde}${CINS.map((c) => `<g data-doku="${c}"${c === "demir" ? "" : ' style="display:none"'}>${doku[c]}</g>`).join("")}</g>`, [R.solid(A.disc(F, s0, xe, r, { name: n("cubuk") }))]);

    // V yatak: taban, gövde, çubuğa 45°'de teğet iki kama
    const apex = ZR - r * Math.SQRT2;
    const zv = apex - 2.5;
    const w = r * 0.72 + 3;
    for (const [i, x0] of [46, xe - 46].entries()) {
      const TABAN = { x: x0 - 9, y: y - w - 5, w: 18, d: 2 * w + 10, r: 2 };
      T.kutu(n(`yatak${i}.taban`), b, TABAN, RAY_H, 2.5 - RAY_H, { tone: "lo" }, { steps: 3, ek: Dots([at([x0, y - w - 2.6, 2.5]), at([x0, y + w + 2.6, 2.5])], { size: 0.45 }) });
      const GV = { x: x0 - 4, y: y - w, w: 8, d: 2 * w, r: 0.8 };
      T.kutu(n(`yatak${i}.govde`), b, GV, 2.5, zv - 2.5, { tone: "mid" }, { steps: 2, bevel: 0.3 });
      const FV = G.frameOf([x0, y, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
      for (const [m, yon] of [-1, 1].entries()) prizma(n(`yatak${i}.kama${m}`), b, FV, [[0, apex], [yon * w, apex + w], [yon * w, zv], [0, zv]], -4, 4);
    }

    // Kelepçe: çubuğun üstüne oturan blok (kuşak çizgileri çubuğun üstünde), üstünde termometre soketi
    const KEL = { x: xe - 24, y: y - 7, w: 14, d: 14, r: 1.6 };
    T.kutu(n("kelepce"), b, KEL, ZR + r, ZT - ZR - r, { tone: "mid" }, { steps: 3, bevel: 0.4, ek: Dots([at([xe - 21.4, y + 4.4, ZT]), at([xe - 12.6, y - 4.4, ZT])], { size: 0.42 }) });
    const ct = [ucX(boy), y];
    T.silindir(n("soket"), b, ct, 6.2, ZT, SOKET, { tone: "mid" }, { steps: 22, bevel: 0.4, ek: Ln(k.knurl(ct[0], ct[1], 6.2, ZT, ZT + SOKET, 18, P), { tone: "lo" }) });
    const term = O.termometre(T, { ad: n("termometre"), bant: b, c: ct, zAlt: ZT + SOKET, zOlcek: zHat(ct[0], ct[1]), birim: TERMO.birim, min: TERMO.min, max: TERMO.max, kimlik: `il-t${j}b${boy}`, rCam: TERMO.rCam, rHazne: TERMO.rHazne, rSutun: TERMO.rSutun, hazneBoy: TERMO.hazneBoy });
    termo[j] = term;
  }
  [2, 1, 0].forEach(yuva);

  T.yerles();
  T.once("banyo.taban", "banyo.arka");
  T.once("banyo.arka", "su.termometre");
  T.once("banyo.arka", "banyo.on");
  T.once("banyo.arka", "banyo.yakin");
  T.once("banyo.arka", "banyo.kapak");
  // Uç termometresi yuvasının son öğesi olmalı (ders modülünde ayrı grupta, yuvanın ardına çizilir).
  const yuvaSvg = (j) => {
    const ogeler = R.items.filter((item) => item.bant === 4 - j);
    if (ogeler[ogeler.length - 1].name !== `c${j}.termometre`) throw new Error(`yuva ${j}: termometre son öğe değil (${ogeler.map((o) => o.name).join(", ")})`);
    const sar = (item) => `<g class="it" data-name="${item.name.replace(/^c\d\./, "")}">${item.svg}</g>${T.yuva.get(item.name) ?? ""}`;
    return { govde: ogeler.slice(0, -1).map(sar).join(""), termo: sar(ogeler[ogeler.length - 1]), adlar: ogeler.map((o) => o.name.replace(/^c\d\./, "")) };
  };
  return { T, tezgah, suTerm, termo, yuvaSvg, arka: () => tezgah.halo + T.katman(0) + T.katman(1) };
}

// Dört kurulum: her (boy, kesit) birleşimi yuva 0'da bir kez; boy: 1 ve boy: 2 termometreleri her yuvada.
const ANA = kurulum([1, 1, 1], [1, 1, 1]);
const UZUN = kurulum([2, 2, 2], [2, 2, 2]);
const KARMA1 = kurulum([1, 2, 1], [2, 1, 2]);
const KARMA2 = kurulum([2, 1, 2], [1, 2, 1]);
const { T } = ANA;
const { R, KS, at } = T;
{
  // Üç yuva aynı sırayla dizilmiş olmalı: yuva 1 ve 2, yuva 0'ın ekranda ötelenmiş kopyası olarak çizilir.
  for (const K of [ANA, UZUN]) {
    const a = K.yuvaSvg(0).adlar.join(",");
    for (const j of [1, 2]) if (K.yuvaSvg(j).adlar.join(",") !== a) throw new Error(`yuva ${j} ile yuva 0'ın çizim sırası ayrı`);
  }
}
const kay = (v) => [at([v[0], v[1], 0])[0] - at([0, 0, 0])[0], at([v[0], v[1], 0])[1] - at([0, 0, 0])[1]].map(r2);
const tepe = (K, j) => K.termo[j].tepe.map(r2);
const ETIKET_Y = (() => {
  // Etiket satırı: tezgâhın ön alt kenarının, yuva 0'ın uç termometresi hizasındaki yerinin biraz altı (yatay tek satır).
  const yOn = PLATE.y + PLATE.d;
  const xOn = PLATE.x + PLATE.w;
  return Math.max(at([xOn, yOn, -PLATE_H - FOOT_H])[1], at([ucX(1), yOn, -PLATE_H - FOOT_H])[1]) + 6;
})();
const ustOf = (boy, kes) => [RAKOR, (RAKOR + boy * BOY) / 2, boy * BOY].map((x) => at([x, 0, ZR + RC[kes]]).map(r2)); // baş, orta, son (üst yüz)
const D = {
  arka: ANA.arka(),
  yuva: { b1k1: ANA.yuvaSvg(0).govde, b2k2: UZUN.yuvaSvg(0).govde, b1k2: KARMA1.yuvaSvg(0).govde, b2k1: KARMA2.yuvaSvg(0).govde },
  termo: [0, 1, 2].map((j) => [ANA.yuvaSvg(j).termo, UZUN.yuvaSvg(j).termo]),
  kayma: kay([0, -ARA]),
  uz: Math.round(T.uz * 1e4) / 1e4,
  term: { min: TERMO.min, max: TERMO.max, birim: TERMO.birim },
  ilk: { cins: ["aluminyum", "demir", "tahta"], boy: 1, kesit: 1, uc: 20, gorunur: 1, su: 80 },
  nokta: {
    uc: [0, 1, 2].map((j) => [tepe(ANA, j), tepe(UZUN, j)]), // [yuva][boy − 1]: 100 °C'ta sütun tepesi
    ust: { b1k1: ustOf(1, 1), b1k2: ustOf(1, 2), b2k1: ustOf(2, 1), b2k2: ustOf(2, 2) }, // yuva 0; ötekiler kayma ile
    etiketY: r2(ETIKET_Y),
    su: ANA.suTerm.tepe.map(r2),
    suEtiket: [at([BANYO.x0 / 2, (KAPAK.y1 + BANYO.y1) / 2 + 8, 0])[0], ETIKET_Y].map(r2), // açık bölmenin (suyun göründüğü yer) hizası
    suYuzey: at([BANYO.x1, (BANYO.y0 + BANYO.y1) / 2, (BANYO.ped + BANYO.ust) / 2]).map(r2),
  },
};

// ---- Stil: dört cins yalnızca açıklık ve dokuyla ayrılır (renk yok). Sıra: paper, face, top, shade0..3, lit-top, lit-shade, hi, mid, lo, faint, lit ----
const tonlar = (t) =>
  `--anatomy-paper:${t[0]};--anatomy-face:${t[1]};--anatomy-top:${t[2]};--anatomy-shade-0:${t[3]};--anatomy-shade-1:${t[4]};--anatomy-shade-2:${t[5]};--anatomy-shade-3:${t[6]};--anatomy-lit-top:${t[7]};--anatomy-lit-shade:${t[8]};--anatomy-hi:${t[9]};--anatomy-mid:${t[10]};--anatomy-lo:${t[11]};--anatomy-faint:${t[12]};--anatomy-lit:${t[13]}`;
const TON = {
  aluminyum: {
    light: ["#f3f4f6", "#f6f7f8", "#fbfbfc", "#d8dade", "#e0e2e5", "#e7e9eb", "#eeeff1", "#ffffff", "#e9eaed", "#3d3e42", "#85878c", "#a4a6ab", "#c3c5c9", "#1a1a1d"],
    dark: ["#62656b", "#686b71", "#74777e", "#484a4f", "#4e5156", "#54575d", "#5b5e64", "#7e8188", "#63666c", "#eceef1", "#b4b7bd", "#92959b", "#787b82", "#ffffff"],
    tahta: ["#6a76a2", "#707ca8", "#8591bc", "#4c5782", "#535e8a", "#5b6692", "#626d9a", "#8f9bc6", "#707ca8", "#ffffff", "#d0d6ea", "#aab3d2", "#8a95ba", "#ffffff"],
  },
  demir: {
    light: ["#9a9ca2", "#a0a2a8", "#acaeb4", "#787a80", "#808288", "#888a90", "#909298", "#b6b8be", "#9c9ea4", "#1c1d20", "#4a4c51", "#62646a", "#7c7e84", "#000000"],
    dark: ["#232427", "#27282b", "#2e2f33", "#151618", "#18191b", "#1c1d20", "#202124", "#3a3b40", "#2a2b2f", "#b9bbc1", "#74767c", "#54565c", "#3c3e43", "#ffffff"],
    tahta: ["#1c233c", "#202742", "#27304e", "#10152a", "#131930", "#161d36", "#1a213c", "#343e66", "#232b48", "#c3cae2", "#7883a8", "#525d86", "#374068", "#ffffff"],
  },
  tahta: {
    light: ["#d3d4d7", "#d8d9dc", "#e1e2e4", "#b6b7bb", "#bebfc3", "#c6c7ca", "#cdced1", "#e6e7e9", "#d0d1d4", "#36373b", "#6e7075", "#86888d", "#a6a8ad", "#111113"],
    dark: ["#3c3d41", "#414246", "#494a4f", "#2c2d30", "#303135", "#35363a", "#393a3e", "#55565b", "#424347", "#d5d7db", "#96989e", "#7c7e84", "#5a5c61", "#ffffff"],
    tahta: ["#39436a", "#3e4870", "#46507a", "#283050", "#2c3556", "#313a5e", "#353f64", "#525c88", "#404a72", "#d9deee", "#98a2c2", "#7a86ae", "#56618e", "#ffffff"],
  },
};
const cinsCss = (kip, kok) => ["aluminyum", "demir", "tahta"].map((c) => `${kok} .il-${c}{${tonlar(TON[c][kip])}}`).join("\n");
const IL_CSS = `
.il-oyuk{fill:var(--il-oyuk);stroke:none}
.il-cam>.iso-solid>.iso-fill{fill-opacity:var(--il-cam-a,.18)}
.il-cam>.iso-solid>.iso-shade{fill-opacity:var(--il-cam-b,.4)}
.il-cam>.iso-solid>.iso-top{fill-opacity:var(--il-cam-c,.55)}
`;
const SAYFA_CSS = `${O.PARCA_CSS}${IL_CSS}${O.siviCss("sayfa")}
${cinsCss("light", ".iso")}
${cinsCss("dark", '.iso[data-theme="dark"]')}
.ip-stage{position:relative;border-radius:10px;--il-oyuk:#d2d2ce}
.iso[data-theme="dark"] .ip-stage{--il-oyuk:#0a0a0a}
.ip-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
@media (max-width:640px){.iso-plate-corner[data-corner="readout"]{font-size:9px;letter-spacing:0}}
`;
const TAHTA_CSS = `${O.kitCss()}${O.PARCA_CSS}${IL_CSS}${O.tahtaCss("ilt")}${cinsCss("tahta", ".ilt")}\n.ilt{--il-oyuk:#080c1a;--il-cam-a:.1;--il-cam-b:.26;--il-cam-c:.4}\n`;

// ---- Tek başına sayfa ----
const CIZ = O.oku(join(HERE, "ciz.js"));
const { govdeOf } = new Function(`${CIZ}\nreturn { govdeOf };`)();
const ETIKET =
  "Isı iletim düzeneği: tezgâhta kapaklı uzun bir sıcak su teknesi, kapağından suya sarkan bir termometre. Teknenin ön duvarındaki üç rakordan üç yatay çubuk çıkar; her çubuk iki V yatağın üstünde durur ve serbest ucundaki kelepçeye düşey bir termometre takılıdır. Çubukların önünde tezgâhta bir cetvel şeridi vardır.";
const svg = k.figureSvg({ width: W, height: H, label: ETIKET, body: govdeOf(D) });
const CANLI = O.oku(join(HERE, "canli.js")).replace("__DATA__", JSON.stringify({ ...D, arka: "", yuva: {}, termo: [] }));
const ad = THEME === "light" ? "iletim-light.html" : "iletim.html";
const boy = O.sayfaYaz({
  dosya: join(HERE, ad),
  tema: THEME,
  baslik: "Isı iletim düzeneği",
  sekilNo: "Şekil 5",
  ipucu: "gösteri turu",
  gosterge: "su 80 °C · uçlar 20 · 20 · 20 °C",
  anahtarlar: [
    { mark: "lit", label: "Termometre sütunu: boyu sıcaklıkla doğru orantılı (0–100 °C)" },
    { mark: "raised", label: "Üç çubuk: cinsi, boyu (1 ya da 2) ve kesiti (1 ya da 2) değişir" },
    { mark: "dim", label: "Sıcak su teknesi: ısı kaynağı suyun kendisidir" },
  ],
  aciklama:
    "Üç çubuğun birer ucu aynı sıcak suyun içindedir; ısı çubuk boyunca iletilir ve serbest uçtaki termometre yükselir. Dört termometrenin ölçeği aynıdır (0 °C ile 100 °C arası, 10 °C'ta bir çentik) ve sıfır çizgileri aynı yatay hizadadır, bu yüzden sütunların tepesi doğrudan karşılaştırılır. Cetvel şeridinde uzun çentikler 25 mm'de birdir; çubuğun boyu 150 mm ya da 300 mm'dir.",
  svg,
  css: SAYFA_CSS,
  script: CIZ + CANLI,
  genislik: 880,
  etiket: ETIKET,
});
console.log("yazıldı", ad, `${(boy / 1024).toFixed(0)} KB`, `${R.items.length} öğe`, `${R.solids.length} katı`, `ölçek ${KS.toFixed(3)}`, `ZS0 ${ZS0.toFixed(1)} birim ${TERMO.birim}`, `1 °C = ${(-T.uz * TERMO.birim).toFixed(2)} figür birimi (h 380'de ${((-T.uz * TERMO.birim * 380) / H).toFixed(2)} tahta birimi)`, `yuva aralığı ${(-D.kayma[0] === 0 ? 0 : D.kayma[0]).toFixed(0)} (${((D.kayma[0] * 380) / H).toFixed(0)} tahta)`);

// ---- Ders modülü: fizik/enerji/dersler/iletim-sekil.js (window.ILETIM) ----
{
  const ucKutu = (() => {
    const x0 = D.nokta.uc[0][0][0];
    const x2 = D.nokta.uc[2][0][0];
    const ust = D.nokta.uc[0][0][1] - 14;
    const alt = at([BOY, 0, 0])[1] + 26;
    const h = alt - ust;
    return O.kadrajOf([(x0 + x2) / 2 + 30, (ust + alt) / 2], Math.max((h * W) / H, x2 - x0 + 190), W, H);
  })();
  const kapKutu = (() => {
    const sol = at([BANYO.x0, BANYO.y1 + 12, 0])[0] - 16;
    const ust = D.nokta.su[1] - 14;
    const alt = at([BANYO.x1, BANYO.y1, 0])[1] + 34;
    const h = alt - ust;
    const w = (h * W) / H;
    return O.kadrajOf([sol + w / 2, (ust + alt) / 2], w, W, H);
  })();
  const KADRAJ = { tum: [0, 0, W, H], uclar: ucKutu, kap: kapKutu };
  const birimFig = r2(-T.uz * TERMO.birim);
  const araFig = D.kayma[0];
  const boyFig = kay([BOY, 0]);
  const tb = (v) => ((v * 380) / H).toFixed(0);
  const BASLIK = `Ş5 · Isı iletim düzeneği (izometrik figür). ÜRETİLMİŞ DOSYA: elle değiştirme.
   Kaynak: plan/fizik/enerji/sekil/s5-iletim/build.mjs ve ciz.js, ortak parçalar plan/fizik/enerji/sekil/parcalar.mjs
   (anatomy kiti, MIT; bkz. plan/fizik/enerji/sekil/kit/LICENSE). Sözleşme: plan/fizik/enerji/IZOMETRIK.md 6b.

   Ne var: tezgâhta arkada kapaklı, uzun bir sıcak su teknesi; kapağındaki geçiş yuvasından suya sarkan su termometresi (solda).
   Teknenin ön duvarındaki üç rakordan izleyiciye doğru üç yatay çubuk çıkar (yuva 0 solda ve en yakın, 2 sağda ve en uzak).
   Her çubuk iki V yatağın üstünde durur; serbest ucundaki kelepçeye düşey bir uç termometresi takılıdır. Çubuk 0'ın önünde
   tezgâhta cetvel şeridi vardır. Isı kaynağı suyun kendisidir: alev, ocak, ısıtıcı yoktur. Figürde yazı ve rakam yoktur;
   etiket, sayı ve ok dersin düz SVG katmanına yazılır ve f.nokta(ad) ile figüre bağlanır. Figür kendi başına hareket etmez:
   her değişiklik aşağıdaki çağrılarla verilir (hareket için c.tween içinde çağır). Sayfa bu dosyayı ders dosyasından önce yükler:
   <script src="dersler/iletim-sekil.js"></script>

   const f = ILETIM.kur(c, svg, { x, y, h });
       Figürü tahtaya (1000 × 562) sol üst köşesi x, y, yüksekliği h olacak biçimde koyar; genişlik h × ILETIM.oran (1,4).
       f.el kök öğe (f.el.style.opacity ile bütün figür soldurulur), f.w ve f.h tahta birimiyle boyutu.
       Kutunun altında yaklaşık ${tb(H - ETIKET_Y)} tahta birimi (h: 380 iken) boş bırakılmıştır: 'cubukN.etiket' ve 'su.etiket' yazıları oraya düşer.

   f.cubuk(i, { cins, boy, kesit, uc, gorunur })      i: 0, 1, 2. Verilmeyen alan değişmez; anında uygulanır.
       cins      'aluminyum' (en açık ton, üstünde parlak çizgi) | 'demir' (en koyu ton, düz) | 'cam' (saydam; arkası görünür,
                 kenarı ve iç çizgisi açık) | 'tahta' (orta ton, boyuna damar çizgileri, uç yüzünde halkalar). Renk yoktur.
       boy       1 ya da 2 (başka değer en yakınına yuvarlanır): çubuğun duvardan ucuna uzunluğu, ısının geçtiği kalınlık.
                 2'de çubuk iki kat uzundur; ikinci yatak, kelepçe ve uç termometresi uçla birlikte sağa ve öne kayar
                 (uç noktası ekranda ${tb(boyFig[0])} tahta birimi sağa gider; sütunun ve 0 °C çizgisinin yüksekliği değişmez: sap uzar).
       kesit     1 ya da 2: çubuğun kesiti. 2'de çap 1,6 katıdır; rakor ve yataklar buna uyar. Uç termometresi yer değiştirmez.
       uc        °C; uç termometresi. ${TERMO.min}…${TERMO.max} arası doğrusal, dışı kırpılır.
       gorunur   0…1: çubuk, yatakları, rakoru, kelepçesi ve uç termometresi birlikte solar; 0'da tümüyle kalkar (duvarda kör delik kalır).
       Başlangıç: cubuk 0 'aluminyum', 1 'demir', 2 'tahta'; hepsi { boy: 1, kesit: 1, uc: 20, gorunur: 1 }; su 80.
   f.su(C)                 su termometresi (°C, ${TERMO.min}…${TERMO.max}). Suyun görünüşü değişmez.
   f.durum(i)              çubuk i'nin şu anki ayarları ve su: { cins, boy, kesit, uc, gorunur, su }.
   Ölçek: dört termometre aynıdır. ${TERMO.min}…${TERMO.max} °C (SÖZLEŞMEDEN SAPMA: ortak –20…120 yerine; sütun derste büyük okunsun diye).
       Çentikler 10 °C'ta bir, uzun çentikler 0, 50 ve 100'de. 1 °C = ${String(birimFig).replace(".", ",")} figür birimi (h: 380 iken ${((birimFig * 380) / H).toFixed(2).replace(".", ",")} tahta birimi).
       Dört termometrenin 0 °C çizgisi ekranda aynı yatay hizadadır; boy ve kesit ne olursa olsun öyle kalır. Aynı sıcaklıktaki
       sütunların tepesi aynı y'dedir: iki 'cubukN.uc' noktası arasına yatay karşılaştırma çizgisi çekilebilir.
   f.nokta(ad) → [x, y]    tahta birimiyle, figürün o anki durumuna ve kadrajına göre:
       'cubuk0.uc', 'cubuk1.uc', 'cubuk2.uc'   uç termometresinin sütun tepesi (sıcaklıkla ve boy ile oynar; yazıyı sağına koy: x + 12, y + 7)
       'cubuk0.orta' …                          çubuğun ortası, üst yüzü (boy ve kesitle oynar)
       'cubuk0.bas', 'cubuk0.son' …             çubuğun üst yüzünde rakordan çıktığı yer ve serbest ucu (sözleşmeye ek): ısının geçtiği
                                                yol bu iki nokta arasındadır; ölçü çizgisini ikisinin 12 birim üstünden çek
       'cubuk0.etiket' …                        uç termometresinin hizasında, tezgâhın ön kenarının altı; üçü de aynı y'dedir
                                                (yazıyı text-anchor: middle ile bu noktanın 24 birim altına koy)
       'su.termometre'                          su termometresinin sütun tepesi (yazıyı sağına koy)
       'su.etiket'                              teknenin sol ucundaki açık bölmenin (suyun göründüğü yer) hizasında, etiket satırında
                                                (cubukN.etiket ile aynı y)
       'su.yuzey'                               teknenin çubukların girdiği ön duvarının ortası
       Yuvalar arası yatay uzaklık h: 380 iken ${tb(araFig)} tahta birimidir: 'cubukN.uc' sağına 24 birimlik "20 °C" sığar; etiket satırında
       yan yana iki uzun ad (örnek: "alüminyum" ile "demir", ikisi de ortalı) birbirine değebilir: gerekirse soldakini text-anchor: end yaz.
   f.gorunur(ad) → true/false   nokta şu anki kadrajın içinde mi (yakınlaşan sahnede etiketi buna göre gizle).
   f.bak(kutu)             figürün [x, y, w, h] bölgesine yaklaşır (figür birimi). Hazır kutular ILETIM.kadraj:
       tum (bütün düzenek), uclar (üç uç termometresi ve çubukların uçları, boy: 1 konumunda; yaklaşık ${(W / ucKutu[2]).toFixed(1).replace(".", ",")} kat),
       kap (teknenin sol bölümü, açık bölmedeki su, su termometresinin tamamı, yuva 0 ve 1'in rakorları; yaklaşık ${(W / kapKutu[2]).toFixed(1).replace(".", ",")} kat).
       Geçiş: c.tween(900, (e) => f.bak(a.map((v, i) => Ders.lerp(v, b[i], e))), Ders.ease.inOut). f.nokta kadrajı izler.
   ILETIM.oran             1,4 (en / boy)
   ILETIM.sabit            { min, max, birim (bir °C'ın figürdeki boyu, figür birimi), ara (yuvalar arası yatay uzaklık, figür birimi),
                             boyKayma ([dx, dy]: boy 1 → 2 olunca çubuğun ucunun figürdeki kayması), cinsler }
   Tuzaklar:
     - boy: 2 olan çubuğun uç termometresi sağdaki komşusunun termometresine ${tb(araFig - boyFig[0])} tahta birimi yaklaşır: uzun çubuğun
       sağındaki yuva boy: 1 ile görünürken iki sütunun yazıları çakışır. Uzun çubuğu sağdaki yuvası gizliyken (gorunur: 0) ya da
       yuva 2'de kullan (senaryodaki kullanım: yuva 0 kısa, yuva 1 uzun, yuva 2 gizli).
     - Uç termometresinin haznesi çubuğun üstündeki sokettedir; hazne ile ölçeğin 0 çizgisi arasındaki sap her zaman sütun rengindedir
       (yuva 0'da en uzun). Okunan şey sütunun tepesidir, sapın boyu değil.
     - Sütun tepesinin sağına yazılan değer 20 °C ve üstünde boş alana düşer; daha düşük sıcaklıkta yazı teknenin kapağının
       üstüne gelir (senaryodaki aralık 20–80 °C'tır).
     - 'gorunur' iki ayrı şeydir: f.cubuk(i, { gorunur }) çubuğu soldurur; f.gorunur(ad) bir noktanın kadrajda olup olmadığını söyler.
       Gizli çubuğun (gorunur: 0) noktaları yine hesaplanır: etiketini ders gizler (f.durum(i).gorunur ile).
     - Etiket yazıları en az 24 tahta birimi olmalı. Kırpma kimlikleri her kurulumda ayrı önek alır.`;
  const kb = O.dersModuluYaz({
    dosya: join(KOK, "fizik", "enerji", "dersler", "iletim-sekil.js"),
    ad: "ILETIM",
    sinif: "ilt",
    baslik: BASLIK,
    W,
    H,
    css: TAHTA_CSS,
    ciz: CIZ,
    veri: D,
    kadraj: KADRAJ,
    sabit: { min: TERMO.min, max: TERMO.max, birim: birimFig, ara: araFig, boyKayma: boyFig, cinsler: CINS },
  });
  console.log("yazıldı fizik/enerji/dersler/iletim-sekil.js", `${kb.toFixed(0)} KB`, "kadraj", JSON.stringify(KADRAJ));
}

if (process.argv.includes("--boyut")) {
  const boylar = R.items.map((item) => [item.name, item.svg.length + (T.yuva.get(item.name) ?? "").length]).sort((a, b) => b[1] - a[1]);
  console.log(boylar.slice(0, 24).map(([n, b]) => `${(b / 1024).toFixed(1)} ${n}`).join("\n"));
  console.log("arka", (D.arka.length / 1024).toFixed(0), "yuva", Object.values(D.yuva).map((s) => (s.length / 1024).toFixed(0)).join(" "), "termo", D.termo.flat().map((s) => (s.length / 1024).toFixed(0)).join(" "), "KB");
}
// Denetim: dört kurulumun hepsi (boy ve kesit birleşimleri) ayrı ayrı denetlenir.
if (process.argv.includes("--audit")) {
  for (const [isim, K] of [["boy 1 kesit 1", ANA], ["boy 2 kesit 2", UZUN], ["karma 1", KARMA1], ["karma 2", KARMA2]]) {
    console.log(`--- ${isim} ---`);
    A.auditOrExit(K.T.R, P);
  }
}
