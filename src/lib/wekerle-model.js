// Wekerle Plusz felújítási kalkulátor — egyszerűsített épületenergetikai modell.
//
// A modell a BIMLine által 2024–2025-ben az RRF-REP-10.13.1-24 / KEHOP Plusz
// lakossági programban általunk készített 137 családi ház energetikai tanúsítására van
// kalibrálva (kiinduló összesített energetikai jellemző: medián eltérés −3 %,
// a házak 80 %-ánál ±1 energetikai osztályon belül; a tervezett felújítások
// megtakarítási arányára medián eltérés −3 %-pont, interkvartilis ±10 %-pont).
// A besorolási skála a 9/2023. (V. 25.) ÉKM rendelet szerinti (76 kWh/m²a = A).
// A primerenergia-tényezők a tanúsítványokból visszafejtett értékek.
//
// Ez tájékoztató becslés, nem tanúsítvány.

export const CLASS_SCALE = [
  [0, 'A+++'], [38, 'A++'], [68.4, 'A+'], [76, 'A'], [98.8, 'B'], [121.6, 'C'],
  [152, 'D'], [190, 'E'], [228, 'F'], [296.4, 'G'], [380, 'H'],
];
export const CLASSES = ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

export function classOf(ep) {
  for (const [t, c] of CLASS_SCALE) if (ep <= t) return c;
  return 'I';
}

const EL = 2.3, GAS = 1.0, WOOD = 0.6;

// Falazat hőátbocsátási tényezője szigetelés nélkül [W/m²K]
const WALL_U = {
  valyog: 1.0, tegla_regi: 1.35, b30: 1.25, gazszilikat: 0.75, porotherm: 0.75, vegyes: 1.6,
};
// Ha a falazatot nem tudja: építési év szerinti alapérték
const WALL_BY_YEAR = { y1945: 1.3, y1969: 1.35, y1989: 1.25, y2006: 0.9, y2007: 0.6 };

// Fűtés: [hatásfok vagy SCOP a teljes rendszerre, primerenergia-tényező, segédenergia kWh/m²a (villany)]
const HEAT = {
  gaz_regi: [0.68, GAS, 2.0],
  gaz_kond: [0.80, GAS, 2.0],
  konvektor: [0.68, GAS, 0],
  vegyes: [0.52, WOOD, 2.0],
  kalyha: [0.48, WOOD, 0],
  villany: [0.97, EL, 0],
  klima: [2.6, EL, 0],
  hoszivattyu: [2.6, EL, 1.5],
  // felújítás utáni állapotok
  hoszivattyu_uj: [2.7, EL, 1.5],
  klima_uj: [2.7, EL, 0],          // hatékony (A+++ fűtési szezonális) split klímák, fő fűtésként
};
// Termosztatikus radiátorszelep + időjárásfüggő szabályozás + beszabályozás:
// a vízfűtéses rendszer szabályozási/elosztási hatásfokát javítja.
const SZABALYOZAS_GAIN = 1.07;
// Melegvíz: [hatásfok vagy SCOP, primerenergia-tényező]; nettó igény 30 kWh/m²a
const HMV = {
  gaz: [0.75, GAS], villany: [0.88, EL], fa: [0.55, WOOD], hoszivattyu: [2.4, EL], gaz_kond: [0.85, GAS],
};

function insU(u0, d, lambda = 0.037) {
  return d > 0 ? 1 / (1 / u0 + d / lambda) : u0;
}

