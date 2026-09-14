# BIMLine Gépész Kft. — honlap

Astro alapú, statikusan generált honlap. A főoldal továbbra is egyetlen one-page landing (Hero, Miért minket, Szolgáltatások, Referenciák, Rólunk, Kapcsolat), emellett egy fájl-alapú, Astro Content Collections-re épülő tudásbázis/blog rendszer is része a projektnek.

## Fájlstruktúra

```
src/
 ├── content.config.ts    — Content Collections séma (jelenleg: blog)
 ├── pages/
 │    ├── index.astro     — a one-page főoldal (minden szekció itt)
 │    ├── blog/
 │    │    ├── index.astro   — blog lista (kereső, kategória/tag szűrő, lapozás)
 │    │    └── [id].astro    — egyedi cikkoldal (TOC, breadcrumb, Article schema, related, prev/next)
 │    └── rss.xml.js      — automatikus RSS feed a bloghoz
 ├── layouts/BaseLayout.astro
 ├── components/          — Header, Footer, SEO, OrganizationSchema, CompareSlider, BrandMarquee,
 │                          ReferenceMap, StatCounter, CTASection, LatestArticles
 ├── data/                — projects.ts, map-points.ts, brands.ts (statikus adatok a főoldalhoz)
 ├── lib/                 — site.ts (cégadatok, közösségimédia-linkek), reading-time.ts
 └── styles/global.css    — Tailwind v4 + egyedi design tokenek

content/
 └── blog/                — ide kerülnek a blogcikkek (.md / .mdx)

public/                   — statikus fájlok (logó, képek, favicon, robots.txt)
```

## Új blogcikk hozzáadása

Egyszerűen hozz létre egy új `.md` (vagy `.mdx`) fájlt a `content/blog/` mappában. A fájlnév lesz a cikk URL-slugja (pl. `content/blog/uj-cikk.md` → `/blog/uj-cikk/`).

Kötelező/elérhető frontmatter mezők:

```yaml
---
title: "Cikk címe"
description: "Rövid, SEO-leírás (meta description-nek is ez megy)."
publishDate: 2026-07-01
updatedDate: 2026-07-05      # opcionális
author: "BIMLine Gépész Kft." # opcionális, van alapérték
coverImage: ../../assets/cover.jpg  # opcionális
coverImageAlt: "Kép leírása"  # opcionális
tags: ["BIM", "energetika"]
category: "BIM és tervezés"
featured: false               # opcionális
draft: false                  # true esetén nem jelenik meg élesben
---

A cikk törzsszövege itt, Markdown formátumban...
```

Ha ez megvan, minden más automatikus:
- megjelenik a `/blog/` listában (dátum szerint rendezve, kereshető, szűrhető kategória/tag szerint)
- saját oldalt kap (`/blog/<fájlnév>/`) automatikus tartalomjegyzékkel, breadcrumb-bal, kapcsolódó cikkekkel, előző/következő navigációval
- bekerül a sitemap-be és az RSS feedbe (`/rss.xml`)
- a főoldal "Legfrissebb cikkeink" szekciója automatikusan mutatja, ha az egyik legújabb 3 közé kerül
- egyedi SEO metaadatokat (title, description, canonical, OG, Twitter Card, Article schema) kap

Nincs szükség route létrehozására vagy navigáció-frissítésre.

## Helyi fejlesztés

```
npm install
npm run dev       # fejlesztői szerver: http://localhost:4321
npm run build      # statikus build a dist/ mappába
npm run preview    # a kész build helyi kiszolgálása
```

## GitHub Pages beüzemelése

1. Repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
2. Minden `main` ágra történő push után a `.github/workflows/deploy-pages.yml` telepíti a függőségeket (`npm ci`), lefuttatja az Astro buildet (`npm run build`), és publikálja a `dist/` mappa tartalmát.
3. Egyedi domain (pl. www.bimline.hu) esetén add hozzá a `public/CNAME` fájlt, és állítsd be a DNS-t a domain-szolgáltatónál.

## Ajánlatkérő űrlap bekötése

Az űrlap a `hello@bimline.hu` címre küld e-mailt egy Google Apps Script webalkalmazáson keresztül (a script forrása szándékosan NEM része a publikus repónak — csak a helyi projekt mappában érhető el). A `FORM_ENDPOINT` konstans az `src/pages/index.astro` fájl alján, a kapcsolati form szkriptjében található — ugyanez a végpont szerepel a felülvizsgálati landing (`src/pages/szolgaltatasok/energetikai-felulvizsgalat.astro` és az angol tükre) szkriptjében is.

Az Apps Script mezőnevei (`nev, ceg, email, telefon, leiras, alapok, linkek`, `website` honeypot, `t` időzítés) **rögzítettek** — a főoldali és a felülvizsgálati űrlap is ezekre épül, ne változtasd meg őket.

