"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { useGroceryStorage } from "@/components/demo/boodschappen/useGroceryStorage";
import { GroceryList } from "@/components/demo/boodschappen/GroceryList";
import { AddItemModal } from "@/components/demo/boodschappen/AddItemModal";

export default function BoodschappenDemoPage() {
  const { items, loading, addItem, removeItem, toggleItem, clearCheckedItems, clearAllItems } =
    useGroceryStorage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const checkedCount = items.filter((item) => item.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12 flex items-center justify-center">
          <div className="w-10 h-10 border-[3px] border-teal/30 border-t-teal rounded-full animate-spin" />
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/#oplossing"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors mb-6 font-inter text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar oplossingen
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-teal/10 border border-teal/20">
                <ShoppingCart className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Boodschappen App Demo
              </h1>
            </div>
            <p className="text-slate-400 font-inter">
              Een volledig werkende boodschappenlijst app. Al je wijzigingen worden automatisch
              opgeslagen in je browser.
            </p>
          </motion.div>

          {/* App Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-100 dark:bg-gray-950 rounded-3xl border border-white/10 overflow-hidden shadow-xl"
          >
            {/* App Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Mijn Boodschappen
                </h2>
                <div className="flex items-center gap-2">
                  {checkedCount > 0 && (
                    <button
                      onClick={clearCheckedItems}
                      className="px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors active:scale-95 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Wis afgevinkt
                    </button>
                  )}
                  {totalCount > 0 && (
                    <button
                      onClick={() => {
                        if (confirm("Weet je zeker dat je alle items wilt verwijderen?")) {
                          clearAllItems();
                        }
                      }}
                      className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors active:scale-95"
                      aria-label="Verwijder alles"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {totalCount > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                    <span className="font-medium">
                      {checkedCount} van {totalCount} afgevinkt
                    </span>
                    <span className="font-mono">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* App Content */}
            <div className="p-4 min-h-[400px]">
              <GroceryList items={items} onToggle={toggleItem} onRemove={removeItem} />
            </div>

            {/* Add Button */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full bg-brand-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
              >
                <Plus className="w-5 h-5" />
                Product toevoegen
              </button>
            </div>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 p-4 rounded-xl bg-teal/5 border border-teal/20"
          >
            <p className="text-sm text-slate-400 font-inter text-center">
              💡 <span className="font-semibold text-teal">Tip:</span> Je boodschappenlijst wordt
              automatisch opgeslagen in je browser. Open deze pagina in een ander tabblad of op een
              ander apparaat om te zien dat elke gebruiker zijn eigen lijst heeft!
            </p>
          </motion.div>
        </div>
      </main>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addItem}
      />
    </>
  );
}
