// Ş2 · İkiz ısıtma düzeneği: geometri, kayıt, tek başına sayfa ve ders modülü.
// node build.mjs [--light] [--audit] [--az=62] [--el=30]
// Yazar: isitma.html | isitma-light.html (bu klasöre) ve fizik/enerji/dersler/isitma-sekil.js (window.ISITMA).
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as O from "../parcalar.mjs";

const { k, G, A, tubePieces, tubeSvg, TAU } = O;
const HERE = dirname(fileURLToPath(import.meta.url));
const KOK = join(HERE, "..", "..", "..", "..", "..");
const sayi = (ad, yoksa) => {
  const bulunan = process.argv.find((a) => a.startsWith(`--${ad}=`));
  return bulunan ? Number(bulunan.split("=")[1]) : yoksa;
};
const THEME = process.argv.includes("--light") ? "light" : "dark";
const W = 870;
const H = 600; // oran 1,45 (IZOMETRIK.md 6b)
const AZ = sayi("az", 68);
const EL = sayi("el", 30);

// ---- Ölçüler (yaklaşık mm; z = 0 tezgâh plakasının üstü) ----
const PLATE = { x: -250, y: -74, w: 500, d: 136, r: 8 };
const PLATE_H = 12;
const FOOT_H = 5;
const MERKEZ = { sol: [-112, 0], sag: [132, 0] };
const SAAT = [-2, 12];

const HALKA = { rIn: 27, rOut: 33, alt: 90, ust: 93.5 };
const BACAK_R = 30;
const TEL = { yari: 35, h: 1.2 };
const TEL_UST = HALKA.ust + TEL.h;
const SERAMIK = { r: 30.5, h: 0.5 };
const ZK = TEL_UST + SERAMIK.h; // kabın oturduğu yüz
const OCAK = { taban: 3.5, blok: 12, bilezik: 20, baca: 46, dudak: 48, girisZ: 8 };
const ALEV_BOY = 40; // açık alev halkanın altına kadar uzanır; kısık alev bunun yarısı
const VANA = [40, -46]; // istasyon eksenine göre
const HORTUM_R = 1.6;

const BEHER = { ri: 28, ro: 29.5, boy: 62, taban: 3, dolu: 50 };
const IC = ZK + BEHER.taban;
const AGIZ = IC + BEHER.boy;
const BLOK = { r: 24, boy: 56 };
const TERMO = { alt: 6, min: -20, max: 120, birim: 0.8 };
const Z_OLCEK = AGIZ + 8;
const Z_MAX = Z_OLCEK + (TERMO.max - TERMO.min) * TERMO.birim;
const Z_KOL = Z_MAX + 10;
const STATIF = [-58, 0]; // istasyon eksenine göre
const Z_TEPE = Z_KOL + 22;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), ...["sol", "sag"].flatMap((i) => [[MERKEZ[i][0] + STATIF[0], MERKEZ[i][1], Z_TEPE], [MERKEZ[i][0], MERKEZ[i][1], Z_KOL + 12]])],
  W,
  H,
  { pad: 26, azimuth: AZ, elevation: EL },
);
// Bantlar: 0 tezgâh, 1 sol istasyon, 2 süreölçer, 3 sağ istasyon (arkadan öne). Hiçbir şey kaydedilmiş şekil olarak hareket etmez.
const T = O.atolye(P, { bantlar: [{ piece: "sabit" }, { piece: "sabit" }, { piece: "sabit" }, { piece: "sabit" }] });
const { R, FI, KS, at, S, Ln, Dots, nokta } = T;
const BANT_IST = { sol: 1, sag: 3 };
const r2 = (v) => Math.round(v * 100) / 100;

// ---- Tezgâh ----
const tezgah = O.tabanPlakasi(T, { ad: "tezgah", bant: 0, plan: PLATE, kalinlik: PLATE_H, ayakBoy: FOOT_H, cetvel: { x: -70, w: 150 }, etiket: { x: -240, y: 34, w: 38, d: 18, r: 1.5 } });
{
  // Uzun plakanın ortasında iki ayak daha
  for (const [i, y] of [PLATE.y + 24, PLATE.y + PLATE.d - 24].entries()) {
    T.silindir(`tezgah.orta-flans${i}`, 0, [0, y], 7, -PLATE_H - FOOT_H, 1.6, { tone: "lo" }, { steps: 20 });
    T.silindir(`tezgah.orta-ayak${i}`, 0, [0, y], 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, { tone: "mid" }, { steps: 20, ek: Ln(k.knurl(0, y, 5.4, -PLATE_H - FOOT_H + 1.6, -PLATE_H, 22, P), { tone: "lo" }) });
  }
}

