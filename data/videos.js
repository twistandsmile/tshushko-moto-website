// Tshushko Moto — adventure data.
//
// One entry per YouTube video. To publish a new ride:
//   1. Drop your GPX file into data/gpx/ (any name, e.g. my-new-trip.gpx)
//   2. Add an entry below. `youtubeId` is the 11-char id from
//      https://www.youtube.com/watch?v=THIS_PART
//   3. Commit — the site picks it up automatically (newest first).
//
// NOTE: entries below marked (real) use actual GPS data from data/gpx/.
// The others are still SAMPLE placeholders — drop your real GPX file in
// data/gpx/, then update distance / gain / duration / description.
// Tip: distance + gain can be computed from the GPX with:
//   python3 tools/gpx_stats.py data/gpx/my-file.gpx

window.VIDEOS = [
  {
    slug: 'tet-bulgaria-section-01-02',
    title: 'TET Bulgaria Section 01 & 02 - From Belmeken to Devin - Himalayan 450 solo off-road ride',
    youtubeId: '7i7AQem0vYg',
    date: '2026-08-28',
    location: 'Belmeken → Devin, Bulgaria',
    distance: 118,
    gain: 311,
    duration: '5h 10min',
    gpx: 'data/gpx/tet-bulgaria-section-01-02.gpx',
    center: [41.95, 23.30],
    zoom: 8,
    description:
      '<p>The opening of the TET Bulgaria project: two sections in one day, from the Belmeken pass down to Devin, solo and self-supported on the Himalayan 450.</p>' +
      '<p>The first half is a long descent out of the mountains and into the valley, then gravel forest roads and singletrack through Maleshevo and Melnik.</p>' +
      '<ul>' +
      '<li>Refuel in Maleshevo — the next fuel is far away</li>' +
      '<li>The ridge stretch above Melnik is the best view of the day</li>' +
      '<li>Pace yourself: the gravel into Devin is slower than it looks</li>' +
      '</ul>'
  },
  {
    slug: 'from-forest-to-mountain-ridge',
    title: 'From Forest to Mountain Ridge - A Day of Exploration',
    youtubeId: 'KIx1mNNerbQ',
    date: '2026-08-18',
    location: 'Bulgaria',
    distance: 34,
    gain: 555,
    duration: '1h 30min',
    gpx: 'data/gpx/from-forest-to-mountain-ridge.gpx',
    center: [42.94, 23.49],
    zoom: 10,
    description:
      '<p>A full day of exploration with no planned route — from deep forest all the way up to a high mountain ridge.</p>' +
      '<p>No navigation, just following the line and reading the terrain. The kind of day where the plan matters less than the riding.</p>'
  },
  {
    slug: 'solo-off-road-incredible-views',
    title: 'Solo Off-Road Exploration Rewarded me with Incredible Views | Himalayan 450',
    youtubeId: '-QNzr0sQaIA',
    date: '2026-03-09',
    location: 'Bulgaria',
    distance: 42,
    gain: 442,
    duration: '2h 00min',
    gpx: 'data/gpx/solo-off-road-incredible-views.gpx',
    center: [41.42, 24.50],
    zoom: 9,
    description:
      '<p>A solo off-road day that rewarded me with incredible views. Long climbs up to a high ridge, then the afternoon light over the valley.</p>' +
      '<p>The Himalayan 450 made the climbs look easy — the last kilometer definitely did not.</p>'
  },
  {
    // (real) — distance/gain from the actual GPX
    slug: 'tet-bulgaria-section-09',
    title: 'TET Bulgaria Section 09 - Himalayan 450 solo off-road ride',
    youtubeId: 'G2kEABDk5ys',
    date: '2026-03-06',
    location: 'Lokorsko → Svoge, Bulgaria',
    distance: 32.8,
    gain: 1711,
    duration: '1h 50min',
    gpx: 'data/gpx/tet-bulgaria-section-09.gpx',
    center: [42.88, 23.40],
    zoom: 10,
    description:
      '<p>Section 09 of the TET Bulgaria ride. Another day of gravel, forest trails and ridgelines — solo on the Himalayan 450.</p>'
  }
];
