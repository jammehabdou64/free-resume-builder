import { useState } from "react";
import html2canvas from "html2canvas-pro";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Download, FileImage, FileText, Loader2 } from "lucide-react";
import { useResume } from "@/lib/resume-context";

/**
 * Tailwind v4 uses oklab/oklch — use html2canvas-pro (not legacy html2canvas).
 *
 * Production: prefer html-to-image (SVG foreignObject → accurate paint). If it fails, use pro.
 * Vite dev: skip html-to-image — it inlines stylesheets via cssRules; Vite HMR serves JS-in-CSS
 * and opaque cross-origin sheets, which throws SecurityError / insertRule parse errors.
 */
const CAPTURE_STYLE: Partial<CSSStyleDeclaration> = {
  transform: "none",
  marginBottom: "0",
  transformOrigin: "top left",
};

const isViteDev = import.meta.env.DEV;

/** PNG export: sharper on screen; PDF uses lower ratio + JPEG to avoid 10–20MB files. */
const CAPTURE_PIXEL_RATIO_PNG = 2;
const CAPTURE_PIXEL_RATIO_PDF = 1.5;
/** JPEG quality for embedded PDF images (0.8–0.9 keeps text readable, much smaller than PNG). */
const PDF_JPEG_QUALITY = 0.78;

function triggerDownload(href: string, filename: string): void {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function renderWithHtml2CanvasPro(
  el: HTMLElement,
  scale: number,
): Promise<HTMLCanvasElement> {
  const prev = {
    transform: el.style.transform,
    marginBottom: el.style.marginBottom,
    transformOrigin: el.style.transformOrigin,
  };
  el.style.transform = "none";
  el.style.marginBottom = "0";
  el.style.transformOrigin = "top left";
  try {
    return await html2canvas(el, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
  } finally {
    el.style.transform = prev.transform;
    el.style.marginBottom = prev.marginBottom;
    el.style.transformOrigin = prev.transformOrigin;
  }
}

async function renderResumeToCanvas(
  el: HTMLElement,
  pixelRatio: number,
): Promise<HTMLCanvasElement> {
  if (!isViteDev) {
    try {
      const { toCanvas } = await import("html-to-image");
      return await toCanvas(el, {
        pixelRatio,
        backgroundColor: "#ffffff",
        cacheBust: true,
        style: CAPTURE_STYLE,
      });
    } catch (err) {
      console.warn(
        "html-to-image failed, falling back to html2canvas-pro:",
        err,
      );
    }
  }

  return renderWithHtml2CanvasPro(el, pixelRatio);
}

export function ExportMenu() {
  const { data } = useResume();
  const [exporting, setExporting] = useState<"pdf" | "png" | null>(null);

  const getResumeEl = (): HTMLElement | null => {
    const n = document.getElementById("resume-preview-root");
    return n instanceof HTMLElement ? n : null;
  };

  const runExport = async (kind: "pdf" | "png") => {
    const el = getResumeEl();
    if (!el) {
      console.error("Export: #resume-preview-root not found");
      return;
    }

    setExporting(kind);
    try {
      const pixelRatio =
        kind === "pdf" ? CAPTURE_PIXEL_RATIO_PDF : CAPTURE_PIXEL_RATIO_PNG;
      const canvas = await renderResumeToCanvas(el, pixelRatio);
      const baseName = data.personal.name?.replace(/\s+/g, "_") || "resume";

      if (kind === "png") {
        const dataUrl = canvas.toDataURL("image/png");
        triggerDownload(dataUrl, `${baseName}_resume.png`);
        return;
      }

      const { jsPDF } = await import("jspdf");
      const imgData = canvas.toDataURL("image/jpeg", PDF_JPEG_QUALITY);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgRatio = canvas.height / canvas.width;
      const imgHeight = pdfWidth * imgRatio;

      if (imgHeight <= pdfHeight) {
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          pdfWidth,
          imgHeight,
          undefined,
          "FAST",
        );
      } else {
        /** Source pixels that map to one full PDF page height (width is fitted to pdfWidth). */
        const sliceHeightPx = (pdfHeight / pdfWidth) * canvas.width;
        let srcY = 0;
        while (srcY < canvas.height) {
          if (srcY > 0) pdf.addPage();
          const drawH = Math.min(sliceHeightPx, canvas.height - srcY);
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.max(1, drawH);
          const ctx = pageCanvas.getContext("2d");
          if (ctx && drawH > 0) {
            ctx.drawImage(
              canvas,
              0,
              srcY,
              canvas.width,
              drawH,
              0,
              0,
              canvas.width,
              drawH,
            );
          }
          /** Keep slice aspect ratio — never force to full page height or text stretches vertically. */
          const sliceHeightMm = pdfWidth * (drawH / canvas.width);
          pdf.addImage(
            pageCanvas.toDataURL("image/jpeg", PDF_JPEG_QUALITY),
            "JPEG",
            0,
            0,
            pdfWidth,
            sliceHeightMm,
            undefined,
            "FAST",
          );
          srcY += drawH;
        }
      }

      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      try {
        triggerDownload(url, `${baseName}_resume.pdf`);
      } finally {
        window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
      }
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          {exporting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="text-xs">
          Download Resume
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={!!exporting}
          className="gap-2 text-xs"
          onSelect={() => {
            void runExport("pdf");
          }}
        >
          <FileText className="h-3.5 w-3.5" />
          {exporting === "pdf" ? "Exporting..." : "Download PDF"}
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!!exporting}
          className="gap-2 text-xs"
          onSelect={() => {
            void runExport("png");
          }}
        >
          <FileImage className="h-3.5 w-3.5" />
          {exporting === "png" ? "Exporting..." : "Download PNG"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
