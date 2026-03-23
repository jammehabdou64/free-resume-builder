import { useResume } from "@/lib/resume-context";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RichDescriptionEditor } from "@/Components/resume/editor/rich-description-editor";
import { MonthPickerField } from "@/Components/resume/editor/month-picker-field";
import { Button } from "@/Components/ui/button";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useResume();
  const [expanded, setExpanded] = useState<string | null>(
    data.education[0]?.id ?? null,
  );

  return (
    <div className="space-y-3">
      {data.education.map((edu) => (
        <div
          key={edu.id}
          className="border-border overflow-hidden rounded-lg border"
        >
          <div
            role="button"
            tabIndex={0}
            className="hover:bg-muted/50 flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left transition-colors"
            onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setExpanded(expanded === edu.id ? null : edu.id);
            }}
          >
            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-medium">
                {edu.institution || "Institution"}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {[edu.degree, edu.field].filter(Boolean).join(" in ") ||
                  "Degree"}
              </p>
            </div>
            <div className="ml-2 flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEducation(edu.id);
                }}
                className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                aria-label="Remove education"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {expanded === edu.id ? (
                <ChevronUp className="text-muted-foreground h-4 w-4" />
              ) : (
                <ChevronDown className="text-muted-foreground h-4 w-4" />
              )}
            </div>
          </div>

          {expanded === edu.id && (
            <div className="border-border bg-muted/20 space-y-3 border-t px-4 pb-4">
              <div className="space-y-1.5 pt-3">
                <Label>Institution</Label>
                <Input
                  placeholder="University of California"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, { institution: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Degree</Label>
                  <Input
                    placeholder="Bachelor of Science"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, { degree: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Field of Study</Label>
                  <Input
                    placeholder="Computer Science"
                    value={edu.field}
                    onChange={(e) =>
                      updateEducation(edu.id, { field: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <MonthPickerField
                    value={edu.startDate}
                    onChange={(startDate) =>
                      updateEducation(edu.id, { startDate })
                    }
                    placeholder="Start month"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>End Date</Label>
                  <MonthPickerField
                    value={edu.endDate}
                    onChange={(endDate) =>
                      updateEducation(edu.id, { endDate })
                    }
                    placeholder="End month"
                  />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label>GPA (optional)</Label>
                  <Input
                    placeholder="3.8"
                    value={edu.gpa}
                    onChange={(e) =>
                      updateEducation(edu.id, { gpa: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Additional Info</Label>
                <RichDescriptionEditor
                  instanceKey={edu.id}
                  value={edu.description}
                  onChange={(html) =>
                    updateEducation(edu.id, { description: html })
                  }
                  placeholder="Honors, relevant coursework, activities..."
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full" onClick={addEducation}>
        <Plus className="mr-1.5 h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
}
