#!/usr/bin/env node
/* Kısa derslerin yaklaşık süresini içerikten hesaplar ve temanın tema.js dosyasına yazar
   (satırın beşinci öğesi, saniye). Ana sayfa, tema sayfası ve dersin giriş ekranı bu sayıyı gösterir.

   node sure.js matematik/sayilar        Temanın bütün kısa dersleri.
   node sure.js sayilar/a1               Tek kısa ders.
   node sure.js                          tema.js dosyası olan bütün temalar.
   node sure.js … --yazma                Yalnızca göster, tema.js dosyasına yazma.
   node sure.js … --ayrinti              Her dersin sahne sahne dökümü.

   Süre = anlatım + etkileşim.
     anlatım    Ders sanal bir saatle (saniyede 60 kare, 1× hız) baştan sona oynatılır; altyazıların okuma
                süresi, beklemeler ve animasyonlar motorun kendi zamanlayıcısından ölçülür. Klibi olan altyazıda
                okuma süresinin yerine klibin süresi sayılır (ders sesle açılır). Video sahnesi videonun süresidir.
     etkileşim  Öğrencinin okuyup düşündüğü yerler ölçülemez; aşağıdaki INSAN değerleriyle hesaplanır
                (soru ve şıkların uzunluğu, düşünme payı, geri bildirimi okuma, sahne geçişleri).
   INSAN değerleri gerçek öğrenciyle ölçülmedi, kabuldür; değiştirince bütün temalar yeniden ölçülür. */
const fs = require('fs'), path = require('path');
const puppeteer = require('puppeteer-core');
const { KOK, CHROME, temaKlasorleri, dersDosyasi, katalogOku } = require('./tarayici');

const INSAN = {
  okuma: 60,          // ms/karakter: soru, şık, geri bildirim, giriş ve özet metni
  devam: 1500,        // "Devam ›" düğmesi
  kesif: 8000,        // kaydırıcı ya da serbest panelle deneme
  dusun: 4000,        // sahne içi tahmin sorusunda düşünme
  ayniSik: 0.7,       // şıkları daha önce görülmüş tahmin sorusunda şıkların okunmayan payı
  yanlis: 0.3,        // tahmin sorusunda ilk seçimin yanlış olma payı
  yanlisEk: 2500,     // yanlıştan sonra ipucunu okuyup yeniden seçme (okuma hariç)
  soruDusun: 6000,    // çıkış sorusunda düşünme
  soruGeri: 0.75,     // çıkış sorusunun açıklamasından okunan pay (yanlışta iki açıklama birden görünür)
  sonuc: 3000,        // çıkış sorularının sonuç kartı
  gecis: 2000,        // sahneler arasında "Sonraki ›"
  giris: 2500,        // giriş ekranında "Derse başla ›"
  elle: 20000,        // aracın kendi geçemediği etkileşim (sürükle bırak vb.)
};
const KLIP_ARASI = 300;   // motor klipten sonra bu kadar bekler (ortak/ders.js, say)

const args = process.argv.slice(2);
const yazma = args.includes('--yazma'), ayrinti = args.includes('--ayrinti');
const hedef = args.find((a) => !a.startsWith('--'));

