import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "s",
  "strike",
  "ul",
  "ol",
  "li",
];

/**
 * Renders experience/education description: plain text (legacy) or sanitized HTML from TipTap.
 */
export function ResumeDescriptionHtml({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  if (!html?.trim()) return null;
  const trimmed = html.trim();
  if (!trimmed.includes("<")) {
    return <p className={cn("whitespace-pre-line", className)}>{trimmed}</p>;
  }
  const clean = DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: [],
  });
  const textOnly = clean.replace(/<[^>]*>/g, "").trim();
  if (!textOnly) return null;
  return (
    <div
      className={cn(
        "[&_li]:my-0 [&_ol]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:my-0.5 [&_ul]:my-0.5 [&_ul]:list-disc [&_ul]:pl-4",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
