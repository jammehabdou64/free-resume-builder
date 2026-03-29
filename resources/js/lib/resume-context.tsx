import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import type {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
  ResumeSection,
  TemplateId,
} from "@/lib/resume-types";
import { DEMO_DATA, DEFAULT_SECTIONS } from "@/lib/resume-types";
import {
  RESUME_STORAGE_KEY,
  RESUME_REMOTE_ID_KEY,
  syncResumeFromLocalStorage,
  type ResumeSaveResult,
} from "@/lib/resume-sync";

/** Server-loaded document for `/resume/preview/:id`. */
export type ServerLoadedResume = {
  id: string;
  label?: string;
  data: ResumeData;
};

const emptyResumeData: ResumeData = {
  selectedTemplate: "minimal",
  accentColor: "#2563eb",
  sections: DEFAULT_SECTIONS,
  personal: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    photo: null,
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
};

interface ResumeContextType {
  data: ResumeData;
  updatePersonal: (personal: Partial<PersonalInfo>) => void;
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addCertification: () => void;
  updateCertification: (id: string, updates: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addLanguage: () => void;
  updateLanguage: (id: string, updates: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  setTemplate: (template: TemplateId) => void;
  setAccentColor: (color: string) => void;
  toggleSection: (id: string) => void;
  reorderSections: (sections: ResumeSection[]) => void;
  loadDemoData: () => void;
  clearData: () => void;
  /** Flush to localStorage, then sync that payload to the server (POST or PUT). */
  saveNow: () => Promise<ResumeSaveResult>;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function readInitialResumeData(
  initialFromServer: ServerLoadedResume | null | undefined,
  startFresh: boolean,
): ResumeData {
  if (startFresh) {
    return emptyResumeData;
  }
  if (initialFromServer?.data) {
    return initialFromServer.data;
  }
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(RESUME_STORAGE_KEY);
      if (stored) return JSON.parse(stored) as ResumeData;
    } catch {
      /* ignore */
    }
  }
  return emptyResumeData;
}

export function ResumeProvider({
  children,
  initialFromServer = null,
  startFresh = false,
}: {
  children: React.ReactNode;
  initialFromServer?: ServerLoadedResume | null;
  startFresh?: boolean;
}) {
  const [data, setData] = useState<ResumeData>(() =>
    readInitialResumeData(initialFromServer, startFresh),
  );

  useLayoutEffect(() => {
    if (!startFresh) return;
    try {
      localStorage.removeItem(RESUME_REMOTE_ID_KEY);
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(emptyResumeData));
    } catch {
      /* ignore */
    }
  }, [startFresh]);

  useEffect(() => {
    try {
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  useEffect(() => {
    if (initialFromServer?.id) {
      try {
        localStorage.setItem(RESUME_REMOTE_ID_KEY, initialFromServer.id);
      } catch {
        /* ignore */
      }
    }
  }, [initialFromServer?.id]);

  const updatePersonal = useCallback((personal: Partial<PersonalInfo>) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...personal },
    }));
  }, []);

  const addExperience = useCallback(() => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: generateId(),
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
    }));
  }, []);

  const updateExperience = useCallback(
    (id: string, updates: Partial<Experience>) => {
      setData((prev) => ({
        ...prev,
        experience: prev.experience.map((e) =>
          e.id === id ? { ...e, ...updates } : e,
        ),
      }));
    },
    [],
  );

  const removeExperience = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  }, []);

  const addEducation = useCallback(() => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: generateId(),
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: "",
          description: "",
        },
      ],
    }));
  }, []);

  const updateEducation = useCallback(
    (id: string, updates: Partial<Education>) => {
      setData((prev) => ({
        ...prev,
        education: prev.education.map((e) =>
          e.id === id ? { ...e, ...updates } : e,
        ),
      }));
    },
    [],
  );

  const removeEducation = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  }, []);

  const addSkill = useCallback(() => {
    setData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { id: generateId(), name: "", level: 3, category: "General" },
      ],
    }));
  }, []);

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  }, []);

  const addProject = useCallback(() => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: generateId(),
          name: "",
          description: "",
          url: "",
          technologies: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p,
      ),
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  }, []);

  const addCertification = useCallback(() => {
    setData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { id: generateId(), name: "", issuer: "", date: "", url: "" },
      ],
    }));
  }, []);

  const updateCertification = useCallback(
    (id: string, updates: Partial<Certification>) => {
      setData((prev) => ({
        ...prev,
        certifications: prev.certifications.map((c) =>
          c.id === id ? { ...c, ...updates } : c,
        ),
      }));
    },
    [],
  );

  const removeCertification = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  }, []);

  const addLanguage = useCallback(() => {
    setData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        { id: generateId(), name: "", proficiency: "Intermediate" },
      ],
    }));
  }, []);

  const updateLanguage = useCallback(
    (id: string, updates: Partial<Language>) => {
      setData((prev) => ({
        ...prev,
        languages: prev.languages.map((l) =>
          l.id === id ? { ...l, ...updates } : l,
        ),
      }));
    },
    [],
  );

  const removeLanguage = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  }, []);

  const setTemplate = useCallback((template: TemplateId) => {
    setData((prev) => ({ ...prev, selectedTemplate: template }));
  }, []);

  const setAccentColor = useCallback((color: string) => {
    setData((prev) => ({ ...prev, accentColor: color }));
  }, []);

  const toggleSection = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled } : s,
      ),
    }));
  }, []);

  const reorderSections = useCallback((sections: ResumeSection[]) => {
    setData((prev) => ({ ...prev, sections }));
  }, []);

  const loadDemoData = useCallback(() => {
    setData(DEMO_DATA);
  }, []);

  const clearData = useCallback(() => {
    try {
      localStorage.removeItem(RESUME_REMOTE_ID_KEY);
    } catch {
      /* ignore */
    }
    setData(emptyResumeData);
  }, []);

  const saveNow = useCallback(async (): Promise<ResumeSaveResult> => {
    const result = await syncResumeFromLocalStorage(data);
    if (result.ok && result.data) {
      setData(result.data);
    }
    return result;
  }, [data]);

  return (
    <ResumeContext.Provider
      value={{
        data,
        updatePersonal,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        addLanguage,
        updateLanguage,
        removeLanguage,
        setTemplate,
        setAccentColor,
        toggleSection,
        reorderSections,
        loadDemoData,
        clearData,
        saveNow,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
