import { useRef, useCallback } from 'react';
import { Download, RefreshCw, FileText } from 'lucide-react';
import type { CVData, TemplateType } from '../types';

interface CVPreviewProps {
  data: CVData;
  template: TemplateType;
}

export default function CVPreview({ data, template }: CVPreviewProps) {
  const cvRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = useCallback(async () => {
    if (!cvRef.current) return;

    const html2pdf = (await import('html2pdf.js')).default;

    const element = cvRef.current;
    const originalTransform = element.style.transform;
    const originalWidth = element.style.width;

    element.style.transform = 'none';
    element.style.width = '210mm';

    const opt = {
  margin: 0,
  filename: `${(data.fullname || 'Resume')}-CV.pdf`,
  image: {
    type: 'jpeg' as const,
    quality: 1,
  },
  html2canvas: {
    scale: 3,
    useCORS: true,
    logging: false,
  },
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait' as const,
  },
};

    html2pdf().from(element).set(opt).save().then(() => {
      element.style.transform = originalTransform;
      element.style.width = originalWidth;
    });
  }, [data.fullname]);

  const links = [
    data.linkedin && `LinkedIn: ${data.linkedin}`,
    data.github && `GitHub: ${data.github}`,
    data.portfolio && `Portfolio: ${data.portfolio}`,
    data.website && `Website: ${data.website}`,
  ].filter(Boolean).join('\n');

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return (
          <div style={{ fontFamily: 'Inter, sans-serif', padding: '28px 32px', color: '#334155' }}>
            <style>{`.sec-title{font-weight:700;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #0ea5e9;padding-bottom:3px;margin-bottom:5px;margin-top:12px;font-size:11px;color:#0369a1}`}</style>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '1px', color: '#0f172a' }}>
                {(data.fullname || 'Your Name').toUpperCase()}
              </div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
                {data.jobtitle || 'Professional Title'}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                {data.location} | {data.phone} | {data.email}
              </div>
              {links && <pre style={{ fontSize: '9px', color: '#64748b', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{links}</pre>}
            </div>

            {/* Summary */}
            <div className="sec-title">PROFESSIONAL SUMMARY</div>
            <p style={{ fontSize: '10px', lineHeight: 1.5 }}>{data.summary}</p>

            {/* Experience */}
            <div className="sec-title">PROFESSIONAL EXPERIENCE</div>
            {data.experiences?.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>
                  {exp.jobtitle} — {exp.company}
                  {exp.isInternship && <span style={{ color: '#0ea5e9', marginLeft: '8px', fontSize: '9px' }}>[Internship/WIL]</span>}
                </div>
                <div style={{ color: '#64748b', fontSize: '10px' }}>{exp.startdate} – {exp.enddate}</div>
                <p style={{ fontSize: '10px', marginTop: '3px', whiteSpace: 'pre-line' }}>{exp.duties}</p>
                {exp.technologies && (
                  <div style={{ fontSize: '9px', color: '#64748b', marginTop: '3px' }}>
                    <span style={{ color: '#0369a1', fontWeight: 600 }}>Technologies:</span> {exp.technologies}
                  </div>
                )}
              </div>
            ))}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && data.projects[0].name && (
              <>
                <div className="sec-title">PROJECT EXPERIENCE</div>
                {data.projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '10px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{proj.name}</div>
                    {proj.link && <div style={{ fontSize: '9px', color: '#0ea5e9' }}>{proj.link}</div>}
                    <p style={{ fontSize: '10px', marginTop: '2px' }}>{proj.description}</p>
                    <p style={{ fontSize: '10px', whiteSpace: 'pre-line', marginTop: '3px' }}>{proj.achievements}</p>
                    {proj.technologies && (
                      <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>
                        <span style={{ color: '#0369a1', fontWeight: 600 }}>Technologies:</span> {proj.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* Education */}
            <div className="sec-title">EDUCATION</div>
            {data.education?.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                <div style={{ color: '#475569', fontSize: '10px' }}>{edu.school} ({edu.startYear} – {edu.endYear})</div>
                {edu.grade && <div style={{ fontSize: '9px', color: '#64748b' }}>Grade: {edu.grade}</div>}
                {edu.subjects && <div style={{ fontSize: '9px', color: '#64748b' }}>Subjects: {edu.subjects}</div>}
                {edu.coursework && <p style={{ fontSize: '9px', marginTop: '2px', whiteSpace: 'pre-line' }}>{edu.coursework}</p>}
              </div>
            ))}

            {/* Skills */}
            <div className="sec-title">TECHNICAL SKILLS</div>
            <div style={{ fontSize: '10px' }}>
              <div style={{ marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>Programming Languages: </span>
                {data.languages || data.technicalSkills?.map(s => s.name).join(', ')}
              </div>
              {data.tools && (
                <div style={{ marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>Tools & Platforms: </span>
                  {data.tools}
                </div>
              )}
              {data.softSkills && data.softSkills.length > 0 && data.softSkills[0].name && (
                <div>
                  <span style={{ fontWeight: 600 }}>Soft Skills: </span>
                  {data.softSkills?.map(s => s.name).join(', ')}
                </div>
              )}
            </div>

            {/* Achievements */}
            {data.achievements && (
              <>
                <div className="sec-title">ACHIEVEMENTS</div>
                <p style={{ fontSize: '10px', whiteSpace: 'pre-line' }}>{data.achievements}</p>
              </>
            )}

            {/* Availability */}
            {data.availability && (
              <div style={{ marginTop: '10px', fontSize: '10px' }}>
                <span style={{ fontWeight: 600, color: '#0369a1' }}>Availability: </span>
                {data.availability}
              </div>
            )}

            {/* References */}
            <div className="sec-title">REFERENCES</div>
            {data.references && data.references[0].name ? (
              data.references.filter(r => r.name).map((ref) => (
                <div key={ref.id} style={{ fontSize: '10px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{ref.name}</span> — {ref.role}
                  {ref.company && `, ${ref.company}`} | {ref.contact}
                </div>
              ))
            ) : (
              <div style={{ fontSize: '10px' }}>Available upon request.</div>
            )}
          </div>
        );

      case 'modern':
        return (
          <div style={{ fontFamily: 'Inter, sans-serif', color: '#334155' }}>
            {/* Header with gradient */}
            <div style={{ background: 'linear-gradient(135deg, #0ea5e9, #0369a1)', color: '#fff', padding: '24px 32px' }}>
              <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '1px' }}>
                {(data.fullname || 'Your Name').toUpperCase()}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9, marginTop: '4px' }}>{data.jobtitle}</div>
              <div style={{ fontSize: '11px', opacity: 0.85, marginTop: '6px' }}>
                {data.location} | {data.phone} | {data.email}
              </div>
              {links && <pre style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px', whiteSpace: 'pre-wrap' }}>{links}</pre>}
            </div>

            <div style={{ padding: '0 32px 32px' }}>
              <SectionModern>SUMMARY</SectionModern>
              <p style={{ fontSize: '11px', lineHeight: 1.6, marginBottom: '8px' }}>{data.summary}</p>

              <SectionModern>EXPERIENCE</SectionModern>
              {data.experiences?.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>
                    {exp.jobtitle} — {exp.company}
                    {exp.isInternship && <span style={{ background: '#0ea5e9', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontSize: '8px', marginLeft: '8px' }}>INTERNSHIP</span>}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '10px' }}>{exp.startdate} – {exp.enddate}</div>
                  <p style={{ fontSize: '11px', marginTop: '3px', whiteSpace: 'pre-line' }}>{exp.duties}</p>
                  {exp.technologies && <TechBadge>{exp.technologies}</TechBadge>}
                </div>
              ))}

              {data.projects && data.projects[0].name && (
                <>
                  <SectionModern>PROJECTS</SectionModern>
                  {data.projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '8px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{proj.name}</div>
                      {proj.link && <div style={{ fontSize: '9px', color: '#0ea5e9' }}>{proj.link}</div>}
                      <p style={{ fontSize: '11px' }}>{proj.description}</p>
                      <p style={{ fontSize: '10px', whiteSpace: 'pre-line' }}>{proj.achievements}</p>
                      {proj.technologies && <TechBadge>{proj.technologies}</TechBadge>}
                    </div>
                  ))}
                </>
              )}

              <SectionModern>EDUCATION</SectionModern>
              {data.education?.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                  <div style={{ color: '#475569', fontSize: '11px' }}>
                    {edu.school} ({edu.startYear} – {edu.endYear})
                    {edu.grade && ` | Grade: ${edu.grade}`}
                  </div>
                  {edu.subjects && <div style={{ fontSize: '10px', color: '#64748b' }}>Subjects: {edu.subjects}</div>}
                  {edu.coursework && <p style={{ fontSize: '10px', whiteSpace: 'pre-line' }}>{edu.coursework}</p>}
                </div>
              ))}

              <SectionModern>SKILLS</SectionModern>
              <div style={{ fontSize: '11px' }}>
                {data.technicalSkills?.filter(s => s.name).map(s => s.name).join(' • ') || data.languages}
                {data.softSkills && data.softSkills[0].name && (
                  <><br /><span style={{ color: '#64748b' }}>Soft Skills: </span>{data.softSkills.map(s => s.name).join(', ')}</>
                )}
              </div>

              {data.achievements && (
                <>
                  <SectionModern>ACHIEVEMENTS</SectionModern>
                  <p style={{ fontSize: '11px', whiteSpace: 'pre-line' }}>{data.achievements}</p>
                </>
              )}

              <SectionModern>REFERENCES</SectionModern>
              {data.references && data.references[0].name ? (
                data.references.filter(r => r.name).map((ref) => (
                  <div key={ref.id} style={{ fontSize: '11px' }}>
                    <span style={{ fontWeight: 600 }}>{ref.name}</span> — {ref.role}
                    {ref.company && `, ${ref.company}`} | {ref.contact}
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '11px' }}>Available upon request.</div>
              )}
            </div>
          </div>
        );

      case 'executive':
        return (
          <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', gap: '20px', padding: '28px', color: '#334155' }}>
            {/* Left Column */}
            <div style={{ width: '35%', borderRight: '3px solid #0ea5e9', paddingRight: '16px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>{data.fullname}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>{data.jobtitle}</div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px' }}>
                <div>{data.email}</div>
                <div>{data.phone}</div>
                <div>{data.location}</div>
              </div>
              {links && <pre style={{ fontSize: '9px', color: '#94a3b8', marginTop: '8px', whiteSpace: 'pre-wrap' }}>{links}</pre>}

              <SectionExec>TECHNICAL SKILLS</SectionExec>
              <div style={{ fontSize: '10px', lineHeight: 1.5 }}>
                {(data.technicalSkills?.filter(s => s.name) || []).map(s => (
                  <div key={s.id}>• {s.name}</div>
                ))}
              </div>

              <SectionExec>TOOLS & PLATFORMS</SectionExec>
              <div style={{ fontSize: '10px' }}>{data.tools}</div>

              {data.softSkills && data.softSkills[0].name && (
                <>
                  <SectionExec>SOFT SKILLS</SectionExec>
                  <div style={{ fontSize: '10px', lineHeight: 1.5 }}>
                    {data.softSkills.filter(s => s.name).map(s => (
                      <div key={s.id}>• {s.name}</div>
                    ))}
                  </div>
                </>
              )}

              {data.availability && (
                <>
                  <SectionExec>AVAILABILITY</SectionExec>
                  <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>{data.availability}</div>
                </>
              )}
            </div>

            {/* Right Column */}
            <div style={{ width: '65%' }}>
              <SectionExec>PROFILE</SectionExec>
              <p style={{ fontSize: '11px', lineHeight: 1.6, marginBottom: '8px' }}>{data.summary}</p>

              <SectionExec>EXPERIENCE</SectionExec>
              {data.experiences?.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>
                    {exp.jobtitle}
                    {exp.isInternship && <span style={{ color: '#0ea5e9', marginLeft: '6px', fontSize: '9px' }}>(Internship)</span>}
                  </div>
                  <div style={{ color: '#475569', fontSize: '11px' }}>{exp.company} | {exp.startdate}–{exp.enddate}</div>
                  <p style={{ fontSize: '11px', marginTop: '3px', whiteSpace: 'pre-line' }}>{exp.duties}</p>
                  {exp.technologies && <TechBadge>{exp.technologies}</TechBadge>}
                </div>
              ))}

              {data.projects && data.projects[0].name && (
                <>
                  <SectionExec>PROJECTS</SectionExec>
                  {data.projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '8px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{proj.name}</div>
                      <p style={{ fontSize: '11px' }}>{proj.description}</p>
                      <p style={{ fontSize: '10px', whiteSpace: 'pre-line' }}>{proj.achievements}</p>
                    </div>
                  ))}
                </>
              )}

              <SectionExec>EDUCATION</SectionExec>
              {data.education?.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                  <div style={{ color: '#475569', fontSize: '11px' }}>{edu.school} ({edu.startYear}–{edu.endYear})</div>
                  {edu.subjects && <div style={{ fontSize: '10px', color: '#64748b' }}>Subjects: {edu.subjects}</div>}
                  {edu.coursework && <p style={{ fontSize: '10px', whiteSpace: 'pre-line' }}>{edu.coursework}</p>}
                </div>
              ))}

              {data.achievements && (
                <>
                  <SectionExec>ACHIEVEMENTS</SectionExec>
                  <p style={{ fontSize: '11px', whiteSpace: 'pre-line' }}>{data.achievements}</p>
                </>
              )}

              <SectionExec>REFERENCES</SectionExec>
              <div style={{ fontSize: '11px' }}>
                {data.references && data.references[0].name
                  ? data.references.filter(r => r.name).map((ref) => (
                      <div key={ref.id}>
                        <span style={{ fontWeight: 600 }}>{ref.name}</span> — {ref.role}
                        {ref.company && `, ${ref.company}`} | {ref.contact}
                      </div>
                    ))
                  : 'Available upon request.'}
              </div>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', color: '#334155' }}>
            {/* Left sidebar */}
            <div style={{ width: '30%', background: 'linear-gradient(180deg, #10b981, #059669)', color: '#fff', padding: '24px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700 }}>{data.fullname}</div>
              <div style={{ fontSize: '10px', opacity: 0.9, marginTop: '8px' }}>{data.jobtitle}</div>
              <div style={{ fontSize: '10px', opacity: 0.85, marginTop: '12px' }}>
                <div>{data.email}</div>
                <div>{data.phone}</div>
                <div>{data.location}</div>
              </div>
              {links && <pre style={{ fontSize: '9px', opacity: 0.8, marginTop: '8px', whiteSpace: 'pre-wrap' }}>{links}</pre>}

              <SectionCreative>SKILLS</SectionCreative>
              <div style={{ fontSize: '10px', opacity: 0.95, lineHeight: 1.6 }}>
                {(data.technicalSkills?.filter(s => s.name) || []).map(s => (
                  <div key={s.id}>• {s.name}</div>
                ))}
              </div>

              {data.tools && (
                <>
                  <SectionCreative>TOOLS</SectionCreative>
                  <div style={{ fontSize: '10px', opacity: 0.9 }}>{data.tools}</div>
                </>
              )}

              {data.availability && (
                <>
                  <SectionCreative>AVAILABILITY</SectionCreative>
                  <div style={{ fontSize: '10px', fontWeight: 600 }}>{data.availability}</div>
                </>
              )}
            </div>

            {/* Main content */}
            <div style={{ width: '70%', padding: '24px' }}>
              <SectionCreative>ABOUT</SectionCreative>
              <p style={{ fontSize: '11px', lineHeight: 1.6, marginBottom: '12px' }}>{data.summary}</p>

              <SectionCreative>EXPERIENCE</SectionCreative>
              {data.experiences?.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>
                    {exp.jobtitle} — {exp.company}
                    {exp.isInternship && <span style={{ background: '#10b981', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontSize: '8px', marginLeft: '6px' }}>INTERNSHIP</span>}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '10px' }}>{exp.startdate} – {exp.enddate}</div>
                  <p style={{ fontSize: '11px', marginTop: '3px', whiteSpace: 'pre-line' }}>{exp.duties}</p>
                </div>
              ))}

              {data.projects && data.projects[0].name && (
                <>
                  <SectionCreative>PROJECTS</SectionCreative>
                  {data.projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: '8px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{proj.name}</div>
                      {proj.link && <div style={{ fontSize: '9px', color: '#10b981' }}>{proj.link}</div>}
                      <p style={{ fontSize: '11px' }}>{proj.description}</p>
                      <p style={{ fontSize: '10px', whiteSpace: 'pre-line' }}>{proj.achievements}</p>
                    </div>
                  ))}
                </>
              )}

              <SectionCreative>EDUCATION</SectionCreative>
              {data.education?.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                  <div style={{ color: '#475569', fontSize: '11px' }}>{edu.school} ({edu.startYear}–{edu.endYear})</div>
                  {edu.subjects && <div style={{ fontSize: '10px', color: '#64748b' }}>Subjects: {edu.subjects}</div>}
                </div>
              ))}

              {data.achievements && (
                <>
                  <SectionCreative>ACHIEVEMENTS</SectionCreative>
                  <p style={{ fontSize: '11px', whiteSpace: 'pre-line' }}>{data.achievements}</p>
                </>
              )}

              <SectionCreative>REFERENCES</SectionCreative>
              <div style={{ fontSize: '11px' }}>
                {data.references && data.references[0].name
                  ? data.references.filter(r => r.name).map((ref) => (
                      <div key={ref.id}>
                        <span style={{ fontWeight: 600 }}>{ref.name}</span> — {ref.role}
                        {ref.company && `, ${ref.company}`} | {ref.contact}
                      </div>
                    ))
                  : 'Available upon request.'}
              </div>
            </div>
          </div>
        );

      case 'tech':
        return (
          <div style={{ fontFamily: 'JetBrains Mono, monospace', padding: '28px', color: '#0f172a', background: '#f8fafc' }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#0ea5e9' }}>$ whoami</div>
            <div style={{ color: '#10b981', fontSize: '14px', marginTop: '4px' }}>
              {(data.fullname || 'yourname').toLowerCase()} // {data.jobtitle?.split('|')[0].trim() || 'developer'}
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
              {data.email} | {data.phone} | {data.location}
            </div>
            {links && <pre style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{links}</pre>}

            <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '14px' }}>$ cat summary.md</div>
            <p style={{ fontSize: '11px', lineHeight: 1.6, marginBottom: '8px' }}>{data.summary}</p>

            <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '14px' }}>$ cat experience.log</div>
            {data.experiences?.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '8px' }}>
                <div>→ <span style={{ fontWeight: 700 }}>{exp.jobtitle}</span> @ {exp.company} [{exp.startdate}–{exp.enddate}]</div>
                {exp.isInternship && <div style={{ color: '#f59e0b', marginLeft: '20px' }}>[INTERNSHIP]</div>}
                <p style={{ fontSize: '11px', marginLeft: '20px', whiteSpace: 'pre-line' }}>{exp.duties}</p>
                {exp.technologies && <div style={{ fontSize: '10px', color: '#64748b', marginLeft: '20px' }}># {exp.technologies}</div>}
              </div>
            ))}

            {data.projects && data.projects[0].name && (
              <>
                <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '14px' }}>$ ls projects/</div>
                {data.projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '6px' }}>
                    <div style={{ color: '#10b981' }}>→ {proj.name.toLowerCase().replace(/\s+/g, '-')}/</div>
                    {proj.link && <div style={{ fontSize: '10px', color: '#64748b', marginLeft: '20px' }}>{proj.link}</div>}
                    <p style={{ fontSize: '11px', marginLeft: '20px' }}>{proj.description}</p>
                  </div>
                ))}
              </>
            )}

            <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '14px' }}>$ cat education.txt</div>
            {data.education?.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '4px' }}>
                <div>{edu.degree} — {edu.school} ({edu.startYear}–{edu.endYear})</div>
                {edu.subjects && <div style={{ fontSize: '10px', color: '#64748b' }}>subjects: [{edu.subjects}]</div>}
              </div>
            ))}

            <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '14px' }}>$ ls skills/</div>
            <div style={{ color: '#10b981', fontSize: '11px' }}>
              {(data.technicalSkills?.filter(s => s.name) || []).map(s => s.name.toLowerCase()).join('/ ')}/
            </div>

            {data.achievements && (
              <>
                <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '14px' }}>$ cat achievements.txt</div>
                <p style={{ fontSize: '11px', whiteSpace: 'pre-line' }}>{data.achievements}</p>
              </>
            )}

            <div style={{ color: '#0ea5e9', fontWeight: 700, marginTop: '14px' }}>$ cat refs.txt</div>
            <div style={{ fontSize: '11px' }}>
              {data.references && data.references[0].name
                ? data.references.filter(r => r.name).map((ref) => (
                    <div key={ref.id}>{ref.name} — {ref.role} | {ref.contact}</div>
                  ))
                : '# Available upon request'}
            </div>
          </div>
        );

      case 'elegant':
        return (
          <div style={{ fontFamily: 'Playfair Display, Georgia, serif', padding: '32px', color: '#334155' }}>
            <style>{`.sec-elegant{font-weight:700;text-transform:uppercase;letter-spacing:2px;font-size:10px;margin-top:12px;margin-bottom:4px;color:#b45309'}`}</style>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '3px', color: '#0f172a' }}>
                {(data.fullname || 'Your Name').toUpperCase()}
              </div>
              <div style={{ fontStyle: 'italic', color: '#64748b', fontSize: '12px', marginTop: '6px' }}>{data.jobtitle}</div>
              <div style={{ width: '50px', height: '2px', background: 'linear-gradient(90deg, #10b981, #0ea5e9)', margin: '10px auto' }} />
              <div style={{ fontSize: '11px', color: '#64748b' }}>{data.email} • {data.phone} • {data.location}</div>
              {links && <pre style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{links}</pre>}
            </div>

            <div className="sec-elegant">Profile</div>
            <div style={{ borderLeft: '2px solid #10b981', paddingLeft: '14px', fontSize: '11px', lineHeight: 1.6 }}>
              {data.summary}
            </div>

            <div className="sec-elegant">Experience</div>
            {data.experiences?.map((exp) => (
              <div key={exp.id} style={{ borderLeft: '2px solid #10b981', paddingLeft: '14px', marginBottom: '10px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>
                  {exp.jobtitle} — {exp.company}
                  {exp.isInternship && <em style={{ color: '#64748b', marginLeft: '6px', fontSize: '10px' }}>(Internship)</em>}
                </div>
                <div style={{ color: '#64748b', fontSize: '10px' }}>{exp.startdate} – {exp.enddate}</div>
                <p style={{ fontSize: '11px', marginTop: '3px', whiteSpace: 'pre-line' }}>{exp.duties}</p>
              </div>
            ))}

            {data.projects && data.projects[0].name && (
              <>
                <div className="sec-elegant">Projects</div>
                {data.projects.map((proj) => (
                  <div key={proj.id} style={{ borderLeft: '2px solid #10b981', paddingLeft: '14px', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{proj.name}</div>
                    <p style={{ fontSize: '11px' }}>{proj.description}</p>
                  </div>
                ))}
              </>
            )}

            <div className="sec-elegant">Education</div>
            {data.education?.map((edu) => (
              <div key={edu.id} style={{ borderLeft: '2px solid #10b981', paddingLeft: '14px', marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{edu.degree}</div>
                <div style={{ color: '#475569', fontSize: '11px' }}>{edu.school} ({edu.startYear}–{edu.endYear})</div>
                {edu.subjects && <div style={{ fontSize: '10px', color: '#64748b' }}>Subjects: {edu.subjects}</div>}
                {edu.coursework && <p style={{ fontSize: '10px', whiteSpace: 'pre-line' }}>{edu.coursework}</p>}
              </div>
            ))}

            <div className="sec-elegant">Skills</div>
            <div style={{ fontSize: '11px' }}>
              {(data.technicalSkills?.filter(s => s.name) || []).map(s => s.name).join(' • ') || data.languages}
              {data.softSkills && data.softSkills[0].name && (
                <><br /><span style={{ color: '#64748b' }}>Soft Skills: </span>{data.softSkills.map(s => s.name).join(', ')}</>
              )}
            </div>

            {data.achievements && (
              <>
                <div className="sec-elegant">Achievements</div>
                <p style={{ fontSize: '11px', whiteSpace: 'pre-line' }}>{data.achievements}</p>
              </>
            )}

            <div className="sec-elegant">References</div>
            <div style={{ fontSize: '11px' }}>
              {data.references && data.references[0].name
                ? data.references.filter(r => r.name).map((ref) => (
                    <div key={ref.id}>
                      <span style={{ fontWeight: 600 }}>{ref.name}</span> — {ref.role}
                      {ref.company && `, ${ref.company}`} | {ref.contact}
                    </div>
                  ))
                : 'Available upon request.'}
            </div>
          </div>
        );

      case 'minimal':
      case 'compact':
      default:
        return (
          <div style={{ fontFamily: 'Inter, sans-serif', padding: '28px', color: '#334155' }}>
            <div style={{ marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a' }}>{data.fullname}</div>
              <div style={{ fontSize: '12px', color: '#0ea5e9', marginTop: '4px' }}>{data.jobtitle}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                {data.email} | {data.phone} | {data.location}
              </div>
              {links && <pre style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{links}</pre>}
            </div>

            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '12px', marginTop: '14px' }}>Summary</div>
            <p style={{ fontSize: '11px', lineHeight: 1.6 }}>{data.summary}</p>

            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '12px', marginTop: '14px' }}>Experience</div>
            {data.experiences?.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 700 }}>{exp.jobtitle} at {exp.company}</div>
                <div style={{ color: '#64748b', fontSize: '10px' }}>{exp.startdate} – {exp.enddate}</div>
                <p style={{ fontSize: '11px', marginTop: '3px', whiteSpace: 'pre-line' }}>{exp.duties}</p>
              </div>
            ))}

            {data.projects && data.projects[0].name && (
              <>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '12px', marginTop: '14px' }}>Projects</div>
                {data.projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700 }}>{proj.name}</div>
                    <p style={{ fontSize: '11px' }}>{proj.description}</p>
                  </div>
                ))}
              </>
            )}

            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '12px', marginTop: '14px' }}>Education</div>
            {data.education?.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '6px' }}>
                <div style={{ fontWeight: 700 }}>{edu.degree} — {edu.school}</div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>{edu.startYear}–{edu.endYear}</div>
                {edu.subjects && <div style={{ fontSize: '10px', color: '#64748b' }}>Subjects: {edu.subjects}</div>}
              </div>
            ))}

            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '12px', marginTop: '14px' }}>Skills</div>
            <div style={{ fontSize: '11px' }}>
              {(data.technicalSkills?.filter(s => s.name) || []).map(s => s.name).join(', ') || data.languages}
            </div>

            {data.achievements && (
              <>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '12px', marginTop: '14px' }}>Achievements</div>
                <p style={{ fontSize: '11px', whiteSpace: 'pre-line' }}>{data.achievements}</p>
              </>
            )}

            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '12px', marginTop: '14px' }}>References</div>
            <div style={{ fontSize: '11px' }}>
              {data.references && data.references[0].name
                ? data.references.filter(r => r.name).map((ref) => (
                    <div key={ref.id}>
                      <span style={{ fontWeight: 600 }}>{ref.name}</span> — {ref.role}
                      {ref.company && `, ${ref.company}`} | {ref.contact}
                    </div>
                  ))
                : 'Available upon request.'}
            </div>
          </div>
        );
    }
  };

  return (
    <section id="cv-preview-section" className="max-w-5xl mx-auto px-6 py-16 animate-fade-in relative">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 relative z-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold glow-text">Your CV is Ready!</h2>
          <p className="text-text-secondary text-sm mt-1">Review and download your professional CV</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button onClick={handleDownloadPDF} className="btn-cta flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(56, 189, 248, 0.15)' }}>
        <div className="absolute inset-0 rounded-2xl p-[2px]" style={{ background: 'linear-gradient(135deg, #38bdf8, #10b981, #f59e0b)' }}>
          <div className="absolute inset-[2px] rounded-xl bg-bg/50 backdrop-blur-sm" />
        </div>

        <div className="relative bg-white/95 rounded-xl overflow-hidden">
          <div
            ref={cvRef}
            className="cv-page"
            style={{ fontFamily: 'Inter, sans-serif', width: '210mm', minHeight: '297mm' }}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm">
          <FileText className="w-4 h-4" />
          <span>High-quality PDF ready for download</span>
        </div>
      </div>
    </section>
  );
}

// Helper components
function SectionModern({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, textTransform: 'uppercase', color: '#0ea5e9', fontSize: '11px', marginTop: '12px', marginBottom: '4px', letterSpacing: '0.05em' }}>
      {children}
    </div>
  );
}

function SectionExec({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px', marginTop: '10px', marginBottom: '3px', color: '#0369a1', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px' }}>
      {children}
    </div>
  );
}

function SectionCreative({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '11px', color: '#10b981', marginTop: '10px', marginBottom: '4px' }}>
      {children}
    </div>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '9px', color: '#64748b', marginTop: '3px' }}>
      <span style={{ color: '#0ea5e9', fontWeight: 600 }}>Technologies: </span>
      {children}
    </div>
  );
}
