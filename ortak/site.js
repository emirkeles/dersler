/* Ana sayfa ve tema sayfaları. Dersler ve tema sırası ortak/katalog.js içinde, her temanın kısa dersleri
   kendi tema.js dosyasındadır; ilerleme dersin tarayıcıya yazdığı 'ders:<kimlik>' kayıtlarından okunur
   (ortak/ders.js). Bağımlılık yok.

   Ana sayfa:     <script>Site.anasayfa()</script>            (yayındaki temaların tema.js dosyasını kendi yükler;
                  seçili ders adreste durur: index.html#fizik)
   Tema sayfası: katalog.js ve kendi tema.js dosyasından sonra
                  <script>Site.tema('matematik', 'sayilar', { kok: '../../' })</script>   (kok: site köküne göreli yol) */
(function (global) {
  'use strict';
  const K = global.KATALOG;
  const oku = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const TIK = '<svg class="tick" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5"/></svg>';
  const OYNAT = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';

  /* Yaklaşık süre. Saniye tema.js satırından gelir (araclar/sure.js ölçer); bir saatin altı dakikaya,
     üstü beş dakikaya yuvarlanır. Ölçülmemiş ders varsa toplam gösterilmez. */
  const sureYaz = (sn) => {
    if (sn < 3570) return Math.max(1, Math.round(sn / 60)) + ' dk';
    const dk = Math.round(sn / 300) * 5;
    return Math.floor(dk / 60) + ' sa' + (dk % 60 ? ' ' + (dk % 60) + ' dk' : '');
  };
  const toplamSure = (liste) => (liste.length && liste.every((d) => d.sure) ? liste.reduce((n, d) => n + d.sure, 0) : 0);
  const kalanSure = (liste) => (liste.every((d) => d.sure) ? liste.reduce((n, d) => n + (d.bitti ? 0 : d.sure * (1 - d.yapilan / d.toplam)), 0) : 0);
  const sureEtiketi = (sn, on) => (sn ? `<span class="time">${on || ''}${sureYaz(sn)}</span>` : '');

  /* Bir temanın kısa dersleri, öğrencinin ilerlemesiyle birlikte. */
  function temaDurumu(ders, tema, no, kok) {
    const kisa = [];
    (tema.konular || []).forEach((konu) => konu.dersler.forEach(([dosya, baslik, kanca, sahne, sure]) => {
      const kod = dosya.split('-')[0];
      const id = tema.id + '-' + kod;
      const p = oku('ders:' + id) || {};
      const yapilan = (p.done || []).length;
      const toplam = Number(p.sahne) || sahne + 2;   // + çıkış soruları ve özet
      kisa.push({
        id, kod: kod.toUpperCase(), konu, baslik, kanca, yapilan, toplam, sure: Number(sure) || 0, href: kok + tema.yol + dosya,
        bitti: yapilan >= toplam, suren: yapilan > 0 && yapilan < toplam,
        soru: Number(p.total) ? (Number(p.score) || 0) + '/' + Number(p.total) : '',
      });
    }));
    return { ders, tema, no, kisa, href: kok + tema.yol + 'index.html', biten: kisa.filter((d) => d.bitti).length, sure: toplamSure(kisa) };
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

  function ust(kok, iz, genis) {
    return `<header class="bar"><div class="wrap${genis ? ' wide' : ''}">
      <a class="brand" href="${kok}index.html">${esc(K.sinif)} dersleri</a>
      ${iz ? `<nav class="trail" aria-label="Konum">${iz}</nav>` : ''}
    </div></header>`;
  }

  /* Yayındaki temaların tema.js dosyalarını yükler. Yüklenemeyen tema hazırlanıyor sayılır. */
  function temalariYukle(kok) {
    return Promise.all(K.dersler.flatMap((ders) => ders.temalar.filter((u) => u.yayinda && !u.yol).map((u) => new Promise((bitti) => {
      const s = document.createElement('script');
      s.src = kok + ders.id + '/' + u.id + '/tema.js';
      s.onload = s.onerror = bitti;
      document.head.appendChild(s);
    }))));
  }

  /* ---------- Ana sayfa ---------- */
  /* Solda dersler, sağda seçili dersin kaldığın yeri ve temaları. Seçili ders adrestedir (index.html#fizik);
     adres boşsa öğrencinin kaldığı ders, o da yoksa ilk ders açılır. */
  function anasayfa(secenek) {
    const kok = (secenek && secenek.kok) || '';
    return temalariYukle(kok).then(() => {
      anasayfayiCiz(kok);
      global.addEventListener('hashchange', () => {
        anasayfayiCiz(kok);
        const secili = document.querySelector('.subj.on');
        if (secili) secili.focus({ preventScroll: true });
      });
    });
  }
  function anasayfayiCiz(kok) {
    const dersler = K.dersler.map((ders) => {
      const temalar = ders.temalar.map((u, i) => (u.yol ? temaDurumu(ders, u, i + 1, kok) : { ders, tema: u, no: i + 1 }));
      const acik = temalar.filter((u) => u.kisa);
      return { ders, acik, bekleyen: temalar.filter((u) => !u.kisa), toplam: acik.reduce((n, u) => n + u.kisa.length, 0), biten: acik.reduce((n, u) => n + u.biten, 0), sure: toplamSure(acik.flatMap((u) => u.kisa)) };
    });
    const genel = siradaki(dersler.flatMap((x) => x.acik));
    const x = dersler.find((v) => v.ders.id === location.hash.slice(1)) || (genel && dersler.find((v) => v.ders === genel.d.u.ders)) || dersler[0];
    const s = siradaki(x.acik);

    const liste = dersler.map((v) => `<a class="subj${v === x ? ' on' : ''}" href="#${v.ders.id}" style="--d:${v.ders.renk}"${v === x ? ' aria-current="page"' : ''}>
        <span class="glyph" aria-hidden="true">${esc(v.ders.simge)}</span>
        <span class="name">${esc(v.ders.ad)}<small>${v.toplam ? `${v.biten} / ${v.toplam} kısa ders` : 'Hazırlanıyor'}</small></span>
      </a>`).join('');

    let kahraman = '';
    if (s) {
      const d = s.d;
      kahraman = `<section class="resume">
        ${tahta(d)}
        <div class="resume-text">
          <p class="state">${s.etiket}</p>
          <h2>${esc(d.baslik)}</h2>
          <p class="where">${esc(d.u.tema.ad)}${d.suren ? ` <span class="count">${d.yapilan} / ${d.toplam} sahne</span>` : ''}${d.sure ? ` <span class="count">yaklaşık ${sureYaz(d.sure)}</span>` : ''}</p>
          <p class="actions"><a class="go" href="${d.href}">${eylem(d)}</a><a class="more" href="${d.u.href}">Temayı aç</a></p>
        </div>
      </section>`;
    } else if (x.toplam) {
      kahraman = `<section class="resume done"><div class="resume-text">
        <p class="state">Hepsi tamam</p>
        <h2>Bu dersin yayındaki kısa derslerini bitirdin.</h2>
        <p class="where">İstediğin dersi yeniden izleyebilirsin; yeni temalar eklendikçe burada görünür.</p>
      </div></section>`;
    }

    const temaHtml = x.acik.map((u) => `<div class="unit">
        <a class="unit-head" href="${u.href}"><span class="no">${u.no}. tema</span><span class="name">${esc(u.tema.ad)}</span>${sureEtiketi(u.sure, 'yaklaşık ')}<span class="open">Temayı aç ›</span></a>
        ${u.tema.konular.map((k) => {
          const kisa = u.kisa.filter((d) => d.konu === k);
          return `<a class="topic" href="${u.href}#konu-${k.harf.toLowerCase()}" style="--k:${k.renk}">
            <span class="letter">${k.harf}</span><span class="name">${esc(k.ad)}</span>${sureEtiketi(toplamSure(kisa))}${dersCizgileri(kisa)}<span class="count">${kisa.filter((d) => d.bitti).length} / ${kisa.length}</span></a>`;
        }).join('')}
      </div>`).join('');
    const bosHtml = x.acik.length ? '' : '<p class="empty">Bu dersin temaları hazırlanıyor. İlk tema yayına girince kısa dersleri burada görünür.</p>';
    const bekleyenHtml = x.bekleyen.length ? `<section class="soon"><p>Hazırlanan temalar</p><ol>${x.bekleyen.map((u) => `<li><span class="no">${u.no}.</span>${esc(u.tema.ad)}</li>`).join('')}</ol></section>` : '';

    document.title = x.ders.ad + ' — ' + K.sinif + ' dersleri';
    document.body.classList.add('site');
    document.body.innerHTML = ust(kok, '', true) + `<main class="wrap wide page"><div class="split">
      <nav class="subjects" aria-label="Dersler"><p class="subjects-title">Dersler</p>${liste}</nav>
      <section class="pane" style="--d:${x.ders.renk}">
        <div class="pane-head"><h1>${esc(x.ders.ad)}</h1><p class="count">${x.acik.length ? `${x.acik.length} tema yayında, ${x.toplam} kısa ders${x.sure ? ` (yaklaşık ${sureYaz(x.sure)})` : ''}, <b>${x.biten}</b> tanesi tamamlandı` : `${x.bekleyen.length} tema hazırlanıyor`}</p></div>
        ${kahraman}${temaHtml}${bosHtml}${bekleyenHtml}
      </section>
    </div></main>`;
    /* Dar ekranda ders listesi yana kayar; seçili ders görünür kalsın. */
    const kutu = document.querySelector('.subjects'), secili = kutu.querySelector('.on');
    if (kutu.scrollWidth > kutu.clientWidth) kutu.scrollLeft = secili.offsetLeft - kutu.offsetLeft;
  }

  /* ---------- Tema sayfası ---------- */
  function tema(dersId, temaId, secenek) {
    const kok = (secenek && secenek.kok) || '';
    const ders = K.dersler.find((d) => d.id === dersId);
    if (!ders.temalar.find((x) => x.id === temaId).yol) throw new Error('Temanın tema.js dosyası yüklenmemiş: ' + dersId + '/' + temaId);
    const u = temaDurumu(ders, ders.temalar.find((x) => x.id === temaId), ders.temalar.findIndex((x) => x.id === temaId) + 1, kok);
    const s = siradaki([u]);
    const acikHarf = (location.hash.match(/^#konu-([a-z])$/) || [])[1] || (s ? s.d.konu.harf.toLowerCase() : '');

    const kart = (d) => `<a class="lesson${d.suren ? ' current' : ''}${d.bitti ? ' done' : ''}" href="${d.href}" style="--k:${d.konu.renk}">
        <span class="code">${d.kod}</span>
        <span class="body">
          <span class="row"><span class="name">${esc(d.baslik)}</span>${d.bitti ? `<span class="status">${TIK}Tamamlandı${d.soru ? ', sorular ' + d.soru : ''}</span>` : d.suren ? `<span class="status">${d.yapilan} / ${d.toplam} sahne${d.sure ? ' · ' + sureYaz(d.sure) : ''}</span>` : d.sure ? `<span class="status">${sureYaz(d.sure)}</span>` : ''}</span>
          <span class="ask">${esc(d.kanca)}</span>
          <span class="do">${eylem(d)}</span>
        </span>
      </a>`;

    const konular = u.tema.konular.map((k) => {
      const liste = u.kisa.filter((d) => d.konu === k), harf = k.harf.toLowerCase();
      return `<details class="topic-block" id="konu-${harf}" style="--k:${k.renk}"${harf === acikHarf ? ' open' : ''}>
        <summary><span class="letter">${k.harf}</span><span class="name">${esc(k.ad)}</span>${sureEtiketi(toplamSure(liste))}${dersCizgileri(liste)}<span class="count">${liste.filter((d) => d.bitti).length} / ${liste.length} kısa ders</span></summary>
        <div class="lessons">${liste.map(kart).join('')}</div>
      </details>`;
    }).join('');

    const hikayeler = (u.tema.hikayeler || []).length ? `<section class="stories">
        <h2>Hikâyeler</h2>
        <p class="sub">Derslerin sonundaki kısa videolar. Sınavdan önce hızlı tekrar için.</p>
        <div class="story-list">${u.tema.hikayeler.map((h) => `<a class="story" href="${kok + u.tema.yol + h.video}">
          <span class="thumb">${h.kapak ? `<img src="${kok + u.tema.yol + h.kapak}" alt="" loading="lazy">` : ''}<span class="play">${OYNAT}</span></span>
          <span class="body"><span class="name">${esc(h.ad)}</span><span class="from">${h.kod} ${esc(h.ders)}</span></span></a>`).join('')}</div>
      </section>` : '';

    const kalan = kalanSure(u.kisa);
    const sureSatiri = !u.sure ? '' : `<p class="count">${u.kisa.some((d) => d.yapilan) && kalan ? `Kalan süre yaklaşık <b>${sureYaz(kalan)}</b>, tamamı ${sureYaz(u.sure)}` : `Tamamı yaklaşık <b>${sureYaz(u.sure)}</b>`}</p>`;
    const yan = s
      ? `<p class="count"><b>${u.biten}</b> / ${u.kisa.length} kısa ders tamamlandı</p>${sureSatiri}
         <p class="next"><span>${s.etiket}</span><b style="color:${s.d.konu.renk}">${s.d.kod}</b> ${esc(s.d.baslik)}</p>
         <a class="go" href="${s.d.href}">${eylem(s.d)}</a>`
      : `<p class="count"><b>${u.biten}</b> / ${u.kisa.length} kısa ders tamamlandı</p>${sureSatiri}<p class="next">Temanın hepsini bitirdin. İstediğin dersi yeniden izleyebilirsin.</p>`;

    document.title = u.tema.ad + ' — ' + K.sinif + ' ' + ders.ad;
    document.body.classList.add('site');
    document.body.innerHTML = ust(kok, `<a href="${kok}index.html#${ders.id}">${esc(ders.ad)}</a><span aria-hidden="true">›</span><span>${esc(u.tema.ad)}</span>`) + `<main class="wrap page">
      <section class="unit-top">
        <div class="unit-intro"><p class="where">${esc(ders.ad)}, ${u.no}. tema</p><h1>${esc(u.tema.ad)}</h1><p class="lead">${esc(u.tema.tanitim || '')}</p></div>
        <div class="progress">${yan}</div>
      </section>
      <section class="topics">${konular}</section>
      ${hikayeler}
      <p class="hint">Derste sahneler arasında <kbd>←</kbd> <kbd>→</kbd> ile gez, <kbd>Boşluk</kbd> ile duraklat. Öğrendiğin kurallar sağdaki deftere yazılır.</p>
    </main>`;
  }

  global.Site = { anasayfa, tema };
})(window);
