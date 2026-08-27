/** Ordered scene map used by the scroll-progress rail and in-page anchors. */
export type SectionMeta = {
  id: string;
  index: string;
  label: string;
};

export const SECTIONS: SectionMeta[] = [
  { id: 'hero', index: '01', label: 'Hero' },
  { id: 'capsule', index: '02', label: 'Capsule' },
  { id: 'ingredients', index: '03', label: 'Ingredients' },
  { id: 'human', index: '04', label: 'To Human' },
  { id: 'therapeutic', index: '05', label: 'Therapeutic' },
  { id: 'products', index: '06', label: 'Capabilities' },
  { id: 'quality', index: '07', label: 'Quality' },
  { id: 'rnd', index: '08', label: 'R&D' },
  { id: 'global', index: '09', label: 'Global' },
  { id: 'manufacturing', index: '10', label: 'Manufacturing' },
  { id: 'delivery', index: '11', label: 'Delivery' },
  { id: 'why', index: '12', label: 'Why ASLE' },
];

export const NAV_LINKS = [
  { href: '#capsule', label: 'About Us' },
  { href: '#products', label: 'Capabilities' },
  { href: '#therapeutic', label: 'Therapeutic Areas' },
  { href: '#rnd', label: 'R&D' },
  { href: '#quality', label: 'Quality' },
  { href: '#why', label: 'Why ASLE' },
];
