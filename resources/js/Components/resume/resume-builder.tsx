import { EditorSidebar } from "@/Components/resume/editor/editor-sidebar";
import { ResumePreview } from "@/Components/resume/preview/resume-preview";
import { ResumeProvider, type ServerLoadedResume } from "@/lib/resume-context";
import { ThemeToggle } from "@/Components/resume/theme-toggle";
import { BrandLogo } from "@/Components/brand-logo";
import { Link } from "@inertiajs/react";

export function ResumeBuilder({
  initialFromServer = null,
  startFresh = false,
  maxResumesPerUser = 3,
  canCreateResume = true,
}: {
  initialFromServer?: ServerLoadedResume | null;
  /** When true (e.g. `/resume/create`), ignore stored draft/id so save creates a new resume. */
  startFresh?: boolean;
  maxResumesPerUser?: number;
  canCreateResume?: boolean;
}) {
  return (
    <ResumeProvider
      initialFromServer={initialFromServer}
      startFresh={startFresh}
    >
      <div className="bg-background text-foreground flex h-screen flex-col overflow-hidden">
        <header className="border-border bg-card z-10 flex shrink-0 items-center justify-between border-b px-5 py-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <Link href="/" className="inline-flex max-w-[min(100%,200px)]">
              <BrandLogo variant="on-light" className="h-7 w-auto max-w-[160px]" />
            </Link>
            <p className="text-muted-foreground text-xs leading-none">
              Professional resume builder
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-muted-foreground hidden text-xs sm:block">
              Draft saved in this browser — Save syncs to your account
            </p>
            <nav className="flex items-center gap-2 text-xs">
              {canCreateResume ? (
                <Link
                  href="/resume/create"
                  className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
                >
                  New draft
                </Link>
              ) : (
                <span
                  className="text-muted-foreground cursor-not-allowed opacity-70"
                  title={`You can save up to ${maxResumesPerUser} resumes. Delete one from your dashboard to start another.`}
                >
                  New draft
                </span>
              )}
              <Link
                href="/resumes"
                className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                My resumes
              </Link>
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Dashboard
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
