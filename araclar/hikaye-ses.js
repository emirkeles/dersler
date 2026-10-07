#!/usr/bin/env node
/* Hikâye animasyonunun anlatımını ElevenLabs ile seslendirir (ses ve model ses-uret.js ile aynı).

   node hikaye-ses.js a8-tarla-cit --liste   Satırları ve karakter sayısını göster (API çağrısı yok).
   node hikaye-ses.js a8-tarla-cit           Eksik ya da metni değişmiş klipleri üret.

   Kaynak <tema>/hikaye/<proje>/SCRIPT.md: her "## Line N" başlığının altındaki dört boşluk girintili satır okunur.
   "**Delivery:** [curious]" gibi köşeli parantezle başlayan yönerge metnin başına eklenir; düz yazı
   yönergeler yalnızca nottur. Klipler <tema>/hikaye/<proje>/assets/ses/NN.mp3 olarak yazılır. */
const fs = require('fs'), path = require('path');
const { SES, MODEL, seslendir, anahtarVar } = require('./ses-uret');
const { temaKlasorleri } = require('./tarayici');

const args = process.argv.slice(2);
const proje = args.find((a) => !a.startsWith('--'));
if (!proje) { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace('#!/usr/bin/env node\n/* ', '')); process.exit(0); }

const kok = temaKlasorleri().map((u) => path.join(u, 'hikaye', proje)).find((k) => fs.existsSync(k));
if (!kok) { console.error('Hikâye bulunamadı: ' + proje); process.exit(1); }
const satirlar = [];
for (const bolum of fs.readFileSync(path.join(kok, 'SCRIPT.md'), 'utf8').split(/^## Line /m).slice(1)) {
  const no = parseInt(bolum, 10);
  const metin = bolum.split('\n').filter((s) => /^ {4}\S/.test(s)).map((s) => s.trim()).join(' ');
  const yonerge = (bolum.match(/^\*\*Delivery:\*\*\s*(\[[^\]]+\])/m) || [])[1];
  if (metin) satirlar.push({ no, ad: String(no).padStart(2, '0'), metin: (yonerge ? yonerge + ' ' : '') + metin });
}

const klasor = path.join(kok, 'assets', 'ses');
const kunyeDosyasi = path.join(klasor, 'uretim.json');
const kunye = fs.existsSync(kunyeDosyasi) ? JSON.parse(fs.readFileSync(kunyeDosyasi, 'utf8')) : {};
const guncel = (s) => fs.existsSync(path.join(klasor, s.ad + '.mp3')) && !!kunye[s.ad] && kunye[s.ad].metin === s.metin && kunye[s.ad].model === MODEL && kunye[s.ad].ses === SES;
const hedef = satirlar.filter((s) => !guncel(s));

for (const s of satirlar) console.log(`${s.ad} ${guncel(s) ? '✓' : '·'} ${s.metin}`);
console.log(`\n${satirlar.length} satır, ${satirlar.reduce((a, s) => a + s.metin.length, 0)} karakter. Üretilecek: ${hedef.length} klip, ${hedef.reduce((a, s) => a + s.metin.length, 0)} karakter.`);
if (args.includes('--liste') || !hedef.length) process.exit(0);

(async () => {
  if (!anahtarVar()) throw new Error('ELEVENLABS_API_KEY gerekli (kökteki .env dosyasına yaz).');
  fs.mkdirSync(klasor, { recursive: true });
  for (const s of hedef) {
    fs.writeFileSync(path.join(klasor, s.ad + '.mp3'), await seslendir(s.metin));
    kunye[s.ad] = { metin: s.metin, model: MODEL, ses: SES };
    fs.writeFileSync(kunyeDosyasi, JSON.stringify(kunye, null, 1));
    process.stdout.write(`\r  ${s.ad}/${String(satirlar.length).padStart(2, '0')}`);
  }
  console.log('\nBitti.');
})().catch((e) => { console.error('\n' + e.message); process.exit(1); });
