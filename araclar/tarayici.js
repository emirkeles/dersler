// Araçların ortak kısmı: dersi başsız Chrome'da açar ve sahneleri baştan sona, etkileşimleri otomatik geçerek oynatır.
const puppeteer = require('puppeteer-core');
const fs = require('fs'), path = require('path');

const KOK = path.resolve(__dirname, '..');
const CHROME = process.env.CHROME_PATH || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
].find((p) => fs.existsSync(p));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* "a1" → kökteki a1-*.html, "02" → 02-*.html */
function dersDosyasi(no) {
  const on = /^\d+$/.test(no) ? String(no).padStart(2, '0') : String(no).toLowerCase();
  const f = fs.readdirSync(KOK).find((x) => x.startsWith(on + '-') && x.endsWith('.html'));
  if (!f) throw new Error('Ders bulunamadı: ' + no);
  return path.join(KOK, f);
}

async function dersiAc(dosya, viewport = { width: 1366, height: 657 }) {
  if (!CHROME) throw new Error('Chrome bulunamadı. CHROME_PATH ortam değişkeniyle yolunu ver.');
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const hatalar = [];
  page.on('pageerror', (e) => hatalar.push('SAYFA HATASI ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') hatalar.push('KONSOL ' + m.text()); });
  await page.goto('file://' + dosya);
  await sleep(400);
  const bilgi = await page.evaluate(() => ({ id: Ders.current.id, basliklar: Ders.current.scenes.map((s) => s.title), icSahne: Ders.current.scenes.map((s) => !!s.internal) }));
  return { browser, page, hatalar, ...bilgi };
}

/* Bir sahneyi oynatır; "Devam", ilk şık vb. otomatik tıklanır. herAdim her yoklamada çağrılır. */
async function sahneyiOynat(page, i, { hiz = 3, sureSiniri = 80000, herAdim } = {}) {
  await page.evaluate((i, hiz) => { window.scrollTo(0, 0); Ders.current.state.speed = hiz; Ders.current.go(i, true); }, i, hiz);
  const t0 = Date.now();
  while (Date.now() - t0 < sureSiniri) {
    await sleep(150);
    await page.evaluate(() => {
      const btn = document.querySelector('.act button.btn, .scroll .card > button.btn');
      if (btn && !btn.closest('.panel')) return btn.click();
      const panelBtn = document.querySelector('.panel > .btn.pulse'); if (panelBtn) return panelBtn.click();
      const opts = [...document.querySelectorAll('.opts .opt:not(:disabled)')];
      if (opts.length && !document.querySelector('.opt.right')) opts[0].click();
    });
    if (herAdim) await herAdim();
    if (await page.evaluate((i) => Ders.current.state.done.has(i), i)) return true;
  }
  return false;
}

module.exports = { KOK, sleep, dersDosyasi, dersiAc, sahneyiOynat };
