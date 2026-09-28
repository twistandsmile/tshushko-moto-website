$(function () {
  var $main = $('#video-main');
  var slug = new URLSearchParams(window.location.search).get('slug');
  var video = (window.VIDEOS || []).find(function (v) { return v.slug === slug; });

  if (!video) {
    $main.html(
      '<div class="row justify-content-center py-5">' +
        '<div class="col-md-8 text-center">' +
          '<h1 class="display-5 mb-3">Adventure not found</h1>' +
          '<p class="text-secondary">This route does not exist (yet). Head back to all the adventures.</p>' +
          '<a href="index.html" class="btn btn-accent mt-2"><i class="bi bi-arrow-left me-2"></i>Back to adventures</a>' +
        '</div>' +
      '</div>'
    );
    return;
  }

  document.title = video.title + ' — Tshushko Moto';

  var stats = [
    { icon: 'bi-calendar3', label: 'Ride date', value: window.tshushkoFormatDate(video.date) },
    { icon: 'bi-geo-alt', label: 'Location', value: video.location },
    { icon: 'bi-rulers', label: 'Distance', value: video.distance + ' km' },
    { icon: 'bi-signpost-split', label: 'Elevation gain', value: video.gain + ' m' },
    { icon: 'bi-stopwatch', label: 'Duration', value: video.duration }
  ];

  var statsHtml = stats
    .filter(function (s) { return s.value; })
    .map(function (s) {
      return '<div class="trip-stat"><span class="label"><i class="bi ' + s.icon + ' me-2 text-warning"></i>' + s.label + '</span><span class="value">' + s.value + '</span></div>';
    })
    .join('');

  $main.html(
    '<div class="row g-4">' +
      '<div class="col-lg-8">' +
        '<a class="back-link small d-inline-flex align-items-center mb-3" href="index.html"><i class="bi bi-arrow-left me-2"></i>All adventures</a>' +
        '<div class="youtube-embed mb-4">' +
          '<iframe src="https://www.youtube.com/embed/' + video.youtubeId + '" title="' + video.title + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
        '</div>' +
        '<h1 class="video-page-title">' + video.title + '</h1>' +
        '<div class="adventure-description mt-4">' + video.description + '</div>' +
      '</div>' +
      '<div class="col-lg-4">' +
        '<div class="trip-card sticky-lg-top" style="top: 90px;">' +
          '<div class="trip-title">Trip data</div>' +
          statsHtml +
          '<div class="d-grid gap-2 mt-4">' +
            '<a class="btn btn-accent" href="' + window.tshushkoVideoUrl(video.youtubeId) + '" target="_blank" rel="noopener"><i class="bi bi-youtube me-2"></i>Watch on YouTube</a>' +
            '<a class="btn btn-outline-light" href="' + video.gpx + '" download><i class="bi bi-download me-2"></i>Download GPX</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<h2 class="map-section-title">Route on the <span class="accent">map</span></h2>' +
    '<div style="position:relative;">' +
      '<div id="map"></div>' +
      '<div id="map-note" class="map-note mt-2"><i class="bi bi-geo-alt me-1"></i>Sections are drawn with their colors from the GPX file. Legend at the top-right of the map : hover an entry to highlight its section, click it to zoom in. Dots: start, rest stops and finish.</div>' +
    '</div>'
  );

  $('#footer-year').text(new Date().getFullYear());

  var center = video.center || [48.8, 22.6];
  var map = L.map('map').setView(center, video.zoom || 9);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    className: 'tm-dark-tiles'
  }).addTo(map);

  // Dedicated pane above the track layer so waypoints always stay on top
  var wptPane = map.createPane('tm-waypoints');
  wptPane.style.zIndex = 620;

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
      var t = all[i].tagName;
      if (t === qname || t === local) return all[i];
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
        name: childText(el, 'name') || ('Section ' + (i + 1)),
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
        name: nameEl ? nameEl.textContent.trim() : 'Waypoint',
        ele: eleEl ? eleEl.textContent.trim() : ''
      });
    }
    return wpts;
  }

  function showMapEmpty(msg) {
    $('#map').before('<div class="map-empty"><div><i class="bi bi-geo-alt-exclamation me-2"></i>' + msg + '</div></div>');
  }

  $.ajax({ url: video.gpx, dataType: 'xml' })
    .done(function (xml) {
      var sections = parseSections(xml);
      var wpts = waypointData(xml);
      var allPts = [];
      var lines = [];

      sections.forEach(function (s, idx) {
        if (!s.points.length) return;
        allPts = allPts.concat(s.points);
        s.color = GPX_COLORS[s.colorName] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
        var line = L.polyline(s.points, { color: s.color, weight: 4, opacity: 0.9 }).addTo(map);
        line.on('mouseover', function () { setHighlight(idx, true); });
        line.on('mouseout', function () { setHighlight(undefined); });
        lines[idx] = line;
      });

      if (!allPts.length && !wpts.length) {
        showMapEmpty('No route points found in this GPX file.');
        return;
      }

      wpts.forEach(function (w) {
        L.circleMarker(w.latlng, {
          pane: 'tm-waypoints',
          radius: 7,
          color: '#ff6a00',
          weight: 2,
          fillColor: '#0f1115',
          fillOpacity: 1
        })
          .addTo(map)
          .bindPopup('<b>' + w.name + '</b><br>' + (w.ele ? w.ele + ' m a.s.l.' : ''));
      });

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

      var legendControl = L.control({ position: 'topright' });
      legendControl.onAdd = function () {
        var div = L.DomUtil.create('div', 'tm-map-legend');
        $(div).html(
          '<div class="tm-map-legend-title">Sections</div>' +
          sections
            .map(function (s, idx) {
              if (!s.color) return '';
              return '<div class="tm-map-legend-item" data-idx="' + idx + '">' +
                '<span class="swatch" style="background:' + s.color + '"></span>' +
                '<span class="name">' + s.name + '</span>' +
                (s.dist ? '<span class="dist">' + s.dist + ' km</span>' : '') +
              '</div>';
            })
            .join('')
        );
        $(div).on('mouseover', '.tm-map-legend-item', function () { setHighlight(parseInt($(this).attr('data-idx'), 10), true); });
        $(div).on('mouseout', '.tm-map-legend-item', function () { setHighlight(undefined); });
        $(div).on('click', '.tm-map-legend-item', function () {
          var idx = parseInt($(this).attr('data-idx'), 10);
          if (lines[idx]) map.fitBounds(L.latLngBounds(lines[idx].getLatLngs()).pad(0.15));
        });
        return div;
      };
      legendControl.addTo(map);

      if (allPts.length) {
        map.fitBounds(L.latLngBounds(allPts).pad(0.15));
      } else if (wpts.length) {
        map.fitBounds(L.latLngBounds(wpts.map(function (w) { return w.latlng; })).pad(0.3));
      }
    })
    .fail(function () {
      showMapEmpty('GPX file could not be loaded. Check the file exists in <code>data/gpx/</code>.');
    });
});