/* ---------- ses ve video süresi ---------- */
/* MP3: ilk karedeki Xing/Info başlığından kare sayısı; yoksa sabit bit hızı sayılır. */
function mp3Suresi(dosya) {
  const b = fs.readFileSync(dosya);
  let i = b.toString('latin1', 0, 3) === 'ID3' ? 10 + ((b[6] & 127) << 21 | (b[7] & 127) << 14 | (b[8] & 127) << 7 | (b[9] & 127)) : 0;
  while (i < b.length - 4 && !(b[i] === 0xff && (b[i + 1] & 0xe0) === 0xe0)) i++;
  if (i >= b.length - 4) return 0;
  const surum = (b[i + 1] >> 3) & 3, bit = (b[i + 2] >> 4) & 15, hz = (b[i + 2] >> 2) & 3;   // surum 3 = MPEG1
  const ornek = [44100, 48000, 32000][hz] / (surum === 3 ? 1 : surum === 2 ? 2 : 4);
  const kbps = (surum === 3 ? [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320] : [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160])[bit];
  const bas = b.toString('latin1', i, i + 200), x = Math.max(bas.indexOf('Xing'), bas.indexOf('Info'));
  if (x >= 0 && (b.readUInt32BE(i + x + 4) & 1)) return b.readUInt32BE(i + x + 8) * (surum === 3 ? 1152 : 576) / ornek;
  return kbps ? (b.length - i) * 8 / (kbps * 1000) : 0;
}
/* MP4: moov > mvhd kutusundaki süre. */
function mp4Suresi(dosya) {
  const fd = fs.openSync(dosya, 'r'), boyut = fs.fstatSync(fd).size, bas = Buffer.alloc(32);
  const kutu = (ad, i, son) => {
    while (i < son - 8) {
      fs.readSync(fd, bas, 0, 16, i);
      let n = bas.readUInt32BE(0), govde = 8;
      if (n === 1) { n = Number(bas.readBigUInt64BE(8)); govde = 16; } else if (n === 0) n = son - i;
      if (bas.toString('latin1', 4, 8) === ad) return [i + govde, i + n];
      if (n < 8) break;
      i += n;
    }
    return null;
  };
  try {
    const moov = kutu('moov', 0, boyut), mvhd = moov && kutu('mvhd', moov[0], moov[1]);
    if (!mvhd) return 0;
    fs.readSync(fd, bas, 0, 32, mvhd[0]);
    return bas[0] === 1 ? Number(bas.readBigUInt64BE(24)) / bas.readUInt32BE(20) : bas.readUInt32BE(16) / bas.readUInt32BE(12);
  } finally { fs.closeSync(fd); }
}

/* ---------- sayfada çalışanlar ---------- */
/* Sanal saat: requestAnimationFrame yerine geçer. Her karede saat 1/60 sn ilerler; kareler beklemeden art arda
   işlenir, böylece ders gerçek süresinden çok daha çabuk oynar ama motorun zamanlayıcısı 1× hızdaki süreyi sayar.
   Zamanlayıcı kurulu değilken (öğrenci bekleniyorken) saat durur. */
function sanalSaat() {
  let kuyruk = [], no = 0;
  window.__t = 0; window.__kare = null;
  window.requestAnimationFrame = (fn) => { kuyruk.push([++no, fn]); return no; };
  window.cancelAnimationFrame = (id) => { kuyruk = kuyruk.filter((x) => x[0] !== id); };
  const kanal = new MessageChannel();
  const kare = () => {
    const is = kuyruk; kuyruk = [];
    if (is.length) window.__t += 1000 / 60;
    for (const [, fn] of is) { try { fn(window.__t); } catch (e) { console.error(e); } }
    if (window.__kare) window.__kare(is.length > 0);
    if (is.length) kanal.port2.postMessage(0); else setTimeout(kare, 4);
  };
  kanal.port1.onmessage = kare;
  kanal.port2.postMessage(0);
}

