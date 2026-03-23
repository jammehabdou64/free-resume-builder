import type { ResumeData, TemplateId } from "@/lib/resume-types";
import { MinimalTemplate } from "@/Components/resume/templates/minimal-template";
import { ProfessionalTemplate } from "@/Components/resume/templates/professional-template";
import { CreativeTemplate } from "@/Components/resume/templates/creative-template";
import { TechTemplate } from "@/Components/resume/templates/tech-template";
import { ElegantTemplate } from "@/Components/resume/templates/elegant-template";

interface Props {
  data: ResumeData;
}

export function ResumeTemplate({ data }: Props) {
  switch (data.selectedTemplate) {
    case "minimal":
      return <MinimalTemplate data={data} />;
    case "professional":
      return <ProfessionalTemplate data={data} />;
    case "creative":
      return <CreativeTemplate data={data} />;
    case "tech":
      return <TechTemplate data={data} />;
    case "elegant":
      return <ElegantTemplate data={data} />;
    default:
      return <MinimalTemplate data={data} />;
  }
}

export interface TemplateOption {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean black & white, typography-forward",
    preview: "bg-white",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Corporate style with colored header",
    preview: "bg-blue-600",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Two-column with colored sidebar",
    preview: "bg-cyan-600",
  },
  {
    id: "tech",
    name: "Developer",
    description: "Dark terminal-inspired code aesthetic",
    preview: "bg-neutral-950",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Serif fonts with warm sidebar layout",
    preview: "bg-amber-700",
  },
];
