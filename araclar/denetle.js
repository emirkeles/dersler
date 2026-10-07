#!/usr/bin/env node
/* Bir temanın tema.js dosyasını kısa derslerle karşılaştırır; yayına almadan önce çalıştırılır.

   node denetle.js matematik/sayilar     Tek tema.
   node denetle.js                       tema.js dosyası olan bütün temalar.

   Denetlenenler:
     katalog   tema ortak/katalog.js içinde kayıtlı mı · listelenen her dosya var mı · klasörde listede olmayan ders var mı
     ders      açılıyor mu · kimliği <tema>-<kod> mu · sahne sayısı tema.js ile aynı mı · konsol hatası, yüklenemeyen dosya
     sayfa     tema sayfası her kısa dersi gösteriyor mu · kırık bağlantı var mı
   Sorun varsa çıkış kodu 1'dir. */
const fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer-core');
const { KOK, CHROME, sleep, temaKlasorleri } = require('./tarayici');

const hedef = process.argv.slice(2).find((a) => !a.startsWith('--'));
const klasorler = temaKlasorleri()
  .filter((k) => fs.existsSync(path.join(k, 'tema.js')))
  .filter((k) => !hedef || path.relative(KOK, k).split(path.sep).join('/') === hedef.replace(/\/$/, ''));
if (!klasorler.length) { console.error(hedef ? 'tema.js bulunamadı: ' + hedef : 'tema.js dosyası olan tema yok.'); process.exit(1); }

/* katalog.js ve tema.js tarayıcı betikleridir; burada sahte bir window ile okunur. */
function katalogOku(klasor) {
  const window = {};
  new Function('window', fs.readFileSync(path.join(KOK, 'ortak', 'katalog.js'), 'utf8'))(window);
  new Function('KATALOG', fs.readFileSync(path.join(klasor, 'tema.js'), 'utf8'))(window.KATALOG);
  const [dersId, temaId] = path.relative(KOK, klasor).split(path.sep);
  const ders = window.KATALOG.dersler.find((d) => d.id === dersId);
  return { ders, tema: ders && ders.temalar.find((u) => u.id === temaId), temaId };
}

(async () => {
  if (!CHROME) throw new Error('Chrome bulunamadı. CHROME_PATH ortam değişkeniyle yolunu ver.');
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 657 });
  let simdi = ''; const konsol = [];
  page.on('pageerror', (e) => konsol.push(simdi + ': sayfa hatası ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') konsol.push(simdi + ': konsol ' + m.text()); });
  page.on('requestfailed', (r) => konsol.push(simdi + ': yüklenemedi ' + decodeURIComponent(r.url()).replace('file://' + KOK + '/', '')));

  let sorun = 0;
  for (const klasor of klasorler) {
    const ad = path.relative(KOK, klasor).split(path.sep).join('/');
    const hatalar = []; konsol.length = 0;
    let bilgi;
    try { bilgi = katalogOku(klasor); } catch (e) { hatalar.push('tema.js okunamadı: ' + e.message); }
    const tema = bilgi && bilgi.tema;
    const dersler = tema && tema.konular ? tema.konular.flatMap((k) => k.dersler.map((d) => ({ konu: k.harf, dosya: d[0], baslik: d[1], sahne: d[3] }))) : [];
    if (bilgi && !tema) hatalar.push('tema ortak/katalog.js içinde yok');
    if (tema && !dersler.length) hatalar.push('tema.js içinde kısa ders yok');

    const listede = new Set(dersler.map((d) => d.dosya));
    for (const f of fs.readdirSync(klasor)) if (/^[a-z]\d+-.*\.html$/.test(f) && !listede.has(f)) hatalar.push(f + ': klasörde var, tema.js içinde yok');
    if (dersler.length !== listede.size) hatalar.push('aynı dosya tema.js içinde birden çok kez geçiyor');

    for (const d of dersler) {
      simdi = d.dosya;
      const dosya = path.join(klasor, d.dosya);
      if (!fs.existsSync(dosya)) { hatalar.push(d.dosya + ': dosya yok'); continue; }
      if (d.dosya[0] !== d.konu.toLowerCase()) hatalar.push(`${d.dosya}: ${d.konu} konusunda ama dosya adı "${d.dosya[0]}" ile başlıyor`);
      await page.goto('file://' + dosya); await sleep(250);
      const g = await page.evaluate(() => (window.Ders && Ders.current ? { id: Ders.current.id, sahne: Ders.current.scenes.filter((s) => !s.internal).length } : null));
      const beklenen = bilgi.temaId + '-' + d.dosya.split('-')[0];
      if (!g) hatalar.push(d.dosya + ': ders başlamadı (Ders.start çağrılmadı ya da hata verdi)');
      else {
        if (g.id !== beklenen) hatalar.push(`${d.dosya}: dersin id alanı "${g.id}", "${beklenen}" olmalı`);
        if (g.sahne !== d.sahne) hatalar.push(`${d.dosya}: derste ${g.sahne} sahne var, tema.js ${d.sahne} diyor`);
      }
    }

    simdi = 'index.html';
    const sayfa = path.join(klasor, 'index.html');
    if (!fs.existsSync(sayfa)) hatalar.push('index.html yok (tema sayfası)');
    else if (tema) {
      await page.goto('file://' + sayfa); await sleep(400);
      const s = await page.evaluate(() => ({ kart: document.querySelectorAll('.lesson').length, baglanti: [...document.querySelectorAll('a[href]')].map((a) => a.href.split('#')[0]) }));
      if (s.kart !== dersler.length) hatalar.push(`tema sayfası ${s.kart} kısa ders gösteriyor, tema.js içinde ${dersler.length} var`);
      for (const h of new Set(s.baglanti)) if (h.startsWith('file://') && !fs.existsSync(decodeURIComponent(h.slice(7)))) hatalar.push('kırık bağlantı: ' + decodeURIComponent(h.slice(7)).replace(KOK + '/', ''));
    }
    hatalar.push(...new Set(konsol));

    const yayinda = tema && tema.yayinda ? 'yayında' : 'yayında değil';
    console.log(`${ad}: ${dersler.length} kısa ders, ${yayinda}. ${hatalar.length ? hatalar.length + ' sorun:' : 'Sorun yok.'}`);
    hatalar.forEach((h) => console.log('  - ' + h));
    sorun += hatalar.length;
  }
  await browser.close();
  process.exit(sorun ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
