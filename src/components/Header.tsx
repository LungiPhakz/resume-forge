import { FileText, Menu, X, Home, HelpCircle, FileDown } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
   onStartBuilding: () => void;
  onToggleMobileMenu: () => void;
  mobileMenuOpen: boolean;
  isHomePage: boolean;
}

export default function Header({ onHomeClick, onStartBuilding, onToggleMobileMenu, mobileMenuOpen , isHomePage,}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300"
            style={{
              background: 'rgba(10, 15, 28, 0.85)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
            }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={onHomeClick}
          className="flex items-center gap-3 font-bold text-xl tracking-wide group transition-transform duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-accent blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary">
              <FileText className="w-5 h-5 text-bg" />
            </div>
          </div>
          <span>
            Resume<span className="gradient-text">Forge</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">

            {isHomePage ? (
    <>
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors group"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <a
            href="#features-section"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors group"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Features</span>
          </a>
          <button
  onClick={() => {
    onStartBuilding();
    onToggleMobileMenu();
  }}
  className="flex items-center gap-3 text-text-secondary hover:text-secondary transition-colors py-3 rounded-lg hover:bg-surface px-4 text-left"
>
  <FileDown className="w-5 h-5" />
  <span className="font-medium">Build CV</span>
</button>

 </>
  ) : (

     <button
      onClick={onHomeClick}
      className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
    >
      <Home className="w-4 h-4" />
      <span>Back to Home</span>
    </button>
  )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden glass border-t border-border animate-slide-down">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
  {isHomePage ? (
    <>
      <button
        onClick={() => {
          onHomeClick();
          onToggleMobileMenu();
        }}
        className="flex items-center gap-3 text-text-secondary hover:text-primary py-3 rounded-lg hover:bg-surface px-4"
      >
        <Home className="w-5 h-5" />
        Home
      </button>

      <a
        href="#features-section"
        onClick={onToggleMobileMenu}
        className="flex items-center gap-3 text-text-secondary hover:text-accent py-3 rounded-lg hover:bg-surface px-4"
      >
        <HelpCircle className="w-5 h-5" />
        Features
      </a>

      <button
        onClick={() => {
          onStartBuilding();
          onToggleMobileMenu();
        }}
        className="flex items-center gap-3 text-text-secondary hover:text-secondary py-3 rounded-lg hover:bg-surface px-4"
      >
        <FileDown className="w-5 h-5" />
        Build CV
      </button>
    </>
  ) : (
    <button
      onClick={() => {
        onHomeClick();
        onToggleMobileMenu();
      }}
      className="flex items-center gap-3 text-text-secondary hover:text-primary py-3 rounded-lg hover:bg-surface px-4"
    >
      <Home className="w-5 h-5" />
      Back to Home
    </button>
  )}
</div>
        </nav>
      )}
    </header>
  );
}
