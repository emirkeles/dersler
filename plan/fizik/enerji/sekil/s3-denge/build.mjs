// Ş3 · Isıl denge düzeneği: geometri, kayıt, tek başına sayfa ve ders modülü.
// node build.mjs [--light] [--audit] [--poz=0] [--az=76] [--el=30] [--boyut]
// Yazar: denge.html | denge-light.html (bu klasöre) ve fizik/enerji/dersler/denge-sekil.js (window.DENGE).
// --poz=0: erlenmayer altlıkta, --poz=2: beherin sağ kenarının üstünde, havada kayda geçer (yalnızca denetim için; dosya
// yazılmaz). Varsayılan (1): beherin içinde.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as O from "../parcalar.mjs";

const { k, G, A, TAU } = O;
const HERE = dirname(fileURLToPath(import.meta.url));
const KOK = join(HERE, "..", "..", "..", "..", "..");
const sayi = (ad, yoksa) => {
  const bulunan = process.argv.find((a) => a.startsWith(`--${ad}=`));
  return bulunan ? Number(bulunan.split("=")[1]) : yoksa;
};
const THEME = process.argv.includes("--light") ? "light" : "dark";
const POZ = sayi("poz", 1);
const W = 540;
const H = 600; // oran 0,9 (IZOMETRIK.md 6b)
const AZ = sayi("az", 76);
const EL = sayi("el", 30);
const r2 = (v) => Math.round(v * 100) / 100;
const r4 = (v) => Math.round(v * 1e4) / 1e4;

// ---- Ölçüler (yaklaşık mm; z = 0 tezgâh plakasının üstü) ----
// Kaplar ve iki termometre ekranda yatay bir çizgiye dizilir: zeminde izleyiciye dik yön (SR). Aynı z'deki iki nokta
// bu çizgi üstünde ekranda aynı yüksekliğe düşer; iki sütunun tepesi böylece yatay bir çizgiyle karşılaştırılır.
const RAD = Math.PI / 180;
const SR = [Math.sin(AZ * RAD), -Math.cos(AZ * RAD)];
const boyunca = (d) => [SR[0] * d, SR[1] * d];

const BEHER = { ri: 56, ro: 57.5, boy: 66, taban: 3, dolu: 56, tavan: 64 }; // dolu: seviye 1'de sıvı boyu (erlenmayer dışarıdayken)
const IC = BEHER.taban;
const AGIZ = IC + BEHER.boy;
const ALTLIK = { r: 37, h: 3 }; // üstü beherin iç tabanıyla aynı z'de: erlenmayer iki yerde de aynı yükseklikte durur
const Z0 = IC; // erlenmayerin tabanının z'si (beherin içinde ve altlıkta)

// Erlenmayer: [tabandan yükseklik, yarıçap]. Dış yüz, iç yüz ve kayıt için kapalı kesit.
const KONI = { s0: 2, r0: 32, s1: 52, r1: 10.2 };
const EGIM = (KONI.r1 - KONI.r0) / (KONI.s1 - KONI.s0); // dr/ds
const ERLEN = { alt: 2.5, boy: 74.5, boyun: 9.5, boyunIc: 8.3, dudak: 11, dolu: 46 };
const DIS = [[0, 30.5], [KONI.s0, KONI.r0], [KONI.s1, KONI.r1], [55, ERLEN.boyun], [72, ERLEN.boyun], [73, ERLEN.dudak], [ERLEN.boy, ERLEN.dudak]];
const CEPER = 1.2 * Math.hypot(1, EGIM); // çeperin yatay kalınlığı
const icR = (s) => KONI.r0 - CEPER + EGIM * (s - KONI.s0); // koninin iç yüzü
const IC_OMUZ = KONI.s0 + (KONI.r0 - CEPER - ERLEN.boyunIc) / -EGIM;
const ICYUZ = [[ERLEN.alt, icR(ERLEN.alt)], [IC_OMUZ, ERLEN.boyunIc], [ERLEN.boy, ERLEN.boyunIc]];
const KABUK = [[0, 0], ...DIS, ...[...ICYUZ].reverse(), [ERLEN.alt, 0]];

const C_DIS = boyunca(-46); // beher termometresi
const C_IC = boyunca(20); // erlenmayerin beherin içindeki yeri
const YOL = { git: 86, kalk: AGIZ + 8 - Z0, kose: 10 }; // altlık → beher: yatay yol, kalkış, köşe yarıçapı
const C_ALT = boyunca(20 + YOL.git);
const C_ERLEN = POZ === 0 ? C_ALT : POZ === 2 ? boyunca(20 + 34) : C_IC;
const Z_ERLEN = POZ === 2 ? Z0 + YOL.kalk : Z0;
const STATIF = [C_DIS[0] - 44, C_DIS[1]];

const TERMO = { min: -20, max: 120, rCam: 3.6, rHazne: 4, rSutun: 1.9, hazneBoy: 6, altIc: 0, altDis: 1 };
const Z_OLCEK = Z0 + ERLEN.boy + 6.5; // ölçeğin –20 çizgisi: erlenmayerin ağzının üstünde; iki termometrede aynı
const PLATE = { x: -113, y: -71, w: 261, d: 138, r: 8 };
const PLATE_H = 12;
const FOOT_H = 5;

