# Map icons

Six icons generated with the built-in ImageGen tool on 2026-10-25.
Exact prompts are recorded in `prompts.json`. Transparent PNGs are resized to
128 × 128 for use at 28–32 CSS pixels. The original generated files remain in
the local Codex image library; the site only uses assets in this directory.

# Map maintenance

- Pages: `/ru/map/`, `/en/map/`; shared template: `_includes/map.html`.
- Original 25 places: `_data/map_places.yml`, imported unchanged from
  https://github.com/krushinru/map/blob/main/_data/places.yml (May 2024).
- English translations: `_data/map_places_en.json`, keyed by `lat,lon`.
- UI copy: `_data/map_ui.json`; behavior: `assets/js/map.js`.
- MapLibre GL JS 5.6.0 is vendored under `assets/vendor/maplibre`, including its license.
- Tiles: OpenStreetMap standard raster, browser caching defaults, visible attribution,
  no offline downloads/prefetch. Policy: https://operations.osmfoundation.org/policies/tiles/.
- The old CARTO endpoint returned an `API KEY REQUIRED` image with HTTP 200 during
  diagnosis. Checking HTTP status alone does not detect this failure.
- Source data is historical, not a verified current venue directory. In particular,
  Sage's address duplicates Lado's while its coordinates differ, and Dictatura's
  schedule lists Saturday twice. These records are preserved pending verification.
- `/map/` selects Russian for a Russian browser language, English otherwise
  (Russian when no language is available), and preserves query parameters and the hash.
  Both language links remain available without JavaScript. The map is not in site navigation. GitHub Pages may still serve the separate `map`
  repository at that path. After deploying this site, replace that repository's
  entry page with a redirect or disable its Pages deployment to retire the old app.

Validation: `bundle exec jekyll build`; `node --check assets/js/map.js`.
