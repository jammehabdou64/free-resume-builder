import type { CSSProperties } from "react";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TemplateId } from "@/lib/resume-types";

export type DashboardResumePreview = {
  id: string;
  label: string;
  updatedAt: string;
  createdAt?: string;
  templateId: string;
  accentColor: string;
  displayName: string;
  displayTitle: string;
};

const templateHeaderClass: Partial<Record<TemplateId, string>> = {
  professional: "from-slate-800 to-slate-700",
  creative: "from-violet-600 to-fuchsia-600",
  tech: "from-emerald-900 to-emerald-800",
  elegant: "from-stone-700 to-stone-600",
  minimal: "from-neutral-200 to-neutral-100",
};

function headerTone(templateId: string, accent: string): {
  className?: string;
  style?: CSSProperties;
} {
  const t = templateId as TemplateId;
  const gradient = templateHeaderClass[t];
  if (gradient) {
    return {
      className: cn("bg-gradient-to-br", gradient),
      style:
        t === "minimal"
          ? { borderBottom: `3px solid ${accent}` }
          : undefined,
    };
  }
  return {
    style: {
      background: `linear-gradient(135deg, ${accent} 0%, color-mix(in srgb, ${accent} 65%, black) 100%)`,
    },
  };
}

export function DashboardResumePreviewCard({
  resume,
}: {
  resume: DashboardResumePreview;
}) {
  const { className: headerClass, style: headerStyle } = headerTone(
    resume.templateId,
    resume.accentColor,
  );
  const name = resume.displayName.trim() || resume.label || "Untitled";
  const title = resume.displayTitle.trim();
  const updated =
    resume.updatedAt && !Number.isNaN(new Date(resume.updatedAt).getTime())
      ? new Date(resume.updatedAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  return (
    <Link
      href={`/resume/preview/${resume.id}`}
      className="group border-border bg-card text-card-foreground focus-visible:ring-ring block overflow-hidden rounded-2xl border shadow-sm transition-all hover:border-primary/50 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none"
    >
      <div
        className={cn(
          "relative flex min-h-[7.5rem] flex-col justify-end px-4 pb-3 pt-6 sm:min-h-[8.5rem]",
          headerClass,
        )}
        style={headerStyle}
      >
        <div
          className={cn(
            "space-y-1",
            resume.templateId === "minimal"
              ? "text-neutral-900"
              : "text-white",
        )}
        >
          <p className="text-sm font-semibold leading-tight tracking-tight">
            {name}
          </p>
          {title ? (
            <p
              className={cn(
                "line-clamp-2 text-xs leading-snug opacity-90",
                resume.templateId === "minimal"
                  ? "text-neutral-600"
                  : "text-white/85",
              )}
            >
              {title}
            </p>
          ) : (
            <p
              className={cn(
                "text-xs italic opacity-70",
                resume.templateId === "minimal"
                  ? "text-neutral-500"
                  : "text-white/70",
              )}
            >
              No title yet
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-2">
          <div className="bg-muted/80 h-1.5 w-full rounded-full" />
          <div className="bg-muted/80 h-1.5 w-[88%] rounded-full" />
          <div className="bg-muted/80 h-1.5 w-[72%] rounded-full" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span
            className="text-muted-foreground rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
          >
            {resume.templateId}
          </span>
        </div>
        <div className="text-muted-foreground flex items-center justify-between gap-2 border-t border-border pt-3 text-xs">
          <span>Updated {updated}</span>
          <span className="text-primary inline-flex items-center gap-0.5 font-medium group-hover:underline">
            Open
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
