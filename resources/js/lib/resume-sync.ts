import { router } from "@inertiajs/react";
import type { ResumeData } from "@/lib/resume-types";

export const RESUME_STORAGE_KEY = "resume_builder_data";
export const RESUME_REMOTE_ID_KEY = "resume_builder_remote_id";

export type ResumeSaveResult = { ok: true } | { ok: false; error: string };

function resumeLabel(data: ResumeData): string | undefined {
  const name = data.personal?.name?.trim();
  if (name) return name.slice(0, 120);
  return undefined;
}

/**
 * Flush draft to localStorage, then sync that JSON via an Inertia POST to `/resume/sync`
 * (session cookie auth, same as other Inertia forms).
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

  const resumeId = localStorage.getItem(RESUME_REMOTE_ID_KEY) ?? "";

  return new Promise((resolve) => {
    let settled = false;
    const finish = (r: ResumeSaveResult) => {
      if (!settled) {
        settled = true;
        resolve(r);
      }
    };

    router.post(
      "/resume/sync",
      {
        data: payload,
        label: resumeLabel(payload) ?? "",
        resume_id: resumeId,
      } as unknown as Parameters<typeof router.post>[1],
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page) => {
          if (page.url.includes("/login")) {
            finish({
              ok: false,
              error: "Sign in to save your resume to the server.",
            });
            return;
          }
          const p = page.props as { resumeRemoteSync?: { id?: string } };
          if (p.resumeRemoteSync?.id) {
            localStorage.setItem(RESUME_REMOTE_ID_KEY, p.resumeRemoteSync.id);
          }
          finish({ ok: true });
        },
        onError: (errors) => {
          const e = errors as Record<string, string | string[]>;
          const save = e.save;
          const msg = Array.isArray(save)
            ? save[0]
            : typeof save === "string"
              ? save
              : "Save failed";
          finish({ ok: false, error: String(msg) });
        },
        onFinish: () => {
          if (!settled) {
            finish({
              ok: false,
              error: "Save could not complete. Sign in and try again.",
            });
          }
        },
      },
    );
  });
}
