import { useResume } from "@/lib/resume-context";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RichDescriptionEditor } from "@/Components/resume/editor/rich-description-editor";
import { Button } from "@/Components/ui/button";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useResume();
  const [expanded, setExpanded] = useState<string | null>(
    data.projects[0]?.id ?? null,
  );

  return (
    <div className="space-y-3">
      {data.projects.map((proj) => (
        <div
          key={proj.id}
          className="border-border overflow-hidden rounded-lg border"
        >
          <div
            role="button"
            tabIndex={0}
            className="hover:bg-muted/50 flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left transition-colors"
            onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setExpanded(expanded === proj.id ? null : proj.id);
            }}
          >
            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-medium">
                {proj.name || "New Project"}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {proj.technologies || "Technologies"}
              </p>
            </div>
            <div className="ml-2 flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProject(proj.id);
                }}
                className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                aria-label="Remove project"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {expanded === proj.id ? (
                <ChevronUp className="text-muted-foreground h-4 w-4" />
              ) : (
                <ChevronDown className="text-muted-foreground h-4 w-4" />
              )}
            </div>
          </div>

          {expanded === proj.id && (
            <div className="border-border bg-muted/20 space-y-3 border-t px-4 pb-4">
              <div className="space-y-1.5 pt-3">
                <Label>Project Name</Label>
                <Input
                  placeholder="My Awesome Project"
                  value={proj.name}
                  onChange={(e) =>
                    updateProject(proj.id, { name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <RichDescriptionEditor
                  instanceKey={proj.id}
                  value={proj.description}
                  onChange={(html) =>
                    updateProject(proj.id, { description: html })
                  }
                  placeholder="What does this project do and what impact did it have?"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Technologies</Label>
                  <Input
                    placeholder="React, Node.js, PostgreSQL"
                    value={proj.technologies}
                    onChange={(e) =>
                      updateProject(proj.id, { technologies: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>URL / GitHub</Label>
                  <Input
                    placeholder="github.com/you/project"
                    value={proj.url}
                    onChange={(e) =>
                      updateProject(proj.id, { url: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={proj.startDate}
                    onChange={(e) =>
                      updateProject(proj.id, { startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={proj.endDate}
                    onChange={(e) =>
                      updateProject(proj.id, { endDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full" onClick={addProject}>
        <Plus className="mr-1.5 h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
}
