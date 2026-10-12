// Ş4 · Kesit oda: geometri, kayıt, tek başına sayfa ve ders modülü.
// node build.mjs [--light] [--audit] [--az=45] [--el=38] [--pencere=0…1] [--boyut]
// Yazar: oda.html | oda-light.html (bu klasöre) ve fizik/enerji/dersler/oda-sekil.js (window.ODA).
// --pencere: kanadın denetimde kurulacağı açıklık (kanat döner; denetim her pozda ayrı çalıştırılır: 0, 0.5, 1).
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as O from "../parcalar.mjs";

const { k, G, A, tubePieces, tubeSvg } = O;
const HERE = dirname(fileURLToPath(import.meta.url));
const KOK = join(HERE, "..", "..", "..", "..", "..");
const sayi = (ad, yoksa) => {
  const bulunan = process.argv.find((a) => a.startsWith(`--${ad}=`));
  return bulunan ? Number(bulunan.split("=")[1]) : yoksa;
};
const THEME = process.argv.includes("--light") ? "light" : "dark";
const W = 780;
const H = 600; // oran 1,3 (IZOMETRIK.md 6b)
const AZ = sayi("az", 45);
const EL = sayi("el", 37);
const POZ_PENCERE = sayi("pencere", 0);

// ---- Ölçüler (yaklaşık cm; z = 0 döşemenin üstü; arka köşe başlangıçta). Sol arka duvar x = 0, sağ arka duvar y = 0 düzlemi ----
const LX = 300; // sağ arka duvarın boyu (x)
const LY = 260; // sol arka duvarın boyu (y)
const HT = 200; // duvar yüksekliği
const TW = 12; // duvar kalınlığı
const FLH = 14; // döşeme kalınlığı
const FOOT = 5;
const FL = { x: -TW, y: -TW, w: LX + TW, d: LY + TW, r: 1.5 };

const WIN = { x0: 108, x1: 198, z0: 88, z1: 178 }; // duvardaki açıklık
const KASA = { pay: 2, en: 7, kalin: 3 }; // kasa: açıklığın içine 2 taşar, duvarın iç yüzünde 3 kalın
const KANAT = { t: 2.4, bosluk: 0.3, cam: 6, acik: (82 * Math.PI) / 180, kol: [3.4, 3, 2.4, 6] };

const TERMO = { x: 236, y: 8, min: 0, max: 50, birim: 1, rCam: 4.4, rHazne: 5.5, rSutun: 2.3, hazneBoy: 9, alt: { tavan: 118, taban: 13 } };

const SOBA = { c: [52, 120], govde: { x: 30, y: 100, w: 44, d: 40, r: 6 }, z0: 12, z1: 70, tabla: 74, boru: [40, 120], rBoru: 6, zBoru: 160 };
const PETEK = { x: 5, kalin: 9, y0: 164, adim: 10, adet: 8, z0: 12, z1: 62 };
const ISITICI = { c: [255, 131], govde: { x: 236, y: 122, w: 38, d: 10, r: 2 }, z0: 4, z1: 60, on: 140, tel: [20, 32, 44], telY: 136 };
const EL_NOKTA = [255, 140 + 116, 115];
const TABURE = { c: [186, 22], r: 14, boy: 42 };

const P = k.fitProjection(
  [...k.boxCorners(FL, -FLH - FOOT, 0), [-TW, -TW, HT], [LX, -TW, HT], [-TW, LY, HT], [0, LY, HT], [LX, 0, HT]],
  W,
  H,
  { pad: 14, azimuth: AZ, elevation: EL },
);
// Bantlar: 0 kabuk (döşeme, duvarlar, süpürgelik), 1 termometreler, 2 pencere (kasa ve kanat), 3 odanın içindekiler.
const T = O.atolye(P, { bantlar: [{ piece: "sabit" }, { piece: "sabit" }, { piece: "sabit" }, { piece: "sabit" }] });
const { R, FI, KS, at, S, Ln, Dots } = T;
const { sinA, cosA } = k.cameraOf(P);
const r2 = (v) => Math.round(v * 100) / 100;
const yuz = (pts) => k.pathOf(pts.map(at), true);
const cizgi = (a, b) => k.pathOf([at(a), at(b)]);
const golge = (nx, ny) => Math.min(3, Math.max(0, Math.floor((ny * cosA - nx * sinA + 1) * 2)));
const XF = (o) => G.frameOf(o, [1, 0, 0], [0, 1, 0], [0, 0, 1]);
const YF = (o, yon = 1) => G.frameOf(o, [0, yon, 0], [1, 0, 0], [0, 0, 1]);
// Düşey bir yüzde (x sabit ya da y sabit) kapalı dikdörtgen: oluk, menfez, iç çerçeve.
const yuzDortgen = (eksen, sabit, a0, a1, z0, z1) => (eksen === "x" ? yuz([[sabit, a0, z0], [sabit, a1, z0], [sabit, a1, z1], [sabit, a0, z1]]) : yuz([[a0, sabit, z0], [a1, sabit, z0], [a1, sabit, z1], [a0, sabit, z1]]));
// Isı kaynağının kızgın yüzeyi: tabanın üstüne konan düz turuncu kopya (yuvada); saydamlığını ciz.js verir.
const isi = (oge, kim, svg) => T.yuvaEkle(oge, `<g data-isi="${kim}" style="opacity:0;display:none">${svg}</g>`);
const isiKutu = (plan, z, h, steps = 3) => S(k.slabOf(plan, z, h, P, steps), { tone: "hi", crease: "none", className: "ip-isi" });

// Boru ya da kablo: köşeleri yuvarlatılmış rota, parça parça derinlik sırasına girer.
function boru(ad, bant, noktalar, r, { bend, gaps = [], maxLength = 30, tone = "mid", limp = false, spacing } = {}) {
  const rota = G.fillet(noktalar, bend ?? r * 2.6, 8, { P, tube: r });
  R.route(ad, rota, r, { ends: [true, true], piece: "sabit", gaps, limp });
  tubePieces(rota, r, P, { maxLength, spacing: spacing ?? Math.max(0.8, r * 0.4), gaps }).forEach((parca, i) => {
    R.put({ name: `${ad}:${i}`, at: parca.mid, bias: bant * T.BANT, svg: tubeSvg(parca, { tone }), shapes: [A.tube(parca.points, parca.radii)], bant, piece: "sabit", route: ad, chunk: i });
  });
  return rota;
}

