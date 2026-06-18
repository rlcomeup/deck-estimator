# Deck Build Estimator

A tool for estimating the materials, labor, and cost of a residential deck build, with
code-compliant framing derived from the Fairfax County *Typical Deck Details*.

## Contents

- **`deck-estimator.html`** — the main app: a single-file, browser-based estimator with a
  live **3D preview**, an itemized **bill of materials**, a built-in **price book**, and a
  printable engineering drawing. Open it directly in a browser (Chromium-based recommended,
  for the "Saved Decks" folder feature).
- **`index.js`** + **`lib/`** — an earlier Node.js CLI version of the estimator.
- **`materials-reference.json`** — exportable price-book data (material prices, store
  locations, availability).
- **`Saved Decks/`** — saved deck layouts (one `.json` per job), loadable from the app.
- **`deck_ref.pdf`** — the reference deck-details document the code tables are based on.

## Features

- Paint a deck footprint on a grid (rectangular or irregular/cascading shapes) and get a
  full estimate instantly.
- Code-driven sizing: joist spans, beam size, post spacing (center-to-center), and footing
  type/size from the deck-details tables, sized to the beam **influence width**.
- 3D model with framing, beams, posts, knee braces, footings, stairs, guard rails, and
  toggleable dimension labels.
- Cost-optimized cut lists (stock lengths, splices over posts) so the bill of materials
  matches what is drawn.
- Perpendicular or **angled (45°) diagonal** decking, with a picture-frame perimeter.
- Per-location pricing, sales tax, delivery, labor, and demolition.

## Running the CLI

```sh
npm start
```

Requires Node.js >= 16.

## Using the app

Open `deck-estimator.html` in your browser. To save/load layouts to the `Saved Decks`
folder, use a Chromium-based browser (Chrome/Edge) and connect the folder when prompted.