/** Bemeneti válaszok → modellparaméterek */
export function houseFromAnswers(a) {
  const A = Math.min(Math.max(Number(a.area) || 100, 30), 600);
  const storeys = a.storeys === 'emeletes' ? 2 : a.storeys === 'tetoter' ? 1.6 : 1;
  const year = a.year || 'y1989';
  const old = year === 'y1945' || year === 'y1969' || year === 'y1989';

  const wallU0 = a.wall && a.wall !== 'nemtudom' ? WALL_U[a.wall] : WALL_BY_YEAR[year];
  const wallIns = { nincs: 0, vekony: 0.06, vastag: 0.12 }[a.wallIns] ?? (year === 'y2007' ? 0.10 : 0);
  const atticIns = { nincs: 0, vekony: 0.08, vastag: 0.20 }[a.atticIns] ?? (old ? 0.05 : 0.12);
  const win = a.windows && a.windows !== 'nemtudom' ? a.windows : (old ? 'ketretegu' : 'ketretegu');
  const heat = a.heating || 'gaz_regi';
  let hmv = a.hmv || 'gaz';
  if (hmv === 'futessel') {
    hmv = heat === 'hoszivattyu' ? 'hoszivattyu' : heat === 'vegyes' || heat === 'kalyha' ? 'fa'
      : heat === 'villany' || heat === 'klima' ? 'villany' : heat === 'gaz_kond' ? 'gaz_kond' : 'gaz';
  }
  return {
    A, storeys, wallU0, wallIns, atticIns,
    floorIns: year === 'y2006' || year === 'y2007',
    win, heat, hmv, roofType: a.storeys === 'tetoter' ? 'tetosik' : 'padlas',
  };
}

function geometry(h) {
  const Af = h.A / h.storeys;
  const P = 4.4 * Math.sqrt(Af);
  const Awin = 0.18 * h.A;
  const Awall = Math.max(P * 2.9 * h.storeys - Awin, 0.5 * h.A);
  return { Af, Awin, Awall };
}

/** Összesített energetikai jellemző [kWh/m²a] */
export function energy(h) {
  const { Af, Awin, Awall } = geometry(h);
  const Uw = insU(h.wallU0, h.wallIns);
  const Ua = insU(1.25, h.atticIns, 0.04);
  const Uf = h.floorIns ? 0.30 : 0.60;
  const Uwin = { regi_fa: 2.6, ketretegu: 1.7, haromretegu: 1.0 }[h.win];
  const HT = 1.22 * (Uw * Awall + Ua * Af + Uf * Af) + Uwin * Awin;
  const ach = 0.5 + (h.win === 'regi_fa' ? 0.3 : 0);
  const HV = 0.335 * ach * h.A * 2.7;
  const loss = 72 * (HT + HV);
  const gains = 0.85 * (5 * 4.4 * h.A + 0.5 * 0.6 * 250 * Awin);
  const q = Math.max(loss - gains, 0) / h.A;
  let [eff, f, aux] = HEAT[h.heat];
  if (h.szab) eff *= SZABALYOZAS_GAIN;
  const [he, hf] = HMV[h.hmv];
  return q / eff * f + aux * EL + 30 / he * hf;
}

// ---------------- Intézkedések ----------------
// Bruttó, 2026-os piaci nagyságrend; a 2024-es lakossági program elszámolható
// fajlagos maximumait (pl. homlokzat 15 cm EPS 52 634 Ft/m², padlásfödém
// 24 809 Ft/m², műanyag ablak 210 172 Ft/m²) nem lépik túl.
export const PRICES = {
  homlokzat: 48000,      // Ft / m² homlokzat (15 cm, lábazattal, kávával)
  padlas: 21000,         // Ft / m² padlásfödém (25–30 cm)
  tetosik: 46000,        // Ft / m² tetősík belső oldali szigetelés + burkolat
  ablak: 175000,         // Ft / m² háromrétegű műanyag nyílászáró, beépítve
  hoszivattyu_alap: 2900000, hoszivattyu_m2: 16000, // levegő-víz hőszivattyú fűtés + melegvíz
  klima_alap: 400000, klima_egyseg: 480000, // split klímák: alap + beltéri egységenként (kb. 30 m²-enként egy)
  szab_alap: 250000, szab_m2: 2000,          // termosztatikus szelepek, időjárásfüggő szabályozás, beszabályozás
  hmv_hsz: 800000,       // hőszivattyús melegvíztároló
};

