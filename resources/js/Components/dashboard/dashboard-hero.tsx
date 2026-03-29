import { Link } from "@inertiajs/react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

type DashboardHeroProps = {
  greetingName: string;
  resumeCount: number;
  maxResumes: number;
  canCreateResume: boolean;
};

export function DashboardHero({
  greetingName,
  resumeCount,
  maxResumes,
  canCreateResume,
}: DashboardHeroProps) {
  const slotsLeft = Math.max(0, maxResumes - resumeCount);

  return (
    <section className="relative isolate overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div
        className="hero-grid-bg-full pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl text-center">
        {/* Same trust row as landing */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Badge
            variant="secondary"
            className="gap-1.5 px-3 py-1.5 text-xs font-medium"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            Trusted by 50,000+ professionals
          </Badge>
        </div>

        {/* Headline — same scale as Index Hero; personalized line + primary accent */}
        <h1 className="text-foreground mb-6 text-balance text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          {greetingName !== "there" ? (
            <>
              {greetingName}, keep building the resume that{" "}
              <span className="text-primary">lands interviews</span>
            </>
          ) : (
            <>
              Keep building the resume that{" "}
              <span className="text-primary">lands interviews</span>
            </>
          )}
        </h1>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed sm:text-xl">
          You&apos;re signed in with{" "}
          <span className="text-foreground font-medium">
            {resumeCount} of {maxResumes} saved{" "}
            {resumeCount === 1 ? "resume" : "resumes"}
          </span>
          {slotsLeft > 0
            ? ` (${slotsLeft} slot${slotsLeft === 1 ? "" : "s"} left). `
            : ". "}
          Open any card below to edit and preview, or start fresh — everything
          stays synced to your account.
        </p>

        {/* CTAs — mirror landing: primary + outline */}
        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {canCreateResume ? (
            <Button
              size="lg"
              className="h-12 gap-2 px-8 text-base font-semibold shadow-md"
              asChild
            >
              <Link href="/resume/create">
                New resume
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button size="lg" className="h-12 px-8 text-base" disabled>
              Resume limit reached
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base"
            asChild
          >
            <Link href="/#templates">See templates</Link>
          </Button>
        </div>

        {/* Stats row — same visual language as Index; dashboard-specific numbers */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: String(resumeCount), label: "Saved resumes" },
            { value: String(maxResumes), label: "Account limit" },
            {
              value: String(slotsLeft),
              label: slotsLeft === 1 ? "Slot available" : "Slots available",
            },
            { value: "Free", label: "Your plan" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-foreground text-2xl font-bold">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
