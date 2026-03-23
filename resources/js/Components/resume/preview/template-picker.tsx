import { useResume } from "@/lib/resume-context";
import { TEMPLATE_OPTIONS } from "@/Components/resume/templates/resume-template";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function TemplatePicker() {
  const { data, setTemplate, setAccentColor } = useResume();

  const ACCENT_COLORS = [
    { label: "Blue", value: "#2563eb" },
    { label: "Emerald", value: "#059669" },
    { label: "Cyan", value: "#0891b2" },
    { label: "Amber", value: "#d97706" },
    { label: "Rose", value: "#e11d48" },
    { label: "Slate", value: "#475569" },
    { label: "Indigo", value: "#4f46e5" },
    { label: "Orange", value: "#ea580c" },
  ];

  return (
    <div className="border-border bg-muted/30 border-b px-4 py-3">
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-muted-foreground mr-1 text-xs font-medium">
            Template:
          </span>
          {TEMPLATE_OPTIONS.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => setTemplate(tpl.id)}
              title={tpl.description}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-md border px-3 py-1.5 text-xs whitespace-nowrap transition-all",
                data.selectedTemplate === tpl.id
                  ? "border-primary bg-primary/5 text-primary font-semibold"
                  : "border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground",
              )}
            >
              {data.selectedTemplate === tpl.id && (
                <div className="bg-primary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full">
                  <Check className="text-primary-foreground h-2.5 w-2.5" />
                </div>
              )}
              {tpl.name}
            </button>
          ))}
        </div>

        <div className="bg-border h-6 w-px shrink-0" />

        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-muted-foreground mr-1 text-xs font-medium">
            Color:
          </span>
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setAccentColor(color.value)}
              title={color.label}
              className={cn(
                "h-5 w-5 rounded-full border-2 transition-transform hover:scale-110",
                data.accentColor === color.value
                  ? "border-foreground scale-110"
                  : "border-transparent",
              )}
              style={{ backgroundColor: color.value }}
              aria-label={color.label}
            />
          ))}
          <label
            title="Custom color"
            className="border-muted-foreground hover:border-foreground relative h-5 w-5 cursor-pointer overflow-hidden rounded-full border-2 border-dashed transition-colors"
          >
            <input
              type="color"
              value={data.accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="absolute inset-0 h-8 w-8 -translate-x-1 -translate-y-1 cursor-pointer opacity-0"
            />
            <div
              className="h-full w-full rounded-full"
              style={{ backgroundColor: data.accentColor }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
