# Ders motoru (ortak/ders.js + ders.css) — API

Bağımlılık yok, saf JS/SVG. Her ders bir HTML dosyası + bir JS dosyasıdır.

## Ders HTML iskeleti (kök klasörde `NN-ad.html`)
```html
<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="stylesheet" href="ortak/ders.css">
<style>/* derse özel ek stil (isteğe bağlı) */</style></head>
<body><div id="app"></div>
<script src="ortak/ders.js"></script>
<script src="dersler/NN-ad.js"></script></body></html>
```

## Ders tanımı (`dersler/NN-ad.js`)
```js
Ders.start({
  id: 'sayilar-01', kicker: '9. Sınıf · Sayılar', title: 'Üslü ve Köklü Gösterimler',
  accent: '#6ea8ff', back: 'index.html',
  intro: { title, hook: 'merak uyandıran 1-2 cümle (HTML)', button: 'Derse başla ›' },
  goals: ['Kazanım 1', …],                     // giriş ekranında ✓ listesi
  scenes: [ { title, goal, run: async (c) => { … } }, … ],
  quiz: [ { q, options:[…], answer:1, why:['neden bu şık yanlış/doğru',…], scene: 3 } ],  // scene: tekrar önerilecek sahne indeksi (0'dan)
  summary: ['<b>Kural</b> …', …],             // "Bugün ne öğrendik"
  nextLesson: { href: '02-….html', label: 'Sonraki ders ›' }
});
```
Quiz ve Özet sahneleri otomatik eklenir. İlerleme `localStorage`'a yazılır.

## Sahne bağlamı `c` (run içinde `await` ile sırala)
Zaman: `await c.wait(ms)` · `await c.tween(ms, (e,t)=>{…}, ease?)` (e = easing uygulanmış 0→1; `Ders.ease.{linear,in,out,inOut,back,bounce,elastic}`) · `Ders.lerp(a,b,t)`, `Ders.clamp`.
**Tüm zamanlamalar duraklat/hız/sahne değiştirme ile uyumludur; `setTimeout`/`setInterval`/CSS animasyonu/`requestAnimationFrame` ile kendi zamanlayıcını KURMA — her zaman `c.wait`/`c.tween` kullan.** Sahne değişince run otomatik iptal edilir (Cancelled istisnası; yakalama).
Anlatım: `await c.say('altyazı <b>HTML</b>', {speak:'sesli okunacak düz metin (üs/kök sembollerini kelimeyle yaz)', ms, noWait})` — okuma süresi kadar bekler; sesli anlatım açıksa konuşma bitene kadar bekler. `c.clearSay()`.
Çizim: `const svg = c.svg(1000, 562)` (viewBox; sahne 16:9) · `c.S(tag, attrs, parent)` SVG öğesi üretir (`text:`, `html:`, `math:` özel anahtarları; `math:'2^{10}'`, `'x_{n}'` üs/indis çizer) · `c.layer()` sahne üstüne HTML katmanı (absolute inset 0) · `c.h(tag, props, ...kids)` HTML üretir · `c.M.frac(a,b)`, `c.M.sqrt(x,n?)`, `c.M.pow(b,e)`, `c.M.sub`, `c.M.m(html)` HTML matematik yazımı.
Defter (sağ panel, kalıcı kural kartı): `c.note(html, 'Başlık', id?)`.
Etkileşim (alt panel `c.act`):
- `await c.cont('Devam ›')` — tıklanana kadar bekler.
- `const r = await c.choice({tag:'Tahmin et', q, options:[html…], answer:idx, hints:[yanlış şık başına geri bildirim], right:'doğru geri bildirimi', onPick:(i,ok)=>…})` — doğru şık seçilene kadar sürer, `r.tries` döner.
- `const sl = c.slider({label, min, max, step, value, fmt, onInput})` → `{get,set,remove,el}`. (Slider ile "keşfet" sahnesinden sonra `await c.cont()` ile bekle.)
- `c.panel(tag, ...kids)` serbest panel; `c.feedback(box, 'ok'|'no'|'info', html)`.
- `c.on(el, 'pointerdown', fn)` — sahne değişince otomatik temizlenen dinleyici (sürükle-bırak için pointer olayları kullan; mobilde çalışsın: `touch-action:none`).
- `c.clearAct()`.
Sahne kendi sonunda bitince “Sonraki” düğmesi parlar; öğrenci kontrol eder. Sahneyi bitirmeden önce öğrencinin etkileşim yapmasını bekleyen yapıları `await` ile kur (sahne ancak run bitince "tamam" sayılır).

## Tasarım kuralları (ders.css)
Koyu tema. Renk rolleri: `--c1` mavi, `--c2` turuncu, `--c3` yeşil, `--c4` mor, `--c5` sarı, `--c6` turkuaz; `--good`, `--bad`, `--warn`. SVG içinde `var(--c1)` kullanılabilir (CSS değişkeni, `fill="var(--c1)"` çalışır). Bir kavrama bir renk ver ve ders boyunca aynı kalsın (örn. taban=mavi, üs=turuncu). HTML sınıfları: `.t1…t6` renk, `.good/.bad/.warn/.muted`, `.m` matematik fontu.

## Test aracı
`cd /private/tmp/claude-501/-Users-trexo-Desktop/9db121cc-c67d-479c-8d16-d30769b309a1/scratchpad && node check.js <ders.html> <ekran-görüntüsü-klasörü> [hız=4]`
Her sahneyi açar, etkileşimleri otomatik geçer (ilk şıkka tıklar, Devam'a basar), konsol hatalarını ve zaman aşımlarını bildirir, her sahne için `sNN-mid.png` ve `sNN-end.png` üretir. Görüntüleri Read aracıyla incele: taşan/çakışan yazı, boş sahne, okunmayan küçük metin, yanlış konum varsa DÜZELT.
