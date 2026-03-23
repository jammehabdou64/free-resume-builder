import { useResume } from "@/lib/resume-context";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function SkillsForm() {
  const { data, addSkill, updateSkill, removeSkill } = useResume();

  return (
    <div className="space-y-3">
      {data.skills.map((skill) => (
        <div key={skill.id} className="flex items-center gap-2">
          <div className="grid flex-1 grid-cols-3 gap-2">
            <Input
              placeholder="Skill name"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              className="col-span-1"
            />
            <Input
              placeholder="Category"
              value={skill.category}
              onChange={(e) =>
                updateSkill(skill.id, { category: e.target.value })
              }
              className="col-span-1"
            />
            <div className="flex items-center gap-1.5">
              <Label className="text-muted-foreground shrink-0 text-xs">
                Level
              </Label>
              <select
                value={skill.level}
                onChange={(e) =>
                  updateSkill(skill.id, { level: Number(e.target.value) })
                }
                className="border-input bg-background focus:ring-ring h-9 flex-1 rounded-md border px-2 text-sm focus:ring-1 focus:outline-none"
              >
                <option value={1}>Beginner</option>
                <option value={2}>Basic</option>
                <option value={3}>Intermediate</option>
                <option value={4}>Advanced</option>
                <option value={5}>Expert</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeSkill(skill.id)}
            className="text-muted-foreground hover:text-destructive shrink-0 p-1 transition-colors"
            aria-label="Remove skill"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full" onClick={addSkill}>
        <Plus className="mr-1.5 h-4 w-4" />
        Add Skill
      </Button>
    </div>
  );
}
