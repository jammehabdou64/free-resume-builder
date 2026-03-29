import { Head, Link, usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import { Footer } from "@/Components/landing/footer";
import { DashboardHero } from "@/Components/dashboard/dashboard-hero";
import {
  DashboardResumePreviewCard,
  type DashboardResumePreview,
} from "@/Components/dashboard/dashboard-resume-preview-card";

type ResumeRow = DashboardResumePreview;

export default function Dashboard() {
  const {
    resumes = [],
    maxResumesPerUser = 3,
    canCreateResume = true,
    resumeLimitNotice = false,
    auth,
    dashboardUser,
  } = usePage().props as unknown as {
    resumes?: ResumeRow[];
    maxResumesPerUser?: number;
    canCreateResume?: boolean;
    resumeLimitNotice?: boolean;
    auth?: { name?: string; email?: string };
    dashboardUser?: { name?: string; email?: string };
  };

  const greetingName =
    dashboardUser?.name?.trim() ||
    dashboardUser?.email?.split("@")[0]?.trim() ||
    auth?.name?.trim() ||
    auth?.email?.split("@")[0]?.trim() ||
    "there";

  return (
    <>
      <Head title="Dashboard" />
      <Header />
      <div className="bg-background text-foreground flex min-h-screen flex-col">
        <DashboardHero
          greetingName={greetingName}
          resumeCount={resumes.length}
          maxResumes={maxResumesPerUser}
          canCreateResume={canCreateResume}
        />

        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
          {resumeLimitNotice && (
            <p
              className="border-destructive/30 bg-destructive/10 text-destructive mb-8 rounded-lg border px-4 py-3 text-sm"
              role="alert"
            >
              You already have {maxResumesPerUser} saved resumes, which is the
              limit for your account. Delete a resume below (or on{" "}
              <Link href="/resumes" className="underline font-medium">
                My resumes
              </Link>
              ) to free a slot before creating a new one.
            </p>
          )}

          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-foreground text-2xl font-bold tracking-tight">
                Your resumes
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Preview cards link to the full editor and live preview.
              </p>
            </div>
          </div>

          {resumes.length === 0 ? (
            <div className="border-border bg-muted/30 rounded-2xl border border-dashed px-6 py-16 text-center">
              <p className="text-muted-foreground mb-4 text-sm">
                No saved resumes yet. Start fresh or open the builder and save
                while signed in.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {canCreateResume ? (
                  <Link
                    href="/resume/create"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center rounded-md px-4 text-sm font-medium shadow"
                  >
                    Create your first resume
                  </Link>
                ) : null}
                <Link
                  href="/resume"
                  className="border-input bg-background inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted/50"
                >
                  Open builder
                </Link>
              </div>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.map((r) => (
                <li key={r.id}>
                  <DashboardResumePreviewCard resume={r} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