// ---- Gaz hattı: arka kenar boyunca boru; iki vananın arkasında birer T bloğu, arada iki taşıyıcı, uçlarda kör tapa ----
const HAT = { y: -62, z: 8, r: 2.2, x0: -226, x1: 226 };
{
  const F = G.frameOf([0, HAT.y, HAT.z], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  const boru = A.disc(F, HAT.x0, HAT.x1, HAT.r, { name: "hat.boru-ic" });
  const bloklar = [
    { ad: "tasiyici0", x: -206, w: 6, h: 11.5 },
    { ad: "te-sol", x: MERKEZ.sol[0] + VANA[0], w: 9, h: 13 },
    { ad: "tasiyici1", x: 22, w: 6, h: 11.5 },
    { ad: "te-sag", x: MERKEZ.sag[0] + VANA[0], w: 9, h: 13 },
  ];
  for (const o of bloklar) {
    const plan = { x: o.x - o.w / 2, y: HAT.y - 4.5, w: o.w, d: 9, r: 1.2 };
    T.kutu(`hat.${o.ad}`, 0, plan, 0, o.h, { tone: "mid" }, { steps: 3, bevel: 0.4, sekil: { cut: [boru] }, ek: Dots([at([o.x, HAT.y, o.h])], { size: 0.45 }) });
  }
  const kesim = [HAT.x0, ...bloklar.flatMap((o) => [o.x - o.w / 2, o.x + o.w / 2]), HAT.x1];
  for (let i = 0; i < kesim.length; i += 2) T.disk(`hat.boru${i / 2}`, 0, F, kesim[i], kesim[i + 1], HAT.r, { tone: "mid", crease: "none" });
  T.disk("hat.tapa0", 0, F, HAT.x0 - 2.4, HAT.x0, 3, { tone: "mid" }, { bevel: 0.3 });
  T.disk("hat.tapa1", 0, F, HAT.x1, HAT.x1 + 2.4, 3, { tone: "mid" }, { bevel: 0.3 });
  // Kibrit kutusu: ön sağ köşede
  const KUTU = { x: 192, y: 26, w: 32, d: 19, r: 0.8 };
  const yuz = KUTU.y + KUTU.d;
  const serit = k.pathOf([at([KUTU.x + 3, yuz, 1.8]), at([KUTU.x + KUTU.w - 3, yuz, 1.8]), at([KUTU.x + KUTU.w - 3, yuz, 6.2]), at([KUTU.x + 3, yuz, 6.2])], true);
  T.kutu("kibrit", 0, KUTU, 0, 8, { tone: "mid" }, { steps: 2, bevel: 0.3, bias: 0.3, ek: Ln(k.planOutline(k.insetPlan(KUTU, 2.6), 8, P, 2), { tone: "faint" }) + Ln(serit, { tone: "lo" }) });
}

// ---- Süreölçer (bant 2): altlık, gövde, kurma tacı, iki düğme; ibre yuvada ----
const SAAT_R = 24;
const SAAT_ALT = 1;
const SAAT_UST = 8;
const SAAT_SIFIR = FI - Math.PI / 2; // sıfır izleyicinin karşısında, saat yönünde artar
{
  const [x, y] = SAAT;
  const ALTLIK = { x: x - 31, y: y - 31, w: 62, d: 62, r: 7 };
  T.kutu("saat.altlik", 2, ALTLIK, 0, SAAT_ALT, { tone: "lo", crease: "none" }, { steps: 6, ek: Ln(k.planOutline(k.insetPlan(ALTLIK, 2.4), SAAT_ALT, P, 6), { tone: "faint" }) });
  const cizgi = k.radialTicks(x, y, SAAT_R - 3, 60, 5, SAAT_UST, [1.4, 3], P, SAAT_SIFIR);
  const sifir = (r0, r1) => k.lineOnTop([x + Math.sin(SAAT_SIFIR) * r0, y - Math.cos(SAAT_SIFIR) * r0], [x + Math.sin(SAAT_SIFIR) * r1, y - Math.cos(SAAT_SIFIR) * r1], SAAT_UST, P);
  // Küçük dakika kadranı: sıfırın altında, büyük kadranın içinde
  const kucuk = [x + Math.sin(SAAT_SIFIR) * 10, y - Math.cos(SAAT_SIFIR) * 10];
  const kucukCizgi = k.radialTicks(kucuk[0], kucuk[1], 4.6, 12, 3, SAAT_UST, [0.9, 1.6], P, SAAT_SIFIR);
  const ek = [
    Ln(k.knurl(x, y, SAAT_R, SAAT_UST - 2.6, SAAT_UST, 80, P, 0.3), { tone: "lo" }),
    Ln(k.ring(x, y, SAAT_R - 2.4, SAAT_UST, P, 64), { tone: "lo" }),
    Ln(cizgi.minor, { tone: "lo" }),
    Ln(cizgi.major, { tone: "mid" }),
    Ln(sifir(SAAT_R - 8.5, SAAT_R - 3), { tone: "hi" }),
    Ln(k.ring(kucuk[0], kucuk[1], 4.6, SAAT_UST, P, 24), { tone: "lo" }),
    Ln(kucukCizgi.minor + kucukCizgi.major, { tone: "lo" }),
    Dots([at([kucuk[0], kucuk[1], SAAT_UST])], { size: 0.45 }),
    Ln(k.ring(x, y, 1.8, SAAT_UST, P, 16), { tone: "mid" }),
  ].join("");
  const govdeSekil = T.silindir("saat.govde", 2, SAAT, SAAT_R, SAAT_ALT, SAAT_UST - SAAT_ALT, { tone: "hi", crease: "lo" }, { bevel: 0.8, steps: 72, ic: Ln(k.sideArc(x, y, SAAT_R, SAAT_UST - 2.6, P, 40), { tone: "faint" }), ek });
  // Kurma tacı izleyicinin karşısında (12 hizasında), iki düğme iki yanında
  const zEksen = (SAAT_ALT + SAAT_UST) / 2;
  const tac = (ad, aci, sap, bas, rBas, tirtil) => {
    const yon = [Math.cos(aci), Math.sin(aci), 0];
    const F = G.frameOf([x, y, zEksen], yon, [-Math.sin(aci), Math.cos(aci), 0], [0, 0, 1]);
    T.disk(`saat.${ad}-sap`, 2, F, SAAT_R - 0.6, SAAT_R + sap, 1.5, { tone: "mid", crease: "none" }, { sekil: { seated: true, cut: [govdeSekil] } });
    T.disk(`saat.${ad}`, 2, F, SAAT_R + sap, SAAT_R + sap + bas, rBas, { tone: "mid" }, { bevel: 0.3, ek: tirtil ? k.fadedSvg(G.ribsOf(F, SAAT_R + sap, SAAT_R + sap + bas, rBas, 20, P, { fade: [0.08, 0.5] }), { tone: "lo" }) : "" });
  };
  tac("tac", FI + Math.PI, 2.6, 4.6, 3.3, true);
  tac("dugme-a", FI + Math.PI - 0.62, 2, 2.6, 2, false);
  tac("dugme-b", FI + Math.PI + 0.62, 2, 2.6, 2, false);
  T.yuvaEkle("saat.govde", `<path data-part="ibre" class="iso-line ip-ibre" data-tone="hi" data-free="" d=""/>`);
}

// Kabarcıklar: [eksenden uzaklık, açı (izleyiciye göre), yarıçap, evre kayması, bir faz döngüsündeki tur sayısı].
// Açıların hepsi ekranda termometrenin iki yanına düşer (eksenin tam önü ve arkası boş).
const KABARCIK = [
  [14, 1.2, 1.9, 0.0, 1], [19, -1.0, 1.5, 0.37, 2], [10, 1.9, 1.4, 0.71, 1], [21, 2.1, 1.8, 0.18, 1], [12, -1.7, 1.6, 0.55, 1], [17, -2.3, 1.3, 0.83, 2],
  [22, 0.8, 1.4, 0.29, 2], [9, -1.3, 2.0, 0.62, 1], [16, 1.6, 1.3, 0.9, 2], [20, -0.7, 1.6, 0.08, 1], [11, 2.5, 1.5, 0.46, 2], [15, -2.0, 1.9, 0.76, 1],
];

// ---- Bir istasyon: üçayak, tel tabla, gaz ocağı ve hortumu, vana, beher, termometre, statif ----
function istasyon(ist) {
  const C = MERKEZ[ist];
  const b = BANT_IST[ist];
  const n = (ad) => `${ist}.${ad}`;
  const F0 = T.ZF(C);
  const kim = `is-${ist}`;
  const out = {};

  // Gaz ocağı
  T.silindir(n("ocak.taban"), b, C, 14, 0, OCAK.taban, { tone: "mid" }, { bevel: 0.6, steps: 48, ek: Dots([0.9, 2.99, 5.08].map((a) => at(nokta(C, 11, FI + a, OCAK.taban))), { size: 0.45 }) });
  const BLOKP = { x: C[0] - 6, y: C[1] - 6, w: 12, d: 12, r: 1.4 };
  T.kutu(n("ocak.blok"), b, BLOKP, OCAK.taban, OCAK.blok - OCAK.taban, { tone: "mid" }, { steps: 3, bevel: 0.4 });
  T.silindir(n("ocak.bilezik"), b, C, 6, OCAK.blok, OCAK.bilezik - OCAK.blok, { tone: "hi", crease: "lo" }, {
    bevel: 0.4,
    steps: 28,
    ek: Ln(k.knurl(C[0], C[1], 6, OCAK.blok, OCAK.blok + 2.6, 26, P, 0.3), { tone: "lo" }) + Ln([0.55, -0.55].map((a) => T.yay3(C, 6, OCAK.blok + 5.6, FI + a - 0.22, FI + a + 0.22, 4)+ T.yay3(C, 6, OCAK.blok + 3.8, FI + a + 0.22, FI + a - 0.22, 4).replace(/^M/, "L") + "Z").join(""), { tone: "mid" }),
    ic: Ln(k.sideArc(C[0], C[1], 6, OCAK.blok + 2.6, P, 16), { tone: "faint" }),
  });
  T.silindir(n("ocak.baca"), b, C, 4.2, OCAK.bilezik, OCAK.baca - OCAK.bilezik, { tone: "hi", crease: "none" }, { steps: 22, ic: Ln(k.sideArc(C[0], C[1], 4.2, OCAK.bilezik + 9, P, 12), { tone: "faint" }) });
  T.silindir(n("ocak.dudak"), b, C, 4.9, OCAK.baca, OCAK.dudak - OCAK.baca, { tone: "hi", crease: "lo" }, { steps: 24, ek: `<path class="is-oyuk" d="${k.pathOf(T.halka(C, 3.1, OCAK.dudak, 24), true)}"/>` + Ln(k.ring(C[0], C[1], 3.1, OCAK.dudak, P, 24), { tone: "lo" }) });
  // Alev (yuvada): dış ve iç koni, düz ton
  {
    const AF = T.ZF(C, OCAK.dudak);
    const dis = G.outlineOf([[0, 0], [0, 3.3], [5, 4.5, 1], [12, 4.2, 1], [22, 3, 1], [32, 1.5, 1], [ALEV_BOY, 0]], AF, P, { smooth: true });
    const ic = G.outlineOf([[0, 0], [0, 2.1], [4, 2.3, 1], [10, 1.4, 1], [16, 0]], AF, P, { smooth: true });
    T.yuvaEkle(n("ocak.dudak"), `<g data-part="alev" style="display:none"><path class="ip-isi" d="${dis.fill}"/><path class="iso-line ip-isi-cizgi" data-tone="hi" d="${dis.outline}"/><path class="ip-isi-ic" d="${ic.fill}"/><path class="iso-line ip-isi-cizgi" data-tone="hi" d="${ic.outline}"/></g>`);
    out.alevTaban = at([C[0], C[1], OCAK.dudak]);
  }
  // İğne vana düğmesi (+x yüzünde) ve gaz girişi (−y yüzünde)
  const IF = G.frameOf([C[0], C[1], OCAK.girisZ], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  T.disk(n("ocak.igne-mil"), b, IF, 6, 8.4, 1, { tone: "mid", crease: "none" });
  T.disk(n("ocak.igne"), b, IF, 8.4, 11, 2.4, { tone: "mid" }, { bevel: 0.3, ek: k.fadedSvg(G.ribsOf(IF, 8.4, 11, 2.4, 16, P, { fade: [0.08, 0.5] }), { tone: "lo" }) });
  const GF = G.frameOf([C[0], C[1], OCAK.girisZ], [0, -1, 0], [1, 0, 0], [0, 0, 1]);
  T.disk(n("ocak.giris"), b, GF, 6, 10, 1.5, { tone: "mid", crease: "none" });
  T.disk(n("ocak.giris-yaka"), b, GF, 10, 12, 2.4, { tone: "mid" });

  // Gaz vanası: flanş, gövde, kapak, kol; çıkışı −x yüzünde
  const V = [C[0] + VANA[0], C[1] + VANA[1]];
  T.silindir(n("vana.flans"), b, V, 7.5, 0, 2, { tone: "mid" }, { bevel: 0.4, steps: 28, ek: Dots([0.3, 1.87, 3.44, 5.01].map((a) => at(nokta(V, 6, a, 2))), { size: 0.45 }) });
  const VG = { x: V[0] - 4.5, y: V[1] - 4.5, w: 9, d: 9, r: 1.4 };
  T.kutu(n("vana.govde"), b, VG, 2, 10, { tone: "mid" }, { steps: 3, bevel: 0.4 });
  T.silindir(n("vana.kapak"), b, V, 3.4, 12, 2, { tone: "mid" }, { steps: 18 });
  const KOLP = { x: V[0] - 2.2, y: V[1] - 2, w: 17, d: 4, r: 1.6 };
  T.kutu(n("vana.kol"), b, KOLP, 14, 2.4, { tone: "hi", crease: "lo" }, { steps: 4, bevel: 0.3, ek: Ln(k.ring(V[0], V[1], 1.3, 16.4, P, 10), { tone: "lo" }) + Dots([at([V[0], V[1], 16.4])], { size: 0.45 }) });
  const CF = G.frameOf([V[0], V[1], OCAK.girisZ], [-1, 0, 0], [0, 1, 0], [0, 0, 1]);
  T.disk(n("vana.cikis"), b, CF, 4.5, 8.5, 1.5, { tone: "mid", crease: "none" });
  T.disk(n("vana.cikis-yaka"), b, CF, 8.5, 10.5, 2.4, { tone: "mid" });
  // Vananın gaz hattındaki T bloğuna bağlandığı kısa boru (−y yüzünden)
  const BF = G.frameOf([V[0], V[1], HAT.z], [0, -1, 0], [1, 0, 0], [0, 0, 1]);
  T.disk(n("vana.besleme"), b, BF, 4.5, V[1] - (HAT.y + 4.5), 1.8, { tone: "mid", crease: "none" });
  // Hortum: iki yakanın düz yüzleri arasında, yatay düzlemde tek dirsek
  {
    const rota = G.fillet([[C[0], C[1] - 12, OCAK.girisZ], [C[0], V[1], OCAK.girisZ], [V[0] - 10.5, V[1], OCAK.girisZ]], 12, 9, { P, tube: HORTUM_R });
    R.route(n("hortum"), rota, HORTUM_R, { ends: [true, true], piece: "sabit" });
    tubePieces(rota, HORTUM_R, P, { maxLength: 16, spacing: 1.4 }).forEach((parca, i) => {
      R.put({ name: n(`hortum:${i}`), at: parca.mid, bias: b * T.BANT, svg: tubeSvg(parca, { tone: "mid" }), shapes: [A.tube(parca.points, parca.radii)], bant: b, piece: "sabit", route: n("hortum"), chunk: i });
    });
  }

  // Üçayak: ayak pulları, üç bacak, bilezikler, halka
  const acilar = [FI + Math.PI, FI + Math.PI / 3, FI - Math.PI / 3].map((a) => a - 0.3); // arkadaki bacak ocağın arkasında kaybolmasın
  acilar.forEach((aci, i) => {
    const yer = nokta(C, BACAK_R, aci, 0);
    T.silindir(n(`ucayak.pul${i}`), b, yer, 3.6, 0, 1.4, { tone: "lo" }, { steps: 18 });
    T.silindir(n(`ucayak.bacak${i}`), b, yer, 1.9, 1.4, HALKA.alt - 4 - 1.4, { tone: "mid", crease: "none" }, { steps: 14 });
    T.silindir(n(`ucayak.bilezik${i}`), b, yer, 2.7, HALKA.alt - 4, 4, { tone: "mid" }, { steps: 16 });
  });
  const halkaSekil = R.solid(A.ring(F0, HALKA.alt, HALKA.ust, HALKA.rIn, HALKA.rOut, { name: n("ucayak.halka") }));
  T.koy(n("ucayak.halka"), b, [C[0], C[1], (HALKA.alt + HALKA.ust) / 2], S(G.ringBand(HALKA.alt, HALKA.ust, HALKA.rIn, HALKA.rOut, F0, P, { steps: 64 }), { tone: "mid" }), [halkaSekil]);

  // Tel kafes tabla: kare tel örgü, ortasında seramik disk
  const TELP = { x: C[0] - TEL.yari, y: C[1] - TEL.yari, w: TEL.yari * 2, d: TEL.yari * 2, r: 1.5 };
  {
    const orgu = [];
    for (let i = 1; i < 14; i++) {
      const o = -TEL.yari + i * 5;
      orgu.push(k.lineOnTop([C[0] - TEL.yari, C[1] + o], [C[0] + TEL.yari, C[1] + o], TEL_UST, P), k.lineOnTop([C[0] + o, C[1] - TEL.yari], [C[0] + o, C[1] + TEL.yari], TEL_UST, P));
    }
    const seramik = S(k.cylinder(C[0], C[1], SERAMIK.r, TEL_UST, SERAMIK.h, P, 72), { tone: "lo", crease: "none" }) + Ln(k.ring(C[0], C[1], SERAMIK.r - 2, ZK, P, 64), { tone: "faint" });
    const telSekil = R.solid(A.slab(TELP, HALKA.ust, TEL.h, { name: n("tel") }, 3));
    const seramikSekil = R.solid(A.cylinder(C[0], C[1], SERAMIK.r, TEL_UST, SERAMIK.h, { name: n("tel.seramik"), owner: n("tel") }));
    T.koy(n("tel"), b, [C[0], C[1], HALKA.ust + TEL.h / 2], S(k.slabOf(TELP, HALKA.ust, TEL.h, P, 3), { tone: "mid", crease: "lo" }) + Ln(orgu.join(""), { tone: "faint" }) + seramik, [telSekil, seramikSekil]);
  }

  // Beher
  const kap = O.beher(T, { ad: n("beher"), bant: b, c: C, z: ZK, ri: BEHER.ri, ro: BEHER.ro, boy: BEHER.boy, taban: BEHER.taban, dolu: BEHER.dolu });

  // Termometre ve statif
  const S0 = [C[0] + STATIF[0], C[1] + STATIF[1]];
  const kiskac = [Z_KOL - 4, Z_KOL + 4];
  const term = O.termometre(T, { ad: n("termometre"), bant: b, c: C, zAlt: IC + TERMO.alt, zOlcek: Z_OLCEK, birim: TERMO.birim, min: TERMO.min, max: TERMO.max, zUst: Z_KOL + 12, zBol: AGIZ + 3, kirp: IC, kimlik: kim, kiskac, rSutun: 1.4 });
  O.statif(T, { ad: n("statif"), bant: b, s: S0, c: C, zKol: Z_KOL, rTutulan: term.rCam, tutulan: term.sekiller });

  // ---- Kabın içi: kayıtsız, yuvalarda ----
  const yuzey = IC + BEHER.dolu;
  const rs = BEHER.ri - 0.3;
  const yagCizgi = `<g data-part="yag-cizgi" style="display:none">${Ln(k.ring(C[0], C[1], rs - 3.2, yuzey, P, 64), { tone: "mid" })}${Ln(T.yay3(C, rs, yuzey - 1.8, FI - Math.PI / 2 + 0.02, FI + Math.PI / 2 - 0.02, 32), { tone: "lo" })}</g>`;
  const sivi = O.icerikSutunu(T, { kimlik: `${kim}-sivi`, parca: "sivi", c: C, r: rs, z: IC, h: BEHER.dolu, ek: yagCizgi });
  const mum = O.icerikSutunu(T, { kimlik: `${kim}-mum`, parca: "mum", c: C, r: BEHER.ri - 0.6, z: IC, h: BEHER.dolu, sinif: "ip-kati", ton: "hi", gizli: true, ek: Ln(k.ring(C[0], C[1], BEHER.ri - 4, yuzey, P, 56), { tone: "faint" }) });
  // Buz: yüzeyde yüzen düzensiz parçalar; 0 ve 1 termometrenin arkasında, ötekiler önünde
  const BUZLAR = [
    { r: 16, a: Math.PI - 0.55, boy: 6.4, d: 0.3 },
    { r: 15, a: Math.PI + 0.85, boy: 5.4, d: 1.1 },
    { r: 17, a: 0.25, boy: 6.8, d: 0.7 },
    { r: 15.5, a: -1.35, boy: 5.6, d: 2.0 },
    { r: 16.5, a: 1.5, boy: 5, d: 0.1 },
  ];
  const buzParca = (o, i) => {
    const m = nokta(C, o.r, FI + o.a, 0);
    const kose = [0, 1.15, 2.3, 3.6, 4.9].map((t, j) => [m[0] + o.boy * (j % 2 ? 0.82 : 1) * Math.cos(t + o.d), m[1] + o.boy * (j % 2 ? 0.82 : 1) * Math.sin(t + o.d)]);
    return { svg: `<g data-buz="${i}">${S(k.extrude(kose, yuzey, 3.2, P, { bevel: 0.5 }), { tone: "hi", crease: "lo", className: "ip-buz" })}</g>`, merkez: at([m[0], m[1], yuzey]).map(r2) };
  };
  const buz = BUZLAR.map(buzParca);
  const blokUst = ZK + BLOK.boy;
  const blok = O.icerikSutunu(T, {
    kimlik: `${kim}-blok`,
    parca: "blok",
    c: C,
    r: BLOK.r,
    z: ZK,
    h: BLOK.boy,
    sinif: "ip-metal",
    ton: "hi",
    gizli: true,
    bevel: 1,
    ek: `<path class="is-oyuk" d="${k.pathOf(T.halka(C, 4.2, blokUst, 24), true)}"/>` + Ln(k.ring(C[0], C[1], 4.2, blokUst, P, 24), { tone: "mid" }) + Ln([14, 30].map((dz) => k.sideArc(C[0], C[1], BLOK.r, blokUst - dz, P, 40)).join(""), { tone: "faint" }),
  });
  const termoAlt = `<clipPath id="${kim}-alt"><path data-part="kirp-alt" d="${term.kirpAlt(IC)}"/></clipPath><g class="ip-sivi" data-part="termo-alt" clip-path="url(#${kim}-alt)" style="display:none">${term.altKopya}</g>`;
  T.yuvaEkle(n("beher.arka"), sivi + `<g data-part="buz-arka" style="display:none">${buz[0].svg}${buz[1].svg}</g>` + mum + blok + termoAlt);
  // Kaynama kabarcıkları: düz tonlu küçük halkalar; yerleri ve evreleri sabit, yükseklikleri ciz.js içinde `faz` ile verilir.
  const kabarcik = `<g class="ip-sivi" data-part="kabarcik" clip-path="url(#${kim}-sivi)" style="display:none">${KABARCIK.map((_, i) => `<circle class="is-kabarcik" data-kabarcik="${i}" r="1"/>`).join("")}</g>`;
  const suCizgi = `<g class="ip-sivi" data-part="su-cizgi" style="display:none">${Ln(k.pathOf(T.yakinYay(C, term.rCam + 0.05, yuzey, 12)), { tone: "hi" })}</g>`;
  T.yuvaEkle(n("termometre"), `<g data-part="buz-on" style="display:none">${buz[2].svg}${buz[3].svg}${buz[4].svg}</g>` + kabarcik + suCizgi);

  out.buz = buz.map((x) => x.merkez);
  out.term = term;
  out.kap = kap;
  out.C = C;
  return out;
}
const SOL = istasyon("sol");
const SAG = istasyon("sag");

T.yerles();
// Kayıtsız içeriğin sırası: alev halkadan ve tabladan önce; kabın içi arka camdan sonra, termometre ondan sonra, ön cam en sonda.
for (const i of ["sol", "sag"]) {
  T.once(`${i}.ocak.dudak`, `${i}.ucayak.halka`);
  T.once(`${i}.ocak.dudak`, `${i}.tel`);
  T.once(`${i}.tel`, `${i}.beher.taban`);
  T.once(`${i}.beher.taban`, `${i}.beher.arka`);
  T.once(`${i}.beher.arka`, `${i}.termometre`);
  T.once(`${i}.termometre`, `${i}.beher.on`);
}
// İki istasyon aynı sırayla dizilmiş olmalı: sağdaki, soldakinin ötelenmiş kopyası olarak çizilir.
{
  const adlar = (i) => R.items.filter((item) => item.bant === BANT_IST[i]).map((item) => item.name.replace(/^(sol|sag)\./, ""));
  const a = adlar("sol");
  const b = adlar("sag");
  if (a.length !== b.length || a.some((ad, j) => ad !== b[j])) throw new Error(`iki istasyonun çizim sırası ayrı: ${a.filter((ad, j) => ad !== b[j]).slice(0, 6).join(", ")}`);
}

const KAYMA = [at([MERKEZ.sag[0], MERKEZ.sag[1], 0])[0] - at([MERKEZ.sol[0], MERKEZ.sol[1], 0])[0], at([MERKEZ.sag[0], MERKEZ.sag[1], 0])[1] - at([MERKEZ.sol[0], MERKEZ.sol[1], 0])[1]].map(r2);
const birim = (v) => [at([v[0], v[1], 0])[0] - at([0, 0, 0])[0], at([v[0], v[1], 0])[1] - at([0, 0, 0])[1]];
const C = MERKEZ.sol;
// İstasyonun altı: eksenin ekrandaki hizasında, tezgâhın ön alt kenarının biraz altı.
const etiketYeri = (() => {
  const yOn = PLATE.y + PLATE.d;
  const x = C[0] + ((yOn - C[1]) * Math.cos(FI)) / Math.sin(FI);
  const p = at([x, yOn, -PLATE_H - FOOT_H]);
  return [p[0], p[1] + 12];
})();
const D = {
  onek: "is-",
  arka: tezgah.halo + T.katman(0),
  ist: T.katman(BANT_IST.sol, { ad: (ad) => ad.replace(/^sol\./, "") }),
  orta: T.katman(2),
  kayma: KAYMA,
  uz: r2(T.uz * 1000) / 1000,
  ilk: { icerik: "su", seviye: 0.6, sicaklik: 20, alev: 0, kati: 1, kaynama: 0, faz: 0 },
  kap: { ic: IC, dolu: BEHER.dolu },
  blok: { z0: ZK, boy: BLOK.boy, tepe: at([C[0], C[1], ZK + BLOK.boy]).map(r2) },
  term: { min: TERMO.min, max: TERMO.max, birim: TERMO.birim, alt: TERMO.alt },
  alev: { taban: SOL.alevTaban.map(r2) },
  buz: SOL.buz,
  // [taban düzeyinde ekrandaki x, y, yarıçap (figür birimi), evre kayması, tur sayısı]
  kabarcik: KABARCIK.map(([r, a, boy, kayma, tur]) => [...at(nokta(C, r, FI + a, IC)).map(r2), r2(boy * KS), kayma, tur]),
  saat: { c: at([SAAT[0], SAAT[1], SAAT_UST + 0.2]).map(r2), ex: birim([1, 0]).map((v) => Math.round(v * 1e4) / 1e4), ey: birim([0, 1]).map((v) => Math.round(v * 1e4) / 1e4), sifir: Math.round(SAAT_SIFIR * 1e4) / 1e4, boy: SAAT_R - 5, kuyruk: 4 },
  nokta: {
    termometre: SOL.term.tepe.map(r2),
    kap: at([C[0], C[1], AGIZ]).map(r2),
    etiket: etiketYeri.map(r2),
    alev: at([C[0], C[1], OCAK.dudak + 9]).map(r2),
    sureolcer: at([SAAT[0], SAAT[1], SAAT_UST]).map(r2),
  },
};

// ---- Stil ----
const IS_CSS = `
.is-oyuk{fill:var(--is-oyuk);stroke:none}
.is-kabarcik{fill:var(--anatomy-top);stroke:var(--anatomy-hi);stroke-width:.7px}
`;
const SAYFA_CSS = `${O.PARCA_CSS}${IS_CSS}${O.siviCss("sayfa")}
.ip-stage{position:relative;border-radius:10px;--is-oyuk:#dcdcd8;--ip-isi:#ecece7;--ip-isi-ic:#a6a6aa}
.iso[data-theme="dark"] .ip-stage{--is-oyuk:#0a0a0a;--ip-isi:#2b2b2b;--ip-isi-ic:#8c8c8c}
.ip-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
@media (max-width:640px){.iso-plate-corner[data-corner="readout"]{font-size:9px;letter-spacing:0}}
`;
const TAHTA_CSS = `${O.kitCss()}${O.PARCA_CSS}${IS_CSS}${O.tahtaCss("isi")}.isi{--is-oyuk:#080c1a}\n`;

// ---- Tek başına sayfa ----
const CIZ = O.oku(join(HERE, "ciz.js"));
const { govdeOf } = new Function(`${CIZ}\nreturn { govdeOf };`)();
const ETIKET =
  "İkiz ısıtma düzeneği: bir laboratuvar tezgâhında yan yana iki özdeş istasyon. Her birinde üçayağın üstündeki tel tablada cam bir beher, altında hortumla gaz vanasına bağlı küçük bir gaz ocağı, behere statif ve kıskaçla sarkıtılmış bir termometre var. Ortada kadranlı bir süreölçer durur.";
const svg = k.figureSvg({ width: W, height: H, label: ETIKET, body: govdeOf(D) });
const CANLI = O.oku(join(HERE, "canli.js")).replace("__DATA__", JSON.stringify({ ...D, arka: "", ist: "", orta: "" }));
const ad = THEME === "light" ? "isitma-light.html" : "isitma.html";
const boy = O.sayfaYaz({
  dosya: join(HERE, ad),
  tema: THEME,
  baslik: "İkiz ısıtma düzeneği",
  sekilNo: "Şekil 2",
  ipucu: "gösteri turu",
  gosterge: "sol 20 °C · sağ 20 °C · 0 sn",
  anahtarlar: [
    { mark: "lit", label: "Termometre sütunu: boyu sıcaklıkla doğru orantılı" },
    { mark: "raised", label: "İki özdeş istasyon: ocak, üçayak, tel tabla, beher" },
    { mark: "dim", label: "Kabın içi: su, zeytinyağı, buzlu su, bal mumu ya da metal blok" },
  ],
  aciklama:
    "İki istasyon aynı parçalardan kurulmuştur; değişen yalnızca kabın içi ve alevin boyudur. Termometrelerin ölçeği aynıdır (−20 °C ile 120 °C arası, 10 °C'ta bir çentik), bu yüzden iki sütunun boyu doğrudan karşılaştırılır. Buzlu beherde buz bitene kadar sütun 0 °C'ta durur. Süreölçerin ibresi 60 saniyede bir tur atar.",
  svg,
  css: SAYFA_CSS,
  script: CIZ + CANLI,
  genislik: 880,
  etiket: ETIKET,
});
console.log("yazıldı", ad, `${(boy / 1024).toFixed(0)} KB`, `${R.items.length} öğe`, `${R.solids.length} katı`, `ölçek ${KS.toFixed(3)}`);

// ---- Ders modülü: fizik/enerji/dersler/isitma-sekil.js (window.ISITMA) ----
{
  const sx = (c, z) => at([c[0], c[1], z]);
  const orta = [(sx(MERKEZ.sol, 0)[0] + sx(MERKEZ.sag, 0)[0]) / 2, (sx(MERKEZ.sol, 60)[1] + sx(MERKEZ.sag, 60)[1]) / 2];
  const istKutu = (i) => O.kadrajOf([sx(MERKEZ[i], 0)[0] - 10 * KS, (sx(MERKEZ[i], 66)[1] + sx(MERKEZ[i], Z_TEPE)[1]) / 2], ((sx(MERKEZ[i], 60)[1] - sx(MERKEZ[i], Z_TEPE + 8)[1]) * W) / H, W, H);
  const KADRAJ = {
    tum: [0, 0, W, H],
    sol: istKutu("sol"),
    sag: istKutu("sag"),
    kaplar: O.kadrajOf([orta[0] - 4 * KS, orta[1] - 6], sx(MERKEZ.sag, 0)[0] - sx(MERKEZ.sol, 0)[0] + 215 * KS, W, H),
  };
  const uclar = k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0).map((p) => at(p)[0]);
  const DOLULUK = Math.round(((Math.max(...uclar) - Math.min(...uclar)) / W) * 100);
  const BASLIK = `Ş2 · İkiz ısıtma düzeneği (izometrik figür). ÜRETİLMİŞ DOSYA: elle değiştirme.
   Kaynak: plan/fizik/enerji/sekil/s2-isitma/build.mjs ve ciz.js, ortak parçalar plan/fizik/enerji/sekil/parcalar.mjs
   (anatomy kiti, MIT; bkz. plan/fizik/enerji/sekil/kit/LICENSE). Sözleşme: plan/fizik/enerji/IZOMETRIK.md 6b.

   Ne var: tezgâhta yan yana iki özdeş istasyon ('sol', 'sag'). Her birinde gaz ocağı (hortumla tezgâhtaki vanaya bağlı), üçayak,
   tel tabla, cam beher, statif ve kıskaçla behere sarkıtılmış termometre. Ortada kadranlı süreölçer. Figürde yazı ve rakam yoktur;
   etiket, sayı ve ok dersin düz SVG katmanına yazılır ve f.nokta(ad) ile figüre bağlanır. Figür kendi başına hareket etmez:
   her değişiklik aşağıdaki çağrılarla verilir (hareket için c.tween içinde çağır). Sayfa bu dosyayı ders dosyasından önce yükler:
   <script src="dersler/isitma-sekil.js"></script>

   const f = ISITMA.kur(c, svg, { x, y, h });
       Figürü tahtaya (1000 × 562) sol üst köşesi x, y, yüksekliği h olacak biçimde koyar; genişlik h × ISITMA.oran (1,45).
       f.el kök öğe (f.el.style.opacity ile bütün figür soldurulur), f.w ve f.h tahta birimiyle boyutu.
       Düzenek kutuda ortalanmıştır: boyunu doldurur, eninin yaklaşık yüzde ${DOLULUK}'ini kaplar; iki yanda boşluk kalır.
       Yazıyı kutunun kenarına göre değil, f.nokta ile bulduğun yere göre hizala.

   f.ayar(ist, { icerik, seviye, sicaklik, alev, kati, kaynama, faz })      ist: 'sol' ya da 'sag'. Verilmeyen alan değişmez; anında uygulanır.
       icerik    'su' | 'yag' (zeytinyağı: sarımsı ton, yüzeyde ikinci çizgi) | 'buz' (suda yüzen buz parçaları) |
                 'mum' (dipte katı bal mumu, üstünde erimiş mum) | 'blok' (beher yerine tablada metal blok) | 'bos' (boş beher)
       seviye    0…1 kabın doluluğu; 1'de sıvı ${BEHER.dolu} mm (kabın boyu ${BEHER.boy} mm). 'blok' içerikte bloğun boyu: 0,5 kısa blok, 1 uzun blok.
       sicaklik  °C; termometre sütununun boyu. ${TERMO.min}…${TERMO.max} arası doğrusal, dışı kırpılır. Çentikler 10 °C'ta bir, 50'de bir uzun
                 (uzun çentikler: 0, 50, 100). İki termometrenin ölçeği aynıdır; sütunlar yan yana karşılaştırılabilir.
       alev      0 kapalı (görünmez), 1 kısık, 2 açık. Ara değerler alevi yumuşakça büyütür (0 → 2 tween edilebilir).
       kati      0…1 erimemiş katının oranı. 'buz': 1'de beş parça; 0'a giderken parçalar küçülür ve tek tek kaybolur, su düzeyi değişmez.
                 'mum': katının boyu = kati × sıvı boyu; 1'de hepsi katı, 0'da hepsi sıvı. Öteki içeriklerde etkisizdir.
                 kati: 0 iken 'buz' ile 'su' aynı görünür (aynı düzey, aynı ton): erime bitince içerik sıçramadan 'su' yapılabilir.
                 'mum', kati: 0 tümüyle erimiş mumdur (kendi tonunda).
       kaynama   0…1 kaynama kabarcıklarının yoğunluğu ve görünürlüğü: 0'da hiç yok, 1'de on iki kabarcık (birer birer eklenir).
                 Kabarcıklar sıvının içinde düz tonlu küçük halkalardır; buhar çizilmez. 'blok' ve 'bos' içerikte görünmez.
       faz       kabarcıkların yükselme evresi; 0 → 1 bir tam döngü: her kabarcık sıvının tabanından (mumda katının üstünden)
                 yüzeyine çıkar ve başa döner. faz 0 ile 1 aynı görünür; tam sayı kısmı atılır, yani c.tween içinde
                 faz: 3 * e yazmak üç döngü oynatır. Figür fazı kendi ilerletmez.
       Başlangıç: iki istasyon { icerik: 'su', seviye: 0.6, sicaklik: 20, alev: 0, kati: 1, kaynama: 0, faz: 0 }.
   f.goster(ist, a)        istasyonu (ocağı, hortumu, vanası ve statifiyle) 0…1 saydamlıkla gösterir; 0'da tümüyle kalkar.
   f.sure(sn)              süreölçerin ibresi; bir tur 60 sn (sıfır, kadranın izleyiciden uzak ucunda; saat yönünde döner).
   f.durum(ist)            o istasyonun şu anki ayarları ve süre: { icerik, seviye, sicaklik, alev, kati, kaynama, faz, sure }.
   f.nokta(ad) → [x, y]    tahta birimiyle, figürün o anki durumuna ve kadrajına göre:
       'sol.termometre', 'sag.termometre'   sütunun tepesi (sıcaklıkla birlikte oynar; yazıyı sağına koy: x + 12)
       'sol.kap', 'sag.kap'                 kabın üst kenarının ortası (blokta bloğun üst yüzünün ortası)
       'sol.alev', 'sag.alev'               alevin ortası (ocağın ağzının hemen üstü)
       'sol.etiket', 'sag.etiket'           istasyonun altı: tezgâhın ön kenarının altında, istasyon ekseninin hizasında
                                            (yazıyı text-anchor: middle ile bu noktanın 24 birim altına koy)
       'sureolcer'                          kadranın ortası
   f.gorunur(ad) → true/false   nokta şu anki kadrajın içinde mi. Yakınlaşınca dışarıda kalan noktanın etiketi figür kutusunun,
                           hatta tahtanın dışına düşer: f.bak ile yakınlaşan sahnede her karede etiketi buna göre gizle
                           (el.style.display = f.gorunur(ad) ? '' : 'none').
   f.bak(kutu)             figürün [x, y, w, h] bölgesine yaklaşır (figür birimi). Hazır kutular ISITMA.kadraj:
       tum (bütün düzenek), sol, sag (o istasyonun tablası, beheri ve termometresinin tamamı; yaklaşık ${(H / istKutu("sol")[3]).toFixed(1)} kat),
       kaplar (iki ocak, iki kap ve süreölçer; termometrelerin üst yarısı kadraj dışında kalır; yaklaşık ${(W / (sx(MERKEZ.sag, 0)[0] - sx(MERKEZ.sol, 0)[0] + 215 * KS)).toFixed(1)} kat).
       Geçiş: c.tween(900, (e) => f.bak(a.map((v, i) => Ders.lerp(v, b[i], e))), Ders.ease.inOut). f.nokta kadrajı izler.
   ISITMA.oran             1,45 (en / boy)
   ISITMA.sabit            { min, max, birim (bir °C'ın figürdeki boyu, figür birimi), dolu, blokBoy }
   Etiket yazıları en az 24 tahta birimi olmalı: 22 birim, olc.js'in 750x402 ölçümünde 12 px'in altında kalır (11,4 px).
   Kırpma kimlikleri her kurulumda ayrı önek alır (sahne değişince çakışmaz); aynı tahtaya iki figür kurmak denenmedi.`;
  const kb = O.dersModuluYaz({
    dosya: join(KOK, "fizik", "enerji", "dersler", "isitma-sekil.js"),
    ad: "ISITMA",
    sinif: "isi",
    baslik: BASLIK,
    W,
    H,
    css: TAHTA_CSS,
    ciz: CIZ,
    veri: D,
    kadraj: KADRAJ,
    sabit: { min: TERMO.min, max: TERMO.max, birim: r2(-T.uz * TERMO.birim), dolu: BEHER.dolu, blokBoy: BLOK.boy },
  });
  console.log("yazıldı fizik/enerji/dersler/isitma-sekil.js", `${kb.toFixed(0)} KB`);
}

if (process.argv.includes("--boyut")) {
  const boylar = R.items.map((item) => [item.name, item.svg.length + (T.yuva.get(item.name) ?? "").length]).filter(([ad]) => !ad.startsWith("sag.")).sort((a, b) => b[1] - a[1]);
  console.log(boylar.slice(0, 28).map(([ad, n]) => `${(n / 1024).toFixed(1)} ${ad}`).join("\n"));
  console.log("arka", (D.arka.length / 1024).toFixed(0), "ist", (D.ist.length / 1024).toFixed(0), "orta", (D.orta.length / 1024).toFixed(0), "KB");
}
A.auditOrExit(R, P);