// 1 °C'ın boyu: tahtada h: 440 ile kurulunca en az 1,6 birim (figür biriminde 1,6 × H / 440). Kamera sığdırması boya
// bağlı olduğundan birim ikiye bölmeyle bulunur.
const HEDEF = (1.62 * H) / 440;
const kur = (birim) => {
  const zMax = Z_OLCEK + (TERMO.max - TERMO.min) * birim;
  const zKol = zMax + 10;
  const P = k.fitProjection(
    [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [STATIF[0], STATIF[1], zKol + 20], [C_DIS[0], C_DIS[1], zKol + 12], [C_IC[0], C_IC[1], zMax + 6], [C_ALT[0], C_ALT[1], zMax + 6]],
    W,
    H,
    { pad: 12, azimuth: AZ, elevation: EL },
  );
  return { P, zMax, zKol, boy: birim * Math.cos(EL * RAD) * G.scaleOf(P) };
};
let [alt, ust] = [1, 5];
for (let i = 0; i < 40; i++) {
  const orta = (alt + ust) / 2;
  if (kur(orta).boy < HEDEF) alt = orta;
  else ust = orta;
}
const BIRIM = Math.ceil(ust * 100) / 100;
const { P, zMax: Z_MAX, zKol: Z_KOL } = kur(BIRIM);

const T = O.atolye(P, { bantlar: [{ piece: "sabit" }, { piece: "sabit" }] });
const { R, FI, KS, at, S, Ln, Dots, nokta } = T;
const SIN_E = Math.sin(EL * RAD);
const CENTIK = [2.7, 4.3]; // kap ölçeklerinde kısa ve uzun çentiğin boyu (dünya birimi; ekranda 7 pikselin altında)
const V = G.viewOf(P);

// ---- Tezgâh (bant 0): plaka, altı ayak, cetvel şeridi, etiket plakası, erlenmayerin altlığı ----
const tezgah = O.tabanPlakasi(T, { ad: "tezgah", bant: 0, plan: PLATE, kalinlik: PLATE_H, ayakBoy: FOOT_H, cetvel: { x: 30, w: 96 }, etiket: { x: -106, y: 43, w: 38, d: 18, r: 1.5 } });
{
  const x = PLATE.x + PLATE.w / 2;
  for (const [i, y] of [PLATE.y + 24, PLATE.y + PLATE.d - 24].entries()) {
    T.silindir(`tezgah.orta-flans${i}`, 0, [x, y], 7, -PLATE_H - FOOT_H, 1.6, { tone: "lo" }, { steps: 20 });
    T.silindir(`tezgah.orta-ayak${i}`, 0, [x, y], 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, { tone: "mid" }, { steps: 20, ek: Ln(k.knurl(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, -PLATE_H, 22, P), { tone: "lo" }) });
  }
  // Mantar altlık: ince metal tabla, üstünde mantar disk; erlenmayerin oturduğu yer halka çizgisiyle belli.
  const [x0, y0] = C_ALT;
  T.silindir("altlik.tabla", 0, C_ALT, ALTLIK.r, 0, 1, { tone: "lo" }, { steps: 56 });
  T.silindir("altlik", 0, C_ALT, ALTLIK.r - 1.6, 1, ALTLIK.h - 1, { tone: "mid" }, {
    bevel: 0.5,
    steps: 56,
    ek: Ln(k.ring(x0, y0, DIS[0][1] + 1.6, ALTLIK.h, P, 56), { tone: "lo" }) + Ln(k.ring(x0, y0, 12, ALTLIK.h, P, 32), { tone: "faint" }),
  });
}

// ---- Beher, beher termometresi ve statifi (bant 1) ----
const kap = O.beher(T, { ad: "beher", bant: 1, c: [0, 0], z: 0, ri: BEHER.ri, ro: BEHER.ro, boy: BEHER.boy, taban: BEHER.taban, dolu: BEHER.dolu - 6 });
{
  // Beherin baskı ölçeği yeniden çizilir: ortak parçada çentik boyu açıyla verilmiştir, bu yarıçapta 7 pikseli aşar ve
  // çizgi denetimi iki ucunun da bir çizgide bitmesini ister. Aynı düzen, çentikler dünya biriminde sabit boyda ve düz.
  const item = R.items.find((oge) => oge.name === "beher.on");
  const s0 = FI + 0.52;
  const ro = BEHER.ro;
  const boy = BEHER.dolu - 6;
  const adim = boy / 10;
  const serit = [...Array.from({ length: 5 }, (_, i) => at(nokta([0, 0], ro, s0 + (2.1 / ro) * (i / 4), IC + boy + 3))), ...Array.from({ length: 5 }, (_, i) => at(nokta([0, 0], ro, s0 + (2.1 / ro) * (1 - i / 4), IC + 3)))];
  const kucuk = [];
  const buyuk = [];
  for (let n = 1; n <= 10; n++) (n % 5 === 0 ? buyuk : kucuk).push(T.yay3([0, 0], ro, IC + n * adim, s0, s0 - (n % 5 === 0 ? CENTIK[1] : CENTIK[0]) / ro, 1));
  item.svg = item.svg.slice(0, item.svg.indexOf("</g>") + 4) + Ln(k.pathOf(serit, true), { tone: "lo" }) + Ln(kucuk.join(""), { tone: "lo" }) + Ln(buyuk.join(""), { tone: "mid" });
}
const kiskac = [Z_KOL - 4, Z_KOL + 4];
const termDis = O.termometre(T, {
  ad: "dis.termometre", bant: 1, c: C_DIS, zAlt: IC + TERMO.altDis, zOlcek: Z_OLCEK, birim: BIRIM, min: TERMO.min, max: TERMO.max, zUst: Z_KOL + 12, zBol: AGIZ + 3, kirp: IC,
  kimlik: "dn-dis", kiskac, rCam: TERMO.rCam, rHazne: TERMO.rHazne, rSutun: TERMO.rSutun, hazneBoy: TERMO.hazneBoy,
});
O.statif(T, { ad: "statif", bant: 1, s: STATIF, c: C_DIS, zKol: Z_KOL, rTutulan: termDis.rCam, tutulan: termDis.sekiller });

