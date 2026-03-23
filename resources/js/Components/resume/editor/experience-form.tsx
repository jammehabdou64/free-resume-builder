import { useResume } from "@/lib/resume-context";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RichDescriptionEditor } from "@/Components/resume/editor/rich-description-editor";
import { MonthPickerField } from "@/Components/resume/editor/month-picker-field";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } =
    useResume();
  const [expanded, setExpanded] = useState<string | null>(
    data.experience[0]?.id ?? null,
  );

  return (
    <div className="space-y-3">
      {data.experience.map((exp) => (
        <div
          key={exp.id}
          className="border-border overflow-hidden rounded-lg border"
        >
          <div
            role="button"
            tabIndex={0}
            className="hover:bg-muted/50 flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left transition-colors"
            onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setExpanded(expanded === exp.id ? null : exp.id);
            }}
          >
            <div className="min-w-0">
              <p className="text-foreground truncate text-sm font-medium">
                {exp.position || "New Position"}
              </p>
              <p className="text-muted-foreground truncate text-xs">
                {exp.company || "Company"}
              </p>
            </div>
            <div className="ml-2 flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeExperience(exp.id);
                }}
                className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                aria-label="Remove experience"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {expanded === exp.id ? (
                <ChevronUp className="text-muted-foreground h-4 w-4" />
              ) : (
                <ChevronDown className="text-muted-foreground h-4 w-4" />
              )}
            </div>
          </div>

          {expanded === exp.id && (
            <div className="border-border bg-muted/20 space-y-3 border-t px-4 pb-4">
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="space-y-1.5">
                  <Label>Job Title</Label>
                  <Input
                    placeholder="Software Engineer"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, { position: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Company</Label>
                  <Input
                    placeholder="Acme Corp"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, { company: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Location</Label>
                  <Input
                    placeholder="New York, NY"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, { location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <MonthPickerField
                    value={exp.startDate}
                    onChange={(startDate) =>
                      updateExperience(exp.id, { startDate })
                    }
                    placeholder="Start month"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) =>
                      updateExperience(exp.id, {
                        current: checked,
                        endDate: checked ? "" : exp.endDate,
                      })
                    }
                  />
                  <Label htmlFor={`current-${exp.id}`} className="text-sm">
                    Current Position
                  </Label>
                </div>
                {!exp.current && (
                  <div className="flex-1 space-y-1.5">
                    <Label>End Date</Label>
                    <MonthPickerField
                      value={exp.endDate}
                      onChange={(endDate) =>
                        updateExperience(exp.id, { endDate })
                      }
                      placeholder="End month"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <RichDescriptionEditor
                  instanceKey={exp.id}
                  value={exp.description}
                  onChange={(html) =>
                    updateExperience(exp.id, { description: html })
                  }
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => {
          addExperience();
        }}
      >
        <Plus className="mr-1.5 h-4 w-4" />
        Add Experience
      </Button>
    </div>
  );
}
