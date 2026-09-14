# EN 378 hűtőgépház-felülvizsgálat oldal — módosítási javaslat

*Készült: 2026-09-14. Csak terv, kód nem változott. Érintett fájlok: `src/pages/szolgaltatasok/en378-felulvizsgalat.astro` és az angol tükre `src/pages/en/szolgaltatasok/en378-felulvizsgalat.astro`.*

## Mi van most az oldalon

A hero „Szabványos-e a hűtőgépháza?" kérdéssel indít, két CTA-val (Felmérés kérése → `#kapcsolat`, Díjkalkulátor → `#kalkulator`). Utána: A probléma (CO₂ és VRF kockázat), Kinek szól (4 célcsoport), Hogyan dolgozunk (5 lépcső, az első három fix díjas), Mit kap kézhez, Milyen rendszerekre, **Díjkalkulátor** (irányítószám → felmérés + értékelés + kiszállás km-alapon, nettó Ft-ban), GYIK (7 kérdés, köztük „Kötelező ez? Bírságolható?" és „Mennyibe kerül?" — ez utóbbi a kalkulátorra hivatkozik), Tervezői háttér, űrlap (név, cég, e-mail, telefon, telephelyek száma, rendszer típusa, leírás, GDPR; a kalkulált ár a `leiras`-ba csomagolva megy).

A kommunikáció már most sem büntetés-vezérelt (a GYIK korrektül leírja, hogy az EN 378 szabvány, nem jogszabály, nincs közvetlen bírság). A két dolog, ami eltér az energetikai landing új logikájától: **nyilvános ártáblázat/kalkulátor** és **nincs előszűrés** — bárki kér felmérést, a minősítés csak az e-mailből derül ki.

## Miben más ez a piac, mint az energetikai felülvizsgálat

Érdemes ezt előre rögzíteni, mert nem egy az egyben másolható az energetikai megoldás.

Az energetikai felülvizsgálatnál a jogszabály kijelöli, ki érintett (70 kW felett), így a besorolás egy objektív kérdésre ad választ. Az EN 378-nál nincs ilyen küszöb: a kockázat a töltet, a hűtőközeg biztonsági osztálya és a gépház/helyiség térfogata együtteséből jön, és a vevő ezt jellemzően nem tudja fejből. A besorolás itt tehát nem „kötelezett-e", hanem **„van-e valószínűsíthető kockázata, és mekkora a döntési tét"** — ez a kettő adja a lead-minőséget.

A célcsoport is szűkebb és B2B-bb: kiskereskedelmi láncok, FM-cégek, hűtéstechnikai kivitelezők, irodaház/szálloda-üzemeltetők. Lakossági érdeklődő itt alig van, a B2B-kizáró mondatnak kevesebb a dolga; annál több a **„csak egy split klíma"** vagy **„egy darab kis gépház, egyszeri munka"** típusú, alacsony értékű megkeresés kiszűrése, illetve a **több telephelyes** és a **kivitelező-alvállalkozói** leadek felismerése.

## Két megközelítés

### „A" változat — minimális átalakítás: kalkulátor ki, besorolás be, szerkezet marad

A meglévő szekciók sorrendje és szövege lényegében marad, három ponton nyúlunk bele.

