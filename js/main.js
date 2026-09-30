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

  renderRideMap(list);
});

function renderRideMap(list) {
  var $section = $('#rides-map');
  var el = document.getElementById('home-map');
  if (!el || typeof L === 'undefined') {
    $section.remove();
    return;
  }

  var pins = [];
  list.forEach(function (v) {
    var pos = v.marker || v.center;
    if (!pos || pos.length < 2) return;
    pins.push({ video: v, pos: pos });
  });

  if (!pins.length) {
    $section.remove();
    return;
  }

  var map = L.map(el, { scrollWheelZoom: false }).setView(pins[0].pos, 7);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    className: 'tm-dark-tiles'
  }).addTo(map);

  // Wheel zoom only once the user has clicked into the map, so the page
  // can still be scrolled past it.
  map.on('click', function () { map.scrollWheelZoom.enable(); });
  map.on('mouseout', function () { map.scrollWheelZoom.disable(); });

  var icon = L.divIcon({
    className: 'tm-ride-marker',
    html: '<span class="tm-ride-pin"><i class="bi bi-play-fill"></i></span>',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });

  pins.forEach(function (p) {
    var v = p.video;
    var meta = [];
    if (v.location) meta.push(v.location);
    if (v.date) meta.push(window.tshushkoFormatDate(v.date));
    if (v.distance) meta.push(v.distance + ' km');

    var pageUrl = 'video.html?slug=' + encodeURIComponent(v.slug);

    L.marker(p.pos, { icon: icon, title: v.title })
      .addTo(map)
      .bindPopup(
        '<a class="tm-popup-thumb" href="' + pageUrl + '">' +
          '<img src="' + window.tshushkoThumbnail(v.youtubeId) + '" alt="' + v.title + '" loading="lazy" ' +
            'onerror="this.onerror=null;this.src=\'img/placeholder-thumb.svg\'">' +
        '</a>' +
        '<b>' + v.title + '</b>' +
        (meta.length ? '<div class="tm-popup-meta">' + meta.join(' &middot; ') + '</div>' : '') +
        '<a class="tm-popup-link" href="' + pageUrl + '">Watch the ride <i class="bi bi-arrow-right"></i></a>',
        { className: 'tm-ride-popup' }
      );
  });

  map.fitBounds(L.latLngBounds(pins.map(function (p) { return p.pos; })).pad(0.25), { maxZoom: 11 });
}
