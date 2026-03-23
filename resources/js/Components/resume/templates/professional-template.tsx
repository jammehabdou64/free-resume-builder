import type { ReactNode } from "react";
import type { ResumeData } from "@/lib/resume-types";
import { formatDateRange, formatDate } from "@/lib/resume-utils";
import { ResumeDescriptionHtml } from "@/lib/resume-description-html";
import { PersonalContactPreview } from "@/Components/resume/personal-contact-preview";

interface Props {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: Props) {
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

  const accent = accentColor || "#1e40af";

  const sectionMap: Record<string, ReactNode> = {
    summary: personal.summary ? (
      <section key="summary" className="mb-5">
        <h2
          className="mb-2 text-xs font-bold tracking-widest uppercase"
          style={{ color: accent }}
        >
          Professional Summary
        </h2>
        <div className="mb-3 h-px" style={{ backgroundColor: accent, opacity: 0.3 }} />
        <p className="text-sm leading-relaxed text-neutral-600">
          {personal.summary}
        </p>
      </section>
    ) : null,
    experience:
      experience.length > 0 ? (
        <section key="experience" className="mb-5">
          <h2
            className="mb-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: accent }}
          >
            Work Experience
          </h2>
          <div className="mb-3 h-px" style={{ backgroundColor: accent, opacity: 0.3 }} />
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">
                      {exp.position}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold" style={{ color: accent }}>
                      {exp.company}
                      {exp.location ? ` | ${exp.location}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-500">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <ResumeDescriptionHtml
                  html={exp.description}
                  className="mt-1.5 text-xs leading-relaxed text-neutral-600"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    education:
      education.length > 0 ? (
        <section key="education" className="mb-5">
          <h2
            className="mb-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: accent }}
          >
            Education
          </h2>
          <div className="mb-3 h-px" style={{ backgroundColor: accent, opacity: 0.3 }} />
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-neutral-600">
                      {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                      {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-neutral-500">
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                <ResumeDescriptionHtml
                  html={edu.description}
                  className="mt-1.5 text-xs leading-relaxed text-neutral-600"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    skills:
      skills.length > 0 ? (
        <section key="skills" className="mb-5">
          <h2
            className="mb-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: accent }}
          >
            Core Skills
          </h2>
          <div className="mb-3 h-px" style={{ backgroundColor: accent, opacity: 0.3 }} />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-sm border px-2.5 py-1 text-xs font-medium"
                style={{
                  borderColor: accent,
                  color: accent,
                  backgroundColor: `${accent}10`,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      ) : null,
    projects:
      projects.length > 0 ? (
        <section key="projects" className="mb-5">
          <h2
            className="mb-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: accent }}
          >
            Projects
          </h2>
          <div className="mb-3 h-px" style={{ backgroundColor: accent, opacity: 0.3 }} />
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-neutral-900">{proj.name}</h3>
                  {proj.url && (
                    <span className="text-xs text-neutral-400">{proj.url}</span>
                  )}
                </div>
                {proj.technologies && (
                  <p className="mb-0.5 text-xs font-medium" style={{ color: accent }}>
                    {proj.technologies}
                  </p>
                )}
                <ResumeDescriptionHtml
                  html={proj.description}
                  className="text-xs leading-relaxed text-neutral-600"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    certifications:
      certifications.length > 0 ? (
        <section key="certifications" className="mb-5">
          <h2
            className="mb-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: accent }}
          >
            Certifications
          </h2>
          <div className="mb-3 h-px" style={{ backgroundColor: accent, opacity: 0.3 }} />
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span className="text-sm font-medium text-neutral-800">
                  {cert.name}
                  {cert.issuer && (
                    <span className="text-xs font-normal text-neutral-500">
                      {" "}
                      · {cert.issuer}
                    </span>
                  )}
                </span>
                <span className="text-xs text-neutral-500">
                  {formatDate(cert.date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    languages:
      languages.length > 0 ? (
        <section key="languages" className="mb-5">
          <h2
            className="mb-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: accent }}
          >
            Languages
          </h2>
          <div className="mb-3 h-px" style={{ backgroundColor: accent, opacity: 0.3 }} />
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <span key={lang.id} className="text-xs font-medium text-neutral-700">
                {lang.name}{" "}
                <span className="font-normal text-neutral-400">
                  ({lang.proficiency})
                </span>
              </span>
            ))}
          </div>
        </section>
      ) : null,
  };

  return (
    <div className="min-h-full w-full bg-white font-sans">
      <header className="px-10 py-8 text-white" style={{ backgroundColor: accent }}>
        <div className="flex items-center gap-5">
          {personal.photo && (
            <img
              src={personal.photo}
              alt={personal.name}
              className="h-16 w-16 rounded-full border-2 border-white/50 object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {personal.name || "Your Name"}
            </h1>
            {personal.title && (
              <p className="mt-0.5 text-sm font-medium opacity-90">{personal.title}</p>
            )}
          </div>
        </div>
        <PersonalContactPreview personal={personal} variant="headerInset" />
      </header>

      <div className="p-10">{enabledSections.map((s) => sectionMap[s.id])}</div>
    </div>
  );
}
