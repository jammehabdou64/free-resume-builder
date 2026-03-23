import type { CSSProperties } from "react";
import type { PersonalInfo } from "@/lib/resume-types";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PersonalContactVariant = "card" | "headerInset" | "sidebar" | "terminal";

interface PersonalContactPreviewProps {
  personal: PersonalInfo;
  variant?: PersonalContactVariant;
  /** Used by `terminal` for link-style lines */
  accentColor?: string;
  className?: string;
}

function ContactLine({
  icon: Icon,
  children,
  iconClassName,
  textClassName,
  linkStyle,
}: {
  icon: LucideIcon;
  children: string;
  iconClassName?: string;
  textClassName?: string;
  linkStyle?: CSSProperties;
}) {
  return (
    <div className="flex min-w-0 max-w-full items-center gap-2">
      <Icon
        className={cn("h-3.5 w-3.5 shrink-0", iconClassName)}
        strokeWidth={2}
        aria-hidden
      />
      <span
        className={cn("min-w-0 break-all text-xs leading-snug", textClassName)}
        style={linkStyle}
      >
        {children}
      </span>
    </div>
  );
}

function collectRow1(
  personal: PersonalInfo,
): { icon: LucideIcon; value: string; link?: boolean }[] {
  const out: { icon: LucideIcon; value: string; link?: boolean }[] = [];
  if (personal.email?.trim()) out.push({ icon: Mail, value: personal.email.trim() });
  if (personal.phone?.trim()) out.push({ icon: Phone, value: personal.phone.trim() });
  if (personal.linkedin?.trim())
    out.push({ icon: Linkedin, value: personal.linkedin.trim(), link: true });
  if (personal.website?.trim())
    out.push({ icon: Globe, value: personal.website.trim(), link: true });
  if (personal.github?.trim())
    out.push({ icon: Github, value: personal.github.trim(), link: true });
  return out;
}

export function PersonalContactPreview({
  personal,
  variant = "card",
  accentColor,
  className,
}: PersonalContactPreviewProps) {
  const row1 = collectRow1(personal);
  const loc = personal.location?.trim() ?? "";
  if (row1.length === 0 && !loc) return null;

  const accent = accentColor || "#10b981";

  if (variant === "sidebar") {
    return (
      <div className={cn("space-y-2", className)}>
        {row1.map((item, i) => (
          <ContactLine
            key={`${item.value}-${i}`}
            icon={item.icon}
            iconClassName="text-white/85"
            textClassName="text-white/75"
          >
            {item.value}
          </ContactLine>
        ))}
        {loc ? (
          <ContactLine icon={MapPin} iconClassName="text-white/85" textClassName="text-white/75">
            {loc}
          </ContactLine>
        ) : null}
      </div>
    );
  }

  if (variant === "terminal") {
    return (
      <div
        className={cn(
          "rounded-md border border-neutral-700 bg-neutral-900/50 px-3 py-2.5",
          className,
        )}
      >
        {row1.length > 0 ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {row1.map((item, i) => (
              <ContactLine
                key={`${item.value}-${i}`}
                icon={item.icon}
                iconClassName="text-neutral-500"
                textClassName={item.link ? "text-neutral-300" : "text-neutral-400"}
                linkStyle={item.link ? { color: accent } : undefined}
              >
                {item.value}
              </ContactLine>
            ))}
          </div>
        ) : null}
        {loc ? (
          <div className={row1.length > 0 ? "mt-2 border-t border-neutral-700/80 pt-2" : ""}>
            <ContactLine
              icon={MapPin}
              iconClassName="text-neutral-500"
              textClassName="text-neutral-400"
            >
              {loc}
            </ContactLine>
          </div>
        ) : null}
      </div>
    );
  }

  if (variant === "headerInset") {
    return (
      <div
        className={cn(
          "mt-4 rounded-lg bg-white/15 px-4 py-3 backdrop-blur-[2px]",
          className,
        )}
      >
        {row1.length > 0 ? (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {row1.map((item, i) => (
              <ContactLine
                key={`${item.value}-${i}`}
                icon={item.icon}
                iconClassName="text-white"
                textClassName="text-white/90"
              >
                {item.value}
              </ContactLine>
            ))}
          </div>
        ) : null}
        {loc ? (
          <div className={row1.length > 0 ? "mt-2.5" : ""}>
            <ContactLine
              icon={MapPin}
              iconClassName="text-white"
              textClassName="text-white/90"
            >
              {loc}
            </ContactLine>
          </div>
        ) : null}
      </div>
    );
  }

  // card — light panel like reference
  return (
    <div className={cn("rounded-lg bg-neutral-100 px-4 py-3", className)}>
      {row1.length > 0 ? (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {row1.map((item, i) => (
            <ContactLine
              key={`${item.value}-${i}`}
              icon={item.icon}
              iconClassName="text-neutral-900"
              textClassName="text-neutral-700"
            >
              {item.value}
            </ContactLine>
          ))}
        </div>
      ) : null}
      {loc ? (
        <div className={row1.length > 0 ? "mt-2.5" : ""}>
          <ContactLine
            icon={MapPin}
            iconClassName="text-neutral-900"
            textClassName="text-neutral-700"
          >
            {loc}
          </ContactLine>
        </div>
      ) : null}
    </div>
  );
}
