/* Bir dersin dökümü (yürütme planı 2b; yalnızca geliştirme): başlık, sahneler, çıkış soruları, özet ve sahnelerdeki
   bütün metinler (altyazı, defter notu, sahne içi soru, şık, ipucu). Küçültülmüş ders dosyalarını okumadan
   içeriği görmek içindir.
   Kullanım (proje kökünden): node plan/fizik/kuvvet-ve-hareket/gorev/ders-ozeti.cjs <kod> [<kod> …]      örnek: … b1 b2
                              node plan/fizik/kuvvet-ve-hareket/gorev/ders-ozeti.cjs --sorular <harf>     konunun bütün çıkış soruları ve cevap yerleri */
const fs = require('fs'), path = require('path'), vm = require('vm');
const dir = path.resolve(__dirname, '../../../../fizik/kuvvet-ve-hareket/dersler');
const dosyalar = fs.readdirSync(dir).filter((f) => /^[a-z]\d+-.*\.js$/.test(f)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
function yukle(f) {
  let cfg = null;
  const px = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : px), apply: () => px, construct: () => px });
  const win = { KIT: px, addEventListener() {} }, ctx = { window: win, document: px, KIT: px, Ders: new Proxy({ start: (c) => { cfg = c; } }, { get: (t, k) => (k in t ? t[k] : px) }), console, setTimeout, Math };
  win.Ders = ctx.Ders; vm.createContext(ctx);
  const kaynak = fs.readFileSync(path.join(dir, f), 'utf8');
  vm.runInContext(kaynak, ctx);
  return { cfg, kaynak };
}
function metinler(kaynak) {
  /* Yorumlar atılır: içlerindeki tırnaklar dizgi eşleşmesini kaydırır. */
  kaynak = kaynak.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/([;,{})])\s*\/\/ .*$/gm, '$1');
  const k = kaynak.search(/kicker\s*:/), govde = kaynak.slice(0, k > 0 ? k : kaynak.lastIndexOf('Ders.start('));
  const re = /(speak:\s*)?(['"`])((?:\\.|(?!\2)[^\\])*)\2/g, out = [];
  let m;
  while ((m = re.exec(govde))) {
    const s = m[3];
    if (m[1] || s.length < 4 || !/[a-zçğıöşü]{3}/i.test(s) || !/[ çğıöşüİ’]/.test(s)) continue;
    if (/^(M |translate|rotate|var\(|use strict|#|fill:|[a-z-]+$)/.test(s) || /^[\d\s.,MLQCZHVmlqczhv-]+$/.test(s)) continue;
    out.push(s);
  }
  return out;
}
const args = process.argv.slice(2);
if (args[0] === '--sorular') {
  const harf = (args[1] || '').toLowerCase();
  dosyalar.filter((f) => f[0] === harf).forEach((f) => {
    const { cfg } = yukle(f);
    console.log(`\n== ${f} · cevap yerleri ${cfg.quiz.map((q) => q.answer).join(', ')}`);
    cfg.quiz.forEach((q, i) => { console.log(`${i + 1}. ${q.q}`); q.options.forEach((o, j) => console.log(`   ${j === q.answer ? '✓' : '·'} ${o}\n       ${q.why[j]}`)); });
  });
} else {
  args.forEach((kod) => {
    const f = dosyalar.find((d) => d.startsWith(kod.toLowerCase() + '-'));
    if (!f) { console.log(kod + ': dosya yok'); return; }
    const { cfg, kaynak } = yukle(f);
    console.log(`\n==== ${f} · ${cfg.id} · ${cfg.title}`);
    console.log('giriş: ' + (cfg.intro && cfg.intro.hook));
    cfg.scenes.forEach((s, i) => console.log(`sahne ${i}: ${s.title} — ${s.goal || ''}`));
    console.log('özet: ' + cfg.summary.join(' | '));
    console.log('sonraki: ' + (cfg.nextLesson ? cfg.nextLesson.href : '-'));
    console.log('-- çıkış soruları (cevap yerleri ' + cfg.quiz.map((q) => q.answer).join(', ') + ')');
    cfg.quiz.forEach((q, i) => { console.log(`${i + 1}. [sahne ${q.scene}] ${q.q}`); q.options.forEach((o, j) => console.log(`   ${j === q.answer ? '✓' : '·'} ${o}`)); });
    console.log('-- sahnelerdeki metinler (sırayla: altyazı, tahta yazısı, defter notu, sahne içi soru ve şıkları)');
    metinler(kaynak).forEach((s) => console.log('  ' + s));
  });
}
