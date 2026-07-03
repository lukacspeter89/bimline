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

// --- English translations (Referenciák / References section) ---
export const projectsEn: Project[] = [
  { cat: 'ipar', title: 'Geothermal Heating System', loc: 'Székesfehérvár', metric: '2 MW', desc: 'Geothermal system designed with production-line technology integration.' },
  { cat: 'ipar', title: 'Pharmaceutical Manufacturing Plant', loc: 'Manufacturing Technology', metric: '3,000 m²', desc: 'Specialized air-handling network supporting production.' },
  { cat: 'ipar', title: 'Food Industry Complexes', loc: 'Multiple locations', metric: 'Full MEP scope', desc: 'Complete MEP systems for slaughterhouses and meat processing plants.' },
  { cat: 'ipar', title: 'Industrial Process Cooling', loc: 'Jásztelek', metric: '90 kW', desc: 'Industrial cooling system for existing injection molding machines.' },
  { cat: 'ipar', title: 'Production Hall', loc: 'Sormás', metric: '1,600 m²', desc: 'Complete MEP design for an industrial hall.' },
  { cat: 'ipar', title: 'Welding Shop Fume Extraction', loc: 'Kecskemét', metric: '1,000 m²', desc: 'Design of industrial ventilation and fume extraction.' },
  { cat: 'ipar', title: 'Industrial Climate Chambers', loc: 'Process Technology', metric: 'Condenser cooling', desc: 'Design of condenser cooling systems for climate chambers.' },
  { cat: 'ipar', title: 'Fume Hood MEP Systems', loc: 'Lab Technology', metric: 'Specialized extraction', desc: 'Specialized extraction and supporting MEP systems.' },
  { cat: 'strategiai', title: 'Military Server Room', loc: 'Defense Forces Data Center', metric: '270 kW', desc: 'Server room infrastructure with redundant cooling capacity.' },
  { cat: 'strategiai', title: 'Military Barracks', loc: 'Székesfehérvár', metric: '200 kW', desc: 'Server cooling with precision air conditioning units.' },
  { cat: 'strategiai', title: 'Military Office Complex', loc: 'Hybrid system', metric: '3,600 m²', desc: 'Boiler + heat pump heating/cooling and server room MEP.' },
  { cat: 'strategiai', title: 'Hospital Operating Block', loc: 'Székesfehérvár', metric: '1,500 m²', desc: 'Fit-out of sterile operating rooms in an existing building.' },
  { cat: 'strategiai', title: 'Hospital Staff Residence', loc: 'Kaposvár', metric: '72 units', desc: 'Fit-out of an accommodation complex in an existing building.' },
  { cat: 'strategiai', title: 'Military Server Rooms', loc: 'Multiple locations', metric: 'Redundant cooling', desc: 'Specialized security and redundant cooling systems.' },
  { cat: 'kozulet', title: 'Retail Center', loc: 'Törökbálint', metric: '15,000 m²', desc: 'Full energy audit and investment ROI recommendations.' },
  { cat: 'kozulet', title: 'Regional University', loc: '6 buildings', metric: 'Heating upgrade', desc: 'Comprehensive heating modernization design for university buildings.' },
  { cat: 'kozulet', title: 'University Campus Renovation', loc: 'Budapest', metric: '10,000 m²', desc: 'MEP systems for the reconstruction of higher-education buildings.' },
  { cat: 'kozulet', title: 'Premium Hotel', loc: 'Budapest, District V', metric: '60 rooms', desc: 'Complete MEP design for a hotel.' },
  { cat: 'kozulet', title: 'Gastronomy Complex', loc: 'Budapest, District V', metric: 'Commercial kitchen', desc: 'Air handling and MEP systems for a downtown restaurant’s commercial kitchen.' },
  { cat: 'kozulet', title: 'Industrial Catering Kitchen & Plant', loc: 'Aszófő', metric: '1,500 m²', desc: 'Process kitchen served by heat pump heating and cooling.' },
  { cat: 'kozulet', title: 'Primary School', loc: 'Üröm', metric: '1,600 m²', desc: 'Complete MEP system for an educational institution.' },
  { cat: 'kozulet', title: 'Hydroelectric Plant', loc: 'Gibárt', metric: 'Turbine cooling', desc: 'Specialized process cooling system for the water turbines.' },
  { cat: 'kozulet', title: 'Regional Bank Center', loc: 'Branch network', metric: 'Redesign', desc: 'MEP redesign of the central bank branch building.' },
  { cat: 'kozulet', title: 'Office Building Modernization', loc: 'Budapest', metric: 'Renewable energy', desc: 'Retrofit of an existing office building with renewable energy utilization.' },
  { cat: 'kozulet', title: 'Futsal Sports Halls', loc: 'Multiple locations', metric: 'Redesign', desc: 'On-site adaptation of hall MEP systems.' },
  { cat: 'kozulet', title: 'Recreation Center', loc: 'Kisköre', metric: 'Rafting course', desc: 'MEP design for the supporting building complex.' },
  { cat: 'lako', title: 'Hévíz Premium Apartment Building', loc: 'Hévíz', metric: '73 units', desc: 'Including a wellness area, fully designed at BIM LOD 300.' },
  { cat: 'lako', title: 'Apartment Building', loc: 'Alsóörs', metric: '38 units', desc: 'MEP design for an energy-efficient apartment building.' },
  { cat: 'lako', title: 'Apartment Building', loc: 'Lábatlan', metric: '33 units', desc: 'Environmentally conscious hybrid boiler + heat pump system.' },
  { cat: 'lako', title: 'Budapest Apartment Building', loc: 'Budapest', metric: '18 units', desc: 'Complete MEP design for a modern apartment building.' },
];

export const categoryMetaEn: Record<ProjectCategory, { label: string; color: string }> = {
  ipar: { label: 'Industrial', color: 'text-accent' },
  strategiai: { label: 'Strategic', color: 'text-belimo' },
  kozulet: { label: 'Commercial & Public', color: 'text-accent' },
  lako: { label: 'Residential', color: 'text-belimo' },
};
