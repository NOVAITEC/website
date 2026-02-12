import { useState, useEffect } from 'react';

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  addedAt: number;
}

const STORAGE_KEY = 'boodschappen_demo';
const SESSION_KEY = 'boodschappen_session_id';

// Genereer of haal sessie-ID op
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

// Haal data op voor huidige sessie
function getStorageData(): GroceryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const sessionId = getSessionId();
    const key = `${STORAGE_KEY}_${sessionId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading grocery data:', error);
    return [];
  }
}

// Sla data op voor huidige sessie
function setStorageData(items: GroceryItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    const sessionId = getSessionId();
    const key = `${STORAGE_KEY}_${sessionId}`;
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving grocery data:', error);
  }
}

export function useGroceryStorage() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Laad data bij mount
  useEffect(() => {
    const data = getStorageData();
    setItems(data);
    setLoading(false);
  }, []);

  // Sla data op bij elke wijziging
  useEffect(() => {
    if (!loading) {
      setStorageData(items);
    }
  }, [items, loading]);

  const addItem = (name: string, category: string) => {
    const newItem: GroceryItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      category,
      checked: false,
      addedAt: Date.now(),
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const clearCheckedItems = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };

  const clearAllItems = () => {
    setItems([]);
  };

  return {
    items,
    loading,
    addItem,
    removeItem,
    toggleItem,
    clearCheckedItems,
    clearAllItems,
  };
}
