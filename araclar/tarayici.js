// Araçların ortak kısmı: dersi başsız Chrome'da açar ve sahneleri baştan sona, etkileşimleri otomatik geçerek oynatır.
const puppeteer = require('puppeteer-core');
const fs = require('fs'), path = require('path');

const KOK = path.resolve(__dirname, '..');
/* HyperFrames'in indirdiği başsız Chrome (~/.cache/hyperframes/chrome/…/chrome-headless-shell); Chrome kurulu değilse o kullanılır. */
function hyperframesChrome() {
  const kok = path.join(require('os').homedir(), '.cache', 'hyperframes', 'chrome');
  const ara = (d, derinlik) => {
    if (derinlik > 4 || !fs.existsSync(d)) return null;
    for (const x of fs.readdirSync(d, { withFileTypes: true })) {
      const tam = path.join(d, x.name);
      if (x.isFile() && /^chrome-headless-shell(\.exe)?$/.test(x.name)) return tam;
      if (x.isDirectory()) { const b = ara(tam, derinlik + 1); if (b) return b; }
    }
    return null;
  };
  return ara(kok, 0);
}
const CHROME = process.env.CHROME_PATH || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
].find((p) => fs.existsSync(p)) || hyperframesChrome();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* "a1" → matematik/sayilar/a1-*.html. Tema klasörleri <ders>/<tema>/ biçimindedir; aynı kod birden çok
   temada varsa "sayilar/a1" ya da "matematik/sayilar/a1" diye yazılır. */
const DISARIDA = new Set(['araclar', 'ortak', 'plan', 'node_modules']);
function temaKlasorleri() {
  const alt = (d) => fs.readdirSync(d, { withFileTypes: true }).filter((x) => x.isDirectory() && !x.name.startsWith('.')).map((x) => x.name);
  return alt(KOK).filter((d) => !DISARIDA.has(d)).flatMap((d) => alt(path.join(KOK, d)).map((u) => path.join(KOK, d, u)));
}
function dersDosyasi(no) {
  const parca = String(no).toLowerCase().split('/');
  const kod = parca.pop();
  const on = /^\d+$/.test(kod) ? kod.padStart(2, '0') : kod;
  const bulunan = temaKlasorleri()
    .filter((k) => !parca.length || path.relative(KOK, k).split(path.sep).join('/').endsWith(parca.join('/')))
    .flatMap((k) => fs.readdirSync(k).filter((x) => x.startsWith(on + '-') && x.endsWith('.html')).map((x) => path.join(k, x)));
  if (!bulunan.length) throw new Error('Ders bulunamadı: ' + no);
  if (bulunan.length > 1) throw new Error('Birden çok ders bulundu (' + bulunan.map((f) => path.relative(KOK, f)).join(', ') + '). Temayı de yaz: sayilar/' + kod);
  return bulunan[0];
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

module.exports = { KOK, CHROME, sleep, temaKlasorleri, dersDosyasi, dersiAc, sahneyiOynat };
