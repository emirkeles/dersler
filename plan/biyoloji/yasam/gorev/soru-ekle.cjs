/* Bir dersin `quiz` dizisinin sonuna soru ekler (yürütme planı 2b; yalnızca geliştirme). Ders dosyaları üç ayrı
   biçimde yazıldığı (çok satırlı, küçültülmüş, JSON anahtarlı) için ekleme elle değil bu araçla yapılır.
   Kullanım (proje kökünden): node plan/biyoloji/yasam/gorev/soru-ekle.cjs <kod> <sorular.json> [--sonraki <dosya.html> "<etiket>"]
   sorular.json: [{ "q": "…", "options": ["…","…","…"], "answer": 0, "why": ["…","…","…"], "scene": 2 }, { … }]
   Var olan sorulara, sahnelere ve öteki alanlara dokunmaz; yazdıktan sonra dosyayı yeniden yükleyip doğrular. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.resolve(__dirname, '../../../../biyoloji/yasam/dersler');
const [kod, jsonYolu] = process.argv.slice(2);
const sn = process.argv.indexOf('--sonraki');
const f = fs.readdirSync(dir).find((d) => d.startsWith(String(kod).toLowerCase() + '-') && d.endsWith('.js'));
if (!f) { console.error('ders dosyası yok: ' + kod); process.exit(1); }
const yol = path.join(dir, f);
function yukle(kaynak) {
  let cfg = null;
  const px = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : px), apply: () => px, construct: () => px });
  const win = { KIT: px, addEventListener() {} }, ctx = { window: win, document: px, KIT: px, Ders: { start: (c) => { cfg = c; } }, console, setTimeout, Math };
  win.Ders = ctx.Ders; vm.createContext(ctx); vm.runInContext(kaynak, ctx);
  return cfg;
}
let kaynak = fs.readFileSync(yol, 'utf8');
const once = yukle(kaynak), json = /"quiz"\s*:/.test(kaynak);
const tirnak = (s) => (json ? JSON.stringify(s) : "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'");
const hata = (m) => { console.error('HATA: ' + m); process.exit(1); };

if (jsonYolu && jsonYolu !== '--sonraki') {
  const yeni = JSON.parse(fs.readFileSync(jsonYolu, 'utf8'));
  if (!Array.isArray(yeni) || !yeni.length) hata('sorular.json bir dizi olmalı');
  yeni.forEach((q, i) => {
    if (!q.q || !Array.isArray(q.options) || q.options.length !== 3) hata(`soru ${i + 1}: üç şık olmalı`);
    if (!Array.isArray(q.why) || q.why.length !== 3 || q.why.some((w) => !w)) hata(`soru ${i + 1}: her şık için why olmalı`);
    if (![0, 1, 2].includes(q.answer)) hata(`soru ${i + 1}: answer 0, 1 ya da 2 olmalı`);
    if (!Number.isInteger(q.scene) || q.scene < 0 || q.scene >= once.scenes.length) hata(`soru ${i + 1}: scene 0–${once.scenes.length - 1} arasında olmalı`);
    if (once.quiz.some((e) => e.q === q.q)) hata(`soru ${i + 1}: bu soru derste zaten var`);
    if (new Set(q.options).size !== 3) hata(`soru ${i + 1}: şıklar birbirinden farklı olmalı`);
  });
  const son = once.quiz[once.quiz.length - 1], w = son.why[son.why.length - 1];
  const adaylar = [w, JSON.stringify(w).slice(1, -1), w.replace(/'/g, "\\'")];
  let i = -1, bulunan = '';
  adaylar.forEach((a) => { const k = kaynak.lastIndexOf(a); if (k > i) { i = k; bulunan = a; } });
  if (i < 0) hata('son sorunun yeri bulunamadı');
  const kapa = kaynak.indexOf('}', kaynak.indexOf(']', i + bulunan.length));
  if (kapa < 0) hata('son sorunun kapanışı bulunamadı');
  const yaz = (q) => (json
    ? `{"q": ${tirnak(q.q)}, "options": [${q.options.map(tirnak).join(', ')}], "answer": ${q.answer}, "why": [${q.why.map(tirnak).join(', ')}], "scene": ${q.scene}}`
    : `{ q: ${tirnak(q.q)},\n        options: [${q.options.map(tirnak).join(', ')}], answer: ${q.answer},\n        why: [${q.why.map(tirnak).join(', ')}], scene: ${q.scene} }`);
  kaynak = kaynak.slice(0, kapa + 1) + yeni.map((q) => (json ? ', ' : ',\n      ') + yaz(q)).join('') + kaynak.slice(kapa + 1);
  const sonra = yukle(kaynak);
  if (sonra.quiz.length !== once.quiz.length + yeni.length) hata('ekleme sonrası soru sayısı tutmuyor');
  if (JSON.stringify(sonra.quiz.slice(0, once.quiz.length)) !== JSON.stringify(once.quiz)) hata('var olan sorular değişti');
  if (JSON.stringify(sonra.quiz.slice(once.quiz.length)) !== JSON.stringify(yeni.map((q) => ({ q: q.q, options: q.options, answer: q.answer, why: q.why, scene: q.scene })))) hata('eklenen sorular dosyadan aynı okunmuyor');
}
if (sn > 0) {
  const href = process.argv[sn + 1], etiket = process.argv[sn + 2] || 'Sonraki: Konu tekrarı ›';
  const satir = json ? `"nextLesson": {"href": ${tirnak(href)}, "label": ${tirnak(etiket)}}` : `nextLesson: { href: ${tirnak(href)}, label: ${tirnak(etiket)} }`;
  const m = /"?nextLesson"?\s*:\s*\{[^}]*\}/.exec(kaynak);
  if (m) kaynak = kaynak.slice(0, m.index) + satir + kaynak.slice(m.index + m[0].length);
  else {
    const k = kaynak.lastIndexOf('});');
    const onu = kaynak.slice(0, k).replace(/\s+$/, '');
    kaynak = onu + (onu.endsWith(',') ? '' : ',') + '\n    ' + satir + ',\n  ' + kaynak.slice(k);
  }
  const sonra = yukle(kaynak);
  if (!sonra.nextLesson || sonra.nextLesson.href !== href) hata('nextLesson yazılamadı');
}
fs.writeFileSync(yol, kaynak);
const son = yukle(kaynak);
console.log(`${f}: ${son.quiz.length} soru · cevap yerleri ${son.quiz.map((q) => q.answer).join(', ')} · sonraki ${son.nextLesson ? son.nextLesson.href : '-'}`);
