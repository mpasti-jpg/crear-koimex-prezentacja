# crear × Grupa KOIMEX — prezentacja oferty SEO

Prezentacja ofertowa (HTML), format horyzontalny **Full HD 1920 × 1080**, styl crear (monochromatyczny, minimalistyczny, font TT Hoves Pro Expanded).

## Uruchomienie lokalne

Wystarczy otworzyć `index.html` w przeglądarce. Jeśli fonty się nie ładują (część przeglądarek blokuje pliki lokalne), uruchom prosty serwer:

```bash
cd crear-koimex-prezentacja
python3 -m http.server 8931
# potem: http://localhost:8931
```

## Nawigacja

- **strzałki ← →**, PageUp/PageDown, spacja
- przyciski **‹ ›** na dole ekranu
- klik w prawą / lewą połowę ekranu
- `Home` / `End` — pierwszy / ostatni slajd
- deep-link do slajdu przez hash, np. `index.html#7`

## Struktura

```
index.html      — 11 slajdów (treść)
styles.css      — system stylów crear (kolory, typografia, komponenty)
deck.js         — skalowanie sceny 1920×1080 + nawigacja
assets/
  crear-logo.svg
  fonts/        — TT Hoves Pro Expanded (Regular/Medium/DemiBold/Bold)
```

Scena ma stały układ **1920 × 1080** (skalowany do okna) — dzięki temu łatwo wyeksportować do PDF (Cmd/Ctrl+P) lub przenieść na inny format.

## Styl (design system)

Deck odwzorowuje projekt z Figmy **„koimex-Prezentacja"** (frame slajdu 0.2, 1920×1080): tło sceny `#ADB0B1`, biały slajd, marginesy ~30px, font TT Hoves Expanded, kolory `#1D1D1E` / `#778181` / karty `#F4F4F4` / ciemny pasek `#1E1E1E`. Elementy wspólne (chrome): nagłówek-kicker WERSALIKAMI z kwadratową kropką, pill `NN/11` w rogu, tabele z „pigułkami" nagłówków, ciemne paski-wyróżnienia z ikoną w boksie, stopka bez górnej linii (logo + wersaliki). Slajd 2 („Cele") jest odwzorowany 1:1 z Figmy.

## Slajdy

1. Okładka · 2. Cele per marka · 3. Jak jest dziś (dane 3-mc) · 4. Rynki i wersje językowe · 5. Comiesięczne prace · 6. Kolejne wersje: skąd połowa stawki · 7. Cennik SEO · 8. Opieka nad serwisem · 9. Publikacje zewnętrzne · 10. Google Ads · 11. Kolejne kroki

Źródło treści: `08 - Oferta i wycena/Prezentacja oferty – treść slajdów v5` (vault KOIMEX).

## Font (webfont)

Font **TT Hoves Pro Expanded** jest osadzony jako **webfont WOFF2** (`assets/fonts/*.woff2`, ~70 KB/waga, skonwertowane z TTF przez fontTools). Działa lokalnie **oraz po push na GitHub** – pliki są bundlowane i ładowane względną ścieżką przez `@font-face` (z fallbackiem do TTF). Wagi: Regular 400 / Medium 500 / DemiBold 600 / Bold 700.

> ⚠️ **Licencja:** to wersja **Trial** TypeType. Technicznie działa jako webfont, ale przed publicznym, produkcyjnym użyciem warto wykupić licencję webową TT Hoves (albo podmienić na darmowy odpowiednik, np. Space Grotesk / Familjen Grotesk – zmiana w jednym miejscu CSS).
