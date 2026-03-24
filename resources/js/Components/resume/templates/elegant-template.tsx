import type { ReactNode } from "react";
import type { ResumeData } from "@/lib/resume-types";
import { formatDateRange, formatDate } from "@/lib/resume-utils";
import { ResumeDescriptionHtml } from "@/lib/resume-description-html";
import { PersonalContactPreview } from "@/Components/resume/personal-contact-preview";
import { ResumeExternalLink } from "@/Components/resume/resume-external-link";

interface Props {
  data: ResumeData;
}

export function ElegantTemplate({ data }: Props) {
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
  const accent = accentColor || "#b45309";

  const mainIds = new Set(["summary", "experience", "education", "projects"]);
  const sidebarIds = new Set(["skills", "certifications", "languages"]);

  const sidebarSections = enabledSections.filter((s) => sidebarIds.has(s.id));
  const mainSections = enabledSections.filter((s) => mainIds.has(s.id));

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-3">
      <h2 className="text-xs font-semibold tracking-widest uppercase" style={{ color: accent }}>
        {title}
      </h2>
      <div className="mt-1.5 h-px" style={{ backgroundColor: accent, opacity: 0.25 }} />
    </div>
  );

  const mainMap: Record<string, ReactNode> = {
    summary: personal.summary ? (
      <section key="summary" className="mb-6">
        <SectionHeader title="Profile" />
        <p className="text-xs leading-relaxed text-neutral-600 italic">
          {personal.summary}
        </p>
      </section>
    ) : null,
    experience:
      experience.length > 0 ? (
        <section key="experience" className="mb-6">
          <SectionHeader title="Experience" />
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-800">{exp.position}</h3>
                    <p className="mt-0.5 text-xs font-medium" style={{ color: accent }}>
                      {exp.company}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-neutral-400 italic">
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
        <section key="education" className="mb-6">
          <SectionHeader title="Education" />
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-800">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-neutral-600 italic">
                      {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-neutral-400 italic">
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                {edu.gpa && <p className="text-xs text-neutral-500">GPA: {edu.gpa}</p>}
                <ResumeDescriptionHtml
                  html={edu.description}
                  className="mt-0.5 text-xs text-neutral-500"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    projects:
      projects.length > 0 ? (
        <section key="projects" className="mb-6">
          <SectionHeader title="Notable Projects" />
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-neutral-800">
                    {proj.url?.trim() ? (
                      <ResumeExternalLink href={proj.url} className="text-neutral-800">
                        {proj.name?.trim() || proj.url}
                      </ResumeExternalLink>
                    ) : (
                      proj.name
                    )}
                  </h3>
                  {proj.url?.trim() ? (
                    <ResumeExternalLink
                      href={proj.url}
                      className="shrink-0 text-xs text-neutral-400 italic"
                    >
                      {proj.url}
                    </ResumeExternalLink>
                  ) : null}
                </div>
                {proj.technologies && (
                  <p className="mb-0.5 text-xs italic" style={{ color: accent }}>
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
  };

  const sidebarMap: Record<string, ReactNode> = {
    skills:
      skills.length > 0 ? (
        <section key="skills" className="mb-5">
          <h3 className="mb-2 text-xs font-semibold tracking-widest text-white/70 uppercase">
            Skills
          </h3>
          <div className="mb-2 h-px bg-white/20" />
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full bg-white/15 px-2 py-0.5 text-xs text-white/80"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      ) : null,
    certifications:
      certifications.length > 0 ? (
        <section key="certifications" className="mb-5">
          <h3 className="mb-2 text-xs font-semibold tracking-widest text-white/70 uppercase">
            Certifications
          </h3>
          <div className="mb-2 h-px bg-white/20" />
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <p className="text-xs font-medium text-white/80">{cert.name}</p>
                {cert.issuer && <p className="text-xs text-white/50">{cert.issuer}</p>}
                {cert.date && (
                  <p className="text-xs text-white/40 italic">{formatDate(cert.date)}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null,
    languages:
      languages.length > 0 ? (
        <section key="languages" className="mb-5">
          <h3 className="mb-2 text-xs font-semibold tracking-widest text-white/70 uppercase">
            Languages
          </h3>
          <div className="mb-2 h-px bg-white/20" />
          <div className="space-y-1.5">
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-xs">
                <span className="text-white/80">{lang.name}</span>
                <span className="text-white/50 italic">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null,
  };

  return (
    <div className="flex min-h-full w-full bg-white font-serif">
      <div
        className="flex w-44 shrink-0 flex-col text-white"
        style={{ backgroundColor: accent }}
      >
        <div className="p-5 pb-4">
          {personal.photo ? (
            <img
              src={personal.photo}
              alt={personal.name}
              className="mx-auto mb-4 block h-16 w-16 rounded-full border-2 border-white/40 object-cover"
            />
          ) : (
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <span className="text-2xl font-bold text-white/70">
                {personal.name?.charAt(0) || "?"}
              </span>
            </div>
          )}
          <h1 className="text-center text-sm leading-tight font-bold tracking-wide text-white">
            {personal.name || "Your Name"}
          </h1>
          {personal.title && (
            <p className="mt-1 text-center text-xs text-white/70 italic">{personal.title}</p>
          )}
        </div>

        <div className="border-b border-white/20 px-4 pb-4">
          <PersonalContactPreview personal={personal} variant="sidebar" />
        </div>

        <div className="flex-1 p-4">{sidebarSections.map((s) => sidebarMap[s.id])}</div>
      </div>

      <div className="flex-1 p-8">{mainSections.map((s) => mainMap[s.id])}</div>
    </div>
  );
}