export const MEASURES = [
  { id: 'homlokzat', label: 'Homlokzati hőszigetelés (15 cm)', short: 'Homlokzatszigetelés' },
  { id: 'padlas', label: 'Padlásfödém / tető hőszigetelése', short: 'Padlás-/tetőszigetelés' },
  { id: 'ablak', label: 'Nyílászárócsere (háromrétegű üvegezés)', short: 'Nyílászárócsere' },
  { id: 'hoszivattyu', label: 'Levegő-víz hőszivattyú fűtésre és melegvízre', short: 'Hőszivattyú' },
  { id: 'klima', label: 'Hatékony split klímák fűtésre', short: 'Split klíma', note: 'Ott jó megoldás, ahol nincs radiátoros vízfűtés (konvektor, kályha, villanyfűtés).' },
  { id: 'szabalyozas', label: 'Termosztatikus radiátorszelepek és szabályozás', short: 'Szabályozás' },
  { id: 'hmv', label: 'Hőszivattyús melegvíztároló', short: 'Hőszivattyús melegvíz' },
];

/** Mely intézkedéseknek van értelme ennél a háznál */
export function applicable(h) {
  const out = [];
  if (h.wallIns < 0.10) out.push('homlokzat');
  if (h.atticIns < 0.15) out.push('padlas');
  if (h.win !== 'haromretegu') out.push('ablak');
  if (h.heat !== 'hoszivattyu') out.push('hoszivattyu');
  if (['konvektor', 'kalyha', 'villany'].includes(h.heat)) out.push('klima');   // csak vízfűtés nélküli házban
  if (['gaz_regi', 'gaz_kond', 'vegyes'].includes(h.heat)) out.push('szabalyozas');
  if (h.hmv !== 'hoszivattyu') out.push('hmv');
  return out;
}

export function applyMeasures(h, set) {
  const n = { ...h };
  // 15 cm grafitos EPS (λ≈0,031) — a modell λ=0,037-tel számol, ezért egyenértékű vastagság
  if (set.has('homlokzat')) n.wallIns = h.wallIns < 0.08 ? h.wallIns + 0.18 : h.wallIns + 0.12;
  if (set.has('padlas')) n.atticIns = Math.max(h.atticIns, 0.25);
  if (set.has('ablak')) n.win = 'haromretegu';
  if (set.has('hoszivattyu')) { n.heat = 'hoszivattyu_uj'; n.hmv = 'hoszivattyu'; }
  else if (set.has('klima')) n.heat = 'klima_uj';
  if (set.has('szabalyozas') && !set.has('hoszivattyu') && !set.has('klima')) n.szab = true;
  if (set.has('hmv') && !set.has('hoszivattyu')) n.hmv = 'hoszivattyu';
  return n;
}

export function cost(h, set) {
  const { Af, Awin, Awall } = geometry(h);
  let c = 0;
  const items = {};
  if (set.has('homlokzat')) items.homlokzat = Awall * 1.08 * PRICES.homlokzat;
  if (set.has('padlas')) items.padlas = h.roofType === 'tetosik' ? Af * 1.25 * PRICES.tetosik : Af * PRICES.padlas;
  if (set.has('ablak')) items.ablak = Awin * PRICES.ablak;
  if (set.has('hoszivattyu')) items.hoszivattyu = Math.max(PRICES.hoszivattyu_alap + PRICES.hoszivattyu_m2 * h.A, 3800000);
  else if (set.has('klima')) items.klima = PRICES.klima_alap + PRICES.klima_egyseg * Math.max(2, Math.ceil(h.A / 30));
  if (set.has('szabalyozas') && !set.has('hoszivattyu') && !set.has('klima')) items.szabalyozas = PRICES.szab_alap + PRICES.szab_m2 * h.A;
  if (set.has('hmv') && !set.has('hoszivattyu')) items.hmv = PRICES.hmv_hsz;
  for (const v of Object.values(items)) c += v;
  return { total: c, items };
}

export const UNCERTAINTY_PP = 0.07;   // ± százalékpont a megtakarítási arányon
export const EP_UNCERTAINTY = 0.18;   // ± a kiinduló értéken

