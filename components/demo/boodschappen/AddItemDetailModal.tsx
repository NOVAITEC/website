"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ShoppingCart } from "lucide-react";
import { getCategoryById } from "./categories";

interface AddItemDetailModalProps {
  product: { name: string; category: string } | null;
  onClose: () => void;
  onAdd: (name: string, category: string, quantity?: string, note?: string) => void;
}

const QUICK_QUANTITIES = ["1×", "2×", "3×", "500g", "1kg", "1L", "pak", "fles"];

export function AddItemDetailModal({
  product,
  onClose,
  onAdd,
}: AddItemDetailModalProps) {
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [activeQuick, setActiveQuick] = useState<string | null>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setQuantity("");
      setNote("");
      setActiveQuick(null);
      setTimeout(() => quantityRef.current?.focus(), 100);
    }
  }, [product]);

  const handleQuickQuantity = (value: string) => {
    if (activeQuick === value) {
      setActiveQuick(null);
      setQuantity("");
    } else {
      setActiveQuick(value);
      setQuantity(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    onAdd(
      product.name,
      product.category,
      quantity.trim() || undefined,
      note.trim() || undefined
    );
    handleClose();
  };

  const handleClose = () => {
    setQuantity("");
    setNote("");
    setActiveQuick(null);
    onClose();
  };

  const category = product ? getCategoryById(product.category) : null;

  return (
    <AnimatePresence>
      {product && category && (
        <>
          <motion.div
            key="add-detail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-4">
            <motion.div
              key="add-detail-modal"
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                  Toevoegen
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 active:scale-95 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                {/* Product display */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <span className="text-2xl flex-shrink-0">{category.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {category.name}
                    </p>
                  </div>
                </div>

                {/* Hoeveelheid */}
                <div>
                  <label
                    htmlFor="detail-quantity"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Hoeveelheid <span className="text-gray-400 dark:text-gray-500 font-normal">(optioneel)</span>
                  </label>
                  <input
                    ref={quantityRef}
                    id="detail-quantity"
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setActiveQuick(null);
                    }}
                    placeholder="Bijv. 2 stuks, 500 g, 1 liter"
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                  />
                  {/* Quick quantity buttons */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {QUICK_QUANTITIES.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleQuickQuantity(q)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all active:scale-95 ${
                          activeQuick === q
                            ? "bg-brand-50 dark:bg-brand-900/30 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-400"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notitie */}
                <div>
                  <label
                    htmlFor="detail-note"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Notitie <span className="text-gray-400 dark:text-gray-500 font-normal">(optioneel)</span>
                  </label>
                  <input
                    id="detail-note"
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Bijv. merk, variatie..."
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-brand-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Toevoegen aan lijst
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
