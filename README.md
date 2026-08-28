# Oferta SEO – Grupa KOIMEX (wersja HTML)

Odwzorowanie 1:1 prezentacji z Figmy
([KOIMEX (Copy)](https://www.figma.com/design/9S6kLJ4rOC8XvLLgR1KwIG/KOIMEX--Copy-?node-id=0-1)),
11 slajdów, sztywna kanwa **1920×1080**. Bez wersji responsywnej – układ jest
zawsze taki sam, zmienia się tylko skala całości, żeby zmieścić się w oknie.

## Uruchomienie

Najprościej – dwuklik w `index.html`.

Do pokazania komuś, kto nie ma zainstalowanego fontu TT Hoves Pro, potrzebny jest
serwer HTTP (przez `file://` przeglądarka potrafi zablokować wczytanie plików
woff2 i typografia zjedzie na font zastępczy):

```bash
cd crear-koimex-prezentacja && python3 -m http.server 8931
```

Potem: `http://localhost:8931`.

## Nawigacja

| Klawisz | Działanie |
|---|---|
| `→` `↓` `PgDn` `spacja` | następny slajd |
| `←` `↑` `PgUp` `Backspace` | poprzedni slajd |
| `Home` / `End` | pierwszy / ostatni slajd |
| `F` | pełny ekran |
| `S` | przełącznik: dopasowanie do okna ↔ skala 1:1 (100%) |
| klik | prawe 3/4 ekranu – dalej, lewe 1/4 – wstecz |

Numer slajdu jest w adresie (`#7`), więc można linkować do konkretnego slajdu.

## PDF

`Cmd + P` → zapisz jako PDF. Arkusz `@page` jest ustawiony na 1920×1080 px
(1440×810 pt), każdy slajd trafia na osobną stronę – wychodzi 11 stron 16:9
bez marginesów.

## Publikacja

Deck jest hostowany na GitHub Pages: **https://mpasti-jpg.github.io/crear-koimex-prezentacja/**

> ⚠️ **Poufność.** Repozytorium jest **publiczne**, a prezentacja zawiera cennik
> i dane o ruchu klienta. `noindex, nofollow` + `robots.txt` trzymają ją poza
> wyszukiwarkami, ale **każdy z linkiem ją zobaczy**. Przed szerszym
> udostępnieniem: repo prywatne + Pages (wymaga GitHub Pro) albo zdjęcie
> publikacji po review.

`.nojekyll` wyłącza przetwarzanie Jekyllem (inaczej Pages ignoruje katalogi z `_`).

## Struktura

```
index.html            ← plik wynikowy (sklejka, tylko ten wysyłamy dalej)
build.sh              ← skleja src/* w index.html
src/
  _head.html          ← <head> + otwarcie #deck
  slide-01..11.html   ← po jednym pliku na slajd
  _foot.html
assets/
  css/deck.css        ← tokeny, skala typograficzna, siatka, print
  js/deck.js          ← nawigacja + skalowanie kanwy
  fonts/*.woff2       ← TT Hoves Pro / TT Hoves Pro Expanded
  img/*.svg           ← logo crear, ptaszki, logo Amazon, klamry cennika, strzałki
```

Edycja: zmieniasz plik w `src/`, potem `./build.sh`. Każdy slajd i większość
elementów mają atrybut `data-node-id` z identyfikatorem węzła z Figmy –
łatwo znaleźć odpowiednik w pliku źródłowym.

## Jak trzymana jest zgodność z Figmą

- **Współrzędne**: każdy element pozycjonowany absolutnie w pikselach, wartości
  wzięte wprost z `absoluteBoundingBox` węzłów Figmy (nie z procentów).
- **Typografia**: `text-box-trim: trim-both` / `text-box-edge: cap alphabetic` –
  tak samo jak w Figmie górna krawędź bloku tekstu to górna krawędź wersalika,
  nie line-boxa. Dla przeglądarek bez tej własności (Firefox) w CSS jest
  fallback z policzonym przesunięciem dla każdego stylu.
- **Kreski**: Figma rysuje kreskę 1 px *nad* współrzędną Y linii, stąd
  `margin-top: -1px` w `.rule`. Linie obrócone w Figmie o 180° mają modyfikator
  `.dn` (kreska ląduje pod współrzędną).
- **Weryfikacja**: render headless Chrome porównany piksel po pikselu z eksportem
  PNG z Figmy dla wszystkich 11 slajdów. Brak przesunięcia (0,0 px) na każdym
  slajdzie, różnice < 2% pikseli i wyłącznie na krawędziach glifów (inny
  antyaliasing Figmy i Chrome).

## Uwagi

- **Licencja fontu.** W `assets/fonts/` leżą pliki wygenerowane z **wersji Trial**
  TT Hoves Pro (jedyne, jakie są w systemie). Do prezentacji na własnym
  komputerze i wysyłki klientowi na podgląd – w porządku; do publikacji strony
  pod publicznym adresem trzeba dokupić licencję webfont i podmienić pliki
  (nazwy zostawić bez zmian, wtedy nic więcej nie trzeba ruszać).
- **Literówka ze źródła**: slajd 3 ma nagłówek sekcji „PUNT WYJŚCIA” – tak jest
  w Figmie, celowo nie poprawiałem. Jedno słowo do zmiany w `src/slide-03.html`.
- Zdjęć/rastrów w projekcie nie ma – cała grafika to SVG.
