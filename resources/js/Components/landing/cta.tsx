import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-primary rounded-3xl px-8 py-16 flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground text-balance leading-tight">
            Your next job starts with a great resume
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-lg text-pretty leading-relaxed">
            Join 50,000+ professionals who built their dream resume with
            ResumeForge. Completely free, takes just 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-base font-semibold gap-2"
              asChild
            >
              <Link href="/builder">
                Build your resume now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
