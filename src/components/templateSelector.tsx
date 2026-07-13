import { Check } from 'lucide-react';
import type { TemplateType } from '../types';

interface TemplateSelectorProps {
  templates: { id: TemplateType; name: string; desc: string }[];
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

// Full-page template preview generator
const getFullPagePreview = (templateId: TemplateType) => {
  const name = 'LUNGILE PHAKATHI';
  const title = 'Junior Software Developer | Full-Stack Developer';
  const contact = 'South Africa | 079 102 8667 | email@example.com';
  const summary = 'Motivated Computer Science graduate with practical experience in software development, data analytics, and IT support. Demonstrated ability to develop production-ready applications...';

  const baseStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: 'white',
    color: '#1f2937',
    fontFamily: 'Inter, sans-serif',
    fontSize: '8px',
    lineHeight: '1.4',
    overflow: 'hidden',
  };

  switch (templateId) {
    case 'classic':
      return (
        <div style={baseStyles}>
          <div style={{ textAlign: 'center', padding: '16px', borderBottom: '2px solid #0ea5e9' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '1px', color: '#0f172a' }}>{name}</div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '4px' }}>{title}</div>
            <div style={{ fontSize: '8px', color: '#94a3b8', marginTop: '4px' }}>{contact}</div>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <SectionTitle color="#0369a1">PROFESSIONAL SUMMARY</SectionTitle>
            <p style={{ marginBottom: '8px' }}>{summary}</p>
            <SectionTitle color="#0369a1">EXPERIENCE</SectionTitle>
            <div>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Data Science Intern — Moepi Publishing</div>
              <div style={{ color: '#64748b', marginBottom: '4px' }}>August 2025 – Present</div>
              <p>• Developed interactive Power BI dashboards for Scrum management...</p>
            </div>
            <div style={{ marginTop: '8px' }}>
              <SectionTitle color="#0369a1">EDUCATION</SectionTitle>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Diploma in Computer Science</div>
              <div style={{ color: '#64748b' }}>Tshwane University of Technology (2022–2025)</div>
            </div>
            <SectionTitle color="#0369a1">SKILLS</SectionTitle>
            <SkillTags skills={['PHP', 'Laravel', 'Python', 'JavaScript', 'MySQL', 'Power BI']} />
          </div>
        </div>
      );

    case 'modern':
      return (
        <div style={baseStyles}>
          <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', color: 'white', padding: '20px 16px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1px' }}>{name}</div>
            <div style={{ fontSize: '10px', opacity: 0.9, marginTop: '4px' }}>{title}</div>
            <div style={{ fontSize: '8px', opacity: 0.8, marginTop: '4px' }}>{contact}</div>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <SectionTitleModern>SUMMARY</SectionTitleModern>
            <p style={{ marginBottom: '8px' }}>{summary}</p>
            <SectionTitleModern>EXPERIENCE</SectionTitleModern>
            <div style={{ fontWeight: 700, color: '#0f172a' }}>Data Science Intern — Moepi Publishing</div>
            <div style={{ color: '#64748b' }}>August 2025 – Present</div>
            <p style={{ marginTop: '4px' }}>• Developed Power BI dashboards for ticket tracking...</p>
            <div style={{ marginTop: '8px' }}>
              <SectionTitleModern>EDUCATION</SectionTitleModern>
              <div style={{ fontWeight: 700 }}>Diploma in Computer Science — TUT (2022–2025)</div>
            </div>
            <SectionTitleModern>SKILLS</SectionTitleModern>
            <SkillTags skills={['PHP', 'Laravel', 'Python', 'React', 'MySQL', 'Power BI']} />
          </div>
        </div>
      );

    case 'minimal':
      return (
        <div style={baseStyles}>
          <div style={{ padding: '20px 16px', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a' }}>{name}</div>
            <div style={{ fontSize: '10px', color: '#0ea5e9', marginTop: '4px' }}>{title}</div>
            <div style={{ fontSize: '8px', color: '#64748b', marginTop: '4px' }}>{contact}</div>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <SectionTitleMinimal>Summary</SectionTitleMinimal>
            <p>{summary}</p>
            <SectionTitleMinimal>Experience</SectionTitleMinimal>
            <div style={{ fontWeight: 700 }}>Data Science Intern — Moepi Publishing</div>
            <div style={{ color: '#64748b', fontSize: '8px' }}>August 2025 – Present</div>
            <SectionTitleMinimal>Education</SectionTitleMinimal>
            <div>Diploma in Computer Science — TUT (2022–2025)</div>
            <SectionTitleMinimal>Skills</SectionTitleMinimal>
            <div>PHP, Laravel, Python, JavaScript, MySQL, Power BI</div>
          </div>
        </div>
      );

    case 'executive':
      return (
        <div style={{ ...baseStyles, display: 'flex' }}>
          <div style={{ width: '35%', background: '#f8fafc', borderRight: '3px solid #0ea5e9', padding: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{name}</div>
            <div style={{ fontSize: '8px', color: '#64748b', marginTop: '8px' }}>{contact.replace(' | ', '\n')}</div>
            <div style={{ marginTop: '16px' }}>
              <SectionTitleExec>SKILLS</SectionTitleExec>
              <SkillList skills={['PHP', 'Laravel', 'Python', 'JavaScript', 'MySQL', 'Power BI', 'React']} />
            </div>
            <div style={{ marginTop: '12px' }}>
              <SectionTitleExec>TOOLS</SectionTitleExec>
              <SkillList skills={['Git', 'GitHub', 'VS Code', 'Postman']} />
            </div>
          </div>
          <div style={{ width: '65%', padding: '16px' }}>
            <SectionTitleExec>PROFILE</SectionTitleExec>
            <p style={{ marginBottom: '8px' }}>{summary}</p>
            <SectionTitleExec>EXPERIENCE</SectionTitleExec>
            <div style={{ fontWeight: 700 }}>Data Science Intern — Moepi Publishing</div>
            <div style={{ color: '#64748b', marginBottom: '4px' }}>August 2025 – Present</div>
            <p>• Developed Power BI dashboards for Scrum management...</p>
            <div style={{ marginTop: '8px' }}>
              <SectionTitleExec>EDUCATION</SectionTitleExec>
              <div style={{ fontWeight: 700 }}>Diploma in Computer Science</div>
              <div style={{ color: '#64748b' }}>Tshwane University of Technology (2022–2025)</div>
            </div>
          </div>
        </div>
      );

    case 'creative':
      return (
        <div style={{ ...baseStyles, display: 'flex' }}>
          <div style={{ width: '30%', background: 'linear-gradient(180deg, #10b981, #059669)', color: 'white', padding: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700 }}>{name}</div>
            <div style={{ fontSize: '8px', opacity: 0.9, marginTop: '8px' }}>{contact.replace(' | ', '\n')}</div>
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '9px', marginBottom: '4px', letterSpacing: '1px' }}>SKILLS</div>
              <SkillListLight skills={['PHP', 'Laravel', 'Python', 'JavaScript', 'MySQL']} />
            </div>
          </div>
          <div style={{ width: '70%', padding: '16px' }}>
            <SectionTitleCreative>ABOUT ME</SectionTitleCreative>
            <p style={{ marginBottom: '8px' }}>{summary}</p>
            <SectionTitleCreative>EXPERIENCE</SectionTitleCreative>
            <div style={{ fontWeight: 700 }}>Data Science Intern — Moepi Publishing</div>
            <div style={{ color: '#64748b', marginBottom: '4px' }}>August 2025 – Present</div>
            <p>• Developed Power BI dashboards for business analytics...</p>
            <div style={{ marginTop: '8px' }}>
              <SectionTitleCreative>EDUCATION</SectionTitleCreative>
              <div style={{ fontWeight: 700 }}>Diploma in Computer Science — TUT (2022–2025)</div>
            </div>
          </div>
        </div>
      );

    case 'compact':
      return (
        <div style={baseStyles}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0ea5e9', padding: '12px 16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{name}</div>
            <div style={{ fontSize: '7px', textAlign: 'right', color: '#64748b' }}>
              <div>{contact}</div>
            </div>
          </div>
          <div style={{ padding: '8px 16px' }}>
            <p style={{ marginBottom: '8px', lineHeight: '1.3' }}>{summary.substring(0, 80)}...</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <SectionTitleCompact>EXPERIENCE</SectionTitleCompact>
                <div style={{ fontWeight: 700 }}>Data Science Intern — Moepi Publishing</div>
                <div style={{ color: '#64748b', fontSize: '7px' }}>Aug 2025 – Present</div>
                <p style={{ marginTop: '4px' }}>• Power BI dashboards...</p>
                <SectionTitleCompact style={{ marginTop: '6px' }}>EDUCATION</SectionTitleCompact>
                <div>Diploma in Computer Science — TUT</div>
              </div>
              <div style={{ flex: 1 }}>
                <SectionTitleCompact>TECHNICAL SKILLS</SectionTitleCompact>
                <div>PHP, Laravel, Python, JavaScript, MySQL, Power BI</div>
                <SectionTitleCompact style={{ marginTop: '6px' }}>SOFT SKILLS</SectionTitleCompact>
                <div>Communication, Teamwork, Problem Solving</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'elegant':
      return (
        <div style={{ ...baseStyles, fontFamily: 'Playfair Display, Georgia, serif' }}>
          <div style={{ textAlign: 'center', padding: '20px 16px' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '3px', color: '#0f172a' }}>{name}</div>
            <div style={{ fontStyle: 'italic', color: '#64748b', marginTop: '4px' }}>{title}</div>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #10b981, #0ea5e9)', margin: '8px auto' }} />
            <div style={{ fontSize: '8px', color: '#64748b' }}>{contact}</div>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <SectionTitleElegant>PROFILE</SectionTitleElegant>
            <p style={{ borderLeft: '2px solid #10b981', paddingLeft: '12px', marginBottom: '8px' }}>{summary}</p>
            <SectionTitleElegant>EXPERIENCE</SectionTitleElegant>
            <div style={{ borderLeft: '2px solid #10b981', paddingLeft: '12px' }}>
              <div style={{ fontWeight: 700 }}>Data Science Intern — Moepi Publishing</div>
              <div style={{ color: '#64748b' }}>August 2025 – Present</div>
              <p style={{ marginTop: '4px' }}>• Developed Power BI dashboards for business intelligence...</p>
            </div>
            <div style={{ marginTop: '8px' }}>
              <SectionTitleElegant>EDUCATION</SectionTitleElegant>
              <div style={{ borderLeft: '2px solid #10b981', paddingLeft: '12px' }}>
                <div style={{ fontWeight: 700 }}>Diploma in Computer Science — TUT (2022–2025)</div>
              </div>
            </div>
            <SectionTitleElegant>SKILLS</SectionTitleElegant>
            <div style={{ borderLeft: '2px solid #10b981', paddingLeft: '12px' }}>PHP, Laravel, Python, JavaScript, MySQL, Power BI</div>
          </div>
        </div>
      );

    case 'tech':
      return (
        <div style={{ ...baseStyles, fontFamily: 'JetBrains Mono, monospace', background: '#f1f5f9' }}>
          <div style={{ background: '#0f172a', color: '#10b981', padding: '16px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8' }}>$ whoami</div>
            <div style={{ color: '#10b981', marginTop: '4px' }}>{name.toLowerCase()} // {title.split('|')[0].trim()}</div>
            <div style={{ fontSize: '7px', color: '#94a3b8', marginTop: '4px' }}>{contact}</div>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ color: '#0ea5e9', fontWeight: 700 }}>$ cat summary.md</div>
            <p style={{ marginBottom: '8px' }}>{summary}</p>
            <div style={{ color: '#0ea5e9', fontWeight: 700 }}>$ cat experience.log</div>
            <div style={{ marginBottom: '4px' }}>→ <span style={{ fontWeight: 700 }}>Data Science Intern</span> @ Moepi Publishing [Aug 2025–Present]</div>
            <p style={{ marginLeft: '12px' }}>• Developed Power BI dashboards...</p>
            <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '8px' }}>$ cat education.txt</div>
            <div>Diploma in Computer Science — TUT (2022–2025)</div>
            <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '8px' }}>$ ls skills/</div>
            <div style={{ color: '#10b981' }}>php/ laravel/ python/ javascript/ mysql/ powerbi/</div>
          </div>
        </div>
      );

    default:
      return <div style={baseStyles} />;
  }
};

