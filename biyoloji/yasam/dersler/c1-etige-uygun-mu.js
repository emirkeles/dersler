/* MEB Biyoloji 9, s. 30–32; BİY.9.1.3. */
(() => {'use strict';const K=KIT;
 async function vaka(c){const s=c.svg(1000,562);K.kart(c,s,150,110,700,230,'Park ödevi',['Gözlem · anket · rapor','Kanıt ve etik ölçüt'],{renk:K.renkler.C});K.kaynak(c,s,31);
  await c.say('Bir doğal yaşam parkını inceleyen öğrencilerin raporlarını karşılaştıracağız.');
  await c.say('Araştırmanın sonucu yanında nasıl yürütüldüğü de değerlendirilir.');
  await c.say('Bilim etiği, bu değerlendirmede kullanılacak ölçütlerle ilişkilidir.');
  await K.soru(c,'Kaynakçası olmayan üçüncü raporda hangi sorun görülür?',['Kaynaklar izlenemiyor.','Bütün gözlemler kesinlikle yanlıştır.','Rapor mutlaka daha özgündür.'],0,'Kaynakça yokluğu kullanılan bilginin kaynağını izlemeyi zorlaştırır.');
  K.temiz(s);K.kart(c,s,60,145,400,190,'Kanıt',['Kaynakça yok.'],{renk:K.renkler.C});K.ok(c,s,470,240,530,240,K.renkler.C);K.kart(c,s,540,145,400,190,'Ölçüt',['Kaynak gösterme'],{renk:K.renkler.C});K.kaynak(c,s,'31–32');
  await c.say('Bir etik değerlendirme, görünür kanıtla ilişkilendirilmelidir.');
  await c.say('Kaynakça eksikliği, her gözlemin yanlış olduğunu tek başına kanıtlamaz.');
  c.note('Etik değerlendirme: kanıt + ölçüt.','Bilim etiği');
 }
 async function veri(c){const s=c.svg(1000,562);K.kart(c,s,170,90,660,220,'Anket kaydı',['Veri','Raporlanan sonuç'],{renk:K.renkler.C});K.kaynak(c,s,32);
  await c.say('Anket verilerinin doğru ve güvenilir kaydedilmesi gerekir.');
  await K.soru(c,'Sonuç beklentiye uymayınca hangi davranış uygundur?',['Veriyi değiştirmek','Uymayan veriyi gizlemek','Veriyi olduğu gibi kaydetmek'],2,'Veri beklentiye göre değiştirilemez veya gizlenemez.');
  const g=K.kart(c,s,260,335,480,110,'Olduğu gibi kaydet',[],{renk:'var(--good)'});await K.belir(c,g);
  await c.say('Beklentiye uymayan sonuç da araştırmanın bir parçasıdır.');
  await c.say('Ayrıca raporda katkısı olmayan kişinin adı yer almamalıdır.');
  await K.soru(c,'Araştırmada çalışmayan üyelerin adı hangi ölçütle sorgulanır?',['İsimlerin alfabetik sırası','Gerçek katkının gösterilmesi','Sunumun uzunluğu'],1,'Çalışmaya katkı ile rapordaki sorumluluk kaydı uyuşmalıdır.');
 }
 async function asi(c){const s=c.svg(1000,562);K.kart(c,s,120,105,760,225,'Aşı araştırması',['Olası yarar','Katılımcı riski','Gönüllü onam'],{renk:K.renkler.C});K.kaynak(c,s,30);
  await c.say('Aşı araştırmalarında bireysel haklarla toplumsal yarar birlikte değerlendirilir.');
  await c.say('İncelediğimiz araştırmada sağlıklı gönüllülere kontrollü koşullarda virüs verildi.');
  await c.say('Gönüllüler doktor gözetiminde izlenirken olası riskler tartışıldı.');
  await c.say('Riskler ve ödeme, gönüllülerin kararını etkileyebilir.');
  await K.soru(c,'Toplumsal yarar ihtimali tek başına hangisinin yerine geçmez?',['Gönüllünün riskleri bilerek karar vermesinin','Araştırmaya soru sormanın','Olayı kaynakta bulmanın'],0,'Gönüllü onam ve adalet ayrıca değerlendirilir.');
  await c.say('Gönüllü onam, katılımcının bilgilendirilmiş kararına dayanır.');
  await c.say('Bir araştırmayı değerlendirmek için riskler ve önlemler birlikte incelenir.');
 }
 async function acil(c){const s=c.svg(1000,562);K.kart(c,s,150,110,700,235,'Acil durum',['Toplumsal ihtiyaç','Etik ölçütler','Kanıt incelemesi'],{renk:K.renkler.C});K.kaynak(c,s,30);
  await c.say('Pandemi ve deprem gibi acil durumlar araştırma ihtiyacını artırır.');
  await K.soru(c,'Acil durumdaki araştırma değerlendirilirken hangi yaklaşım uygundur?',['İyi amaç varsa veri değiştirilebilir.','Haklar, riskler ve onam yine incelenir.','Etik ölçütler tümüyle kaldırılır.'],1,'İhtiyaçların aciliyeti etik boyutları inceleme gereğini kaldırmaz.');
  await c.say('Kanıtı göstermeden bütün araştırma hakkında kesin hüküm kurma.');
  await c.say('Sonuç kadar yol da sorgulanır.');
 }
 Ders.start({id:'yasam-c1',kicker:'Konu C · Bilim etiği',title:'Bu araştırma etiğe uygun mu?',accent:K.renkler.C,back:'index.html',intro:{title:'Bu araştırma etiğe uygun mu?',hook:'Bir araştırma iyi sonuç verince her yöntemi uygun olur mu?',button:'Derse başla ›'},goals:[],scenes:[{title:'Vaka ve ölçüt',goal:'Kanıtı etik ölçütle ilişkilendir.',run:vaka},{title:'Veri ve katkı',goal:'Kayıtta dürüstlüğü değerlendir.',run:veri},{title:'Aşı araştırması',goal:'Onam ve riski sorgula.',run:asi},{title:'Acil durum',goal:'Etik boyutları değerlendirmeyi sürdür.',run:acil}],quizTitle:'Çıkış soruları',quiz:[{q:'Veri beklentiye uymadı. Ne yapılmalı?',options:['Olduğu gibi kaydedilmeli.','Beklentiye uyacak biçimde değiştirilmeli.','Rapordan gizlenmeli.'],answer:0,why:['Veri dürüstçe kaydedilir.','Sonuç değiştirilmez.','Desteklemeyen veri gizlenmez.'],scene:1},{q:'Aşı araştırmasında risk bilgisinin önemi nedir?',options:['Sonucu garantiler.','Gönüllünün kararını bilgilendirir.','Bütün riskleri yok eder.'],answer:1,why:['Bilgilendirme sonucu garantilemez.','Onam için kararın bilgilendirilmesi gerekir.','Bilmek riski ortadan kaldırmaz.'],scene:2}],summary:['Sonuç kadar yol da sorgulanır.'],nextLesson:{href:'c2-etik-iddiasini-dogrula.html',label:'Sonraki: Doğrula ve kaydet ›'}});
})();
