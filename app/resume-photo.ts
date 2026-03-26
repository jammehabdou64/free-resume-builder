/**
 * Fallback when resume JSON still contains a data URL (e.g. guest draft or legacy save).
 * Preferred: multipart `POST /resume/photo` with `req.file("photo").store(...)` (docs-for-dev.md).
 */
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import appRoot from "app-root-path";

const DATA_URL_RE = /^data:image\/(jpeg|jpg|png);base64,([\s\S]+)$/i;
/** Cropped resume headshots only; reject huge payloads */
const MAX_PHOTO_BYTES = 600_000;

/**
 * If `photo` is a data URL, write it under public/uploads and return a site-relative URL.
 * Otherwise return the string unchanged (already a URL/path) or null.
 */
export async function materializePersonalPhotoDataUrl(
  photo: unknown,
  userId: string,
): Promise<string | null> {
  if (photo == null || typeof photo !== "string") return null;
  const s = photo.trim();
  if (!s) return null;

  const m = s.match(DATA_URL_RE);
  if (!m) return s;

  const ext = m[1].toLowerCase() === "png" ? "png" : "jpg";
  const buf = Buffer.from(m[2].replace(/\s/g, ""), "base64");
  if (!buf.length || buf.length > MAX_PHOTO_BYTES) {
    throw new Error("Profile photo is too large.");
  }

  const isPng = buf[0] === 0x89 && buf[1] === 0x50;
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8;
  if (ext === "png" && !isPng) throw new Error("Invalid profile image.");
  if (ext !== "png" && !isJpeg) throw new Error("Invalid profile image.");

  const dir = path.join(
    appRoot.path,
    "public",
    "uploads",
    "resume-photos",
    userId,
  );
  await fs.mkdir(dir, { recursive: true });
  const name = `${crypto.randomUUID()}.${ext}`;
  await fs.writeFile(path.join(dir, name), buf);
  return `/uploads/resume-photos/${userId}/${name}`;
}

/** Clone resume `data` and replace inline photo with a stored URL when needed. */
export async function resumeDataWithStoredPhoto(
  data: Record<string, unknown>,
  userId: string,
): Promise<Record<string, unknown>> {
  const out = { ...data };
  const personal = out.personal;
  if (
    personal &&
    typeof personal === "object" &&
    personal !== null &&
    !Array.isArray(personal)
  ) {
    const p = { ...(personal as Record<string, unknown>) };
    p.photo = await materializePersonalPhotoDataUrl(p.photo, userId);
    out.personal = p;
  }
  return out;
}
