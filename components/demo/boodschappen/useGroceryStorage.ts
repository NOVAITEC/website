import { useState, useEffect, useCallback } from 'react';

// --- Types ---
export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  note: string;
  addedAt: number;
}

export interface GroceryList {
  id: string;
  name: string;
  createdAt: number;
}

export interface SavedRecipe {
  id: string;
  recipeId: string;
  savedAt: number;
}

export interface WeekMeal {
  recipeId: string;
  name: string;
}

export type WeekMenu = Record<string, WeekMeal[]>;

interface StorageData {
  lists: GroceryList[];
  activeListId: string;
  items: Record<string, GroceryItem[]>; // per list
  savedRecipes: string[]; // recipeId[]
  weekMenu: WeekMenu;
}

// --- Storage helpers ---
const STORAGE_KEY = 'boodschappen_demo';
const SESSION_KEY = 'boodschappen_session_id';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function storageKey() {
  return `${STORAGE_KEY}_${getSessionId()}`;
}

const DEFAULT_LIST: GroceryList = { id: 'default', name: 'Mijn Boodschappen', createdAt: Date.now() };

function loadData(): StorageData {
  if (typeof window === 'undefined')
    return { lists: [DEFAULT_LIST], activeListId: 'default', items: { default: [] }, savedRecipes: [], weekMenu: {} };
  try {
    const raw = localStorage.getItem(storageKey());
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { lists: [DEFAULT_LIST], activeListId: 'default', items: { default: [] }, savedRecipes: [], weekMenu: {} };
}

function saveData(data: StorageData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(storageKey(), JSON.stringify(data));
  } catch { /* storage full */ }
}

// --- Hook ---
export function useGroceryStorage() {
  const [data, setData] = useState<StorageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(loadData());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (data) saveData(data);
  }, [data]);

  // --- Helpers ---
  const update = useCallback((fn: (d: StorageData) => StorageData) => {
    setData((prev) => (prev ? fn(prev) : prev));
  }, []);

  const activeItems = data ? (data.items[data.activeListId] || []) : [];

  // --- List management ---
  const lists = data?.lists || [];
  const activeListId = data?.activeListId || 'default';

  const addList = useCallback((name: string) => {
    const id = `list_${Date.now()}`;
    update((d) => ({
      ...d,
      lists: [...d.lists, { id, name, createdAt: Date.now() }],
      items: { ...d.items, [id]: [] },
      activeListId: id,
    }));
  }, [update]);

  const switchList = useCallback((id: string) => {
    update((d) => ({ ...d, activeListId: id }));
  }, [update]);

  const removeList = useCallback((id: string) => {
    update((d) => {
      const newLists = d.lists.filter((l) => l.id !== id);
      if (newLists.length === 0) newLists.push(DEFAULT_LIST);
      const newItems = { ...d.items };
      delete newItems[id];
      return {
        ...d,
        lists: newLists,
        items: newItems,
        activeListId: d.activeListId === id ? newLists[0].id : d.activeListId,
      };
    });
  }, [update]);

  // --- Item CRUD ---
  const addItem = useCallback((name: string, category: string, quantity?: string, note?: string) => {
    const item: GroceryItem = {
      id: `i_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name,
      quantity: quantity || '',
      category,
      checked: false,
      note: note || '',
      addedAt: Date.now(),
    };
    update((d) => ({
      ...d,
      items: {
        ...d.items,
        [d.activeListId]: [...(d.items[d.activeListId] || []), item],
      },
    }));
  }, [update]);

  const addItems = useCallback((newItems: Array<{ name: string; category: string; quantity?: string; note?: string }>) => {
    update((d) => {
      const current = d.items[d.activeListId] || [];
      const toAdd = newItems.map((it) => ({
        id: `i_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: it.name,
        quantity: it.quantity || '',
        category: it.category,
        checked: false,
        note: it.note || '',
        addedAt: Date.now(),
      }));
      return { ...d, items: { ...d.items, [d.activeListId]: [...current, ...toAdd] } };
    });
  }, [update]);

  const removeItem = useCallback((id: string) => {
    update((d) => ({
      ...d,
      items: {
        ...d.items,
        [d.activeListId]: (d.items[d.activeListId] || []).filter((i) => i.id !== id),
      },
    }));
  }, [update]);

  const toggleItem = useCallback((id: string) => {
    update((d) => ({
      ...d,
      items: {
        ...d.items,
        [d.activeListId]: (d.items[d.activeListId] || []).map((i) =>
          i.id === id ? { ...i, checked: !i.checked } : i
        ),
      },
    }));
  }, [update]);

  const clearCheckedItems = useCallback(() => {
    update((d) => ({
      ...d,
      items: {
        ...d.items,
        [d.activeListId]: (d.items[d.activeListId] || []).filter((i) => !i.checked),
      },
    }));
  }, [update]);

  const clearAllItems = useCallback(() => {
    update((d) => ({
      ...d,
      items: { ...d.items, [d.activeListId]: [] },
    }));
  }, [update]);

  // --- Saved Recipes ---
  const savedRecipes = data?.savedRecipes || [];

  const toggleSavedRecipe = useCallback((recipeId: string) => {
    update((d) => {
      const has = d.savedRecipes.includes(recipeId);
      return {
        ...d,
        savedRecipes: has
          ? d.savedRecipes.filter((r) => r !== recipeId)
          : [...d.savedRecipes, recipeId],
      };
    });
  }, [update]);

  // --- Week Menu ---
  const weekMenu = data?.weekMenu || {};

  const addMeal = useCallback((day: string, meal: WeekMeal) => {
    update((d) => ({
      ...d,
      weekMenu: {
        ...d.weekMenu,
        [day]: [...(d.weekMenu[day] || []), meal],
      },
    }));
  }, [update]);

  const removeMeal = useCallback((day: string, index: number) => {
    update((d) => ({
      ...d,
      weekMenu: {
        ...d.weekMenu,
        [day]: (d.weekMenu[day] || []).filter((_, i) => i !== index),
      },
    }));
  }, [update]);

  return {
    loading,
    // Lists
    lists,
    activeListId,
    addList,
    switchList,
    removeList,
    // Items
    items: activeItems,
    addItem,
    addItems,
    removeItem,
    toggleItem,
    clearCheckedItems,
    clearAllItems,
    // Recipes
    savedRecipes,
    toggleSavedRecipe,
    // Week Menu
    weekMenu,
    addMeal,
    removeMeal,
  };
}
