import React from 'react';
import { Leaf } from 'lucide-react';
import { cn } from '../lib/utils';
import { Translation, Language } from '../types';

interface NavbarProps {
  ecoMode: boolean;
  setEcoMode: (v: boolean) => void;
  language: Language;
  setLanguage: (v: Language) => void;
  t: Translation;
}

const Navbar: React.FC<NavbarProps> = ({ ecoMode, setEcoMode, language, setLanguage, t }) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-t-0 border-x-0">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-screen-2xl mx-auto">
        <span className="text-xl md:text-2xl font-black text-primary tracking-tighter uppercase">Kevin Kantule</span>
        
        <div className="hidden lg:flex items-center gap-10">
          <a href="#about" className="text-slate-400 hover:text-primary font-bold transition-colors">{t.about}</a>
          <a href="#services" className="text-slate-400 hover:text-primary font-bold transition-colors">{t.services}</a>
          <a href="#work" className="text-slate-400 hover:text-primary font-bold transition-colors">{t.projects}</a>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <button 
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-primary transition-colors px-2 py-1"
            aria-label="Change language"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          <button 
            onClick={() => setEcoMode(!ecoMode)}
            aria-label={ecoMode ? "Disable eco mode" : "Enable eco mode"}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full ghost-border transition-all group",
              ecoMode ? "bg-green-500/20 border-green-500" : "bg-surface-container-highest/50 hover:border-primary"
            )}
          >
            <Leaf className={cn("w-4 h-4 transition-colors", ecoMode ? "text-green-400" : "text-slate-400")} />
            <span className="hidden sm:inline text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-white">
              {ecoMode ? t.ecoOn : t.ecoOff}
            </span>
          </button>
          
          <a 
            href="#contact"
            className="bg-primary text-on-primary px-4 md:px-6 py-2 md:py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            {t.contact}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
