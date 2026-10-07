#!/usr/bin/env node
/* Ölçücüye ek kontrol: biten sahnelerdeki tüm seçici durumları.
   node plan/kimya/etkilesim/denetim.js [a1 a2 …]
   node plan/kimya/etkilesim/denetim.js --tema   Tema ve telefon görünümü
   Ekranlar ve rapor proje dışında /private/tmp/etkilesim-etkilesim-denetimi/ altında. */
'use strict';
const fs = require('fs'), path = require('path');
const { dersiAc, sleep, KOK, CHROME, sahneyiOynat } = require('../../../araclar/tarayici');
const kok = path.join(KOK, 'kimya/etkilesim');
const windowKatalog = {};
new Function('window', fs.readFileSync(path.join(KOK, 'ortak/katalog.js'), 'utf8'))(windowKatalog);
new Function('KATALOG', fs.readFileSync(path.join(kok, 'tema.js'), 'utf8'))(windowKatalog.KATALOG);
const tema = windowKatalog.KATALOG.dersler.find((d) => d.id === 'kimya').temalar.find((t) => t.id === 'etkilesim');
const sadeceTema = process.argv.includes('--tema');
const kodlar = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const dersler = tema.konular.flatMap((k) => k.dersler).filter((d) => !kodlar.length || kodlar.includes(d[0].split('-')[0]));
if (!dersler.length) throw new Error('Denetlenecek ders bulunamadı.');
const cikti = '/private/tmp/etkilesim-etkilesim-denetimi';
fs.mkdirSync(cikti, { recursive: true });

function durum() {
  const stage = document.querySelector('.stage'), sr = stage.getBoundingClientRect();
  const gorunur = (el) => {
    let o = 1;
    for (let e = el; e && e !== stage; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      o *= Number(cs.opacity);
    }
    return o >= 0.15;
  };
  const txt = [...stage.querySelectorAll('svg text')].filter((e) => e.textContent.trim() && gorunur(e));
  const kutu = txt.map((el) => ({ el, r: el.getBoundingClientRect() }));
  const tasan = kutu.filter(({ r }) => r.left < sr.left - 2 || r.right > sr.right + 2 || r.top < sr.top - 2 || r.bottom > sr.bottom + 2);
  const kelime = txt.reduce((n, e) => n + e.textContent.trim().split(/\s+/).length, 0);
  let ustuste = 0;
  for (let i = 0; i < kutu.length; i++) for (let j = i + 1; j < kutu.length; j++) {
    const a = kutu[i].r, b = kutu[j].r;
    const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (w > 3 && h > 3 && w * h / Math.min(a.width * a.height, b.width * b.height) > 0.3) ustuste++;
  }
  const act = document.querySelector('.act'), ar = act.getBoundingClientRect();
  const panelTasma = [...act.querySelectorAll('*')].some((el) => el.getBoundingClientRect().right > ar.right + 3);
  return { kelime, ustuste, tasan: tasan.map(({ el }) => el.textContent), panelTasma,
    metin: txt.map((el) => el.textContent), sayfaKayiyor: document.documentElement.scrollHeight > innerHeight + 2 };
}

