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

Az űrlap a `hello@bimline.hu` címre küld e-mailt egy Google Apps Script webalkalmazáson keresztül (a script forrása szándékosan NEM része a publikus repónak — csak a helyi projekt mappában érhető el). A `FORM_ENDPOINT` konstans az `src/pages/index.astro` fájl alján, a kapcsolati form szkriptjében található.

## Közösségi média linkek hozzáadása

Amint elkészülnek a LinkedIn/Facebook/YouTube/Instagram profilok, az `src/lib/site.ts` fájlban a `social` objektumba kell beírni az URL-eket — a footer ikonjai és a strukturált adatok (`sameAs`) automatikusan felveszik őket.

## Fontos, publikálás előtt ellenőrizendő

- **Referenciatérkép (244 helyszín):** a térkép egy előre elkészített, 244 magyarországi településből álló minta-listát jelenít meg (`src/data/map-points.ts`). Ez demóadat — publikálás előtt cseréld le a ténylegesen valós projekt-helyszínekre.
- **Alkalmazott márkák futószalag:** az `src/data/brands.ts` tömb a piacon elterjedt gyártói neveket sorolja fel — erősítsd meg, hogy ezekkel valóban dolgoztok.
- **Adatvédelmi tájékoztató:** a lábléc jelenleg egy rövid, ideiglenes szöveget tartalmaz — érdemes egy teljes GDPR-tájékoztatót kiadatni jogásszal, majd belinkelni.
- **Telefonszám:** az `src/lib/site.ts`-ben a `telephone` mező jelenleg üres — ha van publikus telefonszám, érdemes megadni (megjelenik a strukturált adatban is).
