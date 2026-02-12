"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GroceryItem } from "./useGroceryStorage";
import { Category } from "./categories";
import { ItemCard } from "./ItemCard";

interface CategoryGroupProps {
  category: Category;
  items: GroceryItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit?: (item: GroceryItem) => void;
}

export const CategoryGroup = memo(function CategoryGroup({
  category,
  items,
  onToggle,
  onRemove,
  onEdit,
}: CategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const checkedCount = items.filter((item) => item.checked).length;

  return (
    <div className="space-y-2">
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900 transition-colors active:scale-[0.99]"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{category.emoji}</span>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
            {category.name}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            {checkedCount}/{items.length}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </motion.div>
      </button>

      {/* Items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 overflow-hidden"
          >
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggle={onToggle}
                onRemove={onRemove}
                onEdit={onEdit}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
