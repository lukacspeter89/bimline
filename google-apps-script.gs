/**
 * BIMLine Gépész Kft. — kapcsolati űrlap Google Apps Script backend
 *
 * Ez a szkript fogadja a weboldal (index.html) kapcsolati űrlapjának
 * beküldését: e-mailt küld a hello@bimline.hu címre, majd automatikus
 * visszaigazolást is küld a feladó (érdeklődő) e-mail címére.
 *
 * TELEPÍTÉS:
 * 1. Nyisd meg: https://script.google.com/ → Új projekt
 * 2. Töröld ki az alapértelmezett kódot, illeszd be ezt a teljes fájlt.
 * 3. Mentés (Ctrl+S), adj nevet a projektnek (pl. "BIMLine kapcsolati űrlap").
 * 4. Jobb felül: Telepítés → Új üzembe helyezés.
 *    - Típus: Webalkalmazás
 *    - Végrehajtás mint: Én (a te fiókod)
 *    - Hozzáférés: Bárki
 * 5. Engedélyezd a kért jogosultságokat (MailApp küldési jog).
 * 6. Másold ki a kapott webalkalmazás URL-t (.../exec végződésű).
 * 7. Küldd el nekem ezt az URL-t — én beillesztem a weboldal
 *    index.html-jébe (FORM_ENDPOINT konstans), és felpusholom GitHub-ra.
 *
 * MEGJEGYZÉS: ha később módosítod a szkriptet, mindig új üzembe helyezési
 * verziót kell készítened ("Új üzembe helyezés kezelése" → Szerkesztés →
 * Verzió: Új verzió), különben a régi kód fut tovább az /exec URL mögött.
 */

var TARGET_EMAIL = 'hello@bimline.hu';

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};

    var nev     = (p.nev || '').toString().trim();
    var ceg     = (p.ceg || '').toString().trim();
    var email   = (p.email || '').toString().trim();
    var telefon = (p.telefon || '').toString().trim();
    var leiras  = (p.leiras || '').toString().trim();
    var alapok  = (p.alapok || '').toString().trim();
    var linkek  = (p.linkek || '').toString().trim();

    // --- 1) Belső értesítő e-mail a hello@bimline.hu címre ---
    var subject = 'Ajánlatkérés – ' + (ceg || nev || 'bimline.hu');

    var bodyLines = [
      'Új ajánlatkérés érkezett a bimline.hu weboldal kapcsolati űrlapján keresztül.',
      '',
      'Név: ' + (nev || '—'),
      'Cég: ' + (ceg || '—'),
      'E-mail: ' + (email || '—'),
      'Telefon: ' + (telefon || '—'),
      '',
      'Projekt leírása:',
      (leiras || '—'),
      '',
      'Rendelkezésre álló tervezési alapok: ' + (alapok || '—'),
      '',
      'Tervrajz-linkek / megjegyzés:',
      (linkek || '—'),
      '',
      '—',
      'Ez az üzenet automatikusan lett generálva a bimline.hu weboldal kapcsolati űrlapjából.'
    ];

    var mailOptions = {
      to: TARGET_EMAIL,
      subject: subject,
      body: bodyLines.join('\n')
    };

    // Válasz-címzettként a feladó e-mail címét állítjuk be — így egy
    // kattintással lehet válaszolni az érdeklődőnek.
    if (email.indexOf('@') > -1) {
      mailOptions.replyTo = email;
    }

    MailApp.sendEmail(mailOptions);

    // --- 2) Automatikus visszaigazolás a feladónak ---
    if (email.indexOf('@') > -1) {
      var confirmSubject = 'Köszönjük megkeresését – BIMLine Gépész Kft.';
      var confirmBodyLines = [
        'Kedves ' + (nev || 'Érdeklődő') + '!',
        '',
        'Köszönjük, hogy felvette velünk a kapcsolatot. Üzenetét megkaptuk,',
        'kollégáink hamarosan, jellemzően 1 munkanapon belül jelentkeznek.',
        '',
        'Az Ön által meg