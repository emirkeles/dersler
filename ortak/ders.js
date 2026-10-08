/* Ders motoru — sahne oynatıcı, anlatım, etkileşim bileşenleri, quiz.
   Kullanım ve API için ortak/API.md dosyasına bakın. */
(function (global) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  class Cancelled extends Error {}
  // Sahne değişince iptal edilen bekleyen zamanlayıcılar hata sayılmasın
  window.addEventListener('unhandledrejection', (e) => { if (e.reason instanceof Cancelled) e.preventDefault(); });

  /* ---------- DOM yardımcıları ---------- */
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat()) if (kid != null) el.append(kid.nodeType ? kid : document.createTextNode(kid));
    return el;
  }
  function s(tag, attrs, parent) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'text') el.textContent = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'math') mathText(el, v);
      else el.setAttribute(k, v);
    }
    if (parent) parent.appendChild(el);
    return el;
  }
  /* SVG <text> içinde üs/alt indis: "2^{10}", "x_{n}", "a^2" */
  function mathText(el, str) {
    el.textContent = '';
    const re = /([\^_])(?:\{([^}]*)\}|(.))/g;
    let last = 0, m;
    const push = (txt, attrs) => {
      if (!txt) return;
      const t = document.createElementNS(NS, 'tspan');
      t.textContent = txt;
      for (const [k, v] of Object.entries(attrs || {})) t.setAttribute(k, v);
      el.appendChild(t);
    };
    let pendingDy = 0; // üs/indis sonrası taban çizgisine dönüş (üst öğe em'i cinsinden)
    const plain = (txt) => {
      if (!txt) return;
      const a = pendingDy ? { dy: pendingDy + 'em' } : {};
      pendingDy = 0;
      push(txt, a);
    };
    while ((m = re.exec(str))) {
      plain(str.slice(last, m.index));
      const sup = m[1] === '^';
      const body = m[2] != null ? m[2] : m[3];
      const dy = sup ? -0.55 : 0.35;
      push(body, { dy: dy + 'em', 'font-size': '0.7em' });
      pendingDy = -dy * 0.7;
      last = re.lastIndex;
    }
    plain(str.slice(last));
    return el;
  }
  const M = {
    pow: (b, e) => `${b}<sup>${e}</sup>`,
    sub: (b, e) => `${b}<sub>${e}</sub>`,
    frac: (a, b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`,
    sqrt: (x, n) => `<span class="rad">${n ? `<sup style="font-size:.6em;margin-right:-.1em">${n}</sup>` : ''}<i>√</i><span>${x}</span></span>`,
    m: (x) => `<span class="m">${x}</span>`,
  };

  /* ---------- Easing ---------- */
  const ease = {
    linear: (t) => t,
    in: (t) => t * t * t,
    out: (t) => 1 - Math.pow(1 - t, 3),
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    back: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    bounce: (t) => {
      const n1 = 7.5625, d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    },
    elastic: (t) => (t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1),
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- Kalıcılık ---------- */
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* yoksay */ } },
  };

  const plainText = (html) => { const d = document.createElement('div'); d.innerHTML = html; return (d.textContent || '').replace(/\s+/g, ' ').trim(); };

  /* Kayıtlı anlatım: her altyazının seslendirilecek metni bir anahtara (FNV-1a) çevrilir;
     ses/<ders-id>.js dosyası hangi anahtarın hangi ses dosyasına karşılık geldiğini bildirir.
     Klipler araclar/ses-uret.js ile üretilir. */
  const ses = {};
  const sesKey = (text) => {
    const s_ = String(text).replace(/\s+/g, ' ').trim();
    let hsh = 0x811c9dc5;
    for (let i = 0; i < s_.length; i++) { hsh ^= s_.charCodeAt(i); hsh = Math.imul(hsh, 0x01000193); }
    return (hsh >>> 0).toString(16).padStart(8, '0');
  };

  /* ================= ANA MOTOR ================= */
  function start(cfg) {
    const root = document.getElementById('app');
    root.className = 'ders';
    if (cfg.accent) root.style.setProperty('--accent', cfg.accent);
    document.title = cfg.title + ' — ' + (cfg.kicker || 'Ders');

    const state = { i: -1, token: 0, paused: false, speed: 1, voice: false, noteMap: new Map(), done: new Set() };
    const saved = store.get('ders:' + cfg.id) || {};
    (saved.done || []).forEach((i) => state.done.add(i));
    const clips = (ses[cfg.id] && ses[cfg.id].clips) || {};
    const clipBase = (ses[cfg.id] && ses[cfg.id].base) || ('ses/' + cfg.id + '/');
    const hasClips = Object.keys(clips).length > 0;
    const prefs = store.get('ders:tercih') || {};
    // Kayıtlı anlatımı olan derste ses varsayılan olarak açıktır (öğrenci kapatırsa tercihi hatırlanır).
    state.voice = hasClips ? prefs.voice !== false : false;

    // sahne listesi: kullanıcı sahneleri + (quiz) + özet
    const scenes = cfg.scenes.map((sc) => (sc.video ? { ...sc, run: videoRun(sc) } : { ...sc }));
    if (cfg.quiz && cfg.quiz.length) scenes.push({ title: cfg.quizTitle || 'Mini sınav', goal: 'Öğrendiklerini sına.', run: quizRun, internal: true });
    scenes.push({ title: 'Özet', goal: 'Bugün ne öğrendik?', run: summaryRun, internal: true });

    /* ---- iskelet ---- */
    const el = {};
    root.innerHTML = '';
    root.append(
      h('header', { class: 'top' },
        h('a', { class: 'back', href: cfg.back || 'index.html', title: 'Temaya dön' }, '‹ ' + cfg.title),
        (el.head = h('div', { class: 'scenehead' })),
        (el.tools = h('div', { class: 'tools' }))),
      (el.prog = h('nav', { class: 'prog', 'aria-label': 'Sahneler' })),
      h('div', { class: 'layout' },
        (el.main = h('main', { class: 'main' },
          h('div', { class: 'stagewrap' }, (el.stage = h('div', { class: 'stage' }))),
          (el.cap = h('div', { class: 'caption', 'aria-live': 'polite' })))),
        h('aside', { class: 'rail' },
          (el.act = h('div', { class: 'act' })),
          h('section', { class: 'defter' },
            h('div', { class: 'dh' }, h('h2', {}, 'Defter'), (el.notesAll = h('button', { class: 'all', hidden: true, onclick: toggleNotes }))),
            (el.notes = h('div', { class: 'notes' }))),
          h('footer', { class: 'nav' },
            (el.prev = h('button', { class: 'btn ghost', onclick: () => go(state.i - 1) }, '‹ Önceki')),
            (el.cnt = h('span', { class: 'cnt' })),
            (el.next = h('button', { class: 'btn next', onclick: () => go(state.i + 1) }, 'Sonraki ›'))))));

    el.pauseBtn = h('button', { class: 'tool', title: 'Duraklat / devam (boşluk tuşu)', onclick: togglePause }, 'Duraklat');
    el.speedSel = h('select', { class: 'tool', title: 'Hız', 'aria-label': 'Hız', onchange: (e) => (state.speed = parseFloat(e.target.value)) },
      ...[[0.75, '0,75×'], [1, '1×'], [1.5, '1,5×'], [2, '2×']].map(([v, t]) => h('option', { value: v, selected: v === 1 }, t)));
    el.voiceBtn = h('button', { class: 'tool', title: 'Sesli anlatım', onclick: toggleVoice });
    el.replayBtn = h('button', { class: 'tool', title: 'Sahneyi baştan oynat', onclick: () => go(state.i, true) }, 'Baştan');
    if (!hasClips) el.voiceBtn.style.display = 'none'; // anlatımı kaydedilmemiş derste ses düğmesi görünmez
    const paintVoice = () => { el.voiceBtn.textContent = state.voice ? 'Ses açık' : 'Ses kapalı'; el.voiceBtn.classList.toggle('on', state.voice); };
    paintVoice();
    el.tools.append(el.voiceBtn, el.speedSel, el.replayBtn, el.pauseBtn);

    /* Defter: varsayılan olarak yalnızca son kural görünür; tamamı istenince açılır. Kurallar kalıcıdır. */
    const noteKey = 'ders:' + cfg.id + ':defter';
    function toggleNotes() { el.notes.classList.toggle('open'); paintNotes(); }
    function paintNotes() {
      const n = el.notes.children.length;
      el.notesAll.hidden = n < 2;
      el.notesAll.textContent = el.notes.classList.contains('open') ? 'Yalnızca son kural' : `Tümü (${n})`;
    }
    function addNote(key, title, html, fresh) {
      if (state.noteMap.has(key)) return;
      const card = h('div', { class: 'note' + (fresh ? ' new' : '') }, title ? h('span', { class: 'nt' }, title) : null);
      card.insertAdjacentHTML('beforeend', html);
      el.notes.appendChild(card);
      state.noteMap.set(key, { title, html });
      paintNotes();
      if (fresh) { el.notes.scrollTop = el.notes.scrollHeight; store.set(noteKey, [...state.noteMap].map(([k, v]) => ({ key: k, title: v.title, html: v.html }))); }
    }
    (store.get(noteKey) || []).forEach((n) => addNote(n.key, n.title, n.html, false));

    scenes.forEach((sc, i) => {
      el.prog.append(h('button', { 'data-t': (i + 1) + '. ' + sc.title, 'aria-label': sc.title, onclick: () => go(i) }));
    });

    function togglePause() {
      state.paused = !state.paused;
      el.pauseBtn.textContent = state.paused ? 'Devam et' : 'Duraklat';
      el.pauseBtn.classList.toggle('on', state.paused);
    }
    function toggleVoice() {
      state.voice = !state.voice;
      paintVoice();
      store.set('ders:tercih', { ...(store.get('ders:tercih') || {}), voice: state.voice });
      if (!state.voice && state.audio) state.audio.pause();
    }
    document.addEventListener('keydown', (e) => {
      if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.code === 'Space') { e.preventDefault(); togglePause(); }
      else if (e.key === 'ArrowRight') go(state.i + 1);
      else if (e.key === 'ArrowLeft') go(state.i - 1);
    });

    /* ---- zamanlayıcılar (duraklatılabilir, iptal edilebilir) ---- */
    function ticker(ms, tok, onFrame) {
      return new Promise((res, rej) => {
        let el_ = 0, last = null;
        const step = (now) => {
          if (tok !== state.token) return rej(new Cancelled());
          if (last == null) last = now;
          const dt = Math.min(now - last, 100); last = now;
          if (!state.paused) el_ += dt * state.speed;
          const t = ms <= 0 ? 1 : Math.min(1, el_ / ms);
          if (onFrame) onFrame(t);
          if (t >= 1) res(); else requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }

    /* Kayıtlı klip: duraklat/hız/sahne değişimiyle uyumlu çalar; bitince (ya da çalınamazsa) çözülür. */
    function playClip(file, tok) {
      return new Promise((res, rej) => {
        if (state.audio) state.audio.pause();
        const a = new Audio(clipBase + file);
        state.audio = a;
        let over = false;
        const fin = (fn) => { if (over) return; over = true; clearInterval(poll); a.pause(); if (state.audio === a) state.audio = null; fn(); };
        a.addEventListener('ended', () => fin(res));
        a.addEventListener('error', () => fin(res));
        const poll = setInterval(() => {
          if (tok !== state.token) return fin(() => rej(new Cancelled()));
          if (!state.voice || state.audio !== a) return fin(res);
          a.playbackRate = clamp(state.speed, 0.75, 2);
          if (state.paused && !a.paused) a.pause();
          else if (!state.paused && a.paused && !a.ended) a.play().catch(() => fin(res));
        }, 80);
        a.playbackRate = clamp(state.speed, 0.75, 2);
        if (!state.paused) a.play().catch(() => fin(res));
      });
    }

    /* ---- sahne bağlamı ---- */
    function makeCtx(tok, idx) {
      const alive = () => tok === state.token;
      const guard = () => { if (!alive()) throw new Cancelled(); };
      const listeners = [];
      const c = {
        stage: el.stage, cap: el.cap, act: el.act, S: s, h, M, ease, lerp, clamp, mathText,
        alive,
        wait: async (ms) => { await ticker(ms, tok); },
        tween: (ms, fn, e) => ticker(ms, tok, (t) => fn((e || ease.inOut)(t), t)),
        /* Altyazı + (isteğe bağlı) sesli anlatım. Okuma süresine göre otomatik bekler. */
        say: async (html, opts = {}) => {
          guard();
          el.cap.classList.remove('swap'); void el.cap.offsetWidth; el.cap.classList.add('swap');
          el.cap.innerHTML = html;
          const txt = opts.speak || plainText(html);
          const key = sesKey(txt);
          if (global.__dersSay) global.__dersSay({ scene: idx, key, text: txt, noWait: !!opts.noWait });
          const clip = clips[key];
          // Okuma süresi: karakter başına 75 ms (≈13 karakter/sn); elle verilen süre de 60 ms/karakterin altına inemez.
          const shown = plainText(html).length;
          const read = opts.ms != null ? Math.max(opts.ms, Math.min(shown * 60, 9000)) : clamp(shown * 75, 1800, 11000);
          if (opts.noWait) { if (state.voice && clip) playClip(clip, tok).catch(() => {}); return; }
          if (state.voice && clip) { await playClip(clip, tok); await ticker(300, tok); }
          else await ticker(read, tok);
        },
        clearSay: () => { el.cap.innerHTML = ''; },
        svg: (w = 1000, hh = 562, parent) => {
          const svg = s('svg', { viewBox: `0 0 ${w} ${hh}`, class: 'canvas', preserveAspectRatio: 'xMidYMid meet' });
          (parent || el.stage).appendChild(svg);
          return svg;
        },
        layer: () => { const d = h('div', { class: 'layer' }); el.stage.appendChild(d); return d; },
        on: (target, ev, fn, opt) => { target.addEventListener(ev, fn, opt); listeners.push(() => target.removeEventListener(ev, fn, opt)); },
        /* Defter: kalıcı kural kartı. id verilirse tekrar eklenmez. */
        note: (html, title, id) => { addNote(id || ('s' + idx + ':' + html), title, html, true); },
        /* "Devam" düğmesi: öğrenci tıklayana kadar bekler */
        cont: (label = 'Devam ›') => new Promise((res) => {
          guard();
          const b = h('button', { class: 'btn pulse', onclick: () => { b.remove(); res(); } }, label);
          el.act.appendChild(b);
        }),
        /* Çoktan seçmeli / tahmin: doğru şık seçilene kadar sürer; yanlışta ipucu verir. */
        choice: (o) => new Promise((res) => {
          guard();
          const panel = h('div', { class: 'panel' },
            h('span', { class: 'tag' }, o.tag || 'Tahmin et'),
            h('p', { class: 'q', html: o.q }));
          const opts = h('div', { class: 'opts' });
          const fb = h('div');
          let tries = 0;
          o.options.forEach((txt, i) => {
            const b = h('button', { class: 'opt', html: txt });
            b.addEventListener('click', () => {
              tries++;
              if (o.onPick) o.onPick(i, i === o.answer);
              if (i === o.answer) {
                b.classList.add('right');
                [...opts.children].forEach((x) => (x.disabled = true));
                fb.className = 'fb ok'; fb.innerHTML = o.right || 'Doğru!';
                const nb = h('button', { class: 'btn pulse', style: { marginTop: '10px' }, onclick: () => { panel.remove(); res({ tries, picked: i }); } }, o.next || 'Devam ›');
                panel.appendChild(nb);
              } else {
                b.classList.add('wrong'); b.disabled = true;
                const hint = Array.isArray(o.hints) ? o.hints[i] : o.hints;
                fb.className = 'fb no'; fb.innerHTML = hint || 'Tam değil. Bir daha düşün.';
              }
            });
            opts.appendChild(b);
          });
          panel.append(opts, fb);
          el.act.appendChild(panel);
        }),
        /* Kaydırıcı: {label,min,max,step,value,fmt,onInput} → {el,get,set} */
        slider: (o) => {
          guard();
          const fmt = o.fmt || ((v) => v);
          const inp = h('input', { type: 'range', min: o.min, max: o.max, step: o.step || 1, value: o.value });
          const out = h('output', {}, fmt(+o.value));
          const row = h('div', { class: 'ctl' }, h('label', { html: o.label || '' }), inp, out);
          const panel = h('div', { class: 'panel' }, o.tag === false ? null : h('span', { class: 'tag explore' }, o.tag || 'Dene'), row);
          const api = {
            el: panel, input: inp,
            get: () => +inp.value,
            set: (v) => { inp.value = v; out.textContent = fmt(+inp.value); o.onInput && o.onInput(+inp.value); },
            remove: () => panel.remove(),
          };
          inp.addEventListener('input', () => { out.textContent = fmt(+inp.value); o.onInput && o.onInput(+inp.value); });
          el.act.appendChild(panel);
          o.onInput && o.onInput(+o.value);
          return api;
        },
        /* Serbest panel (kendi kontrollerini koymak için) */
        panel: (tag, ...kids) => {
          guard();
          const p = h('div', { class: 'panel' }, tag ? h('span', { class: 'tag explore' }, tag) : null, ...kids);
          el.act.appendChild(p);
          return p;
        },
        feedback: (box, kind, html) => { box.className = 'fb ' + kind; box.innerHTML = html; },
        clearAct: () => { el.act.innerHTML = ''; },
        goTo: (i) => go(i),
        _cleanup: () => listeners.forEach((f) => f()),
        state,
      };
      return c;
    }

    /* ---- gezinme ---- */
    let curCtx = null;
    async function go(i, force) {
      if (i < 0 || i >= scenes.length) return;
      if (i === state.i && !force) return;
      if (curCtx) curCtx._cleanup();
      state.token++;
      const tok = state.token;
      if (state.audio) state.audio.pause();
      state.i = i;
      store.set('ders:son', { id: cfg.id, t: Date.now() });  // ana sayfadaki "kaldığın yerden" kartı için
      const sc = scenes[i];
      el.stage.innerHTML = ''; el.cap.innerHTML = ''; el.act.innerHTML = '';
      el.stage.classList.remove('enter'); void el.stage.offsetWidth; el.stage.classList.add('enter');
      el.head.innerHTML = '';
      el.head.append(h('span', { class: 'no' }, sc.internal ? '' : String(i + 1).padStart(2, '0')), h('span', { class: 'nm', title: sc.goal || '' }, sc.title));
      [...el.prog.children].forEach((b, k) => { b.classList.toggle('cur', k === i); b.classList.toggle('done', k !== i && state.done.has(k)); });
      el.cnt.textContent = `${i + 1} / ${scenes.length}`;
      el.prev.disabled = i === 0;
      el.next.disabled = i === scenes.length - 1;
      el.next.classList.remove('ready');
      const c = (curCtx = makeCtx(tok, i));
      try {
        await sc.run(c);
      } catch (e) {
        if (e instanceof Cancelled) return;
        console.error(e);
        el.cap.innerHTML = '<span class="bad">Bu sahnede bir hata oluştu: ' + String(e.message || e) + '</span>';
        return;
      }
      if (tok !== state.token) return;
      state.done.add(i);
      el.prog.children[i].classList.add('done');
      store.set('ders:' + cfg.id, { ...(store.get('ders:' + cfg.id) || {}), done: [...state.done], sahne: scenes.length });
      if (i < scenes.length - 1) el.next.classList.add('ready');
    }

    /* Dersin yaklaşık süresi (saniye): temanın tema.js dosyasındaki satırın beşinci öğesi; araclar/sure.js yazar.
       Ders sayfası kataloğu yüklemez; tema.js burada yalnızca bu sayı için, yerine geçen bir KATALOG ile okunur. */
    function dersSuresi(goster) {
      if (global.KATALOG) return;
      let veri = null;
      global.KATALOG = { tema: (dersId, temaId, v) => { veri = v; } };
      const kod = cfg.id.slice(cfg.id.lastIndexOf('-') + 1);
      const sc = h('script', { src: 'tema.js' });
      sc.onerror = () => {};
      sc.onload = () => {
        const satir = ((veri && veri.konular) || []).flatMap((k) => k.dersler).find((d) => d[0].split('-')[0] === kod);
        if (satir && Number(satir[4])) goster(Number(satir[4]));
      };
      document.head.appendChild(sc);
    }

    /* ---- giriş ekranı ---- */
    function showIntro() {
      const it = cfg.intro || {};
      el.head.innerHTML = '';
      el.stage.innerHTML = '';
      el.stage.classList.add('enter');
      const ust = h('div', { class: 'k' }, (cfg.kicker ? cfg.kicker + ' · ' : '') + cfg.title);
      dersSuresi((sn) => ust.append(' · yaklaşık ' + Math.max(1, Math.round(sn / 60)) + ' dk'));
      const box = h('div', { class: 'intro' },
        ust,
        h('h2', {}, it.title || cfg.title),
        it.hook ? h('p', { html: it.hook }) : null,
        h('button', { class: 'btn', onclick: () => go(0) }, it.button || 'Derse başla ›'),
        (cfg.goals && cfg.goals.length) ? h('details', {}, h('summary', {}, 'Bu derste neler var?'), h('ul', {}, cfg.goals.map((g) => h('li', { html: g })))) : null);
      el.stage.appendChild(box);
      el.cnt.textContent = '';
      el.prev.disabled = true; el.next.disabled = false;
      el.next.classList.add('ready');
    }
    if (cfg.intro || cfg.goals) showIntro(); else go(0);

    /* ---- yerleşik: video sahnesi (hikâye) ----
       Tahtada oynar; Duraklat, hız ve sahne değişimiyle uyumludur. Bitince ya da geçilince sahne tamamlanır. */
    function videoRun(sc) {
      return (c) => new Promise((res, rej) => {
        const v = h('video', { src: sc.video, playsinline: true, preload: 'auto' });
        if (sc.altyazi) v.append(h('track', { kind: 'subtitles', srclang: 'tr', label: 'Türkçe', src: sc.altyazi, default: true }));
        c.stage.appendChild(h('div', { class: 'layer video' }, v));
        const tok = state.token;
        let over = false, durdu = state.paused;
        const fin = (fn) => { if (over) return; over = true; clearInterval(poll); v.pause(); gec.remove(); fn(); };
        const gec = h('button', { class: 'btn ghost', onclick: () => fin(res) }, 'Videoyu geç ›');
        c.act.appendChild(gec);
        // Tarayıcı kendiliğinden oynatmaya izin vermezse öğrenci videonun kendi düğmesiyle başlatır.
        const oynat = () => v.play().catch((e) => { if (e && e.name === 'NotAllowedError') v.controls = true; });
        v.addEventListener('ended', () => fin(res));
        v.addEventListener('error', () => { c.cap.innerHTML = '<span class="bad">Video yüklenemedi.</span>'; fin(res); });
        const poll = setInterval(() => {
          if (tok !== state.token) return fin(() => rej(new Cancelled()));
          v.playbackRate = clamp(state.speed, 0.75, 2);
          if (state.paused !== durdu) { durdu = state.paused; if (durdu) v.pause(); else oynat(); }
        }, 80);
        v.playbackRate = clamp(state.speed, 0.75, 2);
        if (!state.paused) oynat();
      });
    }

    /* ---- yerleşik: mini sınav ---- */
    async function quizRun(c) {
      const quiz = cfg.quiz;
      c.stage.innerHTML = '';
      const sc = h('div', { class: 'scroll' });
      c.stage.appendChild(sc);
      let score = 0;
      const missed = [];
      for (let k = 0; k < quiz.length; k++) {
        const q = quiz[k];
        sc.innerHTML = '';
        const fb = h('div');
        const opts = h('div', { class: 'opts', style: { gridTemplateColumns: '1fr' } });
        const card = h('div', { class: 'card' },
          h('div', { class: 'meta' }, `Soru ${k + 1} / ${quiz.length}`),
          h('h3', { html: q.q }), opts, fb);
        await new Promise((res) => {
          q.options.forEach((txt, i) => {
            const b = h('button', { class: 'opt', html: txt });
            b.addEventListener('click', () => {
              [...opts.children].forEach((x) => (x.disabled = true));
              const ok = i === q.answer;
              b.classList.add(ok ? 'right' : 'wrong');
              if (!ok) opts.children[q.answer].classList.add('right');
              if (ok) score++; else missed.push(q);
              const why = (q.why && (q.why[i] || '')) || '';
              fb.className = 'fb ' + (ok ? 'ok' : 'no');
              fb.innerHTML = (ok ? '<b>Doğru.</b> ' : '<b>Olmadı.</b> ') + why + (!ok && q.why && q.why[q.answer] ? ` <br><br><b>Doğrusu:</b> ${q.why[q.answer]}` : '');
              card.appendChild(h('button', { class: 'btn pulse', style: { marginTop: '8px' }, onclick: res }, k === quiz.length - 1 ? 'Sonucu gör ›' : 'Sonraki soru ›'));
            });
            opts.appendChild(b);
          });
          sc.appendChild(card);
        });
      }
      const prev = store.get('ders:' + cfg.id) || {};
      store.set('ders:' + cfg.id, { ...prev, done: [...state.done], sahne: scenes.length, score: Math.max(prev.score || 0, score), total: quiz.length });
      sc.innerHTML = '';
      const msg = score === quiz.length ? 'Kusursuz. Konunun mantığını yakalamışsın.' : score / quiz.length >= 0.7 ? 'Çok iyi. Küçük bir eksik var.' : 'Güzel başlangıç. İşaretli sahneleri tekrar izlemek işe yarar.';
      const review = h('div', { class: 'review' });
      missed.forEach((q) => {
        if (q.scene != null) review.append(h('div', {}, 'Tekrar et: ', h('a', { onclick: () => go(q.scene) }, `Sahne ${q.scene + 1} — ${scenes[q.scene].title}`)));
      });
      sc.appendChild(h('div', { class: 'card', style: { textAlign: 'center', alignItems: 'center' } },
        h('div', { class: 'meta' }, 'Sonuç'), h('div', { class: 'score' }, `${score} / ${quiz.length}`), h('p', {}, msg), review));
    }

    /* ---- yerleşik: özet ---- */
    async function summaryRun(c) {
      c.stage.innerHTML = '';
      const sc = h('div', { class: 'scroll' });
      c.stage.appendChild(sc);
      const card = h('div', { class: 'card' }, h('h3', {}, 'Bugün ne öğrendik?'));
      sc.appendChild(card);
      for (const item of cfg.summary || []) {
        const row = h('div', { class: 'note', html: item });
        card.appendChild(row);
        await c.wait(500);
      }
      if (cfg.nextLesson) card.appendChild(h('a', { class: 'btn', style: { textDecoration: 'none' }, href: cfg.nextLesson.href }, cfg.nextLesson.label || 'Sonraki ders ›'));
      card.appendChild(h('a', { class: 'btn ghost', style: { textDecoration: 'none', alignSelf: 'flex-start' }, href: cfg.back || 'index.html' }, 'Temaya dön'));
    }

    const api = { id: cfg.id, go, state, scenes, soru: (cfg.quiz || []).length };   // soru: çıkış sorusu sayısı (araclar/denetle.js okur)
    global.Ders.current = api;
    return api;
  }

  global.Ders = { start, h, s, M, ease, lerp, clamp, mathText, Cancelled, store, ses, sesKey };
})(window);
