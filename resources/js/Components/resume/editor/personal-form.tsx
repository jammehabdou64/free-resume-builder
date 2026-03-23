import { useCallback, type ComponentType, type ReactNode } from "react";
import { useResume } from "@/lib/resume-context";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import {
  User,
  Upload,
  X,
  CircleUser,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  FileText,
} from "lucide-react";

function FieldLabel({
  htmlFor,
  icon: Icon,
  children,
}: {
  htmlFor: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <Label htmlFor={htmlFor} className="flex items-center gap-1.5">
      <Icon className="text-muted-foreground h-3.5 w-3.5 shrink-0" aria-hidden />
      {children}
    </Label>
  );
}

export function PersonalForm() {
  const { data, updatePersonal } = useResume();
  const { personal } = data;

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        updatePersonal({ photo: ev.target?.result as string });
      };
      reader.readAsDataURL(file);
    },
    [updatePersonal],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          {personal.photo ? (
            <div className="border-border relative h-16 w-16 overflow-hidden rounded-full border-2">
              <img
                src={personal.photo}
                alt="Profile"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => updatePersonal({ photo: null })}
                className="bg-destructive text-destructive-foreground absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full"
                aria-label="Remove photo"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div className="border-border bg-muted flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed">
              <User className="text-muted-foreground h-6 w-6" />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="photo-upload" className="cursor-pointer">
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="mr-1.5 h-3.5 w-3.5" />
                Upload Photo
              </span>
            </Button>
          </Label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handlePhotoUpload}
          />
          <p className="text-muted-foreground mt-1 text-xs">JPG, PNG up to 5MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="name" icon={CircleUser}>
            Full Name
          </FieldLabel>
          <Input
            id="name"
            placeholder="Alex Johnson"
            value={personal.name}
            onChange={(e) => updatePersonal({ name: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="title" icon={Briefcase}>
            Job Title
          </FieldLabel>
          <Input
            id="title"
            placeholder="Software Engineer"
            value={personal.title}
            onChange={(e) => updatePersonal({ title: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="email" icon={Mail}>
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@email.com"
            value={personal.email}
            onChange={(e) => updatePersonal({ email: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="phone" icon={Phone}>
            Phone
          </FieldLabel>
          <Input
            id="phone"
            placeholder="+1 (555) 000-0000"
            value={personal.phone}
            onChange={(e) => updatePersonal({ phone: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="location" icon={MapPin}>
            Location
          </FieldLabel>
          <Input
            id="location"
            placeholder="New York, NY"
            value={personal.location}
            onChange={(e) => updatePersonal({ location: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="website" icon={Globe}>
            Website
          </FieldLabel>
          <Input
            id="website"
            placeholder="yoursite.com"
            value={personal.website}
            onChange={(e) => updatePersonal({ website: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="linkedin" icon={Linkedin}>
            LinkedIn
          </FieldLabel>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/you"
            value={personal.linkedin}
            onChange={(e) => updatePersonal({ linkedin: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel htmlFor="github" icon={Github}>
            GitHub
          </FieldLabel>
          <Input
            id="github"
            placeholder="github.com/you"
            value={personal.github}
            onChange={(e) => updatePersonal({ github: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <FieldLabel htmlFor="summary" icon={FileText}>
          Professional Summary
        </FieldLabel>
        <Textarea
          id="summary"
          placeholder="Brief overview of your professional background and goals..."
          value={personal.summary}
          onChange={(e) => updatePersonal({ summary: e.target.value })}
          rows={4}
          className="resize-none"
        />
      </div>
    </div>
  );
}
