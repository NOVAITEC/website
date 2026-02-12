"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Trash2, Check } from "lucide-react";
import { GroceryItem } from "./useGroceryStorage";

interface ItemCardProps {
  item: GroceryItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit?: (item: GroceryItem) => void;
}

export const ItemCard = memo(function ItemCard({ item, onToggle, onRemove, onEdit }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div
        onClick={() => onEdit?.(item)}
        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${onEdit ? "cursor-pointer" : ""} ${
          item.checked
            ? "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
            : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700"
        }`}
      >
        {/* Checkbox */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(item.id); }}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all active:scale-95 ${
            item.checked
              ? "bg-brand-600 border-brand-600"
              : "border-gray-300 dark:border-gray-600 hover:border-brand-500"
          }`}
        >
          {item.checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </button>

        {/* Item info */}
        <div className="flex-1 min-w-0">
          <span
            className={`text-sm font-medium block transition-all ${
              item.checked
                ? "text-gray-400 dark:text-gray-500 line-through"
                : "text-gray-800 dark:text-gray-100"
            }`}
          >
            {item.name}
          </span>
          {(item.quantity || item.note) && (
            <span className="text-xs text-gray-400 dark:text-gray-500 block truncate">
              {item.quantity && <span className="font-mono">{item.quantity}</span>}
              {item.quantity && item.note && " · "}
              {item.note}
            </span>
          )}
        </div>

        {/* Verwijder knop - altijd zichtbaar */}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
          className="flex-shrink-0 w-8 h-8 rounded-lg text-gray-300 dark:text-gray-600 hover:text-red-400 dark:hover:text-red-400 flex items-center justify-center transition-colors active:scale-95"
          aria-label={`Verwijder ${item.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
});
