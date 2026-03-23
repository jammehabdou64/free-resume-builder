import { useResume } from "@/lib/resume-context";
import { Switch } from "@/Components/ui/switch";
import { GripVertical } from "lucide-react";
import { useState } from "react";

export function SectionsManager() {
  const { data, toggleSection, reorderSections } = useResume();
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  const sorted = [...data.sections].sort((a, b) => a.order - b.order);

  const handleDragStart = (id: string) => setDragging(id);
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOver(id);
  };
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!dragging || dragging === targetId) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    const sorted2 = [...data.sections].sort((a, b) => a.order - b.order);
    const fromIdx = sorted2.findIndex((s) => s.id === dragging);
    const toIdx = sorted2.findIndex((s) => s.id === targetId);
    const newSections = [...sorted2];
    const [removed] = newSections.splice(fromIdx, 1);
    newSections.splice(toIdx, 0, removed);
    reorderSections(newSections.map((s, i) => ({ ...s, order: i })));
    setDragging(null);
    setDragOver(null);
  };

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground mb-3 text-xs">
        Toggle sections on/off and drag to reorder them in your resume.
      </p>
      {sorted.map((section) => (
        <div
          key={section.id}
          draggable
          onDragStart={() => handleDragStart(section.id)}
          onDragOver={(e) => handleDragOver(e, section.id)}
          onDrop={(e) => handleDrop(e, section.id)}
          onDragEnd={() => {
            setDragging(null);
            setDragOver(null);
          }}
          className={`flex cursor-grab items-center gap-3 rounded-lg border p-3 transition-all active:cursor-grabbing ${
            dragOver === section.id
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:bg-muted/30"
          } ${dragging === section.id ? "opacity-50" : ""}`}
        >
          <GripVertical className="text-muted-foreground h-4 w-4 shrink-0" />
          <span className="text-foreground flex-1 text-sm font-medium">
            {section.label}
          </span>
          <Switch
            checked={section.enabled}
            onCheckedChange={() => toggleSection(section.id)}
            aria-label={`Toggle ${section.label}`}
          />
        </div>
      ))}
    </div>
  );
}
