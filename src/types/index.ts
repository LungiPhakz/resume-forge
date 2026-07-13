export type TemplateType =
  | 'classic'
  | 'modern'
  | 'minimal'
  | 'executive'
  | 'creative'
  | 'compact'
  | 'elegant'
  | 'tech';

export interface Experience {
  id: string;
  jobtitle: string;
  company: string;
  startdate: string;
  enddate: string;
  duties: string;
  technologies?: string;
  isInternship?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startYear: string;
  endYear: string;
  grade?: string;
  subjects?: string;
  coursework?: string;
  achievements?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  achievements: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Reference {
  id: string;
  name: string;
  role: string;
  company: string;
  contact: string;
}

export interface CVData {
  // Personal Information
  fullname?: string;
  jobtitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  availability?: string;

  // Links
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;

  // Multiple Experiences
  experiences?: Experience[];

  // Multiple Education entries
  education?: Education[];

  // Projects
  projects?: Project[];

  // Skills grouped
  technicalSkills?: Skill[];
  softSkills?: Skill[];
  languages?: string;
  tools?: string;

  // References
  references?: Reference[];

  // Achievements
  achievements?: string;

  // Job seeker type
  seekerType?: 'graduate' | 'experienced' | 'internship' | 'general';
}

export interface Template {
  id: TemplateType;
  name: string;
  desc: string;
}
