window.TSHUSHKO_MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  bg: ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек']
};

// en: Oct 18, 2026 — fr/bg: 18 oct. 2026
window.TSHUSHKO_DATE_FORMATS = {
  en: function (month, day, year) { return month + ' ' + day + ', ' + year; },
  fr: function (month, day, year) { return day + ' ' + month + ' ' + year; },
  bg: function (month, day, year) { return day + ' ' + month + ' ' + year; }
};

function tshushkoLang() {
  return (window.TM && window.TM.lang) || 'en';
}

window.tshushkoFormatDate = function (iso) {
  if (!iso) return '';
  var parts = iso.split('-');
  if (parts.length < 3) return iso;
  var lang = tshushkoLang();
  var months = window.TSHUSHKO_MONTHS[lang] || window.TSHUSHKO_MONTHS.en;
  var format = window.TSHUSHKO_DATE_FORMATS[lang] || window.TSHUSHKO_DATE_FORMATS.en;
  return format(months[parseInt(parts[1], 10) - 1], parseInt(parts[2], 10), parts[0]);
};

// '2h 00min' → '2h 00min' (en) / '2 h 00 min' (fr) / '2 ч. 00 мин.' (bg)
window.tshushkoFormatDuration = function (duration) {
  if (!duration) return '';
  var m = /^(\d+)h\s*(\d+)min$/i.exec(duration);
  if (!m) return duration;
  var lang = tshushkoLang();
  if (lang === 'fr') return m[1] + ' h ' + m[2] + ' min';
  if (lang === 'bg') return m[1] + ' ч. ' + m[2] + ' мин.';
  return m[1] + 'h ' + m[2] + 'min';
};

window.tshushkoVideoUrl = function (youtubeId) {
  return 'https://www.youtube.com/watch?v=' + youtubeId;
};

window.tshushkoThumbnail = function (youtubeId) {
  return 'https://i.ytimg.com/vi/' + youtubeId + '/hqdefault.jpg';
};