// ---- Erlenmayer ve içindeki termometre (bant 1, hareketli grup): arka yarı, içerik, termometre, ön yarı ----
const ERLEN_BIAS = 900; // grup, bandın içinde ötekilerden sonra ve bir arada sıralansın
function erlenmayer(C, ZE) {
  const havada = ZE > Z0; // yalnızca denetim pozu: kap elde taşınıyor
  const F = T.ZF(C, ZE);
  const govde = G.lathe(DIS, F, P, { smooth: false, steps: 72 });
  const ustZ = ZE + ERLEN.boy;
  const N = 72;
  const acilar = Array.from({ length: N + 1 }, (_, i) => FI + (TAU * i) / N);
  // İç yüz: dışa bakan normali izleyiciden uzak olan dilimlerde içerisi görünür (koni yukarı daraldığı için yarıdan az).
  const kovalar = [[], [], [], [], []];
  for (let j = 0; j < ICYUZ.length - 1; j++) {
    const [s0, ra] = ICYUZ[j];
    const [s1, rb] = ICYUZ[j + 1];
    const boy = Math.hypot(s1 - s0, rb - ra);
    for (let i = 0; i < N; i++) {
      const orta = (acilar[i] + acilar[i + 1]) / 2;
      const ic = [(-Math.cos(orta) * (s1 - s0)) / boy, (-Math.sin(orta) * (s1 - s0)) / boy, (rb - ra) / boy];
      if (G.dot3(ic, V) <= 0.02) continue;
      const kose = [nokta(C, ra, acilar[i], ZE + s0), nokta(C, ra, acilar[i + 1], ZE + s0), nokta(C, rb, acilar[i + 1], ZE + s1), nokta(C, rb, acilar[i], ZE + s1)].map(at);
      kovalar[Math.min(3, G.toneOf(ic, P))].push(k.pathOf(kose, true));
    }
  }
  const yay = (r, z, a0, a1, n = 24) => Array.from({ length: n + 1 }, (_, i) => at(nokta(C, r, a0 + ((a1 - a0) * i) / n, z)));
  const yarimAgiz = (on) => {
    const a0 = on ? FI - Math.PI / 2 : FI + Math.PI / 2;
    return { halka: k.pathOf([...yay(ERLEN.dudak, ustZ, a0, a0 + Math.PI), ...yay(ERLEN.boyunIc, ustZ, a0 + Math.PI, a0)], true), ic: k.pathOf(yay(ERLEN.boyunIc, ustZ, a0, a0 + Math.PI)), dis: k.pathOf(yay(ERLEN.dudak, ustZ, a0, a0 + Math.PI)) };
  };
  const arkaAgiz = yarimAgiz(false);
  const onAgiz = yarimAgiz(true);
  const icTaban = k.pathOf(T.halka(C, ICYUZ[0][1], ZE + ERLEN.alt, 56), true);
  const arkaYol = { fill: govde.fill, shades: kovalar.slice(0, 4).map((b) => b.join("")), top: icTaban + arkaAgiz.halka, crease: "", outline: govde.outline + arkaAgiz.ic };
  // Ön yüzde baskı ölçek şeridi: koninin izleyiciye bakan yüzünde, kenarına köklü kısa düz çentikler (beherdeki gibi).
  const s0 = FI + 0.5;
  const disR = (s) => KONI.r0 + EGIM * (s - KONI.s0);
  const SERIT = 2.1;
  const serit = [...Array.from({ length: 7 }, (_, i) => at(nokta(C, disR(8 + i * 6), s0 + SERIT / disR(8 + i * 6), ZE + 8 + i * 6))), ...Array.from({ length: 7 }, (_, i) => at(nokta(C, disR(44 - i * 6), s0, ZE + 44 - i * 6)))];
  const centik = [];
  const uzun = [];
  for (let n = 0; n < 6; n++) {
    const s = 11 + n * 6;
    (n % 2 ? uzun : centik).push(T.yay3(C, disR(s), ZE + s, s0, s0 - (n % 2 ? CENTIK[1] : CENTIK[0]) / disR(s), 1));
  }
  const olcek = Ln(k.pathOf(serit, true), { tone: "lo" }) + Ln(centik.join(""), { tone: "lo" }) + Ln(uzun.join(""), { tone: "mid" });
  const onYol = { fill: govde.fill, shades: govde.shades, top: onAgiz.halka, crease: govde.crease, outline: govde.outline + onAgiz.ic + onAgiz.dis };

  // Kayıt: kabuğun iki yarısı (eksenden geçen, izleyiciye dik düşey düzlemle bölünür).
  const yon = [Math.cos(FI), Math.sin(FI), 0];
  const yan = [-Math.sin(FI), Math.cos(FI), 0];
  const kutu = (isaret) => A.orientedBox([C[0] + isaret * 120 * yon[0], C[1] + isaret * 120 * yon[1], ZE + 40], [yon, yan, [0, 0, 1]], [120, 200, 200], { name: "erlen.kesim" });
  const arka = R.solid(A.lathe(F, KABUK, { name: "erlen.arka", owner: "erlen", cut: [kutu(1)], ground: havada }));
  const on = R.solid(A.lathe(F, KABUK, { name: "erlen.on", owner: "erlen", cut: [kutu(-1)], ground: havada }));
  T.koy("erlen.arka", 1, nokta(C, 14, FI + Math.PI, ZE + 24), S(arkaYol, { tone: "hi", crease: "none", className: "ip-cam-ic" }), [arka], { bias: ERLEN_BIAS, grup: "erlen" });
  const term = O.termometre(T, {
    ad: "ic.termometre", bant: 1, c: C, zAlt: ZE + ERLEN.alt + TERMO.altIc, zOlcek: Z_OLCEK + ZE - Z0, birim: BIRIM, min: TERMO.min, max: TERMO.max, zUst: Z_MAX + 6 + ZE - Z0, zBol: ustZ + 3, kirp: ZE + ERLEN.alt,
    kimlik: "dn-ic", rCam: TERMO.rCam, rHazne: TERMO.rHazne, rSutun: TERMO.rSutun, hazneBoy: TERMO.hazneBoy, bias: ERLEN_BIAS,
  });
  T.koy("erlen.on", 1, nokta(C, 14, FI, ZE + 24), S(onYol, { tone: "hi", crease: "lo", className: "ip-cam", inner: olcek }), [on], { bias: ERLEN_BIAS, grup: "erlen" });

  // İçerik (kayıtsız): sıvı gövdesi tam boy çizilir, yüzeyin hizasında kırpılır; yüzey elipsi canlı kodda çizilir.
  const zs = ZE + ERLEN.alt;
  const siviBant = G.lathe([[ERLEN.alt, icR(ERLEN.alt) - 0.2], [ERLEN.alt + ERLEN.dolu, icR(ERLEN.alt + ERLEN.dolu) - 0.2]], F, P, { smooth: false, steps: 72 });
  const sivi =
    `<clipPath id="dn-ic-sivi"><path data-part="ic-kirp" d=""/></clipPath>` +
    `<g class="ip-sivi" data-part="ic-sivi-kap"><g clip-path="url(#dn-ic-sivi)">${S(siviBant, { tone: "mid", crease: "none" })}</g>` +
    `<path class="iso-top" data-part="ic-yuzey" d=""/><path class="iso-line" data-tone="mid" data-part="ic-yuzey-cizgi" d=""/>` +
    `<path class="iso-line" data-tone="mid" data-part="ic-yag" d="" style="display:none"/></g>`;
  const termoAlt = `<g class="ip-sivi" data-part="ic-alt" style="display:none">${term.altKopya}</g>`;
  T.yuvaEkle("erlen.arka", sivi + termoAlt);
  T.yuvaEkle("ic.termometre", `<g class="ip-sivi" data-part="ic-su-cizgi" style="display:none">${Ln(k.pathOf(T.yakinYay(C, term.rCam + 0.05, zs + ERLEN.dolu, 12)), { tone: "hi" })}</g>`);
  return { term, govde, taban: at([C[0], C[1], zs]), agiz: at([C[0], C[1], ustZ]) };
}
const E = erlenmayer(C_ERLEN, Z_ERLEN);

