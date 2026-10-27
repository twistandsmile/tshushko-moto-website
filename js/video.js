$(function () {
  var $main = $('#video-main');
  var slug = new URLSearchParams(window.location.search).get('slug');
  var video = (window.VIDEOS || []).find(function (v) { return v.slug === slug; });
  var isMobile = window.matchMedia('(max-width: 767.98px)').matches;

  function t(key, fallback) {
    return window.TM.t(key, fallback);
  }

  $('#footer-year').text(new Date().getFullYear());

  if (!video) {
    function renderNotFound() {
      document.title = t('page.video.title');
      $main.html(
        '<div class="row justify-content-center py-5">' +
          '<div class="col-md-8 text-center">' +
            '<h1 class="display-5 mb-3">' + t('video.notfound.title') + '</h1>' +
            '<p class="text-secondary">' + t('video.notfound.text') + '</p>' +
            '<a href="index.html" class="btn btn-accent mt-2"><i class="bi bi-arrow-left me-2"></i>' + t('video.notfound.back') + '</a>' +
          '</div>' +
        '</div>'
      );
    }
    renderNotFound();
    window.TM.onChange(renderNotFound);
    return;
  }

  // Map state that must survive a language switch: the Leaflet map itself,
  // the drawn lines, the waypoints and the legend are built once by
  // initMap(); renderTexts() only updates the text around and inside them.
  var map = null;
  var lines = [];
  var sections = [];
  var wptMarkers = [];
  var wptData = [];
  var legendDiv = null;
  var tetTooltip = null;
  var mapEmptyKey = null;

  function texts() {
    return window.TM.rideText(video);
  }

  function renderStats() {
    var txt = texts();
    var stats = [
      { icon: 'bi-calendar3', label: 'video.stat.date', value: window.tshushkoFormatDate(video.date) },
      { icon: 'bi-geo-alt', label: 'video.stat.location', value: txt.location },
      { icon: 'bi-rulers', label: 'video.stat.distance', value: video.distance != null ? video.distance + ' ' + t('unit.km') : '' },
      { icon: 'bi-signpost-split', label: 'video.stat.gain', value: video.gain != null ? video.gain + ' ' + t('unit.m') : '' },
      { icon: 'bi-stopwatch', label: 'video.stat.duration', value: window.tshushkoFormatDuration(video.duration) }
    ];
    $('#tm-stats').html(stats
      .filter(function (s) { return s.value; })
      .map(function (s) {
        return '<div class="trip-stat"><span class="label"><i class="bi ' + s.icon + ' me-2 text-warning"></i>' + t(s.label) + '</span><span class="value">' + s.value + '</span></div>';
      })
      .join('')
    );
  }

  function renderLegend() {
    if (!legendDiv) return;
    $(legendDiv).html(
      '<div class="tm-map-legend-title">' + t('video.map.legend.title') + '</div>' +
      sections
        .map(function (s, idx) {
          if (!s.color) return '';
          return '<div class="tm-map-legend-item" data-idx="' + idx + '">' +
            '<span class="swatch" style="background:' + s.color + '"></span>' +
            '<span class="name">' + s.name + '</span>' +
            (s.dist ? '<span class="dist">' + s.dist + ' ' + t('unit.km') + '</span>' : '') +
          '</div>';
        })
        .join('')
    );
  }

  function renderPopups() {
    var i;
    for (i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line || !line.getPopup()) continue;
      var s = sections[i];
      line.getPopup().setContent('<b>' + s.name + '</b>' + (s.dist ? '<br>' + s.dist + ' ' + t('unit.km') : ''));
    }
    for (i = 0; i < wptMarkers.length; i++) {
      var w = wptData[i];
      wptMarkers[i].getPopup().setContent('<b>' + w.name + '</b><br>' + (w.ele ? w.ele + ' ' + t('video.map.elev') : ''));
    }
  }

  function renderTexts() {
    var txt = texts();
    document.title = txt.title + ' — Tshushko Moto';
    $('#tm-back-label').text(t('video.back'));
    $('#tm-yt').attr('title', txt.title);
    $('#tm-video-title').text(txt.title);
    $('#tm-description').html(txt.description);
    $('#tm-trip-title').text(t('video.trip.title'));
    renderStats();
    $('#tm-watch-label').text(t('video.watch'));
    $('#tm-gpx-label').text(t('video.gpx'));
    var $tet = $('#tm-gpx-wrap');
    if ($tet.length) {
      $tet.attr('title', t('video.tet.tooltip'));
      if (tetTooltip) {
        tetTooltip.dispose();
        tetTooltip = null;
      }
      $('[data-bs-toggle="tooltip"]', $main).each(function () {
        tetTooltip = new bootstrap.Tooltip(this);
      });
    }
    $('#tm-map-title').html(t('video.map.title'));
    $('#tm-map-note').text(isMobile ? t('video.map.note.mobile') : t('video.map.note.desktop'));
    if (mapEmptyKey) $('#tm-map-empty').html(t(mapEmptyKey));
    renderPopups();
    renderLegend();
  }

  function build() {
    var txt = texts();
    $main.html(
      '<div class="row g-4">' +
        '<div class="col-lg-8">' +
          '<a class="back-link small d-inline-flex align-items-center mb-3" href="index.html"><i class="bi bi-arrow-left me-2"></i><span id="tm-back-label">' + t('video.back') + '</span></a>' +
          '<div class="youtube-embed mb-4">' +
            '<iframe id="tm-yt" src="https://www.youtube.com/embed/' + video.youtubeId + '?autoplay=1" title="' + txt.title + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
          '</div>' +
          '<h1 class="video-page-title" id="tm-video-title">' + txt.title + '</h1>' +
          '<div class="adventure-description mt-4" id="tm-description">' + txt.description + '</div>' +
        '</div>' +
        '<div class="col-lg-4">' +
          '<div class="trip-card sticky-lg-top" style="top: 137px;">' +
            '<div class="trip-title" id="tm-trip-title">' + t('video.trip.title') + '</div>' +
            '<div id="tm-stats"></div>' +
            '<div class="d-grid gap-2 mt-4">' +
              '<a class="btn btn-accent" href="' + window.tshushkoVideoUrl(video.youtubeId) + '" target="_blank" rel="noopener"><i class="bi bi-youtube me-2"></i><span id="tm-watch-label">' + t('video.watch') + '</span></a>' +
              (video.isTet ? '<span class="d-inline-block w-100" tabindex="0" data-bs-toggle="tooltip" data-bs-placement="bottom" id="tm-gpx-wrap" title="' + t('video.tet.tooltip') + '"><button type="button" class="btn btn-outline-light disabled w-100" disabled><i class="bi bi-download me-2"></i><span id="tm-gpx-label">' + t('video.gpx') + '</span></button></span>'
                           : '<a class="btn btn-outline-light" href="' + video.gpx + '" download><i class="bi bi-download me-2"></i><span id="tm-gpx-label">' + t('video.gpx') + '</span></a>') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<h2 class="map-section-title" id="tm-map-title">' + t('video.map.title') + '</h2>' +
      '<div style="position:relative;">' +
        '<div id="map"></div>' +
        '<div id="map-note" class="map-note mt-2"><i class="bi bi-geo-alt me-1"></i><span id="tm-map-note">' + (isMobile ? t('video.map.note.mobile') : t('video.map.note.desktop')) + '</span></div>' +
      '</div>'
    );
    renderTexts();
    initMap();
  }

  function setHighlight(idx, on) {
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (!line) continue;
      if (on && i === idx) {
        line.setStyle({ weight: 6, opacity: 1 });
        line.bringToFront();
      } else if (on) {
        line.setStyle({ weight: 4, opacity: 0.35 });
      } else {
        line.setStyle({ weight: 4, opacity: 0.9 });
      }
    }
    $('.tm-map-legend-item').removeClass('active');
    if (on) $('.tm-map-legend-item[data-idx="' + idx + '"]').addClass('active');
  }

  var GPX_COLORS = {
    Blue: '#4d9fff',
    Cyan: '#2fd8e8',
    Green: '#43d17c',
    Magenta: '#e05cf0',
    Orange: '#ff6a00',
    Purple: '#a970ff',
    Yellow: '#ffd23f',
    Gray: '#9aa3af'
  };

  var FALLBACK_COLORS = ['#ff6a00', '#4d9fff', '#43d17c', '#ffd23f', '#2fd8e8', '#a970ff', '#e05cf0', '#9aa3af'];

  function childText(el, tag) {
    var n = el.getElementsByTagName(tag)[0];
    return n ? n.textContent.trim() : '';
  }

  function extElement(el, qname) {
    var all = el.getElementsByTagName('*');
    var local = qname.split(':').pop();
    for (var i = 0; i < all.length; i++) {
      var tName = all[i].tagName;
      if (tName === qname || tName === local) return all[i];
    }
    return null;
  }

  function pointsIn(el, tag) {
    var els = el.getElementsByTagName(tag);
    var pts = [];
    for (var i = 0; i < els.length; i++) {
      var lat = parseFloat(els[i].getAttribute('lat'));
      var lon = parseFloat(els[i].getAttribute('lon'));
      if (!isNaN(lat) && !isNaN(lon)) pts.push([lat, lon]);
    }
    return pts;
  }

  function parseSections(xml) {
    var sections = [];
    var els = xml.getElementsByTagName('trk');
    var tag = 'trkpt';
    if (!els.length) {
      els = xml.getElementsByTagName('rte');
      tag = 'rtept';
    }
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var stats = extElement(el, 'dmd:Stats');
      var distM = stats ? parseFloat(stats.getAttribute('dist')) : NaN;
      var gainM = stats ? parseFloat(stats.getAttribute('gain')) : NaN;
      var colorEl = extElement(el, 'gpxx:DisplayColor');
      sections.push({
        name: childText(el, 'name') || (t('video.map.section') + ' ' + (i + 1)),
        desc: childText(el, 'desc'),
        colorName: colorEl ? colorEl.textContent.trim() : '',
        points: pointsIn(el, tag),
        dist: !isNaN(distM) ? (distM / 1000).toFixed(1) : '',
        gain: !isNaN(gainM) && gainM > 0 ? Math.round(gainM) : ''
      });
    }
    return sections;
  }

  function waypointData(xml) {
    var els = xml.getElementsByTagName('wpt');
    var wpts = [];
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      var lat = parseFloat(e.getAttribute('lat'));
      var lon = parseFloat(e.getAttribute('lon'));
      if (isNaN(lat) || isNaN(lon)) continue;
      var nameEl = e.getElementsByTagName('name')[0];
      var eleEl = e.getElementsByTagName('ele')[0];
      wpts.push({
        latlng: [lat, lon],
        name: nameEl ? nameEl.textContent.trim() : t('video.map.waypoint'),
        ele: eleEl ? eleEl.textContent.trim() : ''
      });
    }
    return wpts;
  }

  function showMapEmpty(key) {
    mapEmptyKey = key;
    $('#map').before('<div class="map-empty"><div><i class="bi bi-geo-alt-exclamation me-2"></i><span id="tm-map-empty">' + t(key) + '</span></div></div>');
  }

  function initMap() {
    var center = video.center || [48.8, 22.6];
    map = L.map('map').setView(center, video.zoom || 9);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      className: 'tm-dark-tiles'
    }).addTo(map);

    // Dedicated pane above the track layer so waypoints always stay on top
    var wptPane = map.createPane('tm-waypoints');
    wptPane.style.zIndex = 620;

    $.ajax({ url: video.gpx, dataType: 'xml' })
      .done(function (xml) {
        sections = parseSections(xml);
        wptData = waypointData(xml);
        var allPts = [];

        sections.forEach(function (s, idx) {
          if (!s.points.length) return;
          allPts = allPts.concat(s.points);
          s.color = GPX_COLORS[s.colorName] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
          var line = L.polyline(s.points, { color: s.color, weight: 4, opacity: 0.9 }).addTo(map);
          if (isMobile) {
            line.bindPopup('<b>' + s.name + '</b>' + (s.dist ? '<br>' + s.dist + ' ' + t('unit.km') : ''));
          } else {
            line.on('mouseover', function () { setHighlight(idx, true); });
            line.on('mouseout', function () { setHighlight(undefined); });
          }
          lines[idx] = line;
        });

        if (!allPts.length && !wptData.length) {
          showMapEmpty('video.map.empty.route');
          return;
        }

        wptData.forEach(function (w) {
          var marker = L.circleMarker(w.latlng, {
            pane: 'tm-waypoints',
            radius: 7,
            color: '#ff6a00',
            weight: 2,
            fillColor: '#0f1115',
            fillOpacity: 1
          })
            .addTo(map)
            .bindPopup('<b>' + w.name + '</b><br>' + (w.ele ? w.ele + ' ' + t('video.map.elev') : ''));
          wptMarkers.push(marker);
        });

        var legendControl = L.control({ position: 'topright' });
        legendControl.onAdd = function () {
          var div = L.DomUtil.create('div', 'tm-map-legend');
          legendDiv = div;
          // Delegated handlers stay valid across the innerHTML rebuild that
          // happens on a language switch.
          $(div).on('mouseover', '.tm-map-legend-item', function () { setHighlight(parseInt($(this).attr('data-idx'), 10), true); });
          $(div).on('mouseout', '.tm-map-legend-item', function () { setHighlight(undefined); });
          $(div).on('click', '.tm-map-legend-item', function () {
            var idx = parseInt($(this).attr('data-idx'), 10);
            if (lines[idx]) map.fitBounds(L.latLngBounds(lines[idx].getLatLngs()).pad(0.15));
          });
          renderLegend();
          return div;
        };
        legendControl.addTo(map);

        if (allPts.length) {
          map.fitBounds(L.latLngBounds(allPts).pad(0.15));
        } else if (wptData.length) {
          map.fitBounds(L.latLngBounds(wptData.map(function (w) { return w.latlng; })).pad(0.3));
        }
      })
      .fail(function () {
        showMapEmpty('video.map.empty.gpx');
      });
  }

  build();
  window.TM.onChange(renderTexts);
});
