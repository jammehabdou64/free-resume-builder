import type { Area } from "react-easy-crop";

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = url;
  });
}

/** Max edge length for stored profile image (keeps DB/localStorage small). */
const PROFILE_OUTPUT_PX = 384;
/** JPEG quality — tuned for smaller files while staying sharp on resume previews. */
const PROFILE_JPEG_QUALITY = 0.78;

/**
 * Renders the pixel crop into a downscaled square JPEG data URL (much smaller than typical uploads).
 */
export async function cropImageToSquareDataUrl(
  imageSrc: string,
  pixelCrop: Area,
  outputSize = PROFILE_OUTPUT_PX,
): Promise<string> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");
  canvas.width = outputSize;
  canvas.height = outputSize;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize,
  );
  return canvas.toDataURL("image/jpeg", PROFILE_JPEG_QUALITY);
}
