#!/usr/bin/env node
/* Bir temanın tema.js dosyasını kısa derslerle karşılaştırır; yayına almadan önce çalıştırılır.

   node denetle.js matematik/sayilar     Tek tema.
   node denetle.js                       tema.js dosyası olan bütün temalar.

   Denetlenenler:
     katalog   tema ortak/katalog.js içinde kayıtlı mı · listelenen her dosya var mı · klasörde listede olmayan ders var mı
     ders      açılıyor mu · kimliği <tema>-<kod> mu · sahne sayısı tema.js ile aynı mı · süresi ölçülmüş mü (sure.js) · konsol hatası, yüklenemeyen dosya
     sayfa     tema sayfası her kısa dersi gösteriyor mu · kırık bağlantı var mı
     kural     tema.js içinde `kural: 2` olan temada (plan/KURALLAR.md 3.2, 3.4): 4–5 çıkış sorusu · temanın ilk dersi
               dışında ilk sahne "Hatırla" · her konunun son dersi konu tekrarı (<kod>-tekrar.html, 6–10 soru).
               "Birlikte çöz" adımı bulunamayan ders not olarak yazılır (çıkış kodunu etkilemez).
               Eski temada bu denetim yapılmaz; `--kural` ile kaç dersin eksik kaldığı özetlenir.
   Sorun varsa çıkış kodu 1'dir. */
const fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer-core');
const { KOK, CHROME, sleep, temaKlasorleri, katalogOku } = require('./tarayici');

const hedef = process.argv.slice(2).find((a) => !a.startsWith('--'));
const kuralGoster = process.argv.includes('--kural');
const klasorler = temaKlasorleri()
  .filter((k) => fs.existsSync(path.join(k, 'tema.js')))
  .filter((k) => !hedef || path.relative(KOK, k).split(path.sep).join('/') === hedef.replace(/\/$/, ''));
if (!klasorler.length) { console.error(hedef ? 'tema.js bulunamadı: ' + hedef : 'tema.js dosyası olan tema yok.'); process.exit(1); }

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
    const hatalar = [], notlar = []; konsol.length = 0;
    let bilgi;
    try { bilgi = katalogOku(klasor); } catch (e) { hatalar.push('tema.js okunamadı: ' + e.message); }
    const tema = bilgi && bilgi.tema;
    const dersler = tema && tema.konular ? tema.konular.flatMap((k) => k.dersler.map((d) => ({ konu: k.harf, dosya: d[0], baslik: d[1], sahne: d[3], sure: d[4] }))) : [];
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
      const g = await page.evaluate(() => (window.Ders && Ders.current ? {
        id: Ders.current.id, sahne: Ders.current.scenes.filter((s) => !s.internal).length, soru: Ders.current.soru,
        ilk: (Ders.current.scenes.find((s) => !s.internal) || {}).title || '',
        betik: [...document.scripts].map((x) => x.src).filter((x) => /\/dersler\//.test(x)),
      } : null));
      const beklenen = bilgi.temaId + '-' + d.dosya.split('-')[0];
      if (!g) hatalar.push(d.dosya + ': ders başlamadı (Ders.start çağrılmadı ya da hata verdi)');
      else {
        if (g.id !== beklenen) hatalar.push(`${d.dosya}: dersin id alanı "${g.id}", "${beklenen}" olmalı`);
        if (g.sahne !== d.sahne) hatalar.push(`${d.dosya}: derste ${g.sahne} sahne var, tema.js ${d.sahne} diyor`);
        d.soru = g.soru; d.ilk = g.ilk;
        d.birlikte = g.betik.some((u) => { try { return fs.readFileSync(decodeURIComponent(u.replace('file://', '')), 'utf8').includes('Birlikte çöz'); } catch (e) { return false; } });
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
    const suresiz = dersler.filter((d) => !(d.sure > 0)).map((d) => d.dosya.split('-')[0].toUpperCase());
    if (suresiz.length) hatalar.push(`süresi ölçülmemiş ${suresiz.length} kısa ders (${suresiz.join(', ')}): node araclar/sure.js ${ad}`);

    /* Anlatım kuralları (plan/KURALLAR.md 3.2, 3.4). */
    let kuralOzeti = '';
    if (tema && tema.konular && (tema.kural >= 2 || kuralGoster)) {
      const tekrar = (dosya) => /-tekrar\.html$/.test(dosya), kod = (d) => d.dosya.split('-')[0].toUpperCase();
      const eksik = [];
      const tekrarsiz = tema.konular.filter((k) => k.dersler.length && !tekrar(k.dersler[k.dersler.length - 1][0]));
      tekrarsiz.forEach((k) => eksik.push(`Konu ${k.harf}: son ders konu tekrarı değil (dosya adı <kod>-tekrar.html olmalı)`));
      const olculen = dersler.filter((d) => d.soru != null);
      const soruYanlis = olculen.filter((d) => (tekrar(d.dosya) ? d.soru < 6 || d.soru > 10 : d.soru < 4 || d.soru > 5));
      soruYanlis.forEach((d) => eksik.push(tekrar(d.dosya) ? `${d.dosya}: konu tekrarında ${d.soru} soru var, 6–10 olmalı` : `${d.dosya}: ${d.soru} çıkış sorusu var, 4–5 olmalı`));
      const hatirlasiz = olculen.filter((d, n) => d !== dersler[0] && !tekrar(d.dosya) && !/^Hatırla/.test(d.ilk));
      hatirlasiz.forEach((d) => eksik.push(`${d.dosya}: ilk sahne "Hatırla" değil (ilk sahne: ${d.ilk || '?'})`));
      const birliktesiz = olculen.filter((d) => !tekrar(d.dosya) && !d.birlikte);
      if (tema.kural >= 2) {
        hatalar.push(...eksik);
        birliktesiz.forEach((d) => notlar.push(`${d.dosya}: "Birlikte çöz" adımı bulunamadı; yarısı çözülmüş örnek var mı diye bak`));
      } else {
        kuralOzeti = `  Yeni kurallara göre (eski tema, sorun sayılmaz): çıkış sorusu 4–5 değil ${soruYanlis.length}/${olculen.length} ders · "Hatırla" sahnesi yok ${hatirlasiz.length} ders · "Birlikte çöz" yok ${birliktesiz.length} ders · konu tekrarı yok ${tekrarsiz.length}/${tema.konular.length} konu`;
      }
    }

    const yayinda = tema && tema.yayinda ? 'yayında' : 'yayında değil';
    console.log(`${ad}: ${dersler.length} kısa ders, ${yayinda}. ${hatalar.length ? hatalar.length + ' sorun:' : 'Sorun yok.'}`);
    hatalar.forEach((h) => console.log('  - ' + h));
    notlar.forEach((n) => console.log('  · not: ' + n));
    if (kuralOzeti) console.log(kuralOzeti);
    sorun += hatalar.length;
  }
  await browser.close();
  process.exit(sorun ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
