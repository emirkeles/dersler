// Ş6 · Duvar kesiti ve çift cam: geometri, kayıt, tek başına sayfa ve ders modülü.
// node build.mjs [--light] [--audit] [--boyut] [--az=72] [--el=30]
// Yazar: duvar.html | duvar-light.html (bu klasöre) ve fizik/enerji/dersler/duvar-sekil.js (window.DUVAR).
//
// Dünya: x duvarın kalınlığı boyunca (iç yan x < 0, dış yan x > DUVAR_X), y duvarın uzunluğu boyunca; kesit düzlemi y = 0
// ve izleyiciye dönük (azimut 72°: kesit yüzü neredeyse cepheden, katmanlar soldan sağa okunur). z = 0 taban plakasının üstü.
// Yalıtım levhası tek hareketli parçadır: duvarın dış yüzünde (pay 0) ile KAYMA kadar ötede (pay 1) arasında +x ötelemesi.
// Denetim iki ucu ve aradaki kareleri kitin kendi düzeniyle görür (R.order = ["levha"], bant 2'nin `move` alanı).
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
const W = 660;
const H = 600; // oran 1,1 (IZOMETRIK.md 6b)
const AZ = sayi("az", 72);
const EL = sayi("el", 30);

// ---- Ölçüler (1 birim yaklaşık 5 mm) ----
const SIVA = 5; // iç ve dış sıva
const TUGLA = 38;
const DUVAR_X = SIVA + TUGLA + SIVA; // 48: duvarın kalınlığı
const BOY = 60; // duvar parçasının uzunluğu (y: −BOY … 0)
const KURS = 12; // bir tuğla sırası (derz dahil)
const ZEMIN = 1; // döşeme, duvarın altındaki harç yatağı ve dış zemin kaplamasının kalınlığı; duvar bunun üstünde başlar
const Z_DENIZ = ZEMIN + 7 * KURS; // pencere açıklığının altı
const Z_LENTO = ZEMIN + 11 * KURS; // açıklığın üstü
const Z_UST = ZEMIN + 13 * KURS; // duvarın tepesi
const ACIK = 36; // açıklığın kesitten geriye derinliği (y: −ACIK … 0)
const KASA = { x: 12, w: 24, kalin: 6 }; // pencere kasası: duvar kalınlığının ortasında
const CAM = { dis: 27, ic: 17.6, kalin: 3.4 }; // iki camın x'i (dış cam hep var; iç cam ve çıta çift camda)
const RAY = 1.6; // levhanın kaydığı rayların yüksekliği
const LEVHA = { kalin: 14, kaplama: 1.4, alt: ZEMIN + RAY };
const LEVHA_X = LEVHA.kalin + LEVHA.kaplama; // 15,4
const KAYMA = 4 * LEVHA.kalin; // 56: çıkarılmış levha bu kadar ötede durur
const PLATE = { x: -45, y: -69, w: 223, d: 103, r: 8 };
const PLATE_H = 10;
const FOOT_H = 5;
const ON = PLATE.y + PLATE.d; // tabanın ön kenarı

const TERMO = { min: -10, max: 50, birim: 1.8, alt: 19, rCam: 3.6, rHazne: 4.2, rSutun: 1.4, hazneBoy: 11 };
const Z_OLCEK = 38;
const Z_MAX = Z_OLCEK + (TERMO.max - TERMO.min) * TERMO.birim;
const Z_KOL = Z_MAX + 9;
const KOL = { ic: 36, dis: 56 }; // statif direği ile termometre arası: dış direk termometrenin önündedir, başlığı sütunu örtmesin diye uzakta durur
// İki termometre izleyiciye göre aynı derinlikte durur (ekranda aynı hiza): x·cos a + y·sin a eşit.
const RAD = Math.PI / 180;
const DIS_T = [DUVAR_X + KAYMA + LEVHA_X + 41, -42];
const IC_X = -24;
const IC_T = [IC_X, DIS_T[1] + ((DIS_T[0] - IC_X) * Math.cos(AZ * RAD)) / Math.sin(AZ * RAD)];
const IC_S = [IC_T[0], IC_T[1] - KOL.ic]; // iç statifin direği termometrenin arkasında (ekranda duvar yanında)
const DIS_S = [DIS_T[0], DIS_T[1] + KOL.dis]; // dış statifin direği termometrenin önünde (ekranda duvar yanında)

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [0, -BOY, Z_UST], [DUVAR_X, -BOY, Z_UST], [IC_S[0], IC_S[1], Z_KOL + 22], [DIS_S[0], DIS_S[1], Z_KOL + 22]],
  W,
  H,
  { pad: 22, azimuth: AZ, elevation: EL },
);
// Bantlar: 0 taban, 1 duvar ve pencere, 2 yalıtım levhası (hareketli), 3 kesit düzleminin önündekiler ve dış termometre.
const T = O.atolye(P, { bantlar: [{ piece: "sabit" }, { piece: "sabit" }, { piece: "levha", move: [KAYMA, 0, 0] }, { piece: "sabit" }] });
T.R.order = ["levha"];
const { R, KS, at, S, Ln, Dots } = T;
const r2 = (v) => Math.round(v * 100) / 100;
const yol = (noktalar, kapali = false) => k.pathOf(noktalar.map((p) => at(p)), kapali);
const dort = (p, q, r, s) => yol([p, q, r, s], true);
// Sabit tohumlu sayı üreteci (doku noktaları her derlemede aynı yere düşsün).
const rasgele = (tohum) => () => ((tohum = (tohum * 1664525 + 1013904223) >>> 0) / 4294967296);

