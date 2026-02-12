"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Trash2, Check } from "lucide-react";
import { GroceryItem } from "./useGroceryStorage";

interface ItemCardProps {
  item: GroceryItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export const ItemCard = memo(function ItemCard({ item, onToggle, onRemove }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <div
        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
          item.checked
            ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
            : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700"
        }`}
      >
        {/* Checkbox */}
        <button
          onClick={() => onToggle(item.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all active:scale-95 ${
            item.checked
              ? "bg-brand-600 border-brand-600"
              : "border-gray-300 dark:border-gray-600 hover:border-brand-500 dark:hover:border-brand-500"
          }`}
        >
          {item.checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </button>

        {/* Item naam */}
        <span
          className={`flex-1 text-sm font-medium transition-all ${
            item.checked
              ? "text-gray-400 dark:text-gray-500 line-through"
              : "text-gray-800 dark:text-gray-100"
          }`}
        >
          {item.name}
        </span>

        {/* Verwijder knop */}
        <button
          onClick={() => onRemove(item.id)}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors active:scale-95 opacity-0 group-hover:opacity-100 sm:opacity-100"
          aria-label={`Verwijder ${item.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
});
