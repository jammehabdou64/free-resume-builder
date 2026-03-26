import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Software Engineer",
    company: "Hired at Stripe",
    avatar: "MT",
    avatarColor: "bg-blue-500",
    rating: 5,
    quote:
      "I had a PDF resume ready in under 10 minutes. The Developer template was exactly what I needed for my engineering job search. Landed 3 interviews in the first week.",
  },
  {
    name: "Priya S.",
    role: "Product Designer",
    company: "Hired at Figma",
    avatar: "PS",
    avatarColor: "bg-rose-500",
    rating: 5,
    quote:
      "Finally a resume builder that actually looks good. The Creative template stood out from every other candidate I was competing with. Beautiful and professional.",
  },
  {
    name: "James O.",
    role: "Marketing Manager",
    company: "Hired at HubSpot",
    avatar: "JO",
    avatarColor: "bg-amber-500",
    rating: 5,
    quote:
      "I switched from a $15/month competitor. ResumeForge is completely free and honestly more polished. The live preview was a game changer for quick edits.",
  },
  {
    name: "Nina L.",
    role: "Data Analyst",
    company: "Hired at Airbnb",
    avatar: "NL",
    avatarColor: "bg-emerald-500",
    rating: 5,
    quote:
      "The ATS optimization is real. My applications started getting callbacks immediately after switching to ResumeForge. Highly recommend the Professional template.",
  },
  {
    name: "Carlos R.",
    role: "UX Researcher",
    company: "Hired at Google",
    avatar: "CR",
    avatarColor: "bg-indigo-500",
    rating: 5,
    quote:
      "Clean, fast, and no watermarks. I exported my resume in PDF and PNG in one click. Perfect for both sending by email and posting on portfolio sites.",
  },
  {
    name: "Aisha K.",
    role: "Finance Analyst",
    company: "Hired at JPMorgan",
    avatar: "AK",
    avatarColor: "bg-purple-500",
    rating: 5,
    quote:
      "The Elegant template with serif fonts gave my resume the executive feel I needed for finance roles. The section reordering feature is incredibly useful.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance mb-4">
            Professionals who landed their dream job
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty leading-relaxed">
            Join 50,000+ job seekers who used ResumeForge to get hired at top
            companies.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              {/* Quote */}
              <p className="text-sm text-foreground leading-relaxed flex-1">
                {'"'}
                {t.quote}
                {'"'}
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div
                  className={`w-9 h-9 rounded-full ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
