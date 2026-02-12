"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, RotateCcw, Trash2, ChevronDown, Package } from "lucide-react";
import { HistoryEntry, GroceryItem } from "./useGroceryStorage";
import { getCategoryById } from "./categories";

interface HistoryTabProps {
  history: HistoryEntry[];
  onReaddItems: (items: GroceryItem[]) => void;
  onClearHistory: () => void;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return `Vandaag om ${date.toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  if (days === 1) return "Gisteren";
  if (days < 7) return `${days} dagen geleden`;

  return date.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function HistoryTab({
  history,
  onReaddItems,
  onClearHistory,
}: HistoryTabProps) {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [selectingEntry, setSelectingEntry] = useState<string | null>(null);

  const handleStartSelect = (entry: HistoryEntry) => {
    setSelectingEntry(entry.id);
    setSelectedItems(new Set(entry.items.map((i) => i.id)));
  };

  const handleToggleSelect = (itemId: string) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const handleConfirmReadd = (entry: HistoryEntry) => {
    const itemsToReadd = entry.items.filter((i) => selectedItems.has(i.id));
    if (itemsToReadd.length > 0) {
      onReaddItems(itemsToReadd);
    }
    setSelectingEntry(null);
    setSelectedItems(new Set());
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center px-4">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
          <Clock className="w-10 h-10 text-gray-400 dark:text-gray-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-1">
          Geen geschiedenis
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 max-w-[240px] text-center">
          Afgevinkte items verschijnen hier wanneer je ze van je lijst verwijdert
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
              Geschiedenis
            </span>
          </div>
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-400 hover:text-red-400 transition-colors active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Wis alles
          </button>
        </div>
      </div>

      {/* Entries */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {history.map((entry) => {
          const isExpanded = expandedEntry === entry.id;
          const isSelecting = selectingEntry === entry.id;

          return (
            <div
              key={entry.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              {/* Entry header */}
              <button
                onClick={() =>
                  setExpandedEntry(isExpanded ? null : entry.id)
                }
                className="w-full flex items-center justify-between p-3 text-left active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                    <Package className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 block">
                      {entry.items.length} {entry.items.length === 1 ? "item" : "items"}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                      {formatDate(entry.completedAt)}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 0 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
              </button>

              {/* Expanded items */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 border-t border-gray-50 dark:border-gray-800">
                      <div className="space-y-1 mt-2">
                        {entry.items.map((item) => {
                          const cat = getCategoryById(item.category);
                          const isSelected = selectedItems.has(item.id);
                          return (
                            <div
                              key={item.id}
                              className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg"
                            >
                              {isSelecting && (
                                <button
                                  onClick={() => handleToggleSelect(item.id)}
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                    isSelected
                                      ? "bg-brand-600 border-brand-600"
                                      : "border-gray-300 dark:border-gray-600"
                                  }`}
                                >
                                  {isSelected && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={3}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </button>
                              )}
                              <span className="text-sm flex-shrink-0">
                                {cat.emoji}
                              </span>
                              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                                {item.name}
                              </span>
                              {item.quantity && (
                                <span className="text-[11px] text-gray-400 font-mono">
                                  {item.quantity}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-3">
                        {!isSelecting ? (
                          <button
                            onClick={() => handleStartSelect(entry)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl text-xs font-semibold active:scale-[0.98] transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Opnieuw toevoegen
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setSelectingEntry(null);
                                setSelectedItems(new Set());
                              }}
                              className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-500 active:scale-[0.98]"
                            >
                              Annuleren
                            </button>
                            <button
                              onClick={() => handleConfirmReadd(entry)}
                              disabled={selectedItems.size === 0}
                              className="flex-1 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold active:scale-[0.98] disabled:opacity-50"
                            >
                              Voeg {selectedItems.size} items toe
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
