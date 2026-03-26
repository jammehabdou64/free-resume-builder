import { Head, usePage } from "@inertiajs/react";
import { ResumeBuilder } from "@/Components/resume/resume-builder";
import type { ServerLoadedResume } from "@/lib/resume-context";

export default function Resume() {
  const { loadedResume } = usePage().props as {
    loadedResume?: ServerLoadedResume;
  };

  return (
    <>
      <Head title="ResumeForge – Professional Resume Builder" />
      <ResumeBuilder initialFromServer={loadedResume ?? null} />
    </>
  );
}
