window.TSHUSHKO_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

window.tshushkoFormatDate = function (iso) {
  if (!iso) return '';
  var parts = iso.split('-');
  if (parts.length < 3) return iso;
  return window.TSHUSHKO_MONTHS[parseInt(parts[1], 10) - 1] + ' ' + parseInt(parts[2], 10) + ', ' + parts[0];
};

window.tshushkoVideoUrl = function (youtubeId) {
  return 'https://www.youtube.com/watch?v=' + youtubeId;
};

window.tshushkoThumbnail = function (youtubeId) {
  return 'https://i.ytimg.com/vi/' + youtubeId + '/hqdefault.jpg';
};
