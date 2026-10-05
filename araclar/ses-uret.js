#!/usr/bin/env node
/* Dersin anlatım metinlerini toplar ve ElevenLabs ile seslendirir.

   node ses-uret.js a1 --liste            Anlatım satırlarını ve karakter sayısını göster (API çağrısı yok).
   node ses-uret.js a1                    Eksik kliplerin tümünü üret.
   node ses-uret.js a1 --sahne 1-3,6      Yalnızca bu sahneleri üret.
   node ses-uret.js --sesler              Hesaptaki sesleri listele (ses kimliği seçmek için).

   Ortam değişkenleri (ya da kökte .env dosyası):
     ELEVENLABS_API_KEY   zorunlu
     ELEVENLABS_VOICE_ID  zorunlu (anlatıcı sesi)
     ELEVENLABS_MODEL     isteğe bağlı, varsayılan eleven_multilingual_v2

   Oyunculuk yönergeleri: eleven_v3 / eleven_v4 modellerinde seslendirme metnine ([curious], [excited] gibi)
   köşeli parantezli yönergeler yazılabilir; bunlar derste `speak:` metnine konur, altyazıda görünmez.
   Model ya da ses değişirse eski klipler geçersiz sayılır ve yeniden üretilir (ses/<ders-id>/uretim.json).

   Neyin seslendirildiği: sahnede beklenerek okunan açıklama altyazıları (c.say). Etkileşim yönergeleri
   (noWait ile gösterilenler), soru panelleri, geri bildirimler ve sınav seslendirilmez; öğrenci onları kendi hızında okur.
   Klipler ses/<ders-id>/<anahtar>.mp3 olarak yazılır; anahtar metnin özetidir, metin değişirse klip yeniden üretilir. */
const fs = require('fs'), path = require('path');
const { KOK, dersDosyasi, dersiAc, sahneyiOynat } = require('./tarayici');

const args = process.argv.slice(2);
const bayrak = (ad) => args.includes(ad);
const deger = (ad) => { const i = args.indexOf(ad); return i >= 0 ? args[i + 1] : null; };

(function envYukle() {
  const f = path.join(KOK, '.env');
  if (!fs.existsSync(f)) return;
  for (const satir of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = satir.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] == null) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
})();
const API = 'https://api.elevenlabs.io/v1';
const ANAHTAR = process.env.ELEVENLABS_API_KEY, SES = process.env.ELEVENLABS_VOICE_ID;
const MODEL = process.env.ELEVENLABS_MODEL || 'eleven_multilingual_v2';

function sahneSecimi(metin) {
  if (!metin) return null;
  const s = new Set();
  for (const parca of metin.split(',')) {
    const [a, b] = parca.split('-').map(Number);
    for (let k = a; k <= (b || a); k++) s.add(k);
  }
  return s;
}

/* Dersi oynatıp anlatım satırlarını toplar: [{scene, title, key, text}] (sahne sırasıyla, tekrarsız). */
async function satirlariTopla(no) {
  const { browser, page, id, basliklar, icSahne, hatalar } = await dersiAc(dersDosyasi(no));
  await page.evaluate(() => { window.__satirlar = []; window.__dersSay = (x) => window.__satirlar.push(x); });
  for (let i = 0; i < basliklar.length; i++) {
    if (icSahne[i]) continue; // sınav ve özet seslendirilmez
    const bitti = await sahneyiOynat(page, i, { hiz: 4 });
    if (!bitti) console.warn(`  uyarı: sahne ${i + 1} otomatik tamamlanamadı; bazı satırlar eksik olabilir.`);
  }
  const ham = await page.evaluate(() => window.__satirlar);
  await browser.close();
  if (hatalar.length) console.warn('  konsol hataları:\n  ' + [...new Set(hatalar)].join('\n  '));
  const gorulen = new Set(), satirlar = [];
  for (const x of ham) {
    if (x.noWait || gorulen.has(x.key)) continue;
    gorulen.add(x.key);
    satirlar.push({ scene: x.scene + 1, title: basliklar[x.scene], key: x.key, text: x.text });
  }
  return { id, satirlar };
}

function manifestYaz(id) {
  const klasor = path.join(KOK, 'ses', id);
  const dosyalar = fs.existsSync(klasor) ? fs.readdirSync(klasor).filter((f) => /^[0-9a-f]{8}\.mp3$/.test(f)).sort() : [];
  const klipler = dosyalar.map((f) => `'${f.slice(0, 8)}': '${f}'`).join(', ');
  fs.writeFileSync(path.join(KOK, 'ses', id + '.js'),
    `/* araclar/ses-uret.js tarafından yazılır. Elle düzenleme. */\nDers.ses['${id}'] = { base: 'ses/${id}/', clips: { ${klipler} } };\n`);
  return dosyalar.length;
}

async function seslendir(metin, onceki, sonraki) {
  const govde = { text: metin, model_id: MODEL };
  if (MODEL === 'eleven_multilingual_v2') {
    govde.voice_settings = { stability: 0.5, similarity_boost: 0.75, style: 0, use_speaker_boost: true };
    if (onceki) govde.previous_text = onceki; if (sonraki) govde.next_text = sonraki; // cümleler arası tonlama sürekliliği
  } else govde.language_code = 'tr'; // v3/v4: dil açıkça verilir, ses ayarları modelin varsayılanında kalır
  for (let deneme = 1; ; deneme++) {
    const r = await fetch(`${API}/text-to-speech/${SES}?output_format=mp3_44100_128`, {
      method: 'POST', headers: { 'xi-api-key': ANAHTAR, 'Content-Type': 'application/json' }, body: JSON.stringify(govde),
    });
    if (r.ok) return Buffer.from(await r.arrayBuffer());
    const hata = await r.text();
    if ((r.status === 429 || r.status >= 500) && deneme < 4) { await new Promise((res) => setTimeout(res, 2000 * deneme)); continue; }
    throw new Error(`ElevenLabs ${r.status}: ${hata.slice(0, 300)}`);
  }
}

