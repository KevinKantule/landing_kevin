import { motion } from 'motion/react';
import { Linkedin, Github } from 'lucide-react';
import { useAdaptivePreferences } from '../../hooks/useAdaptivePreferences';

export const Contact = () => {
  const { prefersReducedMotion } = useAdaptivePreferences();

  const links = [
    { label: 'Email', action: 'Escríbeme', url: 'mailto:kevin.kantule@gmail.com', icon: null },
    { label: 'Profesional', action: 'LinkedIn', url: 'https://www.linkedin.com/in/kevinkantule/', icon: Linkedin },
    { label: 'El Laboratorio', action: 'GitHub', url: 'https://github.com/KevinKantule', icon: Github },
  ];

  return (
    <section id="contact" className="py-32 px-8 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        className="text-5xl font-black text-white mb-16 tracking-tighter"
      >
        Hablemos.
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-6">
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, borderColor: '#b7c4ff' }}
            className="group px-10 py-6 bg-surface-container-highest/30 ghost-border rounded-2xl transition-all text-left min-w-[220px]"
            aria-label={`Contactar a través de ${link.label}`}
          >
            <span className="block text-xs uppercase tracking-[0.2em] font-bold text-slate-500 mb-2">{link.label}</span>
            <span className="text-white text-xl font-bold group-hover:text-primary flex items-center gap-3">
              {link.action} {link.icon && <link.icon className="w-5 h-5" aria-hidden="true" />}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
