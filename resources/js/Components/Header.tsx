import { Link, usePage } from "@inertiajs/react";
import { BrandLogo } from "@/Components/brand-logo";
import { ThemeToggle } from "@/Components/resume/theme-toggle";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Templates", href: "#templates" },
];

function normalizePath(url: string): string {
  const base = url.replace(/\?.*$/, "").split("#")[0];
  try {
    if (base.startsWith("http")) {
      const u = new URL(base);
      const p = u.pathname.replace(/\/$/, "") || "/";
      return p;
    }
  } catch {
    /* use path below */
  }
  const p = base.replace(/\/$/, "") || "/";
  return p.startsWith("/") ? p : `/${p}`;
}

function isDashboardSection(path: string): boolean {
  const p = path.replace(/\/$/, "") || "/";
  return p === "/dashboard" || p === "/home" || p === "/resumes";
}

function isCreateResumePath(path: string): boolean {
  const p = path.replace(/\/$/, "") || "/";
  return p === "/resume/create";
}

function navItemClass(active: boolean) {
  return cn(
    "text-base font-medium transition-colors",
    active
      ? "text-primary font-semibold"
      : "text-muted-foreground hover:text-foreground",
  );
}

function navItemClassMobile(active: boolean) {
  return cn(
    "py-1.5 text-sm font-medium transition-colors",
    active
      ? "text-primary font-semibold"
      : "text-muted-foreground hover:text-foreground",
  );
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  );
  const page = usePage();
  const { url, props } = page;
  const { auth, canCreateResume } = props || {};
  const isAuthenticated =
    Object.keys(auth as Record<string, unknown>).length > 0;
  const allowNewResume = canCreateResume !== false;

  const path = normalizePath(url);

  useEffect(() => {
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [url]);

  const onIndexPage = path === "/" || path === "";
  const hashLinkActive = (href: string) =>
    onIndexPage && href.startsWith("#") && hash === href;

  const loginActive = path === "/login";
  const registerActive = path === "/register" || path.startsWith("/register/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <BrandLogo variant="on-light" className="h-8 max-w-[200px]" />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = hashLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={
                    onIndexPage
                      ? link.href
                      : `/${link.href}`.replace(/^\/{2,}/, "/")
                  }
                  className={navItemClass(active)}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={navItemClass(isDashboardSection(path))}
                  aria-current={isDashboardSection(path) ? "page" : undefined}
                >
                  Dashboard
                </Link>
                {allowNewResume ? (
                  <Link
                    href="/resume/create"
                    className={navItemClass(isCreateResumePath(path))}
                    aria-current={isCreateResumePath(path) ? "page" : undefined}
                  >
                    Create Resume
                  </Link>
                ) : (
                  <span
                    className="text-muted-foreground text-sm cursor-not-allowed"
                    title="You have reached the maximum number of saved resumes. Delete one from your dashboard to create another."
                  >
                    Create Resume
                  </span>
                )}
                <Button variant="ghost" asChild>
                  <Link href="/logout">Log out</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link
                    href="/login"
                    className={navItemClass(loginActive)}
                    aria-current={loginActive ? "page" : undefined}
                  >
                    Log in
                  </Link>
                </Button>
                <Button
                  asChild
                  className={cn(
                    registerActive &&
                      "ring-2 ring-primary/70 ring-offset-2 ring-offset-background",
                  )}
                >
                  <Link
                    href="/register"
                    aria-current={registerActive ? "page" : undefined}
                  >
                    Get started free
                  </Link>
                </Button>
              </>
            )}

            <ThemeToggle />
          </div>

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

      <div
        className={cn(
          "md:hidden border-t border-border bg-background transition-all duration-200 overflow-hidden",
          mobileOpen ? "max-h-[28rem] overflow-y-auto" : "max-h-0",
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => {
            const active = hashLinkActive(link.href);
            const href = onIndexPage
              ? link.href
              : `/${link.href}`.replace(/^\/{2,}/, "/");
            return (
              <Link
                key={link.href}
                href={href}
                className={navItemClassMobile(active)}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={navItemClassMobile(isDashboardSection(path))}
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                {allowNewResume ? (
                  <Link
                    href="/resume/create"
                    className={navItemClassMobile(isCreateResumePath(path))}
                    onClick={() => setMobileOpen(false)}
                  >
                    Create Resume
                  </Link>
                ) : (
                  <span className="text-muted-foreground py-1.5 text-sm">
                    Create Resume (limit reached)
                  </span>
                )}
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resumes" onClick={() => setMobileOpen(false)}>
                    My resumes
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/logout" onClick={() => setMobileOpen(false)}>
                    Log out
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    Get started free
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
