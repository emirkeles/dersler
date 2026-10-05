#!/usr/bin/env node
/* Dersi baştan sona oynatır; yerleşimi ve yazı bütçesini ölçer.

   node olc.js a1                      Dizüstü boyutunda (1366×657) ölç, özet yaz.
   node olc.js a1 --boyut 1280x720     Başka pencere boyutu.
   node olc.js a1 --goruntu cikti/     Her altyazıda ekran görüntüsü de al.

   Denetlenenler (her altyazı anında):
     yerleşim  sayfa kayıyor mu · altyazı kutusuna sığıyor mu · "sıra sende" paneli yana taşıyor mu
     tahta     aynı anda görünen yazı (kelime, öğe) · en küçük punto · üst üste binen / tahtadan taşan yazı
     bütçe     altyazı > 12 kelime · tahtada > 25 kelime · punto < 12 px   (plan/PLAN.md, yazı bütçesi) */
const fs = require('fs'), path = require('path');
const { dersDosyasi, dersiAc, sahneyiOynat, sleep } = require('./tarayici');

const args = process.argv.slice(2);
const deger = (ad) => { const i = args.indexOf(ad); return i >= 0 ? args[i + 1] : null; };
const no = args.find((a) => /^[a-z]?\d+$/i.test(a));
if (!no) { console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].replace('#!/usr/bin/env node\n/* ', '')); process.exit(0); }
const [vw, vh] = (deger('--boyut') || '1366x657').split('x').map(Number);
const cikti = deger('--goruntu');
const BUTCE = { altyazi: 12, tahta: 25, punto: 12 };

/* Sayfaya yerleşen ölçücü: her altyazı için o altyazı ekrandayken görülen en yoğun durumu kaydeder. */
function olcucu() {
  const W = (t) => (t || '').split(/\s+/).filter(Boolean).length;
  const gorunur = (el, dur) => { let o = 1; for (let e = el; e && e !== dur; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; o *= parseFloat(cs.opacity); if (o < 0.15) return 0; } return o; };
  const anlik = () => {
    const stage = document.querySelector('.stage'), cap = document.querySelector('.caption'), act = document.querySelector('.act');
    const sr = stage.getBoundingClientRect(), ar = act.getBoundingClientRect();
    const kutular = []; let kelime = 0, punto = 99, tasan = 0;
    for (const svg of stage.querySelectorAll('svg')) {
      const vb = svg.viewBox.baseVal, r = svg.getBoundingClientRect();
      if (!vb || !vb.width || !r.width) continue;
      const olcek = Math.min(r.width / vb.width, r.height / vb.height);
      for (const t of svg.querySelectorAll('text')) {
        const txt = t.textContent.trim(); if (!txt) continue;
        const bb = t.getBoundingClientRect(); if (bb.width < 1 || bb.height < 1 || !gorunur(t, stage)) continue;
        if (bb.right < sr.left || bb.left > sr.right || bb.bottom < sr.top || bb.top > sr.bottom) continue;
        kelime += W(txt); punto = Math.min(punto, parseFloat(getComputedStyle(t).fontSize) * olcek);
        if (bb.left < sr.left - 2 || bb.right > sr.right + 2 || bb.top < sr.top - 2 || bb.bottom > sr.bottom + 2) tasan++;
        kutular.push([bb.left, bb.top, bb.right, bb.bottom, txt.slice(0, 24)]);
      }
    }
    let ustuste = 0; const ornek = [];
    for (let i = 0; i < kutular.length; i++) for (let j = i + 1; j < kutular.length; j++) {
      const a = kutular[i], b = kutular[j];
      const w = Math.min(a[2], b[2]) - Math.max(a[0], b[0]), hh = Math.min(a[3], b[3]) - Math.max(a[1], b[1]);
      if (w > 3 && hh > 3 && (w * hh) / Math.min((a[2] - a[0]) * (a[3] - a[1]), (b[2] - b[0]) * (b[3] - b[1])) > 0.3) { ustuste++; if (ornek.length < 2) ornek.push(a[4] + ' ⨯ ' + b[4]); }
    }
    return {
      kelime, oge: kutular.length, punto: punto === 99 ? null : +punto.toFixed(1), tasan, ustuste, ornek,
      sayfaKayiyor: document.documentElement.scrollHeight > innerHeight + 2,
      altyaziTasiyor: cap.scrollHeight > cap.clientHeight + 2,
      panelYanaTasiyor: act.scrollWidth > act.clientWidth + 2 || [...act.querySelectorAll('*')].some((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > ar.right + 3; }),
      panelKelime: W(act.innerText), tahta: [Math.round(sr.width), Math.round(sr.height)],
    };
  };
  window.__kayit = []; window.__t = 0;
  let son = performance.now(), simdiki = null;
  const tik = (now) => { const dt = Math.min(now - son, 100); son = now; if (!Ders.current.state.paused) window.__t += dt * Ders.current.state.speed; requestAnimationFrame(tik); };
  requestAnimationFrame(tik);
  const cap = document.querySelector('.caption');
  window.__kapat = () => { if (simdiki) simdiki.sure = Math.round(window.__t - simdiki.t0); };
  new MutationObserver(() => {
    const txt = cap.textContent.replace(/\s+/g, ' ').trim();
    if (simdiki && simdiki.metin === txt) return;
    window.__kapat(); simdiki = null; if (!txt) return;
    simdiki = { sahne: Ders.current.state.i + 1, metin: txt, karakter: txt.length, kelime: W(txt), t0: Math.round(window.__t), en: null };
    window.__kayit.push(simdiki);
  }).observe(cap, { childList: true, subtree: true, characterData: true });
  setInterval(() => {
    if (!simdiki) return; const s = anlik();
    if (!simdiki.en) { simdiki.en = s; return; }
    const e = simdiki.en;
    for (const k of ['kelime', 'oge', 'tasan', 'ustuste', 'panelKelime']) e[k] = Math.max(e[k], s[k]);
    if (s.punto != null) e.punto = e.punto == null ? s.punto : Math.min(e.punto, s.punto);
    for (const k of ['sayfaKayiyor', 'altyaziTasiyor', 'panelYanaTasiyor']) e[k] = e[k] || s[k];
    if (s.ornek.length) e.ornek = s.ornek;
  }, 180);
}

