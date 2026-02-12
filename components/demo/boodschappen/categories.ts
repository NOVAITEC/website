export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'groente-fruit', name: 'Groente & Fruit', emoji: '🥬', color: 'emerald' },
  { id: 'vlees-vis', name: 'Vlees & Vis', emoji: '🥩', color: 'red' },
  { id: 'brood-bakkerij', name: 'Brood & Bakkerij', emoji: '🍞', color: 'amber' },
  { id: 'zuivel', name: 'Zuivel & Eieren', emoji: '🥛', color: 'blue' },
  { id: 'diepvries', name: 'Diepvries', emoji: '🧊', color: 'cyan' },
  { id: 'dranken', name: 'Dranken', emoji: '🥤', color: 'purple' },
  { id: 'snacks', name: 'Snacks & Snoep', emoji: '🍫', color: 'pink' },
  { id: 'huishouden', name: 'Huishouden', emoji: '🧹', color: 'slate' },
  { id: 'persoonlijke-verzorging', name: 'Persoonlijke Verzorging', emoji: '🧴', color: 'indigo' },
  { id: 'baby', name: 'Baby & Kind', emoji: '🍼', color: 'rose' },
  { id: 'overig', name: 'Overig', emoji: '📦', color: 'gray' },
];

export function getCategoryById(id: string): Category {
  return CATEGORIES.find((cat) => cat.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
