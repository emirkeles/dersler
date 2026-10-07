/* Yaşam: ortak çizim araçları. Dersin anlatımını ve sahnelerini her ders seçer. */
window.KIT = (() => {
  'use strict';
  const renkler = { A:'#6ea8ff', B:'#f5b04c', C:'#c792ff', D:'#3ddc97', E:'#3cc8e8', F:'#ff8a5b', G:'#c7ce73', H:'#ec9ec4' };
  function yazi(c,p,x,y,text,o={}) {
    return c.S('text',{x,y,text,'text-anchor':o.hiza||'middle','font-size':o.size||30,'font-weight':o.kalin||550,style:'fill:'+(o.renk||'var(--text)')},p);
  }
  function kutu(c,p,x,y,w,h,o={}) { return c.S('rect',{x,y,width:w,height:h,rx:o.rx===undefined?16:o.rx,fill:o.fill||'#202a43',stroke:o.renk||'#5b678f','stroke-width':o.stroke||2},p); }
  function cizgi(c,p,x1,y1,x2,y2,renk='var(--muted)',o={}) { return c.S('line',{x1,y1,x2,y2,stroke:renk,'stroke-width':o.width||3,...o},p); }
  function ok(c,p,x1,y1,x2,y2,renk='var(--c3)') {
    cizgi(c,p,x1,y1,x2,y2,renk);const a=Math.atan2(y2-y1,x2-x1),r=15;
    return c.S('path',{d:`M ${x2-r*Math.cos(a-.45)} ${y2-r*Math.sin(a-.45)} L ${x2} ${y2} L ${x2-r*Math.cos(a+.45)} ${y2-r*Math.sin(a+.45)}`,fill:'none',stroke:renk,'stroke-width':3},p);
  }
  function kart(c,p,x,y,w,h,baslik,satirlar=[],o={}) {
    const g=c.S('g',{},p);kutu(c,g,x,y,w,h,o);yazi(c,g,x+w/2,y+48,baslik,{size:o.size||30,renk:o.renk});
    satirlar.forEach((s,i)=>yazi(c,g,x+w/2,y+98+i*40,s,{size:o.altSize||28}));return g;
  }
  /* Kaynak izi geliştirme içindir; öğrenci tahtasında sayfa numarası gösterilmez. */
  function kaynak(c,p,sayfa) { p.dataset.kitapSayfasi=String(sayfa); return null; }
  function temiz(p) {p.replaceChildren();}
  async function belir(c,el,ms=450) {el.style.opacity=0;await c.tween(ms,e=>el.style.opacity=e);}
  async function soru(c,q,options,answer,right,hints=[]) {
    return c.choice({tag:'Sıra sende',q,options,answer,right,hints:options.map((_,i)=>hints[i]|| (i===answer?'': 'Sahnedeki ilişkiyi yeniden incele.'))});
  }
  function resim(c,p,dosya,x,y,w,h) {return c.S('image',{href:'gorsel/'+dosya,x,y,width:w,height:h,preserveAspectRatio:'xMidYMid meet'},p);}
  return {renkler,yazi,kutu,cizgi,ok,kart,kaynak,temiz,belir,soru,resim};
})();
