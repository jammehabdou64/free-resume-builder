import { Head, usePage } from "@inertiajs/react";
import { ResumeBuilder } from "@/Components/resume/resume-builder";
import type { ServerLoadedResume } from "@/lib/resume-context";

export default function Resume() {
  const { loadedResume, startFresh, maxResumesPerUser, canCreateResume } =
    usePage().props as {
      loadedResume?: ServerLoadedResume;
      startFresh?: boolean;
      maxResumesPerUser?: number;
      canCreateResume?: boolean;
    };

  return (
    <>
      <Head title="ResumeForge – Professional Resume Builder" />
      <ResumeBuilder
        initialFromServer={loadedResume ?? null}
        startFresh={Boolean(startFresh)}
        maxResumesPerUser={maxResumesPerUser ?? 3}
        canCreateResume={canCreateResume !== false}
      />
    </>
  );
}
