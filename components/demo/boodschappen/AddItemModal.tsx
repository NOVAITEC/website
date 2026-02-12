"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Search } from "lucide-react";
import { CATEGORIES, getCategoryById } from "./categories";
import { searchProducts, detectCategory } from "./products";
import { useDebounce } from "./useDebounce";

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, category: string, quantity?: string, note?: string) => void;
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedName = useDebounce(itemName, 150);

  const suggestions = useMemo(() => searchProducts(debouncedName, 8), [debouncedName]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-detecteer categorie bij typen
  useEffect(() => {
    if (debouncedName.length >= 2) {
      const detected = detectCategory(debouncedName);
      setSelectedCategory(detected);
    }
  }, [debouncedName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAdd(itemName.trim(), selectedCategory, quantity.trim() || undefined);
      resetForm();
      onClose();
    }
  };

  const handleSelectSuggestion = (name: string, category: string) => {
    setItemName(name);
    setSelectedCategory(category);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAdd(itemName.trim(), selectedCategory, quantity.trim() || undefined);
      setItemName("");
      setQuantity("");
      inputRef.current?.focus();
    }
  };

  const resetForm = () => {
    setItemName("");
    setQuantity("");
    setSelectedCategory(CATEGORIES[0].id);
    setShowSuggestions(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Product toevoegen
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Product naam met suggesties */}
                <div className="relative">
                  <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Productnaam
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      ref={inputRef}
                      id="item-name"
                      type="text"
                      value={itemName}
                      onChange={(e) => {
                        setItemName(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Bijv. Melk, Brood, Appels..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 transition-all"
                      autoComplete="off"
                    />
                  </div>

                  {/* Suggesties dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                      {suggestions.map((s) => {
                        const cat = getCategoryById(s.category);
                        return (
                          <button
                            key={s.name}
                            type="button"
                            onClick={() => handleSelectSuggestion(s.name, s.category)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                          >
                            <span className="text-base">{cat.emoji}</span>
                            <span className="text-sm text-gray-800 dark:text-gray-100">{s.name}</span>
                            <span className="text-[10px] text-gray-400 ml-auto">{cat.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Hoeveelheid */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Hoeveelheid <span className="text-gray-400 font-normal">(optioneel)</span>
                  </label>
                  <input
                    id="quantity"
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Bijv. 2 stuks, 500 g, 1 liter"
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 transition-all"
                  />
                </div>

                {/* Categorie */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Categorie
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all active:scale-[0.98] ${
                          selectedCategory === category.id
                            ? "bg-brand-50 dark:bg-brand-900/30 border-brand-300 dark:border-brand-700"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <span className="text-lg">{category.emoji}</span>
                        <span className={`text-xs font-medium ${
                          selectedCategory === category.id
                            ? "text-brand-700 dark:text-brand-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}>
                          {category.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              {/* Buttons */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 flex gap-2">
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  disabled={!itemName.trim()}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-brand-200 dark:border-brand-800 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Nog een
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!itemName.trim()}
                  className="flex-1 px-4 py-3 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Toevoegen
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
