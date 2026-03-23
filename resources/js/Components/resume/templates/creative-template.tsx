import type { ReactNode } from "react";
import type { ResumeData } from "@/lib/resume-types";
import { formatDateRange, formatDate } from "@/lib/resume-utils";
import { ResumeDescriptionHtml } from "@/lib/resume-description-html";
import { PersonalContactPreview } from "@/Components/resume/personal-contact-preview";

interface Props {
  data: ResumeData;
}

export function CreativeTemplate({ data }: Props) {
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

  const accent = accentColor || "#0891b2";

  const sidebarIds = new Set(["skills", "languages", "certifications"]);
  const sidebarSections = enabledSections.filter((s) => sidebarIds.has(s.id));
  const mainSections = enabledSections.filter((s) => !sidebarIds.has(s.id));

  const sidebarMap: Record<string, ReactNode> = {
    skills:
      skills.length > 0 ? (
        <section key="skills" className="mb-6">
          <h2 className="mb-3 text-xs font-bold tracking-widest text-white/70 uppercase">
            Skills
          </h2>
          <div className="space-y-2">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="mb-1 flex justify-between text-xs text-white/80">
                  <span>{skill.name}</span>
                  <span className="text-white/50">
                    {["", "•", "••", "•••", "••••", "•••••"][skill.level]}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/20">
                  <div
                    className="h-1 rounded-full"
                    style={{
                      width: `${(skill.level / 5) * 100}%`,
                      backgroundColor: "white",
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    languages:
      languages.length > 0 ? (
        <section key="languages" className="mb-6">
          <h2 className="mb-3 text-xs font-bold tracking-widest text-white/70 uppercase">
            Languages
          </h2>
          <div className="space-y-1.5">
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-xs text-white/80">
                <span>{lang.name}</span>
                <span className="text-white/50">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null,
    certifications:
      certifications.length > 0 ? (
        <section key="certifications" className="mb-6">
          <h2 className="mb-3 text-xs font-bold tracking-widest text-white/70 uppercase">
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <p className="text-xs font-medium text-white/80">{cert.name}</p>
                {cert.issuer && (
                  <p className="text-xs text-white/50">{cert.issuer}</p>
                )}
                {cert.date && (
                  <p className="text-xs text-white/40">{formatDate(cert.date)}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : null,
  };

  const mainMap: Record<string, ReactNode> = {
    summary: personal.summary ? (
      <section key="summary" className="mb-5">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-1 rounded-full" style={{ backgroundColor: accent }} />
          <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
            About
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-neutral-600">{personal.summary}</p>
      </section>
    ) : null,
    experience:
      experience.length > 0 ? (
        <section key="experience" className="mb-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-1 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
              Experience
            </h2>
          </div>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="border-l-2 pl-3"
                style={{ borderColor: `${accent}30` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-neutral-900">{exp.position}</h3>
                  <span className="shrink-0 text-xs text-neutral-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="mb-1 text-xs font-semibold" style={{ color: accent }}>
                  {exp.company}
                </p>
                {exp.location && (
                  <p className="text-xs text-neutral-400">{exp.location}</p>
                )}
                <ResumeDescriptionHtml
                  html={exp.description}
                  className="mt-1 text-xs leading-relaxed text-neutral-600"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    education:
      education.length > 0 ? (
        <section key="education" className="mb-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-1 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
              Education
            </h2>
          </div>
          <div className="space-y-3">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="border-l-2 pl-3"
                style={{ borderColor: `${accent}30` }}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-neutral-900">
                    {edu.institution}
                  </h3>
                  <span className="shrink-0 text-xs text-neutral-400">
                    {formatDateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                <p className="text-xs text-neutral-600">
                  {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                  {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                </p>
                <ResumeDescriptionHtml
                  html={edu.description}
                  className="mt-1 text-xs leading-relaxed text-neutral-600"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null,
    projects:
      projects.length > 0 ? (
        <section key="projects" className="mb-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-4 w-1 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
              Projects
            </h2>
          </div>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="border-l-2 pl-3"
                style={{ borderColor: `${accent}30` }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-neutral-900">{proj.name}</h3>
                  {proj.url && (
                    <span className="text-xs text-neutral-400">{proj.url}</span>
                  )}
                </div>
                {proj.technologies && (
                  <p className="mb-0.5 text-xs font-semibold" style={{ color: accent }}>
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

  return (
    <div className="flex min-h-full w-full bg-white font-sans">
      <div
        className="flex w-52 shrink-0 flex-col text-white"
        style={{ backgroundColor: accent }}
      >
        <div className="p-6 pb-4">
          {personal.photo ? (
            <img
              src={personal.photo}
              alt={personal.name}
              className="mx-auto mb-4 block h-20 w-20 rounded-full border-2 border-white/40 object-cover"
            />
          ) : (
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <span className="text-2xl font-bold text-white/70">
                {personal.name?.charAt(0) || "?"}
              </span>
            </div>
          )}
          <h1 className="text-center text-base leading-tight font-bold text-white">
            {personal.name || "Your Name"}
          </h1>
          {personal.title && (
            <p className="mt-1 text-center text-xs text-white/70">{personal.title}</p>
          )}
        </div>

        <div className="border-b border-white/20 px-5 pb-5">
          <PersonalContactPreview personal={personal} variant="sidebar" />
        </div>

        <div className="p-5">{sidebarSections.map((s) => sidebarMap[s.id])}</div>
      </div>

      <div className="flex-1 p-8">{mainSections.map((s) => mainMap[s.id])}</div>
    </div>
  );
}
