"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { WeekMeal, WeekMenu } from "./useGroceryStorage";
import { RECIPES, getRecipeById, Recipe } from "./recipes";

const DAY_LABELS: Record<string, string> = {
  ma: "Maandag",
  di: "Dinsdag",
  wo: "Woensdag",
  do: "Donderdag",
  vr: "Vrijdag",
  za: "Zaterdag",
  zo: "Zondag",
};

const DAY_KEYS = ["ma", "di", "wo", "do", "vr", "za", "zo"];

interface WeekmenuTabProps {
  weekMenu: WeekMenu;
  onAddMeal: (day: string, meal: WeekMeal) => void;
  onRemoveMeal: (day: string, index: number) => void;
  onAddIngredientsToList: (items: Array<{ name: string; category: string; quantity: string; note: string }>) => void;
  onSelectRecipe: (recipe: Recipe) => void;
}

export function WeekmenuTab({
  weekMenu,
  onAddMeal,
  onRemoveMeal,
  onAddIngredientsToList,
  onSelectRecipe,
}: WeekmenuTabProps) {
  const [addingDay, setAddingDay] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addingMeal, setAddingMeal] = useState<string | null>(null);

  // Bereken week offset (start maandag)
  const today = new Date();
  const dayOfWeek = today.getDay();
  const todayKey = DAY_KEYS[(dayOfWeek + 6) % 7]; // 0=zo -> 6, 1=ma -> 0, etc.

  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return RECIPES.slice(0, 20);
    const q = searchQuery.toLowerCase();
    return RECIPES.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q))
    ).slice(0, 20);
  }, [searchQuery]);

  const handleAddIngredients = (day: string, meal: WeekMeal) => {
    const mealKey = `${day}-${meal.recipeId}`;
    setAddingMeal(mealKey);

    const recipe = getRecipeById(meal.recipeId);
    if (!recipe?.ingredients?.length) {
      setAddingMeal(null);
      return;
    }

    const items = recipe.ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity,
      category: ing.category,
      note: `Weekmenu: ${DAY_LABELS[day]} - ${recipe.name}`,
    }));
    onAddIngredientsToList(items);

    setTimeout(() => setAddingMeal(null), 500);
  };

  const totalMeals = DAY_KEYS.reduce((sum, day) => sum + (weekMenu[day]?.length || 0), 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header info */}
      <div className="p-3 flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
              Weekplanning
            </span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {totalMeals} {totalMeals === 1 ? "maaltijd" : "maaltijden"} gepland
          </span>
        </div>
      </div>

      {/* Days */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-2">
          {DAY_KEYS.map((day) => {
            const meals = weekMenu[day] || [];
            const isToday = day === todayKey;

            return (
              <div
                key={day}
                className={`rounded-xl border p-3 transition-colors ${
                  isToday
                    ? "bg-brand-50/50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800"
                    : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
                }`}
              >
                {/* Day header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
                      {DAY_LABELS[day]}
                    </span>
                    {isToday && (
                      <span className="px-2 py-0.5 rounded-full bg-brand-600 text-white text-[10px] font-bold">
                        Vandaag
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setAddingDay(addingDay === day ? null : day)}
                    className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center active:scale-95 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Meals */}
                {meals.length === 0 && addingDay !== day && (
                  <p className="text-xs text-gray-400 dark:text-gray-600 italic">
                    Nog geen maaltijden gepland
                  </p>
                )}

                {meals.map((meal, i) => {
                  const mealKey = `${day}-${meal.recipeId}`;
                  const isAdding = addingMeal === mealKey;

                  return (
                    <div
                      key={`${meal.recipeId}-${i}`}
                      className="flex items-center justify-between py-1.5"
                    >
                      <button
                        onClick={() => {
                          const recipe = getRecipeById(meal.recipeId);
                          if (recipe) onSelectRecipe(recipe);
                        }}
                        className="flex items-center gap-2 min-w-0 text-left"
                      >
                        <span className="text-sm">🍽️</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate hover:text-brand-600 dark:hover:text-brand-400">
                          {meal.name}
                        </span>
                      </button>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleAddIngredients(day, meal)}
                          disabled={isAdding}
                          className="text-brand-500 p-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/30 active:scale-95"
                          title="Ingrediënten aan lijst toevoegen"
                        >
                          {isAdding ? (
                            <div className="w-4 h-4 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
                          ) : (
                            <ShoppingCart className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => onRemoveMeal(day, i)}
                          className="text-gray-300 dark:text-gray-600 hover:text-red-400 p-1.5 rounded-lg active:scale-95"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Add recipe picker */}
                <AnimatePresence>
                  {addingDay === day && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Zoek een recept..."
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/30 placeholder:text-gray-400 mb-2"
                          autoFocus
                        />
                        <div className="max-h-40 overflow-y-auto space-y-1">
                          {filteredRecipes.map((recipe) => (
                            <button
                              key={recipe.id}
                              onClick={() => {
                                onAddMeal(day, { recipeId: recipe.id, name: recipe.name });
                                setAddingDay(null);
                                setSearchQuery("");
                              }}
                              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-left active:scale-[0.98]"
                            >
                              <span className="text-xs">🍽️</span>
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                                {recipe.name}
                              </span>
                              <span className="text-[10px] text-gray-400 ml-auto flex-shrink-0">
                                {recipe.prepTime + recipe.cookTime} min
                              </span>
                            </button>
                          ))}
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
    </div>
  );
}