// ---- Taban: plaka, iç döşeme (parke), dış zemin (çakıl), aradaki çıta, levhanın rayları ----
const tezgah = O.tabanPlakasi(T, { ad: "tezgah", bant: 0, plan: PLATE, kalinlik: PLATE_H, ayakBoy: FOOT_H, cetvel: { x: 2, w: DUVAR_X - 4 }, etiket: { x: 27.5, y: 2.5, w: 18, d: 15, r: 1.2 } });
const DOSEME = { x: PLATE.x + 6, y: PLATE.y + 5, w: -(PLATE.x + 6), d: PLATE.d - 10, r: 0 };
const DIS_ZEMIN = { x: DUVAR_X, y: PLATE.y + 5, w: PLATE.x + PLATE.w - 6 - DUVAR_X, d: PLATE.d - 10, r: 0 };
{
  // Parke: uzun tahtalar y boyunca, şaşırtmalı baş derzleri.
  const cizgi = [];
  const en = 7;
  const adet = Math.floor(DOSEME.w / en);
  for (let i = 1; i < adet; i++) cizgi.push(k.lineOnTop([DOSEME.x + i * en, DOSEME.y], [DOSEME.x + i * en, DOSEME.y + DOSEME.d], ZEMIN, P));
  for (let i = 0; i < adet; i++) {
    const x0 = DOSEME.x + i * en;
    const x1 = i === adet - 1 ? DOSEME.x + DOSEME.w : x0 + en;
    for (let y = DOSEME.y + 14 + ((i * 17) % 40); y < DOSEME.y + DOSEME.d - 4; y += 44) cizgi.push(k.lineOnTop([x0, y], [x1, y], ZEMIN, P));
  }
  T.kutu("doseme", 0, DOSEME, 0, ZEMIN, { tone: "lo", crease: "lo" }, { steps: 1, ek: Ln(cizgi.join(""), { tone: "lo" }) });
  // Dış zemin: seyrek çakıl noktaları (rayların üstüne düşmez).
  const rs = rasgele(7);
  const cakil = [];
  while (cakil.length < 70) {
    const x = DIS_ZEMIN.x + 3 + rs() * (DIS_ZEMIN.w - 6);
    const y = DIS_ZEMIN.y + 3 + rs() * (DIS_ZEMIN.d - 6);
    if (x < DUVAR_X + KAYMA + LEVHA_X + 8 && ((y > -17 && y < -8) || (y > -53 && y < -44))) continue;
    cakil.push(at([x, y, ZEMIN]));
  }
  T.kutu("dis-zemin", 0, DIS_ZEMIN, 0, ZEMIN, { tone: "lo", crease: "lo" }, { steps: 1, ek: Dots(cakil, { size: 0.55, tone: "lo" }) });
  // İç ile dışı ayıran çıta: kesit düzleminin önünde, duvar kalınlığının ortasında, duvardan cetvel şeridine kadar.
  // Duvarın altındaki harç yatağı: iki zeminle aynı kalınlıkta; duvar bunun üstünde durur.
  T.kutu("yatak", 0, { x: 0, y: -BOY, w: DUVAR_X, d: BOY, r: 0 }, 0, ZEMIN, { tone: "lo", crease: "none" }, { steps: 1 });
  T.kutu("cita", 0, { x: DUVAR_X / 2 - 0.6, y: 1, w: 1.2, d: ON - 15 - 1, r: 0 }, 0, 0.6, { tone: "mid", crease: "none" }, { steps: 1 });
  // Raylar ve uç durdurucuları: levha bunların üstünde kayar.
  const rayBoy = KAYMA + LEVHA_X + 6;
  for (const [i, y] of [-14, -50].entries()) {
    T.kutu(`ray${i}`, 1, { x: DUVAR_X, y, w: rayBoy, d: 3, r: 0 }, ZEMIN, RAY, { tone: "mid" }, { steps: 1 });
    const D = { x: DUVAR_X + KAYMA + LEVHA_X + 1.6, y: y - 1.5, w: 3.4, d: 6, r: 0.8 };
    T.kutu(`durdurucu${i}`, 3, D, ZEMIN + RAY, 4.4, { tone: "mid" }, { steps: 2, bevel: 0.3, ek: Dots([at([D.x + D.w / 2, D.y + D.d / 2, ZEMIN + RAY + 4.4])], { size: 0.45 }) });
  }
}