/* Dersi baştan sona oynatır; etkileşimleri görür görmez geçer ve ne geçtiğini kaydeder. */
async function oynat() {
  const D = Ders.current, st = D.state, sc = D.scenes;
  const uzunluk = (el) => (el ? el.textContent : '').replace(/\s+/g, ' ').trim().length;
  const duz = (html) => { const d = document.createElement('div'); d.innerHTML = html; return (d.textContent || '').replace(/\s+/g, ' ').trim(); };
  st.voice = false; st.speed = 1; st.done.clear();
  const giris = document.querySelector('.intro');
  const sonuc = { id: D.id, giris: giris ? uzunluk(giris.querySelector('h2')) + uzunluk(giris.querySelector('p')) : null, klipler: (Ders.ses[D.id] || {}).clips || {}, klipKok: (Ders.ses[D.id] || {}).base || '', sahneler: [] };

  let aktif = null;
  /* Altyazı: motorun beklediği süre ölçülür; klibi olanlarda araç bunu klibin süresiyle değiştirir. */
  sc.forEach((s, i) => {
    if (s.video) return;
    const run = s.run;
    s.run = (c) => {
      const say = c.say;
      c.say = async (html, o = {}) => {
        const k = { anahtar: Ders.sesKey(o.speak || duz(html)), bekleme: 0, beklemesiz: !!o.noWait }, t0 = window.__t;
        if (aktif && aktif.i === i) aktif.altyazi.push(k);
        await say(html, o);
        k.bekleme = window.__t - t0;
      };
      return run(c);
    };
  });

  /* Araçların ortak tıklama sırası (tarayici.js, sahneyiOynat) + ne tıklandığının kaydı. */
  const kutular = new WeakMap(), denenen = new WeakSet();
  function tikla() {
    const act = document.querySelector('.act');
    const btn = document.querySelector('.act button.btn, .scroll .card > button.btn');
    if (btn && !btn.closest('.panel')) {
      if (btn.closest('.scroll')) aktif.olay.push({ tur: 'sonraki' });
      else {
        const alan = [...act.querySelectorAll('.panel')].find((p) => !denenen.has(p) && p.querySelector('input, select, button, [draggable]'));
        if (alan) denenen.add(alan);
        aktif.olay.push({ tur: alan ? 'kesif' : 'devam' });
      }
      btn.click(); return true;
    }
    const panelBtn = document.querySelector('.panel > .btn.pulse');
    if (panelBtn) { if (!panelBtn.parentElement.querySelector('.opts')) aktif.olay.push({ tur: 'devam' }); panelBtn.click(); return true; }
    const opts = [...document.querySelectorAll('.opts .opt:not(:disabled)')];
    if (opts.length && !document.querySelector('.opt.right')) {
      const kutu = opts[0].closest('.card, .panel') || opts[0].parentElement, soru = !!opts[0].closest('.scroll');
      let o = kutular.get(kutu);
      if (!o) { o = { tur: soru ? 'soru' : 'secim', metin: uzunluk(kutu), siklar: [...kutu.querySelectorAll('.opt')].map((x) => x.textContent.trim()).join('|'), ipucu: [], geri: 0 }; kutular.set(kutu, o); aktif.olay.push(o); }
      opts[0].click();
      const n = uzunluk(kutu.querySelector('.fb'));
      if (soru || kutu.querySelector('.opt.right')) o.geri = n; else o.ipucu.push(n);
      return true;
    }
    return false;
  }

  for (let i = 0; i < sc.length; i++) {
    const k = { i, baslik: sc[i].title, ic: !!sc[i].internal, video: sc[i].video || null, sure: 0, altyazi: [], olay: [], bitti: true, metin: 0 };
    sonuc.sahneler.push(k);
    if (k.video) continue;
    aktif = k;
    const t0 = window.__t;
    k.bitti = await new Promise((res) => {
      let son = performance.now();
      const basla = son;
      window.__kare = (ilerledi) => {
        if (st.done.has(i)) return res(true);
        if (tikla() || ilerledi) son = performance.now();
        // Zamanlayıcı da tıklanacak şey de yoksa ders aracın geçemediği bir etkileşimi bekliyordur.
        if (performance.now() - son > 2500 || performance.now() - basla > 60000 || window.__t - t0 > 30 * 60000) res(false);
      };
      D.go(i, true);
    });
    window.__kare = null;
    k.sure = window.__t - t0;
    if (k.ic) k.metin = uzunluk(document.querySelector('.scroll'));
  }
  return sonuc;
}