A hero második CTA-ja („Díjkalkulátor") helyett „Nézze meg, érinti-e a gépházát — 2 perc" → `#besorolas`. Az alcímből kikerül a „Fix díjas felmérés" ígéret, helyette: „a felmérés díját a gépházak számától, a hűtőközegtől és a telephelyek számától függően előre rögzítjük".

A Díjkalkulátor szekció helyére egy **„Kiszámítható díjazás"** kártya kerül (ugyanaz a séma, mint az energetikai oldalon): a díj a gépházak/rendszerek számától, a hűtőközeg típusától (CO₂ transzkritikus, VRF, ipari, éghető közeg), a telephelyek számától és távolságától függ; a besorolás adatai alapján 2 munkanapon belül rögzített díjú ajánlat; rejtett költség nincs; több telephelynél csomagajánlat. A GYIK „Mennyibe kerül?" válaszát ehhez kell igazítani (a „fenti kalkulátorral előre kiszámolható" mondat kikerül).

Az űrlap elé egy **5 kérdéses besorolás** kerül, az energetikai oldal `qualifier`/pontozás mintájára (ugyanaz a JS-logika másolható, csak a kérdéssor és a küszöbök mások):

1. Ki üzemelteti? — kiskereskedelmi lánc (3) · FM/létesítményüzemeltető (3) · hűtéstechnikai kivitelező/fővállalkozó, alvállalkozóként (2) · irodaház/szálloda-üzemeltető (2) · társasház/magánszemély (kizáró: „split klímával lakásban nem foglalkozunk").
2. Milyen rendszer? — CO₂ (R744) transzkritikus (3) · VRF/split irodában, szállodában (2) · ipari/hűtőházi, ammóniás (2) · éghető közeg, R290/R32 (2) · nem tudom (1, „bizonytalan").
3. Hol van a gép? — külön gépházban/zárt helyiségben (3) · tetőn/szabadban, csak a beltéri egységek vannak zárt térben (1) · nem tudom (1, bizonytalan). (Ez a legerősebb kockázat-indikátor: a zárt gépház a vészszellőztetés/gázérzékelés kérdés.)
4. Hány gépház / telephely? — 1 (0) · 2–5 (2) · 5-nél több (4).
5. Mi a cél? — csak dokumentált megfelelőségi jegyzőkönyv (1) · a hiányosságok megszüntetését is meg akarjuk terveztetni (3) · biztosítási/bérbeadási/audit-kényszer, határidővel (3) · kivitelezőként tervezőt keresek (2).

Kimenetek: **„Érdemes felmérni"** (nem kizárt, ≥ 1 kockázati jel: zárt gépház vagy CO₂/éghető közeg) → CTA „Rögzített díjú ajánlatot kérek"; **„Bizonytalan — díjmentesen megnézzük"** (bármelyik „nem tudom") → CTA „Kérem a díjmentes előszűrést" (adattábla-fotó, gépház-fotó elég); **„Valószínűleg nem szükséges"** (magánszemély, vagy 1 db kültéri kis split) → udvarias elirányítás, űrlap nélkül. Pontozás: A ≥ 10, B 6–9, C alatta — belső használatra, a besorolás összefoglalója a `leiras`-ba megy, mint az energetikai oldalon („Előminősítés:" sor), így a bővített Apps Script már most feldolgozná (a `parseLeadFields` regexei oldalfüggetlenek; csak az „Oldal" oszlop felismeréséhez kell egy `[EN 378 hűtőgépház-felülvizsgálat]` fejléc-sor).

Az űrlap 6 mezőre és 2 pipára szűkül: név, cég, e-mail, telefon, telephely irányítószáma, rendszer típusa (select, a besorolás előtölti) + rövid leírás; pipák: „kérem a minta megfelelőségi jegyzőkönyvet", GDPR. A „telephelyek száma" mező a besorolás 4. kérdéséből jön, nem kell külön.

GA4: `en378_cta_click`, `en378_qualified` (`state`, `score`, `category`), `en378_form_submit`, `en378_qualified_lead` — ugyanaz a séma, csak `page_group: 'en378'`.

Előnye: 1 napos munka, a meglévő szövegek 90%-a marad, a lead-táblázat és a GA4-konverzió logikája újrahasznosul. Hátránya: a hero továbbra is „felmérés"-központú, a döntéstámogató (második termék) üzenet nem jelenik meg.

### „B" változat — két termék, mint az energetikai oldalon

Az „A" változat minden eleme, plusz a termékszerkezet átírása kétcsomagosra, mert a mostani 5 lépcső valójában ezt rejti:

**Megfelelőségi jegyzőkönyv** (= 1–2. lépcső): helyszíni felmérés, töltet/térfogat vizsgálat, EN 378-3 tételes értékelés, megfelelőségi jegyzőkönyv fotódokumentációval. Annak, akinek dokumentált felelősségkezelés kell (FM-szerződés, biztosítás, bérbeadás, audit). Ha minden rendben, a jegyzőkönyv önmagában is érték — ez a mostani GYIK-ből jön, jó üzenet, a csomag „note"-ja lehet.

**Megfelelőségi jegyzőkönyv + Megoldási terv** (= 1–3. lépcső, opcionálisan 4–5.): ugyanabból a felmérésből koncepcióterv, a meglévő adottságok (légtechnikai felszállók) kihasználásával, nagyságrendi költségbecslés; kérésre kiviteli terv és tervezői művezetés. Több telephelynél portfólió-változat: melyik gépház a legkockázatosabb, hol érdemes először költeni — ez a kiskereskedelmi láncoknak a valódi döntési kérdés.

A hero ehhez: „Szabványos-e a hűtőgépháza? — Ha nem, azt is megtervezzük, hogy az legyen." Alcím: felmérés → megfelelőségi jegyzőkönyv → a hiányosságok megszüntetésének terve, egy kézből; a díjat előre rögzítjük. A „Hogyan dolgozunk" 5 lépcsője maradhat, de a két csomag felett, „mit tartalmaz melyik csomag" jelöléssel (a mostani `fix: true/false` flag pont ezt a határt jelöli).

Mintadokumentum-szekció: egy anonimizált **minta megfelelőségi jegyzőkönyv** (és ha van, egy minta koncepcióterv-kivonat) `public/minta/en378-...pdf` néven, ugyanazzal a `SAMPLE_*_URL` konstans + „kérem e-mailben" fallback logikával.

Kampány-változat: `?u=biztonsag` → hero „Mi történik, ha szivárog a CO₂ a gépházban?" (kockázat-üzenet FM-cégeknek, biztosítási szempont), `?u=lanc` → „Hány gépháza van, és hányat mértek fel?" (portfólió-üzenet láncoknak). Ugyanaz a `heroTitle`/`heroLead` csere, mint az energetikai oldalon.

Előnye: az oldal ugyanazt a logikát követi, mint az energetikai landing (két termék, besorolás, rögzített ajánlat, minta), a Google Ads-ben ugyanazzal a CPQL-modellel mérhető, és a „megoldási terv" csomag a magasabb értékű tervezési munkát adja el, nem csak a felmérést. Hátránya: 2–3 napos munka, új szövegek kellenek (csomag-leírások, minta-szekció), és a mintajegyzőkönyvet el kell készíteni.

## Javaslat

Az „A" változat azonnal megcsinálható és a lead-minőségi problémát megoldja (kalkulátor helyett besorolás, ugyanaz az űrlap-csomagolás, ugyanaz a lead-táblázat). A „B" akkor éri meg, ha az EN 378 szolgáltatásra is lesz fizetett kampány — ekkor a két csomag és a minta nélkül a hirdetési forgalom nagy része „csak jegyzőkönyv kell, mennyibe kerül" marad. Praktikus sorrend: A most, B a mintajegyzőkönyv elkészülte után.

## Amit mindkét változatban meg kell tartani

A GYIK „Kötelező ez? Bírságolható?" válasza jó és őszinte (szabvány, nem jogszabály; a kötelezettség áttételes) — ne cseréljük fenyegetőbbre. Az OTSZ-, F-gáz- és munkavédelmi hivatkozások maradjanak, ahogy vannak. Az Apps Script mezőnevei változatlanok; a plusz adatok itt is a `leiras`-ba csomagolva mennek.
