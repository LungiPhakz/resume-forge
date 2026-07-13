import { Sparkles, ArrowRight, FileText, Users, Award, Zap, Download } from 'lucide-react';

interface HeroProps {
  onStartBuilding: () => void;
}

export default function Hero({ onStartBuilding }: HeroProps) {
  return (
    <section id="hero"
  className="min-h-[85vh] flex items-center relative overflow-hidden pt-32 pb-10"
  >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-[10%] left-[5%] w-80 h-80 rounded-full bg-primary/20 blur-[100px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[15%] right-[10%] w-96 h-96 rounded-full bg-accent/15 blur-[120px] animate-pulse-glow pointer-events-none animation-delay-400" />
      <div className="absolute top-[35%] right-[25%] w-64 h-64 rounded-full bg-secondary/10 blur-[80px] animate-pulse-glow pointer-events-none animation-delay-200" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column - Text Content */}
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="hero-badge mb-8 animate-slide-down">
            <Sparkles className="w-4 h-4" />
            <span>Professional CV & Resume Builder</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-text-primary">Create Your</span>
            <br />
            <span className="glow-text">Perfect CV</span>
            <br />
            <span className="text-text-primary">In Minutes</span>
          </h1>

          {/* Subtitle */}
          <div className="mt-6">
          <p className="mt-8 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl">
            Build professional, ATS-optimized CVs that get you hired.
            Perfect for graduates, interns, and experienced professionals.
          </p>
</div>
         

          {/* CTA Buttons */}
         <div className="mt-10 flex flex-wrap gap-5">
            <button onClick={onStartBuilding} className="btn-cta flex items-center gap-3 group">
              <FileText className="w-5 h-5" />
              <span>Build My CV Now</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#features-section"
              className="btn-secondary"
            >
              See Features
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <FileText className="w-5 h-5 text-primary" />
              <div>
                <div className="text-lg font-bold text-primary">8+</div>
                <div className="text-xs text-text-muted">Templates</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <div className="text-lg font-bold text-accent">All Levels</div>
                <div className="text-xs text-text-muted">Graduate to Pro</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <Award className="w-5 h-5 text-secondary" />
              <div>
                <div className="text-lg font-bold text-secondary">100%</div>
                <div className="text-xs text-text-muted">ATS Ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - CV Preview Card */}
        <div className="flex justify-center animate-slide-up animation-delay-200 ">
          <div className="relative w-full max-w-[280px] md:max-w-[320px] mt-8 lg:mt-0">
  
  {/* Back Slide 2 */}
  <div
    className="absolute top-4 left-4 w-full h-full rounded-2xl bg-white shadow-xl opacity-40"
    style={{
      transform: 'rotate(-6deg)',
      zIndex: 1,
    }}
  />

  {/* Back Slide 1 */}
  <div
    className="absolute top-2 left-2 w-full h-full rounded-2xl bg-white shadow-xl opacity-70"
    style={{
      transform: 'rotate(-3deg)',
      zIndex: 2,
    }}
  />
            {/* Glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 blur-3xl scale-110 opacity-60" />

            {/* Main CV Preview */}
             <div
  className="relative glass-card overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500"
  style={{
    aspectRatio: '210/297',
    zIndex: 3,
  }}
>
              {/* CV Header */}
               <div className="bg-gradient-to-r from-primary to-accent p-4 text-center">
        <h3 className="text-lg font-bold text-bg mb-1">
          LUNGILE PHAKATHI
        </h3>
        <p className="text-xs text-bg/80 leading-tight">
          Junior Software Developer | Full-Stack Developer | Data Analyst
        </p>
      </div>

              {/* CV Content */}
               <div className="p-4 text-[10px] text-slate-700 space-y-3">

        <div className="border-b pb-2 text-center text-slate-500">
          Johannesburg • lungiphakz@gmail.com
        </div>

        <div>
          <h4 className="font-bold text-primary mb-1">
            PROFILE
          </h4>
          <p>
            Computer Science graduate with experience in software
            development, databases and data analytics.
          </p>
        </div>

                {/* Experience */}
               <div>
          <h4 className="font-bold text-primary mb-1">
            EXPERIENCE
          </h4>
          <p className="font-medium">
            Data Science Intern
          </p>
          <p className="text-slate-500">
            Moepi Publishing
          </p>
        </div>

                {/* Education */}
                <div>
          <h4 className="font-bold text-primary mb-1">
            EDUCATION
          </h4>
          <p>Diploma in Computer Science</p>
        </div>

                {/* Skills */}
                 <div>
          <h4 className="font-bold text-primary mb-1">
            SKILLS
          </h4>

          <div className="flex flex-wrap gap-1">
            {['React', 'Laravel', 'PHP', 'MySQL'].map((skill) => (
              <span
                key={skill}
                className="px-1.5 py-0.5 bg-primary/10 text-primary rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
              </div>

              {/* Terminal overlay */}
              <div className="absolute bottom-4 right-4 bg-bg/90 backdrop-blur-sm rounded-lg p-3 font-mono text-[10px] border border-primary/30 shadow-lg">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="text-primary">$ create cv --template modern</div>
                <div className="text-accent flex items-center gap-1 mt-1">
                  <Zap className="w-3 h-3" />
                  <span>Generating...</span>
                </div>
                <div className="text-secondary mt-1 flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>Ready to download!</span>
                </div>
              </div>
            </div>

           {/* Floating badge */}
<div
  className="absolute top-3 -right-8 bg-gradient-to-r from-secondary to-accent text-bg px-5 py-2 rounded-full font-bold text-xs shadow-2xl"
  style={{
    zIndex: 999,
    transform: 'rotate(13deg)',
  }}
>
  ✓ ATS Optimized
</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
