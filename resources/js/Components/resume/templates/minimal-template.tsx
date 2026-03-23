import type { ReactNode } from "react";
import type { ResumeData } from "@/lib/resume-types";
import { formatDateRange, formatDate } from "@/lib/resume-utils";
import { ResumeDescriptionHtml } from "@/lib/resume-description-html";
import { PersonalContactPreview } from "@/Components/resume/personal-contact-preview";

interface Props {
  data: ResumeData;
}

export function MinimalTemplate({ data }: Props) {
  const {
    personal,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    sections,
  } = data;
  const enabledSections = sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  const sectionMap: Record<string, ReactNode> = {
    summary: personal.summary ? (
      <section key="summary" className="mb-5">
        <h2 className="mb-2 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-neutral-700">
          {personal.summary}
        </p>
      </section>
    ) : null,
    experience:
      experience.length > 0 ? (
        <section key="experience" className="mb-5">
          <h2 className="mb-3 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {exp.position}
                  </h3>
                  <span className="shrink-0 text-xs text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="mb-1 text-xs text-neutral-500">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                <ResumeDescriptionHtml
                  html={exp.description}
                  className="text-xs leading-relaxed text-neutral-600"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    education:
      education.length > 0 ? (
        <section key="education" className="mb-5">
          <h2 className="mb-3 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {edu.institution}
                  </h3>
                  <span className="shrink-0 text-xs text-neutral-400">
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                  {edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                </p>
                <ResumeDescriptionHtml
                  html={edu.description}
                  className="mt-0.5 text-xs text-neutral-600"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    skills:
      skills.length > 0 ? (
        <section key="skills" className="mb-5">
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700"
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
          <h2 className="mb-3 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {proj.name}
                  </h3>
                  {proj.url && (
                    <span className="text-xs text-neutral-400">{proj.url}</span>
                  )}
                </div>
                {proj.technologies && (
                  <p className="mb-0.5 text-xs text-neutral-400">
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
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <span className="text-sm text-neutral-800">{cert.name}</span>
                  {cert.issuer && (
                    <span className="text-xs text-neutral-500">
                      {" "}
                      · {cert.issuer}
                    </span>
                  )}
                </div>
                <span className="text-xs text-neutral-400">
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
          <h2 className="mb-2 text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Languages
          </h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <span key={lang.id} className="text-xs text-neutral-700">
                {lang.name}{" "}
                <span className="text-neutral-400">
                  ({lang.proficiency})
                </span>
              </span>
            ))}
          </div>
        </section>
      ) : null,
  };

  return (
    <div className="min-h-full w-full bg-white p-10 font-sans text-neutral-800">
      <header className="mb-7 border-b border-neutral-200 pb-6">
        <div className="flex items-center gap-5">
          {personal.photo && (
            <img
              src={personal.photo}
              alt={personal.name}
              className="h-14 w-14 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              {personal.name || "Your Name"}
            </h1>
            {personal.title && (
              <p className="mt-0.5 text-sm text-neutral-500">{personal.title}</p>
            )}
          </div>
        </div>
        <PersonalContactPreview personal={personal} variant="card" className="mt-4" />
      </header>

      {enabledSections.map((s) => sectionMap[s.id])}
    </div>
  );
}
