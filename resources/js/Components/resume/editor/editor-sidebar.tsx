import { useState } from "react";
import { useResume } from "@/lib/resume-context";
import { PersonalForm } from "@/Components/resume/editor/personal-form";
import { ExperienceForm } from "@/Components/resume/editor/experience-form";
import { EducationForm } from "@/Components/resume/editor/education-form";
import { SkillsForm } from "@/Components/resume/editor/skills-form";
import { ProjectsForm } from "@/Components/resume/editor/projects-form";
import {
  CertificationsForm,
  LanguagesForm,
} from "@/Components/resume/editor/extras-form";
import { SectionsManager } from "@/Components/resume/editor/sections-manager";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import {
  User,
  Briefcase,
  GraduationCap,
  Star,
  FolderOpen,
  Award,
  Languages,
  LayoutGrid,
  Sparkles,
  Trash2,
} from "lucide-react";

const TABS = [
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Star },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "certifications", label: "Certs", icon: Award },
  { id: "languages", label: "Languages", icon: Languages },
  { id: "sections", label: "Sections", icon: LayoutGrid },
];

export function EditorSidebar() {
  const [activeTab, setActiveTab] = useState("personal");
  const { loadDemoData, clearData } = useResume();

  return (
    <aside className="bg-card border-border flex h-full min-h-0 min-w-0 flex-col overflow-hidden border-r">
      <div className="border-border border-b px-4 py-4">
        <h2 className="text-foreground text-sm font-semibold">Resume Editor</h2>
        <div className="mt-2 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 flex-1 text-xs"
            onClick={loadDemoData}
          >
            <Sparkles className="mr-1 h-3 w-3" />
            Demo Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive h-7 flex-1 text-xs"
            onClick={clearData}
          >
            <Trash2 className="mr-1 h-3 w-3" />
            Clear
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="border-border shrink-0  border">
          <div
            className="flex flex-col min-w-max gap-0.5 px-2 py-1.5"
            role="tablist"
            aria-label="Resume sections"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`resume-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex shrink-0 flex-col items-center gap-0.5 rounded-md px-2.5 py-1.5 text-xs whitespace-nowrap transition-colors",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ScrollArea className="min-h-0 min-w-0 flex-1">
          <div className="p-4">
            <div
              role="tabpanel"
              id={`resume-panel-${activeTab}`}
              aria-labelledby={`resume-tab-${activeTab}`}
            >
              {activeTab === "personal" && <PersonalForm />}
              {activeTab === "experience" && <ExperienceForm />}
              {activeTab === "education" && <EducationForm />}
              {activeTab === "skills" && <SkillsForm />}
              {activeTab === "projects" && <ProjectsForm />}
              {activeTab === "certifications" && <CertificationsForm />}
              {activeTab === "languages" && <LanguagesForm />}
              {activeTab === "sections" && <SectionsManager />}
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