function subsets(arr) {
  const out = [[]];
  for (const x of arr) {
    const len = out.length;
    for (let i = 0; i < len; i++) out.push([...out[i], x]);
  }
  return out;
}

export function evaluate(h, set) {
  const ep0 = energy(h);
  const h2 = applyMeasures(h, set);
  const ep1 = energy(h2);
  const saving = ep0 > 0 ? 1 - ep1 / ep0 : 0;
  const c = cost(h, set);
  return { set: [...set], ep0, ep1, saving, cls0: classOf(ep0), cls1: classOf(ep1), cost: c.total, items: c.items };
}

// Egymást kizáró párok: a hőszivattyú tartalmazza a melegvizet és a szabályozást; klíma és hőszivattyú nem együtt.
export const EXCLUSIVE = { hoszivattyu: ['klima', 'hmv', 'szabalyozas'], klima: ['hoszivattyu', 'szabalyozas'], hmv: ['hoszivattyu'], szabalyozas: ['hoszivattyu', 'klima'] };
function consistent(s) { return !s.some((m) => (EXCLUSIVE[m] || []).some((x) => s.includes(x))); }

/** Az összes értelmes kombináció kiértékelése */
export function allPackages(h) {
  return subsets(applicable(h)).filter((s) => s.length && consistent(s)).map((s) => evaluate(h, new Set(s)));
}

/** A kijelzett javaslatok: minimum, ajánlott, teljes */
export function suggestions(h) {
  const all = allPackages(h);
  const safe = all.filter((p) => p.saving - UNCERTAINTY_PP >= 0.30).sort((a, b) => a.cost - b.cost);
  const key = (p) => p.set.slice().sort().join('+');
  const out = [];
  const minimum = safe[0];
  if (minimum) out.push({ kind: 'minimum', ...minimum });
  const rec = safe.filter((p) => p.saving >= 0.5 && (!minimum || key(p) !== key(minimum))).sort((a, b) => a.cost - b.cost)[0];
  if (rec && (!minimum || rec.saving > minimum.saving + 0.05)) out.push({ kind: 'ajanlott', ...rec });
  const app = applicable(h);
  // teljes felújítás: burok + hőszivattyú (ha van értelme), különben a többi gépészeti elem
  const fullSet = app.includes('hoszivattyu') ? app.filter((m) => !(EXCLUSIVE.hoszivattyu.includes(m))) : app.filter((m) => m !== 'klima' || !app.includes('szabalyozas'));
  if (fullSet.length) {
    const full = evaluate(h, new Set(fullSet));
    if (!out.some((p) => key(p) === key(full))) out.push({ kind: 'teljes', ...full });
  }
  return out;
}

/** Egyes intézkedések önálló hatása */
export function singleEffects(h) {
  return applicable(h).map((m) => evaluate(h, new Set([m]))).sort((a, b) => b.saving - a.saving);
}

/**
 * Finanszírozás családi háznál a 2026. 10. 27-i kormányzati bejelentés szerint:
 * hitel legfeljebb 15 M Ft, fix 3 %, legfeljebb 15 év; önerő a hitelösszeg 5 %-a, legfeljebb 500 e Ft;
 * vissza nem térítendő rész a HITELÖSSZEG 30 %-a D–G, 50 %-a H–I besorolásnál, A–C besorolásnál nincs.
 * A támogatást a záró tanúsítvány után a hiteltartozásból írják jóvá.
 */
export function supportRate(cls) {
  if (['H', 'I'].includes(cls)) return 0.5;
  if (['D', 'E', 'F', 'G'].includes(cls)) return 0.3;
  return 0;
}
export function financing(costFt, cls) {
  let hitel = costFt <= 10500000 ? costFt / 1.05 : Math.min(15000000, costFt - 500000);
  const onero = costFt - hitel;              // a 15,5 M Ft feletti rész is önerő
  const rate = supportRate(cls);
  return { hitel, onero, rate, support: hitel * rate, sajatAtTotal: onero };
}
