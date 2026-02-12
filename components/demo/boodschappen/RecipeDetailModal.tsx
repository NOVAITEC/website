"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  Users,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  ChefHat,
  CalendarPlus,
} from "lucide-react";
import { Recipe, scaleQuantity } from "./recipes";
import { getCategoryById } from "./categories";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onAddToList: (items: Array<{ name: string; category: string; quantity: string; note: string }>) => void;
  onToggleSave: (recipeId: string) => void;
  onAddToWeekMenu?: (recipe: Recipe) => void;
  isSaved: boolean;
}

export function RecipeDetailModal({
  recipe,
  onClose,
  onAddToList,
  onToggleSave,
  onAddToWeekMenu,
  isSaved,
}: RecipeDetailModalProps) {
  const [servings, setServings] = useState(4);

  // Reset servings when recipe changes
  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings);
    }
  }, [recipe]);

  if (!recipe) return null;

  const scale = servings / recipe.servings;

  const handleAddToList = () => {
    const items = recipe.ingredients.map((ing) => ({
      name: ing.name,
      quantity: scaleQuantity(ing.quantity, scale),
      category: ing.category,
      note: `Recept: ${recipe.name}`,
    }));
    onAddToList(items);
    onClose();
  };

  return (
    <AnimatePresence>
      {recipe && (
        <motion.div
          key="recipe-detail-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal - Full screen on mobile */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full sm:max-w-lg bg-white dark:bg-gray-900 sm:rounded-2xl shadow-lg overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 pr-2 line-clamp-1">
                  {recipe.name}
                </h2>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onToggleSave(recipe.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors active:scale-95 ${
                      isSaved
                        ? "bg-red-50 dark:bg-red-900/30 text-red-500"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 flex items-center justify-center active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">{recipe.description}</p>

                  {/* Meta badges */}
                  <div className="flex flex-wrap gap-2">
                    {recipe.prepTime > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5" /> {recipe.prepTime} min voorbereiden
                      </span>
                    )}
                    {recipe.cookTime > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">
                        <ChefHat className="w-3.5 h-3.5" /> {recipe.cookTime} min bereiden
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-900/30 text-[11px] font-medium text-brand-700 dark:text-brand-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Servings adjuster */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Users className="w-4 h-4" />
                        Porties
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setServings(Math.max(1, servings - 1))}
                          className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 active:scale-95"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-100 w-6 text-center">
                          {servings}
                        </span>
                        <button
                          onClick={() => setServings(servings + 1)}
                          className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Ingrediënten
                    </h3>
                    <div className="space-y-1.5">
                      {recipe.ingredients.map((ing, i) => {
                        const cat = getCategoryById(ing.category);
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <span className="text-base flex-shrink-0">{cat.emoji}</span>
                            <span className="text-sm text-gray-800 dark:text-gray-100 flex-1">
                              {ing.name}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                              {scaleQuantity(ing.quantity, scale)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Bereidingswijze
                    </h3>
                    <div className="space-y-3">
                      {recipe.steps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-400 pt-0.5">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Source */}
                  <p className="text-xs text-gray-400 dark:text-gray-600">
                    Bron: {recipe.source}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 space-y-2">
                <button
                  onClick={handleAddToList}
                  className="w-full bg-brand-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-brand-700 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ingrediënten toevoegen aan lijst
                </button>
                {onAddToWeekMenu && (
                  <button
                    onClick={() => {
                      onAddToWeekMenu(recipe);
                      onClose();
                    }}
                    className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-xl py-3 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    Toevoegen aan weekmenu
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
