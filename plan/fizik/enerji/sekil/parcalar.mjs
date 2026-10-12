// Enerji temasının izometrik figürlerinde ortak parçalar (Anatomy kiti, MIT; bkz. kit/LICENSE).
//
// KULLANIM (bir figürün build.mjs dosyasında; örnek: s2-isitma/build.mjs)
//
//   import * as O from "../parcalar.mjs";                       // O.k, O.G, O.A, O.tubePieces, O.tubeSvg kiti de verir
//   const P = O.k.fitProjection(noktalar, W, H, { pad, azimuth, elevation });
//   const T = O.atolye(P, { bantlar: [{ piece: "sabit" }, …] });   // kayıt tutucu ve çizim yardımcıları
//   O.tabanPlakasi(T, { plan, … });                             // parçalar: hepsi T'ye yazar, ölçülerini döndürür
//   const b = O.beher(T, { ad: "beher", bant: 1, c: [x, y], z });
//   const t = O.termometre(T, { ad: "termometre", bant: 1, c, zAlt, zOlcek, birim, kimlik: "f1-t" });
//   O.statif(T, { ad: "statif", bant: 1, s: [x, y], c, zKol, tutulan: t.sekil });
//   T.yuvaEkle("beher.arka", O.icerikSutunu(T, { … }));         // kayıtsız canlı içerik: adı verilen öğenin hemen ardına çizilir
//   T.yerles();                                                 // A.settle + sıralama + bant denetimi
//   const govde = T.katman(0) + T.katman(1) + …;                // bant bant SVG
//   O.sayfaYaz({ … });  O.dersModuluYaz({ … });  O.A.auditOrExit(T.R, P);
//
// KURALLAR
// - Dünya birimi yaklaşık 1 mm; z = 0 taban plakasının üst yüzü. Her parça `c` (eksenin zemindeki yeri) ve z ile konur.
// - Her yardımcı çizdiği şeyin gerçek şeklini kayda yazar (T.R); kayıtsız çizim yalnızca `yuva` içindeki canlı içeriktir
//   (sıvı, sütun, alev, ibre). Sıra elle ayarlanmaz: T.yerles() ölçer.
// - Bant: DOM sırasını sabitleyen kaba katman (0 en arkada). Bir öğe bandının dışına itilirse yerles() hata verir.
// - Düşeyde kayan içerik (sıvı düzeyi, termometre sütunu, blok boyu) tam boy çizilir, aşağı kaydırılır ve tabanında kırpılır;
//   sayfa ve ders modülü yalnızca `translate(0 dz·uz)` yazar (T.uz: bir birim z'nin ekrandaki dy'si, eksi sayı).
// - Aynı parçadan iki tane kurulacaksa `kimlik` (kırpma kimliği öneki) ayrı verilir. Yalnızca ötelenmiş bir kopya gerekiyorsa
//   (s2-isitma'daki ikinci istasyon) parça bir kez çizilir, SVG'si translate ile ikinci kez konur: izometrik izdüşümde
//   dünya ötelemesi ekran ötelemesidir.
// - Ders modülünde kit gömülmez: canlı çizim (ciz.js) yalnızca derlemede hesaplanmış sayıları kullanır.
// - Ton takımları (siviCss, tahtaCss): .ip-sivi (su; data-sivi="yag" | "mum" ile zeytinyağı ve erimiş mum), .ip-kati (erimemiş
//   bal mumu gibi opak katı), .ip-buz (buz parçası; yalnızca tahtada tanımlı), .ip-metal (metal blok), .ip-sutun (termometre
//   sütunu ve haznesi), .ip-isi (ısı kaynağının kızgın yüzeyi ve alev: düz dolgu; path'e ya da iso-solid grubuna verilir,
//   iç koni için .ip-isi-ic, çevre çizgisi için .ip-isi-cizgi).
// - Renk: tek başına sayfada (açık ve koyu tema) figür tek tonludur; sütun ve .ip-isi `lit` tonundadır. Tahtada (tahtaCss)
//   figürün gövdesi yine tek tonludur, ama üç konu rengi projenin renk rollerinden gelir: termometre sütunu ve haznesi sarı
//   (--c5), su mavi (--c1; dolgu tahtayla yüzde 30 dolayında karışır, yüzey çizgisi tam mavi), ısı kaynağı ve alev turuncu
//   (--c2, .ip-isi). Zeytinyağı sıcak soluk bir ton (#d9c98a), erimiş mum açık krem, katı mum ve buz açık ve opaktır.
//   Renkler değişkenle gelir (--ip-sutun, --ip-sutun-kalin, --ip-isi, --ip-isi-ic, --ip-isi-cizgi): bir figürün sayfası
//   bunları kendi kökünde ezebilir (Ş2'nin tek başına sayfası alevi eski soluk tonunda tutar).
// - Boyut: küçük silindir ve disklerde adım sayısını düşük tut (T.adimSay; T.disk `steps` alır). Ş2'de iki istasyon ve
//   131 katı 253 KB tuttu; sınır 300 KB (dersModuluYaz aşılırsa hata verir). `node build.mjs --boyut` öğe öğe döker.
// - Ders modülünün ortak arayüzü (dersModuluYaz): kur, f.el, f.w, f.h, f.bak(kutu), f.nokta(ad), f.gorunur(ad); gerisi
//   figürün ciz.js dosyasındaki `arayuz` nesnesinden gelir.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";
import * as G from "./kit/lathe.mjs";
import { tubePieces, tubeSvg } from "./kit/tube.mjs";
import * as A from "./kit/audit.mjs";

