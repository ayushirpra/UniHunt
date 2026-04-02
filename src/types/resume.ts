export type ResumeTemplate = 'modern' | 'classic' | 'minimal';

export interface Education {
  school: string;
  degree: string;
  field: string;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  link: string;
}

export interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
}

export interface Resume {
  id?: string;
  title: string;
  template: ResumeTemplate;
  data: ResumeData;
  created_at?: string;
  updated_at?: string;
}

export interface ResumeVersion {
  id: string;
  resume_id: string;
  version_number: number;
  title: string;
  template: ResumeTemplate;
  data: ResumeData;
  saved_at: string;
}

export const emptyResumeData: ResumeData = {
  personal: { name: '', email: '', phone: '', location: '', linkedin: '', summary: '' },
  education: [{ school: '', degree: '', field: '', year: '' }],
  experience: [{ company: '', role: '', duration: '', description: '' }],
  skills: [''],
  projects: [{ name: '', description: '', link: '' }],
};
