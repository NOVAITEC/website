export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'groente-fruit', name: 'Groente & Fruit', emoji: '🥕', color: 'emerald' },
  { id: 'zuivel', name: 'Zuivel & Eieren', emoji: '🥛', color: 'blue' },
  { id: 'vlees-vis', name: 'Vlees & Vis', emoji: '🥩', color: 'red' },
  { id: 'brood-bakkerij', name: 'Brood & Bakkerij', emoji: '🍞', color: 'amber' },
  { id: 'dranken', name: 'Dranken', emoji: '🥤', color: 'purple' },
  { id: 'conserven-pasta', name: 'Conserven & Pasta', emoji: '🥫', color: 'orange' },
  { id: 'snacks', name: 'Snacks & Snoep', emoji: '🍿', color: 'pink' },
  { id: 'diepvries', name: 'Diepvries', emoji: '❄️', color: 'cyan' },
  { id: 'huishouden', name: 'Huishouden', emoji: '🧼', color: 'slate' },
  { id: 'verzorging', name: 'Verzorging', emoji: '🧴', color: 'indigo' },
  { id: 'overig', name: 'Overig', emoji: '📦', color: 'gray' },
];

export function getCategoryById(id: string): Category {
  return CATEGORIES.find((cat) => cat.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