// =====================================================================================================================
// Kabuk: döşeme, iki arka duvar, süpürgelik
// =====================================================================================================================
let halo = "";
{
  const plaka = R.solid(A.slab(FL, -FLH, FLH, { name: "zemin", ground: true }, 3));
  for (const [i, [x, y]] of k.corners(FL, 13).entries()) {
    T.silindir(`zemin.flans${i}`, 0, [x, y], 9, -FLH - FOOT, 1.6, { tone: "lo" }, { steps: 22 });
    T.silindir(`zemin.ayak${i}`, 0, [x, y], 7, -FLH - FOOT + 1.6, FOOT - 1.6, { tone: "mid" }, { steps: 22, ek: Ln(k.knurl(x, y, 7, -FLH - FOOT + 1.6, -FLH, 24, P), { tone: "lo" }) });
  }
  // Kesit: kaplama, şap ve betonun ek yerleri plakanın kenarında; döşeme tahtalarının derzleri üstte.
  const kesit = Ln(k.sideSeam(FL, -2.2, P, 3) + k.sideSeam(FL, -7, P, 3), { tone: "lo" });
  const tahta = [];
  for (let x = 30; x < LX - 10; x += 30) tahta.push(k.lineOnTop([x, 0.4], [x, LY], 0, P));
  T.koy("zemin", 0, [FL.x + FL.w / 2, FL.y + FL.d / 2, -FLH / 2], S(k.slabOf(FL, -FLH, FLH, P, 3, 1.2), { tone: "lo", inner: kesit }) + Ln(tahta.join(""), { tone: "faint" }), [plaka]);
  halo = `<path class="iso-halo" d="${k.haloOf(FL, -FLH - FOOT, FLH, P)}"/>`;

  // Sol arka duvar (x = 0 düzlemi): tek blok; üst yüzünde ve kesik ucunda sıva ile tuğlanın ek çizgisi.
  const SOL = { x: -TW, y: -TW, w: TW, d: LY + TW, r: 0 };
  const ekSol = Ln(k.lineOnTop([-4, -TW], [-4, LY], HT, P) + cizgi([-4, LY, 0], [-4, LY, HT]), { tone: "lo" });
  T.kutu("duvar.sol", 0, SOL, 0, HT, { tone: "mid", crease: "lo" }, { steps: 1, ek: ekSol });

  // Sağ arka duvar (y = 0 düzlemi): pencere açıklığı olan tek parça. İç yüz, üst yüz, kesik uç; açıklığın içinde
  // sol yan yüz ve denizlik yüzü (açıklığın ekrandaki sınırıyla kırpılır).
  const { x0, x1, z0, z1 } = WIN;
  const delik = [[x0, 0, z0], [x1, 0, z0], [x1, 0, z1], [x0, 0, z1]];
  const on = yuz([[0, 0, 0], [LX, 0, 0], [LX, 0, HT], [0, 0, HT]]) + yuz(delik);
  const ust = yuz([[0, -TW, HT], [LX, -TW, HT], [LX, 0, HT], [0, 0, HT]]);
  const uc = yuz([[LX, -TW, 0], [LX, 0, 0], [LX, 0, HT], [LX, -TW, HT]]);
  const yan = yuz([[x0, -TW, z0], [x0, 0, z0], [x0, 0, z1], [x0, -TW, z1]]);
  const denizlik = yuz([[x0, -TW, z0], [x1, -TW, z0], [x1, 0, z0], [x0, 0, z0]]);
  // Açıklığın arka kenarları: lentonun ve sağ yanağın arkasına girdikleri yerde, açıklığın ekrandaki kenarında biter.
  const tanE = Math.tan((EL * Math.PI) / 180);
  const icCizgi = cizgi([x0, -TW, z0], [x0, -TW, z1 - (TW * tanE) / sinA]) + cizgi([x0, -TW, z0], [x1 - (TW * cosA) / sinA, -TW, z0]) + cizgi([x0, -TW, z0], [x0, 0, z0]);
  const kesitSag = Ln(k.lineOnTop([0, -4], [LX, -4], HT, P) + cizgi([LX, -4, 0], [LX, -4, HT]), { tone: "lo" });
  const dis = [cizgi([0, 0, 0], [LX, 0, 0]), cizgi([LX, 0, 0], [LX, -TW, 0]), cizgi([LX, -TW, 0], [LX, -TW, HT]), cizgi([LX, -TW, HT], [0, -TW, HT]), cizgi([0, -TW, HT], [0, 0, HT]), cizgi([0, 0, HT], [0, 0, 0]), yuz(delik)].join("");
  const svg =
    `<g class="iso-solid"><path class="iso-fill" fill-rule="evenodd" d="${on}"/><path class="iso-fill" d="${ust}${uc}"/>` +
    `<path class="iso-shade" data-shade="${golge(0, 1)}" fill-rule="evenodd" d="${on}"/><path class="iso-shade" data-shade="${golge(1, 0)}" d="${uc}"/><path class="iso-top" d="${ust}"/>` +
    `<clipPath id="od-delik"><path d="${yuz(delik)}"/></clipPath><g clip-path="url(#od-delik)"><path class="iso-fill" d="${yan}${denizlik}"/><path class="iso-shade" data-shade="${golge(1, 0)}" d="${yan}"/><path class="iso-top" d="${denizlik}"/><path class="iso-line" data-tone="lo" d="${icCizgi}"/></g>` +
    `<path class="iso-line iso-crease" data-tone="lo" d="${cizgi([0, 0, HT], [LX, 0, HT])}${cizgi([LX, 0, 0], [LX, 0, HT])}"/>${kesitSag}<path class="iso-line iso-edge" data-tone="mid" d="${dis}"/></g>`;
  const parca = (ad, x, w, z, h) => R.solid(A.slab({ x, y: -TW, w, d: TW, r: 0 }, z, h, { name: ad, owner: "duvar.sag" }, 1));
  T.koy("duvar.sag", 0, [LX / 2, -TW / 2, HT / 2], svg, [parca("duvar.sag", 0, x0, 0, HT), parca("duvar.sag.b", x1, LX - x1, 0, HT), parca("duvar.sag.alt", x0, x1 - x0, 0, z0), parca("duvar.sag.ust", x0, x1 - x0, z1, HT - z1)]);

  T.kutu("supurgelik.sol", 0, { x: 0, y: 0, w: 1.5, d: LY, r: 0.3 }, 0, 7, { tone: "mid" }, { steps: 1, bevel: 0.4 });
  T.kutu("supurgelik.sag", 0, { x: 1.5, y: 0, w: LX - 1.5, d: 1.5, r: 0.3 }, 0, 7, { tone: "mid" }, { steps: 1, bevel: 0.4 });
}

// Hava: odanın iç yüzlerinde (döşeme ve iki duvar) soluk bir ton; `hava` ayarıyla söner. Kayıtsız, kabuğun hemen üstünde.
const HAVA = (() => {
  const { x0, x1, z0, z1 } = WIN;
  const sag = yuz([[0, 0, 0], [LX, 0, 0], [LX, 0, HT], [0, 0, HT]]) + yuz([[x0, 0, z0], [x1, 0, z0], [x1, 0, z1], [x0, 0, z1]]);
  return `<path class="od-hava" d="${yuz([[0, 0, 0], [LX, 0, 0], [LX, LY, 0], [0, LY, 0]])}"/><path class="od-hava" d="${yuz([[0, 0, 0], [0, LY, 0], [0, LY, HT], [0, 0, HT]])}"/><path class="od-hava" fill-rule="evenodd" d="${sag}"/>`;
})();

// =====================================================================================================================
// Pencere: denizlik tahtası, kasa (iki dikme, üst başlık), iki menteşe; kanat canlı çizilir (bant 2)
// =====================================================================================================================
const KANAT_D = (() => {
  const { x0, x1, z0, z1 } = WIN;
  const { pay, en, kalin } = KASA;
  const ic = { x0: x0 + pay, x1: x1 - pay, z0: z0 + pay, z1: z1 - pay }; // kasanın iç boşluğu
  const TAHTA = { x: x0 - en - 3, y: 0, w: x1 - x0 + 2 * en + 6, d: 7, r: 0.8 };
  T.kutu("pencere.denizlik", 2, TAHTA, z0 - 3, pay + 3, { tone: "mid" }, { steps: 2, bevel: 0.5 });
  const dikme = (ad, x) => T.kutu(`pencere.${ad}`, 2, { x, y: 0, w: en, d: kalin, r: 0.4 }, ic.z0, z1 + en - pay - ic.z0, { tone: "mid" }, { steps: 1, bevel: 0.4, ek: Dots([at([x + en / 2, kalin, ic.z0 + 6]), at([x + en / 2, kalin, z1 - 4])], { size: 0.45 }) });
  dikme("dikme-sol", ic.x0 - en);
  dikme("dikme-sag", ic.x1);
  T.kutu("pencere.baslik", 2, { x: ic.x0, y: 0, w: ic.x1 - ic.x0, d: kalin, r: 0.3 }, ic.z1, en, { tone: "mid" }, { steps: 1, bevel: 0.4 });
  // Menteşeler: sol dikmenin iç kenarında iki küçük kovan.
  for (const [i, z] of [ic.z0 + 14, ic.z1 - 22].entries()) T.silindir(`pencere.mentese${i}`, 2, [ic.x0 - 1.1, kalin + 0.9], 0.9, z, 8, { tone: "hi" }, { steps: 10 });

  const b = KANAT.bosluk;
  const o = at([0, 0, 0]);
  const D = {
    p: [ic.x0, kalin - 0.2], // menteşe kenarı sol dikmeye dayanır
    w: ic.x1 - ic.x0 - b,
    t: KANAT.t,
    z0: ic.z0 + b,
    z1: ic.z1 - b,
    cam: KANAT.cam,
    acik: KANAT.acik,
    kol: KANAT.kol,
    kam: { o: o.map(r2), ex: [at([1, 0, 0])[0] - o[0], at([1, 0, 0])[1] - o[1]], ey: [at([0, 1, 0])[0] - o[0], at([0, 1, 0])[1] - o[1]], uz: T.uz, sinA, cosA },
  };
  return D;
})();
const CIZ = O.oku(join(HERE, "ciz.js"));
const { govdeOf, kanatSvg } = new Function(`${CIZ}\nreturn { govdeOf, kanatSvg };`)();
{
  // Kanat kayda build'in pozunda girer (denetim için); sayfada ve derste her açıklıkta ciz.js yeniden çizer.
  const K = KANAT_D;
  const a = POZ_PENCERE * K.acik;
  const boy = [Math.cos(a), Math.sin(a), 0];
  const dis = [Math.sin(a), -Math.cos(a), 0];
  const nokta3 = (u, v, z) => [K.p[0] + boy[0] * u + dis[0] * v, K.p[1] + boy[1] * u + dis[1] * v, z];
  const zo = (K.z0 + K.z1) / 2;
  const govde = R.solid(A.orientedBox(nokta3(K.w / 2, K.t / 2, zo), [boy, dis, [0, 0, 1]], [K.w / 2, K.t / 2, (K.z1 - K.z0) / 2], { name: "pencere.kanat" }));
  const kol = R.solid(A.orientedBox(nokta3(K.w - K.kol[0] - K.kol[1] / 2, -K.kol[2] / 2, zo), [boy, dis, [0, 0, 1]], [K.kol[1] / 2, K.kol[2] / 2, K.kol[3]], { name: "pencere.kanat.kol", owner: "pencere.kanat" }));
  T.koy("pencere.kanat", 2, nokta3(K.w / 2, K.t / 2, zo), kanatSvg(K, POZ_PENCERE), [govde, kol]);
}

