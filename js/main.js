$(function () {
  var $grid = $('#video-grid');
  var list = (window.VIDEOS || []).slice().sort(function (a, b) {
    return (b.date || '').localeCompare(a.date || '');
  });

  if (!list.length) {
    $grid.append('<div class="col-12"><div class="alert alert-dark border">No adventures yet — check back after the next ride.</div></div>');
  }

  list.forEach(function (v) {
    var $card = $(
      '<div class="col-md-6 col-xl-4">' +
        '<a class="text-decoration-none" href="video.html?slug=' + encodeURIComponent(v.slug) + '">' +
          '<div class="video-card h-100">' +
            '<div class="thumb">' +
              '<img src="' + window.tshushkoThumbnail(v.youtubeId) + '" alt="' + v.title + '" loading="lazy" ' +
                'onerror="this.onerror=null;this.src=\'img/placeholder-thumb.svg\'">' +
              '<span class="play"><i class="bi bi-play-fill"></i></span>' +
            '</div>' +
            '<div class="card-body d-flex flex-column">' +
              '<h5 class="card-title">' + v.title + '</h5>' +
              '<div class="d-flex flex-wrap gap-2 mt-auto pt-3">' +
                '<span class="meta-chip"><i class="bi bi-geo-alt"></i>' + v.location + '</span>' +
                '<span class="meta-chip"><i class="bi bi-calendar3"></i>' + window.tshushkoFormatDate(v.date) + '</span>' +
                (v.distance ? '<span class="meta-chip"><i class="bi bi-rulers"></i>' + v.distance + ' km</span>' : '') +
              '</div>' +
            '</div>' +
          '</div>' +
        '</a>' +
      '</div>'
    );
    $card.find('.card-title').css('color', 'var(--tm-text)');
    $grid.append($card);
  });

  var totalKm = list.reduce(function (sum, v) { return sum + (v.distance || 0); }, 0).toFixed(2);
  $('#stat-count').text(list.length);
  $('#stat-km').text(totalKm);
  $('#footer-year').text(new Date().getFullYear());
});
