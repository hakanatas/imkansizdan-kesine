/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 3.6, end: 9.6, tr: 'Bir olay ne kadar olası?', en: 'How likely is an event?',
      note: 'Nokta’nın elinde dört toplu bir torba var. Bakmadan bir top çekersek amber gelir mi? Bu ne kadar olası?' },
    { scene: 2, start: 10.6, end: 16.0, tr: 'Olasılık çizgisi: 0 imkânsız, 1 kesin', en: 'The probability line: 0 impossible, 1 certain',
      note: 'Olasılıkları bir çizgiye yerleştirelim. Çizginin bir ucu 0, yani imkânsız; öbür ucu 1, yani kesin.' },
    { scene: 2, start: 16.4, end: 19.2, tr: '4 topun 4’ü de amber: kesin, 1', en: 'All 4 balls are amber: certain, 1',
      note: 'Bu torbadaki dört topun dördü de amber. Hangi topu çekersek çekelim amber gelir. Bu kesin; olasılığı 1.' },
    { scene: 2, start: 19.6, end: 25.8, tr: 'Hiç amber top yok: imkânsız, 0', en: 'No amber balls at all: impossible, 0',
      note: 'Bu torbada hiç amber top yok. Amber gelmesi imkânsız; olasılığı 0.' },
    { scene: 3, start: 27.4, end: 32.2, tr: 'Bu torbada 4 topun 2’si amber', en: 'In this bag, 2 of the 4 balls are amber',
      note: 'Şimdi dört topun ikisi amber, ikisi siyah. Olası durumlar dört; istediğimiz durumlar iki.' },
    { scene: 3, start: 32.6, end: 37.8, tr: '4’te 2, yani 1/2: yarı yarıya', en: '2 out of 4, that is 1/2: even chance',
      note: 'Dörtte iki, yani yarım. Amber gelme olasılığı yarı yarıya; çizginin tam ortası.' },
    { scene: 3, start: 38.4, end: 43.6, tr: 'Kesin, yarı yarıya, imkânsız: hepsi çizgide', en: 'Certain, even, impossible: all on the line',
      note: 'Şimdiye kadar üç torbamız çizgiye yerleşti: 0, 1/2 ve 1.' },
    { scene: 4, start: 44.8, end: 50.0, tr: '4 toptan 1’i amber: 1/4', en: '1 of 4 balls is amber: 1/4',
      note: 'Bu torbada dört toptan yalnızca biri amber. Olasılık dörtte bir; 0’a yakın, düşük bir olasılık.' },
    { scene: 4, start: 50.4, end: 53.0, tr: 'Düşük olasılık: 0’a yakın', en: 'Unlikely: close to 0',
      note: 'Olabilir ama pek olası değil.' },
    { scene: 4, start: 53.4, end: 58.6, tr: '4 toptan 3’ü amber: 3/4', en: '3 of 4 balls are amber: 3/4',
      note: 'Bu torbada dört toptan üçü amber. Olasılık dörtte üç; 1’e yakın, yüksek bir olasılık.' },
    { scene: 4, start: 59.0, end: 61.8, tr: 'Yüksek olasılık: 1’e yakın', en: 'Likely: close to 1',
      note: 'Kesin değil ama büyük ihtimalle amber gelir.' },
    { scene: 5, start: 63.0, end: 67.0, tr: 'Zar atınca 7 gelmesi: imkânsız', en: 'Rolling a 7 on a die: impossible',
      note: 'Günlük olaylara bakalım. Zarda 1’den 6’ya kadar sayılar var. 7 gelmesi imkânsız; olasılığı 0.' },
    { scene: 5, start: 67.4, end: 71.4, tr: 'Yazı turada tura: yarı yarıya', en: 'Heads on a coin: even chance',
      note: 'Parayı atınca iki olası durum var: yazı ya da tura. Tura gelmesi yarı yarıya; 1/2.' },
    { scene: 5, start: 71.8, end: 77.4, tr: 'Yarın güneşin doğması: kesin', en: 'The sun rising tomorrow: certain',
      note: 'Yarın sabah güneşin doğması kesin; olasılığı 1.' },
    { scene: 6, start: 78.6, end: 84.2, tr: 'Her olayın olasılığı 0 ile 1 arasındadır', en: 'Every event’s probability is between 0 and 1',
      note: 'Her olayın olasılığı 0 ile 1 arasındadır. 0 ve 1 de bu aralığa dâhildir.' },
    { scene: 6, start: 84.6, end: 91.0, tr: 'İmkânsız 0, kesin 1, gerisi arada!', en: 'Impossible 0, certain 1, the rest in between!',
      note: 'İmkânsız olaylar 0’da, kesin olaylar 1’de, geri kalan her şey bu ikisinin arasında!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
