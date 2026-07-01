# BIMLine Gépész Kft. — honlap

Statikus, egyfájlos (`index.html`) honlap Tailwind CDN-nel, Leaflet térképpel és Chart.js ROI-görbével. Nincs build-lépés — bármelyik statikus hoszt (GitHub Pages, Netlify, egy sima szerver) simán kiszolgálja.

## Fájlstruktúra

- `index.html` — a teljes oldal (HTML + Tailwind config + egyedi CSS + JS egy fájlban)
- `bimline-logo.png`, `ifc-epitesz.jpg`, `ifc-gepesz.jpg` — képek
- `favicon.svg`, `og-image.png` — favicon és közösségimédia-előnézeti kép
- `robots.txt`, `sitemap.xml` — keresőmotor-beállítások
- `.github/workflows/deploy-pages.yml` — automatikus GitHub Pages deploy minden `main` ágra történő push után

## Helyi megnyitás

Nincs szükség szerverre, de a Leaflet/fetch miatt ajánlott egy egyszerű lokális szerver:

```
python3 -m http.server 8080
```

majd nyisd meg: http://localhost:8080

## GitHub Pages beüzemelése

1. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Minden `main` ágra történő push után a `.github/workflows/deploy-pages.yml` automatikusan újra-publikálja az oldalt.
3. Egyedi domain (pl. www.bimline.hu) esetén add hozzá a `CNAME` fájlt, és állítsd be a DNS-t a domain-szolgáltatónál.

## Ajánlatkérő űrlap bekötése (opcionális)

Az űrlap alapból `mailto:`-ra esik vissza. Ha automatikus e-mail-küldést szeretnél háttér nélkül:

1. Hozz létre egy Google Apps Script webalkalmazást, ami `doPost(e)`-ben `MailApp.sendEmail(...)`-tel elküldi a `hello@bimline.hu` címre.
2. Telepítsd webalkalmazásként ("Futtatás mint: én", "Hozzáférés: bárki"), és másold be a kapott `/exec` URL-t az `index.html`-ben a `FORM_ENDPOINT` konstansba.

## Fontos, publikálás előtt ellenőrizendő

- **Referenciatérkép (244 helyszín):** a térkép jelenleg egy előre elkészített, 244 magyarországi településből álló minta-listát jelenít meg (lásd `mapPoints` és `cityCategories` az `index.html`-ben). Ez demóadat — publikálás előtt cseréld le a ténylegesen valós projekt-helyszínekre, vagy pontosítsd velem a listát, hogy ne szerepeljen valótlan adat a honlapon.
- **Alkalmazott márkák futószalag:** a `brands` tömb (Belimo, Grundfos, Daikin stb.) a piacon elterjedt gyártói neveket sorolja fel — erősítsd meg, hogy ezekkel valóban dolgoztok, mielőtt élesítjük.
- **Adatvédelmi tájékoztató:** a lábléc jelenleg egy rövid, ideiglenes szöveget tartalmaz — érdemes egy teljes GDPR-tájékoztatót kiadatni jogásszal, majd belinkelni.