// =====================================================================================================================
// Termometreler (bant 1): duvardaki plakada, altta yuva, üstte kıskaç. Gösteri termometresi: 0 … 50 °C.
// =====================================================================================================================
function termo(ad, kimlik) {
  const c = [TERMO.x, TERMO.y];
  const zAlt = TERMO.alt[ad];
  const zOlcek = zAlt + TERMO.rHazne + TERMO.hazneBoy + 5.5;
  const zMax = zOlcek + (TERMO.max - TERMO.min) * TERMO.birim;
  const kiskac = [zMax + 1.5, zMax + 5.5];
  const zUst = zMax + 8;
  const PLAKA = { x: c[0] - 10, y: 0, w: 20, d: 1.6, r: 0.5 };
  const p0 = zAlt - 4;
  const p1 = zUst + 2;
  const vida = [[c[0] - 7, p0 + 3], [c[0] + 7, p0 + 3], [c[0] - 7, p1 - 3], [c[0] + 7, p1 - 3]].map(([x, z]) => at([x, 1.6, z]));
  T.kutu(`${ad}.plaka`, 1, PLAKA, p0, p1 - p0, { tone: "hi", crease: "lo", className: "ip-metal" }, { steps: 1, ek: Ln(yuzDortgen("y", 1.6, c[0] - 8.6, c[0] + 8.6, p0 + 1.4, p1 - 1.4), { tone: "lo" }) + Dots(vida, { size: 0.5 }) });
  T.kutu(`${ad}.yuva`, 1, { x: c[0] - 6.5, y: 1.6, w: 13, d: c[1] + 6.5 - 1.6, r: 1.2 }, zAlt - 3, 3, { tone: "mid" }, { steps: 2, bevel: 0.4 });
  const term = O.termometre(T, { ad: `${ad}.termometre`, bant: 1, c, zAlt, zOlcek, birim: TERMO.birim, min: TERMO.min, max: TERMO.max, zUst, kimlik, rCam: TERMO.rCam, rHazne: TERMO.rHazne, rSutun: TERMO.rSutun, hazneBoy: TERMO.hazneBoy, kiskac });
  const oyuk = A.cylinder(c[0], c[1], TERMO.rCam, kiskac[0] - 1, kiskac[1] - kiskac[0] + 2, { name: `${ad}.kiskac-ic` });
  T.kutu(`${ad}.kiskac`, 1, { x: c[0] - 7, y: 1.6, w: 14, d: c[1] + 7 - 1.6, r: 1.6 }, kiskac[0], kiskac[1] - kiskac[0], { tone: "mid" }, { steps: 3, bevel: 0.4, ek: Ln(k.ring(c[0], c[1], TERMO.rCam + 1, kiskac[1], P, 18), { tone: "lo" }), sekil: { cut: [oyuk, ...term.sekiller] } });
  return term;
}
const TERM = { tavan: termo("tavan", "od-tv"), taban: termo("taban", "od-tb") };

// =====================================================================================================================
// Soba (bant 3): sac altlık, ayaklar, gövde, kül çekmecesi, camlı kapak, üst tabla ve kapağı, boru ve duvar rozeti
// =====================================================================================================================
{
  const b = 3;
  const { govde: GV, z0, z1, tabla } = SOBA;
  const xOn = GV.x + GV.w; // odaya bakan yüz
  const Y = (v) => v - 150 + SOBA.c[1];
  const ALT = { x: 16, y: Y(116), w: 80, d: 68, r: 4 };
  T.kutu("soba.altlik", b, ALT, 0, 0.8, { tone: "lo", crease: "none" }, { steps: 3, ek: Ln(k.planOutline(k.insetPlan(ALT, 2.4), 0.8, P, 3), { tone: "faint" }) + Dots(k.corners(ALT, 4).map(([x, y]) => at([x, y, 0.8])), { size: 0.45 }) });
  for (const [i, [x, y]] of k.corners(GV, 7).entries()) {
    T.silindir(`soba.pabuc${i}`, b, [x, y], 3.6, 0.8, 1.4, { tone: "lo" }, { steps: 14 });
    T.silindir(`soba.ayak${i}`, b, [x, y], 2.3, 2.2, z0 - 2.2, { tone: "mid", crease: "none" }, { steps: 12 });
  }
  const dikis = Ln(k.sideSeam(GV, z0 + 16, P, 4) + k.sideSeam(GV, z1 - 5, P, 4), { tone: "faint" });
  T.kutu("soba.govde", b, GV, z0, z1 - z0, { tone: "hi", crease: "lo" }, { steps: 4, ic: dikis });
  // Kül çekmecesi: menfezleri kapalı oluklardır.
  const CEK = { x: xOn, y: Y(140), w: 1.8, d: 20, r: 0.5 };
  const menfez = [Y(143.5), Y(153.5)].map((y) => yuzDortgen("x", xOn + 1.8, y, y + 3.6, z0 + 5, z0 + 11)).join("");
  T.kutu("soba.cekmece", b, CEK, z0 + 2.5, 11.5, { tone: "hi", crease: "lo" }, { steps: 1, ek: Ln(menfez, { tone: "mid" }) });
  T.disk("soba.cekmece-dugme", b, XF([xOn + 1.8, Y(150), z0 + 8]), 0, 2.4, 1.4, { tone: "mid" }, { steps: 12 });
  // Kapak: iki menteşe, cam ve tutamak.
  const KAPAK = { x: xOn, y: Y(137), w: 2.2, d: 26, r: 0.6 };
  T.kutu("soba.kapak", b, KAPAK, z0 + 18, 30, { tone: "hi", crease: "lo" }, { steps: 1, bevel: 0.3 });
  const CAM = { x: xOn + 2.2, y: Y(141), w: 0.8, d: 15, r: 0.3 };
  T.kutu("soba.kapak-cam", b, CAM, z0 + 23, 20, { tone: "hi", crease: "lo" }, { steps: 1, ek: Ln(cizgi([xOn + 3, Y(148.5), z0 + 23], [xOn + 3, Y(148.5), z0 + 43]), { tone: "lo" }) });
  isi("soba.kapak-cam", "soba", isiKutu(CAM, z0 + 23, 20, 1));
  T.disk("soba.kapak-kol", b, XF([xOn + 2.2, Y(159.5), z0 + 33]), 0, 3.4, 1.3, { tone: "mid" }, { steps: 12 });
  for (const [i, z] of [z0 + 21, z0 + 41].entries()) T.silindir(`soba.mentese${i}`, b, [xOn + 0.9, Y(136.1)], 0.9, z, 4, { tone: "mid" }, { steps: 10 });
  // Üst tabla ve yuvarlak kapağı
  const TABLA = k.insetPlan(GV, -3);
  T.kutu("soba.tabla", b, TABLA, z1, tabla - z1, { tone: "hi", crease: "lo" }, { steps: 4, bevel: 0.8 });
  isi("soba.tabla", "soba", isiKutu(TABLA, z1, tabla - z1, 4));
  const KP = [61, Y(150)];
  const kapakEk = Ln(k.ring(KP[0], KP[1], 6.4, tabla + 1.5, P, 28), { tone: "lo" });
  T.silindir("soba.tabla-kapak", b, KP, 9.5, tabla, 1.5, { tone: "hi", crease: "lo" }, { steps: 32, ek: kapakEk });
  isi("soba.tabla-kapak", "soba", S(k.cylinder(KP[0], KP[1], 9.5, tabla, 1.5, P, 32), { tone: "hi", crease: "none", className: "ip-isi" }));
  T.silindir("soba.tabla-topuz", b, KP, 1.8, tabla + 1.5, 2.8, { tone: "mid" }, { steps: 12 });
  // Boru: tabladaki bilezikten yükselir, dirsekle duvara döner, rozette biter. Düşey kolda bir ek bileziği.
  const BR = SOBA.boru;
  const zBilezik = tabla + 5;
  T.silindir("soba.boru-yaka", b, BR, SOBA.rBoru + 1.6, tabla, 5, { tone: "mid" }, { steps: 28, bevel: 0.4, ek: Ln(k.knurl(BR[0], BR[1], SOBA.rBoru + 1.6, tabla, zBilezik, 22, P), { tone: "lo" }) });
  const ROZET = XF([0, BR[1], SOBA.zBoru]);
  T.disk("soba.rozet", b, ROZET, 0, 1.8, 10.5, { tone: "mid" }, { steps: 36, bevel: 0.4, ek: Dots(G.dotsOf(ROZET, 1.8, 8.6, 4, P, { all: true, phase: 0.6 }), { size: 0.45 }) });
  const ek = 110;
  T.silindir("soba.boru-ek", b, BR, SOBA.rBoru + 0.9, ek, 4, { tone: "mid" }, { steps: 28, sekil: { owner: "soba.boru" } });
  boru("soba.boru", b, [[BR[0], BR[1], zBilezik], [BR[0], BR[1], SOBA.zBoru], [1.8, BR[1], SOBA.zBoru]], SOBA.rBoru, { bend: 16, gaps: [[ek - zBilezik, ek + 4 - zBilezik]], maxLength: 26, tone: "hi" });
}

