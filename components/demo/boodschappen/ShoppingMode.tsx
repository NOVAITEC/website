"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Check, PartyPopper } from "lucide-react";
import { GroceryItem } from "./useGroceryStorage";
import { CATEGORIES, getCategoryById } from "./categories";

interface ShoppingModeProps {
  items: GroceryItem[];
  onToggle: (id: string) => void;
  onClose: () => void;
}

export function ShoppingMode({ items, onToggle, onClose }: ShoppingModeProps) {
  const uncheckedItems = items.filter((i) => !i.checked);
  const checkedCount = items.filter((i) => i.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;
  const isComplete = totalCount > 0 && checkedCount === totalCount;

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups = new Map<string, GroceryItem[]>();
    items.forEach((item) => {
      const list = groups.get(item.category) || [];
      list.push(item);
      groups.set(item.category, list);
    });

    const result: Array<{
      category: (typeof CATEGORIES)[0];
      items: GroceryItem[];
      checkedCount: number;
    }> = [];

    groups.forEach((categoryItems, categoryId) => {
      const sorted = [...categoryItems].sort((a, b) => {
        if (a.checked === b.checked) return 0;
        return a.checked ? 1 : -1;
      });
      result.push({
        category: getCategoryById(categoryId),
        items: sorted,
        checkedCount: categoryItems.filter((i) => i.checked).length,
      });
    });

    // Sort: incomplete categories first
    result.sort((a, b) => {
      const aComplete = a.checkedCount === a.items.length;
      const bComplete = b.checkedCount === b.items.length;
      if (aComplete === bComplete) return 0;
      return aComplete ? 1 : -1;
    });

    return result;
  }, [items]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white dark:bg-gray-950 flex flex-col"
    >
      {/* Header */}
      <div className="flex-shrink-0 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Winkelmodus</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center active:scale-95 hover:text-gray-700 dark:hover:text-white transition-colors"
            aria-label="Sluit winkelmodus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>
            {checkedCount} van {totalCount} items
          </span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full px-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-24 h-24 bg-brand-600 rounded-3xl flex items-center justify-center mb-6"
              >
                <PartyPopper className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Alles klaar!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
                Je hebt alle {totalCount} items afgevinkt.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-[0.98]"
              >
                Sluiten
              </button>
            </motion.div>
          ) : (
            <motion.div key="items" className="p-4 space-y-4">
              {groupedItems.map((group) => {
                const isGroupComplete =
                  group.checkedCount === group.items.length;

                return (
                  <div key={group.category.id}>
                    {/* Sticky category header */}
                    <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 py-2">
                      <div
                        className={`flex items-center justify-between px-3 py-2 rounded-xl ${
                          isGroupComplete
                            ? "bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800"
                            : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {group.category.emoji}
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              isGroupComplete
                                ? "text-brand-700 dark:text-brand-400"
                                : "text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {group.category.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                            {group.checkedCount}/{group.items.length}
                          </span>
                          {isGroupComplete && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <Check className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Items - large touch targets */}
                    <div className="space-y-1.5 mt-2">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onToggle(item.id)}
                          className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border transition-all active:scale-[0.98] ${
                            item.checked
                              ? "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800/50"
                              : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700"
                          }`}
                        >
                          {/* Checkbox */}
                          <div
                            className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                              item.checked
                                ? "bg-brand-600 border-brand-600"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {item.checked && (
                              <Check
                                className="w-4 h-4 text-white"
                                strokeWidth={3}
                              />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 text-left min-w-0">
                            <span
                              className={`text-base font-medium block transition-all ${
                                item.checked
                                  ? "text-gray-400 dark:text-gray-600 line-through"
                                  : "text-gray-800 dark:text-gray-100"
                              }`}
                            >
                              {item.name}
                            </span>
                            {(item.quantity || item.note) && (
                              <span className="text-xs text-gray-400 dark:text-gray-500 block truncate">
                                {item.quantity && (
                                  <span className="font-mono">
                                    {item.quantity}
                                  </span>
                                )}
                                {item.quantity && item.note && " · "}
                                {item.note}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom button */}
      {!isComplete && (
        <div className="flex-shrink-0 p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onClose}
            className="w-full py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-[0.98]"
          >
            Stop winkelmodus
          </button>
        </div>
      )}
    </motion.div>
  );
}