// ---- Duvar: iç sıva, tuğla, dış sıva; açıklığın altı, arkası (ayak) ve üstü ----
const tuglaYuz = (z0, z1) => {
  // Kesit yüzünde (y = 0) derzler ve yatay deliklerin ağızları.
  const derz = [];
  const delik = [];
  for (let z = z0; z < z1 - 1e-6; z += KURS) {
    if (z > z0) derz.push(yol([[SIVA, 0, z], [SIVA + TUGLA, 0, z]]));
    for (const x of [SIVA + 3.5, SIVA + 15, SIVA + 26.5]) delik.push(dort([x, 0, z + 3.6], [x + 8, 0, z + 3.6], [x + 8, 0, z + 8.6], [x, 0, z + 8.6]));
  }
  return `<path class="dv-oyuk" d="${delik.join("")}"/>` + Ln(delik.join(""), { tone: "lo" }) + Ln(derz.join(""), { tone: "lo" });
};
const DUBEL = [[-11, 22], [-49, 22], [-11, 68], [-49, 68], [-16, 145], [-46, 145], [-48, 109]]; // [y, z]: dübellerin yeri
{
  const tam = (x, w) => ({ x, y: -BOY, w, d: BOY, r: 0 });
  const katman = (ad, z, h, ekTugla, ekDis) => {
    T.kutu(`duvar.${ad}.ic-siva`, 1, tam(0, SIVA), z, h, { tone: "hi", crease: "lo" }, { steps: 1 });
    T.kutu(`duvar.${ad}.tugla`, 1, tam(SIVA, TUGLA), z, h, { tone: "hi", crease: "lo" }, { steps: 1, ek: ekTugla });
    T.kutu(`duvar.${ad}.dis-siva`, 1, tam(SIVA + TUGLA, SIVA), z, h, { tone: "hi", crease: "lo" }, { steps: 1, ek: ekDis });
  };
  const delikler = (liste) => Dots(liste.map(([y, z]) => at([DUVAR_X, y, z])), { size: 0.6, tone: "lo" }); // dış sıvadaki dübel delikleri
  katman("alt", ZEMIN, Z_DENIZ - ZEMIN, tuglaYuz(ZEMIN, Z_DENIZ), delikler(DUBEL.filter(([, z]) => z < Z_DENIZ)));
  // Üst: tepe yüzünde tuğlaların baş derzleri
  const bas = [-20, -40].map((y) => yol([[SIVA, y, Z_UST], [SIVA + TUGLA, y, Z_UST]])).join("");
  katman("ust", Z_LENTO, Z_UST - Z_LENTO, tuglaYuz(Z_LENTO, Z_UST) + Ln(bas, { tone: "lo" }), delikler(DUBEL.filter(([, z]) => z > Z_LENTO)));
  // Ayak: açıklığın arkasında kalan duvar; açıklığa bakan yüzü sıvalıdır (düz).
  T.kutu("duvar.ayak", 1, { x: 0, y: -BOY, w: DUVAR_X, d: BOY - ACIK, r: 0 }, Z_DENIZ, Z_LENTO - Z_DENIZ, { tone: "hi", crease: "lo" }, { steps: 1, ek: delikler(DUBEL.filter(([, z]) => z > Z_DENIZ && z < Z_LENTO)) });
  // Süpürgelik (iç yanda, döşemenin üstünde): kesitte küçük bir dikdörtgen.
  T.kutu("supurgelik", 1, { x: -1.8, y: -BOY, w: 1.8, d: BOY, r: 0 }, ZEMIN, 8, { tone: "mid" }, { steps: 1 });
}

// ---- Pencere: iç ve dış denizlik, kasa (alt ve üst kayıt, arkada dikme), dış cam; çift camda iç cam ve çıtalar ----
{
  const kayit = (z) => ({ x: KASA.x, y: -ACIK + KASA.kalin, w: KASA.w, d: ACIK - KASA.kalin, r: 0 });
  T.kutu("pencere.denizlik-ic", 1, { x: -3, y: -ACIK, w: KASA.x + 3, d: ACIK, r: 0 }, Z_DENIZ, 2, { tone: "mid" }, { steps: 1 });
  T.kutu("pencere.denizlik-dis", 1, { x: KASA.x + KASA.w, y: -ACIK, w: DUVAR_X - KASA.x - KASA.w, d: ACIK, r: 0 }, Z_DENIZ, 1.6, { tone: "mid" }, { steps: 1 });
  const DIKME = { x: KASA.x, y: -ACIK, w: KASA.w, d: KASA.kalin, r: 0 };
  T.kutu("pencere.dikme", 1, DIKME, Z_DENIZ, Z_LENTO - Z_DENIZ, { tone: "hi", crease: "lo" }, { steps: 1 });
  T.kutu("pencere.kayit-alt", 1, kayit(), Z_DENIZ, KASA.kalin, { tone: "hi", crease: "lo" }, { steps: 1 });
  T.kutu("pencere.kayit-ust", 1, kayit(), Z_LENTO - KASA.kalin, KASA.kalin, { tone: "hi", crease: "lo" }, { steps: 1 });
  const z0 = Z_DENIZ + KASA.kalin;
  const z1 = Z_LENTO - KASA.kalin;
  const camPlan = (x) => ({ x, y: -ACIK + KASA.kalin, w: CAM.kalin, d: ACIK - KASA.kalin, r: 0 });
  // Camın kesilmiş kenarı (kesit yüzü) açık tonla doludur: ince cam, kesitte parlak bir şerit olarak okunur.
  const kesik = (x) => `<path class="dv-cam-kesit" d="${dort([x, 0, z0], [x + CAM.kalin, 0, z0], [x + CAM.kalin, 0, z1], [x, 0, z1])}"/>`;
  T.kutu("pencere.cam-dis", 1, camPlan(CAM.dis), z0, z1 - z0, { tone: "hi", crease: "none", className: "ip-cam dv-cam" }, { steps: 1, ic: kesik(CAM.dis) });
  T.kutu("pencere.cam-ic", 1, camPlan(CAM.ic), z0, z1 - z0, { tone: "hi", crease: "none", className: "ip-cam dv-cam" }, { steps: 1, grup: "cift", ic: kesik(CAM.ic) });
  // Çıta (ara boşluk çerçevesi): iki camın arasında, altta, üstte ve arkada
  const ax = CAM.ic + CAM.kalin;
  const aw = CAM.dis - ax;
  const CITA = 3;
  const delik = (z) => Dots([-8, -16, -24].map((y) => at([ax + aw / 2, y, z])), { size: 0.4, tone: "lo" }); // nem alıcı delikleri
  T.kutu("pencere.cita-alt", 1, { x: ax, y: -ACIK + KASA.kalin, w: aw, d: ACIK - KASA.kalin, r: 0 }, z0, CITA, { tone: "mid" }, { steps: 1, grup: "cift", ek: delik(z0 + CITA) });
  T.kutu("pencere.cita-ust", 1, { x: ax, y: -ACIK + KASA.kalin, w: aw, d: ACIK - KASA.kalin, r: 0 }, z1 - CITA, CITA, { tone: "mid" }, { steps: 1, grup: "cift" });
  T.kutu("pencere.cita-arka", 1, { x: ax, y: -ACIK + KASA.kalin, w: aw, d: CITA, r: 0 }, z0 + CITA, z1 - z0 - 2 * CITA, { tone: "mid" }, { steps: 1, grup: "cift" });
}

