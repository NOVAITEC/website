"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { CATEGORIES } from "./categories";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, category: string) => void;
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [itemName, setItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAdd(itemName.trim(), selectedCategory);
      setItemName("");
      setSelectedCategory(CATEGORIES[0].id);
      onClose();
    }
  };

  const handleClose = () => {
    setItemName("");
    setSelectedCategory(CATEGORIES[0].id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Nieuw product toevoegen
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95"
                  aria-label="Sluit"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Product naam */}
                <div>
                  <label
                    htmlFor="item-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Productnaam
                  </label>
                  <input
                    ref={inputRef}
                    id="item-name"
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Bijv. Melk, Brood, Appels..."
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 dark:focus:border-brand-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                  />
                </div>

                {/* Categorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categorie
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all active:scale-[0.98] ${
                          selectedCategory === category.id
                            ? "bg-brand-50 dark:bg-brand-900/30 border-brand-300 dark:border-brand-700"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-brand-200 dark:hover:border-brand-800"
                        }`}
                      >
                        <span className="text-xl">{category.emoji}</span>
                        <span
                          className={`text-xs font-medium ${
                            selectedCategory === category.id
                              ? "text-brand-700 dark:text-brand-400"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-[0.98]"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={!itemName.trim()}
                    className="flex-1 px-4 py-3 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Toevoegen
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