// =====================================================================================================================
// Kalorifer peteği (bant 3): dokuz dilim, iki askı, üstte vanalı giriş, altta dönüş; borular duvara girer
// =====================================================================================================================
const DILIM = [];
const KORUMA = { svg: "" };
{
  const b = 3;
  const { x, kalin, y0, adim, adet, z0, z1 } = PETEK;
  const xo = x + kalin / 2;
  const yUc = y0 + adim * adet;
  // Askılar: duvar plakası ve dilimlerin üstüne binen kol.
  for (const [i, y] of [y0 + 1.5 * adim, yUc - 1.5 * adim].entries()) {
    T.kutu(`petek.aski-plaka${i}`, b, { x: 0, y: y - 4, w: 1.2, d: 8, r: 0.4 }, z1 - 12, 22, { tone: "mid" }, { steps: 1, ek: Dots([at([1.2, y, z1 + 7])], { size: 0.45 }) });
    T.kutu(`petek.aski-kol${i}`, b, { x: 1.2, y: y - 1.5, w: x + kalin - 2.2, d: 3, r: 0.4 }, z1, 2.5, { tone: "mid" }, { steps: 1 });
  }
  for (let i = 0; i < adet; i++) {
    const plan = { x, y: y0 + i * adim, w: kalin, d: adim, r: 2.4 };
    const ad = `petek.dilim${i}`;
    T.kutu(ad, b, plan, z0, z1 - z0, { tone: "hi", crease: "lo" }, { steps: 3, ic: Ln(k.sideSeam(plan, z1 - 4, P, 3) + k.sideSeam(plan, z0 + 4, P, 3), { tone: "faint" }) });
    isi(ad, "petek", isiKutu(plan, z0, z1 - z0, 3));
    DILIM.push(ad);
  }
  // Üst bağlantı (yakın uç): rakor, köşe vanası (küre), odaya bakan termostat başlığı, duvara düz giden boru, rozet.
  const zU = z1 - 8;
  const RV = 3;
  const yV = yUc + 3 + Math.sqrt(RV * RV - 1.9 * 1.9);
  const vana = T.bilya("petek.vana", b, [xo, yV, zU], RV, { tone: "mid" });
  T.disk("petek.rakor-ust", b, YF([xo, yUc, zU]), 0, 3, 1.9, { tone: "mid", crease: "none" }, { steps: 14, sekil: { seated: true, cut: [vana] } });
  const BF = XF([xo, yV, zU]);
  T.disk("petek.vana-boyun", b, BF, Math.sqrt(RV * RV - 1.7 * 1.7), 5, 1.7, { tone: "mid", crease: "none" }, { steps: 12, sekil: { seated: true, cut: [vana] } });
  T.disk("petek.vana-baslik", b, BF, 5, 12.5, 3.3, { tone: "hi", crease: "lo" }, { steps: 18, bevel: 0.3, ek: k.fadedSvg(G.ribsOf(BF, 5, 12.5, 3.3, 18, P, { fade: [0.08, 0.5] }), { tone: "lo" }) });
  T.disk("petek.rozet-ust", b, XF([0, yV, zU]), 0, 0.9, 3.6, { tone: "mid" }, { steps: 16 });
  boru("petek.boru-ust", b, [[xo - Math.sqrt(RV * RV - 1.6 * 1.6), yV, zU], [0.9, yV, zU]], 1.6, { maxLength: 12 });
  // Alt bağlantı (uzak uç): rakor, köşe dönüş vanası (dönüş vananın içinde olur), duvara düz giden boru, rozet.
  const zA = z0 + 8;
  const AF = YF([xo, y0, zA], -1);
  const RK = 2.8; // köşe vanasının küresi
  const yK = y0 - 3 - Math.sqrt(RK * RK - 1.9 * 1.9);
  const kure = T.bilya("petek.donus", b, [xo, yK, zA], RK, { tone: "mid" });
  T.disk("petek.rakor-alt", b, AF, 0, 3, 1.9, { tone: "mid", crease: "none" }, { steps: 14, sekil: { seated: true, cut: [kure] } });
  T.disk("petek.rozet-alt", b, XF([0, yK, zA]), 0, 0.9, 3.6, { tone: "mid" }, { steps: 16 });
  boru("petek.boru-alt", b, [[xo - Math.sqrt(RK * RK - 1.6 * 1.6), yK, zA], [0.9, yK, zA]], 1.6, { maxLength: 12 });
  // Uçlardaki kör tapalar (bağlantısız iki köşe)
  T.disk("petek.tapa-ust", b, YF([xo, y0, zU], -1), 0, 1.6, 2.2, { tone: "mid" }, { steps: 12 });
  T.disk("petek.tapa-alt", b, YF([xo, yUc, zA]), 0, 1.6, 2.2, { tone: "mid" }, { steps: 12 });
}

