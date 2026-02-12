"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Clock, Users, Heart } from "lucide-react";
import { RECIPES, getAllTags, Recipe } from "./recipes";
import { useDebounce } from "./useDebounce";

interface ReceptenTabProps {
  savedRecipes: string[];
  onSelectRecipe: (recipe: Recipe) => void;
}

export function ReceptenTab({ savedRecipes, onSelectRecipe }: ReceptenTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"library" | "saved">("library");
  const debouncedSearch = useDebounce(searchQuery, 200);

  const allTags = useMemo(() => getAllTags(), []);

  const filteredRecipes = useMemo(() => {
    let result = RECIPES;

    if (activeView === "saved") {
      result = result.filter((r) => savedRecipes.includes(r.id));
    }

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.includes(q)) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(q))
      );
    }

    if (activeTag) {
      result = result.filter((r) => r.tags.includes(activeTag));
    }

    return result.slice(0, 50);
  }, [debouncedSearch, activeTag, activeView, savedRecipes]);

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 px-3 flex-shrink-0">
        <button
          onClick={() => setActiveView("library")}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeView === "library"
              ? "border-brand-600 text-brand-600 dark:text-brand-400"
              : "border-transparent text-gray-400 dark:text-gray-500"
          }`}
        >
          Bibliotheek
        </button>
        <button
          onClick={() => setActiveView("saved")}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${
            activeView === "saved"
              ? "border-brand-600 text-brand-600 dark:text-brand-400"
              : "border-transparent text-gray-400 dark:text-gray-500"
          }`}
        >
          Opgeslagen ({savedRecipes.length})
        </button>
      </div>

      {/* Search */}
      <div className="p-3 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Zoek recepten..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
          />
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex gap-2 overflow-x-auto px-3 pb-3 flex-shrink-0" style={{ scrollbarWidth: "none" }}>
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            !activeTag
              ? "bg-brand-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          }`}
        >
          Alles
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTag === tag
                ? "bg-brand-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🍳</span>
            </div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">
              {activeView === "saved" ? "Nog geen opgeslagen recepten" : "Geen recepten gevonden"}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {activeView === "saved"
                ? "Sla recepten op met het hartje"
                : "Probeer een andere zoekterm"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredRecipes.map((recipe, i) => {
              const isSaved = savedRecipes.includes(recipe.id);
              return (
                <motion.button
                  key={recipe.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => onSelectRecipe(recipe)}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden text-left hover:ring-2 hover:ring-brand-200 dark:hover:ring-brand-800 transition-all active:scale-[0.98]"
                >
                  {/* Color banner based on first tag */}
                  <div className="h-24 bg-gradient-to-br from-brand-100 to-brand-50 dark:from-brand-900/40 dark:to-brand-900/20 flex items-center justify-center relative">
                    <span className="text-4xl">{getRecipeEmoji(recipe)}</span>
                    {isSaved && (
                      <Heart className="absolute top-2 right-2 w-4 h-4 text-red-500 fill-current" />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 line-clamp-2 mb-1">
                      {recipe.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      {recipe.prepTime + recipe.cookTime > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {recipe.prepTime + recipe.cookTime} min
                        </span>
                      )}
                      <span className="flex items-center gap-0.5">
                        <Users className="w-3 h-3" />
                        {recipe.servings}p
                      </span>
                    </div>
                    {recipe.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {recipe.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-500 dark:text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function getRecipeEmoji(recipe: Recipe): string {
  const tagMap: Record<string, string> = {
    pasta: "🍝",
    soep: "🍲",
    salade: "🥗",
    aziatisch: "🍜",
    japans: "🍜",
    thais: "🍛",
    indiaas: "🍛",
    mexicaans: "🌮",
    italiaans: "🇮🇹",
    hollands: "🇳🇱",
    bakken: "🧁",
    dessert: "🍰",
    ontbijt: "🥣",
    vis: "🐟",
    bbq: "🔥",
    curry: "🍛",
    snack: "🥖",
  };
  for (const tag of recipe.tags) {
    if (tagMap[tag]) return tagMap[tag];
  }
  return "🍽️";
}
