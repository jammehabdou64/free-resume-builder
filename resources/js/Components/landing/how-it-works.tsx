import { PencilLine, LayoutTemplate, FileDown } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: PencilLine,
    title: "Fill in your details",
    description:
      "Enter your personal info, work experience, education, skills, and more through our structured editor. It takes about 2 minutes.",
  },
  {
    number: "02",
    icon: LayoutTemplate,
    title: "Pick a template",
    description:
      "Choose from Minimal, Professional, Creative, Developer, or Elegant. Switch anytime — your data stays intact.",
  },
  {
    number: "03",
    icon: FileDown,
    title: "Export and apply",
    description:
      "Download your resume as a print-ready PDF or PNG. Share a link or send it directly. Start applying today.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance mb-4">
            From blank page to job application in minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty leading-relaxed">
            No complex setup. No design experience required. Three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-border -translate-y-1/2" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="flex flex-col items-center text-center gap-5">
                {/* Icon + number */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