(async () => {
  const dosya = dersDosyasi(no);
  const { browser, page, id, basliklar, icSahne, hatalar } = await dersiAc(dosya, { width: vw, height: vh });
  if (cikti) fs.mkdirSync(cikti, { recursive: true });
  await page.evaluate(olcucu);
  const tamamlanmayan = [];
  for (let i = 0; i < basliklar.length; i++) {
    let gorulen = await page.evaluate(() => window.__kayit.length), k = 0, bekleyen = 0;
    const bitti = await sahneyiOynat(page, i, {
      herAdim: !cikti ? null : async () => {
        const n = await page.evaluate(() => window.__kayit.length);
        if (n > gorulen) { gorulen = n; bekleyen = Date.now() + 420; }
        if (bekleyen && Date.now() >= bekleyen) { bekleyen = 0; k++; await page.screenshot({ path: path.join(cikti, `s${String(i + 1).padStart(2, '0')}-${String(k).padStart(2, '0')}.png`) }); }
      },
    });
    if (!bitti) tamamlanmayan.push(i + 1);
    await sleep(250);
    if (cikti) await page.screenshot({ path: path.join(cikti, `s${String(i + 1).padStart(2, '0')}-son.png`) });
  }
  const kayit = (await page.evaluate(() => { window.__kapat(); return window.__kayit; })).filter((c) => c.en);
  const notlar = await page.evaluate(() => [...document.querySelectorAll('.notes .note')].map((x) => x.innerText.replace(/\s+/g, ' ').trim()));
  await browser.close();
  if (cikti) fs.writeFileSync(path.join(cikti, 'olcum.json'), JSON.stringify({ id, boyut: [vw, vh], kayit, notlar, hatalar }, null, 1));

  const ders = kayit.filter((c) => !icSahne[c.sahne - 1]);
  const say = (f) => ders.filter(f).length;
  const sahneler = [...new Set(ders.map((c) => c.sahne))];
  console.log(`\n${id} · ${vw}×${vh} · tahta ${ders[0] ? ders[0].en.tahta.join('×') : '?'} · ${sahneler.length} sahne · ${ders.length} altyazı · ${ders.reduce((a, c) => a + c.kelime, 0)} kelime`);
  console.log(` sahne  altyazı  kelime  en uzun  tahtada en çok  en küçük punto  üst üste  taşan`);
  for (const s of sahneler) {
    const cs = ders.filter((c) => c.sahne === s), en = (k) => Math.max(...cs.map((c) => c.en[k]));
    const p = cs.map((c) => c.en.punto).filter((x) => x != null);
    console.log(`  ${String(s).padStart(2)}    ${String(cs.length).padStart(5)}  ${String(cs.reduce((a, c) => a + c.kelime, 0)).padStart(6)}  ${String(Math.max(...cs.map((c) => c.kelime))).padStart(7)}  ${String(en('kelime')).padStart(14)}  ${String(p.length ? Math.min(...p) : '-').padStart(14)}  ${String(en('ustuste')).padStart(8)}  ${String(en('tasan')).padStart(5)}   ${basliklar[s - 1]}`);
  }
  console.log(`\n yerleşim: sayfa kayıyor ${say((c) => c.en.sayfaKayiyor)} · altyazı sığmıyor ${say((c) => c.en.altyaziTasiyor)} · panel yana taşıyor ${say((c) => c.en.panelYanaTasiyor)} · üst üste yazı ${say((c) => c.en.ustuste)} · tahtadan taşan yazı ${say((c) => c.en.tasan)}`);
  console.log(` bütçe:    altyazı > ${BUTCE.altyazi} kelime ${say((c) => c.kelime > BUTCE.altyazi)}/${ders.length} · tahtada > ${BUTCE.tahta} kelime ${say((c) => c.en.kelime > BUTCE.tahta)}/${ders.length} · punto < ${BUTCE.punto} px ${say((c) => c.en.punto != null && c.en.punto < BUTCE.punto)}/${ders.length}`);
  console.log(` defter:   ${notlar.length} kural, ${notlar.reduce((a, n) => a + n.split(' ').length, 0)} kelime`);
  if (tamamlanmayan.length) console.log(` UYARI: otomatik tamamlanamayan sahneler: ${tamamlanmayan.join(', ')}`);
  console.log(hatalar.length ? ' KONSOL HATALARI:\n  ' + [...new Set(hatalar)].join('\n  ') : ' konsol temiz');
})().catch((e) => { console.error(e.message); process.exit(1); });
