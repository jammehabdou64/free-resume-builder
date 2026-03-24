import { useResume } from "@/lib/resume-context";
import { ResumeTemplate } from "@/Components/resume/templates/resume-template";
import { TemplatePicker } from "@/Components/resume/preview/template-picker";
import { ExportMenu } from "@/Components/resume/preview/export-menu";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Button } from "@/Components/ui/button";
import { ZoomIn, ZoomOut, Save, Check, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ResumePreview() {
  const { data, saveNow } = useResume();
  const [zoom, setZoom] = useState(0.75);
  const [saveFeedback, setSaveFeedback] = useState<"idle" | "saved" | "error">("idle");
  const [saveSaving, setSaveSaving] = useState(false);
  const [saveErrorDetail, setSaveErrorDetail] = useState<string | null>(null);
  const saveFeedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveFeedbackTimer.current) clearTimeout(saveFeedbackTimer.current);
    };
  }, []);

  const handleSave = () => {
    setSaveErrorDetail(null);
    setSaveSaving(true);
    void (async () => {
      try {
        const result = await saveNow();
        if (result.ok) {
          setSaveFeedback("saved");
          setSaveErrorDetail(null);
        } else {
          setSaveFeedback("error");
          setSaveErrorDetail(result.error);
        }
      } catch {
        setSaveFeedback("error");
        setSaveErrorDetail("Network error while saving.");
      } finally {
        setSaveSaving(false);
        if (saveFeedbackTimer.current) clearTimeout(saveFeedbackTimer.current);
        saveFeedbackTimer.current = setTimeout(() => {
          setSaveFeedback("idle");
          setSaveErrorDetail(null);
        }, 4000);
      }
    })();
  };

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
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 text-xs"
            disabled={saveSaving}
            title={saveErrorDetail ?? undefined}
            onClick={handleSave}
          >
            {saveSaving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving…
              </>
            ) : saveFeedback === "saved" ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Saved
              </>
            ) : saveFeedback === "error" ? (
              <>
                <Save className="h-3.5 w-3.5" />
                Save failed
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                Save
              </>
            )}
          </Button>
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