export { k, G, A, tubePieces, tubeSvg };
export const TAU = Math.PI * 2;
const BURASI = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------------------------------------------------
// Atölye: izdüşüme bağlı yardımcılar ve kayıt tutucu
// ---------------------------------------------------------------------------------------------------------------------
export function atolye(P, { bantlar = [{ piece: "sabit" }], BANT = 4000 } = {}) {
  const R = A.recorder(P);
  const KS = G.scaleOf(P);
  const [vx, vy] = k.towardViewer(P);
  const FI = Math.atan2(vy, vx); // zeminde izleyiciye bakan yön
  const EL = ((P.elevation ?? 30) * Math.PI) / 180;
  const at = (p) => k.iso(p, P);
  const S = (paths, style) => k.solidSvg(paths, style);
  const Ln = (d, style) => k.lineSvg(d, style);
  const Dots = (points, style) => k.dotsSvg(points, style);
  const ZF = (c, z = 0) => G.frameOf([c[0], c[1], z], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
  const nokta = (c, r, aci, z) => [c[0] + r * Math.cos(aci), c[1] + r * Math.sin(aci), z];
  const adimSay = (r) => Math.max(12, Math.min(72, Math.round(r * KS * 2)));
  const yay3 = (c, r, z, a0, a1, n = 12) => k.pathOf(Array.from({ length: n + 1 }, (_, i) => at(nokta(c, r, a0 + ((a1 - a0) * i) / n, z))));
  const halka = (c, r, z, n = 48) => Array.from({ length: n }, (_, i) => at(nokta(c, r, (i / n) * TAU, z)));
  // Düşey bir gövdenin z düzleminin üstünde (dz > 0) kalan kısmının ekrandaki bölgesi: kırpma yolu.
  const sutun = (c, r, z, dz = 600) => k.pathOf(G.hullOf([...halka(c, r, z), ...halka(c, r, z + dz)]), true);
  const yakinYay = (c, r, z, n = 32) => Array.from({ length: n + 1 }, (_, i) => at(nokta(c, r, FI - Math.PI / 2 + (Math.PI * i) / n, z)));
  const uz = at([0, 0, 1])[1] - at([0, 0, 0])[1];

  function koy(ad, bant, ref, svg, shapes, { bias = 0, grup = "" } = {}) {
    return R.put({ name: ad, at: ref, bias: bant * BANT + bias, svg, shapes, bant, grup, ...bantlar[bant] });
  }
  function silindir(ad, bant, c, r, z, h, stil = {}, { bevel = 0, ek = "", ic = "", bias = 0, sekil = {}, steps, grup } = {}) {
    const shape = R.solid(A.cylinder(c[0], c[1], r, z, h, { name: ad, ...sekil }));
    koy(ad, bant, [c[0], c[1], z + h / 2], S(k.cylinder(c[0], c[1], r, z, h, P, steps ?? adimSay(r), bevel), { tone: "mid", ...stil, inner: ic }) + ek, [shape], { bias, grup });
    return shape;
  }
  function kutu(ad, bant, plan, z, h, stil = {}, { steps = 4, bevel = 0, ek = "", ic = "", bias = 0, sekil = {}, grup } = {}) {
    const shape = R.solid(A.slab(plan, z, h, { name: ad, ...sekil }, steps));
    koy(ad, bant, [plan.x + plan.w / 2, plan.y + plan.d / 2, z + h / 2], S(k.slabOf(plan, z, h, P, steps, bevel), { tone: "mid", ...stil, inner: ic }) + ek, [shape], { bias, grup });
    return shape;
  }
  // Herhangi bir eksende kısa silindir (pim, vida başı, yatay kol).
  function disk(ad, bant, F, s0, s1, r, stil = {}, { bevel = 0, ek = "", ic = "", bias = 0, sekil = {}, grup, steps } = {}) {
    const shape = R.solid(A.disc(F, s0, s1, r, { name: ad, ...sekil }));
    koy(ad, bant, G.add3(F.o, G.mul3(F.a, (s0 + s1) / 2)), S(G.disc(s0, s1, r, F, P, { bevel, steps: steps ?? Math.max(14, adimSay(r)) }), { tone: "mid", ...stil, inner: ic }) + ek, [shape], { bias, grup });
    return shape;
  }
  function bilya(ad, bant, merkez, r, stil = {}, { grup } = {}) {
    const shape = R.solid(A.ball(merkez, r, { name: ad }));
    koy(ad, bant, merkez, S(G.sphereOf(merkez, r, P, { steps: 32 }), { tone: "mid", ...stil }), [shape], { grup });
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
  function cam(ad, bant, c, rIn, rOut, z0, z1, on, { ek = "", grup, bias = 0 } = {}) {
    const yari = yarimHalka(c, rIn, rOut, z0, z1, on);
    const shape = R.solid(A.extruded(yari.plan, z0, z1 - z0, { name: ad }));
    koy(ad, bant, yari.ref, S(yari.paths, { tone: "hi", crease: "none", className: on ? "ip-cam" : "ip-cam-ic" }) + ek, [shape], { grup, bias });
    return shape;
  }

  // Yuvalar: yerleşik sırada adı verilen öğenin hemen ardına çizilen kayıtsız canlı içerik.
  const yuva = new Map();
  const yuvaEkle = (ad, svg) => yuva.set(ad, (yuva.get(ad) ?? "") + svg);
  const katman = (bant, { ad = (n) => n } = {}) =>
    R.items
      .filter((item) => item.bant === bant)
      .map((item) => `<g class="it" data-name="${ad(item.name)}"${item.grup ? ` data-grup="${ad(item.grup)}"` : ""}>${item.svg}</g>${yuva.get(item.name) ?? ""}`)
      .join("");
  function yerles(secenek = {}) {
    A.settle(R, P, secenek);
    R.items.sort((a, b) => a.key - b.key);
    for (const item of R.items) {
      if (Math.floor((item.key + BANT / 2) / BANT) !== item.bant) throw new Error(`${item.name} bandının dışına itildi (anahtar ${item.key.toFixed(1)}, bant ${item.bant}): katmanı yanlış`);
    }
    for (const ad of yuva.keys()) if (!R.items.some((item) => item.name === ad)) throw new Error(`yuva ${ad}: böyle bir öğe yok`);
  }
  const sira = (ad) => R.items.findIndex((item) => item.name === ad);
  // a, b'den önce çizilmeli (kayıtsız içeriğin sırası için güvence).
  const once = (a, b) => {
    if (!(sira(a) >= 0 && sira(b) >= 0 && sira(a) < sira(b))) throw new Error(`sıra: ${a} (${sira(a)}) ${b} (${sira(b)}) öğesinden önce çizilmeli`);
  };

  return { P, R, KS, FI, EL, BANT, uz, at, S, Ln, Dots, ZF, nokta, adimSay, yay3, halka, sutun, yakinYay, koy, silindir, kutu, disk, bilya, cam, yarimHalka, yuva, yuvaEkle, katman, yerles, sira, once };
}

// ---------------------------------------------------------------------------------------------------------------------
// Parçalar
// ---------------------------------------------------------------------------------------------------------------------

// Taban plakası: ayaklı levha, oluk, köşe vidaları; isteğe bağlı cetvel şeridi ve etiket plakası.
// plan {x, y, w, d, r}; üst yüzü z = 0. cetvel {x, w} ön kenara, etiket {x, y, w, d} verilen yere konur.
// Döner: { halo } (gövdenin en başına konacak gölge yolu).
export function tabanPlakasi(T, { ad = "tezgah", bant = 0, plan, kalinlik = 12, ayakBoy = 5, cetvel = null, etiket = null, ayakIc = 24 } = {}) {
  const { R, P, at, S, Ln, Dots } = T;
  const plaka = R.solid(A.slab(plan, -kalinlik, kalinlik, { name: `${ad}.plaka`, ground: true }, 8));
  for (const [i, [x, y]] of k.corners(plan, ayakIc).entries()) {
    T.silindir(`${ad}.flans${i}`, bant, [x, y], 7, -kalinlik - ayakBoy, 1.6, { tone: "lo" }, { steps: 20 });
    T.silindir(`${ad}.ayak${i}`, bant, [x, y], 5.4, -kalinlik - ayakBoy + 1.6, ayakBoy - 1.6, { tone: "mid" }, { steps: 20, ek: Ln(k.knurl(x, y, 5.4, -kalinlik - ayakBoy + 1.6, -kalinlik, 22, P), { tone: "lo" }) });
  }
  const vidalar = k.corners(plan, 10);
  const ek = [Ln(k.planOutline(k.insetPlan(plan, 5), 0, P), { tone: "lo" }), Ln(vidalar.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }), Dots(vidalar.map(([x, y]) => at([x, y, 0])), { size: 0.5 })];
  if (cetvel) {
    const serit = { x: cetvel.x, y: plan.y + plan.d - 15, w: cetvel.w, d: 7, r: 1 };
    const cizgi = k.topTicks(serit.x + 4, serit.x + serit.w - 4, 4, 5, serit.y + 0.8, 0.6, [2, 3.6], P);
    ek.push(S(k.slabOf(serit, 0, 0.6, P, 3), { tone: "lo", crease: "none" }), Ln(cizgi.minor, { tone: "lo" }), Ln(cizgi.major, { tone: "mid" }), Dots([at([serit.x + 2, serit.y + 3.5, 0.6]), at([serit.x + serit.w - 2, serit.y + 3.5, 0.6])], { size: 0.45 }));
    R.solid(A.slab(serit, 0, 0.6, { name: `${ad}.cetvel`, owner: `${ad}.plaka` }, 3));
  }
  if (etiket) {
    const satir = [0.78, 0.55, 0.66].map((oran, i) => k.lineOnTop([etiket.x + 4, etiket.y + 5 + i * 4], [etiket.x + 4 + (etiket.w - 8) * oran, etiket.y + 5 + i * 4], 0.8, P)).join("");
    ek.push(
      S(k.slabOf(etiket, 0, 0.8, P, 4), { tone: "lo", crease: "none" }),
      Ln(k.planOutline(k.insetPlan(etiket, 1.6), 0.8, P, 4), { tone: "faint" }),
      Ln(satir, { tone: "lo", free: true }),
      Dots([at([etiket.x + 2.6, etiket.y + etiket.d / 2, 0.8]), at([etiket.x + etiket.w - 2.6, etiket.y + etiket.d / 2, 0.8])], { size: 0.45 }),
    );
    R.solid(A.slab(etiket, 0, 0.8, { name: `${ad}.etiket`, owner: `${ad}.plaka` }, 4));
  }
  T.koy(`${ad}.plaka`, bant, [plan.x + plan.w / 2, plan.y + plan.d / 2, -kalinlik / 2], S(k.slabOf(plan, -kalinlik, kalinlik, P, 8, 1.6), { tone: "lo" }) + ek.join(""), [plaka]);
  return { halo: `<path class="iso-halo" d="${k.haloOf(plan, -kalinlik - ayakBoy, kalinlik, P)}"/>`, plaka };
}

// Cam beher: taban diski, arka ve ön yarım, ağız halkası, gaga, ön yüzde ölçek şeridi ve çentikleri.
// c eksen, z tabanın altı. Öğeler: `${ad}.taban`, `${ad}.arka`, `${ad}.on`, `${ad}.gaga` (hepsi grup = ad).
// İçerik `${ad}.arka` yuvasına, içine sarkan şey arka ile ön arasına çizilir.
// Döner: { ic (iç tabanın z'si), ust (ağzın z'si), ri, ro, dolu (tam dolulukta sıvı boyu), sekil: { taban, arka, on } }.
export function beher(T, { ad = "beher", bant = 1, c, z, ri = 28, ro = 29.5, boy = 62, taban = 3, dolu = 50, cizgiSayisi = 8, bias = 0 } = {}) {
  const { FI, at, nokta, Ln } = T;
  const ic = z + taban;
  const ust = ic + boy;
  const tabanSekil = T.silindir(`${ad}.taban`, bant, c, ro, z, taban, { tone: "hi", crease: "lo" }, { steps: 48, grup: ad, bias });
  const arka = T.cam(`${ad}.arka`, bant, c, ri, ro, ic, ust, false, { grup: ad, bias });
  // Ölçek: cam üstündeki baskı şeridinin kenarına köklü çentikler; her dördüncüsü uzun.
  const s0 = FI + 0.52;
  const adim = dolu / cizgiSayisi;
  const serit = [...Array.from({ length: 9 }, (_, i) => at(nokta(c, ro, s0 + (0.07 * i) / 8, ic + dolu + 3))), ...Array.from({ length: 9 }, (_, i) => at(nokta(c, ro, s0 + 0.07 - (0.07 * i) / 8, ic + 3)))];
  const kucuk = [];
  const buyuk = [];
  for (let n = 1; n <= cizgiSayisi; n++) (n % 4 === 0 ? buyuk : kucuk).push(T.yay3(c, ro, ic + n * adim, s0, s0 - (n % 4 === 0 ? 0.17 : 0.1), 2));
  const olcek = Ln(k.pathOf(serit, true), { tone: "lo" }) + Ln(kucuk.join(""), { tone: "lo" }) + Ln(buyuk.join(""), { tone: "mid" });
  const on = T.cam(`${ad}.on`, bant, c, ri, ro, ic, ust, true, { ek: olcek, grup: ad, bias });
  // Gaga: ağzın ekranda sol yanında küçük bir dökme dudağı.
  const g = FI + Math.PI / 2 + 0.35;
  const dudak = [nokta(c, ro - 0.2, g - 0.16, 0), nokta(c, ro + 3.2, g, 0), nokta(c, ro - 0.2, g + 0.16, 0)].map(([x, y]) => [x, y]);
  const gagaSekil = T.R.solid(A.extruded(dudak, ust - 1.6, 1.6, { name: `${ad}.gaga`, seated: true, cut: [arka] }));
  T.koy(`${ad}.gaga`, bant, nokta(c, ro + 1.2, g, ust - 0.8), T.S(k.extrude(dudak, ust - 1.6, 1.6, T.P), { tone: "hi", crease: "none", className: "ip-cam" }), [gagaSekil], { grup: ad, bias: bias + 0.05 });
  return { ic, ust, ri, ro, dolu, sekil: { taban: tabanSekil, arka, on } };
}

// Düşeyde kayan dolu silindir (sıvı, erimemiş katı, metal blok): tam boy çizilir, `data-part="<parca>"` öğesi aşağı
// kaydırılır (translate(0 dz·uz), dz ≤ 0), tabanında kırpılır. sinif: ton takımı (ip-sivi …). ek: yüzeyle birlikte kayan çizgiler.
export function icerikSutunu(T, { kimlik, parca, c, r, z, h, sinif = "ip-sivi", ton = "mid", ek = "", gizli = false, lit = false, bevel = 0 }) {
  return `<clipPath id="${kimlik}"><path d="${T.sutun(c, r + 0.4, z)}"/></clipPath><g clip-path="url(#${kimlik})" data-part="${parca}-kap" class="${sinif}"${gizli ? ' style="display:none"' : ""}><g data-part="${parca}">${T.S(k.cylinder(c[0], c[1], r, z, h, T.P, 56, bevel), { tone: ton, crease: "lo", lit })}${ek}</g></g>`;
}

// Cam termometre: hazne (dolu, `lit`), cam gövde, ölçek çentikleri (her 10 °C, 50'de bir uzun; gövdenin sol kenarına köklü),
// kılcalda `lit` sütun. Düşey durur; sütunun boyu sıcaklıkla doğru orantılıdır.
//   c            eksen
//   zAlt         haznenin en alt noktası
//   zOlcek       ölçeğin `min` çizgisinin z'si
//   birim        1 °C'ın boyu (dünya birimi)
//   min, max     ölçek aralığı (°C)
//   zUst         camın bittiği yer (varsayılan: max çizgisinin 6 üstü); kıskaç bunun altında bir yerde tutar
//   zBol         bu z'nin altı bir kaba dalabilir: alt kısım ayrı gruptur, `kirp` verilirse `<kimlik>-hava` kırpmasıyla
//                (data-part="kirp-hava", z = kirp'te kurulur) çizilir; aynı alt kısmın kopyası `altKopya` olarak döner
//                (sıvı tonlarıyla, kendi kırpmasıyla sıvının içine çizilmek üzere).
// Öğe: `${ad}` (tek öğe; kıskacın üstünde kalan uç için `ustParca` ayrı öğedir: `${ad}.uc`).
// Sütun: data-part="sutun"; T °C için translate(0 (T − max)·birim·uz).
// Döner: { sekil, zMin, zMax, birim, min, max, tepe: [x, y] (max'ta sütun tepesinin ekrandaki yeri), altKopya, veri }.
export function termometre(T, { ad = "termometre", bant = 1, c, zAlt, zOlcek, birim = 0.8, min = -20, max = 120, zUst, zBol = null, kirp = null, kimlik, rCam = 3.1, rHazne = 3.5, rSutun = 1.05, hazneBoy = 10, kiskac = null, bias = 0 }) {
  const { P, R, FI, at, S, Ln, nokta } = T;
  const zMax = zOlcek + (max - min) * birim;
  const ust = zUst ?? zMax + 6;
  const zHazne = zAlt + rHazne; // yarım küre tabanın merkezi
  const zGovde = zHazne + hazneBoy;
  const bol = zBol ?? zGovde;
  const sol = FI + Math.PI / 2; // gövdenin ekranda sol kenarı
  const kisUst = kiskac ? kiskac[1] : ust;
  const kisAlt = kiskac ? kiskac[0] : ust;

  // Hazne doludur: sütunla aynı düz tonda.
  const hazne = `<g class="ip-sutun">${S(G.sphereOf([c[0], c[1], zHazne], rHazne, P, { steps: 28 }), { tone: "hi", lit: true })}${S(k.cylinder(c[0], c[1], rHazne, zHazne, hazneBoy, P, 20), { tone: "hi", lit: true, crease: "none" })}</g>`;
  const altCam = bol > zGovde ? S(k.cylinder(c[0], c[1], rCam, zGovde, bol - zGovde, P, 18), { tone: "hi", crease: "none" }) : "";
  const altSutun = bol > zGovde ? `<g class="ip-sutun">${S(k.cylinder(c[0], c[1], rSutun, zGovde, bol - zGovde, P, 8), { tone: "hi", lit: true, crease: "none" })}</g>` : "";
  const alt = hazne + altCam + altSutun;

  const kucuk = [];
  const buyuk = [];
  for (let d = min; d <= max + 1e-9; d += 10) {
    const z = zOlcek + (d - min) * birim;
    const uzun = Math.round(d) % 50 === 0;
    // Kısa çentik düz bir çizgidir ve sol kenara köklüdür; uzun çentik kenardan kenara gider.
    (uzun ? buyuk : kucuk).push(T.yay3(c, rCam, z, sol - 0.03, uzun ? sol - Math.PI + 0.03 : sol - 1.1, uzun ? 10 : 1));
  }
  const olcek = Ln(kucuk.join(""), { tone: "hi" }) + Ln(buyuk.join(""), { tone: "hi" });
  const ustCam = S(k.cylinder(c[0], c[1], rCam, bol, kisAlt - bol, P, 18), { tone: "hi", crease: "none" });
  // Sabit sütun: bölme çizgisinden ölçeğin başına. Hareketli sütun: tam boy, aşağı kayar, ölçeğin başının hemen altında kırpılır.
  const sabitSutun = `<g class="ip-sutun">${S(k.cylinder(c[0], c[1], rSutun, bol, zOlcek - 1.5 - bol + 0.6, P, 8), { tone: "hi", lit: true, crease: "none" })}</g>`;
  const oynak =
    `<clipPath id="${kimlik}-sutun"><path d="${T.sutun(c, rSutun + 0.5, zOlcek - 1.5)}"/></clipPath>` +
    `<g clip-path="url(#${kimlik}-sutun)" class="ip-sutun"><g data-part="sutun">${S(k.cylinder(c[0], c[1], rSutun, zOlcek - 1.5 - (max - min) * birim, 1.5 + 2 * (max - min) * birim, P, 8), { tone: "hi", lit: true, crease: "none" })}</g></g>`;
  const altGrup = kirp === null ? alt : `<clipPath id="${kimlik}-hava"><path data-part="kirp-hava" d="${T.sutun(c, rHazne + 0.6, kirp)}"/></clipPath><g clip-path="url(#${kimlik}-hava)">${alt}</g>`;

  const sekiller = [R.solid(A.ball([c[0], c[1], zHazne], rHazne, { name: `${ad}.hazne-uc`, owner: ad })), R.solid(A.cylinder(c[0], c[1], rHazne, zHazne, hazneBoy, { name: `${ad}.hazne`, owner: ad })), R.solid(A.cylinder(c[0], c[1], rCam, zGovde, kisAlt - zGovde, { name: ad, owner: ad }))];
  T.koy(ad, bant, [c[0], c[1], (zAlt + kisAlt) / 2], altGrup + ustCam + olcek + sabitSutun + oynak, sekiller, { bias });
  let ucSekil = null;
  if (kiskac) {
    ucSekil = R.solid(A.cylinder(c[0], c[1], rCam, kisUst, ust - kisUst, { name: `${ad}.uc`, owner: ad }));
    const halka = Ln(k.sideArc(c[0], c[1], rCam, ust - 1.6, P, 10), { tone: "lo" });
    T.koy(`${ad}.uc`, bant, [c[0], c[1], (kisUst + ust) / 2], S(k.cylinder(c[0], c[1], rCam, kisUst, ust - kisUst, P, 18, 0.3), { tone: "hi", inner: halka }), [ucSekil], { bias });
  }
  const tepe = at([c[0], c[1], zMax]);
  return {
    sekil: sekiller[2],
    sekiller: [...sekiller, ...(ucSekil ? [ucSekil] : [])],
    zMin: zOlcek,
    zMax,
    birim,
    min,
    max,
    ust,
    rCam,
    rHazne,
    tepe,
    altKopya: alt,
    kirpAlt: (z) => T.sutun(c, rHazne + 0.6, z),
    veri: { min, max, birim, tepe: tepe.map((v) => Math.round(v * 100) / 100) },
  };
}

// Statif ve kıskaç: taban levhası, yaka, direk (bağlantı parçasının altında ve üstünde iki parça), bağlantı parçası
// (kelebek vidalı), yatay kol, tutulan şeyin çevresinde kıskaç çenesi (kelebek vidalı).
//   s        direğin zemindeki yeri            c        tutulan şeyin ekseni (s ile aynı x ya da aynı y'de olmalı)
//   zKol     kolun ekseninin z'si              rTutulan tutulan şeyin yarıçapı; tutulan: kayıtlı şekilleri (çene bunlarla oyulur)
//   taban    {x, y, w, d, r} levha (verilmezse direğin çevresinde 38 × 48)
// Öğeler: `${ad}.taban`, `.yaka`, `.direk-alt`, `.baglanti`, `.direk-ust`, `.baslik`, `.kol`, `.cene`, vidalar.
// Döner: { zUst, kiskac: [zAlt, zUst] } (çenenin alt ve üst yüzü; termometrenin `kiskac` alanı).
export function statif(T, { ad = "statif", bant = 1, s, c, zKol, rTutulan = 3.1, tutulan = [], taban = null, rDirek = 2.6, zBas = 0, bias = 0 }) {
  const { P, R, at, S, Ln, Dots } = T;
  const yatay = Math.abs(s[1] - c[1]) < 1e-6 ? "x" : Math.abs(s[0] - c[0]) < 1e-6 ? "y" : null;
  if (!yatay) throw new Error("statif: kol dünya eksenlerinden birine paralel olmalı (s ve c aynı x ya da y'de)");
  const yon = yatay === "x" ? Math.sign(c[0] - s[0]) : Math.sign(c[1] - s[1]);
  const plan = taban ?? { x: s[0] - 16, y: s[1] - 24, w: 38, d: 48, r: 3 };
  const levhaH = 5;
  const z0 = zBas;
  const vida = k.corners(plan, 5).map(([x, y]) => at([x, y, z0 + levhaH]));
  T.kutu(`${ad}.taban`, bant, plan, z0, levhaH, { tone: "mid" }, { steps: 5, bevel: 0.8, bias, ic: Ln(k.sideSeam(plan, z0 + 1.6, P, 5), { tone: "faint" }), ek: Dots(vida, { size: 0.45 }) });
  T.silindir(`${ad}.yaka`, bant, s, 5, z0 + levhaH, 4, { tone: "mid" }, { bevel: 0.4, bias, ek: Ln(k.knurl(s[0], s[1], 5, z0 + levhaH, z0 + levhaH + 4, 18, P), { tone: "lo" }) });
  const bagH = 12;
  const bagAlt = zKol - bagH / 2;
  const bagUst = zKol + bagH / 2;
  const zUst = bagUst + 12;
  const dikis = Ln([0.33, 0.66].map((oran) => k.sideArc(s[0], s[1], rDirek, z0 + levhaH + 4 + (bagAlt - z0 - levhaH - 4) * oran, P, 12)).join(""), { tone: "faint" });
  const direkAlt = T.silindir(`${ad}.direk-alt`, bant, s, rDirek, z0 + levhaH + 4, bagAlt - z0 - levhaH - 4, { tone: "mid", crease: "none" }, { steps: 20, ic: dikis, bias });
  const BAG = { x: s[0] - 6, y: s[1] - 6, w: 12, d: 12, r: 2 };
  const direkTam = A.cylinder(s[0], s[1], rDirek, bagAlt - 1, bagH + 2, { name: `${ad}.direk-ic` });
  T.kutu(`${ad}.baglanti`, bant, BAG, bagAlt, bagH, { tone: "mid" }, { steps: 4, bevel: 0.5, bias, ic: Ln(k.sideSeam(BAG, bagUst - 3, P, 4), { tone: "faint" }), sekil: { cut: [direkTam] } });
  T.silindir(`${ad}.direk-ust`, bant, s, rDirek, bagUst, zUst - bagUst, { tone: "mid", crease: "none" }, { steps: 20, bias });
  T.silindir(`${ad}.baslik`, bant, s, rDirek + 0.8, zUst, 2, { tone: "mid" }, { bevel: 0.3, steps: 20, bias });
  // Bağlantı parçasının kelebek vidası: kolun karşı yüzünde değil, izleyiciye bakan yan yüzde.
  const yan = yatay === "x" ? [0, 1, 0] : [1, 0, 0];
  const VF = G.frameOf([s[0], s[1], zKol + 2.5], yan, yatay === "x" ? [1, 0, 0] : [0, 1, 0], [0, 0, 1]);
  T.disk(`${ad}.baglanti-mil`, bant, VF, 6, 8.5, 1.2, { tone: "mid", crease: "none" }, { bias });
  T.disk(`${ad}.baglanti-vida`, bant, VF, 8.5, 12, 2.8, { tone: "mid" }, { bevel: 0.3, bias, ek: k.fadedSvg(G.ribsOf(VF, 8.5, 12, 2.8, 18, P, { fade: [0.08, 0.5] }), { tone: "lo" }) });
  // Kol ve çene
  const eksen = yatay === "x" ? [yon, 0, 0] : [0, yon, 0];
  const KF = G.frameOf([s[0], s[1], zKol], eksen, yatay === "x" ? [0, 1, 0] : [1, 0, 0], [0, 0, 1]);
  const uzak = Math.hypot(c[0] - s[0], c[1] - s[1]);
  const ceneYari = 5;
  const ceneH = 8;
  const CENE = { x: c[0] - ceneYari, y: c[1] - ceneYari, w: ceneYari * 2, d: ceneYari * 2, r: 1.6 };
  const ceneAlt = zKol - ceneH / 2;
  T.disk(`${ad}.kol`, bant, KF, 6, uzak - ceneYari, 1.7, { tone: "mid", crease: "none" }, { bias, ic: Ln(G.arcOf(KF, 6 + (uzak - ceneYari - 6) / 2, 1.7, P), { tone: "faint" }) });
  const oyuk = A.cylinder(c[0], c[1], rTutulan, ceneAlt - 1, ceneH + 2, { name: `${ad}.cene-ic` });
  T.kutu(`${ad}.cene`, bant, CENE, ceneAlt, ceneH, { tone: "mid" }, { steps: 4, bevel: 0.5, bias, ek: Ln(k.ring(c[0], c[1], rTutulan + 1, ceneAlt + ceneH, P, 16), { tone: "lo" }), sekil: { cut: [oyuk, ...tutulan] } });
  const CF = G.frameOf([c[0], c[1], zKol], yan, yatay === "x" ? [1, 0, 0] : [0, 1, 0], [0, 0, 1]);
  T.disk(`${ad}.cene-mil`, bant, CF, ceneYari, ceneYari + 2.2, 1.1, { tone: "mid", crease: "none" }, { bias });
  T.disk(`${ad}.cene-vida`, bant, CF, ceneYari + 2.2, ceneYari + 5.4, 2.5, { tone: "mid" }, { bevel: 0.3, bias, ek: k.fadedSvg(G.ribsOf(CF, ceneYari + 2.2, ceneYari + 5.4, 2.5, 16, P, { fade: [0.08, 0.5] }), { tone: "lo" }) });
  return { zUst: zUst + 2, kiskac: [ceneAlt, ceneAlt + ceneH], direkAlt };
}

// ---------------------------------------------------------------------------------------------------------------------
// Stil
// ---------------------------------------------------------------------------------------------------------------------

// Parçaların kendi stili: sayfa da ders modülü de kullanır. Tek başına sayfada renk yoktur; tahtadaki üç konu rengi
// (sütun, su, ısı) tahtaCss içindeki değişkenlerle gelir.
export const PARCA_CSS = `
.ip-cam>.iso-fill{fill-opacity:.2}
.ip-cam>.iso-shade{fill-opacity:.4}
.ip-cam>.iso-top{fill-opacity:.9}
.ip-cam-ic>.iso-shade{fill-opacity:.55}
.ip-sutun .iso-solid[data-lit]>.iso-fill,.ip-sutun .iso-solid[data-lit]>.iso-shade,.ip-sutun .iso-solid[data-lit]>.iso-top{fill:var(--ip-sutun,var(--anatomy-lit))}
.ip-sutun .iso-solid[data-lit]>.iso-fill{stroke:var(--ip-sutun,var(--anatomy-lit));stroke-width:var(--ip-sutun-kalin,0px)}
.ip-sutun .iso-solid[data-seamless][data-lit]>.iso-shade,.ip-sutun .iso-solid[data-seamless][data-lit]>.iso-top{stroke:var(--ip-sutun,var(--anatomy-lit))}
.ip-sutun .iso-solid[data-lit]>.iso-edge{stroke:var(--ip-sutun,var(--anatomy-lit))}
path.ip-isi,.iso-solid.ip-isi>.iso-fill,.iso-solid.ip-isi>.iso-shade,.iso-solid.ip-isi>.iso-top{fill:var(--ip-isi,var(--anatomy-lit))}
path.ip-isi{stroke:none}
path.ip-isi-ic{fill:var(--ip-isi-ic,var(--anatomy-paper));stroke:none}
.iso-line.ip-isi-cizgi[data-tone],.iso-solid.ip-isi>.iso-edge{stroke:var(--ip-isi-cizgi,var(--anatomy-hi))}
.ip-ibre{stroke-width:1.2}
`;
const tonlar = (t) =>
  `--anatomy-paper:${t[0]};--anatomy-face:${t[1]};--anatomy-top:${t[2]};--anatomy-shade-0:${t[3]};--anatomy-shade-1:${t[4]};--anatomy-shade-2:${t[5]};--anatomy-shade-3:${t[6]};--anatomy-lit-top:${t[7]};--anatomy-lit-shade:${t[8]};--anatomy-hi:${t[9]};--anatomy-mid:${t[10]};--anatomy-lo:${t[11]};--anatomy-faint:${t[12]};--anatomy-lit:${t[13]}`;
// Sıra: paper, face, top, shade0..3, lit-top, lit-shade, hi, mid, lo, faint, lit
const SU = {
  light: ["#e6eaec", "#eaeef0", "#eef2f3", "#cbd2d6", "#d3dadd", "#dae0e3", "#e1e6e8", "#e9edef", "#d2d9dc", "#4b5257", "#8f979c", "#aab2b7", "#c3cace", "#2b3136"],
  dark: ["#1a1d1f", "#1f2325", "#202427", "#141719", "#171a1c", "#1a1d20", "#1d2123", "#262b2e", "#1e2225", "#aeb6ba", "#687075", "#454c50", "#2f3538", "#d5dde1"],
  tahta: ["#172446", "#1c2a50", "#1f2f58", "#111b38", "#141f3e", "#172345", "#1a274b", "#27386a", "#1d2b55", "#aebbe0", "#6a7aa8", "#44558a", "#2b3a68", "#dbe4ff"],
};
const YAG = {
  light: ["#ebe9da", "#efedde", "#f3f1e3", "#d4d1bb", "#dbd8c3", "#e2dfcb", "#e8e5d3", "#eeecdf", "#dad7c2", "#55523f", "#9a9680", "#b5b19a", "#ccc9b4", "#33311f"],
  dark: ["#1e1d17", "#23221b", "#25241c", "#171611", "#1a1914", "#1d1c16", "#201f18", "#2b2a20", "#22211a", "#bab7a4", "#737060", "#4f4c40", "#35332b", "#e0ddc8"],
  tahta: ["#27283a", "#2d2e40", "#313246", "#1d1e2f", "#202134", "#232439", "#26273d", "#3a3b52", "#2c2d42", "#c9c8b4", "#8a8a80", "#5c5d62", "#3c3d4c", "#efeeda"],
};
const MUM = {
  light: ["#eeece6", "#f2f0ea", "#f5f3ee", "#d9d6cd", "#dfdcd4", "#e5e3db", "#ebe9e2", "#f1efe9", "#dedbd2", "#5a5750", "#9d9a92", "#b8b5ad", "#cfccc5", "#35332d"],
  dark: ["#201f1d", "#252422", "#272624", "#191817", "#1c1b19", "#1f1e1c", "#22211f", "#2d2c29", "#242321", "#bdbab3", "#76736d", "#514f4a", "#373532", "#e2dfd8"],
  tahta: ["#222a48", "#283052", "#2c3558", "#19203a", "#1c2440", "#1f2846", "#222c4c", "#34406a", "#283258", "#c4cbe2", "#808aaa", "#55608a", "#374068", "#e8ecff"],
};
// Opak katılar: erimemiş bal mumu (ip-kati) ve metal blok (ip-metal). Kâğıttan ayrışan, gölgeli, düz tonlar.
const KATI = {
  light: ["#dedbd0", "#e3e0d6", "#e9e6dd", "#c2bfb3", "#cac7bb", "#d2cfc4", "#d9d6cb", "#eceae2", "#d6d3c8", "#4a473f", "#8a877e", "#a5a299", "#bdbab0", "#222019"],
  dark: ["#2d2c29", "#32312e", "#393834", "#22211f", "#262523", "#2a2927", "#2e2d2a", "#43423d", "#33322e", "#c9c6bd", "#85827a", "#5e5c56", "#45433f", "#ffffff"],
  tahta: ["#34406a", "#3a4672", "#424f7e", "#273258", "#2b375f", "#303c66", "#34416c", "#4d5a8c", "#3b4776", "#d5dcf2", "#8f9bc0", "#6672a0", "#4a5684", "#ffffff"],
};
const METAL = {
  light: ["#d9dadc", "#dfe0e2", "#e7e8ea", "#bbbcc0", "#c4c5c9", "#cdced1", "#d5d6d9", "#ecedef", "#d2d3d6", "#3d3e42", "#7f8085", "#9c9da2", "#b6b7bb", "#1a1a1d"],
  dark: ["#303133", "#36373a", "#3e3f42", "#232426", "#28292b", "#2c2d30", "#313235", "#4a4b4f", "#38393c", "#d2d3d6", "#8b8c91", "#636468", "#48494d", "#ffffff"],
  tahta: ["#3b4460", "#424b68", "#4b5574", "#2b3350", "#303957", "#353e5d", "#3a4363", "#566084", "#434c6c", "#dde1ee", "#9aa1b8", "#6f7794", "#515a7a", "#ffffff"],
};
// Sıvı ton takımları. kok: figürün kök sınıfı (sayfada ".iso", açık tema varsayılan; derste ".isi" gibi).
export function siviCss(kip, kok = ".iso") {
  if (kip === "tahta") {
    // Tahtada sıvılar ve açık katılar bir rengin tahtayla karışımıdır (color-mix; ortak/ders.css de kullanıyor).
    const karis = (renk, yuzde) => `color-mix(in srgb,${renk} ${Math.round(yuzde)}%,var(--board,#10162b))`;
    // Saydam görünen sıvı: dolgu yüzde 30 dolayında, üst yüz biraz daha açık, çizgiler rengin kendisi.
    const sivi = (renk, g = 1) => tonlar([karis(renk, 26 * g), karis(renk, 30 * g), karis(renk, 38 * g), karis(renk, 20 * g), karis(renk, 24 * g), karis(renk, 28 * g), karis(renk, 32 * g), karis(renk, 44 * g), karis(renk, 34 * g), renk, renk, karis(renk, 78), karis(renk, 55), "#ffffff"]);
    // Açık ve opak katı: dolgu rengin kendisine yakın, kıvrım çizgileri daha koyu.
    const acik = (renk) => tonlar([karis(renk, 80), karis(renk, 86), karis(renk, 96), karis(renk, 58), karis(renk, 66), karis(renk, 73), karis(renk, 80), karis(renk, 98), karis(renk, 86), renk, karis(renk, 52), karis(renk, 46), karis(renk, 62), "#ffffff"]);
    return (
      `${kok} .ip-sivi{${sivi("var(--c1,#6ea8ff)")}}\n${kok} .ip-sivi[data-sivi="yag"]{${sivi("#d9c98a")}}\n${kok} .ip-sivi[data-sivi="mum"]{${sivi("#f6e7bf", 1.7)}}\n` +
      `${kok} .ip-kati{${acik("#efe2bd")}}\n${kok} .ip-buz{${acik("#dfeaff")}}\n${kok} .ip-metal{${tonlar(METAL.tahta)}}\n`
    );
  }
  return (
    `.ip-kati{${tonlar(KATI.light)}}\n.ip-metal{${tonlar(METAL.light)}}\n.iso[data-theme="dark"] .ip-kati{${tonlar(KATI.dark)}}\n.iso[data-theme="dark"] .ip-metal{${tonlar(METAL.dark)}}\n` +
    `.ip-sivi{${tonlar(SU.light)}}\n.ip-sivi[data-sivi="yag"]{${tonlar(YAG.light)}}\n.ip-sivi[data-sivi="mum"]{${tonlar(MUM.light)}}\n` +
    `.iso[data-theme="dark"] .ip-sivi{${tonlar(SU.dark)}}\n.iso[data-theme="dark"] .ip-sivi[data-sivi="yag"]{${tonlar(YAG.dark)}}\n.iso[data-theme="dark"] .ip-sivi[data-sivi="mum"]{${tonlar(MUM.dark)}}\n`
  );
}
// Tahta tonları: tahtanın rengi (--board) kâğıt olur, tonlar tahtanın mavisine çekilir. Kart, gölge bulanıklığı ve
// CSS animasyonu yoktur. sinif: figürün kök <svg> öğesine verilen sınıf. Çizgiler bütün düzenek görünürken de (820 × 461
// piksellik tahta) okunsun diye açık ve 0,85 px; üç konu rengi burada verilir (sütun --c5, su --c1, ısı --c2).
export function tahtaCss(sinif) {
  return `
.${sinif}{--anatomy-paper:var(--board,#10162b);--anatomy-face:#1a2240;--anatomy-top:#1c2443;
--anatomy-shade-0:#0c1122;--anatomy-shade-1:#0f1529;--anatomy-shade-2:#131a31;--anatomy-shade-3:#171f3a;
--anatomy-lit-top:#2a3358;--anatomy-lit-shade:#1e2647;
--anatomy-hi:#e6eaf6;--anatomy-mid:#a3aed0;--anatomy-lo:#6c79a8;--anatomy-faint:#3f4c7c;--anatomy-lit:#ffffff;
--anatomy-halo:#060914;--anatomy-halo-opacity:.5;--anatomy-dot:#e6eaf6;--anatomy-weight:.85px;
--ip-sutun:var(--c5,#ffd166);--ip-sutun-kalin:1px;
--ip-isi:var(--c2,#ff8a5b);--ip-isi-ic:color-mix(in srgb,var(--c2,#ff8a5b) 45%,#fff);--ip-isi-cizgi:var(--c2,#ff8a5b)}
.${sinif} .iso-halo{filter:none;opacity:.35}
.${sinif} path,.${sinif} circle{vector-effect:non-scaling-stroke}
.${sinif} .ip-cam>.iso-fill{fill-opacity:.06}
.${sinif} .ip-cam>.iso-shade{fill-opacity:.14}
.${sinif} .ip-cam-ic>.iso-shade{fill-opacity:.3}
${siviCss("tahta", "." + sinif)}`;
}
// Kitin stilinden ders modülüne giren satırlar (kart, akış ve nabız animasyonları dışarıda).
export const kitCss = () =>
  k.ISO_CSS.split("\n")
    .filter((line) => /^\.iso-(fill|solid|shade|top|halo|line|dots)|^\.tb-/.test(line) && !/data-flow|data-pulse|iso-plate|data-dotted|data-dashed|red|green|blue/.test(line))
    .join("\n");

// ---------------------------------------------------------------------------------------------------------------------
// Çıktılar
// ---------------------------------------------------------------------------------------------------------------------

// Tek başına sayfa (skill'in kartı; denetimler bunun üstünde çalışır). script: sayfanın canlı kodu (modül olarak gömülür).
export function sayfaYaz({ dosya, tema, baslik, sekilNo, ipucu, gosterge, anahtarlar, aciklama, svg, css, script, genislik = 760, sahneSinif = "ip-stage", etiket }) {
  const body =
    `<style>${css}</style>` +
    k.plateHtml({
      fig: sekilNo,
      title: baslik,
      hint: ipucu,
      readout: gosterge,
      keys: anahtarlar,
      caption: aciklama,
      body: `<div class="iso-stage ${sahneSinif}" tabindex="0" role="img" aria-label="${etiket.replace(/"/g, "&quot;")}">${svg}</div>`,
    });
  const page = k.pageHtml({ title: baslik, theme: tema, body, script, width: genislik }).replace('<html lang="en">', '<html lang="tr">');
  writeFileSync(dosya, page);
  return page.length;
}

// Ders modülü: `window.<AD>` = { kur, oran, kadraj, sabit }. Ortak iskelet burada; figüre özgü olan `ciz` kaynağıdır.
//   ciz      düz JS kaynağı; `cizimKur(kok, D)` tanımlar. cizimKur şunu döndürür:
//            { arayuz: { …dersin çağıracağı ayar fonksiyonları }, yer(ad) → [x, y] figür birimiyle (bilinmeyen ad: hata) }
//            ve isteğe bağlı `govdeOf(D)` tanımlar (gövde SVG'sini D'den kurar; yoksa D.govde kullanılır).
//   veri     D: derlemede hesaplanmış sayılar ve SVG parçaları (JSON)
//   kadraj   { tum: [x, y, w, h], … } figür birimiyle; hepsi W : H oranında olmalı
//   baslik   dosyanın baş yorumu (arayüzün tamamı; ders yazan yalnızca bunu okur)
export function dersModuluYaz({ dosya, ad, sinif, baslik, W, H, css, ciz, veri, kadraj, sabit = {}, enCokKB = 300 }) {
  for (const [isim, kutu] of Object.entries(kadraj)) if (Math.abs(kutu[2] / kutu[3] - W / H) > 0.01) throw new Error(`kadraj ${isim} figürün oranında değil`);
  const girinti = (kod) => kod.trim().split("\n").join("\n  ");
  const kaynak = `/* ${baslik.trim()} */
window.${ad} = (() => {
  'use strict';
  const D = ${JSON.stringify(veri)};
  const CSS = ${JSON.stringify(css)};
  const BOY = { W: ${W}, H: ${H} };
  const KADRAJ = ${JSON.stringify(kadraj)};
  const SABIT = ${JSON.stringify(sabit)};
  ${girinti(ciz)}
  let sayac = 0;
  function kur(c, svg, o = {}) {
    const h = o.h || 480, w = h * BOY.W / BOY.H, x = o.x || 0, y = o.y || 0;
    const el = c.S('svg', { x, y, width: w, height: h, class: 'iso ${sinif}' }, svg);
    const govde = typeof govdeOf === 'function' ? govdeOf(D) : D.govde;
    // Aynı tahtada birden çok figür kurulabilsin: kırpma kimlikleri her kurulumda ayrı önek alır.
    const no = sayac++;
    el.innerHTML = '<style>' + CSS + '</style>' + (no ? govde.replace(/(id="|url\\(#)/g, '$1k' + no + '-') : govde);
    const ciz = cizimKur(el, D);
    let kutu = KADRAJ.tum.slice();
    const bak = (k) => { kutu = k.slice(); el.setAttribute('viewBox', kutu.map((v) => (+v).toFixed(2)).join(' ')); };
    const nokta = (isim) => { const p = ciz.yer(isim); return [x + (p[0] - kutu[0]) * w / kutu[2], y + (p[1] - kutu[1]) * h / kutu[3]]; };
    // Nokta şu anki kadrajın içinde mi (yakınlaşınca dışarıda kalan noktanın etiketi gizlensin diye).
    const gorunur = (isim) => { const p = ciz.yer(isim); return p[0] >= kutu[0] && p[0] <= kutu[0] + kutu[2] && p[1] >= kutu[1] && p[1] <= kutu[1] + kutu[3]; };
    bak(kutu);
    return Object.assign({ el, x, y, w, h, bak, nokta, gorunur }, ciz.arayuz);
  }
  return { kur, oran: BOY.W / BOY.H, kadraj: KADRAJ, sabit: SABIT };
})();
`;
  writeFileSync(dosya, kaynak);
  const kb = kaynak.length / 1024;
  if (kb > enCokKB) throw new Error(`${dosya}: ${kb.toFixed(0)} KB, sınır ${enCokKB} KB`);
  return kb;
}

// Kadraj kutusu: merkez (figür birimi) ve genişlikten, figürün oranında.
export const kadrajOf = (merkez, w, W, H) => {
  const r1 = (v) => Math.round(v * 10) / 10;
  return [r1(merkez[0] - w / 2), r1(merkez[1] - (w * H) / W / 2), r1(w), r1((w * H) / W)];
};
export const oku = (dosya) => readFileSync(dosya, "utf8");
export const KOK = BURASI;
