export const Footer = () => {
  return (
    <footer className="w-full py-20 px-8 bg-surface-container-lowest border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl mx-auto gap-8">
        <div>
          <p className="text-lg leading-relaxed text-slate-400">
            Kevin Kantule — 2026. Transformando ideas en sistemas inteligentes.
          </p>
        </div>

        <div className="flex gap-12">
          <a
            href="https://www.linkedin.com/in/kevinkantule/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-primary transition-colors font-bold flex items-center gap-2"
            aria-label="Visitar LinkedIn de Kevin"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/KevinKantule"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-primary transition-colors font-bold flex items-center gap-2"
            aria-label="Visitar GitHub de Kevin"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
