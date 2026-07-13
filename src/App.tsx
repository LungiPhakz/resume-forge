import { useState, useCallback } from 'react';
import {
  FileText,
  Heart,
  Mail,
  Rocket
} from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TemplateSelector from './components/templateSelector';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import type { CVData, TemplateType } from './types';

const TEMPLATES: { id: TemplateType; name: string; desc: string }[] = [
  { id: 'classic', name: 'Classic', desc: 'Traditional single-column layout' },
  { id: 'modern', name: 'Modern', desc: 'Bold gradient header design' },
  { id: 'minimal', name: 'Minimal', desc: 'Clean whitespace-focused' },
  { id: 'executive', name: 'Executive', desc: 'Two-column professional' },
  { id: 'creative', name: 'Creative', desc: 'Side accent bar layout' },
  { id: 'compact', name: 'Compact', desc: 'Dense information display' },
  { id: 'elegant', name: 'Elegant', desc: 'Serif typography design' },
  { id: 'tech', name: 'Tech', desc: 'Developer terminal style' },
];

function App() {
  const [view, setView] = useState<'welcome' | 'builder'>('welcome');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [cvData, setCvData] = useState<CVData>({});
  const [showPreview, setShowPreview] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStartBuilding = useCallback(() => {
    setView('builder');
    setShowPreview(false);
    setTimeout(() => {
      document.getElementById('templates-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const handleBackToHome = useCallback(() => {
    setView('welcome');
    setShowPreview(false);
  }, []);

  const handleGenerateCV = useCallback((data: CVData) => {
    setCvData(data);
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById('cv-preview-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen text-text-primary overflow-x-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full opacity-40 blur-[150px] bg-primary" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full opacity-30 blur-[150px] bg-accent" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full opacity-25 blur-[120px] bg-secondary" />
      </div>

      <Header

  onHomeClick={handleBackToHome}
  onStartBuilding={handleStartBuilding}
  onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
  mobileMenuOpen={mobileMenuOpen}
  isHomePage={view === 'welcome'}
/>

      {view === 'welcome' && (
        <>
          <Hero onStartBuilding={handleStartBuilding} />
          <Features />
        </>
      )}

      {view === 'builder' && (
        <main className="pt-20 pb-16">
          <section id="templates-section">
            <TemplateSelector
              templates={TEMPLATES}
              selected={selectedTemplate}
              onSelect={setSelectedTemplate}
            />
          </section>

          <CVForm
            onSubmit={handleGenerateCV}
            selectedTemplate={selectedTemplate}
          />

          {showPreview && (
            <CVPreview
              data={cvData}
              template={selectedTemplate}
            />
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary to-accent">
                  <FileText className="w-5 h-5 text-bg" />
                </div>
                <span>
                  Resume<span className="gradient-text">Forge</span>
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Create professional, ATS-optimized CVs for all career levels — from graduates
                to experienced professionals. Free, no sign-up required.
              </p>
              <div className="mt-4 flex items-center gap-2 text-accent text-sm">
                <Rocket className="w-4 h-4" />
                <span>Supports Matric, Graduate, Internship & Professional CVs</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#hero" className="text-text-secondary hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features-section" className="text-text-secondary hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <button onClick={handleStartBuilding} className="text-text-secondary hover:text-primary transition-colors">
                    Build My CV
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Connect</h4>
              <div className="flex gap-3">
                
                <a
                  href="mailto:lungiphakz@gmail.com"
                  className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center
                           text-text-secondary hover:text-primary hover:border-primary transition-all hover:shadow-glow-primary"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <p className="text-text-muted text-xs mt-4">
                Built by Lungile Phakathi
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-sm">
              Built with{' '}
              <Heart className="w-4 h-4 inline text-secondary animate-pulse" />
              {' '}for job seekers everywhere
            </p>
            <p className="text-text-muted text-xs">
              Free to use • No data collection • Privacy first
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
