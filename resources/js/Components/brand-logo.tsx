import { cn } from "@/lib/utils";

type BrandLogoProps = {
  /** `on-light`: dark text for white/light UI. `on-dark`: light text for blue/dark panels. */
  variant: "on-light" | "on-dark";
  className?: string;
  alt?: string;
};

/**
 * Brand mark from `public/light-logo.svg` / `public/dark-logo.svg`.
 */
export function BrandLogo({
  variant,
  className,
  alt = "JCC Resume",
}: BrandLogoProps) {
  if (variant === "on-dark") {
    return (
      <img
        src="/dark-logo.svg"
        alt={alt}
        width={220}
        height={48}
        className={cn(
          "h-8 w-auto shrink-0 object-contain object-left",
          className,
        )}
      />
    );
  }

  /* Light UI: dark text mark. Dark UI (html.dark): light text mark. */
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <img
        src="/light-logo.svg"
        alt={alt}
        width={220}
        height={48}
        style={{ height: "44px" }}
        className=" w-auto object-contain object-left dark:hidden"
      />
      <img
        src="/dark-logo.svg"
        alt=""
        width={220}
        height={48}
        aria-hidden
        style={{ height: "44px" }}
        className="hidden  w-auto object-contain object-left dark:block"
      />
    </span>
  );
}
