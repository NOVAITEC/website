"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ShoppingCart,
  ShoppingBag,
  CheckCircle2,
  ChevronDown,
  ListPlus,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { ToastProvider, useToast } from "@/components/demo/boodschappen/ToastContext";
import { useGroceryStorage, GroceryItem } from "@/components/demo/boodschappen/useGroceryStorage";
import { GroceryList } from "@/components/demo/boodschappen/GroceryList";
import { AddItemModal } from "@/components/demo/boodschappen/AddItemModal";
import { EditItemModal } from "@/components/demo/boodschappen/EditItemModal";
import { AddItemDetailModal } from "@/components/demo/boodschappen/AddItemDetailModal";
import { BottomNav, Tab } from "@/components/demo/boodschappen/BottomNav";
import { ReceptenTab } from "@/components/demo/boodschappen/ReceptenTab";
import { WeekmenuTab } from "@/components/demo/boodschappen/WeekmenuTab";
import { RecipeDetailModal } from "@/components/demo/boodschappen/RecipeDetailModal";
import { ShoppingMode } from "@/components/demo/boodschappen/ShoppingMode";
import { BrowseTab } from "@/components/demo/boodschappen/BrowseTab";
import { HistoryTab } from "@/components/demo/boodschappen/HistoryTab";
import { SettingsTab } from "@/components/demo/boodschappen/SettingsTab";
import { Recipe } from "@/components/demo/boodschappen/recipes";