(async () => {
  if (sadeceTema) {
    const puppeteer = require('../../../araclar/node_modules/puppeteer-core');
    const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage(), hatalar = [];
    page.on('pageerror', (e) => hatalar.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') hatalar.push(m.text()); });
    try {
      const kayit = [];
      for (const [width, height] of [[1366, 657], [390, 844]]) {
        await page.setViewport({ width, height });
        await page.goto('file://' + path.join(kok, 'index.html'));
        await page.evaluate(() => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
        await sleep(300);
        const r = await page.evaluate(() => ({ konular: document.querySelectorAll('.topic-block').length,
          dersler: document.querySelectorAll('.lesson').length, yanaTasma: document.documentElement.scrollWidth > innerWidth + 2 }));
        if (r.konular !== 8 || r.dersler !== 18 || r.yanaTasma) throw new Error('Tema görünümü: ' + JSON.stringify(r));
        kayit.push({ width, height, ...r });
        await page.screenshot({ path: path.join(cikti, 'tema-' + width + '-tam.png'), fullPage: true });
        for (const harf of ['a', 'c', 'e', 'g']) {
          await page.evaluate((harf) => document.querySelector('#konu-' + harf).scrollIntoView(), harf);
          await page.screenshot({ path: path.join(cikti, 'tema-' + width + '-' + harf + '.png') });
        }
      }
      if (hatalar.length) throw new Error(hatalar.join('\n'));
      fs.writeFileSync(path.join(cikti, 'tema.json'), JSON.stringify(kayit, null, 2));
      console.log('Tema: 8 konu, 18 ders; masaüstü ve telefon görünümünde yatay taşma 0, konsol temiz.');
    } finally { await browser.close(); }
    const mobile = await dersiAc(path.join(kok, 'e2-pauli-ve-hund.html'), { width: 390, height: 844 });
    try {
      if (!(await sahneyiOynat(mobile.page, 0))) throw new Error('Telefon E2 sahnesi tamamlanmadı.');
      if (await mobile.page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2)) throw new Error('Telefon dersinde yatay taşma.');
      if (mobile.hatalar.length) throw new Error(mobile.hatalar.join('\n'));
      await mobile.page.screenshot({ path: path.join(cikti, 'ders-e2-telefon.png'), fullPage: true });
      console.log('Telefon E2: ilk sahne tamam, yatay taşma 0, konsol temiz.');
    } finally { await mobile.browser.close(); }
    return;
  }
  let toplam = 0, hata = 0;
  for (const d of dersler) {
    const kod = d[0].split('-')[0];
    const { browser, page, basliklar, icSahne, hatalar } = await dersiAc(path.join(kok, d[0]));
    const kayit = [];
    try {
      for (let i = 0; i < basliklar.length; i++) {
        if (icSahne[i]) continue;
        const kontrol = async (etiket) => {
          const r = await page.evaluate(durum);
          const sorun = r.kelime > 25 || r.ustuste || r.tasan.length || r.panelTasma || r.sayfaKayiyor;
          kayit.push({ sahne: i + 1, durum: etiket, ...r, sorun: !!sorun }); toplam++;
          if (sorun) { hata++; console.log(kod, i + 1, etiket, JSON.stringify(r)); }
          await page.screenshot({ path: path.join(cikti, `${kod}-s${i + 1}-${etiket}.png`) });
        };
        await page.evaluate((i) => { Ders.current.state.speed = 3; Ders.current.state.voice = false; Ders.current.go(i, true); }, i);
        const t0 = Date.now(); let seciciNo = 0;
        // Seçiciyi "Devam" tıklanmadan denetler: ders sonradan paneli silebilir.
        while (true) {
          await sleep(150);
          const seciciler = await page.evaluate(() => [...document.querySelectorAll('.act input[type=range]')].map((e, s) => ({ s, min: +e.min, max: +e.max, step: +e.step || 1, denendi: !!e.dataset.etkilesimDenendi })));
          const menus = await page.evaluate(() => [...document.querySelectorAll('.act select')].map((e, s) => ({ s, values: [...e.options].map((o) => o.value), denendi: !!e.dataset.etkilesimDenendi })));
          const modlar = menus.reduce((a, m) => a.flatMap((v) => m.values.map((value) => [...v, { s: m.s, value }])), [[]]);
          if (modlar.length > 40) throw new Error('Menü kombinasyonları için açık denetim aralığı gerekir.');
          const modSec = async (mod) => {
            for (const m of mod) await page.evaluate((m) => {
              const e = document.querySelectorAll('.act select')[m.s];
              e.value = m.value; e.dispatchEvent(new Event('change', { bubbles: true }));
            }, m);
          };
          for (const m of menus.filter((m) => !m.denendi)) {
            await page.evaluate((s) => { document.querySelectorAll('.act select')[s].dataset.etkilesimDenendi = '1'; }, m.s);
            for (const value of m.values) {
              await modSec([{ s: m.s, value }]); await sleep(500);
              await kontrol('menu' + m.s + '-deger' + value);
            }
          }
          for (const ctl of seciciler.filter((s) => !s.denendi)) {
            await page.evaluate((s) => { document.querySelectorAll('.act input[type=range]')[s].dataset.etkilesimDenendi = '1'; }, ctl.s);
            for (let mi = 0; mi < modlar.length; mi++) {
              await modSec(modlar[mi]);
              const aralik = await page.evaluate((s) => {
                const e = document.querySelectorAll('.act input[type=range]')[s];
                e.dataset.etkilesimDenendi = '1';
                return { min: +e.min, max: +e.max, step: +e.step || 1 };
              }, ctl.s);
              const degerler = [];
              for (let v = aralik.min; v <= aralik.max && degerler.length < 200; v += aralik.step) degerler.push(v);
              if ((aralik.max - aralik.min) / aralik.step >= 200) throw new Error('Seçicinin durum sayısı çok büyük; açık denetim aralığı gerekir.');
              for (const v of degerler) {
                await page.evaluate((s, v) => {
                  const e = document.querySelectorAll('.act input[type=range]')[s];
                  e.value = v; e.dispatchEvent(new Event('input', { bubbles: true }));
                }, ctl.s, v);
                await sleep(500);
                await kontrol('secici' + seciciNo + '-deger' + v + (modlar.length > 1 ? '-mod' + mi : ''));
              }
            }
            seciciNo++;
          }
          await page.evaluate(() => {
            const btn = document.querySelector('.act button.btn, .scroll .card > button.btn');
            if (btn && !btn.closest('.panel')) return btn.click();
            const next = document.querySelector('.panel > .btn.pulse'); if (next) return next.click();
            const opts = [...document.querySelectorAll('.opts .opt:not(:disabled)')];
            if (opts.length && !document.querySelector('.opt.right')) opts[0].click();
          });
          if (await page.evaluate((i) => Ders.current.state.done.has(i), i)) break;
          if (Date.now() - t0 > 180000) throw new Error(kod + ': sahne tamamlanmadı: ' + (i + 1));
        }
        await sleep(350); await kontrol('son');
      }
      if (hatalar.length) { hata += hatalar.length; console.log(kod, hatalar); }
      fs.writeFileSync(path.join(cikti, kod + '.json'), JSON.stringify({ kod, kayit, hatalar }, null, 2));
      console.log(`${kod}: ${kayit.length} sahne/seçici durumu, ${kayit.filter((r) => r.sorun).length + hatalar.length} sorun.`);
    } finally { await browser.close(); }
  }
  console.log(`${dersler.length} ders, ${toplam} durum, ${hata} sorun.`);
  process.exitCode = hata ? 1 : 0;
})().catch((e) => { console.error(e); process.exitCode = 1; });
