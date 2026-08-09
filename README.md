# Tidewell — Beach Stone Storefront

A small, dependency-free storefront for selling hand-gathered beach stones.

## What's here

- `index.html` — landing page, product grid, about, FAQ, contact, cart drawer
- `styles.css` — responsive layout, coastal palette, sticky nav, slide-in cart
- `app.js` — product catalogue, add-to-cart, quantity handling, totals

No build step, no framework, no dependencies. Open `index.html` and it runs.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Products

Eight grades sold by weight or as bundles: grey pebble, slate flats, chalk white,
black basalt, rose granite, stone & sea glass mix, large hand stones, and a 3 kg starter set.

## Note

This is a demo storefront. Checkout is not wired to a payment provider — the
button shows a notice instead. To make it real, connect Stripe Checkout (or
similar) to the cart total in `app.js`.

## Deploy

Works as-is on GitHub Pages: enable Pages on the `main` branch, root folder.
