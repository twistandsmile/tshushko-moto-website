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
404.html              GitHub Pages 404 page (self-contained)
css/style.css         All custom styles
js/main.js            Home page logic (grid, stats, overview map)
js/video.js           Detail page logic (embed, trip data, map)
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