function BoodschappenAppInner() {
  const store = useGroceryStorage();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("boodschappen");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);
  const [browseDetailProduct, setBrowseDetailProduct] = useState<{ name: string; category: string } | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showListPicker, setShowListPicker] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isShoppingMode, setIsShoppingMode] = useState(false);
  const appContainerRef = useRef<HTMLDivElement>(null);

  // Prevent mouse wheel from scrolling the page when hovering over the app
  useEffect(() => {
    const container = appContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== container) {
        if (target.scrollHeight > target.clientHeight + 1) {
          const { scrollTop, scrollHeight, clientHeight } = target;
          const atTop = scrollTop <= 0 && e.deltaY < 0;
          const atBottom =
            scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
          if (!atTop && !atBottom) return;
        }
        target = target.parentElement;
      }
      e.preventDefault();
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  // Apply dark mode within the demo
  useEffect(() => {
    if (!store.loading) {
      const root = document.documentElement;
      if (store.darkMode === "dark") {
        root.classList.add("dark");
      } else if (store.darkMode === "light") {
        root.classList.remove("dark");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    }

    // Cleanup: remove dark class when leaving the demo
    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [store.darkMode, store.loading]);

  if (store.loading) {
    return (
      <>
        <Header />
        <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12 flex items-center justify-center">
          <div className="w-10 h-10 border-[3px] border-teal/30 border-t-teal rounded-full animate-spin" />
        </main>
      </>
    );
  }

  const checkedCount = store.items.filter((item) => item.checked).length;
  const totalCount = store.items.length;
  const uncheckedCount = totalCount - checkedCount;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;
  const activeList = store.lists.find((l) => l.id === store.activeListId);

  const handleAddToListFromRecipe = (
    items: Array<{ name: string; category: string; quantity: string; note: string }>
  ) => {
    store.addItems(items);
    showToast(`${items.length} ingrediënten toegevoegd`, "success");
  };

  const handleAddToWeekMenu = (recipe: Recipe) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayKeys = ["zo", "ma", "di", "wo", "do", "vr", "za"];
    const todayKey = dayKeys[dayOfWeek];
    store.addMeal(todayKey, { recipeId: recipe.id, name: recipe.name });
    showToast(`${recipe.name} toegevoegd aan weekmenu`, "success");
  };

  const handleClearAllData = () => {
    store.clearAllItems();
    store.clearHistory();
    showToast("Alle gegevens gewist", "info");
  };

  return (
    <>
      <Header />
      <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              href="/oplossingen"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors mb-6 font-inter text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar oplossingen
            </Link>

            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-teal/10 border border-teal/20">
                <ShoppingCart className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Boodschappen App
              </h1>
            </div>
            <p className="text-slate-400 font-inter text-sm sm:text-base mb-3">
              Van papiertje naar moderne oplossing. Gebouwd in <span className="text-teal font-semibold">minder dan 1 dag</span> om
              te laten zien wat mogelijk is: complete boodschappenlijsten, 30+ recepten, weekplanner,
              winkelmodus, en meer. Alles lokaal opgeslagen in je browser.
            </p>
            <p className="text-slate-500 font-inter text-xs sm:text-sm italic">
              💡 Oorspronkelijk gebouwd voor mijn moeder — geen gezeik meer over wat er niet in huis is.
              Als het niet op het lijstje staat, heb je pech.
            </p>
          </motion.div>

          {/* App Container */}
          <motion.div
            ref={appContainerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-100 dark:bg-gray-950 rounded-3xl border border-white/10 overflow-hidden shadow-xl flex flex-col"
            style={{ height: "clamp(600px, 75vh, 800px)" }}
          >
            {/* === Boodschappen Tab === */}
            {activeTab === "boodschappen" && (
              <div className="flex flex-col flex-1 min-h-0">
                {/* App Header */}
                <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 flex-shrink-0">
                  {/* List selector */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="relative">
                      <button
                        onClick={() => setShowListPicker(!showListPicker)}
                        className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        {activeList?.name || "Mijn Boodschappen"}
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </button>

                      {/* List dropdown */}
                      {showListPicker && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-20 overflow-hidden">
                          {store.lists.map((list) => (
                            <button
                              key={list.id}
                              onClick={() => {
                                store.switchList(list.id);
                                setShowListPicker(false);
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                list.id === store.activeListId
                                  ? "text-brand-600 dark:text-brand-400 font-semibold"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {list.name}
                              {list.id === store.activeListId && (
                                <CheckCircle2 className="w-4 h-4" />
                              )}
                            </button>
                          ))}
                          <div className="border-t border-gray-100 dark:border-gray-700 p-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                placeholder="Nieuwe lijst..."
                                className="flex-1 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && newListName.trim()) {
                                    store.addList(newListName.trim());
                                    setNewListName("");
                                    setShowListPicker(false);
                                    showToast("Nieuwe lijst aangemaakt", "success");
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  if (newListName.trim()) {
                                    store.addList(newListName.trim());
                                    setNewListName("");
                                    setShowListPicker(false);
                                    showToast("Nieuwe lijst aangemaakt", "success");
                                  }
                                }}
                                className="px-2.5 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-semibold active:scale-95"
                              >
                                <ListPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Shopping Mode button */}
                      {uncheckedCount > 0 && (
                        <button
                          onClick={() => setIsShoppingMode(true)}
                          className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors active:scale-95 flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Winkelen
                        </button>
                      )}
                      {checkedCount > 0 && (
                        <button
                          onClick={() => {
                            store.clearCheckedItems();
                            showToast(`${checkedCount} items opgeruimd`, "info");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/40 transition-colors active:scale-95 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Opruimen
                        </button>
                      )}
                      {totalCount > 0 && (
                        <button
                          onClick={() => {
                            store.clearAllItems();
                            showToast("Lijst geleegd", "info");
                          }}
                          className="w-8 h-8 rounded-lg text-gray-300 dark:text-gray-600 hover:text-red-400 flex items-center justify-center transition-colors active:scale-95"
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

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  <GroceryList
                    items={store.items}
                    onToggle={store.toggleItem}
                    onRemove={store.removeItem}
                    onEdit={setEditingItem}
                  />
                </div>

                {/* Add Button */}
                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full bg-brand-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20"
                  >
                    <Plus className="w-5 h-5" />
                    Product toevoegen
                  </button>
                </div>
              </div>
            )}

            {/* === Bladeren Tab === */}
            {activeTab === "bladeren" && (
              <div className="flex-1 min-h-0 overflow-hidden">
                <BrowseTab
                  favorites={store.favorites}
                  onAddItem={(name, category) => {
                    store.addItem(name, category);
                    showToast(`${name} toegevoegd`, "success");
                  }}
                  onAddItemDetail={setBrowseDetailProduct}
                  onToggleFavorite={(name, category) => {
                    if (store.isFavorite(name)) {
                      store.removeFavorite(name);
                      showToast(`${name} verwijderd uit favorieten`, "info");
                    } else {
                      store.addFavorite(name, category);
                      showToast(`${name} als favoriet opgeslagen`, "success");
                    }
                  }}
                  isFavorite={store.isFavorite}
                />
              </div>
            )}

            {/* === Recepten Tab === */}
            {activeTab === "recepten" && (
              <div className="flex-1 min-h-0 overflow-hidden">
                <ReceptenTab
                  savedRecipes={store.savedRecipes}
                  onSelectRecipe={setSelectedRecipe}
                />
              </div>
            )}

            {/* === Weekmenu Tab === */}
            {activeTab === "weekmenu" && (
              <div className="flex-1 min-h-0 overflow-hidden">
                <WeekmenuTab
                  weekMenu={store.weekMenu}
                  onAddMeal={store.addMeal}
                  onRemoveMeal={store.removeMeal}
                  onAddIngredientsToList={handleAddToListFromRecipe}
                  onSelectRecipe={setSelectedRecipe}
                />
              </div>
            )}

            {/* === Geschiedenis Tab === */}
            {activeTab === "geschiedenis" && (
              <div className="flex-1 min-h-0 overflow-hidden">
                <HistoryTab
                  history={store.history}
                  onReaddItems={(items) => {
                    store.addItemsFromHistory(items);
                    showToast(
                      `${items.length} items opnieuw toegevoegd`,
                      "success"
                    );
                  }}
                  onClearHistory={() => {
                    store.clearHistory();
                    showToast("Geschiedenis gewist", "info");
                  }}
                />
              </div>
            )}

            {/* === Instellingen Tab === */}
            {activeTab === "instellingen" && (
              <div className="flex-1 min-h-0 overflow-hidden">
                <SettingsTab
                  darkMode={store.darkMode}
                  onSetDarkMode={store.setDarkMode}
                  onClearHistory={() => {
                    store.clearHistory();
                    showToast("Geschiedenis gewist", "info");
                  }}
                  onClearAllData={handleClearAllData}
                  totalItems={totalCount}
                  totalFavorites={store.favorites.length}
                  totalHistory={store.history.length}
                  totalSavedRecipes={store.savedRecipes.length}
                />
              </div>
            )}

            {/* Bottom Navigation */}
            <BottomNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              itemCount={uncheckedCount}
            />
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 p-5 rounded-xl bg-gradient-to-br from-teal/10 to-amber/5 border border-teal/20"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="text-2xl">⚡</div>
              <div className="flex-1">
                <h3 className="text-teal font-semibold font-inter mb-1 text-sm">
                  Gebouwd in &lt;1 dag — Perfecte afwerking
                </h3>
                <p className="text-xs text-slate-400 font-inter leading-relaxed">
                  6 volledig werkende tabs • 30+ recepten met ingrediënten • Weekplanner •
                  Winkelmodus voor in de supermarkt • Aankoopgeschiedenis • Dark mode •
                  Favorieten • Meerdere lijsten • Responsive design
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-inter text-center pt-3 border-t border-teal/10">
              Dit is wat mogelijk is in één dag. Stel je voor wat ik kan bouwen voor <span className="text-teal font-semibold">jouw</span> project.
            </p>
          </motion.div>

          {/* Demo vs Volledige versie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 grid grid-cols-2 gap-3"
          >
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-slate-500 font-inter uppercase tracking-wider mb-2">
                Deze demo
              </p>
              <div className="space-y-1.5">
                <p className="text-slate-300 font-inter text-sm font-semibold">30 recepten</p>
                <p className="text-slate-300 font-inter text-sm font-semibold">100+ producten</p>
                <p className="text-slate-300 font-inter text-sm font-semibold">Lokale opslag</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-teal/5 border border-teal/20">
              <p className="text-xs text-teal font-inter uppercase tracking-wider mb-2">
                Volledige versie
              </p>
              <div className="space-y-1.5">
                <p className="text-paper font-inter text-sm font-semibold">800+ recepten</p>
                <p className="text-paper font-inter text-sm font-semibold">1000 producten</p>
                <p className="text-paper font-inter text-sm font-semibold">Cloud sync & meer</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-slate-300 font-inter mb-2 text-base font-semibold">
              Geïnspireerd?
            </p>
            <p className="text-slate-400 font-inter mb-6 text-sm max-w-lg mx-auto">
              Deze demo laat zien wat er mogelijk is met moderne web technologie, snelle prototyping
              en oog voor detail. Heb je een eigen idee of uitdaging? Laten we praten.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-teal text-midnight font-montserrat font-bold text-sm px-8 py-4 rounded-xl hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              Neem contact op
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Modals */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(name, cat, qty, note) => {
          store.addItem(name, cat, qty, note);
          showToast(`${name} toegevoegd`, "success");
        }}
      />

      <EditItemModal
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onUpdate={(id, updates) => {
          store.updateItem(id, updates);
          showToast("Item bijgewerkt", "success");
        }}
        onRemove={(id) => {
          store.removeItem(id);
          showToast("Item verwijderd", "info");
        }}
      />

      <AddItemDetailModal
        product={browseDetailProduct}
        onClose={() => setBrowseDetailProduct(null)}
        onAdd={(name, category, quantity, note) => {
          store.addItem(name, category, quantity, note);
          showToast(`${name} toegevoegd`, "success");
        }}
      />

      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAddToList={handleAddToListFromRecipe}
        onToggleSave={(id) => {
          store.toggleSavedRecipe(id);
          const wasSaved = store.savedRecipes.includes(id);
          showToast(
            wasSaved ? "Recept verwijderd uit opgeslagen" : "Recept opgeslagen",
            wasSaved ? "info" : "success"
          );
        }}
        onAddToWeekMenu={handleAddToWeekMenu}
        isSaved={
          selectedRecipe ? store.savedRecipes.includes(selectedRecipe.id) : false
        }
      />

      {/* Shopping Mode */}
      <AnimatePresence>
        {isShoppingMode && (
          <ShoppingMode
            items={store.items}
            onToggle={store.toggleItem}
            onClose={() => setIsShoppingMode(false)}
          />
        )}
      </AnimatePresence>

      {/* Click outside to close list picker */}
      {showListPicker && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowListPicker(false)}
        />
      )}
    </>
  );
}

// Wrap met ToastProvider
export default function BoodschappenDemoPage() {
  return (
    <ToastProvider>
      <BoodschappenAppInner />
    </ToastProvider>
  );
}
