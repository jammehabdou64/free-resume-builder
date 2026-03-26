/**
 * POST /resume/photo (auth) — multipart field `photo`, per jcc-express-mvc docs (req.file().store()).
 */
export async function uploadResumeProfilePhoto(dataUrl: string): Promise<string> {
  const blob = await fetch(dataUrl).then((r) => r.blob());
  const form = new FormData();
  form.append("photo", blob, "profile.jpg");

  const res = await fetch("/resume/photo", {
    method: "POST",
    body: form,
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  const json = (await res.json()) as { url?: string; message?: string };
  if (!res.ok) {
    throw new Error(json.message ?? "Upload failed");
  }
  if (!json.url) {
    throw new Error("Server did not return a photo URL.");
  }
  return json.url;
}
