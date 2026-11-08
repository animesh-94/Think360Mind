export interface ServiceItem {
  id: string;
  name: string;
  line1: string;
  line2: string;
  iconName: string;
}

export const ROW_1_SERVICES: ServiceItem[] = [
  {
    id: 'branding-creative',
    name: 'Branding & Creative',
    line1: 'Branding &',
    line2: 'Creative',
    iconName: 'layers',
  },
  {
    id: 'website-ecommerce',
    name: 'Website & E-commerce',
    line1: 'Website &',
    line2: 'E-commerce',
    iconName: 'laptop',
  },
  {
    id: 'creative-production',
    name: 'Creative Production',
    line1: 'Creative',
    line2: 'Production',
    iconName: 'video',
  },
  {
    id: 'social-media',
    name: 'Social Media Marketing',
    line1: 'Social Media',
    line2: 'Marketing',
    iconName: 'share',
  },
  {
    id: 'influencer-marketing',
    name: 'Influencer Marketing',
    line1: 'Influencer',
    line2: 'Marketing',
    iconName: 'megaphone',
  },
];

export const ROW_2_SERVICES: ServiceItem[] = [
  {
    id: 'performance-marketing',
    name: 'Performance Marketing',
    line1: 'Performance',
    line2: 'Marketing',
    iconName: 'chart',
  },
  {
    id: 'seo',
    name: 'Search Engine Optimization',
    line1: 'Search Engine',
    line2: 'Optimization',
    iconName: 'search',
  },
  {
    id: 'ai-marketing',
    name: 'AI Marketing Solutions',
    line1: 'AI Marketing',
    line2: 'Solutions',
    iconName: 'cpu',
  },
  {
    id: 'email-crm',
    name: 'Email & CRM Marketing',
    line1: 'Email & CRM',
    line2: 'Marketing',
    iconName: 'mail',
  },
  {
    id: 'media-pr-outdoor',
    name: 'Media, PR & Outdoor',
    line1: 'Media, PR &',
    line2: 'Outdoor',
    iconName: 'radio',
  },
];

export const ALL_SERVICES: ServiceItem[] = [...ROW_1_SERVICES, ...ROW_2_SERVICES];

export interface ClientItem {
  name: string;
  logo: string;
  width: number;
  height: number;
}

export const CLIENTS: ClientItem[] = [
  { name: 'Arch Events', logo: '/assets/clients/arch-events.svg', width: 240, height: 96 },
  { name: 'ICFA', logo: '/assets/clients/icfa.svg', width: 240, height: 96 },
  { name: 'Swan Energy', logo: '/assets/clients/swan-energy.svg', width: 240, height: 96 },
  { name: 'HeartLink', logo: '/assets/clients/heartlink.svg', width: 240, height: 96 },
  { name: 'Urban Dancera', logo: '/assets/clients/urban-dancera.svg', width: 240, height: 96 },
  { name: 'Kidway Global', logo: '/assets/clients/kidway-global.svg', width: 240, height: 96 },
  { name: 'Bellurét', logo: '/assets/clients/belluret.svg', width: 240, height: 96 },
  { name: 'Kamat\'s Legacy', logo: '/assets/clients/kamats-legacy.svg', width: 240, height: 96 },
  { name: 'Kosi', logo: '/assets/clients/kosi.svg', width: 240, height: 96 },
  { name: 'KayImpex', logo: '/assets/clients/kayimpex.svg', width: 240, height: 96 },
];

