# Teendők élesítés előtt — bimline.hu domain, GA4, jogi tartalom

Ez a fájl **nem kerül fel a nyilvános weboldalra**, csak dokumentáció a repóban,
kifejezetten neked (Péter). Azt gyűjti össze, hogy a jelenlegi
`lukacspeter89.github.io/bimline/` címről a végleges `bimline.hu` domainre
állás előtt, illetve az újonnan bevezetett süti-/GDPR-funkciók éles
használatba vétele előtt milyen lépéseket kell elvégezned.

A kód már **elő van készítve** ezekhez, de semmi nem lett élesítve
automatikusan — amíg nem végzed el az alábbi lépéseket, a jelenlegi
`/bimline/` alkönyvtáras cím marad érvényben, és a Google Analytics sem
küld valós adatot (helyőrző azonosítóval fut).

---

## 1. Domain-váltás: bimline.hu

### 1.1 DNS beállítás a domain-szolgáltatónál

A `bimline.hu` domaint (feltehetően valahol máshol regisztráltad, pl. egy
magyar domain-regisztrátornál) a GitHub Pages felé kell irányítanod:

**Alap domain (`bimline.hu`) — A rekordok, mind a 4 IP-cím:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
(Ha a szolgáltatód támogatja az ALIAS/ANAME rekordot, az is használható
A rekordok helyett, `lukacspeter89.github.io` célponttal.)

**`www` alá:**
```
CNAME  www.bimline.hu  →  lukacspeter89.github.io
```

Ezek beállítása a domain-szolgáltatód (pl. a regisztrátor, ahol a
bimline.hu-t vetted) admin felületén történik, DNS / névszerver
beállítások menüpont alatt.

### 1.2 GitHub repo beállítása

1. Menj a repóba: `https://github.com/lukacspeter89/bimline/settings/pages`
2. "Custom domain" mezőbe írd be: `www.bimline.hu`
3. Mentés után a GitHub ellenőrzi a DNS-t (ez eltarthat pár órát / akár 1 napig).
4. Ha zöld pipát kapsz, pipáld be az "Enforce HTTPS" opciót is (ez általában
   csak azután jelenik meg/válik bepipálhatóvá, hogy a DNS ellenőrzés lezajlott).

### 1.3 Kódban elvégzendő módosítás (ekkor, NE előbb)

Az `astro.config.mjs` fájlban:
```javascript
export default defineConfig({
  site: 'https://www.bimline.hu',
  base: '/',   // fontos: a base path törlődik, mert már nem alkönyvtárban fut
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

Emellett a repo gyökerébe egy `public/CNAME` fájlt is létre kell hozni,
ebben csak ennyi szöveg legyen:
```
www.bimline.hu
```

**Fontos:** ezt a két változtatást csak azután érdemes push-olni, hogy a
DNS már át van állítva — különben a jelenlegi `/bimline/` alkönyvtáras cím
átmenetileg eltűnhet (a linkek "/" gyökérre mutatnának, ami a
github.io-n nem létezik, amíg a domain nincs bekötve).

Szólj, ha ezt a lépést szeretnéd, és elvégzem a kód-oldali váltást is.

### 1.4 Utólagos ellenőrzés

- Nyisd meg `https://www.bimline.hu` és `https://bimline.hu` címeket — mindkettőnek
  működnie kell (az apex a www-re irányít át).
- Ellenőrizd, hogy a HTTPS-lakat rendben van-e (nincs vegyes tartalom hiba).
- A Google Search Console-ban vedd fel az új domaint mint külön property-t
  (a régi github.io cím nem indexelődött publikusan, szóval ez lesz az első
  valódi property).

---

## 2. Google Analytics 4 (GA4) beállítása

Jelenleg a kód egy **helyőrző** mérési azonosítóval (`G-XXXXXXXXXX`) fut,
ami miatt a Google Analytics szkript ténylegesen be sem töltődik, még akkor
sem, ha valaki elfogadja a statisztikai sütiket.

### 2.1 GA4 property létrehozása