/* ---------- hesap ---------- */
function hesapla(r, klasor) {
  const oku = (n) => n * INSAN.okuma;
  const klipSuresi = {};
  const klip = (anahtar) => {
    if (!r.klipler[anahtar]) return null;
    if (!(anahtar in klipSuresi)) {
      const f = path.join(klasor, r.klipKok, r.klipler[anahtar]);
      klipSuresi[anahtar] = fs.existsSync(f) ? mp3Suresi(f) * 1000 : null;
    }
    return klipSuresi[anahtar];
  };
  let anlatim = 0, etkilesim = r.giris == null ? 0 : oku(r.giris) + INSAN.giris, altyazi = 0, sesli = 0;
  const gorulenSiklar = new Set();
  const sahneler = r.sahneler.map((s) => {
    let a = s.sure, e = 0;
    if (s.video) {
      const f = path.join(klasor, s.video);
      a = fs.existsSync(f) ? mp4Suresi(f) * 1000 : 0;
      if (!a) s.bitti = false;
    }
    for (const k of s.altyazi) {
      if (k.beklemesiz) continue;
      altyazi++;
      const ms = klip(k.anahtar);
      if (ms) { a += ms + KLIP_ARASI - k.bekleme; sesli++; }
    }
    for (const o of s.olay) {
      if (o.tur === 'devam') e += INSAN.devam;
      else if (o.tur === 'kesif') e += INSAN.kesif + INSAN.devam;
      else if (o.tur === 'sonraki') e += INSAN.devam;
      else if (o.tur === 'secim') {
        const ipucu = o.ipucu.length ? o.ipucu.reduce((x, y) => x + y, 0) / o.ipucu.length : 0;
        // Aynı şıklar art arda sorulduğunda (sınıflama dizileri) şıklar yeniden baştan okunmaz.
        const metin = gorulenSiklar.has(o.siklar) ? o.metin - INSAN.ayniSik * o.siklar.length : o.metin;
        gorulenSiklar.add(o.siklar);
        e += oku(metin) + INSAN.dusun + INSAN.yanlis * (oku(ipucu) + INSAN.yanlisEk) + oku(o.geri) + INSAN.devam;
      } else if (o.tur === 'soru') e += oku(o.metin) + INSAN.soruDusun + oku(o.geri) * INSAN.soruGeri;
    }
    if (s.ic && s.olay.some((o) => o.tur === 'soru')) e += INSAN.sonuc;
    else if (s.ic) e += oku(s.metin);
    if (!s.bitti) e += INSAN.elle;
    anlatim += a; etkilesim += e;
    return { ...s, anlatim: a, etkilesim: e };
  });
  etkilesim += INSAN.gecis * Math.max(0, r.sahneler.length - 1);
  return { id: r.id, saniye: Math.round((anlatim + etkilesim) / 1000), anlatim, etkilesim, altyazi, sesli, sahneler, tamamlanmayan: sahneler.filter((s) => !s.bitti).map((s) => s.i + 1) };
}

/* ---------- tema.js ---------- */
/* Dersin satırını bulur ve beşinci öğeyi yazar: ['a1-….html', 'Başlık', 'Açılış sorusu', sahne, saniye]. */
function satiraYaz(kaynak, dosya, saniye) {
  const bas = [`'${dosya}'`, `"${dosya}"`].map((s) => kaynak.indexOf(s)).find((i) => i >= 0);
  if (bas == null) return null;
  const virgul = [];
  let i = bas, derinlik = 0;
  for (; i < kaynak.length; i++) {
    const ch = kaynak[i];
    if (ch === "'" || ch === '"' || ch === '`') { for (i++; i < kaynak.length && kaynak[i] !== ch; i++) if (kaynak[i] === '\\') i++; continue; }
    if ('[({'.includes(ch)) derinlik++;
    else if ('])}'.includes(ch)) { if (!derinlik) break; derinlik--; }
    else if (ch === ',' && !derinlik) virgul.push(i);
  }
  if (virgul.length < 3 || i >= kaynak.length) return null;
  const kes = virgul.length > 3 ? virgul[3] : i;
  return kaynak.slice(0, kes).replace(/\s+$/, '') + (kaynak[virgul[2] + 1] === ' ' ? ', ' : ',') + saniye + kaynak.slice(i);
}

const dk = (ms) => { const sn = Math.round(ms / 1000); return Math.floor(sn / 60) + ':' + String(sn % 60).padStart(2, '0'); };

