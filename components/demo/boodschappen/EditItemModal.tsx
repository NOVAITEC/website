"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { GroceryItem } from "./useGroceryStorage";
import { CATEGORIES, getCategoryById } from "./categories";

interface EditItemModalProps {
  item: GroceryItem | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<GroceryItem>) => void;
  onRemove: (id: string) => void;
}

const QUICK_QUANTITIES = ["1×", "2×", "3×", "500g", "1kg", "1L"];

export function EditItemModal({ item, onClose, onUpdate, onRemove }: EditItemModalProps) {
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Initialize local state from item prop when it changes
  useEffect(() => {
    if (item) {
      setQuantity(item.quantity || "");
      setNote(item.note || "");
      setSelectedCategory(item.category || CATEGORIES[0].id);
    }
  }, [item]);

  const handleUpdate = () => {
    if (!item) return;
    onUpdate(item.id, {
      quantity: quantity.trim(),
      note: note.trim(),
      category: selectedCategory,
    });
    onClose();
  };

  const handleRemove = () => {
    if (!item) return;
    onRemove(item.id);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const category = item ? getCategoryById(item.category) : null;

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl flex-shrink-0">{category?.emoji}</span>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">
                    {item.name}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 active:scale-95 flex-shrink-0 ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Hoeveelheid */}
                <div>
                  <label htmlFor="edit-quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Hoeveelheid
                  </label>
                  <input
                    id="edit-quantity"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Bijv. 2 stuks, 500 g, 1 liter"
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 transition-all"
                  />
                  {/* Quick buttons */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {QUICK_QUANTITIES.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuantity(q)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all active:scale-[0.96] ${
                          quantity === q
                            ? "bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 border-brand-300 dark:border-brand-700"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notitie */}
                <div>
                  <label htmlFor="edit-note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Notitie
                  </label>
                  <input
                    id="edit-note"
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Bijv. biologisch, merk Albert Heijn..."
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 transition-all"
                  />
                </div>

                {/* Categorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Categorie
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all active:scale-[0.98] ${
                          selectedCategory === cat.id
                            ? "bg-brand-50 dark:bg-brand-900/30 border-brand-300 dark:border-brand-700"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <span className="text-lg">{cat.emoji}</span>
                        <span className={`text-xs font-medium ${
                          selectedCategory === cat.id
                            ? "text-brand-700 dark:text-brand-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}>
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={handleRemove}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold transition-colors hover:bg-red-100 dark:hover:bg-red-900/30 active:scale-[0.98]"
                >
                  <Trash2 className="w-4 h-4" />
                  Verwijderen
                </button>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="w-full bg-brand-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-[0.98]"
                >
                  Bijwerken
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
