export type TemplateId = "minimal" | "professional" | "creative" | "tech" | "elegant";

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photo: string | null;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface ResumeSection {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  sections: ResumeSection[];
  selectedTemplate: TemplateId;
  accentColor: string;
}

export const DEFAULT_SECTIONS: ResumeSection[] = [
  { id: "summary", label: "Summary", enabled: true, order: 0 },
  { id: "experience", label: "Experience", enabled: true, order: 1 },
  { id: "education", label: "Education", enabled: true, order: 2 },
  { id: "skills", label: "Skills", enabled: true, order: 3 },
  { id: "projects", label: "Projects", enabled: true, order: 4 },
  { id: "certifications", label: "Certifications", enabled: false, order: 5 },
  { id: "languages", label: "Languages", enabled: false, order: 6 },
];

export const DEMO_DATA: ResumeData = {
  selectedTemplate: "minimal",
  accentColor: "#2563eb",
  sections: DEFAULT_SECTIONS,
  personal: {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    summary:
      "Experienced software engineer with 7+ years building scalable web applications and distributed systems. Passionate about clean code, developer experience, and mentoring junior engineers. Led teams delivering products used by millions of users.",
    photo: null,
  },
  experience: [
    {
      id: "exp1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description:
        "Lead development of the core platform serving 5M+ users. Architected a microservices migration reducing latency by 40%. Mentored a team of 4 engineers and drove adoption of TypeScript across the organization.",
    },
    {
      id: "exp2",
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      location: "Remote",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description:
        "Built the entire frontend from scratch using React and Next.js. Developed REST and GraphQL APIs with Node.js and PostgreSQL. Helped scale the product from 0 to 500k users.",
    },
    {
      id: "exp3",
      company: "Digital Agency Co.",
      position: "Frontend Developer",
      location: "New York, NY",
      startDate: "2016-09",
      endDate: "2018-05",
      current: false,
      description:
        "Delivered responsive web applications for 20+ enterprise clients. Specialized in React, Vue.js, and performance optimization.",
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012-09",
      endDate: "2016-05",
      gpa: "3.8",
      description:
        "Graduated with Honors. Relevant coursework: Data Structures, Algorithms, Distributed Systems.",
    },
  ],
  skills: [
    { id: "sk1", name: "TypeScript", level: 5, category: "Languages" },
    { id: "sk2", name: "React", level: 5, category: "Frameworks" },
    { id: "sk3", name: "Node.js", level: 4, category: "Frameworks" },
    { id: "sk4", name: "Next.js", level: 5, category: "Frameworks" },
    { id: "sk5", name: "PostgreSQL", level: 4, category: "Databases" },
    { id: "sk6", name: "Docker", level: 4, category: "DevOps" },
    { id: "sk7", name: "AWS", level: 3, category: "DevOps" },
    { id: "sk8", name: "GraphQL", level: 4, category: "Technologies" },
  ],
  projects: [
    {
      id: "proj1",
      name: "OpenSource Dashboard",
      description:
        "A real-time analytics dashboard built with Next.js, Recharts, and WebSockets. Used by 2,000+ developers.",
      url: "github.com/alexjohnson/dashboard",
      technologies: "Next.js, TypeScript, WebSockets, Recharts",
      startDate: "2023-01",
      endDate: "2023-06",
    },
    {
      id: "proj2",
      name: "CLI Dev Tools",
      description:
        "A productivity CLI toolkit that automates common development tasks. 500+ GitHub stars.",
      url: "github.com/alexjohnson/devtools",
      technologies: "Node.js, TypeScript, Ink",
      startDate: "2022-04",
      endDate: "2022-09",
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-04",
      url: "aws.amazon.com/certification",
    },
  ],
  languages: [
    { id: "lang1", name: "English", proficiency: "Native" },
    { id: "lang2", name: "Spanish", proficiency: "Conversational" },
  ],
};