// Helper components
function SectionTitle({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontWeight: 700, letterSpacing: '1px', fontSize: '9px', marginTop: '8px', marginBottom: '4px', color: color || '#0369a1', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>
      {children}
    </div>
  );
}

function SectionTitleModern({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, letterSpacing: '1px', fontSize: '9px', marginTop: '8px', marginBottom: '4px', color: '#0ea5e9' }}>
      {children}
    </div>
  );
}

function SectionTitleMinimal({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 600, fontSize: '10px', marginTop: '10px', marginBottom: '3px', color: '#0ea5e9' }}>
      {children}
    </div>
  );
}

function SectionTitleExec({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '8px', letterSpacing: '1px', marginTop: '8px', marginBottom: '4px', color: '#0369a1', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px' }}>
      {children}
    </div>
  );
}

function SectionTitleCreative({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '9px', color: '#10b981', marginTop: '8px', marginBottom: '4px' }}>
      {children}
    </div>
  );
}

function SectionTitleCompact({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '7px', letterSpacing: '0.5px', marginTop: '6px', marginBottom: '2px', color: '#f59e0b', borderBottom: '1px solid #fed7aa', paddingBottom: '1px', ...style }}>
      {children}
    </div>
  );
}

function SectionTitleElegant({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '9px', letterSpacing: '2px', marginTop: '10px', marginBottom: '4px', color: '#b45309' }}>
      {children}
    </div>
  );
}