(async () => {
  if (bayrak('--sesler')) {
    if (!ANAHTAR) throw new Error('ELEVENLABS_API_KEY tanımlı değil.');
    const r = await fetch(`${API}/voices`, { headers: { 'xi-api-key': ANAHTAR } });
    if (!r.ok) throw new Error(`ElevenLabs ${r.status}: ${(await r.text()).slice(0, 300)}`);
    for (const v of (await r.json()).voices) console.log(`${v.voice_id}  ${v.name}  [${[v.labels && v.labels.language, v.labels && v.labels.accent, v.labels && v.labels.gender, v.category].filter(Boolean).join(', ')}]`);
    return;
  }
  const no = args.find((a) => /^[a-z]?\d+$/i.test(a));
  if (!no) { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace('#!/usr/bin/env node\n/* ', '')); return; }

  const { id, satirlar } = await satirlariTopla(no);
  const secim = sahneSecimi(deger('--sahne'));
  const klasor = path.join(KOK, 'ses', id);
  // Her klibin hangi model ve sesle üretildiği kaydedilir; ikisinden biri değişince klip yeniden üretilir.
  const kunyeDosyasi = path.join(klasor, 'uretim.json');
  const kunye = fs.existsSync(kunyeDosyasi) ? JSON.parse(fs.readFileSync(kunyeDosyasi, 'utf8')) : {};
  const var_ = (s) => fs.existsSync(path.join(klasor, s.key + '.mp3')) && !!kunye[s.key] && (!SES || (kunye[s.key].model === MODEL && kunye[s.key].ses === SES));

  // sahne başına döküm
  const sahneler = new Map();
  for (const s of satirlar) { if (!sahneler.has(s.scene)) sahneler.set(s.scene, { title: s.title, satir: 0, kr: 0, eksikKr: 0 }); const o = sahneler.get(s.scene); o.satir++; o.kr += s.text.length; if (!var_(s)) o.eksikKr += s.text.length; }
  console.log(`\n${id}: ${satirlar.length} anlatım satırı, ${satirlar.reduce((a, s) => a + s.text.length, 0)} karakter`);
  for (const [k, o] of sahneler) console.log(`  ${String(k).padStart(2)}  ${o.title.padEnd(44).slice(0, 44)} ${String(o.satir).padStart(3)} satır ${String(o.kr).padStart(6)} kr${o.eksikKr ? `  (üretilecek: ${o.eksikKr})` : '  ✓'}`);

  const hedef = satirlar.filter((s) => (!secim || secim.has(s.scene)) && !var_(s));
  const hedefKr = hedef.reduce((a, s) => a + s.text.length, 0);
  if (bayrak('--liste')) {
    if (bayrak('--metin')) for (const s of satirlar) console.log(`[${s.scene}] ${s.key} ${s.text}`);
    console.log(`\nÜretilecek: ${hedef.length} klip, ${hedefKr} karakter${secim ? ' (seçili sahneler)' : ''}.`);
    return;
  }
  if (!hedef.length) { console.log(`\nÜretilecek klip yok. Kayıtlı klip: ${manifestYaz(id)}.`); return; }
  if (!ANAHTAR || !SES) throw new Error('ELEVENLABS_API_KEY ve ELEVENLABS_VOICE_ID gerekli (ortam değişkeni ya da kökte .env).');

  fs.mkdirSync(klasor, { recursive: true });
  console.log(`\n${hedef.length} klip üretiliyor (${hedefKr} karakter, model ${MODEL})…`);
  let yapilan = 0;
  for (const s of hedef) {
    const sira = satirlar.indexOf(s);
    const komsu = (d) => { const x = satirlar[sira + d]; return x && x.scene === s.scene ? x.text : undefined; };
    try {
      fs.writeFileSync(path.join(klasor, s.key + '.mp3'), await seslendir(s.text, komsu(-1), komsu(1)));
      kunye[s.key] = { model: MODEL, ses: SES };
      fs.writeFileSync(kunyeDosyasi, JSON.stringify(kunye, null, 1));
      yapilan++;
      process.stdout.write(`\r  ${yapilan}/${hedef.length}`);
    } catch (e) { console.error(`\n  durdu: ${e.message}`); break; }
  }
  // metni artık derste geçmeyen eski klipleri temizle
  const gecerli = new Set(satirlar.map((s) => s.key));
  for (const f of fs.readdirSync(klasor)) if (/^[0-9a-f]{8}\.mp3$/.test(f) && !gecerli.has(f.slice(0, 8))) { fs.unlinkSync(path.join(klasor, f)); delete kunye[f.slice(0, 8)]; }
  fs.writeFileSync(kunyeDosyasi, JSON.stringify(kunye, null, 1));
  console.log(`\nBitti: ${yapilan} yeni klip. Derste kayıtlı klip: ${manifestYaz(id)}.`);
})().catch((e) => { console.error(e.message); process.exit(1); });
