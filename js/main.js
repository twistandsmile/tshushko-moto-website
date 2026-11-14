$(function () {
  var $grid = $('#video-grid');
  var homeMap = null;

  function sortedList() {
    return (window.VIDEOS || []).slice().sort(function (a, b) {
      return (b.date || '').localeCompare(a.date || '');
    });
  }

  function rowHtml(v) {
    var t = window.TM;
    var txt = t.rideText(v);
    var km = v.distance != null ? v.distance.toFixed(1) + ' ' + t.t('unit.km') : '';
    var gain = v.gain != null ? '+' + v.gain + ' ' + t.t('unit.m') : '';
    return (
      '<a class="log-row" href="video.html?slug=' + encodeURIComponent(v.slug) + '">' +
        '<span class="log-thumb">' +
          '<img src="' + window.tshushkoThumbnail(v.youtubeId) + '" alt="" loading="lazy" ' +
            'onerror="this.onerror=null;this.src=\'img/placeholder-thumb.svg\'">' +
        '</span>' +
        '<span class="log-main">' +
          '<span class="log-title">' + txt.title + '</span>' +
          '<span class="log-loc">' + (txt.location || '') + '</span>' +
        '</span>' +
        '<span class="log-fig log-date">' + window.tshushkoFormatDate(v.date) + '</span>' +
        '<span class="log-fig log-km">' + km + '</span>' +
        '<span class="log-fig log-gain">' + gain + '</span>' +
        '<i class="bi bi-arrow-right log-go" aria-hidden="true"></i>' +
      '</a>'
    );
  }

  function renderLatest(v) {
    var el = document.getElementById('hero-latest');
    if (!el || !v) return;
    var t = window.TM;
    var txt = t.rideText(v);
    el.setAttribute('href', 'video.html?slug=' + encodeURIComponent(v.slug));
    var img = document.getElementById('hero-latest-img');
    if (img && img.getAttribute('data-id') !== v.youtubeId) {
      img.setAttribute('data-id', v.youtubeId);
      window.tshushkoLoadLarge(img, v.youtubeId);
    }
    if (img) img.alt = txt.title;
    var meta = [];
    if (v.date) meta.push(window.tshushkoFormatDate(v.date));
    if (v.distance != null) meta.push(v.distance.toFixed(1) + ' ' + t.t('unit.km'));
    if (v.gain != null) meta.push('+' + v.gain + ' ' + t.t('unit.m'));
    $('#hero-latest-title').text(txt.title);
    $('#hero-latest-meta').html(meta.map(function (m) { return '<span>' + m + '</span>'; }).join(''));
  }

  function renderGrid(list) {
    $grid.empty();
    if (!list.length) {
      $grid.html('<p class="log-empty">' + window.TM.t('home.empty') + '</p>');
      return;
    }
    $grid.html(list.map(rowHtml).join(''));
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
      className: 'tm-tiles'
    }).addTo(map);

    // Wheel zoom only once the user has clicked into the map, so the page
    // can still be scrolled past it.
    map.on('click', function () { map.scrollWheelZoom.enable(); });
    map.on('mouseout', function () { map.scrollWheelZoom.disable(); });

    var t = window.TM;

    var icon = L.divIcon({
      className: 'tm-ride-marker',
      html: '<span class="tm-ride-pin"></span>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -12]
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
    renderLatest(list[0]);
    renderRideMap(list);
    $('#footer-year').text(new Date().getFullYear());
  }

  render();
  window.TM.onChange(render);
});
