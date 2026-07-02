---
title: "Mekkora puffertartály kell egy hőszivattyús rendszerhez?"
description: "A puffertartály méretezésének szerepe, a túl kicsi és túl nagy tartály hibái, a gyártói irányszámok és a szabályozástechnikai méretezési képlet."
publishDate: 2026-02-03
author: "BIMLine Gépész Kft."
tags: ["hőszivattyú", "puffertartály", "méretezés"]
category: "Hőszivattyú"
draft: false
---

A puffertartály méretezése az egyik legkritikusabb kérdés a hőszivattyús rendszerek tervezése során. Sokan felesleges költségnek tartják, pedig a puffer a rendszer hidraulikai stabilitásának és hosszú élettartamának a záloga.

## A puffertartály funkciói a rendszerben

A puffer hidraulikai leválasztást biztosít: elválasztja a hőszivattyú primer körét a fűtési/hűtési szekunder köröktől. Megakadályozza a rövid ciklusokat, mivel megnöveli a rendszer víztérfogatát, így megvédi a kompresszort a sűrű ki-be kapcsolgatástól. Végül támogatja a leolvasztást (defrosztot): biztosítja azt a hőtömeget, amelyet a hőszivattyú a téli időszakban a kültéri egység jégmentesítésére használ fel.

## A hibás méretezés következményei

**Ha a puffertartály túl kicsi**, a hőszivattyú túl gyorsan eléri a kívánt előremenő hőmérsékletet, majd leáll (short cycling). A sűrű indítás drasztikusan csökkenti a méregdrága kompresszor élettartamát. Emellett télen a gép nem talál elegendő energiát a leolvasztáshoz, ami sikertelen defroszt folyamatokhoz és fűtéskimaradáshoz vezet.

**Ha a puffertartály túl nagy**, a rendszer tehetetlensége túlságosan megnő, a szobahőmérséklet szabályozása lomhává válik. A hőszivattyú kénytelen hosszú ideig magasabb hőmérsékleten üzemelni, hogy a hatalmas víztömeget átfűtse, ami rontja a szezonális hatásfokot (COP). Emellett a feleslegesen nagy tartály drága és értékes helyet foglal a gépházban.

## Az optimális méret meghatározása

A tervezés során a gyártói minimum-ajánlásokból indulunk ki, amelyek a hőszivattyú teljesítményére vetítve határozzák meg a minimális teljes rendszertérfogatot: monoblokk hőszivattyúknál 10–20 liter/kW, split hőszivattyúknál 7–15 liter/kW.

Mérnöki megjegyzés: a puffer méretezésénél figyelembe vesszük a csőhálózat és a hőleadók saját belső víztartalmát is. Ha az épületben tiszta, zónaszelepekkel le nem zárható padlófűtés van, az önmagában is nagy vízteret biztosít, így a puffertartály mérete indokolt esetben csökkenthető.

**Szabályozástechnikai méretezési képlet.** A hőszivattyú optimális, minimum 10–15 perces folyamatos üzemidejének (t) biztosítására az alábbi összefüggést alkalmazzuk:

V = (P × t) / (1,16 × ΔT)

ahol P a gép teljesítménye kW-ban, t az idő órában, ΔT pedig a puffer megengedett hőmérséklet-ingadozása, általában 5–7 K.
