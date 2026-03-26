import { Head, Link, usePage } from "@inertiajs/react";
import { BrandLogo } from "@/Components/brand-logo";
import { Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";

type ResumeRow = {
  id: string;
  label: string;
  updatedAt: string;
  createdAt: string;
};

export default function Resumes() {
  const { resumes = [] } = usePage().props as unknown as {
    resumes?: ResumeRow[];
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
              <h1 className="text-lg font-semibold">My resumes</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/resume">
                <Button size="sm" variant="default">
                  <Plus className="mr-1 h-4 w-4" />
                  New resume
                </Button>
              </Link>
              <Link href="/home">
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