// ---- Beherin içi (kayıtsız, yuvalarda) ----
{
  const yuzey = IC + BEHER.tavan;
  const rs = BEHER.ri - 0.3;
  const yagCizgi = `<g data-part="dis-yag" style="display:none">${Ln(k.ring(0, 0, rs - 3.2, yuzey, P, 72), { tone: "mid" })}${Ln(T.yay3([0, 0], rs, yuzey - 1.8, FI - Math.PI / 2 + 0.02, FI + Math.PI / 2 - 0.02, 40), { tone: "lo" })}</g>`;
  const sivi = O.icerikSutunu(T, { kimlik: "dn-dis-sivi", parca: "dis-sivi", c: [0, 0], r: rs, z: IC, h: BEHER.tavan, ek: yagCizgi });
  T.yuvaEkle("beher.arka", sivi + `<g class="ip-sivi" data-part="dis-alt" style="display:none">${termDis.altKopya}</g>`);
  T.yuvaEkle("dis.termometre", `<g class="ip-sivi" data-part="dis-su-cizgi" style="display:none">${Ln(k.pathOf(T.yakinYay(C_DIS, termDis.rCam + 0.05, yuzey, 12)), { tone: "hi" })}</g>`);
}

T.yerles();
T.once("beher.taban", "beher.arka");
T.once("beher.arka", "dis.termometre");
T.once("dis.termometre", "beher.on");
T.once("erlen.arka", "ic.termometre");
T.once("ic.termometre", "erlen.on");
if (POZ === 1) {
  T.once("beher.arka", "erlen.arka");
  T.once("erlen.on", "beher.on");
}
// Havadayken (beherin ağzının üstünde) erlenmayer beherin ön yarısının da önündedir: canlı kod grubu en sona taşır.
if (POZ === 2) T.once("beher.on", "erlen.arka");

