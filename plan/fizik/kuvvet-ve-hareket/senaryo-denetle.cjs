#!/usr/bin/env node
/* Senaryoların biçim denetimi (PLAN.md bölüm 2b). Kimya Etkileşim temasındaki betiğin kopyası.
   node plan/fizik/kuvvet-ve-hareket/senaryo-denetle.cjs [dosya…]     (dosya verilmezse senaryolar/*.md)
   Bakar: altyazı ≤ 12 kelime; öğrenciye görünen metinde kitaba/sınıfa/derse gönderme; dersin ilk sorusundan önce ≥ 5,
   her sorudan önce (aynı sahnede) ≥ 3 anlatım cümlesi; sahne başına ≥ 4 cümle; ders başına sayım. */
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, 'senaryolar');
const dosyalar = process.argv.length > 2 ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort().map((f) => path.join(dir, f));
const YASAK = /kitap|kitab|sayfa|\bs\. ?\d|hazır veri|sınıfta yapıl|deney yapmıyoruz|bu derste|bu sahnede|kaynakta|kaynağa göre/i;
let sorun = 0; const ozet = [];
for (const f of dosyalar) {
  let ders = null, sahne = null, cikis = false, v2 = false;
  const bitir = () => { if (!ders) return; if (v2) ozet.push(`${ders.ad.padEnd(46)} ${String(ders.sahne).padStart(2)} sahne  ${String(ders.cumle).padStart(3)} cümle  ${String(ders.soru).padStart(2)} soru  ${ders.dene} dene  ${ders.cikis} çıkış`); else ozet.push(`${ders.ad.padEnd(46)} (eski biçim: "### Sahne" başlığı yok)`); };
  const hata = (m) => { sorun++; console.log(`${path.basename(f)} · ${ders ? ders.kod : '?'}${sahne ? ' S' + sahne.no : ''}: ${m}`); };
  const sahneBitir = () => { if (sahne && sahne.cumle < 4) hata(`sahnede ${sahne.cumle} anlatım cümlesi (en az 4)`); sahne = null; };
  for (const ham of fs.readFileSync(f, 'utf8').split('\n')) {
    const s = ham.trim(); let m;
    if ((m = s.match(/^## ([A-H]\d+) · (.*)$/))) { sahneBitir(); bitir(); ders = { kod: m[1], ad: m[1] + ' · ' + m[2], sahne: 0, cumle: 0, soru: 0, dene: 0, cikis: 0 }; cikis = false; v2 = false; continue; }
    if (!ders) continue;
    if ((m = s.match(/^### Sahne (\d+)/))) { sahneBitir(); v2 = true; ders.sahne++; sahne = { no: +m[1], cumle: 0 }; cikis = false; continue; }
    if (/^### Çıkış soruları/.test(s)) { sahneBitir(); cikis = true; continue; }
    if (/^### /.test(s)) { sahneBitir(); cikis = false; continue; }
    const gorunen = s.replace(/\s*Dayandığı anlatım:.*$/, '').replace(/\s*Gerekçe:.*$/, '').replace(/\s*\(ön bilgi\)\s*$/, '');
    if (cikis) { if (/^\d+\. /.test(s)) { ders.cikis++; if (YASAK.test(gorunen)) hata(`çıkış sorusunda gönderme: ${gorunen.slice(0, 80)}`); } continue; }
    if (!sahne) continue;
    if ((m = gorunen.match(/^(\d+)\. (.*)$/))) {
      const kelime = m[2].replace(/[*_"“”]/g, '').split(/\s+/).filter(Boolean).length;
      ders.cumle++; sahne.cumle++;
      if (kelime > 12) hata(`${kelime} kelime: ${m[2]}`);
      if (YASAK.test(m[2])) hata(`anlatımda gönderme: ${m[2]}`);
      continue;
    }
    if (/^Soru\b/.test(s)) { ders.soru++; if (ders.soru === 1 && ders.cumle < 5) hata(`ilk sorudan önce ${ders.cumle} cümle (en az 5)`); if (sahne.cumle < 3) hata(`sorudan önce bu sahnede ${sahne.cumle} cümle (en az 3)`); if (YASAK.test(gorunen)) hata(`soruda gönderme: ${gorunen.slice(0, 80)}`); continue; }
    if (/^Dene\b/.test(s)) { ders.dene++; if (YASAK.test(gorunen)) hata(`denede gönderme: ${gorunen.slice(0, 80)}`); continue; }
    if (/^Defter:/.test(s) && YASAK.test(s)) hata(`defterde gönderme: ${s.slice(0, 80)}`);
  }
  sahneBitir(); bitir();
}
console.log(ozet.join('\n')); console.log(sorun ? `\n${sorun} sorun` : '\nSorun yok');
process.exit(sorun ? 1 : 0);
