import { Link } from "@inertiajs/react";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to build a great resume.",
    highlighted: false,
    cta: "Get started free",
    href: "/register",
    features: [
      "All 5 professional templates",
      "Up to 3 saved resumes",
      "Live preview",
      "PDF & PNG export",
      "ATS-optimized output",
      "Section reordering",
      "Auto-save",
    ],
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Advanced features for serious job seekers.",
    highlighted: true,
    cta: "Start Pro free trial",
    href: "/register?plan=pro",
    badge: "Most popular",
    features: [
      "Everything in Free",
      "Custom color themes",
      "AI resume writing assistant",
      "Cover letter builder",
      "LinkedIn profile sync",
      "Resume analytics & views",
      "Priority support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed">
            Start for free. Upgrade when you need more. No hidden fees.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 flex flex-col gap-6 ${
                plan.highlighted
                  ? "border-primary bg-primary text-primary-foreground shadow-xl"
                  : "border-border bg-card"
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 hover:bg-amber-400 font-semibold px-3">
                  {plan.badge}
                </Badge>
              )}
              <div>
                <p
                  className={`text-sm font-semibold mb-2 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span
                    className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    /{plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {plan.description}
                </p>
              </div>

              <Button
                asChild
                variant={plan.highlighted ? "secondary" : "default"}
                className="w-full font-semibold"
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>

              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <Check
                      className={`w-4 h-4 shrink-0 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`}
                    />
                    <span
                      className={
                        plan.highlighted
                          ? "text-primary-foreground/90"
                          : "text-foreground"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
