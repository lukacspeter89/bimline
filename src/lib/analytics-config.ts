// Google Analytics 4 mérési azonosító.
//
// Ez jelenleg egy HELYŐRZŐ érték — amíg nem cseréled le egy valódi
// "G-" kezdetű GA4 Mérési azonosítóra, a followkövető kód nem fog
// ténylegesen adatot küldeni a Google Analytics felé (a script be sem
// töltődik hozzájárulás nélkül, illetve a Google elutasítja az érvénytelen azonosítót).
//
// Hogyan szerezd be: lásd a repo gyökerében a TEENDOK_DOMAIN_ATALLITAS.md
// fájl "Google Analytics 4 beállítása" szakaszát.
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Ha true, a konzolba ír néhány debug-üzenetet a hozzájárulás-kezelésről
// és a GA betöltéséről — fejlesztés közben hasznos, éles oldalon érdemes false-ra hagyni.
export const ANALYTICS_DEBUG = false;
