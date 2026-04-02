import { motion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useAdaptivePreferences } from '../../hooks/useAdaptivePreferences';

export const Hero = () => {
  const { prefersReducedMotion } = useAdaptivePreferences();

  return (
    <section className="min-h-screen flex flex-col justify-center max-w-screen-2xl mx-auto px-8 pt-32 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6 block">
          Software Developer | AI | Autonomous Agents
        </span>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.9] mb-12">
          Transformando ideas en <br />
          <span className="italic text-primary">sistemas inteligentes</span>.
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-16">
          Desarrollador de software radicado en <span className="text-white font-semibold">Panamá</span>.
          Evolucionando desde el ecosistema móvil hacia la próxima frontera tecnológica:
          el desarrollo de <span className="text-white">chatbots avanzados</span> y <span className="text-primary italic">agentes autónomos</span>.
        </p>

        <div className="flex flex-wrap gap-6">
          <motion.button
            whileHover={prefersReducedMotion ? {} : { y: -4 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            className="bg-primary text-on-primary px-10 py-5 rounded-xl font-black text-lg flex items-center gap-3"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Ver mis proyectos"
          >
            Conoce mi trabajo <ArrowDown className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={prefersReducedMotion ? {} : { y: -4 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
            className="px-10 py-5 rounded-xl font-black text-lg ghost-border text-white flex items-center gap-3"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Ir a la sección de contacto"
          >
            Hablemos de tu proyecto <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
