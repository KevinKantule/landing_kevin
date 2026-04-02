import { motion } from 'motion/react';
import { useAdaptivePreferences } from '../../hooks/useAdaptivePreferences';

export const About = () => {
  const { prefersReducedMotion } = useAdaptivePreferences();

  return (
    <section id="about" className="py-32 px-8 bg-surface-container-low/20">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden ghost-border group">
            <img
              src="https://picsum.photos/seed/tech-profile/800/800"
              alt="Kevin Kantule, Software Developer"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">Sobre Mí</h2>
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>
              Mi pasión por la tecnología se traduce en la creación de soluciones que automatizan y optimizan procesos complejos.
            </p>
            <p>
              Mi viaje en el desarrollo comenzó construyendo aplicaciones para <span className="text-white font-semibold">Android</span>, donde aprendí la importancia del rendimiento, la arquitectura sólida y la experiencia del usuario. Con la rápida evolución de la tecnología, adapté mi enfoque para resolver problemas de manera más interactiva y dinámica.
            </p>
            <p>
              Hoy en día, me especializo en la <span className="text-primary font-semibold italic">inteligencia artificial aplicada</span>. Dedico la mayor parte de mi tiempo al diseño y despliegue de chatbots robustos que mejoran la comunicación y la eficiencia operativa.
            </p>
            <p>
              Actualmente, estoy inmerso en la investigación e implementación de <span className="text-white font-semibold">agentes autónomos</span>, explorando cómo la orquestación de IA puede ejecutar tareas secuenciales, tomar decisiones y revolucionar el desarrollo de software y la automatización de procesos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
