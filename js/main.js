$(function () {
  var $grid = $('#video-grid');
  var homeMap = null;

  function sortedList() {
    return (window.VIDEOS || []).slice().sort(function (a, b) {
      return (b.date || '').localeCompare(a.date || '');
    });
  }

  function cardHtml(v) {
    var t = window.TM;
    var txt = t.rideText(v);
    return (
      '<div class="col-md-6 col-xl-4">' +
        '<a class="text-decoration-none" href="video.html?slug=' + encodeURIComponent(v.slug) + '">' +
          '<div class="video-card h-100">' +
            '<div class="thumb">' +
              '<img src="' + window.tshushkoThumbnail(v.youtubeId) + '" alt="' + txt.title + '" loading="lazy" ' +
                'onerror="this.onerror=null;this.src=\'img/placeholder-thumb.svg\'">' +
              '<span class="play"><i class="bi bi-play-fill"></i></span>' +
            '</div>' +
            '<div class="card-body d-flex flex-column">' +
              '<h5 class="card-title">' + txt.title + '</h5>' +
              '<div class="d-flex flex-wrap gap-2 mt-auto pt-3">' +
                '<span class="meta-chip"><i class="bi bi-geo-alt"></i>' + txt.location + '</span>' +
                '<span class="meta-chip"><i class="bi bi-calendar3"></i>' + window.tshushkoFormatDate(v.date) + '</span>' +
                (v.distance ? '<span class="meta-chip"><i class="bi bi-rulers"></i>' + v.distance + ' ' + t.t('unit.km') + '</span>' : '') +
              '</div>' +
            '</div>' +
          '</div>' +
        '</a>' +
      '</div>'
    );
  }

  function renderGrid(list) {
    $grid.empty();
    if (!list.length) {
      $grid.append('<div class="col-12"><div class="alert alert-dark border">' + window.TM.t('home.empty') + '</div></div>');
      return;
    }
    list.forEach(function (v) {
      var $card = $(cardHtml(v));
      $card.find('.card-title').css('color', 'var(--tm-text)');
      $grid.append($card);
    });
    var totalKm = list.reduce(function (sum, v) { return sum + (v.distance || 0); }, 0).toFixed(2);
    $('#stat-count').text(list.length);
    $('#stat-km').text(totalKm);
  }

  function renderRideMap(list) {
    if (homeMap) {
      homeMap.remove();
      homeMap = null;
    }
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

    homeMap = L.map(el, { scrollWheelZoom: false }).setView(pins[0].pos, 7);
    var map = homeMap;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      className: 'tm-dark-tiles'
    }).addTo(map);

    // Wheel zoom only once the user has clicked into the map, so the page
    // can still be scrolled past it.
    map.on('click', function () { map.scrollWheelZoom.enable(); });
    map.on('mouseout', function () { map.scrollWheelZoom.disable(); });

    var t = window.TM;

    var icon = L.divIcon({
      className: 'tm-ride-marker',
      html: '<span class="tm-ride-pin"><i class="bi bi-play-fill"></i></span>',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });

    // Pins whose centers are within `maxClusterRadius` px (at the current zoom)
    // collapse into a numbered cluster; clicking a cluster zooms the map until
    // the pins separate.
    var hasClustering = typeof L.markerClusterGroup === 'function';
    var cluster = hasClustering
      ? L.markerClusterGroup({
          maxClusterRadius: 32,
          showCoverageOnHover: false,
          iconCreateFunction: function (c) {
            return L.divIcon({
              className: 'tm-ride-marker',
              html: '<span class="tm-ride-pin tm-ride-pin-count">' + c.getChildCount() + '</span>',
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            });
          }
        })
      : { addLayer: function (m) { m.addTo(map); } };

    pins.forEach(function (p) {
      var v = p.video;
      var txt = t.rideText(v);
      var meta = [];
      if (txt.location) meta.push(txt.location);
      if (v.date) meta.push(window.tshushkoFormatDate(v.date));
      if (v.distance) meta.push(v.distance + ' ' + t.t('unit.km'));

      var pageUrl = 'video.html?slug=' + encodeURIComponent(v.slug);

      cluster.addLayer(
        L.marker(p.pos, { icon: icon, title: txt.title })
          .bindPopup(
            '<a class="tm-popup-thumb" href="' + pageUrl + '">' +
              '<img src="' + window.tshushkoThumbnail(v.youtubeId) + '" alt="' + txt.title + '" loading="lazy" ' +
                'onerror="this.onerror=null;this.src=\'img/placeholder-thumb.svg\'">' +
            '</a>' +
            '<b>' + txt.title + '</b>' +
            (meta.length ? '<div class="tm-popup-meta">' + meta.join(' &middot; ') + '</div>' : '') +
            '<a class="tm-popup-link" href="' + pageUrl + '">' + t.t('home.map.cta') + ' <i class="bi bi-arrow-right"></i></a>',
            { className: 'tm-ride-popup' }
          )
      );
    });

    if (hasClustering) {
      map.addLayer(cluster);
    }

    map.fitBounds(L.latLngBounds(pins.map(function (p) { return p.pos; })).pad(0.25), { maxZoom: 11 });
  }

  function render() {
    var list = sortedList();
    renderGrid(list);
    renderRideMap(list);
    $('#footer-year').text(new Date().getFullYear());
  }

  render();
  window.TM.onChange(render);
});
