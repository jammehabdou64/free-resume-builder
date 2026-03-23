import { useResume } from "@/lib/resume-context";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function CertificationsForm() {
  const {
    data,
    addCertification,
    updateCertification,
    removeCertification,
  } = useResume();

  return (
    <div className="space-y-3">
      {data.certifications.map((cert) => (
        <div
          key={cert.id}
          className="border-border space-y-2 rounded-lg border p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="grid flex-1 grid-cols-2 gap-2">
              <Input
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) =>
                  updateCertification(cert.id, { name: e.target.value })
                }
              />
              <Input
                placeholder="Issuing Organization"
                value={cert.issuer}
                onChange={(e) =>
                  updateCertification(cert.id, { issuer: e.target.value })
                }
              />
              <Input
                type="month"
                value={cert.date}
                onChange={(e) =>
                  updateCertification(cert.id, { date: e.target.value })
                }
              />
              <Input
                placeholder="Certificate URL (optional)"
                value={cert.url}
                onChange={(e) =>
                  updateCertification(cert.id, { url: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              onClick={() => removeCertification(cert.id)}
              className="text-muted-foreground hover:text-destructive shrink-0 p-1 transition-colors"
              aria-label="Remove certification"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addCertification}
      >
        <Plus className="mr-1.5 h-4 w-4" />
        Add Certification
      </Button>
    </div>
  );
}

export function LanguagesForm() {
  const { data, addLanguage, updateLanguage, removeLanguage } = useResume();

  return (
    <div className="space-y-3">
      {data.languages.map((lang) => (
        <div key={lang.id} className="flex items-center gap-2">
          <Input
            placeholder="Language"
            value={lang.name}
            onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
          />
          <select
            value={lang.proficiency}
            onChange={(e) =>
              updateLanguage(lang.id, { proficiency: e.target.value })
            }
            className="border-input bg-background focus:ring-ring h-9 flex-1 rounded-md border px-3 text-sm focus:ring-1 focus:outline-none"
          >
            <option>Native</option>
            <option>Fluent</option>
            <option>Advanced</option>
            <option>Intermediate</option>
            <option>Conversational</option>
            <option>Basic</option>
          </select>
          <button
            type="button"
            onClick={() => removeLanguage(lang.id)}
            className="text-muted-foreground hover:text-destructive shrink-0 p-1 transition-colors"
            aria-label="Remove language"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full" onClick={addLanguage}>
        <Plus className="mr-1.5 h-4 w-4" />
        Add Language
      </Button>
    </div>
  );
}
