import { Head, Link, usePage } from "@inertiajs/react";
import { BrandLogo } from "@/Components/brand-logo";
import { Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";

type ResumeRow = {
  id: string;
  label: string;
  updatedAt: string;
  createdAt: string;
  templateId?: string;
  accentColor?: string;
  displayName?: string;
  displayTitle?: string;
};

export default function Resumes() {
  const {
    resumes = [],
    maxResumesPerUser = 3,
    canCreateResume = true,
  } = usePage().props as unknown as {
    resumes?: ResumeRow[];
    maxResumesPerUser?: number;
    canCreateResume?: boolean;
  };

  return (
    <>
      <Head title="My resumes" />
      <div className="bg-background text-foreground min-h-screen">
        <header className="border-border border-b px-6 py-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-flex shrink-0">
                <BrandLogo variant="on-light" className="h-7" />
              </Link>
              <h1 className="text-lg font-semibold">
                My resumes{" "}
                <span className="text-muted-foreground font-normal text-sm">
                  ({resumes.length}/{maxResumesPerUser})
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {canCreateResume ? (
                <Link href="/resume/create">
                  <Button size="sm" variant="default">
                    <Plus className="mr-1 h-4 w-4" />
                    New resume
                  </Button>
                </Link>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  disabled
                  title={`You can save up to ${maxResumesPerUser} resumes. Delete one to add another.`}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Limit reached
                </Button>
              )}
              <Link href="/dashboard">
                <Button size="sm" variant="outline">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-8">
          {resumes.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No saved resumes yet.{" "}
              <Link href="/resume" className="text-primary underline">
                Open the builder
              </Link>{" "}
              and save when you are signed in.
            </p>
          ) : (
            <ul className="divide-border divide-y rounded-lg border">
              {resumes.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/resume/preview/${r.id}`}
                    className="hover:bg-muted/50 flex flex-col gap-0.5 px-4 py-3 transition-colors sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium">{r.label}</span>
                    <span className="text-muted-foreground text-xs">
                      Updated{" "}
                      {r.updatedAt
                        ? new Date(r.updatedAt).toLocaleString()
                        : "—"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}
