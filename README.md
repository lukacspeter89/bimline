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
- saját oldalt kap (`/blog/<fájlnév>/`) automatikus tartalomjegyzékkel, breadcrumb-bal, kapcsolódó ci