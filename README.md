# Koliba

Produkcioni sajt za turisticki objekat / smestaj sa fokusom na prezentaciju ponude, galerije i kontakt informacija.

## Tehnologije

- HTML/CSS/JavaScript
- PHP fallback fajlovi (`default.php`, `maintenance.php`)
- SEO fajlovi (`robots.txt`, `sitemap.xml`)

## Struktura projekta

- `index.html`: glavna javna stranica
- `styles.css`, `script.js`: front-end stil i interakcije
- `maintenance.html`, `maintenance.php`: rezim odrzavanja
- `404.html`, `500.html`: error stranice

## Lokalni pregled

```bash
php -S 127.0.0.1:8080
```

## Live Preview

- https://kolibapcelica1.rs

## Deploy smernice

- Deploy je direktno kopiranje fajlova na server root.
- Posle izmena obavezno proveri internu link strukturu i anchor sekcije.
- Drzi `sitemap.xml` azurnim kada se menjaju URL-ovi ili sekcije.
