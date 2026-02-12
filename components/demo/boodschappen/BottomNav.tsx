"use client";

import { ShoppingCart, BookOpen, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export type Tab = "boodschappen" | "recepten" | "weekmenu";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  itemCount?: number;
}

const tabs: Array<{ id: Tab; label: string; icon: typeof ShoppingCart }> = [
  { id: "boodschappen", label: "Boodschappen", icon: ShoppingCart },
  { id: "recepten", label: "Recepten", icon: BookOpen },
  { id: "weekmenu", label: "Weekmenu", icon: CalendarDays },
];

export function BottomNav({ activeTab, onTabChange, itemCount }: BottomNavProps) {
  return (
    <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 relative transition-colors active:scale-95 ${
                isActive
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.id === "boodschappen" && itemCount !== undefined && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center px-1">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
