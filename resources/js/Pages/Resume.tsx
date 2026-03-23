import { Head } from "@inertiajs/react";
import { ResumeBuilder } from "@/Components/resume/resume-builder";

export default function Resume() {
  return (
    <>
      <Head title="ResumeForge – Professional Resume Builder" />
      <ResumeBuilder />
    </>
  );
}