// ---- Yalıtım levhası (bant 2; duvardaki yerinde kurulur): gözenekli levha, üstünde ince kaplama, dübel başları, tutamak ----
{
  const x0 = DUVAR_X;
  const xk = x0 + LEVHA.kalin;
  const xd = xk + LEVHA.kaplama;
  const rs = rasgele(23);
  // Gözenek: kesit yüzünde ve üst yüzde seyrek noktalar
  const gozenekYuz = (z0, z1, n) => Array.from({ length: n }, () => at([x0 + 1.4 + rs() * (LEVHA.kalin - 2.8), 0, z0 + 2 + rs() * (z1 - z0 - 4)]));
  const gozenekUst = (y0, y1, z, n) => Array.from({ length: n }, () => at([x0 + 1.4 + rs() * (LEVHA.kalin - 2.8), y0 + 2 + rs() * (y1 - y0 - 4), z]));
  const bas = (liste) => Ln(liste.map(([y, z]) => k.sideRing([xd, y, z], 2.2, "x", P, 14)).join(""), { tone: "mid" }) + Dots(liste.map(([y, z]) => at([xd, y, z])), { size: 0.5 });
  const parca = (ad, y0, d, z, h, n, ustN, dubel) => {
    T.kutu(`levha.${ad}`, 2, { x: x0, y: y0, w: LEVHA.kalin, d, r: 0 }, z, h, { tone: "hi", crease: "lo" }, { steps: 1, ek: Dots([...(y0 + d > -1e-6 ? gozenekYuz(z, z + h, n) : []), ...gozenekUst(y0, y0 + d, z + h, ustN)], { size: 0.6, tone: "mid" }) });
    T.kutu(`levha.kaplama-${ad}`, 2, { x: xk, y: y0, w: LEVHA.kaplama, d, r: 0 }, z, h, { tone: "hi", crease: "none" }, { steps: 1, ek: bas(dubel) });
  };
  parca("alt", -BOY, BOY, LEVHA.alt, Z_DENIZ - LEVHA.alt, 40, 6, DUBEL.filter(([, z]) => z < Z_DENIZ));
  parca("orta", -BOY, BOY - ACIK - 0.8, Z_DENIZ, Z_LENTO - Z_DENIZ, 0, 0, DUBEL.filter(([, z]) => z > Z_DENIZ && z < Z_LENTO));
  parca("ust", -BOY, BOY, Z_LENTO, Z_UST - Z_LENTO, 12, 12, DUBEL.filter(([, z]) => z > Z_LENTO));
  // Tutamak: dış yüzde, iki saplamada düşey çubuk
  const ty = -30;
  const tx = xd + 5;
  const cubuk = T.silindir("levha.tutamak", 2, [tx, ty], 1.3, 36, 20, { tone: "mid", crease: "none" }, { steps: 12 });
  for (const [i, z] of [40, 52].entries()) {
    const F = G.frameOf([xd, ty, z], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
    T.disk(`levha.saplama${i}`, 2, F, 0, tx - xd - 1.1, 1, { tone: "mid", crease: "none" }, { steps: 12, sekil: { seated: true, cut: [cubuk] } });
  }
}

// ---- Termometreler ve statifleri (bant 3): aynı parça, aynı ölçek, aynı boy ----
function olcer(ad, c, s) {
  const kiskac = [Z_KOL - 4, Z_KOL + 4];
  const term = O.termometre(T, { ad: `${ad}.termometre`, bant: 3, c, zAlt: TERMO.alt, zOlcek: Z_OLCEK, birim: TERMO.birim, min: TERMO.min, max: TERMO.max, zUst: Z_KOL + 12, kimlik: `dv-${ad}`, rCam: TERMO.rCam, rHazne: TERMO.rHazne, rSutun: TERMO.rSutun, hazneBoy: TERMO.hazneBoy, kiskac });
  O.statif(T, { ad: `${ad}.statif`, bant: 3, s, c, zKol: Z_KOL, rTutulan: term.rCam, tutulan: term.sekiller, taban: { x: s[0] - 11, y: s[1] - 11, w: 22, d: 22, r: 3 }, zBas: ZEMIN });
  return term;
}
const IC = olcer("ic", IC_T, IC_S);
const DIS = olcer("dis", DIS_T, DIS_S);

try {
  T.yerles();
} catch (hata) {
  // Bant hatasında kimin kimi öne ittiğini dök (yerleşim ayıklaması).
  if (process.argv.includes("--neden") && R.settled) {
    const ad = /^(\S+) bandının/.exec(hata.message)?.[1];
    const { items, overlaps } = R.settled;
    const etiket = (st) => (typeof st === "number" ? st : st.label);
    const gorulen = new Set();
    for (const o of overlaps.pairs) {
      const [a, b] = [items[o.a], items[o.b]];
      if (a.name !== ad && b.name !== ad) continue;
      const satir = `${a.name} × ${b.name}: ${o.front.map((y, i) => `${i ? b.name : a.name} önde ${y.area?.toFixed?.(1) ?? JSON.stringify(y)}`).join(" | ")}`;
      const anahtar = `${a.name}|${b.name}`;
      if (gorulen.has(anahtar)) continue;
      gorulen.add(anahtar);
      console.log(etiket(o.state), satir.slice(0, 300));
    }
  }
  throw hata;
}

// ---- Veri ----
const vek = (v) => {
  const a = at([0, 0, 0]);
  const b = at(v);
  return [b[0] - a[0], b[1] - a[1]];
};
const Z_ORTA = (ZEMIN + Z_DENIZ) / 2; // ısı oklarının geçtiği yükseklik: pencerenin altındaki dolu duvarın ortası
const etiketYeri = (x) => {
  const p = at([x, ON, -PLATE_H - FOOT_H]);
  return [p[0], p[1] + 12];
};
const CAM_Z = (Z_DENIZ + Z_LENTO) / 2;
const D = {
  arka: tezgah.halo + T.katman(0),
  duvar: T.katman(1),
  levha: T.katman(2),
  on: T.katman(3),
  uz: r2(T.uz * 1000) / 1000,
  ilk: { yalitim: 1, cam: 1, ic: 20, dis: 20 },
  term: { min: TERMO.min, max: TERMO.max, birim: TERMO.birim },
  kayma: vek([KAYMA, 0, 0]).map(r2), // çıkarılmış levhanın ekrandaki ötelemesi
  kalin: vek([LEVHA_X, 0, 0]).map(r2), // levhanın kalınlığının ekrandaki karşılığı
  nokta: {
    "ic.termometre": IC.tepe.map(r2),
    "dis.termometre": DIS.tepe.map(r2),
    "duvar.ic": at([0, 0, Z_ORTA]).map(r2),
    "duvar.dis": at([DUVAR_X, 0, Z_ORTA]).map(r2),
    yalitim: at([DUVAR_X + LEVHA_X / 2, 0, (LEVHA.alt + Z_UST) / 2]).map(r2),
    cam1: at([CAM.dis + CAM.kalin / 2, 0, CAM_Z]).map(r2),
    cam2: at([(CAM.ic + CAM.dis + CAM.kalin) / 2, 0, CAM_Z]).map(r2),
    "kalinlik.a": at([0, 0, Z_UST]).map(r2),
    "kalinlik.b": at([DUVAR_X, 0, Z_UST]).map(r2),
    "ic.etiket": etiketYeri(IC_X).map(r2),
    "dis.etiket": etiketYeri(DUVAR_X + (KAYMA + LEVHA_X) / 2 + 8).map(r2),
  },
};

// ---- Stil ----
const DV_CSS = `
.dv-oyuk{fill:var(--dv-oyuk);stroke:none}
.dv-cam>.iso-fill{fill-opacity:.35}
.dv-cam-kesit{fill:var(--anatomy-mid);stroke:none}
`;
const SAYFA_CSS = `${O.PARCA_CSS}${DV_CSS}${O.siviCss("sayfa")}
.ip-stage{position:relative;border-radius:10px;--dv-oyuk:#d9d9d5}
.iso[data-theme="dark"] .ip-stage{--dv-oyuk:#0b0b0b}
.ip-stage:focus-visible{outline:1px solid var(--anatomy-muted);outline-offset:6px}
@media (max-width:640px){.iso-plate-corner[data-corner="readout"]{font-size:9px;letter-spacing:0}}
`;
const TAHTA_CSS = `${O.kitCss()}${O.PARCA_CSS}${DV_CSS}${O.tahtaCss("dvr")}.dvr{--dv-oyuk:#0a0f20}\n`;

// ---- Tek başına sayfa ----
const CIZ = O.oku(join(HERE, "ciz.js"));
const { govdeOf } = new Function(`${CIZ}\nreturn { govdeOf };`)();
const ETIKET =
  "Duvar kesiti maketi: bir taban plakasının üstünde, bir evin dış duvarından kesilmiş parça. Kesit yüzünde soldan sağa iç sıva, delikli tuğla, dış sıva ve raylarda kayarak takılıp çıkarılan yalıtım levhası okunur. Duvarın ortasında kesilmiş bir pencere: kasa ve tek ya da çift cam. İç ve dış yanda statiflere asılı birer termometre durur.";
const svg = k.figureSvg({ width: W, height: H, label: ETIKET, body: govdeOf(D) });
const CANLI = O.oku(join(HERE, "canli.js")).replace("__DATA__", JSON.stringify({ ...D, arka: "", duvar: "", levha: "", on: "" }));
const ad = THEME === "light" ? "duvar-light.html" : "duvar.html";
const boy = O.sayfaYaz({
  dosya: join(HERE, ad),
  tema: THEME,
  baslik: "Duvar kesiti ve çift cam",
  sekilNo: "Şekil 6",
  ipucu: "gösteri turu",
  gosterge: "iç 20 °C · dış 20 °C · yalıtım takılı · tek cam",
  anahtarlar: [
    { mark: "lit", label: "Termometre sütunu: boyu sıcaklıkla doğru orantılı" },
    { mark: "raised", label: "Kesit: iç sıva, delikli tuğla, dış sıva, yalıtım levhası" },
    { mark: "dim", label: "Pencere kesiti: kasa, cam, çift camda ara boşluk çıtası" },
  ],
  aciklama:
    "Kesit yüzü izleyiciye dönüktür: katmanlar soldan sağa iç sıva, tuğla, dış sıva ve yalıtım levhasıdır. Levha raylarda kayar; çıkarılınca dört levha kalınlığı ötede durur. İki termometrenin ölçeği aynıdır (−10 °C ile 50 °C arası, 10 °C'ta bir çentik) ve ikisi ekranda aynı hizadadır: sütunların tepeleri yatay bir çizgiyle karşılaştırılır.",
  svg,
  css: SAYFA_CSS,
  script: CIZ + CANLI,
  genislik: 760,
  etiket: ETIKET,
});
console.log("yazıldı", ad, `${(boy / 1024).toFixed(0)} KB`, `${R.items.length} öğe`, `${R.solids.length} katı`, `ölçek ${KS.toFixed(3)}`, `1 °C = ${(-T.uz * TERMO.birim).toFixed(2)} figür birimi`);

// ---- Ders modülü: fizik/enerji/dersler/duvar-sekil.js (window.DUVAR) ----
{
  const ict = IC.tepe;
  const dist = DIS.tepe;
  const tAlt = at([IC_T[0], IC_T[1], TERMO.alt]);
  // duvar: kesit, levhanın iki yeri ve iki termometre. Sol kenar iç termometrenin solunda yazıya yer bırakır (yazı kutunun
  // dışına da taşabilir: kutu tahtada x 40'ta başlar); sağ kenar dış termometrenin hemen sağıdır (yazısı kutunun dışına düşer);
  // alt kenar tabanın ön kısmını keserek geçer.
  const dSol = ict[0] - 52;
  const dSag = dist[0] + 30;
  const dUst = at([0, -BOY, Z_UST])[1] - 8;
  const dEn = dSag - dSol;
  const dOrta = [(dSol + dSag) / 2, dUst + (dEn * H) / W / 2];
  // cam: pencere kesiti, levha ve iç termometrenin sütunu (dış termometre dışarıda)
  const cSol = ict[0] - 62;
  const cSag = at([DUVAR_X + LEVHA_X, -BOY, CAM_Z])[0] + 26;
  const cOrta = [(cSol + cSag) / 2, at([DUVAR_X / 2, 0, CAM_Z + 4])[1]];
  // pencere: yalnızca pencere kesiti
  const pOrta = at([DUVAR_X / 2 + 4, 0, CAM_Z]);
  const KADRAJ = {
    tum: [0, 0, W, H],
    duvar: O.kadrajOf(dOrta, dEn, W, H),
    cam: O.kadrajOf(cOrta, cSag - cSol, W, H),
    pencere: O.kadrajOf(pOrta, 96 * KS, W, H),
  };
  const kat = (ad) => (W / KADRAJ[ad][2]).toFixed(1).replace(".", ",");
  const birimFigur = -T.uz * TERMO.birim;
  const BASLIK = `Ş6 · Duvar kesiti ve çift cam (izometrik figür). ÜRETİLMİŞ DOSYA: elle değiştirme.
   Kaynak: plan/fizik/enerji/sekil/s6-duvar/build.mjs ve ciz.js, ortak parçalar plan/fizik/enerji/sekil/parcalar.mjs
   (anatomy kiti, MIT; bkz. plan/fizik/enerji/sekil/kit/LICENSE). Sözleşme: plan/fizik/enerji/IZOMETRIK.md 6b.

   Ne var: bir taban plakasının üstünde, bir evin dış duvarından kesilmiş parça (maket). Kesit yüzü izleyiciye dönüktür;
   katmanlar SOLDAN SAĞA okunur: iç sıva (ince, düz), tuğla (derzli, delikli), dış sıva (ince, düz) ve yalıtım levhası (noktalı;
   dış yüzünde ince kaplama, dübel başları, tutamak). İç yan solda (parke döşeme), dış yan sağda (çakıllı zemin). Levha iki rayın
   üstünde kayarak duvara takılır ve çıkarılır. Duvarın üst yarısında kesilmiş bir pencere: kasa ve cam (tek ya da çift; çift camda
   iki cam ve aralarındaki boşluğun çıtası kesitte görünür). İki yanda statife asılı birer termometre: iç termometre en solda,
   dış termometre en sağda (çıkarılmış levhanın da ötesinde). Isı kaynağı yoktur. Figürde yazı ve rakam yoktur; etiket, sayı, ok ve
   ölçü çizgisi dersin düz SVG katmanına yazılır ve f.nokta(ad) ile figüre bağlanır. Figür kendi başına hareket etmez: her
   değişiklik aşağıdaki çağrılarla verilir (hareket için c.tween içinde çağır). Sayfa bu dosyayı ders dosyasından önce yükler:
   <script src="dersler/duvar-sekil.js"></script>

   const f = DUVAR.kur(c, svg, { x, y, h });
       Figürü tahtaya (1000 × 562) sol üst köşesi x, y, yüksekliği h olacak biçimde koyar; genişlik h × DUVAR.oran (1,1).
       f.el kök öğe (f.el.style.opacity ile bütün figür soldurulur), f.w ve f.h tahta birimiyle boyutu.

   f.ayar({ yalitim, cam, ic, dis })      Verilmeyen alan değişmez; anında uygulanır.
       yalitim   0…1 yalıtım levhasının takılı olma oranı. 1: levha duvarın dış yüzüne oturmuş. 0: levha duvardan ayrılmış, dış yanda,
                 duvara paralel, dört levha kalınlığı ötede raylarının ucunda duruyor. Arası düz bir ötelemedir (doğrusal).
                 Levhada pencere boşluğu vardır: takılıyken pencereyi kapatmaz.
       cam       1 tek cam, 2 çift cam. Ara değer yoktur (1,5'in altı 1, üstü 2 sayılır); 1 ↔ 2 anında değişir. İkinci cam (iç yandaki)
                 ve çıta yalnızca 2'de görünür. Geçişi yumuşatmak istersen figürü değil, kendi etiketini soldur.
       ic, dis   °C; iç ve dış termometrenin sütun boyu. Ölçek ${String(TERMO.min).replace("-", "−")}…${TERMO.max} °C (SÖZLEŞMEDEN SAPMA: ortak aralık −20…120 değil;
                 derste −5…40 °C kullanıldığı için sütun büyük okunsun diye daraltıldı). Aralığın dışı kırpılır. Çentikler 10 °C'ta
                 bir, uzun çentikler 0 ve 50. İki termometre aynı ölçekte, aynı boyda ve ekranda AYNI HİZADADIR: eşit sıcaklıkta
                 iki sütunun tepesi aynı y'dedir, sütun tepeleri yatay bir çizgiyle karşılaştırılabilir.
                 1 °C = ${birimFigur.toFixed(2).replace(".", ",")} figür birimi; h: 400 ve kadraj tum ile ${((birimFigur * 400) / H).toFixed(2).replace(".", ",")} tahta birimi (kadraj duvar ile ${(((birimFigur * 400) / H) * (W / KADRAJ.duvar[2])).toFixed(2).replace(".", ",")}).
       Başlangıç: { yalitim: 1, cam: 1, ic: 20, dis: 20 }.
   f.durum()               şu anki ayarlar: { yalitim, cam, ic, dis }.
   f.nokta(ad) → [x, y]    tahta birimiyle, figürün o anki durumuna ve kadrajına göre:
       'ic.termometre', 'dis.termometre'   sütunun tepesi (sıcaklıkla oynar). İç termometrenin yazısını SOLUNA (text-anchor: end,
                                           x − 14), dış termometrenin yazısını SAĞINA (x + 14) koy: statif direkleri ve duvar öteki
                                           yandadır (iç direği sağında, dış direği solunda).
       'duvar.ic', 'duvar.dis'             duvarın iç ve dış yüzü, kesit yüzünün kenarında, pencerenin ALTINDAKİ dolu duvarın orta
                                           yüksekliğinde (ısı oku bu ikisi arasında çizilir; ok pencereden değil tuğladan geçer;
                                           oku iki uçtan 25–35 birim taşır). Bu iki noktanın altı figürün kendisidir: "iç", "dış"
                                           yazılarını buraya değil 'ic.etiket' ve 'dis.etiket' noktalarına koy. Levhanın adını
                                           ("strafor") 'duvar.dis' noktasının sağ üstüne koy: [x + 56, y − 50].
                                           Levha takılıyken (yalitim 1) 'duvar.dis' levhanın dış yüzüdür; levha yaklaşırken son
                                           çeyrekte (yalitim 0,75 → 1) duvar yüzünden levha yüzüne kayar, sıçramaz.
       'yalitim'                           levhanın kesit yüzünün ortası (levhayla birlikte hareket eder). Hemen sağında levhanın dış
                                           yüzü vardır (kadraj duvar'da ${Math.round(((at([0, -BOY, 0])[0] - at([0, 0, 0])[0]) * 400 * W) / H / KADRAJ.duvar[2])} birim genişliğinde): yazıyı onun ötesine koy, [x + 56, y + 8].
                                           Levha çıkarılmışken (yalitim < 0,5) bu yer dış termometrenin statifine düşer: yazıyı
                                           levha duvara yaklaşınca belirt ya da çıkarılmışken levhanın soluna koy (text-anchor: end, x − 30).
       'cam'                               pencere kesitinde camın ortası: tek camda camın kendisi, çift camda iki camın arasındaki
                                           boşluğun ortası. Nokta figürün içindedir: yazıyı yanına değil kutunun sağına koy
                                           (x = f.x + f.w + 14) ve noktadan yazıya ince bir işaret çizgisi çek.
       'kalinlik.a', 'kalinlik.b'          duvar kalınlığının iki ucu: kesitin üst kenarında iç yüz ve dış yüz. Levha takılıyken
                                           'kalinlik.b' levhanın dış yüzüne gider ('duvar.dis' gibi, son çeyrekte kayarak). Ölçü
                                           çizgisini bu iki noktanın 14–20 birim üstüne çiz; çizgi hafif eğimlidir (b, a'dan aşağıda).
       'ic.etiket', 'dis.etiket'           iç ve dış yanın önünde, tabanın ön kenarının altı ("iç", "dış" yazıları: text-anchor: middle,
                                           bu noktanın 24 birim altına). İki nokta aynı y'dedir: iki yazı tek satıra düşer.
                                           Kadraj tabanı kesiyorsa (duvar, cam) noktalar kadrajın alt kenarına çıkar: yazı her
                                           kadrajda figürün hemen altına düşer (h: 400, y: 90 ile satır tabanı en çok y 514;
                                           süre çizgisi y 530'da kalabilir). Kadraj pencerede yanlarda dışarıda kalır.
   f.gorunur(ad) → true/false   nokta şu anki kadrajın içinde mi. Yakınlaşınca dışarıda kalan noktanın etiketi figür kutusunun
                           dışına düşer: f.bak ile yakınlaşan sahnede etiketi buna göre gizle.
   f.bak(kutu)             figürün [x, y, w, h] bölgesine yaklaşır (figür birimi). Hazır kutular DUVAR.kadraj:
       tum      bütün maket.
       duvar    duvar kesiti, levhanın iki yeri ve iki termometre (yaklaşık ${kat("duvar")} kat; 1 °C = ${(((birimFigur * 400) / H) * (W / KADRAJ.duvar[2])).toFixed(2).replace(".", ",")} tahta birimi). Tabanın ön
                kısmı ve iki yan köşesi kadrajın dışında kalır: figür altta düz bir çizgiyle kesilir.
       cam      pencere kesiti, levha ve İÇ termometrenin sütunu (yaklaşık ${kat("cam")} kat). Dış termometre ve taban dışarıdadır:
                'dis.termometre' için f.gorunur false döner. Levha çıkarılmışken (yalitim 0) kadrajın dışında kalır; bu kadrajı
                yalitim 1 ile kullan. Figür kutuyu doldurur: yazılar kutunun soluna (iç değer), sağına ve altına konur.
       pencere  (sözleşmede yok, ek) yalnızca pencere kesiti: kasa, cam, çıta (yaklaşık ${kat("pencere")} kat). Termometreler dışarıda.
       Geçiş: c.tween(900, (e) => f.bak(a.map((v, i) => Ders.lerp(v, b[i], e))), Ders.ease.inOut). f.nokta kadrajı izler.
   DUVAR.oran              1,1 (en / boy)
   DUVAR.sabit             { min, max (termometre ölçeği, °C), birim (bir °C'ın figürdeki boyu, figür birimi),
                             kayma (çıkarılmış levhanın ötelemesi), kalin (levhanın kalınlığı): ikisi de [dx, dy] figür birimi }
   Tuzaklar: etiket yazıları en az 24 tahta birimi olmalı (22 birim, olc.js'in 750x402 ölçümünde 12 px'in altında kalır).
   Dış termometrenin solunda kendi statifi ve çıkarılmış levha (yalitim 0) durur: dış termometrenin yazısını soluna koyma.
   Kadraj duvar'da dış termometre kutunun sağ kenarına yakındır: yazısı kutunun dışına, x 470–540 arasına düşer (h: 400, x: 40 ile);
   sağ paneldeki kartları x 560'tan başlat.
   Kırpma kimlikleri her kurulumda ayrı önek alır (sahne değişince çakışmaz); aynı tahtaya iki figür kurmak denenmedi.`;
  const kb = O.dersModuluYaz({
    dosya: join(KOK, "fizik", "enerji", "dersler", "duvar-sekil.js"),
    ad: "DUVAR",
    sinif: "dvr",
    baslik: BASLIK,
    W,
    H,
    css: TAHTA_CSS,
    ciz: CIZ,
    veri: D,
    kadraj: KADRAJ,
    sabit: { min: TERMO.min, max: TERMO.max, birim: r2(birimFigur), kayma: D.kayma, kalin: D.kalin },
  });
  console.log("yazıldı fizik/enerji/dersler/duvar-sekil.js", `${kb.toFixed(0)} KB`, "kadraj", JSON.stringify(KADRAJ));
  console.log("plaka", JSON.stringify(k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0).map((q) => at(q).map(Math.round))), "etiket", JSON.stringify([D.nokta["ic.etiket"], D.nokta["dis.etiket"]]), "tepe", JSON.stringify([ict, dist].map((q) => q.map(Math.round))), "hazne", JSON.stringify(tAlt.map(Math.round)), "duvar ust", JSON.stringify(at([0, -BOY, Z_UST]).map(Math.round)), "direk", JSON.stringify(at([IC_S[0], IC_S[1], Z_KOL + 20]).map(Math.round)));
  console.log("hiza: iç tepe y", r2(ict[1]), "dış tepe y", r2(dist[1]), "fark", r2(ict[1] - dist[1]));
}

if (process.argv.includes("--boyut")) {
  const boylar = R.items.map((item) => [item.name, item.svg.length + (T.yuva.get(item.name) ?? "").length]).sort((a, b) => b[1] - a[1]);
  console.log(boylar.slice(0, 24).map(([ad, n]) => `${(n / 1024).toFixed(1)} ${ad}`).join("\n"));
  console.log("arka", (D.arka.length / 1024).toFixed(0), "duvar", (D.duvar.length / 1024).toFixed(0), "levha", (D.levha.length / 1024).toFixed(0), "on", (D.on.length / 1024).toFixed(0), "KB");
}
A.auditOrExit(R, P);
