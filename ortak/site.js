/* Ana sayfa ve ünite sayfaları. Dersler ve ünite sırası ortak/katalog.js içinde, her ünitenin kısa dersleri
   kendi unite.js dosyasındadır; ilerleme dersin tarayıcıya yazdığı 'ders:<kimlik>' kayıtlarından okunur
   (ortak/ders.js). Bağımlılık yok.

   Ana sayfa:     <script>Site.anasayfa()</script>            (yayındaki ünitelerin unite.js dosyasını kendi yükler)
   Ünite sayfası: katalog.js ve kendi unite.js dosyasından sonra
                  <script>Site.unite('matematik', 'sayilar', { kok: '../../' })</script>   (kok: site köküne göreli yol) */
(function (global) {
  'use strict';
  const K = global.KATALOG;
  const oku = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const TIK = '<svg class="tick" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5"/></svg>';
  const OYNAT = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';

  /* Bir ünitenin kısa dersleri, öğrencinin ilerlemesiyle birlikte. */
  function uniteDurumu(ders, unite, no, kok) {
    const kisa = [];
    (unite.konular || []).forEach((konu) => konu.dersler.forEach(([dosya, baslik, kanca, sahne]) => {
      const kod = dosya.split('-')[0];
      const id = unite.id + '-' + kod;
      const p = oku('ders:' + id) || {};
      const yapilan = (p.done || []).length;
      const toplam = Number(p.sahne) || sahne + 2;   // + çıkış soruları ve özet
      kisa.push({
        id, kod: kod.toUpperCase(), konu, baslik, kanca, yapilan, toplam, href: kok + unite.yol + dosya,
        bitti: yapilan >= toplam, suren: yapilan > 0 && yapilan < toplam,
        soru: Number(p.total) ? (Number(p.score) || 0) + '/' + Number(p.total) : '',
      });
    }));
    return { ders, unite, no, kisa, href: kok + unite.yol + 'index.html', biten: kisa.filter((d) => d.bitti).length };
  }

  /* Öğrencinin şimdi açması gereken kısa ders: en son açtığı (bitmediyse), yoksa sırada bitmemiş ilk ders. */
  function siradaki(durumlar) {
    const hepsi = durumlar.flatMap((u) => u.kisa.map((d) => ({ ...d, u })));
    const son = oku('ders:son');
    const sonDers = son && hepsi.find((d) => d.id === son.id);
    if (sonDers && !sonDers.bitti) return { d: sonDers, etiket: 'Kaldığın yerden' };
    if (sonDers) {
      const sonraki = hepsi.slice(hepsi.indexOf(sonDers) + 1).find((d) => !d.bitti) || hepsi.find((d) => !d.bitti);
      return sonraki ? { d: sonraki, etiket: 'Sıradaki kısa ders' } : null;
    }
    const yarim = hepsi.find((d) => d.suren);
    if (yarim) return { d: yarim, etiket: 'Kaldığın yerden' };
    const ilk = hepsi.find((d) => !d.bitti);
    return ilk ? { d: ilk, etiket: hepsi.some((d) => d.yapilan) ? 'Sıradaki kısa ders' : 'Buradan başla' } : null;
  }

  const eylem = (d) => (d.bitti ? 'Tekrar izle' : d.suren ? 'Devam et ›' : 'Başla ›');
  const sahneCizgileri = (d) => '<span class="ticks">' + Array.from({ length: d.toplam }, (_, i) => `<i${i < d.yapilan ? ' class="on"' : ''}></i>`).join('') + '</span>';
  const dersCizgileri = (liste) => '<span class="segs">' + liste.map((d) => `<i class="${d.bitti ? 'on' : d.suren ? 'half' : ''}"></i>`).join('') + '</span>';

  /* Tahta: dersin açılış sorusu. Sitenin tek renkli yüzeyi; derse girince aynı tahta büyür. */
  function tahta(d) {
    return `<a class="board" href="${d.href}" style="--k:${d.konu.renk}" tabindex="-1" aria-hidden="true">
      <span class="code">${d.kod}</span>
      <span class="ask">${esc(d.kanca)}</span>
      ${sahneCizgileri(d)}
    </a>`;
  }

  function ust(kok, iz) {
    return `<header class="bar"><div class="wrap">
      <a class="brand" href="${kok}index.html">${esc(K.sinif)} dersleri</a>
      ${iz ? `<nav class="trail" aria-label="Konum">${iz}</nav>` : ''}
    </div></header>`;
  }

  /* Yayındaki ünitelerin unite.js dosyalarını yükler. Yüklenemeyen ünite hazırlanıyor sayılır. */
  function uniteleriYukle(kok) {
    return Promise.all(K.dersler.flatMap((ders) => ders.uniteler.filter((u) => u.yayinda && !u.yol).map((u) => new Promise((bitti) => {
      const s = document.createElement('script');
      s.src = kok + ders.id + '/' + u.id + '/unite.js';
      s.onload = s.onerror = bitti;
      document.head.appendChild(s);
    }))));
  }

  /* ---------- Ana sayfa ---------- */
  function anasayfa(secenek) {
    const kok = (secenek && secenek.kok) || '';
    return uniteleriYukle(kok).then(() => anasayfayiCiz(kok));
  }
  function anasayfayiCiz(kok) {
    const dersler = K.dersler.map((ders) => ({ ders, uniteler: ders.uniteler.map((u, i) => (u.yol ? uniteDurumu(ders, u, i + 1, kok) : { ders, unite: u, no: i + 1 })) }));
    const yayinda = dersler.flatMap((x) => x.uniteler.filter((u) => u.kisa));
    const s = siradaki(yayinda);

    let kahraman;
    if (s) {
      const d = s.d;
      kahraman = `<section class="resume">
        ${tahta(d)}
        <div class="resume-text">
          <p class="state">${s.etiket}</p>
          <h1>${esc(d.baslik)}</h1>
          <p class="where">${esc(d.u.ders.ad)}, ${esc(d.u.unite.ad)}${d.suren ? ` <span class="count">${d.yapilan} / ${d.toplam} sahne</span>` : ''}</p>
          <p class="actions"><a class="go" href="${d.href}">${eylem(d)}</a><a class="more" href="${d.u.href}">Üniteyi aç</a></p>
        </div>
      </section>`;
    } else {
      kahraman = `<section class="resume done"><div class="resume-text">
        <p class="state">Hepsi tamam</p>
        <h1>Yayındaki kısa derslerin hepsini bitirdin.</h1>
        <p class="where">İstediğin dersi yeniden izleyebilirsin; yeni üniteler eklendikçe burada görünür.</p>
      </div></section>`;
    }

    const bloklar = dersler.map(({ ders, uniteler }) => {
      const acik = uniteler.filter((u) => u.kisa), bekleyen = uniteler.filter((u) => !u.kisa);
      const toplam = acik.reduce((n, u) => n + u.kisa.length, 0), biten = acik.reduce((n, u) => n + u.biten, 0);
      const uniteHtml = acik.map((u) => `<div class="unit">
          <a class="unit-head" href="${u.href}"><span class="no">${u.no}. ünite</span><span class="name">${esc(u.unite.ad)}</span><span class="open">Üniteyi aç ›</span></a>
          ${u.unite.konular.map((k) => {
            const liste = u.kisa.filter((d) => d.konu === k);
            return `<a class="topic" href="${u.href}#konu-${k.harf.toLowerCase()}" style="--k:${k.renk}">
              <span class="letter">${k.harf}</span><span class="name">${esc(k.ad)}</span>${dersCizgileri(liste)}<span class="count">${liste.filter((d) => d.bitti).length} / ${liste.length}</span></a>`;
          }).join('')}
        </div>`).join('');
      const bekleyenHtml = bekleyen.length ? `<div class="soon"><p>Hazırlanan üniteler</p><ol>${bekleyen.map((u) => `<li value="${u.no}">${esc(u.unite.ad)}</li>`).join('')}</ol></div>` : '';
      return `<section class="subject">
        <div class="subject-head">
          <span class="glyph" aria-hidden="true">${esc(ders.simge)}</span>
          <div class="title"><h2>${esc(ders.ad)}</h2><p>${acik.length} ünite yayında, ${toplam} kısa ders</p></div>
          <p class="count"><b>${biten}</b> / ${toplam} kısa ders tamamlandı</p>
        </div>
        ${uniteHtml}${bekleyenHtml}
      </section>`;
    }).join('');

    document.body.classList.add('site');
    document.body.innerHTML = ust(kok) + `<main class="wrap page">${kahraman}${bloklar}</main>`;
  }

  /* ---------- Ünite sayfası ---------- */
  function unite(dersId, uniteId, secenek) {
    const kok = (secenek && secenek.kok) || '';
    const ders = K.dersler.find((d) => d.id === dersId);
    if (!ders.uniteler.find((x) => x.id === uniteId).yol) throw new Error('Ünitenin unite.js dosyası yüklenmemiş: ' + dersId + '/' + uniteId);
    const u = uniteDurumu(ders, ders.uniteler.find((x) => x.id === uniteId), ders.uniteler.findIndex((x) => x.id === uniteId) + 1, kok);
    const s = siradaki([u]);
    const acikHarf = (location.hash.match(/^#konu-([a-z])$/) || [])[1] || (s ? s.d.konu.harf.toLowerCase() : '');

    const kart = (d) => `<a class="lesson${d.suren ? ' current' : ''}${d.bitti ? ' done' : ''}" href="${d.href}" style="--k:${d.konu.renk}">
        <span class="code">${d.kod}</span>
        <span class="body">
          <span class="row"><span class="name">${esc(d.baslik)}</span>${d.bitti ? `<span class="status">${TIK}Tamamlandı${d.soru ? ', sorular ' + d.soru : ''}</span>` : d.suren ? `<span class="status">${d.yapilan} / ${d.toplam} sahne</span>` : ''}</span>
          <span class="ask">${esc(d.kanca)}</span>
          <span class="do">${eylem(d)}</span>
        </span>
      </a>`;

    const konular = u.unite.konular.map((k) => {
      const liste = u.kisa.filter((d) => d.konu === k), harf = k.harf.toLowerCase();
      return `<details class="topic-block" id="konu-${harf}" style="--k:${k.renk}"${harf === acikHarf ? ' open' : ''}>
        <summary><span class="letter">${k.harf}</span><span class="name">${esc(k.ad)}</span>${dersCizgileri(liste)}<span class="count">${liste.filter((d) => d.bitti).length} / ${liste.length} kısa ders</span></summary>
        <div class="lessons">${liste.map(kart).join('')}</div>
      </details>`;
    }).join('');

    const hikayeler = (u.unite.hikayeler || []).length ? `<section class="stories">
        <h2>Hikâyeler</h2>
        <p class="sub">Derslerin sonundaki kısa videolar. Sınavdan önce hızlı tekrar için.</p>
        <div class="story-list">${u.unite.hikayeler.map((h) => `<a class="story" href="${kok + u.unite.yol + h.video}">
          <span class="thumb">${OYNAT}</span>
          <span class="body"><span class="name">${esc(h.ad)}</span><span class="from">${h.kod} ${esc(h.ders)}</span></span></a>`).join('')}</div>
      </section>` : '';

    const yan = s
      ? `<p class="count"><b>${u.biten}</b> / ${u.kisa.length} kısa ders tamamlandı</p>
         <p class="next"><span>${s.etiket}</span><b style="color:${s.d.konu.renk}">${s.d.kod}</b> ${esc(s.d.baslik)}</p>
         <a class="go" href="${s.d.href}">${eylem(s.d)}</a>`
      : `<p class="count"><b>${u.biten}</b> / ${u.kisa.length} kısa ders tamamlandı</p><p class="next">Ünitenin hepsini bitirdin. İstediğin dersi yeniden izleyebilirsin.</p>`;

    document.title = u.unite.ad + ' — ' + K.sinif + ' ' + ders.ad;
    document.body.classList.add('site');
    document.body.innerHTML = ust(kok, `<a href="${kok}index.html">${esc(ders.ad)}</a><span aria-hidden="true">›</span><span>${esc(u.unite.ad)}</span>`) + `<main class="wrap page">
      <section class="unit-top">
        <div class="unit-intro"><p class="where">${esc(ders.ad)}, ${u.no}. ünite</p><h1>${esc(u.unite.ad)}</h1><p class="lead">${esc(u.unite.tanitim || '')}</p></div>
        <div class="progress">${yan}</div>
      </section>
      <section class="topics">${konular}</section>
      ${hikayeler}
      <p class="hint">Derste sahneler arasında <kbd>←</kbd> <kbd>→</kbd> ile gez, <kbd>Boşluk</kbd> ile duraklat. Öğrendiğin kurallar sağdaki deftere yazılır.</p>
    </main>`;
  }

  global.Site = { anasayfa, unite };
})(window);
