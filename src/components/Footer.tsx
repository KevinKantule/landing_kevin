import React from 'react';
import { ExternalLink, Github, Linkedin } from 'lucide-react';
import { Translation } from '../types';

interface FooterProps {
  t: Translation;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="py-12 md:py-20 px-4 md:px-8 border-t border-surface-container-highest/30">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <span className="text-xl font-black text-white tracking-tighter uppercase block mb-2">Kevin Kantule</span>
          <p className="text-slate-500 text-sm">© 2026 — {t.heroSubtitle}</p>
        </div>
        
        <div className="flex gap-12">
          <a href="https://www.linkedin.com/in/kevinkantule/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors font-bold flex items-center gap-2">
            LinkedIn <ExternalLink className="w-4 h-4" />
          </a>
          <a href="https://github.com/KevinKantule" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors font-bold flex items-center gap-2">
            GitHub <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