// =====================================================================================================================
// Elektrikli ısıtıcı (bant 3): taban, gövde, yan yanaklar, alt ve üst başlık, üç rezistans, koruma teli, tutamak, düğme, kordon, priz
// =====================================================================================================================
{
  const b = 3;
  const { govde: GV, z0, z1, on, tel, telY } = ISITICI;
  const xa = GV.x;
  const xb = GV.x + GV.w;
  const yArka = GV.y + GV.d;
  const TABAN = { x: xa - 3, y: GV.y - 2, w: GV.w + 6, d: on - GV.y + 4, r: 3 };
  T.kutu("isitici.taban", b, TABAN, 0, z0, { tone: "mid" }, { steps: 3, bevel: 0.5 });
  const yansitici = Ln(yuzDortgen("y", yArka, xa + 5.5, xb - 5.5, z0 + 8, z1 - 8), { tone: "lo" });
  T.kutu("isitici.govde", b, GV, z0, z1 - z0, { tone: "hi", crease: "lo" }, { steps: 2, bevel: 0.4, ek: yansitici });
  const YANAK = (x) => ({ x, y: yArka, w: 3, d: on - yArka, r: 0.6 });
  T.kutu("isitici.yanak-sol", b, YANAK(xa), z0, z1 - z0, { tone: "hi", crease: "lo" }, { steps: 1 });
  // Rezistanslar: seramik uçlar arasında çubuk; sargı halkaları çubuğun kesitini izler.
  for (const [i, z] of tel.entries()) {
    const F = XF([xa + 3, telY, z]);
    const boy = GV.w - 6;
    T.disk(`isitici.uc-sol${i}`, b, F, 0, 2, 2.5, { tone: "mid" }, { steps: 12 });
    const sargi = Array.from({ length: 14 }, (_, j) => G.arcOf(F, 3 + j * 2, 1.45, P)).join("");
    T.disk(`isitici.tel${i}`, b, F, 2, boy - 2, 1.45, { tone: "hi", crease: "none" }, { steps: 12, ic: Ln(sargi, { tone: "lo" }) });
    isi(`isitici.tel${i}`, "isitici", S(G.disc(2, boy - 2, 1.45, F, P, { steps: 12 }), { tone: "hi", crease: "none", className: "ip-isi" }));
    T.disk(`isitici.uc-sag${i}`, b, F, boy - 2, boy, 2.5, { tone: "mid" }, { steps: 12 });
  }
  T.kutu("isitici.yanak-sag", b, YANAK(xb - 3), z0, z1 - z0, { tone: "hi", crease: "lo" }, { steps: 1, bias: 6 });
  const BASLIK = { x: xa + 3, y: yArka, w: GV.w - 6, d: on - yArka, r: 0.3 };
  T.kutu("isitici.baslik-alt", b, BASLIK, z0, 5, { tone: "hi", crease: "lo" }, { steps: 1 });
  T.kutu("isitici.baslik-ust", b, BASLIK, z1 - 5, 5, { tone: "hi", crease: "lo" }, { steps: 1, bias: 6 });
  // Koruma teli: ön düzlemin hemen arkasında; uçları yanakların ve başlıkların altında kalır, sol uçlar yanağa kaynaklıdır.
  const yT = on - 0.5;
  const dikey = [];
  for (let x = xa + 7; x < xb - 4; x += 4) dikey.push(cizgi([x, yT, z0 + 5], [x, yT, z1 - 2]));
  const yatay = [26, 38].map((z) => cizgi([xa + 3, yT, z], [xb - 1.5, yT, z]));
  KORUMA.svg = Ln(dikey.join("") + yatay.join(""), { tone: "mid" }) + Dots([26, 38].map((z) => at([xa + 3, yT, z])), { size: 0.45 });
  // Tutamak: iki ayak ve çubuk
  const yTut = GV.y + GV.d / 2;
  for (const [i, x] of [xa + 9, xb - 9].entries()) T.silindir(`isitici.tutamak-ayak${i}`, b, [x, yTut], 1.3, z1, 3.5, { tone: "mid", crease: "none" }, { steps: 10 });
  T.disk("isitici.tutamak", b, XF([xa + 6, yTut, z1 + 3.5 + 1.3]), 0, GV.w - 12, 1.3, { tone: "mid", crease: "none" }, { steps: 12, bevel: 0.2 });
  // Açma düğmesi: odaya bakan yan yüzde
  const DF = XF([xb, GV.y + 5, z1 - 12]);
  T.disk("isitici.dugme", b, DF, 0, 3, 2.8, { tone: "mid" }, { steps: 16, bevel: 0.3, ek: k.fadedSvg(G.ribsOf(DF, 0, 3, 2.8, 16, P, { fade: [0.08, 0.5] }), { tone: "lo" }) });
  // Kordon: tabandaki kablo rakorundan döşemede duvara, oradan prize
  const xK = xb + 12;
  const zK = 2;
  T.disk("isitici.rakor", b, XF([xb + 3, GV.y + 6, zK]), 0, 2.4, 1.5, { tone: "mid" }, { steps: 10 });
  const PRIZ = { x: xK - 6, y: 0, w: 12, d: 1, r: 0.5 };
  T.kutu("priz", b, PRIZ, 24, 12, { tone: "mid" }, { steps: 1, ek: Ln(yuzDortgen("y", 1, xK - 4.6, xK + 4.6, 25.4, 34.6), { tone: "faint" }) });
  T.kutu("priz.fis", b, { x: xK - 2.6, y: 1, w: 5.2, d: 5, r: 1 }, 27.4, 5.2, { tone: "hi", crease: "lo" }, { steps: 2, bevel: 0.3 });
  boru("isitici.kordon", b, [[xK, 3.6, 27.4], [xK, 3.6, zK], [xK, GV.y + 6, zK], [xb + 5.4, GV.y + 6, zK]], 0.8, { bend: 3, maxLength: 24, limp: true, tone: "mid" });
}

// =====================================================================================================================
// Tabure (bant 3): oranın hissedilmesi için; pencerenin altında, duvarın dibinde (odanın ortası boş kalır)
// =====================================================================================================================
{
  const b = 3;
  const { c, r, boy } = TABURE;
  for (let i = 0; i < 4; i++) {
    const p = T.nokta(c, r - 4, FI + Math.PI / 4 + (i * Math.PI) / 2, 0);
    T.silindir(`tabure.pabuc${i}`, b, p, 2.4, 0, 1.2, { tone: "lo" }, { steps: 10 });
    T.silindir(`tabure.ayak${i}`, b, p, 1.6, 1.2, boy - 4 - 1.2, { tone: "mid", crease: "none" }, { steps: 10 });
  }
  T.silindir("tabure.oturak", b, c, r, boy - 4, 4, { tone: "mid" }, { steps: 40, bevel: 0.8, ic: Ln(k.sideArc(c[0], c[1], r, boy - 1.4, P, 28), { tone: "faint" }), ek: Ln(k.ring(c[0], c[1], r - 3.5, boy, P, 36), { tone: "faint" }) });
}

T.yerles();
// Kayıtsız koruma teli: en son çizilen rezistans parçasının hemen ardına; sağ yanak ve başlıklar ondan sonra çizilmeli.
{
  const adlar = [0, 1, 2].flatMap((i) => [`isitici.uc-sol${i}`, `isitici.tel${i}`, `isitici.uc-sag${i}`]);
  const enSon = adlar.reduce((a, b) => (T.sira(b) > T.sira(a) ? b : a));
  T.yuvaEkle(enSon, KORUMA.svg);
  for (const ad of ["isitici.yanak-sag", "isitici.baslik-ust"]) T.once(enSon, ad);
  T.once("isitici.govde", adlar.reduce((a, b) => (T.sira(b) < T.sira(a) ? b : a)));
}

