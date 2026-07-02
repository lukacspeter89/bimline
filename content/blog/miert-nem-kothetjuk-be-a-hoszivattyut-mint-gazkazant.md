---
title: "Miért nem köthetjük be a hőszivattyút úgy, mint egy gázkazánt?"
description: "A gázkazán és a hőszivattyú hidraulikai méretezése gyökeresen eltér. Bemutatjuk a hőfoklépcső fizikáját, a tipikus csőméretezési hibát és a helyes mérnöki megoldást."
publishDate: 2026-02-03
author: "BIMLine Gépész Kft."
tags: ["hőszivattyú", "csőméretezés", "hidraulika"]
category: "Hőszivattyú"
draft: false
---

Gyakori hiba a lakossági kivitelezések során, hogy a gázkazánok szereléséhez szokott szakemberek ösztönösen a megszokott csőméretezést alkalmazzák a hőszivattyúknál is, mondván: „ha a 24 kW-os gázkazán elment a 3/4"-os csövön, a 16 kW-os hőszivattyúnak is bőven elég lesz”. Épületgépész tervezőként határozottan kijelentjük: ez nem igaz, a két berendezés hidraulikai méretezése gyökeresen eltérő.

## A fizikai háttér: a hőfoklépcső (ΔT) különbsége

A fűtési rendszerben áramoltatandó vízmennyiséget (tömegáramot) a berendezés működési hőfoklépcsője határozza meg. A gázkazán magas hőmérsékleten és nagy hőfoklépcsővel üzemel (ΔT = 20 K), a hőszivattyú viszont alacsony hőmérsékleten és kifejezetten kicsi hőfoklépcsővel dolgozik (ΔT = 5 K).

Nézzük meg ezt egy egzakt számszerű példán keresztül: egy 24 kW-os gázkazán (ΔT = 20 K) esetén a szükséges vízáram kb. 1,0 m³/h, míg egy 16 kW-os hőszivattyú (ΔT = 5 K) esetén a szükséges vízáram kb. 2,7 m³/h. Látható, hogy a kisebb teljesítményű hőszivattyú közel háromszor nagyobb térfogatáramot (több vizet) igényel, mint a nagyobb kazán.

## A vékony csövezésből adódó rendszerhibák

Ha a hőszivattyút beszűkítjük a megszokott 3/4"-os csőre, az alábbi súlyos problémákkal fogunk szembesülni:

1. **Kritikus áramlási sebesség:** a sebesség eléri a 2–3 m/s-ot, ami zajos működést (suhogást, pattogást) és belső csőeróziót okoz.
2. **Hatalmas nyomásveszteség:** a beépített keringetőszivattyú túlterhelődik, és nem tudja szállítani a gép számára létfontosságú vízmennyiséget.
3. **Magasnyomás-leoldás (hibakód):** mivel a víz nem tudja elszállítani a hőt a kondenzátorból, a gép túlmelegszik és vészleállással lekapcsol.
4. **COP romlása:** a kompresszornak kényszerűen magasabb nyomáson és hőmérsékleten kell dolgoznia, ami drasztikusan rontja a hatásfokot és növeli a villanyszámlát.
5. **Defrost (leolvasztási) hibák:** téli üzemben a gép nem talál elegendő hőenergiát a kültéri egység leolvasztásához, ami instabil működést eredményez.

## A helyes mérnöki kialakítás

A hőszivattyú nem egy „kis kazán”. A stabil és gazdaságos működés érdekében az alábbi tervezési szabályokat kell betartani: nagyobb csőátmérő (16 kW fűtési teljesítménynél a megszokott 3/4" (22×1,5 mm) helyett DN25–DN32 belső átmérőjű, pl. 28 mm-es vagy 35 mm-es szénacél csövezésre van szükség), valamint hidraulikai leválasztás (puffertartály vagy hidraulikus váltó beépítése kötelező, hogy a gép tömegárama független legyen a fűtési körök pillanatnyi szabályozásától).