// ---- Gövde: erlenmayerin öğeleri tek bir hareketli grupta; ardından dış sıvının erlenmayerin önünde kalan perdesi ----
const grupta = (item) => item.name.startsWith("erlen.") || item.name.startsWith("ic.");
const ogeSvg = (item) => `<g class="it" data-name="${item.name}"${item.grup ? ` data-grup="${item.grup}"` : ""}>${item.svg}</g>${T.yuva.get(item.name) ?? ""}`;
const ilk = R.items.findIndex(grupta);
const son = R.items.length - 1 - [...R.items].reverse().findIndex(grupta);
{
  const araya = R.items.slice(ilk, son + 1).filter((item) => !grupta(item));
  if (araya.length) throw new Error(`erlenmayer grubunun arasına giren öğeler: ${araya.map((item) => item.name).join(", ")}`);
}
const PERDE =
  `<clipPath id="dn-perde"><path data-part="perde-kirp" d=""/></clipPath>` +
  `<g class="ip-sivi" data-part="perde" clip-path="url(#dn-perde)" style="display:none"><g data-part="perde-ic"><path class="dn-perde" d="${E.govde.fill}"/></g></g>` +
  `<g class="ip-sivi" data-part="erlen-cizgi-kap" style="display:none"><path class="iso-line" data-tone="hi" data-part="erlen-cizgi" d=""/></g>`;
const GOVDE =
  tezgah.halo +
  R.items.slice(0, ilk).map(ogeSvg).join("") +
  `<g data-part="erlen">${R.items.slice(ilk, son + 1).map(ogeSvg).join("")}</g><g data-part="erlen-yer"></g>` +
  PERDE +
  R.items.slice(son + 1).map(ogeSvg).join("");

// Noktalar ve canlı kodun sayıları (figür birimi). Erlenmayerin yeri, beherin içindeki yerine göre ekran ötelemesidir.
const sx = (c, z) => at([c[0], c[1], z]);
const altKenar = Math.max(...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0).map((p) => at(p)[1]));
const D = {
  govde: GOVDE,
  uz: r4(T.uz),
  ks: r4(KS),
  ke: r4(Math.tan(EL * RAD) * SIN_E), // teğet kirişin eksenden ekran uzaklığı: r · eğim · ke · ks
  ey: r4(SIN_E), // yatay çemberin ekrandaki basıklığı
  ilk: { ic: 60, dis: 20, icSeviye: 0.3, disSeviye: 0.7, icIcerik: "su", disIcerik: "su", icte: 0 },
  yol: { git: YOL.git, kalk: YOL.kalk, kose: YOL.kose, esik: AGIZ - Z0 + 0.5 },
  term: { min: TERMO.min, max: TERMO.max, birim: BIRIM, altIc: TERMO.altIc, altDis: TERMO.altDis },
  erlen: { taban: sx(C_IC, Z0 + ERLEN.alt).map(r2), dip: sx(C_IC, Z0).map(r2), r0: r2(icR(ERLEN.alt) - 0.2), egim: r4(EGIM), dolu: ERLEN.dolu, alt: ERLEN.alt, boy: ERLEN.boy, dis: DIS.map(([s, r]) => [s, r2(r)]) },
  beher: { taban: sx([0, 0], IC).map(r2), ri: BEHER.ri, dolu: BEHER.dolu, tavan: BEHER.tavan },
  nokta: {
    "dis.termometre": termDis.tepe.map(r2),
    "ic.termometre": sx(C_IC, Z_MAX).map(r2),
    "dis.kap": sx([0, 0], AGIZ).map(r2),
    "ic.kap": sx(C_IC, Z0 + ERLEN.boy).map(r2),
    "dis.etiket": [sx([0, 0], 0)[0], altKenar + 8].map(r2),
    "ic.etiket": [sx(C_ALT, 0)[0], altKenar + 8].map(r2),
  },
};

// ---- Stil ----
const DN_CSS = `
.dn-perde{fill:var(--anatomy-face);fill-opacity:.4;stroke:none}
`;
const SAYFA_CSS = `${O.PARCA_CSS}${DN_CSS}${O.siviCss("sayfa")}
.ip-stage{position:relative;border-radius:10px}
.ip-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
@media (max-width:640px){.iso-plate-corner[data-corner="readout"]{font-size:9px;letter-spacing:0}}
`;
const TAHTA_CSS = `${O.kitCss()}${O.PARCA_CSS}${DN_CSS}${O.tahtaCss("dng")}`;

const CIZ = O.oku(join(HERE, "ciz.js"));
const ETIKET =
  "Isıl denge düzeneği: bir laboratuvar tezgâhında geniş bir cam beher ve içine oturtulan konik bir cam erlenmayer. Beherdeki sıvıya statif ve kıskaçla bir termometre sarkıtılmış, erlenmayerin ağzından içine ikinci bir termometre girmiştir. Beherin yanında erlenmayerin başta durduğu mantar altlık var.";
