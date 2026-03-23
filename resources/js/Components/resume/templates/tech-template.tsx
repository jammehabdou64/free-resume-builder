import type { ReactNode } from "react";
import type { ResumeData } from "@/lib/resume-types";
import { formatDateRange, formatDate } from "@/lib/resume-utils";
import { ResumeDescriptionHtml } from "@/lib/resume-description-html";
import { PersonalContactPreview } from "@/Components/resume/personal-contact-preview";

interface Props {
  data: ResumeData;
}

const LEVEL_LABELS = ["", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"];

export function TechTemplate({ data }: Props) {
  const {
    personal,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    sections,
    accentColor,
  } = data;
  const enabledSections = sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);
  const accent = accentColor || "#10b981";

  const sectionMap: Record<string, ReactNode> = {
    summary: personal.summary ? (
      <section key="summary" className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: accent }}>
            {"// "}
          </span>
          <h2 className="font-mono text-xs font-bold tracking-wider text-neutral-400">
            ABOUT
          </h2>
        </div>
        <p
          className="border-l-2 pl-4 text-xs leading-relaxed text-neutral-500"
          style={{ borderColor: `${accent}40` }}
        >
          {personal.summary}
        </p>
      </section>
    ) : null,
    experience:
      experience.length > 0 ? (
        <section key="experience" className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: accent }}>
              {"// "}
            </span>
            <h2 className="font-mono text-xs font-bold tracking-wider text-neutral-400">
              EXPERIENCE
            </h2>
          </div>
          <div className="space-y-4 border-l-2 pl-4" style={{ borderColor: `${accent}40` }}>
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div
                  className="absolute -top-1 -left-5 h-2 w-2 rounded-full border-2"
                  style={{ borderColor: accent, backgroundColor: "#111" }}
                />
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-neutral-100">{exp.position}</h3>
                  <span
                    className="rounded px-2 py-0.5 font-mono text-xs"
                    style={{ color: accent, backgroundColor: `${accent}15` }}
                  >
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs" style={{ color: accent }}>
                  {exp.company}
                  {exp.location ? ` @ ${exp.location}` : ""}
                </p>
                <ResumeDescriptionHtml
                  html={exp.description}
                  className="mt-1 text-xs leading-relaxed text-neutral-400"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    skills:
      skills.length > 0 ? (
        <section key="skills" className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: accent }}>
              {"// "}
            </span>
            <h2 className="font-mono text-xs font-bold tracking-wider text-neutral-400">
              TECH STACK
            </h2>
          </div>
          <div className="pl-4">
            {Object.entries(
              skills.reduce<Record<string, typeof skills>>((acc, skill) => {
                const cat = skill.category || "General";
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(skill);
                return acc;
              }, {}),
            ).map(([cat, catSkills]) => (
              <div key={cat} className="mb-3">
                <p className="mb-1.5 font-mono text-xs text-neutral-500">
                  {cat.toLowerCase()}:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.id}
                      title={LEVEL_LABELS[skill.level]}
                      className="rounded border px-2 py-0.5 font-mono text-xs"
                      style={{
                        borderColor: `${accent}50`,
                        color: accent,
                        backgroundColor: `${accent}10`,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    projects:
      projects.length > 0 ? (
        <section key="projects" className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: accent }}>
              {"// "}
            </span>
            <h2 className="font-mono text-xs font-bold tracking-wider text-neutral-400">
              PROJECTS
            </h2>
          </div>
          <div className="space-y-3 border-l-2 pl-4" style={{ borderColor: `${accent}40` }}>
            {projects.map((proj) => (
              <div key={proj.id} className="relative">
                <div
                  className="absolute -top-1 -left-5 h-2 w-2 rounded-full border-2"
                  style={{ borderColor: accent, backgroundColor: "#111" }}
                />
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-neutral-100">{proj.name}</h3>
                  {proj.url && (
                    <span className="font-mono text-xs text-neutral-500">{proj.url}</span>
                  )}
                </div>
                {proj.technologies && (
                  <div className="my-1 flex flex-wrap gap-1">
                    {proj.technologies.split(",").map((tech, i) => (
                      <span
                        key={i}
                        className="rounded px-1.5 py-0.5 font-mono text-xs"
                        style={{ color: accent, backgroundColor: `${accent}15` }}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <ResumeDescriptionHtml
                  html={proj.description}
                  className="text-xs leading-relaxed text-neutral-400"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    education:
      education.length > 0 ? (
        <section key="education" className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: accent }}>
              {"// "}
            </span>
            <h2 className="font-mono text-xs font-bold tracking-wider text-neutral-400">
              EDUCATION
            </h2>
          </div>
          <div className="space-y-2 pl-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-neutral-200">{edu.institution}</h3>
                  <span className="font-mono text-xs text-neutral-500">
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                  {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                </p>
                <ResumeDescriptionHtml
                  html={edu.description}
                  className="mt-1 text-xs leading-relaxed text-neutral-400"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    certifications:
      certifications.length > 0 ? (
        <section key="certifications" className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: accent }}>
              {"// "}
            </span>
            <h2 className="font-mono text-xs font-bold tracking-wider text-neutral-400">
              CERTIFICATIONS
            </h2>
          </div>
          <div className="space-y-1.5 pl-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span className="text-xs text-neutral-300">
                  {cert.name}
                  {cert.issuer && (
                    <span className="text-neutral-500"> · {cert.issuer}</span>
                  )}
                </span>
                <span className="font-mono text-xs text-neutral-500">
                  {formatDate(cert.date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    languages:
      languages.length > 0 ? (
        <section key="languages" className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: accent }}>
              {"// "}
            </span>
            <h2 className="font-mono text-xs font-bold tracking-wider text-neutral-400">
              LANGUAGES
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 pl-4">
            {languages.map((lang) => (
              <span key={lang.id} className="font-mono text-xs" style={{ color: accent }}>
                {lang.name}:{" "}
                <span className="text-neutral-500">{lang.proficiency}</span>
              </span>
            ))}
          </div>
        </section>
      ) : null,
  };

  return (
    <div className="min-h-full w-full bg-neutral-950 p-8 font-mono text-neutral-300">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="h-px flex-1" style={{ backgroundColor: `${accent}30` }} />
        </div>
        <div className="mt-4 flex items-center gap-5">
          {personal.photo && (
            <img
              src={personal.photo}
              alt={personal.name}
              className="h-14 w-14 rounded border border-neutral-700 object-cover"
            />
          )}
          <div>
            <h1 className="text-xl font-bold text-neutral-100">
              {personal.name || "Your Name"}
            </h1>
            {personal.title && (
              <p className="mt-0.5 text-sm" style={{ color: accent }}>
                {personal.title}
              </p>
            )}
          </div>
        </div>
        <PersonalContactPreview
          personal={personal}
          variant="terminal"
          accentColor={accent}
          className="mt-3"
        />
        <div className="mt-5 h-px" style={{ backgroundColor: `${accent}30` }} />
      </header>

      {enabledSections.map((s) => sectionMap[s.id])}
    </div>
  );
}