// ---- Veri: noktalar, yollar, kadrajlar ----
const sx = (p) => at(p).map(r2);
const WXC = (WIN.x0 + WIN.x1) / 2;
// Yolun ekrandaki boyu, tahta birimiyle (h = 380 için) verilen değere gelsin diye dünya uzunluğu.
const yBoyu = Math.hypot(at([0, 1, 0])[0] - at([0, 0, 0])[0], at([0, 1, 0])[1] - at([0, 0, 0])[1]);
const ornek = (pts, n) => {
  // Köşeli yolu yay uzunluğuna göre n noktaya eşit böler.
  const yumusak = G.fillet(pts, 26, 6);
  const boy = G.pathLength(yumusak);
  return Array.from({ length: n }, (_, i) => G.pointAlong(yumusak, (boy * i) / (n - 1)));
};
const SOBA_UST = [SOBA.c[0], SOBA.c[1], SOBA.tabla];
const PETEK_ORTA = [PETEK.x + PETEK.kalin, PETEK.y0 + (PETEK.adim * PETEK.adet) / 2, (PETEK.z0 + PETEK.z1) / 2];
const ISITICI_ON = [ISITICI.c[0], ISITICI.on, 32];
const TAVAN_Z = HT - 16;
const dongu = (x0, y, zBas, xUzak, zSon) => {
  // Tek yuvarlatılmış yol; ilk 12 nokta yükselen kol ve tavan boyunca giden kol, son 12 nokta inen kol ve
  // döşemenin üstünden kaynağa dönen kol (12. nokta üst köşenin ortası).
  const tam = G.fillet([[x0, y, zBas], [x0, y, TAVAN_Z], [xUzak, y, TAVAN_Z], [xUzak, y, 20], [x0 + 36, y, 20], [x0 + 22, y, zSon]], 30, 8);
  let enYakin = 0;
  tam.forEach((p, i) => { if (Math.hypot(p[0] - xUzak, p[2] - TAVAN_Z) < Math.hypot(tam[enYakin][0] - xUzak, tam[enYakin][2] - TAVAN_Z)) enYakin = i; });
  const sA = G.pathLength(tam.slice(0, enYakin + 1));
  const L = G.pathLength(tam);
  return Array.from({ length: 24 }, (_, i) => G.pointAlong(tam, i < 12 ? (sA * i) / 12 : sA + ((L - sA) * (i - 12)) / 11));
};
const KADRAJ = (() => {
  const kutuOf = (noktalar, pay = 14) => {
    const p = noktalar.map(at);
    const xs = p.map((q) => q[0]);
    const ys = p.map((q) => q[1]);
    const x0 = Math.min(...xs) - pay, x1 = Math.max(...xs) + pay, y0 = Math.min(...ys) - pay, y1 = Math.max(...ys) + pay;
    const w = Math.max(x1 - x0, ((y1 - y0) * W) / H);
    return O.kadrajOf([(x0 + x1) / 2, (y0 + y1) / 2], w, W, H);
  };
  return { kutuOf };
})();
const DIS_BOY_TAHTA = 80; // pencere yollarının duvarın ötesindeki kısmı: `pencere` kadrajında, h = 380 iken yaklaşık bu kadar tahta birimi
// Pencere yolları duvara dik gider (ekranda sol alttan sağ üste). Üst yol açıklığın sol üst köşesinden, alt yol sağ alt
// köşesinden geçer: ekranda birbirine koşut iki yol böylece en çok ayrışır.
const GECIS = { ust: [WIN.x0 + 26, WIN.z1 - 18], alt: [WIN.x1 - 24, WIN.z0 + 18], ic: 72 };
const disUcu = (d) => [GECIS.ust[0], -TW - d, GECIS.ust[1] + 20];
const disYazi = (d) => [GECIS.ust[0] + 62, -TW - d * 0.72, HT + 34];
const pencereKutuOf = (d) =>
  KADRAJ.kutuOf([[WIN.x0 - 12, 0, 0], [WIN.x0 + 3, 92, WIN.z0], [WIN.x0 + 3, 92, WIN.z1], [TERMO.x + 16, 0, 2], [TERMO.x + 16, 0, HT], [GECIS.alt[0], GECIS.ic, GECIS.alt[1] - 34], disUcu(d), disYazi(d), [disYazi(d)[0], disYazi(d)[1], disYazi(d)[2] + 24]], 12);
const disBoyOf = (kutu) => (DIS_BOY_TAHTA * (H / 380) * (kutu[2] / W)) / yBoyu;
let pencereKutu = pencereKutuOf(70);
for (let i = 0; i < 6; i++) pencereKutu = pencereKutuOf(disBoyOf(pencereKutu));
const disBoy = disBoyOf(pencereKutu);
const YOL = {
  dongu: dongu(SOBA.c[0] + 14, SOBA.c[1], SOBA.tabla + 12, 215, 30),
  petekDongu: dongu(PETEK.x + PETEK.kalin + 7, PETEK_ORTA[1], PETEK.z1 + 10, 225, 16),
  pencereUst: ornek([[GECIS.ust[0], GECIS.ic, GECIS.ust[1] - 16], [GECIS.ust[0], 24, GECIS.ust[1]], [GECIS.ust[0], -TW, GECIS.ust[1]], disUcu(disBoy)], 8),
  pencereAlt: ornek([[GECIS.alt[0], -TW - disBoy, GECIS.alt[1] + 12], [GECIS.alt[0], -TW, GECIS.alt[1]], [GECIS.alt[0], 24, GECIS.alt[1]], [GECIS.alt[0], GECIS.ic, GECIS.alt[1] - 30]], 8),
  isima: [ISITICI_ON, EL_NOKTA],
};
const kadraj = {
  tum: [0, 0, W, H],
  soba: KADRAJ.kutuOf([[0, 78, 0], [100, 78, 0], [100, 162, 0], [0, 162, 0], [0, 120, SOBA.zBoru + 22], [SOBA.c[0] + 30, 120, SOBA.zBoru + 22]]),
  pencere: pencereKutu,
  isitici: KADRAJ.kutuOf([[230, 118, 0], [290, 118, 0], [290, 146, 0], [230, 146, 0], [255, 124, 70], [EL_NOKTA[0], EL_NOKTA[1] + 40, EL_NOKTA[2] + 40], [EL_NOKTA[0], EL_NOKTA[1] + 40, EL_NOKTA[2] - 40], [EL_NOKTA[0], EL_NOKTA[1] - 40, EL_NOKTA[2] + 40]], 18),
};

const dilimAdi = (ad) => (ad === DILIM[0] ? "petek.dilim" : ad);
const onKatman = (() => {
  // Dilimlerin kopyaları: ilk dilimin SVG'si bir kez yazılır, ötekilerin yerine işaret konur (ciz.js çoğaltır).
  const parca = (item) => `<g class="it" data-name="${item.name}">${item.svg}</g>${T.yuva.get(item.name) ?? ""}`;
  let govde = T.katman(3);
  let dilim = "";
  DILIM.forEach((ad, i) => {
    const item = R.items.find((x) => x.name === ad);
    const yazi = parca(item);
    if (!govde.includes(yazi)) throw new Error(`dilim ${ad} katmanda bulunamadı`);
    if (i === 0) dilim = yazi.replace(`data-name="${ad}"`, `data-name="${dilimAdi(ad)}"`);
    govde = govde.replace(yazi, `§${i}§`);
  });
  return { govde, dilim };
})();
const dilimKayma = (() => {
  const a = at([PETEK.x, PETEK.y0, 0]);
  const c = at([PETEK.x, PETEK.y0 + PETEK.adim, 0]);
  return [c[0] - a[0], c[1] - a[1]];
})();
// Pencere bandı: kanadın yeri işaretlenir (ciz.js canlı kanadı oraya çizer). Kanat döndükçe sıra değişmemeli:
// denizlik, sol dikme ve menteşeler kanattan önce, üst başlık ve sağ dikme kanattan sonra çizilir (her pozda denetlenir).
const pencereKatman = (() => {
  const item = R.items.find((x) => x.name === "pencere.kanat");
  const yazi = `<g class="it" data-name="pencere.kanat">${item.svg}</g>`;
  const govde = T.katman(2);
  if (!govde.includes(yazi)) throw new Error("kanat pencere katmanında bulunamadı");
  for (const ad of ["pencere.denizlik", "pencere.dikme-sol", "pencere.mentese0", "pencere.mentese1"]) T.once(ad, "pencere.kanat");
  for (const ad of ["pencere.baslik", "pencere.dikme-sag"]) T.once("pencere.kanat", ad);
  return govde.replace(yazi, "§K§");
})();
const D = {
  arka: halo + T.katman(0),
  pencere: pencereKatman,
  hava: HAVA,
  termo: T.katman(1),
  on: onKatman.govde,
  dilim: onKatman.dilim,
  kayma: dilimKayma.map((v) => Math.round(v * 1000) / 1000),
  kanat: KANAT_D,
  uz: Math.round(T.uz * 1e5) / 1e5,
  ilk: { soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1, termometre: 1 },
  isi: { soba: 1, petek: 0.5, isitici: 1 },
  term: { min: TERMO.min, max: TERMO.max, birim: TERMO.birim },
  nokta: {
    soba: sx(SOBA_UST),
    petek: sx(PETEK_ORTA),
    isitici: sx(ISITICI_ON),
    "pencere.ust": sx([WXC, 0, WIN.z1]),
    "pencere.alt": sx([WXC, 0, WIN.z0]),
    "pencere.dis": sx(disYazi(disBoy)),
    "tavan.termometre": TERM.tavan.tepe.map(r2),
    "taban.termometre": TERM.taban.tepe.map(r2),
    el: sx(EL_NOKTA),
    tavan: sx([LX / 2, LY / 2, HT]),
    taban: sx([LX / 2, LY / 2, 0]),
  },
  yol: Object.fromEntries(Object.entries(YOL).map(([ad, pts]) => [ad, pts.map(sx)])),
};