const kutuDolu = (() => {
  const xs = k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0).map((p) => at(p)[0]);
  return Math.round(((Math.max(...xs) - Math.min(...xs)) / W) * 100);
})();

if (POZ === 1) {
  // ---- Tek başına sayfa ----
  const svg = k.figureSvg({ width: W, height: H, label: ETIKET, body: GOVDE });
  const CANLI = O.oku(join(HERE, "canli.js")).replace("__DATA__", JSON.stringify({ ...D, govde: "" }));
  const ad = THEME === "light" ? "denge-light.html" : "denge.html";
  const boy = O.sayfaYaz({
    dosya: join(HERE, ad),
    tema: THEME,
    baslik: "Isıl denge düzeneği",
    sekilNo: "Şekil 3",
    ipucu: "gösteri turu",
    gosterge: "erlenmayer 60 °C · beher 20 °C",
    anahtarlar: [
      { mark: "lit", label: "Termometre sütunu: boyu sıcaklıkla doğru orantılı" },
      { mark: "raised", label: "Erlenmayer: altlıktan kalkar, beherin içine oturur" },
      { mark: "dim", label: "Kapların içi: su ya da zeytinyağı" },
    ],
    aciklama:
      "İki termometrenin ölçeği aynıdır (−20 °C ile 120 °C arası, 10 °C'ta bir çentik) ve ikisi ekranda aynı hizadadır: sütunların tepeleri yatay bir çizgiyle karşılaştırılır. Erlenmayer beherin içine inince beherdeki sıvı yükselir. Sıcak erlenmayer soğur, beherdeki sıvı ısınır; iki sütun aynı sıcaklıkta durur.",
    svg,
    css: SAYFA_CSS,
    script: CIZ + CANLI,
    genislik: 620,
    etiket: ETIKET,
  });
  console.log("yazıldı", ad, `${(boy / 1024).toFixed(0)} KB`, `${R.items.length} öğe`, `${R.solids.length} katı`, `ölçek ${KS.toFixed(3)}`, `birim ${BIRIM}`, `1 °C = ${(BIRIM * -T.uz).toFixed(3)} figür birimi`);

  // ---- Ders modülü: fizik/enerji/dersler/denge-sekil.js (window.DENGE) ----
  const ortaX = (sx([-BEHER.ro, 0], 0)[0] + sx(C_ALT, 0)[0] + ALTLIK.r * KS) / 2;
  const ustY = sx(C_IC, Z_OLCEK + (75 - TERMO.min) * BIRIM)[1];
  const kaplarH = altKenar + 4 - ustY;
  const KADRAJ = { tum: [0, 0, W, H], kaplar: O.kadrajOf([ortaX - 6, (altKenar + 4 + ustY) / 2], (kaplarH * W) / H, W, H) };
  const fb = r2(-T.uz * BIRIM);
  const ayrik = r2(D.nokta["ic.termometre"][0] - D.nokta["dis.termometre"][0]);
  const etiketAra = r2(D.nokta["ic.etiket"][0] - D.nokta["dis.etiket"][0]);
  // Yolun icte cinsinden durakları (canlı koddaki yol ile aynı hesap) ve aktarma sırasında kutuda kalan en yüksek sütun.
  const dik = YOL.kalk - YOL.kose;
  const yay = (Math.PI * YOL.kose) / 2;
  const toplam = 2 * dik + 2 * yay + YOL.git - 2 * YOL.kose;
  const pay = (v) => (v / toplam).toFixed(2).replace(".", ",");
  const esikPay = [(AGIZ - Z0 + 0.5) / toplam, 1 - (AGIZ - Z0 + 0.5) / toplam].map((v) => v.toFixed(2).replace(".", ","));
  const tasan = Math.round(-sx(C_IC, Z_MAX + 6 + YOL.kalk)[1]);
  const kalanC = Math.floor(TERMO.min + (sx(C_IC, 0)[1] / -T.uz - YOL.kalk - Z_OLCEK) / BIRIM);
  const BASLIK = `Ş3 · Isıl denge düzeneği (izometrik figür). ÜRETİLMİŞ DOSYA: elle değiştirme.
   Kaynak: plan/fizik/enerji/sekil/s3-denge/build.mjs ve ciz.js, ortak parçalar plan/fizik/enerji/sekil/parcalar.mjs
   (anatomy kiti, MIT; bkz. plan/fizik/enerji/sekil/kit/LICENSE). Sözleşme: plan/fizik/enerji/IZOMETRIK.md 6b.

   Ne var: tezgâhta geniş bir cam beher ('dis') ve konik bir cam erlenmayer ('ic'). Beherdeki sıvıya statif ve kıskaçla bir
   termometre sarkar (solda); erlenmayerin termometresi ağzından içine girer, dibine dayanır ve erlenmayerle birlikte taşınır.
   Beherin sağında erlenmayerin başta durduğu mantar altlık var. Isıtıcı yoktur. Figürde yazı ve rakam yoktur; etiket, sayı ve ok
   dersin düz SVG katmanına yazılır ve f.nokta(ad) ile figüre bağlanır. Figür kendi başına hareket etmez: her değişiklik aşağıdaki
   çağrıyla verilir (hareket için c.tween içinde çağır). Sayfa bu dosyayı ders dosyasından önce yükler:
   <script src="dersler/denge-sekil.js"></script>

   const f = DENGE.kur(c, svg, { x, y, h });
       Figürü tahtaya (1000 × 562) sol üst köşesi x, y, yüksekliği h olacak biçimde koyar; genişlik h × DENGE.oran (0,9).
       f.el kök öğe (f.el.style.opacity ile bütün figür soldurulur), f.w ve f.h tahta birimiyle boyutu.
       Düzenek kutunun boyunu doldurur, eninin yaklaşık yüzde ${kutuDolu}'ini kaplar (ortalı); kutunun sol üst bölgesi (statifin sağı,
       termometrelerin solu) ve sağ üst bölgesi boştur. Yazıyı kutunun kenarına göre değil, f.nokta ile bulduğun yere göre hizala.

   f.ayar({ ic, dis, icSeviye, disSeviye, icIcerik, disIcerik, icte })      Verilmeyen alan değişmez; anında uygulanır.
       ic, dis             °C; erlenmayerdeki ve beherdeki termometrenin sütun boyu. ${TERMO.min}…${TERMO.max} arası doğrusal, dışı kırpılır.
                           Çentikler 10 °C'ta bir, 50'de bir uzun (uzun çentikler: 0, 50, 100). İki termometre aynı ölçektedir ve
                           ekranda aynı hizadadır: ic ile dis eşitken iki sütunun tepesi aynı y'dedir (icte 0 ve 1 iken fark 0).
       icSeviye, disSeviye 0…1 doluluk (sıvının boyu; hacim değil). Erlenmayerde 1 = ${ERLEN.dolu} mm (koninin omzuna kadar), beherde
                           1 = ${BEHER.dolu} mm (kabın boyu ${BEHER.boy} mm). 0'da kap boştur. Senaryonun eşlemesi (100 g → 0,3; 200 g → 0,5; 300 g → 0,7;
                           400 g → 0,8) iki kapta da kullanılır. disSeviye 0,2'de (50 g) erlenmayer dışarıdayken beher termometresinin
                           haznesinin tepesi sıvının hemen üstünde kalır; erlenmayer içeri girince örtülür.
       icIcerik, disIcerik 'su' | 'yag' (zeytinyağı: ayrı ton, yüzeyde ikinci çizgi). Sıcak sıvı için ayrı renk yoktur.
       icte                0…1 erlenmayerin yeri. 0: beherin sağındaki altlıkta. 1: beherin içinde, tabanına oturmuş. Arası yoludur:
                           düşey kalkar (0 → ${pay(dik)}), yuvarlak köşeyle döner, beherin üstüne gelir (${pay(dik + yay)} → ${pay(toplam - dik - yay)}), yuvarlak
                           köşeyle döner, içine iner (${pay(toplam - dik)} → 1). icte yol boyunca eşit hızla ilerler.
                           Ders yalnızca 0 → 1 (ya da 1 → 0) tween eder; Ders.ease.inOut ile 1800–2200 ms iyi durur.
                           Kabın tabanı beherin ağzının üstündeyken (icte ${esikPay[0]} … ${esikPay[1]}) erlenmayer her şeyin önünde çizilir.
                           Erlenmayer inerken beherdeki sıvı yükselir (yer değiştirme; erlenmayerin batan hacminden hesaplanır):
                           disSeviye 0,3'te düzey yaklaşık ${BEHER.dolu * 0.3 | 0} mm'den ${"" + Math.round(denge(0.3))} mm'ye, 0,7'de ${Math.round(BEHER.dolu * 0.7)} mm'den ${Math.round(denge(0.7))} mm'ye çıkar; düzey kabın
                           ağzının ${BEHER.boy - BEHER.tavan} mm altında durdurulur, taşmaz. Erlenmayerin sıvıda kalan kısmı sıvının ardında, soluk görünür.
       Başlangıç: { ic: 60, dis: 20, icSeviye: 0.3, disSeviye: 0.7, icIcerik: 'su', disIcerik: 'su', icte: 0 }.
   f.durum()               şu anki ayarlar ve beherdeki sıvının o anki boyu: { ic, dis, icSeviye, disSeviye, icIcerik, disIcerik, icte, disDuzey }.
   f.nokta(ad) → [x, y]    tahta birimiyle, figürün o anki durumuna ve kadrajına göre:
       'ic.termometre', 'dis.termometre'   sütunun tepesi (sıcaklıkla oynar; 'ic' erlenmayerle birlikte taşınır). icte: 1 iken iki
                                           termometre arası yalnızca ${ayrik} figür birimidir (h: 300'de ${Math.round((ayrik * 300) / H)}, h: 440'ta ${Math.round((ayrik * 440) / H)} tahta birimi):
                                           ortalı iki okuma yazısı ("45 °C") üst üste biner. 'dis' yazısını noktanın soluna
                                           (text-anchor: end, x − 10), 'ic' yazısını sağına (text-anchor: start, x + 10) koy.
                                           icte: 0 iken 'ic' ${r2(YOL.git * KS)} figür birimi daha sağdadır.
       'ic.kap', 'dis.kap'                 ağızların ortası ('ic.kap' erlenmayerle birlikte taşınır)
       'temas'                             erlenmayerin dış sıvıya değen yüzeyinin ortası: erlenmayerin beher termometresine bakan
                                           (sol) yanında, batan kısmın yarı yüksekliğinde. Isı okunun y'si için. Erlenmayer sıvıya
                                           değmiyorken gövdesinin sol yanının ortasıdır.
       'dis.etiket'                        beherin altı: tezgâhın ön kenarının altında, beherin ekseninin hizasında (sabit)
       'ic.etiket'                         altlığın altı: tezgâhın ön kenarının altında, altlığın ekseninin hizasında (sabit;
                                           erlenmayer beherin içine girince de yerinde kalır). İki etiket noktası aynı y'dedir ve
                                           aralarında ${etiketAra} figür birimi vardır (h: 300'de ${Math.round((etiketAra * 300) / H)} tahta birimi): iki ortalı yazı yan yana sığmaz.
                                           'dis.etiket' yazısını noktanın 24 birim altına, 'ic.etiket' yazısını 52 birim altına
                                           (ikinci satıra) koy; ikisi de text-anchor: middle.
   f.gorunur(ad) → true/false   nokta şu anki kadrajın içinde mi (f.bak ile yakınlaşan sahnede etiketi buna göre gizle).
   f.bak(kutu)             figürün [x, y, w, h] bölgesine yaklaşır (figür birimi). Hazır kutular DENGE.kadraj:
       tum (bütün düzenek), kaplar (beher, erlenmayer, altlık ve sütunların 75 °C'a kadar olan kısmı; yaklaşık ${(H / KADRAJ.kaplar[3]).toFixed(2)} kat;
       statifin tabanının sol ucu ve termometrelerin üst kısmı kadraj dışında kalır).
       Geçiş: c.tween(900, (e) => f.bak(a.map((v, i) => Ders.lerp(v, b[i], e))), Ders.ease.inOut). f.nokta kadrajı izler.
   DENGE.oran              0,9 (en / boy)
   DENGE.sabit             { min, max, birim (bir °C'ın figürdeki boyu, figür birimi: tahtada birim × h / ${H}), icDolu, disDolu, yol }
   Tuzaklar:
   - 1 °C tahtada ${fb} × h / ${H} birimdir: h: 440'ta ${r2((fb * 440) / H)}, h: 330'da ${r2((fb * 330) / H)}, h: 300'de ${r2((fb * 300) / H)} birim.
   - Aktarma sırasında (0 < icte < 1) erlenmayerin termometresi yukarı kalkar; camın boş üst ucu kutunun üst kenarını en çok
     ${tasan} figür birimi aşar ve orada kırpılır (figür kutusunun dışına çizmez). ic ${kalanC} °C'ı aşmadıkça sütunun tepesi ve
     'ic.termometre' noktası aktarma boyunca kutunun içinde kalır.
   - Etiket yazıları en az 24 tahta birimi olmalı (22 birim, olc.js'in 750x402 ölçümünde 12 px'in altında kalır).
   - Kırpma kimlikleri her kurulumda ayrı önek alır (sahne değişince çakışmaz).`;
  const kb = O.dersModuluYaz({
    dosya: join(KOK, "fizik", "enerji", "dersler", "denge-sekil.js"),
    ad: "DENGE",
    sinif: "dng",
    baslik: BASLIK,
    W,
    H,
    css: TAHTA_CSS,
    ciz: CIZ,
    veri: D,
    kadraj: KADRAJ,
    sabit: { min: TERMO.min, max: TERMO.max, birim: fb, icDolu: ERLEN.dolu, disDolu: BEHER.dolu, yol: r2(YOL.git * KS) },
  });
  console.log("yazıldı fizik/enerji/dersler/denge-sekil.js", `${kb.toFixed(0)} KB`, "kadraj", JSON.stringify(KADRAJ));
}

