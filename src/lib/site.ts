export const SITE = {
  name: 'BIMLine Gépész Kft.',
  url: 'https://www.bimline.hu',
  description: 'Teljes körű épületgépészeti (MEP) tervezés, BIM-koordináció, épületdiagnosztika és beruházási tanácsadás — Budapest.',
  email: 'hello@bimline.hu',
  telephone: '', // TODO: add public phone number when available
  address: {
    streetAddress: 'Ferenczy István utca 28.',
    addressLocality: 'Budapest',
    postalCode: '1053',
    addressCountry: 'HU',
  },
  geo: {
    latitude: 47.497879,
    longitude: 19.040238,
  },
  openingHours: ['Mo-Fr 08:00-17:00'],
  founder: 'BIMLine Gépész Kft.',
  serviceTypes: [
    'Épületgépészeti tervezés',
    'BIM-koordináció',
    'IFC modellezés',
    'Épületdiagnosztika',
    'Energetikai felülvizsgálat',
    'Beruházási tanácsadás',
  ],
  social: {
    // Még nincsenek élő profilok — ha elkészülnek, csak ide kell beírni az URL-t,
    // a footer és a JSON-LD (sameAs) automatikusan megjeleníti/felveszi őket.
    linkedin: 'https://www.linkedin.com/company/bimline-gepesz-kft/',
    facebook: '',
    youtube: 'https://www.youtube.com/playlist?list=PLWL33xA9KA-vay7ewIKoBI7CI6qYWlK_d',
    instagram: '',
  },
};

export function getSocialLinks() {
  return Object.entries(SITE.social)
    .filter(([, url]) => !!url)
    .map(([platform, url]) => ({ platform, url }));
}
