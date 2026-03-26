import { useState } from "react";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and understated. Perfect for creative fields.",
    accentColor: "bg-foreground",
    preview: {
      headerBg: "bg-card",
      accentLine: "bg-foreground",
      accent: "bg-foreground/20",
    },
  },
  {
    id: "professional",
    name: "Professional",
    description: "Classic and polished. Great for corporate roles.",
    accentColor: "bg-blue-600",
    preview: {
      headerBg: "bg-blue-600",
      accentLine: "bg-blue-600",
      accent: "bg-blue-100",
    },
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold sidebar layout. Ideal for designers.",
    accentColor: "bg-rose-500",
    preview: {
      headerBg: "bg-rose-500",
      accentLine: "bg-rose-500",
      accent: "bg-rose-100",
    },
  },
  {
    id: "developer",
    name: "Developer",
    description: "Dark terminal aesthetic. Built for engineers.",
    accentColor: "bg-slate-800",
    preview: {
      headerBg: "bg-slate-800",
      accentLine: "bg-emerald-400",
      accent: "bg-emerald-400/20",
    },
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Serif-driven warmth. Suits leadership roles.",
    accentColor: "bg-amber-700",
    preview: {
      headerBg: "bg-amber-50",
      accentLine: "bg-amber-700",
      accent: "bg-amber-100",
    },
  },
];

function TemplateThumbnail({
  template,
  active,
}: {
  template: (typeof templates)[0];
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full aspect-[8.5/11] rounded-lg border-2 overflow-hidden shadow-sm transition-all duration-200 bg-card",
        active
          ? "border-primary shadow-lg scale-[1.02]"
          : "border-border hover:border-primary/40",
      )}
    >
      {/* Header area */}
      <div
        className={cn(
          "h-[22%] p-3 flex flex-col justify-end gap-1",
          template.preview.headerBg,
        )}
      >
        <div
          className={cn(
            "h-3 w-24 rounded",
            template.id === "developer" ? "bg-white/20" : "bg-white/40",
          )}
        />
        <div
          className={cn(
            "h-2 w-16 rounded",
            template.id === "developer" ? "bg-white/10" : "bg-white/30",
          )}
        />
      </div>
      {/* Body */}
      <div className="p-3 flex flex-col gap-2">
        <div
          className={cn("h-1.5 w-16 rounded", template.preview.accentLine)}
        />
        <div className="h-1.5 w-full bg-border/60 rounded" />
        <div className="h-1.5 w-5/6 bg-border/60 rounded" />
        <div className="h-1.5 w-4/6 bg-border/60 rounded" />
        <div
          className={cn("h-1.5 w-14 rounded mt-1", template.preview.accentLine)}
        />
        <div className="h-1.5 w-full bg-border/60 rounded" />
        <div className="h-1.5 w-3/4 bg-border/60 rounded" />
        <div className="flex gap-1 mt-1 flex-wrap">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn("h-3 w-8 rounded-full", template.preview.accent)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TemplatesShowcase() {
  const [activeTemplate, setActiveTemplate] = useState("professional");

  return (
    <section id="templates" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Templates
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance mb-4">
            Five templates, one goal: get hired
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty leading-relaxed">
            Every template is ATS-compatible and carefully crafted by
            professional designers.
          </p>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplate(template.id)}
              className="group flex flex-col gap-3 text-left"
            >
              <TemplateThumbnail
                template={template}
                active={activeTemplate === template.id}
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {template.name}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
