import { Book, Home, Settings, Sparkles } from "lucide-react";

export const MENU_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/courses",
    label: "Courses",
    icon: Book,
  },
  {
    href: "/more",
    label: "More",
    icon: Sparkles,
  },
];

export const SettingsButton = {
  href: "/settings",
  label: "Settings",
  icon: Settings,
};

export const COLOR_SCHEMES = [
  "theme-zinc",
  "theme-slate",
  "theme-stone",
  "theme-gray",
  "theme-neutral",
  "theme-red",
  "theme-rose",
  "theme-orange",
  "theme-green",
  "theme-blue",
  "theme-yellow",
  "theme-violet",
];