(async () => {
  if (!CHROME) throw new Error('Chrome bulunamadı. CHROME_PATH ortam değişkeniyle yolunu ver.');
  const yol = (k) => path.relative(KOK, k).split(path.sep).join('/');
  const temalar = temaKlasorleri().filter((k) => fs.existsSync(path.join(k, 'tema.js')));
  const secili = !hedef ? temalar : temalar.filter((k) => yol(k) === hedef.replace(/\/$/, ''));
  let tekDers = null;
  if (hedef && !secili.length) { tekDers = dersDosyasi(hedef); secili.push(path.dirname(tekDers)); }
  if (!secili.length) throw new Error('tema.js dosyası olan tema yok.');

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--disable-background-timer-throttling', '--disable-renderer-backgrounding'] });
  async function olc(dosya) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1366, height: 657 });
      await page.evaluateOnNewDocument(sanalSaat);
      await page.goto('file://' + dosya);
      await page.waitForFunction(() => window.Ders && Ders.current, { timeout: 10000 });
      return hesapla(await page.evaluate(oynat), path.dirname(dosya));
    } finally { await page.close(); }
  }

  let uyari = 0;
  for (const klasor of secili) {
    const { tema } = katalogOku(klasor);
    if (!tema || !tema.konular) { console.log(`${yol(klasor)}: tema.js okunamadı ya da tema katalogda yok.`); uyari++; continue; }
    const dersler = tema.konular.flatMap((k) => k.dersler.map((d) => ({ konu: k, dosya: d[0], eski: d[4] })))
      .filter((d) => fs.existsSync(path.join(klasor, d.dosya)) && (!tekDers || path.basename(tekDers) === d.dosya));

    /* Dört ders aynı anda ölçülür. */
    const sonuc = new Array(dersler.length);
    let sira = 0;
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (sira < dersler.length) {
        const n = sira++;
        try { sonuc[n] = await olc(path.join(klasor, dersler[n].dosya)); } catch (e) { sonuc[n] = { hata: e.message }; }
      }
    }));

    console.log(`\n${yol(klasor)}`);
    console.log('  ders   süre   anlatım  etkileşim  altyazı (sesli)');
    let kaynak = fs.readFileSync(path.join(klasor, 'tema.js'), 'utf8'), degisen = 0;
    const konuToplam = new Map();
    dersler.forEach((d, n) => {
      const r = sonuc[n], kod = d.dosya.split('-')[0].toUpperCase();
      if (r.hata) { console.log(`  ${kod.padEnd(5)} ölçülemedi: ${r.hata}`); uyari++; return; }
      konuToplam.set(d.konu, (konuToplam.get(d.konu) || 0) + r.saniye);
      console.log(`  ${kod.padEnd(5)} ${dk(r.saniye * 1000).padStart(5)}  ${dk(r.anlatim).padStart(7)}  ${dk(r.etkilesim).padStart(9)}  ${String(r.altyazi).padStart(4)} (${r.sesli})${d.eski && d.eski !== r.saniye ? `   önceki ${dk(d.eski * 1000)}` : ''}${r.tamamlanmayan.length ? `   UYARI: araç ${r.tamamlanmayan.join(', ')}. sahneyi geçemedi, ${INSAN.elle / 1000} sn sayıldı` : ''}`);
      if (r.tamamlanmayan.length) uyari++;
      if (ayrinti) r.sahneler.forEach((s) => console.log(`           ${String(s.i + 1).padStart(2)}  ${dk(s.anlatim).padStart(5)} + ${dk(s.etkilesim).padStart(5)}  ${s.baslik}${s.video ? ' (video)' : ''}`));
      if (d.eski !== r.saniye) {
        const yeni = satiraYaz(kaynak, d.dosya, r.saniye);
        if (yeni) { kaynak = yeni; degisen++; } else { console.log(`  ${kod.padEnd(5)} tema.js satırı bulunamadı`); uyari++; }
      }
    });
    if (!tekDers) {
      for (const [k, sn] of konuToplam) console.log(`  Konu ${k.harf}: ${dk(sn * 1000)}`);
      console.log(`  Tema: ${dk([...konuToplam.values()].reduce((a, b) => a + b, 0) * 1000)} (${dersler.length} kısa ders)`);
    }
    if (degisen && !yazma) {
      const dosya = path.join(klasor, 'tema.js'), onceki = fs.readFileSync(dosya, 'utf8');
      fs.writeFileSync(dosya, kaynak);
      /* Yazılan dosya okunabiliyor ve sayılar yerinde mi? Değilse eski hâline dön. */
      let tamam = false;
      try {
        const yeni = katalogOku(klasor).tema.konular.flatMap((k) => k.dersler);
        tamam = dersler.every((d, n) => sonuc[n].hata || yeni.find((x) => x[0] === d.dosya)[4] === sonuc[n].saniye);
      } catch (e) { /* aşağıda geri alınır */ }
      if (!tamam) { fs.writeFileSync(dosya, onceki); console.log('  tema.js yazılamadı (satır biçimi tanınmadı); dosya eski hâlinde.'); uyari++; }
      else console.log(`  tema.js: ${degisen} satır güncellendi.`);
    } else if (degisen) console.log(`  --yazma: ${degisen} satır değişirdi, yazılmadı.`);
    else console.log('  tema.js güncel.');
  }
  await browser.close();
  process.exit(uyari ? 1 : 0);
})().catch((e) => { console.error(e.message); process.exit(1); });
