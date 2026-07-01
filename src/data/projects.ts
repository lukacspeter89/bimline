export type ProjectCategory = 'ipar' | 'strategiai' | 'kozulet' | 'lako';

export interface Project {
  cat: ProjectCategory;
  title: string;
  loc: string;
  metric: string;
  desc: string;
}

export const projects: Project[] = [
  { cat: 'ipar', title: 'Geotermikus fűtési rendszer', loc: 'Székesfehérvár', metric: '2 MW', desc: 'Gyártósori technológiai integrációval tervezett geotermikus rendszer.' },
  { cat: 'ipar', title: 'Gyógyszeripari gyártóüzem', loc: 'Gyártástechnológia', metric: '3 000 m²', desc: 'Gyártást kiszolgáló speciális légtechnikai hálózat.' },
  { cat: 'ipar', title: 'Élelmiszeripari komplexumok', loc: 'Több helyszín', metric: 'Komplex MEP', desc: 'Vágóhidak és húsfeldolgozó üzemek teljes épületgépészete.' },
  { cat: 'ipar', title: 'Ipari technológiai hűtés', loc: 'Jásztelek', metric: '90 kW', desc: 'Meglévő fröccsöntő gépek ipari hűtési rendszere.' },
  { cat: 'ipar', title: 'Gyártócsarnok', loc: 'Sormás', metric: '1 600 m²', desc: 'Komplett MEP-tervezés ipari csarnokhoz.' },
  { cat: 'ipar', title: 'Hegesztőüzem füstmentesítése', loc: 'Kecskemét', metric: '1 000 m²', desc: 'Ipari szellőztetés és füstelszívás tervezése.' },
  { cat: 'ipar', title: 'Ipari klímakamrák', loc: 'Technológia', metric: 'Kondenzátor-hűtés', desc: 'Kondenzátor hűtési rendszerek tervezése klímakamrákhoz.' },
  { cat: 'ipar', title: 'Vegyi fülkék gépészete', loc: 'Labortechnológia', metric: 'Speciális elszívás', desc: 'Speciális elszívó- és kiszolgáló gépészeti rendszerek.' },
  { cat: 'strategiai', title: 'Katonai szerverterem', loc: 'Honvédségi adatközpont', metric: '270 kW', desc: 'Redundáns hűtőteljesítményű szerverterem-infrastruktúra.' },
  { cat: 'strategiai', title: 'Honvédségi laktanya', loc: 'Székesfehérvár', metric: '200 kW', desc: 'Szerverhűtés precíziós klímaszekrényekkel.' },
  { cat: 'strategiai', title: 'Honvédségi irodakomplexum', loc: 'Vegyes rendszer', metric: '3 600 m²', desc: 'Kazán + hőszivattyús fűtés-hűtés és szerverterem-gépészet.' },
  { cat: 'strategiai', title: 'Kórházi műtőblokk', loc: 'Székesfehérvár', metric: '1 500 m²', desc: 'Steril műtők kialakítása meglévő épületben.' },
  { cat: 'strategiai', title: 'Kórházi nővérszálló', loc: 'Kaposvár', metric: '72 lakás', desc: 'Szálláskomplexum kialakítása meglévő épületben.' },
  { cat: 'strategiai', title: 'Honvédségi szervertermek', loc: 'Több helyszín', metric: 'Redundáns hűtés', desc: 'Speciális biztonsági és redundáns hűtési rendszerek.' },
  { cat: 'kozulet', title: 'Kereskedelmi Centrum', loc: 'Törökbálint', metric: '15 000 m²', desc: 'Teljes energetikai felülvizsgálat és beruházási ROI-javaslatok.' },
  { cat: 'kozulet', title: 'Vidéki tudományegyetem', loc: '6 épület', metric: 'Fűtéskorszerűsítés', desc: 'Komplex fűtéskorszerűsítési tervezés egyetemi épületekhez.' },
  { cat: 'kozulet', title: 'Egyetemi kampusz felújítás', loc: 'Budapest', metric: '10 000 m²', desc: 'Felsőoktatási épületek rekonstrukciós gépészete.' },
  { cat: 'kozulet', title: 'Prémium Hotel', loc: 'Budapest, V. ker.', metric: '60 szoba', desc: 'Szálloda teljes épületgépészeti tervezése.' },
  { cat: 'kozulet', title: 'Gasztronómiai komplexum', loc: 'Budapest, V. ker.', metric: 'Nagykonyha', desc: 'Belvárosi étterem nagykonyhai légtechnikája és gépészete.' },
  { cat: 'kozulet', title: 'Ipari főzőkonyha és üzem', loc: 'Aszófő', metric: '1 500 m²', desc: 'Hőszivattyús fűtés-hűtéssel ellátott technológiai konyha.' },
  { cat: 'kozulet', title: 'Általános Iskola', loc: 'Üröm', metric: '1 600 m²', desc: 'Oktatási intézmény komplett gépészeti rendszere.' },
  { cat: 'kozulet', title: 'Vízierőmű', loc: 'Gibárt', metric: 'Turbinahűtés', desc: 'Speciális technológiai hűtési rendszer a vízturbinákhoz.' },
  { cat: 'kozulet', title: 'Regionális bankközpont', loc: 'Bankfiók-hálózat', metric: 'Áttervezés', desc: 'Bankfiók központi épületének gépészeti áttervezése.' },
  { cat: 'kozulet', title: 'Irodaház-modernizáció', loc: 'Budapest', metric: 'Megújuló energia', desc: 'Meglévő irodaház átalakítása megújuló energiahasznosítással.' },
  { cat: 'kozulet', title: 'Futsal sportcsarnokok', loc: 'Több helyszín', metric: 'Áttervezés', desc: 'Csarnok gépészeti rendszereinek helyszíni adaptációja.' },
  { cat: 'kozulet', title: 'Szabadidős központ', loc: 'Kisköre', metric: 'Raftingpálya', desc: 'Kiszolgáló épületegyüttes gépészeti tervezése.' },
  { cat: 'lako', title: 'Hévíz Prémium Társasház', loc: 'Hévíz', metric: '73 lakás', desc: 'Wellness részleggel, teljes körűen BIM LOD 300 szinten.' },
  { cat: 'lako', title: 'Társasház', loc: 'Alsóörs', metric: '38 lakás', desc: 'Energiatakarékos társasház gépészeti tervezése.' },
  { cat: 'lako', title: 'Társasház', loc: 'Lábatlan', metric: '33 lakás', desc: 'Kazán + hőszivattyú vegyes üzemű, környezettudatos rendszer.' },
  { cat: 'lako', title: 'Budapesti társasház', loc: 'Budapest', metric: '18 lakás', desc: 'Modern társasház teljes MEP-tervezése.' },
];

export const categoryMeta: Record<ProjectCategory, { label: string; color: string }> = {
  ipar: { label: 'Ipar', color: 'text-accent' },
  strategiai: { label: 'Stratégiai', color: 'text-belimo' },
  kozulet: { label: 'Középület', color: 'text-accent' },
  lako: { label: 'Lakó', color: 'text-belimo' },
};