// ---- Stil ----
const OD_CSS = `
.od-hava{fill:var(--od-hava);fill-opacity:var(--od-hava-a);stroke:none}
.od-cam{fill:var(--anatomy-hi);fill-opacity:var(--od-cam-a);stroke:none}
`;
const SAYFA_CSS = `${O.PARCA_CSS}${OD_CSS}${O.siviCss("sayfa")}
.ip-stage{position:relative;border-radius:10px;--od-hava:#000;--od-hava-a:.05;--od-cam-a:.1}
.iso[data-theme="dark"] .ip-stage{--od-hava:#fff;--od-hava-a:.055;--od-cam-a:.1}
.ip-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
@media (max-width:640px){.iso-plate-corner[data-corner="readout"]{font-size:9px;letter-spacing:0}}
`;
const TAHTA_CSS = `${O.kitCss()}${O.PARCA_CSS}${OD_CSS}${O.tahtaCss("oda")}.oda{--od-hava:#9fb4ff;--od-hava-a:.14;--od-cam-a:.1}\n`;

// ---- Tek başına sayfa ----
const ETIKET =
  "Kesit oda: ön iki duvarı ve tavanı kaldırılmış bir oda maketi. Sol arka duvarın önünde borusu duvara giren bir soba ve zemine yakın bir kalorifer peteği, sağ arka duvarda içeri açılan bir pencere ile biri tavana biri tabana yakın iki termometre, döşemede kordonu prize takılı bir elektrikli ısıtıcı var.";
const svg = k.figureSvg({ width: W, height: H, label: ETIKET, body: govdeOf({ ...D, ilk: { ...D.ilk, pencere: POZ_PENCERE } }) });
const CANLI = O.oku(join(HERE, "canli.js")).replace("__DATA__", JSON.stringify({ ...D, arka: "", hava: "", termo: "", pencere: "", on: "", dilim: "" }));
const ad = THEME === "light" ? "oda-light.html" : "oda.html";
const boy = O.sayfaYaz({
  dosya: join(HERE, ad),
  tema: THEME,
  baslik: "Kesit oda",
  sekilNo: "Şekil 4",
  ipucu: "gösteri turu",
  gosterge: "tavan 18 °C · taban 18 °C",
  anahtarlar: [
    { mark: "lit", label: "Termometre sütunu (0–50 °C) ve çalışan ısı kaynağının kızgın yüzeyi" },
    { mark: "raised", label: "Soba, kalorifer peteği, elektrikli ısıtıcı, pencere" },
    { mark: "dim", label: "Odanın iç yüzlerindeki ton: hava (boşaltılınca söner)" },
  ],
  aciklama:
    "Oda bir makettir: ön iki duvarı ve tavanı yoktur. Soba ve petek sol arka duvardadır, pencere sağ arka duvarda içeri açılır. İki termometre aynı ölçektedir (0 °C ile 50 °C arası, 10 °C'ta bir çentik): biri tavana, biri tabana yakındır. Elektrikli ısıtıcının rezistansları koruma telinin arkasındadır.",
  svg,
  css: SAYFA_CSS,
  script: CIZ + CANLI,
  genislik: 820,
  etiket: ETIKET,
});
console.log("yazıldı", ad, `${(boy / 1024).toFixed(0)} KB`, `${R.items.length} öğe`, `${R.solids.length} katı`, `ölçek ${KS.toFixed(3)}`, `pencere ${POZ_PENCERE}`);

