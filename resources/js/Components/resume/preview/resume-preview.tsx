import { useResume } from "@/lib/resume-context";
import { ResumeTemplate } from "@/Components/resume/templates/resume-template";
import { TemplatePicker } from "@/Components/resume/preview/template-picker";
import { ExportMenu } from "@/Components/resume/preview/export-menu";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ResumePreview() {
  const { data } = useResume();
  const [zoom, setZoom] = useState(0.75);

  return (
    <div className="bg-muted/40 flex h-full flex-col">
      <div className="border-border bg-card flex items-center justify-between border-b px-4 py-2.5">
        <h2 className="text-foreground text-sm font-semibold">Preview</h2>
        <div className="flex items-center gap-2">
          <div className="border-border flex items-center gap-1 overflow-hidden rounded-md border">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}
              className="hover:bg-muted p-1.5 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="text-muted-foreground h-3.5 w-3.5" />
            </button>
            <span className="text-muted-foreground px-1.5 font-mono text-xs">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.2, z + 0.1))}
              className="hover:bg-muted p-1.5 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="text-muted-foreground h-3.5 w-3.5" />
            </button>
          </div>
          <ExportMenu />
        </div>
      </div>

      <TemplatePicker />

      <ScrollArea className="flex-1">
        <div className="flex min-h-full justify-center p-6">
          <div
            className={cn(
              "origin-top overflow-hidden rounded-sm shadow-xl transition-all duration-200",
              data.selectedTemplate === "tech"
                ? "shadow-emerald-900/20"
                : "shadow-neutral-300/60",
            )}
            style={{
              width: `${210 * 3.7795275591}px`,
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              marginBottom: `${(1 - zoom) * -100 * 11.69 * 0.3795}px`,
            }}
            id="resume-preview-root"
          >
            <ResumeTemplate data={data} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
