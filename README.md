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
index.html            Home page: hero + grid of all adventures
video.html            Adventure detail page (reads ?slug=...)
404.html              GitHub Pages 404 page (self-contained)
css/style.css         All custom styles
js/main.js            Home page logic (grid, stats)
js/video.js           Detail page logic (embed, trip data, map)
data/videos.js        All adventure data — edit this to publish a ride
data/gpx/             One .gpx file per adventure
img/                  Placeholder thumbnail (used when a thumbnail 404s)
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
   - `description` — the story of the ride (basic HTML: `<p>`, `<ul>`)
   - `center`, `zoom` — optional fallback for the map; the map auto-fits to the GPX, so these only matter if the GPX is missing
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
- The map loads the GPX with a plain AJAX request, so the site must be served
  over HTTP(S) — it won't work when opened via `file://` (browsers block local
  XML fetches).