// ---- Ders modülü: fizik/enerji/dersler/oda-sekil.js (window.ODA) ----
const baslikOf = ({ zoom, derece, disTum, doluluk, odaX, elBosluk, icUst, icAlt }) => `Ş4 · Kesit oda (izometrik figür). ÜRETİLMİŞ DOSYA: elle değiştirme.
   Kaynak: plan/fizik/enerji/sekil/s4-oda/build.mjs ve ciz.js, ortak parçalar plan/fizik/enerji/sekil/parcalar.mjs
   (anatomy kiti, MIT; bkz. plan/fizik/enerji/sekil/kit/LICENSE). Sözleşme: plan/fizik/enerji/IZOMETRIK.md 6b (Ş4).

   Ne var: ön iki duvarı ve tavanı kaldırılmış bir oda maketi. Ekranda solda kalan arka duvarın önünde soba (borusu duvara girer)
   ve aynı duvarda zemine yakın kalorifer peteği; sağda kalan arka duvarda içeri açılan pencere, yanında biri tavana biri tabana
   yakın iki termometre ve bir priz; döşemede, ön sağ tarafta elektrikli ısıtıcı (rezistansları odanın ön soluna bakar); pencerenin
   altında bir tabure. Odanın ortası boştur (oklar için). Figürde yazı ve rakam yoktur; etiket, sayı ve ok dersin düz SVG katmanına
   yazılır ve f.nokta(ad) ile f.yol(ad) üzerinden figüre bağlanır. Figür kendi başına hareket etmez: her değişiklik aşağıdaki
   çağrılarla verilir (hareket için c.tween içinde çağır). Sayfa bu dosyayı ders dosyasından önce yükler:
   <script src="dersler/oda-sekil.js"></script>

   const f = ODA.kur(c, svg, { x, y, h });
       Figürü tahtaya (1000 × 562) sol üst köşesi x, y, yüksekliği h olacak biçimde koyar; genişlik h × ODA.oran (1,3).
       f.el kök öğe (f.el.style.opacity ile bütün figür soldurulur), f.w ve f.h tahta birimiyle boyutu.
       Oda kutuda ortalanmıştır: boyunu doldurur, eninin yaklaşık yüzde ${doluluk} kadarını kaplar; iki yanda boşluk kalır
       ({ x: 40, y: 110, h: 380 } için oda x ${odaX[0]}–${odaX[1]} arasındadır; kutu x 40–534). Yazıyı kutunun kenarına göre değil, f.nokta ile
       bulduğun yere göre hizala.

   f.ayar({ soba, petek, isitici, pencere, tavan, taban, hava, termometre })    Verilmeyen alan değişmez; anında uygulanır.
       soba, petek, isitici   0 kapalı, 1 çalışıyor; ara değerler yumuşak geçiştir (0 → 1 tween edilebilir). Çalışan kaynağın kızgın
                 yüzeyi turuncu olur (--c2): sobada kapak camı, üst tabla ve tabladaki yuvarlak kapak; petekte dilimler (yarı saydam,
                 soluk turuncu); ısıtıcıda üç rezistans çubuğu. Kapalıyken öteki parçalar gibi tek tonludur. Alev, duman, parlama yoktur.
       pencere   0 kapalı … 1 tam açık (82°). Kanat içeriye, sol kenarındaki menteşesi etrafında açılır; açıkken açıklığın solunda,
                 odanın içine doğru durur ve açıklığı örtmez. Yarı açıklıkta (0,5 dolayı) kanat izleyiciye yandan görünür (ince).
       tavan, taban   iki termometrenin sıcaklığı, °C. GÖSTERİ TERMOMETRESİ: ölçek ${TERMO.min} … ${TERMO.max} °C (sözleşmedeki −20 … 120 değil;
                 odadaki küçük termometrede 15–45 °C arası seçilsin diye). Sütunun boyu bu aralıkta sıcaklıkla doğru orantılıdır,
                 dışı kırpılır (0'ın altı 0, 50'nin üstü 50 görünür). Çentikler 10 °C'ta bir; 0 ve 50 uzun çentik. İki termometre
                 aynı ölçek ve boydadır. Tahtada h = 380 iken 1 °C yaklaşık ${((derece * 380) / H).toFixed(2).replace(".", ",")} tahta birimi: 18 °C ile 40 °C arası ${Math.round((22 * derece * 380) / H)} birim.
                 Senaryodaki "(°C + 20) / 140" oranı bu figür için geçerli değildir: oran (°C − 0) / 50.
       hava      1 havalı oda, 0 havası boşaltılmış. Odanın iç yüzlerindeki (döşeme ve iki duvar) soluk mavi ton hava ile söner;
                 0'da yüzeyler koyulaşır. Ara değerler yumuşaktır. Pencere açıklığı tonlanmaz (dışarısı).
       termometre  0 … 1 iki termometrenin (plakalarıyla birlikte) saydamlığı; 0'da tümüyle kalkar.
       Başlangıç: { soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1, termometre: 1 }.
   f.durum()               şu anki ayarların kopyası.
   f.nokta(ad) → [x, y]    tahta birimiyle, figürün o anki durumuna ve kadrajına göre:
       'soba'               üst tablanın ortası (borunun önü). Etiketi sağına ya da tablanın üstünde sola koy; tam üstünde boru var.
       'petek'              panelin odaya bakan yüzünün ortası. Etiketi üstüne, duvarın boş yüzüne koy (text-anchor: middle,
                            y − 45 dolayı); sağına (x + 30) konan yazı tum kadrajında sobanın altlığının üstüne düşer.
       'isitici'            rezistansların önü, koruma telinin ortası (etiket: altına ya da sağına)
       'pencere.ust', 'pencere.alt'   duvardaki açıklığın üst ve alt kenarının ortası (duvarın iç yüzünde)
       'pencere.dis'        pencerenin dışı için yazı yeri: sağ arka duvarın üst kenarının ötesinde, boşlukta. Duvarın ötesi figürde
                            duvarın arkasında kalır; "dışarı" yazısını text-anchor: middle ile buraya koy.
       'tavan.termometre', 'taban.termometre'   sütunun tepesi (sıcaklıkla oynar; yazıyı sağına koy: x + 14)
       'el'                 elektrikli ısıtıcının karşısında ${EL_NOKTA[1] - ISITICI.on} cm önünde, döşemeden ${EL_NOKTA[2]} cm yukarıda boş bir yer; figürde bir şey
                            çizilmez. Ekranda ısıtıcının solunda ve biraz üstünde, odanın ortasına yakın düşer ('taban'
                            noktasının hemen yanı). tum kadrajında ve h = 380 iken ısıtıcının sol kenarı el noktasının ${elBosluk} birim
                            sağındadır: buraya ortalanan 100 × 60 kutu ısıtıcıya ${elBosluk - 50} birim kalır; yanına bir şey daha
                            konacaksa kutuyu sola kaydır ya da isitici kadrajını kullan.
       'tavan', 'taban'     odanın ortasında tavan hizası ve döşeme (etiket için; tavan çizilmemiştir)
   f.yol(ad) → [[x, y], …]   tahta birimiyle nokta dizisi, akış yönünde sıralı; kadrajı izler (f.bak'tan sonra yeniden çağır).
                            f.yol(ad) diye çağır (f'den koparıp kullanma). Noktalar yumuşak bir eğri üstündedir; düz parçalarla
                            birleştirilebilir.
       'dongu'              24 nokta, soba için hava akımı: 0–11 sobanın üstünden yükselir ve tavan hizasında karşı yana gider
                            (sıcak kol), 12–23 karşı yanda iner ve döşemenin biraz üstünden sobanın önüne döner (soğuk kol).
                            12. nokta üst köşenin ortasıdır: sıcak kolu yol.slice(0, 13), soğuk kolu yol.slice(12) ile çiz.
                            Son nokta ilk noktaya bağlanmaz: sobanın kapağının önünde biter.
       'petekDongu'         24 nokta, aynısı petek için (peteğin üstünden yükselir, peteğin altına döner). İki döngü ayrı düşey
                            düzlemlerdedir (soba döngüsü arkada, petek döngüsü önde); ikisi de duvarların ve eşyaların önündedir.
                            Petek döngüsünün üst kolu ekranda sobanın borusunun üstünden geçer (soba arkada kalır).
       'pencereUst'         8 nokta, açıklığın üst yarısından içeriden dışarıya (ilk ${icUst} nokta odanın içinde, sonrası duvarda ve ötesinde).
                            Açıklığın sol üst köşesine yakın geçer.
       'pencereAlt'         8 nokta, açıklığın alt yarısından dışarıdan içeriye (ilk ${8 - icAlt} nokta duvarda ve ötesinde, sonrası odanın içinde).
                            Açıklığın sağ alt köşesine yakın geçer. İki yol ekranda koşuttur (sol alttan sağ üste); köşelere
                            yakın geçmeleri bu yüzdendir: ortadan geçselerdi üst üste binerlerdi.
                            Dışarıdaki kısım pencere kadrajında ve h = 380 iken yaklaşık ${DIS_BOY_TAHTA} tahta birimi, tum kadrajında ${disTum} birimdir;
                            ekranda duvarın üstüne biner (duvarın ötesi görünmez), ucu duvarın üst kenarının ötesine çıkar.
       'isima'              2 nokta: 'isitici' → 'el' (düz yol)
   f.gorunur(ad) → true/false   nokta şu anki kadrajın içinde mi. Yakınlaşınca dışarıda kalan noktanın etiketi figür kutusunun,
                           hatta tahtanın dışına düşer: f.bak ile yakınlaşan sahnede her karede etiketi buna göre gizle
                           (el.style.display = f.gorunur(ad) ? '' : 'none').
   f.bak(kutu)             figürün [x, y, w, h] bölgesine yaklaşır (figür birimi). Hazır kutular ODA.kadraj:
       tum (bütün oda), soba (soba, borusu ve duvardaki rozet; yaklaşık ${zoom("soba")} kat),
       pencere (pencere, iki termometre, 'pencere.dis' ve iki pencere yolunun tamamı; yaklaşık ${zoom("pencere")} kat),
       isitici (elektrikli ısıtıcı ve 'el' noktası birlikte; yaklaşık ${zoom("isitici")} kat; IZOMETRIK.md 6b'de yoktu, eklendi).
       Geçiş: c.tween(900, (e) => f.bak(a.map((v, i) => Ders.lerp(v, b[i], e))), Ders.ease.inOut). f.nokta ve f.yol kadrajı izler.
   ODA.oran                1,3 (en / boy)
   ODA.sabit               { min: ${TERMO.min}, max: ${TERMO.max} (termometre ölçeği, °C), birim (bir °C'ın figürdeki boyu, figür birimi),
                             elUzaklik, elYukseklik ('el' noktasının ısıtıcıya uzaklığı ve yüksekliği, cm) }
   Tuzaklar: etiket yazıları en az 24 tahta birimi olmalı (22 birim, olc.js'in 750x402 ölçümünde 12 px'in altında kalır).
   Kırpma kimlikleri her kurulumda ayrı önek alır (sahne değişince çakışmaz); aynı tahtaya iki figür kurmak denenmedi.`;
if (POZ_PENCERE === 0) {
  const tahta = (v) => Math.round((v * 380) / H); // h = 380 için tahta birimi
  const zoom = (ad) => (W / kadraj[ad][2]).toFixed(1).replace(".", ",");
  const derece = r2(-T.uz * TERMO.birim);
  const ucX = [...k.boxCorners(FL, -FLH - FOOT, 0), [-TW, LY, HT], [LX, -TW, HT]].map((p) => at(p)[0]);
  const BASLIK = baslikOf({ zoom, derece, disTum: tahta(disBoy * yBoyu), doluluk: Math.round(((Math.max(...ucX) - Math.min(...ucX)) / W) * 100), odaX: [Math.round(40 + tahta(Math.min(...ucX))), Math.round(40 + tahta(Math.max(...ucX)))], elBosluk: tahta(at([ISITICI.govde.x - 3, ISITICI.on + 2, 0])[0] - at(EL_NOKTA)[0]), icUst: YOL.pencereUst.filter((q) => q[1] > 0).length, icAlt: YOL.pencereAlt.filter((q) => q[1] > 0).length });
  const kb = O.dersModuluYaz({
    dosya: join(KOK, "fizik", "enerji", "dersler", "oda-sekil.js"),
    ad: "ODA",
    sinif: "oda",
    baslik: BASLIK,
    W,
    H,
    css: TAHTA_CSS,
    ciz: CIZ,
    veri: D,
    kadraj,
    sabit: { min: TERMO.min, max: TERMO.max, birim: derece, elUzaklik: EL_NOKTA[1] - ISITICI.on, elYukseklik: EL_NOKTA[2] },
  });
  console.log("yazıldı fizik/enerji/dersler/oda-sekil.js", `${kb.toFixed(0)} KB`);
}

if (process.argv.includes("--boyut")) {
  const boylar = R.items.map((item) => [item.name, item.svg.length + (T.yuva.get(item.name) ?? "").length]).sort((a, b) => b[1] - a[1]);
  console.log(boylar.slice(0, 24).map(([n, v]) => `${(v / 1024).toFixed(1)} ${n}`).join("\n"));
  console.log("arka", (D.arka.length / 1024).toFixed(0), "termo", (D.termo.length / 1024).toFixed(0), "on", (D.on.length / 1024).toFixed(0), "dilim", (D.dilim.length / 1024).toFixed(1), "KB");
}
A.auditOrExit(R, P);
