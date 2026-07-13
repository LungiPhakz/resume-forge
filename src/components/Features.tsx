import {  Layout, Download, FileSearch, Globe, Sparkles, Clock, Target } from 'lucide-react';

const features = [
  {
    icon: FileSearch,
    title: 'ATS Optimized',
    desc: '100% compatible with Applicant Tracking Systems. Get past automated filters.',
    color: 'primary',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Layout,
    title: '8 Professional Layouts',
    desc: 'From executive to creative — find the design that matches your industry.',
    color: 'accent',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Download,
    title: 'Instant PDF Export',
    desc: 'Download a print-ready PDF instantly with perfect formatting.',
    color: 'secondary',
    gradient: 'from-yellow-500 to-orange-400',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    desc: 'Templates designed for international job markets and standards.',
    color: 'primary',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Sparkles,
    title: 'Modern Design',
    desc: 'Clean, contemporary layouts that catch recruiter attention.',
    color: 'accent',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Clock,
    title: '5-Minute Builder',
    desc: 'Complete your CV in under 5 minutes with our intuitive interface.',
    color: 'secondary',
    gradient: 'from-yellow-500 to-orange-400',
  },
];

export default function Features() {
  return (
    <section id="features-section" className="w-full py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border border-primary/30 bg-primary/5 text-primary backdrop-blur-sm">
            <Target className="w-3 h-3" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black">
            <span className="glow-text">Everything You Need</span>
          </h2>
          <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto">
            Professional tools designed to help you create stunning resumes that get you hired
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`glass-card p-8 relative group animate-fade-in overflow-hidden`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient accent on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`} />

                {/* Icon container */}
                <div className={`feature-icon mb-6 bg-gradient-to-br ${feature.gradient} text-white`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.desc}
                </p>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-500`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
