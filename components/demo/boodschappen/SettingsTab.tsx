"use client";

import { Sun, Moon, Monitor, Trash2, Info, Heart } from "lucide-react";

interface SettingsTabProps {
  darkMode: "light" | "dark" | "system";
  onSetDarkMode: (mode: "light" | "dark" | "system") => void;
  onClearHistory: () => void;
  onClearAllData: () => void;
  totalItems: number;
  totalFavorites: number;
  totalHistory: number;
  totalSavedRecipes: number;
}

export function SettingsTab({
  darkMode,
  onSetDarkMode,
  onClearHistory,
  onClearAllData,
  totalItems,
  totalFavorites,
  totalHistory,
  totalSavedRecipes,
}: SettingsTabProps) {
  const darkModeOptions: Array<{
    value: "light" | "dark" | "system";
    label: string;
    icon: typeof Sun;
  }> = [
    { value: "light", label: "Licht", icon: Sun },
    { value: "dark", label: "Donker", icon: Moon },
    { value: "system", label: "Systeem", icon: Monitor },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-3 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 pb-1">
          <span className="text-sm font-bold text-gray-800 dark:text-gray-100">
            Instellingen
          </span>
        </div>

        {/* Dark Mode */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
          <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            Thema
          </p>
          <div className="grid grid-cols-3 gap-2">
            {darkModeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = darkMode === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => onSetDarkMode(option.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all active:scale-[0.97] ${
                    isActive
                      ? "bg-brand-50 dark:bg-brand-900/30 border-brand-300 dark:border-brand-700"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold ${
                      isActive
                        ? "text-brand-700 dark:text-brand-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
          <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            Statistieken
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 block">
                {totalItems}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                Items op lijst
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 block">
                {totalFavorites}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                Favorieten
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 block">
                {totalHistory}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                Geschiedenis
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 block">
                {totalSavedRecipes}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                Opgeslagen recepten
              </span>
            </div>
          </div>
        </div>

        {/* Data management */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
          <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            Gegevens
          </p>
          <div className="space-y-2">
            <button
              onClick={onClearHistory}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors active:scale-[0.98]"
            >
              <Trash2 className="w-4 h-4 text-gray-400" />
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block">
                  Geschiedenis wissen
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  Verwijder alle afgekochte items uit de geschiedenis
                </span>
              </div>
            </button>
            <button
              onClick={onClearAllData}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-left hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors active:scale-[0.98]"
            >
              <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
              <div>
                <span className="text-sm font-medium text-red-600 dark:text-red-400 block">
                  Alle gegevens wissen
                </span>
                <span className="text-[11px] text-red-400 dark:text-red-500">
                  Verwijder lijst, favorieten, recepten en geschiedenis
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* App info */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
          <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            Over
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/30 rounded-xl flex items-center justify-center">
              <span className="text-xl">🛒</span>
            </div>
            <div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-100 block">
                Boodschappen App
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                Demo versie · NovaITec
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            Deze app slaat alle gegevens lokaal op in je browser. Er worden geen
            gegevens naar een server verstuurd.
          </p>
        </div>

        {/* Made with love */}
        <div className="text-center py-2">
          <p className="text-[11px] text-gray-300 dark:text-gray-700 flex items-center justify-center gap-1">
            Gemaakt met <Heart className="w-3 h-3 text-red-400 fill-current" /> door NovaITec
          </p>
        </div>
      </div>
    </div>
  );
}
