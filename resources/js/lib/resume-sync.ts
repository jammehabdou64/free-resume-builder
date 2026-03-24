import type { ResumeData } from "@/lib/resume-types";

export const RESUME_STORAGE_KEY = "resume_builder_data";
export const RESUME_REMOTE_ID_KEY = "resume_builder_remote_id";

export type ResumeSaveResult =
  | { ok: true }
  | { ok: false; error: string };

function resumeLabel(data: ResumeData): string | undefined {
  const name = data.personal?.name?.trim();
  if (name) return name.slice(0, 120);
  return undefined;
}

async function parseErrorMessage(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as { message?: string; max?: number };
    if (typeof j.message === "string") {
      if (res.status === 403 && typeof j.max === "number") {
        return `${j.message} (max ${j.max})`;
      }
      return j.message;
    }
  } catch {
    /* ignore */
  }
  if (res.status === 401) return "Sign in to save your resume to the server.";
  return `Save failed (${res.status})`;
}

/**
 * Reads the latest resume JSON from localStorage and upserts it via `/api/resumes`.
 * Uses cookie auth (`credentials: "include"`).
 */
export async function syncResumeFromLocalStorage(
  dataOverride: ResumeData,
): Promise<ResumeSaveResult> {
  try {
    localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(dataOverride));
  } catch {
    return { ok: false, error: "Could not write to browser storage." };
  }

  const raw = localStorage.getItem(RESUME_STORAGE_KEY);
  if (!raw) {
    return { ok: false, error: "No resume data in storage." };
  }

  let payload: ResumeData;
  try {
    payload = JSON.parse(raw) as ResumeData;
  } catch {
    return { ok: false, error: "Stored resume data is invalid." };
  }

  const body = {
    data: payload as unknown as Record<string, unknown>,
    label: resumeLabel(payload),
  };

  let remoteId = localStorage.getItem(RESUME_REMOTE_ID_KEY);

  if (remoteId) {
    const res = await fetch(`/api/resumes/${encodeURIComponent(remoteId)}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 404) {
      localStorage.removeItem(RESUME_REMOTE_ID_KEY);
      remoteId = null;
    } else if (res.ok) {
      return { ok: true };
    } else {
      return { ok: false, error: await parseErrorMessage(res) };
    }
  }

  if (!remoteId) {
    const res = await fetch("/api/resumes", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      try {
        const created = (await res.json()) as { id?: string };
        if (created.id) {
          localStorage.setItem(RESUME_REMOTE_ID_KEY, created.id);
        }
      } catch {
        /* ignore */
      }
      return { ok: true };
    }

    return { ok: false, error: await parseErrorMessage(res) };
  }

  return { ok: false, error: "Could not sync resume." };
}
