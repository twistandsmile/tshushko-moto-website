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
    slug: 'trails-of-thassos',
    title: 'Trails of Thassos 🇬🇷 - Himalayan 450 Solo Adventure',
    youtubeId: 'iVzGTs1kOsw',
    date: '2026-09-19',
    location: 'Thassos, Greece',
    distance: 70.5,
    gain: 4397,
    duration: '4h 30min',
    gpx: 'data/gpx/trails-of-thassos.gpx',
    center: [41.95, 23.30],
    zoom: 10,
    description:
      '<p>A solo off-road adventure on the beautiful Greek island of <strong>Thassos</strong>, riding my <strong>Royal Enfield Himalayan 450</strong> through remote forest trails, rugged mountain roads, and breathtaking landscapes.</p>' +
      '<p>Starting from the south of the island, the ride took me through the forests around Theologos, all the way to <strong>Ypsario Peak</strong>, the highest point on Thassos, with stunning 360° views over the Aegean Sea.' +
      '<p>From there, I continued through the mountains toward the scenic plateau on the way to Kastro, and back towards the coast using a breathtaking trail : one of the most memorable sections of the ride.</p>' +
      '<p>If you enjoy adventure bikes, trail riding, and exploring beautiful off-road routes, consider subscribing!</p>'
  },
  {
    slug: 'tet-bulgaria-section-02-03',
    title: 'TET Bulgaria Section 02 & 03 - From Belmeken to Devin - Himalayan 450 solo off-road ride',
    youtubeId: '7i7AQem0vYg',
    date: '2026-07-12',
    location: 'Belmeken → Devin, Bulgaria',
    distance: 185.8,
    gain: 4899,
    duration: '16h 00min',
    gpx: 'data/gpx/tet-bulgaria-section-02-03.gpx',
    center: [41.95, 23.30],
    zoom: 8,
    description:
      '<p>Riding my Royal Enfield Himalayan 450 off-road on Section 02 and 03 of the Trans Euro Trail in Bulgaria. This ride features sandy tracks, rocks, dirt roads, gravel roads, and forest trails, with some beautiful scenic views along the way.</p>' +
      '<p>As I am improving my off-road riding skills, I really enjoyed this 2 days journey. The difficulty was perfectly balanced for me, the very easy sections were not too long, and the challenging ones were adapted to my level, so it was never boring nor scary. This ride was done on the 11th and 12th of July 2026.</p>' +
      '<p>The Trans Euro Trail (TET) is a network of off-road routes crossing Europe, designed for adventure and dual-sport motorcycles. The Bulgarian sections offer a mix of forest roads, mountain trails, and incredible landscapes.</p>' +
      '<p>If you enjoy adventure bikes, trail riding, and exploring off-road routes, consider subscribing!</p>'
  },
  {
    slug: 'from-forest-to-mountain-ridge',
    title: 'From Forest to Mountain Ridge - A Day of Exploration',
    youtubeId: 'KIx1mNNerbQ',
    date: '2026-08-16',
    location: 'Kyustendil → Ruen Peak, Bulgaria',
    distance: 22.9,
    gain: 1718,
    duration: '1h 30min',
    gpx: 'data/gpx/from-forest-to-mountain-ridge.gpx',
    center: [42.94, 23.49],
    zoom: 10,
    description:
      '<p>Some days, you don\'t need a plan. You just need to get on the bike and go.</p>' +
      '<p>This ride started like any other random day : my motorcycle, some off-road trails, and no particular destination in mind. From the shade of the forest to a high mountain ridge, the higher I went, the better it felt.</p>' +
      '<p>When the heat gets too much, there is always a way: find some shade and head for higher ground.</p>' +
      '<p>Because adventure doesn\'t have to be far away, simply find somewhere new to explore. It doesn\'t need a special occasion, perfect conditions, or a carefully planned trip : sometimes, adventure is just waiting for you a few roads from home.</p>' +
      '<p>So whatever the day brings, there\'s no excuse to stop exploring and having some fun on the trails.</p>'
  },
  {
    slug: 'solo-off-road-incredible-views',
    title: 'Solo Off-Road Exploration Rewarded me with Incredible Views | Himalayan 450',
    youtubeId: '-QNzr0sQaIA',
    date: '2026-03-08',
    location: 'Between Svoge and Gintsi, Bulgaria',
    distance: 14.3,
    gain: 596,
    duration: '2h 00min',
    gpx: 'data/gpx/solo-off-road-incredible-views.gpx',
    center: [41.42, 24.50],
    zoom: 9,
    description:
      '<p>Yesterday\'s ride turned into one of those unexpected adventures you remember for a long time.</p>' +
      '<p>I randomly picked a trail on the map that I had never explored before and decided to see where it would lead. What started as simple curiosity quickly turned into an amazing off-road ride.</p>' +
      '<p>The trail had everything: fast forest sections, some rocky and technical terrain, and even some mud near the end. But the real highlight came when the trail climbed higher into the mountains and suddenly opened up into what looked like a huge plateau with incredible views in every direction.</p>' +
      '<p>Sometimes the best rides happen when you simply follow a path you\'ve never taken before.</p>' +
      '<p>This ride was done on the 8th of March 2026.</p>' +
      '<p>If you enjoy adventure riding, consider subscribing for more rides like this!</p>'
  },
  {
    slug: 'tet-bulgaria-section-09',
    title: 'TET Bulgaria Section 09 - Himalayan 450 solo off-road ride',
    youtubeId: 'G2kEABDk5ys',
    date: '2026-03-01',
    location: 'Lokorsko → Svoge, Bulgaria',
    distance: 32.8,
    gain: 1711,
    duration: '1h 50min',
    gpx: 'data/gpx/tet-bulgaria-section-09.gpx',
    center: [42.88, 23.40],
    zoom: 10,
    description:
      '<p>Riding my Royal Enfield Himalayan 450 off-road on Section 09 of the Trans Euro Trail in Bulgaria. This ride features muddy tracks, challenging terrain, and some beautiful scenic views along the way.</p>' +
      '<p>As a beginner in off-road riding, this section of the trail turned out to be more demanding than expected. The deep mud, uneven tracks, melted snow and slippery conditions made for a challenging but great experience. This ride was done on the 1st of March 2026.</p>' +
      '<p>The Trans Euro Trail (TET) is a network of off-road routes crossing Europe, designed for adventure and dual-sport motorcycles. The Bulgarian sections offer a mix of forest roads, mountain trails, and incredible landscapes.</p>' +
      '<p>If you enjoy adventure bikes, trail riding, and exploring off-road routes, consider subscribing!</p>'
  }
];
