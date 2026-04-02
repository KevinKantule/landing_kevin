import { Leaf } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  ecoMode: boolean;
  setEcoMode: (value: boolean) => void;
}

export const Navbar = ({ ecoMode, setEcoMode }: NavbarProps) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-t-0 border-x-0">
      <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
        <span className="text-2xl font-black text-primary tracking-tighter uppercase">Kevin Kantule</span>

        <div className="hidden md:flex items-center gap-10">
          <a href="#about" className="text-slate-400 hover:text-primary font-bold transition-colors">Sobre Mí</a>
          <a href="#services" className="text-slate-400 hover:text-primary font-bold transition-colors">Servicios</a>
          <a href="#work" className="text-slate-400 hover:text-primary font-bold transition-colors">Proyectos</a>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setEcoMode(!ecoMode)}
            aria-label={ecoMode ? 'Desactivar modo eco' : 'Activar modo eco'}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full ghost-border transition-all group",
              ecoMode ? "bg-green-500/20 border-green-500" : "bg-surface-container-highest/50 hover:border-primary"
            )}
          >
            <Leaf className={cn("w-4 h-4 transition-colors", ecoMode ? "text-green-400" : "text-slate-400")} />
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-white">
              {ecoMode ? "Eco: ON" : "Eco: OFF"}
            </span>
          </button>

          <a
            href="#contact"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Hablemos
          </a>
        </div>
      </div>
    </nav>
  );
};
