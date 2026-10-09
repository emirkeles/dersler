/* Eklenmiş bir çıkış sorusunun şıklarını yeniden sıralar (yürütme planı 2b; yalnızca geliştirme): doğru şıkkın yerini
   değiştirmek için. Yalnızca q, options, answer, why, scene alanları olan sorularda çalışır (soru-ekle.cjs ile eklenenler).
   Kullanım (proje kökünden): node plan/fizik/fizik-bilimi-ve-kariyer-kesfi/gorev/sik-sirala.cjs <kod> <soru no, 1'den> <sıra>
   Sıra: yeni dizilişte eski şıkların numaraları; örnek 2,0,1 → eski üçüncü şık başa gelir. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.resolve(__dirname, '../../../../fizik/fizik-bilimi-ve-kariyer-kesfi/dersler');
const [kod, noS, siraS] = process.argv.slice(2);
const f = fs.readdirSync(dir).find((d) => d.startsWith(String(kod).toLowerCase() + '-') && d.endsWith('.js'));
const yol = path.join(dir, f), hata = (m) => { console.error('HATA: ' + m); process.exit(1); };
function yukle(kaynak) {
  let cfg = null;
  const px = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : px), apply: () => px, construct: () => px });
  const win = { KIT: px, addEventListener() {} }, ctx = { window: win, document: px, KIT: px, Ders: { start: (c) => { cfg = c; } }, console, setTimeout, Math };
  win.Ders = ctx.Ders; vm.createContext(ctx); vm.runInContext(kaynak, ctx);
  return cfg;
}
let kaynak = fs.readFileSync(yol, 'utf8');
const once = yukle(kaynak), json = /"quiz"\s*:/.test(kaynak), q = once.quiz[Number(noS) - 1], sira = siraS.split(',').map(Number);
if (!q) hata('soru yok');
if (sira.slice().sort().join() !== '0,1,2') hata('sıra 0,1,2 sayılarının bir dizilişi olmalı');
if (Object.keys(q).sort().join() !== 'answer,options,q,scene,why') hata('soruda başka alan var');
const tirnak = (s) => (json ? JSON.stringify(s) : "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'");
const bul = (s, bas) => { let i = -1, uz = 0; [s, JSON.stringify(s).slice(1, -1), s.replace(/'/g, "\\'")].forEach((a) => { const k = kaynak.indexOf(a, bas); if (k >= 0 && (i < 0 || k < i)) { i = k; uz = a.length; } }); return [i, uz]; };
const [qi, quz] = bul(q.q, kaynak.search(/"?quiz"?\s*:/));
if (qi < 0) hata('soru metni bulunamadı');
const bas = qi + quz + 1;                                  // soru metnini kapatan tırnaktan sonrası
const [wi, wuz] = bul(q.why[2], bas);
const son = kaynak.indexOf('}', kaynak.indexOf(']', wi + wuz));
const yeni = { options: sira.map((i) => q.options[i]), why: sira.map((i) => q.why[i]), answer: sira.indexOf(q.answer) };
const govde = json
  ? `, "options": [${yeni.options.map(tirnak).join(', ')}], "answer": ${yeni.answer}, "why": [${yeni.why.map(tirnak).join(', ')}], "scene": ${q.scene}`
  : `,\n        options: [${yeni.options.map(tirnak).join(', ')}], answer: ${yeni.answer},\n        why: [${yeni.why.map(tirnak).join(', ')}], scene: ${q.scene} `;
kaynak = kaynak.slice(0, bas) + govde + kaynak.slice(son);
const sonra = yukle(kaynak), s = sonra.quiz[Number(noS) - 1];
if (sonra.quiz.length !== once.quiz.length || s.q !== q.q || s.options[s.answer] !== q.options[q.answer] || JSON.stringify(s.options.slice().sort()) !== JSON.stringify(q.options.slice().sort())) hata('yeniden yüklemede soru tutmuyor');
once.quiz.forEach((e, i) => { if (i !== Number(noS) - 1 && JSON.stringify(e) !== JSON.stringify(sonra.quiz[i])) hata('başka soru değişti'); });
sira.forEach((eski, i) => { if (s.why[i] !== q.why[eski]) hata('why sırası tutmuyor'); });
fs.writeFileSync(yol, kaynak);
console.log(`${f}: cevap yerleri ${sonra.quiz.map((x) => x.answer).join(', ')}`);
