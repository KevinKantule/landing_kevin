import { motion } from 'motion/react';
import { Bot, Send, Smartphone } from 'lucide-react';
import { useAdaptivePreferences } from '../../hooks/useAdaptivePreferences';

export const Services = () => {
  const { prefersReducedMotion } = useAdaptivePreferences();

  const services = [
    {
      title: "Desarrollo de Agentes Autónomos",
      status: "En curso",
      description: "Investigación y diseño de sistemas de IA capaces de planificar, usar herramientas y ejecutar tareas de forma independiente para automatizar flujos de trabajo complejos.",
      icon: Bot
    },
    {
      title: "Creación de Chatbots Inteligentes",
      description: "Desarrollo de asistentes virtuales conversacionales impulsados por IA, diseñados para integrarse fluidamente en plataformas empresariales y mejorar la atención al cliente.",
      icon: Send
    },
    {
      title: "Desarrollo Móvil (Android)",
      description: "Experiencia fundamental en la creación de aplicaciones nativas, estableciendo bases sólidas en lógica de programación y diseño de interfaces.",
      icon: Smartphone
    }
  ];

  return (
    <section id="services" className="py-32 px-8">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-5xl font-black text-white mb-20 tracking-tighter text-center">Lo que hago</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-surface-container-highest/20 ghost-border hover:bg-surface-container-highest/40 transition-all group"
            >
              <div
                className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              {service.status && (
                <span className="text-[10px] uppercase tracking-widest font-bold text-primary mb-4 block" aria-label={`Estado: ${service.status}`}>
                  {service.status}
                </span>
              )}
              <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{service.title}</h3>
              <p className="text-slate-400 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
