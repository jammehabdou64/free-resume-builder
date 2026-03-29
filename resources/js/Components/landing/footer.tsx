import { Link } from "@inertiajs/react";
import { BrandLogo } from "@/Components/brand-logo";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "Pricing", href: "#pricing" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Resume Tips", href: "#" },
    { label: "Cover Letter Guide", href: "#" },
    { label: "Interview Prep", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JCC Resume. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