function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
      {skills.map((skill) => (
        <span key={skill} style={{ padding: '2px 6px', background: 'rgba(14, 165, 233, 0.1)', color: '#0369a1', borderRadius: '4px', fontSize: '7px', fontWeight: 600 }}>
          {skill}
        </span>
      ))}
    </div>
  );
}

function SkillList({ skills }: { skills: string[] }) {
  return (
    <div style={{ lineHeight: '1.4' }}>
      {skills.map((skill) => (
        <div key={skill}>• {skill}</div>
      ))}
    </div>
  );
}

function SkillListLight({ skills }: { skills: string[] }) {
  return (
    <div style={{ lineHeight: '1.4', opacity: 0.9 }}>
      {skills.map((skill) => (
        <div key={skill}>• {skill}</div>
      ))}
    </div>
  );
}

const templates: { id: TemplateType; name: string; desc: string }[] = [
  { id: 'classic', name: 'Classic', desc: 'Traditional single-column' },
  { id: 'modern', name: 'Modern', desc: 'Bold gradient header' },
  { id: 'minimal', name: 'Minimal', desc: 'Clean whitespace' },
  { id: 'executive', name: 'Executive', desc: 'Two-column pro' },
  { id: 'creative', name: 'Creative', desc: 'Side accent bar' },
  { id: 'compact', name: 'Compact', desc: 'Dense info display' },
  { id: 'elegant', name: 'Elegant', desc: 'Serif typography' },
  { id: 'tech', name: 'Tech', desc: 'Terminal style' },
];

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black glow-text">Choose Your Template</h2>
          <p className="mt-4 text-lg text-text-secondary">
            Full-page previews — select your perfect layout
          </p>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, idx) => (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`template-card group relative animate-fade-in`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Full-page preview container */}
              <div
                className={`mx-auto rounded-xl overflow-hidden border-2 transition-all duration-300
                  ${selected === template.id
                    ? 'border-primary shadow-glow-primary scale-[1.02]'
                    : 'border-border hover:border-primary/50'
                  }`}
                style={{
                  aspectRatio: '210/297',
                  maxWidth: '200px',
                }}
              >
                {getFullPagePreview(template.id)}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-xl" />
              </div>

              {/* Info section */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className={`font-semibold text-lg
                    ${selected === template.id ? 'text-primary' : 'text-text-primary'}`}>
                    {template.name}
                  </span>
                  {selected === template.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-glow-primary">
                      <Check className="w-3.5 h-3.5 text-bg" />
                    </div>
                  )}
                </div>
                <div className="text-xs text-text-muted mt-1">{template.desc}</div>
              </div>

              {/* Selection indicator bar */}
              <div className={`h-1 rounded-full mt-3 transition-all duration-300
                ${selected === template.id
                  ? 'bg-gradient-to-r from-primary via-accent to-secondary'
                  : 'bg-border group-hover:bg-primary/30'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
