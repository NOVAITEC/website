"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Plus, ArrowLeft } from "lucide-react";
import { CATEGORIES, getCategoryById } from "./categories";
import { searchProducts, PRODUCT_DB } from "./products";
import { useDebounce } from "./useDebounce";
import { Favorite } from "./useGroceryStorage";

interface BrowseTabProps {
  favorites: Favorite[];
  onAddItem: (name: string, category: string) => void;
  onAddItemDetail: (product: { name: string; category: string }) => void;
  onToggleFavorite: (name: string, category: string) => void;
  isFavorite: (name: string) => boolean;
}

export function BrowseTab({
  favorites,
  onAddItem,
  onAddItemDetail,
  onToggleFavorite,
  isFavorite,
}: BrowseTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 200);

  const searchResults = useMemo(() => {
    if (!debouncedSearch.trim()) return [];
    return searchProducts(debouncedSearch, 15);
  }, [debouncedSearch]);

  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return (PRODUCT_DB[selectedCategory] || []).map((name) => ({
      name,
      category: selectedCategory,
    }));
  }, [selectedCategory]);

  const isSearching = debouncedSearch.trim().length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="p-3 flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim()) setSelectedCategory(null);
            }}
            placeholder="Zoek een product..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Favorites bar */}
        {favorites.length > 0 && !isSearching && !selectedCategory && (
          <div className="px-3 pt-3">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Favorieten
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {favorites.map((fav) => {
                const cat = getCategoryById(fav.category);
                return (
                  <button
                    key={fav.name}
                    onClick={() => onAddItem(fav.name, fav.category)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-brand-50 dark:bg-brand-900/30 rounded-xl border border-brand-200 dark:border-brand-800 text-sm whitespace-nowrap active:scale-95 transition-all"
                  >
                    <span className="text-sm">{cat.emoji}</span>
                    <span className="text-xs font-semibold text-brand-700 dark:text-brand-400">
                      {fav.name}
                    </span>
                    <Plus className="w-3 h-3 text-brand-500" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search results */}
        {isSearching && (
          <div className="p-3">
            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Geen producten gevonden
                </p>
                <button
                  onClick={() => {
                    onAddItem(searchQuery.trim(), "overig");
                    setSearchQuery("");
                  }}
                  className="mt-3 px-4 py-2 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-xl text-sm font-semibold active:scale-95"
                >
                  &quot;{searchQuery.trim()}&quot; als eigen product toevoegen
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {searchResults.map((product) => {
                  const cat = getCategoryById(product.category);
                  const isFav = isFavorite(product.name);
                  return (
                    <div
                      key={product.name}
                      onClick={() => onAddItemDetail(product)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer active:scale-[0.99]"
                    >
                      <span className="text-lg flex-shrink-0">{cat.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100 block">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500">{cat.name}</span>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.name, product.category); }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors active:scale-95 ${
                          isFav
                            ? "text-red-500"
                            : "text-gray-300 dark:text-gray-600 hover:text-red-400"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onAddItem(product.name, product.category); }}
                        className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Category browser */}
        {!isSearching && !selectedCategory && (
          <div className="p-3">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Categorieën
            </p>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((category) => {
                const productCount = (PRODUCT_DB[category.id] || []).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex flex-col items-center gap-1.5 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 transition-all active:scale-[0.97]"
                  >
                    <span className="text-2xl">{category.emoji}</span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">
                      {category.name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {productCount} items
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Category detail view */}
        {!isSearching && selectedCategory && (
          <div className="p-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400 font-semibold mb-3 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">
                {getCategoryById(selectedCategory).emoji}
              </span>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {getCategoryById(selectedCategory).name}
              </h3>
            </div>

            <div className="space-y-1">
              {categoryProducts.map((product) => {
                const isFav = isFavorite(product.name);
                return (
                  <div
                    key={product.name}
                    onClick={() => onAddItemDetail(product)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer active:scale-[0.99]"
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100 flex-1">
                      {product.name}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.name, product.category); }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors active:scale-95 ${
                        isFav
                          ? "text-red-500"
                          : "text-gray-300 dark:text-gray-600 hover:text-red-400"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onAddItem(product.name, product.category); }}
                      className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
              {categoryProducts.length === 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">
                  Geen producten in deze categorie
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
