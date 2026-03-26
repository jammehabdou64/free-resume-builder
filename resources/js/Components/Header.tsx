import { Link } from "@inertiajs/react";
import { BrandLogo } from "@/Components/brand-logo";
import { ThemeToggle } from "@/Components/resume/theme-toggle";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <BrandLogo variant="on-light" className="h-8" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Get started free</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t border-border bg-background transition-all duration-200 overflow-hidden",
          mobileOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground py-1.5 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Get started free</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
