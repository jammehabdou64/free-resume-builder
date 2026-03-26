import { useEffect } from "react";

/**
 * Applies `dark` on `<html>` from localStorage or `prefers-color-scheme`.
 * Must run on every page so the landing route respects theme without mounting ThemeToggle first.
 */
export function ThemeInit() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldDark =
      stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", shouldDark);
  }, []);
  return null;
}
