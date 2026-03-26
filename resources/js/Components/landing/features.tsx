import {
  Zap,
  FileDown,
  LayoutTemplate,
  Eye,
  ShieldCheck,
  Sliders,
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning-fast editor",
    description:
      "Fill out structured sections and watch your resume update in real time. No design skills needed.",
  },
  {
    icon: LayoutTemplate,
    title: "5 handcrafted templates",
    description:
      "From minimal and modern to creative and technical — pick the template that fits your industry.",
  },
  {
    icon: Eye,
    title: "Live preview",
    description:
      "See exactly how your resume looks as you type. Zoom in, zoom out, and preview before you export.",
  },
  {
    icon: FileDown,
    title: "One-click PDF export",
    description:
      "Download a pixel-perfect, print-ready PDF or PNG instantly. No watermarks, ever.",
  },
  {
    icon: ShieldCheck,
    title: "ATS-friendly",
    description:
      "All templates are structured for Applicant Tracking Systems so your resume gets seen by humans.",
  },
  {
    icon: Sliders,
    title: "Fully customizable",
    description:
      "Reorder sections, toggle visibility, add custom entries, and tailor every detail to your story.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance mb-4">
            Everything you need to stand out
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty leading-relaxed">
            ResumeForge gives you a complete toolkit to craft a compelling resume — without the frustration.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
