"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { GroceryItem } from "./useGroceryStorage";
import { CATEGORIES, getCategoryById } from "./categories";
import { CategoryGroup } from "./CategoryGroup";

interface GroceryListProps {
  items: GroceryItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit?: (item: GroceryItem) => void;
}

export function GroceryList({ items, onToggle, onRemove, onEdit }: GroceryListProps) {
  // Groepeer items per categorie
  const groupedItems = useMemo(() => {
    const groups = new Map<string, GroceryItem[]>();

    // Initialiseer alle categorieën
    CATEGORIES.forEach((category) => {
      groups.set(category.id, []);
    });

    // Voeg items toe aan hun categorie
    items.forEach((item) => {
      const categoryItems = groups.get(item.category) || [];
      categoryItems.push(item);
      groups.set(item.category, categoryItems);
    });

    // Filter lege categorieën en sorteer items (niet afgevinkt eerst)
    const result: Array<{ category: typeof CATEGORIES[0]; items: GroceryItem[] }> = [];
    groups.forEach((categoryItems, categoryId) => {
      if (categoryItems.length > 0) {
        const sortedItems = [...categoryItems].sort((a, b) => {
          if (a.checked === b.checked) return 0;
          return a.checked ? 1 : -1;
        });
        result.push({
          category: getCategoryById(categoryId),
          items: sortedItems,
        });
      }
    });

    return result;
  }, [items]);

  // Lege staat
  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <ShoppingBag className="w-10 h-10 text-gray-400 dark:text-gray-600" />
        </motion.div>
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-1">
          Je boodschappenlijst is leeg
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 max-w-[240px] mx-auto">
          Voeg producten toe door op de + knop te klikken
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groupedItems.map((group) => (
        <CategoryGroup
          key={group.category.id}
          category={group.category}
          items={group.items}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
