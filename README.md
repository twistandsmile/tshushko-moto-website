# Tshushko Moto

Static companion website for the [Tshushko Moto](https://www.youtube.com/@tshushkomoto) YouTube channel — off-road motorcycle travel, with a detail page for every video: embedded player, trip data, downloadable GPX and the route drawn on an interactive map.

Pure HTML / CSS / JS. No build step, no dependencies to install.

## Tech

- HTML + CSS (Bootstrap 5.3 via CDN)
- JavaScript + jQuery (via CDN)
- [Leaflet](https://leafletjs.com/) (via CDN) for the route maps, with dark CARTO tiles
- GPX parsed client-side — the map is generated directly from the GPX file

## Structure

```
index.html            Home page: hero + overview map with one pin per ride + grid of all adventures
video.html            Adventure detail page (reads ?slug=...)
404.html              GitHub Pages 404 page (self-contained, carries its own mini dictionary)
css/style.css         All custom styles
js/main.js            Home page logic (grid, stats, overview map)
js/video.js           Detail page logic (embed, trip data, map)
js/helpers.js         Locale-aware date / duration / URL helpers
js/i18n.js            Internationalisation core (language resolution + re-render)
js/i18n/en.js,fr.js,bg.js   UI strings per language (flat key → value dictionaries)
img/flags/            Flag icons for the language switcher
data/videos.js        All adventure data — edit this to publish a ride
data/gpx/             One .gpx file per adventure
img/                  Placeholder thumbnail (used when a thumbnail 404s)
tools/gpx_stats.py    Prints distance / elevation / map marker for a GPX file
```

## Adding a new adventure

1. Export the route from your GPS / Strava / Garmin and save it as
   `data/gpx/my-new-trip.gpx` (any file name works).
   Any standard GPX 1.1 works — waypoints (`<wpt>`) become markers on the map,
   track points (`<trkpt>`) or route points (`<rtept>`) become the orange line.
2. Copy an entry in `data/videos.js` and update:
   - `slug` — unique, URL-friendly id (e.g. `tet-bulgaria-section-10`)
   - `youtubeId` — the 11-character id from `youtube.com/watch?v=`**`THIS_PART`**
   - `title`, `date` (`YYYY-MM-DD`), `location`
   - `distance`, `gain`, `duration` — from your GPS stats
   - `gpx` — the path to the file from step 1
   - `marker` — `[lat, lon]`, the average position of the track points, printed
     by `python3 tools/gpx_stats.py data/gpx/my-new-trip.gpx` under `marker :`.
     This is where the pin goes on the home page map; the GPX itself is never
     downloaded there. `center` / `zoom` are only the fallback view used if the
     GPX file cannot be read on the detail page.
   - `description` — the story of the ride (basic HTML: `<p>`, `<ul>`)
   - `i18n` — the French and Bulgarian translations: `i18n.fr` / `i18n.bg` with
     `title`, `location`, `description`. Keep the same HTML structure in the
     translated description. Any missing piece falls back to the English
     values automatically.
3. Commit and push. The home page picks it up automatically, newest first.

> **Note on current data:** the 4 entries in `data/videos.js` use the real
> videos from the channel, but their distances, durations, descriptions and
> GPX files are **sample placeholders** — replace them with your real GPS data.

## Local preview

Any static file server works, e.g.:

```sh
python3 -m http.server 8080
# → http://localhost:8080
```

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Done. The site is live at `https://<username>.github.io/<repo-name>/`.
   Every commit to `main` redeploys automatically.

If you use a custom domain (e.g. `tshushkomoto.com`), add a file called
`CNAME` containing the domain at the repo root and configure it in
**Settings → Pages**, then create an A/AAAA record pointing at GitHub Pages.

## Internationalisation

The site is available in **English**, **French** and **Bulgarian**. The
language is chosen with the flag in the navbar and stored in `localStorage`,
so it persists across all pages and visits.

Language resolution order on each page load:

1. `?lang=fr` URL parameter — one-shot display override (not persisted),
   useful to share a link or to test a language
2. the language stored in `localStorage`
3. the browser language (`navigator.language`)
4. English (default)

- Static page text uses `data-i18n` / `data-i18n-html` attributes, applied by
  `js/i18n.js` on load and on every language switch.
- JS-rendered text goes through `window.TM.t(key)`; ride content through
  `window.TM.rideText(ride)`.
- UI strings live in `js/i18n/<lang>.js`. When adding a string, add the key
  to all three files.
- Switching language re-renders the text **in place** — the YouTube embed and
  the Leaflet maps are never re-created, so a playing video keeps playing and
  the map keeps its current view.
- Dates, durations and units (`km`, `m`, `m a.s.l.`) are formatted per
  language in `js/helpers.js` and the string dictionaries.

Not translated (by design): GPX section/waypoint names, OpenStreetMap tile
labels, the YouTube embed, the channel brand.

> Note: the display font is **Oswald** (Google Fonts) — a condensed display
> face chosen because it covers Latin, Latin-ext **and Cyrillic**, so
> Bulgarian headings stay consistent with the English/French ones. The
> `'Arial Narrow'` fallback in the CSS stack also supports Cyrillic.

## Map notes

- Tiles: CARTO dark all (free for non-commercial use, attribution required —
  already included).
- The detail page map loads the GPX with a plain AJAX request, so the site must
  be served over HTTP(S) — it won't work when opened via `file://` (browsers
  block local XML fetches).
- The home page overview map does not fetch any GPX: it only uses the `marker`
  coordinates from `data/videos.js`, so it stays fast and works from `file://`.
  Wheel zoom on the home map is off until you click the map, so the page still
  scrolls normally past it.