### Energetikai felülvizsgálat landing (besorolás + űrlap)

- A landing 5 kérdéses **besorolást** tartalmaz (`#besorolas`; pontozás: A ≥ 12 / B 8–11 / C, kimenet: érintett · díjmentes besorolás · valószínűleg nem érintett) és egy rövid űrlapot (`#kapcsolat`: 6 mező + 2 pipa). Nincs árlista és kalkulátor — a díjazás szövegesen szerepel.
- A plusz adatok (besorolás válaszai és pontszáma, állapot, választott csomag, irányítószám, minta-kérés, UTM-forrás) a **`leiras` mezőbe csomagolva** mennek, ezért az Apps Script mezőnevei változatlanok. Az e-mailben ezek az „Előminősítés:", „Érdeklődés:", „Irányítószám:", „Mintadokumentumot kér:" és „Forrás (UTM):" sorokként jelennek meg a leírás elején. Az angol oldal ugyanezt angol címkékkel küldi.
- **Lead-táblázat (opcionális):** a helyi `google-apps-script.gs` a `LEAD_SHEET_ID` konstans kitöltése esetén egy Google Sheet „Leadek" munkalapjára is ír egy sort (dátum, név, cég, e-mail, telefon, a `leiras`-ból kinyert előminősítés/csomag/irányítószám/UTM/minta, üres „Státusz" oszlop legördülővel). Üres `LEAD_SHEET_ID` mellett csak e-mail megy. **A szkript módosítása után új üzembe helyezési verzió kell** (Telepítés → Üzembe helyezések kezelése → Szerkesztés → Verzió: Új verzió), és az első futásnál a Sheets-jogosultságot engedélyezni kell.
- **Kampány-változat:** `?u=megtakaritas` (vagy `utm_campaign`, amiben szerepel a „megtakaritas") esetén a hero cím/alcím kliens oldalon a megtakarítás-üzenetre vált (`#heroTitle`, `#heroLead`), a szerkezet és a CTA változatlan. Angol oldalon `?u=savings`. Az `u` paraméter az UTM-forrással együtt bekerül a leírásba.
- **GA4-események** (csak süti-hozzájárulás után): `energetikai_cta_click` (`cta`), `energetikai_qualified` (`state`, `score`, `category`), `energetikai_form_submit`, `energetikai_qualified_lead` (`score`, `category`, `csomag`). Minden esemény hordozza a `page_group: energetikai` és `variant` (default / megtakaritas) paramétert. **Google Ads-ben az `energetikai_qualified_lead` eseményt kell konverzióként importálni** (CPQL-optimalizálás); az `energetikai_qualified` `state` paramétere remarketing-közönség alapja lehet. Ellenőrzéshez: GA4 DebugView, vagy `ANALYTICS_DEBUG = true` az `src/lib/analytics-config.ts`-ben (teszt után vissza `false`-ra).
- **Mintadokumentumok:** az anonimizált PDF-ek helye `public/minta/` (`mintajegyzokonyv.pdf`, `energetikai-vesztesegfeltaras-minta.pdf`; angol: `-en` végződéssel). Ha megvannak, a két oldalon a `SAMPLE_REPORT_URL` / `SAMPLE_MAP_URL` konstansokat kell kitölteni (`${base}minta/...`); amíg üresek, az oldal „kérem e-mailben" gombot mutat, ami az űrlap minta-pipáját jelöli be.

## Közösségi média linkek hozzáadása

Amint elkészülnek a LinkedIn/Facebook/YouTube/Instagram profilok, az `src/lib/site.ts` fájlban a `social` objektumba kell beírni az URL-eket — a footer ikonjai és a strukturált adatok (`sameAs`) automatikusan felveszik őket.

## Fontos, publikálás előtt ellenőrizendő

- **Referenciatérkép (244 helyszín):** a térkép egy előre elkészített, 244 magyarországi településből álló minta-listát jelenít meg (`src/data/map-points.ts`). Ez demóadat — publikálás előtt cseréld le a ténylegesen valós projekt-helyszínekre.
- **Alkalmazott márkák futószalag:** az `src/data/brands.ts` tömb a piacon elterjedt gyártói neveket sorolja fel — erősítsd meg, hogy ezekkel valóban dolgoztok.
- **Adatvédelmi tájékoztató:** a lábléc jelenleg egy rövid, ideiglenes szöveget tartalmaz — érdemes egy teljes GDPR-tájékoztatót kiadatni jogásszal, majd belinkelni.
- **Telefonszám:** az `src/lib/site.ts`-ben a `telephone` mező jelenleg üres — ha van publikus telefonszám, érdemes megadni (megjelenik a strukturált adatban is).
