import { Head, usePage } from "@inertiajs/react";
import {
  RESUME_REMOTE_ID_KEY,
  RESUME_STORAGE_KEY,
  syncResumeFromLocalStorage,
} from "@/lib/resume-sync";
import type { ResumeData } from "@/lib/resume-types";
import { Check, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

type PendingSync = {
  data?: ResumeData;
  resume_id?: string;
  label?: string;
} | null;

export default function SyncResume() {
  const { pendingResumeLoginData } = usePage().props as {
    pendingResumeLoginData?: PendingSync;
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      let payload: ResumeData | null = null;
      if (pendingResumeLoginData?.data) {
        payload = pendingResumeLoginData.data;
      } else {
        try {
          const raw = localStorage.getItem(RESUME_STORAGE_KEY);
          if (raw) payload = JSON.parse(raw) as ResumeData;
        } catch {
          /* ignore */
        }
      }
      if (!payload) {
        setError("No resume data to save.");
        setLoading(false);
        return;
      }
      if (pendingResumeLoginData?.resume_id) {
        localStorage.setItem(
          RESUME_REMOTE_ID_KEY,
          pendingResumeLoginData.resume_id,
        );
      }
      const result = await syncResumeFromLocalStorage(payload);
      if (result.ok && result.id) {
        /* Server redirects POST /resume/sync → GET /resume/preview/:id; Inertia follows it. */
        return;
      }
      setError(result.ok ? "Save failed." : result.error);
      setLoading(false);
    };
    void run();
  }, [pendingResumeLoginData]);

  return (
    <>
      <Head title="ResumeForge – Saving your resume" />
      <div className="flex items-center justify-center h-screen relative">
        {loading && <Loader2 className="w-25 h-25 animate-spin" />}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-sm px-4">
          {loading ? (
            "Saving…"
          ) : error ? (
            <span className="text-destructive text-sm">{error}</span>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Saved</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
