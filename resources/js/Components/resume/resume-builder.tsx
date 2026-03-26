import { EditorSidebar } from "@/Components/resume/editor/editor-sidebar";
import { ResumePreview } from "@/Components/resume/preview/resume-preview";
import { ResumeProvider, type ServerLoadedResume } from "@/lib/resume-context";
import { ThemeToggle } from "@/Components/resume/theme-toggle";
import { FileText } from "lucide-react";
import { Link } from "@inertiajs/react";

export function ResumeBuilder({
  initialFromServer = null,
}: {
  initialFromServer?: ServerLoadedResume | null;
}) {
  return (
    <ResumeProvider initialFromServer={initialFromServer}>
      <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden">
        <header className="border-border bg-card z-10 flex shrink-0 items-center justify-between border-b px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md">
              <FileText className="text-primary-foreground h-4 w-4" />
            </div>
            <div>
              <h1 className="text-foreground text-sm leading-none font-bold">
                ResumeForge
              </h1>
              <p className="text-muted-foreground mt-0.5 text-xs leading-none">
                Professional Resume Builder
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground hidden text-xs sm:block">
              Draft saved in this browser — Save syncs to your account
            </p>
            <nav className="flex items-center gap-2 text-xs">
              <Link
                href="/resume"
                className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                New draft
              </Link>
              <Link
                href="/resumes"
                className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                My resumes
              </Link>
              <Link
                href="/home"
                className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Home
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex h-full min-h-0 w-80 xl:w-2xl shrink-0 flex-col overflow-hidden">
            <EditorSidebar />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeProvider>
  );
}
