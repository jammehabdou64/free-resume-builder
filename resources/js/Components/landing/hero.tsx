"use client";

import { Link } from "@inertiajs/react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div
        className="hero-grid-bg pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />

      <div className="max-w-5xl mx-auto text-center">
        {/* Social proof badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Badge
            variant="secondary"
            className="px-3 py-1.5 text-xs font-medium gap-1.5"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            Trusted by 50,000+ professionals
          </Badge>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.08] mb-6">
          Build a resume that{" "}
          <span className="text-primary">lands interviews</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty mb-10">
          Create a stunning, ATS-friendly resume in minutes. Choose from 5
          professional templates, fill in your details, and export a
          pixel-perfect PDF — all for free.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="h-12 px-8 text-base gap-2 font-semibold shadow-md"
            asChild
          >
            <Link href="/resume">
              Build your resume free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base"
            asChild
          >
            <Link href="#templates">See templates</Link>
          </Button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { value: "50K+", label: "Resumes created" },
            { value: "5", label: "Professional templates" },
            { value: "Free", label: "No credit card needed" },
            { value: "2 min", label: "Average build time" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* App mockup preview */}
      <div className="max-w-5xl mx-auto mt-16">
        <div className="relative rounded-xl border border-border shadow-2xl overflow-hidden bg-card">
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/50">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 mx-4">
              <div className="bg-background rounded-md h-5 w-48 px-3 flex items-center">
                <span className="text-xs text-muted-foreground">
                  resumeforge.app/builder
                </span>
              </div>
            </div>
          </div>
          {/* App content */}
          <div className="flex h-80">
            {/* Sidebar mockup */}
            <div className="w-56 border-r border-border bg-muted/30 p-4 flex flex-col gap-3 shrink-0">
              <div className="h-5 w-24 bg-border rounded" />
              <div className="h-8 bg-border/60 rounded" />
              <div className="h-8 bg-border/60 rounded" />
              <div className="h-8 bg-border/60 rounded" />
              <div className="h-1" />
              <div className="h-5 w-20 bg-border rounded" />
              <div className="h-8 bg-border/60 rounded" />
              <div className="h-8 bg-border/60 rounded" />
            </div>
            {/* Preview mockup */}
            <div className="flex-1 bg-muted/10 flex items-center justify-center p-6">
              <div className="w-full max-w-xs aspect-[8.5/11] bg-card border border-border rounded-md shadow-sm p-4 flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="h-5 w-32 bg-primary/20 rounded mb-1" />
                    <div className="h-3 w-24 bg-border rounded" />
                    <div className="h-3 w-40 bg-border rounded mt-1" />
                  </div>
                </div>
                <div className="border-t border-border pt-2 mt-1">
                  <div className="h-3 w-20 bg-primary/30 rounded mb-2" />
                  <div className="h-2 w-full bg-border/60 rounded mb-1" />
                  <div className="h-2 w-5/6 bg-border/60 rounded mb-1" />
                  <div className="h-2 w-4/6 bg-border/60 rounded" />
                </div>
                <div className="border-t border-border pt-2">
                  <div className="h-3 w-24 bg-primary/30 rounded mb-2" />
                  <div className="h-2 w-full bg-border/60 rounded mb-1" />
                  <div className="h-2 w-3/4 bg-border/60 rounded mb-1" />
                  <div className="h-2 w-5/6 bg-border/60 rounded" />
                </div>
                <div className="border-t border-border pt-2">
                  <div className="h-3 w-16 bg-primary/30 rounded mb-2" />
                  <div className="flex gap-1 flex-wrap">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-12 bg-border/60 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
