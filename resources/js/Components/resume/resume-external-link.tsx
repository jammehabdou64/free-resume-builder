import type { CSSProperties, ReactNode } from "react";
import { normalizeExternalHref } from "@/lib/external-url";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function ResumeExternalLink({ href, className, style, children }: Props) {
  const url = normalizeExternalHref(href);
  if (!url) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "cursor-pointer break-all underline-offset-2 hover:underline",
        className,
      )}
      style={style}
    >
      {children}
    </a>
  );
}