1. Nyisd meg: [analytics.google.com](https://analytics.google.com)
2. Admin (bal alsó fogaskerék) → "Létrehozás" → "Property"
3. Add meg a property nevét (pl. "BIMLine Gépész Kft. — bimline.hu"),
   időzónát (Budapest), pénznemet (HUF).
4. Üzleti adatok / iparág: válaszd a legközelebbit (pl. "Építőipar").
5. Adatgyűjtés típusánál válaszd a "Web"-et, add meg a weboldal URL-jét
   (`https://www.bimline.hu`, vagy egyelőre a jelenlegi github.io címet,
   ha még nem váltottál domaint).
6. A létrehozás után megkapod a **Mérési azonosítót** — ez `G-` kezdetű,
   10 karakteres kód.

### 2.2 Azonosító beillesztése a kódba

Küldd el nekem a `G-XXXXXXXXXX` formátumú kódot, és beírom a
`src/lib/analytics-config.ts` fájlba (`GA_MEASUREMENT_ID` konstans), majd
push-olom. Ezt a lépést magad is elvégezheted, ha szeretnéd: csak azt az
egy sort kell módosítani abban a fájlban.

### 2.3 Ellenőrzés

- Fogadd el a statisztikai sütiket a saját böngésződben (süti-popup).
- A GA4 felületén: Jelentések → Valós idejű — pár másodpercen belül meg
  kell jelenned "1 aktív felhasználó"-ként.

---

## 3. Jogi tartalom kiegészítése

Az `/adatkezeles/` oldalon (Adatkezelési tájékoztató) két adat helyőrzővel
szerepel, ezeket neked kell pontosítanod, mielőtt élesben publikus:

- **Cégjegyzékszám** — a cégkivonatodon / a Céginformációs Szolgálat
  (e-cegjegyzek.hu) adatlapján található.
- **Adószám** — szintén a cégkivonaton.
- (Opcionális) **Adatvédelmi kapcsolattartó** neve/elérhetősége, ha van
  ilyen kijelölve; ha nincs, a sor törölhető, marad a `hello@bimline.hu`.

Ezeket is elküldheted chatben, és frissítem az oldalt, vagy közvetlenül a
`src/pages/adatkezeles.astro` fájlban a `[KITÖLTENDŐ: ...]` jelölésű
helyeken magad is átírhatod (GitHub webes szerkesztőjével is, "." billentyű
a repó oldalán megnyitja a github.dev szerkesztőt).

**Fontos jogi megjegyzés:** ez a tájékoztató egy jó kiindulási sablon, de
nem helyettesíti egy jogász / adatvédelmi szakértő átnézését — különösen
akkor érdemes ezt bekérni, ha a jövőben bővül az adatkezelés köre (pl.
hírlevél, marketing pixel, egyéb harmadik fél szolgáltatás).

---

## 4. Közösségi média — állapot (2026-07-06)

| Csatorna | Állapot |
|---|---|
| YouTube | ✅ Bekötve |
| LinkedIn | ✅ Bekötve |
| Facebook | ✅ Bekötve (`profile.php?id=61591986440282`) |
| Instagram | ✅ Teljesen eltávolítva a kódból |

**Opcionális, később:** a Facebook oldalnak érdemes "vanity URL"-t
(felhasználónevet) beállítani a Facebook oldal beállításaiban — akkor a
link `facebook.com/bimline` formájú lesz. Ha megvan, csak a
`src/lib/site.ts` `social.facebook` értékét kell cserélni.

---

## 5. Végső élesítési sorrend (checklist)

1. ☐ **Cégjegyzékszám + adószám** beírása (`src/pages/adatkezeles.astro`, `[KITÖLTENDŐ]` helyek) — 3. pont
2. ☐ **GA4 property** létrehozása, mérési azonosító beírása (`src/lib/analytics-config.ts`) — 2. pont
3. ☐ **DNS beállítás** a domain-regisztrátornál (A rekordok + www CNAME) — 1.1 pont
4. ☐ **GitHub Pages** custom domain: `www.bimline.hu` + DNS-ellenőrzés kivárása — 1.2 pont
5. ☐ **Kód-oldali domain-váltás push** (astro.config: site+base, `public/CNAME`) — csak a 3–4. lépés UTÁN! — 1.3 pont
6. ☐ **Enforce HTTPS** bepipálása a GitHub Pages beállításokban
7. ☐ **Ellenőrzés**: bimline.hu + www.bimline.hu betölt, HTTPS-lakat OK, süti-popup után GA4 valós idejű jelentésben látszol, footer social linkek (LinkedIn / Facebook / YouTube) jók
8. ☐ **Google Search Console**: property felvétele a www.bimline.hu-ra, sitemap beküldése (`/sitemap-index.xml`)

---

## 6. Összefoglaló — mi van már kész, mi vár rád

| Feladat | Állapot |
|---|---|
| Süti-kezelő popup (Szükséges / Statisztikai / Marketing) | ✅ Kész, élesben fut |
| Google Analytics 4 integráció (hozzájárulás-függő betöltés) | ✅ Kód kész, ⏳ mérési azonosító hiányzik |
| Adatkezelési tájékoztató oldal | ✅ Kész, ⏳ cégjegyzékszám / adószám kitöltendő |
| Social linkek (YouTube, LinkedIn, Facebook — Instagram törölve) | ✅ Kész |
| bimline.hu domain kód-oldali előkészítése | ✅ Instrukció kész ebben a fájlban, ⏳ DNS-váltás + push tőled/velem együtt |