// Erlenmayer beherin içindeyken sıvının boyu (canlı koddaki hesabın aynısı; baş yorumdaki sayılar için).
function denge(seviye) {
  const hacim = (x) => {
    let v = 0;
    for (let i = 0; i < DIS.length - 1 && x > DIS[i][0]; i++) {
      const [s0, ra] = DIS[i];
      const [s1, rb0] = DIS[i + 1];
      const s = Math.min(x, s1);
      const rb = ra + ((rb0 - ra) * (s - s0)) / (s1 - s0 || 1);
      v += ((s - s0) / 3) * (ra * ra + ra * rb + rb * rb);
    }
    return v;
  };
  const A0 = BEHER.ri * BEHER.ri;
  const h0 = seviye * BEHER.dolu;
  let [a, b] = [h0, h0 + 60];
  for (let i = 0; i < 30; i++) {
    const m = (a + b) / 2;
    if (A0 * m - hacim(m) < A0 * h0) a = m;
    else b = m;
  }
  return Math.min(BEHER.tavan, (a + b) / 2);
}

if (process.argv.includes("--boyut")) {
  const boylar = R.items.map((item) => [item.name, item.svg.length + (T.yuva.get(item.name) ?? "").length]).sort((a, b) => b[1] - a[1]);
  console.log(boylar.slice(0, 24).map(([ad, n]) => `${(n / 1024).toFixed(1)} ${ad}`).join("\n"));
  console.log("gövde", (GOVDE.length / 1024).toFixed(0), "KB");
}
A.auditOrExit(R, P);
