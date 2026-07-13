import { useState, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  User,
  Link,
  Briefcase,
  GraduationCap,
  Wrench,
  Users,
  FolderKanban,
  Trophy,
  Plus,
  Trash2,
  
} from 'lucide-react';
import type { CVData, TemplateType, Experience, Education, Project, Reference, Skill } from '../types';

interface CVFormProps {
  onSubmit: (data: CVData) => void;
  selectedTemplate: TemplateType;
}

const STEPS = [
  { title: 'Personal Info', icon: User, desc: 'Basic details & summary' },
  { title: 'Links & Contact', icon: Link, desc: 'Professional profiles' },
  { title: 'Experience', icon: Briefcase, desc: 'Work history' },
  { title: 'Education', icon: GraduationCap, desc: 'Qualifications & matric' },
  { title: 'Projects', icon: FolderKanban, desc: 'Portfolio & work samples' },
  { title: 'Skills', icon: Wrench, desc: 'Technical & soft skills' },
  { title: 'References', icon: Users, desc: 'Professional contacts' },
  { title: 'Achievements', icon: Trophy, desc: 'Awards & certifications' },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function CVForm({ onSubmit }: CVFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CVData>({
    experiences: [{ id: generateId(), jobtitle: '', company: '', startdate: '', enddate: '', duties: '', technologies: '', isInternship: false }],
    education: [{ id: generateId(), degree: '', school: '', startYear: '', endYear: '', grade: '', subjects: '', coursework: '', achievements: '' }],
    projects: [{ id: generateId(), name: '', description: '', technologies: '', link: '', achievements: '' }],
    technicalSkills: [{ id: generateId(), name: '' }],
    softSkills: [{ id: generateId(), name: '' }],
    references: [{ id: generateId(), name: '', role: '', company: '', contact: '' }],
    seekerType: 'experienced',
  });

  const totalSteps = STEPS.length;

  const updateField = useCallback((field: keyof CVData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateExperience = useCallback((id: string, field: keyof Experience, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences?.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  }, []);

  const addExperience = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...(prev.experiences || []), {
        id: generateId(),
        jobtitle: '',
        company: '',
        startdate: '',
        enddate: '',
        duties: '',
        technologies: '',
        isInternship: false,
      }],
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences?.filter(exp => exp.id !== id),
    }));
  }, []);

  const updateEducation = useCallback((id: string, field: keyof Education, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education?.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  }, []);

  const addEducation = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      education: [...(prev.education || []), {
        id: generateId(),
        degree: '',
        school: '',
        startYear: '',
        endYear: '',
        grade: '',
        subjects: '',
        coursework: '',
        achievements: '',
      }],
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education?.filter(edu => edu.id !== id),
    }));
  }, []);

  const updateProject = useCallback((id: string, field: keyof Project, value: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects?.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  }, []);

  const addProject = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), {
        id: generateId(),
        name: '',
        description: '',
        technologies: '',
        link: '',
        achievements: '',
      }],
    }));
  }, []);

  const removeProject = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects?.filter(proj => proj.id !== id),
    }));
  }, []);

  

  const addSkill = useCallback((type: 'technicalSkills' | 'softSkills') => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...(prev[type] as Skill[] || []), { id: generateId(), name: '' }],
    }));
  }, []);

  const removeSkill = useCallback((type: 'technicalSkills' | 'softSkills', id: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: (prev[type] as Skill[])?.filter(skill => skill.id !== id),
    }));
  }, []);

  const updateReference = useCallback((id: string, field: keyof Reference, value: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references?.map(ref =>
        ref.id === id ? { ...ref, [field]: value } : ref
      ),
    }));
  }, []);

  const addReference = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      references: [...(prev.references || []), {
        id: generateId(),
        name: '',
        role: '',
        company: '',
        contact: '',
      }],
    }));
  }, []);

  const removeReference = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references?.filter(ref => ref.id !== id),
    }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  }, [formData, onSubmit]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-bold text-2xl text-text-primary mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-5 h-5 text-bg" />
              </div>
              <span>Personal Information</span>
            </h3>

            {/* Seeker Type Selection */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <label className="block text-sm font-medium mb-3 text-text-secondary">
                I am a...
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'experienced', label: 'Experienced Professional' },
                  { id: 'graduate', label: 'Graduate' },
                  { id: 'internship', label: 'Seeking Internship' },
                  { id: 'general', label: 'General Job Seeker' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateField('seekerType', type.id as CVData['seekerType'])}
                    className={`p-3 rounded-xl border-2 transition-all text-center text-sm font-medium
                      ${formData.seekerType === type.id
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-border hover:border-primary/50 text-text-secondary'
                      }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Full Name</label>
                <input
                  type="text"
                  value={formData.fullname || ''}
                  onChange={(e) => updateField('fullname', e.target.value)}
                  className="input-field"
                  placeholder="Lungile Phakathi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Professional Title</label>
                <input
                  type="text"
                  value={formData.jobtitle || ''}
                  onChange={(e) => updateField('jobtitle', e.target.value)}
                  className="input-field"
                  placeholder="Junior Software Developer | Full-Stack Developer | Data Analyst"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Email Address</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="input-field"
                  placeholder="lungiphakz@gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="input-field"
                  placeholder="079 102 8667"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2 text-text-secondary">Location</label>
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="input-field"
                  placeholder="South Africa, Johannesburg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Professional Summary</label>
              <textarea
                value={formData.summary || ''}
                onChange={(e) => updateField('summary', e.target.value)}
                className="input-field min-h-[150px]"
                placeholder="Motivated and results-driven Computer Science graduate with practical experience in software development, data analytics, IT support, and business systems development..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Availability</label>
              <input
                type="text"
                value={formData.availability || ''}
                onChange={(e) => updateField('availability', e.target.value)}
                className="input-field"
                placeholder="Available Immediately"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-bold text-2xl text-text-primary mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <Link className="w-5 h-5 text-bg" />
              </div>
              <span>Links & Contact</span>
            </h3>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => updateField('linkedin', e.target.value)}
                className="input-field"
                placeholder="linkedin.com/in/lungile-phakathi-542aa0366"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">GitHub URL</label>
              <input
                type="url"
                value={formData.github || ''}
                onChange={(e) => updateField('github', e.target.value)}
                className="input-field"
                placeholder="github.com/LungiPhakz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Portfolio URL</label>
              <input
                type="url"
                value={formData.portfolio || ''}
                onChange={(e) => updateField('portfolio', e.target.value)}
                className="input-field"
                placeholder="lungiphakz.github.io/my-portfolia-repo/"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Personal Website</label>
              <input
                type="url"
                value={formData.website || ''}
                onChange={(e) => updateField('website', e.target.value)}
                className="input-field"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-2xl text-text-primary flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-bg" />
                </div>
                <span>Work Experience</span>
              </h3>
              <button
                type="button"
                onClick={addExperience}
                className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>

            {formData.experiences?.map((exp, index) => (
              <div key={exp.id} className="p-5 rounded-xl bg-white/5 border border-white/10 relative">
                {formData.experiences && formData.experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="font-medium text-primary mb-4">Experience {index + 1}</div>

                <div className="flex items-center gap-3 mb-4">
                  <label className="flex items-center gap-2 text-sm text-text-secondary">
                    <input
                      type="checkbox"
                      checked={exp.isInternship}
                      onChange={(e) => updateExperience(exp.id, 'isInternship', e.target.checked)}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    This is an Internship / WIL
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Job Title</label>
                    <input
                      type="text"
                      value={exp.jobtitle}
                      onChange={(e) => updateExperience(exp.id, 'jobtitle', e.target.value)}
                      className="input-field"
                      placeholder="Data Science Intern"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="input-field"
                      placeholder="Moepi Publishing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Start Date</label>
                    <input
                      type="text"
                      value={exp.startdate}
                      onChange={(e) => updateExperience(exp.id, 'startdate', e.target.value)}
                      className="input-field"
                      placeholder="August 2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">End Date</label>
                    <input
                      type="text"
                      value={exp.enddate}
                      onChange={(e) => updateExperience(exp.id, 'enddate', e.target.value)}
                      className="input-field"
                      placeholder="January 2026"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2 text-text-muted">Responsibilities & Achievements</label>
                  <textarea
                    value={exp.duties}
                    onChange={(e) => updateExperience(exp.id, 'duties', e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="• Developed interactive Power BI dashboards for Scrum management&#10;• Automated business workflows using Python scripts&#10;• Built and maintained Laravel and MySQL applications"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2 text-text-muted">Technologies Used</label>
                  <input
                    type="text"
                    value={exp.technologies}
                    onChange={(e) => updateExperience(exp.id, 'technologies', e.target.value)}
                    className="input-field"
                    placeholder="Power BI, Python, Laravel, PHP, MySQL, SharePoint"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-2xl text-text-primary flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-bg" />
                </div>
                <span>Education</span>
              </h3>
              <button
                type="button"
                onClick={addEducation}
                className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </button>
            </div>

            {formData.education?.map((edu, index) => (
              <div key={edu.id} className="p-5 rounded-xl bg-white/5 border border-white/10 relative">
                {formData.education && formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="font-medium text-primary mb-4">
                  {edu.degree?.toLowerCase().includes('matric') || edu.degree?.toLowerCase().includes('grade 12')
                    ? 'Matric / High School'
                    : `Education ${index + 1}`}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">
                      {edu.degree?.toLowerCase().includes('matric') ? 'Grade / Qualification' : 'Degree / Qualification'}
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="input-field"
                      placeholder="Diploma in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">
                      {edu.degree?.toLowerCase().includes('matric') ? 'School Name' : 'Institution'}
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      className="input-field"
                      placeholder="Tshwane University of Technology (TUT)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Start Year</label>
                    <input
                      type="text"
                      value={edu.startYear}
                      onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                      className="input-field"
                      placeholder="2022"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">End Year</label>
                    <input
                      type="text"
                      value={edu.endYear}
                      onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                      className="input-field"
                      placeholder="2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Grade / GPA (Optional)</label>
                    <input
                      type="text"
                      value={edu.grade}
                      onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                      className="input-field"
                      placeholder="Distinction, 85%, A Grade"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Subjects (for Matric)</label>
                    <input
                      type="text"
                      value={edu.subjects}
                      onChange={(e) => updateEducation(edu.id, 'subjects', e.target.value)}
                      className="input-field"
                      placeholder="Mathematics, Physical Science, English, Life Science, Accounting"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2 text-text-muted">Relevant Coursework</label>
                  <textarea
                    value={edu.coursework}
                    onChange={(e) => updateEducation(edu.id, 'coursework', e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="• Software Development&#10;• Database Systems&#10;• Object-Oriented Programming"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2 text-text-muted">Achievements (Optional)</label>
                  <textarea
                    value={edu.achievements}
                    onChange={(e) => updateEducation(edu.id, 'achievements', e.target.value)}
                    className="input-field min-h-[60px]"
                    placeholder="Dean's List, Best project award, etc."
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-2xl text-text-primary flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-bg" />
                </div>
                <span>Projects</span>
              </h3>
              <button
                type="button"
                onClick={addProject}
                className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>
            <p className="text-text-muted text-sm mb-6">
              Showcase your best work - personal projects, academic projects, or open-source contributions
            </p>

            {formData.projects?.map((proj, index) => (
              <div key={proj.id} className="p-5 rounded-xl bg-white/5 border border-white/10 relative">
                {formData.projects && formData.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="font-medium text-accent mb-4">Project {index + 1}</div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      className="input-field"
                      placeholder="Digital Letter Approval System"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Live URL / GitHub Link</label>
                    <input
                      type="text"
                      value={proj.link}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                      className="input-field"
                      placeholder="https://www.communityletters.xyz"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2 text-text-muted">Description</label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    className="input-field min-h-[60px]"
                    placeholder="A production-ready workflow management platform designed to streamline community and organizational letter approvals."
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2 text-text-muted">Technologies Used</label>
                  <input
                    type="text"
                    value={proj.technologies}
                    onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                    className="input-field"
                    placeholder="Laravel, PHP, MySQL, JavaScript, Bootstrap"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2 text-text-muted">Key Achievements</label>
                  <textarea
                    value={proj.achievements}
                    onChange={(e) => updateProject(proj.id, 'achievements', e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="• Developed complete application architecture using Laravel&#10;• Implemented OTP authentication for enhanced security&#10;• Built role-based access control system"
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-bold text-2xl text-text-primary mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Wrench className="w-5 h-5 text-bg" />
              </div>
              <span>Skills</span>
            </h3>

            {/* Technical Skills */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-text-secondary">Technical Skills</label>
                <button
                  type="button"
                  onClick={() => addSkill('technicalSkills')}
                  className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>

              {formData.technicalSkills?.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => {
                      const newSkills = [...(formData.technicalSkills || [])];
                      newSkills[index] = { ...skill, name: e.target.value };
                      setFormData(prev => ({ ...prev, technicalSkills: newSkills }));
                    }}
                    className="input-field flex-1"
                    placeholder="PHP, Java, JavaScript, Python..."
                  />
                  {(formData.technicalSkills?.length || 0) > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill('technicalSkills', skill.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Programming Languages */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Programming Languages</label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => updateField('languages', e.target.value)}
                className="input-field"
                placeholder="PHP, Java, JavaScript, Python, Kotlin, SQL, HTML5, CSS3"
              />
            </div>

            {/* Tools & Platforms */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Tools & Platforms</label>
              <input
                type="text"
                value={formData.tools}
                onChange={(e) => updateField('tools', e.target.value)}
                className="input-field"
                placeholder="Git, GitHub, Power BI, Postman, VS Code, XAMPP, Microsoft Office"
              />
            </div>

            {/* Soft Skills */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-text-secondary">Soft Skills</label>
                <button
                  type="button"
                  onClick={() => addSkill('softSkills')}
                  className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>

              {formData.softSkills?.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => {
                      const newSkills = [...(formData.softSkills || [])];
                      newSkills[index] = { ...skill, name: e.target.value };
                      setFormData(prev => ({ ...prev, softSkills: newSkills }));
                    }}
                    className="input-field flex-1"
                    placeholder="Leadership, Communication, Problem Solving..."
                  />
                  {(formData.softSkills?.length || 0) > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill('softSkills', skill.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-bold text-2xl text-text-primary mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Users className="w-5 h-5 text-bg" />
              </div>
              <span>References</span>
            </h3>
            <p className="text-text-muted text-sm mb-6">Add professional references or write "Available upon request"</p>

            {formData.references?.map((ref, index) => (
              <div key={ref.id} className="p-5 rounded-xl bg-white/5 border border-white/10 relative">
                {formData.references && formData.references.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeReference(ref.id)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="font-medium text-primary mb-4">Reference {index + 1}</div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Full Name</label>
                    <input
                      type="text"
                      value={ref.name}
                      onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                      className="input-field"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Role / Title</label>
                    <input
                      type="text"
                      value={ref.role}
                      onChange={(e) => updateReference(ref.id, 'role', e.target.value)}
                      className="input-field"
                      placeholder="Senior Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Company</label>
                    <input
                      type="text"
                      value={ref.company}
                      onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                      className="input-field"
                      placeholder="TechCorp"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-muted">Contact Info</label>
                    <input
                      type="text"
                      value={ref.contact}
                      onChange={(e) => updateReference(ref.id, 'contact', e.target.value)}
                      className="input-field"
                      placeholder="jane@techcorp.com"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={addReference}
                className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Reference
              </button>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6 animate-fade-in">
            <h3 className="font-bold text-2xl text-text-primary mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Trophy className="w-5 h-5 text-bg" />
              </div>
              <span>Achievements</span>
            </h3>
            <p className="text-text-muted text-sm mb-6">
              List your key achievements, awards, and certifications
            </p>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-secondary">Achievements & Awards</label>
              <textarea
                value={formData.achievements}
                onChange={(e) => updateField('achievements', e.target.value)}
                className="input-field min-h-[200px]"
                placeholder="• Successfully completed Computer Science Diploma&#10;• Completed Work Integrated Learning and Internship Programme&#10;• Developed multiple full-stack web applications using Laravel and MySQL&#10;• Built and deployed live production software systems&#10;• Developed Power BI business intelligence dashboards&#10;• Automated business workflows using Python"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-8 relative">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

      <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 glow-text">Build Your CV</h2>

      <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {renderStep()}

        <div className="flex justify-between items-center pt-8 mt-8 border-t border-border relative z-10">
          <button
            type="button"
            onClick={handlePrev}
            className={`btn-secondary flex items-center gap-2 text-sm py-3 px-5 ${currentStep === 1 ? 'invisible' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary flex items-center gap-2 text-sm py-3 px-5"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-cta flex items-center gap-2 text-sm py-3 px-5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My CV</span>
            </button>
          )}
        </div>

        {/* Step indicators */}
        <div className="mt-8 flex justify-center gap-1 overflow-x-auto pb-2">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                    ${i + 1 === currentStep
                      ? 'bg-gradient-to-br from-primary to-accent scale-110 shadow-glow-primary'
                      : i < currentStep
                        ? 'bg-accent/20 border border-accent'
                        : 'bg-surface border border-border'
                    }`}
                  title={step.title}
                >
                  {i < currentStep ? (
                    <Icon className="w-4 h-4 text-accent" />
                  ) : (
                    <span className={`text-xs font-bold ${i + 1 === currentStep ? 'text-bg' : 'text-text-muted'}`}>
                      {i + 1}
                    </span>
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-6 h-0.5 transition-colors duration-300 ${i < currentStep - 1 ? 'bg-accent' : 'bg-border'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-3 text-sm text-text-secondary">
          Step {currentStep} of {totalSteps}: {STEPS[currentStep - 1].title}
          <span className="hidden sm:inline"> — {STEPS[currentStep - 1].desc}</span>
        </div>
      </form>
    </section>
  );
}
