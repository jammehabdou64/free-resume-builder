import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { cropImageToSquareDataUrl } from "@/lib/crop-profile-image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Slider } from "@/Components/ui/slider";
import { Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  imageSrc: string;
  onOpenChange: (open: boolean) => void;
  onApply: (croppedDataUrl: string) => void;
};

export function PhotoCropDialog({
  open,
  imageSrc,
  onOpenChange,
  onApply,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!open || !imageSrc) return;
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, [open, imageSrc]);

  const onCropComplete = useCallback((_area: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleApply = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    setApplying(true);
    try {
      const dataUrl = await cropImageToSquareDataUrl(imageSrc, croppedAreaPixels);
      onApply(dataUrl);
      onOpenChange(false);
    } catch {
      /* ignore */
    } finally {
      setApplying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-4">
        <DialogHeader>
          <DialogTitle>Crop profile photo</DialogTitle>
          <DialogDescription>
            Drag to reposition and use the slider to zoom. The saved image is compressed (smaller file
            than your original) for faster loading and storage.
          </DialogDescription>
        </DialogHeader>

        {imageSrc ? (
          <>
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-black">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="space-y-2 px-1">
              <p className="text-muted-foreground text-xs">Zoom</p>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.02}
                onValueChange={(v) => setZoom(v[0] ?? 1)}
              />
            </div>
          </>
        ) : null}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!croppedAreaPixels || applying}
            onClick={() => void handleApply()}
          >
            {applying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Apply crop"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
