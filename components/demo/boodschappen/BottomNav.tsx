"use client";

import {
  ShoppingCart,
  Search,
  BookOpen,
  CalendarDays,
  Clock,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

export type Tab =
  | "boodschappen"
  | "bladeren"
  | "recepten"
  | "weekmenu"
  | "geschiedenis"
  | "instellingen";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  itemCount?: number;
}

const tabs: Array<{ id: Tab; label: string; icon: typeof ShoppingCart }> = [
  { id: "boodschappen", label: "Lijst", icon: ShoppingCart },
  { id: "bladeren", label: "Bladeren", icon: Search },
  { id: "recepten", label: "Recepten", icon: BookOpen },
  { id: "weekmenu", label: "Week", icon: CalendarDays },
  { id: "geschiedenis", label: "Historie", icon: Clock },
  { id: "instellingen", label: "Meer", icon: Settings },
];

export function BottomNav({ activeTab, onTabChange, itemCount }: BottomNavProps) {
  return (
    <nav
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex-shrink-0"
      role="navigation"
      aria-label="Hoofdnavigatie"
    >
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 relative transition-colors active:scale-95 ${
                isActive
                  ? "text-brand-600 dark:text-brand-400"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon className="w-[18px] h-[18px]" />
                {tab.id === "boodschappen" &&
                  itemCount !== undefined &&
                  itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[14px] h-[14px] rounded-full bg-brand-600 text-white text-[9px] font-bold flex items-center justify-center px-0.5">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
              </div>
              <span className="text-[10px] font-semibold leading-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
